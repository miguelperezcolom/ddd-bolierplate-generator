const rc = 34, dc = 10;
function Ki(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let l = a + 1; l < e.length; l++) {
        const c = e[a], p = e[l], g = i.get(c.id), h = i.get(p.id), y = h.x - g.x, m = h.y - g.y, r = (c.w + p.w) / 2 + t - Math.abs(y), u = (c.h + p.h) / 2 + t - Math.abs(m);
        if (!(r <= 0 || u <= 0))
          if (o = !0, r < u) {
            const f = (y >= 0 ? 1 : -1) * r / 2;
            g.x -= f, h.x += f;
          } else {
            const f = (m >= 0 ? 1 : -1) * u / 2;
            g.y -= f, h.y += f;
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
function Ks(e, t = { w: 160, h: 90 }) {
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
function Di(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const l of i)
    s = Math.max(s, -l.dx + l.w / 2 + 10), n = Math.max(n, l.dx + l.w / 2 + 10), o = Math.max(o, -l.dy + l.h / 2 + 34), a = Math.max(a, l.dy + l.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (a - o) / 2,
    w: s + n,
    h: o + a
  };
}
function Zt(e) {
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
const Xs = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Qs = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Zs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, je = 168, Ye = 56;
function it(e, t) {
  return `apiimpl:${e}@${t}`;
}
function tt(e, t) {
  return `apiop:${e}@${t}`;
}
const cn = { compact: 0, coarse: 1, full: 2 };
function pn(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: cn[e ? t : s] > cn[n] };
}
function Kn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: it(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Xn = 34, Qn = 14, Js = 14, Pe = 108, Oe = 32, Zn = 12, Jn = 10, Lt = 2, eo = Lt * Pe + (Lt - 1) * Zn + 2 * Qn;
function to(e, t) {
  return `rel:${e}->${t}`;
}
function io(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function Et(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const no = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, es = {
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
  "scheduled-trigger": { symbol: "clock", fill: "#fffbeb", stroke: "#d97706" },
  "etl-flow": { symbol: "gear", fill: "#f0fdfa", stroke: "#0f766e" },
  notification: { symbol: "event", fill: "#fdf2f8", stroke: "#db2777" },
  document: { symbol: "readmodel", fill: "#f8fafc", stroke: "#475569" }
}, Li = {
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
  "scheduled-trigger": "Trigger programado (cron) — dispara un caso de uso",
  "etl-flow": "Integrador ETL — fuentes (pull/consumidor) → transformación → escrituras",
  notification: "Notificación — un evento la dispara y avisa a unos roles por un canal",
  document: "Documento/informe — plantilla rellenada por un modelo, o dataset de una consulta"
};
function zi(e) {
  const t = Math.max(1, Math.ceil(e / Lt)), i = t * Oe + (t - 1) * Jn;
  return { w: eo, h: Xn + i + Js };
}
function oi(e, t) {
  const i = e % Lt, s = Math.floor(e / Lt);
  return {
    x: -t.w / 2 + Qn + i * (Pe + Zn) + Pe / 2,
    y: -t.h / 2 + Xn + s * (Oe + Jn) + Oe / 2
  };
}
function so(e, t, i, s, n, o, a = !1) {
  const l = (e.aggregates ?? []).filter((p) => p.moduleId === t.id), c = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Kn(e, t.id),
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
    ),
    ...(e.etlFlows ?? []).filter((p) => p.ownerModuleId === t.id).map((p) => ({ id: p.id, name: p.name, kind: "etl-flow" })),
    ...(e.notifications ?? []).filter((p) => p.ownerModuleId === t.id).map((p) => ({ id: p.id, name: p.name, kind: "notification" })),
    ...(e.documents ?? []).filter((p) => p.ownerModuleId === t.id).map((p) => ({ id: p.id, name: p.name, kind: "document" }))
  ];
  if (!c.length)
    return [{ ...s, x: i.x, y: i.y, w: je, h: Ye }];
  if (a) {
    const p = new Map((e.apis ?? []).map((h) => [h.id, h])), g = (e.apiImplementations ?? []).filter((h) => h.moduleId === t.id && p.has(h.apiId)).map((h) => {
      const y = p.get(h.apiId);
      return {
        id: it(h.apiId, h.moduleId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((m) => ({
          id: tt(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (g.length > 0) {
      const h = c.filter((y) => y.kind !== "api-impl");
      return ts(i, s, g, h, n, o);
    }
  }
  return Pt(i, s, c, n, o);
}
function ts(e, t, i, s, n, o, a = /* @__PURE__ */ new Set()) {
  const l = o[t.id] ?? zi(i.length + s.length), c = i.map((m, r) => {
    const u = n[m.id] ?? oi(r, l), f = a.has(m.id) ? [] : m.ops, _ = o[m.id] ?? zi(f.length), A = f.map((T, b) => n[T.id] ?? oi(b, _)), R = Di(
      { x: u.x, y: u.y },
      _,
      A.map((T) => ({ dx: T.x, dy: T.y, w: Pe, h: Oe }))
    );
    return { a: m, off: u, ops: f, opOffs: A, fit: R };
  }), p = s.map(
    (m, r) => n[m.id] ?? oi(i.length + r, l)
  ), g = Ki(
    [
      ...c.map((m) => ({ id: m.a.id, x: m.fit.x, y: m.fit.y, w: m.fit.w, h: m.fit.h })),
      ...s.map((m, r) => ({
        id: m.id,
        x: p[r].x,
        y: p[r].y,
        w: Pe,
        h: Oe
      }))
    ],
    24
  );
  for (const m of c) {
    const r = g.get(m.a.id);
    r && (m.off = { x: m.off.x + (r.x - m.fit.x), y: m.off.y + (r.y - m.fit.y) }, m.fit = { ...m.fit, x: r.x, y: r.y });
  }
  s.forEach((m, r) => {
    const u = g.get(m.id);
    u && (p[r] = { x: u.x, y: u.y });
  });
  const h = Di(e, l, [
    ...c.map((m) => ({ dx: m.fit.x, dy: m.fit.y, w: m.fit.w, h: m.fit.h })),
    ...p.map((m) => ({ dx: m.x, dy: m.y, w: Pe, h: Oe }))
  ]), y = [
    { ...t, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const m of c)
    y.push({
      id: m.a.id,
      label: m.a.name,
      kind: m.a.kind,
      symbol: "interface",
      fill: m.a.fill,
      stroke: m.a.stroke,
      badge: m.a.badge,
      container: !0,
      collapsible: m.a.ops.length > 0 || a.has(m.a.id),
      collapsed: a.has(m.a.id),
      parentId: t.id,
      x: e.x + m.fit.x,
      y: e.y + m.fit.y,
      w: m.fit.w,
      h: m.fit.h,
      tooltip: m.a.tooltip
    }), m.ops.forEach((r, u) => {
      y.push({
        id: r.id,
        label: r.name,
        kind: m.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: m.a.id,
        x: e.x + m.off.x + m.opOffs[u].x,
        y: e.y + m.off.y + m.opOffs[u].y,
        w: Pe,
        h: Oe,
        tooltip: `${Li[m.a.opKind]}: ${r.name}`
      });
    });
  return s.forEach((m, r) => {
    const u = es[m.kind];
    y.push({
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + p[r].x,
      y: e.y + p[r].y,
      w: Pe,
      h: Oe,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Li[m.kind]} ${m.name}`
    });
  }), y;
}
function Pt(e, t, i, s, n) {
  const o = n[t.id] ?? zi(i.length), a = i.map((h, y) => s[h.id] ?? oi(y, o)), l = Ki(
    i.map((h, y) => ({ id: h.id, x: a[y].x, y: a[y].y, w: Pe, h: Oe })),
    10
  );
  i.forEach((h, y) => {
    const m = l.get(h.id);
    m && (a[y] = { x: m.x, y: m.y });
  });
  const c = Di(
    e,
    o,
    a.map((h) => ({ dx: h.x, dy: h.y, w: Pe, h: Oe }))
  ), p = {
    ...t,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, g = i.map((h, y) => {
    const m = a[y], r = h.policy ? no : es[h.kind];
    return {
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + m.x,
      y: e.y + m.y,
      w: Pe,
      h: Oe,
      symbol: r.symbol,
      fill: r.fill,
      stroke: r.stroke,
      parentId: t.id,
      tooltip: `${h.policy ? "Policy" : Li[h.kind]} ${h.name}`
    };
  });
  return [p, ...g];
}
function oo(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = n, a = i !== "contexts", l = i === "operations", c = new Set(e.externalSystems.map((d) => d.id)), p = (e.apis ?? []).filter(
    (d) => d.publishedByExternalSystemId && c.has(d.publishedByExternalSystemId)
  ), g = new Set(p.map((d) => d.id)), h = (e.proxyApis ?? []).filter(
    (d) => d.publishedByExternalSystemId && c.has(d.publishedByExternalSystemId)
  ), y = new Set(h.map((d) => d.id)), m = [
    ...e.modules.map((d) => ({ ref: d, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((d) => ({ ref: d, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((d) => !g.has(d.id)).map((d) => ({ ref: d, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((d) => !y.has(d.id)).map((d) => ({ ref: d, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...(e.etlFlows ?? []).filter((d) => !d.ownerModuleId).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(e.identityProviders ?? []).map((d) => ({
      ref: d,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], r = m.flatMap((d, O) => {
    const H = t[d.ref.id] ?? Et(O, m.length);
    if ("idp" in d && d.idp) {
      const j = d.ref, de = !!j.publishedByExternalSystemId;
      return [{
        id: j.id,
        label: j.name,
        kind: "identity-provider",
        symbol: "key",
        fill: de ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: de,
        badge: j.type ?? "IDP",
        tooltip: `${j.name} — emite las identidades que el sistema confía${de ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if ("etl" in d && d.etl) {
      const j = d.ref;
      return [{
        id: j.id,
        label: j.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${j.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
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
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if (d.proxy) {
      const j = d.ref, de = {
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`
      };
      if (l && j.targetApiId) {
        const qe = (e.apis ?? []).find((pt) => pt.id === j.targetApiId), Fe = (qe == null ? void 0 : qe.operations) ?? [];
        if (Fe.length > 0)
          return Pt(
            H,
            de,
            Fe.map((pt) => ({
              id: tt(pt.id, j.id),
              name: pt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...de, x: H.x, y: H.y, w: je, h: Ye }];
    }
    if (d.api) {
      const j = d.ref, de = {
        id: j.id,
        label: j.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${j.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(j.id) ? !a : a) && j.operations.length > 0 ? Pt(
        H,
        { ...de, collapsible: !0, collapsed: !1 },
        j.operations.map(
          (Fe) => ({ id: Fe.id, name: Fe.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...de,
        collapsible: j.operations.length > 0,
        collapsed: j.operations.length > 0,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    if (d.external) {
      const j = d.ref, de = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, qe = p.filter((pe) => pe.publishedByExternalSystemId === j.id), Fe = h.filter((pe) => pe.publishedByExternalSystemId === j.id), pt = Fe.map(
        (pe) => ({ id: pe.id, name: pe.name, kind: "proxy-api" })
      ), _i = [
        ...(j.useCases ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-use-case" })
        ),
        ...(j.tables ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-table" })
        ),
        ...(j.mcpServers ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "mcp-server" })
        )
      ], ki = qe.length > 0 || Fe.length > 0, $i = ki || _i.length > 0, { form: Xt, collapsed: Ei } = pn(
        n.has(j.id),
        a ? "full" : ki ? "coarse" : "compact",
        _i.length > 0 || l && ki
      ), dn = [
        ...pt,
        ...Xt === "full" ? _i : []
      ], Si = l && Xt === "full" ? Fe.filter((pe) => {
        const kt = pe.targetApiId ? (e.apis ?? []).find((ye) => ye.id === pe.targetApiId) : void 0;
        return ((kt == null ? void 0 : kt.operations) ?? []).length > 0;
      }) : [];
      if (l && Xt === "full" && (qe.length > 0 || Si.length > 0)) {
        const pe = [
          ...qe.map((ye) => ({
            id: ye.id,
            name: ye.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ye.name} — API publicada por ${j.name}`,
            opKind: "api-operation",
            ops: (ye.operations ?? []).map(($t) => ({ id: $t.id, name: $t.name }))
          })),
          ...Si.map((ye) => {
            const $t = (e.apis ?? []).find((Qt) => Qt.id === ye.targetApiId);
            return {
              id: ye.id,
              name: ye.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ye.name} — proxy/cache de ${$t.name}`,
              opKind: "api-op-occurrence",
              ops: ($t.operations ?? []).map((Qt) => ({
                id: tt(Qt.id, ye.id),
                name: Qt.name
              }))
            };
          })
        ], kt = new Set(Si.map((ye) => ye.id));
        return ts(
          H,
          { ...de, collapsible: !0, collapsed: Ei },
          pe,
          dn.filter((ye) => !kt.has(ye.id)),
          t,
          s,
          o
        );
      }
      const ln = Xt === "compact" ? [] : [
        ...qe.map((pe) => ({ id: pe.id, name: pe.name, kind: "api" })),
        ...dn
      ];
      return ln.length > 0 ? Pt(
        H,
        { ...de, collapsible: $i, collapsed: Ei },
        ln,
        t,
        s
      ) : [{
        ...de,
        collapsible: $i,
        collapsed: $i && Ei,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    const Z = d.ref, K = Z.subdomainType ?? "GENERIC", ce = {
      id: Z.id,
      label: Z.name,
      kind: "module",
      symbol: "component",
      fill: Xs[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${Z.name} — subdominio ${K}`
    }, Me = Kn(e, Z.id), bt = (e.aggregates ?? []).some((j) => j.moduleId === Z.id) || (Z.useCases ?? []).length > 0 || (Z.domainEvents ?? []).length > 0 || (Z.applicationEvents ?? []).length > 0 || (Z.readModels ?? []).length > 0 || (Z.domainServices ?? []).length > 0 || (Z.queryServices ?? []).length > 0 || (Z.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((j) => j.ownerModuleId === Z.id) || (e.notifications ?? []).some((j) => j.ownerModuleId === Z.id) || (e.documents ?? []).some((j) => j.ownerModuleId === Z.id), Ze = bt || Me.length > 0, { form: _t, collapsed: ct } = pn(
      n.has(Z.id),
      a ? "full" : Me.length > 0 ? "coarse" : "compact",
      bt
    );
    return _t === "full" && Ze ? so(
      e,
      Z,
      H,
      { ...ce, collapsible: !0, collapsed: ct },
      t,
      s,
      l
    ) : _t === "coarse" && Me.length > 0 ? Pt(
      H,
      { ...ce, collapsible: Ze, collapsed: ct },
      Me,
      t,
      s
    ) : [{
      ...ce,
      collapsible: Ze,
      collapsed: Ze && ct,
      x: H.x,
      y: H.y,
      w: je,
      h: Ye
    }];
  }), u = m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((d, O) => {
    const H = t[d.id] ?? Et(m.length + O, u);
    r.push({
      id: d.id,
      label: d.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${d.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((d, O) => {
    const H = t[d.id] ?? Et(m.length + (e.actors ?? []).length + O, u);
    r.push({
      id: d.id,
      label: d.name,
      x: H.x,
      y: H.y,
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
  }), (e.mcpGateways ?? []).forEach((d, O) => {
    const H = t[d.id] ?? Et(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      u
    );
    r.push({
      id: d.id,
      label: d.name,
      x: H.x,
      y: H.y,
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
  const f = [];
  (e.rags ?? []).forEach((d, O) => {
    const H = t[d.id] ?? Et(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      u
    );
    r.push({
      id: d.id,
      label: d.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${d.name} (base de conocimiento — retrieval para agentes)`
    }), (d.contentSources ?? []).forEach((Z, K) => {
      const ce = `ragcs:${d.id}:${Z.uri}`, Me = t[ce] ?? { x: H.x + 170, y: H.y - 30 + K * 44 };
      r.push({
        id: ce,
        label: Z.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Me.x,
        y: Me.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Z.type,
        tooltip: `${Z.type}: ${Z.uri}`
      }), f.push({
        id: `ragcse:${d.id}:${Z.uri}`,
        sourceId: ce,
        targetId: d.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), r.sort((d, O) => (d.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const _ = e.relations.map((d) => ({
    id: to(d.sourceId, d.targetId),
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "relation",
    label: d.type ? Qs[d.type] : "?",
    color: d.declared ? "#475569" : "#94a3b8",
    dashed: !d.declared,
    arrow: !0,
    tooltip: d.type ? `${d.type} (${d.sourceId} upstream → ${d.targetId} downstream)${d.reasons ? ` — ${d.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${d.reasons ? ` — ${d.reasons}` : ""}`
  })), A = e.flows.map((d) => {
    var Me, bt, Ze, _t, ct, j;
    const O = io(e, d), H = a ? e.modules.find((de) => de.id === d.sourceId) : void 0, Z = ((Me = H == null ? void 0 : H.domainEvents) == null ? void 0 : Me.find((de) => de.name === d.triggerEvent)) ?? ((bt = H == null ? void 0 : H.applicationEvents) == null ? void 0 : bt.find((de) => de.name === d.triggerEvent)), K = a && d.readModelName ? (_t = (Ze = e.modules.find((de) => de.id === d.targetId)) == null ? void 0 : Ze.readModels) == null ? void 0 : _t.find((de) => de.name === d.readModelName) : void 0, ce = a && d.targetUseCaseId ? (j = (ct = e.modules.find((de) => de.id === d.targetId)) == null ? void 0 : ct.useCases) == null ? void 0 : j.find((de) => de.id === d.targetUseCaseId) : void 0;
    return {
      id: `flow:${d.id}`,
      sourceId: (Z == null ? void 0 : Z.id) ?? d.sourceId,
      targetId: (ce == null ? void 0 : ce.id) ?? (K == null ? void 0 : K.id) ?? d.targetId,
      kind: "flow",
      label: d.name,
      color: Zs[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${d.name} [${d.archetype}] — ${O}`
    };
  }), R = new Map((e.apis ?? []).map((d) => [d.id, d])), T = new Set(e.modules.map((d) => d.id)), b = (e.apiImplementations ?? []).filter(
    (d) => R.has(d.apiId) && T.has(d.moduleId)
  ), w = new Set(r.map((d) => d.id)), P = a ? (e.emissions ?? []).filter((d) => w.has(d.sourceId) && w.has(d.domainEventId)).map((d) => ({
    id: `emit:${d.sourceId}->${d.domainEventId}`,
    sourceId: d.sourceId,
    targetId: d.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], U = a ? (e.projections ?? []).map((d) => ({
    p: d,
    source: d.sourceAggregateId ?? d.sourceExternalUseCaseId ?? d.sourceExternalTableId
  })).filter(({ p: d, source: O }) => O && d.readModelId).filter(({ p: d, source: O }) => w.has(O) && w.has(d.readModelId)).map(({ p: d, source: O }) => ({
    id: `proj:${d.id}`,
    sourceId: O,
    targetId: d.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: d.sourceAggregateId ? `Proyección ${d.name}: el estado del agregado se materializa en ${d.readModelName ?? d.readModelId}` : `Proyección ${d.name}: polling hacia ${d.readModelName ?? d.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (d) => d.operations.flatMap((O) => {
      const H = a && O.targetUseCaseId && w.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetModuleId && w.has(O.targetModuleId) ? O.targetModuleId : (O.targetUseCaseId && !a, null);
      if (!H) return [];
      const Z = a && w.has(O.id) ? O.id : d.id;
      return w.has(Z) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: Z,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${O.name} la implementa ${H}`
        }
      ] : [];
    })
  ), z = a ? (e.useCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `uccall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], L = [
    ...e.modules.filter((d) => d.identityProviderId && w.has(d.id) && w.has(d.identityProviderId)).map((d) => ({
      id: `idptrust:${d.id}`,
      sourceId: d.id,
      targetId: d.identityProviderId,
      kind: "idp-trust",
      color: "#ca8a04",
      label: "valida tokens de",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} valida los tokens emitidos por este IdP — Supr lo desconfía`
    })),
    ...(e.etlFlows ?? []).filter((d) => d.identityProviderId && w.has(d.identityProviderId)).flatMap((d) => {
      const O = w.has(d.id) ? d.id : d.ownerModuleId && w.has(d.ownerModuleId) ? d.ownerModuleId : null;
      return O ? [{
        id: `idpsvc:${d.id}`,
        sourceId: O,
        targetId: d.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${d.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((d) => d.publishedByExternalSystemId && w.has(d.id) && w.has(d.publishedByExternalSystemId)).map((d) => ({
      id: `idpfed:${d.id}`,
      sourceId: d.publishedByExternalSystemId,
      targetId: d.id,
      kind: "idp-federation",
      color: "#ca8a04",
      label: "publica",
      dashed: !0,
      arrow: !0,
      tooltip: "IdP federado: lo publica este sistema externo — Supr lo vuelve propio"
    }))
  ], q = a ? e.modules.flatMap((d) => d.scheduledTriggers ?? []).filter((d) => d.useCaseId && w.has(d.id) && w.has(d.useCaseId)).map((d) => ({
    id: `stfire:${d.id}->${d.useCaseId}`,
    sourceId: d.id,
    targetId: d.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: d.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${d.cronExpression ?? "cron"}`
  })) : [], le = a ? (e.aggregateCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `aggcall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], I = a ? (e.queryCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
    id: `qscall:${d.sourceId}->${d.targetId}`,
    sourceId: d.sourceId,
    targetId: d.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], S = a ? (e.actorUses ?? []).filter((d) => w.has(d.actorId) && w.has(d.targetId)).map((d) => ({
    id: `use:${d.actorId}->${d.targetId}`,
    sourceId: d.actorId,
    targetId: d.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], v = (e.actorExternalDependencies ?? []).filter((d) => w.has(d.actorId) && w.has(d.externalSystemId)).map((d) => ({
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
  ]), k = (d) => w.has(d) ? d : x.get(d) ?? d, $ = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((d) => ({
        sourceId: d.sourceId,
        targetId: k(d.targetId),
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
  ], M = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const O of d.useCases ?? []) M.set(O.id, d.id);
    for (const O of d.domainEvents ?? []) M.set(O.id, d.id);
    for (const O of d.applicationEvents ?? []) M.set(O.id, d.id);
    for (const O of d.queryServices ?? []) M.set(O.id, d.id);
  }
  const C = (d) => w.has(d) ? d : M.get(d) ?? d, N = /* @__PURE__ */ new Map();
  for (const d of e.modules) {
    for (const O of d.domainEvents ?? []) N.set(O.name, O.id);
    for (const O of d.applicationEvents ?? []) N.set(O.name, O.id);
  }
  const B = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (d) => (d.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: d.id, targetId: C(O.targetUseCaseId) }))
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
  ], W = [
    ...new Map(
      (e.workflows ?? []).filter((d) => d.triggerEvent && N.has(d.triggerEvent)).map((d) => ({
        sourceId: C(N.get(d.triggerEvent)),
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
  ], re = /* @__PURE__ */ new Map();
  for (const d of e.externalSystems)
    for (const O of d.tables ?? []) re.set(O.id, d.id);
  const se = (e.notifications ?? []).flatMap((d) => {
    var Z;
    const O = w.has(d.id) ? d.id : d.ownerModuleId && w.has(d.ownerModuleId) ? d.ownerModuleId : null;
    if (!O) return [];
    const H = [];
    if (d.eventId) {
      const K = w.has(d.eventId) ? d.eventId : M.get(d.eventId);
      K && w.has(K) && K !== O && H.push({
        id: `notif:${d.id}`,
        sourceId: K,
        targetId: O,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${d.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const K of d.recipientRoleIds ?? [])
      w.has(K) && H.push({
        id: `notifto:${d.id}:${K}`,
        sourceId: O,
        targetId: K,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((Z = (d.channels ?? [])[0]) == null ? void 0 : Z.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${d.name} avisa a este rol — Supr lo quita`
      });
    return H;
  }), G = (e.documents ?? []).flatMap((d) => {
    const O = w.has(d.id) ? d.id : d.ownerModuleId && w.has(d.ownerModuleId) ? d.ownerModuleId : null;
    if (!O || !d.queryServiceId) return [];
    const H = w.has(d.queryServiceId) ? d.queryServiceId : M.get(d.queryServiceId);
    return !H || !w.has(H) || H === O ? [] : [{
      id: `docq:${d.id}`,
      sourceId: H,
      targetId: O,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), X = (e.etlFlows ?? []).flatMap(
    (d) => (d.steps ?? []).flatMap((O) => {
      const H = w.has(d.id) ? d.id : d.ownerModuleId && w.has(d.ownerModuleId) ? d.ownerModuleId : null;
      if (!H) return [];
      const Z = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!Z) return [];
      let K = Z;
      if (!w.has(K) && O.operationId && O.apiId && (K = O.apiId), !w.has(K) && O.externalTableId && (K = re.get(O.externalTableId) ?? K), w.has(K) || (K = k(K)), w.has(K) || (K = M.get(Z) ?? K), !w.has(K) || K === H) return [];
      const ce = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${d.id}:${O.id}`,
        sourceId: ce ? K : H,
        targetId: ce ? H : K,
        kind: ce ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ce ? `${d.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${d.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), V = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: w.has(O) ? O : re.get(O) ?? O,
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
  ], te = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (d) => (d.sourceApiIds ?? []).map((O) => ({
          sourceId: k(O),
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
  ], xe = [
    ...new Map(
      (e.rags ?? []).flatMap((d) => [
        ...(d.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: d.id, name: d.name })),
        ...(d.sourceModuleIds ?? []).map((O) => ({ sourceId: O, targetId: d.id, name: d.name }))
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
  ], be = [
    ...new Map(
      (e.agentApiUses ?? []).map((d) => ({ sourceId: d.agentId, targetId: k(d.apiId) })).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => [
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
  ], Ae = (d) => d.onCompletionEventName || `${d.name.replace(/\s+/g, "")}Completado`, we = (e.workflows ?? []).flatMap(
    (d) => d.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== d.id && Ae(O) === d.triggerEvent).filter((O) => w.has(O.id) && w.has(d.id)).map((O) => ({
      id: `wfchain:${O.id}->${d.id}`,
      sourceId: O.id,
      targetId: d.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: d.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), We = [
    ...new Map(
      (e.proxyApis ?? []).filter((d) => d.targetApiId).map((d) => ({ sourceId: k(d.id), targetId: k(d.targetApiId) })).filter(
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
  ], Yt = b.flatMap((d) => {
    const O = it(d.apiId, d.moduleId);
    if (!w.has(O)) return [];
    const H = [];
    for (const Z of (e.proxyApis ?? []).filter((K) => K.targetApiId === d.apiId)) {
      const K = k(Z.id);
      w.has(K) && K !== O && H.push({
        id: `pxr:${K}->${O}`,
        sourceId: K,
        targetId: O,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return H;
  }), lt = (e.proxyOperationRoutes ?? []).flatMap((d) => {
    const O = (e.proxyApis ?? []).find((K) => K.id === d.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const H = tt(d.operationId, d.proxyId), Z = d.targetSiteId === O.targetApiId ? O.targetApiId : it(O.targetApiId, d.targetSiteId);
    return !w.has(H) || !w.has(Z) ? [] : [{
      id: `oproute:${H}->${Z}`,
      sourceId: H,
      targetId: Z,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Kt = [
    ...new Map(
      (e.externalOperationUses ?? []).map((d) => {
        if (!w.has(d.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (ce) => ce.operations.some((Me) => Me.id === d.operationId)
        );
        if (!O) return null;
        const H = d.siteId === O.id, Z = H ? d.operationId : tt(d.operationId, d.siteId);
        let K = w.has(Z) ? Z : null;
        if (!K)
          if (H || (e.proxyApis ?? []).some((ce) => ce.id === d.siteId))
            K = k(d.siteId);
          else {
            const ce = it(O.id, d.siteId);
            K = w.has(ce) ? ce : d.siteId;
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
  ], Rs = a ? (e.apiOperationImplementations ?? []).flatMap((d) => {
    if (!w.has(d.useCaseId)) return [];
    const O = w.has(tt(d.operationId, d.moduleId)) ? tt(d.operationId, d.moduleId) : w.has(it(d.apiId, d.moduleId)) ? it(d.apiId, d.moduleId) : w.has(k(d.moduleId)) ? k(d.moduleId) : null;
    return O ? [{
      id: `apiimplwire:${d.operationId}@${d.moduleId}`,
      sourceId: O,
      targetId: d.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Ns = a ? (e.agentUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.useCaseId)).map((d) => ({
    id: `mcp:${d.agentId}->${d.useCaseId}`,
    sourceId: d.agentId,
    targetId: d.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ds = (e.agentRags ?? []).filter((d) => w.has(d.agentId) && w.has(d.ragId)).map((d) => ({
    id: `agrag:${d.agentId}->${d.ragId}`,
    sourceId: d.agentId,
    targetId: d.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Ls = a ? (e.rags ?? []).filter((d) => w.has(d.id)).flatMap(
    (d) => (d.sourceReadModelIds ?? []).filter((O) => w.has(O)).map((O) => ({
      id: `ragsrc:${d.id}->${O}`,
      sourceId: d.id,
      targetId: O,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${d.name} indexa este read model`
    }))
  ) : [], zs = a ? (e.agentExternalUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.externalUseCaseId)).map((d) => ({
    id: `mcpx:${d.agentId}->${d.externalUseCaseId}`,
    sourceId: d.agentId,
    targetId: d.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Us = a ? (e.agentMcpUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.mcpServerId)).map((d) => ({
    id: `mcpsv:${d.agentId}->${d.mcpServerId}`,
    sourceId: d.agentId,
    targetId: d.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], qs = (e.mcpGateways ?? []).flatMap(
    (d) => [
      ...d.mcpServerIds ?? [],
      ...d.apiIds ?? [],
      ...d.apiOperationIds ?? [],
      ...d.useCaseIds ?? [],
      ...d.ragIds ?? []
    ].filter((O) => w.has(d.id) && w.has(O)).map((O) => ({
      id: `gwx:${d.id}->${O}`,
      sourceId: d.id,
      targetId: O,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Fs = (e.agentGatewayUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.gatewayId)).map((d) => ({
    id: `aggw:${d.agentId}->${d.gatewayId}`,
    sourceId: d.agentId,
    targetId: d.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Bs = a ? (e.agentApiOpUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.apiOperationId)).map((d) => ({
    id: `agapi:${d.agentId}->${d.apiOperationId}`,
    sourceId: d.agentId,
    targetId: d.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Vs = a ? (e.agentQueryUses ?? []).filter((d) => w.has(d.agentId) && w.has(d.queryServiceId)).map((d) => ({
    id: `agqs:${d.agentId}->${d.queryServiceId}`,
    sourceId: d.agentId,
    targetId: d.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Hs = (e.agentDelegations ?? []).filter((d) => w.has(d.agentId) && w.has(d.delegateAgentId)).map((d) => ({
    id: `agag:${d.agentId}->${d.delegateAgentId}`,
    sourceId: d.agentId,
    targetId: d.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ws = (e.actorAgentUses ?? []).filter((d) => w.has(d.actorId) && w.has(d.agentId)).map((d) => ({
    id: `useag:${d.actorId}->${d.agentId}`,
    sourceId: d.actorId,
    targetId: d.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Gs = a ? (e.agentTriggers ?? []).filter((d) => w.has(d.eventId) && w.has(d.agentId)).map((d) => ({
    id: `evag:${d.eventId}->${d.agentId}`,
    sourceId: d.eventId,
    targetId: d.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], js = a ? (e.externalCalls ?? []).filter((d) => w.has(d.externalSystemId) && w.has(d.useCaseId)).map((d) => ({
    id: `extcall:${d.externalSystemId}->${d.useCaseId}`,
    sourceId: d.externalSystemId,
    targetId: d.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Ys = a ? (e.externalUseCaseCalls ?? []).filter((d) => w.has(d.sourceId) && w.has(d.targetId)).map((d) => ({
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
    nodes: r,
    edges: [
      ..._,
      ...A,
      ...P,
      ...U,
      ...D,
      ...z,
      ...q,
      ...L,
      ...se,
      ...G,
      ...X,
      ...le,
      ...I,
      ...S,
      ...v,
      ...$,
      ...We,
      ...Yt,
      ...lt,
      ...Kt,
      ...Rs,
      ...B,
      ...W,
      ...we,
      ...be,
      ...V,
      ...te,
      ...xe,
      ...Ns,
      ...zs,
      ...Us,
      ...qs,
      ...Fs,
      ...Bs,
      ...Vs,
      ...Hs,
      ...Ws,
      ...Gs,
      ...Ds,
      ...Ls,
      ...f,
      ...js,
      ...Ys
    ]
  };
}
const ao = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ro = 176, lo = 60, co = 140, po = 40;
function uo(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((c) => c.moduleId === n.id).forEach((c, p) => {
      const g = s.filter((y) => y.aggregateId === c.id).length, h = 140 + p * (170 + g * 60);
      t[c.id] = { x: a, y: h }, s.filter((y) => y.aggregateId === c.id).forEach((y, m) => {
        t[y.id] = { x: a + 60, y: h + 100 + m * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function mo(e, t) {
  const i = uo(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const g = n.get(p.moduleId), h = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", y = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: y.x,
      y: y.y,
      w: ro,
      h: lo,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ao[h],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${h})` : ""}`
    };
  }), a = (e.entities ?? []).map((p) => {
    const g = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: co,
      h: po,
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
  })), c = (e.aggregateReferences ?? []).map((p, g) => ({
    id: `aggref:${g}:${p.sourceAggregateId}->${p.targetAggregateId}`,
    sourceId: p.sourceAggregateId,
    targetId: p.targetAggregateId,
    kind: "aggregate-reference",
    label: p.label,
    color: "#475569",
    arrow: !0,
    tooltip: p.label ? `Referencia: ${p.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...a],
    edges: [...l, ...c]
  };
}
const ho = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, fo = 150, go = 44, Io = 190, yo = 56, vo = 160, wo = 48;
function xo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function bo(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (l) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((g) => g.id === l)) == null ? void 0 : p.name) ?? l ?? "?";
  };
  return i.forEach((l, c) => {
    const p = 120 + c * 130, g = ho[l.archetype] ?? "#475569", h = l.triggerAggregateId ?? l.sourceId;
    if (!o.has(h)) {
      o.add(h);
      const f = t[h] ?? { x: 160, y: p };
      s.push({
        id: h,
        label: l.triggerAggregateId ? a(l.triggerAggregateId) : h,
        x: f.x,
        y: f.y,
        w: fo,
        h: go,
        kind: l.triggerAggregateId ? "aggregate" : "module",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const y = `flow:${l.id}`, m = t[y] ?? { x: 470, y: p };
    s.push({
      id: y,
      label: l.name,
      x: m.x,
      y: m.y,
      w: Io,
      h: yo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const r = xo(e, l), u = `tgt:${r.id}`;
    if (!o.has(u)) {
      o.add(u);
      const f = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: r.label,
        x: f.x,
        y: f.y,
        w: vo,
        h: wo,
        kind: r.external ? "external-system" : "module",
        symbol: "component",
        fill: r.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: r.external,
        badge: r.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${l.id}:in`,
      sourceId: h,
      targetId: y,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${l.id}:out`,
      sourceId: y,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const _o = 190, ko = 56, Ci = 170, $o = 52;
function un(e, t) {
  const i = [], s = [], n = (o) => {
    var a;
    return (a = e.modules.find((l) => l.id === o)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((o, a) => {
    const l = 140 + a * 240, c = t[o.id] ?? { x: 150, y: l };
    i.push({
      id: o.id,
      label: o.name,
      x: c.x,
      y: c.y,
      w: _o,
      h: ko,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let p = o.id;
    if (o.steps.forEach((g, h) => {
      const y = g.type === "HUMAN", m = t[g.id] ?? { x: 150 + (h + 1) * 240, y: l };
      if (i.push({
        id: g.id,
        label: g.name,
        x: m.x,
        y: m.y,
        w: Ci,
        h: $o,
        kind: "process-step",
        symbol: y ? "person" : "gear",
        fill: y ? "#fef3c7" : "#ffffff",
        stroke: y ? "#d97706" : "#64748b",
        badge: y ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${h}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: h === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const r = `comp:${g.id}`, u = t[r] ?? { x: m.x, y: m.y + 90 };
        i.push({
          id: r,
          label: g.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Ci,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), s.push({
          id: `pc:${g.id}`,
          sourceId: g.id,
          targetId: r,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = g.id;
    }), o.onCompletionEventName) {
      const g = `done:${o.id}`, h = t[g] ?? { x: 150 + (o.steps.length + 1) * 240, y: l };
      i.push({
        id: g,
        label: o.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: Ci,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${o.id}`,
        sourceId: p,
        targetId: g,
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
const ai = globalThis, Xi = ai.ShadowRoot && (ai.ShadyCSS === void 0 || ai.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qi = Symbol(), mn = /* @__PURE__ */ new WeakMap();
let is = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Qi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Xi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = mn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && mn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Eo = (e) => new is(typeof e == "string" ? e : e + "", void 0, Qi), wt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new is(i, e, Qi);
}, So = (e, t) => {
  if (Xi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = ai.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, hn = Xi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Eo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Co, defineProperty: Ao, getOwnPropertyDescriptor: Mo, getOwnPropertyNames: Po, getOwnPropertySymbols: Oo, getPrototypeOf: To } = Object, Qe = globalThis, fn = Qe.trustedTypes, Ro = fn ? fn.emptyScript : "", Ai = Qe.reactiveElementPolyfillSupport, Rt = (e, t) => e, pi = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ro : null;
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
} }, Zi = (e, t) => !Co(e, t), gn = { attribute: !0, type: String, converter: pi, reflect: !1, useDefault: !1, hasChanged: Zi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Qe.litPropertyMetadata ?? (Qe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let mt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = gn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Ao(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Mo(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const l = n == null ? void 0 : n.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? gn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Rt("elementProperties"))) return;
    const t = To(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Rt("properties"))) {
      const i = this.properties, s = [...Po(i), ...Oo(i)];
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
      for (const n of s) i.unshift(hn(n));
    } else t !== void 0 && i.push(hn(t));
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
    return So(t, this.constructor.elementStyles), t;
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
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : pi).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const l = s.getPropertyOptions(n), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : pi;
      this._$Em = n;
      const p = c.fromAttribute(i, l.type);
      this[n] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? Zi)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: o }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, a] of n) {
        const { wrapped: l } = a, c = this[o];
        l !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
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
mt.elementStyles = [], mt.shadowRootOptions = { mode: "open" }, mt[Rt("elementProperties")] = /* @__PURE__ */ new Map(), mt[Rt("finalized")] = /* @__PURE__ */ new Map(), Ai == null || Ai({ ReactiveElement: mt }), (Qe.reactiveElementVersions ?? (Qe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, In = (e) => e, ui = Nt.trustedTypes, yn = ui ? ui.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ns = "$lit$", Xe = `lit$${Math.random().toFixed(9).slice(2)}$`, ss = "?" + Xe, No = `<${ss}>`, rt = document, zt = () => rt.createComment(""), Ut = (e) => e === null || typeof e != "object" && typeof e != "function", Ji = Array.isArray, Do = (e) => Ji(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Mi = `[ 	
\f\r]`, St = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vn = /-->/g, wn = />/g, Je = RegExp(`>|${Mi}(?:([^\\s"'>=/]+)(${Mi}*=${Mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xn = /'/g, bn = /"/g, os = /^(?:script|style|textarea|title)$/i, as = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = as(1), J = as(2), gt = Symbol.for("lit-noChange"), ie = Symbol.for("lit-nothing"), _n = /* @__PURE__ */ new WeakMap(), nt = rt.createTreeWalker(rt, 129);
function rs(e, t) {
  if (!Ji(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yn !== void 0 ? yn.createHTML(t) : t;
}
const Lo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = St;
  for (let l = 0; l < i; l++) {
    const c = e[l];
    let p, g, h = -1, y = 0;
    for (; y < c.length && (a.lastIndex = y, g = a.exec(c), g !== null); ) y = a.lastIndex, a === St ? g[1] === "!--" ? a = vn : g[1] !== void 0 ? a = wn : g[2] !== void 0 ? (os.test(g[2]) && (n = RegExp("</" + g[2], "g")), a = Je) : g[3] !== void 0 && (a = Je) : a === Je ? g[0] === ">" ? (a = n ?? St, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? Je : g[3] === '"' ? bn : xn) : a === bn || a === xn ? a = Je : a === vn || a === wn ? a = St : (a = Je, n = void 0);
    const m = a === Je && e[l + 1].startsWith("/>") ? " " : "";
    o += a === St ? c + No : h >= 0 ? (s.push(p), c.slice(0, h) + ns + c.slice(h) + Xe + m) : c + Xe + (h === -2 ? l : m);
  }
  return [rs(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class qt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, c = this.parts, [p, g] = Lo(t, i);
    if (this.el = qt.createElement(p, s), nt.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = nt.nextNode()) !== null && c.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(ns)) {
          const y = g[a++], m = n.getAttribute(h).split(Xe), r = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: o, name: r[2], strings: m, ctor: r[1] === "." ? Uo : r[1] === "?" ? qo : r[1] === "@" ? Fo : vi }), n.removeAttribute(h);
        } else h.startsWith(Xe) && (c.push({ type: 6, index: o }), n.removeAttribute(h));
        if (os.test(n.tagName)) {
          const h = n.textContent.split(Xe), y = h.length - 1;
          if (y > 0) {
            n.textContent = ui ? ui.emptyScript : "";
            for (let m = 0; m < y; m++) n.append(h[m], zt()), nt.nextNode(), c.push({ type: 2, index: ++o });
            n.append(h[y], zt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ss) c.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Xe, h + 1)) !== -1; ) c.push({ type: 7, index: o }), h += Xe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = rt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function It(e, t, i = e, s) {
  var a, l;
  if (t === gt) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = Ut(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = It(e, n._$AS(e, t.values), n, s)), t;
}
class zo {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? rt).importNode(i, !0);
    nt.currentNode = n;
    let o = nt.nextNode(), a = 0, l = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new Wt(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new Bo(o, this, t)), this._$AV.push(p), c = s[++l];
      }
      a !== (c == null ? void 0 : c.index) && (o = nt.nextNode(), a++);
    }
    return nt.currentNode = rt, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Wt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = ie, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = It(this, t, i), Ut(t) ? t === ie || t == null || t === "" ? (this._$AH !== ie && this._$AR(), this._$AH = ie) : t !== this._$AH && t !== gt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Do(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ie && Ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(rt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = qt.createElement(rs(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new zo(n, this), l = a.u(this.options);
      a.p(i), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = _n.get(t.strings);
    return i === void 0 && _n.set(t.strings, i = new qt(t)), i;
  }
  k(t) {
    Ji(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new Wt(this.O(zt()), this.O(zt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = In(t).nextSibling;
      In(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class vi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = ie, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = ie;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = It(this, t, i, 0), a = !Ut(t) || t !== this._$AH && t !== gt, a && (this._$AH = t);
    else {
      const l = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = It(this, l[s + c], i, c), p === gt && (p = this._$AH[c]), a || (a = !Ut(p) || p !== this._$AH[c]), p === ie ? t = ie : t !== ie && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === ie ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Uo extends vi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ie ? void 0 : t;
  }
}
class qo extends vi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ie);
  }
}
class Fo extends vi {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = It(this, t, i, 0) ?? ie) === gt) return;
    const s = this._$AH, n = t === ie && s !== ie || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== ie && (s === ie || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    It(this, t);
  }
}
const Pi = Nt.litHtmlPolyfillSupport;
Pi == null || Pi(qt, Wt), (Nt.litHtmlVersions ?? (Nt.litHtmlVersions = [])).push("3.3.3");
const Vo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Wt(t.insertBefore(zt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
class Le extends mt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vo(i, this.renderRoot, this.renderOptions);
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
    return gt;
  }
}
var Yn;
Le._$litElement$ = !0, Le.finalized = !0, (Yn = ot.litElementHydrateSupport) == null || Yn.call(ot, { LitElement: Le });
const Oi = ot.litElementPolyfillSupport;
Oi == null || Oi({ LitElement: Le });
(ot.litElementVersions ?? (ot.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ho = { attribute: !0, type: String, converter: pi, reflect: !1, hasChanged: Zi }, Wo = (e = Ho, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, e, l), l;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(l) {
      const c = this[a];
      t.call(this, l), this.requestUpdate(a, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ae(e) {
  return (t, i) => typeof i == "object" ? Wo(e, t, i) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(e) {
  return ae({ ...e, state: !0, attribute: !1 });
}
var Ui = "http://www.w3.org/1999/xhtml";
const kn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ui,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function wi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), kn.hasOwnProperty(t) ? { space: kn[t], local: e } : e;
}
function Go(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ui && t.documentElement.namespaceURI === Ui ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function jo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function ds(e) {
  var t = wi(e);
  return (t.local ? jo : Go)(t);
}
function Yo() {
}
function en(e) {
  return e == null ? Yo : function() {
    return this.querySelector(e);
  };
}
function Ko(e) {
  typeof e != "function" && (e = en(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = new Array(a), c, p, g = 0; g < a; ++g)
      (c = o[g]) && (p = e.call(c, c.__data__, g, o)) && ("__data__" in c && (p.__data__ = c.__data__), l[g] = p);
  return new Ee(s, this._parents);
}
function Xo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Qo() {
  return [];
}
function ls(e) {
  return e == null ? Qo : function() {
    return this.querySelectorAll(e);
  };
}
function Zo(e) {
  return function() {
    return Xo(e.apply(this, arguments));
  };
}
function Jo(e) {
  typeof e == "function" ? e = Zo(e) : e = ls(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], l = a.length, c, p = 0; p < l; ++p)
      (c = a[p]) && (s.push(e.call(c, c.__data__, p, a)), n.push(c));
  return new Ee(s, n);
}
function cs(e) {
  return function() {
    return this.matches(e);
  };
}
function ps(e) {
  return function(t) {
    return t.matches(e);
  };
}
var ea = Array.prototype.find;
function ta(e) {
  return function() {
    return ea.call(this.children, e);
  };
}
function ia() {
  return this.firstElementChild;
}
function na(e) {
  return this.select(e == null ? ia : ta(typeof e == "function" ? e : ps(e)));
}
var sa = Array.prototype.filter;
function oa() {
  return Array.from(this.children);
}
function aa(e) {
  return function() {
    return sa.call(this.children, e);
  };
}
function ra(e) {
  return this.selectAll(e == null ? oa : aa(typeof e == "function" ? e : ps(e)));
}
function da(e) {
  typeof e != "function" && (e = cs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && l.push(c);
  return new Ee(s, this._parents);
}
function us(e) {
  return new Array(e.length);
}
function la() {
  return new Ee(this._enter || this._groups.map(us), this._parents);
}
function mi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
mi.prototype = {
  constructor: mi,
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
function ca(e) {
  return function() {
    return e;
  };
}
function pa(e, t, i, s, n, o) {
  for (var a = 0, l, c = t.length, p = o.length; a < p; ++a)
    (l = t[a]) ? (l.__data__ = o[a], s[a] = l) : i[a] = new mi(e, o[a]);
  for (; a < c; ++a)
    (l = t[a]) && (n[a] = l);
}
function ua(e, t, i, s, n, o, a) {
  var l, c, p = /* @__PURE__ */ new Map(), g = t.length, h = o.length, y = new Array(g), m;
  for (l = 0; l < g; ++l)
    (c = t[l]) && (y[l] = m = a.call(c, c.__data__, l, t) + "", p.has(m) ? n[l] = c : p.set(m, c));
  for (l = 0; l < h; ++l)
    m = a.call(e, o[l], l, o) + "", (c = p.get(m)) ? (s[l] = c, c.__data__ = o[l], p.delete(m)) : i[l] = new mi(e, o[l]);
  for (l = 0; l < g; ++l)
    (c = t[l]) && p.get(y[l]) === c && (n[l] = c);
}
function ma(e) {
  return e.__data__;
}
function ha(e, t) {
  if (!arguments.length) return Array.from(this, ma);
  var i = t ? ua : pa, s = this._parents, n = this._groups;
  typeof e != "function" && (e = ca(e));
  for (var o = n.length, a = new Array(o), l = new Array(o), c = new Array(o), p = 0; p < o; ++p) {
    var g = s[p], h = n[p], y = h.length, m = fa(e.call(g, g && g.__data__, p, s)), r = m.length, u = l[p] = new Array(r), f = a[p] = new Array(r), _ = c[p] = new Array(y);
    i(g, h, u, f, _, m, t);
    for (var A = 0, R = 0, T, b; A < r; ++A)
      if (T = u[A]) {
        for (A >= R && (R = A + 1); !(b = f[R]) && ++R < r; ) ;
        T._next = b || null;
      }
  }
  return a = new Ee(a, s), a._enter = l, a._exit = c, a;
}
function fa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ga() {
  return new Ee(this._exit || this._groups.map(us), this._parents);
}
function Ia(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function ya(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), l = new Array(n), c = 0; c < a; ++c)
    for (var p = i[c], g = s[c], h = p.length, y = l[c] = new Array(h), m, r = 0; r < h; ++r)
      (m = p[r] || g[r]) && (y[r] = m);
  for (; c < n; ++c)
    l[c] = i[c];
  return new Ee(l, this._parents);
}
function va() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function wa(e) {
  e || (e = xa);
  function t(h, y) {
    return h && y ? e(h.__data__, y.__data__) : !h - !y;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], l = a.length, c = n[o] = new Array(l), p, g = 0; g < l; ++g)
      (p = a[g]) && (c[g] = p);
    c.sort(t);
  }
  return new Ee(n, this._parents).order();
}
function xa(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ba() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function _a() {
  return Array.from(this);
}
function ka() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function $a() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ea() {
  return !this.node();
}
function Sa(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, l; o < a; ++o)
      (l = n[o]) && e.call(l, l.__data__, o, n);
  return this;
}
function Ca(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Aa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ma(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Pa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Oa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ta(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Ra(e, t) {
  var i = wi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Aa : Ca : typeof t == "function" ? i.local ? Ta : Oa : i.local ? Pa : Ma)(i, t));
}
function ms(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Na(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Da(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function La(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function za(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Na : typeof t == "function" ? La : Da)(e, t, i ?? "")) : yt(this.node(), e);
}
function yt(e, t) {
  return e.style.getPropertyValue(t) || ms(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ua(e) {
  return function() {
    delete this[e];
  };
}
function qa(e, t) {
  return function() {
    this[e] = t;
  };
}
function Fa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Ba(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ua : typeof t == "function" ? Fa : qa)(e, t)) : this.node()[e];
}
function hs(e) {
  return e.trim().split(/^|\s+/);
}
function tn(e) {
  return e.classList || new fs(e);
}
function fs(e) {
  this._node = e, this._names = hs(e.getAttribute("class") || "");
}
fs.prototype = {
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
function gs(e, t) {
  for (var i = tn(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Is(e, t) {
  for (var i = tn(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function Va(e) {
  return function() {
    gs(this, e);
  };
}
function Ha(e) {
  return function() {
    Is(this, e);
  };
}
function Wa(e, t) {
  return function() {
    (t.apply(this, arguments) ? gs : Is)(this, e);
  };
}
function Ga(e, t) {
  var i = hs(e + "");
  if (arguments.length < 2) {
    for (var s = tn(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Wa : t ? Va : Ha)(i, t));
}
function ja() {
  this.textContent = "";
}
function Ya(e) {
  return function() {
    this.textContent = e;
  };
}
function Ka(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Xa(e) {
  return arguments.length ? this.each(e == null ? ja : (typeof e == "function" ? Ka : Ya)(e)) : this.node().textContent;
}
function Qa() {
  this.innerHTML = "";
}
function Za(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Ja(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function er(e) {
  return arguments.length ? this.each(e == null ? Qa : (typeof e == "function" ? Ja : Za)(e)) : this.node().innerHTML;
}
function tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ir() {
  return this.each(tr);
}
function nr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function sr() {
  return this.each(nr);
}
function or(e) {
  var t = typeof e == "function" ? e : ds(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function ar() {
  return null;
}
function rr(e, t) {
  var i = typeof e == "function" ? e : ds(e), s = t == null ? ar : typeof t == "function" ? t : en(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function dr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function lr() {
  return this.each(dr);
}
function cr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function pr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ur(e) {
  return this.select(e ? pr : cr);
}
function mr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function hr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function fr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function gr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Ir(e, t, i) {
  return function() {
    var s = this.__on, n, o = hr(t);
    if (s) {
      for (var a = 0, l = s.length; a < l; ++a)
        if ((n = s[a]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function yr(e, t, i) {
  var s = fr(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var c = 0, p = l.length, g; c < p; ++c)
        for (n = 0, g = l[c]; n < o; ++n)
          if ((a = s[n]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (l = t ? Ir : gr, n = 0; n < o; ++n) this.each(l(s[n], t, i));
  return this;
}
function ys(e, t, i) {
  var s = ms(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function vr(e, t) {
  return function() {
    return ys(this, e, t);
  };
}
function wr(e, t) {
  return function() {
    return ys(this, e, t.apply(this, arguments));
  };
}
function xr(e, t) {
  return this.each((typeof t == "function" ? wr : vr)(e, t));
}
function* br() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var vs = [null];
function Ee(e, t) {
  this._groups = e, this._parents = t;
}
function Gt() {
  return new Ee([[document.documentElement]], vs);
}
function _r() {
  return this;
}
Ee.prototype = Gt.prototype = {
  constructor: Ee,
  select: Ko,
  selectAll: Jo,
  selectChild: na,
  selectChildren: ra,
  filter: da,
  data: ha,
  enter: la,
  exit: ga,
  join: Ia,
  merge: ya,
  selection: _r,
  order: va,
  sort: wa,
  call: ba,
  nodes: _a,
  node: ka,
  size: $a,
  empty: Ea,
  each: Sa,
  attr: Ra,
  style: za,
  property: Ba,
  classed: Ga,
  text: Xa,
  html: er,
  raise: ir,
  lower: sr,
  append: or,
  insert: rr,
  remove: lr,
  clone: ur,
  datum: mr,
  on: yr,
  dispatch: xr,
  [Symbol.iterator]: br
};
function Te(e) {
  return typeof e == "string" ? new Ee([[document.querySelector(e)]], [document.documentElement]) : new Ee([[e]], vs);
}
function kr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function et(e, t) {
  if (e = kr(e), t === void 0 && (t = e.currentTarget), t) {
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
var $r = { value: () => {
} };
function nn() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new ri(i);
}
function ri(e) {
  this._ = e;
}
function Er(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
ri.prototype = nn.prototype = {
  constructor: ri,
  on: function(e, t) {
    var i = this._, s = Er(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = Sr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = $n(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = $n(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ri(e);
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
function Sr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function $n(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = $r, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const qi = { capture: !0, passive: !1 };
function Fi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Cr(e) {
  var t = e.document.documentElement, i = Te(e).on("dragstart.drag", Fi, qi);
  "onselectstart" in t ? i.on("selectstart.drag", Fi, qi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Ar(e, t) {
  var i = e.document.documentElement, s = Te(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Fi, qi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function sn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ws(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function jt() {
}
var Ft = 0.7, hi = 1 / Ft, ft = "\\s*([+-]?\\d+)\\s*", Bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Mr = /^#([0-9a-f]{3,8})$/, Pr = new RegExp(`^rgb\\(${ft},${ft},${ft}\\)$`), Or = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Tr = new RegExp(`^rgba\\(${ft},${ft},${ft},${Bt}\\)$`), Rr = new RegExp(`^rgba\\(${ze},${ze},${ze},${Bt}\\)$`), Nr = new RegExp(`^hsl\\(${Bt},${ze},${ze}\\)$`), Dr = new RegExp(`^hsla\\(${Bt},${ze},${ze},${Bt}\\)$`), En = {
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
sn(jt, Vt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Sn,
  // Deprecated! Use color.formatHex.
  formatHex: Sn,
  formatHex8: Lr,
  formatHsl: zr,
  formatRgb: Cn,
  toString: Cn
});
function Sn() {
  return this.rgb().formatHex();
}
function Lr() {
  return this.rgb().formatHex8();
}
function zr() {
  return xs(this).formatHsl();
}
function Cn() {
  return this.rgb().formatRgb();
}
function Vt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Mr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? An(t) : i === 3 ? new _e(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Jt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Jt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Pr.exec(e)) ? new _e(t[1], t[2], t[3], 1) : (t = Or.exec(e)) ? new _e(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Tr.exec(e)) ? Jt(t[1], t[2], t[3], t[4]) : (t = Rr.exec(e)) ? Jt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Nr.exec(e)) ? On(t[1], t[2] / 100, t[3] / 100, 1) : (t = Dr.exec(e)) ? On(t[1], t[2] / 100, t[3] / 100, t[4]) : En.hasOwnProperty(e) ? An(En[e]) : e === "transparent" ? new _e(NaN, NaN, NaN, 0) : null;
}
function An(e) {
  return new _e(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Jt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new _e(e, t, i, s);
}
function Ur(e) {
  return e instanceof jt || (e = Vt(e)), e ? (e = e.rgb(), new _e(e.r, e.g, e.b, e.opacity)) : new _e();
}
function Bi(e, t, i, s) {
  return arguments.length === 1 ? Ur(e) : new _e(e, t, i, s ?? 1);
}
function _e(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
sn(_e, Bi, ws(jt, {
  brighter(e) {
    return e = e == null ? hi : Math.pow(hi, e), new _e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ft : Math.pow(Ft, e), new _e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _e(at(this.r), at(this.g), at(this.b), fi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mn,
  // Deprecated! Use color.formatHex.
  formatHex: Mn,
  formatHex8: qr,
  formatRgb: Pn,
  toString: Pn
}));
function Mn() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}`;
}
function qr() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}${st((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Pn() {
  const e = fi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${at(this.r)}, ${at(this.g)}, ${at(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function fi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function at(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function st(e) {
  return e = at(e), (e < 16 ? "0" : "") + e.toString(16);
}
function On(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Re(e, t, i, s);
}
function xs(e) {
  if (e instanceof Re) return new Re(e.h, e.s, e.l, e.opacity);
  if (e instanceof jt || (e = Vt(e)), !e) return new Re();
  if (e instanceof Re) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, l = o - n, c = (o + n) / 2;
  return l ? (t === o ? a = (i - s) / l + (i < s) * 6 : i === o ? a = (s - t) / l + 2 : a = (t - i) / l + 4, l /= c < 0.5 ? o + n : 2 - o - n, a *= 60) : l = c > 0 && c < 1 ? 0 : a, new Re(a, l, c, e.opacity);
}
function Fr(e, t, i, s) {
  return arguments.length === 1 ? xs(e) : new Re(e, t, i, s ?? 1);
}
function Re(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
sn(Re, Fr, ws(jt, {
  brighter(e) {
    return e = e == null ? hi : Math.pow(hi, e), new Re(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ft : Math.pow(Ft, e), new Re(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new _e(
      Ti(e >= 240 ? e - 240 : e + 120, n, s),
      Ti(e, n, s),
      Ti(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Re(Tn(this.h), ei(this.s), ei(this.l), fi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = fi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Tn(this.h)}, ${ei(this.s) * 100}%, ${ei(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Tn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ei(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ti(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const bs = (e) => () => e;
function Br(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Vr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Hr(e) {
  return (e = +e) == 1 ? _s : function(t, i) {
    return i - t ? Vr(t, i, e) : bs(isNaN(t) ? i : t);
  };
}
function _s(e, t) {
  var i = t - e;
  return i ? Br(e, i) : bs(isNaN(e) ? t : e);
}
const Rn = (function e(t) {
  var i = Hr(t);
  function s(n, o) {
    var a = i((n = Bi(n)).r, (o = Bi(o)).r), l = i(n.g, o.g), c = i(n.b, o.b), p = _s(n.opacity, o.opacity);
    return function(g) {
      return n.r = a(g), n.g = l(g), n.b = c(g), n.opacity = p(g), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Ke(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Vi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ri = new RegExp(Vi.source, "g");
function Wr(e) {
  return function() {
    return e;
  };
}
function Gr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function jr(e, t) {
  var i = Vi.lastIndex = Ri.lastIndex = 0, s, n, o, a = -1, l = [], c = [];
  for (e = e + "", t = t + ""; (s = Vi.exec(e)) && (n = Ri.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), l[a] ? l[a] += o : l[++a] = o), (s = s[0]) === (n = n[0]) ? l[a] ? l[a] += n : l[++a] = n : (l[++a] = null, c.push({ i: a, x: Ke(s, n) })), i = Ri.lastIndex;
  return i < t.length && (o = t.slice(i), l[a] ? l[a] += o : l[++a] = o), l.length < 2 ? c[0] ? Gr(c[0].x) : Wr(t) : (t = c.length, function(p) {
    for (var g = 0, h; g < t; ++g) l[(h = c[g]).i] = h.x(p);
    return l.join("");
  });
}
var Nn = 180 / Math.PI, Hi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ks(e, t, i, s, n, o) {
  var a, l, c;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (c = e * i + t * s) && (i -= e * c, s -= t * c), (l = Math.sqrt(i * i + s * s)) && (i /= l, s /= l, c /= l), e * s < t * i && (e = -e, t = -t, c = -c, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * Nn,
    skewX: Math.atan(c) * Nn,
    scaleX: a,
    scaleY: l
  };
}
var ti;
function Yr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Hi : ks(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Kr(e) {
  return e == null || (ti || (ti = document.createElementNS("http://www.w3.org/2000/svg", "g")), ti.setAttribute("transform", e), !(e = ti.transform.baseVal.consolidate())) ? Hi : (e = e.matrix, ks(e.a, e.b, e.c, e.d, e.e, e.f));
}
function $s(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, g, h, y, m, r) {
    if (p !== h || g !== y) {
      var u = m.push("translate(", null, t, null, i);
      r.push({ i: u - 4, x: Ke(p, h) }, { i: u - 2, x: Ke(g, y) });
    } else (h || y) && m.push("translate(" + h + t + y + i);
  }
  function a(p, g, h, y) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), y.push({ i: h.push(n(h) + "rotate(", null, s) - 2, x: Ke(p, g) })) : g && h.push(n(h) + "rotate(" + g + s);
  }
  function l(p, g, h, y) {
    p !== g ? y.push({ i: h.push(n(h) + "skewX(", null, s) - 2, x: Ke(p, g) }) : g && h.push(n(h) + "skewX(" + g + s);
  }
  function c(p, g, h, y, m, r) {
    if (p !== h || g !== y) {
      var u = m.push(n(m) + "scale(", null, ",", null, ")");
      r.push({ i: u - 4, x: Ke(p, h) }, { i: u - 2, x: Ke(g, y) });
    } else (h !== 1 || y !== 1) && m.push(n(m) + "scale(" + h + "," + y + ")");
  }
  return function(p, g) {
    var h = [], y = [];
    return p = e(p), g = e(g), o(p.translateX, p.translateY, g.translateX, g.translateY, h, y), a(p.rotate, g.rotate, h, y), l(p.skewX, g.skewX, h, y), c(p.scaleX, p.scaleY, g.scaleX, g.scaleY, h, y), p = g = null, function(m) {
      for (var r = -1, u = y.length, f; ++r < u; ) h[(f = y[r]).i] = f.x(m);
      return h.join("");
    };
  };
}
var Xr = $s(Yr, "px, ", "px)", "deg)"), Qr = $s(Kr, ", ", ")", ")"), Zr = 1e-12;
function Dn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Jr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function ed(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const td = (function e(t, i, s) {
  function n(o, a) {
    var l = o[0], c = o[1], p = o[2], g = a[0], h = a[1], y = a[2], m = g - l, r = h - c, u = m * m + r * r, f, _;
    if (u < Zr)
      _ = Math.log(y / p) / t, f = function(P) {
        return [
          l + P * m,
          c + P * r,
          p * Math.exp(t * P * _)
        ];
      };
    else {
      var A = Math.sqrt(u), R = (y * y - p * p + s * u) / (2 * p * i * A), T = (y * y - p * p - s * u) / (2 * y * i * A), b = Math.log(Math.sqrt(R * R + 1) - R), w = Math.log(Math.sqrt(T * T + 1) - T);
      _ = (w - b) / t, f = function(P) {
        var U = P * _, D = Dn(b), z = p / (i * A) * (D * ed(t * U + b) - Jr(b));
        return [
          l + z * m,
          c + z * r,
          p * D / Dn(t * U + b)
        ];
      };
    }
    return f.duration = _ * 1e3 * t / Math.SQRT2, f;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), l = a * a, c = l * l;
    return e(a, l, c);
  }, n;
})(Math.SQRT2, 2, 4);
var vt = 0, Ot = 0, Ct = 0, Es = 1e3, gi, Tt, Ii = 0, dt = 0, xi = 0, Ht = typeof performance == "object" && performance.now ? performance : Date, Ss = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function on() {
  return dt || (Ss(id), dt = Ht.now() + xi);
}
function id() {
  dt = 0;
}
function yi() {
  this._call = this._time = this._next = null;
}
yi.prototype = Cs.prototype = {
  constructor: yi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? on() : +i) + (t == null ? 0 : +t), !this._next && Tt !== this && (Tt ? Tt._next = this : gi = this, Tt = this), this._call = e, this._time = i, Wi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Wi());
  }
};
function Cs(e, t, i) {
  var s = new yi();
  return s.restart(e, t, i), s;
}
function nd() {
  on(), ++vt;
  for (var e = gi, t; e; )
    (t = dt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --vt;
}
function Ln() {
  dt = (Ii = Ht.now()) + xi, vt = Ot = 0;
  try {
    nd();
  } finally {
    vt = 0, od(), dt = 0;
  }
}
function sd() {
  var e = Ht.now(), t = e - Ii;
  t > Es && (xi -= t, Ii = e);
}
function od() {
  for (var e, t = gi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : gi = i);
  Tt = e, Wi(s);
}
function Wi(e) {
  if (!vt) {
    Ot && (Ot = clearTimeout(Ot));
    var t = e - dt;
    t > 24 ? (e < 1 / 0 && (Ot = setTimeout(Ln, e - Ht.now() - xi)), Ct && (Ct = clearInterval(Ct))) : (Ct || (Ii = Ht.now(), Ct = setInterval(sd, Es)), vt = 1, Ss(Ln));
  }
}
function zn(e, t, i) {
  var s = new yi();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var ad = nn("start", "end", "cancel", "interrupt"), rd = [], As = 0, Un = 1, Gi = 2, di = 3, qn = 4, ji = 5, li = 6;
function bi(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  dd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: ad,
    tween: rd,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: As
  });
}
function an(e, t) {
  var i = Ne(e, t);
  if (i.state > As) throw new Error("too late; already scheduled");
  return i;
}
function Ue(e, t) {
  var i = Ne(e, t);
  if (i.state > di) throw new Error("too late; already running");
  return i;
}
function Ne(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function dd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Cs(o, 0, i.time);
  function o(p) {
    i.state = Un, i.timer.restart(a, i.delay, i.time), i.delay <= p && a(p - i.delay);
  }
  function a(p) {
    var g, h, y, m;
    if (i.state !== Un) return c();
    for (g in s)
      if (m = s[g], m.name === i.name) {
        if (m.state === di) return zn(a);
        m.state === qn ? (m.state = li, m.timer.stop(), m.on.call("interrupt", e, e.__data__, m.index, m.group), delete s[g]) : +g < t && (m.state = li, m.timer.stop(), m.on.call("cancel", e, e.__data__, m.index, m.group), delete s[g]);
      }
    if (zn(function() {
      i.state === di && (i.state = qn, i.timer.restart(l, i.delay, i.time), l(p));
    }), i.state = Gi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Gi) {
      for (i.state = di, n = new Array(y = i.tween.length), g = 0, h = -1; g < y; ++g)
        (m = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (n[++h] = m);
      n.length = h + 1;
    }
  }
  function l(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = ji, 1), h = -1, y = n.length; ++h < y; )
      n[h].call(e, g);
    i.state === ji && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
    i.state = li, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function ci(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > Gi && s.state < ji, s.state = li, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function ld(e) {
  return this.each(function() {
    ci(this, e);
  });
}
function cd(e, t) {
  var i, s;
  return function() {
    var n = Ue(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var a = 0, l = s.length; a < l; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function pd(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ue(this, e), a = o.tween;
    if (a !== s) {
      n = (s = a).slice();
      for (var l = { name: t, value: i }, c = 0, p = n.length; c < p; ++c)
        if (n[c].name === t) {
          n[c] = l;
          break;
        }
      c === p && n.push(l);
    }
    o.tween = n;
  };
}
function ud(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Ne(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? cd : pd)(i, e, t));
}
function rn(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Ue(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Ne(n, s).value[t];
  };
}
function Ms(e, t) {
  var i;
  return (typeof t == "number" ? Ke : t instanceof Vt ? Rn : (i = Vt(t)) ? (t = i, Rn) : jr)(e, t);
}
function md(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function hd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function fd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function gd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Id(e, t, i) {
  var s, n, o;
  return function() {
    var a, l = i(this), c;
    return l == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), c = l + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, l)));
  };
}
function yd(e, t, i) {
  var s, n, o;
  return function() {
    var a, l = i(this), c;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), c = l + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, l)));
  };
}
function vd(e, t) {
  var i = wi(e), s = i === "transform" ? Qr : Ms;
  return this.attrTween(e, typeof t == "function" ? (i.local ? yd : Id)(i, s, rn(this, "attr." + e, t)) : t == null ? (i.local ? hd : md)(i) : (i.local ? gd : fd)(i, s, t));
}
function wd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function xd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function bd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && xd(e, o)), i;
  }
  return n._value = t, n;
}
function _d(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && wd(e, o)), i;
  }
  return n._value = t, n;
}
function kd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = wi(e);
  return this.tween(i, (s.local ? bd : _d)(s, t));
}
function $d(e, t) {
  return function() {
    an(this, e).delay = +t.apply(this, arguments);
  };
}
function Ed(e, t) {
  return t = +t, function() {
    an(this, e).delay = t;
  };
}
function Sd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? $d : Ed)(t, e)) : Ne(this.node(), t).delay;
}
function Cd(e, t) {
  return function() {
    Ue(this, e).duration = +t.apply(this, arguments);
  };
}
function Ad(e, t) {
  return t = +t, function() {
    Ue(this, e).duration = t;
  };
}
function Md(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Cd : Ad)(t, e)) : Ne(this.node(), t).duration;
}
function Pd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ue(this, e).ease = t;
  };
}
function Od(e) {
  var t = this._id;
  return arguments.length ? this.each(Pd(t, e)) : Ne(this.node(), t).ease;
}
function Td(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ue(this, e).ease = i;
  };
}
function Rd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Td(this._id, e));
}
function Nd(e) {
  typeof e != "function" && (e = cs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, l = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && l.push(c);
  return new He(s, this._parents, this._name, this._id);
}
function Dd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), l = 0; l < o; ++l)
    for (var c = t[l], p = i[l], g = c.length, h = a[l] = new Array(g), y, m = 0; m < g; ++m)
      (y = c[m] || p[m]) && (h[m] = y);
  for (; l < s; ++l)
    a[l] = t[l];
  return new He(a, this._parents, this._name, this._id);
}
function Ld(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function zd(e, t, i) {
  var s, n, o = Ld(t) ? an : Ue;
  return function() {
    var a = o(this, e), l = a.on;
    l !== s && (n = (s = l).copy()).on(t, i), a.on = n;
  };
}
function Ud(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ne(this.node(), i).on.on(e) : this.each(zd(i, e, t));
}
function qd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Fd() {
  return this.on("end.remove", qd(this._id));
}
function Bd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = en(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var l = s[a], c = l.length, p = o[a] = new Array(c), g, h, y = 0; y < c; ++y)
      (g = l[y]) && (h = e.call(g, g.__data__, y, l)) && ("__data__" in g && (h.__data__ = g.__data__), p[y] = h, bi(p[y], t, i, y, p, Ne(g, i)));
  return new He(o, this._parents, t, i);
}
function Vd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ls(e));
  for (var s = this._groups, n = s.length, o = [], a = [], l = 0; l < n; ++l)
    for (var c = s[l], p = c.length, g, h = 0; h < p; ++h)
      if (g = c[h]) {
        for (var y = e.call(g, g.__data__, h, c), m, r = Ne(g, i), u = 0, f = y.length; u < f; ++u)
          (m = y[u]) && bi(m, t, i, u, y, r);
        o.push(y), a.push(g);
      }
  return new He(o, a, t, i);
}
var Hd = Gt.prototype.constructor;
function Wd() {
  return new Hd(this._groups, this._parents);
}
function Gd(e, t) {
  var i, s, n;
  return function() {
    var o = yt(this, e), a = (this.style.removeProperty(e), yt(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function Ps(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function jd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = yt(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Yd(e, t, i) {
  var s, n, o;
  return function() {
    var a = yt(this, e), l = i(this), c = l + "";
    return l == null && (c = l = (this.style.removeProperty(e), yt(this, e))), a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, l));
  };
}
function Kd(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, l;
  return function() {
    var c = Ue(this, e), p = c.on, g = c.value[o] == null ? l || (l = Ps(t)) : void 0;
    (p !== i || n !== g) && (s = (i = p).copy()).on(a, n = g), c.on = s;
  };
}
function Xd(e, t, i) {
  var s = (e += "") == "transform" ? Xr : Ms;
  return t == null ? this.styleTween(e, Gd(e, s)).on("end.style." + e, Ps(e)) : typeof t == "function" ? this.styleTween(e, Yd(e, s, rn(this, "style." + e, t))).each(Kd(this._id, e)) : this.styleTween(e, jd(e, s, t), i).on("end.style." + e, null);
}
function Qd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Zd(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && Qd(e, a, i)), s;
  }
  return o._value = t, o;
}
function Jd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Zd(e, t, i ?? ""));
}
function el(e) {
  return function() {
    this.textContent = e;
  };
}
function tl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function il(e) {
  return this.tween("text", typeof e == "function" ? tl(rn(this, "text", e)) : el(e == null ? "" : e + ""));
}
function nl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function sl(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && nl(n)), t;
  }
  return s._value = e, s;
}
function ol(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, sl(e));
}
function al() {
  for (var e = this._name, t = this._id, i = Os(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, c, p = 0; p < l; ++p)
      if (c = a[p]) {
        var g = Ne(c, t);
        bi(c, e, i, p, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new He(s, this._parents, e, i);
}
function rl() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var l = { value: a }, c = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var p = Ue(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(c)), p.on = t;
    }), n === 0 && o();
  });
}
var dl = 0;
function He(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Os() {
  return ++dl;
}
var Be = Gt.prototype;
He.prototype = {
  constructor: He,
  select: Bd,
  selectAll: Vd,
  selectChild: Be.selectChild,
  selectChildren: Be.selectChildren,
  filter: Nd,
  merge: Dd,
  selection: Wd,
  transition: al,
  call: Be.call,
  nodes: Be.nodes,
  node: Be.node,
  size: Be.size,
  empty: Be.empty,
  each: Be.each,
  on: Ud,
  attr: vd,
  attrTween: kd,
  style: Xd,
  styleTween: Jd,
  text: il,
  textTween: ol,
  remove: Fd,
  tween: ud,
  delay: Sd,
  duration: Md,
  ease: Od,
  easeVarying: Rd,
  end: rl,
  [Symbol.iterator]: Be[Symbol.iterator]
};
function ll(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var cl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ll
};
function pl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function ul(e) {
  var t, i;
  e instanceof He ? (t = e._id, e = e._name) : (t = Os(), (i = cl).time = on(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], l = a.length, c, p = 0; p < l; ++p)
      (c = a[p]) && bi(c, e, t, p, a, i || pl(c, t));
  return new He(s, this._parents, e, t);
}
Gt.prototype.interrupt = ld;
Gt.prototype.transition = ul;
const ii = (e) => () => e;
function ml(e, {
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
function Ve(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Ve.prototype = {
  constructor: Ve,
  scale: function(e) {
    return e === 1 ? this : new Ve(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Ve(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Dt = new Ve(1, 0, 0);
Ve.prototype;
function Ni(e) {
  e.stopImmediatePropagation();
}
function At(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function hl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function fl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Fn() {
  return this.__zoom || Dt;
}
function gl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Il() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function yl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function vl() {
  var e = hl, t = fl, i = yl, s = gl, n = Il, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, c = td, p = nn("start", "zoom", "end"), g, h, y, m = 500, r = 150, u = 0, f = 10;
  function _(I) {
    I.property("__zoom", Fn).on("wheel.zoom", U, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", z).filter(n).on("touchstart.zoom", L).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", le).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(I, S, v, x) {
    var k = I.selection ? I.selection() : I;
    k.property("__zoom", Fn), I !== k ? b(I, S, v, x) : k.interrupt().each(function() {
      w(this, arguments).event(x).start().zoom(null, typeof S == "function" ? S.apply(this, arguments) : S).end();
    });
  }, _.scaleBy = function(I, S, v, x) {
    _.scaleTo(I, function() {
      var k = this.__zoom.k, $ = typeof S == "function" ? S.apply(this, arguments) : S;
      return k * $;
    }, v, x);
  }, _.scaleTo = function(I, S, v, x) {
    _.transform(I, function() {
      var k = t.apply(this, arguments), $ = this.__zoom, M = v == null ? T(k) : typeof v == "function" ? v.apply(this, arguments) : v, C = $.invert(M), N = typeof S == "function" ? S.apply(this, arguments) : S;
      return i(R(A($, N), M, C), k, a);
    }, v, x);
  }, _.translateBy = function(I, S, v, x) {
    _.transform(I, function() {
      return i(this.__zoom.translate(
        typeof S == "function" ? S.apply(this, arguments) : S,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), a);
    }, null, x);
  }, _.translateTo = function(I, S, v, x, k) {
    _.transform(I, function() {
      var $ = t.apply(this, arguments), M = this.__zoom, C = x == null ? T($) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Dt.translate(C[0], C[1]).scale(M.k).translate(
        typeof S == "function" ? -S.apply(this, arguments) : -S,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), $, a);
    }, x, k);
  };
  function A(I, S) {
    return S = Math.max(o[0], Math.min(o[1], S)), S === I.k ? I : new Ve(S, I.x, I.y);
  }
  function R(I, S, v) {
    var x = S[0] - v[0] * I.k, k = S[1] - v[1] * I.k;
    return x === I.x && k === I.y ? I : new Ve(I.k, x, k);
  }
  function T(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function b(I, S, v, x) {
    I.on("start.zoom", function() {
      w(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      w(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var k = this, $ = arguments, M = w(k, $).event(x), C = t.apply(k, $), N = v == null ? T(C) : typeof v == "function" ? v.apply(k, $) : v, B = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), W = k.__zoom, re = typeof S == "function" ? S.apply(k, $) : S, se = c(W.invert(N).concat(B / W.k), re.invert(N).concat(B / re.k));
      return function(G) {
        if (G === 1) G = re;
        else {
          var X = se(G), V = B / X[2];
          G = new Ve(V, N[0] - X[0] * V, N[1] - X[1] * V);
        }
        M.zoom(null, G);
      };
    });
  }
  function w(I, S, v) {
    return !v && I.__zooming || new P(I, S);
  }
  function P(I, S) {
    this.that = I, this.args = S, this.active = 0, this.sourceEvent = null, this.extent = t.apply(I, S), this.taps = 0;
  }
  P.prototype = {
    event: function(I) {
      return I && (this.sourceEvent = I), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(I, S) {
      return this.mouse && I !== "mouse" && (this.mouse[1] = S.invert(this.mouse[0])), this.touch0 && I !== "touch" && (this.touch0[1] = S.invert(this.touch0[0])), this.touch1 && I !== "touch" && (this.touch1[1] = S.invert(this.touch1[0])), this.that.__zoom = S, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(I) {
      var S = Te(this.that).datum();
      p.call(
        I,
        this.that,
        new ml(I, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: p
        }),
        S
      );
    }
  };
  function U(I, ...S) {
    if (!e.apply(this, arguments)) return;
    var v = w(this, S).event(I), x = this.__zoom, k = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, s.apply(this, arguments)))), $ = et(I);
    if (v.wheel)
      (v.mouse[0][0] !== $[0] || v.mouse[0][1] !== $[1]) && (v.mouse[1] = x.invert(v.mouse[0] = $)), clearTimeout(v.wheel);
    else {
      if (x.k === k) return;
      v.mouse = [$, x.invert($)], ci(this), v.start();
    }
    At(I), v.wheel = setTimeout(M, r), v.zoom("mouse", i(R(A(x, k), v.mouse[0], v.mouse[1]), v.extent, a));
    function M() {
      v.wheel = null, v.end();
    }
  }
  function D(I, ...S) {
    if (y || !e.apply(this, arguments)) return;
    var v = I.currentTarget, x = w(this, S, !0).event(I), k = Te(I.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", B, !0), $ = et(I, v), M = I.clientX, C = I.clientY;
    Cr(I.view), Ni(I), x.mouse = [$, this.__zoom.invert($)], ci(this), x.start();
    function N(W) {
      if (At(W), !x.moved) {
        var re = W.clientX - M, se = W.clientY - C;
        x.moved = re * re + se * se > u;
      }
      x.event(W).zoom("mouse", i(R(x.that.__zoom, x.mouse[0] = et(W, v), x.mouse[1]), x.extent, a));
    }
    function B(W) {
      k.on("mousemove.zoom mouseup.zoom", null), Ar(W.view, x.moved), At(W), x.event(W).end();
    }
  }
  function z(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, x = et(I.changedTouches ? I.changedTouches[0] : I, this), k = v.invert(x), $ = v.k * (I.shiftKey ? 0.5 : 2), M = i(R(A(v, $), x, k), t.apply(this, S), a);
      At(I), l > 0 ? Te(this).transition().duration(l).call(b, M, x, I) : Te(this).call(_.transform, M, x, I);
    }
  }
  function L(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = I.touches, x = v.length, k = w(this, S, I.changedTouches.length === x).event(I), $, M, C, N;
      for (Ni(I), M = 0; M < x; ++M)
        C = v[M], N = et(C, this), N = [N, this.__zoom.invert(N), C.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== N[2] && (k.touch1 = N, k.taps = 0) : (k.touch0 = N, $ = !0, k.taps = 1 + !!g);
      g && (g = clearTimeout(g)), $ && (k.taps < 2 && (h = N[0], g = setTimeout(function() {
        g = null;
      }, m)), ci(this), k.start());
    }
  }
  function q(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), x = I.changedTouches, k = x.length, $, M, C, N;
      for (At(I), $ = 0; $ < k; ++$)
        M = x[$], C = et(M, this), v.touch0 && v.touch0[2] === M.identifier ? v.touch0[0] = C : v.touch1 && v.touch1[2] === M.identifier && (v.touch1[0] = C);
      if (M = v.that.__zoom, v.touch1) {
        var B = v.touch0[0], W = v.touch0[1], re = v.touch1[0], se = v.touch1[1], G = (G = re[0] - B[0]) * G + (G = re[1] - B[1]) * G, X = (X = se[0] - W[0]) * X + (X = se[1] - W[1]) * X;
        M = A(M, Math.sqrt(G / X)), C = [(B[0] + re[0]) / 2, (B[1] + re[1]) / 2], N = [(W[0] + se[0]) / 2, (W[1] + se[1]) / 2];
      } else if (v.touch0) C = v.touch0[0], N = v.touch0[1];
      else return;
      v.zoom("touch", i(R(M, C, N), v.extent, a));
    }
  }
  function le(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), x = I.changedTouches, k = x.length, $, M;
      for (Ni(I), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, m), $ = 0; $ < k; ++$)
        M = x[$], v.touch0 && v.touch0[2] === M.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === M.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (M = et(M, this), Math.hypot(h[0] - M[0], h[1] - M[1]) < f)) {
        var C = Te(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(I) {
    return arguments.length ? (s = typeof I == "function" ? I : ii(+I), _) : s;
  }, _.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : ii(!!I), _) : e;
  }, _.touchable = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : ii(!!I), _) : n;
  }, _.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : ii([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), _) : t;
  }, _.scaleExtent = function(I) {
    return arguments.length ? (o[0] = +I[0], o[1] = +I[1], _) : [o[0], o[1]];
  }, _.translateExtent = function(I) {
    return arguments.length ? (a[0][0] = +I[0][0], a[1][0] = +I[1][0], a[0][1] = +I[0][1], a[1][1] = +I[1][1], _) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, _.constrain = function(I) {
    return arguments.length ? (i = I, _) : i;
  }, _.duration = function(I) {
    return arguments.length ? (l = +I, _) : l;
  }, _.interpolate = function(I) {
    return arguments.length ? (c = I, _) : c;
  }, _.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? _ : I;
  }, _.clickDistance = function(I) {
    return arguments.length ? (u = (I = +I) * I, _) : Math.sqrt(u);
  }, _.tapDistance = function(I) {
    return arguments.length ? (f = +I, _) : f;
  }, _;
}
var wl = Object.defineProperty, xl = Object.getOwnPropertyDescriptor, fe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? xl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && wl(t, i, n), n;
};
function bl(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, l = s.y - i.y, c = n * l - o * a;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * l - (i.y - e.y) * a) / c, g = ((i.x - e.x) * o - (i.y - e.y) * n) / c;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * o, t: p };
}
function _l(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), l = t.x + a * s, c = t.y + a * n;
  return { dist: Math.hypot(e.x - l, e.y - c), t: a };
}
function kl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], l = Math.hypot(a.x - o.x, a.y - o.y) || 1, c = (a.x - o.x) / l, p = (a.y - o.y) / l, g = t.map(([y, m]) => bl(o, a, y, m)).filter((y) => y !== null).filter((y) => y.t * l > i + 2 && (1 - y.t) * l > i + 2).sort((y, m) => y.t - m.t);
    let h = -1 / 0;
    for (const y of g)
      y.t * l - i <= h + 2 || (s += ` L ${y.x - c * i} ${y.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${y.x + c * i} ${y.y + p * i}`, h = y.t * l + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const ht = {
  component: J`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: J`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: J`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: J`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: J`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: J`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: J`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: J`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: J`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: J`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: J`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: J`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: J`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: J`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: J`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: J`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: J`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let me = class extends Le {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Dt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = vl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Te(e).call(this._zoomBehavior);
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
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, l = this.fitInsets.bottom ?? 0, c = Math.max(80, s.width - n - o), p = Math.max(80, s.height - a - l), g = Math.min(...t.map((f) => f.x - f.w / 2)) - e, h = Math.max(...t.map((f) => f.x + f.w / 2)) + e, y = Math.min(...t.map((f) => f.y - f.h / 2)) - e, m = Math.max(...t.map((f) => f.y + f.h / 2)) + e, r = Math.max(0.15, Math.min(c / (h - g), p / (m - y), 1.25)), u = Dt.translate(
      n + c / 2 - r * (g + h) / 2,
      a + p / 2 - r * (y + m) / 2
    ).scale(r);
    Te(i).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Te(t), e);
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
    for (let o = e.parentId; o; o = (s = this.scene.nodes.find((a) => a.id === o)) == null ? void 0 : s.parentId) {
      const a = this.scene.nodes.find((c) => c.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const l = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (l)
        return { x: e.x + (l.x - a.x), y: e.y + (l.y - a.y) };
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
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, a = n.x + s.w / 2 - 10 - e.w / 2, l = n.y - s.h / 2 + 34 + e.h / 2, c = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), a), i = Math.min(Math.max(i, l), c);
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
      const a = (n = o.closest) == null ? void 0 : n.call(o, "[data-node-id]");
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
    const i = this.toScene(e), s = this.nodePos(t);
    let n = !1;
    const o = new Set(this.selectedIds), a = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => o.has(f.id) && !(f.parentId && o.has(f.parentId))
    ) : null, l = a ? new Map(a.map((f) => [f.id, this.nodePos(f)])) : null, c = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, h = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], y = () => {
      const f = [], _ = p === "menu" ? this.scene.nodes.filter((A) => A.kind === "ui-app") : this.scene.nodes.filter((A) => A.id === t.parentId);
      for (const A of _) {
        const R = this.scene.nodes.filter((P) => P.parentId === A.id && h.includes(P.kind ?? "") && P.id !== t.id).sort((P, U) => P.y - U.y), T = A.x - A.w / 2 + 10, b = A.x + A.w / 2 - 10;
        for (const P of R) f.push({ x1: T, x2: b, y: P.y - P.h / 2 - 3, appId: A.id, beforeId: P.id });
        const w = R[R.length - 1];
        f.push({
          x1: T,
          x2: b,
          y: w ? w.y + w.h / 2 + 3 : A.y - A.h / 2 + 34 + 8,
          appId: A.id,
          beforeId: null
        });
      }
      return f;
    }, m = (f) => {
      const _ = this.nodeIdAt(f), A = _ && _ !== t.id ? this.scene.nodes.find((R) => R.id === _) : void 0;
      return A ? A.kind === "external-system" ? A.id : A.parentId ?? null : null;
    }, r = (f) => {
      if ((f.buttons & 1) === 0) {
        u(f);
        return;
      }
      const _ = this.toScene(f), A = _.x - i.x, R = _.y - i.y;
      if (!(!n && Math.hypot(A, R) < 3 / this._t.k))
        if (n = !0, a && l) {
          const T = /* @__PURE__ */ new Map();
          for (const b of a) {
            const w = l.get(b.id), P = this.clampToParent(b, w.x + A, w.y + R);
            T.set(b.id, { x: P.x, y: P.y });
          }
          this._dragGroup = T;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + A, y: s.y + R }, this._menuSlots || (this._menuSlots = { slots: y(), active: null, nestRowId: null });
          const T = this.scene.nodes.filter(
            (w) => h.includes(w.kind ?? "") && w.id !== t.id && Math.abs(_.x - w.x) <= w.w / 2 + 8
          ), b = p === "menu" ? T.find((w) => Math.abs(_.y - w.y) < w.h * 0.28) : void 0;
          if (b)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: b.id }, this._hoverNodeId = b.id;
          else {
            let w = -1, P = 14;
            this._menuSlots.slots.forEach((U, D) => {
              if (_.x < U.x1 - 24 || _.x > U.x2 + 24) return;
              const z = Math.abs(_.y - U.y);
              z < P && (P = z, w = D);
            }), this._menuSlots = { ...this._menuSlots, active: w >= 0 ? w : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(f) ? (this._dragPos = { id: t.id, x: s.x + A, y: s.y + R }, this._hoverNodeId = m(f)) : (this._dragPos = this.clampToParent(t, s.x + A, s.y + R), this._hoverNodeId = null);
    }, u = (f) => {
      if (window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", u), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([_, A]) => ({ id: _, x: A.x, y: A.y }))
        });
      else if (n && this._dragPos && g) {
        const _ = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const A = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (_ != null && _.nestRowId)
          this.emit(A, { id: t.id, nestRowId: _.nestRowId });
        else if (_ && _.active !== null) {
          const R = _.slots[_.active];
          this.emit(A, { id: t.id, appId: R.appId, beforeId: R.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (c(f)) {
          const _ = m(f);
          if (f.ctrlKey && t.kind === "api") {
            _ && _ !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: _,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (_ !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: _,
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
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", u);
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
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, l = this.scene.nodes.filter((u) => u.parentId === t.id), c = Math.min(...l.map((u) => u.x - u.w / 2)), p = Math.max(...l.map((u) => u.x + u.w / 2)), g = Math.min(...l.map((u) => u.y - u.h / 2)), h = Math.max(...l.map((u) => u.y + u.h / 2)), y = Ks(
      l.map((u) => ({ dx: u.x - a.x, dy: u.y - a.y, w: u.w, h: u.h })),
      { w: n, h: o }
    ), m = (u) => {
      if ((u.buttons & 1) === 0) {
        r();
        return;
      }
      const f = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(y.w, 2 * Math.abs(f.x - a.x)),
          h: Math.max(y.h, 2 * Math.abs(f.y - a.y))
        };
        return;
      }
      const _ = a.x - i * a.w / 2, A = a.y - s * a.h / 2, R = i > 0 ? Math.max(f.x, _ + n, l.length ? p + 10 : -1 / 0) : Math.min(f.x, _ - n, l.length ? c - 10 : 1 / 0), T = s > 0 ? Math.max(f.y, A + o, l.length ? h + 10 : -1 / 0) : Math.min(f.y, A - o, l.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + R) / 2,
        y: (A + T) / 2,
        w: Math.abs(R - _),
        h: Math.abs(T - A)
      };
    }, r = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", r), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", r);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const s = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: s.x, y: s.y };
    const n = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const l = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: l.x, y: l.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, o = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o);
      const l = this.nodeIdAt(a);
      l && l !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: l,
        x: a.clientX,
        y: a.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), o = t - s, a = i - n, l = e.w / 2, c = e.h / 2;
    if (o === 0 && a === 0) return { x: s, y: n };
    const p = 1 / Math.max(Math.abs(o) / l, Math.abs(a) / c);
    return { x: s + o * p, y: n + a * p };
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
    const t = this.scene.nodes.find((g) => g.id === e.sourceId), i = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, l = s[s.length - 1] ?? n;
    let c = this.borderPoint(t, a.x, a.y), p = this.borderPoint(i, l.x, l.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const h = Math.hypot(p.x - c.x, p.y - c.y) || 1, y = -(p.y - c.y) / h * g, m = (p.x - c.x) / h * g;
        c = { x: c.x + y, y: c.y + m }, p = { x: p.x + y, y: p.y + m };
      }
    }
    return [c, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (a) => {
      if (!this._wpDrag) return;
      s = !0;
      const l = this.toScene(a), c = [...this._wpDrag.points];
      c[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: c };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = _l(t, e[s], e[s + 1]);
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
    const a = (c) => {
      if ((c.buttons & 1) === 0) {
        l();
        return;
      }
      const p = this.toScene(c);
      if (o) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[n] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - s.x, p.y - s.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(n, 0, p), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: g, index: n };
      }
    }, l = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", l), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", l);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return J`
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
          ${e.tooltip ? J`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), l = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, c = t.slice(1, -1);
    return J`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${kl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? J`<text x=${l.x} y=${l.y - 6} text-anchor="middle"
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
        ${n ? c.map((p, g) => {
      var y;
      const h = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === g;
      return J`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${h ? 6 : 5}
                        fill=${h ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(m) => {
        m.button === 0 && (m.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: g }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], g));
      }}
                        @dblclick=${(m) => {
        m.stopPropagation(), this.removeWaypoint(e, g);
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
    var y, m, r, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, l = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.w : e.w, c = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.h : e.h, p = l / 2, g = c / 2, h = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return J`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (r = this._dragGroup) != null && r.has(e.id) ? "none" : "auto"}
         @pointerdown=${(f) => this.onNodePointerDown(f, e)}
         @dblclick=${(f) => {
      f.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? J`<rect x=${-p - 4} y=${-g - 4} width=${l + 8} height=${c + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${l} height=${c} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? J`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? J`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? J`<g transform="translate(${p - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(f) => {
      f.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(f) => f.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && ht[e.symbol] && !a ? J`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && ht[e.symbol] ? J`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? J`
              <foreignObject x=${-p + 6} y=${o ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(f) => f.stopPropagation()}
                  @keydown=${(f) => {
      f.stopPropagation(), f.key === "Enter" && this.commitRename(e, f.target.value), f.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(f) => this.commitRename(e, f.target.value)}
                />
              </foreignObject>` : a ? J`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : o ? J`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : J`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? J`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([f, _]) => J`
                <circle data-handle cx=${f} cy=${_} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(A) => this.onHandlePointerDown(A, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (f, _) => J`
                <g transform="translate(${-p + 24 + _ * 20}, ${-g})">
                  <circle data-handle r="7" fill=${f.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(A) => this.onHandlePointerDown(A, e, f.kind)}>
                    <title>${f.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([f, _]) => J`
                <rect data-resize x=${f * p - 6.5} y=${_ * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${f * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(A) => this.onResizePointerDown(A, e, f, _)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return J``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return J``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return J`
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
    }, n = (a) => {
      if ((a.buttons & 1) === 0) {
        s();
        return;
      }
      const l = this.toScene(a);
      !i && Math.hypot(l.x - t.x, l.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: l });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a, b: l } = this._rubber, c = Math.min(a.x, l.x), p = Math.max(a.x, l.x), g = Math.min(a.y, l.y), h = Math.max(a.y, l.y), y = this.scene.nodes.filter((m) => {
          const r = this.nodePos(m);
          return r.x >= c && r.x <= p && r.y >= g && r.y <= h;
        }).map((m) => m.id);
        this.emit("nodes-boxed", { ids: y });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return J``;
    const { a: e, b: t } = this._rubber;
    return J`
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, s = Math.max(...t.map((a) => a.x + a.w / 2)) + e, n = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: o - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, o = Dt.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Te(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, l = n.width / this._t.k, c = n.height / this._t.k;
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
      var g, h;
      (h = (g = p.currentTarget).hasPointerCapture) != null && h.call(g, p.pointerId) && this.onMinimapPointer(p, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return J`<rect
              x=${(g.x - p.w / 2 - e.minX) * s}
              y=${(g.y - p.h / 2 - e.minY) * s}
              width=${Math.max(2, p.w * s)}
              height=${Math.max(2, p.h * s)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * s}
            y=${(a - e.minY) * s}
            width=${l * s}
            height=${c * s}
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
        for (let a = 0; a < o.length - 1; a++) t.push([o[a], o[a + 1]]);
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
      (n) => J`
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
          ${this._menuSlots ? J`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, o) => J`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? J`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
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
me.styles = wt`
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
fe([
  ae({ attribute: !1 })
], me.prototype, "scene", 2);
fe([
  ae({ attribute: !1 })
], me.prototype, "selectedId", 2);
fe([
  ae({ attribute: !1 })
], me.prototype, "selectedIds", 2);
fe([
  ae({ type: Boolean })
], me.prototype, "connectable", 2);
fe([
  ae({ attribute: !1 })
], me.prototype, "edgePoints", 2);
fe([
  F()
], me.prototype, "_t", 2);
fe([
  F()
], me.prototype, "_dragPos", 2);
fe([
  F()
], me.prototype, "_menuSlots", 2);
fe([
  F()
], me.prototype, "_dragGroup", 2);
fe([
  F()
], me.prototype, "_pendingLink", 2);
fe([
  F()
], me.prototype, "_hoverNodeId", 2);
fe([
  F()
], me.prototype, "_editingId", 2);
fe([
  F()
], me.prototype, "_spaceDown", 2);
fe([
  F()
], me.prototype, "_wpDrag", 2);
fe([
  F()
], me.prototype, "_selectedWaypoint", 2);
fe([
  F()
], me.prototype, "_resize", 2);
fe([
  F()
], me.prototype, "_rubber", 2);
fe([
  ae({ attribute: !1 })
], me.prototype, "fitInsets", 2);
me = fe([
  xt("modux-canvas")
], me);
const Q = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function $e(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ue(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const ut = (e) => e.trim().toLowerCase();
function $l(e, t) {
  var D, z, L, q, le;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((I) => [I.id, I.name])), n = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((S) => ({ ...S, moduleId: I.id }))
  ), o = new Set(n.map((I) => I.id)), a = e.aggregates ?? [], l = new Set(
    e.modules.flatMap((I) => (I.domainServices ?? []).map((S) => S.id))
  ), c = e.modules.flatMap(
    (I) => (I.domainEvents ?? []).map((S) => ({ ...S, moduleId: I.id, application: !1 }))
  ), p = e.modules.flatMap(
    (I) => (I.applicationEvents ?? []).map((S) => ({ ...S, moduleId: I.id, application: !0 }))
  ), g = e.modules.flatMap(
    (I) => (I.readModels ?? []).map((S) => ({ ...S, moduleId: I.id }))
  );
  for (const I of n)
    $e(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Q.command.w,
      h: Q.command.h,
      kind: "use-case",
      symbol: I.policy ? "flow" : "gear",
      fill: I.policy ? Q.policy.fill : Q.command.fill,
      stroke: I.policy ? Q.policy.stroke : Q.command.stroke,
      badge: I.policy ? "POLICY" : "COMANDO",
      tooltip: I.policy ? `${I.name} — policy de ${s.get(I.moduleId) ?? I.moduleId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  for (const I of a)
    $e(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Q.aggregate.w,
      h: Q.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Q.aggregate.fill,
      stroke: Q.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${I.name} — agregado de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const I of [...c, ...p])
    $e(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Q.event.w,
      h: Q.event.h,
      kind: I.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: Q.event.fill,
      stroke: Q.event.stroke,
      badge: I.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${I.name} — evento de ${s.get(I.moduleId) ?? I.moduleId}`
    }), h.set(ut(I.name), I.id);
  const y = (I) => {
    if (!I || !I.trim()) return null;
    const S = h.get(ut(I));
    if (S) return S;
    const v = `evname:${ut(I)}`;
    return $e(i, {
      id: v,
      label: I,
      x: 0,
      y: 0,
      w: Q.event.w,
      h: Q.event.h,
      kind: "event-name",
      symbol: "event",
      fill: Q.event.fill,
      stroke: Q.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${I} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, m = (I) => {
    const S = g.find((x) => x.id === I.id) ?? g.find((x) => I.name && ut(x.name) === ut(I.name)), v = (S == null ? void 0 : S.id) ?? (I.id || (I.name ? `rm:${ut(I.name)}` : null));
    return v ? ($e(i, {
      id: v,
      label: (S == null ? void 0 : S.name) ?? I.name ?? v,
      x: 0,
      y: 0,
      w: Q.readModel.w,
      h: Q.readModel.h,
      kind: S ? "read-model" : "derived-read-model",
      fill: Q.readModel.fill,
      stroke: Q.readModel.stroke,
      dashed: !S,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!o.has(I.targetId)) continue;
    const S = (e.actors ?? []).find((v) => v.id === I.actorId);
    S && ($e(i, {
      id: S.id,
      label: S.name,
      x: 0,
      y: 0,
      w: Q.actor.w,
      h: Q.actor.h,
      kind: "actor",
      symbol: "person",
      fill: Q.actor.fill,
      stroke: Q.actor.stroke,
      badge: "ACTOR"
    }), ue(i, {
      id: `es-actor:${S.id}->${I.targetId}`,
      sourceId: S.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const S = (e.agentUses ?? []).filter((M) => M.agentId === I.id), v = (e.agentExternalUses ?? []).filter((M) => M.agentId === I.id), x = (e.agentRags ?? []).filter((M) => M.agentId === I.id), k = (e.agentMcpUses ?? []).filter((M) => M.agentId === I.id), $ = (e.agentGatewayUses ?? []).some((M) => M.agentId === I.id) || (e.agentApiOpUses ?? []).some((M) => M.agentId === I.id) || (e.agentQueryUses ?? []).some((M) => M.agentId === I.id) || (e.agentDelegations ?? []).some((M) => M.agentId === I.id) || (e.agentTriggers ?? []).some((M) => M.agentId === I.id);
    if (!(!S.length && !v.length && !x.length && !k.length && !$)) {
      $e(i, {
        id: I.id,
        label: I.name,
        x: 0,
        y: 0,
        w: Q.actor.w,
        h: Q.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${I.name} — agente de IA (consume por MCP)`
      });
      for (const M of S)
        o.has(M.useCaseId) && ue(i, {
          id: `es-agent:${I.id}->${M.useCaseId}`,
          sourceId: I.id,
          targetId: M.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const M of v) {
        const C = e.externalSystems.find(
          (B) => (B.useCases ?? []).some((W) => W.id === M.externalUseCaseId)
        );
        if (!C) continue;
        const N = (D = (C.useCases ?? []).find((B) => B.id === M.externalUseCaseId)) == null ? void 0 : D.name;
        $e(i, {
          id: C.id,
          label: C.name,
          x: 0,
          y: 0,
          w: Q.external.w,
          h: Q.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Q.external.fill,
          stroke: Q.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentx:${I.id}->${M.externalUseCaseId}`,
          sourceId: I.id,
          targetId: C.id,
          kind: "es-agent-external",
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Llama a ${N} del sistema externo` : void 0
        });
      }
      for (const M of k) {
        const C = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((W) => W.id === M.mcpServerId)
        );
        if (!C) continue;
        const N = (z = (C.mcpServers ?? []).find((B) => B.id === M.mcpServerId)) == null ? void 0 : z.name;
        $e(i, {
          id: C.id,
          label: C.name,
          x: 0,
          y: 0,
          w: Q.external.w,
          h: Q.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Q.external.fill,
          stroke: Q.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentmcp:${I.id}->${M.mcpServerId}`,
          sourceId: I.id,
          targetId: C.id,
          kind: "es-agent-mcp",
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Consume las herramientas del servidor MCP ${N}` : void 0
        });
      }
      for (const M of x) {
        const C = (e.rags ?? []).find((N) => N.id === M.ragId);
        if (C) {
          $e(i, {
            id: C.id,
            label: C.name,
            x: 0,
            y: 0,
            w: Q.readModel.w,
            h: Q.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${C.name} — base de conocimiento (retrieval)`
          }), ue(i, {
            id: `es-agrag:${I.id}->${C.id}`,
            sourceId: I.id,
            targetId: C.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const N of C.sourceReadModelIds ?? []) {
            const B = m({ id: N });
            B && ue(i, {
              id: `es-ragsrc:${C.id}->${B}`,
              sourceId: B,
              targetId: C.id,
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
  const r = (I) => {
    const S = e.externalSystems.find((v) => v.id === I);
    return S ? ($e(i, {
      id: S.id,
      label: S.name,
      x: 0,
      y: 0,
      w: Q.external.w,
      h: Q.external.h,
      kind: "external-system",
      symbol: "component",
      fill: Q.external.fill,
      stroke: Q.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), S.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const S = r(I.externalSystemId);
    !S || !o.has(I.useCaseId) || ue(i, {
      id: `es-extin:${S}->${I.useCaseId}`,
      sourceId: S,
      targetId: I.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const I of e.externalUseCaseCalls ?? []) {
    if (!o.has(I.sourceId)) continue;
    const S = e.externalSystems.find(
      (k) => (k.useCases ?? []).some(($) => $.id === I.targetId)
    ), v = S ? r(S.id) : null;
    if (!v) continue;
    const x = (L = ((S == null ? void 0 : S.useCases) ?? []).find((k) => k.id === I.targetId)) == null ? void 0 : L.name;
    ue(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: x,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: x ? `Llama a ${x} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !o.has(I.sourceId) || !i.nodes.has(I.targetId) || ue(i, {
      id: `es-write:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: I.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const u = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const I of u)
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (o.has(I.sourceId) || a.some((v) => v.id === I.sourceId) || l.has(I.sourceId))) || ue(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const f = (I, S, v, x, k, $) => ($e(i, {
    id: I,
    label: S,
    x: 0,
    y: 0,
    w: Q.policy.w,
    h: Q.policy.h,
    kind: v,
    symbol: "flow",
    fill: Q.policy.fill,
    stroke: Q.policy.stroke,
    badge: x,
    tooltip: k
  }), I), _ = (I, S) => {
    const v = y(I);
    v && ue(i, {
      id: `es-trigger:${v}->${S}`,
      sourceId: v,
      targetId: S,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, A = (I, S) => {
    !S || !o.has(S) || ue(i, {
      id: `es-invoke:${I}->${S}`,
      sourceId: I,
      targetId: S,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const S = f(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    _(I.eventName, S);
    for (const v of I.actions ?? []) {
      if (v.type === "CallUseCase" && A(S, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const x = `saga:${v.sagaId}`;
        f(x, v.sagaId, "saga", "SAGA"), ue(i, {
          id: `es-saga:${S}->${x}`,
          sourceId: S,
          targetId: x,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const x = (e.projections ?? []).find((k) => k.id === v.projectionId);
        x && ue(i, {
          id: `es-feeds:${S}->${x.id}`,
          sourceId: S,
          targetId: x.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const I of e.projections ?? []) {
    const S = f(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const k of I.handledEventIds) {
      const $ = i.nodes.has(k) ? k : null;
      $ && ue(i, {
        id: `es-trigger:${$}->${S}`,
        sourceId: $,
        targetId: S,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && i.nodes.has(I.sourceAggregateId) && ue(i, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: S,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (v) {
      const k = e.externalSystems.find(
        (M) => (M.useCases ?? []).some((C) => C.id === v) || (M.tables ?? []).some((C) => C.id === v)
      ), $ = k ? r(k.id) : null;
      if ($) {
        const M = ((q = (k.useCases ?? []).find((C) => C.id === v)) == null ? void 0 : q.name) ?? ((le = (k.tables ?? []).find((C) => C.id === v)) == null ? void 0 : le.name);
        ue(i, {
          id: `es-poll:${I.id}`,
          sourceId: $,
          targetId: S,
          kind: "es-projects-poll",
          label: M,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: M ? `polling de ${M}` : "polling"
        });
      }
    }
    const x = m({ id: I.readModelId, name: I.readModelName });
    x && ue(i, {
      id: `es-projects:${S}->${x}`,
      sourceId: S,
      targetId: x,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const v = y(I.triggerEvent), x = m({ name: I.readModelName ?? `${I.triggerEvent}View` });
      v && x && ue(i, {
        id: `es-mat:${I.id}`,
        sourceId: v,
        targetId: x,
        kind: "es-materializes",
        label: I.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${I.name} [MATERIALIZES]`
      });
      continue;
    }
    const S = f(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (_(I.triggerEvent, S), A(S, I.targetUseCaseId), !I.targetUseCaseId) {
      const v = r(I.targetId), x = v ?? `tgt:${I.targetId}`;
      !v && s.has(I.targetId) && $e(i, {
        id: x,
        label: s.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: Q.module.w,
        h: Q.module.h,
        kind: "module",
        symbol: "component",
        fill: Q.module.fill,
        stroke: Q.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(x) && ue(i, {
        id: `es-deliver:${I.id}`,
        sourceId: S,
        targetId: x,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const I of e.processes ?? []) {
    const S = f(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    _(I.triggerEvent, S);
    for (const x of I.steps) A(S, x.useCaseId);
    const v = y(I.onCompletionEventName);
    v && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: S,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const S = f(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    _(I.triggerEvent, S);
    for (const x of I.steps ?? []) {
      A(S, x.targetUseCaseId);
      for (const k of [x.emittedEventName, x.completionEventName]) {
        const $ = y(k);
        $ && ue(i, {
          id: `es-wfemit:${I.id}:${$}`,
          sourceId: S,
          targetId: $,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = y(I.onCompletionEventName);
    v && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: S,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const R = [...i.nodes.values()], T = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    T.has(I.targetId) || T.set(I.targetId, []), T.get(I.targetId).push(I.sourceId);
  const b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set(), P = (I) => {
    const S = b.get(I);
    if (S !== void 0) return S;
    if (w.has(I)) return 0;
    w.add(I);
    const v = T.get(I) ?? [], x = v.length ? 1 + Math.max(...v.map(P)) : 0;
    return w.delete(I), b.set(I, x), x;
  }, U = /* @__PURE__ */ new Map();
  for (const I of R) {
    const S = t[I.id];
    if (S) {
      I.x = S.x, I.y = S.y;
      continue;
    }
    const v = P(I.id), x = U.get(v) ?? 0;
    U.set(v, x + 1), I.x = 140 + v * 260, I.y = 110 + x * 110;
  }
  return { nodes: R, edges: i.edges };
}
const El = 190, Sl = 56, Bn = 180, Cl = 56, Al = 150, Ml = 44, Vn = 250, Hn = 100;
function Pl(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((l) => t.get(l)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Ol(e, t) {
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
function Tl(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (l) => {
    var c;
    return (c = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === l)) == null ? void 0 : c.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((l) => {
    var f;
    const c = new Map(l.steps.map((_) => [_.id, _])), p = new Map(l.steps.map((_) => [_.id, Pl(_, c)])), g = /* @__PURE__ */ new Map();
    for (const _ of l.steps) {
      const A = p.get(_.id) ?? 0;
      g.set(A, (g.get(A) ?? 0) + 1);
    }
    const h = Math.max(1, ...g.values()), y = Ol(e, l);
    if (y && !n.has(y.id)) {
      n.add(y.id);
      const _ = t[y.id] ?? { x: 140, y: a };
      i.push({
        id: y.id,
        label: y.label,
        x: _.x,
        y: _.y,
        w: Al,
        h: Ml,
        kind: y.kind,
        symbol: y.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: y.kind === "aggregate" ? "AGGREGATE" : y.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const m = t[l.id] ?? { x: 420, y: a };
    i.push({
      id: l.id,
      label: l.name,
      x: m.x,
      y: m.y,
      w: El,
      h: Sl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}${l.onCompletionEventName ? ` · emite ${l.onCompletionEventName} al completar` : ""}`
    }), y && s.push({
      id: `wft:${l.id}`,
      sourceId: y.id,
      targetId: l.id,
      kind: "workflow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    });
    const r = /* @__PURE__ */ new Map();
    let u = 0;
    for (const _ of l.steps) {
      const A = p.get(_.id) ?? 0;
      u = Math.max(u, A);
      const R = r.get(A) ?? 0;
      r.set(A, R + 1);
      const T = t[_.id] ?? {
        x: m.x + (A + 1) * Vn,
        y: a + (R - (g.get(A) - 1) / 2) * Hn
      }, b = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: T.x,
        y: T.y,
        w: Bn,
        h: Cl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: b ? `→ ${b}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${b ? ` · lanza ${b}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const w = (_.dependsOnStepIds ?? []).filter((P) => c.has(P));
      w.length === 0 && s.push({
        id: `wfs:${l.id}:${_.id}`,
        sourceId: l.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const P of w)
        s.push({
          id: `wfdep:${P}->${_.id}`,
          sourceId: P,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((f = c.get(P)) == null ? void 0 : f.name) ?? P}`
        });
    }
    if (l.onCompletionEventName) {
      const _ = `done:${l.id}`, A = t[_] ?? { x: m.x + (u + 2) * Vn, y: a };
      i.push({
        id: _,
        label: l.onCompletionEventName,
        x: A.x,
        y: A.y,
        w: Bn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const R = new Set(l.steps.flatMap((b) => b.dependsOnStepIds ?? [])), T = l.steps.filter((b) => !R.has(b.id));
      for (const b of T.length ? T : [])
        s.push({
          id: `wfd:${l.id}:${b.id}`,
          sourceId: b.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      l.steps.length || s.push({
        id: `wfd:${l.id}`,
        sourceId: l.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, h + 1) * Hn + 60;
  }), { nodes: i, edges: s };
}
const Wn = 250, Ge = 30, ni = 6, Rl = 16, Gn = 190, Nl = 60, Dl = 170, si = 44;
function Ll(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ge(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function zl(e) {
  const t = [], i = (s, n, o) => {
    for (const a of s ?? []) {
      const l = [...n, a.label];
      t.push({ entry: a, path: l, depth: o }), i(a.children ?? [], l, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Ul(e, t) {
  var _, A, R, T;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], a = (b) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.useCases ?? []).find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  }, l = (b) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.queryServices ?? []).find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  }, c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const b of n) {
    const w = zl(b), P = Math.max(
      90,
      54 + w.length * (Ge + ni)
    ), U = t[b.id] ?? { x: 190, y: p + P / 2 };
    p = U.y + P / 2 + 70;
    const D = b.type ?? "APP";
    i.push({
      id: b.id,
      label: b.title || b.name,
      x: U.x,
      y: U.y,
      w: Wn,
      h: P,
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
      tooltip: D === "ORCHESTRATOR" ? `${b.name} — orquesta y mantiene estado; solo enseña páginas hijas` : D === "MASTER_DETAIL" ? `${b.name} — cabecera + pestañas (ambas son páginas)` : `App: ${b.name}`
    }), b.modelId && (c.set(b.modelId, {
      label: ((_ = (e.models ?? []).find((q) => q.id === b.modelId)) == null ? void 0 : _.name) ?? b.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${b.id}->${b.modelId}`,
      sourceId: b.id,
      targetId: b.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [q, le, I, S, v] of [
      [b.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [b.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      q && s.push({
        id: `${le === "app-view" ? "appview" : "appedit"}:${b.id}->${q}`,
        sourceId: b.id,
        targetId: q,
        kind: le,
        color: S,
        label: I,
        arrow: !0,
        tooltip: v
      });
    const z = b.homePageId ?? b.homeAppId;
    z && s.push({
      id: `apphome:${b.id}->${z}`,
      sourceId: b.id,
      targetId: z,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: b.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), D === "MASTER_DETAIL" && b.headerPageId && s.push({
      id: `appheader:${b.id}->${b.headerPageId}`,
      sourceId: b.id,
      targetId: b.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let L = U.y - P / 2 + 34 + 10 + Ge / 2;
    for (const { entry: q, path: le, depth: I } of w) {
      const S = Ll(b.id, q, le), v = I * Rl;
      if (i.push({
        id: S,
        label: q.label,
        x: U.x + v / 2,
        y: L,
        w: Wn - 20 - v,
        h: Ge,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (A = q.children) != null && A.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (R = q.children) != null && R.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: b.id,
        tooltip: (T = q.children) != null && T.length ? "Agrupador (con submenú): no puede abrir nada" : q.pageId ? `Abre ${q.pageId}` : q.uiAdapterId ? `Abre la app ${q.uiAdapterId}` : q.useCaseId ? `Lanza ${q.useCaseId}` : q.aggregateId ? `CRUD inferido sobre ${q.aggregateId}` : q.queryOperationId ? `Listado con filtros de ${q.queryOperationId}` : "Entrada de menú sin destino"
      }), L += Ge + ni, q.uiAdapterId && n.some((x) => x.id === q.uiAdapterId) && s.push({
        id: `menuapp:${S}->${q.uiAdapterId}`,
        sourceId: S,
        targetId: q.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), q.useCaseId && e.modules.some((k) => (k.useCases ?? []).some(($) => $.id === q.useCaseId)) && (c.set(q.useCaseId, {
        label: a(q.useCaseId),
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
      })), q.aggregateId && (e.aggregates ?? []).some((x) => x.id === q.aggregateId)) {
        const x = (e.aggregates ?? []).find((k) => k.id === q.aggregateId);
        c.set(x.id, { label: x.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${S}->${x.id}`,
          sourceId: S,
          targetId: x.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (q.queryOperationId) {
        const x = e.modules.flatMap(($) => $.queryServices ?? []).find(($) => $.id === q.queryServiceId), k = ((x == null ? void 0 : x.operations) ?? []).find(($) => $.id === q.queryOperationId);
        x && k && (c.set(k.id, {
          label: `${k.name} (${x.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${S}->${k.id}`,
          sourceId: S,
          targetId: k.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      q.pageId && o.some((x) => x.id === q.pageId) && s.push({
        id: `menupage:${S}->${q.pageId}`,
        sourceId: S,
        targetId: q.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const h = (b) => {
    var w;
    return ((w = o.find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  };
  for (const b of o) {
    const w = t[b.id] ?? { x: 640, y: g }, P = b.type === "WIZARD" ? b.wizardSteps ?? [] : [], U = P.length ? 54 + P.length * (Ge + ni) : Nl;
    g = w.y + U + 90, i.push({
      id: b.id,
      label: b.name,
      x: w.x,
      y: w.y,
      w: Gn,
      h: U,
      kind: "page",
      symbol: "interface",
      badge: b.type ?? "PAGE",
      container: P.length > 0,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...b.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: b.route ? `${b.type ?? "PAGE"} · ${b.route}` : b.type ?? "PAGE"
    });
    let D = w.y - U / 2 + 34 + 10 + Ge / 2;
    P.forEach((z, L) => {
      const q = z.id ?? z.pageId ?? String(L);
      i.push({
        id: `wizrow:${b.id}:${q}`,
        label: `${L + 1}. ${z.label ?? (z.pageId ? h(z.pageId) : "Paso")}${z.pageId ? "" : " ⌁"}`,
        x: w.x,
        y: D,
        w: Gn - 20,
        h: Ge,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: z.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: b.id,
        tooltip: z.pageId ? `Paso ${L + 1}: ${h(z.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${L + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), D += Ge + ni;
    });
    for (const [z, L, q, le] of [
      [b.crudDetailPageId ?? b.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [b.crudCreatePageId ?? b.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      z && s.push({
        id: `${L === "crud-detail" ? "cruddetail" : "crudnew"}:${b.id}->${z}`,
        sourceId: b.id,
        targetId: z,
        kind: L,
        color: le,
        label: q,
        dashed: !0,
        arrow: !0,
        tooltip: L === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let z = 0; z < (b.wizardSteps ?? []).length; z++) {
      const L = (b.wizardSteps ?? [])[z];
      if (!L.pageId) continue;
      const q = L.id ?? L.pageId;
      s.push({
        id: `wizstep:${b.id}:${q}`,
        sourceId: `wizrow:${b.id}:${q}`,
        targetId: L.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${z + 1} — Supr desmapea`
      });
    }
    b.modelId && (c.set(b.modelId, {
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
    for (const z of b.buttons ?? [])
      z.useCaseId && (c.set(z.useCaseId, {
        label: a(z.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${b.id}->${z.useCaseId}`,
        sourceId: b.id,
        targetId: z.useCaseId,
        kind: "page-button",
        label: z.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: z.mappingId ? `Botón «${z.label}» — mapping ${z.mappingId}` : `Botón «${z.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    b.listingQueryServiceId && (c.set(b.listingQueryServiceId, {
      label: l(b.listingQueryServiceId),
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
  let y = 160;
  for (const b of e.models ?? [])
    c.has(b.id) || c.set(b.id, { label: b.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [b, w] of c) {
    const P = t[b] ?? { x: 1050, y };
    y = P.y + si + 46, i.push({
      id: b,
      label: w.label,
      x: P.x,
      y: P.y,
      w: Dl,
      h: si,
      kind: w.kind,
      symbol: w.symbol,
      fill: "#ffffff",
      stroke: w.stroke
    });
  }
  let m = 120;
  for (const b of e.identityProviders ?? []) {
    const w = t[b.id] ?? { x: -320, y: m };
    m = w.y + 70 + 40, i.push({
      id: b.id,
      label: b.name,
      x: w.x,
      y: w.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: b.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!b.publishedByExternalSystemId,
      badge: b.type ?? "IDP",
      tooltip: `${b.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const b of n)
    b.identityProviderId && (e.identityProviders ?? []).some((w) => w.id === b.identityProviderId) && s.push({
      id: `idpauth:${b.id}`,
      sourceId: b.id,
      targetId: b.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const r = (e.actorAppUses ?? []).filter(
    (b) => n.some((w) => w.id === b.appId) && (e.actors ?? []).some((w) => w.id === b.actorId)
  ), u = [...new Set(r.map((b) => b.actorId))];
  let f = 160;
  for (const b of u) {
    const w = (e.actors ?? []).find((U) => U.id === b), P = t[b] ?? { x: -60, y: f };
    f = P.y + si + 46, i.push({
      id: b,
      label: w.name,
      x: P.x,
      y: P.y,
      w: 150,
      h: si,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const b of r)
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
const ql = 168, Fl = 48;
function Bl(e, t) {
  const i = [], s = [], n = e.models ?? [], o = e.modelMappings ?? [], a = (h) => {
    var y;
    return ((y = n.find((m) => m.id === h)) == null ? void 0 : y.name) ?? h ?? "?";
  };
  n.forEach((h, y) => {
    const m = t[h.id] ?? { x: 200 + y % 5 * 260, y: 140 + Math.floor(y / 5) * 150 };
    i.push({
      id: h.id,
      label: h.name,
      x: m.x,
      y: m.y,
      w: ql,
      h: Fl,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      tooltip: `${h.name} — arrastra el asa hasta otro modelo para crear un mapeado`
    });
  });
  const l = new Set(i.map((h) => h.id));
  for (const h of o)
    !h.sourceModelId || !h.targetModelId || !l.has(h.sourceModelId) || !l.has(h.targetModelId) || s.push({
      id: `mapping:${h.id}`,
      sourceId: h.sourceModelId,
      targetId: h.targetModelId,
      kind: "model-mapping",
      color: "#7c3aed",
      label: h.name,
      arrow: !0,
      tooltip: `${h.name} — las reglas campo a campo viven en su ficha; Supr lo elimina`
    });
  const c = new Set(
    o.filter((h) => h.sourceModelId && h.targetModelId).map((h) => `${h.sourceModelId}->${h.targetModelId}`)
  ), p = new Map(
    e.modules.flatMap((h) => (h.useCases ?? []).map((y) => [y.id, y]))
  ), g = /* @__PURE__ */ new Set();
  for (const h of e.pages ?? [])
    if (h.modelId)
      for (const y of h.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const m = p.get(y.useCaseId);
        if (!(m != null && m.inputModelId) || m.inputModelId === h.modelId) continue;
        const r = `${h.modelId}->${m.inputModelId}`;
        c.has(r) || g.has(r) || (g.add(r), !(!l.has(h.modelId) || !l.has(m.inputModelId)) && s.push({
          id: `mapgap:${h.id}:${y.useCaseId}`,
          sourceId: h.modelId,
          targetId: m.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${h.name}) llama a ${m.name}: falta mapear ${a(h.modelId)} → ${a(m.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function Vl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((c) => c.e), s = new i(), o = {
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
    children: e.nodes.map((c) => ({ id: c.id, width: c.w, height: c.h })),
    edges: e.edges.map((c) => ({ id: c.id, sources: [c.sourceId], targets: [c.targetId] }))
  }, a = await s.layout(o), l = {};
  for (const c of a.children ?? [])
    l[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return l;
}
var Hl = Object.defineProperty, Wl = Object.getOwnPropertyDescriptor, De = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Wl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Hl(t, i, n), n;
};
const Gl = /* @__PURE__ */ new Set([
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
let Se = class extends Le {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var o, a;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus(), (o = this.setPointerCapture) == null || o.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (a = t == null ? void 0 : t.closest) == null ? void 0 : a.call(t, ".h3");
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
        const a = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), l = (n = a == null ? void 0 : a.closest) == null ? void 0 : n.call(a, ".n3"), c = (l == null ? void 0 : l.dataset.nodeId) ?? null;
        this._hoverTargetId = c !== this._connect.sourceId ? c : null;
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
    const a = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), l = a.transformPoint(new DOMPoint(0, 0, 0, 1)), c = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, h = t - i.top, y = c.x - g * c.w, m = p.x - g * p.w, r = c.y - h * c.w, u = p.y - h * p.w, f = g * l.w - l.x, _ = h * l.w - l.y, A = y * u - m * r;
    return A ? { x: (f * u - m * _) / A, y: (y * _ - f * r) / A } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const o = s.parentId ? e.get(s.parentId) : void 0, a = o ? i(o) + 1 : 0;
      return t.set(s.id, a), a;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return E`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((f) => [f.id, f])), s = Math.min(...e.map((f) => f.x - f.w / 2)) - 60, n = Math.max(...e.map((f) => f.x + f.w / 2)) + 60, o = Math.min(...e.map((f) => f.y - f.h / 2)) - 60, a = Math.max(...e.map((f) => f.y + f.h / 2)) + 60, l = (s + n) / 2, c = (o + a) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (n - s), p.height / (a - o), 1) * 0.9 : 0.5, h = this._k * g;
    this._kUsed = h, this._center = { x: l, y: c };
    const y = 30, m = this._liveMove, r = (f) => f.x + ((m == null ? void 0 : m.id) === f.id ? m.dx : 0), u = (f) => f.y + ((m == null ? void 0 : m.id) === f.id ? m.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${h}, ${h}, ${h}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-l}px, ${-c}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${o}px"
            width=${n - s}
            height=${a - o}
            viewBox="${s} ${o} ${n - s} ${a - o}"
          >
            ${this.scene.edges.map((f) => {
      const _ = i.get(f.sourceId), A = i.get(f.targetId);
      return !_ || !A ? "" : J`<line
                x1=${r(_)} y1=${u(_)} x2=${r(A)} y2=${u(A)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((f) => {
      const _ = i.get(f.sourceId), A = i.get(f.targetId);
      if (!_ || !A) return "";
      const R = (t.get(_.id) ?? 0) * y + 2, T = (t.get(A.id) ?? 0) * y + 2, b = r(A) - r(_), w = u(A) - u(_), P = T - R, U = Math.hypot(b, w), D = Math.hypot(U, P), z = Math.atan2(w, b) * 180 / Math.PI, L = Math.atan2(P, U) * 180 / Math.PI, q = f.color ?? "#64748b", le = f.dashed ? `repeating-linear-gradient(90deg, ${q} 0 6px, transparent 6px 10px)` : q;
      return E`<div
              class="edge3"
              style="
                left: ${r(_)}px; top: ${u(_)}px; width: ${D}px; height: 1.7px;
                transform: translateZ(${R}px) rotateZ(${z}deg) rotateY(${-L}deg);
                background: ${le};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((f) => {
      const _ = t.get(f.id) ?? 0, A = f.container || _ === 0, R = this._hoverTargetId === f.id;
      return E`
              <div
                class="n3 ${f.container ? "container3" : ""} ${this.selectedId === f.id ? "selected3" : ""} ${R ? "hover3" : ""}"
                data-node-id=${f.id}
                data-kind=${f.kind}
                title=${f.tooltip ?? f.label}
                style="
                  left: ${r(f) - f.w / 2}px; top: ${u(f) - f.h / 2}px;
                  width: ${f.w}px; height: ${f.h}px;
                  transform: translateZ(${_ * y + (R ? 8 : 0)}px)${R ? " scale(1.06)" : ""};
                  background: ${f.container ? "color-mix(in srgb, " + (f.fill ?? "#ffffff") + " 82%, transparent)" : f.fill ?? "#ffffff"};
                  border-color: ${f.stroke ?? "#64748b"};
                  border-style: ${f.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${A ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${f.badge ? E`<span class="badge3" style="color: ${f.stroke ?? "#94a3b8"}">${f.badge}</span>` : ""}
                <span>${f.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const f = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!f || !Gl.has(f.kind)) return "";
      const _ = (t.get(f.id) ?? 0) * y + 4;
      return [
        [r(f) + f.w / 2, u(f)],
        [r(f) - f.w / 2, u(f)],
        [r(f), u(f) + f.h / 2],
        [r(f), u(f) - f.h / 2]
      ].map(
        ([R, T]) => E`<div
                class="h3"
                data-source-id=${f.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${R}px; top: ${T}px; transform: translateZ(${_}px)"
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
Se.styles = wt`
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
De([
  ae({ attribute: !1 })
], Se.prototype, "scene", 2);
De([
  ae({ attribute: !1 })
], Se.prototype, "selectedId", 2);
De([
  ae({ attribute: !1 })
], Se.prototype, "connectable", 2);
De([
  F()
], Se.prototype, "_rx", 2);
De([
  F()
], Se.prototype, "_rz", 2);
De([
  F()
], Se.prototype, "_k", 2);
De([
  F()
], Se.prototype, "_pan", 2);
De([
  F()
], Se.prototype, "_liveMove", 2);
De([
  F()
], Se.prototype, "_connect", 2);
De([
  F()
], Se.prototype, "_hoverTargetId", 2);
Se = De([
  xt("modux-tilt")
], Se);
var jl = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, he = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Yl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && jl(t, i, n), n;
};
const jn = [
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
let oe = class extends Le {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
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
    }) : (this.emitEvent("button-added", {
      useCaseId: t.useCaseId,
      label: t.label.trim() || void 0,
      bar: t.bar
    }), t.mappingId && this.emitEvent("button-changed", {
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
      for (const a of n ?? [])
        a.id === e && (t = o), i(a.children, a);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var o;
    let i = !1;
    const s = (a) => {
      a.id === e && (i = !0);
      for (const l of a.children ?? []) s(l);
    }, n = (a) => {
      for (const l of a ?? [])
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
    return oe.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((c) => c.kind === "tab"), l = a.find((c) => c.id === this._activeTabs[e.id]) ?? a[0];
      l && (e = l);
    }
    if (t === "into" && !oe.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var o, a;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const l = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
      if (!l) return;
      let c;
      try {
        c = JSON.parse(l);
      } catch {
        return;
      }
      if (!c.componentId || !c.pageId || c.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: c.pageId, componentId: c.componentId, ...p });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const n = this.slotFor(e, t);
    n.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...n });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var c, p, g;
    const t = e.children ?? [], i = (h) => h.map((y) => this.renderComponent(y)), s = E`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = E`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const h = t.slice(0, Math.ceil(t.length / 2)), y = t.slice(Math.ceil(t.length / 2));
        n = E`<div class="row-lay">
          <div class="col-lay">${h.length ? i(h) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : s}</div>
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
        const h = t.filter((m) => m.kind === "tab"), y = h.find((m) => m.id === this._activeTabs[e.id]) ?? h[0];
        n = E`
          <div class="tabbar">
            ${h.map(
          (m, r) => E`<span
                class=${m === y ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: m.id }, this.emitEvent("component-selected", { componentId: m.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...m };
          }}
                @dragstart=${(u) => {
            var f, _;
            u.stopPropagation(), this._dragCmpId = m.id, (_ = u.dataTransfer) == null || _.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: m.id })
            );
          }}
                @dragover=${(u) => {
            var f;
            ((f = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : f.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var T, b;
            const f = this._dragCmpId;
            if (!f || f === m.id || ((T = this.nodeById(f)) == null ? void 0 : T.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const _ = u.currentTarget.getBoundingClientRect(), R = u.clientX - _.left < _.width / 2 ? m.id : ((b = h[r + 1]) == null ? void 0 : b.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, R !== f && this.emitEvent("component-moved", {
              componentId: f,
              toParentId: e.id,
              beforeComponentId: R
            });
          }}
                >${m.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${y ? this.renderComponent(y) : s}`;
        break;
      }
      case "tab":
        n = E`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = E`<div class="col-lay">
          ${t.length ? t.map(
          (h, y) => E`
                  <div class="acc-bar"><span>${h.title ?? h.label ?? "Sección"}</span><span>${y === 0 ? "▾" : "▸"}</span></div>
                  ${y === 0 ? this.renderComponent(h) : ie}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : ie}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = E`<div class="grid3-lay">
          ${t.length ? t.map((h) => E`<div class="board-col">${this.renderComponent(h)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [h, ...y] = t;
        n = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${h ? this.renderComponent(h) : E`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : E`<div class="placeholder">detalle</div>`}</div>
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
        const y = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = y.length ? E`<div class="grid-lay">
              ${y.slice(0, 6).map(
          (m) => E`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${m.label ?? m.name}</label>${this.control(m)}</div>`
        )}
            </div>` : E`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const h = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        n = E`<table>
            <tr>${h.length ? h.map((y) => E`<th>${y.label ?? y.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(h.length ? h : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? ie : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const h = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(h)}`;
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
    const o = oe.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), l = (h) => {
      var y, m;
      h.stopPropagation(), this._dragCmpId = e.id, (m = h.dataTransfer) == null || m.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (y = this.page) == null ? void 0 : y.id, componentId: e.id })
      ), h.dataTransfer && (h.dataTransfer.effectAllowed = "move");
    };
    return E`<div
      class="cmp ${o ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(h) => {
      h.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(h) => {
      h.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${l}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(h) => {
      var m;
      h.preventDefault(), h.stopPropagation();
      const y = ((m = h.dataTransfer) == null ? void 0 : m.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...y].includes("application/x-modux-cmp") || [...y].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, h) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(h) => {
      var y, m, r;
      this._foreignOver = !1, !(!this._dragCmpId && !((r = (m = (y = h.dataTransfer) == null ? void 0 : y.types) == null ? void 0 : m.includes) != null && r.call(m, "application/x-modux-cmp"))) && (h.preventDefault(), h.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, h));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${l}
        >${oe.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
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
            </table>` : ie}
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
    var n, o, a, l;
    const e = this._cmp;
    if (!e) return ie;
    const t = (c) => this._cmp = { ...this._cmp, ...c }, i = e.kind, s = [
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
    return E`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${s ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : ie}
      ${i === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : ie}
      ${i === "button" || i === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : ie}
      ${i === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((n = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : n.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : E`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? E`<span class="chip"
                      >${((o = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : o.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : ie}
      ${i === "form" ? E`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? E`<span class="chip"
                      >${((a = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : ie}
      ${i === "listing" ? E`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? E`<span class="chip"
                      >${((l = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : l.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : E`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : ie}
      ${i === "field" ? E`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${jn.map((c) => E`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : ie}
      ${i === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : ie}
      <div class="actions">
        <button
          @click=${() => {
      const c = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: c });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const c = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: c.id,
        title: c.title ?? null,
        text: c.text ?? null,
        label: c.label ?? null,
        useCaseId: c.useCaseId ?? null,
        mappingId: c.mappingId ?? null,
        modelId: c.modelId ?? null,
        queryServiceId: c.queryServiceId ?? null,
        queryOperationId: c.queryOperationId ?? null,
        fieldId: c.fieldId ?? null,
        stereotype: c.stereotype ?? null,
        colspan: c.colspan ?? null
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
    if (!e) return ie;
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
        ([a, l]) => E`<option value=${a} ?selected=${n === a}>${l}</option>`
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
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((n) => (n.bar ?? "toolbar") === "toolbar").map(
      (n) => E`<span
            class="btn"
            data-btn-uc=${n.useCaseId ?? ""}
            title=${n.mappingId ? `${n.useCaseId} · mapping ${n.mappingId}` : `${n.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
            @click=${() => this._btn = {
        useCaseId: n.useCaseId ?? "",
        label: n.label ?? "",
        mappingId: n.mappingId ?? "",
        bar: n.bar ?? "toolbar"
      }}
            >${n.label}</span
          >`
    )}
        ${(e.buttons ?? []).some((n) => (n.bar ?? "toolbar") === "toolbar") ? ie : E`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? E`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : E`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? E`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((n, o) => {
      const a = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), l = a[o];
      return E`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${n.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(c) => {
        c.stopPropagation(), this._dragWizKey = l;
      }}
                      @dragover=${(c) => {
        this._dragWizKey && (c.preventDefault(), c.stopPropagation());
      }}
                      @drop=${(c) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === l) return;
        c.preventDefault(), c.stopPropagation();
        const g = c.currentTarget.getBoundingClientRect(), y = c.clientX - g.left < g.width / 2 ? l : a[o + 1] ?? null;
        y !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: y });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${n.label ?? "Paso"}${n.pageId ? "" : " ⌁"}</span
                    >`;
    }) : E`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : ie}
        ${(e.content ?? []).length ? E`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((n) => n.bar === "bottom").map(
      (n) => E`<span
              class="btn"
              data-btn-uc=${n.useCaseId ?? ""}
              title=${n.mappingId ? `${n.useCaseId} · mapping ${n.mappingId}` : `${n.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
              @click=${() => this._btn = {
        useCaseId: n.useCaseId ?? "",
        label: n.label ?? "",
        mappingId: n.mappingId ?? "",
        bar: "bottom"
      }}
              >${n.label}</span
            >`
    )}
        ${(e.buttons ?? []).some((n) => n.bar === "bottom") ? ie : E`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o, a, l;
      const n = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
      return E`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((a = this.useCases.find((c) => c.id === this._btn.useCaseId)) == null ? void 0 : a.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(c) => this._btn = { ...this._btn, label: c.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? E`<span class="chip"
                        >${((l = this.mappings.find((c) => c.id === this._btn.mappingId)) == null ? void 0 : l.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${n ? E`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
      }}
                    >
                      Quitar
                    </button>` : ie}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : ie}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${jn.map(
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
          </div>` : ie}
    `;
  }
};
oe.styles = wt`
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
    .vm .chip,
    .pop .chip {
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
    .zone.zhdr {
      padding: 5px 12px 3px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      border-bottom: 1px dashed #e2e8f0;
    }
    .bottombar {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      padding: 7px 12px;
      border-top: 1.5px solid #e2e8f0;
      background: #f8fafc;
    }
    .bottombar .btn {
      background: #0284c7;
      color: #ffffff;
      border-radius: 7px;
      padding: 3px 12px;
      font-size: 11.5px;
      cursor: pointer;
    }
    .bottombar .add {
      border: 1px dashed #94a3b8;
      background: none;
      border-radius: 7px;
      padding: 2px 8px;
      font-size: 11px;
      color: #64748b;
      cursor: pointer;
    }
    .zoneph {
      font-size: 10.5px;
      color: #cbd5e1;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .vm .chipx,
    .pop .chipx {
      margin-left: 5px;
      cursor: pointer;
      color: #94a3b8;
    }
    .vm .chipx:hover,
    .pop .chipx:hover {
      color: #dc2626;
    }
    .vm .vmhint,
    .pop .vmhint {
      color: #94a3b8;
      font-size: 10.5px;
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
    .wizbar span[draggable='true'] {
      cursor: grab;
      user-select: none;
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
he([
  ae({ attribute: !1 })
], oe.prototype, "page", 2);
he([
  ae({ type: Boolean, reflect: !0 })
], oe.prototype, "framed", 2);
he([
  ae({ attribute: !1 })
], oe.prototype, "models", 2);
he([
  ae({ attribute: !1 })
], oe.prototype, "mappings", 2);
he([
  ae({ attribute: !1 })
], oe.prototype, "useCases", 2);
he([
  ae({ attribute: !1 })
], oe.prototype, "queryOps", 2);
he([
  ae({ attribute: !1 })
], oe.prototype, "selectedCmpId", 2);
he([
  F()
], oe.prototype, "_editing", 2);
he([
  F()
], oe.prototype, "_dragId", 2);
he([
  F()
], oe.prototype, "_overId", 2);
he([
  F()
], oe.prototype, "_rename", 2);
he([
  F()
], oe.prototype, "_route", 2);
he([
  F()
], oe.prototype, "_btn", 2);
he([
  F()
], oe.prototype, "_cmp", 2);
he([
  F()
], oe.prototype, "_dragCmpId", 2);
he([
  F()
], oe.prototype, "_dragWizKey", 2);
he([
  F()
], oe.prototype, "_overCmpId", 2);
he([
  F()
], oe.prototype, "_overCmpPos", 2);
he([
  F()
], oe.prototype, "_foreignOver", 2);
he([
  F()
], oe.prototype, "_activeTabs", 2);
oe = he([
  xt("modux-page-designer")
], oe);
var Kl = Object.defineProperty, Xl = Object.getOwnPropertyDescriptor, ke = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Xl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Kl(t, i, n), n;
};
const Ts = 460, Ql = 540, Zl = 660;
let ve = class extends Le {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((n) => {
        var o;
        return (o = n.classList) == null ? void 0 : o.contains("frame-grip");
      });
      if (i) {
        const o = i.closest(".frame").dataset.pageId, a = this.sizeOf(o);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: o, x: e.clientX, y: e.clientY, w0: a.w, h0: a.h }, e.preventDefault();
        return;
      }
      const s = t.find((n) => {
        var o;
        return (o = n.classList) == null ? void 0 : o.contains("frame-title");
      });
      if (s) {
        const o = s.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: o }), e.preventDefault();
          return;
        }
        const a = this.pages.findIndex((c) => c.id === o), l = this.posOf(o, a);
        this.emit("element-selected", { elementType: "node", id: o, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: o, x: e.clientX, y: e.clientY, ox: l.x, oy: l.y, moved: !1 }, e.preventDefault();
        return;
      }
      if (!t.some((n) => n.tagName === "MODUX-PAGE-DESIGNER")) {
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
      if (t.mode === "resize") {
        this._liveSize = {
          id: t.id,
          w: Math.max(280, Math.round(t.w0 + i)),
          h: Math.max(220, Math.round(t.h0 + s))
        };
        return;
      }
      Math.abs(i) + Math.abs(s) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + i, y: t.oy + s };
    }, this.onUp = () => {
      const e = this._drag;
      if (this._drag = null, (e == null ? void 0 : e.mode) === "resize" && this._liveSize) {
        const t = this._liveSize;
        this._liveSize = null, (t.w !== e.w0 || t.h !== e.h0) && this.emit("frame-resized", { id: e.id, w: t.w, h: t.h });
        return;
      }
      (e == null ? void 0 : e.mode) === "frame" && e.moved && this._live && this.emit("node-moved", {
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
    var g, h, y, m, r, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (y = o == null ? void 0 : o.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), l = (m = a == null ? void 0 : a.closest) == null ? void 0 : m.call(a, "[data-btn-uc]");
    if (l != null && l.dataset.btnUc) return `btn:${n}:${l.dataset.btnUc}`;
    const c = (r = a == null ? void 0 : a.closest) == null ? void 0 : r.call(a, "[data-bar]");
    if (c != null && c.dataset.bar) return `bar:${n}:${c.dataset.bar}`;
    const p = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    return p ? `cmp:${n}:${p.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var y, m, r, u;
    const i = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), s = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (r = o == null ? void 0 : o.shadowRoot) == null ? void 0 : r.elementFromPoint(e, t), l = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    if (!l) return { pageId: n, componentId: null, pos: "into" };
    const c = l.dataset.cmpKind ?? "", p = l.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), h = oe.LEAF_KINDS.has(c) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: n, componentId: l.dataset.cmpId, pos: h };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Ts, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Ql, y: Math.floor(t / 3) * Zl };
  }
  render() {
    return E`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var n;
      const i = this.posOf(e.id, t), s = this.sizeOf(e.id);
      return E`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${s.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""} · ${e.type ?? "PAGE"}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${s.h}px; width: ${s.w}px"
                .page=${e}
                .selectedCmpId=${((n = this.selectedCmp) == null ? void 0 : n.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(o) => {
        o.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...o.detail });
      }}
                @component-removed=${(o) => {
        o.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...o.detail });
      }}
                @component-moved=${(o) => {
        o.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...o.detail });
      }}
                @component-selected=${(o) => {
        o.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...o.detail });
      }}
                @component-transferred=${(o) => {
        o.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...o.detail });
      }}
                @wizard-step-moved=${(o) => {
        o.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...o.detail });
      }}
                @page-renamed=${(o) => {
        o.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...o.detail });
      }}
                @page-type-changed=${(o) => {
        o.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...o.detail });
      }}
                @page-route-changed=${(o) => {
        o.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...o.detail });
      }}
                @page-model-changed=${(o) => {
        o.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...o.detail });
      }}
                @button-added=${(o) => this.emit("page-button-added", { pageId: e.id, ...o.detail })}
                @button-changed=${(o) => this.emit("page-button-changed", { pageId: e.id, ...o.detail })}
                @button-removed=${(o) => this.emit("page-button-removed", { pageId: e.id, ...o.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(o) => this.emit("page-field-config-changed", { pageId: e.id, ...o.detail })}
                @fields-reordered=${(o) => this.emit("page-fields-reordered", { pageId: e.id, ...o.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : E`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
ve.styles = wt`
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
      width: ${Ts}px;
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
    .frame-grip {
      position: absolute;
      z-index: 50; /* the framed designer keeps z-index 40 from its floating mode */
      right: -7px;
      bottom: -7px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: #38bdf8;
      border: 2px solid #ffffff;
      cursor: nwse-resize;
      opacity: 0;
      transition: opacity 0.12s;
    }
    .frame:hover .frame-grip,
    .frame.selected .frame-grip {
      opacity: 1;
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
  ae({ attribute: !1 })
], ve.prototype, "pages", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "layout", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "sizes", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "selectedId", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "selectedIds", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "models", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "mappings", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "useCases", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "queryOps", 2);
ke([
  ae({ attribute: !1 })
], ve.prototype, "selectedCmp", 2);
ke([
  F()
], ve.prototype, "_t", 2);
ke([
  F()
], ve.prototype, "_live", 2);
ke([
  F()
], ve.prototype, "_liveSize", 2);
ve = ke([
  xt("modux-figma")
], ve);
var Jl = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, ee = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ec(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Jl(t, i, n), n;
};
const Yi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, tc = Object.keys(Yi);
function Mt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let l = 0, c = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [h, y] of [
    [-p, e.x - s],
    [p, n - e.x],
    [-g, e.y - o],
    [g, a - e.y]
  ]) {
    if (h === 0) {
      if (y < 0) return !1;
      continue;
    }
    const m = y / h;
    if (h < 0) {
      if (m > c) return !1;
      m > l && (l = m);
    } else {
      if (m < l) return !1;
      m < c && (c = m);
    }
  }
  return c - l > 0.02;
}
function ic(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), n = (g) => {
    var y;
    const h = /* @__PURE__ */ new Set();
    for (let m = g; m; m = (y = s.get(m)) == null ? void 0 : y.parentId) h.add(m);
    return h;
  }, o = e.nodes, a = (g) => g.parentId ? Math.min(i, 6) : i, l = /* @__PURE__ */ new Map(), c = (g, h, y) => {
    const m = a(y), r = { x: y.x, y: y.y, w: y.w + 2 * m, h: y.h + 2 * m }, u = y.w / 2 + m * 1.5, f = y.h / 2 + m * 1.5, _ = { x: y.x - u, y: y.y - f }, A = { x: y.x + u, y: y.y - f }, R = { x: y.x - u, y: y.y + f }, T = { x: y.x + u, y: y.y + f }, b = [];
    for (const w of [_, A, R, T])
      !Mt(g, w, r) && !Mt(w, h, r) && b.push([w]);
    for (const [w, P] of [
      [_, A],
      [A, _],
      [A, T],
      [T, A],
      [T, R],
      [R, T],
      [R, _],
      [_, R]
    ])
      !Mt(g, w, r) && !Mt(P, h, r) && b.push([w, P]);
    return b;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const h = s.get(g.sourceId), y = s.get(g.targetId);
    if (!h || !y) continue;
    const m = /* @__PURE__ */ new Set([...n(h.id), ...n(y.id)]), r = [
      { x: h.x, y: h.y },
      { x: y.x, y: y.y }
    ];
    for (let u = 0; u < 12; u++) {
      let f = !1;
      e: for (let _ = 0; _ < r.length - 1; _++)
        for (const A of o) {
          if (m.has(A.id)) continue;
          const R = a(A), T = { x: A.x, y: A.y, w: A.w + 2 * R, h: A.h + 2 * R };
          if (!Mt(r[_], r[_ + 1], T)) continue;
          const b = c(r[_], r[_ + 1], A);
          if (!b.length) continue;
          const w = (U) => o.some(
            (D) => D !== A && !m.has(D.id) && Math.abs(U.x - D.x) < D.w / 2 + a(D) / 2 && Math.abs(U.y - D.y) < D.h / 2 + a(D) / 2
          ), P = (U) => {
            let D = 0;
            const z = [r[_], ...U, r[_ + 1]];
            for (let L = 0; L < z.length - 1; L++)
              D += Math.hypot(z[L + 1].x - z[L].x, z[L + 1].y - z[L].y);
            return D + (U.some(w) ? 1e4 : 0);
          };
          b.sort((U, D) => P(U) - P(D)), r.splice(_ + 1, 0, ...b[0]), f = !0;
          break e;
        }
      if (!f) break;
    }
    r.length > 2 && l.set(
      g.id,
      r.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return l;
}
const ne = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function nc(e, t) {
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
function sc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let Y = class extends Le {
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
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, o = ge(t);
      if (!(o != null && o.itemId)) return;
      const a = this.menuEntryIn(o.appId, o.itemId);
      if (!a) return;
      const l = (c, p) => (c ?? []).some((g) => g.id === p || l(g.children, p));
      if (n) {
        const c = ge(n);
        if (!(c != null && c.itemId) || c.itemId === o.itemId || o.appId === c.appId && l(a.entry.children, c.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: c.appId,
          itemId: o.itemId,
          parentId: c.itemId
        });
        return;
      }
      if (s) {
        const c = ge(s);
        if (!(c != null && c.itemId) || c.itemId === o.itemId) return;
        const p = this.menuEntryIn(c.appId, c.itemId);
        if (!p || o.appId === c.appId && l(a.entry.children, c.itemId) || o.appId === c.appId && p.parentId === a.parentId && a.beforeId === c.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: c.appId,
          itemId: o.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: c.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: o.appId, toAppId: i, itemId: o.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var o;
      const { id: t, beforeId: i } = e.detail, s = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!s) return;
      const n = i ? ((o = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : o[1]) ?? null : null;
      this.moveWizardStep(s[1], s[2], n);
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
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: n, beforeComponentId: o } = e.detail, a = this.componentIn(t, s);
      if (!a || t === i) return;
      const l = JSON.parse(JSON.stringify(a.node)), { ops: c } = this.rebuildComponentOps(i, l, n ?? void 0, o);
      for (const p of c) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, l, a.parentId ?? void 0, a.beforeId).ops
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
    return Zt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Zt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = Zt(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = Zt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), l = Ki(a), c = [...l.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: o.nodes[g] ?? null
    })), p = { ...o.nodes };
    for (const [g, h] of l) {
      const y = a.find((r) => r.id === g), m = o.nodes[g] ?? { x: y.x, y: y.y };
      p[g] = {
        x: Math.round(m.x + (h.x - y.x)),
        y: Math.round(m.y + (h.y - y.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: p }), c.length && this.pushUndoEntry(c);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = ic(e, t);
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
    var t, i, s, n, o, a, l, c, p, g, h, y, m;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const r = this.model.relations.find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : null;
      }
      case "set-relation-type": {
        const r = this.model.relations.find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return r && r.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "set-app-header-page": {
        const r = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (r == null ? void 0 : r.headerPageId) ?? null }];
      }
      case "set-app-model": {
        const r = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-model", appId: e.appId, modelId: (r == null ? void 0 : r.modelId) ?? null }];
      }
      case "add-model":
        return [{ kind: "remove-model", id: e.id }];
      case "add-model-mapping":
        return [{ kind: "remove-model-mapping", id: e.id }];
      case "remove-model-mapping": {
        const r = (this.model.modelMappings ?? []).find((u) => u.id === e.id);
        return !(r != null && r.sourceModelId) || !r.targetModelId ? null : [{
          kind: "add-model-mapping",
          id: r.id,
          name: r.name,
          sourceId: r.sourceModelId,
          targetId: r.targetModelId
        }];
      }
      case "remove-model": {
        const r = (this.model.models ?? []).find((f) => f.id === e.id);
        if (!r) return null;
        const u = [{ kind: "add-model", id: r.id, name: r.name }];
        for (const f of this.model.pages ?? []) {
          f.modelId === e.id && u.push({ kind: "set-page-model", pageId: f.id, modelId: e.id });
          const _ = (A) => {
            for (const R of A ?? [])
              R.modelId === e.id && u.push({ kind: "set-page-component", pageId: f.id, componentId: R.id, modelId: e.id }), _(R.children);
          };
          _(f.content);
        }
        for (const f of this.model.uiApps ?? [])
          f.modelId === e.id && u.push({ kind: "set-app-model", appId: f.id, modelId: e.id });
        return u;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const r = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = e.kind === "set-crud-detail";
        return [{
          kind: e.kind,
          pageId: e.pageId,
          targetId: (u ? r == null ? void 0 : r.crudDetailPageId : r == null ? void 0 : r.crudCreatePageId) ?? null,
          toAppId: (u ? r == null ? void 0 : r.crudDetailAppId : r == null ? void 0 : r.crudCreateAppId) ?? null
        }];
      }
      case "set-app-view-page": {
        const r = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-view-page", appId: e.appId, pageId: (r == null ? void 0 : r.viewPageId) ?? null }];
      }
      case "set-app-edit-page": {
        const r = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-edit-page", appId: e.appId, pageId: (r == null ? void 0 : r.editPageId) ?? null }];
      }
      case "set-app-home-page": {
        const r = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{
          kind: "set-app-home-page",
          appId: e.appId,
          pageId: (r == null ? void 0 : r.homePageId) ?? null,
          toAppId: (r == null ? void 0 : r.homeAppId) ?? null
        }];
      }
      case "add-page-wizard-step":
        return [{ kind: "remove-page-wizard-step", pageId: e.pageId, targetId: e.itemId ?? e.targetId }];
      case "set-wizard-step-page": {
        const r = (((t = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : t.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === e.itemId);
        return r ? [{ kind: "set-wizard-step-page", pageId: e.pageId, itemId: e.itemId, targetId: r.pageId ?? null }] : null;
      }
      case "move-page-wizard-step": {
        const r = (((i = (this.model.pages ?? []).find((f) => f.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((f) => f.id ?? f.pageId), u = r.indexOf(e.targetId);
        return u < 0 ? null : [{
          kind: "move-page-wizard-step",
          pageId: e.pageId,
          targetId: e.targetId,
          beforeItemId: r[u + 1] ?? null
        }];
      }
      case "remove-page-wizard-step": {
        const r = (((s = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : s.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === e.targetId);
        return r ? [{
          kind: "add-page-wizard-step",
          pageId: e.pageId,
          targetId: r.pageId ?? null,
          label: r.label,
          itemId: r.id
        }] : null;
      }
      case "delete-ui-app": {
        const r = (this.model.uiApps ?? []).find((_) => _.id === e.id);
        if (!r) return null;
        const u = [{ kind: "create-ui-app", id: r.id, name: r.name, type: r.type }];
        r.headerPageId && u.push({ kind: "set-app-header-page", appId: r.id, pageId: r.headerPageId }), r.modelId && u.push({ kind: "set-app-model", appId: r.id, modelId: r.modelId }), r.viewPageId && u.push({ kind: "set-app-view-page", appId: r.id, pageId: r.viewPageId }), r.editPageId && u.push({ kind: "set-app-edit-page", appId: r.id, pageId: r.editPageId }), (r.homePageId || r.homeAppId) && u.push({
          kind: "set-app-home-page",
          appId: r.id,
          pageId: r.homePageId ?? null,
          toAppId: r.homeAppId ?? null
        });
        const f = (_, A) => {
          for (const R of _ ?? [])
            u.push({
              kind: "add-menu-item",
              appId: r.id,
              label: R.label,
              itemId: R.id,
              parentId: A == null ? void 0 : A.id,
              parentLabel: A && !A.id ? A.label : void 0,
              pageId: R.pageId ?? null
            }), R.uiAdapterId && u.push({ kind: "set-menu-app", appId: r.id, toAppId: R.uiAdapterId, itemId: R.id, label: R.label }), R.useCaseId && u.push({ kind: "set-menu-use-case", appId: r.id, useCaseId: R.useCaseId, itemId: R.id, label: R.label }), R.aggregateId && u.push({ kind: "set-menu-aggregate", appId: r.id, aggregateId: R.aggregateId, itemId: R.id, label: R.label }), R.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: r.id,
              queryServiceId: R.queryServiceId ?? null,
              queryOperationId: R.queryOperationId,
              itemId: R.id,
              label: R.label
            }), f(R.children, R);
        };
        f(r.menuItems);
        for (const _ of this.model.actorAppUses ?? [])
          _.appId === e.id && u.push({ kind: "add-actor-app", actorId: _.actorId, appId: e.id });
        return u;
      }
      case "delete-ui-page": {
        const r = (this.model.pages ?? []).find((f) => f.id === e.id);
        if (!r) return null;
        const u = [
          { kind: "create-ui-page", id: r.id, name: r.name, pageType: r.type ?? "FORM" }
        ];
        r.route && u.push({ kind: "set-page-route", pageId: r.id, path: r.route }), r.modelId && u.push({ kind: "set-page-model", pageId: r.id, modelId: r.modelId }), r.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: r.id, queryServiceId: r.listingQueryServiceId });
        for (const f of r.buttons ?? [])
          f.useCaseId && (u.push({ kind: "add-page-button", pageId: r.id, useCaseId: f.useCaseId, label: f.label }), f.mappingId && u.push({
            kind: "set-page-button",
            pageId: r.id,
            useCaseId: f.useCaseId,
            label: f.label ?? null,
            mappingId: f.mappingId
          }));
        for (const f of r.viewmodelFields ?? [])
          (f.stereotype || f.colspan || f.label) && u.push({
            kind: "set-page-field-config",
            pageId: r.id,
            fieldId: f.fieldId,
            stereotype: f.stereotype ?? null,
            colspan: f.colspan ?? null,
            label: f.label ?? null
          });
        (r.viewmodelFields ?? []).length && u.push({
          kind: "set-page-field-order",
          pageId: r.id,
          fieldIds: (r.viewmodelFields ?? []).map((f) => f.fieldId)
        });
        for (const f of r.content ?? [])
          u.push(...this.rebuildComponentOps(r.id, f, void 0, null).ops);
        for (const f of r.wizardSteps ?? [])
          u.push({
            kind: "add-page-wizard-step",
            pageId: r.id,
            targetId: f.pageId ?? null,
            label: f.label,
            itemId: f.id
          });
        return (r.crudDetailPageId || r.crudDetailAppId) && u.push({ kind: "set-crud-detail", pageId: r.id, targetId: r.crudDetailPageId ?? null, toAppId: r.crudDetailAppId ?? null }), (r.crudCreatePageId || r.crudCreateAppId) && u.push({ kind: "set-crud-create", pageId: r.id, targetId: r.crudCreatePageId ?? null, toAppId: r.crudCreateAppId ?? null }), u;
      }
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const r = (this.model.uiApps ?? []).find((_) => _.id === e.appId), u = (_) => {
          for (const A of _ ?? []) {
            if (e.itemId ? A.id === e.itemId : A.label === e.label) return A;
            const R = u(A.children);
            if (R) return R;
          }
          return null;
        }, f = e.itemId || e.label ? u(r == null ? void 0 : r.menuItems) : null;
        return f ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: f.label,
          pageId: f.pageId ?? null,
          itemId: f.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: f.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: f.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: f.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: f.queryServiceId ?? null,
          queryOperationId: f.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: f.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const r = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = ((r == null ? void 0 : r.buttons) ?? []).find((f) => f.useCaseId === e.useCaseId);
        return u ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: u.label }] : null;
      }
      case "rename-ui-page": {
        const r = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return r ? [{ kind: "rename-ui-page", pageId: e.pageId, name: r.name }] : null;
      }
      case "set-page-type": {
        const r = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return r ? [{ kind: "set-page-type", pageId: e.pageId, pageType: r.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const r = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return r != null && r.route ? [{ kind: "set-page-route", pageId: e.pageId, path: r.route }] : null;
      }
      case "set-page-button": {
        const r = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = ((r == null ? void 0 : r.buttons) ?? []).find((f) => f.useCaseId === e.useCaseId);
        return u ? [{
          kind: "set-page-button",
          pageId: e.pageId,
          useCaseId: e.useCaseId,
          label: u.label ?? null,
          mappingId: u.mappingId ?? null
        }] : null;
      }
      case "add-page-component":
        return [{ kind: "remove-page-component", pageId: e.pageId, componentId: e.componentId }];
      case "set-page-component":
      case "remove-page-component":
      case "move-page-component": {
        const r = (this.model.pages ?? []).find((T) => T.id === e.pageId);
        let u = null, f = null, _ = null;
        const A = (T, b) => {
          var P;
          const w = T ?? [];
          for (let U = 0; U < w.length; U++)
            w[U].id === e.componentId && (u = w[U], f = b, _ = ((P = w[U + 1]) == null ? void 0 : P.id) ?? null), A(w[U].children, w[U]);
        };
        if (A(r == null ? void 0 : r.content, null), !u) return null;
        const R = u;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: R.title ?? null,
          text: R.text ?? null,
          label: R.label ?? null,
          useCaseId: R.useCaseId ?? null,
          mappingId: R.mappingId ?? null,
          modelId: R.modelId ?? null,
          queryServiceId: R.queryServiceId ?? null,
          queryOperationId: R.queryOperationId ?? null,
          fieldId: R.fieldId ?? null,
          stereotype: R.stereotype ?? null,
          colspan: R.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: f === null ? null : f.id,
          beforeComponentId: _
        }] : this.rebuildComponentOps(
          e.pageId,
          R,
          f === null ? void 0 : f.id,
          _
        ).ops;
      }
      case "set-page-listing": {
        const r = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (r == null ? void 0 : r.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const r = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (r == null ? void 0 : r.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const r = (((n = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : n.viewmodelFields) ?? []).find((u) => u.fieldId === e.fieldId);
        return [{
          kind: "set-page-field-config",
          pageId: e.pageId,
          fieldId: e.fieldId,
          stereotype: (r == null ? void 0 : r.stereotype) ?? null,
          colspan: (r == null ? void 0 : r.colspan) ?? null,
          label: (r == null ? void 0 : r.label) ?? null
        }];
      }
      case "set-page-field-order": {
        const r = (((o = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).map((u) => u.fieldId);
        return r.length ? [{ kind: "set-page-field-order", pageId: e.pageId, fieldIds: r }] : null;
      }
      case "move-menu-item": {
        const r = e.itemId ? this.menuEntryIn(e.appId, e.itemId) : null;
        return [{
          kind: "move-menu-item",
          appId: e.toAppId,
          toAppId: e.appId,
          itemId: e.itemId,
          label: e.label,
          parentId: (r == null ? void 0 : r.parentId) ?? void 0,
          beforeItemId: (r == null ? void 0 : r.beforeId) ?? void 0
        }];
      }
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const r = this.model.modules.find((f) => f.id === e.id);
        if (!r) return null;
        const u = this.model.relations.filter(
          (f) => (f.sourceId === e.id || f.targetId === e.id) && f.type != null
        );
        return [
          { kind: "add-module", id: r.id, name: r.name, subdomainType: r.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...u.map(
            (f) => ({
              kind: "set-relation-type",
              sourceId: f.sourceId,
              targetId: f.targetId,
              type: f.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const r = (this.model.aggregates ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "add-aggregate", id: r.id, name: r.name, moduleId: r.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const r of this.model.modules) {
          const u = (r.queryServices ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-query-service", id: u.id, name: u.name, moduleId: r.id }];
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
        const r = (this.model.externalSystemDependencies ?? []).find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return r ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const r = (this.model.externalSystemDependencies ?? []).find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: r == null ? void 0 : r.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const r = (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return r ? [{
          kind: "add-proxy-api",
          id: r.id,
          name: r.name,
          targetId: r.targetApiId,
          moduleId: r.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const r = (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "set-proxy-target", id: e.id, targetId: r.targetApiId ?? "" }] : null;
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
        const r = (this.model.apiOperationImplementations ?? []).find(
          (u) => u.apiId === e.apiId && u.operationId === e.operationId && u.moduleId === e.moduleId
        );
        return r ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: r.useCaseId
        }] : [{
          kind: "remove-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId
        }];
      }
      case "remove-api-operation-implementation": {
        const r = (this.model.apiOperationImplementations ?? []).find(
          (u) => u.apiId === e.apiId && u.operationId === e.operationId && u.moduleId === e.moduleId
        );
        return r ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: r.useCaseId
        }] : null;
      }
      case "set-api-publisher": {
        const r = (this.model.apis ?? []).find((u) => u.id === e.id) ?? (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "set-api-publisher", id: e.id, targetId: r.publishedByExternalSystemId ?? "" }] : null;
      }
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const r of this.model.modules) {
          const u = (r.useCases ?? []).find((f) => f.id === e.id);
          if (u)
            return [
              { kind: "add-use-case", id: u.id, name: u.name, moduleId: r.id, policy: u.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const r of this.model.externalSystems) {
          const u = (r.useCases ?? []).find((f) => f.id === e.id);
          if (u)
            return [{ kind: "add-external-use-case", id: u.id, name: u.name, moduleId: r.id }];
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
      case "add-notification":
        return [{ kind: "remove-notification", id: e.id }];
      case "remove-notification": {
        const r = (this.model.notifications ?? []).find((f) => f.id === e.id);
        if (!(r != null && r.ownerModuleId)) return null;
        const u = [
          { kind: "add-notification", id: r.id, name: r.name, moduleId: r.ownerModuleId, type: (r.channels ?? [])[0] }
        ];
        r.eventId && u.push({ kind: "set-notification-event", id: r.id, targetId: r.eventId });
        for (const f of r.recipientRoleIds ?? []) u.push({ kind: "add-notification-recipient", id: r.id, roleId: f });
        return u;
      }
      case "set-notification-event": {
        const r = (this.model.notifications ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-notification-event", id: e.id, targetId: (r == null ? void 0 : r.eventId) ?? null }];
      }
      case "add-notification-recipient":
        return [{ kind: "remove-notification-recipient", id: e.id, roleId: e.roleId }];
      case "remove-notification-recipient":
        return [{ kind: "add-notification-recipient", id: e.id, roleId: e.roleId }];
      case "add-document":
        return [{ kind: "remove-document", id: e.id }];
      case "remove-document": {
        const r = (this.model.documents ?? []).find((f) => f.id === e.id);
        if (!(r != null && r.ownerModuleId)) return null;
        const u = [
          { kind: "add-document", id: r.id, name: r.name, moduleId: r.ownerModuleId, type: r.kind }
        ];
        return r.modelId && u.push({ kind: "set-document-model", id: r.id, modelId: r.modelId }), r.queryServiceId && u.push({ kind: "set-document-query", id: r.id, queryServiceId: r.queryServiceId, queryOperationId: r.queryOperationId ?? null }), u;
      }
      case "set-document-model": {
        const r = (this.model.documents ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-document-model", id: e.id, modelId: (r == null ? void 0 : r.modelId) ?? null }];
      }
      case "set-document-query": {
        const r = (this.model.documents ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-document-query", id: e.id, queryServiceId: (r == null ? void 0 : r.queryServiceId) ?? null, queryOperationId: (r == null ? void 0 : r.queryOperationId) ?? null }];
      }
      case "add-identity-provider":
        return [{ kind: "remove-identity-provider", id: e.id }];
      case "remove-identity-provider": {
        const r = (this.model.identityProviders ?? []).find((f) => f.id === e.id);
        if (!r) return null;
        const u = [
          { kind: "add-identity-provider", id: r.id, name: r.name, type: r.type }
        ];
        r.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: r.id, targetId: r.publishedByExternalSystemId });
        for (const f of this.model.modules)
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        for (const f of this.model.uiApps ?? [])
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        for (const f of this.model.etlFlows ?? [])
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        return u;
      }
      case "set-idp-publisher": {
        const r = (this.model.identityProviders ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-idp-publisher", id: e.id, targetId: (r == null ? void 0 : r.publishedByExternalSystemId) ?? null }];
      }
      case "set-identity-provider": {
        const r = ((a = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : a.identityProviderId) ?? ((l = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : l.identityProviderId) ?? ((c = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : c.identityProviderId) ?? null;
        return [{ kind: "set-identity-provider", id: e.id, targetId: r }];
      }
      case "add-etl-flow":
        return [{ kind: "remove-etl-flow", id: e.id }];
      case "remove-etl-flow": {
        const r = (this.model.etlFlows ?? []).find((u) => u.id === e.id);
        return !r || !r.ownerModuleId ? null : [
          { kind: "add-etl-flow", id: r.id, name: r.name, moduleId: r.ownerModuleId },
          ...(r.steps ?? []).map((u) => ({
            kind: "add-etl-step",
            etlFlowId: r.id,
            id: u.id,
            name: u.name,
            stepType: u.type,
            externalTableId: u.externalTableId,
            apiId: u.apiId,
            operationId: u.operationId,
            targetId: u.eventId,
            mappingId: u.mappingId
          }))
        ];
      }
      case "add-etl-step":
        return [{ kind: "remove-etl-step", etlFlowId: e.etlFlowId, id: e.id }];
      case "remove-etl-step": {
        const r = (((p = (this.model.etlFlows ?? []).find((u) => u.id === e.etlFlowId)) == null ? void 0 : p.steps) ?? []).find((u) => u.id === e.id);
        return r ? [{
          kind: "add-etl-step",
          etlFlowId: e.etlFlowId,
          id: r.id,
          name: r.name,
          stepType: r.type,
          externalTableId: r.externalTableId,
          apiId: r.apiId,
          operationId: r.operationId,
          targetId: r.eventId,
          mappingId: r.mappingId
        }] : null;
      }
      case "add-scheduled-trigger":
        return [{ kind: "remove-scheduled-trigger", id: e.id }];
      case "remove-scheduled-trigger": {
        const r = this.model.modules.find(
          (f) => (f.scheduledTriggers ?? []).some((_) => _.id === e.id)
        ), u = ((r == null ? void 0 : r.scheduledTriggers) ?? []).find((f) => f.id === e.id);
        return !r || !u ? null : [{
          kind: "add-scheduled-trigger",
          id: u.id,
          name: u.name,
          moduleId: r.id,
          cronExpression: u.cronExpression,
          targetUseCaseId: u.useCaseId
        }];
      }
      case "set-scheduled-trigger-target": {
        const r = this.model.modules.flatMap((u) => u.scheduledTriggers ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "set-scheduled-trigger-target", id: e.id, targetUseCaseId: r.useCaseId ?? null }] : null;
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
        const r = this.model.externalSystems.find((u) => u.id === e.id);
        return r ? [{ kind: "add-external-system", id: r.id, name: r.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const r = (this.model.aiAgents ?? []).find((u) => u.id === e.id);
        return r ? [
          { kind: "add-ai-agent", id: r.id, name: r.name, external: r.external },
          ...(this.model.agentUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-use", sourceId: e.id, targetId: u.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: u.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: u.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: u.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: u.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-query", sourceId: e.id, targetId: u.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: u.ragId })),
          ...(this.model.agentDelegations ?? []).filter((u) => u.agentId === e.id || u.delegateAgentId === e.id).map((u) => ({
            kind: "add-agent-delegate",
            sourceId: u.agentId,
            targetId: u.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-actor-agent", sourceId: u.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((u) => u.agentId === e.id).map((u) => ({ kind: "add-agent-trigger", sourceId: u.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const r = (this.model.mcpGateways ?? []).find((u) => u.id === e.id);
        return r ? [
          { kind: "add-mcp-gateway", id: r.id, name: r.name },
          ...[
            ...r.mcpServerIds ?? [],
            ...r.apiIds ?? [],
            ...r.apiOperationIds ?? [],
            ...r.useCaseIds ?? [],
            ...r.ragIds ?? []
          ].map((u) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: u })),
          ...(this.model.agentGatewayUses ?? []).filter((u) => u.gatewayId === e.id).map((u) => ({ kind: "add-agent-gateway", sourceId: u.agentId, targetId: e.id }))
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
        for (const r of this.model.externalSystems) {
          const u = (r.mcpServers ?? []).find((f) => f.id === e.id);
          if (u)
            return [
              { kind: "add-mcp-server", id: u.id, name: u.name, moduleId: r.id, uri: u.uri },
              ...(this.model.agentMcpUses ?? []).filter((f) => f.mcpServerId === e.id).map(
                (f) => ({
                  kind: "add-agent-mcp",
                  sourceId: f.agentId,
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
        const r = (this.model.rags ?? []).find((u) => u.id === e.id);
        return r ? [
          { kind: "add-rag", id: r.id, name: r.name },
          ...(this.model.agentRags ?? []).filter((u) => u.ragId === e.id).map(
            (u) => ({
              kind: "add-agent-rag",
              sourceId: u.agentId,
              targetId: e.id
            })
          ),
          ...(r.sourceReadModelIds ?? []).map(
            (u) => ({ kind: "add-rag-source", sourceId: e.id, targetId: u })
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
        const r = (this.model.actors ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "add-actor", id: r.id, name: r.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const r of this.model.modules) {
          const u = (r.applicationEvents ?? []).find((f) => f.id === e.id);
          if (u)
            return [{ kind: "add-application-event", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const r of this.model.modules) {
          const u = (r.domainServices ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-domain-service", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const r = (this.model.projections ?? []).find((u) => u.id === e.id);
        return r && (r.sourceAggregateId || r.sourceExternalUseCaseId || r.sourceExternalTableId) ? [
          {
            kind: "add-projection",
            id: r.id,
            name: r.name,
            aggregateId: r.sourceAggregateId,
            externalUseCaseId: r.sourceExternalUseCaseId,
            externalTableId: r.sourceExternalTableId,
            targetId: r.readModelId,
            moduleId: r.moduleId
          }
        ] : null;
      }
      case "add-external-table":
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const r of this.model.externalSystems) {
          const u = (r.tables ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-external-table", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const r = (h = (g = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : h.find((u) => u.uri === e.uri);
        return r ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: r.type,
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
        const r = (this.model.apis ?? []).find((u) => u.id === e.id);
        return r ? [
          { kind: "add-api", id: r.id, name: r.name },
          ...r.operations.map(
            (u) => ({
              kind: "add-api-operation",
              apiId: r.id,
              id: u.id,
              name: u.name,
              httpMethod: u.httpMethod,
              path: u.path,
              moduleId: u.targetModuleId,
              targetUseCaseId: u.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const r = (y = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : y.operations.find((u) => u.id === e.id);
        return r ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
            id: r.id,
            name: r.name,
            httpMethod: r.httpMethod,
            path: r.path,
            moduleId: r.targetModuleId,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "set-api-operation-target": {
        const r = (m = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : m.operations.find((u) => u.id === e.id);
        return r ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: r.targetModuleId,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const r of this.model.modules) {
          const u = (r.readModels ?? []).find((f) => f.id === e.id);
          if (u != null && u.aggregateId)
            return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const r of this.model.modules) {
          const u = (r.domainEvents ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "rename-element": {
        const u = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((f) => f.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((f) => f.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((f) => f.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((f) => f.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((f) => f.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((f) => f.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((f) => f.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((f) => f.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((f) => f.id === e.id);
        return u ? [{ kind: "rename-element", type: e.type, id: e.id, name: u.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const r = this.model.flows.find((u) => u.id === e.id);
        return r ? [
          {
            kind: "add-flow",
            id: r.id,
            name: r.name,
            archetype: r.archetype,
            triggerAggregateId: r.triggerAggregateId ?? "",
            triggerEvent: r.triggerEvent ?? "",
            targetId: r.targetId,
            readModelName: r.readModelName,
            targetUseCaseId: r.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const r = (this.model.views ?? []).find((u) => u.id === e.id);
        return r ? [{ kind: "add-view", id: r.id, name: r.name, memberIds: r.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const r = (this.model.processes ?? []).find((_) => _.id === e.processId), u = (r == null ? void 0 : r.steps.findIndex((_) => _.id === e.id)) ?? -1;
        if (!r || u < 0) return null;
        const f = r.steps[u];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: f.id,
            name: f.name,
            stepType: f.type,
            roleId: f.roleId,
            deadline: f.deadline,
            useCaseId: f.useCaseId,
            compensationUseCaseId: f.compensationUseCaseId,
            afterStepId: u > 0 ? r.steps[u - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const r = (this.model.processes ?? []).find((f) => f.id === e.processId), u = (r == null ? void 0 : r.steps.findIndex((f) => f.id === e.id)) ?? -1;
        return !r || u < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: u > 0 ? r.steps[u - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const r = (this.model.processes ?? []).find((f) => f.id === e.processId), u = r == null ? void 0 : r.steps.find((f) => f.id === e.id);
        return u ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: u.roleId,
            deadline: u.deadline,
            compensationUseCaseId: u.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const r = (this.model.processes ?? []).find((u) => u.id === e.id);
        return r ? [
          {
            kind: "add-process",
            id: r.id,
            name: r.name,
            moduleId: r.ownerModuleId ?? "",
            triggerAggregateId: r.triggerAggregateId,
            triggerEvent: r.triggerEvent,
            steps: r.steps
          }
        ] : null;
      }
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const r = (this.model.workflows ?? []).find((u) => u.id === e.id);
        return r ? [
          {
            kind: "add-workflow",
            id: r.id,
            name: r.name,
            triggerAggregateId: r.triggerAggregateId,
            triggerDomainServiceId: r.triggerDomainServiceId,
            triggerUseCaseId: r.triggerUseCaseId,
            triggerEvent: r.triggerEvent,
            completionEventName: r.onCompletionEventName,
            workflowSteps: r.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const r = (this.model.workflows ?? []).find((_) => _.id === e.workflowId), u = (r == null ? void 0 : r.steps.findIndex((_) => _.id === e.id)) ?? -1;
        if (!r || u < 0) return null;
        const f = r.steps[u];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: f.id,
            name: f.name,
            emittedEventName: f.emittedEventName,
            targetUseCaseId: f.targetUseCaseId,
            completionEventName: f.completionEventName,
            dependsOnStepIds: f.dependsOnStepIds,
            afterStepId: u > 0 ? r.steps[u - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...r.steps.filter((_) => _.id !== e.id && (_.dependsOnStepIds ?? []).includes(e.id)).map(
            (_) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: _.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const r = (this.model.workflows ?? []).find((f) => f.id === e.workflowId), u = r == null ? void 0 : r.steps.find((f) => f.id === e.id);
        return u ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: u.emittedEventName,
            targetUseCaseId: u.targetUseCaseId,
            completionEventName: u.completionEventName
          }
        ] : null;
      }
      case "set-workflow-trigger": {
        const r = (this.model.workflows ?? []).find((u) => u.id === e.id);
        return r ? [{
          kind: "set-workflow-trigger",
          id: e.id,
          triggerEvent: r.triggerEvent ?? "",
          triggerAggregateId: r.triggerAggregateId,
          triggerDomainServiceId: r.triggerDomainServiceId,
          triggerUseCaseId: r.triggerUseCaseId
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), a = o.nodes[t] ?? null;
    let l = { x: i, y: s };
    const c = this.sceneFor(n), p = c.nodes.find((h) => h.id === t);
    if (p != null && p.parentId) {
      const h = c.nodes.find((y) => y.id === p.parentId);
      h && (l = { x: i - h.x, y: s - h.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: l } });
    const g = [{ kind: "move-node", view: n, id: t, pos: a }];
    if (n === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const y = this.inverseOf(h);
        y && g.unshift(...y), this.command(h, !1);
      }
    }
    this.pushUndoEntry(g);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((r) => r.id === t) ?? (this.model.proxyApis ?? []).find((r) => r.id === t);
    if (!o || i && !this.model.externalSystems.some((r) => r.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === a) return;
    const c = this._view, p = this.viewLayout(c), g = this.sceneFor(c), h = l ? g.nodes.find((r) => r.id === l) : void 0, y = h ? { x: s - h.x, y: n - h.y } : { x: s, y: n }, m = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: c, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(c, { ...p, nodes: { ...p.nodes, [t]: y } }), this.pushUndoEntry(m);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((r) => r.id === t), a = this.model.externalSystems.find((r) => r.id === i);
    if (!o || !a || (this.model.proxyApis ?? []).some(
      (r) => r.targetApiId === t && r.publishedByExternalSystemId === i
    )) return;
    const c = `proxy-${ne(o.name)}-${ne(a.name)}`;
    if ((this.model.proxyApis ?? []).some((r) => r.id === c)) return;
    const p = this._view, g = this.viewLayout(p), y = this.sceneFor(p).nodes.find((r) => r.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: c,
        name: `${o.name}@${a.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const m = [{ kind: "remove-proxy-api", id: c }];
    y && (m.push({ kind: "move-node", view: p, id: c, pos: g.nodes[c] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [c]: { x: s - y.x, y: n - y.y } }
    })), this.pushUndoEntry(m);
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
    var l, c, p;
    const t = e.target, i = (l = t.files) == null ? void 0 : l[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((c = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : c.id) ?? null, a = n || o ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!n && !o && !a) {
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
    const { id: t } = e.detail, i = this._view, s = this.viewLayout(i), n = new Set(s.collapsed ?? []);
    n.has(t) ? n.delete(t) : n.add(t), this.writeViewLayout(i, { ...s, collapsed: [...n] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), o = { ...s.nodes }, a = [];
    for (const { id: l, x: c, y: p } of t) {
      a.push({ kind: "move-node", view: i, id: l, pos: s.nodes[l] ?? null });
      let g = { x: c, y: p };
      const h = n.nodes.find((y) => y.id === l);
      if (h != null && h.parentId) {
        const y = n.nodes.find((m) => m.id === h.parentId);
        y && (g = { x: c - y.x, y: p - y.y });
      }
      o[l] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: l } of t) {
        const c = this.stepReorderCommand(l);
        if (c) {
          const p = this.inverseOf(c);
          p && a.unshift(...p), this.command(c, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, l = this.viewLayout(a), c = this.sceneFor(a).nodes.filter((h) => h.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((g = l.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: l.nodes[t] ?? null },
      ...c.map((h) => ({ kind: "move-node", view: a, id: h.id, pos: l.nodes[h.id] ?? null }))
    ]);
    const p = { ...l.nodes, [t]: { x: i, y: s } };
    for (const h of c) p[h.id] = { x: h.x - i, y: h.y - s };
    this.writeViewLayout(a, {
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
    const i = un(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
      (a, l) => (s.get(a.id) ?? 0) - (s.get(l.id) ?? 0)
    );
    if (n.every((a, l) => a.id === t.steps[l].id)) return null;
    const o = n.findIndex((a) => a.id === e);
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
    var q, le, I, S;
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(e), x = this.owningWorkflowOf(t);
      if (!v || v !== x || e === t) return;
      const k = v.steps.find(($) => $.id === t);
      if (((k == null ? void 0 : k.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const v = this.model.pages ?? [], x = this.model.uiApps ?? [], k = (V) => x.some((te) => te.id === V), $ = (V) => v.some((te) => te.id === V);
      if (n === "home" && k(e) && ($(t) || k(t))) {
        if (t === e) return;
        this.command(
          $(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && k(e) && $(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && $(e) && ($(t) || k(t)) && t !== e) {
        const V = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          $(t) ? { kind: V, pageId: e, targetId: t, toAppId: null } : { kind: V, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (n === "viewmodel" && $(e)) {
        (this.model.models ?? []).some((V) => V.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((n === "view" || n === "edit") && k(e) && $(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const M = (V) => /^wizrow:([^:]+):(.+)$/.exec(V), C = M(e) ?? M(t);
      if (C) {
        const V = M(e) ? t : e;
        $(V) && V !== C[1] && this.command({ kind: "set-wizard-step-page", pageId: C[1], itemId: C[2], targetId: V });
        return;
      }
      const N = v.find((V) => V.id === t && V.type === "WIZARD");
      if ($(e) && N && e !== N.id) {
        (N.wizardSteps ?? []).some((V) => V.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: N.id, targetId: e });
        return;
      }
      if ($(e) && k(t)) {
        const V = v.find((xe) => xe.id === e), te = x.find((xe) => xe.id === t);
        if (te.type === "MASTER_DETAIL" && !te.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${V.name} es la cabecera de ${te.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: V.name,
          pageId: e,
          itemId: this.newMenuItemId(V.name)
        });
        return;
      }
      const B = this.model.identityProviders ?? [], W = (V) => B.some((te) => te.id === V);
      if (W(e) || W(t)) {
        const V = W(e) ? e : t, te = W(e) ? t : e;
        k(te) ? this.command({ kind: "set-identity-provider", id: te, targetId: V }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const re = (V) => (this.model.models ?? []).some((te) => te.id === V);
      if (re(e) || re(t)) {
        const V = re(e) ? e : t, te = re(e) ? t : e;
        if ($(te)) {
          this.command({ kind: "set-page-model", pageId: te, modelId: V });
          return;
        }
        if (k(te)) {
          this.command({ kind: "set-app-model", appId: te, modelId: V });
          return;
        }
        return;
      }
      const se = ge(e);
      if (se != null && se.itemId && ((q = ge(t)) != null && q.itemId || k(t))) {
        const V = ge(t), te = this.menuEntryIn(se.appId, se.itemId);
        if (!te) return;
        if (V != null && V.itemId) {
          const xe = this.menuEntryIn(V.appId, V.itemId);
          if (!xe) return;
          const be = (lt) => (lt ?? []).some((Kt) => Kt.id === V.itemId || be(Kt.children));
          if (se.appId === V.appId && (V.itemId === se.itemId || be(te.entry.children)))
            return;
          const Ae = (le = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : le.renderRoot.querySelector(`g[data-node-id="${t}"]`), we = Ae == null ? void 0 : Ae.getBoundingClientRect(), We = we && s !== void 0 ? (s - we.top) / Math.max(1, we.height) : 0.5, Yt = We < 0.3 ? "before" : We > 0.7 ? "after" : "nest";
          if (Yt === "nest")
            this.command({
              kind: "move-menu-item",
              appId: se.appId,
              toAppId: V.appId,
              itemId: se.itemId,
              parentId: V.itemId
            });
          else {
            const lt = Yt === "before" ? V.itemId : xe.beforeId ?? void 0;
            if (se.appId === V.appId && xe.parentId === te.parentId && lt === se.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: se.appId,
              toAppId: V.appId,
              itemId: se.itemId,
              parentId: xe.parentId ?? void 0,
              beforeItemId: lt
            });
          }
          return;
        }
        if (se.appId === t && !te.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: se.appId,
          toAppId: t,
          itemId: se.itemId
        });
        return;
      }
      const G = ge(e) ?? ge(t);
      if (G) {
        const V = ge(e) ? e : t, te = ge(e) ? t : e;
        if (((I = this.sceneFor("ui").nodes.find((we) => we.id === V)) == null ? void 0 : I.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const xe = this.model.modules.some(
          (we) => (we.useCases ?? []).some((We) => We.id === te)
        ), be = (this.model.aggregates ?? []).some((we) => we.id === te), Ae = this.model.modules.flatMap((we) => we.queryServices ?? []).find((we) => (we.operations ?? []).some((We) => We.id === te));
        $(te) ? this.command({ kind: "set-menu-page", pageId: te, ...G }) : k(te) && te !== G.appId ? this.command({ kind: "set-menu-app", toAppId: te, ...G }) : xe ? this.command({ kind: "set-menu-use-case", useCaseId: te, ...G }) : be ? this.command({ kind: "set-menu-aggregate", aggregateId: te, ...G }) : Ae && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Ae.id,
          queryOperationId: te,
          ...G
        });
        return;
      }
      if ((this.model.actors ?? []).some((V) => V.id === e) && k(t)) {
        (this.model.actorAppUses ?? []).some((V) => V.actorId === e && V.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const X = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (X) {
        const V = new Set(
          this.model.modules.flatMap((be) => (be.useCases ?? []).map((Ae) => Ae.id))
        ), te = new Set(
          this.model.modules.flatMap((be) => (be.queryServices ?? []).map((Ae) => Ae.id))
        ), xe = v.find((be) => be.id === X.pageId);
        V.has(X.other) ? (xe.buttons ?? []).some((be) => be.useCaseId === X.other) || this.command({ kind: "add-page-button", pageId: X.pageId, useCaseId: X.other }) : te.has(X.other) && this.command({ kind: "set-page-listing", pageId: X.pageId, queryServiceId: X.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [];
      if (!v.some((N) => N.id === e) || !v.some((N) => N.id === t) || e === t || (this.model.modelMappings ?? []).some((N) => N.sourceModelId === e && N.targetModelId === t))
        return;
      const x = v.find((N) => N.id === e), k = v.find((N) => N.id === t), $ = (N) => N.replace(/[^a-zA-Z0-9]/g, ""), M = new Set((this.model.modelMappings ?? []).map((N) => N.id));
      let C = `mapping-${ne(x.name)}-${ne(k.name)}`;
      for (let N = 2; M.has(C); N++) C = `mapping-${ne(x.name)}-${ne(k.name)}-${N}`;
      this.command({
        kind: "add-model-mapping",
        id: C,
        name: `${$(x.name)}2${$(k.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, v, x] = o, k = (this.model.proxyApis ?? []).find((B) => B.id === x), $ = (k == null ? void 0 : k.targetApiId) ?? ((S = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === x && (this.model.apis ?? []).some(
          (W) => W.id === B.apiId && W.operations.some((re) => re.id === v)
        )
      )) == null ? void 0 : S.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((W) => W.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: v,
          moduleId: x,
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
        B && B[1] === k.targetApiId ? C = B[2] : this.model.modules.some((W) => W.id === t) && (this.model.apiImplementations ?? []).some(
          (W) => W.apiId === k.targetApiId && W.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === k.id && B.operationId === v && B.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: k.id,
        operationId: v,
        targetSiteId: C
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (N) => N.agentId === e && N.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (N) => N.agentId === e && N.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (N) => N.agentId === e && N.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (N) => N.agentId === e && N.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((N) => N.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (N) => N.agentId === e && N.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (N) => N.agentId === e && N.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((N) => N.id))
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
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (N) => N.agentId === e && N.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find(($) => $.id === e), x = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((M) => M.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((M) => M.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((M) => M.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), k = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      x && !k && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const l = (this.model.rags ?? []).find((v) => v.id === e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map(($) => $.id))
      ).has(t) && !(l.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map(($) => $.id))
      ).has(t) && !(l.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(l.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t) && !(l.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && !(l.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find(($) => $.id === e), x = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (x) {
        const $ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        x.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const k = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (k && !(v.steps ?? []).some((M) => M.targetUseCaseId === t)) {
        const M = `wfs-${ne(k.name)}`;
        let C = M;
        for (let N = 2; (v.steps ?? []).some((B) => B.id === C); N++)
          C = `${M}-${N}`;
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
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), x = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), k = v ?? x;
      if (k) {
        const $ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), M = new Set((this.model.aggregates ?? []).map((B) => B.id)), C = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((W) => W.id))
        ), N = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((W) => W.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: $ && M.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && C.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && N.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((v) => v.id === e)) {
      const v = (this.model.proxyApis ?? []).find((x) => x.id === e);
      if ((this.model.apis ?? []).some((x) => x.id === t)) {
        v.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((x) => x.id === t)) {
        if (!v.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (k) => k.apiId === v.targetApiId && k.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: v.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((x) => x.id === t) && v.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((v) => v.id === e)) {
      if (this.model.externalSystems.some((v) => v.id === t)) {
        (this.model.apis ?? []).find((x) => x.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((v) => v.id === t) && ((this.model.apiImplementations ?? []).some(
        (x) => x.apiId === e && x.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const c = new Set((this.model.actors ?? []).map((v) => v.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((k) => k.id)),
        ...this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((k) => k.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (k) => k.eventId === e && k.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!c.has(e)) return;
    }
    if (c.has(e)) {
      const v = new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map(($) => $.id))
      ), x = new Set(
        this.model.modules.flatMap((k) => (k.queryServices ?? []).map(($) => $.id))
      );
      if (v.has(t) || x.has(t)) {
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
    const p = this.owningApiOf(e);
    if (p) {
      if (new Set(
        this.model.modules.flatMap((x) => (x.useCases ?? []).map((k) => k.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((x) => x.id === t)) {
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
    const g = (v) => (this.model.notifications ?? []).find((x) => x.id === v);
    if (g(e) || g(t)) {
      const v = g(e) ?? g(t), x = g(e) ? t : e;
      if (this.model.modules.some(
        ($) => [...$.domainEvents ?? [], ...$.applicationEvents ?? []].some((M) => M.id === x)
      )) {
        v.eventId !== x && this.command({ kind: "set-notification-event", id: v.id, targetId: x });
        return;
      }
      if ((this.model.actors ?? []).some(($) => $.id === x)) {
        (v.recipientRoleIds ?? []).includes(x) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: x });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const h = (v) => (this.model.documents ?? []).find((x) => x.id === v);
    if (h(e) || h(t)) {
      const v = h(e) ?? h(t), x = h(e) ? t : e;
      if ((this.model.models ?? []).find((C) => C.id === x)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: x });
        return;
      }
      const $ = this.model.modules.flatMap((C) => C.queryServices ?? []).find((C) => C.id === x), M = this.model.modules.flatMap((C) => (C.queryServices ?? []).flatMap((N) => (N.operations ?? []).map((B) => ({ op: B, qs: N })))).find(({ op: C }) => C.id === x);
      if ($ || M) {
        this.command({
          kind: "set-document-query",
          id: v.id,
          queryServiceId: ($ == null ? void 0 : $.id) ?? M.qs.id,
          queryOperationId: (M == null ? void 0 : M.op.id) ?? null
        });
        return;
      }
      this.emit("modux-notice", {
        message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
      });
      return;
    }
    const y = this.model.identityProviders ?? [], m = (v) => y.find((x) => x.id === v);
    if (m(e) || m(t)) {
      const v = m(e) ?? m(t), x = m(e) ? t : e;
      if (m(e) && this.model.externalSystems.some((M) => M.id === x)) {
        v.publishedByExternalSystemId !== x && this.command({ kind: "set-idp-publisher", id: v.id, targetId: x });
        return;
      }
      const k = this.model.modules.some((M) => M.id === x), $ = (this.model.etlFlows ?? []).some((M) => M.id === x);
      if (k || $) {
        this.command({ kind: "set-identity-provider", id: x, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const r = this.model.etlFlows ?? [], u = (v) => r.find((x) => x.id === v);
    if (u(e) || u(t)) {
      const v = u(e) ?? u(t), x = u(e) ? t : e, k = !u(e), $ = new Set(this.model.externalSystems.flatMap((X) => (X.tables ?? []).map((V) => V.id))), M = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((X) => X.id),
        ...(this.model.proxyApis ?? []).map((X) => X.id)
      ]), C = (this.model.apis ?? []).find((X) => X.operations.some((V) => V.id === x)), N = new Set(
        this.model.modules.flatMap((X) => [
          ...(X.domainEvents ?? []).map((V) => V.id),
          ...(X.applicationEvents ?? []).map((V) => V.id)
        ])
      );
      let B = null, W = {};
      if ($.has(x) ? (B = k ? "SOURCE_PULL" : "WRITE_DB", W = { externalTableId: x }) : C ? (B = k ? "SOURCE_PULL" : "WRITE_API", W = { apiId: C.id, operationId: x }) : M.has(x) ? (B = k ? "SOURCE_PULL" : "WRITE_API", W = { apiId: x }) : N.has(x) && (B = k ? "SOURCE_CONSUMER" : "WRITE_EVENT", W = { targetId: x }), !B) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (X) => X.type === B && (X.externalTableId ?? X.operationId ?? X.apiId ?? X.eventId) === (W.externalTableId ?? W.operationId ?? W.apiId ?? W.targetId)
      )) return;
      const se = new Set((v.steps ?? []).map((X) => X.id));
      let G = (v.steps ?? []).length + 1;
      for (; se.has(`ets-${G}`); ) G++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${G}`, stepType: B, ...W });
      return;
    }
    const f = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), _ = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (f || _) {
      const v = (f ?? _).name, x = f ? { externalUseCaseId: e } : { externalTableId: e }, k = (C) => f ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, $ = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (N) => k(N) && N.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne($.name)}`,
          name: `${$.name}Projection`,
          ...x,
          targetId: t
        });
        return;
      }
      const M = this.model.modules.find((C) => C.id === t);
      if (M) {
        (this.model.projections ?? []).some(
          (N) => k(N) && N.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne(M.name)}`,
          name: `${v}ViewProjection`,
          ...x,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const A = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (A) {
      const v = this.model.modules.flatMap((k) => k.readModels ?? []).find((k) => k.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(A.name)}-${ne(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const x = this.model.modules.find((k) => k.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(A.name)}-${ne(x.name)}`,
          name: `${A.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${A.name}View`
        });
        return;
      }
    }
    const R = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((x) => x.id))
    ), T = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((x) => x.id))
    ]), b = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((x) => x.id))
    ), w = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((x) => x.id))), P = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((x) => x.id))
    );
    if (w.has(e) && P.has(t)) {
      (this.model.queryCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const U = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((x) => x.id))
    );
    if (w.has(e) && U.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (w.has(e) && w.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const D = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (D && w.has(t)) {
      D.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (w.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (T.has(e) && R.has(t) || w.has(e) && b.has(t)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === e && x.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (R.has(e) || b.has(e)) {
      const v = b.has(e), x = this.model.modules.flatMap((G) => (v ? G.applicationEvents : G.domainEvents) ?? []).find((G) => G.id === e), k = this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => ({ u: X, module: G }))).find(({ u: G }) => G.id === t), $ = this.model.modules.flatMap((G) => (G.readModels ?? []).map((X) => ({ rm: X, module: G }))).find(({ rm: G }) => G.id === t), M = this.model.modules.find((G) => G.id === t) ?? ($ == null ? void 0 : $.module) ?? (k == null ? void 0 : k.module);
      if (!x || !M) return;
      const C = new Set((this.model.aggregates ?? []).map((G) => G.id)), N = new Set(
        this.model.modules.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
      ), B = (this.model.emissions ?? []).find(
        (G) => G.domainEventId === e && (v ? w.has(G.sourceId) : C.has(G.sourceId) || N.has(G.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const W = !v && C.has(B.sourceId);
      if (k) {
        if (this.model.flows.some(
          (X) => X.archetype === "TRIGGERS" && X.triggerEvent === x.name && X.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(x.name)}-${ne(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: W ? B.sourceId : "",
          triggerDomainServiceId: !v && !W ? B.sourceId : void 0,
          triggerUseCaseId: v ? B.sourceId : void 0,
          triggerEvent: x.name,
          targetId: M.id,
          targetUseCaseId: k.u.id
        });
        return;
      }
      const re = ($ == null ? void 0 : $.rm.name) ?? `${x.name}View`;
      if (this.model.flows.some(
        (G) => G.archetype === "MATERIALIZES" && G.triggerEvent === x.name && G.targetId === M.id && G.readModelName === re
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ne(x.name)}-${ne(re)}`,
        name: re,
        archetype: "MATERIALIZES",
        triggerAggregateId: W ? B.sourceId : "",
        triggerDomainServiceId: !v && !W ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: x.name,
        targetId: M.id,
        readModelName: re
      });
      return;
    }
    const z = /* @__PURE__ */ new Set([
      ...T,
      ...w,
      ...P,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((x) => x.id))
    ]);
    if (z.has(e) || z.has(t) || R.has(t) || b.has(t))
      return;
    const L = new Set(this.model.externalSystems.map((v) => v.id));
    if (L.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((C) => C.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (C) => C.externalSystemId === e && C.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (L.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const x = (this.model.apis ?? []).find(
        (M) => M.operations.some((C) => C.id === t)
      ), k = /^apiop:(.+)@(.+)$/.exec(t), $ = x ? { operationId: t, siteId: x.id } : k ? { operationId: k[1], siteId: k[2] } : null;
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
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (C) => C.sourceId === e && C.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    L.has(t) || c.has(t);
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
      const n = this.memberIdOf(i, s), o = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
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
        if (n = /^idpauth:(.+)$/.exec(t))
          this.command({ kind: "set-identity-provider", id: n[1], targetId: null });
        else if (n = /^appheader:(.+)->(.+)$/.exec(t))
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
        else if (n = /^wizstep:([^:]+):(.+)$/.exec(t))
          this.command({ kind: "set-wizard-step-page", pageId: n[1], itemId: n[2], targetId: null });
        else if (n = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] });
        else if (n = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: n[1], queryServiceId: null });
        else if (n = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: n[1], modelId: null });
        else if (n = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: n[1], appId: n[2] });
        else if (n = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const o = ge(n[1]);
          o && this.command({ kind: "set-menu-page", pageId: null, ...o });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const o = ge(n[1]);
          o && this.command({ kind: "set-menu-app", toAppId: null, ...o });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const o = ge(n[1]);
          o && this.command({ kind: "set-menu-use-case", useCaseId: null, ...o });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const o = ge(n[1]);
          o && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...o });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const o = ge(n[1]);
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
        const n = ge(t);
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
      if (i === "identity-provider") {
        this.command({ kind: "remove-identity-provider", id: t });
        return;
      }
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "model-mapping") {
      const n = /^mapping:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-model-mapping", id: n[1] }));
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
      const [, o, a] = n, l = (s = (this.model.apis ?? []).find(
        (c) => c.operations.some((p) => p.id === o)
      )) == null ? void 0 : s.id;
      if (!l) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: l, operationId: o, moduleId: a });
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
      const [, o, a, l] = n, c = /^apiimpl:.+@(.+)$/.exec(l), p = c ? c[1] : l;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: a, operationId: o, targetSiteId: p });
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
    if (this._view === "context-map" && e === "edge" && i === "notification-trigger") {
      const n = /^notif:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "set-notification-event", id: n[1], targetId: null }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-recipient") {
      const n = /^notifto:([^:]+):(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-notification-recipient", id: n[1], roleId: n[2] }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "document-query") {
      const n = /^docq:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "set-document-query", id: n[1], queryServiceId: null, queryOperationId: null }));
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "notification") {
      this._selectedId = null, this.command({ kind: "remove-notification", id: t });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "document") {
      this._selectedId = null, this.command({ kind: "remove-document", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "idp-trust" || i === "idp-service")) {
      const n = /^idp(?:trust|svc):(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "set-identity-provider", id: n[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "idp-federation") {
      const n = /^idpfed:(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "set-idp-publisher", id: n[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "identity-provider") {
      this._selectedId = null, this.command({ kind: "remove-identity-provider", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const n = /^etl:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: n[1], id: n[2] });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "etl-flow") {
      this._selectedId = null, this.command({ kind: "remove-etl-flow", id: t });
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
      id: `step-${ne(e)}`,
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
      id: `wfstep-${ne(e)}`,
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
    const t = new Set(e.memberIds), i = (n, o, a = {}) => E`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(n) ? "implicit" : ""}"
        title=${a.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
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
            const n = ge(i);
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
    const i = `view-${ne(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((m) => m.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((m) => t.has(m.id)), s = new Set(i.map((m) => m.id)), n = this.model.externalSystems.filter((m) => t.has(m.id)), o = new Set(n.map((m) => m.id)), a = (this.model.aggregates ?? []).filter(
      (m) => t.has(m.id) || s.has(m.moduleId)
    ), l = new Set(a.map((m) => m.id)), c = (this.model.uiApps ?? []).filter((m) => t.has(m.id)), p = /* @__PURE__ */ new Set(), g = (m) => {
      for (const r of m ?? [])
        r.pageId && p.add(r.pageId), g(r.children);
    };
    c.forEach((m) => g(m.menuItems));
    const h = (this.model.pages ?? []).filter(
      (m) => t.has(m.id) || p.has(m.id)
    ), y = new Set(c.map((m) => m.id));
    return {
      ...this.model,
      uiApps: c,
      pages: h,
      actorAppUses: (this.model.actorAppUses ?? []).filter((m) => y.has(m.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (m) => s.has(m.sourceId) && s.has(m.targetId)
      ),
      flows: this.model.flows.filter(
        (m) => t.has(m.id) || (s.has(m.sourceId) || o.has(m.sourceId)) && (s.has(m.targetId) || o.has(m.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((m) => l.has(m.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (m) => l.has(m.sourceAggregateId) && l.has(m.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (m) => t.has(m.id) || (m.ownerModuleId ? s.has(m.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((m) => t.has(m.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((m) => t.has(m.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((m) => t.has(m.id)),
      rags: (this.model.rags ?? []).filter((m) => t.has(m.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((m) => t.has(m.id)),
      apis: (this.model.apis ?? []).filter(
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? o.has(m.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? o.has(m.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? sc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : nc(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const a of o ?? [])
        a.id && t.add(a.id), i(a.children);
    };
    (this.model.uiApps ?? []).forEach((o) => i(o.menuItems));
    const s = `mi-${ne(e)}`;
    let n = s;
    for (let o = 2; t.has(n); o++) n = `${s}-${o}`;
    return n;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, a) => {
      var c;
      const l = o ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (s = { node: l[p], parentId: a, beforeId: ((c = l[p + 1]) == null ? void 0 : c.id) ?? null }), n(l[p].children, l[p].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, o) {
    const a = o ?? this.allComponentIds(), l = (h) => {
      if (!n) return h.id;
      const y = `cmp-${ne(h.kind)}`;
      let m = y;
      for (let r = 2; a.has(m) || a.has(`${m}-tab-1`); r++) m = `${y}-${r}`;
      return a.add(m), m;
    }, c = [], p = (h, y) => {
      const m = l(h);
      c.push({ kind: "add-page-component", pageId: e, componentId: m, componentKind: h.kind, parentComponentId: y }), h.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-2` })), c.push({
        kind: "set-page-component",
        pageId: e,
        componentId: m,
        title: h.title ?? null,
        text: h.text ?? null,
        label: h.label ?? null,
        useCaseId: h.useCaseId ?? null,
        mappingId: h.mappingId ?? null,
        modelId: h.modelId ?? null,
        queryServiceId: h.queryServiceId ?? null,
        queryOperationId: h.queryOperationId ?? null,
        fieldId: h.fieldId ?? null,
        stereotype: h.stereotype ?? null,
        colspan: h.colspan ?? null
      });
      for (const r of h.children ?? []) p(r, m);
      return m;
    }, g = p(t, i);
    return s && c.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: c, rootId: g };
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
      for (const a of o ?? [])
        t.add(a.id), i(a.children);
    };
    (this.model.pages ?? []).forEach((o) => i(o.content));
    const s = `cmp-${ne(e)}`;
    let n = s;
    for (let o = 2; t.has(n) || t.has(`${n}-tab-1`); o++) n = `${s}-${o}`;
    return n;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var o;
    if (i === t) return;
    const s = (((o = (this.model.pages ?? []).find((a) => a.id === e)) == null ? void 0 : o.wizardSteps) ?? []).map((a) => a.id ?? a.pageId), n = s.indexOf(t);
    n >= 0 && (i ? s[n + 1] === i : n === s.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((o) => o.id === e);
    let s = null;
    const n = (o, a) => {
      var c;
      const l = o ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (s = { entry: l[p], parentId: a, beforeId: ((c = l[p + 1]) == null ? void 0 : c.id) ?? null }), n(l[p].children, l[p].id ?? null);
    };
    return n(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var a;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const l = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!l) return;
      t = this._selectedCmp.pageId, oe.LEAF_KINDS.has(l.node.kind) ? (i = l.parentId ?? void 0, s = l.beforeId) : i = l.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (l.node.children ?? [])[0]) == null ? void 0 : a.id : l.node.id;
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
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var a;
      const { id: i, w: s, h: n } = t.detail, o = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((a = o.sizes) == null ? void 0 : a[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...o,
        sizes: { ...o.sizes ?? {}, [i]: { w: s, h: n } }
      });
    }}
      .selectedId=${this._selectedId}
      .selectedIds=${this._multi}
      .selectedCmp=${this._selectedCmp}
      @keydown=${this.onDesignKeydown}
      @page-component-selected=${(t) => {
      this._selectedCmp = t.detail.componentId ? { pageId: t.detail.pageId, componentId: t.detail.componentId } : null;
    }}
      @page-component-transferred=${this.onComponentTransferred}
      @page-wizard-step-moved=${(t) => this.moveWizardStep(t.detail.pageId, t.detail.stepKey, t.detail.beforeStepKey ?? null)}
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
      label: t.detail.label,
      type: t.detail.bar
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
      const { pageId: i, fieldId: s, stereotype: n, colspan: o, label: a } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: o, label: a });
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
        label: "Mapeados",
        symbol: "flow",
        color: "#7c3aed",
        items: (e.modelMappings ?? []).map((s) => ({ id: s.id, name: s.name }))
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
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, s, n, o) : a.existing && this.placeExistingFromPalette(a.existing, s, n, e.clientX, e.clientY, o);
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
      s.modules.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.domainEvents ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.applicationEvents ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.readModels ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.domainServices ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.queryServices ?? []).map((a) => a.id)),
      s.modules.flatMap((o) => (o.scheduledTriggers ?? []).map((a) => a.id)),
      (s.aggregates ?? []).map((o) => o.id),
      (s.entities ?? []).map((o) => o.id),
      (s.actors ?? []).map((o) => o.id),
      s.externalSystems.map((o) => o.id),
      s.externalSystems.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      s.externalSystems.flatMap((o) => (o.tables ?? []).map((a) => a.id)),
      s.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((a) => a.id)),
      (s.apis ?? []).map((o) => o.id),
      (s.apis ?? []).flatMap((o) => (o.operations ?? []).map((a) => a.id)),
      (s.proxyApis ?? []).map((o) => o.id),
      (s.aiAgents ?? []).map((o) => o.id),
      (s.mcpGateways ?? []).map((o) => o.id),
      (s.rags ?? []).map((o) => o.id),
      (s.workflows ?? []).map((o) => o.id),
      (s.workflows ?? []).flatMap((o) => (o.steps ?? []).map((a) => a.id)),
      (s.etlFlows ?? []).map((o) => o.id),
      (s.identityProviders ?? []).map((o) => o.id),
      (s.notifications ?? []).map((o) => o.id),
      (s.documents ?? []).map((o) => o.id),
      (s.uiApps ?? []).map((o) => o.id),
      (s.pages ?? []).map((o) => o.id)
    ])
      n.forEach((o) => i.add(o));
    for (let n = 1; ; n++) {
      const o = n === 1 ? e : `${e} ${n}`, a = `${t}${ne(o)}`;
      if (!i.has(a)) return { id: a, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let l = t; l; )
      s.push(l), l = (o = i.nodes.find((c) => c.id === l)) == null ? void 0 : o.parentId;
    if ([
      "aggregate",
      "use-case",
      "policy",
      "domain-event",
      "application-event",
      "domain-service",
      "query-service",
      "scheduled-trigger",
      "etl-flow",
      "notification",
      "document"
    ].includes(e)) return s.find((l) => this.model.modules.some((c) => c.id === l)) ?? null;
    if (e === "read-model") {
      const l = s.find((p) => (this.model.aggregates ?? []).some((g) => g.id === p));
      if (l) return l;
      const c = s.find((p) => this.model.modules.some((g) => g.id === p));
      return ((a = (this.model.aggregates ?? []).find((p) => p.moduleId === c)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((l) => this.model.externalSystems.some((c) => c.id === l)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (l) => this.model.modules.some((c) => (c.useCases ?? []).some((p) => p.id === l))
      ) ?? null;
    if (e === "api-operation") {
      for (const l of s) {
        if ((this.model.apis ?? []).some((g) => g.id === l)) return l;
        const c = /^apiimpl:(.+)@(.+)$/.exec(l);
        if (c && (this.model.apis ?? []).some((g) => g.id === c[1])) return c[1];
        const p = (this.model.proxyApis ?? []).find((g) => g.id === l);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((l) => this.model.externalSystems.some((c) => c.id === l)) ?? s.find((l) => this.model.modules.some((c) => c.id === l)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var m, r, u, f, _, A, R;
    const n = Y.PALETTE_NEW.find((T) => T.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const T = e.slice(4), b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = b ? b[1] : i && (this.model.pages ?? []).some((L) => L.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let P = b ? b[2] : void 0, U = null;
      if (T === "tab") {
        let L = null, q = P ? this.componentIn(w, P) : null;
        for (; q; ) {
          if (q.node.kind === "tabLayout") {
            L = q.node.id;
            break;
          }
          q = q.parentId ? this.componentIn(w, q.parentId) : null;
        }
        if (!L) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const le = this.componentIn(w, L).node, I = this.newComponentId("tab"), S = `Pestaña ${(le.children ?? []).filter((v) => v.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: w, componentId: I, componentKind: "tab", parentComponentId: L }, !1), this.command({ kind: "set-page-component", pageId: w, componentId: I, title: S }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: I }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const L = this.componentIn(w, s.componentId);
        L && L.node.kind === "tab" ? P = L.node.id : L && (P = L.parentId ?? void 0, U = s.pos === "before" ? s.componentId : L.beforeId);
      } else if (P) {
        const L = ((m = this.componentIn(w, P)) == null ? void 0 : m.node) ?? null;
        (L == null ? void 0 : L.kind) === "tabLayout" && (L.children ?? [])[0] && (P = (L.children ?? [])[0].id);
      }
      const D = this.newComponentId(T), z = {
        kind: "add-page-component",
        pageId: w,
        componentId: D,
        componentKind: T,
        parentComponentId: P
      };
      if (!U) {
        this.command(z);
        return;
      }
      this.command(z, !1), this.command(
        { kind: "move-page-component", pageId: w, componentId: D, parentComponentId: P ?? null, beforeComponentId: U },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: D }]);
      return;
    }
    const o = this._view, a = this.sceneFor(o), l = (T, b) => {
      const w = this.viewLayout(o), P = b ? a.nodes.find((D) => D.id === b) : void 0, U = P ? { x: Math.round(t.x - P.x), y: Math.round(t.y - P.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...w, nodes: { ...w.nodes, [T]: U } }), { kind: "move-node", view: o, id: T, pos: null };
    }, c = (T, b, w) => {
      const P = this.inverseOf(T) ?? [];
      this.command(T, !1);
      const U = l(b, w);
      this.pushUndoEntry([...P, U]);
    };
    if (!n.child) {
      const T = {
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
        "ui-model": "model-",
        "identity-provider": "idp-"
      }, { id: b, name: w } = this.uniquePaletteName(n.label, T[e] ?? ""), P = e === "module" ? { kind: "add-module", id: b, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: b, name: w } : e === "external-system" ? { kind: "add-external-system", id: b, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: b, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: b, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: b, name: w } : e === "rag" ? { kind: "add-rag", id: b, name: w } : e === "api" ? { kind: "add-api", id: b, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: b, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: b, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: b, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: b, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: b, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: b, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: b, name: w } : {
        kind: "add-workflow",
        id: b,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      c(P, b);
      return;
    }
    if (e === "ui-wizard-step") {
      const T = [];
      for (let D = i ?? void 0; D; )
        T.push(D), D = (r = a.nodes.find((z) => z.id === D)) == null ? void 0 : r.parentId;
      const b = T.map((D) => {
        var z;
        return ((z = /^wizrow:([^:]+):/.exec(D)) == null ? void 0 : z[1]) ?? D;
      }).find((D) => (this.model.pages ?? []).some((z) => z.id === D && z.type === "WIZARD"));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const w = ((u = (this.model.pages ?? []).find((D) => D.id === b)) == null ? void 0 : u.wizardSteps) ?? [], P = new Set(w.map((D) => D.id ?? D.pageId));
      let U = w.length + 1;
      for (; P.has(`wzs-${U}`); ) U++;
      this.command({ kind: "add-page-wizard-step", pageId: b, itemId: `wzs-${U}`, label: `Paso ${U}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const T = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", b = T === "CRUD" ? "CRUD" : T === "WIZARD" ? "Wizard" : "Página", { id: w, name: P } = this.uniquePaletteName(b, "page-"), U = [];
      for (let L = i ?? void 0; L; )
        U.push(L), L = (f = a.nodes.find((q) => q.id === L)) == null ? void 0 : f.parentId;
      const D = U.find((L) => (this.model.uiApps ?? []).some((q) => q.id === L)), z = U.map((L) => {
        var q;
        return ((q = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : q[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((q) => q.id === L && q.type === "WIZARD"));
      if (z) {
        const L = a.nodes.find((le) => le.id === z);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: P, pageType: T }, !1), this.command({ kind: "add-page-wizard-step", pageId: z, targetId: w }, !1);
        const q = l(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, q]), this.emit("modux-notice", { message: `${P} creada como paso del wizard` });
        return;
      }
      if (D) {
        const L = a.nodes.find((q) => q.id === D);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40);
      }
      c(
        D ? { kind: "create-ui-page", id: w, name: P, pageType: T, appId: D, menuLabel: P } : { kind: "create-ui-page", id: w, name: P, pageType: T },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const T = [];
      for (let z = i ?? void 0; z; )
        T.push(z), z = (_ = a.nodes.find((L) => L.id === z)) == null ? void 0 : _.parentId;
      const b = T.find((z) => (this.model.uiApps ?? []).some((L) => L.id === z));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const w = /* @__PURE__ */ new Set(), P = (z) => {
        for (const L of z ?? [])
          w.add(L.label), P(L.children);
      };
      (this.model.uiApps ?? []).forEach((z) => P(z.menuItems));
      let U = "Entrada";
      for (let z = 2; w.has(U); z++) U = `Entrada ${z}`;
      const D = T.map((z) => ge(z)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: b,
        label: U,
        itemId: this.newMenuItemId(U),
        parentId: D == null ? void 0 : D.itemId,
        parentLabel: D != null && D.itemId || D == null ? void 0 : D.label
      });
      return;
    }
    if (e === "etl-transform") {
      const T = [];
      for (let U = i ?? void 0; U; )
        T.push(U), U = (A = a.nodes.find((D) => D.id === U)) == null ? void 0 : A.parentId;
      const b = T.map((U) => (this.model.etlFlows ?? []).find((D) => D.id === U)).find(Boolean);
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const w = new Set((b.steps ?? []).map((U) => U.id));
      let P = (b.steps ?? []).length + 1;
      for (; w.has(`ets-${P}`); ) P++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: b.id,
        id: `ets-${P}`,
        name: `Transformación ${P}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const T = this.model.workflows ?? [], b = [];
      for (let L = i ?? void 0; L; )
        b.push(L), L = (R = a.nodes.find((q) => q.id === L)) == null ? void 0 : R.parentId;
      const w = b.map((L) => T.find((q) => q.id === L)).find(Boolean), P = b.map((L) => {
        const q = T.find((le) => (le.steps ?? []).some((I) => I.id === L));
        return q ? { owner: q, stepId: L } : null;
      }).find(Boolean), U = w ?? (P == null ? void 0 : P.owner);
      if (!U) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: D, name: z } = this.uniquePaletteName("Paso", "wfs-");
      P && (t = { x: t.x + 190, y: t.y }), c(
        {
          kind: "add-workflow-step",
          workflowId: U.id,
          id: D,
          name: z,
          ...P ? { dependsOnStepIds: [P.stepId], afterStepId: P.stepId } : {}
        },
        D
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${U.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const T = this.dropContainerFor("api", i);
      if (!T) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: b, name: w } = this.uniquePaletteName("API", "api-"), P = { kind: "add-api", id: b, name: w }, U = this.inverseOf(P) ?? [];
      this.command(P, !1), this.model.externalSystems.some((q) => q.id === T) ? this.command({ kind: "set-api-publisher", id: b, targetId: T }, !1) : this.command({ kind: "add-api-implementation", apiId: b, moduleId: T }, !1);
      const D = this.viewLayout(this._view), z = this.sceneFor(this._view).nodes.find((q) => q.id === T), L = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...D, nodes: { ...D.nodes, [b]: L } }), this.pushUndoEntry([...U, { kind: "move-node", view: this._view, id: b, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, i);
    if (!p) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const g = {
      aggregate: "agg-",
      "use-case": "uc-",
      policy: "uc-",
      "domain-event": "ev-",
      "application-event": "aev-",
      "domain-service": "ds-",
      "query-service": "qs-",
      "scheduled-trigger": "st-",
      "etl-flow": "etl-",
      notification: "ntf-",
      document: "doc-",
      "read-model": "rm-",
      "external-use-case": "xuc-",
      "external-table": "tbl-",
      "mcp-server": "mcpsrv-"
    }, { id: h, name: y } = this.uniquePaletteName(n.label, g[e] ?? "");
    if (e === "aggregate")
      c({ kind: "add-aggregate", id: h, name: y, moduleId: p }, h, p);
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: h, name: y, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        h,
        p
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: h, name: y, moduleId: p }, h, p);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: h, name: y, moduleId: p }, h, p);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: h, name: y, moduleId: p }, h, p);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: h, name: y, moduleId: p }, h, p);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: h, name: y, moduleId: p }, h, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      c({ kind: "add-notification", id: h, name: y, moduleId: p }, h, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      c({ kind: "add-document", id: h, name: y, moduleId: p }, h, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: h, name: y, moduleId: p }, h, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const T = (this.model.aggregates ?? []).find((b) => b.id === p);
      c({ kind: "add-read-model", id: h, name: y, aggregateId: p }, h, (T == null ? void 0 : T.moduleId) ?? p);
    } else if (e === "api-operation") {
      const T = (this.model.apis ?? []).find((D) => D.id === p), b = new Set(((T == null ? void 0 : T.operations) ?? []).map((D) => D.id));
      let w = y, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      for (let D = 2; b.has(P); D++)
        w = `${n.label} ${D}`, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      c({ kind: "add-api-operation", apiId: p, id: P, name: w }, P, p), a.nodes.some(
        (D) => D.parentId === p && (D.kind === "api-operation" || D.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(T == null ? void 0 : T.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const T = this.model.modules.flatMap((U) => U.useCases ?? []).find((U) => U.id === p), b = new Set((T == null ? void 0 : T.stepIds) ?? []);
      let w = y, P = `step-${ne(w)}`;
      for (let U = 2; b.has(P); U++)
        w = `${n.label} ${U}`, P = `step-${ne(w)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: P, name: w }, P, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(T == null ? void 0 : T.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: h, name: y, moduleId: p }, h, p) : e === "external-table" ? c({ kind: "add-external-table", id: h, name: y, moduleId: p }, h, p) : e === "mcp-server" && c({ kind: "add-mcp-server", id: h, name: y, moduleId: p }, h, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var y;
    const s = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (s) {
      const m = (this.model.modelMappings ?? []).find((u) => u.id === e);
      if (m) {
        this.command({
          kind: "set-page-button",
          pageId: s[1],
          useCaseId: s[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${m.name}` });
        return;
      }
      const r = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (r) {
        if (e === s[2]) return;
        const u = (this.model.pages ?? []).find((_) => _.id === s[1]), f = ((u == null ? void 0 : u.buttons) ?? []).find((_) => _.useCaseId === s[2]);
        if (!f) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((_) => _.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] }, !1), this.command(
          { kind: "add-page-button", pageId: s[1], useCaseId: e, label: f.label, type: f.bar },
          !1
        ), f.mappingId && this.command(
          { kind: "set-page-button", pageId: s[1], useCaseId: e, label: null, mappingId: f.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: s[1], useCaseId: e },
          { kind: "add-page-button", pageId: s[1], useCaseId: s[2], label: f.label, type: f.bar },
          ...f.mappingId ? [{ kind: "set-page-button", pageId: s[1], useCaseId: s[2], label: null, mappingId: f.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${r.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const n = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const m = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!m) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const r = (this.model.pages ?? []).find((u) => u.id === n[1]);
      if (((r == null ? void 0 : r.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: n[1], useCaseId: e, type: n[2] }), this.emit("modux-notice", { message: `Botón de ${m.name} en la barra ${n[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const o = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, a = o ? o[1] : t && (this.model.pages ?? []).some((m) => m.id === t) ? t : null;
    if (!a) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const l = o ? ((y = this.componentIn(a, o[2])) == null ? void 0 : y.node) ?? null : null, c = this.model.modules.flatMap((m) => m.useCases ?? []).find((m) => m.id === e);
    if (c) {
      (l == null ? void 0 : l.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: l.id, useCaseId: e, label: l.label ?? c.name }), this.emit("modux-notice", { message: `El botón lanza ${c.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${c.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((m) => m.id === e);
    if (p) {
      (l == null ? void 0 : l.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: l.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((m) => m.id === e);
    if (g && (l == null ? void 0 : l.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: l.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const h = this.model.modules.flatMap((m) => (m.queryServices ?? []).flatMap((r) => (r.operations ?? []).map((u) => ({ op: u, qs: r })))).find(({ op: m }) => m.id === e);
    if (h) {
      (l == null ? void 0 : l.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: l.id,
        queryOperationId: h.op.id,
        queryServiceId: h.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: h.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${h.op.name}` });
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
    const a = this._view, l = this.sceneFor(a), c = l.nodes.find((y) => y.id === e);
    if (!c) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const y = this.viewLayout(a);
        this.writeViewLayout(a, {
          ...y,
          nodes: { ...y.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(a), g = c.parentId ? l.nodes.find((y) => y.id === c.parentId) : void 0, h = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(a, { ...p, nodes: { ...p.nodes, [e]: h } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Y.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
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
                ${Y.PALETTE_GROUPS.map((s) => {
      const n = t.filter((o) => o.group === s);
      return n.length ? E`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (o) => E`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${ht[o.symbol]}
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
                            ${ht[s.symbol]}
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
    var t, i, s, n, o, a, l;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const c = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ne(e)}`, name: e, moduleId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), g = this._newTriggerEvent.trim();
        if (!c || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const c = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!c) return;
        this.command({
          kind: "add-process",
          id: `proc-${ne(e)}`,
          name: e,
          moduleId: c,
          triggerAggregateId: this._newTriggerAggId || ((l = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : l.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? mo(i, t.nodes) : e === "flows" ? bo(i, t.nodes) : e === "processes" ? un(i, t.nodes) : e === "workflows" ? Tl(i, t.nodes) : e === "ui" ? Ul(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? Bl(i, t.nodes) : e === "eventstorming" ? $l(i, t.nodes) : oo(
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
    var c;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), n = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, a = await Vl(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), l = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: l.sizes }), await this.updateComplete, (c = this.renderRoot.querySelector("modux-canvas")) == null || c.fit();
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
              <option value="view:mappings" ?selected=${this._view === "mappings"}>Mapeados</option>
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
        ${tc.map(
      (s) => E`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${Yi[s].abbr}</span>
              <span class="name">${Yi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Y.styles = wt`
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
Y.PALETTE_GROUPS = [
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
Y.PALETTE_NEW = [
  { type: "module", label: "Contexto", symbol: "component", color: "#94a3b8", group: "Estratégico" },
  { type: "actor", label: "Actor", symbol: "person", color: "#64748b", group: "Estratégico" },
  { type: "external-system", label: "Sistema externo", symbol: "component", color: "#64748b", group: "Estratégico" },
  { type: "identity-provider", label: "IdP (identidad)", symbol: "key", color: "#ca8a04", group: "Estratégico" },
  { type: "ai-agent", label: "Agente IA", symbol: "robot", color: "#9333ea", group: "IA" },
  { type: "external-ai-agent", label: "Agente IA externo", symbol: "robot", color: "#9333ea", group: "IA" },
  { type: "mcp-gateway", label: "Gateway MCP", symbol: "plug", color: "#7c3aed", group: "IA" },
  { type: "rag", label: "RAG", symbol: "lens", color: "#0e7490", group: "IA" },
  { type: "api", label: "API", child: !0, symbol: "interface", color: "#4f46e5", group: "APIs" },
  { type: "proxy-api", label: "Proxy API", symbol: "interface", color: "#0e7490", group: "APIs" },
  { type: "workflow", label: "Workflow", symbol: "process", color: "#6d28d9", group: "Orquestación" },
  { type: "workflow-step", label: "Paso de workflow", child: !0, symbol: "gear", color: "#6d28d9", group: "Orquestación" },
  { type: "etl-flow", label: "Flujo ETL (integrador)", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
  { type: "etl-transform", label: "Transformación ETL", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
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
  { type: "notification", label: "Notificación", child: !0, symbol: "event", color: "#db2777", group: "Dominio" },
  { type: "document", label: "Documento/Informe", child: !0, symbol: "readmodel", color: "#475569", group: "Dominio" },
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
ee([
  ae({ attribute: !1 })
], Y.prototype, "model", 2);
ee([
  ae({ attribute: !1 })
], Y.prototype, "layout", 2);
ee([
  ae({ attribute: !1 })
], Y.prototype, "diff", 2);
ee([
  F()
], Y.prototype, "_view", 2);
ee([
  F()
], Y.prototype, "_detail", 2);
ee([
  F()
], Y.prototype, "_relationType", 2);
ee([
  F()
], Y.prototype, "_relationPicker", 2);
ee([
  F()
], Y.prototype, "_extDepPicker", 2);
ee([
  F()
], Y.prototype, "_selectedId", 2);
ee([
  F()
], Y.prototype, "_paletteOpen", 2);
ee([
  F()
], Y.prototype, "_paletteFilter", 2);
ee([
  F()
], Y.prototype, "_paletteTab", 2);
ee([
  F()
], Y.prototype, "_selectedCmp", 2);
ee([
  F()
], Y.prototype, "_fullscreen", 2);
ee([
  F()
], Y.prototype, "_tilt", 2);
ee([
  F()
], Y.prototype, "_helpOpen", 2);
ee([
  F()
], Y.prototype, "_newName", 2);
ee([
  F()
], Y.prototype, "_newModuleId", 2);
ee([
  F()
], Y.prototype, "_newArchetype", 2);
ee([
  F()
], Y.prototype, "_newTriggerAggId", 2);
ee([
  F()
], Y.prototype, "_newTriggerEvent", 2);
ee([
  F()
], Y.prototype, "_newTargetId", 2);
ee([
  F()
], Y.prototype, "_undoStack", 2);
ee([
  F()
], Y.prototype, "_redoStack", 2);
ee([
  F()
], Y.prototype, "_newStepName", 2);
ee([
  F()
], Y.prototype, "_newStepType", 2);
ee([
  F()
], Y.prototype, "_newStepRole", 2);
ee([
  F()
], Y.prototype, "_newStepDeadline", 2);
ee([
  F()
], Y.prototype, "_editStepRole", 2);
ee([
  F()
], Y.prototype, "_editStepDeadline", 2);
ee([
  F()
], Y.prototype, "_editStepComp", 2);
ee([
  F()
], Y.prototype, "_newStepUseCase", 2);
ee([
  F()
], Y.prototype, "_newStepEmits", 2);
ee([
  F()
], Y.prototype, "_editStepUseCase", 2);
ee([
  F()
], Y.prototype, "_editStepEmits", 2);
ee([
  F()
], Y.prototype, "_editStepAwaits", 2);
ee([
  F()
], Y.prototype, "_multi", 2);
ee([
  F()
], Y.prototype, "_newViewName", 2);
ee([
  F()
], Y.prototype, "_activeViewId", 2);
ee([
  F()
], Y.prototype, "_newRagSourceType", 2);
ee([
  F()
], Y.prototype, "_newRagSourceUri", 2);
ee([
  F()
], Y.prototype, "_addMemberKey", 2);
ee([
  F()
], Y.prototype, "_treeOpen", 2);
ee([
  F()
], Y.prototype, "_deletePicker", 2);
Y = ee([
  xt("modux-editor")
], Y);
var oc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, Ce = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ac(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && oc(t, i, n), n;
};
let Ie = class extends Le {
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
    ], t = (s) => Ie.TYPE_LABELS[s] ?? s;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: o, cls: a }) => {
      const l = this._diff.changes.filter((c) => c.kind === s);
      return l.length ? E`
            <div class="diff-group">${n} (${l.length})</div>
            ${l.map(
        (c) => E`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${o}</span>
                  <span class="diff-type">${t(c.type)}</span>
                  <span class="diff-name" title=${c.id}>${c.name ?? c.id}</span>
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
    var n, o, a;
    const i = (n = this._workspace) == null ? void 0 : n.current;
    await this.trackWrite(async () => {
      var l;
      try {
        const c = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!c.ok) {
          let p = `El servidor rechazó la operación (${c.status})`;
          try {
            const g = await c.json();
            g != null && g.message && (p = g.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        this._workspace = await c.json(), await this.reload(), await this.refreshDiff(), (l = this.renderRoot.querySelector("modux-editor")) == null || l.clearHistory();
      } catch (c) {
        this.showToast(String(c));
      }
    });
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const l = ((a = this._workspace.solutions.find((c) => c.branch === s)) == null ? void 0 : a.name) ?? s.replace(/^solution\//, "");
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
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!a.ok) {
          let g = `El servidor rechazó el contrato (${a.status})`;
          try {
            const h = await a.json();
            h != null && h.message && (g = h.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: l } = await a.json(), c = n ? { kind: "set-api-publisher", id: l, targetId: n } : o ? { kind: "add-api-implementation", apiId: l, moduleId: o } : null;
        c && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(c)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${l}`, "info");
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
Ie.styles = wt`
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
Ie.TYPE_LABELS = {
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
Ce([
  ae()
], Ie.prototype, "base", 2);
Ce([
  F()
], Ie.prototype, "_model", 2);
Ce([
  F()
], Ie.prototype, "_layout", 2);
Ce([
  F()
], Ie.prototype, "_error", 2);
Ce([
  F()
], Ie.prototype, "_saving", 2);
Ce([
  F()
], Ie.prototype, "_toast", 2);
Ce([
  F()
], Ie.prototype, "_workspace", 2);
Ce([
  F()
], Ie.prototype, "_creatingSolution", 2);
Ce([
  F()
], Ie.prototype, "_newSolutionName", 2);
Ce([
  F()
], Ie.prototype, "_diff", 2);
Ce([
  F()
], Ie.prototype, "_diffListOpen", 2);
Ce([
  F()
], Ie.prototype, "_mergeFlow", 2);
Ie = Ce([
  xt("modux-editor-connected")
], Ie);
export {
  rc as CONTAINER_HEADER,
  dc as CONTAINER_INSET,
  me as ModuxCanvas,
  Y as ModuxEditor,
  Ie as ModuxEditorConnected,
  mo as aggregatesScene,
  it as apiImplNodeId,
  tt as apiOpOccurrenceId,
  Di as containerFit,
  Ks as containerMinSize,
  oo as contextMapScene,
  io as flowCoherence,
  bo as flowsScene,
  Zt as normalizeViewLayout,
  un as processesScene,
  to as relationEdgeId,
  Ki as resolveOverlaps
};
