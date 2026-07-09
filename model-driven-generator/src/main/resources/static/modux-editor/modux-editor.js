const Gl = 34, Yl = 10;
function Li(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let r = !1;
    for (let d = 0; d < e.length; d++)
      for (let o = d + 1; o < e.length; o++) {
        const a = e[d], l = e[o], u = i.get(a.id), m = i.get(l.id), f = m.x - u.x, h = m.y - u.y, y = (a.w + l.w) / 2 + t - Math.abs(f), g = (a.h + l.h) / 2 + t - Math.abs(h);
        if (!(y <= 0 || g <= 0))
          if (r = !0, y < g) {
            const w = (f >= 0 ? 1 : -1) * y / 2;
            u.x -= w, m.x += w;
          } else {
            const w = (h >= 0 ? 1 : -1) * g / 2;
            u.y -= w, m.y += w;
          }
      }
    if (!r) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const s of e) {
    const r = i.get(s.id);
    (Math.abs(r.x - s.x) > 0.5 || Math.abs(r.y - s.y) > 0.5) && n.set(s.id, r);
  }
  return n;
}
function qs(e, t = { w: 160, h: 90 }) {
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
function ki(e, t, i) {
  let n = t.w / 2, s = t.w / 2, r = t.h / 2, d = t.h / 2;
  for (const o of i)
    n = Math.max(n, -o.dx + o.w / 2 + 10), s = Math.max(s, o.dx + o.w / 2 + 10), r = Math.max(r, -o.dy + o.h / 2 + 34), d = Math.max(d, o.dy + o.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (d - r) / 2,
    w: n + s,
    h: r + d
  };
}
function qt(e) {
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
const Fs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Vs = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Hs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Je = 168, et = 56;
function Ve(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Fe(e, t) {
  return `apiop:${e}@${t}`;
}
const Qi = { compact: 0, coarse: 1, full: 2 };
function Zi(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Qi[e ? t : n] > Qi[s] };
}
function Ln(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Ve(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Un = 34, zn = 14, Bs = 14, xe = 108, Ie = 32, qn = 12, Fn = 10, kt = 2, Ws = kt * xe + (kt - 1) * qn + 2 * zn;
function Gs(e, t) {
  return `rel:${e}->${t}`;
}
function Ys(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function ht(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const js = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Vn = {
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
}, $i = {
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
function Ei(e) {
  const t = Math.max(1, Math.ceil(e / kt)), i = t * Ie + (t - 1) * Fn;
  return { w: Ws, h: Un + i + Bs };
}
function Yt(e, t) {
  const i = e % kt, n = Math.floor(e / kt);
  return {
    x: -t.w / 2 + zn + i * (xe + qn) + xe / 2,
    y: -t.h / 2 + Un + n * (Ie + Fn) + Ie / 2
  };
}
function Xs(e, t, i, n, s, r, d = !1) {
  const o = (e.aggregates ?? []).filter((l) => l.moduleId === t.id), a = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Ln(e, t.id),
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
  if (!a.length)
    return [{ ...n, x: i.x, y: i.y, w: Je, h: et }];
  if (d) {
    const l = new Map((e.apis ?? []).map((m) => [m.id, m])), u = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && l.has(m.apiId)).map((m) => {
      const f = l.get(m.apiId);
      return {
        id: Ve(m.apiId, m.moduleId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((h) => ({
          id: Fe(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (u.length > 0) {
      const m = a.filter((f) => f.kind !== "api-impl");
      return Hn(i, n, u, m, s, r);
    }
  }
  return wt(i, n, a, s, r);
}
function Hn(e, t, i, n, s, r, d = /* @__PURE__ */ new Set()) {
  const o = r[t.id] ?? Ei(i.length + n.length), a = i.map((h, y) => {
    const g = s[h.id] ?? Yt(y, o), w = d.has(h.id) ? [] : h.ops, v = r[h.id] ?? Ei(w.length), $ = w.map((N, b) => s[N.id] ?? Yt(b, v)), O = ki(
      { x: g.x, y: g.y },
      v,
      $.map((N) => ({ dx: N.x, dy: N.y, w: xe, h: Ie }))
    );
    return { a: h, off: g, ops: w, opOffs: $, fit: O };
  }), l = n.map(
    (h, y) => s[h.id] ?? Yt(i.length + y, o)
  ), u = Li(
    [
      ...a.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, y) => ({
        id: h.id,
        x: l[y].x,
        y: l[y].y,
        w: xe,
        h: Ie
      }))
    ],
    24
  );
  for (const h of a) {
    const y = u.get(h.a.id);
    y && (h.off = { x: h.off.x + (y.x - h.fit.x), y: h.off.y + (y.y - h.fit.y) }, h.fit = { ...h.fit, x: y.x, y: y.y });
  }
  n.forEach((h, y) => {
    const g = u.get(h.id);
    g && (l[y] = { x: g.x, y: g.y });
  });
  const m = ki(e, o, [
    ...a.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...l.map((h) => ({ dx: h.x, dy: h.y, w: xe, h: Ie }))
  ]), f = [
    { ...t, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const h of a)
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
    }), h.ops.forEach((y, g) => {
      f.push({
        id: y.id,
        label: y.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[g].x,
        y: e.y + h.off.y + h.opOffs[g].y,
        w: xe,
        h: Ie,
        tooltip: `${$i[h.a.opKind]}: ${y.name}`
      });
    });
  return n.forEach((h, y) => {
    const g = Vn[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + l[y].x,
      y: e.y + l[y].y,
      w: xe,
      h: Ie,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${$i[h.kind]} ${h.name}`
    });
  }), f;
}
function wt(e, t, i, n, s) {
  const r = s[t.id] ?? Ei(i.length), d = i.map((m, f) => n[m.id] ?? Yt(f, r)), o = Li(
    i.map((m, f) => ({ id: m.id, x: d[f].x, y: d[f].y, w: xe, h: Ie })),
    10
  );
  i.forEach((m, f) => {
    const h = o.get(m.id);
    h && (d[f] = { x: h.x, y: h.y });
  });
  const a = ki(
    e,
    r,
    d.map((m) => ({ dx: m.x, dy: m.y, w: xe, h: Ie }))
  ), l = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, u = i.map((m, f) => {
    const h = d[f], y = m.policy ? js : Vn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: xe,
      h: Ie,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : $i[m.kind]} ${m.name}`
    };
  });
  return [l, ...u];
}
function Ks(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const r = s, d = i !== "contexts", o = i === "operations", a = new Set(e.externalSystems.map((c) => c.id)), l = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && a.has(c.publishedByExternalSystemId)
  ), u = new Set(l.map((c) => c.id)), m = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && a.has(c.publishedByExternalSystemId)
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
  ], y = h.flatMap((c, C) => {
    const F = t[c.ref.id] ?? ht(C, h.length);
    if ("workflow" in c && c.workflow) {
      const Y = c.ref;
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
        x: F.x,
        y: F.y,
        w: Je,
        h: et
      }];
    }
    if (c.proxy) {
      const Y = c.ref, ee = {
        id: Y.id,
        label: Y.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${Y.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && Y.targetApiId) {
        const Ae = (e.apis ?? []).find((Qe) => Qe.id === Y.targetApiId), Ce = (Ae == null ? void 0 : Ae.operations) ?? [];
        if (Ce.length > 0)
          return wt(
            F,
            ee,
            Ce.map((Qe) => ({
              id: Fe(Qe.id, Y.id),
              name: Qe.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ee, x: F.x, y: F.y, w: Je, h: et }];
    }
    if (c.api) {
      const Y = c.ref, ee = {
        id: Y.id,
        label: Y.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Y.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (s.has(Y.id) ? !d : d) && Y.operations.length > 0 ? wt(
        F,
        { ...ee, collapsible: !0, collapsed: !1 },
        Y.operations.map(
          (Ce) => ({ id: Ce.id, name: Ce.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ee,
        collapsible: Y.operations.length > 0,
        collapsed: Y.operations.length > 0,
        x: F.x,
        y: F.y,
        w: Je,
        h: et
      }];
    }
    if (c.external) {
      const Y = c.ref, ee = {
        id: Y.id,
        label: Y.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Y.name} (sistema externo)`
      }, Ae = l.filter((te) => te.publishedByExternalSystemId === Y.id), Ce = m.filter((te) => te.publishedByExternalSystemId === Y.id), Qe = Ce.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), pi = [
        ...(Y.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(Y.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(Y.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], ui = Ae.length > 0 || Ce.length > 0, hi = ui || pi.length > 0, { form: Ut, collapsed: mi } = Zi(
        s.has(Y.id),
        d ? "full" : ui ? "coarse" : "compact",
        pi.length > 0 || o && ui
      ), Xi = [
        ...Qe,
        ...Ut === "full" ? pi : []
      ], fi = o && Ut === "full" ? Ce.filter((te) => {
        const pt = te.targetApiId ? (e.apis ?? []).find((de) => de.id === te.targetApiId) : void 0;
        return ((pt == null ? void 0 : pt.operations) ?? []).length > 0;
      }) : [];
      if (o && Ut === "full" && (Ae.length > 0 || fi.length > 0)) {
        const te = [
          ...Ae.map((de) => ({
            id: de.id,
            name: de.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${de.name} — API publicada por ${Y.name}`,
            opKind: "api-operation",
            ops: (de.operations ?? []).map((ut) => ({ id: ut.id, name: ut.name }))
          })),
          ...fi.map((de) => {
            const ut = (e.apis ?? []).find((zt) => zt.id === de.targetApiId);
            return {
              id: de.id,
              name: de.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${de.name} — proxy/cache de ${ut.name}`,
              opKind: "api-op-occurrence",
              ops: (ut.operations ?? []).map((zt) => ({
                id: Fe(zt.id, de.id),
                name: zt.name
              }))
            };
          })
        ], pt = new Set(fi.map((de) => de.id));
        return Hn(
          F,
          { ...ee, collapsible: !0, collapsed: mi },
          te,
          Xi.filter((de) => !pt.has(de.id)),
          t,
          n,
          r
        );
      }
      const Ki = Ut === "compact" ? [] : [
        ...Ae.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Xi
      ];
      return Ki.length > 0 ? wt(
        F,
        { ...ee, collapsible: hi, collapsed: mi },
        Ki,
        t,
        n
      ) : [{
        ...ee,
        collapsible: hi,
        collapsed: hi && mi,
        x: F.x,
        y: F.y,
        w: Je,
        h: et
      }];
    }
    const G = c.ref, Q = G.subdomainType ?? "GENERIC", oe = {
      id: G.id,
      label: G.name,
      kind: "module",
      symbol: "component",
      fill: Fs[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${G.name} — subdominio ${Q}`
    }, ye = Ln(e, G.id), lt = (e.aggregates ?? []).some((Y) => Y.moduleId === G.id) || (G.useCases ?? []).length > 0 || (G.domainEvents ?? []).length > 0 || (G.applicationEvents ?? []).length > 0 || (G.readModels ?? []).length > 0 || (G.domainServices ?? []).length > 0 || (G.queryServices ?? []).length > 0, Le = lt || ye.length > 0, { form: ct, collapsed: Ke } = Zi(
      s.has(G.id),
      d ? "full" : ye.length > 0 ? "coarse" : "compact",
      lt
    );
    return ct === "full" && Le ? Xs(
      e,
      G,
      F,
      { ...oe, collapsible: !0, collapsed: Ke },
      t,
      n,
      o
    ) : ct === "coarse" && ye.length > 0 ? wt(
      F,
      { ...oe, collapsible: Le, collapsed: Ke },
      ye,
      t,
      n
    ) : [{
      ...oe,
      collapsible: Le,
      collapsed: Le && Ke,
      x: F.x,
      y: F.y,
      w: Je,
      h: et
    }];
  }), g = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, C) => {
    const F = t[c.id] ?? ht(h.length + C, g);
    y.push({
      id: c.id,
      label: c.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, C) => {
    const F = t[c.id] ?? ht(h.length + (e.actors ?? []).length + C, g);
    y.push({
      id: c.id,
      label: c.name,
      x: F.x,
      y: F.y,
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
  }), (e.mcpGateways ?? []).forEach((c, C) => {
    const F = t[c.id] ?? ht(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + C,
      g
    );
    y.push({
      id: c.id,
      label: c.name,
      x: F.x,
      y: F.y,
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
  const w = [];
  (e.rags ?? []).forEach((c, C) => {
    const F = t[c.id] ?? ht(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + C,
      g
    );
    y.push({
      id: c.id,
      label: c.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((G, Q) => {
      const oe = `ragcs:${c.id}:${G.uri}`, ye = t[oe] ?? { x: F.x + 170, y: F.y - 30 + Q * 44 };
      y.push({
        id: oe,
        label: G.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ye.x,
        y: ye.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: G.type,
        tooltip: `${G.type}: ${G.uri}`
      }), w.push({
        id: `ragcse:${c.id}:${G.uri}`,
        sourceId: oe,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), y.sort((c, C) => (c.parentId ? 1 : 0) - (C.parentId ? 1 : 0));
  const v = e.relations.map((c) => ({
    id: Gs(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Vs[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), $ = e.flows.map((c) => {
    var ye, lt, Le, ct, Ke, Y;
    const C = Ys(e, c), F = d ? e.modules.find((ee) => ee.id === c.sourceId) : void 0, G = ((ye = F == null ? void 0 : F.domainEvents) == null ? void 0 : ye.find((ee) => ee.name === c.triggerEvent)) ?? ((lt = F == null ? void 0 : F.applicationEvents) == null ? void 0 : lt.find((ee) => ee.name === c.triggerEvent)), Q = d && c.readModelName ? (ct = (Le = e.modules.find((ee) => ee.id === c.targetId)) == null ? void 0 : Le.readModels) == null ? void 0 : ct.find((ee) => ee.name === c.readModelName) : void 0, oe = d && c.targetUseCaseId ? (Y = (Ke = e.modules.find((ee) => ee.id === c.targetId)) == null ? void 0 : Ke.useCases) == null ? void 0 : Y.find((ee) => ee.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (G == null ? void 0 : G.id) ?? c.sourceId,
      targetId: (oe == null ? void 0 : oe.id) ?? (Q == null ? void 0 : Q.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Hs[C],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${C}`
    };
  }), O = new Map((e.apis ?? []).map((c) => [c.id, c])), N = new Set(e.modules.map((c) => c.id)), b = (e.apiImplementations ?? []).filter(
    (c) => O.has(c.apiId) && N.has(c.moduleId)
  ), x = new Set(y.map((c) => c.id)), k = d ? (e.emissions ?? []).filter((c) => x.has(c.sourceId) && x.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], E = d ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: C }) => C && c.readModelId).filter(({ p: c, source: C }) => x.has(C) && x.has(c.readModelId)).map(({ p: c, source: C }) => ({
    id: `proj:${c.id}`,
    sourceId: C,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((C) => {
      const F = d && C.targetUseCaseId && x.has(C.targetUseCaseId) ? C.targetUseCaseId : C.targetModuleId && x.has(C.targetModuleId) ? C.targetModuleId : (C.targetUseCaseId && !d, null);
      if (!F) return [];
      const G = d && x.has(C.id) ? C.id : c.id;
      return x.has(G) ? [
        {
          id: `apiwire:${C.id}`,
          sourceId: G,
          targetId: F,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${C.name} la implementa ${F}`
        }
      ] : [];
    })
  ), M = d ? (e.useCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], P = d ? (e.aggregateCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], q = d ? (e.queryCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], K = d ? (e.actorUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], p = (e.actorExternalDependencies ?? []).filter((c) => x.has(c.actorId) && x.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), _ = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), I = (c) => x.has(c) ? c : _.get(c) ?? c, S = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: I(c.targetId),
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
  ], L = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const C of c.useCases ?? []) L.set(C.id, c.id);
    for (const C of c.domainEvents ?? []) L.set(C.id, c.id);
    for (const C of c.applicationEvents ?? []) L.set(C.id, c.id);
  }
  const z = (c) => x.has(c) ? c : L.get(c) ?? c, T = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const C of c.domainEvents ?? []) T.set(C.name, C.id);
    for (const C of c.applicationEvents ?? []) T.set(C.name, C.id);
  }
  const U = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((C) => C.targetUseCaseId).map((C) => ({ sourceId: c.id, targetId: z(C.targetUseCaseId) }))
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && T.has(c.triggerEvent)).map((c) => ({
        sourceId: z(T.get(c.triggerEvent)),
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
  ], Z = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const C of c.tables ?? []) Z.set(C.id, c.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((C) => ({
          sourceId: x.has(C) ? C : Z.get(C) ?? C,
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
  ], pe = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((C) => ({
          sourceId: I(C),
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
  ], we = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((C) => ({ sourceId: C, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((C) => ({ sourceId: C, targetId: c.id, name: c.name }))
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
  ], ue = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: I(c.apiId) })).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], ve = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, dt = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((C) => C.id !== c.id && ve(C) === c.triggerEvent).filter((C) => x.has(C.id) && x.has(c.id)).map((C) => ({
      id: `wfchain:${C.id}->${c.id}`,
      sourceId: C.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), Is = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: I(c.id), targetId: I(c.targetApiId) })).filter(
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
  ], bs = b.flatMap((c) => {
    const C = Ve(c.apiId, c.moduleId);
    if (!x.has(C)) return [];
    const F = [];
    for (const G of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === c.apiId)) {
      const Q = I(G.id);
      x.has(Q) && Q !== C && F.push({
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
  }), _s = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const C = (e.proxyApis ?? []).find((Q) => Q.id === c.proxyId);
    if (!(C != null && C.targetApiId)) return [];
    const F = Fe(c.operationId, c.proxyId), G = c.targetSiteId === C.targetApiId ? C.targetApiId : Ve(C.targetApiId, c.targetSiteId);
    return !x.has(F) || !x.has(G) ? [] : [{
      id: `oproute:${F}->${G}`,
      sourceId: F,
      targetId: G,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ks = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!x.has(c.externalSystemId)) return null;
        const C = (e.apis ?? []).find(
          (oe) => oe.operations.some((ye) => ye.id === c.operationId)
        );
        if (!C) return null;
        const F = c.siteId === C.id, G = F ? c.operationId : Fe(c.operationId, c.siteId);
        let Q = x.has(G) ? G : null;
        if (!Q)
          if (F || (e.proxyApis ?? []).some((oe) => oe.id === c.siteId))
            Q = I(c.siteId);
          else {
            const oe = Ve(C.id, c.siteId);
            Q = x.has(oe) ? oe : c.siteId;
          }
        return !Q || !x.has(Q) || Q === c.externalSystemId ? null : { u: c, target: Q };
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
  ], $s = d ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!x.has(c.useCaseId)) return [];
    const C = x.has(Fe(c.operationId, c.moduleId)) ? Fe(c.operationId, c.moduleId) : x.has(Ve(c.apiId, c.moduleId)) ? Ve(c.apiId, c.moduleId) : x.has(I(c.moduleId)) ? I(c.moduleId) : null;
    return C ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: C,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Es = d ? (e.agentUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ss = (e.agentRags ?? []).filter((c) => x.has(c.agentId) && x.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), As = d ? (e.rags ?? []).filter((c) => x.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((C) => x.has(C)).map((C) => ({
      id: `ragsrc:${c.id}->${C}`,
      sourceId: c.id,
      targetId: C,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Cs = d ? (e.agentExternalUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ms = d ? (e.agentMcpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ps = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((C) => x.has(c.id) && x.has(C)).map((C) => ({
      id: `gwx:${c.id}->${C}`,
      sourceId: c.id,
      targetId: C,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Ns = (e.agentGatewayUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Os = d ? (e.agentApiOpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ts = d ? (e.agentQueryUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Rs = (e.agentDelegations ?? []).filter((c) => x.has(c.agentId) && x.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ds = (e.actorAgentUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Ls = d ? (e.agentTriggers ?? []).filter((c) => x.has(c.eventId) && x.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Us = d ? (e.externalCalls ?? []).filter((c) => x.has(c.externalSystemId) && x.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], zs = d ? (e.externalUseCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
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
    nodes: y,
    edges: [
      ...v,
      ...$,
      ...k,
      ...E,
      ...D,
      ...M,
      ...P,
      ...q,
      ...K,
      ...p,
      ...S,
      ...Is,
      ...bs,
      ..._s,
      ...ks,
      ...$s,
      ...U,
      ...X,
      ...dt,
      ...ue,
      ...J,
      ...pe,
      ...we,
      ...Es,
      ...Cs,
      ...Ms,
      ...Ps,
      ...Ns,
      ...Os,
      ...Ts,
      ...Rs,
      ...Ds,
      ...Ls,
      ...Ss,
      ...As,
      ...w,
      ...Us,
      ...zs
    ]
  };
}
const Qs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Zs = 176, Js = 60, eo = 140, to = 40;
function io(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, r) => {
    const d = 220 + r * 340;
    i.filter((a) => a.moduleId === s.id).forEach((a, l) => {
      const u = n.filter((f) => f.aggregateId === a.id).length, m = 140 + l * (170 + u * 60);
      t[a.id] = { x: d, y: m }, n.filter((f) => f.aggregateId === a.id).forEach((f, h) => {
        t[f.id] = { x: d + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((r) => r.id === s.moduleId)).forEach((s, r) => {
    t[s.id] = { x: 220 + r * 340, y: 640 };
  }), t;
}
function no(e, t) {
  const i = io(e), n = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((l) => [l.id, l])), r = (e.aggregates ?? []).map((l) => {
    const u = s.get(l.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: Zs,
      h: Js,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Qs[m],
      stroke: "#64748b",
      badge: u ? `${u.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${u ? ` — módulo ${u.name} (${m})` : ""}`
    };
  }), d = (e.entities ?? []).map((l) => {
    const u = n(l.id);
    return {
      id: l.id,
      label: l.name,
      x: u.x,
      y: u.y,
      w: eo,
      h: to,
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
  })), a = (e.aggregateReferences ?? []).map((l, u) => ({
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
    nodes: [...r, ...d],
    edges: [...o, ...a]
  };
}
const so = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, oo = 150, ao = 44, ro = 190, lo = 56, co = 160, po = 48;
function uo(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function ho(e, t) {
  const i = e.flows, n = [], s = [], r = /* @__PURE__ */ new Set(), d = (o) => {
    var a, l;
    return ((l = (a = e.aggregates) == null ? void 0 : a.find((u) => u.id === o)) == null ? void 0 : l.name) ?? o ?? "?";
  };
  return i.forEach((o, a) => {
    const l = 120 + a * 130, u = so[o.archetype] ?? "#475569", m = o.triggerAggregateId ?? o.sourceId;
    if (!r.has(m)) {
      r.add(m);
      const w = t[m] ?? { x: 160, y: l };
      n.push({
        id: m,
        label: o.triggerAggregateId ? d(o.triggerAggregateId) : m,
        x: w.x,
        y: w.y,
        w: oo,
        h: ao,
        kind: o.triggerAggregateId ? "aggregate" : "module",
        symbol: o.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: o.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${o.id}`, h = t[f] ?? { x: 470, y: l };
    n.push({
      id: f,
      label: o.name,
      x: h.x,
      y: h.y,
      w: ro,
      h: lo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: o.archetype,
      tooltip: `Flow ${o.name} [${o.archetype}]${o.readModelName ? ` → read model ${o.readModelName}` : ""}${o.targetUseCaseId ? ` → use case ${o.targetUseCaseId}` : ""}`
    });
    const y = uo(e, o), g = `tgt:${y.id}`;
    if (!r.has(g)) {
      r.add(g);
      const w = t[g] ?? { x: 790, y: l };
      n.push({
        id: g,
        label: y.label,
        x: w.x,
        y: w.y,
        w: co,
        h: po,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${o.id}:in`,
      sourceId: m,
      targetId: f,
      kind: "flow-trigger",
      label: o.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: o.triggerEvent ? `Evento: ${o.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${o.id}:out`,
      sourceId: f,
      targetId: g,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const mo = 190, fo = 56, gi = 170, go = 52;
function Ji(e, t) {
  const i = [], n = [], s = (r) => {
    var d;
    return (d = e.modules.find((o) => o.id === r)) == null ? void 0 : d.name;
  };
  return (e.processes ?? []).forEach((r, d) => {
    const o = 140 + d * 240, a = t[r.id] ?? { x: 150, y: o };
    i.push({
      id: r.id,
      label: r.name,
      x: a.x,
      y: a.y,
      w: mo,
      h: fo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${s(r.ownerModuleId) ? ` — módulo ${s(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let l = r.id;
    if (r.steps.forEach((u, m) => {
      const f = u.type === "HUMAN", h = t[u.id] ?? { x: 150 + (m + 1) * 240, y: o };
      if (i.push({
        id: u.id,
        label: u.name,
        x: h.x,
        y: h.y,
        w: gi,
        h: go,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), n.push({
        id: `pe:${r.id}:${m}`,
        sourceId: l,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? r.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const y = `comp:${u.id}`, g = t[y] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: y,
          label: u.compensationUseCaseId,
          x: g.x,
          y: g.y,
          w: gi,
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
      l = u.id;
    }), r.onCompletionEventName) {
      const u = `done:${r.id}`, m = t[u] ?? { x: 150 + (r.steps.length + 1) * 240, y: o };
      i.push({
        id: u,
        label: r.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: gi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${r.id}`,
        sourceId: l,
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
const jt = globalThis, Ui = jt.ShadowRoot && (jt.ShadyCSS === void 0 || jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, zi = Symbol(), en = /* @__PURE__ */ new WeakMap();
let Bn = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== zi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ui && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = en.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && en.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const yo = (e) => new Bn(typeof e == "string" ? e : e + "", void 0, zi), Nt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, r) => n + ((d) => {
    if (d._$cssResult$ === !0) return d.cssText;
    if (typeof d == "number") return d;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + d + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[r + 1], e[0]);
  return new Bn(i, e, zi);
}, wo = (e, t) => {
  if (Ui) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = jt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, tn = Ui ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return yo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vo, defineProperty: xo, getOwnPropertyDescriptor: Io, getOwnPropertyNames: bo, getOwnPropertySymbols: _o, getPrototypeOf: ko } = Object, De = globalThis, nn = De.trustedTypes, $o = nn ? nn.emptyScript : "", yi = De.reactiveElementPolyfillSupport, It = (e, t) => e, Jt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? $o : null;
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
} }, qi = (e, t) => !vo(e, t), sn = { attribute: !0, type: String, converter: Jt, reflect: !1, useDefault: !1, hasChanged: qi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), De.litPropertyMetadata ?? (De.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let tt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = sn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && xo(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: r } = Io(this.prototype, t) ?? { get() {
      return this[i];
    }, set(d) {
      this[i] = d;
    } };
    return { get: s, set(d) {
      const o = s == null ? void 0 : s.call(this);
      r == null || r.call(this, d), this.requestUpdate(t, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? sn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(It("elementProperties"))) return;
    const t = ko(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(It("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(It("properties"))) {
      const i = this.properties, n = [...bo(i), ..._o(i)];
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
      for (const s of n) i.unshift(tn(s));
    } else t !== void 0 && i.push(tn(t));
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
    var r;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const d = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : Jt).toAttribute(i, n.type);
      this._$Em = t, d == null ? this.removeAttribute(s) : this.setAttribute(s, d), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var r, d;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : Jt;
      this._$Em = s;
      const l = a.fromAttribute(i, o.type);
      this[s] = l ?? ((d = this._$Ej) == null ? void 0 : d.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, r) {
    var d;
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), n ?? (n = o.getPropertyOptions(t)), !((n.hasChanged ?? qi)(r, i) || n.useDefault && n.reflect && r === ((d = this._$Ej) == null ? void 0 : d.get(t)) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: r }, d) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, d ?? i ?? this[t]), r !== !0 || d !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, d] of this._$Ep) this[r] = d;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, d] of s) {
        const { wrapped: o } = d, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, d, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
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
tt.elementStyles = [], tt.shadowRootOptions = { mode: "open" }, tt[It("elementProperties")] = /* @__PURE__ */ new Map(), tt[It("finalized")] = /* @__PURE__ */ new Map(), yi == null || yi({ ReactiveElement: tt }), (De.reactiveElementVersions ?? (De.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, on = (e) => e, ei = bt.trustedTypes, an = ei ? ei.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wn = "$lit$", Re = `lit$${Math.random().toFixed(9).slice(2)}$`, Gn = "?" + Re, Eo = `<${Gn}>`, Ye = document, $t = () => Ye.createComment(""), Et = (e) => e === null || typeof e != "object" && typeof e != "function", Fi = Array.isArray, So = (e) => Fi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", wi = `[ 	
\f\r]`, mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rn = /-->/g, dn = />/g, Ue = RegExp(`>|${wi}(?:([^\\s"'>=/]+)(${wi}*=${wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ln = /'/g, cn = /"/g, Yn = /^(?:script|style|textarea|title)$/i, jn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = jn(1), W = jn(2), st = Symbol.for("lit-noChange"), ne = Symbol.for("lit-nothing"), pn = /* @__PURE__ */ new WeakMap(), He = Ye.createTreeWalker(Ye, 129);
function Xn(e, t) {
  if (!Fi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return an !== void 0 ? an.createHTML(t) : t;
}
const Ao = (e, t) => {
  const i = e.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", d = mt;
  for (let o = 0; o < i; o++) {
    const a = e[o];
    let l, u, m = -1, f = 0;
    for (; f < a.length && (d.lastIndex = f, u = d.exec(a), u !== null); ) f = d.lastIndex, d === mt ? u[1] === "!--" ? d = rn : u[1] !== void 0 ? d = dn : u[2] !== void 0 ? (Yn.test(u[2]) && (s = RegExp("</" + u[2], "g")), d = Ue) : u[3] !== void 0 && (d = Ue) : d === Ue ? u[0] === ">" ? (d = s ?? mt, m = -1) : u[1] === void 0 ? m = -2 : (m = d.lastIndex - u[2].length, l = u[1], d = u[3] === void 0 ? Ue : u[3] === '"' ? cn : ln) : d === cn || d === ln ? d = Ue : d === rn || d === dn ? d = mt : (d = Ue, s = void 0);
    const h = d === Ue && e[o + 1].startsWith("/>") ? " " : "";
    r += d === mt ? a + Eo : m >= 0 ? (n.push(l), a.slice(0, m) + Wn + a.slice(m) + Re + h) : a + Re + (m === -2 ? o : h);
  }
  return [Xn(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class St {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, d = 0;
    const o = t.length - 1, a = this.parts, [l, u] = Ao(t, i);
    if (this.el = St.createElement(l, n), He.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = He.nextNode()) !== null && a.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Wn)) {
          const f = u[d++], h = s.getAttribute(m).split(Re), y = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: y[2], strings: h, ctor: y[1] === "." ? Mo : y[1] === "?" ? Po : y[1] === "@" ? No : ri }), s.removeAttribute(m);
        } else m.startsWith(Re) && (a.push({ type: 6, index: r }), s.removeAttribute(m));
        if (Yn.test(s.tagName)) {
          const m = s.textContent.split(Re), f = m.length - 1;
          if (f > 0) {
            s.textContent = ei ? ei.emptyScript : "";
            for (let h = 0; h < f; h++) s.append(m[h], $t()), He.nextNode(), a.push({ type: 2, index: ++r });
            s.append(m[f], $t());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gn) a.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Re, m + 1)) !== -1; ) a.push({ type: 7, index: r }), m += Re.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = Ye.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ot(e, t, i = e, n) {
  var d, o;
  if (t === st) return t;
  let s = n !== void 0 ? (d = i._$Co) == null ? void 0 : d[n] : i._$Cl;
  const r = Et(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), r === void 0 ? s = void 0 : (s = new r(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = ot(e, s._$AS(e, t.values), s, n)), t;
}
class Co {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Ye).importNode(i, !0);
    He.currentNode = s;
    let r = He.nextNode(), d = 0, o = 0, a = n[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let l;
        a.type === 2 ? l = new Ot(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new Oo(r, this, t)), this._$AV.push(l), a = n[++o];
      }
      d !== (a == null ? void 0 : a.index) && (r = He.nextNode(), d++);
    }
    return He.currentNode = Ye, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = ne, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = ot(this, t, i), Et(t) ? t === ne || t == null || t === "" ? (this._$AH !== ne && this._$AR(), this._$AH = ne) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : So(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ne && Et(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ye.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = St.createElement(Xn(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(i);
    else {
      const d = new Co(s, this), o = d.u(this.options);
      d.p(i), this.T(o), this._$AH = d;
    }
  }
  _$AC(t) {
    let i = pn.get(t.strings);
    return i === void 0 && pn.set(t.strings, i = new St(t)), i;
  }
  k(t) {
    Fi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of t) s === i.length ? i.push(n = new Ot(this.O($t()), this.O($t()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = on(t).nextSibling;
      on(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class ri {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, r) {
    this.type = 1, this._$AH = ne, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ne;
  }
  _$AI(t, i = this, n, s) {
    const r = this.strings;
    let d = !1;
    if (r === void 0) t = ot(this, t, i, 0), d = !Et(t) || t !== this._$AH && t !== st, d && (this._$AH = t);
    else {
      const o = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = ot(this, o[n + a], i, a), l === st && (l = this._$AH[a]), d || (d = !Et(l) || l !== this._$AH[a]), l === ne ? t = ne : t !== ne && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    d && !s && this.j(t);
  }
  j(t) {
    t === ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mo extends ri {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ne ? void 0 : t;
  }
}
class Po extends ri {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ne);
  }
}
class No extends ri {
  constructor(t, i, n, s, r) {
    super(t, i, n, s, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ot(this, t, i, 0) ?? ne) === st) return;
    const n = this._$AH, s = t === ne && n !== ne || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== ne && (n === ne || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Oo {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ot(this, t);
  }
}
const vi = bt.litHtmlPolyfillSupport;
vi == null || vi(St, Ot), (bt.litHtmlVersions ?? (bt.litHtmlVersions = [])).push("3.3.3");
const To = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Ot(t.insertBefore($t(), r), r, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis;
class Ne extends tt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = To(i, this.renderRoot, this.renderOptions);
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
    return st;
  }
}
var Dn;
Ne._$litElement$ = !0, Ne.finalized = !0, (Dn = We.litElementHydrateSupport) == null || Dn.call(We, { LitElement: Ne });
const xi = We.litElementPolyfillSupport;
xi == null || xi({ LitElement: Ne });
(We.litElementVersions ?? (We.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ro = { attribute: !0, type: String, converter: Jt, reflect: !1, hasChanged: qi }, Do = (e = Ro, t, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: d } = i;
    return { set(o) {
      const a = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(d, a, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(d, void 0, e, o), o;
    } };
  }
  if (n === "setter") {
    const { name: d } = i;
    return function(o) {
      const a = this[d];
      t.call(this, o), this.requestUpdate(d, a, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function le(e) {
  return (t, i) => typeof i == "object" ? Do(e, t, i) : ((n, s, r) => {
    const d = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), d ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(e) {
  return le({ ...e, state: !0, attribute: !1 });
}
var Si = "http://www.w3.org/1999/xhtml";
const un = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Si,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function di(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), un.hasOwnProperty(t) ? { space: un[t], local: e } : e;
}
function Lo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Si && t.documentElement.namespaceURI === Si ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Uo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Kn(e) {
  var t = di(e);
  return (t.local ? Uo : Lo)(t);
}
function zo() {
}
function Vi(e) {
  return e == null ? zo : function() {
    return this.querySelector(e);
  };
}
function qo(e) {
  typeof e != "function" && (e = Vi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = t[s], d = r.length, o = n[s] = new Array(d), a, l, u = 0; u < d; ++u)
      (a = r[u]) && (l = e.call(a, a.__data__, u, r)) && ("__data__" in a && (l.__data__ = a.__data__), o[u] = l);
  return new me(n, this._parents);
}
function Fo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Vo() {
  return [];
}
function Qn(e) {
  return e == null ? Vo : function() {
    return this.querySelectorAll(e);
  };
}
function Ho(e) {
  return function() {
    return Fo(e.apply(this, arguments));
  };
}
function Bo(e) {
  typeof e == "function" ? e = Ho(e) : e = Qn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], r = 0; r < i; ++r)
    for (var d = t[r], o = d.length, a, l = 0; l < o; ++l)
      (a = d[l]) && (n.push(e.call(a, a.__data__, l, d)), s.push(a));
  return new me(n, s);
}
function Zn(e) {
  return function() {
    return this.matches(e);
  };
}
function Jn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Wo = Array.prototype.find;
function Go(e) {
  return function() {
    return Wo.call(this.children, e);
  };
}
function Yo() {
  return this.firstElementChild;
}
function jo(e) {
  return this.select(e == null ? Yo : Go(typeof e == "function" ? e : Jn(e)));
}
var Xo = Array.prototype.filter;
function Ko() {
  return Array.from(this.children);
}
function Qo(e) {
  return function() {
    return Xo.call(this.children, e);
  };
}
function Zo(e) {
  return this.selectAll(e == null ? Ko : Qo(typeof e == "function" ? e : Jn(e)));
}
function Jo(e) {
  typeof e != "function" && (e = Zn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = t[s], d = r.length, o = n[s] = [], a, l = 0; l < d; ++l)
      (a = r[l]) && e.call(a, a.__data__, l, r) && o.push(a);
  return new me(n, this._parents);
}
function es(e) {
  return new Array(e.length);
}
function ea() {
  return new me(this._enter || this._groups.map(es), this._parents);
}
function ti(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ti.prototype = {
  constructor: ti,
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
function ta(e) {
  return function() {
    return e;
  };
}
function ia(e, t, i, n, s, r) {
  for (var d = 0, o, a = t.length, l = r.length; d < l; ++d)
    (o = t[d]) ? (o.__data__ = r[d], n[d] = o) : i[d] = new ti(e, r[d]);
  for (; d < a; ++d)
    (o = t[d]) && (s[d] = o);
}
function na(e, t, i, n, s, r, d) {
  var o, a, l = /* @__PURE__ */ new Map(), u = t.length, m = r.length, f = new Array(u), h;
  for (o = 0; o < u; ++o)
    (a = t[o]) && (f[o] = h = d.call(a, a.__data__, o, t) + "", l.has(h) ? s[o] = a : l.set(h, a));
  for (o = 0; o < m; ++o)
    h = d.call(e, r[o], o, r) + "", (a = l.get(h)) ? (n[o] = a, a.__data__ = r[o], l.delete(h)) : i[o] = new ti(e, r[o]);
  for (o = 0; o < u; ++o)
    (a = t[o]) && l.get(f[o]) === a && (s[o] = a);
}
function sa(e) {
  return e.__data__;
}
function oa(e, t) {
  if (!arguments.length) return Array.from(this, sa);
  var i = t ? na : ia, n = this._parents, s = this._groups;
  typeof e != "function" && (e = ta(e));
  for (var r = s.length, d = new Array(r), o = new Array(r), a = new Array(r), l = 0; l < r; ++l) {
    var u = n[l], m = s[l], f = m.length, h = aa(e.call(u, u && u.__data__, l, n)), y = h.length, g = o[l] = new Array(y), w = d[l] = new Array(y), v = a[l] = new Array(f);
    i(u, m, g, w, v, h, t);
    for (var $ = 0, O = 0, N, b; $ < y; ++$)
      if (N = g[$]) {
        for ($ >= O && (O = $ + 1); !(b = w[O]) && ++O < y; ) ;
        N._next = b || null;
      }
  }
  return d = new me(d, n), d._enter = o, d._exit = a, d;
}
function aa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ra() {
  return new me(this._exit || this._groups.map(es), this._parents);
}
function da(e, t, i) {
  var n = this.enter(), s = this, r = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? r.remove() : i(r), n && s ? n.merge(s).order() : s;
}
function la(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, r = n.length, d = Math.min(s, r), o = new Array(s), a = 0; a < d; ++a)
    for (var l = i[a], u = n[a], m = l.length, f = o[a] = new Array(m), h, y = 0; y < m; ++y)
      (h = l[y] || u[y]) && (f[y] = h);
  for (; a < s; ++a)
    o[a] = i[a];
  return new me(o, this._parents);
}
function ca() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, r = n[s], d; --s >= 0; )
      (d = n[s]) && (r && d.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(d, r), r = d);
  return this;
}
function pa(e) {
  e || (e = ua);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), r = 0; r < n; ++r) {
    for (var d = i[r], o = d.length, a = s[r] = new Array(o), l, u = 0; u < o; ++u)
      (l = d[u]) && (a[u] = l);
    a.sort(t);
  }
  return new me(s, this._parents).order();
}
function ua(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ha() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function ma() {
  return Array.from(this);
}
function fa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, r = n.length; s < r; ++s) {
      var d = n[s];
      if (d) return d;
    }
  return null;
}
function ga() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ya() {
  return !this.node();
}
function wa(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], r = 0, d = s.length, o; r < d; ++r)
      (o = s[r]) && e.call(o, o.__data__, r, s);
  return this;
}
function va(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function xa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ia(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ba(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function _a(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function ka(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function $a(e, t) {
  var i = di(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? xa : va : typeof t == "function" ? i.local ? ka : _a : i.local ? ba : Ia)(i, t));
}
function ts(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ea(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Sa(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Aa(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Ca(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ea : typeof t == "function" ? Aa : Sa)(e, t, i ?? "")) : at(this.node(), e);
}
function at(e, t) {
  return e.style.getPropertyValue(t) || ts(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ma(e) {
  return function() {
    delete this[e];
  };
}
function Pa(e, t) {
  return function() {
    this[e] = t;
  };
}
function Na(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Oa(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ma : typeof t == "function" ? Na : Pa)(e, t)) : this.node()[e];
}
function is(e) {
  return e.trim().split(/^|\s+/);
}
function Hi(e) {
  return e.classList || new ns(e);
}
function ns(e) {
  this._node = e, this._names = is(e.getAttribute("class") || "");
}
ns.prototype = {
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
function ss(e, t) {
  for (var i = Hi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function os(e, t) {
  for (var i = Hi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Ta(e) {
  return function() {
    ss(this, e);
  };
}
function Ra(e) {
  return function() {
    os(this, e);
  };
}
function Da(e, t) {
  return function() {
    (t.apply(this, arguments) ? ss : os)(this, e);
  };
}
function La(e, t) {
  var i = is(e + "");
  if (arguments.length < 2) {
    for (var n = Hi(this.node()), s = -1, r = i.length; ++s < r; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Da : t ? Ta : Ra)(i, t));
}
function Ua() {
  this.textContent = "";
}
function za(e) {
  return function() {
    this.textContent = e;
  };
}
function qa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Fa(e) {
  return arguments.length ? this.each(e == null ? Ua : (typeof e == "function" ? qa : za)(e)) : this.node().textContent;
}
function Va() {
  this.innerHTML = "";
}
function Ha(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Ba(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Wa(e) {
  return arguments.length ? this.each(e == null ? Va : (typeof e == "function" ? Ba : Ha)(e)) : this.node().innerHTML;
}
function Ga() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ya() {
  return this.each(Ga);
}
function ja() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Xa() {
  return this.each(ja);
}
function Ka(e) {
  var t = typeof e == "function" ? e : Kn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Qa() {
  return null;
}
function Za(e, t) {
  var i = typeof e == "function" ? e : Kn(e), n = t == null ? Qa : typeof t == "function" ? t : Vi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Ja() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function er() {
  return this.each(Ja);
}
function tr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ir() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function nr(e) {
  return this.select(e ? ir : tr);
}
function sr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function or(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ar(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function rr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, r; i < s; ++i)
        r = t[i], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++n] = r;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function dr(e, t, i) {
  return function() {
    var n = this.__on, s, r = or(t);
    if (n) {
      for (var d = 0, o = n.length; d < o; ++d)
        if ((s = n[d]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = r, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, i), s = { type: e.type, name: e.name, value: t, listener: r, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function lr(e, t, i) {
  var n = ar(e + ""), s, r = n.length, d;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var a = 0, l = o.length, u; a < l; ++a)
        for (s = 0, u = o[a]; s < r; ++s)
          if ((d = n[s]).type === u.type && d.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = t ? dr : rr, s = 0; s < r; ++s) this.each(o(n[s], t, i));
  return this;
}
function as(e, t, i) {
  var n = ts(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function cr(e, t) {
  return function() {
    return as(this, e, t);
  };
}
function pr(e, t) {
  return function() {
    return as(this, e, t.apply(this, arguments));
  };
}
function ur(e, t) {
  return this.each((typeof t == "function" ? pr : cr)(e, t));
}
function* hr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, r = n.length, d; s < r; ++s)
      (d = n[s]) && (yield d);
}
var rs = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function Rt() {
  return new me([[document.documentElement]], rs);
}
function mr() {
  return this;
}
me.prototype = Rt.prototype = {
  constructor: me,
  select: qo,
  selectAll: Bo,
  selectChild: jo,
  selectChildren: Zo,
  filter: Jo,
  data: oa,
  enter: ea,
  exit: ra,
  join: da,
  merge: la,
  selection: mr,
  order: ca,
  sort: pa,
  call: ha,
  nodes: ma,
  node: fa,
  size: ga,
  empty: ya,
  each: wa,
  attr: $a,
  style: Ca,
  property: Oa,
  classed: La,
  text: Fa,
  html: Wa,
  raise: Ya,
  lower: Xa,
  append: Ka,
  insert: Za,
  remove: er,
  clone: nr,
  datum: sr,
  on: lr,
  dispatch: ur,
  [Symbol.iterator]: hr
};
function be(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], rs);
}
function fr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ze(e, t) {
  if (e = fr(e), t === void 0 && (t = e.currentTarget), t) {
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
var gr = { value: () => {
} };
function Bi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Xt(i);
}
function Xt(e) {
  this._ = e;
}
function yr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Xt.prototype = Bi.prototype = {
  constructor: Xt,
  on: function(e, t) {
    var i = this._, n = yr(e + "", i), s, r = -1, d = n.length;
    if (arguments.length < 2) {
      for (; ++r < d; ) if ((s = (e = n[r]).type) && (s = wr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < d; )
      if (s = (e = n[r]).type) i[s] = hn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = hn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Xt(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, r; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], n = 0, s = r.length; n < s; ++n) r[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], s = 0, r = n.length; s < r; ++s) n[s].value.apply(t, i);
  }
};
function wr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function hn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = gr, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ai = { capture: !0, passive: !1 };
function Ci(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function vr(e) {
  var t = e.document.documentElement, i = be(e).on("dragstart.drag", Ci, Ai);
  "onselectstart" in t ? i.on("selectstart.drag", Ci, Ai) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function xr(e, t) {
  var i = e.document.documentElement, n = be(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Ci, Ai), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Wi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ds(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Dt() {
}
var At = 0.7, ii = 1 / At, nt = "\\s*([+-]?\\d+)\\s*", Ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ir = /^#([0-9a-f]{3,8})$/, br = new RegExp(`^rgb\\(${nt},${nt},${nt}\\)$`), _r = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), kr = new RegExp(`^rgba\\(${nt},${nt},${nt},${Ct}\\)$`), $r = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${Ct}\\)$`), Er = new RegExp(`^hsl\\(${Ct},${Ee},${Ee}\\)$`), Sr = new RegExp(`^hsla\\(${Ct},${Ee},${Ee},${Ct}\\)$`), mn = {
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
Wi(Dt, Mt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: fn,
  // Deprecated! Use color.formatHex.
  formatHex: fn,
  formatHex8: Ar,
  formatHsl: Cr,
  formatRgb: gn,
  toString: gn
});
function fn() {
  return this.rgb().formatHex();
}
function Ar() {
  return this.rgb().formatHex8();
}
function Cr() {
  return ls(this).formatHsl();
}
function gn() {
  return this.rgb().formatRgb();
}
function Mt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Ir.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? yn(t) : i === 3 ? new ce(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ft(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ft(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = br.exec(e)) ? new ce(t[1], t[2], t[3], 1) : (t = _r.exec(e)) ? new ce(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = kr.exec(e)) ? Ft(t[1], t[2], t[3], t[4]) : (t = $r.exec(e)) ? Ft(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Er.exec(e)) ? xn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Sr.exec(e)) ? xn(t[1], t[2] / 100, t[3] / 100, t[4]) : mn.hasOwnProperty(e) ? yn(mn[e]) : e === "transparent" ? new ce(NaN, NaN, NaN, 0) : null;
}
function yn(e) {
  return new ce(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ft(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ce(e, t, i, n);
}
function Mr(e) {
  return e instanceof Dt || (e = Mt(e)), e ? (e = e.rgb(), new ce(e.r, e.g, e.b, e.opacity)) : new ce();
}
function Mi(e, t, i, n) {
  return arguments.length === 1 ? Mr(e) : new ce(e, t, i, n ?? 1);
}
function ce(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Wi(ce, Mi, ds(Dt, {
  brighter(e) {
    return e = e == null ? ii : Math.pow(ii, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? At : Math.pow(At, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ce(Ge(this.r), Ge(this.g), Ge(this.b), ni(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wn,
  // Deprecated! Use color.formatHex.
  formatHex: wn,
  formatHex8: Pr,
  formatRgb: vn,
  toString: vn
}));
function wn() {
  return `#${Be(this.r)}${Be(this.g)}${Be(this.b)}`;
}
function Pr() {
  return `#${Be(this.r)}${Be(this.g)}${Be(this.b)}${Be((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vn() {
  const e = ni(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ge(this.r)}, ${Ge(this.g)}, ${Ge(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ni(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ge(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Be(e) {
  return e = Ge(e), (e < 16 ? "0" : "") + e.toString(16);
}
function xn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new _e(e, t, i, n);
}
function ls(e) {
  if (e instanceof _e) return new _e(e.h, e.s, e.l, e.opacity);
  if (e instanceof Dt || (e = Mt(e)), !e) return new _e();
  if (e instanceof _e) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), r = Math.max(t, i, n), d = NaN, o = r - s, a = (r + s) / 2;
  return o ? (t === r ? d = (i - n) / o + (i < n) * 6 : i === r ? d = (n - t) / o + 2 : d = (t - i) / o + 4, o /= a < 0.5 ? r + s : 2 - r - s, d *= 60) : o = a > 0 && a < 1 ? 0 : d, new _e(d, o, a, e.opacity);
}
function Nr(e, t, i, n) {
  return arguments.length === 1 ? ls(e) : new _e(e, t, i, n ?? 1);
}
function _e(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Wi(_e, Nr, ds(Dt, {
  brighter(e) {
    return e = e == null ? ii : Math.pow(ii, e), new _e(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? At : Math.pow(At, e), new _e(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ce(
      Ii(e >= 240 ? e - 240 : e + 120, s, n),
      Ii(e, s, n),
      Ii(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new _e(In(this.h), Vt(this.s), Vt(this.l), ni(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ni(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${In(this.h)}, ${Vt(this.s) * 100}%, ${Vt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function In(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Vt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ii(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const cs = (e) => () => e;
function Or(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Tr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Rr(e) {
  return (e = +e) == 1 ? ps : function(t, i) {
    return i - t ? Tr(t, i, e) : cs(isNaN(t) ? i : t);
  };
}
function ps(e, t) {
  var i = t - e;
  return i ? Or(e, i) : cs(isNaN(e) ? t : e);
}
const bn = (function e(t) {
  var i = Rr(t);
  function n(s, r) {
    var d = i((s = Mi(s)).r, (r = Mi(r)).r), o = i(s.g, r.g), a = i(s.b, r.b), l = ps(s.opacity, r.opacity);
    return function(u) {
      return s.r = d(u), s.g = o(u), s.b = a(u), s.opacity = l(u), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Te(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Pi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, bi = new RegExp(Pi.source, "g");
function Dr(e) {
  return function() {
    return e;
  };
}
function Lr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ur(e, t) {
  var i = Pi.lastIndex = bi.lastIndex = 0, n, s, r, d = -1, o = [], a = [];
  for (e = e + "", t = t + ""; (n = Pi.exec(e)) && (s = bi.exec(t)); )
    (r = s.index) > i && (r = t.slice(i, r), o[d] ? o[d] += r : o[++d] = r), (n = n[0]) === (s = s[0]) ? o[d] ? o[d] += s : o[++d] = s : (o[++d] = null, a.push({ i: d, x: Te(n, s) })), i = bi.lastIndex;
  return i < t.length && (r = t.slice(i), o[d] ? o[d] += r : o[++d] = r), o.length < 2 ? a[0] ? Lr(a[0].x) : Dr(t) : (t = a.length, function(l) {
    for (var u = 0, m; u < t; ++u) o[(m = a[u]).i] = m.x(l);
    return o.join("");
  });
}
var _n = 180 / Math.PI, Ni = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function us(e, t, i, n, s, r) {
  var d, o, a;
  return (d = Math.sqrt(e * e + t * t)) && (e /= d, t /= d), (a = e * i + t * n) && (i -= e * a, n -= t * a), (o = Math.sqrt(i * i + n * n)) && (i /= o, n /= o, a /= o), e * n < t * i && (e = -e, t = -t, a = -a, d = -d), {
    translateX: s,
    translateY: r,
    rotate: Math.atan2(t, e) * _n,
    skewX: Math.atan(a) * _n,
    scaleX: d,
    scaleY: o
  };
}
var Ht;
function zr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ni : us(t.a, t.b, t.c, t.d, t.e, t.f);
}
function qr(e) {
  return e == null || (Ht || (Ht = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ht.setAttribute("transform", e), !(e = Ht.transform.baseVal.consolidate())) ? Ni : (e = e.matrix, us(e.a, e.b, e.c, e.d, e.e, e.f));
}
function hs(e, t, i, n) {
  function s(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, u, m, f, h, y) {
    if (l !== m || u !== f) {
      var g = h.push("translate(", null, t, null, i);
      y.push({ i: g - 4, x: Te(l, m) }, { i: g - 2, x: Te(u, f) });
    } else (m || f) && h.push("translate(" + m + t + f + i);
  }
  function d(l, u, m, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Te(l, u) })) : u && m.push(s(m) + "rotate(" + u + n);
  }
  function o(l, u, m, f) {
    l !== u ? f.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Te(l, u) }) : u && m.push(s(m) + "skewX(" + u + n);
  }
  function a(l, u, m, f, h, y) {
    if (l !== m || u !== f) {
      var g = h.push(s(h) + "scale(", null, ",", null, ")");
      y.push({ i: g - 4, x: Te(l, m) }, { i: g - 2, x: Te(u, f) });
    } else (m !== 1 || f !== 1) && h.push(s(h) + "scale(" + m + "," + f + ")");
  }
  return function(l, u) {
    var m = [], f = [];
    return l = e(l), u = e(u), r(l.translateX, l.translateY, u.translateX, u.translateY, m, f), d(l.rotate, u.rotate, m, f), o(l.skewX, u.skewX, m, f), a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, m, f), l = u = null, function(h) {
      for (var y = -1, g = f.length, w; ++y < g; ) m[(w = f[y]).i] = w.x(h);
      return m.join("");
    };
  };
}
var Fr = hs(zr, "px, ", "px)", "deg)"), Vr = hs(qr, ", ", ")", ")"), Hr = 1e-12;
function kn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Br(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Wr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Gr = (function e(t, i, n) {
  function s(r, d) {
    var o = r[0], a = r[1], l = r[2], u = d[0], m = d[1], f = d[2], h = u - o, y = m - a, g = h * h + y * y, w, v;
    if (g < Hr)
      v = Math.log(f / l) / t, w = function(k) {
        return [
          o + k * h,
          a + k * y,
          l * Math.exp(t * k * v)
        ];
      };
    else {
      var $ = Math.sqrt(g), O = (f * f - l * l + n * g) / (2 * l * i * $), N = (f * f - l * l - n * g) / (2 * f * i * $), b = Math.log(Math.sqrt(O * O + 1) - O), x = Math.log(Math.sqrt(N * N + 1) - N);
      v = (x - b) / t, w = function(k) {
        var E = k * v, D = kn(b), M = l / (i * $) * (D * Wr(t * E + b) - Br(b));
        return [
          o + M * h,
          a + M * y,
          l * D / kn(t * E + b)
        ];
      };
    }
    return w.duration = v * 1e3 * t / Math.SQRT2, w;
  }
  return s.rho = function(r) {
    var d = Math.max(1e-3, +r), o = d * d, a = o * o;
    return e(d, o, a);
  }, s;
})(Math.SQRT2, 2, 4);
var rt = 0, vt = 0, ft = 0, ms = 1e3, si, xt, oi = 0, je = 0, li = 0, Pt = typeof performance == "object" && performance.now ? performance : Date, fs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Gi() {
  return je || (fs(Yr), je = Pt.now() + li);
}
function Yr() {
  je = 0;
}
function ai() {
  this._call = this._time = this._next = null;
}
ai.prototype = gs.prototype = {
  constructor: ai,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Gi() : +i) + (t == null ? 0 : +t), !this._next && xt !== this && (xt ? xt._next = this : si = this, xt = this), this._call = e, this._time = i, Oi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Oi());
  }
};
function gs(e, t, i) {
  var n = new ai();
  return n.restart(e, t, i), n;
}
function jr() {
  Gi(), ++rt;
  for (var e = si, t; e; )
    (t = je - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --rt;
}
function $n() {
  je = (oi = Pt.now()) + li, rt = vt = 0;
  try {
    jr();
  } finally {
    rt = 0, Kr(), je = 0;
  }
}
function Xr() {
  var e = Pt.now(), t = e - oi;
  t > ms && (li -= t, oi = e);
}
function Kr() {
  for (var e, t = si, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : si = i);
  xt = e, Oi(n);
}
function Oi(e) {
  if (!rt) {
    vt && (vt = clearTimeout(vt));
    var t = e - je;
    t > 24 ? (e < 1 / 0 && (vt = setTimeout($n, e - Pt.now() - li)), ft && (ft = clearInterval(ft))) : (ft || (oi = Pt.now(), ft = setInterval(Xr, ms)), rt = 1, fs($n));
  }
}
function En(e, t, i) {
  var n = new ai();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Qr = Bi("start", "end", "cancel", "interrupt"), Zr = [], ys = 0, Sn = 1, Ti = 2, Kt = 3, An = 4, Ri = 5, Qt = 6;
function ci(e, t, i, n, s, r) {
  var d = e.__transition;
  if (!d) e.__transition = {};
  else if (i in d) return;
  Jr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Qr,
    tween: Zr,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: ys
  });
}
function Yi(e, t) {
  var i = ke(e, t);
  if (i.state > ys) throw new Error("too late; already scheduled");
  return i;
}
function Se(e, t) {
  var i = ke(e, t);
  if (i.state > Kt) throw new Error("too late; already running");
  return i;
}
function ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Jr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = gs(r, 0, i.time);
  function r(l) {
    i.state = Sn, i.timer.restart(d, i.delay, i.time), i.delay <= l && d(l - i.delay);
  }
  function d(l) {
    var u, m, f, h;
    if (i.state !== Sn) return a();
    for (u in n)
      if (h = n[u], h.name === i.name) {
        if (h.state === Kt) return En(d);
        h.state === An ? (h.state = Qt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[u]) : +u < t && (h.state = Qt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[u]);
      }
    if (En(function() {
      i.state === Kt && (i.state = An, i.timer.restart(o, i.delay, i.time), o(l));
    }), i.state = Ti, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Ti) {
      for (i.state = Kt, s = new Array(f = i.tween.length), u = 0, m = -1; u < f; ++u)
        (h = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = h);
      s.length = m + 1;
    }
  }
  function o(l) {
    for (var u = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(a), i.state = Ri, 1), m = -1, f = s.length; ++m < f; )
      s[m].call(e, u);
    i.state === Ri && (i.on.call("end", e, e.__data__, i.index, i.group), a());
  }
  function a() {
    i.state = Qt, i.timer.stop(), delete n[t];
    for (var l in n) return;
    delete e.__transition;
  }
}
function Zt(e, t) {
  var i = e.__transition, n, s, r = !0, d;
  if (i) {
    t = t == null ? null : t + "";
    for (d in i) {
      if ((n = i[d]).name !== t) {
        r = !1;
        continue;
      }
      s = n.state > Ti && n.state < Ri, n.state = Qt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[d];
    }
    r && delete e.__transition;
  }
}
function ed(e) {
  return this.each(function() {
    Zt(this, e);
  });
}
function td(e, t) {
  var i, n;
  return function() {
    var s = Se(this, e), r = s.tween;
    if (r !== i) {
      n = i = r;
      for (var d = 0, o = n.length; d < o; ++d)
        if (n[d].name === t) {
          n = n.slice(), n.splice(d, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function id(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var r = Se(this, e), d = r.tween;
    if (d !== n) {
      s = (n = d).slice();
      for (var o = { name: t, value: i }, a = 0, l = s.length; a < l; ++a)
        if (s[a].name === t) {
          s[a] = o;
          break;
        }
      a === l && s.push(o);
    }
    r.tween = s;
  };
}
function nd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = ke(this.node(), i).tween, s = 0, r = n.length, d; s < r; ++s)
      if ((d = n[s]).name === e)
        return d.value;
    return null;
  }
  return this.each((t == null ? td : id)(i, e, t));
}
function ji(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Se(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return ke(s, n).value[t];
  };
}
function ws(e, t) {
  var i;
  return (typeof t == "number" ? Te : t instanceof Mt ? bn : (i = Mt(t)) ? (t = i, bn) : Ur)(e, t);
}
function sd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function od(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ad(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var d = this.getAttribute(e);
    return d === s ? null : d === n ? r : r = t(n = d, i);
  };
}
function rd(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var d = this.getAttributeNS(e.space, e.local);
    return d === s ? null : d === n ? r : r = t(n = d, i);
  };
}
function dd(e, t, i) {
  var n, s, r;
  return function() {
    var d, o = i(this), a;
    return o == null ? void this.removeAttribute(e) : (d = this.getAttribute(e), a = o + "", d === a ? null : d === n && a === s ? r : (s = a, r = t(n = d, o)));
  };
}
function ld(e, t, i) {
  var n, s, r;
  return function() {
    var d, o = i(this), a;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (d = this.getAttributeNS(e.space, e.local), a = o + "", d === a ? null : d === n && a === s ? r : (s = a, r = t(n = d, o)));
  };
}
function cd(e, t) {
  var i = di(e), n = i === "transform" ? Vr : ws;
  return this.attrTween(e, typeof t == "function" ? (i.local ? ld : dd)(i, n, ji(this, "attr." + e, t)) : t == null ? (i.local ? od : sd)(i) : (i.local ? rd : ad)(i, n, t));
}
function pd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function ud(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function hd(e, t) {
  var i, n;
  function s() {
    var r = t.apply(this, arguments);
    return r !== n && (i = (n = r) && ud(e, r)), i;
  }
  return s._value = t, s;
}
function md(e, t) {
  var i, n;
  function s() {
    var r = t.apply(this, arguments);
    return r !== n && (i = (n = r) && pd(e, r)), i;
  }
  return s._value = t, s;
}
function fd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = di(e);
  return this.tween(i, (n.local ? hd : md)(n, t));
}
function gd(e, t) {
  return function() {
    Yi(this, e).delay = +t.apply(this, arguments);
  };
}
function yd(e, t) {
  return t = +t, function() {
    Yi(this, e).delay = t;
  };
}
function wd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? gd : yd)(t, e)) : ke(this.node(), t).delay;
}
function vd(e, t) {
  return function() {
    Se(this, e).duration = +t.apply(this, arguments);
  };
}
function xd(e, t) {
  return t = +t, function() {
    Se(this, e).duration = t;
  };
}
function Id(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vd : xd)(t, e)) : ke(this.node(), t).duration;
}
function bd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Se(this, e).ease = t;
  };
}
function _d(e) {
  var t = this._id;
  return arguments.length ? this.each(bd(t, e)) : ke(this.node(), t).ease;
}
function kd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Se(this, e).ease = i;
  };
}
function $d(e) {
  if (typeof e != "function") throw new Error();
  return this.each(kd(this._id, e));
}
function Ed(e) {
  typeof e != "function" && (e = Zn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var r = t[s], d = r.length, o = n[s] = [], a, l = 0; l < d; ++l)
      (a = r[l]) && e.call(a, a.__data__, l, r) && o.push(a);
  return new Oe(n, this._parents, this._name, this._id);
}
function Sd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, r = Math.min(n, s), d = new Array(n), o = 0; o < r; ++o)
    for (var a = t[o], l = i[o], u = a.length, m = d[o] = new Array(u), f, h = 0; h < u; ++h)
      (f = a[h] || l[h]) && (m[h] = f);
  for (; o < n; ++o)
    d[o] = t[o];
  return new Oe(d, this._parents, this._name, this._id);
}
function Ad(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Cd(e, t, i) {
  var n, s, r = Ad(t) ? Yi : Se;
  return function() {
    var d = r(this, e), o = d.on;
    o !== n && (s = (n = o).copy()).on(t, i), d.on = s;
  };
}
function Md(e, t) {
  var i = this._id;
  return arguments.length < 2 ? ke(this.node(), i).on.on(e) : this.each(Cd(i, e, t));
}
function Pd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Nd() {
  return this.on("end.remove", Pd(this._id));
}
function Od(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Vi(e));
  for (var n = this._groups, s = n.length, r = new Array(s), d = 0; d < s; ++d)
    for (var o = n[d], a = o.length, l = r[d] = new Array(a), u, m, f = 0; f < a; ++f)
      (u = o[f]) && (m = e.call(u, u.__data__, f, o)) && ("__data__" in u && (m.__data__ = u.__data__), l[f] = m, ci(l[f], t, i, f, l, ke(u, i)));
  return new Oe(r, this._parents, t, i);
}
function Td(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Qn(e));
  for (var n = this._groups, s = n.length, r = [], d = [], o = 0; o < s; ++o)
    for (var a = n[o], l = a.length, u, m = 0; m < l; ++m)
      if (u = a[m]) {
        for (var f = e.call(u, u.__data__, m, a), h, y = ke(u, i), g = 0, w = f.length; g < w; ++g)
          (h = f[g]) && ci(h, t, i, g, f, y);
        r.push(f), d.push(u);
      }
  return new Oe(r, d, t, i);
}
var Rd = Rt.prototype.constructor;
function Dd() {
  return new Rd(this._groups, this._parents);
}
function Ld(e, t) {
  var i, n, s;
  return function() {
    var r = at(this, e), d = (this.style.removeProperty(e), at(this, e));
    return r === d ? null : r === i && d === n ? s : s = t(i = r, n = d);
  };
}
function vs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ud(e, t, i) {
  var n, s = i + "", r;
  return function() {
    var d = at(this, e);
    return d === s ? null : d === n ? r : r = t(n = d, i);
  };
}
function zd(e, t, i) {
  var n, s, r;
  return function() {
    var d = at(this, e), o = i(this), a = o + "";
    return o == null && (a = o = (this.style.removeProperty(e), at(this, e))), d === a ? null : d === n && a === s ? r : (s = a, r = t(n = d, o));
  };
}
function qd(e, t) {
  var i, n, s, r = "style." + t, d = "end." + r, o;
  return function() {
    var a = Se(this, e), l = a.on, u = a.value[r] == null ? o || (o = vs(t)) : void 0;
    (l !== i || s !== u) && (n = (i = l).copy()).on(d, s = u), a.on = n;
  };
}
function Fd(e, t, i) {
  var n = (e += "") == "transform" ? Fr : ws;
  return t == null ? this.styleTween(e, Ld(e, n)).on("end.style." + e, vs(e)) : typeof t == "function" ? this.styleTween(e, zd(e, n, ji(this, "style." + e, t))).each(qd(this._id, e)) : this.styleTween(e, Ud(e, n, t), i).on("end.style." + e, null);
}
function Vd(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Hd(e, t, i) {
  var n, s;
  function r() {
    var d = t.apply(this, arguments);
    return d !== s && (n = (s = d) && Vd(e, d, i)), n;
  }
  return r._value = t, r;
}
function Bd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Hd(e, t, i ?? ""));
}
function Wd(e) {
  return function() {
    this.textContent = e;
  };
}
function Gd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Yd(e) {
  return this.tween("text", typeof e == "function" ? Gd(ji(this, "text", e)) : Wd(e == null ? "" : e + ""));
}
function jd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Xd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && jd(s)), t;
  }
  return n._value = e, n;
}
function Kd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Xd(e));
}
function Qd() {
  for (var e = this._name, t = this._id, i = xs(), n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var d = n[r], o = d.length, a, l = 0; l < o; ++l)
      if (a = d[l]) {
        var u = ke(a, t);
        ci(a, e, i, l, d, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Oe(n, this._parents, e, i);
}
function Zd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(r, d) {
    var o = { value: d }, a = { value: function() {
      --s === 0 && r();
    } };
    i.each(function() {
      var l = Se(this, n), u = l.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(a)), l.on = t;
    }), s === 0 && r();
  });
}
var Jd = 0;
function Oe(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function xs() {
  return ++Jd;
}
var Me = Rt.prototype;
Oe.prototype = {
  constructor: Oe,
  select: Od,
  selectAll: Td,
  selectChild: Me.selectChild,
  selectChildren: Me.selectChildren,
  filter: Ed,
  merge: Sd,
  selection: Dd,
  transition: Qd,
  call: Me.call,
  nodes: Me.nodes,
  node: Me.node,
  size: Me.size,
  empty: Me.empty,
  each: Me.each,
  on: Md,
  attr: cd,
  attrTween: fd,
  style: Fd,
  styleTween: Bd,
  text: Yd,
  textTween: Kd,
  remove: Nd,
  tween: nd,
  delay: wd,
  duration: Id,
  ease: _d,
  easeVarying: $d,
  end: Zd,
  [Symbol.iterator]: Me[Symbol.iterator]
};
function el(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var tl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: el
};
function il(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function nl(e) {
  var t, i;
  e instanceof Oe ? (t = e._id, e = e._name) : (t = xs(), (i = tl).time = Gi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, r = 0; r < s; ++r)
    for (var d = n[r], o = d.length, a, l = 0; l < o; ++l)
      (a = d[l]) && ci(a, e, t, l, d, i || il(a, t));
  return new Oe(n, this._parents, e, t);
}
Rt.prototype.interrupt = ed;
Rt.prototype.transition = nl;
const Bt = (e) => () => e;
function sl(e, {
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
function Pe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Pe.prototype = {
  constructor: Pe,
  scale: function(e) {
    return e === 1 ? this : new Pe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Pe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var _t = new Pe(1, 0, 0);
Pe.prototype;
function _i(e) {
  e.stopImmediatePropagation();
}
function gt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ol(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function al() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Cn() {
  return this.__zoom || _t;
}
function rl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function dl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ll(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], r = e.invertY(t[0][1]) - i[0][1], d = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    d > r ? (r + d) / 2 : Math.min(0, r) || Math.max(0, d)
  );
}
function cl() {
  var e = ol, t = al, i = ll, n = rl, s = dl, r = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, a = Gr, l = Bi("start", "zoom", "end"), u, m, f, h = 500, y = 150, g = 0, w = 10;
  function v(p) {
    p.property("__zoom", Cn).on("wheel.zoom", E, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", M).filter(s).on("touchstart.zoom", P).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(p, _, I, S) {
    var L = p.selection ? p.selection() : p;
    L.property("__zoom", Cn), p !== L ? b(p, _, I, S) : L.interrupt().each(function() {
      x(this, arguments).event(S).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, v.scaleBy = function(p, _, I, S) {
    v.scaleTo(p, function() {
      var L = this.__zoom.k, z = typeof _ == "function" ? _.apply(this, arguments) : _;
      return L * z;
    }, I, S);
  }, v.scaleTo = function(p, _, I, S) {
    v.transform(p, function() {
      var L = t.apply(this, arguments), z = this.__zoom, T = I == null ? N(L) : typeof I == "function" ? I.apply(this, arguments) : I, U = z.invert(T), X = typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(O($(z, X), T, U), L, d);
    }, I, S);
  }, v.translateBy = function(p, _, I, S) {
    v.transform(p, function() {
      return i(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), d);
    }, null, S);
  }, v.translateTo = function(p, _, I, S, L) {
    v.transform(p, function() {
      var z = t.apply(this, arguments), T = this.__zoom, U = S == null ? N(z) : typeof S == "function" ? S.apply(this, arguments) : S;
      return i(_t.translate(U[0], U[1]).scale(T.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), z, d);
    }, S, L);
  };
  function $(p, _) {
    return _ = Math.max(r[0], Math.min(r[1], _)), _ === p.k ? p : new Pe(_, p.x, p.y);
  }
  function O(p, _, I) {
    var S = _[0] - I[0] * p.k, L = _[1] - I[1] * p.k;
    return S === p.x && L === p.y ? p : new Pe(p.k, S, L);
  }
  function N(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function b(p, _, I, S) {
    p.on("start.zoom", function() {
      x(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      x(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var L = this, z = arguments, T = x(L, z).event(S), U = t.apply(L, z), X = I == null ? N(U) : typeof I == "function" ? I.apply(L, z) : I, Z = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), J = L.__zoom, pe = typeof _ == "function" ? _.apply(L, z) : _, we = a(J.invert(X).concat(Z / J.k), pe.invert(X).concat(Z / pe.k));
      return function(ue) {
        if (ue === 1) ue = pe;
        else {
          var ve = we(ue), dt = Z / ve[2];
          ue = new Pe(dt, X[0] - ve[0] * dt, X[1] - ve[1] * dt);
        }
        T.zoom(null, ue);
      };
    });
  }
  function x(p, _, I) {
    return !I && p.__zooming || new k(p, _);
  }
  function k(p, _) {
    this.that = p, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = t.apply(p, _), this.taps = 0;
  }
  k.prototype = {
    event: function(p) {
      return p && (this.sourceEvent = p), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(p, _) {
      return this.mouse && p !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && p !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && p !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(p) {
      var _ = be(this.that).datum();
      l.call(
        p,
        this.that,
        new sl(p, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function E(p, ..._) {
    if (!e.apply(this, arguments)) return;
    var I = x(this, _).event(p), S = this.__zoom, L = Math.max(r[0], Math.min(r[1], S.k * Math.pow(2, n.apply(this, arguments)))), z = ze(p);
    if (I.wheel)
      (I.mouse[0][0] !== z[0] || I.mouse[0][1] !== z[1]) && (I.mouse[1] = S.invert(I.mouse[0] = z)), clearTimeout(I.wheel);
    else {
      if (S.k === L) return;
      I.mouse = [z, S.invert(z)], Zt(this), I.start();
    }
    gt(p), I.wheel = setTimeout(T, y), I.zoom("mouse", i(O($(S, L), I.mouse[0], I.mouse[1]), I.extent, d));
    function T() {
      I.wheel = null, I.end();
    }
  }
  function D(p, ..._) {
    if (f || !e.apply(this, arguments)) return;
    var I = p.currentTarget, S = x(this, _, !0).event(p), L = be(p.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", Z, !0), z = ze(p, I), T = p.clientX, U = p.clientY;
    vr(p.view), _i(p), S.mouse = [z, this.__zoom.invert(z)], Zt(this), S.start();
    function X(J) {
      if (gt(J), !S.moved) {
        var pe = J.clientX - T, we = J.clientY - U;
        S.moved = pe * pe + we * we > g;
      }
      S.event(J).zoom("mouse", i(O(S.that.__zoom, S.mouse[0] = ze(J, I), S.mouse[1]), S.extent, d));
    }
    function Z(J) {
      L.on("mousemove.zoom mouseup.zoom", null), xr(J.view, S.moved), gt(J), S.event(J).end();
    }
  }
  function M(p, ..._) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, S = ze(p.changedTouches ? p.changedTouches[0] : p, this), L = I.invert(S), z = I.k * (p.shiftKey ? 0.5 : 2), T = i(O($(I, z), S, L), t.apply(this, _), d);
      gt(p), o > 0 ? be(this).transition().duration(o).call(b, T, S, p) : be(this).call(v.transform, T, S, p);
    }
  }
  function P(p, ..._) {
    if (e.apply(this, arguments)) {
      var I = p.touches, S = I.length, L = x(this, _, p.changedTouches.length === S).event(p), z, T, U, X;
      for (_i(p), T = 0; T < S; ++T)
        U = I[T], X = ze(U, this), X = [X, this.__zoom.invert(X), U.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== X[2] && (L.touch1 = X, L.taps = 0) : (L.touch0 = X, z = !0, L.taps = 1 + !!u);
      u && (u = clearTimeout(u)), z && (L.taps < 2 && (m = X[0], u = setTimeout(function() {
        u = null;
      }, h)), Zt(this), L.start());
    }
  }
  function q(p, ..._) {
    if (this.__zooming) {
      var I = x(this, _).event(p), S = p.changedTouches, L = S.length, z, T, U, X;
      for (gt(p), z = 0; z < L; ++z)
        T = S[z], U = ze(T, this), I.touch0 && I.touch0[2] === T.identifier ? I.touch0[0] = U : I.touch1 && I.touch1[2] === T.identifier && (I.touch1[0] = U);
      if (T = I.that.__zoom, I.touch1) {
        var Z = I.touch0[0], J = I.touch0[1], pe = I.touch1[0], we = I.touch1[1], ue = (ue = pe[0] - Z[0]) * ue + (ue = pe[1] - Z[1]) * ue, ve = (ve = we[0] - J[0]) * ve + (ve = we[1] - J[1]) * ve;
        T = $(T, Math.sqrt(ue / ve)), U = [(Z[0] + pe[0]) / 2, (Z[1] + pe[1]) / 2], X = [(J[0] + we[0]) / 2, (J[1] + we[1]) / 2];
      } else if (I.touch0) U = I.touch0[0], X = I.touch0[1];
      else return;
      I.zoom("touch", i(O(T, U, X), I.extent, d));
    }
  }
  function K(p, ..._) {
    if (this.__zooming) {
      var I = x(this, _).event(p), S = p.changedTouches, L = S.length, z, T;
      for (_i(p), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), z = 0; z < L; ++z)
        T = S[z], I.touch0 && I.touch0[2] === T.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === T.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (T = ze(T, this), Math.hypot(m[0] - T[0], m[1] - T[1]) < w)) {
        var U = be(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Bt(+p), v) : n;
  }, v.filter = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Bt(!!p), v) : e;
  }, v.touchable = function(p) {
    return arguments.length ? (s = typeof p == "function" ? p : Bt(!!p), v) : s;
  }, v.extent = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Bt([[+p[0][0], +p[0][1]], [+p[1][0], +p[1][1]]]), v) : t;
  }, v.scaleExtent = function(p) {
    return arguments.length ? (r[0] = +p[0], r[1] = +p[1], v) : [r[0], r[1]];
  }, v.translateExtent = function(p) {
    return arguments.length ? (d[0][0] = +p[0][0], d[1][0] = +p[1][0], d[0][1] = +p[0][1], d[1][1] = +p[1][1], v) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, v.constrain = function(p) {
    return arguments.length ? (i = p, v) : i;
  }, v.duration = function(p) {
    return arguments.length ? (o = +p, v) : o;
  }, v.interpolate = function(p) {
    return arguments.length ? (a = p, v) : a;
  }, v.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? v : p;
  }, v.clickDistance = function(p) {
    return arguments.length ? (g = (p = +p) * p, v) : Math.sqrt(g);
  }, v.tapDistance = function(p) {
    return arguments.length ? (w = +p, v) : w;
  }, v;
}
var pl = Object.defineProperty, ul = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ul(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && pl(t, i, s), s;
};
function hl(e, t, i, n) {
  const s = t.x - e.x, r = t.y - e.y, d = n.x - i.x, o = n.y - i.y, a = s * o - r * d;
  if (Math.abs(a) < 1e-9) return null;
  const l = ((i.x - e.x) * o - (i.y - e.y) * d) / a, u = ((i.x - e.x) * r - (i.y - e.y) * s) / a;
  return l <= 0.02 || l >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + l * s, y: e.y + l * r, t: l };
}
function ml(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, r = n * n + s * s || 1, d = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / r)), o = t.x + d * n, a = t.y + d * s;
  return { dist: Math.hypot(e.x - o, e.y - a), t: d };
}
function fl(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const r = e[s], d = e[s + 1], o = Math.hypot(d.x - r.x, d.y - r.y) || 1, a = (d.x - r.x) / o, l = (d.y - r.y) / o, u = t.map(([f, h]) => hl(r, d, f, h)).filter((f) => f !== null).filter((f) => f.t * o > i + 2 && (1 - f.t) * o > i + 2).sort((f, h) => f.t - h.t);
    let m = -1 / 0;
    for (const f of u)
      f.t * o - i <= m + 2 || (n += ` L ${f.x - a * i} ${f.y - l * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + a * i} ${f.y + l * i}`, m = f.t * o + i);
    n += ` L ${d.x} ${d.y}`;
  }
  return n;
}
const it = {
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
let se = class extends Ne {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = _t, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const s = this.scene.nodes.filter((r) => this.selectedIds.includes(r.id)).map((r) => ({ id: r.id, kind: r.kind }));
            s.length && this.emit("delete-selection-requested", { items: s });
            return;
          }
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = cl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
  /** Center and scale the viewport so the whole scene is visible (and unobscured). */
  fit(e = 60) {
    const t = this.scene.nodes, i = this.renderRoot.querySelector("svg.main");
    if (!t.length || !i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = this.fitInsets.left ?? 0, r = this.fitInsets.right ?? 0, d = this.fitInsets.top ?? 0, o = this.fitInsets.bottom ?? 0, a = Math.max(80, n.width - s - r), l = Math.max(80, n.height - d - o), u = Math.min(...t.map((w) => w.x - w.w / 2)) - e, m = Math.max(...t.map((w) => w.x + w.w / 2)) + e, f = Math.min(...t.map((w) => w.y - w.h / 2)) - e, h = Math.max(...t.map((w) => w.y + w.h / 2)) + e, y = Math.max(0.15, Math.min(a / (m - u), l / (h - f), 1.25)), g = _t.translate(
      s + a / 2 - y * (u + m) / 2,
      d + l / 2 - y * (f + h) / 2
    ).scale(y);
    be(i).call(this._zoomBehavior.transform, g);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(be(t), e);
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
    for (let r = e.parentId; r; r = (n = this.scene.nodes.find((d) => d.id === r)) == null ? void 0 : n.parentId) {
      const d = this.scene.nodes.find((a) => a.id === r);
      if (!d) break;
      if (this._dragPos && this._dragPos.id === r)
        return { x: e.x + (this._dragPos.x - d.x), y: e.y + (this._dragPos.y - d.y) };
      const o = (s = this._dragGroup) == null ? void 0 : s.get(r);
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
        const s = this.nodePos(n), r = s.x - n.w / 2 + 10 + e.w / 2, d = s.x + n.w / 2 - 10 - e.w / 2, o = s.y - n.h / 2 + 34 + e.h / 2, a = s.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, r), d), i = Math.min(Math.max(i, o), a);
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
    for (const r of i) {
      const d = (s = r.closest) == null ? void 0 : s.call(r, "[data-node-id]");
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
    const r = new Set(this.selectedIds), d = r.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => r.has(f.id) && !(f.parentId && r.has(f.parentId))
    ) : null, o = d ? new Map(d.map((f) => [f.id, this.nodePos(f)])) : null, a = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !d, l = (f) => {
      const h = this.nodeIdAt(f), y = h && h !== t.id ? this.scene.nodes.find((g) => g.id === h) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, u = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const h = this.toScene(f), y = h.x - i.x, g = h.y - i.y;
      if (!(!s && Math.hypot(y, g) < 3 / this._t.k))
        if (s = !0, d && o) {
          const w = /* @__PURE__ */ new Map();
          for (const v of d) {
            const $ = o.get(v.id), O = this.clampToParent(v, $.x + y, $.y + g);
            w.set(v.id, { x: O.x, y: O.y });
          }
          this._dragGroup = w;
        } else a(f) ? (this._dragPos = { id: t.id, x: n.x + y, y: n.y + g }, this._hoverNodeId = l(f)) : (this._dragPos = this.clampToParent(t, n.x + y, n.y + g), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, y]) => ({ id: h, x: y.x, y: y.y }))
        });
      else if (s && this._dragPos) {
        if (a(f)) {
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
  onResizePointerDown(e, t, i, n) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, r = 90, d = { x: t.x, y: t.y, w: t.w, h: t.h }, o = this.scene.nodes.filter((g) => g.parentId === t.id), a = Math.min(...o.map((g) => g.x - g.w / 2)), l = Math.max(...o.map((g) => g.x + g.w / 2)), u = Math.min(...o.map((g) => g.y - g.h / 2)), m = Math.max(...o.map((g) => g.y + g.h / 2)), f = qs(
      o.map((g) => ({ dx: g.x - d.x, dy: g.y - d.y, w: g.w, h: g.h })),
      { w: s, h: r }
    ), h = (g) => {
      if ((g.buttons & 1) === 0) {
        y();
        return;
      }
      const w = this.toScene(g);
      if (g.shiftKey) {
        this._resize = {
          id: t.id,
          x: d.x,
          y: d.y,
          w: Math.max(f.w, 2 * Math.abs(w.x - d.x)),
          h: Math.max(f.h, 2 * Math.abs(w.y - d.y))
        };
        return;
      }
      const v = d.x - i * d.w / 2, $ = d.y - n * d.h / 2, O = i > 0 ? Math.max(w.x, v + s, o.length ? l + 10 : -1 / 0) : Math.min(w.x, v - s, o.length ? a - 10 : 1 / 0), N = n > 0 ? Math.max(w.y, $ + r, o.length ? m + 10 : -1 / 0) : Math.min(w.y, $ - r, o.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + O) / 2,
        y: ($ + N) / 2,
        w: Math.abs(O - v),
        h: Math.abs(N - $)
      };
    }, y = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", y), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", y);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, s = (r) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const d = this.nodeIdAt(r);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), r = t - n, d = i - s, o = e.w / 2, a = e.h / 2;
    if (r === 0 && d === 0) return { x: n, y: s };
    const l = 1 / Math.max(Math.abs(r) / o, Math.abs(d) / a);
    return { x: n + r * l, y: s + d * l };
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
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), r = this.nodePos(i), d = n[0] ?? r, o = n[n.length - 1] ?? s;
    let a = this.borderPoint(t, d.x, d.y), l = this.borderPoint(i, o.x, o.y);
    if (!n.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(l.x - a.x, l.y - a.y) || 1, f = -(l.y - a.y) / m * u, h = (l.x - a.x) / m * u;
        a = { x: a.x + f, y: a.y + h }, l = { x: l.x + f, y: l.y + h };
      }
    }
    return [a, ...n, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (d) => {
      if (!this._wpDrag) return;
      n = !0;
      const o = this.toScene(d), a = [...this._wpDrag.points];
      a[this._wpDrag.index] = o, this._wpDrag = { ...this._wpDrag, points: a };
    }, r = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = ml(t, e[n], e[n + 1]);
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
    let r = !1;
    const d = (a) => {
      if ((a.buttons & 1) === 0) {
        o();
        return;
      }
      const l = this.toScene(a);
      if (r) {
        if (this._wpDrag) {
          const u = [...this._wpDrag.points];
          u[s] = l, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(l.x - n.x, l.y - n.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(s, 0, l), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: u, index: s };
      }
    }, o = () => {
      window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", o), r && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
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
    return W`
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, r = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), d = Math.floor((t.length - 1) / 2), o = {
      x: (t[d].x + t[d + 1].x) / 2,
      y: (t[d].y + t[d + 1].y) / 2
    }, a = t.slice(1, -1);
    return W`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${fl(t, i)}
              fill="none"
              stroke=${n} stroke-width=${r ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? W`<text x=${o.x} y=${o.y - 6} text-anchor="middle"
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
        ${s ? a.map((l, u) => {
      var f;
      const m = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === u;
      return W`
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
    var f, h, y;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, r = !!e.container, d = !!e.parentId, o = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, a = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, l = o / 2, u = a / 2, m = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return W`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${s ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? W`<rect x=${-l - 4} y=${-u - 4} width=${o + 8} height=${a + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-u} width=${o} height=${a} rx=${d ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? W`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? W`<text x=${-l} y=${-u - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? W`<g transform="translate(${l - 13}, ${-u + 13})"
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
        ${e.symbol && it[e.symbol] && !d ? W`<g transform="translate(${l - (e.collapsible ? 37 : 17)}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${it[e.symbol]}
              </g>` : ""}
        ${d && e.symbol && it[e.symbol] ? W`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${it[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? W`
              <foreignObject x=${-l + 6} y=${r ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : d ? W`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : r ? W`<text x=${-l + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : W`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${r ? W`<line x1=${-l + 8} y1=${-u + 28} x2=${l - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (d ? e.kind === "menu-item" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [l, 0],
      [-l, 0],
      [0, u],
      [0, -u]
    ].map(
      ([g, w]) => W`
                <circle data-handle cx=${g} cy=${w} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${r && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, w]) => W`
                <rect data-resize x=${g * l - 6.5} y=${w * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * w > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, g, w)}>
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
    const n = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, s = (d) => {
      if ((d.buttons & 1) === 0) {
        n();
        return;
      }
      const o = this.toScene(d);
      !i && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: o });
    }, r = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: d, b: o } = this._rubber, a = Math.min(d.x, o.x), l = Math.max(d.x, o.x), u = Math.min(d.y, o.y), m = Math.max(d.y, o.y), f = this.scene.nodes.filter((h) => {
          const y = this.nodePos(h);
          return y.x >= a && y.x <= l && y.y >= u && y.y <= m;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", r), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((d) => d.x - d.w / 2)) - e, n = Math.max(...t.map((d) => d.x + d.w / 2)) + e, s = Math.min(...t.map((d) => d.y - d.h / 2)) - e, r = Math.max(...t.map((d) => d.y + d.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: r - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, r = _t.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    be(i).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, r = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, r);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, d = (0 - this._t.y) / this._t.k, o = s.width / this._t.k, a = s.height / this._t.k;
    return A`
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
      var u, m;
      (m = (u = l.currentTarget).hasPointerCapture) != null && m.call(u, l.pointerId) && this.onMinimapPointer(l, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const u = this.nodePos(l);
      return W`<rect
              x=${(u.x - l.w / 2 - e.minX) * n}
              y=${(u.y - l.h / 2 - e.minY) * n}
              width=${Math.max(2, l.w * n)}
              height=${Math.max(2, l.h * n)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(r - e.minX) * n}
            y=${(d - e.minY) * n}
            width=${o * n}
            height=${a * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((s) => s.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((s) => {
      const r = this.edgePolyline(s);
      if (r) {
        i.push(this.renderEdgeHit(s, r)), n.push(this.renderEdgeInk(s, r, [...t]));
        for (let d = 0; d < r.length - 1; d++) t.push([r[d], r[d + 1]]);
      }
    }), A`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(s) => {
      const r = s.target;
      r.closest("[data-node-id]") || r.closest("[data-edge-id]") || this._spaceDown || s.button !== 0 || (s.buttons & 1) !== 0 && this.startRubberBand(s);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (s) => W`
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
se.styles = Nt`
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
ae([
  le({ attribute: !1 })
], se.prototype, "scene", 2);
ae([
  le({ attribute: !1 })
], se.prototype, "selectedId", 2);
ae([
  le({ attribute: !1 })
], se.prototype, "selectedIds", 2);
ae([
  le({ type: Boolean })
], se.prototype, "connectable", 2);
ae([
  le({ attribute: !1 })
], se.prototype, "edgePoints", 2);
ae([
  R()
], se.prototype, "_t", 2);
ae([
  R()
], se.prototype, "_dragPos", 2);
ae([
  R()
], se.prototype, "_dragGroup", 2);
ae([
  R()
], se.prototype, "_pendingLink", 2);
ae([
  R()
], se.prototype, "_hoverNodeId", 2);
ae([
  R()
], se.prototype, "_editingId", 2);
ae([
  R()
], se.prototype, "_spaceDown", 2);
ae([
  R()
], se.prototype, "_wpDrag", 2);
ae([
  R()
], se.prototype, "_selectedWaypoint", 2);
ae([
  R()
], se.prototype, "_resize", 2);
ae([
  R()
], se.prototype, "_rubber", 2);
ae([
  le({ attribute: !1 })
], se.prototype, "fitInsets", 2);
se = ae([
  Tt("modux-canvas")
], se);
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
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ze = (e) => e.trim().toLowerCase();
function gl(e, t) {
  var D, M, P, q, K;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((p) => [p.id, p.name])), s = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((_) => ({ ..._, moduleId: p.id }))
  ), r = new Set(s.map((p) => p.id)), d = e.aggregates ?? [], o = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((_) => _.id))
  ), a = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((_) => ({ ..._, moduleId: p.id, application: !1 }))
  ), l = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((_) => ({ ..._, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((_) => ({ ..._, moduleId: p.id }))
  );
  for (const p of s)
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
      tooltip: p.policy ? `${p.name} — policy de ${n.get(p.moduleId) ?? p.moduleId} (reacción, no caso de negocio)` : `${p.name} — caso de uso de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  for (const p of d)
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
      tooltip: `${p.name} — agregado de ${n.get(p.moduleId) ?? p.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const p of [...a, ...l])
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
      tooltip: `${p.name} — evento de ${n.get(p.moduleId) ?? p.moduleId}`
    }), m.set(Ze(p.name), p.id);
  const f = (p) => {
    if (!p || !p.trim()) return null;
    const _ = m.get(Ze(p));
    if (_) return _;
    const I = `evname:${Ze(p)}`;
    return he(i, {
      id: I,
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
    }), I;
  }, h = (p) => {
    const _ = u.find((S) => S.id === p.id) ?? u.find((S) => p.name && Ze(S.name) === Ze(p.name)), I = (_ == null ? void 0 : _.id) ?? (p.id || (p.name ? `rm:${Ze(p.name)}` : null));
    return I ? (he(i, {
      id: I,
      label: (_ == null ? void 0 : _.name) ?? p.name ?? I,
      x: 0,
      y: 0,
      w: V.readModel.w,
      h: V.readModel.h,
      kind: _ ? "read-model" : "derived-read-model",
      fill: V.readModel.fill,
      stroke: V.readModel.stroke,
      dashed: !_,
      badge: "READ MODEL"
    }), I) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!r.has(p.targetId)) continue;
    const _ = (e.actors ?? []).find((I) => I.id === p.actorId);
    _ && (he(i, {
      id: _.id,
      label: _.name,
      x: 0,
      y: 0,
      w: V.actor.w,
      h: V.actor.h,
      kind: "actor",
      symbol: "person",
      fill: V.actor.fill,
      stroke: V.actor.stroke,
      badge: "ACTOR"
    }), ie(i, {
      id: `es-actor:${_.id}->${p.targetId}`,
      sourceId: _.id,
      targetId: p.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const p of e.aiAgents ?? []) {
    const _ = (e.agentUses ?? []).filter((T) => T.agentId === p.id), I = (e.agentExternalUses ?? []).filter((T) => T.agentId === p.id), S = (e.agentRags ?? []).filter((T) => T.agentId === p.id), L = (e.agentMcpUses ?? []).filter((T) => T.agentId === p.id), z = (e.agentGatewayUses ?? []).some((T) => T.agentId === p.id) || (e.agentApiOpUses ?? []).some((T) => T.agentId === p.id) || (e.agentQueryUses ?? []).some((T) => T.agentId === p.id) || (e.agentDelegations ?? []).some((T) => T.agentId === p.id) || (e.agentTriggers ?? []).some((T) => T.agentId === p.id);
    if (!(!_.length && !I.length && !S.length && !L.length && !z)) {
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
      for (const T of _)
        r.has(T.useCaseId) && ie(i, {
          id: `es-agent:${p.id}->${T.useCaseId}`,
          sourceId: p.id,
          targetId: T.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const T of I) {
        const U = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === T.externalUseCaseId)
        );
        if (!U) continue;
        const X = (D = (U.useCases ?? []).find((Z) => Z.id === T.externalUseCaseId)) == null ? void 0 : D.name;
        he(i, {
          id: U.id,
          label: U.name,
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
        }), ie(i, {
          id: `es-agentx:${p.id}->${T.externalUseCaseId}`,
          sourceId: p.id,
          targetId: U.id,
          kind: "es-agent-external",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Llama a ${X} del sistema externo` : void 0
        });
      }
      for (const T of L) {
        const U = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === T.mcpServerId)
        );
        if (!U) continue;
        const X = (M = (U.mcpServers ?? []).find((Z) => Z.id === T.mcpServerId)) == null ? void 0 : M.name;
        he(i, {
          id: U.id,
          label: U.name,
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
        }), ie(i, {
          id: `es-agentmcp:${p.id}->${T.mcpServerId}`,
          sourceId: p.id,
          targetId: U.id,
          kind: "es-agent-mcp",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Consume las herramientas del servidor MCP ${X}` : void 0
        });
      }
      for (const T of S) {
        const U = (e.rags ?? []).find((X) => X.id === T.ragId);
        if (U) {
          he(i, {
            id: U.id,
            label: U.name,
            x: 0,
            y: 0,
            w: V.readModel.w,
            h: V.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${U.name} — base de conocimiento (retrieval)`
          }), ie(i, {
            id: `es-agrag:${p.id}->${U.id}`,
            sourceId: p.id,
            targetId: U.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const X of U.sourceReadModelIds ?? []) {
            const Z = h({ id: X });
            Z && ie(i, {
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
  const y = (p) => {
    const _ = e.externalSystems.find((I) => I.id === p);
    return _ ? (he(i, {
      id: _.id,
      label: _.name,
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
    }), _.id) : null;
  };
  for (const p of e.externalCalls ?? []) {
    const _ = y(p.externalSystemId);
    !_ || !r.has(p.useCaseId) || ie(i, {
      id: `es-extin:${_}->${p.useCaseId}`,
      sourceId: _,
      targetId: p.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const p of e.externalUseCaseCalls ?? []) {
    if (!r.has(p.sourceId)) continue;
    const _ = e.externalSystems.find(
      (L) => (L.useCases ?? []).some((z) => z.id === p.targetId)
    ), I = _ ? y(_.id) : null;
    if (!I) continue;
    const S = (P = ((_ == null ? void 0 : _.useCases) ?? []).find((L) => L.id === p.targetId)) == null ? void 0 : P.name;
    ie(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: I,
      kind: "es-command-external",
      label: S,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: S ? `Llama a ${S} del sistema externo` : void 0
    });
  }
  for (const p of e.aggregateCalls ?? [])
    !r.has(p.sourceId) || !i.nodes.has(p.targetId) || ie(i, {
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
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (r.has(p.sourceId) || d.some((I) => I.id === p.sourceId) || o.has(p.sourceId))) || ie(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const w = (p, _, I, S, L, z) => (he(i, {
    id: p,
    label: _,
    x: 0,
    y: 0,
    w: V.policy.w,
    h: V.policy.h,
    kind: I,
    symbol: "flow",
    fill: V.policy.fill,
    stroke: V.policy.stroke,
    badge: S,
    tooltip: L
  }), p), v = (p, _) => {
    const I = f(p);
    I && ie(i, {
      id: `es-trigger:${I}->${_}`,
      sourceId: I,
      targetId: _,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, $ = (p, _) => {
    !_ || !r.has(_) || ie(i, {
      id: `es-invoke:${p}->${_}`,
      sourceId: p,
      targetId: _,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const p of e.subscriptions ?? []) {
    const _ = w(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    v(p.eventName, _);
    for (const I of p.actions ?? []) {
      if (I.type === "CallUseCase" && $(_, I.useCaseId), I.type === "StartSaga" && I.sagaId) {
        const S = `saga:${I.sagaId}`;
        w(S, I.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${_}->${S}`,
          sourceId: _,
          targetId: S,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (I.type === "UpdateProjection" && I.projectionId) {
        const S = (e.projections ?? []).find((L) => L.id === I.projectionId);
        S && ie(i, {
          id: `es-feeds:${_}->${S.id}`,
          sourceId: _,
          targetId: S.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const _ = w(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const L of p.handledEventIds) {
      const z = i.nodes.has(L) ? L : null;
      z && ie(i, {
        id: `es-trigger:${z}->${_}`,
        sourceId: z,
        targetId: _,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    p.sourceAggregateId && i.nodes.has(p.sourceAggregateId) && ie(i, {
      id: `es-state:${p.id}`,
      sourceId: p.sourceAggregateId,
      targetId: _,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const I = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (I) {
      const L = e.externalSystems.find(
        (T) => (T.useCases ?? []).some((U) => U.id === I) || (T.tables ?? []).some((U) => U.id === I)
      ), z = L ? y(L.id) : null;
      if (z) {
        const T = ((q = (L.useCases ?? []).find((U) => U.id === I)) == null ? void 0 : q.name) ?? ((K = (L.tables ?? []).find((U) => U.id === I)) == null ? void 0 : K.name);
        ie(i, {
          id: `es-poll:${p.id}`,
          sourceId: z,
          targetId: _,
          kind: "es-projects-poll",
          label: T,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `polling de ${T}` : "polling"
        });
      }
    }
    const S = h({ id: p.readModelId, name: p.readModelName });
    S && ie(i, {
      id: `es-projects:${_}->${S}`,
      sourceId: _,
      targetId: S,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const I = f(p.triggerEvent), S = h({ name: p.readModelName ?? `${p.triggerEvent}View` });
      I && S && ie(i, {
        id: `es-mat:${p.id}`,
        sourceId: I,
        targetId: S,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const _ = w(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (v(p.triggerEvent, _), $(_, p.targetUseCaseId), !p.targetUseCaseId) {
      const I = y(p.targetId), S = I ?? `tgt:${p.targetId}`;
      !I && n.has(p.targetId) && he(i, {
        id: S,
        label: n.get(p.targetId) ?? p.targetId,
        x: 0,
        y: 0,
        w: V.module.w,
        h: V.module.h,
        kind: "module",
        symbol: "component",
        fill: V.module.fill,
        stroke: V.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(S) && ie(i, {
        id: `es-deliver:${p.id}`,
        sourceId: _,
        targetId: S,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const _ = w(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    v(p.triggerEvent, _);
    for (const S of p.steps) $(_, S.useCaseId);
    const I = f(p.onCompletionEventName);
    I && ie(i, {
      id: `es-done:${p.id}`,
      sourceId: _,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const _ = w(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    v(p.triggerEvent, _);
    for (const S of p.steps ?? []) {
      $(_, S.targetUseCaseId);
      for (const L of [S.emittedEventName, S.completionEventName]) {
        const z = f(L);
        z && ie(i, {
          id: `es-wfemit:${p.id}:${z}`,
          sourceId: _,
          targetId: z,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const I = f(p.onCompletionEventName);
    I && ie(i, {
      id: `es-done:${p.id}`,
      sourceId: _,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const O = [...i.nodes.values()], N = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    N.has(p.targetId) || N.set(p.targetId, []), N.get(p.targetId).push(p.sourceId);
  const b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set(), k = (p) => {
    const _ = b.get(p);
    if (_ !== void 0) return _;
    if (x.has(p)) return 0;
    x.add(p);
    const I = N.get(p) ?? [], S = I.length ? 1 + Math.max(...I.map(k)) : 0;
    return x.delete(p), b.set(p, S), S;
  }, E = /* @__PURE__ */ new Map();
  for (const p of O) {
    const _ = t[p.id];
    if (_) {
      p.x = _.x, p.y = _.y;
      continue;
    }
    const I = k(p.id), S = E.get(I) ?? 0;
    E.set(I, S + 1), p.x = 140 + I * 260, p.y = 110 + S * 110;
  }
  return { nodes: O, edges: i.edges };
}
const yl = 190, wl = 56, Mn = 180, vl = 56, xl = 150, Il = 44, Pn = 250, Nn = 100;
function bl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const r = (s.dependsOnStepIds ?? []).map((o) => t.get(o)).filter(Boolean), d = r.length ? 1 + Math.max(...r.map(n)) : 0;
    return i.delete(s.id), d;
  };
  return n(e);
}
function _l(e, t) {
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
function kl(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), r = (o) => {
    var a;
    return (a = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === o)) == null ? void 0 : a.name;
  };
  let d = 140;
  return (e.workflows ?? []).forEach((o) => {
    var w;
    const a = new Map(o.steps.map((v) => [v.id, v])), l = new Map(o.steps.map((v) => [v.id, bl(v, a)])), u = /* @__PURE__ */ new Map();
    for (const v of o.steps) {
      const $ = l.get(v.id) ?? 0;
      u.set($, (u.get($) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), f = _l(e, o);
    if (f && !s.has(f.id)) {
      s.add(f.id);
      const v = t[f.id] ?? { x: 140, y: d };
      i.push({
        id: f.id,
        label: f.label,
        x: v.x,
        y: v.y,
        w: xl,
        h: Il,
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
      w: yl,
      h: wl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${o.name}${o.triggerEvent ? ` — arranca con ${o.triggerEvent}` : ""}${o.onCompletionEventName ? ` · emite ${o.onCompletionEventName} al completar` : ""}`
    }), f && n.push({
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
    const y = /* @__PURE__ */ new Map();
    let g = 0;
    for (const v of o.steps) {
      const $ = l.get(v.id) ?? 0;
      g = Math.max(g, $);
      const O = y.get($) ?? 0;
      y.set($, O + 1);
      const N = t[v.id] ?? {
        x: h.x + ($ + 1) * Pn,
        y: d + (O - (u.get($) - 1) / 2) * Nn
      }, b = r(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: N.x,
        y: N.y,
        w: Mn,
        h: vl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: b ? `→ ${b}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${b ? ` · lanza ${b}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const x = (v.dependsOnStepIds ?? []).filter((k) => a.has(k));
      x.length === 0 && n.push({
        id: `wfs:${o.id}:${v.id}`,
        sourceId: o.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of x)
        n.push({
          id: `wfdep:${k}->${v.id}`,
          sourceId: k,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((w = a.get(k)) == null ? void 0 : w.name) ?? k}`
        });
    }
    if (o.onCompletionEventName) {
      const v = `done:${o.id}`, $ = t[v] ?? { x: h.x + (g + 2) * Pn, y: d };
      i.push({
        id: v,
        label: o.onCompletionEventName,
        x: $.x,
        y: $.y,
        w: Mn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const O = new Set(o.steps.flatMap((b) => b.dependsOnStepIds ?? [])), N = o.steps.filter((b) => !O.has(b.id));
      for (const b of N.length ? N : [])
        n.push({
          id: `wfd:${o.id}:${b.id}`,
          sourceId: b.id,
          targetId: v,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      o.steps.length || n.push({
        id: `wfd:${o.id}`,
        sourceId: o.id,
        targetId: v,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    d += Math.max(2, m + 1) * Nn + 60;
  }), { nodes: i, edges: n };
}
const On = 250, Wt = 30, Tn = 6, $l = 16, El = 190, Rn = 60, Sl = 170, Gt = 44;
function Al(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function qe(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Cl(e) {
  const t = [], i = (n, s, r) => {
    for (const d of n ?? []) {
      const o = [...s, d.label];
      t.push({ entry: d, path: o, depth: r }), i(d.children ?? [], o, r + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Ml(e, t) {
  const i = [], n = [], s = e.uiApps ?? [], r = e.pages ?? [], d = (g) => {
    var w;
    return ((w = e.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === g)) == null ? void 0 : w.name) ?? g;
  }, o = (g) => {
    var w;
    return ((w = e.modules.flatMap((v) => v.queryServices ?? []).find((v) => v.id === g)) == null ? void 0 : w.name) ?? g;
  };
  let a = 160;
  for (const g of s) {
    const w = Cl(g), v = Math.max(
      90,
      54 + w.length * (Wt + Tn)
    ), $ = t[g.id] ?? { x: 190, y: a + v / 2 };
    a = $.y + v / 2 + 70, i.push({
      id: g.id,
      label: g.title || g.name,
      x: $.x,
      y: $.y,
      w: On,
      h: v,
      kind: "ui-app",
      symbol: "component",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      container: !0,
      tooltip: `App: ${g.name}`
    });
    let O = $.y - v / 2 + 34 + 10 + Wt / 2;
    for (const { entry: N, path: b, depth: x } of w) {
      const k = Al(g.id, N, b), E = x * $l;
      i.push({
        id: k,
        label: N.label,
        x: $.x + E / 2,
        y: O,
        w: On - 20 - E,
        h: Wt,
        kind: "menu-item",
        symbol: "process",
        fill: "#ffffff",
        stroke: "#7dd3fc",
        parentId: g.id,
        tooltip: N.pageId ? `Abre ${N.pageId}` : N.uiAdapterId ? `Abre la app ${N.uiAdapterId}` : "Entrada de menú sin destino"
      }), O += Wt + Tn, N.uiAdapterId && s.some((D) => D.id === N.uiAdapterId) && n.push({
        id: `menuapp:${k}->${N.uiAdapterId}`,
        sourceId: k,
        targetId: N.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), N.pageId && r.some((D) => D.id === N.pageId) && n.push({
        id: `menupage:${k}->${N.pageId}`,
        sourceId: k,
        targetId: N.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  const l = /* @__PURE__ */ new Map();
  let u = 160;
  for (const g of r) {
    const w = t[g.id] ?? { x: 640, y: u };
    u = w.y + Rn + 90, i.push({
      id: g.id,
      label: g.name,
      x: w.x,
      y: w.y,
      w: El,
      h: Rn,
      kind: "page",
      symbol: "interface",
      badge: g.type ?? "FORM",
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: g.route ? `${g.type ?? "FORM"} · ${g.route}` : g.type ?? "FORM"
    }), g.modelId && (l.set(g.modelId, {
      label: g.modelName ?? g.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), n.push({
      id: `pgmodel:${g.id}->${g.modelId}`,
      sourceId: g.id,
      targetId: g.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const v of g.buttons ?? [])
      v.useCaseId && (l.set(v.useCaseId, {
        label: d(v.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `pgbtn:${g.id}->${v.useCaseId}`,
        sourceId: g.id,
        targetId: v.useCaseId,
        kind: "page-button",
        label: v.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: v.mappingId ? `Botón «${v.label}» — mapping ${v.mappingId}` : `Botón «${v.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    g.listingQueryServiceId && (l.set(g.listingQueryServiceId, {
      label: o(g.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), n.push({
      id: `pglist:${g.id}->${g.listingQueryServiceId}`,
      sourceId: g.id,
      targetId: g.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let m = 160;
  for (const [g, w] of l) {
    const v = t[g] ?? { x: 1050, y: m };
    m = v.y + Gt + 46, i.push({
      id: g,
      label: w.label,
      x: v.x,
      y: v.y,
      w: Sl,
      h: Gt,
      kind: w.kind,
      symbol: w.symbol,
      fill: "#ffffff",
      stroke: w.stroke
    });
  }
  const f = (e.actorAppUses ?? []).filter(
    (g) => s.some((w) => w.id === g.appId) && (e.actors ?? []).some((w) => w.id === g.actorId)
  ), h = [...new Set(f.map((g) => g.actorId))];
  let y = 160;
  for (const g of h) {
    const w = (e.actors ?? []).find(($) => $.id === g), v = t[g] ?? { x: -60, y };
    y = v.y + Gt + 46, i.push({
      id: g,
      label: w.name,
      x: v.x,
      y: v.y,
      w: 150,
      h: Gt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const g of f)
    n.push({
      id: `actorapp:${g.actorId}->${g.appId}`,
      sourceId: g.actorId,
      targetId: g.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: n };
}
async function Pl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((a) => a.e), n = new i(), r = {
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
    children: e.nodes.map((a) => ({ id: a.id, width: a.w, height: a.h })),
    edges: e.edges.map((a) => ({ id: a.id, sources: [a.sourceId], targets: [a.targetId] }))
  }, d = await n.layout(r), o = {};
  for (const a of d.children ?? [])
    o[a.id] = {
      x: (a.x ?? 0) + (a.width ?? 0) / 2,
      y: (a.y ?? 0) + (a.height ?? 0) / 2
    };
  return o;
}
var Nl = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ol(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Nl(t, i, s), s;
};
const Tl = /* @__PURE__ */ new Set([
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
let fe = class extends Ne {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onDown = (e) => {
      var s, r;
      if (e.button !== 0) return;
      this.focus(), (s = this.setPointerCapture) == null || s.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".h3");
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
        const r = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - r.left, y2: e.clientY - r.top };
        const d = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), o = (s = d == null ? void 0 : d.closest) == null ? void 0 : s.call(d, ".n3"), a = (o == null ? void 0 : o.dataset.nodeId) ?? null;
        this._hoverTargetId = a !== this._connect.sourceId ? a : null;
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, i) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const r = this.unproject(t, i);
          this._liveMove = { id: this._drag.nodeId, dx: r.x, dy: r.y };
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
    var n, s, r;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((r = (s = i == null ? void 0 : i.closest) == null ? void 0 : s.call(i, ".n3")) == null ? void 0 : r.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, s = i.height * 0.42, r = new DOMMatrix();
    r.m34 = -1 / 1600;
    const d = new DOMMatrix().translate(n, s).multiply(r).translate(-n, -s).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), o = d.transformPoint(new DOMPoint(0, 0, 0, 1)), a = d.transformPoint(new DOMPoint(1, 0, 0, 0)), l = d.transformPoint(new DOMPoint(0, 1, 0, 0)), u = e - i.left, m = t - i.top, f = a.x - u * a.w, h = l.x - u * l.w, y = a.y - m * a.w, g = l.y - m * l.w, w = u * o.w - o.x, v = m * o.w - o.y, $ = f * g - h * y;
    return $ ? { x: (w * g - h * v) / $, y: (f * v - w * y) / $ } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const s = t.get(n.id);
      if (s !== void 0) return s;
      const r = n.parentId ? e.get(n.parentId) : void 0, d = r ? i(r) + 1 : 0;
      return t.set(n.id, d), d;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return A`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((w) => [w.id, w])), n = Math.min(...e.map((w) => w.x - w.w / 2)) - 60, s = Math.max(...e.map((w) => w.x + w.w / 2)) + 60, r = Math.min(...e.map((w) => w.y - w.h / 2)) - 60, d = Math.max(...e.map((w) => w.y + w.h / 2)) + 60, o = (n + s) / 2, a = (r + d) / 2, l = this.getBoundingClientRect(), u = l.width ? Math.min(l.width / (s - n), l.height / (d - r), 1) * 0.9 : 0.5, m = this._k * u;
    this._kUsed = m, this._center = { x: o, y: a };
    const f = 30, h = this._liveMove, y = (w) => w.x + ((h == null ? void 0 : h.id) === w.id ? h.dx : 0), g = (w) => w.y + ((h == null ? void 0 : h.id) === w.id ? h.dy : 0);
    return A`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-o}px, ${-a}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${r}px"
            width=${s - n}
            height=${d - r}
            viewBox="${n} ${r} ${s - n} ${d - r}"
          >
            ${this.scene.edges.map((w) => {
      const v = i.get(w.sourceId), $ = i.get(w.targetId);
      return !v || !$ ? "" : W`<line
                x1=${y(v)} y1=${g(v)} x2=${y($)} y2=${g($)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((w) => {
      const v = i.get(w.sourceId), $ = i.get(w.targetId);
      if (!v || !$) return "";
      const O = (t.get(v.id) ?? 0) * f + 2, N = (t.get($.id) ?? 0) * f + 2, b = y($) - y(v), x = g($) - g(v), k = N - O, E = Math.hypot(b, x), D = Math.hypot(E, k), M = Math.atan2(x, b) * 180 / Math.PI, P = Math.atan2(k, E) * 180 / Math.PI, q = w.color ?? "#64748b", K = w.dashed ? `repeating-linear-gradient(90deg, ${q} 0 6px, transparent 6px 10px)` : q;
      return A`<div
              class="edge3"
              style="
                left: ${y(v)}px; top: ${g(v)}px; width: ${D}px; height: 1.7px;
                transform: translateZ(${O}px) rotateZ(${M}deg) rotateY(${-P}deg);
                background: ${K};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((w) => {
      const v = t.get(w.id) ?? 0, $ = w.container || v === 0, O = this._hoverTargetId === w.id;
      return A`
              <div
                class="n3 ${w.container ? "container3" : ""} ${this.selectedId === w.id ? "selected3" : ""} ${O ? "hover3" : ""}"
                data-node-id=${w.id}
                data-kind=${w.kind}
                title=${w.tooltip ?? w.label}
                style="
                  left: ${y(w) - w.w / 2}px; top: ${g(w) - w.h / 2}px;
                  width: ${w.w}px; height: ${w.h}px;
                  transform: translateZ(${v * f + (O ? 8 : 0)}px)${O ? " scale(1.06)" : ""};
                  background: ${w.container ? "color-mix(in srgb, " + (w.fill ?? "#ffffff") + " 82%, transparent)" : w.fill ?? "#ffffff"};
                  border-color: ${w.stroke ?? "#64748b"};
                  border-style: ${w.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${$ ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${w.badge ? A`<span class="badge3" style="color: ${w.stroke ?? "#94a3b8"}">${w.badge}</span>` : ""}
                <span>${w.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const w = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!w || !Tl.has(w.kind)) return "";
      const v = (t.get(w.id) ?? 0) * f + 4;
      return [
        [y(w) + w.w / 2, g(w)],
        [y(w) - w.w / 2, g(w)],
        [y(w), g(w) + w.h / 2],
        [y(w), g(w) - w.h / 2]
      ].map(
        ([O, N]) => A`<div
                class="h3"
                data-source-id=${w.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${O}px; top: ${N}px; transform: translateZ(${v}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? A`<svg class="rubber">
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
fe.styles = Nt`
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
$e([
  le({ attribute: !1 })
], fe.prototype, "scene", 2);
$e([
  le({ attribute: !1 })
], fe.prototype, "selectedId", 2);
$e([
  le({ attribute: !1 })
], fe.prototype, "connectable", 2);
$e([
  R()
], fe.prototype, "_rx", 2);
$e([
  R()
], fe.prototype, "_rz", 2);
$e([
  R()
], fe.prototype, "_k", 2);
$e([
  R()
], fe.prototype, "_pan", 2);
$e([
  R()
], fe.prototype, "_liveMove", 2);
$e([
  R()
], fe.prototype, "_connect", 2);
$e([
  R()
], fe.prototype, "_hoverTargetId", 2);
fe = $e([
  Tt("modux-tilt")
], fe);
var Rl = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, Lt = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Dl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Rl(t, i, s), s;
};
const Ll = [
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
let Xe = class extends Ne {
  constructor() {
    super(...arguments), this.page = null, this._editing = null, this._dragId = null, this._overId = null;
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? A`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? A`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? A`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? A`<div class="control">••••••••</div>` : t === "email" ? A`<div class="control">nombre@dominio.com</div>` : t === "money" ? A`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? A`<div class="control">──────●──</div>` : t === "stars" ? A`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? A`<div class="control area">🖼</div>` : t === "link" ? A`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? A`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? A`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? A`<div class="control" style="justify-content:flex-end">0</div>` : A`<div class="control">Texto…</div>`;
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
    const i = (this.page.viewmodelFields ?? []).map((r) => r.fieldId), n = i.indexOf(t), s = i.indexOf(e);
    n < 0 || s < 0 || (i.splice(s, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return ne;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId;
    return A`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="title">${e.name}</span>
        <span class="type">${e.type ?? "FORM"}</span>
        ${e.route ? A`<span class="route">${e.route}</span>` : ne}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (n) => A`<span class="btn" title=${n.useCaseId ?? ""}>${n.label}</span>`
    )}
        <span class="hint">
          ${(e.buttons ?? []).length ? "" : "Sin botones — suelta un caso de uso sobre la página en el mapa"}
        </span>
      </div>
      <div class="body">
        ${i ? A`<table>
              <tr>${t.slice(0, 4).map((n) => A`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => A`<tr>${t.slice(0, 4).map(() => A`<td>···</td>`)}</tr>`)}
            </table>` : ne}
        ${t.length ? A`<div class="grid">
              ${t.map(
      (n) => A`
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
            </div>` : A`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
      </div>
      ${this._editing ? A`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Ll.map(
      (n) => A`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
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
          </div>` : ne}
    `;
  }
};
Xe.styles = Nt`
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
Lt([
  le({ attribute: !1 })
], Xe.prototype, "page", 2);
Lt([
  R()
], Xe.prototype, "_editing", 2);
Lt([
  R()
], Xe.prototype, "_dragId", 2);
Lt([
  R()
], Xe.prototype, "_overId", 2);
Xe = Lt([
  Tt("modux-page-designer")
], Xe);
var Ul = Object.defineProperty, zl = Object.getOwnPropertyDescriptor, B = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? zl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Ul(t, i, s), s;
};
const Di = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, ql = Object.keys(Di);
function yt(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, r = i.y - i.h / 2, d = i.y + i.h / 2;
  let o = 0, a = 1;
  const l = t.x - e.x, u = t.y - e.y;
  for (const [m, f] of [
    [-l, e.x - n],
    [l, s - e.x],
    [-u, e.y - r],
    [u, d - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / m;
    if (m < 0) {
      if (h > a) return !1;
      h > o && (o = h);
    } else {
      if (h < o) return !1;
      h < a && (a = h);
    }
  }
  return a - o > 0.02;
}
function Fl(e, t, i = 28) {
  var l;
  const n = new Map(e.nodes.map((u) => [u.id, u])), s = (u) => {
    var f;
    const m = /* @__PURE__ */ new Set();
    for (let h = u; h; h = (f = n.get(h)) == null ? void 0 : f.parentId) m.add(h);
    return m;
  }, r = e.nodes, d = (u) => u.parentId ? Math.min(i, 6) : i, o = /* @__PURE__ */ new Map(), a = (u, m, f) => {
    const h = d(f), y = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, g = f.w / 2 + h * 1.5, w = f.h / 2 + h * 1.5, v = { x: f.x - g, y: f.y - w }, $ = { x: f.x + g, y: f.y - w }, O = { x: f.x - g, y: f.y + w }, N = { x: f.x + g, y: f.y + w }, b = [];
    for (const x of [v, $, O, N])
      !yt(u, x, y) && !yt(x, m, y) && b.push([x]);
    for (const [x, k] of [
      [v, $],
      [$, v],
      [$, N],
      [N, $],
      [N, O],
      [O, N],
      [O, v],
      [v, O]
    ])
      !yt(u, x, y) && !yt(k, m, y) && b.push([x, k]);
    return b;
  };
  for (const u of e.edges) {
    if ((l = t[u.id]) != null && l.length) continue;
    const m = n.get(u.sourceId), f = n.get(u.targetId);
    if (!m || !f) continue;
    const h = /* @__PURE__ */ new Set([...s(m.id), ...s(f.id)]), y = [
      { x: m.x, y: m.y },
      { x: f.x, y: f.y }
    ];
    for (let g = 0; g < 12; g++) {
      let w = !1;
      e: for (let v = 0; v < y.length - 1; v++)
        for (const $ of r) {
          if (h.has($.id)) continue;
          const O = d($), N = { x: $.x, y: $.y, w: $.w + 2 * O, h: $.h + 2 * O };
          if (!yt(y[v], y[v + 1], N)) continue;
          const b = a(y[v], y[v + 1], $);
          if (!b.length) continue;
          const x = (E) => r.some(
            (D) => D !== $ && !h.has(D.id) && Math.abs(E.x - D.x) < D.w / 2 + d(D) / 2 && Math.abs(E.y - D.y) < D.h / 2 + d(D) / 2
          ), k = (E) => {
            let D = 0;
            const M = [y[v], ...E, y[v + 1]];
            for (let P = 0; P < M.length - 1; P++)
              D += Math.hypot(M[P + 1].x - M[P].x, M[P + 1].y - M[P].y);
            return D + (E.some(x) ? 1e4 : 0);
          };
          b.sort((E, D) => k(E) - k(D)), y.splice(v + 1, 0, ...b[0]), w = !0;
          break e;
        }
      if (!w) break;
    }
    y.length > 2 && o.set(
      u.id,
      y.slice(1, -1).map((g) => ({ x: Math.round(g.x), y: Math.round(g.y) }))
    );
  }
  return o;
}
const j = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Vl(e, t) {
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
function Hl(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let H = class extends Ne {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._paletteTab = "new", this._fullscreen = !1, this._tilt = !1, this._designer = null, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), s = (r) => {
        e.preventDefault(), this.onDiagramScopeChange(r);
      };
      switch (e.key) {
        case "p":
        case "P":
          ["context-map", "workflows", "ui"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
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
    return qt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = qt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = qt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const s = qt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const r = this.viewLayout("context-map"), d = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), o = Li(d), a = [...o.keys()].map((u) => ({
      kind: "move-node",
      view: "context-map",
      id: u,
      pos: r.nodes[u] ?? null
    })), l = { ...r.nodes };
    for (const [u, m] of o) {
      const f = d.find((y) => y.id === u), h = r.nodes[u] ?? { x: f.x, y: f.y };
      l[u] = {
        x: Math.round(h.x + (m.x - f.x)),
        y: Math.round(h.y + (m.y - f.y))
      };
    }
    this.writeViewLayout("context-map", { ...r, nodes: l }), a.length && this.pushUndoEntry(a);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Fl(e, t);
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
    var t, i, n, s, r, d;
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
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app": {
        const o = (this.model.uiApps ?? []).find((u) => u.id === e.appId), a = (u) => {
          for (const m of u ?? []) {
            if (e.itemId ? m.id === e.itemId : m.label === e.label) return m;
            const f = a(m.children);
            if (f) return f;
          }
          return null;
        }, l = e.itemId || e.label ? a(o == null ? void 0 : o.menuItems) : null;
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
        const o = (this.model.pages ?? []).find((l) => l.id === e.pageId), a = ((o == null ? void 0 : o.buttons) ?? []).find((l) => l.useCaseId === e.useCaseId);
        return a ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: a.label }] : null;
      }
      case "set-page-listing": {
        const o = (this.model.pages ?? []).find((a) => a.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (o == null ? void 0 : o.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const o = (this.model.pages ?? []).find((a) => a.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (o == null ? void 0 : o.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const o = (((t = (this.model.pages ?? []).find((a) => a.id === e.pageId)) == null ? void 0 : t.viewmodelFields) ?? []).find((a) => a.fieldId === e.fieldId);
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
        const o = (((i = (this.model.pages ?? []).find((a) => a.id === e.pageId)) == null ? void 0 : i.viewmodelFields) ?? []).map((a) => a.fieldId);
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
        const a = this.model.relations.filter(
          (l) => (l.sourceId === e.id || l.targetId === e.id) && l.type != null
        );
        return [
          { kind: "add-module", id: o.id, name: o.name, subdomainType: o.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...a.map(
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
        const o = (this.model.aggregates ?? []).find((a) => a.id === e.id);
        return o ? [{ kind: "add-aggregate", id: o.id, name: o.name, moduleId: o.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const o of this.model.modules) {
          const a = (o.queryServices ?? []).find((l) => l.id === e.id);
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
          const a = (o.useCases ?? []).find((l) => l.id === e.id);
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
          const a = (o.useCases ?? []).find((l) => l.id === e.id);
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
          const a = (o.mcpServers ?? []).find((l) => l.id === e.id);
          if (a)
            return [
              { kind: "add-mcp-server", id: a.id, name: a.name, moduleId: o.id, uri: a.uri },
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
          const a = (o.applicationEvents ?? []).find((l) => l.id === e.id);
          if (a)
            return [{ kind: "add-application-event", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const o of this.model.modules) {
          const a = (o.domainServices ?? []).find((l) => l.id === e.id);
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
          const a = (o.tables ?? []).find((l) => l.id === e.id);
          if (a) return [{ kind: "add-external-table", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const o = (s = (n = (this.model.rags ?? []).find((a) => a.id === e.sourceId)) == null ? void 0 : n.contentSources) == null ? void 0 : s.find((a) => a.uri === e.uri);
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
        const o = (r = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : r.operations.find((a) => a.id === e.id);
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
        const o = (d = (this.model.apis ?? []).find((a) => a.id === e.apiId)) == null ? void 0 : d.operations.find((a) => a.id === e.id);
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
          const a = (o.readModels ?? []).find((l) => l.id === e.id);
          if (a != null && a.aggregateId)
            return [{ kind: "add-read-model", id: a.id, name: a.name, aggregateId: a.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const o of this.model.modules) {
          const a = (o.domainEvents ?? []).find((l) => l.id === e.id);
          if (a) return [{ kind: "add-domain-event", id: a.id, name: a.name, moduleId: o.id }];
        }
        return null;
      }
      case "rename-element": {
        const a = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((l) => l.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((l) => l.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((l) => l.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((l) => l.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((l) => l.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((l) => l.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((l) => l.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((l) => l.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((l) => l.id === e.id);
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
        const o = (this.model.processes ?? []).find((u) => u.id === e.processId), a = (o == null ? void 0 : o.steps.findIndex((u) => u.id === e.id)) ?? -1;
        if (!o || a < 0) return null;
        const l = o.steps[a];
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
            afterStepId: a > 0 ? o.steps[a - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), a = (o == null ? void 0 : o.steps.findIndex((l) => l.id === e.id)) ?? -1;
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
        const o = (this.model.processes ?? []).find((l) => l.id === e.processId), a = o == null ? void 0 : o.steps.find((l) => l.id === e.id);
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
        const o = (this.model.workflows ?? []).find((u) => u.id === e.workflowId), a = (o == null ? void 0 : o.steps.findIndex((u) => u.id === e.id)) ?? -1;
        if (!o || a < 0) return null;
        const l = o.steps[a];
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
            afterStepId: a > 0 ? o.steps[a - 1].id : void 0
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
        const o = (this.model.workflows ?? []).find((l) => l.id === e.workflowId), a = o == null ? void 0 : o.steps.find((l) => l.id === e.id);
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, r = this.viewLayout(s), d = r.nodes[t] ?? null;
    let o = { x: i, y: n };
    const a = this.sceneFor(s), l = a.nodes.find((m) => m.id === t);
    if (l != null && l.parentId) {
      const m = a.nodes.find((f) => f.id === l.parentId);
      m && (o = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...r, nodes: { ...r.nodes, [t]: o } });
    const u = [{ kind: "move-node", view: s, id: t, pos: d }];
    if (s === "processes") {
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!r || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const d = r.publishedByExternalSystemId ?? "", o = i ?? "";
    if (o === d) return;
    const a = this._view, l = this.viewLayout(a), u = this.sceneFor(a), m = o ? u.nodes.find((y) => y.id === o) : void 0, f = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, h = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: a, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: o }, !1), this.writeViewLayout(a, { ...l, nodes: { ...l.nodes, [t]: f } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t), d = this.model.externalSystems.find((y) => y.id === i);
    if (!r || !d || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const a = `proxy-${j(r.name)}-${j(d.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === a)) return;
    const l = this._view, u = this.viewLayout(l), f = this.sceneFor(l).nodes.find((y) => y.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: a,
        name: `${r.name}@${d.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const h = [{ kind: "remove-proxy-api", id: a }];
    f && (h.push({ kind: "move-node", view: l, id: a, pos: u.nodes[a] ?? null }), this.writeViewLayout(l, {
      ...u,
      nodes: { ...u.nodes, [a]: { x: n - f.x, y: s - f.y } }
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
    var o, a, l;
    const t = e.target, i = (o = t.files) == null ? void 0 : o[0];
    if (t.value = "", !i) return;
    const n = await i.text(), s = this.selectedApiId(), r = s ? null : ((a = this.model.externalSystems.find((u) => u.id === this._selectedId)) == null ? void 0 : a.id) ?? null, d = s || r ? null : ((l = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : l.id) ?? null;
    if (!s && !r && !d) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: s,
      homeExternalId: r,
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
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), r = { ...n.nodes }, d = [];
    for (const { id: o, x: a, y: l } of t) {
      d.push({ kind: "move-node", view: i, id: o, pos: n.nodes[o] ?? null });
      let u = { x: a, y: l };
      const m = s.nodes.find((f) => f.id === o);
      if (m != null && m.parentId) {
        const f = s.nodes.find((h) => h.id === m.parentId);
        f && (u = { x: a - f.x, y: l - f.y });
      }
      r[o] = u;
    }
    if (this.writeViewLayout(i, { ...n, nodes: r }), i === "processes")
      for (const { id: o } of t) {
        const a = this.stepReorderCommand(o);
        if (a) {
          const l = this.inverseOf(a);
          l && d.unshift(...l), this.command(a, !1);
        }
      }
    this.pushUndoEntry(d);
  }
  onNodeResized(e) {
    var u;
    const { id: t, x: i, y: n, w: s, h: r } = e.detail, d = this._view, o = this.viewLayout(d), a = this.sceneFor(d).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: d, id: t, size: ((u = o.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: d, id: t, pos: o.nodes[t] ?? null },
      ...a.map((m) => ({ kind: "move-node", view: d, id: m.id, pos: o.nodes[m.id] ?? null }))
    ]);
    const l = { ...o.nodes, [t]: { x: i, y: n } };
    for (const m of a) l[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(d, {
      ...o,
      nodes: l,
      sizes: { ...o.sizes ?? {}, [t]: { w: s, h: r } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, s = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: s.edges[t] ?? null }
    ]);
    const r = { ...s.edges };
    i.length ? r[t] = i : delete r[t], this.writeViewLayout(n, { ...s, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Ji(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((d) => [d.id, d.x])), s = [...t.steps].sort(
      (d, o) => (n.get(d.id) ?? 0) - (n.get(o.id) ?? 0)
    );
    if (s.every((d, o) => d.id === t.steps[o].id)) return null;
    const r = s.findIndex((d) => d.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: r > 0 ? s[r - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    this.applyConnection(t, i, n, s);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, n) {
    var N;
    if (this._view === "workflows") {
      const b = this.owningWorkflowOf(e), x = this.owningWorkflowOf(t);
      if (!b || b !== x || e === t) return;
      const k = b.steps.find((E) => E.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: b.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const b = this.model.pages ?? [], x = this.model.uiApps ?? [], k = (P) => x.some((q) => q.id === P), E = (P) => b.some((q) => q.id === P);
      if (E(e) && k(t)) {
        const P = b.find((q) => q.id === e);
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: P.name,
          pageId: e,
          itemId: this.newMenuItemId(P.name)
        });
        return;
      }
      const D = qe(e) ?? qe(t);
      if (D) {
        const P = qe(e) ? t : e;
        E(P) ? this.command({ kind: "set-menu-page", pageId: P, ...D }) : k(P) && P !== D.appId && this.command({ kind: "set-menu-app", toAppId: P, ...D });
        return;
      }
      if ((this.model.actors ?? []).some((P) => P.id === e) && k(t)) {
        (this.model.actorAppUses ?? []).some((P) => P.actorId === e && P.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const M = E(e) ? { pageId: e, other: t } : E(t) ? { pageId: t, other: e } : null;
      if (M) {
        const P = new Set(
          this.model.modules.flatMap((p) => (p.useCases ?? []).map((_) => _.id))
        ), q = new Set(
          this.model.modules.flatMap((p) => (p.queryServices ?? []).map((_) => _.id))
        ), K = b.find((p) => p.id === M.pageId);
        P.has(M.other) ? (K.buttons ?? []).some((p) => p.useCaseId === M.other) || this.command({ kind: "add-page-button", pageId: M.pageId, useCaseId: M.other }) : q.has(M.other) && this.command({ kind: "set-page-listing", pageId: M.pageId, queryServiceId: M.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, b, x] = s, k = (this.model.proxyApis ?? []).find((q) => q.id === x), E = (k == null ? void 0 : k.targetApiId) ?? ((N = (this.model.apiImplementations ?? []).find(
        (q) => q.moduleId === x && (this.model.apis ?? []).some(
          (K) => K.id === q.apiId && K.operations.some((p) => p.id === b)
        )
      )) == null ? void 0 : N.apiId);
      if (!E) return;
      if (new Set(
        this.model.modules.flatMap((q) => (q.useCases ?? []).map((K) => K.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: E,
          operationId: b,
          moduleId: x,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let M = null;
      if (t === k.targetApiId)
        M = k.targetApiId;
      else {
        const q = /^apiimpl:(.+)@(.+)$/.exec(t);
        q && q[1] === k.targetApiId ? M = q[2] : this.model.modules.some((K) => K.id === t) && (this.model.apiImplementations ?? []).some(
          (K) => K.apiId === k.targetApiId && K.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (q) => q.proxyId === k.id && q.operationId === b && q.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: b,
        targetSiteId: M
      });
      return;
    }
    const r = new Set((this.model.aiAgents ?? []).map((b) => b.id));
    if (r.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (P) => P.agentId === e && P.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.useCases ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (P) => P.agentId === e && P.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.mcpServers ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (P) => P.agentId === e && P.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((M) => M.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (P) => P.agentId === e && P.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((M) => M.operations.map((P) => P.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (P) => P.agentId === e && P.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (P) => P.agentId === e && P.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((M) => (M.queryServices ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (P) => P.agentId === e && P.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (r.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (P) => P.agentId === e && P.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((M) => M.id === t) && ((this.model.agentRags ?? []).some(
        (P) => P.agentId === e && P.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((b) => b.id === e)) {
      const b = (this.model.mcpGateways ?? []).find((E) => E.id === e), x = this.model.externalSystems.some((E) => (E.mcpServers ?? []).some((D) => D.id === t)) || (this.model.apis ?? []).some((E) => E.id === t) || (this.model.apis ?? []).some((E) => E.operations.some((D) => D.id === t)) || this.model.modules.some((E) => (E.useCases ?? []).some((D) => D.id === t)) || (this.model.rags ?? []).some((E) => E.id === t), k = [
        ...b.mcpServerIds ?? [],
        ...b.apiIds ?? [],
        ...b.apiOperationIds ?? [],
        ...b.useCaseIds ?? [],
        ...b.ragIds ?? []
      ].includes(t);
      x && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((b) => b.id === t)) return;
    const d = (this.model.rags ?? []).find((b) => b.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map((E) => E.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map((E) => E.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((b) => b.id === t)) return;
    if ((this.model.workflows ?? []).some((b) => b.id === e)) {
      const b = (this.model.workflows ?? []).find((E) => E.id === e), x = (this.model.workflows ?? []).find(
        (E) => E.id === t && E.id !== e
      );
      if (x) {
        const E = b.onCompletionEventName || `${b.name.replace(/\s+/g, "")}Completado`;
        x.triggerEvent !== E && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: E });
        return;
      }
      const k = this.model.modules.flatMap((E) => E.useCases ?? []).find((E) => E.id === t);
      if (k && !(b.steps ?? []).some((D) => D.targetUseCaseId === t)) {
        const D = `wfs-${j(k.name)}`;
        let M = D;
        for (let P = 2; (b.steps ?? []).some((q) => q.id === M); P++)
          M = `${D}-${P}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: M,
          name: k.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((b) => b.id === t)) {
      const b = this.model.modules.flatMap((E) => E.domainEvents ?? []).find((E) => E.id === e), x = this.model.modules.flatMap((E) => E.applicationEvents ?? []).find((E) => E.id === e), k = b ?? x;
      if (k) {
        const E = (this.model.emissions ?? []).find((q) => q.domainEventId === e), D = new Set((this.model.aggregates ?? []).map((q) => q.id)), M = new Set(
          this.model.modules.flatMap((q) => (q.domainServices ?? []).map((K) => K.id))
        ), P = new Set(
          this.model.modules.flatMap((q) => (q.useCases ?? []).map((K) => K.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: E && D.has(E.sourceId) ? E.sourceId : void 0,
          triggerDomainServiceId: E && M.has(E.sourceId) ? E.sourceId : void 0,
          triggerUseCaseId: E && P.has(E.sourceId) ? E.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((b) => b.id === e)) {
      const b = (this.model.proxyApis ?? []).find((x) => x.id === e);
      if ((this.model.apis ?? []).some((x) => x.id === t)) {
        b.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((x) => x.id === t)) {
        if (!b.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === b.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: b.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((x) => x.id === t) && b.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((b) => b.id === e)) {
      if (this.model.externalSystems.some((b) => b.id === t)) {
        (this.model.apis ?? []).find((x) => x.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((b) => b.id === t) && ((this.model.apiImplementations ?? []).some(
        (x) => x.apiId === e && x.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const o = new Set((this.model.actors ?? []).map((b) => b.id));
    if (r.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((k) => k.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === e && k.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!o.has(e)) return;
    }
    if (o.has(e)) {
      const b = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((E) => E.id))
      ), x = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map((E) => E.id))
      );
      if (b.has(t) || x.has(t)) {
        (this.model.actorUses ?? []).some(
          (E) => E.actorId === e && E.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((k) => k.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (E) => E.actorId === e && E.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((k) => k.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (E) => E.actorId === e && E.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const a = this.owningApiOf(e);
    if (a) {
      if (new Set(
        this.model.modules.flatMap((x) => (x.useCases ?? []).map((k) => k.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: a.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((x) => x.id === t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: a.id,
          id: e,
          moduleId: t
        });
        return;
      }
      return;
    }
    const l = this.model.externalSystems.flatMap((b) => b.useCases ?? []).find((b) => b.id === e), u = this.model.externalSystems.flatMap((b) => b.tables ?? []).find((b) => b.id === e);
    if (l || u) {
      const b = (l ?? u).name, x = l ? { externalUseCaseId: e } : { externalTableId: e }, k = (M) => l ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, E = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if (E) {
        (this.model.projections ?? []).some(
          (P) => k(P) && P.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(b)}-${j(E.name)}`,
          name: `${E.name}Projection`,
          ...x,
          targetId: t
        });
        return;
      }
      const D = this.model.modules.find((M) => M.id === t);
      if (D) {
        (this.model.projections ?? []).some(
          (P) => k(P) && P.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(b)}-${j(D.name)}`,
          name: `${b}ViewProjection`,
          ...x,
          moduleId: t,
          readModelName: `${b}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((b) => b.id === e);
    if (m) {
      const b = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (b) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(m.name)}-${j(b.name)}`,
          name: `${b.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const x = this.model.modules.find((k) => k.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(m.name)}-${j(x.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((b) => (b.domainEvents ?? []).map((x) => x.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((b) => b.id),
      ...this.model.modules.flatMap((b) => (b.domainServices ?? []).map((x) => x.id))
    ]), y = new Set(
      this.model.modules.flatMap((b) => (b.applicationEvents ?? []).map((x) => x.id))
    ), g = new Set(this.model.modules.flatMap((b) => (b.useCases ?? []).map((x) => x.id))), w = new Set(
      this.model.modules.flatMap((b) => (b.queryServices ?? []).map((x) => x.id))
    );
    if (g.has(e) && w.has(t)) {
      (this.model.queryCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap((b) => (b.useCases ?? []).map((x) => x.id))
    );
    if (g.has(e) && v.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && g.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && (this.model.aggregates ?? []).some((b) => b.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && f.has(t) || g.has(e) && y.has(t)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === e && x.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || y.has(e)) {
      const b = y.has(e), x = this.model.modules.flatMap((I) => (b ? I.applicationEvents : I.domainEvents) ?? []).find((I) => I.id === e), k = this.model.modules.flatMap((I) => (I.useCases ?? []).map((S) => ({ u: S, module: I }))).find(({ u: I }) => I.id === t), E = this.model.modules.flatMap((I) => (I.readModels ?? []).map((S) => ({ rm: S, module: I }))).find(({ rm: I }) => I.id === t), D = this.model.modules.find((I) => I.id === t) ?? (E == null ? void 0 : E.module) ?? (k == null ? void 0 : k.module);
      if (!x || !D) return;
      const M = new Set((this.model.aggregates ?? []).map((I) => I.id)), P = new Set(
        this.model.modules.flatMap((I) => (I.domainServices ?? []).map((S) => S.id))
      ), q = (this.model.emissions ?? []).find(
        (I) => I.domainEventId === e && (b ? g.has(I.sourceId) : M.has(I.sourceId) || P.has(I.sourceId))
      );
      if (!q) {
        this.emit("modux-notice", {
          message: b ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const K = !b && M.has(q.sourceId);
      if (k) {
        if (this.model.flows.some(
          (S) => S.archetype === "TRIGGERS" && S.triggerEvent === x.name && S.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(x.name)}-${j(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: K ? q.sourceId : "",
          triggerDomainServiceId: !b && !K ? q.sourceId : void 0,
          triggerUseCaseId: b ? q.sourceId : void 0,
          triggerEvent: x.name,
          targetId: D.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const p = (E == null ? void 0 : E.rm.name) ?? `${x.name}View`;
      if (this.model.flows.some(
        (I) => I.archetype === "MATERIALIZES" && I.triggerEvent === x.name && I.targetId === D.id && I.readModelName === p
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${j(x.name)}-${j(p)}`,
        name: p,
        archetype: "MATERIALIZES",
        triggerAggregateId: K ? q.sourceId : "",
        triggerDomainServiceId: !b && !K ? q.sourceId : void 0,
        triggerUseCaseId: b ? q.sourceId : void 0,
        triggerEvent: x.name,
        targetId: D.id,
        readModelName: p
      });
      return;
    }
    const $ = /* @__PURE__ */ new Set([
      ...h,
      ...g,
      ...w,
      ...this.model.modules.flatMap((b) => (b.readModels ?? []).map((x) => x.id))
    ]);
    if ($.has(e) || $.has(t) || f.has(t) || y.has(t))
      return;
    const O = new Set(this.model.externalSystems.map((b) => b.id));
    if (O.has(e)) {
      if (new Set(
        this.model.modules.flatMap((D) => (D.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (O.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const x = (this.model.apis ?? []).find(
        (D) => D.operations.some((M) => M.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), E = x ? { operationId: t, siteId: x.id } : k ? { operationId: k[1], siteId: k[2] } : null;
      if (E) {
        (this.model.externalOperationUses ?? []).some(
          (M) => M.externalSystemId === e && M.operationId === E.operationId && M.siteId === E.siteId
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
          (M) => M.sourceId === e && M.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    O.has(t) || o.has(t);
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
      const s = this.memberIdOf(i, n), r = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
      if (s && (r != null && r.memberIds.includes(s))) {
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
          const r = qe(s[1]);
          r && this.command({ kind: "set-menu-page", pageId: null, ...r });
        } else if (s = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const r = qe(s[1]);
          r && this.command({ kind: "set-menu-app", toAppId: null, ...r });
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
      if (i === "menu-item") {
        const s = qe(t);
        s && this.command({ kind: "remove-menu-item", ...s });
        return;
      }
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const s = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      const r = this.owningWorkflowOf(s[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
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
      const [, r, d] = s, o = (n = (this.model.apis ?? []).find(
        (a) => a.operations.some((l) => l.id === r)
      )) == null ? void 0 : n.id;
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: o, operationId: r, moduleId: d });
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
      const [, r, d, o] = s, a = /^apiimpl:.+@(.+)$/.exec(o), l = a ? a[1] : o;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: d, operationId: r, targetSiteId: l });
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
      const s = /^apiwire:(.+)$/.exec(t), r = s ? this.owningApiOf(s[1]) : null;
      if (!s || !r) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: r.id, id: s[1] });
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
      if (!s || !(this.model.proxyApis ?? []).some((r) => r.id === s[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
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
      id: `step-${j(e)}`,
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
      id: `wfstep-${j(e)}`,
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
    const t = new Set(e.memberIds), i = (s, r, d = {}) => A`
      <label
        class="${d.child ? "child" : ""} ${d.implicit && !t.has(s) ? "implicit" : ""}"
        title=${d.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(o) => this.toggleViewMember(s, o.target.checked)}
        />
        ${r}
      </label>
    `, n = (s, r) => r.length ? A`<h4>${s}</h4>${r}` : "";
    return A`
      <aside class="view-tree" @pointerdown=${(s) => s.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.modules.flatMap((s) => [
        i(s.id, s.name),
        ...(this.model.aggregates ?? []).filter((r) => r.moduleId === s.id).map((r) => i(r.id, r.name, { child: !0, implicit: t.has(s.id) }))
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
    if (!e || !t.length) return;
    const i = `view-${j(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((a) => t.has(a.id)), n = new Set(i.map((a) => a.id)), s = this.model.externalSystems.filter((a) => t.has(a.id)), r = new Set(s.map((a) => a.id)), d = (this.model.aggregates ?? []).filter(
      (a) => t.has(a.id) || n.has(a.moduleId)
    ), o = new Set(d.map((a) => a.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (a) => n.has(a.sourceId) && n.has(a.targetId)
      ),
      flows: this.model.flows.filter(
        (a) => t.has(a.id) || (n.has(a.sourceId) || r.has(a.sourceId)) && (n.has(a.targetId) || r.has(a.targetId))
      ),
      aggregates: d,
      entities: (this.model.entities ?? []).filter((a) => o.has(a.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (a) => o.has(a.sourceAggregateId) && o.has(a.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (a) => t.has(a.id) || (a.ownerModuleId ? n.has(a.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((a) => t.has(a.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((a) => t.has(a.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((a) => t.has(a.id)),
      rags: (this.model.rags ?? []).filter((a) => t.has(a.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((a) => t.has(a.id)),
      apis: (this.model.apis ?? []).filter(
        (a) => t.has(a.id) || (a.publishedByExternalSystemId ? r.has(a.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (a) => t.has(a.id) || (a.publishedByExternalSystemId ? r.has(a.publishedByExternalSystemId) : !1)
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
      this._designer = e.detail.id;
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
    const t = e.detail.kind === "process-step" ? Hl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Vl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (r) => {
      for (const d of r ?? [])
        d.id && t.add(d.id), i(d.children);
    };
    (this.model.uiApps ?? []).forEach((r) => i(r.menuItems));
    const n = `mi-${j(e)}`;
    let s = n;
    for (let r = 2; t.has(s); r++) s = `${n}-${r}`;
    return s;
  }
  /** The «Figma» panel: a page's mockup inferred from its declaration. */
  renderDesigner() {
    if (!this._designer || this._view !== "ui") return "";
    const e = (this.model.pages ?? []).find((t) => t.id === this._designer);
    return e ? A`<modux-page-designer
      .page=${e}
      @designer-closed=${() => this._designer = null}
      @open-crud=${() => {
      this.emit("modux-activate", { elementType: "page", id: e.id });
    }}
      @field-config-changed=${(t) => {
      const { fieldId: i, stereotype: n, colspan: s, label: r } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: e.id, fieldId: i, stereotype: n, colspan: s, label: r });
    }}
      @fields-reordered=${(t) => {
      this.command({ kind: "set-page-field-order", pageId: e.id, fieldIds: t.detail.fieldIds });
    }}
    ></modux-page-designer>` : "";
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
    const i = this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY), s = i.nodeIdAtClient(e.clientX, e.clientY);
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      return;
    }
    r.new ? this.createFromPalette(r.new, n, s) : r.existing && this.placeExistingFromPalette(r.existing, n, s, e.clientX, e.clientY);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((s) => s.id)), n = this.model;
    for (const s of [
      n.modules.map((r) => r.id),
      (n.actors ?? []).map((r) => r.id),
      n.externalSystems.map((r) => r.id),
      (n.apis ?? []).map((r) => r.id),
      (n.proxyApis ?? []).map((r) => r.id),
      (n.aiAgents ?? []).map((r) => r.id),
      (n.rags ?? []).map((r) => r.id),
      (n.workflows ?? []).map((r) => r.id),
      (n.workflows ?? []).flatMap((r) => (r.steps ?? []).map((d) => d.id)),
      (n.uiApps ?? []).map((r) => r.id),
      (n.pages ?? []).map((r) => r.id)
    ])
      s.forEach((r) => i.add(r));
    for (let s = 1; ; s++) {
      const r = s === 1 ? e : `${e} ${s}`, d = `${t}${j(r)}`;
      if (!i.has(d)) return { id: d, name: r };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var r, d;
    if (!t) return null;
    const i = this.sceneFor(this._view), n = [];
    for (let o = t; o; )
      n.push(o), o = (r = i.nodes.find((a) => a.id === o)) == null ? void 0 : r.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return n.find((o) => this.model.modules.some((a) => a.id === o)) ?? null;
    if (e === "read-model") {
      const o = n.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (o) return o;
      const a = n.find((l) => this.model.modules.some((u) => u.id === l));
      return ((d = (this.model.aggregates ?? []).find((l) => l.moduleId === a)) == null ? void 0 : d.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((o) => this.model.externalSystems.some((a) => a.id === o)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (o) => this.model.modules.some((a) => (a.useCases ?? []).some((l) => l.id === o))
      ) ?? null;
    if (e === "api-operation") {
      for (const o of n) {
        if ((this.model.apis ?? []).some((u) => u.id === o)) return o;
        const a = /^apiimpl:(.+)@(.+)$/.exec(o);
        if (a && (this.model.apis ?? []).some((u) => u.id === a[1])) return a[1];
        const l = (this.model.proxyApis ?? []).find((u) => u.id === o);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((o) => this.model.externalSystems.some((a) => a.id === o)) ?? n.find((o) => this.model.modules.some((a) => a.id === o)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var u, m, f;
    const n = H.PALETTE_NEW.find((h) => h.type === e);
    if (!n) return;
    const s = this._view, r = this.sceneFor(s), d = (h, y) => {
      const g = this.viewLayout(s), w = y ? r.nodes.find(($) => $.id === y) : void 0, v = w ? { x: Math.round(t.x - w.x), y: Math.round(t.y - w.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...g, nodes: { ...g.nodes, [h]: v } }), { kind: "move-node", view: s, id: h, pos: null };
    }, o = (h, y, g) => {
      const w = this.inverseOf(h) ?? [];
      this.command(h, !1);
      const v = d(y, g);
      this.pushUndoEntry([...w, v]);
    };
    if (!n.child) {
      const h = {
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
      }, { id: y, name: g } = this.uniquePaletteName(n.label, h[e] ?? ""), w = e === "module" ? { kind: "add-module", id: y, name: g, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: y, name: g } : e === "external-system" ? { kind: "add-external-system", id: y, name: g } : e === "ai-agent" ? { kind: "add-ai-agent", id: y, name: g } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: y, name: g, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: y, name: g } : e === "rag" ? { kind: "add-rag", id: y, name: g } : e === "api" ? { kind: "add-api", id: y, name: g } : e === "proxy-api" ? { kind: "add-proxy-api", id: y, name: g } : e === "ui-app" ? { kind: "create-ui-app", id: y, name: g } : {
        kind: "add-workflow",
        id: y,
        name: g,
        completionEventName: `${g.replace(/\s+/g, "")}Completado`
      };
      o(w, y);
      return;
    }
    if (e === "page") {
      const { id: h, name: y } = this.uniquePaletteName("Página", "page-"), g = [];
      for (let v = i ?? void 0; v; )
        g.push(v), v = (u = r.nodes.find(($) => $.id === v)) == null ? void 0 : u.parentId;
      const w = g.find((v) => (this.model.uiApps ?? []).some(($) => $.id === v));
      if (w) {
        const v = r.nodes.find(($) => $.id === w);
        v && (t.x = v.x + v.w / 2 + 160, t.y = v.y - v.h / 2 + 40);
      }
      o(
        w ? { kind: "create-ui-page", id: h, name: y, pageType: "FORM", appId: w, menuLabel: y } : { kind: "create-ui-page", id: h, name: y, pageType: "FORM" },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const h = [];
      for (let O = i ?? void 0; O; )
        h.push(O), O = (m = r.nodes.find((N) => N.id === O)) == null ? void 0 : m.parentId;
      const y = h.find((O) => (this.model.uiApps ?? []).some((N) => N.id === O));
      if (!y) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const g = /* @__PURE__ */ new Set(), w = (O) => {
        for (const N of O ?? [])
          g.add(N.label), w(N.children);
      };
      (this.model.uiApps ?? []).forEach((O) => w(O.menuItems));
      let v = "Entrada";
      for (let O = 2; g.has(v); O++) v = `Entrada ${O}`;
      const $ = h.map((O) => qe(O)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: y,
        label: v,
        itemId: this.newMenuItemId(v),
        parentId: $ == null ? void 0 : $.itemId,
        parentLabel: $ != null && $.itemId || $ == null ? void 0 : $.label
      });
      return;
    }
    if (e === "workflow-step") {
      const h = this.model.workflows ?? [], y = [];
      for (let N = i ?? void 0; N; )
        y.push(N), N = (f = r.nodes.find((b) => b.id === N)) == null ? void 0 : f.parentId;
      const g = y.map((N) => h.find((b) => b.id === N)).find(Boolean), w = y.map((N) => {
        const b = h.find((x) => (x.steps ?? []).some((k) => k.id === N));
        return b ? { owner: b, stepId: N } : null;
      }).find(Boolean), v = g ?? (w == null ? void 0 : w.owner);
      if (!v) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: $, name: O } = this.uniquePaletteName("Paso", "wfs-");
      w && (t = { x: t.x + 190, y: t.y }), o(
        {
          kind: "add-workflow-step",
          workflowId: v.id,
          id: $,
          name: O,
          ...w ? { dependsOnStepIds: [w.stepId], afterStepId: w.stepId } : {}
        },
        $
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${v.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const h = this.dropContainerFor("api", i);
      if (!h) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: y, name: g } = this.uniquePaletteName("API", "api-"), w = { kind: "add-api", id: y, name: g }, v = this.inverseOf(w) ?? [];
      this.command(w, !1), this.model.externalSystems.some((b) => b.id === h) ? this.command({ kind: "set-api-publisher", id: y, targetId: h }, !1) : this.command({ kind: "add-api-implementation", apiId: y, moduleId: h }, !1);
      const $ = this.viewLayout(this._view), O = this.sceneFor(this._view).nodes.find((b) => b.id === h), N = O ? { x: Math.round(t.x - O.x), y: Math.round(t.y - O.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...$, nodes: { ...$.nodes, [y]: N } }), this.pushUndoEntry([...v, { kind: "move-node", view: this._view, id: y, pos: null }]);
      return;
    }
    const a = this.dropContainerFor(e, i);
    if (!a) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: l } = this.uniquePaletteName(n.label, "");
    if (e === "aggregate") {
      const h = `agg-${j(l)}`;
      o({ kind: "add-aggregate", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "use-case" || e === "policy") {
      const h = `uc-${j(l)}`;
      o(
        { kind: "add-use-case", id: h, name: l, moduleId: a, ...e === "policy" ? { policy: !0 } : {} },
        h,
        a
      );
    } else if (e === "domain-event") {
      const h = `ev-${j(l)}`;
      o({ kind: "add-domain-event", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "application-event") {
      const h = `aev-${j(l)}`;
      o({ kind: "add-application-event", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "domain-service") {
      const h = `ds-${j(l)}`;
      o({ kind: "add-domain-service", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "query-service") {
      const h = `qs-${j(l)}`;
      o({ kind: "add-query-service", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "read-model") {
      const h = `rm-${j(l)}`, y = (this.model.aggregates ?? []).find((g) => g.id === a);
      o({ kind: "add-read-model", id: h, name: l, aggregateId: a }, h, (y == null ? void 0 : y.moduleId) ?? a);
    } else if (e === "api-operation") {
      const h = (this.model.apis ?? []).find(($) => $.id === a), y = new Set(((h == null ? void 0 : h.operations) ?? []).map(($) => $.id));
      let g = l, w = `apiop-${a.replace(/^api-/, "")}-${j(g)}`;
      for (let $ = 2; y.has(w); $++)
        g = `${n.label} ${$}`, w = `apiop-${a.replace(/^api-/, "")}-${j(g)}`;
      o({ kind: "add-api-operation", apiId: a, id: w, name: g }, w, a), r.nodes.some(
        ($) => $.parentId === a && ($.kind === "api-operation" || $.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(h == null ? void 0 : h.name) ?? a} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const h = this.model.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === a), y = new Set((h == null ? void 0 : h.stepIds) ?? []);
      let g = l, w = `step-${j(g)}`;
      for (let v = 2; y.has(w); v++)
        g = `${n.label} ${v}`, w = `step-${j(g)}`;
      o({ kind: "add-use-case-step", useCaseId: a, id: w, name: g }, w, a), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(h == null ? void 0 : h.name) ?? a} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const h = `xuc-${j(l)}`;
      o({ kind: "add-external-use-case", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "external-table") {
      const h = `tbl-${j(l)}`;
      o({ kind: "add-external-table", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "mcp-server") {
      const h = `mcpsrv-${j(l)}`;
      o({ kind: "add-mcp-server", id: h, name: l, moduleId: a }, h, a);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
      return;
    }
    const r = this._view, d = this.sceneFor(r), o = d.nodes.find((m) => m.id === e);
    if (!o) {
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
    const a = this.viewLayout(r), l = o.parentId ? d.nodes.find((m) => m.id === o.parentId) : void 0, u = l ? { x: Math.round(t.x - l.x), y: Math.round(t.y - l.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: r, id: e, pos: a.nodes[e] ?? null }]), this.writeViewLayout(r, { ...a, nodes: { ...a.nodes, [e]: u } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = H.PALETTE_NEW.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(n.type) : this._view === "ui" ? ["ui-app", "page", "menu-item"].includes(n.type) : !["ui-app", "page", "menu-item"].includes(n.type)) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return A`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? A`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${t.map(
      (n) => A`
                    <div
                      class="palette-item ${n.child ? "palette-child" : ""}"
                      draggable="true"
                      title=${n.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : n.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                      @dragstart=${(s) => this.onPaletteDragStart(s, { new: n.type })}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                        ${it[n.symbol]}
                      </svg>
                      <span class="pal-label">${n.label}</span>
                    </div>
                  `
    )}
              ` : A`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => A`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (s) => A`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(r) => this.onPaletteDragStart(r, { existing: s.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${it[n.symbol]}
                          </svg>
                          <span class="pal-label">${s.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : A`
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
    var t, i, n, s, r, d, o;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const a = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!a) return;
        this.command({ kind: "add-aggregate", id: `agg-${j(e)}`, name: e, moduleId: a });
      } else if (this._view === "flows") {
        const a = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), l = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), u = this._newTriggerEvent.trim();
        if (!a || !l || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: a,
          triggerEvent: u,
          targetId: l
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const a = this._newModuleId || ((r = this.model.modules[0]) == null ? void 0 : r.id);
        if (!a) return;
        this.command({
          kind: "add-process",
          id: `proc-${j(e)}`,
          name: e,
          moduleId: a,
          triggerAggregateId: this._newTriggerAggId || ((o = (d = this.model.aggregates) == null ? void 0 : d[0]) == null ? void 0 : o.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? no(i, t.nodes) : e === "flows" ? ho(i, t.nodes) : e === "processes" ? Ji(i, t.nodes) : e === "workflows" ? kl(i, t.nodes) : e === "ui" ? Ml(i, t.nodes) : e === "eventstorming" ? gl(i, t.nodes) : Ks(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const s of n.nodes) {
        const r = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        r && (s.diffKind = r);
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
    var a;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId), n = new Set(i.map((l) => l.id)), s = {
      nodes: i,
      edges: t.edges.filter((l) => n.has(l.sourceId) && n.has(l.targetId))
    }, d = await Pl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), o = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: d, edges: {}, sizes: o.sizes }), await this.updateComplete, (a = this.renderRoot.querySelector("modux-canvas")) == null || a.fit();
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
    return A`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "workflows", "ui"].includes(this._view)}
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
            </optgroup>
          </select>
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(t) => this._activeViewId = t.target.value}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? A`
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
      (t) => A`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? A`
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
        ${this._view === "aggregates" || this._view === "processes" ? A`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? A`
              ${this._view === "flows" ? A`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => A`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return A`<option
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
              ${this._view === "flows" ? A`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return A`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? A`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => A`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? A`
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
      (t) => A`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? A`<input
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
              ${this.owningProcessOf(this._selectedId) ? A`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? A`
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
      (t) => A`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? A`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this.renderDesigner()}
      ${this._tilt ? A`
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
          ></modux-tilt>` : A`
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
        ${this._view === "context-map" ? A`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? A`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? A`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : A`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? A`
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
      ([t, i]) => A`
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
    return A`
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
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => A`
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
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${ql.map(
      (n) => A`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Di[n].abbr}</span>
              <span class="name">${Di[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
H.styles = Nt`
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
    modux-tilt {
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
  { type: "menu-item", label: "Entrada de menú", child: !0, symbol: "process", color: "#0ea5e9" }
];
B([
  le({ attribute: !1 })
], H.prototype, "model", 2);
B([
  le({ attribute: !1 })
], H.prototype, "layout", 2);
B([
  le({ attribute: !1 })
], H.prototype, "diff", 2);
B([
  R()
], H.prototype, "_view", 2);
B([
  R()
], H.prototype, "_detail", 2);
B([
  R()
], H.prototype, "_relationType", 2);
B([
  R()
], H.prototype, "_relationPicker", 2);
B([
  R()
], H.prototype, "_extDepPicker", 2);
B([
  R()
], H.prototype, "_selectedId", 2);
B([
  R()
], H.prototype, "_paletteOpen", 2);
B([
  R()
], H.prototype, "_paletteFilter", 2);
B([
  R()
], H.prototype, "_paletteTab", 2);
B([
  R()
], H.prototype, "_fullscreen", 2);
B([
  R()
], H.prototype, "_tilt", 2);
B([
  R()
], H.prototype, "_designer", 2);
B([
  R()
], H.prototype, "_helpOpen", 2);
B([
  R()
], H.prototype, "_newName", 2);
B([
  R()
], H.prototype, "_newModuleId", 2);
B([
  R()
], H.prototype, "_newArchetype", 2);
B([
  R()
], H.prototype, "_newTriggerAggId", 2);
B([
  R()
], H.prototype, "_newTriggerEvent", 2);
B([
  R()
], H.prototype, "_newTargetId", 2);
B([
  R()
], H.prototype, "_undoStack", 2);
B([
  R()
], H.prototype, "_redoStack", 2);
B([
  R()
], H.prototype, "_newStepName", 2);
B([
  R()
], H.prototype, "_newStepType", 2);
B([
  R()
], H.prototype, "_newStepRole", 2);
B([
  R()
], H.prototype, "_newStepDeadline", 2);
B([
  R()
], H.prototype, "_editStepRole", 2);
B([
  R()
], H.prototype, "_editStepDeadline", 2);
B([
  R()
], H.prototype, "_editStepComp", 2);
B([
  R()
], H.prototype, "_newStepUseCase", 2);
B([
  R()
], H.prototype, "_newStepEmits", 2);
B([
  R()
], H.prototype, "_editStepUseCase", 2);
B([
  R()
], H.prototype, "_editStepEmits", 2);
B([
  R()
], H.prototype, "_editStepAwaits", 2);
B([
  R()
], H.prototype, "_multi", 2);
B([
  R()
], H.prototype, "_newViewName", 2);
B([
  R()
], H.prototype, "_activeViewId", 2);
B([
  R()
], H.prototype, "_newRagSourceType", 2);
B([
  R()
], H.prototype, "_newRagSourceUri", 2);
B([
  R()
], H.prototype, "_addMemberKey", 2);
B([
  R()
], H.prototype, "_treeOpen", 2);
B([
  R()
], H.prototype, "_deletePicker", 2);
H = B([
  Tt("modux-editor")
], H);
var Bl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, ge = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Wl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (s = (n ? d(t, i, s) : d(s)) || s);
  return n && s && Bl(t, i, s), s;
};
let re = class extends Ne {
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
    ], t = (n) => re.TYPE_LABELS[n] ?? n;
    return A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: s, mark: r, cls: d }) => {
      const o = this._diff.changes.filter((a) => a.kind === n);
      return o.length ? A`
            <div class="diff-group">${s} (${o.length})</div>
            ${o.map(
        (a) => A`
                <div class="diff-row">
                  <span class="diff-mark ${d}">${r}</span>
                  <span class="diff-type">${t(a.type)}</span>
                  <span class="diff-name" title=${a.id}>${a.name ?? a.id}</span>
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
    var s, r, d;
    const i = (s = this._workspace) == null ? void 0 : s.current;
    await this.trackWrite(async () => {
      var o;
      try {
        const a = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!a.ok) {
          let l = `El servidor rechazó la operación (${a.status})`;
          try {
            const u = await a.json();
            u != null && u.message && (l = u.message);
          } catch {
          }
          this.showToast(l);
          return;
        }
        this._workspace = await a.json(), await this.reload(), await this.refreshDiff(), (o = this.renderRoot.querySelector("modux-editor")) == null || o.clearHistory();
      } catch (a) {
        this.showToast(String(a));
      }
    });
    const n = (r = this._workspace) == null ? void 0 : r.current;
    if (n && n !== i) {
      const o = ((d = this._workspace.solutions.find((a) => a.branch === n)) == null ? void 0 : d.name) ?? n.replace(/^solution\//, "");
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
    const { content: t, fileName: i, apiId: n, homeExternalId: s, homeModuleId: r } = e.detail;
    await this.trackWrite(async () => {
      try {
        const d = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
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
        const { apiId: o } = await d.json(), a = s ? { kind: "set-api-publisher", id: o, targetId: s } : r ? { kind: "add-api-implementation", apiId: o, moduleId: r } : null;
        a && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a)
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
    return this._error ? A`<div class="status error">modux editor: ${this._error}</div>` : this._model ? A`
      ${this._workspace ? A`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : A`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((s) => s.kind === n).length;
      return A`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? A`
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
      return A`
                      ${i === "EXPLORING" ? A`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? A`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? A`<button
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
      ${this._mergeFlow ? A`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => A`
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
      ${this._toast ? A`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : A`<div class="status">Cargando el modelo…</div>`;
  }
};
re.styles = Nt`
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
re.TYPE_LABELS = {
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
ge([
  le()
], re.prototype, "base", 2);
ge([
  R()
], re.prototype, "_model", 2);
ge([
  R()
], re.prototype, "_layout", 2);
ge([
  R()
], re.prototype, "_error", 2);
ge([
  R()
], re.prototype, "_saving", 2);
ge([
  R()
], re.prototype, "_toast", 2);
ge([
  R()
], re.prototype, "_workspace", 2);
ge([
  R()
], re.prototype, "_creatingSolution", 2);
ge([
  R()
], re.prototype, "_newSolutionName", 2);
ge([
  R()
], re.prototype, "_diff", 2);
ge([
  R()
], re.prototype, "_diffListOpen", 2);
ge([
  R()
], re.prototype, "_mergeFlow", 2);
re = ge([
  Tt("modux-editor-connected")
], re);
export {
  Gl as CONTAINER_HEADER,
  Yl as CONTAINER_INSET,
  se as ModuxCanvas,
  H as ModuxEditor,
  re as ModuxEditorConnected,
  no as aggregatesScene,
  Ve as apiImplNodeId,
  Fe as apiOpOccurrenceId,
  ki as containerFit,
  qs as containerMinSize,
  Ks as contextMapScene,
  Ys as flowCoherence,
  ho as flowsScene,
  qt as normalizeViewLayout,
  Ji as processesScene,
  Gs as relationEdgeId,
  Li as resolveOverlaps
};
