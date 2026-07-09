const bl = 34, $l = 10;
function Ai(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let r = 0; r < e.length; r++)
      for (let a = r + 1; a < e.length; a++) {
        const l = e[r], c = e[a], h = i.get(l.id), p = i.get(c.id), m = p.x - h.x, f = p.y - h.y, y = (l.w + c.w) / 2 + t - Math.abs(m), v = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(y <= 0 || v <= 0))
          if (o = !0, y < v) {
            const S = (m >= 0 ? 1 : -1) * y / 2;
            h.x -= S, p.x += S;
          } else {
            const S = (f >= 0 ? 1 : -1) * v / 2;
            h.y -= S, p.y += S;
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
function Ms(e, t = { w: 160, h: 90 }) {
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
function fi(e, t, i) {
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
function Nt(e) {
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
const Ps = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ns = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Ts = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Xe = 168, Ke = 56;
function Le(e, t) {
  return `apiimpl:${e}@${t}`;
}
function De(e, t) {
  return `apiop:${e}@${t}`;
}
const Wi = { compact: 0, coarse: 1, full: 2 };
function Gi(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Wi[e ? t : n] > Wi[s] };
}
function Sn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Le(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const An = 34, Cn = 14, Os = 14, ye = 108, Ie = 32, Mn = 12, Pn = 10, It = 2, Rs = It * ye + (It - 1) * Mn + 2 * Cn;
function Us(e, t) {
  return `rel:${e}->${t}`;
}
function Ds(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function dt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Ls = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Nn = {
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
}, gi = {
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
function wi(e) {
  const t = Math.max(1, Math.ceil(e / It)), i = t * Ie + (t - 1) * Pn;
  return { w: Rs, h: An + i + Os };
}
function Lt(e, t) {
  const i = e % It, n = Math.floor(e / It);
  return {
    x: -t.w / 2 + Cn + i * (ye + Mn) + ye / 2,
    y: -t.h / 2 + An + n * (Ie + Pn) + Ie / 2
  };
}
function zs(e, t, i, n, s, o, r = !1) {
  const a = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Sn(e, t.id),
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
    return [{ ...n, x: i.x, y: i.y, w: Xe, h: Ke }];
  if (r) {
    const c = new Map((e.apis ?? []).map((p) => [p.id, p])), h = (e.apiImplementations ?? []).filter((p) => p.moduleId === t.id && c.has(p.apiId)).map((p) => {
      const m = c.get(p.apiId);
      return {
        id: Le(p.apiId, p.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((f) => ({
          id: De(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (h.length > 0) {
      const p = l.filter((m) => m.kind !== "api-impl");
      return Tn(i, n, h, p, s, o);
    }
  }
  return pt(i, n, l, s, o);
}
function Tn(e, t, i, n, s, o, r = /* @__PURE__ */ new Set()) {
  const a = o[t.id] ?? wi(i.length + n.length), l = i.map((f, y) => {
    const v = s[f.id] ?? Lt(y, a), S = r.has(f.id) ? [] : f.ops, _ = o[f.id] ?? wi(S.length), M = S.map((V, I) => s[V.id] ?? Lt(I, _)), D = fi(
      { x: v.x, y: v.y },
      _,
      M.map((V) => ({ dx: V.x, dy: V.y, w: ye, h: Ie }))
    );
    return { a: f, off: v, ops: S, opOffs: M, fit: D };
  }), c = n.map(
    (f, y) => s[f.id] ?? Lt(i.length + y, a)
  ), h = Ai(
    [
      ...l.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...n.map((f, y) => ({
        id: f.id,
        x: c[y].x,
        y: c[y].y,
        w: ye,
        h: Ie
      }))
    ],
    24
  );
  for (const f of l) {
    const y = h.get(f.a.id);
    y && (f.off = { x: f.off.x + (y.x - f.fit.x), y: f.off.y + (y.y - f.fit.y) }, f.fit = { ...f.fit, x: y.x, y: y.y });
  }
  n.forEach((f, y) => {
    const v = h.get(f.id);
    v && (c[y] = { x: v.x, y: v.y });
  });
  const p = fi(e, a, [
    ...l.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...c.map((f) => ({ dx: f.x, dy: f.y, w: ye, h: Ie }))
  ]), m = [
    { ...t, x: p.x, y: p.y, w: p.w, h: p.h, container: !0 }
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
    }), f.ops.forEach((y, v) => {
      m.push({
        id: y.id,
        label: y.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[v].x,
        y: e.y + f.off.y + f.opOffs[v].y,
        w: ye,
        h: Ie,
        tooltip: `${gi[f.a.opKind]}: ${y.name}`
      });
    });
  return n.forEach((f, y) => {
    const v = Nn[f.kind];
    m.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + c[y].x,
      y: e.y + c[y].y,
      w: ye,
      h: Ie,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${gi[f.kind]} ${f.name}`
    });
  }), m;
}
function pt(e, t, i, n, s) {
  const o = s[t.id] ?? wi(i.length), r = i.map((p, m) => n[p.id] ?? Lt(m, o)), a = Ai(
    i.map((p, m) => ({ id: p.id, x: r[m].x, y: r[m].y, w: ye, h: Ie })),
    10
  );
  i.forEach((p, m) => {
    const f = a.get(p.id);
    f && (r[m] = { x: f.x, y: f.y });
  });
  const l = fi(
    e,
    o,
    r.map((p) => ({ dx: p.x, dy: p.y, w: ye, h: Ie }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, h = i.map((p, m) => {
    const f = r[m], y = p.policy ? Ls : Nn[p.kind];
    return {
      id: p.id,
      label: p.name,
      kind: p.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ye,
      h: Ie,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${p.policy ? "Policy" : gi[p.kind]} ${p.name}`
    };
  });
  return [c, ...h];
}
function qs(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, r = i !== "contexts", a = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), h = new Set(c.map((d) => d.id)), p = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && l.has(d.publishedByExternalSystemId)
  ), m = new Set(p.map((d) => d.id)), f = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !h.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !m.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    }))
  ], y = f.flatMap((d, E) => {
    const z = t[d.ref.id] ?? dt(E, f.length);
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
        w: Xe,
        h: Ke
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
        const Ee = (e.apis ?? []).find((Ye) => Ye.id === Y.targetApiId), Se = (Ee == null ? void 0 : Ee.operations) ?? [];
        if (Se.length > 0)
          return pt(
            z,
            ee,
            Se.map((Ye) => ({
              id: De(Ye.id, Y.id),
              name: Ye.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ee, x: z.x, y: z.y, w: Xe, h: Ke }];
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
      return (s.has(Y.id) ? !r : r) && Y.operations.length > 0 ? pt(
        z,
        { ...ee, collapsible: !0, collapsed: !1 },
        Y.operations.map(
          (Se) => ({ id: Se.id, name: Se.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ee,
        collapsible: Y.operations.length > 0,
        collapsed: Y.operations.length > 0,
        x: z.x,
        y: z.y,
        w: Xe,
        h: Ke
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
      }, Ee = c.filter((te) => te.publishedByExternalSystemId === Y.id), Se = p.filter((te) => te.publishedByExternalSystemId === Y.id), Ye = Se.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), ii = [
        ...(Y.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(Y.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(Y.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], ni = Ee.length > 0 || Se.length > 0, si = ni || ii.length > 0, { form: Mt, collapsed: oi } = Gi(
        s.has(Y.id),
        r ? "full" : ni ? "coarse" : "compact",
        ii.length > 0 || a && ni
      ), Vi = [
        ...Ye,
        ...Mt === "full" ? ii : []
      ], ri = a && Mt === "full" ? Se.filter((te) => {
        const rt = te.targetApiId ? (e.apis ?? []).find((ae) => ae.id === te.targetApiId) : void 0;
        return ((rt == null ? void 0 : rt.operations) ?? []).length > 0;
      }) : [];
      if (a && Mt === "full" && (Ee.length > 0 || ri.length > 0)) {
        const te = [
          ...Ee.map((ae) => ({
            id: ae.id,
            name: ae.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ae.name} — API publicada por ${Y.name}`,
            opKind: "api-operation",
            ops: (ae.operations ?? []).map((at) => ({ id: at.id, name: at.name }))
          })),
          ...ri.map((ae) => {
            const at = (e.apis ?? []).find((Pt) => Pt.id === ae.targetApiId);
            return {
              id: ae.id,
              name: ae.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ae.name} — proxy/cache de ${at.name}`,
              opKind: "api-op-occurrence",
              ops: (at.operations ?? []).map((Pt) => ({
                id: De(Pt.id, ae.id),
                name: Pt.name
              }))
            };
          })
        ], rt = new Set(ri.map((ae) => ae.id));
        return Tn(
          z,
          { ...ee, collapsible: !0, collapsed: oi },
          te,
          Vi.filter((ae) => !rt.has(ae.id)),
          t,
          n,
          o
        );
      }
      const Hi = Mt === "compact" ? [] : [
        ...Ee.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Vi
      ];
      return Hi.length > 0 ? pt(
        z,
        { ...ee, collapsible: si, collapsed: oi },
        Hi,
        t,
        n
      ) : [{
        ...ee,
        collapsible: si,
        collapsed: si && oi,
        x: z.x,
        y: z.y,
        w: Xe,
        h: Ke
      }];
    }
    const B = d.ref, K = B.subdomainType ?? "GENERIC", se = {
      id: B.id,
      label: B.name,
      kind: "module",
      symbol: "component",
      fill: Ps[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${B.name} — subdominio ${K}`
    }, me = Sn(e, B.id), st = (e.aggregates ?? []).some((Y) => Y.moduleId === B.id) || (B.useCases ?? []).length > 0 || (B.domainEvents ?? []).length > 0 || (B.applicationEvents ?? []).length > 0 || (B.readModels ?? []).length > 0 || (B.domainServices ?? []).length > 0 || (B.queryServices ?? []).length > 0, Oe = st || me.length > 0, { form: ot, collapsed: Be } = Gi(
      s.has(B.id),
      r ? "full" : me.length > 0 ? "coarse" : "compact",
      st
    );
    return ot === "full" && Oe ? zs(
      e,
      B,
      z,
      { ...se, collapsible: !0, collapsed: Be },
      t,
      n,
      a
    ) : ot === "coarse" && me.length > 0 ? pt(
      z,
      { ...se, collapsible: Oe, collapsed: Be },
      me,
      t,
      n
    ) : [{
      ...se,
      collapsible: Oe,
      collapsed: Oe && Be,
      x: z.x,
      y: z.y,
      w: Xe,
      h: Ke
    }];
  }), v = f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, E) => {
    const z = t[d.id] ?? dt(f.length + E, v);
    y.push({
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
    const z = t[d.id] ?? dt(f.length + (e.actors ?? []).length + E, v);
    y.push({
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
    const z = t[d.id] ?? dt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + E,
      v
    );
    y.push({
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
    const z = t[d.id] ?? dt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + E,
      v
    );
    y.push({
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
    }), (d.contentSources ?? []).forEach((B, K) => {
      const se = `ragcs:${d.id}:${B.uri}`, me = t[se] ?? { x: z.x + 170, y: z.y - 30 + K * 44 };
      y.push({
        id: se,
        label: B.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: me.x,
        y: me.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: B.type,
        tooltip: `${B.type}: ${B.uri}`
      }), S.push({
        id: `ragcse:${d.id}:${B.uri}`,
        sourceId: se,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), y.sort((d, E) => (d.parentId ? 1 : 0) - (E.parentId ? 1 : 0));
  const _ = e.relations.map((d) => ({
    id: Us(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Ns[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), M = e.flows.map((d) => {
    var me, st, Oe, ot, Be, Y;
    const E = Ds(e, d), z = r ? e.modules.find((ee) => ee.id === d.sourceId) : void 0, B = ((me = z == null ? void 0 : z.domainEvents) == null ? void 0 : me.find((ee) => ee.name === d.triggerEvent)) ?? ((st = z == null ? void 0 : z.applicationEvents) == null ? void 0 : st.find((ee) => ee.name === d.triggerEvent)), K = r && d.readModelName ? (ot = (Oe = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Oe.readModels) == null ? void 0 : ot.find((ee) => ee.name === d.readModelName) : void 0, se = r && d.targetUseCaseId ? (Y = (Be = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Be.useCases) == null ? void 0 : Y.find((ee) => ee.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (B == null ? void 0 : B.id) ?? d.sourceId,
      targetId: (se == null ? void 0 : se.id) ?? (K == null ? void 0 : K.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Ts[E],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${E}`
    };
  }), D = new Map((e.apis ?? []).map((d) => [d.id, d])), V = new Set(e.modules.map((d) => d.id)), I = (e.apiImplementations ?? []).filter(
    (d) => D.has(d.apiId) && V.has(d.moduleId)
  ), g = new Set(y.map((d) => d.id)), k = r ? (e.emissions ?? []).filter((d) => g.has(d.sourceId) && g.has(d.domainEventId)).map((d) => ({
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
  })).filter(({ p: d, source: E }) => E && d.readModelId).filter(({ p: d, source: E }) => g.has(E) && g.has(d.readModelId)).map(({ p: d, source: E }) => ({
    id: `proj:${d.id}`,
    sourceId: E,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], O = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((E) => {
      const z = r && E.targetUseCaseId && g.has(E.targetUseCaseId) ? E.targetUseCaseId : E.targetModuleId && g.has(E.targetModuleId) ? E.targetModuleId : (E.targetUseCaseId && !r, null);
      if (!z) return [];
      const B = r && g.has(E.id) ? E.id : d.id;
      return g.has(B) ? [
        {
          id: `apiwire:${E.id}`,
          sourceId: B,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${E.name} la implementa ${z}`
        }
      ] : [];
    })
  ), A = r ? (e.useCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], N = r ? (e.aggregateCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], W = r ? (e.queryCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], Q = r ? (e.actorUses ?? []).filter((d) => g.has(d.actorId) && g.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], u = (e.actorExternalDependencies ?? []).filter((d) => g.has(d.actorId) && g.has(d.externalSystemId)).map((d) => ({
    id: `extdep:${d.actorId}->${d.externalSystemId}`,
    sourceId: d.actorId,
    targetId: d.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), x = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), w = (d) => g.has(d) ? d : x.get(d) ?? d, b = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: w(d.targetId),
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
  ], P = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const E of d.useCases ?? []) P.set(E.id, d.id);
    for (const E of d.domainEvents ?? []) P.set(E.id, d.id);
    for (const E of d.applicationEvents ?? []) P.set(E.id, d.id);
  }
  const L = (d) => g.has(d) ? d : P.get(d) ?? d, C = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const E of d.domainEvents ?? []) C.set(E.name, E.id);
    for (const E of d.applicationEvents ?? []) C.set(E.name, E.id);
  }
  const T = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((E) => E.targetUseCaseId).map((E) => ({ sourceId: d.id, targetId: L(E.targetUseCaseId) }))
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && C.has(d.triggerEvent)).map((d) => ({
        sourceId: L(C.get(d.triggerEvent)),
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
  ], Z = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const E of d.tables ?? []) Z.set(E.id, d.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((E) => ({
          sourceId: g.has(E) ? E : Z.get(E) ?? E,
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
  ], ce = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((E) => ({
          sourceId: w(E),
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
  ], ge = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((E) => ({ sourceId: E, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((E) => ({ sourceId: E, targetId: d.id, name: d.name }))
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
  ], ue = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: w(d.apiId) })).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => [
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
  ], we = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, nt = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((E) => E.id !== d.id && we(E) === d.triggerEvent).filter((E) => g.has(E.id) && g.has(d.id)).map((E) => ({
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
  ), us = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: w(d.id), targetId: w(d.targetApiId) })).filter(
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
  ], hs = I.flatMap((d) => {
    const E = Le(d.apiId, d.moduleId);
    if (!g.has(E)) return [];
    const z = [];
    for (const B of (e.proxyApis ?? []).filter((K) => K.targetApiId === d.apiId)) {
      const K = w(B.id);
      g.has(K) && K !== E && z.push({
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
  }), ps = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const E = (e.proxyApis ?? []).find((K) => K.id === d.proxyId);
    if (!(E != null && E.targetApiId)) return [];
    const z = De(d.operationId, d.proxyId), B = d.targetSiteId === E.targetApiId ? E.targetApiId : Le(E.targetApiId, d.targetSiteId);
    return !g.has(z) || !g.has(B) ? [] : [{
      id: `oproute:${z}->${B}`,
      sourceId: z,
      targetId: B,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ms = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!g.has(d.externalSystemId)) return null;
        const E = (e.apis ?? []).find(
          (se) => se.operations.some((me) => me.id === d.operationId)
        );
        if (!E) return null;
        const z = d.siteId === E.id, B = z ? d.operationId : De(d.operationId, d.siteId);
        let K = g.has(B) ? B : null;
        if (!K)
          if (z || (e.proxyApis ?? []).some((se) => se.id === d.siteId))
            K = w(d.siteId);
          else {
            const se = Le(E.id, d.siteId);
            K = g.has(se) ? se : d.siteId;
          }
        return !K || !g.has(K) || K === d.externalSystemId ? null : { u: d, target: K };
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
  ], fs = r ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!g.has(d.useCaseId)) return [];
    const E = g.has(De(d.operationId, d.moduleId)) ? De(d.operationId, d.moduleId) : g.has(Le(d.apiId, d.moduleId)) ? Le(d.apiId, d.moduleId) : g.has(w(d.moduleId)) ? w(d.moduleId) : null;
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
  }) : [], gs = r ? (e.agentUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], ws = (e.agentRags ?? []).filter((d) => g.has(d.agentId) && g.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), ys = r ? (e.rags ?? []).filter((d) => g.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((E) => g.has(E)).map((E) => ({
      id: `ragsrc:${d.id}->${E}`,
      sourceId: d.id,
      targetId: E,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], Is = r ? (e.agentExternalUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], vs = r ? (e.agentMcpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], xs = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((E) => g.has(d.id) && g.has(E)).map((E) => ({
      id: `gwx:${d.id}->${E}`,
      sourceId: d.id,
      targetId: E,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), _s = (e.agentGatewayUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ks = r ? (e.agentApiOpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], bs = r ? (e.agentQueryUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], $s = (e.agentDelegations ?? []).filter((d) => g.has(d.agentId) && g.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Es = (e.actorAgentUses ?? []).filter((d) => g.has(d.actorId) && g.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Ss = r ? (e.agentTriggers ?? []).filter((d) => g.has(d.eventId) && g.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], As = r ? (e.externalCalls ?? []).filter((d) => g.has(d.externalSystemId) && g.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Cs = r ? (e.externalUseCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
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
      ...M,
      ...k,
      ...$,
      ...O,
      ...A,
      ...N,
      ...W,
      ...Q,
      ...u,
      ...b,
      ...us,
      ...hs,
      ...ps,
      ...ms,
      ...fs,
      ...T,
      ...X,
      ...nt,
      ...ue,
      ...J,
      ...ce,
      ...ge,
      ...gs,
      ...Is,
      ...vs,
      ...xs,
      ..._s,
      ...ks,
      ...bs,
      ...$s,
      ...Es,
      ...Ss,
      ...ws,
      ...ys,
      ...S,
      ...As,
      ...Cs
    ]
  };
}
const Fs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Vs = 176, Hs = 60, Ws = 140, Gs = 40;
function Bs(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const h = n.filter((m) => m.aggregateId === l.id).length, p = 140 + c * (170 + h * 60);
      t[l.id] = { x: r, y: p }, n.filter((m) => m.aggregateId === l.id).forEach((m, f) => {
        t[m.id] = { x: r + 60, y: p + 100 + f * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Ys(e, t) {
  const i = Bs(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const h = s.get(c.moduleId), p = (h == null ? void 0 : h.subdomainType) ?? "GENERIC", m = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: m.x,
      y: m.y,
      w: Vs,
      h: Hs,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Fs[p],
      stroke: "#64748b",
      badge: h ? `${h.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${h ? ` — módulo ${h.name} (${p})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const h = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: h.x,
      y: h.y,
      w: Ws,
      h: Gs,
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
  })), l = (e.aggregateReferences ?? []).map((c, h) => ({
    id: `aggref:${h}:${c.sourceAggregateId}->${c.targetAggregateId}`,
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
const js = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Xs = 150, Ks = 44, Qs = 190, Zs = 56, Js = 160, eo = 48;
function to(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function io(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((h) => h.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, l) => {
    const c = 120 + l * 130, h = js[a.archetype] ?? "#475569", p = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(p)) {
      o.add(p);
      const S = t[p] ?? { x: 160, y: c };
      n.push({
        id: p,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : p,
        x: S.x,
        y: S.y,
        w: Xs,
        h: Ks,
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
      w: Qs,
      h: Zs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const y = to(e, a), v = `tgt:${y.id}`;
    if (!o.has(v)) {
      o.add(v);
      const S = t[v] ?? { x: 790, y: c };
      n.push({
        id: v,
        label: y.label,
        x: S.x,
        y: S.y,
        w: Js,
        h: eo,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: p,
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
      targetId: v,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const no = 190, so = 56, ai = 170, oo = 52;
function Bi(e, t) {
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
      w: no,
      h: so,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((h, p) => {
      const m = h.type === "HUMAN", f = t[h.id] ?? { x: 150 + (p + 1) * 240, y: a };
      if (i.push({
        id: h.id,
        label: h.name,
        x: f.x,
        y: f.y,
        w: ai,
        h: oo,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${p}`,
        sourceId: c,
        targetId: h.id,
        kind: "process-seq",
        label: p === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const y = `comp:${h.id}`, v = t[y] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: y,
          label: h.compensationUseCaseId,
          x: v.x,
          y: v.y,
          w: ai,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${h.id}`,
          sourceId: h.id,
          targetId: y,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = h.id;
    }), o.onCompletionEventName) {
      const h = `done:${o.id}`, p = t[h] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: h,
        label: o.onCompletionEventName,
        x: p.x,
        y: p.y,
        w: ai,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: h,
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
const zt = globalThis, Ci = zt.ShadowRoot && (zt.ShadyCSS === void 0 || zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mi = Symbol(), Yi = /* @__PURE__ */ new WeakMap();
let On = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Mi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Ci && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Yi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Yi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ro = (e) => new On(typeof e == "string" ? e : e + "", void 0, Mi), Pi = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new On(i, e, Mi);
}, ao = (e, t) => {
  if (Ci) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = zt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, ji = Ci ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ro(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: lo, defineProperty: co, getOwnPropertyDescriptor: uo, getOwnPropertyNames: ho, getOwnPropertySymbols: po, getPrototypeOf: mo } = Object, Te = globalThis, Xi = Te.trustedTypes, fo = Xi ? Xi.emptyScript : "", di = Te.reactiveElementPolyfillSupport, gt = (e, t) => e, Wt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? fo : null;
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
} }, Ni = (e, t) => !lo(e, t), Ki = { attribute: !0, type: String, converter: Wt, reflect: !1, useDefault: !1, hasChanged: Ni };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Te.litPropertyMetadata ?? (Te.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Qe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ki) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && co(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = uo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ki;
  }
  static _$Ei() {
    if (this.hasOwnProperty(gt("elementProperties"))) return;
    const t = mo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(gt("properties"))) {
      const i = this.properties, n = [...ho(i), ...po(i)];
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
      for (const s of n) i.unshift(ji(s));
    } else t !== void 0 && i.push(ji(t));
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
    return ao(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Wt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Wt;
      this._$Em = s;
      const c = l.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? Ni)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[gt("elementProperties")] = /* @__PURE__ */ new Map(), Qe[gt("finalized")] = /* @__PURE__ */ new Map(), di == null || di({ ReactiveElement: Qe }), (Te.reactiveElementVersions ?? (Te.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis, Qi = (e) => e, Gt = wt.trustedTypes, Zi = Gt ? Gt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rn = "$lit$", Ne = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + Ne, go = `<${Un}>`, We = document, vt = () => We.createComment(""), xt = (e) => e === null || typeof e != "object" && typeof e != "function", Ti = Array.isArray, wo = (e) => Ti(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", li = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ji = /-->/g, en = />/g, Re = RegExp(`>|${li}(?:([^\\s"'>=/]+)(${li}*=${li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tn = /'/g, nn = /"/g, Dn = /^(?:script|style|textarea|title)$/i, Ln = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), R = Ln(1), H = Ln(2), Je = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), sn = /* @__PURE__ */ new WeakMap(), ze = We.createTreeWalker(We, 129);
function zn(e, t) {
  if (!Ti(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zi !== void 0 ? Zi.createHTML(t) : t;
}
const yo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = lt;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, h, p = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, h = r.exec(l), h !== null); ) m = r.lastIndex, r === lt ? h[1] === "!--" ? r = Ji : h[1] !== void 0 ? r = en : h[2] !== void 0 ? (Dn.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = Re) : h[3] !== void 0 && (r = Re) : r === Re ? h[0] === ">" ? (r = s ?? lt, p = -1) : h[1] === void 0 ? p = -2 : (p = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? Re : h[3] === '"' ? nn : tn) : r === nn || r === tn ? r = Re : r === Ji || r === en ? r = lt : (r = Re, s = void 0);
    const f = r === Re && e[a + 1].startsWith("/>") ? " " : "";
    o += r === lt ? l + go : p >= 0 ? (n.push(c), l.slice(0, p) + Rn + l.slice(p) + Ne + f) : l + Ne + (p === -2 ? a : f);
  }
  return [zn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class _t {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = yo(t, i);
    if (this.el = _t.createElement(c, n), ze.currentNode = this.el.content, i === 2 || i === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = ze.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Rn)) {
          const m = h[r++], f = s.getAttribute(p).split(Ne), y = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: o, name: y[2], strings: f, ctor: y[1] === "." ? vo : y[1] === "?" ? xo : y[1] === "@" ? _o : Zt }), s.removeAttribute(p);
        } else p.startsWith(Ne) && (l.push({ type: 6, index: o }), s.removeAttribute(p));
        if (Dn.test(s.tagName)) {
          const p = s.textContent.split(Ne), m = p.length - 1;
          if (m > 0) {
            s.textContent = Gt ? Gt.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(p[f], vt()), ze.nextNode(), l.push({ type: 2, index: ++o });
            s.append(p[m], vt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Un) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(Ne, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += Ne.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = We.createElement("template");
    return n.innerHTML = t, n;
  }
}
function et(e, t, i = e, n) {
  var r, a;
  if (t === Je) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = xt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = et(e, s._$AS(e, t.values), s, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? We).importNode(i, !0);
    ze.currentNode = s;
    let o = ze.nextNode(), r = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new St(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ko(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      r !== (l == null ? void 0 : l.index) && (o = ze.nextNode(), r++);
    }
    return ze.currentNode = We, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class St {
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
    t = et(this, t, i), xt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== Je && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(We.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = _t.createElement(zn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new Io(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = sn.get(t.strings);
    return i === void 0 && sn.set(t.strings, i = new _t(t)), i;
  }
  k(t) {
    Ti(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new St(this.O(vt()), this.O(vt()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = Qi(t).nextSibling;
      Qi(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Zt {
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
    if (o === void 0) t = et(this, t, i, 0), r = !xt(t) || t !== this._$AH && t !== Je, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = et(this, a[n + l], i, l), c === Je && (c = this._$AH[l]), r || (r = !xt(c) || c !== this._$AH[l]), c === oe ? t = oe : t !== oe && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === oe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class vo extends Zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === oe ? void 0 : t;
  }
}
class xo extends Zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== oe);
  }
}
class _o extends Zt {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = et(this, t, i, 0) ?? oe) === Je) return;
    const n = this._$AH, s = t === oe && n !== oe || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== oe && (n === oe || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ko {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    et(this, t);
  }
}
const ci = wt.litHtmlPolyfillSupport;
ci == null || ci(_t, St), (wt.litHtmlVersions ?? (wt.litHtmlVersions = [])).push("3.3.3");
const bo = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new St(t.insertBefore(vt(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = globalThis;
class Ve extends Qe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bo(i, this.renderRoot, this.renderOptions);
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
    return Je;
  }
}
var En;
Ve._$litElement$ = !0, Ve.finalized = !0, (En = Fe.litElementHydrateSupport) == null || En.call(Fe, { LitElement: Ve });
const ui = Fe.litElementPolyfillSupport;
ui == null || ui({ LitElement: Ve });
(Fe.litElementVersions ?? (Fe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oi = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $o = { attribute: !0, type: String, converter: Wt, reflect: !1, hasChanged: Ni }, Eo = (e = $o, t, i) => {
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
function be(e) {
  return (t, i) => typeof i == "object" ? Eo(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return be({ ...e, state: !0, attribute: !1 });
}
var yi = "http://www.w3.org/1999/xhtml";
const on = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: yi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Jt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), on.hasOwnProperty(t) ? { space: on[t], local: e } : e;
}
function So(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === yi && t.documentElement.namespaceURI === yi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ao(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function qn(e) {
  var t = Jt(e);
  return (t.local ? Ao : So)(t);
}
function Co() {
}
function Ri(e) {
  return e == null ? Co : function() {
    return this.querySelector(e);
  };
}
function Mo(e) {
  typeof e != "function" && (e = Ri(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), l, c, h = 0; h < r; ++h)
      (l = o[h]) && (c = e.call(l, l.__data__, h, o)) && ("__data__" in l && (c.__data__ = l.__data__), a[h] = c);
  return new pe(n, this._parents);
}
function Po(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function No() {
  return [];
}
function Fn(e) {
  return e == null ? No : function() {
    return this.querySelectorAll(e);
  };
}
function To(e) {
  return function() {
    return Po(e.apply(this, arguments));
  };
}
function Oo(e) {
  typeof e == "function" ? e = To(e) : e = Fn(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && (n.push(e.call(l, l.__data__, c, r)), s.push(l));
  return new pe(n, s);
}
function Vn(e) {
  return function() {
    return this.matches(e);
  };
}
function Hn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ro = Array.prototype.find;
function Uo(e) {
  return function() {
    return Ro.call(this.children, e);
  };
}
function Do() {
  return this.firstElementChild;
}
function Lo(e) {
  return this.select(e == null ? Do : Uo(typeof e == "function" ? e : Hn(e)));
}
var zo = Array.prototype.filter;
function qo() {
  return Array.from(this.children);
}
function Fo(e) {
  return function() {
    return zo.call(this.children, e);
  };
}
function Vo(e) {
  return this.selectAll(e == null ? qo : Fo(typeof e == "function" ? e : Hn(e)));
}
function Ho(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new pe(n, this._parents);
}
function Wn(e) {
  return new Array(e.length);
}
function Wo() {
  return new pe(this._enter || this._groups.map(Wn), this._parents);
}
function Bt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Bt.prototype = {
  constructor: Bt,
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
function Go(e) {
  return function() {
    return e;
  };
}
function Bo(e, t, i, n, s, o) {
  for (var r = 0, a, l = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new Bt(e, o[r]);
  for (; r < l; ++r)
    (a = t[r]) && (s[r] = a);
}
function Yo(e, t, i, n, s, o, r) {
  var a, l, c = /* @__PURE__ */ new Map(), h = t.length, p = o.length, m = new Array(h), f;
  for (a = 0; a < h; ++a)
    (l = t[a]) && (m[a] = f = r.call(l, l.__data__, a, t) + "", c.has(f) ? s[a] = l : c.set(f, l));
  for (a = 0; a < p; ++a)
    f = r.call(e, o[a], a, o) + "", (l = c.get(f)) ? (n[a] = l, l.__data__ = o[a], c.delete(f)) : i[a] = new Bt(e, o[a]);
  for (a = 0; a < h; ++a)
    (l = t[a]) && c.get(m[a]) === l && (s[a] = l);
}
function jo(e) {
  return e.__data__;
}
function Xo(e, t) {
  if (!arguments.length) return Array.from(this, jo);
  var i = t ? Yo : Bo, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Go(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var h = n[c], p = s[c], m = p.length, f = Ko(e.call(h, h && h.__data__, c, n)), y = f.length, v = a[c] = new Array(y), S = r[c] = new Array(y), _ = l[c] = new Array(m);
    i(h, p, v, S, _, f, t);
    for (var M = 0, D = 0, V, I; M < y; ++M)
      if (V = v[M]) {
        for (M >= D && (D = M + 1); !(I = S[D]) && ++D < y; ) ;
        V._next = I || null;
      }
  }
  return r = new pe(r, n), r._enter = a, r._exit = l, r;
}
function Ko(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Qo() {
  return new pe(this._exit || this._groups.map(Wn), this._parents);
}
function Zo(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Jo(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), l = 0; l < r; ++l)
    for (var c = i[l], h = n[l], p = c.length, m = a[l] = new Array(p), f, y = 0; y < p; ++y)
      (f = c[y] || h[y]) && (m[y] = f);
  for (; l < s; ++l)
    a[l] = i[l];
  return new pe(a, this._parents);
}
function er() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function tr(e) {
  e || (e = ir);
  function t(p, m) {
    return p && m ? e(p.__data__, m.__data__) : !p - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, l = s[o] = new Array(a), c, h = 0; h < a; ++h)
      (c = r[h]) && (l[h] = c);
    l.sort(t);
  }
  return new pe(s, this._parents).order();
}
function ir(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function nr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function sr() {
  return Array.from(this);
}
function or() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function rr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ar() {
  return !this.node();
}
function dr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function lr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function cr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ur(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function hr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function pr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function mr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function fr(e, t) {
  var i = Jt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? cr : lr : typeof t == "function" ? i.local ? mr : pr : i.local ? hr : ur)(i, t));
}
function Gn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function gr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function wr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function yr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Ir(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? gr : typeof t == "function" ? yr : wr)(e, t, i ?? "")) : tt(this.node(), e);
}
function tt(e, t) {
  return e.style.getPropertyValue(t) || Gn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function vr(e) {
  return function() {
    delete this[e];
  };
}
function xr(e, t) {
  return function() {
    this[e] = t;
  };
}
function _r(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function kr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? vr : typeof t == "function" ? _r : xr)(e, t)) : this.node()[e];
}
function Bn(e) {
  return e.trim().split(/^|\s+/);
}
function Ui(e) {
  return e.classList || new Yn(e);
}
function Yn(e) {
  this._node = e, this._names = Bn(e.getAttribute("class") || "");
}
Yn.prototype = {
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
function jn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function Xn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function br(e) {
  return function() {
    jn(this, e);
  };
}
function $r(e) {
  return function() {
    Xn(this, e);
  };
}
function Er(e, t) {
  return function() {
    (t.apply(this, arguments) ? jn : Xn)(this, e);
  };
}
function Sr(e, t) {
  var i = Bn(e + "");
  if (arguments.length < 2) {
    for (var n = Ui(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Er : t ? br : $r)(i, t));
}
function Ar() {
  this.textContent = "";
}
function Cr(e) {
  return function() {
    this.textContent = e;
  };
}
function Mr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Pr(e) {
  return arguments.length ? this.each(e == null ? Ar : (typeof e == "function" ? Mr : Cr)(e)) : this.node().textContent;
}
function Nr() {
  this.innerHTML = "";
}
function Tr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Or(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Rr(e) {
  return arguments.length ? this.each(e == null ? Nr : (typeof e == "function" ? Or : Tr)(e)) : this.node().innerHTML;
}
function Ur() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Dr() {
  return this.each(Ur);
}
function Lr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zr() {
  return this.each(Lr);
}
function qr(e) {
  var t = typeof e == "function" ? e : qn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Fr() {
  return null;
}
function Vr(e, t) {
  var i = typeof e == "function" ? e : qn(e), n = t == null ? Fr : typeof t == "function" ? t : Ri(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Hr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Wr() {
  return this.each(Hr);
}
function Gr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Br() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Yr(e) {
  return this.select(e ? Br : Gr);
}
function jr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Xr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Kr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Qr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Zr(e, t, i) {
  return function() {
    var n = this.__on, s, o = Xr(t);
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
function Jr(e, t, i) {
  var n = Kr(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, h; l < c; ++l)
        for (s = 0, h = a[l]; s < o; ++s)
          if ((r = n[s]).type === h.type && r.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = t ? Zr : Qr, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function Kn(e, t, i) {
  var n = Gn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function ea(e, t) {
  return function() {
    return Kn(this, e, t);
  };
}
function ta(e, t) {
  return function() {
    return Kn(this, e, t.apply(this, arguments));
  };
}
function ia(e, t) {
  return this.each((typeof t == "function" ? ta : ea)(e, t));
}
function* na() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var Qn = [null];
function pe(e, t) {
  this._groups = e, this._parents = t;
}
function At() {
  return new pe([[document.documentElement]], Qn);
}
function sa() {
  return this;
}
pe.prototype = At.prototype = {
  constructor: pe,
  select: Mo,
  selectAll: Oo,
  selectChild: Lo,
  selectChildren: Vo,
  filter: Ho,
  data: Xo,
  enter: Wo,
  exit: Qo,
  join: Zo,
  merge: Jo,
  selection: sa,
  order: er,
  sort: tr,
  call: nr,
  nodes: sr,
  node: or,
  size: rr,
  empty: ar,
  each: dr,
  attr: fr,
  style: Ir,
  property: kr,
  classed: Sr,
  text: Pr,
  html: Rr,
  raise: Dr,
  lower: zr,
  append: qr,
  insert: Vr,
  remove: Wr,
  clone: Yr,
  datum: jr,
  on: Jr,
  dispatch: ia,
  [Symbol.iterator]: na
};
function _e(e) {
  return typeof e == "string" ? new pe([[document.querySelector(e)]], [document.documentElement]) : new pe([[e]], Qn);
}
function oa(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ue(e, t) {
  if (e = oa(e), t === void 0 && (t = e.currentTarget), t) {
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
var ra = { value: () => {
} };
function Di() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new qt(i);
}
function qt(e) {
  this._ = e;
}
function aa(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
qt.prototype = Di.prototype = {
  constructor: qt,
  on: function(e, t) {
    var i = this._, n = aa(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = da(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = rn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = rn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new qt(e);
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
function da(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function rn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = ra, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ii = { capture: !0, passive: !1 };
function vi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function la(e) {
  var t = e.document.documentElement, i = _e(e).on("dragstart.drag", vi, Ii);
  "onselectstart" in t ? i.on("selectstart.drag", vi, Ii) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ca(e, t) {
  var i = e.document.documentElement, n = _e(e).on("dragstart.drag", null);
  t && (n.on("click.drag", vi, Ii), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Li(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Zn(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Ct() {
}
var kt = 0.7, Yt = 1 / kt, Ze = "\\s*([+-]?\\d+)\\s*", bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ua = /^#([0-9a-f]{3,8})$/, ha = new RegExp(`^rgb\\(${Ze},${Ze},${Ze}\\)$`), pa = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), ma = new RegExp(`^rgba\\(${Ze},${Ze},${Ze},${bt}\\)$`), fa = new RegExp(`^rgba\\(${ke},${ke},${ke},${bt}\\)$`), ga = new RegExp(`^hsl\\(${bt},${ke},${ke}\\)$`), wa = new RegExp(`^hsla\\(${bt},${ke},${ke},${bt}\\)$`), an = {
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
Li(Ct, $t, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dn,
  // Deprecated! Use color.formatHex.
  formatHex: dn,
  formatHex8: ya,
  formatHsl: Ia,
  formatRgb: ln,
  toString: ln
});
function dn() {
  return this.rgb().formatHex();
}
function ya() {
  return this.rgb().formatHex8();
}
function Ia() {
  return Jn(this).formatHsl();
}
function ln() {
  return this.rgb().formatRgb();
}
function $t(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = ua.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? cn(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Tt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Tt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ha.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = pa.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = ma.exec(e)) ? Tt(t[1], t[2], t[3], t[4]) : (t = fa.exec(e)) ? Tt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ga.exec(e)) ? pn(t[1], t[2] / 100, t[3] / 100, 1) : (t = wa.exec(e)) ? pn(t[1], t[2] / 100, t[3] / 100, t[4]) : an.hasOwnProperty(e) ? cn(an[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
}
function cn(e) {
  return new de(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Tt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new de(e, t, i, n);
}
function va(e) {
  return e instanceof Ct || (e = $t(e)), e ? (e = e.rgb(), new de(e.r, e.g, e.b, e.opacity)) : new de();
}
function xi(e, t, i, n) {
  return arguments.length === 1 ? va(e) : new de(e, t, i, n ?? 1);
}
function de(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Li(de, xi, Zn(Ct, {
  brighter(e) {
    return e = e == null ? Yt : Math.pow(Yt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? kt : Math.pow(kt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new de(He(this.r), He(this.g), He(this.b), jt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: un,
  // Deprecated! Use color.formatHex.
  formatHex: un,
  formatHex8: xa,
  formatRgb: hn,
  toString: hn
}));
function un() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}`;
}
function xa() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}${qe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function hn() {
  const e = jt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${He(this.r)}, ${He(this.g)}, ${He(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function jt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function He(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function qe(e) {
  return e = He(e), (e < 16 ? "0" : "") + e.toString(16);
}
function pn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, i, n);
}
function Jn(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ct || (e = $t(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, l = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= l < 0.5 ? o + s : 2 - o - s, r *= 60) : a = l > 0 && l < 1 ? 0 : r, new ve(r, a, l, e.opacity);
}
function _a(e, t, i, n) {
  return arguments.length === 1 ? Jn(e) : new ve(e, t, i, n ?? 1);
}
function ve(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Li(ve, _a, Zn(Ct, {
  brighter(e) {
    return e = e == null ? Yt : Math.pow(Yt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? kt : Math.pow(kt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new de(
      hi(e >= 240 ? e - 240 : e + 120, s, n),
      hi(e, s, n),
      hi(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new ve(mn(this.h), Ot(this.s), Ot(this.l), jt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = jt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${mn(this.h)}, ${Ot(this.s) * 100}%, ${Ot(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function mn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ot(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function hi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const es = (e) => () => e;
function ka(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function ba(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function $a(e) {
  return (e = +e) == 1 ? ts : function(t, i) {
    return i - t ? ba(t, i, e) : es(isNaN(t) ? i : t);
  };
}
function ts(e, t) {
  var i = t - e;
  return i ? ka(e, i) : es(isNaN(e) ? t : e);
}
const fn = (function e(t) {
  var i = $a(t);
  function n(s, o) {
    var r = i((s = xi(s)).r, (o = xi(o)).r), a = i(s.g, o.g), l = i(s.b, o.b), c = ts(s.opacity, o.opacity);
    return function(h) {
      return s.r = r(h), s.g = a(h), s.b = l(h), s.opacity = c(h), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Pe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var _i = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, pi = new RegExp(_i.source, "g");
function Ea(e) {
  return function() {
    return e;
  };
}
function Sa(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Aa(e, t) {
  var i = _i.lastIndex = pi.lastIndex = 0, n, s, o, r = -1, a = [], l = [];
  for (e = e + "", t = t + ""; (n = _i.exec(e)) && (s = pi.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, l.push({ i: r, x: Pe(n, s) })), i = pi.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? l[0] ? Sa(l[0].x) : Ea(t) : (t = l.length, function(c) {
    for (var h = 0, p; h < t; ++h) a[(p = l[h]).i] = p.x(c);
    return a.join("");
  });
}
var gn = 180 / Math.PI, ki = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function is(e, t, i, n, s, o) {
  var r, a, l;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (l = e * i + t * n) && (i -= e * l, n -= t * l), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, l /= a), e * n < t * i && (e = -e, t = -t, l = -l, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * gn,
    skewX: Math.atan(l) * gn,
    scaleX: r,
    scaleY: a
  };
}
var Rt;
function Ca(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ki : is(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ma(e) {
  return e == null || (Rt || (Rt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rt.setAttribute("transform", e), !(e = Rt.transform.baseVal.consolidate())) ? ki : (e = e.matrix, is(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ns(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, p, m, f, y) {
    if (c !== p || h !== m) {
      var v = f.push("translate(", null, t, null, i);
      y.push({ i: v - 4, x: Pe(c, p) }, { i: v - 2, x: Pe(h, m) });
    } else (p || m) && f.push("translate(" + p + t + m + i);
  }
  function r(c, h, p, m) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), m.push({ i: p.push(s(p) + "rotate(", null, n) - 2, x: Pe(c, h) })) : h && p.push(s(p) + "rotate(" + h + n);
  }
  function a(c, h, p, m) {
    c !== h ? m.push({ i: p.push(s(p) + "skewX(", null, n) - 2, x: Pe(c, h) }) : h && p.push(s(p) + "skewX(" + h + n);
  }
  function l(c, h, p, m, f, y) {
    if (c !== p || h !== m) {
      var v = f.push(s(f) + "scale(", null, ",", null, ")");
      y.push({ i: v - 4, x: Pe(c, p) }, { i: v - 2, x: Pe(h, m) });
    } else (p !== 1 || m !== 1) && f.push(s(f) + "scale(" + p + "," + m + ")");
  }
  return function(c, h) {
    var p = [], m = [];
    return c = e(c), h = e(h), o(c.translateX, c.translateY, h.translateX, h.translateY, p, m), r(c.rotate, h.rotate, p, m), a(c.skewX, h.skewX, p, m), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, p, m), c = h = null, function(f) {
      for (var y = -1, v = m.length, S; ++y < v; ) p[(S = m[y]).i] = S.x(f);
      return p.join("");
    };
  };
}
var Pa = ns(Ca, "px, ", "px)", "deg)"), Na = ns(Ma, ", ", ")", ")"), Ta = 1e-12;
function wn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Oa(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ra(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ua = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], l = o[1], c = o[2], h = r[0], p = r[1], m = r[2], f = h - a, y = p - l, v = f * f + y * y, S, _;
    if (v < Ta)
      _ = Math.log(m / c) / t, S = function(k) {
        return [
          a + k * f,
          l + k * y,
          c * Math.exp(t * k * _)
        ];
      };
    else {
      var M = Math.sqrt(v), D = (m * m - c * c + n * v) / (2 * c * i * M), V = (m * m - c * c - n * v) / (2 * m * i * M), I = Math.log(Math.sqrt(D * D + 1) - D), g = Math.log(Math.sqrt(V * V + 1) - V);
      _ = (g - I) / t, S = function(k) {
        var $ = k * _, O = wn(I), A = c / (i * M) * (O * Ra(t * $ + I) - Oa(I));
        return [
          a + A * f,
          l + A * y,
          c * O / wn(t * $ + I)
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
var it = 0, mt = 0, ct = 0, ss = 1e3, Xt, ft, Kt = 0, Ge = 0, ei = 0, Et = typeof performance == "object" && performance.now ? performance : Date, os = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zi() {
  return Ge || (os(Da), Ge = Et.now() + ei);
}
function Da() {
  Ge = 0;
}
function Qt() {
  this._call = this._time = this._next = null;
}
Qt.prototype = rs.prototype = {
  constructor: Qt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? zi() : +i) + (t == null ? 0 : +t), !this._next && ft !== this && (ft ? ft._next = this : Xt = this, ft = this), this._call = e, this._time = i, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function rs(e, t, i) {
  var n = new Qt();
  return n.restart(e, t, i), n;
}
function La() {
  zi(), ++it;
  for (var e = Xt, t; e; )
    (t = Ge - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --it;
}
function yn() {
  Ge = (Kt = Et.now()) + ei, it = mt = 0;
  try {
    La();
  } finally {
    it = 0, qa(), Ge = 0;
  }
}
function za() {
  var e = Et.now(), t = e - Kt;
  t > ss && (ei -= t, Kt = e);
}
function qa() {
  for (var e, t = Xt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Xt = i);
  ft = e, bi(n);
}
function bi(e) {
  if (!it) {
    mt && (mt = clearTimeout(mt));
    var t = e - Ge;
    t > 24 ? (e < 1 / 0 && (mt = setTimeout(yn, e - Et.now() - ei)), ct && (ct = clearInterval(ct))) : (ct || (Kt = Et.now(), ct = setInterval(za, ss)), it = 1, os(yn));
  }
}
function In(e, t, i) {
  var n = new Qt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Fa = Di("start", "end", "cancel", "interrupt"), Va = [], as = 0, vn = 1, $i = 2, Ft = 3, xn = 4, Ei = 5, Vt = 6;
function ti(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Ha(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Fa,
    tween: Va,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: as
  });
}
function qi(e, t) {
  var i = xe(e, t);
  if (i.state > as) throw new Error("too late; already scheduled");
  return i;
}
function $e(e, t) {
  var i = xe(e, t);
  if (i.state > Ft) throw new Error("too late; already running");
  return i;
}
function xe(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Ha(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = rs(o, 0, i.time);
  function o(c) {
    i.state = vn, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var h, p, m, f;
    if (i.state !== vn) return l();
    for (h in n)
      if (f = n[h], f.name === i.name) {
        if (f.state === Ft) return In(r);
        f.state === xn ? (f.state = Vt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[h]) : +h < t && (f.state = Vt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[h]);
      }
    if (In(function() {
      i.state === Ft && (i.state = xn, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = $i, i.on.call("start", e, e.__data__, i.index, i.group), i.state === $i) {
      for (i.state = Ft, s = new Array(m = i.tween.length), h = 0, p = -1; h < m; ++h)
        (f = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (s[++p] = f);
      s.length = p + 1;
    }
  }
  function a(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Ei, 1), p = -1, m = s.length; ++p < m; )
      s[p].call(e, h);
    i.state === Ei && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Vt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Ht(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > $i && n.state < Ei, n.state = Vt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Wa(e) {
  return this.each(function() {
    Ht(this, e);
  });
}
function Ga(e, t) {
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
function Ba(e, t, i) {
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
function Ya(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = xe(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Ga : Ba)(i, e, t));
}
function Fi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = $e(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return xe(s, n).value[t];
  };
}
function ds(e, t) {
  var i;
  return (typeof t == "number" ? Pe : t instanceof $t ? fn : (i = $t(t)) ? (t = i, fn) : Aa)(e, t);
}
function ja(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Xa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ka(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Qa(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Za(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function Ja(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), l;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), l = a + "", r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a)));
  };
}
function ed(e, t) {
  var i = Jt(e), n = i === "transform" ? Na : ds;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Ja : Za)(i, n, Fi(this, "attr." + e, t)) : t == null ? (i.local ? Xa : ja)(i) : (i.local ? Qa : Ka)(i, n, t));
}
function td(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function id(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function nd(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && id(e, o)), i;
  }
  return s._value = t, s;
}
function sd(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && td(e, o)), i;
  }
  return s._value = t, s;
}
function od(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Jt(e);
  return this.tween(i, (n.local ? nd : sd)(n, t));
}
function rd(e, t) {
  return function() {
    qi(this, e).delay = +t.apply(this, arguments);
  };
}
function ad(e, t) {
  return t = +t, function() {
    qi(this, e).delay = t;
  };
}
function dd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? rd : ad)(t, e)) : xe(this.node(), t).delay;
}
function ld(e, t) {
  return function() {
    $e(this, e).duration = +t.apply(this, arguments);
  };
}
function cd(e, t) {
  return t = +t, function() {
    $e(this, e).duration = t;
  };
}
function ud(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ld : cd)(t, e)) : xe(this.node(), t).duration;
}
function hd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    $e(this, e).ease = t;
  };
}
function pd(e) {
  var t = this._id;
  return arguments.length ? this.each(hd(t, e)) : xe(this.node(), t).ease;
}
function md(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    $e(this, e).ease = i;
  };
}
function fd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(md(this._id, e));
}
function gd(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], l, c = 0; c < r; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && a.push(l);
  return new Me(n, this._parents, this._name, this._id);
}
function wd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var l = t[a], c = i[a], h = l.length, p = r[a] = new Array(h), m, f = 0; f < h; ++f)
      (m = l[f] || c[f]) && (p[f] = m);
  for (; a < n; ++a)
    r[a] = t[a];
  return new Me(r, this._parents, this._name, this._id);
}
function yd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Id(e, t, i) {
  var n, s, o = yd(t) ? qi : $e;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function vd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? xe(this.node(), i).on.on(e) : this.each(Id(i, e, t));
}
function xd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _d() {
  return this.on("end.remove", xd(this._id));
}
function kd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ri(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], l = a.length, c = o[r] = new Array(l), h, p, m = 0; m < l; ++m)
      (h = a[m]) && (p = e.call(h, h.__data__, m, a)) && ("__data__" in h && (p.__data__ = h.__data__), c[m] = p, ti(c[m], t, i, m, c, xe(h, i)));
  return new Me(o, this._parents, t, i);
}
function bd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Fn(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var l = n[a], c = l.length, h, p = 0; p < c; ++p)
      if (h = l[p]) {
        for (var m = e.call(h, h.__data__, p, l), f, y = xe(h, i), v = 0, S = m.length; v < S; ++v)
          (f = m[v]) && ti(f, t, i, v, m, y);
        o.push(m), r.push(h);
      }
  return new Me(o, r, t, i);
}
var $d = At.prototype.constructor;
function Ed() {
  return new $d(this._groups, this._parents);
}
function Sd(e, t) {
  var i, n, s;
  return function() {
    var o = tt(this, e), r = (this.style.removeProperty(e), tt(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function ls(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ad(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = tt(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Cd(e, t, i) {
  var n, s, o;
  return function() {
    var r = tt(this, e), a = i(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(e), tt(this, e))), r === l ? null : r === n && l === s ? o : (s = l, o = t(n = r, a));
  };
}
function Md(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var l = $e(this, e), c = l.on, h = l.value[o] == null ? a || (a = ls(t)) : void 0;
    (c !== i || s !== h) && (n = (i = c).copy()).on(r, s = h), l.on = n;
  };
}
function Pd(e, t, i) {
  var n = (e += "") == "transform" ? Pa : ds;
  return t == null ? this.styleTween(e, Sd(e, n)).on("end.style." + e, ls(e)) : typeof t == "function" ? this.styleTween(e, Cd(e, n, Fi(this, "style." + e, t))).each(Md(this._id, e)) : this.styleTween(e, Ad(e, n, t), i).on("end.style." + e, null);
}
function Nd(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Td(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Nd(e, r, i)), n;
  }
  return o._value = t, o;
}
function Od(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Td(e, t, i ?? ""));
}
function Rd(e) {
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
function Dd(e) {
  return this.tween("text", typeof e == "function" ? Ud(Fi(this, "text", e)) : Rd(e == null ? "" : e + ""));
}
function Ld(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function zd(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Ld(s)), t;
  }
  return n._value = e, n;
}
function qd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, zd(e));
}
function Fd() {
  for (var e = this._name, t = this._id, i = cs(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      if (l = r[c]) {
        var h = xe(l, t);
        ti(l, e, i, c, r, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Me(n, this._parents, e, i);
}
function Vd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = $e(this, n), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Hd = 0;
function Me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function cs() {
  return ++Hd;
}
var Ae = At.prototype;
Me.prototype = {
  constructor: Me,
  select: kd,
  selectAll: bd,
  selectChild: Ae.selectChild,
  selectChildren: Ae.selectChildren,
  filter: gd,
  merge: wd,
  selection: Ed,
  transition: Fd,
  call: Ae.call,
  nodes: Ae.nodes,
  node: Ae.node,
  size: Ae.size,
  empty: Ae.empty,
  each: Ae.each,
  on: vd,
  attr: ed,
  attrTween: od,
  style: Pd,
  styleTween: Od,
  text: Dd,
  textTween: qd,
  remove: _d,
  tween: Ya,
  delay: dd,
  duration: ud,
  ease: pd,
  easeVarying: fd,
  end: Vd,
  [Symbol.iterator]: Ae[Symbol.iterator]
};
function Wd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Gd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Wd
};
function Bd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Yd(e) {
  var t, i;
  e instanceof Me ? (t = e._id, e = e._name) : (t = cs(), (i = Gd).time = zi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, l, c = 0; c < a; ++c)
      (l = r[c]) && ti(l, e, t, c, r, i || Bd(l, t));
  return new Me(n, this._parents, e, t);
}
At.prototype.interrupt = Wa;
At.prototype.transition = Yd;
const Ut = (e) => () => e;
function jd(e, {
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
var yt = new Ce(1, 0, 0);
Ce.prototype;
function mi(e) {
  e.stopImmediatePropagation();
}
function ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Kd() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function _n() {
  return this.__zoom || yt;
}
function Qd(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Zd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jd(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function el() {
  var e = Xd, t = Kd, i = Jd, n = Qd, s = Zd, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = Ua, c = Di("start", "zoom", "end"), h, p, m, f = 500, y = 150, v = 0, S = 10;
  function _(u) {
    u.property("__zoom", _n).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", A).filter(s).on("touchstart.zoom", N).on("touchmove.zoom", W).on("touchend.zoom touchcancel.zoom", Q).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(u, x, w, b) {
    var P = u.selection ? u.selection() : u;
    P.property("__zoom", _n), u !== P ? I(u, x, w, b) : P.interrupt().each(function() {
      g(this, arguments).event(b).start().zoom(null, typeof x == "function" ? x.apply(this, arguments) : x).end();
    });
  }, _.scaleBy = function(u, x, w, b) {
    _.scaleTo(u, function() {
      var P = this.__zoom.k, L = typeof x == "function" ? x.apply(this, arguments) : x;
      return P * L;
    }, w, b);
  }, _.scaleTo = function(u, x, w, b) {
    _.transform(u, function() {
      var P = t.apply(this, arguments), L = this.__zoom, C = w == null ? V(P) : typeof w == "function" ? w.apply(this, arguments) : w, T = L.invert(C), X = typeof x == "function" ? x.apply(this, arguments) : x;
      return i(D(M(L, X), C, T), P, r);
    }, w, b);
  }, _.translateBy = function(u, x, w, b) {
    _.transform(u, function() {
      return i(this.__zoom.translate(
        typeof x == "function" ? x.apply(this, arguments) : x,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), r);
    }, null, b);
  }, _.translateTo = function(u, x, w, b, P) {
    _.transform(u, function() {
      var L = t.apply(this, arguments), C = this.__zoom, T = b == null ? V(L) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(yt.translate(T[0], T[1]).scale(C.k).translate(
        typeof x == "function" ? -x.apply(this, arguments) : -x,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), L, r);
    }, b, P);
  };
  function M(u, x) {
    return x = Math.max(o[0], Math.min(o[1], x)), x === u.k ? u : new Ce(x, u.x, u.y);
  }
  function D(u, x, w) {
    var b = x[0] - w[0] * u.k, P = x[1] - w[1] * u.k;
    return b === u.x && P === u.y ? u : new Ce(u.k, b, P);
  }
  function V(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function I(u, x, w, b) {
    u.on("start.zoom", function() {
      g(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      g(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var P = this, L = arguments, C = g(P, L).event(b), T = t.apply(P, L), X = w == null ? V(T) : typeof w == "function" ? w.apply(P, L) : w, Z = Math.max(T[1][0] - T[0][0], T[1][1] - T[0][1]), J = P.__zoom, ce = typeof x == "function" ? x.apply(P, L) : x, ge = l(J.invert(X).concat(Z / J.k), ce.invert(X).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var we = ge(ue), nt = Z / we[2];
          ue = new Ce(nt, X[0] - we[0] * nt, X[1] - we[1] * nt);
        }
        C.zoom(null, ue);
      };
    });
  }
  function g(u, x, w) {
    return !w && u.__zooming || new k(u, x);
  }
  function k(u, x) {
    this.that = u, this.args = x, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, x), this.taps = 0;
  }
  k.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, x) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = x.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = x.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = x.invert(this.touch1[0])), this.that.__zoom = x, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var x = _e(this.that).datum();
      c.call(
        u,
        this.that,
        new jd(u, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: c
        }),
        x
      );
    }
  };
  function $(u, ...x) {
    if (!e.apply(this, arguments)) return;
    var w = g(this, x).event(u), b = this.__zoom, P = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, n.apply(this, arguments)))), L = Ue(u);
    if (w.wheel)
      (w.mouse[0][0] !== L[0] || w.mouse[0][1] !== L[1]) && (w.mouse[1] = b.invert(w.mouse[0] = L)), clearTimeout(w.wheel);
    else {
      if (b.k === P) return;
      w.mouse = [L, b.invert(L)], Ht(this), w.start();
    }
    ut(u), w.wheel = setTimeout(C, y), w.zoom("mouse", i(D(M(b, P), w.mouse[0], w.mouse[1]), w.extent, r));
    function C() {
      w.wheel = null, w.end();
    }
  }
  function O(u, ...x) {
    if (m || !e.apply(this, arguments)) return;
    var w = u.currentTarget, b = g(this, x, !0).event(u), P = _e(u.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", Z, !0), L = Ue(u, w), C = u.clientX, T = u.clientY;
    la(u.view), mi(u), b.mouse = [L, this.__zoom.invert(L)], Ht(this), b.start();
    function X(J) {
      if (ut(J), !b.moved) {
        var ce = J.clientX - C, ge = J.clientY - T;
        b.moved = ce * ce + ge * ge > v;
      }
      b.event(J).zoom("mouse", i(D(b.that.__zoom, b.mouse[0] = Ue(J, w), b.mouse[1]), b.extent, r));
    }
    function Z(J) {
      P.on("mousemove.zoom mouseup.zoom", null), ca(J.view, b.moved), ut(J), b.event(J).end();
    }
  }
  function A(u, ...x) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, b = Ue(u.changedTouches ? u.changedTouches[0] : u, this), P = w.invert(b), L = w.k * (u.shiftKey ? 0.5 : 2), C = i(D(M(w, L), b, P), t.apply(this, x), r);
      ut(u), a > 0 ? _e(this).transition().duration(a).call(I, C, b, u) : _e(this).call(_.transform, C, b, u);
    }
  }
  function N(u, ...x) {
    if (e.apply(this, arguments)) {
      var w = u.touches, b = w.length, P = g(this, x, u.changedTouches.length === b).event(u), L, C, T, X;
      for (mi(u), C = 0; C < b; ++C)
        T = w[C], X = Ue(T, this), X = [X, this.__zoom.invert(X), T.identifier], P.touch0 ? !P.touch1 && P.touch0[2] !== X[2] && (P.touch1 = X, P.taps = 0) : (P.touch0 = X, L = !0, P.taps = 1 + !!h);
      h && (h = clearTimeout(h)), L && (P.taps < 2 && (p = X[0], h = setTimeout(function() {
        h = null;
      }, f)), Ht(this), P.start());
    }
  }
  function W(u, ...x) {
    if (this.__zooming) {
      var w = g(this, x).event(u), b = u.changedTouches, P = b.length, L, C, T, X;
      for (ut(u), L = 0; L < P; ++L)
        C = b[L], T = Ue(C, this), w.touch0 && w.touch0[2] === C.identifier ? w.touch0[0] = T : w.touch1 && w.touch1[2] === C.identifier && (w.touch1[0] = T);
      if (C = w.that.__zoom, w.touch1) {
        var Z = w.touch0[0], J = w.touch0[1], ce = w.touch1[0], ge = w.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, we = (we = ge[0] - J[0]) * we + (we = ge[1] - J[1]) * we;
        C = M(C, Math.sqrt(ue / we)), T = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], X = [(J[0] + ge[0]) / 2, (J[1] + ge[1]) / 2];
      } else if (w.touch0) T = w.touch0[0], X = w.touch0[1];
      else return;
      w.zoom("touch", i(D(C, T, X), w.extent, r));
    }
  }
  function Q(u, ...x) {
    if (this.__zooming) {
      var w = g(this, x).event(u), b = u.changedTouches, P = b.length, L, C;
      for (mi(u), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), L = 0; L < P; ++L)
        C = b[L], w.touch0 && w.touch0[2] === C.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === C.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (C = Ue(C, this), Math.hypot(p[0] - C[0], p[1] - C[1]) < S)) {
        var T = _e(this).on("dblclick.zoom");
        T && T.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : Ut(+u), _) : n;
  }, _.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ut(!!u), _) : e;
  }, _.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : Ut(!!u), _) : s;
  }, _.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ut([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), _) : t;
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
var tl = Object.defineProperty, il = Object.getOwnPropertyDescriptor, re = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? il(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && tl(t, i, s), s;
};
function nl(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, l = s * a - o * r;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / l, h = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function sl(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, l = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - l), t: r };
}
function ol(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, l = (r.x - o.x) / a, c = (r.y - o.y) / a, h = t.map(([m, f]) => nl(o, r, m, f)).filter((m) => m !== null).filter((m) => m.t * a > i + 2 && (1 - m.t) * a > i + 2).sort((m, f) => m.t - f.t);
    let p = -1 / 0;
    for (const m of h)
      m.t * a - i <= p + 2 || (n += ` L ${m.x - l * i} ${m.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + l * i} ${m.y + c * i}`, p = m.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const Dt = {
  component: H`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: H`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: H`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: H`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: H`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: H`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: H`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: H`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: H`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: H`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: H`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: H`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: H`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: H`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: H`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let ne = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = yt, this._dragPos = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = el().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
  /** Center and scale the viewport so the whole scene is visible. */
  fit(e = 60) {
    const t = this.scene.nodes, i = this.renderRoot.querySelector("svg.main");
    if (!t.length || !i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = Math.min(...t.map((h) => h.x - h.w / 2)) - e, o = Math.max(...t.map((h) => h.x + h.w / 2)) + e, r = Math.min(...t.map((h) => h.y - h.h / 2)) - e, a = Math.max(...t.map((h) => h.y + h.h / 2)) + e, l = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = yt.translate(n.width / 2 - l * (s + o) / 2, n.height / 2 - l * (r + a) / 2).scale(l);
    _e(i).call(this._zoomBehavior.transform, c);
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
      const f = this.nodeIdAt(m), y = f && f !== t.id ? this.scene.nodes.find((v) => v.id === f) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, h = (m) => {
      if ((m.buttons & 1) === 0) {
        p(m);
        return;
      }
      const f = this.toScene(m), y = f.x - i.x, v = f.y - i.y;
      if (!(!s && Math.hypot(y, v) < 3 / this._t.k))
        if (s = !0, r && a) {
          const S = /* @__PURE__ */ new Map();
          for (const _ of r) {
            const M = a.get(_.id), D = this.clampToParent(_, M.x + y, M.y + v);
            S.set(_.id, { x: D.x, y: D.y });
          }
          this._dragGroup = S;
        } else l(m) ? (this._dragPos = { id: t.id, x: n.x + y, y: n.y + v }, this._hoverNodeId = c(m)) : (this._dragPos = this.clampToParent(t, n.x + y, n.y + v), this._hoverNodeId = null);
    }, p = (m) => {
      if (window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", p), s && this._dragGroup)
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
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", p);
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
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((v) => v.parentId === t.id), l = Math.min(...a.map((v) => v.x - v.w / 2)), c = Math.max(...a.map((v) => v.x + v.w / 2)), h = Math.min(...a.map((v) => v.y - v.h / 2)), p = Math.max(...a.map((v) => v.y + v.h / 2)), m = Ms(
      a.map((v) => ({ dx: v.x - r.x, dy: v.y - r.y, w: v.w, h: v.h })),
      { w: s, h: o }
    ), f = (v) => {
      if ((v.buttons & 1) === 0) {
        y();
        return;
      }
      const S = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(S.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(S.y - r.y))
        };
        return;
      }
      const _ = r.x - i * r.w / 2, M = r.y - n * r.h / 2, D = i > 0 ? Math.max(S.x, _ + s, a.length ? c + 10 : -1 / 0) : Math.min(S.x, _ - s, a.length ? l - 10 : 1 / 0), V = n > 0 ? Math.max(S.y, M + o, a.length ? p + 10 : -1 / 0) : Math.min(S.y, M - o, a.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + D) / 2,
        y: (M + V) / 2,
        w: Math.abs(D - _),
        h: Math.abs(V - M)
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
    const t = this.scene.nodes.find((h) => h.id === e.sourceId), i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const h = this.edgeOffset(e);
      if (h !== 0) {
        const p = Math.hypot(c.x - l.x, c.y - l.y) || 1, m = -(c.y - l.y) / p * h, f = (c.x - l.x) / p * h;
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
      const { dist: s } = sl(t, e[n], e[n + 1]);
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
          const h = [...this._wpDrag.points];
          h[s] = c, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: h, index: s };
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
    return H`
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
          ${e.tooltip ? H`<title>${e.tooltip}</title>` : ""}
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
    return H`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${ol(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? H`<text x=${a.x} y=${a.y - 6} text-anchor="middle"
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
        ${s ? l.map((c, h) => {
      var m;
      const p = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === h;
      return H`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${p ? 6 : 5}
                        fill=${p ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, h);
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
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = a / 2, h = l / 2, p = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return H`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? H`<rect x=${-c - 4} y=${-h - 4} width=${a + 8} height=${l + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-h} width=${a} height=${l} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? H`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? H`<text x=${-c} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? H`<g transform="translate(${c - 13}, ${-h + 13})"
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
        ${e.symbol && Dt[e.symbol] && !r ? H`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Dt[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && Dt[e.symbol] ? H`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Dt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? H`
              <foreignObject x=${-c + 6} y=${o ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(v) => v.stopPropagation()}
                  @keydown=${(v) => {
      v.stopPropagation(), v.key === "Enter" && this.commitRename(e, v.target.value), v.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(v) => this.commitRename(e, v.target.value)}
                />
              </foreignObject>` : r ? H`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${p}</text>` : o ? H`<text x=${-c + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : H`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? H`<line x1=${-c + 8} y1=${-h + 28} x2=${c - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, h],
      [0, -h]
    ].map(
      ([v, S]) => H`
                <circle data-handle cx=${v} cy=${S} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, S]) => H`
                <rect data-resize x=${v * c - 6.5} y=${S * h - 6.5} width="13" height="13" rx="2.5"
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
    if (!this._pendingLink) return H``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return H``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return H`
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
        const { a: r, b: a } = this._rubber, l = Math.min(r.x, a.x), c = Math.max(r.x, a.x), h = Math.min(r.y, a.y), p = Math.max(r.y, a.y), m = this.scene.nodes.filter((f) => {
          const y = this.nodePos(f);
          return y.x >= l && y.x <= c && y.y >= h && y.y <= p;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return H``;
    const { a: e, b: t } = this._rubber;
    return H`
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = yt.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    _e(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return R``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, l = s.height / this._t.k;
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
      var h, p;
      (p = (h = c.currentTarget).hasPointerCapture) != null && p.call(h, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const h = this.nodePos(c);
      return H`<rect
              x=${(h.x - c.w / 2 - e.minX) * n}
              y=${(h.y - c.h / 2 - e.minY) * n}
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
      (s) => H`
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
ne.styles = Pi`
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
  be({ attribute: !1 })
], ne.prototype, "scene", 2);
re([
  be({ attribute: !1 })
], ne.prototype, "selectedId", 2);
re([
  be({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
re([
  be({ type: Boolean })
], ne.prototype, "connectable", 2);
re([
  be({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
re([
  U()
], ne.prototype, "_t", 2);
re([
  U()
], ne.prototype, "_dragPos", 2);
re([
  U()
], ne.prototype, "_dragGroup", 2);
re([
  U()
], ne.prototype, "_pendingLink", 2);
re([
  U()
], ne.prototype, "_hoverNodeId", 2);
re([
  U()
], ne.prototype, "_editingId", 2);
re([
  U()
], ne.prototype, "_spaceDown", 2);
re([
  U()
], ne.prototype, "_wpDrag", 2);
re([
  U()
], ne.prototype, "_selectedWaypoint", 2);
re([
  U()
], ne.prototype, "_resize", 2);
re([
  U()
], ne.prototype, "_rubber", 2);
ne = re([
  Oi("modux-canvas")
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
const je = (e) => e.trim().toLowerCase();
function rl(e, t) {
  var O, A, N, W, Q;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((x) => ({ ...x, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((u) => (u.domainServices ?? []).map((x) => x.id))
  ), l = e.modules.flatMap(
    (u) => (u.domainEvents ?? []).map((x) => ({ ...x, moduleId: u.id, application: !1 }))
  ), c = e.modules.flatMap(
    (u) => (u.applicationEvents ?? []).map((x) => ({ ...x, moduleId: u.id, application: !0 }))
  ), h = e.modules.flatMap(
    (u) => (u.readModels ?? []).map((x) => ({ ...x, moduleId: u.id }))
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
  const p = /* @__PURE__ */ new Map();
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
    }), p.set(je(u.name), u.id);
  const m = (u) => {
    if (!u || !u.trim()) return null;
    const x = p.get(je(u));
    if (x) return x;
    const w = `evname:${je(u)}`;
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
    const x = h.find((b) => b.id === u.id) ?? h.find((b) => u.name && je(b.name) === je(u.name)), w = (x == null ? void 0 : x.id) ?? (u.id || (u.name ? `rm:${je(u.name)}` : null));
    return w ? (he(i, {
      id: w,
      label: (x == null ? void 0 : x.name) ?? u.name ?? w,
      x: 0,
      y: 0,
      w: q.readModel.w,
      h: q.readModel.h,
      kind: x ? "read-model" : "derived-read-model",
      fill: q.readModel.fill,
      stroke: q.readModel.stroke,
      dashed: !x,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const x = (e.actors ?? []).find((w) => w.id === u.actorId);
    x && (he(i, {
      id: x.id,
      label: x.name,
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
      id: `es-actor:${x.id}->${u.targetId}`,
      sourceId: x.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const x = (e.agentUses ?? []).filter((C) => C.agentId === u.id), w = (e.agentExternalUses ?? []).filter((C) => C.agentId === u.id), b = (e.agentRags ?? []).filter((C) => C.agentId === u.id), P = (e.agentMcpUses ?? []).filter((C) => C.agentId === u.id), L = (e.agentGatewayUses ?? []).some((C) => C.agentId === u.id) || (e.agentApiOpUses ?? []).some((C) => C.agentId === u.id) || (e.agentQueryUses ?? []).some((C) => C.agentId === u.id) || (e.agentDelegations ?? []).some((C) => C.agentId === u.id) || (e.agentTriggers ?? []).some((C) => C.agentId === u.id);
    if (!(!x.length && !w.length && !b.length && !P.length && !L)) {
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
      for (const C of x)
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
      for (const C of w) {
        const T = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === C.externalUseCaseId)
        );
        if (!T) continue;
        const X = (O = (T.useCases ?? []).find((Z) => Z.id === C.externalUseCaseId)) == null ? void 0 : O.name;
        he(i, {
          id: T.id,
          label: T.name,
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
          targetId: T.id,
          kind: "es-agent-external",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Llama a ${X} del sistema externo` : void 0
        });
      }
      for (const C of P) {
        const T = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === C.mcpServerId)
        );
        if (!T) continue;
        const X = (A = (T.mcpServers ?? []).find((Z) => Z.id === C.mcpServerId)) == null ? void 0 : A.name;
        he(i, {
          id: T.id,
          label: T.name,
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
          targetId: T.id,
          kind: "es-agent-mcp",
          label: X,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: X ? `Consume las herramientas del servidor MCP ${X}` : void 0
        });
      }
      for (const C of b) {
        const T = (e.rags ?? []).find((X) => X.id === C.ragId);
        if (T) {
          he(i, {
            id: T.id,
            label: T.name,
            x: 0,
            y: 0,
            w: q.readModel.w,
            h: q.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${T.name} — base de conocimiento (retrieval)`
          }), ie(i, {
            id: `es-agrag:${u.id}->${T.id}`,
            sourceId: u.id,
            targetId: T.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const X of T.sourceReadModelIds ?? []) {
            const Z = f({ id: X });
            Z && ie(i, {
              id: `es-ragsrc:${T.id}->${Z}`,
              sourceId: Z,
              targetId: T.id,
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
  const y = (u) => {
    const x = e.externalSystems.find((w) => w.id === u);
    return x ? (he(i, {
      id: x.id,
      label: x.name,
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
    }), x.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const x = y(u.externalSystemId);
    !x || !o.has(u.useCaseId) || ie(i, {
      id: `es-extin:${x}->${u.useCaseId}`,
      sourceId: x,
      targetId: u.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const u of e.externalUseCaseCalls ?? []) {
    if (!o.has(u.sourceId)) continue;
    const x = e.externalSystems.find(
      (P) => (P.useCases ?? []).some((L) => L.id === u.targetId)
    ), w = x ? y(x.id) : null;
    if (!w) continue;
    const b = (N = ((x == null ? void 0 : x.useCases) ?? []).find((P) => P.id === u.targetId)) == null ? void 0 : N.name;
    ie(i, {
      id: `es-extout:${u.sourceId}->${u.targetId}`,
      sourceId: u.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: b,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: b ? `Llama a ${b} del sistema externo` : void 0
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
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || r.some((w) => w.id === u.sourceId) || a.has(u.sourceId))) || ie(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const S = (u, x, w, b, P, L) => (he(i, {
    id: u,
    label: x,
    x: 0,
    y: 0,
    w: q.policy.w,
    h: q.policy.h,
    kind: w,
    symbol: "flow",
    fill: q.policy.fill,
    stroke: q.policy.stroke,
    badge: b,
    tooltip: P
  }), u), _ = (u, x) => {
    const w = m(u);
    w && ie(i, {
      id: `es-trigger:${w}->${x}`,
      sourceId: w,
      targetId: x,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, M = (u, x) => {
    !x || !o.has(x) || ie(i, {
      id: `es-invoke:${u}->${x}`,
      sourceId: u,
      targetId: x,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const u of e.subscriptions ?? []) {
    const x = S(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    _(u.eventName, x);
    for (const w of u.actions ?? []) {
      if (w.type === "CallUseCase" && M(x, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const b = `saga:${w.sagaId}`;
        S(b, w.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${x}->${b}`,
          sourceId: x,
          targetId: b,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const b = (e.projections ?? []).find((P) => P.id === w.projectionId);
        b && ie(i, {
          id: `es-feeds:${x}->${b.id}`,
          sourceId: x,
          targetId: b.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const u of e.projections ?? []) {
    const x = S(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const P of u.handledEventIds) {
      const L = i.nodes.has(P) ? P : null;
      L && ie(i, {
        id: `es-trigger:${L}->${x}`,
        sourceId: L,
        targetId: x,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    u.sourceAggregateId && i.nodes.has(u.sourceAggregateId) && ie(i, {
      id: `es-state:${u.id}`,
      sourceId: u.sourceAggregateId,
      targetId: x,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (w) {
      const P = e.externalSystems.find(
        (C) => (C.useCases ?? []).some((T) => T.id === w) || (C.tables ?? []).some((T) => T.id === w)
      ), L = P ? y(P.id) : null;
      if (L) {
        const C = ((W = (P.useCases ?? []).find((T) => T.id === w)) == null ? void 0 : W.name) ?? ((Q = (P.tables ?? []).find((T) => T.id === w)) == null ? void 0 : Q.name);
        ie(i, {
          id: `es-poll:${u.id}`,
          sourceId: L,
          targetId: x,
          kind: "es-projects-poll",
          label: C,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: C ? `polling de ${C}` : "polling"
        });
      }
    }
    const b = f({ id: u.readModelId, name: u.readModelName });
    b && ie(i, {
      id: `es-projects:${x}->${b}`,
      sourceId: x,
      targetId: b,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const u of e.flows) {
    if (u.archetype === "MATERIALIZES") {
      const w = m(u.triggerEvent), b = f({ name: u.readModelName ?? `${u.triggerEvent}View` });
      w && b && ie(i, {
        id: `es-mat:${u.id}`,
        sourceId: w,
        targetId: b,
        kind: "es-materializes",
        label: u.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${u.name} [MATERIALIZES]`
      });
      continue;
    }
    const x = S(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (_(u.triggerEvent, x), M(x, u.targetUseCaseId), !u.targetUseCaseId) {
      const w = y(u.targetId), b = w ?? `tgt:${u.targetId}`;
      !w && n.has(u.targetId) && he(i, {
        id: b,
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
      }), i.nodes.has(b) && ie(i, {
        id: `es-deliver:${u.id}`,
        sourceId: x,
        targetId: b,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const x = S(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, x);
    for (const b of u.steps) M(x, b.useCaseId);
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: x,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const x = S(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, x);
    for (const b of u.steps ?? []) {
      M(x, b.targetUseCaseId);
      for (const P of [b.emittedEventName, b.completionEventName]) {
        const L = m(P);
        L && ie(i, {
          id: `es-wfemit:${u.id}:${L}`,
          sourceId: x,
          targetId: L,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: x,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const D = [...i.nodes.values()], V = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    V.has(u.targetId) || V.set(u.targetId, []), V.get(u.targetId).push(u.sourceId);
  const I = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), k = (u) => {
    const x = I.get(u);
    if (x !== void 0) return x;
    if (g.has(u)) return 0;
    g.add(u);
    const w = V.get(u) ?? [], b = w.length ? 1 + Math.max(...w.map(k)) : 0;
    return g.delete(u), I.set(u, b), b;
  }, $ = /* @__PURE__ */ new Map();
  for (const u of D) {
    const x = t[u.id];
    if (x) {
      u.x = x.x, u.y = x.y;
      continue;
    }
    const w = k(u.id), b = $.get(w) ?? 0;
    $.set(w, b + 1), u.x = 140 + w * 260, u.y = 110 + b * 110;
  }
  return { nodes: D, edges: i.edges };
}
const al = 190, dl = 56, kn = 180, ll = 56, cl = 150, ul = 44, bn = 250, $n = 100;
function hl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function pl(e, t) {
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
function ml(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : l.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var S;
    const l = new Map(a.steps.map((_) => [_.id, _])), c = new Map(a.steps.map((_) => [_.id, hl(_, l)])), h = /* @__PURE__ */ new Map();
    for (const _ of a.steps) {
      const M = c.get(_.id) ?? 0;
      h.set(M, (h.get(M) ?? 0) + 1);
    }
    const p = Math.max(1, ...h.values()), m = pl(e, a);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const _ = t[m.id] ?? { x: 140, y: r };
      i.push({
        id: m.id,
        label: m.label,
        x: _.x,
        y: _.y,
        w: cl,
        h: ul,
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
      w: al,
      h: dl,
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
    const y = /* @__PURE__ */ new Map();
    let v = 0;
    for (const _ of a.steps) {
      const M = c.get(_.id) ?? 0;
      v = Math.max(v, M);
      const D = y.get(M) ?? 0;
      y.set(M, D + 1);
      const V = t[_.id] ?? {
        x: f.x + (M + 1) * bn,
        y: r + (D - (h.get(M) - 1) / 2) * $n
      }, I = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: V.x,
        y: V.y,
        w: kn,
        h: ll,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: I ? `→ ${I}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${I ? ` · lanza ${I}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const g = (_.dependsOnStepIds ?? []).filter((k) => l.has(k));
      g.length === 0 && n.push({
        id: `wfs:${a.id}:${_.id}`,
        sourceId: a.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of g)
        n.push({
          id: `wfdep:${k}->${_.id}`,
          sourceId: k,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((S = l.get(k)) == null ? void 0 : S.name) ?? k}`
        });
    }
    if (a.onCompletionEventName) {
      const _ = `done:${a.id}`, M = t[_] ?? { x: f.x + (v + 2) * bn, y: r };
      i.push({
        id: _,
        label: a.onCompletionEventName,
        x: M.x,
        y: M.y,
        w: kn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const D = new Set(a.steps.flatMap((I) => I.dependsOnStepIds ?? [])), V = a.steps.filter((I) => !D.has(I.id));
      for (const I of V.length ? V : [])
        n.push({
          id: `wfd:${a.id}:${I.id}`,
          sourceId: I.id,
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
    r += Math.max(2, p + 1) * $n + 60;
  }), { nodes: i, edges: n };
}
async function fl(e, t) {
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
var gl = Object.defineProperty, wl = Object.getOwnPropertyDescriptor, G = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? wl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && gl(t, i, s), s;
};
const Si = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, yl = Object.keys(Si);
function ht(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, r = i.y + i.h / 2;
  let a = 0, l = 1;
  const c = t.x - e.x, h = t.y - e.y;
  for (const [p, m] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-h, e.y - o],
    [h, r - e.y]
  ]) {
    if (p === 0) {
      if (m < 0) return !1;
      continue;
    }
    const f = m / p;
    if (p < 0) {
      if (f > l) return !1;
      f > a && (a = f);
    } else {
      if (f < a) return !1;
      f < l && (l = f);
    }
  }
  return l - a > 0.02;
}
function Il(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((h) => [h.id, h])), s = (h) => {
    var m;
    const p = /* @__PURE__ */ new Set();
    for (let f = h; f; f = (m = n.get(f)) == null ? void 0 : m.parentId) p.add(f);
    return p;
  }, o = e.nodes, r = (h) => h.parentId ? Math.min(i, 6) : i, a = /* @__PURE__ */ new Map(), l = (h, p, m) => {
    const f = r(m), y = { x: m.x, y: m.y, w: m.w + 2 * f, h: m.h + 2 * f }, v = m.w / 2 + f * 1.5, S = m.h / 2 + f * 1.5, _ = { x: m.x - v, y: m.y - S }, M = { x: m.x + v, y: m.y - S }, D = { x: m.x - v, y: m.y + S }, V = { x: m.x + v, y: m.y + S }, I = [];
    for (const g of [_, M, D, V])
      !ht(h, g, y) && !ht(g, p, y) && I.push([g]);
    for (const [g, k] of [
      [_, M],
      [M, _],
      [M, V],
      [V, M],
      [V, D],
      [D, V],
      [D, _],
      [_, D]
    ])
      !ht(h, g, y) && !ht(k, p, y) && I.push([g, k]);
    return I;
  };
  for (const h of e.edges) {
    if ((c = t[h.id]) != null && c.length) continue;
    const p = n.get(h.sourceId), m = n.get(h.targetId);
    if (!p || !m) continue;
    const f = /* @__PURE__ */ new Set([...s(p.id), ...s(m.id)]), y = [
      { x: p.x, y: p.y },
      { x: m.x, y: m.y }
    ];
    for (let v = 0; v < 12; v++) {
      let S = !1;
      e: for (let _ = 0; _ < y.length - 1; _++)
        for (const M of o) {
          if (f.has(M.id)) continue;
          const D = r(M), V = { x: M.x, y: M.y, w: M.w + 2 * D, h: M.h + 2 * D };
          if (!ht(y[_], y[_ + 1], V)) continue;
          const I = l(y[_], y[_ + 1], M);
          if (!I.length) continue;
          const g = ($) => o.some(
            (O) => O !== M && !f.has(O.id) && Math.abs($.x - O.x) < O.w / 2 + r(O) / 2 && Math.abs($.y - O.y) < O.h / 2 + r(O) / 2
          ), k = ($) => {
            let O = 0;
            const A = [y[_], ...$, y[_ + 1]];
            for (let N = 0; N < A.length - 1; N++)
              O += Math.hypot(A[N + 1].x - A[N].x, A[N + 1].y - A[N].y);
            return O + ($.some(g) ? 1e4 : 0);
          };
          I.sort(($, O) => k($) - k(O)), y.splice(_ + 1, 0, ...I[0]), S = !0;
          break e;
        }
      if (!S) break;
    }
    y.length > 2 && a.set(
      h.id,
      y.slice(1, -1).map((v) => ({ x: Math.round(v.x), y: Math.round(v.y) }))
    );
  }
  return a;
}
const j = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function vl(e, t) {
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
function xl(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let F = class extends Ve {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null;
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
    return Nt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Nt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Nt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const s = Nt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((h) => !h.parentId), a = Ai(r), l = [...a.keys()].map((h) => ({
      kind: "move-node",
      view: "context-map",
      id: h,
      pos: o.nodes[h] ?? null
    })), c = { ...o.nodes };
    for (const [h, p] of a) {
      const m = r.find((y) => y.id === h), f = o.nodes[h] ?? { x: m.x, y: m.y };
      c[h] = {
        x: Math.round(f.x + (p.x - m.x)),
        y: Math.round(f.y + (p.y - m.y))
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
    const i = Il(e, t);
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
    const l = this.sceneFor(s), c = l.nodes.find((p) => p.id === t);
    if (c != null && c.parentId) {
      const p = l.nodes.find((m) => m.id === c.parentId);
      p && (a = { x: i - p.x, y: n - p.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const h = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const p = this.stepReorderCommand(t);
      if (p) {
        const m = this.inverseOf(p);
        m && h.unshift(...m), this.command(p, !1);
      }
    }
    this.pushUndoEntry(h);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!o || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", a = i ?? "";
    if (a === r) return;
    const l = this._view, c = this.viewLayout(l), h = this.sceneFor(l), p = a ? h.nodes.find((y) => y.id === a) : void 0, m = p ? { x: n - p.x, y: s - p.y } : { x: n, y: s }, f = [
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t), r = this.model.externalSystems.find((y) => y.id === i);
    if (!o || !r || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${j(o.name)}-${j(r.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === l)) return;
    const c = this._view, h = this.viewLayout(c), m = this.sceneFor(c).nodes.find((y) => y.id === i);
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
    m && (f.push({ kind: "move-node", view: c, id: l, pos: h.nodes[l] ?? null }), this.writeViewLayout(c, {
      ...h,
      nodes: { ...h.nodes, [l]: { x: n - m.x, y: s - m.y } }
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
    const n = await i.text(), s = this.selectedApiId(), o = s ? null : ((l = this.model.externalSystems.find((h) => h.id === this._selectedId)) == null ? void 0 : l.id) ?? null, r = s || o ? null : ((c = this.model.modules.find((h) => h.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
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
      let h = { x: l, y: c };
      const p = s.nodes.find((m) => m.id === a);
      if (p != null && p.parentId) {
        const m = s.nodes.find((f) => f.id === p.parentId);
        m && (h = { x: l - m.x, y: c - m.y });
      }
      o[a] = h;
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
    var h;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), l = this.sceneFor(r).nodes.filter((p) => p.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((h = a.sizes) == null ? void 0 : h[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...l.map((p) => ({ kind: "move-node", view: r, id: p.id, pos: a.nodes[p.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const p of l) c[p.id] = { x: p.x - i, y: p.y - n };
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
    const i = Bi(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
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
      const I = this.owningWorkflowOf(e), g = this.owningWorkflowOf(t);
      if (!I || I !== g || e === t) return;
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
      const [, I, g] = s, k = (this.model.proxyApis ?? []).find((W) => W.id === g), $ = (k == null ? void 0 : k.targetApiId) ?? ((V = (this.model.apiImplementations ?? []).find(
        (W) => W.moduleId === g && (this.model.apis ?? []).some(
          (Q) => Q.id === W.apiId && Q.operations.some((u) => u.id === I)
        )
      )) == null ? void 0 : V.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((W) => (W.useCases ?? []).map((Q) => Q.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: I,
          moduleId: g,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let A = null;
      if (t === k.targetApiId)
        A = k.targetApiId;
      else {
        const W = /^apiimpl:(.+)@(.+)$/.exec(t);
        W && W[1] === k.targetApiId ? A = W[2] : this.model.modules.some((Q) => Q.id === t) && (this.model.apiImplementations ?? []).some(
          (Q) => Q.apiId === k.targetApiId && Q.moduleId === t
        ) && (A = t);
      }
      if (!A) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (W) => W.proxyId === k.id && W.operationId === I && W.targetSiteId === A
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: I,
        targetSiteId: A
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((I) => I.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((A) => (A.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (N) => N.agentId === e && N.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (N) => N.agentId === e && N.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.mcpServers ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (N) => N.agentId === e && N.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((A) => A.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (N) => N.agentId === e && N.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((A) => A.operations.map((N) => N.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (N) => N.agentId === e && N.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((A) => A.id === t) || (this.model.proxyApis ?? []).some((A) => A.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (N) => N.agentId === e && N.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((A) => (A.queryServices ?? []).map((N) => N.id))
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
      (this.model.rags ?? []).some((A) => A.id === t) && ((this.model.agentRags ?? []).some(
        (N) => N.agentId === e && N.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((I) => I.id === e)) {
      const I = (this.model.mcpGateways ?? []).find(($) => $.id === e), g = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((O) => O.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((O) => O.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((O) => O.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), k = [
        ...I.mcpServerIds ?? [],
        ...I.apiIds ?? [],
        ...I.apiOperationIds ?? [],
        ...I.useCaseIds ?? [],
        ...I.ragIds ?? []
      ].includes(t);
      g && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
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
      const I = (this.model.workflows ?? []).find(($) => $.id === e), g = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (g) {
        const $ = I.onCompletionEventName || `${I.name.replace(/\s+/g, "")}Completado`;
        g.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const k = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (k && !(I.steps ?? []).some((O) => O.targetUseCaseId === t)) {
        const O = `wfs-${j(k.name)}`;
        let A = O;
        for (let N = 2; (I.steps ?? []).some((W) => W.id === A); N++)
          A = `${O}-${N}`;
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
    if ((this.model.workflows ?? []).some((I) => I.id === t)) {
      const I = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), g = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), k = I ?? g;
      if (k) {
        const $ = (this.model.emissions ?? []).find((W) => W.domainEventId === e), O = new Set((this.model.aggregates ?? []).map((W) => W.id)), A = new Set(
          this.model.modules.flatMap((W) => (W.domainServices ?? []).map((Q) => Q.id))
        ), N = new Set(
          this.model.modules.flatMap((W) => (W.useCases ?? []).map((Q) => Q.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: $ && O.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && A.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && N.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((I) => I.id === e)) {
      const I = (this.model.proxyApis ?? []).find((g) => g.id === e);
      if ((this.model.apis ?? []).some((g) => g.id === t)) {
        I.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((g) => g.id === t)) {
        if (!I.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === I.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: I.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((g) => g.id === t) && I.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((I) => I.id === e)) {
      if (this.model.externalSystems.some((I) => I.id === t)) {
        (this.model.apis ?? []).find((g) => g.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((I) => I.id === t) && ((this.model.apiImplementations ?? []).some(
        (g) => g.apiId === e && g.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const a = new Set((this.model.actors ?? []).map((I) => I.id));
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((g) => (g.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((g) => (g.applicationEvents ?? []).map((k) => k.id))
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
      ), g = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map(($) => $.id))
      );
      if (I.has(t) || g.has(t)) {
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
        this.model.modules.flatMap((g) => (g.useCases ?? []).map((k) => k.id))
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
    const c = this.model.externalSystems.flatMap((I) => I.useCases ?? []).find((I) => I.id === e), h = this.model.externalSystems.flatMap((I) => I.tables ?? []).find((I) => I.id === e);
    if (c || h) {
      const I = (c ?? h).name, g = c ? { externalUseCaseId: e } : { externalTableId: e }, k = (A) => c ? A.sourceExternalUseCaseId === e : A.sourceExternalTableId === e, $ = this.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (N) => k(N) && N.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(I)}-${j($.name)}`,
          name: `${$.name}Projection`,
          ...g,
          targetId: t
        });
        return;
      }
      const O = this.model.modules.find((A) => A.id === t);
      if (O) {
        (this.model.projections ?? []).some(
          (N) => k(N) && N.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(I)}-${j(O.name)}`,
          name: `${I}ViewProjection`,
          ...g,
          moduleId: t,
          readModelName: `${I}View`
        });
        return;
      }
      return;
    }
    const p = (this.model.aggregates ?? []).find((I) => I.id === e);
    if (p) {
      const I = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (I) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(p.name)}-${j(I.name)}`,
          name: `${I.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const g = this.model.modules.find((k) => k.id === t);
      if (g) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${j(p.name)}-${j(g.name)}`,
          name: `${p.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${p.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap((I) => (I.domainEvents ?? []).map((g) => g.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((I) => I.id),
      ...this.model.modules.flatMap((I) => (I.domainServices ?? []).map((g) => g.id))
    ]), y = new Set(
      this.model.modules.flatMap((I) => (I.applicationEvents ?? []).map((g) => g.id))
    ), v = new Set(this.model.modules.flatMap((I) => (I.useCases ?? []).map((g) => g.id))), S = new Set(
      this.model.modules.flatMap((I) => (I.queryServices ?? []).map((g) => g.id))
    );
    if (v.has(e) && S.has(t)) {
      (this.model.queryCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const _ = new Set(
      this.model.externalSystems.flatMap((I) => (I.useCases ?? []).map((g) => g.id))
    );
    if (v.has(e) && _.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && v.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (v.has(e) && (this.model.aggregates ?? []).some((I) => I.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) && m.has(t) || v.has(e) && y.has(t)) {
      (this.model.emissions ?? []).some(
        (g) => g.sourceId === e && g.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (m.has(e) || y.has(e)) {
      const I = y.has(e), g = this.model.modules.flatMap((w) => (I ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === e), k = this.model.modules.flatMap((w) => (w.useCases ?? []).map((b) => ({ u: b, module: w }))).find(({ u: w }) => w.id === t), $ = this.model.modules.flatMap((w) => (w.readModels ?? []).map((b) => ({ rm: b, module: w }))).find(({ rm: w }) => w.id === t), O = this.model.modules.find((w) => w.id === t) ?? ($ == null ? void 0 : $.module) ?? (k == null ? void 0 : k.module);
      if (!g || !O) return;
      const A = new Set((this.model.aggregates ?? []).map((w) => w.id)), N = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((b) => b.id))
      ), W = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === e && (I ? v.has(w.sourceId) : A.has(w.sourceId) || N.has(w.sourceId))
      );
      if (!W) {
        this.emit("modux-notice", {
          message: I ? `Declara primero qué caso de uso publica ${g.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${g.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Q = !I && A.has(W.sourceId);
      if (k) {
        if (this.model.flows.some(
          (b) => b.archetype === "TRIGGERS" && b.triggerEvent === g.name && b.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(g.name)}-${j(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Q ? W.sourceId : "",
          triggerDomainServiceId: !I && !Q ? W.sourceId : void 0,
          triggerUseCaseId: I ? W.sourceId : void 0,
          triggerEvent: g.name,
          targetId: O.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const u = ($ == null ? void 0 : $.rm.name) ?? `${g.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === g.name && w.targetId === O.id && w.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${j(g.name)}-${j(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: Q ? W.sourceId : "",
        triggerDomainServiceId: !I && !Q ? W.sourceId : void 0,
        triggerUseCaseId: I ? W.sourceId : void 0,
        triggerEvent: g.name,
        targetId: O.id,
        readModelName: u
      });
      return;
    }
    const M = /* @__PURE__ */ new Set([
      ...f,
      ...v,
      ...S,
      ...this.model.modules.flatMap((I) => (I.readModels ?? []).map((g) => g.id))
    ]);
    if (M.has(e) || M.has(t) || m.has(t) || y.has(t))
      return;
    const D = new Set(this.model.externalSystems.map((I) => I.id));
    if (D.has(e)) {
      if (new Set(
        this.model.modules.flatMap((O) => (O.useCases ?? []).map((A) => A.id))
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
      const g = (this.model.apis ?? []).find(
        (O) => O.operations.some((A) => A.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), $ = g ? { operationId: t, siteId: g.id } : k ? { operationId: k[1], siteId: k[2] } : null;
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
    const t = new Set(e.memberIds), i = (s, o, r = {}) => R`
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${j(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? xl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : vl(e.detail.id, e.detail.kind);
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
      const a = n.find((c) => (this.model.aggregates ?? []).some((h) => h.id === c));
      if (a) return a;
      const l = n.find((c) => this.model.modules.some((h) => h.id === c));
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
        if ((this.model.apis ?? []).some((h) => h.id === a)) return a;
        const l = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (l && (this.model.apis ?? []).some((h) => h.id === l[1])) return l[1];
        const c = (this.model.proxyApis ?? []).find((h) => h.id === a);
        if (c != null && c.targetApiId) return c.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((a) => this.model.externalSystems.some((l) => l.id === a)) ?? n.find((a) => this.model.modules.some((l) => l.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var h;
    const n = F.PALETTE_NEW.find((p) => p.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), r = (p, m) => {
      const f = this.viewLayout(s), y = m ? o.nodes.find((S) => S.id === m) : void 0, v = y ? { x: Math.round(t.x - y.x), y: Math.round(t.y - y.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...f, nodes: { ...f.nodes, [p]: v } }), { kind: "move-node", view: s, id: p, pos: null };
    }, a = (p, m, f) => {
      const y = this.inverseOf(p) ?? [];
      this.command(p, !1);
      const v = r(m, f);
      this.pushUndoEntry([...y, v]);
    };
    if (!n.child) {
      const p = {
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
      }, { id: m, name: f } = this.uniquePaletteName(n.label, p[e] ?? ""), y = e === "module" ? { kind: "add-module", id: m, name: f, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: f } : e === "external-system" ? { kind: "add-external-system", id: m, name: f } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: f } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: f, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: f } : e === "rag" ? { kind: "add-rag", id: m, name: f } : e === "api" ? { kind: "add-api", id: m, name: f } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: f } : {
        kind: "add-workflow",
        id: m,
        name: f,
        completionEventName: `${f.replace(/\s+/g, "")}Completado`
      };
      a(y, m);
      return;
    }
    if (e === "workflow-step") {
      const p = this.model.workflows ?? [], m = [];
      for (let M = i ?? void 0; M; )
        m.push(M), M = (h = o.nodes.find((D) => D.id === M)) == null ? void 0 : h.parentId;
      const f = m.map((M) => p.find((D) => D.id === M)).find(Boolean), y = m.map((M) => {
        const D = p.find((V) => (V.steps ?? []).some((I) => I.id === M));
        return D ? { owner: D, stepId: M } : null;
      }).find(Boolean), v = f ?? (y == null ? void 0 : y.owner);
      if (!v) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: S, name: _ } = this.uniquePaletteName("Paso", "wfs-");
      y && (t = { x: t.x + 190, y: t.y }), a(
        {
          kind: "add-workflow-step",
          workflowId: v.id,
          id: S,
          name: _,
          ...y ? { dependsOnStepIds: [y.stepId], afterStepId: y.stepId } : {}
        },
        S
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${v.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const p = this.dropContainerFor("api", i);
      if (!p) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: m, name: f } = this.uniquePaletteName("API", "api-"), y = { kind: "add-api", id: m, name: f }, v = this.inverseOf(y) ?? [];
      this.command(y, !1), this.model.externalSystems.some((D) => D.id === p) ? this.command({ kind: "set-api-publisher", id: m, targetId: p }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: p }, !1);
      const S = this.viewLayout(this._view), _ = this.sceneFor(this._view).nodes.find((D) => D.id === p), M = _ ? { x: Math.round(t.x - _.x), y: Math.round(t.y - _.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...S, nodes: { ...S.nodes, [m]: M } }), this.pushUndoEntry([...v, { kind: "move-node", view: this._view, id: m, pos: null }]);
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
      const p = `agg-${j(c)}`;
      a({ kind: "add-aggregate", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "use-case" || e === "policy") {
      const p = `uc-${j(c)}`;
      a(
        { kind: "add-use-case", id: p, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        p,
        l
      );
    } else if (e === "domain-event") {
      const p = `ev-${j(c)}`;
      a({ kind: "add-domain-event", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "application-event") {
      const p = `aev-${j(c)}`;
      a({ kind: "add-application-event", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "domain-service") {
      const p = `ds-${j(c)}`;
      a({ kind: "add-domain-service", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "query-service") {
      const p = `qs-${j(c)}`;
      a({ kind: "add-query-service", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "read-model") {
      const p = `rm-${j(c)}`, m = (this.model.aggregates ?? []).find((f) => f.id === l);
      a({ kind: "add-read-model", id: p, name: c, aggregateId: l }, p, (m == null ? void 0 : m.moduleId) ?? l);
    } else if (e === "api-operation") {
      const p = (this.model.apis ?? []).find((S) => S.id === l), m = new Set(((p == null ? void 0 : p.operations) ?? []).map((S) => S.id));
      let f = c, y = `apiop-${l.replace(/^api-/, "")}-${j(f)}`;
      for (let S = 2; m.has(y); S++)
        f = `${n.label} ${S}`, y = `apiop-${l.replace(/^api-/, "")}-${j(f)}`;
      a({ kind: "add-api-operation", apiId: l, id: y, name: f }, y, l), o.nodes.some(
        (S) => S.parentId === l && (S.kind === "api-operation" || S.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(p == null ? void 0 : p.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const p = this.model.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === l), m = new Set((p == null ? void 0 : p.stepIds) ?? []);
      let f = c, y = `step-${j(f)}`;
      for (let v = 2; m.has(y); v++)
        f = `${n.label} ${v}`, y = `step-${j(f)}`;
      a({ kind: "add-use-case-step", useCaseId: l, id: y, name: f }, y, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(p == null ? void 0 : p.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const p = `xuc-${j(c)}`;
      a({ kind: "add-external-use-case", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "external-table") {
      const p = `tbl-${j(c)}`;
      a({ kind: "add-external-table", id: p, name: c, moduleId: l }, p, l);
    } else if (e === "mcp-server") {
      const p = `mcpsrv-${j(c)}`;
      a({ kind: "add-mcp-server", id: p, name: c, moduleId: l }, p, l);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, n, s) {
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
      return;
    }
    const o = this._view, r = this.sceneFor(o), a = r.nodes.find((p) => p.id === e);
    if (!a) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const p = this.viewLayout(o);
        this.writeViewLayout(o, {
          ...p,
          nodes: { ...p.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const l = this.viewLayout(o), c = a.parentId ? r.nodes.find((p) => p.id === a.parentId) : void 0, h = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: h } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map" && this._view !== "workflows") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = F.PALETTE_NEW.filter(
      (i) => (this._view !== "workflows" || ["workflow", "workflow-step"].includes(i.type)) && (!e || i.label.toLowerCase().includes(e))
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
              title=${i.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : i.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
              @dragstart=${(n) => this.onPaletteDragStart(n, { new: i.type })}
            >
              ＋ ${i.label}
            </div>
          `
    )}
        ${this._view === "workflows" ? "" : R`<div class="palette-h">Existentes — arrastra para colocar o conectar</div>`}
        ${(this._view === "workflows" ? [] : this.paletteCatalog()).map(
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
    var t, i, n, s, o, r, a;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${j(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), h = this._newTriggerEvent.trim();
        if (!l || !c || !h) return;
        this.command({
          kind: "add-flow",
          id: `flow-${j(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: h,
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
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Ys(i, t.nodes) : e === "flows" ? io(i, t.nodes) : e === "processes" ? Bi(i, t.nodes) : e === "workflows" ? ml(i, t.nodes) : e === "eventstorming" ? rl(i, t.nodes) : qs(
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
    }, r = await fl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
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
        ${this._view === "aggregates" || this._view === "processes" ? R`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
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
        ${this._view === "flows" || this._view === "processes" ? R`
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
          ?hidden=${this._view !== "context-map" && this._view !== "workflows"}
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
        ${yl.map(
      (n) => R`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Si[n].abbr}</span>
              <span class="name">${Si[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
F.styles = Pi`
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
F.PALETTE_NEW = [
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
  { type: "workflow-step", label: "Paso de workflow", child: !0 },
  { type: "aggregate", label: "Agregado", child: !0 },
  { type: "use-case", label: "Caso de uso", child: !0 },
  { type: "use-case-step", label: "Paso de caso de uso", child: !0 },
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
G([
  be({ attribute: !1 })
], F.prototype, "model", 2);
G([
  be({ attribute: !1 })
], F.prototype, "layout", 2);
G([
  be({ attribute: !1 })
], F.prototype, "diff", 2);
G([
  U()
], F.prototype, "_view", 2);
G([
  U()
], F.prototype, "_detail", 2);
G([
  U()
], F.prototype, "_relationType", 2);
G([
  U()
], F.prototype, "_relationPicker", 2);
G([
  U()
], F.prototype, "_extDepPicker", 2);
G([
  U()
], F.prototype, "_selectedId", 2);
G([
  U()
], F.prototype, "_paletteOpen", 2);
G([
  U()
], F.prototype, "_paletteFilter", 2);
G([
  U()
], F.prototype, "_newName", 2);
G([
  U()
], F.prototype, "_newModuleId", 2);
G([
  U()
], F.prototype, "_newArchetype", 2);
G([
  U()
], F.prototype, "_newTriggerAggId", 2);
G([
  U()
], F.prototype, "_newTriggerEvent", 2);
G([
  U()
], F.prototype, "_newTargetId", 2);
G([
  U()
], F.prototype, "_undoStack", 2);
G([
  U()
], F.prototype, "_redoStack", 2);
G([
  U()
], F.prototype, "_newStepName", 2);
G([
  U()
], F.prototype, "_newStepType", 2);
G([
  U()
], F.prototype, "_newStepRole", 2);
G([
  U()
], F.prototype, "_newStepDeadline", 2);
G([
  U()
], F.prototype, "_editStepRole", 2);
G([
  U()
], F.prototype, "_editStepDeadline", 2);
G([
  U()
], F.prototype, "_editStepComp", 2);
G([
  U()
], F.prototype, "_newStepUseCase", 2);
G([
  U()
], F.prototype, "_newStepEmits", 2);
G([
  U()
], F.prototype, "_editStepUseCase", 2);
G([
  U()
], F.prototype, "_editStepEmits", 2);
G([
  U()
], F.prototype, "_editStepAwaits", 2);
G([
  U()
], F.prototype, "_multi", 2);
G([
  U()
], F.prototype, "_newViewName", 2);
G([
  U()
], F.prototype, "_activeViewId", 2);
G([
  U()
], F.prototype, "_newRagSourceType", 2);
G([
  U()
], F.prototype, "_newRagSourceUri", 2);
G([
  U()
], F.prototype, "_addMemberKey", 2);
G([
  U()
], F.prototype, "_treeOpen", 2);
G([
  U()
], F.prototype, "_deletePicker", 2);
F = G([
  Oi("modux-editor")
], F);
var _l = Object.defineProperty, kl = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? kl(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && _l(t, i, s), s;
};
let le = class extends Ve {
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
            const h = await l.json();
            h != null && h.message && (c = h.message);
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
          let h = `El servidor rechazó el contrato (${r.status})`;
          try {
            const p = await r.json();
            p != null && p.message && (h = p.message);
          } catch {
          }
          this.showToast(h);
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
le.styles = Pi`
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
fe([
  be()
], le.prototype, "base", 2);
fe([
  U()
], le.prototype, "_model", 2);
fe([
  U()
], le.prototype, "_layout", 2);
fe([
  U()
], le.prototype, "_error", 2);
fe([
  U()
], le.prototype, "_saving", 2);
fe([
  U()
], le.prototype, "_toast", 2);
fe([
  U()
], le.prototype, "_workspace", 2);
fe([
  U()
], le.prototype, "_creatingSolution", 2);
fe([
  U()
], le.prototype, "_newSolutionName", 2);
fe([
  U()
], le.prototype, "_diff", 2);
fe([
  U()
], le.prototype, "_mergeFlow", 2);
le = fe([
  Oi("modux-editor-connected")
], le);
export {
  bl as CONTAINER_HEADER,
  $l as CONTAINER_INSET,
  ne as ModuxCanvas,
  F as ModuxEditor,
  le as ModuxEditorConnected,
  Ys as aggregatesScene,
  Le as apiImplNodeId,
  De as apiOpOccurrenceId,
  fi as containerFit,
  Ms as containerMinSize,
  qs as contextMapScene,
  Ds as flowCoherence,
  io as flowsScene,
  Nt as normalizeViewLayout,
  Bi as processesScene,
  Us as relationEdgeId,
  Ai as resolveOverlaps
};
