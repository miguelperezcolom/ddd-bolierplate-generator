const ql = 34, Fl = 10;
function Ti(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], c = e[r], p = i.get(l.id), m = i.get(c.id), f = m.x - p.x, h = m.y - p.y, w = (l.w + c.w) / 2 + t - Math.abs(f), g = (l.h + c.h) / 2 + t - Math.abs(h);
        if (!(w <= 0 || g <= 0))
          if (o = !0, w < g) {
            const y = (f >= 0 ? 1 : -1) * w / 2;
            p.x -= y, m.x += y;
          } else {
            const y = (h >= 0 ? 1 : -1) * g / 2;
            p.y -= y, m.y += y;
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
function Ds(e, t = { w: 160, h: 90 }) {
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
function xi(e, t, i) {
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
function Rt(e) {
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
const Ls = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Us = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, zs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Qe = 168, Ze = 56;
function Fe(e, t) {
  return `apiimpl:${e}@${t}`;
}
function qe(e, t) {
  return `apiop:${e}@${t}`;
}
const ji = { compact: 0, coarse: 1, full: 2 };
function Xi(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: ji[e ? t : n] > ji[s] };
}
function On(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Fe(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Tn = 34, Rn = 14, qs = 14, Ie = 108, xe = 32, Dn = 12, Ln = 10, _t = 2, Fs = _t * Ie + (_t - 1) * Dn + 2 * Rn;
function Vs(e, t) {
  return `rel:${e}->${t}`;
}
function Hs(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function ut(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Bs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Un = {
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
}, _i = {
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
function bi(e) {
  const t = Math.max(1, Math.ceil(e / _t)), i = t * xe + (t - 1) * Ln;
  return { w: Fs, h: Tn + i + qs };
}
function Ft(e, t) {
  const i = e % _t, n = Math.floor(e / _t);
  return {
    x: -t.w / 2 + Rn + i * (Ie + Dn) + Ie / 2,
    y: -t.h / 2 + Tn + n * (xe + Ln) + xe / 2
  };
}
function Ws(e, t, i, n, s, o, a = !1) {
  const r = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...On(e, t.id),
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
    return [{ ...n, x: i.x, y: i.y, w: Qe, h: Ze }];
  if (a) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), p = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
      const f = c.get(m.apiId);
      return {
        id: Fe(m.apiId, m.moduleId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((h) => ({
          id: qe(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (p.length > 0) {
      const m = l.filter((f) => f.kind !== "api-impl");
      return zn(i, n, p, m, s, o);
    }
  }
  return gt(i, n, l, s, o);
}
function zn(e, t, i, n, s, o, a = /* @__PURE__ */ new Set()) {
  const r = o[t.id] ?? bi(i.length + n.length), l = i.map((h, w) => {
    const g = s[h.id] ?? Ft(w, r), y = a.has(h.id) ? [] : h.ops, v = o[h.id] ?? bi(y.length), E = y.map((R, _) => s[R.id] ?? Ft(_, v)), L = xi(
      { x: g.x, y: g.y },
      v,
      E.map((R) => ({ dx: R.x, dy: R.y, w: Ie, h: xe }))
    );
    return { a: h, off: g, ops: y, opOffs: E, fit: L };
  }), c = n.map(
    (h, w) => s[h.id] ?? Ft(i.length + w, r)
  ), p = Ti(
    [
      ...l.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, w) => ({
        id: h.id,
        x: c[w].x,
        y: c[w].y,
        w: Ie,
        h: xe
      }))
    ],
    24
  );
  for (const h of l) {
    const w = p.get(h.a.id);
    w && (h.off = { x: h.off.x + (w.x - h.fit.x), y: h.off.y + (w.y - h.fit.y) }, h.fit = { ...h.fit, x: w.x, y: w.y });
  }
  n.forEach((h, w) => {
    const g = p.get(h.id);
    g && (c[w] = { x: g.x, y: g.y });
  });
  const m = xi(e, r, [
    ...l.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...c.map((h) => ({ dx: h.x, dy: h.y, w: Ie, h: xe }))
  ]), f = [
    { ...t, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const h of l)
    f.push({
      id: h.a.id,
      label: h.a.name,
      kind: h.a.kind,
      symbol: "interface",
      fill: h.a.fill,
      stroke: h.a.stroke,
      badge: h.a.badge,
      container: !0,
      collapsible: h.a.ops.length > 0 || a.has(h.a.id),
      collapsed: a.has(h.a.id),
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
        w: Ie,
        h: xe,
        tooltip: `${_i[h.a.opKind]}: ${w.name}`
      });
    });
  return n.forEach((h, w) => {
    const g = Un[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + c[w].x,
      y: e.y + c[w].y,
      w: Ie,
      h: xe,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${_i[h.kind]} ${h.name}`
    });
  }), f;
}
function gt(e, t, i, n, s) {
  const o = s[t.id] ?? bi(i.length), a = i.map((m, f) => n[m.id] ?? Ft(f, o)), r = Ti(
    i.map((m, f) => ({ id: m.id, x: a[f].x, y: a[f].y, w: Ie, h: xe })),
    10
  );
  i.forEach((m, f) => {
    const h = r.get(m.id);
    h && (a[f] = { x: h.x, y: h.y });
  });
  const l = xi(
    e,
    o,
    a.map((m) => ({ dx: m.x, dy: m.y, w: Ie, h: xe }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, p = i.map((m, f) => {
    const h = a[f], w = m.policy ? Bs : Un[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: Ie,
      h: xe,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : _i[m.kind]} ${m.name}`
    };
  });
  return [c, ...p];
}
function Gs(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, a = i !== "contexts", r = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), p = new Set(c.map((d) => d.id)), m = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), f = new Set(m.map((d) => d.id)), h = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !p.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !f.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], w = h.flatMap((d, C) => {
    const q = t[d.ref.id] ?? ut(C, h.length);
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
        w: Qe,
        h: Ze
      }];
    }
    if (d.proxy) {
      const Y = d.ref, ee = {
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
        const Ae = (e.apis ?? []).find((Xe) => Xe.id === Y.targetApiId), Ce = (Ae == null ? void 0 : Ae.operations) ?? [];
        if (Ce.length > 0)
          return gt(
            q,
            ee,
            Ce.map((Xe) => ({
              id: qe(Xe.id, Y.id),
              name: Xe.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ee, x: q.x, y: q.y, w: Qe, h: Ze }];
    }
    if (d.api) {
      const Y = d.ref, ee = {
        id: Y.id,
        label: Y.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Y.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (s.has(Y.id) ? !a : a) && Y.operations.length > 0 ? gt(
        q,
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
        x: q.x,
        y: q.y,
        w: Qe,
        h: Ze
      }];
    }
    if (d.external) {
      const Y = d.ref, ee = {
        id: Y.id,
        label: Y.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Y.name} (sistema externo)`
      }, Ae = c.filter((te) => te.publishedByExternalSystemId === Y.id), Ce = m.filter((te) => te.publishedByExternalSystemId === Y.id), Xe = Ce.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), ri = [
        ...(Y.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(Y.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(Y.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], di = Ae.length > 0 || Ce.length > 0, li = di || ri.length > 0, { form: Ot, collapsed: ci } = Xi(
        s.has(Y.id),
        a ? "full" : di ? "coarse" : "compact",
        ri.length > 0 || r && di
      ), Gi = [
        ...Xe,
        ...Ot === "full" ? ri : []
      ], ui = r && Ot === "full" ? Ce.filter((te) => {
        const lt = te.targetApiId ? (e.apis ?? []).find((de) => de.id === te.targetApiId) : void 0;
        return ((lt == null ? void 0 : lt.operations) ?? []).length > 0;
      }) : [];
      if (r && Ot === "full" && (Ae.length > 0 || ui.length > 0)) {
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
            ops: (de.operations ?? []).map((ct) => ({ id: ct.id, name: ct.name }))
          })),
          ...ui.map((de) => {
            const ct = (e.apis ?? []).find((Tt) => Tt.id === de.targetApiId);
            return {
              id: de.id,
              name: de.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${de.name} — proxy/cache de ${ct.name}`,
              opKind: "api-op-occurrence",
              ops: (ct.operations ?? []).map((Tt) => ({
                id: qe(Tt.id, de.id),
                name: Tt.name
              }))
            };
          })
        ], lt = new Set(ui.map((de) => de.id));
        return zn(
          q,
          { ...ee, collapsible: !0, collapsed: ci },
          te,
          Gi.filter((de) => !lt.has(de.id)),
          t,
          n,
          o
        );
      }
      const Yi = Ot === "compact" ? [] : [
        ...Ae.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Gi
      ];
      return Yi.length > 0 ? gt(
        q,
        { ...ee, collapsible: li, collapsed: ci },
        Yi,
        t,
        n
      ) : [{
        ...ee,
        collapsible: li,
        collapsed: li && ci,
        x: q.x,
        y: q.y,
        w: Qe,
        h: Ze
      }];
    }
    const G = d.ref, Q = G.subdomainType ?? "GENERIC", se = {
      id: G.id,
      label: G.name,
      kind: "module",
      symbol: "component",
      fill: Ls[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${G.name} — subdominio ${Q}`
    }, ye = On(e, G.id), rt = (e.aggregates ?? []).some((Y) => Y.moduleId === G.id) || (G.useCases ?? []).length > 0 || (G.domainEvents ?? []).length > 0 || (G.applicationEvents ?? []).length > 0 || (G.readModels ?? []).length > 0 || (G.domainServices ?? []).length > 0 || (G.queryServices ?? []).length > 0, Le = rt || ye.length > 0, { form: dt, collapsed: je } = Xi(
      s.has(G.id),
      a ? "full" : ye.length > 0 ? "coarse" : "compact",
      rt
    );
    return dt === "full" && Le ? Ws(
      e,
      G,
      q,
      { ...se, collapsible: !0, collapsed: je },
      t,
      n,
      r
    ) : dt === "coarse" && ye.length > 0 ? gt(
      q,
      { ...se, collapsible: Le, collapsed: je },
      ye,
      t,
      n
    ) : [{
      ...se,
      collapsible: Le,
      collapsed: Le && je,
      x: q.x,
      y: q.y,
      w: Qe,
      h: Ze
    }];
  }), g = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, C) => {
    const q = t[d.id] ?? ut(h.length + C, g);
    w.push({
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
  }), (e.aiAgents ?? []).forEach((d, C) => {
    const q = t[d.id] ?? ut(h.length + (e.actors ?? []).length + C, g);
    w.push({
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
  }), (e.mcpGateways ?? []).forEach((d, C) => {
    const q = t[d.id] ?? ut(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + C,
      g
    );
    w.push({
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
  const y = [];
  (e.rags ?? []).forEach((d, C) => {
    const q = t[d.id] ?? ut(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + C,
      g
    );
    w.push({
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
    }), (d.contentSources ?? []).forEach((G, Q) => {
      const se = `ragcs:${d.id}:${G.uri}`, ye = t[se] ?? { x: q.x + 170, y: q.y - 30 + Q * 44 };
      w.push({
        id: se,
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
      }), y.push({
        id: `ragcse:${d.id}:${G.uri}`,
        sourceId: se,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), w.sort((d, C) => (d.parentId ? 1 : 0) - (C.parentId ? 1 : 0));
  const v = e.relations.map((d) => ({
    id: Vs(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Us[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), E = e.flows.map((d) => {
    var ye, rt, Le, dt, je, Y;
    const C = Hs(e, d), q = a ? e.modules.find((ee) => ee.id === d.sourceId) : void 0, G = ((ye = q == null ? void 0 : q.domainEvents) == null ? void 0 : ye.find((ee) => ee.name === d.triggerEvent)) ?? ((rt = q == null ? void 0 : q.applicationEvents) == null ? void 0 : rt.find((ee) => ee.name === d.triggerEvent)), Q = a && d.readModelName ? (dt = (Le = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Le.readModels) == null ? void 0 : dt.find((ee) => ee.name === d.readModelName) : void 0, se = a && d.targetUseCaseId ? (Y = (je = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : je.useCases) == null ? void 0 : Y.find((ee) => ee.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (G == null ? void 0 : G.id) ?? d.sourceId,
      targetId: (se == null ? void 0 : se.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: zs[C],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${C}`
    };
  }), L = new Map((e.apis ?? []).map((d) => [d.id, d])), R = new Set(e.modules.map((d) => d.id)), _ = (e.apiImplementations ?? []).filter(
    (d) => L.has(d.apiId) && R.has(d.moduleId)
  ), I = new Set(w.map((d) => d.id)), k = a ? (e.emissions ?? []).filter((d) => I.has(d.sourceId) && I.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], $ = a ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: C }) => C && d.readModelId).filter(({ p: d, source: C }) => I.has(C) && I.has(d.readModelId)).map(({ p: d, source: C }) => ({
    id: `proj:${d.id}`,
    sourceId: C,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], O = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((C) => {
      const q = a && C.targetUseCaseId && I.has(C.targetUseCaseId) ? C.targetUseCaseId : C.targetModuleId && I.has(C.targetModuleId) ? C.targetModuleId : (C.targetUseCaseId && !a, null);
      if (!q) return [];
      const G = a && I.has(C.id) ? C.id : d.id;
      return I.has(G) ? [
        {
          id: `apiwire:${C.id}`,
          sourceId: G,
          targetId: q,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${C.name} la implementa ${q}`
        }
      ] : [];
    })
  ), A = a ? (e.useCaseCalls ?? []).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], P = a ? (e.aggregateCalls ?? []).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], H = a ? (e.queryCalls ?? []).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], X = a ? (e.actorUses ?? []).filter((d) => I.has(d.actorId) && I.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], u = (e.actorExternalDependencies ?? []).filter((d) => I.has(d.actorId) && I.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), b = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), x = (d) => I.has(d) ? d : b.get(d) ?? d, S = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: x(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => I.has(d.sourceId) && I.has(d.targetId) && d.sourceId !== d.targetId
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
  ], D = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.useCases ?? []) D.set(C.id, d.id);
    for (const C of d.domainEvents ?? []) D.set(C.id, d.id);
    for (const C of d.applicationEvents ?? []) D.set(C.id, d.id);
  }
  const z = (d) => I.has(d) ? d : D.get(d) ?? d, M = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const C of d.domainEvents ?? []) M.set(C.name, C.id);
    for (const C of d.applicationEvents ?? []) M.set(C.name, C.id);
  }
  const U = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((C) => C.targetUseCaseId).map((C) => ({ sourceId: d.id, targetId: z(C.targetUseCaseId) }))
      ).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], K = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && M.has(d.triggerEvent)).map((d) => ({
        sourceId: z(M.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], Z = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const C of d.tables ?? []) Z.set(C.id, d.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((C) => ({
          sourceId: I.has(C) ? C : Z.get(C) ?? C,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], ue = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((C) => ({
          sourceId: x(C),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], we = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((C) => ({ sourceId: C, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((C) => ({ sourceId: C, targetId: d.id, name: d.name }))
      ]).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], pe = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: x(d.apiId) })).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => [
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
  ], ve = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, at = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((C) => C.id !== d.id && ve(C) === d.triggerEvent).filter((C) => I.has(C.id) && I.has(d.id)).map((C) => ({
      id: `wfchain:${C.id}->${d.id}`,
      sourceId: C.id,
      targetId: d.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: d.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), ys = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: x(d.id), targetId: x(d.targetApiId) })).filter(
        (d) => I.has(d.sourceId) && I.has(d.targetId) && d.sourceId !== d.targetId
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
  ], ws = _.flatMap((d) => {
    const C = Fe(d.apiId, d.moduleId);
    if (!I.has(C)) return [];
    const q = [];
    for (const G of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = x(G.id);
      I.has(Q) && Q !== C && q.push({
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
    return q;
  }), vs = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const C = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(C != null && C.targetApiId)) return [];
    const q = qe(d.operationId, d.proxyId), G = d.targetSiteId === C.targetApiId ? C.targetApiId : Fe(C.targetApiId, d.targetSiteId);
    return !I.has(q) || !I.has(G) ? [] : [{
      id: `oproute:${q}->${G}`,
      sourceId: q,
      targetId: G,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Is = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!I.has(d.externalSystemId)) return null;
        const C = (e.apis ?? []).find(
          (se) => se.operations.some((ye) => ye.id === d.operationId)
        );
        if (!C) return null;
        const q = d.siteId === C.id, G = q ? d.operationId : qe(d.operationId, d.siteId);
        let Q = I.has(G) ? G : null;
        if (!Q)
          if (q || (e.proxyApis ?? []).some((se) => se.id === d.siteId))
            Q = x(d.siteId);
          else {
            const se = Fe(C.id, d.siteId);
            Q = I.has(se) ? se : d.siteId;
          }
        return !Q || !I.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
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
  ], xs = a ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!I.has(d.useCaseId)) return [];
    const C = I.has(qe(d.operationId, d.moduleId)) ? qe(d.operationId, d.moduleId) : I.has(Fe(d.apiId, d.moduleId)) ? Fe(d.apiId, d.moduleId) : I.has(x(d.moduleId)) ? x(d.moduleId) : null;
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
  }) : [], _s = a ? (e.agentUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], bs = (e.agentRags ?? []).filter((d) => I.has(d.agentId) && I.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), ks = a ? (e.rags ?? []).filter((d) => I.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((C) => I.has(C)).map((C) => ({
      id: `ragsrc:${d.id}->${C}`,
      sourceId: d.id,
      targetId: C,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], $s = a ? (e.agentExternalUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Es = a ? (e.agentMcpUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ss = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((C) => I.has(d.id) && I.has(C)).map((C) => ({
      id: `gwx:${d.id}->${C}`,
      sourceId: d.id,
      targetId: C,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), As = (e.agentGatewayUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Cs = a ? (e.agentApiOpUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ms = a ? (e.agentQueryUses ?? []).filter((d) => I.has(d.agentId) && I.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ps = (e.agentDelegations ?? []).filter((d) => I.has(d.agentId) && I.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ns = (e.actorAgentUses ?? []).filter((d) => I.has(d.actorId) && I.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Os = a ? (e.agentTriggers ?? []).filter((d) => I.has(d.eventId) && I.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ts = a ? (e.externalCalls ?? []).filter((d) => I.has(d.externalSystemId) && I.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Rs = a ? (e.externalUseCaseCalls ?? []).filter((d) => I.has(d.sourceId) && I.has(d.targetId)).map((d) => ({
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
    nodes: w,
    edges: [
      ...v,
      ...E,
      ...k,
      ...$,
      ...O,
      ...A,
      ...P,
      ...H,
      ...X,
      ...u,
      ...S,
      ...ys,
      ...ws,
      ...vs,
      ...Is,
      ...xs,
      ...U,
      ...K,
      ...at,
      ...pe,
      ...J,
      ...ue,
      ...we,
      ..._s,
      ...$s,
      ...Es,
      ...Ss,
      ...As,
      ...Cs,
      ...Ms,
      ...Ps,
      ...Ns,
      ...Os,
      ...bs,
      ...ks,
      ...y,
      ...Ts,
      ...Rs
    ]
  };
}
const Ys = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, js = 176, Xs = 60, Ks = 140, Qs = 40;
function Zs(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const a = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const p = n.filter((f) => f.aggregateId === l.id).length, m = 140 + c * (170 + p * 60);
      t[l.id] = { x: a, y: m }, n.filter((f) => f.aggregateId === l.id).forEach((f, h) => {
        t[f.id] = { x: a + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Js(e, t) {
  const i = Zs(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const p = s.get(c.moduleId), m = (p == null ? void 0 : p.subdomainType) ?? "GENERIC", f = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: js,
      h: Xs,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ys[m],
      stroke: "#64748b",
      badge: p ? `${p.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${p ? ` — módulo ${p.name} (${m})` : ""}`
    };
  }), a = (e.entities ?? []).map((c) => {
    const p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: Ks,
      h: Qs,
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
  })), l = (e.aggregateReferences ?? []).map((c, p) => ({
    id: `aggref:${p}:${c.sourceAggregateId}->${c.targetAggregateId}`,
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
const eo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, to = 150, io = 44, no = 190, so = 56, oo = 160, ao = 48;
function ro(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function lo(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((p) => p.id === r)) == null ? void 0 : c.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const c = 120 + l * 130, p = eo[r.archetype] ?? "#475569", m = r.triggerAggregateId ?? r.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const y = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : m,
        x: y.x,
        y: y.y,
        w: to,
        h: io,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${r.id}`, h = t[f] ?? { x: 470, y: c };
    n.push({
      id: f,
      label: r.name,
      x: h.x,
      y: h.y,
      w: no,
      h: so,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: p,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const w = ro(e, r), g = `tgt:${w.id}`;
    if (!o.has(g)) {
      o.add(g);
      const y = t[g] ?? { x: 790, y: c };
      n.push({
        id: g,
        label: w.label,
        x: y.x,
        y: y.y,
        w: oo,
        h: ao,
        kind: w.external ? "external-system" : "module",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${r.id}:in`,
      sourceId: m,
      targetId: f,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${r.id}:out`,
      sourceId: f,
      targetId: g,
      kind: "flow-delivery",
      color: p,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const co = 190, uo = 56, pi = 170, po = 52;
function Ki(e, t) {
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
      w: co,
      h: uo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((p, m) => {
      const f = p.type === "HUMAN", h = t[p.id] ?? { x: 150 + (m + 1) * 240, y: r };
      if (i.push({
        id: p.id,
        label: p.name,
        x: h.x,
        y: h.y,
        w: pi,
        h: po,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${p.roleId ? ` · ${p.roleId}` : ""}${p.deadline ? ` · ⏱ ${p.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${p.name}${p.useCaseId ? ` — use case ${p.useCaseId}` : ""}${p.deadline ? ` · deadline ${p.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: p.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), p.compensationUseCaseId) {
        const w = `comp:${p.id}`, g = t[w] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: w,
          label: p.compensationUseCaseId,
          x: g.x,
          y: g.y,
          w: pi,
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
          targetId: w,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = p.id;
    }), o.onCompletionEventName) {
      const p = `done:${o.id}`, m = t[p] ?? { x: 150 + (o.steps.length + 1) * 240, y: r };
      i.push({
        id: p,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: pi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
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
const Vt = globalThis, Ri = Vt.ShadowRoot && (Vt.ShadyCSS === void 0 || Vt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Di = Symbol(), Qi = /* @__PURE__ */ new WeakMap();
let qn = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Di) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ri && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Qi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Qi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ho = (e) => new qn(typeof e == "string" ? e : e + "", void 0, Di), ti = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new qn(i, e, Di);
}, mo = (e, t) => {
  if (Ri) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = Vt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Zi = Ri ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ho(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fo, defineProperty: go, getOwnPropertyDescriptor: yo, getOwnPropertyNames: wo, getOwnPropertySymbols: vo, getPrototypeOf: Io } = Object, Re = globalThis, Ji = Re.trustedTypes, xo = Ji ? Ji.emptyScript : "", hi = Re.reactiveElementPolyfillSupport, vt = (e, t) => e, Yt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? xo : null;
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
} }, Li = (e, t) => !fo(e, t), en = { attribute: !0, type: String, converter: Yt, reflect: !1, useDefault: !1, hasChanged: Li };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Re.litPropertyMetadata ?? (Re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Je = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = en) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && go(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = yo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? en;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = Io(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const i = this.properties, n = [...wo(i), ...vo(i)];
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
      for (const s of n) i.unshift(Zi(s));
    } else t !== void 0 && i.push(Zi(t));
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
    return mo(t, this.constructor.elementStyles), t;
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
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Yt).toAttribute(i, n.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : Yt;
      this._$Em = s;
      const c = l.fromAttribute(i, r.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? Li)(o, i) || n.useDefault && n.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
Je.elementStyles = [], Je.shadowRootOptions = { mode: "open" }, Je[vt("elementProperties")] = /* @__PURE__ */ new Map(), Je[vt("finalized")] = /* @__PURE__ */ new Map(), hi == null || hi({ ReactiveElement: Je }), (Re.reactiveElementVersions ?? (Re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = globalThis, tn = (e) => e, jt = It.trustedTypes, nn = jt ? jt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Fn = "$lit$", Te = `lit$${Math.random().toFixed(9).slice(2)}$`, Vn = "?" + Te, _o = `<${Vn}>`, Ge = document, bt = () => Ge.createComment(""), kt = (e) => e === null || typeof e != "object" && typeof e != "function", Ui = Array.isArray, bo = (e) => Ui(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", mi = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, sn = /-->/g, on = />/g, Ue = RegExp(`>|${mi}(?:([^\\s"'>=/]+)(${mi}*=${mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), an = /'/g, rn = /"/g, Hn = /^(?:script|style|textarea|title)$/i, Bn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), N = Bn(1), W = Bn(2), it = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), dn = /* @__PURE__ */ new WeakMap(), Ve = Ge.createTreeWalker(Ge, 129);
function Wn(e, t) {
  if (!Ui(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nn !== void 0 ? nn.createHTML(t) : t;
}
const ko = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = pt;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let c, p, m = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === pt ? p[1] === "!--" ? a = sn : p[1] !== void 0 ? a = on : p[2] !== void 0 ? (Hn.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = Ue) : p[3] !== void 0 && (a = Ue) : a === Ue ? p[0] === ">" ? (a = s ?? pt, m = -1) : p[1] === void 0 ? m = -2 : (m = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? Ue : p[3] === '"' ? rn : an) : a === rn || a === an ? a = Ue : a === sn || a === on ? a = pt : (a = Ue, s = void 0);
    const h = a === Ue && e[r + 1].startsWith("/>") ? " " : "";
    o += a === pt ? l + _o : m >= 0 ? (n.push(c), l.slice(0, m) + Fn + l.slice(m) + Te + h) : l + Te + (m === -2 ? r : h);
  }
  return [Wn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class $t {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [c, p] = ko(t, i);
    if (this.el = $t.createElement(c, n), Ve.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Ve.nextNode()) !== null && l.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Fn)) {
          const f = p[a++], h = s.getAttribute(m).split(Te), w = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: w[2], strings: h, ctor: w[1] === "." ? Eo : w[1] === "?" ? So : w[1] === "@" ? Ao : ii }), s.removeAttribute(m);
        } else m.startsWith(Te) && (l.push({ type: 6, index: o }), s.removeAttribute(m));
        if (Hn.test(s.tagName)) {
          const m = s.textContent.split(Te), f = m.length - 1;
          if (f > 0) {
            s.textContent = jt ? jt.emptyScript : "";
            for (let h = 0; h < f; h++) s.append(m[h], bt()), Ve.nextNode(), l.push({ type: 2, index: ++o });
            s.append(m[f], bt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Vn) l.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Te, m + 1)) !== -1; ) l.push({ type: 7, index: o }), m += Te.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Ge.createElement("template");
    return n.innerHTML = t, n;
  }
}
function nt(e, t, i = e, n) {
  var a, r;
  if (t === it) return t;
  let s = n !== void 0 ? (a = i._$Co) == null ? void 0 : a[n] : i._$Cl;
  const o = kt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((r = s == null ? void 0 : s._$AO) == null || r.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = nt(e, s._$AS(e, t.values), s, n)), t;
}
class $o {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Ge).importNode(i, !0);
    Ve.currentNode = s;
    let o = Ve.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Mt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Co(o, this, t)), this._$AV.push(c), l = n[++r];
      }
      a !== (l == null ? void 0 : l.index) && (o = Ve.nextNode(), a++);
    }
    return Ve.currentNode = Ge, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Mt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = oe, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = nt(this, t, i), kt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ge.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = $t.createElement(Wn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const a = new $o(s, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = dn.get(t.strings);
    return i === void 0 && dn.set(t.strings, i = new $t(t)), i;
  }
  k(t) {
    Ui(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new Mt(this.O(bt()), this.O(bt()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = tn(t).nextSibling;
      tn(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class ii {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = oe, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = oe;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = nt(this, t, i, 0), a = !kt(t) || t !== this._$AH && t !== it, a && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = nt(this, r[n + l], i, l), c === it && (c = this._$AH[l]), a || (a = !kt(c) || c !== this._$AH[l]), c === oe ? t = oe : t !== oe && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === oe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Eo extends ii {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === oe ? void 0 : t;
  }
}
class So extends ii {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== oe);
  }
}
class Ao extends ii {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = nt(this, t, i, 0) ?? oe) === it) return;
    const n = this._$AH, s = t === oe && n !== oe || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== oe && (n === oe || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Co {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    nt(this, t);
  }
}
const fi = It.litHtmlPolyfillSupport;
fi == null || fi($t, Mt), (It.litHtmlVersions ?? (It.litHtmlVersions = [])).push("3.3.3");
const Mo = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Mt(t.insertBefore(bt(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = globalThis;
class De extends Je {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mo(i, this.renderRoot, this.renderOptions);
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
    return it;
  }
}
var Nn;
De._$litElement$ = !0, De.finalized = !0, (Nn = Be.litElementHydrateSupport) == null || Nn.call(Be, { LitElement: De });
const gi = Be.litElementPolyfillSupport;
gi == null || gi({ LitElement: De });
(Be.litElementVersions ?? (Be.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Po = { attribute: !0, type: String, converter: Yt, reflect: !1, hasChanged: Li }, No = (e = Po, t, i) => {
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
function ce(e) {
  return (t, i) => typeof i == "object" ? No(e, t, i) : ((n, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(e) {
  return ce({ ...e, state: !0, attribute: !1 });
}
var ki = "http://www.w3.org/1999/xhtml";
const ln = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function si(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), ln.hasOwnProperty(t) ? { space: ln[t], local: e } : e;
}
function Oo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === ki && t.documentElement.namespaceURI === ki ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function To(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Gn(e) {
  var t = si(e);
  return (t.local ? To : Oo)(t);
}
function Ro() {
}
function zi(e) {
  return e == null ? Ro : function() {
    return this.querySelector(e);
  };
}
function Do(e) {
  typeof e != "function" && (e = zi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = new Array(a), l, c, p = 0; p < a; ++p)
      (l = o[p]) && (c = e.call(l, l.__data__, p, o)) && ("__data__" in l && (c.__data__ = l.__data__), r[p] = c);
  return new me(n, this._parents);
}
function Lo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Uo() {
  return [];
}
function Yn(e) {
  return e == null ? Uo : function() {
    return this.querySelectorAll(e);
  };
}
function zo(e) {
  return function() {
    return Lo(e.apply(this, arguments));
  };
}
function qo(e) {
  typeof e == "function" ? e = zo(e) : e = Yn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && (n.push(e.call(l, l.__data__, c, a)), s.push(l));
  return new me(n, s);
}
function jn(e) {
  return function() {
    return this.matches(e);
  };
}
function Xn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Fo = Array.prototype.find;
function Vo(e) {
  return function() {
    return Fo.call(this.children, e);
  };
}
function Ho() {
  return this.firstElementChild;
}
function Bo(e) {
  return this.select(e == null ? Ho : Vo(typeof e == "function" ? e : Xn(e)));
}
var Wo = Array.prototype.filter;
function Go() {
  return Array.from(this.children);
}
function Yo(e) {
  return function() {
    return Wo.call(this.children, e);
  };
}
function jo(e) {
  return this.selectAll(e == null ? Go : Yo(typeof e == "function" ? e : Xn(e)));
}
function Xo(e) {
  typeof e != "function" && (e = jn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new me(n, this._parents);
}
function Kn(e) {
  return new Array(e.length);
}
function Ko() {
  return new me(this._enter || this._groups.map(Kn), this._parents);
}
function Xt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Xt.prototype = {
  constructor: Xt,
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
function Qo(e) {
  return function() {
    return e;
  };
}
function Zo(e, t, i, n, s, o) {
  for (var a = 0, r, l = t.length, c = o.length; a < c; ++a)
    (r = t[a]) ? (r.__data__ = o[a], n[a] = r) : i[a] = new Xt(e, o[a]);
  for (; a < l; ++a)
    (r = t[a]) && (s[a] = r);
}
function Jo(e, t, i, n, s, o, a) {
  var r, l, c = /* @__PURE__ */ new Map(), p = t.length, m = o.length, f = new Array(p), h;
  for (r = 0; r < p; ++r)
    (l = t[r]) && (f[r] = h = a.call(l, l.__data__, r, t) + "", c.has(h) ? s[r] = l : c.set(h, l));
  for (r = 0; r < m; ++r)
    h = a.call(e, o[r], r, o) + "", (l = c.get(h)) ? (n[r] = l, l.__data__ = o[r], c.delete(h)) : i[r] = new Xt(e, o[r]);
  for (r = 0; r < p; ++r)
    (l = t[r]) && c.get(f[r]) === l && (s[r] = l);
}
function ea(e) {
  return e.__data__;
}
function ta(e, t) {
  if (!arguments.length) return Array.from(this, ea);
  var i = t ? Jo : Zo, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Qo(e));
  for (var o = s.length, a = new Array(o), r = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var p = n[c], m = s[c], f = m.length, h = ia(e.call(p, p && p.__data__, c, n)), w = h.length, g = r[c] = new Array(w), y = a[c] = new Array(w), v = l[c] = new Array(f);
    i(p, m, g, y, v, h, t);
    for (var E = 0, L = 0, R, _; E < w; ++E)
      if (R = g[E]) {
        for (E >= L && (L = E + 1); !(_ = y[L]) && ++L < w; ) ;
        R._next = _ || null;
      }
  }
  return a = new me(a, n), a._enter = r, a._exit = l, a;
}
function ia(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function na() {
  return new me(this._exit || this._groups.map(Kn), this._parents);
}
function sa(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function oa(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, a = Math.min(s, o), r = new Array(s), l = 0; l < a; ++l)
    for (var c = i[l], p = n[l], m = c.length, f = r[l] = new Array(m), h, w = 0; w < m; ++w)
      (h = c[w] || p[w]) && (f[w] = h);
  for (; l < s; ++l)
    r[l] = i[l];
  return new me(r, this._parents);
}
function aa() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], a; --s >= 0; )
      (a = n[s]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function ra(e) {
  e || (e = da);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var a = i[o], r = a.length, l = s[o] = new Array(r), c, p = 0; p < r; ++p)
      (c = a[p]) && (l[p] = c);
    l.sort(t);
  }
  return new me(s, this._parents).order();
}
function da(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function la() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function ca() {
  return Array.from(this);
}
function ua() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var a = n[s];
      if (a) return a;
    }
  return null;
}
function pa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ha() {
  return !this.node();
}
function ma(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, a = s.length, r; o < a; ++o)
      (r = s[o]) && e.call(r, r.__data__, o, s);
  return this;
}
function fa(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ga(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ya(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function wa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function va(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ia(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function xa(e, t) {
  var i = si(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ga : fa : typeof t == "function" ? i.local ? Ia : va : i.local ? wa : ya)(i, t));
}
function Qn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function _a(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ba(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function ka(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function $a(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? _a : typeof t == "function" ? ka : ba)(e, t, i ?? "")) : st(this.node(), e);
}
function st(e, t) {
  return e.style.getPropertyValue(t) || Qn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ea(e) {
  return function() {
    delete this[e];
  };
}
function Sa(e, t) {
  return function() {
    this[e] = t;
  };
}
function Aa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Ca(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ea : typeof t == "function" ? Aa : Sa)(e, t)) : this.node()[e];
}
function Zn(e) {
  return e.trim().split(/^|\s+/);
}
function qi(e) {
  return e.classList || new Jn(e);
}
function Jn(e) {
  this._node = e, this._names = Zn(e.getAttribute("class") || "");
}
Jn.prototype = {
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
function es(e, t) {
  for (var i = qi(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function ts(e, t) {
  for (var i = qi(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Ma(e) {
  return function() {
    es(this, e);
  };
}
function Pa(e) {
  return function() {
    ts(this, e);
  };
}
function Na(e, t) {
  return function() {
    (t.apply(this, arguments) ? es : ts)(this, e);
  };
}
function Oa(e, t) {
  var i = Zn(e + "");
  if (arguments.length < 2) {
    for (var n = qi(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Na : t ? Ma : Pa)(i, t));
}
function Ta() {
  this.textContent = "";
}
function Ra(e) {
  return function() {
    this.textContent = e;
  };
}
function Da(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function La(e) {
  return arguments.length ? this.each(e == null ? Ta : (typeof e == "function" ? Da : Ra)(e)) : this.node().textContent;
}
function Ua() {
  this.innerHTML = "";
}
function za(e) {
  return function() {
    this.innerHTML = e;
  };
}
function qa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Fa(e) {
  return arguments.length ? this.each(e == null ? Ua : (typeof e == "function" ? qa : za)(e)) : this.node().innerHTML;
}
function Va() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ha() {
  return this.each(Va);
}
function Ba() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wa() {
  return this.each(Ba);
}
function Ga(e) {
  var t = typeof e == "function" ? e : Gn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Ya() {
  return null;
}
function ja(e, t) {
  var i = typeof e == "function" ? e : Gn(e), n = t == null ? Ya : typeof t == "function" ? t : zi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Xa() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ka() {
  return this.each(Xa);
}
function Qa() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Za() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ja(e) {
  return this.select(e ? Za : Qa);
}
function er(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function tr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ir(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function nr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function sr(e, t, i) {
  return function() {
    var n = this.__on, s, o = tr(t);
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
function or(e, t, i) {
  var n = ir(e + ""), s, o = n.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, c = r.length, p; l < c; ++l)
        for (s = 0, p = r[l]; s < o; ++s)
          if ((a = n[s]).type === p.type && a.name === p.name)
            return p.value;
    }
    return;
  }
  for (r = t ? sr : nr, s = 0; s < o; ++s) this.each(r(n[s], t, i));
  return this;
}
function is(e, t, i) {
  var n = Qn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function ar(e, t) {
  return function() {
    return is(this, e, t);
  };
}
function rr(e, t) {
  return function() {
    return is(this, e, t.apply(this, arguments));
  };
}
function dr(e, t) {
  return this.each((typeof t == "function" ? rr : ar)(e, t));
}
function* lr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, a; s < o; ++s)
      (a = n[s]) && (yield a);
}
var ns = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function Pt() {
  return new me([[document.documentElement]], ns);
}
function cr() {
  return this;
}
me.prototype = Pt.prototype = {
  constructor: me,
  select: Do,
  selectAll: qo,
  selectChild: Bo,
  selectChildren: jo,
  filter: Xo,
  data: ta,
  enter: Ko,
  exit: na,
  join: sa,
  merge: oa,
  selection: cr,
  order: aa,
  sort: ra,
  call: la,
  nodes: ca,
  node: ua,
  size: pa,
  empty: ha,
  each: ma,
  attr: xa,
  style: $a,
  property: Ca,
  classed: Oa,
  text: La,
  html: Fa,
  raise: Ha,
  lower: Wa,
  append: Ga,
  insert: ja,
  remove: Ka,
  clone: Ja,
  datum: er,
  on: or,
  dispatch: dr,
  [Symbol.iterator]: lr
};
function _e(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], ns);
}
function ur(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ze(e, t) {
  if (e = ur(e), t === void 0 && (t = e.currentTarget), t) {
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
var pr = { value: () => {
} };
function Fi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Ht(i);
}
function Ht(e) {
  this._ = e;
}
function hr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Ht.prototype = Fi.prototype = {
  constructor: Ht,
  on: function(e, t) {
    var i = this._, n = hr(e + "", i), s, o = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((s = (e = n[o]).type) && (s = mr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (s = (e = n[o]).type) i[s] = cn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = cn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ht(e);
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
function mr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function cn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = pr, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const $i = { capture: !0, passive: !1 };
function Ei(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function fr(e) {
  var t = e.document.documentElement, i = _e(e).on("dragstart.drag", Ei, $i);
  "onselectstart" in t ? i.on("selectstart.drag", Ei, $i) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function gr(e, t) {
  var i = e.document.documentElement, n = _e(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Ei, $i), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Vi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ss(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Nt() {
}
var Et = 0.7, Kt = 1 / Et, tt = "\\s*([+-]?\\d+)\\s*", St = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", yr = /^#([0-9a-f]{3,8})$/, wr = new RegExp(`^rgb\\(${tt},${tt},${tt}\\)$`), vr = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), Ir = new RegExp(`^rgba\\(${tt},${tt},${tt},${St}\\)$`), xr = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${St}\\)$`), _r = new RegExp(`^hsl\\(${St},${Ee},${Ee}\\)$`), br = new RegExp(`^hsla\\(${St},${Ee},${Ee},${St}\\)$`), un = {
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
Vi(Nt, At, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: pn,
  // Deprecated! Use color.formatHex.
  formatHex: pn,
  formatHex8: kr,
  formatHsl: $r,
  formatRgb: hn,
  toString: hn
});
function pn() {
  return this.rgb().formatHex();
}
function kr() {
  return this.rgb().formatHex8();
}
function $r() {
  return os(this).formatHsl();
}
function hn() {
  return this.rgb().formatRgb();
}
function At(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = yr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? mn(t) : i === 3 ? new le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Dt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Dt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = wr.exec(e)) ? new le(t[1], t[2], t[3], 1) : (t = vr.exec(e)) ? new le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ir.exec(e)) ? Dt(t[1], t[2], t[3], t[4]) : (t = xr.exec(e)) ? Dt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = _r.exec(e)) ? yn(t[1], t[2] / 100, t[3] / 100, 1) : (t = br.exec(e)) ? yn(t[1], t[2] / 100, t[3] / 100, t[4]) : un.hasOwnProperty(e) ? mn(un[e]) : e === "transparent" ? new le(NaN, NaN, NaN, 0) : null;
}
function mn(e) {
  return new le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Dt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new le(e, t, i, n);
}
function Er(e) {
  return e instanceof Nt || (e = At(e)), e ? (e = e.rgb(), new le(e.r, e.g, e.b, e.opacity)) : new le();
}
function Si(e, t, i, n) {
  return arguments.length === 1 ? Er(e) : new le(e, t, i, n ?? 1);
}
function le(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Vi(le, Si, ss(Nt, {
  brighter(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Et : Math.pow(Et, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new le(We(this.r), We(this.g), We(this.b), Qt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: fn,
  // Deprecated! Use color.formatHex.
  formatHex: fn,
  formatHex8: Sr,
  formatRgb: gn,
  toString: gn
}));
function fn() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}`;
}
function Sr() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}${He((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gn() {
  const e = Qt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${We(this.r)}, ${We(this.g)}, ${We(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Qt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function We(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function He(e) {
  return e = We(e), (e < 16 ? "0" : "") + e.toString(16);
}
function yn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new be(e, t, i, n);
}
function os(e) {
  if (e instanceof be) return new be(e.h, e.s, e.l, e.opacity);
  if (e instanceof Nt || (e = At(e)), !e) return new be();
  if (e instanceof be) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), a = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? a = (i - n) / r + (i < n) * 6 : i === o ? a = (n - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new be(a, r, l, e.opacity);
}
function Ar(e, t, i, n) {
  return arguments.length === 1 ? os(e) : new be(e, t, i, n ?? 1);
}
function be(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Vi(be, Ar, ss(Nt, {
  brighter(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new be(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Et : Math.pow(Et, e), new be(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new le(
      yi(e >= 240 ? e - 240 : e + 120, s, n),
      yi(e, s, n),
      yi(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new be(wn(this.h), Lt(this.s), Lt(this.l), Qt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Qt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${wn(this.h)}, ${Lt(this.s) * 100}%, ${Lt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function wn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Lt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function yi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const as = (e) => () => e;
function Cr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Mr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Pr(e) {
  return (e = +e) == 1 ? rs : function(t, i) {
    return i - t ? Mr(t, i, e) : as(isNaN(t) ? i : t);
  };
}
function rs(e, t) {
  var i = t - e;
  return i ? Cr(e, i) : as(isNaN(e) ? t : e);
}
const vn = (function e(t) {
  var i = Pr(t);
  function n(s, o) {
    var a = i((s = Si(s)).r, (o = Si(o)).r), r = i(s.g, o.g), l = i(s.b, o.b), c = rs(s.opacity, o.opacity);
    return function(p) {
      return s.r = a(p), s.g = r(p), s.b = l(p), s.opacity = c(p), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Oe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ai = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, wi = new RegExp(Ai.source, "g");
function Nr(e) {
  return function() {
    return e;
  };
}
function Or(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Tr(e, t) {
  var i = Ai.lastIndex = wi.lastIndex = 0, n, s, o, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (n = Ai.exec(e)) && (s = wi.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), r[a] ? r[a] += o : r[++a] = o), (n = n[0]) === (s = s[0]) ? r[a] ? r[a] += s : r[++a] = s : (r[++a] = null, l.push({ i: a, x: Oe(n, s) })), i = wi.lastIndex;
  return i < t.length && (o = t.slice(i), r[a] ? r[a] += o : r[++a] = o), r.length < 2 ? l[0] ? Or(l[0].x) : Nr(t) : (t = l.length, function(c) {
    for (var p = 0, m; p < t; ++p) r[(m = l[p]).i] = m.x(c);
    return r.join("");
  });
}
var In = 180 / Math.PI, Ci = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ds(e, t, i, n, s, o) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * n) && (i -= e * l, n -= t * l), (r = Math.sqrt(i * i + n * n)) && (i /= r, n /= r, l /= r), e * n < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * In,
    skewX: Math.atan(l) * In,
    scaleX: a,
    scaleY: r
  };
}
var Ut;
function Rr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ci : ds(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Dr(e) {
  return e == null || (Ut || (Ut = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ut.setAttribute("transform", e), !(e = Ut.transform.baseVal.consolidate())) ? Ci : (e = e.matrix, ds(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ls(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, p, m, f, h, w) {
    if (c !== m || p !== f) {
      var g = h.push("translate(", null, t, null, i);
      w.push({ i: g - 4, x: Oe(c, m) }, { i: g - 2, x: Oe(p, f) });
    } else (m || f) && h.push("translate(" + m + t + f + i);
  }
  function a(c, p, m, f) {
    c !== p ? (c - p > 180 ? p += 360 : p - c > 180 && (c += 360), f.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Oe(c, p) })) : p && m.push(s(m) + "rotate(" + p + n);
  }
  function r(c, p, m, f) {
    c !== p ? f.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Oe(c, p) }) : p && m.push(s(m) + "skewX(" + p + n);
  }
  function l(c, p, m, f, h, w) {
    if (c !== m || p !== f) {
      var g = h.push(s(h) + "scale(", null, ",", null, ")");
      w.push({ i: g - 4, x: Oe(c, m) }, { i: g - 2, x: Oe(p, f) });
    } else (m !== 1 || f !== 1) && h.push(s(h) + "scale(" + m + "," + f + ")");
  }
  return function(c, p) {
    var m = [], f = [];
    return c = e(c), p = e(p), o(c.translateX, c.translateY, p.translateX, p.translateY, m, f), a(c.rotate, p.rotate, m, f), r(c.skewX, p.skewX, m, f), l(c.scaleX, c.scaleY, p.scaleX, p.scaleY, m, f), c = p = null, function(h) {
      for (var w = -1, g = f.length, y; ++w < g; ) m[(y = f[w]).i] = y.x(h);
      return m.join("");
    };
  };
}
var Lr = ls(Rr, "px, ", "px)", "deg)"), Ur = ls(Dr, ", ", ")", ")"), zr = 1e-12;
function xn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function qr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Fr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Vr = (function e(t, i, n) {
  function s(o, a) {
    var r = o[0], l = o[1], c = o[2], p = a[0], m = a[1], f = a[2], h = p - r, w = m - l, g = h * h + w * w, y, v;
    if (g < zr)
      v = Math.log(f / c) / t, y = function(k) {
        return [
          r + k * h,
          l + k * w,
          c * Math.exp(t * k * v)
        ];
      };
    else {
      var E = Math.sqrt(g), L = (f * f - c * c + n * g) / (2 * c * i * E), R = (f * f - c * c - n * g) / (2 * f * i * E), _ = Math.log(Math.sqrt(L * L + 1) - L), I = Math.log(Math.sqrt(R * R + 1) - R);
      v = (I - _) / t, y = function(k) {
        var $ = k * v, O = xn(_), A = c / (i * E) * (O * Fr(t * $ + _) - qr(_));
        return [
          r + A * h,
          l + A * w,
          c * O / xn(t * $ + _)
        ];
      };
    }
    return y.duration = v * 1e3 * t / Math.SQRT2, y;
  }
  return s.rho = function(o) {
    var a = Math.max(1e-3, +o), r = a * a, l = r * r;
    return e(a, r, l);
  }, s;
})(Math.SQRT2, 2, 4);
var ot = 0, yt = 0, ht = 0, cs = 1e3, Zt, wt, Jt = 0, Ye = 0, oi = 0, Ct = typeof performance == "object" && performance.now ? performance : Date, us = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Hi() {
  return Ye || (us(Hr), Ye = Ct.now() + oi);
}
function Hr() {
  Ye = 0;
}
function ei() {
  this._call = this._time = this._next = null;
}
ei.prototype = ps.prototype = {
  constructor: ei,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Hi() : +i) + (t == null ? 0 : +t), !this._next && wt !== this && (wt ? wt._next = this : Zt = this, wt = this), this._call = e, this._time = i, Mi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Mi());
  }
};
function ps(e, t, i) {
  var n = new ei();
  return n.restart(e, t, i), n;
}
function Br() {
  Hi(), ++ot;
  for (var e = Zt, t; e; )
    (t = Ye - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ot;
}
function _n() {
  Ye = (Jt = Ct.now()) + oi, ot = yt = 0;
  try {
    Br();
  } finally {
    ot = 0, Gr(), Ye = 0;
  }
}
function Wr() {
  var e = Ct.now(), t = e - Jt;
  t > cs && (oi -= t, Jt = e);
}
function Gr() {
  for (var e, t = Zt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Zt = i);
  wt = e, Mi(n);
}
function Mi(e) {
  if (!ot) {
    yt && (yt = clearTimeout(yt));
    var t = e - Ye;
    t > 24 ? (e < 1 / 0 && (yt = setTimeout(_n, e - Ct.now() - oi)), ht && (ht = clearInterval(ht))) : (ht || (Jt = Ct.now(), ht = setInterval(Wr, cs)), ot = 1, us(_n));
  }
}
function bn(e, t, i) {
  var n = new ei();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Yr = Fi("start", "end", "cancel", "interrupt"), jr = [], hs = 0, kn = 1, Pi = 2, Bt = 3, $n = 4, Ni = 5, Wt = 6;
function ai(e, t, i, n, s, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  Xr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Yr,
    tween: jr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: hs
  });
}
function Bi(e, t) {
  var i = ke(e, t);
  if (i.state > hs) throw new Error("too late; already scheduled");
  return i;
}
function Se(e, t) {
  var i = ke(e, t);
  if (i.state > Bt) throw new Error("too late; already running");
  return i;
}
function ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Xr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = ps(o, 0, i.time);
  function o(c) {
    i.state = kn, i.timer.restart(a, i.delay, i.time), i.delay <= c && a(c - i.delay);
  }
  function a(c) {
    var p, m, f, h;
    if (i.state !== kn) return l();
    for (p in n)
      if (h = n[p], h.name === i.name) {
        if (h.state === Bt) return bn(a);
        h.state === $n ? (h.state = Wt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[p]) : +p < t && (h.state = Wt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[p]);
      }
    if (bn(function() {
      i.state === Bt && (i.state = $n, i.timer.restart(r, i.delay, i.time), r(c));
    }), i.state = Pi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Pi) {
      for (i.state = Bt, s = new Array(f = i.tween.length), p = 0, m = -1; p < f; ++p)
        (h = i.tween[p].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = h);
      s.length = m + 1;
    }
  }
  function r(c) {
    for (var p = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Ni, 1), m = -1, f = s.length; ++m < f; )
      s[m].call(e, p);
    i.state === Ni && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Wt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Gt(e, t) {
  var i = e.__transition, n, s, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((n = i[a]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Pi && n.state < Ni, n.state = Wt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function Kr(e) {
  return this.each(function() {
    Gt(this, e);
  });
}
function Qr(e, t) {
  var i, n;
  return function() {
    var s = Se(this, e), o = s.tween;
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
function Zr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Se(this, e), a = o.tween;
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
function Jr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = ke(this.node(), i).tween, s = 0, o = n.length, a; s < o; ++s)
      if ((a = n[s]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Qr : Zr)(i, e, t));
}
function Wi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Se(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return ke(s, n).value[t];
  };
}
function ms(e, t) {
  var i;
  return (typeof t == "number" ? Oe : t instanceof At ? vn : (i = At(t)) ? (t = i, vn) : Tr)(e, t);
}
function ed(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function td(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function id(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function nd(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function sd(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function od(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function ad(e, t) {
  var i = si(e), n = i === "transform" ? Ur : ms;
  return this.attrTween(e, typeof t == "function" ? (i.local ? od : sd)(i, n, Wi(this, "attr." + e, t)) : t == null ? (i.local ? td : ed)(i) : (i.local ? nd : id)(i, n, t));
}
function rd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function dd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ld(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && dd(e, o)), i;
  }
  return s._value = t, s;
}
function cd(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && rd(e, o)), i;
  }
  return s._value = t, s;
}
function ud(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = si(e);
  return this.tween(i, (n.local ? ld : cd)(n, t));
}
function pd(e, t) {
  return function() {
    Bi(this, e).delay = +t.apply(this, arguments);
  };
}
function hd(e, t) {
  return t = +t, function() {
    Bi(this, e).delay = t;
  };
}
function md(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? pd : hd)(t, e)) : ke(this.node(), t).delay;
}
function fd(e, t) {
  return function() {
    Se(this, e).duration = +t.apply(this, arguments);
  };
}
function gd(e, t) {
  return t = +t, function() {
    Se(this, e).duration = t;
  };
}
function yd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? fd : gd)(t, e)) : ke(this.node(), t).duration;
}
function wd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Se(this, e).ease = t;
  };
}
function vd(e) {
  var t = this._id;
  return arguments.length ? this.each(wd(t, e)) : ke(this.node(), t).ease;
}
function Id(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Se(this, e).ease = i;
  };
}
function xd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Id(this._id, e));
}
function _d(e) {
  typeof e != "function" && (e = jn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new Ne(n, this._parents, this._name, this._id);
}
function bd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), a = new Array(n), r = 0; r < o; ++r)
    for (var l = t[r], c = i[r], p = l.length, m = a[r] = new Array(p), f, h = 0; h < p; ++h)
      (f = l[h] || c[h]) && (m[h] = f);
  for (; r < n; ++r)
    a[r] = t[r];
  return new Ne(a, this._parents, this._name, this._id);
}
function kd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function $d(e, t, i) {
  var n, s, o = kd(t) ? Bi : Se;
  return function() {
    var a = o(this, e), r = a.on;
    r !== n && (s = (n = r).copy()).on(t, i), a.on = s;
  };
}
function Ed(e, t) {
  var i = this._id;
  return arguments.length < 2 ? ke(this.node(), i).on.on(e) : this.each($d(i, e, t));
}
function Sd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ad() {
  return this.on("end.remove", Sd(this._id));
}
function Cd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = zi(e));
  for (var n = this._groups, s = n.length, o = new Array(s), a = 0; a < s; ++a)
    for (var r = n[a], l = r.length, c = o[a] = new Array(l), p, m, f = 0; f < l; ++f)
      (p = r[f]) && (m = e.call(p, p.__data__, f, r)) && ("__data__" in p && (m.__data__ = p.__data__), c[f] = m, ai(c[f], t, i, f, c, ke(p, i)));
  return new Ne(o, this._parents, t, i);
}
function Md(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Yn(e));
  for (var n = this._groups, s = n.length, o = [], a = [], r = 0; r < s; ++r)
    for (var l = n[r], c = l.length, p, m = 0; m < c; ++m)
      if (p = l[m]) {
        for (var f = e.call(p, p.__data__, m, l), h, w = ke(p, i), g = 0, y = f.length; g < y; ++g)
          (h = f[g]) && ai(h, t, i, g, f, w);
        o.push(f), a.push(p);
      }
  return new Ne(o, a, t, i);
}
var Pd = Pt.prototype.constructor;
function Nd() {
  return new Pd(this._groups, this._parents);
}
function Od(e, t) {
  var i, n, s;
  return function() {
    var o = st(this, e), a = (this.style.removeProperty(e), st(this, e));
    return o === a ? null : o === i && a === n ? s : s = t(i = o, n = a);
  };
}
function fs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Td(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = st(this, e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Rd(e, t, i) {
  var n, s, o;
  return function() {
    var a = st(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), st(this, e))), a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r));
  };
}
function Dd(e, t) {
  var i, n, s, o = "style." + t, a = "end." + o, r;
  return function() {
    var l = Se(this, e), c = l.on, p = l.value[o] == null ? r || (r = fs(t)) : void 0;
    (c !== i || s !== p) && (n = (i = c).copy()).on(a, s = p), l.on = n;
  };
}
function Ld(e, t, i) {
  var n = (e += "") == "transform" ? Lr : ms;
  return t == null ? this.styleTween(e, Od(e, n)).on("end.style." + e, fs(e)) : typeof t == "function" ? this.styleTween(e, Rd(e, n, Wi(this, "style." + e, t))).each(Dd(this._id, e)) : this.styleTween(e, Td(e, n, t), i).on("end.style." + e, null);
}
function Ud(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function zd(e, t, i) {
  var n, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (n = (s = a) && Ud(e, a, i)), n;
  }
  return o._value = t, o;
}
function qd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, zd(e, t, i ?? ""));
}
function Fd(e) {
  return function() {
    this.textContent = e;
  };
}
function Vd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Hd(e) {
  return this.tween("text", typeof e == "function" ? Vd(Wi(this, "text", e)) : Fd(e == null ? "" : e + ""));
}
function Bd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Wd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Bd(s)), t;
  }
  return n._value = e, n;
}
function Gd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Wd(e));
}
function Yd() {
  for (var e = this._name, t = this._id, i = gs(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      if (l = a[c]) {
        var p = ke(l, t);
        ai(l, e, i, c, a, {
          time: p.time + p.delay + p.duration,
          delay: 0,
          duration: p.duration,
          ease: p.ease
        });
      }
  return new Ne(n, this._parents, e, i);
}
function jd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, a) {
    var r = { value: a }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = Se(this, n), p = c.on;
      p !== e && (t = (e = p).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Xd = 0;
function Ne(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function gs() {
  return ++Xd;
}
var Me = Pt.prototype;
Ne.prototype = {
  constructor: Ne,
  select: Cd,
  selectAll: Md,
  selectChild: Me.selectChild,
  selectChildren: Me.selectChildren,
  filter: _d,
  merge: bd,
  selection: Nd,
  transition: Yd,
  call: Me.call,
  nodes: Me.nodes,
  node: Me.node,
  size: Me.size,
  empty: Me.empty,
  each: Me.each,
  on: Ed,
  attr: ad,
  attrTween: ud,
  style: Ld,
  styleTween: qd,
  text: Hd,
  textTween: Gd,
  remove: Ad,
  tween: Jr,
  delay: md,
  duration: yd,
  ease: vd,
  easeVarying: xd,
  end: jd,
  [Symbol.iterator]: Me[Symbol.iterator]
};
function Kd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Qd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Kd
};
function Zd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Jd(e) {
  var t, i;
  e instanceof Ne ? (t = e._id, e = e._name) : (t = gs(), (i = Qd).time = Hi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && ai(l, e, t, c, a, i || Zd(l, t));
  return new Ne(n, this._parents, e, t);
}
Pt.prototype.interrupt = Kr;
Pt.prototype.transition = Jd;
const zt = (e) => () => e;
function el(e, {
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
var xt = new Pe(1, 0, 0);
Pe.prototype;
function vi(e) {
  e.stopImmediatePropagation();
}
function mt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function tl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function il() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function En() {
  return this.__zoom || xt;
}
function nl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function sl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ol(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function al() {
  var e = tl, t = il, i = ol, n = nl, s = sl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Vr, c = Fi("start", "zoom", "end"), p, m, f, h = 500, w = 150, g = 0, y = 10;
  function v(u) {
    u.property("__zoom", En).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", A).filter(s).on("touchstart.zoom", P).on("touchmove.zoom", H).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(u, b, x, S) {
    var D = u.selection ? u.selection() : u;
    D.property("__zoom", En), u !== D ? _(u, b, x, S) : D.interrupt().each(function() {
      I(this, arguments).event(S).start().zoom(null, typeof b == "function" ? b.apply(this, arguments) : b).end();
    });
  }, v.scaleBy = function(u, b, x, S) {
    v.scaleTo(u, function() {
      var D = this.__zoom.k, z = typeof b == "function" ? b.apply(this, arguments) : b;
      return D * z;
    }, x, S);
  }, v.scaleTo = function(u, b, x, S) {
    v.transform(u, function() {
      var D = t.apply(this, arguments), z = this.__zoom, M = x == null ? R(D) : typeof x == "function" ? x.apply(this, arguments) : x, U = z.invert(M), K = typeof b == "function" ? b.apply(this, arguments) : b;
      return i(L(E(z, K), M, U), D, a);
    }, x, S);
  }, v.translateBy = function(u, b, x, S) {
    v.transform(u, function() {
      return i(this.__zoom.translate(
        typeof b == "function" ? b.apply(this, arguments) : b,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), t.apply(this, arguments), a);
    }, null, S);
  }, v.translateTo = function(u, b, x, S, D) {
    v.transform(u, function() {
      var z = t.apply(this, arguments), M = this.__zoom, U = S == null ? R(z) : typeof S == "function" ? S.apply(this, arguments) : S;
      return i(xt.translate(U[0], U[1]).scale(M.k).translate(
        typeof b == "function" ? -b.apply(this, arguments) : -b,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), z, a);
    }, S, D);
  };
  function E(u, b) {
    return b = Math.max(o[0], Math.min(o[1], b)), b === u.k ? u : new Pe(b, u.x, u.y);
  }
  function L(u, b, x) {
    var S = b[0] - x[0] * u.k, D = b[1] - x[1] * u.k;
    return S === u.x && D === u.y ? u : new Pe(u.k, S, D);
  }
  function R(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function _(u, b, x, S) {
    u.on("start.zoom", function() {
      I(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      I(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var D = this, z = arguments, M = I(D, z).event(S), U = t.apply(D, z), K = x == null ? R(U) : typeof x == "function" ? x.apply(D, z) : x, Z = Math.max(U[1][0] - U[0][0], U[1][1] - U[0][1]), J = D.__zoom, ue = typeof b == "function" ? b.apply(D, z) : b, we = l(J.invert(K).concat(Z / J.k), ue.invert(K).concat(Z / ue.k));
      return function(pe) {
        if (pe === 1) pe = ue;
        else {
          var ve = we(pe), at = Z / ve[2];
          pe = new Pe(at, K[0] - ve[0] * at, K[1] - ve[1] * at);
        }
        M.zoom(null, pe);
      };
    });
  }
  function I(u, b, x) {
    return !x && u.__zooming || new k(u, b);
  }
  function k(u, b) {
    this.that = u, this.args = b, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, b), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, b) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = b.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = b.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = b.invert(this.touch1[0])), this.that.__zoom = b, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var b = _e(this.that).datum();
      c.call(
        u,
        this.that,
        new el(u, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: c
        }),
        b
      );
    }
  };
  function $(u, ...b) {
    if (!e.apply(this, arguments)) return;
    var x = I(this, b).event(u), S = this.__zoom, D = Math.max(o[0], Math.min(o[1], S.k * Math.pow(2, n.apply(this, arguments)))), z = ze(u);
    if (x.wheel)
      (x.mouse[0][0] !== z[0] || x.mouse[0][1] !== z[1]) && (x.mouse[1] = S.invert(x.mouse[0] = z)), clearTimeout(x.wheel);
    else {
      if (S.k === D) return;
      x.mouse = [z, S.invert(z)], Gt(this), x.start();
    }
    mt(u), x.wheel = setTimeout(M, w), x.zoom("mouse", i(L(E(S, D), x.mouse[0], x.mouse[1]), x.extent, a));
    function M() {
      x.wheel = null, x.end();
    }
  }
  function O(u, ...b) {
    if (f || !e.apply(this, arguments)) return;
    var x = u.currentTarget, S = I(this, b, !0).event(u), D = _e(u.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", Z, !0), z = ze(u, x), M = u.clientX, U = u.clientY;
    fr(u.view), vi(u), S.mouse = [z, this.__zoom.invert(z)], Gt(this), S.start();
    function K(J) {
      if (mt(J), !S.moved) {
        var ue = J.clientX - M, we = J.clientY - U;
        S.moved = ue * ue + we * we > g;
      }
      S.event(J).zoom("mouse", i(L(S.that.__zoom, S.mouse[0] = ze(J, x), S.mouse[1]), S.extent, a));
    }
    function Z(J) {
      D.on("mousemove.zoom mouseup.zoom", null), gr(J.view, S.moved), mt(J), S.event(J).end();
    }
  }
  function A(u, ...b) {
    if (e.apply(this, arguments)) {
      var x = this.__zoom, S = ze(u.changedTouches ? u.changedTouches[0] : u, this), D = x.invert(S), z = x.k * (u.shiftKey ? 0.5 : 2), M = i(L(E(x, z), S, D), t.apply(this, b), a);
      mt(u), r > 0 ? _e(this).transition().duration(r).call(_, M, S, u) : _e(this).call(v.transform, M, S, u);
    }
  }
  function P(u, ...b) {
    if (e.apply(this, arguments)) {
      var x = u.touches, S = x.length, D = I(this, b, u.changedTouches.length === S).event(u), z, M, U, K;
      for (vi(u), M = 0; M < S; ++M)
        U = x[M], K = ze(U, this), K = [K, this.__zoom.invert(K), U.identifier], D.touch0 ? !D.touch1 && D.touch0[2] !== K[2] && (D.touch1 = K, D.taps = 0) : (D.touch0 = K, z = !0, D.taps = 1 + !!p);
      p && (p = clearTimeout(p)), z && (D.taps < 2 && (m = K[0], p = setTimeout(function() {
        p = null;
      }, h)), Gt(this), D.start());
    }
  }
  function H(u, ...b) {
    if (this.__zooming) {
      var x = I(this, b).event(u), S = u.changedTouches, D = S.length, z, M, U, K;
      for (mt(u), z = 0; z < D; ++z)
        M = S[z], U = ze(M, this), x.touch0 && x.touch0[2] === M.identifier ? x.touch0[0] = U : x.touch1 && x.touch1[2] === M.identifier && (x.touch1[0] = U);
      if (M = x.that.__zoom, x.touch1) {
        var Z = x.touch0[0], J = x.touch0[1], ue = x.touch1[0], we = x.touch1[1], pe = (pe = ue[0] - Z[0]) * pe + (pe = ue[1] - Z[1]) * pe, ve = (ve = we[0] - J[0]) * ve + (ve = we[1] - J[1]) * ve;
        M = E(M, Math.sqrt(pe / ve)), U = [(Z[0] + ue[0]) / 2, (Z[1] + ue[1]) / 2], K = [(J[0] + we[0]) / 2, (J[1] + we[1]) / 2];
      } else if (x.touch0) U = x.touch0[0], K = x.touch0[1];
      else return;
      x.zoom("touch", i(L(M, U, K), x.extent, a));
    }
  }
  function X(u, ...b) {
    if (this.__zooming) {
      var x = I(this, b).event(u), S = u.changedTouches, D = S.length, z, M;
      for (vi(u), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), z = 0; z < D; ++z)
        M = S[z], x.touch0 && x.touch0[2] === M.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === M.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0) x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (M = ze(M, this), Math.hypot(m[0] - M[0], m[1] - M[1]) < y)) {
        var U = _e(this).on("dblclick.zoom");
        U && U.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : zt(+u), v) : n;
  }, v.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : zt(!!u), v) : e;
  }, v.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : zt(!!u), v) : s;
  }, v.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : zt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), v) : t;
  }, v.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], v) : [o[0], o[1]];
  }, v.translateExtent = function(u) {
    return arguments.length ? (a[0][0] = +u[0][0], a[1][0] = +u[1][0], a[0][1] = +u[0][1], a[1][1] = +u[1][1], v) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, v.constrain = function(u) {
    return arguments.length ? (i = u, v) : i;
  }, v.duration = function(u) {
    return arguments.length ? (r = +u, v) : r;
  }, v.interpolate = function(u) {
    return arguments.length ? (l = u, v) : l;
  }, v.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? v : u;
  }, v.clickDistance = function(u) {
    return arguments.length ? (g = (u = +u) * u, v) : Math.sqrt(g);
  }, v.tapDistance = function(u) {
    return arguments.length ? (y = +u, v) : y;
  }, v;
}
var rl = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? dl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && rl(t, i, s), s;
};
function ll(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, a = n.x - i.x, r = n.y - i.y, l = s * r - o * a;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * r - (i.y - e.y) * a) / l, p = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || p <= 0.02 || p >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function cl(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), r = t.x + a * n, l = t.y + a * s;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function ul(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], a = e[s + 1], r = Math.hypot(a.x - o.x, a.y - o.y) || 1, l = (a.x - o.x) / r, c = (a.y - o.y) / r, p = t.map(([f, h]) => ll(o, a, f, h)).filter((f) => f !== null).filter((f) => f.t * r > i + 2 && (1 - f.t) * r > i + 2).sort((f, h) => f.t - h.t);
    let m = -1 / 0;
    for (const f of p)
      f.t * r - i <= m + 2 || (n += ` L ${f.x - l * i} ${f.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + l * i} ${f.y + c * i}`, m = f.t * r + i);
    n += ` L ${a.x} ${a.y}`;
  }
  return n;
}
const et = {
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
let ne = class extends De {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = xt, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = al().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), _e(e).call(this._zoomBehavior);
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
    const s = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, l = Math.max(80, n.width - s - o), c = Math.max(80, n.height - a - r), p = Math.min(...t.map((y) => y.x - y.w / 2)) - e, m = Math.max(...t.map((y) => y.x + y.w / 2)) + e, f = Math.min(...t.map((y) => y.y - y.h / 2)) - e, h = Math.max(...t.map((y) => y.y + y.h / 2)) + e, w = Math.max(0.15, Math.min(l / (m - p), c / (h - f), 1.25)), g = xt.translate(
      s + l / 2 - w * (p + m) / 2,
      a + c / 2 - w * (f + h) / 2
    ).scale(w);
    _e(i).call(this._zoomBehavior.transform, g);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(_e(t), e);
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
      (f) => o.has(f.id) && !(f.parentId && o.has(f.parentId))
    ) : null, r = a ? new Map(a.map((f) => [f.id, this.nodePos(f)])) : null, l = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, c = (f) => {
      const h = this.nodeIdAt(f), w = h && h !== t.id ? this.scene.nodes.find((g) => g.id === h) : void 0;
      return w ? w.kind === "external-system" ? w.id : w.parentId ?? null : null;
    }, p = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const h = this.toScene(f), w = h.x - i.x, g = h.y - i.y;
      if (!(!s && Math.hypot(w, g) < 3 / this._t.k))
        if (s = !0, a && r) {
          const y = /* @__PURE__ */ new Map();
          for (const v of a) {
            const E = r.get(v.id), L = this.clampToParent(v, E.x + w, E.y + g);
            y.set(v.id, { x: L.x, y: L.y });
          }
          this._dragGroup = y;
        } else l(f) ? (this._dragPos = { id: t.id, x: n.x + w, y: n.y + g }, this._hoverNodeId = c(f)) : (this._dragPos = this.clampToParent(t, n.x + w, n.y + g), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, w]) => ({ id: h, x: w.x, y: w.y }))
        });
      else if (s && this._dragPos) {
        if (l(f)) {
          const h = c(f);
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
    window.addEventListener("pointermove", p), window.addEventListener("pointerup", m);
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
    const s = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((g) => g.parentId === t.id), l = Math.min(...r.map((g) => g.x - g.w / 2)), c = Math.max(...r.map((g) => g.x + g.w / 2)), p = Math.min(...r.map((g) => g.y - g.h / 2)), m = Math.max(...r.map((g) => g.y + g.h / 2)), f = Ds(
      r.map((g) => ({ dx: g.x - a.x, dy: g.y - a.y, w: g.w, h: g.h })),
      { w: s, h: o }
    ), h = (g) => {
      if ((g.buttons & 1) === 0) {
        w();
        return;
      }
      const y = this.toScene(g);
      if (g.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(f.w, 2 * Math.abs(y.x - a.x)),
          h: Math.max(f.h, 2 * Math.abs(y.y - a.y))
        };
        return;
      }
      const v = a.x - i * a.w / 2, E = a.y - n * a.h / 2, L = i > 0 ? Math.max(y.x, v + s, r.length ? c + 10 : -1 / 0) : Math.min(y.x, v - s, r.length ? l - 10 : 1 / 0), R = n > 0 ? Math.max(y.y, E + o, r.length ? m + 10 : -1 / 0) : Math.min(y.y, E - o, r.length ? p - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (v + L) / 2,
        y: (E + R) / 2,
        w: Math.abs(L - v),
        h: Math.abs(R - E)
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
    const t = this.scene.nodes.find((p) => p.id === e.sourceId), i = this.scene.nodes.find((p) => p.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), a = n[0] ?? o, r = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, a.x, a.y), c = this.borderPoint(i, r.x, r.y);
    if (!n.length) {
      const p = this.edgeOffset(e);
      if (p !== 0) {
        const m = Math.hypot(c.x - l.x, c.y - l.y) || 1, f = -(c.y - l.y) / m * p, h = (c.x - l.x) / m * p;
        l = { x: l.x + f, y: l.y + h }, c = { x: c.x + f, y: c.y + h };
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
      const { dist: s } = cl(t, e[n], e[n + 1]);
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
          const p = [...this._wpDrag.points];
          p[s] = c, this._wpDrag = { ...this._wpDrag, points: p };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const p = [...this.edgePoints[t.id] ?? []];
        p.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: p, index: s };
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return W`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${ul(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? W`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${s ? l.map((c, p) => {
      var f;
      const m = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === p;
      return W`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
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
    var f, h, w;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, r = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, l = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, c = r / 2, p = l / 2, m = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return W`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${s ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? W`<rect x=${-c - 4} y=${-p - 4} width=${r + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-p} width=${r} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? W`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? W`<text x=${-c} y=${-p - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? W`<g transform="translate(${c - 13}, ${-p + 13})"
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
        ${e.symbol && et[e.symbol] && !a ? W`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-p + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${et[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && et[e.symbol] ? W`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${et[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? W`
              <foreignObject x=${-c + 6} y=${o ? -p + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : a ? W`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? W`<text x=${-c + 12} y=${-p + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : W`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? W`<line x1=${-c + 8} y1=${-p + 28} x2=${c - 8} y2=${-p + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (a ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page") ? [
      [c, 0],
      [-c, 0],
      [0, p],
      [0, -p]
    ].map(
      ([g, y]) => W`
                <circle data-handle cx=${g} cy=${y} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, y]) => W`
                <rect data-resize x=${g * c - 6.5} y=${y * p - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * y > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, g, y)}>
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
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), c = Math.max(a.x, r.x), p = Math.min(a.y, r.y), m = Math.max(a.y, r.y), f = this.scene.nodes.filter((h) => {
          const w = this.nodePos(h);
          return w.x >= l && w.x <= c && w.y >= p && w.y <= m;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, n = Math.max(...t.map((a) => a.x + a.w / 2)) + e, s = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = xt.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    _e(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return N``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = s.width / this._t.k, l = s.height / this._t.k;
    return N`
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
      var p, m;
      (m = (p = c.currentTarget).hasPointerCapture) != null && m.call(p, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const p = this.nodePos(c);
      return W`<rect
              x=${(p.x - c.w / 2 - e.minX) * n}
              y=${(p.y - c.h / 2 - e.minY) * n}
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
    }), N`
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
ne.styles = ti`
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
  ce({ attribute: !1 })
], ne.prototype, "scene", 2);
ae([
  ce({ attribute: !1 })
], ne.prototype, "selectedId", 2);
ae([
  ce({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
ae([
  ce({ type: Boolean })
], ne.prototype, "connectable", 2);
ae([
  ce({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
ae([
  T()
], ne.prototype, "_t", 2);
ae([
  T()
], ne.prototype, "_dragPos", 2);
ae([
  T()
], ne.prototype, "_dragGroup", 2);
ae([
  T()
], ne.prototype, "_pendingLink", 2);
ae([
  T()
], ne.prototype, "_hoverNodeId", 2);
ae([
  T()
], ne.prototype, "_editingId", 2);
ae([
  T()
], ne.prototype, "_spaceDown", 2);
ae([
  T()
], ne.prototype, "_wpDrag", 2);
ae([
  T()
], ne.prototype, "_selectedWaypoint", 2);
ae([
  T()
], ne.prototype, "_resize", 2);
ae([
  T()
], ne.prototype, "_rubber", 2);
ae([
  ce({ attribute: !1 })
], ne.prototype, "fitInsets", 2);
ne = ae([
  ni("modux-canvas")
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
function he(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ke = (e) => e.trim().toLowerCase();
function pl(e, t) {
  var O, A, P, H, X;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((b) => ({ ...b, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), a = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((b) => b.id))
  ), l = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((b) => ({ ...b, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((b) => ({ ...b, moduleId: u.id, application: !0 }))
  ), p = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((b) => ({ ...b, moduleId: u.id }))
  );
  for (const u of s)
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: F.command.w,
      h: F.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? F.policy.fill : F.command.fill,
      stroke: u.policy ? F.policy.stroke : F.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of a)
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: F.aggregate.w,
      h: F.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: F.aggregate.fill,
      stroke: F.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const u of [...l, ...c])
    he(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: F.event.w,
      h: F.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: F.event.fill,
      stroke: F.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), m.set(Ke(u.name), u.id);
  const f = (u) => {
    if (!u || !u.trim()) return null;
    const b = m.get(Ke(u));
    if (b) return b;
    const x = `evname:${Ke(u)}`;
    return he(i, {
      id: x,
      label: u,
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
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), x;
  }, h = (u) => {
    const b = p.find((S) => S.id === u.id) ?? p.find((S) => u.name && Ke(S.name) === Ke(u.name)), x = (b == null ? void 0 : b.id) ?? (u.id || (u.name ? `rm:${Ke(u.name)}` : null));
    return x ? (he(i, {
      id: x,
      label: (b == null ? void 0 : b.name) ?? u.name ?? x,
      x: 0,
      y: 0,
      w: F.readModel.w,
      h: F.readModel.h,
      kind: b ? "read-model" : "derived-read-model",
      fill: F.readModel.fill,
      stroke: F.readModel.stroke,
      dashed: !b,
      badge: "READ MODEL"
    }), x) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const b = (e.actors ?? []).find((x) => x.id === u.actorId);
    b && (he(i, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: F.actor.w,
      h: F.actor.h,
      kind: "actor",
      symbol: "person",
      fill: F.actor.fill,
      stroke: F.actor.stroke,
      badge: "ACTOR"
    }), ie(i, {
      id: `es-actor:${b.id}->${u.targetId}`,
      sourceId: b.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const b = (e.agentUses ?? []).filter((M) => M.agentId === u.id), x = (e.agentExternalUses ?? []).filter((M) => M.agentId === u.id), S = (e.agentRags ?? []).filter((M) => M.agentId === u.id), D = (e.agentMcpUses ?? []).filter((M) => M.agentId === u.id), z = (e.agentGatewayUses ?? []).some((M) => M.agentId === u.id) || (e.agentApiOpUses ?? []).some((M) => M.agentId === u.id) || (e.agentQueryUses ?? []).some((M) => M.agentId === u.id) || (e.agentDelegations ?? []).some((M) => M.agentId === u.id) || (e.agentTriggers ?? []).some((M) => M.agentId === u.id);
    if (!(!b.length && !x.length && !S.length && !D.length && !z)) {
      he(i, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: F.actor.w,
        h: F.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const M of b)
        o.has(M.useCaseId) && ie(i, {
          id: `es-agent:${u.id}->${M.useCaseId}`,
          sourceId: u.id,
          targetId: M.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const M of x) {
        const U = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === M.externalUseCaseId)
        );
        if (!U) continue;
        const K = (O = (U.useCases ?? []).find((Z) => Z.id === M.externalUseCaseId)) == null ? void 0 : O.name;
        he(i, {
          id: U.id,
          label: U.name,
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
        }), ie(i, {
          id: `es-agentx:${u.id}->${M.externalUseCaseId}`,
          sourceId: u.id,
          targetId: U.id,
          kind: "es-agent-external",
          label: K,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: K ? `Llama a ${K} del sistema externo` : void 0
        });
      }
      for (const M of D) {
        const U = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === M.mcpServerId)
        );
        if (!U) continue;
        const K = (A = (U.mcpServers ?? []).find((Z) => Z.id === M.mcpServerId)) == null ? void 0 : A.name;
        he(i, {
          id: U.id,
          label: U.name,
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
        }), ie(i, {
          id: `es-agentmcp:${u.id}->${M.mcpServerId}`,
          sourceId: u.id,
          targetId: U.id,
          kind: "es-agent-mcp",
          label: K,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: K ? `Consume las herramientas del servidor MCP ${K}` : void 0
        });
      }
      for (const M of S) {
        const U = (e.rags ?? []).find((K) => K.id === M.ragId);
        if (U) {
          he(i, {
            id: U.id,
            label: U.name,
            x: 0,
            y: 0,
            w: F.readModel.w,
            h: F.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${U.name} — base de conocimiento (retrieval)`
          }), ie(i, {
            id: `es-agrag:${u.id}->${U.id}`,
            sourceId: u.id,
            targetId: U.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const K of U.sourceReadModelIds ?? []) {
            const Z = h({ id: K });
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
  const w = (u) => {
    const b = e.externalSystems.find((x) => x.id === u);
    return b ? (he(i, {
      id: b.id,
      label: b.name,
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
    }), b.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const b = w(u.externalSystemId);
    !b || !o.has(u.useCaseId) || ie(i, {
      id: `es-extin:${b}->${u.useCaseId}`,
      sourceId: b,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const b = e.externalSystems.find(
      (D) => (D.useCases ?? []).some((z) => z.id === u.targetId)
    ), x = b ? w(b.id) : null;
    if (!x) continue;
    const S = (P = ((b == null ? void 0 : b.useCases) ?? []).find((D) => D.id === u.targetId)) == null ? void 0 : P.name;
    ie(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: x,
      kind: "es-command-external",
      label: S,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: S ? `Llama a ${S} del sistema externo` : void 0
    });
  }
  for (const u of e.aggregateCalls ?? [])
    !o.has(u.sourceId) || !i.nodes.has(u.targetId) || ie(i, {
      id: `es-write:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: u.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const g = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of g)
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || a.some((x) => x.id === u.sourceId) || r.has(u.sourceId))) || ie(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const y = (u, b, x, S, D, z) => (he(i, {
    id: u,
    label: b,
    x: 0,
    y: 0,
    w: F.policy.w,
    h: F.policy.h,
    kind: x,
    symbol: "flow",
    fill: F.policy.fill,
    stroke: F.policy.stroke,
    badge: S,
    tooltip: D
  }), u), v = (u, b) => {
    const x = f(u);
    x && ie(i, {
      id: `es-trigger:${x}->${b}`,
      sourceId: x,
      targetId: b,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, E = (u, b) => {
    !b || !o.has(b) || ie(i, {
      id: `es-invoke:${u}->${b}`,
      sourceId: u,
      targetId: b,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const b = y(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    v(u.eventName, b);
    for (const x of u.actions ?? []) {
      if (x.type === "CallUseCase" && E(b, x.useCaseId), x.type === "StartSaga" && x.sagaId) {
        const S = `saga:${x.sagaId}`;
        y(S, x.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${b}->${S}`,
          sourceId: b,
          targetId: S,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (x.type === "UpdateProjection" && x.projectionId) {
        const S = (e.projections ?? []).find((D) => D.id === x.projectionId);
        S && ie(i, {
          id: `es-feeds:${b}->${S.id}`,
          sourceId: b,
          targetId: S.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const b = y(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const D of u.handledEventIds) {
      const z = i.nodes.has(D) ? D : null;
      z && ie(i, {
        id: `es-trigger:${z}->${b}`,
        sourceId: z,
        targetId: b,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && ie(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: b,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const x = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (x) {
      const D = e.externalSystems.find(
        (M) => (M.useCases ?? []).some((U) => U.id === x) || (M.tables ?? []).some((U) => U.id === x)
      ), z = D ? w(D.id) : null;
      if (z) {
        const M = ((H = (D.useCases ?? []).find((U) => U.id === x)) == null ? void 0 : H.name) ?? ((X = (D.tables ?? []).find((U) => U.id === x)) == null ? void 0 : X.name);
        ie(i, {
          id: `es-poll:${u.id}`,
          sourceId: z,
          targetId: b,
          kind: "es-projects-poll",
          label: M,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: M ? `polling de ${M}` : "polling"
        });
      }
    }
    const S = h({ id: u.readModelId, name: u.readModelName });
    S && ie(i, {
      id: `es-projects:${b}->${S}`,
      sourceId: b,
      targetId: S,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const x = f(u.triggerEvent), S = h({ name: u.readModelName ?? `${u.triggerEvent}View` });
      x && S && ie(i, {
        id: `es-mat:${u.id}`,
        sourceId: x,
        targetId: S,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const b = y(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (v(u.triggerEvent, b), E(b, u.targetUseCaseId), !u.targetUseCaseId) {
      const x = w(u.targetId), S = x ?? `tgt:${u.targetId}`;
      !x && n.has(u.targetId) && he(i, {
        id: S,
        label: n.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: F.module.w,
        h: F.module.h,
        kind: "module",
        symbol: "component",
        fill: F.module.fill,
        stroke: F.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(S) && ie(i, {
        id: `es-deliver:${u.id}`,
        sourceId: b,
        targetId: S,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const b = y(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    v(u.triggerEvent, b);
    for (const S of u.steps) E(b, S.useCaseId);
    const x = f(u.onCompletionEventName);
    x && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: b,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const b = y(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    v(u.triggerEvent, b);
    for (const S of u.steps ?? []) {
      E(b, S.targetUseCaseId);
      for (const D of [S.emittedEventName, S.completionEventName]) {
        const z = f(D);
        z && ie(i, {
          id: `es-wfemit:${u.id}:${z}`,
          sourceId: b,
          targetId: z,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const x = f(u.onCompletionEventName);
    x && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: b,
      targetId: x,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const L = [...i.nodes.values()], R = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    R.has(u.targetId) || R.set(u.targetId, []), R.get(u.targetId).push(u.sourceId);
  const _ = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Set(), k = (u) => {
    const b = _.get(u);
    if (b !== void 0) return b;
    if (I.has(u)) return 0;
    I.add(u);
    const x = R.get(u) ?? [], S = x.length ? 1 + Math.max(...x.map(k)) : 0;
    return I.delete(u), _.set(u, S), S;
  }, $ = /* @__PURE__ */ new Map();
  for (const u of L) {
    const b = t[u.id];
    if (b) {
      u.x = b.x, u.y = b.y;
      continue;
    }
    const x = k(u.id), S = $.get(x) ?? 0;
    $.set(x, S + 1), u.x = 140 + x * 260, u.y = 110 + S * 110;
  }
  return { nodes: L, edges: i.edges };
}
const hl = 190, ml = 56, Sn = 180, fl = 56, gl = 150, yl = 44, An = 250, Cn = 100;
function wl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), a;
  };
  return n(e);
}
function vl(e, t) {
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
function Il(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (r) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === r)) == null ? void 0 : l.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((r) => {
    var y;
    const l = new Map(r.steps.map((v) => [v.id, v])), c = new Map(r.steps.map((v) => [v.id, wl(v, l)])), p = /* @__PURE__ */ new Map();
    for (const v of r.steps) {
      const E = c.get(v.id) ?? 0;
      p.set(E, (p.get(E) ?? 0) + 1);
    }
    const m = Math.max(1, ...p.values()), f = vl(e, r);
    if (f && !s.has(f.id)) {
      s.add(f.id);
      const v = t[f.id] ?? { x: 140, y: a };
      i.push({
        id: f.id,
        label: f.label,
        x: v.x,
        y: v.y,
        w: gl,
        h: yl,
        kind: f.kind,
        symbol: f.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: f.kind === "aggregate" ? "AGGREGATE" : f.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[r.id] ?? { x: 420, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: h.x,
      y: h.y,
      w: hl,
      h: ml,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), f && n.push({
      id: `wft:${r.id}`,
      sourceId: f.id,
      targetId: r.id,
      kind: "workflow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    });
    const w = /* @__PURE__ */ new Map();
    let g = 0;
    for (const v of r.steps) {
      const E = c.get(v.id) ?? 0;
      g = Math.max(g, E);
      const L = w.get(E) ?? 0;
      w.set(E, L + 1);
      const R = t[v.id] ?? {
        x: h.x + (E + 1) * An,
        y: a + (L - (p.get(E) - 1) / 2) * Cn
      }, _ = o(v.targetUseCaseId);
      i.push({
        id: v.id,
        label: v.name,
        x: R.x,
        y: R.y,
        w: Sn,
        h: fl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: _ ? `→ ${_}` : "∅ sin use case",
        tooltip: `${v.name}${v.emittedEventName ? ` · emite ${v.emittedEventName}` : ""}${_ ? ` · lanza ${_}` : ""}${v.completionEventName ? ` · espera ${v.completionEventName}` : ""}`
      });
      const I = (v.dependsOnStepIds ?? []).filter((k) => l.has(k));
      I.length === 0 && n.push({
        id: `wfs:${r.id}:${v.id}`,
        sourceId: r.id,
        targetId: v.id,
        kind: "workflow-start",
        label: v.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of I)
        n.push({
          id: `wfdep:${k}->${v.id}`,
          sourceId: k,
          targetId: v.id,
          kind: "workflow-dependency",
          label: v.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${v.name} espera a ${((y = l.get(k)) == null ? void 0 : y.name) ?? k}`
        });
    }
    if (r.onCompletionEventName) {
      const v = `done:${r.id}`, E = t[v] ?? { x: h.x + (g + 2) * An, y: a };
      i.push({
        id: v,
        label: r.onCompletionEventName,
        x: E.x,
        y: E.y,
        w: Sn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const L = new Set(r.steps.flatMap((_) => _.dependsOnStepIds ?? [])), R = r.steps.filter((_) => !L.has(_.id));
      for (const _ of R.length ? R : [])
        n.push({
          id: `wfd:${r.id}:${_.id}`,
          sourceId: _.id,
          targetId: v,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || n.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: v,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, m + 1) * Cn + 60;
  }), { nodes: i, edges: n };
}
const Mn = 250, Ii = 30, xl = 6, _l = 16, bl = 190, Pn = 60, kl = 170, qt = 44;
function $l(e, t) {
  return `menu:${e}:${t.join(">")}`;
}
function El(e) {
  const t = [], i = (n, s, o) => {
    for (const a of n ?? []) {
      const r = [...s, a.label];
      t.push({ entry: a, path: r, depth: o }), i(a.children ?? [], r, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Sl(e, t) {
  const i = [], n = [], s = e.uiApps ?? [], o = e.pages ?? [], a = (g) => {
    var y;
    return ((y = e.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === g)) == null ? void 0 : y.name) ?? g;
  }, r = (g) => {
    var y;
    return ((y = e.modules.flatMap((v) => v.queryServices ?? []).find((v) => v.id === g)) == null ? void 0 : y.name) ?? g;
  };
  let l = 160;
  for (const g of s) {
    const y = El(g), v = Math.max(
      90,
      54 + y.length * (Ii + xl)
    ), E = t[g.id] ?? { x: 190, y: l + v / 2 };
    l = E.y + v / 2 + 70, i.push({
      id: g.id,
      label: g.title || g.name,
      x: E.x,
      y: E.y,
      w: Mn,
      h: v,
      kind: "ui-app",
      symbol: "component",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      container: !0,
      tooltip: `App: ${g.name}`
    });
    let L = E.y - v / 2 + 34 + 10 + Ii / 2;
    for (const { entry: R, path: _, depth: I } of y) {
      const k = $l(g.id, _), $ = I * _l;
      i.push({
        id: k,
        label: R.label,
        x: E.x + $ / 2,
        y: L,
        w: Mn - 20 - $,
        h: Ii,
        kind: "menu-item",
        symbol: "process",
        fill: "#ffffff",
        stroke: "#7dd3fc",
        parentId: g.id,
        tooltip: R.pageId ? `Abre ${R.pageId}` : "Entrada de menú sin página"
      }), R.pageId && o.some((O) => O.id === R.pageId) && n.push({
        id: `menupage:${k}->${R.pageId}`,
        sourceId: k,
        targetId: R.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  const c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const g of o) {
    const y = t[g.id] ?? { x: 640, y: p };
    p = y.y + Pn + 90, i.push({
      id: g.id,
      label: g.name,
      x: y.x,
      y: y.y,
      w: bl,
      h: Pn,
      kind: "page",
      symbol: "interface",
      badge: g.type ?? "FORM",
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: g.route ? `${g.type ?? "FORM"} · ${g.route}` : g.type ?? "FORM"
    }), g.modelId && (c.set(g.modelId, {
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
      v.useCaseId && (c.set(v.useCaseId, {
        label: a(v.useCaseId),
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
    g.listingQueryServiceId && (c.set(g.listingQueryServiceId, {
      label: r(g.listingQueryServiceId),
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
  for (const [g, y] of c) {
    const v = t[g] ?? { x: 1050, y: m };
    m = v.y + qt + 46, i.push({
      id: g,
      label: y.label,
      x: v.x,
      y: v.y,
      w: kl,
      h: qt,
      kind: y.kind,
      symbol: y.symbol,
      fill: "#ffffff",
      stroke: y.stroke
    });
  }
  const f = (e.actorAppUses ?? []).filter(
    (g) => s.some((y) => y.id === g.appId) && (e.actors ?? []).some((y) => y.id === g.actorId)
  ), h = [...new Set(f.map((g) => g.actorId))];
  let w = 160;
  for (const g of h) {
    const y = (e.actors ?? []).find((E) => E.id === g), v = t[g] ?? { x: -60, y: w };
    w = v.y + qt + 46, i.push({
      id: g,
      label: y.name,
      x: v.x,
      y: v.y,
      w: 150,
      h: qt,
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
async function Al(e, t) {
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
var Cl = Object.defineProperty, Ml = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ml(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Cl(t, i, s), s;
};
const Pl = /* @__PURE__ */ new Set([
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
  "page"
]);
let fe = class extends De {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onDown = (e) => {
      var s, o;
      if (e.button !== 0) return;
      this.focus(), (s = this.setPointerCapture) == null || s.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".h3");
      if (i != null && i.dataset.sourceId) {
        const a = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - a.left,
          y1: e.clientY - a.top,
          x2: e.clientX - a.left,
          y2: e.clientY - a.top
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
        const o = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - o.left, y2: e.clientY - o.top };
        const a = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), r = (s = a == null ? void 0 : a.closest) == null ? void 0 : s.call(a, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = l !== this._connect.sourceId ? l : null;
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
    var n, s, o;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((o = (s = i == null ? void 0 : i.closest) == null ? void 0 : s.call(i, ".n3")) == null ? void 0 : o.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, s = i.height * 0.42, o = new DOMMatrix();
    o.m34 = -1 / 1600;
    const a = new DOMMatrix().translate(n, s).multiply(o).translate(-n, -s).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = a.transformPoint(new DOMPoint(0, 0, 0, 1)), l = a.transformPoint(new DOMPoint(1, 0, 0, 0)), c = a.transformPoint(new DOMPoint(0, 1, 0, 0)), p = e - i.left, m = t - i.top, f = l.x - p * l.w, h = c.x - p * c.w, w = l.y - m * l.w, g = c.y - m * c.w, y = p * r.w - r.x, v = m * r.w - r.y, E = f * g - h * w;
    return E ? { x: (y * g - h * v) / E, y: (f * v - y * w) / E } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const s = t.get(n.id);
      if (s !== void 0) return s;
      const o = n.parentId ? e.get(n.parentId) : void 0, a = o ? i(o) + 1 : 0;
      return t.set(n.id, a), a;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return N`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((y) => [y.id, y])), n = Math.min(...e.map((y) => y.x - y.w / 2)) - 60, s = Math.max(...e.map((y) => y.x + y.w / 2)) + 60, o = Math.min(...e.map((y) => y.y - y.h / 2)) - 60, a = Math.max(...e.map((y) => y.y + y.h / 2)) + 60, r = (n + s) / 2, l = (o + a) / 2, c = this.getBoundingClientRect(), p = c.width ? Math.min(c.width / (s - n), c.height / (a - o), 1) * 0.9 : 0.5, m = this._k * p;
    this._kUsed = m, this._center = { x: r, y: l };
    const f = 30, h = this._liveMove, w = (y) => y.x + ((h == null ? void 0 : h.id) === y.id ? h.dx : 0), g = (y) => y.y + ((h == null ? void 0 : h.id) === y.id ? h.dy : 0);
    return N`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${o}px"
            width=${s - n}
            height=${a - o}
            viewBox="${n} ${o} ${s - n} ${a - o}"
          >
            ${this.scene.edges.map((y) => {
      const v = i.get(y.sourceId), E = i.get(y.targetId);
      return !v || !E ? "" : W`<line
                x1=${w(v)} y1=${g(v)} x2=${w(E)} y2=${g(E)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((y) => {
      const v = i.get(y.sourceId), E = i.get(y.targetId);
      if (!v || !E) return "";
      const L = (t.get(v.id) ?? 0) * f + 2, R = (t.get(E.id) ?? 0) * f + 2, _ = w(E) - w(v), I = g(E) - g(v), k = R - L, $ = Math.hypot(_, I), O = Math.hypot($, k), A = Math.atan2(I, _) * 180 / Math.PI, P = Math.atan2(k, $) * 180 / Math.PI, H = y.color ?? "#64748b", X = y.dashed ? `repeating-linear-gradient(90deg, ${H} 0 6px, transparent 6px 10px)` : H;
      return N`<div
              class="edge3"
              style="
                left: ${w(v)}px; top: ${g(v)}px; width: ${O}px; height: 1.7px;
                transform: translateZ(${L}px) rotateZ(${A}deg) rotateY(${-P}deg);
                background: ${X};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((y) => {
      const v = t.get(y.id) ?? 0, E = y.container || v === 0, L = this._hoverTargetId === y.id;
      return N`
              <div
                class="n3 ${y.container ? "container3" : ""} ${this.selectedId === y.id ? "selected3" : ""} ${L ? "hover3" : ""}"
                data-node-id=${y.id}
                data-kind=${y.kind}
                title=${y.tooltip ?? y.label}
                style="
                  left: ${w(y) - y.w / 2}px; top: ${g(y) - y.h / 2}px;
                  width: ${y.w}px; height: ${y.h}px;
                  transform: translateZ(${v * f + (L ? 8 : 0)}px)${L ? " scale(1.06)" : ""};
                  background: ${y.container ? "color-mix(in srgb, " + (y.fill ?? "#ffffff") + " 82%, transparent)" : y.fill ?? "#ffffff"};
                  border-color: ${y.stroke ?? "#64748b"};
                  border-style: ${y.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${E ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${y.badge ? N`<span class="badge3" style="color: ${y.stroke ?? "#94a3b8"}">${y.badge}</span>` : ""}
                <span>${y.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const y = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!y || !Pl.has(y.kind)) return "";
      const v = (t.get(y.id) ?? 0) * f + 4;
      return [
        [w(y) + y.w / 2, g(y)],
        [w(y) - y.w / 2, g(y)],
        [w(y), g(y) + y.h / 2],
        [w(y), g(y) - y.h / 2]
      ].map(
        ([L, R]) => N`<div
                class="h3"
                data-source-id=${y.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${L}px; top: ${R}px; transform: translateZ(${v}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? N`<svg class="rubber">
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
fe.styles = ti`
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
  ce({ attribute: !1 })
], fe.prototype, "scene", 2);
$e([
  ce({ attribute: !1 })
], fe.prototype, "selectedId", 2);
$e([
  ce({ attribute: !1 })
], fe.prototype, "connectable", 2);
$e([
  T()
], fe.prototype, "_rx", 2);
$e([
  T()
], fe.prototype, "_rz", 2);
$e([
  T()
], fe.prototype, "_k", 2);
$e([
  T()
], fe.prototype, "_pan", 2);
$e([
  T()
], fe.prototype, "_liveMove", 2);
$e([
  T()
], fe.prototype, "_connect", 2);
$e([
  T()
], fe.prototype, "_hoverTargetId", 2);
fe = $e([
  ni("modux-tilt")
], fe);
var Nl = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, B = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ol(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Nl(t, i, s), s;
};
const Oi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Tl = Object.keys(Oi);
function ft(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const c = t.x - e.x, p = t.y - e.y;
  for (const [m, f] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-p, e.y - o],
    [p, a - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / m;
    if (m < 0) {
      if (h > l) return !1;
      h > r && (r = h);
    } else {
      if (h < r) return !1;
      h < l && (l = h);
    }
  }
  return l - r > 0.02;
}
function Rl(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((p) => [p.id, p])), s = (p) => {
    var f;
    const m = /* @__PURE__ */ new Set();
    for (let h = p; h; h = (f = n.get(h)) == null ? void 0 : f.parentId) m.add(h);
    return m;
  }, o = e.nodes, a = (p) => p.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (p, m, f) => {
    const h = a(f), w = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, g = f.w / 2 + h * 1.5, y = f.h / 2 + h * 1.5, v = { x: f.x - g, y: f.y - y }, E = { x: f.x + g, y: f.y - y }, L = { x: f.x - g, y: f.y + y }, R = { x: f.x + g, y: f.y + y }, _ = [];
    for (const I of [v, E, L, R])
      !ft(p, I, w) && !ft(I, m, w) && _.push([I]);
    for (const [I, k] of [
      [v, E],
      [E, v],
      [E, R],
      [R, E],
      [R, L],
      [L, R],
      [L, v],
      [v, L]
    ])
      !ft(p, I, w) && !ft(k, m, w) && _.push([I, k]);
    return _;
  };
  for (const p of e.edges) {
    if ((c = t[p.id]) != null && c.length) continue;
    const m = n.get(p.sourceId), f = n.get(p.targetId);
    if (!m || !f) continue;
    const h = /* @__PURE__ */ new Set([...s(m.id), ...s(f.id)]), w = [
      { x: m.x, y: m.y },
      { x: f.x, y: f.y }
    ];
    for (let g = 0; g < 12; g++) {
      let y = !1;
      e: for (let v = 0; v < w.length - 1; v++)
        for (const E of o) {
          if (h.has(E.id)) continue;
          const L = a(E), R = { x: E.x, y: E.y, w: E.w + 2 * L, h: E.h + 2 * L };
          if (!ft(w[v], w[v + 1], R)) continue;
          const _ = l(w[v], w[v + 1], E);
          if (!_.length) continue;
          const I = ($) => o.some(
            (O) => O !== E && !h.has(O.id) && Math.abs($.x - O.x) < O.w / 2 + a(O) / 2 && Math.abs($.y - O.y) < O.h / 2 + a(O) / 2
          ), k = ($) => {
            let O = 0;
            const A = [w[v], ...$, w[v + 1]];
            for (let P = 0; P < A.length - 1; P++)
              O += Math.hypot(A[P + 1].x - A[P].x, A[P + 1].y - A[P].y);
            return O + ($.some(I) ? 1e4 : 0);
          };
          _.sort(($, O) => k($) - k(O)), w.splice(v + 1, 0, ..._[0]), y = !0;
          break e;
        }
      if (!y) break;
    }
    w.length > 2 && r.set(
      p.id,
      w.slice(1, -1).map((g) => ({ x: Math.round(g.x), y: Math.round(g.y) }))
    );
  }
  return r;
}
const j = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Dl(e, t) {
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
function Ll(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let V = class extends De {
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
      const n = this.renderRoot.querySelector("modux-canvas"), s = (o) => {
        e.preventDefault(), this.onDiagramScopeChange(o);
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
    return Rt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Rt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Rt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const s = Rt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((p) => !p.parentId), r = Ti(a), l = [...r.keys()].map((p) => ({
      kind: "move-node",
      view: "context-map",
      id: p,
      pos: o.nodes[p] ?? null
    })), c = { ...o.nodes };
    for (const [p, m] of r) {
      const f = a.find((w) => w.id === p), h = o.nodes[p] ?? { x: f.x, y: f.y };
      c[p] = {
        x: Math.round(h.x + (m.x - f.x)),
        y: Math.round(h.y + (m.y - f.y))
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
    const i = Rl(e, t);
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
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, label: e.label }];
      case "remove-menu-item": {
        const o = (this.model.uiApps ?? []).find((l) => l.id === e.appId), a = (l) => {
          for (const c of l ?? []) {
            if (c.label === e.label) return c;
            const p = a(c.children);
            if (p) return p;
          }
          return null;
        }, r = e.label ? a(o == null ? void 0 : o.menuItems) : null;
        return r && e.label ? [{ kind: "add-menu-item", appId: e.appId, label: e.label, pageId: r.pageId ?? null }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const o = (this.model.pages ?? []).find((r) => r.id === e.pageId), a = ((o == null ? void 0 : o.buttons) ?? []).find((r) => r.useCaseId === e.useCaseId);
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
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
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
    const l = this.sceneFor(s), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((f) => f.id === c.parentId);
      m && (r = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: r } });
    const p = [{ kind: "move-node", view: s, id: t, pos: a }];
    if (s === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const f = this.inverseOf(m);
        f && p.unshift(...f), this.command(m, !1);
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t) ?? (this.model.proxyApis ?? []).find((w) => w.id === t);
    if (!o || i && !this.model.externalSystems.some((w) => w.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === a) return;
    const l = this._view, c = this.viewLayout(l), p = this.sceneFor(l), m = r ? p.nodes.find((w) => w.id === r) : void 0, f = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, h = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: f } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((w) => w.id === t), a = this.model.externalSystems.find((w) => w.id === i);
    if (!o || !a || (this.model.proxyApis ?? []).some(
      (w) => w.targetApiId === t && w.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${j(o.name)}-${j(a.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === l)) return;
    const c = this._view, p = this.viewLayout(c), f = this.sceneFor(c).nodes.find((w) => w.id === i);
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
    const h = [{ kind: "remove-proxy-api", id: l }];
    f && (h.push({ kind: "move-node", view: c, id: l, pos: p.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...p,
      nodes: { ...p.nodes, [l]: { x: n - f.x, y: s - f.y } }
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
    var r, l, c;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const n = await i.text(), s = this.selectedApiId(), o = s ? null : ((l = this.model.externalSystems.find((p) => p.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = s || o ? null : ((c = this.model.modules.find((p) => p.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
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
      let p = { x: l, y: c };
      const m = s.nodes.find((f) => f.id === r);
      if (m != null && m.parentId) {
        const f = s.nodes.find((h) => h.id === m.parentId);
        f && (p = { x: l - f.x, y: c - f.y });
      }
      o[r] = p;
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
    var p;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((p = r.sizes) == null ? void 0 : p[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: a, id: m.id, pos: r.nodes[m.id] ?? null }))
    ]);
    const c = { ...r.nodes, [t]: { x: i, y: n } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - n };
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
    const i = Ki(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((a) => [a.id, a.x])), s = [...t.steps].sort(
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
    var R;
    if (this._view === "workflows") {
      const _ = this.owningWorkflowOf(e), I = this.owningWorkflowOf(t);
      if (!_ || _ !== I || e === t) return;
      const k = _.steps.find(($) => $.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: _.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const _ = this.model.pages ?? [], I = this.model.uiApps ?? [], k = (A) => I.some((P) => P.id === A), $ = (A) => _.some((P) => P.id === A);
      if ($(e) && k(t)) {
        const A = _.find((P) => P.id === e);
        this.command({ kind: "add-menu-item", appId: t, label: A.name, pageId: e });
        return;
      }
      if ((this.model.actors ?? []).some((A) => A.id === e) && k(t)) {
        (this.model.actorAppUses ?? []).some((A) => A.actorId === e && A.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const O = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (O) {
        const A = new Set(
          this.model.modules.flatMap((X) => (X.useCases ?? []).map((u) => u.id))
        ), P = new Set(
          this.model.modules.flatMap((X) => (X.queryServices ?? []).map((u) => u.id))
        ), H = _.find((X) => X.id === O.pageId);
        A.has(O.other) ? (H.buttons ?? []).some((X) => X.useCaseId === O.other) || this.command({ kind: "add-page-button", pageId: O.pageId, useCaseId: O.other }) : P.has(O.other) && this.command({ kind: "set-page-listing", pageId: O.pageId, queryServiceId: O.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, _, I] = s, k = (this.model.proxyApis ?? []).find((H) => H.id === I), $ = (k == null ? void 0 : k.targetApiId) ?? ((R = (this.model.apiImplementations ?? []).find(
        (H) => H.moduleId === I && (this.model.apis ?? []).some(
          (X) => X.id === H.apiId && X.operations.some((u) => u.id === _)
        )
      )) == null ? void 0 : R.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((H) => (H.useCases ?? []).map((X) => X.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: _,
          moduleId: I,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let A = null;
      if (t === k.targetApiId)
        A = k.targetApiId;
      else {
        const H = /^apiimpl:(.+)@(.+)$/.exec(t);
        H && H[1] === k.targetApiId ? A = H[2] : this.model.modules.some((X) => X.id === t) && (this.model.apiImplementations ?? []).some(
          (X) => X.apiId === k.targetApiId && X.moduleId === t
        ) && (A = t);
      }
      if (!A) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (H) => H.proxyId === k.id && H.operationId === _ && H.targetSiteId === A
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: _,
        targetSiteId: A
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((_) => _.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((A) => (A.useCases ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (P) => P.agentId === e && P.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.useCases ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (P) => P.agentId === e && P.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.mcpServers ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (P) => P.agentId === e && P.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((A) => A.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (P) => P.agentId === e && P.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((A) => A.operations.map((P) => P.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (P) => P.agentId === e && P.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((A) => A.id === t) || (this.model.proxyApis ?? []).some((A) => A.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (P) => P.agentId === e && P.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((A) => (A.queryServices ?? []).map((P) => P.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (P) => P.agentId === e && P.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (P) => P.agentId === e && P.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((A) => A.id === t) && ((this.model.agentRags ?? []).some(
        (P) => P.agentId === e && P.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((_) => _.id === e)) {
      const _ = (this.model.mcpGateways ?? []).find(($) => $.id === e), I = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((O) => O.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((O) => O.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((O) => O.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), k = [
        ..._.mcpServerIds ?? [],
        ..._.apiIds ?? [],
        ..._.apiOperationIds ?? [],
        ..._.useCaseIds ?? [],
        ..._.ragIds ?? []
      ].includes(t);
      I && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((_) => _.id === t)) return;
    const a = (this.model.rags ?? []).find((_) => _.id === e);
    if (a) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map(($) => $.id))
      ).has(t) && !(a.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map(($) => $.id))
      ).has(t) && !(a.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(a.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t) && !(a.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && !(a.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((_) => _.id === t)) return;
    if ((this.model.workflows ?? []).some((_) => _.id === e)) {
      const _ = (this.model.workflows ?? []).find(($) => $.id === e), I = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (I) {
        const $ = _.onCompletionEventName || `${_.name.replace(/\s+/g, "")}Completado`;
        I.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const k = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (k && !(_.steps ?? []).some((O) => O.targetUseCaseId === t)) {
        const O = `wfs-${j(k.name)}`;
        let A = O;
        for (let P = 2; (_.steps ?? []).some((H) => H.id === A); P++)
          A = `${O}-${P}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: A,
          name: k.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((_) => _.id === t)) {
      const _ = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), I = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), k = _ ?? I;
      if (k) {
        const $ = (this.model.emissions ?? []).find((H) => H.domainEventId === e), O = new Set((this.model.aggregates ?? []).map((H) => H.id)), A = new Set(
          this.model.modules.flatMap((H) => (H.domainServices ?? []).map((X) => X.id))
        ), P = new Set(
          this.model.modules.flatMap((H) => (H.useCases ?? []).map((X) => X.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: $ && O.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && A.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && P.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((_) => _.id === e)) {
      const _ = (this.model.proxyApis ?? []).find((I) => I.id === e);
      if ((this.model.apis ?? []).some((I) => I.id === t)) {
        _.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((I) => I.id === t)) {
        if (!_.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === _.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: _.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((I) => I.id === t) && _.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((_) => _.id === e)) {
      if (this.model.externalSystems.some((_) => _.id === t)) {
        (this.model.apis ?? []).find((I) => I.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((_) => _.id === t) && ((this.model.apiImplementations ?? []).some(
        (I) => I.apiId === e && I.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const r = new Set((this.model.actors ?? []).map((_) => _.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((I) => (I.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((I) => (I.applicationEvents ?? []).map((k) => k.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === e && k.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!r.has(e)) return;
    }
    if (r.has(e)) {
      const _ = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map(($) => $.id))
      ), I = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map(($) => $.id))
      );
      if (_.has(t) || I.has(t)) {
        (this.model.actorUses ?? []).some(
          ($) => $.actorId === e && $.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((k) => k.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          ($) => $.actorId === e && $.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((k) => k.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          ($) => $.actorId === e && $.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const l = this.owningApiOf(e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((I) => (I.useCases ?? []).map((k) => k.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((I) => I.id === t)) {
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
    const c = this.model.externalSystems.flatMap((_) => _.useCases ?? []).find((_) => _.id === e), p = this.model.externalSystems.flatMap((_) => _.tables ?? []).find((_) => _.id === e);
    if (c || p) {
      const _ = (c ?? p).name, I = c ? { externalUseCaseId: e } : { externalTableId: e }, k = (A) => c ? A.sourceExternalUseCaseId === e : A.sourceExternalTableId === e, $ = this.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (P) => k(P) && P.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(_)}-${j($.name)}`,
          name: `${$.name}Projection`,
          ...I,
          targetId: t
        });
        return;
      }
      const O = this.model.modules.find((A) => A.id === t);
      if (O) {
        (this.model.projections ?? []).some(
          (P) => k(P) && P.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(_)}-${j(O.name)}`,
          name: `${_}ViewProjection`,
          ...I,
          moduleId: t,
          readModelName: `${_}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((_) => _.id === e);
    if (m) {
      const _ = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (_) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(m.name)}-${j(_.name)}`,
          name: `${_.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const I = this.model.modules.find((k) => k.id === t);
      if (I) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(m.name)}-${j(I.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((_) => (_.domainEvents ?? []).map((I) => I.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((_) => _.id),
      ...this.model.modules.flatMap((_) => (_.domainServices ?? []).map((I) => I.id))
    ]), w = new Set(
      this.model.modules.flatMap((_) => (_.applicationEvents ?? []).map((I) => I.id))
    ), g = new Set(this.model.modules.flatMap((_) => (_.useCases ?? []).map((I) => I.id))), y = new Set(
      this.model.modules.flatMap((_) => (_.queryServices ?? []).map((I) => I.id))
    );
    if (g.has(e) && y.has(t)) {
      (this.model.queryCalls ?? []).some(
        (I) => I.sourceId === e && I.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const v = new Set(
      this.model.externalSystems.flatMap((_) => (_.useCases ?? []).map((I) => I.id))
    );
    if (g.has(e) && v.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (I) => I.sourceId === e && I.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && g.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (I) => I.sourceId === e && I.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (g.has(e) && (this.model.aggregates ?? []).some((_) => _.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (I) => I.sourceId === e && I.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && f.has(t) || g.has(e) && w.has(t)) {
      (this.model.emissions ?? []).some(
        (I) => I.sourceId === e && I.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || w.has(e)) {
      const _ = w.has(e), I = this.model.modules.flatMap((x) => (_ ? x.applicationEvents : x.domainEvents) ?? []).find((x) => x.id === e), k = this.model.modules.flatMap((x) => (x.useCases ?? []).map((S) => ({ u: S, module: x }))).find(({ u: x }) => x.id === t), $ = this.model.modules.flatMap((x) => (x.readModels ?? []).map((S) => ({ rm: S, module: x }))).find(({ rm: x }) => x.id === t), O = this.model.modules.find((x) => x.id === t) ?? ($ == null ? void 0 : $.module) ?? (k == null ? void 0 : k.module);
      if (!I || !O) return;
      const A = new Set((this.model.aggregates ?? []).map((x) => x.id)), P = new Set(
        this.model.modules.flatMap((x) => (x.domainServices ?? []).map((S) => S.id))
      ), H = (this.model.emissions ?? []).find(
        (x) => x.domainEventId === e && (_ ? g.has(x.sourceId) : A.has(x.sourceId) || P.has(x.sourceId))
      );
      if (!H) {
        this.emit("modux-notice", {
          message: _ ? `Declara primero qué caso de uso publica ${I.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${I.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const X = !_ && A.has(H.sourceId);
      if (k) {
        if (this.model.flows.some(
          (S) => S.archetype === "TRIGGERS" && S.triggerEvent === I.name && S.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(I.name)}-${j(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: X ? H.sourceId : "",
          triggerDomainServiceId: !_ && !X ? H.sourceId : void 0,
          triggerUseCaseId: _ ? H.sourceId : void 0,
          triggerEvent: I.name,
          targetId: O.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const u = ($ == null ? void 0 : $.rm.name) ?? `${I.name}View`;
      if (this.model.flows.some(
        (x) => x.archetype === "MATERIALIZES" && x.triggerEvent === I.name && x.targetId === O.id && x.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${j(I.name)}-${j(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: X ? H.sourceId : "",
        triggerDomainServiceId: !_ && !X ? H.sourceId : void 0,
        triggerUseCaseId: _ ? H.sourceId : void 0,
        triggerEvent: I.name,
        targetId: O.id,
        readModelName: u
      });
      return;
    }
    const E = /* @__PURE__ */ new Set([
      ...h,
      ...g,
      ...y,
      ...this.model.modules.flatMap((_) => (_.readModels ?? []).map((I) => I.id))
    ]);
    if (E.has(e) || E.has(t) || f.has(t) || w.has(t))
      return;
    const L = new Set(this.model.externalSystems.map((_) => _.id));
    if (L.has(e)) {
      if (new Set(
        this.model.modules.flatMap((O) => (O.useCases ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (A) => A.externalSystemId === e && A.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (L.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const I = (this.model.apis ?? []).find(
        (O) => O.operations.some((A) => A.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), $ = I ? { operationId: t, siteId: I.id } : k ? { operationId: k[1], siteId: k[2] } : null;
      if ($) {
        (this.model.externalOperationUses ?? []).some(
          (A) => A.externalSystemId === e && A.operationId === $.operationId && A.siteId === $.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: $.operationId,
          targetSiteId: $.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((O) => O.id === t) || (this.model.proxyApis ?? []).some((O) => O.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (A) => A.sourceId === e && A.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    L.has(t) || r.has(t);
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
    if (this._view === "ui") {
      if (e === "edge") {
        let s;
        (s = /^pgbtn:(.+)->(.+)$/.exec(t)) ? this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] }) : (s = /^pglist:(.+)->(.+)$/.exec(t)) ? this.command({ kind: "set-page-listing", pageId: s[1], queryServiceId: null }) : (s = /^pgmodel:(.+)->(.+)$/.exec(t)) ? this.command({ kind: "set-page-model", pageId: s[1], modelId: null }) : (s = /^actorapp:(.+)->(.+)$/.exec(t)) ? this.command({ kind: "remove-actor-app", actorId: s[1], appId: s[2] }) : (s = /^menupage:menu:([^:]+):(.+)->.+$/.exec(t)) && this.command({ kind: "remove-menu-item", appId: s[1], label: s[2].split(">").pop() });
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
        const s = /^menu:([^:]+):(.+)$/.exec(t);
        s && this.command({ kind: "remove-menu-item", appId: s[1], label: s[2].split(">").pop() });
        return;
      }
      return;
    }
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
    const t = new Set(e.memberIds), i = (s, o, a = {}) => N`
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
    `, n = (s, o) => o.length ? N`<h4>${s}</h4>${o}` : "";
    return N`
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
    if (!e || !t.length) return;
    const i = `view-${j(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
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
    const t = e.detail.kind === "process-step" ? Ll(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Dl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
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
    var a;
    const t = (a = e.dataTransfer) == null ? void 0 : a.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
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
      (n.workflows ?? []).map((o) => o.id),
      (n.workflows ?? []).flatMap((o) => (o.steps ?? []).map((a) => a.id)),
      (n.uiApps ?? []).map((o) => o.id),
      (n.pages ?? []).map((o) => o.id)
    ])
      s.forEach((o) => i.add(o));
    for (let s = 1; ; s++) {
      const o = s === 1 ? e : `${e} ${s}`, a = `${t}${j(o)}`;
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
      const r = n.find((c) => (this.model.aggregates ?? []).some((p) => p.id === c));
      if (r) return r;
      const l = n.find((c) => this.model.modules.some((p) => p.id === c));
      return ((a = (this.model.aggregates ?? []).find((c) => c.moduleId === l)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (r) => this.model.modules.some((l) => (l.useCases ?? []).some((c) => c.id === r))
      ) ?? null;
    if (e === "api-operation") {
      for (const r of n) {
        if ((this.model.apis ?? []).some((p) => p.id === r)) return r;
        const l = /^apiimpl:(.+)@(.+)$/.exec(r);
        if (l && (this.model.apis ?? []).some((p) => p.id === l[1])) return l[1];
        const c = (this.model.proxyApis ?? []).find((p) => p.id === r);
        if (c != null && c.targetApiId) return c.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? n.find((r) => this.model.modules.some((l) => l.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var p, m, f;
    const n = V.PALETTE_NEW.find((h) => h.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), a = (h, w) => {
      const g = this.viewLayout(s), y = w ? o.nodes.find((E) => E.id === w) : void 0, v = y ? { x: Math.round(t.x - y.x), y: Math.round(t.y - y.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...g, nodes: { ...g.nodes, [h]: v } }), { kind: "move-node", view: s, id: h, pos: null };
    }, r = (h, w, g) => {
      const y = this.inverseOf(h) ?? [];
      this.command(h, !1);
      const v = a(w, g);
      this.pushUndoEntry([...y, v]);
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
      }, { id: w, name: g } = this.uniquePaletteName(n.label, h[e] ?? ""), y = e === "module" ? { kind: "add-module", id: w, name: g, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: w, name: g } : e === "external-system" ? { kind: "add-external-system", id: w, name: g } : e === "ai-agent" ? { kind: "add-ai-agent", id: w, name: g } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: w, name: g, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: w, name: g } : e === "rag" ? { kind: "add-rag", id: w, name: g } : e === "api" ? { kind: "add-api", id: w, name: g } : e === "proxy-api" ? { kind: "add-proxy-api", id: w, name: g } : e === "ui-app" ? { kind: "create-ui-app", id: w, name: g } : {
        kind: "add-workflow",
        id: w,
        name: g,
        completionEventName: `${g.replace(/\s+/g, "")}Completado`
      };
      r(y, w);
      return;
    }
    if (e === "page") {
      const { id: h, name: w } = this.uniquePaletteName("Página", "page-"), g = [];
      for (let v = i ?? void 0; v; )
        g.push(v), v = (p = o.nodes.find((E) => E.id === v)) == null ? void 0 : p.parentId;
      const y = g.find((v) => (this.model.uiApps ?? []).some((E) => E.id === v));
      if (y) {
        const v = o.nodes.find((E) => E.id === y);
        v && (t.x = v.x + v.w / 2 + 160, t.y = v.y - v.h / 2 + 40);
      }
      r(
        y ? { kind: "create-ui-page", id: h, name: w, pageType: "FORM", appId: y, menuLabel: w } : { kind: "create-ui-page", id: h, name: w, pageType: "FORM" },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const h = [];
      for (let y = i ?? void 0; y; )
        h.push(y), y = (m = o.nodes.find((v) => v.id === y)) == null ? void 0 : m.parentId;
      const w = h.find((y) => (this.model.uiApps ?? []).some((v) => v.id === y));
      if (!w) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const { name: g } = this.uniquePaletteName("Entrada", "");
      this.command({ kind: "add-menu-item", appId: w, label: g });
      return;
    }
    if (e === "workflow-step") {
      const h = this.model.workflows ?? [], w = [];
      for (let R = i ?? void 0; R; )
        w.push(R), R = (f = o.nodes.find((_) => _.id === R)) == null ? void 0 : f.parentId;
      const g = w.map((R) => h.find((_) => _.id === R)).find(Boolean), y = w.map((R) => {
        const _ = h.find((I) => (I.steps ?? []).some((k) => k.id === R));
        return _ ? { owner: _, stepId: R } : null;
      }).find(Boolean), v = g ?? (y == null ? void 0 : y.owner);
      if (!v) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: E, name: L } = this.uniquePaletteName("Paso", "wfs-");
      y && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: v.id,
          id: E,
          name: L,
          ...y ? { dependsOnStepIds: [y.stepId], afterStepId: y.stepId } : {}
        },
        E
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
      const { id: w, name: g } = this.uniquePaletteName("API", "api-"), y = { kind: "add-api", id: w, name: g }, v = this.inverseOf(y) ?? [];
      this.command(y, !1), this.model.externalSystems.some((_) => _.id === h) ? this.command({ kind: "set-api-publisher", id: w, targetId: h }, !1) : this.command({ kind: "add-api-implementation", apiId: w, moduleId: h }, !1);
      const E = this.viewLayout(this._view), L = this.sceneFor(this._view).nodes.find((_) => _.id === h), R = L ? { x: Math.round(t.x - L.x), y: Math.round(t.y - L.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...E, nodes: { ...E.nodes, [w]: R } }), this.pushUndoEntry([...v, { kind: "move-node", view: this._view, id: w, pos: null }]);
      return;
    }
    const l = this.dropContainerFor(e, i);
    if (!l) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: c } = this.uniquePaletteName(n.label, "");
    if (e === "aggregate") {
      const h = `agg-${j(c)}`;
      r({ kind: "add-aggregate", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "use-case" || e === "policy") {
      const h = `uc-${j(c)}`;
      r(
        { kind: "add-use-case", id: h, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        h,
        l
      );
    } else if (e === "domain-event") {
      const h = `ev-${j(c)}`;
      r({ kind: "add-domain-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "application-event") {
      const h = `aev-${j(c)}`;
      r({ kind: "add-application-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "domain-service") {
      const h = `ds-${j(c)}`;
      r({ kind: "add-domain-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "query-service") {
      const h = `qs-${j(c)}`;
      r({ kind: "add-query-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "read-model") {
      const h = `rm-${j(c)}`, w = (this.model.aggregates ?? []).find((g) => g.id === l);
      r({ kind: "add-read-model", id: h, name: c, aggregateId: l }, h, (w == null ? void 0 : w.moduleId) ?? l);
    } else if (e === "api-operation") {
      const h = (this.model.apis ?? []).find((E) => E.id === l), w = new Set(((h == null ? void 0 : h.operations) ?? []).map((E) => E.id));
      let g = c, y = `apiop-${l.replace(/^api-/, "")}-${j(g)}`;
      for (let E = 2; w.has(y); E++)
        g = `${n.label} ${E}`, y = `apiop-${l.replace(/^api-/, "")}-${j(g)}`;
      r({ kind: "add-api-operation", apiId: l, id: y, name: g }, y, l), o.nodes.some(
        (E) => E.parentId === l && (E.kind === "api-operation" || E.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(h == null ? void 0 : h.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const h = this.model.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === l), w = new Set((h == null ? void 0 : h.stepIds) ?? []);
      let g = c, y = `step-${j(g)}`;
      for (let v = 2; w.has(y); v++)
        g = `${n.label} ${v}`, y = `step-${j(g)}`;
      r({ kind: "add-use-case-step", useCaseId: l, id: y, name: g }, y, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(h == null ? void 0 : h.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const h = `xuc-${j(c)}`;
      r({ kind: "add-external-use-case", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "external-table") {
      const h = `tbl-${j(c)}`;
      r({ kind: "add-external-table", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "mcp-server") {
      const h = `mcpsrv-${j(c)}`;
      r({ kind: "add-mcp-server", id: h, name: c, moduleId: l }, h, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
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
    const l = this.viewLayout(o), c = r.parentId ? a.nodes.find((m) => m.id === r.parentId) : void 0, p = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: p } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = V.PALETTE_NEW.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(n.type) : this._view === "ui" ? ["ui-app", "page", "menu-item"].includes(n.type) : !["ui-app", "page", "menu-item"].includes(n.type)) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return N`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? N`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${t.map(
      (n) => N`
                    <div
                      class="palette-item ${n.child ? "palette-child" : ""}"
                      draggable="true"
                      title=${n.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : n.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                      @dragstart=${(s) => this.onPaletteDragStart(s, { new: n.type })}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                        ${et[n.symbol]}
                      </svg>
                      <span class="pal-label">${n.label}</span>
                    </div>
                  `
    )}
              ` : N`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => N`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (s) => N`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: s.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${et[n.symbol]}
                          </svg>
                          <span class="pal-label">${s.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : N`
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
    var t, i, n, s, o, a, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${j(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), p = this._newTriggerEvent.trim();
        if (!l || !c || !p) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: p,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${j(e)}`,
          name: e,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((r = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Js(i, t.nodes) : e === "flows" ? lo(i, t.nodes) : e === "processes" ? Ki(i, t.nodes) : e === "workflows" ? Il(i, t.nodes) : e === "ui" ? Sl(i, t.nodes) : e === "eventstorming" ? pl(i, t.nodes) : Gs(
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
  /** Screen space the overlays occupy on the left — fit() centers in what remains. */
  fitInsets() {
    const e = this._paletteOpen && ["context-map", "workflows", "ui"].includes(this._view), t = this._treeOpen && !!this._activeViewId;
    return t && e ? { left: 532 } : t ? { left: 280 } : e ? { left: 260 } : { left: 0 };
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), s = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, a = await Al(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    return N`
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
      (t) => N`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? N`
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
      (t) => N`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? N`
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
        ${this._view === "aggregates" || this._view === "processes" ? N`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return N`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? N`
              ${this._view === "flows" ? N`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => N`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return N`<option
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
              ${this._view === "flows" ? N`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return N`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? N`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => N`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? N`
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
      (t) => N`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? N`<input
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
              ${this.owningProcessOf(this._selectedId) ? N`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? N`
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
      (t) => N`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? N`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => N`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this._tilt ? N`
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
          ></modux-tilt>` : N`
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
        ${this._view === "context-map" ? N`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? N`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? N`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : N`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? N`
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
      ([t, i]) => N`
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
    return N`
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
    return N`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => N`
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
    return N`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Tl.map(
      (n) => N`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Oi[n].abbr}</span>
              <span class="name">${Oi[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
V.styles = ti`
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
V.PALETTE_NEW = [
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
  ce({ attribute: !1 })
], V.prototype, "model", 2);
B([
  ce({ attribute: !1 })
], V.prototype, "layout", 2);
B([
  ce({ attribute: !1 })
], V.prototype, "diff", 2);
B([
  T()
], V.prototype, "_view", 2);
B([
  T()
], V.prototype, "_detail", 2);
B([
  T()
], V.prototype, "_relationType", 2);
B([
  T()
], V.prototype, "_relationPicker", 2);
B([
  T()
], V.prototype, "_extDepPicker", 2);
B([
  T()
], V.prototype, "_selectedId", 2);
B([
  T()
], V.prototype, "_paletteOpen", 2);
B([
  T()
], V.prototype, "_paletteFilter", 2);
B([
  T()
], V.prototype, "_paletteTab", 2);
B([
  T()
], V.prototype, "_fullscreen", 2);
B([
  T()
], V.prototype, "_tilt", 2);
B([
  T()
], V.prototype, "_helpOpen", 2);
B([
  T()
], V.prototype, "_newName", 2);
B([
  T()
], V.prototype, "_newModuleId", 2);
B([
  T()
], V.prototype, "_newArchetype", 2);
B([
  T()
], V.prototype, "_newTriggerAggId", 2);
B([
  T()
], V.prototype, "_newTriggerEvent", 2);
B([
  T()
], V.prototype, "_newTargetId", 2);
B([
  T()
], V.prototype, "_undoStack", 2);
B([
  T()
], V.prototype, "_redoStack", 2);
B([
  T()
], V.prototype, "_newStepName", 2);
B([
  T()
], V.prototype, "_newStepType", 2);
B([
  T()
], V.prototype, "_newStepRole", 2);
B([
  T()
], V.prototype, "_newStepDeadline", 2);
B([
  T()
], V.prototype, "_editStepRole", 2);
B([
  T()
], V.prototype, "_editStepDeadline", 2);
B([
  T()
], V.prototype, "_editStepComp", 2);
B([
  T()
], V.prototype, "_newStepUseCase", 2);
B([
  T()
], V.prototype, "_newStepEmits", 2);
B([
  T()
], V.prototype, "_editStepUseCase", 2);
B([
  T()
], V.prototype, "_editStepEmits", 2);
B([
  T()
], V.prototype, "_editStepAwaits", 2);
B([
  T()
], V.prototype, "_multi", 2);
B([
  T()
], V.prototype, "_newViewName", 2);
B([
  T()
], V.prototype, "_activeViewId", 2);
B([
  T()
], V.prototype, "_newRagSourceType", 2);
B([
  T()
], V.prototype, "_newRagSourceUri", 2);
B([
  T()
], V.prototype, "_addMemberKey", 2);
B([
  T()
], V.prototype, "_treeOpen", 2);
B([
  T()
], V.prototype, "_deletePicker", 2);
V = B([
  ni("modux-editor")
], V);
var Ul = Object.defineProperty, zl = Object.getOwnPropertyDescriptor, ge = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? zl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Ul(t, i, s), s;
};
let re = class extends De {
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
    return N`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: s, mark: o, cls: a }) => {
      const r = this._diff.changes.filter((l) => l.kind === n);
      return r.length ? N`
            <div class="diff-group">${s} (${r.length})</div>
            ${r.map(
        (l) => N`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${o}</span>
                  <span class="diff-type">${t(l.type)}</span>
                  <span class="diff-name" title=${l.id}>${l.name ?? l.id}</span>
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
            const p = await l.json();
            p != null && p.message && (c = p.message);
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
          let p = `El servidor rechazó el contrato (${a.status})`;
          try {
            const m = await a.json();
            m != null && m.message && (p = m.message);
          } catch {
          }
          this.showToast(p);
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
    return this._error ? N`<div class="status error">modux editor: ${this._error}</div>` : this._model ? N`
      ${this._workspace ? N`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : N`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((s) => s.kind === n).length;
      return N`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? N`
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
      return N`
                      ${i === "EXPLORING" ? N`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? N`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? N`<button
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
      ${this._mergeFlow ? N`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => N`
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
      ${this._toast ? N`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : N`<div class="status">Cargando el modelo…</div>`;
  }
};
re.styles = ti`
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
  ce()
], re.prototype, "base", 2);
ge([
  T()
], re.prototype, "_model", 2);
ge([
  T()
], re.prototype, "_layout", 2);
ge([
  T()
], re.prototype, "_error", 2);
ge([
  T()
], re.prototype, "_saving", 2);
ge([
  T()
], re.prototype, "_toast", 2);
ge([
  T()
], re.prototype, "_workspace", 2);
ge([
  T()
], re.prototype, "_creatingSolution", 2);
ge([
  T()
], re.prototype, "_newSolutionName", 2);
ge([
  T()
], re.prototype, "_diff", 2);
ge([
  T()
], re.prototype, "_diffListOpen", 2);
ge([
  T()
], re.prototype, "_mergeFlow", 2);
re = ge([
  ni("modux-editor-connected")
], re);
export {
  ql as CONTAINER_HEADER,
  Fl as CONTAINER_INSET,
  ne as ModuxCanvas,
  V as ModuxEditor,
  re as ModuxEditorConnected,
  Js as aggregatesScene,
  Fe as apiImplNodeId,
  qe as apiOpOccurrenceId,
  xi as containerFit,
  Ds as containerMinSize,
  Gs as contextMapScene,
  Hs as flowCoherence,
  lo as flowsScene,
  Rt as normalizeViewLayout,
  Ki as processesScene,
  Vs as relationEdgeId,
  Ti as resolveOverlaps
};
