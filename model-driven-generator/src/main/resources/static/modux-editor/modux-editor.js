const tp = 34, ip = 10;
function Bi(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let s = 0; s < e.length; s++)
      for (let l = s + 1; l < e.length; l++) {
        const r = e[s], p = e[l], g = i.get(r.id), y = i.get(p.id), f = y.x - g.x, h = y.y - g.y, x = (r.w + p.w) / 2 + t - Math.abs(f), d = (r.h + p.h) / 2 + t - Math.abs(h);
        if (!(x <= 0 || d <= 0))
          if (a = !0, x < d) {
            const c = (f >= 0 ? 1 : -1) * x / 2;
            g.x -= c, y.x += c;
          } else {
            const c = (h >= 0 ? 1 : -1) * d / 2;
            g.y -= c, y.y += c;
          }
      }
    if (!a) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = i.get(o.id);
    (Math.abs(a.x - o.x) > 0.5 || Math.abs(a.y - o.y) > 0.5) && n.set(o.id, a);
  }
  return n;
}
function Na(e, t = { w: 160, h: 90 }) {
  let i = t.w, n = t.h;
  for (const o of e)
    i = Math.max(i, 2 * (Math.abs(o.dx) + o.w / 2 + 10)), n = Math.max(
      n,
      2 * (34 + o.h / 2 - o.dy),
      // child's top edge below the header band
      2 * (10 + o.h / 2 + o.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: n };
}
function Ai(e, t, i) {
  let n = t.w / 2, o = t.w / 2, a = t.h / 2, s = t.h / 2;
  for (const l of i)
    n = Math.max(n, -l.dx + l.w / 2 + 10), o = Math.max(o, l.dx + l.w / 2 + 10), a = Math.max(a, -l.dy + l.h / 2 + 34), s = Math.max(s, l.dy + l.h / 2 + 10);
  return {
    x: e.x + (o - n) / 2,
    y: e.y + (s - a) / 2,
    w: n + o,
    h: a + s
  };
}
function pi(e) {
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
const Ra = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ln = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, La = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ge = 168, Ye = 56;
function mt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ut(e, t) {
  return `apiop:${e}@${t}`;
}
const Dn = { compact: 0, coarse: 1, full: 2 };
function zn(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", o = e ? n : t;
  return { form: o, collapsed: Dn[e ? t : n] > Dn[o] };
}
function Oo(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: mt(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const No = 34, Ro = 14, Da = 14, _e = 108, xe = 32, xn = 12, Pi = 10, at = 2, Lo = at * _e + (at - 1) * xn + 2 * Ro;
function za(e, t) {
  return `rel:${e}->${t}`;
}
function Ua(e, t) {
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
const cn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Ti = {
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
  document: { symbol: "readmodel", fill: "#f8fafc", stroke: "#475569" },
  "ui-app": { symbol: "component", fill: "#f0f9ff", stroke: "#0ea5e9" }
}, Qt = {
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
  document: "Documento/informe — plantilla rellenada por un modelo, o dataset de una consulta",
  "ui-app": "App — la UI de este bounded context (sus páginas se detallan en la vista UI)"
};
function Oi(e) {
  const t = Math.max(1, Math.ceil(e / at)), i = t * xe + (t - 1) * Pi;
  return { w: Lo, h: No + i + Da };
}
function Ct(e, t) {
  const i = e % at, n = Math.floor(e / at);
  return {
    x: -t.w / 2 + Ro + i * (_e + xn) + _e / 2,
    y: -t.h / 2 + No + n * (xe + Pi) + xe / 2
  };
}
function Do(e, t) {
  return [
    ...(e.aggregates ?? []).filter((i) => i.moduleId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "use-case", policy: i.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "query-service" })
    ),
    ...(t.scheduledTriggers ?? []).map(
      (i) => ({ id: i.id, name: i.name, kind: "scheduled-trigger" })
    ),
    ...(e.etlFlows ?? []).filter((i) => i.ownerModuleId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "etl-flow" })),
    ...(e.notifications ?? []).filter((i) => i.ownerModuleId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "notification" })),
    ...(e.documents ?? []).filter((i) => i.ownerModuleId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "document" })),
    ...(e.uiApps ?? []).filter((i) => (t.uiAppIds ?? []).includes(i.id)).map((i) => ({ id: i.id, name: i.name, kind: "ui-app" }))
  ];
}
function qa(e, t, i, n, o, a, s = !1) {
  const l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Oo(e, t.id),
    ...Do(e, t)
  ];
  if (!l.length)
    return [{ ...n, x: i.x, y: i.y, w: Ge, h: Ye }];
  if (s) {
    const r = new Map((e.apis ?? []).map((g) => [g.id, g])), p = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && r.has(g.apiId)).map((g) => {
      const y = r.get(g.apiId);
      return {
        id: mt(g.apiId, g.moduleId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((f) => ({
          id: ut(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (p.length > 0) {
      const g = l.filter((y) => y.kind !== "api-impl");
      return zo(i, n, p, g, o, a);
    }
  }
  return Ht(i, n, l, o, a);
}
function zo(e, t, i, n, o, a, s = /* @__PURE__ */ new Set()) {
  const l = a[t.id] ?? Oi(i.length + n.length), r = i.map((h, x) => {
    const d = o[h.id] ?? Ct(x, l), c = s.has(h.id) ? [] : h.ops, m = a[h.id] ?? Oi(c.length), k = c.map((C, L) => o[C.id] ?? Ct(L, m)), b = Ai(
      { x: d.x, y: d.y },
      m,
      k.map((C) => ({ dx: C.x, dy: C.y, w: _e, h: xe }))
    );
    return { a: h, off: d, ops: c, opOffs: k, fit: b };
  }), p = n.map(
    (h, x) => o[h.id] ?? Ct(i.length + x, l)
  ), g = Bi(
    [
      ...r.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, x) => ({
        id: h.id,
        x: p[x].x,
        y: p[x].y,
        w: _e,
        h: xe
      }))
    ],
    24
  );
  for (const h of r) {
    const x = g.get(h.a.id);
    x && (h.off = { x: h.off.x + (x.x - h.fit.x), y: h.off.y + (x.y - h.fit.y) }, h.fit = { ...h.fit, x: x.x, y: x.y });
  }
  n.forEach((h, x) => {
    const d = g.get(h.id);
    d && (p[x] = { x: d.x, y: d.y });
  });
  const y = Ai(e, l, [
    ...r.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: _e, h: xe }))
  ]), f = [
    { ...t, x: y.x, y: y.y, w: y.w, h: y.h, container: !0 }
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
      collapsible: h.a.ops.length > 0 || s.has(h.a.id),
      collapsed: s.has(h.a.id),
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((x, d) => {
      f.push({
        id: x.id,
        label: x.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[d].x,
        y: e.y + h.off.y + h.opOffs[d].y,
        w: _e,
        h: xe,
        tooltip: `${Qt[h.a.opKind]}: ${x.name}`
      });
    });
  return n.forEach((h, x) => {
    const d = Ti[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[x].x,
      y: e.y + p[x].y,
      w: _e,
      h: xe,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${Qt[h.kind]} ${h.name}`
    });
  }), f;
}
const Fa = [
  { key: "dominio", label: "dominio", fill: "#f5f3ff", kinds: ["aggregate", "domain-event", "domain-service"] },
  {
    key: "aplicacion",
    label: "aplicación",
    fill: "#ecfeff",
    kinds: ["use-case", "application-event", "query-service", "read-model"]
  },
  {
    key: "infraestructura",
    label: "infraestructura",
    fill: "#f8fafc",
    kinds: ["scheduled-trigger", "etl-flow", "notification", "document", "ui-app"]
  }
], Un = 20, qn = 28, Vt = 10, zt = Lo + 2 * Vt;
function Ba(e, t, i, n, o, a, s = /* @__PURE__ */ new Set()) {
  const l = Do(e, t), r = new Map(l.map((b) => [b.id, b])), p = (e.codeModules ?? []).filter((b) => b.moduleId === t.id), g = new Set(p.flatMap((b) => b.elementIds ?? [])), f = p.some((b) => s.has(b.id)) ? l.filter((b) => !g.has(b.id)) : [], h = a[n.id] ?? Oi(p.length + f.length), x = p.map((b, C) => {
    const L = s.has(b.id), R = L ? (b.elementIds ?? []).map((E) => r.get(E)).filter((E) => !!E) : [], z = L ? Fa.map((E) => {
      const H = R.filter((I) => E.kinds.includes(I.kind)), ne = Math.ceil(H.length / at), te = Un + (ne ? ne * xe + (ne - 1) * Pi + 8 : 8);
      return { layer: E, chips: H, rows: ne, h: te };
    }) : [], W = L ? qn + z.reduce((E, H) => E + H.h, 0) + Vt : 56, w = o[b.id] ?? Ct(C, h);
    return { cm: b, expanded: L, bands: z, boxH: W, off: w };
  }), d = f.map(
    (b, C) => o[b.id] ?? Ct(x.length + C, h)
  ), c = Bi(
    [
      ...x.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: zt, h: b.boxH })),
      ...f.map((b, C) => ({ id: b.id, x: d[C].x, y: d[C].y, w: _e, h: xe }))
    ],
    24
  );
  for (const b of x) {
    const C = c.get(b.cm.id);
    C && (b.off = { x: C.x, y: C.y });
  }
  f.forEach((b, C) => {
    const L = c.get(b.id);
    L && (d[C] = { x: L.x, y: L.y });
  });
  const m = Ai(i, h, [
    ...x.map((b) => ({ dx: b.off.x, dy: b.off.y, w: zt, h: b.boxH })),
    ...d.map((b) => ({ dx: b.x, dy: b.y, w: _e, h: xe }))
  ]), k = [
    { ...n, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const b of x) {
    const C = i.x + b.off.x, L = i.y + b.off.y;
    if (k.push({
      id: b.cm.id,
      label: b.cm.name,
      kind: "code-module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      collapsible: !0,
      collapsed: !b.expanded,
      parentId: n.id,
      x: C,
      y: L,
      w: zt,
      h: b.boxH,
      tooltip: b.expanded ? `${b.cm.name} — módulo desplegado: arrastra el asa de un elemento suelto hasta él para empaquetarlo; el chevron lo pliega` : `${b.cm.name} — módulo: el chevron lo abre para ver y empaquetar su contenido`
    }), !b.expanded) continue;
    let R = -b.boxH / 2 + qn;
    for (const z of b.bands) {
      const W = `hexlayer:${b.cm.id}:${z.layer.key}`;
      k.push({
        id: W,
        label: z.layer.label,
        kind: "hex-layer",
        fill: z.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: b.cm.id,
        x: C,
        y: L + R + z.h / 2,
        w: zt - 2 * Vt,
        h: z.h,
        tooltip: `Capa de ${z.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), z.chips.forEach((w, E) => {
        const H = E % at, ne = Math.floor(E / at), te = w.policy ? cn : Ti[w.kind];
        k.push({
          id: w.id,
          label: w.name,
          kind: w.kind,
          x: C - (zt - 2 * Vt) / 2 + Vt + H * (_e + xn) + _e / 2,
          y: L + R + Un + ne * (xe + Pi) + xe / 2,
          w: _e,
          h: xe,
          symbol: te.symbol,
          fill: te.fill,
          stroke: te.stroke,
          parentId: W,
          tooltip: `${w.policy ? "Policy" : Qt[w.kind]} ${w.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), R += z.h;
    }
  }
  return f.forEach((b, C) => {
    const L = b.policy ? cn : Ti[b.kind];
    k.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + d[C].x,
      y: i.y + d[C].y,
      w: _e,
      h: xe,
      symbol: L.symbol,
      fill: L.fill,
      stroke: L.stroke,
      parentId: n.id,
      tooltip: `${b.policy ? "Policy" : Qt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), k;
}
function Ht(e, t, i, n, o) {
  const a = o[t.id] ?? Oi(i.length), s = i.map((y, f) => n[y.id] ?? Ct(f, a)), l = Bi(
    i.map((y, f) => ({ id: y.id, x: s[f].x, y: s[f].y, w: _e, h: xe })),
    10
  );
  i.forEach((y, f) => {
    const h = l.get(y.id);
    h && (s[f] = { x: h.x, y: h.y });
  });
  const r = Ai(
    e,
    a,
    s.map((y) => ({ dx: y.x, dy: y.y, w: _e, h: xe }))
  ), p = {
    ...t,
    x: r.x,
    y: r.y,
    w: r.w,
    h: r.h,
    container: !0
  }, g = i.map((y, f) => {
    const h = s[f], x = y.policy ? cn : Ti[y.kind];
    return {
      id: y.id,
      label: y.name,
      kind: y.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: _e,
      h: xe,
      symbol: x.symbol,
      fill: x.fill,
      stroke: x.stroke,
      parentId: t.id,
      tooltip: `${y.policy ? "Policy" : Qt[y.kind]} ${y.name}`
    };
  });
  return [p, ...g];
}
function Wa(e, t, i = "contexts", n = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", s = i === "contexts", l = a || s, r = o, p = i !== "contexts", g = i === "operations", y = new Set(e.externalSystems.map((u) => u.id)), f = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && y.has(u.publishedByExternalSystemId)
  ), h = new Set(f.map((u) => u.id)), x = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && y.has(u.publishedByExternalSystemId)
  ), d = new Set(x.map((u) => u.id)), c = [
    ...e.modules.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...l ? [] : (e.apis ?? []).filter((u) => !h.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...l ? [] : (e.proxyApis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...l ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...l ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerModuleId).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(s ? [] : e.identityProviders ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], m = c.flatMap((u, O) => {
    const F = t[u.ref.id] ?? dt(O, c.length);
    if ("idp" in u && u.idp) {
      const K = u.ref, ce = !!K.publishedByExternalSystemId;
      return [{
        id: K.id,
        label: K.name,
        kind: "identity-provider",
        symbol: "key",
        fill: ce ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: ce,
        badge: K.type ?? "IDP",
        tooltip: `${K.name} — emite las identidades que el sistema confía${ce ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: F.x,
        y: F.y,
        w: Ge,
        h: Ye
      }];
    }
    if ("etl" in u && u.etl) {
      const K = u.ref;
      return [{
        id: K.id,
        label: K.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${K.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: F.x,
        y: F.y,
        w: Ge,
        h: Ye
      }];
    }
    if ("workflow" in u && u.workflow) {
      const K = u.ref;
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
        x: F.x,
        y: F.y,
        w: Ge,
        h: Ye
      }];
    }
    if (u.proxy) {
      const K = u.ref, ce = {
        id: K.id,
        label: K.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${K.name} — proxy/cache de una API, consumible como ella`
      };
      if (g && K.targetApiId) {
        const Xe = (e.apis ?? []).find((_t) => _t.id === K.targetApiId), Qe = (Xe == null ? void 0 : Xe.operations) ?? [];
        if (Qe.length > 0)
          return Ht(
            F,
            ce,
            Qe.map((_t) => ({
              id: ut(_t.id, K.id),
              name: _t.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ce, x: F.x, y: F.y, w: Ge, h: Ye }];
    }
    if (u.api) {
      const K = u.ref, ce = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(K.id) ? !p : p) && K.operations.length > 0 ? Ht(
        F,
        { ...ce, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (Qe) => ({ id: Qe.id, name: Qe.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ce,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: F.x,
        y: F.y,
        w: Ge,
        h: Ye
      }];
    }
    if (u.external) {
      const K = u.ref, ce = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: K.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: K.referencedRepositoryId ? `${K.name} — otro proyecto modux (repositorio ${K.referencedRepositoryId}), referenciado del catálogo` : `${K.name} (sistema externo)`
      }, Xe = f.filter((fe) => fe.publishedByExternalSystemId === K.id), Qe = x.filter((fe) => fe.publishedByExternalSystemId === K.id), _t = Qe.map(
        (fe) => ({ id: fe.id, name: fe.name, kind: "proxy-api" })
      ), Yi = [
        ...(K.useCases ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "mcp-server" })
        )
      ], ji = Xe.length > 0 || Qe.length > 0, Ki = ji || Yi.length > 0, { form: li, collapsed: Xi } = zn(
        o.has(K.id),
        // Deployment is topology: external systems join compact, like the modules.
        a ? "compact" : p ? "full" : ji ? "coarse" : "compact",
        Yi.length > 0 || g && ji
      ), Nn = [
        ..._t,
        ...li === "full" ? Yi : []
      ], Qi = g && li === "full" ? Qe.filter((fe) => {
        const Lt = fe.targetApiId ? (e.apis ?? []).find((Ee) => Ee.id === fe.targetApiId) : void 0;
        return ((Lt == null ? void 0 : Lt.operations) ?? []).length > 0;
      }) : [];
      if (g && li === "full" && (Xe.length > 0 || Qi.length > 0)) {
        const fe = [
          ...Xe.map((Ee) => ({
            id: Ee.id,
            name: Ee.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${Ee.name} — API publicada por ${K.name}`,
            opKind: "api-operation",
            ops: (Ee.operations ?? []).map((Dt) => ({ id: Dt.id, name: Dt.name }))
          })),
          ...Qi.map((Ee) => {
            const Dt = (e.apis ?? []).find((ci) => ci.id === Ee.targetApiId);
            return {
              id: Ee.id,
              name: Ee.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${Ee.name} — proxy/cache de ${Dt.name}`,
              opKind: "api-op-occurrence",
              ops: (Dt.operations ?? []).map((ci) => ({
                id: ut(ci.id, Ee.id),
                name: ci.name
              }))
            };
          })
        ], Lt = new Set(Qi.map((Ee) => Ee.id));
        return zo(
          F,
          { ...ce, collapsible: !0, collapsed: Xi },
          fe,
          Nn.filter((Ee) => !Lt.has(Ee.id)),
          t,
          n,
          r
        );
      }
      const Rn = li === "compact" ? [] : [
        ...Xe.map((fe) => ({ id: fe.id, name: fe.name, kind: "api" })),
        ...Nn
      ];
      return Rn.length > 0 ? Ht(
        F,
        { ...ce, collapsible: Ki, collapsed: Xi },
        Rn,
        t,
        n
      ) : [{
        ...ce,
        collapsible: Ki,
        collapsed: Ki && Xi,
        x: F.x,
        y: F.y,
        w: Ge,
        h: Ye
      }];
    }
    const Q = u.ref, j = Q.subdomainType ?? "GENERIC", me = {
      id: Q.id,
      label: Q.name,
      kind: "module",
      symbol: "component",
      fill: Ra[j],
      stroke: "#94a3b8",
      badge: j,
      tooltip: `${Q.name} — subdominio ${j}`
    }, qe = Oo(e, Q.id), Nt = (e.aggregates ?? []).some((K) => K.moduleId === Q.id) || (Q.useCases ?? []).length > 0 || (Q.domainEvents ?? []).length > 0 || (Q.applicationEvents ?? []).length > 0 || (Q.readModels ?? []).length > 0 || (Q.domainServices ?? []).length > 0 || (Q.queryServices ?? []).length > 0 || (Q.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerModuleId === Q.id) || (e.notifications ?? []).some((K) => K.ownerModuleId === Q.id) || (e.documents ?? []).some((K) => K.ownerModuleId === Q.id), rt = Nt || qe.length > 0, { form: Rt, collapsed: kt } = zn(
      o.has(Q.id),
      p ? "full" : qe.length > 0 ? "coarse" : "compact",
      Nt
    );
    return a ? Ba(
      e,
      Q,
      F,
      { ...me, collapsible: !1, collapsed: !1 },
      t,
      n,
      o
    ) : Rt === "full" && rt ? qa(
      e,
      Q,
      F,
      { ...me, collapsible: !0, collapsed: kt },
      t,
      n,
      g
    ) : Rt === "coarse" && qe.length > 0 ? Ht(
      F,
      { ...me, collapsible: rt, collapsed: kt },
      qe,
      t,
      n
    ) : [{
      ...me,
      collapsible: rt,
      collapsed: rt && kt,
      x: F.x,
      y: F.y,
      w: Ge,
      h: Ye
    }];
  }), k = l ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, b = c.length + k.actors.length + k.aiAgents.length + k.rags.length + k.mcpGateways.length;
  k.actors.forEach((u, O) => {
    const F = t[u.id] ?? dt(c.length + O, b);
    m.push({
      id: u.id,
      label: u.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), k.aiAgents.forEach((u, O) => {
    const F = t[u.id] ?? dt(c.length + (e.actors ?? []).length + O, b);
    m.push({
      id: u.id,
      label: u.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: u.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!u.external,
      badge: u.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: u.external ? `${u.name} (agente de IA externo — entra por un gateway MCP)` : `${u.name} (agente de IA — consume por MCP)`
    });
  }), k.mcpGateways.forEach((u, O) => {
    const F = t[u.id] ?? dt(
      c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      b
    );
    m.push({
      id: u.id,
      label: u.name,
      x: F.x,
      y: F.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${u.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const C = [];
  if (k.rags.forEach((u, O) => {
    const F = t[u.id] ?? dt(
      c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      b
    );
    m.push({
      id: u.id,
      label: u.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((Q, j) => {
      const me = `ragcs:${u.id}:${Q.uri}`, qe = t[me] ?? { x: F.x + 170, y: F.y - 30 + j * 44 };
      m.push({
        id: me,
        label: Q.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: qe.x,
        y: qe.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: Q.type,
        tooltip: `${Q.type}: ${Q.uri}`
      }), C.push({
        id: `ragcse:${u.id}:${Q.uri}`,
        sourceId: me,
        targetId: u.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), a) {
    const u = e.services ?? [];
    u.forEach((F, Q) => {
      const j = t[F.id] ?? dt(c.length + Q, c.length + u.length);
      m.push({
        id: F.id,
        label: F.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${F.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: j.x,
        y: j.y,
        w: Ge,
        h: Ye
      });
    });
    const O = [];
    [...new Set(u.filter((F) => F.database).map((F) => F.database))].forEach((F) => O.push({
      id: `infra-db:${F}`,
      label: F,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${F} — la usan los servicios que declaran database=${F}`
    })), u.some((F) => F.outboxEnabled) && O.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && O.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && O.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), O.forEach((F, Q) => {
      const j = t[F.id] ?? dt(
        c.length + u.length + Q,
        c.length + u.length + O.length
      );
      m.push({
        id: F.id,
        label: F.label,
        kind: "infrastructure",
        symbol: F.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: F.badge,
        tooltip: F.tooltip,
        x: j.x,
        y: j.y,
        w: Ge,
        h: Ye
      });
    });
  }
  m.sort((u, O) => (u.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const L = e.relations.map((u) => ({
    id: za(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? Ln[u.type] : u.inferredType ? `≈${Ln[u.inferredType]}` : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : u.inferredType ? `≈ ${u.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), R = e.flows.map((u) => {
    var qe, Nt, rt, Rt, kt, K;
    const O = Ua(e, u), F = p ? e.modules.find((ce) => ce.id === u.sourceId) : void 0, Q = ((qe = F == null ? void 0 : F.domainEvents) == null ? void 0 : qe.find((ce) => ce.name === u.triggerEvent)) ?? ((Nt = F == null ? void 0 : F.applicationEvents) == null ? void 0 : Nt.find((ce) => ce.name === u.triggerEvent)), j = p && u.readModelName ? (Rt = (rt = e.modules.find((ce) => ce.id === u.targetId)) == null ? void 0 : rt.readModels) == null ? void 0 : Rt.find((ce) => ce.name === u.readModelName) : void 0, me = p && u.targetUseCaseId ? (K = (kt = e.modules.find((ce) => ce.id === u.targetId)) == null ? void 0 : kt.useCases) == null ? void 0 : K.find((ce) => ce.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (Q == null ? void 0 : Q.id) ?? u.sourceId,
      targetId: (me == null ? void 0 : me.id) ?? (j == null ? void 0 : j.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: La[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${O}`
    };
  }), z = new Map((e.apis ?? []).map((u) => [u.id, u])), W = new Set(e.modules.map((u) => u.id)), w = (e.apiImplementations ?? []).filter(
    (u) => z.has(u.apiId) && W.has(u.moduleId)
  ), E = new Set(m.map((u) => u.id)), H = a ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.codeModuleIds ?? []).filter((O) => E.has(O) && E.has(u.id)).map((O) => ({
        id: `deploy:${u.id}->${O}`,
        sourceId: u.id,
        targetId: O,
        kind: "deploys",
        color: "#334155",
        dashed: !0,
        arrow: !0,
        tooltip: `desplegado en ${u.name} — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((u) => {
      const O = [];
      return u.database && E.has(`infra-db:${u.database}`) && E.has(u.id) && O.push({
        id: `infradb:${u.id}`,
        sourceId: u.id,
        targetId: `infra-db:${u.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} persiste en ${u.database}`
      }), u.outboxEnabled && E.has("infra-broker") && E.has(u.id) && O.push({
        id: `infrabroker:${u.id}`,
        sourceId: u.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} publica eventos por el outbox`
      }), O;
    })
  ] : [], ne = p ? (e.emissions ?? []).filter((u) => E.has(u.sourceId) && E.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], te = p ? (e.projections ?? []).map((u) => ({
    p: u,
    source: u.sourceAggregateId ?? u.sourceExternalUseCaseId ?? u.sourceExternalTableId
  })).filter(({ p: u, source: O }) => O && u.readModelId).filter(({ p: u, source: O }) => E.has(O) && E.has(u.readModelId)).map(({ p: u, source: O }) => ({
    id: `proj:${u.id}`,
    sourceId: O,
    targetId: u.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: u.sourceAggregateId ? `Proyección ${u.name}: el estado del agregado se materializa en ${u.readModelName ?? u.readModelId}` : `Proyección ${u.name}: polling hacia ${u.readModelName ?? u.readModelId}`
  })) : [], I = (e.apis ?? []).flatMap(
    (u) => u.operations.flatMap((O) => {
      const F = p && O.targetUseCaseId && E.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetModuleId && E.has(O.targetModuleId) ? O.targetModuleId : (O.targetUseCaseId && !p, null);
      if (!F) return [];
      const Q = p && E.has(O.id) ? O.id : u.id;
      return E.has(Q) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: Q,
          targetId: F,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${O.name} la implementa ${F}`
        }
      ] : [];
    })
  ), P = p ? (e.useCaseCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], _ = [
    ...e.modules.filter((u) => u.identityProviderId && E.has(u.id) && E.has(u.identityProviderId)).map((u) => ({
      id: `idptrust:${u.id}`,
      sourceId: u.id,
      targetId: u.identityProviderId,
      kind: "idp-trust",
      color: "#ca8a04",
      label: "valida tokens de",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} valida los tokens emitidos por este IdP — Supr lo desconfía`
    })),
    ...(e.etlFlows ?? []).filter((u) => u.identityProviderId && E.has(u.identityProviderId)).flatMap((u) => {
      const O = E.has(u.id) ? u.id : u.ownerModuleId && E.has(u.ownerModuleId) ? u.ownerModuleId : null;
      return O ? [{
        id: `idpsvc:${u.id}`,
        sourceId: O,
        targetId: u.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((u) => u.publishedByExternalSystemId && E.has(u.id) && E.has(u.publishedByExternalSystemId)).map((u) => ({
      id: `idpfed:${u.id}`,
      sourceId: u.publishedByExternalSystemId,
      targetId: u.id,
      kind: "idp-federation",
      color: "#ca8a04",
      label: "publica",
      dashed: !0,
      arrow: !0,
      tooltip: "IdP federado: lo publica este sistema externo — Supr lo vuelve propio"
    }))
  ], v = p ? e.modules.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && E.has(u.id) && E.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], S = p ? (e.aggregateCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], A = p ? (e.queryCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], $ = p ? (e.actorUses ?? []).filter((u) => E.has(u.actorId) && E.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], N = (e.actorExternalDependencies ?? []).filter((u) => E.has(u.actorId) && E.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), T = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), D = (u) => E.has(u) ? u : T.get(u) ?? u, B = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: D(u.targetId),
        cqrs: u.type === "CQRS"
      })).filter(
        (u) => E.has(u.sourceId) && E.has(u.targetId) && u.sourceId !== u.targetId
      ).map((u) => [
        `xdep:${u.sourceId}->${u.targetId}`,
        {
          id: `xdep:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "ext-dep",
          color: u.cqrs ? "#7c3aed" : "#64748b",
          label: u.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: u.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], Y = /* @__PURE__ */ new Map();
  for (const u of e.modules) {
    for (const O of u.useCases ?? []) Y.set(O.id, u.id);
    for (const O of u.domainEvents ?? []) Y.set(O.id, u.id);
    for (const O of u.applicationEvents ?? []) Y.set(O.id, u.id);
    for (const O of u.queryServices ?? []) Y.set(O.id, u.id);
  }
  const le = (u) => E.has(u) ? u : Y.get(u) ?? u, de = /* @__PURE__ */ new Map();
  for (const u of e.modules) {
    for (const O of u.domainEvents ?? []) de.set(O.name, O.id);
    for (const O of u.applicationEvents ?? []) de.set(O.name, O.id);
  }
  const q = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (u) => (u.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: u.id, targetId: le(O.targetUseCaseId) }))
      ).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `wfcall:${u.sourceId}->${u.targetId}`,
        {
          id: `wfcall:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], G = [
    ...new Map(
      (e.workflows ?? []).filter((u) => u.triggerEvent && de.has(u.triggerEvent)).map((u) => ({
        sourceId: le(de.get(u.triggerEvent)),
        targetId: u.id,
        label: u.triggerEvent
      })).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `wftrig:${u.sourceId}->${u.targetId}`,
        {
          id: `wftrig:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: u.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], pe = /* @__PURE__ */ new Map();
  for (const u of e.externalSystems)
    for (const O of u.tables ?? []) pe.set(O.id, u.id);
  const ge = (e.notifications ?? []).flatMap((u) => {
    var Q;
    const O = E.has(u.id) ? u.id : u.ownerModuleId && E.has(u.ownerModuleId) ? u.ownerModuleId : null;
    if (!O) return [];
    const F = [];
    if (u.eventId) {
      const j = E.has(u.eventId) ? u.eventId : Y.get(u.eventId);
      j && E.has(j) && j !== O && F.push({
        id: `notif:${u.id}`,
        sourceId: j,
        targetId: O,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const j of u.recipientRoleIds ?? [])
      E.has(j) && F.push({
        id: `notifto:${u.id}:${j}`,
        sourceId: O,
        targetId: j,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((Q = (u.channels ?? [])[0]) == null ? void 0 : Q.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} avisa a este rol — Supr lo quita`
      });
    return F;
  }), Fe = (e.documents ?? []).flatMap((u) => {
    const O = E.has(u.id) ? u.id : u.ownerModuleId && E.has(u.ownerModuleId) ? u.ownerModuleId : null;
    if (!O || !u.queryServiceId) return [];
    const F = E.has(u.queryServiceId) ? u.queryServiceId : Y.get(u.queryServiceId);
    return !F || !E.has(F) || F === O ? [] : [{
      id: `docq:${u.id}`,
      sourceId: F,
      targetId: O,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), $e = (e.etlFlows ?? []).flatMap(
    (u) => (u.steps ?? []).flatMap((O) => {
      const F = E.has(u.id) ? u.id : u.ownerModuleId && E.has(u.ownerModuleId) ? u.ownerModuleId : null;
      if (!F) return [];
      const Q = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!Q) return [];
      let j = Q;
      if (!E.has(j) && O.operationId && O.apiId && (j = O.apiId), !E.has(j) && O.externalTableId && (j = pe.get(O.externalTableId) ?? j), E.has(j) || (j = D(j)), E.has(j) || (j = Y.get(Q) ?? j), !E.has(j) || j === F) return [];
      const me = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${O.id}`,
        sourceId: me ? j : F,
        targetId: me ? F : j,
        kind: me ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: me ? `${u.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${u.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), V = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: E.has(O) ? O : pe.get(O) ?? O,
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `ragtbl:${u.sourceId}->${u.targetId}`,
        {
          id: `ragtbl:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "rag-table",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${u.name} indexa esta tabla`
        }
      ])
    ).values()
  ], Z = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceApiIds ?? []).map((O) => ({
          sourceId: D(O),
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `ragapi:${u.sourceId}->${u.targetId}`,
        {
          id: `ragapi:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "rag-api",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${u.name} indexa el contenido de esta API`
        }
      ])
    ).values()
  ], Se = [
    ...new Map(
      (e.rags ?? []).flatMap((u) => [
        ...(u.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name })),
        ...(u.sourceModuleIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name }))
      ]).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `ragcoarse:${u.sourceId}->${u.targetId}`,
        {
          id: `ragcoarse:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "rag-coarse",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${u.name} indexa su contenido`
        }
      ])
    ).values()
  ], Pe = [
    ...new Map(
      (e.agentApiUses ?? []).map((u) => ({ sourceId: u.agentId, targetId: D(u.apiId) })).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
        `agapi:${u.sourceId}->${u.targetId}`,
        {
          id: `agapi:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "agent-api",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume la API entera como herramienta"
        }
      ])
    ).values()
  ], Ue = (u) => u.onCompletionEventName || `${u.name.replace(/\s+/g, "")}Completado`, Te = (e.workflows ?? []).flatMap(
    (u) => u.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== u.id && Ue(O) === u.triggerEvent).filter((O) => E.has(O.id) && E.has(u.id)).map((O) => ({
      id: `wfchain:${O.id}->${u.id}`,
      sourceId: O.id,
      targetId: u.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: u.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), tt = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: D(u.id), targetId: D(u.targetApiId) })).filter(
        (u) => E.has(u.sourceId) && E.has(u.targetId) && u.sourceId !== u.targetId
      ).map((u) => [
        `pxt:${u.sourceId}->${u.targetId}`,
        {
          id: `pxt:${u.sourceId}->${u.targetId}`,
          sourceId: u.sourceId,
          targetId: u.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], xt = w.flatMap((u) => {
    const O = mt(u.apiId, u.moduleId);
    if (!E.has(O)) return [];
    const F = [];
    for (const Q of (e.proxyApis ?? []).filter((j) => j.targetApiId === u.apiId)) {
      const j = D(Q.id);
      E.has(j) && j !== O && F.push({
        id: `pxr:${j}->${O}`,
        sourceId: j,
        targetId: O,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return F;
  }), di = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const O = (e.proxyApis ?? []).find((j) => j.id === u.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const F = ut(u.operationId, u.proxyId), Q = u.targetSiteId === O.targetApiId ? O.targetApiId : mt(O.targetApiId, u.targetSiteId);
    return !E.has(F) || !E.has(Q) ? [] : [{
      id: `oproute:${F}->${Q}`,
      sourceId: F,
      targetId: Q,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ia = [
    ...new Map(
      (e.externalOperationUses ?? []).map((u) => {
        if (!E.has(u.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (me) => me.operations.some((qe) => qe.id === u.operationId)
        );
        if (!O) return null;
        const F = u.siteId === O.id, Q = F ? u.operationId : ut(u.operationId, u.siteId);
        let j = E.has(Q) ? Q : null;
        if (!j)
          if (F || (e.proxyApis ?? []).some((me) => me.id === u.siteId))
            j = D(u.siteId);
          else {
            const me = mt(O.id, u.siteId);
            j = E.has(me) ? me : u.siteId;
          }
        return !j || !E.has(j) || j === u.externalSystemId ? null : { u, target: j };
      }).filter((u) => u !== null).map((u) => [
        `extopuse:${u.u.externalSystemId}->${u.u.operationId}@${u.u.siteId}`,
        {
          id: `extopuse:${u.u.externalSystemId}->${u.u.operationId}@${u.u.siteId}`,
          sourceId: u.u.externalSystemId,
          targetId: u.target,
          kind: "ext-op-use",
          color: "#64748b",
          label: "op",
          dashed: !0,
          arrow: !0,
          tooltip: "llama a esta operación"
        }
      ])
    ).values()
  ], ba = p ? (e.apiOperationImplementations ?? []).flatMap((u) => {
    if (!E.has(u.useCaseId)) return [];
    const O = E.has(ut(u.operationId, u.moduleId)) ? ut(u.operationId, u.moduleId) : E.has(mt(u.apiId, u.moduleId)) ? mt(u.apiId, u.moduleId) : E.has(D(u.moduleId)) ? D(u.moduleId) : null;
    return O ? [{
      id: `apiimplwire:${u.operationId}@${u.moduleId}`,
      sourceId: O,
      targetId: u.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], va = p ? (e.agentUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], wa = (e.agentRags ?? []).filter((u) => E.has(u.agentId) && E.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), xa = p ? (e.rags ?? []).filter((u) => E.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((O) => E.has(O)).map((O) => ({
      id: `ragsrc:${u.id}->${O}`,
      sourceId: u.id,
      targetId: O,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], ka = p ? (e.agentExternalUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], _a = p ? (e.agentMcpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.mcpServerId)).map((u) => ({
    id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
    sourceId: u.agentId,
    targetId: u.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], $a = (e.mcpGateways ?? []).flatMap(
    (u) => [
      ...u.mcpServerIds ?? [],
      ...u.apiIds ?? [],
      ...u.apiOperationIds ?? [],
      ...u.useCaseIds ?? [],
      ...u.ragIds ?? []
    ].filter((O) => E.has(u.id) && E.has(O)).map((O) => ({
      id: `gwx:${u.id}->${O}`,
      sourceId: u.id,
      targetId: O,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Sa = (e.agentGatewayUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ea = p ? (e.agentApiOpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ca = p ? (e.agentQueryUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ma = (e.agentDelegations ?? []).filter((u) => E.has(u.agentId) && E.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Aa = (e.actorAgentUses ?? []).filter((u) => E.has(u.actorId) && E.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Pa = p ? (e.agentTriggers ?? []).filter((u) => E.has(u.eventId) && E.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ta = p ? (e.externalCalls ?? []).filter((u) => E.has(u.externalSystemId) && E.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Oa = p ? (e.externalUseCaseCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `extuccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: m,
    edges: [
      ...H,
      ...L,
      ...R,
      ...ne,
      ...te,
      ...I,
      ...P,
      ...v,
      ..._,
      ...ge,
      ...Fe,
      ...$e,
      ...S,
      ...A,
      ...$,
      ...N,
      ...B,
      ...tt,
      ...xt,
      ...di,
      ...Ia,
      ...ba,
      ...q,
      ...G,
      ...Te,
      ...Pe,
      ...V,
      ...Z,
      ...Se,
      ...va,
      ...ka,
      ..._a,
      ...$a,
      ...Sa,
      ...Ea,
      ...Ca,
      ...Ma,
      ...Aa,
      ...Pa,
      ...wa,
      ...xa,
      ...C,
      ...Ta,
      ...Oa
    ]
  };
}
const Va = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ha = 176, Ga = 60, Ya = 140, ja = 40;
function Ka(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((o, a) => {
    const s = 220 + a * 340;
    i.filter((r) => r.moduleId === o.id).forEach((r, p) => {
      const g = n.filter((f) => f.aggregateId === r.id).length, y = 140 + p * (170 + g * 60);
      t[r.id] = { x: s, y }, n.filter((f) => f.aggregateId === r.id).forEach((f, h) => {
        t[f.id] = { x: s + 60, y: y + 100 + h * 60 };
      });
    });
  }), i.filter((o) => !e.modules.some((a) => a.id === o.moduleId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function Xa(e, t) {
  const i = Ka(e), n = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, o = new Map(e.modules.map((p) => [p.id, p])), a = (e.aggregates ?? []).map((p) => {
    const g = o.get(p.moduleId), y = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", f = n(p.id);
    return {
      id: p.id,
      label: p.name,
      x: f.x,
      y: f.y,
      w: Ha,
      h: Ga,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Va[y],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${y})` : ""}`
    };
  }), s = (e.entities ?? []).map((p) => {
    const g = n(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: Ya,
      h: ja,
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
  })), r = (e.aggregateReferences ?? []).map((p, g) => ({
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
    nodes: [...a, ...s],
    edges: [...l, ...r]
  };
}
const Qa = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ja = 150, Za = 44, es = 190, ts = 56, is = 160, ns = 48;
function os(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function as(e, t) {
  const i = e.flows, n = [], o = [], a = /* @__PURE__ */ new Set(), s = (l) => {
    var r, p;
    return ((p = (r = e.aggregates) == null ? void 0 : r.find((g) => g.id === l)) == null ? void 0 : p.name) ?? l ?? "?";
  };
  return i.forEach((l, r) => {
    const p = 120 + r * 130, g = Qa[l.archetype] ?? "#475569", y = l.triggerAggregateId ?? l.sourceId;
    if (!a.has(y)) {
      a.add(y);
      const c = t[y] ?? { x: 160, y: p };
      n.push({
        id: y,
        label: l.triggerAggregateId ? s(l.triggerAggregateId) : y,
        x: c.x,
        y: c.y,
        w: Ja,
        h: Za,
        kind: l.triggerAggregateId ? "aggregate" : "module",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${l.id}`, h = t[f] ?? { x: 470, y: p };
    n.push({
      id: f,
      label: l.name,
      x: h.x,
      y: h.y,
      w: es,
      h: ts,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const x = os(e, l), d = `tgt:${x.id}`;
    if (!a.has(d)) {
      a.add(d);
      const c = t[d] ?? { x: 790, y: p };
      n.push({
        id: d,
        label: x.label,
        x: c.x,
        y: c.y,
        w: is,
        h: ns,
        kind: x.external ? "external-system" : "module",
        symbol: "component",
        fill: x.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: x.external,
        badge: x.external ? "EXTERNAL" : "MODULE"
      });
    }
    o.push({
      id: `fe:${l.id}:in`,
      sourceId: y,
      targetId: f,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${l.id}:out`,
      sourceId: f,
      targetId: d,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: n, edges: o };
}
const ss = 190, rs = 56, Ji = 170, ds = 52;
function Fn(e, t) {
  const i = [], n = [], o = (a) => {
    var s;
    return (s = e.modules.find((l) => l.id === a)) == null ? void 0 : s.name;
  };
  return (e.processes ?? []).forEach((a, s) => {
    const l = 140 + s * 240, r = t[a.id] ?? { x: 150, y: l };
    i.push({
      id: a.id,
      label: a.name,
      x: r.x,
      y: r.y,
      w: ss,
      h: rs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerModuleId) ? ` — módulo ${o(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((g, y) => {
      const f = g.type === "HUMAN", h = t[g.id] ?? { x: 150 + (y + 1) * 240, y: l };
      if (i.push({
        id: g.id,
        label: g.name,
        x: h.x,
        y: h.y,
        w: Ji,
        h: ds,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), n.push({
        id: `pe:${a.id}:${y}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: y === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const x = `comp:${g.id}`, d = t[x] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: x,
          label: g.compensationUseCaseId,
          x: d.x,
          y: d.y,
          w: Ji,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${g.id}`,
          sourceId: g.id,
          targetId: x,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = g.id;
    }), a.onCompletionEventName) {
      const g = `done:${a.id}`, y = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: l };
      i.push({
        id: g,
        label: a.onCompletionEventName,
        x: y.x,
        y: y.y,
        w: Ji,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${a.id}`,
        sourceId: p,
        targetId: g,
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
const $i = globalThis, kn = $i.ShadowRoot && ($i.ShadyCSS === void 0 || $i.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _n = Symbol(), Bn = /* @__PURE__ */ new WeakMap();
let Uo = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== _n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (kn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = Bn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Bn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ls = (e) => new Uo(typeof e == "string" ? e : e + "", void 0, _n), vt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, a) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Uo(i, e, _n);
}, cs = (e, t) => {
  if (kn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = $i.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Wn = kn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ls(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ps, defineProperty: us, getOwnPropertyDescriptor: ms, getOwnPropertyNames: fs, getOwnPropertySymbols: hs, getPrototypeOf: gs } = Object, st = globalThis, Vn = st.trustedTypes, ys = Vn ? Vn.emptyScript : "", Zi = st.reactiveElementPolyfillSupport, jt = (e, t) => e, Ni = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ys : null;
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
} }, $n = (e, t) => !ps(e, t), Hn = { attribute: !0, type: String, converter: Ni, reflect: !1, useDefault: !1, hasChanged: $n };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let St = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Hn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && us(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: a } = ms(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const l = o == null ? void 0 : o.call(this);
      a == null || a.call(this, s), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Hn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(jt("elementProperties"))) return;
    const t = gs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(jt("properties"))) {
      const i = this.properties, n = [...fs(i), ...hs(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Wn(o));
    } else t !== void 0 && i.push(Wn(t));
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
    return cs(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : Ni).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, s;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = n.getPropertyOptions(o), r = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : Ni;
      this._$Em = o;
      const p = r.fromAttribute(i, l.type);
      this[o] = p ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, a) {
    var s;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (a = this[t]), n ?? (n = l.getPropertyOptions(t)), !((n.hasChanged ?? $n)(a, i) || n.useDefault && n.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(l._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: a }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), a !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, s] of o) {
        const { wrapped: l } = s, r = this[a];
        l !== !0 || this._$AL.has(a) || r === void 0 || this.C(a, void 0, s, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((o) => {
        var a;
        return (a = o.hostUpdate) == null ? void 0 : a.call(o);
      }), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var o;
      return (o = n.hostUpdated) == null ? void 0 : o.call(n);
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
St.elementStyles = [], St.shadowRootOptions = { mode: "open" }, St[jt("elementProperties")] = /* @__PURE__ */ new Map(), St[jt("finalized")] = /* @__PURE__ */ new Map(), Zi == null || Zi({ ReactiveElement: St }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = globalThis, Gn = (e) => e, Ri = Kt.trustedTypes, Yn = Ri ? Ri.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, qo = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Fo = "?" + ot, Is = `<${Fo}>`, It = document, Jt = () => It.createComment(""), Zt = (e) => e === null || typeof e != "object" && typeof e != "function", Sn = Array.isArray, bs = (e) => Sn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", en = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jn = /-->/g, Kn = />/g, lt = RegExp(`>|${en}(?:([^\\s"'>=/]+)(${en}*=${en}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xn = /'/g, Qn = /"/g, Bo = /^(?:script|style|textarea|title)$/i, Wo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), M = Wo(1), ie = Wo(2), At = Symbol.for("lit-noChange"), ae = Symbol.for("lit-nothing"), Jn = /* @__PURE__ */ new WeakMap(), ft = It.createTreeWalker(It, 129);
function Vo(e, t) {
  if (!Sn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Yn !== void 0 ? Yn.createHTML(t) : t;
}
const vs = (e, t) => {
  const i = e.length - 1, n = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ut;
  for (let l = 0; l < i; l++) {
    const r = e[l];
    let p, g, y = -1, f = 0;
    for (; f < r.length && (s.lastIndex = f, g = s.exec(r), g !== null); ) f = s.lastIndex, s === Ut ? g[1] === "!--" ? s = jn : g[1] !== void 0 ? s = Kn : g[2] !== void 0 ? (Bo.test(g[2]) && (o = RegExp("</" + g[2], "g")), s = lt) : g[3] !== void 0 && (s = lt) : s === lt ? g[0] === ">" ? (s = o ?? Ut, y = -1) : g[1] === void 0 ? y = -2 : (y = s.lastIndex - g[2].length, p = g[1], s = g[3] === void 0 ? lt : g[3] === '"' ? Qn : Xn) : s === Qn || s === Xn ? s = lt : s === jn || s === Kn ? s = Ut : (s = lt, o = void 0);
    const h = s === lt && e[l + 1].startsWith("/>") ? " " : "";
    a += s === Ut ? r + Is : y >= 0 ? (n.push(p), r.slice(0, y) + qo + r.slice(y) + ot + h) : r + ot + (y === -2 ? l : h);
  }
  return [Vo(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ei {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let a = 0, s = 0;
    const l = t.length - 1, r = this.parts, [p, g] = vs(t, i);
    if (this.el = ei.createElement(p, n), ft.currentNode = this.el.content, i === 2 || i === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (o = ft.nextNode()) !== null && r.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const y of o.getAttributeNames()) if (y.endsWith(qo)) {
          const f = g[s++], h = o.getAttribute(y).split(ot), x = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: a, name: x[2], strings: h, ctor: x[1] === "." ? xs : x[1] === "?" ? ks : x[1] === "@" ? _s : Wi }), o.removeAttribute(y);
        } else y.startsWith(ot) && (r.push({ type: 6, index: a }), o.removeAttribute(y));
        if (Bo.test(o.tagName)) {
          const y = o.textContent.split(ot), f = y.length - 1;
          if (f > 0) {
            o.textContent = Ri ? Ri.emptyScript : "";
            for (let h = 0; h < f; h++) o.append(y[h], Jt()), ft.nextNode(), r.push({ type: 2, index: ++a });
            o.append(y[f], Jt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Fo) r.push({ type: 2, index: a });
      else {
        let y = -1;
        for (; (y = o.data.indexOf(ot, y + 1)) !== -1; ) r.push({ type: 7, index: a }), y += ot.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const n = It.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Pt(e, t, i = e, n) {
  var s, l;
  if (t === At) return t;
  let o = n !== void 0 ? (s = i._$Co) == null ? void 0 : s[n] : i._$Cl;
  const a = Zt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = Pt(e, o._$AS(e, t.values), o, n)), t;
}
class ws {
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
    const { el: { content: i }, parts: n } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? It).importNode(i, !0);
    ft.currentNode = o;
    let a = ft.nextNode(), s = 0, l = 0, r = n[0];
    for (; r !== void 0; ) {
      if (s === r.index) {
        let p;
        r.type === 2 ? p = new ai(a, a.nextSibling, this, t) : r.type === 1 ? p = new r.ctor(a, r.name, r.strings, this, t) : r.type === 6 && (p = new $s(a, this, t)), this._$AV.push(p), r = n[++l];
      }
      s !== (r == null ? void 0 : r.index) && (a = ft.nextNode(), s++);
    }
    return ft.currentNode = It, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ai {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = ae, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = Pt(this, t, i), Zt(t) ? t === ae || t == null || t === "" ? (this._$AH !== ae && this._$AR(), this._$AH = ae) : t !== this._$AH && t !== At && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ae && Zt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(It.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ei.createElement(Vo(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const s = new ws(o, this), l = s.u(this.options);
      s.p(i), this.T(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Jn.get(t.strings);
    return i === void 0 && Jn.set(t.strings, i = new ei(t)), i;
  }
  k(t) {
    Sn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const a of t) o === i.length ? i.push(n = new ai(this.O(Jt()), this.O(Jt()), this, this.options)) : n = i[o], n._$AI(a), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = Gn(t).nextSibling;
      Gn(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Wi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, a) {
    this.type = 1, this._$AH = ae, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ae;
  }
  _$AI(t, i = this, n, o) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = Pt(this, t, i, 0), s = !Zt(t) || t !== this._$AH && t !== At, s && (this._$AH = t);
    else {
      const l = t;
      let r, p;
      for (t = a[0], r = 0; r < a.length - 1; r++) p = Pt(this, l[n + r], i, r), p === At && (p = this._$AH[r]), s || (s = !Zt(p) || p !== this._$AH[r]), p === ae ? t = ae : t !== ae && (t += (p ?? "") + a[r + 1]), this._$AH[r] = p;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === ae ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xs extends Wi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ae ? void 0 : t;
  }
}
class ks extends Wi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ae);
  }
}
class _s extends Wi {
  constructor(t, i, n, o, a) {
    super(t, i, n, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Pt(this, t, i, 0) ?? ae) === At) return;
    const n = this._$AH, o = t === ae && n !== ae || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== ae && (n === ae || o);
    o && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $s {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Pt(this, t);
  }
}
const tn = Kt.litHtmlPolyfillSupport;
tn == null || tn(ei, ai), (Kt.litHtmlVersions ?? (Kt.litHtmlVersions = [])).push("3.3.3");
const Ss = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = o = new ai(t.insertBefore(Jt(), a), a, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis;
class Ve extends St {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ss(i, this.renderRoot, this.renderOptions);
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
    return At;
  }
}
var To;
Ve._$litElement$ = !0, Ve.finalized = !0, (To = gt.litElementHydrateSupport) == null || To.call(gt, { LitElement: Ve });
const nn = gt.litElementPolyfillSupport;
nn == null || nn({ LitElement: Ve });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Es = { attribute: !0, type: String, converter: Ni, reflect: !1, hasChanged: $n }, Cs = (e = Es, t, i) => {
  const { kind: n, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), n === "accessor") {
    const { name: s } = i;
    return { set(l) {
      const r = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(s, r, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, e, l), l;
    } };
  }
  if (n === "setter") {
    const { name: s } = i;
    return function(l) {
      const r = this[s];
      t.call(this, l), this.requestUpdate(s, r, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function se(e) {
  return (t, i) => typeof i == "object" ? Cs(e, t, i) : ((n, o, a) => {
    const s = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, n), s ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return se({ ...e, state: !0, attribute: !1 });
}
var pn = "http://www.w3.org/1999/xhtml";
const Zn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Zn.hasOwnProperty(t) ? { space: Zn[t], local: e } : e;
}
function Ms(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === pn && t.documentElement.namespaceURI === pn ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function As(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ho(e) {
  var t = Vi(e);
  return (t.local ? As : Ms)(t);
}
function Ps() {
}
function En(e) {
  return e == null ? Ps : function() {
    return this.querySelector(e);
  };
}
function Ts(e) {
  typeof e != "function" && (e = En(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, l = n[o] = new Array(s), r, p, g = 0; g < s; ++g)
      (r = a[g]) && (p = e.call(r, r.__data__, g, a)) && ("__data__" in r && (p.__data__ = r.__data__), l[g] = p);
  return new De(n, this._parents);
}
function Os(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ns() {
  return [];
}
function Go(e) {
  return e == null ? Ns : function() {
    return this.querySelectorAll(e);
  };
}
function Rs(e) {
  return function() {
    return Os(e.apply(this, arguments));
  };
}
function Ls(e) {
  typeof e == "function" ? e = Rs(e) : e = Go(e);
  for (var t = this._groups, i = t.length, n = [], o = [], a = 0; a < i; ++a)
    for (var s = t[a], l = s.length, r, p = 0; p < l; ++p)
      (r = s[p]) && (n.push(e.call(r, r.__data__, p, s)), o.push(r));
  return new De(n, o);
}
function Yo(e) {
  return function() {
    return this.matches(e);
  };
}
function jo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ds = Array.prototype.find;
function zs(e) {
  return function() {
    return Ds.call(this.children, e);
  };
}
function Us() {
  return this.firstElementChild;
}
function qs(e) {
  return this.select(e == null ? Us : zs(typeof e == "function" ? e : jo(e)));
}
var Fs = Array.prototype.filter;
function Bs() {
  return Array.from(this.children);
}
function Ws(e) {
  return function() {
    return Fs.call(this.children, e);
  };
}
function Vs(e) {
  return this.selectAll(e == null ? Bs : Ws(typeof e == "function" ? e : jo(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Yo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, l = n[o] = [], r, p = 0; p < s; ++p)
      (r = a[p]) && e.call(r, r.__data__, p, a) && l.push(r);
  return new De(n, this._parents);
}
function Ko(e) {
  return new Array(e.length);
}
function Gs() {
  return new De(this._enter || this._groups.map(Ko), this._parents);
}
function Li(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Li.prototype = {
  constructor: Li,
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
function Ys(e) {
  return function() {
    return e;
  };
}
function js(e, t, i, n, o, a) {
  for (var s = 0, l, r = t.length, p = a.length; s < p; ++s)
    (l = t[s]) ? (l.__data__ = a[s], n[s] = l) : i[s] = new Li(e, a[s]);
  for (; s < r; ++s)
    (l = t[s]) && (o[s] = l);
}
function Ks(e, t, i, n, o, a, s) {
  var l, r, p = /* @__PURE__ */ new Map(), g = t.length, y = a.length, f = new Array(g), h;
  for (l = 0; l < g; ++l)
    (r = t[l]) && (f[l] = h = s.call(r, r.__data__, l, t) + "", p.has(h) ? o[l] = r : p.set(h, r));
  for (l = 0; l < y; ++l)
    h = s.call(e, a[l], l, a) + "", (r = p.get(h)) ? (n[l] = r, r.__data__ = a[l], p.delete(h)) : i[l] = new Li(e, a[l]);
  for (l = 0; l < g; ++l)
    (r = t[l]) && p.get(f[l]) === r && (o[l] = r);
}
function Xs(e) {
  return e.__data__;
}
function Qs(e, t) {
  if (!arguments.length) return Array.from(this, Xs);
  var i = t ? Ks : js, n = this._parents, o = this._groups;
  typeof e != "function" && (e = Ys(e));
  for (var a = o.length, s = new Array(a), l = new Array(a), r = new Array(a), p = 0; p < a; ++p) {
    var g = n[p], y = o[p], f = y.length, h = Js(e.call(g, g && g.__data__, p, n)), x = h.length, d = l[p] = new Array(x), c = s[p] = new Array(x), m = r[p] = new Array(f);
    i(g, y, d, c, m, h, t);
    for (var k = 0, b = 0, C, L; k < x; ++k)
      if (C = d[k]) {
        for (k >= b && (b = k + 1); !(L = c[b]) && ++b < x; ) ;
        C._next = L || null;
      }
  }
  return s = new De(s, n), s._enter = l, s._exit = r, s;
}
function Js(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Zs() {
  return new De(this._exit || this._groups.map(Ko), this._parents);
}
function er(e, t, i) {
  var n = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), n && o ? n.merge(o).order() : o;
}
function tr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, o = i.length, a = n.length, s = Math.min(o, a), l = new Array(o), r = 0; r < s; ++r)
    for (var p = i[r], g = n[r], y = p.length, f = l[r] = new Array(y), h, x = 0; x < y; ++x)
      (h = p[x] || g[x]) && (f[x] = h);
  for (; r < o; ++r)
    l[r] = i[r];
  return new De(l, this._parents);
}
function ir() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], o = n.length - 1, a = n[o], s; --o >= 0; )
      (s = n[o]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function nr(e) {
  e || (e = or);
  function t(y, f) {
    return y && f ? e(y.__data__, f.__data__) : !y - !f;
  }
  for (var i = this._groups, n = i.length, o = new Array(n), a = 0; a < n; ++a) {
    for (var s = i[a], l = s.length, r = o[a] = new Array(l), p, g = 0; g < l; ++g)
      (p = s[g]) && (r[g] = p);
    r.sort(t);
  }
  return new De(o, this._parents).order();
}
function or(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ar() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function sr() {
  return Array.from(this);
}
function rr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length; o < a; ++o) {
      var s = n[o];
      if (s) return s;
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
    for (var o = t[i], a = 0, s = o.length, l; a < s; ++a)
      (l = o[a]) && e.call(l, l.__data__, a, o);
  return this;
}
function pr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ur(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function mr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function fr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function hr(e, t) {
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
  var i = Vi(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ur : pr : typeof t == "function" ? i.local ? gr : hr : i.local ? fr : mr)(i, t));
}
function Xo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ir(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function br(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function vr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function wr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ir : typeof t == "function" ? vr : br)(e, t, i ?? "")) : Tt(this.node(), e);
}
function Tt(e, t) {
  return e.style.getPropertyValue(t) || Xo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function xr(e) {
  return function() {
    delete this[e];
  };
}
function kr(e, t) {
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
function $r(e, t) {
  return arguments.length > 1 ? this.each((t == null ? xr : typeof t == "function" ? _r : kr)(e, t)) : this.node()[e];
}
function Qo(e) {
  return e.trim().split(/^|\s+/);
}
function Cn(e) {
  return e.classList || new Jo(e);
}
function Jo(e) {
  this._node = e, this._names = Qo(e.getAttribute("class") || "");
}
Jo.prototype = {
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
function Zo(e, t) {
  for (var i = Cn(e), n = -1, o = t.length; ++n < o; ) i.add(t[n]);
}
function ea(e, t) {
  for (var i = Cn(e), n = -1, o = t.length; ++n < o; ) i.remove(t[n]);
}
function Sr(e) {
  return function() {
    Zo(this, e);
  };
}
function Er(e) {
  return function() {
    ea(this, e);
  };
}
function Cr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Zo : ea)(this, e);
  };
}
function Mr(e, t) {
  var i = Qo(e + "");
  if (arguments.length < 2) {
    for (var n = Cn(this.node()), o = -1, a = i.length; ++o < a; ) if (!n.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Cr : t ? Sr : Er)(i, t));
}
function Ar() {
  this.textContent = "";
}
function Pr(e) {
  return function() {
    this.textContent = e;
  };
}
function Tr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Or(e) {
  return arguments.length ? this.each(e == null ? Ar : (typeof e == "function" ? Tr : Pr)(e)) : this.node().textContent;
}
function Nr() {
  this.innerHTML = "";
}
function Rr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Lr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Dr(e) {
  return arguments.length ? this.each(e == null ? Nr : (typeof e == "function" ? Lr : Rr)(e)) : this.node().innerHTML;
}
function zr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ur() {
  return this.each(zr);
}
function qr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fr() {
  return this.each(qr);
}
function Br(e) {
  var t = typeof e == "function" ? e : Ho(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Wr() {
  return null;
}
function Vr(e, t) {
  var i = typeof e == "function" ? e : Ho(e), n = t == null ? Wr : typeof t == "function" ? t : En(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Hr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Gr() {
  return this.each(Hr);
}
function Yr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function jr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Kr(e) {
  return this.select(e ? jr : Yr);
}
function Xr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Qr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Jr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Zr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++n] = a;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function ed(e, t, i) {
  return function() {
    var n = this.__on, o, a = Qr(t);
    if (n) {
      for (var s = 0, l = n.length; s < l; ++s)
        if ((o = n[s]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), o = { type: e.type, name: e.name, value: t, listener: a, options: i }, n ? n.push(o) : this.__on = [o];
  };
}
function td(e, t, i) {
  var n = Jr(e + ""), o, a = n.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var r = 0, p = l.length, g; r < p; ++r)
        for (o = 0, g = l[r]; o < a; ++o)
          if ((s = n[o]).type === g.type && s.name === g.name)
            return g.value;
    }
    return;
  }
  for (l = t ? ed : Zr, o = 0; o < a; ++o) this.each(l(n[o], t, i));
  return this;
}
function ta(e, t, i) {
  var n = Xo(e), o = n.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = n.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function id(e, t) {
  return function() {
    return ta(this, e, t);
  };
}
function nd(e, t) {
  return function() {
    return ta(this, e, t.apply(this, arguments));
  };
}
function od(e, t) {
  return this.each((typeof t == "function" ? nd : id)(e, t));
}
function* ad() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length, s; o < a; ++o)
      (s = n[o]) && (yield s);
}
var ia = [null];
function De(e, t) {
  this._groups = e, this._parents = t;
}
function si() {
  return new De([[document.documentElement]], ia);
}
function sd() {
  return this;
}
De.prototype = si.prototype = {
  constructor: De,
  select: Ts,
  selectAll: Ls,
  selectChild: qs,
  selectChildren: Vs,
  filter: Hs,
  data: Qs,
  enter: Gs,
  exit: Zs,
  join: er,
  merge: tr,
  selection: sd,
  order: ir,
  sort: nr,
  call: ar,
  nodes: sr,
  node: rr,
  size: dr,
  empty: lr,
  each: cr,
  attr: yr,
  style: wr,
  property: $r,
  classed: Mr,
  text: Or,
  html: Dr,
  raise: Ur,
  lower: Fr,
  append: Br,
  insert: Vr,
  remove: Gr,
  clone: Kr,
  datum: Xr,
  on: td,
  dispatch: od,
  [Symbol.iterator]: ad
};
function Be(e) {
  return typeof e == "string" ? new De([[document.querySelector(e)]], [document.documentElement]) : new De([[e]], ia);
}
function rd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ct(e, t) {
  if (e = rd(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var dd = { value: () => {
} };
function Mn() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Si(i);
}
function Si(e) {
  this._ = e;
}
function ld(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", o = i.indexOf(".");
    if (o >= 0 && (n = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Si.prototype = Mn.prototype = {
  constructor: Si,
  on: function(e, t) {
    var i = this._, n = ld(e + "", i), o, a = -1, s = n.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((o = (e = n[a]).type) && (o = cd(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < s; )
      if (o = (e = n[a]).type) i[o] = eo(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = eo(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Si(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var i = new Array(o), n = 0, o, a; n < o; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], n = 0, o = a.length; n < o; ++n) a[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], o = 0, a = n.length; o < a; ++o) n[o].value.apply(t, i);
  }
};
function cd(e, t) {
  for (var i = 0, n = e.length, o; i < n; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function eo(e, t, i) {
  for (var n = 0, o = e.length; n < o; ++n)
    if (e[n].name === t) {
      e[n] = dd, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const un = { capture: !0, passive: !1 };
function mn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function pd(e) {
  var t = e.document.documentElement, i = Be(e).on("dragstart.drag", mn, un);
  "onselectstart" in t ? i.on("selectstart.drag", mn, un) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ud(e, t) {
  var i = e.document.documentElement, n = Be(e).on("dragstart.drag", null);
  t && (n.on("click.drag", mn, un), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function An(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function na(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function ri() {
}
var ti = 0.7, Di = 1 / ti, Mt = "\\s*([+-]?\\d+)\\s*", ii = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", md = /^#([0-9a-f]{3,8})$/, fd = new RegExp(`^rgb\\(${Mt},${Mt},${Mt}\\)$`), hd = new RegExp(`^rgb\\(${je},${je},${je}\\)$`), gd = new RegExp(`^rgba\\(${Mt},${Mt},${Mt},${ii}\\)$`), yd = new RegExp(`^rgba\\(${je},${je},${je},${ii}\\)$`), Id = new RegExp(`^hsl\\(${ii},${je},${je}\\)$`), bd = new RegExp(`^hsla\\(${ii},${je},${je},${ii}\\)$`), to = {
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
An(ri, ni, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: io,
  // Deprecated! Use color.formatHex.
  formatHex: io,
  formatHex8: vd,
  formatHsl: wd,
  formatRgb: no,
  toString: no
});
function io() {
  return this.rgb().formatHex();
}
function vd() {
  return this.rgb().formatHex8();
}
function wd() {
  return oa(this).formatHsl();
}
function no() {
  return this.rgb().formatRgb();
}
function ni(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = md.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? oo(t) : i === 3 ? new Ne(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ui(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ui(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = fd.exec(e)) ? new Ne(t[1], t[2], t[3], 1) : (t = hd.exec(e)) ? new Ne(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = gd.exec(e)) ? ui(t[1], t[2], t[3], t[4]) : (t = yd.exec(e)) ? ui(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Id.exec(e)) ? ro(t[1], t[2] / 100, t[3] / 100, 1) : (t = bd.exec(e)) ? ro(t[1], t[2] / 100, t[3] / 100, t[4]) : to.hasOwnProperty(e) ? oo(to[e]) : e === "transparent" ? new Ne(NaN, NaN, NaN, 0) : null;
}
function oo(e) {
  return new Ne(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ui(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Ne(e, t, i, n);
}
function xd(e) {
  return e instanceof ri || (e = ni(e)), e ? (e = e.rgb(), new Ne(e.r, e.g, e.b, e.opacity)) : new Ne();
}
function fn(e, t, i, n) {
  return arguments.length === 1 ? xd(e) : new Ne(e, t, i, n ?? 1);
}
function Ne(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
An(Ne, fn, na(ri, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new Ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ti : Math.pow(ti, e), new Ne(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ne(yt(this.r), yt(this.g), yt(this.b), zi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ao,
  // Deprecated! Use color.formatHex.
  formatHex: ao,
  formatHex8: kd,
  formatRgb: so,
  toString: so
}));
function ao() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}`;
}
function kd() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}${ht((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function so() {
  const e = zi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function zi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ht(e) {
  return e = yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ro(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new We(e, t, i, n);
}
function oa(e) {
  if (e instanceof We) return new We(e.h, e.s, e.l, e.opacity);
  if (e instanceof ri || (e = ni(e)), !e) return new We();
  if (e instanceof We) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, o = Math.min(t, i, n), a = Math.max(t, i, n), s = NaN, l = a - o, r = (a + o) / 2;
  return l ? (t === a ? s = (i - n) / l + (i < n) * 6 : i === a ? s = (n - t) / l + 2 : s = (t - i) / l + 4, l /= r < 0.5 ? a + o : 2 - a - o, s *= 60) : l = r > 0 && r < 1 ? 0 : s, new We(s, l, r, e.opacity);
}
function _d(e, t, i, n) {
  return arguments.length === 1 ? oa(e) : new We(e, t, i, n ?? 1);
}
function We(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
An(We, _d, na(ri, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ti : Math.pow(ti, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - n;
    return new Ne(
      on(e >= 240 ? e - 240 : e + 120, o, n),
      on(e, o, n),
      on(e < 120 ? e + 240 : e - 120, o, n),
      this.opacity
    );
  },
  clamp() {
    return new We(lo(this.h), mi(this.s), mi(this.l), zi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = zi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${lo(this.h)}, ${mi(this.s) * 100}%, ${mi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function lo(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mi(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function on(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const aa = (e) => () => e;
function $d(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Sd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Ed(e) {
  return (e = +e) == 1 ? sa : function(t, i) {
    return i - t ? Sd(t, i, e) : aa(isNaN(t) ? i : t);
  };
}
function sa(e, t) {
  var i = t - e;
  return i ? $d(e, i) : aa(isNaN(e) ? t : e);
}
const co = (function e(t) {
  var i = Ed(t);
  function n(o, a) {
    var s = i((o = fn(o)).r, (a = fn(a)).r), l = i(o.g, a.g), r = i(o.b, a.b), p = sa(o.opacity, a.opacity);
    return function(g) {
      return o.r = s(g), o.g = l(g), o.b = r(g), o.opacity = p(g), o + "";
    };
  }
  return n.gamma = e, n;
})(1);
function nt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var hn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, an = new RegExp(hn.source, "g");
function Cd(e) {
  return function() {
    return e;
  };
}
function Md(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ad(e, t) {
  var i = hn.lastIndex = an.lastIndex = 0, n, o, a, s = -1, l = [], r = [];
  for (e = e + "", t = t + ""; (n = hn.exec(e)) && (o = an.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), l[s] ? l[s] += a : l[++s] = a), (n = n[0]) === (o = o[0]) ? l[s] ? l[s] += o : l[++s] = o : (l[++s] = null, r.push({ i: s, x: nt(n, o) })), i = an.lastIndex;
  return i < t.length && (a = t.slice(i), l[s] ? l[s] += a : l[++s] = a), l.length < 2 ? r[0] ? Md(r[0].x) : Cd(t) : (t = r.length, function(p) {
    for (var g = 0, y; g < t; ++g) l[(y = r[g]).i] = y.x(p);
    return l.join("");
  });
}
var po = 180 / Math.PI, gn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ra(e, t, i, n, o, a) {
  var s, l, r;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (r = e * i + t * n) && (i -= e * r, n -= t * r), (l = Math.sqrt(i * i + n * n)) && (i /= l, n /= l, r /= l), e * n < t * i && (e = -e, t = -t, r = -r, s = -s), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * po,
    skewX: Math.atan(r) * po,
    scaleX: s,
    scaleY: l
  };
}
var fi;
function Pd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? gn : ra(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Td(e) {
  return e == null || (fi || (fi = document.createElementNS("http://www.w3.org/2000/svg", "g")), fi.setAttribute("transform", e), !(e = fi.transform.baseVal.consolidate())) ? gn : (e = e.matrix, ra(e.a, e.b, e.c, e.d, e.e, e.f));
}
function da(e, t, i, n) {
  function o(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, g, y, f, h, x) {
    if (p !== y || g !== f) {
      var d = h.push("translate(", null, t, null, i);
      x.push({ i: d - 4, x: nt(p, y) }, { i: d - 2, x: nt(g, f) });
    } else (y || f) && h.push("translate(" + y + t + f + i);
  }
  function s(p, g, y, f) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), f.push({ i: y.push(o(y) + "rotate(", null, n) - 2, x: nt(p, g) })) : g && y.push(o(y) + "rotate(" + g + n);
  }
  function l(p, g, y, f) {
    p !== g ? f.push({ i: y.push(o(y) + "skewX(", null, n) - 2, x: nt(p, g) }) : g && y.push(o(y) + "skewX(" + g + n);
  }
  function r(p, g, y, f, h, x) {
    if (p !== y || g !== f) {
      var d = h.push(o(h) + "scale(", null, ",", null, ")");
      x.push({ i: d - 4, x: nt(p, y) }, { i: d - 2, x: nt(g, f) });
    } else (y !== 1 || f !== 1) && h.push(o(h) + "scale(" + y + "," + f + ")");
  }
  return function(p, g) {
    var y = [], f = [];
    return p = e(p), g = e(g), a(p.translateX, p.translateY, g.translateX, g.translateY, y, f), s(p.rotate, g.rotate, y, f), l(p.skewX, g.skewX, y, f), r(p.scaleX, p.scaleY, g.scaleX, g.scaleY, y, f), p = g = null, function(h) {
      for (var x = -1, d = f.length, c; ++x < d; ) y[(c = f[x]).i] = c.x(h);
      return y.join("");
    };
  };
}
var Od = da(Pd, "px, ", "px)", "deg)"), Nd = da(Td, ", ", ")", ")"), Rd = 1e-12;
function uo(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Ld(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Dd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const zd = (function e(t, i, n) {
  function o(a, s) {
    var l = a[0], r = a[1], p = a[2], g = s[0], y = s[1], f = s[2], h = g - l, x = y - r, d = h * h + x * x, c, m;
    if (d < Rd)
      m = Math.log(f / p) / t, c = function(z) {
        return [
          l + z * h,
          r + z * x,
          p * Math.exp(t * z * m)
        ];
      };
    else {
      var k = Math.sqrt(d), b = (f * f - p * p + n * d) / (2 * p * i * k), C = (f * f - p * p - n * d) / (2 * f * i * k), L = Math.log(Math.sqrt(b * b + 1) - b), R = Math.log(Math.sqrt(C * C + 1) - C);
      m = (R - L) / t, c = function(z) {
        var W = z * m, w = uo(L), E = p / (i * k) * (w * Dd(t * W + L) - Ld(L));
        return [
          l + E * h,
          r + E * x,
          p * w / uo(t * W + L)
        ];
      };
    }
    return c.duration = m * 1e3 * t / Math.SQRT2, c;
  }
  return o.rho = function(a) {
    var s = Math.max(1e-3, +a), l = s * s, r = l * l;
    return e(s, l, r);
  }, o;
})(Math.SQRT2, 2, 4);
var Ot = 0, Gt = 0, qt = 0, la = 1e3, Ui, Yt, qi = 0, bt = 0, Hi = 0, oi = typeof performance == "object" && performance.now ? performance : Date, ca = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Pn() {
  return bt || (ca(Ud), bt = oi.now() + Hi);
}
function Ud() {
  bt = 0;
}
function Fi() {
  this._call = this._time = this._next = null;
}
Fi.prototype = pa.prototype = {
  constructor: Fi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Pn() : +i) + (t == null ? 0 : +t), !this._next && Yt !== this && (Yt ? Yt._next = this : Ui = this, Yt = this), this._call = e, this._time = i, yn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, yn());
  }
};
function pa(e, t, i) {
  var n = new Fi();
  return n.restart(e, t, i), n;
}
function qd() {
  Pn(), ++Ot;
  for (var e = Ui, t; e; )
    (t = bt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ot;
}
function mo() {
  bt = (qi = oi.now()) + Hi, Ot = Gt = 0;
  try {
    qd();
  } finally {
    Ot = 0, Bd(), bt = 0;
  }
}
function Fd() {
  var e = oi.now(), t = e - qi;
  t > la && (Hi -= t, qi = e);
}
function Bd() {
  for (var e, t = Ui, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ui = i);
  Yt = e, yn(n);
}
function yn(e) {
  if (!Ot) {
    Gt && (Gt = clearTimeout(Gt));
    var t = e - bt;
    t > 24 ? (e < 1 / 0 && (Gt = setTimeout(mo, e - oi.now() - Hi)), qt && (qt = clearInterval(qt))) : (qt || (qi = oi.now(), qt = setInterval(Fd, la)), Ot = 1, ca(mo));
  }
}
function fo(e, t, i) {
  var n = new Fi();
  return t = t == null ? 0 : +t, n.restart((o) => {
    n.stop(), e(o + t);
  }, t, i), n;
}
var Wd = Mn("start", "end", "cancel", "interrupt"), Vd = [], ua = 0, ho = 1, In = 2, Ei = 3, go = 4, bn = 5, Ci = 6;
function Gi(e, t, i, n, o, a) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (i in s) return;
  Hd(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Wd,
    tween: Vd,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ua
  });
}
function Tn(e, t) {
  var i = He(e, t);
  if (i.state > ua) throw new Error("too late; already scheduled");
  return i;
}
function Ke(e, t) {
  var i = He(e, t);
  if (i.state > Ei) throw new Error("too late; already running");
  return i;
}
function He(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Hd(e, t, i) {
  var n = e.__transition, o;
  n[t] = i, i.timer = pa(a, 0, i.time);
  function a(p) {
    i.state = ho, i.timer.restart(s, i.delay, i.time), i.delay <= p && s(p - i.delay);
  }
  function s(p) {
    var g, y, f, h;
    if (i.state !== ho) return r();
    for (g in n)
      if (h = n[g], h.name === i.name) {
        if (h.state === Ei) return fo(s);
        h.state === go ? (h.state = Ci, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[g]) : +g < t && (h.state = Ci, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[g]);
      }
    if (fo(function() {
      i.state === Ei && (i.state = go, i.timer.restart(l, i.delay, i.time), l(p));
    }), i.state = In, i.on.call("start", e, e.__data__, i.index, i.group), i.state === In) {
      for (i.state = Ei, o = new Array(f = i.tween.length), g = 0, y = -1; g < f; ++g)
        (h = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (o[++y] = h);
      o.length = y + 1;
    }
  }
  function l(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(r), i.state = bn, 1), y = -1, f = o.length; ++y < f; )
      o[y].call(e, g);
    i.state === bn && (i.on.call("end", e, e.__data__, i.index, i.group), r());
  }
  function r() {
    i.state = Ci, i.timer.stop(), delete n[t];
    for (var p in n) return;
    delete e.__transition;
  }
}
function Mi(e, t) {
  var i = e.__transition, n, o, a = !0, s;
  if (i) {
    t = t == null ? null : t + "";
    for (s in i) {
      if ((n = i[s]).name !== t) {
        a = !1;
        continue;
      }
      o = n.state > In && n.state < bn, n.state = Ci, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[s];
    }
    a && delete e.__transition;
  }
}
function Gd(e) {
  return this.each(function() {
    Mi(this, e);
  });
}
function Yd(e, t) {
  var i, n;
  return function() {
    var o = Ke(this, e), a = o.tween;
    if (a !== i) {
      n = i = a;
      for (var s = 0, l = n.length; s < l; ++s)
        if (n[s].name === t) {
          n = n.slice(), n.splice(s, 1);
          break;
        }
    }
    o.tween = n;
  };
}
function jd(e, t, i) {
  var n, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = Ke(this, e), s = a.tween;
    if (s !== n) {
      o = (n = s).slice();
      for (var l = { name: t, value: i }, r = 0, p = o.length; r < p; ++r)
        if (o[r].name === t) {
          o[r] = l;
          break;
        }
      r === p && o.push(l);
    }
    a.tween = o;
  };
}
function Kd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = He(this.node(), i).tween, o = 0, a = n.length, s; o < a; ++o)
      if ((s = n[o]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Yd : jd)(i, e, t));
}
function On(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var o = Ke(this, n);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return He(o, n).value[t];
  };
}
function ma(e, t) {
  var i;
  return (typeof t == "number" ? nt : t instanceof ni ? co : (i = ni(t)) ? (t = i, co) : Ad)(e, t);
}
function Xd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Qd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Jd(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = this.getAttribute(e);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function Zd(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function el(e, t, i) {
  var n, o, a;
  return function() {
    var s, l = i(this), r;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), r = l + "", s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, l)));
  };
}
function tl(e, t, i) {
  var n, o, a;
  return function() {
    var s, l = i(this), r;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), r = l + "", s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, l)));
  };
}
function il(e, t) {
  var i = Vi(e), n = i === "transform" ? Nd : ma;
  return this.attrTween(e, typeof t == "function" ? (i.local ? tl : el)(i, n, On(this, "attr." + e, t)) : t == null ? (i.local ? Qd : Xd)(i) : (i.local ? Zd : Jd)(i, n, t));
}
function nl(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function ol(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function al(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && ol(e, a)), i;
  }
  return o._value = t, o;
}
function sl(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && nl(e, a)), i;
  }
  return o._value = t, o;
}
function rl(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Vi(e);
  return this.tween(i, (n.local ? al : sl)(n, t));
}
function dl(e, t) {
  return function() {
    Tn(this, e).delay = +t.apply(this, arguments);
  };
}
function ll(e, t) {
  return t = +t, function() {
    Tn(this, e).delay = t;
  };
}
function cl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? dl : ll)(t, e)) : He(this.node(), t).delay;
}
function pl(e, t) {
  return function() {
    Ke(this, e).duration = +t.apply(this, arguments);
  };
}
function ul(e, t) {
  return t = +t, function() {
    Ke(this, e).duration = t;
  };
}
function ml(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? pl : ul)(t, e)) : He(this.node(), t).duration;
}
function fl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ke(this, e).ease = t;
  };
}
function hl(e) {
  var t = this._id;
  return arguments.length ? this.each(fl(t, e)) : He(this.node(), t).ease;
}
function gl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ke(this, e).ease = i;
  };
}
function yl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(gl(this._id, e));
}
function Il(e) {
  typeof e != "function" && (e = Yo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, l = n[o] = [], r, p = 0; p < s; ++p)
      (r = a[p]) && e.call(r, r.__data__, p, a) && l.push(r);
  return new et(n, this._parents, this._name, this._id);
}
function bl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, o = i.length, a = Math.min(n, o), s = new Array(n), l = 0; l < a; ++l)
    for (var r = t[l], p = i[l], g = r.length, y = s[l] = new Array(g), f, h = 0; h < g; ++h)
      (f = r[h] || p[h]) && (y[h] = f);
  for (; l < n; ++l)
    s[l] = t[l];
  return new et(s, this._parents, this._name, this._id);
}
function vl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wl(e, t, i) {
  var n, o, a = vl(t) ? Tn : Ke;
  return function() {
    var s = a(this, e), l = s.on;
    l !== n && (o = (n = l).copy()).on(t, i), s.on = o;
  };
}
function xl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? He(this.node(), i).on.on(e) : this.each(wl(i, e, t));
}
function kl(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _l() {
  return this.on("end.remove", kl(this._id));
}
function $l(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = En(e));
  for (var n = this._groups, o = n.length, a = new Array(o), s = 0; s < o; ++s)
    for (var l = n[s], r = l.length, p = a[s] = new Array(r), g, y, f = 0; f < r; ++f)
      (g = l[f]) && (y = e.call(g, g.__data__, f, l)) && ("__data__" in g && (y.__data__ = g.__data__), p[f] = y, Gi(p[f], t, i, f, p, He(g, i)));
  return new et(a, this._parents, t, i);
}
function Sl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Go(e));
  for (var n = this._groups, o = n.length, a = [], s = [], l = 0; l < o; ++l)
    for (var r = n[l], p = r.length, g, y = 0; y < p; ++y)
      if (g = r[y]) {
        for (var f = e.call(g, g.__data__, y, r), h, x = He(g, i), d = 0, c = f.length; d < c; ++d)
          (h = f[d]) && Gi(h, t, i, d, f, x);
        a.push(f), s.push(g);
      }
  return new et(a, s, t, i);
}
var El = si.prototype.constructor;
function Cl() {
  return new El(this._groups, this._parents);
}
function Ml(e, t) {
  var i, n, o;
  return function() {
    var a = Tt(this, e), s = (this.style.removeProperty(e), Tt(this, e));
    return a === s ? null : a === i && s === n ? o : o = t(i = a, n = s);
  };
}
function fa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Al(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = Tt(this, e);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function Pl(e, t, i) {
  var n, o, a;
  return function() {
    var s = Tt(this, e), l = i(this), r = l + "";
    return l == null && (r = l = (this.style.removeProperty(e), Tt(this, e))), s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, l));
  };
}
function Tl(e, t) {
  var i, n, o, a = "style." + t, s = "end." + a, l;
  return function() {
    var r = Ke(this, e), p = r.on, g = r.value[a] == null ? l || (l = fa(t)) : void 0;
    (p !== i || o !== g) && (n = (i = p).copy()).on(s, o = g), r.on = n;
  };
}
function Ol(e, t, i) {
  var n = (e += "") == "transform" ? Od : ma;
  return t == null ? this.styleTween(e, Ml(e, n)).on("end.style." + e, fa(e)) : typeof t == "function" ? this.styleTween(e, Pl(e, n, On(this, "style." + e, t))).each(Tl(this._id, e)) : this.styleTween(e, Al(e, n, t), i).on("end.style." + e, null);
}
function Nl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Rl(e, t, i) {
  var n, o;
  function a() {
    var s = t.apply(this, arguments);
    return s !== o && (n = (o = s) && Nl(e, s, i)), n;
  }
  return a._value = t, a;
}
function Ll(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Rl(e, t, i ?? ""));
}
function Dl(e) {
  return function() {
    this.textContent = e;
  };
}
function zl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ul(e) {
  return this.tween("text", typeof e == "function" ? zl(On(this, "text", e)) : Dl(e == null ? "" : e + ""));
}
function ql(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Fl(e) {
  var t, i;
  function n() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && ql(o)), t;
  }
  return n._value = e, n;
}
function Bl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Fl(e));
}
function Wl() {
  for (var e = this._name, t = this._id, i = ha(), n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var s = n[a], l = s.length, r, p = 0; p < l; ++p)
      if (r = s[p]) {
        var g = He(r, t);
        Gi(r, e, i, p, s, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new et(n, this._parents, e, i);
}
function Vl() {
  var e, t, i = this, n = i._id, o = i.size();
  return new Promise(function(a, s) {
    var l = { value: s }, r = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var p = Ke(this, n), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(r)), p.on = t;
    }), o === 0 && a();
  });
}
var Hl = 0;
function et(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function ha() {
  return ++Hl;
}
var Je = si.prototype;
et.prototype = {
  constructor: et,
  select: $l,
  selectAll: Sl,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: Il,
  merge: bl,
  selection: Cl,
  transition: Wl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: xl,
  attr: il,
  attrTween: rl,
  style: Ol,
  styleTween: Ll,
  text: Ul,
  textTween: Bl,
  remove: _l,
  tween: Kd,
  delay: cl,
  duration: ml,
  ease: hl,
  easeVarying: yl,
  end: Vl,
  [Symbol.iterator]: Je[Symbol.iterator]
};
function Gl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Yl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Gl
};
function jl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Kl(e) {
  var t, i;
  e instanceof et ? (t = e._id, e = e._name) : (t = ha(), (i = Yl).time = Pn(), e = e == null ? null : e + "");
  for (var n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var s = n[a], l = s.length, r, p = 0; p < l; ++p)
      (r = s[p]) && Gi(r, e, t, p, s, i || jl(r, t));
  return new et(n, this._parents, e, t);
}
si.prototype.interrupt = Gd;
si.prototype.transition = Kl;
const hi = (e) => () => e;
function Xl(e, {
  sourceEvent: t,
  target: i,
  transform: n,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: o }
  });
}
function Ze(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Ze.prototype = {
  constructor: Ze,
  scale: function(e) {
    return e === 1 ? this : new Ze(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Ze(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Xt = new Ze(1, 0, 0);
Ze.prototype;
function sn(e) {
  e.stopImmediatePropagation();
}
function Ft(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ql(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Jl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function yo() {
  return this.__zoom || Xt;
}
function Zl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ec() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tc(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], s = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > n ? (n + o) / 2 : Math.min(0, n) || Math.max(0, o),
    s > a ? (a + s) / 2 : Math.min(0, a) || Math.max(0, s)
  );
}
function ic() {
  var e = Ql, t = Jl, i = tc, n = Zl, o = ec, a = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, r = zd, p = Mn("start", "zoom", "end"), g, y, f, h = 500, x = 150, d = 0, c = 10;
  function m(I) {
    I.property("__zoom", yo).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", w).on("dblclick.zoom", E).filter(o).on("touchstart.zoom", H).on("touchmove.zoom", ne).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(I, P, _, v) {
    var S = I.selection ? I.selection() : I;
    S.property("__zoom", yo), I !== S ? L(I, P, _, v) : S.interrupt().each(function() {
      R(this, arguments).event(v).start().zoom(null, typeof P == "function" ? P.apply(this, arguments) : P).end();
    });
  }, m.scaleBy = function(I, P, _, v) {
    m.scaleTo(I, function() {
      var S = this.__zoom.k, A = typeof P == "function" ? P.apply(this, arguments) : P;
      return S * A;
    }, _, v);
  }, m.scaleTo = function(I, P, _, v) {
    m.transform(I, function() {
      var S = t.apply(this, arguments), A = this.__zoom, $ = _ == null ? C(S) : typeof _ == "function" ? _.apply(this, arguments) : _, N = A.invert($), T = typeof P == "function" ? P.apply(this, arguments) : P;
      return i(b(k(A, T), $, N), S, s);
    }, _, v);
  }, m.translateBy = function(I, P, _, v) {
    m.transform(I, function() {
      return i(this.__zoom.translate(
        typeof P == "function" ? P.apply(this, arguments) : P,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), t.apply(this, arguments), s);
    }, null, v);
  }, m.translateTo = function(I, P, _, v, S) {
    m.transform(I, function() {
      var A = t.apply(this, arguments), $ = this.__zoom, N = v == null ? C(A) : typeof v == "function" ? v.apply(this, arguments) : v;
      return i(Xt.translate(N[0], N[1]).scale($.k).translate(
        typeof P == "function" ? -P.apply(this, arguments) : -P,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), A, s);
    }, v, S);
  };
  function k(I, P) {
    return P = Math.max(a[0], Math.min(a[1], P)), P === I.k ? I : new Ze(P, I.x, I.y);
  }
  function b(I, P, _) {
    var v = P[0] - _[0] * I.k, S = P[1] - _[1] * I.k;
    return v === I.x && S === I.y ? I : new Ze(I.k, v, S);
  }
  function C(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function L(I, P, _, v) {
    I.on("start.zoom", function() {
      R(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var S = this, A = arguments, $ = R(S, A).event(v), N = t.apply(S, A), T = _ == null ? C(N) : typeof _ == "function" ? _.apply(S, A) : _, D = Math.max(N[1][0] - N[0][0], N[1][1] - N[0][1]), B = S.__zoom, Y = typeof P == "function" ? P.apply(S, A) : P, le = r(B.invert(T).concat(D / B.k), Y.invert(T).concat(D / Y.k));
      return function(de) {
        if (de === 1) de = Y;
        else {
          var q = le(de), G = D / q[2];
          de = new Ze(G, T[0] - q[0] * G, T[1] - q[1] * G);
        }
        $.zoom(null, de);
      };
    });
  }
  function R(I, P, _) {
    return !_ && I.__zooming || new z(I, P);
  }
  function z(I, P) {
    this.that = I, this.args = P, this.active = 0, this.sourceEvent = null, this.extent = t.apply(I, P), this.taps = 0;
  }
  z.prototype = {
    event: function(I) {
      return I && (this.sourceEvent = I), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(I, P) {
      return this.mouse && I !== "mouse" && (this.mouse[1] = P.invert(this.mouse[0])), this.touch0 && I !== "touch" && (this.touch0[1] = P.invert(this.touch0[0])), this.touch1 && I !== "touch" && (this.touch1[1] = P.invert(this.touch1[0])), this.that.__zoom = P, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(I) {
      var P = Be(this.that).datum();
      p.call(
        I,
        this.that,
        new Xl(I, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: p
        }),
        P
      );
    }
  };
  function W(I, ...P) {
    if (!e.apply(this, arguments)) return;
    var _ = R(this, P).event(I), v = this.__zoom, S = Math.max(a[0], Math.min(a[1], v.k * Math.pow(2, n.apply(this, arguments)))), A = ct(I);
    if (_.wheel)
      (_.mouse[0][0] !== A[0] || _.mouse[0][1] !== A[1]) && (_.mouse[1] = v.invert(_.mouse[0] = A)), clearTimeout(_.wheel);
    else {
      if (v.k === S) return;
      _.mouse = [A, v.invert(A)], Mi(this), _.start();
    }
    Ft(I), _.wheel = setTimeout($, x), _.zoom("mouse", i(b(k(v, S), _.mouse[0], _.mouse[1]), _.extent, s));
    function $() {
      _.wheel = null, _.end();
    }
  }
  function w(I, ...P) {
    if (f || !e.apply(this, arguments)) return;
    var _ = I.currentTarget, v = R(this, P, !0).event(I), S = Be(I.view).on("mousemove.zoom", T, !0).on("mouseup.zoom", D, !0), A = ct(I, _), $ = I.clientX, N = I.clientY;
    pd(I.view), sn(I), v.mouse = [A, this.__zoom.invert(A)], Mi(this), v.start();
    function T(B) {
      if (Ft(B), !v.moved) {
        var Y = B.clientX - $, le = B.clientY - N;
        v.moved = Y * Y + le * le > d;
      }
      v.event(B).zoom("mouse", i(b(v.that.__zoom, v.mouse[0] = ct(B, _), v.mouse[1]), v.extent, s));
    }
    function D(B) {
      S.on("mousemove.zoom mouseup.zoom", null), ud(B.view, v.moved), Ft(B), v.event(B).end();
    }
  }
  function E(I, ...P) {
    if (e.apply(this, arguments)) {
      var _ = this.__zoom, v = ct(I.changedTouches ? I.changedTouches[0] : I, this), S = _.invert(v), A = _.k * (I.shiftKey ? 0.5 : 2), $ = i(b(k(_, A), v, S), t.apply(this, P), s);
      Ft(I), l > 0 ? Be(this).transition().duration(l).call(L, $, v, I) : Be(this).call(m.transform, $, v, I);
    }
  }
  function H(I, ...P) {
    if (e.apply(this, arguments)) {
      var _ = I.touches, v = _.length, S = R(this, P, I.changedTouches.length === v).event(I), A, $, N, T;
      for (sn(I), $ = 0; $ < v; ++$)
        N = _[$], T = ct(N, this), T = [T, this.__zoom.invert(T), N.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== T[2] && (S.touch1 = T, S.taps = 0) : (S.touch0 = T, A = !0, S.taps = 1 + !!g);
      g && (g = clearTimeout(g)), A && (S.taps < 2 && (y = T[0], g = setTimeout(function() {
        g = null;
      }, h)), Mi(this), S.start());
    }
  }
  function ne(I, ...P) {
    if (this.__zooming) {
      var _ = R(this, P).event(I), v = I.changedTouches, S = v.length, A, $, N, T;
      for (Ft(I), A = 0; A < S; ++A)
        $ = v[A], N = ct($, this), _.touch0 && _.touch0[2] === $.identifier ? _.touch0[0] = N : _.touch1 && _.touch1[2] === $.identifier && (_.touch1[0] = N);
      if ($ = _.that.__zoom, _.touch1) {
        var D = _.touch0[0], B = _.touch0[1], Y = _.touch1[0], le = _.touch1[1], de = (de = Y[0] - D[0]) * de + (de = Y[1] - D[1]) * de, q = (q = le[0] - B[0]) * q + (q = le[1] - B[1]) * q;
        $ = k($, Math.sqrt(de / q)), N = [(D[0] + Y[0]) / 2, (D[1] + Y[1]) / 2], T = [(B[0] + le[0]) / 2, (B[1] + le[1]) / 2];
      } else if (_.touch0) N = _.touch0[0], T = _.touch0[1];
      else return;
      _.zoom("touch", i(b($, N, T), _.extent, s));
    }
  }
  function te(I, ...P) {
    if (this.__zooming) {
      var _ = R(this, P).event(I), v = I.changedTouches, S = v.length, A, $;
      for (sn(I), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), A = 0; A < S; ++A)
        $ = v[A], _.touch0 && _.touch0[2] === $.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === $.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && ($ = ct($, this), Math.hypot(y[0] - $[0], y[1] - $[1]) < c)) {
        var N = Be(this).on("dblclick.zoom");
        N && N.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : hi(+I), m) : n;
  }, m.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : hi(!!I), m) : e;
  }, m.touchable = function(I) {
    return arguments.length ? (o = typeof I == "function" ? I : hi(!!I), m) : o;
  }, m.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : hi([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), m) : t;
  }, m.scaleExtent = function(I) {
    return arguments.length ? (a[0] = +I[0], a[1] = +I[1], m) : [a[0], a[1]];
  }, m.translateExtent = function(I) {
    return arguments.length ? (s[0][0] = +I[0][0], s[1][0] = +I[1][0], s[0][1] = +I[0][1], s[1][1] = +I[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(I) {
    return arguments.length ? (i = I, m) : i;
  }, m.duration = function(I) {
    return arguments.length ? (l = +I, m) : l;
  }, m.interpolate = function(I) {
    return arguments.length ? (r = I, m) : r;
  }, m.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? m : I;
  }, m.clickDistance = function(I) {
    return arguments.length ? (d = (I = +I) * I, m) : Math.sqrt(d);
  }, m.tapDistance = function(I) {
    return arguments.length ? (c = +I, m) : c;
  }, m;
}
var nc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, ve = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? oc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && nc(t, i, o), o;
};
function ac(e, t, i, n) {
  const o = t.x - e.x, a = t.y - e.y, s = n.x - i.x, l = n.y - i.y, r = o * l - a * s;
  if (Math.abs(r) < 1e-9) return null;
  const p = ((i.x - e.x) * l - (i.y - e.y) * s) / r, g = ((i.x - e.x) * a - (i.y - e.y) * o) / r;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * a, t: p };
}
function sc(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, a = n * n + o * o || 1, s = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / a)), l = t.x + s * n, r = t.y + s * o;
  return { dist: Math.hypot(e.x - l, e.y - r), t: s };
}
function rc(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], s = e[o + 1], l = Math.hypot(s.x - a.x, s.y - a.y) || 1, r = (s.x - a.x) / l, p = (s.y - a.y) / l, g = t.map(([f, h]) => ac(a, s, f, h)).filter((f) => f !== null).filter((f) => f.t * l > i + 2 && (1 - f.t) * l > i + 2).sort((f, h) => f.t - h.t);
    let y = -1 / 0;
    for (const f of g)
      f.t * l - i <= y + 2 || (n += ` L ${f.x - r * i} ${f.y - p * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + r * i} ${f.y + p * i}`, y = f.t * l + i);
    n += ` L ${s.x} ${s.y}`;
  }
  return n;
}
const Et = {
  component: ie`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ie`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: ie`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: ie`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: ie`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: ie`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: ie`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: ie`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: ie`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: ie`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: ie`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: ie`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: ie`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: ie`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: ie`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: ie`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: ie`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let ye = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Xt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const o = this.scene.nodes.filter((a) => this.selectedIds.includes(a.id)).map((a) => ({ id: a.id, kind: a.kind }));
            o.length && this.emit("delete-selection-requested", { items: o });
            return;
          }
          if (this._selectedWaypoint) {
            const o = this.scene.edges.find((a) => a.id === this._selectedWaypoint.edgeId);
            o && (e.preventDefault(), this.removeWaypoint(o, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((o) => o.id === this.selectedId), i = this.scene.nodes.find((o) => o.id === this.selectedId);
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
    this._zoomBehavior = ic().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Be(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, s = this.fitInsets.top ?? 0, l = this.fitInsets.bottom ?? 0, r = Math.max(80, n.width - o - a), p = Math.max(80, n.height - s - l), g = Math.min(...t.map((c) => c.x - c.w / 2)) - e, y = Math.max(...t.map((c) => c.x + c.w / 2)) + e, f = Math.min(...t.map((c) => c.y - c.h / 2)) - e, h = Math.max(...t.map((c) => c.y + c.h / 2)) + e, x = Math.max(0.15, Math.min(r / (y - g), p / (h - f), 1.25)), d = Xt.translate(
      o + r / 2 - x * (g + y) / 2,
      s + p / 2 - x * (f + h) / 2
    ).scale(x);
    Be(i).call(this._zoomBehavior.transform, d);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Be(t), e);
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
    var i, n, o;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let a = e.parentId; a; a = (n = this.scene.nodes.find((s) => s.id === a)) == null ? void 0 : n.parentId) {
      const s = this.scene.nodes.find((r) => r.id === a);
      if (!s) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - s.x), y: e.y + (this._dragPos.y - s.y) };
      const l = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (l)
        return { x: e.x + (l.x - s.x), y: e.y + (l.y - s.y) };
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
      const n = this.scene.nodes.find((o) => o.id === e.parentId);
      if (n) {
        const o = this.nodePos(n), a = o.x - n.w / 2 + 10 + e.w / 2, s = o.x + n.w / 2 - 10 - e.w / 2, l = o.y - n.h / 2 + 34 + e.h / 2, r = o.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), s), i = Math.min(Math.max(i, l), r);
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
    var n, o;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const a of i) {
      const s = (o = a.closest) == null ? void 0 : o.call(a, "[data-node-id]");
      if (s) return s.getAttribute("data-node-id");
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
    let o = !1;
    const a = new Set(this.selectedIds), s = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (c) => a.has(c.id) && !(c.parentId && a.has(c.parentId))
    ) : null, l = s ? new Map(s.map((c) => [c.id, this.nodePos(c)])) : null, r = (c) => (c.shiftKey || c.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !s, p = s ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, y = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const c = [], m = p === "menu" ? this.scene.nodes.filter((k) => k.kind === "ui-app") : this.scene.nodes.filter((k) => k.id === t.parentId);
      for (const k of m) {
        const b = this.scene.nodes.filter((z) => z.parentId === k.id && y.includes(z.kind ?? "") && z.id !== t.id).sort((z, W) => z.y - W.y), C = k.x - k.w / 2 + 10, L = k.x + k.w / 2 - 10;
        for (const z of b) c.push({ x1: C, x2: L, y: z.y - z.h / 2 - 3, appId: k.id, beforeId: z.id });
        const R = b[b.length - 1];
        c.push({
          x1: C,
          x2: L,
          y: R ? R.y + R.h / 2 + 3 : k.y - k.h / 2 + 34 + 8,
          appId: k.id,
          beforeId: null
        });
      }
      return c;
    }, h = (c) => {
      const m = this.nodeIdAt(c), k = m && m !== t.id ? this.scene.nodes.find((b) => b.id === m) : void 0;
      return k ? k.kind === "external-system" ? k.id : k.parentId ?? null : null;
    }, x = (c) => {
      if ((c.buttons & 1) === 0) {
        d(c);
        return;
      }
      const m = this.toScene(c), k = m.x - i.x, b = m.y - i.y;
      if (!(!o && Math.hypot(k, b) < 3 / this._t.k))
        if (o = !0, s && l) {
          const C = /* @__PURE__ */ new Map();
          for (const L of s) {
            const R = l.get(L.id), z = this.clampToParent(L, R.x + k, R.y + b);
            C.set(L.id, { x: z.x, y: z.y });
          }
          this._dragGroup = C;
        } else if (g) {
          this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const C = this.scene.nodes.filter(
            (R) => y.includes(R.kind ?? "") && R.id !== t.id && Math.abs(m.x - R.x) <= R.w / 2 + 8
          ), L = p === "menu" ? C.find((R) => Math.abs(m.y - R.y) < R.h * 0.28) : void 0;
          if (L)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: L.id }, this._hoverNodeId = L.id;
          else {
            let R = -1, z = 14;
            this._menuSlots.slots.forEach((W, w) => {
              if (m.x < W.x1 - 24 || m.x > W.x2 + 24) return;
              const E = Math.abs(m.y - W.y);
              E < z && (z = E, R = w);
            }), this._menuSlots = { ...this._menuSlots, active: R >= 0 ? R : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else r(c) ? (this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._hoverNodeId = h(c)) : (this._dragPos = this.clampToParent(t, n.x + k, n.y + b), this._hoverNodeId = null);
    }, d = (c) => {
      if (window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", d), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([m, k]) => ({ id: m, x: k.x, y: k.y }))
        });
      else if (o && this._dragPos && g) {
        const m = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const k = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (m != null && m.nestRowId)
          this.emit(k, { id: t.id, nestRowId: m.nestRowId });
        else if (m && m.active !== null) {
          const b = m.slots[m.active];
          this.emit(k, { id: t.id, appId: b.appId, beforeId: b.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (r(c)) {
          const m = h(c);
          if (c.ctrlKey && t.kind === "api") {
            m && m !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: m,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (m !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: m,
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
    window.addEventListener("pointermove", x), window.addEventListener("pointerup", d);
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
    const o = 160, a = 90, s = { x: t.x, y: t.y, w: t.w, h: t.h }, l = this.scene.nodes.filter((d) => d.parentId === t.id), r = Math.min(...l.map((d) => d.x - d.w / 2)), p = Math.max(...l.map((d) => d.x + d.w / 2)), g = Math.min(...l.map((d) => d.y - d.h / 2)), y = Math.max(...l.map((d) => d.y + d.h / 2)), f = Na(
      l.map((d) => ({ dx: d.x - s.x, dy: d.y - s.y, w: d.w, h: d.h })),
      { w: o, h: a }
    ), h = (d) => {
      if ((d.buttons & 1) === 0) {
        x();
        return;
      }
      const c = this.toScene(d);
      if (d.shiftKey) {
        this._resize = {
          id: t.id,
          x: s.x,
          y: s.y,
          w: Math.max(f.w, 2 * Math.abs(c.x - s.x)),
          h: Math.max(f.h, 2 * Math.abs(c.y - s.y))
        };
        return;
      }
      const m = s.x - i * s.w / 2, k = s.y - n * s.h / 2, b = i > 0 ? Math.max(c.x, m + o, l.length ? p + 10 : -1 / 0) : Math.min(c.x, m - o, l.length ? r - 10 : 1 / 0), C = n > 0 ? Math.max(c.y, k + a, l.length ? y + 10 : -1 / 0) : Math.min(c.y, k - a, l.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (m + b) / 2,
        y: (k + C) / 2,
        w: Math.abs(b - m),
        h: Math.abs(C - k)
      };
    }, x = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", x), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", x);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const o = (s) => {
      if ((s.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const l = this.toScene(s);
      this._pendingLink = { sourceId: t.id, x: l.x, y: l.y }, this._hoverNodeId = this.nodeIdAt(s);
    }, a = (s) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const l = this.nodeIdAt(s);
      l && l !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: l,
        x: s.clientX,
        y: s.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), a = t - n, s = i - o, l = e.w / 2, r = e.h / 2;
    if (a === 0 && s === 0) return { x: n, y: o };
    const p = 1 / Math.max(Math.abs(a) / l, Math.abs(s) / r);
    return { x: n + a * p, y: o + s * p };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), i = this.scene.edges.filter(
      (o) => [o.sourceId, o.targetId].sort().join("|") === t
    );
    return i.length < 2 ? 0 : (i.findIndex((o) => o.id === e.id) - (i.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((g) => g.id === e.sourceId), i = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(i), s = n[0] ?? a, l = n[n.length - 1] ?? o;
    let r = this.borderPoint(t, s.x, s.y), p = this.borderPoint(i, l.x, l.y);
    if (!n.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const y = Math.hypot(p.x - r.x, p.y - r.y) || 1, f = -(p.y - r.y) / y * g, h = (p.x - r.x) / y * g;
        r = { x: r.x + f, y: r.y + h }, p = { x: p.x + f, y: p.y + h };
      }
    }
    return [r, ...n, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const o = (s) => {
      if (!this._wpDrag) return;
      n = !0;
      const l = this.toScene(s), r = [...this._wpDrag.points];
      r[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: r };
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: o } = sc(t, e[n], e[n + 1]);
      o < i.dist && (i = { seg: n, dist: o });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const n = this.nearestSegment(t, i), o = [...this.edgePoints[e.id] ?? []];
    o.splice(n, 0, i), this._selectedWaypoint = { edgeId: e.id, index: n }, this.emit("edge-points-changed", { id: e.id, points: o });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), o = this.nearestSegment(i, n);
    let a = !1;
    const s = (r) => {
      if ((r.buttons & 1) === 0) {
        l();
        return;
      }
      const p = this.toScene(r);
      if (a) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - n.x, p.y - n.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, p), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
      }
    }, l = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", l), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", l);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((n) => `${n.x},${n.y}`).join(" ");
    return ie`
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
          ${e.tooltip ? ie`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const n = e.color ?? "#64748b", o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), s = Math.floor((t.length - 1) / 2), l = {
      x: (t[s].x + t[s + 1].x) / 2,
      y: (t[s].y + t[s + 1].y) / 2
    }, r = t.slice(1, -1);
    return ie`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${rc(t, i)}
              fill="none"
              stroke=${n} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? ie`<text x=${l.x} y=${l.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
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
        ${o ? r.map((p, g) => {
      var f;
      const y = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === g;
      return ie`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${y ? 6 : 5}
                        fill=${y ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(h) => {
        h.button === 0 && (h.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: g }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], g));
      }}
                        @dblclick=${(h) => {
        h.stopPropagation(), this.removeWaypoint(e, g);
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
    var f, h, x, d;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, s = !!e.parentId, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, r = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = l / 2, g = r / 2, y = s && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ie`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (x = this._dragGroup) != null && x.has(e.id) ? "none" : "auto"}
         @pointerdown=${(c) => this.onNodePointerDown(c, e)}
         @dblclick=${(c) => {
      c.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ie`<rect x=${-p - 4} y=${-g - 4} width=${l + 8} height=${r + 8}
                  rx=${s ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${l} height=${r} rx=${s ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ie`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ie`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ie`<g transform="translate(${p - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(c) => {
      c.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(c) => c.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && Et[e.symbol] && !s ? ie`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Et[e.symbol]}
              </g>` : ""}
        ${s && e.symbol && Et[e.symbol] ? ie`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Et[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ie`
              <foreignObject x=${-p + 6} y=${a ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(c) => c.stopPropagation()}
                  @keydown=${(c) => {
      c.stopPropagation(), c.key === "Enter" && this.commitRename(e, c.target.value), c.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(c) => this.commitRename(e, c.target.value)}
                />
              </foreignObject>` : s ? ie`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${y}</text>` : a ? ie`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ie`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? ie`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (s ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([c, m]) => ie`
                <circle data-handle cx=${c} cy=${m} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(k) => this.onHandlePointerDown(k, e)}>
                  <title>${s ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((d = e.extraHandles) != null && d.length) ? e.extraHandles.map(
      (c, m) => ie`
                <g transform="translate(${-p + 24 + m * 20}, ${-g})">
                  <circle data-handle r="7" fill=${c.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(k) => this.onHandlePointerDown(k, e, c.kind)}>
                    <title>${c.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${a && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([c, m]) => ie`
                <rect data-resize x=${c * p - 6.5} y=${m * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${c * m > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(k) => this.onResizePointerDown(k, e, c, m)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return ie``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return ie``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return ie`
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
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, o = (s) => {
      if ((s.buttons & 1) === 0) {
        n();
        return;
      }
      const l = this.toScene(s);
      !i && Math.hypot(l.x - t.x, l.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: l });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: s, b: l } = this._rubber, r = Math.min(s.x, l.x), p = Math.max(s.x, l.x), g = Math.min(s.y, l.y), y = Math.max(s.y, l.y), f = this.scene.nodes.filter((h) => {
          const x = this.nodePos(h);
          return x.x >= r && x.x <= p && x.y >= g && x.y <= y;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return ie``;
    const { a: e, b: t } = this._rubber;
    return ie`
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
    const i = Math.min(...t.map((s) => s.x - s.w / 2)) - e, n = Math.max(...t.map((s) => s.x + s.w / 2)) + e, o = Math.min(...t.map((s) => s.y - s.h / 2)) - e, a = Math.max(...t.map((s) => s.y + s.h / 2)) + e;
    return { minX: i, minY: o, w: n - i, h: a - o };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), o = this._t.k, a = Xt.translate(n.width / 2 - o * e, n.height / 2 - o * t).scale(o);
    Be(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - n.left) / i, a = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return M``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, s = (0 - this._t.y) / this._t.k, l = o.width / this._t.k, r = o.height / this._t.k;
    return M`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(p) => {
      p.stopPropagation();
      try {
        p.currentTarget.setPointerCapture(p.pointerId);
      } catch {
      }
      this.onMinimapPointer(p, e, n);
    }}
        @pointermove=${(p) => {
      var g, y;
      (y = (g = p.currentTarget).hasPointerCapture) != null && y.call(g, p.pointerId) && this.onMinimapPointer(p, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return ie`<rect
              x=${(g.x - p.w / 2 - e.minX) * n}
              y=${(g.y - p.h / 2 - e.minY) * n}
              width=${Math.max(2, p.w * n)}
              height=${Math.max(2, p.h * n)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * n}
            y=${(s - e.minY) * n}
            width=${l * n}
            height=${r * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => o.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((o) => {
      const a = this.edgePolyline(o);
      if (a) {
        i.push(this.renderEdgeHit(o, a)), n.push(this.renderEdgeInk(o, a, [...t]));
        for (let s = 0; s < a.length - 1; s++) t.push([a[s], a[s + 1]]);
      }
    }), M`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(o) => {
      const a = o.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || o.button !== 0 || (o.buttons & 1) !== 0 && this.startRubberBand(o);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (o) => ie`
              <marker id="arrow-${this.markerId(o)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${o}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${i}
          ${this.scene.nodes.filter((o) => !o.parentId).map((o) => this.renderNode(o))}
          ${this.scene.nodes.filter((o) => o.parentId).map((o) => this.renderNode(o))}
          ${n}
          ${this._menuSlots ? ie`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (o, a) => ie`
                    <line x1=${o.x1} y1=${o.y} x2=${o.x2} y2=${o.y}
                          stroke=${a === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${a === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${a === this._menuSlots.active ? ie`<circle cx=${o.x1} cy=${o.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${o.x2} cy=${o.y} r="3.5" fill="#0284c7"></circle>` : ""}`
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
ye.styles = vt`
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
ve([
  se({ attribute: !1 })
], ye.prototype, "scene", 2);
ve([
  se({ attribute: !1 })
], ye.prototype, "selectedId", 2);
ve([
  se({ attribute: !1 })
], ye.prototype, "selectedIds", 2);
ve([
  se({ type: Boolean })
], ye.prototype, "connectable", 2);
ve([
  se({ attribute: !1 })
], ye.prototype, "edgePoints", 2);
ve([
  U()
], ye.prototype, "_t", 2);
ve([
  U()
], ye.prototype, "_dragPos", 2);
ve([
  U()
], ye.prototype, "_menuSlots", 2);
ve([
  U()
], ye.prototype, "_dragGroup", 2);
ve([
  U()
], ye.prototype, "_pendingLink", 2);
ve([
  U()
], ye.prototype, "_hoverNodeId", 2);
ve([
  U()
], ye.prototype, "_editingId", 2);
ve([
  U()
], ye.prototype, "_spaceDown", 2);
ve([
  U()
], ye.prototype, "_wpDrag", 2);
ve([
  U()
], ye.prototype, "_selectedWaypoint", 2);
ve([
  U()
], ye.prototype, "_resize", 2);
ve([
  U()
], ye.prototype, "_rubber", 2);
ve([
  se({ attribute: !1 })
], ye.prototype, "fitInsets", 2);
ye = ve([
  wt("modux-canvas")
], ye);
const ee = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Ae(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ue(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const $t = (e) => e.trim().toLowerCase();
function dc(e, t) {
  var w, E, H, ne, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((I) => [I.id, I.name])), o = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((P) => ({ ...P, moduleId: I.id }))
  ), a = new Set(o.map((I) => I.id)), s = e.aggregates ?? [], l = new Set(
    e.modules.flatMap((I) => (I.domainServices ?? []).map((P) => P.id))
  ), r = e.modules.flatMap(
    (I) => (I.domainEvents ?? []).map((P) => ({ ...P, moduleId: I.id, application: !1 }))
  ), p = e.modules.flatMap(
    (I) => (I.applicationEvents ?? []).map((P) => ({ ...P, moduleId: I.id, application: !0 }))
  ), g = e.modules.flatMap(
    (I) => (I.readModels ?? []).map((P) => ({ ...P, moduleId: I.id }))
  );
  for (const I of o)
    Ae(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ee.command.w,
      h: ee.command.h,
      kind: "use-case",
      symbol: I.policy ? "flow" : "gear",
      fill: I.policy ? ee.policy.fill : ee.command.fill,
      stroke: I.policy ? ee.policy.stroke : ee.command.stroke,
      badge: I.policy ? "POLICY" : "COMANDO",
      tooltip: I.policy ? `${I.name} — policy de ${n.get(I.moduleId) ?? I.moduleId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${n.get(I.moduleId) ?? I.moduleId}`
    });
  for (const I of o)
    (I.steps ?? []).forEach((P, _) => {
      Ae(i, {
        id: P.id,
        label: `${_ + 1}. ${P.name || P.type || "paso"}`,
        x: 0,
        y: 0,
        w: ee.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!P.customCodeId,
        tooltip: `Paso de ${I.name}${P.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), ue(i, {
        id: `esstep:${_ === 0 ? I.id : (I.steps ?? [])[_ - 1].id}->${P.id}`,
        sourceId: _ === 0 ? I.id : (I.steps ?? [])[_ - 1].id,
        targetId: P.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${I.name}`
      });
    });
  for (const I of e.customCodes ?? [])
    Ae(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${I.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const I of o)
    for (const P of I.steps ?? [])
      P.customCodeId && ue(i, {
        id: `escc:${P.id}`,
        sourceId: P.id,
        targetId: P.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: "El paso delega en código a mano — Supr lo desconecta"
      });
  for (const I of s)
    Ae(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ee.aggregate.w,
      h: ee.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ee.aggregate.fill,
      stroke: ee.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${I.name} — agregado de ${n.get(I.moduleId) ?? I.moduleId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const I of [...r, ...p])
    Ae(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ee.event.w,
      h: ee.event.h,
      kind: I.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: ee.event.fill,
      stroke: ee.event.stroke,
      badge: I.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${I.name} — evento de ${n.get(I.moduleId) ?? I.moduleId}`
    }), y.set($t(I.name), I.id);
  const f = (I) => {
    if (!I || !I.trim()) return null;
    const P = y.get($t(I));
    if (P) return P;
    const _ = `evname:${$t(I)}`;
    return Ae(i, {
      id: _,
      label: I,
      x: 0,
      y: 0,
      w: ee.event.w,
      h: ee.event.h,
      kind: "event-name",
      symbol: "event",
      fill: ee.event.fill,
      stroke: ee.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${I} — referenciado por nombre, sin evento declarado en el catálogo`
    }), _;
  }, h = (I) => {
    const P = g.find((v) => v.id === I.id) ?? g.find((v) => I.name && $t(v.name) === $t(I.name)), _ = (P == null ? void 0 : P.id) ?? (I.id || (I.name ? `rm:${$t(I.name)}` : null));
    return _ ? (Ae(i, {
      id: _,
      label: (P == null ? void 0 : P.name) ?? I.name ?? _,
      x: 0,
      y: 0,
      w: ee.readModel.w,
      h: ee.readModel.h,
      kind: P ? "read-model" : "derived-read-model",
      fill: ee.readModel.fill,
      stroke: ee.readModel.stroke,
      dashed: !P,
      badge: "READ MODEL"
    }), _) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!a.has(I.targetId)) continue;
    const P = (e.actors ?? []).find((_) => _.id === I.actorId);
    P && (Ae(i, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: ee.actor.w,
      h: ee.actor.h,
      kind: "actor",
      symbol: "person",
      fill: ee.actor.fill,
      stroke: ee.actor.stroke,
      badge: "ACTOR"
    }), ue(i, {
      id: `es-actor:${P.id}->${I.targetId}`,
      sourceId: P.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const P = (e.agentUses ?? []).filter(($) => $.agentId === I.id), _ = (e.agentExternalUses ?? []).filter(($) => $.agentId === I.id), v = (e.agentRags ?? []).filter(($) => $.agentId === I.id), S = (e.agentMcpUses ?? []).filter(($) => $.agentId === I.id), A = (e.agentGatewayUses ?? []).some(($) => $.agentId === I.id) || (e.agentApiOpUses ?? []).some(($) => $.agentId === I.id) || (e.agentQueryUses ?? []).some(($) => $.agentId === I.id) || (e.agentDelegations ?? []).some(($) => $.agentId === I.id) || (e.agentTriggers ?? []).some(($) => $.agentId === I.id);
    if (!(!P.length && !_.length && !v.length && !S.length && !A)) {
      Ae(i, {
        id: I.id,
        label: I.name,
        x: 0,
        y: 0,
        w: ee.actor.w,
        h: ee.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${I.name} — agente de IA (consume por MCP)`
      });
      for (const $ of P)
        a.has($.useCaseId) && ue(i, {
          id: `es-agent:${I.id}->${$.useCaseId}`,
          sourceId: I.id,
          targetId: $.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const $ of _) {
        const N = e.externalSystems.find(
          (D) => (D.useCases ?? []).some((B) => B.id === $.externalUseCaseId)
        );
        if (!N) continue;
        const T = (w = (N.useCases ?? []).find((D) => D.id === $.externalUseCaseId)) == null ? void 0 : w.name;
        Ae(i, {
          id: N.id,
          label: N.name,
          x: 0,
          y: 0,
          w: ee.external.w,
          h: ee.external.h,
          kind: "external-system",
          symbol: "component",
          fill: ee.external.fill,
          stroke: ee.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentx:${I.id}->${$.externalUseCaseId}`,
          sourceId: I.id,
          targetId: N.id,
          kind: "es-agent-external",
          label: T,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `Llama a ${T} del sistema externo` : void 0
        });
      }
      for (const $ of S) {
        const N = e.externalSystems.find(
          (D) => (D.mcpServers ?? []).some((B) => B.id === $.mcpServerId)
        );
        if (!N) continue;
        const T = (E = (N.mcpServers ?? []).find((D) => D.id === $.mcpServerId)) == null ? void 0 : E.name;
        Ae(i, {
          id: N.id,
          label: N.name,
          x: 0,
          y: 0,
          w: ee.external.w,
          h: ee.external.h,
          kind: "external-system",
          symbol: "component",
          fill: ee.external.fill,
          stroke: ee.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentmcp:${I.id}->${$.mcpServerId}`,
          sourceId: I.id,
          targetId: N.id,
          kind: "es-agent-mcp",
          label: T,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `Consume las herramientas del servidor MCP ${T}` : void 0
        });
      }
      for (const $ of v) {
        const N = (e.rags ?? []).find((T) => T.id === $.ragId);
        if (N) {
          Ae(i, {
            id: N.id,
            label: N.name,
            x: 0,
            y: 0,
            w: ee.readModel.w,
            h: ee.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${N.name} — base de conocimiento (retrieval)`
          }), ue(i, {
            id: `es-agrag:${I.id}->${N.id}`,
            sourceId: I.id,
            targetId: N.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const T of N.sourceReadModelIds ?? []) {
            const D = h({ id: T });
            D && ue(i, {
              id: `es-ragsrc:${N.id}->${D}`,
              sourceId: D,
              targetId: N.id,
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
  const x = (I) => {
    const P = e.externalSystems.find((_) => _.id === I);
    return P ? (Ae(i, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: ee.external.w,
      h: ee.external.h,
      kind: "external-system",
      symbol: "component",
      fill: ee.external.fill,
      stroke: ee.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), P.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const P = x(I.externalSystemId);
    !P || !a.has(I.useCaseId) || ue(i, {
      id: `es-extin:${P}->${I.useCaseId}`,
      sourceId: P,
      targetId: I.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const I of e.externalUseCaseCalls ?? []) {
    if (!a.has(I.sourceId)) continue;
    const P = e.externalSystems.find(
      (S) => (S.useCases ?? []).some((A) => A.id === I.targetId)
    ), _ = P ? x(P.id) : null;
    if (!_) continue;
    const v = (H = ((P == null ? void 0 : P.useCases) ?? []).find((S) => S.id === I.targetId)) == null ? void 0 : H.name;
    ue(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: _,
      kind: "es-command-external",
      label: v,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: v ? `Llama a ${v} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !a.has(I.sourceId) || !i.nodes.has(I.targetId) || ue(i, {
      id: `es-write:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: I.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const d = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const I of d)
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (a.has(I.sourceId) || s.some((_) => _.id === I.sourceId) || l.has(I.sourceId))) || ue(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const c = (I, P, _, v, S, A) => (Ae(i, {
    id: I,
    label: P,
    x: 0,
    y: 0,
    w: ee.policy.w,
    h: ee.policy.h,
    kind: _,
    symbol: "flow",
    fill: ee.policy.fill,
    stroke: ee.policy.stroke,
    badge: v,
    tooltip: S
  }), I), m = (I, P) => {
    const _ = f(I);
    _ && ue(i, {
      id: `es-trigger:${_}->${P}`,
      sourceId: _,
      targetId: P,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, k = (I, P) => {
    !P || !a.has(P) || ue(i, {
      id: `es-invoke:${I}->${P}`,
      sourceId: I,
      targetId: P,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const P = c(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    m(I.eventName, P);
    for (const _ of I.actions ?? []) {
      if (_.type === "CallUseCase" && k(P, _.useCaseId), _.type === "StartSaga" && _.sagaId) {
        const v = `saga:${_.sagaId}`;
        c(v, _.sagaId, "saga", "SAGA"), ue(i, {
          id: `es-saga:${P}->${v}`,
          sourceId: P,
          targetId: v,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (_.type === "UpdateProjection" && _.projectionId) {
        const v = (e.projections ?? []).find((S) => S.id === _.projectionId);
        v && ue(i, {
          id: `es-feeds:${P}->${v.id}`,
          sourceId: P,
          targetId: v.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const I of e.projections ?? []) {
    const P = c(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const S of I.handledEventIds) {
      const A = i.nodes.has(S) ? S : null;
      A && ue(i, {
        id: `es-trigger:${A}->${P}`,
        sourceId: A,
        targetId: P,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && i.nodes.has(I.sourceAggregateId) && ue(i, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: P,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const _ = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (_) {
      const S = e.externalSystems.find(
        ($) => ($.useCases ?? []).some((N) => N.id === _) || ($.tables ?? []).some((N) => N.id === _)
      ), A = S ? x(S.id) : null;
      if (A) {
        const $ = ((ne = (S.useCases ?? []).find((N) => N.id === _)) == null ? void 0 : ne.name) ?? ((te = (S.tables ?? []).find((N) => N.id === _)) == null ? void 0 : te.name);
        ue(i, {
          id: `es-poll:${I.id}`,
          sourceId: A,
          targetId: P,
          kind: "es-projects-poll",
          label: $,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: $ ? `polling de ${$}` : "polling"
        });
      }
    }
    const v = h({ id: I.readModelId, name: I.readModelName });
    v && ue(i, {
      id: `es-projects:${P}->${v}`,
      sourceId: P,
      targetId: v,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const _ = f(I.triggerEvent), v = h({ name: I.readModelName ?? `${I.triggerEvent}View` });
      _ && v && ue(i, {
        id: `es-mat:${I.id}`,
        sourceId: _,
        targetId: v,
        kind: "es-materializes",
        label: I.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${I.name} [MATERIALIZES]`
      });
      continue;
    }
    const P = c(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (m(I.triggerEvent, P), k(P, I.targetUseCaseId), !I.targetUseCaseId) {
      const _ = x(I.targetId), v = _ ?? `tgt:${I.targetId}`;
      !_ && n.has(I.targetId) && Ae(i, {
        id: v,
        label: n.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: ee.module.w,
        h: ee.module.h,
        kind: "module",
        symbol: "component",
        fill: ee.module.fill,
        stroke: ee.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(v) && ue(i, {
        id: `es-deliver:${I.id}`,
        sourceId: P,
        targetId: v,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const I of e.processes ?? []) {
    const P = c(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    m(I.triggerEvent, P);
    for (const v of I.steps) k(P, v.useCaseId);
    const _ = f(I.onCompletionEventName);
    _ && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: _,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const P = c(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    m(I.triggerEvent, P);
    for (const v of I.steps ?? []) {
      k(P, v.targetUseCaseId);
      for (const S of [v.emittedEventName, v.completionEventName]) {
        const A = f(S);
        A && ue(i, {
          id: `es-wfemit:${I.id}:${A}`,
          sourceId: P,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const _ = f(I.onCompletionEventName);
    _ && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: _,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const b = [...i.nodes.values()], C = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    C.has(I.targetId) || C.set(I.targetId, []), C.get(I.targetId).push(I.sourceId);
  const L = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Set(), z = (I) => {
    const P = L.get(I);
    if (P !== void 0) return P;
    if (R.has(I)) return 0;
    R.add(I);
    const _ = C.get(I) ?? [], v = _.length ? 1 + Math.max(..._.map(z)) : 0;
    return R.delete(I), L.set(I, v), v;
  }, W = /* @__PURE__ */ new Map();
  for (const I of b) {
    const P = t[I.id];
    if (P) {
      I.x = P.x, I.y = P.y;
      continue;
    }
    const _ = z(I.id), v = W.get(_) ?? 0;
    W.set(_, v + 1), I.x = 140 + _ * 260, I.y = 110 + v * 110;
  }
  return { nodes: b, edges: i.edges };
}
const lc = 190, cc = 56, Io = 180, pc = 56, uc = 150, mc = 44, bo = 250, vo = 100;
function fc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((l) => t.get(l)).filter(Boolean), s = a.length ? 1 + Math.max(...a.map(n)) : 0;
    return i.delete(o.id), s;
  };
  return n(e);
}
function hc(e, t) {
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
function gc(e, t) {
  var r;
  const i = [], n = [], o = /* @__PURE__ */ new Set(), a = (p) => {
    var g;
    return (g = e.modules.flatMap((y) => y.useCases ?? []).find((y) => y.id === p)) == null ? void 0 : g.name;
  };
  let s = 140;
  (e.workflows ?? []).forEach((p) => {
    var k;
    const g = new Map(p.steps.map((b) => [b.id, b])), y = new Map(p.steps.map((b) => [b.id, fc(b, g)])), f = /* @__PURE__ */ new Map();
    for (const b of p.steps) {
      const C = y.get(b.id) ?? 0;
      f.set(C, (f.get(C) ?? 0) + 1);
    }
    const h = Math.max(1, ...f.values()), x = hc(e, p);
    if (x && !o.has(x.id)) {
      o.add(x.id);
      const b = t[x.id] ?? { x: 140, y: s };
      i.push({
        id: x.id,
        label: x.label,
        x: b.x,
        y: b.y,
        w: uc,
        h: mc,
        kind: x.kind,
        symbol: x.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: x.kind === "aggregate" ? "AGGREGATE" : x.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const d = t[p.id] ?? { x: 420, y: s };
    i.push({
      id: p.id,
      label: p.name,
      x: d.x,
      y: d.y,
      w: lc,
      h: cc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}${p.onCompletionEventName ? ` · emite ${p.onCompletionEventName} al completar` : ""}`
    }), x && n.push({
      id: `wft:${p.id}`,
      sourceId: x.id,
      targetId: p.id,
      kind: "workflow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    });
    const c = /* @__PURE__ */ new Map();
    let m = 0;
    for (const b of p.steps) {
      const C = y.get(b.id) ?? 0;
      m = Math.max(m, C);
      const L = c.get(C) ?? 0;
      c.set(C, L + 1);
      const R = t[b.id] ?? {
        x: d.x + (C + 1) * bo,
        y: s + (L - (f.get(C) - 1) / 2) * vo
      }, z = a(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: R.x,
        y: R.y,
        w: b.type === "JOIN" || b.type === "SPLIT" ? 100 : Io,
        h: b.type === "JOIN" || b.type === "SPLIT" ? 48 : pc,
        kind: "workflow-step",
        symbol: b.type === "JOIN" || b.type === "SPLIT" ? "flow" : b.roleId ? "actor" : "event",
        fill: b.type === "JOIN" || b.type === "SPLIT" ? "#f5f3ff" : b.roleId ? "#fef9c3" : "#ffffff",
        stroke: b.roleId && b.type !== "JOIN" && b.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: b.type === "JOIN" || b.type === "SPLIT",
        badge: b.type === "JOIN" ? "⨝ JOIN" : b.type === "SPLIT" ? "⑃ SPLIT" : b.roleId ? `👤 ${b.roleId}${b.formPageId ? " · 📋" : ""}${b.deadline ? ` · ${b.deadline}` : ""}` : z ? `→ ${z}` : "∅ sin use case",
        tooltip: b.type === "JOIN" ? `${b.name} — espera a TODAS sus dependencias antes de seguir` : b.type === "SPLIT" ? `${b.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${b.name}${b.roleId ? ` · tarea HUMANA de ${b.roleId}${b.deadline ? ` (plazo ${b.deadline})` : ""}` : ""}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${z ? ` · lanza ${z}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}${b.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const W = (b.dependsOnStepIds ?? []).filter((w) => g.has(w));
      W.length === 0 && n.push({
        id: `wfs:${p.id}:${b.id}`,
        sourceId: p.id,
        targetId: b.id,
        kind: "workflow-start",
        label: b.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const w of W)
        n.push({
          id: `wfdep:${w}->${b.id}`,
          sourceId: w,
          targetId: b.id,
          kind: "workflow-dependency",
          label: b.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${b.name} espera a ${((k = g.get(w)) == null ? void 0 : k.name) ?? w}`
        });
    }
    if (p.onCompletionEventName) {
      const b = `done:${p.id}`, C = t[b] ?? { x: d.x + (m + 2) * bo, y: s };
      i.push({
        id: b,
        label: p.onCompletionEventName,
        x: C.x,
        y: C.y,
        w: Io,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const L = new Set(p.steps.flatMap((z) => z.dependsOnStepIds ?? [])), R = p.steps.filter((z) => !L.has(z.id));
      for (const z of R.length ? R : [])
        n.push({
          id: `wfd:${p.id}:${z.id}`,
          sourceId: z.id,
          targetId: b,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      p.steps.length || n.push({
        id: `wfd:${p.id}`,
        sourceId: p.id,
        targetId: b,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    s += Math.max(2, h + 1) * vo + 60;
  });
  const l = new Set(i.map((p) => p.id));
  (e.workflowGateways ?? []).forEach((p, g) => {
    const y = t[p.id] ?? { x: 200 + g % 5 * 220, y: 60 };
    i.push({
      id: p.id,
      label: p.name,
      x: y.x,
      y: y.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: p.type === "SPLIT" ? p.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : p.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: p.type === "SPLIT" ? `${p.name} — split ${p.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${p.name} — join que ${p.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), l.add(p.id);
  });
  for (const p of e.workflowGateways ?? []) {
    for (const y of p.sourceIds ?? [])
      l.has(y) && n.push({
        id: `wflink:${y}->${p.id}`,
        sourceId: y,
        targetId: p.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const g = p.type === "SPLIT" && p.semantics === "EXCLUSIVE";
    for (const y of p.targetIds ?? []) {
      if (!l.has(y)) continue;
      const f = g ? (r = (p.branchConditions ?? []).find((h) => h.targetId === y)) == null ? void 0 : r.expression : void 0;
      n.push({
        id: `wflink:${p.id}->${y}`,
        sourceId: p.id,
        targetId: y,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: g && !f,
        arrow: !0,
        label: f ?? (g ? "¿condición?" : void 0),
        tooltip: g ? `${f ? `Rama si: ${f}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((g) => (g.steps ?? []).filter((y) => y.formPageId && l.has(y.id))).forEach((g, y) => {
    const f = (e.pages ?? []).find((h) => h.id === g.formPageId);
    if (f) {
      if (!l.has(f.id)) {
        const h = i.find((d) => d.id === g.id), x = t[f.id] ?? {
          x: h ? h.x : 200 + y * 220,
          y: h ? h.y + 130 : 60
        };
        i.push({
          id: f.id,
          label: f.name,
          x: x.x,
          y: x.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${f.name} — el forms engine la presenta como formulario de la tarea`
        }), l.add(f.id);
      }
      n.push({
        id: `wfform:${g.id}->${f.id}`,
        sourceId: g.id,
        targetId: f.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const p of e.workflows ?? [])
    for (const g of p.steps ?? [])
      !g.handoffWorkflowId || !l.has(g.handoffWorkflowId) || !l.has(g.id) || n.push({
        id: `wflink:${g.id}->${g.handoffWorkflowId}`,
        sourceId: g.id,
        targetId: g.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: i, edges: n };
}
const wo = 250, Oe = 30, pt = 6, yc = 16, Bt = 190, Ic = 60, bc = 170, gi = 44;
function vc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ke(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function wc(e) {
  const t = [], i = (n, o, a) => {
    for (const s of n ?? []) {
      const l = [...o, s.label];
      t.push({ entry: s, path: l, depth: a }), i(s.children ?? [], l, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function xc(e, t) {
  var L, R, z, W;
  const i = [], n = [], o = e.uiApps ?? [], a = e.pages ?? [], s = (w) => {
    var E;
    return ((E = e.modules.flatMap((H) => H.useCases ?? []).find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  }, l = (w) => {
    var E;
    return ((E = e.modules.flatMap((H) => H.queryServices ?? []).find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  }, r = /* @__PURE__ */ new Map();
  let p = 160;
  for (const w of o) {
    const E = wc(w), H = Math.max(
      90,
      54 + E.length * (Oe + pt)
    ), ne = t[w.id] ?? { x: 190, y: p + H / 2 };
    p = ne.y + H / 2 + 70;
    const te = w.type ?? "APP";
    i.push({
      id: w.id,
      label: w.title || w.name,
      x: ne.x,
      y: ne.y,
      w: wo,
      h: H,
      kind: "ui-app",
      symbol: te === "ORCHESTRATOR" || te === "VIEW_EDITOR" ? "process" : "component",
      fill: te === "ORCHESTRATOR" || te === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: te === "ORCHESTRATOR" || te === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: te === "ORCHESTRATOR" ? "ORQUESTADOR" : te === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : te === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: te === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : te === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : te === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: te === "ORCHESTRATOR" ? `${w.name} — orquesta y mantiene estado; solo enseña páginas hijas` : te === "MASTER_DETAIL" ? `${w.name} — cabecera + pestañas (ambas son páginas)` : `App: ${w.name}`
    }), w.modelId && (r.set(w.modelId, {
      label: ((L = (e.models ?? []).find((_) => _.id === w.modelId)) == null ? void 0 : L.name) ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), n.push({
      id: `appmodel:${w.id}->${w.modelId}`,
      sourceId: w.id,
      targetId: w.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [_, v, S, A, $] of [
      [w.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [w.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      _ && n.push({
        id: `${v === "app-view" ? "appview" : "appedit"}:${w.id}->${_}`,
        sourceId: w.id,
        targetId: _,
        kind: v,
        color: A,
        label: S,
        arrow: !0,
        tooltip: $
      });
    const I = w.homePageId ?? w.homeAppId;
    I && n.push({
      id: `apphome:${w.id}->${I}`,
      sourceId: w.id,
      targetId: I,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: w.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), te === "MASTER_DETAIL" && w.headerPageId && n.push({
      id: `appheader:${w.id}->${w.headerPageId}`,
      sourceId: w.id,
      targetId: w.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let P = ne.y - H / 2 + 34 + 10 + Oe / 2;
    for (const { entry: _, path: v, depth: S } of E) {
      const A = vc(w.id, _, v), $ = S * yc;
      if (i.push({
        id: A,
        label: _.label,
        x: ne.x + $ / 2,
        y: P,
        w: wo - 20 - $,
        h: Oe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (R = _.children) != null && R.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (z = _.children) != null && z.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (W = _.children) != null && W.length ? "Agrupador (con submenú): no puede abrir nada" : _.pageId ? `Abre ${_.pageId}` : _.uiAdapterId ? `Abre la app ${_.uiAdapterId}` : _.useCaseId ? `Lanza ${_.useCaseId}` : _.aggregateId ? `CRUD inferido sobre ${_.aggregateId}` : _.queryOperationId ? `Listado con filtros de ${_.queryOperationId}` : "Entrada de menú sin destino"
      }), P += Oe + pt, _.uiAdapterId && o.some((N) => N.id === _.uiAdapterId) && n.push({
        id: `menuapp:${A}->${_.uiAdapterId}`,
        sourceId: A,
        targetId: _.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), _.useCaseId && e.modules.some((T) => (T.useCases ?? []).some((D) => D.id === _.useCaseId)) && (r.set(_.useCaseId, {
        label: s(_.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `menuuc:${A}->${_.useCaseId}`,
        sourceId: A,
        targetId: _.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), _.aggregateId && (e.aggregates ?? []).some((N) => N.id === _.aggregateId)) {
        const N = (e.aggregates ?? []).find((T) => T.id === _.aggregateId);
        r.set(N.id, { label: N.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), n.push({
          id: `menuagg:${A}->${N.id}`,
          sourceId: A,
          targetId: N.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (_.queryOperationId) {
        const N = e.modules.flatMap((D) => D.queryServices ?? []).find((D) => D.id === _.queryServiceId), T = ((N == null ? void 0 : N.operations) ?? []).find((D) => D.id === _.queryOperationId);
        N && T && (r.set(T.id, {
          label: `${T.name} (${N.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), n.push({
          id: `menuqop:${A}->${T.id}`,
          sourceId: A,
          targetId: T.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      _.pageId && a.some((N) => N.id === _.pageId) && n.push({
        id: `menupage:${A}->${_.pageId}`,
        sourceId: A,
        targetId: _.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const y = (w) => {
    var E;
    return ((E = a.find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  };
  for (const w of a) {
    const E = t[w.id] ?? { x: 640, y: g }, H = w.type === "WIZARD" ? w.wizardSteps ?? [] : [], ne = H.length ? 54 + H.length * (Oe + pt) : Ic;
    g = E.y + ne + 90, i.push({
      id: w.id,
      label: w.name,
      x: E.x,
      y: E.y,
      w: Bt,
      h: ne,
      kind: "page",
      symbol: "interface",
      badge: w.customCodeId ? "CODE" : w.type ?? "PAGE",
      container: H.length > 0,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...w.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: w.route ? `${w.type ?? "PAGE"} · ${w.route}` : w.type ?? "PAGE"
    });
    let te = E.y - ne / 2 + 34 + 10 + Oe / 2;
    H.forEach((I, P) => {
      const _ = I.id ?? I.pageId ?? String(P);
      i.push({
        id: `wizrow:${w.id}:${_}`,
        label: `${P + 1}. ${I.label ?? (I.pageId ? y(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: E.x,
        y: te,
        w: Bt - 20,
        h: Oe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: w.id,
        tooltip: I.pageId ? `Paso ${P + 1}: ${y(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${P + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), te += Oe + pt;
    });
    for (const [I, P, _, v] of [
      [w.crudDetailPageId ?? w.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [w.crudCreatePageId ?? w.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && n.push({
        id: `${P === "crud-detail" ? "cruddetail" : "crudnew"}:${w.id}->${I}`,
        sourceId: w.id,
        targetId: I,
        kind: P,
        color: v,
        label: _,
        dashed: !0,
        arrow: !0,
        tooltip: P === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let I = 0; I < (w.wizardSteps ?? []).length; I++) {
      const P = (w.wizardSteps ?? [])[I];
      if (!P.pageId) continue;
      const _ = P.id ?? P.pageId;
      n.push({
        id: `wizstep:${w.id}:${_}`,
        sourceId: `wizrow:${w.id}:${_}`,
        targetId: P.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${I + 1} — Supr desmapea`
      });
    }
    w.modelId && (r.set(w.modelId, {
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
    for (const I of w.buttons ?? [])
      I.useCaseId && (r.set(I.useCaseId, {
        label: s(I.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `pgbtn:${w.id}->${I.useCaseId}`,
        sourceId: w.id,
        targetId: I.useCaseId,
        kind: "page-button",
        label: I.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: I.mappingId ? `Botón «${I.label}» — mapping ${I.mappingId}` : `Botón «${I.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    w.listingQueryServiceId && (r.set(w.listingQueryServiceId, {
      label: l(w.listingQueryServiceId),
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
  const f = e.buttonGroups ?? [], h = (w) => {
    var E;
    return ((E = f.find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  };
  let x = 520;
  for (const w of f) {
    const E = w.buttons ?? [], H = w.groupIds ?? [], ne = E.length + H.length, te = t[w.id] ?? { x: 1e3, y: x }, I = Math.max(70, 54 + ne * (Oe + pt));
    x = te.y + I + 80, i.push({
      id: w.id,
      label: w.name,
      x: te.x,
      y: te.y,
      w: Bt,
      h: I,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      container: !0,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${w.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let P = te.y - I / 2 + 34 + 10 + Oe / 2;
    for (const _ of E)
      i.push({
        id: `gbtn:${w.id}:${_.id}`,
        label: _.label ?? _.id,
        x: te.x,
        y: P,
        w: Bt - 20,
        h: Oe,
        kind: "group-button",
        symbol: "usecase",
        fill: _.useCaseId || _.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !_.useCaseId && !_.apiOperationId,
        parentId: w.id,
        tooltip: `${_.label ?? _.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), P += Oe + pt;
    for (const _ of H)
      i.push({
        id: `gsub:${w.id}:${_}`,
        label: `▸ ${h(_)}`,
        x: te.x,
        y: P,
        w: Bt - 20,
        h: Oe,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: w.id,
        tooltip: `Subgrupo ${h(_)} — Supr lo desanida (el grupo sigue existiendo)`
      }), P += Oe + pt;
  }
  for (const w of f)
    for (const E of w.buttons ?? [])
      !E.useCaseId || !e.modules.some((ne) => (ne.useCases ?? []).some((te) => te.id === E.useCaseId)) || (r.set(E.useCaseId, {
        label: s(E.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `gbtnt:${w.id}:${E.id}`,
        sourceId: `gbtn:${w.id}:${E.id}`,
        targetId: E.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${E.label ?? E.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const w of a) {
    const E = [
      ["toolbar", w.toolbarGroupIds ?? []],
      ["botonera", w.bottomBarGroupIds ?? []]
    ];
    for (const [H, ne] of E)
      for (const te of ne)
        f.some((I) => I.id === te) && n.push({
          id: `bargrp:${w.id}:${H}:${te}`,
          sourceId: te,
          targetId: w.id,
          kind: "bar-group",
          color: H === "toolbar" ? "#0284c7" : "#7c3aed",
          label: H,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${H} de ${w.name} — Supr lo desengancha`
        });
  }
  let d = 160;
  for (const w of e.models ?? [])
    r.has(w.id) || r.set(w.id, { label: w.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [w, E] of r) {
    const H = t[w] ?? { x: 1050, y: d };
    d = H.y + gi + 46, i.push({
      id: w,
      label: E.label,
      x: H.x,
      y: H.y,
      w: bc,
      h: gi,
      kind: E.kind,
      symbol: E.symbol,
      fill: "#ffffff",
      stroke: E.stroke
    });
  }
  let c = 120;
  for (const w of e.identityProviders ?? []) {
    const E = t[w.id] ?? { x: -320, y: c };
    c = E.y + 70 + 40, i.push({
      id: w.id,
      label: w.name,
      x: E.x,
      y: E.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: w.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!w.publishedByExternalSystemId,
      badge: w.type ?? "IDP",
      tooltip: `${w.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const w of o)
    w.identityProviderId && (e.identityProviders ?? []).some((E) => E.id === w.identityProviderId) && n.push({
      id: `idpauth:${w.id}`,
      sourceId: w.id,
      targetId: w.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const m = (e.actorAppUses ?? []).filter(
    (w) => o.some((E) => E.id === w.appId) && (e.actors ?? []).some((E) => E.id === w.actorId)
  ), k = [...new Set(m.map((w) => w.actorId))];
  let b = 160;
  for (const w of k) {
    const E = (e.actors ?? []).find((ne) => ne.id === w), H = t[w] ?? { x: -60, y: b };
    b = H.y + gi + 46, i.push({
      id: w,
      label: E.name,
      x: H.x,
      y: H.y,
      w: 150,
      h: gi,
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
  (e.customCodes ?? []).forEach((w, E) => {
    const H = t[w.id] ?? { x: 1200, y: 120 + E * 90 };
    i.push({
      id: w.id,
      label: w.name,
      x: H.x,
      y: H.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${w.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const C = new Set(i.map((w) => w.id));
  for (const w of a)
    w.customCodeId && C.has(w.customCodeId) && n.push({
      id: `ccpage:${w.id}`,
      sourceId: w.customCodeId,
      targetId: w.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${w.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const w of e.customCodes ?? [])
    for (const E of w.usedElementIds ?? [])
      C.has(E) && n.push({
        id: `ccuse:${w.id}->${E}`,
        sourceId: w.id,
        targetId: E,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${w.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: i, edges: n };
}
const xo = 188, ko = 34, _o = 10, yi = 24, $o = 6;
function Ii(e, t) {
  return `fld:${e}:${t}`;
}
function vn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function kc(e, t) {
  const i = [], n = [], o = e.models ?? [], a = e.modelMappings ?? [], s = (f) => {
    var h;
    return ((h = o.find((x) => x.id === f)) == null ? void 0 : h.name) ?? f ?? "?";
  };
  o.forEach((f, h) => {
    const x = t[f.id] ?? { x: 200 + h % 5 * 260, y: 160 + Math.floor(h / 5) * 220 }, d = f.fields ?? [], c = ko + (d.length ? d.length * yi + (d.length - 1) * $o : 10) + _o;
    i.push({
      id: f.id,
      label: f.name,
      x: x.x,
      y: x.y,
      w: xo,
      h: c,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), d.forEach((m, k) => {
      i.push({
        id: Ii(f.id, m.id),
        label: m.name,
        x: x.x,
        y: x.y - c / 2 + ko + k * (yi + $o) + yi / 2,
        w: xo - 2 * _o,
        h: yi,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: m.type ?? void 0,
        parentId: f.id,
        tooltip: `${m.name}${m.type ? ` (${m.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, h) => {
    const x = t[f.id] ?? { x: 200 + h % 5 * 260, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
      x: x.x,
      y: x.y,
      w: 150,
      h: 44,
      kind: "transformation",
      symbol: "gear",
      fill: "#fff7ed",
      stroke: "#ea580c",
      badge: "TRANSFORM",
      dashed: !f.output,
      tooltip: `${f.name} — transformación: arrastra modelos o campos hasta ella (entradas) y su asa hasta un modelo o campo (salida)${f.output ? "" : " · aún sin salida"}`
    });
  }), (e.customCodes ?? []).forEach((f, h) => {
    const x = t[f.id] ?? { x: 120 + h % 5 * 220, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
      x: x.x,
      y: x.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${f.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`
    });
  });
  const l = new Set(i.map((f) => f.id)), r = (f) => f.fieldId ? Ii(f.modelId, f.fieldId) : f.modelId;
  for (const f of e.transformations ?? [])
    f.customCodeId && l.has(f.customCodeId) && l.has(f.id) && n.push({
      id: `cctf:${f.id}`,
      sourceId: f.customCodeId,
      targetId: f.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${f.name} delega en código a mano — Supr lo desconecta`
    });
  for (const f of a)
    f.customCodeId && l.has(f.customCodeId) && f.targetModelId && l.has(f.targetModelId) && n.push({
      id: `ccmap:${f.id}`,
      sourceId: f.customCodeId,
      targetId: f.targetModelId,
      kind: "custom-of-mapping",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      label: f.name,
      tooltip: `El mapeado ${f.name} delega en código a mano — Supr lo desconecta`
    });
  for (const f of e.transformations ?? []) {
    for (const h of f.inputs ?? []) {
      const x = r(h);
      l.has(x) && n.push({
        id: `tfin:${f.id}:${h.modelId}:${h.fieldId ?? ""}`,
        sourceId: x,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && l.has(r(f.output)) && n.push({
      id: `tfout:${f.id}`,
      sourceId: f.id,
      targetId: r(f.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${f.name} — Supr la desconecta`
    });
  }
  for (const f of a)
    if (!(!f.sourceModelId || !f.targetModelId) && !(!l.has(f.sourceModelId) || !l.has(f.targetModelId))) {
      n.push({
        id: `mapping:${f.id}`,
        sourceId: f.sourceModelId,
        targetId: f.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: f.name,
        arrow: !0,
        tooltip: `${f.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const h of f.rules ?? []) {
        const x = Ii(f.sourceModelId, h.sourceFieldId ?? ""), d = Ii(f.targetModelId, h.targetFieldId ?? "");
        !l.has(x) || !l.has(d) || n.push({
          id: `maprule:${f.id}:${h.id}`,
          sourceId: x,
          targetId: d,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${f.name} — Supr la elimina`
        });
      }
    }
  const p = new Set(
    a.filter((f) => f.sourceModelId && f.targetModelId).map((f) => `${f.sourceModelId}->${f.targetModelId}`)
  ), g = new Map(
    e.modules.flatMap((f) => (f.useCases ?? []).map((h) => [h.id, h]))
  ), y = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const h of f.buttons ?? []) {
        if (!h.useCaseId || h.mappingId) continue;
        const x = g.get(h.useCaseId);
        if (!(x != null && x.inputModelId) || x.inputModelId === f.modelId) continue;
        const d = `${f.modelId}->${x.inputModelId}`;
        p.has(d) || y.has(d) || (y.add(d), !(!l.has(f.modelId) || !l.has(x.inputModelId)) && n.push({
          id: `mapgap:${f.id}:${h.useCaseId}`,
          sourceId: f.modelId,
          targetId: x.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${h.label}» (página ${f.name}) llama a ${x.name}: falta mapear ${s(f.modelId)} → ${s(x.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: n };
}
const rn = 560, bi = 34, vi = 14, dn = 150, wi = 40, xi = 12, ki = 150, it = 40, _c = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, $c = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Sc(e, t) {
  const i = [], n = [], o = e.etlFlows ?? [], a = new Map(e.modules.map((d) => [d.id, d.name])), s = new Map(
    e.modules.flatMap((d) => [
      ...(d.domainEvents ?? []).map((c) => [c.id, c.name]),
      ...(d.applicationEvents ?? []).map((c) => [c.id, c.name])
    ])
  );
  let l = 140;
  for (const d of o) {
    const c = d.steps ?? [], m = [[], [], []];
    c.forEach((L) => m[_c(L.type)].push(L));
    const k = Math.max(1, ...m.map((L) => L.length)), b = bi + vi + k * (wi + xi), C = t[d.id] ?? { x: 420, y: l };
    l = C.y + b + 110, i.push({
      id: d.id,
      label: d.name,
      x: C.x,
      y: C.y,
      w: rn,
      h: b,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${d.name} — integrador${d.ownerModuleId ? ` de ${a.get(d.ownerModuleId) ?? d.ownerModuleId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), m.forEach((L, R) => {
      const z = C.x - rn / 2 + vi + dn / 2 + R * (rn - 2 * vi - dn) / 2;
      L.forEach((W, w) => {
        const E = $c[R];
        if (i.push({
          id: W.id,
          label: W.name ?? W.id,
          x: z,
          y: C.y - b / 2 + bi + wi / 2 + w * (wi + xi),
          w: dn,
          h: wi,
          kind: "etl-step",
          symbol: E.symbol,
          fill: E.fill,
          stroke: E.stroke,
          badge: W.type === "SOURCE_PULL" ? "PULL" : W.type === "SOURCE_CONSUMER" ? "CONSUME" : W.type === "TRANSFORM" ? "TRANSFORM" : W.type === "WRITE_API" ? "→ API" : W.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: d.id,
          tooltip: `${W.name ?? W.id} (${W.type})${W.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), R > 0) {
          const H = m[R - 1], ne = H[Math.min(w, H.length - 1)];
          ne && n.push({
            id: `etlpipe:${d.id}:${ne.id}->${W.id}`,
            sourceId: ne.id,
            targetId: W.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const r = new Set(i.map((d) => d.id)), p = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.apiId)).filter(Boolean)), y = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.eventId)).filter(Boolean));
  let f = 120;
  for (const d of e.externalSystems) {
    const c = (d.tables ?? []).filter((b) => p.has(b.id));
    if (!c.length) continue;
    const m = bi + vi + c.length * (it + xi), k = t[d.id] ?? { x: -140, y: f };
    f = k.y + m + 90, i.push({
      id: d.id,
      label: d.name,
      x: k.x,
      y: k.y,
      w: ki + 30,
      h: m,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${d.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), r.add(d.id), c.forEach((b, C) => {
      i.push({
        id: b.id,
        label: b.name,
        x: k.x,
        y: k.y - m / 2 + bi + it / 2 + C * (it + xi),
        w: ki,
        h: it,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: d.id,
        tooltip: `${b.name} — tabla legacy de ${d.name}`
      }), r.add(b.id);
    });
  }
  let h = 120;
  for (const d of e.apis ?? []) {
    if (!g.has(d.id)) continue;
    const c = t[d.id] ?? { x: 1e3, y: h };
    h = c.y + it + 70, i.push({
      id: d.id,
      label: d.name,
      x: c.x,
      y: c.y,
      w: ki,
      h: it,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${d.name} — API que un integrador consume o llama`
    }), r.add(d.id);
  }
  let x = 400;
  for (const d of y) {
    const c = d, m = t[c] ?? { x: 1e3, y: x };
    x = m.y + it + 70, i.push({
      id: c,
      label: s.get(c) ?? c,
      x: m.x,
      y: m.y,
      w: ki,
      h: it,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), r.add(c);
  }
  for (const d of o)
    for (const c of d.steps ?? []) {
      const m = c.externalTableId ?? c.apiId ?? c.eventId;
      if (!m || !r.has(m) || !r.has(c.id)) continue;
      const k = c.type.startsWith("SOURCE");
      n.push({
        id: `etl:${d.id}:${c.id}`,
        sourceId: k ? m : c.id,
        targetId: k ? c.id : m,
        kind: k ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: c.type === "SOURCE_PULL" ? "pull" : c.type === "SOURCE_CONSUMER" ? "consume" : c.type === "WRITE_API" ? "api" : c.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: k ? `${d.name} lee de aquí — Supr quita el paso` : `${d.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function Ec(e, t) {
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
  }, s = await n.layout(a), l = {};
  for (const r of s.children ?? [])
    l[r.id] = {
      x: (r.x ?? 0) + (r.width ?? 0) / 2,
      y: (r.y ?? 0) + (r.height ?? 0) / 2
    };
  return l;
}
var Cc = Object.defineProperty, Mc = Object.getOwnPropertyDescriptor, Re = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Mc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Cc(t, i, o), o;
};
const Ac = /* @__PURE__ */ new Set([
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
let Ce = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._selected = /* @__PURE__ */ new Set(), this._rubber = null, this._renaming = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, s;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], i = (s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".h3");
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
      const n = e.shiftKey || this._space || e.button === 1, o = n ? null : this.plateAt(e);
      if (!o && !n && !e.altKey) {
        const l = this.getBoundingClientRect();
        this._rubber = {
          x1: e.clientX - l.left,
          y1: e.clientY - l.top,
          x2: e.clientX - l.left,
          y2: e.clientY - l.top,
          additive: !1
        }, this._drag = { mode: "rubber", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan }, moved: !1 };
        return;
      }
      this._drag = {
        mode: o ? "node" : n ? "pan" : "orbit",
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        nodeId: o == null ? void 0 : o.dataset.nodeId,
        nodeKind: o == null ? void 0 : o.dataset.kind,
        moved: !1
      };
    }, this.onMove = (e) => {
      var n, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const s = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), l = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".n3"), r = (l == null ? void 0 : l.dataset.nodeId) ?? null;
        this._hoverTargetId = r !== this._connect.sourceId ? r : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, i) > 3 && (this._drag.moved = !0);
        const a = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - a.left, y2: e.clientY - a.top };
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
        if (e.mode === "rubber") {
          const i = this._rubber;
          if (this._rubber = null, i && e.moved) {
            const n = this.getBoundingClientRect(), o = Math.min(i.x1, i.x2) + n.left, a = Math.max(i.x1, i.x2) + n.left, s = Math.min(i.y1, i.y2) + n.top, l = Math.max(i.y1, i.y2) + n.top, r = [];
            this.renderRoot.querySelectorAll(".n3").forEach((p) => {
              const g = p.getBoundingClientRect(), y = g.left + g.width / 2, f = g.top + g.height / 2, h = p.dataset.nodeId;
              h && y >= o && y <= a && f >= s && f <= l && r.push(h);
            }), this._selected = new Set(r);
          } else
            this._selected = /* @__PURE__ */ new Set(), this.emit("selection-cleared");
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
      var n, o;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), i = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".n3")) ?? this.plateAt(e);
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
      if (e.key === "Delete" || e.key === "Backspace") {
        if (this._selected.size) {
          e.preventDefault();
          const t = this.scene.nodes.filter((i) => this._selected.has(i.id)).map((i) => ({ id: i.id, kind: i.kind }));
          this._selected = /* @__PURE__ */ new Set(), t.length && this.emit("delete-selection-requested", { items: t });
          return;
        }
        if (this.selectedId) {
          const t = this.scene.nodes.find((i) => i.id === this.selectedId);
          t && (e.preventDefault(), this.emit("delete-requested", { elementType: "node", id: t.id, kind: t.kind }));
        }
        return;
      }
      if (e.key === "F2") {
        const t = this._selected.size === 1 ? [...this._selected][0] : this.selectedId, i = t ? this.scene.nodes.find((n) => n.id === t) : void 0;
        i && (e.preventDefault(), this._renaming = { id: i.id, kind: i.kind ?? "node", value: i.label });
        return;
      }
      e.key === "Escape" && (this._selected = /* @__PURE__ */ new Set(), this._renaming = null, this.emit("selection-cleared"));
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
    const i = e / this._kUsed, n = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), o = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(o) + n * Math.sin(o),
      y: -i * Math.sin(o) + n * Math.cos(o)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var n, o, a;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((a = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, o = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const s = new DOMMatrix().translate(n, o).multiply(a).translate(-n, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), l = s.transformPoint(new DOMPoint(0, 0, 0, 1)), r = s.transformPoint(new DOMPoint(1, 0, 0, 0)), p = s.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, y = t - i.top, f = r.x - g * r.w, h = p.x - g * p.w, x = r.y - y * r.w, d = p.y - y * p.w, c = g * l.w - l.x, m = y * l.w - l.y, k = f * d - h * x;
    return k ? { x: (c * d - h * m) / k, y: (f * m - c * x) / k } : { ...this._center };
  }
  updated(e) {
    var t;
    e.has("_renaming") && this._renaming && ((t = this.renderRoot.querySelector(".rename3")) == null || t.select());
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const o = t.get(n.id);
      if (o !== void 0) return o;
      const a = n.parentId ? e.get(n.parentId) : void 0, s = a ? i(a) + 1 : 0;
      return t.set(n.id, s), s;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return M`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((c) => [c.id, c])), n = Math.min(...e.map((c) => c.x - c.w / 2)) - 60, o = Math.max(...e.map((c) => c.x + c.w / 2)) + 60, a = Math.min(...e.map((c) => c.y - c.h / 2)) - 60, s = Math.max(...e.map((c) => c.y + c.h / 2)) + 60, l = (n + o) / 2, r = (a + s) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (o - n), p.height / (s - a), 1) * 0.9 : 0.5, y = this._k * g;
    this._kUsed = y, this._center = { x: l, y: r };
    const f = 30, h = this._liveMove, x = (c) => c.x + ((h == null ? void 0 : h.id) === c.id ? h.dx : 0), d = (c) => c.y + ((h == null ? void 0 : h.id) === c.id ? h.dy : 0);
    return M`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${y}, ${y}, ${y}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-l}px, ${-r}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${a}px"
            width=${o - n}
            height=${s - a}
            viewBox="${n} ${a} ${o - n} ${s - a}"
          >
            ${this.scene.edges.map((c) => {
      const m = i.get(c.sourceId), k = i.get(c.targetId);
      return !m || !k ? "" : ie`<line
                x1=${x(m)} y1=${d(m)} x2=${x(k)} y2=${d(k)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((c) => {
      const m = i.get(c.sourceId), k = i.get(c.targetId);
      if (!m || !k) return "";
      const b = (t.get(m.id) ?? 0) * f + 2, C = (t.get(k.id) ?? 0) * f + 2, L = x(k) - x(m), R = d(k) - d(m), z = C - b, W = Math.hypot(L, R), w = Math.hypot(W, z), E = Math.atan2(R, L) * 180 / Math.PI, H = Math.atan2(z, W) * 180 / Math.PI, ne = c.color ?? "#64748b", te = c.dashed ? `repeating-linear-gradient(90deg, ${ne} 0 6px, transparent 6px 10px)` : ne;
      return M`<div
              class="edge3"
              style="
                left: ${x(m)}px; top: ${d(m)}px; width: ${w}px; height: 1.7px;
                transform: translateZ(${b}px) rotateZ(${E}deg) rotateY(${-H}deg);
                background: ${te};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((c) => {
      const m = t.get(c.id) ?? 0, k = c.container || m === 0, b = this._hoverTargetId === c.id;
      return M`
              <div
                class="n3 ${c.container ? "container3" : ""} ${this.selectedId === c.id || this._selected.has(c.id) ? "selected3" : ""} ${b ? "hover3" : ""}"
                data-node-id=${c.id}
                data-kind=${c.kind}
                title=${c.tooltip ?? c.label}
                style="
                  left: ${x(c) - c.w / 2}px; top: ${d(c) - c.h / 2}px;
                  width: ${c.w}px; height: ${c.h}px;
                  transform: translateZ(${m * f + (b ? 8 : 0)}px)${b ? " scale(1.06)" : ""};
                  background: ${c.container ? "color-mix(in srgb, " + (c.fill ?? "#ffffff") + " 82%, transparent)" : c.fill ?? "#ffffff"};
                  border-color: ${c.stroke ?? "#64748b"};
                  border-style: ${c.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${k ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${c.badge ? M`<span class="badge3" style="color: ${c.stroke ?? "#94a3b8"}">${c.badge}</span>` : ""}
                <span>${c.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const c = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!c || !Ac.has(c.kind)) return "";
      const m = (t.get(c.id) ?? 0) * f + 4;
      return [
        [x(c) + c.w / 2, d(c)],
        [x(c) - c.w / 2, d(c)],
        [x(c), d(c) + c.h / 2],
        [x(c), d(c) - c.h / 2]
      ].map(
        ([b, C]) => M`<div
                class="h3"
                data-source-id=${c.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${b}px; top: ${C}px; transform: translateZ(${m}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? M`<svg class="rubber">
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
      ${this._rubber ? M`<div
            class="lasso"
            style="left: ${Math.min(this._rubber.x1, this._rubber.x2)}px; top: ${Math.min(
      this._rubber.y1,
      this._rubber.y2
    )}px; width: ${Math.abs(this._rubber.x2 - this._rubber.x1)}px; height: ${Math.abs(
      this._rubber.y2 - this._rubber.y1
    )}px"
          ></div>` : ""}
      ${this._renaming ? (() => {
      const c = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), m = this.getBoundingClientRect(), k = c == null ? void 0 : c.getBoundingClientRect(), b = k ? k.left + k.width / 2 - m.left : m.width / 2, C = k ? k.bottom - m.top + 6 : m.height / 2;
      return M`<input
              class="rename3"
              style="left: ${b}px; top: ${C}px"
              .value=${this._renaming.value}
              @pointerdown=${(L) => L.stopPropagation()}
              @input=${(L) => this._renaming = { ...this._renaming, value: L.target.value }}
              @keydown=${(L) => {
        if (L.stopPropagation(), L.key === "Escape" && (this._renaming = null), L.key === "Enter") {
          const R = this._renaming, z = R.value.trim();
          this._renaming = null;
          const W = this.scene.nodes.find((w) => w.id === R.id);
          z && W && z !== W.label && this.emit("node-renamed", { id: R.id, kind: R.kind, name: z });
        }
      }}
              @blur=${() => this._renaming = null}
            />`;
    })() : ""}
      <div class="hud">
        click selecciona · arrastra el fondo: selección múltiple · alt+arrastra orbita · doble click abre ·
        arrastra una placa para moverla · shift, espacio o botón central+arrastra panea · rueda para zoom ·
        Supr borra · F2 renombra · doble click en el fondo resetea
      </div>
    `;
  }
};
Ce.styles = vt`
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
    .lasso {
      position: absolute;
      z-index: 5;
      pointer-events: none;
      border: 1.2px dashed #38bdf8;
      background: rgba(56, 189, 248, 0.09);
      border-radius: 3px;
    }
    .rename3 {
      position: absolute;
      transform: translateX(-50%);
      z-index: 7;
      font: 12px system-ui, sans-serif;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1.5px solid #38bdf8;
      background: #0f172a;
      color: #e2e8f0;
      outline: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
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
Re([
  se({ attribute: !1 })
], Ce.prototype, "scene", 2);
Re([
  se({ attribute: !1 })
], Ce.prototype, "selectedId", 2);
Re([
  se({ attribute: !1 })
], Ce.prototype, "connectable", 2);
Re([
  U()
], Ce.prototype, "_rx", 2);
Re([
  U()
], Ce.prototype, "_rz", 2);
Re([
  U()
], Ce.prototype, "_k", 2);
Re([
  U()
], Ce.prototype, "_pan", 2);
Re([
  U()
], Ce.prototype, "_liveMove", 2);
Re([
  U()
], Ce.prototype, "_connect", 2);
Re([
  U()
], Ce.prototype, "_hoverTargetId", 2);
Re([
  U()
], Ce.prototype, "_selected", 2);
Re([
  U()
], Ce.prototype, "_rubber", 2);
Re([
  U()
], Ce.prototype, "_renaming", 2);
Ce = Re([
  wt("modux-tilt")
], Ce);
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, Ie = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Tc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Pc(t, i, o), o;
};
const So = [
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
let re = class extends Ve {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? M`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? M`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? M`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? M`<div class="control">••••••••</div>` : t === "email" ? M`<div class="control">nombre@dominio.com</div>` : t === "money" ? M`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? M`<div class="control">──────●──</div>` : t === "stars" ? M`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? M`<div class="control area">🖼</div>` : t === "link" ? M`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? M`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? M`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? M`<div class="control" style="justify-content:flex-end">0</div>` : M`<div class="control">Texto…</div>`;
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
    var n;
    let t = null;
    const i = (o) => {
      for (const a of o ?? [])
        a.id === e && (t = a), i(a.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (o, a) => {
      for (const s of o ?? [])
        s.id === e && (t = a), i(s.children, s);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const n = (s) => {
      s.id === e && (i = !0);
      for (const l of s.children ?? []) n(l);
    }, o = (s) => {
      for (const l of s ?? [])
        l.id === t ? n(l) : o(l.children);
    };
    return o((a = this.page) == null ? void 0 : a.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], n = i.findIndex((a) => a.id === e);
    return n >= 0 ? i[n + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), n = (t.clientY - i.top) / Math.max(1, i.height);
    return re.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const s = (e.children ?? []).filter((r) => r.kind === "tab"), l = s.find((r) => r.id === this._activeTabs[e.id]) ?? s[0];
      l && (e = l);
    }
    if (t === "into" && !re.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var a, s;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const l = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!l) return;
      let r;
      try {
        r = JSON.parse(l);
      } catch {
        return;
      }
      if (!r.componentId || !r.pageId || r.pageId === ((s = this.page) == null ? void 0 : s.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: r.pageId, componentId: r.componentId, ...p });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var r, p, g;
    const t = e.children ?? [], i = (y) => y.map((f) => this.renderComponent(f)), n = M`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = M`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const y = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        o = M`<div class="row-lay">
          <div class="col-lay">${y.length ? i(y) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = M`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = M`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const y = t.filter((h) => h.kind === "tab"), f = y.find((h) => h.id === this._activeTabs[e.id]) ?? y[0];
        o = M`
          <div class="tabbar">
            ${y.map(
          (h, x) => M`<span
                class=${h === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(d) => {
            d.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: h.id }, this.emitEvent("component-selected", { componentId: h.id });
          }}
                @dblclick=${(d) => {
            d.stopPropagation(), this._cmp = { ...h };
          }}
                @dragstart=${(d) => {
            var c, m;
            d.stopPropagation(), this._dragCmpId = h.id, (m = d.dataTransfer) == null || m.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (c = this.page) == null ? void 0 : c.id, componentId: h.id })
            );
          }}
                @dragover=${(d) => {
            var c;
            ((c = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : c.kind) === "tab" && (d.preventDefault(), d.stopPropagation());
          }}
                @drop=${(d) => {
            var C, L;
            const c = this._dragCmpId;
            if (!c || c === h.id || ((C = this.nodeById(c)) == null ? void 0 : C.kind) !== "tab") return;
            d.preventDefault(), d.stopPropagation();
            const m = d.currentTarget.getBoundingClientRect(), b = d.clientX - m.left < m.width / 2 ? h.id : ((L = y[x + 1]) == null ? void 0 : L.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, b !== c && this.emitEvent("component-moved", {
              componentId: c,
              toParentId: e.id,
              beforeComponentId: b
            });
          }}
                >${h.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : n}`;
        break;
      }
      case "tab":
        o = M`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        o = M`<div class="col-lay">
          ${t.length ? t.map(
          (y, f) => M`
                  <div class="acc-bar"><span>${y.title ?? y.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(y) : ae}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        o = M`<div class="card-box">
          ${e.title ? M`<div class="card-title">${e.title}</div>` : ae}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        o = M`<div class="grid3-lay">
          ${t.length ? t.map((y) => M`<div class="board-col">${this.renderComponent(y)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [y, ...f] = t;
        o = M`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${y ? this.renderComponent(y) : M`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : M`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = M`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        o = M`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = M`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((r = this.page) == null ? void 0 : r.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = f.length ? M`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (h) => M`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${h.label ?? h.name}</label>${this.control(h)}</div>`
        )}
            </div>` : M`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const y = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = M`<table>
            <tr>${y.length ? y.map((f) => M`<th>${f.label ?? f.name}</th>`) : M`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => M`<tr>${(y.length ? y : [1, 2, 3]).map(() => M`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? ae : M`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = M`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const y = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = M`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(y)}`;
        break;
      }
      case "text":
        o = M`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = M`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = M`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = M`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const a = re.LEAF_KINDS.has(e.kind), s = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), l = (y) => {
      var f, h;
      y.stopPropagation(), this._dragCmpId = e.id, (h = y.dataTransfer) == null || h.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), y.dataTransfer && (y.dataTransfer.effectAllowed = "move");
    };
    return M`<div
      class="cmp ${a ? "leafcmp" : ""} ${s ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(y) => {
      y.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(y) => {
      y.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${l}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(y) => {
      var h;
      y.preventDefault(), y.stopPropagation();
      const f = ((h = y.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, y) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(y) => {
      var f, h, x;
      this._foreignOver = !1, !(!this._dragCmpId && !((x = (h = (f = y.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : h.includes) != null && x.call(h, "application/x-modux-cmp"))) && (y.preventDefault(), y.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, y));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${l}
        >${re.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return M`
        ${i ? M`<table>
              <tr>${t.slice(0, 4).map((n) => M`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => M`<tr>${t.slice(0, 4).map(() => M`<td>···</td>`)}</tr>`)}
            </table>` : ae}
        ${t.length ? M`<div class="grid">
              ${t.map(
      (n) => M`
                  <div
                    class="field ${n.colspan === 2 ? "span2" : ""} ${this._overId === n.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${n.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(n)}
                    @dragstart=${(o) => {
        o.stopPropagation(), this._dragId = n.fieldId;
      }}
                    @dragover=${(o) => {
        o.preventDefault(), this._overId = n.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(o) => {
        o.preventDefault(), o.stopPropagation(), this.onDrop(n.fieldId);
      }}
                  >
                    <label>${n.label ?? n.name}</label>
                    ${this.control(n)}
                  </div>
                `
    )}
            </div>` : M`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, a, s, l;
    const e = this._cmp;
    if (!e) return ae;
    const t = (r) => this._cmp = { ...this._cmp, ...r }, i = e.kind, n = [
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
    return M`<div class="pop" @click=${(r) => r.stopPropagation()}>
      ${n ? M`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(r) => t({ title: r.target.value })} />` : ae}
      ${i === "text" ? M`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(r) => t({ text: r.target.value })} />` : ae}
      ${i === "button" || i === "field" ? M`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(r) => t({ label: r.target.value })} />` : ae}
      ${i === "button" ? M`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? M`<span class="chip">${((o = this.useCases.find((r) => r.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : M`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? M`<span class="chip"
                      >${((a = this.mappings.find((r) => r.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : M`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : ae}
      ${i === "form" ? M`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? M`<span class="chip"
                      >${((s = this.models.find((r) => r.id === e.modelId)) == null ? void 0 : s.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : M`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : ae}
      ${i === "listing" ? M`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? M`<span class="chip"
                      >${((l = this.queryOps.find((r) => r.id === e.queryOperationId)) == null ? void 0 : l.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : M`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : ae}
      ${i === "field" ? M`<label>Estereotipo</label>
            <select @change=${(r) => t({ stereotype: r.target.value || void 0 })}>
              ${So.map((r) => M`<option value=${r} ?selected=${r === (e.stereotype ?? "regular")}>${r}</option>`)}
            </select>` : ae}
      ${i === "tabLayout" ? M`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : ae}
      <div class="actions">
        <button
          @click=${() => {
      const r = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: r });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const r = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: r.id,
        title: r.title ?? null,
        text: r.text ?? null,
        label: r.label ?? null,
        useCaseId: r.useCaseId ?? null,
        mappingId: r.mappingId ?? null,
        modelId: r.modelId ?? null,
        queryServiceId: r.queryServiceId ?? null,
        queryOperationId: r.queryOperationId ?? null,
        fieldId: r.fieldId ?? null,
        stereotype: r.stereotype ?? null,
        colspan: r.colspan ?? null
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), n = i.indexOf(t), o = i.indexOf(e);
    n < 0 || o < 0 || (i.splice(o, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return ae;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return M`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? M`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : M`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? M`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : M`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => M`<span
            class="btn"
            data-btn-uc=${o.useCaseId ?? ""}
            title=${o.mappingId ? `${o.useCaseId} · mapping ${o.mappingId}` : `${o.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
            @click=${() => this._btn = {
        useCaseId: o.useCaseId ?? "",
        label: o.label ?? "",
        mappingId: o.mappingId ?? "",
        bar: o.bar ?? "toolbar"
      }}
            >${o.label}</span
          >`
    )}
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? ae : M`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? M`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : M`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${n ? M`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const s = (e.wizardSteps ?? []).map((r, p) => r.id ?? r.pageId ?? String(p)), l = s[a];
      return M`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(r) => {
        r.stopPropagation(), this._dragWizKey = l;
      }}
                      @dragover=${(r) => {
        this._dragWizKey && (r.preventDefault(), r.stopPropagation());
      }}
                      @drop=${(r) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === l) return;
        r.preventDefault(), r.stopPropagation();
        const g = r.currentTarget.getBoundingClientRect(), f = r.clientX - g.left < g.width / 2 ? l : s[a + 1] ?? null;
        f !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : M`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : ae}
        ${(e.content ?? []).length ? M`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => M`<span
              class="btn"
              data-btn-uc=${o.useCaseId ?? ""}
              title=${o.mappingId ? `${o.useCaseId} · mapping ${o.mappingId}` : `${o.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
              @click=${() => this._btn = {
        useCaseId: o.useCaseId ?? "",
        label: o.label ?? "",
        mappingId: o.mappingId ?? "",
        bar: "bottom"
      }}
              >${o.label}</span
            >`
    )}
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? ae : M`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, s, l;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((r) => r.useCaseId === this._btn.useCaseId);
      return M`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((s = this.useCases.find((r) => r.id === this._btn.useCaseId)) == null ? void 0 : s.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(r) => this._btn = { ...this._btn, label: r.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? M`<span class="chip"
                        >${((l = this.mappings.find((r) => r.id === this._btn.mappingId)) == null ? void 0 : l.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : M`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? M`<button
                      @click=${() => {
        const r = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: r });
      }}
                    >
                      Quitar
                    </button>` : ae}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : ae}
      ${this._editing ? M`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${So.map(
      (o) => M`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
    )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(o) => this._editing = { ...this._editing, colspan: Number(o.target.value) }}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(o) => this._editing = { ...this._editing, label: o.target.value }}
            />
            <div class="actions">
              <button @click=${() => this._editing = null}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>` : ae}
    `;
  }
};
re.styles = vt`
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
re.KIND_LABELS = {
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
re.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
Ie([
  se({ attribute: !1 })
], re.prototype, "page", 2);
Ie([
  se({ type: Boolean, reflect: !0 })
], re.prototype, "framed", 2);
Ie([
  se({ attribute: !1 })
], re.prototype, "models", 2);
Ie([
  se({ attribute: !1 })
], re.prototype, "mappings", 2);
Ie([
  se({ attribute: !1 })
], re.prototype, "useCases", 2);
Ie([
  se({ attribute: !1 })
], re.prototype, "queryOps", 2);
Ie([
  se({ attribute: !1 })
], re.prototype, "selectedCmpId", 2);
Ie([
  U()
], re.prototype, "_editing", 2);
Ie([
  U()
], re.prototype, "_dragId", 2);
Ie([
  U()
], re.prototype, "_overId", 2);
Ie([
  U()
], re.prototype, "_rename", 2);
Ie([
  U()
], re.prototype, "_route", 2);
Ie([
  U()
], re.prototype, "_btn", 2);
Ie([
  U()
], re.prototype, "_cmp", 2);
Ie([
  U()
], re.prototype, "_dragCmpId", 2);
Ie([
  U()
], re.prototype, "_dragWizKey", 2);
Ie([
  U()
], re.prototype, "_overCmpId", 2);
Ie([
  U()
], re.prototype, "_overCmpPos", 2);
Ie([
  U()
], re.prototype, "_foreignOver", 2);
Ie([
  U()
], re.prototype, "_activeTabs", 2);
re = Ie([
  wt("modux-page-designer")
], re);
var Oc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, Le = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Nc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Oc(t, i, o), o;
};
const ga = 460, Rc = 540, Lc = 660;
let Me = class extends Ve {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId, s = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: s.w, h0: s.h }, e.preventDefault();
        return;
      }
      const n = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-title");
      });
      if (n) {
        const a = n.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: a }), e.preventDefault();
          return;
        }
        const s = this.pages.findIndex((r) => r.id === a), l = this.posOf(a, s);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: l.x, oy: l.y, moved: !1 }, e.preventDefault();
        return;
      }
      if (!t.some((o) => o.tagName === "MODUX-PAGE-DESIGNER")) {
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
      const i = (e.clientX - t.x) / this._t.k, n = (e.clientY - t.y) / this._t.k;
      if (t.mode === "resize") {
        this._liveSize = {
          id: t.id,
          w: Math.max(280, Math.round(t.w0 + i)),
          h: Math.max(220, Math.round(t.h0 + n))
        };
        return;
      }
      Math.abs(i) + Math.abs(n) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + i, y: t.oy + n };
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * o));
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
    var g, y, f, h, x, d;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), n = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), s = (f = a == null ? void 0 : a.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), l = (h = s == null ? void 0 : s.closest) == null ? void 0 : h.call(s, "[data-btn-uc]");
    if (l != null && l.dataset.btnUc) return `btn:${o}:${l.dataset.btnUc}`;
    const r = (x = s == null ? void 0 : s.closest) == null ? void 0 : x.call(s, "[data-bar]");
    if (r != null && r.dataset.bar) return `bar:${o}:${r.dataset.bar}`;
    const p = (d = s == null ? void 0 : s.closest) == null ? void 0 : d.call(s, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, h, x, d;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), n = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), s = (x = a == null ? void 0 : a.shadowRoot) == null ? void 0 : x.elementFromPoint(e, t), l = (d = s == null ? void 0 : s.closest) == null ? void 0 : d.call(s, "[data-cmp-id]");
    if (!l) return { pageId: o, componentId: null, pos: "into" };
    const r = l.dataset.cmpKind ?? "", p = l.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), y = re.LEAF_KINDS.has(r) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: l.dataset.cmpId, pos: y };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: ga, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Rc, y: Math.floor(t / 3) * Lc };
  }
  render() {
    return M`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
      return M`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${n.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${n.h}px; width: ${n.w}px"
                .page=${e}
                .selectedCmpId=${((a = this.selectedCmp) == null ? void 0 : a.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(s) => {
        s.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...s.detail });
      }}
                @component-removed=${(s) => {
        s.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...s.detail });
      }}
                @component-moved=${(s) => {
        s.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...s.detail });
      }}
                @component-selected=${(s) => {
        s.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...s.detail });
      }}
                @component-transferred=${(s) => {
        s.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...s.detail });
      }}
                @wizard-step-moved=${(s) => {
        s.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...s.detail });
      }}
                @page-renamed=${(s) => {
        s.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...s.detail });
      }}
                @page-type-changed=${(s) => {
        s.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...s.detail });
      }}
                @page-route-changed=${(s) => {
        s.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...s.detail });
      }}
                @page-model-changed=${(s) => {
        s.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...s.detail });
      }}
                @button-added=${(s) => this.emit("page-button-added", { pageId: e.id, ...s.detail })}
                @button-changed=${(s) => this.emit("page-button-changed", { pageId: e.id, ...s.detail })}
                @button-removed=${(s) => this.emit("page-button-removed", { pageId: e.id, ...s.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(s) => this.emit("page-field-config-changed", { pageId: e.id, ...s.detail })}
                @fields-reordered=${(s) => this.emit("page-fields-reordered", { pageId: e.id, ...s.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : M`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Me.styles = vt`
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
      width: ${ga}px;
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
Le([
  se({ attribute: !1 })
], Me.prototype, "pages", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "layout", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "sizes", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "selectedId", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "selectedIds", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "models", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "mappings", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "useCases", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "queryOps", 2);
Le([
  se({ attribute: !1 })
], Me.prototype, "selectedCmp", 2);
Le([
  U()
], Me.prototype, "_t", 2);
Le([
  U()
], Me.prototype, "_live", 2);
Le([
  U()
], Me.prototype, "_liveSize", 2);
Me = Le([
  wt("modux-figma")
], Me);
var Dc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? zc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Dc(t, i, o), o;
};
const Uc = {
  root: "#334155",
  module: "#0369a1",
  group: "#6366f1",
  "external-system": "#9333ea",
  "ui-app": "#16a34a",
  page: "#22c55e",
  actor: "#f59e0b",
  workflow: "#7c3aed",
  "identity-provider": "#ca8a04",
  "ai-agent": "#e11d48",
  aggregate: "#0d9488",
  entity: "#14b8a6",
  "use-case": "#2563eb",
  policy: "#7c3aed",
  "domain-event": "#ea580c",
  "application-event": "#fb923c",
  "read-model": "#475569",
  "domain-service": "#0891b2",
  "query-service": "#64748b",
  "scheduled-trigger": "#d97706",
  "etl-flow": "#0f766e",
  notification: "#db2777",
  document: "#475569",
  api: "#7c3aed",
  "api-operation": "#8b5cf6",
  "external-use-case": "#a855f7",
  "external-table": "#94a3b8",
  "mcp-server": "#c026d3"
}, ln = {
  root: "Sistema",
  module: "Bounded context",
  group: "Grupo",
  "external-system": "Sistema externo",
  "ui-app": "App",
  page: "Página",
  actor: "Actor",
  workflow: "Workflow",
  "identity-provider": "IdP",
  "ai-agent": "Agente IA",
  aggregate: "Agregado",
  entity: "Entidad",
  "use-case": "Caso de uso",
  policy: "Policy",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Servicio de consulta",
  "scheduled-trigger": "Trigger programado",
  "etl-flow": "Flujo ETL",
  notification: "Notificación",
  document: "Documento",
  api: "API",
  "api-operation": "Operación",
  "external-use-case": "Caso de uso externo",
  "external-table": "Tabla externa",
  "mcp-server": "MCP"
}, qc = {
  module: "bounded contexts",
  "external-system": "sistemas externos",
  "ui-app": "apps",
  page: "páginas",
  actor: "actores",
  workflow: "workflows",
  "identity-provider": "IdPs",
  "ai-agent": "agentes IA",
  aggregate: "agregados",
  entity: "entidades",
  "use-case": "casos de uso",
  policy: "policies",
  "domain-event": "eventos de dominio",
  "application-event": "eventos de aplicación",
  "read-model": "read models",
  "domain-service": "servicios de dominio",
  "query-service": "servicios de consulta",
  "scheduled-trigger": "triggers programados",
  "etl-flow": "flujos ETL",
  notification: "notificaciones",
  document: "documentos",
  api: "APIs",
  "api-operation": "operaciones",
  "external-use-case": "casos de uso externos",
  "external-table": "tablas externas",
  "mcp-server": "MCPs"
}, Eo = [30, 20, 13, 9.5, 7.5], Co = [0, 180, 118, 80, 58], Fc = 0.055, Bc = 0.86, Wc = 2600, _i = 240, Mo = 0.16, Ao = 0.015;
let be = class extends Ve {
  constructor() {
    super(...arguments), this.shifted = !1, this.scene = null, this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this._motion = 1, this._threads = !1, this._viewNaming = !1, this._viewName = "", this._space = !1, this.selected = /* @__PURE__ */ new Set(), this.renaming = null, this.onSpaceKey = (e) => {
      if (e.code !== "Space") return;
      const t = e.composedPath()[0];
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA") || (this._space = e.type === "keydown", this.canvas && (this.canvas.style.cursor = this._space ? "grab" : "default"));
    }, this.onKeydown = (e) => {
      const t = e.composedPath()[0];
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        e.preventDefault(), this.emitUp(e.shiftKey ? "redo-requested" : "undo-requested");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
        e.preventDefault(), this.emitUp("redo-requested");
        return;
      }
      if (e.key === "Escape") {
        this.selected = /* @__PURE__ */ new Set(), this.renaming = null;
        return;
      }
      const i = this.selectedNodes();
      if (e.key === "F2" && i.length === 1) {
        e.preventDefault(), this.renaming = { key: i[0].key, value: i[0].label };
        return;
      }
      (e.key === "Delete" || e.key === "Backspace") && i.length && (e.preventDefault(), i.length > 1 ? this.emitUp("delete-selection-requested", {
        items: i.map((n) => ({ id: n.refId, kind: n.kind }))
      }) : this.emitUp("delete-requested", {
        elementType: "node",
        id: i[0].refId,
        kind: i[0].kind
      }), this.selected = /* @__PURE__ */ new Set());
    }, this.frame = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches, this.tabIndex = 0, window.addEventListener("keydown", this.onSpaceKey), window.addEventListener("keyup", this.onSpaceKey), this.addEventListener("keydown", this.onKeydown);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this.saveState(), cancelAnimationFrame(this.raf), (e = this.ro) == null || e.disconnect(), window.removeEventListener("keydown", this.onSpaceKey), window.removeEventListener("keyup", this.onSpaceKey), this.removeEventListener("keydown", this.onKeydown);
  }
  /** The nodes behind the current selection keys, resolved against the live tree. */
  selectedNodes() {
    return this.selected.size ? this.visible().filter((e) => this.selected.has(e.key)) : [];
  }
  emitUp(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  saveState() {
    if (!this.root) return;
    const e = {}, t = (i) => {
      e[i.key] = { e: i.expanded ? 1 : 0, x: Math.round(i.x), y: Math.round(i.y) };
      for (const n of i.children ?? []) t(n);
    };
    t(this.root);
    try {
      sessionStorage.setItem(be.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(be.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam);
      for (const [i, n] of Object.entries(t.nodes ?? {})) {
        const o = {
          key: i,
          refId: "",
          kind: "",
          label: "",
          color: "",
          depth: 0,
          expanded: n.e === 1,
          x: n.x,
          y: n.y,
          vx: 0,
          vy: 0,
          scale: 1,
          p1: Math.random() * Math.PI * 2,
          p2: Math.random() * Math.PI * 2,
          f1: 0.35 + Math.random() * 0.4,
          f2: 0.3 + Math.random() * 0.45
        };
        this.prevByKey.has(i) || this.prevByKey.set(i, o);
      }
    } catch {
    }
  }
  firstUpdated() {
    var e;
    if (this.canvas = this.renderRoot.querySelector("canvas") ?? void 0, this.ctx = ((e = this.canvas) == null ? void 0 : e.getContext("2d")) ?? void 0, this.loadState(), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(this), this.resize(), this.buildTree(), this.raf = requestAnimationFrame(() => this.tick()), this.renaming) {
      const t = this.renderRoot.querySelector(".rename"), i = this.visible().find((n) => n.key === this.renaming.key);
      t && i && (t.style.left = `${i.x * this.cam.k + this.cam.x}px`, t.style.top = `${(i.y + this.radiusOf(i) + 6) * this.cam.k + this.cam.y}px`);
    }
  }
  /** Centers the visible tree in the viewport (the toolbar's «Ajustar»). */
  fit() {
    const e = this.visible();
    if (!e.length) return;
    let t = 1 / 0, i = 1 / 0, n = -1 / 0, o = -1 / 0;
    for (const y of e)
      t = Math.min(t, y.x), i = Math.min(i, y.y), n = Math.max(n, y.x), o = Math.max(o, y.y);
    const a = 70, s = this.clientWidth || 800, l = this.clientHeight || 600, r = n - t + a * 2, p = o - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(s / r, l / p)));
    this.cam.k = g, this.cam.x = s / 2 - (t + n) / 2 * g, this.cam.y = l / 2 - (i + o) / 2 * g;
  }
  updated(e) {
    var t;
    (e.has("model") || e.has("scene")) && this.buildTree(), e.has("renaming") && this.renaming && ((t = this.renderRoot.querySelector(".rename")) == null || t.select());
  }
  resize() {
    var n;
    if (!this.canvas) return;
    const e = window.devicePixelRatio || 1, t = this.clientWidth || 800, i = this.clientHeight || 600;
    this.canvas.width = t * e, this.canvas.height = i * e, (n = this.ctx) == null || n.setTransform(e, 0, 0, e, 0, 0), this.cam.x === 0 && this.cam.y === 0 && (this.cam.x = t / 2, this.cam.y = i / 2);
  }
  // ── Tree construction (lazy children per node kind) ──────────────────
  buildTree() {
    this.root && this.rememberSubtree(this.root), this.root = this.makeNode("root", "root", "Sistema", 0, void 0), this.root.x = 0, this.root.y = 0, this.prevByKey.has(this.root.key) || (this.root.expanded = !0), this.materialize(this.root), this.buildRelations(), this.allNodes = [];
    const e = (t) => {
      this.allNodes.push(t), t.children || (t.children = this.childrenOf(t));
      for (const i of t.children) e(i);
    };
    e(this.root);
  }
  /** Everything that relates two model elements across the tree's branches. */
  buildRelations() {
    const e = this.model;
    this.related = /* @__PURE__ */ new Map();
    const t = (i, n) => {
      !i || !n || i === n || (this.related.has(i) || this.related.set(i, /* @__PURE__ */ new Set()), this.related.has(n) || this.related.set(n, /* @__PURE__ */ new Set()), this.related.get(i).add(n), this.related.get(n).add(i));
    };
    if (this.scene) {
      for (const i of this.scene.edges) t(i.sourceId, i.targetId);
      return;
    }
    for (const i of e.relations ?? []) t(i.sourceId, i.targetId);
    for (const i of e.useCaseCalls ?? []) t(i.sourceId, i.targetId);
    for (const i of e.queryCalls ?? []) t(i.sourceId, i.targetId);
    for (const i of e.aggregateCalls ?? []) t(i.sourceId, i.targetId);
    for (const i of e.aggregateReferences ?? []) t(i.sourceAggregateId, i.targetAggregateId);
    for (const i of e.emissions ?? []) t(i.sourceId, i.domainEventId);
    for (const i of e.useCaseEmissions ?? []) t(i.sourceId, i.domainEventId);
    for (const i of e.actorUses ?? []) t(i.actorId, i.targetId);
    for (const i of e.actorAppUses ?? []) t(i.actorId, i.appId);
    for (const i of e.actorExternalDependencies ?? []) t(i.actorId, i.externalSystemId);
    for (const i of e.actorAgentUses ?? []) t(i.actorId, i.agentId);
    for (const i of e.externalSystemDependencies ?? []) t(i.sourceId, i.targetId);
    for (const i of e.externalCalls ?? []) t(i.externalSystemId, i.useCaseId);
    for (const i of e.externalUseCaseCalls ?? []) t(i.sourceId, i.targetId);
    for (const i of e.agentUses ?? []) t(i.agentId, i.useCaseId);
    for (const i of e.agentExternalUses ?? []) t(i.agentId, i.externalUseCaseId);
    for (const i of e.agentDelegations ?? []) t(i.agentId, i.delegateAgentId);
    for (const i of e.uiApps ?? []) t(i.id, i.identityProviderId);
    for (const i of e.modules) t(i.id, i.identityProviderId);
    for (const i of e.etlFlows ?? []) t(i.id, i.identityProviderId);
    for (const i of e.identityProviders ?? []) t(i.id, i.publishedByExternalSystemId);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, i, n, o) {
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, s = this.prevByKey.get(a), l = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: Uc[e] ?? "#64748b",
      depth: n,
      parent: o,
      expanded: (s == null ? void 0 : s.expanded) ?? !1,
      x: (s == null ? void 0 : s.x) ?? (o ? o.x + l() : 0),
      y: (s == null ? void 0 : s.y) ?? (o ? o.y + l() : 0),
      vx: 0,
      vy: 0,
      scale: 1,
      p1: Math.random() * Math.PI * 2,
      p2: Math.random() * Math.PI * 2,
      f1: 0.35 + Math.random() * 0.4,
      f2: 0.3 + Math.random() * 0.45
    };
  }
  /** Builds n.children (idempotent) and recurses into expanded ones. */
  materialize(e) {
    if (e.children || (e.children = this.childrenOf(e)), e.expanded) for (const t of e.children) this.materialize(t);
  }
  childrenOf(e) {
    const t = this.model, i = e.depth + 1, n = (o, a, s) => this.makeNode(o, a, s, i, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => e.kind === "root" ? !o.parentId : o.parentId === e.refId).map((o) => {
        const a = n(o.kind || "node", o.id, o.label);
        return o.stroke && (a.color = o.stroke), a;
      });
    switch (e.kind) {
      case "root":
        return [
          ...t.modules.map((o) => n("module", o.id, o.name)),
          ...t.externalSystems.map((o) => n("external-system", o.id, o.name)),
          ...(t.uiApps ?? []).map((o) => n("ui-app", o.id, o.name)),
          ...(t.actors ?? []).map((o) => n("actor", o.id, o.name)),
          ...(t.aiAgents ?? []).filter((o) => !o.external).map((o) => n("ai-agent", o.id, o.name)),
          ...(t.workflows ?? []).map((o) => n("workflow", o.id, o.name)),
          ...(t.identityProviders ?? []).map((o) => n("identity-provider", o.id, o.name))
        ];
      case "module": {
        const o = t.modules.find((p) => p.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((p) => p.moduleId === e.refId), s = o.useCases ?? [], l = new Set(a.map((p) => p.id)), r = new Set(
          (t.emissions ?? []).filter((p) => l.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...s.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${s.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !r.has(p.id)).map((p) => n("domain-event", p.id, p.name)),
          ...(o.applicationEvents ?? []).map((p) => n("application-event", p.id, p.name)),
          ...(o.readModels ?? []).map((p) => n("read-model", p.id, p.name)),
          ...(o.domainServices ?? []).map((p) => n("domain-service", p.id, p.name)),
          ...(o.queryServices ?? []).map((p) => n("query-service", p.id, p.name)),
          ...(o.scheduledTriggers ?? []).map((p) => n("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => n("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => n("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => n("document", p.id, p.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), s = e.refId.slice(o + 1), l = t.modules.find((r) => r.id === s);
        return l ? a === "aggregates" ? (t.aggregates ?? []).filter((r) => r.moduleId === s).map((r) => n("aggregate", r.id, r.name)) : (l.useCases ?? []).map((r) => n(r.policy ? "policy" : "use-case", r.id, r.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => n("entity", a.id, a.name)),
          ...t.modules.flatMap((a) => a.domainEvents ?? []).filter((a) => o.has(a.id)).map((a) => n("domain-event", a.id, a.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((a) => a.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((a) => a.publishedByExternalSystemId === e.refId).map((a) => n("api", a.id, a.name)),
          ...(o.useCases ?? []).map((a) => n("external-use-case", a.id, a.name)),
          ...(o.tables ?? []).map((a) => n("external-table", a.id, a.name)),
          ...(o.mcpServers ?? []).map((a) => n("mcp-server", a.id, a.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((a) => a.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((a) => n("api-operation", a.id, a.name));
      }
      case "ui-app": {
        const o = (t.uiApps ?? []).find((l) => l.id === e.refId);
        if (!o) return [];
        const a = /* @__PURE__ */ new Set(), s = (l) => {
          for (const r of l ?? [])
            r.pageId && a.add(r.pageId), s(r.children);
        };
        s(o.menuItems);
        for (const l of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          l && a.add(l);
        return [...a].map((l) => (t.pages ?? []).find((r) => r.id === l)).filter((l) => !!l).map((l) => n("page", l.id, l.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (i) => {
      if (!(this.focusKeys && !this.focusKeys.has(i.key)) && (e.push(i), i.expanded))
        for (const n of i.children ?? []) t(n);
    };
    return this.root && t(this.root), e;
  }
  /** Every node expanded down to `levels` (0 = todo plegado); focus clears. */
  applyLevels(e) {
    this.focusKeys = void 0;
    const t = (i) => {
      if (i.children || (i.children = this.childrenOf(i)), i.expanded = i.depth < e && i.children.length > 0, i.expanded) for (const n of i.children) t(n);
    };
    this.root && t(this.root), this.saveState();
  }
  /** A curated view out of the CURRENT picture: whatever is unfolded, as members. */
  createViewFromVisible() {
    const e = this._viewName.trim();
    if (!e) return;
    const i = (this.selected.size ? this.selectedNodes() : this.visible()).filter((n) => n.kind !== "root" && n.kind !== "group" && n.refId).map((n) => ({ id: n.refId, kind: n.kind }));
    this._viewNaming = !1, this._viewName = "", this.dispatchEvent(
      new CustomEvent("explorer-create-view", {
        detail: { name: e, members: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * alt+click: the node expands and the map narrows to what matters to it — its
   * subtree, its ancestors, and whatever it talks to through cross-relations.
   */
  focusOn(e) {
    var a;
    !e.expanded && ((a = e.children) != null && a.length) && this.toggle(e);
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      for (let l = s; l; l = l.parent) t.add(l.key);
    }, n = (s) => {
      t.add(s.key);
      for (const l of s.children ?? []) n(l);
    };
    i(e), n(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const s of this.allNodes)
        s.refId && o.has(s.refId) && i(s);
    this.focusKeys = t;
  }
  tick() {
    this.t += 1 / 60;
    const e = this.visible();
    this.step(e), this.stepFlight(), this.draw(e), (this.frame = (this.frame + 1) % 60) === 0 && this.saveState(), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var a;
    const t = this.t;
    for (const s of e) {
      if (s.parent) {
        const l = (Co[Math.min(s.depth, Co.length - 1)] ?? 60) + Math.min(60, ((((a = s.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let r = s.x - s.parent.x, p = s.y - s.parent.y, g = Math.hypot(r, p);
        if (g < 0.01) {
          const x = Math.random() * Math.PI * 2;
          r = Math.cos(x) * 0.1, p = Math.sin(x) * 0.1, g = 0.1;
        }
        const y = Fc * (g - l), f = r / g * y, h = p / g * y;
        s.vx -= f, s.vy -= h, s.parent.vx += f * 0.4, s.parent.vy += h * 0.4;
      } else
        s.vx -= s.x * Ao, s.vy -= s.y * Ao;
      !this.reducedMotion && this._motion > 0 && (s.vx += Math.sin(t * s.f1 * Math.PI * 2 + s.p1) * Mo * this._motion, s.vy += Math.cos(t * s.f2 * Math.PI * 2 + s.p2) * Mo * this._motion);
    }
    for (let s = 0; s < e.length; s++) {
      const l = e[s];
      for (let r = s + 1; r < e.length; r++) {
        const p = e[r], g = p.x - l.x, y = p.y - l.y;
        if (Math.abs(g) > _i || Math.abs(y) > _i) continue;
        const f = g * g + y * y;
        if (f > _i * _i || f < 0.01) continue;
        const h = Math.sqrt(f), x = l.depth <= 1 && p.depth <= 1 ? 3 : 1, d = Wc * x / f, c = g / h * d, m = y / h * d;
        l.vx -= c, l.vy -= m, p.vx += c, p.vy += m;
      }
    }
    const i = this._motion, n = Bc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const s of e) {
      if (s === this.dragNode) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.vx *= n, s.vy *= n;
      const l = Math.hypot(s.vx, s.vy);
      if (l > 14 && (s.vx = s.vx / l * 14, s.vy = s.vy / l * 14), o > 0 && l < o) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.x += s.vx, s.y += s.vy;
      const r = s === this.hover ? 1.75 : 1;
      s.scale += (r - s.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Eo[Math.min(e.depth, Eo.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, s;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const l of e)
      l.parent && (t.strokeStyle = l.color + "55", t.beginPath(), t.moveTo(l.parent.x, l.parent.y), t.lineTo(l.x, l.y), t.stroke());
    const o = (l) => `${l}px system-ui, sans-serif`;
    for (const l of e) {
      const r = this.radiusOf(l);
      t.beginPath(), t.arc(l.x, l.y, r, 0, Math.PI * 2), t.fillStyle = l.expanded ? l.color + "22" : "#ffffff", t.fill(), t.lineWidth = (l === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = l.color, t.stroke(), this.drawGlyph(t, l, r);
      const p = ((a = l.children) == null ? void 0 : a.length) ?? 0;
      if (!l.expanded && p > 0) {
        const y = Math.max(7, r * 0.42), f = l.x + r * 0.75, h = l.y + r * 0.75;
        t.beginPath(), t.arc(f, h, y, 0, Math.PI * 2), t.fillStyle = l.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(y * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), f, h + 0.5);
      }
      if (l.depth <= 1 || l === this.hover || this.cam.k > 0.65) {
        const y = l.label.length > 22 ? l.label.slice(0, 21) + "…" : l.label;
        t.font = l === this.hover ? `600 ${o(12)}` : o(l.depth <= 1 ? 12 : 10.5), t.fillStyle = l === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(y, l.x, l.y + r + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = "#2563eb", t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const l of e)
        this.selected.has(l.key) && (t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const l = this.rubber;
      t.save(), t.fillStyle = "rgba(37, 99, 235, 0.08)", t.strokeStyle = "#2563eb", t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(l.ax, l.bx), Math.min(l.ay, l.by), Math.abs(l.bx - l.ax), Math.abs(l.by - l.ay)), t.strokeRect(Math.min(l.ax, l.bx), Math.min(l.ay, l.by), Math.abs(l.bx - l.ax), Math.abs(l.by - l.ay)), t.restore();
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const l = this.found.node, r = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, r * 1.6), t.strokeStyle = l.color, t.lineWidth = 2.2 / this.cam.k;
        const p = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 9 + p, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 18 + p * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (this._threads)
      for (const l of e) this.drawThreads(t, l, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((s = this.hover.children) != null && s.length) && this.drawGhosts(t, this.hover), this.linking) {
      const l = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
    }
    t.restore(), this.hover && !this.linking && this.drawCard(t, this.hover, i, n);
  }
  /**
   * Cross-relations as faint threads: hovering a node reveals what it talks
   * to across the tree (calls, events, actor uses, IdP trust…) without
   * cluttering the resting picture. Only threads to visible nodes are drawn.
   */
  drawThreads(e, t, i) {
    const n = this.related.get(t.refId);
    if (!(n != null && n.size)) return;
    const o = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(o <= 0.02)) {
      e.save(), e.globalAlpha = o, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const a of i) {
        if (a === t || !n.has(a.refId) || a === t.parent || a.parent === t) continue;
        const s = (t.x + a.x) / 2, l = (t.y + a.y) / 2, r = a.x - t.x, p = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(s - p * g, l + r * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const s = this.radiusOf(t) + 24, l = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, r = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((p, g) => {
      const y = l - r / 2 + r * (g + 0.5) / n.length, f = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, h = t.x + Math.cos(y) * (s + f), x = t.y + Math.sin(y) * (s + f);
      e.beginPath(), e.arc(h, x, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = l + r / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(p) * s, t.y + Math.sin(p) * s);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const n = i * 0.42;
    if (n < 3.2) return;
    const { x: o, y: a } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "group": {
        e.arc(o - n * 0.45, a, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.16, a), e.arc(o, a, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.61, a), e.arc(o + n * 0.45, a, n * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, a, n, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - n * Math.cos(Math.PI * 0.35), a + n * Math.sin(Math.PI * 0.35)), e.arc(o, a, n, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, a, n, 0, Math.PI * 2), e.moveTo(o + n * 0.35, a), e.arc(o, a, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "module":
        for (const [s, l] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + s * n + n * 0.3, a + l * n), e.arc(o + s * n, a + l * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, a - n), e.lineTo(o + n, a), e.lineTo(o, a + n), e.lineTo(o - n, a), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - n, a - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, a - n * 0.25), e.lineTo(o + n, a - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - n * 0.6, a - n * 0.85), e.lineTo(o + n * 0.85, a), e.lineTo(o - n * 0.6, a + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + n * 0.3, a - n), e.lineTo(o - n * 0.5, a + n * 0.15), e.lineTo(o + n * 0.05, a + n * 0.15), e.lineTo(o - n * 0.3, a + n), e.lineTo(o + n * 0.5, a - n * 0.15), e.lineTo(o - n * 0.05, a - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, a, n * 0.5, 0, Math.PI * 2);
        for (let s = 0; s < 6; s++) {
          const l = s * Math.PI / 3;
          e.moveTo(o + Math.cos(l) * n * 0.55, a + Math.sin(l) * n * 0.55), e.lineTo(o + Math.cos(l) * n, a + Math.sin(l) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - n * 0.25, a - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(o + n * 0.25, a + n * 0.25), e.lineTo(o + n, a + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, a, n, 0, Math.PI * 2), e.moveTo(o, a - n * 0.55), e.lineTo(o, a), e.lineTo(o + n * 0.45, a + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - n * 0.85, a + n * 0.45), e.quadraticCurveTo(o - n * 0.85, a - n, o, a - n), e.quadraticCurveTo(o + n * 0.85, a - n, o + n * 0.85, a + n * 0.45), e.closePath(), e.moveTo(o + n * 0.25, a + n * 0.75), e.arc(o, a + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - n * 0.7, a - n), e.lineTo(o + n * 0.25, a - n), e.lineTo(o + n * 0.7, a - n * 0.55), e.lineTo(o + n * 0.7, a + n), e.lineTo(o - n * 0.7, a + n), e.closePath(), e.moveTo(o + n * 0.25, a - n), e.lineTo(o + n * 0.25, a - n * 0.55), e.lineTo(o + n * 0.7, a - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const s of [-0.7, 0.1])
          e.moveTo(o + s * n, a - n * 0.7), e.lineTo(o + (s + 0.6) * n, a), e.lineTo(o + s * n, a + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - n * 0.45, a - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(o - n * 0.1, a - n * 0.1), e.lineTo(o + n * 0.9, a + n * 0.9), e.moveTo(o + n * 0.45, a + n * 0.45), e.lineTo(o + n * 0.85, a + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, a - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(o - n * 0.8, a + n), e.quadraticCurveTo(o, a - n * 0.1, o + n * 0.8, a + n), e.stroke();
        break;
      case "ai-agent":
        for (let s = 0; s < 4; s++) {
          const l = s * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(l) * n, a + Math.sin(l) * n), e.moveTo(o, a), e.lineTo(o + Math.cos(l + Math.PI / 4) * n * 0.5, a + Math.sin(l + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - n * 0.45, a + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + n * 0.1, a - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + n * 0.55, a + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [s, l] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + s * n, a + l * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - n, a - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, a - n * 0.35), e.lineTo(o + n, a - n * 0.35), e.stroke(), e.beginPath(), e.arc(o - n * 0.7, a - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - n * 0.25, a - n), e.lineTo(o - n, a), e.lineTo(o - n * 0.25, a + n), e.moveTo(o + n * 0.25, a - n), e.lineTo(o + n, a), e.lineTo(o + n * 0.25, a + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - n, a), e.lineTo(o + n * 0.7, a), e.moveTo(o + n * 0.1, a - n * 0.5), e.lineTo(o + n * 0.8, a), e.lineTo(o + n * 0.1, a + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, a + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - n * 0.35, a + n * 0.25), e.lineTo(o - n * 0.35, a - n * 0.7), e.moveTo(o + n * 0.35, a + n * 0.25), e.lineTo(o + n * 0.35, a - n * 0.7), e.stroke();
        break;
      default:
        e.arc(o, a, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var z, W;
    const o = (t.children ?? []).flatMap(
      (w) => w.kind === "group" ? w.children ?? (w.children = this.childrenOf(w)) : [w]
    ), a = /* @__PURE__ */ new Map();
    for (const w of o) a.set(w.kind, (a.get(w.kind) ?? 0) + 1);
    const s = [];
    for (const [w, E] of a)
      if (s.push(`${E} ${E === 1 ? (ln[w] ?? w).toLowerCase() : qc[w] ?? w}`), s.length === 4) {
        const H = [...a.keys()].length - 4;
        H > 0 && (s[3] += ` (+${H} tipos más)`);
        break;
      }
    const l = o.slice(0, 6).map((w) => ({ label: w.label.length > 30 ? w.label.slice(0, 29) + "…" : w.label, color: w.color })), r = o.length - l.length, p = t.label, g = ln[t.kind] ?? t.kind, y = ((z = t.children) != null && z.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((W = t.children) != null && W.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const h = Math.max(
      e.measureText(g).width,
      ...s.map((w) => e.measureText(w).width),
      ...l.map((w) => e.measureText(w.label).width + 12),
      e.measureText(y).width
    ), x = Math.min(300, Math.max(f, h) + 24), d = l.length ? 8 + l.length * 15 + (r > 0 ? 15 : 0) : 0, c = 40 + s.length * 15 + d + (y ? 18 : 0), m = this.radiusOf(t) * this.cam.k, k = this.cam.x + t.x * this.cam.k, b = this.cam.y + t.y * this.cam.k;
    let C = k + m + 14;
    C + x > i - 8 && (C = k - m - 14 - x), C = Math.max(8, Math.min(C, i - x - 8));
    const L = Math.max(8, Math.min(b - 10, n - c - 8));
    e.translate(C, L), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, x, c, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", s.forEach((w, E) => e.fillText(w, 12, 41 + E * 15));
    let R = 41 + s.length * 15 + (l.length ? 8 : 0);
    l.forEach((w) => {
      e.fillStyle = w.color, e.beginPath(), e.arc(15, R + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(w.label, 24, R), R += 15;
    }), r > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${r} más`, 24, R)), y && (e.fillStyle = "#94a3b8", e.fillText(y, 12, c - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = be.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && be.fold(i.label).includes(t)).slice(0, 8);
  }
  onSearchKeydown(e) {
    e.key === "ArrowDown" ? (e.preventDefault(), this._active = Math.min(this._active + 1, this._sugs.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), this._active = Math.max(this._active - 1, 0)) : e.key === "Enter" && this._sugs.length ? (this.flyToNode(this._sugs[this._active]), e.target.blur()) : e.key === "Escape" && (this._q = "", this._sugs = [], e.target.blur());
  }
  /** Where the node lives, for disambiguation («Reservas › Reserva»). */
  pathOf(e) {
    const t = [];
    for (let i = e.parent; i && i.kind !== "root"; i = i.parent) t.unshift(i.label);
    return t.join(" › ");
  }
  /** Expands the path to the node (each level explodes) and flies the camera. */
  flyToNode(e) {
    const t = [];
    for (let i = e.parent; i; i = i.parent) t.unshift(i);
    for (const i of t) i.expanded || this.toggle(i);
    this.flight = { node: e, until: this.t + 1.5 }, this.found = { node: e, until: this.t + 3.2 }, this._q = "", this._sugs = [], this.saveState();
  }
  /** Eases the camera towards the flight target, re-aiming as physics moves it. */
  stepFlight() {
    if (!this.flight) return;
    if (this.t > this.flight.until) {
      this.flight = void 0;
      return;
    }
    const e = this.flight.node, t = this.clientWidth || 800, i = this.clientHeight || 600, n = Math.max(0.9, Math.min(1.2, this.cam.k));
    this.cam.k += (n - this.cam.k) * 0.08, this.cam.x += (t / 2 - e.x * this.cam.k - this.cam.x) * 0.12, this.cam.y += (i / 2 - e.y * this.cam.k - this.cam.y) * 0.12;
  }
  // ── Interaction ───────────────────────────────────────────────────────
  /** A client point → world coordinates (palette drops share the canvas contract). */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect();
    return {
      x: (e - i.left - this.cam.x) / this.cam.k,
      y: (t - i.top - this.cam.y) / this.cam.k
    };
  }
  /** The MODEL element under a client point (its refId), for palette drops. */
  nodeIdAtClient(e, t) {
    const i = this.sceneFromClient(e, t), n = this.nodeAt(i.x, i.y);
    return n && n.kind !== "root" && n.kind !== "group" && n.refId ? n.refId : null;
  }
  /** The refId chain from the element up to the root (grouping nodes skipped). */
  chainOf(e) {
    const t = this.allNodes.find((n) => n.refId === e), i = [];
    for (let n = t; n; n = n.parent)
      n.refId && n.kind !== "group" && n.kind !== "root" && i.push(n.refId);
    return i.length ? i : [e];
  }
  toWorld(e) {
    const t = this.getBoundingClientRect();
    return {
      x: (e.clientX - t.left - this.cam.x) / this.cam.k,
      y: (e.clientY - t.top - this.cam.y) / this.cam.k
    };
  }
  nodeAt(e, t) {
    const i = this.visible();
    for (let n = i.length - 1; n >= 0; n--) {
      const o = i[n], a = this.radiusOf(o) + 4 / this.cam.k;
      if ((e - o.x) ** 2 + (t - o.y) ** 2 <= a * a) return o;
    }
  }
  onPointerDown(e) {
    this.flight = void 0;
    const t = this.toWorld(e);
    this.downAt = { x: e.clientX, y: e.clientY }, this.moved = !1;
    const i = this.nodeAt(t.x, t.y);
    if (i && i.kind !== "root" && (e.shiftKey || e.ctrlKey)) {
      this.linking = { source: i, x: t.x, y: t.y };
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
      }
      return;
    }
    i ? this.dragNode = i : this._space ? this.panning = !0 : this.rubber = { ax: t.x, ay: t.y, bx: t.x, by: t.y, additive: e.shiftKey }, this.focus();
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  onPointerMove(e) {
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 4 && (this.moved = !0), this.linking) {
      const n = this.toWorld(e);
      this.linking.x = n.x, this.linking.y = n.y, this.hover = this.nodeAt(n.x, n.y);
      return;
    }
    if (this.dragNode) {
      const n = this.toWorld(e);
      this.dragNode.x = n.x, this.dragNode.y = n.y;
      return;
    }
    if (this.rubber && e.buttons & 1) {
      const n = this.toWorld(e);
      this.rubber.bx = n.x, this.rubber.by = n.y;
      return;
    }
    if (this.panning && e.buttons & 1) {
      this.cam.x += e.movementX, this.cam.y += e.movementY;
      return;
    }
    const t = this.toWorld(e), i = this.hover;
    this.hover = this.nodeAt(t.x, t.y), this.hover !== i && (this.hoverAt = this.t), this.canvas && (this.canvas.style.cursor = this.hover ? "pointer" : "default");
  }
  onPointerUp(e) {
    if (this.linking) {
      const i = this.toWorld(e), n = this.nodeAt(i.x, i.y), o = this.linking.source;
      this.linking = void 0, n && n !== o && n.kind !== "root" && o.refId && n.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: o.refId, targetId: n.refId, x: e.clientX, y: e.clientY },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (this.rubber) {
      const i = this.rubber;
      if (this.rubber = void 0, this.moved) {
        const n = Math.min(i.ax, i.bx), o = Math.max(i.ax, i.bx), a = Math.min(i.ay, i.by), s = Math.max(i.ay, i.by), l = this.visible().filter((r) => r.kind !== "root" && r.kind !== "group" && r.refId).filter((r) => r.x >= n && r.x <= o && r.y >= a && r.y <= s).map((r) => r.key);
        this.selected = new Set(i.additive ? [...this.selected, ...l] : l);
      } else
        this.selected = /* @__PURE__ */ new Set(), this.focusKeys = void 0;
      return;
    }
    const t = this.dragNode;
    this.dragNode = void 0, this.panning = !1, t && !this.moved ? e.altKey ? this.focusOn(t) : (this.selected = new Set(t.kind !== "root" && t.refId ? [t.key] : []), this.toggle(t)) : !t && !this.moved && this.focusKeys && (this.focusKeys = void 0);
  }
  /** Click: the node explodes — children burst out from it and the springs settle. */
  toggle(e) {
    var t;
    if ((t = e.children) != null && t.length && (e.expanded = !e.expanded, e.expanded)) {
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, n = e.parent ? Math.PI * 1.25 : Math.PI * 2, o = e.children;
      o.forEach((a, s) => {
        this.materialize(a.parent);
        const l = i - n / 2 + n * (s + 0.5) / o.length;
        a.x = e.x + Math.cos(l) * 6, a.y = e.y + Math.sin(l) * 6, a.vx = Math.cos(l) * 7, a.vy = Math.sin(l) * 7, a.children || (a.children = this.childrenOf(a));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, n = (e.clientY - t.top - this.cam.y) / this.cam.k, o = this.nodeAt(i, n);
    !o || o.kind === "root" || this.dispatchEvent(
      new CustomEvent("node-activated", {
        detail: { id: o.refId, kind: o.kind },
        bubbles: !0,
        composed: !0
      })
    );
  }
  onWheel(e) {
    e.preventDefault(), this.flight = void 0;
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * o)), s = a / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * s, this.cam.y = n - (n - this.cam.y) * s, this.cam.k = a;
  }
  render() {
    return M`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? M`<input
            class="rename"
            .value=${this.renaming.value}
            @pointerdown=${(e) => e.stopPropagation()}
            @input=${(e) => this.renaming = { ...this.renaming, value: e.target.value }}
            @keydown=${(e) => {
      if (e.stopPropagation(), e.key === "Escape" && (this.renaming = null), e.key === "Enter") {
        const t = this.visible().find((n) => n.key === this.renaming.key), i = this.renaming.value.trim();
        this.renaming = null, t && i && i !== t.label && (t.label = i, this.emitUp("node-renamed", { id: t.refId, kind: t.kind, name: i }));
      }
    }}
            @blur=${() => this.renaming = null}
          />` : ""}
      <div class="search" @pointerdown=${(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Buscar en el modelo…"
          .value=${this._q}
          @input=${this.onSearchInput}
          @keydown=${this.onSearchKeydown}
        />
        ${this._sugs.length ? M`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => M`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (ln[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? M`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
      </div>
      <div class="controls" @pointerdown=${(e) => e.stopPropagation()}>
        <span>Niveles</span>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value="1"
          title="Cuántos niveles se ven abiertos"
          @input=${(e) => this.applyLevels(Number(e.target.value))}
        />
        <button title="Plegarlo todo y volver a empezar" @click=${() => this.applyLevels(0)}>
          Replegar
        </button>
        <span>Física</span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          .value=${String(Math.round(this._motion * 100))}
          title="Cuánto se mueve el mapa: 0 aparca los nodos en equilibrio"
          @input=${(e) => this._motion = Number(e.target.value) / 100}
        />
        <button
          title=${this._motion > 0 ? "Parar del todo (física a 0)" : "Reanudar el movimiento"}
          @click=${() => this._motion = this._motion > 0 ? 0 : 1}
        >
          ${this._motion > 0 ? "⏸" : "▶"}
        </button>
        <button
          title=${this._threads ? "Enseñar los hilos de relaciones solo al hacer hover" : "Enseñar SIEMPRE los hilos de relaciones"}
          @click=${() => this._threads = !this._threads}
        >
          ${this._threads ? "∿ Hilos: siempre" : "∿ Hilos: hover"}
        </button>
        ${this._viewNaming ? M`
              <input
                type="text"
                style="width: 130px"
                placeholder="Nombre de la vista…"
                .value=${this._viewName}
                @input=${(e) => this._viewName = e.target.value}
                @keydown=${(e) => {
      e.key === "Enter" && this.createViewFromVisible(), e.key === "Escape" && (this._viewNaming = !1);
    }}
              />
              <button @click=${() => this.createViewFromVisible()}>Crear</button>
              <button @click=${() => this._viewNaming = !1}>✕</button>
            ` : M`<button
              title="Crea una vista modux con los elementos desplegados ahora mismo"
              @click=${() => this._viewNaming = !0}
            >
              ⊞ Vista…
            </button>`}
      </div>
      <div class="hud">
        click: seleccionar y expandir / plegar · alt+click: aislar lo relacionado · doble click: abrir<br />
        shift+arrastrar desde un nodo: trazar una relación · arrastrar en el fondo: selección<br />
        espacio+arrastrar: mover el lienzo · rueda: zoom · Supr borra · F2 renombra · Ctrl+Z deshace<br />
        buscar: expande el camino y vuela hasta el nodo · arrastrar nodo: tirar del subárbol
      </div>
    `;
  }
};
be.styles = vt`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background:
        radial-gradient(ellipse at center, #ffffff 0%, #f1f5f9 100%);
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      cursor: default;
    }
    .rename {
      position: absolute;
      transform: translateX(-50%);
      z-index: 6;
      font: 12px system-ui, sans-serif;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1.5px solid #2563eb;
      background: #ffffff;
      color: #0f172a;
      outline: none;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
    }
    .hud {
      position: absolute;
      right: 12px;
      bottom: 10px;
      font: 11px/1.5 system-ui, sans-serif;
      color: #94a3b8;
      pointer-events: none;
      text-align: right;
    }
    .controls {
      position: absolute;
      right: 12px;
      top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      font: 11px system-ui, sans-serif;
      color: #64748b;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 6px 10px;
    }
    .controls input[type='range'] {
      width: 90px;
      accent-color: #6366f1;
    }
    .controls button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 2px 8px;
      font: 11px system-ui, sans-serif;
      color: #475569;
      cursor: pointer;
    }
    .controls button:hover {
      background: #f1f5f9;
    }
    :host([shifted]) .search {
      left: 268px;
    }
    .search {
      position: absolute;
      left: 12px;
      top: 10px;
      transition: left 0.15s;
      width: 260px;
      font: 12px system-ui, sans-serif;
    }
    .search input {
      width: 100%;
      box-sizing: border-box;
      padding: 7px 10px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.95);
      font: inherit;
      color: #0f172a;
      outline: none;
    }
    .search input:focus {
      border-color: #0284c7;
      box-shadow: 0 0 0 2px #0284c722;
    }
    .sugs {
      margin: 4px 0 0;
      padding: 4px;
      list-style: none;
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
      max-height: 320px;
      overflow-y: auto;
    }
    .sugs li {
      display: flex;
      align-items: baseline;
      gap: 7px;
      padding: 5px 8px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
    }
    .sugs li.active,
    .sugs li:hover {
      background: #f1f5f9;
    }
    .sugs .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      align-self: center;
    }
    .sugs .name {
      color: #0f172a;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sugs .path {
      color: #94a3b8;
      font-size: 10.5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sugs .empty {
      color: #94a3b8;
      cursor: default;
    }
  `;
be.STORE_KEY = "modux-explorer-state";
ze([
  se({ type: Boolean, reflect: !0 })
], be.prototype, "shifted", 2);
ze([
  se({ attribute: !1 })
], be.prototype, "scene", 2);
ze([
  se({ attribute: !1 })
], be.prototype, "model", 2);
ze([
  U()
], be.prototype, "_q", 2);
ze([
  U()
], be.prototype, "_sugs", 2);
ze([
  U()
], be.prototype, "_active", 2);
ze([
  U()
], be.prototype, "_motion", 2);
ze([
  U()
], be.prototype, "_threads", 2);
ze([
  U()
], be.prototype, "_viewNaming", 2);
ze([
  U()
], be.prototype, "_viewName", 2);
ze([
  U()
], be.prototype, "selected", 2);
ze([
  U()
], be.prototype, "renaming", 2);
be = ze([
  wt("modux-explorer")
], be);
function Vc(e, t) {
  var i, n, o, a, s, l, r, p, g, y, f, h, x;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const d = e.model.relations.find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d && d.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : null;
    }
    case "set-relation-type": {
      const d = e.model.relations.find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d && d.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "create-ui-app":
      return [{ kind: "delete-ui-app", id: t.id }];
    case "add-code-module":
      return [{ kind: "remove-code-module", id: t.id }];
    case "add-transformation":
      return [{ kind: "remove-transformation", id: t.id }];
    case "add-custom-code":
      return [{ kind: "remove-custom-code", id: t.id }];
    case "add-button-group":
      return [{ kind: "remove-button-group", id: t.id }];
    case "add-workflow-gateway":
      return [{ kind: "remove-workflow-gateway", id: t.id }];
    case "add-model-field":
      return [{ kind: "remove-model-field", modelId: t.modelId, fieldId: t.fieldId }];
    case "create-ui-page":
      return [{ kind: "delete-ui-page", id: t.id }];
    case "set-app-header-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (d == null ? void 0 : d.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const d = (e.model.modelMappings ?? []).find((c) => c.id === t.id);
      return !(d != null && d.sourceModelId) || !d.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: d.id,
        name: d.name,
        sourceId: d.sourceModelId,
        targetId: d.targetModelId
      }];
    }
    case "remove-model": {
      const d = (e.model.models ?? []).find((m) => m.id === t.id);
      if (!d) return null;
      const c = [{ kind: "add-model", id: d.id, name: d.name }];
      for (const m of e.model.pages ?? []) {
        m.modelId === t.id && c.push({ kind: "set-page-model", pageId: m.id, modelId: t.id });
        const k = (b) => {
          for (const C of b ?? [])
            C.modelId === t.id && c.push({ kind: "set-page-component", pageId: m.id, componentId: C.id, modelId: t.id }), k(C.children);
        };
        k(m.content);
      }
      for (const m of e.model.uiApps ?? [])
        m.modelId === t.id && c.push({ kind: "set-app-model", appId: m.id, modelId: t.id });
      return c;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const d = (e.model.pages ?? []).find((m) => m.id === t.pageId), c = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (c ? d == null ? void 0 : d.crudDetailPageId : d == null ? void 0 : d.crudCreatePageId) ?? null,
        toAppId: (c ? d == null ? void 0 : d.crudDetailAppId : d == null ? void 0 : d.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (d == null ? void 0 : d.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (d == null ? void 0 : d.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{
        kind: "set-app-home-page",
        appId: t.appId,
        pageId: (d == null ? void 0 : d.homePageId) ?? null,
        toAppId: (d == null ? void 0 : d.homeAppId) ?? null
      }];
    }
    case "add-page-wizard-step":
      return [{ kind: "remove-page-wizard-step", pageId: t.pageId, targetId: t.itemId ?? t.targetId }];
    case "set-wizard-step-page": {
      const d = (((i = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === t.itemId);
      return d ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: d.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const d = (((n = (e.model.pages ?? []).find((m) => m.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), c = d.indexOf(t.targetId);
      return c < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: d[c + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const d = (((o = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === t.targetId);
      return d ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: d.pageId ?? null,
        label: d.label,
        itemId: d.id
      }] : null;
    }
    case "delete-ui-app": {
      const d = (e.model.uiApps ?? []).find((k) => k.id === t.id);
      if (!d) return null;
      const c = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
      d.headerPageId && c.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && c.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && c.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && c.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && c.push({
        kind: "set-app-home-page",
        appId: d.id,
        pageId: d.homePageId ?? null,
        toAppId: d.homeAppId ?? null
      });
      const m = (k, b) => {
        for (const C of k ?? [])
          c.push({
            kind: "add-menu-item",
            appId: d.id,
            label: C.label,
            itemId: C.id,
            parentId: b == null ? void 0 : b.id,
            parentLabel: b && !b.id ? b.label : void 0,
            pageId: C.pageId ?? null
          }), C.uiAdapterId && c.push({ kind: "set-menu-app", appId: d.id, toAppId: C.uiAdapterId, itemId: C.id, label: C.label }), C.useCaseId && c.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: C.useCaseId, itemId: C.id, label: C.label }), C.aggregateId && c.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: C.aggregateId, itemId: C.id, label: C.label }), C.queryOperationId && c.push({
            kind: "set-menu-query-operation",
            appId: d.id,
            queryServiceId: C.queryServiceId ?? null,
            queryOperationId: C.queryOperationId,
            itemId: C.id,
            label: C.label
          }), m(C.children, C);
      };
      m(d.menuItems);
      for (const k of e.model.actorAppUses ?? [])
        k.appId === t.id && c.push({ kind: "add-actor-app", actorId: k.actorId, appId: t.id });
      return c;
    }
    case "delete-ui-page": {
      const d = (e.model.pages ?? []).find((m) => m.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
      ];
      d.route && c.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && c.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && c.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
      for (const m of d.buttons ?? [])
        m.useCaseId && (c.push({ kind: "add-page-button", pageId: d.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && c.push({
          kind: "set-page-button",
          pageId: d.id,
          useCaseId: m.useCaseId,
          label: m.label ?? null,
          mappingId: m.mappingId
        }));
      for (const m of d.viewmodelFields ?? [])
        (m.stereotype || m.colspan || m.label) && c.push({
          kind: "set-page-field-config",
          pageId: d.id,
          fieldId: m.fieldId,
          stereotype: m.stereotype ?? null,
          colspan: m.colspan ?? null,
          label: m.label ?? null
        });
      (d.viewmodelFields ?? []).length && c.push({
        kind: "set-page-field-order",
        pageId: d.id,
        fieldIds: (d.viewmodelFields ?? []).map((m) => m.fieldId)
      });
      for (const m of d.content ?? [])
        c.push(...e.rebuildComponentOps(d.id, m, void 0, null).ops);
      for (const m of d.wizardSteps ?? [])
        c.push({
          kind: "add-page-wizard-step",
          pageId: d.id,
          targetId: m.pageId ?? null,
          label: m.label,
          itemId: m.id
        });
      return (d.crudDetailPageId || d.crudDetailAppId) && c.push({ kind: "set-crud-detail", pageId: d.id, targetId: d.crudDetailPageId ?? null, toAppId: d.crudDetailAppId ?? null }), (d.crudCreatePageId || d.crudCreateAppId) && c.push({ kind: "set-crud-create", pageId: d.id, targetId: d.crudCreatePageId ?? null, toAppId: d.crudCreateAppId ?? null }), c;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const d = (e.model.uiApps ?? []).find((k) => k.id === t.appId), c = (k) => {
        for (const b of k ?? []) {
          if (t.itemId ? b.id === t.itemId : b.label === t.label) return b;
          const C = c(b.children);
          if (C) return C;
        }
        return null;
      }, m = t.itemId || t.label ? c(d == null ? void 0 : d.menuItems) : null;
      return m ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: m.label,
        pageId: m.pageId ?? null,
        itemId: m.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: m.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: m.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: m.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: m.queryServiceId ?? null,
        queryOperationId: m.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: m.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const d = (e.model.pages ?? []).find((m) => m.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
      return c ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: c.label }] : null;
    }
    case "rename-ui-page": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d ? [{ kind: "rename-ui-page", pageId: t.pageId, name: d.name }] : null;
    }
    case "set-page-type": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d ? [{ kind: "set-page-type", pageId: t.pageId, pageType: d.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d != null && d.route ? [{ kind: "set-page-route", pageId: t.pageId, path: d.route }] : null;
    }
    case "set-page-button": {
      const d = (e.model.pages ?? []).find((m) => m.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
      return c ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: c.label ?? null,
        mappingId: c.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const d = (e.model.pages ?? []).find((L) => L.id === t.pageId);
      let c = null, m = null, k = null;
      const b = (L, R) => {
        var W;
        const z = L ?? [];
        for (let w = 0; w < z.length; w++)
          z[w].id === t.componentId && (c = z[w], m = R, k = ((W = z[w + 1]) == null ? void 0 : W.id) ?? null), b(z[w].children, z[w]);
      };
      if (b(d == null ? void 0 : d.content, null), !c) return null;
      const C = c;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: C.title ?? null,
        text: C.text ?? null,
        label: C.label ?? null,
        useCaseId: C.useCaseId ?? null,
        mappingId: C.mappingId ?? null,
        modelId: C.modelId ?? null,
        queryServiceId: C.queryServiceId ?? null,
        queryOperationId: C.queryOperationId ?? null,
        fieldId: C.fieldId ?? null,
        stereotype: C.stereotype ?? null,
        colspan: C.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: m === null ? null : m.id,
        beforeComponentId: k
      }] : e.rebuildComponentOps(
        t.pageId,
        C,
        m === null ? void 0 : m.id,
        k
      ).ops;
    }
    case "set-page-listing": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (d == null ? void 0 : d.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const d = (((a = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).find((c) => c.fieldId === t.fieldId);
      return [{
        kind: "set-page-field-config",
        pageId: t.pageId,
        fieldId: t.fieldId,
        stereotype: (d == null ? void 0 : d.stereotype) ?? null,
        colspan: (d == null ? void 0 : d.colspan) ?? null,
        label: (d == null ? void 0 : d.label) ?? null
      }];
    }
    case "set-page-field-order": {
      const d = (((s = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).map((c) => c.fieldId);
      return d.length ? [{ kind: "set-page-field-order", pageId: t.pageId, fieldIds: d }] : null;
    }
    case "move-menu-item": {
      const d = t.itemId ? e.menuEntryIn(t.appId, t.itemId) : null;
      return [{
        kind: "move-menu-item",
        appId: t.toAppId,
        toAppId: t.appId,
        itemId: t.itemId,
        label: t.label,
        parentId: (d == null ? void 0 : d.parentId) ?? void 0,
        beforeItemId: (d == null ? void 0 : d.beforeId) ?? void 0
      }];
    }
    case "add-actor-app":
      return [{ kind: "remove-actor-app", actorId: t.actorId, appId: t.appId }];
    case "remove-actor-app":
      return [{ kind: "add-actor-app", actorId: t.actorId, appId: t.appId }];
    case "add-module":
      return [{ kind: "remove-module", id: t.id }];
    case "remove-module": {
      const d = e.model.modules.find((m) => m.id === t.id);
      if (!d) return null;
      const c = e.model.relations.filter(
        (m) => (m.sourceId === t.id || m.targetId === t.id) && m.type != null
      );
      return [
        { kind: "add-module", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this module participated in.
        ...c.map(
          (m) => ({
            kind: "set-relation-type",
            sourceId: m.sourceId,
            targetId: m.targetId,
            type: m.type
          })
        )
      ];
    }
    case "add-aggregate":
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const d = (e.model.aggregates ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, moduleId: d.moduleId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const d of e.model.modules) {
        const c = (d.queryServices ?? []).find((m) => m.id === t.id);
        if (c) return [{ kind: "add-query-service", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "add-query-call":
      return [{ kind: "remove-query-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-query-call":
      return [{ kind: "add-query-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-actor-use":
      return [{ kind: "remove-actor-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-use":
      return [{ kind: "add-actor-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-actor-external":
      return [{ kind: "remove-actor-external", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-external":
      return [{ kind: "add-actor-external", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-external-dependency": {
      const d = (e.model.externalSystemDependencies ?? []).find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const d = (e.model.externalSystemDependencies ?? []).find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d == null ? void 0 : d.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const d = (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "add-proxy-api",
        id: d.id,
        name: d.name,
        targetId: d.targetApiId,
        moduleId: d.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const d = (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-proxy-target", id: t.id, targetId: d.targetApiId ?? "" }] : null;
    }
    case "add-api-implementation":
      return [{ kind: "remove-api-implementation", apiId: t.apiId, moduleId: t.moduleId }];
    case "remove-api-implementation":
      return [{ kind: "add-api-implementation", apiId: t.apiId, moduleId: t.moduleId }];
    case "add-proxy-operation-route":
      return [{
        kind: "remove-proxy-operation-route",
        proxyId: t.proxyId,
        operationId: t.operationId,
        targetSiteId: t.targetSiteId
      }];
    case "remove-proxy-operation-route":
      return [{
        kind: "add-proxy-operation-route",
        proxyId: t.proxyId,
        operationId: t.operationId,
        targetSiteId: t.targetSiteId
      }];
    case "add-external-operation-use":
      return [{
        kind: "remove-external-operation-use",
        sourceId: t.sourceId,
        operationId: t.operationId,
        targetSiteId: t.targetSiteId
      }];
    case "remove-external-operation-use":
      return [{
        kind: "add-external-operation-use",
        sourceId: t.sourceId,
        operationId: t.operationId,
        targetSiteId: t.targetSiteId
      }];
    case "set-api-operation-implementation": {
      const d = (e.model.apiOperationImplementations ?? []).find(
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.moduleId === t.moduleId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        moduleId: t.moduleId,
        targetUseCaseId: d.useCaseId
      }] : [{
        kind: "remove-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        moduleId: t.moduleId
      }];
    }
    case "remove-api-operation-implementation": {
      const d = (e.model.apiOperationImplementations ?? []).find(
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.moduleId === t.moduleId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        moduleId: t.moduleId,
        targetUseCaseId: d.useCaseId
      }] : null;
    }
    case "set-api-publisher": {
      const d = (e.model.apis ?? []).find((c) => c.id === t.id) ?? (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-api-publisher", id: t.id, targetId: d.publishedByExternalSystemId ?? "" }] : null;
    }
    case "add-actor-crud":
      return [{ kind: "remove-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-crud":
      return [{ kind: "add-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case":
      return [{ kind: "remove-use-case", id: t.id }];
    case "remove-use-case": {
      for (const d of e.model.modules) {
        const c = (d.useCases ?? []).find((m) => m.id === t.id);
        if (c)
          return [
            { kind: "add-use-case", id: c.id, name: c.name, moduleId: d.id, policy: c.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const d of e.model.externalSystems) {
        const c = (d.useCases ?? []).find((m) => m.id === t.id);
        if (c)
          return [{ kind: "add-external-use-case", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "add-external-call":
      return [{ kind: "remove-external-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-external-call":
      return [{ kind: "add-external-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-external-uc-call":
      return [{ kind: "remove-external-uc-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-external-uc-call":
      return [{ kind: "add-external-uc-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case-call":
      return [{ kind: "remove-use-case-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-use-case-call":
      return [{ kind: "add-use-case-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case-step":
      return [{ kind: "remove-use-case-step", useCaseId: t.useCaseId, id: t.id }];
    case "add-notification":
      return [{ kind: "remove-notification", id: t.id }];
    case "remove-notification": {
      const d = (e.model.notifications ?? []).find((m) => m.id === t.id);
      if (!(d != null && d.ownerModuleId)) return null;
      const c = [
        { kind: "add-notification", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: (d.channels ?? [])[0] }
      ];
      d.eventId && c.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
      for (const m of d.recipientRoleIds ?? []) c.push({ kind: "add-notification-recipient", id: d.id, roleId: m });
      return c;
    }
    case "set-notification-event": {
      const d = (e.model.notifications ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (d == null ? void 0 : d.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const d = (e.model.documents ?? []).find((m) => m.id === t.id);
      if (!(d != null && d.ownerModuleId)) return null;
      const c = [
        { kind: "add-document", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: d.kind }
      ];
      return d.modelId && c.push({ kind: "set-document-model", id: d.id, modelId: d.modelId }), d.queryServiceId && c.push({ kind: "set-document-query", id: d.id, queryServiceId: d.queryServiceId, queryOperationId: d.queryOperationId ?? null }), c;
    }
    case "set-document-model": {
      const d = (e.model.documents ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-document-query": {
      const d = (e.model.documents ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (d == null ? void 0 : d.queryServiceId) ?? null, queryOperationId: (d == null ? void 0 : d.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const d = (e.model.identityProviders ?? []).find((m) => m.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
      ];
      d.publishedByExternalSystemId && c.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
      for (const m of e.model.modules)
        m.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.uiApps ?? [])
        m.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.etlFlows ?? [])
        m.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      return c;
    }
    case "set-idp-publisher": {
      const d = (e.model.identityProviders ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const d = ((l = e.model.modules.find((c) => c.id === t.id)) == null ? void 0 : l.identityProviderId) ?? ((r = (e.model.uiApps ?? []).find((c) => c.id === t.id)) == null ? void 0 : r.identityProviderId) ?? ((p = (e.model.etlFlows ?? []).find((c) => c.id === t.id)) == null ? void 0 : p.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: d }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const d = (e.model.etlFlows ?? []).find((c) => c.id === t.id);
      return !d || !d.ownerModuleId ? null : [
        { kind: "add-etl-flow", id: d.id, name: d.name, moduleId: d.ownerModuleId },
        ...(d.steps ?? []).map((c) => ({
          kind: "add-etl-step",
          etlFlowId: d.id,
          id: c.id,
          name: c.name,
          stepType: c.type,
          externalTableId: c.externalTableId,
          apiId: c.apiId,
          operationId: c.operationId,
          targetId: c.eventId,
          mappingId: c.mappingId
        }))
      ];
    }
    case "add-etl-step":
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const d = (((g = (e.model.etlFlows ?? []).find((c) => c.id === t.etlFlowId)) == null ? void 0 : g.steps) ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "add-etl-step",
        etlFlowId: t.etlFlowId,
        id: d.id,
        name: d.name,
        stepType: d.type,
        externalTableId: d.externalTableId,
        apiId: d.apiId,
        operationId: d.operationId,
        targetId: d.eventId,
        mappingId: d.mappingId
      }] : null;
    }
    case "add-scheduled-trigger":
      return [{ kind: "remove-scheduled-trigger", id: t.id }];
    case "remove-scheduled-trigger": {
      const d = e.model.modules.find(
        (m) => (m.scheduledTriggers ?? []).some((k) => k.id === t.id)
      ), c = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((m) => m.id === t.id);
      return !d || !c ? null : [{
        kind: "add-scheduled-trigger",
        id: c.id,
        name: c.name,
        moduleId: d.id,
        cronExpression: c.cronExpression,
        targetUseCaseId: c.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const d = e.model.modules.flatMap((c) => c.scheduledTriggers ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-scheduled-trigger-target", id: t.id, targetUseCaseId: d.useCaseId ?? null }] : null;
    }
    case "add-aggregate-call":
      return [{ kind: "remove-aggregate-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-aggregate-call":
      return [{ kind: "add-aggregate-call", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-emission":
      return [{ kind: "remove-emission", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-emission":
      return [{ kind: "add-emission", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-external-system":
      return [{ kind: "remove-external-system", id: t.id }];
    case "remove-external-system": {
      const d = e.model.externalSystems.find((c) => c.id === t.id);
      return d ? [{ kind: "add-external-system", id: d.id, name: d.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const d = (e.model.aiAgents ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-ai-agent", id: d.id, name: d.name, external: d.external },
        ...(e.model.agentUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-use", sourceId: t.id, targetId: c.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: c.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: c.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: c.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: c.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-query", sourceId: t.id, targetId: c.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: c.ragId })),
        ...(e.model.agentDelegations ?? []).filter((c) => c.agentId === t.id || c.delegateAgentId === t.id).map((c) => ({
          kind: "add-agent-delegate",
          sourceId: c.agentId,
          targetId: c.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-actor-agent", sourceId: c.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-trigger", sourceId: c.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const d = (e.model.mcpGateways ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-mcp-gateway", id: d.id, name: d.name },
        ...[
          ...d.mcpServerIds ?? [],
          ...d.apiIds ?? [],
          ...d.apiOperationIds ?? [],
          ...d.useCaseIds ?? [],
          ...d.ragIds ?? []
        ].map((c) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: c })),
        ...(e.model.agentGatewayUses ?? []).filter((c) => c.gatewayId === t.id).map((c) => ({ kind: "add-agent-gateway", sourceId: c.agentId, targetId: t.id }))
      ] : null;
    }
    case "add-gateway-exposure":
      return [{ kind: "remove-gateway-exposure", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-gateway-exposure":
      return [{ kind: "add-gateway-exposure", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-gateway":
      return [{ kind: "remove-agent-gateway", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-gateway":
      return [{ kind: "add-agent-gateway", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-api":
      return [{ kind: "remove-agent-api", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-api":
      return [{ kind: "add-agent-api", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-api-operation":
      return [{ kind: "remove-agent-api-operation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-api-operation":
      return [{ kind: "add-agent-api-operation", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-query":
      return [{ kind: "remove-agent-query", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-query":
      return [{ kind: "add-agent-query", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-delegate":
      return [{ kind: "remove-agent-delegate", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-delegate":
      return [{ kind: "add-agent-delegate", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-actor-agent":
      return [{ kind: "remove-actor-agent", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-agent":
      return [{ kind: "add-actor-agent", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-trigger":
      return [{ kind: "remove-agent-trigger", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-trigger":
      return [{ kind: "add-agent-trigger", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-use":
      return [{ kind: "remove-agent-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-use":
      return [{ kind: "add-agent-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-external-use":
      return [{ kind: "remove-agent-external-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-external-use":
      return [{ kind: "add-agent-external-use", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-agent-mcp":
      return [{ kind: "remove-agent-mcp", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-mcp":
      return [{ kind: "add-agent-mcp", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-mcp-server":
      return [{ kind: "remove-mcp-server", id: t.id }];
    case "remove-mcp-server": {
      for (const d of e.model.externalSystems) {
        const c = (d.mcpServers ?? []).find((m) => m.id === t.id);
        if (c)
          return [
            { kind: "add-mcp-server", id: c.id, name: c.name, moduleId: d.id, uri: c.uri },
            ...(e.model.agentMcpUses ?? []).filter((m) => m.mcpServerId === t.id).map(
              (m) => ({
                kind: "add-agent-mcp",
                sourceId: m.agentId,
                targetId: t.id
              })
            )
          ];
      }
      return null;
    }
    case "add-rag":
      return [{ kind: "remove-rag", id: t.id }];
    case "remove-rag": {
      const d = (e.model.rags ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-rag", id: d.id, name: d.name },
        ...(e.model.agentRags ?? []).filter((c) => c.ragId === t.id).map(
          (c) => ({
            kind: "add-agent-rag",
            sourceId: c.agentId,
            targetId: t.id
          })
        ),
        ...(d.sourceReadModelIds ?? []).map(
          (c) => ({ kind: "add-rag-source", sourceId: t.id, targetId: c })
        )
      ] : null;
    }
    case "add-agent-rag":
      return [{ kind: "remove-agent-rag", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-agent-rag":
      return [{ kind: "add-agent-rag", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-rag-source":
      return [{ kind: "remove-rag-source", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-rag-source":
      return [{ kind: "add-rag-source", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-actor":
      return [{ kind: "remove-actor", id: t.id }];
    case "remove-actor": {
      const d = (e.model.actors ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-actor", id: d.id, name: d.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const d of e.model.modules) {
        const c = (d.applicationEvents ?? []).find((m) => m.id === t.id);
        if (c)
          return [{ kind: "add-application-event", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const d of e.model.modules) {
        const c = (d.domainServices ?? []).find((m) => m.id === t.id);
        if (c) return [{ kind: "add-domain-service", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const d = (e.model.projections ?? []).find((c) => c.id === t.id);
      return d && (d.sourceAggregateId || d.sourceExternalUseCaseId || d.sourceExternalTableId) ? [
        {
          kind: "add-projection",
          id: d.id,
          name: d.name,
          aggregateId: d.sourceAggregateId,
          externalUseCaseId: d.sourceExternalUseCaseId,
          externalTableId: d.sourceExternalTableId,
          targetId: d.readModelId,
          moduleId: d.moduleId
        }
      ] : null;
    }
    case "add-external-table":
      return [{ kind: "remove-external-table", id: t.id }];
    case "remove-external-table": {
      for (const d of e.model.externalSystems) {
        const c = (d.tables ?? []).find((m) => m.id === t.id);
        if (c) return [{ kind: "add-external-table", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const d = (f = (y = (e.model.rags ?? []).find((c) => c.id === t.sourceId)) == null ? void 0 : y.contentSources) == null ? void 0 : f.find((c) => c.uri === t.uri);
      return d ? [
        {
          kind: "add-rag-content-source",
          sourceId: t.sourceId,
          type: d.type,
          uri: t.uri
        }
      ] : null;
    }
    case "add-view-member":
      return [{ kind: "remove-view-member", id: t.id, targetId: t.targetId }];
    case "remove-view-member":
      return [{ kind: "add-view-member", id: t.id, targetId: t.targetId }];
    case "add-api":
      return [{ kind: "remove-api", id: t.id }];
    case "remove-api": {
      const d = (e.model.apis ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-api", id: d.id, name: d.name },
        ...d.operations.map(
          (c) => ({
            kind: "add-api-operation",
            apiId: d.id,
            id: c.id,
            name: c.name,
            httpMethod: c.httpMethod,
            path: c.path,
            moduleId: c.targetModuleId,
            targetUseCaseId: c.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const d = (h = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : h.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-api-operation",
          apiId: t.apiId,
          id: d.id,
          name: d.name,
          httpMethod: d.httpMethod,
          path: d.path,
          moduleId: d.targetModuleId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "set-api-operation-target": {
      const d = (x = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : x.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "set-api-operation-target",
          apiId: t.apiId,
          id: t.id,
          moduleId: d.targetModuleId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "remove-read-model": {
      for (const d of e.model.modules) {
        const c = (d.readModels ?? []).find((m) => m.id === t.id);
        if (c != null && c.aggregateId)
          return [{ kind: "add-read-model", id: c.id, name: c.name, aggregateId: c.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const d of e.model.modules) {
        const c = (d.domainEvents ?? []).find((m) => m.id === t.id);
        if (c) return [{ kind: "add-domain-event", id: c.id, name: c.name, moduleId: d.id }];
      }
      return null;
    }
    case "rename-element": {
      const c = (t.type === "module" ? e.model.modules : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.modules.flatMap((m) => m.domainEvents ?? []) : t.type === "read-model" ? e.model.modules.flatMap((m) => m.readModels ?? []) : t.type === "domain-service" ? e.model.modules.flatMap((m) => m.domainServices ?? []) : t.type === "query-service" ? e.model.modules.flatMap((m) => m.queryServices ?? []) : t.type === "use-case" ? e.model.modules.flatMap((m) => m.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((m) => m.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((m) => m.mcpServers ?? []) : t.type === "application-event" ? e.model.modules.flatMap((m) => m.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((m) => m.id === t.id);
      return c ? [{ kind: "rename-element", type: t.type, id: t.id, name: c.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const d = e.model.flows.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-flow",
          id: d.id,
          name: d.name,
          archetype: d.archetype,
          triggerAggregateId: d.triggerAggregateId ?? "",
          triggerEvent: d.triggerEvent ?? "",
          targetId: d.targetId,
          readModelName: d.readModelName,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "add-view":
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const d = (e.model.views ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-view", id: d.id, name: d.name, memberIds: d.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const d = (e.model.processes ?? []).find((k) => k.id === t.processId), c = (d == null ? void 0 : d.steps.findIndex((k) => k.id === t.id)) ?? -1;
      if (!d || c < 0) return null;
      const m = d.steps[c];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: m.id,
          name: m.name,
          stepType: m.type,
          roleId: m.roleId,
          deadline: m.deadline,
          useCaseId: m.useCaseId,
          compensationUseCaseId: m.compensationUseCaseId,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const d = (e.model.processes ?? []).find((m) => m.id === t.processId), c = (d == null ? void 0 : d.steps.findIndex((m) => m.id === t.id)) ?? -1;
      return !d || c < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const d = (e.model.processes ?? []).find((m) => m.id === t.processId), c = d == null ? void 0 : d.steps.find((m) => m.id === t.id);
      return c ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: c.roleId,
          deadline: c.deadline,
          compensationUseCaseId: c.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const d = (e.model.processes ?? []).find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-process",
          id: d.id,
          name: d.name,
          moduleId: d.ownerModuleId ?? "",
          triggerAggregateId: d.triggerAggregateId,
          triggerEvent: d.triggerEvent,
          steps: d.steps
        }
      ] : null;
    }
    case "add-workflow":
      return [{ kind: "remove-workflow", id: t.id }];
    case "remove-workflow": {
      const d = (e.model.workflows ?? []).find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-workflow",
          id: d.id,
          name: d.name,
          triggerAggregateId: d.triggerAggregateId,
          triggerDomainServiceId: d.triggerDomainServiceId,
          triggerUseCaseId: d.triggerUseCaseId,
          triggerEvent: d.triggerEvent,
          completionEventName: d.onCompletionEventName,
          workflowSteps: d.steps
        }
      ] : null;
    }
    case "add-workflow-step":
      return [{ kind: "remove-workflow-step", workflowId: t.workflowId, id: t.id }];
    case "remove-workflow-step": {
      const d = (e.model.workflows ?? []).find((k) => k.id === t.workflowId), c = (d == null ? void 0 : d.steps.findIndex((k) => k.id === t.id)) ?? -1;
      if (!d || c < 0) return null;
      const m = d.steps[c];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: m.id,
          name: m.name,
          emittedEventName: m.emittedEventName,
          targetUseCaseId: m.targetUseCaseId,
          completionEventName: m.completionEventName,
          dependsOnStepIds: m.dependsOnStepIds,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...d.steps.filter((k) => k.id !== t.id && (k.dependsOnStepIds ?? []).includes(t.id)).map(
          (k) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: k.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const d = (e.model.workflows ?? []).find((m) => m.id === t.workflowId), c = d == null ? void 0 : d.steps.find((m) => m.id === t.id);
      return c ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: c.emittedEventName,
          targetUseCaseId: c.targetUseCaseId,
          completionEventName: c.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const d = (e.model.workflows ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "set-workflow-trigger",
        id: t.id,
        triggerEvent: d.triggerEvent ?? "",
        triggerAggregateId: d.triggerAggregateId,
        triggerDomainServiceId: d.triggerDomainServiceId,
        triggerUseCaseId: d.triggerUseCaseId
      }] : null;
    }
    case "add-workflow-dependency":
      return [
        {
          kind: "remove-workflow-dependency",
          workflowId: t.workflowId,
          id: t.id,
          dependsOnStepId: t.dependsOnStepId
        }
      ];
    case "remove-workflow-dependency":
      return [
        {
          kind: "add-workflow-dependency",
          workflowId: t.workflowId,
          id: t.id,
          dependsOnStepId: t.dependsOnStepId
        }
      ];
  }
  return null;
}
const oe = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function ya(e, t, i, n, o, a, s) {
  var I, P, _;
  if (t === "context-map" && e.detail === "distribution") {
    const v = e.sceneFor("context-map"), S = e.model.codeModules ?? [], $ = ((N) => {
      var T;
      for (let D = N; D; ) {
        if (S.some((B) => B.id === D)) return D;
        D = (T = v.nodes.find((B) => B.id === D)) == null ? void 0 : T.parentId;
      }
      return null;
    })(n);
    if ($ && $ !== i) {
      if ((e.model.services ?? []).some((T) => T.id === i)) {
        e.command({ kind: "add-service-code-module", serviceId: i, id: $ });
        return;
      }
      if (!S.some((T) => T.id === i) && !e.model.modules.some((T) => T.id === i)) {
        e.command({ kind: "add-code-module-element", id: $, elementId: i });
        return;
      }
    }
  }
  if (t === "integrations") {
    ya(e, "context-map", i, n, o, a, s);
    return;
  }
  if (t === "eventstorming") {
    const v = (A) => (e.model.customCodes ?? []).some(($) => $.id === A), S = v(n) ? { stepId: i, ccId: n } : v(i) ? { stepId: n, ccId: i } : null;
    if (S) {
      const A = e.owningUseCaseOf(S.stepId);
      A && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: A.id,
        id: S.stepId,
        targetId: S.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const v = (D) => (e.model.pages ?? []).some((B) => B.id === D);
    if (v(i) !== v(n)) {
      const D = v(i) ? i : n, B = v(i) ? n : i, Y = e.owningWorkflowOf(B);
      if (Y) {
        e.command({ kind: "set-workflow-step-form", workflowId: Y.id, id: B, targetId: D });
        return;
      }
    }
    const S = e.model.workflowGateways ?? [], A = (D) => S.some((B) => B.id === D);
    if (A(i) || A(n) || (e.model.workflows ?? []).some((D) => D.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const $ = e.owningWorkflowOf(i), N = e.owningWorkflowOf(n);
    if (!$ || $ !== N || i === n) return;
    const T = $.steps.find((D) => D.id === n);
    if (((T == null ? void 0 : T.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: $.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const v = e.model.pages ?? [], S = e.model.uiApps ?? [], A = (V) => S.some((Z) => Z.id === V), $ = (V) => v.some((Z) => Z.id === V), N = (V) => (e.model.customCodes ?? []).some((Z) => Z.id === V);
    if (N(i) || N(n)) {
      const V = N(i) ? i : n, Z = N(i) ? n : i;
      if (N(Z)) return;
      if ($(Z)) {
        e.command({ kind: "set-page-custom-code", id: Z, targetId: V });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: V, elementId: Z });
      return;
    }
    const T = e.model.buttonGroups ?? [], D = (V) => T.some((Z) => Z.id === V);
    if ((s === "toolbar" || s === "bottom") && D(i) && $(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: s });
      return;
    }
    if (D(i) && D(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const B = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (B) {
      e.model.modules.some((Z) => (Z.useCases ?? []).some((Se) => Se.id === n)) ? e.command({ kind: "set-group-button-target", id: B[1], itemId: B[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (s === "home" && A(i) && ($(n) || A(n))) {
      if (n === i) return;
      e.command(
        $(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (s === "header" && A(i) && $(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((s === "crud-detail" || s === "crud-create") && $(i) && ($(n) || A(n)) && n !== i) {
      const V = s === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        $(n) ? { kind: V, pageId: i, targetId: n, toAppId: null } : { kind: V, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (s === "viewmodel" && $(i)) {
      (e.model.models ?? []).some((V) => V.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((s === "view" || s === "edit") && A(i) && $(n)) {
      e.command({
        kind: s === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (s) return;
    const Y = (V) => /^wizrow:([^:]+):(.+)$/.exec(V), le = Y(i) ?? Y(n);
    if (le) {
      const V = Y(i) ? n : i;
      $(V) && V !== le[1] && e.command({ kind: "set-wizard-step-page", pageId: le[1], itemId: le[2], targetId: V });
      return;
    }
    const de = v.find((V) => V.id === n && V.type === "WIZARD");
    if ($(i) && de && i !== de.id) {
      (de.wizardSteps ?? []).some((V) => V.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: de.id, targetId: i });
      return;
    }
    if ($(i) && A(n)) {
      const V = v.find((Se) => Se.id === i), Z = S.find((Se) => Se.id === n);
      if (Z.type === "MASTER_DETAIL" && !Z.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: n, pageId: i }), e.emit("modux-notice", {
          message: `${V.name} es la cabecera de ${Z.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: n,
        label: V.name,
        pageId: i,
        itemId: e.newMenuItemId(V.name)
      });
      return;
    }
    const q = e.model.identityProviders ?? [], G = (V) => q.some((Z) => Z.id === V);
    if (G(i) || G(n)) {
      const V = G(i) ? i : n, Z = G(i) ? n : i;
      A(Z) ? e.command({ kind: "set-identity-provider", id: Z, targetId: V }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const pe = (V) => (e.model.models ?? []).some((Z) => Z.id === V);
    if (pe(i) || pe(n)) {
      const V = pe(i) ? i : n, Z = pe(i) ? n : i;
      if ($(Z)) {
        e.command({ kind: "set-page-model", pageId: Z, modelId: V });
        return;
      }
      if (A(Z)) {
        e.command({ kind: "set-app-model", appId: Z, modelId: V });
        return;
      }
      return;
    }
    const ge = ke(i);
    if (ge != null && ge.itemId && ((I = ke(n)) != null && I.itemId || A(n))) {
      const V = ke(n), Z = e.menuEntryIn(ge.appId, ge.itemId);
      if (!Z) return;
      if (V != null && V.itemId) {
        const Se = e.menuEntryIn(V.appId, V.itemId);
        if (!Se) return;
        const Pe = (xt) => (xt ?? []).some((di) => di.id === V.itemId || Pe(di.children));
        if (ge.appId === V.appId && (V.itemId === ge.itemId || Pe(Z.entry.children)))
          return;
        const Ue = e.nodeClientRect(n), Te = Ue && a !== void 0 ? (a - Ue.top) / Math.max(1, Ue.height) : 0.5, tt = Te < 0.3 ? "before" : Te > 0.7 ? "after" : "nest";
        if (tt === "nest")
          e.command({
            kind: "move-menu-item",
            appId: ge.appId,
            toAppId: V.appId,
            itemId: ge.itemId,
            parentId: V.itemId
          });
        else {
          const xt = tt === "before" ? V.itemId : Se.beforeId ?? void 0;
          if (ge.appId === V.appId && Se.parentId === Z.parentId && xt === ge.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: ge.appId,
            toAppId: V.appId,
            itemId: ge.itemId,
            parentId: Se.parentId ?? void 0,
            beforeItemId: xt
          });
        }
        return;
      }
      if (ge.appId === n && !Z.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: ge.appId,
        toAppId: n,
        itemId: ge.itemId
      });
      return;
    }
    const Fe = ke(i) ?? ke(n);
    if (Fe) {
      const V = ke(i) ? i : n, Z = ke(i) ? n : i;
      if (((P = e.sceneFor("ui").nodes.find((Te) => Te.id === V)) == null ? void 0 : P.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const Se = e.model.modules.some(
        (Te) => (Te.useCases ?? []).some((tt) => tt.id === Z)
      ), Pe = (e.model.aggregates ?? []).some((Te) => Te.id === Z), Ue = e.model.modules.flatMap((Te) => Te.queryServices ?? []).find((Te) => (Te.operations ?? []).some((tt) => tt.id === Z));
      $(Z) ? e.command({ kind: "set-menu-page", pageId: Z, ...Fe }) : A(Z) && Z !== Fe.appId ? e.command({ kind: "set-menu-app", toAppId: Z, ...Fe }) : Se ? e.command({ kind: "set-menu-use-case", useCaseId: Z, ...Fe }) : Pe ? e.command({ kind: "set-menu-aggregate", aggregateId: Z, ...Fe }) : Ue && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Ue.id,
        queryOperationId: Z,
        ...Fe
      });
      return;
    }
    if ((e.model.actors ?? []).some((V) => V.id === i) && A(n)) {
      (e.model.actorAppUses ?? []).some((V) => V.actorId === i && V.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const $e = $(i) ? { pageId: i, other: n } : $(n) ? { pageId: n, other: i } : null;
    if ($e) {
      const V = new Set(
        e.model.modules.flatMap((Pe) => (Pe.useCases ?? []).map((Ue) => Ue.id))
      ), Z = new Set(
        e.model.modules.flatMap((Pe) => (Pe.queryServices ?? []).map((Ue) => Ue.id))
      ), Se = v.find((Pe) => Pe.id === $e.pageId);
      V.has($e.other) ? (Se.buttons ?? []).some((Pe) => Pe.useCaseId === $e.other) || e.command({ kind: "add-page-button", pageId: $e.pageId, useCaseId: $e.other }) : Z.has($e.other) && e.command({ kind: "set-page-listing", pageId: $e.pageId, queryServiceId: $e.other });
    }
    return;
  }
  if (t === "mappings") {
    const v = e.model.models ?? [], S = vn(i), A = vn(n), $ = e.model.transformations ?? [], N = e.model.customCodes ?? [], T = (q) => N.some((G) => G.id === q);
    if (T(i) && $.some((q) => q.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (T(n) && $.some((q) => q.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (T(i)) {
      const q = (A == null ? void 0 : A.modelId) ?? (v.some((G) => G.id === n) ? n : null);
      if (q) {
        const G = (e.model.modelMappings ?? []).filter(
          (pe) => pe.sourceModelId === q || pe.targetModelId === q
        );
        G.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: G[0].id, targetId: i }) : e.emit("modux-notice", {
          message: G.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if ($.some((q) => q.id === n)) {
      if (A || $.some((G) => G.id === i)) return;
      const q = S ? { modelId: S.modelId, fieldId: S.fieldId } : v.some((G) => G.id === i) ? { modelId: i } : null;
      q && e.command({ kind: "add-transformation-input", id: n, ...q });
      return;
    }
    if ($.some((q) => q.id === i)) {
      const q = A ? { modelId: A.modelId, fieldId: A.fieldId } : v.some((G) => G.id === n) ? { modelId: n } : null;
      q && e.command({ kind: "set-transformation-output", id: i, ...q });
      return;
    }
    if (S && A) {
      if (S.modelId === A.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let q = (e.model.modelMappings ?? []).find(
        (G) => G.sourceModelId === S.modelId && G.targetModelId === A.modelId
      );
      if (!q) {
        const G = v.find((V) => V.id === S.modelId), pe = v.find((V) => V.id === A.modelId);
        if (!G || !pe) return;
        const ge = (V) => V.replace(/[^a-zA-Z0-9]/g, ""), Fe = new Set((e.model.modelMappings ?? []).map((V) => V.id));
        let $e = `mapping-${oe(G.name)}-${oe(pe.name)}`;
        for (let V = 2; Fe.has($e); V++) $e = `mapping-${oe(G.name)}-${oe(pe.name)}-${V}`;
        e.command(
          { kind: "add-model-mapping", id: $e, name: `${ge(G.name)}2${ge(pe.name)}`, sourceId: G.id, targetId: pe.id },
          !1
        ), q = { id: $e, name: "", sourceModelId: G.id, targetModelId: pe.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: q.id,
        sourceId: S.fieldId,
        targetId: A.fieldId
      });
      return;
    }
    if (S && v.some((q) => q.id === n) && n !== S.modelId) {
      e.command({ kind: "move-model-field", modelId: S.modelId, fieldId: S.fieldId, targetId: n });
      return;
    }
    if (!v.some((q) => q.id === i) || !v.some((q) => q.id === n) || i === n || (e.model.modelMappings ?? []).some((q) => q.sourceModelId === i && q.targetModelId === n))
      return;
    const D = v.find((q) => q.id === i), B = v.find((q) => q.id === n), Y = (q) => q.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((q) => q.id));
    let de = `mapping-${oe(D.name)}-${oe(B.name)}`;
    for (let q = 2; le.has(de); q++) de = `mapping-${oe(D.name)}-${oe(B.name)}-${q}`;
    e.command({
      kind: "add-model-mapping",
      id: de,
      name: `${Y(D.name)}2${Y(B.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t !== "context-map") return;
  const l = /^apiop:(.+)@(.+)$/.exec(i);
  if (l) {
    const [, v, S] = l, A = (e.model.proxyApis ?? []).find((B) => B.id === S), $ = (A == null ? void 0 : A.targetApiId) ?? ((_ = (e.model.apiImplementations ?? []).find(
      (B) => B.moduleId === S && (e.model.apis ?? []).some(
        (Y) => Y.id === B.apiId && Y.operations.some((le) => le.id === v)
      )
    )) == null ? void 0 : _.apiId);
    if (!$) return;
    if (new Set(
      e.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: $,
        operationId: v,
        moduleId: S,
        targetUseCaseId: n
      });
      return;
    }
    if (!(A != null && A.targetApiId)) return;
    let T = null;
    if (n === A.targetApiId)
      T = A.targetApiId;
    else {
      const B = /^apiimpl:(.+)@(.+)$/.exec(n);
      B && B[1] === A.targetApiId ? T = B[2] : e.model.modules.some((Y) => Y.id === n) && (e.model.apiImplementations ?? []).some(
        (Y) => Y.apiId === A.targetApiId && Y.moduleId === n
      ) && (T = n);
    }
    if (!T) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (B) => B.proxyId === A.id && B.operationId === v && B.targetSiteId === T
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: A.id,
      operationId: v,
      targetSiteId: T
    });
    return;
  }
  const r = new Set((e.model.aiAgents ?? []).map((v) => v.id));
  if (r.has(i)) {
    if (new Set(
      e.model.modules.flatMap((T) => (T.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (D) => D.agentId === i && D.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((T) => (T.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (D) => D.agentId === i && D.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((T) => (T.mcpServers ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (D) => D.agentId === i && D.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((T) => T.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (D) => D.agentId === i && D.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((T) => T.operations.map((D) => D.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (D) => D.agentId === i && D.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((T) => T.id === n) || (e.model.proxyApis ?? []).some((T) => T.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (D) => D.agentId === i && D.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.modules.flatMap((T) => (T.queryServices ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (D) => D.agentId === i && D.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (r.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (D) => D.agentId === i && D.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((T) => T.id === n) && ((e.model.agentRags ?? []).some(
      (D) => D.agentId === i && D.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((v) => v.id === i)) {
    const v = (e.model.mcpGateways ?? []).find(($) => $.id === i), S = e.model.externalSystems.some(($) => ($.mcpServers ?? []).some((N) => N.id === n)) || (e.model.apis ?? []).some(($) => $.id === n) || (e.model.apis ?? []).some(($) => $.operations.some((N) => N.id === n)) || e.model.modules.some(($) => ($.useCases ?? []).some((N) => N.id === n)) || (e.model.rags ?? []).some(($) => $.id === n), A = [
      ...v.mcpServerIds ?? [],
      ...v.apiIds ?? [],
      ...v.apiOperationIds ?? [],
      ...v.useCaseIds ?? [],
      ...v.ragIds ?? []
    ].includes(n);
    S && !A && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((v) => v.id === n)) return;
  const p = (e.model.rags ?? []).find((v) => v.id === i);
  if (p) {
    if (new Set(
      e.model.modules.flatMap((A) => (A.readModels ?? []).map(($) => $.id))
    ).has(n) && !(p.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((A) => (A.tables ?? []).map(($) => $.id))
    ).has(n) && !(p.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((A) => A.id === n) || (e.model.proxyApis ?? []).some((A) => A.id === n)) && !(p.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((A) => A.id === n) && !(p.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.modules.some((A) => A.id === n) && !(p.sourceModuleIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((v) => v.id === n)) return;
  if ((e.model.workflows ?? []).some((v) => v.id === i)) {
    const v = (e.model.workflows ?? []).find(($) => $.id === i), S = (e.model.workflows ?? []).find(
      ($) => $.id === n && $.id !== i
    );
    if (S) {
      const $ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
      S.triggerEvent !== $ && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: $ });
      return;
    }
    const A = e.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === n);
    if (A && !(v.steps ?? []).some((N) => N.targetUseCaseId === n)) {
      const N = `wfs-${oe(A.name)}`;
      let T = N;
      for (let D = 2; (v.steps ?? []).some((B) => B.id === T); D++)
        T = `${N}-${D}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: i,
        id: T,
        name: A.name,
        targetUseCaseId: n
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((v) => v.id === n)) {
    const v = e.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === i), S = e.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === i), A = v ?? S;
    if (A) {
      const $ = (e.model.emissions ?? []).find((B) => B.domainEventId === i), N = new Set((e.model.aggregates ?? []).map((B) => B.id)), T = new Set(
        e.model.modules.flatMap((B) => (B.domainServices ?? []).map((Y) => Y.id))
      ), D = new Set(
        e.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: A.name,
        triggerAggregateId: $ && N.has($.sourceId) ? $.sourceId : void 0,
        triggerDomainServiceId: $ && T.has($.sourceId) ? $.sourceId : void 0,
        triggerUseCaseId: $ && D.has($.sourceId) ? $.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((v) => v.id === i)) {
    const v = (e.model.proxyApis ?? []).find((S) => S.id === i);
    if ((e.model.apis ?? []).some((S) => S.id === n)) {
      v.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.modules.some((S) => S.id === n)) {
      if (!v.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (A) => A.apiId === v.targetApiId && A.moduleId === n
      ) || e.command({ kind: "add-api-implementation", apiId: v.targetApiId, moduleId: n });
      return;
    }
    e.model.externalSystems.some((S) => S.id === n) && v.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some((v) => v.id === i)) {
    if (e.model.externalSystems.some((v) => v.id === n)) {
      (e.model.apis ?? []).find((S) => S.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.modules.some((v) => v.id === n) && ((e.model.apiImplementations ?? []).some(
      (S) => S.apiId === i && S.moduleId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, moduleId: n }));
    return;
  }
  const g = new Set((e.model.actors ?? []).map((v) => v.id));
  if (r.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.modules.flatMap((S) => (S.domainEvents ?? []).map((A) => A.id)),
      ...e.model.modules.flatMap((S) => (S.applicationEvents ?? []).map((A) => A.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (A) => A.eventId === i && A.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!g.has(i)) return;
  }
  if (g.has(i)) {
    const v = new Set(
      e.model.modules.flatMap((A) => (A.useCases ?? []).map(($) => $.id))
    ), S = new Set(
      e.model.modules.flatMap((A) => (A.queryServices ?? []).map(($) => $.id))
    );
    if (v.has(n) || S.has(n)) {
      (e.model.actorUses ?? []).some(
        ($) => $.actorId === i && $.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((A) => A.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((A) => A.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        ($) => $.actorId === i && $.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((A) => A.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        ($) => $.actorId === i && $.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const y = e.owningApiOf(i);
  if (y) {
    if (new Set(
      e.model.modules.flatMap((S) => (S.useCases ?? []).map((A) => A.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: y.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.modules.some((S) => S.id === n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: y.id,
        id: i,
        moduleId: n
      });
      return;
    }
    return;
  }
  const f = (v) => (e.model.notifications ?? []).find((S) => S.id === v);
  if (f(i) || f(n)) {
    const v = f(i) ?? f(n), S = f(i) ? n : i;
    if (e.model.modules.some(
      ($) => [...$.domainEvents ?? [], ...$.applicationEvents ?? []].some((N) => N.id === S)
    )) {
      v.eventId !== S && e.command({ kind: "set-notification-event", id: v.id, targetId: S });
      return;
    }
    if ((e.model.actors ?? []).some(($) => $.id === S)) {
      (v.recipientRoleIds ?? []).includes(S) || e.command({ kind: "add-notification-recipient", id: v.id, roleId: S });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const h = (v) => (e.model.documents ?? []).find((S) => S.id === v);
  if (h(i) || h(n)) {
    const v = h(i) ?? h(n), S = h(i) ? n : i;
    if ((e.model.models ?? []).find((T) => T.id === S)) {
      e.command({ kind: "set-document-model", id: v.id, modelId: S });
      return;
    }
    const $ = e.model.modules.flatMap((T) => T.queryServices ?? []).find((T) => T.id === S), N = e.model.modules.flatMap((T) => (T.queryServices ?? []).flatMap((D) => (D.operations ?? []).map((B) => ({ op: B, qs: D })))).find(({ op: T }) => T.id === S);
    if ($ || N) {
      e.command({
        kind: "set-document-query",
        id: v.id,
        queryServiceId: ($ == null ? void 0 : $.id) ?? N.qs.id,
        queryOperationId: (N == null ? void 0 : N.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const x = e.model.identityProviders ?? [], d = (v) => x.find((S) => S.id === v);
  if (d(i) || d(n)) {
    const v = d(i) ?? d(n), S = d(i) ? n : i;
    if (d(i) && e.model.externalSystems.some((N) => N.id === S)) {
      v.publishedByExternalSystemId !== S && e.command({ kind: "set-idp-publisher", id: v.id, targetId: S });
      return;
    }
    const A = e.model.modules.some((N) => N.id === S), $ = (e.model.etlFlows ?? []).some((N) => N.id === S);
    if (A || $) {
      e.command({ kind: "set-identity-provider", id: S, targetId: v.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const c = e.model.etlFlows ?? [], m = (v) => c.find((S) => S.id === v);
  if (m(i) || m(n)) {
    const v = m(i) ?? m(n), S = m(i) ? n : i, A = !m(i), $ = new Set(e.model.externalSystems.flatMap((G) => (G.tables ?? []).map((pe) => pe.id))), N = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((G) => G.id),
      ...(e.model.proxyApis ?? []).map((G) => G.id)
    ]), T = (e.model.apis ?? []).find((G) => G.operations.some((pe) => pe.id === S)), D = new Set(
      e.model.modules.flatMap((G) => [
        ...(G.domainEvents ?? []).map((pe) => pe.id),
        ...(G.applicationEvents ?? []).map((pe) => pe.id)
      ])
    );
    let B = null, Y = {};
    if ($.has(S) ? (B = A ? "SOURCE_PULL" : "WRITE_DB", Y = { externalTableId: S }) : T ? (B = A ? "SOURCE_PULL" : "WRITE_API", Y = { apiId: T.id, operationId: S }) : N.has(S) ? (B = A ? "SOURCE_PULL" : "WRITE_API", Y = { apiId: S }) : D.has(S) && (B = A ? "SOURCE_CONSUMER" : "WRITE_EVENT", Y = { targetId: S }), !B) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((v.steps ?? []).some(
      (G) => G.type === B && (G.externalTableId ?? G.operationId ?? G.apiId ?? G.eventId) === (Y.externalTableId ?? Y.operationId ?? Y.apiId ?? Y.targetId)
    )) return;
    const de = new Set((v.steps ?? []).map((G) => G.id));
    let q = (v.steps ?? []).length + 1;
    for (; de.has(`ets-${q}`); ) q++;
    e.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${q}`, stepType: B, ...Y });
    return;
  }
  const k = e.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === i), b = e.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === i);
  if (k || b) {
    const v = (k ?? b).name, S = k ? { externalUseCaseId: i } : { externalTableId: i }, A = (T) => k ? T.sourceExternalUseCaseId === i : T.sourceExternalTableId === i, $ = e.model.modules.flatMap((T) => T.readModels ?? []).find((T) => T.id === n);
    if ($) {
      (e.model.projections ?? []).some(
        (D) => A(D) && D.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(v)}-${oe($.name)}`,
        name: `${$.name}Projection`,
        ...S,
        targetId: n
      });
      return;
    }
    const N = e.model.modules.find((T) => T.id === n);
    if (N) {
      (e.model.projections ?? []).some(
        (D) => A(D) && D.moduleId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(v)}-${oe(N.name)}`,
        name: `${v}ViewProjection`,
        ...S,
        moduleId: n,
        readModelName: `${v}View`
      });
      return;
    }
    return;
  }
  const C = (e.model.aggregates ?? []).find((v) => v.id === i);
  if (C) {
    const v = e.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === n);
    if (v) {
      (e.model.projections ?? []).some(
        ($) => $.sourceAggregateId === i && $.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(C.name)}-${oe(v.name)}`,
        name: `${v.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const S = e.model.modules.find((A) => A.id === n);
    if (S) {
      (e.model.projections ?? []).some(
        ($) => $.sourceAggregateId === i && $.moduleId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(C.name)}-${oe(S.name)}`,
        name: `${C.name}ViewProjection`,
        aggregateId: i,
        moduleId: n,
        readModelName: `${C.name}View`
      });
      return;
    }
  }
  const L = new Set(
    e.model.modules.flatMap((v) => (v.domainEvents ?? []).map((S) => S.id))
  ), R = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((v) => v.id),
    ...e.model.modules.flatMap((v) => (v.domainServices ?? []).map((S) => S.id))
  ]), z = new Set(
    e.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((S) => S.id))
  ), W = new Set(e.model.modules.flatMap((v) => (v.useCases ?? []).map((S) => S.id))), w = new Set(
    e.model.modules.flatMap((v) => (v.queryServices ?? []).map((S) => S.id))
  );
  if (W.has(i) && w.has(n)) {
    (e.model.queryCalls ?? []).some(
      (S) => S.sourceId === i && S.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const E = new Set(
    e.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((S) => S.id))
  );
  if (W.has(i) && E.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (S) => S.sourceId === i && S.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (W.has(i) && W.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      (S) => S.sourceId === i && S.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const H = e.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === i);
  if (H && W.has(n)) {
    H.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (W.has(i) && (e.model.aggregates ?? []).some((v) => v.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      (S) => S.sourceId === i && S.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (R.has(i) && L.has(n) || W.has(i) && z.has(n)) {
    (e.model.emissions ?? []).some(
      (S) => S.sourceId === i && S.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (L.has(i) || z.has(i)) {
    const v = z.has(i), S = e.model.modules.flatMap((q) => (v ? q.applicationEvents : q.domainEvents) ?? []).find((q) => q.id === i), A = e.model.modules.flatMap((q) => (q.useCases ?? []).map((G) => ({ u: G, module: q }))).find(({ u: q }) => q.id === n), $ = e.model.modules.flatMap((q) => (q.readModels ?? []).map((G) => ({ rm: G, module: q }))).find(({ rm: q }) => q.id === n), N = e.model.modules.find((q) => q.id === n) ?? ($ == null ? void 0 : $.module) ?? (A == null ? void 0 : A.module);
    if (!S || !N) return;
    const T = new Set((e.model.aggregates ?? []).map((q) => q.id)), D = new Set(
      e.model.modules.flatMap((q) => (q.domainServices ?? []).map((G) => G.id))
    ), B = (e.model.emissions ?? []).find(
      (q) => q.domainEventId === i && (v ? W.has(q.sourceId) : T.has(q.sourceId) || D.has(q.sourceId))
    );
    if (!B) {
      e.emit("modux-notice", {
        message: v ? `Declara primero qué caso de uso publica ${S.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${S.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const Y = !v && T.has(B.sourceId);
    if (A) {
      if (e.model.flows.some(
        (G) => G.archetype === "TRIGGERS" && G.triggerEvent === S.name && G.targetUseCaseId === A.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${oe(S.name)}-${oe(A.u.name)}`,
        name: A.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: Y ? B.sourceId : "",
        triggerDomainServiceId: !v && !Y ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: S.name,
        targetId: N.id,
        targetUseCaseId: A.u.id
      });
      return;
    }
    const le = ($ == null ? void 0 : $.rm.name) ?? `${S.name}View`;
    if (e.model.flows.some(
      (q) => q.archetype === "MATERIALIZES" && q.triggerEvent === S.name && q.targetId === N.id && q.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${oe(S.name)}-${oe(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: Y ? B.sourceId : "",
      triggerDomainServiceId: !v && !Y ? B.sourceId : void 0,
      triggerUseCaseId: v ? B.sourceId : void 0,
      triggerEvent: S.name,
      targetId: N.id,
      readModelName: le
    });
    return;
  }
  const ne = /* @__PURE__ */ new Set([
    ...R,
    ...W,
    ...w,
    ...e.model.modules.flatMap((v) => (v.readModels ?? []).map((S) => S.id))
  ]);
  if (ne.has(i) || ne.has(n) || L.has(n) || z.has(n))
    return;
  const te = new Set(e.model.externalSystems.map((v) => v.id));
  if (te.has(i)) {
    if (new Set(
      e.model.modules.flatMap((N) => (N.useCases ?? []).map((T) => T.id))
    ).has(n)) {
      (e.model.externalCalls ?? []).some(
        (T) => T.externalSystemId === i && T.useCaseId === n
      ) || e.command({ kind: "add-external-call", sourceId: i, targetId: n });
      return;
    }
    if (te.has(n) && n !== i) {
      e.openExtDepPicker({ sourceId: i, targetId: n, x: o ?? 0, y: a ?? 0 });
      return;
    }
    const S = (e.model.apis ?? []).find(
      (N) => N.operations.some((T) => T.id === n)
    ), A = /^apiop:(.+)@(.+)$/.exec(n), $ = S ? { operationId: n, siteId: S.id } : A ? { operationId: A[1], siteId: A[2] } : null;
    if ($) {
      (e.model.externalOperationUses ?? []).some(
        (T) => T.externalSystemId === i && T.operationId === $.operationId && T.siteId === $.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: $.operationId,
        targetSiteId: $.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === n) || (e.model.proxyApis ?? []).some((N) => N.id === n)) {
      (e.model.externalSystemDependencies ?? []).some(
        (T) => T.sourceId === i && T.targetId === n
      ) || e.command({ kind: "add-external-dependency", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  te.has(n) || g.has(n);
}
function Hc(e, t, i, n, o) {
  var a, s, l;
  if (t === "eventstorming" && i === "edge" && o === "es-custom") {
    const r = /^escc:(.+)$/.exec(n), p = r ? e.owningUseCaseOf(r[1]) : null;
    r && p && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: p.id, id: r[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "ui") {
    if (i === "edge") {
      let r;
      if (r = /^idpauth:(.+)$/.exec(n))
        e.command({ kind: "set-identity-provider", id: r[1], targetId: null });
      else if (r = /^appheader:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-header-page", appId: r[1], pageId: null });
      else if (r = /^apphome:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-home-page", appId: r[1], pageId: null });
      else if (r = /^appmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-model", appId: r[1], modelId: null });
      else if (r = /^appview:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-view-page", appId: r[1], pageId: null });
      else if (r = /^appedit:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-edit-page", appId: r[1], pageId: null });
      else if (r = /^cruddetail:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-detail", pageId: r[1], targetId: null, toAppId: null });
      else if (r = /^crudnew:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-create", pageId: r[1], targetId: null, toAppId: null });
      else if (r = /^wizstep:([^:]+):(.+)$/.exec(n))
        e.command({ kind: "set-wizard-step-page", pageId: r[1], itemId: r[2], targetId: null });
      else if (r = /^pgbtn:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-page-button", pageId: r[1], useCaseId: r[2] });
      else if (r = /^pglist:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-listing", pageId: r[1], queryServiceId: null });
      else if (r = /^pgmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-model", pageId: r[1], modelId: null });
      else if (r = /^actorapp:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-actor-app", actorId: r[1], appId: r[2] });
      else if (r = /^menupage:(.+)->[^>]+$/.exec(n)) {
        const p = ke(r[1]);
        p && e.command({ kind: "set-menu-page", pageId: null, ...p });
      } else if (r = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const p = ke(r[1]);
        p && e.command({ kind: "set-menu-app", toAppId: null, ...p });
      } else if (r = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const p = ke(r[1]);
        p && e.command({ kind: "set-menu-use-case", useCaseId: null, ...p });
      } else if (r = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const p = ke(r[1]);
        p && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...p });
      } else if (r = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const p = ke(r[1]);
        p && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...p });
      }
      return;
    }
    if (o === "ui-app") {
      e.command({ kind: "delete-ui-app", id: n });
      return;
    }
    if (o === "page") {
      e.command({ kind: "delete-ui-page", id: n });
      return;
    }
    if (o === "menu-item" || o === "menu-group") {
      const r = ke(n);
      r && e.command({ kind: "remove-menu-item", ...r });
      return;
    }
    if (o === "wizard-step-row") {
      const r = /^wizrow:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-wizard-step", pageId: r[1], targetId: r[2] });
      return;
    }
    if (o === "model") {
      e.command({ kind: "remove-model", id: n });
      return;
    }
    if (o === "identity-provider") {
      e.command({ kind: "remove-identity-provider", id: n });
      return;
    }
    if (o === "custom-code") {
      e.command({ kind: "remove-custom-code", id: n });
      return;
    }
    if (o === "button-group") {
      e.command({ kind: "remove-button-group", id: n });
      return;
    }
    if (o === "group-button") {
      const r = /^gbtn:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-button", id: r[1], itemId: r[2] });
      return;
    }
    if (o === "group-subgroup") {
      const r = /^gsub:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-subgroup", id: r[1], targetId: r[2] });
      return;
    }
    if (i === "edge" && o === "bar-group") {
      const r = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-bar-group", pageId: r[1], id: r[2] });
      return;
    }
    if (i === "edge" && o === "gbtn-target") {
      const r = /^gbtnt:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "set-group-button-target", id: r[1], itemId: r[2], useCaseId: null });
      return;
    }
    if (i === "edge" && o === "ui-custom-page") {
      const r = /^ccpage:(.+)$/.exec(n);
      r && e.command({ kind: "set-page-custom-code", id: r[1], targetId: null });
      return;
    }
    if (i === "edge" && o === "cc-uses") {
      const r = /^ccuse:(.+)->(.+)$/.exec(n);
      r && e.command({ kind: "remove-custom-code-use", id: r[1], elementId: r[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && o === "model-mapping") {
    const r = /^mapping:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: r[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "mapping-rule") {
    const r = /^maprule:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: r[1], itemId: r[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model-field") {
    const r = vn(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: r.modelId, fieldId: r.fieldId }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model") {
    e.clearSelection(), e.command({ kind: "remove-model", id: n });
    return;
  }
  if (t === "mappings" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-transformation") {
    const r = /^cctf:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-mapping") {
    const r = /^ccmap:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-input") {
    const r = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    r && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: r[1],
      modelId: r[2],
      ...r[3] ? { fieldId: r[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-output") {
    const r = /^tfout:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: r[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && o === "workflow-dependency") {
    const r = /^wfdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    const p = e.owningWorkflowOf(r[2]);
    if (!p) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: p.id,
      id: r[2],
      dependsOnStepId: r[1]
    });
    return;
  }
  if (t === "workflows" && i === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-form") {
    const r = /^wfform:(.+)->(.+)$/.exec(n);
    if (r) {
      const p = e.owningWorkflowOf(r[1]);
      if (!p) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: p.id, id: r[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-link") {
    const r = /^wflink:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: r[1], targetId: r[2] }));
    return;
  }
  if (i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "workflow-step") {
    const r = e.owningWorkflowOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-impl-wire") {
    const r = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!r) return;
    const [, p, g] = r, y = (a = (e.model.apis ?? []).find(
      (f) => f.operations.some((h) => h.id === p)
    )) == null ? void 0 : a.id;
    if (!y) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: y, operationId: p, moduleId: g });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-op-use") {
    const r = /^extopuse:(.+)->(.+)@(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: r[1],
      operationId: r[2],
      targetSiteId: r[3]
    });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "op-route") {
    const r = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!r) return;
    const [, p, g, y] = r, f = /^apiimpl:.+@(.+)$/.exec(y), h = f ? f[1] : y;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: g, operationId: p, targetSiteId: h });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "relation") {
    const r = /^rel:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "emission") {
    const r = /^emit:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "projection") {
    const r = /^proj:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: r[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "uc-call") {
    const r = /^uccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-trigger") {
    const r = /^notif:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-notification-event", id: r[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-recipient") {
    const r = /^notifto:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: r[1], roleId: r[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "document-query") {
    const r = /^docq:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-document-query", id: r[1], queryServiceId: null, queryOperationId: null }));
    return;
  }
  if (t === "context-map" && i === "node" && o === "notification") {
    e.clearSelection(), e.command({ kind: "remove-notification", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "document") {
    e.clearSelection(), e.command({ kind: "remove-document", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "idp-trust" || o === "idp-service")) {
    const r = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "idp-federation") {
    const r = /^idpfed:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (o === "etl-source" || o === "etl-write")) {
    const r = /^etl:([^:]+):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: r[1], id: r[2] });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "node" && o === "etl-flow") {
    e.clearSelection(), e.command({ kind: "remove-etl-flow", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "ui-app") {
    e.clearSelection(), e.command({ kind: "delete-ui-app", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "deploys") {
    const r = /^deploy:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-service-code-module", serviceId: r[1], id: r[2] }));
    return;
  }
  if (t === "context-map" && i === "node" && o === "code-module") {
    e.clearSelection(), e.command({ kind: "remove-code-module", id: n });
    return;
  }
  if (t === "context-map" && e.detail === "distribution" && i === "node") {
    const r = e.sceneFor("context-map");
    for (let p = (s = r.nodes.find((g) => g.id === n)) == null ? void 0 : s.parentId; p; ) {
      if ((e.model.codeModules ?? []).some((g) => g.id === p)) {
        e.clearSelection(), e.command({ kind: "remove-code-module-element", id: p, elementId: n });
        return;
      }
      p = (l = r.nodes.find((g) => g.id === p)) == null ? void 0 : l.parentId;
    }
    return;
  }
  if (t === "context-map" && i === "edge" && o === "st-fire") {
    const r = /^stfire:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: r[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agg-call") {
    const r = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "qs-call") {
    const r = /^qscall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "external-call") {
    const r = /^extcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-uc-call") {
    const r = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-use") {
    const r = /^mcp:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-external-use") {
    const r = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-mcp") {
    const r = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "gateway-exposure") {
    const r = /^gwx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-gateway") {
    const r = /^aggw:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api-op") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-query") {
    const r = /^agqs:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-delegate") {
    const r = /^agag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-agent") {
    const r = /^useag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-trigger") {
    const r = /^evag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (i === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-rag") {
    const r = /^agrag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "rag-source") {
    const r = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const r = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[2], targetId: r[1] });
    return;
  }
  if (i === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && o === "rag-content-source") {
    const r = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: r[1], uri: r[2] });
    return;
  }
  if (i === "node" && o === "external-table") {
    e.clearSelection(), e.command({ kind: "remove-external-table", id: n });
    return;
  }
  if (i === "node" && o === "mcp-server") {
    e.clearSelection(), e.command({ kind: "remove-mcp-server", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-wire") {
    const r = /^apiwire:(.+)$/.exec(n), p = r ? e.owningApiOf(r[1]) : null;
    if (!r || !p) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: p.id, id: r[1] });
    return;
  }
  if (i === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && o === "api-impl") {
    const r = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: r[1], moduleId: r[2] });
    return;
  }
  if (i === "node" && o === "proxy-api") {
    e.clearSelection(), e.command({ kind: "remove-proxy-api", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "api-operation") {
    const r = e.owningApiOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-use") {
    const r = /^use:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-ext") {
    const r = /^extdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-dep") {
    const r = /^xdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "wf-chain") {
    const r = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: r[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "proxy-target") {
    const r = /^pxt:(.+)->(.+)$/.exec(n);
    if (!r || !(e.model.proxyApis ?? []).some((p) => p.id === r[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: r[1], targetId: "" });
    return;
  }
  if (i === "node" && o === "module") {
    if ((e.model.aggregates ?? []).some((p) => p.moduleId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (i === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((p) => p.aggregateId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: n });
    return;
  }
  if (i === "node" && o === "domain-event") {
    e.clearSelection(), e.command({ kind: "remove-domain-event", id: n });
    return;
  }
  if (i === "node" && o === "read-model") {
    e.clearSelection(), e.command({ kind: "remove-read-model", id: n });
    return;
  }
  if (i === "node" && o === "domain-service") {
    e.clearSelection(), e.command({ kind: "remove-domain-service", id: n });
    return;
  }
  if (i === "node" && o === "query-service") {
    e.clearSelection(), e.command({ kind: "remove-query-service", id: n });
    return;
  }
  if (i === "node" && o === "use-case") {
    e.clearSelection(), e.command({ kind: "remove-use-case", id: n });
    return;
  }
  if (i === "node" && o === "external-use-case") {
    e.clearSelection(), e.command({ kind: "remove-external-use-case", id: n });
    return;
  }
  if (i === "node" && o === "application-event") {
    e.clearSelection(), e.command({ kind: "remove-application-event", id: n });
    return;
  }
  if (i === "node" && o === "external-system") {
    e.clearSelection(), e.command({ kind: "remove-external-system", id: n });
    return;
  }
  if (i === "node" && o === "actor") {
    e.clearSelection(), e.command({ kind: "remove-actor", id: n });
    return;
  }
  if (i === "node" && o === "ai-agent") {
    e.clearSelection(), e.command({ kind: "remove-ai-agent", id: n });
    return;
  }
  if (i === "node" && o === "flow") {
    e.clearSelection(), e.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
    return;
  }
  if (i === "node" && o === "process") {
    e.clearSelection(), e.command({ kind: "remove-process", id: n });
    return;
  }
  if (i === "node" && o === "process-step") {
    const r = e.owningProcessOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: r.id, id: n });
  }
}
const Gc = [
  "Estratégico",
  "Dominio",
  "Distribución",
  "APIs",
  "Sistema externo",
  "IA",
  "Orquestación",
  "UI",
  "Modelos",
  "Layouts",
  "Componentes"
], Po = [
  { type: "module", label: "Contexto", symbol: "component", color: "#94a3b8", group: "Estratégico" },
  { type: "actor", label: "Actor", symbol: "person", color: "#64748b", group: "Estratégico" },
  { type: "project-reference", label: "Proyecto (catálogo)", symbol: "component", color: "#334155", group: "Estratégico" },
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
  { type: "workflow-join", label: "Join", symbol: "flow", color: "#6d28d9", group: "Orquestación" },
  { type: "workflow-split", label: "Split", symbol: "flow", color: "#6d28d9", group: "Orquestación" },
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
  { type: "code-module", label: "Módulo", child: !0, symbol: "component", color: "#334155", group: "Distribución" },
  { type: "ui-app", label: "App", symbol: "component", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-orchestrator", label: "Orquestador", symbol: "process", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-masterdetail", label: "Maestro-detalle", symbol: "component", color: "#0ea5e9", group: "UI" },
  { type: "ui-app-vieweditor", label: "Vista-editor", symbol: "process", color: "#c026d3", group: "UI" },
  { type: "page", label: "Página", child: !0, symbol: "interface", color: "#0284c7", group: "UI" },
  { type: "menu-item", label: "Opción de menú", child: !0, symbol: "process", color: "#0ea5e9", group: "UI" },
  { type: "button-group", label: "Grupo de botones", symbol: "usecase", color: "#0e7490", group: "UI" },
  { type: "ui-button", label: "Botón", child: !0, symbol: "usecase", color: "#0e7490", group: "UI" },
  { type: "ui-page-crud", label: "CRUD", child: !0, symbol: "lens", color: "#0284c7", group: "UI" },
  { type: "ui-page-wizard", label: "Wizard", child: !0, symbol: "flow", color: "#0284c7", group: "UI" },
  { type: "ui-wizard-step", label: "Paso de wizard", child: !0, symbol: "flow", color: "#7c3aed", group: "UI" },
  { type: "ui-model", label: "Modelo", symbol: "readmodel", color: "#8b5cf6", group: "UI" },
  { type: "model-field", label: "Campo", child: !0, symbol: "gear", color: "#a78bfa", group: "Modelos" },
  { type: "transformation", label: "Transformación", symbol: "gear", color: "#ea580c", group: "Modelos" },
  { type: "custom-code", label: "Custom code", symbol: "gear", color: "#0f172a", group: "Modelos" },
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
var Yc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, J = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? jc(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Yc(t, i, o), o;
};
const wn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Kc = Object.keys(wn);
function Wt(e, t, i) {
  const n = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, s = i.y + i.h / 2;
  let l = 0, r = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [y, f] of [
    [-p, e.x - n],
    [p, o - e.x],
    [-g, e.y - a],
    [g, s - e.y]
  ]) {
    if (y === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / y;
    if (y < 0) {
      if (h > r) return !1;
      h > l && (l = h);
    } else {
      if (h < l) return !1;
      h < r && (r = h);
    }
  }
  return r - l > 0.02;
}
function Xc(e, t, i = 28) {
  var p;
  const n = new Map(e.nodes.map((g) => [g.id, g])), o = (g) => {
    var f;
    const y = /* @__PURE__ */ new Set();
    for (let h = g; h; h = (f = n.get(h)) == null ? void 0 : f.parentId) y.add(h);
    return y;
  }, a = e.nodes, s = (g) => g.parentId ? Math.min(i, 6) : i, l = /* @__PURE__ */ new Map(), r = (g, y, f) => {
    const h = s(f), x = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, d = f.w / 2 + h * 1.5, c = f.h / 2 + h * 1.5, m = { x: f.x - d, y: f.y - c }, k = { x: f.x + d, y: f.y - c }, b = { x: f.x - d, y: f.y + c }, C = { x: f.x + d, y: f.y + c }, L = [];
    for (const R of [m, k, b, C])
      !Wt(g, R, x) && !Wt(R, y, x) && L.push([R]);
    for (const [R, z] of [
      [m, k],
      [k, m],
      [k, C],
      [C, k],
      [C, b],
      [b, C],
      [b, m],
      [m, b]
    ])
      !Wt(g, R, x) && !Wt(z, y, x) && L.push([R, z]);
    return L;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const y = n.get(g.sourceId), f = n.get(g.targetId);
    if (!y || !f) continue;
    const h = /* @__PURE__ */ new Set([...o(y.id), ...o(f.id)]), x = [
      { x: y.x, y: y.y },
      { x: f.x, y: f.y }
    ];
    for (let d = 0; d < 12; d++) {
      let c = !1;
      e: for (let m = 0; m < x.length - 1; m++)
        for (const k of a) {
          if (h.has(k.id)) continue;
          const b = s(k), C = { x: k.x, y: k.y, w: k.w + 2 * b, h: k.h + 2 * b };
          if (!Wt(x[m], x[m + 1], C)) continue;
          const L = r(x[m], x[m + 1], k);
          if (!L.length) continue;
          const R = (W) => a.some(
            (w) => w !== k && !h.has(w.id) && Math.abs(W.x - w.x) < w.w / 2 + s(w) / 2 && Math.abs(W.y - w.y) < w.h / 2 + s(w) / 2
          ), z = (W) => {
            let w = 0;
            const E = [x[m], ...W, x[m + 1]];
            for (let H = 0; H < E.length - 1; H++)
              w += Math.hypot(E[H + 1].x - E[H].x, E[H + 1].y - E[H].y);
            return w + (W.some(R) ? 1e4 : 0);
          };
          L.sort((W, w) => z(W) - z(w)), x.splice(m + 1, 0, ...L[0]), c = !0;
          break e;
        }
      if (!c) break;
    }
    x.length > 2 && l.set(
      g.id,
      x.slice(1, -1).map((d) => ({ x: Math.round(d.x), y: Math.round(d.y) }))
    );
  }
  return l;
}
function Qc(e, t) {
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
    case "service":
      return { elementType: "service", id: e };
    case "actor":
      return { elementType: "actor", id: e };
    case "query-service":
      return { elementType: "query-service", id: e };
    case "scheduled-trigger":
      return { elementType: "scheduled-trigger", id: e };
    case "workflow-gateway":
      return { elementType: "workflow-gateway", id: e };
    case "model":
      return { elementType: "model", id: e };
    case "mapping":
      return { elementType: "mapping", id: e };
    case "component":
      return { elementType: "component", id: e };
    case "external-system":
      return { elementType: "external-system", id: e };
    case "code-module":
      return { elementType: "code-module", id: e };
    case "custom-code":
      return { elementType: "custom-code", id: e };
    case "transformation":
      return { elementType: "transformation", id: e };
    case "etl-flow":
      return { elementType: "etl-flow", id: e };
    case "button-group":
      return { elementType: "button-group", id: e };
    case "identity-provider":
      return { elementType: "identity-provider", id: e };
    case "ai-agent":
      return { elementType: "ai-agent", id: e };
    case "rag":
      return { elementType: "rag", id: e };
    case "mcp-gateway":
      return { elementType: "mcp-gateway", id: e };
    default:
      return null;
  }
}
function Jc(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let X = class extends Ve {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._drawer = null, this._yugo = !0, this.repositories = [], this.dark = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var a;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), o = (s) => {
        e.preventDefault(), this.onDiagramScopeChange(s);
      };
      switch (e.key) {
        case "p":
        case "P":
          ["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
          break;
        case "y":
        case "Y":
          this._view !== "design" && (e.preventDefault(), this._yugo = !this._yugo, this._yugo && (this._tilt = !1));
          break;
        case "f":
        case "F":
          e.preventDefault(), this.toggleFullscreen();
          break;
        case "0":
          e.preventDefault(), n == null || n.fit(), (a = this.renderRoot.querySelector("modux-explorer")) == null || a.fit();
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
          o("level:contexts");
          break;
        case "2":
          o("level:detail");
          break;
        case "3":
          o("level:operations");
          break;
        case "4":
          o("level:distribution");
          break;
        case "4":
          o("view:aggregates");
          break;
        case "5":
          o("view:flows");
          break;
        case "6":
          o("view:processes");
          break;
        case "7":
          o("view:workflows");
          break;
        case "8":
          o("view:ui");
          break;
        case "9":
          o("view:design");
          break;
        case "?":
          e.preventDefault(), this._helpOpen = !this._helpOpen;
          break;
        case "Escape":
          this._helpOpen && (this._helpOpen = !1);
          break;
      }
    }, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: i, beforeId: n, nestRowId: o } = e.detail, a = ke(t);
      if (!(a != null && a.itemId)) return;
      const s = this.menuEntryIn(a.appId, a.itemId);
      if (!s) return;
      const l = (r, p) => (r ?? []).some((g) => g.id === p || l(g.children, p));
      if (o) {
        const r = ke(o);
        if (!(r != null && r.itemId) || r.itemId === a.itemId || a.appId === r.appId && l(s.entry.children, r.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: r.appId,
          itemId: a.itemId,
          parentId: r.itemId
        });
        return;
      }
      if (n) {
        const r = ke(n);
        if (!(r != null && r.itemId) || r.itemId === a.itemId) return;
        const p = this.menuEntryIn(r.appId, r.itemId);
        if (!p || a.appId === r.appId && l(s.entry.children, r.itemId) || a.appId === r.appId && p.parentId === s.parentId && s.beforeId === r.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: r.appId,
          itemId: a.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: r.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: a.appId, toAppId: i, itemId: a.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var a;
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const o = i ? ((a = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : a[1]) ?? null : null;
      this.moveWizardStep(n[1], n[2], o);
    }, this.onDesignKeydown = (e) => {
      const t = e.target;
      if (!(t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
        if ((e.key === "Delete" || e.key === "Backspace") && this._selectedCmp) {
          const { pageId: i, componentId: n } = this._selectedCmp;
          this._selectedCmp = null, this.command({ kind: "remove-page-component", pageId: i, componentId: n }), e.preventDefault();
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: o, beforeComponentId: a } = e.detail, s = this.componentIn(t, n);
      if (!s || t === i) return;
      const l = JSON.parse(JSON.stringify(s.node)), { ops: r } = this.rebuildComponentOps(i, l, o ?? void 0, a);
      for (const p of r) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, l, s.parentId ?? void 0, s.beforeId).ops
      ]), this._selectedCmp = { pageId: i, componentId: n };
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
    return pi(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = pi(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations" || t === "distribution") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = pi(this.layout[i]);
    this._detail = e, this._paletteOpen = !0, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = pi(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), s = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), l = Bi(s), r = [...l.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: a.nodes[g] ?? null
    })), p = { ...a.nodes };
    for (const [g, y] of l) {
      const f = s.find((x) => x.id === g), h = a.nodes[g] ?? { x: f.x, y: f.y };
      p[g] = {
        x: Math.round(h.x + (y.x - f.x)),
        y: Math.round(h.y + (y.y - f.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: p }), r.length && this.pushUndoEntry(r);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Xc(e, t);
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
    const { id: t, x: i, y: n } = e.detail, o = this._view, a = this.viewLayout(o), s = a.nodes[t] ?? null;
    let l = { x: i, y: n };
    const r = this.sceneFor(o), p = r.nodes.find((y) => y.id === t);
    if (p != null && p.parentId) {
      const y = r.nodes.find((f) => f.id === p.parentId);
      y && (l = { x: i - y.x, y: n - y.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: l } });
    const g = [{ kind: "move-node", view: o, id: t, pos: s }];
    if (o === "processes") {
      const y = this.stepReorderCommand(t);
      if (y) {
        const f = this.inverseOf(y);
        f && g.unshift(...f), this.command(y, !1);
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
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = (this.model.apis ?? []).find((x) => x.id === t) ?? (this.model.proxyApis ?? []).find((x) => x.id === t);
    if (!a || i && !this.model.externalSystems.some((x) => x.id === i)) return;
    const s = a.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === s) return;
    const r = this._view, p = this.viewLayout(r), g = this.sceneFor(r), y = l ? g.nodes.find((x) => x.id === l) : void 0, f = y ? { x: n - y.x, y: o - y.y } : { x: n, y: o }, h = [
      { kind: "set-api-publisher", id: t, targetId: s },
      { kind: "move-node", view: r, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(r, { ...p, nodes: { ...p.nodes, [t]: f } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = (this.model.apis ?? []).find((x) => x.id === t), s = this.model.externalSystems.find((x) => x.id === i);
    if (!a || !s || (this.model.proxyApis ?? []).some(
      (x) => x.targetApiId === t && x.publishedByExternalSystemId === i
    )) return;
    const r = `proxy-${oe(a.name)}-${oe(s.name)}`;
    if ((this.model.proxyApis ?? []).some((x) => x.id === r)) return;
    const p = this._view, g = this.viewLayout(p), f = this.sceneFor(p).nodes.find((x) => x.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: r,
        name: `${a.name}@${s.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const h = [{ kind: "remove-proxy-api", id: r }];
    f && (h.push({ kind: "move-node", view: p, id: r, pos: g.nodes[r] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [r]: { x: n - f.x, y: o - f.y } }
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
    var l, r, p;
    const t = e.target, i = (l = t.files) == null ? void 0 : l[0];
    if (t.value = "", !i) return;
    const n = await i.text(), o = this.selectedApiId(), a = o ? null : ((r = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : r.id) ?? null, s = o || a ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!o && !a && !s) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: o,
      homeExternalId: a,
      homeModuleId: s
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
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), o = new Set(n.collapsed ?? []);
    o.has(t) ? o.delete(t) : o.add(t), this.writeViewLayout(i, { ...n, collapsed: [...o] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), o = this.sceneFor(i), a = { ...n.nodes }, s = [];
    for (const { id: l, x: r, y: p } of t) {
      s.push({ kind: "move-node", view: i, id: l, pos: n.nodes[l] ?? null });
      let g = { x: r, y: p };
      const y = o.nodes.find((f) => f.id === l);
      if (y != null && y.parentId) {
        const f = o.nodes.find((h) => h.id === y.parentId);
        f && (g = { x: r - f.x, y: p - f.y });
      }
      a[l] = g;
    }
    if (this.writeViewLayout(i, { ...n, nodes: a }), i === "processes")
      for (const { id: l } of t) {
        const r = this.stepReorderCommand(l);
        if (r) {
          const p = this.inverseOf(r);
          p && s.unshift(...p), this.command(r, !1);
        }
      }
    this.pushUndoEntry(s);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: n, w: o, h: a } = e.detail, s = this._view, l = this.viewLayout(s), r = this.sceneFor(s).nodes.filter((y) => y.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: s, id: t, size: ((g = l.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: s, id: t, pos: l.nodes[t] ?? null },
      ...r.map((y) => ({ kind: "move-node", view: s, id: y.id, pos: l.nodes[y.id] ?? null }))
    ]);
    const p = { ...l.nodes, [t]: { x: i, y: n } };
    for (const y of r) p[y.id] = { x: y.x - i, y: y.y - n };
    this.writeViewLayout(s, {
      ...l,
      nodes: p,
      sizes: { ...l.sizes ?? {}, [t]: { w: o, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, o = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: o.edges[t] ?? null }
    ]);
    const a = { ...o.edges };
    i.length ? a[t] = i : delete a[t], this.writeViewLayout(n, { ...o, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Fn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((s) => [s.id, s.x])), o = [...t.steps].sort(
      (s, l) => (n.get(s.id) ?? 0) - (n.get(l.id) ?? 0)
    );
    if (o.every((s, l) => s.id === t.steps[l].id)) return null;
    const a = o.findIndex((s) => s.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? o[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: o, connectKind: a } = e.detail;
    this.applyConnection(t, i, n, o, a);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
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
      const o = this.memberIdOf(i, n), a = (this.model.views ?? []).find((s) => s.id === this._activeViewId);
      if (o && (a != null && a.memberIds.includes(o))) {
        this._deletePicker = { elementType: t, id: i, kind: n, memberId: o };
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
  inverseOf(e) {
    return Vc(this.gestureHost(), e);
  }
  applyConnection(e, t, i, n, o) {
    ya(this.gestureHost(), this._view, e, t, i, n, o);
  }
  performDelete(e, t, i) {
    Hc(this.gestureHost(), this._view, e, t, i);
  }
  /** The thin surface the extracted gesture/undo vocabulary works against. */
  gestureHost() {
    return {
      model: this.model,
      detail: this._detail,
      command: (e, t) => this.command(e, t),
      emit: (e, t) => this.emit(e, t),
      sceneFor: (e) => this.sceneFor(e),
      owningProcessOf: (e) => this.owningProcessOf(e),
      owningUseCaseOf: (e) => this.owningUseCaseOf(e),
      owningWorkflowOf: (e) => this.owningWorkflowOf(e),
      owningApiOf: (e) => this.owningApiOf(e),
      menuEntryIn: (e, t) => this.menuEntryIn(e, t),
      newMenuItemId: (e) => this.newMenuItemId(e),
      rebuildComponentOps: (e, t, i, n, o, a) => this.rebuildComponentOps(e, t, i, n, o, a),
      openExtDepPicker: (e) => {
        this._extDepPicker = e;
      },
      nodeClientRect: (e) => {
        var i;
        const t = (i = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : i.renderRoot.querySelector(`g[data-node-id="${e}"]`);
        return t == null ? void 0 : t.getBoundingClientRect();
      },
      clearSelection: () => {
        this._selectedId = null;
      }
    };
  }
  owningProcessOf(e) {
    return (this.model.processes ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningUseCaseOf(e) {
    return this.model.modules.flatMap((t) => t.useCases ?? []).find((t) => (t.steps ?? []).some((i) => i.id === e));
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
    const t = (this.model.processes ?? []).find((o) => o.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const n = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${oe(e)}`,
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
      id: `wfstep-${oe(e)}`,
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
    const e = (this.model.views ?? []).find((o) => o.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (o, a, s = {}) => M`
      <label
        class="${s.child ? "child" : ""} ${s.implicit && !t.has(o) ? "implicit" : ""}"
        title=${s.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(l) => this.toggleViewMember(o, l.target.checked)}
        />
        ${a}
      </label>
    `, n = (o, a) => a.length ? M`<h4>${o}</h4>${a}` : "";
    return M`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.modules.flatMap((o) => [
        i(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((a) => a.moduleId === o.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(o.id) }))
      ])
    )}
        ${n(
      "Sistemas externos",
      this.model.externalSystems.map((o) => i(o.id, o.name))
    )}
        ${n("APIs", (this.model.apis ?? []).map((o) => i(o.id, o.name)))}
        ${n("Actores", (this.model.actors ?? []).map((o) => i(o.id, o.name)))}
        ${n("Agentes IA", (this.model.aiAgents ?? []).map((o) => i(o.id, o.name)))}
        ${n("Gateways MCP", (this.model.mcpGateways ?? []).map((o) => i(o.id, o.name)))}
        ${n("RAGs", (this.model.rags ?? []).map((o) => i(o.id, o.name)))}
        ${n("Flows", this.model.flows.map((o) => i(o.id, o.name)))}
        ${n("Procesos", (this.model.processes ?? []).map((o) => i(o.id, o.name)))}
        ${n("Workflows", (this.model.workflows ?? []).map((o) => i(o.id, o.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((o) => o.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const n = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((o) => o.id === e.detail.id);
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
      const n = e.nodes.find((o) => o.id === i);
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
            const o = ke(i);
            o && t.add(o.appId);
            break;
          }
          case "flow":
            t.add(i.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const o = this.owningProcessOf(i);
            o && t.add(o.id);
            break;
          }
          case "workflow-step": {
            const o = this.owningWorkflowOf(i);
            o && t.add(o.id);
            break;
          }
        }
    }
    return [...t];
  }
  createViewFromSelection() {
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection();
    if (!e || !t.length) return;
    const i = `view-${oe(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), n = new Set(i.map((h) => h.id)), o = this.model.externalSystems.filter((h) => t.has(h.id)), a = new Set(o.map((h) => h.id)), s = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || n.has(h.moduleId)
    ), l = new Set(s.map((h) => h.id)), r = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), p = /* @__PURE__ */ new Set(), g = (h) => {
      for (const x of h ?? [])
        x.pageId && p.add(x.pageId), g(x.children);
    };
    r.forEach((h) => g(h.menuItems));
    const y = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || p.has(h.id)
    ), f = new Set(r.map((h) => h.id));
    return {
      ...this.model,
      uiApps: r,
      pages: y,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => f.has(h.appId)),
      modules: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (h) => n.has(h.sourceId) && n.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (n.has(h.sourceId) || a.has(h.sourceId)) && (n.has(h.targetId) || a.has(h.targetId))
      ),
      aggregates: s,
      entities: (this.model.entities ?? []).filter((h) => l.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => l.has(h.sourceAggregateId) && l.has(h.targetAggregateId)
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
  /** Opening an element shows its ficha in the right drawer; unmapped kinds still navigate. */
  openInDrawer(e) {
    X.CRUD_ROUTES[e.elementType] ? this._drawer = e : this.emit("modux-activate", e);
  }
  renderDrawer() {
    if (!this._drawer) return null;
    const e = X.CRUD_ROUTES[this._drawer.elementType], t = this._drawer;
    return M`
      <aside class="drawer" @pointerdown=${(i) => i.stopPropagation()}>
        <header>
          <span>${t.id}</span>
          <span class="spacer"></span>
          <button
            title="Abrir la ficha completa en su página"
            @click=${() => {
      this._drawer = null, this.emit("modux-activate", t);
    }}
          >
            Abrir ficha
          </button>
          <button title="Cerrar" @click=${() => this._drawer = null}>✕</button>
        </header>
        <iframe src=${`${e}/${t.id}/edit`} title=${t.id}></iframe>
      </aside>
    `;
  }
  onElementActivated(e) {
    var i;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = n ? (this.model.workflowGateways ?? []).find((a) => a.id === n[1]) : null;
      if (n && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const a = ((i = (o.branchConditions ?? []).find((s) => s.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: n[2], value: a };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const n = (this.model.workflowGateways ?? []).find((a) => a.id === e.detail.id);
      if (!n) return;
      const o = n.type === "SPLIT" ? n.semantics === "EXCLUSIVE" ? "PARALLEL" : "EXCLUSIVE" : n.semantics === "ANY" ? "ALL" : "ANY";
      this.command({ kind: "set-gateway-semantics", id: n.id, type: o });
      return;
    }
    if (this._view === "ui" && e.detail.elementType === "node" && e.detail.kind === "page") {
      this._view = "design", this._selectedId = e.detail.id;
      return;
    }
    if (this._view === "context-map" && e.detail.elementType === "edge" && e.detail.kind === "relation") {
      const n = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      n && (this._relationPicker = {
        sourceId: n[1],
        targetId: n[2],
        mode: "edit",
        x: e.detail.x ?? 0,
        y: e.detail.y ?? 0
      });
      return;
    }
    const t = e.detail.kind === "process-step" ? Jc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : Qc(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const s of a ?? [])
        s.id && t.add(s.id), i(s.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const n = `mi-${oe(e)}`;
    let o = n;
    for (let a = 2; t.has(o); a++) o = `${n}-${a}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((a) => a.id === e);
    let n = null;
    const o = (a, s) => {
      var r;
      const l = a ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (n = { node: l[p], parentId: s, beforeId: ((r = l[p + 1]) == null ? void 0 : r.id) ?? null }), o(l[p].children, l[p].id);
    };
    return o(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, o = !1, a) {
    const s = a ?? this.allComponentIds(), l = (y) => {
      if (!o) return y.id;
      const f = `cmp-${oe(y.kind)}`;
      let h = f;
      for (let x = 2; s.has(h) || s.has(`${h}-tab-1`); x++) h = `${f}-${x}`;
      return s.add(h), h;
    }, r = [], p = (y, f) => {
      const h = l(y);
      r.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: y.kind, parentComponentId: f }), y.kind === "tabLayout" && (r.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), r.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), r.push({
        kind: "set-page-component",
        pageId: e,
        componentId: h,
        title: y.title ?? null,
        text: y.text ?? null,
        label: y.label ?? null,
        useCaseId: y.useCaseId ?? null,
        mappingId: y.mappingId ?? null,
        modelId: y.modelId ?? null,
        queryServiceId: y.queryServiceId ?? null,
        queryOperationId: y.queryOperationId ?? null,
        fieldId: y.fieldId ?? null,
        stereotype: y.stereotype ?? null,
        colspan: y.colspan ?? null
      });
      for (const x of y.children ?? []) p(x, h);
      return h;
    }, g = p(t, i);
    return n && r.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: r, rootId: g };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const n of i ?? [])
        e.add(n.id), t(n.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const s of a ?? [])
        t.add(s.id), i(s.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const n = `cmp-${oe(e)}`;
    let o = n;
    for (let a = 2; t.has(o) || t.has(`${o}-tab-1`); a++) o = `${n}-${a}`;
    return o;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var a;
    if (i === t) return;
    const n = (((a = (this.model.pages ?? []).find((s) => s.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((s) => s.id ?? s.pageId), o = n.indexOf(t);
    o >= 0 && (i ? n[o + 1] === i : o === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let n = null;
    const o = (a, s) => {
      var r;
      const l = a ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (n = { entry: l[p], parentId: s, beforeId: ((r = l[p + 1]) == null ? void 0 : r.id) ?? null }), o(l[p].children, l[p].id ?? null);
    };
    return o(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var s;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const l = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!l) return;
      t = this._selectedCmp.pageId, re.LEAF_KINDS.has(l.node.kind) ? (i = l.parentId ?? void 0, n = l.beforeId) : i = l.node.kind === "tabLayout" && e.kind !== "tab" ? (s = (l.node.children ?? [])[0]) == null ? void 0 : s.id : l.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((l) => l.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: a } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const l of o) this.command(l, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: a }]), this._selectedCmp = { pageId: t, componentId: a };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return M`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var s;
      const { id: i, w: n, h: o } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((s = a.sizes) == null ? void 0 : s[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...a,
        sizes: { ...a.sizes ?? {}, [i]: { w: n, h: o } }
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
      const { pageId: i, componentId: n, ...o } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: n, ...o });
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
      const { pageId: i, fieldId: n, stereotype: o, colspan: a, label: s } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: o, colspan: a, label: s });
    }}
      @page-fields-reordered=${(t) => {
      this.command({ kind: "set-page-field-order", pageId: t.detail.pageId, fieldIds: t.detail.fieldIds });
    }}
    ></modux-figma>`;
  }
  // ── palette (drag to create / drag to place) ────────────────────────────
  /** Palette entries carry the SAME glyph and stroke colour their node wears on the canvas. */
  /** Section order for the «Nuevos» tab. */
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
        label: "Modelos",
        symbol: "readmodel",
        color: "#0369a1",
        items: (e.models ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Triggers programados",
        symbol: "clock",
        color: "#d97706",
        items: e.modules.flatMap(
          (n) => (n.scheduledTriggers ?? []).map((o) => ({ id: o.id, name: o.name }))
        )
      },
      {
        label: "Mapeados",
        symbol: "flow",
        color: "#7c3aed",
        items: (e.modelMappings ?? []).map((n) => ({ id: n.id, name: n.name }))
      },
      {
        label: "Casos de uso",
        symbol: "usecase",
        color: "#06b6d4",
        items: e.modules.flatMap((n) => (n.useCases ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.modules.flatMap((n) => [
          ...(n.domainEvents ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.applicationEvents ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: e.modules.flatMap((n) => (n.readModels ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (o) => (o.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${o.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap((n) => (n.queryServices ?? []).map((o) => ({ id: o.id, name: o.name })))
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
          ...(n.useCases ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.tables ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.mcpServers ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: (e.apis ?? []).flatMap((n) => n.operations.map((o) => ({ id: o.id, name: o.name })))
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
      items: i ? n.items.filter((o) => o.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
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
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY), o = i.nodeIdAtClient(e.clientX, e.clientY), a = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let s;
    try {
      s = JSON.parse(t);
    } catch {
      return;
    }
    s.new ? this.createFromPalette(s.new, n, o, a) : s.existing && this.placeExistingFromPalette(s.existing, n, o, e.clientX, e.clientY, a);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((o) => o.id)), n = this.model;
    for (const o of [
      n.modules.map((a) => a.id),
      n.modules.flatMap((a) => (a.useCases ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.domainEvents ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.applicationEvents ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.readModels ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.domainServices ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.queryServices ?? []).map((s) => s.id)),
      n.modules.flatMap((a) => (a.scheduledTriggers ?? []).map((s) => s.id)),
      (n.aggregates ?? []).map((a) => a.id),
      (n.entities ?? []).map((a) => a.id),
      (n.actors ?? []).map((a) => a.id),
      n.externalSystems.map((a) => a.id),
      n.externalSystems.flatMap((a) => (a.useCases ?? []).map((s) => s.id)),
      n.externalSystems.flatMap((a) => (a.tables ?? []).map((s) => s.id)),
      n.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((s) => s.id)),
      (n.apis ?? []).map((a) => a.id),
      (n.apis ?? []).flatMap((a) => (a.operations ?? []).map((s) => s.id)),
      (n.proxyApis ?? []).map((a) => a.id),
      (n.aiAgents ?? []).map((a) => a.id),
      (n.mcpGateways ?? []).map((a) => a.id),
      (n.rags ?? []).map((a) => a.id),
      (n.workflows ?? []).map((a) => a.id),
      (n.workflows ?? []).flatMap((a) => (a.steps ?? []).map((s) => s.id)),
      (n.etlFlows ?? []).map((a) => a.id),
      (n.identityProviders ?? []).map((a) => a.id),
      (n.notifications ?? []).map((a) => a.id),
      (n.documents ?? []).map((a) => a.id),
      (n.uiApps ?? []).map((a) => a.id),
      (n.pages ?? []).map((a) => a.id),
      (n.codeModules ?? []).map((a) => a.id),
      (n.services ?? []).map((a) => a.id),
      (n.models ?? []).flatMap((a) => (a.fields ?? []).map((s) => s.id)),
      (n.customCodes ?? []).map((a) => a.id),
      (n.buttonGroups ?? []).map((a) => a.id),
      (n.workflowGateways ?? []).map((a) => a.id)
    ])
      o.forEach((a) => i.add(a));
    for (let o = 1; ; o++) {
      const a = o === 1 ? e : `${e} ${o}`, s = `${t}${oe(a)}`;
      if (!i.has(s)) return { id: s, name: a };
    }
  }
  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  dropChain(e) {
    var n;
    if (!e) return [];
    if (this._yugo) {
      const o = this.renderRoot.querySelector("modux-explorer");
      return (o == null ? void 0 : o.chainOf(e)) ?? [e];
    }
    const t = this.sceneFor(this._view), i = [];
    for (let o = e; o; )
      i.push(o), o = (n = t.nodes.find((a) => a.id === o)) == null ? void 0 : n.parentId;
    return i;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o;
    if (!t) return null;
    const i = this.dropChain(t);
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
      "document",
      "code-module"
    ].includes(e)) return i.find((a) => this.model.modules.some((s) => s.id === a)) ?? null;
    if (e === "read-model") {
      const a = i.find((l) => (this.model.aggregates ?? []).some((r) => r.id === l));
      if (a) return a;
      const s = i.find((l) => this.model.modules.some((r) => r.id === l));
      return ((o = (this.model.aggregates ?? []).find((l) => l.moduleId === s)) == null ? void 0 : o.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((a) => this.model.externalSystems.some((s) => s.id === a)) ?? null;
    if (e === "model-field")
      return i.find((a) => (this.model.models ?? []).some((s) => s.id === a)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.modules.length === 1)
      return this.model.modules[0].id;
    if (e === "ui-button")
      return i.find((a) => (this.model.buttonGroups ?? []).some((s) => s.id === a)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (a) => this.model.modules.some((s) => (s.useCases ?? []).some((l) => l.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of i) {
        if ((this.model.apis ?? []).some((r) => r.id === a)) return a;
        const s = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (s && (this.model.apis ?? []).some((r) => r.id === s[1])) return s[1];
        const l = (this.model.proxyApis ?? []).find((r) => r.id === a);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((a) => this.model.externalSystems.some((s) => s.id === a)) ?? i.find((a) => this.model.modules.some((s) => s.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var h, x;
    const o = Po.find((d) => d.type === e);
    if (!o) return;
    if (e === "project-reference") {
      if (!this.repositories.length) {
        this.emit("modux-notice", { message: "No hay repositorios en ~/.modux que referenciar" });
        return;
      }
      this._repoPicker = { pos: t };
      return;
    }
    if (e === "custom-code" && this._view === "design") {
      const d = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, c = d ? d[1] : i && (this.model.pages ?? []).some((b) => b.id === i) ? i : null;
      if (!c) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: m, name: k } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: m, name: k }, !1), d ? (this.command({ kind: "set-page-component-custom-code", pageId: c, componentId: d[2], targetId: m }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: c, targetId: m }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const d = e.slice(4), c = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, m = c ? c[1] : i && (this.model.pages ?? []).some((R) => R.id === i) ? i : null;
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let k = c ? c[2] : void 0, b = null;
      if (d === "tab") {
        let R = null, z = k ? this.componentIn(m, k) : null;
        for (; z; ) {
          if (z.node.kind === "tabLayout") {
            R = z.node.id;
            break;
          }
          z = z.parentId ? this.componentIn(m, z.parentId) : null;
        }
        if (!R) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const W = this.componentIn(m, R).node, w = this.newComponentId("tab"), E = `Pestaña ${(W.children ?? []).filter((H) => H.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: m, componentId: w, componentKind: "tab", parentComponentId: R }, !1), this.command({ kind: "set-page-component", pageId: m, componentId: w, title: E }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: w }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const R = this.componentIn(m, n.componentId);
        R && R.node.kind === "tab" ? k = R.node.id : R && (k = R.parentId ?? void 0, b = n.pos === "before" ? n.componentId : R.beforeId);
      } else if (k) {
        const R = ((h = this.componentIn(m, k)) == null ? void 0 : h.node) ?? null;
        (R == null ? void 0 : R.kind) === "tabLayout" && (R.children ?? [])[0] && (k = (R.children ?? [])[0].id);
      }
      const C = this.newComponentId(d), L = {
        kind: "add-page-component",
        pageId: m,
        componentId: C,
        componentKind: d,
        parentComponentId: k
      };
      if (!b) {
        this.command(L);
        return;
      }
      this.command(L, !1), this.command(
        { kind: "move-page-component", pageId: m, componentId: C, parentComponentId: k ?? null, beforeComponentId: b },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: C }]);
      return;
    }
    const a = this._view, s = this.sceneFor(a), l = (d, c) => {
      const m = this.viewLayout(a), k = c ? s.nodes.find((C) => C.id === c) : void 0, b = k ? { x: Math.round(t.x - k.x), y: Math.round(t.y - k.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...m, nodes: { ...m.nodes, [d]: b } }), { kind: "move-node", view: a, id: d, pos: null };
    }, r = (d, c, m) => {
      const k = this.inverseOf(d) ?? [];
      this.command(d, !1);
      const b = l(c, m);
      this.pushUndoEntry([...k, b]);
    };
    if (!o.child) {
      const d = {
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
        "identity-provider": "idp-",
        transformation: "tf-",
        "custom-code": "cc-",
        "button-group": "bg-"
      }, { id: c, name: m } = this.uniquePaletteName(o.label, d[e] ?? ""), k = e === "module" ? { kind: "add-module", id: c, name: m, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: c, name: m } : e === "external-system" ? { kind: "add-external-system", id: c, name: m } : e === "ai-agent" ? { kind: "add-ai-agent", id: c, name: m } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: c, name: m, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: c, name: m } : e === "rag" ? { kind: "add-rag", id: c, name: m } : e === "api" ? { kind: "add-api", id: c, name: m } : e === "proxy-api" ? { kind: "add-proxy-api", id: c, name: m } : e === "ui-app" ? { kind: "create-ui-app", id: c, name: m } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: c, name: m, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: c, name: m, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: c, name: m, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: c, name: m } : e === "transformation" ? { kind: "add-transformation", id: c, name: m } : e === "custom-code" ? { kind: "add-custom-code", id: c, name: m } : e === "button-group" ? { kind: "add-button-group", id: c, name: m } : e === "identity-provider" ? { kind: "add-identity-provider", id: c, name: m } : {
        kind: "add-workflow",
        id: c,
        name: m,
        completionEventName: `${m.replace(/\s+/g, "")}Completado`
      };
      if (k.kind === "create-ui-app") {
        const C = this.dropChain(i).find((L) => this.model.modules.some((R) => R.id === L));
        if (C) {
          r({ ...k, moduleId: C }, c, C);
          return;
        }
      }
      r(k, c);
      return;
    }
    if (e === "ui-wizard-step") {
      const c = this.dropChain(i).map((C) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(C)) == null ? void 0 : L[1]) ?? C;
      }).find((C) => (this.model.pages ?? []).some((L) => L.id === C && L.type === "WIZARD"));
      if (!c) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const m = ((x = (this.model.pages ?? []).find((C) => C.id === c)) == null ? void 0 : x.wizardSteps) ?? [], k = new Set(m.map((C) => C.id ?? C.pageId));
      let b = m.length + 1;
      for (; k.has(`wzs-${b}`); ) b++;
      this.command({ kind: "add-page-wizard-step", pageId: c, itemId: `wzs-${b}`, label: `Paso ${b}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const d = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", c = d === "CRUD" ? "CRUD" : d === "WIZARD" ? "Wizard" : "Página", { id: m, name: k } = this.uniquePaletteName(c, "page-"), b = this.dropChain(i), C = b.find((R) => (this.model.uiApps ?? []).some((z) => z.id === R)), L = b.map((R) => {
        var z;
        return ((z = /^wizrow:([^:]+):/.exec(R)) == null ? void 0 : z[1]) ?? R;
      }).find((R) => (this.model.pages ?? []).some((z) => z.id === R && z.type === "WIZARD"));
      if (L) {
        const R = s.nodes.find((W) => W.id === L);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40), this.command({ kind: "create-ui-page", id: m, name: k, pageType: d }, !1), this.command({ kind: "add-page-wizard-step", pageId: L, targetId: m }, !1);
        const z = l(m);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: m }, z]), this.emit("modux-notice", { message: `${k} creada como paso del wizard` });
        return;
      }
      if (C) {
        const R = s.nodes.find((z) => z.id === C);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40);
      }
      r(
        C ? { kind: "create-ui-page", id: m, name: k, pageType: d, appId: C, menuLabel: k } : { kind: "create-ui-page", id: m, name: k, pageType: d },
        m
      );
      return;
    }
    if (e === "menu-item") {
      const d = this.dropChain(i), c = d.find((L) => (this.model.uiApps ?? []).some((R) => R.id === L));
      if (!c) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const m = /* @__PURE__ */ new Set(), k = (L) => {
        for (const R of L ?? [])
          m.add(R.label), k(R.children);
      };
      (this.model.uiApps ?? []).forEach((L) => k(L.menuItems));
      let b = "Entrada";
      for (let L = 2; m.has(b); L++) b = `Entrada ${L}`;
      const C = d.map((L) => ke(L)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: c,
        label: b,
        itemId: this.newMenuItemId(b),
        parentId: C == null ? void 0 : C.itemId,
        parentLabel: C != null && C.itemId || C == null ? void 0 : C.label
      });
      return;
    }
    if (e === "etl-transform") {
      const c = this.dropChain(i).map((b) => (this.model.etlFlows ?? []).find((C) => C.id === b)).find(Boolean);
      if (!c) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const m = new Set((c.steps ?? []).map((b) => b.id));
      let k = (c.steps ?? []).length + 1;
      for (; m.has(`ets-${k}`); ) k++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: c.id,
        id: `ets-${k}`,
        name: `Transformación ${k}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: d, name: c } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      r({
        kind: "add-workflow-gateway",
        id: d,
        name: c,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, d), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const c = this.model.workflows ?? [], m = this.dropChain(i), k = m.map((z) => c.find((W) => W.id === z)).find(Boolean), b = m.map((z) => {
        const W = c.find((w) => (w.steps ?? []).some((E) => E.id === z));
        return W ? { owner: W, stepId: z } : null;
      }).find(Boolean);
      let C = k ?? (b == null ? void 0 : b.owner);
      if (!C && c.length === 1 && (C = c[0]), !C) {
        if (!c.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: L, name: R } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      b && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: C.id,
          id: L,
          name: R,
          ...b ? { dependsOnStepIds: [b.stepId], afterStepId: b.stepId } : {}
        },
        L
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${C.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const d = this.dropContainerFor("api", i);
      if (!d) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: c, name: m } = this.uniquePaletteName("API", "api-"), k = { kind: "add-api", id: c, name: m }, b = this.inverseOf(k) ?? [];
      this.command(k, !1), this.model.externalSystems.some((z) => z.id === d) ? this.command({ kind: "set-api-publisher", id: c, targetId: d }, !1) : this.command({ kind: "add-api-implementation", apiId: c, moduleId: d }, !1);
      const C = this.viewLayout(this._view), L = this.sceneFor(this._view).nodes.find((z) => z.id === d), R = L ? { x: Math.round(t.x - L.x), y: Math.round(t.y - L.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...C, nodes: { ...C.nodes, [c]: R } }), this.pushUndoEntry([...b, { kind: "move-node", view: this._view, id: c, pos: null }]);
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
      "mcp-server": "mcpsrv-",
      "code-module": "cm-",
      "model-field": "f-"
    }, { id: y, name: f } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      r({ kind: "add-aggregate", id: y, name: f, moduleId: p }, y, p);
    else if (e === "ui-button") {
      const d = (this.model.buttonGroups ?? []).find((k) => k.id === p), c = new Set(((d == null ? void 0 : d.buttons) ?? []).map((k) => k.id));
      let m = ((d == null ? void 0 : d.buttons) ?? []).length + 1;
      for (; c.has(`btn-${m}`); ) m++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${m}`, label: f }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: y, name: f });
    else if (e === "code-module")
      r({ kind: "add-code-module", id: y, name: f, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      r(
        { kind: "add-use-case", id: y, name: f, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        y,
        p
      );
    else if (e === "domain-event")
      r({ kind: "add-domain-event", id: y, name: f, moduleId: p }, y, p);
    else if (e === "application-event")
      r({ kind: "add-application-event", id: y, name: f, moduleId: p }, y, p);
    else if (e === "domain-service")
      r({ kind: "add-domain-service", id: y, name: f, moduleId: p }, y, p);
    else if (e === "query-service")
      r({ kind: "add-query-service", id: y, name: f, moduleId: p }, y, p);
    else if (e === "scheduled-trigger")
      r({ kind: "add-scheduled-trigger", id: y, name: f, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      r({ kind: "add-notification", id: y, name: f, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      r({ kind: "add-document", id: y, name: f, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      r({ kind: "add-etl-flow", id: y, name: f, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const d = (this.model.aggregates ?? []).find((c) => c.id === p);
      r({ kind: "add-read-model", id: y, name: f, aggregateId: p }, y, (d == null ? void 0 : d.moduleId) ?? p);
    } else if (e === "api-operation") {
      const d = (this.model.apis ?? []).find((C) => C.id === p), c = new Set(((d == null ? void 0 : d.operations) ?? []).map((C) => C.id));
      let m = f, k = `apiop-${p.replace(/^api-/, "")}-${oe(m)}`;
      for (let C = 2; c.has(k); C++)
        m = `${o.label} ${C}`, k = `apiop-${p.replace(/^api-/, "")}-${oe(m)}`;
      r({ kind: "add-api-operation", apiId: p, id: k, name: m }, k, p), s.nodes.some(
        (C) => C.parentId === p && (C.kind === "api-operation" || C.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(d == null ? void 0 : d.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const d = this.model.modules.flatMap((b) => b.useCases ?? []).find((b) => b.id === p), c = new Set((d == null ? void 0 : d.stepIds) ?? []);
      let m = f, k = `step-${oe(m)}`;
      for (let b = 2; c.has(k); b++)
        m = `${o.label} ${b}`, k = `step-${oe(m)}`;
      r({ kind: "add-use-case-step", useCaseId: p, id: k, name: m }, k, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(d == null ? void 0 : d.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? r({ kind: "add-external-use-case", id: y, name: f, moduleId: p }, y, p) : e === "external-table" ? r({ kind: "add-external-table", id: y, name: f, moduleId: p }, y, p) : e === "mcp-server" && r({ kind: "add-mcp-server", id: y, name: f, moduleId: p }, y, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var f;
    const n = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const h = (this.model.modelMappings ?? []).find((d) => d.id === e);
      if (h) {
        this.command({
          kind: "set-page-button",
          pageId: n[1],
          useCaseId: n[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${h.name}` });
        return;
      }
      const x = this.model.modules.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (x) {
        if (e === n[2]) return;
        const d = (this.model.pages ?? []).find((m) => m.id === n[1]), c = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === n[2]);
        if (!c) return;
        if (((d == null ? void 0 : d.buttons) ?? []).some((m) => m.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: c.label, type: c.bar },
          !1
        ), c.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: c.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: c.label, type: c.bar },
          ...c.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: c.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${x.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const h = this.model.modules.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (!h) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const x = (this.model.pages ?? []).find((d) => d.id === o[1]);
      if (((x == null ? void 0 : x.buttons) ?? []).some((d) => d.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${h.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, s = a ? a[1] : t && (this.model.pages ?? []).some((h) => h.id === t) ? t : null;
    if (!s) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const l = a ? ((f = this.componentIn(s, a[2])) == null ? void 0 : f.node) ?? null : null, r = this.model.modules.flatMap((h) => h.useCases ?? []).find((h) => h.id === e);
    if (r) {
      (l == null ? void 0 : l.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: s, componentId: l.id, useCaseId: e, label: l.label ?? r.name }), this.emit("modux-notice", { message: `El botón lanza ${r.name}` })) : (this.command({ kind: "add-page-button", pageId: s, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${r.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((h) => h.id === e);
    if (p) {
      (l == null ? void 0 : l.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: s, componentId: l.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: s, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((h) => h.id === e);
    if (g && (l == null ? void 0 : l.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: s, componentId: l.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const y = this.model.modules.flatMap((h) => (h.queryServices ?? []).flatMap((x) => (x.operations ?? []).map((d) => ({ op: d, qs: x })))).find(({ op: h }) => h.id === e);
    if (y) {
      (l == null ? void 0 : l.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: s,
        componentId: l.id,
        queryOperationId: y.op.id,
        queryServiceId: y.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: s, queryServiceId: y.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${y.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, i, n, o, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, a);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, o);
      return;
    }
    const s = this._view, l = this.sceneFor(s), r = l.nodes.find((f) => f.id === e);
    if (!r) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(s);
        this.writeViewLayout(s, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(s), g = r.parentId ? l.nodes.find((f) => f.id === r.parentId) : void 0, y = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: s, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(s, { ...p, nodes: { ...p.nodes, [e]: y } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Po.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return M`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? M`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Gc.map((n) => {
      const o = t.filter((a) => a.group === n);
      return o.length ? M`
                        <div class="palette-g">${n}</div>
                        ${o.map(
        (a) => M`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(s) => this.onPaletteDragStart(s, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${Et[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : M`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => M`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (o) => M`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${Et[n.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : M`
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
    var t, i, n, o, a, s, l;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const r = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!r) return;
        this.command({ kind: "add-aggregate", id: `agg-${oe(e)}`, name: e, moduleId: r });
      } else if (this._view === "flows") {
        const r = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), p = this._newTargetId || ((o = this.model.modules[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!r || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${oe(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: r,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const r = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!r) return;
        this.command({
          kind: "add-process",
          id: `proc-${oe(e)}`,
          name: e,
          moduleId: r,
          triggerAggregateId: this._newTriggerAggId || ((l = (s = this.model.aggregates) == null ? void 0 : s[0]) == null ? void 0 : l.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Xa(i, t.nodes) : e === "flows" ? as(i, t.nodes) : e === "processes" ? Fn(i, t.nodes) : e === "workflows" ? gc(i, t.nodes) : e === "ui" ? xc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? Sc(i, t.nodes) : e === "mappings" ? kc(i, t.nodes) : e === "eventstorming" ? dc(i, t.nodes) : Wa(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const o of n.nodes) {
        const a = this.diff[o.id] ?? this.diff[o.id.replace(/^(tgt:|flow:)/, "")];
        a && (o.diffKind = a);
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
    const i = t.nodes.filter((p) => !p.parentId), n = new Set(i.map((p) => p.id)), o = {
      nodes: i,
      edges: t.edges.filter((p) => n.has(p.sourceId) && n.has(p.targetId))
    }, s = await Ec(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), l = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: s, edges: {}, sizes: l.sizes }), await this.updateComplete, (r = this.renderRoot.querySelector("modux-canvas")) == null || r.fit();
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var o;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (o = this.renderRoot.querySelector("modux-canvas")) == null || o.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return M`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)}
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
              <option value="level:distribution"
                ?selected=${this._view === "context-map" && this._detail === "distribution"}>
                Distribución (módulos y servicios)
              </option>
            </optgroup>
            <optgroup label="Vistas especializadas">
              <option value="view:aggregates" ?selected=${this._view === "aggregates"}>
                Agregados y referencias
              </option>
              <option value="view:flows" ?selected=${this._view === "flows"}>Flows</option>
              <option value="view:workflows" ?selected=${this._view === "workflows"}>
                Workflows
              </option>
              <option value="view:ui" ?selected=${this._view === "ui"}>UI</option>
              <option value="view:integrations" ?selected=${this._view === "integrations"}>
                Integraciones
              </option>
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? M`
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
      (t) => M`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? M`
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
        ${this._view === "aggregates" || this._view === "processes" ? M`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? M`
              ${this._view === "flows" ? M`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return M`<option
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
              ${this._view === "flows" ? M`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return M`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? M`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? M`<input
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
              ${this.owningProcessOf(this._selectedId) ? M`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? M`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => M`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
      var t, i;
      (t = this.renderRoot.querySelector("modux-canvas")) == null || t.fit(), (i = this.renderRoot.querySelector("modux-explorer")) == null || i.fit();
    }}
        >
          ⌖ Ajustar
        </button>
        <button
          class="tab"
          title="Recolocar los nodos automáticamente (deshacible)"
          ?disabled=${this._yugo}
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? M`<button
              class="tab"
              title="Procesos y sagas se fusionan en workflows: cadena lineal con rol, plazo y compensación en cada paso"
              @click=${() => {
      (this.model.processes ?? []).length && this.command({ kind: "migrate-processes-to-workflows" }, !1), (this.model.sagas ?? []).length && this.command({ kind: "migrate-sagas-to-workflows" }, !1);
    }}
            >
              ⇪ Migrar ${[
      (this.model.processes ?? []).length ? `${(this.model.processes ?? []).length} procesos` : "",
      (this.model.sagas ?? []).length ? `${(this.model.sagas ?? []).length} sagas` : ""
    ].filter(Boolean).join(" y ")}
            </button>` : ""}
        <button
          class="tab"
          ?data-active=${this._tilt}
          title=${this._tilt ? "Volver al lienzo editable (V)" : "Vista 3D: el diagrama como placas apiladas por contención (V)"}
          @click=${() => {
      this._tilt = !this._tilt, this._tilt && (this._yugo = !1);
    }}
        >
          ⬦ 3D
        </button>
        <button
          class="tab"
          ?disabled=${this._view === "design"}
          ?data-active=${this._yugo}
          title=${this._yugo ? "Volver al lienzo editable (Y)" : "Superficie yugo: la vista como organismo físico — click expande, shift+arrastrar relaciona (Y)"}
          @click=${() => {
      this._yugo = !this._yugo, this._yugo && (this._tilt = !1);
    }}
        >
          ∿ Yugo
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
      ${this.renderDrawer()}
      ${this._view === "design" ? M`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? M`${this.renderPalette()}<modux-explorer
            class="yugo"
            .scene=${this.sceneFor(this._view)}
            ?shifted=${this._paletteOpen}
            @dragover=${(t) => t.preventDefault()}
            @drop=${this.onPaletteDrop}
            @delete-requested=${this.onDeleteRequested}
            @delete-selection-requested=${this.onDeleteSelectionRequested}
            @node-renamed=${this.onNodeRenamed}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @node-activated=${(t) => {
      this.onElementActivated(new CustomEvent("element-activated", {
        detail: { elementType: "node", id: t.detail.id, kind: t.detail.kind }
      }));
    }}
            @explorer-connect=${(t) => {
      const { sourceId: i, targetId: n, x: o, y: a } = t.detail, s = (l) => this.model.modules.some((r) => r.id === l);
      if (this._view === "context-map" && s(i) && s(n)) {
        const l = this.model.relations.find(
          (r) => r.sourceId === i && r.targetId === n && r.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: n,
          mode: l ? "edit" : "create",
          x: o ?? this.clientWidth / 2,
          y: a ?? 120
        };
        return;
      }
      this.applyConnection(i, n, o, a);
    }}
            @explorer-create-view=${(t) => {
      const i = /* @__PURE__ */ new Set([
        "module",
        "external-system",
        "aggregate",
        "entity",
        "process",
        "workflow",
        "actor",
        "ai-agent",
        "rag",
        "mcp-gateway",
        "api",
        "page",
        "ui-app"
      ]), n = [...new Set(
        t.detail.members.filter((a) => i.has(a.kind)).map((a) => a.id)
      )];
      if (!n.length) {
        this.emit("modux-notice", { message: "Despliega algo antes de crear la vista" });
        return;
      }
      const o = `view-${oe(t.detail.name)}`;
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: n }), this._activeViewId = o, this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${n.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? M`
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
            @delete-selection-requested=${this.onDeleteSelectionRequested}
            @node-renamed=${this.onNodeRenamed}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @selection-cleared=${() => {
      this._selectedId = null, this._multi = [], this.emit("modux-select", null);
    }}
          ></modux-tilt>` : M`
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
        ${this._view === "context-map" ? M`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? M`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? M`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : M`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
      ${this.renderHelpPopover()}
    `;
  }
  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  renderHelpPopover() {
    return this._helpOpen ? M`
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
      ([t, i]) => M`
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
    return M`
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
      (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => M`
            <button
              class="picker-item ${o.type === (t ?? "") ? "current" : ""}"
              title=${o.name}
              @click=${() => this.pickExtDepType(o.type)}
            >
              <span class="abbr">${o.abbr}</span>
              <span class="name">${o.name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
  /** The «which project?» picker: one button per ~/.modux repository. */
  renderRepoPicker() {
    const e = this._repoPicker;
    return e ? M`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => M`
            <button
              class="picker-item"
              title=${t.id}
              @click=${() => {
        this._repoPicker = null;
        const i = `proj-${t.id}`;
        this.command({ kind: "add-project-reference", targetId: t.id, id: i }, !1);
        const n = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...n,
          nodes: { ...n.nodes, [i]: { x: Math.round(e.pos.x), y: Math.round(e.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-external-system", id: i },
          { kind: "move-node", view: this._view, id: i, pos: null }
        ]);
      }}
            >
              ${t.name}
            </button>
          `
    )}
      </div>
    ` : "";
  }
  /** The condition editor of one EXCLUSIVE-split branch. */
  renderBranchCondEditor() {
    const e = this._branchCondEditor;
    return e ? M`
      <div class="picker-backdrop" @pointerdown=${() => this._branchCondEditor = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Condición de la rama (vacío la quita)</div>
        <input
          style="width: 240px; margin: 6px 10px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font: 12px system-ui;"
          placeholder="p. ej. importe > 1000"
          .value=${e.value}
          @input=${(t) => e.value = t.target.value}
          @keydown=${(t) => {
      t.key === "Enter" && (this.command({ kind: "set-gateway-branch-condition", id: e.gatewayId, targetId: e.targetId, text: e.value }), this._branchCondEditor = null), t.key === "Escape" && (this._branchCondEditor = null);
    }}
        />
        <button
          class="picker-item"
          @click=${() => {
      this.command({ kind: "set-gateway-branch-condition", id: e.gatewayId, targetId: e.targetId, text: e.value }), this._branchCondEditor = null;
    }}
        >
          Guardar
        </button>
      </div>
    ` : "";
  }
  /** The «which workflow?» picker for steps dropped in the open. */
  renderWfStepPicker() {
    const e = this._wfStepPicker;
    return e ? M`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => M`
            <button
              class="picker-item"
              @click=${() => {
        const i = e;
        this._wfStepPicker = null;
        const { id: n, name: o } = this.uniquePaletteName(
          i.stepType === "JOIN" ? "Join" : i.stepType === "SPLIT" ? "Split" : "Paso",
          "wfs-"
        );
        this.command(
          {
            kind: "add-workflow-step",
            workflowId: t.id,
            id: n,
            name: o,
            ...i.stepType ? { stepType: i.stepType } : {}
          },
          !1
        );
        const a = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...a,
          nodes: { ...a.nodes, [n]: { x: Math.round(i.pos.x), y: Math.round(i.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-workflow-step", workflowId: t.id, id: n },
          { kind: "move-node", view: this._view, id: n, pos: null }
        ]);
      }}
            >
              ${t.name}
            </button>
          `
    )}
      </div>
    ` : "";
  }
  renderRelationPicker() {
    var i;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (i = this.model.relations.find(
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Kc.map(
      (n) => M`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${wn[n].abbr}</span>
              <span class="name">${wn[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
X.styles = vt`
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
    /* ── Dark mode: the editor inverts hue-preservingly; the 3D surface is
       dark by design, so the SAME filter applied twice restores it. The
       popovers are position:fixed (outside the filtered subtrees) and get
       their dark clothes by hand. */
    :host([dark]) {
      background: #0f172a;
      border-color: #334155;
    }
    :host([dark]) .toolbar,
    :host([dark]) .canvas-wrap,
    :host([dark]) .hint {
      filter: invert(1) hue-rotate(180deg);
    }
    :host([dark]) modux-tilt {
      filter: invert(1) hue-rotate(180deg);
    }
    :host([dark]) .relation-picker {
      background: #1e293b;
      border-color: #334155;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
    }
    :host([dark]) .picker-item {
      color: #e2e8f0;
    }
    :host([dark]) .picker-item:hover {
      background: #334155;
    }
    :host([dark]) .picker-item.current {
      background: #1e3a5f;
    }
    :host([dark]) .picker-title {
      color: #94a3b8;
    }
    :host([dark]) .picker-item .abbr,
    :host([dark]) .help-keys {
      color: #60a5fa;
    }
    :host([dark]) .help-row {
      color: #e2e8f0;
    }
    :host([dark]) .relation-picker input,
    :host([dark]) .relation-picker select {
      background: #0f172a;
      border-color: #334155;
      color: #e2e8f0;
    }
    .hint {
      font-size: 12px;
      color: #94a3b8;
      padding: 4px 12px;
      border-top: 1px solid #f1f5f9;
    }
    modux-canvas,
    modux-tilt,
    modux-figma,
    modux-explorer {
      flex: 1;
      min-height: 0;
    }
    .canvas-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
    }
    .drawer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 460px;
      max-width: 55%;
      background: #ffffff;
      border-left: 1px solid #e2e8f0;
      box-shadow: -10px 0 24px rgba(15, 23, 42, 0.08);
      z-index: 25;
      display: flex;
      flex-direction: column;
    }
    .drawer header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      font: 600 12px system-ui, sans-serif;
      color: #0f172a;
    }
    .drawer header .spacer {
      flex: 1;
    }
    .drawer header button {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font: 11px system-ui, sans-serif;
      color: #475569;
      cursor: pointer;
    }
    .drawer header button:hover {
      background: #f1f5f9;
    }
    .drawer iframe {
      flex: 1;
      width: 100%;
      border: 0;
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
X.CRUD_ROUTES = {
  module: "/modelo/organizacion/modules",
  service: "/modelo/organizacion/services",
  aggregate: "/modelo/domainModel/aggregates",
  entity: "/modelo/domainModel/entities",
  model: "/modelo/domainModel/models",
  flow: "/modelo/patrones/flows",
  workflow: "/modelo/patrones/workflows",
  "workflow-gateway": "/modelo/patrones/workflowGateways",
  "use-case": "/modelo/behaviour/useCases",
  mapping: "/modelo/behaviour/modelMappings",
  "domain-event": "/modelo/domainModel/domainEvents",
  subscription: "/modelo/inbound/subscriptions",
  "scheduled-trigger": "/modelo/inbound/scheduledTriggers",
  projection: "/modelo/behaviour/projections",
  "read-model": "/modelo/patrones/readModels",
  page: "/modelo/inbound/ui/pages",
  component: "/modelo/inbound/ui/components",
  "ui-adapter": "/modelo/inbound/ui/uiAdapters",
  "query-service": "/modelo/outbound/queryServices",
  actor: "/modelo/security/roles",
  "external-system": "/modelo/organizacion/externalSystems",
  "code-module": "/modelo/organizacion/codeModules",
  "custom-code": "/modelo/behaviour/customCodes",
  transformation: "/modelo/behaviour/transformations",
  "etl-flow": "/modelo/patrones/etlFlows",
  "button-group": "/modelo/inbound/ui/buttonGroups",
  "identity-provider": "/modelo/security/identityProviders",
  "ai-agent": "/modelo/ia/aiAgents",
  rag: "/modelo/ia/rags",
  "mcp-gateway": "/modelo/ia/mcpGateways"
};
J([
  se({ attribute: !1 })
], X.prototype, "model", 2);
J([
  se({ attribute: !1 })
], X.prototype, "layout", 2);
J([
  se({ attribute: !1 })
], X.prototype, "diff", 2);
J([
  U()
], X.prototype, "_view", 2);
J([
  U()
], X.prototype, "_detail", 2);
J([
  U()
], X.prototype, "_relationType", 2);
J([
  U()
], X.prototype, "_relationPicker", 2);
J([
  U()
], X.prototype, "_extDepPicker", 2);
J([
  U()
], X.prototype, "_selectedId", 2);
J([
  U()
], X.prototype, "_paletteOpen", 2);
J([
  U()
], X.prototype, "_drawer", 2);
J([
  U()
], X.prototype, "_yugo", 2);
J([
  se({ attribute: !1 })
], X.prototype, "repositories", 2);
J([
  se({ type: Boolean, reflect: !0 })
], X.prototype, "dark", 2);
J([
  U()
], X.prototype, "_repoPicker", 2);
J([
  U()
], X.prototype, "_wfStepPicker", 2);
J([
  U()
], X.prototype, "_branchCondEditor", 2);
J([
  U()
], X.prototype, "_paletteFilter", 2);
J([
  U()
], X.prototype, "_paletteTab", 2);
J([
  U()
], X.prototype, "_selectedCmp", 2);
J([
  U()
], X.prototype, "_fullscreen", 2);
J([
  U()
], X.prototype, "_tilt", 2);
J([
  U()
], X.prototype, "_helpOpen", 2);
J([
  U()
], X.prototype, "_newName", 2);
J([
  U()
], X.prototype, "_newModuleId", 2);
J([
  U()
], X.prototype, "_newArchetype", 2);
J([
  U()
], X.prototype, "_newTriggerAggId", 2);
J([
  U()
], X.prototype, "_newTriggerEvent", 2);
J([
  U()
], X.prototype, "_newTargetId", 2);
J([
  U()
], X.prototype, "_undoStack", 2);
J([
  U()
], X.prototype, "_redoStack", 2);
J([
  U()
], X.prototype, "_newStepName", 2);
J([
  U()
], X.prototype, "_newStepType", 2);
J([
  U()
], X.prototype, "_newStepRole", 2);
J([
  U()
], X.prototype, "_newStepDeadline", 2);
J([
  U()
], X.prototype, "_editStepRole", 2);
J([
  U()
], X.prototype, "_editStepDeadline", 2);
J([
  U()
], X.prototype, "_editStepComp", 2);
J([
  U()
], X.prototype, "_newStepUseCase", 2);
J([
  U()
], X.prototype, "_newStepEmits", 2);
J([
  U()
], X.prototype, "_editStepUseCase", 2);
J([
  U()
], X.prototype, "_editStepEmits", 2);
J([
  U()
], X.prototype, "_editStepAwaits", 2);
J([
  U()
], X.prototype, "_multi", 2);
J([
  U()
], X.prototype, "_newViewName", 2);
J([
  U()
], X.prototype, "_activeViewId", 2);
J([
  U()
], X.prototype, "_newRagSourceType", 2);
J([
  U()
], X.prototype, "_newRagSourceUri", 2);
J([
  U()
], X.prototype, "_addMemberKey", 2);
J([
  U()
], X.prototype, "_treeOpen", 2);
J([
  U()
], X.prototype, "_deletePicker", 2);
X = J([
  wt("modux-editor")
], X);
var Zc = Object.defineProperty, ep = Object.getOwnPropertyDescriptor, we = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ep(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Zc(t, i, o), o;
};
let he = class extends Ve {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._writes = 0, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._taggingVersion = !1, this._newTagName = "", this._tagsOpen = !1, this._tags = [], this._repositories = [], this._diff = null, this._diffListOpen = !1, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._dark = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
    super.connectedCallback(), this.addEventListener("pointerdown", this._onPointerDown, !0), window.addEventListener("pointerup", this._onPointerUp, !0), window.addEventListener("pagehide", this._onPageHide), this.reload(), this.loadWorkspace(), this.startLiveUpdates(), this._dark = (document.documentElement.getAttribute("theme") ?? localStorage.getItem("mateu-theme")) === "dark", this._themeObserver = new MutationObserver(() => {
      this._dark = document.documentElement.getAttribute("theme") === "dark";
    }), this._themeObserver.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["theme"]
    });
  }
  updated() {
    this.toggleAttribute("dark", this._dark);
  }
  disconnectedCallback() {
    var e, t;
    window.clearTimeout(this._layoutTimer), window.clearInterval(this._pollTimer), (e = this._sse) == null || e.close(), (t = this._themeObserver) == null || t.disconnect(), this.removeEventListener("pointerdown", this._onPointerDown, !0), window.removeEventListener("pointerup", this._onPointerUp, !0), window.removeEventListener("pagehide", this._onPageHide), this._onPageHide(), super.disconnectedCallback();
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
      const e = await fetch(`${this.base}/repositories`);
      e.ok && (this._repositories = await e.json());
    } catch {
    }
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
    ], t = (n) => he.TYPE_LABELS[n] ?? n;
    return M`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: o, mark: a, cls: s }) => {
      const l = this._diff.changes.filter((r) => r.kind === n);
      return l.length ? M`
            <div class="diff-group">${o} (${l.length})</div>
            ${l.map(
        (r) => M`
                <div class="diff-row">
                  <span class="diff-mark ${s}">${a}</span>
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
    var o, a, s;
    const i = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var l;
      try {
        const r = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!r.ok) {
          let p = `El servidor rechazó la operación (${r.status})`;
          try {
            const g = await r.json();
            g != null && g.message && (p = g.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        this._workspace = await r.json(), await this.reload(), await this.refreshDiff(), (l = this.renderRoot.querySelector("modux-editor")) == null || l.clearHistory();
      } catch (r) {
        this.showToast(String(r));
      }
    });
    const n = (a = this._workspace) == null ? void 0 : a.current;
    if (n && n !== i) {
      const l = ((s = this._workspace.solutions.find((r) => r.branch === n)) == null ? void 0 : s.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${l}`
      ), window.location.reload();
    }
  }
  createSolution() {
    const e = this._newSolutionName.trim();
    e && (this._creatingSolution = !1, this._newSolutionName = "", this.solutionOp("create", { name: e }));
  }
  /** Tags the current branch's HEAD as a named version of the diagrams. */
  async createTag() {
    const e = this._newTagName.trim();
    if (e) {
      this._taggingVersion = !1, this._newTagName = "";
      try {
        const t = await fetch(`${this.base}/solutions/tag`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: e })
        });
        if (!t.ok) {
          this.showToast(`No se pudo etiquetar la versión (${t.status})`);
          return;
        }
        this._tags = await t.json(), this.showToast(`Versión «${e}» etiquetada`, "info");
      } catch (t) {
        this.showToast(`No se pudo etiquetar la versión: ${t.message}`);
      }
    }
  }
  async toggleTags() {
    if (this._tagsOpen = !this._tagsOpen, !!this._tagsOpen)
      try {
        const e = await fetch(`${this.base}/solutions/tags`);
        e.ok && (this._tags = await e.json());
      } catch {
      }
  }
  /** The named versions of the diagrams — opened from the «Versiones» button. */
  renderTagsPanel() {
    return this._tagsOpen ? M`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => M`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : M`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
      </div>
    ` : "";
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
    const { content: t, fileName: i, apiId: n, homeExternalId: o, homeModuleId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const s = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!s.ok) {
          let g = `El servidor rechazó el contrato (${s.status})`;
          try {
            const y = await s.json();
            y != null && y.message && (g = y.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: l } = await s.json(), r = o ? { kind: "set-api-publisher", id: l, targetId: o } : a ? { kind: "add-api-implementation", apiId: l, moduleId: a } : null;
        r && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${l}`, "info");
      } catch (s) {
        this.showToast(String(s));
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
            const o = await t.json();
            o != null && o.message && (n = o.message);
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
    return this._error ? M`<div class="status error">modux editor: ${this._error}</div>` : this._model ? M`
      ${this._workspace ? M`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : M`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? M`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : M`<button
                    title="Etiqueta el estado actual de la rama como una versión con nombre (git tag)"
                    @click=${() => this._taggingVersion = !0}
                  >
                    🏷 Etiquetar…
                  </button>`}
              <button
                title="Las versiones etiquetadas de los diagramas"
                @click=${() => void this.toggleTags()}
              >
                Versiones
              </button>
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (n) => this._diff.changes.filter((o) => o.kind === n).length;
      return M`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? M`
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
        (o) => o.branch === this._workspace.current
      )) == null ? void 0 : n.status;
      return M`
                      ${i === "EXPLORING" ? M`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? M`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? M`<button
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
      ${this.renderTagsPanel()}
      ${this._mergeFlow ? M`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => M`
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
        ?dark=${this._dark}
        .model=${this._model}
        .layout=${this._layout}
        .repositories=${this._repositories}
        .diff=${this._diff && !((t = this._workspace) != null && t.system) ? Object.fromEntries(
      this._diff.changes.filter((i) => i.kind !== "REMOVED").map((i) => [i.id, i.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @modux-import-api=${this.onImportApi}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(i) => this.showToast(i.detail.message, i.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? M`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : M`<div class="status">Cargando el modelo…</div>`;
  }
};
he.styles = vt`
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
    /* ── Dark mode: the workspace chrome inverts hue-preservingly, like the
       editor below it; the toast is dark-on-dark already and stays as is. */
    :host([dark]) .workspace,
    :host([dark]) .diff-panel,
    :host([dark]) .status {
      filter: invert(1) hue-rotate(180deg);
    }
  `;
he.TYPE_LABELS = {
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
we([
  se()
], he.prototype, "base", 2);
we([
  U()
], he.prototype, "_model", 2);
we([
  U()
], he.prototype, "_layout", 2);
we([
  U()
], he.prototype, "_error", 2);
we([
  U()
], he.prototype, "_saving", 2);
we([
  U()
], he.prototype, "_toast", 2);
we([
  U()
], he.prototype, "_workspace", 2);
we([
  U()
], he.prototype, "_creatingSolution", 2);
we([
  U()
], he.prototype, "_newSolutionName", 2);
we([
  U()
], he.prototype, "_taggingVersion", 2);
we([
  U()
], he.prototype, "_newTagName", 2);
we([
  U()
], he.prototype, "_tagsOpen", 2);
we([
  U()
], he.prototype, "_tags", 2);
we([
  U()
], he.prototype, "_repositories", 2);
we([
  U()
], he.prototype, "_diff", 2);
we([
  U()
], he.prototype, "_diffListOpen", 2);
we([
  U()
], he.prototype, "_mergeFlow", 2);
we([
  U()
], he.prototype, "_dark", 2);
he = we([
  wt("modux-editor-connected")
], he);
export {
  tp as CONTAINER_HEADER,
  ip as CONTAINER_INSET,
  ye as ModuxCanvas,
  X as ModuxEditor,
  he as ModuxEditorConnected,
  Xa as aggregatesScene,
  mt as apiImplNodeId,
  ut as apiOpOccurrenceId,
  Ai as containerFit,
  Na as containerMinSize,
  Wa as contextMapScene,
  Ua as flowCoherence,
  as as flowsScene,
  pi as normalizeViewLayout,
  Fn as processesScene,
  za as relationEdgeId,
  Bi as resolveOverlaps
};
