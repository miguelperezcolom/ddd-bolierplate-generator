const tc = 34, ic = 10;
function Wi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let l = a + 1; l < e.length; l++) {
        const p = e[a], u = e[l], f = i.get(p.id), r = i.get(u.id), d = r.x - f.x, m = r.y - f.y, w = (p.w + u.w) / 2 + t - Math.abs(d), E = (p.h + u.h) / 2 + t - Math.abs(m);
        if (!(w <= 0 || E <= 0))
          if (o = !0, w < E) {
            const g = (d >= 0 ? 1 : -1) * w / 2;
            f.x -= g, r.x += g;
          } else {
            const g = (m >= 0 ? 1 : -1) * E / 2;
            f.y -= g, r.y += g;
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
function Gs(e, t = { w: 160, h: 90 }) {
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
function Mi(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const l of i)
    s = Math.max(s, -l.dx + l.w / 2 + 10), n = Math.max(n, l.dx + l.w / 2 + 10), o = Math.max(o, -l.dy + l.h / 2 + 34), a = Math.max(a, l.dy + l.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (a - o) / 2,
    w: s + n,
    h: o + a
  };
}
function Gt(e) {
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
const js = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ys = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Ks = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, je = 168, Ye = 56;
function Xe(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Ke(e, t) {
  return `apiop:${e}@${t}`;
}
const sn = { compact: 0, coarse: 1, full: 2 };
function on(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: sn[e ? t : s] > sn[n] };
}
function Wn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: Xe(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Hn = 34, Bn = 14, Xs = 14, Ee = 108, Se = 32, Gn = 12, jn = 10, Pt = 2, Qs = Pt * Ee + (Pt - 1) * Gn + 2 * Bn;
function Zs(e, t) {
  return `rel:${e}->${t}`;
}
function Js(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function wt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const eo = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Yn = {
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
  "proxy-api": { symbol: "interface", fill: "#ecfeff", stroke: "#0e7490" },
  "scheduled-trigger": { symbol: "clock", fill: "#fffbeb", stroke: "#d97706" },
  "etl-flow": { symbol: "gear", fill: "#f0fdfa", stroke: "#0f766e" }
}, Pi = {
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
  "proxy-api": "Proxy/cache de una API, alojado en este sistema",
  "scheduled-trigger": "Trigger programado (cron) — dispara un caso de uso",
  "etl-flow": "Integrador ETL — fuentes (pull/consumidor) → transformación → escrituras"
};
function Ti(e) {
  const t = Math.max(1, Math.ceil(e / Pt)), i = t * Se + (t - 1) * jn;
  return { w: Qs, h: Hn + i + Xs };
}
function Jt(e, t) {
  const i = e % Pt, s = Math.floor(e / Pt);
  return {
    x: -t.w / 2 + Bn + i * (Ee + Gn) + Ee / 2,
    y: -t.h / 2 + Hn + s * (Se + jn) + Se / 2
  };
}
function to(e, t, i, s, n, o, a = !1) {
  const l = (e.aggregates ?? []).filter((u) => u.moduleId === t.id), p = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Wn(e, t.id),
    ...l.map((u) => ({ id: u.id, name: u.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "use-case", policy: u.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "query-service" })
    ),
    ...(t.scheduledTriggers ?? []).map(
      (u) => ({ id: u.id, name: u.name, kind: "scheduled-trigger" })
    ),
    ...(e.etlFlows ?? []).filter((u) => u.ownerModuleId === t.id).map((u) => ({ id: u.id, name: u.name, kind: "etl-flow" }))
  ];
  if (!p.length)
    return [{ ...s, x: i.x, y: i.y, w: je, h: Ye }];
  if (a) {
    const u = new Map((e.apis ?? []).map((r) => [r.id, r])), f = (e.apiImplementations ?? []).filter((r) => r.moduleId === t.id && u.has(r.apiId)).map((r) => {
      const d = u.get(r.apiId);
      return {
        id: Xe(r.apiId, r.moduleId),
        name: d.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${d.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (d.operations ?? []).map((m) => ({
          id: Ke(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (f.length > 0) {
      const r = p.filter((d) => d.kind !== "api-impl");
      return Kn(i, s, f, r, n, o);
    }
  }
  return $t(i, s, p, n, o);
}
function Kn(e, t, i, s, n, o, a = /* @__PURE__ */ new Set()) {
  const l = o[t.id] ?? Ti(i.length + s.length), p = i.map((m, w) => {
    const E = n[m.id] ?? Jt(w, l), g = a.has(m.id) ? [] : m.ops, _ = o[m.id] ?? Ti(g.length), M = g.map((v, S) => n[v.id] ?? Jt(S, _)), F = Mi(
      { x: E.x, y: E.y },
      _,
      M.map((v) => ({ dx: v.x, dy: v.y, w: Ee, h: Se }))
    );
    return { a: m, off: E, ops: g, opOffs: M, fit: F };
  }), u = s.map(
    (m, w) => n[m.id] ?? Jt(i.length + w, l)
  ), f = Wi(
    [
      ...p.map((m) => ({ id: m.a.id, x: m.fit.x, y: m.fit.y, w: m.fit.w, h: m.fit.h })),
      ...s.map((m, w) => ({
        id: m.id,
        x: u[w].x,
        y: u[w].y,
        w: Ee,
        h: Se
      }))
    ],
    24
  );
  for (const m of p) {
    const w = f.get(m.a.id);
    w && (m.off = { x: m.off.x + (w.x - m.fit.x), y: m.off.y + (w.y - m.fit.y) }, m.fit = { ...m.fit, x: w.x, y: w.y });
  }
  s.forEach((m, w) => {
    const E = f.get(m.id);
    E && (u[w] = { x: E.x, y: E.y });
  });
  const r = Mi(e, l, [
    ...p.map((m) => ({ dx: m.fit.x, dy: m.fit.y, w: m.fit.w, h: m.fit.h })),
    ...u.map((m) => ({ dx: m.x, dy: m.y, w: Ee, h: Se }))
  ]), d = [
    { ...t, x: r.x, y: r.y, w: r.w, h: r.h, container: !0 }
  ];
  for (const m of p)
    d.push({
      id: m.a.id,
      label: m.a.name,
      kind: m.a.kind,
      symbol: "interface",
      fill: m.a.fill,
      stroke: m.a.stroke,
      badge: m.a.badge,
      container: !0,
      collapsible: m.a.ops.length > 0 || a.has(m.a.id),
      collapsed: a.has(m.a.id),
      parentId: t.id,
      x: e.x + m.fit.x,
      y: e.y + m.fit.y,
      w: m.fit.w,
      h: m.fit.h,
      tooltip: m.a.tooltip
    }), m.ops.forEach((w, E) => {
      d.push({
        id: w.id,
        label: w.name,
        kind: m.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: m.a.id,
        x: e.x + m.off.x + m.opOffs[E].x,
        y: e.y + m.off.y + m.opOffs[E].y,
        w: Ee,
        h: Se,
        tooltip: `${Pi[m.a.opKind]}: ${w.name}`
      });
    });
  return s.forEach((m, w) => {
    const E = Yn[m.kind];
    d.push({
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + u[w].x,
      y: e.y + u[w].y,
      w: Ee,
      h: Se,
      symbol: E.symbol,
      fill: E.fill,
      stroke: E.stroke,
      parentId: t.id,
      tooltip: `${Pi[m.kind]} ${m.name}`
    });
  }), d;
}
function $t(e, t, i, s, n) {
  const o = n[t.id] ?? Ti(i.length), a = i.map((r, d) => s[r.id] ?? Jt(d, o)), l = Wi(
    i.map((r, d) => ({ id: r.id, x: a[d].x, y: a[d].y, w: Ee, h: Se })),
    10
  );
  i.forEach((r, d) => {
    const m = l.get(r.id);
    m && (a[d] = { x: m.x, y: m.y });
  });
  const p = Mi(
    e,
    o,
    a.map((r) => ({ dx: r.x, dy: r.y, w: Ee, h: Se }))
  ), u = {
    ...t,
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
    container: !0
  }, f = i.map((r, d) => {
    const m = a[d], w = r.policy ? eo : Yn[r.kind];
    return {
      id: r.id,
      label: r.name,
      kind: r.kind,
      x: e.x + m.x,
      y: e.y + m.y,
      w: Ee,
      h: Se,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${r.policy ? "Policy" : Pi[r.kind]} ${r.name}`
    };
  });
  return [u, ...f];
}
function io(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = n, a = i !== "contexts", l = i === "operations", p = new Set(e.externalSystems.map((c) => c.id)), u = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), f = new Set(u.map((c) => c.id)), r = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), d = new Set(r.map((c) => c.id)), m = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !f.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !d.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...(e.etlFlows ?? []).filter((c) => !c.ownerModuleId).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    }))
  ], w = m.flatMap((c, N) => {
    const H = t[c.ref.id] ?? wt(N, m.length);
    if ("etl" in c && c.etl) {
      const Q = c.ref;
      return [{
        id: Q.id,
        label: Q.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${Q.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if ("workflow" in c && c.workflow) {
      const Q = c.ref;
      return [{
        id: Q.id,
        label: Q.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${Q.name} — workflow${Q.triggerEvent ? ` · arranca con ${Q.triggerEvent}` : ""}`,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if (c.proxy) {
      const Q = c.ref, de = {
        id: Q.id,
        label: Q.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${Q.name} — proxy/cache de una API, consumible como ella`
      };
      if (l && Q.targetApiId) {
        const Ne = (e.apis ?? []).find((ot) => ot.id === Q.targetApiId), De = (Ne == null ? void 0 : Ne.operations) ?? [];
        if (De.length > 0)
          return $t(
            H,
            de,
            De.map((ot) => ({
              id: Ke(ot.id, Q.id),
              name: ot.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...de, x: H.x, y: H.y, w: je, h: Ye }];
    }
    if (c.api) {
      const Q = c.ref, de = {
        id: Q.id,
        label: Q.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Q.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(Q.id) ? !a : a) && Q.operations.length > 0 ? $t(
        H,
        { ...de, collapsible: !0, collapsed: !1 },
        Q.operations.map(
          (De) => ({ id: De.id, name: De.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...de,
        collapsible: Q.operations.length > 0,
        collapsed: Q.operations.length > 0,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if (c.external) {
      const Q = c.ref, de = {
        id: Q.id,
        label: Q.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Q.name} (sistema externo)`
      }, Ne = u.filter((le) => le.publishedByExternalSystemId === Q.id), De = r.filter((le) => le.publishedByExternalSystemId === Q.id), ot = De.map(
        (le) => ({ id: le.id, name: le.name, kind: "proxy-api" })
      ), Ii = [
        ...(Q.useCases ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "external-use-case" })
        ),
        ...(Q.tables ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "external-table" })
        ),
        ...(Q.mcpServers ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "mcp-server" })
        )
      ], yi = Ne.length > 0 || De.length > 0, vi = yi || Ii.length > 0, { form: Ht, collapsed: wi } = on(
        n.has(Q.id),
        a ? "full" : yi ? "coarse" : "compact",
        Ii.length > 0 || l && yi
      ), tn = [
        ...ot,
        ...Ht === "full" ? Ii : []
      ], xi = l && Ht === "full" ? De.filter((le) => {
        const yt = le.targetApiId ? (e.apis ?? []).find((ge) => ge.id === le.targetApiId) : void 0;
        return ((yt == null ? void 0 : yt.operations) ?? []).length > 0;
      }) : [];
      if (l && Ht === "full" && (Ne.length > 0 || xi.length > 0)) {
        const le = [
          ...Ne.map((ge) => ({
            id: ge.id,
            name: ge.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ge.name} — API publicada por ${Q.name}`,
            opKind: "api-operation",
            ops: (ge.operations ?? []).map((vt) => ({ id: vt.id, name: vt.name }))
          })),
          ...xi.map((ge) => {
            const vt = (e.apis ?? []).find((Bt) => Bt.id === ge.targetApiId);
            return {
              id: ge.id,
              name: ge.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ge.name} — proxy/cache de ${vt.name}`,
              opKind: "api-op-occurrence",
              ops: (vt.operations ?? []).map((Bt) => ({
                id: Ke(Bt.id, ge.id),
                name: Bt.name
              }))
            };
          })
        ], yt = new Set(xi.map((ge) => ge.id));
        return Kn(
          H,
          { ...de, collapsible: !0, collapsed: wi },
          le,
          tn.filter((ge) => !yt.has(ge.id)),
          t,
          s,
          o
        );
      }
      const nn = Ht === "compact" ? [] : [
        ...Ne.map((le) => ({ id: le.id, name: le.name, kind: "api" })),
        ...tn
      ];
      return nn.length > 0 ? $t(
        H,
        { ...de, collapsible: vi, collapsed: wi },
        nn,
        t,
        s
      ) : [{
        ...de,
        collapsible: vi,
        collapsed: vi && wi,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    const X = c.ref, Z = X.subdomainType ?? "GENERIC", re = {
      id: X.id,
      label: X.name,
      kind: "module",
      symbol: "component",
      fill: js[Z],
      stroke: "#94a3b8",
      badge: Z,
      tooltip: `${X.name} — subdominio ${Z}`
    }, $e = Wn(e, X.id), gt = (e.aggregates ?? []).some((Q) => Q.moduleId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((Q) => Q.ownerModuleId === X.id), He = gt || $e.length > 0, { form: It, collapsed: st } = on(
      n.has(X.id),
      a ? "full" : $e.length > 0 ? "coarse" : "compact",
      gt
    );
    return It === "full" && He ? to(
      e,
      X,
      H,
      { ...re, collapsible: !0, collapsed: st },
      t,
      s,
      l
    ) : It === "coarse" && $e.length > 0 ? $t(
      H,
      { ...re, collapsible: He, collapsed: st },
      $e,
      t,
      s
    ) : [{
      ...re,
      collapsible: He,
      collapsed: He && st,
      x: H.x,
      y: H.y,
      w: je,
      h: Ye
    }];
  }), E = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, N) => {
    const H = t[c.id] ?? wt(m.length + N, E);
    w.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, N) => {
    const H = t[c.id] ?? wt(m.length + (e.actors ?? []).length + N, E);
    w.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: c.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!c.external,
      badge: c.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: c.external ? `${c.name} (agente de IA externo — entra por un gateway MCP)` : `${c.name} (agente de IA — consume por MCP)`
    });
  }), (e.mcpGateways ?? []).forEach((c, N) => {
    const H = t[c.id] ?? wt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + N,
      E
    );
    w.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${c.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const g = [];
  (e.rags ?? []).forEach((c, N) => {
    const H = t[c.id] ?? wt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + N,
      E
    );
    w.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((X, Z) => {
      const re = `ragcs:${c.id}:${X.uri}`, $e = t[re] ?? { x: H.x + 170, y: H.y - 30 + Z * 44 };
      w.push({
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
      }), g.push({
        id: `ragcse:${c.id}:${X.uri}`,
        sourceId: re,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), w.sort((c, N) => (c.parentId ? 1 : 0) - (N.parentId ? 1 : 0));
  const _ = e.relations.map((c) => ({
    id: Zs(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Ys[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), M = e.flows.map((c) => {
    var $e, gt, He, It, st, Q;
    const N = Js(e, c), H = a ? e.modules.find((de) => de.id === c.sourceId) : void 0, X = (($e = H == null ? void 0 : H.domainEvents) == null ? void 0 : $e.find((de) => de.name === c.triggerEvent)) ?? ((gt = H == null ? void 0 : H.applicationEvents) == null ? void 0 : gt.find((de) => de.name === c.triggerEvent)), Z = a && c.readModelName ? (It = (He = e.modules.find((de) => de.id === c.targetId)) == null ? void 0 : He.readModels) == null ? void 0 : It.find((de) => de.name === c.readModelName) : void 0, re = a && c.targetUseCaseId ? (Q = (st = e.modules.find((de) => de.id === c.targetId)) == null ? void 0 : st.useCases) == null ? void 0 : Q.find((de) => de.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? c.sourceId,
      targetId: (re == null ? void 0 : re.id) ?? (Z == null ? void 0 : Z.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Ks[N],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${N}`
    };
  }), F = new Map((e.apis ?? []).map((c) => [c.id, c])), v = new Set(e.modules.map((c) => c.id)), S = (e.apiImplementations ?? []).filter(
    (c) => F.has(c.apiId) && v.has(c.moduleId)
  ), y = new Set(w.map((c) => c.id)), R = a ? (e.emissions ?? []).filter((c) => y.has(c.sourceId) && y.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], z = a ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: N }) => N && c.readModelId).filter(({ p: c, source: N }) => y.has(N) && y.has(c.readModelId)).map(({ p: c, source: N }) => ({
    id: `proj:${c.id}`,
    sourceId: N,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], T = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((N) => {
      const H = a && N.targetUseCaseId && y.has(N.targetUseCaseId) ? N.targetUseCaseId : N.targetModuleId && y.has(N.targetModuleId) ? N.targetModuleId : (N.targetUseCaseId && !a, null);
      if (!H) return [];
      const X = a && y.has(N.id) ? N.id : c.id;
      return y.has(X) ? [
        {
          id: `apiwire:${N.id}`,
          sourceId: X,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${N.name} la implementa ${H}`
        }
      ] : [];
    })
  ), V = a ? (e.useCaseCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], C = a ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && y.has(c.id) && y.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], k = a ? (e.aggregateCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], O = a ? (e.queryCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], h = a ? (e.actorUses ?? []).filter((c) => y.has(c.actorId) && y.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], I = (e.actorExternalDependencies ?? []).filter((c) => y.has(c.actorId) && y.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), x = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), b = (c) => y.has(c) ? c : x.get(c) ?? c, A = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: b(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => y.has(c.sourceId) && y.has(c.targetId) && c.sourceId !== c.targetId
      ).map((c) => [
        `xdep:${c.sourceId}->${c.targetId}`,
        {
          id: `xdep:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "ext-dep",
          color: c.cqrs ? "#7c3aed" : "#64748b",
          label: c.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: c.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], L = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const N of c.useCases ?? []) L.set(N.id, c.id);
    for (const N of c.domainEvents ?? []) L.set(N.id, c.id);
    for (const N of c.applicationEvents ?? []) L.set(N.id, c.id);
  }
  const P = (c) => y.has(c) ? c : L.get(c) ?? c, W = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const N of c.domainEvents ?? []) W.set(N.name, N.id);
    for (const N of c.applicationEvents ?? []) W.set(N.name, N.id);
  }
  const j = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((N) => N.targetUseCaseId).map((N) => ({ sourceId: c.id, targetId: P(N.targetUseCaseId) }))
      ).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `wfcall:${c.sourceId}->${c.targetId}`,
        {
          id: `wfcall:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], D = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && W.has(c.triggerEvent)).map((c) => ({
        sourceId: P(W.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `wftrig:${c.sourceId}->${c.targetId}`,
        {
          id: `wftrig:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: c.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], U = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const N of c.tables ?? []) U.set(N.id, c.id);
  const ee = (e.etlFlows ?? []).flatMap(
    (c) => (c.steps ?? []).flatMap((N) => {
      const H = y.has(c.id) ? c.id : c.ownerModuleId && y.has(c.ownerModuleId) ? c.ownerModuleId : null;
      if (!H) return [];
      const X = N.externalTableId ?? N.operationId ?? N.apiId ?? N.eventId;
      if (!X) return [];
      let Z = X;
      if (!y.has(Z) && N.operationId && N.apiId && (Z = N.apiId), !y.has(Z) && N.externalTableId && (Z = U.get(N.externalTableId) ?? Z), y.has(Z) || (Z = b(Z)), y.has(Z) || (Z = L.get(X) ?? Z), !y.has(Z) || Z === H) return [];
      const re = N.type.startsWith("SOURCE");
      return [{
        id: `etl:${c.id}:${N.id}`,
        sourceId: re ? Z : H,
        targetId: re ? H : Z,
        kind: re ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: N.type === "SOURCE_PULL" ? "pull" : N.type === "SOURCE_CONSUMER" ? "consume" : N.type === "WRITE_API" ? "api" : N.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: re ? `${c.name} lee de aquí (${N.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${c.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), oe = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((N) => ({
          sourceId: y.has(N) ? N : U.get(N) ?? N,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `ragtbl:${c.sourceId}->${c.targetId}`,
        {
          id: `ragtbl:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "rag-table",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${c.name} indexa esta tabla`
        }
      ])
    ).values()
  ], ae = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((N) => ({
          sourceId: b(N),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `ragapi:${c.sourceId}->${c.targetId}`,
        {
          id: `ragapi:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "rag-api",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${c.name} indexa el contenido de esta API`
        }
      ])
    ).values()
  ], se = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((N) => ({ sourceId: N, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((N) => ({ sourceId: N, targetId: c.id, name: c.name }))
      ]).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `ragcoarse:${c.sourceId}->${c.targetId}`,
        {
          id: `ragcoarse:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "rag-coarse",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${c.name} indexa su contenido`
        }
      ])
    ).values()
  ], ke = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: b(c.apiId) })).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => [
        `agapi:${c.sourceId}->${c.targetId}`,
        {
          id: `agapi:${c.sourceId}->${c.targetId}`,
          sourceId: c.sourceId,
          targetId: c.targetId,
          kind: "agent-api",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume la API entera como herramienta"
        }
      ])
    ).values()
  ], Vt = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, nt = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((N) => N.id !== c.id && Vt(N) === c.triggerEvent).filter((N) => y.has(N.id) && y.has(c.id)).map((N) => ({
      id: `wfchain:${N.id}->${c.id}`,
      sourceId: N.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), Wt = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: b(c.id), targetId: b(c.targetApiId) })).filter(
        (c) => y.has(c.sourceId) && y.has(c.targetId) && c.sourceId !== c.targetId
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
  ], Cs = S.flatMap((c) => {
    const N = Xe(c.apiId, c.moduleId);
    if (!y.has(N)) return [];
    const H = [];
    for (const X of (e.proxyApis ?? []).filter((Z) => Z.targetApiId === c.apiId)) {
      const Z = b(X.id);
      y.has(Z) && Z !== N && H.push({
        id: `pxr:${Z}->${N}`,
        sourceId: Z,
        targetId: N,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return H;
  }), As = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const N = (e.proxyApis ?? []).find((Z) => Z.id === c.proxyId);
    if (!(N != null && N.targetApiId)) return [];
    const H = Ke(c.operationId, c.proxyId), X = c.targetSiteId === N.targetApiId ? N.targetApiId : Xe(N.targetApiId, c.targetSiteId);
    return !y.has(H) || !y.has(X) ? [] : [{
      id: `oproute:${H}->${X}`,
      sourceId: H,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ms = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!y.has(c.externalSystemId)) return null;
        const N = (e.apis ?? []).find(
          (re) => re.operations.some(($e) => $e.id === c.operationId)
        );
        if (!N) return null;
        const H = c.siteId === N.id, X = H ? c.operationId : Ke(c.operationId, c.siteId);
        let Z = y.has(X) ? X : null;
        if (!Z)
          if (H || (e.proxyApis ?? []).some((re) => re.id === c.siteId))
            Z = b(c.siteId);
          else {
            const re = Xe(N.id, c.siteId);
            Z = y.has(re) ? re : c.siteId;
          }
        return !Z || !y.has(Z) || Z === c.externalSystemId ? null : { u: c, target: Z };
      }).filter((c) => c !== null).map((c) => [
        `extopuse:${c.u.externalSystemId}->${c.u.operationId}@${c.u.siteId}`,
        {
          id: `extopuse:${c.u.externalSystemId}->${c.u.operationId}@${c.u.siteId}`,
          sourceId: c.u.externalSystemId,
          targetId: c.target,
          kind: "ext-op-use",
          color: "#64748b",
          label: "op",
          dashed: !0,
          arrow: !0,
          tooltip: "llama a esta operación"
        }
      ])
    ).values()
  ], Ps = a ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!y.has(c.useCaseId)) return [];
    const N = y.has(Ke(c.operationId, c.moduleId)) ? Ke(c.operationId, c.moduleId) : y.has(Xe(c.apiId, c.moduleId)) ? Xe(c.apiId, c.moduleId) : y.has(b(c.moduleId)) ? b(c.moduleId) : null;
    return N ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: N,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Ts = a ? (e.agentUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Os = (e.agentRags ?? []).filter((c) => y.has(c.agentId) && y.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Rs = a ? (e.rags ?? []).filter((c) => y.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((N) => y.has(N)).map((N) => ({
      id: `ragsrc:${c.id}->${N}`,
      sourceId: c.id,
      targetId: N,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Ns = a ? (e.agentExternalUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ds = a ? (e.agentMcpUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ls = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((N) => y.has(c.id) && y.has(N)).map((N) => ({
      id: `gwx:${c.id}->${N}`,
      sourceId: c.id,
      targetId: N,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), zs = (e.agentGatewayUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Us = a ? (e.agentApiOpUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], qs = a ? (e.agentQueryUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Fs = (e.agentDelegations ?? []).filter((c) => y.has(c.agentId) && y.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Vs = (e.actorAgentUses ?? []).filter((c) => y.has(c.actorId) && y.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Ws = a ? (e.agentTriggers ?? []).filter((c) => y.has(c.eventId) && y.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Hs = a ? (e.externalCalls ?? []).filter((c) => y.has(c.externalSystemId) && y.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Bs = a ? (e.externalUseCaseCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
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
    nodes: w,
    edges: [
      ..._,
      ...M,
      ...R,
      ...z,
      ...T,
      ...V,
      ...C,
      ...ee,
      ...k,
      ...O,
      ...h,
      ...I,
      ...A,
      ...Wt,
      ...Cs,
      ...As,
      ...Ms,
      ...Ps,
      ...j,
      ...D,
      ...nt,
      ...ke,
      ...oe,
      ...ae,
      ...se,
      ...Ts,
      ...Ns,
      ...Ds,
      ...Ls,
      ...zs,
      ...Us,
      ...qs,
      ...Fs,
      ...Vs,
      ...Ws,
      ...Os,
      ...Rs,
      ...g,
      ...Hs,
      ...Bs
    ]
  };
}
const no = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, so = 176, oo = 60, ao = 140, ro = 40;
function lo(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((p) => p.moduleId === n.id).forEach((p, u) => {
      const f = s.filter((d) => d.aggregateId === p.id).length, r = 140 + u * (170 + f * 60);
      t[p.id] = { x: a, y: r }, s.filter((d) => d.aggregateId === p.id).forEach((d, m) => {
        t[d.id] = { x: a + 60, y: r + 100 + m * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function co(e, t) {
  const i = lo(e), s = (u) => t[u] ?? i[u] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((u) => [u.id, u])), o = (e.aggregates ?? []).map((u) => {
    const f = n.get(u.moduleId), r = (f == null ? void 0 : f.subdomainType) ?? "GENERIC", d = s(u.id);
    return {
      id: u.id,
      label: u.name,
      x: d.x,
      y: d.y,
      w: so,
      h: oo,
      kind: "aggregate",
      symbol: "aggregate",
      fill: no[r],
      stroke: "#64748b",
      badge: f ? `${f.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${u.name}${f ? ` — módulo ${f.name} (${r})` : ""}`
    };
  }), a = (e.entities ?? []).map((u) => {
    const f = s(u.id);
    return {
      id: u.id,
      label: u.name,
      x: f.x,
      y: f.y,
      w: ao,
      h: ro,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${u.name} (dentro del agregado)`
    };
  }), l = (e.entities ?? []).map((u) => ({
    id: `contains:${u.aggregateId}->${u.id}`,
    sourceId: u.aggregateId,
    targetId: u.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), p = (e.aggregateReferences ?? []).map((u, f) => ({
    id: `aggref:${f}:${u.sourceAggregateId}->${u.targetAggregateId}`,
    sourceId: u.sourceAggregateId,
    targetId: u.targetAggregateId,
    kind: "aggregate-reference",
    label: u.label,
    color: "#475569",
    arrow: !0,
    tooltip: u.label ? `Referencia: ${u.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...a],
    edges: [...l, ...p]
  };
}
const po = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, uo = 150, mo = 44, ho = 190, fo = 56, go = 160, Io = 48;
function yo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function vo(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (l) => {
    var p, u;
    return ((u = (p = e.aggregates) == null ? void 0 : p.find((f) => f.id === l)) == null ? void 0 : u.name) ?? l ?? "?";
  };
  return i.forEach((l, p) => {
    const u = 120 + p * 130, f = po[l.archetype] ?? "#475569", r = l.triggerAggregateId ?? l.sourceId;
    if (!o.has(r)) {
      o.add(r);
      const g = t[r] ?? { x: 160, y: u };
      s.push({
        id: r,
        label: l.triggerAggregateId ? a(l.triggerAggregateId) : r,
        x: g.x,
        y: g.y,
        w: uo,
        h: mo,
        kind: l.triggerAggregateId ? "aggregate" : "module",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const d = `flow:${l.id}`, m = t[d] ?? { x: 470, y: u };
    s.push({
      id: d,
      label: l.name,
      x: m.x,
      y: m.y,
      w: ho,
      h: fo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: f,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const w = yo(e, l), E = `tgt:${w.id}`;
    if (!o.has(E)) {
      o.add(E);
      const g = t[E] ?? { x: 790, y: u };
      s.push({
        id: E,
        label: w.label,
        x: g.x,
        y: g.y,
        w: go,
        h: Io,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${l.id}:in`,
      sourceId: r,
      targetId: d,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${l.id}:out`,
      sourceId: d,
      targetId: E,
      kind: "flow-delivery",
      color: f,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const wo = 190, xo = 56, bi = 170, bo = 52;
function an(e, t) {
  const i = [], s = [], n = (o) => {
    var a;
    return (a = e.modules.find((l) => l.id === o)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((o, a) => {
    const l = 140 + a * 240, p = t[o.id] ?? { x: 150, y: l };
    i.push({
      id: o.id,
      label: o.name,
      x: p.x,
      y: p.y,
      w: wo,
      h: xo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let u = o.id;
    if (o.steps.forEach((f, r) => {
      const d = f.type === "HUMAN", m = t[f.id] ?? { x: 150 + (r + 1) * 240, y: l };
      if (i.push({
        id: f.id,
        label: f.name,
        x: m.x,
        y: m.y,
        w: bi,
        h: bo,
        kind: "process-step",
        symbol: d ? "person" : "gear",
        fill: d ? "#fef3c7" : "#ffffff",
        stroke: d ? "#d97706" : "#64748b",
        badge: d ? `HUMAN${f.roleId ? ` · ${f.roleId}` : ""}${f.deadline ? ` · ⏱ ${f.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${f.name}${f.useCaseId ? ` — use case ${f.useCaseId}` : ""}${f.deadline ? ` · deadline ${f.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${r}`,
        sourceId: u,
        targetId: f.id,
        kind: "process-seq",
        label: r === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), f.compensationUseCaseId) {
        const w = `comp:${f.id}`, E = t[w] ?? { x: m.x, y: m.y + 90 };
        i.push({
          id: w,
          label: f.compensationUseCaseId,
          x: E.x,
          y: E.y,
          w: bi,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), s.push({
          id: `pc:${f.id}`,
          sourceId: f.id,
          targetId: w,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      u = f.id;
    }), o.onCompletionEventName) {
      const f = `done:${o.id}`, r = t[f] ?? { x: 150 + (o.steps.length + 1) * 240, y: l };
      i.push({
        id: f,
        label: o.onCompletionEventName,
        x: r.x,
        y: r.y,
        w: bi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${o.id}`,
        sourceId: u,
        targetId: f,
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
const ei = globalThis, Hi = ei.ShadowRoot && (ei.ShadyCSS === void 0 || ei.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bi = Symbol(), rn = /* @__PURE__ */ new WeakMap();
let Xn = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Bi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Hi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = rn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && rn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _o = (e) => new Xn(typeof e == "string" ? e : e + "", void 0, Bi), ht = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Xn(i, e, Bi);
}, ko = (e, t) => {
  if (Hi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = ei.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, dn = Hi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return _o(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $o, defineProperty: Eo, getOwnPropertyDescriptor: So, getOwnPropertyNames: Co, getOwnPropertySymbols: Ao, getPrototypeOf: Mo } = Object, We = globalThis, ln = We.trustedTypes, Po = ln ? ln.emptyScript : "", _i = We.reactiveElementPolyfillSupport, Ct = (e, t) => e, oi = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Po : null;
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
} }, Gi = (e, t) => !$o(e, t), cn = { attribute: !0, type: String, converter: oi, reflect: !1, useDefault: !1, hasChanged: Gi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), We.litPropertyMetadata ?? (We.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = cn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Eo(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = So(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const l = n == null ? void 0 : n.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ct("elementProperties"))) return;
    const t = Mo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ct("properties"))) {
      const i = this.properties, s = [...Co(i), ...Ao(i)];
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
      for (const n of s) i.unshift(dn(n));
    } else t !== void 0 && i.push(dn(t));
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
    return ko(t, this.constructor.elementStyles), t;
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
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : oi).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const l = s.getPropertyOptions(n), p = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : oi;
      this._$Em = n;
      const u = p.fromAttribute(i, l.type);
      this[n] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Gi)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
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
        const { wrapped: l } = a, p = this[o];
        l !== !0 || this._$AL.has(o) || p === void 0 || this.C(o, void 0, a, p);
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
rt.elementStyles = [], rt.shadowRootOptions = { mode: "open" }, rt[Ct("elementProperties")] = /* @__PURE__ */ new Map(), rt[Ct("finalized")] = /* @__PURE__ */ new Map(), _i == null || _i({ ReactiveElement: rt }), (We.reactiveElementVersions ?? (We.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis, pn = (e) => e, ai = At.trustedTypes, un = ai ? ai.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qn = "$lit$", Ve = `lit$${Math.random().toFixed(9).slice(2)}$`, Zn = "?" + Ve, To = `<${Zn}>`, tt = document, Tt = () => tt.createComment(""), Ot = (e) => e === null || typeof e != "object" && typeof e != "function", ji = Array.isArray, Oo = (e) => ji(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ki = `[ 	
\f\r]`, xt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mn = /-->/g, hn = />/g, Be = RegExp(`>|${ki}(?:([^\\s"'>=/]+)(${ki}*=${ki}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fn = /'/g, gn = /"/g, Jn = /^(?:script|style|textarea|title)$/i, es = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $ = es(1), Y = es(2), ct = Symbol.for("lit-noChange"), J = Symbol.for("lit-nothing"), In = /* @__PURE__ */ new WeakMap(), Qe = tt.createTreeWalker(tt, 129);
function ts(e, t) {
  if (!ji(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return un !== void 0 ? un.createHTML(t) : t;
}
const Ro = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = xt;
  for (let l = 0; l < i; l++) {
    const p = e[l];
    let u, f, r = -1, d = 0;
    for (; d < p.length && (a.lastIndex = d, f = a.exec(p), f !== null); ) d = a.lastIndex, a === xt ? f[1] === "!--" ? a = mn : f[1] !== void 0 ? a = hn : f[2] !== void 0 ? (Jn.test(f[2]) && (n = RegExp("</" + f[2], "g")), a = Be) : f[3] !== void 0 && (a = Be) : a === Be ? f[0] === ">" ? (a = n ?? xt, r = -1) : f[1] === void 0 ? r = -2 : (r = a.lastIndex - f[2].length, u = f[1], a = f[3] === void 0 ? Be : f[3] === '"' ? gn : fn) : a === gn || a === fn ? a = Be : a === mn || a === hn ? a = xt : (a = Be, n = void 0);
    const m = a === Be && e[l + 1].startsWith("/>") ? " " : "";
    o += a === xt ? p + To : r >= 0 ? (s.push(u), p.slice(0, r) + Qn + p.slice(r) + Ve + m) : p + Ve + (r === -2 ? l : m);
  }
  return [ts(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Rt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, p = this.parts, [u, f] = Ro(t, i);
    if (this.el = Rt.createElement(u, s), Qe.currentNode = this.el.content, i === 2 || i === 3) {
      const r = this.el.content.firstChild;
      r.replaceWith(...r.childNodes);
    }
    for (; (n = Qe.nextNode()) !== null && p.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const r of n.getAttributeNames()) if (r.endsWith(Qn)) {
          const d = f[a++], m = n.getAttribute(r).split(Ve), w = /([.?@])?(.*)/.exec(d);
          p.push({ type: 1, index: o, name: w[2], strings: m, ctor: w[1] === "." ? Do : w[1] === "?" ? Lo : w[1] === "@" ? zo : mi }), n.removeAttribute(r);
        } else r.startsWith(Ve) && (p.push({ type: 6, index: o }), n.removeAttribute(r));
        if (Jn.test(n.tagName)) {
          const r = n.textContent.split(Ve), d = r.length - 1;
          if (d > 0) {
            n.textContent = ai ? ai.emptyScript : "";
            for (let m = 0; m < d; m++) n.append(r[m], Tt()), Qe.nextNode(), p.push({ type: 2, index: ++o });
            n.append(r[d], Tt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Zn) p.push({ type: 2, index: o });
      else {
        let r = -1;
        for (; (r = n.data.indexOf(Ve, r + 1)) !== -1; ) p.push({ type: 7, index: o }), r += Ve.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = tt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function pt(e, t, i = e, s) {
  var a, l;
  if (t === ct) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = Ot(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = pt(e, n._$AS(e, t.values), n, s)), t;
}
class No {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? tt).importNode(i, !0);
    Qe.currentNode = n;
    let o = Qe.nextNode(), a = 0, l = 0, p = s[0];
    for (; p !== void 0; ) {
      if (a === p.index) {
        let u;
        p.type === 2 ? u = new Ut(o, o.nextSibling, this, t) : p.type === 1 ? u = new p.ctor(o, p.name, p.strings, this, t) : p.type === 6 && (u = new Uo(o, this, t)), this._$AV.push(u), p = s[++l];
      }
      a !== (p == null ? void 0 : p.index) && (o = Qe.nextNode(), a++);
    }
    return Qe.currentNode = tt, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Ut {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = J, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = pt(this, t, i), Ot(t) ? t === J || t == null || t === "" ? (this._$AH !== J && this._$AR(), this._$AH = J) : t !== this._$AH && t !== ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Oo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== J && Ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(tt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Rt.createElement(ts(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new No(n, this), l = a.u(this.options);
      a.p(i), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = In.get(t.strings);
    return i === void 0 && In.set(t.strings, i = new Rt(t)), i;
  }
  k(t) {
    ji(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new Ut(this.O(Tt()), this.O(Tt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = pn(t).nextSibling;
      pn(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class mi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = J, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = J;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = pt(this, t, i, 0), a = !Ot(t) || t !== this._$AH && t !== ct, a && (this._$AH = t);
    else {
      const l = t;
      let p, u;
      for (t = o[0], p = 0; p < o.length - 1; p++) u = pt(this, l[s + p], i, p), u === ct && (u = this._$AH[p]), a || (a = !Ot(u) || u !== this._$AH[p]), u === J ? t = J : t !== J && (t += (u ?? "") + o[p + 1]), this._$AH[p] = u;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === J ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Do extends mi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === J ? void 0 : t;
  }
}
class Lo extends mi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== J);
  }
}
class zo extends mi {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = pt(this, t, i, 0) ?? J) === ct) return;
    const s = this._$AH, n = t === J && s !== J || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== J && (s === J || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Uo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    pt(this, t);
  }
}
const $i = At.litHtmlPolyfillSupport;
$i == null || $i(Rt, Ut), (At.litHtmlVersions ?? (At.litHtmlVersions = [])).push("3.3.3");
const qo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Ut(t.insertBefore(Tt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = globalThis;
class Te extends rt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qo(i, this.renderRoot, this.renderOptions);
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
    return ct;
  }
}
var Vn;
Te._$litElement$ = !0, Te.finalized = !0, (Vn = Je.litElementHydrateSupport) == null || Vn.call(Je, { LitElement: Te });
const Ei = Je.litElementPolyfillSupport;
Ei == null || Ei({ LitElement: Te });
(Je.litElementVersions ?? (Je.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fo = { attribute: !0, type: String, converter: oi, reflect: !1, hasChanged: Gi }, Vo = (e = Fo, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(l) {
      const p = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, p, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(l) {
      const p = this[a];
      t.call(this, l), this.requestUpdate(a, p, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ie(e) {
  return (t, i) => typeof i == "object" ? Vo(e, t, i) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(e) {
  return ie({ ...e, state: !0, attribute: !1 });
}
var Oi = "http://www.w3.org/1999/xhtml";
const yn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Oi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function hi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), yn.hasOwnProperty(t) ? { space: yn[t], local: e } : e;
}
function Wo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Oi && t.documentElement.namespaceURI === Oi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ho(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function is(e) {
  var t = hi(e);
  return (t.local ? Ho : Wo)(t);
}
function Bo() {
}
function Yi(e) {
  return e == null ? Bo : function() {
    return this.querySelector(e);
  };
}
function Go(e) {
  typeof e != "function" && (e = Yi(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = new Array(a), p, u, f = 0; f < a; ++f)
      (p = o[f]) && (u = e.call(p, p.__data__, f, o)) && ("__data__" in p && (u.__data__ = p.__data__), l[f] = u);
  return new xe(s, this._parents);
}
function jo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Yo() {
  return [];
}
function ns(e) {
  return e == null ? Yo : function() {
    return this.querySelectorAll(e);
  };
}
function Ko(e) {
  return function() {
    return jo(e.apply(this, arguments));
  };
}
function Xo(e) {
  typeof e == "function" ? e = Ko(e) : e = ns(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], l = a.length, p, u = 0; u < l; ++u)
      (p = a[u]) && (s.push(e.call(p, p.__data__, u, a)), n.push(p));
  return new xe(s, n);
}
function ss(e) {
  return function() {
    return this.matches(e);
  };
}
function os(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Qo = Array.prototype.find;
function Zo(e) {
  return function() {
    return Qo.call(this.children, e);
  };
}
function Jo() {
  return this.firstElementChild;
}
function ea(e) {
  return this.select(e == null ? Jo : Zo(typeof e == "function" ? e : os(e)));
}
var ta = Array.prototype.filter;
function ia() {
  return Array.from(this.children);
}
function na(e) {
  return function() {
    return ta.call(this.children, e);
  };
}
function sa(e) {
  return this.selectAll(e == null ? ia : na(typeof e == "function" ? e : os(e)));
}
function oa(e) {
  typeof e != "function" && (e = ss(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = [], p, u = 0; u < a; ++u)
      (p = o[u]) && e.call(p, p.__data__, u, o) && l.push(p);
  return new xe(s, this._parents);
}
function as(e) {
  return new Array(e.length);
}
function aa() {
  return new xe(this._enter || this._groups.map(as), this._parents);
}
function ri(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ri.prototype = {
  constructor: ri,
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
function ra(e) {
  return function() {
    return e;
  };
}
function da(e, t, i, s, n, o) {
  for (var a = 0, l, p = t.length, u = o.length; a < u; ++a)
    (l = t[a]) ? (l.__data__ = o[a], s[a] = l) : i[a] = new ri(e, o[a]);
  for (; a < p; ++a)
    (l = t[a]) && (n[a] = l);
}
function la(e, t, i, s, n, o, a) {
  var l, p, u = /* @__PURE__ */ new Map(), f = t.length, r = o.length, d = new Array(f), m;
  for (l = 0; l < f; ++l)
    (p = t[l]) && (d[l] = m = a.call(p, p.__data__, l, t) + "", u.has(m) ? n[l] = p : u.set(m, p));
  for (l = 0; l < r; ++l)
    m = a.call(e, o[l], l, o) + "", (p = u.get(m)) ? (s[l] = p, p.__data__ = o[l], u.delete(m)) : i[l] = new ri(e, o[l]);
  for (l = 0; l < f; ++l)
    (p = t[l]) && u.get(d[l]) === p && (n[l] = p);
}
function ca(e) {
  return e.__data__;
}
function pa(e, t) {
  if (!arguments.length) return Array.from(this, ca);
  var i = t ? la : da, s = this._parents, n = this._groups;
  typeof e != "function" && (e = ra(e));
  for (var o = n.length, a = new Array(o), l = new Array(o), p = new Array(o), u = 0; u < o; ++u) {
    var f = s[u], r = n[u], d = r.length, m = ua(e.call(f, f && f.__data__, u, s)), w = m.length, E = l[u] = new Array(w), g = a[u] = new Array(w), _ = p[u] = new Array(d);
    i(f, r, E, g, _, m, t);
    for (var M = 0, F = 0, v, S; M < w; ++M)
      if (v = E[M]) {
        for (M >= F && (F = M + 1); !(S = g[F]) && ++F < w; ) ;
        v._next = S || null;
      }
  }
  return a = new xe(a, s), a._enter = l, a._exit = p, a;
}
function ua(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ma() {
  return new xe(this._exit || this._groups.map(as), this._parents);
}
function ha(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function fa(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), l = new Array(n), p = 0; p < a; ++p)
    for (var u = i[p], f = s[p], r = u.length, d = l[p] = new Array(r), m, w = 0; w < r; ++w)
      (m = u[w] || f[w]) && (d[w] = m);
  for (; p < n; ++p)
    l[p] = i[p];
  return new xe(l, this._parents);
}
function ga() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Ia(e) {
  e || (e = ya);
  function t(r, d) {
    return r && d ? e(r.__data__, d.__data__) : !r - !d;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], l = a.length, p = n[o] = new Array(l), u, f = 0; f < l; ++f)
      (u = a[f]) && (p[f] = u);
    p.sort(t);
  }
  return new xe(n, this._parents).order();
}
function ya(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function va() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function wa() {
  return Array.from(this);
}
function xa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function ba() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function _a() {
  return !this.node();
}
function ka(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, l; o < a; ++o)
      (l = n[o]) && e.call(l, l.__data__, o, n);
  return this;
}
function $a(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ea(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Sa(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Ca(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Aa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ma(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Pa(e, t) {
  var i = hi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Ea : $a : typeof t == "function" ? i.local ? Ma : Aa : i.local ? Ca : Sa)(i, t));
}
function rs(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ta(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Oa(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Ra(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function Na(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ta : typeof t == "function" ? Ra : Oa)(e, t, i ?? "")) : ut(this.node(), e);
}
function ut(e, t) {
  return e.style.getPropertyValue(t) || rs(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Da(e) {
  return function() {
    delete this[e];
  };
}
function La(e, t) {
  return function() {
    this[e] = t;
  };
}
function za(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Ua(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Da : typeof t == "function" ? za : La)(e, t)) : this.node()[e];
}
function ds(e) {
  return e.trim().split(/^|\s+/);
}
function Ki(e) {
  return e.classList || new ls(e);
}
function ls(e) {
  this._node = e, this._names = ds(e.getAttribute("class") || "");
}
ls.prototype = {
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
function cs(e, t) {
  for (var i = Ki(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function ps(e, t) {
  for (var i = Ki(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function qa(e) {
  return function() {
    cs(this, e);
  };
}
function Fa(e) {
  return function() {
    ps(this, e);
  };
}
function Va(e, t) {
  return function() {
    (t.apply(this, arguments) ? cs : ps)(this, e);
  };
}
function Wa(e, t) {
  var i = ds(e + "");
  if (arguments.length < 2) {
    for (var s = Ki(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Va : t ? qa : Fa)(i, t));
}
function Ha() {
  this.textContent = "";
}
function Ba(e) {
  return function() {
    this.textContent = e;
  };
}
function Ga(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ja(e) {
  return arguments.length ? this.each(e == null ? Ha : (typeof e == "function" ? Ga : Ba)(e)) : this.node().textContent;
}
function Ya() {
  this.innerHTML = "";
}
function Ka(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Xa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Qa(e) {
  return arguments.length ? this.each(e == null ? Ya : (typeof e == "function" ? Xa : Ka)(e)) : this.node().innerHTML;
}
function Za() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ja() {
  return this.each(Za);
}
function er() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function tr() {
  return this.each(er);
}
function ir(e) {
  var t = typeof e == "function" ? e : is(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function nr() {
  return null;
}
function sr(e, t) {
  var i = typeof e == "function" ? e : is(e), s = t == null ? nr : typeof t == "function" ? t : Yi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function or() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ar() {
  return this.each(or);
}
function rr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function dr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function lr(e) {
  return this.select(e ? dr : rr);
}
function cr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function pr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ur(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function mr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function hr(e, t, i) {
  return function() {
    var s = this.__on, n, o = pr(t);
    if (s) {
      for (var a = 0, l = s.length; a < l; ++a)
        if ((n = s[a]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function fr(e, t, i) {
  var s = ur(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var p = 0, u = l.length, f; p < u; ++p)
        for (n = 0, f = l[p]; n < o; ++n)
          if ((a = s[n]).type === f.type && a.name === f.name)
            return f.value;
    }
    return;
  }
  for (l = t ? hr : mr, n = 0; n < o; ++n) this.each(l(s[n], t, i));
  return this;
}
function us(e, t, i) {
  var s = rs(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function gr(e, t) {
  return function() {
    return us(this, e, t);
  };
}
function Ir(e, t) {
  return function() {
    return us(this, e, t.apply(this, arguments));
  };
}
function yr(e, t) {
  return this.each((typeof t == "function" ? Ir : gr)(e, t));
}
function* vr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var ms = [null];
function xe(e, t) {
  this._groups = e, this._parents = t;
}
function qt() {
  return new xe([[document.documentElement]], ms);
}
function wr() {
  return this;
}
xe.prototype = qt.prototype = {
  constructor: xe,
  select: Go,
  selectAll: Xo,
  selectChild: ea,
  selectChildren: sa,
  filter: oa,
  data: pa,
  enter: aa,
  exit: ma,
  join: ha,
  merge: fa,
  selection: wr,
  order: ga,
  sort: Ia,
  call: va,
  nodes: wa,
  node: xa,
  size: ba,
  empty: _a,
  each: ka,
  attr: Pa,
  style: Na,
  property: Ua,
  classed: Wa,
  text: ja,
  html: Qa,
  raise: Ja,
  lower: tr,
  append: ir,
  insert: sr,
  remove: ar,
  clone: lr,
  datum: cr,
  on: fr,
  dispatch: yr,
  [Symbol.iterator]: vr
};
function Ce(e) {
  return typeof e == "string" ? new xe([[document.querySelector(e)]], [document.documentElement]) : new xe([[e]], ms);
}
function xr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ge(e, t) {
  if (e = xr(e), t === void 0 && (t = e.currentTarget), t) {
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
var br = { value: () => {
} };
function Xi() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new ti(i);
}
function ti(e) {
  this._ = e;
}
function _r(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
ti.prototype = Xi.prototype = {
  constructor: ti,
  on: function(e, t) {
    var i = this._, s = _r(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = kr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = vn(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = vn(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ti(e);
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
function kr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function vn(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = br, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ri = { capture: !0, passive: !1 };
function Ni(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function $r(e) {
  var t = e.document.documentElement, i = Ce(e).on("dragstart.drag", Ni, Ri);
  "onselectstart" in t ? i.on("selectstart.drag", Ni, Ri) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Er(e, t) {
  var i = e.document.documentElement, s = Ce(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Ni, Ri), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Qi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function hs(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function Ft() {
}
var Nt = 0.7, di = 1 / Nt, lt = "\\s*([+-]?\\d+)\\s*", Dt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Sr = /^#([0-9a-f]{3,8})$/, Cr = new RegExp(`^rgb\\(${lt},${lt},${lt}\\)$`), Ar = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), Mr = new RegExp(`^rgba\\(${lt},${lt},${lt},${Dt}\\)$`), Pr = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${Dt}\\)$`), Tr = new RegExp(`^hsl\\(${Dt},${Oe},${Oe}\\)$`), Or = new RegExp(`^hsla\\(${Dt},${Oe},${Oe},${Dt}\\)$`), wn = {
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
Qi(Ft, Lt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xn,
  // Deprecated! Use color.formatHex.
  formatHex: xn,
  formatHex8: Rr,
  formatHsl: Nr,
  formatRgb: bn,
  toString: bn
});
function xn() {
  return this.rgb().formatHex();
}
function Rr() {
  return this.rgb().formatHex8();
}
function Nr() {
  return fs(this).formatHsl();
}
function bn() {
  return this.rgb().formatRgb();
}
function Lt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Sr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? _n(t) : i === 3 ? new ye(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? jt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? jt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Cr.exec(e)) ? new ye(t[1], t[2], t[3], 1) : (t = Ar.exec(e)) ? new ye(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Mr.exec(e)) ? jt(t[1], t[2], t[3], t[4]) : (t = Pr.exec(e)) ? jt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Tr.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, 1) : (t = Or.exec(e)) ? En(t[1], t[2] / 100, t[3] / 100, t[4]) : wn.hasOwnProperty(e) ? _n(wn[e]) : e === "transparent" ? new ye(NaN, NaN, NaN, 0) : null;
}
function _n(e) {
  return new ye(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function jt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new ye(e, t, i, s);
}
function Dr(e) {
  return e instanceof Ft || (e = Lt(e)), e ? (e = e.rgb(), new ye(e.r, e.g, e.b, e.opacity)) : new ye();
}
function Di(e, t, i, s) {
  return arguments.length === 1 ? Dr(e) : new ye(e, t, i, s ?? 1);
}
function ye(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Qi(ye, Di, hs(Ft, {
  brighter(e) {
    return e = e == null ? di : Math.pow(di, e), new ye(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new ye(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ye(et(this.r), et(this.g), et(this.b), li(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: kn,
  // Deprecated! Use color.formatHex.
  formatHex: kn,
  formatHex8: Lr,
  formatRgb: $n,
  toString: $n
}));
function kn() {
  return `#${Ze(this.r)}${Ze(this.g)}${Ze(this.b)}`;
}
function Lr() {
  return `#${Ze(this.r)}${Ze(this.g)}${Ze(this.b)}${Ze((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $n() {
  const e = li(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${et(this.r)}, ${et(this.g)}, ${et(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function li(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function et(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ze(e) {
  return e = et(e), (e < 16 ? "0" : "") + e.toString(16);
}
function En(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ae(e, t, i, s);
}
function fs(e) {
  if (e instanceof Ae) return new Ae(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ft || (e = Lt(e)), !e) return new Ae();
  if (e instanceof Ae) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, l = o - n, p = (o + n) / 2;
  return l ? (t === o ? a = (i - s) / l + (i < s) * 6 : i === o ? a = (s - t) / l + 2 : a = (t - i) / l + 4, l /= p < 0.5 ? o + n : 2 - o - n, a *= 60) : l = p > 0 && p < 1 ? 0 : a, new Ae(a, l, p, e.opacity);
}
function zr(e, t, i, s) {
  return arguments.length === 1 ? fs(e) : new Ae(e, t, i, s ?? 1);
}
function Ae(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Qi(Ae, zr, hs(Ft, {
  brighter(e) {
    return e = e == null ? di : Math.pow(di, e), new Ae(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new Ae(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new ye(
      Si(e >= 240 ? e - 240 : e + 120, n, s),
      Si(e, n, s),
      Si(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Ae(Sn(this.h), Yt(this.s), Yt(this.l), li(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = li(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Sn(this.h)}, ${Yt(this.s) * 100}%, ${Yt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Sn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Yt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Si(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const gs = (e) => () => e;
function Ur(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function qr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Fr(e) {
  return (e = +e) == 1 ? Is : function(t, i) {
    return i - t ? qr(t, i, e) : gs(isNaN(t) ? i : t);
  };
}
function Is(e, t) {
  var i = t - e;
  return i ? Ur(e, i) : gs(isNaN(e) ? t : e);
}
const Cn = (function e(t) {
  var i = Fr(t);
  function s(n, o) {
    var a = i((n = Di(n)).r, (o = Di(o)).r), l = i(n.g, o.g), p = i(n.b, o.b), u = Is(n.opacity, o.opacity);
    return function(f) {
      return n.r = a(f), n.g = l(f), n.b = p(f), n.opacity = u(f), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Fe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Li = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ci = new RegExp(Li.source, "g");
function Vr(e) {
  return function() {
    return e;
  };
}
function Wr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Hr(e, t) {
  var i = Li.lastIndex = Ci.lastIndex = 0, s, n, o, a = -1, l = [], p = [];
  for (e = e + "", t = t + ""; (s = Li.exec(e)) && (n = Ci.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), l[a] ? l[a] += o : l[++a] = o), (s = s[0]) === (n = n[0]) ? l[a] ? l[a] += n : l[++a] = n : (l[++a] = null, p.push({ i: a, x: Fe(s, n) })), i = Ci.lastIndex;
  return i < t.length && (o = t.slice(i), l[a] ? l[a] += o : l[++a] = o), l.length < 2 ? p[0] ? Wr(p[0].x) : Vr(t) : (t = p.length, function(u) {
    for (var f = 0, r; f < t; ++f) l[(r = p[f]).i] = r.x(u);
    return l.join("");
  });
}
var An = 180 / Math.PI, zi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ys(e, t, i, s, n, o) {
  var a, l, p;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (p = e * i + t * s) && (i -= e * p, s -= t * p), (l = Math.sqrt(i * i + s * s)) && (i /= l, s /= l, p /= l), e * s < t * i && (e = -e, t = -t, p = -p, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * An,
    skewX: Math.atan(p) * An,
    scaleX: a,
    scaleY: l
  };
}
var Kt;
function Br(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? zi : ys(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Gr(e) {
  return e == null || (Kt || (Kt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Kt.setAttribute("transform", e), !(e = Kt.transform.baseVal.consolidate())) ? zi : (e = e.matrix, ys(e.a, e.b, e.c, e.d, e.e, e.f));
}
function vs(e, t, i, s) {
  function n(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, f, r, d, m, w) {
    if (u !== r || f !== d) {
      var E = m.push("translate(", null, t, null, i);
      w.push({ i: E - 4, x: Fe(u, r) }, { i: E - 2, x: Fe(f, d) });
    } else (r || d) && m.push("translate(" + r + t + d + i);
  }
  function a(u, f, r, d) {
    u !== f ? (u - f > 180 ? f += 360 : f - u > 180 && (u += 360), d.push({ i: r.push(n(r) + "rotate(", null, s) - 2, x: Fe(u, f) })) : f && r.push(n(r) + "rotate(" + f + s);
  }
  function l(u, f, r, d) {
    u !== f ? d.push({ i: r.push(n(r) + "skewX(", null, s) - 2, x: Fe(u, f) }) : f && r.push(n(r) + "skewX(" + f + s);
  }
  function p(u, f, r, d, m, w) {
    if (u !== r || f !== d) {
      var E = m.push(n(m) + "scale(", null, ",", null, ")");
      w.push({ i: E - 4, x: Fe(u, r) }, { i: E - 2, x: Fe(f, d) });
    } else (r !== 1 || d !== 1) && m.push(n(m) + "scale(" + r + "," + d + ")");
  }
  return function(u, f) {
    var r = [], d = [];
    return u = e(u), f = e(f), o(u.translateX, u.translateY, f.translateX, f.translateY, r, d), a(u.rotate, f.rotate, r, d), l(u.skewX, f.skewX, r, d), p(u.scaleX, u.scaleY, f.scaleX, f.scaleY, r, d), u = f = null, function(m) {
      for (var w = -1, E = d.length, g; ++w < E; ) r[(g = d[w]).i] = g.x(m);
      return r.join("");
    };
  };
}
var jr = vs(Br, "px, ", "px)", "deg)"), Yr = vs(Gr, ", ", ")", ")"), Kr = 1e-12;
function Mn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Xr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Qr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Zr = (function e(t, i, s) {
  function n(o, a) {
    var l = o[0], p = o[1], u = o[2], f = a[0], r = a[1], d = a[2], m = f - l, w = r - p, E = m * m + w * w, g, _;
    if (E < Kr)
      _ = Math.log(d / u) / t, g = function(R) {
        return [
          l + R * m,
          p + R * w,
          u * Math.exp(t * R * _)
        ];
      };
    else {
      var M = Math.sqrt(E), F = (d * d - u * u + s * E) / (2 * u * i * M), v = (d * d - u * u - s * E) / (2 * d * i * M), S = Math.log(Math.sqrt(F * F + 1) - F), y = Math.log(Math.sqrt(v * v + 1) - v);
      _ = (y - S) / t, g = function(R) {
        var z = R * _, T = Mn(S), V = u / (i * M) * (T * Qr(t * z + S) - Xr(S));
        return [
          l + V * m,
          p + V * w,
          u * T / Mn(t * z + S)
        ];
      };
    }
    return g.duration = _ * 1e3 * t / Math.SQRT2, g;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), l = a * a, p = l * l;
    return e(a, l, p);
  }, n;
})(Math.SQRT2, 2, 4);
var mt = 0, Et = 0, bt = 0, ws = 1e3, ci, St, pi = 0, it = 0, fi = 0, zt = typeof performance == "object" && performance.now ? performance : Date, xs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Zi() {
  return it || (xs(Jr), it = zt.now() + fi);
}
function Jr() {
  it = 0;
}
function ui() {
  this._call = this._time = this._next = null;
}
ui.prototype = bs.prototype = {
  constructor: ui,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Zi() : +i) + (t == null ? 0 : +t), !this._next && St !== this && (St ? St._next = this : ci = this, St = this), this._call = e, this._time = i, Ui();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ui());
  }
};
function bs(e, t, i) {
  var s = new ui();
  return s.restart(e, t, i), s;
}
function ed() {
  Zi(), ++mt;
  for (var e = ci, t; e; )
    (t = it - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --mt;
}
function Pn() {
  it = (pi = zt.now()) + fi, mt = Et = 0;
  try {
    ed();
  } finally {
    mt = 0, id(), it = 0;
  }
}
function td() {
  var e = zt.now(), t = e - pi;
  t > ws && (fi -= t, pi = e);
}
function id() {
  for (var e, t = ci, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : ci = i);
  St = e, Ui(s);
}
function Ui(e) {
  if (!mt) {
    Et && (Et = clearTimeout(Et));
    var t = e - it;
    t > 24 ? (e < 1 / 0 && (Et = setTimeout(Pn, e - zt.now() - fi)), bt && (bt = clearInterval(bt))) : (bt || (pi = zt.now(), bt = setInterval(td, ws)), mt = 1, xs(Pn));
  }
}
function Tn(e, t, i) {
  var s = new ui();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var nd = Xi("start", "end", "cancel", "interrupt"), sd = [], _s = 0, On = 1, qi = 2, ii = 3, Rn = 4, Fi = 5, ni = 6;
function gi(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  od(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: nd,
    tween: sd,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: _s
  });
}
function Ji(e, t) {
  var i = Me(e, t);
  if (i.state > _s) throw new Error("too late; already scheduled");
  return i;
}
function Re(e, t) {
  var i = Me(e, t);
  if (i.state > ii) throw new Error("too late; already running");
  return i;
}
function Me(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function od(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = bs(o, 0, i.time);
  function o(u) {
    i.state = On, i.timer.restart(a, i.delay, i.time), i.delay <= u && a(u - i.delay);
  }
  function a(u) {
    var f, r, d, m;
    if (i.state !== On) return p();
    for (f in s)
      if (m = s[f], m.name === i.name) {
        if (m.state === ii) return Tn(a);
        m.state === Rn ? (m.state = ni, m.timer.stop(), m.on.call("interrupt", e, e.__data__, m.index, m.group), delete s[f]) : +f < t && (m.state = ni, m.timer.stop(), m.on.call("cancel", e, e.__data__, m.index, m.group), delete s[f]);
      }
    if (Tn(function() {
      i.state === ii && (i.state = Rn, i.timer.restart(l, i.delay, i.time), l(u));
    }), i.state = qi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === qi) {
      for (i.state = ii, n = new Array(d = i.tween.length), f = 0, r = -1; f < d; ++f)
        (m = i.tween[f].value.call(e, e.__data__, i.index, i.group)) && (n[++r] = m);
      n.length = r + 1;
    }
  }
  function l(u) {
    for (var f = u < i.duration ? i.ease.call(null, u / i.duration) : (i.timer.restart(p), i.state = Fi, 1), r = -1, d = n.length; ++r < d; )
      n[r].call(e, f);
    i.state === Fi && (i.on.call("end", e, e.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = ni, i.timer.stop(), delete s[t];
    for (var u in s) return;
    delete e.__transition;
  }
}
function si(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > qi && s.state < Fi, s.state = ni, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function ad(e) {
  return this.each(function() {
    si(this, e);
  });
}
function rd(e, t) {
  var i, s;
  return function() {
    var n = Re(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var a = 0, l = s.length; a < l; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function dd(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Re(this, e), a = o.tween;
    if (a !== s) {
      n = (s = a).slice();
      for (var l = { name: t, value: i }, p = 0, u = n.length; p < u; ++p)
        if (n[p].name === t) {
          n[p] = l;
          break;
        }
      p === u && n.push(l);
    }
    o.tween = n;
  };
}
function ld(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Me(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? rd : dd)(i, e, t));
}
function en(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Re(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Me(n, s).value[t];
  };
}
function ks(e, t) {
  var i;
  return (typeof t == "number" ? Fe : t instanceof Lt ? Cn : (i = Lt(t)) ? (t = i, Cn) : Hr)(e, t);
}
function cd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ud(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function md(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function hd(e, t, i) {
  var s, n, o;
  return function() {
    var a, l = i(this), p;
    return l == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), p = l + "", a === p ? null : a === s && p === n ? o : (n = p, o = t(s = a, l)));
  };
}
function fd(e, t, i) {
  var s, n, o;
  return function() {
    var a, l = i(this), p;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), p = l + "", a === p ? null : a === s && p === n ? o : (n = p, o = t(s = a, l)));
  };
}
function gd(e, t) {
  var i = hi(e), s = i === "transform" ? Yr : ks;
  return this.attrTween(e, typeof t == "function" ? (i.local ? fd : hd)(i, s, en(this, "attr." + e, t)) : t == null ? (i.local ? pd : cd)(i) : (i.local ? md : ud)(i, s, t));
}
function Id(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function yd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function vd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && yd(e, o)), i;
  }
  return n._value = t, n;
}
function wd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Id(e, o)), i;
  }
  return n._value = t, n;
}
function xd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = hi(e);
  return this.tween(i, (s.local ? vd : wd)(s, t));
}
function bd(e, t) {
  return function() {
    Ji(this, e).delay = +t.apply(this, arguments);
  };
}
function _d(e, t) {
  return t = +t, function() {
    Ji(this, e).delay = t;
  };
}
function kd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? bd : _d)(t, e)) : Me(this.node(), t).delay;
}
function $d(e, t) {
  return function() {
    Re(this, e).duration = +t.apply(this, arguments);
  };
}
function Ed(e, t) {
  return t = +t, function() {
    Re(this, e).duration = t;
  };
}
function Sd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? $d : Ed)(t, e)) : Me(this.node(), t).duration;
}
function Cd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Re(this, e).ease = t;
  };
}
function Ad(e) {
  var t = this._id;
  return arguments.length ? this.each(Cd(t, e)) : Me(this.node(), t).ease;
}
function Md(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Re(this, e).ease = i;
  };
}
function Pd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Md(this._id, e));
}
function Td(e) {
  typeof e != "function" && (e = ss(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = [], p, u = 0; u < a; ++u)
      (p = o[u]) && e.call(p, p.__data__, u, o) && l.push(p);
  return new Ue(s, this._parents, this._name, this._id);
}
function Od(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), l = 0; l < o; ++l)
    for (var p = t[l], u = i[l], f = p.length, r = a[l] = new Array(f), d, m = 0; m < f; ++m)
      (d = p[m] || u[m]) && (r[m] = d);
  for (; l < s; ++l)
    a[l] = t[l];
  return new Ue(a, this._parents, this._name, this._id);
}
function Rd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Nd(e, t, i) {
  var s, n, o = Rd(t) ? Ji : Re;
  return function() {
    var a = o(this, e), l = a.on;
    l !== s && (n = (s = l).copy()).on(t, i), a.on = n;
  };
}
function Dd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Me(this.node(), i).on.on(e) : this.each(Nd(i, e, t));
}
function Ld(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function zd() {
  return this.on("end.remove", Ld(this._id));
}
function Ud(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Yi(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var l = s[a], p = l.length, u = o[a] = new Array(p), f, r, d = 0; d < p; ++d)
      (f = l[d]) && (r = e.call(f, f.__data__, d, l)) && ("__data__" in f && (r.__data__ = f.__data__), u[d] = r, gi(u[d], t, i, d, u, Me(f, i)));
  return new Ue(o, this._parents, t, i);
}
function qd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ns(e));
  for (var s = this._groups, n = s.length, o = [], a = [], l = 0; l < n; ++l)
    for (var p = s[l], u = p.length, f, r = 0; r < u; ++r)
      if (f = p[r]) {
        for (var d = e.call(f, f.__data__, r, p), m, w = Me(f, i), E = 0, g = d.length; E < g; ++E)
          (m = d[E]) && gi(m, t, i, E, d, w);
        o.push(d), a.push(f);
      }
  return new Ue(o, a, t, i);
}
var Fd = qt.prototype.constructor;
function Vd() {
  return new Fd(this._groups, this._parents);
}
function Wd(e, t) {
  var i, s, n;
  return function() {
    var o = ut(this, e), a = (this.style.removeProperty(e), ut(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function $s(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Hd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = ut(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Bd(e, t, i) {
  var s, n, o;
  return function() {
    var a = ut(this, e), l = i(this), p = l + "";
    return l == null && (p = l = (this.style.removeProperty(e), ut(this, e))), a === p ? null : a === s && p === n ? o : (n = p, o = t(s = a, l));
  };
}
function Gd(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, l;
  return function() {
    var p = Re(this, e), u = p.on, f = p.value[o] == null ? l || (l = $s(t)) : void 0;
    (u !== i || n !== f) && (s = (i = u).copy()).on(a, n = f), p.on = s;
  };
}
function jd(e, t, i) {
  var s = (e += "") == "transform" ? jr : ks;
  return t == null ? this.styleTween(e, Wd(e, s)).on("end.style." + e, $s(e)) : typeof t == "function" ? this.styleTween(e, Bd(e, s, en(this, "style." + e, t))).each(Gd(this._id, e)) : this.styleTween(e, Hd(e, s, t), i).on("end.style." + e, null);
}
function Yd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Kd(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && Yd(e, a, i)), s;
  }
  return o._value = t, o;
}
function Xd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Kd(e, t, i ?? ""));
}
function Qd(e) {
  return function() {
    this.textContent = e;
  };
}
function Zd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Jd(e) {
  return this.tween("text", typeof e == "function" ? Zd(en(this, "text", e)) : Qd(e == null ? "" : e + ""));
}
function el(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function tl(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && el(n)), t;
  }
  return s._value = e, s;
}
function il(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, tl(e));
}
function nl() {
  for (var e = this._name, t = this._id, i = Es(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, p, u = 0; u < l; ++u)
      if (p = a[u]) {
        var f = Me(p, t);
        gi(p, e, i, u, a, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new Ue(s, this._parents, e, i);
}
function sl() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var l = { value: a }, p = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var u = Re(this, s), f = u.on;
      f !== e && (t = (e = f).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(p)), u.on = t;
    }), n === 0 && o();
  });
}
var ol = 0;
function Ue(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Es() {
  return ++ol;
}
var Le = qt.prototype;
Ue.prototype = {
  constructor: Ue,
  select: Ud,
  selectAll: qd,
  selectChild: Le.selectChild,
  selectChildren: Le.selectChildren,
  filter: Td,
  merge: Od,
  selection: Vd,
  transition: nl,
  call: Le.call,
  nodes: Le.nodes,
  node: Le.node,
  size: Le.size,
  empty: Le.empty,
  each: Le.each,
  on: Dd,
  attr: gd,
  attrTween: xd,
  style: jd,
  styleTween: Xd,
  text: Jd,
  textTween: il,
  remove: zd,
  tween: ld,
  delay: kd,
  duration: Sd,
  ease: Ad,
  easeVarying: Pd,
  end: sl,
  [Symbol.iterator]: Le[Symbol.iterator]
};
function al(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var rl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: al
};
function dl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function ll(e) {
  var t, i;
  e instanceof Ue ? (t = e._id, e = e._name) : (t = Es(), (i = rl).time = Zi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, p, u = 0; u < l; ++u)
      (p = a[u]) && gi(p, e, t, u, a, i || dl(p, t));
  return new Ue(s, this._parents, e, t);
}
qt.prototype.interrupt = ad;
qt.prototype.transition = ll;
const Xt = (e) => () => e;
function cl(e, {
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
function ze(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
ze.prototype = {
  constructor: ze,
  scale: function(e) {
    return e === 1 ? this : new ze(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ze(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Mt = new ze(1, 0, 0);
ze.prototype;
function Ai(e) {
  e.stopImmediatePropagation();
}
function _t(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function pl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ul() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Nn() {
  return this.__zoom || Mt;
}
function ml(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function hl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function gl() {
  var e = pl, t = ul, i = fl, s = ml, n = hl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, p = Zr, u = Xi("start", "zoom", "end"), f, r, d, m = 500, w = 150, E = 0, g = 10;
  function _(h) {
    h.property("__zoom", Nn).on("wheel.zoom", z, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", V).filter(n).on("touchstart.zoom", C).on("touchmove.zoom", k).on("touchend.zoom touchcancel.zoom", O).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(h, I, x, b) {
    var A = h.selection ? h.selection() : h;
    A.property("__zoom", Nn), h !== A ? S(h, I, x, b) : A.interrupt().each(function() {
      y(this, arguments).event(b).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, _.scaleBy = function(h, I, x, b) {
    _.scaleTo(h, function() {
      var A = this.__zoom.k, L = typeof I == "function" ? I.apply(this, arguments) : I;
      return A * L;
    }, x, b);
  }, _.scaleTo = function(h, I, x, b) {
    _.transform(h, function() {
      var A = t.apply(this, arguments), L = this.__zoom, P = x == null ? v(A) : typeof x == "function" ? x.apply(this, arguments) : x, W = L.invert(P), j = typeof I == "function" ? I.apply(this, arguments) : I;
      return i(F(M(L, j), P, W), A, a);
    }, x, b);
  }, _.translateBy = function(h, I, x, b) {
    _.transform(h, function() {
      return i(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), t.apply(this, arguments), a);
    }, null, b);
  }, _.translateTo = function(h, I, x, b, A) {
    _.transform(h, function() {
      var L = t.apply(this, arguments), P = this.__zoom, W = b == null ? v(L) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(Mt.translate(W[0], W[1]).scale(P.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), L, a);
    }, b, A);
  };
  function M(h, I) {
    return I = Math.max(o[0], Math.min(o[1], I)), I === h.k ? h : new ze(I, h.x, h.y);
  }
  function F(h, I, x) {
    var b = I[0] - x[0] * h.k, A = I[1] - x[1] * h.k;
    return b === h.x && A === h.y ? h : new ze(h.k, b, A);
  }
  function v(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function S(h, I, x, b) {
    h.on("start.zoom", function() {
      y(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      y(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var A = this, L = arguments, P = y(A, L).event(b), W = t.apply(A, L), j = x == null ? v(W) : typeof x == "function" ? x.apply(A, L) : x, D = Math.max(W[1][0] - W[0][0], W[1][1] - W[0][1]), U = A.__zoom, ee = typeof I == "function" ? I.apply(A, L) : I, oe = p(U.invert(j).concat(D / U.k), ee.invert(j).concat(D / ee.k));
      return function(ae) {
        if (ae === 1) ae = ee;
        else {
          var se = oe(ae), ke = D / se[2];
          ae = new ze(ke, j[0] - se[0] * ke, j[1] - se[1] * ke);
        }
        P.zoom(null, ae);
      };
    });
  }
  function y(h, I, x) {
    return !x && h.__zooming || new R(h, I);
  }
  function R(h, I) {
    this.that = h, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, I), this.taps = 0;
  }
  R.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, I) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var I = Ce(this.that).datum();
      u.call(
        h,
        this.that,
        new cl(h, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: u
        }),
        I
      );
    }
  };
  function z(h, ...I) {
    if (!e.apply(this, arguments)) return;
    var x = y(this, I).event(h), b = this.__zoom, A = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, s.apply(this, arguments)))), L = Ge(h);
    if (x.wheel)
      (x.mouse[0][0] !== L[0] || x.mouse[0][1] !== L[1]) && (x.mouse[1] = b.invert(x.mouse[0] = L)), clearTimeout(x.wheel);
    else {
      if (b.k === A) return;
      x.mouse = [L, b.invert(L)], si(this), x.start();
    }
    _t(h), x.wheel = setTimeout(P, w), x.zoom("mouse", i(F(M(b, A), x.mouse[0], x.mouse[1]), x.extent, a));
    function P() {
      x.wheel = null, x.end();
    }
  }
  function T(h, ...I) {
    if (d || !e.apply(this, arguments)) return;
    var x = h.currentTarget, b = y(this, I, !0).event(h), A = Ce(h.view).on("mousemove.zoom", j, !0).on("mouseup.zoom", D, !0), L = Ge(h, x), P = h.clientX, W = h.clientY;
    $r(h.view), Ai(h), b.mouse = [L, this.__zoom.invert(L)], si(this), b.start();
    function j(U) {
      if (_t(U), !b.moved) {
        var ee = U.clientX - P, oe = U.clientY - W;
        b.moved = ee * ee + oe * oe > E;
      }
      b.event(U).zoom("mouse", i(F(b.that.__zoom, b.mouse[0] = Ge(U, x), b.mouse[1]), b.extent, a));
    }
    function D(U) {
      A.on("mousemove.zoom mouseup.zoom", null), Er(U.view, b.moved), _t(U), b.event(U).end();
    }
  }
  function V(h, ...I) {
    if (e.apply(this, arguments)) {
      var x = this.__zoom, b = Ge(h.changedTouches ? h.changedTouches[0] : h, this), A = x.invert(b), L = x.k * (h.shiftKey ? 0.5 : 2), P = i(F(M(x, L), b, A), t.apply(this, I), a);
      _t(h), l > 0 ? Ce(this).transition().duration(l).call(S, P, b, h) : Ce(this).call(_.transform, P, b, h);
    }
  }
  function C(h, ...I) {
    if (e.apply(this, arguments)) {
      var x = h.touches, b = x.length, A = y(this, I, h.changedTouches.length === b).event(h), L, P, W, j;
      for (Ai(h), P = 0; P < b; ++P)
        W = x[P], j = Ge(W, this), j = [j, this.__zoom.invert(j), W.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== j[2] && (A.touch1 = j, A.taps = 0) : (A.touch0 = j, L = !0, A.taps = 1 + !!f);
      f && (f = clearTimeout(f)), L && (A.taps < 2 && (r = j[0], f = setTimeout(function() {
        f = null;
      }, m)), si(this), A.start());
    }
  }
  function k(h, ...I) {
    if (this.__zooming) {
      var x = y(this, I).event(h), b = h.changedTouches, A = b.length, L, P, W, j;
      for (_t(h), L = 0; L < A; ++L)
        P = b[L], W = Ge(P, this), x.touch0 && x.touch0[2] === P.identifier ? x.touch0[0] = W : x.touch1 && x.touch1[2] === P.identifier && (x.touch1[0] = W);
      if (P = x.that.__zoom, x.touch1) {
        var D = x.touch0[0], U = x.touch0[1], ee = x.touch1[0], oe = x.touch1[1], ae = (ae = ee[0] - D[0]) * ae + (ae = ee[1] - D[1]) * ae, se = (se = oe[0] - U[0]) * se + (se = oe[1] - U[1]) * se;
        P = M(P, Math.sqrt(ae / se)), W = [(D[0] + ee[0]) / 2, (D[1] + ee[1]) / 2], j = [(U[0] + oe[0]) / 2, (U[1] + oe[1]) / 2];
      } else if (x.touch0) W = x.touch0[0], j = x.touch0[1];
      else return;
      x.zoom("touch", i(F(P, W, j), x.extent, a));
    }
  }
  function O(h, ...I) {
    if (this.__zooming) {
      var x = y(this, I).event(h), b = h.changedTouches, A = b.length, L, P;
      for (Ai(h), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, m), L = 0; L < A; ++L)
        P = b[L], x.touch0 && x.touch0[2] === P.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === P.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0) x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (P = Ge(P, this), Math.hypot(r[0] - P[0], r[1] - P[1]) < g)) {
        var W = Ce(this).on("dblclick.zoom");
        W && W.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : Xt(+h), _) : s;
  }, _.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Xt(!!h), _) : e;
  }, _.touchable = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : Xt(!!h), _) : n;
  }, _.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Xt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), _) : t;
  }, _.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], _) : [o[0], o[1]];
  }, _.translateExtent = function(h) {
    return arguments.length ? (a[0][0] = +h[0][0], a[1][0] = +h[1][0], a[0][1] = +h[0][1], a[1][1] = +h[1][1], _) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, _.constrain = function(h) {
    return arguments.length ? (i = h, _) : i;
  }, _.duration = function(h) {
    return arguments.length ? (l = +h, _) : l;
  }, _.interpolate = function(h) {
    return arguments.length ? (p = h, _) : p;
  }, _.on = function() {
    var h = u.on.apply(u, arguments);
    return h === u ? _ : h;
  }, _.clickDistance = function(h) {
    return arguments.length ? (E = (h = +h) * h, _) : Math.sqrt(E);
  }, _.tapDistance = function(h) {
    return arguments.length ? (g = +h, _) : g;
  }, _;
}
var Il = Object.defineProperty, yl = Object.getOwnPropertyDescriptor, me = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? yl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Il(t, i, n), n;
};
function vl(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, l = s.y - i.y, p = n * l - o * a;
  if (Math.abs(p) < 1e-9) return null;
  const u = ((i.x - e.x) * l - (i.y - e.y) * a) / p, f = ((i.x - e.x) * o - (i.y - e.y) * n) / p;
  return u <= 0.02 || u >= 0.98 || f <= 0.02 || f >= 0.98 ? null : { x: e.x + u * n, y: e.y + u * o, t: u };
}
function wl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), l = t.x + a * s, p = t.y + a * n;
  return { dist: Math.hypot(e.x - l, e.y - p), t: a };
}
function xl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], l = Math.hypot(a.x - o.x, a.y - o.y) || 1, p = (a.x - o.x) / l, u = (a.y - o.y) / l, f = t.map(([d, m]) => vl(o, a, d, m)).filter((d) => d !== null).filter((d) => d.t * l > i + 2 && (1 - d.t) * l > i + 2).sort((d, m) => d.t - m.t);
    let r = -1 / 0;
    for (const d of f)
      d.t * l - i <= r + 2 || (s += ` L ${d.x - p * i} ${d.y - u * i}`, s += ` A ${i} ${i} 0 0 1 ${d.x + p * i} ${d.y + u * i}`, r = d.t * l + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const dt = {
  component: Y`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: Y`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: Y`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: Y`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: Y`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: Y`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: Y`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: Y`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: Y`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: Y`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: Y`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: Y`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: Y`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: Y`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: Y`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: Y`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let pe = class extends Te {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Mt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    }, this.fitInsets = {};
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
    this._zoomBehavior = gl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Ce(e).call(this._zoomBehavior);
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
  /** Center and scale the viewport so the whole scene is visible (and unobscured). */
  fit(e = 60) {
    const t = this.scene.nodes, i = this.renderRoot.querySelector("svg.main");
    if (!t.length || !i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return;
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, l = this.fitInsets.bottom ?? 0, p = Math.max(80, s.width - n - o), u = Math.max(80, s.height - a - l), f = Math.min(...t.map((g) => g.x - g.w / 2)) - e, r = Math.max(...t.map((g) => g.x + g.w / 2)) + e, d = Math.min(...t.map((g) => g.y - g.h / 2)) - e, m = Math.max(...t.map((g) => g.y + g.h / 2)) + e, w = Math.max(0.15, Math.min(p / (r - f), u / (m - d), 1.25)), E = Mt.translate(
      n + p / 2 - w * (f + r) / 2,
      a + u / 2 - w * (d + m) / 2
    ).scale(w);
    Ce(i).call(this._zoomBehavior.transform, E);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Ce(t), e);
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
      const a = this.scene.nodes.find((p) => p.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const l = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (l)
        return { x: e.x + (l.x - a.x), y: e.y + (l.y - a.y) };
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
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, a = n.x + s.w / 2 - 10 - e.w / 2, l = n.y - s.h / 2 + 34 + e.h / 2, p = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), a), i = Math.min(Math.max(i, l), p);
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
      (g) => o.has(g.id) && !(g.parentId && o.has(g.parentId))
    ) : null, l = a ? new Map(a.map((g) => [g.id, this.nodePos(g)])) : null, p = (g) => (g.shiftKey || g.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, u = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, f = u !== null, r = u === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], d = () => {
      const g = [], _ = u === "menu" ? this.scene.nodes.filter((M) => M.kind === "ui-app") : this.scene.nodes.filter((M) => M.id === t.parentId);
      for (const M of _) {
        const F = this.scene.nodes.filter((R) => R.parentId === M.id && r.includes(R.kind ?? "") && R.id !== t.id).sort((R, z) => R.y - z.y), v = M.x - M.w / 2 + 10, S = M.x + M.w / 2 - 10;
        for (const R of F) g.push({ x1: v, x2: S, y: R.y - R.h / 2 - 3, appId: M.id, beforeId: R.id });
        const y = F[F.length - 1];
        g.push({
          x1: v,
          x2: S,
          y: y ? y.y + y.h / 2 + 3 : M.y - M.h / 2 + 34 + 8,
          appId: M.id,
          beforeId: null
        });
      }
      return g;
    }, m = (g) => {
      const _ = this.nodeIdAt(g), M = _ && _ !== t.id ? this.scene.nodes.find((F) => F.id === _) : void 0;
      return M ? M.kind === "external-system" ? M.id : M.parentId ?? null : null;
    }, w = (g) => {
      if ((g.buttons & 1) === 0) {
        E(g);
        return;
      }
      const _ = this.toScene(g), M = _.x - i.x, F = _.y - i.y;
      if (!(!n && Math.hypot(M, F) < 3 / this._t.k))
        if (n = !0, a && l) {
          const v = /* @__PURE__ */ new Map();
          for (const S of a) {
            const y = l.get(S.id), R = this.clampToParent(S, y.x + M, y.y + F);
            v.set(S.id, { x: R.x, y: R.y });
          }
          this._dragGroup = v;
        } else if (f) {
          this._dragPos = { id: t.id, x: s.x + M, y: s.y + F }, this._menuSlots || (this._menuSlots = { slots: d(), active: null, nestRowId: null });
          const v = this.scene.nodes.filter(
            (y) => r.includes(y.kind ?? "") && y.id !== t.id && Math.abs(_.x - y.x) <= y.w / 2 + 8
          ), S = u === "menu" ? v.find((y) => Math.abs(_.y - y.y) < y.h * 0.28) : void 0;
          if (S)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: S.id }, this._hoverNodeId = S.id;
          else {
            let y = -1, R = 14;
            this._menuSlots.slots.forEach((z, T) => {
              if (_.x < z.x1 - 24 || _.x > z.x2 + 24) return;
              const V = Math.abs(_.y - z.y);
              V < R && (R = V, y = T);
            }), this._menuSlots = { ...this._menuSlots, active: y >= 0 ? y : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else p(g) ? (this._dragPos = { id: t.id, x: s.x + M, y: s.y + F }, this._hoverNodeId = m(g)) : (this._dragPos = this.clampToParent(t, s.x + M, s.y + F), this._hoverNodeId = null);
    }, E = (g) => {
      if (window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", E), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([_, M]) => ({ id: _, x: M.x, y: M.y }))
        });
      else if (n && this._dragPos && f) {
        const _ = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const M = u === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (_ != null && _.nestRowId)
          this.emit(M, { id: t.id, nestRowId: _.nestRowId });
        else if (_ && _.active !== null) {
          const F = _.slots[_.active];
          this.emit(M, { id: t.id, appId: F.appId, beforeId: F.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (p(g)) {
          const _ = m(g);
          if (g.ctrlKey && t.kind === "api") {
            _ && _ !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: _,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (_ !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: _,
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
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", E);
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
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, l = this.scene.nodes.filter((E) => E.parentId === t.id), p = Math.min(...l.map((E) => E.x - E.w / 2)), u = Math.max(...l.map((E) => E.x + E.w / 2)), f = Math.min(...l.map((E) => E.y - E.h / 2)), r = Math.max(...l.map((E) => E.y + E.h / 2)), d = Gs(
      l.map((E) => ({ dx: E.x - a.x, dy: E.y - a.y, w: E.w, h: E.h })),
      { w: n, h: o }
    ), m = (E) => {
      if ((E.buttons & 1) === 0) {
        w();
        return;
      }
      const g = this.toScene(E);
      if (E.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(d.w, 2 * Math.abs(g.x - a.x)),
          h: Math.max(d.h, 2 * Math.abs(g.y - a.y))
        };
        return;
      }
      const _ = a.x - i * a.w / 2, M = a.y - s * a.h / 2, F = i > 0 ? Math.max(g.x, _ + n, l.length ? u + 10 : -1 / 0) : Math.min(g.x, _ - n, l.length ? p - 10 : 1 / 0), v = s > 0 ? Math.max(g.y, M + o, l.length ? r + 10 : -1 / 0) : Math.min(g.y, M - o, l.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + F) / 2,
        y: (M + v) / 2,
        w: Math.abs(F - _),
        h: Math.abs(v - M)
      };
    }, w = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", w), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", w);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const s = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: s.x, y: s.y };
    const n = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const l = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: l.x, y: l.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, o = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o);
      const l = this.nodeIdAt(a);
      l && l !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: l,
        x: a.clientX,
        y: a.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), o = t - s, a = i - n, l = e.w / 2, p = e.h / 2;
    if (o === 0 && a === 0) return { x: s, y: n };
    const u = 1 / Math.max(Math.abs(o) / l, Math.abs(a) / p);
    return { x: s + o * u, y: n + a * u };
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
    const t = this.scene.nodes.find((f) => f.id === e.sourceId), i = this.scene.nodes.find((f) => f.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, l = s[s.length - 1] ?? n;
    let p = this.borderPoint(t, a.x, a.y), u = this.borderPoint(i, l.x, l.y);
    if (!s.length) {
      const f = this.edgeOffset(e);
      if (f !== 0) {
        const r = Math.hypot(u.x - p.x, u.y - p.y) || 1, d = -(u.y - p.y) / r * f, m = (u.x - p.x) / r * f;
        p = { x: p.x + d, y: p.y + m }, u = { x: u.x + d, y: u.y + m };
      }
    }
    return [p, ...s, u];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (a) => {
      if (!this._wpDrag) return;
      s = !0;
      const l = this.toScene(a), p = [...this._wpDrag.points];
      p[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: p };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = wl(t, e[s], e[s + 1]);
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
    const a = (p) => {
      if ((p.buttons & 1) === 0) {
        l();
        return;
      }
      const u = this.toScene(p);
      if (o) {
        if (this._wpDrag) {
          const f = [...this._wpDrag.points];
          f[n] = u, this._wpDrag = { ...this._wpDrag, points: f };
        }
      } else {
        if (Math.hypot(u.x - s.x, u.y - s.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const f = [...this.edgePoints[t.id] ?? []];
        f.splice(n, 0, u), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: f, index: n };
      }
    }, l = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", l), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", l);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return Y`
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
          ${e.tooltip ? Y`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), l = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, p = t.slice(1, -1);
    return Y`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${xl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? Y`<text x=${l.x} y=${l.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${s}
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
        ${n ? p.map((u, f) => {
      var d;
      const r = ((d = this._selectedWaypoint) == null ? void 0 : d.edgeId) === e.id && this._selectedWaypoint.index === f;
      return Y`
                <circle data-waypoint cx=${u.x} cy=${u.y} r=${r ? 6 : 5}
                        fill=${r ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(m) => {
        m.button === 0 && (m.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: f }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], f));
      }}
                        @dblclick=${(m) => {
        m.stopPropagation(), this.removeWaypoint(e, f);
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
    var d, m, w, E;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, l = ((d = this._resize) == null ? void 0 : d.id) === e.id ? this._resize.w : e.w, p = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.h : e.h, u = l / 2, f = p / 2, r = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return Y`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? Y`<rect x=${-u - 4} y=${-f - 4} width=${l + 8} height=${p + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-u} y=${-f} width=${l} height=${p} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? Y`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? Y`<text x=${-u} y=${-f - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? Y`<g transform="translate(${u - 13}, ${-f + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(g) => {
      g.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(g) => g.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && dt[e.symbol] && !a ? Y`<g transform="translate(${u - (e.collapsible ? 37 : 17)}, ${-f + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${dt[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && dt[e.symbol] ? Y`<g transform="translate(${-u + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${dt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? Y`
              <foreignObject x=${-u + 6} y=${o ? -f + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : a ? Y`<text x=${-u + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${r}</text>` : o ? Y`<text x=${-u + 12} y=${-f + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : Y`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? Y`<line x1=${-u + 8} y1=${-f + 28} x2=${u - 8} y2=${-f + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [u, 0],
      [-u, 0],
      [0, f],
      [0, -f]
    ].map(
      ([g, _]) => Y`
                <circle data-handle cx=${g} cy=${_} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(M) => this.onHandlePointerDown(M, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((E = e.extraHandles) != null && E.length) ? e.extraHandles.map(
      (g, _) => Y`
                <g transform="translate(${-u + 24 + _ * 20}, ${-f})">
                  <circle data-handle r="7" fill=${g.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(M) => this.onHandlePointerDown(M, e, g.kind)}>
                    <title>${g.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, _]) => Y`
                <rect data-resize x=${g * u - 6.5} y=${_ * f - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(M) => this.onResizePointerDown(M, e, g, _)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return Y``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return Y``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return Y`
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
      const l = this.toScene(a);
      !i && Math.hypot(l.x - t.x, l.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: l });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a, b: l } = this._rubber, p = Math.min(a.x, l.x), u = Math.max(a.x, l.x), f = Math.min(a.y, l.y), r = Math.max(a.y, l.y), d = this.scene.nodes.filter((m) => {
          const w = this.nodePos(m);
          return w.x >= p && w.x <= u && w.y >= f && w.y <= r;
        }).map((m) => m.id);
        this.emit("nodes-boxed", { ids: d });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return Y``;
    const { a: e, b: t } = this._rubber;
    return Y`
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
    const s = this.getBoundingClientRect(), n = this._t.k, o = Mt.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Ce(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return $``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, l = n.width / this._t.k, p = n.height / this._t.k;
    return $`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(u) => {
      u.stopPropagation();
      try {
        u.currentTarget.setPointerCapture(u.pointerId);
      } catch {
      }
      this.onMinimapPointer(u, e, s);
    }}
        @pointermove=${(u) => {
      var f, r;
      (r = (f = u.currentTarget).hasPointerCapture) != null && r.call(f, u.pointerId) && this.onMinimapPointer(u, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((u) => {
      const f = this.nodePos(u);
      return Y`<rect
              x=${(f.x - u.w / 2 - e.minX) * s}
              y=${(f.y - u.h / 2 - e.minY) * s}
              width=${Math.max(2, u.w * s)}
              height=${Math.max(2, u.h * s)}
              rx="1" fill=${u.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * s}
            y=${(a - e.minY) * s}
            width=${l * s}
            height=${p * s}
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
    }), $`
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
      (n) => Y`
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
          ${this._menuSlots ? Y`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, o) => Y`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? Y`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${n.x2} cy=${n.y} r="3.5" fill="#0284c7"></circle>` : ""}`
    )}
              </g>` : ""}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
pe.styles = ht`
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
me([
  ie({ attribute: !1 })
], pe.prototype, "scene", 2);
me([
  ie({ attribute: !1 })
], pe.prototype, "selectedId", 2);
me([
  ie({ attribute: !1 })
], pe.prototype, "selectedIds", 2);
me([
  ie({ type: Boolean })
], pe.prototype, "connectable", 2);
me([
  ie({ attribute: !1 })
], pe.prototype, "edgePoints", 2);
me([
  q()
], pe.prototype, "_t", 2);
me([
  q()
], pe.prototype, "_dragPos", 2);
me([
  q()
], pe.prototype, "_menuSlots", 2);
me([
  q()
], pe.prototype, "_dragGroup", 2);
me([
  q()
], pe.prototype, "_pendingLink", 2);
me([
  q()
], pe.prototype, "_hoverNodeId", 2);
me([
  q()
], pe.prototype, "_editingId", 2);
me([
  q()
], pe.prototype, "_spaceDown", 2);
me([
  q()
], pe.prototype, "_wpDrag", 2);
me([
  q()
], pe.prototype, "_selectedWaypoint", 2);
me([
  q()
], pe.prototype, "_resize", 2);
me([
  q()
], pe.prototype, "_rubber", 2);
me([
  ie({ attribute: !1 })
], pe.prototype, "fitInsets", 2);
pe = me([
  ft("modux-canvas")
], pe);
const G = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function we(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ce(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const at = (e) => e.trim().toLowerCase();
function bl(e, t) {
  var T, V, C, k, O;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((h) => [h.id, h.name])), n = e.modules.flatMap(
    (h) => (h.useCases ?? []).map((I) => ({ ...I, moduleId: h.id }))
  ), o = new Set(n.map((h) => h.id)), a = e.aggregates ?? [], l = new Set(
    e.modules.flatMap((h) => (h.domainServices ?? []).map((I) => I.id))
  ), p = e.modules.flatMap(
    (h) => (h.domainEvents ?? []).map((I) => ({ ...I, moduleId: h.id, application: !1 }))
  ), u = e.modules.flatMap(
    (h) => (h.applicationEvents ?? []).map((I) => ({ ...I, moduleId: h.id, application: !0 }))
  ), f = e.modules.flatMap(
    (h) => (h.readModels ?? []).map((I) => ({ ...I, moduleId: h.id }))
  );
  for (const h of n)
    we(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: G.command.w,
      h: G.command.h,
      kind: "use-case",
      symbol: h.policy ? "flow" : "gear",
      fill: h.policy ? G.policy.fill : G.command.fill,
      stroke: h.policy ? G.policy.stroke : G.command.stroke,
      badge: h.policy ? "POLICY" : "COMANDO",
      tooltip: h.policy ? `${h.name} — policy de ${s.get(h.moduleId) ?? h.moduleId} (reacción, no caso de negocio)` : `${h.name} — caso de uso de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  for (const h of a)
    we(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: G.aggregate.w,
      h: G.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: G.aggregate.fill,
      stroke: G.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${h.name} — agregado de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  const r = /* @__PURE__ */ new Map();
  for (const h of [...p, ...u])
    we(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: G.event.w,
      h: G.event.h,
      kind: h.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: G.event.fill,
      stroke: G.event.stroke,
      badge: h.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${h.name} — evento de ${s.get(h.moduleId) ?? h.moduleId}`
    }), r.set(at(h.name), h.id);
  const d = (h) => {
    if (!h || !h.trim()) return null;
    const I = r.get(at(h));
    if (I) return I;
    const x = `evname:${at(h)}`;
    return we(i, {
      id: x,
      label: h,
      x: 0,
      y: 0,
      w: G.event.w,
      h: G.event.h,
      kind: "event-name",
      symbol: "event",
      fill: G.event.fill,
      stroke: G.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${h} — referenciado por nombre, sin evento declarado en el catálogo`
    }), x;
  }, m = (h) => {
    const I = f.find((b) => b.id === h.id) ?? f.find((b) => h.name && at(b.name) === at(h.name)), x = (I == null ? void 0 : I.id) ?? (h.id || (h.name ? `rm:${at(h.name)}` : null));
    return x ? (we(i, {
      id: x,
      label: (I == null ? void 0 : I.name) ?? h.name ?? x,
      x: 0,
      y: 0,
      w: G.readModel.w,
      h: G.readModel.h,
      kind: I ? "read-model" : "derived-read-model",
      fill: G.readModel.fill,
      stroke: G.readModel.stroke,
      dashed: !I,
      badge: "READ MODEL"
    }), x) : null;
  };
  for (const h of e.actorUses ?? []) {
    if (!o.has(h.targetId)) continue;
    const I = (e.actors ?? []).find((x) => x.id === h.actorId);
    I && (we(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: G.actor.w,
      h: G.actor.h,
      kind: "actor",
      symbol: "person",
      fill: G.actor.fill,
      stroke: G.actor.stroke,
      badge: "ACTOR"
    }), ce(i, {
      id: `es-actor:${I.id}->${h.targetId}`,
      sourceId: I.id,
      targetId: h.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const h of e.aiAgents ?? []) {
    const I = (e.agentUses ?? []).filter((P) => P.agentId === h.id), x = (e.agentExternalUses ?? []).filter((P) => P.agentId === h.id), b = (e.agentRags ?? []).filter((P) => P.agentId === h.id), A = (e.agentMcpUses ?? []).filter((P) => P.agentId === h.id), L = (e.agentGatewayUses ?? []).some((P) => P.agentId === h.id) || (e.agentApiOpUses ?? []).some((P) => P.agentId === h.id) || (e.agentQueryUses ?? []).some((P) => P.agentId === h.id) || (e.agentDelegations ?? []).some((P) => P.agentId === h.id) || (e.agentTriggers ?? []).some((P) => P.agentId === h.id);
    if (!(!I.length && !x.length && !b.length && !A.length && !L)) {
      we(i, {
        id: h.id,
        label: h.name,
        x: 0,
        y: 0,
        w: G.actor.w,
        h: G.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${h.name} — agente de IA (consume por MCP)`
      });
      for (const P of I)
        o.has(P.useCaseId) && ce(i, {
          id: `es-agent:${h.id}->${P.useCaseId}`,
          sourceId: h.id,
          targetId: P.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const P of x) {
        const W = e.externalSystems.find(
          (D) => (D.useCases ?? []).some((U) => U.id === P.externalUseCaseId)
        );
        if (!W) continue;
        const j = (T = (W.useCases ?? []).find((D) => D.id === P.externalUseCaseId)) == null ? void 0 : T.name;
        we(i, {
          id: W.id,
          label: W.name,
          x: 0,
          y: 0,
          w: G.external.w,
          h: G.external.h,
          kind: "external-system",
          symbol: "component",
          fill: G.external.fill,
          stroke: G.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentx:${h.id}->${P.externalUseCaseId}`,
          sourceId: h.id,
          targetId: W.id,
          kind: "es-agent-external",
          label: j,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: j ? `Llama a ${j} del sistema externo` : void 0
        });
      }
      for (const P of A) {
        const W = e.externalSystems.find(
          (D) => (D.mcpServers ?? []).some((U) => U.id === P.mcpServerId)
        );
        if (!W) continue;
        const j = (V = (W.mcpServers ?? []).find((D) => D.id === P.mcpServerId)) == null ? void 0 : V.name;
        we(i, {
          id: W.id,
          label: W.name,
          x: 0,
          y: 0,
          w: G.external.w,
          h: G.external.h,
          kind: "external-system",
          symbol: "component",
          fill: G.external.fill,
          stroke: G.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentmcp:${h.id}->${P.mcpServerId}`,
          sourceId: h.id,
          targetId: W.id,
          kind: "es-agent-mcp",
          label: j,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: j ? `Consume las herramientas del servidor MCP ${j}` : void 0
        });
      }
      for (const P of b) {
        const W = (e.rags ?? []).find((j) => j.id === P.ragId);
        if (W) {
          we(i, {
            id: W.id,
            label: W.name,
            x: 0,
            y: 0,
            w: G.readModel.w,
            h: G.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${W.name} — base de conocimiento (retrieval)`
          }), ce(i, {
            id: `es-agrag:${h.id}->${W.id}`,
            sourceId: h.id,
            targetId: W.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const j of W.sourceReadModelIds ?? []) {
            const D = m({ id: j });
            D && ce(i, {
              id: `es-ragsrc:${W.id}->${D}`,
              sourceId: D,
              targetId: W.id,
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
    const I = e.externalSystems.find((x) => x.id === h);
    return I ? (we(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: G.external.w,
      h: G.external.h,
      kind: "external-system",
      symbol: "component",
      fill: G.external.fill,
      stroke: G.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), I.id) : null;
  };
  for (const h of e.externalCalls ?? []) {
    const I = w(h.externalSystemId);
    !I || !o.has(h.useCaseId) || ce(i, {
      id: `es-extin:${I}->${h.useCaseId}`,
      sourceId: I,
      targetId: h.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const h of e.externalUseCaseCalls ?? []) {
    if (!o.has(h.sourceId)) continue;
    const I = e.externalSystems.find(
      (A) => (A.useCases ?? []).some((L) => L.id === h.targetId)
    ), x = I ? w(I.id) : null;
    if (!x) continue;
    const b = (C = ((I == null ? void 0 : I.useCases) ?? []).find((A) => A.id === h.targetId)) == null ? void 0 : C.name;
    ce(i, {
      id: `es-extout:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: x,
      kind: "es-command-external",
      label: b,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: b ? `Llama a ${b} del sistema externo` : void 0
    });
  }
  for (const h of e.aggregateCalls ?? [])
    !o.has(h.sourceId) || !i.nodes.has(h.targetId) || ce(i, {
      id: `es-write:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: h.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const E = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const h of E)
    !i.nodes.has(h.domainEventId) || !(i.nodes.has(h.sourceId) && (o.has(h.sourceId) || a.some((x) => x.id === h.sourceId) || l.has(h.sourceId))) || ce(i, {
      id: `es-emit:${h.sourceId}->${h.domainEventId}`,
      sourceId: h.sourceId,
      targetId: h.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const g = (h, I, x, b, A, L) => (we(i, {
    id: h,
    label: I,
    x: 0,
    y: 0,
    w: G.policy.w,
    h: G.policy.h,
    kind: x,
    symbol: "flow",
    fill: G.policy.fill,
    stroke: G.policy.stroke,
    badge: b,
    tooltip: A
  }), h), _ = (h, I) => {
    const x = d(h);
    x && ce(i, {
      id: `es-trigger:${x}->${I}`,
      sourceId: x,
      targetId: I,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, M = (h, I) => {
    !I || !o.has(I) || ce(i, {
      id: `es-invoke:${h}->${I}`,
      sourceId: h,
      targetId: I,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const h of e.subscriptions ?? []) {
    const I = g(
      h.id,
      h.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${h.name}${h.eventName ? ` — reacciona a ${h.eventName}` : ""}${h.consumerGroup ? ` · grupo ${h.consumerGroup}` : ""}`
    );
    _(h.eventName, I);
    for (const x of h.actions ?? []) {
      if (x.type === "CallUseCase" && M(I, x.useCaseId), x.type === "StartSaga" && x.sagaId) {
        const b = `saga:${x.sagaId}`;
        g(b, x.sagaId, "saga", "SAGA"), ce(i, {
          id: `es-saga:${I}->${b}`,
          sourceId: I,
          targetId: b,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (x.type === "UpdateProjection" && x.projectionId) {
        const b = (e.projections ?? []).find((A) => A.id === x.projectionId);
        b && ce(i, {
          id: `es-feeds:${I}->${b.id}`,
          sourceId: I,
          targetId: b.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const h of e.projections ?? []) {
    const I = g(
      h.id,
      h.name,
      "projection",
      "PROYECCIÓN",
      `${h.name}${h.readModelName ? ` — materializa ${h.readModelName}` : ""}`
    );
    for (const A of h.handledEventIds) {
      const L = i.nodes.has(A) ? A : null;
      L && ce(i, {
        id: `es-trigger:${L}->${I}`,
        sourceId: L,
        targetId: I,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    h.sourceAggregateId && i.nodes.has(h.sourceAggregateId) && ce(i, {
      id: `es-state:${h.id}`,
      sourceId: h.sourceAggregateId,
      targetId: I,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const x = h.sourceExternalUseCaseId ?? h.sourceExternalTableId;
    if (x) {
      const A = e.externalSystems.find(
        (P) => (P.useCases ?? []).some((W) => W.id === x) || (P.tables ?? []).some((W) => W.id === x)
      ), L = A ? w(A.id) : null;
      if (L) {
        const P = ((k = (A.useCases ?? []).find((W) => W.id === x)) == null ? void 0 : k.name) ?? ((O = (A.tables ?? []).find((W) => W.id === x)) == null ? void 0 : O.name);
        ce(i, {
          id: `es-poll:${h.id}`,
          sourceId: L,
          targetId: I,
          kind: "es-projects-poll",
          label: P,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: P ? `polling de ${P}` : "polling"
        });
      }
    }
    const b = m({ id: h.readModelId, name: h.readModelName });
    b && ce(i, {
      id: `es-projects:${I}->${b}`,
      sourceId: I,
      targetId: b,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const h of e.flows) {
    if (h.archetype === "MATERIALIZES") {
      const x = d(h.triggerEvent), b = m({ name: h.readModelName ?? `${h.triggerEvent}View` });
      x && b && ce(i, {
        id: `es-mat:${h.id}`,
        sourceId: x,
        targetId: b,
        kind: "es-materializes",
        label: h.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${h.name} [MATERIALIZES]`
      });
      continue;
    }
    const I = g(
      `flow:${h.id}`,
      h.name,
      "flow",
      `POLICY · ${h.archetype}`,
      `Flow ${h.name} [${h.archetype}]`
    );
    if (_(h.triggerEvent, I), M(I, h.targetUseCaseId), !h.targetUseCaseId) {
      const x = w(h.targetId), b = x ?? `tgt:${h.targetId}`;
      !x && s.has(h.targetId) && we(i, {
        id: b,
        label: s.get(h.targetId) ?? h.targetId,
        x: 0,
        y: 0,
        w: G.module.w,
        h: G.module.h,
        kind: "module",
        symbol: "component",
        fill: G.module.fill,
        stroke: G.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(b) && ce(i, {
        id: `es-deliver:${h.id}`,
        sourceId: I,
        targetId: b,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const h of e.processes ?? []) {
    const I = g(
      h.id,
      h.name,
      "process",
      `PROCESO${h.sla ? ` · SLA ${h.sla}` : ""}`,
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    _(h.triggerEvent, I);
    for (const b of h.steps) M(I, b.useCaseId);
    const x = d(h.onCompletionEventName);
    x && ce(i, {
      id: `es-done:${h.id}`,
      sourceId: I,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const h of e.workflows ?? []) {
    const I = g(
      h.id,
      h.name,
      "workflow",
      "WORKFLOW",
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    _(h.triggerEvent, I);
    for (const b of h.steps ?? []) {
      M(I, b.targetUseCaseId);
      for (const A of [b.emittedEventName, b.completionEventName]) {
        const L = d(A);
        L && ce(i, {
          id: `es-wfemit:${h.id}:${L}`,
          sourceId: I,
          targetId: L,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const x = d(h.onCompletionEventName);
    x && ce(i, {
      id: `es-done:${h.id}`,
      sourceId: I,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const F = [...i.nodes.values()], v = /* @__PURE__ */ new Map();
  for (const h of i.edges)
    v.has(h.targetId) || v.set(h.targetId, []), v.get(h.targetId).push(h.sourceId);
  const S = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), R = (h) => {
    const I = S.get(h);
    if (I !== void 0) return I;
    if (y.has(h)) return 0;
    y.add(h);
    const x = v.get(h) ?? [], b = x.length ? 1 + Math.max(...x.map(R)) : 0;
    return y.delete(h), S.set(h, b), b;
  }, z = /* @__PURE__ */ new Map();
  for (const h of F) {
    const I = t[h.id];
    if (I) {
      h.x = I.x, h.y = I.y;
      continue;
    }
    const x = R(h.id), b = z.get(x) ?? 0;
    z.set(x, b + 1), h.x = 140 + x * 260, h.y = 110 + b * 110;
  }
  return { nodes: F, edges: i.edges };
}
const _l = 190, kl = 56, Dn = 180, $l = 56, El = 150, Sl = 44, Ln = 250, zn = 100;
function Cl(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((l) => t.get(l)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Al(e, t) {
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
function Ml(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (l) => {
    var p;
    return (p = e.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === l)) == null ? void 0 : p.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((l) => {
    var g;
    const p = new Map(l.steps.map((_) => [_.id, _])), u = new Map(l.steps.map((_) => [_.id, Cl(_, p)])), f = /* @__PURE__ */ new Map();
    for (const _ of l.steps) {
      const M = u.get(_.id) ?? 0;
      f.set(M, (f.get(M) ?? 0) + 1);
    }
    const r = Math.max(1, ...f.values()), d = Al(e, l);
    if (d && !n.has(d.id)) {
      n.add(d.id);
      const _ = t[d.id] ?? { x: 140, y: a };
      i.push({
        id: d.id,
        label: d.label,
        x: _.x,
        y: _.y,
        w: El,
        h: Sl,
        kind: d.kind,
        symbol: d.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.kind === "aggregate" ? "AGGREGATE" : d.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const m = t[l.id] ?? { x: 420, y: a };
    i.push({
      id: l.id,
      label: l.name,
      x: m.x,
      y: m.y,
      w: _l,
      h: kl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}${l.onCompletionEventName ? ` · emite ${l.onCompletionEventName} al completar` : ""}`
    }), d && s.push({
      id: `wft:${l.id}`,
      sourceId: d.id,
      targetId: l.id,
      kind: "workflow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    });
    const w = /* @__PURE__ */ new Map();
    let E = 0;
    for (const _ of l.steps) {
      const M = u.get(_.id) ?? 0;
      E = Math.max(E, M);
      const F = w.get(M) ?? 0;
      w.set(M, F + 1);
      const v = t[_.id] ?? {
        x: m.x + (M + 1) * Ln,
        y: a + (F - (f.get(M) - 1) / 2) * zn
      }, S = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: v.x,
        y: v.y,
        w: Dn,
        h: $l,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: S ? `→ ${S}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${S ? ` · lanza ${S}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const y = (_.dependsOnStepIds ?? []).filter((R) => p.has(R));
      y.length === 0 && s.push({
        id: `wfs:${l.id}:${_.id}`,
        sourceId: l.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const R of y)
        s.push({
          id: `wfdep:${R}->${_.id}`,
          sourceId: R,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((g = p.get(R)) == null ? void 0 : g.name) ?? R}`
        });
    }
    if (l.onCompletionEventName) {
      const _ = `done:${l.id}`, M = t[_] ?? { x: m.x + (E + 2) * Ln, y: a };
      i.push({
        id: _,
        label: l.onCompletionEventName,
        x: M.x,
        y: M.y,
        w: Dn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const F = new Set(l.steps.flatMap((S) => S.dependsOnStepIds ?? [])), v = l.steps.filter((S) => !F.has(S.id));
      for (const S of v.length ? v : [])
        s.push({
          id: `wfd:${l.id}:${S.id}`,
          sourceId: S.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      l.steps.length || s.push({
        id: `wfd:${l.id}`,
        sourceId: l.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, r + 1) * zn + 60;
  }), { nodes: i, edges: s };
}
const Un = 250, qe = 30, Qt = 6, Pl = 16, qn = 190, Tl = 60, Ol = 170, Zt = 44;
function Rl(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function he(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Nl(e) {
  const t = [], i = (s, n, o) => {
    for (const a of s ?? []) {
      const l = [...n, a.label];
      t.push({ entry: a, path: l, depth: o }), i(a.children ?? [], l, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Dl(e, t) {
  var g, _, M, F;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], a = (v) => {
    var S;
    return ((S = e.modules.flatMap((y) => y.useCases ?? []).find((y) => y.id === v)) == null ? void 0 : S.name) ?? v;
  }, l = (v) => {
    var S;
    return ((S = e.modules.flatMap((y) => y.queryServices ?? []).find((y) => y.id === v)) == null ? void 0 : S.name) ?? v;
  }, p = /* @__PURE__ */ new Map();
  let u = 160;
  for (const v of n) {
    const S = Nl(v), y = Math.max(
      90,
      54 + S.length * (qe + Qt)
    ), R = t[v.id] ?? { x: 190, y: u + y / 2 };
    u = R.y + y / 2 + 70;
    const z = v.type ?? "APP";
    i.push({
      id: v.id,
      label: v.title || v.name,
      x: R.x,
      y: R.y,
      w: Un,
      h: y,
      kind: "ui-app",
      symbol: z === "ORCHESTRATOR" || z === "VIEW_EDITOR" ? "process" : "component",
      fill: z === "ORCHESTRATOR" || z === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: z === "ORCHESTRATOR" || z === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: z === "ORCHESTRATOR" ? "ORQUESTADOR" : z === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : z === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: z === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : z === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : z === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: z === "ORCHESTRATOR" ? `${v.name} — orquesta y mantiene estado; solo enseña páginas hijas` : z === "MASTER_DETAIL" ? `${v.name} — cabecera + pestañas (ambas son páginas)` : `App: ${v.name}`
    }), v.modelId && (p.set(v.modelId, {
      label: ((g = (e.models ?? []).find((C) => C.id === v.modelId)) == null ? void 0 : g.name) ?? v.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${v.id}->${v.modelId}`,
      sourceId: v.id,
      targetId: v.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [C, k, O, h, I] of [
      [v.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [v.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      C && s.push({
        id: `${k === "app-view" ? "appview" : "appedit"}:${v.id}->${C}`,
        sourceId: v.id,
        targetId: C,
        kind: k,
        color: h,
        label: O,
        arrow: !0,
        tooltip: I
      });
    const T = v.homePageId ?? v.homeAppId;
    T && s.push({
      id: `apphome:${v.id}->${T}`,
      sourceId: v.id,
      targetId: T,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: v.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), z === "MASTER_DETAIL" && v.headerPageId && s.push({
      id: `appheader:${v.id}->${v.headerPageId}`,
      sourceId: v.id,
      targetId: v.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let V = R.y - y / 2 + 34 + 10 + qe / 2;
    for (const { entry: C, path: k, depth: O } of S) {
      const h = Rl(v.id, C, k), I = O * Pl;
      if (i.push({
        id: h,
        label: C.label,
        x: R.x + I / 2,
        y: V,
        w: Un - 20 - I,
        h: qe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (_ = C.children) != null && _.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (M = C.children) != null && M.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: v.id,
        tooltip: (F = C.children) != null && F.length ? "Agrupador (con submenú): no puede abrir nada" : C.pageId ? `Abre ${C.pageId}` : C.uiAdapterId ? `Abre la app ${C.uiAdapterId}` : C.useCaseId ? `Lanza ${C.useCaseId}` : C.aggregateId ? `CRUD inferido sobre ${C.aggregateId}` : C.queryOperationId ? `Listado con filtros de ${C.queryOperationId}` : "Entrada de menú sin destino"
      }), V += qe + Qt, C.uiAdapterId && n.some((x) => x.id === C.uiAdapterId) && s.push({
        id: `menuapp:${h}->${C.uiAdapterId}`,
        sourceId: h,
        targetId: C.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), C.useCaseId && e.modules.some((b) => (b.useCases ?? []).some((A) => A.id === C.useCaseId)) && (p.set(C.useCaseId, {
        label: a(C.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${h}->${C.useCaseId}`,
        sourceId: h,
        targetId: C.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), C.aggregateId && (e.aggregates ?? []).some((x) => x.id === C.aggregateId)) {
        const x = (e.aggregates ?? []).find((b) => b.id === C.aggregateId);
        p.set(x.id, { label: x.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${h}->${x.id}`,
          sourceId: h,
          targetId: x.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (C.queryOperationId) {
        const x = e.modules.flatMap((A) => A.queryServices ?? []).find((A) => A.id === C.queryServiceId), b = ((x == null ? void 0 : x.operations) ?? []).find((A) => A.id === C.queryOperationId);
        x && b && (p.set(b.id, {
          label: `${b.name} (${x.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${h}->${b.id}`,
          sourceId: h,
          targetId: b.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      C.pageId && o.some((x) => x.id === C.pageId) && s.push({
        id: `menupage:${h}->${C.pageId}`,
        sourceId: h,
        targetId: C.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let f = 160;
  const r = (v) => {
    var S;
    return ((S = o.find((y) => y.id === v)) == null ? void 0 : S.name) ?? v;
  };
  for (const v of o) {
    const S = t[v.id] ?? { x: 640, y: f }, y = v.type === "WIZARD" ? v.wizardSteps ?? [] : [], R = y.length ? 54 + y.length * (qe + Qt) : Tl;
    f = S.y + R + 90, i.push({
      id: v.id,
      label: v.name,
      x: S.x,
      y: S.y,
      w: qn,
      h: R,
      kind: "page",
      symbol: "interface",
      badge: v.type ?? "PAGE",
      container: y.length > 0,
      extraHandles: v.type === "CRUD" ? [
        { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
        { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
      ] : void 0,
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: v.route ? `${v.type ?? "PAGE"} · ${v.route}` : v.type ?? "PAGE"
    });
    let z = S.y - R / 2 + 34 + 10 + qe / 2;
    y.forEach((T, V) => {
      const C = T.id ?? T.pageId ?? String(V);
      i.push({
        id: `wizrow:${v.id}:${C}`,
        label: `${V + 1}. ${T.label ?? (T.pageId ? r(T.pageId) : "Paso")}${T.pageId ? "" : " ⌁"}`,
        x: S.x,
        y: z,
        w: qn - 20,
        h: qe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: T.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: v.id,
        tooltip: T.pageId ? `Paso ${V + 1}: ${r(T.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${V + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), z += qe + Qt;
    });
    for (const [T, V, C, k] of [
      [v.crudDetailPageId ?? v.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [v.crudCreatePageId ?? v.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      T && s.push({
        id: `${V === "crud-detail" ? "cruddetail" : "crudnew"}:${v.id}->${T}`,
        sourceId: v.id,
        targetId: T,
        kind: V,
        color: k,
        label: C,
        dashed: !0,
        arrow: !0,
        tooltip: V === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let T = 0; T < (v.wizardSteps ?? []).length; T++) {
      const V = (v.wizardSteps ?? [])[T];
      if (!V.pageId) continue;
      const C = V.id ?? V.pageId;
      s.push({
        id: `wizstep:${v.id}:${C}`,
        sourceId: `wizrow:${v.id}:${C}`,
        targetId: V.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${T + 1} — Supr desmapea`
      });
    }
    v.modelId && (p.set(v.modelId, {
      label: v.modelName ?? v.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${v.id}->${v.modelId}`,
      sourceId: v.id,
      targetId: v.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const T of v.buttons ?? [])
      T.useCaseId && (p.set(T.useCaseId, {
        label: a(T.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${v.id}->${T.useCaseId}`,
        sourceId: v.id,
        targetId: T.useCaseId,
        kind: "page-button",
        label: T.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: T.mappingId ? `Botón «${T.label}» — mapping ${T.mappingId}` : `Botón «${T.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    v.listingQueryServiceId && (p.set(v.listingQueryServiceId, {
      label: l(v.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${v.id}->${v.listingQueryServiceId}`,
      sourceId: v.id,
      targetId: v.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let d = 160;
  for (const v of e.models ?? [])
    p.has(v.id) || p.set(v.id, { label: v.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [v, S] of p) {
    const y = t[v] ?? { x: 1050, y: d };
    d = y.y + Zt + 46, i.push({
      id: v,
      label: S.label,
      x: y.x,
      y: y.y,
      w: Ol,
      h: Zt,
      kind: S.kind,
      symbol: S.symbol,
      fill: "#ffffff",
      stroke: S.stroke
    });
  }
  const m = (e.actorAppUses ?? []).filter(
    (v) => n.some((S) => S.id === v.appId) && (e.actors ?? []).some((S) => S.id === v.actorId)
  ), w = [...new Set(m.map((v) => v.actorId))];
  let E = 160;
  for (const v of w) {
    const S = (e.actors ?? []).find((R) => R.id === v), y = t[v] ?? { x: -60, y: E };
    E = y.y + Zt + 46, i.push({
      id: v,
      label: S.name,
      x: y.x,
      y: y.y,
      w: 150,
      h: Zt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const v of m)
    s.push({
      id: `actorapp:${v.actorId}->${v.appId}`,
      sourceId: v.actorId,
      targetId: v.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: s };
}
async function Ll(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((p) => p.e), s = new i(), o = {
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
    children: e.nodes.map((p) => ({ id: p.id, width: p.w, height: p.h })),
    edges: e.edges.map((p) => ({ id: p.id, sources: [p.sourceId], targets: [p.targetId] }))
  }, a = await s.layout(o), l = {};
  for (const p of a.children ?? [])
    l[p.id] = {
      x: (p.x ?? 0) + (p.width ?? 0) / 2,
      y: (p.y ?? 0) + (p.height ?? 0) / 2
    };
  return l;
}
var zl = Object.defineProperty, Ul = Object.getOwnPropertyDescriptor, Pe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ul(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && zl(t, i, n), n;
};
const ql = /* @__PURE__ */ new Set([
  "external-system",
  "actor",
  "ai-agent",
  "rag",
  "mcp-gateway",
  "api",
  "proxy-api",
  "workflow-step",
  "aggregate",
  "domain-service",
  "use-case",
  "domain-event",
  "application-event",
  "external-use-case",
  "external-table",
  "mcp-server",
  "api-operation",
  "page",
  "menu-item"
]);
let be = class extends Te {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var o, a;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus(), (o = this.setPointerCapture) == null || o.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (a = t == null ? void 0 : t.closest) == null ? void 0 : a.call(t, ".h3");
      if (i != null && i.dataset.sourceId) {
        const l = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - l.left,
          y1: e.clientY - l.top,
          x2: e.clientX - l.left,
          y2: e.clientY - l.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const s = e.shiftKey || this._space || e.button === 1, n = s ? null : this.plateAt(e);
      this._drag = {
        mode: n ? "node" : s ? "pan" : "orbit",
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        nodeId: n == null ? void 0 : n.dataset.nodeId,
        nodeKind: n == null ? void 0 : n.dataset.kind,
        moved: !1
      };
    }, this.onMove = (e) => {
      var s, n;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const o = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - o.left, y2: e.clientY - o.top };
        const a = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), l = (n = a == null ? void 0 : a.closest) == null ? void 0 : n.call(a, ".n3"), p = (l == null ? void 0 : l.dataset.nodeId) ?? null;
        this._hoverTargetId = p !== this._connect.sourceId ? p : null;
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, i) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const o = this.unproject(t, i);
          this._liveMove = { id: this._drag.nodeId, dx: o.x, dy: o.y };
        }
        return;
      }
      this._drag.mode === "pan" ? this._pan = { x: this._drag.pan.x + t, y: this._drag.pan.y + i } : (this._rz = this._drag.rz + t * 0.4, this._rx = Math.max(5, Math.min(80, this._drag.rx + i * 0.3)));
    }, this.onUp = () => {
      var t;
      const e = this._drag;
      if (this._drag = null, !!e) {
        if (e.mode === "connect") {
          const i = (t = this._connect) == null ? void 0 : t.sourceId, s = this._hoverTargetId;
          this._connect = null, this._hoverTargetId = null, i && s && s !== i && this.emit("connect-requested", { sourceId: i, targetId: s });
          return;
        }
        if (e.mode === "node" && e.nodeId) {
          const i = this.scene.nodes.find((s) => s.id === e.nodeId);
          e.moved && i && this._liveMove ? this.emit("node-moved", {
            id: e.nodeId,
            x: i.x + this._liveMove.dx,
            y: i.y + this._liveMove.dy
          }) : i && this.emit("element-selected", { elementType: "node", id: i.id, kind: i.kind }), this._liveMove = null;
          return;
        }
        !e.moved && Math.abs(this._rz - e.rz) < 0.5 && Math.abs(this._rx - e.rx) < 0.5 && this._pan.x === e.pan.x && this._pan.y === e.pan.y && this.emit("selection-cleared");
      }
    }, this.onDblClick = (e) => {
      var s, n;
      const t = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), i = ((n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, ".n3")) ?? this.plateAt(e);
      if (i != null && i.dataset.nodeId) {
        this.emit("element-activated", {
          elementType: "node",
          id: i.dataset.nodeId,
          kind: i.dataset.kind
        });
        return;
      }
      this.reset();
    }, this.onKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        e.preventDefault(), this.emit(e.shiftKey ? "redo-requested" : "undo-requested");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
        e.preventDefault(), this.emit("redo-requested");
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && this.selectedId) {
        const t = this.scene.nodes.find((i) => i.id === this.selectedId);
        t && (e.preventDefault(), this.emit("delete-requested", { elementType: "node", id: t.id, kind: t.kind }));
      }
      e.key === "Escape" && this.emit("selection-cleared");
    }, this.onWheel = (e) => {
      e.preventDefault();
      const t = e.deltaY < 0 ? 1.1 : 0.9;
      this._k = Math.max(0.15, Math.min(3, this._k * t));
    }, this.reset = () => {
      this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 };
    };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  connectedCallback() {
    super.connectedCallback(), this.tabIndex = 0, window.addEventListener("keydown", this.onSpaceKey), window.addEventListener("keyup", this.onSpaceKey), this.addEventListener("pointerdown", this.onDown), this.addEventListener("pointermove", this.onMove), this.addEventListener("pointerup", this.onUp), this.addEventListener("pointercancel", this.onUp), this.addEventListener("wheel", this.onWheel, { passive: !1 }), this.addEventListener("dblclick", this.onDblClick), this.addEventListener("keydown", this.onKeydown);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this.onSpaceKey), window.removeEventListener("keyup", this.onSpaceKey), this.removeEventListener("pointerdown", this.onDown), this.removeEventListener("pointermove", this.onMove), this.removeEventListener("pointerup", this.onUp), this.removeEventListener("pointercancel", this.onUp), this.removeEventListener("wheel", this.onWheel), this.removeEventListener("dblclick", this.onDblClick), this.removeEventListener("keydown", this.onKeydown), super.disconnectedCallback();
  }
  firstUpdated() {
    this.focus();
  }
  /** The plate under the pointer, if any (events retarget at the host boundary). */
  plateAt(e) {
    var i;
    const t = e.composedPath()[0];
    return ((i = t == null ? void 0 : t.closest) == null ? void 0 : i.call(t, ".n3")) ?? null;
  }
  /**
   * A pointer delta on screen → a delta on the floor plane: undo the zoom, the
   * rotateX foreshortening of the screen-Y axis, then the rotateZ bearing.
   */
  unproject(e, t) {
    const i = e / this._kUsed, s = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), n = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(n) + s * Math.sin(n),
      y: -i * Math.sin(n) + s * Math.cos(n)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var s, n, o;
    const i = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e, t);
    return ((o = (n = i == null ? void 0 : i.closest) == null ? void 0 : n.call(i, ".n3")) == null ? void 0 : o.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), s = i.width * 0.5, n = i.height * 0.42, o = new DOMMatrix();
    o.m34 = -1 / 1600;
    const a = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), l = a.transformPoint(new DOMPoint(0, 0, 0, 1)), p = a.transformPoint(new DOMPoint(1, 0, 0, 0)), u = a.transformPoint(new DOMPoint(0, 1, 0, 0)), f = e - i.left, r = t - i.top, d = p.x - f * p.w, m = u.x - f * u.w, w = p.y - r * p.w, E = u.y - r * u.w, g = f * l.w - l.x, _ = r * l.w - l.y, M = d * E - m * w;
    return M ? { x: (g * E - m * _) / M, y: (d * _ - g * w) / M } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const o = s.parentId ? e.get(s.parentId) : void 0, a = o ? i(o) + 1 : 0;
      return t.set(s.id, a), a;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return $`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((g) => [g.id, g])), s = Math.min(...e.map((g) => g.x - g.w / 2)) - 60, n = Math.max(...e.map((g) => g.x + g.w / 2)) + 60, o = Math.min(...e.map((g) => g.y - g.h / 2)) - 60, a = Math.max(...e.map((g) => g.y + g.h / 2)) + 60, l = (s + n) / 2, p = (o + a) / 2, u = this.getBoundingClientRect(), f = u.width ? Math.min(u.width / (n - s), u.height / (a - o), 1) * 0.9 : 0.5, r = this._k * f;
    this._kUsed = r, this._center = { x: l, y: p };
    const d = 30, m = this._liveMove, w = (g) => g.x + ((m == null ? void 0 : m.id) === g.id ? m.dx : 0), E = (g) => g.y + ((m == null ? void 0 : m.id) === g.id ? m.dy : 0);
    return $`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${r}, ${r}, ${r}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-l}px, ${-p}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${o}px"
            width=${n - s}
            height=${a - o}
            viewBox="${s} ${o} ${n - s} ${a - o}"
          >
            ${this.scene.edges.map((g) => {
      const _ = i.get(g.sourceId), M = i.get(g.targetId);
      return !_ || !M ? "" : Y`<line
                x1=${w(_)} y1=${E(_)} x2=${w(M)} y2=${E(M)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((g) => {
      const _ = i.get(g.sourceId), M = i.get(g.targetId);
      if (!_ || !M) return "";
      const F = (t.get(_.id) ?? 0) * d + 2, v = (t.get(M.id) ?? 0) * d + 2, S = w(M) - w(_), y = E(M) - E(_), R = v - F, z = Math.hypot(S, y), T = Math.hypot(z, R), V = Math.atan2(y, S) * 180 / Math.PI, C = Math.atan2(R, z) * 180 / Math.PI, k = g.color ?? "#64748b", O = g.dashed ? `repeating-linear-gradient(90deg, ${k} 0 6px, transparent 6px 10px)` : k;
      return $`<div
              class="edge3"
              style="
                left: ${w(_)}px; top: ${E(_)}px; width: ${T}px; height: 1.7px;
                transform: translateZ(${F}px) rotateZ(${V}deg) rotateY(${-C}deg);
                background: ${O};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((g) => {
      const _ = t.get(g.id) ?? 0, M = g.container || _ === 0, F = this._hoverTargetId === g.id;
      return $`
              <div
                class="n3 ${g.container ? "container3" : ""} ${this.selectedId === g.id ? "selected3" : ""} ${F ? "hover3" : ""}"
                data-node-id=${g.id}
                data-kind=${g.kind}
                title=${g.tooltip ?? g.label}
                style="
                  left: ${w(g) - g.w / 2}px; top: ${E(g) - g.h / 2}px;
                  width: ${g.w}px; height: ${g.h}px;
                  transform: translateZ(${_ * d + (F ? 8 : 0)}px)${F ? " scale(1.06)" : ""};
                  background: ${g.container ? "color-mix(in srgb, " + (g.fill ?? "#ffffff") + " 82%, transparent)" : g.fill ?? "#ffffff"};
                  border-color: ${g.stroke ?? "#64748b"};
                  border-style: ${g.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${M ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${g.badge ? $`<span class="badge3" style="color: ${g.stroke ?? "#94a3b8"}">${g.badge}</span>` : ""}
                <span>${g.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const g = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!g || !ql.has(g.kind)) return "";
      const _ = (t.get(g.id) ?? 0) * d + 4;
      return [
        [w(g) + g.w / 2, E(g)],
        [w(g) - g.w / 2, E(g)],
        [w(g), E(g) + g.h / 2],
        [w(g), E(g) - g.h / 2]
      ].map(
        ([F, v]) => $`<div
                class="h3"
                data-source-id=${g.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${F}px; top: ${v}px; transform: translateZ(${_}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? $`<svg class="rubber">
            <line
              x1=${this._connect.x1}
              y1=${this._connect.y1}
              x2=${this._connect.x2}
              y2=${this._connect.y2}
              stroke="#38bdf8"
              stroke-width="2"
              stroke-dasharray="7 5"
            ></line>
          </svg>` : ""}
      <div class="hud">
        click selecciona · doble click abre · arrastra una placa para moverla · arrastra el fondo
        para orbitar · shift, espacio o botón central+arrastra panea · rueda para zoom · Supr borra · doble click en el
        fondo resetea
      </div>
    `;
  }
};
be.styles = ht`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse at 50% 30%, #1e293b 0%, #0f172a 70%);
      cursor: grab;
      user-select: none;
      touch-action: none;
    }
    :host(:active) {
      cursor: grabbing;
    }
    .stage {
      position: absolute;
      inset: 0;
      perspective: 1600px;
      perspective-origin: 50% 42%;
    }
    .world {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0;
      height: 0;
      transform-style: preserve-3d;
    }
    .world,
    .world * {
      transform-style: preserve-3d;
    }
    .floor {
      position: absolute;
      overflow: visible;
      /* Shadows only — coplanar with the base plates, it must never win the hit test. */
      pointer-events: none;
    }
    .edge3 {
      position: absolute;
      height: 0;
      transform-origin: 0 50%;
      pointer-events: none;
    }
    .n3 {
      position: absolute;
      box-sizing: border-box;
      border: 1.6px solid;
      border-radius: 8px;
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2px 6px;
      overflow: hidden;
      cursor: move;
    }
    .n3.selected3 {
      outline: 2.5px solid #38bdf8;
      outline-offset: 2px;
    }
    .n3 {
      transition: transform 0.12s ease, box-shadow 0.12s ease;
    }
    .n3.hover3 {
      outline: 2.5px solid #34d399;
      outline-offset: 2px;
      z-index: 5;
    }
    .h3 {
      position: absolute;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      border-radius: 999px;
      background: #2563eb;
      border: 1.5px solid #ffffff;
      cursor: crosshair;
    }
    .rubber {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 30;
    }
    .n3.container3 {
      align-items: flex-start;
      justify-content: flex-start;
      font-weight: 700;
      font-size: 13px;
      padding: 6px 10px;
    }
    .n3 .badge3 {
      position: absolute;
      top: -16px;
      left: 0;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.07em;
      color: #94a3b8;
      white-space: nowrap;
    }
    .hud {
      /* right-aligned: the palette docks on the left and was covering it */
      position: absolute;
      right: 12px;
      bottom: 10px;
      max-width: 46%;
      text-align: right;
      font: 11px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
    }
  `;
Pe([
  ie({ attribute: !1 })
], be.prototype, "scene", 2);
Pe([
  ie({ attribute: !1 })
], be.prototype, "selectedId", 2);
Pe([
  ie({ attribute: !1 })
], be.prototype, "connectable", 2);
Pe([
  q()
], be.prototype, "_rx", 2);
Pe([
  q()
], be.prototype, "_rz", 2);
Pe([
  q()
], be.prototype, "_k", 2);
Pe([
  q()
], be.prototype, "_pan", 2);
Pe([
  q()
], be.prototype, "_liveMove", 2);
Pe([
  q()
], be.prototype, "_connect", 2);
Pe([
  q()
], be.prototype, "_hoverTargetId", 2);
be = Pe([
  ft("modux-tilt")
], be);
var Fl = Object.defineProperty, Vl = Object.getOwnPropertyDescriptor, ue = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Vl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Fl(t, i, n), n;
};
const Fn = [
  "regular",
  "textarea",
  "checkbox",
  "toggle",
  "radio",
  "select",
  "combobox",
  "listBox",
  "email",
  "password",
  "richText",
  "html",
  "markdown",
  "image",
  "icon",
  "link",
  "money",
  "color",
  "choice",
  "slider",
  "stars"
];
let te = class extends Te {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? $`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? $`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? $`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? $`<div class="control">••••••••</div>` : t === "email" ? $`<div class="control">nombre@dominio.com</div>` : t === "money" ? $`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? $`<div class="control">──────●──</div>` : t === "stars" ? $`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? $`<div class="control area">🖼</div>` : t === "link" ? $`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? $`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? $`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? $`<div class="control" style="justify-content:flex-end">0</div>` : $`<div class="control">Texto…</div>`;
  }
  applyRename() {
    var t;
    const e = (this._rename ?? "").trim();
    this._rename = null, e && e !== ((t = this.page) == null ? void 0 : t.name) && this.emitEvent("page-renamed", { name: e });
  }
  applyRoute() {
    var t;
    const e = (this._route ?? "").trim();
    this._route = null, e && e !== ((t = this.page) == null ? void 0 : t.route) && this.emitEvent("page-route-changed", { route: e });
  }
  applyButton(e) {
    const t = this._btn;
    this._btn = null, !(!t || !t.useCaseId) && (e ? this.emitEvent("button-changed", {
      useCaseId: t.useCaseId,
      label: t.label.trim() || null,
      mappingId: t.mappingId || null
    }) : (this.emitEvent("button-added", { useCaseId: t.useCaseId, label: t.label.trim() || void 0 }), t.mappingId && this.emitEvent("button-changed", {
      useCaseId: t.useCaseId,
      label: t.label.trim() || null,
      mappingId: t.mappingId
    })));
  }
  /** A node of the content tree, by id. */
  nodeById(e) {
    var s;
    let t = null;
    const i = (n) => {
      for (const o of n ?? [])
        o.id === e && (t = o), i(o.children);
    };
    return i((s = this.page) == null ? void 0 : s.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var s;
    let t = null;
    const i = (n, o) => {
      for (const a of n ?? [])
        a.id === e && (t = o), i(a.children, a);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var o;
    let i = !1;
    const s = (a) => {
      a.id === e && (i = !0);
      for (const l of a.children ?? []) s(l);
    }, n = (a) => {
      for (const l of a ?? [])
        l.id === t ? s(l) : n(l.children);
    };
    return n((o = this.page) == null ? void 0 : o.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var n;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((n = this.page) == null ? void 0 : n.content) ?? [], s = i.findIndex((o) => o.id === e);
    return s >= 0 ? i[s + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), s = (t.clientY - i.top) / Math.max(1, i.height);
    return te.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((p) => p.kind === "tab"), l = a.find((p) => p.id === this._activeTabs[e.id]) ?? a[0];
      l && (e = l);
    }
    if (t === "into" && !te.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var o, a;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const l = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
      if (!l) return;
      let p;
      try {
        p = JSON.parse(l);
      } catch {
        return;
      }
      if (!p.componentId || !p.pageId || p.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
      const u = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: p.pageId, componentId: p.componentId, ...u });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const n = this.slotFor(e, t);
    n.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...n });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var p, u, f;
    const t = e.children ?? [], i = (r) => r.map((d) => this.renderComponent(d)), s = $`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = $`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const r = t.slice(0, Math.ceil(t.length / 2)), d = t.slice(Math.ceil(t.length / 2));
        n = $`<div class="row-lay">
          <div class="col-lay">${r.length ? i(r) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${d.length ? i(d) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        n = $`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        n = $`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const r = t.filter((m) => m.kind === "tab"), d = r.find((m) => m.id === this._activeTabs[e.id]) ?? r[0];
        n = $`
          <div class="tabbar">
            ${r.map(
          (m, w) => $`<span
                class=${m === d ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(E) => {
            E.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: m.id }, this.emitEvent("component-selected", { componentId: m.id });
          }}
                @dblclick=${(E) => {
            E.stopPropagation(), this._cmp = { ...m };
          }}
                @dragstart=${(E) => {
            var g, _;
            E.stopPropagation(), this._dragCmpId = m.id, (_ = E.dataTransfer) == null || _.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (g = this.page) == null ? void 0 : g.id, componentId: m.id })
            );
          }}
                @dragover=${(E) => {
            var g;
            ((g = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : g.kind) === "tab" && (E.preventDefault(), E.stopPropagation());
          }}
                @drop=${(E) => {
            var v, S;
            const g = this._dragCmpId;
            if (!g || g === m.id || ((v = this.nodeById(g)) == null ? void 0 : v.kind) !== "tab") return;
            E.preventDefault(), E.stopPropagation();
            const _ = E.currentTarget.getBoundingClientRect(), F = E.clientX - _.left < _.width / 2 ? m.id : ((S = r[w + 1]) == null ? void 0 : S.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, F !== g && this.emitEvent("component-moved", {
              componentId: g,
              toParentId: e.id,
              beforeComponentId: F
            });
          }}
                >${m.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${d ? this.renderComponent(d) : s}`;
        break;
      }
      case "tab":
        n = $`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = $`<div class="col-lay">
          ${t.length ? t.map(
          (r, d) => $`
                  <div class="acc-bar"><span>${r.title ?? r.label ?? "Sección"}</span><span>${d === 0 ? "▾" : "▸"}</span></div>
                  ${d === 0 ? this.renderComponent(r) : J}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = $`<div class="card-box">
          ${e.title ? $`<div class="card-title">${e.title}</div>` : J}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = $`<div class="grid3-lay">
          ${t.length ? t.map((r) => $`<div class="board-col">${this.renderComponent(r)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [r, ...d] = t;
        n = $`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${r ? this.renderComponent(r) : $`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${d.length ? i(d) : $`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        n = $`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        n = $`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        n = $`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const d = e.modelId && e.modelId === ((p = this.page) == null ? void 0 : p.modelId) ? ((u = this.page) == null ? void 0 : u.viewmodelFields) ?? [] : [];
        n = d.length ? $`<div class="grid-lay">
              ${d.slice(0, 6).map(
          (m) => $`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${m.label ?? m.name}</label>${this.control(m)}</div>`
        )}
            </div>` : $`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const r = (((f = this.page) == null ? void 0 : f.viewmodelFields) ?? []).slice(0, 4);
        n = $`<table>
            <tr>${r.length ? r.map((d) => $`<th>${d.label ?? d.name}</th>`) : $`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => $`<tr>${(r.length ? r : [1, 2, 3]).map(() => $`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? J : $`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = $`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const r = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = $`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(r)}`;
        break;
      }
      case "text":
        n = $`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        n = $`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        n = $`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        n = $`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const o = te.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), l = (r) => {
      var d, m;
      r.stopPropagation(), this._dragCmpId = e.id, (m = r.dataTransfer) == null || m.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (d = this.page) == null ? void 0 : d.id, componentId: e.id })
      ), r.dataTransfer && (r.dataTransfer.effectAllowed = "move");
    };
    return $`<div
      class="cmp ${o ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(r) => {
      r.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(r) => {
      r.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${l}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(r) => {
      var m;
      r.preventDefault(), r.stopPropagation();
      const d = ((m = r.dataTransfer) == null ? void 0 : m.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...d].includes("application/x-modux-cmp") || [...d].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, r) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(r) => {
      var d, m, w;
      this._foreignOver = !1, !(!this._dragCmpId && !((w = (m = (d = r.dataTransfer) == null ? void 0 : d.types) == null ? void 0 : m.includes) != null && w.call(m, "application/x-modux-cmp"))) && (r.preventDefault(), r.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, r));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${l}
        >${te.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${n}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return $`
        ${i ? $`<table>
              <tr>${t.slice(0, 4).map((s) => $`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => $`<tr>${t.slice(0, 4).map(() => $`<td>···</td>`)}</tr>`)}
            </table>` : J}
        ${t.length ? $`<div class="grid">
              ${t.map(
      (s) => $`
                  <div
                    class="field ${s.colspan === 2 ? "span2" : ""} ${this._overId === s.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${s.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(s)}
                    @dragstart=${(n) => {
        n.stopPropagation(), this._dragId = s.fieldId;
      }}
                    @dragover=${(n) => {
        n.preventDefault(), this._overId = s.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(n) => {
        n.preventDefault(), n.stopPropagation(), this.onDrop(s.fieldId);
      }}
                  >
                    <label>${s.label ?? s.name}</label>
                    ${this.control(s)}
                  </div>
                `
    )}
            </div>` : $`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    const e = this._cmp;
    if (!e) return J;
    const t = (n) => this._cmp = { ...this._cmp, ...n }, i = e.kind, s = [
      "tab",
      "card",
      "accordionLayout",
      "foldoutLayout",
      "metricCard",
      "appLayout",
      "verticalLayout",
      "horizontalLayout",
      "formLayout",
      "splitLayout",
      "tabLayout",
      "gridLayout",
      "boardLayout",
      "dashboardLayout",
      "masterDetailLayout",
      "carouselLayout"
    ].includes(i);
    return $`<div class="pop" @click=${(n) => n.stopPropagation()}>
      ${s ? $`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(n) => t({ title: n.target.value })} />` : J}
      ${i === "text" ? $`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(n) => t({ text: n.target.value })} />` : J}
      ${i === "button" || i === "field" ? $`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(n) => t({ label: n.target.value })} />` : J}
      ${i === "button" ? $`<label>Caso de uso</label>
            <select @change=${(n) => t({ useCaseId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.useCaseId}>—</option>
              ${this.useCases.map((n) => $`<option value=${n.id} ?selected=${n.id === e.useCaseId}>${n.name}</option>`)}
            </select>
            <label>Mapping</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ mappingId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.mappingId}>(el viewmodel viaja tal cual)</option>
              ${this.mappings.map((n) => $`<option value=${n.id} ?selected=${n.id === e.mappingId}>${n.name}</option>`)}
            </select>` : J}
      ${i === "form" ? $`<label>Model</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ modelId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.modelId}>—</option>
              ${this.models.map((n) => $`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`)}
            </select>` : J}
      ${i === "listing" ? $`<label>Consulta</label>
            <select
              style="grid-column: 2 / -1"
              @change=${(n) => {
      const o = n.target.value, a = this.queryOps.find((l) => l.id === o);
      t({ queryOperationId: a == null ? void 0 : a.id, queryServiceId: a == null ? void 0 : a.queryServiceId });
    }}
            >
              <option value="" ?selected=${!e.queryOperationId}>—</option>
              ${this.queryOps.map((n) => $`<option value=${n.id} ?selected=${n.id === e.queryOperationId}>${n.name}</option>`)}
            </select>` : J}
      ${i === "field" ? $`<label>Estereotipo</label>
            <select @change=${(n) => t({ stereotype: n.target.value || void 0 })}>
              ${Fn.map((n) => $`<option value=${n} ?selected=${n === (e.stereotype ?? "regular")}>${n}</option>`)}
            </select>` : J}
      ${i === "tabLayout" ? $`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : J}
      <div class="actions">
        <button
          @click=${() => {
      const n = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: n });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const n = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: n.id,
        title: n.title ?? null,
        text: n.text ?? null,
        label: n.label ?? null,
        useCaseId: n.useCaseId ?? null,
        mappingId: n.mappingId ?? null,
        modelId: n.modelId ?? null,
        queryServiceId: n.queryServiceId ?? null,
        queryOperationId: n.queryOperationId ?? null,
        fieldId: n.fieldId ?? null,
        stereotype: n.stereotype ?? null,
        colspan: n.colspan ?? null
      });
    }}
        >
          Aplicar
        </button>
      </div>
    </div>`;
  }
  /** Clicking outside every node clears the selection (the pop stops its clicks). */
  onBodyClick() {
    this.emitEvent("component-selected", { componentId: null });
  }
  onFieldClick(e) {
    this._editing = {
      fieldId: e.fieldId,
      stereotype: e.stereotype ?? "regular",
      colspan: e.colspan ?? 1,
      label: e.label ?? ""
    };
  }
  applyEdit() {
    if (!this._editing) return;
    const e = this._editing;
    this.emitEvent("field-config-changed", {
      fieldId: e.fieldId,
      stereotype: e.stereotype === "regular" ? null : e.stereotype,
      colspan: e.colspan === 1 ? null : e.colspan,
      label: e.label.trim() === "" ? null : e.label.trim()
    }), this._editing = null;
  }
  onDrop(e) {
    const t = this._dragId;
    if (this._dragId = null, this._overId = null, !t || t === e || !this.page) return;
    const i = (this.page.viewmodelFields ?? []).map((o) => o.fieldId), s = i.indexOf(t), n = i.indexOf(e);
    s < 0 || n < 0 || (i.splice(n, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return J;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, s = e.type === "WIZARD";
    return $`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? $`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(n) => this._rename = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRename(), n.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : $`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        <select
          class="type"
          title="Tipo de página: Página (el contenido decide), CRUD (listado + ficha) o Wizard (pasos)"
          @change=${(n) => this.emitEvent("page-type-changed", { pageType: n.target.value })}
        >
          ${(() => {
      const n = e.type ?? "PAGE", o = [
        ["PAGE", "Página"],
        ["CRUD", "CRUD"],
        ["WIZARD", "Wizard"]
      ];
      return n === "FORM" && o.splice(1, 0, ["FORM", "Form (legado)"]), n === "DASHBOARD" && o.push(["DASHBOARD", "Dashboard (legado)"]), o.map(
        ([a, l]) => $`<option value=${a} ?selected=${n === a}>${l}</option>`
      );
    })()}
        </select>
        ${this._route !== null ? $`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(n) => this._route = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRoute(), n.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : $`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (n) => $`<span
            class="btn"
            title=${n.mappingId ? `${n.useCaseId} · mapping ${n.mappingId}` : n.useCaseId ?? ""}
            @click=${() => this._btn = {
        useCaseId: n.useCaseId ?? "",
        label: n.label ?? "",
        mappingId: n.mappingId ?? ""
      }}
            >${n.label}</span
          >`
    )}
        <button class="add" @click=${() => this._btn = { useCaseId: "", label: "", mappingId: "" }}>
          + botón
        </button>
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? $`<span class="chip">${e.modelName ?? e.modelId}</span>` : $`<span>—</span>`}
        <select
          title="Asignar el Model que hace de viewmodel"
          @change=${(n) => {
      const o = n.target.value;
      this.emitEvent("page-model-changed", { modelId: o === "" ? null : o });
    }}
        >
          <option value="" ?selected=${!e.modelId}>(sin viewmodel)</option>
          ${this.models.map(
      (n) => $`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`
    )}
        </select>
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? $`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((n, o) => {
      const a = (e.wizardSteps ?? []).map((p, u) => p.id ?? p.pageId ?? String(u)), l = a[o];
      return $`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${n.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(p) => {
        p.stopPropagation(), this._dragWizKey = l;
      }}
                      @dragover=${(p) => {
        this._dragWizKey && (p.preventDefault(), p.stopPropagation());
      }}
                      @drop=${(p) => {
        const u = this._dragWizKey;
        if (this._dragWizKey = null, !u || u === l) return;
        p.preventDefault(), p.stopPropagation();
        const f = p.currentTarget.getBoundingClientRect(), d = p.clientX - f.left < f.width / 2 ? l : a[o + 1] ?? null;
        d !== u && this.emitEvent("wizard-step-moved", { stepKey: u, beforeStepKey: d });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${n.label ?? "Paso"}${n.pageId ? "" : " ⌁"}</span
                    >`;
    }) : $`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : J}
        ${(e.content ?? []).length ? $`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o;
      const n = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((a) => a.useCaseId === this._btn.useCaseId);
      return $`<div class="pop">
              <label>Caso de uso</label>
              <select
                ?disabled=${n}
                @change=${(a) => this._btn = { ...this._btn, useCaseId: a.target.value }}
              >
                <option value="" ?selected=${!this._btn.useCaseId}>elige…</option>
                ${this.useCases.map(
        (a) => $`<option value=${a.id} ?selected=${a.id === this._btn.useCaseId}>${a.name}</option>`
      )}
              </select>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(a) => this._btn = { ...this._btn, label: a.target.value }}
              />
              <label>Mapping</label>
              <select
                style="grid-column: 2 / -1"
                title="ModelMapping del viewmodel al request del caso de uso"
                @change=${(a) => this._btn = { ...this._btn, mappingId: a.target.value }}
              >
                <option value="" ?selected=${!this._btn.mappingId}>(el viewmodel viaja tal cual)</option>
                ${this.mappings.map(
        (a) => $`<option value=${a.id} ?selected=${a.id === this._btn.mappingId}>${a.name}</option>`
      )}
              </select>
              <div class="actions">
                ${n ? $`<button
                      @click=${() => {
        const a = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: a });
      }}
                    >
                      Quitar
                    </button>` : J}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : J}
      ${this._editing ? $`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Fn.map(
      (n) => $`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
    )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(n) => this._editing = { ...this._editing, colspan: Number(n.target.value) }}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(n) => this._editing = { ...this._editing, label: n.target.value }}
            />
            <div class="actions">
              <button @click=${() => this._editing = null}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>` : J}
    `;
  }
};
te.styles = ht`
    :host([framed]) {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      height: 560px;
      box-shadow: 0 8px 26px rgb(2 6 23 / 0.14);
    }
    :host([framed]) button.close {
      display: none;
    }
    :host {
      position: absolute;
      top: 54px;
      right: 12px;
      bottom: 12px;
      width: 460px;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      box-shadow: 0 18px 50px rgb(2 6 23 / 0.25);
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #0f172a;
      overflow: hidden;
      z-index: 40;
    }
    .chrome {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      background: #f1f5f9;
      border-bottom: 1px solid #e2e8f0;
    }
    .dots span {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 999px;
      margin-right: 4px;
      background: #cbd5e1;
    }
    .chrome .title {
      font-weight: 700;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chrome .route {
      color: #64748b;
      font-size: 11px;
    }
    .chrome .type {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #0369a1;
      background: #e0f2fe;
      border-radius: 4px;
      padding: 2px 5px;
    }
    .chrome select.type,
    .chrome input.inline {
      font: inherit;
      font-size: 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 2px 4px;
      min-width: 0;
    }
    .chrome span.type,
    .chrome .route,
    .chrome .title {
      cursor: text;
    }
    .toolbar .btn {
      cursor: pointer;
    }
    .toolbar .add {
      border: 1px dashed #94a3b8;
      color: #64748b;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 9px;
      font-size: 12px;
      cursor: pointer;
    }
    .vm {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 11px;
      color: #64748b;
    }
    .vm select {
      font: inherit;
      font-size: 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 2px 4px;
      max-width: 200px;
    }
    .vm .chip {
      color: #7c3aed;
      background: #f5f3ff;
      border-radius: 4px;
      padding: 2px 6px;
      font-weight: 600;
    }
    .chrome button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 8px;
      cursor: pointer;
      font: inherit;
      font-size: 11px;
    }
    .toolbar {
      display: flex;
      gap: 6px;
      padding: 8px 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .toolbar .btn {
      background: #0284c7;
      color: #ffffff;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
    }
    .toolbar .hint {
      color: #94a3b8;
      font-size: 11px;
      align-self: center;
    }
    .body {
      flex: 1;
      overflow: auto;
      padding: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 12px;
    }
    .field {
      cursor: grab;
      border: 1px dashed transparent;
      border-radius: 8px;
      padding: 4px;
    }
    .field:hover {
      border-color: #7dd3fc;
      background: #f0f9ff;
    }
    .field.dropping {
      border-color: #0284c7;
      background: #e0f2fe;
    }
    .field.span2 {
      grid-column: span 2;
    }
    .field label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 3px;
    }
    .control {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      min-height: 26px;
      padding: 4px 8px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .control.area {
      min-height: 58px;
      align-items: flex-start;
    }
    .control.check {
      border: none;
      justify-content: flex-start;
      gap: 6px;
      color: #334155;
    }
    .box {
      width: 14px;
      height: 14px;
      border: 1.5px solid #94a3b8;
      border-radius: 4px;
    }
    .nested {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px;
      color: #94a3b8;
      font-size: 11px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 11px;
    }
    th {
      text-align: left;
      color: #334155;
      border-bottom: 1.5px solid #cbd5e1;
      padding: 4px 6px;
    }
    td {
      color: #cbd5e1;
      border-bottom: 1px solid #f1f5f9;
      padding: 6px;
    }
    .empty {
      color: #94a3b8;
      text-align: center;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .cmp {
      position: relative;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 18px 8px 8px;
      min-height: 34px;
      margin: 2px 0;
    }
    .cmp:hover {
      border-color: #38bdf8;
    }
    .cmp.overcmp.over-into {
      border-color: #0284c7;
      background: #f0f9ff;
    }
    .cmp.overcmp.over-before {
      box-shadow: 0 -3px 0 0 #0284c7;
      margin-top: 16px;
    }
    .cmp.overcmp.over-after {
      box-shadow: 0 3px 0 0 #0284c7;
      margin-bottom: 16px;
    }
    .cmp {
      cursor: grab;
      transition: margin 0.12s ease;
    }
    .cmp.selcmp {
      outline: 2px solid #0284c7;
      outline-offset: 1px;
    }
    .cmp .kindchip {
      position: absolute;
      top: 2px;
      left: 6px;
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #0ea5e9;
      text-transform: uppercase;
      cursor: grab;
      user-select: none;
    }
    .cmp.leafcmp {
      border-style: solid;
      border-color: #e2e8f0;
    }
    .row-lay {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .row-lay > * {
      flex: 1;
      min-width: 0;
    }
    .col-lay {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .grid-lay {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .grid3-lay {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    .split-divider {
      width: 4px;
      flex: none;
      border-radius: 2px;
      background: #e2e8f0;
    }
    .tabbar {
      display: flex;
      gap: 2px;
      border-bottom: 1.5px solid #cbd5e1;
      margin-bottom: 8px;
    }
    .tabbar span {
      padding: 3px 10px;
      font-size: 11px;
      color: #64748b;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      user-select: none;
    }
    .tabbar span:hover {
      background: #f1f5f9;
    }
    .wizbar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 2px 8px;
      margin-bottom: 8px;
      border-bottom: 1.5px dashed #cbd5e1;
      font-size: 11px;
      color: #94a3b8;
    }
    .wizbar span[draggable='true'] {
      cursor: grab;
      user-select: none;
    }
    .wizbar .on {
      color: #0369a1;
      font-weight: 700;
    }
    .wizbar .wiznext {
      margin-left: auto;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 2px 8px;
      color: #475569;
    }
    .tabbar span.on {
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 700;
    }
    .acc-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 11px;
      color: #334155;
      background: #f8fafc;
    }
    .card-box {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgb(2 6 23 / 0.06);
      padding: 8px;
    }
    .card-title {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .metric {
      text-align: center;
      padding: 6px;
    }
    .metric .num {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
    }
    .metric .cap {
      font-size: 10px;
      color: #64748b;
    }
    .menubar-stub {
      display: flex;
      gap: 14px;
      background: #0f172a;
      color: #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 11px;
    }
    .text-stub {
      color: #334155;
      font-size: 12px;
      line-height: 1.5;
    }
    .board-col {
      background: #f1f5f9;
      border-radius: 8px;
      padding: 6px;
      min-height: 60px;
    }
    .dots-nav {
      text-align: center;
      color: #cbd5e1;
      letter-spacing: 4px;
    }
    .appbar {
      background: #0f172a;
      border-radius: 6px 6px 0 0;
      height: 22px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      color: #94a3b8;
      font-size: 10px;
    }
    .placeholder {
      color: #94a3b8;
      font-size: 11px;
      text-align: center;
      padding: 8px;
    }
    .pop {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 10px;
      padding: 12px;
      display: grid;
      grid-template-columns: auto 1fr auto 1fr;
      gap: 8px 10px;
      align-items: center;
      font-size: 12px;
      box-shadow: 0 10px 30px rgb(2 6 23 / 0.5);
    }
    .pop label {
      color: #94a3b8;
      font-size: 11px;
    }
    .pop select,
    .pop input {
      font: inherit;
      border-radius: 6px;
      border: 1px solid #334155;
      background: #1e293b;
      color: #e2e8f0;
      padding: 3px 6px;
      min-width: 0;
    }
    .pop .actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .pop button {
      font: inherit;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid #334155;
      background: #1e293b;
      color: #e2e8f0;
      padding: 4px 10px;
      cursor: pointer;
    }
    .pop button.ok {
      background: #0284c7;
      border-color: #0284c7;
      color: #ffffff;
      font-weight: 600;
    }
  `;
te.KIND_LABELS = {
  verticalLayout: "Vertical",
  horizontalLayout: "Horizontal",
  formLayout: "Form layout",
  splitLayout: "Split",
  tabLayout: "Tabs",
  tab: "Pestaña",
  accordionLayout: "Acordeón",
  card: "Card",
  gridLayout: "Grid",
  boardLayout: "Board",
  dashboardLayout: "Dashboard",
  masterDetailLayout: "Master-detail",
  foldoutLayout: "Foldout",
  carouselLayout: "Carrusel",
  appLayout: "App layout",
  form: "Formulario",
  listing: "Listado",
  button: "Botón",
  field: "Campo",
  text: "Texto",
  metricCard: "Métrica",
  menuBar: "Menú"
};
te.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
ue([
  ie({ attribute: !1 })
], te.prototype, "page", 2);
ue([
  ie({ type: Boolean, reflect: !0 })
], te.prototype, "framed", 2);
ue([
  ie({ attribute: !1 })
], te.prototype, "models", 2);
ue([
  ie({ attribute: !1 })
], te.prototype, "mappings", 2);
ue([
  ie({ attribute: !1 })
], te.prototype, "useCases", 2);
ue([
  ie({ attribute: !1 })
], te.prototype, "queryOps", 2);
ue([
  ie({ attribute: !1 })
], te.prototype, "selectedCmpId", 2);
ue([
  q()
], te.prototype, "_editing", 2);
ue([
  q()
], te.prototype, "_dragId", 2);
ue([
  q()
], te.prototype, "_overId", 2);
ue([
  q()
], te.prototype, "_rename", 2);
ue([
  q()
], te.prototype, "_route", 2);
ue([
  q()
], te.prototype, "_btn", 2);
ue([
  q()
], te.prototype, "_cmp", 2);
ue([
  q()
], te.prototype, "_dragCmpId", 2);
ue([
  q()
], te.prototype, "_dragWizKey", 2);
ue([
  q()
], te.prototype, "_overCmpId", 2);
ue([
  q()
], te.prototype, "_overCmpPos", 2);
ue([
  q()
], te.prototype, "_foreignOver", 2);
ue([
  q()
], te.prototype, "_activeTabs", 2);
te = ue([
  ft("modux-page-designer")
], te);
var Wl = Object.defineProperty, Hl = Object.getOwnPropertyDescriptor, ve = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Hl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Wl(t, i, n), n;
};
const Ss = 460, Bl = 540, Gl = 660;
let Ie = class extends Te {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((n) => {
        var o;
        return (o = n.classList) == null ? void 0 : o.contains("frame-grip");
      });
      if (i) {
        const o = i.closest(".frame").dataset.pageId, a = this.sizeOf(o);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: o, x: e.clientX, y: e.clientY, w0: a.w, h0: a.h }, e.preventDefault();
        return;
      }
      const s = t.find((n) => {
        var o;
        return (o = n.classList) == null ? void 0 : o.contains("frame-title");
      });
      if (s) {
        const o = s.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: o }), e.preventDefault();
          return;
        }
        const a = this.pages.findIndex((p) => p.id === o), l = this.posOf(o, a);
        this.emit("element-selected", { elementType: "node", id: o, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: o, x: e.clientX, y: e.clientY, ox: l.x, oy: l.y, moved: !1 }, e.preventDefault();
        return;
      }
      if (!t.some((n) => n.tagName === "MODUX-PAGE-DESIGNER")) {
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "pan", x: e.clientX, y: e.clientY, t: { x: this._t.x, y: this._t.y } };
      }
    }, this.onMove = (e) => {
      const t = this._drag;
      if (!t) return;
      if (t.mode === "pan") {
        this._t = { ...this._t, x: t.t.x + e.clientX - t.x, y: t.t.y + e.clientY - t.y };
        return;
      }
      const i = (e.clientX - t.x) / this._t.k, s = (e.clientY - t.y) / this._t.k;
      if (t.mode === "resize") {
        this._liveSize = {
          id: t.id,
          w: Math.max(280, Math.round(t.w0 + i)),
          h: Math.max(220, Math.round(t.h0 + s))
        };
        return;
      }
      Math.abs(i) + Math.abs(s) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + i, y: t.oy + s };
    }, this.onUp = () => {
      const e = this._drag;
      if (this._drag = null, (e == null ? void 0 : e.mode) === "resize" && this._liveSize) {
        const t = this._liveSize;
        this._liveSize = null, (t.w !== e.w0 || t.h !== e.h0) && this.emit("frame-resized", { id: e.id, w: t.w, h: t.h });
        return;
      }
      (e == null ? void 0 : e.mode) === "frame" && e.moved && this._live && this.emit("node-moved", {
        id: e.id,
        x: Math.round(this._live.x),
        y: Math.round(this._live.y)
      }), this._live = null;
    }, this.onWheel = (e) => {
      e.preventDefault();
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = e.deltaY < 0 ? 1.1 : 1 / 1.1, o = Math.max(0.2, Math.min(2.5, this._t.k * n));
      this._t = {
        k: o,
        x: i - (i - this._t.x) / this._t.k * o,
        y: s - (s - this._t.y) / this._t.k * o
      };
    };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  connectedCallback() {
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("pointerdown", this.onDown), this.addEventListener("pointermove", this.onMove), this.addEventListener("pointerup", this.onUp), this.addEventListener("pointercancel", this.onUp), this.addEventListener("wheel", this.onWheel, { passive: !1 });
  }
  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onDown), this.removeEventListener("pointermove", this.onMove), this.removeEventListener("pointerup", this.onUp), this.removeEventListener("pointercancel", this.onUp), this.removeEventListener("wheel", this.onWheel), super.disconnectedCallback();
  }
  /** A client point → surface coordinates (palette drops share the canvas contract). */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect();
    return {
      x: (e - i.left - this._t.x) / this._t.k,
      y: (t - i.top - this._t.y) / this._t.k
    };
  }
  /**
   * The frame under a client point — and, when the point sits on a node of the
   * frame's content tree, `cmp:<pageId>:<componentId>` so palette drops can nest.
   */
  nodeIdAtClient(e, t) {
    var p, u, f, r;
    const i = (p = this.shadowRoot) == null ? void 0 : p.elementFromPoint(e, t), s = (u = i == null ? void 0 : i.closest) == null ? void 0 : u.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (f = o == null ? void 0 : o.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), l = (r = a == null ? void 0 : a.closest) == null ? void 0 : r.call(a, "[data-cmp-id]");
    return l ? `cmp:${n}:${l.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var d, m, w, E;
    const i = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), s = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (w = o == null ? void 0 : o.shadowRoot) == null ? void 0 : w.elementFromPoint(e, t), l = (E = a == null ? void 0 : a.closest) == null ? void 0 : E.call(a, "[data-cmp-id]");
    if (!l) return { pageId: n, componentId: null, pos: "into" };
    const p = l.dataset.cmpKind ?? "", u = l.getBoundingClientRect(), f = (t - u.top) / Math.max(1, u.height), r = te.LEAF_KINDS.has(p) ? f < 0.5 ? "before" : "after" : f < 0.2 ? "before" : f > 0.8 ? "after" : "into";
    return { pageId: n, componentId: l.dataset.cmpId, pos: r };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Ss, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Bl, y: Math.floor(t / 3) * Gl };
  }
  render() {
    return $`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var n;
      const i = this.posOf(e.id, t), s = this.sizeOf(e.id);
      return $`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${s.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""} · ${e.type ?? "PAGE"}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${s.h}px; width: ${s.w}px"
                .page=${e}
                .selectedCmpId=${((n = this.selectedCmp) == null ? void 0 : n.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(o) => {
        o.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...o.detail });
      }}
                @component-removed=${(o) => {
        o.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...o.detail });
      }}
                @component-moved=${(o) => {
        o.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...o.detail });
      }}
                @component-selected=${(o) => {
        o.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...o.detail });
      }}
                @component-transferred=${(o) => {
        o.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...o.detail });
      }}
                @wizard-step-moved=${(o) => {
        o.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...o.detail });
      }}
                @page-renamed=${(o) => {
        o.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...o.detail });
      }}
                @page-type-changed=${(o) => {
        o.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...o.detail });
      }}
                @page-route-changed=${(o) => {
        o.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...o.detail });
      }}
                @page-model-changed=${(o) => {
        o.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...o.detail });
      }}
                @button-added=${(o) => this.emit("page-button-added", { pageId: e.id, ...o.detail })}
                @button-changed=${(o) => this.emit("page-button-changed", { pageId: e.id, ...o.detail })}
                @button-removed=${(o) => this.emit("page-button-removed", { pageId: e.id, ...o.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(o) => this.emit("page-field-config-changed", { pageId: e.id, ...o.detail })}
                @fields-reordered=${(o) => this.emit("page-fields-reordered", { pageId: e.id, ...o.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : $`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Ie.styles = ht`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background-color: #f8fafc;
      background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
      background-size: 26px 26px;
      cursor: grab;
    }
    :host(:active) {
      cursor: grabbing;
    }
    .surface {
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: 0 0;
    }
    .frame {
      position: absolute;
      width: ${Ss}px;
    }
    .frame-title {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 0 4px 5px;
      cursor: move;
      user-select: none;
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      color: #475569;
    }
    .frame-title .route {
      font-weight: 400;
      font-size: 11px;
      color: #94a3b8;
    }
    .frame.selected modux-page-designer {
      outline: 2.5px solid #38bdf8;
      outline-offset: 2px;
      border-radius: 12px;
    }
    .frame-grip {
      position: absolute;
      z-index: 50; /* the framed designer keeps z-index 40 from its floating mode */
      right: -7px;
      bottom: -7px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: #38bdf8;
      border: 2px solid #ffffff;
      cursor: nwse-resize;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .frame:hover .frame-grip,
    .frame.selected .frame-grip {
      opacity: 1;
    }
    .hud {
      /* right-aligned: the palette docks on the left and was covering it */
      position: absolute;
      right: 12px;
      bottom: 10px;
      max-width: 46%;
      text-align: right;
      font: 11px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      font: 14px ui-sans-serif, system-ui, sans-serif;
      text-align: center;
      line-height: 1.7;
      pointer-events: none;
    }
  `;
ve([
  ie({ attribute: !1 })
], Ie.prototype, "pages", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "layout", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "sizes", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "selectedId", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "selectedIds", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "models", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "mappings", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "useCases", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "queryOps", 2);
ve([
  ie({ attribute: !1 })
], Ie.prototype, "selectedCmp", 2);
ve([
  q()
], Ie.prototype, "_t", 2);
ve([
  q()
], Ie.prototype, "_live", 2);
ve([
  q()
], Ie.prototype, "_liveSize", 2);
Ie = ve([
  ft("modux-figma")
], Ie);
var jl = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, K = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Yl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && jl(t, i, n), n;
};
const Vi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Kl = Object.keys(Vi);
function kt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let l = 0, p = 1;
  const u = t.x - e.x, f = t.y - e.y;
  for (const [r, d] of [
    [-u, e.x - s],
    [u, n - e.x],
    [-f, e.y - o],
    [f, a - e.y]
  ]) {
    if (r === 0) {
      if (d < 0) return !1;
      continue;
    }
    const m = d / r;
    if (r < 0) {
      if (m > p) return !1;
      m > l && (l = m);
    } else {
      if (m < l) return !1;
      m < p && (p = m);
    }
  }
  return p - l > 0.02;
}
function Xl(e, t, i = 28) {
  var u;
  const s = new Map(e.nodes.map((f) => [f.id, f])), n = (f) => {
    var d;
    const r = /* @__PURE__ */ new Set();
    for (let m = f; m; m = (d = s.get(m)) == null ? void 0 : d.parentId) r.add(m);
    return r;
  }, o = e.nodes, a = (f) => f.parentId ? Math.min(i, 6) : i, l = /* @__PURE__ */ new Map(), p = (f, r, d) => {
    const m = a(d), w = { x: d.x, y: d.y, w: d.w + 2 * m, h: d.h + 2 * m }, E = d.w / 2 + m * 1.5, g = d.h / 2 + m * 1.5, _ = { x: d.x - E, y: d.y - g }, M = { x: d.x + E, y: d.y - g }, F = { x: d.x - E, y: d.y + g }, v = { x: d.x + E, y: d.y + g }, S = [];
    for (const y of [_, M, F, v])
      !kt(f, y, w) && !kt(y, r, w) && S.push([y]);
    for (const [y, R] of [
      [_, M],
      [M, _],
      [M, v],
      [v, M],
      [v, F],
      [F, v],
      [F, _],
      [_, F]
    ])
      !kt(f, y, w) && !kt(R, r, w) && S.push([y, R]);
    return S;
  };
  for (const f of e.edges) {
    if ((u = t[f.id]) != null && u.length) continue;
    const r = s.get(f.sourceId), d = s.get(f.targetId);
    if (!r || !d) continue;
    const m = /* @__PURE__ */ new Set([...n(r.id), ...n(d.id)]), w = [
      { x: r.x, y: r.y },
      { x: d.x, y: d.y }
    ];
    for (let E = 0; E < 12; E++) {
      let g = !1;
      e: for (let _ = 0; _ < w.length - 1; _++)
        for (const M of o) {
          if (m.has(M.id)) continue;
          const F = a(M), v = { x: M.x, y: M.y, w: M.w + 2 * F, h: M.h + 2 * F };
          if (!kt(w[_], w[_ + 1], v)) continue;
          const S = p(w[_], w[_ + 1], M);
          if (!S.length) continue;
          const y = (z) => o.some(
            (T) => T !== M && !m.has(T.id) && Math.abs(z.x - T.x) < T.w / 2 + a(T) / 2 && Math.abs(z.y - T.y) < T.h / 2 + a(T) / 2
          ), R = (z) => {
            let T = 0;
            const V = [w[_], ...z, w[_ + 1]];
            for (let C = 0; C < V.length - 1; C++)
              T += Math.hypot(V[C + 1].x - V[C].x, V[C + 1].y - V[C].y);
            return T + (z.some(y) ? 1e4 : 0);
          };
          S.sort((z, T) => R(z) - R(T)), w.splice(_ + 1, 0, ...S[0]), g = !0;
          break e;
        }
      if (!g) break;
    }
    w.length > 2 && l.set(
      f.id,
      w.slice(1, -1).map((E) => ({ x: Math.round(E.x), y: Math.round(E.y) }))
    );
  }
  return l;
}
const ne = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Ql(e, t) {
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
    case "ui-app":
      return { elementType: "ui-adapter", id: e };
    case "page":
      return { elementType: "page", id: e };
    default:
      return null;
  }
}
function Zl(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let B = class extends Te {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const s = this.renderRoot.querySelector("modux-canvas"), n = (o) => {
        e.preventDefault(), this.onDiagramScopeChange(o);
      };
      switch (e.key) {
        case "p":
        case "P":
          ["context-map", "workflows", "ui", "design"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
          break;
        case "f":
        case "F":
          e.preventDefault(), this.toggleFullscreen();
          break;
        case "0":
          e.preventDefault(), s == null || s.fit();
          break;
        case "+":
        case "=":
          e.preventDefault(), s == null || s.zoomBy(1.25);
          break;
        case "-":
          e.preventDefault(), s == null || s.zoomBy(0.8);
          break;
        case "t":
        case "T":
          this._activeViewId && (e.preventDefault(), this._treeOpen = !this._treeOpen);
          break;
        case "v":
        case "V":
          e.preventDefault(), this._tilt = !this._tilt;
          break;
        case "e":
        case "E":
          e.preventDefault(), this._view = "eventstorming";
          break;
        case "d":
        case "D":
          this._view === "eventstorming" && (e.preventDefault(), this._view = "context-map");
          break;
        case "1":
          n("level:contexts");
          break;
        case "2":
          n("level:detail");
          break;
        case "3":
          n("level:operations");
          break;
        case "4":
          n("view:aggregates");
          break;
        case "5":
          n("view:flows");
          break;
        case "6":
          n("view:processes");
          break;
        case "7":
          n("view:workflows");
          break;
        case "8":
          n("view:ui");
          break;
        case "9":
          n("view:design");
          break;
        case "?":
          e.preventDefault(), this._helpOpen = !this._helpOpen;
          break;
        case "Escape":
          this._helpOpen && (this._helpOpen = !1);
          break;
      }
    }, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, o = he(t);
      if (!(o != null && o.itemId)) return;
      const a = this.menuEntryIn(o.appId, o.itemId);
      if (!a) return;
      const l = (p, u) => (p ?? []).some((f) => f.id === u || l(f.children, u));
      if (n) {
        const p = he(n);
        if (!(p != null && p.itemId) || p.itemId === o.itemId || o.appId === p.appId && l(a.entry.children, p.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: p.appId,
          itemId: o.itemId,
          parentId: p.itemId
        });
        return;
      }
      if (s) {
        const p = he(s);
        if (!(p != null && p.itemId) || p.itemId === o.itemId) return;
        const u = this.menuEntryIn(p.appId, p.itemId);
        if (!u || o.appId === p.appId && l(a.entry.children, p.itemId) || o.appId === p.appId && u.parentId === a.parentId && a.beforeId === p.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: p.appId,
          itemId: o.itemId,
          parentId: u.parentId ?? void 0,
          beforeItemId: p.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: o.appId, toAppId: i, itemId: o.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var o;
      const { id: t, beforeId: i } = e.detail, s = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!s) return;
      const n = i ? ((o = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : o[1]) ?? null : null;
      this.moveWizardStep(s[1], s[2], n);
    }, this.onDesignKeydown = (e) => {
      const t = e.target;
      if (!(t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
        if ((e.key === "Delete" || e.key === "Backspace") && this._selectedCmp) {
          const { pageId: i, componentId: s } = this._selectedCmp;
          this._selectedCmp = null, this.command({ kind: "remove-page-component", pageId: i, componentId: s }), e.preventDefault();
          return;
        }
        if ((e.key === "Delete" || e.key === "Backspace") && !this._selectedCmp && this._selectedId && (this.model.pages ?? []).some((i) => i.id === this._selectedId)) {
          const i = this._selectedId;
          this._selectedId = null, this.command({ kind: "delete-ui-page", id: i }), e.preventDefault();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c" && this._selectedCmp) {
          const i = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
          i && (this._cmpClipboard = JSON.parse(JSON.stringify(i.node)), this.emit("modux-notice", { message: `Copiado: ${i.node.kind} y sus hijos — Ctrl+V lo pega bajo la selección` })), e.preventDefault();
          return;
        }
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v" && this._cmpClipboard && (this.pasteComponent(), e.preventDefault());
      }
    }, this.onComponentTransferred = (e) => {
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: n, beforeComponentId: o } = e.detail, a = this.componentIn(t, s);
      if (!a || t === i) return;
      const l = JSON.parse(JSON.stringify(a.node)), { ops: p } = this.rebuildComponentOps(i, l, n ?? void 0, o);
      for (const u of p) this.command(u, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, l, a.parentId ?? void 0, a.beforeId).ops
      ]), this._selectedCmp = { pageId: i, componentId: s };
    };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.hostKeydown), this.ownerDocument.addEventListener("fullscreenchange", this.onFullscreenChange);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this.hostKeydown), this.ownerDocument.removeEventListener("fullscreenchange", this.onFullscreenChange), super.disconnectedCallback();
  }
  /** The diagram takes the whole screen (host element fullscreen), F toggles back. */
  async toggleFullscreen() {
    try {
      this.ownerDocument.fullscreenElement ? await this.ownerDocument.exitFullscreen() : await this.requestFullscreen();
    } catch {
    }
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
    return Gt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Gt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = Gt(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = Gt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((f) => !f.parentId), l = Wi(a), p = [...l.keys()].map((f) => ({
      kind: "move-node",
      view: "context-map",
      id: f,
      pos: o.nodes[f] ?? null
    })), u = { ...o.nodes };
    for (const [f, r] of l) {
      const d = a.find((w) => w.id === f), m = o.nodes[f] ?? { x: d.x, y: d.y };
      u[f] = {
        x: Math.round(m.x + (r.x - d.x)),
        y: Math.round(m.y + (r.y - d.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: u }), p.length && this.pushUndoEntry(p);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Xl(e, t);
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
    var t, i, s, n, o, a, l, p, u, f;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const r = this.model.relations.find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : null;
      }
      case "set-relation-type": {
        const r = this.model.relations.find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "set-app-header-page": {
        const r = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (r == null ? void 0 : r.headerPageId) ?? null }];
      }
      case "set-app-model": {
        const r = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-model", appId: e.appId, modelId: (r == null ? void 0 : r.modelId) ?? null }];
      }
      case "add-model":
        return [{ kind: "remove-model", id: e.id }];
      case "remove-model": {
        const r = (this.model.models ?? []).find((m) => m.id === e.id);
        if (!r) return null;
        const d = [{ kind: "add-model", id: r.id, name: r.name }];
        for (const m of this.model.pages ?? []) {
          m.modelId === e.id && d.push({ kind: "set-page-model", pageId: m.id, modelId: e.id });
          const w = (E) => {
            for (const g of E ?? [])
              g.modelId === e.id && d.push({ kind: "set-page-component", pageId: m.id, componentId: g.id, modelId: e.id }), w(g.children);
          };
          w(m.content);
        }
        for (const m of this.model.uiApps ?? [])
          m.modelId === e.id && d.push({ kind: "set-app-model", appId: m.id, modelId: e.id });
        return d;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const r = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = e.kind === "set-crud-detail";
        return [{
          kind: e.kind,
          pageId: e.pageId,
          targetId: (d ? r == null ? void 0 : r.crudDetailPageId : r == null ? void 0 : r.crudCreatePageId) ?? null,
          toAppId: (d ? r == null ? void 0 : r.crudDetailAppId : r == null ? void 0 : r.crudCreateAppId) ?? null
        }];
      }
      case "set-app-view-page": {
        const r = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-view-page", appId: e.appId, pageId: (r == null ? void 0 : r.viewPageId) ?? null }];
      }
      case "set-app-edit-page": {
        const r = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-edit-page", appId: e.appId, pageId: (r == null ? void 0 : r.editPageId) ?? null }];
      }
      case "set-app-home-page": {
        const r = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{
          kind: "set-app-home-page",
          appId: e.appId,
          pageId: (r == null ? void 0 : r.homePageId) ?? null,
          toAppId: (r == null ? void 0 : r.homeAppId) ?? null
        }];
      }
      case "add-page-wizard-step":
        return [{ kind: "remove-page-wizard-step", pageId: e.pageId, targetId: e.itemId ?? e.targetId }];
      case "set-wizard-step-page": {
        const r = (((t = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : t.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === e.itemId);
        return r ? [{ kind: "set-wizard-step-page", pageId: e.pageId, itemId: e.itemId, targetId: r.pageId ?? null }] : null;
      }
      case "move-page-wizard-step": {
        const r = (((i = (this.model.pages ?? []).find((m) => m.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), d = r.indexOf(e.targetId);
        return d < 0 ? null : [{
          kind: "move-page-wizard-step",
          pageId: e.pageId,
          targetId: e.targetId,
          beforeItemId: r[d + 1] ?? null
        }];
      }
      case "remove-page-wizard-step": {
        const r = (((s = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : s.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === e.targetId);
        return r ? [{
          kind: "add-page-wizard-step",
          pageId: e.pageId,
          targetId: r.pageId ?? null,
          label: r.label,
          itemId: r.id
        }] : null;
      }
      case "delete-ui-app": {
        const r = (this.model.uiApps ?? []).find((w) => w.id === e.id);
        if (!r) return null;
        const d = [{ kind: "create-ui-app", id: r.id, name: r.name, type: r.type }];
        r.headerPageId && d.push({ kind: "set-app-header-page", appId: r.id, pageId: r.headerPageId }), r.modelId && d.push({ kind: "set-app-model", appId: r.id, modelId: r.modelId }), r.viewPageId && d.push({ kind: "set-app-view-page", appId: r.id, pageId: r.viewPageId }), r.editPageId && d.push({ kind: "set-app-edit-page", appId: r.id, pageId: r.editPageId }), (r.homePageId || r.homeAppId) && d.push({
          kind: "set-app-home-page",
          appId: r.id,
          pageId: r.homePageId ?? null,
          toAppId: r.homeAppId ?? null
        });
        const m = (w, E) => {
          for (const g of w ?? [])
            d.push({
              kind: "add-menu-item",
              appId: r.id,
              label: g.label,
              itemId: g.id,
              parentId: E == null ? void 0 : E.id,
              parentLabel: E && !E.id ? E.label : void 0,
              pageId: g.pageId ?? null
            }), g.uiAdapterId && d.push({ kind: "set-menu-app", appId: r.id, toAppId: g.uiAdapterId, itemId: g.id, label: g.label }), g.useCaseId && d.push({ kind: "set-menu-use-case", appId: r.id, useCaseId: g.useCaseId, itemId: g.id, label: g.label }), g.aggregateId && d.push({ kind: "set-menu-aggregate", appId: r.id, aggregateId: g.aggregateId, itemId: g.id, label: g.label }), g.queryOperationId && d.push({
              kind: "set-menu-query-operation",
              appId: r.id,
              queryServiceId: g.queryServiceId ?? null,
              queryOperationId: g.queryOperationId,
              itemId: g.id,
              label: g.label
            }), m(g.children, g);
        };
        m(r.menuItems);
        for (const w of this.model.actorAppUses ?? [])
          w.appId === e.id && d.push({ kind: "add-actor-app", actorId: w.actorId, appId: e.id });
        return d;
      }
      case "delete-ui-page": {
        const r = (this.model.pages ?? []).find((m) => m.id === e.id);
        if (!r) return null;
        const d = [
          { kind: "create-ui-page", id: r.id, name: r.name, pageType: r.type ?? "FORM" }
        ];
        r.route && d.push({ kind: "set-page-route", pageId: r.id, path: r.route }), r.modelId && d.push({ kind: "set-page-model", pageId: r.id, modelId: r.modelId }), r.listingQueryServiceId && d.push({ kind: "set-page-listing", pageId: r.id, queryServiceId: r.listingQueryServiceId });
        for (const m of r.buttons ?? [])
          m.useCaseId && (d.push({ kind: "add-page-button", pageId: r.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && d.push({
            kind: "set-page-button",
            pageId: r.id,
            useCaseId: m.useCaseId,
            label: m.label ?? null,
            mappingId: m.mappingId
          }));
        for (const m of r.viewmodelFields ?? [])
          (m.stereotype || m.colspan || m.label) && d.push({
            kind: "set-page-field-config",
            pageId: r.id,
            fieldId: m.fieldId,
            stereotype: m.stereotype ?? null,
            colspan: m.colspan ?? null,
            label: m.label ?? null
          });
        (r.viewmodelFields ?? []).length && d.push({
          kind: "set-page-field-order",
          pageId: r.id,
          fieldIds: (r.viewmodelFields ?? []).map((m) => m.fieldId)
        });
        for (const m of r.content ?? [])
          d.push(...this.rebuildComponentOps(r.id, m, void 0, null).ops);
        for (const m of r.wizardSteps ?? [])
          d.push({
            kind: "add-page-wizard-step",
            pageId: r.id,
            targetId: m.pageId ?? null,
            label: m.label,
            itemId: m.id
          });
        return (r.crudDetailPageId || r.crudDetailAppId) && d.push({ kind: "set-crud-detail", pageId: r.id, targetId: r.crudDetailPageId ?? null, toAppId: r.crudDetailAppId ?? null }), (r.crudCreatePageId || r.crudCreateAppId) && d.push({ kind: "set-crud-create", pageId: r.id, targetId: r.crudCreatePageId ?? null, toAppId: r.crudCreateAppId ?? null }), d;
      }
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const r = (this.model.uiApps ?? []).find((w) => w.id === e.appId), d = (w) => {
          for (const E of w ?? []) {
            if (e.itemId ? E.id === e.itemId : E.label === e.label) return E;
            const g = d(E.children);
            if (g) return g;
          }
          return null;
        }, m = e.itemId || e.label ? d(r == null ? void 0 : r.menuItems) : null;
        return m ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: m.label,
          pageId: m.pageId ?? null,
          itemId: m.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: m.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: m.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: m.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: m.queryServiceId ?? null,
          queryOperationId: m.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: m.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const r = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = ((r == null ? void 0 : r.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
        return d ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: d.label }] : null;
      }
      case "rename-ui-page": {
        const r = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return r ? [{ kind: "rename-ui-page", pageId: e.pageId, name: r.name }] : null;
      }
      case "set-page-type": {
        const r = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return r ? [{ kind: "set-page-type", pageId: e.pageId, pageType: r.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const r = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return r != null && r.route ? [{ kind: "set-page-route", pageId: e.pageId, path: r.route }] : null;
      }
      case "set-page-button": {
        const r = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = ((r == null ? void 0 : r.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
        return d ? [{
          kind: "set-page-button",
          pageId: e.pageId,
          useCaseId: e.useCaseId,
          label: d.label ?? null,
          mappingId: d.mappingId ?? null
        }] : null;
      }
      case "add-page-component":
        return [{ kind: "remove-page-component", pageId: e.pageId, componentId: e.componentId }];
      case "set-page-component":
      case "remove-page-component":
      case "move-page-component": {
        const r = (this.model.pages ?? []).find((_) => _.id === e.pageId);
        let d = null, m = null, w = null;
        const E = (_, M) => {
          var v;
          const F = _ ?? [];
          for (let S = 0; S < F.length; S++)
            F[S].id === e.componentId && (d = F[S], m = M, w = ((v = F[S + 1]) == null ? void 0 : v.id) ?? null), E(F[S].children, F[S]);
        };
        if (E(r == null ? void 0 : r.content, null), !d) return null;
        const g = d;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: g.title ?? null,
          text: g.text ?? null,
          label: g.label ?? null,
          useCaseId: g.useCaseId ?? null,
          mappingId: g.mappingId ?? null,
          modelId: g.modelId ?? null,
          queryServiceId: g.queryServiceId ?? null,
          queryOperationId: g.queryOperationId ?? null,
          fieldId: g.fieldId ?? null,
          stereotype: g.stereotype ?? null,
          colspan: g.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: m === null ? null : m.id,
          beforeComponentId: w
        }] : this.rebuildComponentOps(
          e.pageId,
          g,
          m === null ? void 0 : m.id,
          w
        ).ops;
      }
      case "set-page-listing": {
        const r = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (r == null ? void 0 : r.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const r = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (r == null ? void 0 : r.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const r = (((n = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : n.viewmodelFields) ?? []).find((d) => d.fieldId === e.fieldId);
        return [{
          kind: "set-page-field-config",
          pageId: e.pageId,
          fieldId: e.fieldId,
          stereotype: (r == null ? void 0 : r.stereotype) ?? null,
          colspan: (r == null ? void 0 : r.colspan) ?? null,
          label: (r == null ? void 0 : r.label) ?? null
        }];
      }
      case "set-page-field-order": {
        const r = (((o = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).map((d) => d.fieldId);
        return r.length ? [{ kind: "set-page-field-order", pageId: e.pageId, fieldIds: r }] : null;
      }
      case "move-menu-item": {
        const r = e.itemId ? this.menuEntryIn(e.appId, e.itemId) : null;
        return [{
          kind: "move-menu-item",
          appId: e.toAppId,
          toAppId: e.appId,
          itemId: e.itemId,
          label: e.label,
          parentId: (r == null ? void 0 : r.parentId) ?? void 0,
          beforeItemId: (r == null ? void 0 : r.beforeId) ?? void 0
        }];
      }
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const r = this.model.modules.find((m) => m.id === e.id);
        if (!r) return null;
        const d = this.model.relations.filter(
          (m) => (m.sourceId === e.id || m.targetId === e.id) && m.type != null
        );
        return [
          { kind: "add-module", id: r.id, name: r.name, subdomainType: r.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...d.map(
            (m) => ({
              kind: "set-relation-type",
              sourceId: m.sourceId,
              targetId: m.targetId,
              type: m.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const r = (this.model.aggregates ?? []).find((d) => d.id === e.id);
        return r ? [{ kind: "add-aggregate", id: r.id, name: r.name, moduleId: r.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const r of this.model.modules) {
          const d = (r.queryServices ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-query-service", id: d.id, name: d.name, moduleId: r.id }];
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
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return r ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const r = (this.model.externalSystemDependencies ?? []).find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r == null ? void 0 : r.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const r = (this.model.proxyApis ?? []).find((d) => d.id === e.id);
        return r ? [{
          kind: "add-proxy-api",
          id: r.id,
          name: r.name,
          targetId: r.targetApiId,
          moduleId: r.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const r = (this.model.proxyApis ?? []).find((d) => d.id === e.id);
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
          (d) => d.apiId === e.apiId && d.operationId === e.operationId && d.moduleId === e.moduleId
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
          (d) => d.apiId === e.apiId && d.operationId === e.operationId && d.moduleId === e.moduleId
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
        const r = (this.model.apis ?? []).find((d) => d.id === e.id) ?? (this.model.proxyApis ?? []).find((d) => d.id === e.id);
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
          const d = (r.useCases ?? []).find((m) => m.id === e.id);
          if (d)
            return [
              { kind: "add-use-case", id: d.id, name: d.name, moduleId: r.id, policy: d.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const r of this.model.externalSystems) {
          const d = (r.useCases ?? []).find((m) => m.id === e.id);
          if (d)
            return [{ kind: "add-external-use-case", id: d.id, name: d.name, moduleId: r.id }];
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
      case "add-use-case-step":
        return [{ kind: "remove-use-case-step", useCaseId: e.useCaseId, id: e.id }];
      case "add-etl-flow":
        return [{ kind: "remove-etl-flow", id: e.id }];
      case "remove-etl-flow": {
        const r = (this.model.etlFlows ?? []).find((d) => d.id === e.id);
        return !r || !r.ownerModuleId ? null : [
          { kind: "add-etl-flow", id: r.id, name: r.name, moduleId: r.ownerModuleId },
          ...(r.steps ?? []).map((d) => ({
            kind: "add-etl-step",
            etlFlowId: r.id,
            id: d.id,
            name: d.name,
            stepType: d.type,
            externalTableId: d.externalTableId,
            apiId: d.apiId,
            operationId: d.operationId,
            targetId: d.eventId,
            mappingId: d.mappingId
          }))
        ];
      }
      case "add-etl-step":
        return [{ kind: "remove-etl-step", etlFlowId: e.etlFlowId, id: e.id }];
      case "remove-etl-step": {
        const r = (((a = (this.model.etlFlows ?? []).find((d) => d.id === e.etlFlowId)) == null ? void 0 : a.steps) ?? []).find((d) => d.id === e.id);
        return r ? [{
          kind: "add-etl-step",
          etlFlowId: e.etlFlowId,
          id: r.id,
          name: r.name,
          stepType: r.type,
          externalTableId: r.externalTableId,
          apiId: r.apiId,
          operationId: r.operationId,
          targetId: r.eventId,
          mappingId: r.mappingId
        }] : null;
      }
      case "add-scheduled-trigger":
        return [{ kind: "remove-scheduled-trigger", id: e.id }];
      case "remove-scheduled-trigger": {
        const r = this.model.modules.find(
          (m) => (m.scheduledTriggers ?? []).some((w) => w.id === e.id)
        ), d = ((r == null ? void 0 : r.scheduledTriggers) ?? []).find((m) => m.id === e.id);
        return !r || !d ? null : [{
          kind: "add-scheduled-trigger",
          id: d.id,
          name: d.name,
          moduleId: r.id,
          cronExpression: d.cronExpression,
          targetUseCaseId: d.useCaseId
        }];
      }
      case "set-scheduled-trigger-target": {
        const r = this.model.modules.flatMap((d) => d.scheduledTriggers ?? []).find((d) => d.id === e.id);
        return r ? [{ kind: "set-scheduled-trigger-target", id: e.id, targetUseCaseId: r.useCaseId ?? null }] : null;
      }
      case "add-aggregate-call":
        return [{ kind: "remove-aggregate-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-aggregate-call":
        return [{ kind: "add-aggregate-call", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-emission":
        return [{ kind: "remove-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-emission":
        return [{ kind: "add-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-external-system":
        return [{ kind: "remove-external-system", id: e.id }];
      case "remove-external-system": {
        const r = this.model.externalSystems.find((d) => d.id === e.id);
        return r ? [{ kind: "add-external-system", id: r.id, name: r.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const r = (this.model.aiAgents ?? []).find((d) => d.id === e.id);
        return r ? [
          { kind: "add-ai-agent", id: r.id, name: r.name, external: r.external },
          ...(this.model.agentUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-use", sourceId: e.id, targetId: d.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: d.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: d.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: d.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: d.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-query", sourceId: e.id, targetId: d.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: d.ragId })),
          ...(this.model.agentDelegations ?? []).filter((d) => d.agentId === e.id || d.delegateAgentId === e.id).map((d) => ({
            kind: "add-agent-delegate",
            sourceId: d.agentId,
            targetId: d.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-actor-agent", sourceId: d.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((d) => d.agentId === e.id).map((d) => ({ kind: "add-agent-trigger", sourceId: d.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const r = (this.model.mcpGateways ?? []).find((d) => d.id === e.id);
        return r ? [
          { kind: "add-mcp-gateway", id: r.id, name: r.name },
          ...[
            ...r.mcpServerIds ?? [],
            ...r.apiIds ?? [],
            ...r.apiOperationIds ?? [],
            ...r.useCaseIds ?? [],
            ...r.ragIds ?? []
          ].map((d) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: d })),
          ...(this.model.agentGatewayUses ?? []).filter((d) => d.gatewayId === e.id).map((d) => ({ kind: "add-agent-gateway", sourceId: d.agentId, targetId: e.id }))
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
          const d = (r.mcpServers ?? []).find((m) => m.id === e.id);
          if (d)
            return [
              { kind: "add-mcp-server", id: d.id, name: d.name, moduleId: r.id, uri: d.uri },
              ...(this.model.agentMcpUses ?? []).filter((m) => m.mcpServerId === e.id).map(
                (m) => ({
                  kind: "add-agent-mcp",
                  sourceId: m.agentId,
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
        const r = (this.model.rags ?? []).find((d) => d.id === e.id);
        return r ? [
          { kind: "add-rag", id: r.id, name: r.name },
          ...(this.model.agentRags ?? []).filter((d) => d.ragId === e.id).map(
            (d) => ({
              kind: "add-agent-rag",
              sourceId: d.agentId,
              targetId: e.id
            })
          ),
          ...(r.sourceReadModelIds ?? []).map(
            (d) => ({ kind: "add-rag-source", sourceId: e.id, targetId: d })
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
        const r = (this.model.actors ?? []).find((d) => d.id === e.id);
        return r ? [{ kind: "add-actor", id: r.id, name: r.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const r of this.model.modules) {
          const d = (r.applicationEvents ?? []).find((m) => m.id === e.id);
          if (d)
            return [{ kind: "add-application-event", id: d.id, name: d.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const r of this.model.modules) {
          const d = (r.domainServices ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-domain-service", id: d.id, name: d.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const r = (this.model.projections ?? []).find((d) => d.id === e.id);
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
          const d = (r.tables ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-external-table", id: d.id, name: d.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const r = (p = (l = (this.model.rags ?? []).find((d) => d.id === e.sourceId)) == null ? void 0 : l.contentSources) == null ? void 0 : p.find((d) => d.uri === e.uri);
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
        const r = (this.model.apis ?? []).find((d) => d.id === e.id);
        return r ? [
          { kind: "add-api", id: r.id, name: r.name },
          ...r.operations.map(
            (d) => ({
              kind: "add-api-operation",
              apiId: r.id,
              id: d.id,
              name: d.name,
              httpMethod: d.httpMethod,
              path: d.path,
              moduleId: d.targetModuleId,
              targetUseCaseId: d.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const r = (u = (this.model.apis ?? []).find((d) => d.id === e.apiId)) == null ? void 0 : u.operations.find((d) => d.id === e.id);
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
        const r = (f = (this.model.apis ?? []).find((d) => d.id === e.apiId)) == null ? void 0 : f.operations.find((d) => d.id === e.id);
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
          const d = (r.readModels ?? []).find((m) => m.id === e.id);
          if (d != null && d.aggregateId)
            return [{ kind: "add-read-model", id: d.id, name: d.name, aggregateId: d.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const r of this.model.modules) {
          const d = (r.domainEvents ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-domain-event", id: d.id, name: d.name, moduleId: r.id }];
        }
        return null;
      }
      case "rename-element": {
        const d = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((m) => m.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((m) => m.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((m) => m.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((m) => m.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((m) => m.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((m) => m.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((m) => m.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((m) => m.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((m) => m.id === e.id);
        return d ? [{ kind: "rename-element", type: e.type, id: e.id, name: d.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const r = this.model.flows.find((d) => d.id === e.id);
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
        const r = (this.model.views ?? []).find((d) => d.id === e.id);
        return r ? [{ kind: "add-view", id: r.id, name: r.name, memberIds: r.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const r = (this.model.processes ?? []).find((w) => w.id === e.processId), d = (r == null ? void 0 : r.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!r || d < 0) return null;
        const m = r.steps[d];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: m.id,
            name: m.name,
            stepType: m.type,
            roleId: m.roleId,
            deadline: m.deadline,
            useCaseId: m.useCaseId,
            compensationUseCaseId: m.compensationUseCaseId,
            afterStepId: d > 0 ? r.steps[d - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const r = (this.model.processes ?? []).find((m) => m.id === e.processId), d = (r == null ? void 0 : r.steps.findIndex((m) => m.id === e.id)) ?? -1;
        return !r || d < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: d > 0 ? r.steps[d - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const r = (this.model.processes ?? []).find((m) => m.id === e.processId), d = r == null ? void 0 : r.steps.find((m) => m.id === e.id);
        return d ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: d.roleId,
            deadline: d.deadline,
            compensationUseCaseId: d.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const r = (this.model.processes ?? []).find((d) => d.id === e.id);
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
        const r = (this.model.workflows ?? []).find((d) => d.id === e.id);
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
        const r = (this.model.workflows ?? []).find((w) => w.id === e.workflowId), d = (r == null ? void 0 : r.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!r || d < 0) return null;
        const m = r.steps[d];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: m.id,
            name: m.name,
            emittedEventName: m.emittedEventName,
            targetUseCaseId: m.targetUseCaseId,
            completionEventName: m.completionEventName,
            dependsOnStepIds: m.dependsOnStepIds,
            afterStepId: d > 0 ? r.steps[d - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...r.steps.filter((w) => w.id !== e.id && (w.dependsOnStepIds ?? []).includes(e.id)).map(
            (w) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: w.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const r = (this.model.workflows ?? []).find((m) => m.id === e.workflowId), d = r == null ? void 0 : r.steps.find((m) => m.id === e.id);
        return d ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: d.emittedEventName,
            targetUseCaseId: d.targetUseCaseId,
            completionEventName: d.completionEventName
          }
        ] : null;
      }
      case "set-workflow-trigger": {
        const r = (this.model.workflows ?? []).find((d) => d.id === e.id);
        return r ? [{
          kind: "set-workflow-trigger",
          id: e.id,
          triggerEvent: r.triggerEvent ?? "",
          triggerAggregateId: r.triggerAggregateId,
          triggerDomainServiceId: r.triggerDomainServiceId,
          triggerUseCaseId: r.triggerUseCaseId
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), a = o.nodes[t] ?? null;
    let l = { x: i, y: s };
    const p = this.sceneFor(n), u = p.nodes.find((r) => r.id === t);
    if (u != null && u.parentId) {
      const r = p.nodes.find((d) => d.id === u.parentId);
      r && (l = { x: i - r.x, y: s - r.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: l } });
    const f = [{ kind: "move-node", view: n, id: t, pos: a }];
    if (n === "processes") {
      const r = this.stepReorderCommand(t);
      if (r) {
        const d = this.inverseOf(r);
        d && f.unshift(...d), this.command(r, !1);
      }
    }
    this.pushUndoEntry(f);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t) ?? (this.model.proxyApis ?? []).find((w) => w.id === t);
    if (!o || i && !this.model.externalSystems.some((w) => w.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === a) return;
    const p = this._view, u = this.viewLayout(p), f = this.sceneFor(p), r = l ? f.nodes.find((w) => w.id === l) : void 0, d = r ? { x: s - r.x, y: n - r.y } : { x: s, y: n }, m = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: p, id: t, pos: u.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(p, { ...u, nodes: { ...u.nodes, [t]: d } }), this.pushUndoEntry(m);
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
    const p = `proxy-${ne(o.name)}-${ne(a.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === p)) return;
    const u = this._view, f = this.viewLayout(u), d = this.sceneFor(u).nodes.find((w) => w.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: p,
        name: `${o.name}@${a.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const m = [{ kind: "remove-proxy-api", id: p }];
    d && (m.push({ kind: "move-node", view: u, id: p, pos: f.nodes[p] ?? null }), this.writeViewLayout(u, {
      ...f,
      nodes: { ...f.nodes, [p]: { x: s - d.x, y: n - d.y } }
    })), this.pushUndoEntry(m);
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
    var l, p, u;
    const t = e.target, i = (l = t.files) == null ? void 0 : l[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((p = this.model.externalSystems.find((f) => f.id === this._selectedId)) == null ? void 0 : p.id) ?? null, a = n || o ? null : ((u = this.model.modules.find((f) => f.id === this._selectedId)) == null ? void 0 : u.id) ?? null;
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
    const { id: t } = e.detail, i = this._view, s = this.viewLayout(i), n = new Set(s.collapsed ?? []);
    n.has(t) ? n.delete(t) : n.add(t), this.writeViewLayout(i, { ...s, collapsed: [...n] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), o = { ...s.nodes }, a = [];
    for (const { id: l, x: p, y: u } of t) {
      a.push({ kind: "move-node", view: i, id: l, pos: s.nodes[l] ?? null });
      let f = { x: p, y: u };
      const r = n.nodes.find((d) => d.id === l);
      if (r != null && r.parentId) {
        const d = n.nodes.find((m) => m.id === r.parentId);
        d && (f = { x: p - d.x, y: u - d.y });
      }
      o[l] = f;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: l } of t) {
        const p = this.stepReorderCommand(l);
        if (p) {
          const u = this.inverseOf(p);
          u && a.unshift(...u), this.command(p, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var f;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, l = this.viewLayout(a), p = this.sceneFor(a).nodes.filter((r) => r.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((f = l.sizes) == null ? void 0 : f[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: l.nodes[t] ?? null },
      ...p.map((r) => ({ kind: "move-node", view: a, id: r.id, pos: l.nodes[r.id] ?? null }))
    ]);
    const u = { ...l.nodes, [t]: { x: i, y: s } };
    for (const r of p) u[r.id] = { x: r.x - i, y: r.y - s };
    this.writeViewLayout(a, {
      ...l,
      nodes: u,
      sizes: { ...l.sizes ?? {}, [t]: { w: n, h: o } }
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
    const i = an(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
      (a, l) => (s.get(a.id) ?? 0) - (s.get(l.id) ?? 0)
    );
    if (n.every((a, l) => a.id === t.steps[l].id)) return null;
    const o = n.findIndex((a) => a.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? n[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: n, connectKind: o } = e.detail;
    this.applyConnection(t, i, s, n, o);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s, n) {
    var z, T, V, C;
    if (this._view === "workflows") {
      const k = this.owningWorkflowOf(e), O = this.owningWorkflowOf(t);
      if (!k || k !== O || e === t) return;
      const h = k.steps.find((I) => I.id === t);
      if (((h == null ? void 0 : h.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: k.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const k = this.model.pages ?? [], O = this.model.uiApps ?? [], h = (D) => O.some((U) => U.id === D), I = (D) => k.some((U) => U.id === D);
      if (n === "home" && h(e) && (I(t) || h(t))) {
        if (t === e) return;
        this.command(
          I(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && h(e) && I(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && I(e) && (I(t) || h(t)) && t !== e) {
        const D = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          I(t) ? { kind: D, pageId: e, targetId: t, toAppId: null } : { kind: D, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if ((n === "view" || n === "edit") && h(e) && I(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const x = (D) => /^wizrow:([^:]+):(.+)$/.exec(D), b = x(e) ?? x(t);
      if (b) {
        const D = x(e) ? t : e;
        I(D) && D !== b[1] && this.command({ kind: "set-wizard-step-page", pageId: b[1], itemId: b[2], targetId: D });
        return;
      }
      const A = k.find((D) => D.id === t && D.type === "WIZARD");
      if (I(e) && A && e !== A.id) {
        (A.wizardSteps ?? []).some((D) => D.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: A.id, targetId: e });
        return;
      }
      if (I(e) && h(t)) {
        const D = k.find((ee) => ee.id === e), U = O.find((ee) => ee.id === t);
        if (U.type === "MASTER_DETAIL" && !U.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${D.name} es la cabecera de ${U.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: D.name,
          pageId: e,
          itemId: this.newMenuItemId(D.name)
        });
        return;
      }
      const L = (D) => (this.model.models ?? []).some((U) => U.id === D);
      if (L(e) || L(t)) {
        const D = L(e) ? e : t, U = L(e) ? t : e;
        if (I(U)) {
          this.command({ kind: "set-page-model", pageId: U, modelId: D });
          return;
        }
        if (h(U)) {
          this.command({ kind: "set-app-model", appId: U, modelId: D });
          return;
        }
        return;
      }
      const P = he(e);
      if (P != null && P.itemId && ((z = he(t)) != null && z.itemId || h(t))) {
        const D = he(t), U = this.menuEntryIn(P.appId, P.itemId);
        if (!U) return;
        if (D != null && D.itemId) {
          const ee = this.menuEntryIn(D.appId, D.itemId);
          if (!ee) return;
          const oe = (nt) => (nt ?? []).some((Wt) => Wt.id === D.itemId || oe(Wt.children));
          if (P.appId === D.appId && (D.itemId === P.itemId || oe(U.entry.children)))
            return;
          const ae = (T = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : T.renderRoot.querySelector(`g[data-node-id="${t}"]`), se = ae == null ? void 0 : ae.getBoundingClientRect(), ke = se && s !== void 0 ? (s - se.top) / Math.max(1, se.height) : 0.5, Vt = ke < 0.3 ? "before" : ke > 0.7 ? "after" : "nest";
          if (Vt === "nest")
            this.command({
              kind: "move-menu-item",
              appId: P.appId,
              toAppId: D.appId,
              itemId: P.itemId,
              parentId: D.itemId
            });
          else {
            const nt = Vt === "before" ? D.itemId : ee.beforeId ?? void 0;
            if (P.appId === D.appId && ee.parentId === U.parentId && nt === P.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: P.appId,
              toAppId: D.appId,
              itemId: P.itemId,
              parentId: ee.parentId ?? void 0,
              beforeItemId: nt
            });
          }
          return;
        }
        if (P.appId === t && !U.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: P.appId,
          toAppId: t,
          itemId: P.itemId
        });
        return;
      }
      const W = he(e) ?? he(t);
      if (W) {
        const D = he(e) ? e : t, U = he(e) ? t : e;
        if (((V = this.sceneFor("ui").nodes.find((se) => se.id === D)) == null ? void 0 : V.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const ee = this.model.modules.some(
          (se) => (se.useCases ?? []).some((ke) => ke.id === U)
        ), oe = (this.model.aggregates ?? []).some((se) => se.id === U), ae = this.model.modules.flatMap((se) => se.queryServices ?? []).find((se) => (se.operations ?? []).some((ke) => ke.id === U));
        I(U) ? this.command({ kind: "set-menu-page", pageId: U, ...W }) : h(U) && U !== W.appId ? this.command({ kind: "set-menu-app", toAppId: U, ...W }) : ee ? this.command({ kind: "set-menu-use-case", useCaseId: U, ...W }) : oe ? this.command({ kind: "set-menu-aggregate", aggregateId: U, ...W }) : ae && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: ae.id,
          queryOperationId: U,
          ...W
        });
        return;
      }
      if ((this.model.actors ?? []).some((D) => D.id === e) && h(t)) {
        (this.model.actorAppUses ?? []).some((D) => D.actorId === e && D.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const j = I(e) ? { pageId: e, other: t } : I(t) ? { pageId: t, other: e } : null;
      if (j) {
        const D = new Set(
          this.model.modules.flatMap((oe) => (oe.useCases ?? []).map((ae) => ae.id))
        ), U = new Set(
          this.model.modules.flatMap((oe) => (oe.queryServices ?? []).map((ae) => ae.id))
        ), ee = k.find((oe) => oe.id === j.pageId);
        D.has(j.other) ? (ee.buttons ?? []).some((oe) => oe.useCaseId === j.other) || this.command({ kind: "add-page-button", pageId: j.pageId, useCaseId: j.other }) : U.has(j.other) && this.command({ kind: "set-page-listing", pageId: j.pageId, queryServiceId: j.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, k, O] = o, h = (this.model.proxyApis ?? []).find((L) => L.id === O), I = (h == null ? void 0 : h.targetApiId) ?? ((C = (this.model.apiImplementations ?? []).find(
        (L) => L.moduleId === O && (this.model.apis ?? []).some(
          (P) => P.id === L.apiId && P.operations.some((W) => W.id === k)
        )
      )) == null ? void 0 : C.apiId);
      if (!I) return;
      if (new Set(
        this.model.modules.flatMap((L) => (L.useCases ?? []).map((P) => P.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: I,
          operationId: k,
          moduleId: O,
          targetUseCaseId: t
        });
        return;
      }
      if (!(h != null && h.targetApiId)) return;
      let b = null;
      if (t === h.targetApiId)
        b = h.targetApiId;
      else {
        const L = /^apiimpl:(.+)@(.+)$/.exec(t);
        L && L[1] === h.targetApiId ? b = L[2] : this.model.modules.some((P) => P.id === t) && (this.model.apiImplementations ?? []).some(
          (P) => P.apiId === h.targetApiId && P.moduleId === t
        ) && (b = t);
      }
      if (!b) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (L) => L.proxyId === h.id && L.operationId === k && L.targetSiteId === b
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: h.id,
        operationId: k,
        targetSiteId: b
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((k) => k.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (A) => A.agentId === e && A.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((b) => (b.useCases ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (A) => A.agentId === e && A.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((b) => (b.mcpServers ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (A) => A.agentId === e && A.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((b) => b.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (A) => A.agentId === e && A.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((b) => b.operations.map((A) => A.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (A) => A.agentId === e && A.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((b) => b.id === t) || (this.model.proxyApis ?? []).some((b) => b.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (A) => A.agentId === e && A.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((b) => (b.queryServices ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (A) => A.agentId === e && A.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (A) => A.agentId === e && A.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((b) => b.id === t) && ((this.model.agentRags ?? []).some(
        (A) => A.agentId === e && A.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((k) => k.id === e)) {
      const k = (this.model.mcpGateways ?? []).find((I) => I.id === e), O = this.model.externalSystems.some((I) => (I.mcpServers ?? []).some((x) => x.id === t)) || (this.model.apis ?? []).some((I) => I.id === t) || (this.model.apis ?? []).some((I) => I.operations.some((x) => x.id === t)) || this.model.modules.some((I) => (I.useCases ?? []).some((x) => x.id === t)) || (this.model.rags ?? []).some((I) => I.id === t), h = [
        ...k.mcpServerIds ?? [],
        ...k.apiIds ?? [],
        ...k.apiOperationIds ?? [],
        ...k.useCaseIds ?? [],
        ...k.ragIds ?? []
      ].includes(t);
      O && !h && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((k) => k.id === t)) return;
    const l = (this.model.rags ?? []).find((k) => k.id === e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((h) => (h.readModels ?? []).map((I) => I.id))
      ).has(t) && !(l.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((h) => (h.tables ?? []).map((I) => I.id))
      ).has(t) && !(l.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((h) => h.id === t) || (this.model.proxyApis ?? []).some((h) => h.id === t)) && !(l.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((h) => h.id === t) && !(l.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((h) => h.id === t) && !(l.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((k) => k.id === t)) return;
    if ((this.model.workflows ?? []).some((k) => k.id === e)) {
      const k = (this.model.workflows ?? []).find((I) => I.id === e), O = (this.model.workflows ?? []).find(
        (I) => I.id === t && I.id !== e
      );
      if (O) {
        const I = k.onCompletionEventName || `${k.name.replace(/\s+/g, "")}Completado`;
        O.triggerEvent !== I && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: I });
        return;
      }
      const h = this.model.modules.flatMap((I) => I.useCases ?? []).find((I) => I.id === t);
      if (h && !(k.steps ?? []).some((x) => x.targetUseCaseId === t)) {
        const x = `wfs-${ne(h.name)}`;
        let b = x;
        for (let A = 2; (k.steps ?? []).some((L) => L.id === b); A++)
          b = `${x}-${A}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: b,
          name: h.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((k) => k.id === t)) {
      const k = this.model.modules.flatMap((I) => I.domainEvents ?? []).find((I) => I.id === e), O = this.model.modules.flatMap((I) => I.applicationEvents ?? []).find((I) => I.id === e), h = k ?? O;
      if (h) {
        const I = (this.model.emissions ?? []).find((L) => L.domainEventId === e), x = new Set((this.model.aggregates ?? []).map((L) => L.id)), b = new Set(
          this.model.modules.flatMap((L) => (L.domainServices ?? []).map((P) => P.id))
        ), A = new Set(
          this.model.modules.flatMap((L) => (L.useCases ?? []).map((P) => P.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: h.name,
          triggerAggregateId: I && x.has(I.sourceId) ? I.sourceId : void 0,
          triggerDomainServiceId: I && b.has(I.sourceId) ? I.sourceId : void 0,
          triggerUseCaseId: I && A.has(I.sourceId) ? I.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((k) => k.id === e)) {
      const k = (this.model.proxyApis ?? []).find((O) => O.id === e);
      if ((this.model.apis ?? []).some((O) => O.id === t)) {
        k.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((O) => O.id === t)) {
        if (!k.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (h) => h.apiId === k.targetApiId && h.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: k.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((O) => O.id === t) && k.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((k) => k.id === e)) {
      if (this.model.externalSystems.some((k) => k.id === t)) {
        (this.model.apis ?? []).find((O) => O.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && ((this.model.apiImplementations ?? []).some(
        (O) => O.apiId === e && O.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const p = new Set((this.model.actors ?? []).map((k) => k.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((O) => (O.domainEvents ?? []).map((h) => h.id)),
        ...this.model.modules.flatMap((O) => (O.applicationEvents ?? []).map((h) => h.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (h) => h.eventId === e && h.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!p.has(e)) return;
    }
    if (p.has(e)) {
      const k = new Set(
        this.model.modules.flatMap((h) => (h.useCases ?? []).map((I) => I.id))
      ), O = new Set(
        this.model.modules.flatMap((h) => (h.queryServices ?? []).map((I) => I.id))
      );
      if (k.has(t) || O.has(t)) {
        (this.model.actorUses ?? []).some(
          (I) => I.actorId === e && I.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((h) => h.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((h) => h.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (I) => I.actorId === e && I.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((h) => h.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (I) => I.actorId === e && I.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const u = this.owningApiOf(e);
    if (u) {
      if (new Set(
        this.model.modules.flatMap((O) => (O.useCases ?? []).map((h) => h.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: u.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((O) => O.id === t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: u.id,
          id: e,
          moduleId: t
        });
        return;
      }
      return;
    }
    const f = this.model.etlFlows ?? [], r = (k) => f.find((O) => O.id === k);
    if (r(e) || r(t)) {
      const k = r(e) ?? r(t), O = r(e) ? t : e, h = !r(e), I = new Set(this.model.externalSystems.flatMap((U) => (U.tables ?? []).map((ee) => ee.id))), x = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((U) => U.id),
        ...(this.model.proxyApis ?? []).map((U) => U.id)
      ]), b = (this.model.apis ?? []).find((U) => U.operations.some((ee) => ee.id === O)), A = new Set(
        this.model.modules.flatMap((U) => [
          ...(U.domainEvents ?? []).map((ee) => ee.id),
          ...(U.applicationEvents ?? []).map((ee) => ee.id)
        ])
      );
      let L = null, P = {};
      if (I.has(O) ? (L = h ? "SOURCE_PULL" : "WRITE_DB", P = { externalTableId: O }) : b ? (L = h ? "SOURCE_PULL" : "WRITE_API", P = { apiId: b.id, operationId: O }) : x.has(O) ? (L = h ? "SOURCE_PULL" : "WRITE_API", P = { apiId: O }) : A.has(O) && (L = h ? "SOURCE_CONSUMER" : "WRITE_EVENT", P = { targetId: O }), !L) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((k.steps ?? []).some(
        (U) => U.type === L && (U.externalTableId ?? U.operationId ?? U.apiId ?? U.eventId) === (P.externalTableId ?? P.operationId ?? P.apiId ?? P.targetId)
      )) return;
      const j = new Set((k.steps ?? []).map((U) => U.id));
      let D = (k.steps ?? []).length + 1;
      for (; j.has(`ets-${D}`); ) D++;
      this.command({ kind: "add-etl-step", etlFlowId: k.id, id: `ets-${D}`, stepType: L, ...P });
      return;
    }
    const d = this.model.externalSystems.flatMap((k) => k.useCases ?? []).find((k) => k.id === e), m = this.model.externalSystems.flatMap((k) => k.tables ?? []).find((k) => k.id === e);
    if (d || m) {
      const k = (d ?? m).name, O = d ? { externalUseCaseId: e } : { externalTableId: e }, h = (b) => d ? b.sourceExternalUseCaseId === e : b.sourceExternalTableId === e, I = this.model.modules.flatMap((b) => b.readModels ?? []).find((b) => b.id === t);
      if (I) {
        (this.model.projections ?? []).some(
          (A) => h(A) && A.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(k)}-${ne(I.name)}`,
          name: `${I.name}Projection`,
          ...O,
          targetId: t
        });
        return;
      }
      const x = this.model.modules.find((b) => b.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (A) => h(A) && A.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(k)}-${ne(x.name)}`,
          name: `${k}ViewProjection`,
          ...O,
          moduleId: t,
          readModelName: `${k}View`
        });
        return;
      }
      return;
    }
    const w = (this.model.aggregates ?? []).find((k) => k.id === e);
    if (w) {
      const k = this.model.modules.flatMap((h) => h.readModels ?? []).find((h) => h.id === t);
      if (k) {
        (this.model.projections ?? []).some(
          (I) => I.sourceAggregateId === e && I.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(w.name)}-${ne(k.name)}`,
          name: `${k.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const O = this.model.modules.find((h) => h.id === t);
      if (O) {
        (this.model.projections ?? []).some(
          (I) => I.sourceAggregateId === e && I.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(w.name)}-${ne(O.name)}`,
          name: `${w.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${w.name}View`
        });
        return;
      }
    }
    const E = new Set(
      this.model.modules.flatMap((k) => (k.domainEvents ?? []).map((O) => O.id))
    ), g = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((k) => k.id),
      ...this.model.modules.flatMap((k) => (k.domainServices ?? []).map((O) => O.id))
    ]), _ = new Set(
      this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map((O) => O.id))
    ), M = new Set(this.model.modules.flatMap((k) => (k.useCases ?? []).map((O) => O.id))), F = new Set(
      this.model.modules.flatMap((k) => (k.queryServices ?? []).map((O) => O.id))
    );
    if (M.has(e) && F.has(t)) {
      (this.model.queryCalls ?? []).some(
        (O) => O.sourceId === e && O.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap((k) => (k.useCases ?? []).map((O) => O.id))
    );
    if (M.has(e) && v.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (O) => O.sourceId === e && O.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (M.has(e) && M.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (O) => O.sourceId === e && O.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const S = this.model.modules.flatMap((k) => k.scheduledTriggers ?? []).find((k) => k.id === e);
    if (S && M.has(t)) {
      S.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (M.has(e) && (this.model.aggregates ?? []).some((k) => k.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (O) => O.sourceId === e && O.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && E.has(t) || M.has(e) && _.has(t)) {
      (this.model.emissions ?? []).some(
        (O) => O.sourceId === e && O.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (E.has(e) || _.has(e)) {
      const k = _.has(e), O = this.model.modules.flatMap((D) => (k ? D.applicationEvents : D.domainEvents) ?? []).find((D) => D.id === e), h = this.model.modules.flatMap((D) => (D.useCases ?? []).map((U) => ({ u: U, module: D }))).find(({ u: D }) => D.id === t), I = this.model.modules.flatMap((D) => (D.readModels ?? []).map((U) => ({ rm: U, module: D }))).find(({ rm: D }) => D.id === t), x = this.model.modules.find((D) => D.id === t) ?? (I == null ? void 0 : I.module) ?? (h == null ? void 0 : h.module);
      if (!O || !x) return;
      const b = new Set((this.model.aggregates ?? []).map((D) => D.id)), A = new Set(
        this.model.modules.flatMap((D) => (D.domainServices ?? []).map((U) => U.id))
      ), L = (this.model.emissions ?? []).find(
        (D) => D.domainEventId === e && (k ? M.has(D.sourceId) : b.has(D.sourceId) || A.has(D.sourceId))
      );
      if (!L) {
        this.emit("modux-notice", {
          message: k ? `Declara primero qué caso de uso publica ${O.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${O.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const P = !k && b.has(L.sourceId);
      if (h) {
        if (this.model.flows.some(
          (U) => U.archetype === "TRIGGERS" && U.triggerEvent === O.name && U.targetUseCaseId === h.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(O.name)}-${ne(h.u.name)}`,
          name: h.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: P ? L.sourceId : "",
          triggerDomainServiceId: !k && !P ? L.sourceId : void 0,
          triggerUseCaseId: k ? L.sourceId : void 0,
          triggerEvent: O.name,
          targetId: x.id,
          targetUseCaseId: h.u.id
        });
        return;
      }
      const W = (I == null ? void 0 : I.rm.name) ?? `${O.name}View`;
      if (this.model.flows.some(
        (D) => D.archetype === "MATERIALIZES" && D.triggerEvent === O.name && D.targetId === x.id && D.readModelName === W
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ne(O.name)}-${ne(W)}`,
        name: W,
        archetype: "MATERIALIZES",
        triggerAggregateId: P ? L.sourceId : "",
        triggerDomainServiceId: !k && !P ? L.sourceId : void 0,
        triggerUseCaseId: k ? L.sourceId : void 0,
        triggerEvent: O.name,
        targetId: x.id,
        readModelName: W
      });
      return;
    }
    const y = /* @__PURE__ */ new Set([
      ...g,
      ...M,
      ...F,
      ...this.model.modules.flatMap((k) => (k.readModels ?? []).map((O) => O.id))
    ]);
    if (y.has(e) || y.has(t) || E.has(t) || _.has(t))
      return;
    const R = new Set(this.model.externalSystems.map((k) => k.id));
    if (R.has(e)) {
      if (new Set(
        this.model.modules.flatMap((x) => (x.useCases ?? []).map((b) => b.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (b) => b.externalSystemId === e && b.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (R.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const O = (this.model.apis ?? []).find(
        (x) => x.operations.some((b) => b.id === t)
      ), h = /^apiop:(.+)@(.+)$/.exec(t), I = O ? { operationId: t, siteId: O.id } : h ? { operationId: h[1], siteId: h[2] } : null;
      if (I) {
        (this.model.externalOperationUses ?? []).some(
          (b) => b.externalSystemId === e && b.operationId === I.operationId && b.siteId === I.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: I.operationId,
          targetSiteId: I.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((x) => x.id === t) || (this.model.proxyApis ?? []).some((x) => x.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (b) => b.sourceId === e && b.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    R.has(t) || p.has(t);
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
      case "page":
      case "ui-app":
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
    if (this._view === "ui") {
      if (e === "edge") {
        let n;
        if (n = /^appheader:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-header-page", appId: n[1], pageId: null });
        else if (n = /^apphome:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-home-page", appId: n[1], pageId: null });
        else if (n = /^appmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-model", appId: n[1], modelId: null });
        else if (n = /^appview:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-view-page", appId: n[1], pageId: null });
        else if (n = /^appedit:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-edit-page", appId: n[1], pageId: null });
        else if (n = /^cruddetail:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-detail", pageId: n[1], targetId: null, toAppId: null });
        else if (n = /^crudnew:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-create", pageId: n[1], targetId: null, toAppId: null });
        else if (n = /^wizstep:([^:]+):(.+)$/.exec(t))
          this.command({ kind: "set-wizard-step-page", pageId: n[1], itemId: n[2], targetId: null });
        else if (n = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] });
        else if (n = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: n[1], queryServiceId: null });
        else if (n = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: n[1], modelId: null });
        else if (n = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: n[1], appId: n[2] });
        else if (n = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const o = he(n[1]);
          o && this.command({ kind: "set-menu-page", pageId: null, ...o });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const o = he(n[1]);
          o && this.command({ kind: "set-menu-app", toAppId: null, ...o });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const o = he(n[1]);
          o && this.command({ kind: "set-menu-use-case", useCaseId: null, ...o });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const o = he(n[1]);
          o && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...o });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const o = he(n[1]);
          o && this.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...o });
        }
        return;
      }
      if (i === "ui-app") {
        this.command({ kind: "delete-ui-app", id: t });
        return;
      }
      if (i === "page") {
        this.command({ kind: "delete-ui-page", id: t });
        return;
      }
      if (i === "menu-item" || i === "menu-group") {
        const n = he(t);
        n && this.command({ kind: "remove-menu-item", ...n });
        return;
      }
      if (i === "wizard-step-row") {
        const n = /^wizrow:([^:]+):(.+)$/.exec(t);
        n && this.command({ kind: "remove-page-wizard-step", pageId: n[1], targetId: n[2] });
        return;
      }
      if (i === "model") {
        this.command({ kind: "remove-model", id: t });
        return;
      }
      return;
    }
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
      const [, o, a] = n, l = (s = (this.model.apis ?? []).find(
        (p) => p.operations.some((u) => u.id === o)
      )) == null ? void 0 : s.id;
      if (!l) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: l, operationId: o, moduleId: a });
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
      const [, o, a, l] = n, p = /^apiimpl:.+@(.+)$/.exec(l), u = p ? p[1] : l;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: a, operationId: o, targetSiteId: u });
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
    if (this._view === "context-map" && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const n = /^etl:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: n[1], id: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "etl-flow") {
      this._selectedId = null, this.command({ kind: "remove-etl-flow", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "st-fire") {
      const n = /^stfire:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "set-scheduled-trigger-target", id: n[1], targetUseCaseId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "scheduled-trigger") {
      this._selectedId = null, this.command({ kind: "remove-scheduled-trigger", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agg-call") {
      const n = /^aggcall:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate-call", sourceId: n[1], targetId: n[2] });
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
    if (this._view === "context-map" && e === "edge" && i === "wf-chain") {
      const n = /^wfchain:(.+)->(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "set-workflow-trigger", id: n[2], triggerEvent: "" });
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
      id: `step-${ne(e)}`,
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
      id: `wfstep-${ne(e)}`,
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
    const t = new Set(e.memberIds), i = (n, o, a = {}) => $`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(n) ? "implicit" : ""}"
        title=${a.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(l) => this.toggleViewMember(n, l.target.checked)}
        />
        ${o}
      </label>
    `, s = (n, o) => o.length ? $`<h4>${n}</h4>${o}` : "";
    return $`
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
  /** What «crear vista» works on: the multi-selection, or — on the UI and Diseño
   * views, where one page or app is a perfectly good seed — the single selection. */
  viewSelection() {
    return this._multi.length ? this._multi : this._selectedId && (this._view === "ui" || this._view === "design") ? [this._selectedId] : [];
  }
  memberIdsFromSelection() {
    if (this._view === "design") {
      const i = new Set((this.model.pages ?? []).map((s) => s.id));
      return this.viewSelection().filter((s) => i.has(s));
    }
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this.viewSelection()) {
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
          case "page":
          case "ui-app":
            t.add(i);
            break;
          case "menu-item":
          case "menu-group": {
            const n = he(i);
            n && t.add(n.appId);
            break;
          }
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
    if (!e || !t.length) return;
    const i = `view-${ne(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((m) => m.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((m) => t.has(m.id)), s = new Set(i.map((m) => m.id)), n = this.model.externalSystems.filter((m) => t.has(m.id)), o = new Set(n.map((m) => m.id)), a = (this.model.aggregates ?? []).filter(
      (m) => t.has(m.id) || s.has(m.moduleId)
    ), l = new Set(a.map((m) => m.id)), p = (this.model.uiApps ?? []).filter((m) => t.has(m.id)), u = /* @__PURE__ */ new Set(), f = (m) => {
      for (const w of m ?? [])
        w.pageId && u.add(w.pageId), f(w.children);
    };
    p.forEach((m) => f(m.menuItems));
    const r = (this.model.pages ?? []).filter(
      (m) => t.has(m.id) || u.has(m.id)
    ), d = new Set(p.map((m) => m.id));
    return {
      ...this.model,
      uiApps: p,
      pages: r,
      actorAppUses: (this.model.actorAppUses ?? []).filter((m) => d.has(m.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (m) => s.has(m.sourceId) && s.has(m.targetId)
      ),
      flows: this.model.flows.filter(
        (m) => t.has(m.id) || (s.has(m.sourceId) || o.has(m.sourceId)) && (s.has(m.targetId) || o.has(m.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((m) => l.has(m.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (m) => l.has(m.sourceAggregateId) && l.has(m.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (m) => t.has(m.id) || (m.ownerModuleId ? s.has(m.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((m) => t.has(m.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((m) => t.has(m.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((m) => t.has(m.id)),
      rags: (this.model.rags ?? []).filter((m) => t.has(m.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((m) => t.has(m.id)),
      apis: (this.model.apis ?? []).filter(
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? o.has(m.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? o.has(m.publishedByExternalSystemId) : !1)
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
    if (this._view === "ui" && e.detail.elementType === "node" && e.detail.kind === "page") {
      this._view = "design", this._selectedId = e.detail.id;
      return;
    }
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
    const t = e.detail.kind === "process-step" ? Zl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Ql(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const a of o ?? [])
        a.id && t.add(a.id), i(a.children);
    };
    (this.model.uiApps ?? []).forEach((o) => i(o.menuItems));
    const s = `mi-${ne(e)}`;
    let n = s;
    for (let o = 2; t.has(n); o++) n = `${s}-${o}`;
    return n;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, a) => {
      var p;
      const l = o ?? [];
      for (let u = 0; u < l.length; u++)
        l[u].id === t && (s = { node: l[u], parentId: a, beforeId: ((p = l[u + 1]) == null ? void 0 : p.id) ?? null }), n(l[u].children, l[u].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, o) {
    const a = o ?? this.allComponentIds(), l = (r) => {
      if (!n) return r.id;
      const d = `cmp-${ne(r.kind)}`;
      let m = d;
      for (let w = 2; a.has(m) || a.has(`${m}-tab-1`); w++) m = `${d}-${w}`;
      return a.add(m), m;
    }, p = [], u = (r, d) => {
      const m = l(r);
      p.push({ kind: "add-page-component", pageId: e, componentId: m, componentKind: r.kind, parentComponentId: d }), r.kind === "tabLayout" && (p.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-1` }), p.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-2` })), p.push({
        kind: "set-page-component",
        pageId: e,
        componentId: m,
        title: r.title ?? null,
        text: r.text ?? null,
        label: r.label ?? null,
        useCaseId: r.useCaseId ?? null,
        mappingId: r.mappingId ?? null,
        modelId: r.modelId ?? null,
        queryServiceId: r.queryServiceId ?? null,
        queryOperationId: r.queryOperationId ?? null,
        fieldId: r.fieldId ?? null,
        stereotype: r.stereotype ?? null,
        colspan: r.colspan ?? null
      });
      for (const w of r.children ?? []) u(w, m);
      return m;
    }, f = u(t, i);
    return s && p.push({
      kind: "move-page-component",
      pageId: e,
      componentId: f,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: p, rootId: f };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const s of i ?? [])
        e.add(s.id), t(s.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const a of o ?? [])
        t.add(a.id), i(a.children);
    };
    (this.model.pages ?? []).forEach((o) => i(o.content));
    const s = `cmp-${ne(e)}`;
    let n = s;
    for (let o = 2; t.has(n) || t.has(`${n}-tab-1`); o++) n = `${s}-${o}`;
    return n;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var o;
    if (i === t) return;
    const s = (((o = (this.model.pages ?? []).find((a) => a.id === e)) == null ? void 0 : o.wizardSteps) ?? []).map((a) => a.id ?? a.pageId), n = s.indexOf(t);
    n >= 0 && (i ? s[n + 1] === i : n === s.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, a) => {
      var p;
      const l = o ?? [];
      for (let u = 0; u < l.length; u++)
        l[u].id === t && (s = { entry: l[u], parentId: a, beforeId: ((p = l[u + 1]) == null ? void 0 : p.id) ?? null }), n(l[u].children, l[u].id ?? null);
    };
    return n(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var a;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const l = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!l) return;
      t = this._selectedCmp.pageId, te.LEAF_KINDS.has(l.node.kind) ? (i = l.parentId ?? void 0, s = l.beforeId) : i = l.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (l.node.children ?? [])[0]) == null ? void 0 : a.id : l.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((l) => l.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: n, rootId: o } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const l of n) this.command(l, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: o }]), this._selectedCmp = { pageId: t, componentId: o };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return $`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var a;
      const { id: i, w: s, h: n } = t.detail, o = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((a = o.sizes) == null ? void 0 : a[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...o,
        sizes: { ...o.sizes ?? {}, [i]: { w: s, h: n } }
      });
    }}
      .selectedId=${this._selectedId}
      .selectedIds=${this._multi}
      .selectedCmp=${this._selectedCmp}
      @keydown=${this.onDesignKeydown}
      @page-component-selected=${(t) => {
      this._selectedCmp = t.detail.componentId ? { pageId: t.detail.pageId, componentId: t.detail.componentId } : null;
    }}
      @page-component-transferred=${this.onComponentTransferred}
      @page-wizard-step-moved=${(t) => this.moveWizardStep(t.detail.pageId, t.detail.stepKey, t.detail.beforeStepKey ?? null)}
      .models=${this.model.models ?? []}
      .mappings=${this.model.modelMappings ?? []}
      .useCases=${this.model.modules.flatMap(
      (t) => (t.useCases ?? []).map((i) => ({ id: i.id, name: i.name }))
    )}
      .queryOps=${this.model.modules.flatMap(
      (t) => (t.queryServices ?? []).flatMap(
        (i) => (i.operations ?? []).map((s) => ({
          id: s.id,
          name: `${s.name} (${i.name})`,
          queryServiceId: i.id
        }))
      )
    )}
      @dragover=${(t) => t.preventDefault()}
      @drop=${this.onPaletteDrop}
      @node-moved=${this.onNodeMoved}
      @element-selected=${this.onElementSelected}
      @element-multi-toggled=${this.onMultiToggled}
      @page-renamed=${(t) => this.command({ kind: "rename-ui-page", pageId: t.detail.pageId, name: t.detail.name })}
      @page-type-changed=${(t) => this.command({ kind: "set-page-type", pageId: t.detail.pageId, pageType: t.detail.pageType })}
      @page-route-changed=${(t) => this.command({ kind: "set-page-route", pageId: t.detail.pageId, path: t.detail.route })}
      @page-model-changed=${(t) => this.command({ kind: "set-page-model", pageId: t.detail.pageId, modelId: t.detail.modelId })}
      @page-button-added=${(t) => this.command({
      kind: "add-page-button",
      pageId: t.detail.pageId,
      useCaseId: t.detail.useCaseId,
      label: t.detail.label
    })}
      @page-button-changed=${(t) => this.command({
      kind: "set-page-button",
      pageId: t.detail.pageId,
      useCaseId: t.detail.useCaseId,
      label: t.detail.label,
      mappingId: t.detail.mappingId
    })}
      @page-component-config-changed=${(t) => {
      const { pageId: i, componentId: s, ...n } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: s, ...n });
    }}
      @page-component-removed=${(t) => this.command({
      kind: "remove-page-component",
      pageId: t.detail.pageId,
      componentId: t.detail.componentId
    })}
      @page-component-moved=${(t) => this.command({
      kind: "move-page-component",
      pageId: t.detail.pageId,
      componentId: t.detail.componentId,
      parentComponentId: t.detail.toParentId,
      beforeComponentId: t.detail.beforeComponentId
    })}
      @page-button-removed=${(t) => this.command({
      kind: "remove-page-button",
      pageId: t.detail.pageId,
      useCaseId: t.detail.useCaseId
    })}
      @page-open-crud=${(t) => {
      this.emit("modux-activate", { elementType: "page", id: t.detail.pageId });
    }}
      @page-field-config-changed=${(t) => {
      const { pageId: i, fieldId: s, stereotype: n, colspan: o, label: a } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: o, label: a });
    }}
      @page-fields-reordered=${(t) => {
      this.command({ kind: "set-page-field-order", pageId: t.detail.pageId, fieldIds: t.detail.fieldIds });
    }}
    ></modux-figma>`;
  }
  /** Every element of the model, grouped for the palette's «Catálogo» tab. */
  paletteCatalog() {
    const e = this.model, t = [
      {
        label: "Contextos",
        symbol: "component",
        color: "#94a3b8",
        items: e.modules.map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Apps",
        symbol: "component",
        color: "#0ea5e9",
        items: (e.uiApps ?? []).map((s) => ({ id: s.id, name: s.title || s.name }))
      },
      {
        label: "Páginas",
        symbol: "interface",
        color: "#0284c7",
        items: (e.pages ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Modelos",
        symbol: "readmodel",
        color: "#0369a1",
        items: (e.models ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Triggers programados",
        symbol: "clock",
        color: "#d97706",
        items: e.modules.flatMap(
          (s) => (s.scheduledTriggers ?? []).map((n) => ({ id: n.id, name: n.name }))
        )
      },
      {
        label: "Casos de uso",
        symbol: "usecase",
        color: "#06b6d4",
        items: e.modules.flatMap((s) => (s.useCases ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.modules.flatMap((s) => [
          ...(s.domainEvents ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.applicationEvents ?? []).map((n) => ({ id: n.id, name: n.name }))
        ])
      },
      {
        label: "Agregados",
        symbol: "aggregate",
        color: "#8b5cf6",
        items: (e.aggregates ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Read models",
        symbol: "readmodel",
        color: "#10b981",
        items: e.modules.flatMap((s) => (s.readModels ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap(
          (s) => (s.queryServices ?? []).flatMap(
            (n) => (n.operations ?? []).map((o) => ({ id: o.id, name: `${o.name} (${n.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap((s) => (s.queryServices ?? []).map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Actores",
        symbol: "person",
        color: "#64748b",
        items: (e.actors ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Sistemas externos",
        symbol: "component",
        color: "#64748b",
        items: e.externalSystems.map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Operaciones y tablas externas",
        symbol: "usecase",
        color: "#64748b",
        items: e.externalSystems.flatMap((s) => [
          ...(s.useCases ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.tables ?? []).map((n) => ({ id: n.id, name: n.name })),
          ...(s.mcpServers ?? []).map((n) => ({ id: n.id, name: n.name }))
        ])
      },
      {
        label: "APIs",
        symbol: "interface",
        color: "#4f46e5",
        items: (e.apis ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Operaciones de API",
        symbol: "usecase",
        color: "#4f46e5",
        items: (e.apis ?? []).flatMap((s) => s.operations.map((n) => ({ id: n.id, name: n.name })))
      },
      {
        label: "Proxies API",
        symbol: "interface",
        color: "#0e7490",
        items: (e.proxyApis ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Agentes IA",
        symbol: "robot",
        color: "#9333ea",
        items: (e.aiAgents ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Gateways MCP",
        symbol: "plug",
        color: "#7c3aed",
        items: (e.mcpGateways ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "RAGs",
        symbol: "lens",
        color: "#0e7490",
        items: (e.rags ?? []).map((s) => ({ id: s.id, name: s.name }))
      },
      {
        label: "Workflows",
        symbol: "process",
        color: "#6d28d9",
        items: (e.workflows ?? []).map((s) => ({ id: s.id, name: s.name }))
      }
    ], i = this._paletteFilter.trim().toLowerCase();
    return t.map((s) => ({
      ...s,
      items: i ? s.items.filter((n) => n.name.toLowerCase().includes(i)) : s.items
    })).filter((s) => s.items.length > 0);
  }
  onPaletteDragStart(e, t) {
    var i;
    (i = e.dataTransfer) == null || i.setData("application/x-modux-palette", JSON.stringify(t)), e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
  }
  onPaletteDrop(e) {
    var l;
    const t = (l = e.dataTransfer) == null ? void 0 : l.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), n = i.nodeIdAtClient(e.clientX, e.clientY), o = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, s, n, o) : a.existing && this.placeExistingFromPalette(a.existing, s, n, e.clientX, e.clientY, o);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((n) => n.id)), s = this.model;
    for (const n of [
      s.modules.map((o) => o.id),
      s.modules.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.domainEvents ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.applicationEvents ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.readModels ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.domainServices ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.queryServices ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.scheduledTriggers ?? []).map((a) => a.id)),
      (s.aggregates ?? []).map((o) => o.id),
      (s.entities ?? []).map((o) => o.id),
      (s.actors ?? []).map((o) => o.id),
      s.externalSystems.map((o) => o.id),
      s.externalSystems.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      s.externalSystems.flatMap((o) => (o.tables ?? []).map((a) => a.id)),
      s.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((a) => a.id)),
      (s.apis ?? []).map((o) => o.id),
      (s.apis ?? []).flatMap((o) => (o.operations ?? []).map((a) => a.id)),
      (s.proxyApis ?? []).map((o) => o.id),
      (s.aiAgents ?? []).map((o) => o.id),
      (s.mcpGateways ?? []).map((o) => o.id),
      (s.rags ?? []).map((o) => o.id),
      (s.workflows ?? []).map((o) => o.id),
      (s.workflows ?? []).flatMap((o) => (o.steps ?? []).map((a) => a.id)),
      (s.etlFlows ?? []).map((o) => o.id),
      (s.uiApps ?? []).map((o) => o.id),
      (s.pages ?? []).map((o) => o.id)
    ])
      n.forEach((o) => i.add(o));
    for (let n = 1; ; n++) {
      const o = n === 1 ? e : `${e} ${n}`, a = `${t}${ne(o)}`;
      if (!i.has(a)) return { id: a, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let l = t; l; )
      s.push(l), l = (o = i.nodes.find((p) => p.id === l)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service",
      "scheduled-trigger",
      "etl-flow"
    ].includes(e)) return s.find((l) => this.model.modules.some((p) => p.id === l)) ?? null;
    if (e === "read-model") {
      const l = s.find((u) => (this.model.aggregates ?? []).some((f) => f.id === u));
      if (l) return l;
      const p = s.find((u) => this.model.modules.some((f) => f.id === u));
      return ((a = (this.model.aggregates ?? []).find((u) => u.moduleId === p)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((l) => this.model.externalSystems.some((p) => p.id === l)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (l) => this.model.modules.some((p) => (p.useCases ?? []).some((u) => u.id === l))
      ) ?? null;
    if (e === "api-operation") {
      for (const l of s) {
        if ((this.model.apis ?? []).some((f) => f.id === l)) return l;
        const p = /^apiimpl:(.+)@(.+)$/.exec(l);
        if (p && (this.model.apis ?? []).some((f) => f.id === p[1])) return p[1];
        const u = (this.model.proxyApis ?? []).find((f) => f.id === l);
        if (u != null && u.targetApiId) return u.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((l) => this.model.externalSystems.some((p) => p.id === l)) ?? s.find((l) => this.model.modules.some((p) => p.id === l)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var m, w, E, g, _, M, F;
    const n = B.PALETTE_NEW.find((v) => v.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const v = e.slice(4), S = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, y = S ? S[1] : i && (this.model.pages ?? []).some((C) => C.id === i) ? i : null;
      if (!y) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let R = S ? S[2] : void 0, z = null;
      if (v === "tab") {
        let C = null, k = R ? this.componentIn(y, R) : null;
        for (; k; ) {
          if (k.node.kind === "tabLayout") {
            C = k.node.id;
            break;
          }
          k = k.parentId ? this.componentIn(y, k.parentId) : null;
        }
        if (!C) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const O = this.componentIn(y, C).node, h = this.newComponentId("tab"), I = `Pestaña ${(O.children ?? []).filter((x) => x.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: y, componentId: h, componentKind: "tab", parentComponentId: C }, !1), this.command({ kind: "set-page-component", pageId: y, componentId: h, title: I }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: y, componentId: h }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const C = this.componentIn(y, s.componentId);
        C && C.node.kind === "tab" ? R = C.node.id : C && (R = C.parentId ?? void 0, z = s.pos === "before" ? s.componentId : C.beforeId);
      } else if (R) {
        const C = ((m = this.componentIn(y, R)) == null ? void 0 : m.node) ?? null;
        (C == null ? void 0 : C.kind) === "tabLayout" && (C.children ?? [])[0] && (R = (C.children ?? [])[0].id);
      }
      const T = this.newComponentId(v), V = {
        kind: "add-page-component",
        pageId: y,
        componentId: T,
        componentKind: v,
        parentComponentId: R
      };
      if (!z) {
        this.command(V);
        return;
      }
      this.command(V, !1), this.command(
        { kind: "move-page-component", pageId: y, componentId: T, parentComponentId: R ?? null, beforeComponentId: z },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: y, componentId: T }]);
      return;
    }
    const o = this._view, a = this.sceneFor(o), l = (v, S) => {
      const y = this.viewLayout(o), R = S ? a.nodes.find((T) => T.id === S) : void 0, z = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...y, nodes: { ...y.nodes, [v]: z } }), { kind: "move-node", view: o, id: v, pos: null };
    }, p = (v, S, y) => {
      const R = this.inverseOf(v) ?? [];
      this.command(v, !1);
      const z = l(S, y);
      this.pushUndoEntry([...R, z]);
    };
    if (!n.child) {
      const v = {
        module: "mod-",
        actor: "",
        "external-system": "ext-",
        "ai-agent": "agent-",
        "external-ai-agent": "agent-",
        "mcp-gateway": "mcpgw-",
        rag: "rag-",
        api: "api-",
        "proxy-api": "proxy-",
        workflow: "wf-",
        "ui-app": "app-",
        "ui-app-orchestrator": "app-",
        "ui-app-masterdetail": "app-",
        "ui-app-vieweditor": "app-",
        "ui-model": "model-"
      }, { id: S, name: y } = this.uniquePaletteName(n.label, v[e] ?? ""), R = e === "module" ? { kind: "add-module", id: S, name: y, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: S, name: y } : e === "external-system" ? { kind: "add-external-system", id: S, name: y } : e === "ai-agent" ? { kind: "add-ai-agent", id: S, name: y } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: S, name: y, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: S, name: y } : e === "rag" ? { kind: "add-rag", id: S, name: y } : e === "api" ? { kind: "add-api", id: S, name: y } : e === "proxy-api" ? { kind: "add-proxy-api", id: S, name: y } : e === "ui-app" ? { kind: "create-ui-app", id: S, name: y } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: S, name: y, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: S, name: y, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: S, name: y, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: S, name: y } : {
        kind: "add-workflow",
        id: S,
        name: y,
        completionEventName: `${y.replace(/\s+/g, "")}Completado`
      };
      p(R, S);
      return;
    }
    if (e === "ui-wizard-step") {
      const v = [];
      for (let T = i ?? void 0; T; )
        v.push(T), T = (w = a.nodes.find((V) => V.id === T)) == null ? void 0 : w.parentId;
      const S = v.map((T) => {
        var V;
        return ((V = /^wizrow:([^:]+):/.exec(T)) == null ? void 0 : V[1]) ?? T;
      }).find((T) => (this.model.pages ?? []).some((V) => V.id === T && V.type === "WIZARD"));
      if (!S) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const y = ((E = (this.model.pages ?? []).find((T) => T.id === S)) == null ? void 0 : E.wizardSteps) ?? [], R = new Set(y.map((T) => T.id ?? T.pageId));
      let z = y.length + 1;
      for (; R.has(`wzs-${z}`); ) z++;
      this.command({ kind: "add-page-wizard-step", pageId: S, itemId: `wzs-${z}`, label: `Paso ${z}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const v = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", S = v === "CRUD" ? "CRUD" : v === "WIZARD" ? "Wizard" : "Página", { id: y, name: R } = this.uniquePaletteName(S, "page-"), z = [];
      for (let C = i ?? void 0; C; )
        z.push(C), C = (g = a.nodes.find((k) => k.id === C)) == null ? void 0 : g.parentId;
      const T = z.find((C) => (this.model.uiApps ?? []).some((k) => k.id === C)), V = z.map((C) => {
        var k;
        return ((k = /^wizrow:([^:]+):/.exec(C)) == null ? void 0 : k[1]) ?? C;
      }).find((C) => (this.model.pages ?? []).some((k) => k.id === C && k.type === "WIZARD"));
      if (V) {
        const C = a.nodes.find((O) => O.id === V);
        C && (t.x = C.x + C.w / 2 + 160, t.y = C.y - C.h / 2 + 40), this.command({ kind: "create-ui-page", id: y, name: R, pageType: v }, !1), this.command({ kind: "add-page-wizard-step", pageId: V, targetId: y }, !1);
        const k = l(y);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: y }, k]), this.emit("modux-notice", { message: `${R} creada como paso del wizard` });
        return;
      }
      if (T) {
        const C = a.nodes.find((k) => k.id === T);
        C && (t.x = C.x + C.w / 2 + 160, t.y = C.y - C.h / 2 + 40);
      }
      p(
        T ? { kind: "create-ui-page", id: y, name: R, pageType: v, appId: T, menuLabel: R } : { kind: "create-ui-page", id: y, name: R, pageType: v },
        y
      );
      return;
    }
    if (e === "menu-item") {
      const v = [];
      for (let V = i ?? void 0; V; )
        v.push(V), V = (_ = a.nodes.find((C) => C.id === V)) == null ? void 0 : _.parentId;
      const S = v.find((V) => (this.model.uiApps ?? []).some((C) => C.id === V));
      if (!S) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const y = /* @__PURE__ */ new Set(), R = (V) => {
        for (const C of V ?? [])
          y.add(C.label), R(C.children);
      };
      (this.model.uiApps ?? []).forEach((V) => R(V.menuItems));
      let z = "Entrada";
      for (let V = 2; y.has(z); V++) z = `Entrada ${V}`;
      const T = v.map((V) => he(V)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: S,
        label: z,
        itemId: this.newMenuItemId(z),
        parentId: T == null ? void 0 : T.itemId,
        parentLabel: T != null && T.itemId || T == null ? void 0 : T.label
      });
      return;
    }
    if (e === "etl-transform") {
      const v = [];
      for (let z = i ?? void 0; z; )
        v.push(z), z = (M = a.nodes.find((T) => T.id === z)) == null ? void 0 : M.parentId;
      const S = v.map((z) => (this.model.etlFlows ?? []).find((T) => T.id === z)).find(Boolean);
      if (!S) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const y = new Set((S.steps ?? []).map((z) => z.id));
      let R = (S.steps ?? []).length + 1;
      for (; y.has(`ets-${R}`); ) R++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: S.id,
        id: `ets-${R}`,
        name: `Transformación ${R}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const v = this.model.workflows ?? [], S = [];
      for (let C = i ?? void 0; C; )
        S.push(C), C = (F = a.nodes.find((k) => k.id === C)) == null ? void 0 : F.parentId;
      const y = S.map((C) => v.find((k) => k.id === C)).find(Boolean), R = S.map((C) => {
        const k = v.find((O) => (O.steps ?? []).some((h) => h.id === C));
        return k ? { owner: k, stepId: C } : null;
      }).find(Boolean), z = y ?? (R == null ? void 0 : R.owner);
      if (!z) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: T, name: V } = this.uniquePaletteName("Paso", "wfs-");
      R && (t = { x: t.x + 190, y: t.y }), p(
        {
          kind: "add-workflow-step",
          workflowId: z.id,
          id: T,
          name: V,
          ...R ? { dependsOnStepIds: [R.stepId], afterStepId: R.stepId } : {}
        },
        T
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${z.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const v = this.dropContainerFor("api", i);
      if (!v) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: S, name: y } = this.uniquePaletteName("API", "api-"), R = { kind: "add-api", id: S, name: y }, z = this.inverseOf(R) ?? [];
      this.command(R, !1), this.model.externalSystems.some((k) => k.id === v) ? this.command({ kind: "set-api-publisher", id: S, targetId: v }, !1) : this.command({ kind: "add-api-implementation", apiId: S, moduleId: v }, !1);
      const T = this.viewLayout(this._view), V = this.sceneFor(this._view).nodes.find((k) => k.id === v), C = V ? { x: Math.round(t.x - V.x), y: Math.round(t.y - V.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...T, nodes: { ...T.nodes, [S]: C } }), this.pushUndoEntry([...z, { kind: "move-node", view: this._view, id: S, pos: null }]);
      return;
    }
    const u = this.dropContainerFor(e, i);
    if (!u) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const f = {
      aggregate: "agg-",
      "use-case": "uc-",
      policy: "uc-",
      "domain-event": "ev-",
      "application-event": "aev-",
      "domain-service": "ds-",
      "query-service": "qs-",
      "scheduled-trigger": "st-",
      "etl-flow": "etl-",
      "read-model": "rm-",
      "external-use-case": "xuc-",
      "external-table": "tbl-",
      "mcp-server": "mcpsrv-"
    }, { id: r, name: d } = this.uniquePaletteName(n.label, f[e] ?? "");
    if (e === "aggregate")
      p({ kind: "add-aggregate", id: r, name: d, moduleId: u }, r, u);
    else if (e === "use-case" || e === "policy")
      p(
        { kind: "add-use-case", id: r, name: d, moduleId: u, ...e === "policy" ? { policy: !0 } : {} },
        r,
        u
      );
    else if (e === "domain-event")
      p({ kind: "add-domain-event", id: r, name: d, moduleId: u }, r, u);
    else if (e === "application-event")
      p({ kind: "add-application-event", id: r, name: d, moduleId: u }, r, u);
    else if (e === "domain-service")
      p({ kind: "add-domain-service", id: r, name: d, moduleId: u }, r, u);
    else if (e === "query-service")
      p({ kind: "add-query-service", id: r, name: d, moduleId: u }, r, u);
    else if (e === "scheduled-trigger")
      p({ kind: "add-scheduled-trigger", id: r, name: d, moduleId: u }, r, u), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "etl-flow")
      p({ kind: "add-etl-flow", id: r, name: d, moduleId: u }, r, u), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const v = (this.model.aggregates ?? []).find((S) => S.id === u);
      p({ kind: "add-read-model", id: r, name: d, aggregateId: u }, r, (v == null ? void 0 : v.moduleId) ?? u);
    } else if (e === "api-operation") {
      const v = (this.model.apis ?? []).find((T) => T.id === u), S = new Set(((v == null ? void 0 : v.operations) ?? []).map((T) => T.id));
      let y = d, R = `apiop-${u.replace(/^api-/, "")}-${ne(y)}`;
      for (let T = 2; S.has(R); T++)
        y = `${n.label} ${T}`, R = `apiop-${u.replace(/^api-/, "")}-${ne(y)}`;
      p({ kind: "add-api-operation", apiId: u, id: R, name: y }, R, u), a.nodes.some(
        (T) => T.parentId === u && (T.kind === "api-operation" || T.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(v == null ? void 0 : v.name) ?? u} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const v = this.model.modules.flatMap((z) => z.useCases ?? []).find((z) => z.id === u), S = new Set((v == null ? void 0 : v.stepIds) ?? []);
      let y = d, R = `step-${ne(y)}`;
      for (let z = 2; S.has(R); z++)
        y = `${n.label} ${z}`, R = `step-${ne(y)}`;
      p({ kind: "add-use-case-step", useCaseId: u, id: R, name: y }, R, u), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(v == null ? void 0 : v.name) ?? u} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? p({ kind: "add-external-use-case", id: r, name: d, moduleId: u }, r, u) : e === "external-table" ? p({ kind: "add-external-table", id: r, name: d, moduleId: u }, r, u) : e === "mcp-server" && p({ kind: "add-mcp-server", id: r, name: d, moduleId: u }, r, u);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var u;
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, n = s ? s[1] : t && (this.model.pages ?? []).some((f) => f.id === t) ? t : null;
    if (!n) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const o = s ? ((u = this.componentIn(n, s[2])) == null ? void 0 : u.node) ?? null : null, a = this.model.modules.flatMap((f) => f.useCases ?? []).find((f) => f.id === e);
    if (a) {
      (o == null ? void 0 : o.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: o.id, useCaseId: e, label: o.label ?? a.name }), this.emit("modux-notice", { message: `El botón lanza ${a.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${a.name} añadido a la página` }));
      return;
    }
    const l = (this.model.models ?? []).find((f) => f.id === e);
    if (l) {
      (o == null ? void 0 : o.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: n, componentId: o.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${l.name}` })) : (this.command({ kind: "set-page-model", pageId: n, modelId: e }), this.emit("modux-notice", { message: `${l.name} es el viewmodel de la página` }));
      return;
    }
    const p = this.model.modules.flatMap((f) => (f.queryServices ?? []).flatMap((r) => (r.operations ?? []).map((d) => ({ op: d, qs: r })))).find(({ op: f }) => f.id === e);
    if (p) {
      (o == null ? void 0 : o.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: n,
        componentId: o.id,
        queryOperationId: p.op.id,
        queryServiceId: p.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: n, queryServiceId: p.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${p.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, i, s, n, o = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, o);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
      return;
    }
    const a = this._view, l = this.sceneFor(a), p = l.nodes.find((d) => d.id === e);
    if (!p) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const d = this.viewLayout(a);
        this.writeViewLayout(a, {
          ...d,
          nodes: { ...d.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const u = this.viewLayout(a), f = p.parentId ? l.nodes.find((d) => d.id === p.parentId) : void 0, r = f ? { x: Math.round(t.x - f.x), y: Math.round(t.y - f.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: u.nodes[e] ?? null }]), this.writeViewLayout(a, { ...u, nodes: { ...u.nodes, [e]: r } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = B.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return $`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? $`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${B.PALETTE_GROUPS.map((s) => {
      const n = t.filter((o) => o.group === s);
      return n.length ? $`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (o) => $`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${dt[o.symbol]}
                              </svg>
                              <span class="pal-label">${o.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : $`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => $`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (n) => $`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${dt[s.symbol]}
                          </svg>
                          <span class="pal-label">${n.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : $`
              <div class="palette-side">
                <button
                  class="palette-vtab"
                  ?data-active=${i === "new"}
                  title="Elementos nuevos para arrastrar al lienzo"
                  @click=${() => this._paletteTab = "new"}
                >
                  Nuevos
                </button>
                <button
                  class="palette-vtab"
                  ?data-active=${i === "catalog"}
                  title="El catálogo del modelo: colocar o conectar elementos existentes"
                  @click=${() => this._paletteTab = "catalog"}
                >
                  Catálogo
                </button>
              </div>
            `}
      </div>
    `;
  }
  createElementFromToolbar() {
    var t, i, s, n, o, a, l;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const p = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!p) return;
        this.command({ kind: "add-aggregate", id: `agg-${ne(e)}`, name: e, moduleId: p });
      } else if (this._view === "flows") {
        const p = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), u = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), f = this._newTriggerEvent.trim();
        if (!p || !u || !f) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: p,
          triggerEvent: f,
          targetId: u
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const p = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!p) return;
        this.command({
          kind: "add-process",
          id: `proc-${ne(e)}`,
          name: e,
          moduleId: p,
          triggerAggregateId: this._newTriggerAggId || ((l = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : l.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? co(i, t.nodes) : e === "flows" ? vo(i, t.nodes) : e === "processes" ? an(i, t.nodes) : e === "workflows" ? Ml(i, t.nodes) : e === "ui" ? Dl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "eventstorming" ? bl(i, t.nodes) : io(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const n of s.nodes) {
        const o = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        o && (n.diffKind = o);
      }
    return s;
  }
  /** Screen space the overlays occupy on the left — fit() centers in what remains. */
  fitInsets() {
    const e = this._paletteOpen && ["context-map", "workflows", "ui"].includes(this._view), t = this._treeOpen && !!this._activeViewId;
    return t && e ? { left: 532 } : t ? { left: 280 } : e ? { left: 260 } : { left: 0 };
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var p;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((u) => !u.parentId), s = new Set(i.map((u) => u.id)), n = {
      nodes: i,
      edges: t.edges.filter((u) => s.has(u.sourceId) && s.has(u.targetId))
    }, a = await Ll(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), l = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((u) => ({
        kind: "move-node",
        view: e,
        id: u.id,
        pos: l.nodes[u.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(l.edges).map((u) => ({
        kind: "set-edge-points",
        view: e,
        id: u,
        points: l.edges[u]
      }))
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: l.sizes }), await this.updateComplete, (p = this.renderRoot.querySelector("modux-canvas")) == null || p.fit();
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
    return $`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "workflows", "ui", "design"].includes(this._view)}
          ?data-active=${this._paletteOpen}
          title="Paleta de elementos: arrastra nuevos o existentes al lienzo (P)"
          @click=${() => this._paletteOpen = !this._paletteOpen}
        >
          ☰
        </button>
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
              <option value="view:ui" ?selected=${this._view === "ui"}>UI</option>
              <option value="view:design" ?selected=${this._view === "design"}>
                Diseño (páginas)
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
      (t) => $`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? $`
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
      (t) => $`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? $`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(t) => this._newViewName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this.viewSelection().length})
              </button>
              <span class="sep"></span>
            ` : ""}
        <input
          class="new-name"
          ?hidden=${this._view !== "aggregates" && this._view !== "flows" && this._view !== "processes"}
          placeholder=${{
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…"
    }[this._view] ?? ""}
          .value=${this._newName}
          @input=${(t) => this._newName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "aggregates" || this._view === "processes" ? $`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return $`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? $`
              ${this._view === "flows" ? $`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => $`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return $`<option
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
              ${this._view === "flows" ? $`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return $`<option
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
          ?hidden=${this._view !== "aggregates" && this._view !== "flows" && this._view !== "processes"}
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
          title=${this.selectedApiId() ? "Importa un OpenAPI/WSDL sobre la API seleccionada (operaciones y modelos rq/rs)" : "Importa un OpenAPI/WSDL como una nueva API del diagrama"}
          @click=${() => {
      var t;
      return (t = this.renderRoot.querySelector("input.import-api-file")) == null ? void 0 : t.click();
    }}
        >
          ⇪ Importar API${this.selectedApiId() ? " aquí" : "…"}
        </button>
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? $`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => $`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? $`
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
      (t) => $`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? $`<input
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
              ${this.owningProcessOf(this._selectedId) ? $`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? $`
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
      (t) => $`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? $`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => $`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        <button
          class="tab"
          ?data-active=${this._tilt}
          title=${this._tilt ? "Volver al lienzo editable (V)" : "Vista 3D: el diagrama como placas apiladas por contención (V)"}
          @click=${() => this._tilt = !this._tilt}
        >
          ⬦ 3D
        </button>
        <button
          class="tab"
          ?data-active=${this._fullscreen}
          title=${this._fullscreen ? "Salir de pantalla completa (F o Esc)" : "El diagrama a pantalla completa (F)"}
          @click=${() => void this.toggleFullscreen()}
        >
          ⛶
        </button>
      </div>
      <div class="canvas-wrap">
      ${this._view === "design" ? $`${this.renderPalette()}${this.renderFigma()}` : this._tilt ? $`
      ${this.renderPalette()}
      <modux-tilt
            @dragover=${(t) => t.preventDefault()}
            @drop=${this.onPaletteDrop}
            .scene=${e}
            .selectedId=${this._selectedId}
            .connectable=${["context-map", "workflows", "ui"].includes(this._view)}
            @connect-requested=${this.onConnectRequested}
            @element-selected=${this.onElementSelected}
            @element-activated=${this.onElementActivated}
            @node-moved=${this.onNodeMoved}
            @delete-requested=${this.onDeleteRequested}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @selection-cleared=${() => {
      this._selectedId = null, this._multi = [], this.emit("modux-select", null);
    }}
          ></modux-tilt>` : $`
      ${this._treeOpen && this._activeViewId ? this.renderViewTree() : ""}
      ${this.renderPalette()}
      <modux-canvas
        @dragover=${(t) => t.preventDefault()}
        @drop=${this.onPaletteDrop}
        .fitInsets=${this.fitInsets()}
        .scene=${e}
        .edgePoints=${this.routedEdgePoints(e)}
        .selectedId=${this._selectedId}
        .selectedIds=${this._multi}
        .connectable=${["context-map", "workflows", "ui"].includes(this._view)}
        @node-moved=${this.onNodeMoved}
        @nodes-moved=${this.onNodesMoved}
        @node-reparent-requested=${this.onNodeReparentRequested}
        @node-collapse-toggled=${this.onNodeCollapseToggled}
        @menu-slot-requested=${this.onMenuSlotRequested}
        @wizard-slot-requested=${this.onWizardSlotRequested}
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
      `}
      </div>
      <div class="hint">
        ${this._view === "context-map" ? $`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? $`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? $`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : $`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
      ${this.renderHelpPopover()}
    `;
  }
  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  renderHelpPopover() {
    return this._helpOpen ? $`
      <div class="picker-backdrop" @pointerdown=${() => this._helpOpen = !1}></div>
      <div
        class="relation-picker help-pop"
        style="left: 50%; top: 90px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Atajos de teclado</div>
        ${[
      ["P", "Mostrar/ocultar la paleta"],
      ["F", "Pantalla completa (Esc sale)"],
      ["0", "Ajustar el diagrama a la ventana"],
      ["+ / −", "Zoom (también con la rueda)"],
      ["1 · 2 · 3", "Context map: contextos · agregados y casos de uso · APIs y operaciones"],
      ["4 · 5 · 6 · 7", "Agregados · Flows · Procesos · Workflows"],
      ["E / D", "EventStorming / volver al diagrama"],
      ["V", "Vista 3D (placas apiladas, tipo Firefox Tilt)"],
      ["T", "Árbol del catálogo (con una vista activa)"],
      ["Supr", "Borrar la selección"],
      ["F2", "Renombrar el nodo seleccionado"],
      ["Ctrl+Z / Ctrl+Y", "Deshacer / rehacer"],
      ["Espacio+arrastrar", "Mover el lienzo"],
      ["Shift+click / arrastrar", "Multi-selección / banda elástica"],
      ["?", "Esta ayuda"]
    ].map(
      ([t, i]) => $`
            <div class="help-row"><span class="help-keys">${t}</span><span>${i}</span></div>
          `
    )}
      </div>
    ` : "";
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return $`
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => $`
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Kl.map(
      (s) => $`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${Vi[s].abbr}</span>
              <span class="name">${Vi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
B.styles = ht`
    .canvas-wrap {
      position: relative;
    }
    .palette {
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 244px;
      z-index: 15;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
      display: flex;
      overflow: hidden;
    }
    .palette.shifted {
      left: 280px;
    }
    .palette-body {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: 8px;
    }
    .palette-side {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 4px;
      background: #f8fafc;
      border-left: 1px solid #e2e8f0;
    }
    .palette-vtab {
      writing-mode: vertical-rl;
      border: none;
      background: transparent;
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #64748b;
      padding: 10px 4px;
      border-radius: 6px;
      cursor: pointer;
    }
    .palette-vtab[data-active] {
      background: #1e293b;
      color: #ffffff;
    }
    .tab.hamburger {
      font-size: 16px;
      line-height: 1;
      padding: 4px 10px;
    }
    .help-pop {
      max-width: 420px;
    }
    .help-row {
      display: flex;
      gap: 12px;
      align-items: baseline;
      font-size: 12px;
      color: #1e293b;
      padding: 3px 8px;
    }
    .help-keys {
      flex: 0 0 150px;
      font-weight: 700;
      color: #2563eb;
      font-family: ui-monospace, monospace;
      font-size: 11px;
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
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .pal-ico {
      flex: 0 0 13px;
      width: 13px;
      height: 13px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      overflow: visible;
    }
    .pal-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    modux-canvas,
    modux-tilt,
    modux-figma {
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
B.PALETTE_GROUPS = [
  "Estratégico",
  "Dominio",
  "APIs",
  "Sistema externo",
  "IA",
  "Orquestación",
  "UI",
  "Layouts",
  "Componentes"
];
B.PALETTE_NEW = [
  { type: "module", label: "Contexto", symbol: "component", color: "#94a3b8", group: "Estratégico" },
  { type: "actor", label: "Actor", symbol: "person", color: "#64748b", group: "Estratégico" },
  { type: "external-system", label: "Sistema externo", symbol: "component", color: "#64748b", group: "Estratégico" },
  { type: "ai-agent", label: "Agente IA", symbol: "robot", color: "#9333ea", group: "IA" },
  { type: "external-ai-agent", label: "Agente IA externo", symbol: "robot", color: "#9333ea", group: "IA" },
  { type: "mcp-gateway", label: "Gateway MCP", symbol: "plug", color: "#7c3aed", group: "IA" },
  { type: "rag", label: "RAG", symbol: "lens", color: "#0e7490", group: "IA" },
  { type: "api", label: "API", child: !0, symbol: "interface", color: "#4f46e5", group: "APIs" },
  { type: "proxy-api", label: "Proxy API", symbol: "interface", color: "#0e7490", group: "APIs" },
  { type: "workflow", label: "Workflow", symbol: "process", color: "#6d28d9", group: "Orquestación" },
  { type: "workflow-step", label: "Paso de workflow", child: !0, symbol: "gear", color: "#6d28d9", group: "Orquestación" },
  { type: "etl-flow", label: "Flujo ETL (integrador)", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
  { type: "etl-transform", label: "Transformación ETL", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
  { type: "aggregate", label: "Agregado", child: !0, symbol: "aggregate", color: "#8b5cf6", group: "Dominio" },
  { type: "use-case", label: "Caso de uso", child: !0, symbol: "usecase", color: "#06b6d4", group: "Dominio" },
  { type: "use-case-step", label: "Paso de caso de uso", child: !0, symbol: "gear", color: "#06b6d4", group: "Dominio" },
  { type: "policy", label: "Policy", child: !0, symbol: "usecase", color: "#a855f7", group: "Dominio" },
  { type: "domain-event", label: "Evento de dominio", child: !0, symbol: "event", color: "#f59e0b", group: "Dominio" },
  { type: "application-event", label: "Evento de aplicación", child: !0, symbol: "event", color: "#eab308", group: "Dominio" },
  { type: "read-model", label: "Read model", child: !0, symbol: "readmodel", color: "#10b981", group: "Dominio" },
  { type: "domain-service", label: "Servicio de dominio", child: !0, symbol: "gear", color: "#f43f5e", group: "Dominio" },
  { type: "query-service", label: "Query service", child: !0, symbol: "lens", color: "#0284c7", group: "Dominio" },
  { type: "scheduled-trigger", label: "Trigger programado", child: !0, symbol: "clock", color: "#d97706", group: "Dominio" },
  { type: "api-operation", label: "Operación de API", child: !0, symbol: "usecase", color: "#4f46e5", group: "APIs" },
  { type: "external-use-case", label: "Operación externa", child: !0, symbol: "usecase", color: "#64748b", group: "Sistema externo" },
  { type: "external-table", label: "Tabla externa", child: !0, symbol: "readmodel", color: "#a16207", group: "Sistema externo" },
  { type: "mcp-server", label: "Servidor MCP", child: !0, symbol: "robot", color: "#9333ea", group: "Sistema externo" },
  { type: "ui-app", label: "App", symbol: "component", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-orchestrator", label: "Orquestador", symbol: "process", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-masterdetail", label: "Maestro-detalle", symbol: "component", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-vieweditor", label: "Vista-editor", symbol: "process", color: "#c026d3", group: "UI" },
  { type: "page", label: "Página", child: !0, symbol: "interface", color: "#0284c7", group: "UI" },
  { type: "menu-item", label: "Opción de menú", child: !0, symbol: "process", color: "#0ea5e9", group: "UI" },
  { type: "ui-page-crud", label: "CRUD", child: !0, symbol: "lens", color: "#0284c7", group: "UI" },
  { type: "ui-page-wizard", label: "Wizard", child: !0, symbol: "flow", color: "#0284c7", group: "UI" },
  { type: "ui-wizard-step", label: "Paso de wizard", child: !0, symbol: "flow", color: "#7c3aed", group: "UI" },
  { type: "ui-model", label: "Modelo", symbol: "readmodel", color: "#8b5cf6", group: "UI" },
  // Diseño: the Mateu layout vocabulary…
  { type: "cmp:verticalLayout", label: "Layout · Vertical", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:horizontalLayout", label: "Layout · Horizontal", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:formLayout", label: "Layout · Form", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:splitLayout", label: "Layout · Split", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:tabLayout", label: "Layout · Tabs", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:tab", label: "Layout · Pestaña", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:accordionLayout", label: "Layout · Acordeón", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:card", label: "Layout · Card", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:gridLayout", label: "Layout · Grid", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:boardLayout", label: "Layout · Board", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:dashboardLayout", label: "Layout · Dashboard", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:masterDetailLayout", label: "Layout · Master-detail", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:foldoutLayout", label: "Layout · Foldout", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:carouselLayout", label: "Layout · Carrusel", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:appLayout", label: "Layout · App", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  // …and the components that live inside those layouts.
  { type: "cmp:form", label: "Componente · Formulario", symbol: "interface", color: "#0284c7", group: "Componentes" },
  { type: "cmp:listing", label: "Componente · Listado", symbol: "lens", color: "#0284c7", group: "Componentes" },
  { type: "cmp:button", label: "Componente · Botón", symbol: "usecase", color: "#0284c7", group: "Componentes" },
  { type: "cmp:field", label: "Componente · Campo", symbol: "gear", color: "#0284c7", group: "Componentes" },
  { type: "cmp:text", label: "Componente · Texto", symbol: "readmodel", color: "#0284c7", group: "Componentes" },
  { type: "cmp:metricCard", label: "Componente · Métrica", symbol: "event", color: "#0284c7", group: "Componentes" },
  { type: "cmp:menuBar", label: "Componente · Menú", symbol: "process", color: "#0284c7", group: "Componentes" }
];
K([
  ie({ attribute: !1 })
], B.prototype, "model", 2);
K([
  ie({ attribute: !1 })
], B.prototype, "layout", 2);
K([
  ie({ attribute: !1 })
], B.prototype, "diff", 2);
K([
  q()
], B.prototype, "_view", 2);
K([
  q()
], B.prototype, "_detail", 2);
K([
  q()
], B.prototype, "_relationType", 2);
K([
  q()
], B.prototype, "_relationPicker", 2);
K([
  q()
], B.prototype, "_extDepPicker", 2);
K([
  q()
], B.prototype, "_selectedId", 2);
K([
  q()
], B.prototype, "_paletteOpen", 2);
K([
  q()
], B.prototype, "_paletteFilter", 2);
K([
  q()
], B.prototype, "_paletteTab", 2);
K([
  q()
], B.prototype, "_selectedCmp", 2);
K([
  q()
], B.prototype, "_fullscreen", 2);
K([
  q()
], B.prototype, "_tilt", 2);
K([
  q()
], B.prototype, "_helpOpen", 2);
K([
  q()
], B.prototype, "_newName", 2);
K([
  q()
], B.prototype, "_newModuleId", 2);
K([
  q()
], B.prototype, "_newArchetype", 2);
K([
  q()
], B.prototype, "_newTriggerAggId", 2);
K([
  q()
], B.prototype, "_newTriggerEvent", 2);
K([
  q()
], B.prototype, "_newTargetId", 2);
K([
  q()
], B.prototype, "_undoStack", 2);
K([
  q()
], B.prototype, "_redoStack", 2);
K([
  q()
], B.prototype, "_newStepName", 2);
K([
  q()
], B.prototype, "_newStepType", 2);
K([
  q()
], B.prototype, "_newStepRole", 2);
K([
  q()
], B.prototype, "_newStepDeadline", 2);
K([
  q()
], B.prototype, "_editStepRole", 2);
K([
  q()
], B.prototype, "_editStepDeadline", 2);
K([
  q()
], B.prototype, "_editStepComp", 2);
K([
  q()
], B.prototype, "_newStepUseCase", 2);
K([
  q()
], B.prototype, "_newStepEmits", 2);
K([
  q()
], B.prototype, "_editStepUseCase", 2);
K([
  q()
], B.prototype, "_editStepEmits", 2);
K([
  q()
], B.prototype, "_editStepAwaits", 2);
K([
  q()
], B.prototype, "_multi", 2);
K([
  q()
], B.prototype, "_newViewName", 2);
K([
  q()
], B.prototype, "_activeViewId", 2);
K([
  q()
], B.prototype, "_newRagSourceType", 2);
K([
  q()
], B.prototype, "_newRagSourceUri", 2);
K([
  q()
], B.prototype, "_addMemberKey", 2);
K([
  q()
], B.prototype, "_treeOpen", 2);
K([
  q()
], B.prototype, "_deletePicker", 2);
B = K([
  ft("modux-editor")
], B);
var Jl = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, _e = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ec(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Jl(t, i, n), n;
};
let fe = class extends Te {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._writes = 0, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._diff = null, this._diffListOpen = !1, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
    this._lastVersion = e, t && (await this.reload(), await this.refreshDiff(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory(), this.showToast(
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
    var e;
    if (!this._workspace || this._workspace.system) {
      this._diff = null, this._diffListOpen = !1;
      return;
    }
    try {
      const t = await fetch(`${this.base}/solutions/diff`);
      this._diff = t.ok ? await t.json() : null;
    } catch {
      this._diff = null;
    }
    (e = this._diff) != null && e.changes.length || (this._diffListOpen = !1);
  }
  /** The full change list of the solution, grouped by kind — opened from the badge. */
  renderDiffList() {
    var i;
    if (!this._diffListOpen || !this._diff || (i = this._workspace) != null && i.system) return "";
    const e = [
      { kind: "ADDED", title: "Añadidos", mark: "＋", cls: "added" },
      { kind: "MODIFIED", title: "Modificados", mark: "～", cls: "modified" },
      { kind: "REMOVED", title: "Eliminados", mark: "－", cls: "removed" }
    ], t = (s) => fe.TYPE_LABELS[s] ?? s;
    return $`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: o, cls: a }) => {
      const l = this._diff.changes.filter((p) => p.kind === s);
      return l.length ? $`
            <div class="diff-group">${n} (${l.length})</div>
            ${l.map(
        (p) => $`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${o}</span>
                  <span class="diff-type">${t(p.type)}</span>
                  <span class="diff-name" title=${p.id}>${p.name ?? p.id}</span>
                </div>
              `
      )}
          ` : "";
    })}
      </div>
    `;
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
      var l;
      try {
        const p = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!p.ok) {
          let u = `El servidor rechazó la operación (${p.status})`;
          try {
            const f = await p.json();
            f != null && f.message && (u = f.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        this._workspace = await p.json(), await this.reload(), await this.refreshDiff(), (l = this.renderRoot.querySelector("modux-editor")) == null || l.clearHistory();
      } catch (p) {
        this.showToast(String(p));
      }
    });
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const l = ((a = this._workspace.solutions.find((p) => p.branch === s)) == null ? void 0 : a.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${l}`
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
          let f = `El servidor rechazó el contrato (${a.status})`;
          try {
            const r = await a.json();
            r != null && r.message && (f = r.message);
          } catch {
          }
          this.showToast(f);
          return;
        }
        const { apiId: l } = await a.json(), p = n ? { kind: "set-api-publisher", id: l, targetId: n } : o ? { kind: "add-api-implementation", apiId: l, moduleId: o } : null;
        p && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p)
        });
        const u = await fetch(`${this.base}/model`);
        u.ok && (this._model = await u.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${l}`, "info");
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
    return this._error ? $`<div class="status error">modux editor: ${this._error}</div>` : this._model ? $`
      ${this._workspace ? $`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : $`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((n) => n.kind === s).length;
      return $`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? $`
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
      return $`
                      ${i === "EXPLORING" ? $`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? $`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? $`<button
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
      ${this.renderDiffList()}
      ${this._mergeFlow ? $`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => $`
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
      ${this._toast ? $`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : $`<div class="status">Cargando el modelo…</div>`;
  }
};
fe.styles = ht`
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
    .workspace .diff-badge {
      border: none;
      cursor: pointer;
      font: inherit;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .workspace .diff-badge:hover,
    .workspace .diff-badge[data-open] {
      background: #fde68a;
    }
    .diff-panel {
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: #334155;
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-bottom: none;
      padding: 8px 14px 10px;
      max-height: 260px;
      overflow-y: auto;
    }
    .diff-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .diff-head button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 13px;
      color: #64748b;
      padding: 2px 6px;
      border-radius: 6px;
    }
    .diff-head button:hover {
      background: #fde68a;
    }
    .diff-group {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #92400e;
      margin: 8px 0 2px;
    }
    .diff-row {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 1px 0;
    }
    .diff-mark {
      font-weight: 700;
      flex: 0 0 14px;
    }
    .diff-mark.added {
      color: #16a34a;
    }
    .diff-mark.modified {
      color: #d97706;
    }
    .diff-mark.removed {
      color: #dc2626;
    }
    .diff-type {
      flex: 0 0 150px;
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .diff-name {
      font-weight: 500;
      color: #1e293b;
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
fe.TYPE_LABELS = {
  projects: "Proyecto",
  services: "Servicio",
  modules: "Contexto",
  aggregates: "Agregado",
  entities: "Entidad",
  valueObjects: "Value object",
  invariants: "Invariante",
  domainEvents: "Evento de dominio",
  applicationEvents: "Evento de aplicación",
  integrationEvents: "Evento de integración",
  useCases: "Caso de uso",
  queryServices: "Query service",
  readModels: "Read model",
  projections: "Proyección",
  subscriptions: "Subscription",
  sagas: "Saga",
  scheduledTriggers: "Scheduled trigger",
  flows: "Flow",
  processes: "Proceso",
  workflows: "Workflow",
  decisions: "Decisión",
  models: "Modelo",
  modelMappings: "Model mapping",
  gateways: "Gateway",
  businessRules: "Regla de negocio",
  roles: "Actor",
  aiAgents: "Agente IA",
  rags: "RAG",
  mcpGateways: "Gateway MCP",
  apis: "API",
  proxyApis: "Proxy API",
  pages: "Pantalla",
  enums: "Enum",
  bddScenarios: "Escenario BDD",
  components: "Componente UI",
  uiAdapters: "UI adapter",
  uiShells: "UI shell"
};
_e([
  ie()
], fe.prototype, "base", 2);
_e([
  q()
], fe.prototype, "_model", 2);
_e([
  q()
], fe.prototype, "_layout", 2);
_e([
  q()
], fe.prototype, "_error", 2);
_e([
  q()
], fe.prototype, "_saving", 2);
_e([
  q()
], fe.prototype, "_toast", 2);
_e([
  q()
], fe.prototype, "_workspace", 2);
_e([
  q()
], fe.prototype, "_creatingSolution", 2);
_e([
  q()
], fe.prototype, "_newSolutionName", 2);
_e([
  q()
], fe.prototype, "_diff", 2);
_e([
  q()
], fe.prototype, "_diffListOpen", 2);
_e([
  q()
], fe.prototype, "_mergeFlow", 2);
fe = _e([
  ft("modux-editor-connected")
], fe);
export {
  tc as CONTAINER_HEADER,
  ic as CONTAINER_INSET,
  pe as ModuxCanvas,
  B as ModuxEditor,
  fe as ModuxEditorConnected,
  co as aggregatesScene,
  Xe as apiImplNodeId,
  Ke as apiOpOccurrenceId,
  Mi as containerFit,
  Gs as containerMinSize,
  io as contextMapScene,
  Js as flowCoherence,
  vo as flowsScene,
  Gt as normalizeViewLayout,
  an as processesScene,
  Zs as relationEdgeId,
  Wi as resolveOverlaps
};
