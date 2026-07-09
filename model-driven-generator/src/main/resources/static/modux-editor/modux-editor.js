const Jl = 34, ec = 10;
function zi(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let a = !1;
    for (let d = 0; d < e.length; d++)
      for (let o = d + 1; o < e.length; o++) {
        const r = e[d], l = e[o], p = i.get(r.id), f = i.get(l.id), m = f.x - p.x, h = f.y - p.y, g = (r.w + l.w) / 2 + t - Math.abs(m), v = (r.h + l.h) / 2 + t - Math.abs(h);
        if (!(g <= 0 || v <= 0))
          if (a = !0, g < v) {
            const I = (m >= 0 ? 1 : -1) * g / 2;
            p.x -= I, f.x += I;
          } else {
            const I = (h >= 0 ? 1 : -1) * v / 2;
            p.y -= I, f.y += I;
          }
      }
    if (!a) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const s of e) {
    const a = i.get(s.id);
    (Math.abs(a.x - s.x) > 0.5 || Math.abs(a.y - s.y) > 0.5) && n.set(s.id, a);
  }
  return n;
}
function Hs(e, t = { w: 160, h: 90 }) {
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
function Ei(e, t, i) {
  let n = t.w / 2, s = t.w / 2, a = t.h / 2, d = t.h / 2;
  for (const o of i)
    n = Math.max(n, -o.dx + o.w / 2 + 10), s = Math.max(s, o.dx + o.w / 2 + 10), a = Math.max(a, -o.dy + o.h / 2 + 34), d = Math.max(d, o.dy + o.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (d - a) / 2,
    w: n + s,
    h: a + d
  };
}
function Vt(e) {
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
const Bs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ws = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Gs = {
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
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Ji[e ? t : n] > Ji[s] };
}
function qn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Ge(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Fn = 34, Vn = 14, Ys = 14, $e = 108, ke = 32, Hn = 12, Bn = 10, Ct = 2, js = Ct * $e + (Ct - 1) * Hn + 2 * Vn;
function Ks(e, t) {
  return `rel:${e}->${t}`;
}
function Xs(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function vt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Qs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Wn = {
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
  "proxy-api": "Proxy/cache de una API, alojado en este sistema"
};
function Ai(e) {
  const t = Math.max(1, Math.ceil(e / Ct)), i = t * ke + (t - 1) * Bn;
  return { w: js, h: Fn + i + Ys };
}
function Kt(e, t) {
  const i = e % Ct, n = Math.floor(e / Ct);
  return {
    x: -t.w / 2 + Vn + i * ($e + Hn) + $e / 2,
    y: -t.h / 2 + Fn + n * (ke + Bn) + ke / 2
  };
}
function Zs(e, t, i, n, s, a, d = !1) {
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
    )
  ];
  if (!r.length)
    return [{ ...n, x: i.x, y: i.y, w: it, h: nt }];
  if (d) {
    const l = new Map((e.apis ?? []).map((f) => [f.id, f])), p = (e.apiImplementations ?? []).filter((f) => f.moduleId === t.id && l.has(f.apiId)).map((f) => {
      const m = l.get(f.apiId);
      return {
        id: Ge(f.apiId, f.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((h) => ({
          id: We(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (p.length > 0) {
      const f = r.filter((m) => m.kind !== "api-impl");
      return Gn(i, n, p, f, s, a);
    }
  }
  return _t(i, n, r, s, a);
}
function Gn(e, t, i, n, s, a, d = /* @__PURE__ */ new Set()) {
  const o = a[t.id] ?? Ai(i.length + n.length), r = i.map((h, g) => {
    const v = s[h.id] ?? Kt(g, o), I = d.has(h.id) ? [] : h.ops, x = a[h.id] ?? Ai(I.length), w = I.map((M, D) => s[M.id] ?? Kt(D, x)), A = Ei(
      { x: v.x, y: v.y },
      x,
      w.map((M) => ({ dx: M.x, dy: M.y, w: $e, h: ke }))
    );
    return { a: h, off: v, ops: I, opOffs: w, fit: A };
  }), l = n.map(
    (h, g) => s[h.id] ?? Kt(i.length + g, o)
  ), p = zi(
    [
      ...r.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, g) => ({
        id: h.id,
        x: l[g].x,
        y: l[g].y,
        w: $e,
        h: ke
      }))
    ],
    24
  );
  for (const h of r) {
    const g = p.get(h.a.id);
    g && (h.off = { x: h.off.x + (g.x - h.fit.x), y: h.off.y + (g.y - h.fit.y) }, h.fit = { ...h.fit, x: g.x, y: g.y });
  }
  n.forEach((h, g) => {
    const v = p.get(h.id);
    v && (l[g] = { x: v.x, y: v.y });
  });
  const f = Ei(e, o, [
    ...r.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...l.map((h) => ({ dx: h.x, dy: h.y, w: $e, h: ke }))
  ]), m = [
    { ...t, x: f.x, y: f.y, w: f.w, h: f.h, container: !0 }
  ];
  for (const h of r)
    m.push({
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
    }), h.ops.forEach((g, v) => {
      m.push({
        id: g.id,
        label: g.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[v].x,
        y: e.y + h.off.y + h.opOffs[v].y,
        w: $e,
        h: ke,
        tooltip: `${Si[h.a.opKind]}: ${g.name}`
      });
    });
  return n.forEach((h, g) => {
    const v = Wn[h.kind];
    m.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + l[g].x,
      y: e.y + l[g].y,
      w: $e,
      h: ke,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${Si[h.kind]} ${h.name}`
    });
  }), m;
}
function _t(e, t, i, n, s) {
  const a = s[t.id] ?? Ai(i.length), d = i.map((f, m) => n[f.id] ?? Kt(m, a)), o = zi(
    i.map((f, m) => ({ id: f.id, x: d[m].x, y: d[m].y, w: $e, h: ke })),
    10
  );
  i.forEach((f, m) => {
    const h = o.get(f.id);
    h && (d[m] = { x: h.x, y: h.y });
  });
  const r = Ei(
    e,
    a,
    d.map((f) => ({ dx: f.x, dy: f.y, w: $e, h: ke }))
  ), l = {
    ...t,
    x: r.x,
    y: r.y,
    w: r.w,
    h: r.h,
    container: !0
  }, p = i.map((f, m) => {
    const h = d[m], g = f.policy ? Qs : Wn[f.kind];
    return {
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: $e,
      h: ke,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${f.policy ? "Policy" : Si[f.kind]} ${f.name}`
    };
  });
  return [l, ...p];
}
function Js(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const a = s, d = i !== "contexts", o = i === "operations", r = new Set(e.externalSystems.map((c) => c.id)), l = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), p = new Set(l.map((c) => c.id)), f = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && r.has(c.publishedByExternalSystemId)
  ), m = new Set(f.map((c) => c.id)), h = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !p.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !m.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], g = h.flatMap((c, P) => {
    const V = t[c.ref.id] ?? vt(P, h.length);
    if ("workflow" in c && c.workflow) {
      const K = c.ref;
      return [{
        id: K.id,
        label: K.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${K.name} — workflow${K.triggerEvent ? ` · arranca con ${K.triggerEvent}` : ""}`,
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    if (c.proxy) {
      const K = c.ref, ie = {
        id: K.id,
        label: K.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${K.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && K.targetApiId) {
        const Te = (e.apis ?? []).find((et) => et.id === K.targetApiId), Le = (Te == null ? void 0 : Te.operations) ?? [];
        if (Le.length > 0)
          return _t(
            V,
            ie,
            Le.map((et) => ({
              id: We(et.id, K.id),
              name: et.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ie, x: V.x, y: V.y, w: it, h: nt }];
    }
    if (c.api) {
      const K = c.ref, ie = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (s.has(K.id) ? !d : d) && K.operations.length > 0 ? _t(
        V,
        { ...ie, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (Le) => ({ id: Le.id, name: Le.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ie,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    if (c.external) {
      const K = c.ref, ie = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${K.name} (sistema externo)`
      }, Te = l.filter((ne) => ne.publishedByExternalSystemId === K.id), Le = f.filter((ne) => ne.publishedByExternalSystemId === K.id), et = Le.map(
        (ne) => ({ id: ne.id, name: ne.name, kind: "proxy-api" })
      ), hi = [
        ...(K.useCases ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "mcp-server" })
        )
      ], mi = Te.length > 0 || Le.length > 0, fi = mi || hi.length > 0, { form: qt, collapsed: gi } = en(
        s.has(K.id),
        d ? "full" : mi ? "coarse" : "compact",
        hi.length > 0 || o && mi
      ), Qi = [
        ...et,
        ...qt === "full" ? hi : []
      ], yi = o && qt === "full" ? Le.filter((ne) => {
        const gt = ne.targetApiId ? (e.apis ?? []).find((ce) => ce.id === ne.targetApiId) : void 0;
        return ((gt == null ? void 0 : gt.operations) ?? []).length > 0;
      }) : [];
      if (o && qt === "full" && (Te.length > 0 || yi.length > 0)) {
        const ne = [
          ...Te.map((ce) => ({
            id: ce.id,
            name: ce.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ce.name} — API publicada por ${K.name}`,
            opKind: "api-operation",
            ops: (ce.operations ?? []).map((yt) => ({ id: yt.id, name: yt.name }))
          })),
          ...yi.map((ce) => {
            const yt = (e.apis ?? []).find((Ft) => Ft.id === ce.targetApiId);
            return {
              id: ce.id,
              name: ce.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ce.name} — proxy/cache de ${yt.name}`,
              opKind: "api-op-occurrence",
              ops: (yt.operations ?? []).map((Ft) => ({
                id: We(Ft.id, ce.id),
                name: Ft.name
              }))
            };
          })
        ], gt = new Set(yi.map((ce) => ce.id));
        return Gn(
          V,
          { ...ie, collapsible: !0, collapsed: gi },
          ne,
          Qi.filter((ce) => !gt.has(ce.id)),
          t,
          n,
          a
        );
      }
      const Zi = qt === "compact" ? [] : [
        ...Te.map((ne) => ({ id: ne.id, name: ne.name, kind: "api" })),
        ...Qi
      ];
      return Zi.length > 0 ? _t(
        V,
        { ...ie, collapsible: fi, collapsed: gi },
        Zi,
        t,
        n
      ) : [{
        ...ie,
        collapsible: fi,
        collapsed: fi && gi,
        x: V.x,
        y: V.y,
        w: it,
        h: nt
      }];
    }
    const j = c.ref, J = j.subdomainType ?? "GENERIC", re = {
      id: j.id,
      label: j.name,
      kind: "module",
      symbol: "component",
      fill: Bs[J],
      stroke: "#94a3b8",
      badge: J,
      tooltip: `${j.name} — subdominio ${J}`
    }, xe = qn(e, j.id), mt = (e.aggregates ?? []).some((K) => K.moduleId === j.id) || (j.useCases ?? []).length > 0 || (j.domainEvents ?? []).length > 0 || (j.applicationEvents ?? []).length > 0 || (j.readModels ?? []).length > 0 || (j.domainServices ?? []).length > 0 || (j.queryServices ?? []).length > 0, Ve = mt || xe.length > 0, { form: ft, collapsed: Je } = en(
      s.has(j.id),
      d ? "full" : xe.length > 0 ? "coarse" : "compact",
      mt
    );
    return ft === "full" && Ve ? Zs(
      e,
      j,
      V,
      { ...re, collapsible: !0, collapsed: Je },
      t,
      n,
      o
    ) : ft === "coarse" && xe.length > 0 ? _t(
      V,
      { ...re, collapsible: Ve, collapsed: Je },
      xe,
      t,
      n
    ) : [{
      ...re,
      collapsible: Ve,
      collapsed: Ve && Je,
      x: V.x,
      y: V.y,
      w: it,
      h: nt
    }];
  }), v = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, P) => {
    const V = t[c.id] ?? vt(h.length + P, v);
    g.push({
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
  }), (e.aiAgents ?? []).forEach((c, P) => {
    const V = t[c.id] ?? vt(h.length + (e.actors ?? []).length + P, v);
    g.push({
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
  }), (e.mcpGateways ?? []).forEach((c, P) => {
    const V = t[c.id] ?? vt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + P,
      v
    );
    g.push({
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
  const I = [];
  (e.rags ?? []).forEach((c, P) => {
    const V = t[c.id] ?? vt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + P,
      v
    );
    g.push({
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
    }), (c.contentSources ?? []).forEach((j, J) => {
      const re = `ragcs:${c.id}:${j.uri}`, xe = t[re] ?? { x: V.x + 170, y: V.y - 30 + J * 44 };
      g.push({
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
      }), I.push({
        id: `ragcse:${c.id}:${j.uri}`,
        sourceId: re,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), g.sort((c, P) => (c.parentId ? 1 : 0) - (P.parentId ? 1 : 0));
  const x = e.relations.map((c) => ({
    id: Ks(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Ws[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), w = e.flows.map((c) => {
    var xe, mt, Ve, ft, Je, K;
    const P = Xs(e, c), V = d ? e.modules.find((ie) => ie.id === c.sourceId) : void 0, j = ((xe = V == null ? void 0 : V.domainEvents) == null ? void 0 : xe.find((ie) => ie.name === c.triggerEvent)) ?? ((mt = V == null ? void 0 : V.applicationEvents) == null ? void 0 : mt.find((ie) => ie.name === c.triggerEvent)), J = d && c.readModelName ? (ft = (Ve = e.modules.find((ie) => ie.id === c.targetId)) == null ? void 0 : Ve.readModels) == null ? void 0 : ft.find((ie) => ie.name === c.readModelName) : void 0, re = d && c.targetUseCaseId ? (K = (Je = e.modules.find((ie) => ie.id === c.targetId)) == null ? void 0 : Je.useCases) == null ? void 0 : K.find((ie) => ie.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (j == null ? void 0 : j.id) ?? c.sourceId,
      targetId: (re == null ? void 0 : re.id) ?? (J == null ? void 0 : J.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Gs[P],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${P}`
    };
  }), A = new Map((e.apis ?? []).map((c) => [c.id, c])), M = new Set(e.modules.map((c) => c.id)), D = (e.apiImplementations ?? []).filter(
    (c) => A.has(c.apiId) && M.has(c.moduleId)
  ), y = new Set(g.map((c) => c.id)), k = d ? (e.emissions ?? []).filter((c) => y.has(c.sourceId) && y.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], C = d ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: P }) => P && c.readModelId).filter(({ p: c, source: P }) => y.has(P) && y.has(c.readModelId)).map(({ p: c, source: P }) => ({
    id: `proj:${c.id}`,
    sourceId: P,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], S = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((P) => {
      const V = d && P.targetUseCaseId && y.has(P.targetUseCaseId) ? P.targetUseCaseId : P.targetModuleId && y.has(P.targetModuleId) ? P.targetModuleId : (P.targetUseCaseId && !d, null);
      if (!V) return [];
      const j = d && y.has(P.id) ? P.id : c.id;
      return y.has(j) ? [
        {
          id: `apiwire:${P.id}`,
          sourceId: j,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${P.name} la implementa ${V}`
        }
      ] : [];
    })
  ), z = d ? (e.useCaseCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], O = d ? (e.aggregateCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], N = d ? (e.queryCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], U = d ? (e.actorUses ?? []).filter((c) => y.has(c.actorId) && y.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], u = (e.actorExternalDependencies ?? []).filter((c) => y.has(c.actorId) && y.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), $ = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), b = (c) => y.has(c) ? c : $.get(c) ?? c, E = [
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
  ], T = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const P of c.useCases ?? []) T.set(P.id, c.id);
    for (const P of c.domainEvents ?? []) T.set(P.id, c.id);
    for (const P of c.applicationEvents ?? []) T.set(P.id, c.id);
  }
  const F = (c) => y.has(c) ? c : T.get(c) ?? c, R = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const P of c.domainEvents ?? []) R.set(P.name, P.id);
    for (const P of c.applicationEvents ?? []) R.set(P.name, P.id);
  }
  const q = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((P) => P.targetUseCaseId).map((P) => ({ sourceId: c.id, targetId: F(P.targetUseCaseId) }))
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && R.has(c.triggerEvent)).map((c) => ({
        sourceId: F(R.get(c.triggerEvent)),
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
  ], ee = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const P of c.tables ?? []) ee.set(P.id, c.id);
  const te = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((P) => ({
          sourceId: y.has(P) ? P : ee.get(P) ?? P,
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
  ], he = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((P) => ({
          sourceId: b(P),
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
  ], be = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((P) => ({ sourceId: P, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((P) => ({ sourceId: P, targetId: c.id, name: c.name }))
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
  ], me = [
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
  ], _e = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, ht = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((P) => P.id !== c.id && _e(P) === c.triggerEvent).filter((P) => y.has(P.id) && y.has(c.id)).map((P) => ({
      id: `wfchain:${P.id}->${c.id}`,
      sourceId: P.id,
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
  ], ks = D.flatMap((c) => {
    const P = Ge(c.apiId, c.moduleId);
    if (!y.has(P)) return [];
    const V = [];
    for (const j of (e.proxyApis ?? []).filter((J) => J.targetApiId === c.apiId)) {
      const J = b(j.id);
      y.has(J) && J !== P && V.push({
        id: `pxr:${J}->${P}`,
        sourceId: J,
        targetId: P,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return V;
  }), Es = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const P = (e.proxyApis ?? []).find((J) => J.id === c.proxyId);
    if (!(P != null && P.targetApiId)) return [];
    const V = We(c.operationId, c.proxyId), j = c.targetSiteId === P.targetApiId ? P.targetApiId : Ge(P.targetApiId, c.targetSiteId);
    return !y.has(V) || !y.has(j) ? [] : [{
      id: `oproute:${V}->${j}`,
      sourceId: V,
      targetId: j,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ss = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!y.has(c.externalSystemId)) return null;
        const P = (e.apis ?? []).find(
          (re) => re.operations.some((xe) => xe.id === c.operationId)
        );
        if (!P) return null;
        const V = c.siteId === P.id, j = V ? c.operationId : We(c.operationId, c.siteId);
        let J = y.has(j) ? j : null;
        if (!J)
          if (V || (e.proxyApis ?? []).some((re) => re.id === c.siteId))
            J = b(c.siteId);
          else {
            const re = Ge(P.id, c.siteId);
            J = y.has(re) ? re : c.siteId;
          }
        return !J || !y.has(J) || J === c.externalSystemId ? null : { u: c, target: J };
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
    if (!y.has(c.useCaseId)) return [];
    const P = y.has(We(c.operationId, c.moduleId)) ? We(c.operationId, c.moduleId) : y.has(Ge(c.apiId, c.moduleId)) ? Ge(c.apiId, c.moduleId) : y.has(b(c.moduleId)) ? b(c.moduleId) : null;
    return P ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: P,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Cs = d ? (e.agentUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ms = (e.agentRags ?? []).filter((c) => y.has(c.agentId) && y.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Ps = d ? (e.rags ?? []).filter((c) => y.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((P) => y.has(P)).map((P) => ({
      id: `ragsrc:${c.id}->${P}`,
      sourceId: c.id,
      targetId: P,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Os = d ? (e.agentExternalUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ns = d ? (e.agentMcpUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ts = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((P) => y.has(c.id) && y.has(P)).map((P) => ({
      id: `gwx:${c.id}->${P}`,
      sourceId: c.id,
      targetId: P,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Ls = (e.agentGatewayUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Rs = d ? (e.agentApiOpUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ds = d ? (e.agentQueryUses ?? []).filter((c) => y.has(c.agentId) && y.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Us = (e.agentDelegations ?? []).filter((c) => y.has(c.agentId) && y.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), zs = (e.actorAgentUses ?? []).filter((c) => y.has(c.actorId) && y.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), qs = d ? (e.agentTriggers ?? []).filter((c) => y.has(c.eventId) && y.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Fs = d ? (e.externalCalls ?? []).filter((c) => y.has(c.externalSystemId) && y.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Vs = d ? (e.externalUseCaseCalls ?? []).filter((c) => y.has(c.sourceId) && y.has(c.targetId)).map((c) => ({
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
    nodes: g,
    edges: [
      ...x,
      ...w,
      ...k,
      ...C,
      ...S,
      ...z,
      ...O,
      ...N,
      ...U,
      ...u,
      ...E,
      ...$s,
      ...ks,
      ...Es,
      ...Ss,
      ...As,
      ...q,
      ...X,
      ...ht,
      ...me,
      ...te,
      ...he,
      ...be,
      ...Cs,
      ...Os,
      ...Ns,
      ...Ts,
      ...Ls,
      ...Rs,
      ...Ds,
      ...Us,
      ...zs,
      ...qs,
      ...Ms,
      ...Ps,
      ...I,
      ...Fs,
      ...Vs
    ]
  };
}
const eo = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, to = 176, io = 60, no = 140, so = 40;
function oo(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, a) => {
    const d = 220 + a * 340;
    i.filter((r) => r.moduleId === s.id).forEach((r, l) => {
      const p = n.filter((m) => m.aggregateId === r.id).length, f = 140 + l * (170 + p * 60);
      t[r.id] = { x: d, y: f }, n.filter((m) => m.aggregateId === r.id).forEach((m, h) => {
        t[m.id] = { x: d + 60, y: f + 100 + h * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((a) => a.id === s.moduleId)).forEach((s, a) => {
    t[s.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function ao(e, t) {
  const i = oo(e), n = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), a = (e.aggregates ?? []).map((l) => {
    const p = s.get(l.moduleId), f = (p == null ? void 0 : p.subdomainType) ?? "GENERIC", m = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: m.x,
      y: m.y,
      w: to,
      h: io,
      kind: "aggregate",
      symbol: "aggregate",
      fill: eo[f],
      stroke: "#64748b",
      badge: p ? `${p.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${p ? ` — módulo ${p.name} (${f})` : ""}`
    };
  }), d = (e.entities ?? []).map((l) => {
    const p = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: p.x,
      y: p.y,
      w: no,
      h: so,
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
  })), r = (e.aggregateReferences ?? []).map((l, p) => ({
    id: `aggref:${p}:${l.sourceAggregateId}->${l.targetAggregateId}`,
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
const ro = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, lo = 150, co = 44, po = 190, uo = 56, ho = 160, mo = 48;
function fo(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function go(e, t) {
  const i = e.flows, n = [], s = [], a = /* @__PURE__ */ new Set(), d = (o) => {
    var r, l;
    return ((l = (r = e.aggregates) == null ? void 0 : r.find((p) => p.id === o)) == null ? void 0 : l.name) ?? o ?? "?";
  };
  return i.forEach((o, r) => {
    const l = 120 + r * 130, p = ro[o.archetype] ?? "#475569", f = o.triggerAggregateId ?? o.sourceId;
    if (!a.has(f)) {
      a.add(f);
      const I = t[f] ?? { x: 160, y: l };
      n.push({
        id: f,
        label: o.triggerAggregateId ? d(o.triggerAggregateId) : f,
        x: I.x,
        y: I.y,
        w: lo,
        h: co,
        kind: o.triggerAggregateId ? "aggregate" : "module",
        symbol: o.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: o.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${o.id}`, h = t[m] ?? { x: 470, y: l };
    n.push({
      id: m,
      label: o.name,
      x: h.x,
      y: h.y,
      w: po,
      h: uo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: p,
      badge: o.archetype,
      tooltip: `Flow ${o.name} [${o.archetype}]${o.readModelName ? ` → read model ${o.readModelName}` : ""}${o.targetUseCaseId ? ` → use case ${o.targetUseCaseId}` : ""}`
    });
    const g = fo(e, o), v = `tgt:${g.id}`;
    if (!a.has(v)) {
      a.add(v);
      const I = t[v] ?? { x: 790, y: l };
      n.push({
        id: v,
        label: g.label,
        x: I.x,
        y: I.y,
        w: ho,
        h: mo,
        kind: g.external ? "external-system" : "module",
        symbol: "component",
        fill: g.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: g.external,
        badge: g.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${o.id}:in`,
      sourceId: f,
      targetId: m,
      kind: "flow-trigger",
      label: o.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: o.triggerEvent ? `Evento: ${o.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${o.id}:out`,
      sourceId: m,
      targetId: v,
      kind: "flow-delivery",
      color: p,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const yo = 190, vo = 56, vi = 170, Io = 52;
function tn(e, t) {
  const i = [], n = [], s = (a) => {
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
      w: yo,
      h: vo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${s(a.ownerModuleId) ? ` — módulo ${s(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let l = a.id;
    if (a.steps.forEach((p, f) => {
      const m = p.type === "HUMAN", h = t[p.id] ?? { x: 150 + (f + 1) * 240, y: o };
      if (i.push({
        id: p.id,
        label: p.name,
        x: h.x,
        y: h.y,
        w: vi,
        h: Io,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${p.roleId ? ` · ${p.roleId}` : ""}${p.deadline ? ` · ⏱ ${p.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${p.name}${p.useCaseId ? ` — use case ${p.useCaseId}` : ""}${p.deadline ? ` · deadline ${p.deadline}` : ""}`
      }), n.push({
        id: `pe:${a.id}:${f}`,
        sourceId: l,
        targetId: p.id,
        kind: "process-seq",
        label: f === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), p.compensationUseCaseId) {
        const g = `comp:${p.id}`, v = t[g] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: g,
          label: p.compensationUseCaseId,
          x: v.x,
          y: v.y,
          w: vi,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${p.id}`,
          sourceId: p.id,
          targetId: g,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      l = p.id;
    }), a.onCompletionEventName) {
      const p = `done:${a.id}`, f = t[p] ?? { x: 150 + (a.steps.length + 1) * 240, y: o };
      i.push({
        id: p,
        label: a.onCompletionEventName,
        x: f.x,
        y: f.y,
        w: vi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${a.id}`,
        sourceId: l,
        targetId: p,
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
const Xt = globalThis, qi = Xt.ShadowRoot && (Xt.ShadyCSS === void 0 || Xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fi = Symbol(), nn = /* @__PURE__ */ new WeakMap();
let Yn = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Fi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (qi && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = nn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && nn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xo = (e) => new Yn(typeof e == "string" ? e : e + "", void 0, Fi), pt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, a) => n + ((d) => {
    if (d._$cssResult$ === !0) return d.cssText;
    if (typeof d == "number") return d;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + d + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[a + 1], e[0]);
  return new Yn(i, e, Fi);
}, wo = (e, t) => {
  if (qi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = Xt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, sn = qi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return xo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bo, defineProperty: _o, getOwnPropertyDescriptor: $o, getOwnPropertyNames: ko, getOwnPropertySymbols: Eo, getPrototypeOf: So } = Object, Fe = globalThis, on = Fe.trustedTypes, Ao = on ? on.emptyScript : "", Ii = Fe.reactiveElementPolyfillSupport, Et = (e, t) => e, ti = { toAttribute(e, t) {
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
} }, Vi = (e, t) => !bo(e, t), an = { attribute: !0, type: String, converter: ti, reflect: !1, useDefault: !1, hasChanged: Vi };
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
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && _o(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: a } = $o(this.prototype, t) ?? { get() {
      return this[i];
    }, set(d) {
      this[i] = d;
    } };
    return { get: s, set(d) {
      const o = s == null ? void 0 : s.call(this);
      a == null || a.call(this, d), this.requestUpdate(t, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? an;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Et("elementProperties"))) return;
    const t = So(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Et("properties"))) {
      const i = this.properties, n = [...ko(i), ...Eo(i)];
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
      for (const s of n) i.unshift(sn(s));
    } else t !== void 0 && i.push(sn(t));
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
    return wo(t, this.constructor.elementStyles), t;
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
    var a;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const d = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : ti).toAttribute(i, n.type);
      this._$Em = t, d == null ? this.removeAttribute(s) : this.setAttribute(s, d), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, d;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : ti;
      this._$Em = s;
      const l = r.fromAttribute(i, o.type);
      this[s] = l ?? ((d = this._$Ej) == null ? void 0 : d.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, a) {
    var d;
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (a = this[t]), n ?? (n = o.getPropertyOptions(t)), !((n.hasChanged ?? Vi)(a, i) || n.useDefault && n.reflect && a === ((d = this._$Ej) == null ? void 0 : d.get(t)) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: a }, d) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, d ?? i ?? this[t]), a !== !0 || d !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, d] of this._$Ep) this[a] = d;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [a, d] of s) {
        const { wrapped: o } = d, r = this[a];
        o !== !0 || this._$AL.has(a) || r === void 0 || this.C(a, void 0, d, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((s) => {
        var a;
        return (a = s.hostUpdate) == null ? void 0 : a.call(s);
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
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[Et("elementProperties")] = /* @__PURE__ */ new Map(), st[Et("finalized")] = /* @__PURE__ */ new Map(), Ii == null || Ii({ ReactiveElement: st }), (Fe.reactiveElementVersions ?? (Fe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, rn = (e) => e, ii = St.trustedTypes, dn = ii ? ii.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jn = "$lit$", qe = `lit$${Math.random().toFixed(9).slice(2)}$`, Kn = "?" + qe, Co = `<${Kn}>`, Qe = document, Mt = () => Qe.createComment(""), Pt = (e) => e === null || typeof e != "object" && typeof e != "function", Hi = Array.isArray, Mo = (e) => Hi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", xi = `[ 	
\f\r]`, It = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ln = /-->/g, cn = />/g, He = RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pn = /'/g, un = /"/g, Xn = /^(?:script|style|textarea|title)$/i, Qn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), _ = Qn(1), G = Qn(2), rt = Symbol.for("lit-noChange"), Q = Symbol.for("lit-nothing"), hn = /* @__PURE__ */ new WeakMap(), Ye = Qe.createTreeWalker(Qe, 129);
function Zn(e, t) {
  if (!Hi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dn !== void 0 ? dn.createHTML(t) : t;
}
const Po = (e, t) => {
  const i = e.length - 1, n = [];
  let s, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", d = It;
  for (let o = 0; o < i; o++) {
    const r = e[o];
    let l, p, f = -1, m = 0;
    for (; m < r.length && (d.lastIndex = m, p = d.exec(r), p !== null); ) m = d.lastIndex, d === It ? p[1] === "!--" ? d = ln : p[1] !== void 0 ? d = cn : p[2] !== void 0 ? (Xn.test(p[2]) && (s = RegExp("</" + p[2], "g")), d = He) : p[3] !== void 0 && (d = He) : d === He ? p[0] === ">" ? (d = s ?? It, f = -1) : p[1] === void 0 ? f = -2 : (f = d.lastIndex - p[2].length, l = p[1], d = p[3] === void 0 ? He : p[3] === '"' ? un : pn) : d === un || d === pn ? d = He : d === ln || d === cn ? d = It : (d = He, s = void 0);
    const h = d === He && e[o + 1].startsWith("/>") ? " " : "";
    a += d === It ? r + Co : f >= 0 ? (n.push(l), r.slice(0, f) + jn + r.slice(f) + qe + h) : r + qe + (f === -2 ? o : h);
  }
  return [Zn(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ot {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let a = 0, d = 0;
    const o = t.length - 1, r = this.parts, [l, p] = Po(t, i);
    if (this.el = Ot.createElement(l, n), Ye.currentNode = this.el.content, i === 2 || i === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (s = Ye.nextNode()) !== null && r.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const f of s.getAttributeNames()) if (f.endsWith(jn)) {
          const m = p[d++], h = s.getAttribute(f).split(qe), g = /([.?@])?(.*)/.exec(m);
          r.push({ type: 1, index: a, name: g[2], strings: h, ctor: g[1] === "." ? No : g[1] === "?" ? To : g[1] === "@" ? Lo : li }), s.removeAttribute(f);
        } else f.startsWith(qe) && (r.push({ type: 6, index: a }), s.removeAttribute(f));
        if (Xn.test(s.tagName)) {
          const f = s.textContent.split(qe), m = f.length - 1;
          if (m > 0) {
            s.textContent = ii ? ii.emptyScript : "";
            for (let h = 0; h < m; h++) s.append(f[h], Mt()), Ye.nextNode(), r.push({ type: 2, index: ++a });
            s.append(f[m], Mt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Kn) r.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = s.data.indexOf(qe, f + 1)) !== -1; ) r.push({ type: 7, index: a }), f += qe.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const n = Qe.createElement("template");
    return n.innerHTML = t, n;
  }
}
function dt(e, t, i = e, n) {
  var d, o;
  if (t === rt) return t;
  let s = n !== void 0 ? (d = i._$Co) == null ? void 0 : d[n] : i._$Cl;
  const a = Pt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), a === void 0 ? s = void 0 : (s = new a(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = dt(e, s._$AS(e, t.values), s, n)), t;
}
class Oo {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Qe).importNode(i, !0);
    Ye.currentNode = s;
    let a = Ye.nextNode(), d = 0, o = 0, r = n[0];
    for (; r !== void 0; ) {
      if (d === r.index) {
        let l;
        r.type === 2 ? l = new Dt(a, a.nextSibling, this, t) : r.type === 1 ? l = new r.ctor(a, r.name, r.strings, this, t) : r.type === 6 && (l = new Ro(a, this, t)), this._$AV.push(l), r = n[++o];
      }
      d !== (r == null ? void 0 : r.index) && (a = Ye.nextNode(), d++);
    }
    return Ye.currentNode = Qe, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Dt {
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
    t = dt(this, t, i), Pt(t) ? t === Q || t == null || t === "" ? (this._$AH !== Q && this._$AR(), this._$AH = Q) : t !== this._$AH && t !== rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mo(t) ? this.k(t) : this._(t);
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
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ot.createElement(Zn(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(i);
    else {
      const d = new Oo(s, this), o = d.u(this.options);
      d.p(i), this.T(o), this._$AH = d;
    }
  }
  _$AC(t) {
    let i = hn.get(t.strings);
    return i === void 0 && hn.set(t.strings, i = new Ot(t)), i;
  }
  k(t) {
    Hi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const a of t) s === i.length ? i.push(n = new Dt(this.O(Mt()), this.O(Mt()), this, this.options)) : n = i[s], n._$AI(a), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = rn(t).nextSibling;
      rn(t).remove(), t = s;
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
  constructor(t, i, n, s, a) {
    this.type = 1, this._$AH = Q, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Q;
  }
  _$AI(t, i = this, n, s) {
    const a = this.strings;
    let d = !1;
    if (a === void 0) t = dt(this, t, i, 0), d = !Pt(t) || t !== this._$AH && t !== rt, d && (this._$AH = t);
    else {
      const o = t;
      let r, l;
      for (t = a[0], r = 0; r < a.length - 1; r++) l = dt(this, o[n + r], i, r), l === rt && (l = this._$AH[r]), d || (d = !Pt(l) || l !== this._$AH[r]), l === Q ? t = Q : t !== Q && (t += (l ?? "") + a[r + 1]), this._$AH[r] = l;
    }
    d && !s && this.j(t);
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
class To extends li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Q);
  }
}
class Lo extends li {
  constructor(t, i, n, s, a) {
    super(t, i, n, s, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = dt(this, t, i, 0) ?? Q) === rt) return;
    const n = this._$AH, s = t === Q && n !== Q || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== Q && (n === Q || s);
    s && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ro {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
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
const Do = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Dt(t.insertBefore(Mt(), a), a, void 0, i ?? {});
  }
  return s._$AI(e), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Do(i, this.renderRoot, this.renderOptions);
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
const Uo = { attribute: !0, type: String, converter: ti, reflect: !1, hasChanged: Vi }, zo = (e = Uo, t, i) => {
  const { kind: n, metadata: s } = i;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), n === "accessor") {
    const { name: d } = i;
    return { set(o) {
      const r = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(d, r, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(d, void 0, e, o), o;
    } };
  }
  if (n === "setter") {
    const { name: d } = i;
    return function(o) {
      const r = this[d];
      t.call(this, o), this.requestUpdate(d, r, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Z(e) {
  return (t, i) => typeof i == "object" ? zo(e, t, i) : ((n, s, a) => {
    const d = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, n), d ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function L(e) {
  return Z({ ...e, state: !0, attribute: !1 });
}
var Ci = "http://www.w3.org/1999/xhtml";
const mn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ci,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ci(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), mn.hasOwnProperty(t) ? { space: mn[t], local: e } : e;
}
function qo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ci && t.documentElement.namespaceURI === Ci ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Fo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Jn(e) {
  var t = ci(e);
  return (t.local ? Fo : qo)(t);
}
function Vo() {
}
function Bi(e) {
  return e == null ? Vo : function() {
    return this.querySelector(e);
  };
}
function Ho(e) {
  typeof e != "function" && (e = Bi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var a = t[s], d = a.length, o = n[s] = new Array(d), r, l, p = 0; p < d; ++p)
      (r = a[p]) && (l = e.call(r, r.__data__, p, a)) && ("__data__" in r && (l.__data__ = r.__data__), o[p] = l);
  return new ge(n, this._parents);
}
function Bo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Wo() {
  return [];
}
function es(e) {
  return e == null ? Wo : function() {
    return this.querySelectorAll(e);
  };
}
function Go(e) {
  return function() {
    return Bo(e.apply(this, arguments));
  };
}
function Yo(e) {
  typeof e == "function" ? e = Go(e) : e = es(e);
  for (var t = this._groups, i = t.length, n = [], s = [], a = 0; a < i; ++a)
    for (var d = t[a], o = d.length, r, l = 0; l < o; ++l)
      (r = d[l]) && (n.push(e.call(r, r.__data__, l, d)), s.push(r));
  return new ge(n, s);
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
var jo = Array.prototype.find;
function Ko(e) {
  return function() {
    return jo.call(this.children, e);
  };
}
function Xo() {
  return this.firstElementChild;
}
function Qo(e) {
  return this.select(e == null ? Xo : Ko(typeof e == "function" ? e : is(e)));
}
var Zo = Array.prototype.filter;
function Jo() {
  return Array.from(this.children);
}
function ea(e) {
  return function() {
    return Zo.call(this.children, e);
  };
}
function ta(e) {
  return this.selectAll(e == null ? Jo : ea(typeof e == "function" ? e : is(e)));
}
function ia(e) {
  typeof e != "function" && (e = ts(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var a = t[s], d = a.length, o = n[s] = [], r, l = 0; l < d; ++l)
      (r = a[l]) && e.call(r, r.__data__, l, a) && o.push(r);
  return new ge(n, this._parents);
}
function ns(e) {
  return new Array(e.length);
}
function na() {
  return new ge(this._enter || this._groups.map(ns), this._parents);
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
function sa(e) {
  return function() {
    return e;
  };
}
function oa(e, t, i, n, s, a) {
  for (var d = 0, o, r = t.length, l = a.length; d < l; ++d)
    (o = t[d]) ? (o.__data__ = a[d], n[d] = o) : i[d] = new ni(e, a[d]);
  for (; d < r; ++d)
    (o = t[d]) && (s[d] = o);
}
function aa(e, t, i, n, s, a, d) {
  var o, r, l = /* @__PURE__ */ new Map(), p = t.length, f = a.length, m = new Array(p), h;
  for (o = 0; o < p; ++o)
    (r = t[o]) && (m[o] = h = d.call(r, r.__data__, o, t) + "", l.has(h) ? s[o] = r : l.set(h, r));
  for (o = 0; o < f; ++o)
    h = d.call(e, a[o], o, a) + "", (r = l.get(h)) ? (n[o] = r, r.__data__ = a[o], l.delete(h)) : i[o] = new ni(e, a[o]);
  for (o = 0; o < p; ++o)
    (r = t[o]) && l.get(m[o]) === r && (s[o] = r);
}
function ra(e) {
  return e.__data__;
}
function da(e, t) {
  if (!arguments.length) return Array.from(this, ra);
  var i = t ? aa : oa, n = this._parents, s = this._groups;
  typeof e != "function" && (e = sa(e));
  for (var a = s.length, d = new Array(a), o = new Array(a), r = new Array(a), l = 0; l < a; ++l) {
    var p = n[l], f = s[l], m = f.length, h = la(e.call(p, p && p.__data__, l, n)), g = h.length, v = o[l] = new Array(g), I = d[l] = new Array(g), x = r[l] = new Array(m);
    i(p, f, v, I, x, h, t);
    for (var w = 0, A = 0, M, D; w < g; ++w)
      if (M = v[w]) {
        for (w >= A && (A = w + 1); !(D = I[A]) && ++A < g; ) ;
        M._next = D || null;
      }
  }
  return d = new ge(d, n), d._enter = o, d._exit = r, d;
}
function la(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ca() {
  return new ge(this._exit || this._groups.map(ns), this._parents);
}
function pa(e, t, i) {
  var n = this.enter(), s = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? a.remove() : i(a), n && s ? n.merge(s).order() : s;
}
function ua(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, a = n.length, d = Math.min(s, a), o = new Array(s), r = 0; r < d; ++r)
    for (var l = i[r], p = n[r], f = l.length, m = o[r] = new Array(f), h, g = 0; g < f; ++g)
      (h = l[g] || p[g]) && (m[g] = h);
  for (; r < s; ++r)
    o[r] = i[r];
  return new ge(o, this._parents);
}
function ha() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, a = n[s], d; --s >= 0; )
      (d = n[s]) && (a && d.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(d, a), a = d);
  return this;
}
function ma(e) {
  e || (e = fa);
  function t(f, m) {
    return f && m ? e(f.__data__, m.__data__) : !f - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), a = 0; a < n; ++a) {
    for (var d = i[a], o = d.length, r = s[a] = new Array(o), l, p = 0; p < o; ++p)
      (l = d[p]) && (r[p] = l);
    r.sort(t);
  }
  return new ge(s, this._parents).order();
}
function fa(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ga() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function ya() {
  return Array.from(this);
}
function va() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, a = n.length; s < a; ++s) {
      var d = n[s];
      if (d) return d;
    }
  return null;
}
function Ia() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function xa() {
  return !this.node();
}
function wa(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], a = 0, d = s.length, o; a < d; ++a)
      (o = s[a]) && e.call(o, o.__data__, a, s);
  return this;
}
function ba(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function _a(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function $a(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ka(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ea(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Sa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Aa(e, t) {
  var i = ci(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? _a : ba : typeof t == "function" ? i.local ? Sa : Ea : i.local ? ka : $a)(i, t));
}
function ss(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ca(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ma(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Pa(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Oa(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ca : typeof t == "function" ? Pa : Ma)(e, t, i ?? "")) : lt(this.node(), e);
}
function lt(e, t) {
  return e.style.getPropertyValue(t) || ss(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Na(e) {
  return function() {
    delete this[e];
  };
}
function Ta(e, t) {
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
function Ra(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Na : typeof t == "function" ? La : Ta)(e, t)) : this.node()[e];
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
  for (var i = Wi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function ds(e, t) {
  for (var i = Wi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Da(e) {
  return function() {
    rs(this, e);
  };
}
function Ua(e) {
  return function() {
    ds(this, e);
  };
}
function za(e, t) {
  return function() {
    (t.apply(this, arguments) ? rs : ds)(this, e);
  };
}
function qa(e, t) {
  var i = os(e + "");
  if (arguments.length < 2) {
    for (var n = Wi(this.node()), s = -1, a = i.length; ++s < a; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? za : t ? Da : Ua)(i, t));
}
function Fa() {
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
function Ba(e) {
  return arguments.length ? this.each(e == null ? Fa : (typeof e == "function" ? Ha : Va)(e)) : this.node().textContent;
}
function Wa() {
  this.innerHTML = "";
}
function Ga(e) {
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
function ja(e) {
  return arguments.length ? this.each(e == null ? Wa : (typeof e == "function" ? Ya : Ga)(e)) : this.node().innerHTML;
}
function Ka() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Xa() {
  return this.each(Ka);
}
function Qa() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Za() {
  return this.each(Qa);
}
function Ja(e) {
  var t = typeof e == "function" ? e : Jn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function er() {
  return null;
}
function tr(e, t) {
  var i = typeof e == "function" ? e : Jn(e), n = t == null ? er : typeof t == "function" ? t : Bi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function ir() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function nr() {
  return this.each(ir);
}
function sr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function or() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ar(e) {
  return this.select(e ? or : sr);
}
function rr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function dr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function lr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function cr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, a; i < s; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++n] = a;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function pr(e, t, i) {
  return function() {
    var n = this.__on, s, a = dr(t);
    if (n) {
      for (var d = 0, o = n.length; d < o; ++d)
        if ((s = n[d]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = a, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), s = { type: e.type, name: e.name, value: t, listener: a, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function ur(e, t, i) {
  var n = lr(e + ""), s, a = n.length, d;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var r = 0, l = o.length, p; r < l; ++r)
        for (s = 0, p = o[r]; s < a; ++s)
          if ((d = n[s]).type === p.type && d.name === p.name)
            return p.value;
    }
    return;
  }
  for (o = t ? pr : cr, s = 0; s < a; ++s) this.each(o(n[s], t, i));
  return this;
}
function ls(e, t, i) {
  var n = ss(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function hr(e, t) {
  return function() {
    return ls(this, e, t);
  };
}
function mr(e, t) {
  return function() {
    return ls(this, e, t.apply(this, arguments));
  };
}
function fr(e, t) {
  return this.each((typeof t == "function" ? mr : hr)(e, t));
}
function* gr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, a = n.length, d; s < a; ++s)
      (d = n[s]) && (yield d);
}
var cs = [null];
function ge(e, t) {
  this._groups = e, this._parents = t;
}
function Ut() {
  return new ge([[document.documentElement]], cs);
}
function yr() {
  return this;
}
ge.prototype = Ut.prototype = {
  constructor: ge,
  select: Ho,
  selectAll: Yo,
  selectChild: Qo,
  selectChildren: ta,
  filter: ia,
  data: da,
  enter: na,
  exit: ca,
  join: pa,
  merge: ua,
  selection: yr,
  order: ha,
  sort: ma,
  call: ga,
  nodes: ya,
  node: va,
  size: Ia,
  empty: xa,
  each: wa,
  attr: Aa,
  style: Oa,
  property: Ra,
  classed: qa,
  text: Ba,
  html: ja,
  raise: Xa,
  lower: Za,
  append: Ja,
  insert: tr,
  remove: nr,
  clone: ar,
  datum: rr,
  on: ur,
  dispatch: fr,
  [Symbol.iterator]: gr
};
function Ee(e) {
  return typeof e == "string" ? new ge([[document.querySelector(e)]], [document.documentElement]) : new ge([[e]], cs);
}
function vr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Be(e, t) {
  if (e = vr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Ir = { value: () => {
} };
function Gi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Qt(i);
}
function Qt(e) {
  this._ = e;
}
function xr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Qt.prototype = Gi.prototype = {
  constructor: Qt,
  on: function(e, t) {
    var i = this._, n = xr(e + "", i), s, a = -1, d = n.length;
    if (arguments.length < 2) {
      for (; ++a < d; ) if ((s = (e = n[a]).type) && (s = wr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < d; )
      if (s = (e = n[a]).type) i[s] = fn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = fn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Qt(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, a; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], n = 0, s = a.length; n < s; ++n) a[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], s = 0, a = n.length; s < a; ++s) n[s].value.apply(t, i);
  }
};
function wr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function fn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = Ir, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Mi = { capture: !0, passive: !1 };
function Pi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function br(e) {
  var t = e.document.documentElement, i = Ee(e).on("dragstart.drag", Pi, Mi);
  "onselectstart" in t ? i.on("selectstart.drag", Pi, Mi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function _r(e, t) {
  var i = e.document.documentElement, n = Ee(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Pi, Mi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Yi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ps(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function zt() {
}
var Nt = 0.7, si = 1 / Nt, at = "\\s*([+-]?\\d+)\\s*", Tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $r = /^#([0-9a-f]{3,8})$/, kr = new RegExp(`^rgb\\(${at},${at},${at}\\)$`), Er = new RegExp(`^rgb\\(${Oe},${Oe},${Oe}\\)$`), Sr = new RegExp(`^rgba\\(${at},${at},${at},${Tt}\\)$`), Ar = new RegExp(`^rgba\\(${Oe},${Oe},${Oe},${Tt}\\)$`), Cr = new RegExp(`^hsl\\(${Tt},${Oe},${Oe}\\)$`), Mr = new RegExp(`^hsla\\(${Tt},${Oe},${Oe},${Tt}\\)$`), gn = {
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
Yi(zt, Lt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: yn,
  // Deprecated! Use color.formatHex.
  formatHex: yn,
  formatHex8: Pr,
  formatHsl: Or,
  formatRgb: vn,
  toString: vn
});
function yn() {
  return this.rgb().formatHex();
}
function Pr() {
  return this.rgb().formatHex8();
}
function Or() {
  return us(this).formatHsl();
}
function vn() {
  return this.rgb().formatRgb();
}
function Lt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = $r.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? In(t) : i === 3 ? new ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ht(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ht(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = kr.exec(e)) ? new ue(t[1], t[2], t[3], 1) : (t = Er.exec(e)) ? new ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Sr.exec(e)) ? Ht(t[1], t[2], t[3], t[4]) : (t = Ar.exec(e)) ? Ht(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Cr.exec(e)) ? bn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Mr.exec(e)) ? bn(t[1], t[2] / 100, t[3] / 100, t[4]) : gn.hasOwnProperty(e) ? In(gn[e]) : e === "transparent" ? new ue(NaN, NaN, NaN, 0) : null;
}
function In(e) {
  return new ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ht(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ue(e, t, i, n);
}
function Nr(e) {
  return e instanceof zt || (e = Lt(e)), e ? (e = e.rgb(), new ue(e.r, e.g, e.b, e.opacity)) : new ue();
}
function Oi(e, t, i, n) {
  return arguments.length === 1 ? Nr(e) : new ue(e, t, i, n ?? 1);
}
function ue(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Yi(ue, Oi, ps(zt, {
  brighter(e) {
    return e = e == null ? si : Math.pow(si, e), new ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ue(Xe(this.r), Xe(this.g), Xe(this.b), oi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: xn,
  // Deprecated! Use color.formatHex.
  formatHex: xn,
  formatHex8: Tr,
  formatRgb: wn,
  toString: wn
}));
function xn() {
  return `#${je(this.r)}${je(this.g)}${je(this.b)}`;
}
function Tr() {
  return `#${je(this.r)}${je(this.g)}${je(this.b)}${je((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
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
function je(e) {
  return e = Xe(e), (e < 16 ? "0" : "") + e.toString(16);
}
function bn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Se(e, t, i, n);
}
function us(e) {
  if (e instanceof Se) return new Se(e.h, e.s, e.l, e.opacity);
  if (e instanceof zt || (e = Lt(e)), !e) return new Se();
  if (e instanceof Se) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), a = Math.max(t, i, n), d = NaN, o = a - s, r = (a + s) / 2;
  return o ? (t === a ? d = (i - n) / o + (i < n) * 6 : i === a ? d = (n - t) / o + 2 : d = (t - i) / o + 4, o /= r < 0.5 ? a + s : 2 - a - s, d *= 60) : o = r > 0 && r < 1 ? 0 : d, new Se(d, o, r, e.opacity);
}
function Lr(e, t, i, n) {
  return arguments.length === 1 ? us(e) : new Se(e, t, i, n ?? 1);
}
function Se(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Yi(Se, Lr, ps(zt, {
  brighter(e) {
    return e = e == null ? si : Math.pow(si, e), new Se(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Nt : Math.pow(Nt, e), new Se(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ue(
      _i(e >= 240 ? e - 240 : e + 120, s, n),
      _i(e, s, n),
      _i(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new Se(_n(this.h), Bt(this.s), Bt(this.l), oi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = oi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${Bt(this.s) * 100}%, ${Bt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function _n(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Bt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function _i(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const hs = (e) => () => e;
function Rr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Dr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Ur(e) {
  return (e = +e) == 1 ? ms : function(t, i) {
    return i - t ? Dr(t, i, e) : hs(isNaN(t) ? i : t);
  };
}
function ms(e, t) {
  var i = t - e;
  return i ? Rr(e, i) : hs(isNaN(e) ? t : e);
}
const $n = (function e(t) {
  var i = Ur(t);
  function n(s, a) {
    var d = i((s = Oi(s)).r, (a = Oi(a)).r), o = i(s.g, a.g), r = i(s.b, a.b), l = ms(s.opacity, a.opacity);
    return function(p) {
      return s.r = d(p), s.g = o(p), s.b = r(p), s.opacity = l(p), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function ze(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ni = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, $i = new RegExp(Ni.source, "g");
function zr(e) {
  return function() {
    return e;
  };
}
function qr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Fr(e, t) {
  var i = Ni.lastIndex = $i.lastIndex = 0, n, s, a, d = -1, o = [], r = [];
  for (e = e + "", t = t + ""; (n = Ni.exec(e)) && (s = $i.exec(t)); )
    (a = s.index) > i && (a = t.slice(i, a), o[d] ? o[d] += a : o[++d] = a), (n = n[0]) === (s = s[0]) ? o[d] ? o[d] += s : o[++d] = s : (o[++d] = null, r.push({ i: d, x: ze(n, s) })), i = $i.lastIndex;
  return i < t.length && (a = t.slice(i), o[d] ? o[d] += a : o[++d] = a), o.length < 2 ? r[0] ? qr(r[0].x) : zr(t) : (t = r.length, function(l) {
    for (var p = 0, f; p < t; ++p) o[(f = r[p]).i] = f.x(l);
    return o.join("");
  });
}
var kn = 180 / Math.PI, Ti = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function fs(e, t, i, n, s, a) {
  var d, o, r;
  return (d = Math.sqrt(e * e + t * t)) && (e /= d, t /= d), (r = e * i + t * n) && (i -= e * r, n -= t * r), (o = Math.sqrt(i * i + n * n)) && (i /= o, n /= o, r /= o), e * n < t * i && (e = -e, t = -t, r = -r, d = -d), {
    translateX: s,
    translateY: a,
    rotate: Math.atan2(t, e) * kn,
    skewX: Math.atan(r) * kn,
    scaleX: d,
    scaleY: o
  };
}
var Wt;
function Vr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ti : fs(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Hr(e) {
  return e == null || (Wt || (Wt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wt.setAttribute("transform", e), !(e = Wt.transform.baseVal.consolidate())) ? Ti : (e = e.matrix, fs(e.a, e.b, e.c, e.d, e.e, e.f));
}
function gs(e, t, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, p, f, m, h, g) {
    if (l !== f || p !== m) {
      var v = h.push("translate(", null, t, null, i);
      g.push({ i: v - 4, x: ze(l, f) }, { i: v - 2, x: ze(p, m) });
    } else (f || m) && h.push("translate(" + f + t + m + i);
  }
  function d(l, p, f, m) {
    l !== p ? (l - p > 180 ? p += 360 : p - l > 180 && (l += 360), m.push({ i: f.push(s(f) + "rotate(", null, n) - 2, x: ze(l, p) })) : p && f.push(s(f) + "rotate(" + p + n);
  }
  function o(l, p, f, m) {
    l !== p ? m.push({ i: f.push(s(f) + "skewX(", null, n) - 2, x: ze(l, p) }) : p && f.push(s(f) + "skewX(" + p + n);
  }
  function r(l, p, f, m, h, g) {
    if (l !== f || p !== m) {
      var v = h.push(s(h) + "scale(", null, ",", null, ")");
      g.push({ i: v - 4, x: ze(l, f) }, { i: v - 2, x: ze(p, m) });
    } else (f !== 1 || m !== 1) && h.push(s(h) + "scale(" + f + "," + m + ")");
  }
  return function(l, p) {
    var f = [], m = [];
    return l = e(l), p = e(p), a(l.translateX, l.translateY, p.translateX, p.translateY, f, m), d(l.rotate, p.rotate, f, m), o(l.skewX, p.skewX, f, m), r(l.scaleX, l.scaleY, p.scaleX, p.scaleY, f, m), l = p = null, function(h) {
      for (var g = -1, v = m.length, I; ++g < v; ) f[(I = m[g]).i] = I.x(h);
      return f.join("");
    };
  };
}
var Br = gs(Vr, "px, ", "px)", "deg)"), Wr = gs(Hr, ", ", ")", ")"), Gr = 1e-12;
function En(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Yr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function jr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Kr = (function e(t, i, n) {
  function s(a, d) {
    var o = a[0], r = a[1], l = a[2], p = d[0], f = d[1], m = d[2], h = p - o, g = f - r, v = h * h + g * g, I, x;
    if (v < Gr)
      x = Math.log(m / l) / t, I = function(k) {
        return [
          o + k * h,
          r + k * g,
          l * Math.exp(t * k * x)
        ];
      };
    else {
      var w = Math.sqrt(v), A = (m * m - l * l + n * v) / (2 * l * i * w), M = (m * m - l * l - n * v) / (2 * m * i * w), D = Math.log(Math.sqrt(A * A + 1) - A), y = Math.log(Math.sqrt(M * M + 1) - M);
      x = (y - D) / t, I = function(k) {
        var C = k * x, S = En(D), z = l / (i * w) * (S * jr(t * C + D) - Yr(D));
        return [
          o + z * h,
          r + z * g,
          l * S / En(t * C + D)
        ];
      };
    }
    return I.duration = x * 1e3 * t / Math.SQRT2, I;
  }
  return s.rho = function(a) {
    var d = Math.max(1e-3, +a), o = d * d, r = o * o;
    return e(d, o, r);
  }, s;
})(Math.SQRT2, 2, 4);
var ct = 0, $t = 0, xt = 0, ys = 1e3, ai, kt, ri = 0, Ze = 0, pi = 0, Rt = typeof performance == "object" && performance.now ? performance : Date, vs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ji() {
  return Ze || (vs(Xr), Ze = Rt.now() + pi);
}
function Xr() {
  Ze = 0;
}
function di() {
  this._call = this._time = this._next = null;
}
di.prototype = Is.prototype = {
  constructor: di,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ji() : +i) + (t == null ? 0 : +t), !this._next && kt !== this && (kt ? kt._next = this : ai = this, kt = this), this._call = e, this._time = i, Li();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Li());
  }
};
function Is(e, t, i) {
  var n = new di();
  return n.restart(e, t, i), n;
}
function Qr() {
  ji(), ++ct;
  for (var e = ai, t; e; )
    (t = Ze - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ct;
}
function Sn() {
  Ze = (ri = Rt.now()) + pi, ct = $t = 0;
  try {
    Qr();
  } finally {
    ct = 0, Jr(), Ze = 0;
  }
}
function Zr() {
  var e = Rt.now(), t = e - ri;
  t > ys && (pi -= t, ri = e);
}
function Jr() {
  for (var e, t = ai, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : ai = i);
  kt = e, Li(n);
}
function Li(e) {
  if (!ct) {
    $t && ($t = clearTimeout($t));
    var t = e - Ze;
    t > 24 ? (e < 1 / 0 && ($t = setTimeout(Sn, e - Rt.now() - pi)), xt && (xt = clearInterval(xt))) : (xt || (ri = Rt.now(), xt = setInterval(Zr, ys)), ct = 1, vs(Sn));
  }
}
function An(e, t, i) {
  var n = new di();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var ed = Gi("start", "end", "cancel", "interrupt"), td = [], xs = 0, Cn = 1, Ri = 2, Zt = 3, Mn = 4, Di = 5, Jt = 6;
function ui(e, t, i, n, s, a) {
  var d = e.__transition;
  if (!d) e.__transition = {};
  else if (i in d) return;
  id(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: ed,
    tween: td,
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
function Ne(e, t) {
  var i = Ae(e, t);
  if (i.state > Zt) throw new Error("too late; already running");
  return i;
}
function Ae(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function id(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = Is(a, 0, i.time);
  function a(l) {
    i.state = Cn, i.timer.restart(d, i.delay, i.time), i.delay <= l && d(l - i.delay);
  }
  function d(l) {
    var p, f, m, h;
    if (i.state !== Cn) return r();
    for (p in n)
      if (h = n[p], h.name === i.name) {
        if (h.state === Zt) return An(d);
        h.state === Mn ? (h.state = Jt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[p]) : +p < t && (h.state = Jt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[p]);
      }
    if (An(function() {
      i.state === Zt && (i.state = Mn, i.timer.restart(o, i.delay, i.time), o(l));
    }), i.state = Ri, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Ri) {
      for (i.state = Zt, s = new Array(m = i.tween.length), p = 0, f = -1; p < m; ++p)
        (h = i.tween[p].value.call(e, e.__data__, i.index, i.group)) && (s[++f] = h);
      s.length = f + 1;
    }
  }
  function o(l) {
    for (var p = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(r), i.state = Di, 1), f = -1, m = s.length; ++f < m; )
      s[f].call(e, p);
    i.state === Di && (i.on.call("end", e, e.__data__, i.index, i.group), r());
  }
  function r() {
    i.state = Jt, i.timer.stop(), delete n[t];
    for (var l in n) return;
    delete e.__transition;
  }
}
function ei(e, t) {
  var i = e.__transition, n, s, a = !0, d;
  if (i) {
    t = t == null ? null : t + "";
    for (d in i) {
      if ((n = i[d]).name !== t) {
        a = !1;
        continue;
      }
      s = n.state > Ri && n.state < Di, n.state = Jt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[d];
    }
    a && delete e.__transition;
  }
}
function nd(e) {
  return this.each(function() {
    ei(this, e);
  });
}
function sd(e, t) {
  var i, n;
  return function() {
    var s = Ne(this, e), a = s.tween;
    if (a !== i) {
      n = i = a;
      for (var d = 0, o = n.length; d < o; ++d)
        if (n[d].name === t) {
          n = n.slice(), n.splice(d, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function od(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = Ne(this, e), d = a.tween;
    if (d !== n) {
      s = (n = d).slice();
      for (var o = { name: t, value: i }, r = 0, l = s.length; r < l; ++r)
        if (s[r].name === t) {
          s[r] = o;
          break;
        }
      r === l && s.push(o);
    }
    a.tween = s;
  };
}
function ad(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ae(this.node(), i).tween, s = 0, a = n.length, d; s < a; ++s)
      if ((d = n[s]).name === e)
        return d.value;
    return null;
  }
  return this.each((t == null ? sd : od)(i, e, t));
}
function Xi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Ne(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return Ae(s, n).value[t];
  };
}
function ws(e, t) {
  var i;
  return (typeof t == "number" ? ze : t instanceof Lt ? $n : (i = Lt(t)) ? (t = i, $n) : Fr)(e, t);
}
function rd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function dd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ld(e, t, i) {
  var n, s = i + "", a;
  return function() {
    var d = this.getAttribute(e);
    return d === s ? null : d === n ? a : a = t(n = d, i);
  };
}
function cd(e, t, i) {
  var n, s = i + "", a;
  return function() {
    var d = this.getAttributeNS(e.space, e.local);
    return d === s ? null : d === n ? a : a = t(n = d, i);
  };
}
function pd(e, t, i) {
  var n, s, a;
  return function() {
    var d, o = i(this), r;
    return o == null ? void this.removeAttribute(e) : (d = this.getAttribute(e), r = o + "", d === r ? null : d === n && r === s ? a : (s = r, a = t(n = d, o)));
  };
}
function ud(e, t, i) {
  var n, s, a;
  return function() {
    var d, o = i(this), r;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (d = this.getAttributeNS(e.space, e.local), r = o + "", d === r ? null : d === n && r === s ? a : (s = r, a = t(n = d, o)));
  };
}
function hd(e, t) {
  var i = ci(e), n = i === "transform" ? Wr : ws;
  return this.attrTween(e, typeof t == "function" ? (i.local ? ud : pd)(i, n, Xi(this, "attr." + e, t)) : t == null ? (i.local ? dd : rd)(i) : (i.local ? cd : ld)(i, n, t));
}
function md(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function fd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function gd(e, t) {
  var i, n;
  function s() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && fd(e, a)), i;
  }
  return s._value = t, s;
}
function yd(e, t) {
  var i, n;
  function s() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && md(e, a)), i;
  }
  return s._value = t, s;
}
function vd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = ci(e);
  return this.tween(i, (n.local ? gd : yd)(n, t));
}
function Id(e, t) {
  return function() {
    Ki(this, e).delay = +t.apply(this, arguments);
  };
}
function xd(e, t) {
  return t = +t, function() {
    Ki(this, e).delay = t;
  };
}
function wd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Id : xd)(t, e)) : Ae(this.node(), t).delay;
}
function bd(e, t) {
  return function() {
    Ne(this, e).duration = +t.apply(this, arguments);
  };
}
function _d(e, t) {
  return t = +t, function() {
    Ne(this, e).duration = t;
  };
}
function $d(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? bd : _d)(t, e)) : Ae(this.node(), t).duration;
}
function kd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ne(this, e).ease = t;
  };
}
function Ed(e) {
  var t = this._id;
  return arguments.length ? this.each(kd(t, e)) : Ae(this.node(), t).ease;
}
function Sd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ne(this, e).ease = i;
  };
}
function Ad(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Sd(this._id, e));
}
function Cd(e) {
  typeof e != "function" && (e = ts(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var a = t[s], d = a.length, o = n[s] = [], r, l = 0; l < d; ++l)
      (r = a[l]) && e.call(r, r.__data__, l, a) && o.push(r);
  return new Ue(n, this._parents, this._name, this._id);
}
function Md(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, a = Math.min(n, s), d = new Array(n), o = 0; o < a; ++o)
    for (var r = t[o], l = i[o], p = r.length, f = d[o] = new Array(p), m, h = 0; h < p; ++h)
      (m = r[h] || l[h]) && (f[h] = m);
  for (; o < n; ++o)
    d[o] = t[o];
  return new Ue(d, this._parents, this._name, this._id);
}
function Pd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Od(e, t, i) {
  var n, s, a = Pd(t) ? Ki : Ne;
  return function() {
    var d = a(this, e), o = d.on;
    o !== n && (s = (n = o).copy()).on(t, i), d.on = s;
  };
}
function Nd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ae(this.node(), i).on.on(e) : this.each(Od(i, e, t));
}
function Td(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ld() {
  return this.on("end.remove", Td(this._id));
}
function Rd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Bi(e));
  for (var n = this._groups, s = n.length, a = new Array(s), d = 0; d < s; ++d)
    for (var o = n[d], r = o.length, l = a[d] = new Array(r), p, f, m = 0; m < r; ++m)
      (p = o[m]) && (f = e.call(p, p.__data__, m, o)) && ("__data__" in p && (f.__data__ = p.__data__), l[m] = f, ui(l[m], t, i, m, l, Ae(p, i)));
  return new Ue(a, this._parents, t, i);
}
function Dd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = es(e));
  for (var n = this._groups, s = n.length, a = [], d = [], o = 0; o < s; ++o)
    for (var r = n[o], l = r.length, p, f = 0; f < l; ++f)
      if (p = r[f]) {
        for (var m = e.call(p, p.__data__, f, r), h, g = Ae(p, i), v = 0, I = m.length; v < I; ++v)
          (h = m[v]) && ui(h, t, i, v, m, g);
        a.push(m), d.push(p);
      }
  return new Ue(a, d, t, i);
}
var Ud = Ut.prototype.constructor;
function zd() {
  return new Ud(this._groups, this._parents);
}
function qd(e, t) {
  var i, n, s;
  return function() {
    var a = lt(this, e), d = (this.style.removeProperty(e), lt(this, e));
    return a === d ? null : a === i && d === n ? s : s = t(i = a, n = d);
  };
}
function bs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Fd(e, t, i) {
  var n, s = i + "", a;
  return function() {
    var d = lt(this, e);
    return d === s ? null : d === n ? a : a = t(n = d, i);
  };
}
function Vd(e, t, i) {
  var n, s, a;
  return function() {
    var d = lt(this, e), o = i(this), r = o + "";
    return o == null && (r = o = (this.style.removeProperty(e), lt(this, e))), d === r ? null : d === n && r === s ? a : (s = r, a = t(n = d, o));
  };
}
function Hd(e, t) {
  var i, n, s, a = "style." + t, d = "end." + a, o;
  return function() {
    var r = Ne(this, e), l = r.on, p = r.value[a] == null ? o || (o = bs(t)) : void 0;
    (l !== i || s !== p) && (n = (i = l).copy()).on(d, s = p), r.on = n;
  };
}
function Bd(e, t, i) {
  var n = (e += "") == "transform" ? Br : ws;
  return t == null ? this.styleTween(e, qd(e, n)).on("end.style." + e, bs(e)) : typeof t == "function" ? this.styleTween(e, Vd(e, n, Xi(this, "style." + e, t))).each(Hd(this._id, e)) : this.styleTween(e, Fd(e, n, t), i).on("end.style." + e, null);
}
function Wd(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Gd(e, t, i) {
  var n, s;
  function a() {
    var d = t.apply(this, arguments);
    return d !== s && (n = (s = d) && Wd(e, d, i)), n;
  }
  return a._value = t, a;
}
function Yd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Gd(e, t, i ?? ""));
}
function jd(e) {
  return function() {
    this.textContent = e;
  };
}
function Kd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Xd(e) {
  return this.tween("text", typeof e == "function" ? Kd(Xi(this, "text", e)) : jd(e == null ? "" : e + ""));
}
function Qd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Zd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Qd(s)), t;
  }
  return n._value = e, n;
}
function Jd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Zd(e));
}
function el() {
  for (var e = this._name, t = this._id, i = _s(), n = this._groups, s = n.length, a = 0; a < s; ++a)
    for (var d = n[a], o = d.length, r, l = 0; l < o; ++l)
      if (r = d[l]) {
        var p = Ae(r, t);
        ui(r, e, i, l, d, {
          time: p.time + p.delay + p.duration,
          delay: 0,
          duration: p.duration,
          ease: p.ease
        });
      }
  return new Ue(n, this._parents, e, i);
}
function tl() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(a, d) {
    var o = { value: d }, r = { value: function() {
      --s === 0 && a();
    } };
    i.each(function() {
      var l = Ne(this, n), p = l.on;
      p !== e && (t = (e = p).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(r)), l.on = t;
    }), s === 0 && a();
  });
}
var il = 0;
function Ue(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function _s() {
  return ++il;
}
var Re = Ut.prototype;
Ue.prototype = {
  constructor: Ue,
  select: Rd,
  selectAll: Dd,
  selectChild: Re.selectChild,
  selectChildren: Re.selectChildren,
  filter: Cd,
  merge: Md,
  selection: zd,
  transition: el,
  call: Re.call,
  nodes: Re.nodes,
  node: Re.node,
  size: Re.size,
  empty: Re.empty,
  each: Re.each,
  on: Nd,
  attr: hd,
  attrTween: vd,
  style: Bd,
  styleTween: Yd,
  text: Xd,
  textTween: Jd,
  remove: Ld,
  tween: ad,
  delay: wd,
  duration: $d,
  ease: Ed,
  easeVarying: Ad,
  end: tl,
  [Symbol.iterator]: Re[Symbol.iterator]
};
function nl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var sl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: nl
};
function ol(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function al(e) {
  var t, i;
  e instanceof Ue ? (t = e._id, e = e._name) : (t = _s(), (i = sl).time = ji(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, a = 0; a < s; ++a)
    for (var d = n[a], o = d.length, r, l = 0; l < o; ++l)
      (r = d[l]) && ui(r, e, t, l, d, i || ol(r, t));
  return new Ue(n, this._parents, e, t);
}
Ut.prototype.interrupt = nd;
Ut.prototype.transition = al;
const Gt = (e) => () => e;
function rl(e, {
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
var At = new De(1, 0, 0);
De.prototype;
function ki(e) {
  e.stopImmediatePropagation();
}
function wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function dl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ll() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Pn() {
  return this.__zoom || At;
}
function cl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function pl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ul(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], d = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    d > a ? (a + d) / 2 : Math.min(0, a) || Math.max(0, d)
  );
}
function hl() {
  var e = dl, t = ll, i = ul, n = cl, s = pl, a = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, r = Kr, l = Gi("start", "zoom", "end"), p, f, m, h = 500, g = 150, v = 0, I = 10;
  function x(u) {
    u.property("__zoom", Pn).on("wheel.zoom", C, { passive: !1 }).on("mousedown.zoom", S).on("dblclick.zoom", z).filter(s).on("touchstart.zoom", O).on("touchmove.zoom", N).on("touchend.zoom touchcancel.zoom", U).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(u, $, b, E) {
    var T = u.selection ? u.selection() : u;
    T.property("__zoom", Pn), u !== T ? D(u, $, b, E) : T.interrupt().each(function() {
      y(this, arguments).event(E).start().zoom(null, typeof $ == "function" ? $.apply(this, arguments) : $).end();
    });
  }, x.scaleBy = function(u, $, b, E) {
    x.scaleTo(u, function() {
      var T = this.__zoom.k, F = typeof $ == "function" ? $.apply(this, arguments) : $;
      return T * F;
    }, b, E);
  }, x.scaleTo = function(u, $, b, E) {
    x.transform(u, function() {
      var T = t.apply(this, arguments), F = this.__zoom, R = b == null ? M(T) : typeof b == "function" ? b.apply(this, arguments) : b, q = F.invert(R), X = typeof $ == "function" ? $.apply(this, arguments) : $;
      return i(A(w(F, X), R, q), T, d);
    }, b, E);
  }, x.translateBy = function(u, $, b, E) {
    x.transform(u, function() {
      return i(this.__zoom.translate(
        typeof $ == "function" ? $.apply(this, arguments) : $,
        typeof b == "function" ? b.apply(this, arguments) : b
      ), t.apply(this, arguments), d);
    }, null, E);
  }, x.translateTo = function(u, $, b, E, T) {
    x.transform(u, function() {
      var F = t.apply(this, arguments), R = this.__zoom, q = E == null ? M(F) : typeof E == "function" ? E.apply(this, arguments) : E;
      return i(At.translate(q[0], q[1]).scale(R.k).translate(
        typeof $ == "function" ? -$.apply(this, arguments) : -$,
        typeof b == "function" ? -b.apply(this, arguments) : -b
      ), F, d);
    }, E, T);
  };
  function w(u, $) {
    return $ = Math.max(a[0], Math.min(a[1], $)), $ === u.k ? u : new De($, u.x, u.y);
  }
  function A(u, $, b) {
    var E = $[0] - b[0] * u.k, T = $[1] - b[1] * u.k;
    return E === u.x && T === u.y ? u : new De(u.k, E, T);
  }
  function M(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function D(u, $, b, E) {
    u.on("start.zoom", function() {
      y(this, arguments).event(E).start();
    }).on("interrupt.zoom end.zoom", function() {
      y(this, arguments).event(E).end();
    }).tween("zoom", function() {
      var T = this, F = arguments, R = y(T, F).event(E), q = t.apply(T, F), X = b == null ? M(q) : typeof b == "function" ? b.apply(T, F) : b, ee = Math.max(q[1][0] - q[0][0], q[1][1] - q[0][1]), te = T.__zoom, he = typeof $ == "function" ? $.apply(T, F) : $, be = r(te.invert(X).concat(ee / te.k), he.invert(X).concat(ee / he.k));
      return function(me) {
        if (me === 1) me = he;
        else {
          var _e = be(me), ht = ee / _e[2];
          me = new De(ht, X[0] - _e[0] * ht, X[1] - _e[1] * ht);
        }
        R.zoom(null, me);
      };
    });
  }
  function y(u, $, b) {
    return !b && u.__zooming || new k(u, $);
  }
  function k(u, $) {
    this.that = u, this.args = $, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, $), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, $) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = $.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = $.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = $.invert(this.touch1[0])), this.that.__zoom = $, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var $ = Ee(this.that).datum();
      l.call(
        u,
        this.that,
        new rl(u, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: l
        }),
        $
      );
    }
  };
  function C(u, ...$) {
    if (!e.apply(this, arguments)) return;
    var b = y(this, $).event(u), E = this.__zoom, T = Math.max(a[0], Math.min(a[1], E.k * Math.pow(2, n.apply(this, arguments)))), F = Be(u);
    if (b.wheel)
      (b.mouse[0][0] !== F[0] || b.mouse[0][1] !== F[1]) && (b.mouse[1] = E.invert(b.mouse[0] = F)), clearTimeout(b.wheel);
    else {
      if (E.k === T) return;
      b.mouse = [F, E.invert(F)], ei(this), b.start();
    }
    wt(u), b.wheel = setTimeout(R, g), b.zoom("mouse", i(A(w(E, T), b.mouse[0], b.mouse[1]), b.extent, d));
    function R() {
      b.wheel = null, b.end();
    }
  }
  function S(u, ...$) {
    if (m || !e.apply(this, arguments)) return;
    var b = u.currentTarget, E = y(this, $, !0).event(u), T = Ee(u.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", ee, !0), F = Be(u, b), R = u.clientX, q = u.clientY;
    br(u.view), ki(u), E.mouse = [F, this.__zoom.invert(F)], ei(this), E.start();
    function X(te) {
      if (wt(te), !E.moved) {
        var he = te.clientX - R, be = te.clientY - q;
        E.moved = he * he + be * be > v;
      }
      E.event(te).zoom("mouse", i(A(E.that.__zoom, E.mouse[0] = Be(te, b), E.mouse[1]), E.extent, d));
    }
    function ee(te) {
      T.on("mousemove.zoom mouseup.zoom", null), _r(te.view, E.moved), wt(te), E.event(te).end();
    }
  }
  function z(u, ...$) {
    if (e.apply(this, arguments)) {
      var b = this.__zoom, E = Be(u.changedTouches ? u.changedTouches[0] : u, this), T = b.invert(E), F = b.k * (u.shiftKey ? 0.5 : 2), R = i(A(w(b, F), E, T), t.apply(this, $), d);
      wt(u), o > 0 ? Ee(this).transition().duration(o).call(D, R, E, u) : Ee(this).call(x.transform, R, E, u);
    }
  }
  function O(u, ...$) {
    if (e.apply(this, arguments)) {
      var b = u.touches, E = b.length, T = y(this, $, u.changedTouches.length === E).event(u), F, R, q, X;
      for (ki(u), R = 0; R < E; ++R)
        q = b[R], X = Be(q, this), X = [X, this.__zoom.invert(X), q.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== X[2] && (T.touch1 = X, T.taps = 0) : (T.touch0 = X, F = !0, T.taps = 1 + !!p);
      p && (p = clearTimeout(p)), F && (T.taps < 2 && (f = X[0], p = setTimeout(function() {
        p = null;
      }, h)), ei(this), T.start());
    }
  }
  function N(u, ...$) {
    if (this.__zooming) {
      var b = y(this, $).event(u), E = u.changedTouches, T = E.length, F, R, q, X;
      for (wt(u), F = 0; F < T; ++F)
        R = E[F], q = Be(R, this), b.touch0 && b.touch0[2] === R.identifier ? b.touch0[0] = q : b.touch1 && b.touch1[2] === R.identifier && (b.touch1[0] = q);
      if (R = b.that.__zoom, b.touch1) {
        var ee = b.touch0[0], te = b.touch0[1], he = b.touch1[0], be = b.touch1[1], me = (me = he[0] - ee[0]) * me + (me = he[1] - ee[1]) * me, _e = (_e = be[0] - te[0]) * _e + (_e = be[1] - te[1]) * _e;
        R = w(R, Math.sqrt(me / _e)), q = [(ee[0] + he[0]) / 2, (ee[1] + he[1]) / 2], X = [(te[0] + be[0]) / 2, (te[1] + be[1]) / 2];
      } else if (b.touch0) q = b.touch0[0], X = b.touch0[1];
      else return;
      b.zoom("touch", i(A(R, q, X), b.extent, d));
    }
  }
  function U(u, ...$) {
    if (this.__zooming) {
      var b = y(this, $).event(u), E = u.changedTouches, T = E.length, F, R;
      for (ki(u), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, h), F = 0; F < T; ++F)
        R = E[F], b.touch0 && b.touch0[2] === R.identifier ? delete b.touch0 : b.touch1 && b.touch1[2] === R.identifier && delete b.touch1;
      if (b.touch1 && !b.touch0 && (b.touch0 = b.touch1, delete b.touch1), b.touch0) b.touch0[1] = this.__zoom.invert(b.touch0[0]);
      else if (b.end(), b.taps === 2 && (R = Be(R, this), Math.hypot(f[0] - R[0], f[1] - R[1]) < I)) {
        var q = Ee(this).on("dblclick.zoom");
        q && q.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Gt(+u), x) : n;
  }, x.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Gt(!!u), x) : e;
  }, x.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : Gt(!!u), x) : s;
  }, x.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Gt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), x) : t;
  }, x.scaleExtent = function(u) {
    return arguments.length ? (a[0] = +u[0], a[1] = +u[1], x) : [a[0], a[1]];
  }, x.translateExtent = function(u) {
    return arguments.length ? (d[0][0] = +u[0][0], d[1][0] = +u[1][0], d[0][1] = +u[0][1], d[1][1] = +u[1][1], x) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, x.constrain = function(u) {
    return arguments.length ? (i = u, x) : i;
  }, x.duration = function(u) {
    return arguments.length ? (o = +u, x) : o;
  }, x.interpolate = function(u) {
    return arguments.length ? (r = u, x) : r;
  }, x.on = function() {
    var u = l.on.apply(l, arguments);
    return u === l ? x : u;
  }, x.clickDistance = function(u) {
    return arguments.length ? (v = (u = +u) * u, x) : Math.sqrt(v);
  }, x.tapDistance = function(u) {
    return arguments.length ? (I = +u, x) : I;
  }, x;
}
var ml = Object.defineProperty, fl = Object.getOwnPropertyDescriptor, de = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? fl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && ml(t, i, s), s;
};
function gl(e, t, i, n) {
  const s = t.x - e.x, a = t.y - e.y, d = n.x - i.x, o = n.y - i.y, r = s * o - a * d;
  if (Math.abs(r) < 1e-9) return null;
  const l = ((i.x - e.x) * o - (i.y - e.y) * d) / r, p = ((i.x - e.x) * a - (i.y - e.y) * s) / r;
  return l <= 0.02 || l >= 0.98 || p <= 0.02 || p >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * a, t: l };
}
function yl(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, a = n * n + s * s || 1, d = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / a)), o = t.x + d * n, r = t.y + d * s;
  return { dist: Math.hypot(e.x - o, e.y - r), t: d };
}
function vl(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const a = e[s], d = e[s + 1], o = Math.hypot(d.x - a.x, d.y - a.y) || 1, r = (d.x - a.x) / o, l = (d.y - a.y) / o, p = t.map(([m, h]) => gl(a, d, m, h)).filter((m) => m !== null).filter((m) => m.t * o > i + 2 && (1 - m.t) * o > i + 2).sort((m, h) => m.t - h.t);
    let f = -1 / 0;
    for (const m of p)
      m.t * o - i <= f + 2 || (n += ` L ${m.x - r * i} ${m.y - l * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + r * i} ${m.y + l * i}`, f = m.t * o + i);
    n += ` L ${d.x} ${d.y}`;
  }
  return n;
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
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = At, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const s = this.scene.nodes.filter((a) => this.selectedIds.includes(a.id)).map((a) => ({ id: a.id, kind: a.kind }));
            s.length && this.emit("delete-selection-requested", { items: s });
            return;
          }
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((a) => a.id === this._selectedWaypoint.edgeId);
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
    }), Ee(e).call(this._zoomBehavior);
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
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, d = this.fitInsets.top ?? 0, o = this.fitInsets.bottom ?? 0, r = Math.max(80, n.width - s - a), l = Math.max(80, n.height - d - o), p = Math.min(...t.map((I) => I.x - I.w / 2)) - e, f = Math.max(...t.map((I) => I.x + I.w / 2)) + e, m = Math.min(...t.map((I) => I.y - I.h / 2)) - e, h = Math.max(...t.map((I) => I.y + I.h / 2)) + e, g = Math.max(0.15, Math.min(r / (f - p), l / (h - m), 1.25)), v = At.translate(
      s + r / 2 - g * (p + f) / 2,
      d + l / 2 - g * (m + h) / 2
    ).scale(g);
    Ee(i).call(this._zoomBehavior.transform, v);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Ee(t), e);
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
    for (let a = e.parentId; a; a = (n = this.scene.nodes.find((d) => d.id === a)) == null ? void 0 : n.parentId) {
      const d = this.scene.nodes.find((r) => r.id === a);
      if (!d) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - d.x), y: e.y + (this._dragPos.y - d.y) };
      const o = (s = this._dragGroup) == null ? void 0 : s.get(a);
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
      const n = this.scene.nodes.find((s) => s.id === e.parentId);
      if (n) {
        const s = this.nodePos(n), a = s.x - n.w / 2 + 10 + e.w / 2, d = s.x + n.w / 2 - 10 - e.w / 2, o = s.y - n.h / 2 + 34 + e.h / 2, r = s.y + n.h / 2 - 10 - e.h / 2;
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
    var n, s;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const a of i) {
      const d = (s = a.closest) == null ? void 0 : s.call(a, "[data-node-id]");
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
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const a = new Set(this.selectedIds), d = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (m) => a.has(m.id) && !(m.parentId && a.has(m.parentId))
    ) : null, o = d ? new Map(d.map((m) => [m.id, this.nodePos(m)])) : null, r = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !d, l = (m) => {
      const h = this.nodeIdAt(m), g = h && h !== t.id ? this.scene.nodes.find((v) => v.id === h) : void 0;
      return g ? g.kind === "external-system" ? g.id : g.parentId ?? null : null;
    }, p = (m) => {
      if ((m.buttons & 1) === 0) {
        f(m);
        return;
      }
      const h = this.toScene(m), g = h.x - i.x, v = h.y - i.y;
      if (!(!s && Math.hypot(g, v) < 3 / this._t.k))
        if (s = !0, d && o) {
          const I = /* @__PURE__ */ new Map();
          for (const x of d) {
            const w = o.get(x.id), A = this.clampToParent(x, w.x + g, w.y + v);
            I.set(x.id, { x: A.x, y: A.y });
          }
          this._dragGroup = I;
        } else r(m) ? (this._dragPos = { id: t.id, x: n.x + g, y: n.y + v }, this._hoverNodeId = l(m)) : (this._dragPos = this.clampToParent(t, n.x + g, n.y + v), this._hoverNodeId = null);
    }, f = (m) => {
      if (window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", f), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, g]) => ({ id: h, x: g.x, y: g.y }))
        });
      else if (s && this._dragPos) {
        if (r(m)) {
          const h = l(m);
          if (m.ctrlKey && t.kind === "api") {
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
    window.addEventListener("pointermove", p), window.addEventListener("pointerup", f);
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
    const s = 160, a = 90, d = { x: t.x, y: t.y, w: t.w, h: t.h }, o = this.scene.nodes.filter((v) => v.parentId === t.id), r = Math.min(...o.map((v) => v.x - v.w / 2)), l = Math.max(...o.map((v) => v.x + v.w / 2)), p = Math.min(...o.map((v) => v.y - v.h / 2)), f = Math.max(...o.map((v) => v.y + v.h / 2)), m = Hs(
      o.map((v) => ({ dx: v.x - d.x, dy: v.y - d.y, w: v.w, h: v.h })),
      { w: s, h: a }
    ), h = (v) => {
      if ((v.buttons & 1) === 0) {
        g();
        return;
      }
      const I = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: d.x,
          y: d.y,
          w: Math.max(m.w, 2 * Math.abs(I.x - d.x)),
          h: Math.max(m.h, 2 * Math.abs(I.y - d.y))
        };
        return;
      }
      const x = d.x - i * d.w / 2, w = d.y - n * d.h / 2, A = i > 0 ? Math.max(I.x, x + s, o.length ? l + 10 : -1 / 0) : Math.min(I.x, x - s, o.length ? r - 10 : 1 / 0), M = n > 0 ? Math.max(I.y, w + a, o.length ? f + 10 : -1 / 0) : Math.min(I.y, w - a, o.length ? p - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + A) / 2,
        y: (w + M) / 2,
        w: Math.abs(A - x),
        h: Math.abs(M - w)
      };
    }, g = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", g), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", g);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, s = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const d = this.nodeIdAt(a);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
        x: a.clientX,
        y: a.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), a = t - n, d = i - s, o = e.w / 2, r = e.h / 2;
    if (a === 0 && d === 0) return { x: n, y: s };
    const l = 1 / Math.max(Math.abs(a) / o, Math.abs(d) / r);
    return { x: n + a * l, y: s + d * l };
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
    const t = this.scene.nodes.find((p) => p.id === e.sourceId), i = this.scene.nodes.find((p) => p.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), a = this.nodePos(i), d = n[0] ?? a, o = n[n.length - 1] ?? s;
    let r = this.borderPoint(t, d.x, d.y), l = this.borderPoint(i, o.x, o.y);
    if (!n.length) {
      const p = this.edgeOffset(e);
      if (p !== 0) {
        const f = Math.hypot(l.x - r.x, l.y - r.y) || 1, m = -(l.y - r.y) / f * p, h = (l.x - r.x) / f * p;
        r = { x: r.x + m, y: r.y + h }, l = { x: l.x + m, y: l.y + h };
      }
    }
    return [r, ...n, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (d) => {
      if (!this._wpDrag) return;
      n = !0;
      const o = this.toScene(d), r = [...this._wpDrag.points];
      r[this._wpDrag.index] = o, this._wpDrag = { ...this._wpDrag, points: r };
    }, a = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = yl(t, e[n], e[n + 1]);
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
    let a = !1;
    const d = (r) => {
      if ((r.buttons & 1) === 0) {
        o();
        return;
      }
      const l = this.toScene(r);
      if (a) {
        if (this._wpDrag) {
          const p = [...this._wpDrag.points];
          p[s] = l, this._wpDrag = { ...this._wpDrag, points: p };
        }
      } else {
        if (Math.hypot(l.x - n.x, l.y - n.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const p = [...this.edgePoints[t.id] ?? []];
        p.splice(s, 0, l), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: p, index: s };
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
    const i = t.map((n) => `${n.x},${n.y}`).join(" ");
    return G`
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, a = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), d = Math.floor((t.length - 1) / 2), o = {
      x: (t[d].x + t[d + 1].x) / 2,
      y: (t[d].y + t[d + 1].y) / 2
    }, r = t.slice(1, -1);
    return G`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${vl(t, i)}
              fill="none"
              stroke=${n} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? G`<text x=${o.x} y=${o.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
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
        ${s ? r.map((l, p) => {
      var m;
      const f = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === p;
      return G`
                <circle data-waypoint cx=${l.x} cy=${l.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(h) => {
        h.button === 0 && (h.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: p }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], p));
      }}
                        @dblclick=${(h) => {
        h.stopPropagation(), this.removeWaypoint(e, p);
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
    var m, h, g;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, a = !!e.container, d = !!e.parentId, o = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, r = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, l = o / 2, p = r / 2, f = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return G`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${s ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (g = this._dragGroup) != null && g.has(e.id) ? "none" : "auto"}
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? G`<rect x=${-l - 4} y=${-p - 4} width=${o + 8} height=${r + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-p} width=${o} height=${r} rx=${d ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? G`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? G`<text x=${-l} y=${-p - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? G`<g transform="translate(${l - 13}, ${-p + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(v) => {
      v.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(v) => v.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && ot[e.symbol] && !d ? G`<g transform="translate(${l - (e.collapsible ? 37 : 17)}, ${-p + 5})" fill="none"
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
              <foreignObject x=${-l + 6} y=${a ? -p + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(v) => v.stopPropagation()}
                  @keydown=${(v) => {
      v.stopPropagation(), v.key === "Enter" && this.commitRename(e, v.target.value), v.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(v) => this.commitRename(e, v.target.value)}
                />
              </foreignObject>` : d ? G`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : a ? G`<text x=${-l + 12} y=${-p + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : G`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? G`<line x1=${-l + 8} y1=${-p + 28} x2=${l - 8} y2=${-p + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (d ? e.kind === "menu-item" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [l, 0],
      [-l, 0],
      [0, p],
      [0, -p]
    ].map(
      ([v, I]) => G`
                <circle data-handle cx=${v} cy=${I} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${a && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, I]) => G`
                <rect data-resize x=${v * l - 6.5} y=${I * p - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${v * I > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, v, I)}>
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
    const n = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, s = (d) => {
      if ((d.buttons & 1) === 0) {
        n();
        return;
      }
      const o = this.toScene(d);
      !i && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: o });
    }, a = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: d, b: o } = this._rubber, r = Math.min(d.x, o.x), l = Math.max(d.x, o.x), p = Math.min(d.y, o.y), f = Math.max(d.y, o.y), m = this.scene.nodes.filter((h) => {
          const g = this.nodePos(h);
          return g.x >= r && g.x <= l && g.y >= p && g.y <= f;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((d) => d.x - d.w / 2)) - e, n = Math.max(...t.map((d) => d.x + d.w / 2)) + e, s = Math.min(...t.map((d) => d.y - d.h / 2)) - e, a = Math.max(...t.map((d) => d.y + d.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: a - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, a = At.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    Ee(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, a = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return _``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, d = (0 - this._t.y) / this._t.k, o = s.width / this._t.k, r = s.height / this._t.k;
    return _`
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
      var p, f;
      (f = (p = l.currentTarget).hasPointerCapture) != null && f.call(p, l.pointerId) && this.onMinimapPointer(l, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const p = this.nodePos(l);
      return G`<rect
              x=${(p.x - l.w / 2 - e.minX) * n}
              y=${(p.y - l.h / 2 - e.minY) * n}
              width=${Math.max(2, l.w * n)}
              height=${Math.max(2, l.h * n)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * n}
            y=${(d - e.minY) * n}
            width=${o * n}
            height=${r * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((s) => s.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((s) => {
      const a = this.edgePolyline(s);
      if (a) {
        i.push(this.renderEdgeHit(s, a)), n.push(this.renderEdgeInk(s, a, [...t]));
        for (let d = 0; d < a.length - 1; d++) t.push([a[d], a[d + 1]]);
      }
    }), _`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(s) => {
      const a = s.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || s.button !== 0 || (s.buttons & 1) !== 0 && this.startRubberBand(s);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (s) => G`
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
de([
  Z({ attribute: !1 })
], ae.prototype, "scene", 2);
de([
  Z({ attribute: !1 })
], ae.prototype, "selectedId", 2);
de([
  Z({ attribute: !1 })
], ae.prototype, "selectedIds", 2);
de([
  Z({ type: Boolean })
], ae.prototype, "connectable", 2);
de([
  Z({ attribute: !1 })
], ae.prototype, "edgePoints", 2);
de([
  L()
], ae.prototype, "_t", 2);
de([
  L()
], ae.prototype, "_dragPos", 2);
de([
  L()
], ae.prototype, "_dragGroup", 2);
de([
  L()
], ae.prototype, "_pendingLink", 2);
de([
  L()
], ae.prototype, "_hoverNodeId", 2);
de([
  L()
], ae.prototype, "_editingId", 2);
de([
  L()
], ae.prototype, "_spaceDown", 2);
de([
  L()
], ae.prototype, "_wpDrag", 2);
de([
  L()
], ae.prototype, "_selectedWaypoint", 2);
de([
  L()
], ae.prototype, "_resize", 2);
de([
  L()
], ae.prototype, "_rubber", 2);
de([
  Z({ attribute: !1 })
], ae.prototype, "fitInsets", 2);
ae = de([
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
function fe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function se(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const tt = (e) => e.trim().toLowerCase();
function Il(e, t) {
  var S, z, O, N, U;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map(($) => ({ ...$, moduleId: u.id }))
  ), a = new Set(s.map((u) => u.id)), d = e.aggregates ?? [], o = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map(($) => $.id))
  ), r = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map(($) => ({ ...$, moduleId: u.id, application: !1 }))
  ), l = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map(($) => ({ ...$, moduleId: u.id, application: !0 }))
  ), p = e.modules.flatMap(
    (u) => (u.readModels ?? []).map(($) => ({ ...$, moduleId: u.id }))
  );
  for (const u of s)
    fe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: H.command.w,
      h: H.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? H.policy.fill : H.command.fill,
      stroke: u.policy ? H.policy.stroke : H.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of d)
    fe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: H.aggregate.w,
      h: H.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: H.aggregate.fill,
      stroke: H.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const u of [...r, ...l])
    fe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: H.event.w,
      h: H.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: H.event.fill,
      stroke: H.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), f.set(tt(u.name), u.id);
  const m = (u) => {
    if (!u || !u.trim()) return null;
    const $ = f.get(tt(u));
    if ($) return $;
    const b = `evname:${tt(u)}`;
    return fe(i, {
      id: b,
      label: u,
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
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), b;
  }, h = (u) => {
    const $ = p.find((E) => E.id === u.id) ?? p.find((E) => u.name && tt(E.name) === tt(u.name)), b = ($ == null ? void 0 : $.id) ?? (u.id || (u.name ? `rm:${tt(u.name)}` : null));
    return b ? (fe(i, {
      id: b,
      label: ($ == null ? void 0 : $.name) ?? u.name ?? b,
      x: 0,
      y: 0,
      w: H.readModel.w,
      h: H.readModel.h,
      kind: $ ? "read-model" : "derived-read-model",
      fill: H.readModel.fill,
      stroke: H.readModel.stroke,
      dashed: !$,
      badge: "READ MODEL"
    }), b) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!a.has(u.targetId)) continue;
    const $ = (e.actors ?? []).find((b) => b.id === u.actorId);
    $ && (fe(i, {
      id: $.id,
      label: $.name,
      x: 0,
      y: 0,
      w: H.actor.w,
      h: H.actor.h,
      kind: "actor",
      symbol: "person",
      fill: H.actor.fill,
      stroke: H.actor.stroke,
      badge: "ACTOR"
    }), se(i, {
      id: `es-actor:${$.id}->${u.targetId}`,
      sourceId: $.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const $ = (e.agentUses ?? []).filter((R) => R.agentId === u.id), b = (e.agentExternalUses ?? []).filter((R) => R.agentId === u.id), E = (e.agentRags ?? []).filter((R) => R.agentId === u.id), T = (e.agentMcpUses ?? []).filter((R) => R.agentId === u.id), F = (e.agentGatewayUses ?? []).some((R) => R.agentId === u.id) || (e.agentApiOpUses ?? []).some((R) => R.agentId === u.id) || (e.agentQueryUses ?? []).some((R) => R.agentId === u.id) || (e.agentDelegations ?? []).some((R) => R.agentId === u.id) || (e.agentTriggers ?? []).some((R) => R.agentId === u.id);
    if (!(!$.length && !b.length && !E.length && !T.length && !F)) {
      fe(i, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: H.actor.w,
        h: H.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const R of $)
        a.has(R.useCaseId) && se(i, {
          id: `es-agent:${u.id}->${R.useCaseId}`,
          sourceId: u.id,
          targetId: R.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const R of b) {
        const q = e.externalSystems.find(
          (ee) => (ee.useCases ?? []).some((te) => te.id === R.externalUseCaseId)
        );
        if (!q) continue;
        const X = (S = (q.useCases ?? []).find((ee) => ee.id === R.externalUseCaseId)) == null ? void 0 : S.name;
        fe(i, {
          id: q.id,
          label: q.name,
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
        }), se(i, {
          id: `es-agentx:${u.id}->${R.externalUseCaseId}`,
          sourceId: u.id,
          targetId: q.id,
          kind: "es-agent-external",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Llama a ${X} del sistema externo` : void 0
        });
      }
      for (const R of T) {
        const q = e.externalSystems.find(
          (ee) => (ee.mcpServers ?? []).some((te) => te.id === R.mcpServerId)
        );
        if (!q) continue;
        const X = (z = (q.mcpServers ?? []).find((ee) => ee.id === R.mcpServerId)) == null ? void 0 : z.name;
        fe(i, {
          id: q.id,
          label: q.name,
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
        }), se(i, {
          id: `es-agentmcp:${u.id}->${R.mcpServerId}`,
          sourceId: u.id,
          targetId: q.id,
          kind: "es-agent-mcp",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Consume las herramientas del servidor MCP ${X}` : void 0
        });
      }
      for (const R of E) {
        const q = (e.rags ?? []).find((X) => X.id === R.ragId);
        if (q) {
          fe(i, {
            id: q.id,
            label: q.name,
            x: 0,
            y: 0,
            w: H.readModel.w,
            h: H.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${q.name} — base de conocimiento (retrieval)`
          }), se(i, {
            id: `es-agrag:${u.id}->${q.id}`,
            sourceId: u.id,
            targetId: q.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const X of q.sourceReadModelIds ?? []) {
            const ee = h({ id: X });
            ee && se(i, {
              id: `es-ragsrc:${q.id}->${ee}`,
              sourceId: ee,
              targetId: q.id,
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
  const g = (u) => {
    const $ = e.externalSystems.find((b) => b.id === u);
    return $ ? (fe(i, {
      id: $.id,
      label: $.name,
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
    }), $.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const $ = g(u.externalSystemId);
    !$ || !a.has(u.useCaseId) || se(i, {
      id: `es-extin:${$}->${u.useCaseId}`,
      sourceId: $,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!a.has(u.sourceId)) continue;
    const $ = e.externalSystems.find(
      (T) => (T.useCases ?? []).some((F) => F.id === u.targetId)
    ), b = $ ? g($.id) : null;
    if (!b) continue;
    const E = (O = (($ == null ? void 0 : $.useCases) ?? []).find((T) => T.id === u.targetId)) == null ? void 0 : O.name;
    se(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: b,
      kind: "es-command-external",
      label: E,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: E ? `Llama a ${E} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !a.has(u.sourceId) || !i.nodes.has(u.targetId) || se(i, {
      id: `es-write:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: u.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const v = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of v)
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (a.has(u.sourceId) || d.some((b) => b.id === u.sourceId) || o.has(u.sourceId))) || se(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const I = (u, $, b, E, T, F) => (fe(i, {
    id: u,
    label: $,
    x: 0,
    y: 0,
    w: H.policy.w,
    h: H.policy.h,
    kind: b,
    symbol: "flow",
    fill: H.policy.fill,
    stroke: H.policy.stroke,
    badge: E,
    tooltip: T
  }), u), x = (u, $) => {
    const b = m(u);
    b && se(i, {
      id: `es-trigger:${b}->${$}`,
      sourceId: b,
      targetId: $,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, w = (u, $) => {
    !$ || !a.has($) || se(i, {
      id: `es-invoke:${u}->${$}`,
      sourceId: u,
      targetId: $,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const $ = I(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    x(u.eventName, $);
    for (const b of u.actions ?? []) {
      if (b.type === "CallUseCase" && w($, b.useCaseId), b.type === "StartSaga" && b.sagaId) {
        const E = `saga:${b.sagaId}`;
        I(E, b.sagaId, "saga", "SAGA"), se(i, {
          id: `es-saga:${$}->${E}`,
          sourceId: $,
          targetId: E,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (b.type === "UpdateProjection" && b.projectionId) {
        const E = (e.projections ?? []).find((T) => T.id === b.projectionId);
        E && se(i, {
          id: `es-feeds:${$}->${E.id}`,
          sourceId: $,
          targetId: E.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const $ = I(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const T of u.handledEventIds) {
      const F = i.nodes.has(T) ? T : null;
      F && se(i, {
        id: `es-trigger:${F}->${$}`,
        sourceId: F,
        targetId: $,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && se(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: $,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const b = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (b) {
      const T = e.externalSystems.find(
        (R) => (R.useCases ?? []).some((q) => q.id === b) || (R.tables ?? []).some((q) => q.id === b)
      ), F = T ? g(T.id) : null;
      if (F) {
        const R = ((N = (T.useCases ?? []).find((q) => q.id === b)) == null ? void 0 : N.name) ?? ((U = (T.tables ?? []).find((q) => q.id === b)) == null ? void 0 : U.name);
        se(i, {
          id: `es-poll:${u.id}`,
          sourceId: F,
          targetId: $,
          kind: "es-projects-poll",
          label: R,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `polling de ${R}` : "polling"
        });
      }
    }
    const E = h({ id: u.readModelId, name: u.readModelName });
    E && se(i, {
      id: `es-projects:${$}->${E}`,
      sourceId: $,
      targetId: E,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const b = m(u.triggerEvent), E = h({ name: u.readModelName ?? `${u.triggerEvent}View` });
      b && E && se(i, {
        id: `es-mat:${u.id}`,
        sourceId: b,
        targetId: E,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const $ = I(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (x(u.triggerEvent, $), w($, u.targetUseCaseId), !u.targetUseCaseId) {
      const b = g(u.targetId), E = b ?? `tgt:${u.targetId}`;
      !b && n.has(u.targetId) && fe(i, {
        id: E,
        label: n.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: H.module.w,
        h: H.module.h,
        kind: "module",
        symbol: "component",
        fill: H.module.fill,
        stroke: H.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(E) && se(i, {
        id: `es-deliver:${u.id}`,
        sourceId: $,
        targetId: E,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const $ = I(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    x(u.triggerEvent, $);
    for (const E of u.steps) w($, E.useCaseId);
    const b = m(u.onCompletionEventName);
    b && se(i, {
      id: `es-done:${u.id}`,
      sourceId: $,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const $ = I(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    x(u.triggerEvent, $);
    for (const E of u.steps ?? []) {
      w($, E.targetUseCaseId);
      for (const T of [E.emittedEventName, E.completionEventName]) {
        const F = m(T);
        F && se(i, {
          id: `es-wfemit:${u.id}:${F}`,
          sourceId: $,
          targetId: F,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const b = m(u.onCompletionEventName);
    b && se(i, {
      id: `es-done:${u.id}`,
      sourceId: $,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const A = [...i.nodes.values()], M = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    M.has(u.targetId) || M.set(u.targetId, []), M.get(u.targetId).push(u.sourceId);
  const D = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), k = (u) => {
    const $ = D.get(u);
    if ($ !== void 0) return $;
    if (y.has(u)) return 0;
    y.add(u);
    const b = M.get(u) ?? [], E = b.length ? 1 + Math.max(...b.map(k)) : 0;
    return y.delete(u), D.set(u, E), E;
  }, C = /* @__PURE__ */ new Map();
  for (const u of A) {
    const $ = t[u.id];
    if ($) {
      u.x = $.x, u.y = $.y;
      continue;
    }
    const b = k(u.id), E = C.get(b) ?? 0;
    C.set(b, E + 1), u.x = 140 + b * 260, u.y = 110 + E * 110;
  }
  return { nodes: A, edges: i.edges };
}
const xl = 190, wl = 56, On = 180, bl = 56, _l = 150, $l = 44, Nn = 250, Tn = 100;
function kl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const a = (s.dependsOnStepIds ?? []).map((o) => t.get(o)).filter(Boolean), d = a.length ? 1 + Math.max(...a.map(n)) : 0;
    return i.delete(s.id), d;
  };
  return n(e);
}
function El(e, t) {
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
function Sl(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), a = (o) => {
    var r;
    return (r = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === o)) == null ? void 0 : r.name;
  };
  let d = 140;
  return (e.workflows ?? []).forEach((o) => {
    var I;
    const r = new Map(o.steps.map((x) => [x.id, x])), l = new Map(o.steps.map((x) => [x.id, kl(x, r)])), p = /* @__PURE__ */ new Map();
    for (const x of o.steps) {
      const w = l.get(x.id) ?? 0;
      p.set(w, (p.get(w) ?? 0) + 1);
    }
    const f = Math.max(1, ...p.values()), m = El(e, o);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const x = t[m.id] ?? { x: 140, y: d };
      i.push({
        id: m.id,
        label: m.label,
        x: x.x,
        y: x.y,
        w: _l,
        h: $l,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[o.id] ?? { x: 420, y: d };
    i.push({
      id: o.id,
      label: o.name,
      x: h.x,
      y: h.y,
      w: xl,
      h: wl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${o.name}${o.triggerEvent ? ` — arranca con ${o.triggerEvent}` : ""}${o.onCompletionEventName ? ` · emite ${o.onCompletionEventName} al completar` : ""}`
    }), m && n.push({
      id: `wft:${o.id}`,
      sourceId: m.id,
      targetId: o.id,
      kind: "workflow-trigger",
      label: o.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: o.triggerEvent ? `Evento: ${o.triggerEvent}` : void 0
    });
    const g = /* @__PURE__ */ new Map();
    let v = 0;
    for (const x of o.steps) {
      const w = l.get(x.id) ?? 0;
      v = Math.max(v, w);
      const A = g.get(w) ?? 0;
      g.set(w, A + 1);
      const M = t[x.id] ?? {
        x: h.x + (w + 1) * Nn,
        y: d + (A - (p.get(w) - 1) / 2) * Tn
      }, D = a(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: M.x,
        y: M.y,
        w: On,
        h: bl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: D ? `→ ${D}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${D ? ` · lanza ${D}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const y = (x.dependsOnStepIds ?? []).filter((k) => r.has(k));
      y.length === 0 && n.push({
        id: `wfs:${o.id}:${x.id}`,
        sourceId: o.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of y)
        n.push({
          id: `wfdep:${k}->${x.id}`,
          sourceId: k,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((I = r.get(k)) == null ? void 0 : I.name) ?? k}`
        });
    }
    if (o.onCompletionEventName) {
      const x = `done:${o.id}`, w = t[x] ?? { x: h.x + (v + 2) * Nn, y: d };
      i.push({
        id: x,
        label: o.onCompletionEventName,
        x: w.x,
        y: w.y,
        w: On,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const A = new Set(o.steps.flatMap((D) => D.dependsOnStepIds ?? [])), M = o.steps.filter((D) => !A.has(D.id));
      for (const D of M.length ? M : [])
        n.push({
          id: `wfd:${o.id}:${D.id}`,
          sourceId: D.id,
          targetId: x,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      o.steps.length || n.push({
        id: `wfd:${o.id}`,
        sourceId: o.id,
        targetId: x,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    d += Math.max(2, f + 1) * Tn + 60;
  }), { nodes: i, edges: n };
}
const Ln = 250, Yt = 30, Rn = 6, Al = 16, Cl = 190, Dn = 60, Ml = 170, jt = 44;
function Pl(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function we(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Ol(e) {
  const t = [], i = (n, s, a) => {
    for (const d of n ?? []) {
      const o = [...s, d.label];
      t.push({ entry: d, path: o, depth: a }), i(d.children ?? [], o, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Nl(e, t) {
  var v, I, x;
  const i = [], n = [], s = e.uiApps ?? [], a = e.pages ?? [], d = (w) => {
    var A;
    return ((A = e.modules.flatMap((M) => M.useCases ?? []).find((M) => M.id === w)) == null ? void 0 : A.name) ?? w;
  }, o = (w) => {
    var A;
    return ((A = e.modules.flatMap((M) => M.queryServices ?? []).find((M) => M.id === w)) == null ? void 0 : A.name) ?? w;
  }, r = /* @__PURE__ */ new Map();
  let l = 160;
  for (const w of s) {
    const A = Ol(w), M = Math.max(
      90,
      54 + A.length * (Yt + Rn)
    ), D = t[w.id] ?? { x: 190, y: l + M / 2 };
    l = D.y + M / 2 + 70, i.push({
      id: w.id,
      label: w.title || w.name,
      x: D.x,
      y: D.y,
      w: Ln,
      h: M,
      kind: "ui-app",
      symbol: "component",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      container: !0,
      tooltip: `App: ${w.name}`
    });
    let y = D.y - M / 2 + 34 + 10 + Yt / 2;
    for (const { entry: k, path: C, depth: S } of A) {
      const z = Pl(w.id, k, C), O = S * Al;
      if (i.push({
        id: z,
        label: k.label,
        x: D.x + O / 2,
        y,
        w: Ln - 20 - O,
        h: Yt,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (v = k.children) != null && v.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (I = k.children) != null && I.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (x = k.children) != null && x.length ? "Agrupador (con submenú): no puede abrir nada" : k.pageId ? `Abre ${k.pageId}` : k.uiAdapterId ? `Abre la app ${k.uiAdapterId}` : k.useCaseId ? `Lanza ${k.useCaseId}` : k.aggregateId ? `CRUD inferido sobre ${k.aggregateId}` : k.queryOperationId ? `Listado con filtros de ${k.queryOperationId}` : "Entrada de menú sin destino"
      }), y += Yt + Rn, k.uiAdapterId && s.some((N) => N.id === k.uiAdapterId) && n.push({
        id: `menuapp:${z}->${k.uiAdapterId}`,
        sourceId: z,
        targetId: k.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), k.useCaseId && e.modules.some((U) => (U.useCases ?? []).some((u) => u.id === k.useCaseId)) && (r.set(k.useCaseId, {
        label: d(k.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `menuuc:${z}->${k.useCaseId}`,
        sourceId: z,
        targetId: k.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), k.aggregateId && (e.aggregates ?? []).some((N) => N.id === k.aggregateId)) {
        const N = (e.aggregates ?? []).find((U) => U.id === k.aggregateId);
        r.set(N.id, { label: N.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), n.push({
          id: `menuagg:${z}->${N.id}`,
          sourceId: z,
          targetId: N.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (k.queryOperationId) {
        const N = e.modules.flatMap((u) => u.queryServices ?? []).find((u) => u.id === k.queryServiceId), U = ((N == null ? void 0 : N.operations) ?? []).find((u) => u.id === k.queryOperationId);
        N && U && (r.set(U.id, {
          label: `${U.name} (${N.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), n.push({
          id: `menuqop:${z}->${U.id}`,
          sourceId: z,
          targetId: U.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      k.pageId && a.some((N) => N.id === k.pageId) && n.push({
        id: `menupage:${z}->${k.pageId}`,
        sourceId: z,
        targetId: k.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let p = 160;
  for (const w of a) {
    const A = t[w.id] ?? { x: 640, y: p };
    p = A.y + Dn + 90, i.push({
      id: w.id,
      label: w.name,
      x: A.x,
      y: A.y,
      w: Cl,
      h: Dn,
      kind: "page",
      symbol: "interface",
      badge: w.type ?? "FORM",
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: w.route ? `${w.type ?? "FORM"} · ${w.route}` : w.type ?? "FORM"
    }), w.modelId && (r.set(w.modelId, {
      label: w.modelName ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), n.push({
      id: `pgmodel:${w.id}->${w.modelId}`,
      sourceId: w.id,
      targetId: w.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const M of w.buttons ?? [])
      M.useCaseId && (r.set(M.useCaseId, {
        label: d(M.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `pgbtn:${w.id}->${M.useCaseId}`,
        sourceId: w.id,
        targetId: M.useCaseId,
        kind: "page-button",
        label: M.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: M.mappingId ? `Botón «${M.label}» — mapping ${M.mappingId}` : `Botón «${M.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    w.listingQueryServiceId && (r.set(w.listingQueryServiceId, {
      label: o(w.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), n.push({
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
  let f = 160;
  for (const [w, A] of r) {
    const M = t[w] ?? { x: 1050, y: f };
    f = M.y + jt + 46, i.push({
      id: w,
      label: A.label,
      x: M.x,
      y: M.y,
      w: Ml,
      h: jt,
      kind: A.kind,
      symbol: A.symbol,
      fill: "#ffffff",
      stroke: A.stroke
    });
  }
  const m = (e.actorAppUses ?? []).filter(
    (w) => s.some((A) => A.id === w.appId) && (e.actors ?? []).some((A) => A.id === w.actorId)
  ), h = [...new Set(m.map((w) => w.actorId))];
  let g = 160;
  for (const w of h) {
    const A = (e.actors ?? []).find((D) => D.id === w), M = t[w] ?? { x: -60, y: g };
    g = M.y + jt + 46, i.push({
      id: w,
      label: A.name,
      x: M.x,
      y: M.y,
      w: 150,
      h: jt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const w of m)
    n.push({
      id: `actorapp:${w.actorId}->${w.appId}`,
      sourceId: w.actorId,
      targetId: w.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: n };
}
async function Tl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((r) => r.e), n = new i(), a = {
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
  }, d = await n.layout(a), o = {};
  for (const r of d.children ?? [])
    o[r.id] = {
      x: (r.x ?? 0) + (r.width ?? 0) / 2,
      y: (r.y ?? 0) + (r.height ?? 0) / 2
    };
  return o;
}
var Ll = Object.defineProperty, Rl = Object.getOwnPropertyDescriptor, Ce = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Rl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Ll(t, i, s), s;
};
const Dl = /* @__PURE__ */ new Set([
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
let ye = class extends Pe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onDown = (e) => {
      var s, a;
      if (e.button !== 0) return;
      this.focus(), (s = this.setPointerCapture) == null || s.call(this, e.pointerId);
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
      const n = this.plateAt(e);
      this._drag = {
        mode: n ? "node" : e.shiftKey ? "pan" : "orbit",
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
      var n, s;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const d = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), o = (s = d == null ? void 0 : d.closest) == null ? void 0 : s.call(d, ".n3"), r = (o == null ? void 0 : o.dataset.nodeId) ?? null;
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
          const i = (t = this._connect) == null ? void 0 : t.sourceId, n = this._hoverTargetId;
          this._connect = null, this._hoverTargetId = null, i && n && n !== i && this.emit("connect-requested", { sourceId: i, targetId: n });
          return;
        }
        if (e.mode === "node" && e.nodeId) {
          const i = this.scene.nodes.find((n) => n.id === e.nodeId);
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
      var n, s;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), i = ((s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".n3")) ?? this.plateAt(e);
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
    const i = e / this._kUsed, n = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), s = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(s) + n * Math.sin(s),
      y: -i * Math.sin(s) + n * Math.cos(s)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var n, s, a;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((a = (s = i == null ? void 0 : i.closest) == null ? void 0 : s.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, s = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const d = new DOMMatrix().translate(n, s).multiply(a).translate(-n, -s).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), o = d.transformPoint(new DOMPoint(0, 0, 0, 1)), r = d.transformPoint(new DOMPoint(1, 0, 0, 0)), l = d.transformPoint(new DOMPoint(0, 1, 0, 0)), p = e - i.left, f = t - i.top, m = r.x - p * r.w, h = l.x - p * l.w, g = r.y - f * r.w, v = l.y - f * l.w, I = p * o.w - o.x, x = f * o.w - o.y, w = m * v - h * g;
    return w ? { x: (I * v - h * x) / w, y: (m * x - I * g) / w } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const s = t.get(n.id);
      if (s !== void 0) return s;
      const a = n.parentId ? e.get(n.parentId) : void 0, d = a ? i(a) + 1 : 0;
      return t.set(n.id, d), d;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return _`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((I) => [I.id, I])), n = Math.min(...e.map((I) => I.x - I.w / 2)) - 60, s = Math.max(...e.map((I) => I.x + I.w / 2)) + 60, a = Math.min(...e.map((I) => I.y - I.h / 2)) - 60, d = Math.max(...e.map((I) => I.y + I.h / 2)) + 60, o = (n + s) / 2, r = (a + d) / 2, l = this.getBoundingClientRect(), p = l.width ? Math.min(l.width / (s - n), l.height / (d - a), 1) * 0.9 : 0.5, f = this._k * p;
    this._kUsed = f, this._center = { x: o, y: r };
    const m = 30, h = this._liveMove, g = (I) => I.x + ((h == null ? void 0 : h.id) === I.id ? h.dx : 0), v = (I) => I.y + ((h == null ? void 0 : h.id) === I.id ? h.dy : 0);
    return _`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${f}, ${f}, ${f}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-o}px, ${-r}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${a}px"
            width=${s - n}
            height=${d - a}
            viewBox="${n} ${a} ${s - n} ${d - a}"
          >
            ${this.scene.edges.map((I) => {
      const x = i.get(I.sourceId), w = i.get(I.targetId);
      return !x || !w ? "" : G`<line
                x1=${g(x)} y1=${v(x)} x2=${g(w)} y2=${v(w)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((I) => {
      const x = i.get(I.sourceId), w = i.get(I.targetId);
      if (!x || !w) return "";
      const A = (t.get(x.id) ?? 0) * m + 2, M = (t.get(w.id) ?? 0) * m + 2, D = g(w) - g(x), y = v(w) - v(x), k = M - A, C = Math.hypot(D, y), S = Math.hypot(C, k), z = Math.atan2(y, D) * 180 / Math.PI, O = Math.atan2(k, C) * 180 / Math.PI, N = I.color ?? "#64748b", U = I.dashed ? `repeating-linear-gradient(90deg, ${N} 0 6px, transparent 6px 10px)` : N;
      return _`<div
              class="edge3"
              style="
                left: ${g(x)}px; top: ${v(x)}px; width: ${S}px; height: 1.7px;
                transform: translateZ(${A}px) rotateZ(${z}deg) rotateY(${-O}deg);
                background: ${U};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((I) => {
      const x = t.get(I.id) ?? 0, w = I.container || x === 0, A = this._hoverTargetId === I.id;
      return _`
              <div
                class="n3 ${I.container ? "container3" : ""} ${this.selectedId === I.id ? "selected3" : ""} ${A ? "hover3" : ""}"
                data-node-id=${I.id}
                data-kind=${I.kind}
                title=${I.tooltip ?? I.label}
                style="
                  left: ${g(I) - I.w / 2}px; top: ${v(I) - I.h / 2}px;
                  width: ${I.w}px; height: ${I.h}px;
                  transform: translateZ(${x * m + (A ? 8 : 0)}px)${A ? " scale(1.06)" : ""};
                  background: ${I.container ? "color-mix(in srgb, " + (I.fill ?? "#ffffff") + " 82%, transparent)" : I.fill ?? "#ffffff"};
                  border-color: ${I.stroke ?? "#64748b"};
                  border-style: ${I.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${w ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${I.badge ? _`<span class="badge3" style="color: ${I.stroke ?? "#94a3b8"}">${I.badge}</span>` : ""}
                <span>${I.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const I = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!I || !Dl.has(I.kind)) return "";
      const x = (t.get(I.id) ?? 0) * m + 4;
      return [
        [g(I) + I.w / 2, v(I)],
        [g(I) - I.w / 2, v(I)],
        [g(I), v(I) + I.h / 2],
        [g(I), v(I) - I.h / 2]
      ].map(
        ([A, M]) => _`<div
                class="h3"
                data-source-id=${I.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${A}px; top: ${M}px; transform: translateZ(${x}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? _`<svg class="rubber">
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
ye.styles = pt`
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
Ce([
  Z({ attribute: !1 })
], ye.prototype, "scene", 2);
Ce([
  Z({ attribute: !1 })
], ye.prototype, "selectedId", 2);
Ce([
  Z({ attribute: !1 })
], ye.prototype, "connectable", 2);
Ce([
  L()
], ye.prototype, "_rx", 2);
Ce([
  L()
], ye.prototype, "_rz", 2);
Ce([
  L()
], ye.prototype, "_k", 2);
Ce([
  L()
], ye.prototype, "_pan", 2);
Ce([
  L()
], ye.prototype, "_liveMove", 2);
Ce([
  L()
], ye.prototype, "_connect", 2);
Ce([
  L()
], ye.prototype, "_hoverTargetId", 2);
ye = Ce([
  ut("modux-tilt")
], ye);
var Ul = Object.defineProperty, zl = Object.getOwnPropertyDescriptor, pe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? zl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Ul(t, i, s), s;
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
let oe = class extends Pe {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._overCmpId = null;
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? _`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? _`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? _`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? _`<div class="control">••••••••</div>` : t === "email" ? _`<div class="control">nombre@dominio.com</div>` : t === "money" ? _`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? _`<div class="control">──────●──</div>` : t === "stars" ? _`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? _`<div class="control area">🖼</div>` : t === "link" ? _`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? _`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? _`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? _`<div class="control" style="justify-content:flex-end">0</div>` : _`<div class="control">Texto…</div>`;
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
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (s, a) => {
      for (const d of s ?? [])
        d.id === e && (t = a), i(d.children, d);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  onCmpDrop(e) {
    const t = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !(!t || t === e.id))
      if (e.kind === "tabLayout" && (e.children ?? [])[0] && (e = (e.children ?? [])[0]), !oe.LEAF_KINDS.has(e.kind))
        this.emitEvent("component-moved", { componentId: t, toParentId: e.id, beforeComponentId: null });
      else {
        const i = this.parentOf(e.id);
        this.emitEvent("component-moved", {
          componentId: t,
          toParentId: (i == null ? void 0 : i.id) ?? null,
          beforeComponentId: e.id
        });
      }
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var d, o, r;
    const t = e.children ?? [], i = (l) => l.map((p) => this.renderComponent(p)), n = _`<div class="placeholder">suelta componentes aquí</div>`;
    let s;
    switch (e.kind) {
      case "horizontalLayout":
        s = _`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const l = t.slice(0, Math.ceil(t.length / 2)), p = t.slice(Math.ceil(t.length / 2));
        s = _`<div class="row-lay">
          <div class="col-lay">${l.length ? i(l) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${p.length ? i(p) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        s = _`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        s = _`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const l = t.filter((f) => f.kind === "tab"), p = l[0];
        s = _`
          <div class="tabbar">
            ${l.map((f, m) => _`<span class=${m === 0 ? "on" : ""}>${f.title ?? "Pestaña"}</span>`)}
          </div>
          ${p ? this.renderComponent(p) : n}`;
        break;
      }
      case "tab":
        s = _`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        s = _`<div class="col-lay">
          ${t.length ? t.map(
          (l, p) => _`
                  <div class="acc-bar"><span>${l.title ?? l.label ?? "Sección"}</span><span>${p === 0 ? "▾" : "▸"}</span></div>
                  ${p === 0 ? this.renderComponent(l) : Q}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        s = _`<div class="card-box">
          ${e.title ? _`<div class="card-title">${e.title}</div>` : Q}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        s = _`<div class="grid3-lay">
          ${t.length ? t.map((l) => _`<div class="board-col">${this.renderComponent(l)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [l, ...p] = t;
        s = _`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${l ? this.renderComponent(l) : _`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${p.length ? i(p) : _`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        s = _`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        s = _`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        s = _`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const p = e.modelId && e.modelId === ((d = this.page) == null ? void 0 : d.modelId) ? ((o = this.page) == null ? void 0 : o.viewmodelFields) ?? [] : [];
        s = p.length ? _`<div class="grid-lay">
              ${p.slice(0, 6).map(
          (f) => _`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`
        )}
            </div>` : _`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const l = (((r = this.page) == null ? void 0 : r.viewmodelFields) ?? []).slice(0, 4);
        s = _`<table>
            <tr>${l.length ? l.map((p) => _`<th>${p.label ?? p.name}</th>`) : _`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => _`<tr>${(l.length ? l : [1, 2, 3]).map(() => _`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? Q : _`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        s = _`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const l = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        s = _`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(l)}`;
        break;
      }
      case "text":
        s = _`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        s = _`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        s = _`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        s = _`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const a = oe.LEAF_KINDS.has(e.kind);
    return _`<div
      class="cmp ${a ? "leafcmp" : ""} ${this._overCmpId === e.id ? "overcmp" : ""}"
      data-cmp-id=${e.id}
      @click=${(l) => {
      l.stopPropagation(), this._cmp = { ...e };
    }}
      @dragover=${(l) => {
      l.preventDefault(), l.stopPropagation(), this._overCmpId = e.id;
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(l) => {
      this._dragCmpId && (l.preventDefault(), l.stopPropagation(), this.onCmpDrop(e));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click para configurar"
        @dragstart=${(l) => {
      l.stopPropagation(), this._dragCmpId = e.id;
    }}
        >${oe.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${s}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return _`
        ${i ? _`<table>
              <tr>${t.slice(0, 4).map((n) => _`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => _`<tr>${t.slice(0, 4).map(() => _`<td>···</td>`)}</tr>`)}
            </table>` : Q}
        ${t.length ? _`<div class="grid">
              ${t.map(
      (n) => _`
                  <div
                    class="field ${n.colspan === 2 ? "span2" : ""} ${this._overId === n.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${n.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(n)}
                    @dragstart=${() => this._dragId = n.fieldId}
                    @dragover=${(s) => {
        s.preventDefault(), this._overId = n.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(s) => {
        s.preventDefault(), s.stopPropagation(), this.onDrop(n.fieldId);
      }}
                  >
                    <label>${n.label ?? n.name}</label>
                    ${this.control(n)}
                  </div>
                `
    )}
            </div>` : _`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    const e = this._cmp;
    if (!e) return Q;
    const t = (s) => this._cmp = { ...this._cmp, ...s }, i = e.kind, n = [
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
    return _`<div class="pop">
      ${n ? _`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(s) => t({ title: s.target.value })} />` : Q}
      ${i === "text" ? _`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(s) => t({ text: s.target.value })} />` : Q}
      ${i === "button" || i === "field" ? _`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(s) => t({ label: s.target.value })} />` : Q}
      ${i === "button" ? _`<label>Caso de uso</label>
            <select @change=${(s) => t({ useCaseId: s.target.value || void 0 })}>
              <option value="" ?selected=${!e.useCaseId}>—</option>
              ${this.useCases.map((s) => _`<option value=${s.id} ?selected=${s.id === e.useCaseId}>${s.name}</option>`)}
            </select>
            <label>Mapping</label>
            <select style="grid-column: 2 / -1" @change=${(s) => t({ mappingId: s.target.value || void 0 })}>
              <option value="" ?selected=${!e.mappingId}>(el viewmodel viaja tal cual)</option>
              ${this.mappings.map((s) => _`<option value=${s.id} ?selected=${s.id === e.mappingId}>${s.name}</option>`)}
            </select>` : Q}
      ${i === "form" ? _`<label>Model</label>
            <select style="grid-column: 2 / -1" @change=${(s) => t({ modelId: s.target.value || void 0 })}>
              <option value="" ?selected=${!e.modelId}>—</option>
              ${this.models.map((s) => _`<option value=${s.id} ?selected=${s.id === e.modelId}>${s.name}</option>`)}
            </select>` : Q}
      ${i === "listing" ? _`<label>Consulta</label>
            <select
              style="grid-column: 2 / -1"
              @change=${(s) => {
      const a = s.target.value, d = this.queryOps.find((o) => o.id === a);
      t({ queryOperationId: d == null ? void 0 : d.id, queryServiceId: d == null ? void 0 : d.queryServiceId });
    }}
            >
              <option value="" ?selected=${!e.queryOperationId}>—</option>
              ${this.queryOps.map((s) => _`<option value=${s.id} ?selected=${s.id === e.queryOperationId}>${s.name}</option>`)}
            </select>` : Q}
      ${i === "field" ? _`<label>Estereotipo</label>
            <select @change=${(s) => t({ stereotype: s.target.value || void 0 })}>
              ${Un.map((s) => _`<option value=${s} ?selected=${s === (e.stereotype ?? "regular")}>${s}</option>`)}
            </select>` : Q}
      ${i === "tabLayout" ? _`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : Q}
      <div class="actions">
        <button
          @click=${() => {
      const s = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: s });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const s = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: s.id,
        title: s.title ?? null,
        text: s.text ?? null,
        label: s.label ?? null,
        useCaseId: s.useCaseId ?? null,
        mappingId: s.mappingId ?? null,
        modelId: s.modelId ?? null,
        queryServiceId: s.queryServiceId ?? null,
        queryOperationId: s.queryOperationId ?? null,
        fieldId: s.fieldId ?? null,
        stereotype: s.stereotype ?? null,
        colspan: s.colspan ?? null
      });
    }}
        >
          Aplicar
        </button>
      </div>
    </div>`;
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), n = i.indexOf(t), s = i.indexOf(e);
    n < 0 || s < 0 || (i.splice(s, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return Q;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId;
    return _`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? _`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(n) => this._rename = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRename(), n.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : _`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        <select
          class="type"
          title="Tipo de página"
          @change=${(n) => this.emitEvent("page-type-changed", { pageType: n.target.value })}
        >
          ${["FORM", "CRUD", "DASHBOARD", "WIZARD"].map(
      (n) => _`<option value=${n} ?selected=${(e.type ?? "FORM") === n}>${n}</option>`
    )}
        </select>
        ${this._route !== null ? _`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(n) => this._route = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRoute(), n.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : _`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (n) => _`<span
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
        ${e.modelId ? _`<span class="chip">${e.modelName ?? e.modelId}</span>` : _`<span>—</span>`}
        <select
          title="Asignar el Model que hace de viewmodel"
          @change=${(n) => {
      const s = n.target.value;
      this.emitEvent("page-model-changed", { modelId: s === "" ? null : s });
    }}
        >
          <option value="" ?selected=${!e.modelId}>(sin viewmodel)</option>
          ${this.models.map(
      (n) => _`<option value=${n.id} ?selected=${n.id === e.modelId}>${n.name}</option>`
    )}
        </select>
      </div>
      <div class="body">
        ${(e.content ?? []).length ? _`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var s;
      const n = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((a) => a.useCaseId === this._btn.useCaseId);
      return _`<div class="pop">
              <label>Caso de uso</label>
              <select
                ?disabled=${n}
                @change=${(a) => this._btn = { ...this._btn, useCaseId: a.target.value }}
              >
                <option value="" ?selected=${!this._btn.useCaseId}>elige…</option>
                ${this.useCases.map(
        (a) => _`<option value=${a.id} ?selected=${a.id === this._btn.useCaseId}>${a.name}</option>`
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
        (a) => _`<option value=${a.id} ?selected=${a.id === this._btn.mappingId}>${a.name}</option>`
      )}
              </select>
              <div class="actions">
                ${n ? _`<button
                      @click=${() => {
        const a = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: a });
      }}
                    >
                      Quitar
                    </button>` : Q}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : Q}
      ${this._editing ? _`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Un.map(
      (n) => _`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
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
oe.styles = pt`
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
    .cmp.overcmp {
      border-color: #0284c7;
      background: #f0f9ff;
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
oe.KIND_LABELS = {
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
oe.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
pe([
  Z({ attribute: !1 })
], oe.prototype, "page", 2);
pe([
  Z({ type: Boolean, reflect: !0 })
], oe.prototype, "framed", 2);
pe([
  Z({ attribute: !1 })
], oe.prototype, "models", 2);
pe([
  Z({ attribute: !1 })
], oe.prototype, "mappings", 2);
pe([
  Z({ attribute: !1 })
], oe.prototype, "useCases", 2);
pe([
  Z({ attribute: !1 })
], oe.prototype, "queryOps", 2);
pe([
  L()
], oe.prototype, "_editing", 2);
pe([
  L()
], oe.prototype, "_dragId", 2);
pe([
  L()
], oe.prototype, "_overId", 2);
pe([
  L()
], oe.prototype, "_rename", 2);
pe([
  L()
], oe.prototype, "_route", 2);
pe([
  L()
], oe.prototype, "_btn", 2);
pe([
  L()
], oe.prototype, "_cmp", 2);
pe([
  L()
], oe.prototype, "_dragCmpId", 2);
pe([
  L()
], oe.prototype, "_overCmpId", 2);
oe = pe([
  ut("modux-page-designer")
], oe);
var ql = Object.defineProperty, Fl = Object.getOwnPropertyDescriptor, Me = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Fl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && ql(t, i, s), s;
};
const Vl = 460, Hl = 540, Bl = 660;
let ve = class extends Pe {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((n) => {
        var s;
        return (s = n.classList) == null ? void 0 : s.contains("frame-title");
      });
      if (i) {
        const s = i.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: s }), e.preventDefault();
          return;
        }
        const a = this.pages.findIndex((o) => o.id === s), d = this.posOf(s, a);
        this.setPointerCapture(e.pointerId), this._drag = { mode: "frame", id: s, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, this.emit("element-selected", { elementType: "node", id: s, kind: "page" }), e.preventDefault();
        return;
      }
      t.some((n) => n.tagName === "MODUX-PAGE-DESIGNER") || (this.setPointerCapture(e.pointerId), this._drag = { mode: "pan", x: e.clientX, y: e.clientY, t: { x: this._t.x, y: this._t.y } });
    }, this.onMove = (e) => {
      const t = this._drag;
      if (!t) return;
      if (t.mode === "pan") {
        this._t = { ...this._t, x: t.t.x + e.clientX - t.x, y: t.t.y + e.clientY - t.y };
        return;
      }
      const i = (e.clientX - t.x) / this._t.k, n = (e.clientY - t.y) / this._t.k;
      Math.abs(i) + Math.abs(n) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + i, y: t.oy + n };
    }, this.onUp = () => {
      const e = this._drag;
      this._drag = null, (e == null ? void 0 : e.mode) === "frame" && e.moved && this._live && this.emit("node-moved", {
        id: e.id,
        x: Math.round(this._live.x),
        y: Math.round(this._live.y)
      }), this._live = null;
    }, this.onWheel = (e) => {
      e.preventDefault();
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, s = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * s));
      this._t = {
        k: a,
        x: i - (i - this._t.x) / this._t.k * a,
        y: n - (n - this._t.y) / this._t.k * a
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
    var r, l, p, f;
    const i = (r = this.shadowRoot) == null ? void 0 : r.elementFromPoint(e, t), n = (l = i == null ? void 0 : i.closest) == null ? void 0 : l.call(i, ".frame");
    if (!n) return null;
    const s = n.dataset.pageId, a = n.querySelector("modux-page-designer"), d = (p = a == null ? void 0 : a.shadowRoot) == null ? void 0 : p.elementFromPoint(e, t), o = (f = d == null ? void 0 : d.closest) == null ? void 0 : f.call(d, "[data-cmp-id]");
    return o ? `cmp:${s}:${o.dataset.cmpId}` : s;
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Hl, y: Math.floor(t / 3) * Bl };
  }
  render() {
    return _`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      const i = this.posOf(e.id, t);
      return _`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""} · ${e.type ?? "FORM"}</span>
              </div>
              <modux-page-designer
                framed
                .page=${e}
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
      ${this.pages.length ? "" : _`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · fondo panea · rueda zoom · click en un campo edita su declaración
      </div>
    `;
  }
};
ve.styles = pt`
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
Me([
  Z({ attribute: !1 })
], ve.prototype, "pages", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "layout", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "selectedId", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "selectedIds", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "models", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "mappings", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "useCases", 2);
Me([
  Z({ attribute: !1 })
], ve.prototype, "queryOps", 2);
Me([
  L()
], ve.prototype, "_t", 2);
Me([
  L()
], ve.prototype, "_live", 2);
ve = Me([
  ut("modux-figma")
], ve);
var Wl = Object.defineProperty, Gl = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Gl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Wl(t, i, s), s;
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
  const n = i.x - i.w / 2, s = i.x + i.w / 2, a = i.y - i.h / 2, d = i.y + i.h / 2;
  let o = 0, r = 1;
  const l = t.x - e.x, p = t.y - e.y;
  for (const [f, m] of [
    [-l, e.x - n],
    [l, s - e.x],
    [-p, e.y - a],
    [p, d - e.y]
  ]) {
    if (f === 0) {
      if (m < 0) return !1;
      continue;
    }
    const h = m / f;
    if (f < 0) {
      if (h > r) return !1;
      h > o && (o = h);
    } else {
      if (h < o) return !1;
      h < r && (r = h);
    }
  }
  return r - o > 0.02;
}
function jl(e, t, i = 28) {
  var l;
  const n = new Map(e.nodes.map((p) => [p.id, p])), s = (p) => {
    var m;
    const f = /* @__PURE__ */ new Set();
    for (let h = p; h; h = (m = n.get(h)) == null ? void 0 : m.parentId) f.add(h);
    return f;
  }, a = e.nodes, d = (p) => p.parentId ? Math.min(i, 6) : i, o = /* @__PURE__ */ new Map(), r = (p, f, m) => {
    const h = d(m), g = { x: m.x, y: m.y, w: m.w + 2 * h, h: m.h + 2 * h }, v = m.w / 2 + h * 1.5, I = m.h / 2 + h * 1.5, x = { x: m.x - v, y: m.y - I }, w = { x: m.x + v, y: m.y - I }, A = { x: m.x - v, y: m.y + I }, M = { x: m.x + v, y: m.y + I }, D = [];
    for (const y of [x, w, A, M])
      !bt(p, y, g) && !bt(y, f, g) && D.push([y]);
    for (const [y, k] of [
      [x, w],
      [w, x],
      [w, M],
      [M, w],
      [M, A],
      [A, M],
      [A, x],
      [x, A]
    ])
      !bt(p, y, g) && !bt(k, f, g) && D.push([y, k]);
    return D;
  };
  for (const p of e.edges) {
    if ((l = t[p.id]) != null && l.length) continue;
    const f = n.get(p.sourceId), m = n.get(p.targetId);
    if (!f || !m) continue;
    const h = /* @__PURE__ */ new Set([...s(f.id), ...s(m.id)]), g = [
      { x: f.x, y: f.y },
      { x: m.x, y: m.y }
    ];
    for (let v = 0; v < 12; v++) {
      let I = !1;
      e: for (let x = 0; x < g.length - 1; x++)
        for (const w of a) {
          if (h.has(w.id)) continue;
          const A = d(w), M = { x: w.x, y: w.y, w: w.w + 2 * A, h: w.h + 2 * A };
          if (!bt(g[x], g[x + 1], M)) continue;
          const D = r(g[x], g[x + 1], w);
          if (!D.length) continue;
          const y = (C) => a.some(
            (S) => S !== w && !h.has(S.id) && Math.abs(C.x - S.x) < S.w / 2 + d(S) / 2 && Math.abs(C.y - S.y) < S.h / 2 + d(S) / 2
          ), k = (C) => {
            let S = 0;
            const z = [g[x], ...C, g[x + 1]];
            for (let O = 0; O < z.length - 1; O++)
              S += Math.hypot(z[O + 1].x - z[O].x, z[O + 1].y - z[O].y);
            return S + (C.some(y) ? 1e4 : 0);
          };
          D.sort((C, S) => k(C) - k(S)), g.splice(x + 1, 0, ...D[0]), I = !0;
          break e;
        }
      if (!I) break;
    }
    g.length > 2 && o.set(
      p.id,
      g.slice(1, -1).map((v) => ({ x: Math.round(v.x), y: Math.round(v.y) }))
    );
  }
  return o;
}
const Y = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Kl(e, t) {
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
function Xl(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let B = class extends Pe {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._paletteTab = "new", this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), s = (a) => {
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
          e.preventDefault(), n == null || n.fit();
          break;
        case "+":
        case "=":
          e.preventDefault(), n == null || n.zoomBy(1.25);
          break;
        case "-":
          e.preventDefault(), n == null || n.zoomBy(0.8);
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
          s("level:contexts");
          break;
        case "2":
          s("level:detail");
          break;
        case "3":
          s("level:operations");
          break;
        case "4":
          s("view:aggregates");
          break;
        case "5":
          s("view:flows");
          break;
        case "6":
          s("view:processes");
          break;
        case "7":
          s("view:workflows");
          break;
        case "8":
          s("view:ui");
          break;
        case "9":
          s("view:design");
          break;
        case "?":
          e.preventDefault(), this._helpOpen = !this._helpOpen;
          break;
        case "Escape":
          this._helpOpen && (this._helpOpen = !1);
          break;
      }
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
    return Vt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Vt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Vt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const s = Vt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), d = this.sceneFor("context-map").nodes.filter((p) => !p.parentId), o = zi(d), r = [...o.keys()].map((p) => ({
      kind: "move-node",
      view: "context-map",
      id: p,
      pos: a.nodes[p] ?? null
    })), l = { ...a.nodes };
    for (const [p, f] of o) {
      const m = d.find((g) => g.id === p), h = a.nodes[p] ?? { x: m.x, y: m.y };
      l[p] = {
        x: Math.round(h.x + (f.x - m.x)),
        y: Math.round(h.y + (f.y - m.y))
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
    const i = jl(e, t);
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
    var t, i, n, s, a, d;
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
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const o = (this.model.uiApps ?? []).find((p) => p.id === e.appId), r = (p) => {
          for (const f of p ?? []) {
            if (e.itemId ? f.id === e.itemId : f.label === e.label) return f;
            const m = r(f.children);
            if (m) return m;
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
        let r = null, l = null, p = null;
        const f = (h, g) => {
          var I;
          const v = h ?? [];
          for (let x = 0; x < v.length; x++)
            v[x].id === e.componentId && (r = v[x], l = g, p = ((I = v[x + 1]) == null ? void 0 : I.id) ?? null), f(v[x].children, v[x]);
        };
        if (f(o == null ? void 0 : o.content, null), !r) return null;
        const m = r;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
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
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: l === null ? null : l.id,
          beforeComponentId: p
        }] : [
          {
            kind: "add-page-component",
            pageId: e.pageId,
            componentId: e.componentId,
            componentKind: m.kind,
            parentComponentId: l === null ? void 0 : l.id
          },
          {
            kind: "set-page-component",
            pageId: e.pageId,
            componentId: e.componentId,
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
          }
        ];
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
      case "move-menu-item":
        return [{ kind: "move-menu-item", appId: e.toAppId, toAppId: e.appId, itemId: e.itemId, label: e.label }];
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
        const o = (s = (n = (this.model.rags ?? []).find((r) => r.id === e.sourceId)) == null ? void 0 : n.contentSources) == null ? void 0 : s.find((r) => r.uri === e.uri);
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
        const o = (this.model.processes ?? []).find((p) => p.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((p) => p.id === e.id)) ?? -1;
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
        const o = (this.model.workflows ?? []).find((p) => p.id === e.workflowId), r = (o == null ? void 0 : o.steps.findIndex((p) => p.id === e.id)) ?? -1;
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
          ...o.steps.filter((p) => p.id !== e.id && (p.dependsOnStepIds ?? []).includes(e.id)).map(
            (p) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: p.id,
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, a = this.viewLayout(s), d = a.nodes[t] ?? null;
    let o = { x: i, y: n };
    const r = this.sceneFor(s), l = r.nodes.find((f) => f.id === t);
    if (l != null && l.parentId) {
      const f = r.nodes.find((m) => m.id === l.parentId);
      f && (o = { x: i - f.x, y: n - f.y });
    }
    this.writeViewLayout(s, { ...a, nodes: { ...a.nodes, [t]: o } });
    const p = [{ kind: "move-node", view: s, id: t, pos: d }];
    if (s === "processes") {
      const f = this.stepReorderCommand(t);
      if (f) {
        const m = this.inverseOf(f);
        m && p.unshift(...m), this.command(f, !1);
      }
    }
    this.pushUndoEntry(p);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, a = (this.model.apis ?? []).find((g) => g.id === t) ?? (this.model.proxyApis ?? []).find((g) => g.id === t);
    if (!a || i && !this.model.externalSystems.some((g) => g.id === i)) return;
    const d = a.publishedByExternalSystemId ?? "", o = i ?? "";
    if (o === d) return;
    const r = this._view, l = this.viewLayout(r), p = this.sceneFor(r), f = o ? p.nodes.find((g) => g.id === o) : void 0, m = f ? { x: n - f.x, y: s - f.y } : { x: n, y: s }, h = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: r, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: o }, !1), this.writeViewLayout(r, { ...l, nodes: { ...l.nodes, [t]: m } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, a = (this.model.apis ?? []).find((g) => g.id === t), d = this.model.externalSystems.find((g) => g.id === i);
    if (!a || !d || (this.model.proxyApis ?? []).some(
      (g) => g.targetApiId === t && g.publishedByExternalSystemId === i
    )) return;
    const r = `proxy-${Y(a.name)}-${Y(d.name)}`;
    if ((this.model.proxyApis ?? []).some((g) => g.id === r)) return;
    const l = this._view, p = this.viewLayout(l), m = this.sceneFor(l).nodes.find((g) => g.id === i);
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
    m && (h.push({ kind: "move-node", view: l, id: r, pos: p.nodes[r] ?? null }), this.writeViewLayout(l, {
      ...p,
      nodes: { ...p.nodes, [r]: { x: n - m.x, y: s - m.y } }
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
    const n = await i.text(), s = this.selectedApiId(), a = s ? null : ((r = this.model.externalSystems.find((p) => p.id === this._selectedId)) == null ? void 0 : r.id) ?? null, d = s || a ? null : ((l = this.model.modules.find((p) => p.id === this._selectedId)) == null ? void 0 : l.id) ?? null;
    if (!s && !a && !d) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: s,
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
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), s = new Set(n.collapsed ?? []);
    s.has(t) ? s.delete(t) : s.add(t), this.writeViewLayout(i, { ...n, collapsed: [...s] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), a = { ...n.nodes }, d = [];
    for (const { id: o, x: r, y: l } of t) {
      d.push({ kind: "move-node", view: i, id: o, pos: n.nodes[o] ?? null });
      let p = { x: r, y: l };
      const f = s.nodes.find((m) => m.id === o);
      if (f != null && f.parentId) {
        const m = s.nodes.find((h) => h.id === f.parentId);
        m && (p = { x: r - m.x, y: l - m.y });
      }
      a[o] = p;
    }
    if (this.writeViewLayout(i, { ...n, nodes: a }), i === "processes")
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
    var p;
    const { id: t, x: i, y: n, w: s, h: a } = e.detail, d = this._view, o = this.viewLayout(d), r = this.sceneFor(d).nodes.filter((f) => f.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: d, id: t, size: ((p = o.sizes) == null ? void 0 : p[t]) ?? null },
      { kind: "move-node", view: d, id: t, pos: o.nodes[t] ?? null },
      ...r.map((f) => ({ kind: "move-node", view: d, id: f.id, pos: o.nodes[f.id] ?? null }))
    ]);
    const l = { ...o.nodes, [t]: { x: i, y: n } };
    for (const f of r) l[f.id] = { x: f.x - i, y: f.y - n };
    this.writeViewLayout(d, {
      ...o,
      nodes: l,
      sizes: { ...o.sizes ?? {}, [t]: { w: s, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, s = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: s.edges[t] ?? null }
    ]);
    const a = { ...s.edges };
    i.length ? a[t] = i : delete a[t], this.writeViewLayout(n, { ...s, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = tn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((d) => [d.id, d.x])), s = [...t.steps].sort(
      (d, o) => (n.get(d.id) ?? 0) - (n.get(o.id) ?? 0)
    );
    if (s.every((d, o) => d.id === t.steps[o].id)) return null;
    const a = s.findIndex((d) => d.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? s[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    this.applyConnection(t, i, n, s);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, n) {
    var M, D;
    if (this._view === "workflows") {
      const y = this.owningWorkflowOf(e), k = this.owningWorkflowOf(t);
      if (!y || y !== k || e === t) return;
      const C = y.steps.find((S) => S.id === t);
      if (((C == null ? void 0 : C.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: y.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const y = this.model.pages ?? [], k = this.model.uiApps ?? [], C = (N) => k.some((U) => U.id === N), S = (N) => y.some((U) => U.id === N);
      if (S(e) && C(t)) {
        const N = y.find((U) => U.id === e);
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: N.name,
          pageId: e,
          itemId: this.newMenuItemId(N.name)
        });
        return;
      }
      const z = we(e) ?? we(t);
      if (z) {
        const N = we(e) ? e : t, U = we(e) ? t : e;
        if (((M = this.sceneFor("ui").nodes.find((E) => E.id === N)) == null ? void 0 : M.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const u = this.model.modules.some(
          (E) => (E.useCases ?? []).some((T) => T.id === U)
        ), $ = (this.model.aggregates ?? []).some((E) => E.id === U), b = this.model.modules.flatMap((E) => E.queryServices ?? []).find((E) => (E.operations ?? []).some((T) => T.id === U));
        S(U) ? this.command({ kind: "set-menu-page", pageId: U, ...z }) : C(U) && U !== z.appId ? this.command({ kind: "set-menu-app", toAppId: U, ...z }) : u ? this.command({ kind: "set-menu-use-case", useCaseId: U, ...z }) : $ ? this.command({ kind: "set-menu-aggregate", aggregateId: U, ...z }) : b && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: b.id,
          queryOperationId: U,
          ...z
        });
        return;
      }
      if ((this.model.actors ?? []).some((N) => N.id === e) && C(t)) {
        (this.model.actorAppUses ?? []).some((N) => N.actorId === e && N.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const O = S(e) ? { pageId: e, other: t } : S(t) ? { pageId: t, other: e } : null;
      if (O) {
        const N = new Set(
          this.model.modules.flatMap(($) => ($.useCases ?? []).map((b) => b.id))
        ), U = new Set(
          this.model.modules.flatMap(($) => ($.queryServices ?? []).map((b) => b.id))
        ), u = y.find(($) => $.id === O.pageId);
        N.has(O.other) ? (u.buttons ?? []).some(($) => $.useCaseId === O.other) || this.command({ kind: "add-page-button", pageId: O.pageId, useCaseId: O.other }) : U.has(O.other) && this.command({ kind: "set-page-listing", pageId: O.pageId, queryServiceId: O.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, y, k] = s, C = (this.model.proxyApis ?? []).find((U) => U.id === k), S = (C == null ? void 0 : C.targetApiId) ?? ((D = (this.model.apiImplementations ?? []).find(
        (U) => U.moduleId === k && (this.model.apis ?? []).some(
          (u) => u.id === U.apiId && u.operations.some(($) => $.id === y)
        )
      )) == null ? void 0 : D.apiId);
      if (!S) return;
      if (new Set(
        this.model.modules.flatMap((U) => (U.useCases ?? []).map((u) => u.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: S,
          operationId: y,
          moduleId: k,
          targetUseCaseId: t
        });
        return;
      }
      if (!(C != null && C.targetApiId)) return;
      let O = null;
      if (t === C.targetApiId)
        O = C.targetApiId;
      else {
        const U = /^apiimpl:(.+)@(.+)$/.exec(t);
        U && U[1] === C.targetApiId ? O = U[2] : this.model.modules.some((u) => u.id === t) && (this.model.apiImplementations ?? []).some(
          (u) => u.apiId === C.targetApiId && u.moduleId === t
        ) && (O = t);
      }
      if (!O) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (U) => U.proxyId === C.id && U.operationId === y && U.targetSiteId === O
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: C.id,
        operationId: y,
        targetSiteId: O
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((y) => y.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((O) => (O.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (N) => N.agentId === e && N.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((O) => (O.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (N) => N.agentId === e && N.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((O) => (O.mcpServers ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (N) => N.agentId === e && N.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((O) => O.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (N) => N.agentId === e && N.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((O) => O.operations.map((N) => N.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (N) => N.agentId === e && N.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((O) => O.id === t) || (this.model.proxyApis ?? []).some((O) => O.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (N) => N.agentId === e && N.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((O) => (O.queryServices ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (N) => N.agentId === e && N.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (N) => N.agentId === e && N.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((O) => O.id === t) && ((this.model.agentRags ?? []).some(
        (N) => N.agentId === e && N.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((y) => y.id === e)) {
      const y = (this.model.mcpGateways ?? []).find((S) => S.id === e), k = this.model.externalSystems.some((S) => (S.mcpServers ?? []).some((z) => z.id === t)) || (this.model.apis ?? []).some((S) => S.id === t) || (this.model.apis ?? []).some((S) => S.operations.some((z) => z.id === t)) || this.model.modules.some((S) => (S.useCases ?? []).some((z) => z.id === t)) || (this.model.rags ?? []).some((S) => S.id === t), C = [
        ...y.mcpServerIds ?? [],
        ...y.apiIds ?? [],
        ...y.apiOperationIds ?? [],
        ...y.useCaseIds ?? [],
        ...y.ragIds ?? []
      ].includes(t);
      k && !C && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((y) => y.id === t)) return;
    const d = (this.model.rags ?? []).find((y) => y.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.readModels ?? []).map((S) => S.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.tables ?? []).map((S) => S.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((C) => C.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((C) => C.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((y) => y.id === t)) return;
    if ((this.model.workflows ?? []).some((y) => y.id === e)) {
      const y = (this.model.workflows ?? []).find((S) => S.id === e), k = (this.model.workflows ?? []).find(
        (S) => S.id === t && S.id !== e
      );
      if (k) {
        const S = y.onCompletionEventName || `${y.name.replace(/\s+/g, "")}Completado`;
        k.triggerEvent !== S && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: S });
        return;
      }
      const C = this.model.modules.flatMap((S) => S.useCases ?? []).find((S) => S.id === t);
      if (C && !(y.steps ?? []).some((z) => z.targetUseCaseId === t)) {
        const z = `wfs-${Y(C.name)}`;
        let O = z;
        for (let N = 2; (y.steps ?? []).some((U) => U.id === O); N++)
          O = `${z}-${N}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: O,
          name: C.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((y) => y.id === t)) {
      const y = this.model.modules.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === e), k = this.model.modules.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === e), C = y ?? k;
      if (C) {
        const S = (this.model.emissions ?? []).find((U) => U.domainEventId === e), z = new Set((this.model.aggregates ?? []).map((U) => U.id)), O = new Set(
          this.model.modules.flatMap((U) => (U.domainServices ?? []).map((u) => u.id))
        ), N = new Set(
          this.model.modules.flatMap((U) => (U.useCases ?? []).map((u) => u.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: C.name,
          triggerAggregateId: S && z.has(S.sourceId) ? S.sourceId : void 0,
          triggerDomainServiceId: S && O.has(S.sourceId) ? S.sourceId : void 0,
          triggerUseCaseId: S && N.has(S.sourceId) ? S.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((y) => y.id === e)) {
      const y = (this.model.proxyApis ?? []).find((k) => k.id === e);
      if ((this.model.apis ?? []).some((k) => k.id === t)) {
        y.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
        if (!y.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (C) => C.apiId === y.targetApiId && C.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: y.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((k) => k.id === t) && y.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((y) => y.id === e)) {
      if (this.model.externalSystems.some((y) => y.id === t)) {
        (this.model.apis ?? []).find((k) => k.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((y) => y.id === t) && ((this.model.apiImplementations ?? []).some(
        (k) => k.apiId === e && k.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const o = new Set((this.model.actors ?? []).map((y) => y.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((k) => (k.domainEvents ?? []).map((C) => C.id)),
        ...this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map((C) => C.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (C) => C.eventId === e && C.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!o.has(e)) return;
    }
    if (o.has(e)) {
      const y = new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((S) => S.id))
      ), k = new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((S) => S.id))
      );
      if (y.has(t) || k.has(t)) {
        (this.model.actorUses ?? []).some(
          (S) => S.actorId === e && S.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((C) => C.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((C) => C.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (S) => S.actorId === e && S.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((C) => C.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (S) => S.actorId === e && S.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const r = this.owningApiOf(e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((C) => C.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: r.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
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
    const l = this.model.externalSystems.flatMap((y) => y.useCases ?? []).find((y) => y.id === e), p = this.model.externalSystems.flatMap((y) => y.tables ?? []).find((y) => y.id === e);
    if (l || p) {
      const y = (l ?? p).name, k = l ? { externalUseCaseId: e } : { externalTableId: e }, C = (O) => l ? O.sourceExternalUseCaseId === e : O.sourceExternalTableId === e, S = this.model.modules.flatMap((O) => O.readModels ?? []).find((O) => O.id === t);
      if (S) {
        (this.model.projections ?? []).some(
          (N) => C(N) && N.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(y)}-${Y(S.name)}`,
          name: `${S.name}Projection`,
          ...k,
          targetId: t
        });
        return;
      }
      const z = this.model.modules.find((O) => O.id === t);
      if (z) {
        (this.model.projections ?? []).some(
          (N) => C(N) && N.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(y)}-${Y(z.name)}`,
          name: `${y}ViewProjection`,
          ...k,
          moduleId: t,
          readModelName: `${y}View`
        });
        return;
      }
      return;
    }
    const f = (this.model.aggregates ?? []).find((y) => y.id === e);
    if (f) {
      const y = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if (y) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === e && S.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(f.name)}-${Y(y.name)}`,
          name: `${y.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const k = this.model.modules.find((C) => C.id === t);
      if (k) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === e && S.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(f.name)}-${Y(k.name)}`,
          name: `${f.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${f.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap((y) => (y.domainEvents ?? []).map((k) => k.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((y) => y.id),
      ...this.model.modules.flatMap((y) => (y.domainServices ?? []).map((k) => k.id))
    ]), g = new Set(
      this.model.modules.flatMap((y) => (y.applicationEvents ?? []).map((k) => k.id))
    ), v = new Set(this.model.modules.flatMap((y) => (y.useCases ?? []).map((k) => k.id))), I = new Set(
      this.model.modules.flatMap((y) => (y.queryServices ?? []).map((k) => k.id))
    );
    if (v.has(e) && I.has(t)) {
      (this.model.queryCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap((y) => (y.useCases ?? []).map((k) => k.id))
    );
    if (v.has(e) && x.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && v.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && (this.model.aggregates ?? []).some((y) => y.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && m.has(t) || v.has(e) && g.has(t)) {
      (this.model.emissions ?? []).some(
        (k) => k.sourceId === e && k.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (m.has(e) || g.has(e)) {
      const y = g.has(e), k = this.model.modules.flatMap((E) => (y ? E.applicationEvents : E.domainEvents) ?? []).find((E) => E.id === e), C = this.model.modules.flatMap((E) => (E.useCases ?? []).map((T) => ({ u: T, module: E }))).find(({ u: E }) => E.id === t), S = this.model.modules.flatMap((E) => (E.readModels ?? []).map((T) => ({ rm: T, module: E }))).find(({ rm: E }) => E.id === t), z = this.model.modules.find((E) => E.id === t) ?? (S == null ? void 0 : S.module) ?? (C == null ? void 0 : C.module);
      if (!k || !z) return;
      const O = new Set((this.model.aggregates ?? []).map((E) => E.id)), N = new Set(
        this.model.modules.flatMap((E) => (E.domainServices ?? []).map((T) => T.id))
      ), U = (this.model.emissions ?? []).find(
        (E) => E.domainEventId === e && (y ? v.has(E.sourceId) : O.has(E.sourceId) || N.has(E.sourceId))
      );
      if (!U) {
        this.emit("modux-notice", {
          message: y ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const u = !y && O.has(U.sourceId);
      if (C) {
        if (this.model.flows.some(
          (T) => T.archetype === "TRIGGERS" && T.triggerEvent === k.name && T.targetUseCaseId === C.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(k.name)}-${Y(C.u.name)}`,
          name: C.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: u ? U.sourceId : "",
          triggerDomainServiceId: !y && !u ? U.sourceId : void 0,
          triggerUseCaseId: y ? U.sourceId : void 0,
          triggerEvent: k.name,
          targetId: z.id,
          targetUseCaseId: C.u.id
        });
        return;
      }
      const $ = (S == null ? void 0 : S.rm.name) ?? `${k.name}View`;
      if (this.model.flows.some(
        (E) => E.archetype === "MATERIALIZES" && E.triggerEvent === k.name && E.targetId === z.id && E.readModelName === $
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${Y(k.name)}-${Y($)}`,
        name: $,
        archetype: "MATERIALIZES",
        triggerAggregateId: u ? U.sourceId : "",
        triggerDomainServiceId: !y && !u ? U.sourceId : void 0,
        triggerUseCaseId: y ? U.sourceId : void 0,
        triggerEvent: k.name,
        targetId: z.id,
        readModelName: $
      });
      return;
    }
    const w = /* @__PURE__ */ new Set([
      ...h,
      ...v,
      ...I,
      ...this.model.modules.flatMap((y) => (y.readModels ?? []).map((k) => k.id))
    ]);
    if (w.has(e) || w.has(t) || m.has(t) || g.has(t))
      return;
    const A = new Set(this.model.externalSystems.map((y) => y.id));
    if (A.has(e)) {
      if (new Set(
        this.model.modules.flatMap((z) => (z.useCases ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (O) => O.externalSystemId === e && O.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (A.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const k = (this.model.apis ?? []).find(
        (z) => z.operations.some((O) => O.id === t)
      ), C = /^apiop:(.+)@(.+)$/.exec(t), S = k ? { operationId: t, siteId: k.id } : C ? { operationId: C[1], siteId: C[2] } : null;
      if (S) {
        (this.model.externalOperationUses ?? []).some(
          (O) => O.externalSystemId === e && O.operationId === S.operationId && O.siteId === S.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: S.operationId,
          targetSiteId: S.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((z) => z.id === t) || (this.model.proxyApis ?? []).some((z) => z.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (O) => O.sourceId === e && O.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    A.has(t) || o.has(t);
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
      const s = this.memberIdOf(i, n), a = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
      if (s && (a != null && a.memberIds.includes(s))) {
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
      case "page":
      case "ui-app":
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
    if (this._view === "ui") {
      if (e === "edge") {
        let s;
        if (s = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] });
        else if (s = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: s[1], queryServiceId: null });
        else if (s = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: s[1], modelId: null });
        else if (s = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: s[1], appId: s[2] });
        else if (s = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const a = we(s[1]);
          a && this.command({ kind: "set-menu-page", pageId: null, ...a });
        } else if (s = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const a = we(s[1]);
          a && this.command({ kind: "set-menu-app", toAppId: null, ...a });
        } else if (s = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const a = we(s[1]);
          a && this.command({ kind: "set-menu-use-case", useCaseId: null, ...a });
        } else if (s = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const a = we(s[1]);
          a && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...a });
        } else if (s = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const a = we(s[1]);
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
        const s = we(t);
        s && this.command({ kind: "remove-menu-item", ...s });
        return;
      }
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const s = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      const a = this.owningWorkflowOf(s[2]);
      if (!a) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: a.id,
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
      const [, a, d] = s, o = (n = (this.model.apis ?? []).find(
        (r) => r.operations.some((l) => l.id === a)
      )) == null ? void 0 : n.id;
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: o, operationId: a, moduleId: d });
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
      const [, a, d, o] = s, r = /^apiimpl:.+@(.+)$/.exec(o), l = r ? r[1] : o;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: d, operationId: a, targetSiteId: l });
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
    if (this._view === "context-map" && e === "edge" && i === "agg-call") {
      const s = /^aggcall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate-call", sourceId: s[1], targetId: s[2] });
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
      const s = /^apiwire:(.+)$/.exec(t), a = s ? this.owningApiOf(s[1]) : null;
      if (!s || !a) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: a.id, id: s[1] });
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
      if (!s || !(this.model.proxyApis ?? []).some((a) => a.id === s[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
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
      id: `step-${Y(e)}`,
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
    const e = (this.model.views ?? []).find((s) => s.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (s, a, d = {}) => _`
      <label
        class="${d.child ? "child" : ""} ${d.implicit && !t.has(s) ? "implicit" : ""}"
        title=${d.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(o) => this.toggleViewMember(s, o.target.checked)}
        />
        ${a}
      </label>
    `, n = (s, a) => a.length ? _`<h4>${s}</h4>${a}` : "";
    return _`
      <aside class="view-tree" @pointerdown=${(s) => s.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.modules.flatMap((s) => [
        i(s.id, s.name),
        ...(this.model.aggregates ?? []).filter((a) => a.moduleId === s.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(s.id) }))
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
  /** What «crear vista» works on: the multi-selection, or — on the UI and Diseño
   * views, where one page or app is a perfectly good seed — the single selection. */
  viewSelection() {
    return this._multi.length ? this._multi : this._selectedId && (this._view === "ui" || this._view === "design") ? [this._selectedId] : [];
  }
  memberIdsFromSelection() {
    if (this._view === "design") {
      const i = new Set((this.model.pages ?? []).map((n) => n.id));
      return this.viewSelection().filter((n) => i.has(n));
    }
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this.viewSelection()) {
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
          case "page":
          case "ui-app":
            t.add(i);
            break;
          case "menu-item":
          case "menu-group": {
            const s = we(i);
            s && t.add(s.appId);
            break;
          }
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
    if (!e || !t.length) return;
    const i = `view-${Y(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), n = new Set(i.map((h) => h.id)), s = this.model.externalSystems.filter((h) => t.has(h.id)), a = new Set(s.map((h) => h.id)), d = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || n.has(h.moduleId)
    ), o = new Set(d.map((h) => h.id)), r = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), l = /* @__PURE__ */ new Set(), p = (h) => {
      for (const g of h ?? [])
        g.pageId && l.add(g.pageId), p(g.children);
    };
    r.forEach((h) => p(h.menuItems));
    const f = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || l.has(h.id)
    ), m = new Set(r.map((h) => h.id));
    return {
      ...this.model,
      uiApps: r,
      pages: f,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => m.has(h.appId)),
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (h) => n.has(h.sourceId) && n.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (n.has(h.sourceId) || a.has(h.sourceId)) && (n.has(h.targetId) || a.has(h.targetId))
      ),
      aggregates: d,
      entities: (this.model.entities ?? []).filter((h) => o.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => o.has(h.sourceAggregateId) && o.has(h.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (h) => t.has(h.id) || (h.ownerModuleId ? n.has(h.ownerModuleId) : !1)
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
    const t = e.detail.kind === "process-step" ? Xl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Kl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const d of a ?? [])
        d.id && t.add(d.id), i(d.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const n = `mi-${Y(e)}`;
    let s = n;
    for (let a = 2; t.has(s); a++) s = `${n}-${a}`;
    return s;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const d of a ?? [])
        t.add(d.id), i(d.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const n = `cmp-${Y(e)}`;
    let s = n;
    for (let a = 2; t.has(s) || t.has(`${s}-tab-1`); a++) s = `${n}-${a}`;
    return s;
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return _`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .selectedId=${this._selectedId}
      .selectedIds=${this._multi}
      .models=${this.model.models ?? []}
      .mappings=${this.model.modelMappings ?? []}
      .useCases=${this.model.modules.flatMap(
      (t) => (t.useCases ?? []).map((i) => ({ id: i.id, name: i.name }))
    )}
      .queryOps=${this.model.modules.flatMap(
      (t) => (t.queryServices ?? []).flatMap(
        (i) => (i.operations ?? []).map((n) => ({
          id: n.id,
          name: `${n.name} (${i.name})`,
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
      const { pageId: i, componentId: n, ...s } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: n, ...s });
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
      const { pageId: i, fieldId: n, stereotype: s, colspan: a, label: d } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: s, colspan: a, label: d });
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
        items: e.modules.map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Apps",
        symbol: "component",
        color: "#0ea5e9",
        items: (e.uiApps ?? []).map((n) => ({ id: n.id, name: n.title || n.name }))
      },
      {
        label: "Páginas",
        symbol: "interface",
        color: "#0284c7",
        items: (e.pages ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Casos de uso",
        symbol: "usecase",
        color: "#06b6d4",
        items: e.modules.flatMap((n) => (n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.modules.flatMap((n) => [
          ...(n.domainEvents ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.applicationEvents ?? []).map((s) => ({ id: s.id, name: s.name }))
        ])
      },
      {
        label: "Agregados",
        symbol: "aggregate",
        color: "#8b5cf6",
        items: (e.aggregates ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Read models",
        symbol: "readmodel",
        color: "#10b981",
        items: e.modules.flatMap((n) => (n.readModels ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (s) => (s.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${s.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap((n) => (n.queryServices ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Actores",
        symbol: "person",
        color: "#64748b",
        items: (e.actors ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Sistemas externos",
        symbol: "component",
        color: "#64748b",
        items: e.externalSystems.map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Operaciones y tablas externas",
        symbol: "usecase",
        color: "#64748b",
        items: e.externalSystems.flatMap((n) => [
          ...(n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.tables ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.mcpServers ?? []).map((s) => ({ id: s.id, name: s.name }))
        ])
      },
      {
        label: "APIs",
        symbol: "interface",
        color: "#4f46e5",
        items: (e.apis ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Operaciones de API",
        symbol: "usecase",
        color: "#4f46e5",
        items: (e.apis ?? []).flatMap((n) => n.operations.map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Proxies API",
        symbol: "interface",
        color: "#0e7490",
        items: (e.proxyApis ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Agentes IA",
        symbol: "robot",
        color: "#9333ea",
        items: (e.aiAgents ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Gateways MCP",
        symbol: "plug",
        color: "#7c3aed",
        items: (e.mcpGateways ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "RAGs",
        symbol: "lens",
        color: "#0e7490",
        items: (e.rags ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Workflows",
        symbol: "process",
        color: "#6d28d9",
        items: (e.workflows ?? []).map((n) => ({ id: n.id, name: n.name }))
      }
    ], i = this._paletteFilter.trim().toLowerCase();
    return t.map((n) => ({
      ...n,
      items: i ? n.items.filter((s) => s.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
  }
  onPaletteDragStart(e, t) {
    var i;
    (i = e.dataTransfer) == null || i.setData("application/x-modux-palette", JSON.stringify(t)), e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
  }
  onPaletteDrop(e) {
    var d;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY), s = i.nodeIdAtClient(e.clientX, e.clientY);
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, n, s) : a.existing && this.placeExistingFromPalette(a.existing, n, s, e.clientX, e.clientY);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((s) => s.id)), n = this.model;
    for (const s of [
      n.modules.map((a) => a.id),
      (n.actors ?? []).map((a) => a.id),
      n.externalSystems.map((a) => a.id),
      (n.apis ?? []).map((a) => a.id),
      (n.proxyApis ?? []).map((a) => a.id),
      (n.aiAgents ?? []).map((a) => a.id),
      (n.rags ?? []).map((a) => a.id),
      (n.workflows ?? []).map((a) => a.id),
      (n.workflows ?? []).flatMap((a) => (a.steps ?? []).map((d) => d.id)),
      (n.uiApps ?? []).map((a) => a.id),
      (n.pages ?? []).map((a) => a.id)
    ])
      s.forEach((a) => i.add(a));
    for (let s = 1; ; s++) {
      const a = s === 1 ? e : `${e} ${s}`, d = `${t}${Y(a)}`;
      if (!i.has(d)) return { id: d, name: a };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var a, d;
    if (!t) return null;
    const i = this.sceneFor(this._view), n = [];
    for (let o = t; o; )
      n.push(o), o = (a = i.nodes.find((r) => r.id === o)) == null ? void 0 : a.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return n.find((o) => this.model.modules.some((r) => r.id === o)) ?? null;
    if (e === "read-model") {
      const o = n.find((l) => (this.model.aggregates ?? []).some((p) => p.id === l));
      if (o) return o;
      const r = n.find((l) => this.model.modules.some((p) => p.id === l));
      return ((d = (this.model.aggregates ?? []).find((l) => l.moduleId === r)) == null ? void 0 : d.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (o) => this.model.modules.some((r) => (r.useCases ?? []).some((l) => l.id === o))
      ) ?? null;
    if (e === "api-operation") {
      for (const o of n) {
        if ((this.model.apis ?? []).some((p) => p.id === o)) return o;
        const r = /^apiimpl:(.+)@(.+)$/.exec(o);
        if (r && (this.model.apis ?? []).some((p) => p.id === r[1])) return r[1];
        const l = (this.model.proxyApis ?? []).find((p) => p.id === o);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? n.find((o) => this.model.modules.some((r) => r.id === o)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var p, f, m, h;
    const n = B.PALETTE_NEW.find((g) => g.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const g = e.slice(4), v = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, I = v ? v[1] : i && (this.model.pages ?? []).some((w) => w.id === i) ? i : null;
      if (!I) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let x = v ? v[2] : void 0;
      if (x) {
        let w = null;
        const A = (D) => {
          for (const y of D ?? [])
            y.id === x && (w = y), A(y.children);
        };
        A((p = (this.model.pages ?? []).find((D) => D.id === I)) == null ? void 0 : p.content);
        const M = w;
        (M == null ? void 0 : M.kind) === "tabLayout" && (M.children ?? [])[0] && (x = (M.children ?? [])[0].id);
      }
      this.command({
        kind: "add-page-component",
        pageId: I,
        componentId: this.newComponentId(g),
        componentKind: g,
        parentComponentId: x
      });
      return;
    }
    const s = this._view, a = this.sceneFor(s), d = (g, v) => {
      const I = this.viewLayout(s), x = v ? a.nodes.find((A) => A.id === v) : void 0, w = x ? { x: Math.round(t.x - x.x), y: Math.round(t.y - x.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...I, nodes: { ...I.nodes, [g]: w } }), { kind: "move-node", view: s, id: g, pos: null };
    }, o = (g, v, I) => {
      const x = this.inverseOf(g) ?? [];
      this.command(g, !1);
      const w = d(v, I);
      this.pushUndoEntry([...x, w]);
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
        "ui-app": "app-"
      }, { id: v, name: I } = this.uniquePaletteName(n.label, g[e] ?? ""), x = e === "module" ? { kind: "add-module", id: v, name: I, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: v, name: I } : e === "external-system" ? { kind: "add-external-system", id: v, name: I } : e === "ai-agent" ? { kind: "add-ai-agent", id: v, name: I } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: v, name: I, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: v, name: I } : e === "rag" ? { kind: "add-rag", id: v, name: I } : e === "api" ? { kind: "add-api", id: v, name: I } : e === "proxy-api" ? { kind: "add-proxy-api", id: v, name: I } : e === "ui-app" ? { kind: "create-ui-app", id: v, name: I } : {
        kind: "add-workflow",
        id: v,
        name: I,
        completionEventName: `${I.replace(/\s+/g, "")}Completado`
      };
      o(x, v);
      return;
    }
    if (e === "page") {
      const { id: g, name: v } = this.uniquePaletteName("Página", "page-"), I = [];
      for (let w = i ?? void 0; w; )
        I.push(w), w = (f = a.nodes.find((A) => A.id === w)) == null ? void 0 : f.parentId;
      const x = I.find((w) => (this.model.uiApps ?? []).some((A) => A.id === w));
      if (x) {
        const w = a.nodes.find((A) => A.id === x);
        w && (t.x = w.x + w.w / 2 + 160, t.y = w.y - w.h / 2 + 40);
      }
      o(
        x ? { kind: "create-ui-page", id: g, name: v, pageType: "FORM", appId: x, menuLabel: v } : { kind: "create-ui-page", id: g, name: v, pageType: "FORM" },
        g
      );
      return;
    }
    if (e === "menu-item") {
      const g = [];
      for (let M = i ?? void 0; M; )
        g.push(M), M = (m = a.nodes.find((D) => D.id === M)) == null ? void 0 : m.parentId;
      const v = g.find((M) => (this.model.uiApps ?? []).some((D) => D.id === M));
      if (!v) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const I = /* @__PURE__ */ new Set(), x = (M) => {
        for (const D of M ?? [])
          I.add(D.label), x(D.children);
      };
      (this.model.uiApps ?? []).forEach((M) => x(M.menuItems));
      let w = "Entrada";
      for (let M = 2; I.has(w); M++) w = `Entrada ${M}`;
      const A = g.map((M) => we(M)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: v,
        label: w,
        itemId: this.newMenuItemId(w),
        parentId: A == null ? void 0 : A.itemId,
        parentLabel: A != null && A.itemId || A == null ? void 0 : A.label
      });
      return;
    }
    if (e === "workflow-step") {
      const g = this.model.workflows ?? [], v = [];
      for (let D = i ?? void 0; D; )
        v.push(D), D = (h = a.nodes.find((y) => y.id === D)) == null ? void 0 : h.parentId;
      const I = v.map((D) => g.find((y) => y.id === D)).find(Boolean), x = v.map((D) => {
        const y = g.find((k) => (k.steps ?? []).some((C) => C.id === D));
        return y ? { owner: y, stepId: D } : null;
      }).find(Boolean), w = I ?? (x == null ? void 0 : x.owner);
      if (!w) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: A, name: M } = this.uniquePaletteName("Paso", "wfs-");
      x && (t = { x: t.x + 190, y: t.y }), o(
        {
          kind: "add-workflow-step",
          workflowId: w.id,
          id: A,
          name: M,
          ...x ? { dependsOnStepIds: [x.stepId], afterStepId: x.stepId } : {}
        },
        A
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${w.name} — se ve en la vista Workflows`
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
      const { id: v, name: I } = this.uniquePaletteName("API", "api-"), x = { kind: "add-api", id: v, name: I }, w = this.inverseOf(x) ?? [];
      this.command(x, !1), this.model.externalSystems.some((y) => y.id === g) ? this.command({ kind: "set-api-publisher", id: v, targetId: g }, !1) : this.command({ kind: "add-api-implementation", apiId: v, moduleId: g }, !1);
      const A = this.viewLayout(this._view), M = this.sceneFor(this._view).nodes.find((y) => y.id === g), D = M ? { x: Math.round(t.x - M.x), y: Math.round(t.y - M.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...A, nodes: { ...A.nodes, [v]: D } }), this.pushUndoEntry([...w, { kind: "move-node", view: this._view, id: v, pos: null }]);
      return;
    }
    const r = this.dropContainerFor(e, i);
    if (!r) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: l } = this.uniquePaletteName(n.label, "");
    if (e === "aggregate") {
      const g = `agg-${Y(l)}`;
      o({ kind: "add-aggregate", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "use-case" || e === "policy") {
      const g = `uc-${Y(l)}`;
      o(
        { kind: "add-use-case", id: g, name: l, moduleId: r, ...e === "policy" ? { policy: !0 } : {} },
        g,
        r
      );
    } else if (e === "domain-event") {
      const g = `ev-${Y(l)}`;
      o({ kind: "add-domain-event", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "application-event") {
      const g = `aev-${Y(l)}`;
      o({ kind: "add-application-event", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "domain-service") {
      const g = `ds-${Y(l)}`;
      o({ kind: "add-domain-service", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "query-service") {
      const g = `qs-${Y(l)}`;
      o({ kind: "add-query-service", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "read-model") {
      const g = `rm-${Y(l)}`, v = (this.model.aggregates ?? []).find((I) => I.id === r);
      o({ kind: "add-read-model", id: g, name: l, aggregateId: r }, g, (v == null ? void 0 : v.moduleId) ?? r);
    } else if (e === "api-operation") {
      const g = (this.model.apis ?? []).find((A) => A.id === r), v = new Set(((g == null ? void 0 : g.operations) ?? []).map((A) => A.id));
      let I = l, x = `apiop-${r.replace(/^api-/, "")}-${Y(I)}`;
      for (let A = 2; v.has(x); A++)
        I = `${n.label} ${A}`, x = `apiop-${r.replace(/^api-/, "")}-${Y(I)}`;
      o({ kind: "add-api-operation", apiId: r, id: x, name: I }, x, r), a.nodes.some(
        (A) => A.parentId === r && (A.kind === "api-operation" || A.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(g == null ? void 0 : g.name) ?? r} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const g = this.model.modules.flatMap((w) => w.useCases ?? []).find((w) => w.id === r), v = new Set((g == null ? void 0 : g.stepIds) ?? []);
      let I = l, x = `step-${Y(I)}`;
      for (let w = 2; v.has(x); w++)
        I = `${n.label} ${w}`, x = `step-${Y(I)}`;
      o({ kind: "add-use-case-step", useCaseId: r, id: x, name: I }, x, r), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(g == null ? void 0 : g.name) ?? r} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const g = `xuc-${Y(l)}`;
      o({ kind: "add-external-use-case", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "external-table") {
      const g = `tbl-${Y(l)}`;
      o({ kind: "add-external-table", id: g, name: l, moduleId: r }, g, r);
    } else if (e === "mcp-server") {
      const g = `mcpsrv-${Y(l)}`;
      o({ kind: "add-mcp-server", id: g, name: l, moduleId: r }, g, r);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
      return;
    }
    const a = this._view, d = this.sceneFor(a), o = d.nodes.find((f) => f.id === e);
    if (!o) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(a);
        this.writeViewLayout(a, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const r = this.viewLayout(a), l = o.parentId ? d.nodes.find((f) => f.id === o.parentId) : void 0, p = l ? { x: Math.round(t.x - l.x), y: Math.round(t.y - l.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: r.nodes[e] ?? null }]), this.writeViewLayout(a, { ...r, nodes: { ...r.nodes, [e]: p } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = B.PALETTE_NEW.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(n.type) : this._view === "ui" ? ["ui-app", "page", "menu-item"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return _`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? _`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${t.map(
      (n) => _`
                    <div
                      class="palette-item ${n.child ? "palette-child" : ""}"
                      draggable="true"
                      title=${n.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : n.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                      @dragstart=${(s) => this.onPaletteDragStart(s, { new: n.type })}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                        ${ot[n.symbol]}
                      </svg>
                      <span class="pal-label">${n.label}</span>
                    </div>
                  `
    )}
              ` : _`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => _`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (s) => _`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: s.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${ot[n.symbol]}
                          </svg>
                          <span class="pal-label">${s.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : _`
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
    var t, i, n, s, a, d, o;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const r = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!r) return;
        this.command({ kind: "add-aggregate", id: `agg-${Y(e)}`, name: e, moduleId: r });
      } else if (this._view === "flows") {
        const r = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), l = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), p = this._newTriggerEvent.trim();
        if (!r || !l || !p) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: r,
          triggerEvent: p,
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
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? ao(i, t.nodes) : e === "flows" ? go(i, t.nodes) : e === "processes" ? tn(i, t.nodes) : e === "workflows" ? Sl(i, t.nodes) : e === "ui" ? Nl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "eventstorming" ? Il(i, t.nodes) : Js(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const s of n.nodes) {
        const a = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        a && (s.diffKind = a);
      }
    return n;
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
    const i = t.nodes.filter((l) => !l.parentId), n = new Set(i.map((l) => l.id)), s = {
      nodes: i,
      edges: t.edges.filter((l) => n.has(l.sourceId) && n.has(l.targetId))
    }, d = await Tl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), o = this.viewLayout(e);
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
    var s;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (s = this.renderRoot.querySelector("modux-canvas")) == null || s.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return _`
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
      (t) => _`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? _`
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
      (t) => _`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? _`
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
        ${this._view === "aggregates" || this._view === "processes" ? _`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return _`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? _`
              ${this._view === "flows" ? _`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => _`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return _`<option
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
              ${this._view === "flows" ? _`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return _`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? _`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => _`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? _`
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
      (t) => _`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? _`<input
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
              ${this.owningProcessOf(this._selectedId) ? _`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? _`
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
      (t) => _`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? _`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => _`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this._view === "design" ? _`${this.renderPalette()}${this.renderFigma()}` : this._tilt ? _`
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
          ></modux-tilt>` : _`
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
        ${this._view === "context-map" ? _`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? _`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? _`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : _`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? _`
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
      ([t, i]) => _`
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
    return _`
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
    return _`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => _`
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
    return _`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Yl.map(
      (n) => _`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Ui[n].abbr}</span>
              <span class="name">${Ui[n].name}</span>
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
B.PALETTE_NEW = [
  { type: "module", label: "Contexto", symbol: "component", color: "#94a3b8" },
  { type: "actor", label: "Actor", symbol: "person", color: "#64748b" },
  { type: "external-system", label: "Sistema externo", symbol: "component", color: "#64748b" },
  { type: "ai-agent", label: "Agente IA", symbol: "robot", color: "#9333ea" },
  { type: "external-ai-agent", label: "Agente IA externo", symbol: "robot", color: "#9333ea" },
  { type: "mcp-gateway", label: "Gateway MCP", symbol: "plug", color: "#7c3aed" },
  { type: "rag", label: "RAG", symbol: "lens", color: "#0e7490" },
  { type: "api", label: "API", child: !0, symbol: "interface", color: "#4f46e5" },
  { type: "proxy-api", label: "Proxy API", symbol: "interface", color: "#0e7490" },
  { type: "workflow", label: "Workflow", symbol: "process", color: "#6d28d9" },
  { type: "workflow-step", label: "Paso de workflow", child: !0, symbol: "gear", color: "#6d28d9" },
  { type: "aggregate", label: "Agregado", child: !0, symbol: "aggregate", color: "#8b5cf6" },
  { type: "use-case", label: "Caso de uso", child: !0, symbol: "usecase", color: "#06b6d4" },
  { type: "use-case-step", label: "Paso de caso de uso", child: !0, symbol: "gear", color: "#06b6d4" },
  { type: "policy", label: "Policy", child: !0, symbol: "usecase", color: "#a855f7" },
  { type: "domain-event", label: "Evento de dominio", child: !0, symbol: "event", color: "#f59e0b" },
  { type: "application-event", label: "Evento de aplicación", child: !0, symbol: "event", color: "#eab308" },
  { type: "read-model", label: "Read model", child: !0, symbol: "readmodel", color: "#10b981" },
  { type: "domain-service", label: "Servicio de dominio", child: !0, symbol: "gear", color: "#f43f5e" },
  { type: "query-service", label: "Query service", child: !0, symbol: "lens", color: "#0284c7" },
  { type: "api-operation", label: "Operación de API", child: !0, symbol: "usecase", color: "#4f46e5" },
  { type: "external-use-case", label: "Operación externa", child: !0, symbol: "usecase", color: "#64748b" },
  { type: "external-table", label: "Tabla externa", child: !0, symbol: "readmodel", color: "#a16207" },
  { type: "mcp-server", label: "Servidor MCP", child: !0, symbol: "robot", color: "#9333ea" },
  { type: "ui-app", label: "App", symbol: "component", color: "#0ea5e9" },
  { type: "page", label: "Página", child: !0, symbol: "interface", color: "#0284c7" },
  { type: "menu-item", label: "Entrada de menú", child: !0, symbol: "process", color: "#0ea5e9" },
  // Diseño: the Mateu layout vocabulary…
  { type: "cmp:verticalLayout", label: "Layout · Vertical", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:horizontalLayout", label: "Layout · Horizontal", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:formLayout", label: "Layout · Form", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:splitLayout", label: "Layout · Split", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:tabLayout", label: "Layout · Tabs", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:accordionLayout", label: "Layout · Acordeón", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:card", label: "Layout · Card", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:gridLayout", label: "Layout · Grid", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:boardLayout", label: "Layout · Board", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:dashboardLayout", label: "Layout · Dashboard", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:masterDetailLayout", label: "Layout · Master-detail", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:foldoutLayout", label: "Layout · Foldout", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:carouselLayout", label: "Layout · Carrusel", symbol: "component", color: "#0ea5e9" },
  { type: "cmp:appLayout", label: "Layout · App", symbol: "component", color: "#0ea5e9" },
  // …and the components that live inside those layouts.
  { type: "cmp:form", label: "Componente · Formulario", symbol: "interface", color: "#0284c7" },
  { type: "cmp:listing", label: "Componente · Listado", symbol: "lens", color: "#0284c7" },
  { type: "cmp:button", label: "Componente · Botón", symbol: "usecase", color: "#0284c7" },
  { type: "cmp:field", label: "Componente · Campo", symbol: "gear", color: "#0284c7" },
  { type: "cmp:text", label: "Componente · Texto", symbol: "readmodel", color: "#0284c7" },
  { type: "cmp:metricCard", label: "Componente · Métrica", symbol: "event", color: "#0284c7" },
  { type: "cmp:menuBar", label: "Componente · Menú", symbol: "process", color: "#0284c7" }
];
W([
  Z({ attribute: !1 })
], B.prototype, "model", 2);
W([
  Z({ attribute: !1 })
], B.prototype, "layout", 2);
W([
  Z({ attribute: !1 })
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
var Ql = Object.defineProperty, Zl = Object.getOwnPropertyDescriptor, Ie = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Zl(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Ql(t, i, s), s;
};
let le = class extends Pe {
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
    ], t = (n) => le.TYPE_LABELS[n] ?? n;
    return _`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: s, mark: a, cls: d }) => {
      const o = this._diff.changes.filter((r) => r.kind === n);
      return o.length ? _`
            <div class="diff-group">${s} (${o.length})</div>
            ${o.map(
        (r) => _`
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), n = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, n.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(n));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var s, a, d;
    const i = (s = this._workspace) == null ? void 0 : s.current;
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
            const p = await r.json();
            p != null && p.message && (l = p.message);
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
    const n = (a = this._workspace) == null ? void 0 : a.current;
    if (n && n !== i) {
      const o = ((d = this._workspace.solutions.find((r) => r.branch === n)) == null ? void 0 : d.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
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
    const { content: t, fileName: i, apiId: n, homeExternalId: s, homeModuleId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const d = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!d.ok) {
          let p = `El servidor rechazó el contrato (${d.status})`;
          try {
            const f = await d.json();
            f != null && f.message && (p = f.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        const { apiId: o } = await d.json(), r = s ? { kind: "set-api-publisher", id: o, targetId: s } : a ? { kind: "add-api-implementation", apiId: o, moduleId: a } : null;
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
    return this._error ? _`<div class="status error">modux editor: ${this._error}</div>` : this._model ? _`
      ${this._workspace ? _`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : _`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((s) => s.kind === n).length;
      return _`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? _`
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
      return _`
                      ${i === "EXPLORING" ? _`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? _`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? _`<button
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
      ${this._mergeFlow ? _`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => _`
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
      ${this._toast ? _`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : _`<div class="status">Cargando el modelo…</div>`;
  }
};
le.styles = pt`
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
le.TYPE_LABELS = {
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
Ie([
  Z()
], le.prototype, "base", 2);
Ie([
  L()
], le.prototype, "_model", 2);
Ie([
  L()
], le.prototype, "_layout", 2);
Ie([
  L()
], le.prototype, "_error", 2);
Ie([
  L()
], le.prototype, "_saving", 2);
Ie([
  L()
], le.prototype, "_toast", 2);
Ie([
  L()
], le.prototype, "_workspace", 2);
Ie([
  L()
], le.prototype, "_creatingSolution", 2);
Ie([
  L()
], le.prototype, "_newSolutionName", 2);
Ie([
  L()
], le.prototype, "_diff", 2);
Ie([
  L()
], le.prototype, "_diffListOpen", 2);
Ie([
  L()
], le.prototype, "_mergeFlow", 2);
le = Ie([
  ut("modux-editor-connected")
], le);
export {
  Jl as CONTAINER_HEADER,
  ec as CONTAINER_INSET,
  ae as ModuxCanvas,
  B as ModuxEditor,
  le as ModuxEditorConnected,
  ao as aggregatesScene,
  Ge as apiImplNodeId,
  We as apiOpOccurrenceId,
  Ei as containerFit,
  Hs as containerMinSize,
  Js as contextMapScene,
  Xs as flowCoherence,
  go as flowsScene,
  Vt as normalizeViewLayout,
  tn as processesScene,
  Ks as relationEdgeId,
  zi as resolveOverlaps
};
