const dp = 34, lp = 10;
function ji(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let r = 0; r < e.length; r++)
      for (let p = r + 1; p < e.length; p++) {
        const s = e[r], c = e[p], h = i.get(s.id), y = i.get(c.id), m = y.x - h.x, g = y.y - h.y, v = (s.w + c.w) / 2 + t - Math.abs(m), d = (s.h + c.h) / 2 + t - Math.abs(g);
        if (!(v <= 0 || d <= 0))
          if (a = !0, v < d) {
            const l = (m >= 0 ? 1 : -1) * v / 2;
            h.x -= l, y.x += l;
          } else {
            const l = (g >= 0 ? 1 : -1) * d / 2;
            h.y -= l, y.y += l;
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
function Ba(e, t = { w: 160, h: 90 }) {
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
function Ni(e, t, i) {
  let n = t.w / 2, o = t.w / 2, a = t.h / 2, r = t.h / 2;
  for (const p of i)
    n = Math.max(n, -p.dx + p.w / 2 + 10), o = Math.max(o, p.dx + p.w / 2 + 10), a = Math.max(a, -p.dy + p.h / 2 + 34), r = Math.max(r, p.dy + p.h / 2 + 10);
  return {
    x: e.x + (o - n) / 2,
    y: e.y + (r - a) / 2,
    w: n + o,
    h: a + r
  };
}
function hi(e) {
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
const Fa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, qn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Wa = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, We = 168, Ve = 56;
function mt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ut(e, t) {
  return `apiop:${e}@${t}`;
}
const Bn = { compact: 0, coarse: 1, full: 2 };
function Fn(e, t, i) {
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", o = e ? n : t;
  return { form: o, collapsed: Bn[e ? t : n] > Bn[o] };
}
function zo(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: mt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const Uo = 34, qo = 14, Va = 14, Ce = 108, xe = 32, $n = 12, Ri = 10, at = 2, Bo = at * Ce + (at - 1) * $n + 2 * qo;
function Ha(e, t) {
  return `rel:${e}->${t}`;
}
function ja(e, t) {
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
const Li = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Zt = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" },
  "external-system": { symbol: "component", fill: "#ffffff", stroke: "#64748b" },
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
}, Tt = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo",
  "external-system": "Subsistema",
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
function Di(e) {
  const t = Math.max(1, Math.ceil(e / at)), i = t * xe + (t - 1) * Ri;
  return { w: Bo, h: Uo + i + Va };
}
function Mt(e, t) {
  const i = e % at, n = Math.floor(e / at);
  return {
    x: -t.w / 2 + qo + i * (Ce + $n) + Ce / 2,
    y: -t.h / 2 + Uo + n * (xe + Ri) + xe / 2
  };
}
function Fo(e, t) {
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
function Ga(e, t, i, n, o, a, r = !1) {
  const p = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...zo(e, t.id),
    ...Fo(e, t)
  ];
  if (!p.length)
    return [{ ...n, x: i.x, y: i.y, w: We, h: Ve }];
  if (r) {
    const s = new Map((e.apis ?? []).map((h) => [h.id, h])), c = (e.apiImplementations ?? []).filter((h) => h.boundedContextId === t.id && s.has(h.apiId)).map((h) => {
      const y = s.get(h.apiId);
      return {
        id: mt(h.apiId, h.boundedContextId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((m) => ({
          id: ut(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (c.length > 0) {
      const h = p.filter((y) => y.kind !== "api-impl");
      return Wo(i, n, c, h, o, a);
    }
  }
  return Gt(i, n, p, o, a);
}
function Wo(e, t, i, n, o, a, r = /* @__PURE__ */ new Set()) {
  const p = a[t.id] ?? Di(i.length + n.length), s = i.map((g, v) => {
    const d = o[g.id] ?? Mt(v, p), l = r.has(g.id) ? [] : g.ops, f = a[g.id] ?? Di(l.length), k = l.map((_, R) => o[_.id] ?? Mt(R, f)), b = Ni(
      { x: d.x, y: d.y },
      f,
      k.map((_) => ({ dx: _.x, dy: _.y, w: Ce, h: xe }))
    );
    return { a: g, off: d, ops: l, opOffs: k, fit: b };
  }), c = n.map(
    (g, v) => o[g.id] ?? Mt(i.length + v, p)
  ), h = ji(
    [
      ...s.map((g) => ({ id: g.a.id, x: g.fit.x, y: g.fit.y, w: g.fit.w, h: g.fit.h })),
      ...n.map((g, v) => ({
        id: g.id,
        x: c[v].x,
        y: c[v].y,
        w: Ce,
        h: xe
      }))
    ],
    24
  );
  for (const g of s) {
    const v = h.get(g.a.id);
    v && (g.off = { x: g.off.x + (v.x - g.fit.x), y: g.off.y + (v.y - g.fit.y) }, g.fit = { ...g.fit, x: v.x, y: v.y });
  }
  n.forEach((g, v) => {
    const d = h.get(g.id);
    d && (c[v] = { x: d.x, y: d.y });
  });
  const y = Ni(e, p, [
    ...s.map((g) => ({ dx: g.fit.x, dy: g.fit.y, w: g.fit.w, h: g.fit.h })),
    ...c.map((g) => ({ dx: g.x, dy: g.y, w: Ce, h: xe }))
  ]), m = [
    { ...t, x: y.x, y: y.y, w: y.w, h: y.h, container: !0 }
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
        w: Ce,
        h: xe,
        tooltip: `${Tt[g.a.opKind]}: ${v.name}`
      });
    });
  return n.forEach((g, v) => {
    const d = Zt[g.kind];
    m.push({
      id: g.id,
      label: g.name,
      kind: g.kind,
      x: e.x + c[v].x,
      y: e.y + c[v].y,
      w: Ce,
      h: xe,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${Tt[g.kind]} ${g.name}`
    });
  }), m;
}
const Ka = [
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
], Wn = 20, Vn = 28, jt = 10, qt = Bo + 2 * jt;
function Ya(e, t, i, n, o, a, r = /* @__PURE__ */ new Set()) {
  const p = Fo(e, t), s = new Map(p.map((b) => [b.id, b])), c = (e.modules ?? []).filter((b) => b.boundedContextId === t.id);
  if (c.length <= 1)
    return [{
      ...n,
      collapsible: !1,
      collapsed: !1,
      x: i.x,
      y: i.y,
      w: We,
      h: Ve,
      tooltip: `${t.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos`
    }];
  const h = new Set(c.flatMap((b) => b.elementIds ?? [])), m = c.some((b) => r.has(b.id)) ? p.filter((b) => !h.has(b.id)) : [], g = a[n.id] ?? Di(c.length + m.length), v = c.map((b, _) => {
    const R = r.has(b.id), L = R ? (b.elementIds ?? []).map((E) => s.get(E)).filter((E) => !!E) : [], D = R ? Ka.map((E) => {
      const H = L.filter((I) => E.kinds.includes(I.kind)), oe = Math.ceil(H.length / at), te = Wn + (oe ? oe * xe + (oe - 1) * Ri + 8 : 8);
      return { layer: E, chips: H, rows: oe, h: te };
    }) : [], W = R ? Vn + D.reduce((E, H) => E + H.h, 0) + jt : 56, w = o[b.id] ?? Mt(_, g);
    return { cm: b, expanded: R, bands: D, boxH: W, off: w };
  }), d = m.map(
    (b, _) => o[b.id] ?? Mt(v.length + _, g)
  ), l = ji(
    [
      ...v.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: qt, h: b.boxH })),
      ...m.map((b, _) => ({ id: b.id, x: d[_].x, y: d[_].y, w: Ce, h: xe }))
    ],
    24
  );
  for (const b of v) {
    const _ = l.get(b.cm.id);
    _ && (b.off = { x: _.x, y: _.y });
  }
  m.forEach((b, _) => {
    const R = l.get(b.id);
    R && (d[_] = { x: R.x, y: R.y });
  });
  const f = Ni(i, g, [
    ...v.map((b) => ({ dx: b.off.x, dy: b.off.y, w: qt, h: b.boxH })),
    ...d.map((b) => ({ dx: b.x, dy: b.y, w: Ce, h: xe }))
  ]), k = [
    { ...n, x: f.x, y: f.y, w: f.w, h: f.h, container: !0 }
  ];
  for (const b of v) {
    const _ = i.x + b.off.x, R = i.y + b.off.y;
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
      x: _,
      y: R,
      w: qt,
      h: b.boxH,
      tooltip: b.expanded ? `${b.cm.name} — módulo desplegado: arrastra el asa de un elemento suelto hasta él para empaquetarlo; el chevron lo pliega` : `${b.cm.name} — módulo: el chevron lo abre para ver y empaquetar su contenido`
    }), !b.expanded) continue;
    let L = -b.boxH / 2 + Vn;
    for (const D of b.bands) {
      const W = `hexlayer:${b.cm.id}:${D.layer.key}`;
      k.push({
        id: W,
        label: D.layer.label,
        kind: "hex-layer",
        fill: D.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: b.cm.id,
        x: _,
        y: R + L + D.h / 2,
        w: qt - 2 * jt,
        h: D.h,
        tooltip: `Capa de ${D.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), D.chips.forEach((w, E) => {
        const H = E % at, oe = Math.floor(E / at), te = w.policy ? Li : Zt[w.kind];
        k.push({
          id: w.id,
          label: w.name,
          kind: w.kind,
          x: _ - (qt - 2 * jt) / 2 + jt + H * (Ce + $n) + Ce / 2,
          y: R + L + Wn + oe * (xe + Ri) + xe / 2,
          w: Ce,
          h: xe,
          symbol: te.symbol,
          fill: te.fill,
          stroke: te.stroke,
          parentId: W,
          tooltip: `${w.policy ? "Policy" : Tt[w.kind]} ${w.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), L += D.h;
    }
  }
  return m.forEach((b, _) => {
    const R = b.policy ? Li : Zt[b.kind];
    k.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + d[_].x,
      y: i.y + d[_].y,
      w: Ce,
      h: xe,
      symbol: R.symbol,
      fill: R.fill,
      stroke: R.stroke,
      parentId: n.id,
      tooltip: `${b.policy ? "Policy" : Tt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), k;
}
function Gt(e, t, i, n, o) {
  const a = o[t.id] ?? Di(i.length), r = (m) => {
    const g = m.children ?? [], v = g.length ? { w: Ce + 16, h: 22 + g.length * (xe + 6) + 8 } : { w: Ce, h: xe }, d = m.kind === "external-system" ? o[m.id] : void 0;
    return { w: Math.max(v.w, (d == null ? void 0 : d.w) ?? 0), h: Math.max(v.h, (d == null ? void 0 : d.h) ?? 0) };
  }, p = i.map((m, g) => n[m.id] ?? Mt(g, a)), s = ji(
    i.map((m, g) => ({ id: m.id, x: p[g].x, y: p[g].y, ...r(m) })),
    10
  );
  i.forEach((m, g) => {
    const v = s.get(m.id);
    v && (p[g] = { x: v.x, y: v.y });
  });
  const c = Ni(
    e,
    a,
    p.map((m, g) => ({ dx: m.x, dy: m.y, ...r(i[g]) }))
  ), h = {
    ...t,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, y = i.flatMap((m, g) => {
    const v = p[g], d = m.policy ? Li : Zt[m.kind], l = r(m), f = {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + v.x,
      y: e.y + v.y,
      ...l,
      resizable: m.kind === "external-system" || void 0,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Tt[m.kind]} ${m.name}`
    }, k = (m.children ?? []).map((b, _) => {
      const R = b.policy ? Li : Zt[b.kind];
      return {
        id: b.id,
        label: b.name,
        kind: b.kind,
        x: f.x,
        y: f.y - l.h / 2 + 22 + _ * (xe + 6) + xe / 2,
        w: Ce - 8,
        h: xe,
        symbol: R.symbol,
        fill: R.fill,
        stroke: R.stroke,
        parentId: m.id,
        tooltip: `${Tt[b.kind]} ${b.name} — publicada por ${m.name}`
      };
    });
    return [f, ...k];
  });
  return [h, ...y];
}
function Xa(e, t, i = "contexts", n = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", r = i === "contexts", p = a || r, s = o, c = i !== "contexts", h = i === "operations", y = new Set(e.externalSystems.map((u) => u.id)), m = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && y.has(u.publishedByExternalSystemId)
  ), g = new Set(m.map((u) => u.id)), v = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && y.has(u.publishedByExternalSystemId)
  ), d = new Set(v.map((u) => u.id)), l = [
    ...e.boundedContexts.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((u) => !u.parentExternalSystemId || !y.has(u.parentExternalSystemId)).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...p ? [] : (e.apis ?? []).filter((u) => !g.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...p ? [] : (e.proxyApis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...p ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...p ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerBoundedContextId).map((u) => ({
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
  ], f = l.flatMap((u, O) => {
    const B = t[u.ref.id] ?? dt(O, l.length);
    if ("idp" in u && u.idp) {
      const K = u.ref, pe = !!K.publishedByExternalSystemId;
      return [{
        id: K.id,
        label: K.name,
        kind: "identity-provider",
        symbol: "key",
        fill: pe ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: pe,
        badge: K.type ?? "IDP",
        tooltip: `${K.name} — emite las identidades que el sistema confía${pe ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: B.x,
        y: B.y,
        w: We,
        h: Ve
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
        x: B.x,
        y: B.y,
        w: We,
        h: Ve
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
        x: B.x,
        y: B.y,
        w: We,
        h: Ve
      }];
    }
    if (u.proxy) {
      const K = u.ref, pe = {
        id: K.id,
        label: K.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${K.name} — proxy/cache de una API, consumible como ella`
      };
      if (h && K.targetApiId) {
        const _t = (e.apis ?? []).find(($t) => $t.id === K.targetApiId), tt = (_t == null ? void 0 : _t.operations) ?? [];
        if (tt.length > 0)
          return Gt(
            B,
            pe,
            tt.map(($t) => ({
              id: ut($t.id, K.id),
              name: $t.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
          );
      }
      return [{ ...pe, x: B.x, y: B.y, w: We, h: Ve }];
    }
    if (u.api) {
      const K = u.ref, pe = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(K.id) ? !c : c) && K.operations.length > 0 ? Gt(
        B,
        { ...pe, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (tt) => ({ id: tt.id, name: tt.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{
        ...pe,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: B.x,
        y: B.y,
        w: We,
        h: Ve
      }];
    }
    if (u.external) {
      const K = u.ref, pe = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: K.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: K.referencedRepositoryId ? `${K.name} — otro proyecto modux (repositorio ${K.referencedRepositoryId}), referenciado del catálogo` : `${K.name} (sistema externo)`
      }, _t = new Set(
        e.externalSystems.filter((ne) => ne.parentExternalSystemId === K.id).map((ne) => ne.id)
      ), tt = (ne) => ne === K.id || ne !== void 0 && _t.has(ne), $t = (ne) => {
        var _e;
        return ((_e = e.externalSystems.find((ve) => ve.id === ne)) == null ? void 0 : _e.name) ?? K.name;
      }, pi = m.filter((ne) => tt(ne.publishedByExternalSystemId)), Ji = v.filter((ne) => tt(ne.publishedByExternalSystemId)), Ua = pi.filter((ne) => ne.publishedByExternalSystemId === K.id), qa = Ji.filter((ne) => ne.publishedByExternalSystemId === K.id), ui = [
        ...e.externalSystems.filter((ne) => ne.parentExternalSystemId === K.id).map((ne) => ({
          id: ne.id,
          name: ne.name,
          kind: "external-system",
          children: [
            ...m.filter((_e) => _e.publishedByExternalSystemId === ne.id).map((_e) => ({ id: _e.id, name: _e.name, kind: "api" })),
            ...v.filter((_e) => _e.publishedByExternalSystemId === ne.id).map((_e) => ({ id: _e.id, name: _e.name, kind: "proxy-api" }))
          ]
        })),
        ...(K.useCases ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (ne) => ({ id: ne.id, name: ne.name, kind: "mcp-server" })
        )
      ], Dn = ui.filter((ne) => ne.kind === "external-system"), Qi = pi.length > 0 || Ji.length > 0 || Dn.length > 0, Zi = Qi || ui.length > 0, { form: mi, collapsed: en } = Fn(
        o.has(K.id),
        // Deployment is topology: external systems join compact, like the boundedContexts.
        a ? "compact" : c ? "full" : Qi ? "coarse" : "compact",
        ui.length > 0 || h && Qi
      ), zn = [
        ...qa.map((ne) => ({ id: ne.id, name: ne.name, kind: "proxy-api" })),
        ...mi === "full" ? ui : Dn
      ], tn = h && mi === "full" ? Ji.filter((ne) => {
        const _e = ne.targetApiId ? (e.apis ?? []).find((ve) => ve.id === ne.targetApiId) : void 0;
        return ((_e == null ? void 0 : _e.operations) ?? []).length > 0;
      }) : [];
      if (h && mi === "full" && (pi.length > 0 || tn.length > 0)) {
        const ne = [
          ...pi.map((ve) => ({
            id: ve.id,
            name: ve.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${ve.name} — API publicada por ${$t(ve.publishedByExternalSystemId)}`,
            opKind: "api-operation",
            ops: (ve.operations ?? []).map((Ut) => ({ id: Ut.id, name: Ut.name }))
          })),
          ...tn.map((ve) => {
            const Ut = (e.apis ?? []).find((fi) => fi.id === ve.targetApiId);
            return {
              id: ve.id,
              name: ve.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ve.name} — proxy/cache de ${Ut.name}`,
              opKind: "api-op-occurrence",
              ops: (Ut.operations ?? []).map((fi) => ({
                id: ut(fi.id, ve.id),
                name: fi.name
              }))
            };
          })
        ], _e = new Set(tn.map((ve) => ve.id));
        return Wo(
          B,
          { ...pe, collapsible: !0, collapsed: en },
          ne,
          zn.filter((ve) => !_e.has(ve.id)),
          t,
          n,
          s
        );
      }
      const Un = mi === "compact" ? [] : [
        ...Ua.map((ne) => ({ id: ne.id, name: ne.name, kind: "api" })),
        ...zn
      ];
      if (Un.length > 0)
        return Gt(
          B,
          { ...pe, collapsible: Zi, collapsed: en },
          Un,
          t,
          n
        );
      const Ct = n[K.id];
      return [{
        ...pe,
        collapsible: Zi,
        collapsed: Zi && en,
        resizable: !0,
        x: B.x,
        y: B.y,
        w: (Ct == null ? void 0 : Ct.w) ?? We,
        h: (Ct == null ? void 0 : Ct.h) ?? Ve
      }];
    }
    const X = u.ref, Y = X.subdomainType ?? "GENERIC", fe = {
      id: X.id,
      label: X.name,
      kind: "boundedContext",
      symbol: "component",
      fill: Fa[Y],
      stroke: "#94a3b8",
      badge: Y,
      tooltip: `${X.name} — subdominio ${Y}`
    }, Be = zo(e, X.id), Dt = (e.aggregates ?? []).some((K) => K.boundedContextId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerBoundedContextId === X.id) || (e.notifications ?? []).some((K) => K.ownerBoundedContextId === X.id) || (e.documents ?? []).some((K) => K.ownerBoundedContextId === X.id), rt = Dt || Be.length > 0, { form: zt, collapsed: kt } = Fn(
      o.has(X.id),
      c ? "full" : Be.length > 0 ? "coarse" : "compact",
      Dt
    );
    return a ? Ya(
      e,
      X,
      B,
      { ...fe, collapsible: !1, collapsed: !1 },
      t,
      n,
      o
    ) : zt === "full" && rt ? Ga(
      e,
      X,
      B,
      { ...fe, collapsible: !0, collapsed: kt },
      t,
      n,
      h
    ) : zt === "coarse" && Be.length > 0 ? Gt(
      B,
      { ...fe, collapsible: rt, collapsed: kt },
      Be,
      t,
      n
    ) : [{
      ...fe,
      collapsible: rt,
      collapsed: rt && kt,
      x: B.x,
      y: B.y,
      w: We,
      h: Ve
    }];
  }), k = p ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, b = l.length + k.actors.length + k.aiAgents.length + k.rags.length + k.mcpGateways.length;
  k.actors.forEach((u, O) => {
    const B = t[u.id] ?? dt(l.length + O, b);
    f.push({
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
    const B = t[u.id] ?? dt(l.length + (e.actors ?? []).length + O, b);
    f.push({
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
      l.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      b
    );
    f.push({
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
  const _ = [];
  if (k.rags.forEach((u, O) => {
    const B = t[u.id] ?? dt(
      l.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      b
    );
    f.push({
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
    }), (u.contentSources ?? []).forEach((X, Y) => {
      const fe = `ragcs:${u.id}:${X.uri}`, Be = t[fe] ?? { x: B.x + 170, y: B.y - 30 + Y * 44 };
      f.push({
        id: fe,
        label: X.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Be.x,
        y: Be.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: X.type,
        tooltip: `${X.type}: ${X.uri}`
      }), _.push({
        id: `ragcse:${u.id}:${X.uri}`,
        sourceId: fe,
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
      const Y = t[B.id] ?? dt(l.length + X, l.length + u.length);
      f.push({
        id: B.id,
        label: B.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${B.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: Y.x,
        y: Y.y,
        w: We,
        h: Ve
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
      const Y = t[B.id] ?? dt(
        l.length + u.length + X,
        l.length + u.length + O.length
      );
      f.push({
        id: B.id,
        label: B.label,
        kind: "infrastructure",
        symbol: B.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: B.badge,
        tooltip: B.tooltip,
        x: Y.x,
        y: Y.y,
        w: We,
        h: Ve
      });
    });
  }
  f.sort((u, O) => (u.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const R = e.relations.map((u) => ({
    id: Ha(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? qn[u.type] : u.inferredType ? `≈${qn[u.inferredType]}` : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : u.inferredType ? `≈ ${u.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), L = e.flows.map((u) => {
    var Be, Dt, rt, zt, kt, K;
    const O = ja(e, u), B = c ? e.boundedContexts.find((pe) => pe.id === u.sourceId) : void 0, X = ((Be = B == null ? void 0 : B.domainEvents) == null ? void 0 : Be.find((pe) => pe.name === u.triggerEvent)) ?? ((Dt = B == null ? void 0 : B.applicationEvents) == null ? void 0 : Dt.find((pe) => pe.name === u.triggerEvent)), Y = c && u.readModelName ? (zt = (rt = e.boundedContexts.find((pe) => pe.id === u.targetId)) == null ? void 0 : rt.readModels) == null ? void 0 : zt.find((pe) => pe.name === u.readModelName) : void 0, fe = c && u.targetUseCaseId ? (K = (kt = e.boundedContexts.find((pe) => pe.id === u.targetId)) == null ? void 0 : kt.useCases) == null ? void 0 : K.find((pe) => pe.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? u.sourceId,
      targetId: (fe == null ? void 0 : fe.id) ?? (Y == null ? void 0 : Y.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: Wa[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${O}`
    };
  }), D = new Map((e.apis ?? []).map((u) => [u.id, u])), W = new Set(e.boundedContexts.map((u) => u.id)), w = (e.apiImplementations ?? []).filter(
    (u) => D.has(u.apiId) && W.has(u.boundedContextId)
  ), E = new Set(f.map((u) => u.id)), H = a ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.moduleIds ?? []).map((O) => {
        var X;
        if (!E.has(u.id)) return null;
        const B = E.has(O) ? O : (X = (e.modules ?? []).find((Y) => Y.id === O)) == null ? void 0 : X.boundedContextId;
        return !B || !E.has(B) ? null : {
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
  ] : [], oe = c ? (e.emissions ?? []).filter((u) => E.has(u.sourceId) && E.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], te = c ? (e.projections ?? []).map((u) => ({
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
      const B = c && O.targetUseCaseId && E.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetBoundedContextId && E.has(O.targetBoundedContextId) ? O.targetBoundedContextId : (O.targetUseCaseId && !c, null);
      if (!B) return [];
      const X = c && E.has(O.id) ? O.id : u.id;
      return E.has(X) ? [
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
  ), P = c ? (e.useCaseCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], C = [
    ...e.boundedContexts.filter((u) => u.identityProviderId && E.has(u.id) && E.has(u.identityProviderId)).map((u) => ({
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
      const O = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
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
  ], x = c ? e.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && E.has(u.id) && E.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], $ = c ? (e.aggregateCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], M = c ? (e.queryCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], S = c ? (e.actorUses ?? []).filter((u) => E.has(u.actorId) && E.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], T = (e.actorExternalDependencies ?? []).filter((u) => E.has(u.actorId) && E.has(u.externalSystemId)).map((u) => ({
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
  ]), z = (u) => E.has(u) ? u : N.get(u) ?? u, q = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: z(u.targetId),
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
  ], j = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.useCases ?? []) j.set(O.id, u.id);
    for (const O of u.domainEvents ?? []) j.set(O.id, u.id);
    for (const O of u.applicationEvents ?? []) j.set(O.id, u.id);
    for (const O of u.queryServices ?? []) j.set(O.id, u.id);
  }
  const de = (u) => E.has(u) ? u : j.get(u) ?? u, ce = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.domainEvents ?? []) ce.set(O.name, O.id);
    for (const O of u.applicationEvents ?? []) ce.set(O.name, O.id);
  }
  const F = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (u) => (u.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: u.id, targetId: de(O.targetUseCaseId) }))
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
      (e.workflows ?? []).filter((u) => u.triggerEvent && ce.has(u.triggerEvent)).map((u) => ({
        sourceId: de(ce.get(u.triggerEvent)),
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
  ], ue = /* @__PURE__ */ new Map();
  for (const u of e.externalSystems)
    for (const O of u.tables ?? []) ue.set(O.id, u.id);
  const ye = (e.notifications ?? []).flatMap((u) => {
    var X;
    const O = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!O) return [];
    const B = [];
    if (u.eventId) {
      const Y = E.has(u.eventId) ? u.eventId : j.get(u.eventId);
      Y && E.has(Y) && Y !== O && B.push({
        id: `notif:${u.id}`,
        sourceId: Y,
        targetId: O,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const Y of u.recipientRoleIds ?? [])
      E.has(Y) && B.push({
        id: `notifto:${u.id}:${Y}`,
        sourceId: O,
        targetId: Y,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((X = (u.channels ?? [])[0]) == null ? void 0 : X.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} avisa a este rol — Supr lo quita`
      });
    return B;
  }), Fe = (e.documents ?? []).flatMap((u) => {
    const O = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!O || !u.queryServiceId) return [];
    const B = E.has(u.queryServiceId) ? u.queryServiceId : j.get(u.queryServiceId);
    return !B || !E.has(B) || B === O ? [] : [{
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
  }), Se = (e.etlFlows ?? []).flatMap(
    (u) => (u.steps ?? []).flatMap((O) => {
      const B = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      if (!B) return [];
      const X = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!X) return [];
      let Y = X;
      if (!E.has(Y) && O.operationId && O.apiId && (Y = O.apiId), !E.has(Y) && O.externalTableId && (Y = ue.get(O.externalTableId) ?? Y), E.has(Y) || (Y = z(Y)), E.has(Y) || (Y = j.get(X) ?? Y), !E.has(Y) || Y === B) return [];
      const fe = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${O.id}`,
        sourceId: fe ? Y : B,
        targetId: fe ? B : Y,
        kind: fe ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: fe ? `${u.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${u.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), V = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: E.has(O) ? O : ue.get(O) ?? O,
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
          sourceId: z(O),
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
  ], Ee = [
    ...new Map(
      (e.rags ?? []).flatMap((u) => [
        ...(u.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name })),
        ...(u.sourceBoundedContextIds ?? []).map((O) => ({ sourceId: O, targetId: u.id, name: u.name }))
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
  ], Oe = [
    ...new Map(
      (e.agentApiUses ?? []).map((u) => ({ sourceId: u.agentId, targetId: z(u.apiId) })).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => [
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
  ], qe = (u) => u.onCompletionEventName || `${u.name.replace(/\s+/g, "")}Completado`, Ne = (e.workflows ?? []).flatMap(
    (u) => u.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== u.id && qe(O) === u.triggerEvent).filter((O) => E.has(O.id) && E.has(u.id)).map((O) => ({
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
  ), et = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: z(u.id), targetId: z(u.targetApiId) })).filter(
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
  ], wt = w.flatMap((u) => {
    const O = mt(u.apiId, u.boundedContextId);
    if (!E.has(O)) return [];
    const B = [];
    for (const X of (e.proxyApis ?? []).filter((Y) => Y.targetApiId === u.apiId)) {
      const Y = z(X.id);
      E.has(Y) && Y !== O && B.push({
        id: `pxr:${Y}->${O}`,
        sourceId: Y,
        targetId: O,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return B;
  }), ci = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const O = (e.proxyApis ?? []).find((Y) => Y.id === u.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const B = ut(u.operationId, u.proxyId), X = u.targetSiteId === O.targetApiId ? O.targetApiId : mt(O.targetApiId, u.targetSiteId);
    return !E.has(B) || !E.has(X) ? [] : [{
      id: `oproute:${B}->${X}`,
      sourceId: B,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ka = [
    ...new Map(
      (e.externalOperationUses ?? []).map((u) => {
        if (!E.has(u.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (fe) => fe.operations.some((Be) => Be.id === u.operationId)
        );
        if (!O) return null;
        const B = u.siteId === O.id, X = B ? u.operationId : ut(u.operationId, u.siteId);
        let Y = E.has(X) ? X : null;
        if (!Y)
          if (B || (e.proxyApis ?? []).some((fe) => fe.id === u.siteId))
            Y = z(u.siteId);
          else {
            const fe = mt(O.id, u.siteId);
            Y = E.has(fe) ? fe : u.siteId;
          }
        return !Y || !E.has(Y) || Y === u.externalSystemId ? null : { u, target: Y };
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
  ], _a = c ? (e.apiOperationImplementations ?? []).flatMap((u) => {
    if (!E.has(u.useCaseId)) return [];
    const O = E.has(ut(u.operationId, u.boundedContextId)) ? ut(u.operationId, u.boundedContextId) : E.has(mt(u.apiId, u.boundedContextId)) ? mt(u.apiId, u.boundedContextId) : E.has(z(u.boundedContextId)) ? z(u.boundedContextId) : null;
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
  }) : [], $a = c ? (e.agentUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ca = (e.agentRags ?? []).filter((u) => E.has(u.agentId) && E.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Sa = c ? (e.rags ?? []).filter((u) => E.has(u.id)).flatMap(
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
  ) : [], Ea = c ? (e.agentExternalUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Aa = c ? (e.agentMcpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.mcpServerId)).map((u) => ({
    id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
    sourceId: u.agentId,
    targetId: u.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ma = (e.mcpGateways ?? []).flatMap(
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
  ), Pa = (e.agentGatewayUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ta = c ? (e.agentApiOpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Oa = c ? (e.agentQueryUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Na = (e.agentDelegations ?? []).filter((u) => E.has(u.agentId) && E.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ra = (e.actorAgentUses ?? []).filter((u) => E.has(u.actorId) && E.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), La = c ? (e.agentTriggers ?? []).filter((u) => E.has(u.eventId) && E.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Da = c ? (e.externalCalls ?? []).filter((u) => E.has(u.externalSystemId) && E.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], za = c ? (e.externalUseCaseCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
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
    nodes: f,
    edges: [
      ...H,
      ...R,
      ...L,
      ...oe,
      ...te,
      ...I,
      ...P,
      ...x,
      ...C,
      ...ye,
      ...Fe,
      ...Se,
      ...$,
      ...M,
      ...S,
      ...T,
      ...q,
      ...et,
      ...wt,
      ...ci,
      ...ka,
      ..._a,
      ...F,
      ...G,
      ...Ne,
      ...Oe,
      ...V,
      ...Z,
      ...Ee,
      ...$a,
      ...Ea,
      ...Aa,
      ...Ma,
      ...Pa,
      ...Ta,
      ...Oa,
      ...Na,
      ...Ra,
      ...La,
      ...Ca,
      ...Sa,
      ..._,
      ...Da,
      ...za
    ]
  };
}
const Ja = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Qa = 176, Za = 60, es = 140, ts = 40;
function is(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.boundedContexts.forEach((o, a) => {
    const r = 220 + a * 340;
    i.filter((s) => s.boundedContextId === o.id).forEach((s, c) => {
      const h = n.filter((m) => m.aggregateId === s.id).length, y = 140 + c * (170 + h * 60);
      t[s.id] = { x: r, y }, n.filter((m) => m.aggregateId === s.id).forEach((m, g) => {
        t[m.id] = { x: r + 60, y: y + 100 + g * 60 };
      });
    });
  }), i.filter((o) => !e.boundedContexts.some((a) => a.id === o.boundedContextId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function ns(e, t) {
  const i = is(e), n = (y) => t[y] ?? i[y] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((y) => [y.id, y])), a = (e.aggregates ?? []).map((y) => {
    const m = o.get(y.boundedContextId), g = (m == null ? void 0 : m.subdomainType) ?? "GENERIC", v = n(y.id);
    return {
      id: y.id,
      label: y.name,
      x: v.x,
      y: v.y,
      w: Qa,
      h: Za,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ja[g],
      stroke: "#64748b",
      badge: `${m ? `${m.name.toUpperCase()} · ` : ""}AGGREGATE${(y.invariants ?? []).length ? ` · ⚖${y.invariants.length}` : ""}`,
      tooltip: `Agregado ${y.name}${m ? ` — contexto ${m.name} (${g})` : ""}`
    };
  }), r = (e.entities ?? []).map((y) => {
    const m = n(y.id);
    return {
      id: y.id,
      label: y.name,
      x: m.x,
      y: m.y,
      w: es,
      h: ts,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${y.name} (dentro del agregado)`
    };
  }), p = (e.aggregates ?? []).flatMap(
    (y) => (y.invariants ?? []).map((m, g) => {
      const v = n(y.id), d = t[m.id] ?? { x: v.x - 150, y: v.y + 90 + g * 52 };
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
    (y) => (y.invariants ?? []).map((m) => ({
      id: `protects:${y.id}->${m.id}`,
      sourceId: y.id,
      targetId: m.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "El agregado protege esta regla — Supr la retira"
    }))
  ), c = (e.entities ?? []).map((y) => ({
    id: `contains:${y.aggregateId}->${y.id}`,
    sourceId: y.aggregateId,
    targetId: y.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), h = (e.aggregateReferences ?? []).map((y, m) => ({
    id: `aggref:${m}:${y.sourceAggregateId}->${y.targetAggregateId}`,
    sourceId: y.sourceAggregateId,
    targetId: y.targetAggregateId,
    kind: "aggregate-reference",
    label: y.label,
    color: "#475569",
    arrow: !0,
    tooltip: y.label ? `Referencia: ${y.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...a, ...r, ...p],
    edges: [...c, ...h, ...s]
  };
}
const os = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, as = 150, ss = 44, rs = 190, ds = 56, ls = 160, cs = 48;
function ps(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function us(e, t) {
  const i = e.flows, n = [], o = [], a = /* @__PURE__ */ new Set(), r = (p) => {
    var s, c;
    return ((c = (s = e.aggregates) == null ? void 0 : s.find((h) => h.id === p)) == null ? void 0 : c.name) ?? p ?? "?";
  };
  return i.forEach((p, s) => {
    const c = 120 + s * 130, h = os[p.archetype] ?? "#475569", y = p.triggerAggregateId ?? p.sourceId;
    if (!a.has(y)) {
      a.add(y);
      const l = t[y] ?? { x: 160, y: c };
      n.push({
        id: y,
        label: p.triggerAggregateId ? r(p.triggerAggregateId) : y,
        x: l.x,
        y: l.y,
        w: as,
        h: ss,
        kind: p.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: p.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: p.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const m = `flow:${p.id}`, g = t[m] ?? { x: 470, y: c };
    n.push({
      id: m,
      label: p.name,
      x: g.x,
      y: g.y,
      w: rs,
      h: ds,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: p.archetype,
      tooltip: `Flow ${p.name} [${p.archetype}]${p.readModelName ? ` → read model ${p.readModelName}` : ""}${p.targetUseCaseId ? ` → use case ${p.targetUseCaseId}` : ""}`
    });
    const v = ps(e, p), d = `tgt:${v.id}`;
    if (!a.has(d)) {
      a.add(d);
      const l = t[d] ?? { x: 790, y: c };
      n.push({
        id: d,
        label: v.label,
        x: l.x,
        y: l.y,
        w: ls,
        h: cs,
        kind: v.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${p.id}:in`,
      sourceId: y,
      targetId: m,
      kind: "flow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${p.id}:out`,
      sourceId: m,
      targetId: d,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: o };
}
const ms = 190, fs = 56, nn = 170, hs = 52;
function Hn(e, t) {
  const i = [], n = [], o = (a) => {
    var r;
    return (r = e.boundedContexts.find((p) => p.id === a)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((a, r) => {
    const p = 140 + r * 240, s = t[a.id] ?? { x: 150, y: p };
    i.push({
      id: a.id,
      label: a.name,
      x: s.x,
      y: s.y,
      w: ms,
      h: fs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerBoundedContextId) ? ` — contexto ${o(a.ownerBoundedContextId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let c = a.id;
    if (a.steps.forEach((h, y) => {
      const m = h.type === "HUMAN", g = t[h.id] ?? { x: 150 + (y + 1) * 240, y: p };
      if (i.push({
        id: h.id,
        label: h.name,
        x: g.x,
        y: g.y,
        w: nn,
        h: hs,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${a.id}:${y}`,
        sourceId: c,
        targetId: h.id,
        kind: "process-seq",
        label: y === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const v = `comp:${h.id}`, d = t[v] ?? { x: g.x, y: g.y + 90 };
        i.push({
          id: v,
          label: h.compensationUseCaseId,
          x: d.x,
          y: d.y,
          w: nn,
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
          targetId: v,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = h.id;
    }), a.onCompletionEventName) {
      const h = `done:${a.id}`, y = t[h] ?? { x: 150 + (a.steps.length + 1) * 240, y: p };
      i.push({
        id: h,
        label: a.onCompletionEventName,
        x: y.x,
        y: y.y,
        w: nn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${a.id}`,
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
const Ai = globalThis, Cn = Ai.ShadowRoot && (Ai.ShadyCSS === void 0 || Ai.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Sn = Symbol(), jn = /* @__PURE__ */ new WeakMap();
let Vo = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Sn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Cn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = jn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && jn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gs = (e) => new Vo(typeof e == "string" ? e : e + "", void 0, Sn), xt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, a) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Vo(i, e, Sn);
}, ys = (e, t) => {
  if (Cn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Ai.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, Gn = Cn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return gs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Is, defineProperty: bs, getOwnPropertyDescriptor: xs, getOwnPropertyNames: vs, getOwnPropertySymbols: ws, getPrototypeOf: ks } = Object, st = globalThis, Kn = st.trustedTypes, _s = Kn ? Kn.emptyScript : "", on = st.reactiveElementPolyfillSupport, Xt = (e, t) => e, zi = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? _s : null;
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
} }, En = (e, t) => !Is(e, t), Yn = { attribute: !0, type: String, converter: zi, reflect: !1, useDefault: !1, hasChanged: En };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Yn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && bs(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: a } = xs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const p = o == null ? void 0 : o.call(this);
      a == null || a.call(this, r), this.requestUpdate(t, p, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Yn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Xt("elementProperties"))) return;
    const t = ks(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Xt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Xt("properties"))) {
      const i = this.properties, n = [...vs(i), ...ws(i)];
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
      for (const o of n) i.unshift(Gn(o));
    } else t !== void 0 && i.push(Gn(t));
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
    return ys(t, this.constructor.elementStyles), t;
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
      const r = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : zi).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, r;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const p = n.getPropertyOptions(o), s = typeof p.converter == "function" ? { fromAttribute: p.converter } : ((a = p.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? p.converter : zi;
      this._$Em = o;
      const c = s.fromAttribute(i, p.type);
      this[o] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, a) {
    var r;
    if (t !== void 0) {
      const p = this.constructor;
      if (o === !1 && (a = this[t]), n ?? (n = p.getPropertyOptions(t)), !((n.hasChanged ?? En)(a, i) || n.useDefault && n.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(p._$Eu(t, n)))) return;
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
        const { wrapped: p } = r, s = this[a];
        p !== !0 || this._$AL.has(a) || s === void 0 || this.C(a, void 0, r, s);
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
Et.elementStyles = [], Et.shadowRootOptions = { mode: "open" }, Et[Xt("elementProperties")] = /* @__PURE__ */ new Map(), Et[Xt("finalized")] = /* @__PURE__ */ new Map(), on == null || on({ ReactiveElement: Et }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, Xn = (e) => e, Ui = Jt.trustedTypes, Jn = Ui ? Ui.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ho = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, jo = "?" + ot, $s = `<${jo}>`, It = document, ei = () => It.createComment(""), ti = (e) => e === null || typeof e != "object" && typeof e != "function", An = Array.isArray, Cs = (e) => An(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", an = `[ 	
\f\r]`, Bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qn = /-->/g, Zn = />/g, lt = RegExp(`>|${an}(?:([^\\s"'>=/]+)(${an}*=${an}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), eo = /'/g, to = /"/g, Go = /^(?:script|style|textarea|title)$/i, Ko = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), A = Ko(1), ie = Ko(2), Ot = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), io = /* @__PURE__ */ new WeakMap(), ft = It.createTreeWalker(It, 129);
function Yo(e, t) {
  if (!An(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Jn !== void 0 ? Jn.createHTML(t) : t;
}
const Ss = (e, t) => {
  const i = e.length - 1, n = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Bt;
  for (let p = 0; p < i; p++) {
    const s = e[p];
    let c, h, y = -1, m = 0;
    for (; m < s.length && (r.lastIndex = m, h = r.exec(s), h !== null); ) m = r.lastIndex, r === Bt ? h[1] === "!--" ? r = Qn : h[1] !== void 0 ? r = Zn : h[2] !== void 0 ? (Go.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = lt) : h[3] !== void 0 && (r = lt) : r === lt ? h[0] === ">" ? (r = o ?? Bt, y = -1) : h[1] === void 0 ? y = -2 : (y = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? lt : h[3] === '"' ? to : eo) : r === to || r === eo ? r = lt : r === Qn || r === Zn ? r = Bt : (r = lt, o = void 0);
    const g = r === lt && e[p + 1].startsWith("/>") ? " " : "";
    a += r === Bt ? s + $s : y >= 0 ? (n.push(c), s.slice(0, y) + Ho + s.slice(y) + ot + g) : s + ot + (y === -2 ? p : g);
  }
  return [Yo(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ii {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let a = 0, r = 0;
    const p = t.length - 1, s = this.parts, [c, h] = Ss(t, i);
    if (this.el = ii.createElement(c, n), ft.currentNode = this.el.content, i === 2 || i === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (o = ft.nextNode()) !== null && s.length < p; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const y of o.getAttributeNames()) if (y.endsWith(Ho)) {
          const m = h[r++], g = o.getAttribute(y).split(ot), v = /([.?@])?(.*)/.exec(m);
          s.push({ type: 1, index: a, name: v[2], strings: g, ctor: v[1] === "." ? As : v[1] === "?" ? Ms : v[1] === "@" ? Ps : Gi }), o.removeAttribute(y);
        } else y.startsWith(ot) && (s.push({ type: 6, index: a }), o.removeAttribute(y));
        if (Go.test(o.tagName)) {
          const y = o.textContent.split(ot), m = y.length - 1;
          if (m > 0) {
            o.textContent = Ui ? Ui.emptyScript : "";
            for (let g = 0; g < m; g++) o.append(y[g], ei()), ft.nextNode(), s.push({ type: 2, index: ++a });
            o.append(y[m], ei());
          }
        }
      } else if (o.nodeType === 8) if (o.data === jo) s.push({ type: 2, index: a });
      else {
        let y = -1;
        for (; (y = o.data.indexOf(ot, y + 1)) !== -1; ) s.push({ type: 7, index: a }), y += ot.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const n = It.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Nt(e, t, i = e, n) {
  var r, p;
  if (t === Ot) return t;
  let o = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const a = ti(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((p = o == null ? void 0 : o._$AO) == null || p.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = Nt(e, o._$AS(e, t.values), o, n)), t;
}
class Es {
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
    let a = ft.nextNode(), r = 0, p = 0, s = n[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let c;
        s.type === 2 ? c = new ri(a, a.nextSibling, this, t) : s.type === 1 ? c = new s.ctor(a, s.name, s.strings, this, t) : s.type === 6 && (c = new Ts(a, this, t)), this._$AV.push(c), s = n[++p];
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
class ri {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = Nt(this, t, i), ti(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== Ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Cs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && ti(this._$AH) ? this._$AA.nextSibling.data = t : this.T(It.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ii.createElement(Yo(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const r = new Es(o, this), p = r.u(this.options);
      r.p(i), this.T(p), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = io.get(t.strings);
    return i === void 0 && io.set(t.strings, i = new ii(t)), i;
  }
  k(t) {
    An(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const a of t) o === i.length ? i.push(n = new ri(this.O(ei()), this.O(ei()), this, this.options)) : n = i[o], n._$AI(a), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = Xn(t).nextSibling;
      Xn(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Gi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, a) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = se;
  }
  _$AI(t, i = this, n, o) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) t = Nt(this, t, i, 0), r = !ti(t) || t !== this._$AH && t !== Ot, r && (this._$AH = t);
    else {
      const p = t;
      let s, c;
      for (t = a[0], s = 0; s < a.length - 1; s++) c = Nt(this, p[n + s], i, s), c === Ot && (c = this._$AH[s]), r || (r = !ti(c) || c !== this._$AH[s]), c === se ? t = se : t !== se && (t += (c ?? "") + a[s + 1]), this._$AH[s] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class As extends Gi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class Ms extends Gi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class Ps extends Gi {
  constructor(t, i, n, o, a) {
    super(t, i, n, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Nt(this, t, i, 0) ?? se) === Ot) return;
    const n = this._$AH, o = t === se && n !== se || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== se && (n === se || o);
    o && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ts {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Nt(this, t);
  }
}
const sn = Jt.litHtmlPolyfillSupport;
sn == null || sn(ii, ri), (Jt.litHtmlVersions ?? (Jt.litHtmlVersions = [])).push("3.3.3");
const Os = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = o = new ri(t.insertBefore(ei(), a), a, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis;
class Ge extends Et {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Os(i, this.renderRoot, this.renderOptions);
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
    return Ot;
  }
}
var Do;
Ge._$litElement$ = !0, Ge.finalized = !0, (Do = gt.litElementHydrateSupport) == null || Do.call(gt, { LitElement: Ge });
const rn = gt.litElementPolyfillSupport;
rn == null || rn({ LitElement: Ge });
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
const Ns = { attribute: !0, type: String, converter: zi, reflect: !1, hasChanged: En }, Rs = (e = Ns, t, i) => {
  const { kind: n, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(p) {
      const s = t.get.call(this);
      t.set.call(this, p), this.requestUpdate(r, s, e, !0, p);
    }, init(p) {
      return p !== void 0 && this.C(r, void 0, e, p), p;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(p) {
      const s = this[r];
      t.call(this, p), this.requestUpdate(r, s, e, !0, p);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function re(e) {
  return (t, i) => typeof i == "object" ? Rs(e, t, i) : ((n, o, a) => {
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
  return re({ ...e, state: !0, attribute: !1 });
}
var fn = "http://www.w3.org/1999/xhtml";
const no = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: fn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ki(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), no.hasOwnProperty(t) ? { space: no[t], local: e } : e;
}
function Ls(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === fn && t.documentElement.namespaceURI === fn ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ds(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Xo(e) {
  var t = Ki(e);
  return (t.local ? Ds : Ls)(t);
}
function zs() {
}
function Mn(e) {
  return e == null ? zs : function() {
    return this.querySelector(e);
  };
}
function Us(e) {
  typeof e != "function" && (e = Mn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, p = n[o] = new Array(r), s, c, h = 0; h < r; ++h)
      (s = a[h]) && (c = e.call(s, s.__data__, h, a)) && ("__data__" in s && (c.__data__ = s.__data__), p[h] = c);
  return new Ue(n, this._parents);
}
function qs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Bs() {
  return [];
}
function Jo(e) {
  return e == null ? Bs : function() {
    return this.querySelectorAll(e);
  };
}
function Fs(e) {
  return function() {
    return qs(e.apply(this, arguments));
  };
}
function Ws(e) {
  typeof e == "function" ? e = Fs(e) : e = Jo(e);
  for (var t = this._groups, i = t.length, n = [], o = [], a = 0; a < i; ++a)
    for (var r = t[a], p = r.length, s, c = 0; c < p; ++c)
      (s = r[c]) && (n.push(e.call(s, s.__data__, c, r)), o.push(s));
  return new Ue(n, o);
}
function Qo(e) {
  return function() {
    return this.matches(e);
  };
}
function Zo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Vs = Array.prototype.find;
function Hs(e) {
  return function() {
    return Vs.call(this.children, e);
  };
}
function js() {
  return this.firstElementChild;
}
function Gs(e) {
  return this.select(e == null ? js : Hs(typeof e == "function" ? e : Zo(e)));
}
var Ks = Array.prototype.filter;
function Ys() {
  return Array.from(this.children);
}
function Xs(e) {
  return function() {
    return Ks.call(this.children, e);
  };
}
function Js(e) {
  return this.selectAll(e == null ? Ys : Xs(typeof e == "function" ? e : Zo(e)));
}
function Qs(e) {
  typeof e != "function" && (e = Qo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, p = n[o] = [], s, c = 0; c < r; ++c)
      (s = a[c]) && e.call(s, s.__data__, c, a) && p.push(s);
  return new Ue(n, this._parents);
}
function ea(e) {
  return new Array(e.length);
}
function Zs() {
  return new Ue(this._enter || this._groups.map(ea), this._parents);
}
function qi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
qi.prototype = {
  constructor: qi,
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
function er(e) {
  return function() {
    return e;
  };
}
function tr(e, t, i, n, o, a) {
  for (var r = 0, p, s = t.length, c = a.length; r < c; ++r)
    (p = t[r]) ? (p.__data__ = a[r], n[r] = p) : i[r] = new qi(e, a[r]);
  for (; r < s; ++r)
    (p = t[r]) && (o[r] = p);
}
function ir(e, t, i, n, o, a, r) {
  var p, s, c = /* @__PURE__ */ new Map(), h = t.length, y = a.length, m = new Array(h), g;
  for (p = 0; p < h; ++p)
    (s = t[p]) && (m[p] = g = r.call(s, s.__data__, p, t) + "", c.has(g) ? o[p] = s : c.set(g, s));
  for (p = 0; p < y; ++p)
    g = r.call(e, a[p], p, a) + "", (s = c.get(g)) ? (n[p] = s, s.__data__ = a[p], c.delete(g)) : i[p] = new qi(e, a[p]);
  for (p = 0; p < h; ++p)
    (s = t[p]) && c.get(m[p]) === s && (o[p] = s);
}
function nr(e) {
  return e.__data__;
}
function or(e, t) {
  if (!arguments.length) return Array.from(this, nr);
  var i = t ? ir : tr, n = this._parents, o = this._groups;
  typeof e != "function" && (e = er(e));
  for (var a = o.length, r = new Array(a), p = new Array(a), s = new Array(a), c = 0; c < a; ++c) {
    var h = n[c], y = o[c], m = y.length, g = ar(e.call(h, h && h.__data__, c, n)), v = g.length, d = p[c] = new Array(v), l = r[c] = new Array(v), f = s[c] = new Array(m);
    i(h, y, d, l, f, g, t);
    for (var k = 0, b = 0, _, R; k < v; ++k)
      if (_ = d[k]) {
        for (k >= b && (b = k + 1); !(R = l[b]) && ++b < v; ) ;
        _._next = R || null;
      }
  }
  return r = new Ue(r, n), r._enter = p, r._exit = s, r;
}
function ar(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sr() {
  return new Ue(this._exit || this._groups.map(ea), this._parents);
}
function rr(e, t, i) {
  var n = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), n && o ? n.merge(o).order() : o;
}
function dr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, o = i.length, a = n.length, r = Math.min(o, a), p = new Array(o), s = 0; s < r; ++s)
    for (var c = i[s], h = n[s], y = c.length, m = p[s] = new Array(y), g, v = 0; v < y; ++v)
      (g = c[v] || h[v]) && (m[v] = g);
  for (; s < o; ++s)
    p[s] = i[s];
  return new Ue(p, this._parents);
}
function lr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], o = n.length - 1, a = n[o], r; --o >= 0; )
      (r = n[o]) && (a && r.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(r, a), a = r);
  return this;
}
function cr(e) {
  e || (e = pr);
  function t(y, m) {
    return y && m ? e(y.__data__, m.__data__) : !y - !m;
  }
  for (var i = this._groups, n = i.length, o = new Array(n), a = 0; a < n; ++a) {
    for (var r = i[a], p = r.length, s = o[a] = new Array(p), c, h = 0; h < p; ++h)
      (c = r[h]) && (s[h] = c);
    s.sort(t);
  }
  return new Ue(o, this._parents).order();
}
function pr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ur() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function mr() {
  return Array.from(this);
}
function fr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length; o < a; ++o) {
      var r = n[o];
      if (r) return r;
    }
  return null;
}
function hr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function gr() {
  return !this.node();
}
function yr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var o = t[i], a = 0, r = o.length, p; a < r; ++a)
      (p = o[a]) && e.call(p, p.__data__, a, o);
  return this;
}
function Ir(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function br(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function xr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function vr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function wr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function kr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function _r(e, t) {
  var i = Ki(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? br : Ir : typeof t == "function" ? i.local ? kr : wr : i.local ? vr : xr)(i, t));
}
function ta(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function $r(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Cr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Sr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Er(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? $r : typeof t == "function" ? Sr : Cr)(e, t, i ?? "")) : Rt(this.node(), e);
}
function Rt(e, t) {
  return e.style.getPropertyValue(t) || ta(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ar(e) {
  return function() {
    delete this[e];
  };
}
function Mr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Pr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Tr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ar : typeof t == "function" ? Pr : Mr)(e, t)) : this.node()[e];
}
function ia(e) {
  return e.trim().split(/^|\s+/);
}
function Pn(e) {
  return e.classList || new na(e);
}
function na(e) {
  this._node = e, this._names = ia(e.getAttribute("class") || "");
}
na.prototype = {
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
function oa(e, t) {
  for (var i = Pn(e), n = -1, o = t.length; ++n < o; ) i.add(t[n]);
}
function aa(e, t) {
  for (var i = Pn(e), n = -1, o = t.length; ++n < o; ) i.remove(t[n]);
}
function Or(e) {
  return function() {
    oa(this, e);
  };
}
function Nr(e) {
  return function() {
    aa(this, e);
  };
}
function Rr(e, t) {
  return function() {
    (t.apply(this, arguments) ? oa : aa)(this, e);
  };
}
function Lr(e, t) {
  var i = ia(e + "");
  if (arguments.length < 2) {
    for (var n = Pn(this.node()), o = -1, a = i.length; ++o < a; ) if (!n.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Rr : t ? Or : Nr)(i, t));
}
function Dr() {
  this.textContent = "";
}
function zr(e) {
  return function() {
    this.textContent = e;
  };
}
function Ur(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function qr(e) {
  return arguments.length ? this.each(e == null ? Dr : (typeof e == "function" ? Ur : zr)(e)) : this.node().textContent;
}
function Br() {
  this.innerHTML = "";
}
function Fr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Wr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Vr(e) {
  return arguments.length ? this.each(e == null ? Br : (typeof e == "function" ? Wr : Fr)(e)) : this.node().innerHTML;
}
function Hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function jr() {
  return this.each(Hr);
}
function Gr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Kr() {
  return this.each(Gr);
}
function Yr(e) {
  var t = typeof e == "function" ? e : Xo(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Xr() {
  return null;
}
function Jr(e, t) {
  var i = typeof e == "function" ? e : Xo(e), n = t == null ? Xr : typeof t == "function" ? t : Mn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Qr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Zr() {
  return this.each(Qr);
}
function ed() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function td() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function id(e) {
  return this.select(e ? td : ed);
}
function nd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function od(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ad(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function sd(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++n] = a;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function rd(e, t, i) {
  return function() {
    var n = this.__on, o, a = od(t);
    if (n) {
      for (var r = 0, p = n.length; r < p; ++r)
        if ((o = n[r]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), o = { type: e.type, name: e.name, value: t, listener: a, options: i }, n ? n.push(o) : this.__on = [o];
  };
}
function dd(e, t, i) {
  var n = ad(e + ""), o, a = n.length, r;
  if (arguments.length < 2) {
    var p = this.node().__on;
    if (p) {
      for (var s = 0, c = p.length, h; s < c; ++s)
        for (o = 0, h = p[s]; o < a; ++o)
          if ((r = n[o]).type === h.type && r.name === h.name)
            return h.value;
    }
    return;
  }
  for (p = t ? rd : sd, o = 0; o < a; ++o) this.each(p(n[o], t, i));
  return this;
}
function sa(e, t, i) {
  var n = ta(e), o = n.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = n.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function ld(e, t) {
  return function() {
    return sa(this, e, t);
  };
}
function cd(e, t) {
  return function() {
    return sa(this, e, t.apply(this, arguments));
  };
}
function pd(e, t) {
  return this.each((typeof t == "function" ? cd : ld)(e, t));
}
function* ud() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length, r; o < a; ++o)
      (r = n[o]) && (yield r);
}
var ra = [null];
function Ue(e, t) {
  this._groups = e, this._parents = t;
}
function di() {
  return new Ue([[document.documentElement]], ra);
}
function md() {
  return this;
}
Ue.prototype = di.prototype = {
  constructor: Ue,
  select: Us,
  selectAll: Ws,
  selectChild: Gs,
  selectChildren: Js,
  filter: Qs,
  data: or,
  enter: Zs,
  exit: sr,
  join: rr,
  merge: dr,
  selection: md,
  order: lr,
  sort: cr,
  call: ur,
  nodes: mr,
  node: fr,
  size: hr,
  empty: gr,
  each: yr,
  attr: _r,
  style: Er,
  property: Tr,
  classed: Lr,
  text: qr,
  html: Vr,
  raise: jr,
  lower: Kr,
  append: Yr,
  insert: Jr,
  remove: Zr,
  clone: id,
  datum: nd,
  on: dd,
  dispatch: pd,
  [Symbol.iterator]: ud
};
function He(e) {
  return typeof e == "string" ? new Ue([[document.querySelector(e)]], [document.documentElement]) : new Ue([[e]], ra);
}
function fd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ct(e, t) {
  if (e = fd(e), t === void 0 && (t = e.currentTarget), t) {
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
var hd = { value: () => {
} };
function Tn() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new Mi(i);
}
function Mi(e) {
  this._ = e;
}
function gd(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", o = i.indexOf(".");
    if (o >= 0 && (n = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
Mi.prototype = Tn.prototype = {
  constructor: Mi,
  on: function(e, t) {
    var i = this._, n = gd(e + "", i), o, a = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++a < r; ) if ((o = (e = n[a]).type) && (o = yd(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < r; )
      if (o = (e = n[a]).type) i[o] = oo(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = oo(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Mi(e);
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
function yd(e, t) {
  for (var i = 0, n = e.length, o; i < n; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function oo(e, t, i) {
  for (var n = 0, o = e.length; n < o; ++n)
    if (e[n].name === t) {
      e[n] = hd, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const hn = { capture: !0, passive: !1 };
function gn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Id(e) {
  var t = e.document.documentElement, i = He(e).on("dragstart.drag", gn, hn);
  "onselectstart" in t ? i.on("selectstart.drag", gn, hn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function bd(e, t) {
  var i = e.document.documentElement, n = He(e).on("dragstart.drag", null);
  t && (n.on("click.drag", gn, hn), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function On(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function da(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function li() {
}
var ni = 0.7, Bi = 1 / ni, Pt = "\\s*([+-]?\\d+)\\s*", oi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", xd = /^#([0-9a-f]{3,8})$/, vd = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), wd = new RegExp(`^rgb\\(${Ye},${Ye},${Ye}\\)$`), kd = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${oi}\\)$`), _d = new RegExp(`^rgba\\(${Ye},${Ye},${Ye},${oi}\\)$`), $d = new RegExp(`^hsl\\(${oi},${Ye},${Ye}\\)$`), Cd = new RegExp(`^hsla\\(${oi},${Ye},${Ye},${oi}\\)$`), ao = {
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
On(li, ai, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: so,
  // Deprecated! Use color.formatHex.
  formatHex: so,
  formatHex8: Sd,
  formatHsl: Ed,
  formatRgb: ro,
  toString: ro
});
function so() {
  return this.rgb().formatHex();
}
function Sd() {
  return this.rgb().formatHex8();
}
function Ed() {
  return la(this).formatHsl();
}
function ro() {
  return this.rgb().formatRgb();
}
function ai(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = xd.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? lo(t) : i === 3 ? new Le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? gi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? gi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = vd.exec(e)) ? new Le(t[1], t[2], t[3], 1) : (t = wd.exec(e)) ? new Le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = kd.exec(e)) ? gi(t[1], t[2], t[3], t[4]) : (t = _d.exec(e)) ? gi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = $d.exec(e)) ? uo(t[1], t[2] / 100, t[3] / 100, 1) : (t = Cd.exec(e)) ? uo(t[1], t[2] / 100, t[3] / 100, t[4]) : ao.hasOwnProperty(e) ? lo(ao[e]) : e === "transparent" ? new Le(NaN, NaN, NaN, 0) : null;
}
function lo(e) {
  return new Le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function gi(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Le(e, t, i, n);
}
function Ad(e) {
  return e instanceof li || (e = ai(e)), e ? (e = e.rgb(), new Le(e.r, e.g, e.b, e.opacity)) : new Le();
}
function yn(e, t, i, n) {
  return arguments.length === 1 ? Ad(e) : new Le(e, t, i, n ?? 1);
}
function Le(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
On(Le, yn, da(li, {
  brighter(e) {
    return e = e == null ? Bi : Math.pow(Bi, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ni : Math.pow(ni, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Le(yt(this.r), yt(this.g), yt(this.b), Fi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: co,
  // Deprecated! Use color.formatHex.
  formatHex: co,
  formatHex8: Md,
  formatRgb: po,
  toString: po
}));
function co() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}`;
}
function Md() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}${ht((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function po() {
  const e = Fi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Fi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ht(e) {
  return e = yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function uo(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new je(e, t, i, n);
}
function la(e) {
  if (e instanceof je) return new je(e.h, e.s, e.l, e.opacity);
  if (e instanceof li || (e = ai(e)), !e) return new je();
  if (e instanceof je) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, o = Math.min(t, i, n), a = Math.max(t, i, n), r = NaN, p = a - o, s = (a + o) / 2;
  return p ? (t === a ? r = (i - n) / p + (i < n) * 6 : i === a ? r = (n - t) / p + 2 : r = (t - i) / p + 4, p /= s < 0.5 ? a + o : 2 - a - o, r *= 60) : p = s > 0 && s < 1 ? 0 : r, new je(r, p, s, e.opacity);
}
function Pd(e, t, i, n) {
  return arguments.length === 1 ? la(e) : new je(e, t, i, n ?? 1);
}
function je(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
On(je, Pd, da(li, {
  brighter(e) {
    return e = e == null ? Bi : Math.pow(Bi, e), new je(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ni : Math.pow(ni, e), new je(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - n;
    return new Le(
      dn(e >= 240 ? e - 240 : e + 120, o, n),
      dn(e, o, n),
      dn(e < 120 ? e + 240 : e - 120, o, n),
      this.opacity
    );
  },
  clamp() {
    return new je(mo(this.h), yi(this.s), yi(this.l), Fi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Fi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${mo(this.h)}, ${yi(this.s) * 100}%, ${yi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function mo(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function yi(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function dn(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const ca = (e) => () => e;
function Td(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Od(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Nd(e) {
  return (e = +e) == 1 ? pa : function(t, i) {
    return i - t ? Od(t, i, e) : ca(isNaN(t) ? i : t);
  };
}
function pa(e, t) {
  var i = t - e;
  return i ? Td(e, i) : ca(isNaN(e) ? t : e);
}
const fo = (function e(t) {
  var i = Nd(t);
  function n(o, a) {
    var r = i((o = yn(o)).r, (a = yn(a)).r), p = i(o.g, a.g), s = i(o.b, a.b), c = pa(o.opacity, a.opacity);
    return function(h) {
      return o.r = r(h), o.g = p(h), o.b = s(h), o.opacity = c(h), o + "";
    };
  }
  return n.gamma = e, n;
})(1);
function nt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var In = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ln = new RegExp(In.source, "g");
function Rd(e) {
  return function() {
    return e;
  };
}
function Ld(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Dd(e, t) {
  var i = In.lastIndex = ln.lastIndex = 0, n, o, a, r = -1, p = [], s = [];
  for (e = e + "", t = t + ""; (n = In.exec(e)) && (o = ln.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), p[r] ? p[r] += a : p[++r] = a), (n = n[0]) === (o = o[0]) ? p[r] ? p[r] += o : p[++r] = o : (p[++r] = null, s.push({ i: r, x: nt(n, o) })), i = ln.lastIndex;
  return i < t.length && (a = t.slice(i), p[r] ? p[r] += a : p[++r] = a), p.length < 2 ? s[0] ? Ld(s[0].x) : Rd(t) : (t = s.length, function(c) {
    for (var h = 0, y; h < t; ++h) p[(y = s[h]).i] = y.x(c);
    return p.join("");
  });
}
var ho = 180 / Math.PI, bn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ua(e, t, i, n, o, a) {
  var r, p, s;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (s = e * i + t * n) && (i -= e * s, n -= t * s), (p = Math.sqrt(i * i + n * n)) && (i /= p, n /= p, s /= p), e * n < t * i && (e = -e, t = -t, s = -s, r = -r), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * ho,
    skewX: Math.atan(s) * ho,
    scaleX: r,
    scaleY: p
  };
}
var Ii;
function zd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? bn : ua(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ud(e) {
  return e == null || (Ii || (Ii = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ii.setAttribute("transform", e), !(e = Ii.transform.baseVal.consolidate())) ? bn : (e = e.matrix, ua(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ma(e, t, i, n) {
  function o(c) {
    return c.length ? c.pop() + " " : "";
  }
  function a(c, h, y, m, g, v) {
    if (c !== y || h !== m) {
      var d = g.push("translate(", null, t, null, i);
      v.push({ i: d - 4, x: nt(c, y) }, { i: d - 2, x: nt(h, m) });
    } else (y || m) && g.push("translate(" + y + t + m + i);
  }
  function r(c, h, y, m) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), m.push({ i: y.push(o(y) + "rotate(", null, n) - 2, x: nt(c, h) })) : h && y.push(o(y) + "rotate(" + h + n);
  }
  function p(c, h, y, m) {
    c !== h ? m.push({ i: y.push(o(y) + "skewX(", null, n) - 2, x: nt(c, h) }) : h && y.push(o(y) + "skewX(" + h + n);
  }
  function s(c, h, y, m, g, v) {
    if (c !== y || h !== m) {
      var d = g.push(o(g) + "scale(", null, ",", null, ")");
      v.push({ i: d - 4, x: nt(c, y) }, { i: d - 2, x: nt(h, m) });
    } else (y !== 1 || m !== 1) && g.push(o(g) + "scale(" + y + "," + m + ")");
  }
  return function(c, h) {
    var y = [], m = [];
    return c = e(c), h = e(h), a(c.translateX, c.translateY, h.translateX, h.translateY, y, m), r(c.rotate, h.rotate, y, m), p(c.skewX, h.skewX, y, m), s(c.scaleX, c.scaleY, h.scaleX, h.scaleY, y, m), c = h = null, function(g) {
      for (var v = -1, d = m.length, l; ++v < d; ) y[(l = m[v]).i] = l.x(g);
      return y.join("");
    };
  };
}
var qd = ma(zd, "px, ", "px)", "deg)"), Bd = ma(Ud, ", ", ")", ")"), Fd = 1e-12;
function go(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Wd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Vd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Hd = (function e(t, i, n) {
  function o(a, r) {
    var p = a[0], s = a[1], c = a[2], h = r[0], y = r[1], m = r[2], g = h - p, v = y - s, d = g * g + v * v, l, f;
    if (d < Fd)
      f = Math.log(m / c) / t, l = function(D) {
        return [
          p + D * g,
          s + D * v,
          c * Math.exp(t * D * f)
        ];
      };
    else {
      var k = Math.sqrt(d), b = (m * m - c * c + n * d) / (2 * c * i * k), _ = (m * m - c * c - n * d) / (2 * m * i * k), R = Math.log(Math.sqrt(b * b + 1) - b), L = Math.log(Math.sqrt(_ * _ + 1) - _);
      f = (L - R) / t, l = function(D) {
        var W = D * f, w = go(R), E = c / (i * k) * (w * Vd(t * W + R) - Wd(R));
        return [
          p + E * g,
          s + E * v,
          c * w / go(t * W + R)
        ];
      };
    }
    return l.duration = f * 1e3 * t / Math.SQRT2, l;
  }
  return o.rho = function(a) {
    var r = Math.max(1e-3, +a), p = r * r, s = p * p;
    return e(r, p, s);
  }, o;
})(Math.SQRT2, 2, 4);
var Lt = 0, Kt = 0, Ft = 0, fa = 1e3, Wi, Yt, Vi = 0, bt = 0, Yi = 0, si = typeof performance == "object" && performance.now ? performance : Date, ha = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Nn() {
  return bt || (ha(jd), bt = si.now() + Yi);
}
function jd() {
  bt = 0;
}
function Hi() {
  this._call = this._time = this._next = null;
}
Hi.prototype = ga.prototype = {
  constructor: Hi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Nn() : +i) + (t == null ? 0 : +t), !this._next && Yt !== this && (Yt ? Yt._next = this : Wi = this, Yt = this), this._call = e, this._time = i, xn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xn());
  }
};
function ga(e, t, i) {
  var n = new Hi();
  return n.restart(e, t, i), n;
}
function Gd() {
  Nn(), ++Lt;
  for (var e = Wi, t; e; )
    (t = bt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Lt;
}
function yo() {
  bt = (Vi = si.now()) + Yi, Lt = Kt = 0;
  try {
    Gd();
  } finally {
    Lt = 0, Yd(), bt = 0;
  }
}
function Kd() {
  var e = si.now(), t = e - Vi;
  t > fa && (Yi -= t, Vi = e);
}
function Yd() {
  for (var e, t = Wi, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Wi = i);
  Yt = e, xn(n);
}
function xn(e) {
  if (!Lt) {
    Kt && (Kt = clearTimeout(Kt));
    var t = e - bt;
    t > 24 ? (e < 1 / 0 && (Kt = setTimeout(yo, e - si.now() - Yi)), Ft && (Ft = clearInterval(Ft))) : (Ft || (Vi = si.now(), Ft = setInterval(Kd, fa)), Lt = 1, ha(yo));
  }
}
function Io(e, t, i) {
  var n = new Hi();
  return t = t == null ? 0 : +t, n.restart((o) => {
    n.stop(), e(o + t);
  }, t, i), n;
}
var Xd = Tn("start", "end", "cancel", "interrupt"), Jd = [], ya = 0, bo = 1, vn = 2, Pi = 3, xo = 4, wn = 5, Ti = 6;
function Xi(e, t, i, n, o, a) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  Qd(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Xd,
    tween: Jd,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ya
  });
}
function Rn(e, t) {
  var i = Ke(e, t);
  if (i.state > ya) throw new Error("too late; already scheduled");
  return i;
}
function Xe(e, t) {
  var i = Ke(e, t);
  if (i.state > Pi) throw new Error("too late; already running");
  return i;
}
function Ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Qd(e, t, i) {
  var n = e.__transition, o;
  n[t] = i, i.timer = ga(a, 0, i.time);
  function a(c) {
    i.state = bo, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var h, y, m, g;
    if (i.state !== bo) return s();
    for (h in n)
      if (g = n[h], g.name === i.name) {
        if (g.state === Pi) return Io(r);
        g.state === xo ? (g.state = Ti, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete n[h]) : +h < t && (g.state = Ti, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete n[h]);
      }
    if (Io(function() {
      i.state === Pi && (i.state = xo, i.timer.restart(p, i.delay, i.time), p(c));
    }), i.state = vn, i.on.call("start", e, e.__data__, i.index, i.group), i.state === vn) {
      for (i.state = Pi, o = new Array(m = i.tween.length), h = 0, y = -1; h < m; ++h)
        (g = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (o[++y] = g);
      o.length = y + 1;
    }
  }
  function p(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(s), i.state = wn, 1), y = -1, m = o.length; ++y < m; )
      o[y].call(e, h);
    i.state === wn && (i.on.call("end", e, e.__data__, i.index, i.group), s());
  }
  function s() {
    i.state = Ti, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Oi(e, t) {
  var i = e.__transition, n, o, a = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        a = !1;
        continue;
      }
      o = n.state > vn && n.state < wn, n.state = Ti, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    a && delete e.__transition;
  }
}
function Zd(e) {
  return this.each(function() {
    Oi(this, e);
  });
}
function el(e, t) {
  var i, n;
  return function() {
    var o = Xe(this, e), a = o.tween;
    if (a !== i) {
      n = i = a;
      for (var r = 0, p = n.length; r < p; ++r)
        if (n[r].name === t) {
          n = n.slice(), n.splice(r, 1);
          break;
        }
    }
    o.tween = n;
  };
}
function tl(e, t, i) {
  var n, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = Xe(this, e), r = a.tween;
    if (r !== n) {
      o = (n = r).slice();
      for (var p = { name: t, value: i }, s = 0, c = o.length; s < c; ++s)
        if (o[s].name === t) {
          o[s] = p;
          break;
        }
      s === c && o.push(p);
    }
    a.tween = o;
  };
}
function il(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ke(this.node(), i).tween, o = 0, a = n.length, r; o < a; ++o)
      if ((r = n[o]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? el : tl)(i, e, t));
}
function Ln(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var o = Xe(this, n);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Ke(o, n).value[t];
  };
}
function Ia(e, t) {
  var i;
  return (typeof t == "number" ? nt : t instanceof ai ? fo : (i = ai(t)) ? (t = i, fo) : Dd)(e, t);
}
function nl(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ol(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function al(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var r = this.getAttribute(e);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function sl(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function rl(e, t, i) {
  var n, o, a;
  return function() {
    var r, p = i(this), s;
    return p == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), s = p + "", r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, p)));
  };
}
function dl(e, t, i) {
  var n, o, a;
  return function() {
    var r, p = i(this), s;
    return p == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), s = p + "", r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, p)));
  };
}
function ll(e, t) {
  var i = Ki(e), n = i === "transform" ? Bd : Ia;
  return this.attrTween(e, typeof t == "function" ? (i.local ? dl : rl)(i, n, Ln(this, "attr." + e, t)) : t == null ? (i.local ? ol : nl)(i) : (i.local ? sl : al)(i, n, t));
}
function cl(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function pl(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ul(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && pl(e, a)), i;
  }
  return o._value = t, o;
}
function ml(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && cl(e, a)), i;
  }
  return o._value = t, o;
}
function fl(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Ki(e);
  return this.tween(i, (n.local ? ul : ml)(n, t));
}
function hl(e, t) {
  return function() {
    Rn(this, e).delay = +t.apply(this, arguments);
  };
}
function gl(e, t) {
  return t = +t, function() {
    Rn(this, e).delay = t;
  };
}
function yl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? hl : gl)(t, e)) : Ke(this.node(), t).delay;
}
function Il(e, t) {
  return function() {
    Xe(this, e).duration = +t.apply(this, arguments);
  };
}
function bl(e, t) {
  return t = +t, function() {
    Xe(this, e).duration = t;
  };
}
function xl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Il : bl)(t, e)) : Ke(this.node(), t).duration;
}
function vl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Xe(this, e).ease = t;
  };
}
function wl(e) {
  var t = this._id;
  return arguments.length ? this.each(vl(t, e)) : Ke(this.node(), t).ease;
}
function kl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Xe(this, e).ease = i;
  };
}
function _l(e) {
  if (typeof e != "function") throw new Error();
  return this.each(kl(this._id, e));
}
function $l(e) {
  typeof e != "function" && (e = Qo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, p = n[o] = [], s, c = 0; c < r; ++c)
      (s = a[c]) && e.call(s, s.__data__, c, a) && p.push(s);
  return new Ze(n, this._parents, this._name, this._id);
}
function Cl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, o = i.length, a = Math.min(n, o), r = new Array(n), p = 0; p < a; ++p)
    for (var s = t[p], c = i[p], h = s.length, y = r[p] = new Array(h), m, g = 0; g < h; ++g)
      (m = s[g] || c[g]) && (y[g] = m);
  for (; p < n; ++p)
    r[p] = t[p];
  return new Ze(r, this._parents, this._name, this._id);
}
function Sl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function El(e, t, i) {
  var n, o, a = Sl(t) ? Rn : Xe;
  return function() {
    var r = a(this, e), p = r.on;
    p !== n && (o = (n = p).copy()).on(t, i), r.on = o;
  };
}
function Al(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ke(this.node(), i).on.on(e) : this.each(El(i, e, t));
}
function Ml(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Pl() {
  return this.on("end.remove", Ml(this._id));
}
function Tl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Mn(e));
  for (var n = this._groups, o = n.length, a = new Array(o), r = 0; r < o; ++r)
    for (var p = n[r], s = p.length, c = a[r] = new Array(s), h, y, m = 0; m < s; ++m)
      (h = p[m]) && (y = e.call(h, h.__data__, m, p)) && ("__data__" in h && (y.__data__ = h.__data__), c[m] = y, Xi(c[m], t, i, m, c, Ke(h, i)));
  return new Ze(a, this._parents, t, i);
}
function Ol(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Jo(e));
  for (var n = this._groups, o = n.length, a = [], r = [], p = 0; p < o; ++p)
    for (var s = n[p], c = s.length, h, y = 0; y < c; ++y)
      if (h = s[y]) {
        for (var m = e.call(h, h.__data__, y, s), g, v = Ke(h, i), d = 0, l = m.length; d < l; ++d)
          (g = m[d]) && Xi(g, t, i, d, m, v);
        a.push(m), r.push(h);
      }
  return new Ze(a, r, t, i);
}
var Nl = di.prototype.constructor;
function Rl() {
  return new Nl(this._groups, this._parents);
}
function Ll(e, t) {
  var i, n, o;
  return function() {
    var a = Rt(this, e), r = (this.style.removeProperty(e), Rt(this, e));
    return a === r ? null : a === i && r === n ? o : o = t(i = a, n = r);
  };
}
function ba(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Dl(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var r = Rt(this, e);
    return r === o ? null : r === n ? a : a = t(n = r, i);
  };
}
function zl(e, t, i) {
  var n, o, a;
  return function() {
    var r = Rt(this, e), p = i(this), s = p + "";
    return p == null && (s = p = (this.style.removeProperty(e), Rt(this, e))), r === s ? null : r === n && s === o ? a : (o = s, a = t(n = r, p));
  };
}
function Ul(e, t) {
  var i, n, o, a = "style." + t, r = "end." + a, p;
  return function() {
    var s = Xe(this, e), c = s.on, h = s.value[a] == null ? p || (p = ba(t)) : void 0;
    (c !== i || o !== h) && (n = (i = c).copy()).on(r, o = h), s.on = n;
  };
}
function ql(e, t, i) {
  var n = (e += "") == "transform" ? qd : Ia;
  return t == null ? this.styleTween(e, Ll(e, n)).on("end.style." + e, ba(e)) : typeof t == "function" ? this.styleTween(e, zl(e, n, Ln(this, "style." + e, t))).each(Ul(this._id, e)) : this.styleTween(e, Dl(e, n, t), i).on("end.style." + e, null);
}
function Bl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Fl(e, t, i) {
  var n, o;
  function a() {
    var r = t.apply(this, arguments);
    return r !== o && (n = (o = r) && Bl(e, r, i)), n;
  }
  return a._value = t, a;
}
function Wl(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Fl(e, t, i ?? ""));
}
function Vl(e) {
  return function() {
    this.textContent = e;
  };
}
function Hl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function jl(e) {
  return this.tween("text", typeof e == "function" ? Hl(Ln(this, "text", e)) : Vl(e == null ? "" : e + ""));
}
function Gl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Kl(e) {
  var t, i;
  function n() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && Gl(o)), t;
  }
  return n._value = e, n;
}
function Yl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Kl(e));
}
function Xl() {
  for (var e = this._name, t = this._id, i = xa(), n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var r = n[a], p = r.length, s, c = 0; c < p; ++c)
      if (s = r[c]) {
        var h = Ke(s, t);
        Xi(s, e, i, c, r, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new Ze(n, this._parents, e, i);
}
function Jl() {
  var e, t, i = this, n = i._id, o = i.size();
  return new Promise(function(a, r) {
    var p = { value: r }, s = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var c = Xe(this, n), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(p), t._.interrupt.push(p), t._.end.push(s)), c.on = t;
    }), o === 0 && a();
  });
}
var Ql = 0;
function Ze(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function xa() {
  return ++Ql;
}
var Je = di.prototype;
Ze.prototype = {
  constructor: Ze,
  select: Tl,
  selectAll: Ol,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: $l,
  merge: Cl,
  selection: Rl,
  transition: Xl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: Al,
  attr: ll,
  attrTween: fl,
  style: ql,
  styleTween: Wl,
  text: jl,
  textTween: Yl,
  remove: Pl,
  tween: il,
  delay: yl,
  duration: xl,
  ease: wl,
  easeVarying: _l,
  end: Jl,
  [Symbol.iterator]: Je[Symbol.iterator]
};
function Zl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var ec = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Zl
};
function tc(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function ic(e) {
  var t, i;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = xa(), (i = ec).time = Nn(), e = e == null ? null : e + "");
  for (var n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var r = n[a], p = r.length, s, c = 0; c < p; ++c)
      (s = r[c]) && Xi(s, e, t, c, r, i || tc(s, t));
  return new Ze(n, this._parents, e, t);
}
di.prototype.interrupt = Zd;
di.prototype.transition = ic;
const bi = (e) => () => e;
function nc(e, {
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
function Qe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Qe.prototype = {
  constructor: Qe,
  scale: function(e) {
    return e === 1 ? this : new Qe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Qe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Qt = new Qe(1, 0, 0);
Qe.prototype;
function cn(e) {
  e.stopImmediatePropagation();
}
function Wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function oc(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ac() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function vo() {
  return this.__zoom || Qt;
}
function sc(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function rc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function dc(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > n ? (n + o) / 2 : Math.min(0, n) || Math.max(0, o),
    r > a ? (a + r) / 2 : Math.min(0, a) || Math.max(0, r)
  );
}
function lc() {
  var e = oc, t = ac, i = dc, n = sc, o = rc, a = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], p = 250, s = Hd, c = Tn("start", "zoom", "end"), h, y, m, g = 500, v = 150, d = 0, l = 10;
  function f(I) {
    I.property("__zoom", vo).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", w).on("dblclick.zoom", E).filter(o).on("touchstart.zoom", H).on("touchmove.zoom", oe).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  f.transform = function(I, P, C, x) {
    var $ = I.selection ? I.selection() : I;
    $.property("__zoom", vo), I !== $ ? R(I, P, C, x) : $.interrupt().each(function() {
      L(this, arguments).event(x).start().zoom(null, typeof P == "function" ? P.apply(this, arguments) : P).end();
    });
  }, f.scaleBy = function(I, P, C, x) {
    f.scaleTo(I, function() {
      var $ = this.__zoom.k, M = typeof P == "function" ? P.apply(this, arguments) : P;
      return $ * M;
    }, C, x);
  }, f.scaleTo = function(I, P, C, x) {
    f.transform(I, function() {
      var $ = t.apply(this, arguments), M = this.__zoom, S = C == null ? _($) : typeof C == "function" ? C.apply(this, arguments) : C, T = M.invert(S), N = typeof P == "function" ? P.apply(this, arguments) : P;
      return i(b(k(M, N), S, T), $, r);
    }, C, x);
  }, f.translateBy = function(I, P, C, x) {
    f.transform(I, function() {
      return i(this.__zoom.translate(
        typeof P == "function" ? P.apply(this, arguments) : P,
        typeof C == "function" ? C.apply(this, arguments) : C
      ), t.apply(this, arguments), r);
    }, null, x);
  }, f.translateTo = function(I, P, C, x, $) {
    f.transform(I, function() {
      var M = t.apply(this, arguments), S = this.__zoom, T = x == null ? _(M) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Qt.translate(T[0], T[1]).scale(S.k).translate(
        typeof P == "function" ? -P.apply(this, arguments) : -P,
        typeof C == "function" ? -C.apply(this, arguments) : -C
      ), M, r);
    }, x, $);
  };
  function k(I, P) {
    return P = Math.max(a[0], Math.min(a[1], P)), P === I.k ? I : new Qe(P, I.x, I.y);
  }
  function b(I, P, C) {
    var x = P[0] - C[0] * I.k, $ = P[1] - C[1] * I.k;
    return x === I.x && $ === I.y ? I : new Qe(I.k, x, $);
  }
  function _(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function R(I, P, C, x) {
    I.on("start.zoom", function() {
      L(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var $ = this, M = arguments, S = L($, M).event(x), T = t.apply($, M), N = C == null ? _(T) : typeof C == "function" ? C.apply($, M) : C, z = Math.max(T[1][0] - T[0][0], T[1][1] - T[0][1]), q = $.__zoom, j = typeof P == "function" ? P.apply($, M) : P, de = s(q.invert(N).concat(z / q.k), j.invert(N).concat(z / j.k));
      return function(ce) {
        if (ce === 1) ce = j;
        else {
          var F = de(ce), G = z / F[2];
          ce = new Qe(G, N[0] - F[0] * G, N[1] - F[1] * G);
        }
        S.zoom(null, ce);
      };
    });
  }
  function L(I, P, C) {
    return !C && I.__zooming || new D(I, P);
  }
  function D(I, P) {
    this.that = I, this.args = P, this.active = 0, this.sourceEvent = null, this.extent = t.apply(I, P), this.taps = 0;
  }
  D.prototype = {
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
      var P = He(this.that).datum();
      c.call(
        I,
        this.that,
        new nc(I, {
          sourceEvent: this.sourceEvent,
          target: f,
          transform: this.that.__zoom,
          dispatch: c
        }),
        P
      );
    }
  };
  function W(I, ...P) {
    if (!e.apply(this, arguments)) return;
    var C = L(this, P).event(I), x = this.__zoom, $ = Math.max(a[0], Math.min(a[1], x.k * Math.pow(2, n.apply(this, arguments)))), M = ct(I);
    if (C.wheel)
      (C.mouse[0][0] !== M[0] || C.mouse[0][1] !== M[1]) && (C.mouse[1] = x.invert(C.mouse[0] = M)), clearTimeout(C.wheel);
    else {
      if (x.k === $) return;
      C.mouse = [M, x.invert(M)], Oi(this), C.start();
    }
    Wt(I), C.wheel = setTimeout(S, v), C.zoom("mouse", i(b(k(x, $), C.mouse[0], C.mouse[1]), C.extent, r));
    function S() {
      C.wheel = null, C.end();
    }
  }
  function w(I, ...P) {
    if (m || !e.apply(this, arguments)) return;
    var C = I.currentTarget, x = L(this, P, !0).event(I), $ = He(I.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", z, !0), M = ct(I, C), S = I.clientX, T = I.clientY;
    Id(I.view), cn(I), x.mouse = [M, this.__zoom.invert(M)], Oi(this), x.start();
    function N(q) {
      if (Wt(q), !x.moved) {
        var j = q.clientX - S, de = q.clientY - T;
        x.moved = j * j + de * de > d;
      }
      x.event(q).zoom("mouse", i(b(x.that.__zoom, x.mouse[0] = ct(q, C), x.mouse[1]), x.extent, r));
    }
    function z(q) {
      $.on("mousemove.zoom mouseup.zoom", null), bd(q.view, x.moved), Wt(q), x.event(q).end();
    }
  }
  function E(I, ...P) {
    if (e.apply(this, arguments)) {
      var C = this.__zoom, x = ct(I.changedTouches ? I.changedTouches[0] : I, this), $ = C.invert(x), M = C.k * (I.shiftKey ? 0.5 : 2), S = i(b(k(C, M), x, $), t.apply(this, P), r);
      Wt(I), p > 0 ? He(this).transition().duration(p).call(R, S, x, I) : He(this).call(f.transform, S, x, I);
    }
  }
  function H(I, ...P) {
    if (e.apply(this, arguments)) {
      var C = I.touches, x = C.length, $ = L(this, P, I.changedTouches.length === x).event(I), M, S, T, N;
      for (cn(I), S = 0; S < x; ++S)
        T = C[S], N = ct(T, this), N = [N, this.__zoom.invert(N), T.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== N[2] && ($.touch1 = N, $.taps = 0) : ($.touch0 = N, M = !0, $.taps = 1 + !!h);
      h && (h = clearTimeout(h)), M && ($.taps < 2 && (y = N[0], h = setTimeout(function() {
        h = null;
      }, g)), Oi(this), $.start());
    }
  }
  function oe(I, ...P) {
    if (this.__zooming) {
      var C = L(this, P).event(I), x = I.changedTouches, $ = x.length, M, S, T, N;
      for (Wt(I), M = 0; M < $; ++M)
        S = x[M], T = ct(S, this), C.touch0 && C.touch0[2] === S.identifier ? C.touch0[0] = T : C.touch1 && C.touch1[2] === S.identifier && (C.touch1[0] = T);
      if (S = C.that.__zoom, C.touch1) {
        var z = C.touch0[0], q = C.touch0[1], j = C.touch1[0], de = C.touch1[1], ce = (ce = j[0] - z[0]) * ce + (ce = j[1] - z[1]) * ce, F = (F = de[0] - q[0]) * F + (F = de[1] - q[1]) * F;
        S = k(S, Math.sqrt(ce / F)), T = [(z[0] + j[0]) / 2, (z[1] + j[1]) / 2], N = [(q[0] + de[0]) / 2, (q[1] + de[1]) / 2];
      } else if (C.touch0) T = C.touch0[0], N = C.touch0[1];
      else return;
      C.zoom("touch", i(b(S, T, N), C.extent, r));
    }
  }
  function te(I, ...P) {
    if (this.__zooming) {
      var C = L(this, P).event(I), x = I.changedTouches, $ = x.length, M, S;
      for (cn(I), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, g), M = 0; M < $; ++M)
        S = x[M], C.touch0 && C.touch0[2] === S.identifier ? delete C.touch0 : C.touch1 && C.touch1[2] === S.identifier && delete C.touch1;
      if (C.touch1 && !C.touch0 && (C.touch0 = C.touch1, delete C.touch1), C.touch0) C.touch0[1] = this.__zoom.invert(C.touch0[0]);
      else if (C.end(), C.taps === 2 && (S = ct(S, this), Math.hypot(y[0] - S[0], y[1] - S[1]) < l)) {
        var T = He(this).on("dblclick.zoom");
        T && T.apply(this, arguments);
      }
    }
  }
  return f.wheelDelta = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : bi(+I), f) : n;
  }, f.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : bi(!!I), f) : e;
  }, f.touchable = function(I) {
    return arguments.length ? (o = typeof I == "function" ? I : bi(!!I), f) : o;
  }, f.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : bi([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), f) : t;
  }, f.scaleExtent = function(I) {
    return arguments.length ? (a[0] = +I[0], a[1] = +I[1], f) : [a[0], a[1]];
  }, f.translateExtent = function(I) {
    return arguments.length ? (r[0][0] = +I[0][0], r[1][0] = +I[1][0], r[0][1] = +I[0][1], r[1][1] = +I[1][1], f) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, f.constrain = function(I) {
    return arguments.length ? (i = I, f) : i;
  }, f.duration = function(I) {
    return arguments.length ? (p = +I, f) : p;
  }, f.interpolate = function(I) {
    return arguments.length ? (s = I, f) : s;
  }, f.on = function() {
    var I = c.on.apply(c, arguments);
    return I === c ? f : I;
  }, f.clickDistance = function(I) {
    return arguments.length ? (d = (I = +I) * I, f) : Math.sqrt(d);
  }, f.tapDistance = function(I) {
    return arguments.length ? (l = +I, f) : l;
  }, f;
}
var cc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, we = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? pc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && cc(t, i, o), o;
};
function uc(e, t, i, n) {
  const o = t.x - e.x, a = t.y - e.y, r = n.x - i.x, p = n.y - i.y, s = o * p - a * r;
  if (Math.abs(s) < 1e-9) return null;
  const c = ((i.x - e.x) * p - (i.y - e.y) * r) / s, h = ((i.x - e.x) * a - (i.y - e.y) * o) / s;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * o, y: e.y + c * a, t: c };
}
function mc(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, a = n * n + o * o || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / a)), p = t.x + r * n, s = t.y + r * o;
  return { dist: Math.hypot(e.x - p, e.y - s), t: r };
}
function fc(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], r = e[o + 1], p = Math.hypot(r.x - a.x, r.y - a.y) || 1, s = (r.x - a.x) / p, c = (r.y - a.y) / p, h = t.map(([m, g]) => uc(a, r, m, g)).filter((m) => m !== null).filter((m) => m.t * p > i + 2 && (1 - m.t) * p > i + 2).sort((m, g) => m.t - g.t);
    let y = -1 / 0;
    for (const m of h)
      m.t * p - i <= y + 2 || (n += ` L ${m.x - s * i} ${m.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${m.x + s * i} ${m.y + c * i}`, y = m.t * p + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const At = {
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
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Qt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "external-system" && i.kind !== "external-table" && i.kind !== "mcp-server" && i.kind !== "api" && i.kind !== "proxy-api" && i.kind !== "api-operation")
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
    this._zoomBehavior = lc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), He(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, r = this.fitInsets.top ?? 0, p = this.fitInsets.bottom ?? 0, s = Math.max(80, n.width - o - a), c = Math.max(80, n.height - r - p), h = Math.min(...t.map((l) => l.x - l.w / 2)) - e, y = Math.max(...t.map((l) => l.x + l.w / 2)) + e, m = Math.min(...t.map((l) => l.y - l.h / 2)) - e, g = Math.max(...t.map((l) => l.y + l.h / 2)) + e, v = Math.max(0.15, Math.min(s / (y - h), c / (g - m), 1.25)), d = Qt.translate(
      o + s / 2 - v * (h + y) / 2,
      r + c / 2 - v * (m + g) / 2
    ).scale(v);
    He(i).call(this._zoomBehavior.transform, d);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(He(t), e);
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
      const p = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (p)
        return { x: e.x + (p.x - r.x), y: e.y + (p.y - r.y) };
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
        const o = this.nodePos(n), a = o.x - n.w / 2 + 10 + e.w / 2, r = o.x + n.w / 2 - 10 - e.w / 2, p = o.y - n.h / 2 + 34 + e.h / 2, s = o.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), r), i = Math.min(Math.max(i, p), s);
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
      (l) => a.has(l.id) && !(l.parentId && a.has(l.parentId))
    ) : null, p = r ? new Map(r.map((l) => [l.id, this.nodePos(l)])) : null, s = (l) => (l.shiftKey || l.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r || l.shiftKey && t.kind === "external-system" && !r, c = r ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, h = c !== null, y = c === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const l = [], f = c === "menu" ? this.scene.nodes.filter((k) => k.kind === "ui-app") : this.scene.nodes.filter((k) => k.id === t.parentId);
      for (const k of f) {
        const b = this.scene.nodes.filter((D) => D.parentId === k.id && y.includes(D.kind ?? "") && D.id !== t.id).sort((D, W) => D.y - W.y), _ = k.x - k.w / 2 + 10, R = k.x + k.w / 2 - 10;
        for (const D of b) l.push({ x1: _, x2: R, y: D.y - D.h / 2 - 3, appId: k.id, beforeId: D.id });
        const L = b[b.length - 1];
        l.push({
          x1: _,
          x2: R,
          y: L ? L.y + L.h / 2 + 3 : k.y - k.h / 2 + 34 + 8,
          appId: k.id,
          beforeId: null
        });
      }
      return l;
    }, g = (l) => {
      const f = this.nodeIdAt(l), k = f && f !== t.id ? this.scene.nodes.find((b) => b.id === f) : void 0;
      return k ? k.kind === "external-system" ? k.id : k.parentId ?? null : null;
    }, v = (l) => {
      if ((l.buttons & 1) === 0) {
        d(l);
        return;
      }
      const f = this.toScene(l), k = f.x - i.x, b = f.y - i.y;
      if (!(!o && Math.hypot(k, b) < 3 / this._t.k))
        if (o = !0, r && p) {
          const _ = /* @__PURE__ */ new Map();
          for (const R of r) {
            const L = p.get(R.id), D = this.clampToParent(R, L.x + k, L.y + b);
            _.set(R.id, { x: D.x, y: D.y });
          }
          this._dragGroup = _;
        } else if (h) {
          this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const _ = this.scene.nodes.filter(
            (L) => y.includes(L.kind ?? "") && L.id !== t.id && Math.abs(f.x - L.x) <= L.w / 2 + 8
          ), R = c === "menu" ? _.find((L) => Math.abs(f.y - L.y) < L.h * 0.28) : void 0;
          if (R)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: R.id }, this._hoverNodeId = R.id;
          else {
            let L = -1, D = 14;
            this._menuSlots.slots.forEach((W, w) => {
              if (f.x < W.x1 - 24 || f.x > W.x2 + 24) return;
              const E = Math.abs(f.y - W.y);
              E < D && (D = E, L = w);
            }), this._menuSlots = { ...this._menuSlots, active: L >= 0 ? L : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else s(l) ? (this._dragPos = { id: t.id, x: n.x + k, y: n.y + b }, this._hoverNodeId = g(l)) : (this._dragPos = this.clampToParent(t, n.x + k, n.y + b), this._hoverNodeId = null);
    }, d = (l) => {
      if (window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", d), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, k]) => ({ id: f, x: k.x, y: k.y }))
        });
      else if (o && this._dragPos && h) {
        const f = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const k = c === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (f != null && f.nestRowId)
          this.emit(k, { id: t.id, nestRowId: f.nestRowId });
        else if (f && f.active !== null) {
          const b = f.slots[f.active];
          this.emit(k, { id: t.id, appId: b.appId, beforeId: b.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (s(l)) {
          const f = g(l);
          if (l.ctrlKey && t.kind === "api") {
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
    const o = 160, a = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, p = this.scene.nodes.filter((d) => d.parentId === t.id), s = Math.min(...p.map((d) => d.x - d.w / 2)), c = Math.max(...p.map((d) => d.x + d.w / 2)), h = Math.min(...p.map((d) => d.y - d.h / 2)), y = Math.max(...p.map((d) => d.y + d.h / 2)), m = Ba(
      p.map((d) => ({ dx: d.x - r.x, dy: d.y - r.y, w: d.w, h: d.h })),
      { w: o, h: a }
    ), g = (d) => {
      if ((d.buttons & 1) === 0) {
        v();
        return;
      }
      const l = this.toScene(d);
      if (d.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(m.w, 2 * Math.abs(l.x - r.x)),
          h: Math.max(m.h, 2 * Math.abs(l.y - r.y))
        };
        return;
      }
      const f = r.x - i * r.w / 2, k = r.y - n * r.h / 2, b = i > 0 ? Math.max(l.x, f + o, p.length ? c + 10 : -1 / 0) : Math.min(l.x, f - o, p.length ? s - 10 : 1 / 0), _ = n > 0 ? Math.max(l.y, k + a, p.length ? y + 10 : -1 / 0) : Math.min(l.y, k - a, p.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (f + b) / 2,
        y: (k + _) / 2,
        w: Math.abs(b - f),
        h: Math.abs(_ - k)
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
      const p = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: p.x, y: p.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, a = (r) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const p = this.nodeIdAt(r);
      p && p !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: p,
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
    const { x: n, y: o } = this.nodePos(e), a = t - n, r = i - o, p = e.w / 2, s = e.h / 2;
    if (a === 0 && r === 0) return { x: n, y: o };
    const c = 1 / Math.max(Math.abs(a) / p, Math.abs(r) / s);
    return { x: n + a * c, y: o + r * c };
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
    const t = this.scene.nodes.find((h) => h.id === e.sourceId), i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(i), r = n[0] ?? a, p = n[n.length - 1] ?? o;
    let s = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, p.x, p.y);
    if (!n.length) {
      const h = this.edgeOffset(e);
      if (h !== 0) {
        const y = Math.hypot(c.x - s.x, c.y - s.y) || 1, m = -(c.y - s.y) / y * h, g = (c.x - s.x) / y * h;
        s = { x: s.x + m, y: s.y + g }, c = { x: c.x + m, y: c.y + g };
      }
    }
    return [s, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let o = !1;
    const a = (p) => {
      if (!this._wpDrag) return;
      const s = this.toScene(p);
      if (!o && Math.hypot(s.x - n.x, s.y - n.y) < 4 / this._t.k) return;
      o = !0;
      const c = [...this._wpDrag.points];
      c[this._wpDrag.index] = s, this._wpDrag = { ...this._wpDrag, points: c };
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: o } = mc(t, e[n], e[n + 1]);
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
        p();
        return;
      }
      const c = this.toScene(s);
      if (a) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[o] = c, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(o, 0, c), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: h, index: o };
      }
    }, p = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", p), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", p);
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
    const n = e.color ?? "#64748b", o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), p = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, s = t.slice(1, -1);
    return ie`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${fc(t, i)}
              fill="none"
              stroke=${n} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? ie`<text x=${p.x} y=${p.y - 6} text-anchor="middle"
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
        ${o ? s.map((c, h) => {
      var m;
      const y = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === h;
      return ie`
                <circle data-waypoint cx=${c.x} cy=${c.y} r=${y ? 6 : 5}
                        fill=${y ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(g) => {
        g.button === 0 && (g.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(g) => {
        g.stopPropagation(), this.removeWaypoint(e, h);
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
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, r = !!e.parentId, p = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, s = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.h : e.h, c = p / 2, h = s / 2, y = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ie`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (v = this._dragGroup) != null && v.has(e.id) ? "none" : "auto"}
         @pointerdown=${(l) => this.onNodePointerDown(l, e)}
         @dblclick=${(l) => {
      l.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ie`<rect x=${-c - 4} y=${-h - 4} width=${p + 8} height=${s + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-h} width=${p} height=${s} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ie`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ie`<text x=${-c} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ie`<g transform="translate(${c - 13}, ${-h + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(l) => {
      l.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(l) => l.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && At[e.symbol] && !r ? ie`<g transform="translate(${c - (e.collapsible ? 37 : 17)}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${At[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && At[e.symbol] ? ie`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${At[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ie`
              <foreignObject x=${-c + 6} y=${a ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(l) => l.stopPropagation()}
                  @keydown=${(l) => {
      l.stopPropagation(), l.key === "Enter" && this.commitRename(e, l.target.value), l.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(l) => this.commitRename(e, l.target.value)}
                />
              </foreignObject>` : r ? ie`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${y}</text>` : a ? ie`<text x=${-c + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ie`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? ie`<line x1=${-c + 8} y1=${-h + 28} x2=${c - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [c, 0],
      [-c, 0],
      [0, h],
      [0, -h]
    ].map(
      ([l, f]) => ie`
                <circle data-handle cx=${l} cy=${f} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(k) => this.onHandlePointerDown(k, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((d = e.extraHandles) != null && d.length) ? e.extraHandles.map(
      (l, f) => ie`
                <g transform="translate(${-c + 24 + f * 20}, ${-h})">
                  <circle data-handle r="7" fill=${l.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(k) => this.onHandlePointerDown(k, e, l.kind)}>
                    <title>${l.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(a || e.resizable) && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([l, f]) => ie`
                <rect data-resize x=${l * c - 6.5} y=${f * h - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${l * f > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(k) => this.onResizePointerDown(k, e, l, f)}>
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
      const p = this.toScene(r);
      !i && Math.hypot(p.x - t.x, p.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: p });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: r, b: p } = this._rubber, s = Math.min(r.x, p.x), c = Math.max(r.x, p.x), h = Math.min(r.y, p.y), y = Math.max(r.y, p.y), m = this.scene.nodes.filter((g) => {
          const v = this.nodePos(g);
          return v.x >= s && v.x <= c && v.y >= h && v.y <= y;
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
    const n = this.getBoundingClientRect(), o = this._t.k, a = Qt.translate(n.width / 2 - o * e, n.height / 2 - o * t).scale(o);
    He(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - n.left) / i, a = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, p = o.width / this._t.k, s = o.height / this._t.k;
    return A`
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
      var h, y;
      (y = (h = c.currentTarget).hasPointerCapture) != null && y.call(h, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const h = this.nodePos(c);
      return ie`<rect
              x=${(h.x - c.w / 2 - e.minX) * n}
              y=${(h.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * n}
            y=${(r - e.minY) * n}
            width=${p * n}
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
we([
  re({ attribute: !1 })
], Ie.prototype, "scene", 2);
we([
  re({ attribute: !1 })
], Ie.prototype, "selectedId", 2);
we([
  re({ attribute: !1 })
], Ie.prototype, "selectedIds", 2);
we([
  re({ type: Boolean })
], Ie.prototype, "connectable", 2);
we([
  re({ attribute: !1 })
], Ie.prototype, "edgePoints", 2);
we([
  U()
], Ie.prototype, "_t", 2);
we([
  U()
], Ie.prototype, "_dragPos", 2);
we([
  U()
], Ie.prototype, "_menuSlots", 2);
we([
  U()
], Ie.prototype, "_dragGroup", 2);
we([
  U()
], Ie.prototype, "_pendingLink", 2);
we([
  U()
], Ie.prototype, "_hoverNodeId", 2);
we([
  U()
], Ie.prototype, "_editingId", 2);
we([
  U()
], Ie.prototype, "_spaceDown", 2);
we([
  U()
], Ie.prototype, "_wpDrag", 2);
we([
  U()
], Ie.prototype, "_selectedWaypoint", 2);
we([
  U()
], Ie.prototype, "_resize", 2);
we([
  U()
], Ie.prototype, "_rubber", 2);
we([
  re({ attribute: !1 })
], Ie.prototype, "fitInsets", 2);
Ie = we([
  vt("modux-canvas")
], Ie);
function wo(e) {
  const t = e.legs ?? [], i = /* @__PURE__ */ new Map();
  for (let a = 0; a <= t.length; a++) {
    let r = !1;
    for (const p of t) {
      const s = Math.max(0, ...(p.afterLegIds ?? []).map((c) => i.get(c) ?? 0)) + 1;
      s <= t.length && s !== (i.get(p.id) ?? 0) && (i.set(p.id, s), r = !0);
    }
    if (!r) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const a of t) {
    const r = i.get(a.id) ?? 1;
    n.set(r, [...n.get(r) ?? [], a.id]);
  }
  const o = /* @__PURE__ */ new Map();
  for (const [a, r] of n)
    r.forEach((p, s) => {
      o.set(p, r.length === 1 ? `${a}` : `${a}${String.fromCharCode(97 + s)}`);
    });
  return o;
}
const ee = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  boundedContext: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Te(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function me(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const St = (e) => e.trim().toLowerCase();
function hc(e, t) {
  var w, E, H, oe, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.boundedContexts.map((I) => [I.id, I.name])), o = e.boundedContexts.flatMap(
    (I) => (I.useCases ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  ), a = new Set(o.map((I) => I.id)), r = e.aggregates ?? [], p = new Set(
    e.boundedContexts.flatMap((I) => (I.domainServices ?? []).map((P) => P.id))
  ), s = e.boundedContexts.flatMap(
    (I) => (I.domainEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !1 }))
  ), c = e.boundedContexts.flatMap(
    (I) => (I.applicationEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !0 }))
  ), h = e.boundedContexts.flatMap(
    (I) => (I.readModels ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  );
  for (const I of o)
    Te(i, {
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
      tooltip: I.policy ? `${I.name} — policy de ${n.get(I.boundedContextId) ?? I.boundedContextId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  for (const I of o)
    (I.steps ?? []).forEach((P, C) => {
      Te(i, {
        id: P.id,
        label: `${C + 1}. ${P.name || P.type || "paso"}`,
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
      }), me(i, {
        id: `esstep:${C === 0 ? I.id : (I.steps ?? [])[C - 1].id}->${P.id}`,
        sourceId: C === 0 ? I.id : (I.steps ?? [])[C - 1].id,
        targetId: P.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${I.name}`
      });
    });
  for (const I of e.customCodes ?? [])
    Te(i, {
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
      P.customCodeId && me(i, {
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
    Te(i, {
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
      tooltip: `${I.name} — agregado de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const I of [...s, ...c])
    Te(i, {
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
      tooltip: `${I.name} — evento de ${n.get(I.boundedContextId) ?? I.boundedContextId}`
    }), y.set(St(I.name), I.id);
  const m = (I) => {
    if (!I || !I.trim()) return null;
    const P = y.get(St(I));
    if (P) return P;
    const C = `evname:${St(I)}`;
    return Te(i, {
      id: C,
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
    }), C;
  }, g = (I) => {
    const P = h.find((x) => x.id === I.id) ?? h.find((x) => I.name && St(x.name) === St(I.name)), C = (P == null ? void 0 : P.id) ?? (I.id || (I.name ? `rm:${St(I.name)}` : null));
    return C ? (Te(i, {
      id: C,
      label: (P == null ? void 0 : P.name) ?? I.name ?? C,
      x: 0,
      y: 0,
      w: ee.readModel.w,
      h: ee.readModel.h,
      kind: P ? "read-model" : "derived-read-model",
      fill: ee.readModel.fill,
      stroke: ee.readModel.stroke,
      dashed: !P,
      badge: "READ MODEL"
    }), C) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!a.has(I.targetId)) continue;
    const P = (e.actors ?? []).find((C) => C.id === I.actorId);
    P && (Te(i, {
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
    }), me(i, {
      id: `es-actor:${P.id}->${I.targetId}`,
      sourceId: P.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const P = (e.agentUses ?? []).filter((S) => S.agentId === I.id), C = (e.agentExternalUses ?? []).filter((S) => S.agentId === I.id), x = (e.agentRags ?? []).filter((S) => S.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((S) => S.agentId === I.id), M = (e.agentGatewayUses ?? []).some((S) => S.agentId === I.id) || (e.agentApiOpUses ?? []).some((S) => S.agentId === I.id) || (e.agentQueryUses ?? []).some((S) => S.agentId === I.id) || (e.agentDelegations ?? []).some((S) => S.agentId === I.id) || (e.agentTriggers ?? []).some((S) => S.agentId === I.id);
    if (!(!P.length && !C.length && !x.length && !$.length && !M)) {
      Te(i, {
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
      for (const S of P)
        a.has(S.useCaseId) && me(i, {
          id: `es-agent:${I.id}->${S.useCaseId}`,
          sourceId: I.id,
          targetId: S.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const S of C) {
        const T = e.externalSystems.find(
          (z) => (z.useCases ?? []).some((q) => q.id === S.externalUseCaseId)
        );
        if (!T) continue;
        const N = (w = (T.useCases ?? []).find((z) => z.id === S.externalUseCaseId)) == null ? void 0 : w.name;
        Te(i, {
          id: T.id,
          label: T.name,
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
        }), me(i, {
          id: `es-agentx:${I.id}->${S.externalUseCaseId}`,
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
      for (const S of $) {
        const T = e.externalSystems.find(
          (z) => (z.mcpServers ?? []).some((q) => q.id === S.mcpServerId)
        );
        if (!T) continue;
        const N = (E = (T.mcpServers ?? []).find((z) => z.id === S.mcpServerId)) == null ? void 0 : E.name;
        Te(i, {
          id: T.id,
          label: T.name,
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
        }), me(i, {
          id: `es-agentmcp:${I.id}->${S.mcpServerId}`,
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
      for (const S of x) {
        const T = (e.rags ?? []).find((N) => N.id === S.ragId);
        if (T) {
          Te(i, {
            id: T.id,
            label: T.name,
            x: 0,
            y: 0,
            w: ee.readModel.w,
            h: ee.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${T.name} — base de conocimiento (retrieval)`
          }), me(i, {
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
            const z = g({ id: N });
            z && me(i, {
              id: `es-ragsrc:${T.id}->${z}`,
              sourceId: z,
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
    const P = e.externalSystems.find((C) => C.id === I);
    return P ? (Te(i, {
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
    const P = v(I.externalSystemId);
    !P || !a.has(I.useCaseId) || me(i, {
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
    ), C = P ? v(P.id) : null;
    if (!C) continue;
    const x = (H = ((P == null ? void 0 : P.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : H.name;
    me(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: C,
      kind: "es-command-external",
      label: x,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: x ? `Llama a ${x} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !a.has(I.sourceId) || !i.nodes.has(I.targetId) || me(i, {
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
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (a.has(I.sourceId) || r.some((C) => C.id === I.sourceId) || p.has(I.sourceId))) || me(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const l = (I, P, C, x, $, M) => (Te(i, {
    id: I,
    label: P,
    x: 0,
    y: 0,
    w: ee.policy.w,
    h: ee.policy.h,
    kind: C,
    symbol: "flow",
    fill: ee.policy.fill,
    stroke: ee.policy.stroke,
    badge: x,
    tooltip: $
  }), I), f = (I, P) => {
    const C = m(I);
    C && me(i, {
      id: `es-trigger:${C}->${P}`,
      sourceId: C,
      targetId: P,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, k = (I, P) => {
    !P || !a.has(P) || me(i, {
      id: `es-invoke:${I}->${P}`,
      sourceId: I,
      targetId: P,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const P = l(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    f(I.eventName, P);
    for (const C of I.actions ?? []) {
      if (C.type === "CallUseCase" && k(P, C.useCaseId), C.type === "StartSaga" && C.sagaId) {
        const x = `saga:${C.sagaId}`;
        l(x, C.sagaId, "saga", "SAGA"), me(i, {
          id: `es-saga:${P}->${x}`,
          sourceId: P,
          targetId: x,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (C.type === "UpdateProjection" && C.projectionId) {
        const x = (e.projections ?? []).find(($) => $.id === C.projectionId);
        x && me(i, {
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
    const P = l(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const $ of I.handledEventIds) {
      const M = i.nodes.has($) ? $ : null;
      M && me(i, {
        id: `es-trigger:${M}->${P}`,
        sourceId: M,
        targetId: P,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && i.nodes.has(I.sourceAggregateId) && me(i, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: P,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const C = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (C) {
      const $ = e.externalSystems.find(
        (S) => (S.useCases ?? []).some((T) => T.id === C) || (S.tables ?? []).some((T) => T.id === C)
      ), M = $ ? v($.id) : null;
      if (M) {
        const S = ((oe = ($.useCases ?? []).find((T) => T.id === C)) == null ? void 0 : oe.name) ?? ((te = ($.tables ?? []).find((T) => T.id === C)) == null ? void 0 : te.name);
        me(i, {
          id: `es-poll:${I.id}`,
          sourceId: M,
          targetId: P,
          kind: "es-projects-poll",
          label: S,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: S ? `polling de ${S}` : "polling"
        });
      }
    }
    const x = g({ id: I.readModelId, name: I.readModelName });
    x && me(i, {
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
      const C = m(I.triggerEvent), x = g({ name: I.readModelName ?? `${I.triggerEvent}View` });
      C && x && me(i, {
        id: `es-mat:${I.id}`,
        sourceId: C,
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
    const P = l(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (f(I.triggerEvent, P), k(P, I.targetUseCaseId), !I.targetUseCaseId) {
      const C = v(I.targetId), x = C ?? `tgt:${I.targetId}`;
      !C && n.has(I.targetId) && Te(i, {
        id: x,
        label: n.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: ee.boundedContext.w,
        h: ee.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: ee.boundedContext.fill,
        stroke: ee.boundedContext.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(x) && me(i, {
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
    const P = l(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    f(I.triggerEvent, P);
    for (const x of I.steps) k(P, x.useCaseId);
    const C = m(I.onCompletionEventName);
    C && me(i, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: C,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const P = l(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    f(I.triggerEvent, P);
    for (const x of I.steps ?? []) {
      k(P, x.targetUseCaseId);
      for (const $ of [x.emittedEventName, x.completionEventName]) {
        const M = m($);
        M && me(i, {
          id: `es-wfemit:${I.id}:${M}`,
          sourceId: P,
          targetId: M,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const C = m(I.onCompletionEventName);
    C && me(i, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: C,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const b = [...i.nodes.values()], _ = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    _.has(I.targetId) || _.set(I.targetId, []), _.get(I.targetId).push(I.sourceId);
  const R = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Set(), D = (I) => {
    const P = R.get(I);
    if (P !== void 0) return P;
    if (L.has(I)) return 0;
    L.add(I);
    const C = _.get(I) ?? [], x = C.length ? 1 + Math.max(...C.map(D)) : 0;
    return L.delete(I), R.set(I, x), x;
  }, W = /* @__PURE__ */ new Map();
  for (const I of b) {
    const P = t[I.id];
    if (P) {
      I.x = P.x, I.y = P.y;
      continue;
    }
    const C = D(I.id), x = W.get(C) ?? 0;
    W.set(C, x + 1), I.x = 140 + C * 260, I.y = 110 + x * 110;
  }
  return { nodes: b, edges: i.edges };
}
const gc = 190, yc = 56, ko = 180, Ic = 56, bc = 150, xc = 44, _o = 250, $o = 100;
function vc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((p) => t.get(p)).filter(Boolean), r = a.length ? 1 + Math.max(...a.map(n)) : 0;
    return i.delete(o.id), r;
  };
  return n(e);
}
function wc(e, t) {
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
function kc(e, t) {
  var s;
  const i = [], n = [], o = /* @__PURE__ */ new Set(), a = (c) => {
    var h;
    return (h = e.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === c)) == null ? void 0 : h.name;
  };
  let r = 140;
  (e.workflows ?? []).forEach((c) => {
    var k;
    const h = new Map(c.steps.map((b) => [b.id, b])), y = new Map(c.steps.map((b) => [b.id, vc(b, h)])), m = /* @__PURE__ */ new Map();
    for (const b of c.steps) {
      const _ = y.get(b.id) ?? 0;
      m.set(_, (m.get(_) ?? 0) + 1);
    }
    const g = Math.max(1, ...m.values()), v = wc(e, c);
    if (v && !o.has(v.id)) {
      o.add(v.id);
      const b = t[v.id] ?? { x: 140, y: r };
      i.push({
        id: v.id,
        label: v.label,
        x: b.x,
        y: b.y,
        w: bc,
        h: xc,
        kind: v.kind,
        symbol: v.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: v.kind === "aggregate" ? "AGGREGATE" : v.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const d = t[c.id] ?? { x: 420, y: r };
    i.push({
      id: c.id,
      label: c.name,
      x: d.x,
      y: d.y,
      w: gc,
      h: yc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${c.name}${c.triggerEvent ? ` — arranca con ${c.triggerEvent}` : ""}${c.onCompletionEventName ? ` · emite ${c.onCompletionEventName} al completar` : ""}`
    }), v && n.push({
      id: `wft:${c.id}`,
      sourceId: v.id,
      targetId: c.id,
      kind: "workflow-trigger",
      label: c.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: c.triggerEvent ? `Evento: ${c.triggerEvent}` : void 0
    });
    const l = /* @__PURE__ */ new Map();
    let f = 0;
    for (const b of c.steps) {
      const _ = y.get(b.id) ?? 0;
      f = Math.max(f, _);
      const R = l.get(_) ?? 0;
      l.set(_, R + 1);
      const L = t[b.id] ?? {
        x: d.x + (_ + 1) * _o,
        y: r + (R - (m.get(_) - 1) / 2) * $o
      }, D = a(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: L.x,
        y: L.y,
        w: b.type === "JOIN" || b.type === "SPLIT" ? 100 : ko,
        h: b.type === "JOIN" || b.type === "SPLIT" ? 48 : Ic,
        kind: "workflow-step",
        symbol: b.type === "JOIN" || b.type === "SPLIT" ? "flow" : b.roleId ? "actor" : "event",
        fill: b.type === "JOIN" || b.type === "SPLIT" ? "#f5f3ff" : b.roleId ? "#fef9c3" : "#ffffff",
        stroke: b.roleId && b.type !== "JOIN" && b.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: b.type === "JOIN" || b.type === "SPLIT",
        badge: b.type === "JOIN" ? "⨝ JOIN" : b.type === "SPLIT" ? "⑃ SPLIT" : b.roleId ? `👤 ${b.roleId}${b.formPageId ? " · 📋" : ""}${b.deadline ? ` · ${b.deadline}` : ""}` : D ? `→ ${D}` : "∅ sin use case",
        tooltip: b.type === "JOIN" ? `${b.name} — espera a TODAS sus dependencias antes de seguir` : b.type === "SPLIT" ? `${b.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${b.name}${b.roleId ? ` · tarea HUMANA de ${b.roleId}${b.deadline ? ` (plazo ${b.deadline})` : ""}` : ""}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${D ? ` · lanza ${D}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}${b.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const W = (b.dependsOnStepIds ?? []).filter((w) => h.has(w));
      W.length === 0 && n.push({
        id: `wfs:${c.id}:${b.id}`,
        sourceId: c.id,
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
          tooltip: `${b.name} espera a ${((k = h.get(w)) == null ? void 0 : k.name) ?? w}`
        });
    }
    if (c.onCompletionEventName) {
      const b = `done:${c.id}`, _ = t[b] ?? { x: d.x + (f + 2) * _o, y: r };
      i.push({
        id: b,
        label: c.onCompletionEventName,
        x: _.x,
        y: _.y,
        w: ko,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const R = new Set(c.steps.flatMap((D) => D.dependsOnStepIds ?? [])), L = c.steps.filter((D) => !R.has(D.id));
      for (const D of L.length ? L : [])
        n.push({
          id: `wfd:${c.id}:${D.id}`,
          sourceId: D.id,
          targetId: b,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      c.steps.length || n.push({
        id: `wfd:${c.id}`,
        sourceId: c.id,
        targetId: b,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, g + 1) * $o + 60;
  });
  const p = new Set(i.map((c) => c.id));
  (e.workflowGateways ?? []).forEach((c, h) => {
    const y = t[c.id] ?? { x: 200 + h % 5 * 220, y: 60 };
    i.push({
      id: c.id,
      label: c.name,
      x: y.x,
      y: y.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: c.type === "SPLIT" ? c.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : c.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: c.type === "SPLIT" ? `${c.name} — split ${c.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${c.name} — join que ${c.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), p.add(c.id);
  });
  for (const c of e.workflowGateways ?? []) {
    for (const y of c.sourceIds ?? [])
      p.has(y) && n.push({
        id: `wflink:${y}->${c.id}`,
        sourceId: y,
        targetId: c.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const h = c.type === "SPLIT" && c.semantics === "EXCLUSIVE";
    for (const y of c.targetIds ?? []) {
      if (!p.has(y)) continue;
      const m = h ? (s = (c.branchConditions ?? []).find((g) => g.targetId === y)) == null ? void 0 : s.expression : void 0;
      n.push({
        id: `wflink:${c.id}->${y}`,
        sourceId: c.id,
        targetId: y,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: h && !m,
        arrow: !0,
        label: m ?? (h ? "¿condición?" : void 0),
        tooltip: h ? `${m ? `Rama si: ${m}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((h) => (h.steps ?? []).filter((y) => y.roleId && p.has(y.id))).forEach((h, y) => {
    const m = (e.actors ?? []).find((v) => v.id === h.roleId), g = h.roleId;
    if (!p.has(g)) {
      const v = i.find((l) => l.id === h.id), d = t[g] ?? {
        x: v ? v.x - 90 : 120 + y * 200,
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
      }), p.add(g);
    }
    n.push({
      id: `wfrole:${h.id}->${g}`,
      sourceId: g,
      targetId: h.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((h) => (h.steps ?? []).filter((y) => y.formPageId && p.has(y.id))).forEach((h, y) => {
    const m = (e.pages ?? []).find((g) => g.id === h.formPageId);
    if (m) {
      if (!p.has(m.id)) {
        const g = i.find((d) => d.id === h.id), v = t[m.id] ?? {
          x: g ? g.x : 200 + y * 220,
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
        }), p.add(m.id);
      }
      n.push({
        id: `wfform:${h.id}->${m.id}`,
        sourceId: h.id,
        targetId: m.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const c of e.workflows ?? [])
    for (const h of c.steps ?? [])
      !h.handoffWorkflowId || !p.has(h.handoffWorkflowId) || !p.has(h.id) || n.push({
        id: `wflink:${h.id}->${h.handoffWorkflowId}`,
        sourceId: h.id,
        targetId: h.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: i, edges: n };
}
const Co = 250, Re = 30, pt = 6, _c = 16, Vt = 190, $c = 60, Cc = 170, xi = 44;
function Sc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function $e(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Ec(e) {
  const t = [], i = (n, o, a) => {
    for (const r of n ?? []) {
      const p = [...o, r.label];
      t.push({ entry: r, path: p, depth: a }), i(r.children ?? [], p, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Ac(e, t) {
  var R, L, D, W;
  const i = [], n = [], o = e.uiApps ?? [], a = e.pages ?? [], r = (w) => {
    var E;
    return ((E = e.boundedContexts.flatMap((H) => H.useCases ?? []).find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  }, p = (w) => {
    var E;
    return ((E = e.boundedContexts.flatMap((H) => H.queryServices ?? []).find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  }, s = /* @__PURE__ */ new Map();
  let c = 160;
  for (const w of o) {
    const E = Ec(w), H = Math.max(
      90,
      54 + E.length * (Re + pt)
    ), oe = t[w.id] ?? { x: 190, y: c + H / 2 };
    c = oe.y + H / 2 + 70;
    const te = w.type ?? "APP";
    i.push({
      id: w.id,
      label: w.title || w.name,
      x: oe.x,
      y: oe.y,
      w: Co,
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
      label: ((R = (e.models ?? []).find((C) => C.id === w.modelId)) == null ? void 0 : R.name) ?? w.modelId,
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
    for (const [C, x, $, M, S] of [
      [w.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [w.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      C && n.push({
        id: `${x === "app-view" ? "appview" : "appedit"}:${w.id}->${C}`,
        sourceId: w.id,
        targetId: C,
        kind: x,
        color: M,
        label: $,
        arrow: !0,
        tooltip: S
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
    let P = oe.y - H / 2 + 34 + 10 + Re / 2;
    for (const { entry: C, path: x, depth: $ } of E) {
      const M = Sc(w.id, C, x), S = $ * _c;
      if (i.push({
        id: M,
        label: C.label,
        x: oe.x + S / 2,
        y: P,
        w: Co - 20 - S,
        h: Re,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (L = C.children) != null && L.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (D = C.children) != null && D.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (W = C.children) != null && W.length ? "Agrupador (con submenú): no puede abrir nada" : C.pageId ? `Abre ${C.pageId}` : C.uiAdapterId ? `Abre la app ${C.uiAdapterId}` : C.useCaseId ? `Lanza ${C.useCaseId}` : C.aggregateId ? `CRUD inferido sobre ${C.aggregateId}` : C.queryOperationId ? `Listado con filtros de ${C.queryOperationId}` : "Entrada de menú sin destino"
      }), P += Re + pt, C.uiAdapterId && o.some((T) => T.id === C.uiAdapterId) && n.push({
        id: `menuapp:${M}->${C.uiAdapterId}`,
        sourceId: M,
        targetId: C.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), C.useCaseId && e.boundedContexts.some((N) => (N.useCases ?? []).some((z) => z.id === C.useCaseId)) && (s.set(C.useCaseId, {
        label: r(C.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `menuuc:${M}->${C.useCaseId}`,
        sourceId: M,
        targetId: C.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), C.aggregateId && (e.aggregates ?? []).some((T) => T.id === C.aggregateId)) {
        const T = (e.aggregates ?? []).find((N) => N.id === C.aggregateId);
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
      if (C.queryOperationId) {
        const T = e.boundedContexts.flatMap((z) => z.queryServices ?? []).find((z) => z.id === C.queryServiceId), N = ((T == null ? void 0 : T.operations) ?? []).find((z) => z.id === C.queryOperationId);
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
      C.pageId && a.some((T) => T.id === C.pageId) && n.push({
        id: `menupage:${M}->${C.pageId}`,
        sourceId: M,
        targetId: C.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let h = 160;
  const y = (w) => {
    var E;
    return ((E = a.find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  };
  for (const w of a) {
    const E = t[w.id] ?? { x: 640, y: h }, H = w.type === "WIZARD" ? w.wizardSteps ?? [] : [], oe = H.length ? 54 + H.length * (Re + pt) : $c;
    h = E.y + oe + 90, i.push({
      id: w.id,
      label: w.name,
      x: E.x,
      y: E.y,
      w: Vt,
      h: oe,
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
    let te = E.y - oe / 2 + 34 + 10 + Re / 2;
    H.forEach((I, P) => {
      const C = I.id ?? I.pageId ?? String(P);
      i.push({
        id: `wizrow:${w.id}:${C}`,
        label: `${P + 1}. ${I.label ?? (I.pageId ? y(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: E.x,
        y: te,
        w: Vt - 20,
        h: Re,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: w.id,
        tooltip: I.pageId ? `Paso ${P + 1}: ${y(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${P + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), te += Re + pt;
    });
    for (const [I, P, C, x] of [
      [w.crudDetailPageId ?? w.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [w.crudCreatePageId ?? w.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && n.push({
        id: `${P === "crud-detail" ? "cruddetail" : "crudnew"}:${w.id}->${I}`,
        sourceId: w.id,
        targetId: I,
        kind: P,
        color: x,
        label: C,
        dashed: !0,
        arrow: !0,
        tooltip: P === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let I = 0; I < (w.wizardSteps ?? []).length; I++) {
      const P = (w.wizardSteps ?? [])[I];
      if (!P.pageId) continue;
      const C = P.id ?? P.pageId;
      n.push({
        id: `wizstep:${w.id}:${C}`,
        sourceId: `wizrow:${w.id}:${C}`,
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
      label: p(w.listingQueryServiceId),
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
    var E;
    return ((E = m.find((H) => H.id === w)) == null ? void 0 : E.name) ?? w;
  };
  let v = 520;
  for (const w of m) {
    const E = w.buttons ?? [], H = w.groupIds ?? [], oe = E.length + H.length, te = t[w.id] ?? { x: 1e3, y: v }, I = Math.max(70, 54 + oe * (Re + pt));
    v = te.y + I + 80, i.push({
      id: w.id,
      label: w.name,
      x: te.x,
      y: te.y,
      w: Vt,
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
    let P = te.y - I / 2 + 34 + 10 + Re / 2;
    for (const C of E)
      i.push({
        id: `gbtn:${w.id}:${C.id}`,
        label: C.label ?? C.id,
        x: te.x,
        y: P,
        w: Vt - 20,
        h: Re,
        kind: "group-button",
        symbol: "usecase",
        fill: C.useCaseId || C.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !C.useCaseId && !C.apiOperationId,
        parentId: w.id,
        tooltip: `${C.label ?? C.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), P += Re + pt;
    for (const C of H)
      i.push({
        id: `gsub:${w.id}:${C}`,
        label: `▸ ${g(C)}`,
        x: te.x,
        y: P,
        w: Vt - 20,
        h: Re,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: w.id,
        tooltip: `Subgrupo ${g(C)} — Supr lo desanida (el grupo sigue existiendo)`
      }), P += Re + pt;
  }
  for (const w of m)
    for (const E of w.buttons ?? [])
      !E.useCaseId || !e.boundedContexts.some((oe) => (oe.useCases ?? []).some((te) => te.id === E.useCaseId)) || (s.set(E.useCaseId, {
        label: r(E.useCaseId),
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
    for (const [H, oe] of E)
      for (const te of oe)
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
  for (const [w, E] of s) {
    const H = t[w] ?? { x: 1050, y: d };
    d = H.y + xi + 46, i.push({
      id: w,
      label: E.label,
      x: H.x,
      y: H.y,
      w: Cc,
      h: xi,
      kind: E.kind,
      symbol: E.symbol,
      fill: "#ffffff",
      stroke: E.stroke
    });
  }
  let l = 120;
  for (const w of e.identityProviders ?? []) {
    const E = t[w.id] ?? { x: -320, y: l };
    l = E.y + 70 + 40, i.push({
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
  const f = (e.actorAppUses ?? []).filter(
    (w) => o.some((E) => E.id === w.appId) && (e.actors ?? []).some((E) => E.id === w.actorId)
  ), k = [...new Set(f.map((w) => w.actorId))];
  let b = 160;
  for (const w of k) {
    const E = (e.actors ?? []).find((oe) => oe.id === w), H = t[w] ?? { x: -60, y: b };
    b = H.y + xi + 46, i.push({
      id: w,
      label: E.name,
      x: H.x,
      y: H.y,
      w: 150,
      h: xi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const w of f)
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
  const _ = new Set(i.map((w) => w.id));
  for (const w of a)
    w.customCodeId && _.has(w.customCodeId) && n.push({
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
      _.has(E) && n.push({
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
const So = 188, Eo = 34, Ao = 10, vi = 24, Mo = 6;
function wi(e, t) {
  return `fld:${e}:${t}`;
}
function kn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function Mc(e, t) {
  const i = [], n = [], o = e.models ?? [], a = e.modelMappings ?? [], r = (m) => {
    var g;
    return ((g = o.find((v) => v.id === m)) == null ? void 0 : g.name) ?? m ?? "?";
  };
  o.forEach((m, g) => {
    const v = t[m.id] ?? { x: 200 + g % 5 * 260, y: 160 + Math.floor(g / 5) * 220 }, d = m.fields ?? [], l = Eo + (d.length ? d.length * vi + (d.length - 1) * Mo : 10) + Ao;
    i.push({
      id: m.id,
      label: m.name,
      x: v.x,
      y: v.y,
      w: So,
      h: l,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), d.forEach((f, k) => {
      i.push({
        id: wi(m.id, f.id),
        label: f.name,
        x: v.x,
        y: v.y - l / 2 + Eo + k * (vi + Mo) + vi / 2,
        w: So - 2 * Ao,
        h: vi,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: f.type ?? void 0,
        parentId: m.id,
        tooltip: `${f.name}${f.type ? ` (${f.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
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
  const p = new Set(i.map((m) => m.id)), s = (m) => m.fieldId ? wi(m.modelId, m.fieldId) : m.modelId;
  for (const m of e.transformations ?? [])
    m.customCodeId && p.has(m.customCodeId) && p.has(m.id) && n.push({
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
    m.customCodeId && p.has(m.customCodeId) && m.targetModelId && p.has(m.targetModelId) && n.push({
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
      p.has(v) && n.push({
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
    m.output && p.has(s(m.output)) && n.push({
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
    if (!(!m.sourceModelId || !m.targetModelId) && !(!p.has(m.sourceModelId) || !p.has(m.targetModelId))) {
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
        const v = wi(m.sourceModelId, g.sourceFieldId ?? ""), d = wi(m.targetModelId, g.targetFieldId ?? "");
        !p.has(v) || !p.has(d) || n.push({
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
  const c = new Set(
    a.filter((m) => m.sourceModelId && m.targetModelId).map((m) => `${m.sourceModelId}->${m.targetModelId}`)
  ), h = new Map(
    e.boundedContexts.flatMap((m) => (m.useCases ?? []).map((g) => [g.id, g]))
  ), y = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const g of m.buttons ?? []) {
        if (!g.useCaseId || g.mappingId) continue;
        const v = h.get(g.useCaseId);
        if (!(v != null && v.inputModelId) || v.inputModelId === m.modelId) continue;
        const d = `${m.modelId}->${v.inputModelId}`;
        c.has(d) || y.has(d) || (y.add(d), !(!p.has(m.modelId) || !p.has(v.inputModelId)) && n.push({
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
const pn = 560, ki = 34, _i = 14, un = 150, $i = 40, Ci = 12, Si = 150, it = 40, Pc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Tc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Oc(e, t) {
  const i = [], n = [], o = e.etlFlows ?? [], a = new Map(e.boundedContexts.map((d) => [d.id, d.name])), r = new Map(
    e.boundedContexts.flatMap((d) => [
      ...(d.domainEvents ?? []).map((l) => [l.id, l.name]),
      ...(d.applicationEvents ?? []).map((l) => [l.id, l.name])
    ])
  );
  let p = 140;
  for (const d of o) {
    const l = d.steps ?? [], f = [[], [], []];
    l.forEach((R) => f[Pc(R.type)].push(R));
    const k = Math.max(1, ...f.map((R) => R.length)), b = ki + _i + k * ($i + Ci), _ = t[d.id] ?? { x: 420, y: p };
    p = _.y + b + 110, i.push({
      id: d.id,
      label: d.name,
      x: _.x,
      y: _.y,
      w: pn,
      h: b,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${d.name} — integrador${d.ownerBoundedContextId ? ` de ${a.get(d.ownerBoundedContextId) ?? d.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), f.forEach((R, L) => {
      const D = _.x - pn / 2 + _i + un / 2 + L * (pn - 2 * _i - un) / 2;
      R.forEach((W, w) => {
        const E = Tc[L];
        if (i.push({
          id: W.id,
          label: W.name ?? W.id,
          x: D,
          y: _.y - b / 2 + ki + $i / 2 + w * ($i + Ci),
          w: un,
          h: $i,
          kind: "etl-step",
          symbol: E.symbol,
          fill: E.fill,
          stroke: E.stroke,
          badge: W.type === "SOURCE_PULL" ? "PULL" : W.type === "SOURCE_CONSUMER" ? "CONSUME" : W.type === "TRANSFORM" ? "TRANSFORM" : W.type === "WRITE_API" ? "→ API" : W.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: d.id,
          tooltip: `${W.name ?? W.id} (${W.type})${W.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), L > 0) {
          const H = f[L - 1], oe = H[Math.min(w, H.length - 1)];
          oe && n.push({
            id: `etlpipe:${d.id}:${oe.id}->${W.id}`,
            sourceId: oe.id,
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
  const s = new Set(i.map((d) => d.id)), c = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.externalTableId)).filter(Boolean)), h = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.apiId)).filter(Boolean)), y = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.eventId)).filter(Boolean));
  let m = 120;
  for (const d of e.externalSystems) {
    const l = (d.tables ?? []).filter((b) => c.has(b.id));
    if (!l.length) continue;
    const f = ki + _i + l.length * (it + Ci), k = t[d.id] ?? { x: -140, y: m };
    m = k.y + f + 90, i.push({
      id: d.id,
      label: d.name,
      x: k.x,
      y: k.y,
      w: Si + 30,
      h: f,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${d.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), s.add(d.id), l.forEach((b, _) => {
      i.push({
        id: b.id,
        label: b.name,
        x: k.x,
        y: k.y - f / 2 + ki + it / 2 + _ * (it + Ci),
        w: Si,
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
    if (!h.has(d.id)) continue;
    const l = t[d.id] ?? { x: 1e3, y: g };
    g = l.y + it + 70, i.push({
      id: d.id,
      label: d.name,
      x: l.x,
      y: l.y,
      w: Si,
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
  for (const d of y) {
    const l = d, f = t[l] ?? { x: 1e3, y: v };
    v = f.y + it + 70, i.push({
      id: l,
      label: r.get(l) ?? l,
      x: f.x,
      y: f.y,
      w: Si,
      h: it,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), s.add(l);
  }
  for (const d of o)
    for (const l of d.steps ?? []) {
      const f = l.externalTableId ?? l.apiId ?? l.eventId;
      if (!f || !s.has(f) || !s.has(l.id)) continue;
      const k = l.type.startsWith("SOURCE");
      n.push({
        id: `etl:${d.id}:${l.id}`,
        sourceId: k ? f : l.id,
        targetId: k ? l.id : f,
        kind: k ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: l.type === "SOURCE_PULL" ? "pull" : l.type === "SOURCE_CONSUMER" ? "consume" : l.type === "WRITE_API" ? "api" : l.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: k ? `${d.name} lee de aquí — Supr quita el paso` : `${d.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function Nc(e, t) {
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
  }, r = await n.layout(a), p = {};
  for (const s of r.children ?? [])
    p[s.id] = {
      x: (s.x ?? 0) + (s.width ?? 0) / 2,
      y: (s.y ?? 0) + (s.height ?? 0) / 2
    };
  return p;
}
var Rc = Object.defineProperty, Lc = Object.getOwnPropertyDescriptor, De = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Lc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Rc(t, i, o), o;
};
const Dc = /* @__PURE__ */ new Set([
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
let Ae = class extends Ge {
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
        const p = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - p.left,
          y1: e.clientY - p.top,
          x2: e.clientX - p.left,
          y2: e.clientY - p.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const n = e.shiftKey || this._space || e.button === 1, o = n ? null : this.plateAt(e);
      if (!o && !n && !e.altKey) {
        const p = this.getBoundingClientRect();
        this._rubber = {
          x1: e.clientX - p.left,
          y1: e.clientY - p.top,
          x2: e.clientX - p.left,
          y2: e.clientY - p.top,
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
        const r = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), p = (o = r == null ? void 0 : r.closest) == null ? void 0 : o.call(r, ".n3"), s = (p == null ? void 0 : p.dataset.nodeId) ?? null;
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
            const n = this.getBoundingClientRect(), o = Math.min(i.x1, i.x2) + n.left, a = Math.max(i.x1, i.x2) + n.left, r = Math.min(i.y1, i.y2) + n.top, p = Math.max(i.y1, i.y2) + n.top, s = [];
            this.renderRoot.querySelectorAll(".n3").forEach((c) => {
              const h = c.getBoundingClientRect(), y = h.left + h.width / 2, m = h.top + h.height / 2, g = c.dataset.nodeId;
              g && y >= o && y <= a && m >= r && m <= p && s.push(g);
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
    const r = new DOMMatrix().translate(n, o).multiply(a).translate(-n, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), p = r.transformPoint(new DOMPoint(0, 0, 0, 1)), s = r.transformPoint(new DOMPoint(1, 0, 0, 0)), c = r.transformPoint(new DOMPoint(0, 1, 0, 0)), h = e - i.left, y = t - i.top, m = s.x - h * s.w, g = c.x - h * c.w, v = s.y - y * s.w, d = c.y - y * c.w, l = h * p.w - p.x, f = y * p.w - p.y, k = m * d - g * v;
    return k ? { x: (l * d - g * f) / k, y: (m * f - l * v) / k } : { ...this._center };
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
    const t = this.depths(), i = new Map(e.map((l) => [l.id, l])), n = Math.min(...e.map((l) => l.x - l.w / 2)) - 60, o = Math.max(...e.map((l) => l.x + l.w / 2)) + 60, a = Math.min(...e.map((l) => l.y - l.h / 2)) - 60, r = Math.max(...e.map((l) => l.y + l.h / 2)) + 60, p = (n + o) / 2, s = (a + r) / 2, c = this.getBoundingClientRect(), h = c.width ? Math.min(c.width / (o - n), c.height / (r - a), 1) * 0.9 : 0.5, y = this._k * h;
    this._kUsed = y, this._center = { x: p, y: s };
    const m = 30, g = this._liveMove, v = (l) => l.x + ((g == null ? void 0 : g.id) === l.id ? g.dx : 0), d = (l) => l.y + ((g == null ? void 0 : g.id) === l.id ? g.dy : 0);
    return A`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${y}, ${y}, ${y}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-p}px, ${-s}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${a}px"
            width=${o - n}
            height=${r - a}
            viewBox="${n} ${a} ${o - n} ${r - a}"
          >
            ${this.scene.edges.map((l) => {
      const f = i.get(l.sourceId), k = i.get(l.targetId);
      return !f || !k ? "" : ie`<line
                x1=${v(f)} y1=${d(f)} x2=${v(k)} y2=${d(k)}
                stroke="#000000" stroke-width="2" opacity=${l.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((l) => {
      const f = i.get(l.sourceId), k = i.get(l.targetId);
      if (!f || !k) return "";
      const b = (t.get(f.id) ?? 0) * m + 2, _ = (t.get(k.id) ?? 0) * m + 2, R = v(k) - v(f), L = d(k) - d(f), D = _ - b, W = Math.hypot(R, L), w = Math.hypot(W, D), E = Math.atan2(L, R) * 180 / Math.PI, H = Math.atan2(D, W) * 180 / Math.PI, oe = l.color ?? "#64748b", te = l.dashed ? `repeating-linear-gradient(90deg, ${oe} 0 6px, transparent 6px 10px)` : oe, I = l.kind === "journey";
      return A`<div
              class="edge3"
              style="
                left: ${v(f)}px; top: ${d(f)}px; width: ${w}px; height: ${I ? 3 : 1.7}px;
                transform: translateZ(${b}px) rotateZ(${E}deg) rotateY(${-H}deg);
                background: ${te};
                opacity: ${l.dim ? 0.12 : 0.9};
              "
            ></div>
            ${I && l.label ? A`<div
                  class="journey-badge3"
                  style="
                    left: ${(v(f) + v(k)) / 2}px; top: ${(d(f) + d(k)) / 2}px;
                    transform: translate(-50%, -50%) translateZ(${(b + _) / 2 + 6}px);
                  "
                  title=${l.tooltip ?? ""}
                >${l.label}</div>` : ""}`;
    })}
          ${e.map((l) => {
      const f = t.get(l.id) ?? 0, k = l.container || f === 0, b = this._hoverTargetId === l.id;
      return A`
              <div
                class="n3 ${l.container ? "container3" : ""} ${this.selectedId === l.id || this._selected.has(l.id) ? "selected3" : ""} ${b ? "hover3" : ""}"
                data-node-id=${l.id}
                data-kind=${l.kind}
                title=${l.tooltip ?? l.label}
                style="
                  opacity: ${l.dim ? 0.25 : 1};
                  left: ${v(l) - l.w / 2}px; top: ${d(l) - l.h / 2}px;
                  width: ${l.w}px; height: ${l.h}px;
                  transform: translateZ(${f * m + (b ? 8 : 0)}px)${b ? " scale(1.06)" : ""};
                  background: ${l.container ? "color-mix(in srgb, " + (l.fill ?? "#ffffff") + " 82%, transparent)" : l.fill ?? "#ffffff"};
                  border-color: ${l.stroke ?? "#64748b"};
                  border-style: ${l.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${k ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${l.badge ? A`<span class="badge3" style="color: ${l.stroke ?? "#94a3b8"}">${l.badge}</span>` : ""}
                <span>${l.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const l = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!l || !Dc.has(l.kind)) return "";
      const f = (t.get(l.id) ?? 0) * m + 4;
      return [
        [v(l) + l.w / 2, d(l)],
        [v(l) - l.w / 2, d(l)],
        [v(l), d(l) + l.h / 2],
        [v(l), d(l) - l.h / 2]
      ].map(
        ([b, _]) => A`<div
                class="h3"
                data-source-id=${l.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${b}px; top: ${_}px; transform: translateZ(${f}px)"
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
      const l = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), f = this.getBoundingClientRect(), k = l == null ? void 0 : l.getBoundingClientRect(), b = k ? k.left + k.width / 2 - f.left : f.width / 2, _ = k ? k.bottom - f.top + 6 : f.height / 2;
      return A`<input
              class="rename3"
              style="left: ${b}px; top: ${_}px"
              .value=${this._renaming.value}
              @pointerdown=${(R) => R.stopPropagation()}
              @input=${(R) => this._renaming = { ...this._renaming, value: R.target.value }}
              @keydown=${(R) => {
        if (R.stopPropagation(), R.key === "Escape" && (this._renaming = null), R.key === "Enter") {
          const L = this._renaming, D = L.value.trim();
          this._renaming = null;
          const W = this.scene.nodes.find((w) => w.id === L.id);
          D && W && D !== W.label && this.emit("node-renamed", { id: L.id, kind: L.kind, name: D });
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
Ae.styles = xt`
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
    .journey-badge3 {
      position: absolute;
      min-width: 22px;
      height: 22px;
      padding: 0 5px;
      box-sizing: border-box;
      border-radius: 11px;
      background: #d97706;
      color: #ffffff;
      font: 700 12px ui-sans-serif, system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
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
De([
  re({ attribute: !1 })
], Ae.prototype, "scene", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "selectedId", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "connectable", 2);
De([
  U()
], Ae.prototype, "_rx", 2);
De([
  U()
], Ae.prototype, "_rz", 2);
De([
  U()
], Ae.prototype, "_k", 2);
De([
  U()
], Ae.prototype, "_pan", 2);
De([
  U()
], Ae.prototype, "_liveMove", 2);
De([
  U()
], Ae.prototype, "_connect", 2);
De([
  U()
], Ae.prototype, "_hoverTargetId", 2);
De([
  U()
], Ae.prototype, "_selected", 2);
De([
  U()
], Ae.prototype, "_rubber", 2);
De([
  U()
], Ae.prototype, "_renaming", 2);
Ae = De([
  vt("modux-tilt")
], Ae);
var zc = Object.defineProperty, Uc = Object.getOwnPropertyDescriptor, be = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Uc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && zc(t, i, o), o;
};
const Po = [
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
let le = class extends Ge {
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
      for (const p of r.children ?? []) n(p);
    }, o = (r) => {
      for (const p of r ?? [])
        p.id === t ? n(p) : o(p.children);
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
    return le.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const r = (e.children ?? []).filter((s) => s.kind === "tab"), p = r.find((s) => s.id === this._activeTabs[e.id]) ?? r[0];
      p && (e = p);
    }
    if (t === "into" && !le.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var a, r;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const p = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!p) return;
      let s;
      try {
        s = JSON.parse(p);
      } catch {
        return;
      }
      if (!s.componentId || !s.pageId || s.pageId === ((r = this.page) == null ? void 0 : r.id)) return;
      const c = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: s.pageId, componentId: s.componentId, ...c });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var s, c, h;
    const t = e.children ?? [], i = (y) => y.map((m) => this.renderComponent(m)), n = A`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = A`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const y = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        o = A`<div class="row-lay">
          <div class="col-lay">${y.length ? i(y) : n}</div>
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
        const y = t.filter((g) => g.kind === "tab"), m = y.find((g) => g.id === this._activeTabs[e.id]) ?? y[0];
        o = A`
          <div class="tabbar">
            ${y.map(
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
            var l, f;
            d.stopPropagation(), this._dragCmpId = g.id, (f = d.dataTransfer) == null || f.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (l = this.page) == null ? void 0 : l.id, componentId: g.id })
            );
          }}
                @dragover=${(d) => {
            var l;
            ((l = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : l.kind) === "tab" && (d.preventDefault(), d.stopPropagation());
          }}
                @drop=${(d) => {
            var _, R;
            const l = this._dragCmpId;
            if (!l || l === g.id || ((_ = this.nodeById(l)) == null ? void 0 : _.kind) !== "tab") return;
            d.preventDefault(), d.stopPropagation();
            const f = d.currentTarget.getBoundingClientRect(), b = d.clientX - f.left < f.width / 2 ? g.id : ((R = y[v + 1]) == null ? void 0 : R.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, b !== l && this.emitEvent("component-moved", {
              componentId: l,
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
          (y, m) => A`
                  <div class="acc-bar"><span>${y.title ?? y.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(y) : se}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        o = A`<div class="card-box">
          ${e.title ? A`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        o = A`<div class="grid3-lay">
          ${t.length ? t.map((y) => A`<div class="board-col">${this.renderComponent(y)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [y, ...m] = t;
        o = A`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${y ? this.renderComponent(y) : A`<div class="placeholder">maestro</div>`}
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
        const m = e.modelId && e.modelId === ((s = this.page) == null ? void 0 : s.modelId) ? ((c = this.page) == null ? void 0 : c.viewmodelFields) ?? [] : [];
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
        const y = (((h = this.page) == null ? void 0 : h.viewmodelFields) ?? []).slice(0, 4);
        o = A`<table>
            <tr>${y.length ? y.map((m) => A`<th>${m.label ?? m.name}</th>`) : A`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => A`<tr>${(y.length ? y : [1, 2, 3]).map(() => A`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : A`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = A`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const y = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = A`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(y)}`;
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
    const a = le.LEAF_KINDS.has(e.kind), r = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), p = (y) => {
      var m, g;
      y.stopPropagation(), this._dragCmpId = e.id, (g = y.dataTransfer) == null || g.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), y.dataTransfer && (y.dataTransfer.effectAllowed = "move");
    };
    return A`<div
      class="cmp ${a ? "leafcmp" : ""} ${r ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(y) => {
      y.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(y) => {
      y.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${p}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(y) => {
      var g;
      y.preventDefault(), y.stopPropagation();
      const m = ((g = y.dataTransfer) == null ? void 0 : g.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, y) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(y) => {
      var m, g, v;
      this._foreignOver = !1, !(!this._dragCmpId && !((v = (g = (m = y.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : g.includes) != null && v.call(g, "application/x-modux-cmp"))) && (y.preventDefault(), y.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, y));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${p}
        >${le.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
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
            </table>` : se}
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
    var o, a, r, p;
    const e = this._cmp;
    if (!e) return se;
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
            <input .value=${e.title ?? ""} @input=${(s) => t({ title: s.target.value })} />` : se}
      ${i === "text" ? A`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(s) => t({ text: s.target.value })} />` : se}
      ${i === "button" || i === "field" ? A`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(s) => t({ label: s.target.value })} />` : se}
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
            </span>` : se}
      ${i === "form" ? A`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? A`<span class="chip"
                      >${((r = this.models.find((s) => s.id === e.modelId)) == null ? void 0 : r.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : A`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : se}
      ${i === "listing" ? A`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? A`<span class="chip"
                      >${((p = this.queryOps.find((s) => s.id === e.queryOperationId)) == null ? void 0 : p.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : A`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : se}
      ${i === "field" ? A`<label>Estereotipo</label>
            <select @change=${(s) => t({ stereotype: s.target.value || void 0 })}>
              ${Po.map((s) => A`<option value=${s} ?selected=${s === (e.stereotype ?? "regular")}>${s}</option>`)}
            </select>` : se}
      ${i === "tabLayout" ? A`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
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
    if (!e) return se;
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? se : A`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
      const r = (e.wizardSteps ?? []).map((s, c) => s.id ?? s.pageId ?? String(c)), p = r[a];
      return A`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(s) => {
        s.stopPropagation(), this._dragWizKey = p;
      }}
                      @dragover=${(s) => {
        this._dragWizKey && (s.preventDefault(), s.stopPropagation());
      }}
                      @drop=${(s) => {
        const c = this._dragWizKey;
        if (this._dragWizKey = null, !c || c === p) return;
        s.preventDefault(), s.stopPropagation();
        const h = s.currentTarget.getBoundingClientRect(), m = s.clientX - h.left < h.width / 2 ? p : r[a + 1] ?? null;
        m !== c && this.emitEvent("wizard-step-moved", { stepKey: c, beforeStepKey: m });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : A`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? se : A`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, r, p;
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
                        >${((p = this.mappings.find((s) => s.id === this._btn.mappingId)) == null ? void 0 : p.name) ?? this._btn.mappingId}
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
                    </button>` : se}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : se}
      ${this._editing ? A`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${Po.map(
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
          </div>` : se}
    `;
  }
};
le.styles = xt`
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
le.KIND_LABELS = {
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
le.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
be([
  re({ attribute: !1 })
], le.prototype, "page", 2);
be([
  re({ type: Boolean, reflect: !0 })
], le.prototype, "framed", 2);
be([
  re({ attribute: !1 })
], le.prototype, "models", 2);
be([
  re({ attribute: !1 })
], le.prototype, "mappings", 2);
be([
  re({ attribute: !1 })
], le.prototype, "useCases", 2);
be([
  re({ attribute: !1 })
], le.prototype, "queryOps", 2);
be([
  re({ attribute: !1 })
], le.prototype, "selectedCmpId", 2);
be([
  U()
], le.prototype, "_editing", 2);
be([
  U()
], le.prototype, "_dragId", 2);
be([
  U()
], le.prototype, "_overId", 2);
be([
  U()
], le.prototype, "_rename", 2);
be([
  U()
], le.prototype, "_route", 2);
be([
  U()
], le.prototype, "_btn", 2);
be([
  U()
], le.prototype, "_cmp", 2);
be([
  U()
], le.prototype, "_dragCmpId", 2);
be([
  U()
], le.prototype, "_dragWizKey", 2);
be([
  U()
], le.prototype, "_overCmpId", 2);
be([
  U()
], le.prototype, "_overCmpPos", 2);
be([
  U()
], le.prototype, "_foreignOver", 2);
be([
  U()
], le.prototype, "_activeTabs", 2);
le = be([
  vt("modux-page-designer")
], le);
var qc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Bc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && qc(t, i, o), o;
};
const va = 460, Fc = 540, Wc = 660;
let Me = class extends Ge {
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
        const r = this.pages.findIndex((s) => s.id === a), p = this.posOf(a, r);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: p.x, oy: p.y, moved: !1 }, e.preventDefault();
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
    var h, y, m, g, v, d;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), n = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), r = (m = a == null ? void 0 : a.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), p = (g = r == null ? void 0 : r.closest) == null ? void 0 : g.call(r, "[data-btn-uc]");
    if (p != null && p.dataset.btnUc) return `btn:${o}:${p.dataset.btnUc}`;
    const s = (v = r == null ? void 0 : r.closest) == null ? void 0 : v.call(r, "[data-bar]");
    if (s != null && s.dataset.bar) return `bar:${o}:${s.dataset.bar}`;
    const c = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    return c ? `cmp:${o}:${c.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, g, v, d;
    const i = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), n = (g = i == null ? void 0 : i.closest) == null ? void 0 : g.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), r = (v = a == null ? void 0 : a.shadowRoot) == null ? void 0 : v.elementFromPoint(e, t), p = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    if (!p) return { pageId: o, componentId: null, pos: "into" };
    const s = p.dataset.cmpKind ?? "", c = p.getBoundingClientRect(), h = (t - c.top) / Math.max(1, c.height), y = le.LEAF_KINDS.has(s) ? h < 0.5 ? "before" : "after" : h < 0.2 ? "before" : h > 0.8 ? "after" : "into";
    return { pageId: o, componentId: p.dataset.cmpId, pos: y };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: va, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Fc, y: Math.floor(t / 3) * Wc };
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
Me.styles = xt`
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
      width: ${va}px;
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
ze([
  re({ attribute: !1 })
], Me.prototype, "pages", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "layout", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "sizes", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "selectedId", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "selectedIds", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "models", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "mappings", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "useCases", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "queryOps", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "selectedCmp", 2);
ze([
  U()
], Me.prototype, "_t", 2);
ze([
  U()
], Me.prototype, "_live", 2);
ze([
  U()
], Me.prototype, "_liveSize", 2);
Me = ze([
  vt("modux-figma")
], Me);
var Vc = Object.defineProperty, Hc = Object.getOwnPropertyDescriptor, Pe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Hc(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && Vc(t, i, o), o;
};
const jc = {
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
}, mn = {
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
}, Gc = {
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
}, To = [30, 20, 13, 9.5, 7.5], Oo = [0, 180, 118, 80, 58], Kc = 0.055, Yc = 0.86, Xc = 2600, Ei = 240, No = 0.16, Ro = 0.015;
let he = class extends Ge {
  constructor() {
    super(...arguments), this.shifted = !1, this.scene = null, this.journey = null, this.model = {
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
      sessionStorage.setItem(he.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(he.STORE_KEY);
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
    for (const y of e)
      t = Math.min(t, y.x), i = Math.min(i, y.y), n = Math.max(n, y.x), o = Math.max(o, y.y);
    const a = 70, r = this.clientWidth || 800, p = this.clientHeight || 600, s = n - t + a * 2, c = o - i + a * 2, h = Math.min(1.5, Math.max(0.25, Math.min(r / s, p / c)));
    this.cam.k = h, this.cam.x = r / 2 - (t + n) / 2 * h, this.cam.y = p / 2 - (i + o) / 2 * h;
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
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, r = this.prevByKey.get(a), p = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: jc[e] ?? "#64748b",
      depth: n,
      parent: o,
      expanded: (r == null ? void 0 : r.expanded) ?? !1,
      x: (r == null ? void 0 : r.x) ?? (o ? o.x + p() : 0),
      y: (r == null ? void 0 : r.y) ?? (o ? o.y + p() : 0),
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
        const o = t.boundedContexts.find((c) => c.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((c) => c.boundedContextId === e.refId), r = o.useCases ?? [], p = new Set(a.map((c) => c.id)), s = new Set(
          (t.emissions ?? []).filter((c) => p.has(c.sourceId)).map((c) => c.domainEventId)
        );
        return [
          ...a.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...r.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${r.length}`)] : [],
          ...(o.domainEvents ?? []).filter((c) => !s.has(c.id)).map((c) => n("domain-event", c.id, c.name)),
          ...(o.applicationEvents ?? []).map((c) => n("application-event", c.id, c.name)),
          ...(o.readModels ?? []).map((c) => n("read-model", c.id, c.name)),
          ...(o.domainServices ?? []).map((c) => n("domain-service", c.id, c.name)),
          ...(o.queryServices ?? []).map((c) => n("query-service", c.id, c.name)),
          ...(o.scheduledTriggers ?? []).map((c) => n("scheduled-trigger", c.id, c.name)),
          ...(t.etlFlows ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("etl-flow", c.id, c.name)),
          ...(t.notifications ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("notification", c.id, c.name)),
          ...(t.documents ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("document", c.id, c.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), r = e.refId.slice(o + 1), p = t.boundedContexts.find((s) => s.id === r);
        return p ? a === "aggregates" ? (t.aggregates ?? []).filter((s) => s.boundedContextId === r).map((s) => n("aggregate", s.id, s.name)) : (p.useCases ?? []).map((s) => n(s.policy ? "policy" : "use-case", s.id, s.name)) : [];
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
        const o = (t.uiApps ?? []).find((p) => p.id === e.refId);
        if (!o) return [];
        const a = /* @__PURE__ */ new Set(), r = (p) => {
          for (const s of p ?? [])
            s.pageId && a.add(s.pageId), r(s.children);
        };
        r(o.menuItems);
        for (const p of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          p && a.add(p);
        return [...a].map((p) => (t.pages ?? []).find((s) => s.id === p)).filter((p) => !!p).map((p) => n("page", p.id, p.name));
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
      for (let p = r; p; p = p.parent) t.add(p.key);
    }, n = (r) => {
      t.add(r.key);
      for (const p of r.children ?? []) n(p);
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
        const p = (Oo[Math.min(r.depth, Oo.length - 1)] ?? 60) + Math.min(60, ((((a = r.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let s = r.x - r.parent.x, c = r.y - r.parent.y, h = Math.hypot(s, c);
        if (h < 0.01) {
          const v = Math.random() * Math.PI * 2;
          s = Math.cos(v) * 0.1, c = Math.sin(v) * 0.1, h = 0.1;
        }
        const y = Kc * (h - p), m = s / h * y, g = c / h * y;
        r.vx -= m, r.vy -= g, r.parent.vx += m * 0.4, r.parent.vy += g * 0.4;
      } else
        r.vx -= r.x * Ro, r.vy -= r.y * Ro;
      !this.reducedMotion && this._motion > 0 && (r.vx += Math.sin(t * r.f1 * Math.PI * 2 + r.p1) * No * this._motion, r.vy += Math.cos(t * r.f2 * Math.PI * 2 + r.p2) * No * this._motion);
    }
    for (let r = 0; r < e.length; r++) {
      const p = e[r];
      for (let s = r + 1; s < e.length; s++) {
        const c = e[s], h = c.x - p.x, y = c.y - p.y;
        if (Math.abs(h) > Ei || Math.abs(y) > Ei) continue;
        const m = h * h + y * y;
        if (m > Ei * Ei || m < 0.01) continue;
        const g = Math.sqrt(m), v = p.depth <= 1 && c.depth <= 1 ? 3 : 1, d = Xc * v / m, l = h / g * d, f = y / g * d;
        p.vx -= l, p.vy -= f, c.vx += l, c.vy += f;
      }
    }
    const i = this._motion, n = Yc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const r of e) {
      if (r === this.dragNode) {
        r.vx = 0, r.vy = 0;
        continue;
      }
      r.vx *= n, r.vy *= n;
      const p = Math.hypot(r.vx, r.vy);
      if (p > 14 && (r.vx = r.vx / p * 14, r.vy = r.vy / p * 14), o > 0 && p < o) {
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
    return (To[Math.min(e.depth, To.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var r, p;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const s of e)
      s.parent && (t.strokeStyle = s.color + "55", t.beginPath(), t.moveTo(s.parent.x, s.parent.y), t.lineTo(s.x, s.y), t.stroke());
    const o = this.journeyTouchedIds(e), a = (s) => `${s}px system-ui, sans-serif`;
    for (const s of e) {
      o && (t.globalAlpha = o.has(s.refId) ? 1 : 0.22);
      const c = this.radiusOf(s);
      t.beginPath(), t.arc(s.x, s.y, c, 0, Math.PI * 2), t.fillStyle = s.expanded ? s.color + "22" : "#ffffff", t.fill(), t.lineWidth = (s === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = s.color, t.stroke(), this.drawGlyph(t, s, c);
      const h = ((r = s.children) == null ? void 0 : r.length) ?? 0;
      if (!s.expanded && h > 0) {
        const m = Math.max(7, c * 0.42), g = s.x + c * 0.75, v = s.y + c * 0.75;
        t.beginPath(), t.arc(g, v, m, 0, Math.PI * 2), t.fillStyle = s.color, t.fill(), t.fillStyle = "#ffffff", t.font = a(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(h), g, v + 0.5);
      }
      if (s.depth <= 1 || s === this.hover || this.cam.k > 0.65) {
        const m = s.label.length > 22 ? s.label.slice(0, 21) + "…" : s.label;
        t.font = s === this.hover ? `600 ${a(12)}` : a(s.depth <= 1 ? 12 : 10.5), t.fillStyle = s === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(m, s.x, s.y + c + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = "#2563eb", t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const s of e)
        this.selected.has(s.key) && (t.beginPath(), t.arc(s.x, s.y, this.radiusOf(s) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const s = this.rubber;
      t.save(), t.fillStyle = "rgba(37, 99, 235, 0.08)", t.strokeStyle = "#2563eb", t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(s.ax, s.bx), Math.min(s.ay, s.by), Math.abs(s.bx - s.ax), Math.abs(s.by - s.ay)), t.strokeRect(Math.min(s.ax, s.bx), Math.min(s.ay, s.by), Math.abs(s.bx - s.ax), Math.abs(s.by - s.ay)), t.restore();
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const s = this.found.node, c = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, c * 1.6), t.strokeStyle = s.color, t.lineWidth = 2.2 / this.cam.k;
        const h = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(s.x, s.y, this.radiusOf(s) + 9 + h, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(s.x, s.y, this.radiusOf(s) + 18 + h * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.journey && this.drawJourney(t, e), this._threads)
      for (const s of e) this.drawThreads(t, s, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((p = this.hover.children) != null && p.length) && this.drawGhosts(t, this.hover), this.linking) {
      const s = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
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
        const r = (t.x + a.x) / 2, p = (t.y + a.y) / 2, s = a.x - t.x, c = a.y - t.y, h = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(r - c * h, p + s * h, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /**
   * Ids the active journey touches, mapped to what is VISIBLE: a folded
   * endpoint is represented by its nearest visible ancestor (containment via
   * the scene's parent chain). Null when no journey is on stage.
   */
  journeyTouchedIds(e) {
    if (!this.journey) return null;
    const t = /* @__PURE__ */ new Set();
    for (const i of this.journey.legs) {
      const n = this.visibleRepresentative(i.sourceId, e), o = this.visibleRepresentative(i.targetId, e);
      n && t.add(n.refId), o && t.add(o.refId);
    }
    return t;
  }
  visibleRepresentative(e, t) {
    var o;
    const i = new Map(t.map((a) => [a.refId, a])), n = new Map((((o = this.scene) == null ? void 0 : o.nodes) ?? []).map((a) => [a.id, a.parentId]));
    for (let a = e; a; a = n.get(a)) {
      const r = i.get(a);
      if (r) return r;
    }
    return null;
  }
  /** The active journey as a bold amber layer: directed curves, numbered badges. */
  drawJourney(e, t) {
    if (this.journey) {
      e.save();
      for (const i of this.journey.legs) {
        const n = this.visibleRepresentative(i.sourceId, t), o = this.visibleRepresentative(i.targetId, t);
        if (!n || !o || n === o) continue;
        const a = (n.x + o.x) / 2, r = (n.y + o.y) / 2, p = o.x - n.x, s = o.y - n.y, c = 0.14, h = a - s * c, y = r + p * c;
        e.strokeStyle = "#d97706", e.lineWidth = 2.4 / this.cam.k, e.setLineDash([]), e.beginPath(), e.moveTo(n.x, n.y), e.quadraticCurveTo(h, y, o.x, o.y), e.stroke();
        const m = o.x - h, g = o.y - y, v = Math.hypot(m, g) || 1, d = m / v, l = g / v, f = this.radiusOf(o) + 4, k = o.x - d * f, b = o.y - l * f, _ = 9 / this.cam.k;
        e.fillStyle = "#d97706", e.beginPath(), e.moveTo(k, b), e.lineTo(k - d * _ - l * _ * 0.55, b - l * _ + d * _ * 0.55), e.lineTo(k - d * _ + l * _ * 0.55, b - l * _ - d * _ * 0.55), e.closePath(), e.fill();
        const R = a - s * c * 0.5, L = r + p * c * 0.5, D = 11 / this.cam.k;
        e.beginPath(), e.arc(R, L, D, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.fillStyle = "#ffffff", e.font = `bold ${12 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(i.num, R, L);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const r = this.radiusOf(t) + 24, p = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, s = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((c, h) => {
      const y = p - s / 2 + s * (h + 0.5) / n.length, m = this.reducedMotion ? 0 : Math.sin(this.t * c.f1 * Math.PI * 2 + c.p1) * 1.8, g = t.x + Math.cos(y) * (r + m), v = t.y + Math.sin(y) * (r + m);
      e.beginPath(), e.arc(g, v, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = c.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const c = p + s / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(c) * r, t.y + Math.sin(c) * r);
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
        for (const [r, p] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + r * n + n * 0.3, a + p * n), e.arc(o + r * n, a + p * n, n * 0.3, 0, Math.PI * 2);
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
          const p = r * Math.PI / 3;
          e.moveTo(o + Math.cos(p) * n * 0.55, a + Math.sin(p) * n * 0.55), e.lineTo(o + Math.cos(p) * n, a + Math.sin(p) * n);
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
          const p = r * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(p) * n, a + Math.sin(p) * n), e.moveTo(o, a), e.lineTo(o + Math.cos(p + Math.PI / 4) * n * 0.5, a + Math.sin(p + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - n * 0.45, a + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + n * 0.1, a - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + n * 0.55, a + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [r, p] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + r * n, a + p * n, n * 0.85, n * 0.85);
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
    var D, W;
    const o = (t.children ?? []).flatMap(
      (w) => w.kind === "group" ? w.children ?? (w.children = this.childrenOf(w)) : [w]
    ), a = /* @__PURE__ */ new Map();
    for (const w of o) a.set(w.kind, (a.get(w.kind) ?? 0) + 1);
    const r = [];
    for (const [w, E] of a)
      if (r.push(`${E} ${E === 1 ? (mn[w] ?? w).toLowerCase() : Gc[w] ?? w}`), r.length === 4) {
        const H = [...a.keys()].length - 4;
        H > 0 && (r[3] += ` (+${H} tipos más)`);
        break;
      }
    const p = o.slice(0, 6).map((w) => ({ label: w.label.length > 30 ? w.label.slice(0, 29) + "…" : w.label, color: w.color })), s = o.length - p.length, c = t.label, h = mn[t.kind] ?? t.kind, y = ((D = t.children) != null && D.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((W = t.children) != null && W.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const m = e.measureText(c).width;
    e.font = "11px system-ui, sans-serif";
    const g = Math.max(
      e.measureText(h).width,
      ...r.map((w) => e.measureText(w).width),
      ...p.map((w) => e.measureText(w.label).width + 12),
      e.measureText(y).width
    ), v = Math.min(300, Math.max(m, g) + 24), d = p.length ? 8 + p.length * 15 + (s > 0 ? 15 : 0) : 0, l = 40 + r.length * 15 + d + (y ? 18 : 0), f = this.radiusOf(t) * this.cam.k, k = this.cam.x + t.x * this.cam.k, b = this.cam.y + t.y * this.cam.k;
    let _ = k + f + 14;
    _ + v > i - 8 && (_ = k - f - 14 - v), _ = Math.max(8, Math.min(_, i - v - 8));
    const R = Math.max(8, Math.min(b - 10, n - l - 8));
    e.translate(_, R), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, v, l, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(c, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(h, 12, 25), e.fillStyle = "#475569", r.forEach((w, E) => e.fillText(w, 12, 41 + E * 15));
    let L = 41 + r.length * 15 + (p.length ? 8 : 0);
    p.forEach((w) => {
      e.fillStyle = w.color, e.beginPath(), e.arc(15, L + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(w.label, 24, L), L += 15;
    }), s > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${s} más`, 24, L)), y && (e.fillStyle = "#94a3b8", e.fillText(y, 12, l - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = he.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && he.fold(i.label).includes(t)).slice(0, 8);
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
        const n = Math.min(i.ax, i.bx), o = Math.max(i.ax, i.bx), a = Math.min(i.ay, i.by), r = Math.max(i.ay, i.by), p = this.visible().filter((s) => s.kind !== "root" && s.kind !== "group" && s.refId).filter((s) => s.x >= n && s.x <= o && s.y >= a && s.y <= r).map((s) => s.key);
        this.selected = new Set(i.additive ? [...this.selected, ...p] : p);
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
        const p = i - n / 2 + n * (r + 0.5) / o.length;
        a.x = e.x + Math.cos(p) * 6, a.y = e.y + Math.sin(p) * 6, a.vx = Math.cos(p) * 7, a.vy = Math.sin(p) * 7, a.children || (a.children = this.childrenOf(a));
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
                  <span class="path">${this.pathOf(e) || (mn[e.kind] ?? e.kind)}</span>
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
he.styles = xt`
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
he.STORE_KEY = "modux-explorer-state";
Pe([
  re({ type: Boolean, reflect: !0 })
], he.prototype, "shifted", 2);
Pe([
  re({ attribute: !1 })
], he.prototype, "scene", 2);
Pe([
  re({ attribute: !1 })
], he.prototype, "journey", 2);
Pe([
  re({ attribute: !1 })
], he.prototype, "model", 2);
Pe([
  U()
], he.prototype, "_q", 2);
Pe([
  U()
], he.prototype, "_sugs", 2);
Pe([
  U()
], he.prototype, "_active", 2);
Pe([
  U()
], he.prototype, "_motion", 2);
Pe([
  U()
], he.prototype, "_threads", 2);
Pe([
  U()
], he.prototype, "_viewNaming", 2);
Pe([
  U()
], he.prototype, "_viewName", 2);
Pe([
  U()
], he.prototype, "selected", 2);
Pe([
  U()
], he.prototype, "_levels", 2);
Pe([
  re()
], he.prototype, "sceneKey", 2);
Pe([
  U()
], he.prototype, "renaming", 2);
he = Pe([
  vt("modux-explorer")
], he);
function Jc(e, t) {
  var i, n, o, a, r, p, s, c, h, y, m, g, v;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const d = e.model.relations.find(
        (l) => l.sourceId === t.sourceId && l.targetId === t.targetId
      );
      return d && d.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : null;
    }
    case "set-relation-type": {
      const d = e.model.relations.find(
        (l) => l.sourceId === t.sourceId && l.targetId === t.targetId
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
      const d = (e.model.uiApps ?? []).find((l) => l.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (d == null ? void 0 : d.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const d = (e.model.uiApps ?? []).find((l) => l.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const d = (e.model.modelMappings ?? []).find((l) => l.id === t.id);
      return !(d != null && d.sourceModelId) || !d.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: d.id,
        name: d.name,
        sourceId: d.sourceModelId,
        targetId: d.targetModelId
      }];
    }
    case "remove-model": {
      const d = (e.model.models ?? []).find((f) => f.id === t.id);
      if (!d) return null;
      const l = [{ kind: "add-model", id: d.id, name: d.name }];
      for (const f of e.model.pages ?? []) {
        f.modelId === t.id && l.push({ kind: "set-page-model", pageId: f.id, modelId: t.id });
        const k = (b) => {
          for (const _ of b ?? [])
            _.modelId === t.id && l.push({ kind: "set-page-component", pageId: f.id, componentId: _.id, modelId: t.id }), k(_.children);
        };
        k(f.content);
      }
      for (const f of e.model.uiApps ?? [])
        f.modelId === t.id && l.push({ kind: "set-app-model", appId: f.id, modelId: t.id });
      return l;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const d = (e.model.pages ?? []).find((f) => f.id === t.pageId), l = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (l ? d == null ? void 0 : d.crudDetailPageId : d == null ? void 0 : d.crudCreatePageId) ?? null,
        toAppId: (l ? d == null ? void 0 : d.crudDetailAppId : d == null ? void 0 : d.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const d = (e.model.uiApps ?? []).find((l) => l.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (d == null ? void 0 : d.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const d = (e.model.uiApps ?? []).find((l) => l.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (d == null ? void 0 : d.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const d = (e.model.uiApps ?? []).find((l) => l.id === t.appId);
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
      const d = (((i = (e.model.pages ?? []).find((l) => l.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).find((l) => (l.id ?? l.pageId) === t.itemId);
      return d ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: d.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const d = (((n = (e.model.pages ?? []).find((f) => f.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((f) => f.id ?? f.pageId), l = d.indexOf(t.targetId);
      return l < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: d[l + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const d = (((o = (e.model.pages ?? []).find((l) => l.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((l) => (l.id ?? l.pageId) === t.targetId);
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
      const l = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
      d.headerPageId && l.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && l.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && l.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && l.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && l.push({
        kind: "set-app-home-page",
        appId: d.id,
        pageId: d.homePageId ?? null,
        toAppId: d.homeAppId ?? null
      });
      const f = (k, b) => {
        for (const _ of k ?? [])
          l.push({
            kind: "add-menu-item",
            appId: d.id,
            label: _.label,
            itemId: _.id,
            parentId: b == null ? void 0 : b.id,
            parentLabel: b && !b.id ? b.label : void 0,
            pageId: _.pageId ?? null
          }), _.uiAdapterId && l.push({ kind: "set-menu-app", appId: d.id, toAppId: _.uiAdapterId, itemId: _.id, label: _.label }), _.useCaseId && l.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: _.useCaseId, itemId: _.id, label: _.label }), _.aggregateId && l.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: _.aggregateId, itemId: _.id, label: _.label }), _.queryOperationId && l.push({
            kind: "set-menu-query-operation",
            appId: d.id,
            queryServiceId: _.queryServiceId ?? null,
            queryOperationId: _.queryOperationId,
            itemId: _.id,
            label: _.label
          }), f(_.children, _);
      };
      f(d.menuItems);
      for (const k of e.model.actorAppUses ?? [])
        k.appId === t.id && l.push({ kind: "add-actor-app", actorId: k.actorId, appId: t.id });
      return l;
    }
    case "delete-ui-page": {
      const d = (e.model.pages ?? []).find((f) => f.id === t.id);
      if (!d) return null;
      const l = [
        { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
      ];
      d.route && l.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && l.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && l.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
      for (const f of d.buttons ?? [])
        f.useCaseId && (l.push({ kind: "add-page-button", pageId: d.id, useCaseId: f.useCaseId, label: f.label }), f.mappingId && l.push({
          kind: "set-page-button",
          pageId: d.id,
          useCaseId: f.useCaseId,
          label: f.label ?? null,
          mappingId: f.mappingId
        }));
      for (const f of d.viewmodelFields ?? [])
        (f.stereotype || f.colspan || f.label) && l.push({
          kind: "set-page-field-config",
          pageId: d.id,
          fieldId: f.fieldId,
          stereotype: f.stereotype ?? null,
          colspan: f.colspan ?? null,
          label: f.label ?? null
        });
      (d.viewmodelFields ?? []).length && l.push({
        kind: "set-page-field-order",
        pageId: d.id,
        fieldIds: (d.viewmodelFields ?? []).map((f) => f.fieldId)
      });
      for (const f of d.content ?? [])
        l.push(...e.rebuildComponentOps(d.id, f, void 0, null).ops);
      for (const f of d.wizardSteps ?? [])
        l.push({
          kind: "add-page-wizard-step",
          pageId: d.id,
          targetId: f.pageId ?? null,
          label: f.label,
          itemId: f.id
        });
      return (d.crudDetailPageId || d.crudDetailAppId) && l.push({ kind: "set-crud-detail", pageId: d.id, targetId: d.crudDetailPageId ?? null, toAppId: d.crudDetailAppId ?? null }), (d.crudCreatePageId || d.crudCreateAppId) && l.push({ kind: "set-crud-create", pageId: d.id, targetId: d.crudCreatePageId ?? null, toAppId: d.crudCreateAppId ?? null }), l;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const d = (e.model.uiApps ?? []).find((k) => k.id === t.appId), l = (k) => {
        for (const b of k ?? []) {
          if (t.itemId ? b.id === t.itemId : b.label === t.label) return b;
          const _ = l(b.children);
          if (_) return _;
        }
        return null;
      }, f = t.itemId || t.label ? l(d == null ? void 0 : d.menuItems) : null;
      return f ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: f.label,
        pageId: f.pageId ?? null,
        itemId: f.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: f.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: f.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: f.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: f.queryServiceId ?? null,
        queryOperationId: f.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: f.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const d = (e.model.pages ?? []).find((f) => f.id === t.pageId), l = ((d == null ? void 0 : d.buttons) ?? []).find((f) => f.useCaseId === t.useCaseId);
      return l ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: l.label }] : null;
    }
    case "rename-ui-page": {
      const d = (e.model.pages ?? []).find((l) => l.id === t.pageId);
      return d ? [{ kind: "rename-ui-page", pageId: t.pageId, name: d.name }] : null;
    }
    case "set-page-type": {
      const d = (e.model.pages ?? []).find((l) => l.id === t.pageId);
      return d ? [{ kind: "set-page-type", pageId: t.pageId, pageType: d.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const d = (e.model.pages ?? []).find((l) => l.id === t.pageId);
      return d != null && d.route ? [{ kind: "set-page-route", pageId: t.pageId, path: d.route }] : null;
    }
    case "set-page-button": {
      const d = (e.model.pages ?? []).find((f) => f.id === t.pageId), l = ((d == null ? void 0 : d.buttons) ?? []).find((f) => f.useCaseId === t.useCaseId);
      return l ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: l.label ?? null,
        mappingId: l.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const d = (e.model.pages ?? []).find((R) => R.id === t.pageId);
      let l = null, f = null, k = null;
      const b = (R, L) => {
        var W;
        const D = R ?? [];
        for (let w = 0; w < D.length; w++)
          D[w].id === t.componentId && (l = D[w], f = L, k = ((W = D[w + 1]) == null ? void 0 : W.id) ?? null), b(D[w].children, D[w]);
      };
      if (b(d == null ? void 0 : d.content, null), !l) return null;
      const _ = l;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: _.title ?? null,
        text: _.text ?? null,
        label: _.label ?? null,
        useCaseId: _.useCaseId ?? null,
        mappingId: _.mappingId ?? null,
        modelId: _.modelId ?? null,
        queryServiceId: _.queryServiceId ?? null,
        queryOperationId: _.queryOperationId ?? null,
        fieldId: _.fieldId ?? null,
        stereotype: _.stereotype ?? null,
        colspan: _.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: f === null ? null : f.id,
        beforeComponentId: k
      }] : e.rebuildComponentOps(
        t.pageId,
        _,
        f === null ? void 0 : f.id,
        k
      ).ops;
    }
    case "set-page-listing": {
      const d = (e.model.pages ?? []).find((l) => l.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (d == null ? void 0 : d.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const d = (e.model.pages ?? []).find((l) => l.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const d = (((a = (e.model.pages ?? []).find((l) => l.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).find((l) => l.fieldId === t.fieldId);
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
      const d = (((r = (e.model.pages ?? []).find((l) => l.id === t.pageId)) == null ? void 0 : r.viewmodelFields) ?? []).map((l) => l.fieldId);
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
      const d = e.model.boundedContexts.find((f) => f.id === t.id);
      if (!d) return null;
      const l = e.model.relations.filter(
        (f) => (f.sourceId === t.id || f.targetId === t.id) && f.type != null
      );
      return [
        { kind: "add-boundedContext", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...l.map(
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
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const d = (e.model.aggregates ?? []).find((l) => l.id === t.id);
      return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, boundedContextId: d.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const d of e.model.boundedContexts) {
        const l = (d.queryServices ?? []).find((f) => f.id === t.id);
        if (l) return [{ kind: "add-query-service", id: l.id, name: l.name, boundedContextId: d.id }];
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
        (l) => l.sourceId === t.sourceId && l.targetId === t.targetId
      );
      return d ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const d = (e.model.externalSystemDependencies ?? []).find(
        (l) => l.sourceId === t.sourceId && l.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d == null ? void 0 : d.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const d = (e.model.proxyApis ?? []).find((l) => l.id === t.id);
      return d ? [{
        kind: "add-proxy-api",
        id: d.id,
        name: d.name,
        targetId: d.targetApiId,
        boundedContextId: d.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const d = (e.model.proxyApis ?? []).find((l) => l.id === t.id);
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
        (l) => l.apiId === t.apiId && l.operationId === t.operationId && l.boundedContextId === t.boundedContextId
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
        (l) => l.apiId === t.apiId && l.operationId === t.operationId && l.boundedContextId === t.boundedContextId
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
      const d = (e.model.apis ?? []).find((l) => l.id === t.id) ?? (e.model.proxyApis ?? []).find((l) => l.id === t.id);
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
        const l = (d.useCases ?? []).find((f) => f.id === t.id);
        if (l)
          return [
            { kind: "add-use-case", id: l.id, name: l.name, boundedContextId: d.id, policy: l.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const d of e.model.externalSystems) {
        const l = (d.useCases ?? []).find((f) => f.id === t.id);
        if (l)
          return [{ kind: "add-external-use-case", id: l.id, name: l.name, boundedContextId: d.id }];
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
      const d = (e.model.notifications ?? []).find((f) => f.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const l = [
        { kind: "add-notification", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: (d.channels ?? [])[0] }
      ];
      d.eventId && l.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
      for (const f of d.recipientRoleIds ?? []) l.push({ kind: "add-notification-recipient", id: d.id, roleId: f });
      return l;
    }
    case "set-notification-event": {
      const d = (e.model.notifications ?? []).find((l) => l.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (d == null ? void 0 : d.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const d = (e.model.documents ?? []).find((f) => f.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const l = [
        { kind: "add-document", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: d.kind }
      ];
      return d.modelId && l.push({ kind: "set-document-model", id: d.id, modelId: d.modelId }), d.queryServiceId && l.push({ kind: "set-document-query", id: d.id, queryServiceId: d.queryServiceId, queryOperationId: d.queryOperationId ?? null }), l;
    }
    case "set-document-model": {
      const d = (e.model.documents ?? []).find((l) => l.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-document-query": {
      const d = (e.model.documents ?? []).find((l) => l.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (d == null ? void 0 : d.queryServiceId) ?? null, queryOperationId: (d == null ? void 0 : d.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const d = (e.model.identityProviders ?? []).find((f) => f.id === t.id);
      if (!d) return null;
      const l = [
        { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
      ];
      d.publishedByExternalSystemId && l.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
      for (const f of e.model.boundedContexts)
        f.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      for (const f of e.model.uiApps ?? [])
        f.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      for (const f of e.model.etlFlows ?? [])
        f.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      return l;
    }
    case "set-idp-publisher": {
      const d = (e.model.identityProviders ?? []).find((l) => l.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const d = ((p = e.model.boundedContexts.find((l) => l.id === t.id)) == null ? void 0 : p.identityProviderId) ?? ((s = (e.model.uiApps ?? []).find((l) => l.id === t.id)) == null ? void 0 : s.identityProviderId) ?? ((c = (e.model.etlFlows ?? []).find((l) => l.id === t.id)) == null ? void 0 : c.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: d }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const d = (e.model.etlFlows ?? []).find((l) => l.id === t.id);
      return !d || !d.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId },
        ...(d.steps ?? []).map((l) => ({
          kind: "add-etl-step",
          etlFlowId: d.id,
          id: l.id,
          name: l.name,
          stepType: l.type,
          externalTableId: l.externalTableId,
          apiId: l.apiId,
          operationId: l.operationId,
          targetId: l.eventId,
          mappingId: l.mappingId
        }))
      ];
    }
    case "add-etl-step":
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const d = (((h = (e.model.etlFlows ?? []).find((l) => l.id === t.etlFlowId)) == null ? void 0 : h.steps) ?? []).find((l) => l.id === t.id);
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
        (f) => (f.scheduledTriggers ?? []).some((k) => k.id === t.id)
      ), l = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((f) => f.id === t.id);
      return !d || !l ? null : [{
        kind: "add-scheduled-trigger",
        id: l.id,
        name: l.name,
        boundedContextId: d.id,
        cronExpression: l.cronExpression,
        targetUseCaseId: l.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const d = e.model.boundedContexts.flatMap((l) => l.scheduledTriggers ?? []).find((l) => l.id === t.id);
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
      const d = e.model.externalSystems.find((l) => l.id === t.id);
      return d ? [{ kind: "add-external-system", id: d.id, name: d.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const d = (e.model.aiAgents ?? []).find((l) => l.id === t.id);
      return d ? [
        { kind: "add-ai-agent", id: d.id, name: d.name, external: d.external },
        ...(e.model.agentUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-use", sourceId: t.id, targetId: l.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: l.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: l.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: l.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: l.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-query", sourceId: t.id, targetId: l.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: l.ragId })),
        ...(e.model.agentDelegations ?? []).filter((l) => l.agentId === t.id || l.delegateAgentId === t.id).map((l) => ({
          kind: "add-agent-delegate",
          sourceId: l.agentId,
          targetId: l.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-actor-agent", sourceId: l.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((l) => l.agentId === t.id).map((l) => ({ kind: "add-agent-trigger", sourceId: l.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const d = (e.model.mcpGateways ?? []).find((l) => l.id === t.id);
      return d ? [
        { kind: "add-mcp-gateway", id: d.id, name: d.name },
        ...[
          ...d.mcpServerIds ?? [],
          ...d.apiIds ?? [],
          ...d.apiOperationIds ?? [],
          ...d.useCaseIds ?? [],
          ...d.ragIds ?? []
        ].map((l) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: l })),
        ...(e.model.agentGatewayUses ?? []).filter((l) => l.gatewayId === t.id).map((l) => ({ kind: "add-agent-gateway", sourceId: l.agentId, targetId: t.id }))
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
        const l = (d.mcpServers ?? []).find((f) => f.id === t.id);
        if (l)
          return [
            { kind: "add-mcp-server", id: l.id, name: l.name, boundedContextId: d.id, uri: l.uri },
            ...(e.model.agentMcpUses ?? []).filter((f) => f.mcpServerId === t.id).map(
              (f) => ({
                kind: "add-agent-mcp",
                sourceId: f.agentId,
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
      const d = (e.model.rags ?? []).find((l) => l.id === t.id);
      return d ? [
        { kind: "add-rag", id: d.id, name: d.name },
        ...(e.model.agentRags ?? []).filter((l) => l.ragId === t.id).map(
          (l) => ({
            kind: "add-agent-rag",
            sourceId: l.agentId,
            targetId: t.id
          })
        ),
        ...(d.sourceReadModelIds ?? []).map(
          (l) => ({ kind: "add-rag-source", sourceId: t.id, targetId: l })
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
      const d = (e.model.actors ?? []).find((l) => l.id === t.id);
      return d ? [{ kind: "add-actor", id: d.id, name: d.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const d of e.model.boundedContexts) {
        const l = (d.applicationEvents ?? []).find((f) => f.id === t.id);
        if (l)
          return [{ kind: "add-application-event", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const d of e.model.boundedContexts) {
        const l = (d.domainServices ?? []).find((f) => f.id === t.id);
        if (l) return [{ kind: "add-domain-service", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const d = (e.model.projections ?? []).find((l) => l.id === t.id);
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
        const l = (d.tables ?? []).find((f) => f.id === t.id);
        if (l) return [{ kind: "add-external-table", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const d = (m = (y = (e.model.rags ?? []).find((l) => l.id === t.sourceId)) == null ? void 0 : y.contentSources) == null ? void 0 : m.find((l) => l.uri === t.uri);
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
      const d = (e.model.apis ?? []).find((l) => l.id === t.id);
      return d ? [
        { kind: "add-api", id: d.id, name: d.name },
        ...d.operations.map(
          (l) => ({
            kind: "add-api-operation",
            apiId: d.id,
            id: l.id,
            name: l.name,
            httpMethod: l.httpMethod,
            path: l.path,
            boundedContextId: l.targetBoundedContextId,
            targetUseCaseId: l.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const d = (g = (e.model.apis ?? []).find((l) => l.id === t.apiId)) == null ? void 0 : g.operations.find((l) => l.id === t.id);
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
      const d = (v = (e.model.apis ?? []).find((l) => l.id === t.apiId)) == null ? void 0 : v.operations.find((l) => l.id === t.id);
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
        const l = (d.readModels ?? []).find((f) => f.id === t.id);
        if (l != null && l.aggregateId)
          return [{ kind: "add-read-model", id: l.id, name: l.name, aggregateId: l.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const d of e.model.boundedContexts) {
        const l = (d.domainEvents ?? []).find((f) => f.id === t.id);
        if (l) return [{ kind: "add-domain-event", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "rename-element": {
      const l = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((f) => f.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((f) => f.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((f) => f.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((f) => f.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((f) => f.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((f) => f.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((f) => f.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((f) => f.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((f) => f.id === t.id);
      return l ? [{ kind: "rename-element", type: t.type, id: t.id, name: l.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const d = e.model.flows.find((l) => l.id === t.id);
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
    case "add-journey":
      return [{ kind: "remove-journey", id: t.id }];
    case "remove-journey": {
      const d = (e.model.journeys ?? []).find((l) => l.id === t.id);
      return d ? [
        { kind: "add-journey", id: d.id, name: d.name },
        ...(d.legs ?? []).map((l) => ({
          kind: "journey-add-leg",
          journeyId: d.id,
          itemId: l.id,
          sourceId: l.sourceId,
          targetId: l.targetId,
          dependsOnStepIds: l.afterLegIds,
          label: l.label
        }))
      ] : null;
    }
    case "journey-add-leg":
      return [{ kind: "journey-remove-leg", journeyId: t.journeyId, itemId: t.itemId }];
    case "journey-remove-leg": {
      const d = (e.model.journeys ?? []).find((f) => f.id === t.journeyId), l = ((d == null ? void 0 : d.legs) ?? []).find((f) => f.id === t.itemId);
      return l ? [{
        kind: "journey-add-leg",
        journeyId: t.journeyId,
        itemId: l.id,
        sourceId: l.sourceId,
        targetId: l.targetId,
        dependsOnStepIds: l.afterLegIds,
        label: l.label
      }] : null;
    }
    case "add-view":
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const d = (e.model.views ?? []).find((l) => l.id === t.id);
      return d ? [{ kind: "add-view", id: d.id, name: d.name, memberIds: d.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const d = (e.model.processes ?? []).find((k) => k.id === t.processId), l = (d == null ? void 0 : d.steps.findIndex((k) => k.id === t.id)) ?? -1;
      if (!d || l < 0) return null;
      const f = d.steps[l];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: f.id,
          name: f.name,
          stepType: f.type,
          roleId: f.roleId,
          deadline: f.deadline,
          useCaseId: f.useCaseId,
          compensationUseCaseId: f.compensationUseCaseId,
          afterStepId: l > 0 ? d.steps[l - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const d = (e.model.processes ?? []).find((f) => f.id === t.processId), l = (d == null ? void 0 : d.steps.findIndex((f) => f.id === t.id)) ?? -1;
      return !d || l < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: l > 0 ? d.steps[l - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const d = (e.model.processes ?? []).find((f) => f.id === t.processId), l = d == null ? void 0 : d.steps.find((f) => f.id === t.id);
      return l ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: l.roleId,
          deadline: l.deadline,
          compensationUseCaseId: l.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const d = (e.model.processes ?? []).find((l) => l.id === t.id);
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
      const d = (e.model.workflows ?? []).find((l) => l.id === t.id);
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
      const d = (e.model.workflows ?? []).find((k) => k.id === t.workflowId), l = (d == null ? void 0 : d.steps.findIndex((k) => k.id === t.id)) ?? -1;
      if (!d || l < 0) return null;
      const f = d.steps[l];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: f.id,
          name: f.name,
          emittedEventName: f.emittedEventName,
          targetUseCaseId: f.targetUseCaseId,
          completionEventName: f.completionEventName,
          dependsOnStepIds: f.dependsOnStepIds,
          afterStepId: l > 0 ? d.steps[l - 1].id : void 0
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
      const d = (e.model.workflows ?? []).find((f) => f.id === t.workflowId), l = d == null ? void 0 : d.steps.find((f) => f.id === t.id);
      return l ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: l.emittedEventName,
          targetUseCaseId: l.targetUseCaseId,
          completionEventName: l.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const d = (e.model.workflows ?? []).find((l) => l.id === t.id);
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
const ae = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function wa(e, t, i, n, o, a, r) {
  var I, P, C;
  if (e.activeJourneyId && (t === "context-map" || t === "integrations")) {
    const x = (e.model.journeys ?? []).find(($) => $.id === e.activeJourneyId);
    if (x && i !== n) {
      const $ = x.legs ?? [], M = $.filter((T) => T.targetId === i).map((T) => T.id);
      let S = $.length + 1;
      for (; $.some((T) => T.id === `leg-${S}`); ) S++;
      e.command({
        kind: "journey-add-leg",
        journeyId: x.id,
        itemId: `leg-${S}`,
        sourceId: i,
        targetId: n,
        dependsOnStepIds: M
      });
      return;
    }
  }
  if (t === "context-map" && e.detail === "distribution") {
    const x = e.sceneFor("context-map"), $ = e.model.modules ?? [], S = ((T) => {
      var N;
      for (let z = T; z; ) {
        if ($.some((q) => q.id === z)) return z;
        z = (N = x.nodes.find((q) => q.id === z)) == null ? void 0 : N.parentId;
      }
      return null;
    })(n);
    if (S && S !== i && (e.model.services ?? []).some((T) => T.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: S });
      return;
    }
    if ((e.model.services ?? []).some((T) => T.id === i)) {
      const T = e.model.boundedContexts.find((q) => q.id === n), N = T ? $.filter((q) => q.boundedContextId === T.id) : [], z = N.find((q) => q.main) ?? N[0];
      if (z) {
        e.command({ kind: "add-service-module", serviceId: i, id: z.id });
        return;
      }
    }
    if (S && S !== i && !$.some((N) => N.id === i) && !e.model.boundedContexts.some((N) => N.id === i)) {
      e.command({ kind: "add-module-element", id: S, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    wa(e, "context-map", i, n, o, a, r);
    return;
  }
  if (t === "eventstorming") {
    const x = (M) => (e.model.customCodes ?? []).some((S) => S.id === M), $ = x(n) ? { stepId: i, ccId: n } : x(i) ? { stepId: n, ccId: i } : null;
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
    const x = (q) => (e.model.actors ?? []).some((j) => j.id === q);
    if (x(i) !== x(n)) {
      const q = x(i) ? i : n, j = x(i) ? n : i, de = e.owningWorkflowOf(j);
      if (de) {
        e.command({ kind: "set-workflow-step-role", workflowId: de.id, id: j, targetId: q });
        return;
      }
    }
    const $ = (q) => (e.model.pages ?? []).some((j) => j.id === q);
    if ($(i) !== $(n)) {
      const q = $(i) ? i : n, j = $(i) ? n : i, de = e.owningWorkflowOf(j);
      if (de) {
        e.command({ kind: "set-workflow-step-form", workflowId: de.id, id: j, targetId: q });
        return;
      }
    }
    const M = e.model.workflowGateways ?? [], S = (q) => M.some((j) => j.id === q);
    if (S(i) || S(n) || (e.model.workflows ?? []).some((q) => q.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const T = e.owningWorkflowOf(i), N = e.owningWorkflowOf(n);
    if (!T || T !== N || i === n) return;
    const z = T.steps.find((q) => q.id === n);
    if (((z == null ? void 0 : z.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: T.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const x = e.model.pages ?? [], $ = e.model.uiApps ?? [], M = (V) => $.some((Z) => Z.id === V), S = (V) => x.some((Z) => Z.id === V), T = (V) => (e.model.customCodes ?? []).some((Z) => Z.id === V);
    if (T(i) || T(n)) {
      const V = T(i) ? i : n, Z = T(i) ? n : i;
      if (T(Z)) return;
      if (S(Z)) {
        e.command({ kind: "set-page-custom-code", id: Z, targetId: V });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: V, elementId: Z });
      return;
    }
    const N = e.model.buttonGroups ?? [], z = (V) => N.some((Z) => Z.id === V);
    if ((r === "toolbar" || r === "bottom") && z(i) && S(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: r });
      return;
    }
    if (z(i) && z(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const q = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (q) {
      e.model.boundedContexts.some((Z) => (Z.useCases ?? []).some((Ee) => Ee.id === n)) ? e.command({ kind: "set-group-button-target", id: q[1], itemId: q[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (r === "home" && M(i) && (S(n) || M(n))) {
      if (n === i) return;
      e.command(
        S(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (r === "header" && M(i) && S(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((r === "crud-detail" || r === "crud-create") && S(i) && (S(n) || M(n)) && n !== i) {
      const V = r === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(n) ? { kind: V, pageId: i, targetId: n, toAppId: null } : { kind: V, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (r === "viewmodel" && S(i)) {
      (e.model.models ?? []).some((V) => V.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((r === "view" || r === "edit") && M(i) && S(n)) {
      e.command({
        kind: r === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (r) return;
    const j = (V) => /^wizrow:([^:]+):(.+)$/.exec(V), de = j(i) ?? j(n);
    if (de) {
      const V = j(i) ? n : i;
      S(V) && V !== de[1] && e.command({ kind: "set-wizard-step-page", pageId: de[1], itemId: de[2], targetId: V });
      return;
    }
    const ce = x.find((V) => V.id === n && V.type === "WIZARD");
    if (S(i) && ce && i !== ce.id) {
      (ce.wizardSteps ?? []).some((V) => V.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: ce.id, targetId: i });
      return;
    }
    if (S(i) && M(n)) {
      const V = x.find((Ee) => Ee.id === i), Z = $.find((Ee) => Ee.id === n);
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
    const F = e.model.identityProviders ?? [], G = (V) => F.some((Z) => Z.id === V);
    if (G(i) || G(n)) {
      const V = G(i) ? i : n, Z = G(i) ? n : i;
      M(Z) ? e.command({ kind: "set-identity-provider", id: Z, targetId: V }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const ue = (V) => (e.model.models ?? []).some((Z) => Z.id === V);
    if (ue(i) || ue(n)) {
      const V = ue(i) ? i : n, Z = ue(i) ? n : i;
      if (S(Z)) {
        e.command({ kind: "set-page-model", pageId: Z, modelId: V });
        return;
      }
      if (M(Z)) {
        e.command({ kind: "set-app-model", appId: Z, modelId: V });
        return;
      }
      return;
    }
    const ye = $e(i);
    if (ye != null && ye.itemId && ((I = $e(n)) != null && I.itemId || M(n))) {
      const V = $e(n), Z = e.menuEntryIn(ye.appId, ye.itemId);
      if (!Z) return;
      if (V != null && V.itemId) {
        const Ee = e.menuEntryIn(V.appId, V.itemId);
        if (!Ee) return;
        const Oe = (wt) => (wt ?? []).some((ci) => ci.id === V.itemId || Oe(ci.children));
        if (ye.appId === V.appId && (V.itemId === ye.itemId || Oe(Z.entry.children)))
          return;
        const qe = e.nodeClientRect(n), Ne = qe && a !== void 0 ? (a - qe.top) / Math.max(1, qe.height) : 0.5, et = Ne < 0.3 ? "before" : Ne > 0.7 ? "after" : "nest";
        if (et === "nest")
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: V.appId,
            itemId: ye.itemId,
            parentId: V.itemId
          });
        else {
          const wt = et === "before" ? V.itemId : Ee.beforeId ?? void 0;
          if (ye.appId === V.appId && Ee.parentId === Z.parentId && wt === ye.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: V.appId,
            itemId: ye.itemId,
            parentId: Ee.parentId ?? void 0,
            beforeItemId: wt
          });
        }
        return;
      }
      if (ye.appId === n && !Z.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: ye.appId,
        toAppId: n,
        itemId: ye.itemId
      });
      return;
    }
    const Fe = $e(i) ?? $e(n);
    if (Fe) {
      const V = $e(i) ? i : n, Z = $e(i) ? n : i;
      if (((P = e.sceneFor("ui").nodes.find((Ne) => Ne.id === V)) == null ? void 0 : P.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const Ee = e.model.boundedContexts.some(
        (Ne) => (Ne.useCases ?? []).some((et) => et.id === Z)
      ), Oe = (e.model.aggregates ?? []).some((Ne) => Ne.id === Z), qe = e.model.boundedContexts.flatMap((Ne) => Ne.queryServices ?? []).find((Ne) => (Ne.operations ?? []).some((et) => et.id === Z));
      S(Z) ? e.command({ kind: "set-menu-page", pageId: Z, ...Fe }) : M(Z) && Z !== Fe.appId ? e.command({ kind: "set-menu-app", toAppId: Z, ...Fe }) : Ee ? e.command({ kind: "set-menu-use-case", useCaseId: Z, ...Fe }) : Oe ? e.command({ kind: "set-menu-aggregate", aggregateId: Z, ...Fe }) : qe && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: qe.id,
        queryOperationId: Z,
        ...Fe
      });
      return;
    }
    if ((e.model.actors ?? []).some((V) => V.id === i) && M(n)) {
      (e.model.actorAppUses ?? []).some((V) => V.actorId === i && V.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const Se = S(i) ? { pageId: i, other: n } : S(n) ? { pageId: n, other: i } : null;
    if (Se) {
      const V = new Set(
        e.model.boundedContexts.flatMap((Oe) => (Oe.useCases ?? []).map((qe) => qe.id))
      ), Z = new Set(
        e.model.boundedContexts.flatMap((Oe) => (Oe.queryServices ?? []).map((qe) => qe.id))
      ), Ee = x.find((Oe) => Oe.id === Se.pageId);
      V.has(Se.other) ? (Ee.buttons ?? []).some((Oe) => Oe.useCaseId === Se.other) || e.command({ kind: "add-page-button", pageId: Se.pageId, useCaseId: Se.other }) : Z.has(Se.other) && e.command({ kind: "set-page-listing", pageId: Se.pageId, queryServiceId: Se.other });
    }
    return;
  }
  if (t === "mappings") {
    const x = e.model.models ?? [], $ = kn(i), M = kn(n), S = e.model.transformations ?? [], T = e.model.customCodes ?? [], N = (F) => T.some((G) => G.id === F);
    if (N(i) && S.some((F) => F.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (N(n) && S.some((F) => F.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (N(i)) {
      const F = (M == null ? void 0 : M.modelId) ?? (x.some((G) => G.id === n) ? n : null);
      if (F) {
        const G = (e.model.modelMappings ?? []).filter(
          (ue) => ue.sourceModelId === F || ue.targetModelId === F
        );
        G.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: G[0].id, targetId: i }) : e.emit("modux-notice", {
          message: G.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((F) => F.id === n)) {
      if (M || S.some((G) => G.id === i)) return;
      const F = $ ? { modelId: $.modelId, fieldId: $.fieldId } : x.some((G) => G.id === i) ? { modelId: i } : null;
      F && e.command({ kind: "add-transformation-input", id: n, ...F });
      return;
    }
    if (S.some((F) => F.id === i)) {
      const F = M ? { modelId: M.modelId, fieldId: M.fieldId } : x.some((G) => G.id === n) ? { modelId: n } : null;
      F && e.command({ kind: "set-transformation-output", id: i, ...F });
      return;
    }
    if ($ && M) {
      if ($.modelId === M.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let F = (e.model.modelMappings ?? []).find(
        (G) => G.sourceModelId === $.modelId && G.targetModelId === M.modelId
      );
      if (!F) {
        const G = x.find((V) => V.id === $.modelId), ue = x.find((V) => V.id === M.modelId);
        if (!G || !ue) return;
        const ye = (V) => V.replace(/[^a-zA-Z0-9]/g, ""), Fe = new Set((e.model.modelMappings ?? []).map((V) => V.id));
        let Se = `mapping-${ae(G.name)}-${ae(ue.name)}`;
        for (let V = 2; Fe.has(Se); V++) Se = `mapping-${ae(G.name)}-${ae(ue.name)}-${V}`;
        e.command(
          { kind: "add-model-mapping", id: Se, name: `${ye(G.name)}2${ye(ue.name)}`, sourceId: G.id, targetId: ue.id },
          !1
        ), F = { id: Se, name: "", sourceModelId: G.id, targetModelId: ue.id };
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
    const z = x.find((F) => F.id === i), q = x.find((F) => F.id === n), j = (F) => F.replace(/[^a-zA-Z0-9]/g, ""), de = new Set((e.model.modelMappings ?? []).map((F) => F.id));
    let ce = `mapping-${ae(z.name)}-${ae(q.name)}`;
    for (let F = 2; de.has(ce); F++) ce = `mapping-${ae(z.name)}-${ae(q.name)}-${F}`;
    e.command({
      kind: "add-model-mapping",
      id: ce,
      name: `${j(z.name)}2${j(q.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t !== "context-map") return;
  const p = /^apiop:(.+)@(.+)$/.exec(i);
  if (p) {
    const [, x, $] = p, M = (e.model.proxyApis ?? []).find((q) => q.id === $), S = (M == null ? void 0 : M.targetApiId) ?? ((C = (e.model.apiImplementations ?? []).find(
      (q) => q.boundedContextId === $ && (e.model.apis ?? []).some(
        (j) => j.id === q.apiId && j.operations.some((de) => de.id === x)
      )
    )) == null ? void 0 : C.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((j) => j.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
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
      q && q[1] === M.targetApiId ? N = q[2] : e.model.boundedContexts.some((j) => j.id === n) && (e.model.apiImplementations ?? []).some(
        (j) => j.apiId === M.targetApiId && j.boundedContextId === n
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
      e.model.boundedContexts.flatMap((N) => (N.useCases ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (z) => z.agentId === i && z.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.useCases ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (z) => z.agentId === i && z.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.mcpServers ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (z) => z.agentId === i && z.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((N) => N.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (z) => z.agentId === i && z.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((N) => N.operations.map((z) => z.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (z) => z.agentId === i && z.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === n) || (e.model.proxyApis ?? []).some((N) => N.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (z) => z.agentId === i && z.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (z) => z.agentId === i && z.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (s.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (z) => z.agentId === i && z.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((N) => N.id === n) && ((e.model.agentRags ?? []).some(
      (z) => z.agentId === i && z.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((x) => x.id === i)) {
    const x = (e.model.mcpGateways ?? []).find((S) => S.id === i), $ = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((T) => T.id === n)) || (e.model.apis ?? []).some((S) => S.id === n) || (e.model.apis ?? []).some((S) => S.operations.some((T) => T.id === n)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((T) => T.id === n)) || (e.model.rags ?? []).some((S) => S.id === n), M = [
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
  const c = (e.model.rags ?? []).find((x) => x.id === i);
  if (c) {
    if (new Set(
      e.model.boundedContexts.flatMap((M) => (M.readModels ?? []).map((S) => S.id))
    ).has(n) && !(c.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((M) => (M.tables ?? []).map((S) => S.id))
    ).has(n) && !(c.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((M) => M.id === n) || (e.model.proxyApis ?? []).some((M) => M.id === n)) && !(c.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n) && !(c.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((M) => M.id === n) && !(c.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((x) => x.id === n)) return;
  if ((e.model.workflows ?? []).some((x) => x.id === i)) {
    const x = (e.model.workflows ?? []).find((S) => S.id === i), $ = (e.model.workflows ?? []).find(
      (S) => S.id === n && S.id !== i
    );
    if ($) {
      const S = x.onCompletionEventName || `${x.name.replace(/\s+/g, "")}Completado`;
      $.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: S });
      return;
    }
    const M = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === n);
    if (M && !(x.steps ?? []).some((T) => T.targetUseCaseId === n)) {
      const T = `wfs-${ae(M.name)}`;
      let N = T;
      for (let z = 2; (x.steps ?? []).some((q) => q.id === N); z++)
        N = `${T}-${z}`;
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
    const x = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === i), $ = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === i), M = x ?? $;
    if (M) {
      const S = (e.model.emissions ?? []).find((q) => q.domainEventId === i), T = new Set((e.model.aggregates ?? []).map((q) => q.id)), N = new Set(
        e.model.boundedContexts.flatMap((q) => (q.domainServices ?? []).map((j) => j.id))
      ), z = new Set(
        e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((j) => j.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: M.name,
        triggerAggregateId: S && T.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && N.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && z.has(S.sourceId) ? S.sourceId : void 0
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
  const h = new Set((e.model.actors ?? []).map((x) => x.id));
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
    if (!h.has(i)) return;
  }
  if (h.has(i)) {
    const x = new Set(
      e.model.boundedContexts.flatMap((M) => (M.useCases ?? []).map((S) => S.id))
    ), $ = new Set(
      e.model.boundedContexts.flatMap((M) => (M.queryServices ?? []).map((S) => S.id))
    );
    if (x.has(n) || $.has(n)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === i && S.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((M) => M.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === i && S.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((M) => M.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === i && S.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const y = e.owningApiOf(i);
  if (y) {
    if (new Set(
      e.model.boundedContexts.flatMap(($) => ($.useCases ?? []).map((M) => M.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: y.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: y.id,
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
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((T) => T.id === $)
    )) {
      x.eventId !== $ && e.command({ kind: "set-notification-event", id: x.id, targetId: $ });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === $)) {
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
    const S = e.model.boundedContexts.flatMap((N) => N.queryServices ?? []).find((N) => N.id === $), T = e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).flatMap((z) => (z.operations ?? []).map((q) => ({ op: q, qs: z })))).find(({ op: N }) => N.id === $);
    if (S || T) {
      e.command({
        kind: "set-document-query",
        id: x.id,
        queryServiceId: (S == null ? void 0 : S.id) ?? T.qs.id,
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
    const M = e.model.boundedContexts.some((T) => T.id === $), S = (e.model.etlFlows ?? []).some((T) => T.id === $);
    if (M || S) {
      e.command({ kind: "set-identity-provider", id: $, targetId: x.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const l = e.model.etlFlows ?? [], f = (x) => l.find(($) => $.id === x);
  if (f(i) || f(n)) {
    const x = f(i) ?? f(n), $ = f(i) ? n : i, M = !f(i), S = new Set(e.model.externalSystems.flatMap((G) => (G.tables ?? []).map((ue) => ue.id))), T = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((G) => G.id),
      ...(e.model.proxyApis ?? []).map((G) => G.id)
    ]), N = (e.model.apis ?? []).find((G) => G.operations.some((ue) => ue.id === $)), z = new Set(
      e.model.boundedContexts.flatMap((G) => [
        ...(G.domainEvents ?? []).map((ue) => ue.id),
        ...(G.applicationEvents ?? []).map((ue) => ue.id)
      ])
    );
    let q = null, j = {};
    if (S.has($) ? (q = M ? "SOURCE_PULL" : "WRITE_DB", j = { externalTableId: $ }) : N ? (q = M ? "SOURCE_PULL" : "WRITE_API", j = { apiId: N.id, operationId: $ }) : T.has($) ? (q = M ? "SOURCE_PULL" : "WRITE_API", j = { apiId: $ }) : z.has($) && (q = M ? "SOURCE_CONSUMER" : "WRITE_EVENT", j = { targetId: $ }), !q) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((x.steps ?? []).some(
      (G) => G.type === q && (G.externalTableId ?? G.operationId ?? G.apiId ?? G.eventId) === (j.externalTableId ?? j.operationId ?? j.apiId ?? j.targetId)
    )) return;
    const ce = new Set((x.steps ?? []).map((G) => G.id));
    let F = (x.steps ?? []).length + 1;
    for (; ce.has(`ets-${F}`); ) F++;
    e.command({ kind: "add-etl-step", etlFlowId: x.id, id: `ets-${F}`, stepType: q, ...j });
    return;
  }
  const k = e.model.externalSystems.flatMap((x) => x.useCases ?? []).find((x) => x.id === i), b = e.model.externalSystems.flatMap((x) => x.tables ?? []).find((x) => x.id === i);
  if (k || b) {
    const x = (k ?? b).name, $ = k ? { externalUseCaseId: i } : { externalTableId: i }, M = (N) => k ? N.sourceExternalUseCaseId === i : N.sourceExternalTableId === i, S = e.model.boundedContexts.flatMap((N) => N.readModels ?? []).find((N) => N.id === n);
    if (S) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(x)}-${ae(S.name)}`,
        name: `${S.name}Projection`,
        ...$,
        targetId: n
      });
      return;
    }
    const T = e.model.boundedContexts.find((N) => N.id === n);
    if (T) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(x)}-${ae(T.name)}`,
        name: `${x}ViewProjection`,
        ...$,
        boundedContextId: n,
        readModelName: `${x}View`
      });
      return;
    }
    return;
  }
  const _ = (e.model.aggregates ?? []).find((x) => x.id === i);
  if (_) {
    const x = e.model.boundedContexts.flatMap((M) => M.readModels ?? []).find((M) => M.id === n);
    if (x) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(_.name)}-${ae(x.name)}`,
        name: `${x.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const $ = e.model.boundedContexts.find((M) => M.id === n);
    if ($) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(_.name)}-${ae($.name)}`,
        name: `${_.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${_.name}View`
      });
      return;
    }
  }
  const R = new Set(
    e.model.boundedContexts.flatMap((x) => (x.domainEvents ?? []).map(($) => $.id))
  ), L = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((x) => x.id),
    ...e.model.boundedContexts.flatMap((x) => (x.domainServices ?? []).map(($) => $.id))
  ]), D = new Set(
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
  const E = new Set(
    e.model.externalSystems.flatMap((x) => (x.useCases ?? []).map(($) => $.id))
  );
  if (W.has(i) && E.has(n)) {
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
  if (L.has(i) && R.has(n) || W.has(i) && D.has(n)) {
    (e.model.emissions ?? []).some(
      ($) => $.sourceId === i && $.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (R.has(i) || D.has(i)) {
    const x = D.has(i), $ = e.model.boundedContexts.flatMap((F) => (x ? F.applicationEvents : F.domainEvents) ?? []).find((F) => F.id === i), M = e.model.boundedContexts.flatMap((F) => (F.useCases ?? []).map((G) => ({ u: G, boundedContext: F }))).find(({ u: F }) => F.id === n), S = e.model.boundedContexts.flatMap((F) => (F.readModels ?? []).map((G) => ({ rm: G, boundedContext: F }))).find(({ rm: F }) => F.id === n), T = e.model.boundedContexts.find((F) => F.id === n) ?? (S == null ? void 0 : S.boundedContext) ?? (M == null ? void 0 : M.boundedContext);
    if (!$ || !T) return;
    const N = new Set((e.model.aggregates ?? []).map((F) => F.id)), z = new Set(
      e.model.boundedContexts.flatMap((F) => (F.domainServices ?? []).map((G) => G.id))
    ), q = (e.model.emissions ?? []).find(
      (F) => F.domainEventId === i && (x ? W.has(F.sourceId) : N.has(F.sourceId) || z.has(F.sourceId))
    );
    if (!q) {
      e.emit("modux-notice", {
        message: x ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const j = !x && N.has(q.sourceId);
    if (M) {
      if (e.model.flows.some(
        (G) => G.archetype === "TRIGGERS" && G.triggerEvent === $.name && G.targetUseCaseId === M.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ae($.name)}-${ae(M.u.name)}`,
        name: M.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: j ? q.sourceId : "",
        triggerDomainServiceId: !x && !j ? q.sourceId : void 0,
        triggerUseCaseId: x ? q.sourceId : void 0,
        triggerEvent: $.name,
        targetId: T.id,
        targetUseCaseId: M.u.id
      });
      return;
    }
    const de = (S == null ? void 0 : S.rm.name) ?? `${$.name}View`;
    if (e.model.flows.some(
      (F) => F.archetype === "MATERIALIZES" && F.triggerEvent === $.name && F.targetId === T.id && F.readModelName === de
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ae($.name)}-${ae(de)}`,
      name: de,
      archetype: "MATERIALIZES",
      triggerAggregateId: j ? q.sourceId : "",
      triggerDomainServiceId: !x && !j ? q.sourceId : void 0,
      triggerUseCaseId: x ? q.sourceId : void 0,
      triggerEvent: $.name,
      targetId: T.id,
      readModelName: de
    });
    return;
  }
  const oe = /* @__PURE__ */ new Set([
    ...L,
    ...W,
    ...w,
    ...e.model.boundedContexts.flatMap((x) => (x.readModels ?? []).map(($) => $.id))
  ]);
  if (oe.has(i) || oe.has(n) || R.has(n) || D.has(n))
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
    ), M = /^apiop:(.+)@(.+)$/.exec(n), S = $ ? { operationId: n, siteId: $.id } : M ? { operationId: M[1], siteId: M[2] } : null;
    if (S) {
      (e.model.externalOperationUses ?? []).some(
        (N) => N.externalSystemId === i && N.operationId === S.operationId && N.siteId === S.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: S.operationId,
        targetSiteId: S.siteId
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
  te.has(n) || h.has(n);
}
function Qc(e, t, i, n, o) {
  var a, r, p;
  if (o === "invariant" || o === "invariant-containment") {
    const s = o === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: s });
    return;
  }
  if (t === "eventstorming" && i === "edge" && o === "es-custom") {
    const s = /^escc:(.+)$/.exec(n), c = s ? e.owningUseCaseOf(s[1]) : null;
    s && c && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: c.id, id: s[1], targetId: null }));
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
        const c = $e(s[1]);
        c && e.command({ kind: "set-menu-page", pageId: null, ...c });
      } else if (s = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const c = $e(s[1]);
        c && e.command({ kind: "set-menu-app", toAppId: null, ...c });
      } else if (s = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const c = $e(s[1]);
        c && e.command({ kind: "set-menu-use-case", useCaseId: null, ...c });
      } else if (s = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const c = $e(s[1]);
        c && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...c });
      } else if (s = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const c = $e(s[1]);
        c && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...c });
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
      const s = $e(n);
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
    const s = kn(n);
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
    const c = e.owningWorkflowOf(s[2]);
    if (!c) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: c.id,
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
      const c = e.owningWorkflowOf(s[1]);
      c && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: c.id, id: s[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-form") {
    const s = /^wfform:(.+)->(.+)$/.exec(n);
    if (s) {
      const c = e.owningWorkflowOf(s[1]);
      if (!c) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: c.id, id: s[1] });
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
    const [, c, h] = s, y = (a = (e.model.apis ?? []).find(
      (m) => m.operations.some((g) => g.id === c)
    )) == null ? void 0 : a.id;
    if (!y) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: y, operationId: c, boundedContextId: h });
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
    const [, c, h, y] = s, m = /^apiimpl:.+@(.+)$/.exec(y), g = m ? m[1] : y;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: h, operationId: c, targetSiteId: g });
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
  if (i === "edge" && o === "journey") {
    const s = /^journeyleg:([^:]+):(.+)$/.exec(n);
    s && (e.clearSelection(), e.command({ kind: "journey-remove-leg", journeyId: s[1], itemId: s[2] }));
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
    for (let c = (r = s.nodes.find((h) => h.id === n)) == null ? void 0 : r.parentId; c; ) {
      if ((e.model.modules ?? []).some((h) => h.id === c)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: c, elementId: n });
        return;
      }
      c = (p = s.nodes.find((h) => h.id === c)) == null ? void 0 : p.parentId;
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
    const s = /^apiwire:(.+)$/.exec(n), c = s ? e.owningApiOf(s[1]) : null;
    if (!s || !c) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: c.id, id: s[1] });
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
    if (!s || !(e.model.proxyApis ?? []).some((c) => c.id === s[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
    return;
  }
  if (i === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((c) => c.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
    return;
  }
  if (i === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((c) => c.aggregateId === n)) return;
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
const Zc = [
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
], Lo = [
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
var ep = Object.defineProperty, tp = Object.getOwnPropertyDescriptor, Q = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? tp(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && ep(t, i, o), o;
};
const _n = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, ip = Object.keys(_n);
function Ht(e, t, i) {
  const n = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, r = i.y + i.h / 2;
  let p = 0, s = 1;
  const c = t.x - e.x, h = t.y - e.y;
  for (const [y, m] of [
    [-c, e.x - n],
    [c, o - e.x],
    [-h, e.y - a],
    [h, r - e.y]
  ]) {
    if (y === 0) {
      if (m < 0) return !1;
      continue;
    }
    const g = m / y;
    if (y < 0) {
      if (g > s) return !1;
      g > p && (p = g);
    } else {
      if (g < p) return !1;
      g < s && (s = g);
    }
  }
  return s - p > 0.02;
}
function np(e, t, i = 28) {
  const n = new Map(e.nodes.map((c) => [c.id, c])), o = (c) => {
    var y;
    const h = /* @__PURE__ */ new Set();
    for (let m = c; m; m = (y = n.get(m)) == null ? void 0 : y.parentId) h.add(m);
    return h;
  }, a = e.nodes, r = (c) => c.parentId ? Math.min(i, 6) : i, p = /* @__PURE__ */ new Map(), s = (c, h, y) => {
    const m = r(y), g = { x: y.x, y: y.y, w: y.w + 2 * m, h: y.h + 2 * m }, v = y.w / 2 + m * 1.5, d = y.h / 2 + m * 1.5, l = { x: y.x - v, y: y.y - d }, f = { x: y.x + v, y: y.y - d }, k = { x: y.x - v, y: y.y + d }, b = { x: y.x + v, y: y.y + d }, _ = [];
    for (const R of [l, f, k, b])
      !Ht(c, R, g) && !Ht(R, h, g) && _.push([R]);
    for (const [R, L] of [
      [l, f],
      [f, l],
      [f, b],
      [b, f],
      [b, k],
      [k, b],
      [k, l],
      [l, k]
    ])
      !Ht(c, R, g) && !Ht(L, h, g) && _.push([R, L]);
    return _;
  };
  for (const c of e.edges) {
    if (t[c.id]) continue;
    const h = n.get(c.sourceId), y = n.get(c.targetId);
    if (!h || !y) continue;
    const m = /* @__PURE__ */ new Set([...o(h.id), ...o(y.id)]), g = [
      { x: h.x, y: h.y },
      { x: y.x, y: y.y }
    ];
    for (let v = 0; v < 12; v++) {
      let d = !1;
      e: for (let l = 0; l < g.length - 1; l++)
        for (const f of a) {
          if (m.has(f.id)) continue;
          const k = r(f), b = { x: f.x, y: f.y, w: f.w + 2 * k, h: f.h + 2 * k };
          if (!Ht(g[l], g[l + 1], b)) continue;
          const _ = s(g[l], g[l + 1], f);
          if (!_.length) continue;
          const R = (D) => a.some(
            (W) => W !== f && !m.has(W.id) && Math.abs(D.x - W.x) < W.w / 2 + r(W) / 2 && Math.abs(D.y - W.y) < W.h / 2 + r(W) / 2
          ), L = (D) => {
            let W = 0;
            const w = [g[l], ...D, g[l + 1]];
            for (let E = 0; E < w.length - 1; E++)
              W += Math.hypot(w[E + 1].x - w[E].x, w[E + 1].y - w[E].y);
            return W + (D.some(R) ? 1e4 : 0);
          };
          _.sort((D, W) => L(D) - L(W)), g.splice(l + 1, 0, ..._[0]), d = !0;
          break e;
        }
      if (!d) break;
    }
    g.length > 2 && p.set(
      c.id,
      g.slice(1, -1).map((v) => ({ x: Math.round(v.x), y: Math.round(v.y) }))
    );
  }
  return p;
}
function op(e, t) {
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
function ap(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let J = class extends Ge {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingIds = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._activeJourneyId = "", this._newJourneyName = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
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
      const { id: t, appId: i, beforeId: n, nestRowId: o } = e.detail, a = $e(t);
      if (!(a != null && a.itemId)) return;
      const r = this.menuEntryIn(a.appId, a.itemId);
      if (!r) return;
      const p = (s, c) => (s ?? []).some((h) => h.id === c || p(h.children, c));
      if (o) {
        const s = $e(o);
        if (!(s != null && s.itemId) || s.itemId === a.itemId || a.appId === s.appId && p(r.entry.children, s.itemId)) return;
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
        const s = $e(n);
        if (!(s != null && s.itemId) || s.itemId === a.itemId) return;
        const c = this.menuEntryIn(s.appId, s.itemId);
        if (!c || a.appId === s.appId && p(r.entry.children, s.itemId) || a.appId === s.appId && c.parentId === r.parentId && r.beforeId === s.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: s.appId,
          itemId: a.itemId,
          parentId: c.parentId ?? void 0,
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
      const p = JSON.parse(JSON.stringify(r.node)), { ops: s } = this.rebuildComponentOps(i, p, o ?? void 0, a);
      for (const c of s) this.command(c, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, p, r.parentId ?? void 0, r.beforeId).ops
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
    return hi(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("model") && this._pendingIds.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && !this._paletteOpenedForBlank && this.model.boundedContexts.length === 0 && this.model.externalSystems.length === 0 && (this._paletteOpen = !0, this._paletteOpenedForBlank = !0), e.has("layout")) {
      const t = hi(this.layout["context-map"]).detail;
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
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((p) => p.id)), o = new Set(i.nodes.map((p) => p.id)), a = t.filter((p) => {
      if (n.has(p)) return !1;
      const s = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(p);
      return !!s && o.has(s[1]) && o.has(s[2]);
    });
    if (!a.length) return;
    const r = { ...e.edges };
    a.forEach((p) => delete r[p]), this.writeViewLayout(this._view, { ...e, edges: r });
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = hi(this.layout[i]);
    this._detail = e, this._paletteOpen = !0, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = hi(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((h) => !h.parentId), p = ji(r), s = [...p.keys()].map((h) => ({
      kind: "move-node",
      view: "context-map",
      id: h,
      pos: a.nodes[h] ?? null
    })), c = { ...a.nodes };
    for (const [h, y] of p) {
      const m = r.find((v) => v.id === h), g = a.nodes[h] ?? { x: m.x, y: m.y };
      c[h] = {
        x: Math.round(g.x + (y.x - m.x)),
        y: Math.round(g.y + (y.y - m.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: c }), s.length && this.pushUndoEntry(s);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  /**
   * The active journey takes the stage: its legs paint as their own numbered
   * layer (1, 2, 3a, 3b… — letters where it bifurcates) and everything the
   * story does not touch fades back. Legs whose endpoints are hidden at this
   * level simply wait for their level.
   */
  withJourneyOverlay(e) {
    var s, c;
    const t = (this.model.journeys ?? []).find((h) => h.id === this._activeJourneyId);
    if (!t || this._view !== "context-map" && this._view !== "integrations") return e;
    const i = new Set(e.nodes.map((h) => h.id)), n = wo(t), o = /* @__PURE__ */ new Set(), a = [];
    for (const h of t.legs ?? [])
      !i.has(h.sourceId) || !i.has(h.targetId) || (o.add(h.sourceId), o.add(h.targetId), a.push({
        id: `journeyleg:${t.id}:${h.id}`,
        sourceId: h.sourceId,
        targetId: h.targetId,
        kind: "journey",
        color: "#d97706",
        arrow: !0,
        label: `${n.get(h.id) ?? ""}${h.label ? ` · ${h.label}` : ""}`,
        tooltip: `Tramo ${n.get(h.id)} de «${t.name}» — Supr lo quita`
      }));
    const r = new Set(o), p = new Map(e.nodes.map((h) => [h.id, h]));
    for (const h of o)
      for (let y = (s = p.get(h)) == null ? void 0 : s.parentId; y; y = (c = p.get(y)) == null ? void 0 : c.parentId) r.add(y);
    return {
      nodes: e.nodes.map((h) => r.has(h.id) ? h : { ...h, dim: !0 }),
      edges: [...e.edges.map((h) => ({ ...h, dim: !0 })), ...a]
    };
  }
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = np(e, t);
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
        t.points ? n[t.id] = t.points : delete n[t.id], this.writeViewLayout(t.view, { ...i, edges: n });
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
    let p = { x: i, y: n };
    const s = this.sceneFor(o), c = s.nodes.find((y) => y.id === t);
    if (c != null && c.parentId) {
      const y = s.nodes.find((m) => m.id === c.parentId);
      y && (p = { x: i - y.x, y: n - y.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: p } });
    const h = [{ kind: "move-node", view: o, id: t, pos: r }];
    if (o === "processes") {
      const y = this.stepReorderCommand(t);
      if (y) {
        const m = this.inverseOf(y);
        m && h.unshift(...m), this.command(y, !1);
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
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = this.model.externalSystems.find((d) => d.id === t);
    if (a) {
      const d = i ? this.model.externalSystems.find((D) => D.id === i) : null;
      if (i && !d) return;
      for (let D = d; D; ) {
        if (D.id === t) return;
        const W = D.parentExternalSystemId;
        D = W ? this.model.externalSystems.find((w) => w.id === W) ?? null : null;
      }
      const l = (d == null ? void 0 : d.id) ?? null;
      if ((a.parentExternalSystemId ?? null) === l) return;
      const f = this._view, k = this.viewLayout(f), b = this.sceneFor(f), _ = l ? b.nodes.find((D) => D.id === l) : void 0, R = _ ? { x: n - _.x, y: o - _.y } : { x: n, y: o }, L = l ? (this.model.externalSystemDependencies ?? []).filter(
        (D) => D.sourceId === t && D.targetId === l || D.sourceId === l && D.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: a.parentExternalSystemId ?? null },
        ...L.map((D) => ({
          kind: "add-external-dependency",
          sourceId: D.sourceId,
          targetId: D.targetId,
          ...D.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: f, id: t, pos: k.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: l }, !1), this.writeViewLayout(f, { ...k, nodes: { ...k.nodes, [t]: R } });
      return;
    }
    const r = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!r || i && !this.model.externalSystems.some((d) => d.id === i)) return;
    const p = r.publishedByExternalSystemId ?? "", s = i ?? "";
    if (s === p) return;
    const c = this._view, h = this.viewLayout(c), y = this.sceneFor(c), m = s ? y.nodes.find((d) => d.id === s) : void 0, g = m ? { x: n - m.x, y: o - m.y } : { x: n, y: o }, v = [
      { kind: "set-api-publisher", id: t, targetId: p },
      { kind: "move-node", view: c, id: t, pos: h.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: s }, !1), this.writeViewLayout(c, { ...h, nodes: { ...h.nodes, [t]: g } }), this.pushUndoEntry(v);
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
    const s = `proxy-${ae(a.name)}-${ae(r.name)}`;
    if ((this.model.proxyApis ?? []).some((v) => v.id === s)) return;
    const c = this._view, h = this.viewLayout(c), m = this.sceneFor(c).nodes.find((v) => v.id === i);
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
    m && (g.push({ kind: "move-node", view: c, id: s, pos: h.nodes[s] ?? null }), this.writeViewLayout(c, {
      ...h,
      nodes: { ...h.nodes, [s]: { x: n - m.x, y: o - m.y } }
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
    var p, s, c;
    const t = e.target, i = (p = t.files) == null ? void 0 : p[0];
    if (t.value = "", !i) return;
    const n = await i.text(), o = this.selectedApiId(), a = o ? null : ((s = this.model.externalSystems.find((h) => h.id === this._selectedId)) == null ? void 0 : s.id) ?? null, r = o || a ? null : ((c = this.model.boundedContexts.find((h) => h.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
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
    for (const { id: p, x: s, y: c } of t) {
      r.push({ kind: "move-node", view: i, id: p, pos: n.nodes[p] ?? null });
      let h = { x: s, y: c };
      const y = o.nodes.find((m) => m.id === p);
      if (y != null && y.parentId) {
        const m = o.nodes.find((g) => g.id === y.parentId);
        m && (h = { x: s - m.x, y: c - m.y });
      }
      a[p] = h;
    }
    if (this.writeViewLayout(i, { ...n, nodes: a }), i === "processes")
      for (const { id: p } of t) {
        const s = this.stepReorderCommand(p);
        if (s) {
          const c = this.inverseOf(s);
          c && r.unshift(...c), this.command(s, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var h;
    const { id: t, x: i, y: n, w: o, h: a } = e.detail, r = this._view, p = this.viewLayout(r), s = this.sceneFor(r).nodes.filter((y) => y.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((h = p.sizes) == null ? void 0 : h[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: p.nodes[t] ?? null },
      ...s.map((y) => ({ kind: "move-node", view: r, id: y.id, pos: p.nodes[y.id] ?? null }))
    ]);
    const c = { ...p.nodes, [t]: { x: i, y: n } };
    for (const y of s) c[y.id] = { x: y.x - i, y: y.y - n };
    this.writeViewLayout(r, {
      ...p,
      nodes: c,
      sizes: { ...p.sizes ?? {}, [t]: { w: o, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, o = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: o.edges[t] ?? null }
    ]);
    const a = { ...o.edges };
    a[t] = i, this.writeViewLayout(n, { ...o, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Hn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), o = [...t.steps].sort(
      (r, p) => (n.get(r.id) ?? 0) - (n.get(p.id) ?? 0)
    );
    if (o.every((r, p) => r.id === t.steps[p].id)) return null;
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
    return Jc(this.gestureHost(), e);
  }
  applyConnection(e, t, i, n, o) {
    wa(this.gestureHost(), this._view, e, t, i, n, o);
  }
  performDelete(e, t, i) {
    Qc(this.gestureHost(), this._view, e, t, i);
  }
  /** The thin surface the extracted gesture/undo vocabulary works against. */
  gestureHost() {
    return {
      model: this.model,
      detail: this._detail,
      activeJourneyId: this._activeJourneyId || void 0,
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
      id: `step-${ae(e)}`,
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
      id: `wfstep-${ae(e)}`,
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
  /** The active journey, legs numbered, for the surfaces that draw it themselves. */
  activeJourneyForSurface() {
    const e = (this.model.journeys ?? []).find((i) => i.id === this._activeJourneyId);
    if (!e) return null;
    const t = wo(e);
    return {
      name: e.name,
      legs: (e.legs ?? []).map((i) => ({
        sourceId: i.sourceId,
        targetId: i.targetId,
        num: t.get(i.id) ?? "",
        label: i.label
      }))
    };
  }
  createJourneyFromToolbar() {
    const e = this._newJourneyName.trim();
    if (!e) return;
    const t = `tr-${ae(e)}`;
    if ((this.model.journeys ?? []).some((i) => i.id === t)) {
      this.emit("modux-notice", { message: `Ya hay un trayecto «${e}»` });
      return;
    }
    this.command({ kind: "add-journey", id: t, name: e }), this._activeJourneyId = t, this._newJourneyName = "", this.emit("modux-notice", {
      message: `Trayecto «${e}» activo — traza líneas entre elementos para contar sus tramos`
    });
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
          @change=${(p) => this.toggleViewMember(o, p.target.checked)}
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
            const o = $e(i);
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
    const i = `view-${ae(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((g) => g.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((g) => t.has(g.id)), n = new Set(i.map((g) => g.id)), o = this.model.externalSystems.filter((g) => t.has(g.id)), a = new Set(o.map((g) => g.id)), r = (this.model.aggregates ?? []).filter(
      (g) => t.has(g.id) || n.has(g.boundedContextId)
    ), p = new Set(r.map((g) => g.id)), s = (this.model.uiApps ?? []).filter((g) => t.has(g.id)), c = /* @__PURE__ */ new Set(), h = (g) => {
      for (const v of g ?? [])
        v.pageId && c.add(v.pageId), h(v.children);
    };
    s.forEach((g) => h(g.menuItems));
    const y = (this.model.pages ?? []).filter(
      (g) => t.has(g.id) || c.has(g.id)
    ), m = new Set(s.map((g) => g.id));
    return {
      ...this.model,
      uiApps: s,
      pages: y,
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
      entities: (this.model.entities ?? []).filter((g) => p.has(g.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (g) => p.has(g.sourceAggregateId) && p.has(g.targetAggregateId)
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
    const t = e.detail.kind === "process-step" ? ap(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : op(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const r of a ?? [])
        r.id && t.add(r.id), i(r.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const n = `mi-${ae(e)}`;
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
      const p = a ?? [];
      for (let c = 0; c < p.length; c++)
        p[c].id === t && (n = { node: p[c], parentId: r, beforeId: ((s = p[c + 1]) == null ? void 0 : s.id) ?? null }), o(p[c].children, p[c].id);
    };
    return o(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, o = !1, a) {
    const r = a ?? this.allComponentIds(), p = (y) => {
      if (!o) return y.id;
      const m = `cmp-${ae(y.kind)}`;
      let g = m;
      for (let v = 2; r.has(g) || r.has(`${g}-tab-1`); v++) g = `${m}-${v}`;
      return r.add(g), g;
    }, s = [], c = (y, m) => {
      const g = p(y);
      s.push({ kind: "add-page-component", pageId: e, componentId: g, componentKind: y.kind, parentComponentId: m }), y.kind === "tabLayout" && (s.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-1` }), s.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-2` })), s.push({
        kind: "set-page-component",
        pageId: e,
        componentId: g,
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
      for (const v of y.children ?? []) c(v, g);
      return g;
    }, h = c(t, i);
    return n && s.push({
      kind: "move-page-component",
      pageId: e,
      componentId: h,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: s, rootId: h };
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
    const n = `cmp-${ae(e)}`;
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
      const p = a ?? [];
      for (let c = 0; c < p.length; c++)
        p[c].id === t && (n = { entry: p[c], parentId: r, beforeId: ((s = p[c + 1]) == null ? void 0 : s.id) ?? null }), o(p[c].children, p[c].id ?? null);
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
      const p = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!p) return;
      t = this._selectedCmp.pageId, le.LEAF_KINDS.has(p.node.kind) ? (i = p.parentId ?? void 0, n = p.beforeId) : i = p.node.kind === "tabLayout" && e.kind !== "tab" ? (r = (p.node.children ?? [])[0]) == null ? void 0 : r.id : p.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((p) => p.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: a } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const p of o) this.command(p, !1);
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
    var p;
    const t = (p = e.dataTransfer) == null ? void 0 : p.getData("application/x-modux-palette");
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
      const a = o === 1 ? e : `${e} ${o}`, r = `${t}${ae(a)}`;
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
    ].includes(e)) return i.find((r) => this.model.boundedContexts.some((p) => p.id === r)) ?? null;
    if (e === "invariant") {
      const r = i.find((s) => (this.model.aggregates ?? []).some((c) => c.id === s));
      if (r) return r;
      const p = i.find((s) => this.model.boundedContexts.some((c) => c.id === s));
      return ((o = (this.model.aggregates ?? []).find((s) => s.boundedContextId === p)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const r = i.find((s) => (this.model.aggregates ?? []).some((c) => c.id === s));
      if (r) return r;
      const p = i.find((s) => this.model.boundedContexts.some((c) => c.id === s));
      return ((a = (this.model.aggregates ?? []).find((s) => s.boundedContextId === p)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((r) => this.model.externalSystems.some((p) => p.id === r)) ?? null;
    if (e === "model-field")
      return i.find((r) => (this.model.models ?? []).some((p) => p.id === r)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return i.find((r) => (this.model.buttonGroups ?? []).some((p) => p.id === r)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (r) => this.model.boundedContexts.some((p) => (p.useCases ?? []).some((s) => s.id === r))
      ) ?? null;
    if (e === "api-operation") {
      for (const r of i) {
        if ((this.model.apis ?? []).some((c) => c.id === r)) return r;
        const p = /^apiimpl:(.+)@(.+)$/.exec(r);
        if (p && (this.model.apis ?? []).some((c) => c.id === p[1])) return p[1];
        const s = (this.model.proxyApis ?? []).find((c) => c.id === r);
        if (s != null && s.targetApiId) return s.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((r) => this.model.externalSystems.some((p) => p.id === r)) ?? i.find((r) => this.model.boundedContexts.some((p) => p.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var g, v;
    const o = Lo.find((d) => d.type === e);
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
      const d = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, l = d ? d[1] : i && (this.model.pages ?? []).some((b) => b.id === i) ? i : null;
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: f, name: k } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: f, name: k }, !1), d ? (this.command({ kind: "set-page-component-custom-code", pageId: l, componentId: d[2], targetId: f }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: l, targetId: f }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const d = e.slice(4), l = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, f = l ? l[1] : i && (this.model.pages ?? []).some((L) => L.id === i) ? i : null;
      if (!f) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let k = l ? l[2] : void 0, b = null;
      if (d === "tab") {
        let L = null, D = k ? this.componentIn(f, k) : null;
        for (; D; ) {
          if (D.node.kind === "tabLayout") {
            L = D.node.id;
            break;
          }
          D = D.parentId ? this.componentIn(f, D.parentId) : null;
        }
        if (!L) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const W = this.componentIn(f, L).node, w = this.newComponentId("tab"), E = `Pestaña ${(W.children ?? []).filter((H) => H.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: f, componentId: w, componentKind: "tab", parentComponentId: L }, !1), this.command({ kind: "set-page-component", pageId: f, componentId: w, title: E }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: f, componentId: w }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const L = this.componentIn(f, n.componentId);
        L && L.node.kind === "tab" ? k = L.node.id : L && (k = L.parentId ?? void 0, b = n.pos === "before" ? n.componentId : L.beforeId);
      } else if (k) {
        const L = ((g = this.componentIn(f, k)) == null ? void 0 : g.node) ?? null;
        (L == null ? void 0 : L.kind) === "tabLayout" && (L.children ?? [])[0] && (k = (L.children ?? [])[0].id);
      }
      const _ = this.newComponentId(d), R = {
        kind: "add-page-component",
        pageId: f,
        componentId: _,
        componentKind: d,
        parentComponentId: k
      };
      if (!b) {
        this.command(R);
        return;
      }
      this.command(R, !1), this.command(
        { kind: "move-page-component", pageId: f, componentId: _, parentComponentId: k ?? null, beforeComponentId: b },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: f, componentId: _ }]);
      return;
    }
    const a = this._view, r = this.sceneFor(a), p = (d, l) => {
      const f = this.viewLayout(a), k = l ? r.nodes.find((_) => _.id === l) : void 0, b = k ? { x: Math.round(t.x - k.x), y: Math.round(t.y - k.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...f, nodes: { ...f.nodes, [d]: b } }), { kind: "move-node", view: a, id: d, pos: null };
    }, s = (d, l, f) => {
      const k = this.inverseOf(d) ?? [];
      this.command(d, !1);
      const b = p(l, f);
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
      }, { id: l, name: f } = this.uniquePaletteName(o.label, d[e] ?? ""), k = e === "boundedContext" ? { kind: "add-boundedContext", id: l, name: f, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: l, name: f } : e === "external-system" ? { kind: "add-external-system", id: l, name: f } : e === "ai-agent" ? { kind: "add-ai-agent", id: l, name: f } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: l, name: f, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: l, name: f } : e === "rag" ? { kind: "add-rag", id: l, name: f } : e === "api" ? { kind: "add-api", id: l, name: f } : e === "proxy-api" ? { kind: "add-proxy-api", id: l, name: f } : e === "ui-app" ? { kind: "create-ui-app", id: l, name: f } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: l, name: f, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: l, name: f, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: l, name: f, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: l, name: f } : e === "transformation" ? { kind: "add-transformation", id: l, name: f } : e === "custom-code" ? { kind: "add-custom-code", id: l, name: f } : e === "button-group" ? { kind: "add-button-group", id: l, name: f } : e === "identity-provider" ? { kind: "add-identity-provider", id: l, name: f } : e === "service" ? { kind: "add-service", id: l, name: f } : {
        kind: "add-workflow",
        id: l,
        name: f,
        completionEventName: `${f.replace(/\s+/g, "")}Completado`
      };
      if (k.kind === "create-ui-app") {
        const _ = this.dropChain(i).find((R) => this.model.boundedContexts.some((L) => L.id === R));
        if (_) {
          s({ ...k, boundedContextId: _ }, l, _);
          return;
        }
      }
      if (k.kind === "add-external-system") {
        const _ = this.dropChain(i).find((R) => this.model.externalSystems.some((L) => L.id === R));
        if (_) {
          s({ ...k, parentId: _ }, l, _), this.emit("modux-notice", { message: "Subsistema creado dentro del sistema" });
          return;
        }
      }
      s(k, l);
      return;
    }
    if (e === "ui-wizard-step") {
      const l = this.dropChain(i).map((_) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(_)) == null ? void 0 : R[1]) ?? _;
      }).find((_) => (this.model.pages ?? []).some((R) => R.id === _ && R.type === "WIZARD"));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const f = ((v = (this.model.pages ?? []).find((_) => _.id === l)) == null ? void 0 : v.wizardSteps) ?? [], k = new Set(f.map((_) => _.id ?? _.pageId));
      let b = f.length + 1;
      for (; k.has(`wzs-${b}`); ) b++;
      this.command({ kind: "add-page-wizard-step", pageId: l, itemId: `wzs-${b}`, label: `Paso ${b}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const d = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", l = d === "CRUD" ? "CRUD" : d === "WIZARD" ? "Wizard" : "Página", { id: f, name: k } = this.uniquePaletteName(l, "page-"), b = this.dropChain(i), _ = b.find((L) => (this.model.uiApps ?? []).some((D) => D.id === L)), R = b.map((L) => {
        var D;
        return ((D = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : D[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((D) => D.id === L && D.type === "WIZARD"));
      if (R) {
        const L = r.nodes.find((W) => W.id === R);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40), this.command({ kind: "create-ui-page", id: f, name: k, pageType: d }, !1), this.command({ kind: "add-page-wizard-step", pageId: R, targetId: f }, !1);
        const D = p(f);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: f }, D]), this.emit("modux-notice", { message: `${k} creada como paso del wizard` });
        return;
      }
      if (_) {
        const L = r.nodes.find((D) => D.id === _);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40);
      }
      s(
        _ ? { kind: "create-ui-page", id: f, name: k, pageType: d, appId: _, menuLabel: k } : { kind: "create-ui-page", id: f, name: k, pageType: d },
        f
      );
      return;
    }
    if (e === "menu-item") {
      const d = this.dropChain(i), l = d.find((R) => (this.model.uiApps ?? []).some((L) => L.id === R));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const f = /* @__PURE__ */ new Set(), k = (R) => {
        for (const L of R ?? [])
          f.add(L.label), k(L.children);
      };
      (this.model.uiApps ?? []).forEach((R) => k(R.menuItems));
      let b = "Entrada";
      for (let R = 2; f.has(b); R++) b = `Entrada ${R}`;
      const _ = d.map((R) => $e(R)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: l,
        label: b,
        itemId: this.newMenuItemId(b),
        parentId: _ == null ? void 0 : _.itemId,
        parentLabel: _ != null && _.itemId || _ == null ? void 0 : _.label
      });
      return;
    }
    if (e === "etl-transform") {
      const l = this.dropChain(i).map((b) => (this.model.etlFlows ?? []).find((_) => _.id === b)).find(Boolean);
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const f = new Set((l.steps ?? []).map((b) => b.id));
      let k = (l.steps ?? []).length + 1;
      for (; f.has(`ets-${k}`); ) k++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: l.id,
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
      const { id: d, name: l } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      s({
        kind: "add-workflow-gateway",
        id: d,
        name: l,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, d), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const l = this.model.workflows ?? [], f = this.dropChain(i), k = f.map((D) => l.find((W) => W.id === D)).find(Boolean), b = f.map((D) => {
        const W = l.find((w) => (w.steps ?? []).some((E) => E.id === D));
        return W ? { owner: W, stepId: D } : null;
      }).find(Boolean);
      let _ = k ?? (b == null ? void 0 : b.owner);
      if (!_ && l.length === 1 && (_ = l[0]), !_) {
        if (!l.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: R, name: L } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      b && (t = { x: t.x + 190, y: t.y }), s(
        {
          kind: "add-workflow-step",
          workflowId: _.id,
          id: R,
          name: L,
          ...b ? { dependsOnStepIds: [b.stepId], afterStepId: b.stepId } : {}
        },
        R
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${_.name} — se ve en la vista Workflows`
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
      const { id: l, name: f } = this.uniquePaletteName("API", "api-"), k = { kind: "add-api", id: l, name: f }, b = this.inverseOf(k) ?? [];
      this.command(k, !1), this.model.externalSystems.some((D) => D.id === d) ? this.command({ kind: "set-api-publisher", id: l, targetId: d }, !1) : this.command({ kind: "add-api-implementation", apiId: l, boundedContextId: d }, !1);
      const _ = this.viewLayout(this._view), R = this.sceneFor(this._view).nodes.find((D) => D.id === d), L = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ..._, nodes: { ..._.nodes, [l]: L } }), this.pushUndoEntry([...b, { kind: "move-node", view: this._view, id: l, pos: null }]);
      return;
    }
    const c = this.dropContainerFor(e, i);
    if (!c) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const h = {
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
    }, { id: y, name: m } = this.uniquePaletteName(o.label, h[e] ?? "");
    if (e === "aggregate")
      s({ kind: "add-aggregate", id: y, name: m, boundedContextId: c }, y, c);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: c, id: y, name: m }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const d = (this.model.buttonGroups ?? []).find((k) => k.id === c), l = new Set(((d == null ? void 0 : d.buttons) ?? []).map((k) => k.id));
      let f = ((d == null ? void 0 : d.buttons) ?? []).length + 1;
      for (; l.has(`btn-${f}`); ) f++;
      this.command({ kind: "add-group-button", id: c, itemId: `btn-${f}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: c, fieldId: y, name: m });
    else if (e === "module")
      s({ kind: "add-module", id: y, name: m, boundedContextId: c }, y, c), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      s(
        { kind: "add-use-case", id: y, name: m, boundedContextId: c, ...e === "policy" ? { policy: !0 } : {} },
        y,
        c
      );
    else if (e === "domain-event")
      s({ kind: "add-domain-event", id: y, name: m, boundedContextId: c }, y, c);
    else if (e === "application-event")
      s({ kind: "add-application-event", id: y, name: m, boundedContextId: c }, y, c);
    else if (e === "domain-service")
      s({ kind: "add-domain-service", id: y, name: m, boundedContextId: c }, y, c);
    else if (e === "query-service")
      s({ kind: "add-query-service", id: y, name: m, boundedContextId: c }, y, c);
    else if (e === "scheduled-trigger")
      s({ kind: "add-scheduled-trigger", id: y, name: m, boundedContextId: c }, y, c), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      s({ kind: "add-notification", id: y, name: m, boundedContextId: c }, y, c), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      s({ kind: "add-document", id: y, name: m, boundedContextId: c }, y, c), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      s({ kind: "add-etl-flow", id: y, name: m, boundedContextId: c }, y, c), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const d = (this.model.aggregates ?? []).find((l) => l.id === c);
      s({ kind: "add-read-model", id: y, name: m, aggregateId: c }, y, (d == null ? void 0 : d.boundedContextId) ?? c);
    } else if (e === "api-operation") {
      const d = (this.model.apis ?? []).find((_) => _.id === c), l = new Set(((d == null ? void 0 : d.operations) ?? []).map((_) => _.id));
      let f = m, k = `apiop-${c.replace(/^api-/, "")}-${ae(f)}`;
      for (let _ = 2; l.has(k); _++)
        f = `${o.label} ${_}`, k = `apiop-${c.replace(/^api-/, "")}-${ae(f)}`;
      s({ kind: "add-api-operation", apiId: c, id: k, name: f }, k, c), r.nodes.some(
        (_) => _.parentId === c && (_.kind === "api-operation" || _.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(d == null ? void 0 : d.name) ?? c} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const d = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === c), l = new Set((d == null ? void 0 : d.stepIds) ?? []);
      let f = m, k = `step-${ae(f)}`;
      for (let b = 2; l.has(k); b++)
        f = `${o.label} ${b}`, k = `step-${ae(f)}`;
      s({ kind: "add-use-case-step", useCaseId: c, id: k, name: f }, k, c), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(d == null ? void 0 : d.name) ?? c} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? s({ kind: "add-external-use-case", id: y, name: m, boundedContextId: c }, y, c) : e === "external-table" ? s({ kind: "add-external-table", id: y, name: m, boundedContextId: c }, y, c) : e === "mcp-server" && s({ kind: "add-mcp-server", id: y, name: m, boundedContextId: c }, y, c);
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
        const d = (this.model.pages ?? []).find((f) => f.id === n[1]), l = ((d == null ? void 0 : d.buttons) ?? []).find((f) => f.useCaseId === n[2]);
        if (!l) return;
        if (((d == null ? void 0 : d.buttons) ?? []).some((f) => f.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: l.label, type: l.bar },
          !1
        ), l.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: l.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: l.label, type: l.bar },
          ...l.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: l.mappingId }] : []
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
    const p = a ? ((m = this.componentIn(r, a[2])) == null ? void 0 : m.node) ?? null : null, s = this.model.boundedContexts.flatMap((g) => g.useCases ?? []).find((g) => g.id === e);
    if (s) {
      (p == null ? void 0 : p.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: r, componentId: p.id, useCaseId: e, label: p.label ?? s.name }), this.emit("modux-notice", { message: `El botón lanza ${s.name}` })) : (this.command({ kind: "add-page-button", pageId: r, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${s.name} añadido a la página` }));
      return;
    }
    const c = (this.model.models ?? []).find((g) => g.id === e);
    if (c) {
      (p == null ? void 0 : p.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: r, componentId: p.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${c.name}` })) : (this.command({ kind: "set-page-model", pageId: r, modelId: e }), this.emit("modux-notice", { message: `${c.name} es el viewmodel de la página` }));
      return;
    }
    const h = (this.model.modelMappings ?? []).find((g) => g.id === e);
    if (h && (p == null ? void 0 : p.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: r, componentId: p.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${h.name}` });
      return;
    }
    const y = this.model.boundedContexts.flatMap((g) => (g.queryServices ?? []).flatMap((v) => (v.operations ?? []).map((d) => ({ op: d, qs: v })))).find(({ op: g }) => g.id === e);
    if (y) {
      (p == null ? void 0 : p.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: r,
        componentId: p.id,
        queryOperationId: y.op.id,
        queryServiceId: y.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: r, queryServiceId: y.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${y.op.name}` });
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
    const r = this._view, p = this.sceneFor(r), s = p.nodes.find((m) => m.id === e);
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
    const c = this.viewLayout(r), h = s.parentId ? p.nodes.find((m) => m.id === s.parentId) : void 0, y = h ? { x: Math.round(t.x - h.x), y: Math.round(t.y - h.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: r, id: e, pos: c.nodes[e] ?? null }]), this.writeViewLayout(r, { ...c, nodes: { ...c.nodes, [e]: y } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Lo.filter(
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
                ${Zc.map((n) => {
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
                                ${At[a.symbol]}
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
                            ${At[n.symbol]}
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
    var t, i, n, o, a, r, p;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const s = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!s) return;
        this.command({ kind: "add-aggregate", id: `agg-${ae(e)}`, name: e, boundedContextId: s });
      } else if (this._view === "flows") {
        const s = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), h = this._newTriggerEvent.trim();
        if (!s || !c || !h) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ae(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: s,
          triggerEvent: h,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const s = this._newBoundedContextId || ((a = this.model.boundedContexts[0]) == null ? void 0 : a.id);
        if (!s) return;
        this.command({
          kind: "add-process",
          id: `proc-${ae(e)}`,
          name: e,
          boundedContextId: s,
          triggerAggregateId: this._newTriggerAggId || ((p = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : p.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? ns(i, t.nodes) : e === "flows" ? us(i, t.nodes) : e === "processes" ? Hn(i, t.nodes) : e === "workflows" ? kc(i, t.nodes) : e === "ui" ? Ac(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? Oc(i, t.nodes) : e === "mappings" ? Mc(i, t.nodes) : e === "eventstorming" ? hc(i, t.nodes) : Xa(
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
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), o = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, r = await Nc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), p = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((c) => ({
        kind: "move-node",
        view: e,
        id: c.id,
        pos: p.nodes[c.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(p.edges).map((c) => ({
        kind: "set-edge-points",
        view: e,
        id: c,
        points: p.edges[c]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: p.sizes }), await this.updateComplete, (s = this.renderRoot.querySelector("modux-canvas")) == null || s.fit();
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
    const e = this.withJourneyOverlay(this.sceneFor(this._view));
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
        <select
          title="Pintar un trayecto sobre el mapa (las líneas nuevas añaden tramos)"
          @change=${(t) => this._activeJourneyId = t.target.value}
        >
          <option value="" ?selected=${this._activeJourneyId === ""}>Trayecto: ninguno</option>
          ${(this.model.journeys ?? []).map(
      (t) => A`<option value=${t.id} ?selected=${t.id === this._activeJourneyId}>
                Trayecto: ${t.name}
              </option>`
    )}
        </select>
        <input
          class="new-name"
          placeholder="Nuevo trayecto…"
          title="Crea un trayecto y actívalo: cada línea que traces será un tramo"
          .value=${this._newJourneyName}
          @input=${(t) => this._newJourneyName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createJourneyFromToolbar()}
        />
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
            .journey=${this.activeJourneyForSurface()}
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
      const { sourceId: i, targetId: n, x: o, y: a } = t.detail, r = (p) => this.model.boundedContexts.some((s) => s.id === p);
      if (this._view === "context-map" && !this._activeJourneyId && r(i) && r(n)) {
        const p = this.model.relations.find(
          (s) => s.sourceId === i && s.targetId === n && s.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: n,
          mode: p ? "edit" : "create",
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
      const o = `view-${ae(t.detail.name)}`;
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
        ${this._view === "context-map" ? A`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
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
        ${ip.map(
      (n) => A`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${_n[n].abbr}</span>
              <span class="name">${_n[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
J.styles = xt`
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
Q([
  re({ attribute: !1 })
], J.prototype, "model", 2);
Q([
  re({ attribute: !1 })
], J.prototype, "layout", 2);
Q([
  re({ attribute: !1 })
], J.prototype, "diff", 2);
Q([
  U()
], J.prototype, "_view", 2);
Q([
  U()
], J.prototype, "_detail", 2);
Q([
  U()
], J.prototype, "_relationType", 2);
Q([
  U()
], J.prototype, "_relationPicker", 2);
Q([
  U()
], J.prototype, "_extDepPicker", 2);
Q([
  U()
], J.prototype, "_selectedId", 2);
Q([
  U()
], J.prototype, "_paletteOpen", 2);
Q([
  U()
], J.prototype, "_yugo", 2);
Q([
  re({ attribute: !1 })
], J.prototype, "repositories", 2);
Q([
  re({ type: Boolean, reflect: !0 })
], J.prototype, "dark", 2);
Q([
  U()
], J.prototype, "_repoPicker", 2);
Q([
  U()
], J.prototype, "_wfStepPicker", 2);
Q([
  U()
], J.prototype, "_branchCondEditor", 2);
Q([
  U()
], J.prototype, "_paletteFilter", 2);
Q([
  U()
], J.prototype, "_paletteTab", 2);
Q([
  U()
], J.prototype, "_selectedCmp", 2);
Q([
  U()
], J.prototype, "_fullscreen", 2);
Q([
  U()
], J.prototype, "_tilt", 2);
Q([
  U()
], J.prototype, "_helpOpen", 2);
Q([
  U()
], J.prototype, "_newName", 2);
Q([
  U()
], J.prototype, "_newBoundedContextId", 2);
Q([
  U()
], J.prototype, "_newArchetype", 2);
Q([
  U()
], J.prototype, "_newTriggerAggId", 2);
Q([
  U()
], J.prototype, "_newTriggerEvent", 2);
Q([
  U()
], J.prototype, "_newTargetId", 2);
Q([
  U()
], J.prototype, "_undoStack", 2);
Q([
  U()
], J.prototype, "_redoStack", 2);
Q([
  U()
], J.prototype, "_newStepName", 2);
Q([
  U()
], J.prototype, "_newStepType", 2);
Q([
  U()
], J.prototype, "_newStepRole", 2);
Q([
  U()
], J.prototype, "_newStepDeadline", 2);
Q([
  U()
], J.prototype, "_editStepRole", 2);
Q([
  U()
], J.prototype, "_editStepDeadline", 2);
Q([
  U()
], J.prototype, "_editStepComp", 2);
Q([
  U()
], J.prototype, "_newStepUseCase", 2);
Q([
  U()
], J.prototype, "_newStepEmits", 2);
Q([
  U()
], J.prototype, "_editStepUseCase", 2);
Q([
  U()
], J.prototype, "_editStepEmits", 2);
Q([
  U()
], J.prototype, "_editStepAwaits", 2);
Q([
  U()
], J.prototype, "_multi", 2);
Q([
  U()
], J.prototype, "_newViewName", 2);
Q([
  U()
], J.prototype, "_activeViewId", 2);
Q([
  U()
], J.prototype, "_activeJourneyId", 2);
Q([
  U()
], J.prototype, "_newJourneyName", 2);
Q([
  U()
], J.prototype, "_newRagSourceType", 2);
Q([
  U()
], J.prototype, "_newRagSourceUri", 2);
Q([
  U()
], J.prototype, "_addMemberKey", 2);
Q([
  U()
], J.prototype, "_treeOpen", 2);
Q([
  U()
], J.prototype, "_deletePicker", 2);
J = Q([
  vt("modux-editor")
], J);
var sp = Object.defineProperty, rp = Object.getOwnPropertyDescriptor, ke = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? rp(t, i) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (n ? r(t, i, o) : r(o)) || o);
  return n && o && sp(t, i, o), o;
};
let ge = class extends Ge {
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
    ], t = (n) => ge.TYPE_LABELS[n] ?? n;
    return A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: o, mark: a, cls: r }) => {
      const p = this._diff.changes.filter((s) => s.kind === n);
      return p.length ? A`
            <div class="diff-group">${o} (${p.length})</div>
            ${p.map(
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
      var p;
      try {
        const s = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!s.ok) {
          let c = `El servidor rechazó la operación (${s.status})`;
          try {
            const h = await s.json();
            h != null && h.message && (c = h.message);
          } catch {
          }
          this.showToast(c);
          return;
        }
        this._workspace = await s.json(), await this.reload(), await this.refreshDiff(), (p = this.renderRoot.querySelector("modux-editor")) == null || p.clearHistory();
      } catch (s) {
        this.showToast(String(s));
      }
    });
    const n = (a = this._workspace) == null ? void 0 : a.current;
    if (n && n !== i) {
      const p = ((r = this._workspace.solutions.find((s) => s.branch === n)) == null ? void 0 : r.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${p}`
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
          let h = `El servidor rechazó el contrato (${r.status})`;
          try {
            const y = await r.json();
            y != null && y.message && (h = y.message);
          } catch {
          }
          this.showToast(h);
          return;
        }
        const { apiId: p } = await r.json(), s = o ? { kind: "set-api-publisher", id: p, targetId: o } : a ? { kind: "add-api-implementation", apiId: p, boundedContextId: a } : null;
        s && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(s)
        });
        const c = await fetch(`${this.base}/model`);
        c.ok && (this._model = await c.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${p}`, "info");
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
ge.styles = xt`
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
ge.TYPE_LABELS = {
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
ke([
  re()
], ge.prototype, "base", 2);
ke([
  U()
], ge.prototype, "_model", 2);
ke([
  U()
], ge.prototype, "_layout", 2);
ke([
  U()
], ge.prototype, "_error", 2);
ke([
  U()
], ge.prototype, "_saving", 2);
ke([
  U()
], ge.prototype, "_toast", 2);
ke([
  U()
], ge.prototype, "_workspace", 2);
ke([
  U()
], ge.prototype, "_creatingSolution", 2);
ke([
  U()
], ge.prototype, "_newSolutionName", 2);
ke([
  U()
], ge.prototype, "_taggingVersion", 2);
ke([
  U()
], ge.prototype, "_newTagName", 2);
ke([
  U()
], ge.prototype, "_tagsOpen", 2);
ke([
  U()
], ge.prototype, "_tags", 2);
ke([
  U()
], ge.prototype, "_repositories", 2);
ke([
  U()
], ge.prototype, "_diff", 2);
ke([
  U()
], ge.prototype, "_diffListOpen", 2);
ke([
  U()
], ge.prototype, "_mergeFlow", 2);
ke([
  U()
], ge.prototype, "_dark", 2);
ge = ke([
  vt("modux-editor-connected")
], ge);
export {
  dp as CONTAINER_HEADER,
  lp as CONTAINER_INSET,
  Ie as ModuxCanvas,
  J as ModuxEditor,
  ge as ModuxEditorConnected,
  ns as aggregatesScene,
  mt as apiImplNodeId,
  ut as apiOpOccurrenceId,
  Ni as containerFit,
  Ba as containerMinSize,
  Xa as contextMapScene,
  ja as flowCoherence,
  us as flowsScene,
  hi as normalizeViewLayout,
  Hn as processesScene,
  Ha as relationEdgeId,
  ji as resolveOverlaps
};
