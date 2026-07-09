const Al = 34, Cl = 10;
function Ni(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const l = e[r], c = e[a], p = i.get(l.id), m = i.get(c.id), f = m.x - p.x, h = m.y - p.y, g = (l.w + c.w) / 2 + t - Math.abs(f), v = (l.h + c.h) / 2 + t - Math.abs(h);
        if (!(g <= 0 || v <= 0))
          if (o = !0, g < v) {
            const S = (f >= 0 ? 1 : -1) * g / 2;
            p.x -= S, m.x += S;
          } else {
            const S = (h >= 0 ? 1 : -1) * v / 2;
            p.y -= S, m.y += S;
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
}, Ke = 168, Ze = 56;
function qe(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ze(e, t) {
  return `apiop:${e}@${t}`;
}
const Gi = { compact: 0, coarse: 1, full: 2 };
function ji(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Gi[e ? t : n] > Gi[s] };
}
function Cn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: qe(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Mn = 34, Pn = 14, Ds = 14, ye = 108, ve = 32, Nn = 12, On = 10, _t = 2, Ls = _t * ye + (_t - 1) * Nn + 2 * Pn;
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
  const t = Math.max(1, Math.ceil(e / _t)), i = t * ve + (t - 1) * On;
  return { w: Ls, h: Mn + i + Ds };
}
function qt(e, t) {
  const i = e % _t, n = Math.floor(e / _t);
  return {
    x: -t.w / 2 + Pn + i * (ye + Nn) + ye / 2,
    y: -t.h / 2 + Mn + n * (ve + On) + ve / 2
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
    return [{ ...n, x: i.x, y: i.y, w: Ke, h: Ze }];
  if (r) {
    const c = new Map((e.apis ?? []).map((m) => [m.id, m])), p = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && c.has(m.apiId)).map((m) => {
      const f = c.get(m.apiId);
      return {
        id: qe(m.apiId, m.moduleId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((h) => ({
          id: ze(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (p.length > 0) {
      const m = l.filter((f) => f.kind !== "api-impl");
      return Rn(i, n, p, m, s, o);
    }
  }
  return gt(i, n, l, s, o);
}
function Rn(e, t, i, n, s, o, r = /* @__PURE__ */ new Set()) {
  const a = o[t.id] ?? Ii(i.length + n.length), l = i.map((h, g) => {
    const v = s[h.id] ?? qt(g, a), S = r.has(h.id) ? [] : h.ops, _ = o[h.id] ?? Ii(S.length), M = S.map((V, x) => s[V.id] ?? qt(x, _)), D = vi(
      { x: v.x, y: v.y },
      _,
      M.map((V) => ({ dx: V.x, dy: V.y, w: ye, h: ve }))
    );
    return { a: h, off: v, ops: S, opOffs: M, fit: D };
  }), c = n.map(
    (h, g) => s[h.id] ?? qt(i.length + g, a)
  ), p = Ni(
    [
      ...l.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, g) => ({
        id: h.id,
        x: c[g].x,
        y: c[g].y,
        w: ye,
        h: ve
      }))
    ],
    24
  );
  for (const h of l) {
    const g = p.get(h.a.id);
    g && (h.off = { x: h.off.x + (g.x - h.fit.x), y: h.off.y + (g.y - h.fit.y) }, h.fit = { ...h.fit, x: g.x, y: g.y });
  }
  n.forEach((h, g) => {
    const v = p.get(h.id);
    v && (c[g] = { x: v.x, y: v.y });
  });
  const m = vi(e, a, [
    ...l.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...c.map((h) => ({ dx: h.x, dy: h.y, w: ye, h: ve }))
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
      collapsible: h.a.ops.length > 0 || r.has(h.a.id),
      collapsed: r.has(h.a.id),
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((g, v) => {
      f.push({
        id: g.id,
        label: g.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[v].x,
        y: e.y + h.off.y + h.opOffs[v].y,
        w: ye,
        h: ve,
        tooltip: `${xi[h.a.opKind]}: ${g.name}`
      });
    });
  return n.forEach((h, g) => {
    const v = Tn[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + c[g].x,
      y: e.y + c[g].y,
      w: ye,
      h: ve,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${xi[h.kind]} ${h.name}`
    });
  }), f;
}
function gt(e, t, i, n, s) {
  const o = s[t.id] ?? Ii(i.length), r = i.map((m, f) => n[m.id] ?? qt(f, o)), a = Ni(
    i.map((m, f) => ({ id: m.id, x: r[f].x, y: r[f].y, w: ye, h: ve })),
    10
  );
  i.forEach((m, f) => {
    const h = a.get(m.id);
    h && (r[f] = { x: h.x, y: h.y });
  });
  const l = vi(
    e,
    o,
    r.map((m) => ({ dx: m.x, dy: m.y, w: ye, h: ve }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, p = i.map((m, f) => {
    const h = r[f], g = m.policy ? qs : Tn[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: ye,
      h: ve,
      symbol: g.symbol,
      fill: g.fill,
      stroke: g.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : xi[m.kind]} ${m.name}`
    };
  });
  return [c, ...p];
}
function Vs(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, r = i !== "contexts", a = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
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
  ], g = h.flatMap((d, E) => {
    const z = t[d.ref.id] ?? ut(E, h.length);
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
        x: z.x,
        y: z.y,
        w: Ke,
        h: Ze
      }];
    }
    if (d.proxy) {
      const j = d.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`
      };
      if (a && j.targetApiId) {
        const Ee = (e.apis ?? []).find((Ye) => Ye.id === j.targetApiId), Se = (Ee == null ? void 0 : Ee.operations) ?? [];
        if (Se.length > 0)
          return gt(
            z,
            ee,
            Se.map((Ye) => ({
              id: ze(Ye.id, j.id),
              name: Ye.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ee, x: z.x, y: z.y, w: Ke, h: Ze }];
    }
    if (d.api) {
      const j = d.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${j.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (s.has(j.id) ? !r : r) && j.operations.length > 0 ? gt(
        z,
        { ...ee, collapsible: !0, collapsed: !1 },
        j.operations.map(
          (Se) => ({ id: Se.id, name: Se.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ee,
        collapsible: j.operations.length > 0,
        collapsed: j.operations.length > 0,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Ze
      }];
    }
    if (d.external) {
      const j = d.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, Ee = c.filter((te) => te.publishedByExternalSystemId === j.id), Se = m.filter((te) => te.publishedByExternalSystemId === j.id), Ye = Se.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), ri = [
        ...(j.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(j.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(j.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], ai = Ee.length > 0 || Se.length > 0, di = ai || ri.length > 0, { form: Ot, collapsed: li } = ji(
        s.has(j.id),
        r ? "full" : ai ? "coarse" : "compact",
        ri.length > 0 || a && ai
      ), Wi = [
        ...Ye,
        ...Ot === "full" ? ri : []
      ], ci = a && Ot === "full" ? Se.filter((te) => {
        const lt = te.targetApiId ? (e.apis ?? []).find((de) => de.id === te.targetApiId) : void 0;
        return ((lt == null ? void 0 : lt.operations) ?? []).length > 0;
      }) : [];
      if (a && Ot === "full" && (Ee.length > 0 || ci.length > 0)) {
        const te = [
          ...Ee.map((de) => ({
            id: de.id,
            name: de.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${de.name} — API publicada por ${j.name}`,
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
                id: ze(Tt.id, de.id),
                name: Tt.name
              }))
            };
          })
        ], lt = new Set(ci.map((de) => de.id));
        return Rn(
          z,
          { ...ee, collapsible: !0, collapsed: li },
          te,
          Wi.filter((de) => !lt.has(de.id)),
          t,
          n,
          o
        );
      }
      const Bi = Ot === "compact" ? [] : [
        ...Ee.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Wi
      ];
      return Bi.length > 0 ? gt(
        z,
        { ...ee, collapsible: di, collapsed: li },
        Bi,
        t,
        n
      ) : [{
        ...ee,
        collapsible: di,
        collapsed: di && li,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Ze
      }];
    }
    const G = d.ref, K = G.subdomainType ?? "GENERIC", se = {
      id: G.id,
      label: G.name,
      kind: "module",
      symbol: "component",
      fill: Os[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${G.name} — subdominio ${K}`
    }, fe = Cn(e, G.id), at = (e.aggregates ?? []).some((j) => j.moduleId === G.id) || (G.useCases ?? []).length > 0 || (G.domainEvents ?? []).length > 0 || (G.applicationEvents ?? []).length > 0 || (G.readModels ?? []).length > 0 || (G.domainServices ?? []).length > 0 || (G.queryServices ?? []).length > 0, De = at || fe.length > 0, { form: dt, collapsed: je } = ji(
      s.has(G.id),
      r ? "full" : fe.length > 0 ? "coarse" : "compact",
      at
    );
    return dt === "full" && De ? Fs(
      e,
      G,
      z,
      { ...se, collapsible: !0, collapsed: je },
      t,
      n,
      a
    ) : dt === "coarse" && fe.length > 0 ? gt(
      z,
      { ...se, collapsible: De, collapsed: je },
      fe,
      t,
      n
    ) : [{
      ...se,
      collapsible: De,
      collapsed: De && je,
      x: z.x,
      y: z.y,
      w: Ke,
      h: Ze
    }];
  }), v = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, E) => {
    const z = t[d.id] ?? ut(h.length + E, v);
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
  }), (e.aiAgents ?? []).forEach((d, E) => {
    const z = t[d.id] ?? ut(h.length + (e.actors ?? []).length + E, v);
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
  }), (e.mcpGateways ?? []).forEach((d, E) => {
    const z = t[d.id] ?? ut(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + E,
      v
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
  const S = [];
  (e.rags ?? []).forEach((d, E) => {
    const z = t[d.id] ?? ut(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + E,
      v
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
    }), (d.contentSources ?? []).forEach((G, K) => {
      const se = `ragcs:${d.id}:${G.uri}`, fe = t[se] ?? { x: z.x + 170, y: z.y - 30 + K * 44 };
      g.push({
        id: se,
        label: G.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: fe.x,
        y: fe.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: G.type,
        tooltip: `${G.type}: ${G.uri}`
      }), S.push({
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
  }), g.sort((d, E) => (d.parentId ? 1 : 0) - (E.parentId ? 1 : 0));
  const _ = e.relations.map((d) => ({
    id: Us(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Ts[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), M = e.flows.map((d) => {
    var fe, at, De, dt, je, j;
    const E = zs(e, d), z = r ? e.modules.find((ee) => ee.id === d.sourceId) : void 0, G = ((fe = z == null ? void 0 : z.domainEvents) == null ? void 0 : fe.find((ee) => ee.name === d.triggerEvent)) ?? ((at = z == null ? void 0 : z.applicationEvents) == null ? void 0 : at.find((ee) => ee.name === d.triggerEvent)), K = r && d.readModelName ? (dt = (De = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : De.readModels) == null ? void 0 : dt.find((ee) => ee.name === d.readModelName) : void 0, se = r && d.targetUseCaseId ? (j = (je = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : je.useCases) == null ? void 0 : j.find((ee) => ee.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (G == null ? void 0 : G.id) ?? d.sourceId,
      targetId: (se == null ? void 0 : se.id) ?? (K == null ? void 0 : K.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Rs[E],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${E}`
    };
  }), D = new Map((e.apis ?? []).map((d) => [d.id, d])), V = new Set(e.modules.map((d) => d.id)), x = (e.apiImplementations ?? []).filter(
    (d) => D.has(d.apiId) && V.has(d.moduleId)
  ), w = new Set(g.map((d) => d.id)), b = r ? (e.emissions ?? []).filter((d) => w.has(d.sourceId) && w.has(d.domainEventId)).map((d) => ({
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
  })).filter(({ p: d, source: E }) => E && d.readModelId).filter(({ p: d, source: E }) => w.has(E) && w.has(d.readModelId)).map(({ p: d, source: E }) => ({
    id: `proj:${d.id}`,
    sourceId: E,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], R = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((E) => {
      const z = r && E.targetUseCaseId && w.has(E.targetUseCaseId) ? E.targetUseCaseId : E.targetModuleId && w.has(E.targetModuleId) ? E.targetModuleId : (E.targetUseCaseId && !r, null);
      if (!z) return [];
      const G = r && w.has(E.id) ? E.id : d.id;
      return w.has(G) ? [
        {
          id: `apiwire:${E.id}`,
          sourceId: G,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${E.name} la implementa ${z}`
        }
      ] : [];
    })
  ), A = r ? (e.useCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], T = r ? (e.aggregateCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], B = r ? (e.queryCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], Z = r ? (e.actorUses ?? []).filter((d) => w.has(d.actorId) && w.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], u = (e.actorExternalDependencies ?? []).filter((d) => w.has(d.actorId) && w.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), I = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), y = (d) => w.has(d) ? d : I.get(d) ?? d, k = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: y(d.targetId),
        cqrs: d.type === "CQRS"
      })).filter(
        (d) => w.has(d.sourceId) && w.has(d.targetId) && d.sourceId !== d.targetId
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
  ], N = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const E of d.useCases ?? []) N.set(E.id, d.id);
    for (const E of d.domainEvents ?? []) N.set(E.id, d.id);
    for (const E of d.applicationEvents ?? []) N.set(E.id, d.id);
  }
  const U = (d) => w.has(d) ? d : N.get(d) ?? d, C = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const E of d.domainEvents ?? []) C.set(E.name, E.id);
    for (const E of d.applicationEvents ?? []) C.set(E.name, E.id);
  }
  const L = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((E) => E.targetUseCaseId).map((E) => ({ sourceId: d.id, targetId: U(E.targetUseCaseId) }))
      ).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
      (e.workflows ?? []).filter((d) => d.triggerEvent && C.has(d.triggerEvent)).map((d) => ({
        sourceId: U(C.get(d.triggerEvent)),
        targetId: d.id,
        label: d.triggerEvent
      })).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
    for (const E of d.tables ?? []) Q.set(E.id, d.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((E) => ({
          sourceId: w.has(E) ? E : Q.get(E) ?? E,
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
  ], ce = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((E) => ({
          sourceId: y(E),
          targetId: d.id,
          name: d.name
        }))
      ).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
  ], ge = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((E) => ({ sourceId: E, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((E) => ({ sourceId: E, targetId: d.id, name: d.name }))
      ]).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
  ], ue = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: y(d.apiId) })).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
  ], we = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, rt = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((E) => E.id !== d.id && we(E) === d.triggerEvent).filter((E) => w.has(E.id) && w.has(d.id)).map((E) => ({
      id: `wfchain:${E.id}->${d.id}`,
      sourceId: E.id,
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
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: y(d.id), targetId: y(d.targetApiId) })).filter(
        (d) => w.has(d.sourceId) && w.has(d.targetId) && d.sourceId !== d.targetId
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
  ], ms = x.flatMap((d) => {
    const E = qe(d.apiId, d.moduleId);
    if (!w.has(E)) return [];
    const z = [];
    for (const G of (e.proxyApis ?? []).filter((K) => K.targetApiId === d.apiId)) {
      const K = y(G.id);
      w.has(K) && K !== E && z.push({
        id: `pxr:${K}->${E}`,
        sourceId: K,
        targetId: E,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return z;
  }), fs = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const E = (e.proxyApis ?? []).find((K) => K.id === d.proxyId);
    if (!(E != null && E.targetApiId)) return [];
    const z = ze(d.operationId, d.proxyId), G = d.targetSiteId === E.targetApiId ? E.targetApiId : qe(E.targetApiId, d.targetSiteId);
    return !w.has(z) || !w.has(G) ? [] : [{
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
        if (!w.has(d.externalSystemId)) return null;
        const E = (e.apis ?? []).find(
          (se) => se.operations.some((fe) => fe.id === d.operationId)
        );
        if (!E) return null;
        const z = d.siteId === E.id, G = z ? d.operationId : ze(d.operationId, d.siteId);
        let K = w.has(G) ? G : null;
        if (!K)
          if (z || (e.proxyApis ?? []).some((se) => se.id === d.siteId))
            K = y(d.siteId);
          else {
            const se = qe(E.id, d.siteId);
            K = w.has(se) ? se : d.siteId;
          }
        return !K || !w.has(K) || K === d.externalSystemId ? null : { u: d, target: K };
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
  ], ws = r ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!w.has(d.useCaseId)) return [];
    const E = w.has(ze(d.operationId, d.moduleId)) ? ze(d.operationId, d.moduleId) : w.has(qe(d.apiId, d.moduleId)) ? qe(d.apiId, d.moduleId) : w.has(y(d.moduleId)) ? y(d.moduleId) : null;
    return E ? [{
      id: `apiimplwire:${d.operationId}@${d.moduleId}`,
      sourceId: E,
      targetId: d.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], ys = r ? (e.agentUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], vs = (e.agentRags ?? []).filter((d) => w.has(d.agentId) && w.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), xs = r ? (e.rags ?? []).filter((d) => w.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((E) => w.has(E)).map((E) => ({
      id: `ragsrc:${d.id}->${E}`,
      sourceId: d.id,
      targetId: E,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], Is = r ? (e.agentExternalUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], _s = r ? (e.agentMcpUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.mcpServerId)).map((d) => ({
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
    ].filter((E) => w.has(d.id) && w.has(E)).map((E) => ({
      id: `gwx:${d.id}->${E}`,
      sourceId: d.id,
      targetId: E,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ks = (e.agentGatewayUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), $s = r ? (e.agentApiOpUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Es = r ? (e.agentQueryUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ss = (e.agentDelegations ?? []).filter((d) => w.has(d.agentId) && w.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), As = (e.actorAgentUses ?? []).filter((d) => w.has(d.actorId) && w.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Cs = r ? (e.agentTriggers ?? []).filter((d) => w.has(d.eventId) && w.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ms = r ? (e.externalCalls ?? []).filter((d) => w.has(d.externalSystemId) && w.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Ps = r ? (e.externalUseCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
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
      ..._,
      ...M,
      ...b,
      ...$,
      ...R,
      ...A,
      ...T,
      ...B,
      ...Z,
      ...u,
      ...k,
      ...hs,
      ...ms,
      ...fs,
      ...gs,
      ...ws,
      ...L,
      ...X,
      ...rt,
      ...ue,
      ...J,
      ...ce,
      ...ge,
      ...ys,
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
      ...S,
      ...Ms,
      ...Ps
    ]
  };
}
const Hs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ws = 176, Bs = 60, Gs = 140, js = 40;
function Ys(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const p = n.filter((f) => f.aggregateId === l.id).length, m = 140 + c * (170 + p * 60);
      t[l.id] = { x: r, y: m }, n.filter((f) => f.aggregateId === l.id).forEach((f, h) => {
        t[f.id] = { x: r + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Xs(e, t) {
  const i = Ys(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const p = s.get(c.moduleId), m = (p == null ? void 0 : p.subdomainType) ?? "GENERIC", f = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: f.x,
      y: f.y,
      w: Ws,
      h: Bs,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Hs[m],
      stroke: "#64748b",
      badge: p ? `${p.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${p ? ` — módulo ${p.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: Gs,
      h: js,
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
    const c = 120 + l * 130, p = Ks[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const S = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: S.x,
        y: S.y,
        w: Zs,
        h: Qs,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${a.id}`, h = t[f] ?? { x: 470, y: c };
    n.push({
      id: f,
      label: a.name,
      x: h.x,
      y: h.y,
      w: Js,
      h: eo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: p,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const g = no(e, a), v = `tgt:${g.id}`;
    if (!o.has(v)) {
      o.add(v);
      const S = t[v] ?? { x: 790, y: c };
      n.push({
        id: v,
        label: g.label,
        x: S.x,
        y: S.y,
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
      sourceId: m,
      targetId: f,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: f,
      targetId: v,
      kind: "flow-delivery",
      color: p,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const oo = 190, ro = 56, ui = 170, ao = 52;
function Yi(e, t) {
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
    if (o.steps.forEach((p, m) => {
      const f = p.type === "HUMAN", h = t[p.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: p.id,
        label: p.name,
        x: h.x,
        y: h.y,
        w: ui,
        h: ao,
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
        const g = `comp:${p.id}`, v = t[g] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: g,
          label: p.compensationUseCaseId,
          x: v.x,
          y: v.y,
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
      const p = `done:${o.id}`, m = t[p] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: p,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
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
const { is: uo, defineProperty: po, getOwnPropertyDescriptor: ho, getOwnPropertyNames: mo, getOwnPropertySymbols: fo, getPrototypeOf: go } = Object, Oe = globalThis, Zi = Oe.trustedTypes, wo = Zi ? Zi.emptyScript : "", pi = Oe.reactiveElementPolyfillSupport, vt = (e, t) => e, Gt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? wo : null;
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
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Oe.litPropertyMetadata ?? (Oe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Qe = class extends HTMLElement {
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
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[vt("elementProperties")] = /* @__PURE__ */ new Map(), Qe[vt("finalized")] = /* @__PURE__ */ new Map(), pi == null || pi({ ReactiveElement: Qe }), (Oe.reactiveElementVersions ?? (Oe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, Ji = (e) => e, jt = xt.trustedTypes, en = jt ? jt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ln = "$lit$", Ne = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + Ne, yo = `<${Un}>`, Be = document, bt = () => Be.createComment(""), kt = (e) => e === null || typeof e != "object" && typeof e != "function", Di = Array.isArray, vo = (e) => Di(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", hi = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tn = /-->/g, nn = />/g, Le = RegExp(`>|${hi}(?:([^\\s"'>=/]+)(${hi}*=${hi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), sn = /'/g, on = /"/g, zn = /^(?:script|style|textarea|title)$/i, qn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), P = qn(1), W = qn(2), tt = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), rn = /* @__PURE__ */ new WeakMap(), Fe = Be.createTreeWalker(Be, 129);
function Fn(e, t) {
  if (!Di(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return en !== void 0 ? en.createHTML(t) : t;
}
const xo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = pt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, p, m = -1, f = 0;
    for (; f < l.length && (r.lastIndex = f, p = r.exec(l), p !== null); ) f = r.lastIndex, r === pt ? p[1] === "!--" ? r = tn : p[1] !== void 0 ? r = nn : p[2] !== void 0 ? (zn.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = Le) : p[3] !== void 0 && (r = Le) : r === Le ? p[0] === ">" ? (r = s ?? pt, m = -1) : p[1] === void 0 ? m = -2 : (m = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? Le : p[3] === '"' ? on : sn) : r === on || r === sn ? r = Le : r === tn || r === nn ? r = pt : (r = Le, s = void 0);
    const h = r === Le && e[a + 1].startsWith("/>") ? " " : "";
    o += r === pt ? l + yo : m >= 0 ? (n.push(c), l.slice(0, m) + Ln + l.slice(m) + Ne + h) : l + Ne + (m === -2 ? a : h);
  }
  return [Fn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class $t {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = xo(t, i);
    if (this.el = $t.createElement(c, n), Fe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Fe.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Ln)) {
          const f = p[r++], h = s.getAttribute(m).split(Ne), g = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: g[2], strings: h, ctor: g[1] === "." ? _o : g[1] === "?" ? bo : g[1] === "@" ? ko : ti }), s.removeAttribute(m);
        } else m.startsWith(Ne) && (l.push({ type: 6, index: o }), s.removeAttribute(m));
        if (zn.test(s.tagName)) {
          const m = s.textContent.split(Ne), f = m.length - 1;
          if (f > 0) {
            s.textContent = jt ? jt.emptyScript : "";
            for (let h = 0; h < f; h++) s.append(m[h], bt()), Fe.nextNode(), l.push({ type: 2, index: ++o });
            s.append(m[f], bt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Un) l.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Ne, m + 1)) !== -1; ) l.push({ type: 7, index: o }), m += Ne.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Be.createElement("template");
    return n.innerHTML = t, n;
  }
}
function it(e, t, i = e, n) {
  var r, a;
  if (t === tt) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = kt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = it(e, s._$AS(e, t.values), s, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Be).importNode(i, !0);
    Fe.currentNode = s;
    let o = Fe.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Mt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new $o(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = Fe.nextNode(), r++);
    }
    return Fe.currentNode = Be, s;
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
    t = it(this, t, i), kt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Be.createTextNode(t)), this._$AH = t;
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
    if (o === void 0) t = it(this, t, i, 0), r = !kt(t) || t !== this._$AH && t !== tt, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = it(this, a[n + l], i, l), c === tt && (c = this._$AH[l]), r || (r = !kt(c) || c !== this._$AH[l]), c === oe ? t = oe : t !== oe && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
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
    if ((t = it(this, t, i, 0) ?? oe) === tt) return;
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
    it(this, t);
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
const He = globalThis;
class Te extends Qe {
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
    return tt;
  }
}
var An;
Te._$litElement$ = !0, Te.finalized = !0, (An = He.litElementHydrateSupport) == null || An.call(He, { LitElement: Te });
const fi = He.litElementPolyfillSupport;
fi == null || fi({ LitElement: Te });
(He.litElementVersions ?? (He.litElementVersions = [])).push("4.2.2");
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
function _e(e) {
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
function O(e) {
  return _e({ ...e, state: !0, attribute: !1 });
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
  return new he(n, this._parents);
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
  return new he(n, s);
}
function Wn(e) {
  return function() {
    return this.matches(e);
  };
}
function Bn(e) {
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
  return this.select(e == null ? zo : Uo(typeof e == "function" ? e : Bn(e)));
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
function Wo(e) {
  return this.selectAll(e == null ? Vo : Ho(typeof e == "function" ? e : Bn(e)));
}
function Bo(e) {
  typeof e != "function" && (e = Wn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new he(n, this._parents);
}
function Gn(e) {
  return new Array(e.length);
}
function Go() {
  return new he(this._enter || this._groups.map(Gn), this._parents);
}
function Yt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Yt.prototype = {
  constructor: Yt,
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
function jo(e) {
  return function() {
    return e;
  };
}
function Yo(e, t, i, n, s, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new Yt(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (s[r] = a);
}
function Xo(e, t, i, n, s, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), p = t.length, m = o.length, f = new Array(p), h;
  for (a = 0; a < p; ++a)
    (l = t[a]) && (f[a] = h = r.call(l, l.__data__, a, t) + "", c.has(h) ? s[a] = l : c.set(h, l));
  for (a = 0; a < m; ++a)
    h = r.call(e, o[a], a, o) + "", (l = c.get(h)) ? (n[a] = l, l.__data__ = o[a], c.delete(h)) : i[a] = new Yt(e, o[a]);
  for (a = 0; a < p; ++a)
    (l = t[a]) && c.get(f[a]) === l && (s[a] = l);
}
function Ko(e) {
  return e.__data__;
}
function Zo(e, t) {
  if (!arguments.length) return Array.from(this, Ko);
  var i = t ? Xo : Yo, n = this._parents, s = this._groups;
  typeof e != "function" && (e = jo(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var p = n[c], m = s[c], f = m.length, h = Qo(e.call(p, p && p.__data__, c, n)), g = h.length, v = a[c] = new Array(g), S = r[c] = new Array(g), _ = l[c] = new Array(f);
    i(p, m, v, S, _, h, t);
    for (var M = 0, D = 0, V, x; M < g; ++M)
      if (V = v[M]) {
        for (M >= D && (D = M + 1); !(x = S[D]) && ++D < g; ) ;
        V._next = x || null;
      }
  }
  return r = new he(r, n), r._enter = a, r._exit = l, r;
}
function Qo(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Jo() {
  return new he(this._exit || this._groups.map(Gn), this._parents);
}
function er(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function tr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), l = 0; l < r; ++l)
    for (var c = i[l], p = n[l], m = c.length, f = a[l] = new Array(m), h, g = 0; g < m; ++g)
      (h = c[g] || p[g]) && (f[g] = h);
  for (; l < s; ++l)
    a[l] = i[l];
  return new he(a, this._parents);
}
function ir() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function nr(e) {
  e || (e = sr);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, l = s[o] = new Array(a), c, p = 0; p < a; ++p)
      (c = r[p]) && (l[p] = c);
    l.sort(t);
  }
  return new he(s, this._parents).order();
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
function wr(e, t) {
  var i = ni(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? pr : ur : typeof t == "function" ? i.local ? gr : fr : i.local ? mr : hr)(i, t));
}
function jn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function yr(e) {
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
  return arguments.length > 1 ? this.each((t == null ? yr : typeof t == "function" ? xr : vr)(e, t, i ?? "")) : nt(this.node(), e);
}
function nt(e, t) {
  return e.style.getPropertyValue(t) || jn(e).getComputedStyle(e, null).getPropertyValue(t);
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
function Yn(e) {
  return e.trim().split(/^|\s+/);
}
function Ui(e) {
  return e.classList || new Xn(e);
}
function Xn(e) {
  this._node = e, this._names = Yn(e.getAttribute("class") || "");
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
  var i = Yn(e + "");
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
function Wr(e, t) {
  var i = typeof e == "function" ? e : Vn(e), n = t == null ? Hr : typeof t == "function" ? t : Li(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Br() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Gr() {
  return this.each(Br);
}
function jr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Yr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Xr(e) {
  return this.select(e ? Yr : jr);
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
  var n = jn(e), s = n.CustomEvent;
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
function he(e, t) {
  this._groups = e, this._parents = t;
}
function Pt() {
  return new he([[document.documentElement]], Jn);
}
function ra() {
  return this;
}
he.prototype = Pt.prototype = {
  constructor: he,
  select: No,
  selectAll: Do,
  selectChild: qo,
  selectChildren: Wo,
  filter: Bo,
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
  attr: wr,
  style: Ir,
  property: $r,
  classed: Cr,
  text: Or,
  html: Lr,
  raise: zr,
  lower: Fr,
  append: Vr,
  insert: Wr,
  remove: Gr,
  clone: Xr,
  datum: Kr,
  on: ta,
  dispatch: sa,
  [Symbol.iterator]: oa
};
function xe(e) {
  return typeof e == "string" ? new he([[document.querySelector(e)]], [document.documentElement]) : new he([[e]], Jn);
}
function aa(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ue(e, t) {
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
  var t = e.document.documentElement, i = xe(e).on("dragstart.drag", ki, bi);
  "onselectstart" in t ? i.on("selectstart.drag", ki, bi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function pa(e, t) {
  var i = e.document.documentElement, n = xe(e).on("dragstart.drag", null);
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
var Et = 0.7, Xt = 1 / Et, et = "\\s*([+-]?\\d+)\\s*", St = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ha = /^#([0-9a-f]{3,8})$/, ma = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), fa = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), ga = new RegExp(`^rgba\\(${et},${et},${et},${St}\\)$`), wa = new RegExp(`^rgba\\(${ke},${ke},${ke},${St}\\)$`), ya = new RegExp(`^hsl\\(${St},${ke},${ke}\\)$`), va = new RegExp(`^hsla\\(${St},${ke},${ke},${St}\\)$`), ln = {
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
  return e = (e + "").trim().toLowerCase(), (t = ha.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? pn(t) : i === 3 ? new le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Dt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Dt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ma.exec(e)) ? new le(t[1], t[2], t[3], 1) : (t = fa.exec(e)) ? new le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ga.exec(e)) ? Dt(t[1], t[2], t[3], t[4]) : (t = wa.exec(e)) ? Dt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ya.exec(e)) ? fn(t[1], t[2] / 100, t[3] / 100, 1) : (t = va.exec(e)) ? fn(t[1], t[2] / 100, t[3] / 100, t[4]) : ln.hasOwnProperty(e) ? pn(ln[e]) : e === "transparent" ? new le(NaN, NaN, NaN, 0) : null;
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
  return `#${Ve(this.r)}${Ve(this.g)}${Ve(this.b)}`;
}
function ba() {
  return `#${Ve(this.r)}${Ve(this.g)}${Ve(this.b)}${Ve((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
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
function Ve(e) {
  return e = We(e), (e < 16 ? "0" : "") + e.toString(16);
}
function fn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ie(e, t, i, n);
}
function ts(e) {
  if (e instanceof Ie) return new Ie(e.h, e.s, e.l, e.opacity);
  if (e instanceof Nt || (e = At(e)), !e) return new Ie();
  if (e instanceof Ie) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, l = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= l < 0.5 ? o + s : 2 - o - s, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new Ie(r, a, l, e.opacity);
}
function ka(e, t, i, n) {
  return arguments.length === 1 ? ts(e) : new Ie(e, t, i, n ?? 1);
}
function Ie(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
qi(Ie, ka, es(Nt, {
  brighter(e) {
    return e = e == null ? Xt : Math.pow(Xt, e), new Ie(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Et : Math.pow(Et, e), new Ie(this.h, this.s, this.l * e, this.opacity);
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
    return new Ie(gn(this.h), Lt(this.s), Lt(this.l), Kt(this.opacity));
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
const wn = (function e(t) {
  var i = Sa(t);
  function n(s, o) {
    var r = i((s = $i(s)).r, (o = $i(o)).r), a = i(s.g, o.g), l = i(s.b, o.b), c = ns(s.opacity, o.opacity);
    return function(p) {
      return s.r = r(p), s.g = a(p), s.b = l(p), s.opacity = c(p), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Pe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ei = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, wi = new RegExp(Ei.source, "g");
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
  var i = Ei.lastIndex = wi.lastIndex = 0, n, s, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (n = Ei.exec(e)) && (s = wi.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, l.push({ i: r, x: Pe(n, s) })), i = wi.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? Ca(l[0].x) : Aa(t) : (t = l.length, function(c) {
    for (var p = 0, m; p < t; ++p) a[(m = l[p]).i] = m.x(c);
    return a.join("");
  });
}
var yn = 180 / Math.PI, Si = {
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
    rotate: Math.atan2(t, e) * yn,
    skewX: Math.atan(l) * yn,
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
  function o(c, p, m, f, h, g) {
    if (c !== m || p !== f) {
      var v = h.push("translate(", null, t, null, i);
      g.push({ i: v - 4, x: Pe(c, m) }, { i: v - 2, x: Pe(p, f) });
    } else (m || f) && h.push("translate(" + m + t + f + i);
  }
  function r(c, p, m, f) {
    c !== p ? (c - p > 180 ? p += 360 : p - c > 180 && (c += 360), f.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Pe(c, p) })) : p && m.push(s(m) + "rotate(" + p + n);
  }
  function a(c, p, m, f) {
    c !== p ? f.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Pe(c, p) }) : p && m.push(s(m) + "skewX(" + p + n);
  }
  function l(c, p, m, f, h, g) {
    if (c !== m || p !== f) {
      var v = h.push(s(h) + "scale(", null, ",", null, ")");
      g.push({ i: v - 4, x: Pe(c, m) }, { i: v - 2, x: Pe(p, f) });
    } else (m !== 1 || f !== 1) && h.push(s(h) + "scale(" + m + "," + f + ")");
  }
  return function(c, p) {
    var m = [], f = [];
    return c = e(c), p = e(p), o(c.translateX, c.translateY, p.translateX, p.translateY, m, f), r(c.rotate, p.rotate, m, f), a(c.skewX, p.skewX, m, f), l(c.scaleX, c.scaleY, p.scaleX, p.scaleY, m, f), c = p = null, function(h) {
      for (var g = -1, v = f.length, S; ++g < v; ) m[(S = f[g]).i] = S.x(h);
      return m.join("");
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
    var a = o[0], l = o[1], c = o[2], p = r[0], m = r[1], f = r[2], h = p - a, g = m - l, v = h * h + g * g, S, _;
    if (v < Ra)
      _ = Math.log(f / c) / t, S = function(b) {
        return [
          a + b * h,
          l + b * g,
          c * Math.exp(t * b * _)
        ];
      };
    else {
      var M = Math.sqrt(v), D = (f * f - c * c + n * v) / (2 * c * i * M), V = (f * f - c * c - n * v) / (2 * f * i * M), x = Math.log(Math.sqrt(D * D + 1) - D), w = Math.log(Math.sqrt(V * V + 1) - V);
      _ = (w - x) / t, S = function(b) {
        var $ = b * _, R = vn(x), A = c / (i * M) * (R * La(t * $ + x) - Da(x));
        return [
          a + A * h,
          l + A * g,
          c * R / vn(t * $ + x)
        ];
      };
    }
    return S.duration = _ * 1e3 * t / Math.SQRT2, S;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, l = a * a;
    return e(r, a, l);
  }, s;
})(Math.SQRT2, 2, 4);
var st = 0, wt = 0, ht = 0, rs = 1e3, Zt, yt, Qt = 0, Ge = 0, si = 0, Ct = typeof performance == "object" && performance.now ? performance : Date, as = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Fi() {
  return Ge || (as(za), Ge = Ct.now() + si);
}
function za() {
  Ge = 0;
}
function Jt() {
  this._call = this._time = this._next = null;
}
Jt.prototype = ds.prototype = {
  constructor: Jt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Fi() : +i) + (t == null ? 0 : +t), !this._next && yt !== this && (yt ? yt._next = this : Zt = this, yt = this), this._call = e, this._time = i, Ai();
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
  Fi(), ++st;
  for (var e = Zt, t; e; )
    (t = Ge - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --st;
}
function xn() {
  Ge = (Qt = Ct.now()) + si, st = wt = 0;
  try {
    qa();
  } finally {
    st = 0, Va(), Ge = 0;
  }
}
function Fa() {
  var e = Ct.now(), t = e - Qt;
  t > rs && (si -= t, Qt = e);
}
function Va() {
  for (var e, t = Zt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Zt = i);
  yt = e, Ai(n);
}
function Ai(e) {
  if (!st) {
    wt && (wt = clearTimeout(wt));
    var t = e - Ge;
    t > 24 ? (e < 1 / 0 && (wt = setTimeout(xn, e - Ct.now() - si)), ht && (ht = clearInterval(ht))) : (ht || (Qt = Ct.now(), ht = setInterval(Fa, rs)), st = 1, as(xn));
  }
}
function In(e, t, i) {
  var n = new Jt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Ha = zi("start", "end", "cancel", "interrupt"), Wa = [], ls = 0, _n = 1, Ci = 2, Ht = 3, bn = 4, Mi = 5, Wt = 6;
function oi(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Ba(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Ha,
    tween: Wa,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ls
  });
}
function Vi(e, t) {
  var i = be(e, t);
  if (i.state > ls) throw new Error("too late; already scheduled");
  return i;
}
function $e(e, t) {
  var i = be(e, t);
  if (i.state > Ht) throw new Error("too late; already running");
  return i;
}
function be(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Ba(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = ds(o, 0, i.time);
  function o(c) {
    i.state = _n, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var p, m, f, h;
    if (i.state !== _n) return l();
    for (p in n)
      if (h = n[p], h.name === i.name) {
        if (h.state === Ht) return In(r);
        h.state === bn ? (h.state = Wt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[p]) : +p < t && (h.state = Wt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[p]);
      }
    if (In(function() {
      i.state === Ht && (i.state = bn, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Ci, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Ci) {
      for (i.state = Ht, s = new Array(f = i.tween.length), p = 0, m = -1; p < f; ++p)
        (h = i.tween[p].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = h);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var p = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Mi, 1), m = -1, f = s.length; ++m < f; )
      s[m].call(e, p);
    i.state === Mi && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Wt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Bt(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Ci && n.state < Mi, n.state = Wt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Ga(e) {
  return this.each(function() {
    Bt(this, e);
  });
}
function ja(e, t) {
  var i, n;
  return function() {
    var s = $e(this, e), o = s.tween;
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
function Ya(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = $e(this, e), r = o.tween;
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
    for (var n = be(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? ja : Ya)(i, e, t));
}
function Hi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = $e(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return be(s, n).value[t];
  };
}
function cs(e, t) {
  var i;
  return (typeof t == "number" ? Pe : t instanceof At ? wn : (i = At(t)) ? (t = i, wn) : Ma)(e, t);
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
  return arguments.length ? this.each((typeof e == "function" ? dd : ld)(t, e)) : be(this.node(), t).delay;
}
function ud(e, t) {
  return function() {
    $e(this, e).duration = +t.apply(this, arguments);
  };
}
function pd(e, t) {
  return t = +t, function() {
    $e(this, e).duration = t;
  };
}
function hd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ud : pd)(t, e)) : be(this.node(), t).duration;
}
function md(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    $e(this, e).ease = t;
  };
}
function fd(e) {
  var t = this._id;
  return arguments.length ? this.each(md(t, e)) : be(this.node(), t).ease;
}
function gd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    $e(this, e).ease = i;
  };
}
function wd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(gd(this._id, e));
}
function yd(e) {
  typeof e != "function" && (e = Wn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new Me(n, this._parents, this._name, this._id);
}
function vd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var l = t[a], c = i[a], p = l.length, m = r[a] = new Array(p), f, h = 0; h < p; ++h)
      (f = l[h] || c[h]) && (m[h] = f);
  for (; a < n; ++a)
    r[a] = t[a];
  return new Me(r, this._parents, this._name, this._id);
}
function xd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Id(e, t, i) {
  var n, s, o = xd(t) ? Vi : $e;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function _d(e, t) {
  var i = this._id;
  return arguments.length < 2 ? be(this.node(), i).on.on(e) : this.each(Id(i, e, t));
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
    for (var a = n[r], l = a.length, c = o[r] = new Array(l), p, m, f = 0; f < l; ++f)
      (p = a[f]) && (m = e.call(p, p.__data__, f, a)) && ("__data__" in p && (m.__data__ = p.__data__), c[f] = m, oi(c[f], t, i, f, c, be(p, i)));
  return new Me(o, this._parents, t, i);
}
function Ed(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Hn(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var l = n[a], c = l.length, p, m = 0; m < c; ++m)
      if (p = l[m]) {
        for (var f = e.call(p, p.__data__, m, l), h, g = be(p, i), v = 0, S = f.length; v < S; ++v)
          (h = f[v]) && oi(h, t, i, v, f, g);
        o.push(f), r.push(p);
      }
  return new Me(o, r, t, i);
}
var Sd = Pt.prototype.constructor;
function Ad() {
  return new Sd(this._groups, this._parents);
}
function Cd(e, t) {
  var i, n, s;
  return function() {
    var o = nt(this, e), r = (this.style.removeProperty(e), nt(this, e));
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
    var r = nt(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Pd(e, t, i) {
  var n, s, o;
  return function() {
    var r = nt(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), nt(this, e))), r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a));
  };
}
function Nd(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = $e(this, e), c = l.on, p = l.value[o] == null ? a || (a = us(t)) : void 0;
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
        var p = be(l, t);
        oi(l, e, i, c, r, {
          time: p.time + p.delay + p.duration,
          delay: 0,
          duration: p.duration,
          ease: p.ease
        });
      }
  return new Me(n, this._parents, e, i);
}
function Wd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = $e(this, n), p = c.on;
      p !== e && (t = (e = p).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Bd = 0;
function Me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function ps() {
  return ++Bd;
}
var Ae = Pt.prototype;
Me.prototype = {
  constructor: Me,
  select: $d,
  selectAll: Ed,
  selectChild: Ae.selectChild,
  selectChildren: Ae.selectChildren,
  filter: yd,
  merge: vd,
  selection: Ad,
  transition: Hd,
  call: Ae.call,
  nodes: Ae.nodes,
  node: Ae.node,
  size: Ae.size,
  empty: Ae.empty,
  each: Ae.each,
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
  easeVarying: wd,
  end: Wd,
  [Symbol.iterator]: Ae[Symbol.iterator]
};
function Gd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var jd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Gd
};
function Yd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Xd(e) {
  var t, i;
  e instanceof Me ? (t = e._id, e = e._name) : (t = ps(), (i = jd).time = Fi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && oi(l, e, t, c, r, i || Yd(l, t));
  return new Me(n, this._parents, e, t);
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
function Ce(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Ce.prototype = {
  constructor: Ce,
  scale: function(e) {
    return e === 1 ? this : new Ce(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Ce(this.k, this.x + this.k * e, this.y + this.k * t);
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
var It = new Ce(1, 0, 0);
Ce.prototype;
function yi(e) {
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
  var e = Zd, t = Qd, i = tl, n = Jd, s = el, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = Ua, c = zi("start", "zoom", "end"), p, m, f, h = 500, g = 150, v = 0, S = 10;
  function _(u) {
    u.property("__zoom", kn).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", A).filter(s).on("touchstart.zoom", T).on("touchmove.zoom", B).on("touchend.zoom touchcancel.zoom", Z).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(u, I, y, k) {
    var N = u.selection ? u.selection() : u;
    N.property("__zoom", kn), u !== N ? x(u, I, y, k) : N.interrupt().each(function() {
      w(this, arguments).event(k).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, _.scaleBy = function(u, I, y, k) {
    _.scaleTo(u, function() {
      var N = this.__zoom.k, U = typeof I == "function" ? I.apply(this, arguments) : I;
      return N * U;
    }, y, k);
  }, _.scaleTo = function(u, I, y, k) {
    _.transform(u, function() {
      var N = t.apply(this, arguments), U = this.__zoom, C = y == null ? V(N) : typeof y == "function" ? y.apply(this, arguments) : y, L = U.invert(C), X = typeof I == "function" ? I.apply(this, arguments) : I;
      return i(D(M(U, X), C, L), N, r);
    }, y, k);
  }, _.translateBy = function(u, I, y, k) {
    _.transform(u, function() {
      return i(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof y == "function" ? y.apply(this, arguments) : y
      ), t.apply(this, arguments), r);
    }, null, k);
  }, _.translateTo = function(u, I, y, k, N) {
    _.transform(u, function() {
      var U = t.apply(this, arguments), C = this.__zoom, L = k == null ? V(U) : typeof k == "function" ? k.apply(this, arguments) : k;
      return i(It.translate(L[0], L[1]).scale(C.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof y == "function" ? -y.apply(this, arguments) : -y
      ), U, r);
    }, k, N);
  };
  function M(u, I) {
    return I = Math.max(o[0], Math.min(o[1], I)), I === u.k ? u : new Ce(I, u.x, u.y);
  }
  function D(u, I, y) {
    var k = I[0] - y[0] * u.k, N = I[1] - y[1] * u.k;
    return k === u.x && N === u.y ? u : new Ce(u.k, k, N);
  }
  function V(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function x(u, I, y, k) {
    u.on("start.zoom", function() {
      w(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      w(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var N = this, U = arguments, C = w(N, U).event(k), L = t.apply(N, U), X = y == null ? V(L) : typeof y == "function" ? y.apply(N, U) : y, Q = Math.max(L[1][0] - L[0][0], L[1][1] - L[0][1]), J = N.__zoom, ce = typeof I == "function" ? I.apply(N, U) : I, ge = l(J.invert(X).concat(Q / J.k), ce.invert(X).concat(Q / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var we = ge(ue), rt = Q / we[2];
          ue = new Ce(rt, X[0] - we[0] * rt, X[1] - we[1] * rt);
        }
        C.zoom(null, ue);
      };
    });
  }
  function w(u, I, y) {
    return !y && u.__zooming || new b(u, I);
  }
  function b(u, I) {
    this.that = u, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, I), this.taps = 0;
  }
  b.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, I) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var I = xe(this.that).datum();
      c.call(
        u,
        this.that,
        new Kd(u, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: c
        }),
        I
      );
    }
  };
  function $(u, ...I) {
    if (!e.apply(this, arguments)) return;
    var y = w(this, I).event(u), k = this.__zoom, N = Math.max(o[0], Math.min(o[1], k.k * Math.pow(2, n.apply(this, arguments)))), U = Ue(u);
    if (y.wheel)
      (y.mouse[0][0] !== U[0] || y.mouse[0][1] !== U[1]) && (y.mouse[1] = k.invert(y.mouse[0] = U)), clearTimeout(y.wheel);
    else {
      if (k.k === N) return;
      y.mouse = [U, k.invert(U)], Bt(this), y.start();
    }
    mt(u), y.wheel = setTimeout(C, g), y.zoom("mouse", i(D(M(k, N), y.mouse[0], y.mouse[1]), y.extent, r));
    function C() {
      y.wheel = null, y.end();
    }
  }
  function R(u, ...I) {
    if (f || !e.apply(this, arguments)) return;
    var y = u.currentTarget, k = w(this, I, !0).event(u), N = xe(u.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", Q, !0), U = Ue(u, y), C = u.clientX, L = u.clientY;
    ua(u.view), yi(u), k.mouse = [U, this.__zoom.invert(U)], Bt(this), k.start();
    function X(J) {
      if (mt(J), !k.moved) {
        var ce = J.clientX - C, ge = J.clientY - L;
        k.moved = ce * ce + ge * ge > v;
      }
      k.event(J).zoom("mouse", i(D(k.that.__zoom, k.mouse[0] = Ue(J, y), k.mouse[1]), k.extent, r));
    }
    function Q(J) {
      N.on("mousemove.zoom mouseup.zoom", null), pa(J.view, k.moved), mt(J), k.event(J).end();
    }
  }
  function A(u, ...I) {
    if (e.apply(this, arguments)) {
      var y = this.__zoom, k = Ue(u.changedTouches ? u.changedTouches[0] : u, this), N = y.invert(k), U = y.k * (u.shiftKey ? 0.5 : 2), C = i(D(M(y, U), k, N), t.apply(this, I), r);
      mt(u), a > 0 ? xe(this).transition().duration(a).call(x, C, k, u) : xe(this).call(_.transform, C, k, u);
    }
  }
  function T(u, ...I) {
    if (e.apply(this, arguments)) {
      var y = u.touches, k = y.length, N = w(this, I, u.changedTouches.length === k).event(u), U, C, L, X;
      for (yi(u), C = 0; C < k; ++C)
        L = y[C], X = Ue(L, this), X = [X, this.__zoom.invert(X), L.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== X[2] && (N.touch1 = X, N.taps = 0) : (N.touch0 = X, U = !0, N.taps = 1 + !!p);
      p && (p = clearTimeout(p)), U && (N.taps < 2 && (m = X[0], p = setTimeout(function() {
        p = null;
      }, h)), Bt(this), N.start());
    }
  }
  function B(u, ...I) {
    if (this.__zooming) {
      var y = w(this, I).event(u), k = u.changedTouches, N = k.length, U, C, L, X;
      for (mt(u), U = 0; U < N; ++U)
        C = k[U], L = Ue(C, this), y.touch0 && y.touch0[2] === C.identifier ? y.touch0[0] = L : y.touch1 && y.touch1[2] === C.identifier && (y.touch1[0] = L);
      if (C = y.that.__zoom, y.touch1) {
        var Q = y.touch0[0], J = y.touch0[1], ce = y.touch1[0], ge = y.touch1[1], ue = (ue = ce[0] - Q[0]) * ue + (ue = ce[1] - Q[1]) * ue, we = (we = ge[0] - J[0]) * we + (we = ge[1] - J[1]) * we;
        C = M(C, Math.sqrt(ue / we)), L = [(Q[0] + ce[0]) / 2, (Q[1] + ce[1]) / 2], X = [(J[0] + ge[0]) / 2, (J[1] + ge[1]) / 2];
      } else if (y.touch0) L = y.touch0[0], X = y.touch0[1];
      else return;
      y.zoom("touch", i(D(C, L, X), y.extent, r));
    }
  }
  function Z(u, ...I) {
    if (this.__zooming) {
      var y = w(this, I).event(u), k = u.changedTouches, N = k.length, U, C;
      for (yi(u), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), U = 0; U < N; ++U)
        C = k[U], y.touch0 && y.touch0[2] === C.identifier ? delete y.touch0 : y.touch1 && y.touch1[2] === C.identifier && delete y.touch1;
      if (y.touch1 && !y.touch0 && (y.touch0 = y.touch1, delete y.touch1), y.touch0) y.touch0[1] = this.__zoom.invert(y.touch0[0]);
      else if (y.end(), y.taps === 2 && (C = Ue(C, this), Math.hypot(m[0] - C[0], m[1] - C[1]) < S)) {
        var L = xe(this).on("dblclick.zoom");
        L && L.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : zt(+u), _) : n;
  }, _.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : zt(!!u), _) : e;
  }, _.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : zt(!!u), _) : s;
  }, _.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : zt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), _) : t;
  }, _.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], _) : [o[0], o[1]];
  }, _.translateExtent = function(u) {
    return arguments.length ? (r[0][0] = +u[0][0], r[1][0] = +u[1][0], r[0][1] = +u[0][1], r[1][1] = +u[1][1], _) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, _.constrain = function(u) {
    return arguments.length ? (i = u, _) : i;
  }, _.duration = function(u) {
    return arguments.length ? (a = +u, _) : a;
  }, _.interpolate = function(u) {
    return arguments.length ? (l = u, _) : l;
  }, _.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? _ : u;
  }, _.clickDistance = function(u) {
    return arguments.length ? (v = (u = +u) * u, _) : Math.sqrt(v);
  }, _.tapDistance = function(u) {
    return arguments.length ? (S = +u, _) : S;
  }, _;
}
var nl = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
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
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, p = t.map(([f, h]) => ol(o, r, f, h)).filter((f) => f !== null).filter((f) => f.t * a > i + 2 && (1 - f.t) * a > i + 2).sort((f, h) => f.t - h.t);
    let m = -1 / 0;
    for (const f of p)
      f.t * a - i <= m + 2 || (n += ` L ${f.x - l * i} ${f.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + l * i} ${f.y + c * i}`, m = f.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const Je = {
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
let ne = class extends Te {
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
    this._zoomBehavior = il().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), xe(e).call(this._zoomBehavior);
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
    const s = Math.min(...t.map((p) => p.x - p.w / 2)) - e, o = Math.max(...t.map((p) => p.x + p.w / 2)) + e, r = Math.min(...t.map((p) => p.y - p.h / 2)) - e, a = Math.max(...t.map((p) => p.y + p.h / 2)) + e, l = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = It.translate(n.width / 2 - l * (s + o) / 2, n.height / 2 - l * (r + a) / 2).scale(l);
    xe(i).call(this._zoomBehavior.transform, c);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(xe(t), e);
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
      (f) => o.has(f.id) && !(f.parentId && o.has(f.parentId))
    ) : null, a = r ? new Map(r.map((f) => [f.id, this.nodePos(f)])) : null, l = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, c = (f) => {
      const h = this.nodeIdAt(f), g = h && h !== t.id ? this.scene.nodes.find((v) => v.id === h) : void 0;
      return g ? g.kind === "external-system" ? g.id : g.parentId ?? null : null;
    }, p = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const h = this.toScene(f), g = h.x - i.x, v = h.y - i.y;
      if (!(!s && Math.hypot(g, v) < 3 / this._t.k))
        if (s = !0, r && a) {
          const S = /* @__PURE__ */ new Map();
          for (const _ of r) {
            const M = a.get(_.id), D = this.clampToParent(_, M.x + g, M.y + v);
            S.set(_.id, { x: D.x, y: D.y });
          }
          this._dragGroup = S;
        } else l(f) ? (this._dragPos = { id: t.id, x: n.x + g, y: n.y + v }, this._hoverNodeId = c(f)) : (this._dragPos = this.clampToParent(t, n.x + g, n.y + v), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", m), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, g]) => ({ id: h, x: g.x, y: g.y }))
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((v) => v.parentId === t.id), l = Math.min(...a.map((v) => v.x - v.w / 2)), c = Math.max(...a.map((v) => v.x + v.w / 2)), p = Math.min(...a.map((v) => v.y - v.h / 2)), m = Math.max(...a.map((v) => v.y + v.h / 2)), f = Ns(
      a.map((v) => ({ dx: v.x - r.x, dy: v.y - r.y, w: v.w, h: v.h })),
      { w: s, h: o }
    ), h = (v) => {
      if ((v.buttons & 1) === 0) {
        g();
        return;
      }
      const S = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(f.w, 2 * Math.abs(S.x - r.x)),
          h: Math.max(f.h, 2 * Math.abs(S.y - r.y))
        };
        return;
      }
      const _ = r.x - i * r.w / 2, M = r.y - n * r.h / 2, D = i > 0 ? Math.max(S.x, _ + s, a.length ? c + 10 : -1 / 0) : Math.min(S.x, _ - s, a.length ? l - 10 : 1 / 0), V = n > 0 ? Math.max(S.y, M + o, a.length ? m + 10 : -1 / 0) : Math.min(S.y, M - o, a.length ? p - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + D) / 2,
        y: (M + V) / 2,
        w: Math.abs(D - _),
        h: Math.abs(V - M)
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
    var f, h, g;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, l = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, c = a / 2, p = l / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return W`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (g = this._dragGroup) != null && g.has(e.id) ? "none" : "auto"}
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
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
        ${e.symbol && Je[e.symbol] && !r ? W`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-p + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Je[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && Je[e.symbol] ? W`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Je[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? W`
              <foreignObject x=${-c + 6} y=${o ? -p + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(v) => v.stopPropagation()}
                  @keydown=${(v) => {
      v.stopPropagation(), v.key === "Enter" && this.commitRename(e, v.target.value), v.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(v) => this.commitRename(e, v.target.value)}
                />
              </foreignObject>` : r ? W`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? W`<text x=${-c + 12} y=${-p + 21} text-anchor="start" font-size="13"
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
      ([v, S]) => W`
                <circle data-handle cx=${v} cy=${S} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, S]) => W`
                <rect data-resize x=${v * c - 6.5} y=${S * p - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${v * S > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(_) => this.onResizePointerDown(_, e, v, S)}>
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
        const { a: r, b: a } = this._rubber, l = Math.min(r.x, a.x), c = Math.max(r.x, a.x), p = Math.min(r.y, a.y), m = Math.max(r.y, a.y), f = this.scene.nodes.filter((h) => {
          const g = this.nodePos(h);
          return g.x >= l && g.x <= c && g.y >= p && g.y <= m;
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, n = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = It.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    xe(i).call(this._zoomBehavior.transform, o);
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
ae([
  _e({ attribute: !1 })
], ne.prototype, "scene", 2);
ae([
  _e({ attribute: !1 })
], ne.prototype, "selectedId", 2);
ae([
  _e({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
ae([
  _e({ type: Boolean })
], ne.prototype, "connectable", 2);
ae([
  _e({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
ae([
  O()
], ne.prototype, "_t", 2);
ae([
  O()
], ne.prototype, "_dragPos", 2);
ae([
  O()
], ne.prototype, "_dragGroup", 2);
ae([
  O()
], ne.prototype, "_pendingLink", 2);
ae([
  O()
], ne.prototype, "_hoverNodeId", 2);
ae([
  O()
], ne.prototype, "_editingId", 2);
ae([
  O()
], ne.prototype, "_spaceDown", 2);
ae([
  O()
], ne.prototype, "_wpDrag", 2);
ae([
  O()
], ne.prototype, "_selectedWaypoint", 2);
ae([
  O()
], ne.prototype, "_resize", 2);
ae([
  O()
], ne.prototype, "_rubber", 2);
ne = ae([
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
function pe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Xe = (e) => e.trim().toLowerCase();
function dl(e, t) {
  var R, A, T, B, Z;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((I) => ({ ...I, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((I) => I.id))
  ), l = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((I) => ({ ...I, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((I) => ({ ...I, moduleId: u.id, application: !0 }))
  ), p = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((I) => ({ ...I, moduleId: u.id }))
  );
  for (const u of s)
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
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of r)
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
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
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
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), m.set(Xe(u.name), u.id);
  const f = (u) => {
    if (!u || !u.trim()) return null;
    const I = m.get(Xe(u));
    if (I) return I;
    const y = `evname:${Xe(u)}`;
    return pe(i, {
      id: y,
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
    }), y;
  }, h = (u) => {
    const I = p.find((k) => k.id === u.id) ?? p.find((k) => u.name && Xe(k.name) === Xe(u.name)), y = (I == null ? void 0 : I.id) ?? (u.id || (u.name ? `rm:${Xe(u.name)}` : null));
    return y ? (pe(i, {
      id: y,
      label: (I == null ? void 0 : I.name) ?? u.name ?? y,
      x: 0,
      y: 0,
      w: q.readModel.w,
      h: q.readModel.h,
      kind: I ? "read-model" : "derived-read-model",
      fill: q.readModel.fill,
      stroke: q.readModel.stroke,
      dashed: !I,
      badge: "READ MODEL"
    }), y) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const I = (e.actors ?? []).find((y) => y.id === u.actorId);
    I && (pe(i, {
      id: I.id,
      label: I.name,
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
      id: `es-actor:${I.id}->${u.targetId}`,
      sourceId: I.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const I = (e.agentUses ?? []).filter((C) => C.agentId === u.id), y = (e.agentExternalUses ?? []).filter((C) => C.agentId === u.id), k = (e.agentRags ?? []).filter((C) => C.agentId === u.id), N = (e.agentMcpUses ?? []).filter((C) => C.agentId === u.id), U = (e.agentGatewayUses ?? []).some((C) => C.agentId === u.id) || (e.agentApiOpUses ?? []).some((C) => C.agentId === u.id) || (e.agentQueryUses ?? []).some((C) => C.agentId === u.id) || (e.agentDelegations ?? []).some((C) => C.agentId === u.id) || (e.agentTriggers ?? []).some((C) => C.agentId === u.id);
    if (!(!I.length && !y.length && !k.length && !N.length && !U)) {
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
      for (const C of I)
        o.has(C.useCaseId) && ie(i, {
          id: `es-agent:${u.id}->${C.useCaseId}`,
          sourceId: u.id,
          targetId: C.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const C of y) {
        const L = e.externalSystems.find(
          (Q) => (Q.useCases ?? []).some((J) => J.id === C.externalUseCaseId)
        );
        if (!L) continue;
        const X = (R = (L.useCases ?? []).find((Q) => Q.id === C.externalUseCaseId)) == null ? void 0 : R.name;
        pe(i, {
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
          id: `es-agentx:${u.id}->${C.externalUseCaseId}`,
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
      for (const C of N) {
        const L = e.externalSystems.find(
          (Q) => (Q.mcpServers ?? []).some((J) => J.id === C.mcpServerId)
        );
        if (!L) continue;
        const X = (A = (L.mcpServers ?? []).find((Q) => Q.id === C.mcpServerId)) == null ? void 0 : A.name;
        pe(i, {
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
          id: `es-agentmcp:${u.id}->${C.mcpServerId}`,
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
      for (const C of k) {
        const L = (e.rags ?? []).find((X) => X.id === C.ragId);
        if (L) {
          pe(i, {
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
            const Q = h({ id: X });
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
    const I = e.externalSystems.find((y) => y.id === u);
    return I ? (pe(i, {
      id: I.id,
      label: I.name,
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
    }), I.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const I = g(u.externalSystemId);
    !I || !o.has(u.useCaseId) || ie(i, {
      id: `es-extin:${I}->${u.useCaseId}`,
      sourceId: I,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const I = e.externalSystems.find(
      (N) => (N.useCases ?? []).some((U) => U.id === u.targetId)
    ), y = I ? g(I.id) : null;
    if (!y) continue;
    const k = (T = ((I == null ? void 0 : I.useCases) ?? []).find((N) => N.id === u.targetId)) == null ? void 0 : T.name;
    ie(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: y,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
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
  const v = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const u of v)
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((y) => y.id === u.sourceId) || a.has(u.sourceId))) || ie(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const S = (u, I, y, k, N, U) => (pe(i, {
    id: u,
    label: I,
    x: 0,
    y: 0,
    w: q.policy.w,
    h: q.policy.h,
    kind: y,
    symbol: "flow",
    fill: q.policy.fill,
    stroke: q.policy.stroke,
    badge: k,
    tooltip: N
  }), u), _ = (u, I) => {
    const y = f(u);
    y && ie(i, {
      id: `es-trigger:${y}->${I}`,
      sourceId: y,
      targetId: I,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, M = (u, I) => {
    !I || !o.has(I) || ie(i, {
      id: `es-invoke:${u}->${I}`,
      sourceId: u,
      targetId: I,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const I = S(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    _(u.eventName, I);
    for (const y of u.actions ?? []) {
      if (y.type === "CallUseCase" && M(I, y.useCaseId), y.type === "StartSaga" && y.sagaId) {
        const k = `saga:${y.sagaId}`;
        S(k, y.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${I}->${k}`,
          sourceId: I,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (y.type === "UpdateProjection" && y.projectionId) {
        const k = (e.projections ?? []).find((N) => N.id === y.projectionId);
        k && ie(i, {
          id: `es-feeds:${I}->${k.id}`,
          sourceId: I,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const I = S(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const N of u.handledEventIds) {
      const U = i.nodes.has(N) ? N : null;
      U && ie(i, {
        id: `es-trigger:${U}->${I}`,
        sourceId: U,
        targetId: I,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && ie(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: I,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const y = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (y) {
      const N = e.externalSystems.find(
        (C) => (C.useCases ?? []).some((L) => L.id === y) || (C.tables ?? []).some((L) => L.id === y)
      ), U = N ? g(N.id) : null;
      if (U) {
        const C = ((B = (N.useCases ?? []).find((L) => L.id === y)) == null ? void 0 : B.name) ?? ((Z = (N.tables ?? []).find((L) => L.id === y)) == null ? void 0 : Z.name);
        ie(i, {
          id: `es-poll:${u.id}`,
          sourceId: U,
          targetId: I,
          kind: "es-projects-poll",
          label: C,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: C ? `polling de ${C}` : "polling"
        });
      }
    }
    const k = h({ id: u.readModelId, name: u.readModelName });
    k && ie(i, {
      id: `es-projects:${I}->${k}`,
      sourceId: I,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const y = f(u.triggerEvent), k = h({ name: u.readModelName ?? `${u.triggerEvent}View` });
      y && k && ie(i, {
        id: `es-mat:${u.id}`,
        sourceId: y,
        targetId: k,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const I = S(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (_(u.triggerEvent, I), M(I, u.targetUseCaseId), !u.targetUseCaseId) {
      const y = g(u.targetId), k = y ?? `tgt:${u.targetId}`;
      !y && n.has(u.targetId) && pe(i, {
        id: k,
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
      }), i.nodes.has(k) && ie(i, {
        id: `es-deliver:${u.id}`,
        sourceId: I,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const I = S(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, I);
    for (const k of u.steps) M(I, k.useCaseId);
    const y = f(u.onCompletionEventName);
    y && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: I,
      targetId: y,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const I = S(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, I);
    for (const k of u.steps ?? []) {
      M(I, k.targetUseCaseId);
      for (const N of [k.emittedEventName, k.completionEventName]) {
        const U = f(N);
        U && ie(i, {
          id: `es-wfemit:${u.id}:${U}`,
          sourceId: I,
          targetId: U,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const y = f(u.onCompletionEventName);
    y && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: I,
      targetId: y,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const D = [...i.nodes.values()], V = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    V.has(u.targetId) || V.set(u.targetId, []), V.get(u.targetId).push(u.sourceId);
  const x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set(), b = (u) => {
    const I = x.get(u);
    if (I !== void 0) return I;
    if (w.has(u)) return 0;
    w.add(u);
    const y = V.get(u) ?? [], k = y.length ? 1 + Math.max(...y.map(b)) : 0;
    return w.delete(u), x.set(u, k), k;
  }, $ = /* @__PURE__ */ new Map();
  for (const u of D) {
    const I = t[u.id];
    if (I) {
      u.x = I.x, u.y = I.y;
      continue;
    }
    const y = b(u.id), k = $.get(y) ?? 0;
    $.set(y, k + 1), u.x = 140 + y * 260, u.y = 110 + k * 110;
  }
  return { nodes: D, edges: i.edges };
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
    var S;
    const l = new Map(a.steps.map((_) => [_.id, _])), c = new Map(a.steps.map((_) => [_.id, ml(_, l)])), p = /* @__PURE__ */ new Map();
    for (const _ of a.steps) {
      const M = c.get(_.id) ?? 0;
      p.set(M, (p.get(M) ?? 0) + 1);
    }
    const m = Math.max(1, ...p.values()), f = fl(e, a);
    if (f && !s.has(f.id)) {
      s.add(f.id);
      const _ = t[f.id] ?? { x: 140, y: r };
      i.push({
        id: f.id,
        label: f.label,
        x: _.x,
        y: _.y,
        w: pl,
        h: hl,
        kind: f.kind,
        symbol: f.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: f.kind === "aggregate" ? "AGGREGATE" : f.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: h.x,
      y: h.y,
      w: ll,
      h: cl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), f && n.push({
      id: `wft:${a.id}`,
      sourceId: f.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const g = /* @__PURE__ */ new Map();
    let v = 0;
    for (const _ of a.steps) {
      const M = c.get(_.id) ?? 0;
      v = Math.max(v, M);
      const D = g.get(M) ?? 0;
      g.set(M, D + 1);
      const V = t[_.id] ?? {
        x: h.x + (M + 1) * En,
        y: r + (D - (p.get(M) - 1) / 2) * Sn
      }, x = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: V.x,
        y: V.y,
        w: $n,
        h: ul,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: x ? `→ ${x}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${x ? ` · lanza ${x}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const w = (_.dependsOnStepIds ?? []).filter((b) => l.has(b));
      w.length === 0 && n.push({
        id: `wfs:${a.id}:${_.id}`,
        sourceId: a.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const b of w)
        n.push({
          id: `wfdep:${b}->${_.id}`,
          sourceId: b,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((S = l.get(b)) == null ? void 0 : S.name) ?? b}`
        });
    }
    if (a.onCompletionEventName) {
      const _ = `done:${a.id}`, M = t[_] ?? { x: h.x + (v + 2) * En, y: r };
      i.push({
        id: _,
        label: a.onCompletionEventName,
        x: M.x,
        y: M.y,
        w: $n,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const D = new Set(a.steps.flatMap((x) => x.dependsOnStepIds ?? [])), V = a.steps.filter((x) => !D.has(x.id));
      for (const x of V.length ? V : [])
        n.push({
          id: `wfd:${a.id}:${x.id}`,
          sourceId: x.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, m + 1) * Sn + 60;
  }), { nodes: i, edges: n };
}
async function wl(e, t) {
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
var yl = Object.defineProperty, vl = Object.getOwnPropertyDescriptor, ot = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? vl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && yl(t, i, s), s;
};
let Re = class extends Te {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._drag = null, this.onDown = (e) => {
      var t;
      e.button === 0 && (this.focus(), (t = this.setPointerCapture) == null || t.call(this, e.pointerId), this._drag = {
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        panning: e.shiftKey
      });
    }, this.onMove = (e) => {
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      this._drag.panning ? this._pan = { x: this._drag.pan.x + t, y: this._drag.pan.y + i } : (this._rz = this._drag.rz + t * 0.4, this._rx = Math.max(5, Math.min(80, this._drag.rx + i * 0.3)));
    }, this.onUp = () => {
      this._drag = null;
    }, this.onWheel = (e) => {
      e.preventDefault();
      const t = e.deltaY < 0 ? 1.1 : 0.9;
      this._k = Math.max(0.15, Math.min(3, this._k * t));
    }, this.reset = () => {
      this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 };
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("pointerdown", this.onDown), this.addEventListener("pointermove", this.onMove), this.addEventListener("pointerup", this.onUp), this.addEventListener("pointercancel", this.onUp), this.addEventListener("wheel", this.onWheel, { passive: !1 }), this.addEventListener("dblclick", this.reset);
  }
  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onDown), this.removeEventListener("pointermove", this.onMove), this.removeEventListener("pointerup", this.onUp), this.removeEventListener("pointercancel", this.onUp), this.removeEventListener("wheel", this.onWheel), this.removeEventListener("dblclick", this.reset), super.disconnectedCallback();
  }
  firstUpdated() {
    this.focus();
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
    const t = this.depths(), i = new Map(e.map((h) => [h.id, h])), n = Math.min(...e.map((h) => h.x - h.w / 2)) - 60, s = Math.max(...e.map((h) => h.x + h.w / 2)) + 60, o = Math.min(...e.map((h) => h.y - h.h / 2)) - 60, r = Math.max(...e.map((h) => h.y + h.h / 2)) + 60, a = (n + s) / 2, l = (o + r) / 2, c = this.getBoundingClientRect(), p = c.width ? Math.min(c.width / (s - n), c.height / (r - o), 1) * 0.9 : 0.5, m = this._k * p, f = 30;
    return P`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-a}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${o}px"
            width=${s - n}
            height=${r - o}
            viewBox="${n} ${o} ${s - n} ${r - o}"
          >
            ${this.scene.edges.map((h) => {
      const g = i.get(h.sourceId), v = i.get(h.targetId);
      return !g || !v ? "" : W`<line
                x1=${g.x} y1=${g.y} x2=${v.x} y2=${v.y}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((h) => {
      const g = i.get(h.sourceId), v = i.get(h.targetId);
      if (!g || !v) return "";
      const S = (t.get(g.id) ?? 0) * f + 2, _ = (t.get(v.id) ?? 0) * f + 2, M = v.x - g.x, D = v.y - g.y, V = _ - S, x = Math.hypot(M, D), w = Math.hypot(x, V), b = Math.atan2(D, M) * 180 / Math.PI, $ = Math.atan2(V, x) * 180 / Math.PI, R = h.color ?? "#64748b", A = h.dashed ? `repeating-linear-gradient(90deg, ${R} 0 6px, transparent 6px 10px)` : R;
      return P`<div
              class="edge3"
              style="
                left: ${g.x}px; top: ${g.y}px; width: ${w}px; height: 1.7px;
                transform: translateZ(${S}px) rotateZ(${b}deg) rotateY(${-$}deg);
                background: ${A};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((h) => {
      const g = t.get(h.id) ?? 0, v = h.container || g === 0;
      return P`
              <div
                class="n3 ${h.container ? "container3" : ""}"
                title=${h.tooltip ?? h.label}
                style="
                  left: ${h.x - h.w / 2}px; top: ${h.y - h.h / 2}px;
                  width: ${h.w}px; height: ${h.h}px;
                  transform: translateZ(${g * f}px);
                  background: ${h.container ? "color-mix(in srgb, " + (h.fill ?? "#ffffff") + " 82%, transparent)" : h.fill ?? "#ffffff"};
                  border-color: ${h.stroke ?? "#64748b"};
                  border-style: ${h.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${v ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${h.badge ? P`<span class="badge3" style="color: ${h.stroke ?? "#94a3b8"}">${h.badge}</span>` : ""}
                <span>${h.label}</span>
              </div>
            `;
    })}
        </div>
      </div>
      <div class="hud">
        arrastra para orbitar · shift+arrastra mueve · rueda para zoom · doble click resetea
      </div>
    `;
  }
};
Re.styles = ei`
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
ot([
  _e({ attribute: !1 })
], Re.prototype, "scene", 2);
ot([
  O()
], Re.prototype, "_rx", 2);
ot([
  O()
], Re.prototype, "_rz", 2);
ot([
  O()
], Re.prototype, "_k", 2);
ot([
  O()
], Re.prototype, "_pan", 2);
Re = ot([
  ii("modux-tilt")
], Re);
var xl = Object.defineProperty, Il = Object.getOwnPropertyDescriptor, H = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Il(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && xl(t, i, s), s;
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
}, _l = Object.keys(Pi);
function ft(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let a = 0, l = 1;
  const c = t.x - e.x, p = t.y - e.y;
  for (const [m, f] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-p, e.y - o],
    [p, r - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / m;
    if (m < 0) {
      if (h > l) return !1;
      h > a && (a = h);
    } else {
      if (h < a) return !1;
      h < l && (l = h);
    }
  }
  return l - a > 0.02;
}
function bl(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((p) => [p.id, p])), s = (p) => {
    var f;
    const m = /* @__PURE__ */ new Set();
    for (let h = p; h; h = (f = n.get(h)) == null ? void 0 : f.parentId) m.add(h);
    return m;
  }, o = e.nodes, r = (p) => p.parentId ? Math.min(i, 6) : i, a = /* @__PURE__ */ new Map(), l = (p, m, f) => {
    const h = r(f), g = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, v = f.w / 2 + h * 1.5, S = f.h / 2 + h * 1.5, _ = { x: f.x - v, y: f.y - S }, M = { x: f.x + v, y: f.y - S }, D = { x: f.x - v, y: f.y + S }, V = { x: f.x + v, y: f.y + S }, x = [];
    for (const w of [_, M, D, V])
      !ft(p, w, g) && !ft(w, m, g) && x.push([w]);
    for (const [w, b] of [
      [_, M],
      [M, _],
      [M, V],
      [V, M],
      [V, D],
      [D, V],
      [D, _],
      [_, D]
    ])
      !ft(p, w, g) && !ft(b, m, g) && x.push([w, b]);
    return x;
  };
  for (const p of e.edges) {
    if ((c = t[p.id]) != null && c.length) continue;
    const m = n.get(p.sourceId), f = n.get(p.targetId);
    if (!m || !f) continue;
    const h = /* @__PURE__ */ new Set([...s(m.id), ...s(f.id)]), g = [
      { x: m.x, y: m.y },
      { x: f.x, y: f.y }
    ];
    for (let v = 0; v < 12; v++) {
      let S = !1;
      e: for (let _ = 0; _ < g.length - 1; _++)
        for (const M of o) {
          if (h.has(M.id)) continue;
          const D = r(M), V = { x: M.x, y: M.y, w: M.w + 2 * D, h: M.h + 2 * D };
          if (!ft(g[_], g[_ + 1], V)) continue;
          const x = l(g[_], g[_ + 1], M);
          if (!x.length) continue;
          const w = ($) => o.some(
            (R) => R !== M && !h.has(R.id) && Math.abs($.x - R.x) < R.w / 2 + r(R) / 2 && Math.abs($.y - R.y) < R.h / 2 + r(R) / 2
          ), b = ($) => {
            let R = 0;
            const A = [g[_], ...$, g[_ + 1]];
            for (let T = 0; T < A.length - 1; T++)
              R += Math.hypot(A[T + 1].x - A[T].x, A[T + 1].y - A[T].y);
            return R + ($.some(w) ? 1e4 : 0);
          };
          x.sort(($, R) => b($) - b(R)), g.splice(_ + 1, 0, ...x[0]), S = !0;
          break e;
        }
      if (!S) break;
    }
    g.length > 2 && a.set(
      p.id,
      g.slice(1, -1).map((v) => ({ x: Math.round(v.x), y: Math.round(v.y) }))
    );
  }
  return a;
}
const Y = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function kl(e, t) {
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
function $l(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let F = class extends Te {
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
    for (const [p, m] of a) {
      const f = r.find((g) => g.id === p), h = o.nodes[p] ?? { x: f.x, y: f.y };
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
    const i = bl(e, t);
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
    const l = this.sceneFor(s), c = l.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = l.nodes.find((f) => f.id === c.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const p = [{ kind: "move-node", view: s, id: t, pos: r }];
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((g) => g.id === t) ?? (this.model.proxyApis ?? []).find((g) => g.id === t);
    if (!o || i && !this.model.externalSystems.some((g) => g.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const l = this._view, c = this.viewLayout(l), p = this.sceneFor(l), m = a ? p.nodes.find((g) => g.id === a) : void 0, f = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, h = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: l, id: t, pos: c.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: a }, !1), this.writeViewLayout(l, { ...c, nodes: { ...c.nodes, [t]: f } }), this.pushUndoEntry(h);
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
    const l = `proxy-${Y(o.name)}-${Y(r.name)}`;
    if ((this.model.proxyApis ?? []).some((g) => g.id === l)) return;
    const c = this._view, p = this.viewLayout(c), f = this.sceneFor(c).nodes.find((g) => g.id === i);
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
      const m = s.nodes.find((f) => f.id === a);
      if (m != null && m.parentId) {
        const f = s.nodes.find((h) => h.id === m.parentId);
        f && (p = { x: l - f.x, y: c - f.y });
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
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((p = a.sizes) == null ? void 0 : p[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of l) c[m.id] = { x: m.x - i, y: m.y - n };
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
    const i = Yi(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const x = this.owningWorkflowOf(e), w = this.owningWorkflowOf(t);
      if (!x || x !== w || e === t) return;
      const b = x.steps.find(($) => $.id === t);
      if (((b == null ? void 0 : b.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: x.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view !== "context-map") return;
    const s = /^apiop:(.+)@(.+)$/.exec(e);
    if (s) {
      const [, x, w] = s, b = (this.model.proxyApis ?? []).find((B) => B.id === w), $ = (b == null ? void 0 : b.targetApiId) ?? ((V = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === w && (this.model.apis ?? []).some(
          (Z) => Z.id === B.apiId && Z.operations.some((u) => u.id === x)
        )
      )) == null ? void 0 : V.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((Z) => Z.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: x,
          moduleId: w,
          targetUseCaseId: t
        });
        return;
      }
      if (!(b != null && b.targetApiId)) return;
      let A = null;
      if (t === b.targetApiId)
        A = b.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === b.targetApiId ? A = B[2] : this.model.modules.some((Z) => Z.id === t) && (this.model.apiImplementations ?? []).some(
          (Z) => Z.apiId === b.targetApiId && Z.moduleId === t
        ) && (A = t);
      }
      if (!A) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === b.id && B.operationId === x && B.targetSiteId === A
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: b.id,
        operationId: x,
        targetSiteId: A
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((A) => (A.useCases ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (T) => T.agentId === e && T.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.useCases ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (T) => T.agentId === e && T.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.mcpServers ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (T) => T.agentId === e && T.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((A) => A.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (T) => T.agentId === e && T.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((A) => A.operations.map((T) => T.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (T) => T.agentId === e && T.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((A) => A.id === t) || (this.model.proxyApis ?? []).some((A) => A.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (T) => T.agentId === e && T.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((A) => (A.queryServices ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (T) => T.agentId === e && T.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (T) => T.agentId === e && T.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((A) => A.id === t) && ((this.model.agentRags ?? []).some(
        (T) => T.agentId === e && T.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === e)) {
      const x = (this.model.mcpGateways ?? []).find(($) => $.id === e), w = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((R) => R.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((R) => R.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((R) => R.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), b = [
        ...x.mcpServerIds ?? [],
        ...x.apiIds ?? [],
        ...x.apiOperationIds ?? [],
        ...x.useCaseIds ?? [],
        ...x.ragIds ?? []
      ].includes(t);
      w && !b && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === t)) return;
    const r = (this.model.rags ?? []).find((x) => x.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((b) => (b.readModels ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((b) => (b.tables ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((b) => b.id === t) || (this.model.proxyApis ?? []).some((b) => b.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((b) => b.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((b) => b.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((x) => x.id === t)) return;
    if ((this.model.workflows ?? []).some((x) => x.id === e)) {
      const x = (this.model.workflows ?? []).find(($) => $.id === e), w = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (w) {
        const $ = x.onCompletionEventName || `${x.name.replace(/\s+/g, "")}Completado`;
        w.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const b = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (b && !(x.steps ?? []).some((R) => R.targetUseCaseId === t)) {
        const R = `wfs-${Y(b.name)}`;
        let A = R;
        for (let T = 2; (x.steps ?? []).some((B) => B.id === A); T++)
          A = `${R}-${T}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: A,
          name: b.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((x) => x.id === t)) {
      const x = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), w = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), b = x ?? w;
      if (b) {
        const $ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), R = new Set((this.model.aggregates ?? []).map((B) => B.id)), A = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((Z) => Z.id))
        ), T = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((Z) => Z.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: b.name,
          triggerAggregateId: $ && R.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && A.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && T.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((x) => x.id === e)) {
      const x = (this.model.proxyApis ?? []).find((w) => w.id === e);
      if ((this.model.apis ?? []).some((w) => w.id === t)) {
        x.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((w) => w.id === t)) {
        if (!x.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (b) => b.apiId === x.targetApiId && b.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: x.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((w) => w.id === t) && x.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((x) => x.id === e)) {
      if (this.model.externalSystems.some((x) => x.id === t)) {
        (this.model.apis ?? []).find((w) => w.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((x) => x.id === t) && ((this.model.apiImplementations ?? []).some(
        (w) => w.apiId === e && w.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const a = new Set((this.model.actors ?? []).map((x) => x.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((w) => (w.domainEvents ?? []).map((b) => b.id)),
        ...this.model.modules.flatMap((w) => (w.applicationEvents ?? []).map((b) => b.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (b) => b.eventId === e && b.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!a.has(e)) return;
    }
    if (a.has(e)) {
      const x = new Set(
        this.model.modules.flatMap((b) => (b.useCases ?? []).map(($) => $.id))
      ), w = new Set(
        this.model.modules.flatMap((b) => (b.queryServices ?? []).map(($) => $.id))
      );
      if (x.has(t) || w.has(t)) {
        (this.model.actorUses ?? []).some(
          ($) => $.actorId === e && $.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((b) => b.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((b) => b.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          ($) => $.actorId === e && $.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((b) => b.id === t)) {
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
        this.model.modules.flatMap((w) => (w.useCases ?? []).map((b) => b.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((w) => w.id === t)) {
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
    const c = this.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === e), p = this.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === e);
    if (c || p) {
      const x = (c ?? p).name, w = c ? { externalUseCaseId: e } : { externalTableId: e }, b = (A) => c ? A.sourceExternalUseCaseId === e : A.sourceExternalTableId === e, $ = this.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (T) => b(T) && T.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(x)}-${Y($.name)}`,
          name: `${$.name}Projection`,
          ...w,
          targetId: t
        });
        return;
      }
      const R = this.model.modules.find((A) => A.id === t);
      if (R) {
        (this.model.projections ?? []).some(
          (T) => b(T) && T.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(x)}-${Y(R.name)}`,
          name: `${x}ViewProjection`,
          ...w,
          moduleId: t,
          readModelName: `${x}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((x) => x.id === e);
    if (m) {
      const x = this.model.modules.flatMap((b) => b.readModels ?? []).find((b) => b.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(m.name)}-${Y(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const w = this.model.modules.find((b) => b.id === t);
      if (w) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${Y(m.name)}-${Y(w.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((w) => w.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map((w) => w.id))
    ]), g = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((w) => w.id))
    ), v = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map((w) => w.id))), S = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map((w) => w.id))
    );
    if (v.has(e) && S.has(t)) {
      (this.model.queryCalls ?? []).some(
        (w) => w.sourceId === e && w.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const _ = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((w) => w.id))
    );
    if (v.has(e) && _.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (w) => w.sourceId === e && w.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && v.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (w) => w.sourceId === e && w.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && (this.model.aggregates ?? []).some((x) => x.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (w) => w.sourceId === e && w.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && f.has(t) || v.has(e) && g.has(t)) {
      (this.model.emissions ?? []).some(
        (w) => w.sourceId === e && w.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || g.has(e)) {
      const x = g.has(e), w = this.model.modules.flatMap((y) => (x ? y.applicationEvents : y.domainEvents) ?? []).find((y) => y.id === e), b = this.model.modules.flatMap((y) => (y.useCases ?? []).map((k) => ({ u: k, module: y }))).find(({ u: y }) => y.id === t), $ = this.model.modules.flatMap((y) => (y.readModels ?? []).map((k) => ({ rm: k, module: y }))).find(({ rm: y }) => y.id === t), R = this.model.modules.find((y) => y.id === t) ?? ($ == null ? void 0 : $.module) ?? (b == null ? void 0 : b.module);
      if (!w || !R) return;
      const A = new Set((this.model.aggregates ?? []).map((y) => y.id)), T = new Set(
        this.model.modules.flatMap((y) => (y.domainServices ?? []).map((k) => k.id))
      ), B = (this.model.emissions ?? []).find(
        (y) => y.domainEventId === e && (x ? v.has(y.sourceId) : A.has(y.sourceId) || T.has(y.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${w.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${w.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Z = !x && A.has(B.sourceId);
      if (b) {
        if (this.model.flows.some(
          (k) => k.archetype === "TRIGGERS" && k.triggerEvent === w.name && k.targetUseCaseId === b.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(w.name)}-${Y(b.u.name)}`,
          name: b.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Z ? B.sourceId : "",
          triggerDomainServiceId: !x && !Z ? B.sourceId : void 0,
          triggerUseCaseId: x ? B.sourceId : void 0,
          triggerEvent: w.name,
          targetId: R.id,
          targetUseCaseId: b.u.id
        });
        return;
      }
      const u = ($ == null ? void 0 : $.rm.name) ?? `${w.name}View`;
      if (this.model.flows.some(
        (y) => y.archetype === "MATERIALIZES" && y.triggerEvent === w.name && y.targetId === R.id && y.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${Y(w.name)}-${Y(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: Z ? B.sourceId : "",
        triggerDomainServiceId: !x && !Z ? B.sourceId : void 0,
        triggerUseCaseId: x ? B.sourceId : void 0,
        triggerEvent: w.name,
        targetId: R.id,
        readModelName: u
      });
      return;
    }
    const M = /* @__PURE__ */ new Set([
      ...h,
      ...v,
      ...S,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map((w) => w.id))
    ]);
    if (M.has(e) || M.has(t) || f.has(t) || g.has(t))
      return;
    const D = new Set(this.model.externalSystems.map((x) => x.id));
    if (D.has(e)) {
      if (new Set(
        this.model.modules.flatMap((R) => (R.useCases ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (A) => A.externalSystemId === e && A.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (D.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const w = (this.model.apis ?? []).find(
        (R) => R.operations.some((A) => A.id === t)
      ), b = /^apiop:(.+)@(.+)$/.exec(t), $ = w ? { operationId: t, siteId: w.id } : b ? { operationId: b[1], siteId: b[2] } : null;
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
      if ((this.model.apis ?? []).some((R) => R.id === t) || (this.model.proxyApis ?? []).some((R) => R.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (A) => A.sourceId === e && A.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    D.has(t) || a.has(t);
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${Y(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? $l(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : kl(e.detail.id, e.detail.kind);
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
      const o = s === 1 ? e : `${e} ${s}`, r = `${t}${Y(o)}`;
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
    const n = F.PALETTE_NEW.find((m) => m.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), r = (m, f) => {
      const h = this.viewLayout(s), g = f ? o.nodes.find((S) => S.id === f) : void 0, v = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...h, nodes: { ...h.nodes, [m]: v } }), { kind: "move-node", view: s, id: m, pos: null };
    }, a = (m, f, h) => {
      const g = this.inverseOf(m) ?? [];
      this.command(m, !1);
      const v = r(f, h);
      this.pushUndoEntry([...g, v]);
    };
    if (!n.child) {
      const m = {
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
      }, { id: f, name: h } = this.uniquePaletteName(n.label, m[e] ?? ""), g = e === "module" ? { kind: "add-module", id: f, name: h, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: f, name: h } : e === "external-system" ? { kind: "add-external-system", id: f, name: h } : e === "ai-agent" ? { kind: "add-ai-agent", id: f, name: h } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: f, name: h, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: f, name: h } : e === "rag" ? { kind: "add-rag", id: f, name: h } : e === "api" ? { kind: "add-api", id: f, name: h } : e === "proxy-api" ? { kind: "add-proxy-api", id: f, name: h } : {
        kind: "add-workflow",
        id: f,
        name: h,
        completionEventName: `${h.replace(/\s+/g, "")}Completado`
      };
      a(g, f);
      return;
    }
    if (e === "workflow-step") {
      const m = this.model.workflows ?? [], f = [];
      for (let M = i ?? void 0; M; )
        f.push(M), M = (p = o.nodes.find((D) => D.id === M)) == null ? void 0 : p.parentId;
      const h = f.map((M) => m.find((D) => D.id === M)).find(Boolean), g = f.map((M) => {
        const D = m.find((V) => (V.steps ?? []).some((x) => x.id === M));
        return D ? { owner: D, stepId: M } : null;
      }).find(Boolean), v = h ?? (g == null ? void 0 : g.owner);
      if (!v) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: S, name: _ } = this.uniquePaletteName("Paso", "wfs-");
      g && (t = { x: t.x + 190, y: t.y }), a(
        {
          kind: "add-workflow-step",
          workflowId: v.id,
          id: S,
          name: _,
          ...g ? { dependsOnStepIds: [g.stepId], afterStepId: g.stepId } : {}
        },
        S
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${v.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const m = this.dropContainerFor("api", i);
      if (!m) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: f, name: h } = this.uniquePaletteName("API", "api-"), g = { kind: "add-api", id: f, name: h }, v = this.inverseOf(g) ?? [];
      this.command(g, !1), this.model.externalSystems.some((D) => D.id === m) ? this.command({ kind: "set-api-publisher", id: f, targetId: m }, !1) : this.command({ kind: "add-api-implementation", apiId: f, moduleId: m }, !1);
      const S = this.viewLayout(this._view), _ = this.sceneFor(this._view).nodes.find((D) => D.id === m), M = _ ? { x: Math.round(t.x - _.x), y: Math.round(t.y - _.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...S, nodes: { ...S.nodes, [f]: M } }), this.pushUndoEntry([...v, { kind: "move-node", view: this._view, id: f, pos: null }]);
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
      const m = `agg-${Y(c)}`;
      a({ kind: "add-aggregate", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "use-case" || e === "policy") {
      const m = `uc-${Y(c)}`;
      a(
        { kind: "add-use-case", id: m, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        m,
        l
      );
    } else if (e === "domain-event") {
      const m = `ev-${Y(c)}`;
      a({ kind: "add-domain-event", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "application-event") {
      const m = `aev-${Y(c)}`;
      a({ kind: "add-application-event", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "domain-service") {
      const m = `ds-${Y(c)}`;
      a({ kind: "add-domain-service", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "query-service") {
      const m = `qs-${Y(c)}`;
      a({ kind: "add-query-service", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "read-model") {
      const m = `rm-${Y(c)}`, f = (this.model.aggregates ?? []).find((h) => h.id === l);
      a({ kind: "add-read-model", id: m, name: c, aggregateId: l }, m, (f == null ? void 0 : f.moduleId) ?? l);
    } else if (e === "api-operation") {
      const m = (this.model.apis ?? []).find((S) => S.id === l), f = new Set(((m == null ? void 0 : m.operations) ?? []).map((S) => S.id));
      let h = c, g = `apiop-${l.replace(/^api-/, "")}-${Y(h)}`;
      for (let S = 2; f.has(g); S++)
        h = `${n.label} ${S}`, g = `apiop-${l.replace(/^api-/, "")}-${Y(h)}`;
      a({ kind: "add-api-operation", apiId: l, id: g, name: h }, g, l), o.nodes.some(
        (S) => S.parentId === l && (S.kind === "api-operation" || S.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(m == null ? void 0 : m.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const m = this.model.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === l), f = new Set((m == null ? void 0 : m.stepIds) ?? []);
      let h = c, g = `step-${Y(h)}`;
      for (let v = 2; f.has(g); v++)
        h = `${n.label} ${v}`, g = `step-${Y(h)}`;
      a({ kind: "add-use-case-step", useCaseId: l, id: g, name: h }, g, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(m == null ? void 0 : m.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const m = `xuc-${Y(c)}`;
      a({ kind: "add-external-use-case", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "external-table") {
      const m = `tbl-${Y(c)}`;
      a({ kind: "add-external-table", id: m, name: c, moduleId: l }, m, l);
    } else if (e === "mcp-server") {
      const m = `mcpsrv-${Y(c)}`;
      a({ kind: "add-mcp-server", id: m, name: c, moduleId: l }, m, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
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
    const l = this.viewLayout(o), c = a.parentId ? r.nodes.find((m) => m.id === a.parentId) : void 0, p = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
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
                        ${Je[n.symbol]}
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
                            ${Je[n.symbol]}
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
        this.command({ kind: "add-aggregate", id: `agg-${Y(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), p = this._newTriggerEvent.trim();
        if (!l || !c || !p) return;
        this.command({
          kind: "add-flow",
          id: `flow-${Y(e)}`,
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
          id: `proc-${Y(e)}`,
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
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Xs(i, t.nodes) : e === "flows" ? so(i, t.nodes) : e === "processes" ? Yi(i, t.nodes) : e === "workflows" ? gl(i, t.nodes) : e === "eventstorming" ? dl(i, t.nodes) : Vs(
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
    }, r = await wl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
      ${this._tilt ? P`<modux-tilt .scene=${e}></modux-tilt>` : P`
      ${this._treeOpen && this._activeViewId ? this.renderViewTree() : ""}
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
        ${_l.map(
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
  _e({ attribute: !1 })
], F.prototype, "model", 2);
H([
  _e({ attribute: !1 })
], F.prototype, "layout", 2);
H([
  _e({ attribute: !1 })
], F.prototype, "diff", 2);
H([
  O()
], F.prototype, "_view", 2);
H([
  O()
], F.prototype, "_detail", 2);
H([
  O()
], F.prototype, "_relationType", 2);
H([
  O()
], F.prototype, "_relationPicker", 2);
H([
  O()
], F.prototype, "_extDepPicker", 2);
H([
  O()
], F.prototype, "_selectedId", 2);
H([
  O()
], F.prototype, "_paletteOpen", 2);
H([
  O()
], F.prototype, "_paletteFilter", 2);
H([
  O()
], F.prototype, "_paletteTab", 2);
H([
  O()
], F.prototype, "_fullscreen", 2);
H([
  O()
], F.prototype, "_tilt", 2);
H([
  O()
], F.prototype, "_helpOpen", 2);
H([
  O()
], F.prototype, "_newName", 2);
H([
  O()
], F.prototype, "_newModuleId", 2);
H([
  O()
], F.prototype, "_newArchetype", 2);
H([
  O()
], F.prototype, "_newTriggerAggId", 2);
H([
  O()
], F.prototype, "_newTriggerEvent", 2);
H([
  O()
], F.prototype, "_newTargetId", 2);
H([
  O()
], F.prototype, "_undoStack", 2);
H([
  O()
], F.prototype, "_redoStack", 2);
H([
  O()
], F.prototype, "_newStepName", 2);
H([
  O()
], F.prototype, "_newStepType", 2);
H([
  O()
], F.prototype, "_newStepRole", 2);
H([
  O()
], F.prototype, "_newStepDeadline", 2);
H([
  O()
], F.prototype, "_editStepRole", 2);
H([
  O()
], F.prototype, "_editStepDeadline", 2);
H([
  O()
], F.prototype, "_editStepComp", 2);
H([
  O()
], F.prototype, "_newStepUseCase", 2);
H([
  O()
], F.prototype, "_newStepEmits", 2);
H([
  O()
], F.prototype, "_editStepUseCase", 2);
H([
  O()
], F.prototype, "_editStepEmits", 2);
H([
  O()
], F.prototype, "_editStepAwaits", 2);
H([
  O()
], F.prototype, "_multi", 2);
H([
  O()
], F.prototype, "_newViewName", 2);
H([
  O()
], F.prototype, "_activeViewId", 2);
H([
  O()
], F.prototype, "_newRagSourceType", 2);
H([
  O()
], F.prototype, "_newRagSourceUri", 2);
H([
  O()
], F.prototype, "_addMemberKey", 2);
H([
  O()
], F.prototype, "_treeOpen", 2);
H([
  O()
], F.prototype, "_deletePicker", 2);
F = H([
  ii("modux-editor")
], F);
var El = Object.defineProperty, Sl = Object.getOwnPropertyDescriptor, me = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Sl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && El(t, i, s), s;
};
let re = class extends Te {
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
            const m = await r.json();
            m != null && m.message && (p = m.message);
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
re.styles = ei`
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
me([
  _e()
], re.prototype, "base", 2);
me([
  O()
], re.prototype, "_model", 2);
me([
  O()
], re.prototype, "_layout", 2);
me([
  O()
], re.prototype, "_error", 2);
me([
  O()
], re.prototype, "_saving", 2);
me([
  O()
], re.prototype, "_toast", 2);
me([
  O()
], re.prototype, "_workspace", 2);
me([
  O()
], re.prototype, "_creatingSolution", 2);
me([
  O()
], re.prototype, "_newSolutionName", 2);
me([
  O()
], re.prototype, "_diff", 2);
me([
  O()
], re.prototype, "_diffListOpen", 2);
me([
  O()
], re.prototype, "_mergeFlow", 2);
re = me([
  ii("modux-editor-connected")
], re);
export {
  Al as CONTAINER_HEADER,
  Cl as CONTAINER_INSET,
  ne as ModuxCanvas,
  F as ModuxEditor,
  re as ModuxEditorConnected,
  Xs as aggregatesScene,
  qe as apiImplNodeId,
  ze as apiOpOccurrenceId,
  vi as containerFit,
  Ns as containerMinSize,
  Vs as contextMapScene,
  zs as flowCoherence,
  so as flowsScene,
  Rt as normalizeViewLayout,
  Yi as processesScene,
  Us as relationEdgeId,
  Ni as resolveOverlaps
};
