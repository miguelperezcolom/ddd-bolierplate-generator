const bl = 34, El = 10;
function Ai(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], c = e[r], p = i.get(l.id), h = i.get(c.id), m = h.x - p.x, f = h.y - p.y, y = (l.w + c.w) / 2 + t - Math.abs(m), v = (l.h + c.h) / 2 + t - Math.abs(f);
        if (!(y <= 0 || v <= 0))
          if (o = !0, y < v) {
            const C = (m >= 0 ? 1 : -1) * y / 2;
            p.x -= C, h.x += C;
          } else {
            const C = (f >= 0 ? 1 : -1) * v / 2;
            p.y -= C, h.y += C;
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
}, je = 168, Xe = 56;
function Le(e, t) {
  return `apiimpl:${e}@${t}`;
}
function De(e, t) {
  return `apiop:${e}@${t}`;
}
const Hi = { compact: 0, coarse: 1, full: 2 };
function Wi(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: Hi[e ? t : n] > Hi[s] };
}
function Sn(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: Le(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const An = 34, Cn = 14, Os = 14, ye = 108, xe = 32, Mn = 12, Pn = 10, xt = 2, Rs = xt * ye + (xt - 1) * Mn + 2 * Cn;
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
  const t = Math.max(1, Math.ceil(e / xt)), i = t * xe + (t - 1) * Pn;
  return { w: Rs, h: An + i + Os };
}
function Lt(e, t) {
  const i = e % xt, n = Math.floor(e / xt);
  return {
    x: -t.w / 2 + Cn + i * (ye + Mn) + ye / 2,
    y: -t.h / 2 + An + n * (xe + Pn) + xe / 2
  };
}
function zs(e, t, i, n, s, o, a = !1) {
  const r = (e.aggregates ?? []).filter((c) => c.moduleId === t.id), l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Sn(e, t.id),
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
    return [{ ...n, x: i.x, y: i.y, w: je, h: Xe }];
  if (a) {
    const c = new Map((e.apis ?? []).map((h) => [h.id, h])), p = (e.apiImplementations ?? []).filter((h) => h.moduleId === t.id && c.has(h.apiId)).map((h) => {
      const m = c.get(h.apiId);
      return {
        id: Le(h.apiId, h.moduleId),
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
    if (p.length > 0) {
      const h = l.filter((m) => m.kind !== "api-impl");
      return Tn(i, n, p, h, s, o);
    }
  }
  return ht(i, n, l, s, o);
}
function Tn(e, t, i, n, s, o, a = /* @__PURE__ */ new Set()) {
  const r = o[t.id] ?? wi(i.length + n.length), l = i.map((f, y) => {
    const v = s[f.id] ?? Lt(y, r), C = a.has(f.id) ? [] : f.ops, _ = o[f.id] ?? wi(C.length), P = C.map((H, x) => s[H.id] ?? Lt(x, _)), L = fi(
      { x: v.x, y: v.y },
      _,
      P.map((H) => ({ dx: H.x, dy: H.y, w: ye, h: xe }))
    );
    return { a: f, off: v, ops: C, opOffs: P, fit: L };
  }), c = n.map(
    (f, y) => s[f.id] ?? Lt(i.length + y, r)
  ), p = Ai(
    [
      ...l.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...n.map((f, y) => ({
        id: f.id,
        x: c[y].x,
        y: c[y].y,
        w: ye,
        h: xe
      }))
    ],
    24
  );
  for (const f of l) {
    const y = p.get(f.a.id);
    y && (f.off = { x: f.off.x + (y.x - f.fit.x), y: f.off.y + (y.y - f.fit.y) }, f.fit = { ...f.fit, x: y.x, y: y.y });
  }
  n.forEach((f, y) => {
    const v = p.get(f.id);
    v && (c[y] = { x: v.x, y: v.y });
  });
  const h = fi(e, r, [
    ...l.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...c.map((f) => ({ dx: f.x, dy: f.y, w: ye, h: xe }))
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
        h: xe,
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
      h: xe,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${gi[f.kind]} ${f.name}`
    });
  }), m;
}
function ht(e, t, i, n, s) {
  const o = s[t.id] ?? wi(i.length), a = i.map((h, m) => n[h.id] ?? Lt(m, o)), r = Ai(
    i.map((h, m) => ({ id: h.id, x: a[m].x, y: a[m].y, w: ye, h: xe })),
    10
  );
  i.forEach((h, m) => {
    const f = r.get(h.id);
    f && (a[m] = { x: f.x, y: f.y });
  });
  const l = fi(
    e,
    o,
    a.map((h) => ({ dx: h.x, dy: h.y, w: ye, h: xe }))
  ), c = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, p = i.map((h, m) => {
    const f = a[m], y = h.policy ? Ls : Nn[h.kind];
    return {
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ye,
      h: xe,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${h.policy ? "Policy" : gi[h.kind]} ${h.name}`
    };
  });
  return [c, ...p];
}
function qs(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, a = i !== "contexts", r = i === "operations", l = new Set(e.externalSystems.map((d) => d.id)), c = (e.apis ?? []).filter(
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
  ], y = f.flatMap((d, A) => {
    const F = t[d.ref.id] ?? dt(A, f.length);
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
        x: F.x,
        y: F.y,
        w: je,
        h: Xe
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
      if (r && j.targetApiId) {
        const Ee = (e.apis ?? []).find((Be) => Be.id === j.targetApiId), Se = (Ee == null ? void 0 : Ee.operations) ?? [];
        if (Se.length > 0)
          return ht(
            F,
            ee,
            Se.map((Be) => ({
              id: De(Be.id, j.id),
              name: Be.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ee, x: F.x, y: F.y, w: je, h: Xe }];
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
      return (s.has(j.id) ? !a : a) && j.operations.length > 0 ? ht(
        F,
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
        x: F.x,
        y: F.y,
        w: je,
        h: Xe
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
      }, Ee = c.filter((te) => te.publishedByExternalSystemId === j.id), Se = h.filter((te) => te.publishedByExternalSystemId === j.id), Be = Se.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), ii = [
        ...(j.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(j.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(j.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], ni = Ee.length > 0 || Se.length > 0, si = ni || ii.length > 0, { form: Mt, collapsed: oi } = Wi(
        s.has(j.id),
        a ? "full" : ni ? "coarse" : "compact",
        ii.length > 0 || r && ni
      ), Vi = [
        ...Be,
        ...Mt === "full" ? ii : []
      ], ai = r && Mt === "full" ? Se.filter((te) => {
        const at = te.targetApiId ? (e.apis ?? []).find((re) => re.id === te.targetApiId) : void 0;
        return ((at == null ? void 0 : at.operations) ?? []).length > 0;
      }) : [];
      if (r && Mt === "full" && (Ee.length > 0 || ai.length > 0)) {
        const te = [
          ...Ee.map((re) => ({
            id: re.id,
            name: re.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${re.name} — API publicada por ${j.name}`,
            opKind: "api-operation",
            ops: (re.operations ?? []).map((rt) => ({ id: rt.id, name: rt.name }))
          })),
          ...ai.map((re) => {
            const rt = (e.apis ?? []).find((Pt) => Pt.id === re.targetApiId);
            return {
              id: re.id,
              name: re.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${re.name} — proxy/cache de ${rt.name}`,
              opKind: "api-op-occurrence",
              ops: (rt.operations ?? []).map((Pt) => ({
                id: De(Pt.id, re.id),
                name: Pt.name
              }))
            };
          })
        ], at = new Set(ai.map((re) => re.id));
        return Tn(
          F,
          { ...ee, collapsible: !0, collapsed: oi },
          te,
          Vi.filter((re) => !at.has(re.id)),
          t,
          n,
          o
        );
      }
      const Ki = Mt === "compact" ? [] : [
        ...Ee.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Vi
      ];
      return Ki.length > 0 ? ht(
        F,
        { ...ee, collapsible: si, collapsed: oi },
        Ki,
        t,
        n
      ) : [{
        ...ee,
        collapsible: si,
        collapsed: si && oi,
        x: F.x,
        y: F.y,
        w: je,
        h: Xe
      }];
    }
    const Y = d.ref, Q = Y.subdomainType ?? "GENERIC", se = {
      id: Y.id,
      label: Y.name,
      kind: "module",
      symbol: "component",
      fill: Ps[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${Y.name} — subdominio ${Q}`
    }, me = Sn(e, Y.id), st = (e.aggregates ?? []).some((j) => j.moduleId === Y.id) || (Y.useCases ?? []).length > 0 || (Y.domainEvents ?? []).length > 0 || (Y.applicationEvents ?? []).length > 0 || (Y.readModels ?? []).length > 0 || (Y.domainServices ?? []).length > 0 || (Y.queryServices ?? []).length > 0, Oe = st || me.length > 0, { form: ot, collapsed: Ge } = Wi(
      s.has(Y.id),
      a ? "full" : me.length > 0 ? "coarse" : "compact",
      st
    );
    return ot === "full" && Oe ? zs(
      e,
      Y,
      F,
      { ...se, collapsible: !0, collapsed: Ge },
      t,
      n,
      r
    ) : ot === "coarse" && me.length > 0 ? ht(
      F,
      { ...se, collapsible: Oe, collapsed: Ge },
      me,
      t,
      n
    ) : [{
      ...se,
      collapsible: Oe,
      collapsed: Oe && Ge,
      x: F.x,
      y: F.y,
      w: je,
      h: Xe
    }];
  }), v = f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, A) => {
    const F = t[d.id] ?? dt(f.length + A, v);
    y.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
    const F = t[d.id] ?? dt(f.length + (e.actors ?? []).length + A, v);
    y.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
    const F = t[d.id] ?? dt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + A,
      v
    );
    y.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
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
  const C = [];
  (e.rags ?? []).forEach((d, A) => {
    const F = t[d.id] ?? dt(
      f.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + A,
      v
    );
    y.push({
      id: d.id,
      label: d.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((Y, Q) => {
      const se = `ragcs:${d.id}:${Y.uri}`, me = t[se] ?? { x: F.x + 170, y: F.y - 30 + Q * 44 };
      y.push({
        id: se,
        label: Y.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: me.x,
        y: me.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Y.type,
        tooltip: `${Y.type}: ${Y.uri}`
      }), C.push({
        id: `ragcse:${d.id}:${Y.uri}`,
        sourceId: se,
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
    id: Us(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Ns[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), P = e.flows.map((d) => {
    var me, st, Oe, ot, Ge, j;
    const A = Ds(e, d), F = a ? e.modules.find((ee) => ee.id === d.sourceId) : void 0, Y = ((me = F == null ? void 0 : F.domainEvents) == null ? void 0 : me.find((ee) => ee.name === d.triggerEvent)) ?? ((st = F == null ? void 0 : F.applicationEvents) == null ? void 0 : st.find((ee) => ee.name === d.triggerEvent)), Q = a && d.readModelName ? (ot = (Oe = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Oe.readModels) == null ? void 0 : ot.find((ee) => ee.name === d.readModelName) : void 0, se = a && d.targetUseCaseId ? (j = (Ge = e.modules.find((ee) => ee.id === d.targetId)) == null ? void 0 : Ge.useCases) == null ? void 0 : j.find((ee) => ee.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (Y == null ? void 0 : Y.id) ?? d.sourceId,
      targetId: (se == null ? void 0 : se.id) ?? (Q == null ? void 0 : Q.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Ts[A],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${A}`
    };
  }), L = new Map((e.apis ?? []).map((d) => [d.id, d])), H = new Set(e.modules.map((d) => d.id)), x = (e.apiImplementations ?? []).filter(
    (d) => L.has(d.apiId) && H.has(d.moduleId)
  ), g = new Set(y.map((d) => d.id)), k = a ? (e.emissions ?? []).filter((d) => g.has(d.sourceId) && g.has(d.domainEventId)).map((d) => ({
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
      const F = a && A.targetUseCaseId && g.has(A.targetUseCaseId) ? A.targetUseCaseId : A.targetModuleId && g.has(A.targetModuleId) ? A.targetModuleId : (A.targetUseCaseId && !a, null);
      if (!F) return [];
      const Y = a && g.has(A.id) ? A.id : d.id;
      return g.has(Y) ? [
        {
          id: `apiwire:${A.id}`,
          sourceId: Y,
          targetId: F,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${A.name} la implementa ${F}`
        }
      ] : [];
    })
  ), M = a ? (e.useCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], T = a ? (e.aggregateCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], G = a ? (e.queryCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], X = a ? (e.actorUses ?? []).filter((d) => g.has(d.actorId) && g.has(d.targetId)).map((d) => ({
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
  })), I = new Map([
    ...(e.apis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((d) => d.publishedByExternalSystemId).map((d) => [d.id, d.publishedByExternalSystemId])
  ]), w = (d) => g.has(d) ? d : I.get(d) ?? d, b = [
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
  ], N = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.useCases ?? []) N.set(A.id, d.id);
    for (const A of d.domainEvents ?? []) N.set(A.id, d.id);
    for (const A of d.applicationEvents ?? []) N.set(A.id, d.id);
  }
  const z = (d) => g.has(d) ? d : N.get(d) ?? d, $ = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const A of d.domainEvents ?? []) $.set(A.name, A.id);
    for (const A of d.applicationEvents ?? []) $.set(A.name, A.id);
  }
  const S = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((A) => A.targetUseCaseId).map((A) => ({ sourceId: d.id, targetId: z(A.targetUseCaseId) }))
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
  ], R = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && $.has(d.triggerEvent)).map((d) => ({
        sourceId: z($.get(d.triggerEvent)),
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
    for (const A of d.tables ?? []) Z.set(A.id, d.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((A) => ({
          sourceId: g.has(A) ? A : Z.get(A) ?? A,
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
        (d) => (d.sourceApiIds ?? []).map((A) => ({
          sourceId: w(A),
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
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((A) => A.id !== d.id && we(A) === d.triggerEvent).filter((A) => g.has(A.id) && g.has(d.id)).map((A) => ({
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
  ], ps = x.flatMap((d) => {
    const A = Le(d.apiId, d.moduleId);
    if (!g.has(A)) return [];
    const F = [];
    for (const Y of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === d.apiId)) {
      const Q = w(Y.id);
      g.has(Q) && Q !== A && F.push({
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
    return F;
  }), hs = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const A = (e.proxyApis ?? []).find((Q) => Q.id === d.proxyId);
    if (!(A != null && A.targetApiId)) return [];
    const F = De(d.operationId, d.proxyId), Y = d.targetSiteId === A.targetApiId ? A.targetApiId : Le(A.targetApiId, d.targetSiteId);
    return !g.has(F) || !g.has(Y) ? [] : [{
      id: `oproute:${F}->${Y}`,
      sourceId: F,
      targetId: Y,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ms = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!g.has(d.externalSystemId)) return null;
        const A = (e.apis ?? []).find(
          (se) => se.operations.some((me) => me.id === d.operationId)
        );
        if (!A) return null;
        const F = d.siteId === A.id, Y = F ? d.operationId : De(d.operationId, d.siteId);
        let Q = g.has(Y) ? Y : null;
        if (!Q)
          if (F || (e.proxyApis ?? []).some((se) => se.id === d.siteId))
            Q = w(d.siteId);
          else {
            const se = Le(A.id, d.siteId);
            Q = g.has(se) ? se : d.siteId;
          }
        return !Q || !g.has(Q) || Q === d.externalSystemId ? null : { u: d, target: Q };
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
  ], fs = a ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!g.has(d.useCaseId)) return [];
    const A = g.has(De(d.operationId, d.moduleId)) ? De(d.operationId, d.moduleId) : g.has(Le(d.apiId, d.moduleId)) ? Le(d.apiId, d.moduleId) : g.has(w(d.moduleId)) ? w(d.moduleId) : null;
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
  }) : [], gs = a ? (e.agentUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.useCaseId)).map((d) => ({
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
  })), ys = a ? (e.rags ?? []).filter((d) => g.has(d.id)).flatMap(
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
  ) : [], xs = a ? (e.agentExternalUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], vs = a ? (e.agentMcpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Is = (e.mcpGateways ?? []).flatMap(
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
  ), _s = (e.agentGatewayUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ks = a ? (e.agentApiOpUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], $s = a ? (e.agentQueryUses ?? []).filter((d) => g.has(d.agentId) && g.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], bs = (e.agentDelegations ?? []).filter((d) => g.has(d.agentId) && g.has(d.delegateAgentId)).map((d) => ({
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
  })), Ss = a ? (e.agentTriggers ?? []).filter((d) => g.has(d.eventId) && g.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], As = a ? (e.externalCalls ?? []).filter((d) => g.has(d.externalSystemId) && g.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Cs = a ? (e.externalUseCaseCalls ?? []).filter((d) => g.has(d.sourceId) && g.has(d.targetId)).map((d) => ({
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
      ...k,
      ...E,
      ...D,
      ...M,
      ...T,
      ...G,
      ...X,
      ...u,
      ...b,
      ...us,
      ...ps,
      ...hs,
      ...ms,
      ...fs,
      ...S,
      ...R,
      ...nt,
      ...ue,
      ...J,
      ...ce,
      ...ge,
      ...gs,
      ...xs,
      ...vs,
      ...Is,
      ..._s,
      ...ks,
      ...$s,
      ...bs,
      ...Es,
      ...Ss,
      ...ws,
      ...ys,
      ...C,
      ...As,
      ...Cs
    ]
  };
}
const Fs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Vs = 176, Ks = 60, Hs = 140, Ws = 40;
function Gs(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const a = 220 + o * 340;
    i.filter((l) => l.moduleId === s.id).forEach((l, c) => {
      const p = n.filter((m) => m.aggregateId === l.id).length, h = 140 + c * (170 + p * 60);
      t[l.id] = { x: a, y: h }, n.filter((m) => m.aggregateId === l.id).forEach((m, f) => {
        t[m.id] = { x: a + 60, y: h + 100 + f * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Bs(e, t) {
  const i = Gs(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const p = s.get(c.moduleId), h = (p == null ? void 0 : p.subdomainType) ?? "GENERIC", m = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: m.x,
      y: m.y,
      w: Vs,
      h: Ks,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Fs[h],
      stroke: "#64748b",
      badge: p ? `${p.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${p ? ` — módulo ${p.name} (${h})` : ""}`
    };
  }), a = (e.entities ?? []).map((c) => {
    const p = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: p.x,
      y: p.y,
      w: Hs,
      h: Ws,
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
const Ys = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, js = 150, Xs = 44, Qs = 190, Zs = 56, Js = 160, eo = 48;
function to(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function io(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l, c;
    return ((c = (l = e.aggregates) == null ? void 0 : l.find((p) => p.id === r)) == null ? void 0 : c.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const c = 120 + l * 130, p = Ys[r.archetype] ?? "#475569", h = r.triggerAggregateId ?? r.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const C = t[h] ?? { x: 160, y: c };
      n.push({
        id: h,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : h,
        x: C.x,
        y: C.y,
        w: js,
        h: Xs,
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
      w: Qs,
      h: Zs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: p,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const y = to(e, r), v = `tgt:${y.id}`;
    if (!o.has(v)) {
      o.add(v);
      const C = t[v] ?? { x: 790, y: c };
      n.push({
        id: v,
        label: y.label,
        x: C.x,
        y: C.y,
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
      targetId: v,
      kind: "flow-delivery",
      color: p,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const no = 190, so = 56, ri = 170, oo = 52;
function Gi(e, t) {
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
    if (o.steps.forEach((p, h) => {
      const m = p.type === "HUMAN", f = t[p.id] ?? { x: 150 + (h + 1) * 240, y: r };
      if (i.push({
        id: p.id,
        label: p.name,
        x: f.x,
        y: f.y,
        w: ri,
        h: oo,
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
        const y = `comp:${p.id}`, v = t[y] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: y,
          label: p.compensationUseCaseId,
          x: v.x,
          y: v.y,
          w: ri,
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
          targetId: y,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = p.id;
    }), o.onCompletionEventName) {
      const p = `done:${o.id}`, h = t[p] ?? { x: 150 + (o.steps.length + 1) * 240, y: r };
      i.push({
        id: p,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: ri,
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
const zt = globalThis, Ci = zt.ShadowRoot && (zt.ShadyCSS === void 0 || zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mi = Symbol(), Bi = /* @__PURE__ */ new WeakMap();
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
      n && (t = Bi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Bi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ao = (e) => new On(typeof e == "string" ? e : e + "", void 0, Mi), Pi = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new On(i, e, Mi);
}, ro = (e, t) => {
  if (Ci) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = zt.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, Yi = Ci ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ao(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: lo, defineProperty: co, getOwnPropertyDescriptor: uo, getOwnPropertyNames: po, getOwnPropertySymbols: ho, getPrototypeOf: mo } = Object, Te = globalThis, ji = Te.trustedTypes, fo = ji ? ji.emptyScript : "", di = Te.reactiveElementPolyfillSupport, gt = (e, t) => e, Ht = { toAttribute(e, t) {
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
} }, Ni = (e, t) => !lo(e, t), Xi = { attribute: !0, type: String, converter: Ht, reflect: !1, useDefault: !1, hasChanged: Ni };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Te.litPropertyMetadata ?? (Te.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Qe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Xi) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && co(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = uo(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Xi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(gt("elementProperties"))) return;
    const t = mo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(gt("properties"))) {
      const i = this.properties, n = [...po(i), ...ho(i)];
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
      for (const s of n) i.unshift(Yi(s));
    } else t !== void 0 && i.push(Yi(t));
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
    return ro(t, this.constructor.elementStyles), t;
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
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Ht).toAttribute(i, n.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : Ht;
      this._$Em = s;
      const c = l.fromAttribute(i, r.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? Ni)(o, i) || n.useDefault && n.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, n)))) return;
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
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[gt("elementProperties")] = /* @__PURE__ */ new Map(), Qe[gt("finalized")] = /* @__PURE__ */ new Map(), di == null || di({ ReactiveElement: Qe }), (Te.reactiveElementVersions ?? (Te.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis, Qi = (e) => e, Wt = wt.trustedTypes, Zi = Wt ? Wt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Rn = "$lit$", Ne = `lit$${Math.random().toFixed(9).slice(2)}$`, Un = "?" + Ne, go = `<${Un}>`, He = document, vt = () => He.createComment(""), It = (e) => e === null || typeof e != "object" && typeof e != "function", Ti = Array.isArray, wo = (e) => Ti(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", li = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ji = /-->/g, en = />/g, Re = RegExp(`>|${li}(?:([^\\s"'>=/]+)(${li}*=${li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tn = /'/g, nn = /"/g, Dn = /^(?:script|style|textarea|title)$/i, Ln = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), O = Ln(1), B = Ln(2), Je = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), sn = /* @__PURE__ */ new WeakMap(), ze = He.createTreeWalker(He, 129);
function zn(e, t) {
  if (!Ti(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zi !== void 0 ? Zi.createHTML(t) : t;
}
const yo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = lt;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let c, p, h = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, p = a.exec(l), p !== null); ) m = a.lastIndex, a === lt ? p[1] === "!--" ? a = Ji : p[1] !== void 0 ? a = en : p[2] !== void 0 ? (Dn.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = Re) : p[3] !== void 0 && (a = Re) : a === Re ? p[0] === ">" ? (a = s ?? lt, h = -1) : p[1] === void 0 ? h = -2 : (h = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? Re : p[3] === '"' ? nn : tn) : a === nn || a === tn ? a = Re : a === Ji || a === en ? a = lt : (a = Re, s = void 0);
    const f = a === Re && e[r + 1].startsWith("/>") ? " " : "";
    o += a === lt ? l + go : h >= 0 ? (n.push(c), l.slice(0, h) + Rn + l.slice(h) + Ne + f) : l + Ne + (h === -2 ? r : f);
  }
  return [zn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class _t {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [c, p] = yo(t, i);
    if (this.el = _t.createElement(c, n), ze.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = ze.nextNode()) !== null && l.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Rn)) {
          const m = p[a++], f = s.getAttribute(h).split(Ne), y = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: o, name: y[2], strings: f, ctor: y[1] === "." ? vo : y[1] === "?" ? Io : y[1] === "@" ? _o : Zt }), s.removeAttribute(h);
        } else h.startsWith(Ne) && (l.push({ type: 6, index: o }), s.removeAttribute(h));
        if (Dn.test(s.tagName)) {
          const h = s.textContent.split(Ne), m = h.length - 1;
          if (m > 0) {
            s.textContent = Wt ? Wt.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(h[f], vt()), ze.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[m], vt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Un) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(Ne, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Ne.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = He.createElement("template");
    return n.innerHTML = t, n;
  }
}
function et(e, t, i = e, n) {
  var a, r;
  if (t === Je) return t;
  let s = n !== void 0 ? (a = i._$Co) == null ? void 0 : a[n] : i._$Cl;
  const o = It(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((r = s == null ? void 0 : s._$AO) == null || r.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = et(e, s._$AS(e, t.values), s, n)), t;
}
class xo {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? He).importNode(i, !0);
    ze.currentNode = s;
    let o = ze.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new St(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ko(o, this, t)), this._$AV.push(c), l = n[++r];
      }
      a !== (l == null ? void 0 : l.index) && (o = ze.nextNode(), a++);
    }
    return ze.currentNode = He, s;
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
    t = et(this, t, i), It(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== Je && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && It(this._$AH) ? this._$AA.nextSibling.data = t : this.T(He.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = _t.createElement(zn(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const a = new xo(s, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
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
    let a = !1;
    if (o === void 0) t = et(this, t, i, 0), a = !It(t) || t !== this._$AH && t !== Je, a && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = et(this, r[n + l], i, l), c === Je && (c = this._$AH[l]), a || (a = !It(c) || c !== this._$AH[l]), c === oe ? t = oe : t !== oe && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !s && this.j(t);
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
class Io extends Zt {
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
const $o = (e, t, i) => {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $o(i, this.renderRoot, this.renderOptions);
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
const bo = { attribute: !0, type: String, converter: Ht, reflect: !1, hasChanged: Ni }, Eo = (e = bo, t, i) => {
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
function $e(e) {
  return (t, i) => typeof i == "object" ? Eo(e, t, i) : ((n, s, o) => {
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
  return $e({ ...e, state: !0, attribute: !1 });
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
    for (var o = t[s], a = o.length, r = n[s] = new Array(a), l, c, p = 0; p < a; ++p)
      (l = o[p]) && (c = e.call(l, l.__data__, p, o)) && ("__data__" in l && (c.__data__ = l.__data__), r[p] = c);
  return new he(n, this._parents);
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
    for (var a = t[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && (n.push(e.call(l, l.__data__, c, a)), s.push(l));
  return new he(n, s);
}
function Vn(e) {
  return function() {
    return this.matches(e);
  };
}
function Kn(e) {
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
  return this.select(e == null ? Do : Uo(typeof e == "function" ? e : Kn(e)));
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
  return this.selectAll(e == null ? qo : Fo(typeof e == "function" ? e : Kn(e)));
}
function Ko(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new he(n, this._parents);
}
function Hn(e) {
  return new Array(e.length);
}
function Ho() {
  return new he(this._enter || this._groups.map(Hn), this._parents);
}
function Gt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Gt.prototype = {
  constructor: Gt,
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
function Wo(e) {
  return function() {
    return e;
  };
}
function Go(e, t, i, n, s, o) {
  for (var a = 0, r, l = t.length, c = o.length; a < c; ++a)
    (r = t[a]) ? (r.__data__ = o[a], n[a] = r) : i[a] = new Gt(e, o[a]);
  for (; a < l; ++a)
    (r = t[a]) && (s[a] = r);
}
function Bo(e, t, i, n, s, o, a) {
  var r, l, c = /* @__PURE__ */ new Map(), p = t.length, h = o.length, m = new Array(p), f;
  for (r = 0; r < p; ++r)
    (l = t[r]) && (m[r] = f = a.call(l, l.__data__, r, t) + "", c.has(f) ? s[r] = l : c.set(f, l));
  for (r = 0; r < h; ++r)
    f = a.call(e, o[r], r, o) + "", (l = c.get(f)) ? (n[r] = l, l.__data__ = o[r], c.delete(f)) : i[r] = new Gt(e, o[r]);
  for (r = 0; r < p; ++r)
    (l = t[r]) && c.get(m[r]) === l && (s[r] = l);
}
function Yo(e) {
  return e.__data__;
}
function jo(e, t) {
  if (!arguments.length) return Array.from(this, Yo);
  var i = t ? Bo : Go, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Wo(e));
  for (var o = s.length, a = new Array(o), r = new Array(o), l = new Array(o), c = 0; c < o; ++c) {
    var p = n[c], h = s[c], m = h.length, f = Xo(e.call(p, p && p.__data__, c, n)), y = f.length, v = r[c] = new Array(y), C = a[c] = new Array(y), _ = l[c] = new Array(m);
    i(p, h, v, C, _, f, t);
    for (var P = 0, L = 0, H, x; P < y; ++P)
      if (H = v[P]) {
        for (P >= L && (L = P + 1); !(x = C[L]) && ++L < y; ) ;
        H._next = x || null;
      }
  }
  return a = new he(a, n), a._enter = r, a._exit = l, a;
}
function Xo(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Qo() {
  return new he(this._exit || this._groups.map(Hn), this._parents);
}
function Zo(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Jo(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, a = Math.min(s, o), r = new Array(s), l = 0; l < a; ++l)
    for (var c = i[l], p = n[l], h = c.length, m = r[l] = new Array(h), f, y = 0; y < h; ++y)
      (f = c[y] || p[y]) && (m[y] = f);
  for (; l < s; ++l)
    r[l] = i[l];
  return new he(r, this._parents);
}
function ea() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], a; --s >= 0; )
      (a = n[s]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function ta(e) {
  e || (e = ia);
  function t(h, m) {
    return h && m ? e(h.__data__, m.__data__) : !h - !m;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var a = i[o], r = a.length, l = s[o] = new Array(r), c, p = 0; p < r; ++p)
      (c = a[p]) && (l[p] = c);
    l.sort(t);
  }
  return new he(s, this._parents).order();
}
function ia(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function na() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function sa() {
  return Array.from(this);
}
function oa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var a = n[s];
      if (a) return a;
    }
  return null;
}
function aa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ra() {
  return !this.node();
}
function da(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, a = s.length, r; o < a; ++o)
      (r = s[o]) && e.call(r, r.__data__, o, s);
  return this;
}
function la(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ca(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ua(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function pa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function ha(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function ma(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function fa(e, t) {
  var i = Jt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ca : la : typeof t == "function" ? i.local ? ma : ha : i.local ? pa : ua)(i, t));
}
function Wn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ga(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function wa(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function ya(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function xa(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? ga : typeof t == "function" ? ya : wa)(e, t, i ?? "")) : tt(this.node(), e);
}
function tt(e, t) {
  return e.style.getPropertyValue(t) || Wn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function va(e) {
  return function() {
    delete this[e];
  };
}
function Ia(e, t) {
  return function() {
    this[e] = t;
  };
}
function _a(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function ka(e, t) {
  return arguments.length > 1 ? this.each((t == null ? va : typeof t == "function" ? _a : Ia)(e, t)) : this.node()[e];
}
function Gn(e) {
  return e.trim().split(/^|\s+/);
}
function Ui(e) {
  return e.classList || new Bn(e);
}
function Bn(e) {
  this._node = e, this._names = Gn(e.getAttribute("class") || "");
}
Bn.prototype = {
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
function Yn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function jn(e, t) {
  for (var i = Ui(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function $a(e) {
  return function() {
    Yn(this, e);
  };
}
function ba(e) {
  return function() {
    jn(this, e);
  };
}
function Ea(e, t) {
  return function() {
    (t.apply(this, arguments) ? Yn : jn)(this, e);
  };
}
function Sa(e, t) {
  var i = Gn(e + "");
  if (arguments.length < 2) {
    for (var n = Ui(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ea : t ? $a : ba)(i, t));
}
function Aa() {
  this.textContent = "";
}
function Ca(e) {
  return function() {
    this.textContent = e;
  };
}
function Ma(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Pa(e) {
  return arguments.length ? this.each(e == null ? Aa : (typeof e == "function" ? Ma : Ca)(e)) : this.node().textContent;
}
function Na() {
  this.innerHTML = "";
}
function Ta(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Oa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ra(e) {
  return arguments.length ? this.each(e == null ? Na : (typeof e == "function" ? Oa : Ta)(e)) : this.node().innerHTML;
}
function Ua() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Da() {
  return this.each(Ua);
}
function La() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function za() {
  return this.each(La);
}
function qa(e) {
  var t = typeof e == "function" ? e : qn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Fa() {
  return null;
}
function Va(e, t) {
  var i = typeof e == "function" ? e : qn(e), n = t == null ? Fa : typeof t == "function" ? t : Ri(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Ka() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Ha() {
  return this.each(Ka);
}
function Wa() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ga() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ba(e) {
  return this.select(e ? Ga : Wa);
}
function Ya(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ja(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Xa(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Qa(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Za(e, t, i) {
  return function() {
    var n = this.__on, s, o = ja(t);
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
function Ja(e, t, i) {
  var n = Xa(e + ""), s, o = n.length, a;
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
  for (r = t ? Za : Qa, s = 0; s < o; ++s) this.each(r(n[s], t, i));
  return this;
}
function Xn(e, t, i) {
  var n = Wn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function er(e, t) {
  return function() {
    return Xn(this, e, t);
  };
}
function tr(e, t) {
  return function() {
    return Xn(this, e, t.apply(this, arguments));
  };
}
function ir(e, t) {
  return this.each((typeof t == "function" ? tr : er)(e, t));
}
function* nr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, a; s < o; ++s)
      (a = n[s]) && (yield a);
}
var Qn = [null];
function he(e, t) {
  this._groups = e, this._parents = t;
}
function At() {
  return new he([[document.documentElement]], Qn);
}
function sr() {
  return this;
}
he.prototype = At.prototype = {
  constructor: he,
  select: Mo,
  selectAll: Oo,
  selectChild: Lo,
  selectChildren: Vo,
  filter: Ko,
  data: jo,
  enter: Ho,
  exit: Qo,
  join: Zo,
  merge: Jo,
  selection: sr,
  order: ea,
  sort: ta,
  call: na,
  nodes: sa,
  node: oa,
  size: aa,
  empty: ra,
  each: da,
  attr: fa,
  style: xa,
  property: ka,
  classed: Sa,
  text: Pa,
  html: Ra,
  raise: Da,
  lower: za,
  append: qa,
  insert: Va,
  remove: Ha,
  clone: Ba,
  datum: Ya,
  on: Ja,
  dispatch: ir,
  [Symbol.iterator]: nr
};
function _e(e) {
  return typeof e == "string" ? new he([[document.querySelector(e)]], [document.documentElement]) : new he([[e]], Qn);
}
function or(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ue(e, t) {
  if (e = or(e), t === void 0 && (t = e.currentTarget), t) {
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
var ar = { value: () => {
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
function rr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
qt.prototype = Di.prototype = {
  constructor: qt,
  on: function(e, t) {
    var i = this._, n = rr(e + "", i), s, o = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((s = (e = n[o]).type) && (s = dr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (s = (e = n[o]).type) i[s] = an(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = an(i[s], e.name, null);
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
function dr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function an(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = ar, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const xi = { capture: !0, passive: !1 };
function vi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function lr(e) {
  var t = e.document.documentElement, i = _e(e).on("dragstart.drag", vi, xi);
  "onselectstart" in t ? i.on("selectstart.drag", vi, xi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function cr(e, t) {
  var i = e.document.documentElement, n = _e(e).on("dragstart.drag", null);
  t && (n.on("click.drag", vi, xi), setTimeout(function() {
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
var kt = 0.7, Bt = 1 / kt, Ze = "\\s*([+-]?\\d+)\\s*", $t = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ur = /^#([0-9a-f]{3,8})$/, pr = new RegExp(`^rgb\\(${Ze},${Ze},${Ze}\\)$`), hr = new RegExp(`^rgb\\(${ke},${ke},${ke}\\)$`), mr = new RegExp(`^rgba\\(${Ze},${Ze},${Ze},${$t}\\)$`), fr = new RegExp(`^rgba\\(${ke},${ke},${ke},${$t}\\)$`), gr = new RegExp(`^hsl\\(${$t},${ke},${ke}\\)$`), wr = new RegExp(`^hsla\\(${$t},${ke},${ke},${$t}\\)$`), rn = {
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
Li(Ct, bt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dn,
  // Deprecated! Use color.formatHex.
  formatHex: dn,
  formatHex8: yr,
  formatHsl: xr,
  formatRgb: ln,
  toString: ln
});
function dn() {
  return this.rgb().formatHex();
}
function yr() {
  return this.rgb().formatHex8();
}
function xr() {
  return Jn(this).formatHsl();
}
function ln() {
  return this.rgb().formatRgb();
}
function bt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = ur.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? cn(t) : i === 3 ? new de(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Tt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Tt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = pr.exec(e)) ? new de(t[1], t[2], t[3], 1) : (t = hr.exec(e)) ? new de(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = mr.exec(e)) ? Tt(t[1], t[2], t[3], t[4]) : (t = fr.exec(e)) ? Tt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = gr.exec(e)) ? hn(t[1], t[2] / 100, t[3] / 100, 1) : (t = wr.exec(e)) ? hn(t[1], t[2] / 100, t[3] / 100, t[4]) : rn.hasOwnProperty(e) ? cn(rn[e]) : e === "transparent" ? new de(NaN, NaN, NaN, 0) : null;
}
function cn(e) {
  return new de(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Tt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new de(e, t, i, n);
}
function vr(e) {
  return e instanceof Ct || (e = bt(e)), e ? (e = e.rgb(), new de(e.r, e.g, e.b, e.opacity)) : new de();
}
function Ii(e, t, i, n) {
  return arguments.length === 1 ? vr(e) : new de(e, t, i, n ?? 1);
}
function de(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Li(de, Ii, Zn(Ct, {
  brighter(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? kt : Math.pow(kt, e), new de(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new de(Ke(this.r), Ke(this.g), Ke(this.b), Yt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: un,
  // Deprecated! Use color.formatHex.
  formatHex: un,
  formatHex8: Ir,
  formatRgb: pn,
  toString: pn
}));
function un() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}`;
}
function Ir() {
  return `#${qe(this.r)}${qe(this.g)}${qe(this.b)}${qe((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function pn() {
  const e = Yt(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ke(this.r)}, ${Ke(this.g)}, ${Ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Yt(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function qe(e) {
  return e = Ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function hn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, i, n);
}
function Jn(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ct || (e = bt(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), a = NaN, r = o - s, l = (o + s) / 2;
  return r ? (t === o ? a = (i - n) / r + (i < n) * 6 : i === o ? a = (n - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? o + s : 2 - o - s, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new ve(a, r, l, e.opacity);
}
function _r(e, t, i, n) {
  return arguments.length === 1 ? Jn(e) : new ve(e, t, i, n ?? 1);
}
function ve(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Li(ve, _r, Zn(Ct, {
  brighter(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? kt : Math.pow(kt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new de(
      pi(e >= 240 ? e - 240 : e + 120, s, n),
      pi(e, s, n),
      pi(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new ve(mn(this.h), Ot(this.s), Ot(this.l), Yt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Yt(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${mn(this.h)}, ${Ot(this.s) * 100}%, ${Ot(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function mn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ot(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function pi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const es = (e) => () => e;
function kr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function $r(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function br(e) {
  return (e = +e) == 1 ? ts : function(t, i) {
    return i - t ? $r(t, i, e) : es(isNaN(t) ? i : t);
  };
}
function ts(e, t) {
  var i = t - e;
  return i ? kr(e, i) : es(isNaN(e) ? t : e);
}
const fn = (function e(t) {
  var i = br(t);
  function n(s, o) {
    var a = i((s = Ii(s)).r, (o = Ii(o)).r), r = i(s.g, o.g), l = i(s.b, o.b), c = ts(s.opacity, o.opacity);
    return function(p) {
      return s.r = a(p), s.g = r(p), s.b = l(p), s.opacity = c(p), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function Pe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var _i = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hi = new RegExp(_i.source, "g");
function Er(e) {
  return function() {
    return e;
  };
}
function Sr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ar(e, t) {
  var i = _i.lastIndex = hi.lastIndex = 0, n, s, o, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (n = _i.exec(e)) && (s = hi.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), r[a] ? r[a] += o : r[++a] = o), (n = n[0]) === (s = s[0]) ? r[a] ? r[a] += s : r[++a] = s : (r[++a] = null, l.push({ i: a, x: Pe(n, s) })), i = hi.lastIndex;
  return i < t.length && (o = t.slice(i), r[a] ? r[a] += o : r[++a] = o), r.length < 2 ? l[0] ? Sr(l[0].x) : Er(t) : (t = l.length, function(c) {
    for (var p = 0, h; p < t; ++p) r[(h = l[p]).i] = h.x(c);
    return r.join("");
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
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * n) && (i -= e * l, n -= t * l), (r = Math.sqrt(i * i + n * n)) && (i /= r, n /= r, l /= r), e * n < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * gn,
    skewX: Math.atan(l) * gn,
    scaleX: a,
    scaleY: r
  };
}
var Rt;
function Cr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ki : is(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Mr(e) {
  return e == null || (Rt || (Rt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rt.setAttribute("transform", e), !(e = Rt.transform.baseVal.consolidate())) ? ki : (e = e.matrix, is(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ns(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, p, h, m, f, y) {
    if (c !== h || p !== m) {
      var v = f.push("translate(", null, t, null, i);
      y.push({ i: v - 4, x: Pe(c, h) }, { i: v - 2, x: Pe(p, m) });
    } else (h || m) && f.push("translate(" + h + t + m + i);
  }
  function a(c, p, h, m) {
    c !== p ? (c - p > 180 ? p += 360 : p - c > 180 && (c += 360), m.push({ i: h.push(s(h) + "rotate(", null, n) - 2, x: Pe(c, p) })) : p && h.push(s(h) + "rotate(" + p + n);
  }
  function r(c, p, h, m) {
    c !== p ? m.push({ i: h.push(s(h) + "skewX(", null, n) - 2, x: Pe(c, p) }) : p && h.push(s(h) + "skewX(" + p + n);
  }
  function l(c, p, h, m, f, y) {
    if (c !== h || p !== m) {
      var v = f.push(s(f) + "scale(", null, ",", null, ")");
      y.push({ i: v - 4, x: Pe(c, h) }, { i: v - 2, x: Pe(p, m) });
    } else (h !== 1 || m !== 1) && f.push(s(f) + "scale(" + h + "," + m + ")");
  }
  return function(c, p) {
    var h = [], m = [];
    return c = e(c), p = e(p), o(c.translateX, c.translateY, p.translateX, p.translateY, h, m), a(c.rotate, p.rotate, h, m), r(c.skewX, p.skewX, h, m), l(c.scaleX, c.scaleY, p.scaleX, p.scaleY, h, m), c = p = null, function(f) {
      for (var y = -1, v = m.length, C; ++y < v; ) h[(C = m[y]).i] = C.x(f);
      return h.join("");
    };
  };
}
var Pr = ns(Cr, "px, ", "px)", "deg)"), Nr = ns(Mr, ", ", ")", ")"), Tr = 1e-12;
function wn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Or(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Rr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ur = (function e(t, i, n) {
  function s(o, a) {
    var r = o[0], l = o[1], c = o[2], p = a[0], h = a[1], m = a[2], f = p - r, y = h - l, v = f * f + y * y, C, _;
    if (v < Tr)
      _ = Math.log(m / c) / t, C = function(k) {
        return [
          r + k * f,
          l + k * y,
          c * Math.exp(t * k * _)
        ];
      };
    else {
      var P = Math.sqrt(v), L = (m * m - c * c + n * v) / (2 * c * i * P), H = (m * m - c * c - n * v) / (2 * m * i * P), x = Math.log(Math.sqrt(L * L + 1) - L), g = Math.log(Math.sqrt(H * H + 1) - H);
      _ = (g - x) / t, C = function(k) {
        var E = k * _, D = wn(x), M = c / (i * P) * (D * Rr(t * E + x) - Or(x));
        return [
          r + M * f,
          l + M * y,
          c * D / wn(t * E + x)
        ];
      };
    }
    return C.duration = _ * 1e3 * t / Math.SQRT2, C;
  }
  return s.rho = function(o) {
    var a = Math.max(1e-3, +o), r = a * a, l = r * r;
    return e(a, r, l);
  }, s;
})(Math.SQRT2, 2, 4);
var it = 0, mt = 0, ct = 0, ss = 1e3, jt, ft, Xt = 0, We = 0, ei = 0, Et = typeof performance == "object" && performance.now ? performance : Date, os = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zi() {
  return We || (os(Dr), We = Et.now() + ei);
}
function Dr() {
  We = 0;
}
function Qt() {
  this._call = this._time = this._next = null;
}
Qt.prototype = as.prototype = {
  constructor: Qt,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? zi() : +i) + (t == null ? 0 : +t), !this._next && ft !== this && (ft ? ft._next = this : jt = this, ft = this), this._call = e, this._time = i, $i();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, $i());
  }
};
function as(e, t, i) {
  var n = new Qt();
  return n.restart(e, t, i), n;
}
function Lr() {
  zi(), ++it;
  for (var e = jt, t; e; )
    (t = We - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --it;
}
function yn() {
  We = (Xt = Et.now()) + ei, it = mt = 0;
  try {
    Lr();
  } finally {
    it = 0, qr(), We = 0;
  }
}
function zr() {
  var e = Et.now(), t = e - Xt;
  t > ss && (ei -= t, Xt = e);
}
function qr() {
  for (var e, t = jt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : jt = i);
  ft = e, $i(n);
}
function $i(e) {
  if (!it) {
    mt && (mt = clearTimeout(mt));
    var t = e - We;
    t > 24 ? (e < 1 / 0 && (mt = setTimeout(yn, e - Et.now() - ei)), ct && (ct = clearInterval(ct))) : (ct || (Xt = Et.now(), ct = setInterval(zr, ss)), it = 1, os(yn));
  }
}
function xn(e, t, i) {
  var n = new Qt();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var Fr = Di("start", "end", "cancel", "interrupt"), Vr = [], rs = 0, vn = 1, bi = 2, Ft = 3, In = 4, Ei = 5, Vt = 6;
function ti(e, t, i, n, s, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  Kr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: Fr,
    tween: Vr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: rs
  });
}
function qi(e, t) {
  var i = Ie(e, t);
  if (i.state > rs) throw new Error("too late; already scheduled");
  return i;
}
function be(e, t) {
  var i = Ie(e, t);
  if (i.state > Ft) throw new Error("too late; already running");
  return i;
}
function Ie(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Kr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = as(o, 0, i.time);
  function o(c) {
    i.state = vn, i.timer.restart(a, i.delay, i.time), i.delay <= c && a(c - i.delay);
  }
  function a(c) {
    var p, h, m, f;
    if (i.state !== vn) return l();
    for (p in n)
      if (f = n[p], f.name === i.name) {
        if (f.state === Ft) return xn(a);
        f.state === In ? (f.state = Vt, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete n[p]) : +p < t && (f.state = Vt, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete n[p]);
      }
    if (xn(function() {
      i.state === Ft && (i.state = In, i.timer.restart(r, i.delay, i.time), r(c));
    }), i.state = bi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === bi) {
      for (i.state = Ft, s = new Array(m = i.tween.length), p = 0, h = -1; p < m; ++p)
        (f = i.tween[p].value.call(e, e.__data__, i.index, i.group)) && (s[++h] = f);
      s.length = h + 1;
    }
  }
  function r(c) {
    for (var p = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(l), i.state = Ei, 1), h = -1, m = s.length; ++h < m; )
      s[h].call(e, p);
    i.state === Ei && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = Vt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Kt(e, t) {
  var i = e.__transition, n, s, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((n = i[a]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > bi && n.state < Ei, n.state = Vt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function Hr(e) {
  return this.each(function() {
    Kt(this, e);
  });
}
function Wr(e, t) {
  var i, n;
  return function() {
    var s = be(this, e), o = s.tween;
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
function Gr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = be(this, e), a = o.tween;
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
function Br(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ie(this.node(), i).tween, s = 0, o = n.length, a; s < o; ++s)
      if ((a = n[s]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Wr : Gr)(i, e, t));
}
function Fi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = be(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return Ie(s, n).value[t];
  };
}
function ds(e, t) {
  var i;
  return (typeof t == "number" ? Pe : t instanceof bt ? fn : (i = bt(t)) ? (t = i, fn) : Ar)(e, t);
}
function Yr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function jr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Xr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Qr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Zr(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function Jr(e, t, i) {
  var n, s, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r)));
  };
}
function ed(e, t) {
  var i = Jt(e), n = i === "transform" ? Nr : ds;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Jr : Zr)(i, n, Fi(this, "attr." + e, t)) : t == null ? (i.local ? jr : Yr)(i) : (i.local ? Qr : Xr)(i, n, t));
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
function ad(e, t) {
  return function() {
    qi(this, e).delay = +t.apply(this, arguments);
  };
}
function rd(e, t) {
  return t = +t, function() {
    qi(this, e).delay = t;
  };
}
function dd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ad : rd)(t, e)) : Ie(this.node(), t).delay;
}
function ld(e, t) {
  return function() {
    be(this, e).duration = +t.apply(this, arguments);
  };
}
function cd(e, t) {
  return t = +t, function() {
    be(this, e).duration = t;
  };
}
function ud(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ld : cd)(t, e)) : Ie(this.node(), t).duration;
}
function pd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    be(this, e).ease = t;
  };
}
function hd(e) {
  var t = this._id;
  return arguments.length ? this.each(pd(t, e)) : Ie(this.node(), t).ease;
}
function md(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    be(this, e).ease = i;
  };
}
function fd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(md(this._id, e));
}
function gd(e) {
  typeof e != "function" && (e = Vn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, r = n[s] = [], l, c = 0; c < a; ++c)
      (l = o[c]) && e.call(l, l.__data__, c, o) && r.push(l);
  return new Me(n, this._parents, this._name, this._id);
}
function wd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), a = new Array(n), r = 0; r < o; ++r)
    for (var l = t[r], c = i[r], p = l.length, h = a[r] = new Array(p), m, f = 0; f < p; ++f)
      (m = l[f] || c[f]) && (h[f] = m);
  for (; r < n; ++r)
    a[r] = t[r];
  return new Me(a, this._parents, this._name, this._id);
}
function yd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function xd(e, t, i) {
  var n, s, o = yd(t) ? qi : be;
  return function() {
    var a = o(this, e), r = a.on;
    r !== n && (s = (n = r).copy()).on(t, i), a.on = s;
  };
}
function vd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ie(this.node(), i).on.on(e) : this.each(xd(i, e, t));
}
function Id(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _d() {
  return this.on("end.remove", Id(this._id));
}
function kd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ri(e));
  for (var n = this._groups, s = n.length, o = new Array(s), a = 0; a < s; ++a)
    for (var r = n[a], l = r.length, c = o[a] = new Array(l), p, h, m = 0; m < l; ++m)
      (p = r[m]) && (h = e.call(p, p.__data__, m, r)) && ("__data__" in p && (h.__data__ = p.__data__), c[m] = h, ti(c[m], t, i, m, c, Ie(p, i)));
  return new Me(o, this._parents, t, i);
}
function $d(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Fn(e));
  for (var n = this._groups, s = n.length, o = [], a = [], r = 0; r < s; ++r)
    for (var l = n[r], c = l.length, p, h = 0; h < c; ++h)
      if (p = l[h]) {
        for (var m = e.call(p, p.__data__, h, l), f, y = Ie(p, i), v = 0, C = m.length; v < C; ++v)
          (f = m[v]) && ti(f, t, i, v, m, y);
        o.push(m), a.push(p);
      }
  return new Me(o, a, t, i);
}
var bd = At.prototype.constructor;
function Ed() {
  return new bd(this._groups, this._parents);
}
function Sd(e, t) {
  var i, n, s;
  return function() {
    var o = tt(this, e), a = (this.style.removeProperty(e), tt(this, e));
    return o === a ? null : o === i && a === n ? s : s = t(i = o, n = a);
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
    var a = tt(this, e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Cd(e, t, i) {
  var n, s, o;
  return function() {
    var a = tt(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), tt(this, e))), a === l ? null : a === n && l === s ? o : (s = l, o = t(n = a, r));
  };
}
function Md(e, t) {
  var i, n, s, o = "style." + t, a = "end." + o, r;
  return function() {
    var l = be(this, e), c = l.on, p = l.value[o] == null ? r || (r = ls(t)) : void 0;
    (c !== i || s !== p) && (n = (i = c).copy()).on(a, s = p), l.on = n;
  };
}
function Pd(e, t, i) {
  var n = (e += "") == "transform" ? Pr : ds;
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
    var a = t.apply(this, arguments);
    return a !== s && (n = (s = a) && Nd(e, a, i)), n;
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
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      if (l = a[c]) {
        var p = Ie(l, t);
        ti(l, e, i, c, a, {
          time: p.time + p.delay + p.duration,
          delay: 0,
          duration: p.duration,
          ease: p.ease
        });
      }
  return new Me(n, this._parents, e, i);
}
function Vd() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, a) {
    var r = { value: a }, l = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = be(this, n), p = c.on;
      p !== e && (t = (e = p).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), c.on = t;
    }), s === 0 && o();
  });
}
var Kd = 0;
function Me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function cs() {
  return ++Kd;
}
var Ae = At.prototype;
Me.prototype = {
  constructor: Me,
  select: kd,
  selectAll: $d,
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
  tween: Br,
  delay: dd,
  duration: ud,
  ease: hd,
  easeVarying: fd,
  end: Vd,
  [Symbol.iterator]: Ae[Symbol.iterator]
};
function Hd(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Wd = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Hd
};
function Gd(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Bd(e) {
  var t, i;
  e instanceof Me ? (t = e._id, e = e._name) : (t = cs(), (i = Wd).time = zi(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], r = a.length, l, c = 0; c < r; ++c)
      (l = a[c]) && ti(l, e, t, c, a, i || Gd(l, t));
  return new Me(n, this._parents, e, t);
}
At.prototype.interrupt = Hr;
At.prototype.transition = Bd;
const Ut = (e) => () => e;
function Yd(e, {
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
function jd(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Xd() {
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
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function el() {
  var e = jd, t = Xd, i = Jd, n = Qd, s = Zd, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Ur, c = Di("start", "zoom", "end"), p, h, m, f = 500, y = 150, v = 0, C = 10;
  function _(u) {
    u.property("__zoom", _n).on("wheel.zoom", E, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", M).filter(s).on("touchstart.zoom", T).on("touchmove.zoom", G).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(u, I, w, b) {
    var N = u.selection ? u.selection() : u;
    N.property("__zoom", _n), u !== N ? x(u, I, w, b) : N.interrupt().each(function() {
      g(this, arguments).event(b).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, _.scaleBy = function(u, I, w, b) {
    _.scaleTo(u, function() {
      var N = this.__zoom.k, z = typeof I == "function" ? I.apply(this, arguments) : I;
      return N * z;
    }, w, b);
  }, _.scaleTo = function(u, I, w, b) {
    _.transform(u, function() {
      var N = t.apply(this, arguments), z = this.__zoom, $ = w == null ? H(N) : typeof w == "function" ? w.apply(this, arguments) : w, S = z.invert($), R = typeof I == "function" ? I.apply(this, arguments) : I;
      return i(L(P(z, R), $, S), N, a);
    }, w, b);
  }, _.translateBy = function(u, I, w, b) {
    _.transform(u, function() {
      return i(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), a);
    }, null, b);
  }, _.translateTo = function(u, I, w, b, N) {
    _.transform(u, function() {
      var z = t.apply(this, arguments), $ = this.__zoom, S = b == null ? H(z) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(yt.translate(S[0], S[1]).scale($.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), z, a);
    }, b, N);
  };
  function P(u, I) {
    return I = Math.max(o[0], Math.min(o[1], I)), I === u.k ? u : new Ce(I, u.x, u.y);
  }
  function L(u, I, w) {
    var b = I[0] - w[0] * u.k, N = I[1] - w[1] * u.k;
    return b === u.x && N === u.y ? u : new Ce(u.k, b, N);
  }
  function H(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function x(u, I, w, b) {
    u.on("start.zoom", function() {
      g(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      g(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var N = this, z = arguments, $ = g(N, z).event(b), S = t.apply(N, z), R = w == null ? H(S) : typeof w == "function" ? w.apply(N, z) : w, Z = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), J = N.__zoom, ce = typeof I == "function" ? I.apply(N, z) : I, ge = l(J.invert(R).concat(Z / J.k), ce.invert(R).concat(Z / ce.k));
      return function(ue) {
        if (ue === 1) ue = ce;
        else {
          var we = ge(ue), nt = Z / we[2];
          ue = new Ce(nt, R[0] - we[0] * nt, R[1] - we[1] * nt);
        }
        $.zoom(null, ue);
      };
    });
  }
  function g(u, I, w) {
    return !w && u.__zooming || new k(u, I);
  }
  function k(u, I) {
    this.that = u, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, I), this.taps = 0;
  }
  k.prototype = {
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
      var I = _e(this.that).datum();
      c.call(
        u,
        this.that,
        new Yd(u, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: c
        }),
        I
      );
    }
  };
  function E(u, ...I) {
    if (!e.apply(this, arguments)) return;
    var w = g(this, I).event(u), b = this.__zoom, N = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, n.apply(this, arguments)))), z = Ue(u);
    if (w.wheel)
      (w.mouse[0][0] !== z[0] || w.mouse[0][1] !== z[1]) && (w.mouse[1] = b.invert(w.mouse[0] = z)), clearTimeout(w.wheel);
    else {
      if (b.k === N) return;
      w.mouse = [z, b.invert(z)], Kt(this), w.start();
    }
    ut(u), w.wheel = setTimeout($, y), w.zoom("mouse", i(L(P(b, N), w.mouse[0], w.mouse[1]), w.extent, a));
    function $() {
      w.wheel = null, w.end();
    }
  }
  function D(u, ...I) {
    if (m || !e.apply(this, arguments)) return;
    var w = u.currentTarget, b = g(this, I, !0).event(u), N = _e(u.view).on("mousemove.zoom", R, !0).on("mouseup.zoom", Z, !0), z = Ue(u, w), $ = u.clientX, S = u.clientY;
    lr(u.view), mi(u), b.mouse = [z, this.__zoom.invert(z)], Kt(this), b.start();
    function R(J) {
      if (ut(J), !b.moved) {
        var ce = J.clientX - $, ge = J.clientY - S;
        b.moved = ce * ce + ge * ge > v;
      }
      b.event(J).zoom("mouse", i(L(b.that.__zoom, b.mouse[0] = Ue(J, w), b.mouse[1]), b.extent, a));
    }
    function Z(J) {
      N.on("mousemove.zoom mouseup.zoom", null), cr(J.view, b.moved), ut(J), b.event(J).end();
    }
  }
  function M(u, ...I) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, b = Ue(u.changedTouches ? u.changedTouches[0] : u, this), N = w.invert(b), z = w.k * (u.shiftKey ? 0.5 : 2), $ = i(L(P(w, z), b, N), t.apply(this, I), a);
      ut(u), r > 0 ? _e(this).transition().duration(r).call(x, $, b, u) : _e(this).call(_.transform, $, b, u);
    }
  }
  function T(u, ...I) {
    if (e.apply(this, arguments)) {
      var w = u.touches, b = w.length, N = g(this, I, u.changedTouches.length === b).event(u), z, $, S, R;
      for (mi(u), $ = 0; $ < b; ++$)
        S = w[$], R = Ue(S, this), R = [R, this.__zoom.invert(R), S.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== R[2] && (N.touch1 = R, N.taps = 0) : (N.touch0 = R, z = !0, N.taps = 1 + !!p);
      p && (p = clearTimeout(p)), z && (N.taps < 2 && (h = R[0], p = setTimeout(function() {
        p = null;
      }, f)), Kt(this), N.start());
    }
  }
  function G(u, ...I) {
    if (this.__zooming) {
      var w = g(this, I).event(u), b = u.changedTouches, N = b.length, z, $, S, R;
      for (ut(u), z = 0; z < N; ++z)
        $ = b[z], S = Ue($, this), w.touch0 && w.touch0[2] === $.identifier ? w.touch0[0] = S : w.touch1 && w.touch1[2] === $.identifier && (w.touch1[0] = S);
      if ($ = w.that.__zoom, w.touch1) {
        var Z = w.touch0[0], J = w.touch0[1], ce = w.touch1[0], ge = w.touch1[1], ue = (ue = ce[0] - Z[0]) * ue + (ue = ce[1] - Z[1]) * ue, we = (we = ge[0] - J[0]) * we + (we = ge[1] - J[1]) * we;
        $ = P($, Math.sqrt(ue / we)), S = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2], R = [(J[0] + ge[0]) / 2, (J[1] + ge[1]) / 2];
      } else if (w.touch0) S = w.touch0[0], R = w.touch0[1];
      else return;
      w.zoom("touch", i(L($, S, R), w.extent, a));
    }
  }
  function X(u, ...I) {
    if (this.__zooming) {
      var w = g(this, I).event(u), b = u.changedTouches, N = b.length, z, $;
      for (mi(u), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), z = 0; z < N; ++z)
        $ = b[z], w.touch0 && w.touch0[2] === $.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === $.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && ($ = Ue($, this), Math.hypot(h[0] - $[0], h[1] - $[1]) < C)) {
        var S = _e(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
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
    return arguments.length ? (a[0][0] = +u[0][0], a[1][0] = +u[1][0], a[0][1] = +u[0][1], a[1][1] = +u[1][1], _) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, _.constrain = function(u) {
    return arguments.length ? (i = u, _) : i;
  }, _.duration = function(u) {
    return arguments.length ? (r = +u, _) : r;
  }, _.interpolate = function(u) {
    return arguments.length ? (l = u, _) : l;
  }, _.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? _ : u;
  }, _.clickDistance = function(u) {
    return arguments.length ? (v = (u = +u) * u, _) : Math.sqrt(v);
  }, _.tapDistance = function(u) {
    return arguments.length ? (C = +u, _) : C;
  }, _;
}
var tl = Object.defineProperty, il = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? il(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && tl(t, i, s), s;
};
function nl(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, a = n.x - i.x, r = n.y - i.y, l = s * r - o * a;
  if (Math.abs(l) < 1e-9) return null;
  const c = ((i.x - e.x) * r - (i.y - e.y) * a) / l, p = ((i.x - e.x) * o - (i.y - e.y) * s) / l;
  return c <= 0.02 || c >= 0.98 || p <= 0.02 || p >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function sl(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), r = t.x + a * n, l = t.y + a * s;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function ol(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], a = e[s + 1], r = Math.hypot(a.x - o.x, a.y - o.y) || 1, l = (a.x - o.x) / r, c = (a.y - o.y) / r, p = t.map(([m, f]) => nl(o, a, m, f)).filter((m) => m !== null).filter((m) => m.t * r > i + 2 && (1 - m.t) * r > i + 2).sort((m, f) => m.t - f.t);
    let h = -1 / 0;
    for (const m of p)
      m.t * r - i <= h + 2 || (n += ` L ${m.x - l * i} ${m.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + l * i} ${m.y + c * i}`, h = m.t * r + i);
    n += ` L ${a.x} ${a.y}`;
  }
  return n;
}
const Dt = {
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
    const s = Math.min(...t.map((p) => p.x - p.w / 2)) - e, o = Math.max(...t.map((p) => p.x + p.w / 2)) + e, a = Math.min(...t.map((p) => p.y - p.h / 2)) - e, r = Math.max(...t.map((p) => p.y + p.h / 2)) + e, l = Math.max(0.15, Math.min(n.width / (o - s), n.height / (r - a), 1.25)), c = yt.translate(n.width / 2 - l * (s + o) / 2, n.height / 2 - l * (a + r) / 2).scale(l);
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
      const f = this.nodeIdAt(m), y = f && f !== t.id ? this.scene.nodes.find((v) => v.id === f) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, p = (m) => {
      if ((m.buttons & 1) === 0) {
        h(m);
        return;
      }
      const f = this.toScene(m), y = f.x - i.x, v = f.y - i.y;
      if (!(!s && Math.hypot(y, v) < 3 / this._t.k))
        if (s = !0, a && r) {
          const C = /* @__PURE__ */ new Map();
          for (const _ of a) {
            const P = r.get(_.id), L = this.clampToParent(_, P.x + y, P.y + v);
            C.set(_.id, { x: L.x, y: L.y });
          }
          this._dragGroup = C;
        } else l(m) ? (this._dragPos = { id: t.id, x: n.x + y, y: n.y + v }, this._hoverNodeId = c(m)) : (this._dragPos = this.clampToParent(t, n.x + y, n.y + v), this._hoverNodeId = null);
    }, h = (m) => {
      if (window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", h), s && this._dragGroup)
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
    const s = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((v) => v.parentId === t.id), l = Math.min(...r.map((v) => v.x - v.w / 2)), c = Math.max(...r.map((v) => v.x + v.w / 2)), p = Math.min(...r.map((v) => v.y - v.h / 2)), h = Math.max(...r.map((v) => v.y + v.h / 2)), m = Ms(
      r.map((v) => ({ dx: v.x - a.x, dy: v.y - a.y, w: v.w, h: v.h })),
      { w: s, h: o }
    ), f = (v) => {
      if ((v.buttons & 1) === 0) {
        y();
        return;
      }
      const C = this.toScene(v);
      if (v.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(m.w, 2 * Math.abs(C.x - a.x)),
          h: Math.max(m.h, 2 * Math.abs(C.y - a.y))
        };
        return;
      }
      const _ = a.x - i * a.w / 2, P = a.y - n * a.h / 2, L = i > 0 ? Math.max(C.x, _ + s, r.length ? c + 10 : -1 / 0) : Math.min(C.x, _ - s, r.length ? l - 10 : 1 / 0), H = n > 0 ? Math.max(C.y, P + o, r.length ? h + 10 : -1 / 0) : Math.min(C.y, P - o, r.length ? p - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + L) / 2,
        y: (P + H) / 2,
        w: Math.abs(L - _),
        h: Math.abs(H - P)
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
    const t = this.scene.nodes.find((p) => p.id === e.sourceId), i = this.scene.nodes.find((p) => p.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), a = n[0] ?? o, r = n[n.length - 1] ?? s;
    let l = this.borderPoint(t, a.x, a.y), c = this.borderPoint(i, r.x, r.y);
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
        <path d=${ol(t, i)}
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
        ${s ? l.map((c, p) => {
      var m;
      const h = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === p;
      return B`
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
    var m, f, y;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, r = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, c = r / 2, p = l / 2, h = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return B`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(v) => this.onNodePointerDown(v, e)}
         @dblclick=${(v) => {
      v.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? B`<rect x=${-c - 4} y=${-p - 4} width=${r + 8} height=${l + 8}
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
          ${e.tooltip ? B`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? B`<text x=${-c} y=${-p - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? B`<g transform="translate(${c - 13}, ${-p + 13})"
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
        ${e.symbol && Dt[e.symbol] && !a ? B`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-p + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Dt[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && Dt[e.symbol] ? B`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Dt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? B`
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
              </foreignObject>` : a ? B`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? B`<text x=${-c + 12} y=${-p + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : B`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? B`<line x1=${-c + 8} y1=${-p + 28} x2=${c - 8} y2=${-p + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (a ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, p],
      [0, -p]
    ].map(
      ([v, C]) => B`
                <circle data-handle cx=${v} cy=${C} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([v, C]) => B`
                <rect data-resize x=${v * c - 6.5} y=${C * p - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${v * C > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(_) => this.onResizePointerDown(_, e, v, C)}>
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
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), c = Math.max(a.x, r.x), p = Math.min(a.y, r.y), h = Math.max(a.y, r.y), m = this.scene.nodes.filter((f) => {
          const y = this.nodePos(f);
          return y.x >= l && y.x <= c && y.y >= p && y.y <= h;
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
    const n = this.getBoundingClientRect(), s = this._t.k, o = yt.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    _e(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return O``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = s.width / this._t.k, l = s.height / this._t.k;
    return O`
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
      return B`<rect
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
    }), O`
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
ae([
  $e({ attribute: !1 })
], ne.prototype, "scene", 2);
ae([
  $e({ attribute: !1 })
], ne.prototype, "selectedId", 2);
ae([
  $e({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
ae([
  $e({ type: Boolean })
], ne.prototype, "connectable", 2);
ae([
  $e({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
ae([
  U()
], ne.prototype, "_t", 2);
ae([
  U()
], ne.prototype, "_dragPos", 2);
ae([
  U()
], ne.prototype, "_dragGroup", 2);
ae([
  U()
], ne.prototype, "_pendingLink", 2);
ae([
  U()
], ne.prototype, "_hoverNodeId", 2);
ae([
  U()
], ne.prototype, "_editingId", 2);
ae([
  U()
], ne.prototype, "_spaceDown", 2);
ae([
  U()
], ne.prototype, "_wpDrag", 2);
ae([
  U()
], ne.prototype, "_selectedWaypoint", 2);
ae([
  U()
], ne.prototype, "_resize", 2);
ae([
  U()
], ne.prototype, "_rubber", 2);
ne = ae([
  Oi("modux-canvas")
], ne);
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
function pe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ye = (e) => e.trim().toLowerCase();
function al(e, t) {
  var D, M, T, G, X;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((u) => [u.id, u.name])), s = e.modules.flatMap(
    (u) => (u.useCases ?? []).map((I) => ({ ...I, moduleId: u.id }))
  ), o = new Set(s.map((u) => u.id)), a = e.aggregates ?? [], r = new Set(
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
      w: V.command.w,
      h: V.command.h,
      kind: "use-case",
      symbol: u.policy ? "flow" : "gear",
      fill: u.policy ? V.policy.fill : V.command.fill,
      stroke: u.policy ? V.policy.stroke : V.command.stroke,
      badge: u.policy ? "POLICY" : "COMANDO",
      tooltip: u.policy ? `${u.name} — policy de ${n.get(u.moduleId) ?? u.moduleId} (reacción, no caso de negocio)` : `${u.name} — caso de uso de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  for (const u of a)
    pe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: V.aggregate.w,
      h: V.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: V.aggregate.fill,
      stroke: V.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${u.name} — agregado de ${n.get(u.moduleId) ?? u.moduleId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const u of [...l, ...c])
    pe(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: V.event.w,
      h: V.event.h,
      kind: u.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: V.event.fill,
      stroke: V.event.stroke,
      badge: u.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${u.name} — evento de ${n.get(u.moduleId) ?? u.moduleId}`
    }), h.set(Ye(u.name), u.id);
  const m = (u) => {
    if (!u || !u.trim()) return null;
    const I = h.get(Ye(u));
    if (I) return I;
    const w = `evname:${Ye(u)}`;
    return pe(i, {
      id: w,
      label: u,
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
      tooltip: `${u} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, f = (u) => {
    const I = p.find((b) => b.id === u.id) ?? p.find((b) => u.name && Ye(b.name) === Ye(u.name)), w = (I == null ? void 0 : I.id) ?? (u.id || (u.name ? `rm:${Ye(u.name)}` : null));
    return w ? (pe(i, {
      id: w,
      label: (I == null ? void 0 : I.name) ?? u.name ?? w,
      x: 0,
      y: 0,
      w: V.readModel.w,
      h: V.readModel.h,
      kind: I ? "read-model" : "derived-read-model",
      fill: V.readModel.fill,
      stroke: V.readModel.stroke,
      dashed: !I,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const u of e.actorUses ?? []) {
    if (!o.has(u.targetId)) continue;
    const I = (e.actors ?? []).find((w) => w.id === u.actorId);
    I && (pe(i, {
      id: I.id,
      label: I.name,
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
      id: `es-actor:${I.id}->${u.targetId}`,
      sourceId: I.id,
      targetId: u.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const u of e.aiAgents ?? []) {
    const I = (e.agentUses ?? []).filter(($) => $.agentId === u.id), w = (e.agentExternalUses ?? []).filter(($) => $.agentId === u.id), b = (e.agentRags ?? []).filter(($) => $.agentId === u.id), N = (e.agentMcpUses ?? []).filter(($) => $.agentId === u.id), z = (e.agentGatewayUses ?? []).some(($) => $.agentId === u.id) || (e.agentApiOpUses ?? []).some(($) => $.agentId === u.id) || (e.agentQueryUses ?? []).some(($) => $.agentId === u.id) || (e.agentDelegations ?? []).some(($) => $.agentId === u.id) || (e.agentTriggers ?? []).some(($) => $.agentId === u.id);
    if (!(!I.length && !w.length && !b.length && !N.length && !z)) {
      pe(i, {
        id: u.id,
        label: u.name,
        x: 0,
        y: 0,
        w: V.actor.w,
        h: V.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${u.name} — agente de IA (consume por MCP)`
      });
      for (const $ of I)
        o.has($.useCaseId) && ie(i, {
          id: `es-agent:${u.id}->${$.useCaseId}`,
          sourceId: u.id,
          targetId: $.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const $ of w) {
        const S = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === $.externalUseCaseId)
        );
        if (!S) continue;
        const R = (D = (S.useCases ?? []).find((Z) => Z.id === $.externalUseCaseId)) == null ? void 0 : D.name;
        pe(i, {
          id: S.id,
          label: S.name,
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
          id: `es-agentx:${u.id}->${$.externalUseCaseId}`,
          sourceId: u.id,
          targetId: S.id,
          kind: "es-agent-external",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Llama a ${R} del sistema externo` : void 0
        });
      }
      for (const $ of N) {
        const S = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === $.mcpServerId)
        );
        if (!S) continue;
        const R = (M = (S.mcpServers ?? []).find((Z) => Z.id === $.mcpServerId)) == null ? void 0 : M.name;
        pe(i, {
          id: S.id,
          label: S.name,
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
          id: `es-agentmcp:${u.id}->${$.mcpServerId}`,
          sourceId: u.id,
          targetId: S.id,
          kind: "es-agent-mcp",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Consume las herramientas del servidor MCP ${R}` : void 0
        });
      }
      for (const $ of b) {
        const S = (e.rags ?? []).find((R) => R.id === $.ragId);
        if (S) {
          pe(i, {
            id: S.id,
            label: S.name,
            x: 0,
            y: 0,
            w: V.readModel.w,
            h: V.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${S.name} — base de conocimiento (retrieval)`
          }), ie(i, {
            id: `es-agrag:${u.id}->${S.id}`,
            sourceId: u.id,
            targetId: S.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const R of S.sourceReadModelIds ?? []) {
            const Z = f({ id: R });
            Z && ie(i, {
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
  const y = (u) => {
    const I = e.externalSystems.find((w) => w.id === u);
    return I ? (pe(i, {
      id: I.id,
      label: I.name,
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
    }), I.id) : null;
  };
  for (const u of e.externalCalls ?? []) {
    const I = y(u.externalSystemId);
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
      (N) => (N.useCases ?? []).some((z) => z.id === u.targetId)
    ), w = I ? y(I.id) : null;
    if (!w) continue;
    const b = (T = ((I == null ? void 0 : I.useCases) ?? []).find((N) => N.id === u.targetId)) == null ? void 0 : T.name;
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
    !i.nodes.has(u.domainEventId) || !(i.nodes.has(u.sourceId) && (o.has(u.sourceId) || a.some((w) => w.id === u.sourceId) || r.has(u.sourceId))) || ie(i, {
      id: `es-emit:${u.sourceId}->${u.domainEventId}`,
      sourceId: u.sourceId,
      targetId: u.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const C = (u, I, w, b, N, z) => (pe(i, {
    id: u,
    label: I,
    x: 0,
    y: 0,
    w: V.policy.w,
    h: V.policy.h,
    kind: w,
    symbol: "flow",
    fill: V.policy.fill,
    stroke: V.policy.stroke,
    badge: b,
    tooltip: N
  }), u), _ = (u, I) => {
    const w = m(u);
    w && ie(i, {
      id: `es-trigger:${w}->${I}`,
      sourceId: w,
      targetId: I,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, P = (u, I) => {
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
    const I = C(
      u.id,
      u.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${u.name}${u.eventName ? ` — reacciona a ${u.eventName}` : ""}${u.consumerGroup ? ` · grupo ${u.consumerGroup}` : ""}`
    );
    _(u.eventName, I);
    for (const w of u.actions ?? []) {
      if (w.type === "CallUseCase" && P(I, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const b = `saga:${w.sagaId}`;
        C(b, w.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${I}->${b}`,
          sourceId: I,
          targetId: b,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const b = (e.projections ?? []).find((N) => N.id === w.projectionId);
        b && ie(i, {
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
  for (const u of e.projections ?? []) {
    const I = C(
      u.id,
      u.name,
      "projection",
      "PROYECCIÓN",
      `${u.name}${u.readModelName ? ` — materializa ${u.readModelName}` : ""}`
    );
    for (const N of u.handledEventIds) {
      const z = i.nodes.has(N) ? N : null;
      z && ie(i, {
        id: `es-trigger:${z}->${I}`,
        sourceId: z,
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
    const w = u.sourceExternalUseCaseId ?? u.sourceExternalTableId;
    if (w) {
      const N = e.externalSystems.find(
        ($) => ($.useCases ?? []).some((S) => S.id === w) || ($.tables ?? []).some((S) => S.id === w)
      ), z = N ? y(N.id) : null;
      if (z) {
        const $ = ((G = (N.useCases ?? []).find((S) => S.id === w)) == null ? void 0 : G.name) ?? ((X = (N.tables ?? []).find((S) => S.id === w)) == null ? void 0 : X.name);
        ie(i, {
          id: `es-poll:${u.id}`,
          sourceId: z,
          targetId: I,
          kind: "es-projects-poll",
          label: $,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: $ ? `polling de ${$}` : "polling"
        });
      }
    }
    const b = f({ id: u.readModelId, name: u.readModelName });
    b && ie(i, {
      id: `es-projects:${I}->${b}`,
      sourceId: I,
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
    const I = C(
      `flow:${u.id}`,
      u.name,
      "flow",
      `POLICY · ${u.archetype}`,
      `Flow ${u.name} [${u.archetype}]`
    );
    if (_(u.triggerEvent, I), P(I, u.targetUseCaseId), !u.targetUseCaseId) {
      const w = y(u.targetId), b = w ?? `tgt:${u.targetId}`;
      !w && n.has(u.targetId) && pe(i, {
        id: b,
        label: n.get(u.targetId) ?? u.targetId,
        x: 0,
        y: 0,
        w: V.module.w,
        h: V.module.h,
        kind: "module",
        symbol: "component",
        fill: V.module.fill,
        stroke: V.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(b) && ie(i, {
        id: `es-deliver:${u.id}`,
        sourceId: I,
        targetId: b,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const u of e.processes ?? []) {
    const I = C(
      u.id,
      u.name,
      "process",
      `PROCESO${u.sla ? ` · SLA ${u.sla}` : ""}`,
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, I);
    for (const b of u.steps) P(I, b.useCaseId);
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: I,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const u of e.workflows ?? []) {
    const I = C(
      u.id,
      u.name,
      "workflow",
      "WORKFLOW",
      `${u.name}${u.triggerEvent ? ` — arranca con ${u.triggerEvent}` : ""}`
    );
    _(u.triggerEvent, I);
    for (const b of u.steps ?? []) {
      P(I, b.targetUseCaseId);
      for (const N of [b.emittedEventName, b.completionEventName]) {
        const z = m(N);
        z && ie(i, {
          id: `es-wfemit:${u.id}:${z}`,
          sourceId: I,
          targetId: z,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = m(u.onCompletionEventName);
    w && ie(i, {
      id: `es-done:${u.id}`,
      sourceId: I,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const L = [...i.nodes.values()], H = /* @__PURE__ */ new Map();
  for (const u of i.edges)
    H.has(u.targetId) || H.set(u.targetId, []), H.get(u.targetId).push(u.sourceId);
  const x = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), k = (u) => {
    const I = x.get(u);
    if (I !== void 0) return I;
    if (g.has(u)) return 0;
    g.add(u);
    const w = H.get(u) ?? [], b = w.length ? 1 + Math.max(...w.map(k)) : 0;
    return g.delete(u), x.set(u, b), b;
  }, E = /* @__PURE__ */ new Map();
  for (const u of L) {
    const I = t[u.id];
    if (I) {
      u.x = I.x, u.y = I.y;
      continue;
    }
    const w = k(u.id), b = E.get(w) ?? 0;
    E.set(w, b + 1), u.x = 140 + w * 260, u.y = 110 + b * 110;
  }
  return { nodes: L, edges: i.edges };
}
const rl = 190, dl = 56, kn = 180, ll = 56, cl = 150, ul = 44, $n = 250, bn = 100;
function pl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), a;
  };
  return n(e);
}
function hl(e, t) {
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
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (r) => {
    var l;
    return (l = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === r)) == null ? void 0 : l.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((r) => {
    var C;
    const l = new Map(r.steps.map((_) => [_.id, _])), c = new Map(r.steps.map((_) => [_.id, pl(_, l)])), p = /* @__PURE__ */ new Map();
    for (const _ of r.steps) {
      const P = c.get(_.id) ?? 0;
      p.set(P, (p.get(P) ?? 0) + 1);
    }
    const h = Math.max(1, ...p.values()), m = hl(e, r);
    if (m && !s.has(m.id)) {
      s.add(m.id);
      const _ = t[m.id] ?? { x: 140, y: a };
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
    const f = t[r.id] ?? { x: 420, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: f.x,
      y: f.y,
      w: rl,
      h: dl,
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
    let v = 0;
    for (const _ of r.steps) {
      const P = c.get(_.id) ?? 0;
      v = Math.max(v, P);
      const L = y.get(P) ?? 0;
      y.set(P, L + 1);
      const H = t[_.id] ?? {
        x: f.x + (P + 1) * $n,
        y: a + (L - (p.get(P) - 1) / 2) * bn
      }, x = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: H.x,
        y: H.y,
        w: kn,
        h: ll,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: x ? `→ ${x}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${x ? ` · lanza ${x}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const g = (_.dependsOnStepIds ?? []).filter((k) => l.has(k));
      g.length === 0 && n.push({
        id: `wfs:${r.id}:${_.id}`,
        sourceId: r.id,
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
          tooltip: `${_.name} espera a ${((C = l.get(k)) == null ? void 0 : C.name) ?? k}`
        });
    }
    if (r.onCompletionEventName) {
      const _ = `done:${r.id}`, P = t[_] ?? { x: f.x + (v + 2) * $n, y: a };
      i.push({
        id: _,
        label: r.onCompletionEventName,
        x: P.x,
        y: P.y,
        w: kn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const L = new Set(r.steps.flatMap((x) => x.dependsOnStepIds ?? [])), H = r.steps.filter((x) => !L.has(x.id));
      for (const x of H.length ? H : [])
        n.push({
          id: `wfd:${r.id}:${x.id}`,
          sourceId: x.id,
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
    a += Math.max(2, h + 1) * bn + 60;
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
  }, a = await n.layout(o), r = {};
  for (const l of a.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var gl = Object.defineProperty, wl = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? wl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
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
}, yl = Object.keys(Si), xl = ["CORE", "SUPPORTING", "GENERIC"];
function pt(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const c = t.x - e.x, p = t.y - e.y;
  for (const [h, m] of [
    [-c, e.x - n],
    [c, s - e.x],
    [-p, e.y - o],
    [p, a - e.y]
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
function vl(e, t, i = 28) {
  var c;
  const n = new Map(e.nodes.map((p) => [p.id, p])), s = (p) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let f = p; f; f = (m = n.get(f)) == null ? void 0 : m.parentId) h.add(f);
    return h;
  }, o = e.nodes, a = (p) => p.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (p, h, m) => {
    const f = a(m), y = { x: m.x, y: m.y, w: m.w + 2 * f, h: m.h + 2 * f }, v = m.w / 2 + f * 1.5, C = m.h / 2 + f * 1.5, _ = { x: m.x - v, y: m.y - C }, P = { x: m.x + v, y: m.y - C }, L = { x: m.x - v, y: m.y + C }, H = { x: m.x + v, y: m.y + C }, x = [];
    for (const g of [_, P, L, H])
      !pt(p, g, y) && !pt(g, h, y) && x.push([g]);
    for (const [g, k] of [
      [_, P],
      [P, _],
      [P, H],
      [H, P],
      [H, L],
      [L, H],
      [L, _],
      [_, L]
    ])
      !pt(p, g, y) && !pt(k, h, y) && x.push([g, k]);
    return x;
  };
  for (const p of e.edges) {
    if ((c = t[p.id]) != null && c.length) continue;
    const h = n.get(p.sourceId), m = n.get(p.targetId);
    if (!h || !m) continue;
    const f = /* @__PURE__ */ new Set([...s(h.id), ...s(m.id)]), y = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let v = 0; v < 12; v++) {
      let C = !1;
      e: for (let _ = 0; _ < y.length - 1; _++)
        for (const P of o) {
          if (f.has(P.id)) continue;
          const L = a(P), H = { x: P.x, y: P.y, w: P.w + 2 * L, h: P.h + 2 * L };
          if (!pt(y[_], y[_ + 1], H)) continue;
          const x = l(y[_], y[_ + 1], P);
          if (!x.length) continue;
          const g = (E) => o.some(
            (D) => D !== P && !f.has(D.id) && Math.abs(E.x - D.x) < D.w / 2 + a(D) / 2 && Math.abs(E.y - D.y) < D.h / 2 + a(D) / 2
          ), k = (E) => {
            let D = 0;
            const M = [y[_], ...E, y[_ + 1]];
            for (let T = 0; T < M.length - 1; T++)
              D += Math.hypot(M[T + 1].x - M[T].x, M[T + 1].y - M[T].y);
            return D + (E.some(g) ? 1e4 : 0);
          };
          x.sort((E, D) => k(E) - k(D)), y.splice(_ + 1, 0, ...x[0]), C = !0;
          break e;
        }
      if (!C) break;
    }
    y.length > 2 && r.set(
      p.id,
      y.slice(1, -1).map((v) => ({ x: Math.round(v.x), y: Math.round(v.y) }))
    );
  }
  return r;
}
const q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Il(e, t) {
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
function _l(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let K = class extends Ve {
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
    }), e === "contexts" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "external-ai-agent" && this._newContextMapKind !== "mcp-gateway" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module");
    const s = Nt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((p) => !p.parentId), r = Ai(a), l = [...r.keys()].map((p) => ({
      kind: "move-node",
      view: "context-map",
      id: p,
      pos: o.nodes[p] ?? null
    })), c = { ...o.nodes };
    for (const [p, h] of r) {
      const m = a.find((y) => y.id === p), f = o.nodes[p] ?? { x: m.x, y: m.y };
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
    const i = vl(e, t);
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
    const l = this.sceneFor(s), c = l.nodes.find((h) => h.id === t);
    if (c != null && c.parentId) {
      const h = l.nodes.find((m) => m.id === c.parentId);
      h && (r = { x: i - h.x, y: n - h.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: r } });
    const p = [{ kind: "move-node", view: s, id: t, pos: a }];
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!o || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === a) return;
    const l = this._view, c = this.viewLayout(l), p = this.sceneFor(l), h = r ? p.nodes.find((y) => y.id === r) : void 0, m = h ? { x: n - h.x, y: s - h.y } : { x: n, y: s }, f = [
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
    const l = `proxy-${q(o.name)}-${q(a.name)}`;
    if ((this.model.proxyApis ?? []).some((y) => y.id === l)) return;
    const c = this._view, p = this.viewLayout(c), m = this.sceneFor(c).nodes.find((y) => y.id === i);
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
      const h = s.nodes.find((m) => m.id === r);
      if (h != null && h.parentId) {
        const m = s.nodes.find((f) => f.id === h.parentId);
        m && (p = { x: l - m.x, y: c - m.y });
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
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((p = r.sizes) == null ? void 0 : p[t]) ?? null },
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
    const i = Gi(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((a) => [a.id, a.x])), s = [...t.steps].sort(
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
    var H;
    if (this._view === "workflows") {
      const x = this.owningWorkflowOf(e), g = this.owningWorkflowOf(t);
      if (!x || x !== g || e === t) return;
      const k = x.steps.find((E) => E.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
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
      const [, x, g] = s, k = (this.model.proxyApis ?? []).find((G) => G.id === g), E = (k == null ? void 0 : k.targetApiId) ?? ((H = (this.model.apiImplementations ?? []).find(
        (G) => G.moduleId === g && (this.model.apis ?? []).some(
          (X) => X.id === G.apiId && X.operations.some((u) => u.id === x)
        )
      )) == null ? void 0 : H.apiId);
      if (!E) return;
      if (new Set(
        this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: E,
          operationId: x,
          moduleId: g,
          targetUseCaseId: t
        });
        return;
      }
      if (!(k != null && k.targetApiId)) return;
      let M = null;
      if (t === k.targetApiId)
        M = k.targetApiId;
      else {
        const G = /^apiimpl:(.+)@(.+)$/.exec(t);
        G && G[1] === k.targetApiId ? M = G[2] : this.model.modules.some((X) => X.id === t) && (this.model.apiImplementations ?? []).some(
          (X) => X.apiId === k.targetApiId && X.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (G) => G.proxyId === k.id && G.operationId === x && G.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: x,
        targetSiteId: M
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((x) => x.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (T) => T.agentId === e && T.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.useCases ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (T) => T.agentId === e && T.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.mcpServers ?? []).map((T) => T.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (T) => T.agentId === e && T.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((M) => M.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (T) => T.agentId === e && T.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((M) => M.operations.map((T) => T.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (T) => T.agentId === e && T.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (T) => T.agentId === e && T.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((M) => (M.queryServices ?? []).map((T) => T.id))
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
      (this.model.rags ?? []).some((M) => M.id === t) && ((this.model.agentRags ?? []).some(
        (T) => T.agentId === e && T.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === e)) {
      const x = (this.model.mcpGateways ?? []).find((E) => E.id === e), g = this.model.externalSystems.some((E) => (E.mcpServers ?? []).some((D) => D.id === t)) || (this.model.apis ?? []).some((E) => E.id === t) || (this.model.apis ?? []).some((E) => E.operations.some((D) => D.id === t)) || this.model.modules.some((E) => (E.useCases ?? []).some((D) => D.id === t)) || (this.model.rags ?? []).some((E) => E.id === t), k = [
        ...x.mcpServerIds ?? [],
        ...x.apiIds ?? [],
        ...x.apiOperationIds ?? [],
        ...x.useCaseIds ?? [],
        ...x.ragIds ?? []
      ].includes(t);
      g && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((x) => x.id === t)) return;
    const a = (this.model.rags ?? []).find((x) => x.id === e);
    if (a) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map((E) => E.id))
      ).has(t) && !(a.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map((E) => E.id))
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
    if ((this.model.rags ?? []).some((x) => x.id === t)) return;
    if ((this.model.workflows ?? []).some((x) => x.id === e)) {
      const x = (this.model.workflows ?? []).find((E) => E.id === e), g = (this.model.workflows ?? []).find(
        (E) => E.id === t && E.id !== e
      );
      if (g) {
        const E = x.onCompletionEventName || `${x.name.replace(/\s+/g, "")}Completado`;
        g.triggerEvent !== E && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: E });
        return;
      }
      const k = this.model.modules.flatMap((E) => E.useCases ?? []).find((E) => E.id === t);
      if (k && !(x.steps ?? []).some((D) => D.targetUseCaseId === t)) {
        const D = `wfs-${q(k.name)}`;
        let M = D;
        for (let T = 2; (x.steps ?? []).some((G) => G.id === M); T++)
          M = `${D}-${T}`;
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
    if ((this.model.workflows ?? []).some((x) => x.id === t)) {
      const x = this.model.modules.flatMap((E) => E.domainEvents ?? []).find((E) => E.id === e), g = this.model.modules.flatMap((E) => E.applicationEvents ?? []).find((E) => E.id === e), k = x ?? g;
      if (k) {
        const E = (this.model.emissions ?? []).find((G) => G.domainEventId === e), D = new Set((this.model.aggregates ?? []).map((G) => G.id)), M = new Set(
          this.model.modules.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
        ), T = new Set(
          this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: E && D.has(E.sourceId) ? E.sourceId : void 0,
          triggerDomainServiceId: E && M.has(E.sourceId) ? E.sourceId : void 0,
          triggerUseCaseId: E && T.has(E.sourceId) ? E.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((x) => x.id === e)) {
      const x = (this.model.proxyApis ?? []).find((g) => g.id === e);
      if ((this.model.apis ?? []).some((g) => g.id === t)) {
        x.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((g) => g.id === t)) {
        if (!x.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === x.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: x.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((g) => g.id === t) && x.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((x) => x.id === e)) {
      if (this.model.externalSystems.some((x) => x.id === t)) {
        (this.model.apis ?? []).find((g) => g.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((x) => x.id === t) && ((this.model.apiImplementations ?? []).some(
        (g) => g.apiId === e && g.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const r = new Set((this.model.actors ?? []).map((x) => x.id));
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
      if (!r.has(e)) return;
    }
    if (r.has(e)) {
      const x = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((E) => E.id))
      ), g = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map((E) => E.id))
      );
      if (x.has(t) || g.has(t)) {
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
    const c = this.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === e), p = this.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === e);
    if (c || p) {
      const x = (c ?? p).name, g = c ? { externalUseCaseId: e } : { externalTableId: e }, k = (M) => c ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, E = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if (E) {
        (this.model.projections ?? []).some(
          (T) => k(T) && T.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(x)}-${q(E.name)}`,
          name: `${E.name}Projection`,
          ...g,
          targetId: t
        });
        return;
      }
      const D = this.model.modules.find((M) => M.id === t);
      if (D) {
        (this.model.projections ?? []).some(
          (T) => k(T) && T.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(x)}-${q(D.name)}`,
          name: `${x}ViewProjection`,
          ...g,
          moduleId: t,
          readModelName: `${x}View`
        });
        return;
      }
      return;
    }
    const h = (this.model.aggregates ?? []).find((x) => x.id === e);
    if (h) {
      const x = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(h.name)}-${q(x.name)}`,
          name: `${x.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const g = this.model.modules.find((k) => k.id === t);
      if (g) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(h.name)}-${q(g.name)}`,
          name: `${h.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${h.name}View`
        });
        return;
      }
    }
    const m = new Set(
      this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((g) => g.id))
    ), f = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((x) => x.id),
      ...this.model.modules.flatMap((x) => (x.domainServices ?? []).map((g) => g.id))
    ]), y = new Set(
      this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((g) => g.id))
    ), v = new Set(this.model.modules.flatMap((x) => (x.useCases ?? []).map((g) => g.id))), C = new Set(
      this.model.modules.flatMap((x) => (x.queryServices ?? []).map((g) => g.id))
    );
    if (v.has(e) && C.has(t)) {
      (this.model.queryCalls ?? []).some(
        (g) => g.sourceId === e && g.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const _ = new Set(
      this.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((g) => g.id))
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
    if (v.has(e) && (this.model.aggregates ?? []).some((x) => x.id === t)) {
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
      const x = y.has(e), g = this.model.modules.flatMap((w) => (x ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === e), k = this.model.modules.flatMap((w) => (w.useCases ?? []).map((b) => ({ u: b, module: w }))).find(({ u: w }) => w.id === t), E = this.model.modules.flatMap((w) => (w.readModels ?? []).map((b) => ({ rm: b, module: w }))).find(({ rm: w }) => w.id === t), D = this.model.modules.find((w) => w.id === t) ?? (E == null ? void 0 : E.module) ?? (k == null ? void 0 : k.module);
      if (!g || !D) return;
      const M = new Set((this.model.aggregates ?? []).map((w) => w.id)), T = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((b) => b.id))
      ), G = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === e && (x ? v.has(w.sourceId) : M.has(w.sourceId) || T.has(w.sourceId))
      );
      if (!G) {
        this.emit("modux-notice", {
          message: x ? `Declara primero qué caso de uso publica ${g.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${g.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const X = !x && M.has(G.sourceId);
      if (k) {
        if (this.model.flows.some(
          (b) => b.archetype === "TRIGGERS" && b.triggerEvent === g.name && b.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(g.name)}-${q(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: X ? G.sourceId : "",
          triggerDomainServiceId: !x && !X ? G.sourceId : void 0,
          triggerUseCaseId: x ? G.sourceId : void 0,
          triggerEvent: g.name,
          targetId: D.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const u = (E == null ? void 0 : E.rm.name) ?? `${g.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === g.name && w.targetId === D.id && w.readModelName === u
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q(g.name)}-${q(u)}`,
        name: u,
        archetype: "MATERIALIZES",
        triggerAggregateId: X ? G.sourceId : "",
        triggerDomainServiceId: !x && !X ? G.sourceId : void 0,
        triggerUseCaseId: x ? G.sourceId : void 0,
        triggerEvent: g.name,
        targetId: D.id,
        readModelName: u
      });
      return;
    }
    const P = /* @__PURE__ */ new Set([
      ...f,
      ...v,
      ...C,
      ...this.model.modules.flatMap((x) => (x.readModels ?? []).map((g) => g.id))
    ]);
    if (P.has(e) || P.has(t) || m.has(t) || y.has(t))
      return;
    const L = new Set(this.model.externalSystems.map((x) => x.id));
    if (L.has(e)) {
      if (new Set(
        this.model.modules.flatMap((D) => (D.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (L.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const g = (this.model.apis ?? []).find(
        (D) => D.operations.some((M) => M.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), E = g ? { operationId: t, siteId: g.id } : k ? { operationId: k[1], siteId: k[2] } : null;
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
      id: `step-${q(e)}`,
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
      id: `wfstep-${q(e)}`,
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
    const t = new Set(e.memberIds), i = (s, o, a = {}) => O`
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
    `, n = (s, o) => o.length ? O`<h4>${s}</h4>${o}` : "";
    return O`
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${q(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
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
    const t = e.detail.kind === "process-step" ? _l(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Il(e.detail.id, e.detail.kind);
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
      (n.workflows ?? []).map((o) => o.id),
      (n.workflows ?? []).flatMap((o) => (o.steps ?? []).map((a) => a.id))
    ])
      s.forEach((o) => i.add(o));
    for (let s = 1; ; s++) {
      const o = s === 1 ? e : `${e} ${s}`, a = `${t}${q(o)}`;
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
    var p;
    const n = K.PALETTE_NEW.find((h) => h.type === e);
    if (!n) return;
    const s = this._view, o = this.sceneFor(s), a = (h, m) => {
      const f = this.viewLayout(s), y = m ? o.nodes.find((C) => C.id === m) : void 0, v = y ? { x: Math.round(t.x - y.x), y: Math.round(t.y - y.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...f, nodes: { ...f.nodes, [h]: v } }), { kind: "move-node", view: s, id: h, pos: null };
    }, r = (h, m, f) => {
      const y = this.inverseOf(h) ?? [];
      this.command(h, !1);
      const v = a(m, f);
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
        workflow: "wf-"
      }, { id: m, name: f } = this.uniquePaletteName(n.label, h[e] ?? ""), y = e === "module" ? { kind: "add-module", id: m, name: f, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: f } : e === "external-system" ? { kind: "add-external-system", id: m, name: f } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: f } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: f, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: f } : e === "rag" ? { kind: "add-rag", id: m, name: f } : e === "api" ? { kind: "add-api", id: m, name: f } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: f } : {
        kind: "add-workflow",
        id: m,
        name: f,
        completionEventName: `${f.replace(/\s+/g, "")}Completado`
      };
      r(y, m);
      return;
    }
    if (e === "workflow-step") {
      const h = this.model.workflows ?? [], m = [];
      for (let P = i ?? void 0; P; )
        m.push(P), P = (p = o.nodes.find((L) => L.id === P)) == null ? void 0 : p.parentId;
      const f = m.map((P) => h.find((L) => L.id === P)).find(Boolean), y = m.map((P) => {
        const L = h.find((H) => (H.steps ?? []).some((x) => x.id === P));
        return L ? { owner: L, stepId: P } : null;
      }).find(Boolean), v = f ?? (y == null ? void 0 : y.owner);
      if (!v) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: C, name: _ } = this.uniquePaletteName("Paso", "wfs-");
      y && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: v.id,
          id: C,
          name: _,
          ...y ? { dependsOnStepIds: [y.stepId], afterStepId: y.stepId } : {}
        },
        C
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
      const { id: m, name: f } = this.uniquePaletteName("API", "api-"), y = { kind: "add-api", id: m, name: f }, v = this.inverseOf(y) ?? [];
      this.command(y, !1), this.model.externalSystems.some((L) => L.id === h) ? this.command({ kind: "set-api-publisher", id: m, targetId: h }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: h }, !1);
      const C = this.viewLayout(this._view), _ = this.sceneFor(this._view).nodes.find((L) => L.id === h), P = _ ? { x: Math.round(t.x - _.x), y: Math.round(t.y - _.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...C, nodes: { ...C.nodes, [m]: P } }), this.pushUndoEntry([...v, { kind: "move-node", view: this._view, id: m, pos: null }]);
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
      const h = `agg-${q(c)}`;
      r({ kind: "add-aggregate", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "use-case" || e === "policy") {
      const h = `uc-${q(c)}`;
      r(
        { kind: "add-use-case", id: h, name: c, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        h,
        l
      );
    } else if (e === "domain-event") {
      const h = `ev-${q(c)}`;
      r({ kind: "add-domain-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "application-event") {
      const h = `aev-${q(c)}`;
      r({ kind: "add-application-event", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "domain-service") {
      const h = `ds-${q(c)}`;
      r({ kind: "add-domain-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "query-service") {
      const h = `qs-${q(c)}`;
      r({ kind: "add-query-service", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "read-model") {
      const h = `rm-${q(c)}`, m = (this.model.aggregates ?? []).find((f) => f.id === l);
      r({ kind: "add-read-model", id: h, name: c, aggregateId: l }, h, (m == null ? void 0 : m.moduleId) ?? l);
    } else if (e === "api-operation") {
      const h = (this.model.apis ?? []).find((C) => C.id === l), m = new Set(((h == null ? void 0 : h.operations) ?? []).map((C) => C.id));
      let f = c, y = `apiop-${l.replace(/^api-/, "")}-${q(f)}`;
      for (let C = 2; m.has(y); C++)
        f = `${n.label} ${C}`, y = `apiop-${l.replace(/^api-/, "")}-${q(f)}`;
      r({ kind: "add-api-operation", apiId: l, id: y, name: f }, y, l), o.nodes.some(
        (C) => C.parentId === l && (C.kind === "api-operation" || C.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(h == null ? void 0 : h.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const h = this.model.modules.flatMap((v) => v.useCases ?? []).find((v) => v.id === l), m = new Set((h == null ? void 0 : h.stepIds) ?? []);
      let f = c, y = `step-${q(f)}`;
      for (let v = 2; m.has(y); v++)
        f = `${n.label} ${v}`, y = `step-${q(f)}`;
      r({ kind: "add-use-case-step", useCaseId: l, id: y, name: f }, y, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(h == null ? void 0 : h.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const h = `xuc-${q(c)}`;
      r({ kind: "add-external-use-case", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "external-table") {
      const h = `tbl-${q(c)}`;
      r({ kind: "add-external-table", id: h, name: c, moduleId: l }, h, l);
    } else if (e === "mcp-server") {
      const h = `mcpsrv-${q(c)}`;
      r({ kind: "add-mcp-server", id: h, name: c, moduleId: l }, h, l);
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
    const l = this.viewLayout(o), c = r.parentId ? a.nodes.find((h) => h.id === r.parentId) : void 0, p = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(o, { ...l, nodes: { ...l.nodes, [e]: p } });
  }
  renderPalette() {
    if (!this._paletteOpen || this._view !== "context-map" && this._view !== "workflows") return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = K.PALETTE_NEW.filter(
      (i) => (this._view !== "workflows" || ["workflow", "workflow-step"].includes(i.type)) && (!e || i.label.toLowerCase().includes(e))
    );
    return O`
      <div class="palette">
        <input
          class="palette-filter"
          placeholder="Filtrar…"
          .value=${this._paletteFilter}
          @input=${(i) => this._paletteFilter = i.target.value}
        />
        <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
        ${t.map(
      (i) => O`
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
        ${this._view === "workflows" ? "" : O`<div class="palette-h">Existentes — arrastra para colocar o conectar</div>`}
        ${(this._view === "workflows" ? [] : this.paletteCatalog()).map(
      (i) => O`
            <div class="palette-g">${i.label}</div>
            ${i.items.map(
        (n) => O`
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
    var t, i, n, s, o, a, r, l, c, p, h, m, f, y, v, C, _, P, L, H, x, g, k, E, D, M, T, G, X, u, I, w, b, N, z;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${q(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: q(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e });
        else if (this._newContextMapKind === "external-ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e, external: !0 });
        else if (this._newContextMapKind === "mcp-gateway")
          this.command({ kind: "add-mcp-gateway", id: `mcpgw-${q(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${q(e)}`, name: e });
        else if (this._newContextMapKind === "api") {
          const $ = ((t = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : t.id) ?? ((i = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : i.id);
          if (!$) {
            this.emit("modux-notice", {
              message: "Selecciona el sistema externo o el contexto que publica la API antes de crearla"
            });
            return;
          }
          const S = `api-${q(e)}`;
          this.command({ kind: "add-api", id: S, name: e }), this.model.externalSystems.some((R) => R.id === $) ? this.command({ kind: "set-api-publisher", id: S, targetId: $ }, !1) : this.command({ kind: "add-api-implementation", apiId: S, moduleId: $ }, !1);
        } else if (this._newContextMapKind === "proxy-api")
          this.command({ kind: "add-proxy-api", id: `proxy-${q(e)}`, name: e });
        else if (this._detail !== "contexts" && this._newContextMapKind === "api-operation") {
          const $ = (n = (this.model.apis ?? []).find((R) => R.id === this._selectedId)) == null ? void 0 : n.id, S = this._newApiId || $ || ((o = (s = this.model.apis) == null ? void 0 : s[0]) == null ? void 0 : o.id);
          if (!S) return;
          this.command({
            kind: "add-api-operation",
            apiId: S,
            id: `apiop-${S.replace(/^api-/, "")}-${q(e)}`,
            name: e
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-event") {
          const $ = (a = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : a.id, S = this._newModuleId || $ || ((r = this.model.modules[0]) == null ? void 0 : r.id);
          if (!S) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "application-event") {
          const $ = (l = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : l.id, S = this._newModuleId || $ || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!S) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "domain-service") {
          const $ = (p = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : p.id, S = this._newModuleId || $ || ((h = this.model.modules[0]) == null ? void 0 : h.id);
          if (!S) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "query-service") {
          const $ = (m = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : m.id, S = this._newModuleId || $ || ((f = this.model.modules[0]) == null ? void 0 : f.id);
          if (!S) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "use-case") {
          const $ = (y = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : y.id, S = this._newModuleId || $ || ((v = this.model.modules[0]) == null ? void 0 : v.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: S });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "policy") {
          const $ = (C = this.model.modules.find((R) => R.id === this._selectedId)) == null ? void 0 : C.id, S = this._newModuleId || $ || ((_ = this.model.modules[0]) == null ? void 0 : _.id);
          if (!S) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: S, policy: !0 });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-use-case") {
          const $ = (P = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : P.id, S = this._newExternalId || $ || ((L = this.model.externalSystems[0]) == null ? void 0 : L.id);
          if (!S) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "external-table") {
          const $ = (H = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : H.id, S = this._newExternalId || $ || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!S) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "mcp-server") {
          const $ = (g = this.model.externalSystems.find((R) => R.id === this._selectedId)) == null ? void 0 : g.id, S = this._newExternalId || $ || ((k = this.model.externalSystems[0]) == null ? void 0 : k.id);
          if (!S) return;
          this.command({
            kind: "add-mcp-server",
            id: `mcpsrv-${q(e)}`,
            name: e,
            moduleId: S
          });
        } else if (this._detail !== "contexts" && this._newContextMapKind === "read-model") {
          const $ = (E = (this.model.aggregates ?? []).find((R) => R.id === this._selectedId)) == null ? void 0 : E.id, S = this._newAggregateId || $ || ((M = (D = this.model.aggregates) == null ? void 0 : D[0]) == null ? void 0 : M.id);
          if (!S) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: S });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const $ = this._newModuleId || ((T = this.model.modules[0]) == null ? void 0 : T.id);
        if (!$) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: $ });
      } else if (this._view === "flows") {
        const $ = this._newTriggerAggId || ((X = (G = this.model.aggregates) == null ? void 0 : G[0]) == null ? void 0 : X.id), S = this._newTargetId || ((u = this.model.modules[0]) == null ? void 0 : u.id), R = this._newTriggerEvent.trim();
        if (!$ || !S || !R) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: $,
          triggerEvent: R,
          targetId: S
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const $ = this._newModuleId || ((I = this.model.modules[0]) == null ? void 0 : I.id);
        if (!$) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: $,
          triggerAggregateId: this._newTriggerAggId || ((b = (w = this.model.aggregates) == null ? void 0 : w[0]) == null ? void 0 : b.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${q(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((z = (N = this.model.aggregates) == null ? void 0 : N[0]) == null ? void 0 : z.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Bs(i, t.nodes) : e === "flows" ? io(i, t.nodes) : e === "processes" ? Gi(i, t.nodes) : e === "workflows" ? ml(i, t.nodes) : e === "eventstorming" ? al(i, t.nodes) : qs(
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
    }, a = await fl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    return O`
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
      (t) => O`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? O`
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
      (t) => O`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._multi.length ? O`
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
        ${this._view === "context-map" ? O`<select
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
              ${this._detail !== "contexts" ? O`
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
        ${this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table" || this._newContextMapKind === "mcp-server") ? O`<select
              title="Sistema externo dueño del nuevo elemento"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return O`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "api-operation" ? O`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return O`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail !== "contexts" && this._newContextMapKind === "read-model" ? O`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return O`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? O`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${xl.map(
      (t) => O`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail !== "contexts" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? O`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return O`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? O`
              ${this._view === "flows" ? O`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => O`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return O`<option
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
              ${this._view === "flows" ? O`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return O`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? O`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => O`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? O`
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
      (t) => O`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? O`<input
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
              ${this.owningProcessOf(this._selectedId) ? O`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? O`
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
      (t) => O`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? O`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => O`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "context-map" ? O`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? O`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? O`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : O`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return O`
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
    return O`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => O`
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
    return O`
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
      (n) => O`
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
K.styles = Pi`
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
K.PALETTE_NEW = [
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
W([
  $e({ attribute: !1 })
], K.prototype, "model", 2);
W([
  $e({ attribute: !1 })
], K.prototype, "layout", 2);
W([
  $e({ attribute: !1 })
], K.prototype, "diff", 2);
W([
  U()
], K.prototype, "_view", 2);
W([
  U()
], K.prototype, "_detail", 2);
W([
  U()
], K.prototype, "_relationType", 2);
W([
  U()
], K.prototype, "_relationPicker", 2);
W([
  U()
], K.prototype, "_extDepPicker", 2);
W([
  U()
], K.prototype, "_selectedId", 2);
W([
  U()
], K.prototype, "_paletteOpen", 2);
W([
  U()
], K.prototype, "_paletteFilter", 2);
W([
  U()
], K.prototype, "_newName", 2);
W([
  U()
], K.prototype, "_newSubdomain", 2);
W([
  U()
], K.prototype, "_newModuleId", 2);
W([
  U()
], K.prototype, "_newContextMapKind", 2);
W([
  U()
], K.prototype, "_newAggregateId", 2);
W([
  U()
], K.prototype, "_newExternalId", 2);
W([
  U()
], K.prototype, "_newApiId", 2);
W([
  U()
], K.prototype, "_newArchetype", 2);
W([
  U()
], K.prototype, "_newTriggerAggId", 2);
W([
  U()
], K.prototype, "_newTriggerEvent", 2);
W([
  U()
], K.prototype, "_newTargetId", 2);
W([
  U()
], K.prototype, "_undoStack", 2);
W([
  U()
], K.prototype, "_redoStack", 2);
W([
  U()
], K.prototype, "_newStepName", 2);
W([
  U()
], K.prototype, "_newStepType", 2);
W([
  U()
], K.prototype, "_newStepRole", 2);
W([
  U()
], K.prototype, "_newStepDeadline", 2);
W([
  U()
], K.prototype, "_editStepRole", 2);
W([
  U()
], K.prototype, "_editStepDeadline", 2);
W([
  U()
], K.prototype, "_editStepComp", 2);
W([
  U()
], K.prototype, "_newStepUseCase", 2);
W([
  U()
], K.prototype, "_newStepEmits", 2);
W([
  U()
], K.prototype, "_editStepUseCase", 2);
W([
  U()
], K.prototype, "_editStepEmits", 2);
W([
  U()
], K.prototype, "_editStepAwaits", 2);
W([
  U()
], K.prototype, "_multi", 2);
W([
  U()
], K.prototype, "_newViewName", 2);
W([
  U()
], K.prototype, "_activeViewId", 2);
W([
  U()
], K.prototype, "_newRagSourceType", 2);
W([
  U()
], K.prototype, "_newRagSourceUri", 2);
W([
  U()
], K.prototype, "_addMemberKey", 2);
W([
  U()
], K.prototype, "_treeOpen", 2);
W([
  U()
], K.prototype, "_deletePicker", 2);
K = W([
  Oi("modux-editor")
], K);
var kl = Object.defineProperty, $l = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? $l(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && kl(t, i, s), s;
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
            const h = await a.json();
            h != null && h.message && (p = h.message);
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
    return this._error ? O`<div class="status error">modux editor: ${this._error}</div>` : this._model ? O`
      ${this._workspace ? O`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : O`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((o) => o.kind === s).length, n = this._diff.changes.filter((s) => s.kind === "REMOVED").map((s) => s.name ?? s.id);
      return O`<span
                      class="badge solution"
                      title=${n.length ? `Eliminados respecto al sistema: ${n.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? O`
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
      return O`
                      ${i === "EXPLORING" ? O`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? O`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? O`<button
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
      ${this._mergeFlow ? O`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => O`
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
      ${this._toast ? O`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : O`<div class="status">Cargando el modelo…</div>`;
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
  $e()
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
  El as CONTAINER_INSET,
  ne as ModuxCanvas,
  K as ModuxEditor,
  le as ModuxEditorConnected,
  Bs as aggregatesScene,
  Le as apiImplNodeId,
  De as apiOpOccurrenceId,
  fi as containerFit,
  Ms as containerMinSize,
  qs as contextMapScene,
  Ds as flowCoherence,
  io as flowsScene,
  Nt as normalizeViewLayout,
  Gi as processesScene,
  Us as relationEdgeId,
  Ai as resolveOverlaps
};
