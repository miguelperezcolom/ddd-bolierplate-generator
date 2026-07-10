const ec = 34, tc = 10;
function Fi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let l = r + 1; l < e.length; l++) {
        const u = e[r], p = e[l], a = i.get(u.id), d = i.get(p.id), m = d.x - a.x, f = d.y - a.y, b = (u.w + p.w) / 2 + t - Math.abs(m), _ = (u.h + p.h) / 2 + t - Math.abs(f);
        if (!(b <= 0 || _ <= 0))
          if (o = !0, b < _) {
            const g = (m >= 0 ? 1 : -1) * b / 2;
            a.x -= g, d.x += g;
          } else {
            const g = (f >= 0 ? 1 : -1) * _ / 2;
            a.y -= g, d.y += g;
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
function Bs(e, t = { w: 160, h: 90 }) {
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
function Ci(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const l of i)
    s = Math.max(s, -l.dx + l.w / 2 + 10), n = Math.max(n, l.dx + l.w / 2 + 10), o = Math.max(o, -l.dy + l.h / 2 + 34), r = Math.max(r, l.dy + l.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (r - o) / 2,
    w: s + n,
    h: o + r
  };
}
function Bt(e) {
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
const Ws = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Gs = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Ys = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, st = 168, ot = 56;
function je(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Ye(e, t) {
  return `apiop:${e}@${t}`;
}
const tn = { compact: 0, coarse: 1, full: 2 };
function nn(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: tn[e ? t : s] > tn[n] };
}
function Fn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: je(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Vn = 34, Hn = 14, js = 14, $e = 108, Ee = 32, Bn = 12, Wn = 10, Mt = 2, Ks = Mt * $e + (Mt - 1) * Bn + 2 * Hn;
function Xs(e, t) {
  return `rel:${e}->${t}`;
}
function Qs(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function vt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Zs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Gn = {
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
  "scheduled-trigger": { symbol: "clock", fill: "#fffbeb", stroke: "#d97706" }
}, Ai = {
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
  "scheduled-trigger": "Trigger programado (cron) — dispara un caso de uso"
};
function Mi(e) {
  const t = Math.max(1, Math.ceil(e / Mt)), i = t * Ee + (t - 1) * Wn;
  return { w: Ks, h: Vn + i + js };
}
function Qt(e, t) {
  const i = e % Mt, s = Math.floor(e / Mt);
  return {
    x: -t.w / 2 + Hn + i * ($e + Bn) + $e / 2,
    y: -t.h / 2 + Vn + s * (Ee + Wn) + Ee / 2
  };
}
function Js(e, t, i, s, n, o, r = !1) {
  const l = (e.aggregates ?? []).filter((p) => p.moduleId === t.id), u = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Fn(e, t.id),
    ...l.map((p) => ({ id: p.id, name: p.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "use-case", policy: p.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "query-service" })
    ),
    ...(t.scheduledTriggers ?? []).map(
      (p) => ({ id: p.id, name: p.name, kind: "scheduled-trigger" })
    )
  ];
  if (!u.length)
    return [{ ...s, x: i.x, y: i.y, w: st, h: ot }];
  if (r) {
    const p = new Map((e.apis ?? []).map((d) => [d.id, d])), a = (e.apiImplementations ?? []).filter((d) => d.moduleId === t.id && p.has(d.apiId)).map((d) => {
      const m = p.get(d.apiId);
      return {
        id: je(d.apiId, d.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((f) => ({
          id: Ye(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (a.length > 0) {
      const d = u.filter((m) => m.kind !== "api-impl");
      return Yn(i, s, a, d, n, o);
    }
  }
  return kt(i, s, u, n, o);
}
function Yn(e, t, i, s, n, o, r = /* @__PURE__ */ new Set()) {
  const l = o[t.id] ?? Mi(i.length + s.length), u = i.map((f, b) => {
    const _ = n[f.id] ?? Qt(b, l), g = r.has(f.id) ? [] : f.ops, k = o[f.id] ?? Mi(g.length), P = g.map((w, C) => n[w.id] ?? Qt(C, k)), M = Ci(
      { x: _.x, y: _.y },
      k,
      P.map((w) => ({ dx: w.x, dy: w.y, w: $e, h: Ee }))
    );
    return { a: f, off: _, ops: g, opOffs: P, fit: M };
  }), p = s.map(
    (f, b) => n[f.id] ?? Qt(i.length + b, l)
  ), a = Fi(
    [
      ...u.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...s.map((f, b) => ({
        id: f.id,
        x: p[b].x,
        y: p[b].y,
        w: $e,
        h: Ee
      }))
    ],
    24
  );
  for (const f of u) {
    const b = a.get(f.a.id);
    b && (f.off = { x: f.off.x + (b.x - f.fit.x), y: f.off.y + (b.y - f.fit.y) }, f.fit = { ...f.fit, x: b.x, y: b.y });
  }
  s.forEach((f, b) => {
    const _ = a.get(f.id);
    _ && (p[b] = { x: _.x, y: _.y });
  });
  const d = Ci(e, l, [
    ...u.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...p.map((f) => ({ dx: f.x, dy: f.y, w: $e, h: Ee }))
  ]), m = [
    { ...t, x: d.x, y: d.y, w: d.w, h: d.h, container: !0 }
  ];
  for (const f of u)
    m.push({
      id: f.a.id,
      label: f.a.name,
      kind: f.a.kind,
      symbol: "interface",
      fill: f.a.fill,
      stroke: f.a.stroke,
      badge: f.a.badge,
      container: !0,
      collapsible: f.a.ops.length > 0 || r.has(f.a.id),
      collapsed: r.has(f.a.id),
      parentId: t.id,
      x: e.x + f.fit.x,
      y: e.y + f.fit.y,
      w: f.fit.w,
      h: f.fit.h,
      tooltip: f.a.tooltip
    }), f.ops.forEach((b, _) => {
      m.push({
        id: b.id,
        label: b.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[_].x,
        y: e.y + f.off.y + f.opOffs[_].y,
        w: $e,
        h: Ee,
        tooltip: `${Ai[f.a.opKind]}: ${b.name}`
      });
    });
  return s.forEach((f, b) => {
    const _ = Gn[f.kind];
    m.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + p[b].x,
      y: e.y + p[b].y,
      w: $e,
      h: Ee,
      symbol: _.symbol,
      fill: _.fill,
      stroke: _.stroke,
      parentId: t.id,
      tooltip: `${Ai[f.kind]} ${f.name}`
    });
  }), m;
}
function kt(e, t, i, s, n) {
  const o = n[t.id] ?? Mi(i.length), r = i.map((d, m) => s[d.id] ?? Qt(m, o)), l = Fi(
    i.map((d, m) => ({ id: d.id, x: r[m].x, y: r[m].y, w: $e, h: Ee })),
    10
  );
  i.forEach((d, m) => {
    const f = l.get(d.id);
    f && (r[m] = { x: f.x, y: f.y });
  });
  const u = Ci(
    e,
    o,
    r.map((d) => ({ dx: d.x, dy: d.y, w: $e, h: Ee }))
  ), p = {
    ...t,
    x: u.x,
    y: u.y,
    w: u.w,
    h: u.h,
    container: !0
  }, a = i.map((d, m) => {
    const f = r[m], b = d.policy ? Zs : Gn[d.kind];
    return {
      id: d.id,
      label: d.name,
      kind: d.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: $e,
      h: Ee,
      symbol: b.symbol,
      fill: b.fill,
      stroke: b.stroke,
      parentId: t.id,
      tooltip: `${d.policy ? "Policy" : Ai[d.kind]} ${d.name}`
    };
  });
  return [p, ...a];
}
function eo(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = n, r = i !== "contexts", l = i === "operations", u = new Set(e.externalSystems.map((c) => c.id)), p = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && u.has(c.publishedByExternalSystemId)
  ), a = new Set(p.map((c) => c.id)), d = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && u.has(c.publishedByExternalSystemId)
  ), m = new Set(d.map((c) => c.id)), f = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !a.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !m.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], b = f.flatMap((c, L) => {
    const B = t[c.ref.id] ?? vt(L, f.length);
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
        x: B.x,
        y: B.y,
        w: st,
        h: ot
      }];
    }
    if (c.proxy) {
      const Q = c.ref, oe = {
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
        const Re = (e.apis ?? []).find((it) => it.id === Q.targetApiId), De = (Re == null ? void 0 : Re.operations) ?? [];
        if (De.length > 0)
          return kt(
            B,
            oe,
            De.map((it) => ({
              id: Ye(it.id, Q.id),
              name: it.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...oe, x: B.x, y: B.y, w: st, h: ot }];
    }
    if (c.api) {
      const Q = c.ref, oe = {
        id: Q.id,
        label: Q.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Q.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(Q.id) ? !r : r) && Q.operations.length > 0 ? kt(
        B,
        { ...oe, collapsible: !0, collapsed: !1 },
        Q.operations.map(
          (De) => ({ id: De.id, name: De.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...oe,
        collapsible: Q.operations.length > 0,
        collapsed: Q.operations.length > 0,
        x: B.x,
        y: B.y,
        w: st,
        h: ot
      }];
    }
    if (c.external) {
      const Q = c.ref, oe = {
        id: Q.id,
        label: Q.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Q.name} (sistema externo)`
      }, Re = p.filter((ae) => ae.publishedByExternalSystemId === Q.id), De = d.filter((ae) => ae.publishedByExternalSystemId === Q.id), it = De.map(
        (ae) => ({ id: ae.id, name: ae.name, kind: "proxy-api" })
      ), fi = [
        ...(Q.useCases ?? []).map(
          (ae) => ({ id: ae.id, name: ae.name, kind: "external-use-case" })
        ),
        ...(Q.tables ?? []).map(
          (ae) => ({ id: ae.id, name: ae.name, kind: "external-table" })
        ),
        ...(Q.mcpServers ?? []).map(
          (ae) => ({ id: ae.id, name: ae.name, kind: "mcp-server" })
        )
      ], gi = Re.length > 0 || De.length > 0, Ii = gi || fi.length > 0, { form: Vt, collapsed: yi } = nn(
        n.has(Q.id),
        r ? "full" : gi ? "coarse" : "compact",
        fi.length > 0 || l && gi
      ), Ji = [
        ...it,
        ...Vt === "full" ? fi : []
      ], vi = l && Vt === "full" ? De.filter((ae) => {
        const It = ae.targetApiId ? (e.apis ?? []).find((fe) => fe.id === ae.targetApiId) : void 0;
        return ((It == null ? void 0 : It.operations) ?? []).length > 0;
      }) : [];
      if (l && Vt === "full" && (Re.length > 0 || vi.length > 0)) {
        const ae = [
          ...Re.map((fe) => ({
            id: fe.id,
            name: fe.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${fe.name} — API publicada por ${Q.name}`,
            opKind: "api-operation",
            ops: (fe.operations ?? []).map((yt) => ({ id: yt.id, name: yt.name }))
          })),
          ...vi.map((fe) => {
            const yt = (e.apis ?? []).find((Ht) => Ht.id === fe.targetApiId);
            return {
              id: fe.id,
              name: fe.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${fe.name} — proxy/cache de ${yt.name}`,
              opKind: "api-op-occurrence",
              ops: (yt.operations ?? []).map((Ht) => ({
                id: Ye(Ht.id, fe.id),
                name: Ht.name
              }))
            };
          })
        ], It = new Set(vi.map((fe) => fe.id));
        return Yn(
          B,
          { ...oe, collapsible: !0, collapsed: yi },
          ae,
          Ji.filter((fe) => !It.has(fe.id)),
          t,
          s,
          o
        );
      }
      const en = Vt === "compact" ? [] : [
        ...Re.map((ae) => ({ id: ae.id, name: ae.name, kind: "api" })),
        ...Ji
      ];
      return en.length > 0 ? kt(
        B,
        { ...oe, collapsible: Ii, collapsed: yi },
        en,
        t,
        s
      ) : [{
        ...oe,
        collapsible: Ii,
        collapsed: Ii && yi,
        x: B.x,
        y: B.y,
        w: st,
        h: ot
      }];
    }
    const j = c.ref, ie = j.subdomainType ?? "GENERIC", ue = {
      id: j.id,
      label: j.name,
      kind: "module",
      symbol: "component",
      fill: Ws[ie],
      stroke: "#94a3b8",
      badge: ie,
      tooltip: `${j.name} — subdominio ${ie}`
    }, _e = Fn(e, j.id), ft = (e.aggregates ?? []).some((Q) => Q.moduleId === j.id) || (j.useCases ?? []).length > 0 || (j.domainEvents ?? []).length > 0 || (j.applicationEvents ?? []).length > 0 || (j.readModels ?? []).length > 0 || (j.domainServices ?? []).length > 0 || (j.queryServices ?? []).length > 0 || (j.scheduledTriggers ?? []).length > 0, Be = ft || _e.length > 0, { form: gt, collapsed: tt } = nn(
      n.has(j.id),
      r ? "full" : _e.length > 0 ? "coarse" : "compact",
      ft
    );
    return gt === "full" && Be ? Js(
      e,
      j,
      B,
      { ...ue, collapsible: !0, collapsed: tt },
      t,
      s,
      l
    ) : gt === "coarse" && _e.length > 0 ? kt(
      B,
      { ...ue, collapsible: Be, collapsed: tt },
      _e,
      t,
      s
    ) : [{
      ...ue,
      collapsible: Be,
      collapsed: Be && tt,
      x: B.x,
      y: B.y,
      w: st,
      h: ot
    }];
  }), _ = f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, L) => {
    const B = t[c.id] ?? vt(f.length + L, _);
    b.push({
      id: c.id,
      label: c.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, L) => {
    const B = t[c.id] ?? vt(f.length + (e.actors ?? []).length + L, _);
    b.push({
      id: c.id,
      label: c.name,
      x: B.x,
      y: B.y,
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
  }), (e.mcpGateways ?? []).forEach((c, L) => {
    const B = t[c.id] ?? vt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + L,
      _
    );
    b.push({
      id: c.id,
      label: c.name,
      x: B.x,
      y: B.y,
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
  (e.rags ?? []).forEach((c, L) => {
    const B = t[c.id] ?? vt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + L,
      _
    );
    b.push({
      id: c.id,
      label: c.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((j, ie) => {
      const ue = `ragcs:${c.id}:${j.uri}`, _e = t[ue] ?? { x: B.x + 170, y: B.y - 30 + ie * 44 };
      b.push({
        id: ue,
        label: j.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: _e.x,
        y: _e.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: j.type,
        tooltip: `${j.type}: ${j.uri}`
      }), g.push({
        id: `ragcse:${c.id}:${j.uri}`,
        sourceId: ue,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), b.sort((c, L) => (c.parentId ? 1 : 0) - (L.parentId ? 1 : 0));
  const k = e.relations.map((c) => ({
    id: Xs(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Gs[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), P = e.flows.map((c) => {
    var _e, ft, Be, gt, tt, Q;
    const L = Qs(e, c), B = r ? e.modules.find((oe) => oe.id === c.sourceId) : void 0, j = ((_e = B == null ? void 0 : B.domainEvents) == null ? void 0 : _e.find((oe) => oe.name === c.triggerEvent)) ?? ((ft = B == null ? void 0 : B.applicationEvents) == null ? void 0 : ft.find((oe) => oe.name === c.triggerEvent)), ie = r && c.readModelName ? (gt = (Be = e.modules.find((oe) => oe.id === c.targetId)) == null ? void 0 : Be.readModels) == null ? void 0 : gt.find((oe) => oe.name === c.readModelName) : void 0, ue = r && c.targetUseCaseId ? (Q = (tt = e.modules.find((oe) => oe.id === c.targetId)) == null ? void 0 : tt.useCases) == null ? void 0 : Q.find((oe) => oe.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (j == null ? void 0 : j.id) ?? c.sourceId,
      targetId: (ue == null ? void 0 : ue.id) ?? (ie == null ? void 0 : ie.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Ys[L],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${L}`
    };
  }), M = new Map((e.apis ?? []).map((c) => [c.id, c])), w = new Set(e.modules.map((c) => c.id)), C = (e.apiImplementations ?? []).filter(
    (c) => M.has(c.apiId) && w.has(c.moduleId)
  ), x = new Set(b.map((c) => c.id)), z = r ? (e.emissions ?? []).filter((c) => x.has(c.sourceId) && x.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], D = r ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: L }) => L && c.readModelId).filter(({ p: c, source: L }) => x.has(L) && x.has(c.readModelId)).map(({ p: c, source: L }) => ({
    id: `proj:${c.id}`,
    sourceId: L,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], R = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((L) => {
      const B = r && L.targetUseCaseId && x.has(L.targetUseCaseId) ? L.targetUseCaseId : L.targetModuleId && x.has(L.targetModuleId) ? L.targetModuleId : (L.targetUseCaseId && !r, null);
      if (!B) return [];
      const j = r && x.has(L.id) ? L.id : c.id;
      return x.has(j) ? [
        {
          id: `apiwire:${L.id}`,
          sourceId: j,
          targetId: B,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${L.name} la implementa ${B}`
        }
      ] : [];
    })
  ), y = r ? (e.useCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], $ = r ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && x.has(c.id) && x.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], T = r ? (e.aggregateCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], O = r ? (e.queryCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], h = r ? (e.actorUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], I = (e.actorExternalDependencies ?? []).filter((c) => x.has(c.actorId) && x.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), v = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), S = (c) => x.has(c) ? c : v.get(c) ?? c, N = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: S(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => x.has(c.sourceId) && x.has(c.targetId) && c.sourceId !== c.targetId
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
  ], V = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const L of c.useCases ?? []) V.set(L.id, c.id);
    for (const L of c.domainEvents ?? []) V.set(L.id, c.id);
    for (const L of c.applicationEvents ?? []) V.set(L.id, c.id);
  }
  const U = (c) => x.has(c) ? c : V.get(c) ?? c, A = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const L of c.domainEvents ?? []) A.set(L.name, L.id);
    for (const L of c.applicationEvents ?? []) A.set(L.name, L.id);
  }
  const F = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((L) => L.targetUseCaseId).map((L) => ({ sourceId: c.id, targetId: U(L.targetUseCaseId) }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], K = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && A.has(c.triggerEvent)).map((c) => ({
        sourceId: U(A.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], X = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const L of c.tables ?? []) X.set(L.id, c.id);
  const se = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((L) => ({
          sourceId: x.has(L) ? L : X.get(L) ?? L,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], ne = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((L) => ({
          sourceId: S(L),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], le = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((L) => ({ sourceId: L, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((L) => ({ sourceId: L, targetId: c.id, name: c.name }))
      ]).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], ge = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: S(c.apiId) })).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], Pe = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, Ft = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((L) => L.id !== c.id && Pe(L) === c.triggerEvent).filter((L) => x.has(L.id) && x.has(c.id)).map((L) => ({
      id: `wfchain:${L.id}->${c.id}`,
      sourceId: L.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), $s = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: S(c.id), targetId: S(c.targetApiId) })).filter(
        (c) => x.has(c.sourceId) && x.has(c.targetId) && c.sourceId !== c.targetId
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
  ], Es = C.flatMap((c) => {
    const L = je(c.apiId, c.moduleId);
    if (!x.has(L)) return [];
    const B = [];
    for (const j of (e.proxyApis ?? []).filter((ie) => ie.targetApiId === c.apiId)) {
      const ie = S(j.id);
      x.has(ie) && ie !== L && B.push({
        id: `pxr:${ie}->${L}`,
        sourceId: ie,
        targetId: L,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return B;
  }), Ss = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const L = (e.proxyApis ?? []).find((ie) => ie.id === c.proxyId);
    if (!(L != null && L.targetApiId)) return [];
    const B = Ye(c.operationId, c.proxyId), j = c.targetSiteId === L.targetApiId ? L.targetApiId : je(L.targetApiId, c.targetSiteId);
    return !x.has(B) || !x.has(j) ? [] : [{
      id: `oproute:${B}->${j}`,
      sourceId: B,
      targetId: j,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Cs = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!x.has(c.externalSystemId)) return null;
        const L = (e.apis ?? []).find(
          (ue) => ue.operations.some((_e) => _e.id === c.operationId)
        );
        if (!L) return null;
        const B = c.siteId === L.id, j = B ? c.operationId : Ye(c.operationId, c.siteId);
        let ie = x.has(j) ? j : null;
        if (!ie)
          if (B || (e.proxyApis ?? []).some((ue) => ue.id === c.siteId))
            ie = S(c.siteId);
          else {
            const ue = je(L.id, c.siteId);
            ie = x.has(ue) ? ue : c.siteId;
          }
        return !ie || !x.has(ie) || ie === c.externalSystemId ? null : { u: c, target: ie };
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
  ], As = r ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!x.has(c.useCaseId)) return [];
    const L = x.has(Ye(c.operationId, c.moduleId)) ? Ye(c.operationId, c.moduleId) : x.has(je(c.apiId, c.moduleId)) ? je(c.apiId, c.moduleId) : x.has(S(c.moduleId)) ? S(c.moduleId) : null;
    return L ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: L,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Ms = r ? (e.agentUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ps = (e.agentRags ?? []).filter((c) => x.has(c.agentId) && x.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Os = r ? (e.rags ?? []).filter((c) => x.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((L) => x.has(L)).map((L) => ({
      id: `ragsrc:${c.id}->${L}`,
      sourceId: c.id,
      targetId: L,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Ts = r ? (e.agentExternalUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ns = r ? (e.agentMcpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Rs = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((L) => x.has(c.id) && x.has(L)).map((L) => ({
      id: `gwx:${c.id}->${L}`,
      sourceId: c.id,
      targetId: L,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Ds = (e.agentGatewayUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ls = r ? (e.agentApiOpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], zs = r ? (e.agentQueryUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Us = (e.agentDelegations ?? []).filter((c) => x.has(c.agentId) && x.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), qs = (e.actorAgentUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Fs = r ? (e.agentTriggers ?? []).filter((c) => x.has(c.eventId) && x.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Vs = r ? (e.externalCalls ?? []).filter((c) => x.has(c.externalSystemId) && x.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Hs = r ? (e.externalUseCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
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
    nodes: b,
    edges: [
      ...k,
      ...P,
      ...z,
      ...D,
      ...R,
      ...y,
      ...$,
      ...T,
      ...O,
      ...h,
      ...I,
      ...N,
      ...$s,
      ...Es,
      ...Ss,
      ...Cs,
      ...As,
      ...F,
      ...K,
      ...Ft,
      ...ge,
      ...se,
      ...ne,
      ...le,
      ...Ms,
      ...Ts,
      ...Ns,
      ...Rs,
      ...Ds,
      ...Ls,
      ...zs,
      ...Us,
      ...qs,
      ...Fs,
      ...Ps,
      ...Os,
      ...g,
      ...Vs,
      ...Hs
    ]
  };
}
const to = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, io = 176, no = 60, so = 140, oo = 40;
function ao(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const r = 220 + o * 340;
    i.filter((u) => u.moduleId === n.id).forEach((u, p) => {
      const a = s.filter((m) => m.aggregateId === u.id).length, d = 140 + p * (170 + a * 60);
      t[u.id] = { x: r, y: d }, s.filter((m) => m.aggregateId === u.id).forEach((m, f) => {
        t[m.id] = { x: r + 60, y: d + 100 + f * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function ro(e, t) {
  const i = ao(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const a = n.get(p.moduleId), d = (a == null ? void 0 : a.subdomainType) ?? "GENERIC", m = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: m.x,
      y: m.y,
      w: io,
      h: no,
      kind: "aggregate",
      symbol: "aggregate",
      fill: to[d],
      stroke: "#64748b",
      badge: a ? `${a.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${a ? ` — módulo ${a.name} (${d})` : ""}`
    };
  }), r = (e.entities ?? []).map((p) => {
    const a = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: a.x,
      y: a.y,
      w: so,
      h: oo,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${p.name} (dentro del agregado)`
    };
  }), l = (e.entities ?? []).map((p) => ({
    id: `contains:${p.aggregateId}->${p.id}`,
    sourceId: p.aggregateId,
    targetId: p.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), u = (e.aggregateReferences ?? []).map((p, a) => ({
    id: `aggref:${a}:${p.sourceAggregateId}->${p.targetAggregateId}`,
    sourceId: p.sourceAggregateId,
    targetId: p.targetAggregateId,
    kind: "aggregate-reference",
    label: p.label,
    color: "#475569",
    arrow: !0,
    tooltip: p.label ? `Referencia: ${p.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...r],
    edges: [...l, ...u]
  };
}
const lo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, co = 150, po = 44, uo = 190, mo = 56, ho = 160, fo = 48;
function go(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Io(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), r = (l) => {
    var u, p;
    return ((p = (u = e.aggregates) == null ? void 0 : u.find((a) => a.id === l)) == null ? void 0 : p.name) ?? l ?? "?";
  };
  return i.forEach((l, u) => {
    const p = 120 + u * 130, a = lo[l.archetype] ?? "#475569", d = l.triggerAggregateId ?? l.sourceId;
    if (!o.has(d)) {
      o.add(d);
      const g = t[d] ?? { x: 160, y: p };
      s.push({
        id: d,
        label: l.triggerAggregateId ? r(l.triggerAggregateId) : d,
        x: g.x,
        y: g.y,
        w: co,
        h: po,
        kind: l.triggerAggregateId ? "aggregate" : "module",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${l.id}`, f = t[m] ?? { x: 470, y: p };
    s.push({
      id: m,
      label: l.name,
      x: f.x,
      y: f.y,
      w: uo,
      h: mo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: a,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const b = go(e, l), _ = `tgt:${b.id}`;
    if (!o.has(_)) {
      o.add(_);
      const g = t[_] ?? { x: 790, y: p };
      s.push({
        id: _,
        label: b.label,
        x: g.x,
        y: g.y,
        w: ho,
        h: fo,
        kind: b.external ? "external-system" : "module",
        symbol: "component",
        fill: b.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: b.external,
        badge: b.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${l.id}:in`,
      sourceId: d,
      targetId: m,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${l.id}:out`,
      sourceId: m,
      targetId: _,
      kind: "flow-delivery",
      color: a,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const yo = 190, vo = 56, wi = 170, wo = 52;
function sn(e, t) {
  const i = [], s = [], n = (o) => {
    var r;
    return (r = e.modules.find((l) => l.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const l = 140 + r * 240, u = t[o.id] ?? { x: 150, y: l };
    i.push({
      id: o.id,
      label: o.name,
      x: u.x,
      y: u.y,
      w: yo,
      h: vo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let p = o.id;
    if (o.steps.forEach((a, d) => {
      const m = a.type === "HUMAN", f = t[a.id] ?? { x: 150 + (d + 1) * 240, y: l };
      if (i.push({
        id: a.id,
        label: a.name,
        x: f.x,
        y: f.y,
        w: wi,
        h: wo,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${a.roleId ? ` · ${a.roleId}` : ""}${a.deadline ? ` · ⏱ ${a.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${a.name}${a.useCaseId ? ` — use case ${a.useCaseId}` : ""}${a.deadline ? ` · deadline ${a.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${d}`,
        sourceId: p,
        targetId: a.id,
        kind: "process-seq",
        label: d === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), a.compensationUseCaseId) {
        const b = `comp:${a.id}`, _ = t[b] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: b,
          label: a.compensationUseCaseId,
          x: _.x,
          y: _.y,
          w: wi,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), s.push({
          id: `pc:${a.id}`,
          sourceId: a.id,
          targetId: b,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = a.id;
    }), o.onCompletionEventName) {
      const a = `done:${o.id}`, d = t[a] ?? { x: 150 + (o.steps.length + 1) * 240, y: l };
      i.push({
        id: a,
        label: o.onCompletionEventName,
        x: d.x,
        y: d.y,
        w: wi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${o.id}`,
        sourceId: p,
        targetId: a,
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
const Zt = globalThis, Vi = Zt.ShadowRoot && (Zt.ShadyCSS === void 0 || Zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Hi = Symbol(), on = /* @__PURE__ */ new WeakMap();
let jn = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Hi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Vi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = on.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && on.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xo = (e) => new jn(typeof e == "string" ? e : e + "", void 0, Hi), mt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new jn(i, e, Hi);
}, bo = (e, t) => {
  if (Vi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Zt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, an = Vi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return xo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _o, defineProperty: ko, getOwnPropertyDescriptor: $o, getOwnPropertyNames: Eo, getOwnPropertySymbols: So, getPrototypeOf: Co } = Object, He = globalThis, rn = He.trustedTypes, Ao = rn ? rn.emptyScript : "", xi = He.reactiveElementPolyfillSupport, St = (e, t) => e, ni = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ao : null;
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
} }, Bi = (e, t) => !_o(e, t), dn = { attribute: !0, type: String, converter: ni, reflect: !1, useDefault: !1, hasChanged: Bi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), He.litPropertyMetadata ?? (He.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let at = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = dn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && ko(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = $o(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: n, set(r) {
      const l = n == null ? void 0 : n.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? dn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(St("elementProperties"))) return;
    const t = Co(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(St("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(St("properties"))) {
      const i = this.properties, s = [...Eo(i), ...So(i)];
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
      for (const n of s) i.unshift(an(n));
    } else t !== void 0 && i.push(an(t));
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
    return bo(t, this.constructor.elementStyles), t;
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
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : ni).toAttribute(i, s.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const l = s.getPropertyOptions(n), u = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : ni;
      this._$Em = n;
      const p = u.fromAttribute(i, l.type);
      this[n] = p ?? ((r = this._$Ej) == null ? void 0 : r.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Bi)(o, i) || s.useDefault && s.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
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
        const { wrapped: l } = r, u = this[o];
        l !== !0 || this._$AL.has(o) || u === void 0 || this.C(o, void 0, r, u);
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
at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, at[St("elementProperties")] = /* @__PURE__ */ new Map(), at[St("finalized")] = /* @__PURE__ */ new Map(), xi == null || xi({ ReactiveElement: at }), (He.reactiveElementVersions ?? (He.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = globalThis, ln = (e) => e, si = Ct.trustedTypes, cn = si ? si.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Kn = "$lit$", Ve = `lit$${Math.random().toFixed(9).slice(2)}$`, Xn = "?" + Ve, Mo = `<${Xn}>`, Je = document, Pt = () => Je.createComment(""), Ot = (e) => e === null || typeof e != "object" && typeof e != "function", Wi = Array.isArray, Po = (e) => Wi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", bi = `[ 	
\f\r]`, wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pn = /-->/g, un = />/g, We = RegExp(`>|${bi}(?:([^\\s"'>=/]+)(${bi}*=${bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mn = /'/g, hn = /"/g, Qn = /^(?:script|style|textarea|title)$/i, Zn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = Zn(1), G = Zn(2), lt = Symbol.for("lit-noChange"), Z = Symbol.for("lit-nothing"), fn = /* @__PURE__ */ new WeakMap(), Ke = Je.createTreeWalker(Je, 129);
function Jn(e, t) {
  if (!Wi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return cn !== void 0 ? cn.createHTML(t) : t;
}
const Oo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = wt;
  for (let l = 0; l < i; l++) {
    const u = e[l];
    let p, a, d = -1, m = 0;
    for (; m < u.length && (r.lastIndex = m, a = r.exec(u), a !== null); ) m = r.lastIndex, r === wt ? a[1] === "!--" ? r = pn : a[1] !== void 0 ? r = un : a[2] !== void 0 ? (Qn.test(a[2]) && (n = RegExp("</" + a[2], "g")), r = We) : a[3] !== void 0 && (r = We) : r === We ? a[0] === ">" ? (r = n ?? wt, d = -1) : a[1] === void 0 ? d = -2 : (d = r.lastIndex - a[2].length, p = a[1], r = a[3] === void 0 ? We : a[3] === '"' ? hn : mn) : r === hn || r === mn ? r = We : r === pn || r === un ? r = wt : (r = We, n = void 0);
    const f = r === We && e[l + 1].startsWith("/>") ? " " : "";
    o += r === wt ? u + Mo : d >= 0 ? (s.push(p), u.slice(0, d) + Kn + u.slice(d) + Ve + f) : u + Ve + (d === -2 ? l : f);
  }
  return [Jn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Tt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, u = this.parts, [p, a] = Oo(t, i);
    if (this.el = Tt.createElement(p, s), Ke.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Ke.nextNode()) !== null && u.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Kn)) {
          const m = a[r++], f = n.getAttribute(d).split(Ve), b = /([.?@])?(.*)/.exec(m);
          u.push({ type: 1, index: o, name: b[2], strings: f, ctor: b[1] === "." ? No : b[1] === "?" ? Ro : b[1] === "@" ? Do : pi }), n.removeAttribute(d);
        } else d.startsWith(Ve) && (u.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Qn.test(n.tagName)) {
          const d = n.textContent.split(Ve), m = d.length - 1;
          if (m > 0) {
            n.textContent = si ? si.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(d[f], Pt()), Ke.nextNode(), u.push({ type: 2, index: ++o });
            n.append(d[m], Pt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Xn) u.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(Ve, d + 1)) !== -1; ) u.push({ type: 7, index: o }), d += Ve.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = Je.createElement("template");
    return s.innerHTML = t, s;
  }
}
function ct(e, t, i = e, s) {
  var r, l;
  if (t === lt) return t;
  let n = s !== void 0 ? (r = i._$Co) == null ? void 0 : r[s] : i._$Cl;
  const o = Ot(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = ct(e, n._$AS(e, t.values), n, s)), t;
}
class To {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Je).importNode(i, !0);
    Ke.currentNode = n;
    let o = Ke.nextNode(), r = 0, l = 0, u = s[0];
    for (; u !== void 0; ) {
      if (r === u.index) {
        let p;
        u.type === 2 ? p = new zt(o, o.nextSibling, this, t) : u.type === 1 ? p = new u.ctor(o, u.name, u.strings, this, t) : u.type === 6 && (p = new Lo(o, this, t)), this._$AV.push(p), u = s[++l];
      }
      r !== (u == null ? void 0 : u.index) && (o = Ke.nextNode(), r++);
    }
    return Ke.currentNode = Je, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class zt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = Z, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = ct(this, t, i), Ot(t) ? t === Z || t == null || t === "" ? (this._$AH !== Z && this._$AR(), this._$AH = Z) : t !== this._$AH && t !== lt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Po(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Z && Ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Je.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Tt.createElement(Jn(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const r = new To(n, this), l = r.u(this.options);
      r.p(i), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = fn.get(t.strings);
    return i === void 0 && fn.set(t.strings, i = new Tt(t)), i;
  }
  k(t) {
    Wi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new zt(this.O(Pt()), this.O(Pt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = ln(t).nextSibling;
      ln(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class pi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = Z, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = Z;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = ct(this, t, i, 0), r = !Ot(t) || t !== this._$AH && t !== lt, r && (this._$AH = t);
    else {
      const l = t;
      let u, p;
      for (t = o[0], u = 0; u < o.length - 1; u++) p = ct(this, l[s + u], i, u), p === lt && (p = this._$AH[u]), r || (r = !Ot(p) || p !== this._$AH[u]), p === Z ? t = Z : t !== Z && (t += (p ?? "") + o[u + 1]), this._$AH[u] = p;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === Z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class No extends pi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Z ? void 0 : t;
  }
}
class Ro extends pi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Z);
  }
}
class Do extends pi {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ct(this, t, i, 0) ?? Z) === lt) return;
    const s = this._$AH, n = t === Z && s !== Z || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== Z && (s === Z || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Lo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ct(this, t);
  }
}
const _i = Ct.litHtmlPolyfillSupport;
_i == null || _i(Tt, zt), (Ct.litHtmlVersions ?? (Ct.litHtmlVersions = [])).push("3.3.3");
const zo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new zt(t.insertBefore(Pt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = globalThis;
class Oe extends at {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zo(i, this.renderRoot, this.renderOptions);
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
    return lt;
  }
}
var qn;
Oe._$litElement$ = !0, Oe.finalized = !0, (qn = Qe.litElementHydrateSupport) == null || qn.call(Qe, { LitElement: Oe });
const ki = Qe.litElementPolyfillSupport;
ki == null || ki({ LitElement: Oe });
(Qe.litElementVersions ?? (Qe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Uo = { attribute: !0, type: String, converter: ni, reflect: !1, hasChanged: Bi }, qo = (e = Uo, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const u = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, u, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(l) {
      const u = this[r];
      t.call(this, l), this.requestUpdate(r, u, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ee(e) {
  return (t, i) => typeof i == "object" ? qo(e, t, i) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(e) {
  return ee({ ...e, state: !0, attribute: !1 });
}
var Pi = "http://www.w3.org/1999/xhtml";
const gn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Pi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ui(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), gn.hasOwnProperty(t) ? { space: gn[t], local: e } : e;
}
function Fo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Pi && t.documentElement.namespaceURI === Pi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Vo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function es(e) {
  var t = ui(e);
  return (t.local ? Vo : Fo)(t);
}
function Ho() {
}
function Gi(e) {
  return e == null ? Ho : function() {
    return this.querySelector(e);
  };
}
function Bo(e) {
  typeof e != "function" && (e = Gi(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, l = s[n] = new Array(r), u, p, a = 0; a < r; ++a)
      (u = o[a]) && (p = e.call(u, u.__data__, a, o)) && ("__data__" in u && (p.__data__ = u.__data__), l[a] = p);
  return new we(s, this._parents);
}
function Wo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Go() {
  return [];
}
function ts(e) {
  return e == null ? Go : function() {
    return this.querySelectorAll(e);
  };
}
function Yo(e) {
  return function() {
    return Wo(e.apply(this, arguments));
  };
}
function jo(e) {
  typeof e == "function" ? e = Yo(e) : e = ts(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var r = t[o], l = r.length, u, p = 0; p < l; ++p)
      (u = r[p]) && (s.push(e.call(u, u.__data__, p, r)), n.push(u));
  return new we(s, n);
}
function is(e) {
  return function() {
    return this.matches(e);
  };
}
function ns(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ko = Array.prototype.find;
function Xo(e) {
  return function() {
    return Ko.call(this.children, e);
  };
}
function Qo() {
  return this.firstElementChild;
}
function Zo(e) {
  return this.select(e == null ? Qo : Xo(typeof e == "function" ? e : ns(e)));
}
var Jo = Array.prototype.filter;
function ea() {
  return Array.from(this.children);
}
function ta(e) {
  return function() {
    return Jo.call(this.children, e);
  };
}
function ia(e) {
  return this.selectAll(e == null ? ea : ta(typeof e == "function" ? e : ns(e)));
}
function na(e) {
  typeof e != "function" && (e = is(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, l = s[n] = [], u, p = 0; p < r; ++p)
      (u = o[p]) && e.call(u, u.__data__, p, o) && l.push(u);
  return new we(s, this._parents);
}
function ss(e) {
  return new Array(e.length);
}
function sa() {
  return new we(this._enter || this._groups.map(ss), this._parents);
}
function oi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
oi.prototype = {
  constructor: oi,
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
function oa(e) {
  return function() {
    return e;
  };
}
function aa(e, t, i, s, n, o) {
  for (var r = 0, l, u = t.length, p = o.length; r < p; ++r)
    (l = t[r]) ? (l.__data__ = o[r], s[r] = l) : i[r] = new oi(e, o[r]);
  for (; r < u; ++r)
    (l = t[r]) && (n[r] = l);
}
function ra(e, t, i, s, n, o, r) {
  var l, u, p = /* @__PURE__ */ new Map(), a = t.length, d = o.length, m = new Array(a), f;
  for (l = 0; l < a; ++l)
    (u = t[l]) && (m[l] = f = r.call(u, u.__data__, l, t) + "", p.has(f) ? n[l] = u : p.set(f, u));
  for (l = 0; l < d; ++l)
    f = r.call(e, o[l], l, o) + "", (u = p.get(f)) ? (s[l] = u, u.__data__ = o[l], p.delete(f)) : i[l] = new oi(e, o[l]);
  for (l = 0; l < a; ++l)
    (u = t[l]) && p.get(m[l]) === u && (n[l] = u);
}
function da(e) {
  return e.__data__;
}
function la(e, t) {
  if (!arguments.length) return Array.from(this, da);
  var i = t ? ra : aa, s = this._parents, n = this._groups;
  typeof e != "function" && (e = oa(e));
  for (var o = n.length, r = new Array(o), l = new Array(o), u = new Array(o), p = 0; p < o; ++p) {
    var a = s[p], d = n[p], m = d.length, f = ca(e.call(a, a && a.__data__, p, s)), b = f.length, _ = l[p] = new Array(b), g = r[p] = new Array(b), k = u[p] = new Array(m);
    i(a, d, _, g, k, f, t);
    for (var P = 0, M = 0, w, C; P < b; ++P)
      if (w = _[P]) {
        for (P >= M && (M = P + 1); !(C = g[M]) && ++M < b; ) ;
        w._next = C || null;
      }
  }
  return r = new we(r, s), r._enter = l, r._exit = u, r;
}
function ca(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function pa() {
  return new we(this._exit || this._groups.map(ss), this._parents);
}
function ua(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function ma(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, r = Math.min(n, o), l = new Array(n), u = 0; u < r; ++u)
    for (var p = i[u], a = s[u], d = p.length, m = l[u] = new Array(d), f, b = 0; b < d; ++b)
      (f = p[b] || a[b]) && (m[b] = f);
  for (; u < n; ++u)
    l[u] = i[u];
  return new we(l, this._parents);
}
function ha() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], r; --n >= 0; )
      (r = s[n]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function fa(e) {
  e || (e = ga);
  function t(d, m) {
    return d && m ? e(d.__data__, m.__data__) : !d - !m;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var r = i[o], l = r.length, u = n[o] = new Array(l), p, a = 0; a < l; ++a)
      (p = r[a]) && (u[a] = p);
    u.sort(t);
  }
  return new we(n, this._parents).order();
}
function ga(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ia() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function ya() {
  return Array.from(this);
}
function va() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var r = s[n];
      if (r) return r;
    }
  return null;
}
function wa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function xa() {
  return !this.node();
}
function ba(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, r = n.length, l; o < r; ++o)
      (l = n[o]) && e.call(l, l.__data__, o, n);
  return this;
}
function _a(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ka(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function $a(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Ea(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Sa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ca(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Aa(e, t) {
  var i = ui(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ka : _a : typeof t == "function" ? i.local ? Ca : Sa : i.local ? Ea : $a)(i, t));
}
function os(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ma(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Pa(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Oa(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function Ta(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ma : typeof t == "function" ? Oa : Pa)(e, t, i ?? "")) : pt(this.node(), e);
}
function pt(e, t) {
  return e.style.getPropertyValue(t) || os(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Na(e) {
  return function() {
    delete this[e];
  };
}
function Ra(e, t) {
  return function() {
    this[e] = t;
  };
}
function Da(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function La(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Na : typeof t == "function" ? Da : Ra)(e, t)) : this.node()[e];
}
function as(e) {
  return e.trim().split(/^|\s+/);
}
function Yi(e) {
  return e.classList || new rs(e);
}
function rs(e) {
  this._node = e, this._names = as(e.getAttribute("class") || "");
}
rs.prototype = {
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
function ds(e, t) {
  for (var i = Yi(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function ls(e, t) {
  for (var i = Yi(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function za(e) {
  return function() {
    ds(this, e);
  };
}
function Ua(e) {
  return function() {
    ls(this, e);
  };
}
function qa(e, t) {
  return function() {
    (t.apply(this, arguments) ? ds : ls)(this, e);
  };
}
function Fa(e, t) {
  var i = as(e + "");
  if (arguments.length < 2) {
    for (var s = Yi(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? qa : t ? za : Ua)(i, t));
}
function Va() {
  this.textContent = "";
}
function Ha(e) {
  return function() {
    this.textContent = e;
  };
}
function Ba(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Wa(e) {
  return arguments.length ? this.each(e == null ? Va : (typeof e == "function" ? Ba : Ha)(e)) : this.node().textContent;
}
function Ga() {
  this.innerHTML = "";
}
function Ya(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ja(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ka(e) {
  return arguments.length ? this.each(e == null ? Ga : (typeof e == "function" ? ja : Ya)(e)) : this.node().innerHTML;
}
function Xa() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Qa() {
  return this.each(Xa);
}
function Za() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ja() {
  return this.each(Za);
}
function er(e) {
  var t = typeof e == "function" ? e : es(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function tr() {
  return null;
}
function ir(e, t) {
  var i = typeof e == "function" ? e : es(e), s = t == null ? tr : typeof t == "function" ? t : Gi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function nr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function sr() {
  return this.each(nr);
}
function or() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ar() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function rr(e) {
  return this.select(e ? ar : or);
}
function dr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function lr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function cr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function pr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function ur(e, t, i) {
  return function() {
    var s = this.__on, n, o = lr(t);
    if (s) {
      for (var r = 0, l = s.length; r < l; ++r)
        if ((n = s[r]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function mr(e, t, i) {
  var s = cr(e + ""), n, o = s.length, r;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var u = 0, p = l.length, a; u < p; ++u)
        for (n = 0, a = l[u]; n < o; ++n)
          if ((r = s[n]).type === a.type && r.name === a.name)
            return a.value;
    }
    return;
  }
  for (l = t ? ur : pr, n = 0; n < o; ++n) this.each(l(s[n], t, i));
  return this;
}
function cs(e, t, i) {
  var s = os(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function hr(e, t) {
  return function() {
    return cs(this, e, t);
  };
}
function fr(e, t) {
  return function() {
    return cs(this, e, t.apply(this, arguments));
  };
}
function gr(e, t) {
  return this.each((typeof t == "function" ? fr : hr)(e, t));
}
function* Ir() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, r; n < o; ++n)
      (r = s[n]) && (yield r);
}
var ps = [null];
function we(e, t) {
  this._groups = e, this._parents = t;
}
function Ut() {
  return new we([[document.documentElement]], ps);
}
function yr() {
  return this;
}
we.prototype = Ut.prototype = {
  constructor: we,
  select: Bo,
  selectAll: jo,
  selectChild: Zo,
  selectChildren: ia,
  filter: na,
  data: la,
  enter: sa,
  exit: pa,
  join: ua,
  merge: ma,
  selection: yr,
  order: ha,
  sort: fa,
  call: Ia,
  nodes: ya,
  node: va,
  size: wa,
  empty: xa,
  each: ba,
  attr: Aa,
  style: Ta,
  property: La,
  classed: Fa,
  text: Wa,
  html: Ka,
  raise: Qa,
  lower: Ja,
  append: er,
  insert: ir,
  remove: sr,
  clone: rr,
  datum: dr,
  on: mr,
  dispatch: gr,
  [Symbol.iterator]: Ir
};
function Se(e) {
  return typeof e == "string" ? new we([[document.querySelector(e)]], [document.documentElement]) : new we([[e]], ps);
}
function vr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ge(e, t) {
  if (e = vr(e), t === void 0 && (t = e.currentTarget), t) {
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
var wr = { value: () => {
} };
function ji() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new Jt(i);
}
function Jt(e) {
  this._ = e;
}
function xr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Jt.prototype = ji.prototype = {
  constructor: Jt,
  on: function(e, t) {
    var i = this._, s = xr(e + "", i), n, o = -1, r = s.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((n = (e = s[o]).type) && (n = br(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (n = (e = s[o]).type) i[n] = In(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = In(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Jt(e);
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
function br(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function In(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = wr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Oi = { capture: !0, passive: !1 };
function Ti(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function _r(e) {
  var t = e.document.documentElement, i = Se(e).on("dragstart.drag", Ti, Oi);
  "onselectstart" in t ? i.on("selectstart.drag", Ti, Oi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function kr(e, t) {
  var i = e.document.documentElement, s = Se(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Ti, Oi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Ki(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function us(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function qt() {
}
var Nt = 0.7, ai = 1 / Nt, dt = "\\s*([+-]?\\d+)\\s*", Rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Te = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $r = /^#([0-9a-f]{3,8})$/, Er = new RegExp(`^rgb\\(${dt},${dt},${dt}\\)$`), Sr = new RegExp(`^rgb\\(${Te},${Te},${Te}\\)$`), Cr = new RegExp(`^rgba\\(${dt},${dt},${dt},${Rt}\\)$`), Ar = new RegExp(`^rgba\\(${Te},${Te},${Te},${Rt}\\)$`), Mr = new RegExp(`^hsl\\(${Rt},${Te},${Te}\\)$`), Pr = new RegExp(`^hsla\\(${Rt},${Te},${Te},${Rt}\\)$`), yn = {
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
Ki(qt, Dt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vn,
  // Deprecated! Use color.formatHex.
  formatHex: vn,
  formatHex8: Or,
  formatHsl: Tr,
  formatRgb: wn,
  toString: wn
});
function vn() {
  return this.rgb().formatHex();
}
function Or() {
  return this.rgb().formatHex8();
}
function Tr() {
  return ms(this).formatHsl();
}
function wn() {
  return this.rgb().formatRgb();
}
function Dt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = $r.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? xn(t) : i === 3 ? new Ie(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Wt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Wt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Er.exec(e)) ? new Ie(t[1], t[2], t[3], 1) : (t = Sr.exec(e)) ? new Ie(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Cr.exec(e)) ? Wt(t[1], t[2], t[3], t[4]) : (t = Ar.exec(e)) ? Wt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Mr.exec(e)) ? kn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Pr.exec(e)) ? kn(t[1], t[2] / 100, t[3] / 100, t[4]) : yn.hasOwnProperty(e) ? xn(yn[e]) : e === "transparent" ? new Ie(NaN, NaN, NaN, 0) : null;
}
function xn(e) {
  return new Ie(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Wt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new Ie(e, t, i, s);
}
function Nr(e) {
  return e instanceof qt || (e = Dt(e)), e ? (e = e.rgb(), new Ie(e.r, e.g, e.b, e.opacity)) : new Ie();
}
function Ni(e, t, i, s) {
  return arguments.length === 1 ? Nr(e) : new Ie(e, t, i, s ?? 1);
}
function Ie(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Ki(Ie, Ni, us(qt, {
  brighter(e) {
    return e = e == null ? ai : Math.pow(ai, e), new Ie(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new Ie(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ie(Ze(this.r), Ze(this.g), Ze(this.b), ri(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bn,
  // Deprecated! Use color.formatHex.
  formatHex: bn,
  formatHex8: Rr,
  formatRgb: _n,
  toString: _n
}));
function bn() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}`;
}
function Rr() {
  return `#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}${Xe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function _n() {
  const e = ri(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ze(this.r)}, ${Ze(this.g)}, ${Ze(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ri(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ze(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Xe(e) {
  return e = Ze(e), (e < 16 ? "0" : "") + e.toString(16);
}
function kn(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ce(e, t, i, s);
}
function ms(e) {
  if (e instanceof Ce) return new Ce(e.h, e.s, e.l, e.opacity);
  if (e instanceof qt || (e = Dt(e)), !e) return new Ce();
  if (e instanceof Ce) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), r = NaN, l = o - n, u = (o + n) / 2;
  return l ? (t === o ? r = (i - s) / l + (i < s) * 6 : i === o ? r = (s - t) / l + 2 : r = (t - i) / l + 4, l /= u < 0.5 ? o + n : 2 - o - n, r *= 60) : l = u > 0 && u < 1 ? 0 : r, new Ce(r, l, u, e.opacity);
}
function Dr(e, t, i, s) {
  return arguments.length === 1 ? ms(e) : new Ce(e, t, i, s ?? 1);
}
function Ce(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Ki(Ce, Dr, us(qt, {
  brighter(e) {
    return e = e == null ? ai : Math.pow(ai, e), new Ce(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new Ce(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new Ie(
      $i(e >= 240 ? e - 240 : e + 120, n, s),
      $i(e, n, s),
      $i(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Ce($n(this.h), Gt(this.s), Gt(this.l), ri(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ri(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${$n(this.h)}, ${Gt(this.s) * 100}%, ${Gt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function $n(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Gt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function $i(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const hs = (e) => () => e;
function Lr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function zr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Ur(e) {
  return (e = +e) == 1 ? fs : function(t, i) {
    return i - t ? zr(t, i, e) : hs(isNaN(t) ? i : t);
  };
}
function fs(e, t) {
  var i = t - e;
  return i ? Lr(e, i) : hs(isNaN(e) ? t : e);
}
const En = (function e(t) {
  var i = Ur(t);
  function s(n, o) {
    var r = i((n = Ni(n)).r, (o = Ni(o)).r), l = i(n.g, o.g), u = i(n.b, o.b), p = fs(n.opacity, o.opacity);
    return function(a) {
      return n.r = r(a), n.g = l(a), n.b = u(a), n.opacity = p(a), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Fe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ri = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ei = new RegExp(Ri.source, "g");
function qr(e) {
  return function() {
    return e;
  };
}
function Fr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Vr(e, t) {
  var i = Ri.lastIndex = Ei.lastIndex = 0, s, n, o, r = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (s = Ri.exec(e)) && (n = Ei.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), l[r] ? l[r] += o : l[++r] = o), (s = s[0]) === (n = n[0]) ? l[r] ? l[r] += n : l[++r] = n : (l[++r] = null, u.push({ i: r, x: Fe(s, n) })), i = Ei.lastIndex;
  return i < t.length && (o = t.slice(i), l[r] ? l[r] += o : l[++r] = o), l.length < 2 ? u[0] ? Fr(u[0].x) : qr(t) : (t = u.length, function(p) {
    for (var a = 0, d; a < t; ++a) l[(d = u[a]).i] = d.x(p);
    return l.join("");
  });
}
var Sn = 180 / Math.PI, Di = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function gs(e, t, i, s, n, o) {
  var r, l, u;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (u = e * i + t * s) && (i -= e * u, s -= t * u), (l = Math.sqrt(i * i + s * s)) && (i /= l, s /= l, u /= l), e * s < t * i && (e = -e, t = -t, u = -u, r = -r), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * Sn,
    skewX: Math.atan(u) * Sn,
    scaleX: r,
    scaleY: l
  };
}
var Yt;
function Hr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Di : gs(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Br(e) {
  return e == null || (Yt || (Yt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Yt.setAttribute("transform", e), !(e = Yt.transform.baseVal.consolidate())) ? Di : (e = e.matrix, gs(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Is(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, a, d, m, f, b) {
    if (p !== d || a !== m) {
      var _ = f.push("translate(", null, t, null, i);
      b.push({ i: _ - 4, x: Fe(p, d) }, { i: _ - 2, x: Fe(a, m) });
    } else (d || m) && f.push("translate(" + d + t + m + i);
  }
  function r(p, a, d, m) {
    p !== a ? (p - a > 180 ? a += 360 : a - p > 180 && (p += 360), m.push({ i: d.push(n(d) + "rotate(", null, s) - 2, x: Fe(p, a) })) : a && d.push(n(d) + "rotate(" + a + s);
  }
  function l(p, a, d, m) {
    p !== a ? m.push({ i: d.push(n(d) + "skewX(", null, s) - 2, x: Fe(p, a) }) : a && d.push(n(d) + "skewX(" + a + s);
  }
  function u(p, a, d, m, f, b) {
    if (p !== d || a !== m) {
      var _ = f.push(n(f) + "scale(", null, ",", null, ")");
      b.push({ i: _ - 4, x: Fe(p, d) }, { i: _ - 2, x: Fe(a, m) });
    } else (d !== 1 || m !== 1) && f.push(n(f) + "scale(" + d + "," + m + ")");
  }
  return function(p, a) {
    var d = [], m = [];
    return p = e(p), a = e(a), o(p.translateX, p.translateY, a.translateX, a.translateY, d, m), r(p.rotate, a.rotate, d, m), l(p.skewX, a.skewX, d, m), u(p.scaleX, p.scaleY, a.scaleX, a.scaleY, d, m), p = a = null, function(f) {
      for (var b = -1, _ = m.length, g; ++b < _; ) d[(g = m[b]).i] = g.x(f);
      return d.join("");
    };
  };
}
var Wr = Is(Hr, "px, ", "px)", "deg)"), Gr = Is(Br, ", ", ")", ")"), Yr = 1e-12;
function Cn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function jr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Kr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Xr = (function e(t, i, s) {
  function n(o, r) {
    var l = o[0], u = o[1], p = o[2], a = r[0], d = r[1], m = r[2], f = a - l, b = d - u, _ = f * f + b * b, g, k;
    if (_ < Yr)
      k = Math.log(m / p) / t, g = function(z) {
        return [
          l + z * f,
          u + z * b,
          p * Math.exp(t * z * k)
        ];
      };
    else {
      var P = Math.sqrt(_), M = (m * m - p * p + s * _) / (2 * p * i * P), w = (m * m - p * p - s * _) / (2 * m * i * P), C = Math.log(Math.sqrt(M * M + 1) - M), x = Math.log(Math.sqrt(w * w + 1) - w);
      k = (x - C) / t, g = function(z) {
        var D = z * k, R = Cn(C), y = p / (i * P) * (R * Kr(t * D + C) - jr(C));
        return [
          l + y * f,
          u + y * b,
          p * R / Cn(t * D + C)
        ];
      };
    }
    return g.duration = k * 1e3 * t / Math.SQRT2, g;
  }
  return n.rho = function(o) {
    var r = Math.max(1e-3, +o), l = r * r, u = l * l;
    return e(r, l, u);
  }, n;
})(Math.SQRT2, 2, 4);
var ut = 0, $t = 0, xt = 0, ys = 1e3, di, Et, li = 0, et = 0, mi = 0, Lt = typeof performance == "object" && performance.now ? performance : Date, vs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Xi() {
  return et || (vs(Qr), et = Lt.now() + mi);
}
function Qr() {
  et = 0;
}
function ci() {
  this._call = this._time = this._next = null;
}
ci.prototype = ws.prototype = {
  constructor: ci,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Xi() : +i) + (t == null ? 0 : +t), !this._next && Et !== this && (Et ? Et._next = this : di = this, Et = this), this._call = e, this._time = i, Li();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Li());
  }
};
function ws(e, t, i) {
  var s = new ci();
  return s.restart(e, t, i), s;
}
function Zr() {
  Xi(), ++ut;
  for (var e = di, t; e; )
    (t = et - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ut;
}
function An() {
  et = (li = Lt.now()) + mi, ut = $t = 0;
  try {
    Zr();
  } finally {
    ut = 0, ed(), et = 0;
  }
}
function Jr() {
  var e = Lt.now(), t = e - li;
  t > ys && (mi -= t, li = e);
}
function ed() {
  for (var e, t = di, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : di = i);
  Et = e, Li(s);
}
function Li(e) {
  if (!ut) {
    $t && ($t = clearTimeout($t));
    var t = e - et;
    t > 24 ? (e < 1 / 0 && ($t = setTimeout(An, e - Lt.now() - mi)), xt && (xt = clearInterval(xt))) : (xt || (li = Lt.now(), xt = setInterval(Jr, ys)), ut = 1, vs(An));
  }
}
function Mn(e, t, i) {
  var s = new ci();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var td = ji("start", "end", "cancel", "interrupt"), id = [], xs = 0, Pn = 1, zi = 2, ei = 3, On = 4, Ui = 5, ti = 6;
function hi(e, t, i, s, n, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  nd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: td,
    tween: id,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: xs
  });
}
function Qi(e, t) {
  var i = Ae(e, t);
  if (i.state > xs) throw new Error("too late; already scheduled");
  return i;
}
function Ne(e, t) {
  var i = Ae(e, t);
  if (i.state > ei) throw new Error("too late; already running");
  return i;
}
function Ae(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function nd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = ws(o, 0, i.time);
  function o(p) {
    i.state = Pn, i.timer.restart(r, i.delay, i.time), i.delay <= p && r(p - i.delay);
  }
  function r(p) {
    var a, d, m, f;
    if (i.state !== Pn) return u();
    for (a in s)
      if (f = s[a], f.name === i.name) {
        if (f.state === ei) return Mn(r);
        f.state === On ? (f.state = ti, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[a]) : +a < t && (f.state = ti, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[a]);
      }
    if (Mn(function() {
      i.state === ei && (i.state = On, i.timer.restart(l, i.delay, i.time), l(p));
    }), i.state = zi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === zi) {
      for (i.state = ei, n = new Array(m = i.tween.length), a = 0, d = -1; a < m; ++a)
        (f = i.tween[a].value.call(e, e.__data__, i.index, i.group)) && (n[++d] = f);
      n.length = d + 1;
    }
  }
  function l(p) {
    for (var a = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(u), i.state = Ui, 1), d = -1, m = n.length; ++d < m; )
      n[d].call(e, a);
    i.state === Ui && (i.on.call("end", e, e.__data__, i.index, i.group), u());
  }
  function u() {
    i.state = ti, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function ii(e, t) {
  var i = e.__transition, s, n, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((s = i[r]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > zi && s.state < Ui, s.state = ti, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function sd(e) {
  return this.each(function() {
    ii(this, e);
  });
}
function od(e, t) {
  var i, s;
  return function() {
    var n = Ne(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var r = 0, l = s.length; r < l; ++r)
        if (s[r].name === t) {
          s = s.slice(), s.splice(r, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function ad(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ne(this, e), r = o.tween;
    if (r !== s) {
      n = (s = r).slice();
      for (var l = { name: t, value: i }, u = 0, p = n.length; u < p; ++u)
        if (n[u].name === t) {
          n[u] = l;
          break;
        }
      u === p && n.push(l);
    }
    o.tween = n;
  };
}
function rd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Ae(this.node(), i).tween, n = 0, o = s.length, r; n < o; ++n)
      if ((r = s[n]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? od : ad)(i, e, t));
}
function Zi(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Ne(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Ae(n, s).value[t];
  };
}
function bs(e, t) {
  var i;
  return (typeof t == "number" ? Fe : t instanceof Dt ? En : (i = Dt(t)) ? (t = i, En) : Vr)(e, t);
}
function dd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ld(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function cd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function pd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function ud(e, t, i) {
  var s, n, o;
  return function() {
    var r, l = i(this), u;
    return l == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), u = l + "", r === u ? null : r === s && u === n ? o : (n = u, o = t(s = r, l)));
  };
}
function md(e, t, i) {
  var s, n, o;
  return function() {
    var r, l = i(this), u;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), u = l + "", r === u ? null : r === s && u === n ? o : (n = u, o = t(s = r, l)));
  };
}
function hd(e, t) {
  var i = ui(e), s = i === "transform" ? Gr : bs;
  return this.attrTween(e, typeof t == "function" ? (i.local ? md : ud)(i, s, Zi(this, "attr." + e, t)) : t == null ? (i.local ? ld : dd)(i) : (i.local ? pd : cd)(i, s, t));
}
function fd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function gd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Id(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && gd(e, o)), i;
  }
  return n._value = t, n;
}
function yd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && fd(e, o)), i;
  }
  return n._value = t, n;
}
function vd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = ui(e);
  return this.tween(i, (s.local ? Id : yd)(s, t));
}
function wd(e, t) {
  return function() {
    Qi(this, e).delay = +t.apply(this, arguments);
  };
}
function xd(e, t) {
  return t = +t, function() {
    Qi(this, e).delay = t;
  };
}
function bd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? wd : xd)(t, e)) : Ae(this.node(), t).delay;
}
function _d(e, t) {
  return function() {
    Ne(this, e).duration = +t.apply(this, arguments);
  };
}
function kd(e, t) {
  return t = +t, function() {
    Ne(this, e).duration = t;
  };
}
function $d(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _d : kd)(t, e)) : Ae(this.node(), t).duration;
}
function Ed(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ne(this, e).ease = t;
  };
}
function Sd(e) {
  var t = this._id;
  return arguments.length ? this.each(Ed(t, e)) : Ae(this.node(), t).ease;
}
function Cd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ne(this, e).ease = i;
  };
}
function Ad(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Cd(this._id, e));
}
function Md(e) {
  typeof e != "function" && (e = is(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], r = o.length, l = s[n] = [], u, p = 0; p < r; ++p)
      (u = o[p]) && e.call(u, u.__data__, p, o) && l.push(u);
  return new Ue(s, this._parents, this._name, this._id);
}
function Pd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), r = new Array(s), l = 0; l < o; ++l)
    for (var u = t[l], p = i[l], a = u.length, d = r[l] = new Array(a), m, f = 0; f < a; ++f)
      (m = u[f] || p[f]) && (d[f] = m);
  for (; l < s; ++l)
    r[l] = t[l];
  return new Ue(r, this._parents, this._name, this._id);
}
function Od(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Td(e, t, i) {
  var s, n, o = Od(t) ? Qi : Ne;
  return function() {
    var r = o(this, e), l = r.on;
    l !== s && (n = (s = l).copy()).on(t, i), r.on = n;
  };
}
function Nd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ae(this.node(), i).on.on(e) : this.each(Td(i, e, t));
}
function Rd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Dd() {
  return this.on("end.remove", Rd(this._id));
}
function Ld(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Gi(e));
  for (var s = this._groups, n = s.length, o = new Array(n), r = 0; r < n; ++r)
    for (var l = s[r], u = l.length, p = o[r] = new Array(u), a, d, m = 0; m < u; ++m)
      (a = l[m]) && (d = e.call(a, a.__data__, m, l)) && ("__data__" in a && (d.__data__ = a.__data__), p[m] = d, hi(p[m], t, i, m, p, Ae(a, i)));
  return new Ue(o, this._parents, t, i);
}
function zd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ts(e));
  for (var s = this._groups, n = s.length, o = [], r = [], l = 0; l < n; ++l)
    for (var u = s[l], p = u.length, a, d = 0; d < p; ++d)
      if (a = u[d]) {
        for (var m = e.call(a, a.__data__, d, u), f, b = Ae(a, i), _ = 0, g = m.length; _ < g; ++_)
          (f = m[_]) && hi(f, t, i, _, m, b);
        o.push(m), r.push(a);
      }
  return new Ue(o, r, t, i);
}
var Ud = Ut.prototype.constructor;
function qd() {
  return new Ud(this._groups, this._parents);
}
function Fd(e, t) {
  var i, s, n;
  return function() {
    var o = pt(this, e), r = (this.style.removeProperty(e), pt(this, e));
    return o === r ? null : o === i && r === s ? n : n = t(i = o, s = r);
  };
}
function _s(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Vd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var r = pt(this, e);
    return r === n ? null : r === s ? o : o = t(s = r, i);
  };
}
function Hd(e, t, i) {
  var s, n, o;
  return function() {
    var r = pt(this, e), l = i(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(e), pt(this, e))), r === u ? null : r === s && u === n ? o : (n = u, o = t(s = r, l));
  };
}
function Bd(e, t) {
  var i, s, n, o = "style." + t, r = "end." + o, l;
  return function() {
    var u = Ne(this, e), p = u.on, a = u.value[o] == null ? l || (l = _s(t)) : void 0;
    (p !== i || n !== a) && (s = (i = p).copy()).on(r, n = a), u.on = s;
  };
}
function Wd(e, t, i) {
  var s = (e += "") == "transform" ? Wr : bs;
  return t == null ? this.styleTween(e, Fd(e, s)).on("end.style." + e, _s(e)) : typeof t == "function" ? this.styleTween(e, Hd(e, s, Zi(this, "style." + e, t))).each(Bd(this._id, e)) : this.styleTween(e, Vd(e, s, t), i).on("end.style." + e, null);
}
function Gd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Yd(e, t, i) {
  var s, n;
  function o() {
    var r = t.apply(this, arguments);
    return r !== n && (s = (n = r) && Gd(e, r, i)), s;
  }
  return o._value = t, o;
}
function jd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Yd(e, t, i ?? ""));
}
function Kd(e) {
  return function() {
    this.textContent = e;
  };
}
function Xd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Qd(e) {
  return this.tween("text", typeof e == "function" ? Xd(Zi(this, "text", e)) : Kd(e == null ? "" : e + ""));
}
function Zd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Jd(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && Zd(n)), t;
  }
  return s._value = e, s;
}
function el(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Jd(e));
}
function tl() {
  for (var e = this._name, t = this._id, i = ks(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var r = s[o], l = r.length, u, p = 0; p < l; ++p)
      if (u = r[p]) {
        var a = Ae(u, t);
        hi(u, e, i, p, r, {
          time: a.time + a.delay + a.duration,
          delay: 0,
          duration: a.duration,
          ease: a.ease
        });
      }
  return new Ue(s, this._parents, e, i);
}
function il() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, r) {
    var l = { value: r }, u = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var p = Ne(this, s), a = p.on;
      a !== e && (t = (e = a).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(u)), p.on = t;
    }), n === 0 && o();
  });
}
var nl = 0;
function Ue(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function ks() {
  return ++nl;
}
var Le = Ut.prototype;
Ue.prototype = {
  constructor: Ue,
  select: Ld,
  selectAll: zd,
  selectChild: Le.selectChild,
  selectChildren: Le.selectChildren,
  filter: Md,
  merge: Pd,
  selection: qd,
  transition: tl,
  call: Le.call,
  nodes: Le.nodes,
  node: Le.node,
  size: Le.size,
  empty: Le.empty,
  each: Le.each,
  on: Nd,
  attr: hd,
  attrTween: vd,
  style: Wd,
  styleTween: jd,
  text: Qd,
  textTween: el,
  remove: Dd,
  tween: rd,
  delay: bd,
  duration: $d,
  ease: Sd,
  easeVarying: Ad,
  end: il,
  [Symbol.iterator]: Le[Symbol.iterator]
};
function sl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var ol = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: sl
};
function al(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function rl(e) {
  var t, i;
  e instanceof Ue ? (t = e._id, e = e._name) : (t = ks(), (i = ol).time = Xi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var r = s[o], l = r.length, u, p = 0; p < l; ++p)
      (u = r[p]) && hi(u, e, t, p, r, i || al(u, t));
  return new Ue(s, this._parents, e, t);
}
Ut.prototype.interrupt = sd;
Ut.prototype.transition = rl;
const jt = (e) => () => e;
function dl(e, {
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
var At = new ze(1, 0, 0);
ze.prototype;
function Si(e) {
  e.stopImmediatePropagation();
}
function bt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ll(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function cl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Tn() {
  return this.__zoom || At;
}
function pl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ul() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ml(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function hl() {
  var e = ll, t = cl, i = ml, s = pl, n = ul, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = Xr, p = ji("start", "zoom", "end"), a, d, m, f = 500, b = 150, _ = 0, g = 10;
  function k(h) {
    h.property("__zoom", Tn).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", y).filter(n).on("touchstart.zoom", $).on("touchmove.zoom", T).on("touchend.zoom touchcancel.zoom", O).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  k.transform = function(h, I, v, S) {
    var N = h.selection ? h.selection() : h;
    N.property("__zoom", Tn), h !== N ? C(h, I, v, S) : N.interrupt().each(function() {
      x(this, arguments).event(S).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, k.scaleBy = function(h, I, v, S) {
    k.scaleTo(h, function() {
      var N = this.__zoom.k, V = typeof I == "function" ? I.apply(this, arguments) : I;
      return N * V;
    }, v, S);
  }, k.scaleTo = function(h, I, v, S) {
    k.transform(h, function() {
      var N = t.apply(this, arguments), V = this.__zoom, U = v == null ? w(N) : typeof v == "function" ? v.apply(this, arguments) : v, A = V.invert(U), F = typeof I == "function" ? I.apply(this, arguments) : I;
      return i(M(P(V, F), U, A), N, r);
    }, v, S);
  }, k.translateBy = function(h, I, v, S) {
    k.transform(h, function() {
      return i(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), r);
    }, null, S);
  }, k.translateTo = function(h, I, v, S, N) {
    k.transform(h, function() {
      var V = t.apply(this, arguments), U = this.__zoom, A = S == null ? w(V) : typeof S == "function" ? S.apply(this, arguments) : S;
      return i(At.translate(A[0], A[1]).scale(U.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), V, r);
    }, S, N);
  };
  function P(h, I) {
    return I = Math.max(o[0], Math.min(o[1], I)), I === h.k ? h : new ze(I, h.x, h.y);
  }
  function M(h, I, v) {
    var S = I[0] - v[0] * h.k, N = I[1] - v[1] * h.k;
    return S === h.x && N === h.y ? h : new ze(h.k, S, N);
  }
  function w(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function C(h, I, v, S) {
    h.on("start.zoom", function() {
      x(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      x(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var N = this, V = arguments, U = x(N, V).event(S), A = t.apply(N, V), F = v == null ? w(A) : typeof v == "function" ? v.apply(N, V) : v, K = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), X = N.__zoom, se = typeof I == "function" ? I.apply(N, V) : I, ne = u(X.invert(F).concat(K / X.k), se.invert(F).concat(K / se.k));
      return function(le) {
        if (le === 1) le = se;
        else {
          var ge = ne(le), Pe = K / ge[2];
          le = new ze(Pe, F[0] - ge[0] * Pe, F[1] - ge[1] * Pe);
        }
        U.zoom(null, le);
      };
    });
  }
  function x(h, I, v) {
    return !v && h.__zooming || new z(h, I);
  }
  function z(h, I) {
    this.that = h, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, I), this.taps = 0;
  }
  z.prototype = {
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
      var I = Se(this.that).datum();
      p.call(
        h,
        this.that,
        new dl(h, {
          sourceEvent: this.sourceEvent,
          target: k,
          transform: this.that.__zoom,
          dispatch: p
        }),
        I
      );
    }
  };
  function D(h, ...I) {
    if (!e.apply(this, arguments)) return;
    var v = x(this, I).event(h), S = this.__zoom, N = Math.max(o[0], Math.min(o[1], S.k * Math.pow(2, s.apply(this, arguments)))), V = Ge(h);
    if (v.wheel)
      (v.mouse[0][0] !== V[0] || v.mouse[0][1] !== V[1]) && (v.mouse[1] = S.invert(v.mouse[0] = V)), clearTimeout(v.wheel);
    else {
      if (S.k === N) return;
      v.mouse = [V, S.invert(V)], ii(this), v.start();
    }
    bt(h), v.wheel = setTimeout(U, b), v.zoom("mouse", i(M(P(S, N), v.mouse[0], v.mouse[1]), v.extent, r));
    function U() {
      v.wheel = null, v.end();
    }
  }
  function R(h, ...I) {
    if (m || !e.apply(this, arguments)) return;
    var v = h.currentTarget, S = x(this, I, !0).event(h), N = Se(h.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", K, !0), V = Ge(h, v), U = h.clientX, A = h.clientY;
    _r(h.view), Si(h), S.mouse = [V, this.__zoom.invert(V)], ii(this), S.start();
    function F(X) {
      if (bt(X), !S.moved) {
        var se = X.clientX - U, ne = X.clientY - A;
        S.moved = se * se + ne * ne > _;
      }
      S.event(X).zoom("mouse", i(M(S.that.__zoom, S.mouse[0] = Ge(X, v), S.mouse[1]), S.extent, r));
    }
    function K(X) {
      N.on("mousemove.zoom mouseup.zoom", null), kr(X.view, S.moved), bt(X), S.event(X).end();
    }
  }
  function y(h, ...I) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, S = Ge(h.changedTouches ? h.changedTouches[0] : h, this), N = v.invert(S), V = v.k * (h.shiftKey ? 0.5 : 2), U = i(M(P(v, V), S, N), t.apply(this, I), r);
      bt(h), l > 0 ? Se(this).transition().duration(l).call(C, U, S, h) : Se(this).call(k.transform, U, S, h);
    }
  }
  function $(h, ...I) {
    if (e.apply(this, arguments)) {
      var v = h.touches, S = v.length, N = x(this, I, h.changedTouches.length === S).event(h), V, U, A, F;
      for (Si(h), U = 0; U < S; ++U)
        A = v[U], F = Ge(A, this), F = [F, this.__zoom.invert(F), A.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== F[2] && (N.touch1 = F, N.taps = 0) : (N.touch0 = F, V = !0, N.taps = 1 + !!a);
      a && (a = clearTimeout(a)), V && (N.taps < 2 && (d = F[0], a = setTimeout(function() {
        a = null;
      }, f)), ii(this), N.start());
    }
  }
  function T(h, ...I) {
    if (this.__zooming) {
      var v = x(this, I).event(h), S = h.changedTouches, N = S.length, V, U, A, F;
      for (bt(h), V = 0; V < N; ++V)
        U = S[V], A = Ge(U, this), v.touch0 && v.touch0[2] === U.identifier ? v.touch0[0] = A : v.touch1 && v.touch1[2] === U.identifier && (v.touch1[0] = A);
      if (U = v.that.__zoom, v.touch1) {
        var K = v.touch0[0], X = v.touch0[1], se = v.touch1[0], ne = v.touch1[1], le = (le = se[0] - K[0]) * le + (le = se[1] - K[1]) * le, ge = (ge = ne[0] - X[0]) * ge + (ge = ne[1] - X[1]) * ge;
        U = P(U, Math.sqrt(le / ge)), A = [(K[0] + se[0]) / 2, (K[1] + se[1]) / 2], F = [(X[0] + ne[0]) / 2, (X[1] + ne[1]) / 2];
      } else if (v.touch0) A = v.touch0[0], F = v.touch0[1];
      else return;
      v.zoom("touch", i(M(U, A, F), v.extent, r));
    }
  }
  function O(h, ...I) {
    if (this.__zooming) {
      var v = x(this, I).event(h), S = h.changedTouches, N = S.length, V, U;
      for (Si(h), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), V = 0; V < N; ++V)
        U = S[V], v.touch0 && v.touch0[2] === U.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === U.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (U = Ge(U, this), Math.hypot(d[0] - U[0], d[1] - U[1]) < g)) {
        var A = Se(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return k.wheelDelta = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : jt(+h), k) : s;
  }, k.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : jt(!!h), k) : e;
  }, k.touchable = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : jt(!!h), k) : n;
  }, k.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : jt([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), k) : t;
  }, k.scaleExtent = function(h) {
    return arguments.length ? (o[0] = +h[0], o[1] = +h[1], k) : [o[0], o[1]];
  }, k.translateExtent = function(h) {
    return arguments.length ? (r[0][0] = +h[0][0], r[1][0] = +h[1][0], r[0][1] = +h[0][1], r[1][1] = +h[1][1], k) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, k.constrain = function(h) {
    return arguments.length ? (i = h, k) : i;
  }, k.duration = function(h) {
    return arguments.length ? (l = +h, k) : l;
  }, k.interpolate = function(h) {
    return arguments.length ? (u = h, k) : u;
  }, k.on = function() {
    var h = p.on.apply(p, arguments);
    return h === p ? k : h;
  }, k.clickDistance = function(h) {
    return arguments.length ? (_ = (h = +h) * h, k) : Math.sqrt(_);
  }, k.tapDistance = function(h) {
    return arguments.length ? (g = +h, k) : g;
  }, k;
}
var fl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, pe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? gl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && fl(t, i, n), n;
};
function Il(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, r = s.x - i.x, l = s.y - i.y, u = n * l - o * r;
  if (Math.abs(u) < 1e-9) return null;
  const p = ((i.x - e.x) * l - (i.y - e.y) * r) / u, a = ((i.x - e.x) * o - (i.y - e.y) * n) / u;
  return p <= 0.02 || p >= 0.98 || a <= 0.02 || a >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * o, t: p };
}
function yl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), l = t.x + r * s, u = t.y + r * n;
  return { dist: Math.hypot(e.x - l, e.y - u), t: r };
}
function vl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], r = e[n + 1], l = Math.hypot(r.x - o.x, r.y - o.y) || 1, u = (r.x - o.x) / l, p = (r.y - o.y) / l, a = t.map(([m, f]) => Il(o, r, m, f)).filter((m) => m !== null).filter((m) => m.t * l > i + 2 && (1 - m.t) * l > i + 2).sort((m, f) => m.t - f.t);
    let d = -1 / 0;
    for (const m of a)
      m.t * l - i <= d + 2 || (s += ` L ${m.x - u * i} ${m.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${m.x + u * i} ${m.y + p * i}`, d = m.t * l + i);
    s += ` L ${r.x} ${r.y}`;
  }
  return s;
}
const rt = {
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
  clock: G`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
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
let de = class extends Oe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = At, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = hl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Se(e).call(this._zoomBehavior);
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
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, r = this.fitInsets.top ?? 0, l = this.fitInsets.bottom ?? 0, u = Math.max(80, s.width - n - o), p = Math.max(80, s.height - r - l), a = Math.min(...t.map((g) => g.x - g.w / 2)) - e, d = Math.max(...t.map((g) => g.x + g.w / 2)) + e, m = Math.min(...t.map((g) => g.y - g.h / 2)) - e, f = Math.max(...t.map((g) => g.y + g.h / 2)) + e, b = Math.max(0.15, Math.min(u / (d - a), p / (f - m), 1.25)), _ = At.translate(
      n + u / 2 - b * (a + d) / 2,
      r + p / 2 - b * (m + f) / 2
    ).scale(b);
    Se(i).call(this._zoomBehavior.transform, _);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Se(t), e);
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
      const r = this.scene.nodes.find((u) => u.id === o);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const l = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (l)
        return { x: e.x + (l.x - r.x), y: e.y + (l.y - r.y) };
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
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, r = n.x + s.w / 2 - 10 - e.w / 2, l = n.y - s.h / 2 + 34 + e.h / 2, u = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), i = Math.min(Math.max(i, l), u);
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
      (g) => o.has(g.id) && !(g.parentId && o.has(g.parentId))
    ) : null, l = r ? new Map(r.map((g) => [g.id, this.nodePos(g)])) : null, u = (g) => (g.shiftKey || g.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, p = r ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, a = p !== null, d = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const g = [], k = p === "menu" ? this.scene.nodes.filter((P) => P.kind === "ui-app") : this.scene.nodes.filter((P) => P.id === t.parentId);
      for (const P of k) {
        const M = this.scene.nodes.filter((z) => z.parentId === P.id && d.includes(z.kind ?? "") && z.id !== t.id).sort((z, D) => z.y - D.y), w = P.x - P.w / 2 + 10, C = P.x + P.w / 2 - 10;
        for (const z of M) g.push({ x1: w, x2: C, y: z.y - z.h / 2 - 3, appId: P.id, beforeId: z.id });
        const x = M[M.length - 1];
        g.push({
          x1: w,
          x2: C,
          y: x ? x.y + x.h / 2 + 3 : P.y - P.h / 2 + 34 + 8,
          appId: P.id,
          beforeId: null
        });
      }
      return g;
    }, f = (g) => {
      const k = this.nodeIdAt(g), P = k && k !== t.id ? this.scene.nodes.find((M) => M.id === k) : void 0;
      return P ? P.kind === "external-system" ? P.id : P.parentId ?? null : null;
    }, b = (g) => {
      if ((g.buttons & 1) === 0) {
        _(g);
        return;
      }
      const k = this.toScene(g), P = k.x - i.x, M = k.y - i.y;
      if (!(!n && Math.hypot(P, M) < 3 / this._t.k))
        if (n = !0, r && l) {
          const w = /* @__PURE__ */ new Map();
          for (const C of r) {
            const x = l.get(C.id), z = this.clampToParent(C, x.x + P, x.y + M);
            w.set(C.id, { x: z.x, y: z.y });
          }
          this._dragGroup = w;
        } else if (a) {
          this._dragPos = { id: t.id, x: s.x + P, y: s.y + M }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const w = this.scene.nodes.filter(
            (x) => d.includes(x.kind ?? "") && x.id !== t.id && Math.abs(k.x - x.x) <= x.w / 2 + 8
          ), C = p === "menu" ? w.find((x) => Math.abs(k.y - x.y) < x.h * 0.28) : void 0;
          if (C)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: C.id }, this._hoverNodeId = C.id;
          else {
            let x = -1, z = 14;
            this._menuSlots.slots.forEach((D, R) => {
              if (k.x < D.x1 - 24 || k.x > D.x2 + 24) return;
              const y = Math.abs(k.y - D.y);
              y < z && (z = y, x = R);
            }), this._menuSlots = { ...this._menuSlots, active: x >= 0 ? x : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else u(g) ? (this._dragPos = { id: t.id, x: s.x + P, y: s.y + M }, this._hoverNodeId = f(g)) : (this._dragPos = this.clampToParent(t, s.x + P, s.y + M), this._hoverNodeId = null);
    }, _ = (g) => {
      if (window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", _), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([k, P]) => ({ id: k, x: P.x, y: P.y }))
        });
      else if (n && this._dragPos && a) {
        const k = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const P = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (k != null && k.nestRowId)
          this.emit(P, { id: t.id, nestRowId: k.nestRowId });
        else if (k && k.active !== null) {
          const M = k.slots[k.active];
          this.emit(P, { id: t.id, appId: M.appId, beforeId: M.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (u(g)) {
          const k = f(g);
          if (g.ctrlKey && t.kind === "api") {
            k && k !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: k,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (k !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: k,
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
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", _);
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
    const n = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, l = this.scene.nodes.filter((_) => _.parentId === t.id), u = Math.min(...l.map((_) => _.x - _.w / 2)), p = Math.max(...l.map((_) => _.x + _.w / 2)), a = Math.min(...l.map((_) => _.y - _.h / 2)), d = Math.max(...l.map((_) => _.y + _.h / 2)), m = Bs(
      l.map((_) => ({ dx: _.x - r.x, dy: _.y - r.y, w: _.w, h: _.h })),
      { w: n, h: o }
    ), f = (_) => {
      if ((_.buttons & 1) === 0) {
        b();
        return;
      }
      const g = this.toScene(_);
      if (_.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(g.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(g.y - r.y))
        };
        return;
      }
      const k = r.x - i * r.w / 2, P = r.y - s * r.h / 2, M = i > 0 ? Math.max(g.x, k + n, l.length ? p + 10 : -1 / 0) : Math.min(g.x, k - n, l.length ? u - 10 : 1 / 0), w = s > 0 ? Math.max(g.y, P + o, l.length ? d + 10 : -1 / 0) : Math.min(g.y, P - o, l.length ? a - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (k + M) / 2,
        y: (P + w) / 2,
        w: Math.abs(M - k),
        h: Math.abs(w - P)
      };
    }, b = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", b), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", b);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const s = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: s.x, y: s.y };
    const n = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const l = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: l.x, y: l.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, o = (r) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o);
      const l = this.nodeIdAt(r);
      l && l !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: l,
        x: r.clientX,
        y: r.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), o = t - s, r = i - n, l = e.w / 2, u = e.h / 2;
    if (o === 0 && r === 0) return { x: s, y: n };
    const p = 1 / Math.max(Math.abs(o) / l, Math.abs(r) / u);
    return { x: s + o * p, y: n + r * p };
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
    const t = this.scene.nodes.find((a) => a.id === e.sourceId), i = this.scene.nodes.find((a) => a.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), r = s[0] ?? o, l = s[s.length - 1] ?? n;
    let u = this.borderPoint(t, r.x, r.y), p = this.borderPoint(i, l.x, l.y);
    if (!s.length) {
      const a = this.edgeOffset(e);
      if (a !== 0) {
        const d = Math.hypot(p.x - u.x, p.y - u.y) || 1, m = -(p.y - u.y) / d * a, f = (p.x - u.x) / d * a;
        u = { x: u.x + m, y: u.y + f }, p = { x: p.x + m, y: p.y + f };
      }
    }
    return [u, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (r) => {
      if (!this._wpDrag) return;
      s = !0;
      const l = this.toScene(r), u = [...this._wpDrag.points];
      u[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: u };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = yl(t, e[s], e[s + 1]);
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
    const r = (u) => {
      if ((u.buttons & 1) === 0) {
        l();
        return;
      }
      const p = this.toScene(u);
      if (o) {
        if (this._wpDrag) {
          const a = [...this._wpDrag.points];
          a[n] = p, this._wpDrag = { ...this._wpDrag, points: a };
        }
      } else {
        if (Math.hypot(p.x - s.x, p.y - s.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const a = [...this.edgePoints[t.id] ?? []];
        a.splice(n, 0, p), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: a, index: n };
      }
    }, l = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", l), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", l);
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), l = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, u = t.slice(1, -1);
    return G`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${vl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? G`<text x=${l.x} y=${l.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${s}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(p) => {
      p.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(p) => {
      p.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: p.clientX,
        y: p.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${n ? u.map((p, a) => {
      var m;
      const d = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === a;
      return G`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${d ? 6 : 5}
                        fill=${d ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: a }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], a));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, a);
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
    var m, f, b, _;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, l = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, u = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, p = l / 2, a = u / 2, d = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return G`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (b = this._dragGroup) != null && b.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? G`<rect x=${-p - 4} y=${-a - 4} width=${l + 8} height=${u + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-a} width=${l} height=${u} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? G`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? G`<text x=${-p} y=${-a - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? G`<g transform="translate(${p - 13}, ${-a + 13})"
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
        ${e.symbol && rt[e.symbol] && !r ? G`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-a + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${rt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && rt[e.symbol] ? G`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${rt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? G`
              <foreignObject x=${-p + 6} y=${o ? -a + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : r ? G`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${d}</text>` : o ? G`<text x=${-p + 12} y=${-a + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : G`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? G`<line x1=${-p + 8} y1=${-a + 28} x2=${p - 8} y2=${-a + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (r ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, a],
      [0, -a]
    ].map(
      ([g, k]) => G`
                <circle data-handle cx=${g} cy=${k} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(P) => this.onHandlePointerDown(P, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((_ = e.extraHandles) != null && _.length) ? e.extraHandles.map(
      (g, k) => G`
                <g transform="translate(${-p + 24 + k * 20}, ${-a})">
                  <circle data-handle r="7" fill=${g.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(P) => this.onHandlePointerDown(P, e, g.kind)}>
                    <title>${g.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, k]) => G`
                <rect data-resize x=${g * p - 6.5} y=${k * a - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * k > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(P) => this.onResizePointerDown(P, e, g, k)}>
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
      const l = this.toScene(r);
      !i && Math.hypot(l.x - t.x, l.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: l });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: r, b: l } = this._rubber, u = Math.min(r.x, l.x), p = Math.max(r.x, l.x), a = Math.min(r.y, l.y), d = Math.max(r.y, l.y), m = this.scene.nodes.filter((f) => {
          const b = this.nodePos(f);
          return b.x >= u && b.x <= p && b.y >= a && b.y <= d;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: m });
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
    const s = this.getBoundingClientRect(), n = this._t.k, o = At.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Se(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, l = n.width / this._t.k, u = n.height / this._t.k;
    return E`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(p) => {
      p.stopPropagation();
      try {
        p.currentTarget.setPointerCapture(p.pointerId);
      } catch {
      }
      this.onMinimapPointer(p, e, s);
    }}
        @pointermove=${(p) => {
      var a, d;
      (d = (a = p.currentTarget).hasPointerCapture) != null && d.call(a, p.pointerId) && this.onMinimapPointer(p, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const a = this.nodePos(p);
      return G`<rect
              x=${(a.x - p.w / 2 - e.minX) * s}
              y=${(a.y - p.h / 2 - e.minY) * s}
              width=${Math.max(2, p.w * s)}
              height=${Math.max(2, p.h * s)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * s}
            y=${(r - e.minY) * s}
            width=${l * s}
            height=${u * s}
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
    }), E`
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
          ${this._menuSlots ? G`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, o) => G`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? G`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
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
de.styles = mt`
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
pe([
  ee({ attribute: !1 })
], de.prototype, "scene", 2);
pe([
  ee({ attribute: !1 })
], de.prototype, "selectedId", 2);
pe([
  ee({ attribute: !1 })
], de.prototype, "selectedIds", 2);
pe([
  ee({ type: Boolean })
], de.prototype, "connectable", 2);
pe([
  ee({ attribute: !1 })
], de.prototype, "edgePoints", 2);
pe([
  q()
], de.prototype, "_t", 2);
pe([
  q()
], de.prototype, "_dragPos", 2);
pe([
  q()
], de.prototype, "_menuSlots", 2);
pe([
  q()
], de.prototype, "_dragGroup", 2);
pe([
  q()
], de.prototype, "_pendingLink", 2);
pe([
  q()
], de.prototype, "_hoverNodeId", 2);
pe([
  q()
], de.prototype, "_editingId", 2);
pe([
  q()
], de.prototype, "_spaceDown", 2);
pe([
  q()
], de.prototype, "_wpDrag", 2);
pe([
  q()
], de.prototype, "_selectedWaypoint", 2);
pe([
  q()
], de.prototype, "_resize", 2);
pe([
  q()
], de.prototype, "_rubber", 2);
pe([
  ee({ attribute: !1 })
], de.prototype, "fitInsets", 2);
de = pe([
  ht("modux-canvas")
], de);
const W = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function ve(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function re(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const nt = (e) => e.trim().toLowerCase();
function wl(e, t) {
  var R, y, $, T, O;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((h) => [h.id, h.name])), n = e.modules.flatMap(
    (h) => (h.useCases ?? []).map((I) => ({ ...I, moduleId: h.id }))
  ), o = new Set(n.map((h) => h.id)), r = e.aggregates ?? [], l = new Set(
    e.modules.flatMap((h) => (h.domainServices ?? []).map((I) => I.id))
  ), u = e.modules.flatMap(
    (h) => (h.domainEvents ?? []).map((I) => ({ ...I, moduleId: h.id, application: !1 }))
  ), p = e.modules.flatMap(
    (h) => (h.applicationEvents ?? []).map((I) => ({ ...I, moduleId: h.id, application: !0 }))
  ), a = e.modules.flatMap(
    (h) => (h.readModels ?? []).map((I) => ({ ...I, moduleId: h.id }))
  );
  for (const h of n)
    ve(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: W.command.w,
      h: W.command.h,
      kind: "use-case",
      symbol: h.policy ? "flow" : "gear",
      fill: h.policy ? W.policy.fill : W.command.fill,
      stroke: h.policy ? W.policy.stroke : W.command.stroke,
      badge: h.policy ? "POLICY" : "COMANDO",
      tooltip: h.policy ? `${h.name} — policy de ${s.get(h.moduleId) ?? h.moduleId} (reacción, no caso de negocio)` : `${h.name} — caso de uso de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  for (const h of r)
    ve(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: W.aggregate.w,
      h: W.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: W.aggregate.fill,
      stroke: W.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${h.name} — agregado de ${s.get(h.moduleId) ?? h.moduleId}`
    });
  const d = /* @__PURE__ */ new Map();
  for (const h of [...u, ...p])
    ve(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: W.event.w,
      h: W.event.h,
      kind: h.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: W.event.fill,
      stroke: W.event.stroke,
      badge: h.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${h.name} — evento de ${s.get(h.moduleId) ?? h.moduleId}`
    }), d.set(nt(h.name), h.id);
  const m = (h) => {
    if (!h || !h.trim()) return null;
    const I = d.get(nt(h));
    if (I) return I;
    const v = `evname:${nt(h)}`;
    return ve(i, {
      id: v,
      label: h,
      x: 0,
      y: 0,
      w: W.event.w,
      h: W.event.h,
      kind: "event-name",
      symbol: "event",
      fill: W.event.fill,
      stroke: W.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${h} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, f = (h) => {
    const I = a.find((S) => S.id === h.id) ?? a.find((S) => h.name && nt(S.name) === nt(h.name)), v = (I == null ? void 0 : I.id) ?? (h.id || (h.name ? `rm:${nt(h.name)}` : null));
    return v ? (ve(i, {
      id: v,
      label: (I == null ? void 0 : I.name) ?? h.name ?? v,
      x: 0,
      y: 0,
      w: W.readModel.w,
      h: W.readModel.h,
      kind: I ? "read-model" : "derived-read-model",
      fill: W.readModel.fill,
      stroke: W.readModel.stroke,
      dashed: !I,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const h of e.actorUses ?? []) {
    if (!o.has(h.targetId)) continue;
    const I = (e.actors ?? []).find((v) => v.id === h.actorId);
    I && (ve(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: W.actor.w,
      h: W.actor.h,
      kind: "actor",
      symbol: "person",
      fill: W.actor.fill,
      stroke: W.actor.stroke,
      badge: "ACTOR"
    }), re(i, {
      id: `es-actor:${I.id}->${h.targetId}`,
      sourceId: I.id,
      targetId: h.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const h of e.aiAgents ?? []) {
    const I = (e.agentUses ?? []).filter((U) => U.agentId === h.id), v = (e.agentExternalUses ?? []).filter((U) => U.agentId === h.id), S = (e.agentRags ?? []).filter((U) => U.agentId === h.id), N = (e.agentMcpUses ?? []).filter((U) => U.agentId === h.id), V = (e.agentGatewayUses ?? []).some((U) => U.agentId === h.id) || (e.agentApiOpUses ?? []).some((U) => U.agentId === h.id) || (e.agentQueryUses ?? []).some((U) => U.agentId === h.id) || (e.agentDelegations ?? []).some((U) => U.agentId === h.id) || (e.agentTriggers ?? []).some((U) => U.agentId === h.id);
    if (!(!I.length && !v.length && !S.length && !N.length && !V)) {
      ve(i, {
        id: h.id,
        label: h.name,
        x: 0,
        y: 0,
        w: W.actor.w,
        h: W.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${h.name} — agente de IA (consume por MCP)`
      });
      for (const U of I)
        o.has(U.useCaseId) && re(i, {
          id: `es-agent:${h.id}->${U.useCaseId}`,
          sourceId: h.id,
          targetId: U.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const U of v) {
        const A = e.externalSystems.find(
          (K) => (K.useCases ?? []).some((X) => X.id === U.externalUseCaseId)
        );
        if (!A) continue;
        const F = (R = (A.useCases ?? []).find((K) => K.id === U.externalUseCaseId)) == null ? void 0 : R.name;
        ve(i, {
          id: A.id,
          label: A.name,
          x: 0,
          y: 0,
          w: W.external.w,
          h: W.external.h,
          kind: "external-system",
          symbol: "component",
          fill: W.external.fill,
          stroke: W.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), re(i, {
          id: `es-agentx:${h.id}->${U.externalUseCaseId}`,
          sourceId: h.id,
          targetId: A.id,
          kind: "es-agent-external",
          label: F,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: F ? `Llama a ${F} del sistema externo` : void 0
        });
      }
      for (const U of N) {
        const A = e.externalSystems.find(
          (K) => (K.mcpServers ?? []).some((X) => X.id === U.mcpServerId)
        );
        if (!A) continue;
        const F = (y = (A.mcpServers ?? []).find((K) => K.id === U.mcpServerId)) == null ? void 0 : y.name;
        ve(i, {
          id: A.id,
          label: A.name,
          x: 0,
          y: 0,
          w: W.external.w,
          h: W.external.h,
          kind: "external-system",
          symbol: "component",
          fill: W.external.fill,
          stroke: W.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), re(i, {
          id: `es-agentmcp:${h.id}->${U.mcpServerId}`,
          sourceId: h.id,
          targetId: A.id,
          kind: "es-agent-mcp",
          label: F,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: F ? `Consume las herramientas del servidor MCP ${F}` : void 0
        });
      }
      for (const U of S) {
        const A = (e.rags ?? []).find((F) => F.id === U.ragId);
        if (A) {
          ve(i, {
            id: A.id,
            label: A.name,
            x: 0,
            y: 0,
            w: W.readModel.w,
            h: W.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${A.name} — base de conocimiento (retrieval)`
          }), re(i, {
            id: `es-agrag:${h.id}->${A.id}`,
            sourceId: h.id,
            targetId: A.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const F of A.sourceReadModelIds ?? []) {
            const K = f({ id: F });
            K && re(i, {
              id: `es-ragsrc:${A.id}->${K}`,
              sourceId: K,
              targetId: A.id,
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
  const b = (h) => {
    const I = e.externalSystems.find((v) => v.id === h);
    return I ? (ve(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: W.external.w,
      h: W.external.h,
      kind: "external-system",
      symbol: "component",
      fill: W.external.fill,
      stroke: W.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), I.id) : null;
  };
  for (const h of e.externalCalls ?? []) {
    const I = b(h.externalSystemId);
    !I || !o.has(h.useCaseId) || re(i, {
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
      (N) => (N.useCases ?? []).some((V) => V.id === h.targetId)
    ), v = I ? b(I.id) : null;
    if (!v) continue;
    const S = ($ = ((I == null ? void 0 : I.useCases) ?? []).find((N) => N.id === h.targetId)) == null ? void 0 : $.name;
    re(i, {
      id: `es-extout:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: S,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: S ? `Llama a ${S} del sistema externo` : void 0
    });
  }
  for (const h of e.aggregateCalls ?? [])
    !o.has(h.sourceId) || !i.nodes.has(h.targetId) || re(i, {
      id: `es-write:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: h.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const _ = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const h of _)
    !i.nodes.has(h.domainEventId) || !(i.nodes.has(h.sourceId) && (o.has(h.sourceId) || r.some((v) => v.id === h.sourceId) || l.has(h.sourceId))) || re(i, {
      id: `es-emit:${h.sourceId}->${h.domainEventId}`,
      sourceId: h.sourceId,
      targetId: h.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const g = (h, I, v, S, N, V) => (ve(i, {
    id: h,
    label: I,
    x: 0,
    y: 0,
    w: W.policy.w,
    h: W.policy.h,
    kind: v,
    symbol: "flow",
    fill: W.policy.fill,
    stroke: W.policy.stroke,
    badge: S,
    tooltip: N
  }), h), k = (h, I) => {
    const v = m(h);
    v && re(i, {
      id: `es-trigger:${v}->${I}`,
      sourceId: v,
      targetId: I,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, P = (h, I) => {
    !I || !o.has(I) || re(i, {
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
    k(h.eventName, I);
    for (const v of h.actions ?? []) {
      if (v.type === "CallUseCase" && P(I, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const S = `saga:${v.sagaId}`;
        g(S, v.sagaId, "saga", "SAGA"), re(i, {
          id: `es-saga:${I}->${S}`,
          sourceId: I,
          targetId: S,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const S = (e.projections ?? []).find((N) => N.id === v.projectionId);
        S && re(i, {
          id: `es-feeds:${I}->${S.id}`,
          sourceId: I,
          targetId: S.id,
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
    for (const N of h.handledEventIds) {
      const V = i.nodes.has(N) ? N : null;
      V && re(i, {
        id: `es-trigger:${V}->${I}`,
        sourceId: V,
        targetId: I,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    h.sourceAggregateId && i.nodes.has(h.sourceAggregateId) && re(i, {
      id: `es-state:${h.id}`,
      sourceId: h.sourceAggregateId,
      targetId: I,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = h.sourceExternalUseCaseId ?? h.sourceExternalTableId;
    if (v) {
      const N = e.externalSystems.find(
        (U) => (U.useCases ?? []).some((A) => A.id === v) || (U.tables ?? []).some((A) => A.id === v)
      ), V = N ? b(N.id) : null;
      if (V) {
        const U = ((T = (N.useCases ?? []).find((A) => A.id === v)) == null ? void 0 : T.name) ?? ((O = (N.tables ?? []).find((A) => A.id === v)) == null ? void 0 : O.name);
        re(i, {
          id: `es-poll:${h.id}`,
          sourceId: V,
          targetId: I,
          kind: "es-projects-poll",
          label: U,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: U ? `polling de ${U}` : "polling"
        });
      }
    }
    const S = f({ id: h.readModelId, name: h.readModelName });
    S && re(i, {
      id: `es-projects:${I}->${S}`,
      sourceId: I,
      targetId: S,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const h of e.flows) {
    if (h.archetype === "MATERIALIZES") {
      const v = m(h.triggerEvent), S = f({ name: h.readModelName ?? `${h.triggerEvent}View` });
      v && S && re(i, {
        id: `es-mat:${h.id}`,
        sourceId: v,
        targetId: S,
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
    if (k(h.triggerEvent, I), P(I, h.targetUseCaseId), !h.targetUseCaseId) {
      const v = b(h.targetId), S = v ?? `tgt:${h.targetId}`;
      !v && s.has(h.targetId) && ve(i, {
        id: S,
        label: s.get(h.targetId) ?? h.targetId,
        x: 0,
        y: 0,
        w: W.module.w,
        h: W.module.h,
        kind: "module",
        symbol: "component",
        fill: W.module.fill,
        stroke: W.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(S) && re(i, {
        id: `es-deliver:${h.id}`,
        sourceId: I,
        targetId: S,
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
    k(h.triggerEvent, I);
    for (const S of h.steps) P(I, S.useCaseId);
    const v = m(h.onCompletionEventName);
    v && re(i, {
      id: `es-done:${h.id}`,
      sourceId: I,
      targetId: v,
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
    k(h.triggerEvent, I);
    for (const S of h.steps ?? []) {
      P(I, S.targetUseCaseId);
      for (const N of [S.emittedEventName, S.completionEventName]) {
        const V = m(N);
        V && re(i, {
          id: `es-wfemit:${h.id}:${V}`,
          sourceId: I,
          targetId: V,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = m(h.onCompletionEventName);
    v && re(i, {
      id: `es-done:${h.id}`,
      sourceId: I,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const M = [...i.nodes.values()], w = /* @__PURE__ */ new Map();
  for (const h of i.edges)
    w.has(h.targetId) || w.set(h.targetId, []), w.get(h.targetId).push(h.sourceId);
  const C = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set(), z = (h) => {
    const I = C.get(h);
    if (I !== void 0) return I;
    if (x.has(h)) return 0;
    x.add(h);
    const v = w.get(h) ?? [], S = v.length ? 1 + Math.max(...v.map(z)) : 0;
    return x.delete(h), C.set(h, S), S;
  }, D = /* @__PURE__ */ new Map();
  for (const h of M) {
    const I = t[h.id];
    if (I) {
      h.x = I.x, h.y = I.y;
      continue;
    }
    const v = z(h.id), S = D.get(v) ?? 0;
    D.set(v, S + 1), h.x = 140 + v * 260, h.y = 110 + S * 110;
  }
  return { nodes: M, edges: i.edges };
}
const xl = 190, bl = 56, Nn = 180, _l = 56, kl = 150, $l = 44, Rn = 250, Dn = 100;
function El(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((l) => t.get(l)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), r;
  };
  return s(e);
}
function Sl(e, t) {
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
function Cl(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (l) => {
    var u;
    return (u = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === l)) == null ? void 0 : u.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((l) => {
    var g;
    const u = new Map(l.steps.map((k) => [k.id, k])), p = new Map(l.steps.map((k) => [k.id, El(k, u)])), a = /* @__PURE__ */ new Map();
    for (const k of l.steps) {
      const P = p.get(k.id) ?? 0;
      a.set(P, (a.get(P) ?? 0) + 1);
    }
    const d = Math.max(1, ...a.values()), m = Sl(e, l);
    if (m && !n.has(m.id)) {
      n.add(m.id);
      const k = t[m.id] ?? { x: 140, y: r };
      i.push({
        id: m.id,
        label: m.label,
        x: k.x,
        y: k.y,
        w: kl,
        h: $l,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[l.id] ?? { x: 420, y: r };
    i.push({
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: xl,
      h: bl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}${l.onCompletionEventName ? ` · emite ${l.onCompletionEventName} al completar` : ""}`
    }), m && s.push({
      id: `wft:${l.id}`,
      sourceId: m.id,
      targetId: l.id,
      kind: "workflow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    });
    const b = /* @__PURE__ */ new Map();
    let _ = 0;
    for (const k of l.steps) {
      const P = p.get(k.id) ?? 0;
      _ = Math.max(_, P);
      const M = b.get(P) ?? 0;
      b.set(P, M + 1);
      const w = t[k.id] ?? {
        x: f.x + (P + 1) * Rn,
        y: r + (M - (a.get(P) - 1) / 2) * Dn
      }, C = o(k.targetUseCaseId);
      i.push({
        id: k.id,
        label: k.name,
        x: w.x,
        y: w.y,
        w: Nn,
        h: _l,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: C ? `→ ${C}` : "∅ sin use case",
        tooltip: `${k.name}${k.emittedEventName ? ` · emite ${k.emittedEventName}` : ""}${C ? ` · lanza ${C}` : ""}${k.completionEventName ? ` · espera ${k.completionEventName}` : ""}`
      });
      const x = (k.dependsOnStepIds ?? []).filter((z) => u.has(z));
      x.length === 0 && s.push({
        id: `wfs:${l.id}:${k.id}`,
        sourceId: l.id,
        targetId: k.id,
        kind: "workflow-start",
        label: k.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const z of x)
        s.push({
          id: `wfdep:${z}->${k.id}`,
          sourceId: z,
          targetId: k.id,
          kind: "workflow-dependency",
          label: k.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${k.name} espera a ${((g = u.get(z)) == null ? void 0 : g.name) ?? z}`
        });
    }
    if (l.onCompletionEventName) {
      const k = `done:${l.id}`, P = t[k] ?? { x: f.x + (_ + 2) * Rn, y: r };
      i.push({
        id: k,
        label: l.onCompletionEventName,
        x: P.x,
        y: P.y,
        w: Nn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const M = new Set(l.steps.flatMap((C) => C.dependsOnStepIds ?? [])), w = l.steps.filter((C) => !M.has(C.id));
      for (const C of w.length ? w : [])
        s.push({
          id: `wfd:${l.id}:${C.id}`,
          sourceId: C.id,
          targetId: k,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      l.steps.length || s.push({
        id: `wfd:${l.id}`,
        sourceId: l.id,
        targetId: k,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, d + 1) * Dn + 60;
  }), { nodes: i, edges: s };
}
const Ln = 250, qe = 30, Kt = 6, Al = 16, zn = 190, Ml = 60, Pl = 170, Xt = 44;
function Ol(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function me(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Tl(e) {
  const t = [], i = (s, n, o) => {
    for (const r of s ?? []) {
      const l = [...n, r.label];
      t.push({ entry: r, path: l, depth: o }), i(r.children ?? [], l, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Nl(e, t) {
  var g, k, P, M;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], r = (w) => {
    var C;
    return ((C = e.modules.flatMap((x) => x.useCases ?? []).find((x) => x.id === w)) == null ? void 0 : C.name) ?? w;
  }, l = (w) => {
    var C;
    return ((C = e.modules.flatMap((x) => x.queryServices ?? []).find((x) => x.id === w)) == null ? void 0 : C.name) ?? w;
  }, u = /* @__PURE__ */ new Map();
  let p = 160;
  for (const w of n) {
    const C = Tl(w), x = Math.max(
      90,
      54 + C.length * (qe + Kt)
    ), z = t[w.id] ?? { x: 190, y: p + x / 2 };
    p = z.y + x / 2 + 70;
    const D = w.type ?? "APP";
    i.push({
      id: w.id,
      label: w.title || w.name,
      x: z.x,
      y: z.y,
      w: Ln,
      h: x,
      kind: "ui-app",
      symbol: D === "ORCHESTRATOR" || D === "VIEW_EDITOR" ? "process" : "component",
      fill: D === "ORCHESTRATOR" || D === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: D === "ORCHESTRATOR" || D === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: D === "ORCHESTRATOR" ? "ORQUESTADOR" : D === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : D === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: D === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : D === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : D === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: D === "ORCHESTRATOR" ? `${w.name} — orquesta y mantiene estado; solo enseña páginas hijas` : D === "MASTER_DETAIL" ? `${w.name} — cabecera + pestañas (ambas son páginas)` : `App: ${w.name}`
    }), w.modelId && (u.set(w.modelId, {
      label: ((g = (e.models ?? []).find(($) => $.id === w.modelId)) == null ? void 0 : g.name) ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${w.id}->${w.modelId}`,
      sourceId: w.id,
      targetId: w.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [$, T, O, h, I] of [
      [w.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [w.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      $ && s.push({
        id: `${T === "app-view" ? "appview" : "appedit"}:${w.id}->${$}`,
        sourceId: w.id,
        targetId: $,
        kind: T,
        color: h,
        label: O,
        arrow: !0,
        tooltip: I
      });
    const R = w.homePageId ?? w.homeAppId;
    R && s.push({
      id: `apphome:${w.id}->${R}`,
      sourceId: w.id,
      targetId: R,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: w.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), D === "MASTER_DETAIL" && w.headerPageId && s.push({
      id: `appheader:${w.id}->${w.headerPageId}`,
      sourceId: w.id,
      targetId: w.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let y = z.y - x / 2 + 34 + 10 + qe / 2;
    for (const { entry: $, path: T, depth: O } of C) {
      const h = Ol(w.id, $, T), I = O * Al;
      if (i.push({
        id: h,
        label: $.label,
        x: z.x + I / 2,
        y,
        w: Ln - 20 - I,
        h: qe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (k = $.children) != null && k.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (P = $.children) != null && P.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (M = $.children) != null && M.length ? "Agrupador (con submenú): no puede abrir nada" : $.pageId ? `Abre ${$.pageId}` : $.uiAdapterId ? `Abre la app ${$.uiAdapterId}` : $.useCaseId ? `Lanza ${$.useCaseId}` : $.aggregateId ? `CRUD inferido sobre ${$.aggregateId}` : $.queryOperationId ? `Listado con filtros de ${$.queryOperationId}` : "Entrada de menú sin destino"
      }), y += qe + Kt, $.uiAdapterId && n.some((v) => v.id === $.uiAdapterId) && s.push({
        id: `menuapp:${h}->${$.uiAdapterId}`,
        sourceId: h,
        targetId: $.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), $.useCaseId && e.modules.some((S) => (S.useCases ?? []).some((N) => N.id === $.useCaseId)) && (u.set($.useCaseId, {
        label: r($.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${h}->${$.useCaseId}`,
        sourceId: h,
        targetId: $.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), $.aggregateId && (e.aggregates ?? []).some((v) => v.id === $.aggregateId)) {
        const v = (e.aggregates ?? []).find((S) => S.id === $.aggregateId);
        u.set(v.id, { label: v.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${h}->${v.id}`,
          sourceId: h,
          targetId: v.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if ($.queryOperationId) {
        const v = e.modules.flatMap((N) => N.queryServices ?? []).find((N) => N.id === $.queryServiceId), S = ((v == null ? void 0 : v.operations) ?? []).find((N) => N.id === $.queryOperationId);
        v && S && (u.set(S.id, {
          label: `${S.name} (${v.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${h}->${S.id}`,
          sourceId: h,
          targetId: S.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      $.pageId && o.some((v) => v.id === $.pageId) && s.push({
        id: `menupage:${h}->${$.pageId}`,
        sourceId: h,
        targetId: $.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let a = 160;
  const d = (w) => {
    var C;
    return ((C = o.find((x) => x.id === w)) == null ? void 0 : C.name) ?? w;
  };
  for (const w of o) {
    const C = t[w.id] ?? { x: 640, y: a }, x = w.type === "WIZARD" ? w.wizardSteps ?? [] : [], z = x.length ? 54 + x.length * (qe + Kt) : Ml;
    a = C.y + z + 90, i.push({
      id: w.id,
      label: w.name,
      x: C.x,
      y: C.y,
      w: zn,
      h: z,
      kind: "page",
      symbol: "interface",
      badge: w.type ?? "PAGE",
      container: x.length > 0,
      extraHandles: w.type === "CRUD" ? [
        { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
        { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
      ] : void 0,
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: w.route ? `${w.type ?? "PAGE"} · ${w.route}` : w.type ?? "PAGE"
    });
    let D = C.y - z / 2 + 34 + 10 + qe / 2;
    x.forEach((R, y) => {
      const $ = R.id ?? R.pageId ?? String(y);
      i.push({
        id: `wizrow:${w.id}:${$}`,
        label: `${y + 1}. ${R.label ?? (R.pageId ? d(R.pageId) : "Paso")}${R.pageId ? "" : " ⌁"}`,
        x: C.x,
        y: D,
        w: zn - 20,
        h: qe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: R.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: w.id,
        tooltip: R.pageId ? `Paso ${y + 1}: ${d(R.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${y + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), D += qe + Kt;
    });
    for (const [R, y, $, T] of [
      [w.crudDetailPageId ?? w.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [w.crudCreatePageId ?? w.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      R && s.push({
        id: `${y === "crud-detail" ? "cruddetail" : "crudnew"}:${w.id}->${R}`,
        sourceId: w.id,
        targetId: R,
        kind: y,
        color: T,
        label: $,
        dashed: !0,
        arrow: !0,
        tooltip: y === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let R = 0; R < (w.wizardSteps ?? []).length; R++) {
      const y = (w.wizardSteps ?? [])[R];
      y.pageId && s.push({
        id: `wizstep:${w.id}->${y.pageId}`,
        sourceId: w.id,
        targetId: y.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        label: `paso ${R + 1}`,
        dashed: !0,
        arrow: !0,
        tooltip: y.label ? `paso ${R + 1}: ${y.label}` : `paso ${R + 1}`
      });
    }
    w.modelId && (u.set(w.modelId, {
      label: w.modelName ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${w.id}->${w.modelId}`,
      sourceId: w.id,
      targetId: w.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const R of w.buttons ?? [])
      R.useCaseId && (u.set(R.useCaseId, {
        label: r(R.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${w.id}->${R.useCaseId}`,
        sourceId: w.id,
        targetId: R.useCaseId,
        kind: "page-button",
        label: R.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: R.mappingId ? `Botón «${R.label}» — mapping ${R.mappingId}` : `Botón «${R.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    w.listingQueryServiceId && (u.set(w.listingQueryServiceId, {
      label: l(w.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${w.id}->${w.listingQueryServiceId}`,
      sourceId: w.id,
      targetId: w.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let m = 160;
  for (const w of e.models ?? [])
    u.has(w.id) || u.set(w.id, { label: w.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [w, C] of u) {
    const x = t[w] ?? { x: 1050, y: m };
    m = x.y + Xt + 46, i.push({
      id: w,
      label: C.label,
      x: x.x,
      y: x.y,
      w: Pl,
      h: Xt,
      kind: C.kind,
      symbol: C.symbol,
      fill: "#ffffff",
      stroke: C.stroke
    });
  }
  const f = (e.actorAppUses ?? []).filter(
    (w) => n.some((C) => C.id === w.appId) && (e.actors ?? []).some((C) => C.id === w.actorId)
  ), b = [...new Set(f.map((w) => w.actorId))];
  let _ = 160;
  for (const w of b) {
    const C = (e.actors ?? []).find((z) => z.id === w), x = t[w] ?? { x: -60, y: _ };
    _ = x.y + Xt + 46, i.push({
      id: w,
      label: C.name,
      x: x.x,
      y: x.y,
      w: 150,
      h: Xt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const w of f)
    s.push({
      id: `actorapp:${w.actorId}->${w.appId}`,
      sourceId: w.actorId,
      targetId: w.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: s };
}
async function Rl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((u) => u.e), s = new i(), o = {
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
    children: e.nodes.map((u) => ({ id: u.id, width: u.w, height: u.h })),
    edges: e.edges.map((u) => ({ id: u.id, sources: [u.sourceId], targets: [u.targetId] }))
  }, r = await s.layout(o), l = {};
  for (const u of r.children ?? [])
    l[u.id] = {
      x: (u.x ?? 0) + (u.width ?? 0) / 2,
      y: (u.y ?? 0) + (u.height ?? 0) / 2
    };
  return l;
}
var Dl = Object.defineProperty, Ll = Object.getOwnPropertyDescriptor, Me = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ll(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Dl(t, i, n), n;
};
const zl = /* @__PURE__ */ new Set([
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
let xe = class extends Oe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var o, r;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus(), (o = this.setPointerCapture) == null || o.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".h3");
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
        const r = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), l = (n = r == null ? void 0 : r.closest) == null ? void 0 : n.call(r, ".n3"), u = (l == null ? void 0 : l.dataset.nodeId) ?? null;
        this._hoverTargetId = u !== this._connect.sourceId ? u : null;
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
    const r = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), l = r.transformPoint(new DOMPoint(0, 0, 0, 1)), u = r.transformPoint(new DOMPoint(1, 0, 0, 0)), p = r.transformPoint(new DOMPoint(0, 1, 0, 0)), a = e - i.left, d = t - i.top, m = u.x - a * u.w, f = p.x - a * p.w, b = u.y - d * u.w, _ = p.y - d * p.w, g = a * l.w - l.x, k = d * l.w - l.y, P = m * _ - f * b;
    return P ? { x: (g * _ - f * k) / P, y: (m * k - g * b) / P } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const o = s.parentId ? e.get(s.parentId) : void 0, r = o ? i(o) + 1 : 0;
      return t.set(s.id, r), r;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return E`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((g) => [g.id, g])), s = Math.min(...e.map((g) => g.x - g.w / 2)) - 60, n = Math.max(...e.map((g) => g.x + g.w / 2)) + 60, o = Math.min(...e.map((g) => g.y - g.h / 2)) - 60, r = Math.max(...e.map((g) => g.y + g.h / 2)) + 60, l = (s + n) / 2, u = (o + r) / 2, p = this.getBoundingClientRect(), a = p.width ? Math.min(p.width / (n - s), p.height / (r - o), 1) * 0.9 : 0.5, d = this._k * a;
    this._kUsed = d, this._center = { x: l, y: u };
    const m = 30, f = this._liveMove, b = (g) => g.x + ((f == null ? void 0 : f.id) === g.id ? f.dx : 0), _ = (g) => g.y + ((f == null ? void 0 : f.id) === g.id ? f.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${d}, ${d}, ${d}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-l}px, ${-u}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${o}px"
            width=${n - s}
            height=${r - o}
            viewBox="${s} ${o} ${n - s} ${r - o}"
          >
            ${this.scene.edges.map((g) => {
      const k = i.get(g.sourceId), P = i.get(g.targetId);
      return !k || !P ? "" : G`<line
                x1=${b(k)} y1=${_(k)} x2=${b(P)} y2=${_(P)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((g) => {
      const k = i.get(g.sourceId), P = i.get(g.targetId);
      if (!k || !P) return "";
      const M = (t.get(k.id) ?? 0) * m + 2, w = (t.get(P.id) ?? 0) * m + 2, C = b(P) - b(k), x = _(P) - _(k), z = w - M, D = Math.hypot(C, x), R = Math.hypot(D, z), y = Math.atan2(x, C) * 180 / Math.PI, $ = Math.atan2(z, D) * 180 / Math.PI, T = g.color ?? "#64748b", O = g.dashed ? `repeating-linear-gradient(90deg, ${T} 0 6px, transparent 6px 10px)` : T;
      return E`<div
              class="edge3"
              style="
                left: ${b(k)}px; top: ${_(k)}px; width: ${R}px; height: 1.7px;
                transform: translateZ(${M}px) rotateZ(${y}deg) rotateY(${-$}deg);
                background: ${O};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((g) => {
      const k = t.get(g.id) ?? 0, P = g.container || k === 0, M = this._hoverTargetId === g.id;
      return E`
              <div
                class="n3 ${g.container ? "container3" : ""} ${this.selectedId === g.id ? "selected3" : ""} ${M ? "hover3" : ""}"
                data-node-id=${g.id}
                data-kind=${g.kind}
                title=${g.tooltip ?? g.label}
                style="
                  left: ${b(g) - g.w / 2}px; top: ${_(g) - g.h / 2}px;
                  width: ${g.w}px; height: ${g.h}px;
                  transform: translateZ(${k * m + (M ? 8 : 0)}px)${M ? " scale(1.06)" : ""};
                  background: ${g.container ? "color-mix(in srgb, " + (g.fill ?? "#ffffff") + " 82%, transparent)" : g.fill ?? "#ffffff"};
                  border-color: ${g.stroke ?? "#64748b"};
                  border-style: ${g.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${P ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${g.badge ? E`<span class="badge3" style="color: ${g.stroke ?? "#94a3b8"}">${g.badge}</span>` : ""}
                <span>${g.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const g = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!g || !zl.has(g.kind)) return "";
      const k = (t.get(g.id) ?? 0) * m + 4;
      return [
        [b(g) + g.w / 2, _(g)],
        [b(g) - g.w / 2, _(g)],
        [b(g), _(g) + g.h / 2],
        [b(g), _(g) - g.h / 2]
      ].map(
        ([M, w]) => E`<div
                class="h3"
                data-source-id=${g.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${M}px; top: ${w}px; transform: translateZ(${k}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? E`<svg class="rubber">
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
xe.styles = mt`
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
Me([
  ee({ attribute: !1 })
], xe.prototype, "scene", 2);
Me([
  ee({ attribute: !1 })
], xe.prototype, "selectedId", 2);
Me([
  ee({ attribute: !1 })
], xe.prototype, "connectable", 2);
Me([
  q()
], xe.prototype, "_rx", 2);
Me([
  q()
], xe.prototype, "_rz", 2);
Me([
  q()
], xe.prototype, "_k", 2);
Me([
  q()
], xe.prototype, "_pan", 2);
Me([
  q()
], xe.prototype, "_liveMove", 2);
Me([
  q()
], xe.prototype, "_connect", 2);
Me([
  q()
], xe.prototype, "_hoverTargetId", 2);
xe = Me([
  ht("modux-tilt")
], xe);
var Ul = Object.defineProperty, ql = Object.getOwnPropertyDescriptor, ce = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ql(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Ul(t, i, n), n;
};
const Un = [
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
let J = class extends Oe {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? E`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? E`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? E`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? E`<div class="control">••••••••</div>` : t === "email" ? E`<div class="control">nombre@dominio.com</div>` : t === "money" ? E`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? E`<div class="control">──────●──</div>` : t === "stars" ? E`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? E`<div class="control area">🖼</div>` : t === "link" ? E`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? E`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? E`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? E`<div class="control" style="justify-content:flex-end">0</div>` : E`<div class="control">Texto…</div>`;
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
      for (const r of n ?? [])
        r.id === e && (t = o), i(r.children, r);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var o;
    let i = !1;
    const s = (r) => {
      r.id === e && (i = !0);
      for (const l of r.children ?? []) s(l);
    }, n = (r) => {
      for (const l of r ?? [])
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
    return J.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const r = (e.children ?? []).filter((u) => u.kind === "tab"), l = r.find((u) => u.id === this._activeTabs[e.id]) ?? r[0];
      l && (e = l);
    }
    if (t === "into" && !J.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var o, r;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const l = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
      if (!l) return;
      let u;
      try {
        u = JSON.parse(l);
      } catch {
        return;
      }
      if (!u.componentId || !u.pageId || u.pageId === ((r = this.page) == null ? void 0 : r.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: u.pageId, componentId: u.componentId, ...p });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const n = this.slotFor(e, t);
    n.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...n });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var u, p, a;
    const t = e.children ?? [], i = (d) => d.map((m) => this.renderComponent(m)), s = E`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = E`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const d = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        n = E`<div class="row-lay">
          <div class="col-lay">${d.length ? i(d) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        n = E`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        n = E`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const d = t.filter((f) => f.kind === "tab"), m = d.find((f) => f.id === this._activeTabs[e.id]) ?? d[0];
        n = E`
          <div class="tabbar">
            ${d.map(
          (f, b) => E`<span
                class=${f === m ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(_) => {
            _.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: f.id }, this.emitEvent("component-selected", { componentId: f.id });
          }}
                @dblclick=${(_) => {
            _.stopPropagation(), this._cmp = { ...f };
          }}
                @dragstart=${(_) => {
            var g, k;
            _.stopPropagation(), this._dragCmpId = f.id, (k = _.dataTransfer) == null || k.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (g = this.page) == null ? void 0 : g.id, componentId: f.id })
            );
          }}
                @dragover=${(_) => {
            var g;
            ((g = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : g.kind) === "tab" && (_.preventDefault(), _.stopPropagation());
          }}
                @drop=${(_) => {
            var w, C;
            const g = this._dragCmpId;
            if (!g || g === f.id || ((w = this.nodeById(g)) == null ? void 0 : w.kind) !== "tab") return;
            _.preventDefault(), _.stopPropagation();
            const k = _.currentTarget.getBoundingClientRect(), M = _.clientX - k.left < k.width / 2 ? f.id : ((C = d[b + 1]) == null ? void 0 : C.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, M !== g && this.emitEvent("component-moved", {
              componentId: g,
              toParentId: e.id,
              beforeComponentId: M
            });
          }}
                >${f.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${m ? this.renderComponent(m) : s}`;
        break;
      }
      case "tab":
        n = E`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = E`<div class="col-lay">
          ${t.length ? t.map(
          (d, m) => E`
                  <div class="acc-bar"><span>${d.title ?? d.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(d) : Z}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : Z}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = E`<div class="grid3-lay">
          ${t.length ? t.map((d) => E`<div class="board-col">${this.renderComponent(d)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [d, ...m] = t;
        n = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${d ? this.renderComponent(d) : E`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : E`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        n = E`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        n = E`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        n = E`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const m = e.modelId && e.modelId === ((u = this.page) == null ? void 0 : u.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = m.length ? E`<div class="grid-lay">
              ${m.slice(0, 6).map(
          (f) => E`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`
        )}
            </div>` : E`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const d = (((a = this.page) == null ? void 0 : a.viewmodelFields) ?? []).slice(0, 4);
        n = E`<table>
            <tr>${d.length ? d.map((m) => E`<th>${m.label ?? m.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(d.length ? d : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? Z : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const d = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(d)}`;
        break;
      }
      case "text":
        n = E`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        n = E`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        n = E`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        n = E`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const o = J.LEAF_KINDS.has(e.kind), r = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), l = (d) => {
      var m, f;
      d.stopPropagation(), this._dragCmpId = e.id, (f = d.dataTransfer) == null || f.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), d.dataTransfer && (d.dataTransfer.effectAllowed = "move");
    };
    return E`<div
      class="cmp ${o ? "leafcmp" : ""} ${r ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(d) => {
      d.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(d) => {
      d.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${l}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(d) => {
      var f;
      d.preventDefault(), d.stopPropagation();
      const m = ((f = d.dataTransfer) == null ? void 0 : f.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, d) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(d) => {
      var m, f, b;
      this._foreignOver = !1, !(!this._dragCmpId && !((b = (f = (m = d.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : f.includes) != null && b.call(f, "application/x-modux-cmp"))) && (d.preventDefault(), d.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, d));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${l}
        >${J.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${n}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return E`
        ${i ? E`<table>
              <tr>${t.slice(0, 4).map((s) => E`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => E`<tr>${t.slice(0, 4).map(() => E`<td>···</td>`)}</tr>`)}
            </table>` : Z}
        ${t.length ? E`<div class="grid">
              ${t.map(
      (s) => E`
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
            </div>` : E`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    const e = this._cmp;
    if (!e) return Z;
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
    return E`<div class="pop" @click=${(n) => n.stopPropagation()}>
      ${s ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(n) => t({ title: n.target.value })} />` : Z}
      ${i === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(n) => t({ text: n.target.value })} />` : Z}
      ${i === "button" || i === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(n) => t({ label: n.target.value })} />` : Z}
      ${i === "button" ? E`<label>Caso de uso</label>
            <select @change=${(n) => t({ useCaseId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.useCaseId}>—</option>
              ${this.useCases.map((n) => E`<option value=${n.id} ?selected=${n.id === e.useCaseId}>${n.name}</option>`)}
            </select>
            <label>Mapping</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ mappingId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.mappingId}>(el viewmodel viaja tal cual)</option>
              ${this.mappings.map((n) => E`<option value=${n.id} ?selected=${n.id === e.mappingId}>${n.name}</option>`)}
            </select>` : Z}
      ${i === "form" ? E`<label>Model</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ modelId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.modelId}>—</option>
              ${this.models.map((n) => E`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`)}
            </select>` : Z}
      ${i === "listing" ? E`<label>Consulta</label>
            <select
              style="grid-column: 2 / -1"
              @change=${(n) => {
      const o = n.target.value, r = this.queryOps.find((l) => l.id === o);
      t({ queryOperationId: r == null ? void 0 : r.id, queryServiceId: r == null ? void 0 : r.queryServiceId });
    }}
            >
              <option value="" ?selected=${!e.queryOperationId}>—</option>
              ${this.queryOps.map((n) => E`<option value=${n.id} ?selected=${n.id === e.queryOperationId}>${n.name}</option>`)}
            </select>` : Z}
      ${i === "field" ? E`<label>Estereotipo</label>
            <select @change=${(n) => t({ stereotype: n.target.value || void 0 })}>
              ${Un.map((n) => E`<option value=${n} ?selected=${n === (e.stereotype ?? "regular")}>${n}</option>`)}
            </select>` : Z}
      ${i === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : Z}
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
    if (!e) return Z;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, s = e.type === "WIZARD";
    return E`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? E`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(n) => this._rename = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRename(), n.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : E`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
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
        ([r, l]) => E`<option value=${r} ?selected=${n === r}>${l}</option>`
      );
    })()}
        </select>
        ${this._route !== null ? E`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(n) => this._route = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRoute(), n.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : E`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (n) => E`<span
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
        ${e.modelId ? E`<span class="chip">${e.modelName ?? e.modelId}</span>` : E`<span>—</span>`}
        <select
          title="Asignar el Model que hace de viewmodel"
          @change=${(n) => {
      const o = n.target.value;
      this.emitEvent("page-model-changed", { modelId: o === "" ? null : o });
    }}
        >
          <option value="" ?selected=${!e.modelId}>(sin viewmodel)</option>
          ${this.models.map(
      (n) => E`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`
    )}
        </select>
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? E`<div class="wizbar">
              <span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>
              <span class="wiznext">Siguiente ›</span>
            </div>` : Z}
        ${(e.content ?? []).length ? E`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o;
      const n = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((r) => r.useCaseId === this._btn.useCaseId);
      return E`<div class="pop">
              <label>Caso de uso</label>
              <select
                ?disabled=${n}
                @change=${(r) => this._btn = { ...this._btn, useCaseId: r.target.value }}
              >
                <option value="" ?selected=${!this._btn.useCaseId}>elige…</option>
                ${this.useCases.map(
        (r) => E`<option value=${r.id} ?selected=${r.id === this._btn.useCaseId}>${r.name}</option>`
      )}
              </select>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(r) => this._btn = { ...this._btn, label: r.target.value }}
              />
              <label>Mapping</label>
              <select
                style="grid-column: 2 / -1"
                title="ModelMapping del viewmodel al request del caso de uso"
                @change=${(r) => this._btn = { ...this._btn, mappingId: r.target.value }}
              >
                <option value="" ?selected=${!this._btn.mappingId}>(el viewmodel viaja tal cual)</option>
                ${this.mappings.map(
        (r) => E`<option value=${r.id} ?selected=${r.id === this._btn.mappingId}>${r.name}</option>`
      )}
              </select>
              <div class="actions">
                ${n ? E`<button
                      @click=${() => {
        const r = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: r });
      }}
                    >
                      Quitar
                    </button>` : Z}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : Z}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Un.map(
      (n) => E`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
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
          </div>` : Z}
    `;
  }
};
J.styles = mt`
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
J.KIND_LABELS = {
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
J.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
ce([
  ee({ attribute: !1 })
], J.prototype, "page", 2);
ce([
  ee({ type: Boolean, reflect: !0 })
], J.prototype, "framed", 2);
ce([
  ee({ attribute: !1 })
], J.prototype, "models", 2);
ce([
  ee({ attribute: !1 })
], J.prototype, "mappings", 2);
ce([
  ee({ attribute: !1 })
], J.prototype, "useCases", 2);
ce([
  ee({ attribute: !1 })
], J.prototype, "queryOps", 2);
ce([
  ee({ attribute: !1 })
], J.prototype, "selectedCmpId", 2);
ce([
  q()
], J.prototype, "_editing", 2);
ce([
  q()
], J.prototype, "_dragId", 2);
ce([
  q()
], J.prototype, "_overId", 2);
ce([
  q()
], J.prototype, "_rename", 2);
ce([
  q()
], J.prototype, "_route", 2);
ce([
  q()
], J.prototype, "_btn", 2);
ce([
  q()
], J.prototype, "_cmp", 2);
ce([
  q()
], J.prototype, "_dragCmpId", 2);
ce([
  q()
], J.prototype, "_overCmpId", 2);
ce([
  q()
], J.prototype, "_overCmpPos", 2);
ce([
  q()
], J.prototype, "_foreignOver", 2);
ce([
  q()
], J.prototype, "_activeTabs", 2);
J = ce([
  ht("modux-page-designer")
], J);
var Fl = Object.defineProperty, Vl = Object.getOwnPropertyDescriptor, ke = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Vl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Fl(t, i, n), n;
};
const Hl = 460, Bl = 540, Wl = 660;
let ye = class extends Oe {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((s) => {
        var n;
        return (n = s.classList) == null ? void 0 : n.contains("frame-title");
      });
      if (i) {
        const n = i.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: n }), e.preventDefault();
          return;
        }
        const o = this.pages.findIndex((l) => l.id === n), r = this.posOf(n, o);
        this.emit("element-selected", { elementType: "node", id: n, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: n, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
        return;
      }
      if (!t.some((s) => s.tagName === "MODUX-PAGE-DESIGNER")) {
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
      Math.abs(i) + Math.abs(s) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + i, y: t.oy + s };
    }, this.onUp = () => {
      const e = this._drag;
      this._drag = null, (e == null ? void 0 : e.mode) === "frame" && e.moved && this._live && this.emit("node-moved", {
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
    var u, p, a, d;
    const i = (u = this.shadowRoot) == null ? void 0 : u.elementFromPoint(e, t), s = (p = i == null ? void 0 : i.closest) == null ? void 0 : p.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), r = (a = o == null ? void 0 : o.shadowRoot) == null ? void 0 : a.elementFromPoint(e, t), l = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    return l ? `cmp:${n}:${l.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, f, b, _;
    const i = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), s = (f = i == null ? void 0 : i.closest) == null ? void 0 : f.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), r = (b = o == null ? void 0 : o.shadowRoot) == null ? void 0 : b.elementFromPoint(e, t), l = (_ = r == null ? void 0 : r.closest) == null ? void 0 : _.call(r, "[data-cmp-id]");
    if (!l) return { pageId: n, componentId: null, pos: "into" };
    const u = l.dataset.cmpKind ?? "", p = l.getBoundingClientRect(), a = (t - p.top) / Math.max(1, p.height), d = J.LEAF_KINDS.has(u) ? a < 0.5 ? "before" : "after" : a < 0.2 ? "before" : a > 0.8 ? "after" : "into";
    return { pageId: n, componentId: l.dataset.cmpId, pos: d };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Bl, y: Math.floor(t / 3) * Wl };
  }
  render() {
    return E`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var s;
      const i = this.posOf(e.id, t);
      return E`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""} · ${e.type ?? "PAGE"}</span>
              </div>
              <modux-page-designer
                framed
                .page=${e}
                .selectedCmpId=${((s = this.selectedCmp) == null ? void 0 : s.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(n) => {
        n.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...n.detail });
      }}
                @component-removed=${(n) => {
        n.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...n.detail });
      }}
                @component-moved=${(n) => {
        n.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...n.detail });
      }}
                @component-selected=${(n) => {
        n.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...n.detail });
      }}
                @component-transferred=${(n) => {
        n.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...n.detail });
      }}
                @page-renamed=${(n) => {
        n.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...n.detail });
      }}
                @page-type-changed=${(n) => {
        n.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...n.detail });
      }}
                @page-route-changed=${(n) => {
        n.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...n.detail });
      }}
                @page-model-changed=${(n) => {
        n.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...n.detail });
      }}
                @button-added=${(n) => this.emit("page-button-added", { pageId: e.id, ...n.detail })}
                @button-changed=${(n) => this.emit("page-button-changed", { pageId: e.id, ...n.detail })}
                @button-removed=${(n) => this.emit("page-button-removed", { pageId: e.id, ...n.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(n) => this.emit("page-field-config-changed", { pageId: e.id, ...n.detail })}
                @fields-reordered=${(n) => this.emit("page-fields-reordered", { pageId: e.id, ...n.detail })}
              ></modux-page-designer>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : E`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
ye.styles = mt`
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
      width: ${Hl}px;
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
ke([
  ee({ attribute: !1 })
], ye.prototype, "pages", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "layout", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "selectedId", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "selectedIds", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "models", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "mappings", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "useCases", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "queryOps", 2);
ke([
  ee({ attribute: !1 })
], ye.prototype, "selectedCmp", 2);
ke([
  q()
], ye.prototype, "_t", 2);
ke([
  q()
], ye.prototype, "_live", 2);
ye = ke([
  ht("modux-figma")
], ye);
var Gl = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, Y = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Yl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Gl(t, i, n), n;
};
const qi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, jl = Object.keys(qi);
function _t(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let l = 0, u = 1;
  const p = t.x - e.x, a = t.y - e.y;
  for (const [d, m] of [
    [-p, e.x - s],
    [p, n - e.x],
    [-a, e.y - o],
    [a, r - e.y]
  ]) {
    if (d === 0) {
      if (m < 0) return !1;
      continue;
    }
    const f = m / d;
    if (d < 0) {
      if (f > u) return !1;
      f > l && (l = f);
    } else {
      if (f < l) return !1;
      f < u && (u = f);
    }
  }
  return u - l > 0.02;
}
function Kl(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((a) => [a.id, a])), n = (a) => {
    var m;
    const d = /* @__PURE__ */ new Set();
    for (let f = a; f; f = (m = s.get(f)) == null ? void 0 : m.parentId) d.add(f);
    return d;
  }, o = e.nodes, r = (a) => a.parentId ? Math.min(i, 6) : i, l = /* @__PURE__ */ new Map(), u = (a, d, m) => {
    const f = r(m), b = { x: m.x, y: m.y, w: m.w + 2 * f, h: m.h + 2 * f }, _ = m.w / 2 + f * 1.5, g = m.h / 2 + f * 1.5, k = { x: m.x - _, y: m.y - g }, P = { x: m.x + _, y: m.y - g }, M = { x: m.x - _, y: m.y + g }, w = { x: m.x + _, y: m.y + g }, C = [];
    for (const x of [k, P, M, w])
      !_t(a, x, b) && !_t(x, d, b) && C.push([x]);
    for (const [x, z] of [
      [k, P],
      [P, k],
      [P, w],
      [w, P],
      [w, M],
      [M, w],
      [M, k],
      [k, M]
    ])
      !_t(a, x, b) && !_t(z, d, b) && C.push([x, z]);
    return C;
  };
  for (const a of e.edges) {
    if ((p = t[a.id]) != null && p.length) continue;
    const d = s.get(a.sourceId), m = s.get(a.targetId);
    if (!d || !m) continue;
    const f = /* @__PURE__ */ new Set([...n(d.id), ...n(m.id)]), b = [
      { x: d.x, y: d.y },
      { x: m.x, y: m.y }
    ];
    for (let _ = 0; _ < 12; _++) {
      let g = !1;
      e: for (let k = 0; k < b.length - 1; k++)
        for (const P of o) {
          if (f.has(P.id)) continue;
          const M = r(P), w = { x: P.x, y: P.y, w: P.w + 2 * M, h: P.h + 2 * M };
          if (!_t(b[k], b[k + 1], w)) continue;
          const C = u(b[k], b[k + 1], P);
          if (!C.length) continue;
          const x = (D) => o.some(
            (R) => R !== P && !f.has(R.id) && Math.abs(D.x - R.x) < R.w / 2 + r(R) / 2 && Math.abs(D.y - R.y) < R.h / 2 + r(R) / 2
          ), z = (D) => {
            let R = 0;
            const y = [b[k], ...D, b[k + 1]];
            for (let $ = 0; $ < y.length - 1; $++)
              R += Math.hypot(y[$ + 1].x - y[$].x, y[$ + 1].y - y[$].y);
            return R + (D.some(x) ? 1e4 : 0);
          };
          C.sort((D, R) => z(D) - z(R)), b.splice(k + 1, 0, ...C[0]), g = !0;
          break e;
        }
      if (!g) break;
    }
    b.length > 2 && l.set(
      a.id,
      b.slice(1, -1).map((_) => ({ x: Math.round(_.x), y: Math.round(_.y) }))
    );
  }
  return l;
}
const te = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Xl(e, t) {
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
function Ql(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let H = class extends Oe {
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
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, o = me(t);
      if (!(o != null && o.itemId)) return;
      const r = this.menuEntryIn(o.appId, o.itemId);
      if (!r) return;
      const l = (u, p) => (u ?? []).some((a) => a.id === p || l(a.children, p));
      if (n) {
        const u = me(n);
        if (!(u != null && u.itemId) || u.itemId === o.itemId || o.appId === u.appId && l(r.entry.children, u.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: u.appId,
          itemId: o.itemId,
          parentId: u.itemId
        });
        return;
      }
      if (s) {
        const u = me(s);
        if (!(u != null && u.itemId) || u.itemId === o.itemId) return;
        const p = this.menuEntryIn(u.appId, u.itemId);
        if (!p || o.appId === u.appId && l(r.entry.children, u.itemId) || o.appId === u.appId && p.parentId === r.parentId && r.beforeId === u.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: u.appId,
          itemId: o.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: u.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: o.appId, toAppId: i, itemId: o.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var l, u;
      const { id: t, beforeId: i } = e.detail, s = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!s) return;
      const n = i ? ((l = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : l[1]) ?? null : null;
      if (n === s[2]) return;
      const o = (((u = (this.model.pages ?? []).find((p) => p.id === s[1])) == null ? void 0 : u.wizardSteps) ?? []).map((p) => p.id ?? p.pageId), r = o.indexOf(s[2]);
      r >= 0 && (n ? o[r + 1] === n : r === o.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: s[1], targetId: s[2], beforeItemId: n });
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
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: n, beforeComponentId: o } = e.detail, r = this.componentIn(t, s);
      if (!r || t === i) return;
      const l = JSON.parse(JSON.stringify(r.node)), { ops: u } = this.rebuildComponentOps(i, l, n ?? void 0, o);
      for (const p of u) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, l, r.parentId ?? void 0, r.beforeId).ops
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
    return Bt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Bt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = Bt(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = Bt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((a) => !a.parentId), l = Fi(r), u = [...l.keys()].map((a) => ({
      kind: "move-node",
      view: "context-map",
      id: a,
      pos: o.nodes[a] ?? null
    })), p = { ...o.nodes };
    for (const [a, d] of l) {
      const m = r.find((b) => b.id === a), f = o.nodes[a] ?? { x: m.x, y: m.y };
      p[a] = {
        x: Math.round(f.x + (d.x - m.x)),
        y: Math.round(f.y + (d.y - m.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: p }), u.length && this.pushUndoEntry(u);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Kl(e, t);
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
    var t, i, s, n, o, r, l, u, p;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const a = this.model.relations.find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return a && a.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: a.type }] : null;
      }
      case "set-relation-type": {
        const a = this.model.relations.find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return a && a.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: a.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "set-app-header-page": {
        const a = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (a == null ? void 0 : a.headerPageId) ?? null }];
      }
      case "set-app-model": {
        const a = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-model", appId: e.appId, modelId: (a == null ? void 0 : a.modelId) ?? null }];
      }
      case "add-model":
        return [{ kind: "remove-model", id: e.id }];
      case "remove-model": {
        const a = (this.model.models ?? []).find((m) => m.id === e.id);
        if (!a) return null;
        const d = [{ kind: "add-model", id: a.id, name: a.name }];
        for (const m of this.model.pages ?? []) {
          m.modelId === e.id && d.push({ kind: "set-page-model", pageId: m.id, modelId: e.id });
          const f = (b) => {
            for (const _ of b ?? [])
              _.modelId === e.id && d.push({ kind: "set-page-component", pageId: m.id, componentId: _.id, modelId: e.id }), f(_.children);
          };
          f(m.content);
        }
        for (const m of this.model.uiApps ?? [])
          m.modelId === e.id && d.push({ kind: "set-app-model", appId: m.id, modelId: e.id });
        return d;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const a = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = e.kind === "set-crud-detail";
        return [{
          kind: e.kind,
          pageId: e.pageId,
          targetId: (d ? a == null ? void 0 : a.crudDetailPageId : a == null ? void 0 : a.crudCreatePageId) ?? null,
          toAppId: (d ? a == null ? void 0 : a.crudDetailAppId : a == null ? void 0 : a.crudCreateAppId) ?? null
        }];
      }
      case "set-app-view-page": {
        const a = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-view-page", appId: e.appId, pageId: (a == null ? void 0 : a.viewPageId) ?? null }];
      }
      case "set-app-edit-page": {
        const a = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{ kind: "set-app-edit-page", appId: e.appId, pageId: (a == null ? void 0 : a.editPageId) ?? null }];
      }
      case "set-app-home-page": {
        const a = (this.model.uiApps ?? []).find((d) => d.id === e.appId);
        return [{
          kind: "set-app-home-page",
          appId: e.appId,
          pageId: (a == null ? void 0 : a.homePageId) ?? null,
          toAppId: (a == null ? void 0 : a.homeAppId) ?? null
        }];
      }
      case "add-page-wizard-step":
        return [{ kind: "remove-page-wizard-step", pageId: e.pageId, targetId: e.itemId ?? e.targetId }];
      case "set-wizard-step-page": {
        const a = (((t = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : t.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === e.itemId);
        return a ? [{ kind: "set-wizard-step-page", pageId: e.pageId, itemId: e.itemId, targetId: a.pageId ?? null }] : null;
      }
      case "move-page-wizard-step": {
        const a = (((i = (this.model.pages ?? []).find((m) => m.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), d = a.indexOf(e.targetId);
        return d < 0 ? null : [{
          kind: "move-page-wizard-step",
          pageId: e.pageId,
          targetId: e.targetId,
          beforeItemId: a[d + 1] ?? null
        }];
      }
      case "remove-page-wizard-step": {
        const a = (((s = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : s.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === e.targetId);
        return a ? [{
          kind: "add-page-wizard-step",
          pageId: e.pageId,
          targetId: a.pageId ?? null,
          label: a.label,
          itemId: a.id
        }] : null;
      }
      case "delete-ui-app": {
        const a = (this.model.uiApps ?? []).find((f) => f.id === e.id);
        if (!a) return null;
        const d = [{ kind: "create-ui-app", id: a.id, name: a.name, type: a.type }];
        a.headerPageId && d.push({ kind: "set-app-header-page", appId: a.id, pageId: a.headerPageId }), a.modelId && d.push({ kind: "set-app-model", appId: a.id, modelId: a.modelId }), a.viewPageId && d.push({ kind: "set-app-view-page", appId: a.id, pageId: a.viewPageId }), a.editPageId && d.push({ kind: "set-app-edit-page", appId: a.id, pageId: a.editPageId }), (a.homePageId || a.homeAppId) && d.push({
          kind: "set-app-home-page",
          appId: a.id,
          pageId: a.homePageId ?? null,
          toAppId: a.homeAppId ?? null
        });
        const m = (f, b) => {
          for (const _ of f ?? [])
            d.push({
              kind: "add-menu-item",
              appId: a.id,
              label: _.label,
              itemId: _.id,
              parentId: b == null ? void 0 : b.id,
              parentLabel: b && !b.id ? b.label : void 0,
              pageId: _.pageId ?? null
            }), _.uiAdapterId && d.push({ kind: "set-menu-app", appId: a.id, toAppId: _.uiAdapterId, itemId: _.id, label: _.label }), _.useCaseId && d.push({ kind: "set-menu-use-case", appId: a.id, useCaseId: _.useCaseId, itemId: _.id, label: _.label }), _.aggregateId && d.push({ kind: "set-menu-aggregate", appId: a.id, aggregateId: _.aggregateId, itemId: _.id, label: _.label }), _.queryOperationId && d.push({
              kind: "set-menu-query-operation",
              appId: a.id,
              queryServiceId: _.queryServiceId ?? null,
              queryOperationId: _.queryOperationId,
              itemId: _.id,
              label: _.label
            }), m(_.children, _);
        };
        m(a.menuItems);
        for (const f of this.model.actorAppUses ?? [])
          f.appId === e.id && d.push({ kind: "add-actor-app", actorId: f.actorId, appId: e.id });
        return d;
      }
      case "delete-ui-page": {
        const a = (this.model.pages ?? []).find((m) => m.id === e.id);
        if (!a) return null;
        const d = [
          { kind: "create-ui-page", id: a.id, name: a.name, pageType: a.type ?? "FORM" }
        ];
        a.route && d.push({ kind: "set-page-route", pageId: a.id, path: a.route }), a.modelId && d.push({ kind: "set-page-model", pageId: a.id, modelId: a.modelId }), a.listingQueryServiceId && d.push({ kind: "set-page-listing", pageId: a.id, queryServiceId: a.listingQueryServiceId });
        for (const m of a.buttons ?? [])
          m.useCaseId && (d.push({ kind: "add-page-button", pageId: a.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && d.push({
            kind: "set-page-button",
            pageId: a.id,
            useCaseId: m.useCaseId,
            label: m.label ?? null,
            mappingId: m.mappingId
          }));
        for (const m of a.viewmodelFields ?? [])
          (m.stereotype || m.colspan || m.label) && d.push({
            kind: "set-page-field-config",
            pageId: a.id,
            fieldId: m.fieldId,
            stereotype: m.stereotype ?? null,
            colspan: m.colspan ?? null,
            label: m.label ?? null
          });
        (a.viewmodelFields ?? []).length && d.push({
          kind: "set-page-field-order",
          pageId: a.id,
          fieldIds: (a.viewmodelFields ?? []).map((m) => m.fieldId)
        });
        for (const m of a.content ?? [])
          d.push(...this.rebuildComponentOps(a.id, m, void 0, null).ops);
        for (const m of a.wizardSteps ?? [])
          d.push({
            kind: "add-page-wizard-step",
            pageId: a.id,
            targetId: m.pageId ?? null,
            label: m.label,
            itemId: m.id
          });
        return (a.crudDetailPageId || a.crudDetailAppId) && d.push({ kind: "set-crud-detail", pageId: a.id, targetId: a.crudDetailPageId ?? null, toAppId: a.crudDetailAppId ?? null }), (a.crudCreatePageId || a.crudCreateAppId) && d.push({ kind: "set-crud-create", pageId: a.id, targetId: a.crudCreatePageId ?? null, toAppId: a.crudCreateAppId ?? null }), d;
      }
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const a = (this.model.uiApps ?? []).find((f) => f.id === e.appId), d = (f) => {
          for (const b of f ?? []) {
            if (e.itemId ? b.id === e.itemId : b.label === e.label) return b;
            const _ = d(b.children);
            if (_) return _;
          }
          return null;
        }, m = e.itemId || e.label ? d(a == null ? void 0 : a.menuItems) : null;
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
        const a = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = ((a == null ? void 0 : a.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
        return d ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: d.label }] : null;
      }
      case "rename-ui-page": {
        const a = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return a ? [{ kind: "rename-ui-page", pageId: e.pageId, name: a.name }] : null;
      }
      case "set-page-type": {
        const a = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return a ? [{ kind: "set-page-type", pageId: e.pageId, pageType: a.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const a = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return a != null && a.route ? [{ kind: "set-page-route", pageId: e.pageId, path: a.route }] : null;
      }
      case "set-page-button": {
        const a = (this.model.pages ?? []).find((m) => m.id === e.pageId), d = ((a == null ? void 0 : a.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
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
        const a = (this.model.pages ?? []).find((g) => g.id === e.pageId);
        let d = null, m = null, f = null;
        const b = (g, k) => {
          var M;
          const P = g ?? [];
          for (let w = 0; w < P.length; w++)
            P[w].id === e.componentId && (d = P[w], m = k, f = ((M = P[w + 1]) == null ? void 0 : M.id) ?? null), b(P[w].children, P[w]);
        };
        if (b(a == null ? void 0 : a.content, null), !d) return null;
        const _ = d;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: _.title ?? null,
          text: _.text ?? null,
          label: _.label ?? null,
          useCaseId: _.useCaseId ?? null,
          mappingId: _.mappingId ?? null,
          modelId: _.modelId ?? null,
          queryServiceId: _.queryServiceId ?? null,
          queryOperationId: _.queryOperationId ?? null,
          fieldId: _.fieldId ?? null,
          stereotype: _.stereotype ?? null,
          colspan: _.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: m === null ? null : m.id,
          beforeComponentId: f
        }] : this.rebuildComponentOps(
          e.pageId,
          _,
          m === null ? void 0 : m.id,
          f
        ).ops;
      }
      case "set-page-listing": {
        const a = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (a == null ? void 0 : a.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const a = (this.model.pages ?? []).find((d) => d.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (a == null ? void 0 : a.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const a = (((n = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : n.viewmodelFields) ?? []).find((d) => d.fieldId === e.fieldId);
        return [{
          kind: "set-page-field-config",
          pageId: e.pageId,
          fieldId: e.fieldId,
          stereotype: (a == null ? void 0 : a.stereotype) ?? null,
          colspan: (a == null ? void 0 : a.colspan) ?? null,
          label: (a == null ? void 0 : a.label) ?? null
        }];
      }
      case "set-page-field-order": {
        const a = (((o = (this.model.pages ?? []).find((d) => d.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).map((d) => d.fieldId);
        return a.length ? [{ kind: "set-page-field-order", pageId: e.pageId, fieldIds: a }] : null;
      }
      case "move-menu-item": {
        const a = e.itemId ? this.menuEntryIn(e.appId, e.itemId) : null;
        return [{
          kind: "move-menu-item",
          appId: e.toAppId,
          toAppId: e.appId,
          itemId: e.itemId,
          label: e.label,
          parentId: (a == null ? void 0 : a.parentId) ?? void 0,
          beforeItemId: (a == null ? void 0 : a.beforeId) ?? void 0
        }];
      }
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const a = this.model.modules.find((m) => m.id === e.id);
        if (!a) return null;
        const d = this.model.relations.filter(
          (m) => (m.sourceId === e.id || m.targetId === e.id) && m.type != null
        );
        return [
          { kind: "add-module", id: a.id, name: a.name, subdomainType: a.subdomainType ?? "GENERIC" },
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
        const a = (this.model.aggregates ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "add-aggregate", id: a.id, name: a.name, moduleId: a.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const a of this.model.modules) {
          const d = (a.queryServices ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-query-service", id: d.id, name: d.name, moduleId: a.id }];
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
        const a = (this.model.externalSystemDependencies ?? []).find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return a ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: a.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const a = (this.model.externalSystemDependencies ?? []).find(
          (d) => d.sourceId === e.sourceId && d.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: a == null ? void 0 : a.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const a = (this.model.proxyApis ?? []).find((d) => d.id === e.id);
        return a ? [{
          kind: "add-proxy-api",
          id: a.id,
          name: a.name,
          targetId: a.targetApiId,
          moduleId: a.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const a = (this.model.proxyApis ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "set-proxy-target", id: e.id, targetId: a.targetApiId ?? "" }] : null;
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
        const a = (this.model.apiOperationImplementations ?? []).find(
          (d) => d.apiId === e.apiId && d.operationId === e.operationId && d.moduleId === e.moduleId
        );
        return a ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: a.useCaseId
        }] : [{
          kind: "remove-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId
        }];
      }
      case "remove-api-operation-implementation": {
        const a = (this.model.apiOperationImplementations ?? []).find(
          (d) => d.apiId === e.apiId && d.operationId === e.operationId && d.moduleId === e.moduleId
        );
        return a ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: a.useCaseId
        }] : null;
      }
      case "set-api-publisher": {
        const a = (this.model.apis ?? []).find((d) => d.id === e.id) ?? (this.model.proxyApis ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "set-api-publisher", id: e.id, targetId: a.publishedByExternalSystemId ?? "" }] : null;
      }
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const a of this.model.modules) {
          const d = (a.useCases ?? []).find((m) => m.id === e.id);
          if (d)
            return [
              { kind: "add-use-case", id: d.id, name: d.name, moduleId: a.id, policy: d.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const a of this.model.externalSystems) {
          const d = (a.useCases ?? []).find((m) => m.id === e.id);
          if (d)
            return [{ kind: "add-external-use-case", id: d.id, name: d.name, moduleId: a.id }];
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
      case "add-scheduled-trigger":
        return [{ kind: "remove-scheduled-trigger", id: e.id }];
      case "remove-scheduled-trigger": {
        const a = this.model.modules.find(
          (m) => (m.scheduledTriggers ?? []).some((f) => f.id === e.id)
        ), d = ((a == null ? void 0 : a.scheduledTriggers) ?? []).find((m) => m.id === e.id);
        return !a || !d ? null : [{
          kind: "add-scheduled-trigger",
          id: d.id,
          name: d.name,
          moduleId: a.id,
          cronExpression: d.cronExpression,
          targetUseCaseId: d.useCaseId
        }];
      }
      case "set-scheduled-trigger-target": {
        const a = this.model.modules.flatMap((d) => d.scheduledTriggers ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "set-scheduled-trigger-target", id: e.id, targetUseCaseId: a.useCaseId ?? null }] : null;
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
        const a = this.model.externalSystems.find((d) => d.id === e.id);
        return a ? [{ kind: "add-external-system", id: a.id, name: a.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const a = (this.model.aiAgents ?? []).find((d) => d.id === e.id);
        return a ? [
          { kind: "add-ai-agent", id: a.id, name: a.name, external: a.external },
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
        const a = (this.model.mcpGateways ?? []).find((d) => d.id === e.id);
        return a ? [
          { kind: "add-mcp-gateway", id: a.id, name: a.name },
          ...[
            ...a.mcpServerIds ?? [],
            ...a.apiIds ?? [],
            ...a.apiOperationIds ?? [],
            ...a.useCaseIds ?? [],
            ...a.ragIds ?? []
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
        for (const a of this.model.externalSystems) {
          const d = (a.mcpServers ?? []).find((m) => m.id === e.id);
          if (d)
            return [
              { kind: "add-mcp-server", id: d.id, name: d.name, moduleId: a.id, uri: d.uri },
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
        const a = (this.model.rags ?? []).find((d) => d.id === e.id);
        return a ? [
          { kind: "add-rag", id: a.id, name: a.name },
          ...(this.model.agentRags ?? []).filter((d) => d.ragId === e.id).map(
            (d) => ({
              kind: "add-agent-rag",
              sourceId: d.agentId,
              targetId: e.id
            })
          ),
          ...(a.sourceReadModelIds ?? []).map(
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
        const a = (this.model.actors ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "add-actor", id: a.id, name: a.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const a of this.model.modules) {
          const d = (a.applicationEvents ?? []).find((m) => m.id === e.id);
          if (d)
            return [{ kind: "add-application-event", id: d.id, name: d.name, moduleId: a.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const a of this.model.modules) {
          const d = (a.domainServices ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-domain-service", id: d.id, name: d.name, moduleId: a.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const a = (this.model.projections ?? []).find((d) => d.id === e.id);
        return a && (a.sourceAggregateId || a.sourceExternalUseCaseId || a.sourceExternalTableId) ? [
          {
            kind: "add-projection",
            id: a.id,
            name: a.name,
            aggregateId: a.sourceAggregateId,
            externalUseCaseId: a.sourceExternalUseCaseId,
            externalTableId: a.sourceExternalTableId,
            targetId: a.readModelId,
            moduleId: a.moduleId
          }
        ] : null;
      }
      case "add-external-table":
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const a of this.model.externalSystems) {
          const d = (a.tables ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-external-table", id: d.id, name: d.name, moduleId: a.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const a = (l = (r = (this.model.rags ?? []).find((d) => d.id === e.sourceId)) == null ? void 0 : r.contentSources) == null ? void 0 : l.find((d) => d.uri === e.uri);
        return a ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: a.type,
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
        const a = (this.model.apis ?? []).find((d) => d.id === e.id);
        return a ? [
          { kind: "add-api", id: a.id, name: a.name },
          ...a.operations.map(
            (d) => ({
              kind: "add-api-operation",
              apiId: a.id,
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
        const a = (u = (this.model.apis ?? []).find((d) => d.id === e.apiId)) == null ? void 0 : u.operations.find((d) => d.id === e.id);
        return a ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
            id: a.id,
            name: a.name,
            httpMethod: a.httpMethod,
            path: a.path,
            moduleId: a.targetModuleId,
            targetUseCaseId: a.targetUseCaseId
          }
        ] : null;
      }
      case "set-api-operation-target": {
        const a = (p = (this.model.apis ?? []).find((d) => d.id === e.apiId)) == null ? void 0 : p.operations.find((d) => d.id === e.id);
        return a ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: a.targetModuleId,
            targetUseCaseId: a.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const a of this.model.modules) {
          const d = (a.readModels ?? []).find((m) => m.id === e.id);
          if (d != null && d.aggregateId)
            return [{ kind: "add-read-model", id: d.id, name: d.name, aggregateId: d.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const a of this.model.modules) {
          const d = (a.domainEvents ?? []).find((m) => m.id === e.id);
          if (d) return [{ kind: "add-domain-event", id: d.id, name: d.name, moduleId: a.id }];
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
        const a = this.model.flows.find((d) => d.id === e.id);
        return a ? [
          {
            kind: "add-flow",
            id: a.id,
            name: a.name,
            archetype: a.archetype,
            triggerAggregateId: a.triggerAggregateId ?? "",
            triggerEvent: a.triggerEvent ?? "",
            targetId: a.targetId,
            readModelName: a.readModelName,
            targetUseCaseId: a.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const a = (this.model.views ?? []).find((d) => d.id === e.id);
        return a ? [{ kind: "add-view", id: a.id, name: a.name, memberIds: a.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const a = (this.model.processes ?? []).find((f) => f.id === e.processId), d = (a == null ? void 0 : a.steps.findIndex((f) => f.id === e.id)) ?? -1;
        if (!a || d < 0) return null;
        const m = a.steps[d];
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
            afterStepId: d > 0 ? a.steps[d - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const a = (this.model.processes ?? []).find((m) => m.id === e.processId), d = (a == null ? void 0 : a.steps.findIndex((m) => m.id === e.id)) ?? -1;
        return !a || d < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: d > 0 ? a.steps[d - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const a = (this.model.processes ?? []).find((m) => m.id === e.processId), d = a == null ? void 0 : a.steps.find((m) => m.id === e.id);
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
        const a = (this.model.processes ?? []).find((d) => d.id === e.id);
        return a ? [
          {
            kind: "add-process",
            id: a.id,
            name: a.name,
            moduleId: a.ownerModuleId ?? "",
            triggerAggregateId: a.triggerAggregateId,
            triggerEvent: a.triggerEvent,
            steps: a.steps
          }
        ] : null;
      }
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const a = (this.model.workflows ?? []).find((d) => d.id === e.id);
        return a ? [
          {
            kind: "add-workflow",
            id: a.id,
            name: a.name,
            triggerAggregateId: a.triggerAggregateId,
            triggerDomainServiceId: a.triggerDomainServiceId,
            triggerUseCaseId: a.triggerUseCaseId,
            triggerEvent: a.triggerEvent,
            completionEventName: a.onCompletionEventName,
            workflowSteps: a.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const a = (this.model.workflows ?? []).find((f) => f.id === e.workflowId), d = (a == null ? void 0 : a.steps.findIndex((f) => f.id === e.id)) ?? -1;
        if (!a || d < 0) return null;
        const m = a.steps[d];
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
            afterStepId: d > 0 ? a.steps[d - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...a.steps.filter((f) => f.id !== e.id && (f.dependsOnStepIds ?? []).includes(e.id)).map(
            (f) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: f.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const a = (this.model.workflows ?? []).find((m) => m.id === e.workflowId), d = a == null ? void 0 : a.steps.find((m) => m.id === e.id);
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
        const a = (this.model.workflows ?? []).find((d) => d.id === e.id);
        return a ? [{
          kind: "set-workflow-trigger",
          id: e.id,
          triggerEvent: a.triggerEvent ?? "",
          triggerAggregateId: a.triggerAggregateId,
          triggerDomainServiceId: a.triggerDomainServiceId,
          triggerUseCaseId: a.triggerUseCaseId
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), r = o.nodes[t] ?? null;
    let l = { x: i, y: s };
    const u = this.sceneFor(n), p = u.nodes.find((d) => d.id === t);
    if (p != null && p.parentId) {
      const d = u.nodes.find((m) => m.id === p.parentId);
      d && (l = { x: i - d.x, y: s - d.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: l } });
    const a = [{ kind: "move-node", view: n, id: t, pos: r }];
    if (n === "processes") {
      const d = this.stepReorderCommand(t);
      if (d) {
        const m = this.inverseOf(d);
        m && a.unshift(...m), this.command(d, !1);
      }
    }
    this.pushUndoEntry(a);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((b) => b.id === t) ?? (this.model.proxyApis ?? []).find((b) => b.id === t);
    if (!o || i && !this.model.externalSystems.some((b) => b.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === r) return;
    const u = this._view, p = this.viewLayout(u), a = this.sceneFor(u), d = l ? a.nodes.find((b) => b.id === l) : void 0, m = d ? { x: s - d.x, y: n - d.y } : { x: s, y: n }, f = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: u, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(u, { ...p, nodes: { ...p.nodes, [t]: m } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((b) => b.id === t), r = this.model.externalSystems.find((b) => b.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (b) => b.targetApiId === t && b.publishedByExternalSystemId === i
    )) return;
    const u = `proxy-${te(o.name)}-${te(r.name)}`;
    if ((this.model.proxyApis ?? []).some((b) => b.id === u)) return;
    const p = this._view, a = this.viewLayout(p), m = this.sceneFor(p).nodes.find((b) => b.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: u,
        name: `${o.name}@${r.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: u }];
    m && (f.push({ kind: "move-node", view: p, id: u, pos: a.nodes[u] ?? null }), this.writeViewLayout(p, {
      ...a,
      nodes: { ...a.nodes, [u]: { x: s - m.x, y: n - m.y } }
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
    var l, u, p;
    const t = e.target, i = (l = t.files) == null ? void 0 : l[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((u = this.model.externalSystems.find((a) => a.id === this._selectedId)) == null ? void 0 : u.id) ?? null, r = n || o ? null : ((p = this.model.modules.find((a) => a.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!n && !o && !r) {
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
      homeModuleId: r
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
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), o = { ...s.nodes }, r = [];
    for (const { id: l, x: u, y: p } of t) {
      r.push({ kind: "move-node", view: i, id: l, pos: s.nodes[l] ?? null });
      let a = { x: u, y: p };
      const d = n.nodes.find((m) => m.id === l);
      if (d != null && d.parentId) {
        const m = n.nodes.find((f) => f.id === d.parentId);
        m && (a = { x: u - m.x, y: p - m.y });
      }
      o[l] = a;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: l } of t) {
        const u = this.stepReorderCommand(l);
        if (u) {
          const p = this.inverseOf(u);
          p && r.unshift(...p), this.command(u, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var a;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, r = this._view, l = this.viewLayout(r), u = this.sceneFor(r).nodes.filter((d) => d.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((a = l.sizes) == null ? void 0 : a[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: l.nodes[t] ?? null },
      ...u.map((d) => ({ kind: "move-node", view: r, id: d.id, pos: l.nodes[d.id] ?? null }))
    ]);
    const p = { ...l.nodes, [t]: { x: i, y: s } };
    for (const d of u) p[d.id] = { x: d.x - i, y: d.y - s };
    this.writeViewLayout(r, {
      ...l,
      nodes: p,
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
    const i = sn(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((r) => [r.id, r.x])), n = [...t.steps].sort(
      (r, l) => (s.get(r.id) ?? 0) - (s.get(l.id) ?? 0)
    );
    if (n.every((r, l) => r.id === t.steps[l].id)) return null;
    const o = n.findIndex((r) => r.id === e);
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
    var x, z, D, R;
    if (this._view === "workflows") {
      const y = this.owningWorkflowOf(e), $ = this.owningWorkflowOf(t);
      if (!y || y !== $ || e === t) return;
      const T = y.steps.find((O) => O.id === t);
      if (((T == null ? void 0 : T.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: y.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const y = this.model.pages ?? [], $ = this.model.uiApps ?? [], T = (A) => $.some((F) => F.id === A), O = (A) => y.some((F) => F.id === A);
      if (n === "home" && T(e) && (O(t) || T(t))) {
        if (t === e) return;
        this.command(
          O(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && T(e) && O(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && O(e) && (O(t) || T(t)) && t !== e) {
        const A = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          O(t) ? { kind: A, pageId: e, targetId: t, toAppId: null } : { kind: A, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if ((n === "view" || n === "edit") && T(e) && O(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const h = (A) => /^wizrow:([^:]+):(.+)$/.exec(A), I = h(e) ?? h(t);
      if (I) {
        const A = h(e) ? t : e;
        O(A) && A !== I[1] && this.command({ kind: "set-wizard-step-page", pageId: I[1], itemId: I[2], targetId: A });
        return;
      }
      const v = y.find((A) => A.id === t && A.type === "WIZARD");
      if (O(e) && v && e !== v.id) {
        (v.wizardSteps ?? []).some((A) => A.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: v.id, targetId: e });
        return;
      }
      if (O(e) && T(t)) {
        const A = y.find((K) => K.id === e), F = $.find((K) => K.id === t);
        if (F.type === "MASTER_DETAIL" && !F.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${A.name} es la cabecera de ${F.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: A.name,
          pageId: e,
          itemId: this.newMenuItemId(A.name)
        });
        return;
      }
      const S = (A) => (this.model.models ?? []).some((F) => F.id === A);
      if (S(e) || S(t)) {
        const A = S(e) ? e : t, F = S(e) ? t : e;
        if (O(F)) {
          this.command({ kind: "set-page-model", pageId: F, modelId: A });
          return;
        }
        if (T(F)) {
          this.command({ kind: "set-app-model", appId: F, modelId: A });
          return;
        }
        return;
      }
      const N = me(e);
      if (N != null && N.itemId && ((x = me(t)) != null && x.itemId || T(t))) {
        const A = me(t), F = this.menuEntryIn(N.appId, N.itemId);
        if (!F) return;
        if (A != null && A.itemId) {
          const K = this.menuEntryIn(A.appId, A.itemId);
          if (!K) return;
          const X = (Pe) => (Pe ?? []).some((Ft) => Ft.id === A.itemId || X(Ft.children));
          if (N.appId === A.appId && (A.itemId === N.itemId || X(F.entry.children)))
            return;
          const se = (z = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : z.renderRoot.querySelector(`g[data-node-id="${t}"]`), ne = se == null ? void 0 : se.getBoundingClientRect(), le = ne && s !== void 0 ? (s - ne.top) / Math.max(1, ne.height) : 0.5, ge = le < 0.3 ? "before" : le > 0.7 ? "after" : "nest";
          if (ge === "nest")
            this.command({
              kind: "move-menu-item",
              appId: N.appId,
              toAppId: A.appId,
              itemId: N.itemId,
              parentId: A.itemId
            });
          else {
            const Pe = ge === "before" ? A.itemId : K.beforeId ?? void 0;
            if (N.appId === A.appId && K.parentId === F.parentId && Pe === N.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: N.appId,
              toAppId: A.appId,
              itemId: N.itemId,
              parentId: K.parentId ?? void 0,
              beforeItemId: Pe
            });
          }
          return;
        }
        if (N.appId === t && !F.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: N.appId,
          toAppId: t,
          itemId: N.itemId
        });
        return;
      }
      const V = me(e) ?? me(t);
      if (V) {
        const A = me(e) ? e : t, F = me(e) ? t : e;
        if (((D = this.sceneFor("ui").nodes.find((ne) => ne.id === A)) == null ? void 0 : D.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const K = this.model.modules.some(
          (ne) => (ne.useCases ?? []).some((le) => le.id === F)
        ), X = (this.model.aggregates ?? []).some((ne) => ne.id === F), se = this.model.modules.flatMap((ne) => ne.queryServices ?? []).find((ne) => (ne.operations ?? []).some((le) => le.id === F));
        O(F) ? this.command({ kind: "set-menu-page", pageId: F, ...V }) : T(F) && F !== V.appId ? this.command({ kind: "set-menu-app", toAppId: F, ...V }) : K ? this.command({ kind: "set-menu-use-case", useCaseId: F, ...V }) : X ? this.command({ kind: "set-menu-aggregate", aggregateId: F, ...V }) : se && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: se.id,
          queryOperationId: F,
          ...V
        });
        return;
      }
      if ((this.model.actors ?? []).some((A) => A.id === e) && T(t)) {
        (this.model.actorAppUses ?? []).some((A) => A.actorId === e && A.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const U = O(e) ? { pageId: e, other: t } : O(t) ? { pageId: t, other: e } : null;
      if (U) {
        const A = new Set(
          this.model.modules.flatMap((X) => (X.useCases ?? []).map((se) => se.id))
        ), F = new Set(
          this.model.modules.flatMap((X) => (X.queryServices ?? []).map((se) => se.id))
        ), K = y.find((X) => X.id === U.pageId);
        A.has(U.other) ? (K.buttons ?? []).some((X) => X.useCaseId === U.other) || this.command({ kind: "add-page-button", pageId: U.pageId, useCaseId: U.other }) : F.has(U.other) && this.command({ kind: "set-page-listing", pageId: U.pageId, queryServiceId: U.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, y, $] = o, T = (this.model.proxyApis ?? []).find((S) => S.id === $), O = (T == null ? void 0 : T.targetApiId) ?? ((R = (this.model.apiImplementations ?? []).find(
        (S) => S.moduleId === $ && (this.model.apis ?? []).some(
          (N) => N.id === S.apiId && N.operations.some((V) => V.id === y)
        )
      )) == null ? void 0 : R.apiId);
      if (!O) return;
      if (new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: O,
          operationId: y,
          moduleId: $,
          targetUseCaseId: t
        });
        return;
      }
      if (!(T != null && T.targetApiId)) return;
      let I = null;
      if (t === T.targetApiId)
        I = T.targetApiId;
      else {
        const S = /^apiimpl:(.+)@(.+)$/.exec(t);
        S && S[1] === T.targetApiId ? I = S[2] : this.model.modules.some((N) => N.id === t) && (this.model.apiImplementations ?? []).some(
          (N) => N.apiId === T.targetApiId && N.moduleId === t
        ) && (I = t);
      }
      if (!I) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (S) => S.proxyId === T.id && S.operationId === y && S.targetSiteId === I
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: T.id,
        operationId: y,
        targetSiteId: I
      });
      return;
    }
    const r = new Set((this.model.aiAgents ?? []).map((y) => y.id));
    if (r.has(e)) {
      if (new Set(
        this.model.modules.flatMap((I) => (I.useCases ?? []).map((v) => v.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (v) => v.agentId === e && v.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((I) => (I.useCases ?? []).map((v) => v.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (v) => v.agentId === e && v.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((I) => (I.mcpServers ?? []).map((v) => v.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (v) => v.agentId === e && v.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((I) => I.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (v) => v.agentId === e && v.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((I) => I.operations.map((v) => v.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (v) => v.agentId === e && v.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((I) => I.id === t) || (this.model.proxyApis ?? []).some((I) => I.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (v) => v.agentId === e && v.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((I) => (I.queryServices ?? []).map((v) => v.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (v) => v.agentId === e && v.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (r.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (v) => v.agentId === e && v.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((I) => I.id === t) && ((this.model.agentRags ?? []).some(
        (v) => v.agentId === e && v.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((y) => y.id === e)) {
      const y = (this.model.mcpGateways ?? []).find((O) => O.id === e), $ = this.model.externalSystems.some((O) => (O.mcpServers ?? []).some((h) => h.id === t)) || (this.model.apis ?? []).some((O) => O.id === t) || (this.model.apis ?? []).some((O) => O.operations.some((h) => h.id === t)) || this.model.modules.some((O) => (O.useCases ?? []).some((h) => h.id === t)) || (this.model.rags ?? []).some((O) => O.id === t), T = [
        ...y.mcpServerIds ?? [],
        ...y.apiIds ?? [],
        ...y.apiOperationIds ?? [],
        ...y.useCaseIds ?? [],
        ...y.ragIds ?? []
      ].includes(t);
      $ && !T && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((y) => y.id === t)) return;
    const l = (this.model.rags ?? []).find((y) => y.id === e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((T) => (T.readModels ?? []).map((O) => O.id))
      ).has(t) && !(l.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((T) => (T.tables ?? []).map((O) => O.id))
      ).has(t) && !(l.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((T) => T.id === t) || (this.model.proxyApis ?? []).some((T) => T.id === t)) && !(l.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((T) => T.id === t) && !(l.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((T) => T.id === t) && !(l.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((y) => y.id === t)) return;
    if ((this.model.workflows ?? []).some((y) => y.id === e)) {
      const y = (this.model.workflows ?? []).find((O) => O.id === e), $ = (this.model.workflows ?? []).find(
        (O) => O.id === t && O.id !== e
      );
      if ($) {
        const O = y.onCompletionEventName || `${y.name.replace(/\s+/g, "")}Completado`;
        $.triggerEvent !== O && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: O });
        return;
      }
      const T = this.model.modules.flatMap((O) => O.useCases ?? []).find((O) => O.id === t);
      if (T && !(y.steps ?? []).some((h) => h.targetUseCaseId === t)) {
        const h = `wfs-${te(T.name)}`;
        let I = h;
        for (let v = 2; (y.steps ?? []).some((S) => S.id === I); v++)
          I = `${h}-${v}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: I,
          name: T.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((y) => y.id === t)) {
      const y = this.model.modules.flatMap((O) => O.domainEvents ?? []).find((O) => O.id === e), $ = this.model.modules.flatMap((O) => O.applicationEvents ?? []).find((O) => O.id === e), T = y ?? $;
      if (T) {
        const O = (this.model.emissions ?? []).find((S) => S.domainEventId === e), h = new Set((this.model.aggregates ?? []).map((S) => S.id)), I = new Set(
          this.model.modules.flatMap((S) => (S.domainServices ?? []).map((N) => N.id))
        ), v = new Set(
          this.model.modules.flatMap((S) => (S.useCases ?? []).map((N) => N.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: T.name,
          triggerAggregateId: O && h.has(O.sourceId) ? O.sourceId : void 0,
          triggerDomainServiceId: O && I.has(O.sourceId) ? O.sourceId : void 0,
          triggerUseCaseId: O && v.has(O.sourceId) ? O.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((y) => y.id === e)) {
      const y = (this.model.proxyApis ?? []).find(($) => $.id === e);
      if ((this.model.apis ?? []).some(($) => $.id === t)) {
        y.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some(($) => $.id === t)) {
        if (!y.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (T) => T.apiId === y.targetApiId && T.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: y.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some(($) => $.id === t) && y.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((y) => y.id === e)) {
      if (this.model.externalSystems.some((y) => y.id === t)) {
        (this.model.apis ?? []).find(($) => $.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((y) => y.id === t) && ((this.model.apiImplementations ?? []).some(
        ($) => $.apiId === e && $.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const u = new Set((this.model.actors ?? []).map((y) => y.id));
    if (r.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap(($) => ($.domainEvents ?? []).map((T) => T.id)),
        ...this.model.modules.flatMap(($) => ($.applicationEvents ?? []).map((T) => T.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (T) => T.eventId === e && T.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!u.has(e)) return;
    }
    if (u.has(e)) {
      const y = new Set(
        this.model.modules.flatMap((T) => (T.useCases ?? []).map((O) => O.id))
      ), $ = new Set(
        this.model.modules.flatMap((T) => (T.queryServices ?? []).map((O) => O.id))
      );
      if (y.has(t) || $.has(t)) {
        (this.model.actorUses ?? []).some(
          (O) => O.actorId === e && O.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((T) => T.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((T) => T.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (O) => O.actorId === e && O.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((T) => T.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (O) => O.actorId === e && O.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const p = this.owningApiOf(e);
    if (p) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((T) => T.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some(($) => $.id === t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          moduleId: t
        });
        return;
      }
      return;
    }
    const a = this.model.externalSystems.flatMap((y) => y.useCases ?? []).find((y) => y.id === e), d = this.model.externalSystems.flatMap((y) => y.tables ?? []).find((y) => y.id === e);
    if (a || d) {
      const y = (a ?? d).name, $ = a ? { externalUseCaseId: e } : { externalTableId: e }, T = (I) => a ? I.sourceExternalUseCaseId === e : I.sourceExternalTableId === e, O = this.model.modules.flatMap((I) => I.readModels ?? []).find((I) => I.id === t);
      if (O) {
        (this.model.projections ?? []).some(
          (v) => T(v) && v.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${te(y)}-${te(O.name)}`,
          name: `${O.name}Projection`,
          ...$,
          targetId: t
        });
        return;
      }
      const h = this.model.modules.find((I) => I.id === t);
      if (h) {
        (this.model.projections ?? []).some(
          (v) => T(v) && v.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${te(y)}-${te(h.name)}`,
          name: `${y}ViewProjection`,
          ...$,
          moduleId: t,
          readModelName: `${y}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((y) => y.id === e);
    if (m) {
      const y = this.model.modules.flatMap((T) => T.readModels ?? []).find((T) => T.id === t);
      if (y) {
        (this.model.projections ?? []).some(
          (O) => O.sourceAggregateId === e && O.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${te(m.name)}-${te(y.name)}`,
          name: `${y.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const $ = this.model.modules.find((T) => T.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (O) => O.sourceAggregateId === e && O.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${te(m.name)}-${te($.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((y) => (y.domainEvents ?? []).map(($) => $.id))
    ), b = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((y) => y.id),
      ...this.model.modules.flatMap((y) => (y.domainServices ?? []).map(($) => $.id))
    ]), _ = new Set(
      this.model.modules.flatMap((y) => (y.applicationEvents ?? []).map(($) => $.id))
    ), g = new Set(this.model.modules.flatMap((y) => (y.useCases ?? []).map(($) => $.id))), k = new Set(
      this.model.modules.flatMap((y) => (y.queryServices ?? []).map(($) => $.id))
    );
    if (g.has(e) && k.has(t)) {
      (this.model.queryCalls ?? []).some(
        ($) => $.sourceId === e && $.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const P = new Set(
      this.model.externalSystems.flatMap((y) => (y.useCases ?? []).map(($) => $.id))
    );
    if (g.has(e) && P.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        ($) => $.sourceId === e && $.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && g.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        ($) => $.sourceId === e && $.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const M = this.model.modules.flatMap((y) => y.scheduledTriggers ?? []).find((y) => y.id === e);
    if (M && g.has(t)) {
      M.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (g.has(e) && (this.model.aggregates ?? []).some((y) => y.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        ($) => $.sourceId === e && $.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (b.has(e) && f.has(t) || g.has(e) && _.has(t)) {
      (this.model.emissions ?? []).some(
        ($) => $.sourceId === e && $.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || _.has(e)) {
      const y = _.has(e), $ = this.model.modules.flatMap((A) => (y ? A.applicationEvents : A.domainEvents) ?? []).find((A) => A.id === e), T = this.model.modules.flatMap((A) => (A.useCases ?? []).map((F) => ({ u: F, module: A }))).find(({ u: A }) => A.id === t), O = this.model.modules.flatMap((A) => (A.readModels ?? []).map((F) => ({ rm: F, module: A }))).find(({ rm: A }) => A.id === t), h = this.model.modules.find((A) => A.id === t) ?? (O == null ? void 0 : O.module) ?? (T == null ? void 0 : T.module);
      if (!$ || !h) return;
      const I = new Set((this.model.aggregates ?? []).map((A) => A.id)), v = new Set(
        this.model.modules.flatMap((A) => (A.domainServices ?? []).map((F) => F.id))
      ), S = (this.model.emissions ?? []).find(
        (A) => A.domainEventId === e && (y ? g.has(A.sourceId) : I.has(A.sourceId) || v.has(A.sourceId))
      );
      if (!S) {
        this.emit("modux-notice", {
          message: y ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const N = !y && I.has(S.sourceId);
      if (T) {
        if (this.model.flows.some(
          (F) => F.archetype === "TRIGGERS" && F.triggerEvent === $.name && F.targetUseCaseId === T.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${te($.name)}-${te(T.u.name)}`,
          name: T.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: N ? S.sourceId : "",
          triggerDomainServiceId: !y && !N ? S.sourceId : void 0,
          triggerUseCaseId: y ? S.sourceId : void 0,
          triggerEvent: $.name,
          targetId: h.id,
          targetUseCaseId: T.u.id
        });
        return;
      }
      const V = (O == null ? void 0 : O.rm.name) ?? `${$.name}View`;
      if (this.model.flows.some(
        (A) => A.archetype === "MATERIALIZES" && A.triggerEvent === $.name && A.targetId === h.id && A.readModelName === V
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${te($.name)}-${te(V)}`,
        name: V,
        archetype: "MATERIALIZES",
        triggerAggregateId: N ? S.sourceId : "",
        triggerDomainServiceId: !y && !N ? S.sourceId : void 0,
        triggerUseCaseId: y ? S.sourceId : void 0,
        triggerEvent: $.name,
        targetId: h.id,
        readModelName: V
      });
      return;
    }
    const w = /* @__PURE__ */ new Set([
      ...b,
      ...g,
      ...k,
      ...this.model.modules.flatMap((y) => (y.readModels ?? []).map(($) => $.id))
    ]);
    if (w.has(e) || w.has(t) || f.has(t) || _.has(t))
      return;
    const C = new Set(this.model.externalSystems.map((y) => y.id));
    if (C.has(e)) {
      if (new Set(
        this.model.modules.flatMap((h) => (h.useCases ?? []).map((I) => I.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (I) => I.externalSystemId === e && I.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (C.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const $ = (this.model.apis ?? []).find(
        (h) => h.operations.some((I) => I.id === t)
      ), T = /^apiop:(.+)@(.+)$/.exec(t), O = $ ? { operationId: t, siteId: $.id } : T ? { operationId: T[1], siteId: T[2] } : null;
      if (O) {
        (this.model.externalOperationUses ?? []).some(
          (I) => I.externalSystemId === e && I.operationId === O.operationId && I.siteId === O.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: O.operationId,
          targetSiteId: O.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((h) => h.id === t) || (this.model.proxyApis ?? []).some((h) => h.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (I) => I.sourceId === e && I.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    C.has(t) || u.has(t);
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
        else if (n = /^wizstep:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-wizard-step", pageId: n[1], targetId: n[2] });
        else if (n = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] });
        else if (n = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: n[1], queryServiceId: null });
        else if (n = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: n[1], modelId: null });
        else if (n = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: n[1], appId: n[2] });
        else if (n = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const o = me(n[1]);
          o && this.command({ kind: "set-menu-page", pageId: null, ...o });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const o = me(n[1]);
          o && this.command({ kind: "set-menu-app", toAppId: null, ...o });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const o = me(n[1]);
          o && this.command({ kind: "set-menu-use-case", useCaseId: null, ...o });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const o = me(n[1]);
          o && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...o });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const o = me(n[1]);
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
        const n = me(t);
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
      const [, o, r] = n, l = (s = (this.model.apis ?? []).find(
        (u) => u.operations.some((p) => p.id === o)
      )) == null ? void 0 : s.id;
      if (!l) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: l, operationId: o, moduleId: r });
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
      const [, o, r, l] = n, u = /^apiimpl:.+@(.+)$/.exec(l), p = u ? u[1] : l;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: r, operationId: o, targetSiteId: p });
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
      id: `step-${te(e)}`,
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
      id: `wfstep-${te(e)}`,
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
    const t = new Set(e.memberIds), i = (n, o, r = {}) => E`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(n) ? "implicit" : ""}"
        title=${r.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(l) => this.toggleViewMember(n, l.target.checked)}
        />
        ${o}
      </label>
    `, s = (n, o) => o.length ? E`<h4>${n}</h4>${o}` : "";
    return E`
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
            const n = me(i);
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
    const i = `view-${te(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((f) => f.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((f) => t.has(f.id)), s = new Set(i.map((f) => f.id)), n = this.model.externalSystems.filter((f) => t.has(f.id)), o = new Set(n.map((f) => f.id)), r = (this.model.aggregates ?? []).filter(
      (f) => t.has(f.id) || s.has(f.moduleId)
    ), l = new Set(r.map((f) => f.id)), u = (this.model.uiApps ?? []).filter((f) => t.has(f.id)), p = /* @__PURE__ */ new Set(), a = (f) => {
      for (const b of f ?? [])
        b.pageId && p.add(b.pageId), a(b.children);
    };
    u.forEach((f) => a(f.menuItems));
    const d = (this.model.pages ?? []).filter(
      (f) => t.has(f.id) || p.has(f.id)
    ), m = new Set(u.map((f) => f.id));
    return {
      ...this.model,
      uiApps: u,
      pages: d,
      actorAppUses: (this.model.actorAppUses ?? []).filter((f) => m.has(f.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (f) => s.has(f.sourceId) && s.has(f.targetId)
      ),
      flows: this.model.flows.filter(
        (f) => t.has(f.id) || (s.has(f.sourceId) || o.has(f.sourceId)) && (s.has(f.targetId) || o.has(f.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((f) => l.has(f.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (f) => l.has(f.sourceAggregateId) && l.has(f.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (f) => t.has(f.id) || (f.ownerModuleId ? s.has(f.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((f) => t.has(f.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((f) => t.has(f.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((f) => t.has(f.id)),
      rags: (this.model.rags ?? []).filter((f) => t.has(f.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((f) => t.has(f.id)),
      apis: (this.model.apis ?? []).filter(
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? o.has(f.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? o.has(f.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? Ql(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Xl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const r of o ?? [])
        r.id && t.add(r.id), i(r.children);
    };
    (this.model.uiApps ?? []).forEach((o) => i(o.menuItems));
    const s = `mi-${te(e)}`;
    let n = s;
    for (let o = 2; t.has(n); o++) n = `${s}-${o}`;
    return n;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, r) => {
      var u;
      const l = o ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (s = { node: l[p], parentId: r, beforeId: ((u = l[p + 1]) == null ? void 0 : u.id) ?? null }), n(l[p].children, l[p].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, o) {
    const r = o ?? this.allComponentIds(), l = (d) => {
      if (!n) return d.id;
      const m = `cmp-${te(d.kind)}`;
      let f = m;
      for (let b = 2; r.has(f) || r.has(`${f}-tab-1`); b++) f = `${m}-${b}`;
      return r.add(f), f;
    }, u = [], p = (d, m) => {
      const f = l(d);
      u.push({ kind: "add-page-component", pageId: e, componentId: f, componentKind: d.kind, parentComponentId: m }), d.kind === "tabLayout" && (u.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-1` }), u.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-2` })), u.push({
        kind: "set-page-component",
        pageId: e,
        componentId: f,
        title: d.title ?? null,
        text: d.text ?? null,
        label: d.label ?? null,
        useCaseId: d.useCaseId ?? null,
        mappingId: d.mappingId ?? null,
        modelId: d.modelId ?? null,
        queryServiceId: d.queryServiceId ?? null,
        queryOperationId: d.queryOperationId ?? null,
        fieldId: d.fieldId ?? null,
        stereotype: d.stereotype ?? null,
        colspan: d.colspan ?? null
      });
      for (const b of d.children ?? []) p(b, f);
      return f;
    }, a = p(t, i);
    return s && u.push({
      kind: "move-page-component",
      pageId: e,
      componentId: a,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: u, rootId: a };
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
      for (const r of o ?? [])
        t.add(r.id), i(r.children);
    };
    (this.model.pages ?? []).forEach((o) => i(o.content));
    const s = `cmp-${te(e)}`;
    let n = s;
    for (let o = 2; t.has(n) || t.has(`${n}-tab-1`); o++) n = `${s}-${o}`;
    return n;
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, r) => {
      var u;
      const l = o ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (s = { entry: l[p], parentId: r, beforeId: ((u = l[p + 1]) == null ? void 0 : u.id) ?? null }), n(l[p].children, l[p].id ?? null);
    };
    return n(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var r;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const l = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!l) return;
      t = this._selectedCmp.pageId, J.LEAF_KINDS.has(l.node.kind) ? (i = l.parentId ?? void 0, s = l.beforeId) : i = l.node.kind === "tabLayout" && e.kind !== "tab" ? (r = (l.node.children ?? [])[0]) == null ? void 0 : r.id : l.node.id;
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
    return E`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .selectedId=${this._selectedId}
      .selectedIds=${this._multi}
      .selectedCmp=${this._selectedCmp}
      @keydown=${this.onDesignKeydown}
      @page-component-selected=${(t) => {
      this._selectedCmp = t.detail.componentId ? { pageId: t.detail.pageId, componentId: t.detail.componentId } : null;
    }}
      @page-component-transferred=${this.onComponentTransferred}
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
      const { pageId: i, fieldId: s, stereotype: n, colspan: o, label: r } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: o, label: r });
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
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      return;
    }
    r.new ? this.createFromPalette(r.new, s, n, o) : r.existing && this.placeExistingFromPalette(r.existing, s, n, e.clientX, e.clientY, o);
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
      s.modules.flatMap((o) => (o.useCases ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.domainEvents ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.applicationEvents ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.readModels ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.domainServices ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.queryServices ?? []).map((r) => r.id)),
      s.modules.flatMap((o) => (o.scheduledTriggers ?? []).map((r) => r.id)),
      (s.aggregates ?? []).map((o) => o.id),
      (s.entities ?? []).map((o) => o.id),
      (s.actors ?? []).map((o) => o.id),
      s.externalSystems.map((o) => o.id),
      s.externalSystems.flatMap((o) => (o.useCases ?? []).map((r) => r.id)),
      s.externalSystems.flatMap((o) => (o.tables ?? []).map((r) => r.id)),
      s.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((r) => r.id)),
      (s.apis ?? []).map((o) => o.id),
      (s.apis ?? []).flatMap((o) => (o.operations ?? []).map((r) => r.id)),
      (s.proxyApis ?? []).map((o) => o.id),
      (s.aiAgents ?? []).map((o) => o.id),
      (s.mcpGateways ?? []).map((o) => o.id),
      (s.rags ?? []).map((o) => o.id),
      (s.workflows ?? []).map((o) => o.id),
      (s.workflows ?? []).flatMap((o) => (o.steps ?? []).map((r) => r.id)),
      (s.uiApps ?? []).map((o) => o.id),
      (s.pages ?? []).map((o) => o.id)
    ])
      n.forEach((o) => i.add(o));
    for (let n = 1; ; n++) {
      const o = n === 1 ? e : `${e} ${n}`, r = `${t}${te(o)}`;
      if (!i.has(r)) return { id: r, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, r;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let l = t; l; )
      s.push(l), l = (o = i.nodes.find((u) => u.id === l)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service",
      "scheduled-trigger"
    ].includes(e)) return s.find((l) => this.model.modules.some((u) => u.id === l)) ?? null;
    if (e === "read-model") {
      const l = s.find((p) => (this.model.aggregates ?? []).some((a) => a.id === p));
      if (l) return l;
      const u = s.find((p) => this.model.modules.some((a) => a.id === p));
      return ((r = (this.model.aggregates ?? []).find((p) => p.moduleId === u)) == null ? void 0 : r.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((l) => this.model.externalSystems.some((u) => u.id === l)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (l) => this.model.modules.some((u) => (u.useCases ?? []).some((p) => p.id === l))
      ) ?? null;
    if (e === "api-operation") {
      for (const l of s) {
        if ((this.model.apis ?? []).some((a) => a.id === l)) return l;
        const u = /^apiimpl:(.+)@(.+)$/.exec(l);
        if (u && (this.model.apis ?? []).some((a) => a.id === u[1])) return u[1];
        const p = (this.model.proxyApis ?? []).find((a) => a.id === l);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((l) => this.model.externalSystems.some((u) => u.id === l)) ?? s.find((l) => this.model.modules.some((u) => u.id === l)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var f, b, _, g, k, P;
    const n = H.PALETTE_NEW.find((M) => M.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const M = e.slice(4), w = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, C = w ? w[1] : i && (this.model.pages ?? []).some((y) => y.id === i) ? i : null;
      if (!C) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let x = w ? w[2] : void 0, z = null;
      if (M === "tab") {
        let y = null, $ = x ? this.componentIn(C, x) : null;
        for (; $; ) {
          if ($.node.kind === "tabLayout") {
            y = $.node.id;
            break;
          }
          $ = $.parentId ? this.componentIn(C, $.parentId) : null;
        }
        if (!y) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const T = this.componentIn(C, y).node, O = this.newComponentId("tab"), h = `Pestaña ${(T.children ?? []).filter((I) => I.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: C, componentId: O, componentKind: "tab", parentComponentId: y }, !1), this.command({ kind: "set-page-component", pageId: C, componentId: O, title: h }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: C, componentId: O }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const y = this.componentIn(C, s.componentId);
        y && y.node.kind === "tab" ? x = y.node.id : y && (x = y.parentId ?? void 0, z = s.pos === "before" ? s.componentId : y.beforeId);
      } else if (x) {
        const y = ((f = this.componentIn(C, x)) == null ? void 0 : f.node) ?? null;
        (y == null ? void 0 : y.kind) === "tabLayout" && (y.children ?? [])[0] && (x = (y.children ?? [])[0].id);
      }
      const D = this.newComponentId(M), R = {
        kind: "add-page-component",
        pageId: C,
        componentId: D,
        componentKind: M,
        parentComponentId: x
      };
      if (!z) {
        this.command(R);
        return;
      }
      this.command(R, !1), this.command(
        { kind: "move-page-component", pageId: C, componentId: D, parentComponentId: x ?? null, beforeComponentId: z },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: C, componentId: D }]);
      return;
    }
    const o = this._view, r = this.sceneFor(o), l = (M, w) => {
      const C = this.viewLayout(o), x = w ? r.nodes.find((D) => D.id === w) : void 0, z = x ? { x: Math.round(t.x - x.x), y: Math.round(t.y - x.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...C, nodes: { ...C.nodes, [M]: z } }), { kind: "move-node", view: o, id: M, pos: null };
    }, u = (M, w, C) => {
      const x = this.inverseOf(M) ?? [];
      this.command(M, !1);
      const z = l(w, C);
      this.pushUndoEntry([...x, z]);
    };
    if (!n.child) {
      const M = {
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
      }, { id: w, name: C } = this.uniquePaletteName(n.label, M[e] ?? ""), x = e === "module" ? { kind: "add-module", id: w, name: C, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: w, name: C } : e === "external-system" ? { kind: "add-external-system", id: w, name: C } : e === "ai-agent" ? { kind: "add-ai-agent", id: w, name: C } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: w, name: C, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: w, name: C } : e === "rag" ? { kind: "add-rag", id: w, name: C } : e === "api" ? { kind: "add-api", id: w, name: C } : e === "proxy-api" ? { kind: "add-proxy-api", id: w, name: C } : e === "ui-app" ? { kind: "create-ui-app", id: w, name: C } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: w, name: C, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: w, name: C, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: w, name: C, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: w, name: C } : {
        kind: "add-workflow",
        id: w,
        name: C,
        completionEventName: `${C.replace(/\s+/g, "")}Completado`
      };
      u(x, w);
      return;
    }
    if (e === "ui-wizard-step") {
      const M = [];
      for (let D = i ?? void 0; D; )
        M.push(D), D = (b = r.nodes.find((R) => R.id === D)) == null ? void 0 : b.parentId;
      const w = M.map((D) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(D)) == null ? void 0 : R[1]) ?? D;
      }).find((D) => (this.model.pages ?? []).some((R) => R.id === D && R.type === "WIZARD"));
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const C = ((_ = (this.model.pages ?? []).find((D) => D.id === w)) == null ? void 0 : _.wizardSteps) ?? [], x = new Set(C.map((D) => D.id ?? D.pageId));
      let z = C.length + 1;
      for (; x.has(`wzs-${z}`); ) z++;
      this.command({ kind: "add-page-wizard-step", pageId: w, itemId: `wzs-${z}`, label: `Paso ${z}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const M = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", w = M === "CRUD" ? "CRUD" : M === "WIZARD" ? "Wizard" : "Página", { id: C, name: x } = this.uniquePaletteName(w, "page-"), z = [];
      for (let y = i ?? void 0; y; )
        z.push(y), y = (g = r.nodes.find(($) => $.id === y)) == null ? void 0 : g.parentId;
      const D = z.find((y) => (this.model.uiApps ?? []).some(($) => $.id === y)), R = z.map((y) => {
        var $;
        return (($ = /^wizrow:([^:]+):/.exec(y)) == null ? void 0 : $[1]) ?? y;
      }).find((y) => (this.model.pages ?? []).some(($) => $.id === y && $.type === "WIZARD"));
      if (R) {
        const y = r.nodes.find((T) => T.id === R);
        y && (t.x = y.x + y.w / 2 + 160, t.y = y.y - y.h / 2 + 40), this.command({ kind: "create-ui-page", id: C, name: x, pageType: M }, !1), this.command({ kind: "add-page-wizard-step", pageId: R, targetId: C }, !1);
        const $ = l(C);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: C }, $]), this.emit("modux-notice", { message: `${x} creada como paso del wizard` });
        return;
      }
      if (D) {
        const y = r.nodes.find(($) => $.id === D);
        y && (t.x = y.x + y.w / 2 + 160, t.y = y.y - y.h / 2 + 40);
      }
      u(
        D ? { kind: "create-ui-page", id: C, name: x, pageType: M, appId: D, menuLabel: x } : { kind: "create-ui-page", id: C, name: x, pageType: M },
        C
      );
      return;
    }
    if (e === "menu-item") {
      const M = [];
      for (let R = i ?? void 0; R; )
        M.push(R), R = (k = r.nodes.find((y) => y.id === R)) == null ? void 0 : k.parentId;
      const w = M.find((R) => (this.model.uiApps ?? []).some((y) => y.id === R));
      if (!w) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const C = /* @__PURE__ */ new Set(), x = (R) => {
        for (const y of R ?? [])
          C.add(y.label), x(y.children);
      };
      (this.model.uiApps ?? []).forEach((R) => x(R.menuItems));
      let z = "Entrada";
      for (let R = 2; C.has(z); R++) z = `Entrada ${R}`;
      const D = M.map((R) => me(R)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: w,
        label: z,
        itemId: this.newMenuItemId(z),
        parentId: D == null ? void 0 : D.itemId,
        parentLabel: D != null && D.itemId || D == null ? void 0 : D.label
      });
      return;
    }
    if (e === "workflow-step") {
      const M = this.model.workflows ?? [], w = [];
      for (let y = i ?? void 0; y; )
        w.push(y), y = (P = r.nodes.find(($) => $.id === y)) == null ? void 0 : P.parentId;
      const C = w.map((y) => M.find(($) => $.id === y)).find(Boolean), x = w.map((y) => {
        const $ = M.find((T) => (T.steps ?? []).some((O) => O.id === y));
        return $ ? { owner: $, stepId: y } : null;
      }).find(Boolean), z = C ?? (x == null ? void 0 : x.owner);
      if (!z) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: D, name: R } = this.uniquePaletteName("Paso", "wfs-");
      x && (t = { x: t.x + 190, y: t.y }), u(
        {
          kind: "add-workflow-step",
          workflowId: z.id,
          id: D,
          name: R,
          ...x ? { dependsOnStepIds: [x.stepId], afterStepId: x.stepId } : {}
        },
        D
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${z.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const M = this.dropContainerFor("api", i);
      if (!M) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: w, name: C } = this.uniquePaletteName("API", "api-"), x = { kind: "add-api", id: w, name: C }, z = this.inverseOf(x) ?? [];
      this.command(x, !1), this.model.externalSystems.some(($) => $.id === M) ? this.command({ kind: "set-api-publisher", id: w, targetId: M }, !1) : this.command({ kind: "add-api-implementation", apiId: w, moduleId: M }, !1);
      const D = this.viewLayout(this._view), R = this.sceneFor(this._view).nodes.find(($) => $.id === M), y = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...D, nodes: { ...D.nodes, [w]: y } }), this.pushUndoEntry([...z, { kind: "move-node", view: this._view, id: w, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, i);
    if (!p) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const a = {
      aggregate: "agg-",
      "use-case": "uc-",
      policy: "uc-",
      "domain-event": "ev-",
      "application-event": "aev-",
      "domain-service": "ds-",
      "query-service": "qs-",
      "scheduled-trigger": "st-",
      "read-model": "rm-",
      "external-use-case": "xuc-",
      "external-table": "tbl-",
      "mcp-server": "mcpsrv-"
    }, { id: d, name: m } = this.uniquePaletteName(n.label, a[e] ?? "");
    if (e === "aggregate")
      u({ kind: "add-aggregate", id: d, name: m, moduleId: p }, d, p);
    else if (e === "use-case" || e === "policy")
      u(
        { kind: "add-use-case", id: d, name: m, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        d,
        p
      );
    else if (e === "domain-event")
      u({ kind: "add-domain-event", id: d, name: m, moduleId: p }, d, p);
    else if (e === "application-event")
      u({ kind: "add-application-event", id: d, name: m, moduleId: p }, d, p);
    else if (e === "domain-service")
      u({ kind: "add-domain-service", id: d, name: m, moduleId: p }, d, p);
    else if (e === "query-service")
      u({ kind: "add-query-service", id: d, name: m, moduleId: p }, d, p);
    else if (e === "scheduled-trigger")
      u({ kind: "add-scheduled-trigger", id: d, name: m, moduleId: p }, d, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "read-model") {
      const M = (this.model.aggregates ?? []).find((w) => w.id === p);
      u({ kind: "add-read-model", id: d, name: m, aggregateId: p }, d, (M == null ? void 0 : M.moduleId) ?? p);
    } else if (e === "api-operation") {
      const M = (this.model.apis ?? []).find((D) => D.id === p), w = new Set(((M == null ? void 0 : M.operations) ?? []).map((D) => D.id));
      let C = m, x = `apiop-${p.replace(/^api-/, "")}-${te(C)}`;
      for (let D = 2; w.has(x); D++)
        C = `${n.label} ${D}`, x = `apiop-${p.replace(/^api-/, "")}-${te(C)}`;
      u({ kind: "add-api-operation", apiId: p, id: x, name: C }, x, p), r.nodes.some(
        (D) => D.parentId === p && (D.kind === "api-operation" || D.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(M == null ? void 0 : M.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const M = this.model.modules.flatMap((z) => z.useCases ?? []).find((z) => z.id === p), w = new Set((M == null ? void 0 : M.stepIds) ?? []);
      let C = m, x = `step-${te(C)}`;
      for (let z = 2; w.has(x); z++)
        C = `${n.label} ${z}`, x = `step-${te(C)}`;
      u({ kind: "add-use-case-step", useCaseId: p, id: x, name: C }, x, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(M == null ? void 0 : M.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? u({ kind: "add-external-use-case", id: d, name: m, moduleId: p }, d, p) : e === "external-table" ? u({ kind: "add-external-table", id: d, name: m, moduleId: p }, d, p) : e === "mcp-server" && u({ kind: "add-mcp-server", id: d, name: m, moduleId: p }, d, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var p;
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, n = s ? s[1] : t && (this.model.pages ?? []).some((a) => a.id === t) ? t : null;
    if (!n) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const o = s ? ((p = this.componentIn(n, s[2])) == null ? void 0 : p.node) ?? null : null, r = this.model.modules.flatMap((a) => a.useCases ?? []).find((a) => a.id === e);
    if (r) {
      (o == null ? void 0 : o.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: o.id, useCaseId: e, label: o.label ?? r.name }), this.emit("modux-notice", { message: `El botón lanza ${r.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${r.name} añadido a la página` }));
      return;
    }
    const l = (this.model.models ?? []).find((a) => a.id === e);
    if (l) {
      (o == null ? void 0 : o.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: n, componentId: o.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${l.name}` })) : (this.command({ kind: "set-page-model", pageId: n, modelId: e }), this.emit("modux-notice", { message: `${l.name} es el viewmodel de la página` }));
      return;
    }
    const u = this.model.modules.flatMap((a) => (a.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((m) => ({ op: m, qs: d })))).find(({ op: a }) => a.id === e);
    if (u) {
      (o == null ? void 0 : o.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: n,
        componentId: o.id,
        queryOperationId: u.op.id,
        queryServiceId: u.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: n, queryServiceId: u.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${u.op.name}` });
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
    const r = this._view, l = this.sceneFor(r), u = l.nodes.find((m) => m.id === e);
    if (!u) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const m = this.viewLayout(r);
        this.writeViewLayout(r, {
          ...m,
          nodes: { ...m.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(r), a = u.parentId ? l.nodes.find((m) => m.id === u.parentId) : void 0, d = a ? { x: Math.round(t.x - a.x), y: Math.round(t.y - a.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: r, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(r, { ...p, nodes: { ...p.nodes, [e]: d } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = H.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return E`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? E`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${H.PALETTE_GROUPS.map((s) => {
      const n = t.filter((o) => o.group === s);
      return n.length ? E`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (o) => E`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(r) => this.onPaletteDragStart(r, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${rt[o.symbol]}
                              </svg>
                              <span class="pal-label">${o.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : E`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => E`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (n) => E`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${rt[s.symbol]}
                          </svg>
                          <span class="pal-label">${n.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : E`
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
    var t, i, s, n, o, r, l;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const u = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!u) return;
        this.command({ kind: "add-aggregate", id: `agg-${te(e)}`, name: e, moduleId: u });
      } else if (this._view === "flows") {
        const u = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), a = this._newTriggerEvent.trim();
        if (!u || !p || !a) return;
        this.command({
          kind: "add-flow",
          id: `flow-${te(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: u,
          triggerEvent: a,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const u = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!u) return;
        this.command({
          kind: "add-process",
          id: `proc-${te(e)}`,
          name: e,
          moduleId: u,
          triggerAggregateId: this._newTriggerAggId || ((l = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : l.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? ro(i, t.nodes) : e === "flows" ? Io(i, t.nodes) : e === "processes" ? sn(i, t.nodes) : e === "workflows" ? Cl(i, t.nodes) : e === "ui" ? Nl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "eventstorming" ? wl(i, t.nodes) : eo(
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
    var u;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), n = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, r = await Rl(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), l = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((p) => ({
        kind: "move-node",
        view: e,
        id: p.id,
        pos: l.nodes[p.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(l.edges).map((p) => ({
        kind: "set-edge-points",
        view: e,
        id: p,
        points: l.edges[p]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: l.sizes }), await this.updateComplete, (u = this.renderRoot.querySelector("modux-canvas")) == null || u.fit();
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
    return E`
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
      (t) => E`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? E`
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
      (t) => E`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? E`
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
        ${this._view === "aggregates" || this._view === "processes" ? E`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return E`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? E`
              ${this._view === "flows" ? E`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => E`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return E`<option
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
              ${this._view === "flows" ? E`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return E`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? E`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => E`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? E`
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
      (t) => E`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? E`<input
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
              ${this.owningProcessOf(this._selectedId) ? E`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? E`
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
      (t) => E`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? E`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => E`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this._view === "design" ? E`${this.renderPalette()}${this.renderFigma()}` : this._tilt ? E`
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
          ></modux-tilt>` : E`
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
        ${this._view === "context-map" ? E`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? E`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? E`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : E`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? E`
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
      ([t, i]) => E`
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
    return E`
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
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => E`
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
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${jl.map(
      (s) => E`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${qi[s].abbr}</span>
              <span class="name">${qi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
H.styles = mt`
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
H.PALETTE_GROUPS = [
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
H.PALETTE_NEW = [
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
Y([
  ee({ attribute: !1 })
], H.prototype, "model", 2);
Y([
  ee({ attribute: !1 })
], H.prototype, "layout", 2);
Y([
  ee({ attribute: !1 })
], H.prototype, "diff", 2);
Y([
  q()
], H.prototype, "_view", 2);
Y([
  q()
], H.prototype, "_detail", 2);
Y([
  q()
], H.prototype, "_relationType", 2);
Y([
  q()
], H.prototype, "_relationPicker", 2);
Y([
  q()
], H.prototype, "_extDepPicker", 2);
Y([
  q()
], H.prototype, "_selectedId", 2);
Y([
  q()
], H.prototype, "_paletteOpen", 2);
Y([
  q()
], H.prototype, "_paletteFilter", 2);
Y([
  q()
], H.prototype, "_paletteTab", 2);
Y([
  q()
], H.prototype, "_selectedCmp", 2);
Y([
  q()
], H.prototype, "_fullscreen", 2);
Y([
  q()
], H.prototype, "_tilt", 2);
Y([
  q()
], H.prototype, "_helpOpen", 2);
Y([
  q()
], H.prototype, "_newName", 2);
Y([
  q()
], H.prototype, "_newModuleId", 2);
Y([
  q()
], H.prototype, "_newArchetype", 2);
Y([
  q()
], H.prototype, "_newTriggerAggId", 2);
Y([
  q()
], H.prototype, "_newTriggerEvent", 2);
Y([
  q()
], H.prototype, "_newTargetId", 2);
Y([
  q()
], H.prototype, "_undoStack", 2);
Y([
  q()
], H.prototype, "_redoStack", 2);
Y([
  q()
], H.prototype, "_newStepName", 2);
Y([
  q()
], H.prototype, "_newStepType", 2);
Y([
  q()
], H.prototype, "_newStepRole", 2);
Y([
  q()
], H.prototype, "_newStepDeadline", 2);
Y([
  q()
], H.prototype, "_editStepRole", 2);
Y([
  q()
], H.prototype, "_editStepDeadline", 2);
Y([
  q()
], H.prototype, "_editStepComp", 2);
Y([
  q()
], H.prototype, "_newStepUseCase", 2);
Y([
  q()
], H.prototype, "_newStepEmits", 2);
Y([
  q()
], H.prototype, "_editStepUseCase", 2);
Y([
  q()
], H.prototype, "_editStepEmits", 2);
Y([
  q()
], H.prototype, "_editStepAwaits", 2);
Y([
  q()
], H.prototype, "_multi", 2);
Y([
  q()
], H.prototype, "_newViewName", 2);
Y([
  q()
], H.prototype, "_activeViewId", 2);
Y([
  q()
], H.prototype, "_newRagSourceType", 2);
Y([
  q()
], H.prototype, "_newRagSourceUri", 2);
Y([
  q()
], H.prototype, "_addMemberKey", 2);
Y([
  q()
], H.prototype, "_treeOpen", 2);
Y([
  q()
], H.prototype, "_deletePicker", 2);
H = Y([
  ht("modux-editor")
], H);
var Zl = Object.defineProperty, Jl = Object.getOwnPropertyDescriptor, be = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Jl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (s ? r(t, i, n) : r(n)) || n);
  return s && n && Zl(t, i, n), n;
};
let he = class extends Oe {
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
    ], t = (s) => he.TYPE_LABELS[s] ?? s;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: o, cls: r }) => {
      const l = this._diff.changes.filter((u) => u.kind === s);
      return l.length ? E`
            <div class="diff-group">${n} (${l.length})</div>
            ${l.map(
        (u) => E`
                <div class="diff-row">
                  <span class="diff-mark ${r}">${o}</span>
                  <span class="diff-type">${t(u.type)}</span>
                  <span class="diff-name" title=${u.id}>${u.name ?? u.id}</span>
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
    var n, o, r;
    const i = (n = this._workspace) == null ? void 0 : n.current;
    await this.trackWrite(async () => {
      var l;
      try {
        const u = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!u.ok) {
          let p = `El servidor rechazó la operación (${u.status})`;
          try {
            const a = await u.json();
            a != null && a.message && (p = a.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        this._workspace = await u.json(), await this.reload(), await this.refreshDiff(), (l = this.renderRoot.querySelector("modux-editor")) == null || l.clearHistory();
      } catch (u) {
        this.showToast(String(u));
      }
    });
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const l = ((r = this._workspace.solutions.find((u) => u.branch === s)) == null ? void 0 : r.name) ?? s.replace(/^solution\//, "");
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
        const r = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!r.ok) {
          let a = `El servidor rechazó el contrato (${r.status})`;
          try {
            const d = await r.json();
            d != null && d.message && (a = d.message);
          } catch {
          }
          this.showToast(a);
          return;
        }
        const { apiId: l } = await r.json(), u = n ? { kind: "set-api-publisher", id: l, targetId: n } : o ? { kind: "add-api-implementation", apiId: l, moduleId: o } : null;
        u && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(u)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${l}`, "info");
      } catch (r) {
        this.showToast(String(r));
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
    return this._error ? E`<div class="status error">modux editor: ${this._error}</div>` : this._model ? E`
      ${this._workspace ? E`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : E`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((n) => n.kind === s).length;
      return E`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? E`
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
      return E`
                      ${i === "EXPLORING" ? E`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? E`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? E`<button
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
      ${this._mergeFlow ? E`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => E`
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
      ${this._toast ? E`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : E`<div class="status">Cargando el modelo…</div>`;
  }
};
he.styles = mt`
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
he.TYPE_LABELS = {
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
be([
  ee()
], he.prototype, "base", 2);
be([
  q()
], he.prototype, "_model", 2);
be([
  q()
], he.prototype, "_layout", 2);
be([
  q()
], he.prototype, "_error", 2);
be([
  q()
], he.prototype, "_saving", 2);
be([
  q()
], he.prototype, "_toast", 2);
be([
  q()
], he.prototype, "_workspace", 2);
be([
  q()
], he.prototype, "_creatingSolution", 2);
be([
  q()
], he.prototype, "_newSolutionName", 2);
be([
  q()
], he.prototype, "_diff", 2);
be([
  q()
], he.prototype, "_diffListOpen", 2);
be([
  q()
], he.prototype, "_mergeFlow", 2);
he = be([
  ht("modux-editor-connected")
], he);
export {
  ec as CONTAINER_HEADER,
  tc as CONTAINER_INSET,
  de as ModuxCanvas,
  H as ModuxEditor,
  he as ModuxEditorConnected,
  ro as aggregatesScene,
  je as apiImplNodeId,
  Ye as apiOpOccurrenceId,
  Ci as containerFit,
  Bs as containerMinSize,
  eo as contextMapScene,
  Qs as flowCoherence,
  Io as flowsScene,
  Bt as normalizeViewLayout,
  sn as processesScene,
  Xs as relationEdgeId,
  Fi as resolveOverlaps
};
