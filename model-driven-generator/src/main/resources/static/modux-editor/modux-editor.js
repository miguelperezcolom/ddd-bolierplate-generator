const Jl = 34, ec = 10;
function zi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let r = !1;
    for (let d = 0; d < e.length; d++)
      for (let o = d + 1; o < e.length; o++) {
        const a = e[d], l = e[o], u = i.get(a.id), m = i.get(l.id), f = m.x - u.x, h = m.y - u.y, y = (a.w + l.w) / 2 + t - Math.abs(f), w = (a.h + l.h) / 2 + t - Math.abs(h);
        if (!(y <= 0 || w <= 0))
          if (r = !0, y < w) {
            const v = (f >= 0 ? 1 : -1) * y / 2;
            u.x -= v, m.x += v;
          } else {
            const v = (h >= 0 ? 1 : -1) * w / 2;
            u.y -= v, m.y += v;
          }
      }
    if (!r) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = i.get(n.id);
    (Math.abs(r.x - n.x) > 0.5 || Math.abs(r.y - n.y) > 0.5) && s.set(n.id, r);
  }
  return s;
}
function Vn(e, t = { w: 160, h: 90 }) {
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
  let s = t.w / 2, n = t.w / 2, r = t.h / 2, d = t.h / 2;
  for (const o of i)
    s = Math.max(s, -o.dx + o.w / 2 + 10), n = Math.max(n, o.dx + o.w / 2 + 10), r = Math.max(r, -o.dy + o.h / 2 + 34), d = Math.max(d, o.dy + o.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (d - r) / 2,
    w: s + n,
    h: r + d
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
const Hn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Bn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Wn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, et = 168, tt = 56;
function Be(e, t) {
  return `apiimpl:${e}@${t}`;
}
function He(e, t) {
  return `apiop:${e}@${t}`;
}
const Ji = { compact: 0, coarse: 1, full: 2 };
function es(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: Ji[e ? t : s] > Ji[n] };
}
function Us(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: Be(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const zs = 34, qs = 14, Gn = 14, Ie = 108, be = 32, Fs = 12, Vs = 10, Ct = 2, Yn = Ct * Ie + (Ct - 1) * Fs + 2 * qs;
function jn(e, t) {
  return `rel:${e}->${t}`;
}
function Xn(e, t) {
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
const Kn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Hs = {
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
  const t = Math.max(1, Math.ceil(e / Ct)), i = t * be + (t - 1) * Vs;
  return { w: Yn, h: zs + i + Gn };
}
function Xt(e, t) {
  const i = e % Ct, s = Math.floor(e / Ct);
  return {
    x: -t.w / 2 + qs + i * (Ie + Fs) + Ie / 2,
    y: -t.h / 2 + zs + s * (be + Vs) + be / 2
  };
}
function Qn(e, t, i, s, n, r, d = !1) {
  const o = (e.aggregates ?? []).filter((l) => l.moduleId === t.id), a = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Us(e, t.id),
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
    return [{ ...s, x: i.x, y: i.y, w: et, h: tt }];
  if (d) {
    const l = new Map((e.apis ?? []).map((m) => [m.id, m])), u = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && l.has(m.apiId)).map((m) => {
      const f = l.get(m.apiId);
      return {
        id: Be(m.apiId, m.moduleId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((h) => ({
          id: He(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (u.length > 0) {
      const m = a.filter((f) => f.kind !== "api-impl");
      return Bs(i, s, u, m, n, r);
    }
  }
  return _t(i, s, a, n, r);
}
function Bs(e, t, i, s, n, r, d = /* @__PURE__ */ new Set()) {
  const o = r[t.id] ?? Ai(i.length + s.length), a = i.map((h, y) => {
    const w = n[h.id] ?? Xt(y, o), v = d.has(h.id) ? [] : h.ops, x = r[h.id] ?? Ai(v.length), I = v.map((P, z) => n[P.id] ?? Xt(z, x)), C = Ei(
      { x: w.x, y: w.y },
      x,
      I.map((P) => ({ dx: P.x, dy: P.y, w: Ie, h: be }))
    );
    return { a: h, off: w, ops: v, opOffs: I, fit: C };
  }), l = s.map(
    (h, y) => n[h.id] ?? Xt(i.length + y, o)
  ), u = zi(
    [
      ...a.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, y) => ({
        id: h.id,
        x: l[y].x,
        y: l[y].y,
        w: Ie,
        h: be
      }))
    ],
    24
  );
  for (const h of a) {
    const y = u.get(h.a.id);
    y && (h.off = { x: h.off.x + (y.x - h.fit.x), y: h.off.y + (y.y - h.fit.y) }, h.fit = { ...h.fit, x: y.x, y: y.y });
  }
  s.forEach((h, y) => {
    const w = u.get(h.id);
    w && (l[y] = { x: w.x, y: w.y });
  });
  const m = Ei(e, o, [
    ...a.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...l.map((h) => ({ dx: h.x, dy: h.y, w: Ie, h: be }))
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
    }), h.ops.forEach((y, w) => {
      f.push({
        id: y.id,
        label: y.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[w].x,
        y: e.y + h.off.y + h.opOffs[w].y,
        w: Ie,
        h: be,
        tooltip: `${Si[h.a.opKind]}: ${y.name}`
      });
    });
  return s.forEach((h, y) => {
    const w = Hs[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + l[y].x,
      y: e.y + l[y].y,
      w: Ie,
      h: be,
      symbol: w.symbol,
      fill: w.fill,
      stroke: w.stroke,
      parentId: t.id,
      tooltip: `${Si[h.kind]} ${h.name}`
    });
  }), f;
}
function _t(e, t, i, s, n) {
  const r = n[t.id] ?? Ai(i.length), d = i.map((m, f) => s[m.id] ?? Xt(f, r)), o = zi(
    i.map((m, f) => ({ id: m.id, x: d[f].x, y: d[f].y, w: Ie, h: be })),
    10
  );
  i.forEach((m, f) => {
    const h = o.get(m.id);
    h && (d[f] = { x: h.x, y: h.y });
  });
  const a = Ei(
    e,
    r,
    d.map((m) => ({ dx: m.x, dy: m.y, w: Ie, h: be }))
  ), l = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, u = i.map((m, f) => {
    const h = d[f], y = m.policy ? Kn : Hs[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: Ie,
      h: be,
      symbol: y.symbol,
      fill: y.fill,
      stroke: y.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Si[m.kind]} ${m.name}`
    };
  });
  return [l, ...u];
}
function Zn(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const r = n, d = i !== "contexts", o = i === "operations", a = new Set(e.externalSystems.map((c) => c.id)), l = (e.apis ?? []).filter(
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
  ], y = h.flatMap((c, M) => {
    const V = t[c.ref.id] ?? vt(M, h.length);
    if ("workflow" in c && c.workflow) {
      const j = c.ref;
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
        x: V.x,
        y: V.y,
        w: et,
        h: tt
      }];
    }
    if (c.proxy) {
      const j = c.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`
      };
      if (o && j.targetApiId) {
        const Me = (e.apis ?? []).find((Ze) => Ze.id === j.targetApiId), Pe = (Me == null ? void 0 : Me.operations) ?? [];
        if (Pe.length > 0)
          return _t(
            V,
            ee,
            Pe.map((Ze) => ({
              id: He(Ze.id, j.id),
              name: Ze.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...ee, x: V.x, y: V.y, w: et, h: tt }];
    }
    if (c.api) {
      const j = c.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${j.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(j.id) ? !d : d) && j.operations.length > 0 ? _t(
        V,
        { ...ee, collapsible: !0, collapsed: !1 },
        j.operations.map(
          (Pe) => ({ id: Pe.id, name: Pe.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...ee,
        collapsible: j.operations.length > 0,
        collapsed: j.operations.length > 0,
        x: V.x,
        y: V.y,
        w: et,
        h: tt
      }];
    }
    if (c.external) {
      const j = c.ref, ee = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, Me = l.filter((te) => te.publishedByExternalSystemId === j.id), Pe = m.filter((te) => te.publishedByExternalSystemId === j.id), Ze = Pe.map(
        (te) => ({ id: te.id, name: te.name, kind: "proxy-api" })
      ), hi = [
        ...(j.useCases ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-use-case" })
        ),
        ...(j.tables ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "external-table" })
        ),
        ...(j.mcpServers ?? []).map(
          (te) => ({ id: te.id, name: te.name, kind: "mcp-server" })
        )
      ], mi = Me.length > 0 || Pe.length > 0, fi = mi || hi.length > 0, { form: qt, collapsed: gi } = es(
        n.has(j.id),
        d ? "full" : mi ? "coarse" : "compact",
        hi.length > 0 || o && mi
      ), Qi = [
        ...Ze,
        ...qt === "full" ? hi : []
      ], yi = o && qt === "full" ? Pe.filter((te) => {
        const gt = te.targetApiId ? (e.apis ?? []).find((le) => le.id === te.targetApiId) : void 0;
        return ((gt == null ? void 0 : gt.operations) ?? []).length > 0;
      }) : [];
      if (o && qt === "full" && (Me.length > 0 || yi.length > 0)) {
        const te = [
          ...Me.map((le) => ({
            id: le.id,
            name: le.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${le.name} — API publicada por ${j.name}`,
            opKind: "api-operation",
            ops: (le.operations ?? []).map((yt) => ({ id: yt.id, name: yt.name }))
          })),
          ...yi.map((le) => {
            const yt = (e.apis ?? []).find((Ft) => Ft.id === le.targetApiId);
            return {
              id: le.id,
              name: le.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${le.name} — proxy/cache de ${yt.name}`,
              opKind: "api-op-occurrence",
              ops: (yt.operations ?? []).map((Ft) => ({
                id: He(Ft.id, le.id),
                name: Ft.name
              }))
            };
          })
        ], gt = new Set(yi.map((le) => le.id));
        return Bs(
          V,
          { ...ee, collapsible: !0, collapsed: gi },
          te,
          Qi.filter((le) => !gt.has(le.id)),
          t,
          s,
          r
        );
      }
      const Zi = qt === "compact" ? [] : [
        ...Me.map((te) => ({ id: te.id, name: te.name, kind: "api" })),
        ...Qi
      ];
      return Zi.length > 0 ? _t(
        V,
        { ...ee, collapsible: fi, collapsed: gi },
        Zi,
        t,
        s
      ) : [{
        ...ee,
        collapsible: fi,
        collapsed: fi && gi,
        x: V.x,
        y: V.y,
        w: et,
        h: tt
      }];
    }
    const Y = c.ref, Q = Y.subdomainType ?? "GENERIC", ae = {
      id: Y.id,
      label: Y.name,
      kind: "module",
      symbol: "component",
      fill: Hn[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${Y.name} — subdominio ${Q}`
    }, ye = Us(e, Y.id), mt = (e.aggregates ?? []).some((j) => j.moduleId === Y.id) || (Y.useCases ?? []).length > 0 || (Y.domainEvents ?? []).length > 0 || (Y.applicationEvents ?? []).length > 0 || (Y.readModels ?? []).length > 0 || (Y.domainServices ?? []).length > 0 || (Y.queryServices ?? []).length > 0, qe = mt || ye.length > 0, { form: ft, collapsed: Qe } = es(
      n.has(Y.id),
      d ? "full" : ye.length > 0 ? "coarse" : "compact",
      mt
    );
    return ft === "full" && qe ? Qn(
      e,
      Y,
      V,
      { ...ae, collapsible: !0, collapsed: Qe },
      t,
      s,
      o
    ) : ft === "coarse" && ye.length > 0 ? _t(
      V,
      { ...ae, collapsible: qe, collapsed: Qe },
      ye,
      t,
      s
    ) : [{
      ...ae,
      collapsible: qe,
      collapsed: qe && Qe,
      x: V.x,
      y: V.y,
      w: et,
      h: tt
    }];
  }), w = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, M) => {
    const V = t[c.id] ?? vt(h.length + M, w);
    y.push({
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
  }), (e.aiAgents ?? []).forEach((c, M) => {
    const V = t[c.id] ?? vt(h.length + (e.actors ?? []).length + M, w);
    y.push({
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
  }), (e.mcpGateways ?? []).forEach((c, M) => {
    const V = t[c.id] ?? vt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + M,
      w
    );
    y.push({
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
  const v = [];
  (e.rags ?? []).forEach((c, M) => {
    const V = t[c.id] ?? vt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + M,
      w
    );
    y.push({
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
    }), (c.contentSources ?? []).forEach((Y, Q) => {
      const ae = `ragcs:${c.id}:${Y.uri}`, ye = t[ae] ?? { x: V.x + 170, y: V.y - 30 + Q * 44 };
      y.push({
        id: ae,
        label: Y.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ye.x,
        y: ye.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Y.type,
        tooltip: `${Y.type}: ${Y.uri}`
      }), v.push({
        id: `ragcse:${c.id}:${Y.uri}`,
        sourceId: ae,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), y.sort((c, M) => (c.parentId ? 1 : 0) - (M.parentId ? 1 : 0));
  const x = e.relations.map((c) => ({
    id: jn(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Bn[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), I = e.flows.map((c) => {
    var ye, mt, qe, ft, Qe, j;
    const M = Xn(e, c), V = d ? e.modules.find((ee) => ee.id === c.sourceId) : void 0, Y = ((ye = V == null ? void 0 : V.domainEvents) == null ? void 0 : ye.find((ee) => ee.name === c.triggerEvent)) ?? ((mt = V == null ? void 0 : V.applicationEvents) == null ? void 0 : mt.find((ee) => ee.name === c.triggerEvent)), Q = d && c.readModelName ? (ft = (qe = e.modules.find((ee) => ee.id === c.targetId)) == null ? void 0 : qe.readModels) == null ? void 0 : ft.find((ee) => ee.name === c.readModelName) : void 0, ae = d && c.targetUseCaseId ? (j = (Qe = e.modules.find((ee) => ee.id === c.targetId)) == null ? void 0 : Qe.useCases) == null ? void 0 : j.find((ee) => ee.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (Y == null ? void 0 : Y.id) ?? c.sourceId,
      targetId: (ae == null ? void 0 : ae.id) ?? (Q == null ? void 0 : Q.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: Wn[M],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${M}`
    };
  }), C = new Map((e.apis ?? []).map((c) => [c.id, c])), P = new Set(e.modules.map((c) => c.id)), z = (e.apiImplementations ?? []).filter(
    (c) => C.has(c.apiId) && P.has(c.moduleId)
  ), g = new Set(y.map((c) => c.id)), k = d ? (e.emissions ?? []).filter((c) => g.has(c.sourceId) && g.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], S = d ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: M }) => M && c.readModelId).filter(({ p: c, source: M }) => g.has(M) && g.has(c.readModelId)).map(({ p: c, source: M }) => ({
    id: `proj:${c.id}`,
    sourceId: M,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], E = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((M) => {
      const V = d && M.targetUseCaseId && g.has(M.targetUseCaseId) ? M.targetUseCaseId : M.targetModuleId && g.has(M.targetModuleId) ? M.targetModuleId : (M.targetUseCaseId && !d, null);
      if (!V) return [];
      const Y = d && g.has(M.id) ? M.id : c.id;
      return g.has(Y) ? [
        {
          id: `apiwire:${M.id}`,
          sourceId: Y,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${M.name} la implementa ${V}`
        }
      ] : [];
    })
  ), U = d ? (e.useCaseCalls ?? []).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], N = d ? (e.aggregateCalls ?? []).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], O = d ? (e.queryCalls ?? []).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], L = d ? (e.actorUses ?? []).filter((c) => g.has(c.actorId) && g.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], p = (e.actorExternalDependencies ?? []).filter((c) => g.has(c.actorId) && g.has(c.externalSystemId)).map((c) => ({
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
  ]), b = (c) => g.has(c) ? c : _.get(c) ?? c, $ = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: b(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => g.has(c.sourceId) && g.has(c.targetId) && c.sourceId !== c.targetId
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
    for (const M of c.useCases ?? []) T.set(M.id, c.id);
    for (const M of c.domainEvents ?? []) T.set(M.id, c.id);
    for (const M of c.applicationEvents ?? []) T.set(M.id, c.id);
  }
  const F = (c) => g.has(c) ? c : T.get(c) ?? c, R = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const M of c.domainEvents ?? []) R.set(M.name, M.id);
    for (const M of c.applicationEvents ?? []) R.set(M.name, M.id);
  }
  const q = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((M) => M.targetUseCaseId).map((M) => ({ sourceId: c.id, targetId: F(M.targetUseCaseId) }))
      ).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
      (e.workflows ?? []).filter((c) => c.triggerEvent && R.has(c.triggerEvent)).map((c) => ({
        sourceId: F(R.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
    for (const M of c.tables ?? []) Z.set(M.id, c.id);
  const J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((M) => ({
          sourceId: g.has(M) ? M : Z.get(M) ?? M,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
        (c) => (c.sourceApiIds ?? []).map((M) => ({
          sourceId: b(M),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
  ], ve = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((M) => ({ sourceId: M, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((M) => ({ sourceId: M, targetId: c.id, name: c.name }))
      ]).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: b(c.apiId) })).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => [
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
  ], we = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, ht = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((M) => M.id !== c.id && we(M) === c.triggerEvent).filter((M) => g.has(M.id) && g.has(c.id)).map((M) => ({
      id: `wfchain:${M.id}->${c.id}`,
      sourceId: M.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), _n = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: b(c.id), targetId: b(c.targetApiId) })).filter(
        (c) => g.has(c.sourceId) && g.has(c.targetId) && c.sourceId !== c.targetId
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
  ], kn = z.flatMap((c) => {
    const M = Be(c.apiId, c.moduleId);
    if (!g.has(M)) return [];
    const V = [];
    for (const Y of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === c.apiId)) {
      const Q = b(Y.id);
      g.has(Q) && Q !== M && V.push({
        id: `pxr:${Q}->${M}`,
        sourceId: Q,
        targetId: M,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return V;
  }), $n = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const M = (e.proxyApis ?? []).find((Q) => Q.id === c.proxyId);
    if (!(M != null && M.targetApiId)) return [];
    const V = He(c.operationId, c.proxyId), Y = c.targetSiteId === M.targetApiId ? M.targetApiId : Be(M.targetApiId, c.targetSiteId);
    return !g.has(V) || !g.has(Y) ? [] : [{
      id: `oproute:${V}->${Y}`,
      sourceId: V,
      targetId: Y,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), En = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!g.has(c.externalSystemId)) return null;
        const M = (e.apis ?? []).find(
          (ae) => ae.operations.some((ye) => ye.id === c.operationId)
        );
        if (!M) return null;
        const V = c.siteId === M.id, Y = V ? c.operationId : He(c.operationId, c.siteId);
        let Q = g.has(Y) ? Y : null;
        if (!Q)
          if (V || (e.proxyApis ?? []).some((ae) => ae.id === c.siteId))
            Q = b(c.siteId);
          else {
            const ae = Be(M.id, c.siteId);
            Q = g.has(ae) ? ae : c.siteId;
          }
        return !Q || !g.has(Q) || Q === c.externalSystemId ? null : { u: c, target: Q };
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
  ], Sn = d ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!g.has(c.useCaseId)) return [];
    const M = g.has(He(c.operationId, c.moduleId)) ? He(c.operationId, c.moduleId) : g.has(Be(c.apiId, c.moduleId)) ? Be(c.apiId, c.moduleId) : g.has(b(c.moduleId)) ? b(c.moduleId) : null;
    return M ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: M,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], An = d ? (e.agentUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Cn = (e.agentRags ?? []).filter((c) => g.has(c.agentId) && g.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Mn = d ? (e.rags ?? []).filter((c) => g.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((M) => g.has(M)).map((M) => ({
      id: `ragsrc:${c.id}->${M}`,
      sourceId: c.id,
      targetId: M,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], Pn = d ? (e.agentExternalUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Nn = d ? (e.agentMcpUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], On = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((M) => g.has(c.id) && g.has(M)).map((M) => ({
      id: `gwx:${c.id}->${M}`,
      sourceId: c.id,
      targetId: M,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Tn = (e.agentGatewayUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Rn = d ? (e.agentApiOpUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Dn = d ? (e.agentQueryUses ?? []).filter((c) => g.has(c.agentId) && g.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ln = (e.agentDelegations ?? []).filter((c) => g.has(c.agentId) && g.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Un = (e.actorAgentUses ?? []).filter((c) => g.has(c.actorId) && g.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), zn = d ? (e.agentTriggers ?? []).filter((c) => g.has(c.eventId) && g.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], qn = d ? (e.externalCalls ?? []).filter((c) => g.has(c.externalSystemId) && g.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Fn = d ? (e.externalUseCaseCalls ?? []).filter((c) => g.has(c.sourceId) && g.has(c.targetId)).map((c) => ({
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
      ...x,
      ...I,
      ...k,
      ...S,
      ...E,
      ...U,
      ...N,
      ...O,
      ...L,
      ...p,
      ...$,
      ..._n,
      ...kn,
      ...$n,
      ...En,
      ...Sn,
      ...q,
      ...K,
      ...ht,
      ...ue,
      ...J,
      ...pe,
      ...ve,
      ...An,
      ...Pn,
      ...Nn,
      ...On,
      ...Tn,
      ...Rn,
      ...Dn,
      ...Ln,
      ...Un,
      ...zn,
      ...Cn,
      ...Mn,
      ...v,
      ...qn,
      ...Fn
    ]
  };
}
const Jn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, eo = 176, to = 60, io = 140, so = 40;
function no(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, r) => {
    const d = 220 + r * 340;
    i.filter((a) => a.moduleId === n.id).forEach((a, l) => {
      const u = s.filter((f) => f.aggregateId === a.id).length, m = 140 + l * (170 + u * 60);
      t[a.id] = { x: d, y: m }, s.filter((f) => f.aggregateId === a.id).forEach((f, h) => {
        t[f.id] = { x: d + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((r) => r.id === n.moduleId)).forEach((n, r) => {
    t[n.id] = { x: 220 + r * 340, y: 640 };
  }), t;
}
function oo(e, t) {
  const i = no(e), s = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((l) => [l.id, l])), r = (e.aggregates ?? []).map((l) => {
    const u = n.get(l.moduleId), m = (u == null ? void 0 : u.subdomainType) ?? "GENERIC", f = s(l.id);
    return {
      id: l.id,
      label: l.name,
      x: f.x,
      y: f.y,
      w: eo,
      h: to,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Jn[m],
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
      w: io,
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
const ao = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, ro = 150, lo = 44, co = 190, po = 56, uo = 160, ho = 48;
function mo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function fo(e, t) {
  const i = e.flows, s = [], n = [], r = /* @__PURE__ */ new Set(), d = (o) => {
    var a, l;
    return ((l = (a = e.aggregates) == null ? void 0 : a.find((u) => u.id === o)) == null ? void 0 : l.name) ?? o ?? "?";
  };
  return i.forEach((o, a) => {
    const l = 120 + a * 130, u = ao[o.archetype] ?? "#475569", m = o.triggerAggregateId ?? o.sourceId;
    if (!r.has(m)) {
      r.add(m);
      const v = t[m] ?? { x: 160, y: l };
      s.push({
        id: m,
        label: o.triggerAggregateId ? d(o.triggerAggregateId) : m,
        x: v.x,
        y: v.y,
        w: ro,
        h: lo,
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
      w: co,
      h: po,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: u,
      badge: o.archetype,
      tooltip: `Flow ${o.name} [${o.archetype}]${o.readModelName ? ` → read model ${o.readModelName}` : ""}${o.targetUseCaseId ? ` → use case ${o.targetUseCaseId}` : ""}`
    });
    const y = mo(e, o), w = `tgt:${y.id}`;
    if (!r.has(w)) {
      r.add(w);
      const v = t[w] ?? { x: 790, y: l };
      s.push({
        id: w,
        label: y.label,
        x: v.x,
        y: v.y,
        w: uo,
        h: ho,
        kind: y.external ? "external-system" : "module",
        symbol: "component",
        fill: y.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: y.external,
        badge: y.external ? "EXTERNAL" : "MODULE"
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
      targetId: w,
      kind: "flow-delivery",
      color: u,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const go = 190, yo = 56, vi = 170, vo = 52;
function ts(e, t) {
  const i = [], s = [], n = (r) => {
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
      w: go,
      h: yo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${r.sla ? ` · SLA ${r.sla}` : ""}`,
      tooltip: `${r.name}${n(r.ownerModuleId) ? ` — módulo ${n(r.ownerModuleId)}` : ""}${r.triggerEvent ? ` · arranca con ${r.triggerEvent}` : ""}`
    });
    let l = r.id;
    if (r.steps.forEach((u, m) => {
      const f = u.type === "HUMAN", h = t[u.id] ?? { x: 150 + (m + 1) * 240, y: o };
      if (i.push({
        id: u.id,
        label: u.name,
        x: h.x,
        y: h.y,
        w: vi,
        h: vo,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${u.roleId ? ` · ${u.roleId}` : ""}${u.deadline ? ` · ⏱ ${u.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${u.name}${u.useCaseId ? ` — use case ${u.useCaseId}` : ""}${u.deadline ? ` · deadline ${u.deadline}` : ""}`
      }), s.push({
        id: `pe:${r.id}:${m}`,
        sourceId: l,
        targetId: u.id,
        kind: "process-seq",
        label: m === 0 ? r.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), u.compensationUseCaseId) {
        const y = `comp:${u.id}`, w = t[y] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: y,
          label: u.compensationUseCaseId,
          x: w.x,
          y: w.y,
          w: vi,
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
        w: vi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${r.id}`,
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
const Kt = globalThis, qi = Kt.ShadowRoot && (Kt.ShadyCSS === void 0 || Kt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fi = Symbol(), is = /* @__PURE__ */ new WeakMap();
let Ws = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Fi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (qi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = is.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && is.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wo = (e) => new Ws(typeof e == "string" ? e : e + "", void 0, Fi), lt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, r) => s + ((d) => {
    if (d._$cssResult$ === !0) return d.cssText;
    if (typeof d == "number") return d;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + d + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[r + 1], e[0]);
  return new Ws(i, e, Fi);
}, xo = (e, t) => {
  if (qi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = Kt.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, ss = qi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return wo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Io, defineProperty: bo, getOwnPropertyDescriptor: _o, getOwnPropertyNames: ko, getOwnPropertySymbols: $o, getPrototypeOf: Eo } = Object, Le = globalThis, ns = Le.trustedTypes, So = ns ? ns.emptyScript : "", wi = Le.reactiveElementPolyfillSupport, Et = (e, t) => e, ti = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? So : null;
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
} }, Vi = (e, t) => !Io(e, t), os = { attribute: !0, type: String, converter: ti, reflect: !1, useDefault: !1, hasChanged: Vi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Le.litPropertyMetadata ?? (Le.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = os) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && bo(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: r } = _o(this.prototype, t) ?? { get() {
      return this[i];
    }, set(d) {
      this[i] = d;
    } };
    return { get: n, set(d) {
      const o = n == null ? void 0 : n.call(this);
      r == null || r.call(this, d), this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? os;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Et("elementProperties"))) return;
    const t = Eo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Et("properties"))) {
      const i = this.properties, s = [...ko(i), ...$o(i)];
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
      for (const n of s) i.unshift(ss(n));
    } else t !== void 0 && i.push(ss(t));
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
    return xo(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const d = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : ti).toAttribute(i, s.type);
      this._$Em = t, d == null ? this.removeAttribute(n) : this.setAttribute(n, d), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var r, d;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : ti;
      this._$Em = n;
      const l = a.fromAttribute(i, o.type);
      this[n] = l ?? ((d = this._$Ej) == null ? void 0 : d.get(n)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, r) {
    var d;
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? Vi)(r, i) || s.useDefault && s.reflect && r === ((d = this._$Ej) == null ? void 0 : d.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: r }, d) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, d ?? i ?? this[t]), r !== !0 || d !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [r, d] of this._$Ep) this[r] = d;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, d] of n) {
        const { wrapped: o } = d, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, d, a);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var r;
        return (r = n.hostUpdate) == null ? void 0 : r.call(n);
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[Et("elementProperties")] = /* @__PURE__ */ new Map(), it[Et("finalized")] = /* @__PURE__ */ new Map(), wi == null || wi({ ReactiveElement: it }), (Le.reactiveElementVersions ?? (Le.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, as = (e) => e, ii = St.trustedTypes, rs = ii ? ii.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Gs = "$lit$", De = `lit$${Math.random().toFixed(9).slice(2)}$`, Ys = "?" + De, Ao = `<${Ys}>`, Xe = document, Mt = () => Xe.createComment(""), Pt = (e) => e === null || typeof e != "object" && typeof e != "function", Hi = Array.isArray, Co = (e) => Hi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", xi = `[ 	
\f\r]`, wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ds = /-->/g, ls = />/g, Fe = RegExp(`>|${xi}(?:([^\\s"'>=/]+)(${xi}*=${xi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cs = /'/g, ps = /"/g, js = /^(?:script|style|textarea|title)$/i, Xs = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = Xs(1), G = Xs(2), ot = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), us = /* @__PURE__ */ new WeakMap(), We = Xe.createTreeWalker(Xe, 129);
function Ks(e, t) {
  if (!Hi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rs !== void 0 ? rs.createHTML(t) : t;
}
const Mo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", d = wt;
  for (let o = 0; o < i; o++) {
    const a = e[o];
    let l, u, m = -1, f = 0;
    for (; f < a.length && (d.lastIndex = f, u = d.exec(a), u !== null); ) f = d.lastIndex, d === wt ? u[1] === "!--" ? d = ds : u[1] !== void 0 ? d = ls : u[2] !== void 0 ? (js.test(u[2]) && (n = RegExp("</" + u[2], "g")), d = Fe) : u[3] !== void 0 && (d = Fe) : d === Fe ? u[0] === ">" ? (d = n ?? wt, m = -1) : u[1] === void 0 ? m = -2 : (m = d.lastIndex - u[2].length, l = u[1], d = u[3] === void 0 ? Fe : u[3] === '"' ? ps : cs) : d === ps || d === cs ? d = Fe : d === ds || d === ls ? d = wt : (d = Fe, n = void 0);
    const h = d === Fe && e[o + 1].startsWith("/>") ? " " : "";
    r += d === wt ? a + Ao : m >= 0 ? (s.push(l), a.slice(0, m) + Gs + a.slice(m) + De + h) : a + De + (m === -2 ? o : h);
  }
  return [Ks(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Nt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, d = 0;
    const o = t.length - 1, a = this.parts, [l, u] = Mo(t, i);
    if (this.el = Nt.createElement(l, s), We.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = We.nextNode()) !== null && a.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith(Gs)) {
          const f = u[d++], h = n.getAttribute(m).split(De), y = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: y[2], strings: h, ctor: y[1] === "." ? No : y[1] === "?" ? Oo : y[1] === "@" ? To : li }), n.removeAttribute(m);
        } else m.startsWith(De) && (a.push({ type: 6, index: r }), n.removeAttribute(m));
        if (js.test(n.tagName)) {
          const m = n.textContent.split(De), f = m.length - 1;
          if (f > 0) {
            n.textContent = ii ? ii.emptyScript : "";
            for (let h = 0; h < f; h++) n.append(m[h], Mt()), We.nextNode(), a.push({ type: 2, index: ++r });
            n.append(m[f], Mt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ys) a.push({ type: 2, index: r });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(De, m + 1)) !== -1; ) a.push({ type: 7, index: r }), m += De.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = Xe.createElement("template");
    return s.innerHTML = t, s;
  }
}
function at(e, t, i = e, s) {
  var d, o;
  if (t === ot) return t;
  let n = s !== void 0 ? (d = i._$Co) == null ? void 0 : d[s] : i._$Cl;
  const r = Pt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== r && ((o = n == null ? void 0 : n._$AO) == null || o.call(n, !1), r === void 0 ? n = void 0 : (n = new r(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = at(e, n._$AS(e, t.values), n, s)), t;
}
class Po {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Xe).importNode(i, !0);
    We.currentNode = n;
    let r = We.nextNode(), d = 0, o = 0, a = s[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let l;
        a.type === 2 ? l = new Lt(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new Ro(r, this, t)), this._$AV.push(l), a = s[++o];
      }
      d !== (a == null ? void 0 : a.index) && (r = We.nextNode(), d++);
    }
    return We.currentNode = Xe, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Lt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = at(this, t, i), Pt(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Co(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && Pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Xe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Nt.createElement(Ks(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === n) this._$AH.p(i);
    else {
      const d = new Po(n, this), o = d.u(this.options);
      d.p(i), this.T(o), this._$AH = d;
    }
  }
  _$AC(t) {
    let i = us.get(t.strings);
    return i === void 0 && us.set(t.strings, i = new Nt(t)), i;
  }
  k(t) {
    Hi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of t) n === i.length ? i.push(s = new Lt(this.O(Mt()), this.O(Mt()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = as(t).nextSibling;
      as(t).remove(), t = n;
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
  constructor(t, i, s, n, r) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = se;
  }
  _$AI(t, i = this, s, n) {
    const r = this.strings;
    let d = !1;
    if (r === void 0) t = at(this, t, i, 0), d = !Pt(t) || t !== this._$AH && t !== ot, d && (this._$AH = t);
    else {
      const o = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = at(this, o[s + a], i, a), l === ot && (l = this._$AH[a]), d || (d = !Pt(l) || l !== this._$AH[a]), l === se ? t = se : t !== se && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    d && !n && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class No extends li {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class Oo extends li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class To extends li {
  constructor(t, i, s, n, r) {
    super(t, i, s, n, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = at(this, t, i, 0) ?? se) === ot) return;
    const s = this._$AH, n = t === se && s !== se || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== se && (s === se || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ro {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    at(this, t);
  }
}
const Ii = St.litHtmlPolyfillSupport;
Ii == null || Ii(Nt, Lt), (St.litHtmlVersions ?? (St.litHtmlVersions = [])).push("3.3.3");
const Do = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Lt(t.insertBefore(Mt(), r), r, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = globalThis;
class Se extends it {
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
    return ot;
  }
}
var Ls;
Se._$litElement$ = !0, Se.finalized = !0, (Ls = Ye.litElementHydrateSupport) == null || Ls.call(Ye, { LitElement: Se });
const bi = Ye.litElementPolyfillSupport;
bi == null || bi({ LitElement: Se });
(Ye.litElementVersions ?? (Ye.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lo = { attribute: !0, type: String, converter: ti, reflect: !1, hasChanged: Vi }, Uo = (e = Lo, t, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), s === "accessor") {
    const { name: d } = i;
    return { set(o) {
      const a = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(d, a, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(d, void 0, e, o), o;
    } };
  }
  if (s === "setter") {
    const { name: d } = i;
    return function(o) {
      const a = this[d];
      t.call(this, o), this.requestUpdate(d, a, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function oe(e) {
  return (t, i) => typeof i == "object" ? Uo(e, t, i) : ((s, n, r) => {
    const d = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), d ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(e) {
  return oe({ ...e, state: !0, attribute: !1 });
}
var Ci = "http://www.w3.org/1999/xhtml";
const hs = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ci,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ci(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), hs.hasOwnProperty(t) ? { space: hs[t], local: e } : e;
}
function zo(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ci && t.documentElement.namespaceURI === Ci ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function qo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Qs(e) {
  var t = ci(e);
  return (t.local ? qo : zo)(t);
}
function Fo() {
}
function Bi(e) {
  return e == null ? Fo : function() {
    return this.querySelector(e);
  };
}
function Vo(e) {
  typeof e != "function" && (e = Bi(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], d = r.length, o = s[n] = new Array(d), a, l, u = 0; u < d; ++u)
      (a = r[u]) && (l = e.call(a, a.__data__, u, r)) && ("__data__" in a && (l.__data__ = a.__data__), o[u] = l);
  return new me(s, this._parents);
}
function Ho(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Bo() {
  return [];
}
function Zs(e) {
  return e == null ? Bo : function() {
    return this.querySelectorAll(e);
  };
}
function Wo(e) {
  return function() {
    return Ho(e.apply(this, arguments));
  };
}
function Go(e) {
  typeof e == "function" ? e = Wo(e) : e = Zs(e);
  for (var t = this._groups, i = t.length, s = [], n = [], r = 0; r < i; ++r)
    for (var d = t[r], o = d.length, a, l = 0; l < o; ++l)
      (a = d[l]) && (s.push(e.call(a, a.__data__, l, d)), n.push(a));
  return new me(s, n);
}
function Js(e) {
  return function() {
    return this.matches(e);
  };
}
function en(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Yo = Array.prototype.find;
function jo(e) {
  return function() {
    return Yo.call(this.children, e);
  };
}
function Xo() {
  return this.firstElementChild;
}
function Ko(e) {
  return this.select(e == null ? Xo : jo(typeof e == "function" ? e : en(e)));
}
var Qo = Array.prototype.filter;
function Zo() {
  return Array.from(this.children);
}
function Jo(e) {
  return function() {
    return Qo.call(this.children, e);
  };
}
function ea(e) {
  return this.selectAll(e == null ? Zo : Jo(typeof e == "function" ? e : en(e)));
}
function ta(e) {
  typeof e != "function" && (e = Js(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], d = r.length, o = s[n] = [], a, l = 0; l < d; ++l)
      (a = r[l]) && e.call(a, a.__data__, l, r) && o.push(a);
  return new me(s, this._parents);
}
function tn(e) {
  return new Array(e.length);
}
function ia() {
  return new me(this._enter || this._groups.map(tn), this._parents);
}
function si(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
si.prototype = {
  constructor: si,
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
function na(e, t, i, s, n, r) {
  for (var d = 0, o, a = t.length, l = r.length; d < l; ++d)
    (o = t[d]) ? (o.__data__ = r[d], s[d] = o) : i[d] = new si(e, r[d]);
  for (; d < a; ++d)
    (o = t[d]) && (n[d] = o);
}
function oa(e, t, i, s, n, r, d) {
  var o, a, l = /* @__PURE__ */ new Map(), u = t.length, m = r.length, f = new Array(u), h;
  for (o = 0; o < u; ++o)
    (a = t[o]) && (f[o] = h = d.call(a, a.__data__, o, t) + "", l.has(h) ? n[o] = a : l.set(h, a));
  for (o = 0; o < m; ++o)
    h = d.call(e, r[o], o, r) + "", (a = l.get(h)) ? (s[o] = a, a.__data__ = r[o], l.delete(h)) : i[o] = new si(e, r[o]);
  for (o = 0; o < u; ++o)
    (a = t[o]) && l.get(f[o]) === a && (n[o] = a);
}
function aa(e) {
  return e.__data__;
}
function ra(e, t) {
  if (!arguments.length) return Array.from(this, aa);
  var i = t ? oa : na, s = this._parents, n = this._groups;
  typeof e != "function" && (e = sa(e));
  for (var r = n.length, d = new Array(r), o = new Array(r), a = new Array(r), l = 0; l < r; ++l) {
    var u = s[l], m = n[l], f = m.length, h = da(e.call(u, u && u.__data__, l, s)), y = h.length, w = o[l] = new Array(y), v = d[l] = new Array(y), x = a[l] = new Array(f);
    i(u, m, w, v, x, h, t);
    for (var I = 0, C = 0, P, z; I < y; ++I)
      if (P = w[I]) {
        for (I >= C && (C = I + 1); !(z = v[C]) && ++C < y; ) ;
        P._next = z || null;
      }
  }
  return d = new me(d, s), d._enter = o, d._exit = a, d;
}
function da(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function la() {
  return new me(this._exit || this._groups.map(tn), this._parents);
}
function ca(e, t, i) {
  var s = this.enter(), n = this, r = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? r.remove() : i(r), s && n ? s.merge(n).order() : n;
}
function pa(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, r = s.length, d = Math.min(n, r), o = new Array(n), a = 0; a < d; ++a)
    for (var l = i[a], u = s[a], m = l.length, f = o[a] = new Array(m), h, y = 0; y < m; ++y)
      (h = l[y] || u[y]) && (f[y] = h);
  for (; a < n; ++a)
    o[a] = i[a];
  return new me(o, this._parents);
}
function ua() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, r = s[n], d; --n >= 0; )
      (d = s[n]) && (r && d.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(d, r), r = d);
  return this;
}
function ha(e) {
  e || (e = ma);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), r = 0; r < s; ++r) {
    for (var d = i[r], o = d.length, a = n[r] = new Array(o), l, u = 0; u < o; ++u)
      (l = d[u]) && (a[u] = l);
    a.sort(t);
  }
  return new me(n, this._parents).order();
}
function ma(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function fa() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function ga() {
  return Array.from(this);
}
function ya() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, r = s.length; n < r; ++n) {
      var d = s[n];
      if (d) return d;
    }
  return null;
}
function va() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function wa() {
  return !this.node();
}
function xa(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], r = 0, d = n.length, o; r < d; ++r)
      (o = n[r]) && e.call(o, o.__data__, r, n);
  return this;
}
function Ia(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ba(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function _a(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ka(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function $a(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ea(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Sa(e, t) {
  var i = ci(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ba : Ia : typeof t == "function" ? i.local ? Ea : $a : i.local ? ka : _a)(i, t));
}
function sn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Aa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ca(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Ma(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function Pa(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Aa : typeof t == "function" ? Ma : Ca)(e, t, i ?? "")) : rt(this.node(), e);
}
function rt(e, t) {
  return e.style.getPropertyValue(t) || sn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Na(e) {
  return function() {
    delete this[e];
  };
}
function Oa(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ta(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Ra(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Na : typeof t == "function" ? Ta : Oa)(e, t)) : this.node()[e];
}
function nn(e) {
  return e.trim().split(/^|\s+/);
}
function Wi(e) {
  return e.classList || new on(e);
}
function on(e) {
  this._node = e, this._names = nn(e.getAttribute("class") || "");
}
on.prototype = {
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
function an(e, t) {
  for (var i = Wi(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function rn(e, t) {
  for (var i = Wi(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function Da(e) {
  return function() {
    an(this, e);
  };
}
function La(e) {
  return function() {
    rn(this, e);
  };
}
function Ua(e, t) {
  return function() {
    (t.apply(this, arguments) ? an : rn)(this, e);
  };
}
function za(e, t) {
  var i = nn(e + "");
  if (arguments.length < 2) {
    for (var s = Wi(this.node()), n = -1, r = i.length; ++n < r; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ua : t ? Da : La)(i, t));
}
function qa() {
  this.textContent = "";
}
function Fa(e) {
  return function() {
    this.textContent = e;
  };
}
function Va(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ha(e) {
  return arguments.length ? this.each(e == null ? qa : (typeof e == "function" ? Va : Fa)(e)) : this.node().textContent;
}
function Ba() {
  this.innerHTML = "";
}
function Wa(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Ga(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ya(e) {
  return arguments.length ? this.each(e == null ? Ba : (typeof e == "function" ? Ga : Wa)(e)) : this.node().innerHTML;
}
function ja() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Xa() {
  return this.each(ja);
}
function Ka() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Qa() {
  return this.each(Ka);
}
function Za(e) {
  var t = typeof e == "function" ? e : Qs(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Ja() {
  return null;
}
function er(e, t) {
  var i = typeof e == "function" ? e : Qs(e), s = t == null ? Ja : typeof t == "function" ? t : Bi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function tr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ir() {
  return this.each(tr);
}
function sr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function nr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function or(e) {
  return this.select(e ? nr : sr);
}
function ar(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function rr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function dr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function lr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, r; i < n; ++i)
        r = t[i], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++s] = r;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function cr(e, t, i) {
  return function() {
    var s = this.__on, n, r = rr(t);
    if (s) {
      for (var d = 0, o = s.length; d < o; ++d)
        if ((n = s[d]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = r, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, i), n = { type: e.type, name: e.name, value: t, listener: r, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function pr(e, t, i) {
  var s = dr(e + ""), n, r = s.length, d;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var a = 0, l = o.length, u; a < l; ++a)
        for (n = 0, u = o[a]; n < r; ++n)
          if ((d = s[n]).type === u.type && d.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = t ? cr : lr, n = 0; n < r; ++n) this.each(o(s[n], t, i));
  return this;
}
function dn(e, t, i) {
  var s = sn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function ur(e, t) {
  return function() {
    return dn(this, e, t);
  };
}
function hr(e, t) {
  return function() {
    return dn(this, e, t.apply(this, arguments));
  };
}
function mr(e, t) {
  return this.each((typeof t == "function" ? hr : ur)(e, t));
}
function* fr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, r = s.length, d; n < r; ++n)
      (d = s[n]) && (yield d);
}
var ln = [null];
function me(e, t) {
  this._groups = e, this._parents = t;
}
function Ut() {
  return new me([[document.documentElement]], ln);
}
function gr() {
  return this;
}
me.prototype = Ut.prototype = {
  constructor: me,
  select: Vo,
  selectAll: Go,
  selectChild: Ko,
  selectChildren: ea,
  filter: ta,
  data: ra,
  enter: ia,
  exit: la,
  join: ca,
  merge: pa,
  selection: gr,
  order: ua,
  sort: ha,
  call: fa,
  nodes: ga,
  node: ya,
  size: va,
  empty: wa,
  each: xa,
  attr: Sa,
  style: Pa,
  property: Ra,
  classed: za,
  text: Ha,
  html: Ya,
  raise: Xa,
  lower: Qa,
  append: Za,
  insert: er,
  remove: ir,
  clone: or,
  datum: ar,
  on: pr,
  dispatch: mr,
  [Symbol.iterator]: fr
};
function _e(e) {
  return typeof e == "string" ? new me([[document.querySelector(e)]], [document.documentElement]) : new me([[e]], ln);
}
function yr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ve(e, t) {
  if (e = yr(e), t === void 0 && (t = e.currentTarget), t) {
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
var vr = { value: () => {
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
    var i = this._, s = wr(e + "", i), n, r = -1, d = s.length;
    if (arguments.length < 2) {
      for (; ++r < d; ) if ((n = (e = s[r]).type) && (n = xr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < d; )
      if (n = (e = s[r]).type) i[n] = ms(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = ms(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Qt(e);
  },
  call: function(e, t) {
    if ((n = arguments.length - 2) > 0) for (var i = new Array(n), s = 0, n, r; s < n; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], s = 0, n = r.length; s < n; ++s) r[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], n = 0, r = s.length; n < r; ++n) s[n].value.apply(t, i);
  }
};
function xr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function ms(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = vr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Mi = { capture: !0, passive: !1 };
function Pi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ir(e) {
  var t = e.document.documentElement, i = _e(e).on("dragstart.drag", Pi, Mi);
  "onselectstart" in t ? i.on("selectstart.drag", Pi, Mi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function br(e, t) {
  var i = e.document.documentElement, s = _e(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Pi, Mi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Yi(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function cn(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function zt() {
}
var Ot = 0.7, ni = 1 / Ot, nt = "\\s*([+-]?\\d+)\\s*", Tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ae = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _r = /^#([0-9a-f]{3,8})$/, kr = new RegExp(`^rgb\\(${nt},${nt},${nt}\\)$`), $r = new RegExp(`^rgb\\(${Ae},${Ae},${Ae}\\)$`), Er = new RegExp(`^rgba\\(${nt},${nt},${nt},${Tt}\\)$`), Sr = new RegExp(`^rgba\\(${Ae},${Ae},${Ae},${Tt}\\)$`), Ar = new RegExp(`^hsl\\(${Tt},${Ae},${Ae}\\)$`), Cr = new RegExp(`^hsla\\(${Tt},${Ae},${Ae},${Tt}\\)$`), fs = {
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
Yi(zt, Rt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: gs,
  // Deprecated! Use color.formatHex.
  formatHex: gs,
  formatHex8: Mr,
  formatHsl: Pr,
  formatRgb: ys,
  toString: ys
});
function gs() {
  return this.rgb().formatHex();
}
function Mr() {
  return this.rgb().formatHex8();
}
function Pr() {
  return pn(this).formatHsl();
}
function ys() {
  return this.rgb().formatRgb();
}
function Rt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = _r.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? vs(t) : i === 3 ? new ce(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Ht(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Ht(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = kr.exec(e)) ? new ce(t[1], t[2], t[3], 1) : (t = $r.exec(e)) ? new ce(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Er.exec(e)) ? Ht(t[1], t[2], t[3], t[4]) : (t = Sr.exec(e)) ? Ht(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Ar.exec(e)) ? Is(t[1], t[2] / 100, t[3] / 100, 1) : (t = Cr.exec(e)) ? Is(t[1], t[2] / 100, t[3] / 100, t[4]) : fs.hasOwnProperty(e) ? vs(fs[e]) : e === "transparent" ? new ce(NaN, NaN, NaN, 0) : null;
}
function vs(e) {
  return new ce(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ht(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new ce(e, t, i, s);
}
function Nr(e) {
  return e instanceof zt || (e = Rt(e)), e ? (e = e.rgb(), new ce(e.r, e.g, e.b, e.opacity)) : new ce();
}
function Ni(e, t, i, s) {
  return arguments.length === 1 ? Nr(e) : new ce(e, t, i, s ?? 1);
}
function ce(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Yi(ce, Ni, cn(zt, {
  brighter(e) {
    return e = e == null ? ni : Math.pow(ni, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ot : Math.pow(Ot, e), new ce(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ce(je(this.r), je(this.g), je(this.b), oi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ws,
  // Deprecated! Use color.formatHex.
  formatHex: ws,
  formatHex8: Or,
  formatRgb: xs,
  toString: xs
}));
function ws() {
  return `#${Ge(this.r)}${Ge(this.g)}${Ge(this.b)}`;
}
function Or() {
  return `#${Ge(this.r)}${Ge(this.g)}${Ge(this.b)}${Ge((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function xs() {
  const e = oi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${je(this.r)}, ${je(this.g)}, ${je(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function oi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function je(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ge(e) {
  return e = je(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Is(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ke(e, t, i, s);
}
function pn(e) {
  if (e instanceof ke) return new ke(e.h, e.s, e.l, e.opacity);
  if (e instanceof zt || (e = Rt(e)), !e) return new ke();
  if (e instanceof ke) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), r = Math.max(t, i, s), d = NaN, o = r - n, a = (r + n) / 2;
  return o ? (t === r ? d = (i - s) / o + (i < s) * 6 : i === r ? d = (s - t) / o + 2 : d = (t - i) / o + 4, o /= a < 0.5 ? r + n : 2 - r - n, d *= 60) : o = a > 0 && a < 1 ? 0 : d, new ke(d, o, a, e.opacity);
}
function Tr(e, t, i, s) {
  return arguments.length === 1 ? pn(e) : new ke(e, t, i, s ?? 1);
}
function ke(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Yi(ke, Tr, cn(zt, {
  brighter(e) {
    return e = e == null ? ni : Math.pow(ni, e), new ke(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ot : Math.pow(Ot, e), new ke(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new ce(
      _i(e >= 240 ? e - 240 : e + 120, n, s),
      _i(e, n, s),
      _i(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new ke(bs(this.h), Bt(this.s), Bt(this.l), oi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = oi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${bs(this.h)}, ${Bt(this.s) * 100}%, ${Bt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function bs(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Bt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function _i(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const un = (e) => () => e;
function Rr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Dr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Lr(e) {
  return (e = +e) == 1 ? hn : function(t, i) {
    return i - t ? Dr(t, i, e) : un(isNaN(t) ? i : t);
  };
}
function hn(e, t) {
  var i = t - e;
  return i ? Rr(e, i) : un(isNaN(e) ? t : e);
}
const _s = (function e(t) {
  var i = Lr(t);
  function s(n, r) {
    var d = i((n = Ni(n)).r, (r = Ni(r)).r), o = i(n.g, r.g), a = i(n.b, r.b), l = hn(n.opacity, r.opacity);
    return function(u) {
      return n.r = d(u), n.g = o(u), n.b = a(u), n.opacity = l(u), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Re(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Oi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ki = new RegExp(Oi.source, "g");
function Ur(e) {
  return function() {
    return e;
  };
}
function zr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function qr(e, t) {
  var i = Oi.lastIndex = ki.lastIndex = 0, s, n, r, d = -1, o = [], a = [];
  for (e = e + "", t = t + ""; (s = Oi.exec(e)) && (n = ki.exec(t)); )
    (r = n.index) > i && (r = t.slice(i, r), o[d] ? o[d] += r : o[++d] = r), (s = s[0]) === (n = n[0]) ? o[d] ? o[d] += n : o[++d] = n : (o[++d] = null, a.push({ i: d, x: Re(s, n) })), i = ki.lastIndex;
  return i < t.length && (r = t.slice(i), o[d] ? o[d] += r : o[++d] = r), o.length < 2 ? a[0] ? zr(a[0].x) : Ur(t) : (t = a.length, function(l) {
    for (var u = 0, m; u < t; ++u) o[(m = a[u]).i] = m.x(l);
    return o.join("");
  });
}
var ks = 180 / Math.PI, Ti = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function mn(e, t, i, s, n, r) {
  var d, o, a;
  return (d = Math.sqrt(e * e + t * t)) && (e /= d, t /= d), (a = e * i + t * s) && (i -= e * a, s -= t * a), (o = Math.sqrt(i * i + s * s)) && (i /= o, s /= o, a /= o), e * s < t * i && (e = -e, t = -t, a = -a, d = -d), {
    translateX: n,
    translateY: r,
    rotate: Math.atan2(t, e) * ks,
    skewX: Math.atan(a) * ks,
    scaleX: d,
    scaleY: o
  };
}
var Wt;
function Fr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ti : mn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Vr(e) {
  return e == null || (Wt || (Wt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Wt.setAttribute("transform", e), !(e = Wt.transform.baseVal.consolidate())) ? Ti : (e = e.matrix, mn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fn(e, t, i, s) {
  function n(l) {
    return l.length ? l.pop() + " " : "";
  }
  function r(l, u, m, f, h, y) {
    if (l !== m || u !== f) {
      var w = h.push("translate(", null, t, null, i);
      y.push({ i: w - 4, x: Re(l, m) }, { i: w - 2, x: Re(u, f) });
    } else (m || f) && h.push("translate(" + m + t + f + i);
  }
  function d(l, u, m, f) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), f.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Re(l, u) })) : u && m.push(n(m) + "rotate(" + u + s);
  }
  function o(l, u, m, f) {
    l !== u ? f.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Re(l, u) }) : u && m.push(n(m) + "skewX(" + u + s);
  }
  function a(l, u, m, f, h, y) {
    if (l !== m || u !== f) {
      var w = h.push(n(h) + "scale(", null, ",", null, ")");
      y.push({ i: w - 4, x: Re(l, m) }, { i: w - 2, x: Re(u, f) });
    } else (m !== 1 || f !== 1) && h.push(n(h) + "scale(" + m + "," + f + ")");
  }
  return function(l, u) {
    var m = [], f = [];
    return l = e(l), u = e(u), r(l.translateX, l.translateY, u.translateX, u.translateY, m, f), d(l.rotate, u.rotate, m, f), o(l.skewX, u.skewX, m, f), a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, m, f), l = u = null, function(h) {
      for (var y = -1, w = f.length, v; ++y < w; ) m[(v = f[y]).i] = v.x(h);
      return m.join("");
    };
  };
}
var Hr = fn(Fr, "px, ", "px)", "deg)"), Br = fn(Vr, ", ", ")", ")"), Wr = 1e-12;
function $s(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Gr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Yr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const jr = (function e(t, i, s) {
  function n(r, d) {
    var o = r[0], a = r[1], l = r[2], u = d[0], m = d[1], f = d[2], h = u - o, y = m - a, w = h * h + y * y, v, x;
    if (w < Wr)
      x = Math.log(f / l) / t, v = function(k) {
        return [
          o + k * h,
          a + k * y,
          l * Math.exp(t * k * x)
        ];
      };
    else {
      var I = Math.sqrt(w), C = (f * f - l * l + s * w) / (2 * l * i * I), P = (f * f - l * l - s * w) / (2 * f * i * I), z = Math.log(Math.sqrt(C * C + 1) - C), g = Math.log(Math.sqrt(P * P + 1) - P);
      x = (g - z) / t, v = function(k) {
        var S = k * x, E = $s(z), U = l / (i * I) * (E * Yr(t * S + z) - Gr(z));
        return [
          o + U * h,
          a + U * y,
          l * E / $s(t * S + z)
        ];
      };
    }
    return v.duration = x * 1e3 * t / Math.SQRT2, v;
  }
  return n.rho = function(r) {
    var d = Math.max(1e-3, +r), o = d * d, a = o * o;
    return e(d, o, a);
  }, n;
})(Math.SQRT2, 2, 4);
var dt = 0, kt = 0, xt = 0, gn = 1e3, ai, $t, ri = 0, Ke = 0, pi = 0, Dt = typeof performance == "object" && performance.now ? performance : Date, yn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ji() {
  return Ke || (yn(Xr), Ke = Dt.now() + pi);
}
function Xr() {
  Ke = 0;
}
function di() {
  this._call = this._time = this._next = null;
}
di.prototype = vn.prototype = {
  constructor: di,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ji() : +i) + (t == null ? 0 : +t), !this._next && $t !== this && ($t ? $t._next = this : ai = this, $t = this), this._call = e, this._time = i, Ri();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ri());
  }
};
function vn(e, t, i) {
  var s = new di();
  return s.restart(e, t, i), s;
}
function Kr() {
  ji(), ++dt;
  for (var e = ai, t; e; )
    (t = Ke - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --dt;
}
function Es() {
  Ke = (ri = Dt.now()) + pi, dt = kt = 0;
  try {
    Kr();
  } finally {
    dt = 0, Zr(), Ke = 0;
  }
}
function Qr() {
  var e = Dt.now(), t = e - ri;
  t > gn && (pi -= t, ri = e);
}
function Zr() {
  for (var e, t = ai, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : ai = i);
  $t = e, Ri(s);
}
function Ri(e) {
  if (!dt) {
    kt && (kt = clearTimeout(kt));
    var t = e - Ke;
    t > 24 ? (e < 1 / 0 && (kt = setTimeout(Es, e - Dt.now() - pi)), xt && (xt = clearInterval(xt))) : (xt || (ri = Dt.now(), xt = setInterval(Qr, gn)), dt = 1, yn(Es));
  }
}
function Ss(e, t, i) {
  var s = new di();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var Jr = Gi("start", "end", "cancel", "interrupt"), ed = [], wn = 0, As = 1, Di = 2, Zt = 3, Cs = 4, Li = 5, Jt = 6;
function ui(e, t, i, s, n, r) {
  var d = e.__transition;
  if (!d) e.__transition = {};
  else if (i in d) return;
  td(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Jr,
    tween: ed,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: wn
  });
}
function Xi(e, t) {
  var i = $e(e, t);
  if (i.state > wn) throw new Error("too late; already scheduled");
  return i;
}
function Ce(e, t) {
  var i = $e(e, t);
  if (i.state > Zt) throw new Error("too late; already running");
  return i;
}
function $e(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function td(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = vn(r, 0, i.time);
  function r(l) {
    i.state = As, i.timer.restart(d, i.delay, i.time), i.delay <= l && d(l - i.delay);
  }
  function d(l) {
    var u, m, f, h;
    if (i.state !== As) return a();
    for (u in s)
      if (h = s[u], h.name === i.name) {
        if (h.state === Zt) return Ss(d);
        h.state === Cs ? (h.state = Jt, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[u]) : +u < t && (h.state = Jt, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[u]);
      }
    if (Ss(function() {
      i.state === Zt && (i.state = Cs, i.timer.restart(o, i.delay, i.time), o(l));
    }), i.state = Di, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Di) {
      for (i.state = Zt, n = new Array(f = i.tween.length), u = 0, m = -1; u < f; ++u)
        (h = i.tween[u].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = h);
      n.length = m + 1;
    }
  }
  function o(l) {
    for (var u = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(a), i.state = Li, 1), m = -1, f = n.length; ++m < f; )
      n[m].call(e, u);
    i.state === Li && (i.on.call("end", e, e.__data__, i.index, i.group), a());
  }
  function a() {
    i.state = Jt, i.timer.stop(), delete s[t];
    for (var l in s) return;
    delete e.__transition;
  }
}
function ei(e, t) {
  var i = e.__transition, s, n, r = !0, d;
  if (i) {
    t = t == null ? null : t + "";
    for (d in i) {
      if ((s = i[d]).name !== t) {
        r = !1;
        continue;
      }
      n = s.state > Di && s.state < Li, s.state = Jt, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[d];
    }
    r && delete e.__transition;
  }
}
function id(e) {
  return this.each(function() {
    ei(this, e);
  });
}
function sd(e, t) {
  var i, s;
  return function() {
    var n = Ce(this, e), r = n.tween;
    if (r !== i) {
      s = i = r;
      for (var d = 0, o = s.length; d < o; ++d)
        if (s[d].name === t) {
          s = s.slice(), s.splice(d, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function nd(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var r = Ce(this, e), d = r.tween;
    if (d !== s) {
      n = (s = d).slice();
      for (var o = { name: t, value: i }, a = 0, l = n.length; a < l; ++a)
        if (n[a].name === t) {
          n[a] = o;
          break;
        }
      a === l && n.push(o);
    }
    r.tween = n;
  };
}
function od(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = $e(this.node(), i).tween, n = 0, r = s.length, d; n < r; ++n)
      if ((d = s[n]).name === e)
        return d.value;
    return null;
  }
  return this.each((t == null ? sd : nd)(i, e, t));
}
function Ki(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Ce(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return $e(n, s).value[t];
  };
}
function xn(e, t) {
  var i;
  return (typeof t == "number" ? Re : t instanceof Rt ? _s : (i = Rt(t)) ? (t = i, _s) : qr)(e, t);
}
function ad(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function rd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function dd(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var d = this.getAttribute(e);
    return d === n ? null : d === s ? r : r = t(s = d, i);
  };
}
function ld(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var d = this.getAttributeNS(e.space, e.local);
    return d === n ? null : d === s ? r : r = t(s = d, i);
  };
}
function cd(e, t, i) {
  var s, n, r;
  return function() {
    var d, o = i(this), a;
    return o == null ? void this.removeAttribute(e) : (d = this.getAttribute(e), a = o + "", d === a ? null : d === s && a === n ? r : (n = a, r = t(s = d, o)));
  };
}
function pd(e, t, i) {
  var s, n, r;
  return function() {
    var d, o = i(this), a;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (d = this.getAttributeNS(e.space, e.local), a = o + "", d === a ? null : d === s && a === n ? r : (n = a, r = t(s = d, o)));
  };
}
function ud(e, t) {
  var i = ci(e), s = i === "transform" ? Br : xn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? pd : cd)(i, s, Ki(this, "attr." + e, t)) : t == null ? (i.local ? rd : ad)(i) : (i.local ? ld : dd)(i, s, t));
}
function hd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function md(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function fd(e, t) {
  var i, s;
  function n() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && md(e, r)), i;
  }
  return n._value = t, n;
}
function gd(e, t) {
  var i, s;
  function n() {
    var r = t.apply(this, arguments);
    return r !== s && (i = (s = r) && hd(e, r)), i;
  }
  return n._value = t, n;
}
function yd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = ci(e);
  return this.tween(i, (s.local ? fd : gd)(s, t));
}
function vd(e, t) {
  return function() {
    Xi(this, e).delay = +t.apply(this, arguments);
  };
}
function wd(e, t) {
  return t = +t, function() {
    Xi(this, e).delay = t;
  };
}
function xd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vd : wd)(t, e)) : $e(this.node(), t).delay;
}
function Id(e, t) {
  return function() {
    Ce(this, e).duration = +t.apply(this, arguments);
  };
}
function bd(e, t) {
  return t = +t, function() {
    Ce(this, e).duration = t;
  };
}
function _d(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Id : bd)(t, e)) : $e(this.node(), t).duration;
}
function kd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ce(this, e).ease = t;
  };
}
function $d(e) {
  var t = this._id;
  return arguments.length ? this.each(kd(t, e)) : $e(this.node(), t).ease;
}
function Ed(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ce(this, e).ease = i;
  };
}
function Sd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Ed(this._id, e));
}
function Ad(e) {
  typeof e != "function" && (e = Js(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var r = t[n], d = r.length, o = s[n] = [], a, l = 0; l < d; ++l)
      (a = r[l]) && e.call(a, a.__data__, l, r) && o.push(a);
  return new Te(s, this._parents, this._name, this._id);
}
function Cd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, r = Math.min(s, n), d = new Array(s), o = 0; o < r; ++o)
    for (var a = t[o], l = i[o], u = a.length, m = d[o] = new Array(u), f, h = 0; h < u; ++h)
      (f = a[h] || l[h]) && (m[h] = f);
  for (; o < s; ++o)
    d[o] = t[o];
  return new Te(d, this._parents, this._name, this._id);
}
function Md(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Pd(e, t, i) {
  var s, n, r = Md(t) ? Xi : Ce;
  return function() {
    var d = r(this, e), o = d.on;
    o !== s && (n = (s = o).copy()).on(t, i), d.on = n;
  };
}
function Nd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? $e(this.node(), i).on.on(e) : this.each(Pd(i, e, t));
}
function Od(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Td() {
  return this.on("end.remove", Od(this._id));
}
function Rd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Bi(e));
  for (var s = this._groups, n = s.length, r = new Array(n), d = 0; d < n; ++d)
    for (var o = s[d], a = o.length, l = r[d] = new Array(a), u, m, f = 0; f < a; ++f)
      (u = o[f]) && (m = e.call(u, u.__data__, f, o)) && ("__data__" in u && (m.__data__ = u.__data__), l[f] = m, ui(l[f], t, i, f, l, $e(u, i)));
  return new Te(r, this._parents, t, i);
}
function Dd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Zs(e));
  for (var s = this._groups, n = s.length, r = [], d = [], o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, u, m = 0; m < l; ++m)
      if (u = a[m]) {
        for (var f = e.call(u, u.__data__, m, a), h, y = $e(u, i), w = 0, v = f.length; w < v; ++w)
          (h = f[w]) && ui(h, t, i, w, f, y);
        r.push(f), d.push(u);
      }
  return new Te(r, d, t, i);
}
var Ld = Ut.prototype.constructor;
function Ud() {
  return new Ld(this._groups, this._parents);
}
function zd(e, t) {
  var i, s, n;
  return function() {
    var r = rt(this, e), d = (this.style.removeProperty(e), rt(this, e));
    return r === d ? null : r === i && d === s ? n : n = t(i = r, s = d);
  };
}
function In(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function qd(e, t, i) {
  var s, n = i + "", r;
  return function() {
    var d = rt(this, e);
    return d === n ? null : d === s ? r : r = t(s = d, i);
  };
}
function Fd(e, t, i) {
  var s, n, r;
  return function() {
    var d = rt(this, e), o = i(this), a = o + "";
    return o == null && (a = o = (this.style.removeProperty(e), rt(this, e))), d === a ? null : d === s && a === n ? r : (n = a, r = t(s = d, o));
  };
}
function Vd(e, t) {
  var i, s, n, r = "style." + t, d = "end." + r, o;
  return function() {
    var a = Ce(this, e), l = a.on, u = a.value[r] == null ? o || (o = In(t)) : void 0;
    (l !== i || n !== u) && (s = (i = l).copy()).on(d, n = u), a.on = s;
  };
}
function Hd(e, t, i) {
  var s = (e += "") == "transform" ? Hr : xn;
  return t == null ? this.styleTween(e, zd(e, s)).on("end.style." + e, In(e)) : typeof t == "function" ? this.styleTween(e, Fd(e, s, Ki(this, "style." + e, t))).each(Vd(this._id, e)) : this.styleTween(e, qd(e, s, t), i).on("end.style." + e, null);
}
function Bd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Wd(e, t, i) {
  var s, n;
  function r() {
    var d = t.apply(this, arguments);
    return d !== n && (s = (n = d) && Bd(e, d, i)), s;
  }
  return r._value = t, r;
}
function Gd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Wd(e, t, i ?? ""));
}
function Yd(e) {
  return function() {
    this.textContent = e;
  };
}
function jd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Xd(e) {
  return this.tween("text", typeof e == "function" ? jd(Ki(this, "text", e)) : Yd(e == null ? "" : e + ""));
}
function Kd(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Qd(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && Kd(n)), t;
  }
  return s._value = e, s;
}
function Zd(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Qd(e));
}
function Jd() {
  for (var e = this._name, t = this._id, i = bn(), s = this._groups, n = s.length, r = 0; r < n; ++r)
    for (var d = s[r], o = d.length, a, l = 0; l < o; ++l)
      if (a = d[l]) {
        var u = $e(a, t);
        ui(a, e, i, l, d, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Te(s, this._parents, e, i);
}
function el() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(r, d) {
    var o = { value: d }, a = { value: function() {
      --n === 0 && r();
    } };
    i.each(function() {
      var l = Ce(this, s), u = l.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(a)), l.on = t;
    }), n === 0 && r();
  });
}
var tl = 0;
function Te(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function bn() {
  return ++tl;
}
var Ne = Ut.prototype;
Te.prototype = {
  constructor: Te,
  select: Rd,
  selectAll: Dd,
  selectChild: Ne.selectChild,
  selectChildren: Ne.selectChildren,
  filter: Ad,
  merge: Cd,
  selection: Ud,
  transition: Jd,
  call: Ne.call,
  nodes: Ne.nodes,
  node: Ne.node,
  size: Ne.size,
  empty: Ne.empty,
  each: Ne.each,
  on: Nd,
  attr: ud,
  attrTween: yd,
  style: Hd,
  styleTween: Gd,
  text: Xd,
  textTween: Zd,
  remove: Td,
  tween: od,
  delay: xd,
  duration: _d,
  ease: $d,
  easeVarying: Sd,
  end: el,
  [Symbol.iterator]: Ne[Symbol.iterator]
};
function il(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var sl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: il
};
function nl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function ol(e) {
  var t, i;
  e instanceof Te ? (t = e._id, e = e._name) : (t = bn(), (i = sl).time = ji(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, r = 0; r < n; ++r)
    for (var d = s[r], o = d.length, a, l = 0; l < o; ++l)
      (a = d[l]) && ui(a, e, t, l, d, i || nl(a, t));
  return new Te(s, this._parents, e, t);
}
Ut.prototype.interrupt = id;
Ut.prototype.transition = ol;
const Gt = (e) => () => e;
function al(e, {
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
function Oe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Oe.prototype = {
  constructor: Oe,
  scale: function(e) {
    return e === 1 ? this : new Oe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Oe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var At = new Oe(1, 0, 0);
Oe.prototype;
function $i(e) {
  e.stopImmediatePropagation();
}
function It(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function rl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function dl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Ms() {
  return this.__zoom || At;
}
function ll(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function cl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function pl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], r = e.invertY(t[0][1]) - i[0][1], d = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    d > r ? (r + d) / 2 : Math.min(0, r) || Math.max(0, d)
  );
}
function ul() {
  var e = rl, t = dl, i = pl, s = ll, n = cl, r = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, a = jr, l = Gi("start", "zoom", "end"), u, m, f, h = 500, y = 150, w = 0, v = 10;
  function x(p) {
    p.property("__zoom", Ms).on("wheel.zoom", S, { passive: !1 }).on("mousedown.zoom", E).on("dblclick.zoom", U).filter(n).on("touchstart.zoom", N).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", L).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(p, _, b, $) {
    var T = p.selection ? p.selection() : p;
    T.property("__zoom", Ms), p !== T ? z(p, _, b, $) : T.interrupt().each(function() {
      g(this, arguments).event($).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, x.scaleBy = function(p, _, b, $) {
    x.scaleTo(p, function() {
      var T = this.__zoom.k, F = typeof _ == "function" ? _.apply(this, arguments) : _;
      return T * F;
    }, b, $);
  }, x.scaleTo = function(p, _, b, $) {
    x.transform(p, function() {
      var T = t.apply(this, arguments), F = this.__zoom, R = b == null ? P(T) : typeof b == "function" ? b.apply(this, arguments) : b, q = F.invert(R), K = typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(C(I(F, K), R, q), T, d);
    }, b, $);
  }, x.translateBy = function(p, _, b, $) {
    x.transform(p, function() {
      return i(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof b == "function" ? b.apply(this, arguments) : b
      ), t.apply(this, arguments), d);
    }, null, $);
  }, x.translateTo = function(p, _, b, $, T) {
    x.transform(p, function() {
      var F = t.apply(this, arguments), R = this.__zoom, q = $ == null ? P(F) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return i(At.translate(q[0], q[1]).scale(R.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof b == "function" ? -b.apply(this, arguments) : -b
      ), F, d);
    }, $, T);
  };
  function I(p, _) {
    return _ = Math.max(r[0], Math.min(r[1], _)), _ === p.k ? p : new Oe(_, p.x, p.y);
  }
  function C(p, _, b) {
    var $ = _[0] - b[0] * p.k, T = _[1] - b[1] * p.k;
    return $ === p.x && T === p.y ? p : new Oe(p.k, $, T);
  }
  function P(p) {
    return [(+p[0][0] + +p[1][0]) / 2, (+p[0][1] + +p[1][1]) / 2];
  }
  function z(p, _, b, $) {
    p.on("start.zoom", function() {
      g(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      g(this, arguments).event($).end();
    }).tween("zoom", function() {
      var T = this, F = arguments, R = g(T, F).event($), q = t.apply(T, F), K = b == null ? P(q) : typeof b == "function" ? b.apply(T, F) : b, Z = Math.max(q[1][0] - q[0][0], q[1][1] - q[0][1]), J = T.__zoom, pe = typeof _ == "function" ? _.apply(T, F) : _, ve = a(J.invert(K).concat(Z / J.k), pe.invert(K).concat(Z / pe.k));
      return function(ue) {
        if (ue === 1) ue = pe;
        else {
          var we = ve(ue), ht = Z / we[2];
          ue = new Oe(ht, K[0] - we[0] * ht, K[1] - we[1] * ht);
        }
        R.zoom(null, ue);
      };
    });
  }
  function g(p, _, b) {
    return !b && p.__zooming || new k(p, _);
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
      var _ = _e(this.that).datum();
      l.call(
        p,
        this.that,
        new al(p, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function S(p, ..._) {
    if (!e.apply(this, arguments)) return;
    var b = g(this, _).event(p), $ = this.__zoom, T = Math.max(r[0], Math.min(r[1], $.k * Math.pow(2, s.apply(this, arguments)))), F = Ve(p);
    if (b.wheel)
      (b.mouse[0][0] !== F[0] || b.mouse[0][1] !== F[1]) && (b.mouse[1] = $.invert(b.mouse[0] = F)), clearTimeout(b.wheel);
    else {
      if ($.k === T) return;
      b.mouse = [F, $.invert(F)], ei(this), b.start();
    }
    It(p), b.wheel = setTimeout(R, y), b.zoom("mouse", i(C(I($, T), b.mouse[0], b.mouse[1]), b.extent, d));
    function R() {
      b.wheel = null, b.end();
    }
  }
  function E(p, ..._) {
    if (f || !e.apply(this, arguments)) return;
    var b = p.currentTarget, $ = g(this, _, !0).event(p), T = _e(p.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", Z, !0), F = Ve(p, b), R = p.clientX, q = p.clientY;
    Ir(p.view), $i(p), $.mouse = [F, this.__zoom.invert(F)], ei(this), $.start();
    function K(J) {
      if (It(J), !$.moved) {
        var pe = J.clientX - R, ve = J.clientY - q;
        $.moved = pe * pe + ve * ve > w;
      }
      $.event(J).zoom("mouse", i(C($.that.__zoom, $.mouse[0] = Ve(J, b), $.mouse[1]), $.extent, d));
    }
    function Z(J) {
      T.on("mousemove.zoom mouseup.zoom", null), br(J.view, $.moved), It(J), $.event(J).end();
    }
  }
  function U(p, ..._) {
    if (e.apply(this, arguments)) {
      var b = this.__zoom, $ = Ve(p.changedTouches ? p.changedTouches[0] : p, this), T = b.invert($), F = b.k * (p.shiftKey ? 0.5 : 2), R = i(C(I(b, F), $, T), t.apply(this, _), d);
      It(p), o > 0 ? _e(this).transition().duration(o).call(z, R, $, p) : _e(this).call(x.transform, R, $, p);
    }
  }
  function N(p, ..._) {
    if (e.apply(this, arguments)) {
      var b = p.touches, $ = b.length, T = g(this, _, p.changedTouches.length === $).event(p), F, R, q, K;
      for ($i(p), R = 0; R < $; ++R)
        q = b[R], K = Ve(q, this), K = [K, this.__zoom.invert(K), q.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== K[2] && (T.touch1 = K, T.taps = 0) : (T.touch0 = K, F = !0, T.taps = 1 + !!u);
      u && (u = clearTimeout(u)), F && (T.taps < 2 && (m = K[0], u = setTimeout(function() {
        u = null;
      }, h)), ei(this), T.start());
    }
  }
  function O(p, ..._) {
    if (this.__zooming) {
      var b = g(this, _).event(p), $ = p.changedTouches, T = $.length, F, R, q, K;
      for (It(p), F = 0; F < T; ++F)
        R = $[F], q = Ve(R, this), b.touch0 && b.touch0[2] === R.identifier ? b.touch0[0] = q : b.touch1 && b.touch1[2] === R.identifier && (b.touch1[0] = q);
      if (R = b.that.__zoom, b.touch1) {
        var Z = b.touch0[0], J = b.touch0[1], pe = b.touch1[0], ve = b.touch1[1], ue = (ue = pe[0] - Z[0]) * ue + (ue = pe[1] - Z[1]) * ue, we = (we = ve[0] - J[0]) * we + (we = ve[1] - J[1]) * we;
        R = I(R, Math.sqrt(ue / we)), q = [(Z[0] + pe[0]) / 2, (Z[1] + pe[1]) / 2], K = [(J[0] + ve[0]) / 2, (J[1] + ve[1]) / 2];
      } else if (b.touch0) q = b.touch0[0], K = b.touch0[1];
      else return;
      b.zoom("touch", i(C(R, q, K), b.extent, d));
    }
  }
  function L(p, ..._) {
    if (this.__zooming) {
      var b = g(this, _).event(p), $ = p.changedTouches, T = $.length, F, R;
      for ($i(p), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), F = 0; F < T; ++F)
        R = $[F], b.touch0 && b.touch0[2] === R.identifier ? delete b.touch0 : b.touch1 && b.touch1[2] === R.identifier && delete b.touch1;
      if (b.touch1 && !b.touch0 && (b.touch0 = b.touch1, delete b.touch1), b.touch0) b.touch0[1] = this.__zoom.invert(b.touch0[0]);
      else if (b.end(), b.taps === 2 && (R = Ve(R, this), Math.hypot(m[0] - R[0], m[1] - R[1]) < v)) {
        var q = _e(this).on("dblclick.zoom");
        q && q.apply(this, arguments);
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
    return arguments.length ? (r[0] = +p[0], r[1] = +p[1], x) : [r[0], r[1]];
  }, x.translateExtent = function(p) {
    return arguments.length ? (d[0][0] = +p[0][0], d[1][0] = +p[1][0], d[0][1] = +p[0][1], d[1][1] = +p[1][1], x) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, x.constrain = function(p) {
    return arguments.length ? (i = p, x) : i;
  }, x.duration = function(p) {
    return arguments.length ? (o = +p, x) : o;
  }, x.interpolate = function(p) {
    return arguments.length ? (a = p, x) : a;
  }, x.on = function() {
    var p = l.on.apply(l, arguments);
    return p === l ? x : p;
  }, x.clickDistance = function(p) {
    return arguments.length ? (w = (p = +p) * p, x) : Math.sqrt(w);
  }, x.tapDistance = function(p) {
    return arguments.length ? (v = +p, x) : v;
  }, x;
}
var hl = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, re = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ml(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && hl(t, i, n), n;
};
function fl(e, t, i, s) {
  const n = t.x - e.x, r = t.y - e.y, d = s.x - i.x, o = s.y - i.y, a = n * o - r * d;
  if (Math.abs(a) < 1e-9) return null;
  const l = ((i.x - e.x) * o - (i.y - e.y) * d) / a, u = ((i.x - e.x) * r - (i.y - e.y) * n) / a;
  return l <= 0.02 || l >= 0.98 || u <= 0.02 || u >= 0.98 ? null : { x: e.x + l * n, y: e.y + l * r, t: l };
}
function gl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, r = s * s + n * n || 1, d = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / r)), o = t.x + d * s, a = t.y + d * n;
  return { dist: Math.hypot(e.x - o, e.y - a), t: d };
}
function yl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const r = e[n], d = e[n + 1], o = Math.hypot(d.x - r.x, d.y - r.y) || 1, a = (d.x - r.x) / o, l = (d.y - r.y) / o, u = t.map(([f, h]) => fl(r, d, f, h)).filter((f) => f !== null).filter((f) => f.t * o > i + 2 && (1 - f.t) * o > i + 2).sort((f, h) => f.t - h.t);
    let m = -1 / 0;
    for (const f of u)
      f.t * o - i <= m + 2 || (s += ` L ${f.x - a * i} ${f.y - l * i}`, s += ` A ${i} ${i} 0 0 1 ${f.x + a * i} ${f.y + l * i}`, m = f.t * o + i);
    s += ` L ${d.x} ${d.y}`;
  }
  return s;
}
const st = {
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
let ne = class extends Se {
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
            const n = this.scene.nodes.filter((r) => this.selectedIds.includes(r.id)).map((r) => ({ id: r.id, kind: r.kind }));
            n.length && this.emit("delete-selection-requested", { items: n });
            return;
          }
          if (this._selectedWaypoint) {
            const n = this.scene.edges.find((r) => r.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = ul().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const s = this.getBoundingClientRect();
    if (s.width === 0 || s.height === 0) return;
    const n = this.fitInsets.left ?? 0, r = this.fitInsets.right ?? 0, d = this.fitInsets.top ?? 0, o = this.fitInsets.bottom ?? 0, a = Math.max(80, s.width - n - r), l = Math.max(80, s.height - d - o), u = Math.min(...t.map((v) => v.x - v.w / 2)) - e, m = Math.max(...t.map((v) => v.x + v.w / 2)) + e, f = Math.min(...t.map((v) => v.y - v.h / 2)) - e, h = Math.max(...t.map((v) => v.y + v.h / 2)) + e, y = Math.max(0.15, Math.min(a / (m - u), l / (h - f), 1.25)), w = At.translate(
      n + a / 2 - y * (u + m) / 2,
      d + l / 2 - y * (f + h) / 2
    ).scale(y);
    _e(i).call(this._zoomBehavior.transform, w);
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
    var i, s, n;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let r = e.parentId; r; r = (s = this.scene.nodes.find((d) => d.id === r)) == null ? void 0 : s.parentId) {
      const d = this.scene.nodes.find((a) => a.id === r);
      if (!d) break;
      if (this._dragPos && this._dragPos.id === r)
        return { x: e.x + (this._dragPos.x - d.x), y: e.y + (this._dragPos.y - d.y) };
      const o = (n = this._dragGroup) == null ? void 0 : n.get(r);
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
        const n = this.nodePos(s), r = n.x - s.w / 2 + 10 + e.w / 2, d = n.x + s.w / 2 - 10 - e.w / 2, o = n.y - s.h / 2 + 34 + e.h / 2, a = n.y + s.h / 2 - 10 - e.h / 2;
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
    var s, n;
    const i = ((s = this.shadowRoot) == null ? void 0 : s.elementsFromPoint(e, t)) ?? [];
    for (const r of i) {
      const d = (n = r.closest) == null ? void 0 : n.call(r, "[data-node-id]");
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
    const r = new Set(this.selectedIds), d = r.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => r.has(f.id) && !(f.parentId && r.has(f.parentId))
    ) : null, o = d ? new Map(d.map((f) => [f.id, this.nodePos(f)])) : null, a = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !d, l = (f) => {
      const h = this.nodeIdAt(f), y = h && h !== t.id ? this.scene.nodes.find((w) => w.id === h) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, u = (f) => {
      if ((f.buttons & 1) === 0) {
        m(f);
        return;
      }
      const h = this.toScene(f), y = h.x - i.x, w = h.y - i.y;
      if (!(!n && Math.hypot(y, w) < 3 / this._t.k))
        if (n = !0, d && o) {
          const v = /* @__PURE__ */ new Map();
          for (const x of d) {
            const I = o.get(x.id), C = this.clampToParent(x, I.x + y, I.y + w);
            v.set(x.id, { x: C.x, y: C.y });
          }
          this._dragGroup = v;
        } else a(f) ? (this._dragPos = { id: t.id, x: s.x + y, y: s.y + w }, this._hoverNodeId = l(f)) : (this._dragPos = this.clampToParent(t, s.x + y, s.y + w), this._hoverNodeId = null);
    }, m = (f) => {
      if (window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", m), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, y]) => ({ id: h, x: y.x, y: y.y }))
        });
      else if (n && this._dragPos) {
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
  onResizePointerDown(e, t, i, s) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const n = 160, r = 90, d = { x: t.x, y: t.y, w: t.w, h: t.h }, o = this.scene.nodes.filter((w) => w.parentId === t.id), a = Math.min(...o.map((w) => w.x - w.w / 2)), l = Math.max(...o.map((w) => w.x + w.w / 2)), u = Math.min(...o.map((w) => w.y - w.h / 2)), m = Math.max(...o.map((w) => w.y + w.h / 2)), f = Vn(
      o.map((w) => ({ dx: w.x - d.x, dy: w.y - d.y, w: w.w, h: w.h })),
      { w: n, h: r }
    ), h = (w) => {
      if ((w.buttons & 1) === 0) {
        y();
        return;
      }
      const v = this.toScene(w);
      if (w.shiftKey) {
        this._resize = {
          id: t.id,
          x: d.x,
          y: d.y,
          w: Math.max(f.w, 2 * Math.abs(v.x - d.x)),
          h: Math.max(f.h, 2 * Math.abs(v.y - d.y))
        };
        return;
      }
      const x = d.x - i * d.w / 2, I = d.y - s * d.h / 2, C = i > 0 ? Math.max(v.x, x + n, o.length ? l + 10 : -1 / 0) : Math.min(v.x, x - n, o.length ? a - 10 : 1 / 0), P = s > 0 ? Math.max(v.y, I + r, o.length ? m + 10 : -1 / 0) : Math.min(v.y, I - r, o.length ? u - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + C) / 2,
        y: (I + P) / 2,
        w: Math.abs(C - x),
        h: Math.abs(P - I)
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
    const s = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, n = (r) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", n);
      const d = this.nodeIdAt(r);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
        x: r.clientX,
        y: r.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", n);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), r = t - s, d = i - n, o = e.w / 2, a = e.h / 2;
    if (r === 0 && d === 0) return { x: s, y: n };
    const l = 1 / Math.max(Math.abs(r) / o, Math.abs(d) / a);
    return { x: s + r * l, y: n + d * l };
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), r = this.nodePos(i), d = s[0] ?? r, o = s[s.length - 1] ?? n;
    let a = this.borderPoint(t, d.x, d.y), l = this.borderPoint(i, o.x, o.y);
    if (!s.length) {
      const u = this.edgeOffset(e);
      if (u !== 0) {
        const m = Math.hypot(l.x - a.x, l.y - a.y) || 1, f = -(l.y - a.y) / m * u, h = (l.x - a.x) / m * u;
        a = { x: a.x + f, y: a.y + h }, l = { x: l.x + f, y: l.y + h };
      }
    }
    return [a, ...s, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (d) => {
      if (!this._wpDrag) return;
      s = !0;
      const o = this.toScene(d), a = [...this._wpDrag.points];
      a[this._wpDrag.index] = o, this._wpDrag = { ...this._wpDrag, points: a };
    }, r = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = gl(t, e[s], e[s + 1]);
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
          u[n] = l, this._wpDrag = { ...this._wpDrag, points: u };
        }
      } else {
        if (Math.hypot(l.x - s.x, l.y - s.y) < 4 / this._t.k) return;
        r = !0, this.focus();
        const u = [...this.edgePoints[t.id] ?? []];
        u.splice(n, 0, l), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: u, index: n };
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, r = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), d = Math.floor((t.length - 1) / 2), o = {
      x: (t[d].x + t[d + 1].x) / 2,
      y: (t[d].y + t[d + 1].y) / 2
    }, a = t.slice(1, -1);
    return G`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${yl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${r ? 3 : 1.6}
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
        ${n ? a.map((l, u) => {
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
    var f, h, y;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, r = !!e.container, d = !!e.parentId, o = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, a = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, l = o / 2, u = a / 2, m = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return G`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (y = this._dragGroup) != null && y.has(e.id) ? "none" : "auto"}
         @pointerdown=${(w) => this.onNodePointerDown(w, e)}
         @dblclick=${(w) => {
      w.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? G`<rect x=${-l - 4} y=${-u - 4} width=${o + 8} height=${a + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-u} width=${o} height=${a} rx=${d ? 6 : 10}
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
                  @pointerdown=${(w) => {
      w.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(w) => w.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && st[e.symbol] && !d ? G`<g transform="translate(${l - (e.collapsible ? 37 : 17)}, ${-u + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${st[e.symbol]}
              </g>` : ""}
        ${d && e.symbol && st[e.symbol] ? G`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${st[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? G`
              <foreignObject x=${-l + 6} y=${r ? -u + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${r ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(w) => w.stopPropagation()}
                  @keydown=${(w) => {
      w.stopPropagation(), w.key === "Enter" && this.commitRename(e, w.target.value), w.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(w) => this.commitRename(e, w.target.value)}
                />
              </foreignObject>` : d ? G`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : r ? G`<text x=${-l + 12} y=${-u + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : G`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${r ? G`<line x1=${-l + 8} y1=${-u + 28} x2=${l - 8} y2=${-u + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (d ? e.kind === "menu-item" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [l, 0],
      [-l, 0],
      [0, u],
      [0, -u]
    ].map(
      ([w, v]) => G`
                <circle data-handle cx=${w} cy=${v} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${r && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([w, v]) => G`
                <rect data-resize x=${w * l - 6.5} y=${v * u - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${w * v > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, w, v)}>
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
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (d) => {
      if ((d.buttons & 1) === 0) {
        s();
        return;
      }
      const o = this.toScene(d);
      !i && Math.hypot(o.x - t.x, o.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: o });
    }, r = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: d, b: o } = this._rubber, a = Math.min(d.x, o.x), l = Math.max(d.x, o.x), u = Math.min(d.y, o.y), m = Math.max(d.y, o.y), f = this.scene.nodes.filter((h) => {
          const y = this.nodePos(h);
          return y.x >= a && y.x <= l && y.y >= u && y.y <= m;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", r), window.addEventListener("pointercancel", s);
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
    const i = Math.min(...t.map((d) => d.x - d.w / 2)) - e, s = Math.max(...t.map((d) => d.x + d.w / 2)) + e, n = Math.min(...t.map((d) => d.y - d.h / 2)) - e, r = Math.max(...t.map((d) => d.y + d.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: r - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, r = At.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    _e(i).call(this._zoomBehavior.transform, r);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, r = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, r);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), r = (0 - this._t.x) / this._t.k, d = (0 - this._t.y) / this._t.k, o = n.width / this._t.k, a = n.height / this._t.k;
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
            x=${(r - e.minX) * s}
            y=${(d - e.minY) * s}
            width=${o * s}
            height=${a * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((n) => n.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((n) => {
      const r = this.edgePolyline(n);
      if (r) {
        i.push(this.renderEdgeHit(n, r)), s.push(this.renderEdgeInk(n, r, [...t]));
        for (let d = 0; d < r.length - 1; d++) t.push([r[d], r[d + 1]]);
      }
    }), A`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(n) => {
      const r = n.target;
      r.closest("[data-node-id]") || r.closest("[data-edge-id]") || this._spaceDown || n.button !== 0 || (n.buttons & 1) !== 0 && this.startRubberBand(n);
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
ne.styles = lt`
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
  oe({ attribute: !1 })
], ne.prototype, "scene", 2);
re([
  oe({ attribute: !1 })
], ne.prototype, "selectedId", 2);
re([
  oe({ attribute: !1 })
], ne.prototype, "selectedIds", 2);
re([
  oe({ type: Boolean })
], ne.prototype, "connectable", 2);
re([
  oe({ attribute: !1 })
], ne.prototype, "edgePoints", 2);
re([
  D()
], ne.prototype, "_t", 2);
re([
  D()
], ne.prototype, "_dragPos", 2);
re([
  D()
], ne.prototype, "_dragGroup", 2);
re([
  D()
], ne.prototype, "_pendingLink", 2);
re([
  D()
], ne.prototype, "_hoverNodeId", 2);
re([
  D()
], ne.prototype, "_editingId", 2);
re([
  D()
], ne.prototype, "_spaceDown", 2);
re([
  D()
], ne.prototype, "_wpDrag", 2);
re([
  D()
], ne.prototype, "_selectedWaypoint", 2);
re([
  D()
], ne.prototype, "_resize", 2);
re([
  D()
], ne.prototype, "_rubber", 2);
re([
  oe({ attribute: !1 })
], ne.prototype, "fitInsets", 2);
ne = re([
  ct("modux-canvas")
], ne);
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
function he(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ie(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Je = (e) => e.trim().toLowerCase();
function vl(e, t) {
  var E, U, N, O, L;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((p) => [p.id, p.name])), n = e.modules.flatMap(
    (p) => (p.useCases ?? []).map((_) => ({ ..._, moduleId: p.id }))
  ), r = new Set(n.map((p) => p.id)), d = e.aggregates ?? [], o = new Set(
    e.modules.flatMap((p) => (p.domainServices ?? []).map((_) => _.id))
  ), a = e.modules.flatMap(
    (p) => (p.domainEvents ?? []).map((_) => ({ ..._, moduleId: p.id, application: !1 }))
  ), l = e.modules.flatMap(
    (p) => (p.applicationEvents ?? []).map((_) => ({ ..._, moduleId: p.id, application: !0 }))
  ), u = e.modules.flatMap(
    (p) => (p.readModels ?? []).map((_) => ({ ..._, moduleId: p.id }))
  );
  for (const p of n)
    he(i, {
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
    he(i, {
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
  for (const p of [...a, ...l])
    he(i, {
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
    }), m.set(Je(p.name), p.id);
  const f = (p) => {
    if (!p || !p.trim()) return null;
    const _ = m.get(Je(p));
    if (_) return _;
    const b = `evname:${Je(p)}`;
    return he(i, {
      id: b,
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
    }), b;
  }, h = (p) => {
    const _ = u.find(($) => $.id === p.id) ?? u.find(($) => p.name && Je($.name) === Je(p.name)), b = (_ == null ? void 0 : _.id) ?? (p.id || (p.name ? `rm:${Je(p.name)}` : null));
    return b ? (he(i, {
      id: b,
      label: (_ == null ? void 0 : _.name) ?? p.name ?? b,
      x: 0,
      y: 0,
      w: H.readModel.w,
      h: H.readModel.h,
      kind: _ ? "read-model" : "derived-read-model",
      fill: H.readModel.fill,
      stroke: H.readModel.stroke,
      dashed: !_,
      badge: "READ MODEL"
    }), b) : null;
  };
  for (const p of e.actorUses ?? []) {
    if (!r.has(p.targetId)) continue;
    const _ = (e.actors ?? []).find((b) => b.id === p.actorId);
    _ && (he(i, {
      id: _.id,
      label: _.name,
      x: 0,
      y: 0,
      w: H.actor.w,
      h: H.actor.h,
      kind: "actor",
      symbol: "person",
      fill: H.actor.fill,
      stroke: H.actor.stroke,
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
    const _ = (e.agentUses ?? []).filter((R) => R.agentId === p.id), b = (e.agentExternalUses ?? []).filter((R) => R.agentId === p.id), $ = (e.agentRags ?? []).filter((R) => R.agentId === p.id), T = (e.agentMcpUses ?? []).filter((R) => R.agentId === p.id), F = (e.agentGatewayUses ?? []).some((R) => R.agentId === p.id) || (e.agentApiOpUses ?? []).some((R) => R.agentId === p.id) || (e.agentQueryUses ?? []).some((R) => R.agentId === p.id) || (e.agentDelegations ?? []).some((R) => R.agentId === p.id) || (e.agentTriggers ?? []).some((R) => R.agentId === p.id);
    if (!(!_.length && !b.length && !$.length && !T.length && !F)) {
      he(i, {
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
      for (const R of _)
        r.has(R.useCaseId) && ie(i, {
          id: `es-agent:${p.id}->${R.useCaseId}`,
          sourceId: p.id,
          targetId: R.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const R of b) {
        const q = e.externalSystems.find(
          (Z) => (Z.useCases ?? []).some((J) => J.id === R.externalUseCaseId)
        );
        if (!q) continue;
        const K = (E = (q.useCases ?? []).find((Z) => Z.id === R.externalUseCaseId)) == null ? void 0 : E.name;
        he(i, {
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
        }), ie(i, {
          id: `es-agentx:${p.id}->${R.externalUseCaseId}`,
          sourceId: p.id,
          targetId: q.id,
          kind: "es-agent-external",
          label: K,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: K ? `Llama a ${K} del sistema externo` : void 0
        });
      }
      for (const R of T) {
        const q = e.externalSystems.find(
          (Z) => (Z.mcpServers ?? []).some((J) => J.id === R.mcpServerId)
        );
        if (!q) continue;
        const K = (U = (q.mcpServers ?? []).find((Z) => Z.id === R.mcpServerId)) == null ? void 0 : U.name;
        he(i, {
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
        }), ie(i, {
          id: `es-agentmcp:${p.id}->${R.mcpServerId}`,
          sourceId: p.id,
          targetId: q.id,
          kind: "es-agent-mcp",
          label: K,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: K ? `Consume las herramientas del servidor MCP ${K}` : void 0
        });
      }
      for (const R of $) {
        const q = (e.rags ?? []).find((K) => K.id === R.ragId);
        if (q) {
          he(i, {
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
          }), ie(i, {
            id: `es-agrag:${p.id}->${q.id}`,
            sourceId: p.id,
            targetId: q.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const K of q.sourceReadModelIds ?? []) {
            const Z = h({ id: K });
            Z && ie(i, {
              id: `es-ragsrc:${q.id}->${Z}`,
              sourceId: Z,
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
  const y = (p) => {
    const _ = e.externalSystems.find((b) => b.id === p);
    return _ ? (he(i, {
      id: _.id,
      label: _.name,
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
      (T) => (T.useCases ?? []).some((F) => F.id === p.targetId)
    ), b = _ ? y(_.id) : null;
    if (!b) continue;
    const $ = (N = ((_ == null ? void 0 : _.useCases) ?? []).find((T) => T.id === p.targetId)) == null ? void 0 : N.name;
    ie(i, {
      id: `es-extout:${p.sourceId}->${p.targetId}`,
      sourceId: p.sourceId,
      targetId: b,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
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
  const w = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const p of w)
    !i.nodes.has(p.domainEventId) || !(i.nodes.has(p.sourceId) && (r.has(p.sourceId) || d.some((b) => b.id === p.sourceId) || o.has(p.sourceId))) || ie(i, {
      id: `es-emit:${p.sourceId}->${p.domainEventId}`,
      sourceId: p.sourceId,
      targetId: p.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const v = (p, _, b, $, T, F) => (he(i, {
    id: p,
    label: _,
    x: 0,
    y: 0,
    w: H.policy.w,
    h: H.policy.h,
    kind: b,
    symbol: "flow",
    fill: H.policy.fill,
    stroke: H.policy.stroke,
    badge: $,
    tooltip: T
  }), p), x = (p, _) => {
    const b = f(p);
    b && ie(i, {
      id: `es-trigger:${b}->${_}`,
      sourceId: b,
      targetId: _,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, I = (p, _) => {
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
    const _ = v(
      p.id,
      p.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${p.name}${p.eventName ? ` — reacciona a ${p.eventName}` : ""}${p.consumerGroup ? ` · grupo ${p.consumerGroup}` : ""}`
    );
    x(p.eventName, _);
    for (const b of p.actions ?? []) {
      if (b.type === "CallUseCase" && I(_, b.useCaseId), b.type === "StartSaga" && b.sagaId) {
        const $ = `saga:${b.sagaId}`;
        v($, b.sagaId, "saga", "SAGA"), ie(i, {
          id: `es-saga:${_}->${$}`,
          sourceId: _,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (b.type === "UpdateProjection" && b.projectionId) {
        const $ = (e.projections ?? []).find((T) => T.id === b.projectionId);
        $ && ie(i, {
          id: `es-feeds:${_}->${$.id}`,
          sourceId: _,
          targetId: $.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const p of e.projections ?? []) {
    const _ = v(
      p.id,
      p.name,
      "projection",
      "PROYECCIÓN",
      `${p.name}${p.readModelName ? ` — materializa ${p.readModelName}` : ""}`
    );
    for (const T of p.handledEventIds) {
      const F = i.nodes.has(T) ? T : null;
      F && ie(i, {
        id: `es-trigger:${F}->${_}`,
        sourceId: F,
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
    const b = p.sourceExternalUseCaseId ?? p.sourceExternalTableId;
    if (b) {
      const T = e.externalSystems.find(
        (R) => (R.useCases ?? []).some((q) => q.id === b) || (R.tables ?? []).some((q) => q.id === b)
      ), F = T ? y(T.id) : null;
      if (F) {
        const R = ((O = (T.useCases ?? []).find((q) => q.id === b)) == null ? void 0 : O.name) ?? ((L = (T.tables ?? []).find((q) => q.id === b)) == null ? void 0 : L.name);
        ie(i, {
          id: `es-poll:${p.id}`,
          sourceId: F,
          targetId: _,
          kind: "es-projects-poll",
          label: R,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `polling de ${R}` : "polling"
        });
      }
    }
    const $ = h({ id: p.readModelId, name: p.readModelName });
    $ && ie(i, {
      id: `es-projects:${_}->${$}`,
      sourceId: _,
      targetId: $,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const p of e.flows) {
    if (p.archetype === "MATERIALIZES") {
      const b = f(p.triggerEvent), $ = h({ name: p.readModelName ?? `${p.triggerEvent}View` });
      b && $ && ie(i, {
        id: `es-mat:${p.id}`,
        sourceId: b,
        targetId: $,
        kind: "es-materializes",
        label: p.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${p.name} [MATERIALIZES]`
      });
      continue;
    }
    const _ = v(
      `flow:${p.id}`,
      p.name,
      "flow",
      `POLICY · ${p.archetype}`,
      `Flow ${p.name} [${p.archetype}]`
    );
    if (x(p.triggerEvent, _), I(_, p.targetUseCaseId), !p.targetUseCaseId) {
      const b = y(p.targetId), $ = b ?? `tgt:${p.targetId}`;
      !b && s.has(p.targetId) && he(i, {
        id: $,
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
      }), i.nodes.has($) && ie(i, {
        id: `es-deliver:${p.id}`,
        sourceId: _,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const p of e.processes ?? []) {
    const _ = v(
      p.id,
      p.name,
      "process",
      `PROCESO${p.sla ? ` · SLA ${p.sla}` : ""}`,
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    x(p.triggerEvent, _);
    for (const $ of p.steps) I(_, $.useCaseId);
    const b = f(p.onCompletionEventName);
    b && ie(i, {
      id: `es-done:${p.id}`,
      sourceId: _,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const p of e.workflows ?? []) {
    const _ = v(
      p.id,
      p.name,
      "workflow",
      "WORKFLOW",
      `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}`
    );
    x(p.triggerEvent, _);
    for (const $ of p.steps ?? []) {
      I(_, $.targetUseCaseId);
      for (const T of [$.emittedEventName, $.completionEventName]) {
        const F = f(T);
        F && ie(i, {
          id: `es-wfemit:${p.id}:${F}`,
          sourceId: _,
          targetId: F,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const b = f(p.onCompletionEventName);
    b && ie(i, {
      id: `es-done:${p.id}`,
      sourceId: _,
      targetId: b,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const C = [...i.nodes.values()], P = /* @__PURE__ */ new Map();
  for (const p of i.edges)
    P.has(p.targetId) || P.set(p.targetId, []), P.get(p.targetId).push(p.sourceId);
  const z = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), k = (p) => {
    const _ = z.get(p);
    if (_ !== void 0) return _;
    if (g.has(p)) return 0;
    g.add(p);
    const b = P.get(p) ?? [], $ = b.length ? 1 + Math.max(...b.map(k)) : 0;
    return g.delete(p), z.set(p, $), $;
  }, S = /* @__PURE__ */ new Map();
  for (const p of C) {
    const _ = t[p.id];
    if (_) {
      p.x = _.x, p.y = _.y;
      continue;
    }
    const b = k(p.id), $ = S.get(b) ?? 0;
    S.set(b, $ + 1), p.x = 140 + b * 260, p.y = 110 + $ * 110;
  }
  return { nodes: C, edges: i.edges };
}
const wl = 190, xl = 56, Ps = 180, Il = 56, bl = 150, _l = 44, Ns = 250, Os = 100;
function kl(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const r = (n.dependsOnStepIds ?? []).map((o) => t.get(o)).filter(Boolean), d = r.length ? 1 + Math.max(...r.map(s)) : 0;
    return i.delete(n.id), d;
  };
  return s(e);
}
function $l(e, t) {
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
function El(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), r = (o) => {
    var a;
    return (a = e.modules.flatMap((l) => l.useCases ?? []).find((l) => l.id === o)) == null ? void 0 : a.name;
  };
  let d = 140;
  return (e.workflows ?? []).forEach((o) => {
    var v;
    const a = new Map(o.steps.map((x) => [x.id, x])), l = new Map(o.steps.map((x) => [x.id, kl(x, a)])), u = /* @__PURE__ */ new Map();
    for (const x of o.steps) {
      const I = l.get(x.id) ?? 0;
      u.set(I, (u.get(I) ?? 0) + 1);
    }
    const m = Math.max(1, ...u.values()), f = $l(e, o);
    if (f && !n.has(f.id)) {
      n.add(f.id);
      const x = t[f.id] ?? { x: 140, y: d };
      i.push({
        id: f.id,
        label: f.label,
        x: x.x,
        y: x.y,
        w: bl,
        h: _l,
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
      h: xl,
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
    const y = /* @__PURE__ */ new Map();
    let w = 0;
    for (const x of o.steps) {
      const I = l.get(x.id) ?? 0;
      w = Math.max(w, I);
      const C = y.get(I) ?? 0;
      y.set(I, C + 1);
      const P = t[x.id] ?? {
        x: h.x + (I + 1) * Ns,
        y: d + (C - (u.get(I) - 1) / 2) * Os
      }, z = r(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: P.x,
        y: P.y,
        w: Ps,
        h: Il,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: z ? `→ ${z}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${z ? ` · lanza ${z}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const g = (x.dependsOnStepIds ?? []).filter((k) => a.has(k));
      g.length === 0 && s.push({
        id: `wfs:${o.id}:${x.id}`,
        sourceId: o.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of g)
        s.push({
          id: `wfdep:${k}->${x.id}`,
          sourceId: k,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((v = a.get(k)) == null ? void 0 : v.name) ?? k}`
        });
    }
    if (o.onCompletionEventName) {
      const x = `done:${o.id}`, I = t[x] ?? { x: h.x + (w + 2) * Ns, y: d };
      i.push({
        id: x,
        label: o.onCompletionEventName,
        x: I.x,
        y: I.y,
        w: Ps,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const C = new Set(o.steps.flatMap((z) => z.dependsOnStepIds ?? [])), P = o.steps.filter((z) => !C.has(z.id));
      for (const z of P.length ? P : [])
        s.push({
          id: `wfd:${o.id}:${z.id}`,
          sourceId: z.id,
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
    d += Math.max(2, m + 1) * Os + 60;
  }), { nodes: i, edges: s };
}
const Ts = 250, Yt = 30, Rs = 6, Sl = 16, Al = 190, Ds = 60, Cl = 170, jt = 44;
function Ml(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function xe(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Pl(e) {
  const t = [], i = (s, n, r) => {
    for (const d of s ?? []) {
      const o = [...n, d.label];
      t.push({ entry: d, path: o, depth: r }), i(d.children ?? [], o, r + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Nl(e, t) {
  var w, v, x;
  const i = [], s = [], n = e.uiApps ?? [], r = e.pages ?? [], d = (I) => {
    var C;
    return ((C = e.modules.flatMap((P) => P.useCases ?? []).find((P) => P.id === I)) == null ? void 0 : C.name) ?? I;
  }, o = (I) => {
    var C;
    return ((C = e.modules.flatMap((P) => P.queryServices ?? []).find((P) => P.id === I)) == null ? void 0 : C.name) ?? I;
  }, a = /* @__PURE__ */ new Map();
  let l = 160;
  for (const I of n) {
    const C = Pl(I), P = Math.max(
      90,
      54 + C.length * (Yt + Rs)
    ), z = t[I.id] ?? { x: 190, y: l + P / 2 };
    l = z.y + P / 2 + 70, i.push({
      id: I.id,
      label: I.title || I.name,
      x: z.x,
      y: z.y,
      w: Ts,
      h: P,
      kind: "ui-app",
      symbol: "component",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      container: !0,
      tooltip: `App: ${I.name}`
    });
    let g = z.y - P / 2 + 34 + 10 + Yt / 2;
    for (const { entry: k, path: S, depth: E } of C) {
      const U = Ml(I.id, k, S), N = E * Sl;
      if (i.push({
        id: U,
        label: k.label,
        x: z.x + N / 2,
        y: g,
        w: Ts - 20 - N,
        h: Yt,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (w = k.children) != null && w.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (v = k.children) != null && v.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: I.id,
        tooltip: (x = k.children) != null && x.length ? "Agrupador (con submenú): no puede abrir nada" : k.pageId ? `Abre ${k.pageId}` : k.uiAdapterId ? `Abre la app ${k.uiAdapterId}` : k.useCaseId ? `Lanza ${k.useCaseId}` : k.aggregateId ? `CRUD inferido sobre ${k.aggregateId}` : k.queryOperationId ? `Listado con filtros de ${k.queryOperationId}` : "Entrada de menú sin destino"
      }), g += Yt + Rs, k.uiAdapterId && n.some((O) => O.id === k.uiAdapterId) && s.push({
        id: `menuapp:${U}->${k.uiAdapterId}`,
        sourceId: U,
        targetId: k.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), k.useCaseId && e.modules.some((L) => (L.useCases ?? []).some((p) => p.id === k.useCaseId)) && (a.set(k.useCaseId, {
        label: d(k.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${U}->${k.useCaseId}`,
        sourceId: U,
        targetId: k.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), k.aggregateId && (e.aggregates ?? []).some((O) => O.id === k.aggregateId)) {
        const O = (e.aggregates ?? []).find((L) => L.id === k.aggregateId);
        a.set(O.id, { label: O.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${U}->${O.id}`,
          sourceId: U,
          targetId: O.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (k.queryOperationId) {
        const O = e.modules.flatMap((p) => p.queryServices ?? []).find((p) => p.id === k.queryServiceId), L = ((O == null ? void 0 : O.operations) ?? []).find((p) => p.id === k.queryOperationId);
        O && L && (a.set(L.id, {
          label: `${L.name} (${O.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${U}->${L.id}`,
          sourceId: U,
          targetId: L.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      k.pageId && r.some((O) => O.id === k.pageId) && s.push({
        id: `menupage:${U}->${k.pageId}`,
        sourceId: U,
        targetId: k.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let u = 160;
  for (const I of r) {
    const C = t[I.id] ?? { x: 640, y: u };
    u = C.y + Ds + 90, i.push({
      id: I.id,
      label: I.name,
      x: C.x,
      y: C.y,
      w: Al,
      h: Ds,
      kind: "page",
      symbol: "interface",
      badge: I.type ?? "FORM",
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: I.route ? `${I.type ?? "FORM"} · ${I.route}` : I.type ?? "FORM"
    }), I.modelId && (a.set(I.modelId, {
      label: I.modelName ?? I.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${I.id}->${I.modelId}`,
      sourceId: I.id,
      targetId: I.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const P of I.buttons ?? [])
      P.useCaseId && (a.set(P.useCaseId, {
        label: d(P.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${I.id}->${P.useCaseId}`,
        sourceId: I.id,
        targetId: P.useCaseId,
        kind: "page-button",
        label: P.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: P.mappingId ? `Botón «${P.label}» — mapping ${P.mappingId}` : `Botón «${P.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    I.listingQueryServiceId && (a.set(I.listingQueryServiceId, {
      label: o(I.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${I.id}->${I.listingQueryServiceId}`,
      sourceId: I.id,
      targetId: I.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let m = 160;
  for (const [I, C] of a) {
    const P = t[I] ?? { x: 1050, y: m };
    m = P.y + jt + 46, i.push({
      id: I,
      label: C.label,
      x: P.x,
      y: P.y,
      w: Cl,
      h: jt,
      kind: C.kind,
      symbol: C.symbol,
      fill: "#ffffff",
      stroke: C.stroke
    });
  }
  const f = (e.actorAppUses ?? []).filter(
    (I) => n.some((C) => C.id === I.appId) && (e.actors ?? []).some((C) => C.id === I.actorId)
  ), h = [...new Set(f.map((I) => I.actorId))];
  let y = 160;
  for (const I of h) {
    const C = (e.actors ?? []).find((z) => z.id === I), P = t[I] ?? { x: -60, y };
    y = P.y + jt + 46, i.push({
      id: I,
      label: C.name,
      x: P.x,
      y: P.y,
      w: 150,
      h: jt,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const I of f)
    s.push({
      id: `actorapp:${I.actorId}->${I.appId}`,
      sourceId: I.actorId,
      targetId: I.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: s };
}
async function Ol(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((a) => a.e), s = new i(), r = {
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
  }, d = await s.layout(r), o = {};
  for (const a of d.children ?? [])
    o[a.id] = {
      x: (a.x ?? 0) + (a.width ?? 0) / 2,
      y: (a.y ?? 0) + (a.height ?? 0) / 2
    };
  return o;
}
var Tl = Object.defineProperty, Rl = Object.getOwnPropertyDescriptor, Ee = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Rl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Tl(t, i, n), n;
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
let fe = class extends Se {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onDown = (e) => {
      var n, r;
      if (e.button !== 0) return;
      this.focus(), (n = this.setPointerCapture) == null || n.call(this, e.pointerId);
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
        const r = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - r.left, y2: e.clientY - r.top };
        const d = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), o = (n = d == null ? void 0 : d.closest) == null ? void 0 : n.call(d, ".n3"), a = (o == null ? void 0 : o.dataset.nodeId) ?? null;
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
    var s, n, r;
    const i = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e, t);
    return ((r = (n = i == null ? void 0 : i.closest) == null ? void 0 : n.call(i, ".n3")) == null ? void 0 : r.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), s = i.width * 0.5, n = i.height * 0.42, r = new DOMMatrix();
    r.m34 = -1 / 1600;
    const d = new DOMMatrix().translate(s, n).multiply(r).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), o = d.transformPoint(new DOMPoint(0, 0, 0, 1)), a = d.transformPoint(new DOMPoint(1, 0, 0, 0)), l = d.transformPoint(new DOMPoint(0, 1, 0, 0)), u = e - i.left, m = t - i.top, f = a.x - u * a.w, h = l.x - u * l.w, y = a.y - m * a.w, w = l.y - m * l.w, v = u * o.w - o.x, x = m * o.w - o.y, I = f * w - h * y;
    return I ? { x: (v * w - h * x) / I, y: (f * x - v * y) / I } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const r = s.parentId ? e.get(s.parentId) : void 0, d = r ? i(r) + 1 : 0;
      return t.set(s.id, d), d;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return A`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((v) => [v.id, v])), s = Math.min(...e.map((v) => v.x - v.w / 2)) - 60, n = Math.max(...e.map((v) => v.x + v.w / 2)) + 60, r = Math.min(...e.map((v) => v.y - v.h / 2)) - 60, d = Math.max(...e.map((v) => v.y + v.h / 2)) + 60, o = (s + n) / 2, a = (r + d) / 2, l = this.getBoundingClientRect(), u = l.width ? Math.min(l.width / (n - s), l.height / (d - r), 1) * 0.9 : 0.5, m = this._k * u;
    this._kUsed = m, this._center = { x: o, y: a };
    const f = 30, h = this._liveMove, y = (v) => v.x + ((h == null ? void 0 : h.id) === v.id ? h.dx : 0), w = (v) => v.y + ((h == null ? void 0 : h.id) === v.id ? h.dy : 0);
    return A`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-o}px, ${-a}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${r}px"
            width=${n - s}
            height=${d - r}
            viewBox="${s} ${r} ${n - s} ${d - r}"
          >
            ${this.scene.edges.map((v) => {
      const x = i.get(v.sourceId), I = i.get(v.targetId);
      return !x || !I ? "" : G`<line
                x1=${y(x)} y1=${w(x)} x2=${y(I)} y2=${w(I)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((v) => {
      const x = i.get(v.sourceId), I = i.get(v.targetId);
      if (!x || !I) return "";
      const C = (t.get(x.id) ?? 0) * f + 2, P = (t.get(I.id) ?? 0) * f + 2, z = y(I) - y(x), g = w(I) - w(x), k = P - C, S = Math.hypot(z, g), E = Math.hypot(S, k), U = Math.atan2(g, z) * 180 / Math.PI, N = Math.atan2(k, S) * 180 / Math.PI, O = v.color ?? "#64748b", L = v.dashed ? `repeating-linear-gradient(90deg, ${O} 0 6px, transparent 6px 10px)` : O;
      return A`<div
              class="edge3"
              style="
                left: ${y(x)}px; top: ${w(x)}px; width: ${E}px; height: 1.7px;
                transform: translateZ(${C}px) rotateZ(${U}deg) rotateY(${-N}deg);
                background: ${L};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((v) => {
      const x = t.get(v.id) ?? 0, I = v.container || x === 0, C = this._hoverTargetId === v.id;
      return A`
              <div
                class="n3 ${v.container ? "container3" : ""} ${this.selectedId === v.id ? "selected3" : ""} ${C ? "hover3" : ""}"
                data-node-id=${v.id}
                data-kind=${v.kind}
                title=${v.tooltip ?? v.label}
                style="
                  left: ${y(v) - v.w / 2}px; top: ${w(v) - v.h / 2}px;
                  width: ${v.w}px; height: ${v.h}px;
                  transform: translateZ(${x * f + (C ? 8 : 0)}px)${C ? " scale(1.06)" : ""};
                  background: ${v.container ? "color-mix(in srgb, " + (v.fill ?? "#ffffff") + " 82%, transparent)" : v.fill ?? "#ffffff"};
                  border-color: ${v.stroke ?? "#64748b"};
                  border-style: ${v.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${I ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${v.badge ? A`<span class="badge3" style="color: ${v.stroke ?? "#94a3b8"}">${v.badge}</span>` : ""}
                <span>${v.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const v = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!v || !Dl.has(v.kind)) return "";
      const x = (t.get(v.id) ?? 0) * f + 4;
      return [
        [y(v) + v.w / 2, w(v)],
        [y(v) - v.w / 2, w(v)],
        [y(v), w(v) + v.h / 2],
        [y(v), w(v) - v.h / 2]
      ].map(
        ([C, P]) => A`<div
                class="h3"
                data-source-id=${v.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${C}px; top: ${P}px; transform: translateZ(${x}px)"
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
fe.styles = lt`
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
Ee([
  oe({ attribute: !1 })
], fe.prototype, "scene", 2);
Ee([
  oe({ attribute: !1 })
], fe.prototype, "selectedId", 2);
Ee([
  oe({ attribute: !1 })
], fe.prototype, "connectable", 2);
Ee([
  D()
], fe.prototype, "_rx", 2);
Ee([
  D()
], fe.prototype, "_rz", 2);
Ee([
  D()
], fe.prototype, "_k", 2);
Ee([
  D()
], fe.prototype, "_pan", 2);
Ee([
  D()
], fe.prototype, "_liveMove", 2);
Ee([
  D()
], fe.prototype, "_connect", 2);
Ee([
  D()
], fe.prototype, "_hoverTargetId", 2);
fe = Ee([
  ct("modux-tilt")
], fe);
var Ll = Object.defineProperty, Ul = Object.getOwnPropertyDescriptor, pt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ul(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Ll(t, i, n), n;
};
const zl = [
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
let Ue = class extends Se {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this._editing = null, this._dragId = null, this._overId = null;
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
    const i = (this.page.viewmodelFields ?? []).map((r) => r.fieldId), s = i.indexOf(t), n = i.indexOf(e);
    s < 0 || n < 0 || (i.splice(n, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId;
    return A`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        <span class="title">${e.name}</span>
        <span class="type">${e.type ?? "FORM"}</span>
        ${e.route ? A`<span class="route">${e.route}</span>` : se}
        <button @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha completa de la página">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="toolbar">
        ${(e.buttons ?? []).map(
      (s) => A`<span class="btn" title=${s.useCaseId ?? ""}>${s.label}</span>`
    )}
        <span class="hint">
          ${(e.buttons ?? []).length ? "" : "Sin botones — suelta un caso de uso sobre la página en el mapa"}
        </span>
      </div>
      <div class="body">
        ${i ? A`<table>
              <tr>${t.slice(0, 4).map((s) => A`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => A`<tr>${t.slice(0, 4).map(() => A`<td>···</td>`)}</tr>`)}
            </table>` : se}
        ${t.length ? A`<div class="grid">
              ${t.map(
      (s) => A`
                  <div
                    class="field ${s.colspan === 2 ? "span2" : ""} ${this._overId === s.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${s.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(s)}
                    @dragstart=${() => this._dragId = s.fieldId}
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
            </div>` : A`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
      </div>
      ${this._editing ? A`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(s) => this._editing = { ...this._editing, stereotype: s.target.value }}
            >
              ${zl.map(
      (s) => A`<option value=${s} ?selected=${s === this._editing.stereotype}>${s}</option>`
    )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(s) => this._editing = { ...this._editing, colspan: Number(s.target.value) }}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(s) => this._editing = { ...this._editing, label: s.target.value }}
            />
            <div class="actions">
              <button @click=${() => this._editing = null}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>` : se}
    `;
  }
};
Ue.styles = lt`
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
pt([
  oe({ attribute: !1 })
], Ue.prototype, "page", 2);
pt([
  oe({ type: Boolean, reflect: !0 })
], Ue.prototype, "framed", 2);
pt([
  D()
], Ue.prototype, "_editing", 2);
pt([
  D()
], Ue.prototype, "_dragId", 2);
pt([
  D()
], Ue.prototype, "_overId", 2);
Ue = pt([
  ct("modux-page-designer")
], Ue);
var ql = Object.defineProperty, Fl = Object.getOwnPropertyDescriptor, ut = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Fl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && ql(t, i, n), n;
};
const Vl = 460, Hl = 540, Bl = 660;
let ze = class extends Se {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.selectedId = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((s) => {
        var n;
        return (n = s.classList) == null ? void 0 : n.contains("frame-title");
      });
      if (i) {
        const n = i.closest(".frame").dataset.pageId, r = this.pages.findIndex((o) => o.id === n), d = this.posOf(n, r);
        this.setPointerCapture(e.pointerId), this._drag = { mode: "frame", id: n, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, this.emit("element-selected", { elementType: "node", id: n, kind: "page" }), e.preventDefault();
        return;
      }
      t.some((s) => s.tagName === "MODUX-PAGE-DESIGNER") || (this.setPointerCapture(e.pointerId), this._drag = { mode: "pan", x: e.clientX, y: e.clientY, t: { x: this._t.x, y: this._t.y } });
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = e.deltaY < 0 ? 1.1 : 1 / 1.1, r = Math.max(0.2, Math.min(2.5, this._t.k * n));
      this._t = {
        k: r,
        x: i - (i - this._t.x) / this._t.k * r,
        y: s - (s - this._t.y) / this._t.k * r
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
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Hl, y: Math.floor(t / 3) * Bl };
  }
  render() {
    return A`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      const i = this.posOf(e.id, t);
      return A`
            <div
              class="frame ${this.selectedId === e.id ? "selected" : ""}"
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
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(s) => this.emit("page-field-config-changed", { pageId: e.id, ...s.detail })}
                @fields-reordered=${(s) => this.emit("page-fields-reordered", { pageId: e.id, ...s.detail })}
              ></modux-page-designer>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : A`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · fondo panea · rueda zoom · click en un campo edita su declaración
      </div>
    `;
  }
};
ze.styles = lt`
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
ut([
  oe({ attribute: !1 })
], ze.prototype, "pages", 2);
ut([
  oe({ attribute: !1 })
], ze.prototype, "layout", 2);
ut([
  oe({ attribute: !1 })
], ze.prototype, "selectedId", 2);
ut([
  D()
], ze.prototype, "_t", 2);
ut([
  D()
], ze.prototype, "_live", 2);
ze = ut([
  ct("modux-figma")
], ze);
var Wl = Object.defineProperty, Gl = Object.getOwnPropertyDescriptor, W = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Gl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Wl(t, i, n), n;
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
  const s = i.x - i.w / 2, n = i.x + i.w / 2, r = i.y - i.h / 2, d = i.y + i.h / 2;
  let o = 0, a = 1;
  const l = t.x - e.x, u = t.y - e.y;
  for (const [m, f] of [
    [-l, e.x - s],
    [l, n - e.x],
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
function jl(e, t, i = 28) {
  var l;
  const s = new Map(e.nodes.map((u) => [u.id, u])), n = (u) => {
    var f;
    const m = /* @__PURE__ */ new Set();
    for (let h = u; h; h = (f = s.get(h)) == null ? void 0 : f.parentId) m.add(h);
    return m;
  }, r = e.nodes, d = (u) => u.parentId ? Math.min(i, 6) : i, o = /* @__PURE__ */ new Map(), a = (u, m, f) => {
    const h = d(f), y = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, w = f.w / 2 + h * 1.5, v = f.h / 2 + h * 1.5, x = { x: f.x - w, y: f.y - v }, I = { x: f.x + w, y: f.y - v }, C = { x: f.x - w, y: f.y + v }, P = { x: f.x + w, y: f.y + v }, z = [];
    for (const g of [x, I, C, P])
      !bt(u, g, y) && !bt(g, m, y) && z.push([g]);
    for (const [g, k] of [
      [x, I],
      [I, x],
      [I, P],
      [P, I],
      [P, C],
      [C, P],
      [C, x],
      [x, C]
    ])
      !bt(u, g, y) && !bt(k, m, y) && z.push([g, k]);
    return z;
  };
  for (const u of e.edges) {
    if ((l = t[u.id]) != null && l.length) continue;
    const m = s.get(u.sourceId), f = s.get(u.targetId);
    if (!m || !f) continue;
    const h = /* @__PURE__ */ new Set([...n(m.id), ...n(f.id)]), y = [
      { x: m.x, y: m.y },
      { x: f.x, y: f.y }
    ];
    for (let w = 0; w < 12; w++) {
      let v = !1;
      e: for (let x = 0; x < y.length - 1; x++)
        for (const I of r) {
          if (h.has(I.id)) continue;
          const C = d(I), P = { x: I.x, y: I.y, w: I.w + 2 * C, h: I.h + 2 * C };
          if (!bt(y[x], y[x + 1], P)) continue;
          const z = a(y[x], y[x + 1], I);
          if (!z.length) continue;
          const g = (S) => r.some(
            (E) => E !== I && !h.has(E.id) && Math.abs(S.x - E.x) < E.w / 2 + d(E) / 2 && Math.abs(S.y - E.y) < E.h / 2 + d(E) / 2
          ), k = (S) => {
            let E = 0;
            const U = [y[x], ...S, y[x + 1]];
            for (let N = 0; N < U.length - 1; N++)
              E += Math.hypot(U[N + 1].x - U[N].x, U[N + 1].y - U[N].y);
            return E + (S.some(g) ? 1e4 : 0);
          };
          z.sort((S, E) => k(S) - k(E)), y.splice(x + 1, 0, ...z[0]), v = !0;
          break e;
        }
      if (!v) break;
    }
    y.length > 2 && o.set(
      u.id,
      y.slice(1, -1).map((w) => ({ x: Math.round(w.x), y: Math.round(w.y) }))
    );
  }
  return o;
}
const X = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
function Kl(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let B = class extends Se {
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
      const s = this.renderRoot.querySelector("modux-canvas"), n = (r) => {
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
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = Vt(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = Vt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const r = this.viewLayout("context-map"), d = this.sceneFor("context-map").nodes.filter((u) => !u.parentId), o = zi(d), a = [...o.keys()].map((u) => ({
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
    var t, i, s, n, r, d;
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
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
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
        const o = (n = (s = (this.model.rags ?? []).find((a) => a.id === e.sourceId)) == null ? void 0 : s.contentSources) == null ? void 0 : n.find((a) => a.uri === e.uri);
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, r = this.viewLayout(n), d = r.nodes[t] ?? null;
    let o = { x: i, y: s };
    const a = this.sceneFor(n), l = a.nodes.find((m) => m.id === t);
    if (l != null && l.parentId) {
      const m = a.nodes.find((f) => f.id === l.parentId);
      m && (o = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...r, nodes: { ...r.nodes, [t]: o } });
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t) ?? (this.model.proxyApis ?? []).find((y) => y.id === t);
    if (!r || i && !this.model.externalSystems.some((y) => y.id === i)) return;
    const d = r.publishedByExternalSystemId ?? "", o = i ?? "";
    if (o === d) return;
    const a = this._view, l = this.viewLayout(a), u = this.sceneFor(a), m = o ? u.nodes.find((y) => y.id === o) : void 0, f = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, h = [
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, r = (this.model.apis ?? []).find((y) => y.id === t), d = this.model.externalSystems.find((y) => y.id === i);
    if (!r || !d || (this.model.proxyApis ?? []).some(
      (y) => y.targetApiId === t && y.publishedByExternalSystemId === i
    )) return;
    const a = `proxy-${X(r.name)}-${X(d.name)}`;
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
      nodes: { ...u.nodes, [a]: { x: s - f.x, y: n - f.y } }
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
    const s = await i.text(), n = this.selectedApiId(), r = n ? null : ((a = this.model.externalSystems.find((u) => u.id === this._selectedId)) == null ? void 0 : a.id) ?? null, d = n || r ? null : ((l = this.model.modules.find((u) => u.id === this._selectedId)) == null ? void 0 : l.id) ?? null;
    if (!n && !r && !d) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: n,
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
    const { id: t } = e.detail, i = this._view, s = this.viewLayout(i), n = new Set(s.collapsed ?? []);
    n.has(t) ? n.delete(t) : n.add(t), this.writeViewLayout(i, { ...s, collapsed: [...n] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), r = { ...s.nodes }, d = [];
    for (const { id: o, x: a, y: l } of t) {
      d.push({ kind: "move-node", view: i, id: o, pos: s.nodes[o] ?? null });
      let u = { x: a, y: l };
      const m = n.nodes.find((f) => f.id === o);
      if (m != null && m.parentId) {
        const f = n.nodes.find((h) => h.id === m.parentId);
        f && (u = { x: a - f.x, y: l - f.y });
      }
      r[o] = u;
    }
    if (this.writeViewLayout(i, { ...s, nodes: r }), i === "processes")
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
    const { id: t, x: i, y: s, w: n, h: r } = e.detail, d = this._view, o = this.viewLayout(d), a = this.sceneFor(d).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: d, id: t, size: ((u = o.sizes) == null ? void 0 : u[t]) ?? null },
      { kind: "move-node", view: d, id: t, pos: o.nodes[t] ?? null },
      ...a.map((m) => ({ kind: "move-node", view: d, id: m.id, pos: o.nodes[m.id] ?? null }))
    ]);
    const l = { ...o.nodes, [t]: { x: i, y: s } };
    for (const m of a) l[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(d, {
      ...o,
      nodes: l,
      sizes: { ...o.sizes ?? {}, [t]: { w: n, h: r } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, n = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: n.edges[t] ?? null }
    ]);
    const r = { ...n.edges };
    i.length ? r[t] = i : delete r[t], this.writeViewLayout(s, { ...n, edges: r });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = ts(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((d) => [d.id, d.x])), n = [...t.steps].sort(
      (d, o) => (s.get(d.id) ?? 0) - (s.get(o.id) ?? 0)
    );
    if (n.every((d, o) => d.id === t.steps[o].id)) return null;
    const r = n.findIndex((d) => d.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: r > 0 ? n[r - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: n } = e.detail;
    this.applyConnection(t, i, s, n);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s) {
    var P, z;
    if (this._view === "workflows") {
      const g = this.owningWorkflowOf(e), k = this.owningWorkflowOf(t);
      if (!g || g !== k || e === t) return;
      const S = g.steps.find((E) => E.id === t);
      if (((S == null ? void 0 : S.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: g.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const g = this.model.pages ?? [], k = this.model.uiApps ?? [], S = (O) => k.some((L) => L.id === O), E = (O) => g.some((L) => L.id === O);
      if (E(e) && S(t)) {
        const O = g.find((L) => L.id === e);
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: O.name,
          pageId: e,
          itemId: this.newMenuItemId(O.name)
        });
        return;
      }
      const U = xe(e) ?? xe(t);
      if (U) {
        const O = xe(e) ? e : t, L = xe(e) ? t : e;
        if (((P = this.sceneFor("ui").nodes.find(($) => $.id === O)) == null ? void 0 : P.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const p = this.model.modules.some(
          ($) => ($.useCases ?? []).some((T) => T.id === L)
        ), _ = (this.model.aggregates ?? []).some(($) => $.id === L), b = this.model.modules.flatMap(($) => $.queryServices ?? []).find(($) => ($.operations ?? []).some((T) => T.id === L));
        E(L) ? this.command({ kind: "set-menu-page", pageId: L, ...U }) : S(L) && L !== U.appId ? this.command({ kind: "set-menu-app", toAppId: L, ...U }) : p ? this.command({ kind: "set-menu-use-case", useCaseId: L, ...U }) : _ ? this.command({ kind: "set-menu-aggregate", aggregateId: L, ...U }) : b && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: b.id,
          queryOperationId: L,
          ...U
        });
        return;
      }
      if ((this.model.actors ?? []).some((O) => O.id === e) && S(t)) {
        (this.model.actorAppUses ?? []).some((O) => O.actorId === e && O.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const N = E(e) ? { pageId: e, other: t } : E(t) ? { pageId: t, other: e } : null;
      if (N) {
        const O = new Set(
          this.model.modules.flatMap((_) => (_.useCases ?? []).map((b) => b.id))
        ), L = new Set(
          this.model.modules.flatMap((_) => (_.queryServices ?? []).map((b) => b.id))
        ), p = g.find((_) => _.id === N.pageId);
        O.has(N.other) ? (p.buttons ?? []).some((_) => _.useCaseId === N.other) || this.command({ kind: "add-page-button", pageId: N.pageId, useCaseId: N.other }) : L.has(N.other) && this.command({ kind: "set-page-listing", pageId: N.pageId, queryServiceId: N.other });
      }
      return;
    }
    if (this._view !== "context-map") return;
    const n = /^apiop:(.+)@(.+)$/.exec(e);
    if (n) {
      const [, g, k] = n, S = (this.model.proxyApis ?? []).find((L) => L.id === k), E = (S == null ? void 0 : S.targetApiId) ?? ((z = (this.model.apiImplementations ?? []).find(
        (L) => L.moduleId === k && (this.model.apis ?? []).some(
          (p) => p.id === L.apiId && p.operations.some((_) => _.id === g)
        )
      )) == null ? void 0 : z.apiId);
      if (!E) return;
      if (new Set(
        this.model.modules.flatMap((L) => (L.useCases ?? []).map((p) => p.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: E,
          operationId: g,
          moduleId: k,
          targetUseCaseId: t
        });
        return;
      }
      if (!(S != null && S.targetApiId)) return;
      let N = null;
      if (t === S.targetApiId)
        N = S.targetApiId;
      else {
        const L = /^apiimpl:(.+)@(.+)$/.exec(t);
        L && L[1] === S.targetApiId ? N = L[2] : this.model.modules.some((p) => p.id === t) && (this.model.apiImplementations ?? []).some(
          (p) => p.apiId === S.targetApiId && p.moduleId === t
        ) && (N = t);
      }
      if (!N) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (L) => L.proxyId === S.id && L.operationId === g && L.targetSiteId === N
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: S.id,
        operationId: g,
        targetSiteId: N
      });
      return;
    }
    const r = new Set((this.model.aiAgents ?? []).map((g) => g.id));
    if (r.has(e)) {
      if (new Set(
        this.model.modules.flatMap((N) => (N.useCases ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (O) => O.agentId === e && O.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((N) => (N.useCases ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (O) => O.agentId === e && O.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((N) => (N.mcpServers ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (O) => O.agentId === e && O.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((N) => N.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (O) => O.agentId === e && O.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((N) => N.operations.map((O) => O.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (O) => O.agentId === e && O.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((N) => N.id === t) || (this.model.proxyApis ?? []).some((N) => N.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (O) => O.agentId === e && O.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((N) => (N.queryServices ?? []).map((O) => O.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (O) => O.agentId === e && O.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (r.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (O) => O.agentId === e && O.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((N) => N.id === t) && ((this.model.agentRags ?? []).some(
        (O) => O.agentId === e && O.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((g) => g.id === e)) {
      const g = (this.model.mcpGateways ?? []).find((E) => E.id === e), k = this.model.externalSystems.some((E) => (E.mcpServers ?? []).some((U) => U.id === t)) || (this.model.apis ?? []).some((E) => E.id === t) || (this.model.apis ?? []).some((E) => E.operations.some((U) => U.id === t)) || this.model.modules.some((E) => (E.useCases ?? []).some((U) => U.id === t)) || (this.model.rags ?? []).some((E) => E.id === t), S = [
        ...g.mcpServerIds ?? [],
        ...g.apiIds ?? [],
        ...g.apiOperationIds ?? [],
        ...g.useCaseIds ?? [],
        ...g.ragIds ?? []
      ].includes(t);
      k && !S && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((g) => g.id === t)) return;
    const d = (this.model.rags ?? []).find((g) => g.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.readModels ?? []).map((E) => E.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.tables ?? []).map((E) => E.id))
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
    if ((this.model.rags ?? []).some((g) => g.id === t)) return;
    if ((this.model.workflows ?? []).some((g) => g.id === e)) {
      const g = (this.model.workflows ?? []).find((E) => E.id === e), k = (this.model.workflows ?? []).find(
        (E) => E.id === t && E.id !== e
      );
      if (k) {
        const E = g.onCompletionEventName || `${g.name.replace(/\s+/g, "")}Completado`;
        k.triggerEvent !== E && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: E });
        return;
      }
      const S = this.model.modules.flatMap((E) => E.useCases ?? []).find((E) => E.id === t);
      if (S && !(g.steps ?? []).some((U) => U.targetUseCaseId === t)) {
        const U = `wfs-${X(S.name)}`;
        let N = U;
        for (let O = 2; (g.steps ?? []).some((L) => L.id === N); O++)
          N = `${U}-${O}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: N,
          name: S.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((g) => g.id === t)) {
      const g = this.model.modules.flatMap((E) => E.domainEvents ?? []).find((E) => E.id === e), k = this.model.modules.flatMap((E) => E.applicationEvents ?? []).find((E) => E.id === e), S = g ?? k;
      if (S) {
        const E = (this.model.emissions ?? []).find((L) => L.domainEventId === e), U = new Set((this.model.aggregates ?? []).map((L) => L.id)), N = new Set(
          this.model.modules.flatMap((L) => (L.domainServices ?? []).map((p) => p.id))
        ), O = new Set(
          this.model.modules.flatMap((L) => (L.useCases ?? []).map((p) => p.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: S.name,
          triggerAggregateId: E && U.has(E.sourceId) ? E.sourceId : void 0,
          triggerDomainServiceId: E && N.has(E.sourceId) ? E.sourceId : void 0,
          triggerUseCaseId: E && O.has(E.sourceId) ? E.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((g) => g.id === e)) {
      const g = (this.model.proxyApis ?? []).find((k) => k.id === e);
      if ((this.model.apis ?? []).some((k) => k.id === t)) {
        g.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
        if (!g.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (S) => S.apiId === g.targetApiId && S.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: g.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((k) => k.id === t) && g.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((g) => g.id === e)) {
      if (this.model.externalSystems.some((g) => g.id === t)) {
        (this.model.apis ?? []).find((k) => k.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((g) => g.id === t) && ((this.model.apiImplementations ?? []).some(
        (k) => k.apiId === e && k.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const o = new Set((this.model.actors ?? []).map((g) => g.id));
    if (r.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((k) => (k.domainEvents ?? []).map((S) => S.id)),
        ...this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map((S) => S.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (S) => S.eventId === e && S.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!o.has(e)) return;
    }
    if (o.has(e)) {
      const g = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((E) => E.id))
      ), k = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((E) => E.id))
      );
      if (g.has(t) || k.has(t)) {
        (this.model.actorUses ?? []).some(
          (E) => E.actorId === e && E.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((S) => S.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (E) => E.actorId === e && E.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((S) => S.id === t)) {
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
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((S) => S.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: a.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
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
    const l = this.model.externalSystems.flatMap((g) => g.useCases ?? []).find((g) => g.id === e), u = this.model.externalSystems.flatMap((g) => g.tables ?? []).find((g) => g.id === e);
    if (l || u) {
      const g = (l ?? u).name, k = l ? { externalUseCaseId: e } : { externalTableId: e }, S = (N) => l ? N.sourceExternalUseCaseId === e : N.sourceExternalTableId === e, E = this.model.modules.flatMap((N) => N.readModels ?? []).find((N) => N.id === t);
      if (E) {
        (this.model.projections ?? []).some(
          (O) => S(O) && O.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${X(g)}-${X(E.name)}`,
          name: `${E.name}Projection`,
          ...k,
          targetId: t
        });
        return;
      }
      const U = this.model.modules.find((N) => N.id === t);
      if (U) {
        (this.model.projections ?? []).some(
          (O) => S(O) && O.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${X(g)}-${X(U.name)}`,
          name: `${g}ViewProjection`,
          ...k,
          moduleId: t,
          readModelName: `${g}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((g) => g.id === e);
    if (m) {
      const g = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === t);
      if (g) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${X(m.name)}-${X(g.name)}`,
          name: `${g.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const k = this.model.modules.find((S) => S.id === t);
      if (k) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${X(m.name)}-${X(k.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const f = new Set(
      this.model.modules.flatMap((g) => (g.domainEvents ?? []).map((k) => k.id))
    ), h = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((g) => g.id),
      ...this.model.modules.flatMap((g) => (g.domainServices ?? []).map((k) => k.id))
    ]), y = new Set(
      this.model.modules.flatMap((g) => (g.applicationEvents ?? []).map((k) => k.id))
    ), w = new Set(this.model.modules.flatMap((g) => (g.useCases ?? []).map((k) => k.id))), v = new Set(
      this.model.modules.flatMap((g) => (g.queryServices ?? []).map((k) => k.id))
    );
    if (w.has(e) && v.has(t)) {
      (this.model.queryCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap((g) => (g.useCases ?? []).map((k) => k.id))
    );
    if (w.has(e) && x.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (w.has(e) && w.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    if (w.has(e) && (this.model.aggregates ?? []).some((g) => g.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (h.has(e) && f.has(t) || w.has(e) && y.has(t)) {
      (this.model.emissions ?? []).some(
        (k) => k.sourceId === e && k.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (f.has(e) || y.has(e)) {
      const g = y.has(e), k = this.model.modules.flatMap(($) => (g ? $.applicationEvents : $.domainEvents) ?? []).find(($) => $.id === e), S = this.model.modules.flatMap(($) => ($.useCases ?? []).map((T) => ({ u: T, module: $ }))).find(({ u: $ }) => $.id === t), E = this.model.modules.flatMap(($) => ($.readModels ?? []).map((T) => ({ rm: T, module: $ }))).find(({ rm: $ }) => $.id === t), U = this.model.modules.find(($) => $.id === t) ?? (E == null ? void 0 : E.module) ?? (S == null ? void 0 : S.module);
      if (!k || !U) return;
      const N = new Set((this.model.aggregates ?? []).map(($) => $.id)), O = new Set(
        this.model.modules.flatMap(($) => ($.domainServices ?? []).map((T) => T.id))
      ), L = (this.model.emissions ?? []).find(
        ($) => $.domainEventId === e && (g ? w.has($.sourceId) : N.has($.sourceId) || O.has($.sourceId))
      );
      if (!L) {
        this.emit("modux-notice", {
          message: g ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const p = !g && N.has(L.sourceId);
      if (S) {
        if (this.model.flows.some(
          (T) => T.archetype === "TRIGGERS" && T.triggerEvent === k.name && T.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${X(k.name)}-${X(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: p ? L.sourceId : "",
          triggerDomainServiceId: !g && !p ? L.sourceId : void 0,
          triggerUseCaseId: g ? L.sourceId : void 0,
          triggerEvent: k.name,
          targetId: U.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const _ = (E == null ? void 0 : E.rm.name) ?? `${k.name}View`;
      if (this.model.flows.some(
        ($) => $.archetype === "MATERIALIZES" && $.triggerEvent === k.name && $.targetId === U.id && $.readModelName === _
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${X(k.name)}-${X(_)}`,
        name: _,
        archetype: "MATERIALIZES",
        triggerAggregateId: p ? L.sourceId : "",
        triggerDomainServiceId: !g && !p ? L.sourceId : void 0,
        triggerUseCaseId: g ? L.sourceId : void 0,
        triggerEvent: k.name,
        targetId: U.id,
        readModelName: _
      });
      return;
    }
    const I = /* @__PURE__ */ new Set([
      ...h,
      ...w,
      ...v,
      ...this.model.modules.flatMap((g) => (g.readModels ?? []).map((k) => k.id))
    ]);
    if (I.has(e) || I.has(t) || f.has(t) || y.has(t))
      return;
    const C = new Set(this.model.externalSystems.map((g) => g.id));
    if (C.has(e)) {
      if (new Set(
        this.model.modules.flatMap((U) => (U.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (N) => N.externalSystemId === e && N.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (C.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const k = (this.model.apis ?? []).find(
        (U) => U.operations.some((N) => N.id === t)
      ), S = /^apiop:(.+)@(.+)$/.exec(t), E = k ? { operationId: t, siteId: k.id } : S ? { operationId: S[1], siteId: S[2] } : null;
      if (E) {
        (this.model.externalOperationUses ?? []).some(
          (N) => N.externalSystemId === e && N.operationId === E.operationId && N.siteId === E.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: E.operationId,
          targetSiteId: E.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((U) => U.id === t) || (this.model.proxyApis ?? []).some((U) => U.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (N) => N.sourceId === e && N.targetId === t
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
      const n = this.memberIdOf(i, s), r = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
      if (n && (r != null && r.memberIds.includes(n))) {
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
        if (n = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] });
        else if (n = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: n[1], queryServiceId: null });
        else if (n = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: n[1], modelId: null });
        else if (n = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: n[1], appId: n[2] });
        else if (n = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const r = xe(n[1]);
          r && this.command({ kind: "set-menu-page", pageId: null, ...r });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const r = xe(n[1]);
          r && this.command({ kind: "set-menu-app", toAppId: null, ...r });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const r = xe(n[1]);
          r && this.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const r = xe(n[1]);
          r && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const r = xe(n[1]);
          r && this.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...r });
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
        const n = xe(t);
        n && this.command({ kind: "remove-menu-item", ...n });
        return;
      }
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const n = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      const r = this.owningWorkflowOf(n[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
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
      const [, r, d] = n, o = (s = (this.model.apis ?? []).find(
        (a) => a.operations.some((l) => l.id === r)
      )) == null ? void 0 : s.id;
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: o, operationId: r, moduleId: d });
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
      const [, r, d, o] = n, a = /^apiimpl:.+@(.+)$/.exec(o), l = a ? a[1] : o;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: d, operationId: r, targetSiteId: l });
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
      const n = /^apiwire:(.+)$/.exec(t), r = n ? this.owningApiOf(n[1]) : null;
      if (!n || !r) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: r.id, id: n[1] });
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
      if (!n || !(this.model.proxyApis ?? []).some((r) => r.id === n[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: n[1], targetId: "" });
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
      id: `step-${X(e)}`,
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
      id: `wfstep-${X(e)}`,
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
    const t = new Set(e.memberIds), i = (n, r, d = {}) => A`
      <label
        class="${d.child ? "child" : ""} ${d.implicit && !t.has(n) ? "implicit" : ""}"
        title=${d.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(o) => this.toggleViewMember(n, o.target.checked)}
        />
        ${r}
      </label>
    `, s = (n, r) => r.length ? A`<h4>${n}</h4>${r}` : "";
    return A`
      <aside class="view-tree" @pointerdown=${(n) => n.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((n) => [
        i(n.id, n.name),
        ...(this.model.aggregates ?? []).filter((r) => r.moduleId === n.id).map((r) => i(r.id, r.name, { child: !0, implicit: t.has(n.id) }))
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
  memberIdsFromSelection() {
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this._multi) {
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
            t.add(i);
            break;
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
    const i = `view-${X(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((a) => t.has(a.id)), s = new Set(i.map((a) => a.id)), n = this.model.externalSystems.filter((a) => t.has(a.id)), r = new Set(n.map((a) => a.id)), d = (this.model.aggregates ?? []).filter(
      (a) => t.has(a.id) || s.has(a.moduleId)
    ), o = new Set(d.map((a) => a.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (a) => s.has(a.sourceId) && s.has(a.targetId)
      ),
      flows: this.model.flows.filter(
        (a) => t.has(a.id) || (s.has(a.sourceId) || r.has(a.sourceId)) && (s.has(a.targetId) || r.has(a.targetId))
      ),
      aggregates: d,
      entities: (this.model.entities ?? []).filter((a) => o.has(a.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (a) => o.has(a.sourceAggregateId) && o.has(a.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (a) => t.has(a.id) || (a.ownerModuleId ? s.has(a.ownerModuleId) : !1)
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
    const t = e.detail.kind === "process-step" ? Kl(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Xl(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (r) => {
      for (const d of r ?? [])
        d.id && t.add(d.id), i(d.children);
    };
    (this.model.uiApps ?? []).forEach((r) => i(r.menuItems));
    const s = `mi-${X(e)}`;
    let n = s;
    for (let r = 2; t.has(n); r++) n = `${s}-${r}`;
    return n;
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return A`<modux-figma
      .pages=${this.model.pages ?? []}
      .layout=${e.nodes}
      .selectedId=${this._selectedId}
      @node-moved=${this.onNodeMoved}
      @element-selected=${this.onElementSelected}
      @page-open-crud=${(t) => {
      this.emit("modux-activate", { elementType: "page", id: t.detail.pageId });
    }}
      @page-field-config-changed=${(t) => {
      const { pageId: i, fieldId: s, stereotype: n, colspan: r, label: d } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: r, label: d });
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
            (n) => (n.operations ?? []).map((r) => ({ id: r.id, name: `${r.name} (${n.name})` }))
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
    var d;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), n = i.nodeIdAtClient(e.clientX, e.clientY);
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      return;
    }
    r.new ? this.createFromPalette(r.new, s, n) : r.existing && this.placeExistingFromPalette(r.existing, s, n, e.clientX, e.clientY);
  }
  /** A name (and slug id) that does not collide with anything already in the model. */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((n) => n.id)), s = this.model;
    for (const n of [
      s.modules.map((r) => r.id),
      (s.actors ?? []).map((r) => r.id),
      s.externalSystems.map((r) => r.id),
      (s.apis ?? []).map((r) => r.id),
      (s.proxyApis ?? []).map((r) => r.id),
      (s.aiAgents ?? []).map((r) => r.id),
      (s.rags ?? []).map((r) => r.id),
      (s.workflows ?? []).map((r) => r.id),
      (s.workflows ?? []).flatMap((r) => (r.steps ?? []).map((d) => d.id)),
      (s.uiApps ?? []).map((r) => r.id),
      (s.pages ?? []).map((r) => r.id)
    ])
      n.forEach((r) => i.add(r));
    for (let n = 1; ; n++) {
      const r = n === 1 ? e : `${e} ${n}`, d = `${t}${X(r)}`;
      if (!i.has(d)) return { id: d, name: r };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var r, d;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let o = t; o; )
      s.push(o), o = (r = i.nodes.find((a) => a.id === o)) == null ? void 0 : r.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service"
    ].includes(e)) return s.find((o) => this.model.modules.some((a) => a.id === o)) ?? null;
    if (e === "read-model") {
      const o = s.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (o) return o;
      const a = s.find((l) => this.model.modules.some((u) => u.id === l));
      return ((d = (this.model.aggregates ?? []).find((l) => l.moduleId === a)) == null ? void 0 : d.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((o) => this.model.externalSystems.some((a) => a.id === o)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (o) => this.model.modules.some((a) => (a.useCases ?? []).some((l) => l.id === o))
      ) ?? null;
    if (e === "api-operation") {
      for (const o of s) {
        if ((this.model.apis ?? []).some((u) => u.id === o)) return o;
        const a = /^apiimpl:(.+)@(.+)$/.exec(o);
        if (a && (this.model.apis ?? []).some((u) => u.id === a[1])) return a[1];
        const l = (this.model.proxyApis ?? []).find((u) => u.id === o);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((o) => this.model.externalSystems.some((a) => a.id === o)) ?? s.find((o) => this.model.modules.some((a) => a.id === o)) ?? null : null;
  }
  createFromPalette(e, t, i) {
    var u, m, f;
    const s = B.PALETTE_NEW.find((h) => h.type === e);
    if (!s) return;
    const n = this._view, r = this.sceneFor(n), d = (h, y) => {
      const w = this.viewLayout(n), v = y ? r.nodes.find((I) => I.id === y) : void 0, x = v ? { x: Math.round(t.x - v.x), y: Math.round(t.y - v.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(n, { ...w, nodes: { ...w.nodes, [h]: x } }), { kind: "move-node", view: n, id: h, pos: null };
    }, o = (h, y, w) => {
      const v = this.inverseOf(h) ?? [];
      this.command(h, !1);
      const x = d(y, w);
      this.pushUndoEntry([...v, x]);
    };
    if (!s.child) {
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
      }, { id: y, name: w } = this.uniquePaletteName(s.label, h[e] ?? ""), v = e === "module" ? { kind: "add-module", id: y, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: y, name: w } : e === "external-system" ? { kind: "add-external-system", id: y, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: y, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: y, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: y, name: w } : e === "rag" ? { kind: "add-rag", id: y, name: w } : e === "api" ? { kind: "add-api", id: y, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: y, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: y, name: w } : {
        kind: "add-workflow",
        id: y,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      o(v, y);
      return;
    }
    if (e === "page") {
      const { id: h, name: y } = this.uniquePaletteName("Página", "page-"), w = [];
      for (let x = i ?? void 0; x; )
        w.push(x), x = (u = r.nodes.find((I) => I.id === x)) == null ? void 0 : u.parentId;
      const v = w.find((x) => (this.model.uiApps ?? []).some((I) => I.id === x));
      if (v) {
        const x = r.nodes.find((I) => I.id === v);
        x && (t.x = x.x + x.w / 2 + 160, t.y = x.y - x.h / 2 + 40);
      }
      o(
        v ? { kind: "create-ui-page", id: h, name: y, pageType: "FORM", appId: v, menuLabel: y } : { kind: "create-ui-page", id: h, name: y, pageType: "FORM" },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const h = [];
      for (let C = i ?? void 0; C; )
        h.push(C), C = (m = r.nodes.find((P) => P.id === C)) == null ? void 0 : m.parentId;
      const y = h.find((C) => (this.model.uiApps ?? []).some((P) => P.id === C));
      if (!y) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const w = /* @__PURE__ */ new Set(), v = (C) => {
        for (const P of C ?? [])
          w.add(P.label), v(P.children);
      };
      (this.model.uiApps ?? []).forEach((C) => v(C.menuItems));
      let x = "Entrada";
      for (let C = 2; w.has(x); C++) x = `Entrada ${C}`;
      const I = h.map((C) => xe(C)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: y,
        label: x,
        itemId: this.newMenuItemId(x),
        parentId: I == null ? void 0 : I.itemId,
        parentLabel: I != null && I.itemId || I == null ? void 0 : I.label
      });
      return;
    }
    if (e === "workflow-step") {
      const h = this.model.workflows ?? [], y = [];
      for (let P = i ?? void 0; P; )
        y.push(P), P = (f = r.nodes.find((z) => z.id === P)) == null ? void 0 : f.parentId;
      const w = y.map((P) => h.find((z) => z.id === P)).find(Boolean), v = y.map((P) => {
        const z = h.find((g) => (g.steps ?? []).some((k) => k.id === P));
        return z ? { owner: z, stepId: P } : null;
      }).find(Boolean), x = w ?? (v == null ? void 0 : v.owner);
      if (!x) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: I, name: C } = this.uniquePaletteName("Paso", "wfs-");
      v && (t = { x: t.x + 190, y: t.y }), o(
        {
          kind: "add-workflow-step",
          workflowId: x.id,
          id: I,
          name: C,
          ...v ? { dependsOnStepIds: [v.stepId], afterStepId: v.stepId } : {}
        },
        I
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
      const { id: y, name: w } = this.uniquePaletteName("API", "api-"), v = { kind: "add-api", id: y, name: w }, x = this.inverseOf(v) ?? [];
      this.command(v, !1), this.model.externalSystems.some((z) => z.id === h) ? this.command({ kind: "set-api-publisher", id: y, targetId: h }, !1) : this.command({ kind: "add-api-implementation", apiId: y, moduleId: h }, !1);
      const I = this.viewLayout(this._view), C = this.sceneFor(this._view).nodes.find((z) => z.id === h), P = C ? { x: Math.round(t.x - C.x), y: Math.round(t.y - C.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...I, nodes: { ...I.nodes, [y]: P } }), this.pushUndoEntry([...x, { kind: "move-node", view: this._view, id: y, pos: null }]);
      return;
    }
    const a = this.dropContainerFor(e, i);
    if (!a) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { name: l } = this.uniquePaletteName(s.label, "");
    if (e === "aggregate") {
      const h = `agg-${X(l)}`;
      o({ kind: "add-aggregate", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "use-case" || e === "policy") {
      const h = `uc-${X(l)}`;
      o(
        { kind: "add-use-case", id: h, name: l, moduleId: a, ...e === "policy" ? { policy: !0 } : {} },
        h,
        a
      );
    } else if (e === "domain-event") {
      const h = `ev-${X(l)}`;
      o({ kind: "add-domain-event", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "application-event") {
      const h = `aev-${X(l)}`;
      o({ kind: "add-application-event", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "domain-service") {
      const h = `ds-${X(l)}`;
      o({ kind: "add-domain-service", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "query-service") {
      const h = `qs-${X(l)}`;
      o({ kind: "add-query-service", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "read-model") {
      const h = `rm-${X(l)}`, y = (this.model.aggregates ?? []).find((w) => w.id === a);
      o({ kind: "add-read-model", id: h, name: l, aggregateId: a }, h, (y == null ? void 0 : y.moduleId) ?? a);
    } else if (e === "api-operation") {
      const h = (this.model.apis ?? []).find((I) => I.id === a), y = new Set(((h == null ? void 0 : h.operations) ?? []).map((I) => I.id));
      let w = l, v = `apiop-${a.replace(/^api-/, "")}-${X(w)}`;
      for (let I = 2; y.has(v); I++)
        w = `${s.label} ${I}`, v = `apiop-${a.replace(/^api-/, "")}-${X(w)}`;
      o({ kind: "add-api-operation", apiId: a, id: v, name: w }, v, a), r.nodes.some(
        (I) => I.parentId === a && (I.kind === "api-operation" || I.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(h == null ? void 0 : h.name) ?? a} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const h = this.model.modules.flatMap((x) => x.useCases ?? []).find((x) => x.id === a), y = new Set((h == null ? void 0 : h.stepIds) ?? []);
      let w = l, v = `step-${X(w)}`;
      for (let x = 2; y.has(v); x++)
        w = `${s.label} ${x}`, v = `step-${X(w)}`;
      o({ kind: "add-use-case-step", useCaseId: a, id: v, name: w }, v, a), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(h == null ? void 0 : h.name) ?? a} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else if (e === "external-use-case") {
      const h = `xuc-${X(l)}`;
      o({ kind: "add-external-use-case", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "external-table") {
      const h = `tbl-${X(l)}`;
      o({ kind: "add-external-table", id: h, name: l, moduleId: a }, h, a);
    } else if (e === "mcp-server") {
      const h = `mcpsrv-${X(l)}`;
      o({ kind: "add-mcp-server", id: h, name: l, moduleId: a }, h, a);
    }
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  placeExistingFromPalette(e, t, i, s, n) {
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
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
    const e = this._paletteFilter.trim().toLowerCase(), t = B.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "page", "menu-item"].includes(s.type) : !["ui-app", "page", "menu-item"].includes(s.type)) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return A`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? A`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${t.map(
      (s) => A`
                    <div
                      class="palette-item ${s.child ? "palette-child" : ""}"
                      draggable="true"
                      title=${s.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : s.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                      @dragstart=${(n) => this.onPaletteDragStart(n, { new: s.type })}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                        ${st[s.symbol]}
                      </svg>
                      <span class="pal-label">${s.label}</span>
                    </div>
                  `
    )}
              ` : A`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => A`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (n) => A`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(r) => this.onPaletteDragStart(r, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${st[s.symbol]}
                          </svg>
                          <span class="pal-label">${n.name}</span>
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
    var t, i, s, n, r, d, o;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const a = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!a) return;
        this.command({ kind: "add-aggregate", id: `agg-${X(e)}`, name: e, moduleId: a });
      } else if (this._view === "flows") {
        const a = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), l = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), u = this._newTriggerEvent.trim();
        if (!a || !l || !u) return;
        this.command({
          kind: "add-flow",
          id: `flow-${X(e)}`,
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
          id: `proc-${X(e)}`,
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
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? oo(i, t.nodes) : e === "flows" ? fo(i, t.nodes) : e === "processes" ? ts(i, t.nodes) : e === "workflows" ? El(i, t.nodes) : e === "ui" ? Nl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "eventstorming" ? vl(i, t.nodes) : Zn(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const n of s.nodes) {
        const r = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        r && (n.diffKind = r);
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
    var a;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId), s = new Set(i.map((l) => l.id)), n = {
      nodes: i,
      edges: t.edges.filter((l) => s.has(l.sourceId) && s.has(l.targetId))
    }, d = await Ol(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), o = this.viewLayout(e);
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
    var n;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, s = e.type === "click" && !!t.closest("button");
    !i && !s || (n = this.renderRoot.querySelector("modux-canvas")) == null || n.focus();
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
        var i, s;
        return A`<option
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
      ${this._view === "design" ? this.renderFigma() : this._tilt ? A`
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
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => A`
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
    return A`
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
      (s) => A`
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
B.styles = lt`
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
  { type: "menu-item", label: "Entrada de menú", child: !0, symbol: "process", color: "#0ea5e9" }
];
W([
  oe({ attribute: !1 })
], B.prototype, "model", 2);
W([
  oe({ attribute: !1 })
], B.prototype, "layout", 2);
W([
  oe({ attribute: !1 })
], B.prototype, "diff", 2);
W([
  D()
], B.prototype, "_view", 2);
W([
  D()
], B.prototype, "_detail", 2);
W([
  D()
], B.prototype, "_relationType", 2);
W([
  D()
], B.prototype, "_relationPicker", 2);
W([
  D()
], B.prototype, "_extDepPicker", 2);
W([
  D()
], B.prototype, "_selectedId", 2);
W([
  D()
], B.prototype, "_paletteOpen", 2);
W([
  D()
], B.prototype, "_paletteFilter", 2);
W([
  D()
], B.prototype, "_paletteTab", 2);
W([
  D()
], B.prototype, "_fullscreen", 2);
W([
  D()
], B.prototype, "_tilt", 2);
W([
  D()
], B.prototype, "_helpOpen", 2);
W([
  D()
], B.prototype, "_newName", 2);
W([
  D()
], B.prototype, "_newModuleId", 2);
W([
  D()
], B.prototype, "_newArchetype", 2);
W([
  D()
], B.prototype, "_newTriggerAggId", 2);
W([
  D()
], B.prototype, "_newTriggerEvent", 2);
W([
  D()
], B.prototype, "_newTargetId", 2);
W([
  D()
], B.prototype, "_undoStack", 2);
W([
  D()
], B.prototype, "_redoStack", 2);
W([
  D()
], B.prototype, "_newStepName", 2);
W([
  D()
], B.prototype, "_newStepType", 2);
W([
  D()
], B.prototype, "_newStepRole", 2);
W([
  D()
], B.prototype, "_newStepDeadline", 2);
W([
  D()
], B.prototype, "_editStepRole", 2);
W([
  D()
], B.prototype, "_editStepDeadline", 2);
W([
  D()
], B.prototype, "_editStepComp", 2);
W([
  D()
], B.prototype, "_newStepUseCase", 2);
W([
  D()
], B.prototype, "_newStepEmits", 2);
W([
  D()
], B.prototype, "_editStepUseCase", 2);
W([
  D()
], B.prototype, "_editStepEmits", 2);
W([
  D()
], B.prototype, "_editStepAwaits", 2);
W([
  D()
], B.prototype, "_multi", 2);
W([
  D()
], B.prototype, "_newViewName", 2);
W([
  D()
], B.prototype, "_activeViewId", 2);
W([
  D()
], B.prototype, "_newRagSourceType", 2);
W([
  D()
], B.prototype, "_newRagSourceUri", 2);
W([
  D()
], B.prototype, "_addMemberKey", 2);
W([
  D()
], B.prototype, "_treeOpen", 2);
W([
  D()
], B.prototype, "_deletePicker", 2);
B = W([
  ct("modux-editor")
], B);
var Ql = Object.defineProperty, Zl = Object.getOwnPropertyDescriptor, ge = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Zl(t, i) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (n = (s ? d(t, i, n) : d(n)) || n);
  return s && n && Ql(t, i, n), n;
};
let de = class extends Se {
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
    ], t = (s) => de.TYPE_LABELS[s] ?? s;
    return A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: r, cls: d }) => {
      const o = this._diff.changes.filter((a) => a.kind === s);
      return o.length ? A`
            <div class="diff-group">${n} (${o.length})</div>
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), s = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, s.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(s));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var n, r, d;
    const i = (n = this._workspace) == null ? void 0 : n.current;
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
    const s = (r = this._workspace) == null ? void 0 : r.current;
    if (s && s !== i) {
      const o = ((d = this._workspace.solutions.find((a) => a.branch === s)) == null ? void 0 : d.name) ?? s.replace(/^solution\//, "");
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
    const { content: t, fileName: i, apiId: s, homeExternalId: n, homeModuleId: r } = e.detail;
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
        const { apiId: o } = await d.json(), a = n ? { kind: "set-api-publisher", id: o, targetId: n } : r ? { kind: "add-api-implementation", apiId: o, moduleId: r } : null;
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
      const i = (s) => this._diff.changes.filter((n) => n.kind === s).length;
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
      var s;
      const i = (s = this._workspace.solutions.find(
        (n) => n.branch === this._workspace.current
      )) == null ? void 0 : s.status;
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
de.styles = lt`
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
de.TYPE_LABELS = {
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
  oe()
], de.prototype, "base", 2);
ge([
  D()
], de.prototype, "_model", 2);
ge([
  D()
], de.prototype, "_layout", 2);
ge([
  D()
], de.prototype, "_error", 2);
ge([
  D()
], de.prototype, "_saving", 2);
ge([
  D()
], de.prototype, "_toast", 2);
ge([
  D()
], de.prototype, "_workspace", 2);
ge([
  D()
], de.prototype, "_creatingSolution", 2);
ge([
  D()
], de.prototype, "_newSolutionName", 2);
ge([
  D()
], de.prototype, "_diff", 2);
ge([
  D()
], de.prototype, "_diffListOpen", 2);
ge([
  D()
], de.prototype, "_mergeFlow", 2);
de = ge([
  ct("modux-editor-connected")
], de);
export {
  Jl as CONTAINER_HEADER,
  ec as CONTAINER_INSET,
  ne as ModuxCanvas,
  B as ModuxEditor,
  de as ModuxEditorConnected,
  oo as aggregatesScene,
  Be as apiImplNodeId,
  He as apiOpOccurrenceId,
  Ei as containerFit,
  Vn as containerMinSize,
  Zn as contextMapScene,
  Xn as flowCoherence,
  fo as flowsScene,
  Vt as normalizeViewLayout,
  ts as processesScene,
  jn as relationEdgeId,
  zi as resolveOverlaps
};
