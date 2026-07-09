const Cl = 34, Ml = 10;
function Ni(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const l = e[r], c = e[a], p = i.get(l.id), h = i.get(c.id), m = h.x - p.x, f = h.y - p.y, g = (l.w + c.w) / 2 + t - Math.abs(m), x = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(g <= 0 || x <= 0))
          if (o = !0, g < x) {
            const v = (m >= 0 ? 1 : -1) * g / 2;
            p.x -= v, h.x += v;
          } else {
            const v = (f >= 0 ? 1 : -1) * x / 2;
            p.y -= v, h.y += v;
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
function Ns(e, t = { w: 160, h: 90 }) {
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
function vi(e, t, i) {
  let n = t.w / 2, s = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const a of i)
    n = Math.max(n, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (r - o) / 2,
    w: n + s,
    h: o + r
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
const Os = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ts = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Rs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ze = 168, Qe = 56;
function Fe(e, t) {
  return `apiimpl:${e}@${t}`;
}
function qe(e, t) {
  return `apiop:${e}@${t}`;
}
const Gi = { compact: 0, coarse: 1, full: 2 };
function Yi(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Gi[e ? t : n] > Gi[s] };
}
function Cn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Fe(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Mn = 34, Pn = 14, Ds = 14, xe = 108, Ie = 32, Nn = 12, On = 10, _t = 2, Ls = _t * xe + (_t - 1) * Nn + 2 * Pn;
function Us(e, t) {
  return `rel:${e}->${t}`;
}
function zs(e, t) {
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
const qs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Tn = {
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
}, xi = {
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
function Ii(e) {
  const t = Math.max(1, Math.ceil(e / _t)), i = t * Ie + (t - 1) * On;
  return { w: Ls, h: Mn + i + Ds };
}
function qt(e, t) {
  const i = e % _t, n = Math.floor(e / _t);
  return {
    x: -t.w / 2 + Pn + i * (xe + Nn) + xe / 2,
    y: -t.h / 2 + Mn + n * (Ie + On) + Ie / 2
  };
}
function Fs(e, t, i, n, s, o, r = !1) {
  const a = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Cn(e, t.id),
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
    return [{ ...n, x: i.x, y: i.y, w: Ze, h: Qe }];
  if (r) {
    const c = new Map((e.apis ?? []).map((h) => [h.id, h])), p = (e.apiImplementations ?? []).filter((h) => h.moduleId === t.id && c.has(h.apiId)).map((h) => {
      const m = c.get(h.apiId);
      return {
        id: Fe(h.apiId, h.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((f) => ({
          id: qe(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (p.length > 0) {
      const h = l.filter((m) => m.kind !== "api-impl");
      return Rn(i, n, p, h, s, o);
    }
  }
  return gt(i, n, l, s, o);
}
function Rn(e, t, i, n, s, o, r = /* @__PURE__ */ new Set()) {
  const a = o[t.id] ?? Ii(i.length + n.length), l = i.map((f, g) => {
    const x = s[f.id] ?? qt(g, a), v = r.has(f.id) ? [] : f.ops, b = o[f.id] ?? Ii(v.length), A = v.map((V, I) => s[V.id] ?? qt(I, b)), R = vi(
      { x: x.x, y: x.y },
      b,
      A.map((V) => ({ dx: V.x, dy: V.y, w: xe, h: Ie }))
    );
    return { a: f, off: x, ops: v, opOffs: A, fit: R };
  }), c = n.map(
    (f, g) => s[f.id] ?? qt(i.length + g, a)
  ), p = Ni(
    [
      ...l.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...n.map((f, g) => ({
        id: f.id,
        x: c[g].x,
        y: c[g].y,
        w: xe,
        h: Ie
      }))
    ],
    24
  );
  for (const f of l) {
    const g = p.get(f.a.id);
    g && (f.off = { x: f.off.x + (g.x - f.fit.x), y: f.off.y + (g.y - f.fit.y) }, f.fit = { ...f.fit, x: g.x, y: g.y });
  }
  n.forEach((f, g) => {
    const x = p.get(f.id);
    x && (c[g] = { x: x.x, y: x.y });
  });
  const h = vi(e, a, [
    ...l.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...c.map((f) => ({ dx: f.x, dy: f.y, w: xe, h: Ie }))
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
      collapsible: f.a.ops.length > 0 || r.has(f.a.id),
      collapsed: r.has(f.a.id),
      parentId: t.id,
      x: e.x + f.fit.x,
      y: e.y + f.fit.y,
      w: f.fit.w,
      h: f.fit.h,
      tooltip: f.a.tooltip
    }), f.ops.forEach((g, x) => {
      m.push({
        id: g.id,
        label: g.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[x].x,
        y: e.y + f.off.y + f.opOffs[x].y,
        w: xe,
        h: Ie,
        tooltip: `${xi[f.a.opKind]}: ${g.name}`
      });
    });
  return n.forEach((f, g) => {
    const x = Tn[f.kind];
    m.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + c[g].x,
      y: e.y + c[g].y,
      w: xe,
      h: Ie,
      symbol: x.symbol,
      fill: x.fill,
      stroke: x.stroke,
      parentId: t.id,
      tooltip: `${xi[f.kind]} ${f.name}`
    });
  }), m;
}
function gt(e, t, i, n, s) {
  const o = s[t.id] ?? Ii(i.length), r = i.map((h, m) => n[h.id] ?? qt(m, o)), a = Ni(
    i.map((h, m) => ({ id: h.id, x: r[m].x, y: r[m].y, w: xe, h: Ie })),
    10
  );
  i.forEach((h, m) => {
    const f = a.get(h.id);
    f && (r[m] = { x: f.x, y: f.y });
  });
  const l = vi(
    e,
    o,
    r.map((h) => ({ dx: h.x, dy: h.y, w: xe, h: Ie }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, p = i.map((h, m) => {
    const f = r[m], g = h.policy ? qs : Tn[h.kind];
    return {
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: xe,
      h: Ie,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${h.policy ? "Policy" : xi[h.kind]} ${h.name}`
    };
  });
  return [c, ...p];
}
function Vs(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, r = i !== "contexts", a = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), p = new Set(c.map((d) => d.id)), h = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), m = new Set(h.map((d) => d.id)), f = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !p.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !m.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], g = f.flatMap((d, S) => {
    const z = t[d.ref.id] ?? ut(S, f.length);
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
        x: z.x,
        y: z.y,
        w: Ze,
        h: Qe
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
      if (a && Y.targetApiId) {
        const Ae = (e.apis ?? []).find((Xe) => Xe.id === Y.targetApiId), Ce = (Ae == null ? void 0 : Ae.operations) ?? [];
        if (Ce.length > 0)
          return gt(
            z,
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
      return [{ ...ee, x: z.x, y: z.y, w: Ze, h: Qe }];
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
      return (s.has(Y.id) ? !r : r) && Y.operations.length > 0 ? gt(
        z,
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
        x: z.x,
        y: z.y,
        w: Ze,
        h: Qe
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
      }, Ae = c.filter((te) => te.publishedByExternalSystemId === Y.id), Ce = h.filter((te) => te.publishedByExternalSystemId === Y.id), Xe = Ce.map(
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
      ], ai = Ae.length > 0 || Ce.length > 0, di = ai || ri.length > 0, { form: Ot, collapsed: li } = Yi(
        s.has(Y.id),
        r ? "full" : ai ? "coarse" : "compact",
        ri.length > 0 || a && ai
      ), Bi = [
        ...Xe,
        ...Ot === "full" ? ri : []
      ], ci = a && Ot === "full" ? Ce.filter((te) => {
        const lt = te.targetApiId ? (e.apis ?? []).find((de) => de.id === te.targetApiId) : void 0;
        return ((lt == null ? void 0 : lt.operations) ?? []).length > 0;
      }) : [];
      if (a && Ot === "full" && (Ae.length > 0 || ci.length > 0)) {
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
          ...ci.map((de) => {
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
        ], lt = new Set(ci.map((de) => de.id));
        return Rn(
          z,
          { ...ee, collapsible: !0, collapsed: li },
          te,
          Bi.filter((de) => !lt.has(de.id)),
          t,
          n,
          o
        );
      }
      const Wi = Ot === "compact" ? [] : [
        ...Ae.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Bi
      ];
      return Wi.length > 0 ? gt(
        z,
        { ...ee, collapsible: di, collapsed: li },
        Wi,
        t,
        n
      ) : [{
        ...ee,
        collapsible: di,
        collapsed: di && li,
        x: z.x,
        y: z.y,
        w: Ze,
        h: Qe
      }];
    }
    const G = d.ref, Z = G.subdomainType ?? "GENERIC", se = {
      id: G.id,
      label: G.name,
      kind: "module",
      symbol: "component",
      fill: Os[Z],
      stroke: "#94a3b8",
      badge: Z,
      tooltip: `${G.name} — subdominio ${Z}`
    }, ye = Cn(e, G.id), at = (e.aggregates ?? []).some((Y) => Y.moduleId === G.id) || (G.useCases ?? []).length > 0 || (G.domainEvents ?? []).length > 0 || (G.applicationEvents ?? []).length > 0 || (G.readModels ?? []).length > 0 || (G.domainServices ?? []).length > 0 || (G.queryServices ?? []).length > 0, Le = at || ye.length > 0, { form: dt, collapsed: je } = Yi(
      s.has(G.id),
      r ? "full" : ye.length > 0 ? "coarse" : "compact",
      at
    );
    return dt === "full" && Le ? Fs(
      e,
      G,
      z,
      { ...se, collapsible: !0, collapsed: je },
      t,
      n,
      a
    ) : dt === "coarse" && ye.length > 0 ? gt(
      z,
      { ...se, collapsible: Le, collapsed: je },
      ye,
      t,
      n
    ) : [{
      ...se,
      collapsible: Le,
      collapsed: Le && je,
      x: z.x,
      y: z.y,
      w: Ze,
      h: Qe
    }];
  }), x = f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, S) => {
    const z = t[d.id] ?? ut(f.length + S, x);
    g.push({
      id: d.id,
      label: d.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${d.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((d, S) => {
    const z = t[d.id] ?? ut(f.length + (e.actors ?? []).length + S, x);
    g.push({
      id: d.id,
      label: d.name,
      x: z.x,
      y: z.y,
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
  }), (e.mcpGateways ?? []).forEach((d, S) => {
    const z = t[d.id] ?? ut(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + S,
      x
    );
    g.push({
      id: d.id,
      label: d.name,
      x: z.x,
      y: z.y,
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
  const v = [];
  (e.rags ?? []).forEach((d, S) => {
    const z = t[d.id] ?? ut(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + S,
      x
    );
    g.push({
      id: d.id,
      label: d.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((G, Z) => {
      const se = `ragcs:${d.id}:${G.uri}`, ye = t[se] ?? { x: z.x + 170, y: z.y - 30 + Z * 44 };
      g.push({
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
      }), v.push({
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
  }), g.sort((d, S) => (d.parentId ? 1 : 0) - (S.parentId ? 1 : 0));
  const b = e.relations.map((d) => ({
    id: Us(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Ts[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), A = e.flows.map((d) => {
    var ye, at, Le, dt, je, Y;
    const S = zs(e, d), z = r ? e.modules.find((ee) => ee.id === d.sourceId) : void 0, G = ((ye = z == null ? void 0 : z.domainEvents) == null ? void 0 : ye.find((ee) => ee.name === d.triggerEvent)) ?? ((at = z == null ? void 0 : z.applicationEvents) == null ? void 0 : at.find((ee) => ee.name === d.triggerEvent)), Z = r && d.readModelName ? (dt = (Le = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Le.readModels) == null ? void 0 : dt.find((ee) => ee.name === d.readModelName) : void 0, se = r && d.targetUseCaseId ? (Y = (je = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : je.useCases) == null ? void 0 : Y.find((ee) => ee.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (G == null ? void 0 : G.id) ?? d.sourceId,
      targetId: (se == null ? void 0 : se.id) ?? (Z == null ? void 0 : Z.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Rs[S],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${S}`
    };
  }), R = new Map((e.apis ?? []).map((d) => [d.id, d])), V = new Set(e.modules.map((d) => d.id)), I = (e.apiImplementations ?? []).filter(
    (d) => R.has(d.apiId) && V.has(d.moduleId)
  ), y = new Set(g.map((d) => d.id)), k = r ? (e.emissions ?? []).filter((d) => y.has(d.sourceId) && y.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], $ = r ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: S }) => S && d.readModelId).filter(({ p: d, source: S }) => y.has(S) && y.has(d.readModelId)).map(({ p: d, source: S }) => ({
    id: `proj:${d.id}`,
    sourceId: S,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((S) => {
      const z = r && S.targetUseCaseId && y.has(S.targetUseCaseId) ? S.targetUseCaseId : S.targetModuleId && y.has(S.targetModuleId) ? S.targetModuleId : (S.targetUseCaseId && !r, null);
      if (!z) return [];
      const G = r && y.has(S.id) ? S.id : d.id;
      return y.has(G) ? [
        {
          id: `apiwire:${S.id}`,
          sourceId: G,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${S.name} la implementa ${z}`
        }
      ] : [];
    })
  ), C = r ? (e.useCaseCalls ?? []).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], O = r ? (e.aggregateCalls ?? []).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], B = r ? (e.queryCalls ?? []).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], K = r ? (e.actorUses ?? []).filter((d) => y.has(d.actorId) && y.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], u = (e.actorExternalDependencies ?? []).filter((d) => y.has(d.actorId) && y.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), _ = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), w = (d) => y.has(d) ? d : _.get(d) ?? d, E = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: w(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => y.has(d.sourceId) && y.has(d.targetId) && d.sourceId !== d.targetId
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
  ], T = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const S of d.useCases ?? []) T.set(S.id, d.id);
    for (const S of d.domainEvents ?? []) T.set(S.id, d.id);
    for (const S of d.applicationEvents ?? []) T.set(S.id, d.id);
  }
  const U = (d) => y.has(d) ? d : T.get(d) ?? d, M = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const S of d.domainEvents ?? []) M.set(S.name, S.id);
    for (const S of d.applicationEvents ?? []) M.set(S.name, S.id);
  }
  const L = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((S) => S.targetUseCaseId).map((S) => ({ sourceId: d.id, targetId: U(S.targetUseCaseId) }))
      ).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && M.has(d.triggerEvent)).map((d) => ({
        sourceId: U(M.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
  ], Q = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const S of d.tables ?? []) Q.set(S.id, d.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((S) => ({
          sourceId: y.has(S) ? S : Q.get(S) ?? S,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
        (d) => (d.sourceApiIds ?? []).map((S) => ({
          sourceId: w(S),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
        ...(d.sourceExternalSystemIds ?? []).map((S) => ({ sourceId: S, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((S) => ({ sourceId: S, targetId: d.id, name: d.name }))
      ]).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: w(d.apiId) })).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => [
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
  ], ve = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, rt = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((S) => S.id !== d.id && ve(S) === d.triggerEvent).filter((S) => y.has(S.id) && y.has(d.id)).map((S) => ({
      id: `wfchain:${S.id}->${d.id}`,
      sourceId: S.id,
      targetId: d.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: d.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), hs = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: w(d.id), targetId: w(d.targetApiId) })).filter(
        (d) => y.has(d.sourceId) && y.has(d.targetId) && d.sourceId !== d.targetId
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
  ], ms = I.flatMap((d) => {
    const S = Fe(d.apiId, d.moduleId);
    if (!y.has(S)) return [];
    const z = [];
    for (const G of (e.proxyApis ?? []).filter((Z) => Z.targetApiId === d.apiId)) {
      const Z = w(G.id);
      y.has(Z) && Z !== S && z.push({
        id: `pxr:${Z}->${S}`,
        sourceId: Z,
        targetId: S,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return z;
  }), fs = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const S = (e.proxyApis ?? []).find((Z) => Z.id === d.proxyId);
    if (!(S != null && S.targetApiId)) return [];
    const z = qe(d.operationId, d.proxyId), G = d.targetSiteId === S.targetApiId ? S.targetApiId : Fe(S.targetApiId, d.targetSiteId);
    return !y.has(z) || !y.has(G) ? [] : [{
      id: `oproute:${z}->${G}`,
      sourceId: z,
      targetId: G,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), gs = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!y.has(d.externalSystemId)) return null;
        const S = (e.apis ?? []).find(
          (se) => se.operations.some((ye) => ye.id === d.operationId)
        );
        if (!S) return null;
        const z = d.siteId === S.id, G = z ? d.operationId : qe(d.operationId, d.siteId);
        let Z = y.has(G) ? G : null;
        if (!Z)
          if (z || (e.proxyApis ?? []).some((se) => se.id === d.siteId))
            Z = w(d.siteId);
          else {
            const se = Fe(S.id, d.siteId);
            Z = y.has(se) ? se : d.siteId;
          }
        return !Z || !y.has(Z) || Z === d.externalSystemId ? null : { u: d, target: Z };
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
  ], ys = r ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!y.has(d.useCaseId)) return [];
    const S = y.has(qe(d.operationId, d.moduleId)) ? qe(d.operationId, d.moduleId) : y.has(Fe(d.apiId, d.moduleId)) ? Fe(d.apiId, d.moduleId) : y.has(w(d.moduleId)) ? w(d.moduleId) : null;
    return S ? [{
      id: `apiimplwire:${d.operationId}@${d.moduleId}`,
      sourceId: S,
      targetId: d.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], ws = r ? (e.agentUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], vs = (e.agentRags ?? []).filter((d) => y.has(d.agentId) && y.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), xs = r ? (e.rags ?? []).filter((d) => y.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((S) => y.has(S)).map((S) => ({
      id: `ragsrc:${d.id}->${S}`,
      sourceId: d.id,
      targetId: S,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], Is = r ? (e.agentExternalUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], _s = r ? (e.agentMcpUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], bs = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((S) => y.has(d.id) && y.has(S)).map((S) => ({
      id: `gwx:${d.id}->${S}`,
      sourceId: d.id,
      targetId: S,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ks = (e.agentGatewayUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), $s = r ? (e.agentApiOpUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Es = r ? (e.agentQueryUses ?? []).filter((d) => y.has(d.agentId) && y.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ss = (e.agentDelegations ?? []).filter((d) => y.has(d.agentId) && y.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), As = (e.actorAgentUses ?? []).filter((d) => y.has(d.actorId) && y.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Cs = r ? (e.agentTriggers ?? []).filter((d) => y.has(d.eventId) && y.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ms = r ? (e.externalCalls ?? []).filter((d) => y.has(d.externalSystemId) && y.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Ps = r ? (e.externalUseCaseCalls ?? []).filter((d) => y.has(d.sourceId) && y.has(d.targetId)).map((d) => ({
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
    nodes: g,
    edges: [
      ...b,
      ...A,
      ...k,
      ...$,
      ...D,
      ...C,
      ...O,
      ...B,
      ...K,
      ...u,
      ...E,
      ...hs,
      ...ms,
      ...fs,
      ...gs,
      ...ys,
      ...L,
      ...X,
      ...rt,
      ...pe,
      ...J,
      ...ue,
      ...we,
      ...ws,
      ...Is,
      ..._s,
      ...bs,
      ...ks,
      ...$s,
      ...Es,
      ...Ss,
      ...As,
      ...Cs,
      ...vs,
      ...xs,
      ...v,
      ...Ms,
      ...Ps
    ]
  };
}
const Hs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Bs = 176, Ws = 60, Gs = 140, Ys = 40;
function js(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const p = n.filter((m) => m.aggregateId === l.id).length, h = 140 + c * (170 + p * 60);
      t[l.id] = { x: r, y: h }, n.filter((m) => m.aggregateId === l.id).forEach((m, f) => {
        t[m.id] = { x: r + 60, y: h + 100 + f * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Xs(e, t) {
  const i = js(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const p = s.get(c.moduleId), h = (p == null ? void 0 : p.subdomainType) ?? "GENERIC", m = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: m.x,
      y: m.y,
      w: Bs,
      h: Ws,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Hs[h],
      stroke: "#64748b",
      badge: p ? `${p.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${p ? ` — módulo ${p.name} (${h})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: Gs,
      h: Ys,
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
    nodes: [...o, ...r],
    edges: [...a, ...l]
  };
}
const Ks = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Zs = 150, Qs = 44, Js = 190, eo = 56, to = 160, io = 48;
function no(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function so(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((p) => p.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, l) => {
    const c = 120 + l * 130, p = Ks[a.archetype] ?? "#475569", h = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const v = t[h] ?? { x: 160, y: c };
      n.push({
        id: h,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : h,
        x: v.x,
        y: v.y,
        w: Zs,
        h: Qs,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${a.id}`, f = t[m] ?? { x: 470, y: c };
    n.push({
      id: m,
      label: a.name,
      x: f.x,
      y: f.y,
      w: Js,
      h: eo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: p,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const g = no(e, a), x = `tgt:${g.id}`;
    if (!o.has(x)) {
      o.add(x);
      const v = t[x] ?? { x: 790, y: c };
      n.push({
        id: x,
        label: g.label,
        x: v.x,
        y: v.y,
        w: to,
        h: io,
        kind: g.external ? "external-system" : "module",
        symbol: "component",
        fill: g.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: g.external,
        badge: g.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: h,
      targetId: m,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: m,
      targetId: x,
      kind: "flow-delivery",
      color: p,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const oo = 190, ro = 56, ui = 170, ao = 52;
function ji(e, t) {
  const i = [], n = [], s = (o) => {
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
      w: oo,
      h: ro,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((p, h) => {
      const m = p.type === "HUMAN", f = t[p.id] ?? { x: 150 + (h + 1) * 240, y: a };
      if (i.push({
        id: p.id,
        label: p.name,
        x: f.x,
        y: f.y,
        w: ui,
        h: ao,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${p.roleId ? ` · ${p.roleId}` : ""}${p.deadline ? ` · ⏱ ${p.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${p.name}${p.useCaseId ? ` — use case ${p.useCaseId}` : ""}${p.deadline ? ` · deadline ${p.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${h}`,
        sourceId: c,
        targetId: p.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), p.compensationUseCaseId) {
        const g = `comp:${p.id}`, x = t[g] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: g,
          label: p.compensationUseCaseId,
          x: x.x,
          y: x.y,
          w: ui,
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
      c = p.id;
    }), o.onCompletionEventName) {
      const p = `done:${o.id}`, h = t[p] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: p,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: ui,
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
const Ft = globalThis, Oi = Ft.ShadowRoot && (Ft.ShadyCSS === void 0 || Ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ti = Symbol(), Xi = /* @__PURE__ */ new WeakMap();
let Dn = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Ti) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Oi && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Xi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Xi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lo = (e) => new Dn(typeof e == "string" ? e : e + "", void 0, Ti), ei = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Dn(i, e, Ti);
}, co = (e, t) => {
  if (Oi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = Ft.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Ki = Oi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return lo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: uo, defineProperty: po, getOwnPropertyDescriptor: ho, getOwnPropertyNames: mo, getOwnPropertySymbols: fo, getPrototypeOf: go } = Object, Re = globalThis, Zi = Re.trustedTypes, yo = Zi ? Zi.emptyScript : "", pi = Re.reactiveElementPolyfillSupport, vt = (e, t) => e, Gt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yo : null;
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
} }, Ri = (e, t) => !uo(e, t), Qi = { attribute: !0, type: String, converter: Gt, reflect: !1, useDefault: !1, hasChanged: Ri };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Re.litPropertyMetadata ?? (Re.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Je = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Qi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && po(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = ho(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Qi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = go(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const i = this.properties, n = [...mo(i), ...fo(i)];
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
      for (const s of n) i.unshift(Ki(s));
    } else t !== void 0 && i.push(Ki(t));
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
    return co(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Gt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Gt;
      this._$Em = s;
      const c = l.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? Ri)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: a } = r, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
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
Je.elementStyles = [], Je.shadowRootOptions = { mode: "open" }, Je[vt("elementProperties")] = /* @__PURE__ */ new Map(), Je[vt("finalized")] = /* @__PURE__ */ new Map(), pi == null || pi({ ReactiveElement: Je }), (Re.reactiveElementVersions ?? (Re.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, Ji = (e) => e, Yt = xt.trustedTypes, en = Yt ? Yt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ln = "$lit$", Te = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + Te, wo = `<${Un}>`, Ge = document, bt = () => Ge.createComment(""), kt = (e) => e === null || typeof e != "object" && typeof e != "function", Di = Array.isArray, vo = (e) => Di(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", hi = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tn = /-->/g, nn = />/g, Ue = RegExp(`>|${hi}(?:([^\\s"'>=/]+)(${hi}*=${hi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), sn = /'/g, on = /"/g, zn = /^(?:script|style|textarea|title)$/i, qn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), P = qn(1), W = qn(2), it = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), rn = /* @__PURE__ */ new WeakMap(), Ve = Ge.createTreeWalker(Ge, 129);
function Fn(e, t) {
  if (!Di(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return en !== void 0 ? en.createHTML(t) : t;
}
const xo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = pt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, p, h = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, p = r.exec(l), p !== null); ) m = r.lastIndex, r === pt ? p[1] === "!--" ? r = tn : p[1] !== void 0 ? r = nn : p[2] !== void 0 ? (zn.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = Ue) : p[3] !== void 0 && (r = Ue) : r === Ue ? p[0] === ">" ? (r = s ?? pt, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? Ue : p[3] === '"' ? on : sn) : r === on || r === sn ? r = Ue : r === tn || r === nn ? r = pt : (r = Ue, s = void 0);
    const f = r === Ue && e[a + 1].startsWith("/>") ? " " : "";
    o += r === pt ? l + wo : h >= 0 ? (n.push(c), l.slice(0, h) + Ln + l.slice(h) + Te + f) : l + Te + (h === -2 ? a : f);
  }
  return [Fn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class $t {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = xo(t, i);
    if (this.el = $t.createElement(c, n), Ve.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = Ve.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ln)) {
          const m = p[r++], f = s.getAttribute(h).split(Te), g = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: o, name: g[2], strings: f, ctor: g[1] === "." ? _o : g[1] === "?" ? bo : g[1] === "@" ? ko : ti }), s.removeAttribute(h);
        } else h.startsWith(Te) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (zn.test(s.tagName)) {
          const h = s.textContent.split(Te), m = h.length - 1;
          if (m > 0) {
            s.textContent = Yt ? Yt.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(h[f], bt()), Ve.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[m], bt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Un) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(Te, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Te.length - 1;
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
  var r, a;
  if (t === it) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = kt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = nt(e, s._$AS(e, t.values), s, n)), t;
}
class Io {
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
    let o = Ve.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Mt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new $o(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = Ve.nextNode(), r++);
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
    t = nt(this, t, i), kt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== it && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vo(t) ? this.k(t) : this._(t);
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
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = $t.createElement(Fn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new Io(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = rn.get(t.strings);
    return i === void 0 && rn.set(t.strings, i = new $t(t)), i;
  }
  k(t) {
    Di(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new Mt(this.O(bt()), this.O(bt()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = Ji(t).nextSibling;
      Ji(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class ti {
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
    let r = !1;
    if (o === void 0) t = nt(this, t, i, 0), r = !kt(t) || t !== this._$AH && t !== it, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = nt(this, a[n + l], i, l), c === it && (c = this._$AH[l]), r || (r = !kt(c) || c !== this._$AH[l]), c === oe ? t = oe : t !== oe && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === oe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _o extends ti {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === oe ? void 0 : t;
  }
}
class bo extends ti {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== oe);
  }
}
class ko extends ti {
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
class $o {
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
const mi = xt.litHtmlPolyfillSupport;
mi == null || mi($t, Mt), (xt.litHtmlVersions ?? (xt.litHtmlVersions = [])).push("3.3.3");
const Eo = (e, t, i) => {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Eo(i, this.renderRoot, this.renderOptions);
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
var An;
De._$litElement$ = !0, De.finalized = !0, (An = Be.litElementHydrateSupport) == null || An.call(Be, { LitElement: De });
const fi = Be.litElementPolyfillSupport;
fi == null || fi({ LitElement: De });
(Be.litElementVersions ?? (Be.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const So = { attribute: !0, type: String, converter: Gt, reflect: !1, hasChanged: Ri }, Ao = (e = So, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function ce(e) {
  return (t, i) => typeof i == "object" ? Ao(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(e) {
  return ce({ ...e, state: !0, attribute: !1 });
}
var _i = "http://www.w3.org/1999/xhtml";
const an = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: _i,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ni(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), an.hasOwnProperty(t) ? { space: an[t], local: e } : e;
}
function Co(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === _i && t.documentElement.namespaceURI === _i ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Mo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Vn(e) {
  var t = ni(e);
  return (t.local ? Mo : Co)(t);
}
function Po() {
}
function Li(e) {
  return e == null ? Po : function() {
    return this.querySelector(e);
  };
}
function No(e) {
  typeof e != "function" && (e = Li(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), l, c, p = 0; p < r; ++p)
      (l = o[p]) && (c = e.call(l, l.__data__, p, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[p] = c);
  return new me(n, this._parents);
}
function Oo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function To() {
  return [];
}
function Hn(e) {
  return e == null ? To : function() {
    return this.querySelectorAll(e);
  };
}
function Ro(e) {
  return function() {
    return Oo(e.apply(this, arguments));
  };
}
function Do(e) {
  typeof e == "function" ? e = Ro(e) : e = Hn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && (n.push(e.call(l, l.__data__, c, r)), s.push(l));
  return new me(n, s);
}
function Bn(e) {
  return function() {
    return this.matches(e);
  };
}
function Wn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Lo = Array.prototype.find;
function Uo(e) {
  return function() {
    return Lo.call(this.children, e);
  };
}
function zo() {
  return this.firstElementChild;
}
function qo(e) {
  return this.select(e == null ? zo : Uo(typeof e == "function" ? e : Wn(e)));
}
var Fo = Array.prototype.filter;
function Vo() {
  return Array.from(this.children);
}
function Ho(e) {
  return function() {
    return Fo.call(this.children, e);
  };
}
function Bo(e) {
  return this.selectAll(e == null ? Vo : Ho(typeof e == "function" ? e : Wn(e)));
}
function Wo(e) {
  typeof e != "function" && (e = Bn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new me(n, this._parents);
}
function Gn(e) {
  return new Array(e.length);
}
function Go() {
  return new me(this._enter || this._groups.map(Gn), this._parents);
}
function jt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
jt.prototype = {
  constructor: jt,
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
function Yo(e) {
  return function() {
    return e;
  };
}
function jo(e, t, i, n, s, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new jt(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (s[r] = a);
}
function Xo(e, t, i, n, s, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), p = t.length, h = o.length, m = new Array(p), f;
  for (a = 0; a < p; ++a)
    (l = t[a]) && (m[a] = f = r.call(l, l.__data__, a, t) + "", c.has(f) ? s[a] = l : c.set(f, l));
  for (a = 0; a < h; ++a)
    f = r.call(e, o[a], a, o) + "", (l = c.get(f)) ? (n[a] = l, l.__data__ = o[a], c.delete(f)) : i[a] = new jt(e, o[a]);
  for (a = 0; a < p; ++a)
    (l = t[a]) && c.get(m[a]) === l && (s[a] = l);
}
function Ko(e) {
  return e.__data__;
}
function Zo(e, t) {
  if (!arguments.length) return Array.from(this, Ko);
  var i = t ? Xo : jo, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Yo(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var p = n[c], h = s[c], m = h.length, f = Qo(e.call(p, p && p.__data__, c, n)), g = f.length, x = a[c] = new Array(g), v = r[c] = new Array(g), b = l[c] = new Array(m);
    i(p, h, x, v, b, f, t);
    for (var A = 0, R = 0, V, I; A < g; ++A)
      if (V = x[A]) {
        for (A >= R && (R = A + 1); !(I = v[R]) && ++R < g; ) ;
        V._next = I || null;
      }
  }
  return r = new me(r, n), r._enter = a, r._exit = l, r;
}
function Qo(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Jo() {
  return new me(this._exit || this._groups.map(Gn), this._parents);
}
function er(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function tr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), l = 0; l < r; ++l)
    for (var c = i[l], p = n[l], h = c.length, m = a[l] = new Array(h), f, g = 0; g < h; ++g)
      (f = c[g] || p[g]) && (m[g] = f);
  for (; l < s; ++l)
    a[l] = i[l];
  return new me(a, this._parents);
}
function ir() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function nr(e) {
  e || (e = sr);
  function t(h, m) {
    return h && m ? e(h.__data__, m.__data__) : !h - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, l = s[o] = new Array(a), c, p = 0; p < a; ++p)
      (c = r[p]) && (l[p] = c);
    l.sort(t);
  }
  return new me(s, this._parents).order();
}
function sr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function or() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function rr() {
  return Array.from(this);
}
function ar() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function dr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function lr() {
  return !this.node();
}
function cr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function ur(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function hr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function mr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function fr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function gr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function yr(e, t) {
  var i = ni(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? pr : ur : typeof t == "function" ? i.local ? gr : fr : i.local ? mr : hr)(i, t));
}
function Yn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function wr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function vr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function xr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Ir(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? wr : typeof t == "function" ? xr : vr)(e, t, i ?? "")) : st(this.node(), e);
}
function st(e, t) {
  return e.style.getPropertyValue(t) || Yn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function _r(e) {
  return function() {
    delete this[e];
  };
}
function br(e, t) {
  return function() {
    this[e] = t;
  };
}
function kr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function $r(e, t) {
  return arguments.length > 1 ? this.each((t == null ? _r : typeof t == "function" ? kr : br)(e, t)) : this.node()[e];
}
function jn(e) {
  return e.trim().split(/^|\s+/);
}
function Ui(e) {
  return e.classList || new Xn(e);
}
function Xn(e) {
  this._node = e, this._names = jn(e.getAttribute("class") || "");
}
Xn.prototype = {
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
function Kn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function Zn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Er(e) {
  return function() {
    Kn(this, e);
  };
}
function Sr(e) {
  return function() {
    Zn(this, e);
  };
}
function Ar(e, t) {
  return function() {
    (t.apply(this, arguments) ? Kn : Zn)(this, e);
  };
}
function Cr(e, t) {
  var i = jn(e + "");
  if (arguments.length < 2) {
    for (var n = Ui(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ar : t ? Er : Sr)(i, t));
}
function Mr() {
  this.textContent = "";
}
function Pr(e) {
  return function() {
    this.textContent = e;
  };
}
function Nr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Or(e) {
  return arguments.length ? this.each(e == null ? Mr : (typeof e == "function" ? Nr : Pr)(e)) : this.node().textContent;
}
function Tr() {
  this.innerHTML = "";
}
function Rr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Dr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Lr(e) {
  return arguments.length ? this.each(e == null ? Tr : (typeof e == "function" ? Dr : Rr)(e)) : this.node().innerHTML;
}
function Ur() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function zr() {
  return this.each(Ur);
}
function qr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fr() {
  return this.each(qr);
}
function Vr(e) {
  var t = typeof e == "function" ? e : Vn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Hr() {
  return null;
}
function Br(e, t) {
  var i = typeof e == "function" ? e : Vn(e), n = t == null ? Hr : typeof t == "function" ? t : Li(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Wr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Gr() {
  return this.each(Wr);
}
function Yr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function jr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Xr(e) {
  return this.select(e ? jr : Yr);
}
function Kr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Zr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Qr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Jr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function ea(e, t, i) {
  return function() {
    var n = this.__on, s, o = Zr(t);
    if (n) {
      for (var r = 0, a = n.length; r < a; ++r)
        if ((s = n[r]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), s = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function ta(e, t, i) {
  var n = Qr(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, p; l < c; ++l)
        for (s = 0, p = a[l]; s < o; ++s)
          if ((r = n[s]).type === p.type && r.name === p.name)
            return p.value;
    }
    return;
  }
  for (a = t ? ea : Jr, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function Qn(e, t, i) {
  var n = Yn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function ia(e, t) {
  return function() {
    return Qn(this, e, t);
  };
}
function na(e, t) {
  return function() {
    return Qn(this, e, t.apply(this, arguments));
  };
}
function sa(e, t) {
  return this.each((typeof t == "function" ? na : ia)(e, t));
}
function* oa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var Jn = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function Pt() {
  return new me([[document.documentElement]], Jn);
}
function ra() {
  return this;
}
me.prototype = Pt.prototype = {
  constructor: me,
  select: No,
  selectAll: Do,
  selectChild: qo,
  selectChildren: Bo,
  filter: Wo,
  data: Zo,
  enter: Go,
  exit: Jo,
  join: er,
  merge: tr,
  selection: ra,
  order: ir,
  sort: nr,
  call: or,
  nodes: rr,
  node: ar,
  size: dr,
  empty: lr,
  each: cr,
  attr: yr,
  style: Ir,
  property: $r,
  classed: Cr,
  text: Or,
  html: Lr,
  raise: zr,
  lower: Fr,
  append: Vr,
  insert: Br,
  remove: Gr,
  clone: Xr,
  datum: Kr,
  on: ta,
  dispatch: sa,
  [Symbol.iterator]: oa
};
function _e(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], Jn);
}
function aa(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ze(e, t) {
  if (e = aa(e), t === void 0 && (t = e.currentTarget), t) {
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
var da = { value: () => {
} };
function zi() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Vt(i);
}
function Vt(e) {
  this._ = e;
}
function la(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Vt.prototype = zi.prototype = {
  constructor: Vt,
  on: function(e, t) {
    var i = this._, n = la(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = ca(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = dn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = dn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Vt(e);
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
function ca(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function dn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = da, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const bi = { capture: !0, passive: !1 };
function ki(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ua(e) {
  var t = e.document.documentElement, i = _e(e).on("dragstart.drag", ki, bi);
  "onselectstart" in t ? i.on("selectstart.drag", ki, bi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function pa(e, t) {
  var i = e.document.documentElement, n = _e(e).on("dragstart.drag", null);
  t && (n.on("click.drag", ki, bi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function qi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function es(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Nt() {
}
var Et = 0.7, Xt = 1 / Et, tt = "\\s*([+-]?\\d+)\\s*", St = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ha = /^#([0-9a-f]{3,8})$/, ma = new RegExp(`^rgb\\(${tt},${tt},${tt}\\)$`), fa = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), ga = new RegExp(`^rgba\\(${tt},${tt},${tt},${St}\\)$`), ya = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${St}\\)$`), wa = new RegExp(`^hsl\\(${St},${Ee},${Ee}\\)$`), va = new RegExp(`^hsla\\(${St},${Ee},${Ee},${St}\\)$`), ln = {
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
qi(Nt, At, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: cn,
  // Deprecated! Use color.formatHex.
  formatHex: cn,
  formatHex8: xa,
  formatHsl: Ia,
  formatRgb: un,
  toString: un
});
function cn() {
  return this.rgb().formatHex();
}
function xa() {
  return this.rgb().formatHex8();
}
function Ia() {
  return ts(this).formatHsl();
}
function un() {
  return this.rgb().formatRgb();
}
function At(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = ha.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? pn(t) : i === 3 ? new le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Dt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Dt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ma.exec(e)) ? new le(t[1], t[2], t[3], 1) : (t = fa.exec(e)) ? new le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ga.exec(e)) ? Dt(t[1], t[2], t[3], t[4]) : (t = ya.exec(e)) ? Dt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = wa.exec(e)) ? fn(t[1], t[2] / 100, t[3] / 100, 1) : (t = va.exec(e)) ? fn(t[1], t[2] / 100, t[3] / 100, t[4]) : ln.hasOwnProperty(e) ? pn(ln[e]) : e === "transparent" ? new le(NaN, NaN, NaN, 0) : null;
}
function pn(e) {
  return new le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Dt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new le(e, t, i, n);
}
function _a(e) {
  return e instanceof Nt || (e = At(e)), e ? (e = e.rgb(), new le(e.r, e.g, e.b, e.opacity)) : new le();
}
function $i(e, t, i, n) {
  return arguments.length === 1 ? _a(e) : new le(e, t, i, n ?? 1);
}
function le(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
qi(le, $i, es(Nt, {
  brighter(e) {
    return e = e == null ? Xt : Math.pow(Xt, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Et : Math.pow(Et, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new le(We(this.r), We(this.g), We(this.b), Kt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: hn,
  // Deprecated! Use color.formatHex.
  formatHex: hn,
  formatHex8: ba,
  formatRgb: mn,
  toString: mn
}));
function hn() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}`;
}
function ba() {
  return `#${He(this.r)}${He(this.g)}${He(this.b)}${He((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function mn() {
  const e = Kt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${We(this.r)}, ${We(this.g)}, ${We(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Kt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function We(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function He(e) {
  return e = We(e), (e < 16 ? "0" : "") + e.toString(16);
}
function fn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new be(e, t, i, n);
}
function ts(e) {
  if (e instanceof be) return new be(e.h, e.s, e.l, e.opacity);
  if (e instanceof Nt || (e = At(e)), !e) return new be();
  if (e instanceof be) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, l = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= l < 0.5 ? o + s : 2 - o - s, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new be(r, a, l, e.opacity);
}
function ka(e, t, i, n) {
  return arguments.length === 1 ? ts(e) : new be(e, t, i, n ?? 1);
}
function be(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
qi(be, ka, es(Nt, {
  brighter(e) {
    return e = e == null ? Xt : Math.pow(Xt, e), new be(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Et : Math.pow(Et, e), new be(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new le(
      gi(e >= 240 ? e - 240 : e + 120, s, n),
      gi(e, s, n),
      gi(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new be(gn(this.h), Lt(this.s), Lt(this.l), Kt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Kt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${gn(this.h)}, ${Lt(this.s) * 100}%, ${Lt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function gn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Lt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function gi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const is = (e) => () => e;
function $a(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Ea(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Sa(e) {
  return (e = +e) == 1 ? ns : function(t, i) {
    return i - t ? Ea(t, i, e) : is(isNaN(t) ? i : t);
  };
}
function ns(e, t) {
  var i = t - e;
  return i ? $a(e, i) : is(isNaN(e) ? t : e);
}
const yn = (function e(t) {
  var i = Sa(t);
  function n(s, o) {
    var r = i((s = $i(s)).r, (o = $i(o)).r), a = i(s.g, o.g), l = i(s.b, o.b), c = ns(s.opacity, o.opacity);
    return function(p) {
      return s.r = r(p), s.g = a(p), s.b = l(p), s.opacity = c(p), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Oe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ei = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, yi = new RegExp(Ei.source, "g");
function Aa(e) {
  return function() {
    return e;
  };
}
function Ca(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ma(e, t) {
  var i = Ei.lastIndex = yi.lastIndex = 0, n, s, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (n = Ei.exec(e)) && (s = yi.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, l.push({ i: r, x: Oe(n, s) })), i = yi.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? Ca(l[0].x) : Aa(t) : (t = l.length, function(c) {
    for (var p = 0, h; p < t; ++p) a[(h = l[p]).i] = h.x(c);
    return a.join("");
  });
}
var wn = 180 / Math.PI, Si = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ss(e, t, i, n, s, o) {
  var r, a, l;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (l = e * i + t * n) && (i -= e * l, n -= t * l), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, l /= a), e * n < t * i && (e = -e, t = -t, l = -l, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * wn,
    skewX: Math.atan(l) * wn,
    scaleX: r,
    scaleY: a
  };
}
var Ut;
function Pa(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Si : ss(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Na(e) {
  return e == null || (Ut || (Ut = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ut.setAttribute("transform", e), !(e = Ut.transform.baseVal.consolidate())) ? Si : (e = e.matrix, ss(e.a, e.b, e.c, e.d, e.e, e.f));
}
function os(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, p, h, m, f, g) {
    if (c !== h || p !== m) {
      var x = f.push("translate(", null, t, null, i);
      g.push({ i: x - 4, x: Oe(c, h) }, { i: x - 2, x: Oe(p, m) });
    } else (h || m) && f.push("translate(" + h + t + m + i);
  }
  function r(c, p, h, m) {
    c !== p ? (c - p > 180 ? p += 360 : p - c > 180 && (c += 360), m.push({ i: h.push(s(h) + "rotate(", null, n) - 2, x: Oe(c, p) })) : p && h.push(s(h) + "rotate(" + p + n);
  }
  function a(c, p, h, m) {
    c !== p ? m.push({ i: h.push(s(h) + "skewX(", null, n) - 2, x: Oe(c, p) }) : p && h.push(s(h) + "skewX(" + p + n);
  }
  function l(c, p, h, m, f, g) {
    if (c !== h || p !== m) {
      var x = f.push(s(f) + "scale(", null, ",", null, ")");
      g.push({ i: x - 4, x: Oe(c, h) }, { i: x - 2, x: Oe(p, m) });
    } else (h !== 1 || m !== 1) && f.push(s(f) + "scale(" + h + "," + m + ")");
  }
  return function(c, p) {
    var h = [], m = [];
    return c = e(c), p = e(p), o(c.translateX, c.translateY, p.translateX, p.translateY, h, m), r(c.rotate, p.rotate, h, m), a(c.skewX, p.skewX, h, m), l(c.scaleX, c.scaleY, p.scaleX, p.scaleY, h, m), c = p = null, function(f) {
      for (var g = -1, x = m.length, v; ++g < x; ) h[(v = m[g]).i] = v.x(f);
      return h.join("");
    };
  };
}
var Oa = os(Pa, "px, ", "px)", "deg)"), Ta = os(Na, ", ", ")", ")"), Ra = 1e-12;
function vn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Da(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function La(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ua = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], l = o[1], c = o[2], p = r[0], h = r[1], m = r[2], f = p - a, g = h - l, x = f * f + g * g, v, b;
    if (x < Ra)
      b = Math.log(m / c) / t, v = function(k) {
        return [
          a + k * f,
          l + k * g,
          c * Math.exp(t * k * b)
        ];
      };
    else {
      var A = Math.sqrt(x), R = (m * m - c * c + n * x) / (2 * c * i * A), V = (m * m - c * c - n * x) / (2 * m * i * A), I = Math.log(Math.sqrt(R * R + 1) - R), y = Math.log(Math.sqrt(V * V + 1) - V);
      b = (y - I) / t, v = function(k) {
        var $ = k * b, D = vn(I), C = c / (i * A) * (D * La(t * $ + I) - Da(I));
        return [
          a + C * f,
          l + C * g,
          c * D / vn(t * $ + I)
        ];
      };
    }
    return v.duration = b * 1e3 * t / Math.SQRT2, v;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, l = a * a;
    return e(r, a, l);
  }, s;
})(Math.SQRT2, 2, 4);
var ot = 0, yt = 0, ht = 0, rs = 1e3, Zt, wt, Qt = 0, Ye = 0, si = 0, Ct = typeof performance == "object" && performance.now ? performance : Date, as = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Fi() {
  return Ye || (as(za), Ye = Ct.now() + si);
}
function za() {
  Ye = 0;
}
function Jt() {
  this._call = this._time = this._next = null;
}
Jt.prototype = ds.prototype = {
  constructor: Jt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Fi() : +i) + (t == null ? 0 : +t), !this._next && wt !== this && (wt ? wt._next = this : Zt = this, wt = this), this._call = e, this._time = i, Ai();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ai());
  }
};
function ds(e, t, i) {
  var n = new Jt();
  return n.restart(e, t, i), n;
}
function qa() {
  Fi(), ++ot;
  for (var e = Zt, t; e; )
    (t = Ye - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --ot;
}
function xn() {
  Ye = (Qt = Ct.now()) + si, ot = yt = 0;
  try {
    qa();
  } finally {
    ot = 0, Va(), Ye = 0;
  }
}
function Fa() {
  var e = Ct.now(), t = e - Qt;
  t > rs && (si -= t, Qt = e);
}
function Va() {
  for (var e, t = Zt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Zt = i);
  wt = e, Ai(n);
}
function Ai(e) {
  if (!ot) {
    yt && (yt = clearTimeout(yt));
    var t = e - Ye;
    t > 24 ? (e < 1 / 0 && (yt = setTimeout(xn, e - Ct.now() - si)), ht && (ht = clearInterval(ht))) : (ht || (Qt = Ct.now(), ht = setInterval(Fa, rs)), ot = 1, as(xn));
  }
}
function In(e, t, i) {
  var n = new Jt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Ha = zi("start", "end", "cancel", "interrupt"), Ba = [], ls = 0, _n = 1, Ci = 2, Ht = 3, bn = 4, Mi = 5, Bt = 6;
function oi(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Wa(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Ha,
    tween: Ba,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ls
  });
}
function Vi(e, t) {
  var i = ke(e, t);
  if (i.state > ls) throw new Error("too late; already scheduled");
  return i;
}
function Se(e, t) {
  var i = ke(e, t);
  if (i.state > Ht) throw new Error("too late; already running");
  return i;
}
function ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Wa(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = ds(o, 0, i.time);
  function o(c) {
    i.state = _n, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var p, h, m, f;
    if (i.state !== _n) return l();
    for (p in n)
      if (f = n[p], f.name === i.name) {
        if (f.state === Ht) return In(r);
        f.state === bn ? (f.state = Bt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[p]) : +p < t && (f.state = Bt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[p]);
      }
    if (In(function() {
      i.state === Ht && (i.state = bn, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Ci, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Ci) {
      for (i.state = Ht, s = new Array(m = i.tween.length), p = 0, h = -1; p < m; ++p)
        (f = i.tween[p].value.call(e, e.__data__, i.index, i.group)) && (s[++h] = f);
      s.length = h + 1;
    }
  }
  function a(c) {
    for (var p = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Mi, 1), h = -1, m = s.length; ++h < m; )
      s[h].call(e, p);
    i.state === Mi && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Bt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Wt(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Ci && n.state < Mi, n.state = Bt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Ga(e) {
  return this.each(function() {
    Wt(this, e);
  });
}
function Ya(e, t) {
  var i, n;
  return function() {
    var s = Se(this, e), o = s.tween;
    if (o !== i) {
      n = i = o;
      for (var r = 0, a = n.length; r < a; ++r)
        if (n[r].name === t) {
          n = n.slice(), n.splice(r, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function ja(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Se(this, e), r = o.tween;
    if (r !== n) {
      s = (n = r).slice();
      for (var a = { name: t, value: i }, l = 0, c = s.length; l < c; ++l)
        if (s[l].name === t) {
          s[l] = a;
          break;
        }
      l === c && s.push(a);
    }
    o.tween = s;
  };
}
function Xa(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = ke(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Ya : ja)(i, e, t));
}
function Hi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Se(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return ke(s, n).value[t];
  };
}
function cs(e, t) {
  var i;
  return (typeof t == "number" ? Oe : t instanceof At ? yn : (i = At(t)) ? (t = i, yn) : Ma)(e, t);
}
function Ka(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Za(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Qa(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Ja(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function ed(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function td(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function id(e, t) {
  var i = ni(e), n = i === "transform" ? Ta : cs;
  return this.attrTween(e, typeof t == "function" ? (i.local ? td : ed)(i, n, Hi(this, "attr." + e, t)) : t == null ? (i.local ? Za : Ka)(i) : (i.local ? Ja : Qa)(i, n, t));
}
function nd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function sd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function od(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && sd(e, o)), i;
  }
  return s._value = t, s;
}
function rd(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && nd(e, o)), i;
  }
  return s._value = t, s;
}
function ad(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = ni(e);
  return this.tween(i, (n.local ? od : rd)(n, t));
}
function dd(e, t) {
  return function() {
    Vi(this, e).delay = +t.apply(this, arguments);
  };
}
function ld(e, t) {
  return t = +t, function() {
    Vi(this, e).delay = t;
  };
}
function cd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? dd : ld)(t, e)) : ke(this.node(), t).delay;
}
function ud(e, t) {
  return function() {
    Se(this, e).duration = +t.apply(this, arguments);
  };
}
function pd(e, t) {
  return t = +t, function() {
    Se(this, e).duration = t;
  };
}
function hd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ud : pd)(t, e)) : ke(this.node(), t).duration;
}
function md(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Se(this, e).ease = t;
  };
}
function fd(e) {
  var t = this._id;
  return arguments.length ? this.each(md(t, e)) : ke(this.node(), t).ease;
}
function gd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Se(this, e).ease = i;
  };
}
function yd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(gd(this._id, e));
}
function wd(e) {
  typeof e != "function" && (e = Bn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new Ne(n, this._parents, this._name, this._id);
}
function vd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var l = t[a], c = i[a], p = l.length, h = r[a] = new Array(p), m, f = 0; f < p; ++f)
      (m = l[f] || c[f]) && (h[f] = m);
  for (; a < n; ++a)
    r[a] = t[a];
  return new Ne(r, this._parents, this._name, this._id);
}
function xd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Id(e, t, i) {
  var n, s, o = xd(t) ? Vi : Se;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function _d(e, t) {
  var i = this._id;
  return arguments.length < 2 ? ke(this.node(), i).on.on(e) : this.each(Id(i, e, t));
}
function bd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function kd() {
  return this.on("end.remove", bd(this._id));
}
function $d(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Li(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], l = a.length, c = o[r] = new Array(l), p, h, m = 0; m < l; ++m)
      (p = a[m]) && (h = e.call(p, p.__data__, m, a)) && ("__data__" in p && (h.__data__ = p.__data__), c[m] = h, oi(c[m], t, i, m, c, ke(p, i)));
  return new Ne(o, this._parents, t, i);
}
function Ed(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Hn(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var l = n[a], c = l.length, p, h = 0; h < c; ++h)
      if (p = l[h]) {
        for (var m = e.call(p, p.__data__, h, l), f, g = ke(p, i), x = 0, v = m.length; x < v; ++x)
          (f = m[x]) && oi(f, t, i, x, m, g);
        o.push(m), r.push(p);
      }
  return new Ne(o, r, t, i);
}
var Sd = Pt.prototype.constructor;
function Ad() {
  return new Sd(this._groups, this._parents);
}
function Cd(e, t) {
  var i, n, s;
  return function() {
    var o = st(this, e), r = (this.style.removeProperty(e), st(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function us(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Md(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = st(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Pd(e, t, i) {
  var n, s, o;
  return function() {
    var r = st(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), st(this, e))), r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a));
  };
}
function Nd(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = Se(this, e), c = l.on, p = l.value[o] == null ? a || (a = us(t)) : void 0;
    (c !== i || s !== p) && (n = (i = c).copy()).on(r, s = p), l.on = n;
  };
}
function Od(e, t, i) {
  var n = (e += "") == "transform" ? Oa : cs;
  return t == null ? this.styleTween(e, Cd(e, n)).on("end.style." + e, us(e)) : typeof t == "function" ? this.styleTween(e, Pd(e, n, Hi(this, "style." + e, t))).each(Nd(this._id, e)) : this.styleTween(e, Md(e, n, t), i).on("end.style." + e, null);
}
function Td(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Rd(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Td(e, r, i)), n;
  }
  return o._value = t, o;
}
function Dd(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Rd(e, t, i ?? ""));
}
function Ld(e) {
  return function() {
    this.textContent = e;
  };
}
function Ud(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function zd(e) {
  return this.tween("text", typeof e == "function" ? Ud(Hi(this, "text", e)) : Ld(e == null ? "" : e + ""));
}
function qd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Fd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && qd(s)), t;
  }
  return n._value = e, n;
}
function Vd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Fd(e));
}
function Hd() {
  for (var e = this._name, t = this._id, i = ps(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      if (l = r[c]) {
        var p = ke(l, t);
        oi(l, e, i, c, r, {
          time: p.time + p.delay + p.duration,
          delay: 0,
          duration: p.duration,
          ease: p.ease
        });
      }
  return new Ne(n, this._parents, e, i);
}
function Bd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = Se(this, n), p = c.on;
      p !== e && (t = (e = p).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Wd = 0;
function Ne(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function ps() {
  return ++Wd;
}
var Me = Pt.prototype;
Ne.prototype = {
  constructor: Ne,
  select: $d,
  selectAll: Ed,
  selectChild: Me.selectChild,
  selectChildren: Me.selectChildren,
  filter: wd,
  merge: vd,
  selection: Ad,
  transition: Hd,
  call: Me.call,
  nodes: Me.nodes,
  node: Me.node,
  size: Me.size,
  empty: Me.empty,
  each: Me.each,
  on: _d,
  attr: id,
  attrTween: ad,
  style: Od,
  styleTween: Dd,
  text: zd,
  textTween: Vd,
  remove: kd,
  tween: Xa,
  delay: cd,
  duration: hd,
  ease: fd,
  easeVarying: yd,
  end: Bd,
  [Symbol.iterator]: Me[Symbol.iterator]
};
function Gd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Yd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Gd
};
function jd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Xd(e) {
  var t, i;
  e instanceof Ne ? (t = e._id, e = e._name) : (t = ps(), (i = Yd).time = Fi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && oi(l, e, t, c, r, i || jd(l, t));
  return new Ne(n, this._parents, e, t);
}
Pt.prototype.interrupt = Ga;
Pt.prototype.transition = Xd;
const zt = (e) => () => e;
function Kd(e, {
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
var It = new Pe(1, 0, 0);
Pe.prototype;
function wi(e) {
  e.stopImmediatePropagation();
}
function mt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Zd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Qd() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function kn() {
  return this.__zoom || It;
}
function Jd(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function el() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tl(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function il() {
  var e = Zd, t = Qd, i = tl, n = Jd, s = el, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = Ua, c = zi("start", "zoom", "end"), p, h, m, f = 500, g = 150, x = 0, v = 10;
  function b(u) {
    u.property("__zoom", kn).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", C).filter(s).on("touchstart.zoom", O).on("touchmove.zoom", B).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  b.transform = function(u, _, w, E) {
    var T = u.selection ? u.selection() : u;
    T.property("__zoom", kn), u !== T ? I(u, _, w, E) : T.interrupt().each(function() {
      y(this, arguments).event(E).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, b.scaleBy = function(u, _, w, E) {
    b.scaleTo(u, function() {
      var T = this.__zoom.k, U = typeof _ == "function" ? _.apply(this, arguments) : _;
      return T * U;
    }, w, E);
  }, b.scaleTo = function(u, _, w, E) {
    b.transform(u, function() {
      var T = t.apply(this, arguments), U = this.__zoom, M = w == null ? V(T) : typeof w == "function" ? w.apply(this, arguments) : w, L = U.invert(M), X = typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(R(A(U, X), M, L), T, r);
    }, w, E);
  }, b.translateBy = function(u, _, w, E) {
    b.transform(u, function() {
      return i(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), r);
    }, null, E);
  }, b.translateTo = function(u, _, w, E, T) {
    b.transform(u, function() {
      var U = t.apply(this, arguments), M = this.__zoom, L = E == null ? V(U) : typeof E == "function" ? E.apply(this, arguments) : E;
      return i(It.translate(L[0], L[1]).scale(M.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), U, r);
    }, E, T);
  };
  function A(u, _) {
    return _ = Math.max(o[0], Math.min(o[1], _)), _ === u.k ? u : new Pe(_, u.x, u.y);
  }
  function R(u, _, w) {
    var E = _[0] - w[0] * u.k, T = _[1] - w[1] * u.k;
    return E === u.x && T === u.y ? u : new Pe(u.k, E, T);
  }
  function V(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function I(u, _, w, E) {
    u.on("start.zoom", function() {
      y(this, arguments).event(E).start();
    }).on("interrupt.zoom end.zoom", function() {
      y(this, arguments).event(E).end();
    }).tween("zoom", function() {
      var T = this, U = arguments, M = y(T, U).event(E), L = t.apply(T, U), X = w == null ? V(L) : typeof w == "function" ? w.apply(T, U) : w, Q = Math.max(L[1][0] - L[0][0], L[1][1] - L[0][1]), J = T.__zoom, ue = typeof _ == "function" ? _.apply(T, U) : _, we = l(J.invert(X).concat(Q / J.k), ue.invert(X).concat(Q / ue.k));
      return function(pe) {
        if (pe === 1) pe = ue;
        else {
          var ve = we(pe), rt = Q / ve[2];
          pe = new Pe(rt, X[0] - ve[0] * rt, X[1] - ve[1] * rt);
        }
        M.zoom(null, pe);
      };
    });
  }
  function y(u, _, w) {
    return !w && u.__zooming || new k(u, _);
  }
  function k(u, _) {
    this.that = u, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, _), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, _) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var _ = _e(this.that).datum();
      c.call(
        u,
        this.that,
        new Kd(u, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: c
        }),
        _
      );
    }
  };
  function $(u, ..._) {
    if (!e.apply(this, arguments)) return;
    var w = y(this, _).event(u), E = this.__zoom, T = Math.max(o[0], Math.min(o[1], E.k * Math.pow(2, n.apply(this, arguments)))), U = ze(u);
    if (w.wheel)
      (w.mouse[0][0] !== U[0] || w.mouse[0][1] !== U[1]) && (w.mouse[1] = E.invert(w.mouse[0] = U)), clearTimeout(w.wheel);
    else {
      if (E.k === T) return;
      w.mouse = [U, E.invert(U)], Wt(this), w.start();
    }
    mt(u), w.wheel = setTimeout(M, g), w.zoom("mouse", i(R(A(E, T), w.mouse[0], w.mouse[1]), w.extent, r));
    function M() {
      w.wheel = null, w.end();
    }
  }
  function D(u, ..._) {
    if (m || !e.apply(this, arguments)) return;
    var w = u.currentTarget, E = y(this, _, !0).event(u), T = _e(u.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", Q, !0), U = ze(u, w), M = u.clientX, L = u.clientY;
    ua(u.view), wi(u), E.mouse = [U, this.__zoom.invert(U)], Wt(this), E.start();
    function X(J) {
      if (mt(J), !E.moved) {
        var ue = J.clientX - M, we = J.clientY - L;
        E.moved = ue * ue + we * we > x;
      }
      E.event(J).zoom("mouse", i(R(E.that.__zoom, E.mouse[0] = ze(J, w), E.mouse[1]), E.extent, r));
    }
    function Q(J) {
      T.on("mousemove.zoom mouseup.zoom", null), pa(J.view, E.moved), mt(J), E.event(J).end();
    }
  }
  function C(u, ..._) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, E = ze(u.changedTouches ? u.changedTouches[0] : u, this), T = w.invert(E), U = w.k * (u.shiftKey ? 0.5 : 2), M = i(R(A(w, U), E, T), t.apply(this, _), r);
      mt(u), a > 0 ? _e(this).transition().duration(a).call(I, M, E, u) : _e(this).call(b.transform, M, E, u);
    }
  }
  function O(u, ..._) {
    if (e.apply(this, arguments)) {
      var w = u.touches, E = w.length, T = y(this, _, u.changedTouches.length === E).event(u), U, M, L, X;
      for (wi(u), M = 0; M < E; ++M)
        L = w[M], X = ze(L, this), X = [X, this.__zoom.invert(X), L.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== X[2] && (T.touch1 = X, T.taps = 0) : (T.touch0 = X, U = !0, T.taps = 1 + !!p);
      p && (p = clearTimeout(p)), U && (T.taps < 2 && (h = X[0], p = setTimeout(function() {
        p = null;
      }, f)), Wt(this), T.start());
    }
  }
  function B(u, ..._) {
    if (this.__zooming) {
      var w = y(this, _).event(u), E = u.changedTouches, T = E.length, U, M, L, X;
      for (mt(u), U = 0; U < T; ++U)
        M = E[U], L = ze(M, this), w.touch0 && w.touch0[2] === M.identifier ? w.touch0[0] = L : w.touch1 && w.touch1[2] === M.identifier && (w.touch1[0] = L);
      if (M = w.that.__zoom, w.touch1) {
        var Q = w.touch0[0], J = w.touch0[1], ue = w.touch1[0], we = w.touch1[1], pe = (pe = ue[0] - Q[0]) * pe + (pe = ue[1] - Q[1]) * pe, ve = (ve = we[0] - J[0]) * ve + (ve = we[1] - J[1]) * ve;
        M = A(M, Math.sqrt(pe / ve)), L = [(Q[0] + ue[0]) / 2, (Q[1] + ue[1]) / 2], X = [(J[0] + we[0]) / 2, (J[1] + we[1]) / 2];
      } else if (w.touch0) L = w.touch0[0], X = w.touch0[1];
      else return;
      w.zoom("touch", i(R(M, L, X), w.extent, r));
    }
  }
  function K(u, ..._) {
    if (this.__zooming) {
      var w = y(this, _).event(u), E = u.changedTouches, T = E.length, U, M;
      for (wi(u), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), U = 0; U < T; ++U)
        M = E[U], w.touch0 && w.touch0[2] === M.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === M.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (M = ze(M, this), Math.hypot(h[0] - M[0], h[1] - M[1]) < v)) {
        var L = _e(this).on("dblclick.zoom");
        L && L.apply(this, arguments);
      }
    }
  }
  return b.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : zt(+u), b) : n;
  }, b.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : zt(!!u), b) : e;
  }, b.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : zt(!!u), b) : s;
  }, b.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : zt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), b) : t;
  }, b.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], b) : [o[0], o[1]];
  }, b.translateExtent = function(u) {
    return arguments.length ? (r[0][0] = +u[0][0], r[1][0] = +u[1][0], r[0][1] = +u[0][1], r[1][1] = +u[1][1], b) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, b.constrain = function(u) {
    return arguments.length ? (i = u, b) : i;
  }, b.duration = function(u) {
    return arguments.length ? (a = +u, b) : a;
  }, b.interpolate = function(u) {
    return arguments.length ? (l = u, b) : l;
  }, b.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? b : u;
  }, b.clickDistance = function(u) {
    return arguments.length ? (x = (u = +u) * u, b) : Math.sqrt(x);
  }, b.tapDistance = function(u) {
    return arguments.length ? (v = +u, b) : v;
  }, b;
}
var nl = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, re = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? sl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && nl(t, i, s), s;
};
function ol(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, l = s * a - o * r;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / l, p = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || p <= 0.02 || p >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function rl(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, l = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - l), t: r };
}
function al(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, p = t.map(([m, f]) => ol(o, r, m, f)).filter((m) => m !== null).filter((m) => m.t * a > i + 2 && (1 - m.t) * a > i + 2).sort((m, f) => m.t - f.t);
    let h = -1 / 0;
    for (const m of p)
      m.t * a - i <= h + 2 || (n += ` L ${m.x - l * i} ${m.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + l * i} ${m.y + c * i}`, h = m.t * a + i);
    n += ` L ${r.x} ${r.y}`;
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
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = It, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = il().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const s = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, r = this.fitInsets.top ?? 0, a = this.fitInsets.bottom ?? 0, l = Math.max(80, n.width - s - o), c = Math.max(80, n.height - r - a), p = Math.min(...t.map((v) => v.x - v.w / 2)) - e, h = Math.max(...t.map((v) => v.x + v.w / 2)) + e, m = Math.min(...t.map((v) => v.y - v.h / 2)) - e, f = Math.max(...t.map((v) => v.y + v.h / 2)) + e, g = Math.max(0.15, Math.min(l / (h - p), c / (f - m), 1.25)), x = It.translate(
      s + l / 2 - g * (p + h) / 2,
      r + c / 2 - g * (m + f) / 2
    ).scale(g);
    _e(i).call(this._zoomBehavior.transform, x);
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
    for (let o = e.parentId; o; o = (n = this.scene.nodes.find((r) => r.id === o)) == null ? void 0 : n.parentId) {
      const r = this.scene.nodes.find((l) => l.id === o);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const a = (s = this._dragGroup) == null ? void 0 : s.get(o);
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
      const n = this.scene.nodes.find((s) => s.id === e.parentId);
      if (n) {
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, r = s.x + n.w / 2 - 10 - e.w / 2, a = s.y - n.h / 2 + 34 + e.h / 2, l = s.y + n.h / 2 - 10 - e.h / 2;
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
    var n, s;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const r = (s = o.closest) == null ? void 0 : s.call(o, "[data-node-id]");
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
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = new Set(this.selectedIds), r = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (m) => o.has(m.id) && !(m.parentId && o.has(m.parentId))
    ) : null, a = r ? new Map(r.map((m) => [m.id, this.nodePos(m)])) : null, l = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, c = (m) => {
      const f = this.nodeIdAt(m), g = f && f !== t.id ? this.scene.nodes.find((x) => x.id === f) : void 0;
      return g ? g.kind === "external-system" ? g.id : g.parentId ?? null : null;
    }, p = (m) => {
      if ((m.buttons & 1) === 0) {
        h(m);
        return;
      }
      const f = this.toScene(m), g = f.x - i.x, x = f.y - i.y;
      if (!(!s && Math.hypot(g, x) < 3 / this._t.k))
        if (s = !0, r && a) {
          const v = /* @__PURE__ */ new Map();
          for (const b of r) {
            const A = a.get(b.id), R = this.clampToParent(b, A.x + g, A.y + x);
            v.set(b.id, { x: R.x, y: R.y });
          }
          this._dragGroup = v;
        } else l(m) ? (this._dragPos = { id: t.id, x: n.x + g, y: n.y + x }, this._hoverNodeId = c(m)) : (this._dragPos = this.clampToParent(t, n.x + g, n.y + x), this._hoverNodeId = null);
    }, h = (m) => {
      if (window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", h), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, g]) => ({ id: f, x: g.x, y: g.y }))
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
    window.addEventListener("pointermove", p), window.addEventListener("pointerup", h);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((x) => x.parentId === t.id), l = Math.min(...a.map((x) => x.x - x.w / 2)), c = Math.max(...a.map((x) => x.x + x.w / 2)), p = Math.min(...a.map((x) => x.y - x.h / 2)), h = Math.max(...a.map((x) => x.y + x.h / 2)), m = Ns(
      a.map((x) => ({ dx: x.x - r.x, dy: x.y - r.y, w: x.w, h: x.h })),
      { w: s, h: o }
    ), f = (x) => {
      if ((x.buttons & 1) === 0) {
        g();
        return;
      }
      const v = this.toScene(x);
      if (x.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(v.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(v.y - r.y))
        };
        return;
      }
      const b = r.x - i * r.w / 2, A = r.y - n * r.h / 2, R = i > 0 ? Math.max(v.x, b + s, a.length ? c + 10 : -1 / 0) : Math.min(v.x, b - s, a.length ? l - 10 : 1 / 0), V = n > 0 ? Math.max(v.y, A + o, a.length ? h + 10 : -1 / 0) : Math.min(v.y, A - o, a.length ? p - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (b + R) / 2,
        y: (A + V) / 2,
        w: Math.abs(R - b),
        h: Math.abs(V - A)
      };
    }, g = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", g), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", g);
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
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, s = (o) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const r = this.nodeIdAt(o);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), o = t - n, r = i - s, a = e.w / 2, l = e.h / 2;
    if (o === 0 && r === 0) return { x: n, y: s };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / l);
    return { x: n + o * c, y: s + r * c };
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
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const p = this.edgeOffset(e);
      if (p !== 0) {
        const h = Math.hypot(c.x - l.x, c.y - l.y) || 1, m = -(c.y - l.y) / h * p, f = (c.x - l.x) / h * p;
        l = { x: l.x + m, y: l.y + f }, c = { x: c.x + m, y: c.y + f };
      }
    }
    return [l, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      n = !0;
      const a = this.toScene(r), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = rl(t, e[n], e[n + 1]);
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
    const r = (l) => {
      if ((l.buttons & 1) === 0) {
        a();
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, l = t.slice(1, -1);
    return W`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${al(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? W`<text x=${a.x} y=${a.y - 6} text-anchor="middle"
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
      var m;
      const h = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === p;
      return W`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${h ? 6 : 5}
                        fill=${h ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: p }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], p));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, p);
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
    var m, f, g;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, p = l / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return W`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${s ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (g = this._dragGroup) != null && g.has(e.id) ? "none" : "auto"}
         @pointerdown=${(x) => this.onNodePointerDown(x, e)}
         @dblclick=${(x) => {
      x.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? W`<rect x=${-c - 4} y=${-p - 4} width=${a + 8} height=${l + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-p} width=${a} height=${l} rx=${r ? 6 : 10}
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
                  @pointerdown=${(x) => {
      x.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(x) => x.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && et[e.symbol] && !r ? W`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-p + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${et[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && et[e.symbol] ? W`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${et[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? W`
              <foreignObject x=${-c + 6} y=${o ? -p + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(x) => x.stopPropagation()}
                  @keydown=${(x) => {
      x.stopPropagation(), x.key === "Enter" && this.commitRename(e, x.target.value), x.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(x) => this.commitRename(e, x.target.value)}
                />
              </foreignObject>` : r ? W`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? W`<text x=${-c + 12} y=${-p + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : W`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? W`<line x1=${-c + 8} y1=${-p + 28} x2=${c - 8} y2=${-p + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, p],
      [0, -p]
    ].map(
      ([x, v]) => W`
                <circle data-handle cx=${x} cy=${v} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(b) => this.onHandlePointerDown(b, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([x, v]) => W`
                <rect data-resize x=${x * c - 6.5} y=${v * p - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${x * v > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(b) => this.onResizePointerDown(b, e, x, v)}>
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
    }, s = (r) => {
      if ((r.buttons & 1) === 0) {
        n();
        return;
      }
      const a = this.toScene(r);
      !i && Math.hypot(a.x - t.x, a.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: a });
    }, o = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: r, b: a } = this._rubber, l = Math.min(r.x, a.x), c = Math.max(r.x, a.x), p = Math.min(r.y, a.y), h = Math.max(r.y, a.y), m = this.scene.nodes.filter((f) => {
          const g = this.nodePos(f);
          return g.x >= l && g.x <= c && g.y >= p && g.y <= h;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: m });
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, n = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = It.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    _e(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return P``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, l = s.height / this._t.k;
    return P`
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
      var p, h;
      (h = (p = c.currentTarget).hasPointerCapture) != null && h.call(p, c.pointerId) && this.onMinimapPointer(c, e, n);
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
            y=${(r - e.minY) * n}
            width=${a * n}
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
        for (let r = 0; r < o.length - 1; r++) t.push([o[r], o[r + 1]]);
      }
    }), P`
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
ne.styles = ei`
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
  ce({ attribute: !1 })
], ne.prototype, "scene", 2);
re([
  ce({ attribute: !1 })
], ne.prototype, "selectedId", 2);
re([
  ce({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
re([
  ce({ type: Boolean })
], ne.prototype, "connectable", 2);
re([
  ce({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
re([
  N()
], ne.prototype, "_t", 2);
re([
  N()
], ne.prototype, "_dragPos", 2);
re([
  N()
], ne.prototype, "_dragGroup", 2);
re([
  N()
], ne.prototype, "_pendingLink", 2);
re([
  N()
], ne.prototype, "_hoverNodeId", 2);
re([
  N()
], ne.prototype, "_editingId", 2);
re([
  N()
], ne.prototype, "_spaceDown", 2);
re([
  N()
], ne.prototype, "_wpDrag", 2);
re([
  N()
], ne.prototype, "_selectedWaypoint", 2);
re([
  N()
], ne.prototype, "_resize", 2);
re([
  N()
], ne.prototype, "_rubber", 2);
re([
  ce({ attribute: !1 })
], ne.prototype, "fitInsets", 2);
ne = re([
  ii("modux-canvas")
], ne);
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
function he(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ke = (e) => e.trim().toLowerCase();
function dl(e, t) {
  var D, C, O, B, K;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((_) => ({ ..._, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((_) => _.id))
  ), l = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((_) => ({ ..._, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((_) => ({ ..._, moduleId: u.id, application: !0 }))
  ), p = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((_) => ({ ..._, moduleId: u.id }))
  );
  for (const u of s)
    he(i, {
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
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of r)
    he(i, {
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
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const u of [...l, ...c])
    he(i, {
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
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), h.set(Ke(u.name), u.id);
  const m = (u) => {
    if (!u || !u.trim()) return null;
    const _ = h.get(Ke(u));
    if (_) return _;
    const w = `evname:${Ke(u)}`;
    return he(i, {
      id: w,
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
    }), w;
  }, f = (u) => {
    const _ = p.find((E) => E.id === u.id) ?? p.find((E) => u.name && Ke(E.name) === Ke(u.name)), w = (_ == null ? void 0 : _.id) ?? (u.id || (u.name ? `rm:${Ke(u.name)}` : null));
    return w ? (he(i, {
      id: w,
      label: (_ == null ? void 0 : _.name) ?? u.name ?? w,
      x: 0,
      y: 0,
      w: q.readModel.w,
      h: q.readModel.h,
      kind: _ ? "read-model" : "derived-read-model",
      fill: q.readModel.fill,
      stroke: q.readModel.stroke,
      dashed: !_,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const _ = (e.actors ?? []).find((w) => w.id === u.actorId);
    _ && (he(i, {
      id: _.id,
      label: _.name,
      x: 0,
      y: 0,
      w: q.actor.w,
      h: q.actor.h,
      kind: "actor",
      symbol: "person",
      fill: q.actor.fill,
      stroke: q.actor.stroke,
      badge: "ACTOR"
    }), ie(i, {
      id: `es-actor:${_.id}->${u.targetId}`,
      sourceId: _.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const _ = (e.agentUses ?? []).filter((M) => M.agentId === u.id), w = (e.agentExternalUses ?? []).filter((M) => M.agentId === u.id), E = (e.agentRags ?? []).filter((M) => M.agentId === u.id), T = (e.agentMcpUses ?? []).filter((M) => M.agentId === u.id), U = (e.agentGatewayUses ?? []).some((M) => M.agentId === u.id) || (e.agentApiOpUses ?? []).some((M) => M.agentId === u.id) || (e.agentQueryUses ?? []).some((M) => M.agentId === u.id) || (e.agentDelegations ?? []).some((M) => M.agentId === u.id) || (e.agentTriggers ?? []).some((M) => M.agentId === u.id);
    if (!(!_.length && !w.length && !E.length && !T.length && !U)) {
      he(i, {
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
      for (const M of _)
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
      for (const M of w) {
        const L = e.externalSystems.find(
          (Q) => (Q.useCases ?? []).some((J) => J.id === M.externalUseCaseId)
        );
        if (!L) continue;
        const X = (D = (L.useCases ?? []).find((Q) => Q.id === M.externalUseCaseId)) == null ? void 0 : D.name;
        he(i, {
          id: L.id,
          label: L.name,
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
        }), ie(i, {
          id: `es-agentx:${u.id}->${M.externalUseCaseId}`,
          sourceId: u.id,
          targetId: L.id,
          kind: "es-agent-external",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Llama a ${X} del sistema externo` : void 0
        });
      }
      for (const M of T) {
        const L = e.externalSystems.find(
          (Q) => (Q.mcpServers ?? []).some((J) => J.id === M.mcpServerId)
        );
        if (!L) continue;
        const X = (C = (L.mcpServers ?? []).find((Q) => Q.id === M.mcpServerId)) == null ? void 0 : C.name;
        he(i, {
          id: L.id,
          label: L.name,
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
        }), ie(i, {
          id: `es-agentmcp:${u.id}->${M.mcpServerId}`,
          sourceId: u.id,
          targetId: L.id,
          kind: "es-agent-mcp",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Consume las herramientas del servidor MCP ${X}` : void 0
        });
      }
      for (const M of E) {
        const L = (e.rags ?? []).find((X) => X.id === M.ragId);
        if (L) {
          he(i, {
            id: L.id,
            label: L.name,
            x: 0,
            y: 0,
            w: q.readModel.w,
            h: q.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${L.name} — base de conocimiento (retrieval)`
          }), ie(i, {
            id: `es-agrag:${u.id}->${L.id}`,
            sourceId: u.id,
            targetId: L.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const X of L.sourceReadModelIds ?? []) {
            const Q = f({ id: X });
            Q && ie(i, {
              id: `es-ragsrc:${L.id}->${Q}`,
              sourceId: Q,
              targetId: L.id,
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
    const _ = e.externalSystems.find((w) => w.id === u);
    return _ ? (he(i, {
      id: _.id,
      label: _.name,
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
    }), _.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const _ = g(u.externalSystemId);
    !_ || !o.has(u.useCaseId) || ie(i, {
      id: `es-extin:${_}->${u.useCaseId}`,
      sourceId: _,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const _ = e.externalSystems.find(
      (T) => (T.useCases ?? []).some((U) => U.id === u.targetId)
    ), w = _ ? g(_.id) : null;
    if (!w) continue;
    const E = (O = ((_ == null ? void 0 : _.useCases) ?? []).find((T) => T.id === u.targetId)) == null ? void 0 : O.name;
    ie(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: E,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: E ? `Llama a ${E} del sistema externo` : void 0
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
  const x = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of x)
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((w) => w.id === u.sourceId) || a.has(u.sourceId))) || ie(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const v = (u, _, w, E, T, U) => (he(i, {
    id: u,
    label: _,
    x: 0,
    y: 0,
    w: q.policy.w,
    h: q.policy.h,
    kind: w,
    symbol: "flow",
    fill: q.policy.fill,
    stroke: q.policy.stroke,
    badge: E,
    tooltip: T
  }), u), b = (u, _) => {
    const w = m(u);
    w && ie(i, {
      id: `es-trigger:${w}->${_}`,
      sourceId: w,
      targetId: _,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, A = (u, _) => {
    !_ || !o.has(_) || ie(i, {
      id: `es-invoke:${u}->${_}`,
      sourceId: u,
      targetId: _,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const _ = v(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    b(u.eventName, _);
    for (const w of u.actions ?? []) {
      if (w.type === "CallUseCase" && A(_, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const E = `saga:${w.sagaId}`;
        v(E, w.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${_}->${E}`,
          sourceId: _,
          targetId: E,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const E = (e.projections ?? []).find((T) => T.id === w.projectionId);
        E && ie(i, {
          id: `es-feeds:${_}->${E.id}`,
          sourceId: _,
          targetId: E.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const _ = v(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const T of u.handledEventIds) {
      const U = i.nodes.has(T) ? T : null;
      U && ie(i, {
        id: `es-trigger:${U}->${_}`,
        sourceId: U,
        targetId: _,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && ie(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: _,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (w) {
      const T = e.externalSystems.find(
        (M) => (M.useCases ?? []).some((L) => L.id === w) || (M.tables ?? []).some((L) => L.id === w)
      ), U = T ? g(T.id) : null;
      if (U) {
        const M = ((B = (T.useCases ?? []).find((L) => L.id === w)) == null ? void 0 : B.name) ?? ((K = (T.tables ?? []).find((L) => L.id === w)) == null ? void 0 : K.name);
        ie(i, {
          id: `es-poll:${u.id}`,
          sourceId: U,
          targetId: _,
          kind: "es-projects-poll",
          label: M,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: M ? `polling de ${M}` : "polling"
        });
      }
    }
    const E = f({ id: u.readModelId, name: u.readModelName });
    E && ie(i, {
      id: `es-projects:${_}->${E}`,
      sourceId: _,
      targetId: E,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const w = m(u.triggerEvent), E = f({ name: u.readModelName ?? `${u.triggerEvent}View` });
      w && E && ie(i, {
        id: `es-mat:${u.id}`,
        sourceId: w,
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
    const _ = v(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (b(u.triggerEvent, _), A(_, u.targetUseCaseId), !u.targetUseCaseId) {
      const w = g(u.targetId), E = w ?? `tgt:${u.targetId}`;
      !w && n.has(u.targetId) && he(i, {
        id: E,
        label: n.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: q.module.w,
        h: q.module.h,
        kind: "module",
        symbol: "component",
        fill: q.module.fill,
        stroke: q.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(E) && ie(i, {
        id: `es-deliver:${u.id}`,
        sourceId: _,
        targetId: E,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const _ = v(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    b(u.triggerEvent, _);
    for (const E of u.steps) A(_, E.useCaseId);
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: _,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const _ = v(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    b(u.triggerEvent, _);
    for (const E of u.steps ?? []) {
      A(_, E.targetUseCaseId);
      for (const T of [E.emittedEventName, E.completionEventName]) {
        const U = m(T);
        U && ie(i, {
          id: `es-wfemit:${u.id}:${U}`,
          sourceId: _,
          targetId: U,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: _,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const R = [...i.nodes.values()], V = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    V.has(u.targetId) || V.set(u.targetId, []), V.get(u.targetId).push(u.sourceId);
  const I = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), k = (u) => {
    const _ = I.get(u);
    if (_ !== void 0) return _;
    if (y.has(u)) return 0;
    y.add(u);
    const w = V.get(u) ?? [], E = w.length ? 1 + Math.max(...w.map(k)) : 0;
    return y.delete(u), I.set(u, E), E;
  }, $ = /* @__PURE__ */ new Map();
  for (const u of R) {
    const _ = t[u.id];
    if (_) {
      u.x = _.x, u.y = _.y;
      continue;
    }
    const w = k(u.id), E = $.get(w) ?? 0;
    $.set(w, E + 1), u.x = 140 + w * 260, u.y = 110 + E * 110;
  }
  return { nodes: R, edges: i.edges };
}
const ll = 190, cl = 56, $n = 180, ul = 56, pl = 150, hl = 44, En = 250, Sn = 100;
function ml(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function fl(e, t) {
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
function gl(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : l.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var v;
    const l = new Map(a.steps.map((b) => [b.id, b])), c = new Map(a.steps.map((b) => [b.id, ml(b, l)])), p = /* @__PURE__ */ new Map();
    for (const b of a.steps) {
      const A = c.get(b.id) ?? 0;
      p.set(A, (p.get(A) ?? 0) + 1);
    }
    const h = Math.max(1, ...p.values()), m = fl(e, a);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const b = t[m.id] ?? { x: 140, y: r };
      i.push({
        id: m.id,
        label: m.label,
        x: b.x,
        y: b.y,
        w: pl,
        h: hl,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: f.x,
      y: f.y,
      w: ll,
      h: cl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), m && n.push({
      id: `wft:${a.id}`,
      sourceId: m.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const g = /* @__PURE__ */ new Map();
    let x = 0;
    for (const b of a.steps) {
      const A = c.get(b.id) ?? 0;
      x = Math.max(x, A);
      const R = g.get(A) ?? 0;
      g.set(A, R + 1);
      const V = t[b.id] ?? {
        x: f.x + (A + 1) * En,
        y: r + (R - (p.get(A) - 1) / 2) * Sn
      }, I = o(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: V.x,
        y: V.y,
        w: $n,
        h: ul,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: I ? `→ ${I}` : "∅ sin use case",
        tooltip: `${b.name}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${I ? ` · lanza ${I}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}`
      });
      const y = (b.dependsOnStepIds ?? []).filter((k) => l.has(k));
      y.length === 0 && n.push({
        id: `wfs:${a.id}:${b.id}`,
        sourceId: a.id,
        targetId: b.id,
        kind: "workflow-start",
        label: b.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of y)
        n.push({
          id: `wfdep:${k}->${b.id}`,
          sourceId: k,
          targetId: b.id,
          kind: "workflow-dependency",
          label: b.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${b.name} espera a ${((v = l.get(k)) == null ? void 0 : v.name) ?? k}`
        });
    }
    if (a.onCompletionEventName) {
      const b = `done:${a.id}`, A = t[b] ?? { x: f.x + (x + 2) * En, y: r };
      i.push({
        id: b,
        label: a.onCompletionEventName,
        x: A.x,
        y: A.y,
        w: $n,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const R = new Set(a.steps.flatMap((I) => I.dependsOnStepIds ?? [])), V = a.steps.filter((I) => !R.has(I.id));
      for (const I of V.length ? V : [])
        n.push({
          id: `wfd:${a.id}:${I.id}`,
          sourceId: I.id,
          targetId: b,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: b,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, h + 1) * Sn + 60;
  }), { nodes: i, edges: n };
}
async function yl(e, t) {
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
  }, r = await n.layout(o), a = {};
  for (const l of r.children ?? [])
    a[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return a;
}
var wl = Object.defineProperty, vl = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? vl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && wl(t, i, s), s;
};
const xl = /* @__PURE__ */ new Set([
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
  "api-operation"
]);
let fe = class extends De {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this.onDown = (e) => {
      var s, o;
      if (e.button !== 0) return;
      this.focus(), (s = this.setPointerCapture) == null || s.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".h3");
      if (i != null && i.dataset.sourceId) {
        const r = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - r.left,
          y1: e.clientY - r.top,
          x2: e.clientX - r.left,
          y2: e.clientY - r.top
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
        const r = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), a = (s = r == null ? void 0 : r.closest) == null ? void 0 : s.call(r, ".n3"), l = (a == null ? void 0 : a.dataset.nodeId) ?? null;
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
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const s = t.get(n.id);
      if (s !== void 0) return s;
      const o = n.parentId ? e.get(n.parentId) : void 0, r = o ? i(o) + 1 : 0;
      return t.set(n.id, r), r;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return P`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((v) => [v.id, v])), n = Math.min(...e.map((v) => v.x - v.w / 2)) - 60, s = Math.max(...e.map((v) => v.x + v.w / 2)) + 60, o = Math.min(...e.map((v) => v.y - v.h / 2)) - 60, r = Math.max(...e.map((v) => v.y + v.h / 2)) + 60, a = (n + s) / 2, l = (o + r) / 2, c = this.getBoundingClientRect(), p = c.width ? Math.min(c.width / (s - n), c.height / (r - o), 1) * 0.9 : 0.5, h = this._k * p;
    this._kUsed = h;
    const m = 30, f = this._liveMove, g = (v) => v.x + ((f == null ? void 0 : f.id) === v.id ? f.dx : 0), x = (v) => v.y + ((f == null ? void 0 : f.id) === v.id ? f.dy : 0);
    return P`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${h}, ${h}, ${h}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-a}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${o}px"
            width=${s - n}
            height=${r - o}
            viewBox="${n} ${o} ${s - n} ${r - o}"
          >
            ${this.scene.edges.map((v) => {
      const b = i.get(v.sourceId), A = i.get(v.targetId);
      return !b || !A ? "" : W`<line
                x1=${g(b)} y1=${x(b)} x2=${g(A)} y2=${x(A)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((v) => {
      const b = i.get(v.sourceId), A = i.get(v.targetId);
      if (!b || !A) return "";
      const R = (t.get(b.id) ?? 0) * m + 2, V = (t.get(A.id) ?? 0) * m + 2, I = g(A) - g(b), y = x(A) - x(b), k = V - R, $ = Math.hypot(I, y), D = Math.hypot($, k), C = Math.atan2(y, I) * 180 / Math.PI, O = Math.atan2(k, $) * 180 / Math.PI, B = v.color ?? "#64748b", K = v.dashed ? `repeating-linear-gradient(90deg, ${B} 0 6px, transparent 6px 10px)` : B;
      return P`<div
              class="edge3"
              style="
                left: ${g(b)}px; top: ${x(b)}px; width: ${D}px; height: 1.7px;
                transform: translateZ(${R}px) rotateZ(${C}deg) rotateY(${-O}deg);
                background: ${K};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((v) => {
      const b = t.get(v.id) ?? 0, A = v.container || b === 0, R = this._hoverTargetId === v.id;
      return P`
              <div
                class="n3 ${v.container ? "container3" : ""} ${this.selectedId === v.id ? "selected3" : ""} ${R ? "hover3" : ""}"
                data-node-id=${v.id}
                data-kind=${v.kind}
                title=${v.tooltip ?? v.label}
                style="
                  left: ${g(v) - v.w / 2}px; top: ${x(v) - v.h / 2}px;
                  width: ${v.w}px; height: ${v.h}px;
                  transform: translateZ(${b * m + (R ? 8 : 0)}px)${R ? " scale(1.06)" : ""};
                  background: ${v.container ? "color-mix(in srgb, " + (v.fill ?? "#ffffff") + " 82%, transparent)" : v.fill ?? "#ffffff"};
                  border-color: ${v.stroke ?? "#64748b"};
                  border-style: ${v.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${A ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${v.badge ? P`<span class="badge3" style="color: ${v.stroke ?? "#94a3b8"}">${v.badge}</span>` : ""}
                <span>${v.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const v = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!v || !xl.has(v.kind)) return "";
      const b = (t.get(v.id) ?? 0) * m + 4;
      return [
        [g(v) + v.w / 2, x(v)],
        [g(v) - v.w / 2, x(v)],
        [g(v), x(v) + v.h / 2],
        [g(v), x(v) - v.h / 2]
      ].map(
        ([R, V]) => P`<div
                class="h3"
                data-source-id=${v.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${R}px; top: ${V}px; transform: translateZ(${b}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? P`<svg class="rubber">
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
fe.styles = ei`
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
  N()
], fe.prototype, "_rx", 2);
$e([
  N()
], fe.prototype, "_rz", 2);
$e([
  N()
], fe.prototype, "_k", 2);
$e([
  N()
], fe.prototype, "_pan", 2);
$e([
  N()
], fe.prototype, "_liveMove", 2);
$e([
  N()
], fe.prototype, "_connect", 2);
$e([
  N()
], fe.prototype, "_hoverTargetId", 2);
fe = $e([
  ii("modux-tilt")
], fe);
var Il = Object.defineProperty, _l = Object.getOwnPropertyDescriptor, H = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? _l(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Il(t, i, s), s;
};
const Pi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, bl = Object.keys(Pi);
function ft(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let a = 0, l = 1;
  const c = t.x - e.x, p = t.y - e.y;
  for (const [h, m] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-p, e.y - o],
    [p, r - e.y]
  ]) {
    if (h === 0) {
      if (m < 0) return !1;
      continue;
    }
    const f = m / h;
    if (h < 0) {
      if (f > l) return !1;
      f > a && (a = f);
    } else {
      if (f < a) return !1;
      f < l && (l = f);
    }
  }
  return l - a > 0.02;
}
function kl(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((p) => [p.id, p])), s = (p) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let f = p; f; f = (m = n.get(f)) == null ? void 0 : m.parentId) h.add(f);
    return h;
  }, o = e.nodes, r = (p) => p.parentId ? Math.min(i, 6) : i, a = /* @__PURE__ */ new Map(), l = (p, h, m) => {
    const f = r(m), g = { x: m.x, y: m.y, w: m.w + 2 * f, h: m.h + 2 * f }, x = m.w / 2 + f * 1.5, v = m.h / 2 + f * 1.5, b = { x: m.x - x, y: m.y - v }, A = { x: m.x + x, y: m.y - v }, R = { x: m.x - x, y: m.y + v }, V = { x: m.x + x, y: m.y + v }, I = [];
    for (const y of [b, A, R, V])
      !ft(p, y, g) && !ft(y, h, g) && I.push([y]);
    for (const [y, k] of [
      [b, A],
      [A, b],
      [A, V],
      [V, A],
      [V, R],
      [R, V],
      [R, b],
      [b, R]
    ])
      !ft(p, y, g) && !ft(k, h, g) && I.push([y, k]);
    return I;
  };
  for (const p of e.edges) {
    if ((c = t[p.id]) != null && c.length) continue;
    const h = n.get(p.sourceId), m = n.get(p.targetId);
    if (!h || !m) continue;
    const f = /* @__PURE__ */ new Set([...s(h.id), ...s(m.id)]), g = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let x = 0; x < 12; x++) {
      let v = !1;
      e: for (let b = 0; b < g.length - 1; b++)
        for (const A of o) {
          if (f.has(A.id)) continue;
          const R = r(A), V = { x: A.x, y: A.y, w: A.w + 2 * R, h: A.h + 2 * R };
          if (!ft(g[b], g[b + 1], V)) continue;
          const I = l(g[b], g[b + 1], A);
          if (!I.length) continue;
          const y = ($) => o.some(
            (D) => D !== A && !f.has(D.id) && Math.abs($.x - D.x) < D.w / 2 + r(D) / 2 && Math.abs($.y - D.y) < D.h / 2 + r(D) / 2
          ), k = ($) => {
            let D = 0;
            const C = [g[b], ...$, g[b + 1]];
            for (let O = 0; O < C.length - 1; O++)
              D += Math.hypot(C[O + 1].x - C[O].x, C[O + 1].y - C[O].y);
            return D + ($.some(y) ? 1e4 : 0);
          };
          I.sort(($, D) => k($) - k(D)), g.splice(b + 1, 0, ...I[0]), v = !0;
          break e;
        }
      if (!v) break;
    }
    g.length > 2 && a.set(
      p.id,
      g.slice(1, -1).map((x) => ({ x: Math.round(x.x), y: Math.round(x.y) }))
    );
  }
  return a;
}
const j = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function $l(e, t) {
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
function El(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let F = class extends De {
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
          (this._view === "context-map" || this._view === "workflows") && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
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
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((p) => !p.parentId), a = Ni(r), l = [...a.keys()].map((p) => ({
      kind: "move-node",
      view: "context-map",
      id: p,
      pos: o.nodes[p] ?? null
    })), c = { ...o.nodes };
    for (const [p, h] of a) {
      const m = r.find((g) => g.id === p), f = o.nodes[p] ?? { x: m.x, y: m.y };
      c[p] = {
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
    const i = kl(e, t);
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
        const o = (n = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : n.operations.find((r) => r.id === e.id);
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
        const o = (s = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : s.operations.find((r) => r.id === e.id);
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[t] ?? null;
    let a = { x: i, y: n };
    const l = this.sceneFor(s), c = l.nodes.find((h) => h.id === t);
    if (c != null && c.parentId) {
      const h = l.nodes.find((m) => m.id === c.parentId);
      h && (a = { x: i - h.x, y: n - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const p = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const m = this.inverseOf(h);
        m && p.unshift(...m), this.command(h, !1);
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((g) => g.id === t) ?? (this.model.proxyApis ?? []).find((g) => g.id === t);
    if (!o || i && !this.model.externalSystems.some((g) => g.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const l = this._view, c = this.viewLayout(l), p = this.sceneFor(l), h = a ? p.nodes.find((g) => g.id === a) : void 0, m = h ? { x: n - h.x, y: s - h.y } : { x: n, y: s }, f = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: m } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((g) => g.id === t), r = this.model.externalSystems.find((g) => g.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (g) => g.targetApiId === t && g.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${j(o.name)}-${j(r.name)}`;
    if ((this.model.proxyApis ?? []).some((g) => g.id === l)) return;
    const c = this._view, p = this.viewLayout(c), m = this.sceneFor(c).nodes.find((g) => g.id === i);
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
    m && (f.push({ kind: "move-node", view: c, id: l, pos: p.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...p,
      nodes: { ...p.nodes, [l]: { x: n - m.x, y: s - m.y } }
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
    var a, l, c;
    const t = e.target, i = (a = t.files) == null ? void 0 : a[0];
    if (t.value = "", !i) return;
    const n = await i.text(), s = this.selectedApiId(), o = s ? null : ((l = this.model.externalSystems.find((p) => p.id === this._selectedId)) == null ? void 0 : l.id) ?? null, r = s || o ? null : ((c = this.model.modules.find((p) => p.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
    if (!s && !o && !r) {
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
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), s = new Set(n.collapsed ?? []);
    s.has(t) ? s.delete(t) : s.add(t), this.writeViewLayout(i, { ...n, collapsed: [...s] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), o = { ...n.nodes }, r = [];
    for (const { id: a, x: l, y: c } of t) {
      r.push({ kind: "move-node", view: i, id: a, pos: n.nodes[a] ?? null });
      let p = { x: l, y: c };
      const h = s.nodes.find((m) => m.id === a);
      if (h != null && h.parentId) {
        const m = s.nodes.find((f) => f.id === h.parentId);
        m && (p = { x: l - m.x, y: c - m.y });
      }
      o[a] = p;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
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
    var p;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((p = a.sizes) == null ? void 0 : p[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((h) => ({ kind: "move-node", view: r, id: h.id, pos: a.nodes[h.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const h of l) c[h.id] = { x: h.x - i, y: h.y - n };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: o } }
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
    const i = ji(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
      (r, a) => (n.get(r.id) ?? 0) - (n.get(a.id) ?? 0)
    );
    if (s.every((r, a) => r.id === t.steps[a].id)) return null;
    const o = s.findIndex((r) => r.id === e);
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
    var V;
    if (this._view === "workflows") {
      const I = this.owningWorkflowOf(e), y = this.owningWorkflowOf(t);
      if (!I || I !== y || e === t) return;
      const k = I.steps.find(($) => $.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: I.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, I, y] = s, k = (this.model.proxyApis ?? []).find((B) => B.id === y), $ = (k == null ? void 0 : k.targetApiId) ?? ((V = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === y && (this.model.apis ?? []).some(
          (K) => K.id === B.apiId && K.operations.some((u) => u.id === I)
        )
      )) == null ? void 0 : V.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((K) => K.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: I,
          moduleId: y,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let C = null;
      if (t === k.targetApiId)
        C = k.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === k.targetApiId ? C = B[2] : this.model.modules.some((K) => K.id === t) && (this.model.apiImplementations ?? []).some(
          (K) => K.apiId === k.targetApiId && K.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === k.id && B.operationId === I && B.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: I,
        targetSiteId: C
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((I) => I.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (O) => O.agentId === e && O.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (O) => O.agentId === e && O.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (O) => O.agentId === e && O.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (O) => O.agentId === e && O.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((O) => O.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (O) => O.agentId === e && O.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (O) => O.agentId === e && O.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (O) => O.agentId === e && O.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (O) => O.agentId === e && O.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (O) => O.agentId === e && O.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((I) => I.id === e)) {
      const I = (this.model.mcpGateways ?? []).find(($) => $.id === e), y = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((D) => D.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((D) => D.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((D) => D.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), k = [
        ...I.mcpServerIds ?? [],
        ...I.apiIds ?? [],
        ...I.apiOperationIds ?? [],
        ...I.useCaseIds ?? [],
        ...I.ragIds ?? []
      ].includes(t);
      y && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((I) => I.id === t)) return;
    const r = (this.model.rags ?? []).find((I) => I.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((I) => I.id === t)) return;
    if ((this.model.workflows ?? []).some((I) => I.id === e)) {
      const I = (this.model.workflows ?? []).find(($) => $.id === e), y = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (y) {
        const $ = I.onCompletionEventName || `${I.name.replace(/\s+/g, "")}Completado`;
        y.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const k = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (k && !(I.steps ?? []).some((D) => D.targetUseCaseId === t)) {
        const D = `wfs-${j(k.name)}`;
        let C = D;
        for (let O = 2; (I.steps ?? []).some((B) => B.id === C); O++)
          C = `${D}-${O}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: C,
          name: k.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((I) => I.id === t)) {
      const I = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), y = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), k = I ?? y;
      if (k) {
        const $ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), D = new Set((this.model.aggregates ?? []).map((B) => B.id)), C = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((K) => K.id))
        ), O = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((K) => K.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: $ && D.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && C.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && O.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((I) => I.id === e)) {
      const I = (this.model.proxyApis ?? []).find((y) => y.id === e);
      if ((this.model.apis ?? []).some((y) => y.id === t)) {
        I.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((y) => y.id === t)) {
        if (!I.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === I.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: I.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((y) => y.id === t) && I.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((I) => I.id === e)) {
      if (this.model.externalSystems.some((I) => I.id === t)) {
        (this.model.apis ?? []).find((y) => y.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((I) => I.id === t) && ((this.model.apiImplementations ?? []).some(
        (y) => y.apiId === e && y.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const a = new Set((this.model.actors ?? []).map((I) => I.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((y) => (y.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((y) => (y.applicationEvents ?? []).map((k) => k.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === e && k.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!a.has(e)) return;
    }
    if (a.has(e)) {
      const I = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map(($) => $.id))
      ), y = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map(($) => $.id))
      );
      if (I.has(t) || y.has(t)) {
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
        this.model.modules.flatMap((y) => (y.useCases ?? []).map((k) => k.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((y) => y.id === t)) {
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
    const c = this.model.externalSystems.flatMap((I) => I.useCases ?? []).find((I) => I.id === e), p = this.model.externalSystems.flatMap((I) => I.tables ?? []).find((I) => I.id === e);
    if (c || p) {
      const I = (c ?? p).name, y = c ? { externalUseCaseId: e } : { externalTableId: e }, k = (C) => c ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, $ = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (O) => k(O) && O.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(I)}-${j($.name)}`,
          name: `${$.name}Projection`,
          ...y,
          targetId: t
        });
        return;
      }
      const D = this.model.modules.find((C) => C.id === t);
      if (D) {
        (this.model.projections ?? []).some(
          (O) => k(O) && O.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(I)}-${j(D.name)}`,
          name: `${I}ViewProjection`,
          ...y,
          moduleId: t,
          readModelName: `${I}View`
        });
        return;
      }
      return;
    }
    const h = (this.model.aggregates ?? []).find((I) => I.id === e);
    if (h) {
      const I = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (I) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(h.name)}-${j(I.name)}`,
          name: `${I.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const y = this.model.modules.find((k) => k.id === t);
      if (y) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(h.name)}-${j(y.name)}`,
          name: `${h.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${h.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap((I) => (I.domainEvents ?? []).map((y) => y.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((I) => I.id),
      ...this.model.modules.flatMap((I) => (I.domainServices ?? []).map((y) => y.id))
    ]), g = new Set(
      this.model.modules.flatMap((I) => (I.applicationEvents ?? []).map((y) => y.id))
    ), x = new Set(this.model.modules.flatMap((I) => (I.useCases ?? []).map((y) => y.id))), v = new Set(
      this.model.modules.flatMap((I) => (I.queryServices ?? []).map((y) => y.id))
    );
    if (x.has(e) && v.has(t)) {
      (this.model.queryCalls ?? []).some(
        (y) => y.sourceId === e && y.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const b = new Set(
      this.model.externalSystems.flatMap((I) => (I.useCases ?? []).map((y) => y.id))
    );
    if (x.has(e) && b.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (y) => y.sourceId === e && y.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (x.has(e) && x.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (y) => y.sourceId === e && y.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (x.has(e) && (this.model.aggregates ?? []).some((I) => I.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (y) => y.sourceId === e && y.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) && m.has(t) || x.has(e) && g.has(t)) {
      (this.model.emissions ?? []).some(
        (y) => y.sourceId === e && y.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (m.has(e) || g.has(e)) {
      const I = g.has(e), y = this.model.modules.flatMap((w) => (I ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === e), k = this.model.modules.flatMap((w) => (w.useCases ?? []).map((E) => ({ u: E, module: w }))).find(({ u: w }) => w.id === t), $ = this.model.modules.flatMap((w) => (w.readModels ?? []).map((E) => ({ rm: E, module: w }))).find(({ rm: w }) => w.id === t), D = this.model.modules.find((w) => w.id === t) ?? ($ == null ? void 0 : $.module) ?? (k == null ? void 0 : k.module);
      if (!y || !D) return;
      const C = new Set((this.model.aggregates ?? []).map((w) => w.id)), O = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((E) => E.id))
      ), B = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === e && (I ? x.has(w.sourceId) : C.has(w.sourceId) || O.has(w.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: I ? `Declara primero qué caso de uso publica ${y.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${y.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const K = !I && C.has(B.sourceId);
      if (k) {
        if (this.model.flows.some(
          (E) => E.archetype === "TRIGGERS" && E.triggerEvent === y.name && E.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(y.name)}-${j(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: K ? B.sourceId : "",
          triggerDomainServiceId: !I && !K ? B.sourceId : void 0,
          triggerUseCaseId: I ? B.sourceId : void 0,
          triggerEvent: y.name,
          targetId: D.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const u = ($ == null ? void 0 : $.rm.name) ?? `${y.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === y.name && w.targetId === D.id && w.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${j(y.name)}-${j(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: K ? B.sourceId : "",
        triggerDomainServiceId: !I && !K ? B.sourceId : void 0,
        triggerUseCaseId: I ? B.sourceId : void 0,
        triggerEvent: y.name,
        targetId: D.id,
        readModelName: u
      });
      return;
    }
    const A = /* @__PURE__ */ new Set([
      ...f,
      ...x,
      ...v,
      ...this.model.modules.flatMap((I) => (I.readModels ?? []).map((y) => y.id))
    ]);
    if (A.has(e) || A.has(t) || m.has(t) || g.has(t))
      return;
    const R = new Set(this.model.externalSystems.map((I) => I.id));
    if (R.has(e)) {
      if (new Set(
        this.model.modules.flatMap((D) => (D.useCases ?? []).map((C) => C.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (C) => C.externalSystemId === e && C.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (R.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const y = (this.model.apis ?? []).find(
        (D) => D.operations.some((C) => C.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), $ = y ? { operationId: t, siteId: y.id } : k ? { operationId: k[1], siteId: k[2] } : null;
      if ($) {
        (this.model.externalOperationUses ?? []).some(
          (C) => C.externalSystemId === e && C.operationId === $.operationId && C.siteId === $.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: $.operationId,
          targetSiteId: $.siteId
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
    R.has(t) || a.has(t);
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
      const s = this.memberIdOf(i, n), o = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
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
      const [, o, r] = s, a = (n = (this.model.apis ?? []).find(
        (l) => l.operations.some((c) => c.id === o)
      )) == null ? void 0 : n.id;
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: a, operationId: o, moduleId: r });
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
      const [, o, r, a] = s, l = /^apiimpl:.+@(.+)$/.exec(a), c = l ? l[1] : a;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: r, operationId: o, targetSiteId: c });
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
    const t = new Set(e.memberIds), i = (s, o, r = {}) => P`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(s) ? "implicit" : ""}"
        title=${r.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(a) => this.toggleViewMember(s, a.target.checked)}
        />
        ${o}
      </label>
    `, n = (s, o) => o.length ? P`<h4>${s}</h4>${o}` : "";
    return P`
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
    const t = new Set(e.memberIds), i = this.model.modules.filter((l) => t.has(l.id)), n = new Set(i.map((l) => l.id)), s = this.model.externalSystems.filter((l) => t.has(l.id)), o = new Set(s.map((l) => l.id)), r = (this.model.aggregates ?? []).filter(
      (l) => t.has(l.id) || n.has(l.moduleId)
    ), a = new Set(r.map((l) => l.id));
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
      aggregates: r,
      entities: (this.model.entities ?? []).filter((l) => a.has(l.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (l) => a.has(l.sourceAggregateId) && a.has(l.targetAggregateId)
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
    const t = e.detail.kind === "process-step" ? El(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : $l(e.detail.id, e.detail.kind);
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
    var r;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
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
      (n.workflows ?? []).map((o) => o.id),
      (n.workflows ?? []).flatMap((o) => (o.steps ?? []).map((r) => r.id))
    ])
      s.forEach((o) => i.add(o));
    for (let s = 1; ; s++) {
      const o = s === 1 ? e : `${e} ${s}`, r = `${t}${j(o)}`;
      if (!i.has(r)) return { id: r, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, r;
    if (!t) return null;
    const i = this.sceneFor(this._view), n = [];
    for (let a = t; a; )
      n.push(a), a = (o = i.nodes.find((l) => l.id === a)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return n.find((a) => this.model.modules.some((l) => l.id === a)) ?? null;
    if (e === "read-model") {
      const a = n.find((c) => (this.model.aggregates ?? []).some((p) => p.id === c));
      if (a) return a;
      const l = n.find((c) => this.model.modules.some((p) => p.id === c));
      return ((r = (this.model.aggregates ?? []).find((c) => c.moduleId === l)) == null ? void 0 : r.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((a) => this.model.externalSystems.some((l) => l.id === a)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (a) => this.model.modules.some((l) => (l.useCases ?? []).some((c) => c.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of n) {
        if ((this.model.apis ?? []).some((p) => p.id === a)) return a;
        const l = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (l && (this.model.apis ?? []).some((p) => p.id === l[1])) return l[1];
        const c = (this.model.proxyApis ?? []).find((p) => p.id === a);
        if (c != null && c.targetApiId) return c.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((a) => this.model.externalSystems.some((l) => l.id === a)) ?? n.find((a) => this.model.modules.some((l) => l.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var p;
    const n = F.PALETTE_NEW.find((h) => h.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), r = (h, m) => {
      const f = this.viewLayout(s), g = m ? o.nodes.find((v) => v.id === m) : void 0, x = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...f, nodes: { ...f.nodes, [h]: x } }), { kind: "move-node", view: s, id: h, pos: null };
    }, a = (h, m, f) => {
      const g = this.inverseOf(h) ?? [];
      this.command(h, !1);
      const x = r(m, f);
      this.pushUndoEntry([...g, x]);
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
        workflow: "wf-"
      }, { id: m, name: f } = this.uniquePaletteName(n.label, h[e] ?? ""), g = e === "module" ? { kind: "add-module", id: m, name: f, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: f } : e === "external-system" ? { kind: "add-external-system", id: m, name: f } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: f } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: f, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: f } : e === "rag" ? { kind: "add-rag", id: m, name: f } : e === "api" ? { kind: "add-api", id: m, name: f } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: f } : {
        kind: "add-workflow",
        id: m,
        name: f,
        completionEventName: `${f.replace(/\s+/g, "")}Completado`
      };
      a(g, m);
      return;
    }
    if (e === "workflow-step") {
      const h = this.model.workflows ?? [], m = [];
      for (let A = i ?? void 0; A; )
        m.push(A), A = (p = o.nodes.find((R) => R.id === A)) == null ? void 0 : p.parentId;
      const f = m.map((A) => h.find((R) => R.id === A)).find(Boolean), g = m.map((A) => {
        const R = h.find((V) => (V.steps ?? []).some((I) => I.id === A));
        return R ? { owner: R, stepId: A } : null;
      }).find(Boolean), x = f ?? (g == null ? void 0 : g.owner);
      if (!x) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: v, name: b } = this.uniquePaletteName("Paso", "wfs-");
      g && (t = { x: t.x + 190, y: t.y }), a(
        {
          kind: "add-workflow-step",
          workflowId: x.id,
          id: v,
          name: b,
          ...g ? { dependsOnStepIds: [g.stepId], afterStepId: g.stepId } : {}
        },
        v
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${x.name} — se ve en la vista Workflows`
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
      const { id: m, name: f } = this.uniquePaletteName("API", "api-"), g = { kind: "add-api", id: m, name: f }, x = this.inverseOf(g) ?? [];
      this.command(g, !1), this.model.externalSystems.some((R) => R.id === h) ? this.command({ kind: "set-api-publisher", id: m, targetId: h }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: h }, !1);
      const v = this.viewLayout(this._view), b = this.sceneFor(this._view).nodes.find((R) => R.id === h), A = b ? { x: Math.round(t.x - b.x), y: Math.round(t.y - b.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...v, nodes: { ...v.nodes, [m]: A } }), this.pushUndoEntry([...x, { kind: "move-node", view: this._view, id: m, pos: null }]);
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
      a({ kind: "add-aggregate", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "use-case" || e === "policy") {
      const h = `uc-${j(c)}`;
      a(
        { kind: "add-use-case", id: h, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        h,
        l
      );
    } else if (e === "domain-event") {
      const h = `ev-${j(c)}`;
      a({ kind: "add-domain-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "application-event") {
      const h = `aev-${j(c)}`;
      a({ kind: "add-application-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "domain-service") {
      const h = `ds-${j(c)}`;
      a({ kind: "add-domain-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "query-service") {
      const h = `qs-${j(c)}`;
      a({ kind: "add-query-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "read-model") {
      const h = `rm-${j(c)}`, m = (this.model.aggregates ?? []).find((f) => f.id === l);
      a({ kind: "add-read-model", id: h, name: c, aggregateId: l }, h, (m == null ? void 0 : m.moduleId) ?? l);
    } else if (e === "api-operation") {
      const h = (this.model.apis ?? []).find((v) => v.id === l), m = new Set(((h == null ? void 0 : h.operations) ?? []).map((v) => v.id));
      let f = c, g = `apiop-${l.replace(/^api-/, "")}-${j(f)}`;
      for (let v = 2; m.has(g); v++)
        f = `${n.label} ${v}`, g = `apiop-${l.replace(/^api-/, "")}-${j(f)}`;
      a({ kind: "add-api-operation", apiId: l, id: g, name: f }, g, l), o.nodes.some(
        (v) => v.parentId === l && (v.kind === "api-operation" || v.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(h == null ? void 0 : h.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const h = this.model.modules.flatMap((x) => x.useCases ?? []).find((x) => x.id === l), m = new Set((h == null ? void 0 : h.stepIds) ?? []);
      let f = c, g = `step-${j(f)}`;
      for (let x = 2; m.has(g); x++)
        f = `${n.label} ${x}`, g = `step-${j(f)}`;
      a({ kind: "add-use-case-step", useCaseId: l, id: g, name: f }, g, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(h == null ? void 0 : h.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const h = `xuc-${j(c)}`;
      a({ kind: "add-external-use-case", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "external-table") {
      const h = `tbl-${j(c)}`;
      a({ kind: "add-external-table", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "mcp-server") {
      const h = `mcpsrv-${j(c)}`;
      a({ kind: "add-mcp-server", id: h, name: c, moduleId: l }, h, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
      return;
    }
    const o = this._view, r = this.sceneFor(o), a = r.nodes.find((h) => h.id === e);
    if (!a) {
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
    const l = this.viewLayout(o), c = a.parentId ? r.nodes.find((h) => h.id === a.parentId) : void 0, p = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: p } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map" && this._view !== "workflows") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = F.PALETTE_NEW.filter(
      (n) => (this._view !== "workflows" || ["workflow", "workflow-step"].includes(n.type)) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return P`
      <div class="palette ${this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? P`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${t.map(
      (n) => P`
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
              ` : P`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => P`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (s) => P`
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
        ${this._view === "workflows" ? "" : P`
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
    var t, i, n, s, o, r, a;
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
          triggerAggregateId: this._newTriggerAggId || ((a = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : a.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Xs(i, t.nodes) : e === "flows" ? so(i, t.nodes) : e === "processes" ? ji(i, t.nodes) : e === "workflows" ? gl(i, t.nodes) : e === "eventstorming" ? dl(i, t.nodes) : Vs(
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
    const e = this._paletteOpen && (this._view === "context-map" || this._view === "workflows"), t = this._treeOpen && !!this._activeViewId;
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
    }, r = await yl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
    var s;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (s = this.renderRoot.querySelector("modux-canvas")) == null || s.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return P`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${this._view !== "context-map" && this._view !== "workflows"}
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
            </optgroup>
          </select>
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(t) => this._activeViewId = t.target.value}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => P`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? P`
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
      (t) => P`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? P`
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
        ${this._view === "aggregates" || this._view === "processes" ? P`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return P`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? P`
              ${this._view === "flows" ? P`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => P`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return P`<option
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
              ${this._view === "flows" ? P`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return P`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? P`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => P`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? P`
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
      (t) => P`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? P`<input
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
              ${this.owningProcessOf(this._selectedId) ? P`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? P`
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
      (t) => P`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? P`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => P`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      ${this._tilt ? P`<modux-tilt
            .scene=${e}
            .selectedId=${this._selectedId}
            .connectable=${this._view === "context-map" || this._view === "workflows"}
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
          ></modux-tilt>` : P`
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
      `}
      </div>
      <div class="hint">
        ${this._view === "context-map" ? P`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? P`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? P`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : P`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? P`
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
      ([t, i]) => P`
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
    return P`
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
    return P`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => P`
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
    return P`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${bl.map(
      (n) => P`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Pi[n].abbr}</span>
              <span class="name">${Pi[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
F.styles = ei`
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
F.PALETTE_NEW = [
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
  { type: "mcp-server", label: "Servidor MCP", child: !0, symbol: "robot", color: "#9333ea" }
];
H([
  ce({ attribute: !1 })
], F.prototype, "model", 2);
H([
  ce({ attribute: !1 })
], F.prototype, "layout", 2);
H([
  ce({ attribute: !1 })
], F.prototype, "diff", 2);
H([
  N()
], F.prototype, "_view", 2);
H([
  N()
], F.prototype, "_detail", 2);
H([
  N()
], F.prototype, "_relationType", 2);
H([
  N()
], F.prototype, "_relationPicker", 2);
H([
  N()
], F.prototype, "_extDepPicker", 2);
H([
  N()
], F.prototype, "_selectedId", 2);
H([
  N()
], F.prototype, "_paletteOpen", 2);
H([
  N()
], F.prototype, "_paletteFilter", 2);
H([
  N()
], F.prototype, "_paletteTab", 2);
H([
  N()
], F.prototype, "_fullscreen", 2);
H([
  N()
], F.prototype, "_tilt", 2);
H([
  N()
], F.prototype, "_helpOpen", 2);
H([
  N()
], F.prototype, "_newName", 2);
H([
  N()
], F.prototype, "_newModuleId", 2);
H([
  N()
], F.prototype, "_newArchetype", 2);
H([
  N()
], F.prototype, "_newTriggerAggId", 2);
H([
  N()
], F.prototype, "_newTriggerEvent", 2);
H([
  N()
], F.prototype, "_newTargetId", 2);
H([
  N()
], F.prototype, "_undoStack", 2);
H([
  N()
], F.prototype, "_redoStack", 2);
H([
  N()
], F.prototype, "_newStepName", 2);
H([
  N()
], F.prototype, "_newStepType", 2);
H([
  N()
], F.prototype, "_newStepRole", 2);
H([
  N()
], F.prototype, "_newStepDeadline", 2);
H([
  N()
], F.prototype, "_editStepRole", 2);
H([
  N()
], F.prototype, "_editStepDeadline", 2);
H([
  N()
], F.prototype, "_editStepComp", 2);
H([
  N()
], F.prototype, "_newStepUseCase", 2);
H([
  N()
], F.prototype, "_newStepEmits", 2);
H([
  N()
], F.prototype, "_editStepUseCase", 2);
H([
  N()
], F.prototype, "_editStepEmits", 2);
H([
  N()
], F.prototype, "_editStepAwaits", 2);
H([
  N()
], F.prototype, "_multi", 2);
H([
  N()
], F.prototype, "_newViewName", 2);
H([
  N()
], F.prototype, "_activeViewId", 2);
H([
  N()
], F.prototype, "_newRagSourceType", 2);
H([
  N()
], F.prototype, "_newRagSourceUri", 2);
H([
  N()
], F.prototype, "_addMemberKey", 2);
H([
  N()
], F.prototype, "_treeOpen", 2);
H([
  N()
], F.prototype, "_deletePicker", 2);
F = H([
  ii("modux-editor")
], F);
var Sl = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, ge = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Al(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Sl(t, i, s), s;
};
let ae = class extends De {
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
    ], t = (n) => ae.TYPE_LABELS[n] ?? n;
    return P`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: s, mark: o, cls: r }) => {
      const a = this._diff.changes.filter((l) => l.kind === n);
      return a.length ? P`
            <div class="diff-group">${s} (${a.length})</div>
            ${a.map(
        (l) => P`
                <div class="diff-row">
                  <span class="diff-mark ${r}">${o}</span>
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
    var s, o, r;
    const i = (s = this._workspace) == null ? void 0 : s.current;
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
            const p = await l.json();
            p != null && p.message && (c = p.message);
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
    const n = (o = this._workspace) == null ? void 0 : o.current;
    if (n && n !== i) {
      const a = ((r = this._workspace.solutions.find((l) => l.branch === n)) == null ? void 0 : r.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
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
        const r = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!r.ok) {
          let p = `El servidor rechazó el contrato (${r.status})`;
          try {
            const h = await r.json();
            h != null && h.message && (p = h.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        const { apiId: a } = await r.json(), l = s ? { kind: "set-api-publisher", id: a, targetId: s } : o ? { kind: "add-api-implementation", apiId: a, moduleId: o } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const c = await fetch(`${this.base}/model`);
        c.ok && (this._model = await c.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${a}`, "info");
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
    return this._error ? P`<div class="status error">modux editor: ${this._error}</div>` : this._model ? P`
      ${this._workspace ? P`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : P`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((s) => s.kind === n).length;
      return P`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? P`
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
      return P`
                      ${i === "EXPLORING" ? P`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? P`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? P`<button
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
      ${this._mergeFlow ? P`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => P`
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
      ${this._toast ? P`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : P`<div class="status">Cargando el modelo…</div>`;
  }
};
ae.styles = ei`
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
ae.TYPE_LABELS = {
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
], ae.prototype, "base", 2);
ge([
  N()
], ae.prototype, "_model", 2);
ge([
  N()
], ae.prototype, "_layout", 2);
ge([
  N()
], ae.prototype, "_error", 2);
ge([
  N()
], ae.prototype, "_saving", 2);
ge([
  N()
], ae.prototype, "_toast", 2);
ge([
  N()
], ae.prototype, "_workspace", 2);
ge([
  N()
], ae.prototype, "_creatingSolution", 2);
ge([
  N()
], ae.prototype, "_newSolutionName", 2);
ge([
  N()
], ae.prototype, "_diff", 2);
ge([
  N()
], ae.prototype, "_diffListOpen", 2);
ge([
  N()
], ae.prototype, "_mergeFlow", 2);
ae = ge([
  ii("modux-editor-connected")
], ae);
export {
  Cl as CONTAINER_HEADER,
  Ml as CONTAINER_INSET,
  ne as ModuxCanvas,
  F as ModuxEditor,
  ae as ModuxEditorConnected,
  Xs as aggregatesScene,
  Fe as apiImplNodeId,
  qe as apiOpOccurrenceId,
  vi as containerFit,
  Ns as containerMinSize,
  Vs as contextMapScene,
  zs as flowCoherence,
  so as flowsScene,
  Rt as normalizeViewLayout,
  ji as processesScene,
  Us as relationEdgeId,
  Ni as resolveOverlaps
};
