const tp = 34, ip = 10;
function Fi(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let r = 0; r < e.length; r++)
      for (let l = r + 1; l < e.length; l++) {
        const s = e[r], p = e[l], y = i.get(s.id), f = i.get(p.id), m = f.x - y.x, g = f.y - y.y, v = (s.w + p.w) / 2 + t - Math.abs(m), d = (s.h + p.h) / 2 + t - Math.abs(g);
        if (!(v <= 0 || d <= 0))
          if (a = !0, v < d) {
            const c = (m >= 0 ? 1 : -1) * v / 2;
            y.x -= c, f.x += c;
          } else {
            const c = (g >= 0 ? 1 : -1) * d / 2;
            y.y -= c, f.y += c;
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
function Mi(e, t, i) {
  let n = t.w / 2, o = t.w / 2, a = t.h / 2, r = t.h / 2;
  for (const l of i)
    n = Math.max(n, -l.dx + l.w / 2 + 10), o = Math.max(o, l.dx + l.w / 2 + 10), a = Math.max(a, -l.dy + l.h / 2 + 34), r = Math.max(r, l.dy + l.h / 2 + 10);
  return {
    x: e.x + (o - n) / 2,
    y: e.y + (r - a) / 2,
    w: n + o,
    h: a + r
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
}, Fe = 168, We = 56;
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
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: mt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const No = 34, Ro = 14, Da = 14, _e = 108, we = 32, wn = 12, Pi = 10, at = 2, Lo = at * _e + (at - 1) * wn + 2 * Ro;
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
  const t = Math.max(1, Math.ceil(e / at)), i = t * we + (t - 1) * Pi;
  return { w: Lo, h: No + i + Da };
}
function Et(e, t) {
  const i = e % at, n = Math.floor(e / at);
  return {
    x: -t.w / 2 + Ro + i * (_e + wn) + _e / 2,
    y: -t.h / 2 + No + n * (we + Pi) + we / 2
  };
}
function Do(e, t) {
  return [
    ...(e.aggregates ?? []).filter((i) => i.boundedContextId === t.id).map((i) => ({
      id: i.id,
      // The invariants ARE the aggregate's reason to exist: they show on the chip.
      name: (i.invariants ?? []).length ? `${i.name} ⚖${i.invariants.length}` : i.name,
      kind: "aggregate"
    })),
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
    ...(e.etlFlows ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "etl-flow" })),
    ...(e.notifications ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "notification" })),
    ...(e.documents ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "document" })),
    ...(e.uiApps ?? []).filter((i) => (t.uiAppIds ?? []).includes(i.id)).map((i) => ({ id: i.id, name: i.name, kind: "ui-app" }))
  ];
}
function qa(e, t, i, n, o, a, r = !1) {
  const l = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...Oo(e, t.id),
    ...Do(e, t)
  ];
  if (!l.length)
    return [{ ...n, x: i.x, y: i.y, w: Fe, h: We }];
  if (r) {
    const s = new Map((e.apis ?? []).map((y) => [y.id, y])), p = (e.apiImplementations ?? []).filter((y) => y.boundedContextId === t.id && s.has(y.apiId)).map((y) => {
      const f = s.get(y.apiId);
      return {
        id: mt(y.apiId, y.boundedContextId),
        name: f.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${f.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (f.operations ?? []).map((m) => ({
          id: ut(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (p.length > 0) {
      const y = l.filter((f) => f.kind !== "api-impl");
      return zo(i, n, p, y, o, a);
    }
  }
  return Ht(i, n, l, o, a);
}
function zo(e, t, i, n, o, a, r = /* @__PURE__ */ new Set()) {
  const l = a[t.id] ?? Oi(i.length + n.length), s = i.map((g, v) => {
    const d = o[g.id] ?? Et(v, l), c = r.has(g.id) ? [] : g.ops, h = a[g.id] ?? Oi(c.length), k = c.map((E, L) => o[E.id] ?? Et(L, h)), b = Mi(
      { x: d.x, y: d.y },
      h,
      k.map((E) => ({ dx: E.x, dy: E.y, w: _e, h: we }))
    );
    return { a: g, off: d, ops: c, opOffs: k, fit: b };
  }), p = n.map(
    (g, v) => o[g.id] ?? Et(i.length + v, l)
  ), y = Fi(
    [
      ...s.map((g) => ({ id: g.a.id, x: g.fit.x, y: g.fit.y, w: g.fit.w, h: g.fit.h })),
      ...n.map((g, v) => ({
        id: g.id,
        x: p[v].x,
        y: p[v].y,
        w: _e,
        h: we
      }))
    ],
    24
  );
  for (const g of s) {
    const v = y.get(g.a.id);
    v && (g.off = { x: g.off.x + (v.x - g.fit.x), y: g.off.y + (v.y - g.fit.y) }, g.fit = { ...g.fit, x: v.x, y: v.y });
  }
  n.forEach((g, v) => {
    const d = y.get(g.id);
    d && (p[v] = { x: d.x, y: d.y });
  });
  const f = Mi(e, l, [
    ...s.map((g) => ({ dx: g.fit.x, dy: g.fit.y, w: g.fit.w, h: g.fit.h })),
    ...p.map((g) => ({ dx: g.x, dy: g.y, w: _e, h: we }))
  ]), m = [
    { ...t, x: f.x, y: f.y, w: f.w, h: f.h, container: !0 }
  ];
  for (const g of s)
    m.push({
      id: g.a.id,
      label: g.a.name,
      kind: g.a.kind,
      symbol: "interface",
      fill: g.a.fill,
      stroke: g.a.stroke,
      badge: g.a.badge,
      container: !0,
      collapsible: g.a.ops.length > 0 || r.has(g.a.id),
      collapsed: r.has(g.a.id),
      parentId: t.id,
      x: e.x + g.fit.x,
      y: e.y + g.fit.y,
      w: g.fit.w,
      h: g.fit.h,
      tooltip: g.a.tooltip
    }), g.ops.forEach((v, d) => {
      m.push({
        id: v.id,
        label: v.name,
        kind: g.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: g.a.id,
        x: e.x + g.off.x + g.opOffs[d].x,
        y: e.y + g.off.y + g.opOffs[d].y,
        w: _e,
        h: we,
        tooltip: `${Qt[g.a.opKind]}: ${v.name}`
      });
    });
  return n.forEach((g, v) => {
    const d = Ti[g.kind];
    m.push({
      id: g.id,
      label: g.name,
      kind: g.kind,
      x: e.x + p[v].x,
      y: e.y + p[v].y,
      w: _e,
      h: we,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${Qt[g.kind]} ${g.name}`
    });
  }), m;
}
const Ba = [
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
function Fa(e, t, i, n, o, a, r = /* @__PURE__ */ new Set()) {
  const l = Do(e, t), s = new Map(l.map((b) => [b.id, b])), p = (e.modules ?? []).filter((b) => b.boundedContextId === t.id);
  if (p.length <= 1)
    return [{
      ...n,
      collapsible: !1,
      collapsed: !1,
      x: i.x,
      y: i.y,
      w: Fe,
      h: We,
      tooltip: `${t.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos`
    }];
  const y = new Set(p.flatMap((b) => b.elementIds ?? [])), m = p.some((b) => r.has(b.id)) ? l.filter((b) => !y.has(b.id)) : [], g = a[n.id] ?? Oi(p.length + m.length), v = p.map((b, E) => {
    const L = r.has(b.id), R = L ? (b.elementIds ?? []).map((S) => s.get(S)).filter((S) => !!S) : [], z = L ? Ba.map((S) => {
      const H = R.filter((I) => S.kinds.includes(I.kind)), ne = Math.ceil(H.length / at), te = Un + (ne ? ne * we + (ne - 1) * Pi + 8 : 8);
      return { layer: S, chips: H, rows: ne, h: te };
    }) : [], W = L ? qn + z.reduce((S, H) => S + H.h, 0) + Vt : 56, w = o[b.id] ?? Et(E, g);
    return { cm: b, expanded: L, bands: z, boxH: W, off: w };
  }), d = m.map(
    (b, E) => o[b.id] ?? Et(v.length + E, g)
  ), c = Fi(
    [
      ...v.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: zt, h: b.boxH })),
      ...m.map((b, E) => ({ id: b.id, x: d[E].x, y: d[E].y, w: _e, h: we }))
    ],
    24
  );
  for (const b of v) {
    const E = c.get(b.cm.id);
    E && (b.off = { x: E.x, y: E.y });
  }
  m.forEach((b, E) => {
    const L = c.get(b.id);
    L && (d[E] = { x: L.x, y: L.y });
  });
  const h = Mi(i, g, [
    ...v.map((b) => ({ dx: b.off.x, dy: b.off.y, w: zt, h: b.boxH })),
    ...d.map((b) => ({ dx: b.x, dy: b.y, w: _e, h: we }))
  ]), k = [
    { ...n, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const b of v) {
    const E = i.x + b.off.x, L = i.y + b.off.y;
    if (k.push({
      id: b.cm.id,
      label: b.cm.name,
      kind: "module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      collapsible: !0,
      collapsed: !b.expanded,
      parentId: n.id,
      x: E,
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
        x: E,
        y: L + R + z.h / 2,
        w: zt - 2 * Vt,
        h: z.h,
        tooltip: `Capa de ${z.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), z.chips.forEach((w, S) => {
        const H = S % at, ne = Math.floor(S / at), te = w.policy ? cn : Ti[w.kind];
        k.push({
          id: w.id,
          label: w.name,
          kind: w.kind,
          x: E - (zt - 2 * Vt) / 2 + Vt + H * (_e + wn) + _e / 2,
          y: L + R + Un + ne * (we + Pi) + we / 2,
          w: _e,
          h: we,
          symbol: te.symbol,
          fill: te.fill,
          stroke: te.stroke,
          parentId: W,
          tooltip: `${w.policy ? "Policy" : Qt[w.kind]} ${w.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), R += z.h;
    }
  }
  return m.forEach((b, E) => {
    const L = b.policy ? cn : Ti[b.kind];
    k.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + d[E].x,
      y: i.y + d[E].y,
      w: _e,
      h: we,
      symbol: L.symbol,
      fill: L.fill,
      stroke: L.stroke,
      parentId: n.id,
      tooltip: `${b.policy ? "Policy" : Qt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), k;
}
function Ht(e, t, i, n, o) {
  const a = o[t.id] ?? Oi(i.length), r = i.map((f, m) => n[f.id] ?? Et(m, a)), l = Fi(
    i.map((f, m) => ({ id: f.id, x: r[m].x, y: r[m].y, w: _e, h: we })),
    10
  );
  i.forEach((f, m) => {
    const g = l.get(f.id);
    g && (r[m] = { x: g.x, y: g.y });
  });
  const s = Mi(
    e,
    a,
    r.map((f) => ({ dx: f.x, dy: f.y, w: _e, h: we }))
  ), p = {
    ...t,
    x: s.x,
    y: s.y,
    w: s.w,
    h: s.h,
    container: !0
  }, y = i.map((f, m) => {
    const g = r[m], v = f.policy ? cn : Ti[f.kind];
    return {
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + g.x,
      y: e.y + g.y,
      w: _e,
      h: we,
      symbol: v.symbol,
      fill: v.fill,
      stroke: v.stroke,
      parentId: t.id,
      tooltip: `${f.policy ? "Policy" : Qt[f.kind]} ${f.name}`
    };
  });
  return [p, ...y];
}
function Wa(e, t, i = "contexts", n = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", r = i === "contexts", l = a || r, s = o, p = i !== "contexts", y = i === "operations", f = new Set(e.externalSystems.map((u) => u.id)), m = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && f.has(u.publishedByExternalSystemId)
  ), g = new Set(m.map((u) => u.id)), v = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && f.has(u.publishedByExternalSystemId)
  ), d = new Set(v.map((u) => u.id)), c = [
    ...e.boundedContexts.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...l ? [] : (e.apis ?? []).filter((u) => !g.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...l ? [] : (e.proxyApis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...l ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...l ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerBoundedContextId).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(r ? [] : e.identityProviders ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], h = c.flatMap((u, O) => {
    const B = t[u.ref.id] ?? dt(O, c.length);
    if ("idp" in u && u.idp) {
      const Y = u.ref, ce = !!Y.publishedByExternalSystemId;
      return [{
        id: Y.id,
        label: Y.name,
        kind: "identity-provider",
        symbol: "key",
        fill: ce ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: ce,
        badge: Y.type ?? "IDP",
        tooltip: `${Y.name} — emite las identidades que el sistema confía${ce ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: B.x,
        y: B.y,
        w: Fe,
        h: We
      }];
    }
    if ("etl" in u && u.etl) {
      const Y = u.ref;
      return [{
        id: Y.id,
        label: Y.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${Y.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: B.x,
        y: B.y,
        w: Fe,
        h: We
      }];
    }
    if ("workflow" in u && u.workflow) {
      const Y = u.ref;
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
        x: B.x,
        y: B.y,
        w: Fe,
        h: We
      }];
    }
    if (u.proxy) {
      const Y = u.ref, ce = {
        id: Y.id,
        label: Y.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${Y.name} — proxy/cache de una API, consumible como ella`
      };
      if (y && Y.targetApiId) {
        const Xe = (e.apis ?? []).find((_t) => _t.id === Y.targetApiId), Qe = (Xe == null ? void 0 : Xe.operations) ?? [];
        if (Qe.length > 0)
          return Ht(
            B,
            ce,
            Qe.map((_t) => ({
              id: ut(_t.id, Y.id),
              name: _t.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...ce, x: B.x, y: B.y, w: Fe, h: We }];
    }
    if (u.api) {
      const Y = u.ref, ce = {
        id: Y.id,
        label: Y.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Y.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(Y.id) ? !p : p) && Y.operations.length > 0 ? Ht(
        B,
        { ...ce, collapsible: !0, collapsed: !1 },
        Y.operations.map(
          (Qe) => ({ id: Qe.id, name: Qe.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...ce,
        collapsible: Y.operations.length > 0,
        collapsed: Y.operations.length > 0,
        x: B.x,
        y: B.y,
        w: Fe,
        h: We
      }];
    }
    if (u.external) {
      const Y = u.ref, ce = {
        id: Y.id,
        label: Y.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: Y.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: Y.referencedRepositoryId ? `${Y.name} — otro proyecto modux (repositorio ${Y.referencedRepositoryId}), referenciado del catálogo` : `${Y.name} (sistema externo)`
      }, Xe = m.filter((fe) => fe.publishedByExternalSystemId === Y.id), Qe = v.filter((fe) => fe.publishedByExternalSystemId === Y.id), _t = Qe.map(
        (fe) => ({ id: fe.id, name: fe.name, kind: "proxy-api" })
      ), Ki = [
        ...(Y.useCases ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "external-use-case" })
        ),
        ...(Y.tables ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "external-table" })
        ),
        ...(Y.mcpServers ?? []).map(
          (fe) => ({ id: fe.id, name: fe.name, kind: "mcp-server" })
        )
      ], ji = Xe.length > 0 || Qe.length > 0, Yi = ji || Ki.length > 0, { form: li, collapsed: Xi } = zn(
        o.has(Y.id),
        // Deployment is topology: external systems join compact, like the boundedContexts.
        a ? "compact" : p ? "full" : ji ? "coarse" : "compact",
        Ki.length > 0 || y && ji
      ), Nn = [
        ..._t,
        ...li === "full" ? Ki : []
      ], Qi = y && li === "full" ? Qe.filter((fe) => {
        const Lt = fe.targetApiId ? (e.apis ?? []).find((Se) => Se.id === fe.targetApiId) : void 0;
        return ((Lt == null ? void 0 : Lt.operations) ?? []).length > 0;
      }) : [];
      if (y && li === "full" && (Xe.length > 0 || Qi.length > 0)) {
        const fe = [
          ...Xe.map((Se) => ({
            id: Se.id,
            name: Se.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${Se.name} — API publicada por ${Y.name}`,
            opKind: "api-operation",
            ops: (Se.operations ?? []).map((Dt) => ({ id: Dt.id, name: Dt.name }))
          })),
          ...Qi.map((Se) => {
            const Dt = (e.apis ?? []).find((ci) => ci.id === Se.targetApiId);
            return {
              id: Se.id,
              name: Se.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${Se.name} — proxy/cache de ${Dt.name}`,
              opKind: "api-op-occurrence",
              ops: (Dt.operations ?? []).map((ci) => ({
                id: ut(ci.id, Se.id),
                name: ci.name
              }))
            };
          })
        ], Lt = new Set(Qi.map((Se) => Se.id));
        return zo(
          B,
          { ...ce, collapsible: !0, collapsed: Xi },
          fe,
          Nn.filter((Se) => !Lt.has(Se.id)),
          t,
          n,
          s
        );
      }
      const Rn = li === "compact" ? [] : [
        ...Xe.map((fe) => ({ id: fe.id, name: fe.name, kind: "api" })),
        ...Nn
      ];
      return Rn.length > 0 ? Ht(
        B,
        { ...ce, collapsible: Yi, collapsed: Xi },
        Rn,
        t,
        n
      ) : [{
        ...ce,
        collapsible: Yi,
        collapsed: Yi && Xi,
        x: B.x,
        y: B.y,
        w: Fe,
        h: We
      }];
    }
    const X = u.ref, j = X.subdomainType ?? "GENERIC", me = {
      id: X.id,
      label: X.name,
      kind: "boundedContext",
      symbol: "component",
      fill: Ra[j],
      stroke: "#94a3b8",
      badge: j,
      tooltip: `${X.name} — subdominio ${j}`
    }, qe = Oo(e, X.id), Nt = (e.aggregates ?? []).some((Y) => Y.boundedContextId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((Y) => Y.ownerBoundedContextId === X.id) || (e.notifications ?? []).some((Y) => Y.ownerBoundedContextId === X.id) || (e.documents ?? []).some((Y) => Y.ownerBoundedContextId === X.id), rt = Nt || qe.length > 0, { form: Rt, collapsed: kt } = zn(
      o.has(X.id),
      p ? "full" : qe.length > 0 ? "coarse" : "compact",
      Nt
    );
    return a ? Fa(
      e,
      X,
      B,
      { ...me, collapsible: !1, collapsed: !1 },
      t,
      n,
      o
    ) : Rt === "full" && rt ? qa(
      e,
      X,
      B,
      { ...me, collapsible: !0, collapsed: kt },
      t,
      n,
      y
    ) : Rt === "coarse" && qe.length > 0 ? Ht(
      B,
      { ...me, collapsible: rt, collapsed: kt },
      qe,
      t,
      n
    ) : [{
      ...me,
      collapsible: rt,
      collapsed: rt && kt,
      x: B.x,
      y: B.y,
      w: Fe,
      h: We
    }];
  }), k = l ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, b = c.length + k.actors.length + k.aiAgents.length + k.rags.length + k.mcpGateways.length;
  k.actors.forEach((u, O) => {
    const B = t[u.id] ?? dt(c.length + O, b);
    h.push({
      id: u.id,
      label: u.name,
      x: B.x,
      y: B.y,
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
    const B = t[u.id] ?? dt(c.length + (e.actors ?? []).length + O, b);
    h.push({
      id: u.id,
      label: u.name,
      x: B.x,
      y: B.y,
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
    const B = t[u.id] ?? dt(
      c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      b
    );
    h.push({
      id: u.id,
      label: u.name,
      x: B.x,
      y: B.y,
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
  const E = [];
  if (k.rags.forEach((u, O) => {
    const B = t[u.id] ?? dt(
      c.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      b
    );
    h.push({
      id: u.id,
      label: u.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((X, j) => {
      const me = `ragcs:${u.id}:${X.uri}`, qe = t[me] ?? { x: B.x + 170, y: B.y - 30 + j * 44 };
      h.push({
        id: me,
        label: X.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: qe.x,
        y: qe.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: X.type,
        tooltip: `${X.type}: ${X.uri}`
      }), E.push({
        id: `ragcse:${u.id}:${X.uri}`,
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
    u.forEach((B, X) => {
      const j = t[B.id] ?? dt(c.length + X, c.length + u.length);
      h.push({
        id: B.id,
        label: B.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${B.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: j.x,
        y: j.y,
        w: Fe,
        h: We
      });
    });
    const O = [];
    [...new Set(u.filter((B) => B.database).map((B) => B.database))].forEach((B) => O.push({
      id: `infra-db:${B}`,
      label: B,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${B} — la usan los servicios que declaran database=${B}`
    })), u.some((B) => B.outboxEnabled) && O.push({
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
    }), O.forEach((B, X) => {
      const j = t[B.id] ?? dt(
        c.length + u.length + X,
        c.length + u.length + O.length
      );
      h.push({
        id: B.id,
        label: B.label,
        kind: "infrastructure",
        symbol: B.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: B.badge,
        tooltip: B.tooltip,
        x: j.x,
        y: j.y,
        w: Fe,
        h: We
      });
    });
  }
  h.sort((u, O) => (u.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
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
    var qe, Nt, rt, Rt, kt, Y;
    const O = Ua(e, u), B = p ? e.boundedContexts.find((ce) => ce.id === u.sourceId) : void 0, X = ((qe = B == null ? void 0 : B.domainEvents) == null ? void 0 : qe.find((ce) => ce.name === u.triggerEvent)) ?? ((Nt = B == null ? void 0 : B.applicationEvents) == null ? void 0 : Nt.find((ce) => ce.name === u.triggerEvent)), j = p && u.readModelName ? (Rt = (rt = e.boundedContexts.find((ce) => ce.id === u.targetId)) == null ? void 0 : rt.readModels) == null ? void 0 : Rt.find((ce) => ce.name === u.readModelName) : void 0, me = p && u.targetUseCaseId ? (Y = (kt = e.boundedContexts.find((ce) => ce.id === u.targetId)) == null ? void 0 : kt.useCases) == null ? void 0 : Y.find((ce) => ce.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? u.sourceId,
      targetId: (me == null ? void 0 : me.id) ?? (j == null ? void 0 : j.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: La[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${O}`
    };
  }), z = new Map((e.apis ?? []).map((u) => [u.id, u])), W = new Set(e.boundedContexts.map((u) => u.id)), w = (e.apiImplementations ?? []).filter(
    (u) => z.has(u.apiId) && W.has(u.boundedContextId)
  ), S = new Set(h.map((u) => u.id)), H = a ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.moduleIds ?? []).map((O) => {
        var X;
        if (!S.has(u.id)) return null;
        const B = S.has(O) ? O : (X = (e.modules ?? []).find((j) => j.id === O)) == null ? void 0 : X.boundedContextId;
        return !B || !S.has(B) ? null : {
          id: `deploy:${u.id}->${O}`,
          sourceId: u.id,
          targetId: B,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${u.name} — Supr lo desconecta`
        };
      }).filter((O) => O !== null)
    ),
    ...(e.services ?? []).flatMap((u) => {
      const O = [];
      return u.database && S.has(`infra-db:${u.database}`) && S.has(u.id) && O.push({
        id: `infradb:${u.id}`,
        sourceId: u.id,
        targetId: `infra-db:${u.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} persiste en ${u.database}`
      }), u.outboxEnabled && S.has("infra-broker") && S.has(u.id) && O.push({
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
  ] : [], ne = p ? (e.emissions ?? []).filter((u) => S.has(u.sourceId) && S.has(u.domainEventId)).map((u) => ({
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
  })).filter(({ p: u, source: O }) => O && u.readModelId).filter(({ p: u, source: O }) => S.has(O) && S.has(u.readModelId)).map(({ p: u, source: O }) => ({
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
      const B = p && O.targetUseCaseId && S.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetBoundedContextId && S.has(O.targetBoundedContextId) ? O.targetBoundedContextId : (O.targetUseCaseId && !p, null);
      if (!B) return [];
      const X = p && S.has(O.id) ? O.id : u.id;
      return S.has(X) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: X,
          targetId: B,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${O.name} la implementa ${B}`
        }
      ] : [];
    })
  ), P = p ? (e.useCaseCalls ?? []).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], _ = [
    ...e.boundedContexts.filter((u) => u.identityProviderId && S.has(u.id) && S.has(u.identityProviderId)).map((u) => ({
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
    ...(e.etlFlows ?? []).filter((u) => u.identityProviderId && S.has(u.identityProviderId)).flatMap((u) => {
      const O = S.has(u.id) ? u.id : u.ownerBoundedContextId && S.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
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
    ...(e.identityProviders ?? []).filter((u) => u.publishedByExternalSystemId && S.has(u.id) && S.has(u.publishedByExternalSystemId)).map((u) => ({
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
  ], x = p ? e.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && S.has(u.id) && S.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], $ = p ? (e.aggregateCalls ?? []).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], M = p ? (e.queryCalls ?? []).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], C = p ? (e.actorUses ?? []).filter((u) => S.has(u.actorId) && S.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], T = (e.actorExternalDependencies ?? []).filter((u) => S.has(u.actorId) && S.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), N = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), D = (u) => S.has(u) ? u : N.get(u) ?? u, q = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: D(u.targetId),
        cqrs: u.type === "CQRS"
      })).filter(
        (u) => S.has(u.sourceId) && S.has(u.targetId) && u.sourceId !== u.targetId
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
  ], G = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.useCases ?? []) G.set(O.id, u.id);
    for (const O of u.domainEvents ?? []) G.set(O.id, u.id);
    for (const O of u.applicationEvents ?? []) G.set(O.id, u.id);
    for (const O of u.queryServices ?? []) G.set(O.id, u.id);
  }
  const re = (u) => S.has(u) ? u : G.get(u) ?? u, le = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.domainEvents ?? []) le.set(O.name, O.id);
    for (const O of u.applicationEvents ?? []) le.set(O.name, O.id);
  }
  const F = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (u) => (u.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: u.id, targetId: re(O.targetUseCaseId) }))
      ).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  ], K = [
    ...new Map(
      (e.workflows ?? []).filter((u) => u.triggerEvent && le.has(u.triggerEvent)).map((u) => ({
        sourceId: re(le.get(u.triggerEvent)),
        targetId: u.id,
        label: u.triggerEvent
      })).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  const ye = (e.notifications ?? []).flatMap((u) => {
    var X;
    const O = S.has(u.id) ? u.id : u.ownerBoundedContextId && S.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!O) return [];
    const B = [];
    if (u.eventId) {
      const j = S.has(u.eventId) ? u.eventId : G.get(u.eventId);
      j && S.has(j) && j !== O && B.push({
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
      S.has(j) && B.push({
        id: `notifto:${u.id}:${j}`,
        sourceId: O,
        targetId: j,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((X = (u.channels ?? [])[0]) == null ? void 0 : X.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} avisa a este rol — Supr lo quita`
      });
    return B;
  }), Be = (e.documents ?? []).flatMap((u) => {
    const O = S.has(u.id) ? u.id : u.ownerBoundedContextId && S.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!O || !u.queryServiceId) return [];
    const B = S.has(u.queryServiceId) ? u.queryServiceId : G.get(u.queryServiceId);
    return !B || !S.has(B) || B === O ? [] : [{
      id: `docq:${u.id}`,
      sourceId: B,
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
      const B = S.has(u.id) ? u.id : u.ownerBoundedContextId && S.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      if (!B) return [];
      const X = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!X) return [];
      let j = X;
      if (!S.has(j) && O.operationId && O.apiId && (j = O.apiId), !S.has(j) && O.externalTableId && (j = pe.get(O.externalTableId) ?? j), S.has(j) || (j = D(j)), S.has(j) || (j = G.get(X) ?? j), !S.has(j) || j === B) return [];
      const me = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${O.id}`,
        sourceId: me ? j : B,
        targetId: me ? B : j,
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
          sourceId: S.has(O) ? O : pe.get(O) ?? O,
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  ], J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceApiIds ?? []).map((O) => ({
          sourceId: D(O),
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  ], Ce = [
    ...new Map(
      (e.rags ?? []).flatMap((u) => [
        ...(u.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name })),
        ...(u.sourceBoundedContextIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name }))
      ]).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  ], Te = [
    ...new Map(
      (e.agentApiUses ?? []).map((u) => ({ sourceId: u.agentId, targetId: D(u.apiId) })).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => [
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
  ], Ue = (u) => u.onCompletionEventName || `${u.name.replace(/\s+/g, "")}Completado`, Oe = (e.workflows ?? []).flatMap(
    (u) => u.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== u.id && Ue(O) === u.triggerEvent).filter((O) => S.has(O.id) && S.has(u.id)).map((O) => ({
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
        (u) => S.has(u.sourceId) && S.has(u.targetId) && u.sourceId !== u.targetId
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
  ], wt = w.flatMap((u) => {
    const O = mt(u.apiId, u.boundedContextId);
    if (!S.has(O)) return [];
    const B = [];
    for (const X of (e.proxyApis ?? []).filter((j) => j.targetApiId === u.apiId)) {
      const j = D(X.id);
      S.has(j) && j !== O && B.push({
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
    return B;
  }), di = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const O = (e.proxyApis ?? []).find((j) => j.id === u.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const B = ut(u.operationId, u.proxyId), X = u.targetSiteId === O.targetApiId ? O.targetApiId : mt(O.targetApiId, u.targetSiteId);
    return !S.has(B) || !S.has(X) ? [] : [{
      id: `oproute:${B}->${X}`,
      sourceId: B,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ia = [
    ...new Map(
      (e.externalOperationUses ?? []).map((u) => {
        if (!S.has(u.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (me) => me.operations.some((qe) => qe.id === u.operationId)
        );
        if (!O) return null;
        const B = u.siteId === O.id, X = B ? u.operationId : ut(u.operationId, u.siteId);
        let j = S.has(X) ? X : null;
        if (!j)
          if (B || (e.proxyApis ?? []).some((me) => me.id === u.siteId))
            j = D(u.siteId);
          else {
            const me = mt(O.id, u.siteId);
            j = S.has(me) ? me : u.siteId;
          }
        return !j || !S.has(j) || j === u.externalSystemId ? null : { u, target: j };
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
    if (!S.has(u.useCaseId)) return [];
    const O = S.has(ut(u.operationId, u.boundedContextId)) ? ut(u.operationId, u.boundedContextId) : S.has(mt(u.apiId, u.boundedContextId)) ? mt(u.apiId, u.boundedContextId) : S.has(D(u.boundedContextId)) ? D(u.boundedContextId) : null;
    return O ? [{
      id: `apiimplwire:${u.operationId}@${u.boundedContextId}`,
      sourceId: O,
      targetId: u.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], xa = p ? (e.agentUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], va = (e.agentRags ?? []).filter((u) => S.has(u.agentId) && S.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), wa = p ? (e.rags ?? []).filter((u) => S.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((O) => S.has(O)).map((O) => ({
      id: `ragsrc:${u.id}->${O}`,
      sourceId: u.id,
      targetId: O,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], ka = p ? (e.agentExternalUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], _a = p ? (e.agentMcpUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.mcpServerId)).map((u) => ({
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
    ].filter((O) => S.has(u.id) && S.has(O)).map((O) => ({
      id: `gwx:${u.id}->${O}`,
      sourceId: u.id,
      targetId: O,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Ca = (e.agentGatewayUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Sa = p ? (e.agentApiOpUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ea = p ? (e.agentQueryUses ?? []).filter((u) => S.has(u.agentId) && S.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Aa = (e.agentDelegations ?? []).filter((u) => S.has(u.agentId) && S.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ma = (e.actorAgentUses ?? []).filter((u) => S.has(u.actorId) && S.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Pa = p ? (e.agentTriggers ?? []).filter((u) => S.has(u.eventId) && S.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ta = p ? (e.externalCalls ?? []).filter((u) => S.has(u.externalSystemId) && S.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Oa = p ? (e.externalUseCaseCalls ?? []).filter((u) => S.has(u.sourceId) && S.has(u.targetId)).map((u) => ({
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
    nodes: h,
    edges: [
      ...H,
      ...L,
      ...R,
      ...ne,
      ...te,
      ...I,
      ...P,
      ...x,
      ..._,
      ...ye,
      ...Be,
      ...$e,
      ...$,
      ...M,
      ...C,
      ...T,
      ...q,
      ...tt,
      ...wt,
      ...di,
      ...Ia,
      ...ba,
      ...F,
      ...K,
      ...Oe,
      ...Te,
      ...V,
      ...J,
      ...Ce,
      ...xa,
      ...ka,
      ..._a,
      ...$a,
      ...Ca,
      ...Sa,
      ...Ea,
      ...Aa,
      ...Ma,
      ...Pa,
      ...va,
      ...wa,
      ...E,
      ...Ta,
      ...Oa
    ]
  };
}
const Va = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ha = 176, Ga = 60, Ka = 140, ja = 40;
function Ya(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.boundedContexts.forEach((o, a) => {
    const r = 220 + a * 340;
    i.filter((s) => s.boundedContextId === o.id).forEach((s, p) => {
      const y = n.filter((m) => m.aggregateId === s.id).length, f = 140 + p * (170 + y * 60);
      t[s.id] = { x: r, y: f }, n.filter((m) => m.aggregateId === s.id).forEach((m, g) => {
        t[m.id] = { x: r + 60, y: f + 100 + g * 60 };
      });
    });
  }), i.filter((o) => !e.boundedContexts.some((a) => a.id === o.boundedContextId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function Xa(e, t) {
  const i = Ya(e), n = (f) => t[f] ?? i[f] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((f) => [f.id, f])), a = (e.aggregates ?? []).map((f) => {
    const m = o.get(f.boundedContextId), g = (m == null ? void 0 : m.subdomainType) ?? "GENERIC", v = n(f.id);
    return {
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
      w: Ha,
      h: Ga,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Va[g],
      stroke: "#64748b",
      badge: `${m ? `${m.name.toUpperCase()} · ` : ""}AGGREGATE${(f.invariants ?? []).length ? ` · ⚖${f.invariants.length}` : ""}`,
      tooltip: `Agregado ${f.name}${m ? ` — contexto ${m.name} (${g})` : ""}`
    };
  }), r = (e.entities ?? []).map((f) => {
    const m = n(f.id);
    return {
      id: f.id,
      label: f.name,
      x: m.x,
      y: m.y,
      w: Ka,
      h: ja,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${f.name} (dentro del agregado)`
    };
  }), l = (e.aggregates ?? []).flatMap(
    (f) => (f.invariants ?? []).map((m, g) => {
      const v = n(f.id), d = t[m.id] ?? { x: v.x - 150, y: v.y + 90 + g * 52 };
      return {
        id: m.id,
        label: m.name,
        x: d.x,
        y: d.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${m.name} — regla que el agregado protege; doble click abre la ficha del agregado (sus condiciones se detallan allí)`
      };
    })
  ), s = (e.aggregates ?? []).flatMap(
    (f) => (f.invariants ?? []).map((m) => ({
      id: `protects:${f.id}->${m.id}`,
      sourceId: f.id,
      targetId: m.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "El agregado protege esta regla — Supr la retira"
    }))
  ), p = (e.entities ?? []).map((f) => ({
    id: `contains:${f.aggregateId}->${f.id}`,
    sourceId: f.aggregateId,
    targetId: f.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), y = (e.aggregateReferences ?? []).map((f, m) => ({
    id: `aggref:${m}:${f.sourceAggregateId}->${f.targetAggregateId}`,
    sourceId: f.sourceAggregateId,
    targetId: f.targetAggregateId,
    kind: "aggregate-reference",
    label: f.label,
    color: "#475569",
    arrow: !0,
    tooltip: f.label ? `Referencia: ${f.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...a, ...r, ...l],
    edges: [...p, ...y, ...s]
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
  const n = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function as(e, t) {
  const i = e.flows, n = [], o = [], a = /* @__PURE__ */ new Set(), r = (l) => {
    var s, p;
    return ((p = (s = e.aggregates) == null ? void 0 : s.find((y) => y.id === l)) == null ? void 0 : p.name) ?? l ?? "?";
  };
  return i.forEach((l, s) => {
    const p = 120 + s * 130, y = Qa[l.archetype] ?? "#475569", f = l.triggerAggregateId ?? l.sourceId;
    if (!a.has(f)) {
      a.add(f);
      const c = t[f] ?? { x: 160, y: p };
      n.push({
        id: f,
        label: l.triggerAggregateId ? r(l.triggerAggregateId) : f,
        x: c.x,
        y: c.y,
        w: Ja,
        h: Za,
        kind: l.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: l.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: l.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const m = `flow:${l.id}`, g = t[m] ?? { x: 470, y: p };
    n.push({
      id: m,
      label: l.name,
      x: g.x,
      y: g.y,
      w: es,
      h: ts,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: y,
      badge: l.archetype,
      tooltip: `Flow ${l.name} [${l.archetype}]${l.readModelName ? ` → read model ${l.readModelName}` : ""}${l.targetUseCaseId ? ` → use case ${l.targetUseCaseId}` : ""}`
    });
    const v = os(e, l), d = `tgt:${v.id}`;
    if (!a.has(d)) {
      a.add(d);
      const c = t[d] ?? { x: 790, y: p };
      n.push({
        id: d,
        label: v.label,
        x: c.x,
        y: c.y,
        w: is,
        h: ns,
        kind: v.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${l.id}:in`,
      sourceId: f,
      targetId: m,
      kind: "flow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${l.id}:out`,
      sourceId: m,
      targetId: d,
      kind: "flow-delivery",
      color: y,
      arrow: !0
    });
  }), { nodes: n, edges: o };
}
const ss = 190, rs = 56, Ji = 170, ds = 52;
function Bn(e, t) {
  const i = [], n = [], o = (a) => {
    var r;
    return (r = e.boundedContexts.find((l) => l.id === a)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((a, r) => {
    const l = 140 + r * 240, s = t[a.id] ?? { x: 150, y: l };
    i.push({
      id: a.id,
      label: a.name,
      x: s.x,
      y: s.y,
      w: ss,
      h: rs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerBoundedContextId) ? ` — contexto ${o(a.ownerBoundedContextId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((y, f) => {
      const m = y.type === "HUMAN", g = t[y.id] ?? { x: 150 + (f + 1) * 240, y: l };
      if (i.push({
        id: y.id,
        label: y.name,
        x: g.x,
        y: g.y,
        w: Ji,
        h: ds,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${y.roleId ? ` · ${y.roleId}` : ""}${y.deadline ? ` · ⏱ ${y.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${y.name}${y.useCaseId ? ` — use case ${y.useCaseId}` : ""}${y.deadline ? ` · deadline ${y.deadline}` : ""}`
      }), n.push({
        id: `pe:${a.id}:${f}`,
        sourceId: p,
        targetId: y.id,
        kind: "process-seq",
        label: f === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), y.compensationUseCaseId) {
        const v = `comp:${y.id}`, d = t[v] ?? { x: g.x, y: g.y + 90 };
        i.push({
          id: v,
          label: y.compensationUseCaseId,
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
          id: `pc:${y.id}`,
          sourceId: y.id,
          targetId: v,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = y.id;
    }), a.onCompletionEventName) {
      const y = `done:${a.id}`, f = t[y] ?? { x: 150 + (a.steps.length + 1) * 240, y: l };
      i.push({
        id: y,
        label: a.onCompletionEventName,
        x: f.x,
        y: f.y,
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
        targetId: y,
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
const $i = globalThis, kn = $i.ShadowRoot && ($i.ShadyCSS === void 0 || $i.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _n = Symbol(), Fn = /* @__PURE__ */ new WeakMap();
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
      n && (t = Fn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Fn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ls = (e) => new Uo(typeof e == "string" ? e : e + "", void 0, _n), xt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, a) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
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
let Ct = class extends HTMLElement {
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
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const l = o == null ? void 0 : o.call(this);
      a == null || a.call(this, r), this.requestUpdate(t, l, n);
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
      const r = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : Ni).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, r;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = n.getPropertyOptions(o), s = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : Ni;
      this._$Em = o;
      const p = s.fromAttribute(i, l.type);
      this[o] = p ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, a) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (a = this[t]), n ?? (n = l.getPropertyOptions(t)), !((n.hasChanged ?? $n)(a, i) || n.useDefault && n.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: a }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), a !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, r] of o) {
        const { wrapped: l } = r, s = this[a];
        l !== !0 || this._$AL.has(a) || s === void 0 || this.C(a, void 0, r, s);
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
Ct.elementStyles = [], Ct.shadowRootOptions = { mode: "open" }, Ct[jt("elementProperties")] = /* @__PURE__ */ new Map(), Ct[jt("finalized")] = /* @__PURE__ */ new Map(), Zi == null || Zi({ ReactiveElement: Ct }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, Gn = (e) => e, Ri = Yt.trustedTypes, Kn = Ri ? Ri.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, qo = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Bo = "?" + ot, Is = `<${Bo}>`, It = document, Jt = () => It.createComment(""), Zt = (e) => e === null || typeof e != "object" && typeof e != "function", Cn = Array.isArray, bs = (e) => Cn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", en = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jn = /-->/g, Yn = />/g, lt = RegExp(`>|${en}(?:([^\\s"'>=/]+)(${en}*=${en}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xn = /'/g, Qn = /"/g, Fo = /^(?:script|style|textarea|title)$/i, Wo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = Wo(1), ie = Wo(2), Mt = Symbol.for("lit-noChange"), ae = Symbol.for("lit-nothing"), Jn = /* @__PURE__ */ new WeakMap(), ft = It.createTreeWalker(It, 129);
function Vo(e, t) {
  if (!Cn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Kn !== void 0 ? Kn.createHTML(t) : t;
}
const xs = (e, t) => {
  const i = e.length - 1, n = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Ut;
  for (let l = 0; l < i; l++) {
    const s = e[l];
    let p, y, f = -1, m = 0;
    for (; m < s.length && (r.lastIndex = m, y = r.exec(s), y !== null); ) m = r.lastIndex, r === Ut ? y[1] === "!--" ? r = jn : y[1] !== void 0 ? r = Yn : y[2] !== void 0 ? (Fo.test(y[2]) && (o = RegExp("</" + y[2], "g")), r = lt) : y[3] !== void 0 && (r = lt) : r === lt ? y[0] === ">" ? (r = o ?? Ut, f = -1) : y[1] === void 0 ? f = -2 : (f = r.lastIndex - y[2].length, p = y[1], r = y[3] === void 0 ? lt : y[3] === '"' ? Qn : Xn) : r === Qn || r === Xn ? r = lt : r === jn || r === Yn ? r = Ut : (r = lt, o = void 0);
    const g = r === lt && e[l + 1].startsWith("/>") ? " " : "";
    a += r === Ut ? s + Is : f >= 0 ? (n.push(p), s.slice(0, f) + qo + s.slice(f) + ot + g) : s + ot + (f === -2 ? l : g);
  }
  return [Vo(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ei {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let a = 0, r = 0;
    const l = t.length - 1, s = this.parts, [p, y] = xs(t, i);
    if (this.el = ei.createElement(p, n), ft.currentNode = this.el.content, i === 2 || i === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (o = ft.nextNode()) !== null && s.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const f of o.getAttributeNames()) if (f.endsWith(qo)) {
          const m = y[r++], g = o.getAttribute(f).split(ot), v = /([.?@])?(.*)/.exec(m);
          s.push({ type: 1, index: a, name: v[2], strings: g, ctor: v[1] === "." ? ws : v[1] === "?" ? ks : v[1] === "@" ? _s : Wi }), o.removeAttribute(f);
        } else f.startsWith(ot) && (s.push({ type: 6, index: a }), o.removeAttribute(f));
        if (Fo.test(o.tagName)) {
          const f = o.textContent.split(ot), m = f.length - 1;
          if (m > 0) {
            o.textContent = Ri ? Ri.emptyScript : "";
            for (let g = 0; g < m; g++) o.append(f[g], Jt()), ft.nextNode(), s.push({ type: 2, index: ++a });
            o.append(f[m], Jt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Bo) s.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = o.data.indexOf(ot, f + 1)) !== -1; ) s.push({ type: 7, index: a }), f += ot.length - 1;
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
  var r, l;
  if (t === Mt) return t;
  let o = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const a = Zt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = Pt(e, o._$AS(e, t.values), o, n)), t;
}
class vs {
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
    let a = ft.nextNode(), r = 0, l = 0, s = n[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let p;
        s.type === 2 ? p = new ai(a, a.nextSibling, this, t) : s.type === 1 ? p = new s.ctor(a, s.name, s.strings, this, t) : s.type === 6 && (p = new $s(a, this, t)), this._$AV.push(p), s = n[++l];
      }
      r !== (s == null ? void 0 : s.index) && (a = ft.nextNode(), r++);
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
    t = Pt(this, t, i), Zt(t) ? t === ae || t == null || t === "" ? (this._$AH !== ae && this._$AR(), this._$AH = ae) : t !== this._$AH && t !== Mt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bs(t) ? this.k(t) : this._(t);
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
      const r = new vs(o, this), l = r.u(this.options);
      r.p(i), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = Jn.get(t.strings);
    return i === void 0 && Jn.set(t.strings, i = new ei(t)), i;
  }
  k(t) {
    Cn(this._$AH) || (this._$AH = [], this._$AR());
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
    let r = !1;
    if (a === void 0) t = Pt(this, t, i, 0), r = !Zt(t) || t !== this._$AH && t !== Mt, r && (this._$AH = t);
    else {
      const l = t;
      let s, p;
      for (t = a[0], s = 0; s < a.length - 1; s++) p = Pt(this, l[n + s], i, s), p === Mt && (p = this._$AH[s]), r || (r = !Zt(p) || p !== this._$AH[s]), p === ae ? t = ae : t !== ae && (t += (p ?? "") + a[s + 1]), this._$AH[s] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === ae ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends Wi {
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
    if ((t = Pt(this, t, i, 0) ?? ae) === Mt) return;
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
const tn = Yt.litHtmlPolyfillSupport;
tn == null || tn(ei, ai), (Yt.litHtmlVersions ?? (Yt.litHtmlVersions = [])).push("3.3.3");
const Cs = (e, t, i) => {
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
class Ge extends Ct {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Cs(i, this.renderRoot, this.renderOptions);
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
    return Mt;
  }
}
var To;
Ge._$litElement$ = !0, Ge.finalized = !0, (To = gt.litElementHydrateSupport) == null || To.call(gt, { LitElement: Ge });
const nn = gt.litElementPolyfillSupport;
nn == null || nn({ LitElement: Ge });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ss = { attribute: !0, type: String, converter: Ni, reflect: !1, hasChanged: $n }, Es = (e = Ss, t, i) => {
  const { kind: n, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const s = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, s, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(l) {
      const s = this[r];
      t.call(this, l), this.requestUpdate(r, s, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function se(e) {
  return (t, i) => typeof i == "object" ? Es(e, t, i) : ((n, o, a) => {
    const r = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, n), r ? Object.getOwnPropertyDescriptor(o, a) : void 0;
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
function As(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === pn && t.documentElement.namespaceURI === pn ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ms(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ho(e) {
  var t = Vi(e);
  return (t.local ? Ms : As)(t);
}
function Ps() {
}
function Sn(e) {
  return e == null ? Ps : function() {
    return this.querySelector(e);
  };
}
function Ts(e) {
  typeof e != "function" && (e = Sn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l = n[o] = new Array(r), s, p, y = 0; y < r; ++y)
      (s = a[y]) && (p = e.call(s, s.__data__, y, a)) && ("__data__" in s && (p.__data__ = s.__data__), l[y] = p);
  return new ze(n, this._parents);
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
    for (var r = t[a], l = r.length, s, p = 0; p < l; ++p)
      (s = r[p]) && (n.push(e.call(s, s.__data__, p, r)), o.push(s));
  return new ze(n, o);
}
function Ko(e) {
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
var Bs = Array.prototype.filter;
function Fs() {
  return Array.from(this.children);
}
function Ws(e) {
  return function() {
    return Bs.call(this.children, e);
  };
}
function Vs(e) {
  return this.selectAll(e == null ? Fs : Ws(typeof e == "function" ? e : jo(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Ko(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l = n[o] = [], s, p = 0; p < r; ++p)
      (s = a[p]) && e.call(s, s.__data__, p, a) && l.push(s);
  return new ze(n, this._parents);
}
function Yo(e) {
  return new Array(e.length);
}
function Gs() {
  return new ze(this._enter || this._groups.map(Yo), this._parents);
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
function Ks(e) {
  return function() {
    return e;
  };
}
function js(e, t, i, n, o, a) {
  for (var r = 0, l, s = t.length, p = a.length; r < p; ++r)
    (l = t[r]) ? (l.__data__ = a[r], n[r] = l) : i[r] = new Li(e, a[r]);
  for (; r < s; ++r)
    (l = t[r]) && (o[r] = l);
}
function Ys(e, t, i, n, o, a, r) {
  var l, s, p = /* @__PURE__ */ new Map(), y = t.length, f = a.length, m = new Array(y), g;
  for (l = 0; l < y; ++l)
    (s = t[l]) && (m[l] = g = r.call(s, s.__data__, l, t) + "", p.has(g) ? o[l] = s : p.set(g, s));
  for (l = 0; l < f; ++l)
    g = r.call(e, a[l], l, a) + "", (s = p.get(g)) ? (n[l] = s, s.__data__ = a[l], p.delete(g)) : i[l] = new Li(e, a[l]);
  for (l = 0; l < y; ++l)
    (s = t[l]) && p.get(m[l]) === s && (o[l] = s);
}
function Xs(e) {
  return e.__data__;
}
function Qs(e, t) {
  if (!arguments.length) return Array.from(this, Xs);
  var i = t ? Ys : js, n = this._parents, o = this._groups;
  typeof e != "function" && (e = Ks(e));
  for (var a = o.length, r = new Array(a), l = new Array(a), s = new Array(a), p = 0; p < a; ++p) {
    var y = n[p], f = o[p], m = f.length, g = Js(e.call(y, y && y.__data__, p, n)), v = g.length, d = l[p] = new Array(v), c = r[p] = new Array(v), h = s[p] = new Array(m);
    i(y, f, d, c, h, g, t);
    for (var k = 0, b = 0, E, L; k < v; ++k)
      if (E = d[k]) {
        for (k >= b && (b = k + 1); !(L = c[b]) && ++b < v; ) ;
        E._next = L || null;
      }
  }
  return r = new ze(r, n), r._enter = l, r._exit = s, r;
}
function Js(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Zs() {
  return new ze(this._exit || this._groups.map(Yo), this._parents);
}
function er(e, t, i) {
  var n = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), n && o ? n.merge(o).order() : o;
}
function tr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, o = i.length, a = n.length, r = Math.min(o, a), l = new Array(o), s = 0; s < r; ++s)
    for (var p = i[s], y = n[s], f = p.length, m = l[s] = new Array(f), g, v = 0; v < f; ++v)
      (g = p[v] || y[v]) && (m[v] = g);
  for (; s < o; ++s)
    l[s] = i[s];
  return new ze(l, this._parents);
}
function ir() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], o = n.length - 1, a = n[o], r; --o >= 0; )
      (r = n[o]) && (a && r.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(r, a), a = r);
  return this;
}
function nr(e) {
  e || (e = or);
  function t(f, m) {
    return f && m ? e(f.__data__, m.__data__) : !f - !m;
  }
  for (var i = this._groups, n = i.length, o = new Array(n), a = 0; a < n; ++a) {
    for (var r = i[a], l = r.length, s = o[a] = new Array(l), p, y = 0; y < l; ++y)
      (p = r[y]) && (s[y] = p);
    s.sort(t);
  }
  return new ze(o, this._parents).order();
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
      var r = n[o];
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
    for (var o = t[i], a = 0, r = o.length, l; a < r; ++a)
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
function xr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function vr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ir : typeof t == "function" ? xr : br)(e, t, i ?? "")) : Tt(this.node(), e);
}
function Tt(e, t) {
  return e.style.getPropertyValue(t) || Xo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function wr(e) {
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
  return arguments.length > 1 ? this.each((t == null ? wr : typeof t == "function" ? _r : kr)(e, t)) : this.node()[e];
}
function Qo(e) {
  return e.trim().split(/^|\s+/);
}
function En(e) {
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
  for (var i = En(e), n = -1, o = t.length; ++n < o; ) i.add(t[n]);
}
function ea(e, t) {
  for (var i = En(e), n = -1, o = t.length; ++n < o; ) i.remove(t[n]);
}
function Cr(e) {
  return function() {
    Zo(this, e);
  };
}
function Sr(e) {
  return function() {
    ea(this, e);
  };
}
function Er(e, t) {
  return function() {
    (t.apply(this, arguments) ? Zo : ea)(this, e);
  };
}
function Ar(e, t) {
  var i = Qo(e + "");
  if (arguments.length < 2) {
    for (var n = En(this.node()), o = -1, a = i.length; ++o < a; ) if (!n.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Er : t ? Cr : Sr)(i, t));
}
function Mr() {
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
  return arguments.length ? this.each(e == null ? Mr : (typeof e == "function" ? Tr : Pr)(e)) : this.node().textContent;
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
function Br() {
  return this.each(qr);
}
function Fr(e) {
  var t = typeof e == "function" ? e : Ho(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Wr() {
  return null;
}
function Vr(e, t) {
  var i = typeof e == "function" ? e : Ho(e), n = t == null ? Wr : typeof t == "function" ? t : Sn(t);
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
function Kr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function jr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Yr(e) {
  return this.select(e ? jr : Kr);
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
      for (var r = 0, l = n.length; r < l; ++r)
        if ((o = n[r]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), o = { type: e.type, name: e.name, value: t, listener: a, options: i }, n ? n.push(o) : this.__on = [o];
  };
}
function td(e, t, i) {
  var n = Jr(e + ""), o, a = n.length, r;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var s = 0, p = l.length, y; s < p; ++s)
        for (o = 0, y = l[s]; o < a; ++o)
          if ((r = n[o]).type === y.type && r.name === y.name)
            return y.value;
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
    for (var n = e[t], o = 0, a = n.length, r; o < a; ++o)
      (r = n[o]) && (yield r);
}
var ia = [null];
function ze(e, t) {
  this._groups = e, this._parents = t;
}
function si() {
  return new ze([[document.documentElement]], ia);
}
function sd() {
  return this;
}
ze.prototype = si.prototype = {
  constructor: ze,
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
  style: vr,
  property: $r,
  classed: Ar,
  text: Or,
  html: Dr,
  raise: Ur,
  lower: Br,
  append: Fr,
  insert: Vr,
  remove: Gr,
  clone: Yr,
  datum: Xr,
  on: td,
  dispatch: od,
  [Symbol.iterator]: ad
};
function Ve(e) {
  return typeof e == "string" ? new ze([[document.querySelector(e)]], [document.documentElement]) : new ze([[e]], ia);
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
function An() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Ci(i);
}
function Ci(e) {
  this._ = e;
}
function ld(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", o = i.indexOf(".");
    if (o >= 0 && (n = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Ci.prototype = An.prototype = {
  constructor: Ci,
  on: function(e, t) {
    var i = this._, n = ld(e + "", i), o, a = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++a < r; ) if ((o = (e = n[a]).type) && (o = cd(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < r; )
      if (o = (e = n[a]).type) i[o] = eo(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = eo(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ci(e);
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
  var t = e.document.documentElement, i = Ve(e).on("dragstart.drag", mn, un);
  "onselectstart" in t ? i.on("selectstart.drag", mn, un) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ud(e, t) {
  var i = e.document.documentElement, n = Ve(e).on("dragstart.drag", null);
  t && (n.on("click.drag", mn, un), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Mn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function na(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function ri() {
}
var ti = 0.7, Di = 1 / ti, At = "\\s*([+-]?\\d+)\\s*", ii = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", md = /^#([0-9a-f]{3,8})$/, fd = new RegExp(`^rgb\\(${At},${At},${At}\\)$`), hd = new RegExp(`^rgb\\(${je},${je},${je}\\)$`), gd = new RegExp(`^rgba\\(${At},${At},${At},${ii}\\)$`), yd = new RegExp(`^rgba\\(${je},${je},${je},${ii}\\)$`), Id = new RegExp(`^hsl\\(${ii},${je},${je}\\)$`), bd = new RegExp(`^hsla\\(${ii},${je},${je},${ii}\\)$`), to = {
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
Mn(ri, ni, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: io,
  // Deprecated! Use color.formatHex.
  formatHex: io,
  formatHex8: xd,
  formatHsl: vd,
  formatRgb: no,
  toString: no
});
function io() {
  return this.rgb().formatHex();
}
function xd() {
  return this.rgb().formatHex8();
}
function vd() {
  return oa(this).formatHsl();
}
function no() {
  return this.rgb().formatRgb();
}
function ni(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = md.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? oo(t) : i === 3 ? new Re(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ui(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ui(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = fd.exec(e)) ? new Re(t[1], t[2], t[3], 1) : (t = hd.exec(e)) ? new Re(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = gd.exec(e)) ? ui(t[1], t[2], t[3], t[4]) : (t = yd.exec(e)) ? ui(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Id.exec(e)) ? ro(t[1], t[2] / 100, t[3] / 100, 1) : (t = bd.exec(e)) ? ro(t[1], t[2] / 100, t[3] / 100, t[4]) : to.hasOwnProperty(e) ? oo(to[e]) : e === "transparent" ? new Re(NaN, NaN, NaN, 0) : null;
}
function oo(e) {
  return new Re(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ui(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Re(e, t, i, n);
}
function wd(e) {
  return e instanceof ri || (e = ni(e)), e ? (e = e.rgb(), new Re(e.r, e.g, e.b, e.opacity)) : new Re();
}
function fn(e, t, i, n) {
  return arguments.length === 1 ? wd(e) : new Re(e, t, i, n ?? 1);
}
function Re(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
Mn(Re, fn, na(ri, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ti : Math.pow(ti, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Re(yt(this.r), yt(this.g), yt(this.b), zi(this.opacity));
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
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, i, n);
}
function oa(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof ri || (e = ni(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, o = Math.min(t, i, n), a = Math.max(t, i, n), r = NaN, l = a - o, s = (a + o) / 2;
  return l ? (t === a ? r = (i - n) / l + (i < n) * 6 : i === a ? r = (n - t) / l + 2 : r = (t - i) / l + 4, l /= s < 0.5 ? a + o : 2 - a - o, r *= 60) : l = s > 0 && s < 1 ? 0 : r, new He(r, l, s, e.opacity);
}
function _d(e, t, i, n) {
  return arguments.length === 1 ? oa(e) : new He(e, t, i, n ?? 1);
}
function He(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
Mn(He, _d, na(ri, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ti : Math.pow(ti, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - n;
    return new Re(
      on(e >= 240 ? e - 240 : e + 120, o, n),
      on(e, o, n),
      on(e < 120 ? e + 240 : e - 120, o, n),
      this.opacity
    );
  },
  clamp() {
    return new He(lo(this.h), mi(this.s), mi(this.l), zi(this.opacity));
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
function Cd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Sd(e) {
  return (e = +e) == 1 ? sa : function(t, i) {
    return i - t ? Cd(t, i, e) : aa(isNaN(t) ? i : t);
  };
}
function sa(e, t) {
  var i = t - e;
  return i ? $d(e, i) : aa(isNaN(e) ? t : e);
}
const co = (function e(t) {
  var i = Sd(t);
  function n(o, a) {
    var r = i((o = fn(o)).r, (a = fn(a)).r), l = i(o.g, a.g), s = i(o.b, a.b), p = sa(o.opacity, a.opacity);
    return function(y) {
      return o.r = r(y), o.g = l(y), o.b = s(y), o.opacity = p(y), o + "";
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
function Ed(e) {
  return function() {
    return e;
  };
}
function Ad(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Md(e, t) {
  var i = hn.lastIndex = an.lastIndex = 0, n, o, a, r = -1, l = [], s = [];
  for (e = e + "", t = t + ""; (n = hn.exec(e)) && (o = an.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), l[r] ? l[r] += a : l[++r] = a), (n = n[0]) === (o = o[0]) ? l[r] ? l[r] += o : l[++r] = o : (l[++r] = null, s.push({ i: r, x: nt(n, o) })), i = an.lastIndex;
  return i < t.length && (a = t.slice(i), l[r] ? l[r] += a : l[++r] = a), l.length < 2 ? s[0] ? Ad(s[0].x) : Ed(t) : (t = s.length, function(p) {
    for (var y = 0, f; y < t; ++y) l[(f = s[y]).i] = f.x(p);
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
  var r, l, s;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (s = e * i + t * n) && (i -= e * s, n -= t * s), (l = Math.sqrt(i * i + n * n)) && (i /= l, n /= l, s /= l), e * n < t * i && (e = -e, t = -t, s = -s, r = -r), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * po,
    skewX: Math.atan(s) * po,
    scaleX: r,
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
  function a(p, y, f, m, g, v) {
    if (p !== f || y !== m) {
      var d = g.push("translate(", null, t, null, i);
      v.push({ i: d - 4, x: nt(p, f) }, { i: d - 2, x: nt(y, m) });
    } else (f || m) && g.push("translate(" + f + t + m + i);
  }
  function r(p, y, f, m) {
    p !== y ? (p - y > 180 ? y += 360 : y - p > 180 && (p += 360), m.push({ i: f.push(o(f) + "rotate(", null, n) - 2, x: nt(p, y) })) : y && f.push(o(f) + "rotate(" + y + n);
  }
  function l(p, y, f, m) {
    p !== y ? m.push({ i: f.push(o(f) + "skewX(", null, n) - 2, x: nt(p, y) }) : y && f.push(o(f) + "skewX(" + y + n);
  }
  function s(p, y, f, m, g, v) {
    if (p !== f || y !== m) {
      var d = g.push(o(g) + "scale(", null, ",", null, ")");
      v.push({ i: d - 4, x: nt(p, f) }, { i: d - 2, x: nt(y, m) });
    } else (f !== 1 || m !== 1) && g.push(o(g) + "scale(" + f + "," + m + ")");
  }
  return function(p, y) {
    var f = [], m = [];
    return p = e(p), y = e(y), a(p.translateX, p.translateY, y.translateX, y.translateY, f, m), r(p.rotate, y.rotate, f, m), l(p.skewX, y.skewX, f, m), s(p.scaleX, p.scaleY, y.scaleX, y.scaleY, f, m), p = y = null, function(g) {
      for (var v = -1, d = m.length, c; ++v < d; ) f[(c = m[v]).i] = c.x(g);
      return f.join("");
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
  function o(a, r) {
    var l = a[0], s = a[1], p = a[2], y = r[0], f = r[1], m = r[2], g = y - l, v = f - s, d = g * g + v * v, c, h;
    if (d < Rd)
      h = Math.log(m / p) / t, c = function(z) {
        return [
          l + z * g,
          s + z * v,
          p * Math.exp(t * z * h)
        ];
      };
    else {
      var k = Math.sqrt(d), b = (m * m - p * p + n * d) / (2 * p * i * k), E = (m * m - p * p - n * d) / (2 * m * i * k), L = Math.log(Math.sqrt(b * b + 1) - b), R = Math.log(Math.sqrt(E * E + 1) - E);
      h = (R - L) / t, c = function(z) {
        var W = z * h, w = uo(L), S = p / (i * k) * (w * Dd(t * W + L) - Ld(L));
        return [
          l + S * g,
          s + S * v,
          p * w / uo(t * W + L)
        ];
      };
    }
    return c.duration = h * 1e3 * t / Math.SQRT2, c;
  }
  return o.rho = function(a) {
    var r = Math.max(1e-3, +a), l = r * r, s = l * l;
    return e(r, l, s);
  }, o;
})(Math.SQRT2, 2, 4);
var Ot = 0, Gt = 0, qt = 0, la = 1e3, Ui, Kt, qi = 0, bt = 0, Hi = 0, oi = typeof performance == "object" && performance.now ? performance : Date, ca = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Pn() {
  return bt || (ca(Ud), bt = oi.now() + Hi);
}
function Ud() {
  bt = 0;
}
function Bi() {
  this._call = this._time = this._next = null;
}
Bi.prototype = pa.prototype = {
  constructor: Bi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Pn() : +i) + (t == null ? 0 : +t), !this._next && Kt !== this && (Kt ? Kt._next = this : Ui = this, Kt = this), this._call = e, this._time = i, yn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, yn());
  }
};
function pa(e, t, i) {
  var n = new Bi();
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
    Ot = 0, Fd(), bt = 0;
  }
}
function Bd() {
  var e = oi.now(), t = e - qi;
  t > la && (Hi -= t, qi = e);
}
function Fd() {
  for (var e, t = Ui, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ui = i);
  Kt = e, yn(n);
}
function yn(e) {
  if (!Ot) {
    Gt && (Gt = clearTimeout(Gt));
    var t = e - bt;
    t > 24 ? (e < 1 / 0 && (Gt = setTimeout(mo, e - oi.now() - Hi)), qt && (qt = clearInterval(qt))) : (qt || (qi = oi.now(), qt = setInterval(Bd, la)), Ot = 1, ca(mo));
  }
}
function fo(e, t, i) {
  var n = new Bi();
  return t = t == null ? 0 : +t, n.restart((o) => {
    n.stop(), e(o + t);
  }, t, i), n;
}
var Wd = An("start", "end", "cancel", "interrupt"), Vd = [], ua = 0, ho = 1, In = 2, Si = 3, go = 4, bn = 5, Ei = 6;
function Gi(e, t, i, n, o, a) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
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
  var i = Ke(e, t);
  if (i.state > ua) throw new Error("too late; already scheduled");
  return i;
}
function Ye(e, t) {
  var i = Ke(e, t);
  if (i.state > Si) throw new Error("too late; already running");
  return i;
}
function Ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Hd(e, t, i) {
  var n = e.__transition, o;
  n[t] = i, i.timer = pa(a, 0, i.time);
  function a(p) {
    i.state = ho, i.timer.restart(r, i.delay, i.time), i.delay <= p && r(p - i.delay);
  }
  function r(p) {
    var y, f, m, g;
    if (i.state !== ho) return s();
    for (y in n)
      if (g = n[y], g.name === i.name) {
        if (g.state === Si) return fo(r);
        g.state === go ? (g.state = Ei, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete n[y]) : +y < t && (g.state = Ei, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete n[y]);
      }
    if (fo(function() {
      i.state === Si && (i.state = go, i.timer.restart(l, i.delay, i.time), l(p));
    }), i.state = In, i.on.call("start", e, e.__data__, i.index, i.group), i.state === In) {
      for (i.state = Si, o = new Array(m = i.tween.length), y = 0, f = -1; y < m; ++y)
        (g = i.tween[y].value.call(e, e.__data__, i.index, i.group)) && (o[++f] = g);
      o.length = f + 1;
    }
  }
  function l(p) {
    for (var y = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(s), i.state = bn, 1), f = -1, m = o.length; ++f < m; )
      o[f].call(e, y);
    i.state === bn && (i.on.call("end", e, e.__data__, i.index, i.group), s());
  }
  function s() {
    i.state = Ei, i.timer.stop(), delete n[t];
    for (var p in n) return;
    delete e.__transition;
  }
}
function Ai(e, t) {
  var i = e.__transition, n, o, a = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        a = !1;
        continue;
      }
      o = n.state > In && n.state < bn, n.state = Ei, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    a && delete e.__transition;
  }
}
function Gd(e) {
  return this.each(function() {
    Ai(this, e);
  });
}
function Kd(e, t) {
  var i, n;
  return function() {
    var o = Ye(this, e), a = o.tween;
    if (a !== i) {
      n = i = a;
      for (var r = 0, l = n.length; r < l; ++r)
        if (n[r].name === t) {
          n = n.slice(), n.splice(r, 1);
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
    var a = Ye(this, e), r = a.tween;
    if (r !== n) {
      o = (n = r).slice();
      for (var l = { name: t, value: i }, s = 0, p = o.length; s < p; ++s)
        if (o[s].name === t) {
          o[s] = l;
          break;
        }
      s === p && o.push(l);
    }
    a.tween = o;
  };
}
function Yd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ke(this.node(), i).tween, o = 0, a = n.length, r; o < a; ++o)
      if ((r = n[o]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Kd : jd)(i, e, t));
}
function On(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var o = Ye(this, n);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Ke(o, n).value[t];
  };
}
function ma(e, t) {
  var i;
  return (typeof t == "number" ? nt : t instanceof ni ? co : (i = ni(t)) ? (t = i, co) : Md)(e, t);
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
    var r = this.getAttribute(e);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function Zd(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function el(e, t, i) {
  var n, o, a;
  return function() {
    var r, l = i(this), s;
    return l == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), s = l + "", r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, l)));
  };
}
function tl(e, t, i) {
  var n, o, a;
  return function() {
    var r, l = i(this), s;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), s = l + "", r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, l)));
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
  return arguments.length ? this.each((typeof e == "function" ? dl : ll)(t, e)) : Ke(this.node(), t).delay;
}
function pl(e, t) {
  return function() {
    Ye(this, e).duration = +t.apply(this, arguments);
  };
}
function ul(e, t) {
  return t = +t, function() {
    Ye(this, e).duration = t;
  };
}
function ml(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? pl : ul)(t, e)) : Ke(this.node(), t).duration;
}
function fl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ye(this, e).ease = t;
  };
}
function hl(e) {
  var t = this._id;
  return arguments.length ? this.each(fl(t, e)) : Ke(this.node(), t).ease;
}
function gl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ye(this, e).ease = i;
  };
}
function yl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(gl(this._id, e));
}
function Il(e) {
  typeof e != "function" && (e = Ko(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l = n[o] = [], s, p = 0; p < r; ++p)
      (s = a[p]) && e.call(s, s.__data__, p, a) && l.push(s);
  return new et(n, this._parents, this._name, this._id);
}
function bl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, o = i.length, a = Math.min(n, o), r = new Array(n), l = 0; l < a; ++l)
    for (var s = t[l], p = i[l], y = s.length, f = r[l] = new Array(y), m, g = 0; g < y; ++g)
      (m = s[g] || p[g]) && (f[g] = m);
  for (; l < n; ++l)
    r[l] = t[l];
  return new et(r, this._parents, this._name, this._id);
}
function xl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function vl(e, t, i) {
  var n, o, a = xl(t) ? Tn : Ye;
  return function() {
    var r = a(this, e), l = r.on;
    l !== n && (o = (n = l).copy()).on(t, i), r.on = o;
  };
}
function wl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ke(this.node(), i).on.on(e) : this.each(vl(i, e, t));
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
  typeof e != "function" && (e = Sn(e));
  for (var n = this._groups, o = n.length, a = new Array(o), r = 0; r < o; ++r)
    for (var l = n[r], s = l.length, p = a[r] = new Array(s), y, f, m = 0; m < s; ++m)
      (y = l[m]) && (f = e.call(y, y.__data__, m, l)) && ("__data__" in y && (f.__data__ = y.__data__), p[m] = f, Gi(p[m], t, i, m, p, Ke(y, i)));
  return new et(a, this._parents, t, i);
}
function Cl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Go(e));
  for (var n = this._groups, o = n.length, a = [], r = [], l = 0; l < o; ++l)
    for (var s = n[l], p = s.length, y, f = 0; f < p; ++f)
      if (y = s[f]) {
        for (var m = e.call(y, y.__data__, f, s), g, v = Ke(y, i), d = 0, c = m.length; d < c; ++d)
          (g = m[d]) && Gi(g, t, i, d, m, v);
        a.push(m), r.push(y);
      }
  return new et(a, r, t, i);
}
var Sl = si.prototype.constructor;
function El() {
  return new Sl(this._groups, this._parents);
}
function Al(e, t) {
  var i, n, o;
  return function() {
    var a = Tt(this, e), r = (this.style.removeProperty(e), Tt(this, e));
    return a === r ? null : a === i && r === n ? o : o = t(i = a, n = r);
  };
}
function fa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ml(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var r = Tt(this, e);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function Pl(e, t, i) {
  var n, o, a;
  return function() {
    var r = Tt(this, e), l = i(this), s = l + "";
    return l == null && (s = l = (this.style.removeProperty(e), Tt(this, e))), r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, l));
  };
}
function Tl(e, t) {
  var i, n, o, a = "style." + t, r = "end." + a, l;
  return function() {
    var s = Ye(this, e), p = s.on, y = s.value[a] == null ? l || (l = fa(t)) : void 0;
    (p !== i || o !== y) && (n = (i = p).copy()).on(r, o = y), s.on = n;
  };
}
function Ol(e, t, i) {
  var n = (e += "") == "transform" ? Od : ma;
  return t == null ? this.styleTween(e, Al(e, n)).on("end.style." + e, fa(e)) : typeof t == "function" ? this.styleTween(e, Pl(e, n, On(this, "style." + e, t))).each(Tl(this._id, e)) : this.styleTween(e, Ml(e, n, t), i).on("end.style." + e, null);
}
function Nl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Rl(e, t, i) {
  var n, o;
  function a() {
    var r = t.apply(this, arguments);
    return r !== o && (n = (o = r) && Nl(e, r, i)), n;
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
function Bl(e) {
  var t, i;
  function n() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && ql(o)), t;
  }
  return n._value = e, n;
}
function Fl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Bl(e));
}
function Wl() {
  for (var e = this._name, t = this._id, i = ha(), n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var r = n[a], l = r.length, s, p = 0; p < l; ++p)
      if (s = r[p]) {
        var y = Ke(s, t);
        Gi(s, e, i, p, r, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new et(n, this._parents, e, i);
}
function Vl() {
  var e, t, i = this, n = i._id, o = i.size();
  return new Promise(function(a, r) {
    var l = { value: r }, s = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var p = Ye(this, n), y = p.on;
      y !== e && (t = (e = y).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(s)), p.on = t;
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
  selectAll: Cl,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: Il,
  merge: bl,
  selection: El,
  transition: Wl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: wl,
  attr: il,
  attrTween: rl,
  style: Ol,
  styleTween: Ll,
  text: Ul,
  textTween: Fl,
  remove: _l,
  tween: Yd,
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
var Kl = {
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
function Yl(e) {
  var t, i;
  e instanceof et ? (t = e._id, e = e._name) : (t = ha(), (i = Kl).time = Pn(), e = e == null ? null : e + "");
  for (var n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var r = n[a], l = r.length, s, p = 0; p < l; ++p)
      (s = r[p]) && Gi(s, e, t, p, r, i || jl(s, t));
  return new et(n, this._parents, e, t);
}
si.prototype.interrupt = Gd;
si.prototype.transition = Yl;
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
function Bt(e) {
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
  var n = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > n ? (n + o) / 2 : Math.min(0, n) || Math.max(0, o),
    r > a ? (a + r) / 2 : Math.min(0, a) || Math.max(0, r)
  );
}
function ic() {
  var e = Ql, t = Jl, i = tc, n = Zl, o = ec, a = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, s = zd, p = An("start", "zoom", "end"), y, f, m, g = 500, v = 150, d = 0, c = 10;
  function h(I) {
    I.property("__zoom", yo).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", w).on("dblclick.zoom", S).filter(o).on("touchstart.zoom", H).on("touchmove.zoom", ne).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  h.transform = function(I, P, _, x) {
    var $ = I.selection ? I.selection() : I;
    $.property("__zoom", yo), I !== $ ? L(I, P, _, x) : $.interrupt().each(function() {
      R(this, arguments).event(x).start().zoom(null, typeof P == "function" ? P.apply(this, arguments) : P).end();
    });
  }, h.scaleBy = function(I, P, _, x) {
    h.scaleTo(I, function() {
      var $ = this.__zoom.k, M = typeof P == "function" ? P.apply(this, arguments) : P;
      return $ * M;
    }, _, x);
  }, h.scaleTo = function(I, P, _, x) {
    h.transform(I, function() {
      var $ = t.apply(this, arguments), M = this.__zoom, C = _ == null ? E($) : typeof _ == "function" ? _.apply(this, arguments) : _, T = M.invert(C), N = typeof P == "function" ? P.apply(this, arguments) : P;
      return i(b(k(M, N), C, T), $, r);
    }, _, x);
  }, h.translateBy = function(I, P, _, x) {
    h.transform(I, function() {
      return i(this.__zoom.translate(
        typeof P == "function" ? P.apply(this, arguments) : P,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), t.apply(this, arguments), r);
    }, null, x);
  }, h.translateTo = function(I, P, _, x, $) {
    h.transform(I, function() {
      var M = t.apply(this, arguments), C = this.__zoom, T = x == null ? E(M) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Xt.translate(T[0], T[1]).scale(C.k).translate(
        typeof P == "function" ? -P.apply(this, arguments) : -P,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), M, r);
    }, x, $);
  };
  function k(I, P) {
    return P = Math.max(a[0], Math.min(a[1], P)), P === I.k ? I : new Ze(P, I.x, I.y);
  }
  function b(I, P, _) {
    var x = P[0] - _[0] * I.k, $ = P[1] - _[1] * I.k;
    return x === I.x && $ === I.y ? I : new Ze(I.k, x, $);
  }
  function E(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function L(I, P, _, x) {
    I.on("start.zoom", function() {
      R(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var $ = this, M = arguments, C = R($, M).event(x), T = t.apply($, M), N = _ == null ? E(T) : typeof _ == "function" ? _.apply($, M) : _, D = Math.max(T[1][0] - T[0][0], T[1][1] - T[0][1]), q = $.__zoom, G = typeof P == "function" ? P.apply($, M) : P, re = s(q.invert(N).concat(D / q.k), G.invert(N).concat(D / G.k));
      return function(le) {
        if (le === 1) le = G;
        else {
          var F = re(le), K = D / F[2];
          le = new Ze(K, N[0] - F[0] * K, N[1] - F[1] * K);
        }
        C.zoom(null, le);
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
      var P = Ve(this.that).datum();
      p.call(
        I,
        this.that,
        new Xl(I, {
          sourceEvent: this.sourceEvent,
          target: h,
          transform: this.that.__zoom,
          dispatch: p
        }),
        P
      );
    }
  };
  function W(I, ...P) {
    if (!e.apply(this, arguments)) return;
    var _ = R(this, P).event(I), x = this.__zoom, $ = Math.max(a[0], Math.min(a[1], x.k * Math.pow(2, n.apply(this, arguments)))), M = ct(I);
    if (_.wheel)
      (_.mouse[0][0] !== M[0] || _.mouse[0][1] !== M[1]) && (_.mouse[1] = x.invert(_.mouse[0] = M)), clearTimeout(_.wheel);
    else {
      if (x.k === $) return;
      _.mouse = [M, x.invert(M)], Ai(this), _.start();
    }
    Bt(I), _.wheel = setTimeout(C, v), _.zoom("mouse", i(b(k(x, $), _.mouse[0], _.mouse[1]), _.extent, r));
    function C() {
      _.wheel = null, _.end();
    }
  }
  function w(I, ...P) {
    if (m || !e.apply(this, arguments)) return;
    var _ = I.currentTarget, x = R(this, P, !0).event(I), $ = Ve(I.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", D, !0), M = ct(I, _), C = I.clientX, T = I.clientY;
    pd(I.view), sn(I), x.mouse = [M, this.__zoom.invert(M)], Ai(this), x.start();
    function N(q) {
      if (Bt(q), !x.moved) {
        var G = q.clientX - C, re = q.clientY - T;
        x.moved = G * G + re * re > d;
      }
      x.event(q).zoom("mouse", i(b(x.that.__zoom, x.mouse[0] = ct(q, _), x.mouse[1]), x.extent, r));
    }
    function D(q) {
      $.on("mousemove.zoom mouseup.zoom", null), ud(q.view, x.moved), Bt(q), x.event(q).end();
    }
  }
  function S(I, ...P) {
    if (e.apply(this, arguments)) {
      var _ = this.__zoom, x = ct(I.changedTouches ? I.changedTouches[0] : I, this), $ = _.invert(x), M = _.k * (I.shiftKey ? 0.5 : 2), C = i(b(k(_, M), x, $), t.apply(this, P), r);
      Bt(I), l > 0 ? Ve(this).transition().duration(l).call(L, C, x, I) : Ve(this).call(h.transform, C, x, I);
    }
  }
  function H(I, ...P) {
    if (e.apply(this, arguments)) {
      var _ = I.touches, x = _.length, $ = R(this, P, I.changedTouches.length === x).event(I), M, C, T, N;
      for (sn(I), C = 0; C < x; ++C)
        T = _[C], N = ct(T, this), N = [N, this.__zoom.invert(N), T.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== N[2] && ($.touch1 = N, $.taps = 0) : ($.touch0 = N, M = !0, $.taps = 1 + !!y);
      y && (y = clearTimeout(y)), M && ($.taps < 2 && (f = N[0], y = setTimeout(function() {
        y = null;
      }, g)), Ai(this), $.start());
    }
  }
  function ne(I, ...P) {
    if (this.__zooming) {
      var _ = R(this, P).event(I), x = I.changedTouches, $ = x.length, M, C, T, N;
      for (Bt(I), M = 0; M < $; ++M)
        C = x[M], T = ct(C, this), _.touch0 && _.touch0[2] === C.identifier ? _.touch0[0] = T : _.touch1 && _.touch1[2] === C.identifier && (_.touch1[0] = T);
      if (C = _.that.__zoom, _.touch1) {
        var D = _.touch0[0], q = _.touch0[1], G = _.touch1[0], re = _.touch1[1], le = (le = G[0] - D[0]) * le + (le = G[1] - D[1]) * le, F = (F = re[0] - q[0]) * F + (F = re[1] - q[1]) * F;
        C = k(C, Math.sqrt(le / F)), T = [(D[0] + G[0]) / 2, (D[1] + G[1]) / 2], N = [(q[0] + re[0]) / 2, (q[1] + re[1]) / 2];
      } else if (_.touch0) T = _.touch0[0], N = _.touch0[1];
      else return;
      _.zoom("touch", i(b(C, T, N), _.extent, r));
    }
  }
  function te(I, ...P) {
    if (this.__zooming) {
      var _ = R(this, P).event(I), x = I.changedTouches, $ = x.length, M, C;
      for (sn(I), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, g), M = 0; M < $; ++M)
        C = x[M], _.touch0 && _.touch0[2] === C.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === C.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (C = ct(C, this), Math.hypot(f[0] - C[0], f[1] - C[1]) < c)) {
        var T = Ve(this).on("dblclick.zoom");
        T && T.apply(this, arguments);
      }
    }
  }
  return h.wheelDelta = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : hi(+I), h) : n;
  }, h.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : hi(!!I), h) : e;
  }, h.touchable = function(I) {
    return arguments.length ? (o = typeof I == "function" ? I : hi(!!I), h) : o;
  }, h.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : hi([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), h) : t;
  }, h.scaleExtent = function(I) {
    return arguments.length ? (a[0] = +I[0], a[1] = +I[1], h) : [a[0], a[1]];
  }, h.translateExtent = function(I) {
    return arguments.length ? (r[0][0] = +I[0][0], r[1][0] = +I[1][0], r[0][1] = +I[0][1], r[1][1] = +I[1][1], h) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, h.constrain = function(I) {
    return arguments.length ? (i = I, h) : i;
  }, h.duration = function(I) {
    return arguments.length ? (l = +I, h) : l;
  }, h.interpolate = function(I) {
    return arguments.length ? (s = I, h) : s;
  }, h.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? h : I;
  }, h.clickDistance = function(I) {
    return arguments.length ? (d = (I = +I) * I, h) : Math.sqrt(d);
  }, h.tapDistance = function(I) {
    return arguments.length ? (c = +I, h) : c;
  }, h;
}
var nc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, xe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? oc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && nc(t, i, o), o;
};
function ac(e, t, i, n) {
  const o = t.x - e.x, a = t.y - e.y, r = n.x - i.x, l = n.y - i.y, s = o * l - a * r;
  if (Math.abs(s) < 1e-9) return null;
  const p = ((i.x - e.x) * l - (i.y - e.y) * r) / s, y = ((i.x - e.x) * a - (i.y - e.y) * o) / s;
  return p <= 0.02 || p >= 0.98 || y <= 0.02 || y >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * a, t: p };
}
function sc(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, a = n * n + o * o || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / a)), l = t.x + r * n, s = t.y + r * o;
  return { dist: Math.hypot(e.x - l, e.y - s), t: r };
}
function rc(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], r = e[o + 1], l = Math.hypot(r.x - a.x, r.y - a.y) || 1, s = (r.x - a.x) / l, p = (r.y - a.y) / l, y = t.map(([m, g]) => ac(a, r, m, g)).filter((m) => m !== null).filter((m) => m.t * l > i + 2 && (1 - m.t) * l > i + 2).sort((m, g) => m.t - g.t);
    let f = -1 / 0;
    for (const m of y)
      m.t * l - i <= f + 2 || (n += ` L ${m.x - s * i} ${m.y - p * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + s * i} ${m.y + p * i}`, f = m.t * l + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const St = {
  component: ie`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ie`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: ie`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
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
let Ie = class extends Ge {
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
    }), Ve(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, r = this.fitInsets.top ?? 0, l = this.fitInsets.bottom ?? 0, s = Math.max(80, n.width - o - a), p = Math.max(80, n.height - r - l), y = Math.min(...t.map((c) => c.x - c.w / 2)) - e, f = Math.max(...t.map((c) => c.x + c.w / 2)) + e, m = Math.min(...t.map((c) => c.y - c.h / 2)) - e, g = Math.max(...t.map((c) => c.y + c.h / 2)) + e, v = Math.max(0.15, Math.min(s / (f - y), p / (g - m), 1.25)), d = Xt.translate(
      o + s / 2 - v * (y + f) / 2,
      r + p / 2 - v * (m + g) / 2
    ).scale(v);
    Ve(i).call(this._zoomBehavior.transform, d);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Ve(t), e);
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
    for (let a = e.parentId; a; a = (n = this.scene.nodes.find((r) => r.id === a)) == null ? void 0 : n.parentId) {
      const r = this.scene.nodes.find((s) => s.id === a);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const l = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (l)
        return { x: e.x + (l.x - r.x), y: e.y + (l.y - r.y) };
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
        const o = this.nodePos(n), a = o.x - n.w / 2 + 10 + e.w / 2, r = o.x + n.w / 2 - 10 - e.w / 2, l = o.y - n.h / 2 + 34 + e.h / 2, s = o.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), r), i = Math.min(Math.max(i, l), s);
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
      const r = (o = a.closest) == null ? void 0 : o.call(a, "[data-node-id]");
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
    let o = !1;
    const a = new Set(this.selectedIds), r = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (c) => a.has(c.id) && !(c.parentId && a.has(c.parentId))
    ) : null, l = r ? new Map(r.map((c) => [c.id, this.nodePos(c)])) : null, s = (c) => (c.shiftKey || c.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r, p = r ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, y = p !== null, f = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const c = [], h = p === "menu" ? this.scene.nodes.filter((k) => k.kind === "ui-app") : this.scene.nodes.filter((k) => k.id === t.parentId);
      for (const k of h) {
        const b = this.scene.nodes.filter((z) => z.parentId === k.id && f.includes(z.kind ?? "") && z.id !== t.id).sort((z, W) => z.y - W.y), E = k.x - k.w / 2 + 10, L = k.x + k.w / 2 - 10;
        for (const z of b) c.push({ x1: E, x2: L, y: z.y - z.h / 2 - 3, appId: k.id, beforeId: z.id });
        const R = b[b.length - 1];
        c.push({
          x1: E,
          x2: L,
          y: R ? R.y + R.h / 2 + 3 : k.y - k.h / 2 + 34 + 8,
          appId: k.id,
          beforeId: null
        });
      }
      return c;
    }, g = (c) => {
      const h = this.nodeIdAt(c), k = h && h !== t.id ? this.scene.nodes.find((b) => b.id === h) : void 0;
      return k ? k.kind === "external-system" ? k.id : k.parentId ?? null : null;
    }, v = (c) => {
      if ((c.buttons & 1) === 0) {
        d(c);
        return;
      }
      const h = this.toScene(c), k = h.x - i.x, b = h.y - i.y;
      if (!(!o && Math.hypot(k, b) < 3 / this._t.k))
        if (o = !0, r && l) {
          const E = /* @__PURE__ */ new Map();
          for (const L of r) {
            const R = l.get(L.id), z = this.clampToParent(L, R.x + k, R.y + b);
            E.set(L.id, { x: z.x, y: z.y });
          }
          this._dragGroup = E;
        } else if (y) {
          this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const E = this.scene.nodes.filter(
            (R) => f.includes(R.kind ?? "") && R.id !== t.id && Math.abs(h.x - R.x) <= R.w / 2 + 8
          ), L = p === "menu" ? E.find((R) => Math.abs(h.y - R.y) < R.h * 0.28) : void 0;
          if (L)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: L.id }, this._hoverNodeId = L.id;
          else {
            let R = -1, z = 14;
            this._menuSlots.slots.forEach((W, w) => {
              if (h.x < W.x1 - 24 || h.x > W.x2 + 24) return;
              const S = Math.abs(h.y - W.y);
              S < z && (z = S, R = w);
            }), this._menuSlots = { ...this._menuSlots, active: R >= 0 ? R : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else s(c) ? (this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._hoverNodeId = g(c)) : (this._dragPos = this.clampToParent(t, n.x + k, n.y + b), this._hoverNodeId = null);
    }, d = (c) => {
      if (window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", d), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, k]) => ({ id: h, x: k.x, y: k.y }))
        });
      else if (o && this._dragPos && y) {
        const h = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const k = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (h != null && h.nestRowId)
          this.emit(k, { id: t.id, nestRowId: h.nestRowId });
        else if (h && h.active !== null) {
          const b = h.slots[h.active];
          this.emit(k, { id: t.id, appId: b.appId, beforeId: b.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (s(c)) {
          const h = g(c);
          if (c.ctrlKey && t.kind === "api") {
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
    window.addEventListener("pointermove", v), window.addEventListener("pointerup", d);
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
    const o = 160, a = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, l = this.scene.nodes.filter((d) => d.parentId === t.id), s = Math.min(...l.map((d) => d.x - d.w / 2)), p = Math.max(...l.map((d) => d.x + d.w / 2)), y = Math.min(...l.map((d) => d.y - d.h / 2)), f = Math.max(...l.map((d) => d.y + d.h / 2)), m = Na(
      l.map((d) => ({ dx: d.x - r.x, dy: d.y - r.y, w: d.w, h: d.h })),
      { w: o, h: a }
    ), g = (d) => {
      if ((d.buttons & 1) === 0) {
        v();
        return;
      }
      const c = this.toScene(d);
      if (d.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(c.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(c.y - r.y))
        };
        return;
      }
      const h = r.x - i * r.w / 2, k = r.y - n * r.h / 2, b = i > 0 ? Math.max(c.x, h + o, l.length ? p + 10 : -1 / 0) : Math.min(c.x, h - o, l.length ? s - 10 : 1 / 0), E = n > 0 ? Math.max(c.y, k + a, l.length ? f + 10 : -1 / 0) : Math.min(c.y, k - a, l.length ? y - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (h + b) / 2,
        y: (k + E) / 2,
        w: Math.abs(b - h),
        h: Math.abs(E - k)
      };
    }, v = () => {
      window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", v), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", v);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const o = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const l = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: l.x, y: l.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, a = (r) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const l = this.nodeIdAt(r);
      l && l !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: l,
        x: r.clientX,
        y: r.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), a = t - n, r = i - o, l = e.w / 2, s = e.h / 2;
    if (a === 0 && r === 0) return { x: n, y: o };
    const p = 1 / Math.max(Math.abs(a) / l, Math.abs(r) / s);
    return { x: n + a * p, y: o + r * p };
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
    const t = this.scene.nodes.find((y) => y.id === e.sourceId), i = this.scene.nodes.find((y) => y.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(i), r = n[0] ?? a, l = n[n.length - 1] ?? o;
    let s = this.borderPoint(t, r.x, r.y), p = this.borderPoint(i, l.x, l.y);
    if (!n.length) {
      const y = this.edgeOffset(e);
      if (y !== 0) {
        const f = Math.hypot(p.x - s.x, p.y - s.y) || 1, m = -(p.y - s.y) / f * y, g = (p.x - s.x) / f * y;
        s = { x: s.x + m, y: s.y + g }, p = { x: p.x + m, y: p.y + g };
      }
    }
    return [s, ...n, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let o = !1;
    const a = (l) => {
      if (!this._wpDrag) return;
      const s = this.toScene(l);
      if (!o && Math.hypot(s.x - n.x, s.y - n.y) < 4 / this._t.k) return;
      o = !0;
      const p = [...this._wpDrag.points];
      p[this._wpDrag.index] = s, this._wpDrag = { ...this._wpDrag, points: p };
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
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
    const r = (s) => {
      if ((s.buttons & 1) === 0) {
        l();
        return;
      }
      const p = this.toScene(s);
      if (a) {
        if (this._wpDrag) {
          const y = [...this._wpDrag.points];
          y[o] = p, this._wpDrag = { ...this._wpDrag, points: y };
        }
      } else {
        if (Math.hypot(p.x - n.x, p.y - n.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const y = [...this.edgePoints[t.id] ?? []];
        y.splice(o, 0, p), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: y, index: o };
      }
    }, l = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", l), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", l);
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
    const n = e.color ?? "#64748b", o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), l = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, s = t.slice(1, -1);
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
        ${o ? s.map((p, y) => {
      var m;
      const f = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === y;
      return ie`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(g) => {
        g.button === 0 && (g.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: y }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], y));
      }}
                        @dblclick=${(g) => {
        g.stopPropagation(), this.removeWaypoint(e, y);
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
    var m, g, v, d;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, r = !!e.parentId, l = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, s = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.h : e.h, p = l / 2, y = s / 2, f = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ie`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (v = this._dragGroup) != null && v.has(e.id) ? "none" : "auto"}
         @pointerdown=${(c) => this.onNodePointerDown(c, e)}
         @dblclick=${(c) => {
      c.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ie`<rect x=${-p - 4} y=${-y - 4} width=${l + 8} height=${s + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-y} width=${l} height=${s} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ie`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ie`<text x=${-p} y=${-y - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ie`<g transform="translate(${p - 13}, ${-y + 13})"
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
        ${e.symbol && St[e.symbol] && !r ? ie`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-y + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${St[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && St[e.symbol] ? ie`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${St[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ie`
              <foreignObject x=${-p + 6} y=${a ? -y + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(c) => c.stopPropagation()}
                  @keydown=${(c) => {
      c.stopPropagation(), c.key === "Enter" && this.commitRename(e, c.target.value), c.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(c) => this.commitRename(e, c.target.value)}
                />
              </foreignObject>` : r ? ie`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : a ? ie`<text x=${-p + 12} y=${-y + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ie`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? ie`<line x1=${-p + 8} y1=${-y + 28} x2=${p - 8} y2=${-y + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, y],
      [0, -y]
    ].map(
      ([c, h]) => ie`
                <circle data-handle cx=${c} cy=${h} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(k) => this.onHandlePointerDown(k, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((d = e.extraHandles) != null && d.length) ? e.extraHandles.map(
      (c, h) => ie`
                <g transform="translate(${-p + 24 + h * 20}, ${-y})">
                  <circle data-handle r="7" fill=${c.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(k) => this.onHandlePointerDown(k, e, c.kind)}>
                    <title>${c.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${a && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([c, h]) => ie`
                <rect data-resize x=${c * p - 6.5} y=${h * y - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${c * h > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(k) => this.onResizePointerDown(k, e, c, h)}>
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
    }, o = (r) => {
      if ((r.buttons & 1) === 0) {
        n();
        return;
      }
      const l = this.toScene(r);
      !i && Math.hypot(l.x - t.x, l.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: l });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: r, b: l } = this._rubber, s = Math.min(r.x, l.x), p = Math.max(r.x, l.x), y = Math.min(r.y, l.y), f = Math.max(r.y, l.y), m = this.scene.nodes.filter((g) => {
          const v = this.nodePos(g);
          return v.x >= s && v.x <= p && v.y >= y && v.y <= f;
        }).map((g) => g.id);
        this.emit("nodes-boxed", { ids: m });
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, n = Math.max(...t.map((r) => r.x + r.w / 2)) + e, o = Math.min(...t.map((r) => r.y - r.h / 2)) - e, a = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: i, minY: o, w: n - i, h: a - o };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), o = this._t.k, a = Xt.translate(n.width / 2 - o * e, n.height / 2 - o * t).scale(o);
    Ve(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - n.left) / i, a = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, l = o.width / this._t.k, s = o.height / this._t.k;
    return A`
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
      var y, f;
      (f = (y = p.currentTarget).hasPointerCapture) != null && f.call(y, p.pointerId) && this.onMinimapPointer(p, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const y = this.nodePos(p);
      return ie`<rect
              x=${(y.x - p.w / 2 - e.minX) * n}
              y=${(y.y - p.h / 2 - e.minY) * n}
              width=${Math.max(2, p.w * n)}
              height=${Math.max(2, p.h * n)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * n}
            y=${(r - e.minY) * n}
            width=${l * n}
            height=${s * n}
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
        for (let r = 0; r < a.length - 1; r++) t.push([a[r], a[r + 1]]);
      }
    }), A`
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
Ie.styles = xt`
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
xe([
  se({ attribute: !1 })
], Ie.prototype, "scene", 2);
xe([
  se({ attribute: !1 })
], Ie.prototype, "selectedId", 2);
xe([
  se({ attribute: !1 })
], Ie.prototype, "selectedIds", 2);
xe([
  se({ type: Boolean })
], Ie.prototype, "connectable", 2);
xe([
  se({ attribute: !1 })
], Ie.prototype, "edgePoints", 2);
xe([
  U()
], Ie.prototype, "_t", 2);
xe([
  U()
], Ie.prototype, "_dragPos", 2);
xe([
  U()
], Ie.prototype, "_menuSlots", 2);
xe([
  U()
], Ie.prototype, "_dragGroup", 2);
xe([
  U()
], Ie.prototype, "_pendingLink", 2);
xe([
  U()
], Ie.prototype, "_hoverNodeId", 2);
xe([
  U()
], Ie.prototype, "_editingId", 2);
xe([
  U()
], Ie.prototype, "_spaceDown", 2);
xe([
  U()
], Ie.prototype, "_wpDrag", 2);
xe([
  U()
], Ie.prototype, "_selectedWaypoint", 2);
xe([
  U()
], Ie.prototype, "_resize", 2);
xe([
  U()
], Ie.prototype, "_rubber", 2);
xe([
  se({ attribute: !1 })
], Ie.prototype, "fitInsets", 2);
Ie = xe([
  vt("modux-canvas")
], Ie);
const Z = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  boundedContext: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Me(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ue(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const $t = (e) => e.trim().toLowerCase();
function dc(e, t) {
  var w, S, H, ne, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.boundedContexts.map((I) => [I.id, I.name])), o = e.boundedContexts.flatMap(
    (I) => (I.useCases ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  ), a = new Set(o.map((I) => I.id)), r = e.aggregates ?? [], l = new Set(
    e.boundedContexts.flatMap((I) => (I.domainServices ?? []).map((P) => P.id))
  ), s = e.boundedContexts.flatMap(
    (I) => (I.domainEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !1 }))
  ), p = e.boundedContexts.flatMap(
    (I) => (I.applicationEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !0 }))
  ), y = e.boundedContexts.flatMap(
    (I) => (I.readModels ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  );
  for (const I of o)
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Z.command.w,
      h: Z.command.h,
      kind: "use-case",
      symbol: I.policy ? "flow" : "gear",
      fill: I.policy ? Z.policy.fill : Z.command.fill,
      stroke: I.policy ? Z.policy.stroke : Z.command.stroke,
      badge: I.policy ? "POLICY" : "COMANDO",
      tooltip: I.policy ? `${I.name} — policy de ${n.get(I.boundedContextId) ?? I.boundedContextId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  for (const I of o)
    (I.steps ?? []).forEach((P, _) => {
      Me(i, {
        id: P.id,
        label: `${_ + 1}. ${P.name || P.type || "paso"}`,
        x: 0,
        y: 0,
        w: Z.command.w,
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
    Me(i, {
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
  for (const I of r)
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Z.aggregate.w,
      h: Z.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Z.aggregate.fill,
      stroke: Z.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${I.name} — agregado de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const I of [...s, ...p])
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: Z.event.w,
      h: Z.event.h,
      kind: I.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: Z.event.fill,
      stroke: Z.event.stroke,
      badge: I.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${I.name} — evento de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    }), f.set($t(I.name), I.id);
  const m = (I) => {
    if (!I || !I.trim()) return null;
    const P = f.get($t(I));
    if (P) return P;
    const _ = `evname:${$t(I)}`;
    return Me(i, {
      id: _,
      label: I,
      x: 0,
      y: 0,
      w: Z.event.w,
      h: Z.event.h,
      kind: "event-name",
      symbol: "event",
      fill: Z.event.fill,
      stroke: Z.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${I} — referenciado por nombre, sin evento declarado en el catálogo`
    }), _;
  }, g = (I) => {
    const P = y.find((x) => x.id === I.id) ?? y.find((x) => I.name && $t(x.name) === $t(I.name)), _ = (P == null ? void 0 : P.id) ?? (I.id || (I.name ? `rm:${$t(I.name)}` : null));
    return _ ? (Me(i, {
      id: _,
      label: (P == null ? void 0 : P.name) ?? I.name ?? _,
      x: 0,
      y: 0,
      w: Z.readModel.w,
      h: Z.readModel.h,
      kind: P ? "read-model" : "derived-read-model",
      fill: Z.readModel.fill,
      stroke: Z.readModel.stroke,
      dashed: !P,
      badge: "READ MODEL"
    }), _) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!a.has(I.targetId)) continue;
    const P = (e.actors ?? []).find((_) => _.id === I.actorId);
    P && (Me(i, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: Z.actor.w,
      h: Z.actor.h,
      kind: "actor",
      symbol: "person",
      fill: Z.actor.fill,
      stroke: Z.actor.stroke,
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
    const P = (e.agentUses ?? []).filter((C) => C.agentId === I.id), _ = (e.agentExternalUses ?? []).filter((C) => C.agentId === I.id), x = (e.agentRags ?? []).filter((C) => C.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((C) => C.agentId === I.id), M = (e.agentGatewayUses ?? []).some((C) => C.agentId === I.id) || (e.agentApiOpUses ?? []).some((C) => C.agentId === I.id) || (e.agentQueryUses ?? []).some((C) => C.agentId === I.id) || (e.agentDelegations ?? []).some((C) => C.agentId === I.id) || (e.agentTriggers ?? []).some((C) => C.agentId === I.id);
    if (!(!P.length && !_.length && !x.length && !$.length && !M)) {
      Me(i, {
        id: I.id,
        label: I.name,
        x: 0,
        y: 0,
        w: Z.actor.w,
        h: Z.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${I.name} — agente de IA (consume por MCP)`
      });
      for (const C of P)
        a.has(C.useCaseId) && ue(i, {
          id: `es-agent:${I.id}->${C.useCaseId}`,
          sourceId: I.id,
          targetId: C.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const C of _) {
        const T = e.externalSystems.find(
          (D) => (D.useCases ?? []).some((q) => q.id === C.externalUseCaseId)
        );
        if (!T) continue;
        const N = (w = (T.useCases ?? []).find((D) => D.id === C.externalUseCaseId)) == null ? void 0 : w.name;
        Me(i, {
          id: T.id,
          label: T.name,
          x: 0,
          y: 0,
          w: Z.external.w,
          h: Z.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Z.external.fill,
          stroke: Z.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentx:${I.id}->${C.externalUseCaseId}`,
          sourceId: I.id,
          targetId: T.id,
          kind: "es-agent-external",
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Llama a ${N} del sistema externo` : void 0
        });
      }
      for (const C of $) {
        const T = e.externalSystems.find(
          (D) => (D.mcpServers ?? []).some((q) => q.id === C.mcpServerId)
        );
        if (!T) continue;
        const N = (S = (T.mcpServers ?? []).find((D) => D.id === C.mcpServerId)) == null ? void 0 : S.name;
        Me(i, {
          id: T.id,
          label: T.name,
          x: 0,
          y: 0,
          w: Z.external.w,
          h: Z.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Z.external.fill,
          stroke: Z.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ue(i, {
          id: `es-agentmcp:${I.id}->${C.mcpServerId}`,
          sourceId: I.id,
          targetId: T.id,
          kind: "es-agent-mcp",
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Consume las herramientas del servidor MCP ${N}` : void 0
        });
      }
      for (const C of x) {
        const T = (e.rags ?? []).find((N) => N.id === C.ragId);
        if (T) {
          Me(i, {
            id: T.id,
            label: T.name,
            x: 0,
            y: 0,
            w: Z.readModel.w,
            h: Z.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${T.name} — base de conocimiento (retrieval)`
          }), ue(i, {
            id: `es-agrag:${I.id}->${T.id}`,
            sourceId: I.id,
            targetId: T.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const N of T.sourceReadModelIds ?? []) {
            const D = g({ id: N });
            D && ue(i, {
              id: `es-ragsrc:${T.id}->${D}`,
              sourceId: D,
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
  const v = (I) => {
    const P = e.externalSystems.find((_) => _.id === I);
    return P ? (Me(i, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: Z.external.w,
      h: Z.external.h,
      kind: "external-system",
      symbol: "component",
      fill: Z.external.fill,
      stroke: Z.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), P.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const P = v(I.externalSystemId);
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
      ($) => ($.useCases ?? []).some((M) => M.id === I.targetId)
    ), _ = P ? v(P.id) : null;
    if (!_) continue;
    const x = (H = ((P == null ? void 0 : P.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : H.name;
    ue(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: _,
      kind: "es-command-external",
      label: x,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: x ? `Llama a ${x} del sistema externo` : void 0
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
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (a.has(I.sourceId) || r.some((_) => _.id === I.sourceId) || l.has(I.sourceId))) || ue(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const c = (I, P, _, x, $, M) => (Me(i, {
    id: I,
    label: P,
    x: 0,
    y: 0,
    w: Z.policy.w,
    h: Z.policy.h,
    kind: _,
    symbol: "flow",
    fill: Z.policy.fill,
    stroke: Z.policy.stroke,
    badge: x,
    tooltip: $
  }), I), h = (I, P) => {
    const _ = m(I);
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
    h(I.eventName, P);
    for (const _ of I.actions ?? []) {
      if (_.type === "CallUseCase" && k(P, _.useCaseId), _.type === "StartSaga" && _.sagaId) {
        const x = `saga:${_.sagaId}`;
        c(x, _.sagaId, "saga", "SAGA"), ue(i, {
          id: `es-saga:${P}->${x}`,
          sourceId: P,
          targetId: x,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (_.type === "UpdateProjection" && _.projectionId) {
        const x = (e.projections ?? []).find(($) => $.id === _.projectionId);
        x && ue(i, {
          id: `es-feeds:${P}->${x.id}`,
          sourceId: P,
          targetId: x.id,
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
    for (const $ of I.handledEventIds) {
      const M = i.nodes.has($) ? $ : null;
      M && ue(i, {
        id: `es-trigger:${M}->${P}`,
        sourceId: M,
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
      const $ = e.externalSystems.find(
        (C) => (C.useCases ?? []).some((T) => T.id === _) || (C.tables ?? []).some((T) => T.id === _)
      ), M = $ ? v($.id) : null;
      if (M) {
        const C = ((ne = ($.useCases ?? []).find((T) => T.id === _)) == null ? void 0 : ne.name) ?? ((te = ($.tables ?? []).find((T) => T.id === _)) == null ? void 0 : te.name);
        ue(i, {
          id: `es-poll:${I.id}`,
          sourceId: M,
          targetId: P,
          kind: "es-projects-poll",
          label: C,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: C ? `polling de ${C}` : "polling"
        });
      }
    }
    const x = g({ id: I.readModelId, name: I.readModelName });
    x && ue(i, {
      id: `es-projects:${P}->${x}`,
      sourceId: P,
      targetId: x,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const _ = m(I.triggerEvent), x = g({ name: I.readModelName ?? `${I.triggerEvent}View` });
      _ && x && ue(i, {
        id: `es-mat:${I.id}`,
        sourceId: _,
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
    const P = c(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (h(I.triggerEvent, P), k(P, I.targetUseCaseId), !I.targetUseCaseId) {
      const _ = v(I.targetId), x = _ ?? `tgt:${I.targetId}`;
      !_ && n.has(I.targetId) && Me(i, {
        id: x,
        label: n.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: Z.boundedContext.w,
        h: Z.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: Z.boundedContext.fill,
        stroke: Z.boundedContext.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(x) && ue(i, {
        id: `es-deliver:${I.id}`,
        sourceId: P,
        targetId: x,
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
    h(I.triggerEvent, P);
    for (const x of I.steps) k(P, x.useCaseId);
    const _ = m(I.onCompletionEventName);
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
    h(I.triggerEvent, P);
    for (const x of I.steps ?? []) {
      k(P, x.targetUseCaseId);
      for (const $ of [x.emittedEventName, x.completionEventName]) {
        const M = m($);
        M && ue(i, {
          id: `es-wfemit:${I.id}:${M}`,
          sourceId: P,
          targetId: M,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const _ = m(I.onCompletionEventName);
    _ && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: _,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const b = [...i.nodes.values()], E = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    E.has(I.targetId) || E.set(I.targetId, []), E.get(I.targetId).push(I.sourceId);
  const L = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Set(), z = (I) => {
    const P = L.get(I);
    if (P !== void 0) return P;
    if (R.has(I)) return 0;
    R.add(I);
    const _ = E.get(I) ?? [], x = _.length ? 1 + Math.max(..._.map(z)) : 0;
    return R.delete(I), L.set(I, x), x;
  }, W = /* @__PURE__ */ new Map();
  for (const I of b) {
    const P = t[I.id];
    if (P) {
      I.x = P.x, I.y = P.y;
      continue;
    }
    const _ = z(I.id), x = W.get(_) ?? 0;
    W.set(_, x + 1), I.x = 140 + _ * 260, I.y = 110 + x * 110;
  }
  return { nodes: b, edges: i.edges };
}
const lc = 190, cc = 56, Io = 180, pc = 56, uc = 150, mc = 44, bo = 250, xo = 100;
function fc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((l) => t.get(l)).filter(Boolean), r = a.length ? 1 + Math.max(...a.map(n)) : 0;
    return i.delete(o.id), r;
  };
  return n(e);
}
function hc(e, t) {
  if (t.triggerAggregateId) {
    const i = (e.aggregates ?? []).find((n) => n.id === t.triggerAggregateId);
    if (i) return { id: i.id, label: i.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const i = e.boundedContexts.flatMap((n) => n.domainServices ?? []).find((n) => n.id === t.triggerDomainServiceId);
    if (i) return { id: i.id, label: i.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const i = e.boundedContexts.flatMap((n) => n.useCases ?? []).find((n) => n.id === t.triggerUseCaseId);
    if (i) return { id: i.id, label: i.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function gc(e, t) {
  var s;
  const i = [], n = [], o = /* @__PURE__ */ new Set(), a = (p) => {
    var y;
    return (y = e.boundedContexts.flatMap((f) => f.useCases ?? []).find((f) => f.id === p)) == null ? void 0 : y.name;
  };
  let r = 140;
  (e.workflows ?? []).forEach((p) => {
    var k;
    const y = new Map(p.steps.map((b) => [b.id, b])), f = new Map(p.steps.map((b) => [b.id, fc(b, y)])), m = /* @__PURE__ */ new Map();
    for (const b of p.steps) {
      const E = f.get(b.id) ?? 0;
      m.set(E, (m.get(E) ?? 0) + 1);
    }
    const g = Math.max(1, ...m.values()), v = hc(e, p);
    if (v && !o.has(v.id)) {
      o.add(v.id);
      const b = t[v.id] ?? { x: 140, y: r };
      i.push({
        id: v.id,
        label: v.label,
        x: b.x,
        y: b.y,
        w: uc,
        h: mc,
        kind: v.kind,
        symbol: v.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: v.kind === "aggregate" ? "AGGREGATE" : v.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const d = t[p.id] ?? { x: 420, y: r };
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
    }), v && n.push({
      id: `wft:${p.id}`,
      sourceId: v.id,
      targetId: p.id,
      kind: "workflow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    });
    const c = /* @__PURE__ */ new Map();
    let h = 0;
    for (const b of p.steps) {
      const E = f.get(b.id) ?? 0;
      h = Math.max(h, E);
      const L = c.get(E) ?? 0;
      c.set(E, L + 1);
      const R = t[b.id] ?? {
        x: d.x + (E + 1) * bo,
        y: r + (L - (m.get(E) - 1) / 2) * xo
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
      const W = (b.dependsOnStepIds ?? []).filter((w) => y.has(w));
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
          tooltip: `${b.name} espera a ${((k = y.get(w)) == null ? void 0 : k.name) ?? w}`
        });
    }
    if (p.onCompletionEventName) {
      const b = `done:${p.id}`, E = t[b] ?? { x: d.x + (h + 2) * bo, y: r };
      i.push({
        id: b,
        label: p.onCompletionEventName,
        x: E.x,
        y: E.y,
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
    r += Math.max(2, g + 1) * xo + 60;
  });
  const l = new Set(i.map((p) => p.id));
  (e.workflowGateways ?? []).forEach((p, y) => {
    const f = t[p.id] ?? { x: 200 + y % 5 * 220, y: 60 };
    i.push({
      id: p.id,
      label: p.name,
      x: f.x,
      y: f.y,
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
    for (const f of p.sourceIds ?? [])
      l.has(f) && n.push({
        id: `wflink:${f}->${p.id}`,
        sourceId: f,
        targetId: p.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const y = p.type === "SPLIT" && p.semantics === "EXCLUSIVE";
    for (const f of p.targetIds ?? []) {
      if (!l.has(f)) continue;
      const m = y ? (s = (p.branchConditions ?? []).find((g) => g.targetId === f)) == null ? void 0 : s.expression : void 0;
      n.push({
        id: `wflink:${p.id}->${f}`,
        sourceId: p.id,
        targetId: f,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: y && !m,
        arrow: !0,
        label: m ?? (y ? "¿condición?" : void 0),
        tooltip: y ? `${m ? `Rama si: ${m}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((y) => (y.steps ?? []).filter((f) => f.roleId && l.has(f.id))).forEach((y, f) => {
    const m = (e.actors ?? []).find((v) => v.id === y.roleId), g = y.roleId;
    if (!l.has(g)) {
      const v = i.find((c) => c.id === y.id), d = t[g] ?? {
        x: v ? v.x - 90 : 120 + f * 200,
        y: v ? v.y - 120 : 40
      };
      i.push({
        id: g,
        label: (m == null ? void 0 : m.name) ?? g,
        x: d.x,
        y: d.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(m == null ? void 0 : m.name) ?? g} — su lista de tareas recibe los pasos humanos conectados`
      }), l.add(g);
    }
    n.push({
      id: `wfrole:${y.id}->${g}`,
      sourceId: g,
      targetId: y.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((y) => (y.steps ?? []).filter((f) => f.formPageId && l.has(f.id))).forEach((y, f) => {
    const m = (e.pages ?? []).find((g) => g.id === y.formPageId);
    if (m) {
      if (!l.has(m.id)) {
        const g = i.find((d) => d.id === y.id), v = t[m.id] ?? {
          x: g ? g.x : 200 + f * 220,
          y: g ? g.y + 130 : 60
        };
        i.push({
          id: m.id,
          label: m.name,
          x: v.x,
          y: v.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${m.name} — el forms engine la presenta como formulario de la tarea`
        }), l.add(m.id);
      }
      n.push({
        id: `wfform:${y.id}->${m.id}`,
        sourceId: y.id,
        targetId: m.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const p of e.workflows ?? [])
    for (const y of p.steps ?? [])
      !y.handoffWorkflowId || !l.has(y.handoffWorkflowId) || !l.has(y.id) || n.push({
        id: `wflink:${y.id}->${y.handoffWorkflowId}`,
        sourceId: y.id,
        targetId: y.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: i, edges: n };
}
const vo = 250, Ne = 30, pt = 6, yc = 16, Ft = 190, Ic = 60, bc = 170, gi = 44;
function xc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ke(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function vc(e) {
  const t = [], i = (n, o, a) => {
    for (const r of n ?? []) {
      const l = [...o, r.label];
      t.push({ entry: r, path: l, depth: a }), i(r.children ?? [], l, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function wc(e, t) {
  var L, R, z, W;
  const i = [], n = [], o = e.uiApps ?? [], a = e.pages ?? [], r = (w) => {
    var S;
    return ((S = e.boundedContexts.flatMap((H) => H.useCases ?? []).find((H) => H.id === w)) == null ? void 0 : S.name) ?? w;
  }, l = (w) => {
    var S;
    return ((S = e.boundedContexts.flatMap((H) => H.queryServices ?? []).find((H) => H.id === w)) == null ? void 0 : S.name) ?? w;
  }, s = /* @__PURE__ */ new Map();
  let p = 160;
  for (const w of o) {
    const S = vc(w), H = Math.max(
      90,
      54 + S.length * (Ne + pt)
    ), ne = t[w.id] ?? { x: 190, y: p + H / 2 };
    p = ne.y + H / 2 + 70;
    const te = w.type ?? "APP";
    i.push({
      id: w.id,
      label: w.title || w.name,
      x: ne.x,
      y: ne.y,
      w: vo,
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
    }), w.modelId && (s.set(w.modelId, {
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
    for (const [_, x, $, M, C] of [
      [w.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [w.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      _ && n.push({
        id: `${x === "app-view" ? "appview" : "appedit"}:${w.id}->${_}`,
        sourceId: w.id,
        targetId: _,
        kind: x,
        color: M,
        label: $,
        arrow: !0,
        tooltip: C
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
    let P = ne.y - H / 2 + 34 + 10 + Ne / 2;
    for (const { entry: _, path: x, depth: $ } of S) {
      const M = xc(w.id, _, x), C = $ * yc;
      if (i.push({
        id: M,
        label: _.label,
        x: ne.x + C / 2,
        y: P,
        w: vo - 20 - C,
        h: Ne,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (R = _.children) != null && R.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (z = _.children) != null && z.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (W = _.children) != null && W.length ? "Agrupador (con submenú): no puede abrir nada" : _.pageId ? `Abre ${_.pageId}` : _.uiAdapterId ? `Abre la app ${_.uiAdapterId}` : _.useCaseId ? `Lanza ${_.useCaseId}` : _.aggregateId ? `CRUD inferido sobre ${_.aggregateId}` : _.queryOperationId ? `Listado con filtros de ${_.queryOperationId}` : "Entrada de menú sin destino"
      }), P += Ne + pt, _.uiAdapterId && o.some((T) => T.id === _.uiAdapterId) && n.push({
        id: `menuapp:${M}->${_.uiAdapterId}`,
        sourceId: M,
        targetId: _.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), _.useCaseId && e.boundedContexts.some((N) => (N.useCases ?? []).some((D) => D.id === _.useCaseId)) && (s.set(_.useCaseId, {
        label: r(_.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `menuuc:${M}->${_.useCaseId}`,
        sourceId: M,
        targetId: _.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), _.aggregateId && (e.aggregates ?? []).some((T) => T.id === _.aggregateId)) {
        const T = (e.aggregates ?? []).find((N) => N.id === _.aggregateId);
        s.set(T.id, { label: T.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), n.push({
          id: `menuagg:${M}->${T.id}`,
          sourceId: M,
          targetId: T.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (_.queryOperationId) {
        const T = e.boundedContexts.flatMap((D) => D.queryServices ?? []).find((D) => D.id === _.queryServiceId), N = ((T == null ? void 0 : T.operations) ?? []).find((D) => D.id === _.queryOperationId);
        T && N && (s.set(N.id, {
          label: `${N.name} (${T.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), n.push({
          id: `menuqop:${M}->${N.id}`,
          sourceId: M,
          targetId: N.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      _.pageId && a.some((T) => T.id === _.pageId) && n.push({
        id: `menupage:${M}->${_.pageId}`,
        sourceId: M,
        targetId: _.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let y = 160;
  const f = (w) => {
    var S;
    return ((S = a.find((H) => H.id === w)) == null ? void 0 : S.name) ?? w;
  };
  for (const w of a) {
    const S = t[w.id] ?? { x: 640, y }, H = w.type === "WIZARD" ? w.wizardSteps ?? [] : [], ne = H.length ? 54 + H.length * (Ne + pt) : Ic;
    y = S.y + ne + 90, i.push({
      id: w.id,
      label: w.name,
      x: S.x,
      y: S.y,
      w: Ft,
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
    let te = S.y - ne / 2 + 34 + 10 + Ne / 2;
    H.forEach((I, P) => {
      const _ = I.id ?? I.pageId ?? String(P);
      i.push({
        id: `wizrow:${w.id}:${_}`,
        label: `${P + 1}. ${I.label ?? (I.pageId ? f(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: S.x,
        y: te,
        w: Ft - 20,
        h: Ne,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: w.id,
        tooltip: I.pageId ? `Paso ${P + 1}: ${f(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${P + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), te += Ne + pt;
    });
    for (const [I, P, _, x] of [
      [w.crudDetailPageId ?? w.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [w.crudCreatePageId ?? w.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && n.push({
        id: `${P === "crud-detail" ? "cruddetail" : "crudnew"}:${w.id}->${I}`,
        sourceId: w.id,
        targetId: I,
        kind: P,
        color: x,
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
    w.modelId && (s.set(w.modelId, {
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
      I.useCaseId && (s.set(I.useCaseId, {
        label: r(I.useCaseId),
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
    w.listingQueryServiceId && (s.set(w.listingQueryServiceId, {
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
  const m = e.buttonGroups ?? [], g = (w) => {
    var S;
    return ((S = m.find((H) => H.id === w)) == null ? void 0 : S.name) ?? w;
  };
  let v = 520;
  for (const w of m) {
    const S = w.buttons ?? [], H = w.groupIds ?? [], ne = S.length + H.length, te = t[w.id] ?? { x: 1e3, y: v }, I = Math.max(70, 54 + ne * (Ne + pt));
    v = te.y + I + 80, i.push({
      id: w.id,
      label: w.name,
      x: te.x,
      y: te.y,
      w: Ft,
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
    let P = te.y - I / 2 + 34 + 10 + Ne / 2;
    for (const _ of S)
      i.push({
        id: `gbtn:${w.id}:${_.id}`,
        label: _.label ?? _.id,
        x: te.x,
        y: P,
        w: Ft - 20,
        h: Ne,
        kind: "group-button",
        symbol: "usecase",
        fill: _.useCaseId || _.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !_.useCaseId && !_.apiOperationId,
        parentId: w.id,
        tooltip: `${_.label ?? _.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), P += Ne + pt;
    for (const _ of H)
      i.push({
        id: `gsub:${w.id}:${_}`,
        label: `▸ ${g(_)}`,
        x: te.x,
        y: P,
        w: Ft - 20,
        h: Ne,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: w.id,
        tooltip: `Subgrupo ${g(_)} — Supr lo desanida (el grupo sigue existiendo)`
      }), P += Ne + pt;
  }
  for (const w of m)
    for (const S of w.buttons ?? [])
      !S.useCaseId || !e.boundedContexts.some((ne) => (ne.useCases ?? []).some((te) => te.id === S.useCaseId)) || (s.set(S.useCaseId, {
        label: r(S.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `gbtnt:${w.id}:${S.id}`,
        sourceId: `gbtn:${w.id}:${S.id}`,
        targetId: S.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${S.label ?? S.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const w of a) {
    const S = [
      ["toolbar", w.toolbarGroupIds ?? []],
      ["botonera", w.bottomBarGroupIds ?? []]
    ];
    for (const [H, ne] of S)
      for (const te of ne)
        m.some((I) => I.id === te) && n.push({
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
    s.has(w.id) || s.set(w.id, { label: w.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [w, S] of s) {
    const H = t[w] ?? { x: 1050, y: d };
    d = H.y + gi + 46, i.push({
      id: w,
      label: S.label,
      x: H.x,
      y: H.y,
      w: bc,
      h: gi,
      kind: S.kind,
      symbol: S.symbol,
      fill: "#ffffff",
      stroke: S.stroke
    });
  }
  let c = 120;
  for (const w of e.identityProviders ?? []) {
    const S = t[w.id] ?? { x: -320, y: c };
    c = S.y + 70 + 40, i.push({
      id: w.id,
      label: w.name,
      x: S.x,
      y: S.y,
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
    w.identityProviderId && (e.identityProviders ?? []).some((S) => S.id === w.identityProviderId) && n.push({
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
  const h = (e.actorAppUses ?? []).filter(
    (w) => o.some((S) => S.id === w.appId) && (e.actors ?? []).some((S) => S.id === w.actorId)
  ), k = [...new Set(h.map((w) => w.actorId))];
  let b = 160;
  for (const w of k) {
    const S = (e.actors ?? []).find((ne) => ne.id === w), H = t[w] ?? { x: -60, y: b };
    b = H.y + gi + 46, i.push({
      id: w,
      label: S.name,
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
  for (const w of h)
    n.push({
      id: `actorapp:${w.actorId}->${w.appId}`,
      sourceId: w.actorId,
      targetId: w.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((w, S) => {
    const H = t[w.id] ?? { x: 1200, y: 120 + S * 90 };
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
  const E = new Set(i.map((w) => w.id));
  for (const w of a)
    w.customCodeId && E.has(w.customCodeId) && n.push({
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
    for (const S of w.usedElementIds ?? [])
      E.has(S) && n.push({
        id: `ccuse:${w.id}->${S}`,
        sourceId: w.id,
        targetId: S,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${w.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: i, edges: n };
}
const wo = 188, ko = 34, _o = 10, yi = 24, $o = 6;
function Ii(e, t) {
  return `fld:${e}:${t}`;
}
function xn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function kc(e, t) {
  const i = [], n = [], o = e.models ?? [], a = e.modelMappings ?? [], r = (m) => {
    var g;
    return ((g = o.find((v) => v.id === m)) == null ? void 0 : g.name) ?? m ?? "?";
  };
  o.forEach((m, g) => {
    const v = t[m.id] ?? { x: 200 + g % 5 * 260, y: 160 + Math.floor(g / 5) * 220 }, d = m.fields ?? [], c = ko + (d.length ? d.length * yi + (d.length - 1) * $o : 10) + _o;
    i.push({
      id: m.id,
      label: m.name,
      x: v.x,
      y: v.y,
      w: wo,
      h: c,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), d.forEach((h, k) => {
      i.push({
        id: Ii(m.id, h.id),
        label: h.name,
        x: v.x,
        y: v.y - c / 2 + ko + k * (yi + $o) + yi / 2,
        w: wo - 2 * _o,
        h: yi,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: h.type ?? void 0,
        parentId: m.id,
        tooltip: `${h.name}${h.type ? ` (${h.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((m, g) => {
    const v = t[m.id] ?? { x: 200 + g % 5 * 260, y: 60 };
    i.push({
      id: m.id,
      label: m.name,
      x: v.x,
      y: v.y,
      w: 150,
      h: 44,
      kind: "transformation",
      symbol: "gear",
      fill: "#fff7ed",
      stroke: "#ea580c",
      badge: "TRANSFORM",
      dashed: !m.output,
      tooltip: `${m.name} — transformación: arrastra modelos o campos hasta ella (entradas) y su asa hasta un modelo o campo (salida)${m.output ? "" : " · aún sin salida"}`
    });
  }), (e.customCodes ?? []).forEach((m, g) => {
    const v = t[m.id] ?? { x: 120 + g % 5 * 220, y: 60 };
    i.push({
      id: m.id,
      label: m.name,
      x: v.x,
      y: v.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${m.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`
    });
  });
  const l = new Set(i.map((m) => m.id)), s = (m) => m.fieldId ? Ii(m.modelId, m.fieldId) : m.modelId;
  for (const m of e.transformations ?? [])
    m.customCodeId && l.has(m.customCodeId) && l.has(m.id) && n.push({
      id: `cctf:${m.id}`,
      sourceId: m.customCodeId,
      targetId: m.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${m.name} delega en código a mano — Supr lo desconecta`
    });
  for (const m of a)
    m.customCodeId && l.has(m.customCodeId) && m.targetModelId && l.has(m.targetModelId) && n.push({
      id: `ccmap:${m.id}`,
      sourceId: m.customCodeId,
      targetId: m.targetModelId,
      kind: "custom-of-mapping",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      label: m.name,
      tooltip: `El mapeado ${m.name} delega en código a mano — Supr lo desconecta`
    });
  for (const m of e.transformations ?? []) {
    for (const g of m.inputs ?? []) {
      const v = s(g);
      l.has(v) && n.push({
        id: `tfin:${m.id}:${g.modelId}:${g.fieldId ?? ""}`,
        sourceId: v,
        targetId: m.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${m.name} — Supr la desconecta`
      });
    }
    m.output && l.has(s(m.output)) && n.push({
      id: `tfout:${m.id}`,
      sourceId: m.id,
      targetId: s(m.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${m.name} — Supr la desconecta`
    });
  }
  for (const m of a)
    if (!(!m.sourceModelId || !m.targetModelId) && !(!l.has(m.sourceModelId) || !l.has(m.targetModelId))) {
      n.push({
        id: `mapping:${m.id}`,
        sourceId: m.sourceModelId,
        targetId: m.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: m.name,
        arrow: !0,
        tooltip: `${m.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const g of m.rules ?? []) {
        const v = Ii(m.sourceModelId, g.sourceFieldId ?? ""), d = Ii(m.targetModelId, g.targetFieldId ?? "");
        !l.has(v) || !l.has(d) || n.push({
          id: `maprule:${m.id}:${g.id}`,
          sourceId: v,
          targetId: d,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${m.name} — Supr la elimina`
        });
      }
    }
  const p = new Set(
    a.filter((m) => m.sourceModelId && m.targetModelId).map((m) => `${m.sourceModelId}->${m.targetModelId}`)
  ), y = new Map(
    e.boundedContexts.flatMap((m) => (m.useCases ?? []).map((g) => [g.id, g]))
  ), f = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const g of m.buttons ?? []) {
        if (!g.useCaseId || g.mappingId) continue;
        const v = y.get(g.useCaseId);
        if (!(v != null && v.inputModelId) || v.inputModelId === m.modelId) continue;
        const d = `${m.modelId}->${v.inputModelId}`;
        p.has(d) || f.has(d) || (f.add(d), !(!l.has(m.modelId) || !l.has(v.inputModelId)) && n.push({
          id: `mapgap:${m.id}:${g.useCaseId}`,
          sourceId: m.modelId,
          targetId: v.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${g.label}» (página ${m.name}) llama a ${v.name}: falta mapear ${r(m.modelId)} → ${r(v.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: n };
}
const rn = 560, bi = 34, xi = 14, dn = 150, vi = 40, wi = 12, ki = 150, it = 40, _c = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, $c = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Cc(e, t) {
  const i = [], n = [], o = e.etlFlows ?? [], a = new Map(e.boundedContexts.map((d) => [d.id, d.name])), r = new Map(
    e.boundedContexts.flatMap((d) => [
      ...(d.domainEvents ?? []).map((c) => [c.id, c.name]),
      ...(d.applicationEvents ?? []).map((c) => [c.id, c.name])
    ])
  );
  let l = 140;
  for (const d of o) {
    const c = d.steps ?? [], h = [[], [], []];
    c.forEach((L) => h[_c(L.type)].push(L));
    const k = Math.max(1, ...h.map((L) => L.length)), b = bi + xi + k * (vi + wi), E = t[d.id] ?? { x: 420, y: l };
    l = E.y + b + 110, i.push({
      id: d.id,
      label: d.name,
      x: E.x,
      y: E.y,
      w: rn,
      h: b,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${d.name} — integrador${d.ownerBoundedContextId ? ` de ${a.get(d.ownerBoundedContextId) ?? d.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), h.forEach((L, R) => {
      const z = E.x - rn / 2 + xi + dn / 2 + R * (rn - 2 * xi - dn) / 2;
      L.forEach((W, w) => {
        const S = $c[R];
        if (i.push({
          id: W.id,
          label: W.name ?? W.id,
          x: z,
          y: E.y - b / 2 + bi + vi / 2 + w * (vi + wi),
          w: dn,
          h: vi,
          kind: "etl-step",
          symbol: S.symbol,
          fill: S.fill,
          stroke: S.stroke,
          badge: W.type === "SOURCE_PULL" ? "PULL" : W.type === "SOURCE_CONSUMER" ? "CONSUME" : W.type === "TRANSFORM" ? "TRANSFORM" : W.type === "WRITE_API" ? "→ API" : W.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: d.id,
          tooltip: `${W.name ?? W.id} (${W.type})${W.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), R > 0) {
          const H = h[R - 1], ne = H[Math.min(w, H.length - 1)];
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
  const s = new Set(i.map((d) => d.id)), p = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.externalTableId)).filter(Boolean)), y = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.apiId)).filter(Boolean)), f = new Set(o.flatMap((d) => (d.steps ?? []).map((c) => c.eventId)).filter(Boolean));
  let m = 120;
  for (const d of e.externalSystems) {
    const c = (d.tables ?? []).filter((b) => p.has(b.id));
    if (!c.length) continue;
    const h = bi + xi + c.length * (it + wi), k = t[d.id] ?? { x: -140, y: m };
    m = k.y + h + 90, i.push({
      id: d.id,
      label: d.name,
      x: k.x,
      y: k.y,
      w: ki + 30,
      h,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${d.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), s.add(d.id), c.forEach((b, E) => {
      i.push({
        id: b.id,
        label: b.name,
        x: k.x,
        y: k.y - h / 2 + bi + it / 2 + E * (it + wi),
        w: ki,
        h: it,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: d.id,
        tooltip: `${b.name} — tabla legacy de ${d.name}`
      }), s.add(b.id);
    });
  }
  let g = 120;
  for (const d of e.apis ?? []) {
    if (!y.has(d.id)) continue;
    const c = t[d.id] ?? { x: 1e3, y: g };
    g = c.y + it + 70, i.push({
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
    }), s.add(d.id);
  }
  let v = 400;
  for (const d of f) {
    const c = d, h = t[c] ?? { x: 1e3, y: v };
    v = h.y + it + 70, i.push({
      id: c,
      label: r.get(c) ?? c,
      x: h.x,
      y: h.y,
      w: ki,
      h: it,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), s.add(c);
  }
  for (const d of o)
    for (const c of d.steps ?? []) {
      const h = c.externalTableId ?? c.apiId ?? c.eventId;
      if (!h || !s.has(h) || !s.has(c.id)) continue;
      const k = c.type.startsWith("SOURCE");
      n.push({
        id: `etl:${d.id}:${c.id}`,
        sourceId: k ? h : c.id,
        targetId: k ? c.id : h,
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
async function Sc(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((s) => s.e), n = new i(), a = {
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
    children: e.nodes.map((s) => ({ id: s.id, width: s.w, height: s.h })),
    edges: e.edges.map((s) => ({ id: s.id, sources: [s.sourceId], targets: [s.targetId] }))
  }, r = await n.layout(a), l = {};
  for (const s of r.children ?? [])
    l[s.id] = {
      x: (s.x ?? 0) + (s.width ?? 0) / 2,
      y: (s.y ?? 0) + (s.height ?? 0) / 2
    };
  return l;
}
var Ec = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, Le = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ac(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Ec(t, i, o), o;
};
const Mc = /* @__PURE__ */ new Set([
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
let Ee = class extends Ge {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._selected = /* @__PURE__ */ new Set(), this._rubber = null, this._renaming = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, r;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], i = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".h3");
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
        const r = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), l = (o = r == null ? void 0 : r.closest) == null ? void 0 : o.call(r, ".n3"), s = (l == null ? void 0 : l.dataset.nodeId) ?? null;
        this._hoverTargetId = s !== this._connect.sourceId ? s : null;
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
            const n = this.getBoundingClientRect(), o = Math.min(i.x1, i.x2) + n.left, a = Math.max(i.x1, i.x2) + n.left, r = Math.min(i.y1, i.y2) + n.top, l = Math.max(i.y1, i.y2) + n.top, s = [];
            this.renderRoot.querySelectorAll(".n3").forEach((p) => {
              const y = p.getBoundingClientRect(), f = y.left + y.width / 2, m = y.top + y.height / 2, g = p.dataset.nodeId;
              g && f >= o && f <= a && m >= r && m <= l && s.push(g);
            }), this._selected = new Set(s);
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
    const r = new DOMMatrix().translate(n, o).multiply(a).translate(-n, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), l = r.transformPoint(new DOMPoint(0, 0, 0, 1)), s = r.transformPoint(new DOMPoint(1, 0, 0, 0)), p = r.transformPoint(new DOMPoint(0, 1, 0, 0)), y = e - i.left, f = t - i.top, m = s.x - y * s.w, g = p.x - y * p.w, v = s.y - f * s.w, d = p.y - f * p.w, c = y * l.w - l.x, h = f * l.w - l.y, k = m * d - g * v;
    return k ? { x: (c * d - g * h) / k, y: (m * h - c * v) / k } : { ...this._center };
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
      const a = n.parentId ? e.get(n.parentId) : void 0, r = a ? i(a) + 1 : 0;
      return t.set(n.id, r), r;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return A`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((c) => [c.id, c])), n = Math.min(...e.map((c) => c.x - c.w / 2)) - 60, o = Math.max(...e.map((c) => c.x + c.w / 2)) + 60, a = Math.min(...e.map((c) => c.y - c.h / 2)) - 60, r = Math.max(...e.map((c) => c.y + c.h / 2)) + 60, l = (n + o) / 2, s = (a + r) / 2, p = this.getBoundingClientRect(), y = p.width ? Math.min(p.width / (o - n), p.height / (r - a), 1) * 0.9 : 0.5, f = this._k * y;
    this._kUsed = f, this._center = { x: l, y: s };
    const m = 30, g = this._liveMove, v = (c) => c.x + ((g == null ? void 0 : g.id) === c.id ? g.dx : 0), d = (c) => c.y + ((g == null ? void 0 : g.id) === c.id ? g.dy : 0);
    return A`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${f}, ${f}, ${f}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-l}px, ${-s}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${a}px"
            width=${o - n}
            height=${r - a}
            viewBox="${n} ${a} ${o - n} ${r - a}"
          >
            ${this.scene.edges.map((c) => {
      const h = i.get(c.sourceId), k = i.get(c.targetId);
      return !h || !k ? "" : ie`<line
                x1=${v(h)} y1=${d(h)} x2=${v(k)} y2=${d(k)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((c) => {
      const h = i.get(c.sourceId), k = i.get(c.targetId);
      if (!h || !k) return "";
      const b = (t.get(h.id) ?? 0) * m + 2, E = (t.get(k.id) ?? 0) * m + 2, L = v(k) - v(h), R = d(k) - d(h), z = E - b, W = Math.hypot(L, R), w = Math.hypot(W, z), S = Math.atan2(R, L) * 180 / Math.PI, H = Math.atan2(z, W) * 180 / Math.PI, ne = c.color ?? "#64748b", te = c.dashed ? `repeating-linear-gradient(90deg, ${ne} 0 6px, transparent 6px 10px)` : ne;
      return A`<div
              class="edge3"
              style="
                left: ${v(h)}px; top: ${d(h)}px; width: ${w}px; height: 1.7px;
                transform: translateZ(${b}px) rotateZ(${S}deg) rotateY(${-H}deg);
                background: ${te};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((c) => {
      const h = t.get(c.id) ?? 0, k = c.container || h === 0, b = this._hoverTargetId === c.id;
      return A`
              <div
                class="n3 ${c.container ? "container3" : ""} ${this.selectedId === c.id || this._selected.has(c.id) ? "selected3" : ""} ${b ? "hover3" : ""}"
                data-node-id=${c.id}
                data-kind=${c.kind}
                title=${c.tooltip ?? c.label}
                style="
                  left: ${v(c) - c.w / 2}px; top: ${d(c) - c.h / 2}px;
                  width: ${c.w}px; height: ${c.h}px;
                  transform: translateZ(${h * m + (b ? 8 : 0)}px)${b ? " scale(1.06)" : ""};
                  background: ${c.container ? "color-mix(in srgb, " + (c.fill ?? "#ffffff") + " 82%, transparent)" : c.fill ?? "#ffffff"};
                  border-color: ${c.stroke ?? "#64748b"};
                  border-style: ${c.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${k ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${c.badge ? A`<span class="badge3" style="color: ${c.stroke ?? "#94a3b8"}">${c.badge}</span>` : ""}
                <span>${c.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const c = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!c || !Mc.has(c.kind)) return "";
      const h = (t.get(c.id) ?? 0) * m + 4;
      return [
        [v(c) + c.w / 2, d(c)],
        [v(c) - c.w / 2, d(c)],
        [v(c), d(c) + c.h / 2],
        [v(c), d(c) - c.h / 2]
      ].map(
        ([b, E]) => A`<div
                class="h3"
                data-source-id=${c.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${b}px; top: ${E}px; transform: translateZ(${h}px)"
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
      ${this._rubber ? A`<div
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
      ), h = this.getBoundingClientRect(), k = c == null ? void 0 : c.getBoundingClientRect(), b = k ? k.left + k.width / 2 - h.left : h.width / 2, E = k ? k.bottom - h.top + 6 : h.height / 2;
      return A`<input
              class="rename3"
              style="left: ${b}px; top: ${E}px"
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
Ee.styles = xt`
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
Le([
  se({ attribute: !1 })
], Ee.prototype, "scene", 2);
Le([
  se({ attribute: !1 })
], Ee.prototype, "selectedId", 2);
Le([
  se({ attribute: !1 })
], Ee.prototype, "connectable", 2);
Le([
  U()
], Ee.prototype, "_rx", 2);
Le([
  U()
], Ee.prototype, "_rz", 2);
Le([
  U()
], Ee.prototype, "_k", 2);
Le([
  U()
], Ee.prototype, "_pan", 2);
Le([
  U()
], Ee.prototype, "_liveMove", 2);
Le([
  U()
], Ee.prototype, "_connect", 2);
Le([
  U()
], Ee.prototype, "_hoverTargetId", 2);
Le([
  U()
], Ee.prototype, "_selected", 2);
Le([
  U()
], Ee.prototype, "_rubber", 2);
Le([
  U()
], Ee.prototype, "_renaming", 2);
Ee = Le([
  vt("modux-tilt")
], Ee);
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, be = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Tc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Pc(t, i, o), o;
};
const Co = [
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
let de = class extends Ge {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? A`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? A`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? A`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? A`<div class="control">••••••••</div>` : t === "email" ? A`<div class="control">nombre@dominio.com</div>` : t === "money" ? A`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? A`<div class="control">──────●──</div>` : t === "stars" ? A`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? A`<div class="control area">🖼</div>` : t === "link" ? A`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? A`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? A`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? A`<div class="control" style="justify-content:flex-end">0</div>` : A`<div class="control">Texto…</div>`;
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
      for (const r of o ?? [])
        r.id === e && (t = a), i(r.children, r);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const n = (r) => {
      r.id === e && (i = !0);
      for (const l of r.children ?? []) n(l);
    }, o = (r) => {
      for (const l of r ?? [])
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
    return de.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const r = (e.children ?? []).filter((s) => s.kind === "tab"), l = r.find((s) => s.id === this._activeTabs[e.id]) ?? r[0];
      l && (e = l);
    }
    if (t === "into" && !de.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var a, r;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const l = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!l) return;
      let s;
      try {
        s = JSON.parse(l);
      } catch {
        return;
      }
      if (!s.componentId || !s.pageId || s.pageId === ((r = this.page) == null ? void 0 : r.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: s.pageId, componentId: s.componentId, ...p });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var s, p, y;
    const t = e.children ?? [], i = (f) => f.map((m) => this.renderComponent(m)), n = A`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = A`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const f = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        o = A`<div class="row-lay">
          <div class="col-lay">${f.length ? i(f) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = A`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = A`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const f = t.filter((g) => g.kind === "tab"), m = f.find((g) => g.id === this._activeTabs[e.id]) ?? f[0];
        o = A`
          <div class="tabbar">
            ${f.map(
          (g, v) => A`<span
                class=${g === m ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(d) => {
            d.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: g.id }, this.emitEvent("component-selected", { componentId: g.id });
          }}
                @dblclick=${(d) => {
            d.stopPropagation(), this._cmp = { ...g };
          }}
                @dragstart=${(d) => {
            var c, h;
            d.stopPropagation(), this._dragCmpId = g.id, (h = d.dataTransfer) == null || h.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (c = this.page) == null ? void 0 : c.id, componentId: g.id })
            );
          }}
                @dragover=${(d) => {
            var c;
            ((c = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : c.kind) === "tab" && (d.preventDefault(), d.stopPropagation());
          }}
                @drop=${(d) => {
            var E, L;
            const c = this._dragCmpId;
            if (!c || c === g.id || ((E = this.nodeById(c)) == null ? void 0 : E.kind) !== "tab") return;
            d.preventDefault(), d.stopPropagation();
            const h = d.currentTarget.getBoundingClientRect(), b = d.clientX - h.left < h.width / 2 ? g.id : ((L = f[v + 1]) == null ? void 0 : L.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, b !== c && this.emitEvent("component-moved", {
              componentId: c,
              toParentId: e.id,
              beforeComponentId: b
            });
          }}
                >${g.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${m ? this.renderComponent(m) : n}`;
        break;
      }
      case "tab":
        o = A`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        o = A`<div class="col-lay">
          ${t.length ? t.map(
          (f, m) => A`
                  <div class="acc-bar"><span>${f.title ?? f.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(f) : ae}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        o = A`<div class="card-box">
          ${e.title ? A`<div class="card-title">${e.title}</div>` : ae}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        o = A`<div class="grid3-lay">
          ${t.length ? t.map((f) => A`<div class="board-col">${this.renderComponent(f)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [f, ...m] = t;
        o = A`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${f ? this.renderComponent(f) : A`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : A`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = A`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        o = A`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = A`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const m = e.modelId && e.modelId === ((s = this.page) == null ? void 0 : s.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = m.length ? A`<div class="grid-lay">
              ${m.slice(0, 6).map(
          (g) => A`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${g.label ?? g.name}</label>${this.control(g)}</div>`
        )}
            </div>` : A`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const f = (((y = this.page) == null ? void 0 : y.viewmodelFields) ?? []).slice(0, 4);
        o = A`<table>
            <tr>${f.length ? f.map((m) => A`<th>${m.label ?? m.name}</th>`) : A`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => A`<tr>${(f.length ? f : [1, 2, 3]).map(() => A`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? ae : A`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = A`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const f = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = A`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(f)}`;
        break;
      }
      case "text":
        o = A`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = A`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = A`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = A`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const a = de.LEAF_KINDS.has(e.kind), r = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), l = (f) => {
      var m, g;
      f.stopPropagation(), this._dragCmpId = e.id, (g = f.dataTransfer) == null || g.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), f.dataTransfer && (f.dataTransfer.effectAllowed = "move");
    };
    return A`<div
      class="cmp ${a ? "leafcmp" : ""} ${r ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(f) => {
      f.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(f) => {
      f.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${l}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(f) => {
      var g;
      f.preventDefault(), f.stopPropagation();
      const m = ((g = f.dataTransfer) == null ? void 0 : g.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, f) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(f) => {
      var m, g, v;
      this._foreignOver = !1, !(!this._dragCmpId && !((v = (g = (m = f.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : g.includes) != null && v.call(g, "application/x-modux-cmp"))) && (f.preventDefault(), f.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, f));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${l}
        >${de.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return A`
        ${i ? A`<table>
              <tr>${t.slice(0, 4).map((n) => A`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => A`<tr>${t.slice(0, 4).map(() => A`<td>···</td>`)}</tr>`)}
            </table>` : ae}
        ${t.length ? A`<div class="grid">
              ${t.map(
      (n) => A`
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
            </div>` : A`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, a, r, l;
    const e = this._cmp;
    if (!e) return ae;
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
    return A`<div class="pop" @click=${(s) => s.stopPropagation()}>
      ${n ? A`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(s) => t({ title: s.target.value })} />` : ae}
      ${i === "text" ? A`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(s) => t({ text: s.target.value })} />` : ae}
      ${i === "button" || i === "field" ? A`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(s) => t({ label: s.target.value })} />` : ae}
      ${i === "button" ? A`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? A`<span class="chip">${((o = this.useCases.find((s) => s.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : A`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? A`<span class="chip"
                      >${((a = this.mappings.find((s) => s.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : A`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : ae}
      ${i === "form" ? A`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? A`<span class="chip"
                      >${((r = this.models.find((s) => s.id === e.modelId)) == null ? void 0 : r.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : A`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : ae}
      ${i === "listing" ? A`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? A`<span class="chip"
                      >${((l = this.queryOps.find((s) => s.id === e.queryOperationId)) == null ? void 0 : l.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : A`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : ae}
      ${i === "field" ? A`<label>Estereotipo</label>
            <select @change=${(s) => t({ stereotype: s.target.value || void 0 })}>
              ${Co.map((s) => A`<option value=${s} ?selected=${s === (e.stereotype ?? "regular")}>${s}</option>`)}
            </select>` : ae}
      ${i === "tabLayout" ? A`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : ae}
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
    return A`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? A`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : A`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? A`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : A`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => A`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? ae : A`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? A`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : A`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${n ? A`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const r = (e.wizardSteps ?? []).map((s, p) => s.id ?? s.pageId ?? String(p)), l = r[a];
      return A`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(s) => {
        s.stopPropagation(), this._dragWizKey = l;
      }}
                      @dragover=${(s) => {
        this._dragWizKey && (s.preventDefault(), s.stopPropagation());
      }}
                      @drop=${(s) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === l) return;
        s.preventDefault(), s.stopPropagation();
        const y = s.currentTarget.getBoundingClientRect(), m = s.clientX - y.left < y.width / 2 ? l : r[a + 1] ?? null;
        m !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: m });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : A`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : ae}
        ${(e.content ?? []).length ? A`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => A`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? ae : A`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, r, l;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((s) => s.useCaseId === this._btn.useCaseId);
      return A`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((r = this.useCases.find((s) => s.id === this._btn.useCaseId)) == null ? void 0 : r.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(s) => this._btn = { ...this._btn, label: s.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? A`<span class="chip"
                        >${((l = this.mappings.find((s) => s.id === this._btn.mappingId)) == null ? void 0 : l.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : A`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? A`<button
                      @click=${() => {
        const s = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: s });
      }}
                    >
                      Quitar
                    </button>` : ae}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : ae}
      ${this._editing ? A`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${Co.map(
      (o) => A`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
de.styles = xt`
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
de.KIND_LABELS = {
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
de.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
be([
  se({ attribute: !1 })
], de.prototype, "page", 2);
be([
  se({ type: Boolean, reflect: !0 })
], de.prototype, "framed", 2);
be([
  se({ attribute: !1 })
], de.prototype, "models", 2);
be([
  se({ attribute: !1 })
], de.prototype, "mappings", 2);
be([
  se({ attribute: !1 })
], de.prototype, "useCases", 2);
be([
  se({ attribute: !1 })
], de.prototype, "queryOps", 2);
be([
  se({ attribute: !1 })
], de.prototype, "selectedCmpId", 2);
be([
  U()
], de.prototype, "_editing", 2);
be([
  U()
], de.prototype, "_dragId", 2);
be([
  U()
], de.prototype, "_overId", 2);
be([
  U()
], de.prototype, "_rename", 2);
be([
  U()
], de.prototype, "_route", 2);
be([
  U()
], de.prototype, "_btn", 2);
be([
  U()
], de.prototype, "_cmp", 2);
be([
  U()
], de.prototype, "_dragCmpId", 2);
be([
  U()
], de.prototype, "_dragWizKey", 2);
be([
  U()
], de.prototype, "_overCmpId", 2);
be([
  U()
], de.prototype, "_overCmpPos", 2);
be([
  U()
], de.prototype, "_foreignOver", 2);
be([
  U()
], de.prototype, "_activeTabs", 2);
de = be([
  vt("modux-page-designer")
], de);
var Oc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, De = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Nc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Oc(t, i, o), o;
};
const ga = 460, Rc = 540, Lc = 660;
let Ae = class extends Ge {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId, r = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: r.w, h0: r.h }, e.preventDefault();
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
        const r = this.pages.findIndex((s) => s.id === a), l = this.posOf(a, r);
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
    var y, f, m, g, v, d;
    const i = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), n = (f = i == null ? void 0 : i.closest) == null ? void 0 : f.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), r = (m = a == null ? void 0 : a.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), l = (g = r == null ? void 0 : r.closest) == null ? void 0 : g.call(r, "[data-btn-uc]");
    if (l != null && l.dataset.btnUc) return `btn:${o}:${l.dataset.btnUc}`;
    const s = (v = r == null ? void 0 : r.closest) == null ? void 0 : v.call(r, "[data-bar]");
    if (s != null && s.dataset.bar) return `bar:${o}:${s.dataset.bar}`;
    const p = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, g, v, d;
    const i = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), n = (g = i == null ? void 0 : i.closest) == null ? void 0 : g.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), r = (v = a == null ? void 0 : a.shadowRoot) == null ? void 0 : v.elementFromPoint(e, t), l = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    if (!l) return { pageId: o, componentId: null, pos: "into" };
    const s = l.dataset.cmpKind ?? "", p = l.getBoundingClientRect(), y = (t - p.top) / Math.max(1, p.height), f = de.LEAF_KINDS.has(s) ? y < 0.5 ? "before" : "after" : y < 0.2 ? "before" : y > 0.8 ? "after" : "into";
    return { pageId: o, componentId: l.dataset.cmpId, pos: f };
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
    return A`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
      return A`
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
                @component-config-changed=${(r) => {
        r.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...r.detail });
      }}
                @component-removed=${(r) => {
        r.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...r.detail });
      }}
                @component-moved=${(r) => {
        r.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...r.detail });
      }}
                @component-selected=${(r) => {
        r.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...r.detail });
      }}
                @component-transferred=${(r) => {
        r.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...r.detail });
      }}
                @wizard-step-moved=${(r) => {
        r.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...r.detail });
      }}
                @page-renamed=${(r) => {
        r.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...r.detail });
      }}
                @page-type-changed=${(r) => {
        r.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...r.detail });
      }}
                @page-route-changed=${(r) => {
        r.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...r.detail });
      }}
                @page-model-changed=${(r) => {
        r.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...r.detail });
      }}
                @button-added=${(r) => this.emit("page-button-added", { pageId: e.id, ...r.detail })}
                @button-changed=${(r) => this.emit("page-button-changed", { pageId: e.id, ...r.detail })}
                @button-removed=${(r) => this.emit("page-button-removed", { pageId: e.id, ...r.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(r) => this.emit("page-field-config-changed", { pageId: e.id, ...r.detail })}
                @fields-reordered=${(r) => this.emit("page-fields-reordered", { pageId: e.id, ...r.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : A`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Ae.styles = xt`
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
De([
  se({ attribute: !1 })
], Ae.prototype, "pages", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "layout", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "sizes", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "selectedId", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "selectedIds", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "models", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "mappings", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "useCases", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "queryOps", 2);
De([
  se({ attribute: !1 })
], Ae.prototype, "selectedCmp", 2);
De([
  U()
], Ae.prototype, "_t", 2);
De([
  U()
], Ae.prototype, "_live", 2);
De([
  U()
], Ae.prototype, "_liveSize", 2);
Ae = De([
  vt("modux-figma")
], Ae);
var Dc = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, Pe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? zc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Dc(t, i, o), o;
};
const Uc = {
  root: "#334155",
  boundedContext: "#0369a1",
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
  boundedContext: "Bounded context",
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
  boundedContext: "bounded contexts",
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
}, So = [30, 20, 13, 9.5, 7.5], Eo = [0, 180, 118, 80, 58], Bc = 0.055, Fc = 0.86, Wc = 2600, _i = 240, Ao = 0.16, Mo = 0.015;
let ge = class extends Ge {
  constructor() {
    super(...arguments), this.shifted = !1, this.scene = null, this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this._motion = 1, this._threads = !1, this._viewNaming = !1, this._viewName = "", this._space = !1, this.selected = /* @__PURE__ */ new Set(), this._levels = 1, this.manualLevels = /* @__PURE__ */ new Map(), this.sceneKey = "", this.renaming = null, this.onSpaceKey = (e) => {
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
      sessionStorage.setItem(ge.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(ge.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam), this.manualLevels = new Map(Object.entries(t.levels ?? {}));
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
    for (const f of e)
      t = Math.min(t, f.x), i = Math.min(i, f.y), n = Math.max(n, f.x), o = Math.max(o, f.y);
    const a = 70, r = this.clientWidth || 800, l = this.clientHeight || 600, s = n - t + a * 2, p = o - i + a * 2, y = Math.min(1.5, Math.max(0.25, Math.min(r / s, l / p)));
    this.cam.k = y, this.cam.x = r / 2 - (t + n) / 2 * y, this.cam.y = l / 2 - (i + o) / 2 * y;
  }
  /** Tree depth the scene reaches (root = 0, top nodes = 1, their children = 2…). */
  sceneDepth() {
    var i;
    if (!this.scene) return 1;
    const e = new Map(this.scene.nodes.map((n) => [n.id, n]));
    let t = 1;
    for (const n of this.scene.nodes) {
      let o = 1;
      for (let a = n.parentId; a; a = (i = e.get(a)) == null ? void 0 : i.parentId) o++;
      t = Math.max(t, o);
    }
    return t;
  }
  updated(e) {
    var t;
    (e.has("model") || e.has("scene")) && this.buildTree(), e.has("sceneKey") && e.get("sceneKey") !== void 0 && this.applyLevels(this.manualLevels.get(this.sceneKey) ?? this.sceneDepth()), e.has("renaming") && this.renaming && ((t = this.renderRoot.querySelector(".rename")) == null || t.select());
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
    for (const i of e.boundedContexts) t(i.id, i.identityProviderId);
    for (const i of e.etlFlows ?? []) t(i.id, i.identityProviderId);
    for (const i of e.identityProviders ?? []) t(i.id, i.publishedByExternalSystemId);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, i, n, o) {
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, r = this.prevByKey.get(a), l = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: Uc[e] ?? "#64748b",
      depth: n,
      parent: o,
      expanded: (r == null ? void 0 : r.expanded) ?? !1,
      x: (r == null ? void 0 : r.x) ?? (o ? o.x + l() : 0),
      y: (r == null ? void 0 : r.y) ?? (o ? o.y + l() : 0),
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
    const t = this.model, i = e.depth + 1, n = (o, a, r) => this.makeNode(o, a, r, i, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => e.kind === "root" ? !o.parentId : o.parentId === e.refId).map((o) => {
        const a = n(o.kind || "node", o.id, o.label);
        return o.stroke && (a.color = o.stroke), a;
      });
    switch (e.kind) {
      case "root":
        return [
          ...t.boundedContexts.map((o) => n("boundedContext", o.id, o.name)),
          ...t.externalSystems.map((o) => n("external-system", o.id, o.name)),
          ...(t.uiApps ?? []).map((o) => n("ui-app", o.id, o.name)),
          ...(t.actors ?? []).map((o) => n("actor", o.id, o.name)),
          ...(t.aiAgents ?? []).filter((o) => !o.external).map((o) => n("ai-agent", o.id, o.name)),
          ...(t.workflows ?? []).map((o) => n("workflow", o.id, o.name)),
          ...(t.identityProviders ?? []).map((o) => n("identity-provider", o.id, o.name))
        ];
      case "boundedContext": {
        const o = t.boundedContexts.find((p) => p.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((p) => p.boundedContextId === e.refId), r = o.useCases ?? [], l = new Set(a.map((p) => p.id)), s = new Set(
          (t.emissions ?? []).filter((p) => l.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...r.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${r.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !s.has(p.id)).map((p) => n("domain-event", p.id, p.name)),
          ...(o.applicationEvents ?? []).map((p) => n("application-event", p.id, p.name)),
          ...(o.readModels ?? []).map((p) => n("read-model", p.id, p.name)),
          ...(o.domainServices ?? []).map((p) => n("domain-service", p.id, p.name)),
          ...(o.queryServices ?? []).map((p) => n("query-service", p.id, p.name)),
          ...(o.scheduledTriggers ?? []).map((p) => n("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("document", p.id, p.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), r = e.refId.slice(o + 1), l = t.boundedContexts.find((s) => s.id === r);
        return l ? a === "aggregates" ? (t.aggregates ?? []).filter((s) => s.boundedContextId === r).map((s) => n("aggregate", s.id, s.name)) : (l.useCases ?? []).map((s) => n(s.policy ? "policy" : "use-case", s.id, s.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => n("entity", a.id, a.name)),
          ...t.boundedContexts.flatMap((a) => a.domainEvents ?? []).filter((a) => o.has(a.id)).map((a) => n("domain-event", a.id, a.name))
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
        const a = /* @__PURE__ */ new Set(), r = (l) => {
          for (const s of l ?? [])
            s.pageId && a.add(s.pageId), r(s.children);
        };
        r(o.menuItems);
        for (const l of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          l && a.add(l);
        return [...a].map((l) => (t.pages ?? []).find((s) => s.id === l)).filter((l) => !!l).map((l) => n("page", l.id, l.name));
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
  /** The slider touched by hand: remember the choice for THIS scene only. */
  applyLevelsManually(e) {
    this.sceneKey && this.manualLevels.set(this.sceneKey, e), this.applyLevels(e);
  }
  applyLevels(e) {
    this._levels = e, this.focusKeys = void 0;
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
    const t = /* @__PURE__ */ new Set(), i = (r) => {
      for (let l = r; l; l = l.parent) t.add(l.key);
    }, n = (r) => {
      t.add(r.key);
      for (const l of r.children ?? []) n(l);
    };
    i(e), n(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const r of this.allNodes)
        r.refId && o.has(r.refId) && i(r);
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
    for (const r of e) {
      if (r.parent) {
        const l = (Eo[Math.min(r.depth, Eo.length - 1)] ?? 60) + Math.min(60, ((((a = r.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let s = r.x - r.parent.x, p = r.y - r.parent.y, y = Math.hypot(s, p);
        if (y < 0.01) {
          const v = Math.random() * Math.PI * 2;
          s = Math.cos(v) * 0.1, p = Math.sin(v) * 0.1, y = 0.1;
        }
        const f = Bc * (y - l), m = s / y * f, g = p / y * f;
        r.vx -= m, r.vy -= g, r.parent.vx += m * 0.4, r.parent.vy += g * 0.4;
      } else
        r.vx -= r.x * Mo, r.vy -= r.y * Mo;
      !this.reducedMotion && this._motion > 0 && (r.vx += Math.sin(t * r.f1 * Math.PI * 2 + r.p1) * Ao * this._motion, r.vy += Math.cos(t * r.f2 * Math.PI * 2 + r.p2) * Ao * this._motion);
    }
    for (let r = 0; r < e.length; r++) {
      const l = e[r];
      for (let s = r + 1; s < e.length; s++) {
        const p = e[s], y = p.x - l.x, f = p.y - l.y;
        if (Math.abs(y) > _i || Math.abs(f) > _i) continue;
        const m = y * y + f * f;
        if (m > _i * _i || m < 0.01) continue;
        const g = Math.sqrt(m), v = l.depth <= 1 && p.depth <= 1 ? 3 : 1, d = Wc * v / m, c = y / g * d, h = f / g * d;
        l.vx -= c, l.vy -= h, p.vx += c, p.vy += h;
      }
    }
    const i = this._motion, n = Fc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const r of e) {
      if (r === this.dragNode) {
        r.vx = 0, r.vy = 0;
        continue;
      }
      r.vx *= n, r.vy *= n;
      const l = Math.hypot(r.vx, r.vy);
      if (l > 14 && (r.vx = r.vx / l * 14, r.vy = r.vy / l * 14), o > 0 && l < o) {
        r.vx = 0, r.vy = 0;
        continue;
      }
      r.x += r.vx, r.y += r.vy;
      const s = r === this.hover ? 1.75 : 1;
      r.scale += (s - r.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (So[Math.min(e.depth, So.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, r;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const l of e)
      l.parent && (t.strokeStyle = l.color + "55", t.beginPath(), t.moveTo(l.parent.x, l.parent.y), t.lineTo(l.x, l.y), t.stroke());
    const o = (l) => `${l}px system-ui, sans-serif`;
    for (const l of e) {
      const s = this.radiusOf(l);
      t.beginPath(), t.arc(l.x, l.y, s, 0, Math.PI * 2), t.fillStyle = l.expanded ? l.color + "22" : "#ffffff", t.fill(), t.lineWidth = (l === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = l.color, t.stroke(), this.drawGlyph(t, l, s);
      const p = ((a = l.children) == null ? void 0 : a.length) ?? 0;
      if (!l.expanded && p > 0) {
        const f = Math.max(7, s * 0.42), m = l.x + s * 0.75, g = l.y + s * 0.75;
        t.beginPath(), t.arc(m, g, f, 0, Math.PI * 2), t.fillStyle = l.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(f * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), m, g + 0.5);
      }
      if (l.depth <= 1 || l === this.hover || this.cam.k > 0.65) {
        const f = l.label.length > 22 ? l.label.slice(0, 21) + "…" : l.label;
        t.font = l === this.hover ? `600 ${o(12)}` : o(l.depth <= 1 ? 12 : 10.5), t.fillStyle = l === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(f, l.x, l.y + s + 4);
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
        const l = this.found.node, s = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, s * 1.6), t.strokeStyle = l.color, t.lineWidth = 2.2 / this.cam.k;
        const p = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 9 + p, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 18 + p * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (this._threads)
      for (const l of e) this.drawThreads(t, l, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((r = this.hover.children) != null && r.length) && this.drawGhosts(t, this.hover), this.linking) {
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
        const r = (t.x + a.x) / 2, l = (t.y + a.y) / 2, s = a.x - t.x, p = a.y - t.y, y = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(r - p * y, l + s * y, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const r = this.radiusOf(t) + 24, l = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, s = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((p, y) => {
      const f = l - s / 2 + s * (y + 0.5) / n.length, m = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, g = t.x + Math.cos(f) * (r + m), v = t.y + Math.sin(f) * (r + m);
      e.beginPath(), e.arc(g, v, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = l + s / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(p) * r, t.y + Math.sin(p) * r);
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
      case "boundedContext":
        for (const [r, l] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + r * n + n * 0.3, a + l * n), e.arc(o + r * n, a + l * n, n * 0.3, 0, Math.PI * 2);
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
        for (let r = 0; r < 6; r++) {
          const l = r * Math.PI / 3;
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
        for (const r of [-0.7, 0.1])
          e.moveTo(o + r * n, a - n * 0.7), e.lineTo(o + (r + 0.6) * n, a), e.lineTo(o + r * n, a + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - n * 0.45, a - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(o - n * 0.1, a - n * 0.1), e.lineTo(o + n * 0.9, a + n * 0.9), e.moveTo(o + n * 0.45, a + n * 0.45), e.lineTo(o + n * 0.85, a + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, a - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(o - n * 0.8, a + n), e.quadraticCurveTo(o, a - n * 0.1, o + n * 0.8, a + n), e.stroke();
        break;
      case "ai-agent":
        for (let r = 0; r < 4; r++) {
          const l = r * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(l) * n, a + Math.sin(l) * n), e.moveTo(o, a), e.lineTo(o + Math.cos(l + Math.PI / 4) * n * 0.5, a + Math.sin(l + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - n * 0.45, a + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + n * 0.1, a - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + n * 0.55, a + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [r, l] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + r * n, a + l * n, n * 0.85, n * 0.85);
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
    const r = [];
    for (const [w, S] of a)
      if (r.push(`${S} ${S === 1 ? (ln[w] ?? w).toLowerCase() : qc[w] ?? w}`), r.length === 4) {
        const H = [...a.keys()].length - 4;
        H > 0 && (r[3] += ` (+${H} tipos más)`);
        break;
      }
    const l = o.slice(0, 6).map((w) => ({ label: w.label.length > 30 ? w.label.slice(0, 29) + "…" : w.label, color: w.color })), s = o.length - l.length, p = t.label, y = ln[t.kind] ?? t.kind, f = ((z = t.children) != null && z.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((W = t.children) != null && W.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const m = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const g = Math.max(
      e.measureText(y).width,
      ...r.map((w) => e.measureText(w).width),
      ...l.map((w) => e.measureText(w.label).width + 12),
      e.measureText(f).width
    ), v = Math.min(300, Math.max(m, g) + 24), d = l.length ? 8 + l.length * 15 + (s > 0 ? 15 : 0) : 0, c = 40 + r.length * 15 + d + (f ? 18 : 0), h = this.radiusOf(t) * this.cam.k, k = this.cam.x + t.x * this.cam.k, b = this.cam.y + t.y * this.cam.k;
    let E = k + h + 14;
    E + v > i - 8 && (E = k - h - 14 - v), E = Math.max(8, Math.min(E, i - v - 8));
    const L = Math.max(8, Math.min(b - 10, n - c - 8));
    e.translate(E, L), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, v, c, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(y, 12, 25), e.fillStyle = "#475569", r.forEach((w, S) => e.fillText(w, 12, 41 + S * 15));
    let R = 41 + r.length * 15 + (l.length ? 8 : 0);
    l.forEach((w) => {
      e.fillStyle = w.color, e.beginPath(), e.arc(15, R + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(w.label, 24, R), R += 15;
    }), s > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${s} más`, 24, R)), f && (e.fillStyle = "#94a3b8", e.fillText(f, 12, c - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = ge.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && ge.fold(i.label).includes(t)).slice(0, 8);
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
        const n = Math.min(i.ax, i.bx), o = Math.max(i.ax, i.bx), a = Math.min(i.ay, i.by), r = Math.max(i.ay, i.by), l = this.visible().filter((s) => s.kind !== "root" && s.kind !== "group" && s.refId).filter((s) => s.x >= n && s.x <= o && s.y >= a && s.y <= r).map((s) => s.key);
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
      o.forEach((a, r) => {
        this.materialize(a.parent);
        const l = i - n / 2 + n * (r + 0.5) / o.length;
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * o)), r = a / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * r, this.cam.y = n - (n - this.cam.y) * r, this.cam.k = a;
  }
  render() {
    return A`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? A`<input
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
        ${this._sugs.length ? A`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => A`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (ln[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? A`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
      </div>
      <div class="controls" @pointerdown=${(e) => e.stopPropagation()}>
        <span>Niveles</span>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          .value=${String(this._levels)}
          title="Cuántos niveles se ven abiertos"
          @input=${(e) => this.applyLevelsManually(Number(e.target.value))}
        />
        <button title="Plegarlo todo y volver a empezar" @click=${() => this.applyLevelsManually(0)}>
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
        ${this._viewNaming ? A`
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
            ` : A`<button
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
ge.styles = xt`
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
ge.STORE_KEY = "modux-explorer-state";
Pe([
  se({ type: Boolean, reflect: !0 })
], ge.prototype, "shifted", 2);
Pe([
  se({ attribute: !1 })
], ge.prototype, "scene", 2);
Pe([
  se({ attribute: !1 })
], ge.prototype, "model", 2);
Pe([
  U()
], ge.prototype, "_q", 2);
Pe([
  U()
], ge.prototype, "_sugs", 2);
Pe([
  U()
], ge.prototype, "_active", 2);
Pe([
  U()
], ge.prototype, "_motion", 2);
Pe([
  U()
], ge.prototype, "_threads", 2);
Pe([
  U()
], ge.prototype, "_viewNaming", 2);
Pe([
  U()
], ge.prototype, "_viewName", 2);
Pe([
  U()
], ge.prototype, "selected", 2);
Pe([
  U()
], ge.prototype, "_levels", 2);
Pe([
  se()
], ge.prototype, "sceneKey", 2);
Pe([
  U()
], ge.prototype, "renaming", 2);
ge = Pe([
  vt("modux-explorer")
], ge);
function Vc(e, t) {
  var i, n, o, a, r, l, s, p, y, f, m, g, v;
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
    case "add-module":
      return [{ kind: "remove-module", id: t.id }];
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
      const d = (e.model.models ?? []).find((h) => h.id === t.id);
      if (!d) return null;
      const c = [{ kind: "add-model", id: d.id, name: d.name }];
      for (const h of e.model.pages ?? []) {
        h.modelId === t.id && c.push({ kind: "set-page-model", pageId: h.id, modelId: t.id });
        const k = (b) => {
          for (const E of b ?? [])
            E.modelId === t.id && c.push({ kind: "set-page-component", pageId: h.id, componentId: E.id, modelId: t.id }), k(E.children);
        };
        k(h.content);
      }
      for (const h of e.model.uiApps ?? [])
        h.modelId === t.id && c.push({ kind: "set-app-model", appId: h.id, modelId: t.id });
      return c;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const d = (e.model.pages ?? []).find((h) => h.id === t.pageId), c = t.kind === "set-crud-detail";
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
      const d = (((n = (e.model.pages ?? []).find((h) => h.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((h) => h.id ?? h.pageId), c = d.indexOf(t.targetId);
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
      const h = (k, b) => {
        for (const E of k ?? [])
          c.push({
            kind: "add-menu-item",
            appId: d.id,
            label: E.label,
            itemId: E.id,
            parentId: b == null ? void 0 : b.id,
            parentLabel: b && !b.id ? b.label : void 0,
            pageId: E.pageId ?? null
          }), E.uiAdapterId && c.push({ kind: "set-menu-app", appId: d.id, toAppId: E.uiAdapterId, itemId: E.id, label: E.label }), E.useCaseId && c.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: E.useCaseId, itemId: E.id, label: E.label }), E.aggregateId && c.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: E.aggregateId, itemId: E.id, label: E.label }), E.queryOperationId && c.push({
            kind: "set-menu-query-operation",
            appId: d.id,
            queryServiceId: E.queryServiceId ?? null,
            queryOperationId: E.queryOperationId,
            itemId: E.id,
            label: E.label
          }), h(E.children, E);
      };
      h(d.menuItems);
      for (const k of e.model.actorAppUses ?? [])
        k.appId === t.id && c.push({ kind: "add-actor-app", actorId: k.actorId, appId: t.id });
      return c;
    }
    case "delete-ui-page": {
      const d = (e.model.pages ?? []).find((h) => h.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
      ];
      d.route && c.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && c.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && c.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
      for (const h of d.buttons ?? [])
        h.useCaseId && (c.push({ kind: "add-page-button", pageId: d.id, useCaseId: h.useCaseId, label: h.label }), h.mappingId && c.push({
          kind: "set-page-button",
          pageId: d.id,
          useCaseId: h.useCaseId,
          label: h.label ?? null,
          mappingId: h.mappingId
        }));
      for (const h of d.viewmodelFields ?? [])
        (h.stereotype || h.colspan || h.label) && c.push({
          kind: "set-page-field-config",
          pageId: d.id,
          fieldId: h.fieldId,
          stereotype: h.stereotype ?? null,
          colspan: h.colspan ?? null,
          label: h.label ?? null
        });
      (d.viewmodelFields ?? []).length && c.push({
        kind: "set-page-field-order",
        pageId: d.id,
        fieldIds: (d.viewmodelFields ?? []).map((h) => h.fieldId)
      });
      for (const h of d.content ?? [])
        c.push(...e.rebuildComponentOps(d.id, h, void 0, null).ops);
      for (const h of d.wizardSteps ?? [])
        c.push({
          kind: "add-page-wizard-step",
          pageId: d.id,
          targetId: h.pageId ?? null,
          label: h.label,
          itemId: h.id
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
          const E = c(b.children);
          if (E) return E;
        }
        return null;
      }, h = t.itemId || t.label ? c(d == null ? void 0 : d.menuItems) : null;
      return h ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: h.label,
        pageId: h.pageId ?? null,
        itemId: h.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: h.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: h.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: h.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: h.queryServiceId ?? null,
        queryOperationId: h.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: h.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const d = (e.model.pages ?? []).find((h) => h.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((h) => h.useCaseId === t.useCaseId);
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
      const d = (e.model.pages ?? []).find((h) => h.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((h) => h.useCaseId === t.useCaseId);
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
      let c = null, h = null, k = null;
      const b = (L, R) => {
        var W;
        const z = L ?? [];
        for (let w = 0; w < z.length; w++)
          z[w].id === t.componentId && (c = z[w], h = R, k = ((W = z[w + 1]) == null ? void 0 : W.id) ?? null), b(z[w].children, z[w]);
      };
      if (b(d == null ? void 0 : d.content, null), !c) return null;
      const E = c;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: E.title ?? null,
        text: E.text ?? null,
        label: E.label ?? null,
        useCaseId: E.useCaseId ?? null,
        mappingId: E.mappingId ?? null,
        modelId: E.modelId ?? null,
        queryServiceId: E.queryServiceId ?? null,
        queryOperationId: E.queryOperationId ?? null,
        fieldId: E.fieldId ?? null,
        stereotype: E.stereotype ?? null,
        colspan: E.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: h === null ? null : h.id,
        beforeComponentId: k
      }] : e.rebuildComponentOps(
        t.pageId,
        E,
        h === null ? void 0 : h.id,
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
      const d = (((r = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : r.viewmodelFields) ?? []).map((c) => c.fieldId);
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
    case "add-boundedContext":
      return [{ kind: "remove-boundedContext", id: t.id }];
    case "remove-boundedContext": {
      const d = e.model.boundedContexts.find((h) => h.id === t.id);
      if (!d) return null;
      const c = e.model.relations.filter(
        (h) => (h.sourceId === t.id || h.targetId === t.id) && h.type != null
      );
      return [
        { kind: "add-boundedContext", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...c.map(
          (h) => ({
            kind: "set-relation-type",
            sourceId: h.sourceId,
            targetId: h.targetId,
            type: h.type
          })
        )
      ];
    }
    case "add-aggregate":
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const d = (e.model.aggregates ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, boundedContextId: d.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const d of e.model.boundedContexts) {
        const c = (d.queryServices ?? []).find((h) => h.id === t.id);
        if (c) return [{ kind: "add-query-service", id: c.id, name: c.name, boundedContextId: d.id }];
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
        boundedContextId: d.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const d = (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-proxy-target", id: t.id, targetId: d.targetApiId ?? "" }] : null;
    }
    case "add-api-implementation":
      return [{ kind: "remove-api-implementation", apiId: t.apiId, boundedContextId: t.boundedContextId }];
    case "remove-api-implementation":
      return [{ kind: "add-api-implementation", apiId: t.apiId, boundedContextId: t.boundedContextId }];
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
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.boundedContextId === t.boundedContextId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: d.useCaseId
      }] : [{
        kind: "remove-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId
      }];
    }
    case "remove-api-operation-implementation": {
      const d = (e.model.apiOperationImplementations ?? []).find(
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.boundedContextId === t.boundedContextId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
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
      for (const d of e.model.boundedContexts) {
        const c = (d.useCases ?? []).find((h) => h.id === t.id);
        if (c)
          return [
            { kind: "add-use-case", id: c.id, name: c.name, boundedContextId: d.id, policy: c.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const d of e.model.externalSystems) {
        const c = (d.useCases ?? []).find((h) => h.id === t.id);
        if (c)
          return [{ kind: "add-external-use-case", id: c.id, name: c.name, boundedContextId: d.id }];
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
      const d = (e.model.notifications ?? []).find((h) => h.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const c = [
        { kind: "add-notification", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: (d.channels ?? [])[0] }
      ];
      d.eventId && c.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
      for (const h of d.recipientRoleIds ?? []) c.push({ kind: "add-notification-recipient", id: d.id, roleId: h });
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
      const d = (e.model.documents ?? []).find((h) => h.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const c = [
        { kind: "add-document", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: d.kind }
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
      const d = (e.model.identityProviders ?? []).find((h) => h.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
      ];
      d.publishedByExternalSystemId && c.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
      for (const h of e.model.boundedContexts)
        h.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      for (const h of e.model.uiApps ?? [])
        h.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      for (const h of e.model.etlFlows ?? [])
        h.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      return c;
    }
    case "set-idp-publisher": {
      const d = (e.model.identityProviders ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const d = ((l = e.model.boundedContexts.find((c) => c.id === t.id)) == null ? void 0 : l.identityProviderId) ?? ((s = (e.model.uiApps ?? []).find((c) => c.id === t.id)) == null ? void 0 : s.identityProviderId) ?? ((p = (e.model.etlFlows ?? []).find((c) => c.id === t.id)) == null ? void 0 : p.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: d }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const d = (e.model.etlFlows ?? []).find((c) => c.id === t.id);
      return !d || !d.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId },
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
      const d = (((y = (e.model.etlFlows ?? []).find((c) => c.id === t.etlFlowId)) == null ? void 0 : y.steps) ?? []).find((c) => c.id === t.id);
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
      const d = e.model.boundedContexts.find(
        (h) => (h.scheduledTriggers ?? []).some((k) => k.id === t.id)
      ), c = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((h) => h.id === t.id);
      return !d || !c ? null : [{
        kind: "add-scheduled-trigger",
        id: c.id,
        name: c.name,
        boundedContextId: d.id,
        cronExpression: c.cronExpression,
        targetUseCaseId: c.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const d = e.model.boundedContexts.flatMap((c) => c.scheduledTriggers ?? []).find((c) => c.id === t.id);
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
        const c = (d.mcpServers ?? []).find((h) => h.id === t.id);
        if (c)
          return [
            { kind: "add-mcp-server", id: c.id, name: c.name, boundedContextId: d.id, uri: c.uri },
            ...(e.model.agentMcpUses ?? []).filter((h) => h.mcpServerId === t.id).map(
              (h) => ({
                kind: "add-agent-mcp",
                sourceId: h.agentId,
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
      for (const d of e.model.boundedContexts) {
        const c = (d.applicationEvents ?? []).find((h) => h.id === t.id);
        if (c)
          return [{ kind: "add-application-event", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const d of e.model.boundedContexts) {
        const c = (d.domainServices ?? []).find((h) => h.id === t.id);
        if (c) return [{ kind: "add-domain-service", id: c.id, name: c.name, boundedContextId: d.id }];
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
          boundedContextId: d.boundedContextId
        }
      ] : null;
    }
    case "add-external-table":
      return [{ kind: "remove-external-table", id: t.id }];
    case "remove-external-table": {
      for (const d of e.model.externalSystems) {
        const c = (d.tables ?? []).find((h) => h.id === t.id);
        if (c) return [{ kind: "add-external-table", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const d = (m = (f = (e.model.rags ?? []).find((c) => c.id === t.sourceId)) == null ? void 0 : f.contentSources) == null ? void 0 : m.find((c) => c.uri === t.uri);
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
            boundedContextId: c.targetBoundedContextId,
            targetUseCaseId: c.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const d = (g = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : g.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-api-operation",
          apiId: t.apiId,
          id: d.id,
          name: d.name,
          httpMethod: d.httpMethod,
          path: d.path,
          boundedContextId: d.targetBoundedContextId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "set-api-operation-target": {
      const d = (v = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : v.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "set-api-operation-target",
          apiId: t.apiId,
          id: t.id,
          boundedContextId: d.targetBoundedContextId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "remove-read-model": {
      for (const d of e.model.boundedContexts) {
        const c = (d.readModels ?? []).find((h) => h.id === t.id);
        if (c != null && c.aggregateId)
          return [{ kind: "add-read-model", id: c.id, name: c.name, aggregateId: c.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const d of e.model.boundedContexts) {
        const c = (d.domainEvents ?? []).find((h) => h.id === t.id);
        if (c) return [{ kind: "add-domain-event", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "rename-element": {
      const c = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((h) => h.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((h) => h.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((h) => h.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((h) => h.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((h) => h.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((h) => h.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((h) => h.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((h) => h.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((h) => h.id === t.id);
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
      const h = d.steps[c];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: h.id,
          name: h.name,
          stepType: h.type,
          roleId: h.roleId,
          deadline: h.deadline,
          useCaseId: h.useCaseId,
          compensationUseCaseId: h.compensationUseCaseId,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const d = (e.model.processes ?? []).find((h) => h.id === t.processId), c = (d == null ? void 0 : d.steps.findIndex((h) => h.id === t.id)) ?? -1;
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
      const d = (e.model.processes ?? []).find((h) => h.id === t.processId), c = d == null ? void 0 : d.steps.find((h) => h.id === t.id);
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
          boundedContextId: d.ownerBoundedContextId ?? "",
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
      const h = d.steps[c];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: h.id,
          name: h.name,
          emittedEventName: h.emittedEventName,
          targetUseCaseId: h.targetUseCaseId,
          completionEventName: h.completionEventName,
          dependsOnStepIds: h.dependsOnStepIds,
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
      const d = (e.model.workflows ?? []).find((h) => h.id === t.workflowId), c = d == null ? void 0 : d.steps.find((h) => h.id === t.id);
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
function ya(e, t, i, n, o, a, r) {
  var I, P, _;
  if (t === "context-map" && e.detail === "distribution") {
    const x = e.sceneFor("context-map"), $ = e.model.modules ?? [], C = ((T) => {
      var N;
      for (let D = T; D; ) {
        if ($.some((q) => q.id === D)) return D;
        D = (N = x.nodes.find((q) => q.id === D)) == null ? void 0 : N.parentId;
      }
      return null;
    })(n);
    if (C && C !== i && (e.model.services ?? []).some((T) => T.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: C });
      return;
    }
    if ((e.model.services ?? []).some((T) => T.id === i)) {
      const T = e.model.boundedContexts.find((q) => q.id === n), N = T ? $.filter((q) => q.boundedContextId === T.id) : [], D = N.find((q) => q.main) ?? N[0];
      if (D) {
        e.command({ kind: "add-service-module", serviceId: i, id: D.id });
        return;
      }
    }
    if (C && C !== i && !$.some((N) => N.id === i) && !e.model.boundedContexts.some((N) => N.id === i)) {
      e.command({ kind: "add-module-element", id: C, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    ya(e, "context-map", i, n, o, a, r);
    return;
  }
  if (t === "eventstorming") {
    const x = (M) => (e.model.customCodes ?? []).some((C) => C.id === M), $ = x(n) ? { stepId: i, ccId: n } : x(i) ? { stepId: n, ccId: i } : null;
    if ($) {
      const M = e.owningUseCaseOf($.stepId);
      M && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: M.id,
        id: $.stepId,
        targetId: $.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const x = (q) => (e.model.actors ?? []).some((G) => G.id === q);
    if (x(i) !== x(n)) {
      const q = x(i) ? i : n, G = x(i) ? n : i, re = e.owningWorkflowOf(G);
      if (re) {
        e.command({ kind: "set-workflow-step-role", workflowId: re.id, id: G, targetId: q });
        return;
      }
    }
    const $ = (q) => (e.model.pages ?? []).some((G) => G.id === q);
    if ($(i) !== $(n)) {
      const q = $(i) ? i : n, G = $(i) ? n : i, re = e.owningWorkflowOf(G);
      if (re) {
        e.command({ kind: "set-workflow-step-form", workflowId: re.id, id: G, targetId: q });
        return;
      }
    }
    const M = e.model.workflowGateways ?? [], C = (q) => M.some((G) => G.id === q);
    if (C(i) || C(n) || (e.model.workflows ?? []).some((q) => q.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const T = e.owningWorkflowOf(i), N = e.owningWorkflowOf(n);
    if (!T || T !== N || i === n) return;
    const D = T.steps.find((q) => q.id === n);
    if (((D == null ? void 0 : D.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: T.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const x = e.model.pages ?? [], $ = e.model.uiApps ?? [], M = (V) => $.some((J) => J.id === V), C = (V) => x.some((J) => J.id === V), T = (V) => (e.model.customCodes ?? []).some((J) => J.id === V);
    if (T(i) || T(n)) {
      const V = T(i) ? i : n, J = T(i) ? n : i;
      if (T(J)) return;
      if (C(J)) {
        e.command({ kind: "set-page-custom-code", id: J, targetId: V });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: V, elementId: J });
      return;
    }
    const N = e.model.buttonGroups ?? [], D = (V) => N.some((J) => J.id === V);
    if ((r === "toolbar" || r === "bottom") && D(i) && C(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: r });
      return;
    }
    if (D(i) && D(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const q = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (q) {
      e.model.boundedContexts.some((J) => (J.useCases ?? []).some((Ce) => Ce.id === n)) ? e.command({ kind: "set-group-button-target", id: q[1], itemId: q[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (r === "home" && M(i) && (C(n) || M(n))) {
      if (n === i) return;
      e.command(
        C(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (r === "header" && M(i) && C(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((r === "crud-detail" || r === "crud-create") && C(i) && (C(n) || M(n)) && n !== i) {
      const V = r === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        C(n) ? { kind: V, pageId: i, targetId: n, toAppId: null } : { kind: V, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (r === "viewmodel" && C(i)) {
      (e.model.models ?? []).some((V) => V.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((r === "view" || r === "edit") && M(i) && C(n)) {
      e.command({
        kind: r === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (r) return;
    const G = (V) => /^wizrow:([^:]+):(.+)$/.exec(V), re = G(i) ?? G(n);
    if (re) {
      const V = G(i) ? n : i;
      C(V) && V !== re[1] && e.command({ kind: "set-wizard-step-page", pageId: re[1], itemId: re[2], targetId: V });
      return;
    }
    const le = x.find((V) => V.id === n && V.type === "WIZARD");
    if (C(i) && le && i !== le.id) {
      (le.wizardSteps ?? []).some((V) => V.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: le.id, targetId: i });
      return;
    }
    if (C(i) && M(n)) {
      const V = x.find((Ce) => Ce.id === i), J = $.find((Ce) => Ce.id === n);
      if (J.type === "MASTER_DETAIL" && !J.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: n, pageId: i }), e.emit("modux-notice", {
          message: `${V.name} es la cabecera de ${J.name} — las siguientes páginas serán pestañas`
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
    const F = e.model.identityProviders ?? [], K = (V) => F.some((J) => J.id === V);
    if (K(i) || K(n)) {
      const V = K(i) ? i : n, J = K(i) ? n : i;
      M(J) ? e.command({ kind: "set-identity-provider", id: J, targetId: V }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const pe = (V) => (e.model.models ?? []).some((J) => J.id === V);
    if (pe(i) || pe(n)) {
      const V = pe(i) ? i : n, J = pe(i) ? n : i;
      if (C(J)) {
        e.command({ kind: "set-page-model", pageId: J, modelId: V });
        return;
      }
      if (M(J)) {
        e.command({ kind: "set-app-model", appId: J, modelId: V });
        return;
      }
      return;
    }
    const ye = ke(i);
    if (ye != null && ye.itemId && ((I = ke(n)) != null && I.itemId || M(n))) {
      const V = ke(n), J = e.menuEntryIn(ye.appId, ye.itemId);
      if (!J) return;
      if (V != null && V.itemId) {
        const Ce = e.menuEntryIn(V.appId, V.itemId);
        if (!Ce) return;
        const Te = (wt) => (wt ?? []).some((di) => di.id === V.itemId || Te(di.children));
        if (ye.appId === V.appId && (V.itemId === ye.itemId || Te(J.entry.children)))
          return;
        const Ue = e.nodeClientRect(n), Oe = Ue && a !== void 0 ? (a - Ue.top) / Math.max(1, Ue.height) : 0.5, tt = Oe < 0.3 ? "before" : Oe > 0.7 ? "after" : "nest";
        if (tt === "nest")
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: V.appId,
            itemId: ye.itemId,
            parentId: V.itemId
          });
        else {
          const wt = tt === "before" ? V.itemId : Ce.beforeId ?? void 0;
          if (ye.appId === V.appId && Ce.parentId === J.parentId && wt === ye.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: V.appId,
            itemId: ye.itemId,
            parentId: Ce.parentId ?? void 0,
            beforeItemId: wt
          });
        }
        return;
      }
      if (ye.appId === n && !J.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: ye.appId,
        toAppId: n,
        itemId: ye.itemId
      });
      return;
    }
    const Be = ke(i) ?? ke(n);
    if (Be) {
      const V = ke(i) ? i : n, J = ke(i) ? n : i;
      if (((P = e.sceneFor("ui").nodes.find((Oe) => Oe.id === V)) == null ? void 0 : P.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const Ce = e.model.boundedContexts.some(
        (Oe) => (Oe.useCases ?? []).some((tt) => tt.id === J)
      ), Te = (e.model.aggregates ?? []).some((Oe) => Oe.id === J), Ue = e.model.boundedContexts.flatMap((Oe) => Oe.queryServices ?? []).find((Oe) => (Oe.operations ?? []).some((tt) => tt.id === J));
      C(J) ? e.command({ kind: "set-menu-page", pageId: J, ...Be }) : M(J) && J !== Be.appId ? e.command({ kind: "set-menu-app", toAppId: J, ...Be }) : Ce ? e.command({ kind: "set-menu-use-case", useCaseId: J, ...Be }) : Te ? e.command({ kind: "set-menu-aggregate", aggregateId: J, ...Be }) : Ue && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Ue.id,
        queryOperationId: J,
        ...Be
      });
      return;
    }
    if ((e.model.actors ?? []).some((V) => V.id === i) && M(n)) {
      (e.model.actorAppUses ?? []).some((V) => V.actorId === i && V.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const $e = C(i) ? { pageId: i, other: n } : C(n) ? { pageId: n, other: i } : null;
    if ($e) {
      const V = new Set(
        e.model.boundedContexts.flatMap((Te) => (Te.useCases ?? []).map((Ue) => Ue.id))
      ), J = new Set(
        e.model.boundedContexts.flatMap((Te) => (Te.queryServices ?? []).map((Ue) => Ue.id))
      ), Ce = x.find((Te) => Te.id === $e.pageId);
      V.has($e.other) ? (Ce.buttons ?? []).some((Te) => Te.useCaseId === $e.other) || e.command({ kind: "add-page-button", pageId: $e.pageId, useCaseId: $e.other }) : J.has($e.other) && e.command({ kind: "set-page-listing", pageId: $e.pageId, queryServiceId: $e.other });
    }
    return;
  }
  if (t === "mappings") {
    const x = e.model.models ?? [], $ = xn(i), M = xn(n), C = e.model.transformations ?? [], T = e.model.customCodes ?? [], N = (F) => T.some((K) => K.id === F);
    if (N(i) && C.some((F) => F.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (N(n) && C.some((F) => F.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (N(i)) {
      const F = (M == null ? void 0 : M.modelId) ?? (x.some((K) => K.id === n) ? n : null);
      if (F) {
        const K = (e.model.modelMappings ?? []).filter(
          (pe) => pe.sourceModelId === F || pe.targetModelId === F
        );
        K.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: K[0].id, targetId: i }) : e.emit("modux-notice", {
          message: K.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (C.some((F) => F.id === n)) {
      if (M || C.some((K) => K.id === i)) return;
      const F = $ ? { modelId: $.modelId, fieldId: $.fieldId } : x.some((K) => K.id === i) ? { modelId: i } : null;
      F && e.command({ kind: "add-transformation-input", id: n, ...F });
      return;
    }
    if (C.some((F) => F.id === i)) {
      const F = M ? { modelId: M.modelId, fieldId: M.fieldId } : x.some((K) => K.id === n) ? { modelId: n } : null;
      F && e.command({ kind: "set-transformation-output", id: i, ...F });
      return;
    }
    if ($ && M) {
      if ($.modelId === M.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let F = (e.model.modelMappings ?? []).find(
        (K) => K.sourceModelId === $.modelId && K.targetModelId === M.modelId
      );
      if (!F) {
        const K = x.find((V) => V.id === $.modelId), pe = x.find((V) => V.id === M.modelId);
        if (!K || !pe) return;
        const ye = (V) => V.replace(/[^a-zA-Z0-9]/g, ""), Be = new Set((e.model.modelMappings ?? []).map((V) => V.id));
        let $e = `mapping-${oe(K.name)}-${oe(pe.name)}`;
        for (let V = 2; Be.has($e); V++) $e = `mapping-${oe(K.name)}-${oe(pe.name)}-${V}`;
        e.command(
          { kind: "add-model-mapping", id: $e, name: `${ye(K.name)}2${ye(pe.name)}`, sourceId: K.id, targetId: pe.id },
          !1
        ), F = { id: $e, name: "", sourceModelId: K.id, targetModelId: pe.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: F.id,
        sourceId: $.fieldId,
        targetId: M.fieldId
      });
      return;
    }
    if ($ && x.some((F) => F.id === n) && n !== $.modelId) {
      e.command({ kind: "move-model-field", modelId: $.modelId, fieldId: $.fieldId, targetId: n });
      return;
    }
    if (!x.some((F) => F.id === i) || !x.some((F) => F.id === n) || i === n || (e.model.modelMappings ?? []).some((F) => F.sourceModelId === i && F.targetModelId === n))
      return;
    const D = x.find((F) => F.id === i), q = x.find((F) => F.id === n), G = (F) => F.replace(/[^a-zA-Z0-9]/g, ""), re = new Set((e.model.modelMappings ?? []).map((F) => F.id));
    let le = `mapping-${oe(D.name)}-${oe(q.name)}`;
    for (let F = 2; re.has(le); F++) le = `mapping-${oe(D.name)}-${oe(q.name)}-${F}`;
    e.command({
      kind: "add-model-mapping",
      id: le,
      name: `${G(D.name)}2${G(q.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t !== "context-map") return;
  const l = /^apiop:(.+)@(.+)$/.exec(i);
  if (l) {
    const [, x, $] = l, M = (e.model.proxyApis ?? []).find((q) => q.id === $), C = (M == null ? void 0 : M.targetApiId) ?? ((_ = (e.model.apiImplementations ?? []).find(
      (q) => q.boundedContextId === $ && (e.model.apis ?? []).some(
        (G) => G.id === q.apiId && G.operations.some((re) => re.id === x)
      )
    )) == null ? void 0 : _.apiId);
    if (!C) return;
    if (new Set(
      e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((G) => G.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: C,
        operationId: x,
        boundedContextId: $,
        targetUseCaseId: n
      });
      return;
    }
    if (!(M != null && M.targetApiId)) return;
    let N = null;
    if (n === M.targetApiId)
      N = M.targetApiId;
    else {
      const q = /^apiimpl:(.+)@(.+)$/.exec(n);
      q && q[1] === M.targetApiId ? N = q[2] : e.model.boundedContexts.some((G) => G.id === n) && (e.model.apiImplementations ?? []).some(
        (G) => G.apiId === M.targetApiId && G.boundedContextId === n
      ) && (N = n);
    }
    if (!N) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (q) => q.proxyId === M.id && q.operationId === x && q.targetSiteId === N
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: M.id,
      operationId: x,
      targetSiteId: N
    });
    return;
  }
  const s = new Set((e.model.aiAgents ?? []).map((x) => x.id));
  if (s.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (D) => D.agentId === i && D.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (D) => D.agentId === i && D.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.mcpServers ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (D) => D.agentId === i && D.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((N) => N.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (D) => D.agentId === i && D.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((N) => N.operations.map((D) => D.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (D) => D.agentId === i && D.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === n) || (e.model.proxyApis ?? []).some((N) => N.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (D) => D.agentId === i && D.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (D) => D.agentId === i && D.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (s.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (D) => D.agentId === i && D.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((N) => N.id === n) && ((e.model.agentRags ?? []).some(
      (D) => D.agentId === i && D.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((x) => x.id === i)) {
    const x = (e.model.mcpGateways ?? []).find((C) => C.id === i), $ = e.model.externalSystems.some((C) => (C.mcpServers ?? []).some((T) => T.id === n)) || (e.model.apis ?? []).some((C) => C.id === n) || (e.model.apis ?? []).some((C) => C.operations.some((T) => T.id === n)) || e.model.boundedContexts.some((C) => (C.useCases ?? []).some((T) => T.id === n)) || (e.model.rags ?? []).some((C) => C.id === n), M = [
      ...x.mcpServerIds ?? [],
      ...x.apiIds ?? [],
      ...x.apiOperationIds ?? [],
      ...x.useCaseIds ?? [],
      ...x.ragIds ?? []
    ].includes(n);
    $ && !M && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((x) => x.id === n)) return;
  const p = (e.model.rags ?? []).find((x) => x.id === i);
  if (p) {
    if (new Set(
      e.model.boundedContexts.flatMap((M) => (M.readModels ?? []).map((C) => C.id))
    ).has(n) && !(p.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((M) => (M.tables ?? []).map((C) => C.id))
    ).has(n) && !(p.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((M) => M.id === n) || (e.model.proxyApis ?? []).some((M) => M.id === n)) && !(p.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n) && !(p.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((M) => M.id === n) && !(p.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((x) => x.id === n)) return;
  if ((e.model.workflows ?? []).some((x) => x.id === i)) {
    const x = (e.model.workflows ?? []).find((C) => C.id === i), $ = (e.model.workflows ?? []).find(
      (C) => C.id === n && C.id !== i
    );
    if ($) {
      const C = x.onCompletionEventName || `${x.name.replace(/\s+/g, "")}Completado`;
      $.triggerEvent !== C && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: C });
      return;
    }
    const M = e.model.boundedContexts.flatMap((C) => C.useCases ?? []).find((C) => C.id === n);
    if (M && !(x.steps ?? []).some((T) => T.targetUseCaseId === n)) {
      const T = `wfs-${oe(M.name)}`;
      let N = T;
      for (let D = 2; (x.steps ?? []).some((q) => q.id === N); D++)
        N = `${T}-${D}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: i,
        id: N,
        name: M.name,
        targetUseCaseId: n
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((x) => x.id === n)) {
    const x = e.model.boundedContexts.flatMap((C) => C.domainEvents ?? []).find((C) => C.id === i), $ = e.model.boundedContexts.flatMap((C) => C.applicationEvents ?? []).find((C) => C.id === i), M = x ?? $;
    if (M) {
      const C = (e.model.emissions ?? []).find((q) => q.domainEventId === i), T = new Set((e.model.aggregates ?? []).map((q) => q.id)), N = new Set(
        e.model.boundedContexts.flatMap((q) => (q.domainServices ?? []).map((G) => G.id))
      ), D = new Set(
        e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((G) => G.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: M.name,
        triggerAggregateId: C && T.has(C.sourceId) ? C.sourceId : void 0,
        triggerDomainServiceId: C && N.has(C.sourceId) ? C.sourceId : void 0,
        triggerUseCaseId: C && D.has(C.sourceId) ? C.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((x) => x.id === i)) {
    const x = (e.model.proxyApis ?? []).find(($) => $.id === i);
    if ((e.model.apis ?? []).some(($) => $.id === n)) {
      x.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === n)) {
      if (!x.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (M) => M.apiId === x.targetApiId && M.boundedContextId === n
      ) || e.command({ kind: "add-api-implementation", apiId: x.targetApiId, boundedContextId: n });
      return;
    }
    e.model.externalSystems.some(($) => $.id === n) && x.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some((x) => x.id === i)) {
    if (e.model.externalSystems.some((x) => x.id === n)) {
      (e.model.apis ?? []).find(($) => $.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((x) => x.id === n) && ((e.model.apiImplementations ?? []).some(
      ($) => $.apiId === i && $.boundedContextId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, boundedContextId: n }));
    return;
  }
  const y = new Set((e.model.actors ?? []).map((x) => x.id));
  if (s.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap(($) => ($.domainEvents ?? []).map((M) => M.id)),
      ...e.model.boundedContexts.flatMap(($) => ($.applicationEvents ?? []).map((M) => M.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (M) => M.eventId === i && M.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!y.has(i)) return;
  }
  if (y.has(i)) {
    const x = new Set(
      e.model.boundedContexts.flatMap((M) => (M.useCases ?? []).map((C) => C.id))
    ), $ = new Set(
      e.model.boundedContexts.flatMap((M) => (M.queryServices ?? []).map((C) => C.id))
    );
    if (x.has(n) || $.has(n)) {
      (e.model.actorUses ?? []).some(
        (C) => C.actorId === i && C.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((M) => M.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (C) => C.actorId === i && C.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((M) => M.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (C) => C.actorId === i && C.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const f = e.owningApiOf(i);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap(($) => ($.useCases ?? []).map((M) => M.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        boundedContextId: n
      });
      return;
    }
    return;
  }
  const m = (x) => (e.model.notifications ?? []).find(($) => $.id === x);
  if (m(i) || m(n)) {
    const x = m(i) ?? m(n), $ = m(i) ? n : i;
    if (e.model.boundedContexts.some(
      (C) => [...C.domainEvents ?? [], ...C.applicationEvents ?? []].some((T) => T.id === $)
    )) {
      x.eventId !== $ && e.command({ kind: "set-notification-event", id: x.id, targetId: $ });
      return;
    }
    if ((e.model.actors ?? []).some((C) => C.id === $)) {
      (x.recipientRoleIds ?? []).includes($) || e.command({ kind: "add-notification-recipient", id: x.id, roleId: $ });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const g = (x) => (e.model.documents ?? []).find(($) => $.id === x);
  if (g(i) || g(n)) {
    const x = g(i) ?? g(n), $ = g(i) ? n : i;
    if ((e.model.models ?? []).find((N) => N.id === $)) {
      e.command({ kind: "set-document-model", id: x.id, modelId: $ });
      return;
    }
    const C = e.model.boundedContexts.flatMap((N) => N.queryServices ?? []).find((N) => N.id === $), T = e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).flatMap((D) => (D.operations ?? []).map((q) => ({ op: q, qs: D })))).find(({ op: N }) => N.id === $);
    if (C || T) {
      e.command({
        kind: "set-document-query",
        id: x.id,
        queryServiceId: (C == null ? void 0 : C.id) ?? T.qs.id,
        queryOperationId: (T == null ? void 0 : T.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const v = e.model.identityProviders ?? [], d = (x) => v.find(($) => $.id === x);
  if (d(i) || d(n)) {
    const x = d(i) ?? d(n), $ = d(i) ? n : i;
    if (d(i) && e.model.externalSystems.some((T) => T.id === $)) {
      x.publishedByExternalSystemId !== $ && e.command({ kind: "set-idp-publisher", id: x.id, targetId: $ });
      return;
    }
    const M = e.model.boundedContexts.some((T) => T.id === $), C = (e.model.etlFlows ?? []).some((T) => T.id === $);
    if (M || C) {
      e.command({ kind: "set-identity-provider", id: $, targetId: x.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const c = e.model.etlFlows ?? [], h = (x) => c.find(($) => $.id === x);
  if (h(i) || h(n)) {
    const x = h(i) ?? h(n), $ = h(i) ? n : i, M = !h(i), C = new Set(e.model.externalSystems.flatMap((K) => (K.tables ?? []).map((pe) => pe.id))), T = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((K) => K.id),
      ...(e.model.proxyApis ?? []).map((K) => K.id)
    ]), N = (e.model.apis ?? []).find((K) => K.operations.some((pe) => pe.id === $)), D = new Set(
      e.model.boundedContexts.flatMap((K) => [
        ...(K.domainEvents ?? []).map((pe) => pe.id),
        ...(K.applicationEvents ?? []).map((pe) => pe.id)
      ])
    );
    let q = null, G = {};
    if (C.has($) ? (q = M ? "SOURCE_PULL" : "WRITE_DB", G = { externalTableId: $ }) : N ? (q = M ? "SOURCE_PULL" : "WRITE_API", G = { apiId: N.id, operationId: $ }) : T.has($) ? (q = M ? "SOURCE_PULL" : "WRITE_API", G = { apiId: $ }) : D.has($) && (q = M ? "SOURCE_CONSUMER" : "WRITE_EVENT", G = { targetId: $ }), !q) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((x.steps ?? []).some(
      (K) => K.type === q && (K.externalTableId ?? K.operationId ?? K.apiId ?? K.eventId) === (G.externalTableId ?? G.operationId ?? G.apiId ?? G.targetId)
    )) return;
    const le = new Set((x.steps ?? []).map((K) => K.id));
    let F = (x.steps ?? []).length + 1;
    for (; le.has(`ets-${F}`); ) F++;
    e.command({ kind: "add-etl-step", etlFlowId: x.id, id: `ets-${F}`, stepType: q, ...G });
    return;
  }
  const k = e.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === i), b = e.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === i);
  if (k || b) {
    const x = (k ?? b).name, $ = k ? { externalUseCaseId: i } : { externalTableId: i }, M = (N) => k ? N.sourceExternalUseCaseId === i : N.sourceExternalTableId === i, C = e.model.boundedContexts.flatMap((N) => N.readModels ?? []).find((N) => N.id === n);
    if (C) {
      (e.model.projections ?? []).some(
        (D) => M(D) && D.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(x)}-${oe(C.name)}`,
        name: `${C.name}Projection`,
        ...$,
        targetId: n
      });
      return;
    }
    const T = e.model.boundedContexts.find((N) => N.id === n);
    if (T) {
      (e.model.projections ?? []).some(
        (D) => M(D) && D.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(x)}-${oe(T.name)}`,
        name: `${x}ViewProjection`,
        ...$,
        boundedContextId: n,
        readModelName: `${x}View`
      });
      return;
    }
    return;
  }
  const E = (e.model.aggregates ?? []).find((x) => x.id === i);
  if (E) {
    const x = e.model.boundedContexts.flatMap((M) => M.readModels ?? []).find((M) => M.id === n);
    if (x) {
      (e.model.projections ?? []).some(
        (C) => C.sourceAggregateId === i && C.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(E.name)}-${oe(x.name)}`,
        name: `${x.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const $ = e.model.boundedContexts.find((M) => M.id === n);
    if ($) {
      (e.model.projections ?? []).some(
        (C) => C.sourceAggregateId === i && C.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${oe(E.name)}-${oe($.name)}`,
        name: `${E.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${E.name}View`
      });
      return;
    }
  }
  const L = new Set(
    e.model.boundedContexts.flatMap((x) => (x.domainEvents ?? []).map(($) => $.id))
  ), R = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((x) => x.id),
    ...e.model.boundedContexts.flatMap((x) => (x.domainServices ?? []).map(($) => $.id))
  ]), z = new Set(
    e.model.boundedContexts.flatMap((x) => (x.applicationEvents ?? []).map(($) => $.id))
  ), W = new Set(e.model.boundedContexts.flatMap((x) => (x.useCases ?? []).map(($) => $.id))), w = new Set(
    e.model.boundedContexts.flatMap((x) => (x.queryServices ?? []).map(($) => $.id))
  );
  if (W.has(i) && w.has(n)) {
    (e.model.queryCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const S = new Set(
    e.model.externalSystems.flatMap((x) => (x.useCases ?? []).map(($) => $.id))
  );
  if (W.has(i) && S.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (W.has(i) && W.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const H = e.model.boundedContexts.flatMap((x) => x.scheduledTriggers ?? []).find((x) => x.id === i);
  if (H && W.has(n)) {
    H.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (W.has(i) && (e.model.aggregates ?? []).some((x) => x.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (R.has(i) && L.has(n) || W.has(i) && z.has(n)) {
    (e.model.emissions ?? []).some(
      ($) => $.sourceId === i && $.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (L.has(i) || z.has(i)) {
    const x = z.has(i), $ = e.model.boundedContexts.flatMap((F) => (x ? F.applicationEvents : F.domainEvents) ?? []).find((F) => F.id === i), M = e.model.boundedContexts.flatMap((F) => (F.useCases ?? []).map((K) => ({ u: K, boundedContext: F }))).find(({ u: F }) => F.id === n), C = e.model.boundedContexts.flatMap((F) => (F.readModels ?? []).map((K) => ({ rm: K, boundedContext: F }))).find(({ rm: F }) => F.id === n), T = e.model.boundedContexts.find((F) => F.id === n) ?? (C == null ? void 0 : C.boundedContext) ?? (M == null ? void 0 : M.boundedContext);
    if (!$ || !T) return;
    const N = new Set((e.model.aggregates ?? []).map((F) => F.id)), D = new Set(
      e.model.boundedContexts.flatMap((F) => (F.domainServices ?? []).map((K) => K.id))
    ), q = (e.model.emissions ?? []).find(
      (F) => F.domainEventId === i && (x ? W.has(F.sourceId) : N.has(F.sourceId) || D.has(F.sourceId))
    );
    if (!q) {
      e.emit("modux-notice", {
        message: x ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const G = !x && N.has(q.sourceId);
    if (M) {
      if (e.model.flows.some(
        (K) => K.archetype === "TRIGGERS" && K.triggerEvent === $.name && K.targetUseCaseId === M.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${oe($.name)}-${oe(M.u.name)}`,
        name: M.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: G ? q.sourceId : "",
        triggerDomainServiceId: !x && !G ? q.sourceId : void 0,
        triggerUseCaseId: x ? q.sourceId : void 0,
        triggerEvent: $.name,
        targetId: T.id,
        targetUseCaseId: M.u.id
      });
      return;
    }
    const re = (C == null ? void 0 : C.rm.name) ?? `${$.name}View`;
    if (e.model.flows.some(
      (F) => F.archetype === "MATERIALIZES" && F.triggerEvent === $.name && F.targetId === T.id && F.readModelName === re
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${oe($.name)}-${oe(re)}`,
      name: re,
      archetype: "MATERIALIZES",
      triggerAggregateId: G ? q.sourceId : "",
      triggerDomainServiceId: !x && !G ? q.sourceId : void 0,
      triggerUseCaseId: x ? q.sourceId : void 0,
      triggerEvent: $.name,
      targetId: T.id,
      readModelName: re
    });
    return;
  }
  const ne = /* @__PURE__ */ new Set([
    ...R,
    ...W,
    ...w,
    ...e.model.boundedContexts.flatMap((x) => (x.readModels ?? []).map(($) => $.id))
  ]);
  if (ne.has(i) || ne.has(n) || L.has(n) || z.has(n))
    return;
  const te = new Set(e.model.externalSystems.map((x) => x.id));
  if (te.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((T) => (T.useCases ?? []).map((N) => N.id))
    ).has(n)) {
      (e.model.externalCalls ?? []).some(
        (N) => N.externalSystemId === i && N.useCaseId === n
      ) || e.command({ kind: "add-external-call", sourceId: i, targetId: n });
      return;
    }
    if (te.has(n) && n !== i) {
      e.openExtDepPicker({ sourceId: i, targetId: n, x: o ?? 0, y: a ?? 0 });
      return;
    }
    const $ = (e.model.apis ?? []).find(
      (T) => T.operations.some((N) => N.id === n)
    ), M = /^apiop:(.+)@(.+)$/.exec(n), C = $ ? { operationId: n, siteId: $.id } : M ? { operationId: M[1], siteId: M[2] } : null;
    if (C) {
      (e.model.externalOperationUses ?? []).some(
        (N) => N.externalSystemId === i && N.operationId === C.operationId && N.siteId === C.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: C.operationId,
        targetSiteId: C.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((T) => T.id === n) || (e.model.proxyApis ?? []).some((T) => T.id === n)) {
      (e.model.externalSystemDependencies ?? []).some(
        (N) => N.sourceId === i && N.targetId === n
      ) || e.command({ kind: "add-external-dependency", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  te.has(n) || y.has(n);
}
function Hc(e, t, i, n, o) {
  var a, r, l;
  if (o === "invariant" || o === "invariant-containment") {
    const s = o === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: s });
    return;
  }
  if (t === "eventstorming" && i === "edge" && o === "es-custom") {
    const s = /^escc:(.+)$/.exec(n), p = s ? e.owningUseCaseOf(s[1]) : null;
    s && p && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: p.id, id: s[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "ui") {
    if (i === "edge") {
      let s;
      if (s = /^idpauth:(.+)$/.exec(n))
        e.command({ kind: "set-identity-provider", id: s[1], targetId: null });
      else if (s = /^appheader:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-header-page", appId: s[1], pageId: null });
      else if (s = /^apphome:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-home-page", appId: s[1], pageId: null });
      else if (s = /^appmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-model", appId: s[1], modelId: null });
      else if (s = /^appview:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-view-page", appId: s[1], pageId: null });
      else if (s = /^appedit:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-edit-page", appId: s[1], pageId: null });
      else if (s = /^cruddetail:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-detail", pageId: s[1], targetId: null, toAppId: null });
      else if (s = /^crudnew:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-create", pageId: s[1], targetId: null, toAppId: null });
      else if (s = /^wizstep:([^:]+):(.+)$/.exec(n))
        e.command({ kind: "set-wizard-step-page", pageId: s[1], itemId: s[2], targetId: null });
      else if (s = /^pgbtn:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] });
      else if (s = /^pglist:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-listing", pageId: s[1], queryServiceId: null });
      else if (s = /^pgmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-model", pageId: s[1], modelId: null });
      else if (s = /^actorapp:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-actor-app", actorId: s[1], appId: s[2] });
      else if (s = /^menupage:(.+)->[^>]+$/.exec(n)) {
        const p = ke(s[1]);
        p && e.command({ kind: "set-menu-page", pageId: null, ...p });
      } else if (s = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const p = ke(s[1]);
        p && e.command({ kind: "set-menu-app", toAppId: null, ...p });
      } else if (s = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const p = ke(s[1]);
        p && e.command({ kind: "set-menu-use-case", useCaseId: null, ...p });
      } else if (s = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const p = ke(s[1]);
        p && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...p });
      } else if (s = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const p = ke(s[1]);
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
      const s = ke(n);
      s && e.command({ kind: "remove-menu-item", ...s });
      return;
    }
    if (o === "wizard-step-row") {
      const s = /^wizrow:([^:]+):(.+)$/.exec(n);
      s && e.command({ kind: "remove-page-wizard-step", pageId: s[1], targetId: s[2] });
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
      const s = /^gbtn:([^:]+):(.+)$/.exec(n);
      s && e.command({ kind: "remove-group-button", id: s[1], itemId: s[2] });
      return;
    }
    if (o === "group-subgroup") {
      const s = /^gsub:([^:]+):(.+)$/.exec(n);
      s && e.command({ kind: "remove-group-subgroup", id: s[1], targetId: s[2] });
      return;
    }
    if (i === "edge" && o === "bar-group") {
      const s = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      s && e.command({ kind: "remove-page-bar-group", pageId: s[1], id: s[2] });
      return;
    }
    if (i === "edge" && o === "gbtn-target") {
      const s = /^gbtnt:([^:]+):(.+)$/.exec(n);
      s && e.command({ kind: "set-group-button-target", id: s[1], itemId: s[2], useCaseId: null });
      return;
    }
    if (i === "edge" && o === "ui-custom-page") {
      const s = /^ccpage:(.+)$/.exec(n);
      s && e.command({ kind: "set-page-custom-code", id: s[1], targetId: null });
      return;
    }
    if (i === "edge" && o === "cc-uses") {
      const s = /^ccuse:(.+)->(.+)$/.exec(n);
      s && e.command({ kind: "remove-custom-code-use", id: s[1], elementId: s[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && o === "model-mapping") {
    const s = /^mapping:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: s[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "mapping-rule") {
    const s = /^maprule:([^:]+):(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: s[1], itemId: s[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model-field") {
    const s = xn(n);
    s && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: s.modelId, fieldId: s.fieldId }));
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
    const s = /^cctf:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: s[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-mapping") {
    const s = /^ccmap:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: s[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-input") {
    const s = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    s && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: s[1],
      modelId: s[2],
      ...s[3] ? { fieldId: s[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-output") {
    const s = /^tfout:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: s[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && o === "workflow-dependency") {
    const s = /^wfdep:(.+)->(.+)$/.exec(n);
    if (!s) return;
    const p = e.owningWorkflowOf(s[2]);
    if (!p) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: p.id,
      id: s[2],
      dependsOnStepId: s[1]
    });
    return;
  }
  if (t === "workflows" && i === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-role") {
    const s = /^wfrole:(.+)->(.+)$/.exec(n);
    if (s) {
      const p = e.owningWorkflowOf(s[1]);
      p && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: p.id, id: s[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-form") {
    const s = /^wfform:(.+)->(.+)$/.exec(n);
    if (s) {
      const p = e.owningWorkflowOf(s[1]);
      if (!p) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: p.id, id: s[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-link") {
    const s = /^wflink:(.+)->(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: s[1], targetId: s[2] }));
    return;
  }
  if (i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "workflow-step") {
    const s = e.owningWorkflowOf(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: s.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-impl-wire") {
    const s = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!s) return;
    const [, p, y] = s, f = (a = (e.model.apis ?? []).find(
      (m) => m.operations.some((g) => g.id === p)
    )) == null ? void 0 : a.id;
    if (!f) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: f, operationId: p, boundedContextId: y });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-op-use") {
    const s = /^extopuse:(.+)->(.+)@(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: s[1],
      operationId: s[2],
      targetSiteId: s[3]
    });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "op-route") {
    const s = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!s) return;
    const [, p, y, f] = s, m = /^apiimpl:.+@(.+)$/.exec(f), g = m ? m[1] : f;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: y, operationId: p, targetSiteId: g });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "relation") {
    const s = /^rel:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "emission") {
    const s = /^emit:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "projection") {
    const s = /^proj:(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: s[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "uc-call") {
    const s = /^uccall:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-trigger") {
    const s = /^notif:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "set-notification-event", id: s[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-recipient") {
    const s = /^notifto:([^:]+):(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: s[1], roleId: s[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "document-query") {
    const s = /^docq:(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "set-document-query", id: s[1], queryServiceId: null, queryOperationId: null }));
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
    const s = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: s[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "idp-federation") {
    const s = /^idpfed:(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: s[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (o === "etl-source" || o === "etl-write")) {
    const s = /^etl:([^:]+):(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: s[1], id: s[2] });
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
    const s = /^deploy:(.+)->(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: s[1], id: s[2] }));
    return;
  }
  if (t === "context-map" && i === "node" && o === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (t === "context-map" && e.detail === "distribution" && i === "node") {
    const s = e.sceneFor("context-map");
    for (let p = (r = s.nodes.find((y) => y.id === n)) == null ? void 0 : r.parentId; p; ) {
      if ((e.model.modules ?? []).some((y) => y.id === p)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: p, elementId: n });
        return;
      }
      p = (l = s.nodes.find((y) => y.id === p)) == null ? void 0 : l.parentId;
    }
    return;
  }
  if (t === "context-map" && i === "edge" && o === "st-fire") {
    const s = /^stfire:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: s[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agg-call") {
    const s = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "qs-call") {
    const s = /^qscall:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "external-call") {
    const s = /^extcall:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-uc-call") {
    const s = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-use") {
    const s = /^mcp:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-external-use") {
    const s = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-mcp") {
    const s = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "gateway-exposure") {
    const s = /^gwx:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-gateway") {
    const s = /^aggw:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api-op") {
    const s = /^agapi:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-query") {
    const s = /^agqs:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-delegate") {
    const s = /^agag:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-agent") {
    const s = /^useag:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-trigger") {
    const s = /^evag:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (i === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-rag") {
    const s = /^agrag:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "rag-source") {
    const s = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const s = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: s[2], targetId: s[1] });
    return;
  }
  if (i === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && o === "rag-content-source") {
    const s = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: s[1], uri: s[2] });
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
    const s = /^apiwire:(.+)$/.exec(n), p = s ? e.owningApiOf(s[1]) : null;
    if (!s || !p) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: p.id, id: s[1] });
    return;
  }
  if (i === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && o === "api-impl") {
    const s = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: s[1], boundedContextId: s[2] });
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
    const s = e.owningApiOf(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: s.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-use") {
    const s = /^use:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-ext") {
    const s = /^extdep:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-dep") {
    const s = /^xdep:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "wf-chain") {
    const s = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: s[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api") {
    const s = /^agapi:(.+)->(.+)$/.exec(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "proxy-target") {
    const s = /^pxt:(.+)->(.+)$/.exec(n);
    if (!s || !(e.model.proxyApis ?? []).some((p) => p.id === s[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
    return;
  }
  if (i === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((p) => p.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
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
    const s = e.owningProcessOf(n);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: s.id, id: n });
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
  { type: "boundedContext", label: "Contexto", symbol: "component", color: "#94a3b8", group: "Estratégico" },
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
  { type: "workflow-join", label: "Join", child: !0, symbol: "flow", color: "#6d28d9", group: "Orquestación" },
  { type: "workflow-split", label: "Split", child: !0, symbol: "flow", color: "#6d28d9", group: "Orquestación" },
  { type: "etl-flow", label: "Flujo ETL (integrador)", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
  { type: "etl-transform", label: "Transformación ETL", child: !0, symbol: "gear", color: "#0f766e", group: "Orquestación" },
  { type: "aggregate", label: "Agregado", child: !0, symbol: "aggregate", color: "#8b5cf6", group: "Dominio" },
  { type: "invariant", label: "Invariante", child: !0, symbol: "shield", color: "#0f766e", group: "Dominio" },
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
  { type: "service", label: "Servicio (despliegue)", symbol: "gear", color: "#334155", group: "Distribución" },
  { type: "module", label: "Módulo", child: !0, symbol: "component", color: "#334155", group: "Distribución" },
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
var Kc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, ee = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? jc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Kc(t, i, o), o;
};
const vn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Yc = Object.keys(vn);
function Wt(e, t, i) {
  const n = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, r = i.y + i.h / 2;
  let l = 0, s = 1;
  const p = t.x - e.x, y = t.y - e.y;
  for (const [f, m] of [
    [-p, e.x - n],
    [p, o - e.x],
    [-y, e.y - a],
    [y, r - e.y]
  ]) {
    if (f === 0) {
      if (m < 0) return !1;
      continue;
    }
    const g = m / f;
    if (f < 0) {
      if (g > s) return !1;
      g > l && (l = g);
    } else {
      if (g < l) return !1;
      g < s && (s = g);
    }
  }
  return s - l > 0.02;
}
function Xc(e, t, i = 28) {
  var p;
  const n = new Map(e.nodes.map((y) => [y.id, y])), o = (y) => {
    var m;
    const f = /* @__PURE__ */ new Set();
    for (let g = y; g; g = (m = n.get(g)) == null ? void 0 : m.parentId) f.add(g);
    return f;
  }, a = e.nodes, r = (y) => y.parentId ? Math.min(i, 6) : i, l = /* @__PURE__ */ new Map(), s = (y, f, m) => {
    const g = r(m), v = { x: m.x, y: m.y, w: m.w + 2 * g, h: m.h + 2 * g }, d = m.w / 2 + g * 1.5, c = m.h / 2 + g * 1.5, h = { x: m.x - d, y: m.y - c }, k = { x: m.x + d, y: m.y - c }, b = { x: m.x - d, y: m.y + c }, E = { x: m.x + d, y: m.y + c }, L = [];
    for (const R of [h, k, b, E])
      !Wt(y, R, v) && !Wt(R, f, v) && L.push([R]);
    for (const [R, z] of [
      [h, k],
      [k, h],
      [k, E],
      [E, k],
      [E, b],
      [b, E],
      [b, h],
      [h, b]
    ])
      !Wt(y, R, v) && !Wt(z, f, v) && L.push([R, z]);
    return L;
  };
  for (const y of e.edges) {
    if ((p = t[y.id]) != null && p.length) continue;
    const f = n.get(y.sourceId), m = n.get(y.targetId);
    if (!f || !m) continue;
    const g = /* @__PURE__ */ new Set([...o(f.id), ...o(m.id)]), v = [
      { x: f.x, y: f.y },
      { x: m.x, y: m.y }
    ];
    for (let d = 0; d < 12; d++) {
      let c = !1;
      e: for (let h = 0; h < v.length - 1; h++)
        for (const k of a) {
          if (g.has(k.id)) continue;
          const b = r(k), E = { x: k.x, y: k.y, w: k.w + 2 * b, h: k.h + 2 * b };
          if (!Wt(v[h], v[h + 1], E)) continue;
          const L = s(v[h], v[h + 1], k);
          if (!L.length) continue;
          const R = (W) => a.some(
            (w) => w !== k && !g.has(w.id) && Math.abs(W.x - w.x) < w.w / 2 + r(w) / 2 && Math.abs(W.y - w.y) < w.h / 2 + r(w) / 2
          ), z = (W) => {
            let w = 0;
            const S = [v[h], ...W, v[h + 1]];
            for (let H = 0; H < S.length - 1; H++)
              w += Math.hypot(S[H + 1].x - S[H].x, S[H + 1].y - S[H].y);
            return w + (W.some(R) ? 1e4 : 0);
          };
          L.sort((W, w) => z(W) - z(w)), v.splice(h + 1, 0, ...L[0]), c = !0;
          break e;
        }
      if (!c) break;
    }
    v.length > 2 && l.set(
      y.id,
      v.slice(1, -1).map((d) => ({ x: Math.round(d.x), y: Math.round(d.y) }))
    );
  }
  return l;
}
function Qc(e, t) {
  switch (t) {
    case "boundedContext":
      return { elementType: "boundedContext", id: e.replace(/^tgt:/, "") };
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
    case "module":
      return { elementType: "module", id: e };
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
let Q = class extends Ge {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingIds = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var a;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), o = (r) => {
        e.preventDefault(), this.onDiagramScopeChange(r);
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
        case "a":
        case "A":
          o("view:aggregates");
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
      const r = this.menuEntryIn(a.appId, a.itemId);
      if (!r) return;
      const l = (s, p) => (s ?? []).some((y) => y.id === p || l(y.children, p));
      if (o) {
        const s = ke(o);
        if (!(s != null && s.itemId) || s.itemId === a.itemId || a.appId === s.appId && l(r.entry.children, s.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: s.appId,
          itemId: a.itemId,
          parentId: s.itemId
        });
        return;
      }
      if (n) {
        const s = ke(n);
        if (!(s != null && s.itemId) || s.itemId === a.itemId) return;
        const p = this.menuEntryIn(s.appId, s.itemId);
        if (!p || a.appId === s.appId && l(r.entry.children, s.itemId) || a.appId === s.appId && p.parentId === r.parentId && r.beforeId === s.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: s.appId,
          itemId: a.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: s.itemId
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: o, beforeComponentId: a } = e.detail, r = this.componentIn(t, n);
      if (!r || t === i) return;
      const l = JSON.parse(JSON.stringify(r.node)), { ops: s } = this.rebuildComponentOps(i, l, o ?? void 0, a);
      for (const p of s) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, l, r.parentId ?? void 0, r.beforeId).ops
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
    if (e.has("model") && this._pendingIds.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && !this._paletteOpenedForBlank && this.model.boundedContexts.length === 0 && this.model.externalSystems.length === 0 && (this._paletteOpen = !0, this._paletteOpenedForBlank = !0), e.has("layout")) {
      const t = pi(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations" || t === "distribution") && (this._detail = t);
    }
  }
  /**
   * A deleted relation takes its bends with it. Stored edge points whose edge
   * no longer exists — though BOTH endpoints are on stage — belong to a
   * relation the user removed: without this sweep, recreating the relation
   * would revive the old detour. Endpoints hidden by the level, the active
   * vista or the single-module collapse keep their points untouched.
   */
  pruneStaleEdgePoints() {
    const e = this.viewLayout(this._view), t = Object.keys(e.edges ?? {});
    if (!t.length) return;
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((l) => l.id)), o = new Set(i.nodes.map((l) => l.id)), a = t.filter((l) => {
      if (n.has(l)) return !1;
      const s = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(l);
      return !!s && o.has(s[1]) && o.has(s[2]);
    });
    if (!a.length) return;
    const r = { ...e.edges };
    a.forEach((l) => delete r[l]), this.writeViewLayout(this._view, { ...e, edges: r });
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
    const a = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((y) => !y.parentId), l = Fi(r), s = [...l.keys()].map((y) => ({
      kind: "move-node",
      view: "context-map",
      id: y,
      pos: a.nodes[y] ?? null
    })), p = { ...a.nodes };
    for (const [y, f] of l) {
      const m = r.find((v) => v.id === y), g = a.nodes[y] ?? { x: m.x, y: m.y };
      p[y] = {
        x: Math.round(g.x + (f.x - m.x)),
        y: Math.round(g.y + (f.y - m.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: p }), s.length && this.pushUndoEntry(s);
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
   * boundedContext also drops its relations, so its inverse restores them).
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
    const { id: t, x: i, y: n } = e.detail, o = this._view, a = this.viewLayout(o), r = a.nodes[t] ?? null;
    let l = { x: i, y: n };
    const s = this.sceneFor(o), p = s.nodes.find((f) => f.id === t);
    if (p != null && p.parentId) {
      const f = s.nodes.find((m) => m.id === p.parentId);
      f && (l = { x: i - f.x, y: n - f.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: l } });
    const y = [{ kind: "move-node", view: o, id: t, pos: r }];
    if (o === "processes") {
      const f = this.stepReorderCommand(t);
      if (f) {
        const m = this.inverseOf(f);
        m && y.unshift(...m), this.command(f, !1);
      }
    }
    this.pushUndoEntry(y);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = (this.model.apis ?? []).find((v) => v.id === t) ?? (this.model.proxyApis ?? []).find((v) => v.id === t);
    if (!a || i && !this.model.externalSystems.some((v) => v.id === i)) return;
    const r = a.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === r) return;
    const s = this._view, p = this.viewLayout(s), y = this.sceneFor(s), f = l ? y.nodes.find((v) => v.id === l) : void 0, m = f ? { x: n - f.x, y: o - f.y } : { x: n, y: o }, g = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: s, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(s, { ...p, nodes: { ...p.nodes, [t]: m } }), this.pushUndoEntry(g);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = (this.model.apis ?? []).find((v) => v.id === t), r = this.model.externalSystems.find((v) => v.id === i);
    if (!a || !r || (this.model.proxyApis ?? []).some(
      (v) => v.targetApiId === t && v.publishedByExternalSystemId === i
    )) return;
    const s = `proxy-${oe(a.name)}-${oe(r.name)}`;
    if ((this.model.proxyApis ?? []).some((v) => v.id === s)) return;
    const p = this._view, y = this.viewLayout(p), m = this.sceneFor(p).nodes.find((v) => v.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: s,
        name: `${a.name}@${r.name}`,
        targetId: t,
        boundedContextId: i
      },
      !1
    );
    const g = [{ kind: "remove-proxy-api", id: s }];
    m && (g.push({ kind: "move-node", view: p, id: s, pos: y.nodes[s] ?? null }), this.writeViewLayout(p, {
      ...y,
      nodes: { ...y.nodes, [s]: { x: n - m.x, y: o - m.y } }
    })), this.pushUndoEntry(g);
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
    var l, s, p;
    const t = e.target, i = (l = t.files) == null ? void 0 : l[0];
    if (t.value = "", !i) return;
    const n = await i.text(), o = this.selectedApiId(), a = o ? null : ((s = this.model.externalSystems.find((y) => y.id === this._selectedId)) == null ? void 0 : s.id) ?? null, r = o || a ? null : ((p = this.model.boundedContexts.find((y) => y.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!o && !a && !r) {
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
      homeBoundedContextId: r
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
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), o = this.sceneFor(i), a = { ...n.nodes }, r = [];
    for (const { id: l, x: s, y: p } of t) {
      r.push({ kind: "move-node", view: i, id: l, pos: n.nodes[l] ?? null });
      let y = { x: s, y: p };
      const f = o.nodes.find((m) => m.id === l);
      if (f != null && f.parentId) {
        const m = o.nodes.find((g) => g.id === f.parentId);
        m && (y = { x: s - m.x, y: p - m.y });
      }
      a[l] = y;
    }
    if (this.writeViewLayout(i, { ...n, nodes: a }), i === "processes")
      for (const { id: l } of t) {
        const s = this.stepReorderCommand(l);
        if (s) {
          const p = this.inverseOf(s);
          p && r.unshift(...p), this.command(s, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var y;
    const { id: t, x: i, y: n, w: o, h: a } = e.detail, r = this._view, l = this.viewLayout(r), s = this.sceneFor(r).nodes.filter((f) => f.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((y = l.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: l.nodes[t] ?? null },
      ...s.map((f) => ({ kind: "move-node", view: r, id: f.id, pos: l.nodes[f.id] ?? null }))
    ]);
    const p = { ...l.nodes, [t]: { x: i, y: n } };
    for (const f of s) p[f.id] = { x: f.x - i, y: f.y - n };
    this.writeViewLayout(r, {
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
    const i = Bn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), o = [...t.steps].sort(
      (r, l) => (n.get(r.id) ?? 0) - (n.get(l.id) ?? 0)
    );
    if (o.every((r, l) => r.id === t.steps[l].id)) return null;
    const a = o.findIndex((r) => r.id === e);
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
      const o = this.memberIdOf(i, n), a = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
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
      case "boundedContext":
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
    return this.model.boundedContexts.flatMap((t) => t.useCases ?? []).find((t) => (t.steps ?? []).some((i) => i.id === e));
  }
  owningWorkflowOf(e) {
    return (this.model.workflows ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningApiOf(e) {
    return (this.model.apis ?? []).find((t) => t.operations.some((i) => i.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: i, name: n } = e.detail;
    (i === "boundedContext" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
      ...this.model.boundedContexts.map((i) => ({ id: i.id, name: i.name, kind: "contexto" })),
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
    const t = new Set(e.memberIds), i = (o, a, r = {}) => A`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(o) ? "implicit" : ""}"
        title=${r.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(l) => this.toggleViewMember(o, l.target.checked)}
        />
        ${a}
      </label>
    `, n = (o, a) => a.length ? A`<h4>${o}</h4>${a}` : "";
    return A`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.boundedContexts.flatMap((o) => [
        i(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((a) => a.boundedContextId === o.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(o.id) }))
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
          case "boundedContext":
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
    const e = (this.model.views ?? []).find((g) => g.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((g) => t.has(g.id)), n = new Set(i.map((g) => g.id)), o = this.model.externalSystems.filter((g) => t.has(g.id)), a = new Set(o.map((g) => g.id)), r = (this.model.aggregates ?? []).filter(
      (g) => t.has(g.id) || n.has(g.boundedContextId)
    ), l = new Set(r.map((g) => g.id)), s = (this.model.uiApps ?? []).filter((g) => t.has(g.id)), p = /* @__PURE__ */ new Set(), y = (g) => {
      for (const v of g ?? [])
        v.pageId && p.add(v.pageId), y(v.children);
    };
    s.forEach((g) => y(g.menuItems));
    const f = (this.model.pages ?? []).filter(
      (g) => t.has(g.id) || p.has(g.id)
    ), m = new Set(s.map((g) => g.id));
    return {
      ...this.model,
      uiApps: s,
      pages: f,
      actorAppUses: (this.model.actorAppUses ?? []).filter((g) => m.has(g.appId)),
      boundedContexts: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (g) => n.has(g.sourceId) && n.has(g.targetId)
      ),
      flows: this.model.flows.filter(
        (g) => t.has(g.id) || (n.has(g.sourceId) || a.has(g.sourceId)) && (n.has(g.targetId) || a.has(g.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((g) => l.has(g.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (g) => l.has(g.sourceAggregateId) && l.has(g.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (g) => t.has(g.id) || (g.ownerBoundedContextId ? n.has(g.ownerBoundedContextId) : !1)
      ),
      // Workflows have no owner boundedContext (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((g) => t.has(g.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((g) => t.has(g.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((g) => t.has(g.id)),
      rags: (this.model.rags ?? []).filter((g) => t.has(g.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((g) => t.has(g.id)),
      apis: (this.model.apis ?? []).filter(
        (g) => t.has(g.id) || (g.publishedByExternalSystemId ? a.has(g.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (g) => t.has(g.id) || (g.publishedByExternalSystemId ? a.has(g.publishedByExternalSystemId) : !1)
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
  /**
   * Opening an element is the HOST's job: the editor only emits the event and
   * mateu draws its own drawer with the element's read-only detail inside
   * (GraphicalEditorPage.handleAction returns the Drawer).
   */
  openInDrawer(e) {
    this.emit("modux-activate", e);
  }
  onElementActivated(e) {
    var i;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = n ? (this.model.workflowGateways ?? []).find((a) => a.id === n[1]) : null;
      if (n && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const a = ((i = (o.branchConditions ?? []).find((r) => r.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
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
    if (e.detail.kind === "invariant") {
      const n = (this.model.aggregates ?? []).find((o) => (o.invariants ?? []).some((a) => a.id === e.detail.id));
      n && this.openInDrawer({ elementType: "aggregate", id: n.id });
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
      for (const r of a ?? [])
        r.id && t.add(r.id), i(r.children);
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
    const o = (a, r) => {
      var s;
      const l = a ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (n = { node: l[p], parentId: r, beforeId: ((s = l[p + 1]) == null ? void 0 : s.id) ?? null }), o(l[p].children, l[p].id);
    };
    return o(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, o = !1, a) {
    const r = a ?? this.allComponentIds(), l = (f) => {
      if (!o) return f.id;
      const m = `cmp-${oe(f.kind)}`;
      let g = m;
      for (let v = 2; r.has(g) || r.has(`${g}-tab-1`); v++) g = `${m}-${v}`;
      return r.add(g), g;
    }, s = [], p = (f, m) => {
      const g = l(f);
      s.push({ kind: "add-page-component", pageId: e, componentId: g, componentKind: f.kind, parentComponentId: m }), f.kind === "tabLayout" && (s.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-1` }), s.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-2` })), s.push({
        kind: "set-page-component",
        pageId: e,
        componentId: g,
        title: f.title ?? null,
        text: f.text ?? null,
        label: f.label ?? null,
        useCaseId: f.useCaseId ?? null,
        mappingId: f.mappingId ?? null,
        modelId: f.modelId ?? null,
        queryServiceId: f.queryServiceId ?? null,
        queryOperationId: f.queryOperationId ?? null,
        fieldId: f.fieldId ?? null,
        stereotype: f.stereotype ?? null,
        colspan: f.colspan ?? null
      });
      for (const v of f.children ?? []) p(v, g);
      return g;
    }, y = p(t, i);
    return n && s.push({
      kind: "move-page-component",
      pageId: e,
      componentId: y,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: s, rootId: y };
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
      for (const r of a ?? [])
        t.add(r.id), i(r.children);
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
    const n = (((a = (this.model.pages ?? []).find((r) => r.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((r) => r.id ?? r.pageId), o = n.indexOf(t);
    o >= 0 && (i ? n[o + 1] === i : o === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let n = null;
    const o = (a, r) => {
      var s;
      const l = a ?? [];
      for (let p = 0; p < l.length; p++)
        l[p].id === t && (n = { entry: l[p], parentId: r, beforeId: ((s = l[p + 1]) == null ? void 0 : s.id) ?? null }), o(l[p].children, l[p].id ?? null);
    };
    return o(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var r;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const l = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!l) return;
      t = this._selectedCmp.pageId, de.LEAF_KINDS.has(l.node.kind) ? (i = l.parentId ?? void 0, n = l.beforeId) : i = l.node.kind === "tabLayout" && e.kind !== "tab" ? (r = (l.node.children ?? [])[0]) == null ? void 0 : r.id : l.node.id;
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
    return A`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var r;
      const { id: i, w: n, h: o } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((r = a.sizes) == null ? void 0 : r[i]) ?? null }
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
      .useCases=${this.model.boundedContexts.flatMap(
      (t) => (t.useCases ?? []).map((i) => ({ id: i.id, name: i.name }))
    )}
      .queryOps=${this.model.boundedContexts.flatMap(
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
      const { pageId: i, fieldId: n, stereotype: o, colspan: a, label: r } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: o, colspan: a, label: r });
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
        items: e.boundedContexts.map((n) => ({ id: n.id, name: n.name }))
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
        items: e.boundedContexts.flatMap(
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
        items: e.boundedContexts.flatMap((n) => (n.useCases ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.boundedContexts.flatMap((n) => [
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
        items: e.boundedContexts.flatMap((n) => (n.readModels ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (o) => (o.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${o.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap((n) => (n.queryServices ?? []).map((o) => ({ id: o.id, name: o.name })))
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
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      return;
    }
    r.new ? this.createFromPalette(r.new, n, o, a) : r.existing && this.placeExistingFromPalette(r.existing, n, o, e.clientX, e.clientY, a);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const i = /* @__PURE__ */ new Set([...this._pendingIds, ...this.sceneFor(this._view).nodes.map((o) => o.id)]), n = this.model;
    for (const o of [
      n.boundedContexts.map((a) => a.id),
      n.boundedContexts.flatMap((a) => (a.useCases ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.domainEvents ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.applicationEvents ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.readModels ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.domainServices ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.queryServices ?? []).map((r) => r.id)),
      n.boundedContexts.flatMap((a) => (a.scheduledTriggers ?? []).map((r) => r.id)),
      (n.aggregates ?? []).map((a) => a.id),
      (n.entities ?? []).map((a) => a.id),
      (n.actors ?? []).map((a) => a.id),
      n.externalSystems.map((a) => a.id),
      n.externalSystems.flatMap((a) => (a.useCases ?? []).map((r) => r.id)),
      n.externalSystems.flatMap((a) => (a.tables ?? []).map((r) => r.id)),
      n.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((r) => r.id)),
      (n.apis ?? []).map((a) => a.id),
      (n.apis ?? []).flatMap((a) => (a.operations ?? []).map((r) => r.id)),
      (n.proxyApis ?? []).map((a) => a.id),
      (n.aiAgents ?? []).map((a) => a.id),
      (n.mcpGateways ?? []).map((a) => a.id),
      (n.rags ?? []).map((a) => a.id),
      (n.workflows ?? []).map((a) => a.id),
      (n.workflows ?? []).flatMap((a) => (a.steps ?? []).map((r) => r.id)),
      (n.etlFlows ?? []).map((a) => a.id),
      (n.identityProviders ?? []).map((a) => a.id),
      (n.notifications ?? []).map((a) => a.id),
      (n.documents ?? []).map((a) => a.id),
      (n.uiApps ?? []).map((a) => a.id),
      (n.pages ?? []).map((a) => a.id),
      (n.modules ?? []).map((a) => a.id),
      (n.services ?? []).map((a) => a.id),
      (n.models ?? []).flatMap((a) => (a.fields ?? []).map((r) => r.id)),
      (n.customCodes ?? []).map((a) => a.id),
      (n.buttonGroups ?? []).map((a) => a.id),
      (n.workflowGateways ?? []).map((a) => a.id)
    ])
      o.forEach((a) => i.add(a));
    for (let o = 1; ; o++) {
      const a = o === 1 ? e : `${e} ${o}`, r = `${t}${oe(a)}`;
      if (!i.has(r))
        return this._pendingIds.add(r), { id: r, name: a };
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
    var o, a;
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
      "module"
    ].includes(e)) return i.find((r) => this.model.boundedContexts.some((l) => l.id === r)) ?? null;
    if (e === "invariant") {
      const r = i.find((s) => (this.model.aggregates ?? []).some((p) => p.id === s));
      if (r) return r;
      const l = i.find((s) => this.model.boundedContexts.some((p) => p.id === s));
      return ((o = (this.model.aggregates ?? []).find((s) => s.boundedContextId === l)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const r = i.find((s) => (this.model.aggregates ?? []).some((p) => p.id === s));
      if (r) return r;
      const l = i.find((s) => this.model.boundedContexts.some((p) => p.id === s));
      return ((a = (this.model.aggregates ?? []).find((s) => s.boundedContextId === l)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null;
    if (e === "model-field")
      return i.find((r) => (this.model.models ?? []).some((l) => l.id === r)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return i.find((r) => (this.model.buttonGroups ?? []).some((l) => l.id === r)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (r) => this.model.boundedContexts.some((l) => (l.useCases ?? []).some((s) => s.id === r))
      ) ?? null;
    if (e === "api-operation") {
      for (const r of i) {
        if ((this.model.apis ?? []).some((p) => p.id === r)) return r;
        const l = /^apiimpl:(.+)@(.+)$/.exec(r);
        if (l && (this.model.apis ?? []).some((p) => p.id === l[1])) return l[1];
        const s = (this.model.proxyApis ?? []).find((p) => p.id === r);
        if (s != null && s.targetApiId) return s.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? i.find((r) => this.model.boundedContexts.some((l) => l.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var g, v;
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
      const { id: h, name: k } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: h, name: k }, !1), d ? (this.command({ kind: "set-page-component-custom-code", pageId: c, componentId: d[2], targetId: h }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: c, targetId: h }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const d = e.slice(4), c = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, h = c ? c[1] : i && (this.model.pages ?? []).some((R) => R.id === i) ? i : null;
      if (!h) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let k = c ? c[2] : void 0, b = null;
      if (d === "tab") {
        let R = null, z = k ? this.componentIn(h, k) : null;
        for (; z; ) {
          if (z.node.kind === "tabLayout") {
            R = z.node.id;
            break;
          }
          z = z.parentId ? this.componentIn(h, z.parentId) : null;
        }
        if (!R) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const W = this.componentIn(h, R).node, w = this.newComponentId("tab"), S = `Pestaña ${(W.children ?? []).filter((H) => H.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: h, componentId: w, componentKind: "tab", parentComponentId: R }, !1), this.command({ kind: "set-page-component", pageId: h, componentId: w, title: S }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: w }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const R = this.componentIn(h, n.componentId);
        R && R.node.kind === "tab" ? k = R.node.id : R && (k = R.parentId ?? void 0, b = n.pos === "before" ? n.componentId : R.beforeId);
      } else if (k) {
        const R = ((g = this.componentIn(h, k)) == null ? void 0 : g.node) ?? null;
        (R == null ? void 0 : R.kind) === "tabLayout" && (R.children ?? [])[0] && (k = (R.children ?? [])[0].id);
      }
      const E = this.newComponentId(d), L = {
        kind: "add-page-component",
        pageId: h,
        componentId: E,
        componentKind: d,
        parentComponentId: k
      };
      if (!b) {
        this.command(L);
        return;
      }
      this.command(L, !1), this.command(
        { kind: "move-page-component", pageId: h, componentId: E, parentComponentId: k ?? null, beforeComponentId: b },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: E }]);
      return;
    }
    const a = this._view, r = this.sceneFor(a), l = (d, c) => {
      const h = this.viewLayout(a), k = c ? r.nodes.find((E) => E.id === c) : void 0, b = k ? { x: Math.round(t.x - k.x), y: Math.round(t.y - k.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...h, nodes: { ...h.nodes, [d]: b } }), { kind: "move-node", view: a, id: d, pos: null };
    }, s = (d, c, h) => {
      const k = this.inverseOf(d) ?? [];
      this.command(d, !1);
      const b = l(c, h);
      this.pushUndoEntry([...k, b]);
    };
    if (!o.child) {
      const d = {
        boundedContext: "mod-",
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
        "button-group": "bg-",
        service: "svc-"
      }, { id: c, name: h } = this.uniquePaletteName(o.label, d[e] ?? ""), k = e === "boundedContext" ? { kind: "add-boundedContext", id: c, name: h, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: c, name: h } : e === "external-system" ? { kind: "add-external-system", id: c, name: h } : e === "ai-agent" ? { kind: "add-ai-agent", id: c, name: h } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: c, name: h, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: c, name: h } : e === "rag" ? { kind: "add-rag", id: c, name: h } : e === "api" ? { kind: "add-api", id: c, name: h } : e === "proxy-api" ? { kind: "add-proxy-api", id: c, name: h } : e === "ui-app" ? { kind: "create-ui-app", id: c, name: h } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: c, name: h, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: c, name: h, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: c, name: h, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: c, name: h } : e === "transformation" ? { kind: "add-transformation", id: c, name: h } : e === "custom-code" ? { kind: "add-custom-code", id: c, name: h } : e === "button-group" ? { kind: "add-button-group", id: c, name: h } : e === "identity-provider" ? { kind: "add-identity-provider", id: c, name: h } : e === "service" ? { kind: "add-service", id: c, name: h } : {
        kind: "add-workflow",
        id: c,
        name: h,
        completionEventName: `${h.replace(/\s+/g, "")}Completado`
      };
      if (k.kind === "create-ui-app") {
        const E = this.dropChain(i).find((L) => this.model.boundedContexts.some((R) => R.id === L));
        if (E) {
          s({ ...k, boundedContextId: E }, c, E);
          return;
        }
      }
      s(k, c);
      return;
    }
    if (e === "ui-wizard-step") {
      const c = this.dropChain(i).map((E) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(E)) == null ? void 0 : L[1]) ?? E;
      }).find((E) => (this.model.pages ?? []).some((L) => L.id === E && L.type === "WIZARD"));
      if (!c) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const h = ((v = (this.model.pages ?? []).find((E) => E.id === c)) == null ? void 0 : v.wizardSteps) ?? [], k = new Set(h.map((E) => E.id ?? E.pageId));
      let b = h.length + 1;
      for (; k.has(`wzs-${b}`); ) b++;
      this.command({ kind: "add-page-wizard-step", pageId: c, itemId: `wzs-${b}`, label: `Paso ${b}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const d = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", c = d === "CRUD" ? "CRUD" : d === "WIZARD" ? "Wizard" : "Página", { id: h, name: k } = this.uniquePaletteName(c, "page-"), b = this.dropChain(i), E = b.find((R) => (this.model.uiApps ?? []).some((z) => z.id === R)), L = b.map((R) => {
        var z;
        return ((z = /^wizrow:([^:]+):/.exec(R)) == null ? void 0 : z[1]) ?? R;
      }).find((R) => (this.model.pages ?? []).some((z) => z.id === R && z.type === "WIZARD"));
      if (L) {
        const R = r.nodes.find((W) => W.id === L);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40), this.command({ kind: "create-ui-page", id: h, name: k, pageType: d }, !1), this.command({ kind: "add-page-wizard-step", pageId: L, targetId: h }, !1);
        const z = l(h);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: h }, z]), this.emit("modux-notice", { message: `${k} creada como paso del wizard` });
        return;
      }
      if (E) {
        const R = r.nodes.find((z) => z.id === E);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40);
      }
      s(
        E ? { kind: "create-ui-page", id: h, name: k, pageType: d, appId: E, menuLabel: k } : { kind: "create-ui-page", id: h, name: k, pageType: d },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const d = this.dropChain(i), c = d.find((L) => (this.model.uiApps ?? []).some((R) => R.id === L));
      if (!c) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const h = /* @__PURE__ */ new Set(), k = (L) => {
        for (const R of L ?? [])
          h.add(R.label), k(R.children);
      };
      (this.model.uiApps ?? []).forEach((L) => k(L.menuItems));
      let b = "Entrada";
      for (let L = 2; h.has(b); L++) b = `Entrada ${L}`;
      const E = d.map((L) => ke(L)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: c,
        label: b,
        itemId: this.newMenuItemId(b),
        parentId: E == null ? void 0 : E.itemId,
        parentLabel: E != null && E.itemId || E == null ? void 0 : E.label
      });
      return;
    }
    if (e === "etl-transform") {
      const c = this.dropChain(i).map((b) => (this.model.etlFlows ?? []).find((E) => E.id === b)).find(Boolean);
      if (!c) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const h = new Set((c.steps ?? []).map((b) => b.id));
      let k = (c.steps ?? []).length + 1;
      for (; h.has(`ets-${k}`); ) k++;
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
    if (e === "etl-flow" && !this.dropContainerFor(e, i)) {
      const d = this.uniquePaletteName(o.label, "etl-");
      s({ kind: "add-etl-flow", id: d.id, name: d.name }, d.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: d, name: c } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      s({
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
      const c = this.model.workflows ?? [], h = this.dropChain(i), k = h.map((z) => c.find((W) => W.id === z)).find(Boolean), b = h.map((z) => {
        const W = c.find((w) => (w.steps ?? []).some((S) => S.id === z));
        return W ? { owner: W, stepId: z } : null;
      }).find(Boolean);
      let E = k ?? (b == null ? void 0 : b.owner);
      if (!E && c.length === 1 && (E = c[0]), !E) {
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
      b && (t = { x: t.x + 190, y: t.y }), s(
        {
          kind: "add-workflow-step",
          workflowId: E.id,
          id: L,
          name: R,
          ...b ? { dependsOnStepIds: [b.stepId], afterStepId: b.stepId } : {}
        },
        L
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${E.name} — se ve en la vista Workflows`
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
      const { id: c, name: h } = this.uniquePaletteName("API", "api-"), k = { kind: "add-api", id: c, name: h }, b = this.inverseOf(k) ?? [];
      this.command(k, !1), this.model.externalSystems.some((z) => z.id === d) ? this.command({ kind: "set-api-publisher", id: c, targetId: d }, !1) : this.command({ kind: "add-api-implementation", apiId: c, boundedContextId: d }, !1);
      const E = this.viewLayout(this._view), L = this.sceneFor(this._view).nodes.find((z) => z.id === d), R = L ? { x: Math.round(t.x - L.x), y: Math.round(t.y - L.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...E, nodes: { ...E.nodes, [c]: R } }), this.pushUndoEntry([...b, { kind: "move-node", view: this._view, id: c, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, i);
    if (!p) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const y = {
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
      module: "cm-",
      "model-field": "f-",
      invariant: "inv-"
    }, { id: f, name: m } = this.uniquePaletteName(o.label, y[e] ?? "");
    if (e === "aggregate")
      s({ kind: "add-aggregate", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: p, id: f, name: m }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const d = (this.model.buttonGroups ?? []).find((k) => k.id === p), c = new Set(((d == null ? void 0 : d.buttons) ?? []).map((k) => k.id));
      let h = ((d == null ? void 0 : d.buttons) ?? []).length + 1;
      for (; c.has(`btn-${h}`); ) h++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${h}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: f, name: m });
    else if (e === "module")
      s({ kind: "add-module", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      s(
        { kind: "add-use-case", id: f, name: m, boundedContextId: p, ...e === "policy" ? { policy: !0 } : {} },
        f,
        p
      );
    else if (e === "domain-event")
      s({ kind: "add-domain-event", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "application-event")
      s({ kind: "add-application-event", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "domain-service")
      s({ kind: "add-domain-service", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "query-service")
      s({ kind: "add-query-service", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "scheduled-trigger")
      s({ kind: "add-scheduled-trigger", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      s({ kind: "add-notification", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      s({ kind: "add-document", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      s({ kind: "add-etl-flow", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const d = (this.model.aggregates ?? []).find((c) => c.id === p);
      s({ kind: "add-read-model", id: f, name: m, aggregateId: p }, f, (d == null ? void 0 : d.boundedContextId) ?? p);
    } else if (e === "api-operation") {
      const d = (this.model.apis ?? []).find((E) => E.id === p), c = new Set(((d == null ? void 0 : d.operations) ?? []).map((E) => E.id));
      let h = m, k = `apiop-${p.replace(/^api-/, "")}-${oe(h)}`;
      for (let E = 2; c.has(k); E++)
        h = `${o.label} ${E}`, k = `apiop-${p.replace(/^api-/, "")}-${oe(h)}`;
      s({ kind: "add-api-operation", apiId: p, id: k, name: h }, k, p), r.nodes.some(
        (E) => E.parentId === p && (E.kind === "api-operation" || E.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(d == null ? void 0 : d.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const d = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === p), c = new Set((d == null ? void 0 : d.stepIds) ?? []);
      let h = m, k = `step-${oe(h)}`;
      for (let b = 2; c.has(k); b++)
        h = `${o.label} ${b}`, k = `step-${oe(h)}`;
      s({ kind: "add-use-case-step", useCaseId: p, id: k, name: h }, k, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(d == null ? void 0 : d.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? s({ kind: "add-external-use-case", id: f, name: m, boundedContextId: p }, f, p) : e === "external-table" ? s({ kind: "add-external-table", id: f, name: m, boundedContextId: p }, f, p) : e === "mcp-server" && s({ kind: "add-mcp-server", id: f, name: m, boundedContextId: p }, f, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var m;
    const n = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const g = (this.model.modelMappings ?? []).find((d) => d.id === e);
      if (g) {
        this.command({
          kind: "set-page-button",
          pageId: n[1],
          useCaseId: n[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
        return;
      }
      const v = this.model.boundedContexts.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (v) {
        if (e === n[2]) return;
        const d = (this.model.pages ?? []).find((h) => h.id === n[1]), c = ((d == null ? void 0 : d.buttons) ?? []).find((h) => h.useCaseId === n[2]);
        if (!c) return;
        if (((d == null ? void 0 : d.buttons) ?? []).some((h) => h.useCaseId === e)) {
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
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${v.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const g = this.model.boundedContexts.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (!g) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const v = (this.model.pages ?? []).find((d) => d.id === o[1]);
      if (((v == null ? void 0 : v.buttons) ?? []).some((d) => d.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${g.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, r = a ? a[1] : t && (this.model.pages ?? []).some((g) => g.id === t) ? t : null;
    if (!r) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const l = a ? ((m = this.componentIn(r, a[2])) == null ? void 0 : m.node) ?? null : null, s = this.model.boundedContexts.flatMap((g) => g.useCases ?? []).find((g) => g.id === e);
    if (s) {
      (l == null ? void 0 : l.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: r, componentId: l.id, useCaseId: e, label: l.label ?? s.name }), this.emit("modux-notice", { message: `El botón lanza ${s.name}` })) : (this.command({ kind: "add-page-button", pageId: r, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${s.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((g) => g.id === e);
    if (p) {
      (l == null ? void 0 : l.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: r, componentId: l.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: r, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const y = (this.model.modelMappings ?? []).find((g) => g.id === e);
    if (y && (l == null ? void 0 : l.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: r, componentId: l.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${y.name}` });
      return;
    }
    const f = this.model.boundedContexts.flatMap((g) => (g.queryServices ?? []).flatMap((v) => (v.operations ?? []).map((d) => ({ op: d, qs: v })))).find(({ op: g }) => g.id === e);
    if (f) {
      (l == null ? void 0 : l.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: r,
        componentId: l.id,
        queryOperationId: f.op.id,
        queryServiceId: f.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: r, queryServiceId: f.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${f.op.name}` });
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
    const r = this._view, l = this.sceneFor(r), s = l.nodes.find((m) => m.id === e);
    if (!s) {
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
    const p = this.viewLayout(r), y = s.parentId ? l.nodes.find((m) => m.id === s.parentId) : void 0, f = y ? { x: Math.round(t.x - y.x), y: Math.round(t.y - y.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: r, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(r, { ...p, nodes: { ...p.nodes, [e]: f } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Po.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
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
                ${Gc.map((n) => {
      const o = t.filter((a) => a.group === n);
      return o.length ? A`
                        <div class="palette-g">${n}</div>
                        ${o.map(
        (a) => A`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(r) => this.onPaletteDragStart(r, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${St[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : A`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => A`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (o) => A`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${St[n.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
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
    var t, i, n, o, a, r, l;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const s = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!s) return;
        this.command({ kind: "add-aggregate", id: `agg-${oe(e)}`, name: e, boundedContextId: s });
      } else if (this._view === "flows") {
        const s = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), p = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), y = this._newTriggerEvent.trim();
        if (!s || !p || !y) return;
        this.command({
          kind: "add-flow",
          id: `flow-${oe(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: s,
          triggerEvent: y,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const s = this._newBoundedContextId || ((a = this.model.boundedContexts[0]) == null ? void 0 : a.id);
        if (!s) return;
        this.command({
          kind: "add-process",
          id: `proc-${oe(e)}`,
          name: e,
          boundedContextId: s,
          triggerAggregateId: this._newTriggerAggId || ((l = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : l.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Xa(i, t.nodes) : e === "flows" ? as(i, t.nodes) : e === "processes" ? Bn(i, t.nodes) : e === "workflows" ? gc(i, t.nodes) : e === "ui" ? wc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? Cc(i, t.nodes) : e === "mappings" ? kc(i, t.nodes) : e === "eventstorming" ? dc(i, t.nodes) : Wa(
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
    var s;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), n = new Set(i.map((p) => p.id)), o = {
      nodes: i,
      edges: t.edges.filter((p) => n.has(p.sourceId) && n.has(p.targetId))
    }, r = await Sc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), l = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: l.sizes }), await this.updateComplete, (s = this.renderRoot.querySelector("modux-canvas")) == null || s.fit();
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
    return A`
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
        ${this.viewSelection().length ? A`
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
        ${this._view === "aggregates" || this._view === "processes" ? A`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var i;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
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
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return A`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
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
                ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
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
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? A`<button
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
      ${this._view === "design" ? A`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? A`${this.renderPalette()}<modux-explorer
            class="yugo"
            .scene=${this.sceneFor(this._view)}
            .sceneKey=${`${this._view}:${this._detail}`}
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
      const { sourceId: i, targetId: n, x: o, y: a } = t.detail, r = (l) => this.model.boundedContexts.some((s) => s.id === l);
      if (this._view === "context-map" && r(i) && r(n)) {
        const l = this.model.relations.find(
          (s) => s.sourceId === i && s.targetId === n && s.declared
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
        "boundedContext",
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
          ></modux-explorer>` : this._tilt ? A`
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
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
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
      ["1 · 2 · 3 · 4", "Context map: contextos · detalle · operaciones · distribución"],
      ["5 · 6 · 7 · 8 · 9", "Flows · Procesos · Workflows · UI · Diseño"],
      ["A", "Vista de agregados"],
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
      (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => A`
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
    return e ? A`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => A`
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
    return e ? A`
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
    return e ? A`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => A`
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
        ${Yc.map(
      (n) => A`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${vn[n].abbr}</span>
              <span class="name">${vn[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Q.styles = xt`
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
ee([
  se({ attribute: !1 })
], Q.prototype, "model", 2);
ee([
  se({ attribute: !1 })
], Q.prototype, "layout", 2);
ee([
  se({ attribute: !1 })
], Q.prototype, "diff", 2);
ee([
  U()
], Q.prototype, "_view", 2);
ee([
  U()
], Q.prototype, "_detail", 2);
ee([
  U()
], Q.prototype, "_relationType", 2);
ee([
  U()
], Q.prototype, "_relationPicker", 2);
ee([
  U()
], Q.prototype, "_extDepPicker", 2);
ee([
  U()
], Q.prototype, "_selectedId", 2);
ee([
  U()
], Q.prototype, "_paletteOpen", 2);
ee([
  U()
], Q.prototype, "_yugo", 2);
ee([
  se({ attribute: !1 })
], Q.prototype, "repositories", 2);
ee([
  se({ type: Boolean, reflect: !0 })
], Q.prototype, "dark", 2);
ee([
  U()
], Q.prototype, "_repoPicker", 2);
ee([
  U()
], Q.prototype, "_wfStepPicker", 2);
ee([
  U()
], Q.prototype, "_branchCondEditor", 2);
ee([
  U()
], Q.prototype, "_paletteFilter", 2);
ee([
  U()
], Q.prototype, "_paletteTab", 2);
ee([
  U()
], Q.prototype, "_selectedCmp", 2);
ee([
  U()
], Q.prototype, "_fullscreen", 2);
ee([
  U()
], Q.prototype, "_tilt", 2);
ee([
  U()
], Q.prototype, "_helpOpen", 2);
ee([
  U()
], Q.prototype, "_newName", 2);
ee([
  U()
], Q.prototype, "_newBoundedContextId", 2);
ee([
  U()
], Q.prototype, "_newArchetype", 2);
ee([
  U()
], Q.prototype, "_newTriggerAggId", 2);
ee([
  U()
], Q.prototype, "_newTriggerEvent", 2);
ee([
  U()
], Q.prototype, "_newTargetId", 2);
ee([
  U()
], Q.prototype, "_undoStack", 2);
ee([
  U()
], Q.prototype, "_redoStack", 2);
ee([
  U()
], Q.prototype, "_newStepName", 2);
ee([
  U()
], Q.prototype, "_newStepType", 2);
ee([
  U()
], Q.prototype, "_newStepRole", 2);
ee([
  U()
], Q.prototype, "_newStepDeadline", 2);
ee([
  U()
], Q.prototype, "_editStepRole", 2);
ee([
  U()
], Q.prototype, "_editStepDeadline", 2);
ee([
  U()
], Q.prototype, "_editStepComp", 2);
ee([
  U()
], Q.prototype, "_newStepUseCase", 2);
ee([
  U()
], Q.prototype, "_newStepEmits", 2);
ee([
  U()
], Q.prototype, "_editStepUseCase", 2);
ee([
  U()
], Q.prototype, "_editStepEmits", 2);
ee([
  U()
], Q.prototype, "_editStepAwaits", 2);
ee([
  U()
], Q.prototype, "_multi", 2);
ee([
  U()
], Q.prototype, "_newViewName", 2);
ee([
  U()
], Q.prototype, "_activeViewId", 2);
ee([
  U()
], Q.prototype, "_newRagSourceType", 2);
ee([
  U()
], Q.prototype, "_newRagSourceUri", 2);
ee([
  U()
], Q.prototype, "_addMemberKey", 2);
ee([
  U()
], Q.prototype, "_treeOpen", 2);
ee([
  U()
], Q.prototype, "_deletePicker", 2);
Q = ee([
  vt("modux-editor")
], Q);
var Zc = Object.defineProperty, ep = Object.getOwnPropertyDescriptor, ve = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ep(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Zc(t, i, o), o;
};
let he = class extends Ge {
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
    return A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: o, mark: a, cls: r }) => {
      const l = this._diff.changes.filter((s) => s.kind === n);
      return l.length ? A`
            <div class="diff-group">${o} (${l.length})</div>
            ${l.map(
        (s) => A`
                <div class="diff-row">
                  <span class="diff-mark ${r}">${a}</span>
                  <span class="diff-type">${t(s.type)}</span>
                  <span class="diff-name" title=${s.id}>${s.name ?? s.id}</span>
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
    var o, a, r;
    const i = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var l;
      try {
        const s = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!s.ok) {
          let p = `El servidor rechazó la operación (${s.status})`;
          try {
            const y = await s.json();
            y != null && y.message && (p = y.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        this._workspace = await s.json(), await this.reload(), await this.refreshDiff(), (l = this.renderRoot.querySelector("modux-editor")) == null || l.clearHistory();
      } catch (s) {
        this.showToast(String(s));
      }
    });
    const n = (a = this._workspace) == null ? void 0 : a.current;
    if (n && n !== i) {
      const l = ((r = this._workspace.solutions.find((s) => s.branch === n)) == null ? void 0 : r.name) ?? n.replace(/^solution\//, "");
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
    return this._tagsOpen ? A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => A`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : A`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: n, homeExternalId: o, homeBoundedContextId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const r = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!r.ok) {
          let y = `El servidor rechazó el contrato (${r.status})`;
          try {
            const f = await r.json();
            f != null && f.message && (y = f.message);
          } catch {
          }
          this.showToast(y);
          return;
        }
        const { apiId: l } = await r.json(), s = o ? { kind: "set-api-publisher", id: l, targetId: o } : a ? { kind: "add-api-implementation", apiId: l, boundedContextId: a } : null;
        s && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(s)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${l}`, "info");
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
              ${this._taggingVersion ? A`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : A`<button
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
        (o) => o.branch === this._workspace.current
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
      ${this.renderTagsPanel()}
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
he.styles = xt`
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
  boundedContexts: "Contexto",
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
ve([
  se()
], he.prototype, "base", 2);
ve([
  U()
], he.prototype, "_model", 2);
ve([
  U()
], he.prototype, "_layout", 2);
ve([
  U()
], he.prototype, "_error", 2);
ve([
  U()
], he.prototype, "_saving", 2);
ve([
  U()
], he.prototype, "_toast", 2);
ve([
  U()
], he.prototype, "_workspace", 2);
ve([
  U()
], he.prototype, "_creatingSolution", 2);
ve([
  U()
], he.prototype, "_newSolutionName", 2);
ve([
  U()
], he.prototype, "_taggingVersion", 2);
ve([
  U()
], he.prototype, "_newTagName", 2);
ve([
  U()
], he.prototype, "_tagsOpen", 2);
ve([
  U()
], he.prototype, "_tags", 2);
ve([
  U()
], he.prototype, "_repositories", 2);
ve([
  U()
], he.prototype, "_diff", 2);
ve([
  U()
], he.prototype, "_diffListOpen", 2);
ve([
  U()
], he.prototype, "_mergeFlow", 2);
ve([
  U()
], he.prototype, "_dark", 2);
he = ve([
  vt("modux-editor-connected")
], he);
export {
  tp as CONTAINER_HEADER,
  ip as CONTAINER_INSET,
  Ie as ModuxCanvas,
  Q as ModuxEditor,
  he as ModuxEditorConnected,
  Xa as aggregatesScene,
  mt as apiImplNodeId,
  ut as apiOpOccurrenceId,
  Mi as containerFit,
  Na as containerMinSize,
  Wa as contextMapScene,
  Ua as flowCoherence,
  as as flowsScene,
  pi as normalizeViewLayout,
  Bn as processesScene,
  za as relationEdgeId,
  Fi as resolveOverlaps
};
