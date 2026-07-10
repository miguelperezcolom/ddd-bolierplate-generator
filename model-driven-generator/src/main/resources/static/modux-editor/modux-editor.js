const ec = 34, tc = 10;
function zi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let a = !1;
    for (let d = 0; d < e.length; d++)
      for (let o = d + 1; o < e.length; o++) {
        const r = e[d], l = e[o], u = i.get(r.id), m = i.get(l.id), f = m.x - u.x, h = m.y - u.y, w = (r.w + l.w) / 2 + t - Math.abs(f), g = (r.h + l.h) / 2 + t - Math.abs(h);
        if (!(w <= 0 || g <= 0))
          if (a = !0, w < g) {
            const y = (f >= 0 ? 1 : -1) * w / 2;
            u.x -= y, m.x += y;
          } else {
            const y = (h >= 0 ? 1 : -1) * g / 2;
            u.y -= y, m.y += y;
          }
      }
    if (!a) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = i.get(n.id);
    (Math.abs(a.x - n.x) > 0.5 || Math.abs(a.y - n.y) > 0.5) && s.set(n.id, a);
  }
  return s;
}
function Hs(e, t = { w: 160, h: 90 }) {
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
function Ei(e, t, i) {
  let s = t.w / 2, n = t.w / 2, a = t.h / 2, d = t.h / 2;
  for (const o of i)
    s = Math.max(s, -o.dx + o.w / 2 + 10), n = Math.max(n, o.dx + o.w / 2 + 10), a = Math.max(a, -o.dy + o.h / 2 + 34), d = Math.max(d, o.dy + o.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (d - a) / 2,
    w: s + n,
    h: a + d
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
}, js = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, it = 168, nt = 56;
function Ge(e, t) {
  return `apiimpl:${e}@${t}`;
}
function We(e, t) {
  return `apiop:${e}@${t}`;
}
const Ji = { compact: 0, coarse: 1, full: 2 };
function en(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: Ji[e ? t : s] > Ji[n] };
}
function qn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: Ge(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Fn = 34, Bn = 14, Ys = 14, $e = 108, Ee = 32, Vn = 12, Hn = 10, At = 2, Ks = At * $e + (At - 1) * Vn + 2 * Bn;
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
function It(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Zs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Wn = {
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
}, Si = {
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
function Ci(e) {
  const t = Math.max(1, Math.ceil(e / At)), i = t * Ee + (t - 1) * Hn;
  return { w: Ks, h: Fn + i + Ys };
}
function Kt(e, t) {
  const i = e % At, s = Math.floor(e / At);
  return {
    x: -t.w / 2 + Bn + i * ($e + Vn) + $e / 2,
    y: -t.h / 2 + Fn + s * (Ee + Hn) + Ee / 2
  };
}
function Js(e, t, i, s, n, a, d = !1) {
  const o = (e.aggregates ?? []).filter((l) => l.moduleId === t.id), r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...qn(e, t.id),
    ...o.map((l) => ({ id: l.id, name: l.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "use-case", policy: l.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "query-service" })
    ),
    ...(t.scheduledTriggers ?? []).map(
      (l) => ({ id: l.id, name: l.name, kind: "scheduled-trigger" })
    )
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: it, h: nt }];
  if (d) {
    const l = new Map((e.apis ?? []).map((m) => [m.id, m])), u = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && l.has(m.apiId)).map((m) => {
      const f = l.get(m.apiId);
      return {
        id: Ge(m.apiId, m.moduleId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((h) => ({
          id: We(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (u.length > 0) {
      const m = r.filter((f) => f.kind !== "api-impl");
      return Gn(i, s, u, m, n, a);
    }
  }
  return _t(i, s, r, n, a);
}
function Gn(e, t, i, s, n, a, d = /* @__PURE__ */ new Set()) {
  const o = a[t.id] ?? Ci(i.length + s.length), r = i.map((h, w) => {
    const g = n[h.id] ?? Kt(w, o), y = d.has(h.id) ? [] : h.ops, x = a[h.id] ?? Ci(y.length), b = y.map((C, N) => n[C.id] ?? Kt(N, x)), P = Ei(
      { x: g.x, y: g.y },
      x,
      b.map((C) => ({ dx: C.x, dy: C.y, w: $e, h: Ee }))
    );
    return { a: h, off: g, ops: y, opOffs: b, fit: P };
  }), l = s.map(
    (h, w) => n[h.id] ?? Kt(i.length + w, o)
  ), u = zi(
    [
      ...r.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, w) => ({
        id: h.id,
        x: l[w].x,
        y: l[w].y,
        w: $e,
        h: Ee
      }))
    ],
    24
  );
  for (const h of r) {
    const w = u.get(h.a.id);
    w && (h.off = { x: h.off.x + (w.x - h.fit.x), y: h.off.y + (w.y - h.fit.y) }, h.fit = { ...h.fit, x: w.x, y: w.y });
  }
  s.forEach((h, w) => {
    const g = u.get(h.id);
    g && (l[w] = { x: g.x, y: g.y });
  });
  const m = Ei(e, o, [
    ...r.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...l.map((h) => ({ dx: h.x, dy: h.y, w: $e, h: Ee }))
  ]), f = [
    { ...t, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const h of r)
    f.push({
      id: h.a.id,
      label: h.a.name,
      kind: h.a.kind,
      symbol: "interface",
      fill: h.a.fill,
      stroke: h.a.stroke,
      badge: h.a.badge,
      container: !0,
      collapsible: h.a.ops.length > 0 || d.has(h.a.id),
      collapsed: d.has(h.a.id),
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((w, g) => {
      f.push({
        id: w.id,
        label: w.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[g].x,
        y: e.y + h.off.y + h.opOffs[g].y,
        w: $e,
        h: Ee,
        tooltip: `${Si[h.a.opKind]}: ${w.name}`
      });
    });
  return s.forEach((h, w) => {
    const g = Wn[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + l[w].x,
      y: e.y + l[w].y,
      w: $e,
      h: Ee,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${Si[h.kind]} ${h.name}`
    });
  }), f;
}
function _t(e, t, i, s, n) {
  const a = n[t.id] ?? Ci(i.length), d = i.map((m, f) => s[m.id] ?? Kt(f, a)), o = zi(
    i.map((m, f) => ({ id: m.id, x: d[f].x, y: d[f].y, w: $e, h: Ee })),
    10
  );
  i.forEach((m, f) => {
    const h = o.get(m.id);
    h && (d[f] = { x: h.x, y: h.y });
  });
  const r = Ei(
    e,
    a,
    d.map((m) => ({ dx: m.x, dy: m.y, w: $e, h: Ee }))
  ), l = {
    ...t,
    x: r.x,
    y: r.y,
    w: r.w,
    h: r.h,
    container: !0
  }, u = i.map((m, f) => {
    const h = d[f], w = m.policy ? Zs : Wn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: $e,
      h: Ee,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Si[m.kind]} ${m.name}`
    };
  });
  return [l, ...u];
}
function eo(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const a = n, d = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((c) => c.id)), l = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), u = new Set(l.map((c) => c.id)), m = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), f = new Set(m.map((c) => c.id)), h = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !u.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !f.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], w = h.flatMap((c, T) => {
    const V = t[c.ref.id] ?? It(T, h.length);
    if ("workflow" in c && c.workflow) {
      const X = c.ref;
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
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    if (c.proxy) {
      const X = c.ref, ne = {
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
        const Ne = (e.apis ?? []).find((et) => et.id === X.targetApiId), Re = (Ne == null ? void 0 : Ne.operations) ?? [];
        if (Re.length > 0)
          return _t(
            V,
            ne,
            Re.map((et) => ({
              id: We(et.id, X.id),
              name: et.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...ne, x: V.x, y: V.y, w: it, h: nt }];
    }
    if (c.api) {
      const X = c.ref, ne = {
        id: X.id,
        label: X.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${X.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(X.id) ? !d : d) && X.operations.length > 0 ? _t(
        V,
        { ...ne, collapsible: !0, collapsed: !1 },
        X.operations.map(
          (Re) => ({ id: Re.id, name: Re.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...ne,
        collapsible: X.operations.length > 0,
        collapsed: X.operations.length > 0,
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    if (c.external) {
      const X = c.ref, ne = {
        id: X.id,
        label: X.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${X.name} (sistema externo)`
      }, Ne = l.filter((se) => se.publishedByExternalSystemId === X.id), Re = m.filter((se) => se.publishedByExternalSystemId === X.id), et = Re.map(
        (se) => ({ id: se.id, name: se.name, kind: "proxy-api" })
      ), hi = [
        ...(X.useCases ?? []).map(
          (se) => ({ id: se.id, name: se.name, kind: "external-use-case" })
        ),
        ...(X.tables ?? []).map(
          (se) => ({ id: se.id, name: se.name, kind: "external-table" })
        ),
        ...(X.mcpServers ?? []).map(
          (se) => ({ id: se.id, name: se.name, kind: "mcp-server" })
        )
      ], mi = Ne.length > 0 || Re.length > 0, fi = mi || hi.length > 0, { form: qt, collapsed: gi } = en(
        n.has(X.id),
        d ? "full" : mi ? "coarse" : "compact",
        hi.length > 0 || o && mi
      ), Qi = [
        ...et,
        ...qt === "full" ? hi : []
      ], yi = o && qt === "full" ? Re.filter((se) => {
        const gt = se.targetApiId ? (e.apis ?? []).find((ue) => ue.id === se.targetApiId) : void 0;
        return ((gt == null ? void 0 : gt.operations) ?? []).length > 0;
      }) : [];
      if (o && qt === "full" && (Ne.length > 0 || yi.length > 0)) {
        const se = [
          ...Ne.map((ue) => ({
            id: ue.id,
            name: ue.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ue.name} — API publicada por ${X.name}`,
            opKind: "api-operation",
            ops: (ue.operations ?? []).map((yt) => ({ id: yt.id, name: yt.name }))
          })),
          ...yi.map((ue) => {
            const yt = (e.apis ?? []).find((Ft) => Ft.id === ue.targetApiId);
            return {
              id: ue.id,
              name: ue.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ue.name} — proxy/cache de ${yt.name}`,
              opKind: "api-op-occurrence",
              ops: (yt.operations ?? []).map((Ft) => ({
                id: We(Ft.id, ue.id),
                name: Ft.name
              }))
            };
          })
        ], gt = new Set(yi.map((ue) => ue.id));
        return Gn(
          V,
          { ...ne, collapsible: !0, collapsed: gi },
          se,
          Qi.filter((ue) => !gt.has(ue.id)),
          t,
          s,
          a
        );
      }
      const Zi = qt === "compact" ? [] : [
        ...Ne.map((se) => ({ id: se.id, name: se.name, kind: "api" })),
        ...Qi
      ];
      return Zi.length > 0 ? _t(
        V,
        { ...ne, collapsible: fi, collapsed: gi },
        Zi,
        t,
        s
      ) : [{
        ...ne,
        collapsible: fi,
        collapsed: fi && gi,
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    const K = c.ref, ie = K.subdomainType ?? "GENERIC", de = {
      id: K.id,
      label: K.name,
      kind: "module",
      symbol: "component",
      fill: Ws[ie],
      stroke: "#94a3b8",
      badge: ie,
      tooltip: `${K.name} — subdominio ${ie}`
    }, we = qn(e, K.id), mt = (e.aggregates ?? []).some((X) => X.moduleId === K.id) || (K.useCases ?? []).length > 0 || (K.domainEvents ?? []).length > 0 || (K.applicationEvents ?? []).length > 0 || (K.readModels ?? []).length > 0 || (K.domainServices ?? []).length > 0 || (K.queryServices ?? []).length > 0 || (K.scheduledTriggers ?? []).length > 0, Be = mt || we.length > 0, { form: ft, collapsed: Je } = en(
      n.has(K.id),
      d ? "full" : we.length > 0 ? "coarse" : "compact",
      mt
    );
    return ft === "full" && Be ? Js(
      e,
      K,
      V,
      { ...de, collapsible: !0, collapsed: Je },
      t,
      s,
      o
    ) : ft === "coarse" && we.length > 0 ? _t(
      V,
      { ...de, collapsible: Be, collapsed: Je },
      we,
      t,
      s
    ) : [{
      ...de,
      collapsible: Be,
      collapsed: Be && Je,
      x: V.x,
      y: V.y,
      w: it,
      h: nt
    }];
  }), g = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, T) => {
    const V = t[c.id] ?? It(h.length + T, g);
    w.push({
      id: c.id,
      label: c.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, T) => {
    const V = t[c.id] ?? It(h.length + (e.actors ?? []).length + T, g);
    w.push({
      id: c.id,
      label: c.name,
      x: V.x,
      y: V.y,
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
  }), (e.mcpGateways ?? []).forEach((c, T) => {
    const V = t[c.id] ?? It(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      g
    );
    w.push({
      id: c.id,
      label: c.name,
      x: V.x,
      y: V.y,
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
  const y = [];
  (e.rags ?? []).forEach((c, T) => {
    const V = t[c.id] ?? It(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      g
    );
    w.push({
      id: c.id,
      label: c.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((K, ie) => {
      const de = `ragcs:${c.id}:${K.uri}`, we = t[de] ?? { x: V.x + 170, y: V.y - 30 + ie * 44 };
      w.push({
        id: de,
        label: K.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: we.x,
        y: we.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: K.type,
        tooltip: `${K.type}: ${K.uri}`
      }), y.push({
        id: `ragcse:${c.id}:${K.uri}`,
        sourceId: de,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), w.sort((c, T) => (c.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const x = e.relations.map((c) => ({
    id: Xs(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Gs[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), b = e.flows.map((c) => {
    var we, mt, Be, ft, Je, X;
    const T = Qs(e, c), V = d ? e.modules.find((ne) => ne.id === c.sourceId) : void 0, K = ((we = V == null ? void 0 : V.domainEvents) == null ? void 0 : we.find((ne) => ne.name === c.triggerEvent)) ?? ((mt = V == null ? void 0 : V.applicationEvents) == null ? void 0 : mt.find((ne) => ne.name === c.triggerEvent)), ie = d && c.readModelName ? (ft = (Be = e.modules.find((ne) => ne.id === c.targetId)) == null ? void 0 : Be.readModels) == null ? void 0 : ft.find((ne) => ne.name === c.readModelName) : void 0, de = d && c.targetUseCaseId ? (X = (Je = e.modules.find((ne) => ne.id === c.targetId)) == null ? void 0 : Je.useCases) == null ? void 0 : X.find((ne) => ne.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (K == null ? void 0 : K.id) ?? c.sourceId,
      targetId: (de == null ? void 0 : de.id) ?? (ie == null ? void 0 : ie.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: js[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${T}`
    };
  }), P = new Map((e.apis ?? []).map((c) => [c.id, c])), C = new Set(e.modules.map((c) => c.id)), N = (e.apiImplementations ?? []).filter(
    (c) => P.has(c.apiId) && C.has(c.moduleId)
  ), _ = new Set(w.map((c) => c.id)), F = d ? (e.emissions ?? []).filter((c) => _.has(c.sourceId) && _.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], q = d ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: T }) => T && c.readModelId).filter(({ p: c, source: T }) => _.has(T) && _.has(c.readModelId)).map(({ p: c, source: T }) => ({
    id: `proj:${c.id}`,
    sourceId: T,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], $ = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((T) => {
      const V = d && T.targetUseCaseId && _.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetModuleId && _.has(T.targetModuleId) ? T.targetModuleId : (T.targetUseCaseId && !d, null);
      if (!V) return [];
      const K = d && _.has(T.id) ? T.id : c.id;
      return _.has(K) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: K,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${V}`
        }
      ] : [];
    })
  ), M = d ? (e.useCaseCalls ?? []).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], S = d ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && _.has(c.id) && _.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], O = d ? (e.aggregateCalls ?? []).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], U = d ? (e.queryCalls ?? []).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], p = d ? (e.actorUses ?? []).filter((c) => _.has(c.actorId) && _.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], I = (e.actorExternalDependencies ?? []).filter((c) => _.has(c.actorId) && _.has(c.externalSystemId)).map((c) => ({
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
  ]), E = (c) => _.has(c) ? c : v.get(c) ?? c, D = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: E(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => _.has(c.sourceId) && _.has(c.targetId) && c.sourceId !== c.targetId
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
  ], z = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const T of c.useCases ?? []) z.set(T.id, c.id);
    for (const T of c.domainEvents ?? []) z.set(T.id, c.id);
    for (const T of c.applicationEvents ?? []) z.set(T.id, c.id);
  }
  const A = (c) => _.has(c) ? c : z.get(c) ?? c, R = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const T of c.domainEvents ?? []) R.set(T.name, T.id);
    for (const T of c.applicationEvents ?? []) R.set(T.name, T.id);
  }
  const j = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: c.id, targetId: A(T.targetUseCaseId) }))
      ).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
  ], te = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && R.has(c.triggerEvent)).map((c) => ({
        sourceId: A(R.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
  ], ee = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const T of c.tables ?? []) ee.set(T.id, c.id);
  const pe = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: _.has(T) ? T : ee.get(T) ?? T,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
  ], _e = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((T) => ({
          sourceId: E(T),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
  ], ge = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((T) => ({ sourceId: T, targetId: c.id, name: c.name }))
      ]).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: E(c.apiId) })).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => [
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
  ], ht = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, ks = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== c.id && ht(T) === c.triggerEvent).filter((T) => _.has(T.id) && _.has(c.id)).map((T) => ({
      id: `wfchain:${T.id}->${c.id}`,
      sourceId: T.id,
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
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: E(c.id), targetId: E(c.targetApiId) })).filter(
        (c) => _.has(c.sourceId) && _.has(c.targetId) && c.sourceId !== c.targetId
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
  ], Es = N.flatMap((c) => {
    const T = Ge(c.apiId, c.moduleId);
    if (!_.has(T)) return [];
    const V = [];
    for (const K of (e.proxyApis ?? []).filter((ie) => ie.targetApiId === c.apiId)) {
      const ie = E(K.id);
      _.has(ie) && ie !== T && V.push({
        id: `pxr:${ie}->${T}`,
        sourceId: ie,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return V;
  }), Ss = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const T = (e.proxyApis ?? []).find((ie) => ie.id === c.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const V = We(c.operationId, c.proxyId), K = c.targetSiteId === T.targetApiId ? T.targetApiId : Ge(T.targetApiId, c.targetSiteId);
    return !_.has(V) || !_.has(K) ? [] : [{
      id: `oproute:${V}->${K}`,
      sourceId: V,
      targetId: K,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Cs = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!_.has(c.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (de) => de.operations.some((we) => we.id === c.operationId)
        );
        if (!T) return null;
        const V = c.siteId === T.id, K = V ? c.operationId : We(c.operationId, c.siteId);
        let ie = _.has(K) ? K : null;
        if (!ie)
          if (V || (e.proxyApis ?? []).some((de) => de.id === c.siteId))
            ie = E(c.siteId);
          else {
            const de = Ge(T.id, c.siteId);
            ie = _.has(de) ? de : c.siteId;
          }
        return !ie || !_.has(ie) || ie === c.externalSystemId ? null : { u: c, target: ie };
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
  ], As = d ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!_.has(c.useCaseId)) return [];
    const T = _.has(We(c.operationId, c.moduleId)) ? We(c.operationId, c.moduleId) : _.has(Ge(c.apiId, c.moduleId)) ? Ge(c.apiId, c.moduleId) : _.has(E(c.moduleId)) ? E(c.moduleId) : null;
    return T ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: T,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Ms = d ? (e.agentUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ps = (e.agentRags ?? []).filter((c) => _.has(c.agentId) && _.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Os = d ? (e.rags ?? []).filter((c) => _.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((T) => _.has(T)).map((T) => ({
      id: `ragsrc:${c.id}->${T}`,
      sourceId: c.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Ts = d ? (e.agentExternalUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ns = d ? (e.agentMcpUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.mcpServerId)).map((c) => ({
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
    ].filter((T) => _.has(c.id) && _.has(T)).map((T) => ({
      id: `gwx:${c.id}->${T}`,
      sourceId: c.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Ls = (e.agentGatewayUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ds = d ? (e.agentApiOpUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Us = d ? (e.agentQueryUses ?? []).filter((c) => _.has(c.agentId) && _.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], zs = (e.agentDelegations ?? []).filter((c) => _.has(c.agentId) && _.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), qs = (e.actorAgentUses ?? []).filter((c) => _.has(c.actorId) && _.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Fs = d ? (e.agentTriggers ?? []).filter((c) => _.has(c.eventId) && _.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Bs = d ? (e.externalCalls ?? []).filter((c) => _.has(c.externalSystemId) && _.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Vs = d ? (e.externalUseCaseCalls ?? []).filter((c) => _.has(c.sourceId) && _.has(c.targetId)).map((c) => ({
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
      ...x,
      ...b,
      ...F,
      ...q,
      ...$,
      ...M,
      ...S,
      ...O,
      ...U,
      ...p,
      ...I,
      ...D,
      ...$s,
      ...Es,
      ...Ss,
      ...Cs,
      ...As,
      ...j,
      ...te,
      ...ks,
      ...ke,
      ...pe,
      ..._e,
      ...ge,
      ...Ms,
      ...Ts,
      ...Ns,
      ...Rs,
      ...Ls,
      ...Ds,
      ...Us,
      ...zs,
      ...qs,
      ...Fs,
      ...Ps,
      ...Os,
      ...y,
      ...Bs,
      ...Vs
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
  return e.modules.forEach((n, a) => {
    const d = 220 + a * 340;
    i.filter((r) => r.moduleId === n.id).forEach((r, l) => {
      const u = s.filter((f) => f.aggregateId === r.id).length, m = 140 + l * (170 + u * 60);
      t[r.id] = { x: d, y: m }, s.filter((f) => f.aggregateId === r.id).forEach((f, h) => {
        t[f.id] = { x: d + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((a) => a.id === n.moduleId)).forEach((n, a) => {
    t[n.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function ro(e, t) {
  const i = ao(e), s = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((l) => [l.id, l])), a = (e.aggregates ?? []).map((l) => {
    const u = n.get(l.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = s(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: io,
      h: no,
      kind: "aggregate",
      symbol: "aggregate",
      fill: to[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), d = (e.entities ?? []).map((l) => {
    const u = s(l.id);
    return {
      id: l.id,
      label: l.name,
      x: u.x,
      y: u.y,
      w: so,
      h: oo,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${l.name} (dentro del agregado)`
    };
  }), o = (e.entities ?? []).map((l) => ({
    id: `contains:${l.aggregateId}->${l.id}`,
    sourceId: l.aggregateId,
    targetId: l.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), r = (e.aggregateReferences ?? []).map((l, u) => ({
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
    nodes: [...a, ...d],
    edges: [...o, ...r]
  };
}
const lo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, co = 150, po = 44, uo = 190, ho = 56, mo = 160, fo = 48;
function go(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function yo(e, t) {
  const i = e.flows, s = [], n = [], a = /* @__PURE__ */ new Set(), d = (o) => {
    var r, l;
    return ((l = (r = e.aggregates) == null ? void 0 : r.find((u) => u.id === o)) == null ? void 0 : l.name) ?? o ?? "?";
  };
  return i.forEach((o, r) => {
    const l = 120 + r * 130, u = lo[o.archetype] ?? "#475569", m = o.triggerAggregateId ?? o.sourceId;
    if (!a.has(m)) {
      a.add(m);
      const y = t[m] ?? { x: 160, y: l };
      s.push({
        id: m,
        label: o.triggerAggregateId ? d(o.triggerAggregateId) : m,
        x: y.x,
        y: y.y,
        w: co,
        h: po,
        kind: o.triggerAggregateId ? "aggregate" : "module",
        symbol: o.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: o.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${o.id}`, h = t[f] ?? { x: 470, y: l };
    s.push({
      id: f,
      label: o.name,
      x: h.x,
      y: h.y,
      w: uo,
      h: ho,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: o.archetype,
      tooltip: `Flow ${o.name} [${o.archetype}]${o.readModelName ? ` → read model ${o.readModelName}` : ""}${o.targetUseCaseId ? ` → use case ${o.targetUseCaseId}` : ""}`
    });
    const w = go(e, o), g = `tgt:${w.id}`;
    if (!a.has(g)) {
      a.add(g);
      const y = t[g] ?? { x: 790, y: l };
      s.push({
        id: g,
        label: w.label,
        x: y.x,
        y: y.y,
        w: mo,
        h: fo,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${o.id}:in`,
      sourceId: m,
      targetId: f,
      kind: "flow-trigger",
      label: o.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: o.triggerEvent ? `Evento: ${o.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${o.id}:out`,
      sourceId: f,
      targetId: g,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const Io = 190, vo = 56, Ii = 170, xo = 52;
function tn(e, t) {
  const i = [], s = [], n = (a) => {
    var d;
    return (d = e.modules.find((o) => o.id === a)) == null ? void 0 : d.name;
  };
  return (e.processes ?? []).forEach((a, d) => {
    const o = 140 + d * 240, r = t[a.id] ?? { x: 150, y: o };
    i.push({
      id: a.id,
      label: a.name,
      x: r.x,
      y: r.y,
      w: Io,
      h: vo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${n(a.ownerModuleId) ? ` — módulo ${n(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let l = a.id;
    if (a.steps.forEach((u, m) => {
      const f = u.type === "HUMAN", h = t[u.id] ?? { x: 150 + (m + 1) * 240, y: o };
      if (i.push({
        id: u.id,
        label: u.name,
        x: h.x,
        y: h.y,
        w: Ii,
        h: xo,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), s.push({
        id: `pe:${a.id}:${m}`,
        sourceId: l,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const w = `comp:${u.id}`, g = t[w] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: w,
          label: u.compensationUseCaseId,
          x: g.x,
          y: g.y,
          w: Ii,
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
      l = u.id;
    }), a.onCompletionEventName) {
      const u = `done:${a.id}`, m = t[u] ?? { x: 150 + (a.steps.length + 1) * 240, y: o };
      i.push({
        id: u,
        label: a.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Ii,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${a.id}`,
        sourceId: l,
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
const Xt = globalThis, qi = Xt.ShadowRoot && (Xt.ShadyCSS === void 0 || Xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fi = Symbol(), nn = /* @__PURE__ */ new WeakMap();
let jn = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Fi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (qi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = nn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wo = (e) => new jn(typeof e == "string" ? e : e + "", void 0, Fi), pt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, a) => s + ((d) => {
    if (d._$cssResult$ === !0) return d.cssText;
    if (typeof d == "number") return d;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + d + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new jn(i, e, Fi);
}, bo = (e, t) => {
  if (qi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Xt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, sn = qi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return wo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _o, defineProperty: ko, getOwnPropertyDescriptor: $o, getOwnPropertyNames: Eo, getOwnPropertySymbols: So, getPrototypeOf: Co } = Object, Fe = globalThis, on = Fe.trustedTypes, Ao = on ? on.emptyScript : "", vi = Fe.reactiveElementPolyfillSupport, Et = (e, t) => e, ti = { toAttribute(e, t) {
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
} }, Bi = (e, t) => !_o(e, t), an = { attribute: !0, type: String, converter: ti, reflect: !1, useDefault: !1, hasChanged: Bi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Fe.litPropertyMetadata ?? (Fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let st = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = an) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && ko(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: a } = $o(this.prototype, t) ?? { get() {
      return this[i];
    }, set(d) {
      this[i] = d;
    } };
    return { get: n, set(d) {
      const o = n == null ? void 0 : n.call(this);
      a == null || a.call(this, d), this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? an;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Et("elementProperties"))) return;
    const t = Co(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Et("properties"))) {
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
      for (const n of s) i.unshift(sn(n));
    } else t !== void 0 && i.push(sn(t));
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
    var a;
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const d = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : ti).toAttribute(i, s.type);
      this._$Em = t, d == null ? this.removeAttribute(n) : this.setAttribute(n, d), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, d;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : ti;
      this._$Em = n;
      const l = r.fromAttribute(i, o.type);
      this[n] = l ?? ((d = this._$Ej) == null ? void 0 : d.get(n)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, a) {
    var d;
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[t]), s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? Bi)(a, i) || s.useDefault && s.reflect && a === ((d = this._$Ej) == null ? void 0 : d.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: a }, d) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, d ?? i ?? this[t]), a !== !0 || d !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, d] of this._$Ep) this[a] = d;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, d] of n) {
        const { wrapped: o } = d, r = this[a];
        o !== !0 || this._$AL.has(a) || r === void 0 || this.C(a, void 0, d, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
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
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[Et("elementProperties")] = /* @__PURE__ */ new Map(), st[Et("finalized")] = /* @__PURE__ */ new Map(), vi == null || vi({ ReactiveElement: st }), (Fe.reactiveElementVersions ?? (Fe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, rn = (e) => e, ii = St.trustedTypes, dn = ii ? ii.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Yn = "$lit$", qe = `lit$${Math.random().toFixed(9).slice(2)}$`, Kn = "?" + qe, Mo = `<${Kn}>`, Qe = document, Mt = () => Qe.createComment(""), Pt = (e) => e === null || typeof e != "object" && typeof e != "function", Vi = Array.isArray, Po = (e) => Vi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", xi = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ln = /-->/g, cn = />/g, Ve = RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pn = /'/g, un = /"/g, Xn = /^(?:script|style|textarea|title)$/i, Qn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), k = Qn(1), G = Qn(2), rt = Symbol.for("lit-noChange"), Q = Symbol.for("lit-nothing"), hn = /* @__PURE__ */ new WeakMap(), je = Qe.createTreeWalker(Qe, 129);
function Zn(e, t) {
  if (!Vi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dn !== void 0 ? dn.createHTML(t) : t;
}
const Oo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", d = vt;
  for (let o = 0; o < i; o++) {
    const r = e[o];
    let l, u, m = -1, f = 0;
    for (; f < r.length && (d.lastIndex = f, u = d.exec(r), u !== null); ) f = d.lastIndex, d === vt ? u[1] === "!--" ? d = ln : u[1] !== void 0 ? d = cn : u[2] !== void 0 ? (Xn.test(u[2]) && (n = RegExp("</" + u[2], "g")), d = Ve) : u[3] !== void 0 && (d = Ve) : d === Ve ? u[0] === ">" ? (d = n ?? vt, m = -1) : u[1] === void 0 ? m = -2 : (m = d.lastIndex - u[2].length, l = u[1], d = u[3] === void 0 ? Ve : u[3] === '"' ? un : pn) : d === un || d === pn ? d = Ve : d === ln || d === cn ? d = vt : (d = Ve, n = void 0);
    const h = d === Ve && e[o + 1].startsWith("/>") ? " " : "";
    a += d === vt ? r + Mo : m >= 0 ? (s.push(l), r.slice(0, m) + Yn + r.slice(m) + qe + h) : r + qe + (m === -2 ? o : h);
  }
  return [Zn(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Ot {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let a = 0, d = 0;
    const o = t.length - 1, r = this.parts, [l, u] = Oo(t, i);
    if (this.el = Ot.createElement(l, s), je.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = je.nextNode()) !== null && r.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith(Yn)) {
          const f = u[d++], h = n.getAttribute(m).split(qe), w = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: a, name: w[2], strings: h, ctor: w[1] === "." ? No : w[1] === "?" ? Ro : w[1] === "@" ? Lo : li }), n.removeAttribute(m);
        } else m.startsWith(qe) && (r.push({ type: 6, index: a }), n.removeAttribute(m));
        if (Xn.test(n.tagName)) {
          const m = n.textContent.split(qe), f = m.length - 1;
          if (f > 0) {
            n.textContent = ii ? ii.emptyScript : "";
            for (let h = 0; h < f; h++) n.append(m[h], Mt()), je.nextNode(), r.push({ type: 2, index: ++a });
            n.append(m[f], Mt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Kn) r.push({ type: 2, index: a });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(qe, m + 1)) !== -1; ) r.push({ type: 7, index: a }), m += qe.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const s = Qe.createElement("template");
    return s.innerHTML = t, s;
  }
}
function dt(e, t, i = e, s) {
  var d, o;
  if (t === rt) return t;
  let n = s !== void 0 ? (d = i._$Co) == null ? void 0 : d[s] : i._$Cl;
  const a = Pt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((o = n == null ? void 0 : n._$AO) == null || o.call(n, !1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = dt(e, n._$AS(e, t.values), n, s)), t;
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Qe).importNode(i, !0);
    je.currentNode = n;
    let a = je.nextNode(), d = 0, o = 0, r = s[0];
    for (; r !== void 0; ) {
      if (d === r.index) {
        let l;
        r.type === 2 ? l = new Dt(a, a.nextSibling, this, t) : r.type === 1 ? l = new r.ctor(a, r.name, r.strings, this, t) : r.type === 6 && (l = new Do(a, this, t)), this._$AV.push(l), r = s[++o];
      }
      d !== (r == null ? void 0 : r.index) && (a = je.nextNode(), d++);
    }
    return je.currentNode = Qe, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Dt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = Q, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = dt(this, t, i), Pt(t) ? t === Q || t == null || t === "" ? (this._$AH !== Q && this._$AR(), this._$AH = Q) : t !== this._$AH && t !== rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Po(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Q && Pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Qe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Ot.createElement(Zn(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(i);
    else {
      const d = new To(n, this), o = d.u(this.options);
      d.p(i), this.T(o), this._$AH = d;
    }
  }
  _$AC(t) {
    let i = hn.get(t.strings);
    return i === void 0 && hn.set(t.strings, i = new Ot(t)), i;
  }
  k(t) {
    Vi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const a of t) n === i.length ? i.push(s = new Dt(this.O(Mt()), this.O(Mt()), this, this.options)) : s = i[n], s._$AI(a), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = rn(t).nextSibling;
      rn(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class li {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, a) {
    this.type = 1, this._$AH = Q, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = Q;
  }
  _$AI(t, i = this, s, n) {
    const a = this.strings;
    let d = !1;
    if (a === void 0) t = dt(this, t, i, 0), d = !Pt(t) || t !== this._$AH && t !== rt, d && (this._$AH = t);
    else {
      const o = t;
      let r, l;
      for (t = a[0], r = 0; r < a.length - 1; r++) l = dt(this, o[s + r], i, r), l === rt && (l = this._$AH[r]), d || (d = !Pt(l) || l !== this._$AH[r]), l === Q ? t = Q : t !== Q && (t += (l ?? "") + a[r + 1]), this._$AH[r] = l;
    }
    d && !n && this.j(t);
  }
  j(t) {
    t === Q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class No extends li {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Q ? void 0 : t;
  }
}
class Ro extends li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Q);
  }
}
class Lo extends li {
  constructor(t, i, s, n, a) {
    super(t, i, s, n, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dt(this, t, i, 0) ?? Q) === rt) return;
    const s = this._$AH, n = t === Q && s !== Q || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== Q && (s === Q || n);
    n && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Do {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dt(this, t);
  }
}
const wi = St.litHtmlPolyfillSupport;
wi == null || wi(Ot, Dt), (St.litHtmlVersions ?? (St.litHtmlVersions = [])).push("3.3.3");
const Uo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Dt(t.insertBefore(Mt(), a), a, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis;
class Pe extends st {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Uo(i, this.renderRoot, this.renderOptions);
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
    return rt;
  }
}
var zn;
Pe._$litElement$ = !0, Pe.finalized = !0, (zn = Ke.litElementHydrateSupport) == null || zn.call(Ke, { LitElement: Pe });
const bi = Ke.litElementPolyfillSupport;
bi == null || bi({ LitElement: Pe });
(Ke.litElementVersions ?? (Ke.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zo = { attribute: !0, type: String, converter: ti, reflect: !1, hasChanged: Bi }, qo = (e = zo, t, i) => {
  const { kind: s, metadata: n } = i;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), s === "accessor") {
    const { name: d } = i;
    return { set(o) {
      const r = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(d, r, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(d, void 0, e, o), o;
    } };
  }
  if (s === "setter") {
    const { name: d } = i;
    return function(o) {
      const r = this[d];
      t.call(this, o), this.requestUpdate(d, r, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function J(e) {
  return (t, i) => typeof i == "object" ? qo(e, t, i) : ((s, n, a) => {
    const d = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, s), d ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function L(e) {
  return J({ ...e, state: !0, attribute: !1 });
}
var Ai = "http://www.w3.org/1999/xhtml";
const mn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ai,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ci(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), mn.hasOwnProperty(t) ? { space: mn[t], local: e } : e;
}
function Fo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ai && t.documentElement.namespaceURI === Ai ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Bo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Jn(e) {
  var t = ci(e);
  return (t.local ? Bo : Fo)(t);
}
function Vo() {
}
function Hi(e) {
  return e == null ? Vo : function() {
    return this.querySelector(e);
  };
}
function Ho(e) {
  typeof e != "function" && (e = Hi(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], d = a.length, o = s[n] = new Array(d), r, l, u = 0; u < d; ++u)
      (r = a[u]) && (l = e.call(r, r.__data__, u, a)) && ("__data__" in r && (l.__data__ = r.__data__), o[u] = l);
  return new Ie(s, this._parents);
}
function Wo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Go() {
  return [];
}
function es(e) {
  return e == null ? Go : function() {
    return this.querySelectorAll(e);
  };
}
function jo(e) {
  return function() {
    return Wo(e.apply(this, arguments));
  };
}
function Yo(e) {
  typeof e == "function" ? e = jo(e) : e = es(e);
  for (var t = this._groups, i = t.length, s = [], n = [], a = 0; a < i; ++a)
    for (var d = t[a], o = d.length, r, l = 0; l < o; ++l)
      (r = d[l]) && (s.push(e.call(r, r.__data__, l, d)), n.push(r));
  return new Ie(s, n);
}
function ts(e) {
  return function() {
    return this.matches(e);
  };
}
function is(e) {
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
  return this.select(e == null ? Qo : Xo(typeof e == "function" ? e : is(e)));
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
  return this.selectAll(e == null ? ea : ta(typeof e == "function" ? e : is(e)));
}
function na(e) {
  typeof e != "function" && (e = ts(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], d = a.length, o = s[n] = [], r, l = 0; l < d; ++l)
      (r = a[l]) && e.call(r, r.__data__, l, a) && o.push(r);
  return new Ie(s, this._parents);
}
function ns(e) {
  return new Array(e.length);
}
function sa() {
  return new Ie(this._enter || this._groups.map(ns), this._parents);
}
function ni(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ni.prototype = {
  constructor: ni,
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
function aa(e, t, i, s, n, a) {
  for (var d = 0, o, r = t.length, l = a.length; d < l; ++d)
    (o = t[d]) ? (o.__data__ = a[d], s[d] = o) : i[d] = new ni(e, a[d]);
  for (; d < r; ++d)
    (o = t[d]) && (n[d] = o);
}
function ra(e, t, i, s, n, a, d) {
  var o, r, l = /* @__PURE__ */ new Map(), u = t.length, m = a.length, f = new Array(u), h;
  for (o = 0; o < u; ++o)
    (r = t[o]) && (f[o] = h = d.call(r, r.__data__, o, t) + "", l.has(h) ? n[o] = r : l.set(h, r));
  for (o = 0; o < m; ++o)
    h = d.call(e, a[o], o, a) + "", (r = l.get(h)) ? (s[o] = r, r.__data__ = a[o], l.delete(h)) : i[o] = new ni(e, a[o]);
  for (o = 0; o < u; ++o)
    (r = t[o]) && l.get(f[o]) === r && (n[o] = r);
}
function da(e) {
  return e.__data__;
}
function la(e, t) {
  if (!arguments.length) return Array.from(this, da);
  var i = t ? ra : aa, s = this._parents, n = this._groups;
  typeof e != "function" && (e = oa(e));
  for (var a = n.length, d = new Array(a), o = new Array(a), r = new Array(a), l = 0; l < a; ++l) {
    var u = s[l], m = n[l], f = m.length, h = ca(e.call(u, u && u.__data__, l, s)), w = h.length, g = o[l] = new Array(w), y = d[l] = new Array(w), x = r[l] = new Array(f);
    i(u, m, g, y, x, h, t);
    for (var b = 0, P = 0, C, N; b < w; ++b)
      if (C = g[b]) {
        for (b >= P && (P = b + 1); !(N = y[P]) && ++P < w; ) ;
        C._next = N || null;
      }
  }
  return d = new Ie(d, s), d._enter = o, d._exit = r, d;
}
function ca(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function pa() {
  return new Ie(this._exit || this._groups.map(ns), this._parents);
}
function ua(e, t, i) {
  var s = this.enter(), n = this, a = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? a.remove() : i(a), s && n ? s.merge(n).order() : n;
}
function ha(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, a = s.length, d = Math.min(n, a), o = new Array(n), r = 0; r < d; ++r)
    for (var l = i[r], u = s[r], m = l.length, f = o[r] = new Array(m), h, w = 0; w < m; ++w)
      (h = l[w] || u[w]) && (f[w] = h);
  for (; r < n; ++r)
    o[r] = i[r];
  return new Ie(o, this._parents);
}
function ma() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, a = s[n], d; --n >= 0; )
      (d = s[n]) && (a && d.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(d, a), a = d);
  return this;
}
function fa(e) {
  e || (e = ga);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), a = 0; a < s; ++a) {
    for (var d = i[a], o = d.length, r = n[a] = new Array(o), l, u = 0; u < o; ++u)
      (l = d[u]) && (r[u] = l);
    r.sort(t);
  }
  return new Ie(n, this._parents).order();
}
function ga(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ya() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ia() {
  return Array.from(this);
}
function va() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, a = s.length; n < a; ++n) {
      var d = s[n];
      if (d) return d;
    }
  return null;
}
function xa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function wa() {
  return !this.node();
}
function ba(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], a = 0, d = n.length, o; a < d; ++a)
      (o = n[a]) && e.call(o, o.__data__, a, n);
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
  var i = ci(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ka : _a : typeof t == "function" ? i.local ? Ca : Sa : i.local ? Ea : $a)(i, t));
}
function ss(e) {
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
  return arguments.length > 1 ? this.each((t == null ? Ma : typeof t == "function" ? Oa : Pa)(e, t, i ?? "")) : lt(this.node(), e);
}
function lt(e, t) {
  return e.style.getPropertyValue(t) || ss(e).getComputedStyle(e, null).getPropertyValue(t);
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
function La(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Da(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Na : typeof t == "function" ? La : Ra)(e, t)) : this.node()[e];
}
function os(e) {
  return e.trim().split(/^|\s+/);
}
function Wi(e) {
  return e.classList || new as(e);
}
function as(e) {
  this._node = e, this._names = os(e.getAttribute("class") || "");
}
as.prototype = {
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
function rs(e, t) {
  for (var i = Wi(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function ds(e, t) {
  for (var i = Wi(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function Ua(e) {
  return function() {
    rs(this, e);
  };
}
function za(e) {
  return function() {
    ds(this, e);
  };
}
function qa(e, t) {
  return function() {
    (t.apply(this, arguments) ? rs : ds)(this, e);
  };
}
function Fa(e, t) {
  var i = os(e + "");
  if (arguments.length < 2) {
    for (var s = Wi(this.node()), n = -1, a = i.length; ++n < a; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? qa : t ? Ua : za)(i, t));
}
function Ba() {
  this.textContent = "";
}
function Va(e) {
  return function() {
    this.textContent = e;
  };
}
function Ha(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Wa(e) {
  return arguments.length ? this.each(e == null ? Ba : (typeof e == "function" ? Ha : Va)(e)) : this.node().textContent;
}
function Ga() {
  this.innerHTML = "";
}
function ja(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Ya(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ka(e) {
  return arguments.length ? this.each(e == null ? Ga : (typeof e == "function" ? Ya : ja)(e)) : this.node().innerHTML;
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
  var t = typeof e == "function" ? e : Jn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function tr() {
  return null;
}
function ir(e, t) {
  var i = typeof e == "function" ? e : Jn(e), s = t == null ? tr : typeof t == "function" ? t : Hi(t);
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
      for (var i = 0, s = -1, n = t.length, a; i < n; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++s] = a;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function ur(e, t, i) {
  return function() {
    var s = this.__on, n, a = lr(t);
    if (s) {
      for (var d = 0, o = s.length; d < o; ++d)
        if ((n = s[d]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = a, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), n = { type: e.type, name: e.name, value: t, listener: a, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function hr(e, t, i) {
  var s = cr(e + ""), n, a = s.length, d;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var r = 0, l = o.length, u; r < l; ++r)
        for (n = 0, u = o[r]; n < a; ++n)
          if ((d = s[n]).type === u.type && d.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = t ? ur : pr, n = 0; n < a; ++n) this.each(o(s[n], t, i));
  return this;
}
function ls(e, t, i) {
  var s = ss(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function mr(e, t) {
  return function() {
    return ls(this, e, t);
  };
}
function fr(e, t) {
  return function() {
    return ls(this, e, t.apply(this, arguments));
  };
}
function gr(e, t) {
  return this.each((typeof t == "function" ? fr : mr)(e, t));
}
function* yr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, a = s.length, d; n < a; ++n)
      (d = s[n]) && (yield d);
}
var cs = [null];
function Ie(e, t) {
  this._groups = e, this._parents = t;
}
function Ut() {
  return new Ie([[document.documentElement]], cs);
}
function Ir() {
  return this;
}
Ie.prototype = Ut.prototype = {
  constructor: Ie,
  select: Ho,
  selectAll: Yo,
  selectChild: Zo,
  selectChildren: ia,
  filter: na,
  data: la,
  enter: sa,
  exit: pa,
  join: ua,
  merge: ha,
  selection: Ir,
  order: ma,
  sort: fa,
  call: ya,
  nodes: Ia,
  node: va,
  size: xa,
  empty: wa,
  each: ba,
  attr: Aa,
  style: Ta,
  property: Da,
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
  on: hr,
  dispatch: gr,
  [Symbol.iterator]: yr
};
function Se(e) {
  return typeof e == "string" ? new Ie([[document.querySelector(e)]], [document.documentElement]) : new Ie([[e]], cs);
}
function vr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function He(e, t) {
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
var xr = { value: () => {
} };
function Gi() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new Qt(i);
}
function Qt(e) {
  this._ = e;
}
function wr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Qt.prototype = Gi.prototype = {
  constructor: Qt,
  on: function(e, t) {
    var i = this._, s = wr(e + "", i), n, a = -1, d = s.length;
    if (arguments.length < 2) {
      for (; ++a < d; ) if ((n = (e = s[a]).type) && (n = br(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < d; )
      if (n = (e = s[a]).type) i[n] = fn(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = fn(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Qt(e);
  },
  call: function(e, t) {
    if ((n = arguments.length - 2) > 0) for (var i = new Array(n), s = 0, n, a; s < n; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], s = 0, n = a.length; s < n; ++s) a[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], n = 0, a = s.length; n < a; ++n) s[n].value.apply(t, i);
  }
};
function br(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function fn(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = xr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Mi = { capture: !0, passive: !1 };
function Pi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function _r(e) {
  var t = e.document.documentElement, i = Se(e).on("dragstart.drag", Pi, Mi);
  "onselectstart" in t ? i.on("selectstart.drag", Pi, Mi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function kr(e, t) {
  var i = e.document.documentElement, s = Se(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Pi, Mi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ji(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ps(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function zt() {
}
var Tt = 0.7, si = 1 / Tt, at = "\\s*([+-]?\\d+)\\s*", Nt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $r = /^#([0-9a-f]{3,8})$/, Er = new RegExp(`^rgb\\(${at},${at},${at}\\)$`), Sr = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), Cr = new RegExp(`^rgba\\(${at},${at},${at},${Nt}\\)$`), Ar = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${Nt}\\)$`), Mr = new RegExp(`^hsl\\(${Nt},${Oe},${Oe}\\)$`), Pr = new RegExp(`^hsla\\(${Nt},${Oe},${Oe},${Nt}\\)$`), gn = {
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
ji(zt, Rt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: yn,
  // Deprecated! Use color.formatHex.
  formatHex: yn,
  formatHex8: Or,
  formatHsl: Tr,
  formatRgb: In,
  toString: In
});
function yn() {
  return this.rgb().formatHex();
}
function Or() {
  return this.rgb().formatHex8();
}
function Tr() {
  return us(this).formatHsl();
}
function In() {
  return this.rgb().formatRgb();
}
function Rt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = $r.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? vn(t) : i === 3 ? new me(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Vt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Vt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Er.exec(e)) ? new me(t[1], t[2], t[3], 1) : (t = Sr.exec(e)) ? new me(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Cr.exec(e)) ? Vt(t[1], t[2], t[3], t[4]) : (t = Ar.exec(e)) ? Vt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Mr.exec(e)) ? bn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Pr.exec(e)) ? bn(t[1], t[2] / 100, t[3] / 100, t[4]) : gn.hasOwnProperty(e) ? vn(gn[e]) : e === "transparent" ? new me(NaN, NaN, NaN, 0) : null;
}
function vn(e) {
  return new me(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Vt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new me(e, t, i, s);
}
function Nr(e) {
  return e instanceof zt || (e = Rt(e)), e ? (e = e.rgb(), new me(e.r, e.g, e.b, e.opacity)) : new me();
}
function Oi(e, t, i, s) {
  return arguments.length === 1 ? Nr(e) : new me(e, t, i, s ?? 1);
}
function me(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
ji(me, Oi, ps(zt, {
  brighter(e) {
    return e = e == null ? si : Math.pow(si, e), new me(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Tt : Math.pow(Tt, e), new me(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new me(Xe(this.r), Xe(this.g), Xe(this.b), oi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: xn,
  // Deprecated! Use color.formatHex.
  formatHex: xn,
  formatHex8: Rr,
  formatRgb: wn,
  toString: wn
}));
function xn() {
  return `#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}`;
}
function Rr() {
  return `#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}${Ye((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function wn() {
  const e = oi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Xe(this.r)}, ${Xe(this.g)}, ${Xe(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function oi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Xe(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ye(e) {
  return e = Xe(e), (e < 16 ? "0" : "") + e.toString(16);
}
function bn(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ce(e, t, i, s);
}
function us(e) {
  if (e instanceof Ce) return new Ce(e.h, e.s, e.l, e.opacity);
  if (e instanceof zt || (e = Rt(e)), !e) return new Ce();
  if (e instanceof Ce) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), a = Math.max(t, i, s), d = NaN, o = a - n, r = (a + n) / 2;
  return o ? (t === a ? d = (i - s) / o + (i < s) * 6 : i === a ? d = (s - t) / o + 2 : d = (t - i) / o + 4, o /= r < 0.5 ? a + n : 2 - a - n, d *= 60) : o = r > 0 && r < 1 ? 0 : d, new Ce(d, o, r, e.opacity);
}
function Lr(e, t, i, s) {
  return arguments.length === 1 ? us(e) : new Ce(e, t, i, s ?? 1);
}
function Ce(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
ji(Ce, Lr, ps(zt, {
  brighter(e) {
    return e = e == null ? si : Math.pow(si, e), new Ce(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Tt : Math.pow(Tt, e), new Ce(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new me(
      _i(e >= 240 ? e - 240 : e + 120, n, s),
      _i(e, n, s),
      _i(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Ce(_n(this.h), Ht(this.s), Ht(this.l), oi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = oi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${Ht(this.s) * 100}%, ${Ht(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function _n(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ht(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function _i(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const hs = (e) => () => e;
function Dr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Ur(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function zr(e) {
  return (e = +e) == 1 ? ms : function(t, i) {
    return i - t ? Ur(t, i, e) : hs(isNaN(t) ? i : t);
  };
}
function ms(e, t) {
  var i = t - e;
  return i ? Dr(e, i) : hs(isNaN(e) ? t : e);
}
const kn = (function e(t) {
  var i = zr(t);
  function s(n, a) {
    var d = i((n = Oi(n)).r, (a = Oi(a)).r), o = i(n.g, a.g), r = i(n.b, a.b), l = ms(n.opacity, a.opacity);
    return function(u) {
      return n.r = d(u), n.g = o(u), n.b = r(u), n.opacity = l(u), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function ze(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ti = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ki = new RegExp(Ti.source, "g");
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
function Br(e, t) {
  var i = Ti.lastIndex = ki.lastIndex = 0, s, n, a, d = -1, o = [], r = [];
  for (e = e + "", t = t + ""; (s = Ti.exec(e)) && (n = ki.exec(t)); )
    (a = n.index) > i && (a = t.slice(i, a), o[d] ? o[d] += a : o[++d] = a), (s = s[0]) === (n = n[0]) ? o[d] ? o[d] += n : o[++d] = n : (o[++d] = null, r.push({ i: d, x: ze(s, n) })), i = ki.lastIndex;
  return i < t.length && (a = t.slice(i), o[d] ? o[d] += a : o[++d] = a), o.length < 2 ? r[0] ? Fr(r[0].x) : qr(t) : (t = r.length, function(l) {
    for (var u = 0, m; u < t; ++u) o[(m = r[u]).i] = m.x(l);
    return o.join("");
  });
}
var $n = 180 / Math.PI, Ni = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function fs(e, t, i, s, n, a) {
  var d, o, r;
  return (d = Math.sqrt(e * e + t * t)) && (e /= d, t /= d), (r = e * i + t * s) && (i -= e * r, s -= t * r), (o = Math.sqrt(i * i + s * s)) && (i /= o, s /= o, r /= o), e * s < t * i && (e = -e, t = -t, r = -r, d = -d), {
    translateX: n,
    translateY: a,
    rotate: Math.atan2(t, e) * $n,
    skewX: Math.atan(r) * $n,
    scaleX: d,
    scaleY: o
  };
}
var Wt;
function Vr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ni : fs(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Hr(e) {
  return e == null || (Wt || (Wt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wt.setAttribute("transform", e), !(e = Wt.transform.baseVal.consolidate())) ? Ni : (e = e.matrix, fs(e.a, e.b, e.c, e.d, e.e, e.f));
}
function gs(e, t, i, s) {
  function n(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, u, m, f, h, w) {
    if (l !== m || u !== f) {
      var g = h.push("translate(", null, t, null, i);
      w.push({ i: g - 4, x: ze(l, m) }, { i: g - 2, x: ze(u, f) });
    } else (m || f) && h.push("translate(" + m + t + f + i);
  }
  function d(l, u, m, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: ze(l, u) })) : u && m.push(n(m) + "rotate(" + u + s);
  }
  function o(l, u, m, f) {
    l !== u ? f.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: ze(l, u) }) : u && m.push(n(m) + "skewX(" + u + s);
  }
  function r(l, u, m, f, h, w) {
    if (l !== m || u !== f) {
      var g = h.push(n(h) + "scale(", null, ",", null, ")");
      w.push({ i: g - 4, x: ze(l, m) }, { i: g - 2, x: ze(u, f) });
    } else (m !== 1 || f !== 1) && h.push(n(h) + "scale(" + m + "," + f + ")");
  }
  return function(l, u) {
    var m = [], f = [];
    return l = e(l), u = e(u), a(l.translateX, l.translateY, u.translateX, u.translateY, m, f), d(l.rotate, u.rotate, m, f), o(l.skewX, u.skewX, m, f), r(l.scaleX, l.scaleY, u.scaleX, u.scaleY, m, f), l = u = null, function(h) {
      for (var w = -1, g = f.length, y; ++w < g; ) m[(y = f[w]).i] = y.x(h);
      return m.join("");
    };
  };
}
var Wr = gs(Vr, "px, ", "px)", "deg)"), Gr = gs(Hr, ", ", ")", ")"), jr = 1e-12;
function En(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Yr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Kr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Xr = (function e(t, i, s) {
  function n(a, d) {
    var o = a[0], r = a[1], l = a[2], u = d[0], m = d[1], f = d[2], h = u - o, w = m - r, g = h * h + w * w, y, x;
    if (g < jr)
      x = Math.log(f / l) / t, y = function(F) {
        return [
          o + F * h,
          r + F * w,
          l * Math.exp(t * F * x)
        ];
      };
    else {
      var b = Math.sqrt(g), P = (f * f - l * l + s * g) / (2 * l * i * b), C = (f * f - l * l - s * g) / (2 * f * i * b), N = Math.log(Math.sqrt(P * P + 1) - P), _ = Math.log(Math.sqrt(C * C + 1) - C);
      x = (_ - N) / t, y = function(F) {
        var q = F * x, $ = En(N), M = l / (i * b) * ($ * Kr(t * q + N) - Yr(N));
        return [
          o + M * h,
          r + M * w,
          l * $ / En(t * q + N)
        ];
      };
    }
    return y.duration = x * 1e3 * t / Math.SQRT2, y;
  }
  return n.rho = function(a) {
    var d = Math.max(1e-3, +a), o = d * d, r = o * o;
    return e(d, o, r);
  }, n;
})(Math.SQRT2, 2, 4);
var ct = 0, kt = 0, xt = 0, ys = 1e3, ai, $t, ri = 0, Ze = 0, pi = 0, Lt = typeof performance == "object" && performance.now ? performance : Date, Is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Yi() {
  return Ze || (Is(Qr), Ze = Lt.now() + pi);
}
function Qr() {
  Ze = 0;
}
function di() {
  this._call = this._time = this._next = null;
}
di.prototype = vs.prototype = {
  constructor: di,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Yi() : +i) + (t == null ? 0 : +t), !this._next && $t !== this && ($t ? $t._next = this : ai = this, $t = this), this._call = e, this._time = i, Ri();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ri());
  }
};
function vs(e, t, i) {
  var s = new di();
  return s.restart(e, t, i), s;
}
function Zr() {
  Yi(), ++ct;
  for (var e = ai, t; e; )
    (t = Ze - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ct;
}
function Sn() {
  Ze = (ri = Lt.now()) + pi, ct = kt = 0;
  try {
    Zr();
  } finally {
    ct = 0, ed(), Ze = 0;
  }
}
function Jr() {
  var e = Lt.now(), t = e - ri;
  t > ys && (pi -= t, ri = e);
}
function ed() {
  for (var e, t = ai, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : ai = i);
  $t = e, Ri(s);
}
function Ri(e) {
  if (!ct) {
    kt && (kt = clearTimeout(kt));
    var t = e - Ze;
    t > 24 ? (e < 1 / 0 && (kt = setTimeout(Sn, e - Lt.now() - pi)), xt && (xt = clearInterval(xt))) : (xt || (ri = Lt.now(), xt = setInterval(Jr, ys)), ct = 1, Is(Sn));
  }
}
function Cn(e, t, i) {
  var s = new di();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var td = Gi("start", "end", "cancel", "interrupt"), id = [], xs = 0, An = 1, Li = 2, Zt = 3, Mn = 4, Di = 5, Jt = 6;
function ui(e, t, i, s, n, a) {
  var d = e.__transition;
  if (!d) e.__transition = {};
  else if (i in d) return;
  nd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: td,
    tween: id,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: xs
  });
}
function Ki(e, t) {
  var i = Ae(e, t);
  if (i.state > xs) throw new Error("too late; already scheduled");
  return i;
}
function Te(e, t) {
  var i = Ae(e, t);
  if (i.state > Zt) throw new Error("too late; already running");
  return i;
}
function Ae(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function nd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = vs(a, 0, i.time);
  function a(l) {
    i.state = An, i.timer.restart(d, i.delay, i.time), i.delay <= l && d(l - i.delay);
  }
  function d(l) {
    var u, m, f, h;
    if (i.state !== An) return r();
    for (u in s)
      if (h = s[u], h.name === i.name) {
        if (h.state === Zt) return Cn(d);
        h.state === Mn ? (h.state = Jt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[u]) : +u < t && (h.state = Jt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[u]);
      }
    if (Cn(function() {
      i.state === Zt && (i.state = Mn, i.timer.restart(o, i.delay, i.time), o(l));
    }), i.state = Li, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Li) {
      for (i.state = Zt, n = new Array(f = i.tween.length), u = 0, m = -1; u < f; ++u)
        (h = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = h);
      n.length = m + 1;
    }
  }
  function o(l) {
    for (var u = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(r), i.state = Di, 1), m = -1, f = n.length; ++m < f; )
      n[m].call(e, u);
    i.state === Di && (i.on.call("end", e, e.__data__, i.index, i.group), r());
  }
  function r() {
    i.state = Jt, i.timer.stop(), delete s[t];
    for (var l in s) return;
    delete e.__transition;
  }
}
function ei(e, t) {
  var i = e.__transition, s, n, a = !0, d;
  if (i) {
    t = t == null ? null : t + "";
    for (d in i) {
      if ((s = i[d]).name !== t) {
        a = !1;
        continue;
      }
      n = s.state > Li && s.state < Di, s.state = Jt, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[d];
    }
    a && delete e.__transition;
  }
}
function sd(e) {
  return this.each(function() {
    ei(this, e);
  });
}
function od(e, t) {
  var i, s;
  return function() {
    var n = Te(this, e), a = n.tween;
    if (a !== i) {
      s = i = a;
      for (var d = 0, o = s.length; d < o; ++d)
        if (s[d].name === t) {
          s = s.slice(), s.splice(d, 1);
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
    var a = Te(this, e), d = a.tween;
    if (d !== s) {
      n = (s = d).slice();
      for (var o = { name: t, value: i }, r = 0, l = n.length; r < l; ++r)
        if (n[r].name === t) {
          n[r] = o;
          break;
        }
      r === l && n.push(o);
    }
    a.tween = n;
  };
}
function rd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Ae(this.node(), i).tween, n = 0, a = s.length, d; n < a; ++n)
      if ((d = s[n]).name === e)
        return d.value;
    return null;
  }
  return this.each((t == null ? od : ad)(i, e, t));
}
function Xi(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Te(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Ae(n, s).value[t];
  };
}
function ws(e, t) {
  var i;
  return (typeof t == "number" ? ze : t instanceof Rt ? kn : (i = Rt(t)) ? (t = i, kn) : Br)(e, t);
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
  var s, n = i + "", a;
  return function() {
    var d = this.getAttribute(e);
    return d === n ? null : d === s ? a : a = t(s = d, i);
  };
}
function pd(e, t, i) {
  var s, n = i + "", a;
  return function() {
    var d = this.getAttributeNS(e.space, e.local);
    return d === n ? null : d === s ? a : a = t(s = d, i);
  };
}
function ud(e, t, i) {
  var s, n, a;
  return function() {
    var d, o = i(this), r;
    return o == null ? void this.removeAttribute(e) : (d = this.getAttribute(e), r = o + "", d === r ? null : d === s && r === n ? a : (n = r, a = t(s = d, o)));
  };
}
function hd(e, t, i) {
  var s, n, a;
  return function() {
    var d, o = i(this), r;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (d = this.getAttributeNS(e.space, e.local), r = o + "", d === r ? null : d === s && r === n ? a : (n = r, a = t(s = d, o)));
  };
}
function md(e, t) {
  var i = ci(e), s = i === "transform" ? Gr : ws;
  return this.attrTween(e, typeof t == "function" ? (i.local ? hd : ud)(i, s, Xi(this, "attr." + e, t)) : t == null ? (i.local ? ld : dd)(i) : (i.local ? pd : cd)(i, s, t));
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
function yd(e, t) {
  var i, s;
  function n() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && gd(e, a)), i;
  }
  return n._value = t, n;
}
function Id(e, t) {
  var i, s;
  function n() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && fd(e, a)), i;
  }
  return n._value = t, n;
}
function vd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = ci(e);
  return this.tween(i, (s.local ? yd : Id)(s, t));
}
function xd(e, t) {
  return function() {
    Ki(this, e).delay = +t.apply(this, arguments);
  };
}
function wd(e, t) {
  return t = +t, function() {
    Ki(this, e).delay = t;
  };
}
function bd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? xd : wd)(t, e)) : Ae(this.node(), t).delay;
}
function _d(e, t) {
  return function() {
    Te(this, e).duration = +t.apply(this, arguments);
  };
}
function kd(e, t) {
  return t = +t, function() {
    Te(this, e).duration = t;
  };
}
function $d(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _d : kd)(t, e)) : Ae(this.node(), t).duration;
}
function Ed(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Te(this, e).ease = t;
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
    Te(this, e).ease = i;
  };
}
function Ad(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Cd(this._id, e));
}
function Md(e) {
  typeof e != "function" && (e = ts(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], d = a.length, o = s[n] = [], r, l = 0; l < d; ++l)
      (r = a[l]) && e.call(r, r.__data__, l, a) && o.push(r);
  return new Ue(s, this._parents, this._name, this._id);
}
function Pd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, a = Math.min(s, n), d = new Array(s), o = 0; o < a; ++o)
    for (var r = t[o], l = i[o], u = r.length, m = d[o] = new Array(u), f, h = 0; h < u; ++h)
      (f = r[h] || l[h]) && (m[h] = f);
  for (; o < s; ++o)
    d[o] = t[o];
  return new Ue(d, this._parents, this._name, this._id);
}
function Od(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Td(e, t, i) {
  var s, n, a = Od(t) ? Ki : Te;
  return function() {
    var d = a(this, e), o = d.on;
    o !== s && (n = (s = o).copy()).on(t, i), d.on = n;
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
function Ld() {
  return this.on("end.remove", Rd(this._id));
}
function Dd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Hi(e));
  for (var s = this._groups, n = s.length, a = new Array(n), d = 0; d < n; ++d)
    for (var o = s[d], r = o.length, l = a[d] = new Array(r), u, m, f = 0; f < r; ++f)
      (u = o[f]) && (m = e.call(u, u.__data__, f, o)) && ("__data__" in u && (m.__data__ = u.__data__), l[f] = m, ui(l[f], t, i, f, l, Ae(u, i)));
  return new Ue(a, this._parents, t, i);
}
function Ud(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = es(e));
  for (var s = this._groups, n = s.length, a = [], d = [], o = 0; o < n; ++o)
    for (var r = s[o], l = r.length, u, m = 0; m < l; ++m)
      if (u = r[m]) {
        for (var f = e.call(u, u.__data__, m, r), h, w = Ae(u, i), g = 0, y = f.length; g < y; ++g)
          (h = f[g]) && ui(h, t, i, g, f, w);
        a.push(f), d.push(u);
      }
  return new Ue(a, d, t, i);
}
var zd = Ut.prototype.constructor;
function qd() {
  return new zd(this._groups, this._parents);
}
function Fd(e, t) {
  var i, s, n;
  return function() {
    var a = lt(this, e), d = (this.style.removeProperty(e), lt(this, e));
    return a === d ? null : a === i && d === s ? n : n = t(i = a, s = d);
  };
}
function bs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Bd(e, t, i) {
  var s, n = i + "", a;
  return function() {
    var d = lt(this, e);
    return d === n ? null : d === s ? a : a = t(s = d, i);
  };
}
function Vd(e, t, i) {
  var s, n, a;
  return function() {
    var d = lt(this, e), o = i(this), r = o + "";
    return o == null && (r = o = (this.style.removeProperty(e), lt(this, e))), d === r ? null : d === s && r === n ? a : (n = r, a = t(s = d, o));
  };
}
function Hd(e, t) {
  var i, s, n, a = "style." + t, d = "end." + a, o;
  return function() {
    var r = Te(this, e), l = r.on, u = r.value[a] == null ? o || (o = bs(t)) : void 0;
    (l !== i || n !== u) && (s = (i = l).copy()).on(d, n = u), r.on = s;
  };
}
function Wd(e, t, i) {
  var s = (e += "") == "transform" ? Wr : ws;
  return t == null ? this.styleTween(e, Fd(e, s)).on("end.style." + e, bs(e)) : typeof t == "function" ? this.styleTween(e, Vd(e, s, Xi(this, "style." + e, t))).each(Hd(this._id, e)) : this.styleTween(e, Bd(e, s, t), i).on("end.style." + e, null);
}
function Gd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function jd(e, t, i) {
  var s, n;
  function a() {
    var d = t.apply(this, arguments);
    return d !== n && (s = (n = d) && Gd(e, d, i)), s;
  }
  return a._value = t, a;
}
function Yd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, jd(e, t, i ?? ""));
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
  return this.tween("text", typeof e == "function" ? Xd(Xi(this, "text", e)) : Kd(e == null ? "" : e + ""));
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
  for (var e = this._name, t = this._id, i = _s(), s = this._groups, n = s.length, a = 0; a < n; ++a)
    for (var d = s[a], o = d.length, r, l = 0; l < o; ++l)
      if (r = d[l]) {
        var u = Ae(r, t);
        ui(r, e, i, l, d, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Ue(s, this._parents, e, i);
}
function il() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(a, d) {
    var o = { value: d }, r = { value: function() {
      --n === 0 && a();
    } };
    i.each(function() {
      var l = Te(this, s), u = l.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(r)), l.on = t;
    }), n === 0 && a();
  });
}
var nl = 0;
function Ue(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function _s() {
  return ++nl;
}
var Le = Ut.prototype;
Ue.prototype = {
  constructor: Ue,
  select: Dd,
  selectAll: Ud,
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
  attr: md,
  attrTween: vd,
  style: Wd,
  styleTween: Yd,
  text: Qd,
  textTween: el,
  remove: Ld,
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
  e instanceof Ue ? (t = e._id, e = e._name) : (t = _s(), (i = ol).time = Yi(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, a = 0; a < n; ++a)
    for (var d = s[a], o = d.length, r, l = 0; l < o; ++l)
      (r = d[l]) && ui(r, e, t, l, d, i || al(r, t));
  return new Ue(s, this._parents, e, t);
}
Ut.prototype.interrupt = sd;
Ut.prototype.transition = rl;
const Gt = (e) => () => e;
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
function De(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
De.prototype = {
  constructor: De,
  scale: function(e) {
    return e === 1 ? this : new De(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new De(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ct = new De(1, 0, 0);
De.prototype;
function $i(e) {
  e.stopImmediatePropagation();
}
function wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ll(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function cl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Pn() {
  return this.__zoom || Ct;
}
function pl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ul() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], d = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    d > a ? (a + d) / 2 : Math.min(0, a) || Math.max(0, d)
  );
}
function ml() {
  var e = ll, t = cl, i = hl, s = pl, n = ul, a = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, r = Xr, l = Gi("start", "zoom", "end"), u, m, f, h = 500, w = 150, g = 0, y = 10;
  function x(p) {
    p.property("__zoom", Pn).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", M).filter(n).on("touchstart.zoom", S).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", U).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(p, I, v, E) {
    var D = p.selection ? p.selection() : p;
    D.property("__zoom", Pn), p !== D ? N(p, I, v, E) : D.interrupt().each(function() {
      _(this, arguments).event(E).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, x.scaleBy = function(p, I, v, E) {
    x.scaleTo(p, function() {
      var D = this.__zoom.k, z = typeof I == "function" ? I.apply(this, arguments) : I;
      return D * z;
    }, v, E);
  }, x.scaleTo = function(p, I, v, E) {
    x.transform(p, function() {
      var D = t.apply(this, arguments), z = this.__zoom, A = v == null ? C(D) : typeof v == "function" ? v.apply(this, arguments) : v, R = z.invert(A), j = typeof I == "function" ? I.apply(this, arguments) : I;
      return i(P(b(z, j), A, R), D, d);
    }, v, E);
  }, x.translateBy = function(p, I, v, E) {
    x.transform(p, function() {
      return i(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), d);
    }, null, E);
  }, x.translateTo = function(p, I, v, E, D) {
    x.transform(p, function() {
      var z = t.apply(this, arguments), A = this.__zoom, R = E == null ? C(z) : typeof E == "function" ? E.apply(this, arguments) : E;
      return i(Ct.translate(R[0], R[1]).scale(A.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), z, d);
    }, E, D);
  };
  function b(p, I) {
    return I = Math.max(a[0], Math.min(a[1], I)), I === p.k ? p : new De(I, p.x, p.y);
  }
  function P(p, I, v) {
    var E = I[0] - v[0] * p.k, D = I[1] - v[1] * p.k;
    return E === p.x && D === p.y ? p : new De(p.k, E, D);
  }
  function C(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function N(p, I, v, E) {
    p.on("start.zoom", function() {
      _(this, arguments).event(E).start();
    }).on("interrupt.zoom end.zoom", function() {
      _(this, arguments).event(E).end();
    }).tween("zoom", function() {
      var D = this, z = arguments, A = _(D, z).event(E), R = t.apply(D, z), j = v == null ? C(R) : typeof v == "function" ? v.apply(D, z) : v, te = Math.max(R[1][0] - R[0][0], R[1][1] - R[0][1]), ee = D.__zoom, pe = typeof I == "function" ? I.apply(D, z) : I, _e = r(ee.invert(j).concat(te / ee.k), pe.invert(j).concat(te / pe.k));
      return function(ge) {
        if (ge === 1) ge = pe;
        else {
          var ke = _e(ge), ht = te / ke[2];
          ge = new De(ht, j[0] - ke[0] * ht, j[1] - ke[1] * ht);
        }
        A.zoom(null, ge);
      };
    });
  }
  function _(p, I, v) {
    return !v && p.__zooming || new F(p, I);
  }
  function F(p, I) {
    this.that = p, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, I), this.taps = 0;
  }
  F.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, I) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var I = Se(this.that).datum();
      l.call(
        p,
        this.that,
        new dl(p, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: l
        }),
        I
      );
    }
  };
  function q(p, ...I) {
    if (!e.apply(this, arguments)) return;
    var v = _(this, I).event(p), E = this.__zoom, D = Math.max(a[0], Math.min(a[1], E.k * Math.pow(2, s.apply(this, arguments)))), z = He(p);
    if (v.wheel)
      (v.mouse[0][0] !== z[0] || v.mouse[0][1] !== z[1]) && (v.mouse[1] = E.invert(v.mouse[0] = z)), clearTimeout(v.wheel);
    else {
      if (E.k === D) return;
      v.mouse = [z, E.invert(z)], ei(this), v.start();
    }
    wt(p), v.wheel = setTimeout(A, w), v.zoom("mouse", i(P(b(E, D), v.mouse[0], v.mouse[1]), v.extent, d));
    function A() {
      v.wheel = null, v.end();
    }
  }
  function $(p, ...I) {
    if (f || !e.apply(this, arguments)) return;
    var v = p.currentTarget, E = _(this, I, !0).event(p), D = Se(p.view).on("mousemove.zoom", j, !0).on("mouseup.zoom", te, !0), z = He(p, v), A = p.clientX, R = p.clientY;
    _r(p.view), $i(p), E.mouse = [z, this.__zoom.invert(z)], ei(this), E.start();
    function j(ee) {
      if (wt(ee), !E.moved) {
        var pe = ee.clientX - A, _e = ee.clientY - R;
        E.moved = pe * pe + _e * _e > g;
      }
      E.event(ee).zoom("mouse", i(P(E.that.__zoom, E.mouse[0] = He(ee, v), E.mouse[1]), E.extent, d));
    }
    function te(ee) {
      D.on("mousemove.zoom mouseup.zoom", null), kr(ee.view, E.moved), wt(ee), E.event(ee).end();
    }
  }
  function M(p, ...I) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, E = He(p.changedTouches ? p.changedTouches[0] : p, this), D = v.invert(E), z = v.k * (p.shiftKey ? 0.5 : 2), A = i(P(b(v, z), E, D), t.apply(this, I), d);
      wt(p), o > 0 ? Se(this).transition().duration(o).call(N, A, E, p) : Se(this).call(x.transform, A, E, p);
    }
  }
  function S(p, ...I) {
    if (e.apply(this, arguments)) {
      var v = p.touches, E = v.length, D = _(this, I, p.changedTouches.length === E).event(p), z, A, R, j;
      for ($i(p), A = 0; A < E; ++A)
        R = v[A], j = He(R, this), j = [j, this.__zoom.invert(j), R.identifier], D.touch0 ? !D.touch1 && D.touch0[2] !== j[2] && (D.touch1 = j, D.taps = 0) : (D.touch0 = j, z = !0, D.taps = 1 + !!u);
      u && (u = clearTimeout(u)), z && (D.taps < 2 && (m = j[0], u = setTimeout(function() {
        u = null;
      }, h)), ei(this), D.start());
    }
  }
  function O(p, ...I) {
    if (this.__zooming) {
      var v = _(this, I).event(p), E = p.changedTouches, D = E.length, z, A, R, j;
      for (wt(p), z = 0; z < D; ++z)
        A = E[z], R = He(A, this), v.touch0 && v.touch0[2] === A.identifier ? v.touch0[0] = R : v.touch1 && v.touch1[2] === A.identifier && (v.touch1[0] = R);
      if (A = v.that.__zoom, v.touch1) {
        var te = v.touch0[0], ee = v.touch0[1], pe = v.touch1[0], _e = v.touch1[1], ge = (ge = pe[0] - te[0]) * ge + (ge = pe[1] - te[1]) * ge, ke = (ke = _e[0] - ee[0]) * ke + (ke = _e[1] - ee[1]) * ke;
        A = b(A, Math.sqrt(ge / ke)), R = [(te[0] + pe[0]) / 2, (te[1] + pe[1]) / 2], j = [(ee[0] + _e[0]) / 2, (ee[1] + _e[1]) / 2];
      } else if (v.touch0) R = v.touch0[0], j = v.touch0[1];
      else return;
      v.zoom("touch", i(P(A, R, j), v.extent, d));
    }
  }
  function U(p, ...I) {
    if (this.__zooming) {
      var v = _(this, I).event(p), E = p.changedTouches, D = E.length, z, A;
      for ($i(p), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), z = 0; z < D; ++z)
        A = E[z], v.touch0 && v.touch0[2] === A.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === A.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (A = He(A, this), Math.hypot(m[0] - A[0], m[1] - A[1]) < y)) {
        var R = Se(this).on("dblclick.zoom");
        R && R.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Gt(+p), x) : s;
  }, x.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Gt(!!p), x) : e;
  }, x.touchable = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Gt(!!p), x) : n;
  }, x.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Gt([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), x) : t;
  }, x.scaleExtent = function(p) {
    return arguments.length ? (a[0] = +p[0], a[1] = +p[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(p) {
    return arguments.length ? (d[0][0] = +p[0][0], d[1][0] = +p[1][0], d[0][1] = +p[0][1], d[1][1] = +p[1][1], x) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, x.constrain = function(p) {
    return arguments.length ? (i = p, x) : i;
  }, x.duration = function(p) {
    return arguments.length ? (o = +p, x) : o;
  }, x.interpolate = function(p) {
    return arguments.length ? (r = p, x) : r;
  }, x.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? x : p;
  }, x.clickDistance = function(p) {
    return arguments.length ? (g = (p = +p) * p, x) : Math.sqrt(g);
  }, x.tapDistance = function(p) {
    return arguments.length ? (y = +p, x) : y;
  }, x;
}
var fl = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, le = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? gl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && fl(t, i, n), n;
};
function yl(e, t, i, s) {
  const n = t.x - e.x, a = t.y - e.y, d = s.x - i.x, o = s.y - i.y, r = n * o - a * d;
  if (Math.abs(r) < 1e-9) return null;
  const l = ((i.x - e.x) * o - (i.y - e.y) * d) / r, u = ((i.x - e.x) * a - (i.y - e.y) * n) / r;
  return l <= 0.02 || l >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + l * n, y: e.y + l * a, t: l };
}
function Il(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, a = s * s + n * n || 1, d = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / a)), o = t.x + d * s, r = t.y + d * n;
  return { dist: Math.hypot(e.x - o, e.y - r), t: d };
}
function vl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const a = e[n], d = e[n + 1], o = Math.hypot(d.x - a.x, d.y - a.y) || 1, r = (d.x - a.x) / o, l = (d.y - a.y) / o, u = t.map(([f, h]) => yl(a, d, f, h)).filter((f) => f !== null).filter((f) => f.t * o > i + 2 && (1 - f.t) * o > i + 2).sort((f, h) => f.t - h.t);
    let m = -1 / 0;
    for (const f of u)
      f.t * o - i <= m + 2 || (s += ` L ${f.x - r * i} ${f.y - l * i}`, s += ` A ${i} ${i} 0 0 1 ${f.x + r * i} ${f.y + l * i}`, m = f.t * o + i);
    s += ` L ${d.x} ${d.y}`;
  }
  return s;
}
const ot = {
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
let ae = class extends Pe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ct, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const n = this.scene.nodes.filter((a) => this.selectedIds.includes(a.id)).map((a) => ({ id: a.id, kind: a.kind }));
            n.length && this.emit("delete-selection-requested", { items: n });
            return;
          }
          if (this._selectedWaypoint) {
            const n = this.scene.edges.find((a) => a.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = ml().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const n = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, d = this.fitInsets.top ?? 0, o = this.fitInsets.bottom ?? 0, r = Math.max(80, s.width - n - a), l = Math.max(80, s.height - d - o), u = Math.min(...t.map((y) => y.x - y.w / 2)) - e, m = Math.max(...t.map((y) => y.x + y.w / 2)) + e, f = Math.min(...t.map((y) => y.y - y.h / 2)) - e, h = Math.max(...t.map((y) => y.y + y.h / 2)) + e, w = Math.max(0.15, Math.min(r / (m - u), l / (h - f), 1.25)), g = Ct.translate(
      n + r / 2 - w * (u + m) / 2,
      d + l / 2 - w * (f + h) / 2
    ).scale(w);
    Se(i).call(this._zoomBehavior.transform, g);
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
    for (let a = e.parentId; a; a = (s = this.scene.nodes.find((d) => d.id === a)) == null ? void 0 : s.parentId) {
      const d = this.scene.nodes.find((r) => r.id === a);
      if (!d) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - d.x), y: e.y + (this._dragPos.y - d.y) };
      const o = (n = this._dragGroup) == null ? void 0 : n.get(a);
      if (o)
        return { x: e.x + (o.x - d.x), y: e.y + (o.y - d.y) };
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
        const n = this.nodePos(s), a = n.x - s.w / 2 + 10 + e.w / 2, d = n.x + s.w / 2 - 10 - e.w / 2, o = n.y - s.h / 2 + 34 + e.h / 2, r = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), d), i = Math.min(Math.max(i, o), r);
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
    for (const a of i) {
      const d = (n = a.closest) == null ? void 0 : n.call(a, "[data-node-id]");
      if (d) return d.getAttribute("data-node-id");
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
    const a = new Set(this.selectedIds), d = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => a.has(f.id) && !(f.parentId && a.has(f.parentId))
    ) : null, o = d ? new Map(d.map((f) => [f.id, this.nodePos(f)])) : null, r = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !d, l = (f) => {
      const h = this.nodeIdAt(f), w = h && h !== t.id ? this.scene.nodes.find((g) => g.id === h) : void 0;
      return w ? w.kind === "external-system" ? w.id : w.parentId ?? null : null;
    }, u = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const h = this.toScene(f), w = h.x - i.x, g = h.y - i.y;
      if (!(!n && Math.hypot(w, g) < 3 / this._t.k))
        if (n = !0, d && o) {
          const y = /* @__PURE__ */ new Map();
          for (const x of d) {
            const b = o.get(x.id), P = this.clampToParent(x, b.x + w, b.y + g);
            y.set(x.id, { x: P.x, y: P.y });
          }
          this._dragGroup = y;
        } else r(f) ? (this._dragPos = { id: t.id, x: s.x + w, y: s.y + g }, this._hoverNodeId = l(f)) : (this._dragPos = this.clampToParent(t, s.x + w, s.y + g), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, w]) => ({ id: h, x: w.x, y: w.y }))
        });
      else if (n && this._dragPos) {
        if (r(f)) {
          const h = l(f);
          if (f.ctrlKey && t.kind === "api") {
            h && h !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: h,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (h !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: h,
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
    const n = 160, a = 90, d = { x: t.x, y: t.y, w: t.w, h: t.h }, o = this.scene.nodes.filter((g) => g.parentId === t.id), r = Math.min(...o.map((g) => g.x - g.w / 2)), l = Math.max(...o.map((g) => g.x + g.w / 2)), u = Math.min(...o.map((g) => g.y - g.h / 2)), m = Math.max(...o.map((g) => g.y + g.h / 2)), f = Hs(
      o.map((g) => ({ dx: g.x - d.x, dy: g.y - d.y, w: g.w, h: g.h })),
      { w: n, h: a }
    ), h = (g) => {
      if ((g.buttons & 1) === 0) {
        w();
        return;
      }
      const y = this.toScene(g);
      if (g.shiftKey) {
        this._resize = {
          id: t.id,
          x: d.x,
          y: d.y,
          w: Math.max(f.w, 2 * Math.abs(y.x - d.x)),
          h: Math.max(f.h, 2 * Math.abs(y.y - d.y))
        };
        return;
      }
      const x = d.x - i * d.w / 2, b = d.y - s * d.h / 2, P = i > 0 ? Math.max(y.x, x + n, o.length ? l + 10 : -1 / 0) : Math.min(y.x, x - n, o.length ? r - 10 : 1 / 0), C = s > 0 ? Math.max(y.y, b + a, o.length ? m + 10 : -1 / 0) : Math.min(y.y, b - a, o.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + P) / 2,
        y: (b + C) / 2,
        w: Math.abs(P - x),
        h: Math.abs(C - b)
      };
    }, w = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", w), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", w);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const s = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, n = (a) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n);
      const d = this.nodeIdAt(a);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
        x: a.clientX,
        y: a.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", n);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), a = t - s, d = i - n, o = e.w / 2, r = e.h / 2;
    if (a === 0 && d === 0) return { x: s, y: n };
    const l = 1 / Math.max(Math.abs(a) / o, Math.abs(d) / r);
    return { x: s + a * l, y: n + d * l };
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), a = this.nodePos(i), d = s[0] ?? a, o = s[s.length - 1] ?? n;
    let r = this.borderPoint(t, d.x, d.y), l = this.borderPoint(i, o.x, o.y);
    if (!s.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(l.x - r.x, l.y - r.y) || 1, f = -(l.y - r.y) / m * u, h = (l.x - r.x) / m * u;
        r = { x: r.x + f, y: r.y + h }, l = { x: l.x + f, y: l.y + h };
      }
    }
    return [r, ...s, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (d) => {
      if (!this._wpDrag) return;
      s = !0;
      const o = this.toScene(d), r = [...this._wpDrag.points];
      r[this._wpDrag.index] = o, this._wpDrag = { ...this._wpDrag, points: r };
    }, a = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = Il(t, e[s], e[s + 1]);
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
    let a = !1;
    const d = (r) => {
      if ((r.buttons & 1) === 0) {
        o();
        return;
      }
      const l = this.toScene(r);
      if (a) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[n] = l, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(l.x - s.x, l.y - s.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(n, 0, l), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: u, index: n };
      }
    }, o = () => {
      window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", o), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", d), window.addEventListener("pointerup", o);
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, a = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), d = Math.floor((t.length - 1) / 2), o = {
      x: (t[d].x + t[d + 1].x) / 2,
      y: (t[d].y + t[d + 1].y) / 2
    }, r = t.slice(1, -1);
    return G`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${vl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? G`<text x=${o.x} y=${o.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${s}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(l) => {
      l.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(l) => {
      l.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: l.clientX,
        y: l.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${n ? r.map((l, u) => {
      var f;
      const m = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === u;
      return G`
                <circle data-waypoint cx=${l.x} cy=${l.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(h) => {
        h.button === 0 && (h.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: u }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], u));
      }}
                        @dblclick=${(h) => {
        h.stopPropagation(), this.removeWaypoint(e, u);
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
    var f, h, w;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, a = !!e.container, d = !!e.parentId, o = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, r = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, l = o / 2, u = r / 2, m = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return G`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? G`<rect x=${-l - 4} y=${-u - 4} width=${o + 8} height=${r + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-u} width=${o} height=${r} rx=${d ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? G`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? G`<text x=${-l} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? G`<g transform="translate(${l - 13}, ${-u + 13})"
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
        ${e.symbol && ot[e.symbol] && !d ? G`<g transform="translate(${l - (e.collapsible ? 37 : 17)}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ot[e.symbol]}
              </g>` : ""}
        ${d && e.symbol && ot[e.symbol] ? G`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ot[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? G`
              <foreignObject x=${-l + 6} y=${a ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : d ? G`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : a ? G`<text x=${-l + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : G`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? G`<line x1=${-l + 8} y1=${-u + 28} x2=${l - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (d ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [l, 0],
      [-l, 0],
      [0, u],
      [0, -u]
    ].map(
      ([g, y]) => G`
                <circle data-handle cx=${g} cy=${y} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${a && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, y]) => G`
                <rect data-resize x=${g * l - 6.5} y=${y * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * y > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, g, y)}>
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
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (d) => {
      if ((d.buttons & 1) === 0) {
        s();
        return;
      }
      const o = this.toScene(d);
      !i && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: o });
    }, a = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: d, b: o } = this._rubber, r = Math.min(d.x, o.x), l = Math.max(d.x, o.x), u = Math.min(d.y, o.y), m = Math.max(d.y, o.y), f = this.scene.nodes.filter((h) => {
          const w = this.nodePos(h);
          return w.x >= r && w.x <= l && w.y >= u && w.y <= m;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", s);
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
    const i = Math.min(...t.map((d) => d.x - d.w / 2)) - e, s = Math.max(...t.map((d) => d.x + d.w / 2)) + e, n = Math.min(...t.map((d) => d.y - d.h / 2)) - e, a = Math.max(...t.map((d) => d.y + d.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: a - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, a = Ct.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Se(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, a = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return k``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, d = (0 - this._t.y) / this._t.k, o = n.width / this._t.k, r = n.height / this._t.k;
    return k`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(l) => {
      l.stopPropagation();
      try {
        l.currentTarget.setPointerCapture(l.pointerId);
      } catch {
      }
      this.onMinimapPointer(l, e, s);
    }}
        @pointermove=${(l) => {
      var u, m;
      (m = (u = l.currentTarget).hasPointerCapture) != null && m.call(u, l.pointerId) && this.onMinimapPointer(l, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const u = this.nodePos(l);
      return G`<rect
              x=${(u.x - l.w / 2 - e.minX) * s}
              y=${(u.y - l.h / 2 - e.minY) * s}
              width=${Math.max(2, l.w * s)}
              height=${Math.max(2, l.h * s)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * s}
            y=${(d - e.minY) * s}
            width=${o * s}
            height=${r * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((n) => n.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((n) => {
      const a = this.edgePolyline(n);
      if (a) {
        i.push(this.renderEdgeHit(n, a)), s.push(this.renderEdgeInk(n, a, [...t]));
        for (let d = 0; d < a.length - 1; d++) t.push([a[d], a[d + 1]]);
      }
    }), k`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(n) => {
      const a = n.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || n.button !== 0 || (n.buttons & 1) !== 0 && this.startRubberBand(n);
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
ae.styles = pt`
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
le([
  J({ attribute: !1 })
], ae.prototype, "scene", 2);
le([
  J({ attribute: !1 })
], ae.prototype, "selectedId", 2);
le([
  J({ attribute: !1 })
], ae.prototype, "selectedIds", 2);
le([
  J({ type: Boolean })
], ae.prototype, "connectable", 2);
le([
  J({ attribute: !1 })
], ae.prototype, "edgePoints", 2);
le([
  L()
], ae.prototype, "_t", 2);
le([
  L()
], ae.prototype, "_dragPos", 2);
le([
  L()
], ae.prototype, "_dragGroup", 2);
le([
  L()
], ae.prototype, "_pendingLink", 2);
le([
  L()
], ae.prototype, "_hoverNodeId", 2);
le([
  L()
], ae.prototype, "_editingId", 2);
le([
  L()
], ae.prototype, "_spaceDown", 2);
le([
  L()
], ae.prototype, "_wpDrag", 2);
le([
  L()
], ae.prototype, "_selectedWaypoint", 2);
le([
  L()
], ae.prototype, "_resize", 2);
le([
  L()
], ae.prototype, "_rubber", 2);
le([
  J({ attribute: !1 })
], ae.prototype, "fitInsets", 2);
ae = le([
  ut("modux-canvas")
], ae);
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
function ye(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function oe(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const tt = (e) => e.trim().toLowerCase();
function xl(e, t) {
  var $, M, S, O, U;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((p) => [p.id, p.name])), n = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((I) => ({ ...I, moduleId: p.id }))
  ), a = new Set(n.map((p) => p.id)), d = e.aggregates ?? [], o = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((I) => I.id))
  ), r = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((I) => ({ ...I, moduleId: p.id, application: !1 }))
  ), l = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((I) => ({ ...I, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((I) => ({ ...I, moduleId: p.id }))
  );
  for (const p of n)
    ye(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: H.command.w,
      h: H.command.h,
      kind: "use-case",
      symbol: p.policy ? "flow" : "gear",
      fill: p.policy ? H.policy.fill : H.command.fill,
      stroke: p.policy ? H.policy.stroke : H.command.stroke,
      badge: p.policy ? "POLICY" : "COMANDO",
      tooltip: p.policy ? `${p.name} — policy de ${s.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${s.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of d)
    ye(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: H.aggregate.w,
      h: H.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: H.aggregate.fill,
      stroke: H.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${p.name} — agregado de ${s.get(p.moduleId) ?? p.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const p of [...r, ...l])
    ye(i, {
      id: p.id,
      label: p.name,
      x: 0,
      y: 0,
      w: H.event.w,
      h: H.event.h,
      kind: p.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: H.event.fill,
      stroke: H.event.stroke,
      badge: p.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${p.name} — evento de ${s.get(p.moduleId) ?? p.moduleId}`
    }), m.set(tt(p.name), p.id);
  const f = (p) => {
    if (!p || !p.trim()) return null;
    const I = m.get(tt(p));
    if (I) return I;
    const v = `evname:${tt(p)}`;
    return ye(i, {
      id: v,
      label: p,
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
      tooltip: `${p} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, h = (p) => {
    const I = u.find((E) => E.id === p.id) ?? u.find((E) => p.name && tt(E.name) === tt(p.name)), v = (I == null ? void 0 : I.id) ?? (p.id || (p.name ? `rm:${tt(p.name)}` : null));
    return v ? (ye(i, {
      id: v,
      label: (I == null ? void 0 : I.name) ?? p.name ?? v,
      x: 0,
      y: 0,
      w: H.readModel.w,
      h: H.readModel.h,
      kind: I ? "read-model" : "derived-read-model",
      fill: H.readModel.fill,
      stroke: H.readModel.stroke,
      dashed: !I,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!a.has(p.targetId)) continue;
    const I = (e.actors ?? []).find((v) => v.id === p.actorId);
    I && (ye(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: H.actor.w,
      h: H.actor.h,
      kind: "actor",
      symbol: "person",
      fill: H.actor.fill,
      stroke: H.actor.stroke,
      badge: "ACTOR"
    }), oe(i, {
      id: `es-actor:${I.id}->${p.targetId}`,
      sourceId: I.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const I = (e.agentUses ?? []).filter((A) => A.agentId === p.id), v = (e.agentExternalUses ?? []).filter((A) => A.agentId === p.id), E = (e.agentRags ?? []).filter((A) => A.agentId === p.id), D = (e.agentMcpUses ?? []).filter((A) => A.agentId === p.id), z = (e.agentGatewayUses ?? []).some((A) => A.agentId === p.id) || (e.agentApiOpUses ?? []).some((A) => A.agentId === p.id) || (e.agentQueryUses ?? []).some((A) => A.agentId === p.id) || (e.agentDelegations ?? []).some((A) => A.agentId === p.id) || (e.agentTriggers ?? []).some((A) => A.agentId === p.id);
    if (!(!I.length && !v.length && !E.length && !D.length && !z)) {
      ye(i, {
        id: p.id,
        label: p.name,
        x: 0,
        y: 0,
        w: H.actor.w,
        h: H.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${p.name} — agente de IA (consume por MCP)`
      });
      for (const A of I)
        a.has(A.useCaseId) && oe(i, {
          id: `es-agent:${p.id}->${A.useCaseId}`,
          sourceId: p.id,
          targetId: A.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const A of v) {
        const R = e.externalSystems.find(
          (te) => (te.useCases ?? []).some((ee) => ee.id === A.externalUseCaseId)
        );
        if (!R) continue;
        const j = ($ = (R.useCases ?? []).find((te) => te.id === A.externalUseCaseId)) == null ? void 0 : $.name;
        ye(i, {
          id: R.id,
          label: R.name,
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
        }), oe(i, {
          id: `es-agentx:${p.id}->${A.externalUseCaseId}`,
          sourceId: p.id,
          targetId: R.id,
          kind: "es-agent-external",
          label: j,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: j ? `Llama a ${j} del sistema externo` : void 0
        });
      }
      for (const A of D) {
        const R = e.externalSystems.find(
          (te) => (te.mcpServers ?? []).some((ee) => ee.id === A.mcpServerId)
        );
        if (!R) continue;
        const j = (M = (R.mcpServers ?? []).find((te) => te.id === A.mcpServerId)) == null ? void 0 : M.name;
        ye(i, {
          id: R.id,
          label: R.name,
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
        }), oe(i, {
          id: `es-agentmcp:${p.id}->${A.mcpServerId}`,
          sourceId: p.id,
          targetId: R.id,
          kind: "es-agent-mcp",
          label: j,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: j ? `Consume las herramientas del servidor MCP ${j}` : void 0
        });
      }
      for (const A of E) {
        const R = (e.rags ?? []).find((j) => j.id === A.ragId);
        if (R) {
          ye(i, {
            id: R.id,
            label: R.name,
            x: 0,
            y: 0,
            w: H.readModel.w,
            h: H.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${R.name} — base de conocimiento (retrieval)`
          }), oe(i, {
            id: `es-agrag:${p.id}->${R.id}`,
            sourceId: p.id,
            targetId: R.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const j of R.sourceReadModelIds ?? []) {
            const te = h({ id: j });
            te && oe(i, {
              id: `es-ragsrc:${R.id}->${te}`,
              sourceId: te,
              targetId: R.id,
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
    const I = e.externalSystems.find((v) => v.id === p);
    return I ? (ye(i, {
      id: I.id,
      label: I.name,
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
    }), I.id) : null;
  };
  for (const p of e.externalCalls ?? []) {
    const I = w(p.externalSystemId);
    !I || !a.has(p.useCaseId) || oe(i, {
      id: `es-extin:${I}->${p.useCaseId}`,
      sourceId: I,
      targetId: p.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const p of e.externalUseCaseCalls ?? []) {
    if (!a.has(p.sourceId)) continue;
    const I = e.externalSystems.find(
      (D) => (D.useCases ?? []).some((z) => z.id === p.targetId)
    ), v = I ? w(I.id) : null;
    if (!v) continue;
    const E = (S = ((I == null ? void 0 : I.useCases) ?? []).find((D) => D.id === p.targetId)) == null ? void 0 : S.name;
    oe(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: E,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: E ? `Llama a ${E} del sistema externo` : void 0
    });
  }
  for (const p of e.aggregateCalls ?? [])
    !a.has(p.sourceId) || !i.nodes.has(p.targetId) || oe(i, {
      id: `es-write:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: p.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const g = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const p of g)
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (a.has(p.sourceId) || d.some((v) => v.id === p.sourceId) || o.has(p.sourceId))) || oe(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const y = (p, I, v, E, D, z) => (ye(i, {
    id: p,
    label: I,
    x: 0,
    y: 0,
    w: H.policy.w,
    h: H.policy.h,
    kind: v,
    symbol: "flow",
    fill: H.policy.fill,
    stroke: H.policy.stroke,
    badge: E,
    tooltip: D
  }), p), x = (p, I) => {
    const v = f(p);
    v && oe(i, {
      id: `es-trigger:${v}->${I}`,
      sourceId: v,
      targetId: I,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, b = (p, I) => {
    !I || !a.has(I) || oe(i, {
      id: `es-invoke:${p}->${I}`,
      sourceId: p,
      targetId: I,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const p of e.subscriptions ?? []) {
    const I = y(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    x(p.eventName, I);
    for (const v of p.actions ?? []) {
      if (v.type === "CallUseCase" && b(I, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const E = `saga:${v.sagaId}`;
        y(E, v.sagaId, "saga", "SAGA"), oe(i, {
          id: `es-saga:${I}->${E}`,
          sourceId: I,
          targetId: E,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const E = (e.projections ?? []).find((D) => D.id === v.projectionId);
        E && oe(i, {
          id: `es-feeds:${I}->${E.id}`,
          sourceId: I,
          targetId: E.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const I = y(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const D of p.handledEventIds) {
      const z = i.nodes.has(D) ? D : null;
      z && oe(i, {
        id: `es-trigger:${z}->${I}`,
        sourceId: z,
        targetId: I,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && oe(i, {
      id: `es-state:${p.id}`,
      sourceId: p.sourceAggregateId,
      targetId: I,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (v) {
      const D = e.externalSystems.find(
        (A) => (A.useCases ?? []).some((R) => R.id === v) || (A.tables ?? []).some((R) => R.id === v)
      ), z = D ? w(D.id) : null;
      if (z) {
        const A = ((O = (D.useCases ?? []).find((R) => R.id === v)) == null ? void 0 : O.name) ?? ((U = (D.tables ?? []).find((R) => R.id === v)) == null ? void 0 : U.name);
        oe(i, {
          id: `es-poll:${p.id}`,
          sourceId: z,
          targetId: I,
          kind: "es-projects-poll",
          label: A,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: A ? `polling de ${A}` : "polling"
        });
      }
    }
    const E = h({ id: p.readModelId, name: p.readModelName });
    E && oe(i, {
      id: `es-projects:${I}->${E}`,
      sourceId: I,
      targetId: E,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const v = f(p.triggerEvent), E = h({ name: p.readModelName ?? `${p.triggerEvent}View` });
      v && E && oe(i, {
        id: `es-mat:${p.id}`,
        sourceId: v,
        targetId: E,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const I = y(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (x(p.triggerEvent, I), b(I, p.targetUseCaseId), !p.targetUseCaseId) {
      const v = w(p.targetId), E = v ?? `tgt:${p.targetId}`;
      !v && s.has(p.targetId) && ye(i, {
        id: E,
        label: s.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: H.module.w,
        h: H.module.h,
        kind: "module",
        symbol: "component",
        fill: H.module.fill,
        stroke: H.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(E) && oe(i, {
        id: `es-deliver:${p.id}`,
        sourceId: I,
        targetId: E,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const I = y(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    x(p.triggerEvent, I);
    for (const E of p.steps) b(I, E.useCaseId);
    const v = f(p.onCompletionEventName);
    v && oe(i, {
      id: `es-done:${p.id}`,
      sourceId: I,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const I = y(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    x(p.triggerEvent, I);
    for (const E of p.steps ?? []) {
      b(I, E.targetUseCaseId);
      for (const D of [E.emittedEventName, E.completionEventName]) {
        const z = f(D);
        z && oe(i, {
          id: `es-wfemit:${p.id}:${z}`,
          sourceId: I,
          targetId: z,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = f(p.onCompletionEventName);
    v && oe(i, {
      id: `es-done:${p.id}`,
      sourceId: I,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const P = [...i.nodes.values()], C = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    C.has(p.targetId) || C.set(p.targetId, []), C.get(p.targetId).push(p.sourceId);
  const N = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), F = (p) => {
    const I = N.get(p);
    if (I !== void 0) return I;
    if (_.has(p)) return 0;
    _.add(p);
    const v = C.get(p) ?? [], E = v.length ? 1 + Math.max(...v.map(F)) : 0;
    return _.delete(p), N.set(p, E), E;
  }, q = /* @__PURE__ */ new Map();
  for (const p of P) {
    const I = t[p.id];
    if (I) {
      p.x = I.x, p.y = I.y;
      continue;
    }
    const v = F(p.id), E = q.get(v) ?? 0;
    q.set(v, E + 1), p.x = 140 + v * 260, p.y = 110 + E * 110;
  }
  return { nodes: P, edges: i.edges };
}
const wl = 190, bl = 56, On = 180, _l = 56, kl = 150, $l = 44, Tn = 250, Nn = 100;
function El(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const a = (n.dependsOnStepIds ?? []).map((o) => t.get(o)).filter(Boolean), d = a.length ? 1 + Math.max(...a.map(s)) : 0;
    return i.delete(n.id), d;
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
  const i = [], s = [], n = /* @__PURE__ */ new Set(), a = (o) => {
    var r;
    return (r = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === o)) == null ? void 0 : r.name;
  };
  let d = 140;
  return (e.workflows ?? []).forEach((o) => {
    var y;
    const r = new Map(o.steps.map((x) => [x.id, x])), l = new Map(o.steps.map((x) => [x.id, El(x, r)])), u = /* @__PURE__ */ new Map();
    for (const x of o.steps) {
      const b = l.get(x.id) ?? 0;
      u.set(b, (u.get(b) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), f = Sl(e, o);
    if (f && !n.has(f.id)) {
      n.add(f.id);
      const x = t[f.id] ?? { x: 140, y: d };
      i.push({
        id: f.id,
        label: f.label,
        x: x.x,
        y: x.y,
        w: kl,
        h: $l,
        kind: f.kind,
        symbol: f.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: f.kind === "aggregate" ? "AGGREGATE" : f.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[o.id] ?? { x: 420, y: d };
    i.push({
      id: o.id,
      label: o.name,
      x: h.x,
      y: h.y,
      w: wl,
      h: bl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${o.name}${o.triggerEvent ? ` — arranca con ${o.triggerEvent}` : ""}${o.onCompletionEventName ? ` · emite ${o.onCompletionEventName} al completar` : ""}`
    }), f && s.push({
      id: `wft:${o.id}`,
      sourceId: f.id,
      targetId: o.id,
      kind: "workflow-trigger",
      label: o.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: o.triggerEvent ? `Evento: ${o.triggerEvent}` : void 0
    });
    const w = /* @__PURE__ */ new Map();
    let g = 0;
    for (const x of o.steps) {
      const b = l.get(x.id) ?? 0;
      g = Math.max(g, b);
      const P = w.get(b) ?? 0;
      w.set(b, P + 1);
      const C = t[x.id] ?? {
        x: h.x + (b + 1) * Tn,
        y: d + (P - (u.get(b) - 1) / 2) * Nn
      }, N = a(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: C.x,
        y: C.y,
        w: On,
        h: _l,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: N ? `→ ${N}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${N ? ` · lanza ${N}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const _ = (x.dependsOnStepIds ?? []).filter((F) => r.has(F));
      _.length === 0 && s.push({
        id: `wfs:${o.id}:${x.id}`,
        sourceId: o.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const F of _)
        s.push({
          id: `wfdep:${F}->${x.id}`,
          sourceId: F,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((y = r.get(F)) == null ? void 0 : y.name) ?? F}`
        });
    }
    if (o.onCompletionEventName) {
      const x = `done:${o.id}`, b = t[x] ?? { x: h.x + (g + 2) * Tn, y: d };
      i.push({
        id: x,
        label: o.onCompletionEventName,
        x: b.x,
        y: b.y,
        w: On,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const P = new Set(o.steps.flatMap((N) => N.dependsOnStepIds ?? [])), C = o.steps.filter((N) => !P.has(N.id));
      for (const N of C.length ? C : [])
        s.push({
          id: `wfd:${o.id}:${N.id}`,
          sourceId: N.id,
          targetId: x,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      o.steps.length || s.push({
        id: `wfd:${o.id}`,
        sourceId: o.id,
        targetId: x,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    d += Math.max(2, m + 1) * Nn + 60;
  }), { nodes: i, edges: s };
}
const Rn = 250, jt = 30, Ln = 6, Al = 16, Ml = 190, Dn = 60, Pl = 170, Yt = 44;
function Ol(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function he(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Tl(e) {
  const t = [], i = (s, n, a) => {
    for (const d of s ?? []) {
      const o = [...n, d.label];
      t.push({ entry: d, path: o, depth: a }), i(d.children ?? [], o, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Nl(e, t) {
  var g, y, x;
  const i = [], s = [], n = e.uiApps ?? [], a = e.pages ?? [], d = (b) => {
    var P;
    return ((P = e.modules.flatMap((C) => C.useCases ?? []).find((C) => C.id === b)) == null ? void 0 : P.name) ?? b;
  }, o = (b) => {
    var P;
    return ((P = e.modules.flatMap((C) => C.queryServices ?? []).find((C) => C.id === b)) == null ? void 0 : P.name) ?? b;
  }, r = /* @__PURE__ */ new Map();
  let l = 160;
  for (const b of n) {
    const P = Tl(b), C = Math.max(
      90,
      54 + P.length * (jt + Ln)
    ), N = t[b.id] ?? { x: 190, y: l + C / 2 };
    l = N.y + C / 2 + 70;
    const _ = b.type ?? "APP";
    i.push({
      id: b.id,
      label: b.title || b.name,
      x: N.x,
      y: N.y,
      w: Rn,
      h: C,
      kind: "ui-app",
      symbol: _ === "ORCHESTRATOR" ? "process" : "component",
      fill: _ === "ORCHESTRATOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: _ === "ORCHESTRATOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: _ === "ORCHESTRATOR" ? "ORQUESTADOR" : _ === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : "APP",
      tooltip: _ === "ORCHESTRATOR" ? `${b.name} — orquesta y mantiene estado; solo enseña páginas hijas` : _ === "MASTER_DETAIL" ? `${b.name} — cabecera + pestañas (ambas son páginas)` : `App: ${b.name}`
    }), _ === "MASTER_DETAIL" && b.headerPageId && s.push({
      id: `appheader:${b.id}->${b.headerPageId}`,
      sourceId: b.id,
      targetId: b.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let F = N.y - C / 2 + 34 + 10 + jt / 2;
    for (const { entry: q, path: $, depth: M } of P) {
      const S = Ol(b.id, q, $), O = M * Al;
      if (i.push({
        id: S,
        label: q.label,
        x: N.x + O / 2,
        y: F,
        w: Rn - 20 - O,
        h: jt,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (g = q.children) != null && g.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (y = q.children) != null && y.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: b.id,
        tooltip: (x = q.children) != null && x.length ? "Agrupador (con submenú): no puede abrir nada" : q.pageId ? `Abre ${q.pageId}` : q.uiAdapterId ? `Abre la app ${q.uiAdapterId}` : q.useCaseId ? `Lanza ${q.useCaseId}` : q.aggregateId ? `CRUD inferido sobre ${q.aggregateId}` : q.queryOperationId ? `Listado con filtros de ${q.queryOperationId}` : "Entrada de menú sin destino"
      }), F += jt + Ln, q.uiAdapterId && n.some((U) => U.id === q.uiAdapterId) && s.push({
        id: `menuapp:${S}->${q.uiAdapterId}`,
        sourceId: S,
        targetId: q.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), q.useCaseId && e.modules.some((p) => (p.useCases ?? []).some((I) => I.id === q.useCaseId)) && (r.set(q.useCaseId, {
        label: d(q.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${S}->${q.useCaseId}`,
        sourceId: S,
        targetId: q.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), q.aggregateId && (e.aggregates ?? []).some((U) => U.id === q.aggregateId)) {
        const U = (e.aggregates ?? []).find((p) => p.id === q.aggregateId);
        r.set(U.id, { label: U.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${S}->${U.id}`,
          sourceId: S,
          targetId: U.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (q.queryOperationId) {
        const U = e.modules.flatMap((I) => I.queryServices ?? []).find((I) => I.id === q.queryServiceId), p = ((U == null ? void 0 : U.operations) ?? []).find((I) => I.id === q.queryOperationId);
        U && p && (r.set(p.id, {
          label: `${p.name} (${U.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${S}->${p.id}`,
          sourceId: S,
          targetId: p.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      q.pageId && a.some((U) => U.id === q.pageId) && s.push({
        id: `menupage:${S}->${q.pageId}`,
        sourceId: S,
        targetId: q.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let u = 160;
  for (const b of a) {
    const P = t[b.id] ?? { x: 640, y: u };
    u = P.y + Dn + 90, i.push({
      id: b.id,
      label: b.name,
      x: P.x,
      y: P.y,
      w: Ml,
      h: Dn,
      kind: "page",
      symbol: "interface",
      badge: b.type ?? "PAGE",
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: b.route ? `${b.type ?? "PAGE"} · ${b.route}` : b.type ?? "PAGE"
    }), b.modelId && (r.set(b.modelId, {
      label: b.modelName ?? b.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${b.id}->${b.modelId}`,
      sourceId: b.id,
      targetId: b.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const C of b.buttons ?? [])
      C.useCaseId && (r.set(C.useCaseId, {
        label: d(C.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${b.id}->${C.useCaseId}`,
        sourceId: b.id,
        targetId: C.useCaseId,
        kind: "page-button",
        label: C.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: C.mappingId ? `Botón «${C.label}» — mapping ${C.mappingId}` : `Botón «${C.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    b.listingQueryServiceId && (r.set(b.listingQueryServiceId, {
      label: o(b.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${b.id}->${b.listingQueryServiceId}`,
      sourceId: b.id,
      targetId: b.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let m = 160;
  for (const [b, P] of r) {
    const C = t[b] ?? { x: 1050, y: m };
    m = C.y + Yt + 46, i.push({
      id: b,
      label: P.label,
      x: C.x,
      y: C.y,
      w: Pl,
      h: Yt,
      kind: P.kind,
      symbol: P.symbol,
      fill: "#ffffff",
      stroke: P.stroke
    });
  }
  const f = (e.actorAppUses ?? []).filter(
    (b) => n.some((P) => P.id === b.appId) && (e.actors ?? []).some((P) => P.id === b.actorId)
  ), h = [...new Set(f.map((b) => b.actorId))];
  let w = 160;
  for (const b of h) {
    const P = (e.actors ?? []).find((N) => N.id === b), C = t[b] ?? { x: -60, y: w };
    w = C.y + Yt + 46, i.push({
      id: b,
      label: P.name,
      x: C.x,
      y: C.y,
      w: 150,
      h: Yt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const b of f)
    s.push({
      id: `actorapp:${b.actorId}->${b.appId}`,
      sourceId: b.actorId,
      targetId: b.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: s };
}
async function Rl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((r) => r.e), s = new i(), a = {
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
    children: e.nodes.map((r) => ({ id: r.id, width: r.w, height: r.h })),
    edges: e.edges.map((r) => ({ id: r.id, sources: [r.sourceId], targets: [r.targetId] }))
  }, d = await s.layout(a), o = {};
  for (const r of d.children ?? [])
    o[r.id] = {
      x: (r.x ?? 0) + (r.width ?? 0) / 2,
      y: (r.y ?? 0) + (r.height ?? 0) / 2
    };
  return o;
}
var Ll = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, Me = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Dl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Ll(t, i, n), n;
};
const Ul = /* @__PURE__ */ new Set([
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
let ve = class extends Pe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onDown = (e) => {
      var n, a;
      if (e.button !== 0) return;
      this.focus(), (n = this.setPointerCapture) == null || n.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (a = t == null ? void 0 : t.closest) == null ? void 0 : a.call(t, ".h3");
      if (i != null && i.dataset.sourceId) {
        const d = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - d.left,
          y1: e.clientY - d.top,
          x2: e.clientX - d.left,
          y2: e.clientY - d.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const s = this.plateAt(e);
      this._drag = {
        mode: s ? "node" : e.shiftKey ? "pan" : "orbit",
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        nodeId: s == null ? void 0 : s.dataset.nodeId,
        nodeKind: s == null ? void 0 : s.dataset.kind,
        moved: !1
      };
    }, this.onMove = (e) => {
      var s, n;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const d = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), o = (n = d == null ? void 0 : d.closest) == null ? void 0 : n.call(d, ".n3"), r = (o == null ? void 0 : o.dataset.nodeId) ?? null;
        this._hoverTargetId = r !== this._connect.sourceId ? r : null;
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, i) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const a = this.unproject(t, i);
          this._liveMove = { id: this._drag.nodeId, dx: a.x, dy: a.y };
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
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("pointerdown", this.onDown), this.addEventListener("pointermove", this.onMove), this.addEventListener("pointerup", this.onUp), this.addEventListener("pointercancel", this.onUp), this.addEventListener("wheel", this.onWheel, { passive: !1 }), this.addEventListener("dblclick", this.onDblClick), this.addEventListener("keydown", this.onKeydown);
  }
  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onDown), this.removeEventListener("pointermove", this.onMove), this.removeEventListener("pointerup", this.onUp), this.removeEventListener("pointercancel", this.onUp), this.removeEventListener("wheel", this.onWheel), this.removeEventListener("dblclick", this.onDblClick), this.removeEventListener("keydown", this.onKeydown), super.disconnectedCallback();
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
    var s, n, a;
    const i = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e, t);
    return ((a = (n = i == null ? void 0 : i.closest) == null ? void 0 : n.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), s = i.width * 0.5, n = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const d = new DOMMatrix().translate(s, n).multiply(a).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), o = d.transformPoint(new DOMPoint(0, 0, 0, 1)), r = d.transformPoint(new DOMPoint(1, 0, 0, 0)), l = d.transformPoint(new DOMPoint(0, 1, 0, 0)), u = e - i.left, m = t - i.top, f = r.x - u * r.w, h = l.x - u * l.w, w = r.y - m * r.w, g = l.y - m * l.w, y = u * o.w - o.x, x = m * o.w - o.y, b = f * g - h * w;
    return b ? { x: (y * g - h * x) / b, y: (f * x - y * w) / b } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const a = s.parentId ? e.get(s.parentId) : void 0, d = a ? i(a) + 1 : 0;
      return t.set(s.id, d), d;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return k`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((y) => [y.id, y])), s = Math.min(...e.map((y) => y.x - y.w / 2)) - 60, n = Math.max(...e.map((y) => y.x + y.w / 2)) + 60, a = Math.min(...e.map((y) => y.y - y.h / 2)) - 60, d = Math.max(...e.map((y) => y.y + y.h / 2)) + 60, o = (s + n) / 2, r = (a + d) / 2, l = this.getBoundingClientRect(), u = l.width ? Math.min(l.width / (n - s), l.height / (d - a), 1) * 0.9 : 0.5, m = this._k * u;
    this._kUsed = m, this._center = { x: o, y: r };
    const f = 30, h = this._liveMove, w = (y) => y.x + ((h == null ? void 0 : h.id) === y.id ? h.dx : 0), g = (y) => y.y + ((h == null ? void 0 : h.id) === y.id ? h.dy : 0);
    return k`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-o}px, ${-r}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${a}px"
            width=${n - s}
            height=${d - a}
            viewBox="${s} ${a} ${n - s} ${d - a}"
          >
            ${this.scene.edges.map((y) => {
      const x = i.get(y.sourceId), b = i.get(y.targetId);
      return !x || !b ? "" : G`<line
                x1=${w(x)} y1=${g(x)} x2=${w(b)} y2=${g(b)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((y) => {
      const x = i.get(y.sourceId), b = i.get(y.targetId);
      if (!x || !b) return "";
      const P = (t.get(x.id) ?? 0) * f + 2, C = (t.get(b.id) ?? 0) * f + 2, N = w(b) - w(x), _ = g(b) - g(x), F = C - P, q = Math.hypot(N, _), $ = Math.hypot(q, F), M = Math.atan2(_, N) * 180 / Math.PI, S = Math.atan2(F, q) * 180 / Math.PI, O = y.color ?? "#64748b", U = y.dashed ? `repeating-linear-gradient(90deg, ${O} 0 6px, transparent 6px 10px)` : O;
      return k`<div
              class="edge3"
              style="
                left: ${w(x)}px; top: ${g(x)}px; width: ${$}px; height: 1.7px;
                transform: translateZ(${P}px) rotateZ(${M}deg) rotateY(${-S}deg);
                background: ${U};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((y) => {
      const x = t.get(y.id) ?? 0, b = y.container || x === 0, P = this._hoverTargetId === y.id;
      return k`
              <div
                class="n3 ${y.container ? "container3" : ""} ${this.selectedId === y.id ? "selected3" : ""} ${P ? "hover3" : ""}"
                data-node-id=${y.id}
                data-kind=${y.kind}
                title=${y.tooltip ?? y.label}
                style="
                  left: ${w(y) - y.w / 2}px; top: ${g(y) - y.h / 2}px;
                  width: ${y.w}px; height: ${y.h}px;
                  transform: translateZ(${x * f + (P ? 8 : 0)}px)${P ? " scale(1.06)" : ""};
                  background: ${y.container ? "color-mix(in srgb, " + (y.fill ?? "#ffffff") + " 82%, transparent)" : y.fill ?? "#ffffff"};
                  border-color: ${y.stroke ?? "#64748b"};
                  border-style: ${y.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${b ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${y.badge ? k`<span class="badge3" style="color: ${y.stroke ?? "#94a3b8"}">${y.badge}</span>` : ""}
                <span>${y.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const y = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!y || !Ul.has(y.kind)) return "";
      const x = (t.get(y.id) ?? 0) * f + 4;
      return [
        [w(y) + y.w / 2, g(y)],
        [w(y) - y.w / 2, g(y)],
        [w(y), g(y) + y.h / 2],
        [w(y), g(y) - y.h / 2]
      ].map(
        ([P, C]) => k`<div
                class="h3"
                data-source-id=${y.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${P}px; top: ${C}px; transform: translateZ(${x}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? k`<svg class="rubber">
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
        para orbitar · shift+arrastra panea · rueda para zoom · Supr borra · doble click en el
        fondo resetea
      </div>
    `;
  }
};
ve.styles = pt`
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
      position: absolute;
      left: 12px;
      bottom: 10px;
      font: 11px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
    }
  `;
Me([
  J({ attribute: !1 })
], ve.prototype, "scene", 2);
Me([
  J({ attribute: !1 })
], ve.prototype, "selectedId", 2);
Me([
  J({ attribute: !1 })
], ve.prototype, "connectable", 2);
Me([
  L()
], ve.prototype, "_rx", 2);
Me([
  L()
], ve.prototype, "_rz", 2);
Me([
  L()
], ve.prototype, "_k", 2);
Me([
  L()
], ve.prototype, "_pan", 2);
Me([
  L()
], ve.prototype, "_liveMove", 2);
Me([
  L()
], ve.prototype, "_connect", 2);
Me([
  L()
], ve.prototype, "_hoverTargetId", 2);
ve = Me([
  ut("modux-tilt")
], ve);
var zl = Object.defineProperty, ql = Object.getOwnPropertyDescriptor, re = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ql(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && zl(t, i, n), n;
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
let Z = class extends Pe {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? k`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? k`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? k`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? k`<div class="control">••••••••</div>` : t === "email" ? k`<div class="control">nombre@dominio.com</div>` : t === "money" ? k`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? k`<div class="control">──────●──</div>` : t === "stars" ? k`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? k`<div class="control area">🖼</div>` : t === "link" ? k`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? k`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? k`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? k`<div class="control" style="justify-content:flex-end">0</div>` : k`<div class="control">Texto…</div>`;
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
      for (const a of n ?? [])
        a.id === e && (t = a), i(a.children);
    };
    return i((s = this.page) == null ? void 0 : s.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var s;
    let t = null;
    const i = (n, a) => {
      for (const d of n ?? [])
        d.id === e && (t = a), i(d.children, d);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const s = (d) => {
      d.id === e && (i = !0);
      for (const o of d.children ?? []) s(o);
    }, n = (d) => {
      for (const o of d ?? [])
        o.id === t ? s(o) : n(o.children);
    };
    return n((a = this.page) == null ? void 0 : a.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var n;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((n = this.page) == null ? void 0 : n.content) ?? [], s = i.findIndex((a) => a.id === e);
    return s >= 0 ? i[s + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), s = (t.clientY - i.top) / Math.max(1, i.height);
    return Z.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const d = (e.children ?? []).filter((r) => r.kind === "tab"), o = d.find((r) => r.id === this._activeTabs[e.id]) ?? d[0];
      o && (e = o);
    }
    if (t === "into" && !Z.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var a, d;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const o = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!o) return;
      let r;
      try {
        r = JSON.parse(o);
      } catch {
        return;
      }
      if (!r.componentId || !r.pageId || r.pageId === ((d = this.page) == null ? void 0 : d.id)) return;
      const l = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: r.pageId, componentId: r.componentId, ...l });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const n = this.slotFor(e, t);
    n.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...n });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var r, l, u;
    const t = e.children ?? [], i = (m) => m.map((f) => this.renderComponent(f)), s = k`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = k`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        n = k`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        n = k`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        n = k`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((h) => h.kind === "tab"), f = m.find((h) => h.id === this._activeTabs[e.id]) ?? m[0];
        n = k`
          <div class="tabbar">
            ${m.map(
          (h, w) => k`<span
                class=${h === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(g) => {
            g.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: h.id }, this.emitEvent("component-selected", { componentId: h.id });
          }}
                @dblclick=${(g) => {
            g.stopPropagation(), this._cmp = { ...h };
          }}
                @dragstart=${(g) => {
            var y, x;
            g.stopPropagation(), this._dragCmpId = h.id, (x = g.dataTransfer) == null || x.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (y = this.page) == null ? void 0 : y.id, componentId: h.id })
            );
          }}
                @dragover=${(g) => {
            var y;
            ((y = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : y.kind) === "tab" && (g.preventDefault(), g.stopPropagation());
          }}
                @drop=${(g) => {
            var C, N;
            const y = this._dragCmpId;
            if (!y || y === h.id || ((C = this.nodeById(y)) == null ? void 0 : C.kind) !== "tab") return;
            g.preventDefault(), g.stopPropagation();
            const x = g.currentTarget.getBoundingClientRect(), P = g.clientX - x.left < x.width / 2 ? h.id : ((N = m[w + 1]) == null ? void 0 : N.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, P !== y && this.emitEvent("component-moved", {
              componentId: y,
              toParentId: e.id,
              beforeComponentId: P
            });
          }}
                >${h.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : s}`;
        break;
      }
      case "tab":
        n = k`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = k`<div class="col-lay">
          ${t.length ? t.map(
          (m, f) => k`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(m) : Q}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = k`<div class="card-box">
          ${e.title ? k`<div class="card-title">${e.title}</div>` : Q}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = k`<div class="grid3-lay">
          ${t.length ? t.map((m) => k`<div class="board-col">${this.renderComponent(m)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...f] = t;
        n = k`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : k`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : k`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        n = k`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        n = k`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        n = k`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((r = this.page) == null ? void 0 : r.modelId) ? ((l = this.page) == null ? void 0 : l.viewmodelFields) ?? [] : [];
        n = f.length ? k`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (h) => k`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${h.label ?? h.name}</label>${this.control(h)}</div>`
        )}
            </div>` : k`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const m = (((u = this.page) == null ? void 0 : u.viewmodelFields) ?? []).slice(0, 4);
        n = k`<table>
            <tr>${m.length ? m.map((f) => k`<th>${f.label ?? f.name}</th>`) : k`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => k`<tr>${(m.length ? m : [1, 2, 3]).map(() => k`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? Q : k`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = k`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = k`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        n = k`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        n = k`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        n = k`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        n = k`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const a = Z.LEAF_KINDS.has(e.kind), d = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), o = (m) => {
      var f, h;
      m.stopPropagation(), this._dragCmpId = e.id, (h = m.dataTransfer) == null || h.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return k`<div
      class="cmp ${a ? "leafcmp" : ""} ${d ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(m) => {
      m.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(m) => {
      m.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${o}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(m) => {
      var h;
      m.preventDefault(), m.stopPropagation();
      const f = ((h = m.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var f, h, w;
      this._foreignOver = !1, !(!this._dragCmpId && !((w = (h = (f = m.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : h.includes) != null && w.call(h, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${o}
        >${Z.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${n}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return k`
        ${i ? k`<table>
              <tr>${t.slice(0, 4).map((s) => k`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => k`<tr>${t.slice(0, 4).map(() => k`<td>···</td>`)}</tr>`)}
            </table>` : Q}
        ${t.length ? k`<div class="grid">
              ${t.map(
      (s) => k`
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
            </div>` : k`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    const e = this._cmp;
    if (!e) return Q;
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
    return k`<div class="pop" @click=${(n) => n.stopPropagation()}>
      ${s ? k`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(n) => t({ title: n.target.value })} />` : Q}
      ${i === "text" ? k`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(n) => t({ text: n.target.value })} />` : Q}
      ${i === "button" || i === "field" ? k`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(n) => t({ label: n.target.value })} />` : Q}
      ${i === "button" ? k`<label>Caso de uso</label>
            <select @change=${(n) => t({ useCaseId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.useCaseId}>—</option>
              ${this.useCases.map((n) => k`<option value=${n.id} ?selected=${n.id === e.useCaseId}>${n.name}</option>`)}
            </select>
            <label>Mapping</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ mappingId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.mappingId}>(el viewmodel viaja tal cual)</option>
              ${this.mappings.map((n) => k`<option value=${n.id} ?selected=${n.id === e.mappingId}>${n.name}</option>`)}
            </select>` : Q}
      ${i === "form" ? k`<label>Model</label>
            <select style="grid-column: 2 / -1" @change=${(n) => t({ modelId: n.target.value || void 0 })}>
              <option value="" ?selected=${!e.modelId}>—</option>
              ${this.models.map((n) => k`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`)}
            </select>` : Q}
      ${i === "listing" ? k`<label>Consulta</label>
            <select
              style="grid-column: 2 / -1"
              @change=${(n) => {
      const a = n.target.value, d = this.queryOps.find((o) => o.id === a);
      t({ queryOperationId: d == null ? void 0 : d.id, queryServiceId: d == null ? void 0 : d.queryServiceId });
    }}
            >
              <option value="" ?selected=${!e.queryOperationId}>—</option>
              ${this.queryOps.map((n) => k`<option value=${n.id} ?selected=${n.id === e.queryOperationId}>${n.name}</option>`)}
            </select>` : Q}
      ${i === "field" ? k`<label>Estereotipo</label>
            <select @change=${(n) => t({ stereotype: n.target.value || void 0 })}>
              ${Un.map((n) => k`<option value=${n} ?selected=${n === (e.stereotype ?? "regular")}>${n}</option>`)}
            </select>` : Q}
      ${i === "tabLayout" ? k`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : Q}
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), s = i.indexOf(t), n = i.indexOf(e);
    s < 0 || n < 0 || (i.splice(n, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return Q;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, s = e.type === "WIZARD";
    return k`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? k`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(n) => this._rename = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRename(), n.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : k`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        <select
          class="type"
          title="Tipo de página: Página (el contenido decide), CRUD (listado + ficha) o Wizard (pasos)"
          @change=${(n) => this.emitEvent("page-type-changed", { pageType: n.target.value })}
        >
          ${(() => {
      const n = e.type ?? "PAGE", a = [
        ["PAGE", "Página"],
        ["CRUD", "CRUD"],
        ["WIZARD", "Wizard"]
      ];
      return n === "FORM" && a.splice(1, 0, ["FORM", "Form (legado)"]), n === "DASHBOARD" && a.push(["DASHBOARD", "Dashboard (legado)"]), a.map(
        ([d, o]) => k`<option value=${d} ?selected=${n === d}>${o}</option>`
      );
    })()}
        </select>
        ${this._route !== null ? k`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(n) => this._route = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRoute(), n.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : k`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (n) => k`<span
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
        ${e.modelId ? k`<span class="chip">${e.modelName ?? e.modelId}</span>` : k`<span>—</span>`}
        <select
          title="Asignar el Model que hace de viewmodel"
          @change=${(n) => {
      const a = n.target.value;
      this.emitEvent("page-model-changed", { modelId: a === "" ? null : a });
    }}
        >
          <option value="" ?selected=${!e.modelId}>(sin viewmodel)</option>
          ${this.models.map(
      (n) => k`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`
    )}
        </select>
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? k`<div class="wizbar">
              <span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>
              <span class="wiznext">Siguiente ›</span>
            </div>` : Q}
        ${(e.content ?? []).length ? k`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a;
      const n = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((d) => d.useCaseId === this._btn.useCaseId);
      return k`<div class="pop">
              <label>Caso de uso</label>
              <select
                ?disabled=${n}
                @change=${(d) => this._btn = { ...this._btn, useCaseId: d.target.value }}
              >
                <option value="" ?selected=${!this._btn.useCaseId}>elige…</option>
                ${this.useCases.map(
        (d) => k`<option value=${d.id} ?selected=${d.id === this._btn.useCaseId}>${d.name}</option>`
      )}
              </select>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(d) => this._btn = { ...this._btn, label: d.target.value }}
              />
              <label>Mapping</label>
              <select
                style="grid-column: 2 / -1"
                title="ModelMapping del viewmodel al request del caso de uso"
                @change=${(d) => this._btn = { ...this._btn, mappingId: d.target.value }}
              >
                <option value="" ?selected=${!this._btn.mappingId}>(el viewmodel viaja tal cual)</option>
                ${this.mappings.map(
        (d) => k`<option value=${d.id} ?selected=${d.id === this._btn.mappingId}>${d.name}</option>`
      )}
              </select>
              <div class="actions">
                ${n ? k`<button
                      @click=${() => {
        const d = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: d });
      }}
                    >
                      Quitar
                    </button>` : Q}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : Q}
      ${this._editing ? k`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Un.map(
      (n) => k`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
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
          </div>` : Q}
    `;
  }
};
Z.styles = pt`
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
Z.KIND_LABELS = {
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
Z.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
re([
  J({ attribute: !1 })
], Z.prototype, "page", 2);
re([
  J({ type: Boolean, reflect: !0 })
], Z.prototype, "framed", 2);
re([
  J({ attribute: !1 })
], Z.prototype, "models", 2);
re([
  J({ attribute: !1 })
], Z.prototype, "mappings", 2);
re([
  J({ attribute: !1 })
], Z.prototype, "useCases", 2);
re([
  J({ attribute: !1 })
], Z.prototype, "queryOps", 2);
re([
  J({ attribute: !1 })
], Z.prototype, "selectedCmpId", 2);
re([
  L()
], Z.prototype, "_editing", 2);
re([
  L()
], Z.prototype, "_dragId", 2);
re([
  L()
], Z.prototype, "_overId", 2);
re([
  L()
], Z.prototype, "_rename", 2);
re([
  L()
], Z.prototype, "_route", 2);
re([
  L()
], Z.prototype, "_btn", 2);
re([
  L()
], Z.prototype, "_cmp", 2);
re([
  L()
], Z.prototype, "_dragCmpId", 2);
re([
  L()
], Z.prototype, "_overCmpId", 2);
re([
  L()
], Z.prototype, "_overCmpPos", 2);
re([
  L()
], Z.prototype, "_foreignOver", 2);
re([
  L()
], Z.prototype, "_activeTabs", 2);
Z = re([
  ut("modux-page-designer")
], Z);
var Fl = Object.defineProperty, Bl = Object.getOwnPropertyDescriptor, be = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Bl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Fl(t, i, n), n;
};
const Vl = 460, Hl = 540, Wl = 660;
let fe = class extends Pe {
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
        const a = this.pages.findIndex((o) => o.id === n), d = this.posOf(n, a);
        this.emit("element-selected", { elementType: "node", id: n, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: n, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * n));
      this._t = {
        k: a,
        x: i - (i - this._t.x) / this._t.k * a,
        y: s - (s - this._t.y) / this._t.k * a
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
    var r, l, u, m;
    const i = (r = this.shadowRoot) == null ? void 0 : r.elementFromPoint(e, t), s = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, a = s.querySelector("modux-page-designer"), d = (u = a == null ? void 0 : a.shadowRoot) == null ? void 0 : u.elementFromPoint(e, t), o = (m = d == null ? void 0 : d.closest) == null ? void 0 : m.call(d, "[data-cmp-id]");
    return o ? `cmp:${n}:${o.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, h, w, g;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), s = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, a = s.querySelector("modux-page-designer"), d = (w = a == null ? void 0 : a.shadowRoot) == null ? void 0 : w.elementFromPoint(e, t), o = (g = d == null ? void 0 : d.closest) == null ? void 0 : g.call(d, "[data-cmp-id]");
    if (!o) return { pageId: n, componentId: null, pos: "into" };
    const r = o.dataset.cmpKind ?? "", l = o.getBoundingClientRect(), u = (t - l.top) / Math.max(1, l.height), m = Z.LEAF_KINDS.has(r) ? u < 0.5 ? "before" : "after" : u < 0.2 ? "before" : u > 0.8 ? "after" : "into";
    return { pageId: n, componentId: o.dataset.cmpId, pos: m };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Hl, y: Math.floor(t / 3) * Wl };
  }
  render() {
    return k`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var s;
      const i = this.posOf(e.id, t);
      return k`
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
      ${this.pages.length ? "" : k`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
fe.styles = pt`
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
      width: ${Vl}px;
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
      position: absolute;
      left: 12px;
      bottom: 10px;
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
be([
  J({ attribute: !1 })
], fe.prototype, "pages", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "layout", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "selectedId", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "selectedIds", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "models", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "mappings", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "useCases", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "queryOps", 2);
be([
  J({ attribute: !1 })
], fe.prototype, "selectedCmp", 2);
be([
  L()
], fe.prototype, "_t", 2);
be([
  L()
], fe.prototype, "_live", 2);
fe = be([
  ut("modux-figma")
], fe);
var Gl = Object.defineProperty, jl = Object.getOwnPropertyDescriptor, W = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? jl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Gl(t, i, n), n;
};
const Ui = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Yl = Object.keys(Ui);
function bt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, a = i.y - i.h / 2, d = i.y + i.h / 2;
  let o = 0, r = 1;
  const l = t.x - e.x, u = t.y - e.y;
  for (const [m, f] of [
    [-l, e.x - s],
    [l, n - e.x],
    [-u, e.y - a],
    [u, d - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / m;
    if (m < 0) {
      if (h > r) return !1;
      h > o && (o = h);
    } else {
      if (h < o) return !1;
      h < r && (r = h);
    }
  }
  return r - o > 0.02;
}
function Kl(e, t, i = 28) {
  var l;
  const s = new Map(e.nodes.map((u) => [u.id, u])), n = (u) => {
    var f;
    const m = /* @__PURE__ */ new Set();
    for (let h = u; h; h = (f = s.get(h)) == null ? void 0 : f.parentId) m.add(h);
    return m;
  }, a = e.nodes, d = (u) => u.parentId ? Math.min(i, 6) : i, o = /* @__PURE__ */ new Map(), r = (u, m, f) => {
    const h = d(f), w = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, g = f.w / 2 + h * 1.5, y = f.h / 2 + h * 1.5, x = { x: f.x - g, y: f.y - y }, b = { x: f.x + g, y: f.y - y }, P = { x: f.x - g, y: f.y + y }, C = { x: f.x + g, y: f.y + y }, N = [];
    for (const _ of [x, b, P, C])
      !bt(u, _, w) && !bt(_, m, w) && N.push([_]);
    for (const [_, F] of [
      [x, b],
      [b, x],
      [b, C],
      [C, b],
      [C, P],
      [P, C],
      [P, x],
      [x, P]
    ])
      !bt(u, _, w) && !bt(F, m, w) && N.push([_, F]);
    return N;
  };
  for (const u of e.edges) {
    if ((l = t[u.id]) != null && l.length) continue;
    const m = s.get(u.sourceId), f = s.get(u.targetId);
    if (!m || !f) continue;
    const h = /* @__PURE__ */ new Set([...n(m.id), ...n(f.id)]), w = [
      { x: m.x, y: m.y },
      { x: f.x, y: f.y }
    ];
    for (let g = 0; g < 12; g++) {
      let y = !1;
      e: for (let x = 0; x < w.length - 1; x++)
        for (const b of a) {
          if (h.has(b.id)) continue;
          const P = d(b), C = { x: b.x, y: b.y, w: b.w + 2 * P, h: b.h + 2 * P };
          if (!bt(w[x], w[x + 1], C)) continue;
          const N = r(w[x], w[x + 1], b);
          if (!N.length) continue;
          const _ = (q) => a.some(
            ($) => $ !== b && !h.has($.id) && Math.abs(q.x - $.x) < $.w / 2 + d($) / 2 && Math.abs(q.y - $.y) < $.h / 2 + d($) / 2
          ), F = (q) => {
            let $ = 0;
            const M = [w[x], ...q, w[x + 1]];
            for (let S = 0; S < M.length - 1; S++)
              $ += Math.hypot(M[S + 1].x - M[S].x, M[S + 1].y - M[S].y);
            return $ + (q.some(_) ? 1e4 : 0);
          };
          N.sort((q, $) => F(q) - F($)), w.splice(x + 1, 0, ...N[0]), y = !0;
          break e;
        }
      if (!y) break;
    }
    w.length > 2 && o.set(
      u.id,
      w.slice(1, -1).map((g) => ({ x: Math.round(g.x), y: Math.round(g.y) }))
    );
  }
  return o;
}
const Y = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
let B = class extends Pe {
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
      const s = this.renderRoot.querySelector("modux-canvas"), n = (a) => {
        e.preventDefault(), this.onDiagramScopeChange(a);
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
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: n, beforeComponentId: a } = e.detail, d = this.componentIn(t, s);
      if (!d || t === i) return;
      const o = JSON.parse(JSON.stringify(d.node)), { ops: r } = this.rebuildComponentOps(i, o, n ?? void 0, a);
      for (const l of r) this.command(l, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, o, d.parentId ?? void 0, d.beforeId).ops
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
    const a = this.viewLayout("context-map"), d = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), o = zi(d), r = [...o.keys()].map((u) => ({
      kind: "move-node",
      view: "context-map",
      id: u,
      pos: a.nodes[u] ?? null
    })), l = { ...a.nodes };
    for (const [u, m] of o) {
      const f = d.find((w) => w.id === u), h = a.nodes[u] ?? { x: f.x, y: f.y };
      l[u] = {
        x: Math.round(h.x + (m.x - f.x)),
        y: Math.round(h.y + (m.y - f.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: l }), r.length && this.pushUndoEntry(r);
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
    var t, i, s, n, a, d;
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
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "set-app-header-page": {
        const o = (this.model.uiApps ?? []).find((r) => r.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (o == null ? void 0 : o.headerPageId) ?? null }];
      }
      case "delete-ui-app": {
        const o = (this.model.uiApps ?? []).find((u) => u.id === e.id);
        if (!o) return null;
        const r = [{ kind: "create-ui-app", id: o.id, name: o.name, type: o.type }];
        o.headerPageId && r.push({ kind: "set-app-header-page", appId: o.id, pageId: o.headerPageId });
        const l = (u, m) => {
          for (const f of u ?? [])
            r.push({
              kind: "add-menu-item",
              appId: o.id,
              label: f.label,
              itemId: f.id,
              parentId: m == null ? void 0 : m.id,
              parentLabel: m && !m.id ? m.label : void 0,
              pageId: f.pageId ?? null
            }), f.uiAdapterId && r.push({ kind: "set-menu-app", appId: o.id, toAppId: f.uiAdapterId, itemId: f.id, label: f.label }), f.useCaseId && r.push({ kind: "set-menu-use-case", appId: o.id, useCaseId: f.useCaseId, itemId: f.id, label: f.label }), f.aggregateId && r.push({ kind: "set-menu-aggregate", appId: o.id, aggregateId: f.aggregateId, itemId: f.id, label: f.label }), f.queryOperationId && r.push({
              kind: "set-menu-query-operation",
              appId: o.id,
              queryServiceId: f.queryServiceId ?? null,
              queryOperationId: f.queryOperationId,
              itemId: f.id,
              label: f.label
            }), l(f.children, f);
        };
        l(o.menuItems);
        for (const u of this.model.actorAppUses ?? [])
          u.appId === e.id && r.push({ kind: "add-actor-app", actorId: u.actorId, appId: e.id });
        return r;
      }
      case "delete-ui-page": {
        const o = (this.model.pages ?? []).find((l) => l.id === e.id);
        if (!o) return null;
        const r = [
          { kind: "create-ui-page", id: o.id, name: o.name, pageType: o.type ?? "FORM" }
        ];
        o.route && r.push({ kind: "set-page-route", pageId: o.id, path: o.route }), o.modelId && r.push({ kind: "set-page-model", pageId: o.id, modelId: o.modelId }), o.listingQueryServiceId && r.push({ kind: "set-page-listing", pageId: o.id, queryServiceId: o.listingQueryServiceId });
        for (const l of o.buttons ?? [])
          l.useCaseId && (r.push({ kind: "add-page-button", pageId: o.id, useCaseId: l.useCaseId, label: l.label }), l.mappingId && r.push({
            kind: "set-page-button",
            pageId: o.id,
            useCaseId: l.useCaseId,
            label: l.label ?? null,
            mappingId: l.mappingId
          }));
        for (const l of o.viewmodelFields ?? [])
          (l.stereotype || l.colspan || l.label) && r.push({
            kind: "set-page-field-config",
            pageId: o.id,
            fieldId: l.fieldId,
            stereotype: l.stereotype ?? null,
            colspan: l.colspan ?? null,
            label: l.label ?? null
          });
        (o.viewmodelFields ?? []).length && r.push({
          kind: "set-page-field-order",
          pageId: o.id,
          fieldIds: (o.viewmodelFields ?? []).map((l) => l.fieldId)
        });
        for (const l of o.content ?? [])
          r.push(...this.rebuildComponentOps(o.id, l, void 0, null).ops);
        return r;
      }
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const o = (this.model.uiApps ?? []).find((u) => u.id === e.appId), r = (u) => {
          for (const m of u ?? []) {
            if (e.itemId ? m.id === e.itemId : m.label === e.label) return m;
            const f = r(m.children);
            if (f) return f;
          }
          return null;
        }, l = e.itemId || e.label ? r(o == null ? void 0 : o.menuItems) : null;
        return l ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: l.label,
          pageId: l.pageId ?? null,
          itemId: l.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: l.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: l.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: l.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: l.queryServiceId ?? null,
          queryOperationId: l.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: l.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const o = (this.model.pages ?? []).find((l) => l.id === e.pageId), r = ((o == null ? void 0 : o.buttons) ?? []).find((l) => l.useCaseId === e.useCaseId);
        return r ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: r.label }] : null;
      }
      case "rename-ui-page": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId);
        return o ? [{ kind: "rename-ui-page", pageId: e.pageId, name: o.name }] : null;
      }
      case "set-page-type": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId);
        return o ? [{ kind: "set-page-type", pageId: e.pageId, pageType: o.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId);
        return o != null && o.route ? [{ kind: "set-page-route", pageId: e.pageId, path: o.route }] : null;
      }
      case "set-page-button": {
        const o = (this.model.pages ?? []).find((l) => l.id === e.pageId), r = ((o == null ? void 0 : o.buttons) ?? []).find((l) => l.useCaseId === e.useCaseId);
        return r ? [{
          kind: "set-page-button",
          pageId: e.pageId,
          useCaseId: e.useCaseId,
          label: r.label ?? null,
          mappingId: r.mappingId ?? null
        }] : null;
      }
      case "add-page-component":
        return [{ kind: "remove-page-component", pageId: e.pageId, componentId: e.componentId }];
      case "set-page-component":
      case "remove-page-component":
      case "move-page-component": {
        const o = (this.model.pages ?? []).find((h) => h.id === e.pageId);
        let r = null, l = null, u = null;
        const m = (h, w) => {
          var y;
          const g = h ?? [];
          for (let x = 0; x < g.length; x++)
            g[x].id === e.componentId && (r = g[x], l = w, u = ((y = g[x + 1]) == null ? void 0 : y.id) ?? null), m(g[x].children, g[x]);
        };
        if (m(o == null ? void 0 : o.content, null), !r) return null;
        const f = r;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: f.title ?? null,
          text: f.text ?? null,
          label: f.label ?? null,
          useCaseId: f.useCaseId ?? null,
          mappingId: f.mappingId ?? null,
          modelId: f.modelId ?? null,
          queryServiceId: f.queryServiceId ?? null,
          queryOperationId: f.queryOperationId ?? null,
          fieldId: f.fieldId ?? null,
          stereotype: f.stereotype ?? null,
          colspan: f.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: l === null ? null : l.id,
          beforeComponentId: u
        }] : this.rebuildComponentOps(
          e.pageId,
          f,
          l === null ? void 0 : l.id,
          u
        ).ops;
      }
      case "set-page-listing": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (o == null ? void 0 : o.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (o == null ? void 0 : o.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const o = (((t = (this.model.pages ?? []).find((r) => r.id === e.pageId)) == null ? void 0 : t.viewmodelFields) ?? []).find((r) => r.fieldId === e.fieldId);
        return [{
          kind: "set-page-field-config",
          pageId: e.pageId,
          fieldId: e.fieldId,
          stereotype: (o == null ? void 0 : o.stereotype) ?? null,
          colspan: (o == null ? void 0 : o.colspan) ?? null,
          label: (o == null ? void 0 : o.label) ?? null
        }];
      }
      case "set-page-field-order": {
        const o = (((i = (this.model.pages ?? []).find((r) => r.id === e.pageId)) == null ? void 0 : i.viewmodelFields) ?? []).map((r) => r.fieldId);
        return o.length ? [{ kind: "set-page-field-order", pageId: e.pageId, fieldIds: o }] : null;
      }
      case "move-menu-item": {
        const o = e.itemId ? this.menuEntryIn(e.appId, e.itemId) : null;
        return [{
          kind: "move-menu-item",
          appId: e.toAppId,
          toAppId: e.appId,
          itemId: e.itemId,
          label: e.label,
          parentId: (o == null ? void 0 : o.parentId) ?? void 0,
          beforeItemId: (o == null ? void 0 : o.beforeId) ?? void 0
        }];
      }
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const o = this.model.modules.find((l) => l.id === e.id);
        if (!o) return null;
        const r = this.model.relations.filter(
          (l) => (l.sourceId === e.id || l.targetId === e.id) && l.type != null
        );
        return [
          { kind: "add-module", id: o.id, name: o.name, subdomainType: o.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...r.map(
            (l) => ({
              kind: "set-relation-type",
              sourceId: l.sourceId,
              targetId: l.targetId,
              type: l.type
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
          const r = (o.queryServices ?? []).find((l) => l.id === e.id);
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
          const r = (o.useCases ?? []).find((l) => l.id === e.id);
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
          const r = (o.useCases ?? []).find((l) => l.id === e.id);
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
      case "add-use-case-step":
        return [{ kind: "remove-use-case-step", useCaseId: e.useCaseId, id: e.id }];
      case "add-scheduled-trigger":
        return [{ kind: "remove-scheduled-trigger", id: e.id }];
      case "remove-scheduled-trigger": {
        const o = this.model.modules.find(
          (l) => (l.scheduledTriggers ?? []).some((u) => u.id === e.id)
        ), r = ((o == null ? void 0 : o.scheduledTriggers) ?? []).find((l) => l.id === e.id);
        return !o || !r ? null : [{
          kind: "add-scheduled-trigger",
          id: r.id,
          name: r.name,
          moduleId: o.id,
          cronExpression: r.cronExpression,
          targetUseCaseId: r.useCaseId
        }];
      }
      case "set-scheduled-trigger-target": {
        const o = this.model.modules.flatMap((r) => r.scheduledTriggers ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "set-scheduled-trigger-target", id: e.id, targetUseCaseId: o.useCaseId ?? null }] : null;
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
          const r = (o.mcpServers ?? []).find((l) => l.id === e.id);
          if (r)
            return [
              { kind: "add-mcp-server", id: r.id, name: r.name, moduleId: o.id, uri: r.uri },
              ...(this.model.agentMcpUses ?? []).filter((l) => l.mcpServerId === e.id).map(
                (l) => ({
                  kind: "add-agent-mcp",
                  sourceId: l.agentId,
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
          const r = (o.applicationEvents ?? []).find((l) => l.id === e.id);
          if (r)
            return [{ kind: "add-application-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const o of this.model.modules) {
          const r = (o.domainServices ?? []).find((l) => l.id === e.id);
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
          const r = (o.tables ?? []).find((l) => l.id === e.id);
          if (r) return [{ kind: "add-external-table", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const o = (n = (s = (this.model.rags ?? []).find((r) => r.id === e.sourceId)) == null ? void 0 : s.contentSources) == null ? void 0 : n.find((r) => r.uri === e.uri);
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
        const o = (a = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : a.operations.find((r) => r.id === e.id);
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
        const o = (d = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : d.operations.find((r) => r.id === e.id);
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
          const r = (o.readModels ?? []).find((l) => l.id === e.id);
          if (r != null && r.aggregateId)
            return [{ kind: "add-read-model", id: r.id, name: r.name, aggregateId: r.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const o of this.model.modules) {
          const r = (o.domainEvents ?? []).find((l) => l.id === e.id);
          if (r) return [{ kind: "add-domain-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "rename-element": {
        const r = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((l) => l.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((l) => l.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((l) => l.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((l) => l.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((l) => l.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((l) => l.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((l) => l.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((l) => l.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((l) => l.id === e.id);
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
        const o = (this.model.processes ?? []).find((u) => u.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((u) => u.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const l = o.steps[r];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: l.id,
            name: l.name,
            stepType: l.type,
            roleId: l.roleId,
            deadline: l.deadline,
            useCaseId: l.useCaseId,
            compensationUseCaseId: l.compensationUseCaseId,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
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
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), r = o == null ? void 0 : o.steps.find((l) => l.id === e.id);
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
        const o = (this.model.workflows ?? []).find((u) => u.id === e.workflowId), r = (o == null ? void 0 : o.steps.findIndex((u) => u.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const l = o.steps[r];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: l.id,
            name: l.name,
            emittedEventName: l.emittedEventName,
            targetUseCaseId: l.targetUseCaseId,
            completionEventName: l.completionEventName,
            dependsOnStepIds: l.dependsOnStepIds,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...o.steps.filter((u) => u.id !== e.id && (u.dependsOnStepIds ?? []).includes(e.id)).map(
            (u) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: u.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const o = (this.model.workflows ?? []).find((l) => l.id === e.workflowId), r = o == null ? void 0 : o.steps.find((l) => l.id === e.id);
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
      case "set-workflow-trigger": {
        const o = (this.model.workflows ?? []).find((r) => r.id === e.id);
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, a = this.viewLayout(n), d = a.nodes[t] ?? null;
    let o = { x: i, y: s };
    const r = this.sceneFor(n), l = r.nodes.find((m) => m.id === t);
    if (l != null && l.parentId) {
      const m = r.nodes.find((f) => f.id === l.parentId);
      m && (o = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...a, nodes: { ...a.nodes, [t]: o } });
    const u = [{ kind: "move-node", view: n, id: t, pos: d }];
    if (n === "processes") {
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, a = (this.model.apis ?? []).find((w) => w.id === t) ?? (this.model.proxyApis ?? []).find((w) => w.id === t);
    if (!a || i && !this.model.externalSystems.some((w) => w.id === i)) return;
    const d = a.publishedByExternalSystemId ?? "", o = i ?? "";
    if (o === d) return;
    const r = this._view, l = this.viewLayout(r), u = this.sceneFor(r), m = o ? u.nodes.find((w) => w.id === o) : void 0, f = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, h = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: r, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: o }, !1), this.writeViewLayout(r, { ...l, nodes: { ...l.nodes, [t]: f } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, a = (this.model.apis ?? []).find((w) => w.id === t), d = this.model.externalSystems.find((w) => w.id === i);
    if (!a || !d || (this.model.proxyApis ?? []).some(
      (w) => w.targetApiId === t && w.publishedByExternalSystemId === i
    )) return;
    const r = `proxy-${Y(a.name)}-${Y(d.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === r)) return;
    const l = this._view, u = this.viewLayout(l), f = this.sceneFor(l).nodes.find((w) => w.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: r,
        name: `${a.name}@${d.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const h = [{ kind: "remove-proxy-api", id: r }];
    f && (h.push({ kind: "move-node", view: l, id: r, pos: u.nodes[r] ?? null }), this.writeViewLayout(l, {
      ...u,
      nodes: { ...u.nodes, [r]: { x: s - f.x, y: n - f.y } }
    })), this.pushUndoEntry(h);
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
    var o, r, l;
    const t = e.target, i = (o = t.files) == null ? void 0 : o[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), a = n ? null : ((r = this.model.externalSystems.find((u) => u.id === this._selectedId)) == null ? void 0 : r.id) ?? null, d = n || a ? null : ((l = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : l.id) ?? null;
    if (!n && !a && !d) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: n,
      homeExternalId: a,
      homeModuleId: d
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
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), a = { ...s.nodes }, d = [];
    for (const { id: o, x: r, y: l } of t) {
      d.push({ kind: "move-node", view: i, id: o, pos: s.nodes[o] ?? null });
      let u = { x: r, y: l };
      const m = n.nodes.find((f) => f.id === o);
      if (m != null && m.parentId) {
        const f = n.nodes.find((h) => h.id === m.parentId);
        f && (u = { x: r - f.x, y: l - f.y });
      }
      a[o] = u;
    }
    if (this.writeViewLayout(i, { ...s, nodes: a }), i === "processes")
      for (const { id: o } of t) {
        const r = this.stepReorderCommand(o);
        if (r) {
          const l = this.inverseOf(r);
          l && d.unshift(...l), this.command(r, !1);
        }
      }
    this.pushUndoEntry(d);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: s, w: n, h: a } = e.detail, d = this._view, o = this.viewLayout(d), r = this.sceneFor(d).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: d, id: t, size: ((u = o.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: d, id: t, pos: o.nodes[t] ?? null },
      ...r.map((m) => ({ kind: "move-node", view: d, id: m.id, pos: o.nodes[m.id] ?? null }))
    ]);
    const l = { ...o.nodes, [t]: { x: i, y: s } };
    for (const m of r) l[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(d, {
      ...o,
      nodes: l,
      sizes: { ...o.sizes ?? {}, [t]: { w: n, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, n = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: n.edges[t] ?? null }
    ]);
    const a = { ...n.edges };
    i.length ? a[t] = i : delete a[t], this.writeViewLayout(s, { ...n, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = tn(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((d) => [d.id, d.x])), n = [...t.steps].sort(
      (d, o) => (s.get(d.id) ?? 0) - (s.get(o.id) ?? 0)
    );
    if (n.every((d, o) => d.id === t.steps[o].id)) return null;
    const a = n.findIndex((d) => d.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? n[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: n } = e.detail;
    this.applyConnection(t, i, s, n);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s) {
    var N, _, F, q;
    if (this._view === "workflows") {
      const $ = this.owningWorkflowOf(e), M = this.owningWorkflowOf(t);
      if (!$ || $ !== M || e === t) return;
      const S = $.steps.find((O) => O.id === t);
      if (((S == null ? void 0 : S.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: $.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const $ = this.model.pages ?? [], M = this.model.uiApps ?? [], S = (v) => M.some((E) => E.id === v), O = (v) => $.some((E) => E.id === v);
      if (O(e) && S(t)) {
        const v = $.find((D) => D.id === e), E = M.find((D) => D.id === t);
        if (E.type === "MASTER_DETAIL" && !E.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${v.name} es la cabecera de ${E.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: v.name,
          pageId: e,
          itemId: this.newMenuItemId(v.name)
        });
        return;
      }
      const U = he(e);
      if (U != null && U.itemId && ((N = he(t)) != null && N.itemId || S(t))) {
        const v = he(t), E = this.menuEntryIn(U.appId, U.itemId);
        if (!E) return;
        if (v != null && v.itemId) {
          const D = this.menuEntryIn(v.appId, v.itemId);
          if (!D) return;
          const z = (ee) => (ee ?? []).some((pe) => pe.id === v.itemId || z(pe.children));
          if (U.appId === v.appId && (v.itemId === U.itemId || z(E.entry.children)))
            return;
          const A = (_ = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : _.renderRoot.querySelector(`g[data-node-id="${t}"]`), R = A == null ? void 0 : A.getBoundingClientRect(), j = R && s !== void 0 ? (s - R.top) / Math.max(1, R.height) : 0.5, te = j < 0.3 ? "before" : j > 0.7 ? "after" : "nest";
          if (te === "nest")
            this.command({
              kind: "move-menu-item",
              appId: U.appId,
              toAppId: v.appId,
              itemId: U.itemId,
              parentId: v.itemId
            });
          else {
            const ee = te === "before" ? v.itemId : D.beforeId ?? void 0;
            if (U.appId === v.appId && D.parentId === E.parentId && ee === U.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: U.appId,
              toAppId: v.appId,
              itemId: U.itemId,
              parentId: D.parentId ?? void 0,
              beforeItemId: ee
            });
          }
          return;
        }
        if (U.appId === t && !E.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: U.appId,
          toAppId: t,
          itemId: U.itemId
        });
        return;
      }
      const p = he(e) ?? he(t);
      if (p) {
        const v = he(e) ? e : t, E = he(e) ? t : e;
        if (((F = this.sceneFor("ui").nodes.find((R) => R.id === v)) == null ? void 0 : F.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const D = this.model.modules.some(
          (R) => (R.useCases ?? []).some((j) => j.id === E)
        ), z = (this.model.aggregates ?? []).some((R) => R.id === E), A = this.model.modules.flatMap((R) => R.queryServices ?? []).find((R) => (R.operations ?? []).some((j) => j.id === E));
        O(E) ? this.command({ kind: "set-menu-page", pageId: E, ...p }) : S(E) && E !== p.appId ? this.command({ kind: "set-menu-app", toAppId: E, ...p }) : D ? this.command({ kind: "set-menu-use-case", useCaseId: E, ...p }) : z ? this.command({ kind: "set-menu-aggregate", aggregateId: E, ...p }) : A && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: A.id,
          queryOperationId: E,
          ...p
        });
        return;
      }
      if ((this.model.actors ?? []).some((v) => v.id === e) && S(t)) {
        (this.model.actorAppUses ?? []).some((v) => v.actorId === e && v.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const I = O(e) ? { pageId: e, other: t } : O(t) ? { pageId: t, other: e } : null;
      if (I) {
        const v = new Set(
          this.model.modules.flatMap((z) => (z.useCases ?? []).map((A) => A.id))
        ), E = new Set(
          this.model.modules.flatMap((z) => (z.queryServices ?? []).map((A) => A.id))
        ), D = $.find((z) => z.id === I.pageId);
        v.has(I.other) ? (D.buttons ?? []).some((z) => z.useCaseId === I.other) || this.command({ kind: "add-page-button", pageId: I.pageId, useCaseId: I.other }) : E.has(I.other) && this.command({ kind: "set-page-listing", pageId: I.pageId, queryServiceId: I.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const n = /^apiop:(.+)@(.+)$/.exec(e);
    if (n) {
      const [, $, M] = n, S = (this.model.proxyApis ?? []).find((v) => v.id === M), O = (S == null ? void 0 : S.targetApiId) ?? ((q = (this.model.apiImplementations ?? []).find(
        (v) => v.moduleId === M && (this.model.apis ?? []).some(
          (E) => E.id === v.apiId && E.operations.some((D) => D.id === $)
        )
      )) == null ? void 0 : q.apiId);
      if (!O) return;
      if (new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((E) => E.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: O,
          operationId: $,
          moduleId: M,
          targetUseCaseId: t
        });
        return;
      }
      if (!(S != null && S.targetApiId)) return;
      let p = null;
      if (t === S.targetApiId)
        p = S.targetApiId;
      else {
        const v = /^apiimpl:(.+)@(.+)$/.exec(t);
        v && v[1] === S.targetApiId ? p = v[2] : this.model.modules.some((E) => E.id === t) && (this.model.apiImplementations ?? []).some(
          (E) => E.apiId === S.targetApiId && E.moduleId === t
        ) && (p = t);
      }
      if (!p) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (v) => v.proxyId === S.id && v.operationId === $ && v.targetSiteId === p
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: S.id,
        operationId: $,
        targetSiteId: p
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map(($) => $.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((p) => (p.useCases ?? []).map((I) => I.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (I) => I.agentId === e && I.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((p) => (p.useCases ?? []).map((I) => I.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (I) => I.agentId === e && I.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((p) => (p.mcpServers ?? []).map((I) => I.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (I) => I.agentId === e && I.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((p) => p.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (I) => I.agentId === e && I.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((p) => p.operations.map((I) => I.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (I) => I.agentId === e && I.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((p) => p.id === t) || (this.model.proxyApis ?? []).some((p) => p.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (I) => I.agentId === e && I.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((p) => (p.queryServices ?? []).map((I) => I.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (I) => I.agentId === e && I.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (I) => I.agentId === e && I.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((p) => p.id === t) && ((this.model.agentRags ?? []).some(
        (I) => I.agentId === e && I.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some(($) => $.id === e)) {
      const $ = (this.model.mcpGateways ?? []).find((O) => O.id === e), M = this.model.externalSystems.some((O) => (O.mcpServers ?? []).some((U) => U.id === t)) || (this.model.apis ?? []).some((O) => O.id === t) || (this.model.apis ?? []).some((O) => O.operations.some((U) => U.id === t)) || this.model.modules.some((O) => (O.useCases ?? []).some((U) => U.id === t)) || (this.model.rags ?? []).some((O) => O.id === t), S = [
        ...$.mcpServerIds ?? [],
        ...$.apiIds ?? [],
        ...$.apiOperationIds ?? [],
        ...$.useCaseIds ?? [],
        ...$.ragIds ?? []
      ].includes(t);
      M && !S && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some(($) => $.id === t)) return;
    const d = (this.model.rags ?? []).find(($) => $.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.readModels ?? []).map((O) => O.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.tables ?? []).map((O) => O.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((S) => S.id === t) || (this.model.proxyApis ?? []).some((S) => S.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((S) => S.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some(($) => $.id === t)) return;
    if ((this.model.workflows ?? []).some(($) => $.id === e)) {
      const $ = (this.model.workflows ?? []).find((O) => O.id === e), M = (this.model.workflows ?? []).find(
        (O) => O.id === t && O.id !== e
      );
      if (M) {
        const O = $.onCompletionEventName || `${$.name.replace(/\s+/g, "")}Completado`;
        M.triggerEvent !== O && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: O });
        return;
      }
      const S = this.model.modules.flatMap((O) => O.useCases ?? []).find((O) => O.id === t);
      if (S && !($.steps ?? []).some((U) => U.targetUseCaseId === t)) {
        const U = `wfs-${Y(S.name)}`;
        let p = U;
        for (let I = 2; ($.steps ?? []).some((v) => v.id === p); I++)
          p = `${U}-${I}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: p,
          name: S.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some(($) => $.id === t)) {
      const $ = this.model.modules.flatMap((O) => O.domainEvents ?? []).find((O) => O.id === e), M = this.model.modules.flatMap((O) => O.applicationEvents ?? []).find((O) => O.id === e), S = $ ?? M;
      if (S) {
        const O = (this.model.emissions ?? []).find((v) => v.domainEventId === e), U = new Set((this.model.aggregates ?? []).map((v) => v.id)), p = new Set(
          this.model.modules.flatMap((v) => (v.domainServices ?? []).map((E) => E.id))
        ), I = new Set(
          this.model.modules.flatMap((v) => (v.useCases ?? []).map((E) => E.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: S.name,
          triggerAggregateId: O && U.has(O.sourceId) ? O.sourceId : void 0,
          triggerDomainServiceId: O && p.has(O.sourceId) ? O.sourceId : void 0,
          triggerUseCaseId: O && I.has(O.sourceId) ? O.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some(($) => $.id === e)) {
      const $ = (this.model.proxyApis ?? []).find((M) => M.id === e);
      if ((this.model.apis ?? []).some((M) => M.id === t)) {
        $.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((M) => M.id === t)) {
        if (!$.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (S) => S.apiId === $.targetApiId && S.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: $.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((M) => M.id === t) && $.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some(($) => $.id === e)) {
      if (this.model.externalSystems.some(($) => $.id === t)) {
        (this.model.apis ?? []).find((M) => M.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some(($) => $.id === t) && ((this.model.apiImplementations ?? []).some(
        (M) => M.apiId === e && M.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const o = new Set((this.model.actors ?? []).map(($) => $.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((M) => (M.domainEvents ?? []).map((S) => S.id)),
        ...this.model.modules.flatMap((M) => (M.applicationEvents ?? []).map((S) => S.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (S) => S.eventId === e && S.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!o.has(e)) return;
    }
    if (o.has(e)) {
      const $ = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((O) => O.id))
      ), M = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((O) => O.id))
      );
      if ($.has(t) || M.has(t)) {
        (this.model.actorUses ?? []).some(
          (O) => O.actorId === e && O.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((S) => S.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (O) => O.actorId === e && O.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((S) => S.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (O) => O.actorId === e && O.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const r = this.owningApiOf(e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((S) => S.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: r.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((M) => M.id === t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: r.id,
          id: e,
          moduleId: t
        });
        return;
      }
      return;
    }
    const l = this.model.externalSystems.flatMap(($) => $.useCases ?? []).find(($) => $.id === e), u = this.model.externalSystems.flatMap(($) => $.tables ?? []).find(($) => $.id === e);
    if (l || u) {
      const $ = (l ?? u).name, M = l ? { externalUseCaseId: e } : { externalTableId: e }, S = (p) => l ? p.sourceExternalUseCaseId === e : p.sourceExternalTableId === e, O = this.model.modules.flatMap((p) => p.readModels ?? []).find((p) => p.id === t);
      if (O) {
        (this.model.projections ?? []).some(
          (I) => S(I) && I.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y($)}-${Y(O.name)}`,
          name: `${O.name}Projection`,
          ...M,
          targetId: t
        });
        return;
      }
      const U = this.model.modules.find((p) => p.id === t);
      if (U) {
        (this.model.projections ?? []).some(
          (I) => S(I) && I.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y($)}-${Y(U.name)}`,
          name: `${$}ViewProjection`,
          ...M,
          moduleId: t,
          readModelName: `${$}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find(($) => $.id === e);
    if (m) {
      const $ = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (O) => O.sourceAggregateId === e && O.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(m.name)}-${Y($.name)}`,
          name: `${$.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const M = this.model.modules.find((S) => S.id === t);
      if (M) {
        (this.model.projections ?? []).some(
          (O) => O.sourceAggregateId === e && O.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(m.name)}-${Y(M.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap(($) => ($.domainEvents ?? []).map((M) => M.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map(($) => $.id),
      ...this.model.modules.flatMap(($) => ($.domainServices ?? []).map((M) => M.id))
    ]), w = new Set(
      this.model.modules.flatMap(($) => ($.applicationEvents ?? []).map((M) => M.id))
    ), g = new Set(this.model.modules.flatMap(($) => ($.useCases ?? []).map((M) => M.id))), y = new Set(
      this.model.modules.flatMap(($) => ($.queryServices ?? []).map((M) => M.id))
    );
    if (g.has(e) && y.has(t)) {
      (this.model.queryCalls ?? []).some(
        (M) => M.sourceId === e && M.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap(($) => ($.useCases ?? []).map((M) => M.id))
    );
    if (g.has(e) && x.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (M) => M.sourceId === e && M.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && g.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (M) => M.sourceId === e && M.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const b = this.model.modules.flatMap(($) => $.scheduledTriggers ?? []).find(($) => $.id === e);
    if (b && g.has(t)) {
      b.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (g.has(e) && (this.model.aggregates ?? []).some(($) => $.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (M) => M.sourceId === e && M.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && f.has(t) || g.has(e) && w.has(t)) {
      (this.model.emissions ?? []).some(
        (M) => M.sourceId === e && M.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || w.has(e)) {
      const $ = w.has(e), M = this.model.modules.flatMap((A) => ($ ? A.applicationEvents : A.domainEvents) ?? []).find((A) => A.id === e), S = this.model.modules.flatMap((A) => (A.useCases ?? []).map((R) => ({ u: R, module: A }))).find(({ u: A }) => A.id === t), O = this.model.modules.flatMap((A) => (A.readModels ?? []).map((R) => ({ rm: R, module: A }))).find(({ rm: A }) => A.id === t), U = this.model.modules.find((A) => A.id === t) ?? (O == null ? void 0 : O.module) ?? (S == null ? void 0 : S.module);
      if (!M || !U) return;
      const p = new Set((this.model.aggregates ?? []).map((A) => A.id)), I = new Set(
        this.model.modules.flatMap((A) => (A.domainServices ?? []).map((R) => R.id))
      ), v = (this.model.emissions ?? []).find(
        (A) => A.domainEventId === e && ($ ? g.has(A.sourceId) : p.has(A.sourceId) || I.has(A.sourceId))
      );
      if (!v) {
        this.emit("modux-notice", {
          message: $ ? `Declara primero qué caso de uso publica ${M.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${M.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const E = !$ && p.has(v.sourceId);
      if (S) {
        if (this.model.flows.some(
          (R) => R.archetype === "TRIGGERS" && R.triggerEvent === M.name && R.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(M.name)}-${Y(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: E ? v.sourceId : "",
          triggerDomainServiceId: !$ && !E ? v.sourceId : void 0,
          triggerUseCaseId: $ ? v.sourceId : void 0,
          triggerEvent: M.name,
          targetId: U.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const D = (O == null ? void 0 : O.rm.name) ?? `${M.name}View`;
      if (this.model.flows.some(
        (A) => A.archetype === "MATERIALIZES" && A.triggerEvent === M.name && A.targetId === U.id && A.readModelName === D
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${Y(M.name)}-${Y(D)}`,
        name: D,
        archetype: "MATERIALIZES",
        triggerAggregateId: E ? v.sourceId : "",
        triggerDomainServiceId: !$ && !E ? v.sourceId : void 0,
        triggerUseCaseId: $ ? v.sourceId : void 0,
        triggerEvent: M.name,
        targetId: U.id,
        readModelName: D
      });
      return;
    }
    const P = /* @__PURE__ */ new Set([
      ...h,
      ...g,
      ...y,
      ...this.model.modules.flatMap(($) => ($.readModels ?? []).map((M) => M.id))
    ]);
    if (P.has(e) || P.has(t) || f.has(t) || w.has(t))
      return;
    const C = new Set(this.model.externalSystems.map(($) => $.id));
    if (C.has(e)) {
      if (new Set(
        this.model.modules.flatMap((U) => (U.useCases ?? []).map((p) => p.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (p) => p.externalSystemId === e && p.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (C.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const M = (this.model.apis ?? []).find(
        (U) => U.operations.some((p) => p.id === t)
      ), S = /^apiop:(.+)@(.+)$/.exec(t), O = M ? { operationId: t, siteId: M.id } : S ? { operationId: S[1], siteId: S[2] } : null;
      if (O) {
        (this.model.externalOperationUses ?? []).some(
          (p) => p.externalSystemId === e && p.operationId === O.operationId && p.siteId === O.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: O.operationId,
          targetSiteId: O.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((U) => U.id === t) || (this.model.proxyApis ?? []).some((U) => U.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (p) => p.sourceId === e && p.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    C.has(t) || o.has(t);
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
      const n = this.memberIdOf(i, s), a = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
      if (n && (a != null && a.memberIds.includes(n))) {
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
        else if (n = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] });
        else if (n = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: n[1], queryServiceId: null });
        else if (n = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: n[1], modelId: null });
        else if (n = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: n[1], appId: n[2] });
        else if (n = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const a = he(n[1]);
          a && this.command({ kind: "set-menu-page", pageId: null, ...a });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const a = he(n[1]);
          a && this.command({ kind: "set-menu-app", toAppId: null, ...a });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const a = he(n[1]);
          a && this.command({ kind: "set-menu-use-case", useCaseId: null, ...a });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const a = he(n[1]);
          a && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...a });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const a = he(n[1]);
          a && this.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...a });
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
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const n = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      const a = this.owningWorkflowOf(n[2]);
      if (!a) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: a.id,
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
      const [, a, d] = n, o = (s = (this.model.apis ?? []).find(
        (r) => r.operations.some((l) => l.id === a)
      )) == null ? void 0 : s.id;
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: o, operationId: a, moduleId: d });
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
      const [, a, d, o] = n, r = /^apiimpl:.+@(.+)$/.exec(o), l = r ? r[1] : o;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: d, operationId: a, targetSiteId: l });
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
      const n = /^apiwire:(.+)$/.exec(t), a = n ? this.owningApiOf(n[1]) : null;
      if (!n || !a) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: a.id, id: n[1] });
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
      if (!n || !(this.model.proxyApis ?? []).some((a) => a.id === n[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: n[1], targetId: "" });
      return;
    }
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((a) => a.moduleId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: t });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((a) => a.aggregateId === t)) return;
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
      id: `step-${Y(e)}`,
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
      id: `wfstep-${Y(e)}`,
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
    const t = new Set(e.memberIds), i = (n, a, d = {}) => k`
      <label
        class="${d.child ? "child" : ""} ${d.implicit && !t.has(n) ? "implicit" : ""}"
        title=${d.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(o) => this.toggleViewMember(n, o.target.checked)}
        />
        ${a}
      </label>
    `, s = (n, a) => a.length ? k`<h4>${n}</h4>${a}` : "";
    return k`
      <aside class="view-tree" @pointerdown=${(n) => n.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((n) => [
        i(n.id, n.name),
        ...(this.model.aggregates ?? []).filter((a) => a.moduleId === n.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(n.id) }))
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
    const i = `view-${Y(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), s = new Set(i.map((h) => h.id)), n = this.model.externalSystems.filter((h) => t.has(h.id)), a = new Set(n.map((h) => h.id)), d = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || s.has(h.moduleId)
    ), o = new Set(d.map((h) => h.id)), r = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), l = /* @__PURE__ */ new Set(), u = (h) => {
      for (const w of h ?? [])
        w.pageId && l.add(w.pageId), u(w.children);
    };
    r.forEach((h) => u(h.menuItems));
    const m = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || l.has(h.id)
    ), f = new Set(r.map((h) => h.id));
    return {
      ...this.model,
      uiApps: r,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => f.has(h.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (h) => s.has(h.sourceId) && s.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (s.has(h.sourceId) || a.has(h.sourceId)) && (s.has(h.targetId) || a.has(h.targetId))
      ),
      aggregates: d,
      entities: (this.model.entities ?? []).filter((h) => o.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => o.has(h.sourceAggregateId) && o.has(h.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (h) => t.has(h.id) || (h.ownerModuleId ? s.has(h.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((h) => t.has(h.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((h) => t.has(h.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((h) => t.has(h.id)),
      rags: (this.model.rags ?? []).filter((h) => t.has(h.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((h) => t.has(h.id)),
      apis: (this.model.apis ?? []).filter(
        (h) => t.has(h.id) || (h.publishedByExternalSystemId ? a.has(h.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (h) => t.has(h.id) || (h.publishedByExternalSystemId ? a.has(h.publishedByExternalSystemId) : !1)
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
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const d of a ?? [])
        d.id && t.add(d.id), i(d.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const s = `mi-${Y(e)}`;
    let n = s;
    for (let a = 2; t.has(n); a++) n = `${s}-${a}`;
    return n;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((a) => a.id === e);
    let s = null;
    const n = (a, d) => {
      var r;
      const o = a ?? [];
      for (let l = 0; l < o.length; l++)
        o[l].id === t && (s = { node: o[l], parentId: d, beforeId: ((r = o[l + 1]) == null ? void 0 : r.id) ?? null }), n(o[l].children, o[l].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, a) {
    const d = a ?? this.allComponentIds(), o = (m) => {
      if (!n) return m.id;
      const f = `cmp-${Y(m.kind)}`;
      let h = f;
      for (let w = 2; d.has(h) || d.has(`${h}-tab-1`); w++) h = `${f}-${w}`;
      return d.add(h), h;
    }, r = [], l = (m, f) => {
      const h = o(m);
      r.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: m.kind, parentComponentId: f }), m.kind === "tabLayout" && (r.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), r.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), r.push({
        kind: "set-page-component",
        pageId: e,
        componentId: h,
        title: m.title ?? null,
        text: m.text ?? null,
        label: m.label ?? null,
        useCaseId: m.useCaseId ?? null,
        mappingId: m.mappingId ?? null,
        modelId: m.modelId ?? null,
        queryServiceId: m.queryServiceId ?? null,
        queryOperationId: m.queryOperationId ?? null,
        fieldId: m.fieldId ?? null,
        stereotype: m.stereotype ?? null,
        colspan: m.colspan ?? null
      });
      for (const w of m.children ?? []) l(w, h);
      return h;
    }, u = l(t, i);
    return s && r.push({
      kind: "move-page-component",
      pageId: e,
      componentId: u,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: r, rootId: u };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const s of i ?? [])
        e.add(s.id), t(s.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const d of a ?? [])
        t.add(d.id), i(d.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const s = `cmp-${Y(e)}`;
    let n = s;
    for (let a = 2; t.has(n) || t.has(`${n}-tab-1`); a++) n = `${s}-${a}`;
    return n;
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let s = null;
    const n = (a, d) => {
      var r;
      const o = a ?? [];
      for (let l = 0; l < o.length; l++)
        o[l].id === t && (s = { entry: o[l], parentId: d, beforeId: ((r = o[l + 1]) == null ? void 0 : r.id) ?? null }), n(o[l].children, o[l].id ?? null);
    };
    return n(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var d;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const o = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!o) return;
      t = this._selectedCmp.pageId, Z.LEAF_KINDS.has(o.node.kind) ? (i = o.parentId ?? void 0, s = o.beforeId) : i = o.node.kind === "tabLayout" && e.kind !== "tab" ? (d = (o.node.children ?? [])[0]) == null ? void 0 : d.id : o.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((o) => o.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: n, rootId: a } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const o of n) this.command(o, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: a }]), this._selectedCmp = { pageId: t, componentId: a };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return k`<modux-figma
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
      const { pageId: i, fieldId: s, stereotype: n, colspan: a, label: d } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: a, label: d });
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
            (n) => (n.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${n.name})` }))
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
    var o;
    const t = (o = e.dataTransfer) == null ? void 0 : o.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), n = i.nodeIdAtClient(e.clientX, e.clientY), a = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let d;
    try {
      d = JSON.parse(t);
    } catch {
      return;
    }
    d.new ? this.createFromPalette(d.new, s, n, a) : d.existing && this.placeExistingFromPalette(d.existing, s, n, e.clientX, e.clientY, a);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((n) => n.id)), s = this.model;
    for (const n of [
      s.modules.map((a) => a.id),
      (s.actors ?? []).map((a) => a.id),
      s.externalSystems.map((a) => a.id),
      (s.apis ?? []).map((a) => a.id),
      (s.proxyApis ?? []).map((a) => a.id),
      (s.aiAgents ?? []).map((a) => a.id),
      (s.rags ?? []).map((a) => a.id),
      (s.workflows ?? []).map((a) => a.id),
      (s.workflows ?? []).flatMap((a) => (a.steps ?? []).map((d) => d.id)),
      (s.uiApps ?? []).map((a) => a.id),
      (s.pages ?? []).map((a) => a.id)
    ])
      n.forEach((a) => i.add(a));
    for (let n = 1; ; n++) {
      const a = n === 1 ? e : `${e} ${n}`, d = `${t}${Y(a)}`;
      if (!i.has(d)) return { id: d, name: a };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var a, d;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let o = t; o; )
      s.push(o), o = (a = i.nodes.find((r) => r.id === o)) == null ? void 0 : a.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service",
      "scheduled-trigger"
    ].includes(e)) return s.find((o) => this.model.modules.some((r) => r.id === o)) ?? null;
    if (e === "read-model") {
      const o = s.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (o) return o;
      const r = s.find((l) => this.model.modules.some((u) => u.id === l));
      return ((d = (this.model.aggregates ?? []).find((l) => l.moduleId === r)) == null ? void 0 : d.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (o) => this.model.modules.some((r) => (r.useCases ?? []).some((l) => l.id === o))
      ) ?? null;
    if (e === "api-operation") {
      for (const o of s) {
        if ((this.model.apis ?? []).some((u) => u.id === o)) return o;
        const r = /^apiimpl:(.+)@(.+)$/.exec(o);
        if (r && (this.model.apis ?? []).some((u) => u.id === r[1])) return r[1];
        const l = (this.model.proxyApis ?? []).find((u) => u.id === o);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? s.find((o) => this.model.modules.some((r) => r.id === o)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var m, f, h, w;
    const n = B.PALETTE_NEW.find((g) => g.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const g = e.slice(4), y = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, x = y ? y[1] : i && (this.model.pages ?? []).some((_) => _.id === i) ? i : null;
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let b = y ? y[2] : void 0, P = null;
      if (g === "tab") {
        let _ = null, F = b ? this.componentIn(x, b) : null;
        for (; F; ) {
          if (F.node.kind === "tabLayout") {
            _ = F.node.id;
            break;
          }
          F = F.parentId ? this.componentIn(x, F.parentId) : null;
        }
        if (!_) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const q = this.componentIn(x, _).node, $ = this.newComponentId("tab"), M = `Pestaña ${(q.children ?? []).filter((S) => S.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: x, componentId: $, componentKind: "tab", parentComponentId: _ }, !1), this.command({ kind: "set-page-component", pageId: x, componentId: $, title: M }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: $ }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const _ = this.componentIn(x, s.componentId);
        _ && _.node.kind === "tab" ? b = _.node.id : _ && (b = _.parentId ?? void 0, P = s.pos === "before" ? s.componentId : _.beforeId);
      } else if (b) {
        const _ = ((m = this.componentIn(x, b)) == null ? void 0 : m.node) ?? null;
        (_ == null ? void 0 : _.kind) === "tabLayout" && (_.children ?? [])[0] && (b = (_.children ?? [])[0].id);
      }
      const C = this.newComponentId(g), N = {
        kind: "add-page-component",
        pageId: x,
        componentId: C,
        componentKind: g,
        parentComponentId: b
      };
      if (!P) {
        this.command(N);
        return;
      }
      this.command(N, !1), this.command(
        { kind: "move-page-component", pageId: x, componentId: C, parentComponentId: b ?? null, beforeComponentId: P },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: C }]);
      return;
    }
    const a = this._view, d = this.sceneFor(a), o = (g, y) => {
      const x = this.viewLayout(a), b = y ? d.nodes.find((C) => C.id === y) : void 0, P = b ? { x: Math.round(t.x - b.x), y: Math.round(t.y - b.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...x, nodes: { ...x.nodes, [g]: P } }), { kind: "move-node", view: a, id: g, pos: null };
    }, r = (g, y, x) => {
      const b = this.inverseOf(g) ?? [];
      this.command(g, !1);
      const P = o(y, x);
      this.pushUndoEntry([...b, P]);
    };
    if (!n.child) {
      const g = {
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
        "ui-app-masterdetail": "app-"
      }, { id: y, name: x } = this.uniquePaletteName(n.label, g[e] ?? ""), b = e === "module" ? { kind: "add-module", id: y, name: x, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: y, name: x } : e === "external-system" ? { kind: "add-external-system", id: y, name: x } : e === "ai-agent" ? { kind: "add-ai-agent", id: y, name: x } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: y, name: x, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: y, name: x } : e === "rag" ? { kind: "add-rag", id: y, name: x } : e === "api" ? { kind: "add-api", id: y, name: x } : e === "proxy-api" ? { kind: "add-proxy-api", id: y, name: x } : e === "ui-app" ? { kind: "create-ui-app", id: y, name: x } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: y, name: x, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: y, name: x, type: "MASTER_DETAIL" } : {
        kind: "add-workflow",
        id: y,
        name: x,
        completionEventName: `${x.replace(/\s+/g, "")}Completado`
      };
      r(b, y);
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const g = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", y = g === "CRUD" ? "CRUD" : g === "WIZARD" ? "Wizard" : "Página", { id: x, name: b } = this.uniquePaletteName(y, "page-"), P = [];
      for (let N = i ?? void 0; N; )
        P.push(N), N = (f = d.nodes.find((_) => _.id === N)) == null ? void 0 : f.parentId;
      const C = P.find((N) => (this.model.uiApps ?? []).some((_) => _.id === N));
      if (C) {
        const N = d.nodes.find((_) => _.id === C);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40);
      }
      r(
        C ? { kind: "create-ui-page", id: x, name: b, pageType: g, appId: C, menuLabel: b } : { kind: "create-ui-page", id: x, name: b, pageType: g },
        x
      );
      return;
    }
    if (e === "menu-item") {
      const g = [];
      for (let N = i ?? void 0; N; )
        g.push(N), N = (h = d.nodes.find((_) => _.id === N)) == null ? void 0 : h.parentId;
      const y = g.find((N) => (this.model.uiApps ?? []).some((_) => _.id === N));
      if (!y) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const x = /* @__PURE__ */ new Set(), b = (N) => {
        for (const _ of N ?? [])
          x.add(_.label), b(_.children);
      };
      (this.model.uiApps ?? []).forEach((N) => b(N.menuItems));
      let P = "Entrada";
      for (let N = 2; x.has(P); N++) P = `Entrada ${N}`;
      const C = g.map((N) => he(N)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: y,
        label: P,
        itemId: this.newMenuItemId(P),
        parentId: C == null ? void 0 : C.itemId,
        parentLabel: C != null && C.itemId || C == null ? void 0 : C.label
      });
      return;
    }
    if (e === "workflow-step") {
      const g = this.model.workflows ?? [], y = [];
      for (let _ = i ?? void 0; _; )
        y.push(_), _ = (w = d.nodes.find((F) => F.id === _)) == null ? void 0 : w.parentId;
      const x = y.map((_) => g.find((F) => F.id === _)).find(Boolean), b = y.map((_) => {
        const F = g.find((q) => (q.steps ?? []).some(($) => $.id === _));
        return F ? { owner: F, stepId: _ } : null;
      }).find(Boolean), P = x ?? (b == null ? void 0 : b.owner);
      if (!P) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: C, name: N } = this.uniquePaletteName("Paso", "wfs-");
      b && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: P.id,
          id: C,
          name: N,
          ...b ? { dependsOnStepIds: [b.stepId], afterStepId: b.stepId } : {}
        },
        C
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${P.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const g = this.dropContainerFor("api", i);
      if (!g) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: y, name: x } = this.uniquePaletteName("API", "api-"), b = { kind: "add-api", id: y, name: x }, P = this.inverseOf(b) ?? [];
      this.command(b, !1), this.model.externalSystems.some((F) => F.id === g) ? this.command({ kind: "set-api-publisher", id: y, targetId: g }, !1) : this.command({ kind: "add-api-implementation", apiId: y, moduleId: g }, !1);
      const C = this.viewLayout(this._view), N = this.sceneFor(this._view).nodes.find((F) => F.id === g), _ = N ? { x: Math.round(t.x - N.x), y: Math.round(t.y - N.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...C, nodes: { ...C.nodes, [y]: _ } }), this.pushUndoEntry([...P, { kind: "move-node", view: this._view, id: y, pos: null }]);
      return;
    }
    const l = this.dropContainerFor(e, i);
    if (!l) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: u } = this.uniquePaletteName(n.label, "");
    if (e === "aggregate") {
      const g = `agg-${Y(u)}`;
      r({ kind: "add-aggregate", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "use-case" || e === "policy") {
      const g = `uc-${Y(u)}`;
      r(
        { kind: "add-use-case", id: g, name: u, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        g,
        l
      );
    } else if (e === "domain-event") {
      const g = `ev-${Y(u)}`;
      r({ kind: "add-domain-event", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "application-event") {
      const g = `aev-${Y(u)}`;
      r({ kind: "add-application-event", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "domain-service") {
      const g = `ds-${Y(u)}`;
      r({ kind: "add-domain-service", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "query-service") {
      const g = `qs-${Y(u)}`;
      r({ kind: "add-query-service", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "scheduled-trigger") {
      const g = `st-${Y(u)}`;
      r({ kind: "add-scheduled-trigger", id: g, name: u, moduleId: l }, g, l), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "read-model") {
      const g = `rm-${Y(u)}`, y = (this.model.aggregates ?? []).find((x) => x.id === l);
      r({ kind: "add-read-model", id: g, name: u, aggregateId: l }, g, (y == null ? void 0 : y.moduleId) ?? l);
    } else if (e === "api-operation") {
      const g = (this.model.apis ?? []).find((C) => C.id === l), y = new Set(((g == null ? void 0 : g.operations) ?? []).map((C) => C.id));
      let x = u, b = `apiop-${l.replace(/^api-/, "")}-${Y(x)}`;
      for (let C = 2; y.has(b); C++)
        x = `${n.label} ${C}`, b = `apiop-${l.replace(/^api-/, "")}-${Y(x)}`;
      r({ kind: "add-api-operation", apiId: l, id: b, name: x }, b, l), d.nodes.some(
        (C) => C.parentId === l && (C.kind === "api-operation" || C.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(g == null ? void 0 : g.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const g = this.model.modules.flatMap((P) => P.useCases ?? []).find((P) => P.id === l), y = new Set((g == null ? void 0 : g.stepIds) ?? []);
      let x = u, b = `step-${Y(x)}`;
      for (let P = 2; y.has(b); P++)
        x = `${n.label} ${P}`, b = `step-${Y(x)}`;
      r({ kind: "add-use-case-step", useCaseId: l, id: b, name: x }, b, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(g == null ? void 0 : g.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const g = `xuc-${Y(u)}`;
      r({ kind: "add-external-use-case", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "external-table") {
      const g = `tbl-${Y(u)}`;
      r({ kind: "add-external-table", id: g, name: u, moduleId: l }, g, l);
    } else if (e === "mcp-server") {
      const g = `mcpsrv-${Y(u)}`;
      r({ kind: "add-mcp-server", id: g, name: u, moduleId: l }, g, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var l;
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, n = s ? s[1] : t && (this.model.pages ?? []).some((u) => u.id === t) ? t : null;
    if (!n) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const a = s ? ((l = this.componentIn(n, s[2])) == null ? void 0 : l.node) ?? null : null, d = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
    if (d) {
      (a == null ? void 0 : a.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: a.id, useCaseId: e, label: a.label ?? d.name }), this.emit("modux-notice", { message: `El botón lanza ${d.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${d.name} añadido a la página` }));
      return;
    }
    const o = (this.model.models ?? []).find((u) => u.id === e);
    if (o) {
      (a == null ? void 0 : a.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: n, componentId: a.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${o.name}` })) : (this.command({ kind: "set-page-model", pageId: n, modelId: e }), this.emit("modux-notice", { message: `${o.name} es el viewmodel de la página` }));
      return;
    }
    const r = this.model.modules.flatMap((u) => (u.queryServices ?? []).flatMap((m) => (m.operations ?? []).map((f) => ({ op: f, qs: m })))).find(({ op: u }) => u.id === e);
    if (r) {
      (a == null ? void 0 : a.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: n,
        componentId: a.id,
        queryOperationId: r.op.id,
        queryServiceId: r.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: n, queryServiceId: r.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${r.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, i, s, n, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, a);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
      return;
    }
    const d = this._view, o = this.sceneFor(d), r = o.nodes.find((f) => f.id === e);
    if (!r) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(d);
        this.writeViewLayout(d, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const l = this.viewLayout(d), u = r.parentId ? o.nodes.find((f) => f.id === r.parentId) : void 0, m = u ? { x: Math.round(t.x - u.x), y: Math.round(t.y - u.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: d, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(d, { ...l, nodes: { ...l.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = B.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "page", "ui-page-crud", "ui-page-wizard", "menu-item"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return k`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? k`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${B.PALETTE_GROUPS.map((s) => {
      const n = t.filter((a) => a.group === s);
      return n.length ? k`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (a) => k`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(d) => this.onPaletteDragStart(d, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${ot[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : k`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => k`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (n) => k`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${ot[s.symbol]}
                          </svg>
                          <span class="pal-label">${n.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : k`
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
    var t, i, s, n, a, d, o;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const r = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!r) return;
        this.command({ kind: "add-aggregate", id: `agg-${Y(e)}`, name: e, moduleId: r });
      } else if (this._view === "flows") {
        const r = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), l = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), u = this._newTriggerEvent.trim();
        if (!r || !l || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: r,
          triggerEvent: u,
          targetId: l
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const r = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!r) return;
        this.command({
          kind: "add-process",
          id: `proc-${Y(e)}`,
          name: e,
          moduleId: r,
          triggerAggregateId: this._newTriggerAggId || ((o = (d = this.model.aggregates) == null ? void 0 : d[0]) == null ? void 0 : o.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? ro(i, t.nodes) : e === "flows" ? yo(i, t.nodes) : e === "processes" ? tn(i, t.nodes) : e === "workflows" ? Cl(i, t.nodes) : e === "ui" ? Nl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "eventstorming" ? xl(i, t.nodes) : eo(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const n of s.nodes) {
        const a = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        a && (n.diffKind = a);
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
    var r;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId), s = new Set(i.map((l) => l.id)), n = {
      nodes: i,
      edges: t.edges.filter((l) => s.has(l.sourceId) && s.has(l.targetId))
    }, d = await Rl(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), o = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((l) => ({
        kind: "move-node",
        view: e,
        id: l.id,
        pos: o.nodes[l.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(o.edges).map((l) => ({
        kind: "set-edge-points",
        view: e,
        id: l,
        points: o.edges[l]
      }))
    ]), this.writeViewLayout(e, { nodes: d, edges: {}, sizes: o.sizes }), await this.updateComplete, (r = this.renderRoot.querySelector("modux-canvas")) == null || r.fit();
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
    return k`
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
      (t) => k`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? k`
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
      (t) => k`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? k`
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
        ${this._view === "aggregates" || this._view === "processes" ? k`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return k`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? k`
              ${this._view === "flows" ? k`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => k`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return k`<option
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
              ${this._view === "flows" ? k`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return k`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? k`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => k`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? k`
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
      (t) => k`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? k`<input
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
              ${this.owningProcessOf(this._selectedId) ? k`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? k`
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
      (t) => k`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? k`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => k`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this._view === "design" ? k`${this.renderPalette()}${this.renderFigma()}` : this._tilt ? k`
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
          ></modux-tilt>` : k`
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
        ${this._view === "context-map" ? k`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? k`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? k`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : k`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? k`
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
      ([t, i]) => k`
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
    return k`
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
    return k`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => k`
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
    return k`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Yl.map(
      (s) => k`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${Ui[s].abbr}</span>
              <span class="name">${Ui[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
B.styles = pt`
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
  { type: "page", label: "Página", child: !0, symbol: "interface", color: "#0284c7", group: "UI" },
  { type: "menu-item", label: "Opción de menú", child: !0, symbol: "process", color: "#0ea5e9", group: "UI" },
  { type: "ui-page-crud", label: "CRUD", child: !0, symbol: "lens", color: "#0284c7", group: "UI" },
  { type: "ui-page-wizard", label: "Wizard", child: !0, symbol: "flow", color: "#0284c7", group: "UI" },
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
W([
  J({ attribute: !1 })
], B.prototype, "model", 2);
W([
  J({ attribute: !1 })
], B.prototype, "layout", 2);
W([
  J({ attribute: !1 })
], B.prototype, "diff", 2);
W([
  L()
], B.prototype, "_view", 2);
W([
  L()
], B.prototype, "_detail", 2);
W([
  L()
], B.prototype, "_relationType", 2);
W([
  L()
], B.prototype, "_relationPicker", 2);
W([
  L()
], B.prototype, "_extDepPicker", 2);
W([
  L()
], B.prototype, "_selectedId", 2);
W([
  L()
], B.prototype, "_paletteOpen", 2);
W([
  L()
], B.prototype, "_paletteFilter", 2);
W([
  L()
], B.prototype, "_paletteTab", 2);
W([
  L()
], B.prototype, "_selectedCmp", 2);
W([
  L()
], B.prototype, "_fullscreen", 2);
W([
  L()
], B.prototype, "_tilt", 2);
W([
  L()
], B.prototype, "_helpOpen", 2);
W([
  L()
], B.prototype, "_newName", 2);
W([
  L()
], B.prototype, "_newModuleId", 2);
W([
  L()
], B.prototype, "_newArchetype", 2);
W([
  L()
], B.prototype, "_newTriggerAggId", 2);
W([
  L()
], B.prototype, "_newTriggerEvent", 2);
W([
  L()
], B.prototype, "_newTargetId", 2);
W([
  L()
], B.prototype, "_undoStack", 2);
W([
  L()
], B.prototype, "_redoStack", 2);
W([
  L()
], B.prototype, "_newStepName", 2);
W([
  L()
], B.prototype, "_newStepType", 2);
W([
  L()
], B.prototype, "_newStepRole", 2);
W([
  L()
], B.prototype, "_newStepDeadline", 2);
W([
  L()
], B.prototype, "_editStepRole", 2);
W([
  L()
], B.prototype, "_editStepDeadline", 2);
W([
  L()
], B.prototype, "_editStepComp", 2);
W([
  L()
], B.prototype, "_newStepUseCase", 2);
W([
  L()
], B.prototype, "_newStepEmits", 2);
W([
  L()
], B.prototype, "_editStepUseCase", 2);
W([
  L()
], B.prototype, "_editStepEmits", 2);
W([
  L()
], B.prototype, "_editStepAwaits", 2);
W([
  L()
], B.prototype, "_multi", 2);
W([
  L()
], B.prototype, "_newViewName", 2);
W([
  L()
], B.prototype, "_activeViewId", 2);
W([
  L()
], B.prototype, "_newRagSourceType", 2);
W([
  L()
], B.prototype, "_newRagSourceUri", 2);
W([
  L()
], B.prototype, "_addMemberKey", 2);
W([
  L()
], B.prototype, "_treeOpen", 2);
W([
  L()
], B.prototype, "_deletePicker", 2);
B = W([
  ut("modux-editor")
], B);
var Zl = Object.defineProperty, Jl = Object.getOwnPropertyDescriptor, xe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Jl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Zl(t, i, n), n;
};
let ce = class extends Pe {
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
    ], t = (s) => ce.TYPE_LABELS[s] ?? s;
    return k`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: a, cls: d }) => {
      const o = this._diff.changes.filter((r) => r.kind === s);
      return o.length ? k`
            <div class="diff-group">${n} (${o.length})</div>
            ${o.map(
        (r) => k`
                <div class="diff-row">
                  <span class="diff-mark ${d}">${a}</span>
                  <span class="diff-type">${t(r.type)}</span>
                  <span class="diff-name" title=${r.id}>${r.name ?? r.id}</span>
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
    var n, a, d;
    const i = (n = this._workspace) == null ? void 0 : n.current;
    await this.trackWrite(async () => {
      var o;
      try {
        const r = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!r.ok) {
          let l = `El servidor rechazó la operación (${r.status})`;
          try {
            const u = await r.json();
            u != null && u.message && (l = u.message);
          } catch {
          }
          this.showToast(l);
          return;
        }
        this._workspace = await r.json(), await this.reload(), await this.refreshDiff(), (o = this.renderRoot.querySelector("modux-editor")) == null || o.clearHistory();
      } catch (r) {
        this.showToast(String(r));
      }
    });
    const s = (a = this._workspace) == null ? void 0 : a.current;
    if (s && s !== i) {
      const o = ((d = this._workspace.solutions.find((r) => r.branch === s)) == null ? void 0 : d.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${o}`
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
    const { content: t, fileName: i, apiId: s, homeExternalId: n, homeModuleId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const d = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!d.ok) {
          let u = `El servidor rechazó el contrato (${d.status})`;
          try {
            const m = await d.json();
            m != null && m.message && (u = m.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        const { apiId: o } = await d.json(), r = n ? { kind: "set-api-publisher", id: o, targetId: n } : a ? { kind: "add-api-implementation", apiId: o, moduleId: a } : null;
        r && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r)
        });
        const l = await fetch(`${this.base}/model`);
        l.ok && (this._model = await l.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${o}`, "info");
      } catch (d) {
        this.showToast(String(d));
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
    return this._error ? k`<div class="status error">modux editor: ${this._error}</div>` : this._model ? k`
      ${this._workspace ? k`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : k`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((n) => n.kind === s).length;
      return k`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? k`
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
      return k`
                      ${i === "EXPLORING" ? k`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? k`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? k`<button
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
      ${this._mergeFlow ? k`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => k`
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
      ${this._toast ? k`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : k`<div class="status">Cargando el modelo…</div>`;
  }
};
ce.styles = pt`
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
ce.TYPE_LABELS = {
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
xe([
  J()
], ce.prototype, "base", 2);
xe([
  L()
], ce.prototype, "_model", 2);
xe([
  L()
], ce.prototype, "_layout", 2);
xe([
  L()
], ce.prototype, "_error", 2);
xe([
  L()
], ce.prototype, "_saving", 2);
xe([
  L()
], ce.prototype, "_toast", 2);
xe([
  L()
], ce.prototype, "_workspace", 2);
xe([
  L()
], ce.prototype, "_creatingSolution", 2);
xe([
  L()
], ce.prototype, "_newSolutionName", 2);
xe([
  L()
], ce.prototype, "_diff", 2);
xe([
  L()
], ce.prototype, "_diffListOpen", 2);
xe([
  L()
], ce.prototype, "_mergeFlow", 2);
ce = xe([
  ut("modux-editor-connected")
], ce);
export {
  ec as CONTAINER_HEADER,
  tc as CONTAINER_INSET,
  ae as ModuxCanvas,
  B as ModuxEditor,
  ce as ModuxEditorConnected,
  ro as aggregatesScene,
  Ge as apiImplNodeId,
  We as apiOpOccurrenceId,
  Ei as containerFit,
  Hs as containerMinSize,
  eo as contextMapScene,
  Qs as flowCoherence,
  yo as flowsScene,
  Bt as normalizeViewLayout,
  tn as processesScene,
  Xs as relationEdgeId,
  zi as resolveOverlaps
};
