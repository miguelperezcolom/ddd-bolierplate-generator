const lp = 34, cp = 10;
function Gn(e, t = 24) {
  const n = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let r = 0; r < e.length; r++)
      for (let c = r + 1; c < e.length; c++) {
        const s = e[r], p = e[c], y = n.get(s.id), h = n.get(p.id), m = h.x - y.x, f = h.y - y.y, b = (s.w + p.w) / 2 + t - Math.abs(m), d = (s.h + p.h) / 2 + t - Math.abs(f);
        if (!(b <= 0 || d <= 0))
          if (a = !0, b < d) {
            const l = (m >= 0 ? 1 : -1) * b / 2;
            y.x -= l, h.x += l;
          } else {
            const l = (f >= 0 ? 1 : -1) * d / 2;
            y.y -= l, h.y += l;
          }
      }
    if (!a) break;
  }
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = n.get(o.id);
    (Math.abs(a.x - o.x) > 0.5 || Math.abs(a.y - o.y) > 0.5) && i.set(o.id, a);
  }
  return i;
}
function Fa(e, t = { w: 160, h: 90 }) {
  let n = t.w, i = t.h;
  for (const o of e)
    n = Math.max(n, 2 * (Math.abs(o.dx) + o.w / 2 + 10)), i = Math.max(
      i,
      2 * (34 + o.h / 2 - o.dy),
      // child's top edge below the header band
      2 * (10 + o.h / 2 + o.dy)
      // child's bottom edge above the inset
    );
  return { w: n, h: i };
}
function Rn(e, t, n) {
  let i = t.w / 2, o = t.w / 2, a = t.h / 2, r = t.h / 2;
  for (const c of n)
    i = Math.max(i, -c.dx + c.w / 2 + 10), o = Math.max(o, c.dx + c.w / 2 + 10), a = Math.max(a, -c.dy + c.h / 2 + 34), r = Math.max(r, c.dy + c.h / 2 + 10);
  return {
    x: e.x + (o - i) / 2,
    y: e.y + (r - a) / 2,
    w: i + o,
    h: a + r
  };
}
function gn(e) {
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
const Wa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ui = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, ja = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, We = 168, je = 56;
function mt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ut(e, t) {
  return `apiop:${e}@${t}`;
}
const qi = { compact: 0, coarse: 1, full: 2 };
function Bi(e, t, n) {
  const i = t === "full" ? "compact" : t === "compact" || n ? "full" : "compact", o = e ? i : t;
  return { form: o, collapsed: qi[e ? t : i] > qi[o] };
}
function zo(e, t) {
  const n = new Map((e.apis ?? []).map((i) => [i.id, i]));
  return (e.apiImplementations ?? []).filter((i) => i.boundedContextId === t && n.has(i.apiId)).map((i) => ({
    id: mt(i.apiId, i.boundedContextId),
    name: n.get(i.apiId).name,
    kind: "api-impl"
  }));
}
const Uo = 34, qo = 14, Va = 14, Ce = 108, xe = 32, $i = 12, Ln = 10, at = 2, Bo = at * Ce + (at - 1) * $i + 2 * qo;
function Ha(e, t) {
  return `rel:${e}->${t}`;
}
function Ga(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (i) => i.sourceId === t.sourceId && i.targetId === t.targetId && i.declared
  ) ? "OK" : e.relations.some(
    (i) => i.sourceId === t.targetId && i.targetId === t.sourceId && i.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function dt(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const Dn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Zt = {
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
function zn(e) {
  const t = Math.max(1, Math.ceil(e / at)), n = t * xe + (t - 1) * Ln;
  return { w: Bo, h: Uo + n + Va };
}
function Mt(e, t) {
  const n = e % at, i = Math.floor(e / at);
  return {
    x: -t.w / 2 + qo + n * (Ce + $i) + Ce / 2,
    y: -t.h / 2 + Uo + i * (xe + Ln) + xe / 2
  };
}
function Fo(e, t) {
  return [
    ...(e.aggregates ?? []).filter((n) => n.boundedContextId === t.id).map((n) => ({
      id: n.id,
      // The invariants ARE the aggregate's reason to exist: they show on the chip.
      name: (n.invariants ?? []).length ? `${n.name} ⚖${n.invariants.length}` : n.name,
      kind: "aggregate"
    })),
    ...(t.useCases ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "use-case", policy: n.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "query-service" })
    ),
    ...(t.scheduledTriggers ?? []).map(
      (n) => ({ id: n.id, name: n.name, kind: "scheduled-trigger" })
    ),
    ...(e.etlFlows ?? []).filter((n) => n.ownerBoundedContextId === t.id).map((n) => ({ id: n.id, name: n.name, kind: "etl-flow" })),
    ...(e.notifications ?? []).filter((n) => n.ownerBoundedContextId === t.id).map((n) => ({ id: n.id, name: n.name, kind: "notification" })),
    ...(e.documents ?? []).filter((n) => n.ownerBoundedContextId === t.id).map((n) => ({ id: n.id, name: n.name, kind: "document" })),
    ...(e.uiApps ?? []).filter((n) => (t.uiAppIds ?? []).includes(n.id)).map((n) => ({ id: n.id, name: n.name, kind: "ui-app" }))
  ];
}
function Ka(e, t, n, i, o, a, r = !1) {
  const c = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...zo(e, t.id),
    ...Fo(e, t)
  ];
  if (!c.length)
    return [{ ...i, x: n.x, y: n.y, w: We, h: je }];
  if (r) {
    const s = new Map((e.apis ?? []).map((y) => [y.id, y])), p = (e.apiImplementations ?? []).filter((y) => y.boundedContextId === t.id && s.has(y.apiId)).map((y) => {
      const h = s.get(y.apiId);
      return {
        id: mt(y.apiId, y.boundedContextId),
        name: h.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${h.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (h.operations ?? []).map((m) => ({
          id: ut(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (p.length > 0) {
      const y = c.filter((h) => h.kind !== "api-impl");
      return Wo(n, i, p, y, o, a);
    }
  }
  return Gt(n, i, c, o, a);
}
function Wo(e, t, n, i, o, a, r = /* @__PURE__ */ new Set()) {
  const c = a[t.id] ?? zn(n.length + i.length), s = n.map((f, b) => {
    const d = o[f.id] ?? Mt(b, c), l = r.has(f.id) ? [] : f.ops, g = a[f.id] ?? zn(l.length), k = l.map((_, R) => o[_.id] ?? Mt(R, g)), x = Rn(
      { x: d.x, y: d.y },
      g,
      k.map((_) => ({ dx: _.x, dy: _.y, w: Ce, h: xe }))
    );
    return { a: f, off: d, ops: l, opOffs: k, fit: x };
  }), p = i.map(
    (f, b) => o[f.id] ?? Mt(n.length + b, c)
  ), y = Gn(
    [
      ...s.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...i.map((f, b) => ({
        id: f.id,
        x: p[b].x,
        y: p[b].y,
        w: Ce,
        h: xe
      }))
    ],
    24
  );
  for (const f of s) {
    const b = y.get(f.a.id);
    b && (f.off = { x: f.off.x + (b.x - f.fit.x), y: f.off.y + (b.y - f.fit.y) }, f.fit = { ...f.fit, x: b.x, y: b.y });
  }
  i.forEach((f, b) => {
    const d = y.get(f.id);
    d && (p[b] = { x: d.x, y: d.y });
  });
  const h = Rn(e, c, [
    ...s.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...p.map((f) => ({ dx: f.x, dy: f.y, w: Ce, h: xe }))
  ]), m = [
    { ...t, x: h.x, y: h.y, w: h.w, h: h.h, container: !0 }
  ];
  for (const f of s)
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
    }), f.ops.forEach((b, d) => {
      m.push({
        id: b.id,
        label: b.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[d].x,
        y: e.y + f.off.y + f.opOffs[d].y,
        w: Ce,
        h: xe,
        tooltip: `${Tt[f.a.opKind]}: ${b.name}`
      });
    });
  return i.forEach((f, b) => {
    const d = Zt[f.kind];
    m.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + p[b].x,
      y: e.y + p[b].y,
      w: Ce,
      h: xe,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${Tt[f.kind]} ${f.name}`
    });
  }), m;
}
const Ya = [
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
], Fi = 20, Wi = 28, Ht = 10, qt = Bo + 2 * Ht;
function Xa(e, t, n, i, o, a, r = /* @__PURE__ */ new Set()) {
  const c = Fo(e, t), s = new Map(c.map((x) => [x.id, x])), p = (e.modules ?? []).filter((x) => x.boundedContextId === t.id);
  if (p.length <= 1)
    return [{
      ...i,
      collapsible: !1,
      collapsed: !1,
      x: n.x,
      y: n.y,
      w: We,
      h: je,
      tooltip: `${t.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos`
    }];
  const y = new Set(p.flatMap((x) => x.elementIds ?? [])), m = p.some((x) => r.has(x.id)) ? c.filter((x) => !y.has(x.id)) : [], f = a[i.id] ?? zn(p.length + m.length), b = p.map((x, _) => {
    const R = r.has(x.id), L = R ? (x.elementIds ?? []).map((E) => s.get(E)).filter((E) => !!E) : [], D = R ? Ya.map((E) => {
      const V = L.filter((I) => E.kinds.includes(I.kind)), oe = Math.ceil(V.length / at), te = Fi + (oe ? oe * xe + (oe - 1) * Ln + 8 : 8);
      return { layer: E, chips: V, rows: oe, h: te };
    }) : [], q = R ? Wi + D.reduce((E, V) => E + V.h, 0) + Ht : 56, v = o[x.id] ?? Mt(_, f);
    return { cm: x, expanded: R, bands: D, boxH: q, off: v };
  }), d = m.map(
    (x, _) => o[x.id] ?? Mt(b.length + _, f)
  ), l = Gn(
    [
      ...b.map((x) => ({ id: x.cm.id, x: x.off.x, y: x.off.y, w: qt, h: x.boxH })),
      ...m.map((x, _) => ({ id: x.id, x: d[_].x, y: d[_].y, w: Ce, h: xe }))
    ],
    24
  );
  for (const x of b) {
    const _ = l.get(x.cm.id);
    _ && (x.off = { x: _.x, y: _.y });
  }
  m.forEach((x, _) => {
    const R = l.get(x.id);
    R && (d[_] = { x: R.x, y: R.y });
  });
  const g = Rn(n, f, [
    ...b.map((x) => ({ dx: x.off.x, dy: x.off.y, w: qt, h: x.boxH })),
    ...d.map((x) => ({ dx: x.x, dy: x.y, w: Ce, h: xe }))
  ]), k = [
    { ...i, x: g.x, y: g.y, w: g.w, h: g.h, container: !0 }
  ];
  for (const x of b) {
    const _ = n.x + x.off.x, R = n.y + x.off.y;
    if (k.push({
      id: x.cm.id,
      label: x.cm.name,
      kind: "module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      collapsible: !0,
      collapsed: !x.expanded,
      parentId: i.id,
      x: _,
      y: R,
      w: qt,
      h: x.boxH,
      tooltip: x.expanded ? `${x.cm.name} — módulo desplegado: arrastra el asa de un elemento suelto hasta él para empaquetarlo; el chevron lo pliega` : `${x.cm.name} — módulo: el chevron lo abre para ver y empaquetar su contenido`
    }), !x.expanded) continue;
    let L = -x.boxH / 2 + Wi;
    for (const D of x.bands) {
      const q = `hexlayer:${x.cm.id}:${D.layer.key}`;
      k.push({
        id: q,
        label: D.layer.label,
        kind: "hex-layer",
        fill: D.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: x.cm.id,
        x: _,
        y: R + L + D.h / 2,
        w: qt - 2 * Ht,
        h: D.h,
        tooltip: `Capa de ${D.layer.label} del módulo ${x.cm.name} (derivada del tipo de cada elemento)`
      }), D.chips.forEach((v, E) => {
        const V = E % at, oe = Math.floor(E / at), te = v.policy ? Dn : Zt[v.kind];
        k.push({
          id: v.id,
          label: v.name,
          kind: v.kind,
          x: _ - (qt - 2 * Ht) / 2 + Ht + V * (Ce + $i) + Ce / 2,
          y: R + L + Fi + oe * (xe + Ln) + xe / 2,
          w: Ce,
          h: xe,
          symbol: te.symbol,
          fill: te.fill,
          stroke: te.stroke,
          parentId: q,
          tooltip: `${v.policy ? "Policy" : Tt[v.kind]} ${v.name} — en el módulo ${x.cm.name} (Supr lo saca del módulo)`
        });
      }), L += D.h;
    }
  }
  return m.forEach((x, _) => {
    const R = x.policy ? Dn : Zt[x.kind];
    k.push({
      id: x.id,
      label: x.name,
      kind: x.kind,
      x: n.x + d[_].x,
      y: n.y + d[_].y,
      w: Ce,
      h: xe,
      symbol: R.symbol,
      fill: R.fill,
      stroke: R.stroke,
      parentId: i.id,
      tooltip: `${x.policy ? "Policy" : Tt[x.kind]} ${x.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), k;
}
function Gt(e, t, n, i, o) {
  const a = o[t.id] ?? zn(n.length), r = (m) => {
    const f = m.children ?? [], b = f.length ? { w: Ce + 16, h: 36 + f.length * (xe + 6) + 6 } : { w: Ce, h: xe }, d = m.kind === "external-system" ? o[m.id] : void 0;
    return { w: Math.max(b.w, (d == null ? void 0 : d.w) ?? 0), h: Math.max(b.h, (d == null ? void 0 : d.h) ?? 0) };
  }, c = n.map((m, f) => i[m.id] ?? Mt(f, a)), s = Gn(
    n.map((m, f) => ({ id: m.id, x: c[f].x, y: c[f].y, ...r(m) })),
    10
  );
  n.forEach((m, f) => {
    const b = s.get(m.id);
    b && (c[f] = { x: b.x, y: b.y });
  });
  const p = Rn(
    e,
    a,
    c.map((m, f) => ({ dx: m.x, dy: m.y, ...r(n[f]) }))
  ), y = {
    ...t,
    x: p.x,
    y: p.y,
    w: p.w,
    h: p.h,
    container: !0
  }, h = n.flatMap((m, f) => {
    const b = c[f], d = m.policy ? Dn : Zt[m.kind], l = r(m), g = {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + b.x,
      y: e.y + b.y,
      ...l,
      container: (m.children ?? []).length > 0 || void 0,
      resizable: m.kind === "external-system" || void 0,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Tt[m.kind]} ${m.name}`
    }, k = (m.children ?? []).map((x, _) => {
      const R = x.policy ? Dn : Zt[x.kind];
      return {
        id: x.id,
        label: x.name,
        kind: x.kind,
        x: g.x,
        y: g.y - l.h / 2 + 36 + _ * (xe + 6) + xe / 2,
        w: Ce - 8,
        h: xe,
        symbol: R.symbol,
        fill: R.fill,
        stroke: R.stroke,
        parentId: m.id,
        tooltip: `${Tt[x.kind]} ${x.name} — publicada por ${m.name}`
      };
    });
    return [g, ...k];
  });
  return [y, ...h];
}
function Ja(e, t, n = "contexts", i = {}, o = /* @__PURE__ */ new Set()) {
  const a = n === "distribution", r = n === "contexts", c = a || r, s = o, p = n !== "contexts", y = n === "operations", h = new Set(e.externalSystems.map((u) => u.id)), m = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && h.has(u.publishedByExternalSystemId)
  ), f = new Set(m.map((u) => u.id)), b = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && h.has(u.publishedByExternalSystemId)
  ), d = new Set(b.map((u) => u.id)), l = [
    ...e.boundedContexts.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((u) => !u.parentExternalSystemId || !h.has(u.parentExternalSystemId)).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...c ? [] : (e.apis ?? []).filter((u) => !f.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...c ? [] : (e.proxyApis ?? []).filter((u) => !d.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...c ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...c ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerBoundedContextId).map((u) => ({
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
  ], g = l.flatMap((u, O) => {
    const F = t[u.ref.id] ?? dt(O, l.length);
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
        x: F.x,
        y: F.y,
        w: We,
        h: je
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
        w: We,
        h: je
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
        w: We,
        h: je
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
      if (y && K.targetApiId) {
        const _t = (e.apis ?? []).find(($t) => $t.id === K.targetApiId), tt = (_t == null ? void 0 : _t.operations) ?? [];
        if (tt.length > 0)
          return Gt(
            F,
            pe,
            tt.map(($t) => ({
              id: ut($t.id, K.id),
              name: $t.name,
              kind: "api-op-occurrence"
            })),
            t,
            i
          );
      }
      return [{ ...pe, x: F.x, y: F.y, w: We, h: je }];
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
      return (o.has(K.id) ? !p : p) && K.operations.length > 0 ? Gt(
        F,
        { ...pe, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (tt) => ({ id: tt.id, name: tt.name, kind: "api-operation" })
        ),
        t,
        i
      ) : [{
        ...pe,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: F.x,
        y: F.y,
        w: We,
        h: je
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
        e.externalSystems.filter((ie) => ie.parentExternalSystemId === K.id).map((ie) => ie.id)
      ), tt = (ie) => ie === K.id || ie !== void 0 && _t.has(ie), $t = (ie) => {
        var _e;
        return ((_e = e.externalSystems.find((ve) => ve.id === ie)) == null ? void 0 : _e.name) ?? K.name;
      }, un = m.filter((ie) => tt(ie.publishedByExternalSystemId)), Qn = b.filter((ie) => tt(ie.publishedByExternalSystemId)), Ua = un.filter((ie) => ie.publishedByExternalSystemId === K.id), qa = Qn.filter((ie) => ie.publishedByExternalSystemId === K.id), mn = [
        ...e.externalSystems.filter((ie) => ie.parentExternalSystemId === K.id).map((ie) => ({
          id: ie.id,
          name: ie.name,
          kind: "external-system",
          children: [
            ...m.filter((_e) => _e.publishedByExternalSystemId === ie.id).map((_e) => ({ id: _e.id, name: _e.name, kind: "api" })),
            ...b.filter((_e) => _e.publishedByExternalSystemId === ie.id).map((_e) => ({ id: _e.id, name: _e.name, kind: "proxy-api" }))
          ]
        })),
        ...(K.useCases ?? []).map(
          (ie) => ({ id: ie.id, name: ie.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (ie) => ({ id: ie.id, name: ie.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (ie) => ({ id: ie.id, name: ie.name, kind: "mcp-server" })
        )
      ], Ba = mn.filter((ie) => ie.kind === "external-system"), Zn = un.length > 0 || Qn.length > 0, ei = Zn || mn.length > 0, { form: fn, collapsed: ti } = Bi(
        o.has(K.id),
        // Deployment is topology: external systems join compact, like the boundedContexts.
        a ? "compact" : p ? "full" : Zn ? "coarse" : "compact",
        mn.length > 0 || y && Zn
      ), Di = [
        ...qa.map((ie) => ({ id: ie.id, name: ie.name, kind: "proxy-api" })),
        ...fn === "full" ? mn : Ba
      ], ni = y && fn === "full" ? Qn.filter((ie) => {
        const _e = ie.targetApiId ? (e.apis ?? []).find((ve) => ve.id === ie.targetApiId) : void 0;
        return ((_e == null ? void 0 : _e.operations) ?? []).length > 0;
      }) : [];
      if (y && fn === "full" && (un.length > 0 || ni.length > 0)) {
        const ie = [
          ...un.map((ve) => ({
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
          ...ni.map((ve) => {
            const Ut = (e.apis ?? []).find((hn) => hn.id === ve.targetApiId);
            return {
              id: ve.id,
              name: ve.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ve.name} — proxy/cache de ${Ut.name}`,
              opKind: "api-op-occurrence",
              ops: (Ut.operations ?? []).map((hn) => ({
                id: ut(hn.id, ve.id),
                name: hn.name
              }))
            };
          })
        ], _e = new Set(ni.map((ve) => ve.id));
        return Wo(
          F,
          { ...pe, collapsible: !0, collapsed: ti },
          ie,
          Di.filter((ve) => !_e.has(ve.id)),
          t,
          i,
          s
        );
      }
      const zi = fn === "compact" ? [] : [
        ...Ua.map((ie) => ({ id: ie.id, name: ie.name, kind: "api" })),
        ...Di
      ];
      if (zi.length > 0)
        return Gt(
          F,
          { ...pe, collapsible: ei, collapsed: ti },
          zi,
          t,
          i
        );
      const Ct = i[K.id];
      return [{
        ...pe,
        collapsible: ei,
        collapsed: ei && ti,
        resizable: !0,
        x: F.x,
        y: F.y,
        w: (Ct == null ? void 0 : Ct.w) ?? We,
        h: (Ct == null ? void 0 : Ct.h) ?? je
      }];
    }
    const X = u.ref, Y = X.subdomainType ?? "GENERIC", fe = {
      id: X.id,
      label: X.name,
      kind: "boundedContext",
      symbol: "component",
      fill: Wa[Y],
      stroke: "#94a3b8",
      badge: Y,
      tooltip: `${X.name} — subdominio ${Y}`
    }, Be = zo(e, X.id), Dt = (e.aggregates ?? []).some((K) => K.boundedContextId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerBoundedContextId === X.id) || (e.notifications ?? []).some((K) => K.ownerBoundedContextId === X.id) || (e.documents ?? []).some((K) => K.ownerBoundedContextId === X.id), rt = Dt || Be.length > 0, { form: zt, collapsed: kt } = Bi(
      o.has(X.id),
      p ? "full" : Be.length > 0 ? "coarse" : "compact",
      Dt
    );
    return a ? Xa(
      e,
      X,
      F,
      { ...fe, collapsible: !1, collapsed: !1 },
      t,
      i,
      o
    ) : zt === "full" && rt ? Ka(
      e,
      X,
      F,
      { ...fe, collapsible: !0, collapsed: kt },
      t,
      i,
      y
    ) : zt === "coarse" && Be.length > 0 ? Gt(
      F,
      { ...fe, collapsible: rt, collapsed: kt },
      Be,
      t,
      i
    ) : [{
      ...fe,
      collapsible: rt,
      collapsed: rt && kt,
      x: F.x,
      y: F.y,
      w: We,
      h: je
    }];
  }), k = c ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, x = l.length + k.actors.length + k.aiAgents.length + k.rags.length + k.mcpGateways.length;
  k.actors.forEach((u, O) => {
    const F = t[u.id] ?? dt(l.length + O, x);
    g.push({
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
    const F = t[u.id] ?? dt(l.length + (e.actors ?? []).length + O, x);
    g.push({
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
      l.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      x
    );
    g.push({
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
  const _ = [];
  if (k.rags.forEach((u, O) => {
    const F = t[u.id] ?? dt(
      l.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      x
    );
    g.push({
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
    }), (u.contentSources ?? []).forEach((X, Y) => {
      const fe = `ragcs:${u.id}:${X.uri}`, Be = t[fe] ?? { x: F.x + 170, y: F.y - 30 + Y * 44 };
      g.push({
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
    u.forEach((F, X) => {
      const Y = t[F.id] ?? dt(l.length + X, l.length + u.length);
      g.push({
        id: F.id,
        label: F.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${F.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: Y.x,
        y: Y.y,
        w: We,
        h: je
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
    }), O.forEach((F, X) => {
      const Y = t[F.id] ?? dt(
        l.length + u.length + X,
        l.length + u.length + O.length
      );
      g.push({
        id: F.id,
        label: F.label,
        kind: "infrastructure",
        symbol: F.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: F.badge,
        tooltip: F.tooltip,
        x: Y.x,
        y: Y.y,
        w: We,
        h: je
      });
    });
  }
  g.sort((u, O) => (u.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const R = e.relations.map((u) => ({
    id: Ha(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? Ui[u.type] : u.inferredType ? `≈${Ui[u.inferredType]}` : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : u.inferredType ? `≈ ${u.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), L = e.flows.map((u) => {
    var Be, Dt, rt, zt, kt, K;
    const O = Ga(e, u), F = p ? e.boundedContexts.find((pe) => pe.id === u.sourceId) : void 0, X = ((Be = F == null ? void 0 : F.domainEvents) == null ? void 0 : Be.find((pe) => pe.name === u.triggerEvent)) ?? ((Dt = F == null ? void 0 : F.applicationEvents) == null ? void 0 : Dt.find((pe) => pe.name === u.triggerEvent)), Y = p && u.readModelName ? (zt = (rt = e.boundedContexts.find((pe) => pe.id === u.targetId)) == null ? void 0 : rt.readModels) == null ? void 0 : zt.find((pe) => pe.name === u.readModelName) : void 0, fe = p && u.targetUseCaseId ? (K = (kt = e.boundedContexts.find((pe) => pe.id === u.targetId)) == null ? void 0 : kt.useCases) == null ? void 0 : K.find((pe) => pe.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? u.sourceId,
      targetId: (fe == null ? void 0 : fe.id) ?? (Y == null ? void 0 : Y.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: ja[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${O}`
    };
  }), D = new Map((e.apis ?? []).map((u) => [u.id, u])), q = new Set(e.boundedContexts.map((u) => u.id)), v = (e.apiImplementations ?? []).filter(
    (u) => D.has(u.apiId) && q.has(u.boundedContextId)
  ), E = new Set(g.map((u) => u.id)), V = a ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.moduleIds ?? []).map((O) => {
        var X;
        if (!E.has(u.id)) return null;
        const F = E.has(O) ? O : (X = (e.modules ?? []).find((Y) => Y.id === O)) == null ? void 0 : X.boundedContextId;
        return !F || !E.has(F) ? null : {
          id: `deploy:${u.id}->${O}`,
          sourceId: u.id,
          targetId: F,
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
  ] : [], oe = p ? (e.emissions ?? []).filter((u) => E.has(u.sourceId) && E.has(u.domainEventId)).map((u) => ({
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
      const F = p && O.targetUseCaseId && E.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetBoundedContextId && E.has(O.targetBoundedContextId) ? O.targetBoundedContextId : (O.targetUseCaseId && !p, null);
      if (!F) return [];
      const X = p && E.has(O.id) ? O.id : u.id;
      return E.has(X) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: X,
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
  ], w = p ? e.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && E.has(u.id) && E.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], $ = p ? (e.aggregateCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], M = p ? (e.queryCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], S = p ? (e.actorUses ?? []).filter((u) => E.has(u.actorId) && E.has(u.targetId)).map((u) => ({
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
  ]), z = (u) => E.has(u) ? u : N.get(u) ?? u, B = [
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
  ], H = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.useCases ?? []) H.set(O.id, u.id);
    for (const O of u.domainEvents ?? []) H.set(O.id, u.id);
    for (const O of u.applicationEvents ?? []) H.set(O.id, u.id);
    for (const O of u.queryServices ?? []) H.set(O.id, u.id);
  }
  const de = (u) => E.has(u) ? u : H.get(u) ?? u, ce = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const O of u.domainEvents ?? []) ce.set(O.name, O.id);
    for (const O of u.applicationEvents ?? []) ce.set(O.name, O.id);
  }
  const W = [
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
    const F = [];
    if (u.eventId) {
      const Y = E.has(u.eventId) ? u.eventId : H.get(u.eventId);
      Y && E.has(Y) && Y !== O && F.push({
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
      E.has(Y) && F.push({
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
    return F;
  }), Fe = (e.documents ?? []).flatMap((u) => {
    const O = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!O || !u.queryServiceId) return [];
    const F = E.has(u.queryServiceId) ? u.queryServiceId : H.get(u.queryServiceId);
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
  }), Se = (e.etlFlows ?? []).flatMap(
    (u) => (u.steps ?? []).flatMap((O) => {
      const F = E.has(u.id) ? u.id : u.ownerBoundedContextId && E.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      if (!F) return [];
      const X = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!X) return [];
      let Y = X;
      if (!E.has(Y) && O.operationId && O.apiId && (Y = O.apiId), !E.has(Y) && O.externalTableId && (Y = ue.get(O.externalTableId) ?? Y), E.has(Y) || (Y = z(Y)), E.has(Y) || (Y = H.get(X) ?? Y), !E.has(Y) || Y === F) return [];
      const fe = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${O.id}`,
        sourceId: fe ? Y : F,
        targetId: fe ? F : Y,
        kind: fe ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: fe ? `${u.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${u.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), j = [
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
  ], wt = v.flatMap((u) => {
    const O = mt(u.apiId, u.boundedContextId);
    if (!E.has(O)) return [];
    const F = [];
    for (const X of (e.proxyApis ?? []).filter((Y) => Y.targetApiId === u.apiId)) {
      const Y = z(X.id);
      E.has(Y) && Y !== O && F.push({
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
    return F;
  }), pn = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const O = (e.proxyApis ?? []).find((Y) => Y.id === u.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const F = ut(u.operationId, u.proxyId), X = u.targetSiteId === O.targetApiId ? O.targetApiId : mt(O.targetApiId, u.targetSiteId);
    return !E.has(F) || !E.has(X) ? [] : [{
      id: `oproute:${F}->${X}`,
      sourceId: F,
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
        const F = u.siteId === O.id, X = F ? u.operationId : ut(u.operationId, u.siteId);
        let Y = E.has(X) ? X : null;
        if (!Y)
          if (F || (e.proxyApis ?? []).some((fe) => fe.id === u.siteId))
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
  ], _a = p ? (e.apiOperationImplementations ?? []).flatMap((u) => {
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
  }) : [], $a = p ? (e.agentUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.useCaseId)).map((u) => ({
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
  })), Sa = p ? (e.rags ?? []).filter((u) => E.has(u.id)).flatMap(
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
  ) : [], Ea = p ? (e.agentExternalUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Aa = p ? (e.agentMcpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.mcpServerId)).map((u) => ({
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
  })), Ta = p ? (e.agentApiOpUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Oa = p ? (e.agentQueryUses ?? []).filter((u) => E.has(u.agentId) && E.has(u.queryServiceId)).map((u) => ({
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
  })), La = p ? (e.agentTriggers ?? []).filter((u) => E.has(u.eventId) && E.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Da = p ? (e.externalCalls ?? []).filter((u) => E.has(u.externalSystemId) && E.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], za = p ? (e.externalUseCaseCalls ?? []).filter((u) => E.has(u.sourceId) && E.has(u.targetId)).map((u) => ({
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
    nodes: g,
    edges: [
      ...V,
      ...R,
      ...L,
      ...oe,
      ...te,
      ...I,
      ...P,
      ...w,
      ...C,
      ...ye,
      ...Fe,
      ...Se,
      ...$,
      ...M,
      ...S,
      ...T,
      ...B,
      ...et,
      ...wt,
      ...pn,
      ...ka,
      ..._a,
      ...W,
      ...G,
      ...Ne,
      ...Oe,
      ...j,
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
const Qa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Za = 176, es = 60, ts = 140, ns = 40;
function is(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.boundedContexts.forEach((o, a) => {
    const r = 220 + a * 340;
    n.filter((s) => s.boundedContextId === o.id).forEach((s, p) => {
      const y = i.filter((m) => m.aggregateId === s.id).length, h = 140 + p * (170 + y * 60);
      t[s.id] = { x: r, y: h }, i.filter((m) => m.aggregateId === s.id).forEach((m, f) => {
        t[m.id] = { x: r + 60, y: h + 100 + f * 60 };
      });
    });
  }), n.filter((o) => !e.boundedContexts.some((a) => a.id === o.boundedContextId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function os(e, t) {
  const n = is(e), i = (h) => t[h] ?? n[h] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((h) => [h.id, h])), a = (e.aggregates ?? []).map((h) => {
    const m = o.get(h.boundedContextId), f = (m == null ? void 0 : m.subdomainType) ?? "GENERIC", b = i(h.id);
    return {
      id: h.id,
      label: h.name,
      x: b.x,
      y: b.y,
      w: Za,
      h: es,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Qa[f],
      stroke: "#64748b",
      badge: `${m ? `${m.name.toUpperCase()} · ` : ""}AGGREGATE${(h.invariants ?? []).length ? ` · ⚖${h.invariants.length}` : ""}`,
      tooltip: `Agregado ${h.name}${m ? ` — contexto ${m.name} (${f})` : ""}`
    };
  }), r = (e.entities ?? []).map((h) => {
    const m = i(h.id);
    return {
      id: h.id,
      label: h.name,
      x: m.x,
      y: m.y,
      w: ts,
      h: ns,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${h.name} (dentro del agregado)`
    };
  }), c = (e.aggregates ?? []).flatMap(
    (h) => (h.invariants ?? []).map((m, f) => {
      const b = i(h.id), d = t[m.id] ?? { x: b.x - 150, y: b.y + 90 + f * 52 };
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
    (h) => (h.invariants ?? []).map((m) => ({
      id: `protects:${h.id}->${m.id}`,
      sourceId: h.id,
      targetId: m.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "El agregado protege esta regla — Supr la retira"
    }))
  ), p = (e.entities ?? []).map((h) => ({
    id: `contains:${h.aggregateId}->${h.id}`,
    sourceId: h.aggregateId,
    targetId: h.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), y = (e.aggregateReferences ?? []).map((h, m) => ({
    id: `aggref:${m}:${h.sourceAggregateId}->${h.targetAggregateId}`,
    sourceId: h.sourceAggregateId,
    targetId: h.targetAggregateId,
    kind: "aggregate-reference",
    label: h.label,
    color: "#475569",
    arrow: !0,
    tooltip: h.label ? `Referencia: ${h.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...a, ...r, ...c],
    edges: [...p, ...y, ...s]
  };
}
const as = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, ss = 150, rs = 44, ds = 190, ls = 56, cs = 160, ps = 48;
function us(e, t) {
  const n = e.externalSystems.find((o) => o.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function ms(e, t) {
  const n = e.flows, i = [], o = [], a = /* @__PURE__ */ new Set(), r = (c) => {
    var s, p;
    return ((p = (s = e.aggregates) == null ? void 0 : s.find((y) => y.id === c)) == null ? void 0 : p.name) ?? c ?? "?";
  };
  return n.forEach((c, s) => {
    const p = 120 + s * 130, y = as[c.archetype] ?? "#475569", h = c.triggerAggregateId ?? c.sourceId;
    if (!a.has(h)) {
      a.add(h);
      const l = t[h] ?? { x: 160, y: p };
      i.push({
        id: h,
        label: c.triggerAggregateId ? r(c.triggerAggregateId) : h,
        x: l.x,
        y: l.y,
        w: ss,
        h: rs,
        kind: c.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: c.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: c.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const m = `flow:${c.id}`, f = t[m] ?? { x: 470, y: p };
    i.push({
      id: m,
      label: c.name,
      x: f.x,
      y: f.y,
      w: ds,
      h: ls,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: y,
      badge: c.archetype,
      tooltip: `Flow ${c.name} [${c.archetype}]${c.readModelName ? ` → read model ${c.readModelName}` : ""}${c.targetUseCaseId ? ` → use case ${c.targetUseCaseId}` : ""}`
    });
    const b = us(e, c), d = `tgt:${b.id}`;
    if (!a.has(d)) {
      a.add(d);
      const l = t[d] ?? { x: 790, y: p };
      i.push({
        id: d,
        label: b.label,
        x: l.x,
        y: l.y,
        w: cs,
        h: ps,
        kind: b.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: b.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: b.external,
        badge: b.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${c.id}:in`,
      sourceId: h,
      targetId: m,
      kind: "flow-trigger",
      label: c.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: c.triggerEvent ? `Evento: ${c.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${c.id}:out`,
      sourceId: m,
      targetId: d,
      kind: "flow-delivery",
      color: y,
      arrow: !0
    });
  }), { nodes: i, edges: o };
}
const fs = 190, hs = 56, ii = 170, gs = 52;
function ji(e, t) {
  const n = [], i = [], o = (a) => {
    var r;
    return (r = e.boundedContexts.find((c) => c.id === a)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((a, r) => {
    const c = 140 + r * 240, s = t[a.id] ?? { x: 150, y: c };
    n.push({
      id: a.id,
      label: a.name,
      x: s.x,
      y: s.y,
      w: fs,
      h: hs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerBoundedContextId) ? ` — contexto ${o(a.ownerBoundedContextId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((y, h) => {
      const m = y.type === "HUMAN", f = t[y.id] ?? { x: 150 + (h + 1) * 240, y: c };
      if (n.push({
        id: y.id,
        label: y.name,
        x: f.x,
        y: f.y,
        w: ii,
        h: gs,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${y.roleId ? ` · ${y.roleId}` : ""}${y.deadline ? ` · ⏱ ${y.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${y.name}${y.useCaseId ? ` — use case ${y.useCaseId}` : ""}${y.deadline ? ` · deadline ${y.deadline}` : ""}`
      }), i.push({
        id: `pe:${a.id}:${h}`,
        sourceId: p,
        targetId: y.id,
        kind: "process-seq",
        label: h === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), y.compensationUseCaseId) {
        const b = `comp:${y.id}`, d = t[b] ?? { x: f.x, y: f.y + 90 };
        n.push({
          id: b,
          label: y.compensationUseCaseId,
          x: d.x,
          y: d.y,
          w: ii,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), i.push({
          id: `pc:${y.id}`,
          sourceId: y.id,
          targetId: b,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = y.id;
    }), a.onCompletionEventName) {
      const y = `done:${a.id}`, h = t[y] ?? { x: 150 + (a.steps.length + 1) * 240, y: c };
      n.push({
        id: y,
        label: a.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: ii,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${a.id}`,
        sourceId: p,
        targetId: y,
        kind: "process-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
  }), { nodes: n, edges: i };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mn = globalThis, Ci = Mn.ShadowRoot && (Mn.ShadyCSS === void 0 || Mn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Si = Symbol(), Vi = /* @__PURE__ */ new WeakMap();
let jo = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Si) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Ci && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = Vi.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Vi.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ys = (e) => new jo(typeof e == "string" ? e : e + "", void 0, Si), xt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new jo(n, e, Si);
}, Is = (e, t) => {
  if (Ci) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = Mn.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, Hi = Ci ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return ys(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bs, defineProperty: xs, getOwnPropertyDescriptor: vs, getOwnPropertyNames: ws, getOwnPropertySymbols: ks, getPrototypeOf: _s } = Object, st = globalThis, Gi = st.trustedTypes, $s = Gi ? Gi.emptyScript : "", oi = st.reactiveElementPolyfillSupport, Xt = (e, t) => e, Un = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? $s : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Ei = (e, t) => !bs(e, t), Ki = { attribute: !0, type: String, converter: Un, reflect: !1, useDefault: !1, hasChanged: Ei };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Ki) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && xs(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: a } = vs(this.prototype, t) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: o, set(r) {
      const c = o == null ? void 0 : o.call(this);
      a == null || a.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ki;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Xt("elementProperties"))) return;
    const t = _s(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Xt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Xt("properties"))) {
      const n = this.properties, i = [...ws(n), ...ks(n)];
      for (const o of i) this.createProperty(o, n[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [i, o] of n) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const o = this._$Eu(n, i);
      o !== void 0 && this._$Eh.set(o, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) n.unshift(Hi(o));
    } else t !== void 0 && n.push(Hi(t));
    return n;
  }
  static _$Eu(t, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((n) => n(this));
  }
  addController(t) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) == null || n.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$EO) == null || n.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Is(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostConnected) == null ? void 0 : i.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var i;
      return (i = n.hostDisconnected) == null ? void 0 : i.call(n);
    });
  }
  attributeChangedCallback(t, n, i) {
    this._$AK(t, i);
  }
  _$ET(t, n) {
    var a;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : Un).toAttribute(n, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var a, r;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const c = i.getPropertyOptions(o), s = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((a = c.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? c.converter : Un;
      this._$Em = o;
      const p = s.fromAttribute(n, c.type);
      this[o] = p ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, a) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (o === !1 && (a = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? Ei)(a, n) || i.useDefault && i.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: a }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? n ?? this[t]), a !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, r] of this._$Ep) this[a] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, r] of o) {
        const { wrapped: c } = r, s = this[a];
        c !== !0 || this._$AL.has(a) || s === void 0 || this.C(a, void 0, r, s);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((o) => {
        var a;
        return (a = o.hostUpdate) == null ? void 0 : a.call(o);
      }), this.update(n)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((i) => {
      var o;
      return (o = i.hostUpdated) == null ? void 0 : o.call(i);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Et.elementStyles = [], Et.shadowRootOptions = { mode: "open" }, Et[Xt("elementProperties")] = /* @__PURE__ */ new Map(), Et[Xt("finalized")] = /* @__PURE__ */ new Map(), oi == null || oi({ ReactiveElement: Et }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, Yi = (e) => e, qn = Jt.trustedTypes, Xi = qn ? qn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Vo = "$lit$", ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Ho = "?" + ot, Cs = `<${Ho}>`, It = document, en = () => It.createComment(""), tn = (e) => e === null || typeof e != "object" && typeof e != "function", Ai = Array.isArray, Ss = (e) => Ai(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ai = `[ 	
\f\r]`, Bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ji = /-->/g, Qi = />/g, lt = RegExp(`>|${ai}(?:([^\\s"'>=/]+)(${ai}*=${ai}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zi = /'/g, eo = /"/g, Go = /^(?:script|style|textarea|title)$/i, Ko = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), A = Ko(1), ne = Ko(2), Ot = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), to = /* @__PURE__ */ new WeakMap(), ft = It.createTreeWalker(It, 129);
function Yo(e, t) {
  if (!Ai(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Xi !== void 0 ? Xi.createHTML(t) : t;
}
const Es = (e, t) => {
  const n = e.length - 1, i = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Bt;
  for (let c = 0; c < n; c++) {
    const s = e[c];
    let p, y, h = -1, m = 0;
    for (; m < s.length && (r.lastIndex = m, y = r.exec(s), y !== null); ) m = r.lastIndex, r === Bt ? y[1] === "!--" ? r = Ji : y[1] !== void 0 ? r = Qi : y[2] !== void 0 ? (Go.test(y[2]) && (o = RegExp("</" + y[2], "g")), r = lt) : y[3] !== void 0 && (r = lt) : r === lt ? y[0] === ">" ? (r = o ?? Bt, h = -1) : y[1] === void 0 ? h = -2 : (h = r.lastIndex - y[2].length, p = y[1], r = y[3] === void 0 ? lt : y[3] === '"' ? eo : Zi) : r === eo || r === Zi ? r = lt : r === Ji || r === Qi ? r = Bt : (r = lt, o = void 0);
    const f = r === lt && e[c + 1].startsWith("/>") ? " " : "";
    a += r === Bt ? s + Cs : h >= 0 ? (i.push(p), s.slice(0, h) + Vo + s.slice(h) + ot + f) : s + ot + (h === -2 ? c : f);
  }
  return [Yo(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class nn {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let a = 0, r = 0;
    const c = t.length - 1, s = this.parts, [p, y] = Es(t, n);
    if (this.el = nn.createElement(p, i), ft.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ft.nextNode()) !== null && s.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Vo)) {
          const m = y[r++], f = o.getAttribute(h).split(ot), b = /([.?@])?(.*)/.exec(m);
          s.push({ type: 1, index: a, name: b[2], strings: f, ctor: b[1] === "." ? Ms : b[1] === "?" ? Ps : b[1] === "@" ? Ts : Kn }), o.removeAttribute(h);
        } else h.startsWith(ot) && (s.push({ type: 6, index: a }), o.removeAttribute(h));
        if (Go.test(o.tagName)) {
          const h = o.textContent.split(ot), m = h.length - 1;
          if (m > 0) {
            o.textContent = qn ? qn.emptyScript : "";
            for (let f = 0; f < m; f++) o.append(h[f], en()), ft.nextNode(), s.push({ type: 2, index: ++a });
            o.append(h[m], en());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ho) s.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(ot, h + 1)) !== -1; ) s.push({ type: 7, index: a }), h += ot.length - 1;
      }
      a++;
    }
  }
  static createElement(t, n) {
    const i = It.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Nt(e, t, n = e, i) {
  var r, c;
  if (t === Ot) return t;
  let o = i !== void 0 ? (r = n._$Co) == null ? void 0 : r[i] : n._$Cl;
  const a = tn(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((c = o == null ? void 0 : o._$AO) == null || c.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = o : n._$Cl = o), o !== void 0 && (t = Nt(e, o._$AS(e, t.values), o, i)), t;
}
class As {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? It).importNode(n, !0);
    ft.currentNode = o;
    let a = ft.nextNode(), r = 0, c = 0, s = i[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let p;
        s.type === 2 ? p = new dn(a, a.nextSibling, this, t) : s.type === 1 ? p = new s.ctor(a, s.name, s.strings, this, t) : s.type === 6 && (p = new Os(a, this, t)), this._$AV.push(p), s = i[++c];
      }
      r !== (s == null ? void 0 : s.index) && (a = ft.nextNode(), r++);
    }
    return ft.currentNode = It, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class dn {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = Nt(this, t, n), tn(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== Ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ss(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && tn(this._$AH) ? this._$AA.nextSibling.data = t : this.T(It.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = nn.createElement(Yo(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(n);
    else {
      const r = new As(o, this), c = r.u(this.options);
      r.p(n), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let n = to.get(t.strings);
    return n === void 0 && to.set(t.strings, n = new nn(t)), n;
  }
  k(t) {
    Ai(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const a of t) o === n.length ? n.push(i = new dn(this.O(en()), this.O(en()), this, this.options)) : i = n[o], i._$AI(a), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const o = Yi(t).nextSibling;
      Yi(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class Kn {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, a) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = se;
  }
  _$AI(t, n = this, i, o) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) t = Nt(this, t, n, 0), r = !tn(t) || t !== this._$AH && t !== Ot, r && (this._$AH = t);
    else {
      const c = t;
      let s, p;
      for (t = a[0], s = 0; s < a.length - 1; s++) p = Nt(this, c[i + s], n, s), p === Ot && (p = this._$AH[s]), r || (r = !tn(p) || p !== this._$AH[s]), p === se ? t = se : t !== se && (t += (p ?? "") + a[s + 1]), this._$AH[s] = p;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ms extends Kn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class Ps extends Kn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class Ts extends Kn {
  constructor(t, n, i, o, a) {
    super(t, n, i, o, a), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Nt(this, t, n, 0) ?? se) === Ot) return;
    const i = this._$AH, o = t === se && i !== se || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== se && (i === se || o);
    o && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Os {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Nt(this, t);
  }
}
const si = Jt.litHtmlPolyfillSupport;
si == null || si(nn, dn), (Jt.litHtmlVersions ?? (Jt.litHtmlVersions = [])).push("3.3.3");
const Ns = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const a = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = o = new dn(t.insertBefore(en(), a), a, void 0, n ?? {});
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
    var n;
    const t = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = t.firstChild), t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ns(n, this.renderRoot, this.renderOptions);
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
const ri = gt.litElementPolyfillSupport;
ri == null || ri({ LitElement: Ge });
(gt.litElementVersions ?? (gt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rs = { attribute: !0, type: String, converter: Un, reflect: !1, hasChanged: Ei }, Ls = (e = Rs, t, n) => {
  const { kind: i, metadata: o } = n;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), i === "accessor") {
    const { name: r } = n;
    return { set(c) {
      const s = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, s, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(c) {
      const s = this[r];
      t.call(this, c), this.requestUpdate(r, s, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function re(e) {
  return (t, n) => typeof n == "object" ? Ls(e, t, n) : ((i, o, a) => {
    const r = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return re({ ...e, state: !0, attribute: !1 });
}
var fi = "http://www.w3.org/1999/xhtml";
const no = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: fi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Yn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), no.hasOwnProperty(t) ? { space: no[t], local: e } : e;
}
function Ds(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === fi && t.documentElement.namespaceURI === fi ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function zs(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Xo(e) {
  var t = Yn(e);
  return (t.local ? zs : Ds)(t);
}
function Us() {
}
function Mi(e) {
  return e == null ? Us : function() {
    return this.querySelector(e);
  };
}
function qs(e) {
  typeof e != "function" && (e = Mi(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var a = t[o], r = a.length, c = i[o] = new Array(r), s, p, y = 0; y < r; ++y)
      (s = a[y]) && (p = e.call(s, s.__data__, y, a)) && ("__data__" in s && (p.__data__ = s.__data__), c[y] = p);
  return new Ue(i, this._parents);
}
function Bs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Fs() {
  return [];
}
function Jo(e) {
  return e == null ? Fs : function() {
    return this.querySelectorAll(e);
  };
}
function Ws(e) {
  return function() {
    return Bs(e.apply(this, arguments));
  };
}
function js(e) {
  typeof e == "function" ? e = Ws(e) : e = Jo(e);
  for (var t = this._groups, n = t.length, i = [], o = [], a = 0; a < n; ++a)
    for (var r = t[a], c = r.length, s, p = 0; p < c; ++p)
      (s = r[p]) && (i.push(e.call(s, s.__data__, p, r)), o.push(s));
  return new Ue(i, o);
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
function Gs() {
  return this.firstElementChild;
}
function Ks(e) {
  return this.select(e == null ? Gs : Hs(typeof e == "function" ? e : Zo(e)));
}
var Ys = Array.prototype.filter;
function Xs() {
  return Array.from(this.children);
}
function Js(e) {
  return function() {
    return Ys.call(this.children, e);
  };
}
function Qs(e) {
  return this.selectAll(e == null ? Xs : Js(typeof e == "function" ? e : Zo(e)));
}
function Zs(e) {
  typeof e != "function" && (e = Qo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var a = t[o], r = a.length, c = i[o] = [], s, p = 0; p < r; ++p)
      (s = a[p]) && e.call(s, s.__data__, p, a) && c.push(s);
  return new Ue(i, this._parents);
}
function ea(e) {
  return new Array(e.length);
}
function er() {
  return new Ue(this._enter || this._groups.map(ea), this._parents);
}
function Bn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Bn.prototype = {
  constructor: Bn,
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
function tr(e) {
  return function() {
    return e;
  };
}
function nr(e, t, n, i, o, a) {
  for (var r = 0, c, s = t.length, p = a.length; r < p; ++r)
    (c = t[r]) ? (c.__data__ = a[r], i[r] = c) : n[r] = new Bn(e, a[r]);
  for (; r < s; ++r)
    (c = t[r]) && (o[r] = c);
}
function ir(e, t, n, i, o, a, r) {
  var c, s, p = /* @__PURE__ */ new Map(), y = t.length, h = a.length, m = new Array(y), f;
  for (c = 0; c < y; ++c)
    (s = t[c]) && (m[c] = f = r.call(s, s.__data__, c, t) + "", p.has(f) ? o[c] = s : p.set(f, s));
  for (c = 0; c < h; ++c)
    f = r.call(e, a[c], c, a) + "", (s = p.get(f)) ? (i[c] = s, s.__data__ = a[c], p.delete(f)) : n[c] = new Bn(e, a[c]);
  for (c = 0; c < y; ++c)
    (s = t[c]) && p.get(m[c]) === s && (o[c] = s);
}
function or(e) {
  return e.__data__;
}
function ar(e, t) {
  if (!arguments.length) return Array.from(this, or);
  var n = t ? ir : nr, i = this._parents, o = this._groups;
  typeof e != "function" && (e = tr(e));
  for (var a = o.length, r = new Array(a), c = new Array(a), s = new Array(a), p = 0; p < a; ++p) {
    var y = i[p], h = o[p], m = h.length, f = sr(e.call(y, y && y.__data__, p, i)), b = f.length, d = c[p] = new Array(b), l = r[p] = new Array(b), g = s[p] = new Array(m);
    n(y, h, d, l, g, f, t);
    for (var k = 0, x = 0, _, R; k < b; ++k)
      if (_ = d[k]) {
        for (k >= x && (x = k + 1); !(R = l[x]) && ++x < b; ) ;
        _._next = R || null;
      }
  }
  return r = new Ue(r, i), r._enter = c, r._exit = s, r;
}
function sr(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function rr() {
  return new Ue(this._exit || this._groups.map(ea), this._parents);
}
function dr(e, t, n) {
  var i = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), n == null ? a.remove() : n(a), i && o ? i.merge(o).order() : o;
}
function lr(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, o = n.length, a = i.length, r = Math.min(o, a), c = new Array(o), s = 0; s < r; ++s)
    for (var p = n[s], y = i[s], h = p.length, m = c[s] = new Array(h), f, b = 0; b < h; ++b)
      (f = p[b] || y[b]) && (m[b] = f);
  for (; s < o; ++s)
    c[s] = n[s];
  return new Ue(c, this._parents);
}
function cr() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], o = i.length - 1, a = i[o], r; --o >= 0; )
      (r = i[o]) && (a && r.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(r, a), a = r);
  return this;
}
function pr(e) {
  e || (e = ur);
  function t(h, m) {
    return h && m ? e(h.__data__, m.__data__) : !h - !m;
  }
  for (var n = this._groups, i = n.length, o = new Array(i), a = 0; a < i; ++a) {
    for (var r = n[a], c = r.length, s = o[a] = new Array(c), p, y = 0; y < c; ++y)
      (p = r[y]) && (s[y] = p);
    s.sort(t);
  }
  return new Ue(o, this._parents).order();
}
function ur(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function mr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function fr() {
  return Array.from(this);
}
function hr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, a = i.length; o < a; ++o) {
      var r = i[o];
      if (r) return r;
    }
  return null;
}
function gr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function yr() {
  return !this.node();
}
function Ir(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var o = t[n], a = 0, r = o.length, c; a < r; ++a)
      (c = o[a]) && e.call(c, c.__data__, a, o);
  return this;
}
function br(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function xr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function vr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function wr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function kr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function _r(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function $r(e, t) {
  var n = Yn(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? xr : br : typeof t == "function" ? n.local ? _r : kr : n.local ? wr : vr)(n, t));
}
function ta(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Cr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Sr(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Er(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Ar(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Cr : typeof t == "function" ? Er : Sr)(e, t, n ?? "")) : Rt(this.node(), e);
}
function Rt(e, t) {
  return e.style.getPropertyValue(t) || ta(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Mr(e) {
  return function() {
    delete this[e];
  };
}
function Pr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Tr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Or(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Mr : typeof t == "function" ? Tr : Pr)(e, t)) : this.node()[e];
}
function na(e) {
  return e.trim().split(/^|\s+/);
}
function Pi(e) {
  return e.classList || new ia(e);
}
function ia(e) {
  this._node = e, this._names = na(e.getAttribute("class") || "");
}
ia.prototype = {
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
  for (var n = Pi(e), i = -1, o = t.length; ++i < o; ) n.add(t[i]);
}
function aa(e, t) {
  for (var n = Pi(e), i = -1, o = t.length; ++i < o; ) n.remove(t[i]);
}
function Nr(e) {
  return function() {
    oa(this, e);
  };
}
function Rr(e) {
  return function() {
    aa(this, e);
  };
}
function Lr(e, t) {
  return function() {
    (t.apply(this, arguments) ? oa : aa)(this, e);
  };
}
function Dr(e, t) {
  var n = na(e + "");
  if (arguments.length < 2) {
    for (var i = Pi(this.node()), o = -1, a = n.length; ++o < a; ) if (!i.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Lr : t ? Nr : Rr)(n, t));
}
function zr() {
  this.textContent = "";
}
function Ur(e) {
  return function() {
    this.textContent = e;
  };
}
function qr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Br(e) {
  return arguments.length ? this.each(e == null ? zr : (typeof e == "function" ? qr : Ur)(e)) : this.node().textContent;
}
function Fr() {
  this.innerHTML = "";
}
function Wr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function jr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Vr(e) {
  return arguments.length ? this.each(e == null ? Fr : (typeof e == "function" ? jr : Wr)(e)) : this.node().innerHTML;
}
function Hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Gr() {
  return this.each(Hr);
}
function Kr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Yr() {
  return this.each(Kr);
}
function Xr(e) {
  var t = typeof e == "function" ? e : Xo(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Jr() {
  return null;
}
function Qr(e, t) {
  var n = typeof e == "function" ? e : Xo(e), i = t == null ? Jr : typeof t == "function" ? t : Mi(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Zr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ed() {
  return this.each(Zr);
}
function td() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function nd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function id(e) {
  return this.select(e ? nd : td);
}
function od(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ad(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function sd(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function rd(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, o = t.length, a; n < o; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++i] = a;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function dd(e, t, n) {
  return function() {
    var i = this.__on, o, a = ad(t);
    if (i) {
      for (var r = 0, c = i.length; r < c; ++r)
        if ((o = i[r]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = n), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), o = { type: e.type, name: e.name, value: t, listener: a, options: n }, i ? i.push(o) : this.__on = [o];
  };
}
function ld(e, t, n) {
  var i = sd(e + ""), o, a = i.length, r;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var s = 0, p = c.length, y; s < p; ++s)
        for (o = 0, y = c[s]; o < a; ++o)
          if ((r = i[o]).type === y.type && r.name === y.name)
            return y.value;
    }
    return;
  }
  for (c = t ? dd : rd, o = 0; o < a; ++o) this.each(c(i[o], t, n));
  return this;
}
function sa(e, t, n) {
  var i = ta(e), o = i.CustomEvent;
  typeof o == "function" ? o = new o(t, n) : (o = i.document.createEvent("Event"), n ? (o.initEvent(t, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function cd(e, t) {
  return function() {
    return sa(this, e, t);
  };
}
function pd(e, t) {
  return function() {
    return sa(this, e, t.apply(this, arguments));
  };
}
function ud(e, t) {
  return this.each((typeof t == "function" ? pd : cd)(e, t));
}
function* md() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, a = i.length, r; o < a; ++o)
      (r = i[o]) && (yield r);
}
var ra = [null];
function Ue(e, t) {
  this._groups = e, this._parents = t;
}
function ln() {
  return new Ue([[document.documentElement]], ra);
}
function fd() {
  return this;
}
Ue.prototype = ln.prototype = {
  constructor: Ue,
  select: qs,
  selectAll: js,
  selectChild: Ks,
  selectChildren: Qs,
  filter: Zs,
  data: ar,
  enter: er,
  exit: rr,
  join: dr,
  merge: lr,
  selection: fd,
  order: cr,
  sort: pr,
  call: mr,
  nodes: fr,
  node: hr,
  size: gr,
  empty: yr,
  each: Ir,
  attr: $r,
  style: Ar,
  property: Or,
  classed: Dr,
  text: Br,
  html: Vr,
  raise: Gr,
  lower: Yr,
  append: Xr,
  insert: Qr,
  remove: ed,
  clone: id,
  datum: od,
  on: ld,
  dispatch: ud,
  [Symbol.iterator]: md
};
function Ve(e) {
  return typeof e == "string" ? new Ue([[document.querySelector(e)]], [document.documentElement]) : new Ue([[e]], ra);
}
function hd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ct(e, t) {
  if (e = hd(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = e.clientX, i.y = e.clientY, i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var gd = { value: () => {
} };
function Ti() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Pn(n);
}
function Pn(e) {
  this._ = e;
}
function yd(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Pn.prototype = Ti.prototype = {
  constructor: Pn,
  on: function(e, t) {
    var n = this._, i = yd(e + "", n), o, a = -1, r = i.length;
    if (arguments.length < 2) {
      for (; ++a < r; ) if ((o = (e = i[a]).type) && (o = Id(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < r; )
      if (o = (e = i[a]).type) n[o] = io(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = io(n[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Pn(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), i = 0, o, a; i < o; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], i = 0, o = a.length; i < o; ++i) a[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], o = 0, a = i.length; o < a; ++o) i[o].value.apply(t, n);
  }
};
function Id(e, t) {
  for (var n = 0, i = e.length, o; n < i; ++n)
    if ((o = e[n]).name === t)
      return o.value;
}
function io(e, t, n) {
  for (var i = 0, o = e.length; i < o; ++i)
    if (e[i].name === t) {
      e[i] = gd, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const hi = { capture: !0, passive: !1 };
function gi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function bd(e) {
  var t = e.document.documentElement, n = Ve(e).on("dragstart.drag", gi, hi);
  "onselectstart" in t ? n.on("selectstart.drag", gi, hi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function xd(e, t) {
  var n = e.document.documentElement, i = Ve(e).on("dragstart.drag", null);
  t && (i.on("click.drag", gi, hi), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function Oi(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function da(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function cn() {
}
var on = 0.7, Fn = 1 / on, Pt = "\\s*([+-]?\\d+)\\s*", an = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ye = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", vd = /^#([0-9a-f]{3,8})$/, wd = new RegExp(`^rgb\\(${Pt},${Pt},${Pt}\\)$`), kd = new RegExp(`^rgb\\(${Ye},${Ye},${Ye}\\)$`), _d = new RegExp(`^rgba\\(${Pt},${Pt},${Pt},${an}\\)$`), $d = new RegExp(`^rgba\\(${Ye},${Ye},${Ye},${an}\\)$`), Cd = new RegExp(`^hsl\\(${an},${Ye},${Ye}\\)$`), Sd = new RegExp(`^hsla\\(${an},${Ye},${Ye},${an}\\)$`), oo = {
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
Oi(cn, sn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ao,
  // Deprecated! Use color.formatHex.
  formatHex: ao,
  formatHex8: Ed,
  formatHsl: Ad,
  formatRgb: so,
  toString: so
});
function ao() {
  return this.rgb().formatHex();
}
function Ed() {
  return this.rgb().formatHex8();
}
function Ad() {
  return la(this).formatHsl();
}
function so() {
  return this.rgb().formatRgb();
}
function sn(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = vd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ro(t) : n === 3 ? new Le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? yn(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? yn(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = wd.exec(e)) ? new Le(t[1], t[2], t[3], 1) : (t = kd.exec(e)) ? new Le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = _d.exec(e)) ? yn(t[1], t[2], t[3], t[4]) : (t = $d.exec(e)) ? yn(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Cd.exec(e)) ? po(t[1], t[2] / 100, t[3] / 100, 1) : (t = Sd.exec(e)) ? po(t[1], t[2] / 100, t[3] / 100, t[4]) : oo.hasOwnProperty(e) ? ro(oo[e]) : e === "transparent" ? new Le(NaN, NaN, NaN, 0) : null;
}
function ro(e) {
  return new Le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function yn(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Le(e, t, n, i);
}
function Md(e) {
  return e instanceof cn || (e = sn(e)), e ? (e = e.rgb(), new Le(e.r, e.g, e.b, e.opacity)) : new Le();
}
function yi(e, t, n, i) {
  return arguments.length === 1 ? Md(e) : new Le(e, t, n, i ?? 1);
}
function Le(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
Oi(Le, yi, da(cn, {
  brighter(e) {
    return e = e == null ? Fn : Math.pow(Fn, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? on : Math.pow(on, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Le(yt(this.r), yt(this.g), yt(this.b), Wn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: lo,
  // Deprecated! Use color.formatHex.
  formatHex: lo,
  formatHex8: Pd,
  formatRgb: co,
  toString: co
}));
function lo() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}`;
}
function Pd() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}${ht((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function co() {
  const e = Wn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Wn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ht(e) {
  return e = yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function po(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, n, i);
}
function la(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof cn || (e = sn(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, o = Math.min(t, n, i), a = Math.max(t, n, i), r = NaN, c = a - o, s = (a + o) / 2;
  return c ? (t === a ? r = (n - i) / c + (n < i) * 6 : n === a ? r = (i - t) / c + 2 : r = (t - n) / c + 4, c /= s < 0.5 ? a + o : 2 - a - o, r *= 60) : c = s > 0 && s < 1 ? 0 : r, new He(r, c, s, e.opacity);
}
function Td(e, t, n, i) {
  return arguments.length === 1 ? la(e) : new He(e, t, n, i ?? 1);
}
function He(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
Oi(He, Td, da(cn, {
  brighter(e) {
    return e = e == null ? Fn : Math.pow(Fn, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? on : Math.pow(on, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - i;
    return new Le(
      di(e >= 240 ? e - 240 : e + 120, o, i),
      di(e, o, i),
      di(e < 120 ? e + 240 : e - 120, o, i),
      this.opacity
    );
  },
  clamp() {
    return new He(uo(this.h), In(this.s), In(this.l), Wn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Wn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${uo(this.h)}, ${In(this.s) * 100}%, ${In(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function uo(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function In(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function di(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ca = (e) => () => e;
function Od(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Nd(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function Rd(e) {
  return (e = +e) == 1 ? pa : function(t, n) {
    return n - t ? Nd(t, n, e) : ca(isNaN(t) ? n : t);
  };
}
function pa(e, t) {
  var n = t - e;
  return n ? Od(e, n) : ca(isNaN(e) ? t : e);
}
const mo = (function e(t) {
  var n = Rd(t);
  function i(o, a) {
    var r = n((o = yi(o)).r, (a = yi(a)).r), c = n(o.g, a.g), s = n(o.b, a.b), p = pa(o.opacity, a.opacity);
    return function(y) {
      return o.r = r(y), o.g = c(y), o.b = s(y), o.opacity = p(y), o + "";
    };
  }
  return i.gamma = e, i;
})(1);
function it(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Ii = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, li = new RegExp(Ii.source, "g");
function Ld(e) {
  return function() {
    return e;
  };
}
function Dd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function zd(e, t) {
  var n = Ii.lastIndex = li.lastIndex = 0, i, o, a, r = -1, c = [], s = [];
  for (e = e + "", t = t + ""; (i = Ii.exec(e)) && (o = li.exec(t)); )
    (a = o.index) > n && (a = t.slice(n, a), c[r] ? c[r] += a : c[++r] = a), (i = i[0]) === (o = o[0]) ? c[r] ? c[r] += o : c[++r] = o : (c[++r] = null, s.push({ i: r, x: it(i, o) })), n = li.lastIndex;
  return n < t.length && (a = t.slice(n), c[r] ? c[r] += a : c[++r] = a), c.length < 2 ? s[0] ? Dd(s[0].x) : Ld(t) : (t = s.length, function(p) {
    for (var y = 0, h; y < t; ++y) c[(h = s[y]).i] = h.x(p);
    return c.join("");
  });
}
var fo = 180 / Math.PI, bi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ua(e, t, n, i, o, a) {
  var r, c, s;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (s = e * n + t * i) && (n -= e * s, i -= t * s), (c = Math.sqrt(n * n + i * i)) && (n /= c, i /= c, s /= c), e * i < t * n && (e = -e, t = -t, s = -s, r = -r), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * fo,
    skewX: Math.atan(s) * fo,
    scaleX: r,
    scaleY: c
  };
}
var bn;
function Ud(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? bi : ua(t.a, t.b, t.c, t.d, t.e, t.f);
}
function qd(e) {
  return e == null || (bn || (bn = document.createElementNS("http://www.w3.org/2000/svg", "g")), bn.setAttribute("transform", e), !(e = bn.transform.baseVal.consolidate())) ? bi : (e = e.matrix, ua(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ma(e, t, n, i) {
  function o(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, y, h, m, f, b) {
    if (p !== h || y !== m) {
      var d = f.push("translate(", null, t, null, n);
      b.push({ i: d - 4, x: it(p, h) }, { i: d - 2, x: it(y, m) });
    } else (h || m) && f.push("translate(" + h + t + m + n);
  }
  function r(p, y, h, m) {
    p !== y ? (p - y > 180 ? y += 360 : y - p > 180 && (p += 360), m.push({ i: h.push(o(h) + "rotate(", null, i) - 2, x: it(p, y) })) : y && h.push(o(h) + "rotate(" + y + i);
  }
  function c(p, y, h, m) {
    p !== y ? m.push({ i: h.push(o(h) + "skewX(", null, i) - 2, x: it(p, y) }) : y && h.push(o(h) + "skewX(" + y + i);
  }
  function s(p, y, h, m, f, b) {
    if (p !== h || y !== m) {
      var d = f.push(o(f) + "scale(", null, ",", null, ")");
      b.push({ i: d - 4, x: it(p, h) }, { i: d - 2, x: it(y, m) });
    } else (h !== 1 || m !== 1) && f.push(o(f) + "scale(" + h + "," + m + ")");
  }
  return function(p, y) {
    var h = [], m = [];
    return p = e(p), y = e(y), a(p.translateX, p.translateY, y.translateX, y.translateY, h, m), r(p.rotate, y.rotate, h, m), c(p.skewX, y.skewX, h, m), s(p.scaleX, p.scaleY, y.scaleX, y.scaleY, h, m), p = y = null, function(f) {
      for (var b = -1, d = m.length, l; ++b < d; ) h[(l = m[b]).i] = l.x(f);
      return h.join("");
    };
  };
}
var Bd = ma(Ud, "px, ", "px)", "deg)"), Fd = ma(qd, ", ", ")", ")"), Wd = 1e-12;
function ho(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function jd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Vd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Hd = (function e(t, n, i) {
  function o(a, r) {
    var c = a[0], s = a[1], p = a[2], y = r[0], h = r[1], m = r[2], f = y - c, b = h - s, d = f * f + b * b, l, g;
    if (d < Wd)
      g = Math.log(m / p) / t, l = function(D) {
        return [
          c + D * f,
          s + D * b,
          p * Math.exp(t * D * g)
        ];
      };
    else {
      var k = Math.sqrt(d), x = (m * m - p * p + i * d) / (2 * p * n * k), _ = (m * m - p * p - i * d) / (2 * m * n * k), R = Math.log(Math.sqrt(x * x + 1) - x), L = Math.log(Math.sqrt(_ * _ + 1) - _);
      g = (L - R) / t, l = function(D) {
        var q = D * g, v = ho(R), E = p / (n * k) * (v * Vd(t * q + R) - jd(R));
        return [
          c + E * f,
          s + E * b,
          p * v / ho(t * q + R)
        ];
      };
    }
    return l.duration = g * 1e3 * t / Math.SQRT2, l;
  }
  return o.rho = function(a) {
    var r = Math.max(1e-3, +a), c = r * r, s = c * c;
    return e(r, c, s);
  }, o;
})(Math.SQRT2, 2, 4);
var Lt = 0, Kt = 0, Ft = 0, fa = 1e3, jn, Yt, Vn = 0, bt = 0, Xn = 0, rn = typeof performance == "object" && performance.now ? performance : Date, ha = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ni() {
  return bt || (ha(Gd), bt = rn.now() + Xn);
}
function Gd() {
  bt = 0;
}
function Hn() {
  this._call = this._time = this._next = null;
}
Hn.prototype = ga.prototype = {
  constructor: Hn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ni() : +n) + (t == null ? 0 : +t), !this._next && Yt !== this && (Yt ? Yt._next = this : jn = this, Yt = this), this._call = e, this._time = n, xi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xi());
  }
};
function ga(e, t, n) {
  var i = new Hn();
  return i.restart(e, t, n), i;
}
function Kd() {
  Ni(), ++Lt;
  for (var e = jn, t; e; )
    (t = bt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Lt;
}
function go() {
  bt = (Vn = rn.now()) + Xn, Lt = Kt = 0;
  try {
    Kd();
  } finally {
    Lt = 0, Xd(), bt = 0;
  }
}
function Yd() {
  var e = rn.now(), t = e - Vn;
  t > fa && (Xn -= t, Vn = e);
}
function Xd() {
  for (var e, t = jn, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : jn = n);
  Yt = e, xi(i);
}
function xi(e) {
  if (!Lt) {
    Kt && (Kt = clearTimeout(Kt));
    var t = e - bt;
    t > 24 ? (e < 1 / 0 && (Kt = setTimeout(go, e - rn.now() - Xn)), Ft && (Ft = clearInterval(Ft))) : (Ft || (Vn = rn.now(), Ft = setInterval(Yd, fa)), Lt = 1, ha(go));
  }
}
function yo(e, t, n) {
  var i = new Hn();
  return t = t == null ? 0 : +t, i.restart((o) => {
    i.stop(), e(o + t);
  }, t, n), i;
}
var Jd = Ti("start", "end", "cancel", "interrupt"), Qd = [], ya = 0, Io = 1, vi = 2, Tn = 3, bo = 4, wi = 5, On = 6;
function Jn(e, t, n, i, o, a) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (n in r) return;
  Zd(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Jd,
    tween: Qd,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: ya
  });
}
function Ri(e, t) {
  var n = Ke(e, t);
  if (n.state > ya) throw new Error("too late; already scheduled");
  return n;
}
function Xe(e, t) {
  var n = Ke(e, t);
  if (n.state > Tn) throw new Error("too late; already running");
  return n;
}
function Ke(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Zd(e, t, n) {
  var i = e.__transition, o;
  i[t] = n, n.timer = ga(a, 0, n.time);
  function a(p) {
    n.state = Io, n.timer.restart(r, n.delay, n.time), n.delay <= p && r(p - n.delay);
  }
  function r(p) {
    var y, h, m, f;
    if (n.state !== Io) return s();
    for (y in i)
      if (f = i[y], f.name === n.name) {
        if (f.state === Tn) return yo(r);
        f.state === bo ? (f.state = On, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete i[y]) : +y < t && (f.state = On, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete i[y]);
      }
    if (yo(function() {
      n.state === Tn && (n.state = bo, n.timer.restart(c, n.delay, n.time), c(p));
    }), n.state = vi, n.on.call("start", e, e.__data__, n.index, n.group), n.state === vi) {
      for (n.state = Tn, o = new Array(m = n.tween.length), y = 0, h = -1; y < m; ++y)
        (f = n.tween[y].value.call(e, e.__data__, n.index, n.group)) && (o[++h] = f);
      o.length = h + 1;
    }
  }
  function c(p) {
    for (var y = p < n.duration ? n.ease.call(null, p / n.duration) : (n.timer.restart(s), n.state = wi, 1), h = -1, m = o.length; ++h < m; )
      o[h].call(e, y);
    n.state === wi && (n.on.call("end", e, e.__data__, n.index, n.group), s());
  }
  function s() {
    n.state = On, n.timer.stop(), delete i[t];
    for (var p in i) return;
    delete e.__transition;
  }
}
function Nn(e, t) {
  var n = e.__transition, i, o, a = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((i = n[r]).name !== t) {
        a = !1;
        continue;
      }
      o = i.state > vi && i.state < wi, i.state = On, i.timer.stop(), i.on.call(o ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[r];
    }
    a && delete e.__transition;
  }
}
function el(e) {
  return this.each(function() {
    Nn(this, e);
  });
}
function tl(e, t) {
  var n, i;
  return function() {
    var o = Xe(this, e), a = o.tween;
    if (a !== n) {
      i = n = a;
      for (var r = 0, c = i.length; r < c; ++r)
        if (i[r].name === t) {
          i = i.slice(), i.splice(r, 1);
          break;
        }
    }
    o.tween = i;
  };
}
function nl(e, t, n) {
  var i, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = Xe(this, e), r = a.tween;
    if (r !== i) {
      o = (i = r).slice();
      for (var c = { name: t, value: n }, s = 0, p = o.length; s < p; ++s)
        if (o[s].name === t) {
          o[s] = c;
          break;
        }
      s === p && o.push(c);
    }
    a.tween = o;
  };
}
function il(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Ke(this.node(), n).tween, o = 0, a = i.length, r; o < a; ++o)
      if ((r = i[o]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? tl : nl)(n, e, t));
}
function Li(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var o = Xe(this, i);
    (o.value || (o.value = {}))[t] = n.apply(this, arguments);
  }), function(o) {
    return Ke(o, i).value[t];
  };
}
function Ia(e, t) {
  var n;
  return (typeof t == "number" ? it : t instanceof sn ? mo : (n = sn(t)) ? (t = n, mo) : zd)(e, t);
}
function ol(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function al(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function sl(e, t, n) {
  var i, o = n + "", a;
  return function() {
    var r = this.getAttribute(e);
    return r === o ? null : r === i ? a : a = t(i = r, n);
  };
}
function rl(e, t, n) {
  var i, o = n + "", a;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === o ? null : r === i ? a : a = t(i = r, n);
  };
}
function dl(e, t, n) {
  var i, o, a;
  return function() {
    var r, c = n(this), s;
    return c == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), s = c + "", r === s ? null : r === i && s === o ? a : (o = s, a = t(i = r, c)));
  };
}
function ll(e, t, n) {
  var i, o, a;
  return function() {
    var r, c = n(this), s;
    return c == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), s = c + "", r === s ? null : r === i && s === o ? a : (o = s, a = t(i = r, c)));
  };
}
function cl(e, t) {
  var n = Yn(e), i = n === "transform" ? Fd : Ia;
  return this.attrTween(e, typeof t == "function" ? (n.local ? ll : dl)(n, i, Li(this, "attr." + e, t)) : t == null ? (n.local ? al : ol)(n) : (n.local ? rl : sl)(n, i, t));
}
function pl(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function ul(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ml(e, t) {
  var n, i;
  function o() {
    var a = t.apply(this, arguments);
    return a !== i && (n = (i = a) && ul(e, a)), n;
  }
  return o._value = t, o;
}
function fl(e, t) {
  var n, i;
  function o() {
    var a = t.apply(this, arguments);
    return a !== i && (n = (i = a) && pl(e, a)), n;
  }
  return o._value = t, o;
}
function hl(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = Yn(e);
  return this.tween(n, (i.local ? ml : fl)(i, t));
}
function gl(e, t) {
  return function() {
    Ri(this, e).delay = +t.apply(this, arguments);
  };
}
function yl(e, t) {
  return t = +t, function() {
    Ri(this, e).delay = t;
  };
}
function Il(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? gl : yl)(t, e)) : Ke(this.node(), t).delay;
}
function bl(e, t) {
  return function() {
    Xe(this, e).duration = +t.apply(this, arguments);
  };
}
function xl(e, t) {
  return t = +t, function() {
    Xe(this, e).duration = t;
  };
}
function vl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? bl : xl)(t, e)) : Ke(this.node(), t).duration;
}
function wl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Xe(this, e).ease = t;
  };
}
function kl(e) {
  var t = this._id;
  return arguments.length ? this.each(wl(t, e)) : Ke(this.node(), t).ease;
}
function _l(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Xe(this, e).ease = n;
  };
}
function $l(e) {
  if (typeof e != "function") throw new Error();
  return this.each(_l(this._id, e));
}
function Cl(e) {
  typeof e != "function" && (e = Qo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var a = t[o], r = a.length, c = i[o] = [], s, p = 0; p < r; ++p)
      (s = a[p]) && e.call(s, s.__data__, p, a) && c.push(s);
  return new Ze(i, this._parents, this._name, this._id);
}
function Sl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, o = n.length, a = Math.min(i, o), r = new Array(i), c = 0; c < a; ++c)
    for (var s = t[c], p = n[c], y = s.length, h = r[c] = new Array(y), m, f = 0; f < y; ++f)
      (m = s[f] || p[f]) && (h[f] = m);
  for (; c < i; ++c)
    r[c] = t[c];
  return new Ze(r, this._parents, this._name, this._id);
}
function El(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Al(e, t, n) {
  var i, o, a = El(t) ? Ri : Xe;
  return function() {
    var r = a(this, e), c = r.on;
    c !== i && (o = (i = c).copy()).on(t, n), r.on = o;
  };
}
function Ml(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ke(this.node(), n).on.on(e) : this.each(Al(n, e, t));
}
function Pl(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Tl() {
  return this.on("end.remove", Pl(this._id));
}
function Ol(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Mi(e));
  for (var i = this._groups, o = i.length, a = new Array(o), r = 0; r < o; ++r)
    for (var c = i[r], s = c.length, p = a[r] = new Array(s), y, h, m = 0; m < s; ++m)
      (y = c[m]) && (h = e.call(y, y.__data__, m, c)) && ("__data__" in y && (h.__data__ = y.__data__), p[m] = h, Jn(p[m], t, n, m, p, Ke(y, n)));
  return new Ze(a, this._parents, t, n);
}
function Nl(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Jo(e));
  for (var i = this._groups, o = i.length, a = [], r = [], c = 0; c < o; ++c)
    for (var s = i[c], p = s.length, y, h = 0; h < p; ++h)
      if (y = s[h]) {
        for (var m = e.call(y, y.__data__, h, s), f, b = Ke(y, n), d = 0, l = m.length; d < l; ++d)
          (f = m[d]) && Jn(f, t, n, d, m, b);
        a.push(m), r.push(y);
      }
  return new Ze(a, r, t, n);
}
var Rl = ln.prototype.constructor;
function Ll() {
  return new Rl(this._groups, this._parents);
}
function Dl(e, t) {
  var n, i, o;
  return function() {
    var a = Rt(this, e), r = (this.style.removeProperty(e), Rt(this, e));
    return a === r ? null : a === n && r === i ? o : o = t(n = a, i = r);
  };
}
function ba(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function zl(e, t, n) {
  var i, o = n + "", a;
  return function() {
    var r = Rt(this, e);
    return r === o ? null : r === i ? a : a = t(i = r, n);
  };
}
function Ul(e, t, n) {
  var i, o, a;
  return function() {
    var r = Rt(this, e), c = n(this), s = c + "";
    return c == null && (s = c = (this.style.removeProperty(e), Rt(this, e))), r === s ? null : r === i && s === o ? a : (o = s, a = t(i = r, c));
  };
}
function ql(e, t) {
  var n, i, o, a = "style." + t, r = "end." + a, c;
  return function() {
    var s = Xe(this, e), p = s.on, y = s.value[a] == null ? c || (c = ba(t)) : void 0;
    (p !== n || o !== y) && (i = (n = p).copy()).on(r, o = y), s.on = i;
  };
}
function Bl(e, t, n) {
  var i = (e += "") == "transform" ? Bd : Ia;
  return t == null ? this.styleTween(e, Dl(e, i)).on("end.style." + e, ba(e)) : typeof t == "function" ? this.styleTween(e, Ul(e, i, Li(this, "style." + e, t))).each(ql(this._id, e)) : this.styleTween(e, zl(e, i, t), n).on("end.style." + e, null);
}
function Fl(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function Wl(e, t, n) {
  var i, o;
  function a() {
    var r = t.apply(this, arguments);
    return r !== o && (i = (o = r) && Fl(e, r, n)), i;
  }
  return a._value = t, a;
}
function jl(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Wl(e, t, n ?? ""));
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
function Gl(e) {
  return this.tween("text", typeof e == "function" ? Hl(Li(this, "text", e)) : Vl(e == null ? "" : e + ""));
}
function Kl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Yl(e) {
  var t, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && Kl(o)), t;
  }
  return i._value = e, i;
}
function Xl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Yl(e));
}
function Jl() {
  for (var e = this._name, t = this._id, n = xa(), i = this._groups, o = i.length, a = 0; a < o; ++a)
    for (var r = i[a], c = r.length, s, p = 0; p < c; ++p)
      if (s = r[p]) {
        var y = Ke(s, t);
        Jn(s, e, n, p, r, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Ze(i, this._parents, e, n);
}
function Ql() {
  var e, t, n = this, i = n._id, o = n.size();
  return new Promise(function(a, r) {
    var c = { value: r }, s = { value: function() {
      --o === 0 && a();
    } };
    n.each(function() {
      var p = Xe(this, i), y = p.on;
      y !== e && (t = (e = y).copy(), t._.cancel.push(c), t._.interrupt.push(c), t._.end.push(s)), p.on = t;
    }), o === 0 && a();
  });
}
var Zl = 0;
function Ze(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function xa() {
  return ++Zl;
}
var Je = ln.prototype;
Ze.prototype = {
  constructor: Ze,
  select: Ol,
  selectAll: Nl,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: Cl,
  merge: Sl,
  selection: Ll,
  transition: Jl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: Ml,
  attr: cl,
  attrTween: hl,
  style: Bl,
  styleTween: jl,
  text: Gl,
  textTween: Xl,
  remove: Tl,
  tween: il,
  delay: Il,
  duration: vl,
  ease: kl,
  easeVarying: $l,
  end: Ql,
  [Symbol.iterator]: Je[Symbol.iterator]
};
function ec(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var tc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ec
};
function nc(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function ic(e) {
  var t, n;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = xa(), (n = tc).time = Ni(), e = e == null ? null : e + "");
  for (var i = this._groups, o = i.length, a = 0; a < o; ++a)
    for (var r = i[a], c = r.length, s, p = 0; p < c; ++p)
      (s = r[p]) && Jn(s, e, t, p, r, n || nc(s, t));
  return new Ze(i, this._parents, e, t);
}
ln.prototype.interrupt = el;
ln.prototype.transition = ic;
const xn = (e) => () => e;
function oc(e, {
  sourceEvent: t,
  target: n,
  transform: i,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: o }
  });
}
function Qe(e, t, n) {
  this.k = e, this.x = t, this.y = n;
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
function ci(e) {
  e.stopImmediatePropagation();
}
function Wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ac(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function sc() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function xo() {
  return this.__zoom || Qt;
}
function rc(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function dc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function lc(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], o = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o),
    r > a ? (a + r) / 2 : Math.min(0, a) || Math.max(0, r)
  );
}
function cc() {
  var e = ac, t = sc, n = lc, i = rc, o = dc, a = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, s = Hd, p = Ti("start", "zoom", "end"), y, h, m, f = 500, b = 150, d = 0, l = 10;
  function g(I) {
    I.property("__zoom", xo).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", v).on("dblclick.zoom", E).filter(o).on("touchstart.zoom", V).on("touchmove.zoom", oe).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  g.transform = function(I, P, C, w) {
    var $ = I.selection ? I.selection() : I;
    $.property("__zoom", xo), I !== $ ? R(I, P, C, w) : $.interrupt().each(function() {
      L(this, arguments).event(w).start().zoom(null, typeof P == "function" ? P.apply(this, arguments) : P).end();
    });
  }, g.scaleBy = function(I, P, C, w) {
    g.scaleTo(I, function() {
      var $ = this.__zoom.k, M = typeof P == "function" ? P.apply(this, arguments) : P;
      return $ * M;
    }, C, w);
  }, g.scaleTo = function(I, P, C, w) {
    g.transform(I, function() {
      var $ = t.apply(this, arguments), M = this.__zoom, S = C == null ? _($) : typeof C == "function" ? C.apply(this, arguments) : C, T = M.invert(S), N = typeof P == "function" ? P.apply(this, arguments) : P;
      return n(x(k(M, N), S, T), $, r);
    }, C, w);
  }, g.translateBy = function(I, P, C, w) {
    g.transform(I, function() {
      return n(this.__zoom.translate(
        typeof P == "function" ? P.apply(this, arguments) : P,
        typeof C == "function" ? C.apply(this, arguments) : C
      ), t.apply(this, arguments), r);
    }, null, w);
  }, g.translateTo = function(I, P, C, w, $) {
    g.transform(I, function() {
      var M = t.apply(this, arguments), S = this.__zoom, T = w == null ? _(M) : typeof w == "function" ? w.apply(this, arguments) : w;
      return n(Qt.translate(T[0], T[1]).scale(S.k).translate(
        typeof P == "function" ? -P.apply(this, arguments) : -P,
        typeof C == "function" ? -C.apply(this, arguments) : -C
      ), M, r);
    }, w, $);
  };
  function k(I, P) {
    return P = Math.max(a[0], Math.min(a[1], P)), P === I.k ? I : new Qe(P, I.x, I.y);
  }
  function x(I, P, C) {
    var w = P[0] - C[0] * I.k, $ = P[1] - C[1] * I.k;
    return w === I.x && $ === I.y ? I : new Qe(I.k, w, $);
  }
  function _(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function R(I, P, C, w) {
    I.on("start.zoom", function() {
      L(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var $ = this, M = arguments, S = L($, M).event(w), T = t.apply($, M), N = C == null ? _(T) : typeof C == "function" ? C.apply($, M) : C, z = Math.max(T[1][0] - T[0][0], T[1][1] - T[0][1]), B = $.__zoom, H = typeof P == "function" ? P.apply($, M) : P, de = s(B.invert(N).concat(z / B.k), H.invert(N).concat(z / H.k));
      return function(ce) {
        if (ce === 1) ce = H;
        else {
          var W = de(ce), G = z / W[2];
          ce = new Qe(G, N[0] - W[0] * G, N[1] - W[1] * G);
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
      var P = Ve(this.that).datum();
      p.call(
        I,
        this.that,
        new oc(I, {
          sourceEvent: this.sourceEvent,
          target: g,
          transform: this.that.__zoom,
          dispatch: p
        }),
        P
      );
    }
  };
  function q(I, ...P) {
    if (!e.apply(this, arguments)) return;
    var C = L(this, P).event(I), w = this.__zoom, $ = Math.max(a[0], Math.min(a[1], w.k * Math.pow(2, i.apply(this, arguments)))), M = ct(I);
    if (C.wheel)
      (C.mouse[0][0] !== M[0] || C.mouse[0][1] !== M[1]) && (C.mouse[1] = w.invert(C.mouse[0] = M)), clearTimeout(C.wheel);
    else {
      if (w.k === $) return;
      C.mouse = [M, w.invert(M)], Nn(this), C.start();
    }
    Wt(I), C.wheel = setTimeout(S, b), C.zoom("mouse", n(x(k(w, $), C.mouse[0], C.mouse[1]), C.extent, r));
    function S() {
      C.wheel = null, C.end();
    }
  }
  function v(I, ...P) {
    if (m || !e.apply(this, arguments)) return;
    var C = I.currentTarget, w = L(this, P, !0).event(I), $ = Ve(I.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", z, !0), M = ct(I, C), S = I.clientX, T = I.clientY;
    bd(I.view), ci(I), w.mouse = [M, this.__zoom.invert(M)], Nn(this), w.start();
    function N(B) {
      if (Wt(B), !w.moved) {
        var H = B.clientX - S, de = B.clientY - T;
        w.moved = H * H + de * de > d;
      }
      w.event(B).zoom("mouse", n(x(w.that.__zoom, w.mouse[0] = ct(B, C), w.mouse[1]), w.extent, r));
    }
    function z(B) {
      $.on("mousemove.zoom mouseup.zoom", null), xd(B.view, w.moved), Wt(B), w.event(B).end();
    }
  }
  function E(I, ...P) {
    if (e.apply(this, arguments)) {
      var C = this.__zoom, w = ct(I.changedTouches ? I.changedTouches[0] : I, this), $ = C.invert(w), M = C.k * (I.shiftKey ? 0.5 : 2), S = n(x(k(C, M), w, $), t.apply(this, P), r);
      Wt(I), c > 0 ? Ve(this).transition().duration(c).call(R, S, w, I) : Ve(this).call(g.transform, S, w, I);
    }
  }
  function V(I, ...P) {
    if (e.apply(this, arguments)) {
      var C = I.touches, w = C.length, $ = L(this, P, I.changedTouches.length === w).event(I), M, S, T, N;
      for (ci(I), S = 0; S < w; ++S)
        T = C[S], N = ct(T, this), N = [N, this.__zoom.invert(N), T.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== N[2] && ($.touch1 = N, $.taps = 0) : ($.touch0 = N, M = !0, $.taps = 1 + !!y);
      y && (y = clearTimeout(y)), M && ($.taps < 2 && (h = N[0], y = setTimeout(function() {
        y = null;
      }, f)), Nn(this), $.start());
    }
  }
  function oe(I, ...P) {
    if (this.__zooming) {
      var C = L(this, P).event(I), w = I.changedTouches, $ = w.length, M, S, T, N;
      for (Wt(I), M = 0; M < $; ++M)
        S = w[M], T = ct(S, this), C.touch0 && C.touch0[2] === S.identifier ? C.touch0[0] = T : C.touch1 && C.touch1[2] === S.identifier && (C.touch1[0] = T);
      if (S = C.that.__zoom, C.touch1) {
        var z = C.touch0[0], B = C.touch0[1], H = C.touch1[0], de = C.touch1[1], ce = (ce = H[0] - z[0]) * ce + (ce = H[1] - z[1]) * ce, W = (W = de[0] - B[0]) * W + (W = de[1] - B[1]) * W;
        S = k(S, Math.sqrt(ce / W)), T = [(z[0] + H[0]) / 2, (z[1] + H[1]) / 2], N = [(B[0] + de[0]) / 2, (B[1] + de[1]) / 2];
      } else if (C.touch0) T = C.touch0[0], N = C.touch0[1];
      else return;
      C.zoom("touch", n(x(S, T, N), C.extent, r));
    }
  }
  function te(I, ...P) {
    if (this.__zooming) {
      var C = L(this, P).event(I), w = I.changedTouches, $ = w.length, M, S;
      for (ci(I), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, f), M = 0; M < $; ++M)
        S = w[M], C.touch0 && C.touch0[2] === S.identifier ? delete C.touch0 : C.touch1 && C.touch1[2] === S.identifier && delete C.touch1;
      if (C.touch1 && !C.touch0 && (C.touch0 = C.touch1, delete C.touch1), C.touch0) C.touch0[1] = this.__zoom.invert(C.touch0[0]);
      else if (C.end(), C.taps === 2 && (S = ct(S, this), Math.hypot(h[0] - S[0], h[1] - S[1]) < l)) {
        var T = Ve(this).on("dblclick.zoom");
        T && T.apply(this, arguments);
      }
    }
  }
  return g.wheelDelta = function(I) {
    return arguments.length ? (i = typeof I == "function" ? I : xn(+I), g) : i;
  }, g.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : xn(!!I), g) : e;
  }, g.touchable = function(I) {
    return arguments.length ? (o = typeof I == "function" ? I : xn(!!I), g) : o;
  }, g.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : xn([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), g) : t;
  }, g.scaleExtent = function(I) {
    return arguments.length ? (a[0] = +I[0], a[1] = +I[1], g) : [a[0], a[1]];
  }, g.translateExtent = function(I) {
    return arguments.length ? (r[0][0] = +I[0][0], r[1][0] = +I[1][0], r[0][1] = +I[0][1], r[1][1] = +I[1][1], g) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, g.constrain = function(I) {
    return arguments.length ? (n = I, g) : n;
  }, g.duration = function(I) {
    return arguments.length ? (c = +I, g) : c;
  }, g.interpolate = function(I) {
    return arguments.length ? (s = I, g) : s;
  }, g.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? g : I;
  }, g.clickDistance = function(I) {
    return arguments.length ? (d = (I = +I) * I, g) : Math.sqrt(d);
  }, g.tapDistance = function(I) {
    return arguments.length ? (l = +I, g) : l;
  }, g;
}
var pc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, we = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? uc(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && pc(t, n, o), o;
};
function mc(e, t, n, i) {
  const o = t.x - e.x, a = t.y - e.y, r = i.x - n.x, c = i.y - n.y, s = o * c - a * r;
  if (Math.abs(s) < 1e-9) return null;
  const p = ((n.x - e.x) * c - (n.y - e.y) * r) / s, y = ((n.x - e.x) * a - (n.y - e.y) * o) / s;
  return p <= 0.02 || p >= 0.98 || y <= 0.02 || y >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * a, t: p };
}
function fc(e, t, n) {
  const i = n.x - t.x, o = n.y - t.y, a = i * i + o * o || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * o) / a)), c = t.x + r * i, s = t.y + r * o;
  return { dist: Math.hypot(e.x - c, e.y - s), t: r };
}
function hc(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], r = e[o + 1], c = Math.hypot(r.x - a.x, r.y - a.y) || 1, s = (r.x - a.x) / c, p = (r.y - a.y) / c, y = t.map(([m, f]) => mc(a, r, m, f)).filter((m) => m !== null).filter((m) => m.t * c > n + 2 && (1 - m.t) * c > n + 2).sort((m, f) => m.t - f.t);
    let h = -1 / 0;
    for (const m of y)
      m.t * c - n <= h + 2 || (i += ` L ${m.x - s * n} ${m.y - p * n}`, i += ` A ${n} ${n} 0 0 1 ${m.x + s * n} ${m.y + p * n}`, h = m.t * c + n);
    i += ` L ${r.x} ${r.y}`;
  }
  return i;
}
const At = {
  component: ne`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ne`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: ne`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  entity: ne`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: ne`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: ne`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: ne`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: ne`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: ne`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: ne`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: ne`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: ne`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: ne`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: ne`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: ne`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: ne`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: ne`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: ne`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
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
          const t = this.scene.nodes.find((n) => n.id === this.selectedId);
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
          const t = this.scene.edges.find((o) => o.id === this.selectedId), n = this.scene.nodes.find((o) => o.id === this.selectedId);
          if (n != null && n.parentId && !t && n.kind !== "domain-event" && n.kind !== "application-event" && n.kind !== "read-model" && n.kind !== "domain-service" && n.kind !== "query-service" && n.kind !== "use-case" && n.kind !== "external-use-case" && n.kind !== "external-system" && n.kind !== "external-table" && n.kind !== "mcp-server" && n.kind !== "api" && n.kind !== "proxy-api" && n.kind !== "api-operation")
            return;
          const i = t ?? n;
          i && (e.preventDefault(), this.emit("delete-requested", {
            elementType: t ? "edge" : "node",
            id: i.id,
            kind: i.kind
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
    const n = t.trim();
    n && n !== e.label && this.emit("node-renamed", { id: e.id, kind: e.kind, name: n });
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = cc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Ve(e).call(this._zoomBehavior);
  }
  willUpdate(e) {
    var t;
    if (e.has("scene") && (this._dragPos = null, this._dragGroup = null), this._selectedWaypoint && (e.has("selectedId") || e.has("edgePoints"))) {
      const n = this._selectedWaypoint;
      this.selectedId === n.edgeId && n.index < (((t = this.edgePoints[n.edgeId]) == null ? void 0 : t.length) ?? 0) || (this._selectedWaypoint = null);
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
    const t = this.scene.nodes, n = this.renderRoot.querySelector("svg.main");
    if (!t.length || !n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return;
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, r = this.fitInsets.top ?? 0, c = this.fitInsets.bottom ?? 0, s = Math.max(80, i.width - o - a), p = Math.max(80, i.height - r - c), y = Math.min(...t.map((l) => l.x - l.w / 2)) - e, h = Math.max(...t.map((l) => l.x + l.w / 2)) + e, m = Math.min(...t.map((l) => l.y - l.h / 2)) - e, f = Math.max(...t.map((l) => l.y + l.h / 2)) + e, b = Math.max(0.15, Math.min(s / (h - y), p / (f - m), 1.25)), d = Qt.translate(
      o + s / 2 - b * (y + h) / 2,
      r + p / 2 - b * (m + f) / 2
    ).scale(b);
    Ve(n).call(this._zoomBehavior.transform, d);
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
    var n, i, o;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (n = this._dragGroup) == null ? void 0 : n.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let a = e.parentId; a; a = (i = this.scene.nodes.find((r) => r.id === a)) == null ? void 0 : i.parentId) {
      const r = this.scene.nodes.find((s) => s.id === a);
      if (!r) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - r.x), y: e.y + (this._dragPos.y - r.y) };
      const c = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (c)
        return { x: e.x + (c.x - r.x), y: e.y + (c.y - r.y) };
    }
    return { x: e.x, y: e.y };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ---- node dragging ------------------------------------------------------
  /** Keep a dragged child inside its container's inner area (below the header). */
  clampToParent(e, t, n) {
    if (e.parentId) {
      const i = this.scene.nodes.find((o) => o.id === e.parentId);
      if (i) {
        const o = this.nodePos(i), a = o.x - i.w / 2 + 10 + e.w / 2, r = o.x + i.w / 2 - 10 - e.w / 2, c = o.y - i.h / 2 + 34 + e.h / 2, s = o.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), r), n = Math.min(Math.max(n, c), s);
      }
    }
    return { id: e.id, x: t, y: n };
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
    var i, o;
    const n = ((i = this.shadowRoot) == null ? void 0 : i.elementsFromPoint(e, t)) ?? [];
    for (const a of n) {
      const r = (o = a.closest) == null ? void 0 : o.call(a, "[data-node-id]");
      if (r) return r.getAttribute("data-node-id");
    }
    return null;
  }
  /** Scene coordinates for a client-space point (palette drops). */
  sceneFromClient(e, t) {
    const n = this.getBoundingClientRect();
    return {
      x: (e - n.left - this._t.x) / this._t.k,
      y: (t - n.top - this._t.y) / this._t.k
    };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const n = this.toScene(e), i = this.nodePos(t);
    let o = !1;
    const a = new Set(this.selectedIds), r = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (l) => a.has(l.id) && !(l.parentId && a.has(l.parentId))
    ) : null, c = r ? new Map(r.map((l) => [l.id, this.nodePos(l)])) : null, s = (l) => (l.shiftKey || l.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !r || l.shiftKey && t.kind === "external-system" && !r, p = r ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, y = p !== null, h = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const l = [], g = p === "menu" ? this.scene.nodes.filter((k) => k.kind === "ui-app") : this.scene.nodes.filter((k) => k.id === t.parentId);
      for (const k of g) {
        const x = this.scene.nodes.filter((D) => D.parentId === k.id && h.includes(D.kind ?? "") && D.id !== t.id).sort((D, q) => D.y - q.y), _ = k.x - k.w / 2 + 10, R = k.x + k.w / 2 - 10;
        for (const D of x) l.push({ x1: _, x2: R, y: D.y - D.h / 2 - 3, appId: k.id, beforeId: D.id });
        const L = x[x.length - 1];
        l.push({
          x1: _,
          x2: R,
          y: L ? L.y + L.h / 2 + 3 : k.y - k.h / 2 + 34 + 8,
          appId: k.id,
          beforeId: null
        });
      }
      return l;
    }, f = (l) => {
      const g = this.nodeIdAt(l), k = g && g !== t.id ? this.scene.nodes.find((x) => x.id === g) : void 0;
      return k ? k.kind === "external-system" ? k.id : k.parentId ?? null : null;
    }, b = (l) => {
      if ((l.buttons & 1) === 0) {
        d(l);
        return;
      }
      const g = this.toScene(l), k = g.x - n.x, x = g.y - n.y;
      if (!(!o && Math.hypot(k, x) < 3 / this._t.k))
        if (o = !0, r && c) {
          const _ = /* @__PURE__ */ new Map();
          for (const R of r) {
            const L = c.get(R.id), D = this.clampToParent(R, L.x + k, L.y + x);
            _.set(R.id, { x: D.x, y: D.y });
          }
          this._dragGroup = _;
        } else if (y) {
          this._dragPos = { id: t.id, x: i.x + k, y: i.y + x }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const _ = this.scene.nodes.filter(
            (L) => h.includes(L.kind ?? "") && L.id !== t.id && Math.abs(g.x - L.x) <= L.w / 2 + 8
          ), R = p === "menu" ? _.find((L) => Math.abs(g.y - L.y) < L.h * 0.28) : void 0;
          if (R)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: R.id }, this._hoverNodeId = R.id;
          else {
            let L = -1, D = 14;
            this._menuSlots.slots.forEach((q, v) => {
              if (g.x < q.x1 - 24 || g.x > q.x2 + 24) return;
              const E = Math.abs(g.y - q.y);
              E < D && (D = E, L = v);
            }), this._menuSlots = { ...this._menuSlots, active: L >= 0 ? L : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else s(l) ? (this._dragPos = { id: t.id, x: i.x + k, y: i.y + x }, this._hoverNodeId = f(l)) : (this._dragPos = this.clampToParent(t, i.x + k, i.y + x), this._hoverNodeId = null);
    }, d = (l) => {
      if (window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", d), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([g, k]) => ({ id: g, x: k.x, y: k.y }))
        });
      else if (o && this._dragPos && y) {
        const g = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const k = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (g != null && g.nestRowId)
          this.emit(k, { id: t.id, nestRowId: g.nestRowId });
        else if (g && g.active !== null) {
          const x = g.slots[g.active];
          this.emit(k, { id: t.id, appId: x.appId, beforeId: x.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (s(l)) {
          const g = f(l);
          if (l.ctrlKey && t.kind === "api") {
            g && g !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: g,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (g !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: g,
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
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", d);
  }
  // ---- container resize ----------------------------------------------------
  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  onResizePointerDown(e, t, n, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const o = t.container && !t.parentId, a = o ? 160 : 90, r = o ? 90 : 30, c = { x: t.x, y: t.y, w: t.w, h: t.h }, s = o ? this.scene.nodes.filter((l) => l.parentId === t.id) : [], p = Math.min(...s.map((l) => l.x - l.w / 2)), y = Math.max(...s.map((l) => l.x + l.w / 2)), h = Math.min(...s.map((l) => l.y - l.h / 2)), m = Math.max(...s.map((l) => l.y + l.h / 2)), f = Fa(
      s.map((l) => ({ dx: l.x - c.x, dy: l.y - c.y, w: l.w, h: l.h })),
      { w: a, h: r }
    ), b = (l) => {
      if ((l.buttons & 1) === 0) {
        d();
        return;
      }
      const g = this.toScene(l);
      if (l.shiftKey) {
        this._resize = {
          id: t.id,
          x: c.x,
          y: c.y,
          w: Math.max(f.w, 2 * Math.abs(g.x - c.x)),
          h: Math.max(f.h, 2 * Math.abs(g.y - c.y))
        };
        return;
      }
      const k = c.x - n * c.w / 2, x = c.y - i * c.h / 2, _ = n > 0 ? Math.max(g.x, k + a, s.length ? y + 10 : -1 / 0) : Math.min(g.x, k - a, s.length ? p - 10 : 1 / 0), R = i > 0 ? Math.max(g.y, x + r, s.length ? m + 10 : -1 / 0) : Math.min(g.y, x - r, s.length ? h - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (k + _) / 2,
        y: (x + R) / 2,
        w: Math.abs(_ - k),
        h: Math.abs(R - x)
      };
    }, d = () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, n) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const o = (r) => {
      if ((r.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const c = this.toScene(r);
      this._pendingLink = { sourceId: t.id, x: c.x, y: c.y }, this._hoverNodeId = this.nodeIdAt(r);
    }, a = (r) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const c = this.nodeIdAt(r);
      c && c !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: c,
        x: r.clientX,
        y: r.clientY,
        connectKind: n
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, n) {
    const { x: i, y: o } = this.nodePos(e), a = t - i, r = n - o, c = e.w / 2, s = e.h / 2;
    if (a === 0 && r === 0) return { x: i, y: o };
    const p = 1 / Math.max(Math.abs(a) / c, Math.abs(r) / s);
    return { x: i + a * p, y: o + r * p };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), n = this.scene.edges.filter(
      (o) => [o.sourceId, o.targetId].sort().join("|") === t
    );
    return n.length < 2 ? 0 : (n.findIndex((o) => o.id === e.id) - (n.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((y) => y.id === e.sourceId), n = this.scene.nodes.find((y) => y.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(n), r = i[0] ?? a, c = i[i.length - 1] ?? o;
    let s = this.borderPoint(t, r.x, r.y), p = this.borderPoint(n, c.x, c.y);
    if (!i.length) {
      const y = this.edgeOffset(e);
      if (y !== 0) {
        const h = Math.hypot(p.x - s.x, p.y - s.y) || 1, m = -(p.y - s.y) / h * y, f = (p.x - s.x) / h * y;
        s = { x: s.x + m, y: s.y + f }, p = { x: p.x + m, y: p.y + f };
      }
    }
    return [s, ...i, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    const i = t[n];
    let o = !1;
    const a = (c) => {
      if (!this._wpDrag) return;
      const s = this.toScene(c);
      if (!o && Math.hypot(s.x - i.x, s.y - i.y) < 4 / this._t.k) return;
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
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: o } = fc(t, e[i], e[i + 1]);
      o < n.dist && (n = { seg: i, dist: o });
    }
    return n.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, n) {
    const i = this.nearestSegment(t, n), o = [...this.edgePoints[e.id] ?? []];
    o.splice(i, 0, n), this._selectedWaypoint = { edgeId: e.id, index: i }, this.emit("edge-points-changed", { id: e.id, points: o });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, n) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const i = this.toScene(e), o = this.nearestSegment(n, i);
    let a = !1;
    const r = (s) => {
      if ((s.buttons & 1) === 0) {
        c();
        return;
      }
      const p = this.toScene(s);
      if (a) {
        if (this._wpDrag) {
          const y = [...this._wpDrag.points];
          y[o] = p, this._wpDrag = { ...this._wpDrag, points: y };
        }
      } else {
        if (Math.hypot(p.x - i.x, p.y - i.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const y = [...this.edgePoints[t.id] ?? []];
        y.splice(o, 0, p), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: y, index: o };
      }
    }, c = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", c), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", c);
  }
  removeWaypoint(e, t) {
    const n = [...this.edgePoints[e.id] ?? []];
    n.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: n });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const n = t.map((i) => `${i.x},${i.y}`).join(" ");
    return ne`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${n}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(i) => {
      i.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(i) => {
      i.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(i));
    }}
              @pointerdown=${(i) => this.onEdgeHitPointerDown(i, e, t)}>
          ${e.tooltip ? ne`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, n) {
    const i = e.color ?? "#64748b", o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), c = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, s = t.slice(1, -1);
    return ne`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${hc(t, n)}
              fill="none"
              class=${e.kind === "journey" ? "journey-flow" : ""}
              stroke=${i} stroke-width=${e.kind === "journey" || a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}></path>
        ${e.label ? ne`<text x=${c.x} y=${c.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
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
      const h = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === y;
      return ne`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${h ? 6 : 5}
                        fill=${h ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: y }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], y));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, y);
      }}>
                  <title>Arrastra para ajustar · Supr o doble click para quitar el punto</title>
                </circle>`;
    }) : ""}
      </g>
    `;
  }
  /**
   * A traveller runs each route of the active journey, one after another: the
   * circle enters at the origin, follows the legs — bends included — and hands
   * over to the next route when it arrives. SMIL chains the runs (each begins
   * when the previous ends; the last one wakes the first), so the whole tour
   * loops without a line of JS.
   */
  renderJourneyRunners(e) {
    const t = (this.scene.journeyRuns ?? []).map((i) => i.map((o) => e.get(o)).filter((o) => !!o)).filter((i) => i.length > 0);
    if (!t.length) return [];
    const n = [];
    return t.forEach((i, o) => {
      const a = [];
      for (const h of i)
        for (const m of h) {
          const f = a[a.length - 1];
          (!f || Math.hypot(m.x - f.x, m.y - f.y) > 0.5) && a.push(m);
        }
      if (a.length < 2) return;
      let r = 0;
      for (let h = 0; h < a.length - 1; h++)
        r += Math.hypot(a[h + 1].x - a[h].x, a[h + 1].y - a[h].y);
      const c = "M " + a.map((h) => `${h.x} ${h.y}`).join(" L "), s = Math.min(6, Math.max(1.4, r / 260)), p = `jrun${o}`, y = o === 0 ? `0s;jrun${t.length - 1}.end+0.4s` : `jrun${o - 1}.end+0.4s`;
      n.push(ne`
        <circle r="6.5" fill="#d97706" stroke="#ffffff" stroke-width="1.8"
                opacity="0" pointer-events="none">
          <animateMotion id=${p} path=${c} dur="${s}s" begin=${y} fill="remove"
                         calcMode="linear"></animateMotion>
          <set attributeName="opacity" to="1" begin="${p}.begin" end="${p}.end"></set>
        </circle>`);
    }), n;
  }
  markerId(e) {
    return e.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(e) {
    var m, f, b, d;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, r = !!e.parentId, c = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, s = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, p = c / 2, y = s / 2, h = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ne`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${n})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (b = this._dragGroup) != null && b.has(e.id) ? "none" : "auto"}
         @pointerdown=${(l) => this.onNodePointerDown(l, e)}
         @dblclick=${(l) => {
      l.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ne`<rect x=${-p - 4} y=${-y - 4} width=${c + 8} height=${s + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-y} width=${c} height=${s} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ne`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ne`<text x=${-p} y=${-y - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ne`<g transform="translate(${p - 13}, ${-y + 13})"
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
        ${e.symbol && At[e.symbol] && (!r || a) ? ne`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-y + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${At[e.symbol]}
              </g>` : ""}
        ${r && !a && e.symbol && At[e.symbol] ? ne`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${At[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ne`
              <foreignObject x=${-p + 6} y=${a ? -y + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(l) => l.stopPropagation()}
                  @keydown=${(l) => {
      l.stopPropagation(), l.key === "Enter" && this.commitRename(e, l.target.value), l.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(l) => this.commitRename(e, l.target.value)}
                />
              </foreignObject>` : r && !a ? ne`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : a ? ne`<text x=${-p + 12} y=${-y + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ne`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? ne`<line x1=${-p + 8} y1=${-y + 28} x2=${p - 8} y2=${-y + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (r ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, y],
      [0, -y]
    ].map(
      ([l, g]) => ne`
                <circle data-handle cx=${l} cy=${g} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(k) => this.onHandlePointerDown(k, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${i && this.connectable && ((d = e.extraHandles) != null && d.length) ? e.extraHandles.map(
      (l, g) => ne`
                <g transform="translate(${-p + 24 + g * 20}, ${-y})">
                  <circle data-handle r="7" fill=${l.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(k) => this.onHandlePointerDown(k, e, l.kind)}>
                    <title>${l.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(a || e.resizable) && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([l, g]) => ne`
                <rect data-resize x=${l * p - 6.5} y=${g * y - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${l * g > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(k) => this.onResizePointerDown(k, e, l, g)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return ne``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
    if (!e) return ne``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return ne`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let n = !1;
    const i = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", i), this._rubber = null;
    }, o = (r) => {
      if ((r.buttons & 1) === 0) {
        i();
        return;
      }
      const c = this.toScene(r);
      !n && Math.hypot(c.x - t.x, c.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: c });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", i), n && this._rubber) {
        const { a: r, b: c } = this._rubber, s = Math.min(r.x, c.x), p = Math.max(r.x, c.x), y = Math.min(r.y, c.y), h = Math.max(r.y, c.y), m = this.scene.nodes.filter((f) => {
          const b = this.nodePos(f);
          return b.x >= s && b.x <= p && b.y >= y && b.y <= h;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", i);
  }
  renderRubber() {
    if (!this._rubber) return ne``;
    const { a: e, b: t } = this._rubber;
    return ne`
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
    const n = Math.min(...t.map((r) => r.x - r.w / 2)) - e, i = Math.max(...t.map((r) => r.x + r.w / 2)) + e, o = Math.min(...t.map((r) => r.y - r.h / 2)) - e, a = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: n, minY: o, w: i - n, h: a - o };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), o = this._t.k, a = Qt.translate(i.width / 2 - o * e, i.height / 2 - o * t).scale(o);
    Ve(n).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - i.left) / n, a = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return A``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, c = o.width / this._t.k, s = o.height / this._t.k;
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
      this.onMinimapPointer(p, e, i);
    }}
        @pointermove=${(p) => {
      var y, h;
      (h = (y = p.currentTarget).hasPointerCapture) != null && h.call(y, p.pointerId) && this.onMinimapPointer(p, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((p) => {
      const y = this.nodePos(p);
      return ne`<rect
              x=${(y.x - p.w / 2 - e.minX) * i}
              y=${(y.y - p.h / 2 - e.minY) * i}
              width=${Math.max(2, p.w * i)}
              height=${Math.max(2, p.h * i)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * i}
            y=${(r - e.minY) * i}
            width=${c * i}
            height=${s * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], n = [], i = [], o = /* @__PURE__ */ new Map();
    this.scene.edges.forEach((r) => {
      const c = this.edgePolyline(r);
      if (c) {
        r.kind === "journey" && o.set(r.id, c), n.push(this.renderEdgeHit(r, c)), i.push(this.renderEdgeInk(r, c, [...t]));
        for (let s = 0; s < c.length - 1; s++) t.push([c[s], c[s + 1]]);
      }
    });
    const a = this.renderJourneyRunners(o);
    return A`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(r) => {
      const c = r.target;
      c.closest("[data-node-id]") || c.closest("[data-edge-id]") || this._spaceDown || r.button !== 0 || (r.buttons & 1) !== 0 && this.startRubberBand(r);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (r) => ne`
              <marker id="arrow-${this.markerId(r)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${r}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${n}
          ${this.scene.nodes.filter((r) => !r.parentId).map((r) => this.renderNode(r))}
          ${this.scene.nodes.filter((r) => r.parentId).map((r) => this.renderNode(r))}
          ${i}
          ${a}
          ${this._menuSlots ? ne`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (r, c) => ne`
                    <line x1=${r.x1} y1=${r.y} x2=${r.x2} y2=${r.y}
                          stroke=${c === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${c === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${c === this._menuSlots.active ? ne`<circle cx=${r.x1} cy=${r.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${r.x2} cy=${r.y} r="3.5" fill="#0284c7"></circle>` : ""}`
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
    /* Journey legs wear static dashes; the RUNNER carries the motion. */
    path.journey-flow {
      stroke-dasharray: 9 7;
    }

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
function vo(e) {
  const t = e.legs ?? [], n = /* @__PURE__ */ new Map();
  for (let a = 0; a <= t.length; a++) {
    let r = !1;
    for (const c of t) {
      const s = Math.max(0, ...(c.afterLegIds ?? []).map((p) => n.get(p) ?? 0)) + 1;
      s <= t.length && s !== (n.get(c.id) ?? 0) && (n.set(c.id, s), r = !0);
    }
    if (!r) break;
  }
  const i = /* @__PURE__ */ new Map();
  for (const a of t) {
    const r = n.get(a.id) ?? 1;
    i.set(r, [...i.get(r) ?? [], a.id]);
  }
  const o = /* @__PURE__ */ new Map();
  for (const [a, r] of i)
    r.forEach((c, s) => {
      o.set(c, r.length === 1 ? `${a}` : `${a}${String.fromCharCode(97 + s)}`);
    });
  return o;
}
function wo(e) {
  const t = e.legs ?? [], n = new Map(t.map((p) => [p.id, p])), i = /* @__PURE__ */ new Map();
  for (const p of t)
    for (const y of p.afterLegIds ?? [])
      i.set(y, [...i.get(y) ?? [], p.id]);
  const o = (p, y) => {
    const h = n.get(p);
    if (!h) return [];
    const m = i.get(p) ?? [], f = t.filter((b) => b.sourceId === h.targetId && b.id !== p).map((b) => b.id);
    return [.../* @__PURE__ */ new Set([...m, ...f])].filter((b) => !y.has(b));
  }, a = new Set(t.map((p) => p.targetId)), r = t.filter((p) => !(p.afterLegIds ?? []).length && !a.has(p.sourceId)).map((p) => p.id);
  !r.length && t.length && r.push(t[0].id);
  const c = [], s = (p, y) => {
    if (p.length > t.length) return;
    const h = o(p[p.length - 1], y);
    if (!h.length) {
      c.push(p);
      return;
    }
    for (const m of h) s([...p, m], /* @__PURE__ */ new Set([...y, m]));
  };
  for (const p of r) s([p], /* @__PURE__ */ new Set([p]));
  return c;
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
  e.edges.some((n) => n.id === t.id) || e.edges.push(t);
}
const St = (e) => e.trim().toLowerCase();
function gc(e, t) {
  var v, E, V, oe, te;
  const n = { nodes: /* @__PURE__ */ new Map(), edges: [] }, i = new Map(e.boundedContexts.map((I) => [I.id, I.name])), o = e.boundedContexts.flatMap(
    (I) => (I.useCases ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  ), a = new Set(o.map((I) => I.id)), r = e.aggregates ?? [], c = new Set(
    e.boundedContexts.flatMap((I) => (I.domainServices ?? []).map((P) => P.id))
  ), s = e.boundedContexts.flatMap(
    (I) => (I.domainEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !1 }))
  ), p = e.boundedContexts.flatMap(
    (I) => (I.applicationEvents ?? []).map((P) => ({ ...P, boundedContextId: I.id, application: !0 }))
  ), y = e.boundedContexts.flatMap(
    (I) => (I.readModels ?? []).map((P) => ({ ...P, boundedContextId: I.id }))
  );
  for (const I of o)
    Te(n, {
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
      tooltip: I.policy ? `${I.name} — policy de ${i.get(I.boundedContextId) ?? I.boundedContextId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${i.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  for (const I of o)
    (I.steps ?? []).forEach((P, C) => {
      Te(n, {
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
      }), me(n, {
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
    Te(n, {
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
      P.customCodeId && me(n, {
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
    Te(n, {
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
      tooltip: `${I.name} — agregado de ${i.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  const h = /* @__PURE__ */ new Map();
  for (const I of [...s, ...p])
    Te(n, {
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
      tooltip: `${I.name} — evento de ${i.get(I.boundedContextId) ?? I.boundedContextId}`
    }), h.set(St(I.name), I.id);
  const m = (I) => {
    if (!I || !I.trim()) return null;
    const P = h.get(St(I));
    if (P) return P;
    const C = `evname:${St(I)}`;
    return Te(n, {
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
  }, f = (I) => {
    const P = y.find((w) => w.id === I.id) ?? y.find((w) => I.name && St(w.name) === St(I.name)), C = (P == null ? void 0 : P.id) ?? (I.id || (I.name ? `rm:${St(I.name)}` : null));
    return C ? (Te(n, {
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
    P && (Te(n, {
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
    }), me(n, {
      id: `es-actor:${P.id}->${I.targetId}`,
      sourceId: P.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const P = (e.agentUses ?? []).filter((S) => S.agentId === I.id), C = (e.agentExternalUses ?? []).filter((S) => S.agentId === I.id), w = (e.agentRags ?? []).filter((S) => S.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((S) => S.agentId === I.id), M = (e.agentGatewayUses ?? []).some((S) => S.agentId === I.id) || (e.agentApiOpUses ?? []).some((S) => S.agentId === I.id) || (e.agentQueryUses ?? []).some((S) => S.agentId === I.id) || (e.agentDelegations ?? []).some((S) => S.agentId === I.id) || (e.agentTriggers ?? []).some((S) => S.agentId === I.id);
    if (!(!P.length && !C.length && !w.length && !$.length && !M)) {
      Te(n, {
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
        a.has(S.useCaseId) && me(n, {
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
          (z) => (z.useCases ?? []).some((B) => B.id === S.externalUseCaseId)
        );
        if (!T) continue;
        const N = (v = (T.useCases ?? []).find((z) => z.id === S.externalUseCaseId)) == null ? void 0 : v.name;
        Te(n, {
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
        }), me(n, {
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
          (z) => (z.mcpServers ?? []).some((B) => B.id === S.mcpServerId)
        );
        if (!T) continue;
        const N = (E = (T.mcpServers ?? []).find((z) => z.id === S.mcpServerId)) == null ? void 0 : E.name;
        Te(n, {
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
        }), me(n, {
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
      for (const S of w) {
        const T = (e.rags ?? []).find((N) => N.id === S.ragId);
        if (T) {
          Te(n, {
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
          }), me(n, {
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
            const z = f({ id: N });
            z && me(n, {
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
  const b = (I) => {
    const P = e.externalSystems.find((C) => C.id === I);
    return P ? (Te(n, {
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
    const P = b(I.externalSystemId);
    !P || !a.has(I.useCaseId) || me(n, {
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
    ), C = P ? b(P.id) : null;
    if (!C) continue;
    const w = (V = ((P == null ? void 0 : P.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : V.name;
    me(n, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: C,
      kind: "es-command-external",
      label: w,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: w ? `Llama a ${w} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !a.has(I.sourceId) || !n.nodes.has(I.targetId) || me(n, {
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
    !n.nodes.has(I.domainEventId) || !(n.nodes.has(I.sourceId) && (a.has(I.sourceId) || r.some((C) => C.id === I.sourceId) || c.has(I.sourceId))) || me(n, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const l = (I, P, C, w, $, M) => (Te(n, {
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
    badge: w,
    tooltip: $
  }), I), g = (I, P) => {
    const C = m(I);
    C && me(n, {
      id: `es-trigger:${C}->${P}`,
      sourceId: C,
      targetId: P,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, k = (I, P) => {
    !P || !a.has(P) || me(n, {
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
    g(I.eventName, P);
    for (const C of I.actions ?? []) {
      if (C.type === "CallUseCase" && k(P, C.useCaseId), C.type === "StartSaga" && C.sagaId) {
        const w = `saga:${C.sagaId}`;
        l(w, C.sagaId, "saga", "SAGA"), me(n, {
          id: `es-saga:${P}->${w}`,
          sourceId: P,
          targetId: w,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (C.type === "UpdateProjection" && C.projectionId) {
        const w = (e.projections ?? []).find(($) => $.id === C.projectionId);
        w && me(n, {
          id: `es-feeds:${P}->${w.id}`,
          sourceId: P,
          targetId: w.id,
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
      const M = n.nodes.has($) ? $ : null;
      M && me(n, {
        id: `es-trigger:${M}->${P}`,
        sourceId: M,
        targetId: P,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && n.nodes.has(I.sourceAggregateId) && me(n, {
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
      ), M = $ ? b($.id) : null;
      if (M) {
        const S = ((oe = ($.useCases ?? []).find((T) => T.id === C)) == null ? void 0 : oe.name) ?? ((te = ($.tables ?? []).find((T) => T.id === C)) == null ? void 0 : te.name);
        me(n, {
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
    const w = f({ id: I.readModelId, name: I.readModelName });
    w && me(n, {
      id: `es-projects:${P}->${w}`,
      sourceId: P,
      targetId: w,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const C = m(I.triggerEvent), w = f({ name: I.readModelName ?? `${I.triggerEvent}View` });
      C && w && me(n, {
        id: `es-mat:${I.id}`,
        sourceId: C,
        targetId: w,
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
    if (g(I.triggerEvent, P), k(P, I.targetUseCaseId), !I.targetUseCaseId) {
      const C = b(I.targetId), w = C ?? `tgt:${I.targetId}`;
      !C && i.has(I.targetId) && Te(n, {
        id: w,
        label: i.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: ee.boundedContext.w,
        h: ee.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: ee.boundedContext.fill,
        stroke: ee.boundedContext.stroke,
        badge: "CONTEXTO"
      }), n.nodes.has(w) && me(n, {
        id: `es-deliver:${I.id}`,
        sourceId: P,
        targetId: w,
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
    g(I.triggerEvent, P);
    for (const w of I.steps) k(P, w.useCaseId);
    const C = m(I.onCompletionEventName);
    C && me(n, {
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
    g(I.triggerEvent, P);
    for (const w of I.steps ?? []) {
      k(P, w.targetUseCaseId);
      for (const $ of [w.emittedEventName, w.completionEventName]) {
        const M = m($);
        M && me(n, {
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
    C && me(n, {
      id: `es-done:${I.id}`,
      sourceId: P,
      targetId: C,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const x = [...n.nodes.values()], _ = /* @__PURE__ */ new Map();
  for (const I of n.edges)
    _.has(I.targetId) || _.set(I.targetId, []), _.get(I.targetId).push(I.sourceId);
  const R = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Set(), D = (I) => {
    const P = R.get(I);
    if (P !== void 0) return P;
    if (L.has(I)) return 0;
    L.add(I);
    const C = _.get(I) ?? [], w = C.length ? 1 + Math.max(...C.map(D)) : 0;
    return L.delete(I), R.set(I, w), w;
  }, q = /* @__PURE__ */ new Map();
  for (const I of x) {
    const P = t[I.id];
    if (P) {
      I.x = P.x, I.y = P.y;
      continue;
    }
    const C = D(I.id), w = q.get(C) ?? 0;
    q.set(C, w + 1), I.x = 140 + C * 260, I.y = 110 + w * 110;
  }
  return { nodes: x, edges: n.edges };
}
const yc = 190, Ic = 56, ko = 180, bc = 56, xc = 150, vc = 44, _o = 250, $o = 100;
function wc(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (o) => {
    if (n.has(o.id)) return 0;
    n.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((c) => t.get(c)).filter(Boolean), r = a.length ? 1 + Math.max(...a.map(i)) : 0;
    return n.delete(o.id), r;
  };
  return i(e);
}
function kc(e, t) {
  if (t.triggerAggregateId) {
    const n = (e.aggregates ?? []).find((i) => i.id === t.triggerAggregateId);
    if (n) return { id: n.id, label: n.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const n = e.boundedContexts.flatMap((i) => i.domainServices ?? []).find((i) => i.id === t.triggerDomainServiceId);
    if (n) return { id: n.id, label: n.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const n = e.boundedContexts.flatMap((i) => i.useCases ?? []).find((i) => i.id === t.triggerUseCaseId);
    if (n) return { id: n.id, label: n.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function _c(e, t) {
  var s;
  const n = [], i = [], o = /* @__PURE__ */ new Set(), a = (p) => {
    var y;
    return (y = e.boundedContexts.flatMap((h) => h.useCases ?? []).find((h) => h.id === p)) == null ? void 0 : y.name;
  };
  let r = 140;
  (e.workflows ?? []).forEach((p) => {
    var k;
    const y = new Map(p.steps.map((x) => [x.id, x])), h = new Map(p.steps.map((x) => [x.id, wc(x, y)])), m = /* @__PURE__ */ new Map();
    for (const x of p.steps) {
      const _ = h.get(x.id) ?? 0;
      m.set(_, (m.get(_) ?? 0) + 1);
    }
    const f = Math.max(1, ...m.values()), b = kc(e, p);
    if (b && !o.has(b.id)) {
      o.add(b.id);
      const x = t[b.id] ?? { x: 140, y: r };
      n.push({
        id: b.id,
        label: b.label,
        x: x.x,
        y: x.y,
        w: xc,
        h: vc,
        kind: b.kind,
        symbol: b.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: b.kind === "aggregate" ? "AGGREGATE" : b.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const d = t[p.id] ?? { x: 420, y: r };
    n.push({
      id: p.id,
      label: p.name,
      x: d.x,
      y: d.y,
      w: yc,
      h: Ic,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}${p.onCompletionEventName ? ` · emite ${p.onCompletionEventName} al completar` : ""}`
    }), b && i.push({
      id: `wft:${p.id}`,
      sourceId: b.id,
      targetId: p.id,
      kind: "workflow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    });
    const l = /* @__PURE__ */ new Map();
    let g = 0;
    for (const x of p.steps) {
      const _ = h.get(x.id) ?? 0;
      g = Math.max(g, _);
      const R = l.get(_) ?? 0;
      l.set(_, R + 1);
      const L = t[x.id] ?? {
        x: d.x + (_ + 1) * _o,
        y: r + (R - (m.get(_) - 1) / 2) * $o
      }, D = a(x.targetUseCaseId);
      n.push({
        id: x.id,
        label: x.name,
        x: L.x,
        y: L.y,
        w: x.type === "JOIN" || x.type === "SPLIT" ? 100 : ko,
        h: x.type === "JOIN" || x.type === "SPLIT" ? 48 : bc,
        kind: "workflow-step",
        symbol: x.type === "JOIN" || x.type === "SPLIT" ? "flow" : x.roleId ? "actor" : "event",
        fill: x.type === "JOIN" || x.type === "SPLIT" ? "#f5f3ff" : x.roleId ? "#fef9c3" : "#ffffff",
        stroke: x.roleId && x.type !== "JOIN" && x.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: x.type === "JOIN" || x.type === "SPLIT",
        badge: x.type === "JOIN" ? "⨝ JOIN" : x.type === "SPLIT" ? "⑃ SPLIT" : x.roleId ? `👤 ${x.roleId}${x.formPageId ? " · 📋" : ""}${x.deadline ? ` · ${x.deadline}` : ""}` : D ? `→ ${D}` : "∅ sin use case",
        tooltip: x.type === "JOIN" ? `${x.name} — espera a TODAS sus dependencias antes de seguir` : x.type === "SPLIT" ? `${x.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${x.name}${x.roleId ? ` · tarea HUMANA de ${x.roleId}${x.deadline ? ` (plazo ${x.deadline})` : ""}` : ""}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${D ? ` · lanza ${D}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}${x.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const q = (x.dependsOnStepIds ?? []).filter((v) => y.has(v));
      q.length === 0 && i.push({
        id: `wfs:${p.id}:${x.id}`,
        sourceId: p.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const v of q)
        i.push({
          id: `wfdep:${v}->${x.id}`,
          sourceId: v,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((k = y.get(v)) == null ? void 0 : k.name) ?? v}`
        });
    }
    if (p.onCompletionEventName) {
      const x = `done:${p.id}`, _ = t[x] ?? { x: d.x + (g + 2) * _o, y: r };
      n.push({
        id: x,
        label: p.onCompletionEventName,
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
      const R = new Set(p.steps.flatMap((D) => D.dependsOnStepIds ?? [])), L = p.steps.filter((D) => !R.has(D.id));
      for (const D of L.length ? L : [])
        i.push({
          id: `wfd:${p.id}:${D.id}`,
          sourceId: D.id,
          targetId: x,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      p.steps.length || i.push({
        id: `wfd:${p.id}`,
        sourceId: p.id,
        targetId: x,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, f + 1) * $o + 60;
  });
  const c = new Set(n.map((p) => p.id));
  (e.workflowGateways ?? []).forEach((p, y) => {
    const h = t[p.id] ?? { x: 200 + y % 5 * 220, y: 60 };
    n.push({
      id: p.id,
      label: p.name,
      x: h.x,
      y: h.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: p.type === "SPLIT" ? p.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : p.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: p.type === "SPLIT" ? `${p.name} — split ${p.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${p.name} — join que ${p.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), c.add(p.id);
  });
  for (const p of e.workflowGateways ?? []) {
    for (const h of p.sourceIds ?? [])
      c.has(h) && i.push({
        id: `wflink:${h}->${p.id}`,
        sourceId: h,
        targetId: p.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const y = p.type === "SPLIT" && p.semantics === "EXCLUSIVE";
    for (const h of p.targetIds ?? []) {
      if (!c.has(h)) continue;
      const m = y ? (s = (p.branchConditions ?? []).find((f) => f.targetId === h)) == null ? void 0 : s.expression : void 0;
      i.push({
        id: `wflink:${p.id}->${h}`,
        sourceId: p.id,
        targetId: h,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: y && !m,
        arrow: !0,
        label: m ?? (y ? "¿condición?" : void 0),
        tooltip: y ? `${m ? `Rama si: ${m}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((y) => (y.steps ?? []).filter((h) => h.roleId && c.has(h.id))).forEach((y, h) => {
    const m = (e.actors ?? []).find((b) => b.id === y.roleId), f = y.roleId;
    if (!c.has(f)) {
      const b = n.find((l) => l.id === y.id), d = t[f] ?? {
        x: b ? b.x - 90 : 120 + h * 200,
        y: b ? b.y - 120 : 40
      };
      n.push({
        id: f,
        label: (m == null ? void 0 : m.name) ?? f,
        x: d.x,
        y: d.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(m == null ? void 0 : m.name) ?? f} — su lista de tareas recibe los pasos humanos conectados`
      }), c.add(f);
    }
    i.push({
      id: `wfrole:${y.id}->${f}`,
      sourceId: f,
      targetId: y.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((y) => (y.steps ?? []).filter((h) => h.formPageId && c.has(h.id))).forEach((y, h) => {
    const m = (e.pages ?? []).find((f) => f.id === y.formPageId);
    if (m) {
      if (!c.has(m.id)) {
        const f = n.find((d) => d.id === y.id), b = t[m.id] ?? {
          x: f ? f.x : 200 + h * 220,
          y: f ? f.y + 130 : 60
        };
        n.push({
          id: m.id,
          label: m.name,
          x: b.x,
          y: b.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${m.name} — el forms engine la presenta como formulario de la tarea`
        }), c.add(m.id);
      }
      i.push({
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
      !y.handoffWorkflowId || !c.has(y.handoffWorkflowId) || !c.has(y.id) || i.push({
        id: `wflink:${y.id}->${y.handoffWorkflowId}`,
        sourceId: y.id,
        targetId: y.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: n, edges: i };
}
const Co = 250, Re = 30, pt = 6, $c = 16, jt = 190, Cc = 60, Sc = 170, vn = 44;
function Ec(e, t, n) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${n.join(">")}`;
}
function $e(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Ac(e) {
  const t = [], n = (i, o, a) => {
    for (const r of i ?? []) {
      const c = [...o, r.label];
      t.push({ entry: r, path: c, depth: a }), n(r.children ?? [], c, a + 1);
    }
  };
  return n(e.menuItems ?? [], [], 0), t;
}
function Mc(e, t) {
  var R, L, D, q;
  const n = [], i = [], o = e.uiApps ?? [], a = e.pages ?? [], r = (v) => {
    var E;
    return ((E = e.boundedContexts.flatMap((V) => V.useCases ?? []).find((V) => V.id === v)) == null ? void 0 : E.name) ?? v;
  }, c = (v) => {
    var E;
    return ((E = e.boundedContexts.flatMap((V) => V.queryServices ?? []).find((V) => V.id === v)) == null ? void 0 : E.name) ?? v;
  }, s = /* @__PURE__ */ new Map();
  let p = 160;
  for (const v of o) {
    const E = Ac(v), V = Math.max(
      90,
      54 + E.length * (Re + pt)
    ), oe = t[v.id] ?? { x: 190, y: p + V / 2 };
    p = oe.y + V / 2 + 70;
    const te = v.type ?? "APP";
    n.push({
      id: v.id,
      label: v.title || v.name,
      x: oe.x,
      y: oe.y,
      w: Co,
      h: V,
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
      tooltip: te === "ORCHESTRATOR" ? `${v.name} — orquesta y mantiene estado; solo enseña páginas hijas` : te === "MASTER_DETAIL" ? `${v.name} — cabecera + pestañas (ambas son páginas)` : `App: ${v.name}`
    }), v.modelId && (s.set(v.modelId, {
      label: ((R = (e.models ?? []).find((C) => C.id === v.modelId)) == null ? void 0 : R.name) ?? v.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), i.push({
      id: `appmodel:${v.id}->${v.modelId}`,
      sourceId: v.id,
      targetId: v.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [C, w, $, M, S] of [
      [v.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [v.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      C && i.push({
        id: `${w === "app-view" ? "appview" : "appedit"}:${v.id}->${C}`,
        sourceId: v.id,
        targetId: C,
        kind: w,
        color: M,
        label: $,
        arrow: !0,
        tooltip: S
      });
    const I = v.homePageId ?? v.homeAppId;
    I && i.push({
      id: `apphome:${v.id}->${I}`,
      sourceId: v.id,
      targetId: I,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: v.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), te === "MASTER_DETAIL" && v.headerPageId && i.push({
      id: `appheader:${v.id}->${v.headerPageId}`,
      sourceId: v.id,
      targetId: v.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let P = oe.y - V / 2 + 34 + 10 + Re / 2;
    for (const { entry: C, path: w, depth: $ } of E) {
      const M = Ec(v.id, C, w), S = $ * $c;
      if (n.push({
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
        parentId: v.id,
        tooltip: (q = C.children) != null && q.length ? "Agrupador (con submenú): no puede abrir nada" : C.pageId ? `Abre ${C.pageId}` : C.uiAdapterId ? `Abre la app ${C.uiAdapterId}` : C.useCaseId ? `Lanza ${C.useCaseId}` : C.aggregateId ? `CRUD inferido sobre ${C.aggregateId}` : C.queryOperationId ? `Listado con filtros de ${C.queryOperationId}` : "Entrada de menú sin destino"
      }), P += Re + pt, C.uiAdapterId && o.some((T) => T.id === C.uiAdapterId) && i.push({
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
      }), i.push({
        id: `menuuc:${M}->${C.useCaseId}`,
        sourceId: M,
        targetId: C.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), C.aggregateId && (e.aggregates ?? []).some((T) => T.id === C.aggregateId)) {
        const T = (e.aggregates ?? []).find((N) => N.id === C.aggregateId);
        s.set(T.id, { label: T.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), i.push({
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
        }), i.push({
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
      C.pageId && a.some((T) => T.id === C.pageId) && i.push({
        id: `menupage:${M}->${C.pageId}`,
        sourceId: M,
        targetId: C.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let y = 160;
  const h = (v) => {
    var E;
    return ((E = a.find((V) => V.id === v)) == null ? void 0 : E.name) ?? v;
  };
  for (const v of a) {
    const E = t[v.id] ?? { x: 640, y }, V = v.type === "WIZARD" ? v.wizardSteps ?? [] : [], oe = V.length ? 54 + V.length * (Re + pt) : Cc;
    y = E.y + oe + 90, n.push({
      id: v.id,
      label: v.name,
      x: E.x,
      y: E.y,
      w: jt,
      h: oe,
      kind: "page",
      symbol: "interface",
      badge: v.customCodeId ? "CODE" : v.type ?? "PAGE",
      container: V.length > 0,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...v.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: v.route ? `${v.type ?? "PAGE"} · ${v.route}` : v.type ?? "PAGE"
    });
    let te = E.y - oe / 2 + 34 + 10 + Re / 2;
    V.forEach((I, P) => {
      const C = I.id ?? I.pageId ?? String(P);
      n.push({
        id: `wizrow:${v.id}:${C}`,
        label: `${P + 1}. ${I.label ?? (I.pageId ? h(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: E.x,
        y: te,
        w: jt - 20,
        h: Re,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: v.id,
        tooltip: I.pageId ? `Paso ${P + 1}: ${h(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${P + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), te += Re + pt;
    });
    for (const [I, P, C, w] of [
      [v.crudDetailPageId ?? v.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [v.crudCreatePageId ?? v.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && i.push({
        id: `${P === "crud-detail" ? "cruddetail" : "crudnew"}:${v.id}->${I}`,
        sourceId: v.id,
        targetId: I,
        kind: P,
        color: w,
        label: C,
        dashed: !0,
        arrow: !0,
        tooltip: P === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let I = 0; I < (v.wizardSteps ?? []).length; I++) {
      const P = (v.wizardSteps ?? [])[I];
      if (!P.pageId) continue;
      const C = P.id ?? P.pageId;
      i.push({
        id: `wizstep:${v.id}:${C}`,
        sourceId: `wizrow:${v.id}:${C}`,
        targetId: P.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${I + 1} — Supr desmapea`
      });
    }
    v.modelId && (s.set(v.modelId, {
      label: v.modelName ?? v.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), i.push({
      id: `pgmodel:${v.id}->${v.modelId}`,
      sourceId: v.id,
      targetId: v.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const I of v.buttons ?? [])
      I.useCaseId && (s.set(I.useCaseId, {
        label: r(I.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), i.push({
        id: `pgbtn:${v.id}->${I.useCaseId}`,
        sourceId: v.id,
        targetId: I.useCaseId,
        kind: "page-button",
        label: I.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: I.mappingId ? `Botón «${I.label}» — mapping ${I.mappingId}` : `Botón «${I.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    v.listingQueryServiceId && (s.set(v.listingQueryServiceId, {
      label: c(v.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), i.push({
      id: `pglist:${v.id}->${v.listingQueryServiceId}`,
      sourceId: v.id,
      targetId: v.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  const m = e.buttonGroups ?? [], f = (v) => {
    var E;
    return ((E = m.find((V) => V.id === v)) == null ? void 0 : E.name) ?? v;
  };
  let b = 520;
  for (const v of m) {
    const E = v.buttons ?? [], V = v.groupIds ?? [], oe = E.length + V.length, te = t[v.id] ?? { x: 1e3, y: b }, I = Math.max(70, 54 + oe * (Re + pt));
    b = te.y + I + 80, n.push({
      id: v.id,
      label: v.name,
      x: te.x,
      y: te.y,
      w: jt,
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
      tooltip: `${v.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let P = te.y - I / 2 + 34 + 10 + Re / 2;
    for (const C of E)
      n.push({
        id: `gbtn:${v.id}:${C.id}`,
        label: C.label ?? C.id,
        x: te.x,
        y: P,
        w: jt - 20,
        h: Re,
        kind: "group-button",
        symbol: "usecase",
        fill: C.useCaseId || C.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !C.useCaseId && !C.apiOperationId,
        parentId: v.id,
        tooltip: `${C.label ?? C.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), P += Re + pt;
    for (const C of V)
      n.push({
        id: `gsub:${v.id}:${C}`,
        label: `▸ ${f(C)}`,
        x: te.x,
        y: P,
        w: jt - 20,
        h: Re,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: v.id,
        tooltip: `Subgrupo ${f(C)} — Supr lo desanida (el grupo sigue existiendo)`
      }), P += Re + pt;
  }
  for (const v of m)
    for (const E of v.buttons ?? [])
      !E.useCaseId || !e.boundedContexts.some((oe) => (oe.useCases ?? []).some((te) => te.id === E.useCaseId)) || (s.set(E.useCaseId, {
        label: r(E.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), i.push({
        id: `gbtnt:${v.id}:${E.id}`,
        sourceId: `gbtn:${v.id}:${E.id}`,
        targetId: E.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${E.label ?? E.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const v of a) {
    const E = [
      ["toolbar", v.toolbarGroupIds ?? []],
      ["botonera", v.bottomBarGroupIds ?? []]
    ];
    for (const [V, oe] of E)
      for (const te of oe)
        m.some((I) => I.id === te) && i.push({
          id: `bargrp:${v.id}:${V}:${te}`,
          sourceId: te,
          targetId: v.id,
          kind: "bar-group",
          color: V === "toolbar" ? "#0284c7" : "#7c3aed",
          label: V,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${V} de ${v.name} — Supr lo desengancha`
        });
  }
  let d = 160;
  for (const v of e.models ?? [])
    s.has(v.id) || s.set(v.id, { label: v.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [v, E] of s) {
    const V = t[v] ?? { x: 1050, y: d };
    d = V.y + vn + 46, n.push({
      id: v,
      label: E.label,
      x: V.x,
      y: V.y,
      w: Sc,
      h: vn,
      kind: E.kind,
      symbol: E.symbol,
      fill: "#ffffff",
      stroke: E.stroke
    });
  }
  let l = 120;
  for (const v of e.identityProviders ?? []) {
    const E = t[v.id] ?? { x: -320, y: l };
    l = E.y + 70 + 40, n.push({
      id: v.id,
      label: v.name,
      x: E.x,
      y: E.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: v.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!v.publishedByExternalSystemId,
      badge: v.type ?? "IDP",
      tooltip: `${v.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const v of o)
    v.identityProviderId && (e.identityProviders ?? []).some((E) => E.id === v.identityProviderId) && i.push({
      id: `idpauth:${v.id}`,
      sourceId: v.id,
      targetId: v.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const g = (e.actorAppUses ?? []).filter(
    (v) => o.some((E) => E.id === v.appId) && (e.actors ?? []).some((E) => E.id === v.actorId)
  ), k = [...new Set(g.map((v) => v.actorId))];
  let x = 160;
  for (const v of k) {
    const E = (e.actors ?? []).find((oe) => oe.id === v), V = t[v] ?? { x: -60, y: x };
    x = V.y + vn + 46, n.push({
      id: v,
      label: E.name,
      x: V.x,
      y: V.y,
      w: 150,
      h: vn,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const v of g)
    i.push({
      id: `actorapp:${v.actorId}->${v.appId}`,
      sourceId: v.actorId,
      targetId: v.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((v, E) => {
    const V = t[v.id] ?? { x: 1200, y: 120 + E * 90 };
    n.push({
      id: v.id,
      label: v.name,
      x: V.x,
      y: V.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${v.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const _ = new Set(n.map((v) => v.id));
  for (const v of a)
    v.customCodeId && _.has(v.customCodeId) && i.push({
      id: `ccpage:${v.id}`,
      sourceId: v.customCodeId,
      targetId: v.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${v.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const v of e.customCodes ?? [])
    for (const E of v.usedElementIds ?? [])
      _.has(E) && i.push({
        id: `ccuse:${v.id}->${E}`,
        sourceId: v.id,
        targetId: E,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${v.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: n, edges: i };
}
const So = 188, Eo = 34, Ao = 10, wn = 24, Mo = 6;
function kn(e, t) {
  return `fld:${e}:${t}`;
}
function ki(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function Pc(e, t) {
  const n = [], i = [], o = e.models ?? [], a = e.modelMappings ?? [], r = (m) => {
    var f;
    return ((f = o.find((b) => b.id === m)) == null ? void 0 : f.name) ?? m ?? "?";
  };
  o.forEach((m, f) => {
    const b = t[m.id] ?? { x: 200 + f % 5 * 260, y: 160 + Math.floor(f / 5) * 220 }, d = m.fields ?? [], l = Eo + (d.length ? d.length * wn + (d.length - 1) * Mo : 10) + Ao;
    n.push({
      id: m.id,
      label: m.name,
      x: b.x,
      y: b.y,
      w: So,
      h: l,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), d.forEach((g, k) => {
      n.push({
        id: kn(m.id, g.id),
        label: g.name,
        x: b.x,
        y: b.y - l / 2 + Eo + k * (wn + Mo) + wn / 2,
        w: So - 2 * Ao,
        h: wn,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: g.type ?? void 0,
        parentId: m.id,
        tooltip: `${g.name}${g.type ? ` (${g.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((m, f) => {
    const b = t[m.id] ?? { x: 200 + f % 5 * 260, y: 60 };
    n.push({
      id: m.id,
      label: m.name,
      x: b.x,
      y: b.y,
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
  }), (e.customCodes ?? []).forEach((m, f) => {
    const b = t[m.id] ?? { x: 120 + f % 5 * 220, y: 60 };
    n.push({
      id: m.id,
      label: m.name,
      x: b.x,
      y: b.y,
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
  const c = new Set(n.map((m) => m.id)), s = (m) => m.fieldId ? kn(m.modelId, m.fieldId) : m.modelId;
  for (const m of e.transformations ?? [])
    m.customCodeId && c.has(m.customCodeId) && c.has(m.id) && i.push({
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
    m.customCodeId && c.has(m.customCodeId) && m.targetModelId && c.has(m.targetModelId) && i.push({
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
    for (const f of m.inputs ?? []) {
      const b = s(f);
      c.has(b) && i.push({
        id: `tfin:${m.id}:${f.modelId}:${f.fieldId ?? ""}`,
        sourceId: b,
        targetId: m.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${m.name} — Supr la desconecta`
      });
    }
    m.output && c.has(s(m.output)) && i.push({
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
    if (!(!m.sourceModelId || !m.targetModelId) && !(!c.has(m.sourceModelId) || !c.has(m.targetModelId))) {
      i.push({
        id: `mapping:${m.id}`,
        sourceId: m.sourceModelId,
        targetId: m.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: m.name,
        arrow: !0,
        tooltip: `${m.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const f of m.rules ?? []) {
        const b = kn(m.sourceModelId, f.sourceFieldId ?? ""), d = kn(m.targetModelId, f.targetFieldId ?? "");
        !c.has(b) || !c.has(d) || i.push({
          id: `maprule:${m.id}:${f.id}`,
          sourceId: b,
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
    e.boundedContexts.flatMap((m) => (m.useCases ?? []).map((f) => [f.id, f]))
  ), h = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const f of m.buttons ?? []) {
        if (!f.useCaseId || f.mappingId) continue;
        const b = y.get(f.useCaseId);
        if (!(b != null && b.inputModelId) || b.inputModelId === m.modelId) continue;
        const d = `${m.modelId}->${b.inputModelId}`;
        p.has(d) || h.has(d) || (h.add(d), !(!c.has(m.modelId) || !c.has(b.inputModelId)) && i.push({
          id: `mapgap:${m.id}:${f.useCaseId}`,
          sourceId: m.modelId,
          targetId: b.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${f.label}» (página ${m.name}) llama a ${b.name}: falta mapear ${r(m.modelId)} → ${r(b.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: n, edges: i };
}
const pi = 560, _n = 34, $n = 14, ui = 150, Cn = 40, Sn = 12, En = 150, nt = 40, Tc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Oc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Nc(e, t) {
  const n = [], i = [], o = e.etlFlows ?? [], a = new Map(e.boundedContexts.map((d) => [d.id, d.name])), r = new Map(
    e.boundedContexts.flatMap((d) => [
      ...(d.domainEvents ?? []).map((l) => [l.id, l.name]),
      ...(d.applicationEvents ?? []).map((l) => [l.id, l.name])
    ])
  );
  let c = 140;
  for (const d of o) {
    const l = d.steps ?? [], g = [[], [], []];
    l.forEach((R) => g[Tc(R.type)].push(R));
    const k = Math.max(1, ...g.map((R) => R.length)), x = _n + $n + k * (Cn + Sn), _ = t[d.id] ?? { x: 420, y: c };
    c = _.y + x + 110, n.push({
      id: d.id,
      label: d.name,
      x: _.x,
      y: _.y,
      w: pi,
      h: x,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${d.name} — integrador${d.ownerBoundedContextId ? ` de ${a.get(d.ownerBoundedContextId) ?? d.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), g.forEach((R, L) => {
      const D = _.x - pi / 2 + $n + ui / 2 + L * (pi - 2 * $n - ui) / 2;
      R.forEach((q, v) => {
        const E = Oc[L];
        if (n.push({
          id: q.id,
          label: q.name ?? q.id,
          x: D,
          y: _.y - x / 2 + _n + Cn / 2 + v * (Cn + Sn),
          w: ui,
          h: Cn,
          kind: "etl-step",
          symbol: E.symbol,
          fill: E.fill,
          stroke: E.stroke,
          badge: q.type === "SOURCE_PULL" ? "PULL" : q.type === "SOURCE_CONSUMER" ? "CONSUME" : q.type === "TRANSFORM" ? "TRANSFORM" : q.type === "WRITE_API" ? "→ API" : q.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: d.id,
          tooltip: `${q.name ?? q.id} (${q.type})${q.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), L > 0) {
          const V = g[L - 1], oe = V[Math.min(v, V.length - 1)];
          oe && i.push({
            id: `etlpipe:${d.id}:${oe.id}->${q.id}`,
            sourceId: oe.id,
            targetId: q.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const s = new Set(n.map((d) => d.id)), p = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.externalTableId)).filter(Boolean)), y = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.apiId)).filter(Boolean)), h = new Set(o.flatMap((d) => (d.steps ?? []).map((l) => l.eventId)).filter(Boolean));
  let m = 120;
  for (const d of e.externalSystems) {
    const l = (d.tables ?? []).filter((x) => p.has(x.id));
    if (!l.length) continue;
    const g = _n + $n + l.length * (nt + Sn), k = t[d.id] ?? { x: -140, y: m };
    m = k.y + g + 90, n.push({
      id: d.id,
      label: d.name,
      x: k.x,
      y: k.y,
      w: En + 30,
      h: g,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${d.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), s.add(d.id), l.forEach((x, _) => {
      n.push({
        id: x.id,
        label: x.name,
        x: k.x,
        y: k.y - g / 2 + _n + nt / 2 + _ * (nt + Sn),
        w: En,
        h: nt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: d.id,
        tooltip: `${x.name} — tabla legacy de ${d.name}`
      }), s.add(x.id);
    });
  }
  let f = 120;
  for (const d of e.apis ?? []) {
    if (!y.has(d.id)) continue;
    const l = t[d.id] ?? { x: 1e3, y: f };
    f = l.y + nt + 70, n.push({
      id: d.id,
      label: d.name,
      x: l.x,
      y: l.y,
      w: En,
      h: nt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${d.name} — API que un integrador consume o llama`
    }), s.add(d.id);
  }
  let b = 400;
  for (const d of h) {
    const l = d, g = t[l] ?? { x: 1e3, y: b };
    b = g.y + nt + 70, n.push({
      id: l,
      label: r.get(l) ?? l,
      x: g.x,
      y: g.y,
      w: En,
      h: nt,
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
      const g = l.externalTableId ?? l.apiId ?? l.eventId;
      if (!g || !s.has(g) || !s.has(l.id)) continue;
      const k = l.type.startsWith("SOURCE");
      i.push({
        id: `etl:${d.id}:${l.id}`,
        sourceId: k ? g : l.id,
        targetId: k ? l.id : g,
        kind: k ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: l.type === "SOURCE_PULL" ? "pull" : l.type === "SOURCE_CONSUMER" ? "consume" : l.type === "WRITE_API" ? "api" : l.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: k ? `${d.name} lee de aquí — Supr quita el paso` : `${d.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: n, edges: i };
}
async function Rc(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((s) => s.e), i = new n(), a = {
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
  }, r = await i.layout(a), c = {};
  for (const s of r.children ?? [])
    c[s.id] = {
      x: (s.x ?? 0) + (s.width ?? 0) / 2,
      y: (s.y ?? 0) + (s.height ?? 0) / 2
    };
  return c;
}
var Lc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, De = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Dc(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Lc(t, n, o), o;
};
const zc = /* @__PURE__ */ new Set([
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
      const t = e.composedPath()[0], n = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".h3");
      if (n != null && n.dataset.sourceId) {
        const c = this.getBoundingClientRect();
        this._connect = {
          sourceId: n.dataset.sourceId,
          x1: e.clientX - c.left,
          y1: e.clientY - c.top,
          x2: e.clientX - c.left,
          y2: e.clientY - c.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const i = e.shiftKey || this._space || e.button === 1, o = i ? null : this.plateAt(e);
      if (!o && !i && !e.altKey) {
        const c = this.getBoundingClientRect();
        this._rubber = {
          x1: e.clientX - c.left,
          y1: e.clientY - c.top,
          x2: e.clientX - c.left,
          y2: e.clientY - c.top,
          additive: !1
        }, this._drag = { mode: "rubber", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan }, moved: !1 };
        return;
      }
      this._drag = {
        mode: o ? "node" : i ? "pan" : "orbit",
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
      var i, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, n = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const r = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY), c = (o = r == null ? void 0 : r.closest) == null ? void 0 : o.call(r, ".n3"), s = (c == null ? void 0 : c.dataset.nodeId) ?? null;
        this._hoverTargetId = s !== this._connect.sourceId ? s : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, n) > 3 && (this._drag.moved = !0);
        const a = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - a.left, y2: e.clientY - a.top };
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, n) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const a = this.unproject(t, n);
          this._liveMove = { id: this._drag.nodeId, dx: a.x, dy: a.y };
        }
        return;
      }
      this._drag.mode === "pan" ? this._pan = { x: this._drag.pan.x + t, y: this._drag.pan.y + n } : (this._rz = this._drag.rz + t * 0.4, this._rx = Math.max(5, Math.min(80, this._drag.rx + n * 0.3)));
    }, this.onUp = () => {
      var t;
      const e = this._drag;
      if (this._drag = null, !!e) {
        if (e.mode === "connect") {
          const n = (t = this._connect) == null ? void 0 : t.sourceId, i = this._hoverTargetId;
          this._connect = null, this._hoverTargetId = null, n && i && i !== n && this.emit("connect-requested", { sourceId: n, targetId: i });
          return;
        }
        if (e.mode === "rubber") {
          const n = this._rubber;
          if (this._rubber = null, n && e.moved) {
            const i = this.getBoundingClientRect(), o = Math.min(n.x1, n.x2) + i.left, a = Math.max(n.x1, n.x2) + i.left, r = Math.min(n.y1, n.y2) + i.top, c = Math.max(n.y1, n.y2) + i.top, s = [];
            this.renderRoot.querySelectorAll(".n3").forEach((p) => {
              const y = p.getBoundingClientRect(), h = y.left + y.width / 2, m = y.top + y.height / 2, f = p.dataset.nodeId;
              f && h >= o && h <= a && m >= r && m <= c && s.push(f);
            }), this._selected = new Set(s);
          } else
            this._selected = /* @__PURE__ */ new Set(), this.emit("selection-cleared");
          return;
        }
        if (e.mode === "node" && e.nodeId) {
          const n = this.scene.nodes.find((i) => i.id === e.nodeId);
          e.moved && n && this._liveMove ? this.emit("node-moved", {
            id: e.nodeId,
            x: n.x + this._liveMove.dx,
            y: n.y + this._liveMove.dy
          }) : n && this.emit("element-selected", { elementType: "node", id: n.id, kind: n.kind }), this._liveMove = null;
          return;
        }
        !e.moved && Math.abs(this._rz - e.rz) < 0.5 && Math.abs(this._rx - e.rx) < 0.5 && this._pan.x === e.pan.x && this._pan.y === e.pan.y && this.emit("selection-cleared");
      }
    }, this.onDblClick = (e) => {
      var i, o;
      const t = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY), n = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".n3")) ?? this.plateAt(e);
      if (n != null && n.dataset.nodeId) {
        this.emit("element-activated", {
          elementType: "node",
          id: n.dataset.nodeId,
          kind: n.dataset.kind
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
          const t = this.scene.nodes.filter((n) => this._selected.has(n.id)).map((n) => ({ id: n.id, kind: n.kind }));
          this._selected = /* @__PURE__ */ new Set(), t.length && this.emit("delete-selection-requested", { items: t });
          return;
        }
        if (this.selectedId) {
          const t = this.scene.nodes.find((n) => n.id === this.selectedId);
          t && (e.preventDefault(), this.emit("delete-requested", { elementType: "node", id: t.id, kind: t.kind }));
        }
        return;
      }
      if (e.key === "F2") {
        const t = this._selected.size === 1 ? [...this._selected][0] : this.selectedId, n = t ? this.scene.nodes.find((i) => i.id === t) : void 0;
        n && (e.preventDefault(), this._renaming = { id: n.id, kind: n.kind ?? "node", value: n.label });
        return;
      }
      e.key === "Escape" && (this._selected = /* @__PURE__ */ new Set(), this._renaming = null, this.emit("selection-cleared"));
    }, this.onWheel = (e) => {
      e.preventDefault();
      const t = e.deltaY < 0 ? 1.1 : 0.9;
      this._k = Math.max(0.15, Math.min(3, this._k * t));
    }, this.reset = () => {
      this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 };
    }, this._runnerT0 = 0;
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
    var n;
    const t = e.composedPath()[0];
    return ((n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, ".n3")) ?? null;
  }
  /**
   * A pointer delta on screen → a delta on the floor plane: undo the zoom, the
   * rotateX foreshortening of the screen-Y axis, then the rotateZ bearing.
   */
  unproject(e, t) {
    const n = e / this._kUsed, i = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), o = this._rz * Math.PI / 180;
    return {
      x: n * Math.cos(o) + i * Math.sin(o),
      y: -n * Math.sin(o) + i * Math.cos(o)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var i, o, a;
    const n = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e, t);
    return ((a = (o = n == null ? void 0 : n.closest) == null ? void 0 : o.call(n, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const n = this.getBoundingClientRect(), i = n.width * 0.5, o = n.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const r = new DOMMatrix().translate(i, o).multiply(a).translate(-i, -o).translate(n.width / 2, n.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), c = r.transformPoint(new DOMPoint(0, 0, 0, 1)), s = r.transformPoint(new DOMPoint(1, 0, 0, 0)), p = r.transformPoint(new DOMPoint(0, 1, 0, 0)), y = e - n.left, h = t - n.top, m = s.x - y * s.w, f = p.x - y * p.w, b = s.y - h * s.w, d = p.y - h * p.w, l = y * c.w - c.x, g = h * c.w - c.y, k = m * d - f * b;
    return k ? { x: (l * d - f * g) / k, y: (m * g - l * b) / k } : { ...this._center };
  }
  updated(e) {
    var t;
    this.syncJourneyRunnerClock(), e.has("_renaming") && this._renaming && ((t = this.renderRoot.querySelector(".rename3")) == null || t.select());
  }
  /** Starts/stops the runner's clock according to whether a journey is on stage. */
  syncJourneyRunnerClock() {
    const e = (this.scene.journeyRuns ?? []).length > 0;
    if (e && this._runnerRaf === void 0) {
      this._runnerT0 = performance.now();
      const t = () => {
        this.moveJourneyRunner((performance.now() - this._runnerT0) / 1e3), this._runnerRaf = requestAnimationFrame(t);
      };
      this._runnerRaf = requestAnimationFrame(t);
    } else !e && this._runnerRaf !== void 0 && (cancelAnimationFrame(this._runnerRaf), this._runnerRaf = void 0);
  }
  /**
   * The traveller in 3D: same tour as the other surfaces — one run after
   * another, straight 3D segments between plates — driven by rAF because the
   * z coordinate must interpolate between storeys, which CSS motion cannot.
   */
  moveJourneyRunner(e) {
    const t = this.renderRoot.querySelector(".journey-runner3");
    if (!t) return;
    const n = new Map(this.scene.nodes.map((q) => [q.id, q])), i = new Map(this.scene.edges.map((q) => [q.id, q])), o = this.depths(), a = 30, r = (q) => (o.get(q) ?? 0) * a + 8, c = (this.scene.journeyRuns ?? []).map(
      (q) => q.map((v) => i.get(v)).filter((v) => !!v).map((v) => ({ s: n.get(v.sourceId), tgt: n.get(v.targetId) })).filter((v) => !!v.s && !!v.tgt)
    ).filter((q) => q.length > 0);
    if (!c.length) {
      t.style.display = "none";
      return;
    }
    const s = 170, p = 0.5, y = c.map((q) => q.map((v) => Math.hypot(v.tgt.x - v.s.x, v.tgt.y - v.s.y))), h = y.map((q) => Math.max(1.2, q.reduce((v, E) => v + E, 0) / s)), m = h.reduce((q, v) => q + v + p, 0);
    let f = e % m, b = 0;
    for (; f > h[b] + p; )
      f -= h[b] + p, b++;
    if (f > h[b]) {
      t.style.display = "none";
      return;
    }
    const d = c[b], l = y[b].reduce((q, v) => q + v, 0) || 1;
    let g = f / h[b] * l, k = 0;
    for (; k < d.length - 1 && g > y[b][k]; )
      g -= y[b][k], k++;
    const x = d[k], _ = Math.min(1, g / (y[b][k] || 1)), R = x.s.x + (x.tgt.x - x.s.x) * _, L = x.s.y + (x.tgt.y - x.s.y) * _, D = r(x.s.id) + (r(x.tgt.id) - r(x.s.id)) * _;
    t.style.display = "block", t.style.left = `${R}px`, t.style.top = `${L}px`, t.style.transform = `translateZ(${D}px)`;
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((i) => [i.id, i])), t = /* @__PURE__ */ new Map(), n = (i) => {
      const o = t.get(i.id);
      if (o !== void 0) return o;
      const a = i.parentId ? e.get(i.parentId) : void 0, r = a ? n(a) + 1 : 0;
      return t.set(i.id, r), r;
    };
    for (const i of this.scene.nodes) n(i);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return A`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), n = new Map(e.map((l) => [l.id, l])), i = Math.min(...e.map((l) => l.x - l.w / 2)) - 60, o = Math.max(...e.map((l) => l.x + l.w / 2)) + 60, a = Math.min(...e.map((l) => l.y - l.h / 2)) - 60, r = Math.max(...e.map((l) => l.y + l.h / 2)) + 60, c = (i + o) / 2, s = (a + r) / 2, p = this.getBoundingClientRect(), y = p.width ? Math.min(p.width / (o - i), p.height / (r - a), 1) * 0.9 : 0.5, h = this._k * y;
    this._kUsed = h, this._center = { x: c, y: s };
    const m = 30, f = this._liveMove, b = (l) => l.x + ((f == null ? void 0 : f.id) === l.id ? f.dx : 0), d = (l) => l.y + ((f == null ? void 0 : f.id) === l.id ? f.dy : 0);
    return A`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${h}, ${h}, ${h}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-c}px, ${-s}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${i}px; top: ${a}px"
            width=${o - i}
            height=${r - a}
            viewBox="${i} ${a} ${o - i} ${r - a}"
          >
            ${this.scene.edges.map((l) => {
      const g = n.get(l.sourceId), k = n.get(l.targetId);
      return !g || !k ? "" : ne`<line
                x1=${b(g)} y1=${d(g)} x2=${b(k)} y2=${d(k)}
                stroke="#000000" stroke-width="2" opacity=${l.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((l) => {
      const g = n.get(l.sourceId), k = n.get(l.targetId);
      if (!g || !k) return "";
      const x = (t.get(g.id) ?? 0) * m + 2, _ = (t.get(k.id) ?? 0) * m + 2, R = b(k) - b(g), L = d(k) - d(g), D = _ - x, q = Math.hypot(R, L), v = Math.hypot(q, D), E = Math.atan2(L, R) * 180 / Math.PI, V = Math.atan2(D, q) * 180 / Math.PI, oe = l.color ?? "#64748b", te = l.dashed ? `repeating-linear-gradient(90deg, ${oe} 0 6px, transparent 6px 10px)` : oe, I = l.kind === "journey";
      return A`<div
              class="edge3 ${I ? "journey3" : ""}"
              style="
                left: ${b(g)}px; top: ${d(g)}px; width: ${v}px; height: ${I ? 3 : 1.7}px;
                transform: translateZ(${x}px) rotateZ(${E}deg) rotateY(${-V}deg);
                background: ${I ? "repeating-linear-gradient(90deg, #d97706 0 9px, transparent 9px 16px)" : te};
                opacity: ${l.dim ? 0.12 : 0.9};
              "
            ></div>
            ${I && l.label ? A`<div
                  class="journey-badge3"
                  style="
                    left: ${(b(g) + b(k)) / 2}px; top: ${(d(g) + d(k)) / 2}px;
                    transform: translate(-50%, -50%) translateZ(${(x + _) / 2 + 6}px);
                  "
                  title=${l.tooltip ?? ""}
                >${l.label}</div>` : ""}`;
    })}
          ${(this.scene.journeyRuns ?? []).length ? A`<div class="journey-runner3" style="display: none"></div>` : ""}
          ${e.map((l) => {
      const g = t.get(l.id) ?? 0, k = l.container || g === 0, x = this._hoverTargetId === l.id;
      return A`
              <div
                class="n3 ${l.container ? "container3" : ""} ${this.selectedId === l.id || this._selected.has(l.id) ? "selected3" : ""} ${x ? "hover3" : ""}"
                data-node-id=${l.id}
                data-kind=${l.kind}
                title=${l.tooltip ?? l.label}
                style="
                  opacity: ${l.dim ? 0.25 : 1};
                  left: ${b(l) - l.w / 2}px; top: ${d(l) - l.h / 2}px;
                  width: ${l.w}px; height: ${l.h}px;
                  transform: translateZ(${g * m + (x ? 8 : 0)}px)${x ? " scale(1.06)" : ""};
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
      const l = this.connectable && this.selectedId ? n.get(this.selectedId) : void 0;
      if (!l || !zc.has(l.kind)) return "";
      const g = (t.get(l.id) ?? 0) * m + 4;
      return [
        [b(l) + l.w / 2, d(l)],
        [b(l) - l.w / 2, d(l)],
        [b(l), d(l) + l.h / 2],
        [b(l), d(l) - l.h / 2]
      ].map(
        ([x, _]) => A`<div
                class="h3"
                data-source-id=${l.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${x}px; top: ${_}px; transform: translateZ(${g}px)"
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
      ), g = this.getBoundingClientRect(), k = l == null ? void 0 : l.getBoundingClientRect(), x = k ? k.left + k.width / 2 - g.left : g.width / 2, _ = k ? k.bottom - g.top + 6 : g.height / 2;
      return A`<input
              class="rename3"
              style="left: ${x}px; top: ${_}px"
              .value=${this._renaming.value}
              @pointerdown=${(R) => R.stopPropagation()}
              @input=${(R) => this._renaming = { ...this._renaming, value: R.target.value }}
              @keydown=${(R) => {
        if (R.stopPropagation(), R.key === "Escape" && (this._renaming = null), R.key === "Enter") {
          const L = this._renaming, D = L.value.trim();
          this._renaming = null;
          const q = this.scene.nodes.find((v) => v.id === L.id);
          D && q && D !== q.label && this.emit("node-renamed", { id: L.id, kind: L.kind, name: D });
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
    /* The journey's dashes slide toward the target; the tip wears the arrow. */
    .edge3.journey3 {
      background-size: 16px 100% !important;
      animation: journey-flow3 0.8s linear infinite;
      overflow: visible;
    }
    .edge3.journey3::after {
      content: '';
      position: absolute;
      right: -2px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 9px solid #d97706;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
    @keyframes journey-flow3 {
      to { background-position-x: 16px; }
    }
    .journey-runner3 {
      position: absolute;
      width: 15px;
      height: 15px;
      margin: -7.5px 0 0 -7.5px;
      border-radius: 50%;
      background: #d97706;
      border: 2px solid #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35);
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
var Uc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, be = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? qc(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Uc(t, n, o), o;
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
    var i;
    let t = null;
    const n = (o) => {
      for (const a of o ?? [])
        a.id === e && (t = a), n(a.children);
    };
    return n((i = this.page) == null ? void 0 : i.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var i;
    let t = null;
    const n = (o, a) => {
      for (const r of o ?? [])
        r.id === e && (t = a), n(r.children, r);
    };
    return n((i = this.page) == null ? void 0 : i.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let n = !1;
    const i = (r) => {
      r.id === e && (n = !0);
      for (const c of r.children ?? []) i(c);
    }, o = (r) => {
      for (const c of r ?? [])
        c.id === t ? i(c) : o(c.children);
    };
    return o((a = this.page) == null ? void 0 : a.content), n;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), n = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], i = n.findIndex((a) => a.id === e);
    return i >= 0 ? n[i + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const n = t.currentTarget.getBoundingClientRect(), i = (t.clientY - n.top) / Math.max(1, n.height);
    return le.LEAF_KINDS.has(e.kind) ? i < 0.5 ? "before" : "after" : i < 0.2 ? "before" : i > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const r = (e.children ?? []).filter((s) => s.kind === "tab"), c = r.find((s) => s.id === this._activeTabs[e.id]) ?? r[0];
      c && (e = c);
    }
    if (t === "into" && !le.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const n = this.parentOf(e.id), i = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (n == null ? void 0 : n.id) ?? null, beforeComponentId: i };
  }
  onCmpDrop(e, t, n) {
    var a, r;
    const i = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !i) {
      const c = (a = n == null ? void 0 : n.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!c) return;
      let s;
      try {
        s = JSON.parse(c);
      } catch {
        return;
      }
      if (!s.componentId || !s.pageId || s.pageId === ((r = this.page) == null ? void 0 : r.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: s.pageId, componentId: s.componentId, ...p });
      return;
    }
    if (i === e.id || this.isWithin(e.id, i)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== i && this.emitEvent("component-moved", { componentId: i, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var s, p, y;
    const t = e.children ?? [], n = (h) => h.map((m) => this.renderComponent(m)), i = A`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = A`<div class="row-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "splitLayout": {
        const h = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        o = A`<div class="row-lay">
          <div class="col-lay">${h.length ? n(h) : i}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? n(m) : i}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = A`<div class="grid-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = A`<div class="grid3-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "tabLayout": {
        const h = t.filter((f) => f.kind === "tab"), m = h.find((f) => f.id === this._activeTabs[e.id]) ?? h[0];
        o = A`
          <div class="tabbar">
            ${h.map(
          (f, b) => A`<span
                class=${f === m ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(d) => {
            d.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: f.id }, this.emitEvent("component-selected", { componentId: f.id });
          }}
                @dblclick=${(d) => {
            d.stopPropagation(), this._cmp = { ...f };
          }}
                @dragstart=${(d) => {
            var l, g;
            d.stopPropagation(), this._dragCmpId = f.id, (g = d.dataTransfer) == null || g.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (l = this.page) == null ? void 0 : l.id, componentId: f.id })
            );
          }}
                @dragover=${(d) => {
            var l;
            ((l = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : l.kind) === "tab" && (d.preventDefault(), d.stopPropagation());
          }}
                @drop=${(d) => {
            var _, R;
            const l = this._dragCmpId;
            if (!l || l === f.id || ((_ = this.nodeById(l)) == null ? void 0 : _.kind) !== "tab") return;
            d.preventDefault(), d.stopPropagation();
            const g = d.currentTarget.getBoundingClientRect(), x = d.clientX - g.left < g.width / 2 ? f.id : ((R = h[b + 1]) == null ? void 0 : R.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, x !== l && this.emitEvent("component-moved", {
              componentId: l,
              toParentId: e.id,
              beforeComponentId: x
            });
          }}
                >${f.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${m ? this.renderComponent(m) : i}`;
        break;
      }
      case "tab":
        o = A`<div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "accordionLayout":
        o = A`<div class="col-lay">
          ${t.length ? t.map(
          (h, m) => A`
                  <div class="acc-bar"><span>${h.title ?? h.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(h) : se}
                `
        ) : i}
        </div>`;
        break;
      case "card":
        o = A`<div class="card-box">
          ${e.title ? A`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? n(t) : i}</div>
        </div>`;
        break;
      case "boardLayout":
        o = A`<div class="grid3-lay">
          ${t.length ? t.map((h) => A`<div class="board-col">${this.renderComponent(h)}</div>`) : i}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [h, ...m] = t;
        o = A`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${h ? this.renderComponent(h) : A`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? n(m) : A`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = A`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "carouselLayout":
        o = A`<div class="row-lay">${t.length ? n(t) : i}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = A`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? n(t) : i}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const m = e.modelId && e.modelId === ((s = this.page) == null ? void 0 : s.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = m.length ? A`<div class="grid-lay">
              ${m.slice(0, 6).map(
          (f) => A`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`
        )}
            </div>` : A`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const h = (((y = this.page) == null ? void 0 : y.viewmodelFields) ?? []).slice(0, 4);
        o = A`<table>
            <tr>${h.length ? h.map((m) => A`<th>${m.label ?? m.name}</th>`) : A`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => A`<tr>${(h.length ? h : [1, 2, 3]).map(() => A`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : A`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = A`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const h = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = A`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(h)}`;
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
        o = A`<div class="col-lay">${t.length ? n(t) : i}</div>`;
    }
    const a = le.LEAF_KINDS.has(e.kind), r = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), c = (h) => {
      var m, f;
      h.stopPropagation(), this._dragCmpId = e.id, (f = h.dataTransfer) == null || f.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), h.dataTransfer && (h.dataTransfer.effectAllowed = "move");
    };
    return A`<div
      class="cmp ${a ? "leafcmp" : ""} ${r ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(h) => {
      h.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(h) => {
      h.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${c}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(h) => {
      var f;
      h.preventDefault(), h.stopPropagation();
      const m = ((f = h.dataTransfer) == null ? void 0 : f.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, h) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(h) => {
      var m, f, b;
      this._foreignOver = !1, !(!this._dragCmpId && !((b = (f = (m = h.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : f.includes) != null && b.call(f, "application/x-modux-cmp"))) && (h.preventDefault(), h.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, h));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${c}
        >${le.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, n) {
    return A`
        ${n ? A`<table>
              <tr>${t.slice(0, 4).map((i) => A`<th>${i.label ?? i.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => A`<tr>${t.slice(0, 4).map(() => A`<td>···</td>`)}</tr>`)}
            </table>` : se}
        ${t.length ? A`<div class="grid">
              ${t.map(
      (i) => A`
                  <div
                    class="field ${i.colspan === 2 ? "span2" : ""} ${this._overId === i.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${i.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(i)}
                    @dragstart=${(o) => {
        o.stopPropagation(), this._dragId = i.fieldId;
      }}
                    @dragover=${(o) => {
        o.preventDefault(), this._overId = i.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(o) => {
        o.preventDefault(), o.stopPropagation(), this.onDrop(i.fieldId);
      }}
                  >
                    <label>${i.label ?? i.name}</label>
                    ${this.control(i)}
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
    var o, a, r, c;
    const e = this._cmp;
    if (!e) return se;
    const t = (s) => this._cmp = { ...this._cmp, ...s }, n = e.kind, i = [
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
    ].includes(n);
    return A`<div class="pop" @click=${(s) => s.stopPropagation()}>
      ${i ? A`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(s) => t({ title: s.target.value })} />` : se}
      ${n === "text" ? A`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(s) => t({ text: s.target.value })} />` : se}
      ${n === "button" || n === "field" ? A`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(s) => t({ label: s.target.value })} />` : se}
      ${n === "button" ? A`<label>Caso de uso</label>
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
      ${n === "form" ? A`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? A`<span class="chip"
                      >${((r = this.models.find((s) => s.id === e.modelId)) == null ? void 0 : r.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : A`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : se}
      ${n === "listing" ? A`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? A`<span class="chip"
                      >${((c = this.queryOps.find((s) => s.id === e.queryOperationId)) == null ? void 0 : c.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : A`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : se}
      ${n === "field" ? A`<label>Estereotipo</label>
            <select @change=${(s) => t({ stereotype: s.target.value || void 0 })}>
              ${Po.map((s) => A`<option value=${s} ?selected=${s === (e.stereotype ?? "regular")}>${s}</option>`)}
            </select>` : se}
      ${n === "tabLayout" ? A`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
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
    const n = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), i = n.indexOf(t), o = n.indexOf(e);
    i < 0 || o < 0 || (n.splice(o, 0, ...n.splice(i, 1)), this.emitEvent("fields-reordered", { fieldIds: n }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
    const t = e.viewmodelFields ?? [], n = e.type === "CRUD" || !!e.listingQueryServiceId, i = e.type === "WIZARD";
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
        ${i ? A`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const r = (e.wizardSteps ?? []).map((s, p) => s.id ?? s.pageId ?? String(p)), c = r[a];
      return A`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(s) => {
        s.stopPropagation(), this._dragWizKey = c;
      }}
                      @dragover=${(s) => {
        this._dragWizKey && (s.preventDefault(), s.stopPropagation());
      }}
                      @drop=${(s) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === c) return;
        s.preventDefault(), s.stopPropagation();
        const y = s.currentTarget.getBoundingClientRect(), m = s.clientX - y.left < y.width / 2 ? c : r[a + 1] ?? null;
        m !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: m });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : A`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
        ${(e.content ?? []).length ? A`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, n)}
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
      var a, r, c;
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
                        >${((c = this.mappings.find((s) => s.id === this._btn.mappingId)) == null ? void 0 : c.name) ?? this._btn.mappingId}
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
var Bc = Object.defineProperty, Fc = Object.getOwnPropertyDescriptor, ze = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Fc(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Bc(t, n, o), o;
};
const va = 460, Wc = 540, jc = 660;
let Me = class extends Ge {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), n = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (n) {
        const a = n.closest(".frame").dataset.pageId, r = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: r.w, h0: r.h }, e.preventDefault();
        return;
      }
      const i = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-title");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: a }), e.preventDefault();
          return;
        }
        const r = this.pages.findIndex((s) => s.id === a), c = this.posOf(a, r);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: c.x, oy: c.y, moved: !1 }, e.preventDefault();
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
      const n = (e.clientX - t.x) / this._t.k, i = (e.clientY - t.y) / this._t.k;
      if (t.mode === "resize") {
        this._liveSize = {
          id: t.id,
          w: Math.max(280, Math.round(t.w0 + n)),
          h: Math.max(220, Math.round(t.h0 + i))
        };
        return;
      }
      Math.abs(n) + Math.abs(i) > 2 && (t.moved = !0), this._live = { id: t.id, x: t.ox + n, y: t.oy + i };
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
      const t = this.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * o));
      this._t = {
        k: a,
        x: n - (n - this._t.x) / this._t.k * a,
        y: i - (i - this._t.y) / this._t.k * a
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
    const n = this.getBoundingClientRect();
    return {
      x: (e - n.left - this._t.x) / this._t.k,
      y: (t - n.top - this._t.y) / this._t.k
    };
  }
  /**
   * The frame under a client point — and, when the point sits on a node of the
   * frame's content tree, `cmp:<pageId>:<componentId>` so palette drops can nest.
   */
  nodeIdAtClient(e, t) {
    var y, h, m, f, b, d;
    const n = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), i = (h = n == null ? void 0 : n.closest) == null ? void 0 : h.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, a = i.querySelector("modux-page-designer"), r = (m = a == null ? void 0 : a.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), c = (f = r == null ? void 0 : r.closest) == null ? void 0 : f.call(r, "[data-btn-uc]");
    if (c != null && c.dataset.btnUc) return `btn:${o}:${c.dataset.btnUc}`;
    const s = (b = r == null ? void 0 : r.closest) == null ? void 0 : b.call(r, "[data-bar]");
    if (s != null && s.dataset.bar) return `bar:${o}:${s.dataset.bar}`;
    const p = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, f, b, d;
    const n = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), i = (f = n == null ? void 0 : n.closest) == null ? void 0 : f.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, a = i.querySelector("modux-page-designer"), r = (b = a == null ? void 0 : a.shadowRoot) == null ? void 0 : b.elementFromPoint(e, t), c = (d = r == null ? void 0 : r.closest) == null ? void 0 : d.call(r, "[data-cmp-id]");
    if (!c) return { pageId: o, componentId: null, pos: "into" };
    const s = c.dataset.cmpKind ?? "", p = c.getBoundingClientRect(), y = (t - p.top) / Math.max(1, p.height), h = le.LEAF_KINDS.has(s) ? y < 0.5 ? "before" : "after" : y < 0.2 ? "before" : y > 0.8 ? "after" : "into";
    return { pageId: o, componentId: c.dataset.cmpId, pos: h };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: va, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var n;
    return ((n = this._live) == null ? void 0 : n.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Wc, y: Math.floor(t / 3) * jc };
  }
  render() {
    return A`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const n = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), i = this.sizeOf(e.id);
      return A`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${n.x}px; top: ${n.y}px; width: ${i.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${i.h}px; width: ${i.w}px"
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
var Vc = Object.defineProperty, Hc = Object.getOwnPropertyDescriptor, Pe = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Hc(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && Vc(t, n, o), o;
};
const Gc = {
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
}, mi = {
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
}, Kc = {
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
}, To = [30, 20, 13, 9.5, 7.5], Oo = [0, 180, 118, 80, 58], Yc = 0.055, Xc = 0.86, Jc = 2600, An = 240, No = 0.16, Ro = 0.015;
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
      const n = this.selectedNodes();
      if (e.key === "F2" && n.length === 1) {
        e.preventDefault(), this.renaming = { key: n[0].key, value: n[0].label };
        return;
      }
      (e.key === "Delete" || e.key === "Backspace") && n.length && (e.preventDefault(), n.length > 1 ? this.emitUp("delete-selection-requested", {
        items: n.map((i) => ({ id: i.refId, kind: i.kind }))
      }) : this.emitUp("delete-requested", {
        elementType: "node",
        id: n[0].refId,
        kind: n[0].kind
      }), this.selected = /* @__PURE__ */ new Set());
    }, this.frame = 0, this.runnerState = null, this.runnerLastClock = 0;
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
    const e = {}, t = (n) => {
      e[n.key] = { e: n.expanded ? 1 : 0, x: Math.round(n.x), y: Math.round(n.y) };
      for (const i of n.children ?? []) t(i);
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
      for (const [n, i] of Object.entries(t.nodes ?? {})) {
        const o = {
          key: n,
          refId: "",
          kind: "",
          label: "",
          color: "",
          depth: 0,
          expanded: i.e === 1,
          x: i.x,
          y: i.y,
          vx: 0,
          vy: 0,
          scale: 1,
          p1: Math.random() * Math.PI * 2,
          p2: Math.random() * Math.PI * 2,
          f1: 0.35 + Math.random() * 0.4,
          f2: 0.3 + Math.random() * 0.45
        };
        this.prevByKey.has(n) || this.prevByKey.set(n, o);
      }
    } catch {
    }
  }
  firstUpdated() {
    var e;
    if (this.canvas = this.renderRoot.querySelector("canvas") ?? void 0, this.ctx = ((e = this.canvas) == null ? void 0 : e.getContext("2d")) ?? void 0, this.loadState(), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(this), this.resize(), this.buildTree(), this.raf = requestAnimationFrame(() => this.tick()), this.renaming) {
      const t = this.renderRoot.querySelector(".rename"), n = this.visible().find((i) => i.key === this.renaming.key);
      t && n && (t.style.left = `${n.x * this.cam.k + this.cam.x}px`, t.style.top = `${(n.y + this.radiusOf(n) + 6) * this.cam.k + this.cam.y}px`);
    }
  }
  /** Centers the visible tree in the viewport (the toolbar's «Ajustar»). */
  fit() {
    const e = this.visible();
    if (!e.length) return;
    let t = 1 / 0, n = 1 / 0, i = -1 / 0, o = -1 / 0;
    for (const h of e)
      t = Math.min(t, h.x), n = Math.min(n, h.y), i = Math.max(i, h.x), o = Math.max(o, h.y);
    const a = 70, r = this.clientWidth || 800, c = this.clientHeight || 600, s = i - t + a * 2, p = o - n + a * 2, y = Math.min(1.5, Math.max(0.25, Math.min(r / s, c / p)));
    this.cam.k = y, this.cam.x = r / 2 - (t + i) / 2 * y, this.cam.y = c / 2 - (n + o) / 2 * y;
  }
  /** Tree depth the scene reaches (root = 0, top nodes = 1, their children = 2…). */
  sceneDepth() {
    var n;
    if (!this.scene) return 1;
    const e = new Map(this.scene.nodes.map((i) => [i.id, i]));
    let t = 1;
    for (const i of this.scene.nodes) {
      let o = 1;
      for (let a = i.parentId; a; a = (n = e.get(a)) == null ? void 0 : n.parentId) o++;
      t = Math.max(t, o);
    }
    return t;
  }
  updated(e) {
    var t;
    (e.has("model") || e.has("scene")) && this.buildTree(), e.has("sceneKey") && e.get("sceneKey") !== void 0 && this.applyLevels(this.manualLevels.get(this.sceneKey) ?? this.sceneDepth()), e.has("renaming") && this.renaming && ((t = this.renderRoot.querySelector(".rename")) == null || t.select());
  }
  resize() {
    var i;
    if (!this.canvas) return;
    const e = window.devicePixelRatio || 1, t = this.clientWidth || 800, n = this.clientHeight || 600;
    this.canvas.width = t * e, this.canvas.height = n * e, (i = this.ctx) == null || i.setTransform(e, 0, 0, e, 0, 0), this.cam.x === 0 && this.cam.y === 0 && (this.cam.x = t / 2, this.cam.y = n / 2);
  }
  // ── Tree construction (lazy children per node kind) ──────────────────
  buildTree() {
    this.root && this.rememberSubtree(this.root), this.root = this.makeNode("root", "root", "Sistema", 0, void 0), this.root.x = 0, this.root.y = 0, this.prevByKey.has(this.root.key) || (this.root.expanded = !0), this.materialize(this.root), this.buildRelations(), this.allNodes = [];
    const e = (t) => {
      this.allNodes.push(t), t.children || (t.children = this.childrenOf(t));
      for (const n of t.children) e(n);
    };
    e(this.root);
  }
  /** Everything that relates two model elements across the tree's branches. */
  buildRelations() {
    const e = this.model;
    this.related = /* @__PURE__ */ new Map();
    const t = (n, i) => {
      !n || !i || n === i || (this.related.has(n) || this.related.set(n, /* @__PURE__ */ new Set()), this.related.has(i) || this.related.set(i, /* @__PURE__ */ new Set()), this.related.get(n).add(i), this.related.get(i).add(n));
    };
    if (this.scene) {
      for (const n of this.scene.edges) t(n.sourceId, n.targetId);
      return;
    }
    for (const n of e.relations ?? []) t(n.sourceId, n.targetId);
    for (const n of e.useCaseCalls ?? []) t(n.sourceId, n.targetId);
    for (const n of e.queryCalls ?? []) t(n.sourceId, n.targetId);
    for (const n of e.aggregateCalls ?? []) t(n.sourceId, n.targetId);
    for (const n of e.aggregateReferences ?? []) t(n.sourceAggregateId, n.targetAggregateId);
    for (const n of e.emissions ?? []) t(n.sourceId, n.domainEventId);
    for (const n of e.useCaseEmissions ?? []) t(n.sourceId, n.domainEventId);
    for (const n of e.actorUses ?? []) t(n.actorId, n.targetId);
    for (const n of e.actorAppUses ?? []) t(n.actorId, n.appId);
    for (const n of e.actorExternalDependencies ?? []) t(n.actorId, n.externalSystemId);
    for (const n of e.actorAgentUses ?? []) t(n.actorId, n.agentId);
    for (const n of e.externalSystemDependencies ?? []) t(n.sourceId, n.targetId);
    for (const n of e.externalCalls ?? []) t(n.externalSystemId, n.useCaseId);
    for (const n of e.externalUseCaseCalls ?? []) t(n.sourceId, n.targetId);
    for (const n of e.agentUses ?? []) t(n.agentId, n.useCaseId);
    for (const n of e.agentExternalUses ?? []) t(n.agentId, n.externalUseCaseId);
    for (const n of e.agentDelegations ?? []) t(n.agentId, n.delegateAgentId);
    for (const n of e.uiApps ?? []) t(n.id, n.identityProviderId);
    for (const n of e.boundedContexts) t(n.id, n.identityProviderId);
    for (const n of e.etlFlows ?? []) t(n.id, n.identityProviderId);
    for (const n of e.identityProviders ?? []) t(n.id, n.publishedByExternalSystemId);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, n, i, o) {
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, r = this.prevByKey.get(a), c = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: n,
      color: Gc[e] ?? "#64748b",
      depth: i,
      parent: o,
      expanded: (r == null ? void 0 : r.expanded) ?? !1,
      x: (r == null ? void 0 : r.x) ?? (o ? o.x + c() : 0),
      y: (r == null ? void 0 : r.y) ?? (o ? o.y + c() : 0),
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
    const t = this.model, n = e.depth + 1, i = (o, a, r) => this.makeNode(o, a, r, n, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => e.kind === "root" ? !o.parentId : o.parentId === e.refId).map((o) => {
        const a = i(o.kind || "node", o.id, o.label);
        return o.stroke && (a.color = o.stroke), a;
      });
    switch (e.kind) {
      case "root":
        return [
          ...t.boundedContexts.map((o) => i("boundedContext", o.id, o.name)),
          ...t.externalSystems.map((o) => i("external-system", o.id, o.name)),
          ...(t.uiApps ?? []).map((o) => i("ui-app", o.id, o.name)),
          ...(t.actors ?? []).map((o) => i("actor", o.id, o.name)),
          ...(t.aiAgents ?? []).filter((o) => !o.external).map((o) => i("ai-agent", o.id, o.name)),
          ...(t.workflows ?? []).map((o) => i("workflow", o.id, o.name)),
          ...(t.identityProviders ?? []).map((o) => i("identity-provider", o.id, o.name))
        ];
      case "boundedContext": {
        const o = t.boundedContexts.find((p) => p.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((p) => p.boundedContextId === e.refId), r = o.useCases ?? [], c = new Set(a.map((p) => p.id)), s = new Set(
          (t.emissions ?? []).filter((p) => c.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [i("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...r.length ? [i("group", `use-cases:${e.refId}`, `Casos de uso · ${r.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !s.has(p.id)).map((p) => i("domain-event", p.id, p.name)),
          ...(o.applicationEvents ?? []).map((p) => i("application-event", p.id, p.name)),
          ...(o.readModels ?? []).map((p) => i("read-model", p.id, p.name)),
          ...(o.domainServices ?? []).map((p) => i("domain-service", p.id, p.name)),
          ...(o.queryServices ?? []).map((p) => i("query-service", p.id, p.name)),
          ...(o.scheduledTriggers ?? []).map((p) => i("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => i("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => i("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => i("document", p.id, p.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), r = e.refId.slice(o + 1), c = t.boundedContexts.find((s) => s.id === r);
        return c ? a === "aggregates" ? (t.aggregates ?? []).filter((s) => s.boundedContextId === r).map((s) => i("aggregate", s.id, s.name)) : (c.useCases ?? []).map((s) => i(s.policy ? "policy" : "use-case", s.id, s.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => i("entity", a.id, a.name)),
          ...t.boundedContexts.flatMap((a) => a.domainEvents ?? []).filter((a) => o.has(a.id)).map((a) => i("domain-event", a.id, a.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((a) => a.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((a) => a.publishedByExternalSystemId === e.refId).map((a) => i("api", a.id, a.name)),
          ...(o.useCases ?? []).map((a) => i("external-use-case", a.id, a.name)),
          ...(o.tables ?? []).map((a) => i("external-table", a.id, a.name)),
          ...(o.mcpServers ?? []).map((a) => i("mcp-server", a.id, a.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((a) => a.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((a) => i("api-operation", a.id, a.name));
      }
      case "ui-app": {
        const o = (t.uiApps ?? []).find((c) => c.id === e.refId);
        if (!o) return [];
        const a = /* @__PURE__ */ new Set(), r = (c) => {
          for (const s of c ?? [])
            s.pageId && a.add(s.pageId), r(s.children);
        };
        r(o.menuItems);
        for (const c of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          c && a.add(c);
        return [...a].map((c) => (t.pages ?? []).find((s) => s.id === c)).filter((c) => !!c).map((c) => i("page", c.id, c.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (n) => {
      if (!(this.focusKeys && !this.focusKeys.has(n.key)) && (e.push(n), n.expanded))
        for (const i of n.children ?? []) t(i);
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
    const t = (n) => {
      if (n.children || (n.children = this.childrenOf(n)), n.expanded = n.depth < e && n.children.length > 0, n.expanded) for (const i of n.children) t(i);
    };
    this.root && t(this.root), this.saveState();
  }
  /** A curated view out of the CURRENT picture: whatever is unfolded, as members. */
  createViewFromVisible() {
    const e = this._viewName.trim();
    if (!e) return;
    const n = (this.selected.size ? this.selectedNodes() : this.visible()).filter((i) => i.kind !== "root" && i.kind !== "group" && i.refId).map((i) => ({ id: i.refId, kind: i.kind }));
    this._viewNaming = !1, this._viewName = "", this.dispatchEvent(
      new CustomEvent("explorer-create-view", {
        detail: { name: e, members: n },
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
    const t = /* @__PURE__ */ new Set(), n = (r) => {
      for (let c = r; c; c = c.parent) t.add(c.key);
    }, i = (r) => {
      t.add(r.key);
      for (const c of r.children ?? []) i(c);
    };
    n(e), i(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const r of this.allNodes)
        r.refId && o.has(r.refId) && n(r);
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
        const c = (Oo[Math.min(r.depth, Oo.length - 1)] ?? 60) + Math.min(60, ((((a = r.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let s = r.x - r.parent.x, p = r.y - r.parent.y, y = Math.hypot(s, p);
        if (y < 0.01) {
          const b = Math.random() * Math.PI * 2;
          s = Math.cos(b) * 0.1, p = Math.sin(b) * 0.1, y = 0.1;
        }
        const h = Yc * (y - c), m = s / y * h, f = p / y * h;
        r.vx -= m, r.vy -= f, r.parent.vx += m * 0.4, r.parent.vy += f * 0.4;
      } else
        r.vx -= r.x * Ro, r.vy -= r.y * Ro;
      !this.reducedMotion && this._motion > 0 && (r.vx += Math.sin(t * r.f1 * Math.PI * 2 + r.p1) * No * this._motion, r.vy += Math.cos(t * r.f2 * Math.PI * 2 + r.p2) * No * this._motion);
    }
    for (let r = 0; r < e.length; r++) {
      const c = e[r];
      for (let s = r + 1; s < e.length; s++) {
        const p = e[s], y = p.x - c.x, h = p.y - c.y;
        if (Math.abs(y) > An || Math.abs(h) > An) continue;
        const m = y * y + h * h;
        if (m > An * An || m < 0.01) continue;
        const f = Math.sqrt(m), b = c.depth <= 1 && p.depth <= 1 ? 3 : 1, d = Jc * b / m, l = y / f * d, g = h / f * d;
        c.vx -= l, c.vy -= g, p.vx += l, p.vy += g;
      }
    }
    const n = this._motion, i = Xc * n + 0.5 * (1 - n), o = (1 - n) * 0.7;
    for (const r of e) {
      if (r === this.dragNode) {
        r.vx = 0, r.vy = 0;
        continue;
      }
      r.vx *= i, r.vy *= i;
      const c = Math.hypot(r.vx, r.vy);
      if (c > 14 && (r.vx = r.vx / c * 14, r.vy = r.vy / c * 14), o > 0 && c < o) {
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
    var r, c;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const n = this.clientWidth, i = this.clientHeight;
    t.clearRect(0, 0, n, i), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const s of e)
      s.parent && (t.strokeStyle = s.color + "55", t.beginPath(), t.moveTo(s.parent.x, s.parent.y), t.lineTo(s.x, s.y), t.stroke());
    const o = this.journeyTouchedIds(e), a = (s) => `${s}px system-ui, sans-serif`;
    for (const s of e) {
      o && (t.globalAlpha = o.has(s.refId) ? 1 : 0.22);
      const p = this.radiusOf(s);
      t.beginPath(), t.arc(s.x, s.y, p, 0, Math.PI * 2), t.fillStyle = s.expanded ? s.color + "22" : "#ffffff", t.fill(), t.lineWidth = (s === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = s.color, t.stroke(), this.drawGlyph(t, s, p);
      const y = ((r = s.children) == null ? void 0 : r.length) ?? 0;
      if (!s.expanded && y > 0) {
        const m = Math.max(7, p * 0.42), f = s.x + p * 0.75, b = s.y + p * 0.75;
        t.beginPath(), t.arc(f, b, m, 0, Math.PI * 2), t.fillStyle = s.color, t.fill(), t.fillStyle = "#ffffff", t.font = a(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(y), f, b + 0.5);
      }
      if (s.depth <= 1 || s === this.hover || this.cam.k > 0.65) {
        const m = s.label.length > 22 ? s.label.slice(0, 21) + "…" : s.label;
        t.font = s === this.hover ? `600 ${a(12)}` : a(s.depth <= 1 ? 12 : 10.5), t.fillStyle = s === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(m, s.x, s.y + p + 4);
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
        const s = this.found.node, p = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, p * 1.6), t.strokeStyle = s.color, t.lineWidth = 2.2 / this.cam.k;
        const y = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(s.x, s.y, this.radiusOf(s) + 9 + y, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(s.x, s.y, this.radiusOf(s) + 18 + y * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.journey && this.drawJourney(t, e), this._threads)
      for (const s of e) this.drawThreads(t, s, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((c = this.hover.children) != null && c.length) && this.drawGhosts(t, this.hover), this.linking) {
      const s = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
    }
    t.restore(), this.hover && !this.linking && this.drawCard(t, this.hover, n, i);
  }
  /**
   * Cross-relations as faint threads: hovering a node reveals what it talks
   * to across the tree (calls, events, actor uses, IdP trust…) without
   * cluttering the resting picture. Only threads to visible nodes are drawn.
   */
  drawThreads(e, t, n) {
    const i = this.related.get(t.refId);
    if (!(i != null && i.size)) return;
    const o = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(o <= 0.02)) {
      e.save(), e.globalAlpha = o, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const a of n) {
        if (a === t || !i.has(a.refId) || a === t.parent || a.parent === t) continue;
        const r = (t.x + a.x) / 2, c = (t.y + a.y) / 2, s = a.x - t.x, p = a.y - t.y, y = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(r - p * y, c + s * y, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
    for (const n of this.journey.legs) {
      const i = this.visibleRepresentative(n.sourceId, e), o = this.visibleRepresentative(n.targetId, e);
      i && t.add(i.refId), o && t.add(o.refId);
    }
    return t;
  }
  visibleRepresentative(e, t) {
    var o;
    const n = new Map(t.map((a) => [a.refId, a])), i = new Map((((o = this.scene) == null ? void 0 : o.nodes) ?? []).map((a) => [a.id, a.parentId]));
    for (let a = e; a; a = i.get(a)) {
      const r = n.get(a);
      if (r) return r;
    }
    return null;
  }
  /** Quadratic-curve geometry of one leg over the VISIBLE representatives, or null. */
  legGeometry(e, t) {
    const n = this.visibleRepresentative(e.sourceId, t), i = this.visibleRepresentative(e.targetId, t);
    if (!n || !i || n === i) return null;
    const o = (n.x + i.x) / 2, a = (n.y + i.y) / 2, r = 0.14;
    return { a: n, b: i, cx: o - (i.y - n.y) * r, cy: a + (i.x - n.x) * r };
  }
  /** The active journey as a bold amber layer: directed curves, numbered badges. */
  drawJourney(e, t) {
    if (this.journey) {
      e.save();
      for (const n of this.journey.legs) {
        const i = this.visibleRepresentative(n.sourceId, t), o = this.visibleRepresentative(n.targetId, t);
        if (!i || !o || i === o) continue;
        const a = (i.x + o.x) / 2, r = (i.y + o.y) / 2, c = o.x - i.x, s = o.y - i.y, p = 0.14, y = a - s * p, h = r + c * p;
        e.strokeStyle = "#d97706", e.lineWidth = 2.4 / this.cam.k, e.setLineDash([9 / this.cam.k, 7 / this.cam.k]), e.beginPath(), e.moveTo(i.x, i.y), e.quadraticCurveTo(y, h, o.x, o.y), e.stroke(), e.setLineDash([]);
        const m = o.x - y, f = o.y - h, b = Math.hypot(m, f) || 1, d = m / b, l = f / b, g = this.radiusOf(o) + 4, k = o.x - d * g, x = o.y - l * g, _ = 9 / this.cam.k;
        e.fillStyle = "#d97706", e.beginPath(), e.moveTo(k, x), e.lineTo(k - d * _ - l * _ * 0.55, x - l * _ + d * _ * 0.55), e.lineTo(k - d * _ + l * _ * 0.55, x - l * _ - d * _ * 0.55), e.closePath(), e.fill();
        const R = a - s * p * 0.5, L = r + c * p * 0.5, D = 11 / this.cam.k;
        e.beginPath(), e.arc(R, L, D, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.fillStyle = "#ffffff", e.font = `bold ${12 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(n.num, R, L);
      }
      this.drawJourneyRunner(e, t), e.restore();
    }
  }
  /**
   * A traveller tours the journey: it enters at a run's origin, follows its legs
   * — curve by curve — and when it arrives the NEXT run takes the stage, looping
   * through every route the DAG offers.
   */
  drawJourneyRunner(e, t) {
    var b, d;
    if (!((d = (b = this.journey) == null ? void 0 : b.runs) != null && d.length)) {
      this.runnerState = null;
      return;
    }
    const n = new Map(this.journey.legs.map((l) => [l.id, l])), i = this.journey.runs.map(
      (l) => l.map((g) => n.get(g)).filter((g) => !!g).map((g) => this.legGeometry(g, t)).filter((g) => !!g)
    ).filter((l) => l.length > 0);
    if (!i.length) {
      this.runnerState = null;
      return;
    }
    const o = 170, a = 0.5, r = Math.max(0, Math.min(0.1, this.t - this.runnerLastClock));
    this.runnerLastClock = this.t;
    let c = this.runnerState;
    if ((!c || c.run >= i.length) && (c = this.runnerState = { run: 0, leg: 0, t: 0, pause: 0 }), c.pause > 0) {
      c.pause -= r;
      return;
    }
    c.leg >= i[c.run].length && (c.leg = i[c.run].length - 1);
    let s = i[c.run][c.leg];
    const p = (l) => Math.max(24, Math.hypot(l.b.x - l.a.x, l.b.y - l.a.y));
    for (c.t += r * o / p(s); c.t >= 1; ) {
      if (c.t -= 1, c.leg++, c.leg >= i[c.run].length) {
        c.run = (c.run + 1) % i.length, c.leg = 0, c.t = 0, c.pause = a;
        return;
      }
      s = i[c.run][c.leg], c.t = c.t * 1;
    }
    const y = c.t, h = 1 - y, m = h * h * s.a.x + 2 * h * y * s.cx + y * y * s.b.x, f = h * h * s.a.y + 2 * h * y * s.cy + y * y * s.b.y;
    e.save(), e.beginPath(), e.arc(m, f, 7 / this.cam.k, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.lineWidth = 2 / this.cam.k, e.strokeStyle = "#ffffff", e.stroke(), e.restore();
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const n = t.children ?? [], i = n.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const r = this.radiusOf(t) + 24, c = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, s = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, i.forEach((p, y) => {
      const h = c - s / 2 + s * (y + 0.5) / i.length, m = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, f = t.x + Math.cos(h) * (r + m), b = t.y + Math.sin(h) * (r + m);
      e.beginPath(), e.arc(f, b, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), n.length > i.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = c + s / 2 + 0.35;
      e.fillText(`+${n.length - i.length}`, t.x + Math.cos(p) * r, t.y + Math.sin(p) * r);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, n) {
    const i = n * 0.42;
    if (i < 3.2) return;
    const { x: o, y: a } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, i * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "group": {
        e.arc(o - i * 0.45, a, i * 0.16, 0, Math.PI * 2), e.moveTo(o + i * 0.16, a), e.arc(o, a, i * 0.16, 0, Math.PI * 2), e.moveTo(o + i * 0.61, a), e.arc(o + i * 0.45, a, i * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, a, i, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - i * Math.cos(Math.PI * 0.35), a + i * Math.sin(Math.PI * 0.35)), e.arc(o, a, i, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, a, i, 0, Math.PI * 2), e.moveTo(o + i * 0.35, a), e.arc(o, a, i * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [r, c] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + r * i + i * 0.3, a + c * i), e.arc(o + r * i, a + c * i, i * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, a - i), e.lineTo(o + i, a), e.lineTo(o, a + i), e.lineTo(o - i, a), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - i, a - i * 0.8, i * 2, i * 1.6), e.moveTo(o - i, a - i * 0.25), e.lineTo(o + i, a - i * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - i * 0.6, a - i * 0.85), e.lineTo(o + i * 0.85, a), e.lineTo(o - i * 0.6, a + i * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + i * 0.3, a - i), e.lineTo(o - i * 0.5, a + i * 0.15), e.lineTo(o + i * 0.05, a + i * 0.15), e.lineTo(o - i * 0.3, a + i), e.lineTo(o + i * 0.5, a - i * 0.15), e.lineTo(o - i * 0.05, a - i * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, a, i * 0.5, 0, Math.PI * 2);
        for (let r = 0; r < 6; r++) {
          const c = r * Math.PI / 3;
          e.moveTo(o + Math.cos(c) * i * 0.55, a + Math.sin(c) * i * 0.55), e.lineTo(o + Math.cos(c) * i, a + Math.sin(c) * i);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - i * 0.25, a - i * 0.25, i * 0.6, 0, Math.PI * 2), e.moveTo(o + i * 0.25, a + i * 0.25), e.lineTo(o + i, a + i), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, a, i, 0, Math.PI * 2), e.moveTo(o, a - i * 0.55), e.lineTo(o, a), e.lineTo(o + i * 0.45, a + i * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - i * 0.85, a + i * 0.45), e.quadraticCurveTo(o - i * 0.85, a - i, o, a - i), e.quadraticCurveTo(o + i * 0.85, a - i, o + i * 0.85, a + i * 0.45), e.closePath(), e.moveTo(o + i * 0.25, a + i * 0.75), e.arc(o, a + i * 0.75, i * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - i * 0.7, a - i), e.lineTo(o + i * 0.25, a - i), e.lineTo(o + i * 0.7, a - i * 0.55), e.lineTo(o + i * 0.7, a + i), e.lineTo(o - i * 0.7, a + i), e.closePath(), e.moveTo(o + i * 0.25, a - i), e.lineTo(o + i * 0.25, a - i * 0.55), e.lineTo(o + i * 0.7, a - i * 0.55), e.stroke();
        break;
      case "workflow":
        for (const r of [-0.7, 0.1])
          e.moveTo(o + r * i, a - i * 0.7), e.lineTo(o + (r + 0.6) * i, a), e.lineTo(o + r * i, a + i * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - i * 0.45, a - i * 0.45, i * 0.45, 0, Math.PI * 2), e.moveTo(o - i * 0.1, a - i * 0.1), e.lineTo(o + i * 0.9, a + i * 0.9), e.moveTo(o + i * 0.45, a + i * 0.45), e.lineTo(o + i * 0.85, a + i * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, a - i * 0.5, i * 0.42, 0, Math.PI * 2), e.moveTo(o - i * 0.8, a + i), e.quadraticCurveTo(o, a - i * 0.1, o + i * 0.8, a + i), e.stroke();
        break;
      case "ai-agent":
        for (let r = 0; r < 4; r++) {
          const c = r * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(c) * i, a + Math.sin(c) * i), e.moveTo(o, a), e.lineTo(o + Math.cos(c + Math.PI / 4) * i * 0.5, a + Math.sin(c + Math.PI / 4) * i * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - i * 0.45, a + i * 0.15, i * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + i * 0.1, a - i * 0.35, i * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + i * 0.55, a + i * 0.2, i * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [r, c] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + r * i, a + c * i, i * 0.85, i * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - i, a - i * 0.8, i * 2, i * 1.6), e.moveTo(o - i, a - i * 0.35), e.lineTo(o + i, a - i * 0.35), e.stroke(), e.beginPath(), e.arc(o - i * 0.7, a - i * 0.57, i * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - i * 0.25, a - i), e.lineTo(o - i, a), e.lineTo(o - i * 0.25, a + i), e.moveTo(o + i * 0.25, a - i), e.lineTo(o + i, a), e.lineTo(o + i * 0.25, a + i), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - i, a), e.lineTo(o + i * 0.7, a), e.moveTo(o + i * 0.1, a - i * 0.5), e.lineTo(o + i * 0.8, a), e.lineTo(o + i * 0.1, a + i * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, a + i * 0.25, i * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - i * 0.35, a + i * 0.25), e.lineTo(o - i * 0.35, a - i * 0.7), e.moveTo(o + i * 0.35, a + i * 0.25), e.lineTo(o + i * 0.35, a - i * 0.7), e.stroke();
        break;
      default:
        e.arc(o, a, i * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, n, i) {
    var D, q;
    const o = (t.children ?? []).flatMap(
      (v) => v.kind === "group" ? v.children ?? (v.children = this.childrenOf(v)) : [v]
    ), a = /* @__PURE__ */ new Map();
    for (const v of o) a.set(v.kind, (a.get(v.kind) ?? 0) + 1);
    const r = [];
    for (const [v, E] of a)
      if (r.push(`${E} ${E === 1 ? (mi[v] ?? v).toLowerCase() : Kc[v] ?? v}`), r.length === 4) {
        const V = [...a.keys()].length - 4;
        V > 0 && (r[3] += ` (+${V} tipos más)`);
        break;
      }
    const c = o.slice(0, 6).map((v) => ({ label: v.label.length > 30 ? v.label.slice(0, 29) + "…" : v.label, color: v.color })), s = o.length - c.length, p = t.label, y = mi[t.kind] ?? t.kind, h = ((D = t.children) != null && D.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((q = t.children) != null && q.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const m = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const f = Math.max(
      e.measureText(y).width,
      ...r.map((v) => e.measureText(v).width),
      ...c.map((v) => e.measureText(v.label).width + 12),
      e.measureText(h).width
    ), b = Math.min(300, Math.max(m, f) + 24), d = c.length ? 8 + c.length * 15 + (s > 0 ? 15 : 0) : 0, l = 40 + r.length * 15 + d + (h ? 18 : 0), g = this.radiusOf(t) * this.cam.k, k = this.cam.x + t.x * this.cam.k, x = this.cam.y + t.y * this.cam.k;
    let _ = k + g + 14;
    _ + b > n - 8 && (_ = k - g - 14 - b), _ = Math.max(8, Math.min(_, n - b - 8));
    const R = Math.max(8, Math.min(x - 10, i - l - 8));
    e.translate(_, R), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, b, l, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(y, 12, 25), e.fillStyle = "#475569", r.forEach((v, E) => e.fillText(v, 12, 41 + E * 15));
    let L = 41 + r.length * 15 + (c.length ? 8 : 0);
    c.forEach((v) => {
      e.fillStyle = v.color, e.beginPath(), e.arc(15, L + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(v.label, 24, L), L += 15;
    }), s > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${s} más`, 24, L)), h && (e.fillStyle = "#94a3b8", e.fillText(h, 12, l - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = he.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((n) => n.kind !== "root" && he.fold(n.label).includes(t)).slice(0, 8);
  }
  onSearchKeydown(e) {
    e.key === "ArrowDown" ? (e.preventDefault(), this._active = Math.min(this._active + 1, this._sugs.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), this._active = Math.max(this._active - 1, 0)) : e.key === "Enter" && this._sugs.length ? (this.flyToNode(this._sugs[this._active]), e.target.blur()) : e.key === "Escape" && (this._q = "", this._sugs = [], e.target.blur());
  }
  /** Where the node lives, for disambiguation («Reservas › Reserva»). */
  pathOf(e) {
    const t = [];
    for (let n = e.parent; n && n.kind !== "root"; n = n.parent) t.unshift(n.label);
    return t.join(" › ");
  }
  /** Expands the path to the node (each level explodes) and flies the camera. */
  flyToNode(e) {
    const t = [];
    for (let n = e.parent; n; n = n.parent) t.unshift(n);
    for (const n of t) n.expanded || this.toggle(n);
    this.flight = { node: e, until: this.t + 1.5 }, this.found = { node: e, until: this.t + 3.2 }, this._q = "", this._sugs = [], this.saveState();
  }
  /** Eases the camera towards the flight target, re-aiming as physics moves it. */
  stepFlight() {
    if (!this.flight) return;
    if (this.t > this.flight.until) {
      this.flight = void 0;
      return;
    }
    const e = this.flight.node, t = this.clientWidth || 800, n = this.clientHeight || 600, i = Math.max(0.9, Math.min(1.2, this.cam.k));
    this.cam.k += (i - this.cam.k) * 0.08, this.cam.x += (t / 2 - e.x * this.cam.k - this.cam.x) * 0.12, this.cam.y += (n / 2 - e.y * this.cam.k - this.cam.y) * 0.12;
  }
  // ── Interaction ───────────────────────────────────────────────────────
  /** A client point → world coordinates (palette drops share the canvas contract). */
  sceneFromClient(e, t) {
    const n = this.getBoundingClientRect();
    return {
      x: (e - n.left - this.cam.x) / this.cam.k,
      y: (t - n.top - this.cam.y) / this.cam.k
    };
  }
  /** The MODEL element under a client point (its refId), for palette drops. */
  nodeIdAtClient(e, t) {
    const n = this.sceneFromClient(e, t), i = this.nodeAt(n.x, n.y);
    return i && i.kind !== "root" && i.kind !== "group" && i.refId ? i.refId : null;
  }
  /** The refId chain from the element up to the root (grouping nodes skipped). */
  chainOf(e) {
    const t = this.allNodes.find((i) => i.refId === e), n = [];
    for (let i = t; i; i = i.parent)
      i.refId && i.kind !== "group" && i.kind !== "root" && n.push(i.refId);
    return n.length ? n : [e];
  }
  toWorld(e) {
    const t = this.getBoundingClientRect();
    return {
      x: (e.clientX - t.left - this.cam.x) / this.cam.k,
      y: (e.clientY - t.top - this.cam.y) / this.cam.k
    };
  }
  nodeAt(e, t) {
    const n = this.visible();
    for (let i = n.length - 1; i >= 0; i--) {
      const o = n[i], a = this.radiusOf(o) + 4 / this.cam.k;
      if ((e - o.x) ** 2 + (t - o.y) ** 2 <= a * a) return o;
    }
  }
  onPointerDown(e) {
    this.flight = void 0;
    const t = this.toWorld(e);
    this.downAt = { x: e.clientX, y: e.clientY }, this.moved = !1;
    const n = this.nodeAt(t.x, t.y);
    if (n && n.kind !== "root" && (e.shiftKey || e.ctrlKey)) {
      this.linking = { source: n, x: t.x, y: t.y };
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
      }
      return;
    }
    n ? this.dragNode = n : this._space ? this.panning = !0 : this.rubber = { ax: t.x, ay: t.y, bx: t.x, by: t.y, additive: e.shiftKey }, this.focus();
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  onPointerMove(e) {
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 4 && (this.moved = !0), this.linking) {
      const i = this.toWorld(e);
      this.linking.x = i.x, this.linking.y = i.y, this.hover = this.nodeAt(i.x, i.y);
      return;
    }
    if (this.dragNode) {
      const i = this.toWorld(e);
      this.dragNode.x = i.x, this.dragNode.y = i.y;
      return;
    }
    if (this.rubber && e.buttons & 1) {
      const i = this.toWorld(e);
      this.rubber.bx = i.x, this.rubber.by = i.y;
      return;
    }
    if (this.panning && e.buttons & 1) {
      this.cam.x += e.movementX, this.cam.y += e.movementY;
      return;
    }
    const t = this.toWorld(e), n = this.hover;
    this.hover = this.nodeAt(t.x, t.y), this.hover !== n && (this.hoverAt = this.t), this.canvas && (this.canvas.style.cursor = this.hover ? "pointer" : "default");
  }
  onPointerUp(e) {
    if (this.linking) {
      const n = this.toWorld(e), i = this.nodeAt(n.x, n.y), o = this.linking.source;
      this.linking = void 0, i && i !== o && i.kind !== "root" && o.refId && i.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: o.refId, targetId: i.refId, x: e.clientX, y: e.clientY },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (this.rubber) {
      const n = this.rubber;
      if (this.rubber = void 0, this.moved) {
        const i = Math.min(n.ax, n.bx), o = Math.max(n.ax, n.bx), a = Math.min(n.ay, n.by), r = Math.max(n.ay, n.by), c = this.visible().filter((s) => s.kind !== "root" && s.kind !== "group" && s.refId).filter((s) => s.x >= i && s.x <= o && s.y >= a && s.y <= r).map((s) => s.key);
        this.selected = new Set(n.additive ? [...this.selected, ...c] : c);
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
      const n = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, i = e.parent ? Math.PI * 1.25 : Math.PI * 2, o = e.children;
      o.forEach((a, r) => {
        this.materialize(a.parent);
        const c = n - i / 2 + i * (r + 0.5) / o.length;
        a.x = e.x + Math.cos(c) * 6, a.y = e.y + Math.sin(c) * 6, a.vx = Math.cos(c) * 7, a.vy = Math.sin(c) * 7, a.children || (a.children = this.childrenOf(a));
      }), e.vx -= Math.cos(n) * 2, e.vy -= Math.sin(n) * 2;
    }
  }
  onDblClick(e) {
    const t = this.getBoundingClientRect(), n = (e.clientX - t.left - this.cam.x) / this.cam.k, i = (e.clientY - t.top - this.cam.y) / this.cam.k, o = this.nodeAt(n, i);
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
    const t = this.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * o)), r = a / this.cam.k;
    this.cam.x = n - (n - this.cam.x) * r, this.cam.y = i - (i - this.cam.y) * r, this.cam.k = a;
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
        const t = this.visible().find((i) => i.key === this.renaming.key), n = this.renaming.value.trim();
        this.renaming = null, t && n && n !== t.label && (t.label = n, this.emitUp("node-renamed", { id: t.refId, kind: t.kind, name: n }));
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
                  <span class="path">${this.pathOf(e) || (mi[e.kind] ?? e.kind)}</span>
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
function Qc(e, t) {
  var n, i, o, a, r, c, s, p, y, h, m, f, b;
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
      const d = (e.model.models ?? []).find((g) => g.id === t.id);
      if (!d) return null;
      const l = [{ kind: "add-model", id: d.id, name: d.name }];
      for (const g of e.model.pages ?? []) {
        g.modelId === t.id && l.push({ kind: "set-page-model", pageId: g.id, modelId: t.id });
        const k = (x) => {
          for (const _ of x ?? [])
            _.modelId === t.id && l.push({ kind: "set-page-component", pageId: g.id, componentId: _.id, modelId: t.id }), k(_.children);
        };
        k(g.content);
      }
      for (const g of e.model.uiApps ?? [])
        g.modelId === t.id && l.push({ kind: "set-app-model", appId: g.id, modelId: t.id });
      return l;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const d = (e.model.pages ?? []).find((g) => g.id === t.pageId), l = t.kind === "set-crud-detail";
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
      const d = (((n = (e.model.pages ?? []).find((l) => l.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).find((l) => (l.id ?? l.pageId) === t.itemId);
      return d ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: d.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const d = (((i = (e.model.pages ?? []).find((g) => g.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((g) => g.id ?? g.pageId), l = d.indexOf(t.targetId);
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
      const g = (k, x) => {
        for (const _ of k ?? [])
          l.push({
            kind: "add-menu-item",
            appId: d.id,
            label: _.label,
            itemId: _.id,
            parentId: x == null ? void 0 : x.id,
            parentLabel: x && !x.id ? x.label : void 0,
            pageId: _.pageId ?? null
          }), _.uiAdapterId && l.push({ kind: "set-menu-app", appId: d.id, toAppId: _.uiAdapterId, itemId: _.id, label: _.label }), _.useCaseId && l.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: _.useCaseId, itemId: _.id, label: _.label }), _.aggregateId && l.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: _.aggregateId, itemId: _.id, label: _.label }), _.queryOperationId && l.push({
            kind: "set-menu-query-operation",
            appId: d.id,
            queryServiceId: _.queryServiceId ?? null,
            queryOperationId: _.queryOperationId,
            itemId: _.id,
            label: _.label
          }), g(_.children, _);
      };
      g(d.menuItems);
      for (const k of e.model.actorAppUses ?? [])
        k.appId === t.id && l.push({ kind: "add-actor-app", actorId: k.actorId, appId: t.id });
      return l;
    }
    case "delete-ui-page": {
      const d = (e.model.pages ?? []).find((g) => g.id === t.id);
      if (!d) return null;
      const l = [
        { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
      ];
      d.route && l.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && l.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && l.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
      for (const g of d.buttons ?? [])
        g.useCaseId && (l.push({ kind: "add-page-button", pageId: d.id, useCaseId: g.useCaseId, label: g.label }), g.mappingId && l.push({
          kind: "set-page-button",
          pageId: d.id,
          useCaseId: g.useCaseId,
          label: g.label ?? null,
          mappingId: g.mappingId
        }));
      for (const g of d.viewmodelFields ?? [])
        (g.stereotype || g.colspan || g.label) && l.push({
          kind: "set-page-field-config",
          pageId: d.id,
          fieldId: g.fieldId,
          stereotype: g.stereotype ?? null,
          colspan: g.colspan ?? null,
          label: g.label ?? null
        });
      (d.viewmodelFields ?? []).length && l.push({
        kind: "set-page-field-order",
        pageId: d.id,
        fieldIds: (d.viewmodelFields ?? []).map((g) => g.fieldId)
      });
      for (const g of d.content ?? [])
        l.push(...e.rebuildComponentOps(d.id, g, void 0, null).ops);
      for (const g of d.wizardSteps ?? [])
        l.push({
          kind: "add-page-wizard-step",
          pageId: d.id,
          targetId: g.pageId ?? null,
          label: g.label,
          itemId: g.id
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
        for (const x of k ?? []) {
          if (t.itemId ? x.id === t.itemId : x.label === t.label) return x;
          const _ = l(x.children);
          if (_) return _;
        }
        return null;
      }, g = t.itemId || t.label ? l(d == null ? void 0 : d.menuItems) : null;
      return g ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: g.label,
        pageId: g.pageId ?? null,
        itemId: g.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: g.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: g.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: g.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: g.queryServiceId ?? null,
        queryOperationId: g.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: g.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const d = (e.model.pages ?? []).find((g) => g.id === t.pageId), l = ((d == null ? void 0 : d.buttons) ?? []).find((g) => g.useCaseId === t.useCaseId);
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
      const d = (e.model.pages ?? []).find((g) => g.id === t.pageId), l = ((d == null ? void 0 : d.buttons) ?? []).find((g) => g.useCaseId === t.useCaseId);
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
      let l = null, g = null, k = null;
      const x = (R, L) => {
        var q;
        const D = R ?? [];
        for (let v = 0; v < D.length; v++)
          D[v].id === t.componentId && (l = D[v], g = L, k = ((q = D[v + 1]) == null ? void 0 : q.id) ?? null), x(D[v].children, D[v]);
      };
      if (x(d == null ? void 0 : d.content, null), !l) return null;
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
        parentComponentId: g === null ? null : g.id,
        beforeComponentId: k
      }] : e.rebuildComponentOps(
        t.pageId,
        _,
        g === null ? void 0 : g.id,
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
      const d = e.model.boundedContexts.find((g) => g.id === t.id);
      if (!d) return null;
      const l = e.model.relations.filter(
        (g) => (g.sourceId === t.id || g.targetId === t.id) && g.type != null
      );
      return [
        { kind: "add-boundedContext", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...l.map(
          (g) => ({
            kind: "set-relation-type",
            sourceId: g.sourceId,
            targetId: g.targetId,
            type: g.type
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
        const l = (d.queryServices ?? []).find((g) => g.id === t.id);
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
        const l = (d.useCases ?? []).find((g) => g.id === t.id);
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
        const l = (d.useCases ?? []).find((g) => g.id === t.id);
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
      const d = (e.model.notifications ?? []).find((g) => g.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const l = [
        { kind: "add-notification", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: (d.channels ?? [])[0] }
      ];
      d.eventId && l.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
      for (const g of d.recipientRoleIds ?? []) l.push({ kind: "add-notification-recipient", id: d.id, roleId: g });
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
      const d = (e.model.documents ?? []).find((g) => g.id === t.id);
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
      const d = (e.model.identityProviders ?? []).find((g) => g.id === t.id);
      if (!d) return null;
      const l = [
        { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
      ];
      d.publishedByExternalSystemId && l.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
      for (const g of e.model.boundedContexts)
        g.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: g.id, targetId: t.id });
      for (const g of e.model.uiApps ?? [])
        g.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: g.id, targetId: t.id });
      for (const g of e.model.etlFlows ?? [])
        g.identityProviderId === t.id && l.push({ kind: "set-identity-provider", id: g.id, targetId: t.id });
      return l;
    }
    case "set-idp-publisher": {
      const d = (e.model.identityProviders ?? []).find((l) => l.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const d = ((c = e.model.boundedContexts.find((l) => l.id === t.id)) == null ? void 0 : c.identityProviderId) ?? ((s = (e.model.uiApps ?? []).find((l) => l.id === t.id)) == null ? void 0 : s.identityProviderId) ?? ((p = (e.model.etlFlows ?? []).find((l) => l.id === t.id)) == null ? void 0 : p.identityProviderId) ?? null;
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
      const d = (((y = (e.model.etlFlows ?? []).find((l) => l.id === t.etlFlowId)) == null ? void 0 : y.steps) ?? []).find((l) => l.id === t.id);
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
        (g) => (g.scheduledTriggers ?? []).some((k) => k.id === t.id)
      ), l = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((g) => g.id === t.id);
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
        const l = (d.mcpServers ?? []).find((g) => g.id === t.id);
        if (l)
          return [
            { kind: "add-mcp-server", id: l.id, name: l.name, boundedContextId: d.id, uri: l.uri },
            ...(e.model.agentMcpUses ?? []).filter((g) => g.mcpServerId === t.id).map(
              (g) => ({
                kind: "add-agent-mcp",
                sourceId: g.agentId,
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
        const l = (d.applicationEvents ?? []).find((g) => g.id === t.id);
        if (l)
          return [{ kind: "add-application-event", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const d of e.model.boundedContexts) {
        const l = (d.domainServices ?? []).find((g) => g.id === t.id);
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
        const l = (d.tables ?? []).find((g) => g.id === t.id);
        if (l) return [{ kind: "add-external-table", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const d = (m = (h = (e.model.rags ?? []).find((l) => l.id === t.sourceId)) == null ? void 0 : h.contentSources) == null ? void 0 : m.find((l) => l.uri === t.uri);
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
      const d = (f = (e.model.apis ?? []).find((l) => l.id === t.apiId)) == null ? void 0 : f.operations.find((l) => l.id === t.id);
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
      const d = (b = (e.model.apis ?? []).find((l) => l.id === t.apiId)) == null ? void 0 : b.operations.find((l) => l.id === t.id);
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
        const l = (d.readModels ?? []).find((g) => g.id === t.id);
        if (l != null && l.aggregateId)
          return [{ kind: "add-read-model", id: l.id, name: l.name, aggregateId: l.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const d of e.model.boundedContexts) {
        const l = (d.domainEvents ?? []).find((g) => g.id === t.id);
        if (l) return [{ kind: "add-domain-event", id: l.id, name: l.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "rename-element": {
      const l = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((g) => g.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((g) => g.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((g) => g.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((g) => g.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((g) => g.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((g) => g.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((g) => g.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((g) => g.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((g) => g.id === t.id);
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
      const d = (e.model.journeys ?? []).find((g) => g.id === t.journeyId), l = ((d == null ? void 0 : d.legs) ?? []).find((g) => g.id === t.itemId);
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
      const g = d.steps[l];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: g.id,
          name: g.name,
          stepType: g.type,
          roleId: g.roleId,
          deadline: g.deadline,
          useCaseId: g.useCaseId,
          compensationUseCaseId: g.compensationUseCaseId,
          afterStepId: l > 0 ? d.steps[l - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const d = (e.model.processes ?? []).find((g) => g.id === t.processId), l = (d == null ? void 0 : d.steps.findIndex((g) => g.id === t.id)) ?? -1;
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
      const d = (e.model.processes ?? []).find((g) => g.id === t.processId), l = d == null ? void 0 : d.steps.find((g) => g.id === t.id);
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
      const g = d.steps[l];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: g.id,
          name: g.name,
          emittedEventName: g.emittedEventName,
          targetUseCaseId: g.targetUseCaseId,
          completionEventName: g.completionEventName,
          dependsOnStepIds: g.dependsOnStepIds,
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
      const d = (e.model.workflows ?? []).find((g) => g.id === t.workflowId), l = d == null ? void 0 : d.steps.find((g) => g.id === t.id);
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
function wa(e, t, n, i, o, a, r) {
  var I, P, C;
  if (e.activeJourneyId && (t === "context-map" || t === "integrations")) {
    const w = (e.model.journeys ?? []).find(($) => $.id === e.activeJourneyId);
    if (w && n !== i) {
      const $ = w.legs ?? [], M = $.filter((T) => T.targetId === n).map((T) => T.id);
      let S = $.length + 1;
      for (; $.some((T) => T.id === `leg-${S}`); ) S++;
      e.command({
        kind: "journey-add-leg",
        journeyId: w.id,
        itemId: `leg-${S}`,
        sourceId: n,
        targetId: i,
        dependsOnStepIds: M
      });
      return;
    }
  }
  if (t === "context-map" && e.detail === "distribution") {
    const w = e.sceneFor("context-map"), $ = e.model.modules ?? [], S = ((T) => {
      var N;
      for (let z = T; z; ) {
        if ($.some((B) => B.id === z)) return z;
        z = (N = w.nodes.find((B) => B.id === z)) == null ? void 0 : N.parentId;
      }
      return null;
    })(i);
    if (S && S !== n && (e.model.services ?? []).some((T) => T.id === n)) {
      e.command({ kind: "add-service-module", serviceId: n, id: S });
      return;
    }
    if ((e.model.services ?? []).some((T) => T.id === n)) {
      const T = e.model.boundedContexts.find((B) => B.id === i), N = T ? $.filter((B) => B.boundedContextId === T.id) : [], z = N.find((B) => B.main) ?? N[0];
      if (z) {
        e.command({ kind: "add-service-module", serviceId: n, id: z.id });
        return;
      }
    }
    if (S && S !== n && !$.some((N) => N.id === n) && !e.model.boundedContexts.some((N) => N.id === n)) {
      e.command({ kind: "add-module-element", id: S, elementId: n });
      return;
    }
  }
  if (t === "integrations") {
    wa(e, "context-map", n, i, o, a, r);
    return;
  }
  if (t === "eventstorming") {
    const w = (M) => (e.model.customCodes ?? []).some((S) => S.id === M), $ = w(i) ? { stepId: n, ccId: i } : w(n) ? { stepId: i, ccId: n } : null;
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
    const w = (B) => (e.model.actors ?? []).some((H) => H.id === B);
    if (w(n) !== w(i)) {
      const B = w(n) ? n : i, H = w(n) ? i : n, de = e.owningWorkflowOf(H);
      if (de) {
        e.command({ kind: "set-workflow-step-role", workflowId: de.id, id: H, targetId: B });
        return;
      }
    }
    const $ = (B) => (e.model.pages ?? []).some((H) => H.id === B);
    if ($(n) !== $(i)) {
      const B = $(n) ? n : i, H = $(n) ? i : n, de = e.owningWorkflowOf(H);
      if (de) {
        e.command({ kind: "set-workflow-step-form", workflowId: de.id, id: H, targetId: B });
        return;
      }
    }
    const M = e.model.workflowGateways ?? [], S = (B) => M.some((H) => H.id === B);
    if (S(n) || S(i) || (e.model.workflows ?? []).some((B) => B.id === i)) {
      if (n === i) return;
      e.command({ kind: "add-workflow-link", sourceId: n, targetId: i });
      return;
    }
    const T = e.owningWorkflowOf(n), N = e.owningWorkflowOf(i);
    if (!T || T !== N || n === i) return;
    const z = T.steps.find((B) => B.id === i);
    if (((z == null ? void 0 : z.dependsOnStepIds) ?? []).includes(n)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: T.id,
      id: i,
      dependsOnStepId: n
    });
    return;
  }
  if (t === "ui") {
    const w = e.model.pages ?? [], $ = e.model.uiApps ?? [], M = (j) => $.some((Z) => Z.id === j), S = (j) => w.some((Z) => Z.id === j), T = (j) => (e.model.customCodes ?? []).some((Z) => Z.id === j);
    if (T(n) || T(i)) {
      const j = T(n) ? n : i, Z = T(n) ? i : n;
      if (T(Z)) return;
      if (S(Z)) {
        e.command({ kind: "set-page-custom-code", id: Z, targetId: j });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: j, elementId: Z });
      return;
    }
    const N = e.model.buttonGroups ?? [], z = (j) => N.some((Z) => Z.id === j);
    if ((r === "toolbar" || r === "bottom") && z(n) && S(i)) {
      e.command({ kind: "add-page-bar-group", pageId: i, id: n, bar: r });
      return;
    }
    if (z(n) && z(i) && n !== i) {
      e.command({ kind: "add-group-subgroup", id: i, targetId: n });
      return;
    }
    const B = /^gbtn:([^:]+):(.+)$/.exec(n);
    if (B) {
      e.model.boundedContexts.some((Z) => (Z.useCases ?? []).some((Ee) => Ee.id === i)) ? e.command({ kind: "set-group-button-target", id: B[1], itemId: B[2], useCaseId: i }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (r === "home" && M(n) && (S(i) || M(i))) {
      if (i === n) return;
      e.command(
        S(i) ? { kind: "set-app-home-page", appId: n, pageId: i } : { kind: "set-app-home-page", appId: n, pageId: null, toAppId: i }
      );
      return;
    }
    if (r === "header" && M(n) && S(i)) {
      e.command({ kind: "set-app-header-page", appId: n, pageId: i });
      return;
    }
    if ((r === "crud-detail" || r === "crud-create") && S(n) && (S(i) || M(i)) && i !== n) {
      const j = r === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(i) ? { kind: j, pageId: n, targetId: i, toAppId: null } : { kind: j, pageId: n, targetId: null, toAppId: i }
      );
      return;
    }
    if (r === "viewmodel" && S(n)) {
      (e.model.models ?? []).some((j) => j.id === i) ? e.command({ kind: "set-page-model", pageId: n, modelId: i }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((r === "view" || r === "edit") && M(n) && S(i)) {
      e.command({
        kind: r === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: n,
        pageId: i
      });
      return;
    }
    if (r) return;
    const H = (j) => /^wizrow:([^:]+):(.+)$/.exec(j), de = H(n) ?? H(i);
    if (de) {
      const j = H(n) ? i : n;
      S(j) && j !== de[1] && e.command({ kind: "set-wizard-step-page", pageId: de[1], itemId: de[2], targetId: j });
      return;
    }
    const ce = w.find((j) => j.id === i && j.type === "WIZARD");
    if (S(n) && ce && n !== ce.id) {
      (ce.wizardSteps ?? []).some((j) => j.pageId === n) || e.command({ kind: "add-page-wizard-step", pageId: ce.id, targetId: n });
      return;
    }
    if (S(n) && M(i)) {
      const j = w.find((Ee) => Ee.id === n), Z = $.find((Ee) => Ee.id === i);
      if (Z.type === "MASTER_DETAIL" && !Z.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: i, pageId: n }), e.emit("modux-notice", {
          message: `${j.name} es la cabecera de ${Z.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: i,
        label: j.name,
        pageId: n,
        itemId: e.newMenuItemId(j.name)
      });
      return;
    }
    const W = e.model.identityProviders ?? [], G = (j) => W.some((Z) => Z.id === j);
    if (G(n) || G(i)) {
      const j = G(n) ? n : i, Z = G(n) ? i : n;
      M(Z) ? e.command({ kind: "set-identity-provider", id: Z, targetId: j }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const ue = (j) => (e.model.models ?? []).some((Z) => Z.id === j);
    if (ue(n) || ue(i)) {
      const j = ue(n) ? n : i, Z = ue(n) ? i : n;
      if (S(Z)) {
        e.command({ kind: "set-page-model", pageId: Z, modelId: j });
        return;
      }
      if (M(Z)) {
        e.command({ kind: "set-app-model", appId: Z, modelId: j });
        return;
      }
      return;
    }
    const ye = $e(n);
    if (ye != null && ye.itemId && ((I = $e(i)) != null && I.itemId || M(i))) {
      const j = $e(i), Z = e.menuEntryIn(ye.appId, ye.itemId);
      if (!Z) return;
      if (j != null && j.itemId) {
        const Ee = e.menuEntryIn(j.appId, j.itemId);
        if (!Ee) return;
        const Oe = (wt) => (wt ?? []).some((pn) => pn.id === j.itemId || Oe(pn.children));
        if (ye.appId === j.appId && (j.itemId === ye.itemId || Oe(Z.entry.children)))
          return;
        const qe = e.nodeClientRect(i), Ne = qe && a !== void 0 ? (a - qe.top) / Math.max(1, qe.height) : 0.5, et = Ne < 0.3 ? "before" : Ne > 0.7 ? "after" : "nest";
        if (et === "nest")
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: j.appId,
            itemId: ye.itemId,
            parentId: j.itemId
          });
        else {
          const wt = et === "before" ? j.itemId : Ee.beforeId ?? void 0;
          if (ye.appId === j.appId && Ee.parentId === Z.parentId && wt === ye.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: j.appId,
            itemId: ye.itemId,
            parentId: Ee.parentId ?? void 0,
            beforeItemId: wt
          });
        }
        return;
      }
      if (ye.appId === i && !Z.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: ye.appId,
        toAppId: i,
        itemId: ye.itemId
      });
      return;
    }
    const Fe = $e(n) ?? $e(i);
    if (Fe) {
      const j = $e(n) ? n : i, Z = $e(n) ? i : n;
      if (((P = e.sceneFor("ui").nodes.find((Ne) => Ne.id === j)) == null ? void 0 : P.kind) === "menu-group") {
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
    if ((e.model.actors ?? []).some((j) => j.id === n) && M(i)) {
      (e.model.actorAppUses ?? []).some((j) => j.actorId === n && j.appId === i) || e.command({ kind: "add-actor-app", actorId: n, appId: i });
      return;
    }
    const Se = S(n) ? { pageId: n, other: i } : S(i) ? { pageId: i, other: n } : null;
    if (Se) {
      const j = new Set(
        e.model.boundedContexts.flatMap((Oe) => (Oe.useCases ?? []).map((qe) => qe.id))
      ), Z = new Set(
        e.model.boundedContexts.flatMap((Oe) => (Oe.queryServices ?? []).map((qe) => qe.id))
      ), Ee = w.find((Oe) => Oe.id === Se.pageId);
      j.has(Se.other) ? (Ee.buttons ?? []).some((Oe) => Oe.useCaseId === Se.other) || e.command({ kind: "add-page-button", pageId: Se.pageId, useCaseId: Se.other }) : Z.has(Se.other) && e.command({ kind: "set-page-listing", pageId: Se.pageId, queryServiceId: Se.other });
    }
    return;
  }
  if (t === "mappings") {
    const w = e.model.models ?? [], $ = ki(n), M = ki(i), S = e.model.transformations ?? [], T = e.model.customCodes ?? [], N = (W) => T.some((G) => G.id === W);
    if (N(n) && S.some((W) => W.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (N(i) && S.some((W) => W.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (N(n)) {
      const W = (M == null ? void 0 : M.modelId) ?? (w.some((G) => G.id === i) ? i : null);
      if (W) {
        const G = (e.model.modelMappings ?? []).filter(
          (ue) => ue.sourceModelId === W || ue.targetModelId === W
        );
        G.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: G[0].id, targetId: n }) : e.emit("modux-notice", {
          message: G.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((W) => W.id === i)) {
      if (M || S.some((G) => G.id === n)) return;
      const W = $ ? { modelId: $.modelId, fieldId: $.fieldId } : w.some((G) => G.id === n) ? { modelId: n } : null;
      W && e.command({ kind: "add-transformation-input", id: i, ...W });
      return;
    }
    if (S.some((W) => W.id === n)) {
      const W = M ? { modelId: M.modelId, fieldId: M.fieldId } : w.some((G) => G.id === i) ? { modelId: i } : null;
      W && e.command({ kind: "set-transformation-output", id: n, ...W });
      return;
    }
    if ($ && M) {
      if ($.modelId === M.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let W = (e.model.modelMappings ?? []).find(
        (G) => G.sourceModelId === $.modelId && G.targetModelId === M.modelId
      );
      if (!W) {
        const G = w.find((j) => j.id === $.modelId), ue = w.find((j) => j.id === M.modelId);
        if (!G || !ue) return;
        const ye = (j) => j.replace(/[^a-zA-Z0-9]/g, ""), Fe = new Set((e.model.modelMappings ?? []).map((j) => j.id));
        let Se = `mapping-${ae(G.name)}-${ae(ue.name)}`;
        for (let j = 2; Fe.has(Se); j++) Se = `mapping-${ae(G.name)}-${ae(ue.name)}-${j}`;
        e.command(
          { kind: "add-model-mapping", id: Se, name: `${ye(G.name)}2${ye(ue.name)}`, sourceId: G.id, targetId: ue.id },
          !1
        ), W = { id: Se, name: "", sourceModelId: G.id, targetModelId: ue.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: W.id,
        sourceId: $.fieldId,
        targetId: M.fieldId
      });
      return;
    }
    if ($ && w.some((W) => W.id === i) && i !== $.modelId) {
      e.command({ kind: "move-model-field", modelId: $.modelId, fieldId: $.fieldId, targetId: i });
      return;
    }
    if (!w.some((W) => W.id === n) || !w.some((W) => W.id === i) || n === i || (e.model.modelMappings ?? []).some((W) => W.sourceModelId === n && W.targetModelId === i))
      return;
    const z = w.find((W) => W.id === n), B = w.find((W) => W.id === i), H = (W) => W.replace(/[^a-zA-Z0-9]/g, ""), de = new Set((e.model.modelMappings ?? []).map((W) => W.id));
    let ce = `mapping-${ae(z.name)}-${ae(B.name)}`;
    for (let W = 2; de.has(ce); W++) ce = `mapping-${ae(z.name)}-${ae(B.name)}-${W}`;
    e.command({
      kind: "add-model-mapping",
      id: ce,
      name: `${H(z.name)}2${H(B.name)}`,
      sourceId: n,
      targetId: i
    });
    return;
  }
  if (t !== "context-map") return;
  const c = /^apiop:(.+)@(.+)$/.exec(n);
  if (c) {
    const [, w, $] = c, M = (e.model.proxyApis ?? []).find((B) => B.id === $), S = (M == null ? void 0 : M.targetApiId) ?? ((C = (e.model.apiImplementations ?? []).find(
      (B) => B.boundedContextId === $ && (e.model.apis ?? []).some(
        (H) => H.id === B.apiId && H.operations.some((de) => de.id === w)
      )
    )) == null ? void 0 : C.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((B) => (B.useCases ?? []).map((H) => H.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
        operationId: w,
        boundedContextId: $,
        targetUseCaseId: i
      });
      return;
    }
    if (!(M != null && M.targetApiId)) return;
    let N = null;
    if (i === M.targetApiId)
      N = M.targetApiId;
    else {
      const B = /^apiimpl:(.+)@(.+)$/.exec(i);
      B && B[1] === M.targetApiId ? N = B[2] : e.model.boundedContexts.some((H) => H.id === i) && (e.model.apiImplementations ?? []).some(
        (H) => H.apiId === M.targetApiId && H.boundedContextId === i
      ) && (N = i);
    }
    if (!N) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (B) => B.proxyId === M.id && B.operationId === w && B.targetSiteId === N
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: M.id,
      operationId: w,
      targetSiteId: N
    });
    return;
  }
  const s = new Set((e.model.aiAgents ?? []).map((w) => w.id));
  if (s.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.useCases ?? []).map((z) => z.id))
    ).has(i)) {
      (e.model.agentUses ?? []).some(
        (z) => z.agentId === n && z.useCaseId === i
      ) || e.command({ kind: "add-agent-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.useCases ?? []).map((z) => z.id))
    ).has(i)) {
      (e.model.agentExternalUses ?? []).some(
        (z) => z.agentId === n && z.externalUseCaseId === i
      ) || e.command({ kind: "add-agent-external-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.mcpServers ?? []).map((z) => z.id))
    ).has(i)) {
      (e.model.agentMcpUses ?? []).some(
        (z) => z.agentId === n && z.mcpServerId === i
      ) || e.command({ kind: "add-agent-mcp", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((N) => N.id === i)) {
      (e.model.agentGatewayUses ?? []).some(
        (z) => z.agentId === n && z.gatewayId === i
      ) || e.command({ kind: "add-agent-gateway", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((N) => N.operations.map((z) => z.id))
    ).has(i)) {
      (e.model.agentApiOpUses ?? []).some(
        (z) => z.agentId === n && z.apiOperationId === i
      ) || e.command({ kind: "add-agent-api-operation", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === i) || (e.model.proxyApis ?? []).some((N) => N.id === i)) {
      (e.model.agentApiUses ?? []).some(
        (z) => z.agentId === n && z.apiId === i
      ) || e.command({ kind: "add-agent-api", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).map((z) => z.id))
    ).has(i)) {
      (e.model.agentQueryUses ?? []).some(
        (z) => z.agentId === n && z.queryServiceId === i
      ) || e.command({ kind: "add-agent-query", sourceId: n, targetId: i });
      return;
    }
    if (s.has(i) && i !== n) {
      (e.model.agentDelegations ?? []).some(
        (z) => z.agentId === n && z.delegateAgentId === i
      ) || e.command({ kind: "add-agent-delegate", sourceId: n, targetId: i });
      return;
    }
    (e.model.rags ?? []).some((N) => N.id === i) && ((e.model.agentRags ?? []).some(
      (z) => z.agentId === n && z.ragId === i
    ) || e.command({ kind: "add-agent-rag", sourceId: n, targetId: i }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((w) => w.id === n)) {
    const w = (e.model.mcpGateways ?? []).find((S) => S.id === n), $ = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((T) => T.id === i)) || (e.model.apis ?? []).some((S) => S.id === i) || (e.model.apis ?? []).some((S) => S.operations.some((T) => T.id === i)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((T) => T.id === i)) || (e.model.rags ?? []).some((S) => S.id === i), M = [
      ...w.mcpServerIds ?? [],
      ...w.apiIds ?? [],
      ...w.apiOperationIds ?? [],
      ...w.useCaseIds ?? [],
      ...w.ragIds ?? []
    ].includes(i);
    $ && !M && e.command({ kind: "add-gateway-exposure", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((w) => w.id === i)) return;
  const p = (e.model.rags ?? []).find((w) => w.id === n);
  if (p) {
    if (new Set(
      e.model.boundedContexts.flatMap((M) => (M.readModels ?? []).map((S) => S.id))
    ).has(i) && !(p.sourceReadModelIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((M) => (M.tables ?? []).map((S) => S.id))
    ).has(i) && !(p.sourceExternalTableIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (((e.model.apis ?? []).some((M) => M.id === i) || (e.model.proxyApis ?? []).some((M) => M.id === i)) && !(p.sourceApiIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === i) && !(p.sourceExternalSystemIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((M) => M.id === i) && !(p.sourceBoundedContextIds ?? []).includes(i) && e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.rags ?? []).some((w) => w.id === i)) return;
  if ((e.model.workflows ?? []).some((w) => w.id === n)) {
    const w = (e.model.workflows ?? []).find((S) => S.id === n), $ = (e.model.workflows ?? []).find(
      (S) => S.id === i && S.id !== n
    );
    if ($) {
      const S = w.onCompletionEventName || `${w.name.replace(/\s+/g, "")}Completado`;
      $.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: i, triggerEvent: S });
      return;
    }
    const M = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === i);
    if (M && !(w.steps ?? []).some((T) => T.targetUseCaseId === i)) {
      const T = `wfs-${ae(M.name)}`;
      let N = T;
      for (let z = 2; (w.steps ?? []).some((B) => B.id === N); z++)
        N = `${T}-${z}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: n,
        id: N,
        name: M.name,
        targetUseCaseId: i
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((w) => w.id === i)) {
    const w = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === n), $ = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === n), M = w ?? $;
    if (M) {
      const S = (e.model.emissions ?? []).find((B) => B.domainEventId === n), T = new Set((e.model.aggregates ?? []).map((B) => B.id)), N = new Set(
        e.model.boundedContexts.flatMap((B) => (B.domainServices ?? []).map((H) => H.id))
      ), z = new Set(
        e.model.boundedContexts.flatMap((B) => (B.useCases ?? []).map((H) => H.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: i,
        triggerEvent: M.name,
        triggerAggregateId: S && T.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && N.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && z.has(S.sourceId) ? S.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((w) => w.id === n)) {
    const w = (e.model.proxyApis ?? []).find(($) => $.id === n);
    if ((e.model.apis ?? []).some(($) => $.id === i)) {
      w.targetApiId !== i && e.command({ kind: "set-proxy-target", id: n, targetId: i });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === i)) {
      if (!w.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (M) => M.apiId === w.targetApiId && M.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: w.targetApiId, boundedContextId: i });
      return;
    }
    e.model.externalSystems.some(($) => $.id === i) && w.publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
    return;
  }
  if ((e.model.apis ?? []).some((w) => w.id === n)) {
    if (e.model.externalSystems.some((w) => w.id === i)) {
      (e.model.apis ?? []).find(($) => $.id === n).publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((w) => w.id === i) && ((e.model.apiImplementations ?? []).some(
      ($) => $.apiId === n && $.boundedContextId === i
    ) || e.command({ kind: "add-api-implementation", apiId: n, boundedContextId: i }));
    return;
  }
  const y = new Set((e.model.actors ?? []).map((w) => w.id));
  if (s.has(i)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap(($) => ($.domainEvents ?? []).map((M) => M.id)),
      ...e.model.boundedContexts.flatMap(($) => ($.applicationEvents ?? []).map((M) => M.id))
    ])).has(n)) {
      (e.model.agentTriggers ?? []).some(
        (M) => M.eventId === n && M.agentId === i
      ) || e.command({ kind: "add-agent-trigger", sourceId: n, targetId: i });
      return;
    }
    if (!y.has(n)) return;
  }
  if (y.has(n)) {
    const w = new Set(
      e.model.boundedContexts.flatMap((M) => (M.useCases ?? []).map((S) => S.id))
    ), $ = new Set(
      e.model.boundedContexts.flatMap((M) => (M.queryServices ?? []).map((S) => S.id))
    );
    if (w.has(i) || $.has(i)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === n && S.targetId === i
      ) || e.command({ kind: "add-actor-use", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aggregates ?? []).some((M) => M.id === i)) {
      e.command({ kind: "add-actor-crud", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === i)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === n && S.externalSystemId === i
      ) || e.command({ kind: "add-actor-external", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aiAgents ?? []).some((M) => M.id === i)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === n && S.agentId === i
      ) || e.command({ kind: "add-actor-agent", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  const h = e.owningApiOf(n);
  if (h) {
    if (new Set(
      e.model.boundedContexts.flatMap(($) => ($.useCases ?? []).map((M) => M.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: h.id,
        id: n,
        targetUseCaseId: i
      });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: h.id,
        id: n,
        boundedContextId: i
      });
      return;
    }
    return;
  }
  const m = (w) => (e.model.notifications ?? []).find(($) => $.id === w);
  if (m(n) || m(i)) {
    const w = m(n) ?? m(i), $ = m(n) ? i : n;
    if (e.model.boundedContexts.some(
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((T) => T.id === $)
    )) {
      w.eventId !== $ && e.command({ kind: "set-notification-event", id: w.id, targetId: $ });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === $)) {
      (w.recipientRoleIds ?? []).includes($) || e.command({ kind: "add-notification-recipient", id: w.id, roleId: $ });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const f = (w) => (e.model.documents ?? []).find(($) => $.id === w);
  if (f(n) || f(i)) {
    const w = f(n) ?? f(i), $ = f(n) ? i : n;
    if ((e.model.models ?? []).find((N) => N.id === $)) {
      e.command({ kind: "set-document-model", id: w.id, modelId: $ });
      return;
    }
    const S = e.model.boundedContexts.flatMap((N) => N.queryServices ?? []).find((N) => N.id === $), T = e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).flatMap((z) => (z.operations ?? []).map((B) => ({ op: B, qs: z })))).find(({ op: N }) => N.id === $);
    if (S || T) {
      e.command({
        kind: "set-document-query",
        id: w.id,
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
  const b = e.model.identityProviders ?? [], d = (w) => b.find(($) => $.id === w);
  if (d(n) || d(i)) {
    const w = d(n) ?? d(i), $ = d(n) ? i : n;
    if (d(n) && e.model.externalSystems.some((T) => T.id === $)) {
      w.publishedByExternalSystemId !== $ && e.command({ kind: "set-idp-publisher", id: w.id, targetId: $ });
      return;
    }
    const M = e.model.boundedContexts.some((T) => T.id === $), S = (e.model.etlFlows ?? []).some((T) => T.id === $);
    if (M || S) {
      e.command({ kind: "set-identity-provider", id: $, targetId: w.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const l = e.model.etlFlows ?? [], g = (w) => l.find(($) => $.id === w);
  if (g(n) || g(i)) {
    const w = g(n) ?? g(i), $ = g(n) ? i : n, M = !g(n), S = new Set(e.model.externalSystems.flatMap((G) => (G.tables ?? []).map((ue) => ue.id))), T = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((G) => G.id),
      ...(e.model.proxyApis ?? []).map((G) => G.id)
    ]), N = (e.model.apis ?? []).find((G) => G.operations.some((ue) => ue.id === $)), z = new Set(
      e.model.boundedContexts.flatMap((G) => [
        ...(G.domainEvents ?? []).map((ue) => ue.id),
        ...(G.applicationEvents ?? []).map((ue) => ue.id)
      ])
    );
    let B = null, H = {};
    if (S.has($) ? (B = M ? "SOURCE_PULL" : "WRITE_DB", H = { externalTableId: $ }) : N ? (B = M ? "SOURCE_PULL" : "WRITE_API", H = { apiId: N.id, operationId: $ }) : T.has($) ? (B = M ? "SOURCE_PULL" : "WRITE_API", H = { apiId: $ }) : z.has($) && (B = M ? "SOURCE_CONSUMER" : "WRITE_EVENT", H = { targetId: $ }), !B) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((w.steps ?? []).some(
      (G) => G.type === B && (G.externalTableId ?? G.operationId ?? G.apiId ?? G.eventId) === (H.externalTableId ?? H.operationId ?? H.apiId ?? H.targetId)
    )) return;
    const ce = new Set((w.steps ?? []).map((G) => G.id));
    let W = (w.steps ?? []).length + 1;
    for (; ce.has(`ets-${W}`); ) W++;
    e.command({ kind: "add-etl-step", etlFlowId: w.id, id: `ets-${W}`, stepType: B, ...H });
    return;
  }
  const k = e.model.externalSystems.flatMap((w) => w.useCases ?? []).find((w) => w.id === n), x = e.model.externalSystems.flatMap((w) => w.tables ?? []).find((w) => w.id === n);
  if (k || x) {
    const w = (k ?? x).name, $ = k ? { externalUseCaseId: n } : { externalTableId: n }, M = (N) => k ? N.sourceExternalUseCaseId === n : N.sourceExternalTableId === n, S = e.model.boundedContexts.flatMap((N) => N.readModels ?? []).find((N) => N.id === i);
    if (S) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(w)}-${ae(S.name)}`,
        name: `${S.name}Projection`,
        ...$,
        targetId: i
      });
      return;
    }
    const T = e.model.boundedContexts.find((N) => N.id === i);
    if (T) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(w)}-${ae(T.name)}`,
        name: `${w}ViewProjection`,
        ...$,
        boundedContextId: i,
        readModelName: `${w}View`
      });
      return;
    }
    return;
  }
  const _ = (e.model.aggregates ?? []).find((w) => w.id === n);
  if (_) {
    const w = e.model.boundedContexts.flatMap((M) => M.readModels ?? []).find((M) => M.id === i);
    if (w) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(_.name)}-${ae(w.name)}`,
        name: `${w.name}Projection`,
        aggregateId: n,
        targetId: i
      });
      return;
    }
    const $ = e.model.boundedContexts.find((M) => M.id === i);
    if ($) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(_.name)}-${ae($.name)}`,
        name: `${_.name}ViewProjection`,
        aggregateId: n,
        boundedContextId: i,
        readModelName: `${_.name}View`
      });
      return;
    }
  }
  const R = new Set(
    e.model.boundedContexts.flatMap((w) => (w.domainEvents ?? []).map(($) => $.id))
  ), L = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((w) => w.id),
    ...e.model.boundedContexts.flatMap((w) => (w.domainServices ?? []).map(($) => $.id))
  ]), D = new Set(
    e.model.boundedContexts.flatMap((w) => (w.applicationEvents ?? []).map(($) => $.id))
  ), q = new Set(e.model.boundedContexts.flatMap((w) => (w.useCases ?? []).map(($) => $.id))), v = new Set(
    e.model.boundedContexts.flatMap((w) => (w.queryServices ?? []).map(($) => $.id))
  );
  if (q.has(n) && v.has(i)) {
    (e.model.queryCalls ?? []).some(
      ($) => $.sourceId === n && $.targetId === i
    ) || e.command({ kind: "add-query-call", sourceId: n, targetId: i });
    return;
  }
  const E = new Set(
    e.model.externalSystems.flatMap((w) => (w.useCases ?? []).map(($) => $.id))
  );
  if (q.has(n) && E.has(i)) {
    (e.model.externalUseCaseCalls ?? []).some(
      ($) => $.sourceId === n && $.targetId === i
    ) || e.command({ kind: "add-external-uc-call", sourceId: n, targetId: i });
    return;
  }
  if (q.has(n) && q.has(i) && n !== i) {
    (e.model.useCaseCalls ?? []).some(
      ($) => $.sourceId === n && $.targetId === i
    ) || e.command({ kind: "add-use-case-call", sourceId: n, targetId: i });
    return;
  }
  const V = e.model.boundedContexts.flatMap((w) => w.scheduledTriggers ?? []).find((w) => w.id === n);
  if (V && q.has(i)) {
    V.useCaseId !== i && e.command({ kind: "set-scheduled-trigger-target", id: n, targetUseCaseId: i });
    return;
  }
  if (q.has(n) && (e.model.aggregates ?? []).some((w) => w.id === i)) {
    (e.model.aggregateCalls ?? []).some(
      ($) => $.sourceId === n && $.targetId === i
    ) || e.command({ kind: "add-aggregate-call", sourceId: n, targetId: i });
    return;
  }
  if (L.has(n) && R.has(i) || q.has(n) && D.has(i)) {
    (e.model.emissions ?? []).some(
      ($) => $.sourceId === n && $.domainEventId === i
    ) || e.command({ kind: "add-emission", sourceId: n, targetId: i });
    return;
  }
  if (R.has(n) || D.has(n)) {
    const w = D.has(n), $ = e.model.boundedContexts.flatMap((W) => (w ? W.applicationEvents : W.domainEvents) ?? []).find((W) => W.id === n), M = e.model.boundedContexts.flatMap((W) => (W.useCases ?? []).map((G) => ({ u: G, boundedContext: W }))).find(({ u: W }) => W.id === i), S = e.model.boundedContexts.flatMap((W) => (W.readModels ?? []).map((G) => ({ rm: G, boundedContext: W }))).find(({ rm: W }) => W.id === i), T = e.model.boundedContexts.find((W) => W.id === i) ?? (S == null ? void 0 : S.boundedContext) ?? (M == null ? void 0 : M.boundedContext);
    if (!$ || !T) return;
    const N = new Set((e.model.aggregates ?? []).map((W) => W.id)), z = new Set(
      e.model.boundedContexts.flatMap((W) => (W.domainServices ?? []).map((G) => G.id))
    ), B = (e.model.emissions ?? []).find(
      (W) => W.domainEventId === n && (w ? q.has(W.sourceId) : N.has(W.sourceId) || z.has(W.sourceId))
    );
    if (!B) {
      e.emit("modux-notice", {
        message: w ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const H = !w && N.has(B.sourceId);
    if (M) {
      if (e.model.flows.some(
        (G) => G.archetype === "TRIGGERS" && G.triggerEvent === $.name && G.targetUseCaseId === M.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ae($.name)}-${ae(M.u.name)}`,
        name: M.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: H ? B.sourceId : "",
        triggerDomainServiceId: !w && !H ? B.sourceId : void 0,
        triggerUseCaseId: w ? B.sourceId : void 0,
        triggerEvent: $.name,
        targetId: T.id,
        targetUseCaseId: M.u.id
      });
      return;
    }
    const de = (S == null ? void 0 : S.rm.name) ?? `${$.name}View`;
    if (e.model.flows.some(
      (W) => W.archetype === "MATERIALIZES" && W.triggerEvent === $.name && W.targetId === T.id && W.readModelName === de
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ae($.name)}-${ae(de)}`,
      name: de,
      archetype: "MATERIALIZES",
      triggerAggregateId: H ? B.sourceId : "",
      triggerDomainServiceId: !w && !H ? B.sourceId : void 0,
      triggerUseCaseId: w ? B.sourceId : void 0,
      triggerEvent: $.name,
      targetId: T.id,
      readModelName: de
    });
    return;
  }
  const oe = /* @__PURE__ */ new Set([
    ...L,
    ...q,
    ...v,
    ...e.model.boundedContexts.flatMap((w) => (w.readModels ?? []).map(($) => $.id))
  ]);
  if (oe.has(n) || oe.has(i) || R.has(i) || D.has(i))
    return;
  const te = new Set(e.model.externalSystems.map((w) => w.id));
  if (te.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((T) => (T.useCases ?? []).map((N) => N.id))
    ).has(i)) {
      (e.model.externalCalls ?? []).some(
        (N) => N.externalSystemId === n && N.useCaseId === i
      ) || e.command({ kind: "add-external-call", sourceId: n, targetId: i });
      return;
    }
    if (te.has(i) && i !== n) {
      e.openExtDepPicker({ sourceId: n, targetId: i, x: o ?? 0, y: a ?? 0 });
      return;
    }
    const $ = (e.model.apis ?? []).find(
      (T) => T.operations.some((N) => N.id === i)
    ), M = /^apiop:(.+)@(.+)$/.exec(i), S = $ ? { operationId: i, siteId: $.id } : M ? { operationId: M[1], siteId: M[2] } : null;
    if (S) {
      (e.model.externalOperationUses ?? []).some(
        (N) => N.externalSystemId === n && N.operationId === S.operationId && N.siteId === S.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: n,
        operationId: S.operationId,
        targetSiteId: S.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((T) => T.id === i) || (e.model.proxyApis ?? []).some((T) => T.id === i)) {
      (e.model.externalSystemDependencies ?? []).some(
        (N) => N.sourceId === n && N.targetId === i
      ) || e.command({ kind: "add-external-dependency", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  te.has(i) || y.has(i);
}
function Zc(e, t, n, i, o) {
  var a, r, c;
  if (o === "invariant" || o === "invariant-containment") {
    const s = o === "invariant" ? i : i.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: s });
    return;
  }
  if (t === "eventstorming" && n === "edge" && o === "es-custom") {
    const s = /^escc:(.+)$/.exec(i), p = s ? e.owningUseCaseOf(s[1]) : null;
    s && p && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: p.id, id: s[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && n === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: i });
    return;
  }
  if (t === "ui") {
    if (n === "edge") {
      let s;
      if (s = /^idpauth:(.+)$/.exec(i))
        e.command({ kind: "set-identity-provider", id: s[1], targetId: null });
      else if (s = /^appheader:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-header-page", appId: s[1], pageId: null });
      else if (s = /^apphome:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-home-page", appId: s[1], pageId: null });
      else if (s = /^appmodel:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-model", appId: s[1], modelId: null });
      else if (s = /^appview:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-view-page", appId: s[1], pageId: null });
      else if (s = /^appedit:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-edit-page", appId: s[1], pageId: null });
      else if (s = /^cruddetail:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-crud-detail", pageId: s[1], targetId: null, toAppId: null });
      else if (s = /^crudnew:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-crud-create", pageId: s[1], targetId: null, toAppId: null });
      else if (s = /^wizstep:([^:]+):(.+)$/.exec(i))
        e.command({ kind: "set-wizard-step-page", pageId: s[1], itemId: s[2], targetId: null });
      else if (s = /^pgbtn:(.+)->(.+)$/.exec(i))
        e.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] });
      else if (s = /^pglist:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-page-listing", pageId: s[1], queryServiceId: null });
      else if (s = /^pgmodel:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-page-model", pageId: s[1], modelId: null });
      else if (s = /^actorapp:(.+)->(.+)$/.exec(i))
        e.command({ kind: "remove-actor-app", actorId: s[1], appId: s[2] });
      else if (s = /^menupage:(.+)->[^>]+$/.exec(i)) {
        const p = $e(s[1]);
        p && e.command({ kind: "set-menu-page", pageId: null, ...p });
      } else if (s = /^menuapp:(.+)->[^>]+$/.exec(i)) {
        const p = $e(s[1]);
        p && e.command({ kind: "set-menu-app", toAppId: null, ...p });
      } else if (s = /^menuuc:(.+)->[^>]+$/.exec(i)) {
        const p = $e(s[1]);
        p && e.command({ kind: "set-menu-use-case", useCaseId: null, ...p });
      } else if (s = /^menuagg:(.+)->[^>]+$/.exec(i)) {
        const p = $e(s[1]);
        p && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...p });
      } else if (s = /^menuqop:(.+)->[^>]+$/.exec(i)) {
        const p = $e(s[1]);
        p && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...p });
      }
      return;
    }
    if (o === "ui-app") {
      e.command({ kind: "delete-ui-app", id: i });
      return;
    }
    if (o === "page") {
      e.command({ kind: "delete-ui-page", id: i });
      return;
    }
    if (o === "menu-item" || o === "menu-group") {
      const s = $e(i);
      s && e.command({ kind: "remove-menu-item", ...s });
      return;
    }
    if (o === "wizard-step-row") {
      const s = /^wizrow:([^:]+):(.+)$/.exec(i);
      s && e.command({ kind: "remove-page-wizard-step", pageId: s[1], targetId: s[2] });
      return;
    }
    if (o === "model") {
      e.command({ kind: "remove-model", id: i });
      return;
    }
    if (o === "identity-provider") {
      e.command({ kind: "remove-identity-provider", id: i });
      return;
    }
    if (o === "custom-code") {
      e.command({ kind: "remove-custom-code", id: i });
      return;
    }
    if (o === "button-group") {
      e.command({ kind: "remove-button-group", id: i });
      return;
    }
    if (o === "group-button") {
      const s = /^gbtn:([^:]+):(.+)$/.exec(i);
      s && e.command({ kind: "remove-group-button", id: s[1], itemId: s[2] });
      return;
    }
    if (o === "group-subgroup") {
      const s = /^gsub:([^:]+):(.+)$/.exec(i);
      s && e.command({ kind: "remove-group-subgroup", id: s[1], targetId: s[2] });
      return;
    }
    if (n === "edge" && o === "bar-group") {
      const s = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(i);
      s && e.command({ kind: "remove-page-bar-group", pageId: s[1], id: s[2] });
      return;
    }
    if (n === "edge" && o === "gbtn-target") {
      const s = /^gbtnt:([^:]+):(.+)$/.exec(i);
      s && e.command({ kind: "set-group-button-target", id: s[1], itemId: s[2], useCaseId: null });
      return;
    }
    if (n === "edge" && o === "ui-custom-page") {
      const s = /^ccpage:(.+)$/.exec(i);
      s && e.command({ kind: "set-page-custom-code", id: s[1], targetId: null });
      return;
    }
    if (n === "edge" && o === "cc-uses") {
      const s = /^ccuse:(.+)->(.+)$/.exec(i);
      s && e.command({ kind: "remove-custom-code-use", id: s[1], elementId: s[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && n === "edge" && o === "model-mapping") {
    const s = /^mapping:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: s[1] }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "mapping-rule") {
    const s = /^maprule:([^:]+):(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: s[1], itemId: s[2] }));
    return;
  }
  if (t === "mappings" && n === "node" && o === "model-field") {
    const s = ki(i);
    s && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: s.modelId, fieldId: s.fieldId }));
    return;
  }
  if (t === "mappings" && n === "node" && o === "model") {
    e.clearSelection(), e.command({ kind: "remove-model", id: i });
    return;
  }
  if (t === "mappings" && n === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: i });
    return;
  }
  if (t === "mappings" && n === "edge" && o === "custom-of-transformation") {
    const s = /^cctf:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: s[1], targetId: null }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "custom-of-mapping") {
    const s = /^ccmap:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: s[1], targetId: null }));
    return;
  }
  if (t === "mappings" && n === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: i });
    return;
  }
  if (t === "mappings" && n === "edge" && o === "transform-input") {
    const s = /^tfin:([^:]+):([^:]+):(.*)$/.exec(i);
    s && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: s[1],
      modelId: s[2],
      ...s[3] ? { fieldId: s[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "transform-output") {
    const s = /^tfout:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: s[1] }));
    return;
  }
  if (t === "workflows" && n === "edge" && o === "workflow-dependency") {
    const s = /^wfdep:(.+)->(.+)$/.exec(i);
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
  if (t === "workflows" && n === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: i });
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-role") {
    const s = /^wfrole:(.+)->(.+)$/.exec(i);
    if (s) {
      const p = e.owningWorkflowOf(s[1]);
      p && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: p.id, id: s[1] }));
    }
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-form") {
    const s = /^wfform:(.+)->(.+)$/.exec(i);
    if (s) {
      const p = e.owningWorkflowOf(s[1]);
      if (!p) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: p.id, id: s[1] });
    }
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-link") {
    const s = /^wflink:(.+)->(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: s[1], targetId: s[2] }));
    return;
  }
  if (n === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: i });
    return;
  }
  if (n === "node" && o === "workflow-step") {
    const s = e.owningWorkflowOf(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: s.id, id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "api-impl-wire") {
    const s = /^apiimplwire:(.+)@(.+)$/.exec(i);
    if (!s) return;
    const [, p, y] = s, h = (a = (e.model.apis ?? []).find(
      (m) => m.operations.some((f) => f.id === p)
    )) == null ? void 0 : a.id;
    if (!h) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: h, operationId: p, boundedContextId: y });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-op-use") {
    const s = /^extopuse:(.+)->(.+)@(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: s[1],
      operationId: s[2],
      targetSiteId: s[3]
    });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "op-route") {
    const s = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(i);
    if (!s) return;
    const [, p, y, h] = s, m = /^apiimpl:.+@(.+)$/.exec(h), f = m ? m[1] : h;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: y, operationId: p, targetSiteId: f });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "relation") {
    const s = /^rel:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "emission") {
    const s = /^emit:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "projection") {
    const s = /^proj:(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: s[1] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "uc-call") {
    const s = /^uccall:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "notification-trigger") {
    const s = /^notif:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "set-notification-event", id: s[1], targetId: null }));
    return;
  }
  if (t === "context-map" && n === "edge" && o === "notification-recipient") {
    const s = /^notifto:([^:]+):(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: s[1], roleId: s[2] }));
    return;
  }
  if (t === "context-map" && n === "edge" && o === "document-query") {
    const s = /^docq:(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "set-document-query", id: s[1], queryServiceId: null, queryOperationId: null }));
    return;
  }
  if (t === "context-map" && n === "node" && o === "notification") {
    e.clearSelection(), e.command({ kind: "remove-notification", id: i });
    return;
  }
  if (t === "context-map" && n === "node" && o === "document") {
    e.clearSelection(), e.command({ kind: "remove-document", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && (o === "idp-trust" || o === "idp-service")) {
    const s = /^idp(?:trust|svc):(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: s[1], targetId: null });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "idp-federation") {
    const s = /^idpfed:(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: s[1], targetId: null });
    return;
  }
  if (t === "context-map" && n === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: i });
    return;
  }
  if ((t === "context-map" || t === "integrations") && n === "edge" && (o === "etl-source" || o === "etl-write")) {
    const s = /^etl:([^:]+):(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: s[1], id: s[2] });
    return;
  }
  if ((t === "context-map" || t === "integrations") && n === "node" && o === "etl-flow") {
    e.clearSelection(), e.command({ kind: "remove-etl-flow", id: i });
    return;
  }
  if (t === "context-map" && n === "node" && o === "ui-app") {
    e.clearSelection(), e.command({ kind: "delete-ui-app", id: i });
    return;
  }
  if (n === "edge" && o === "journey") {
    const s = /^journeyleg:([^:]+):(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "journey-remove-leg", journeyId: s[1], itemId: s[2] }));
    return;
  }
  if (t === "context-map" && n === "edge" && o === "deploys") {
    const s = /^deploy:(.+)->(.+)$/.exec(i);
    s && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: s[1], id: s[2] }));
    return;
  }
  if (t === "context-map" && n === "node" && o === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: i });
    return;
  }
  if (t === "context-map" && e.detail === "distribution" && n === "node") {
    const s = e.sceneFor("context-map");
    for (let p = (r = s.nodes.find((y) => y.id === i)) == null ? void 0 : r.parentId; p; ) {
      if ((e.model.modules ?? []).some((y) => y.id === p)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: p, elementId: i });
        return;
      }
      p = (c = s.nodes.find((y) => y.id === p)) == null ? void 0 : c.parentId;
    }
    return;
  }
  if (t === "context-map" && n === "edge" && o === "st-fire") {
    const s = /^stfire:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: s[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && n === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agg-call") {
    const s = /^aggcall:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "qs-call") {
    const s = /^qscall:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "external-call") {
    const s = /^extcall:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-uc-call") {
    const s = /^extuccall:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-use") {
    const s = /^mcp:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-external-use") {
    const s = /^mcpx:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-mcp") {
    const s = /^mcpsv:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "gateway-exposure") {
    const s = /^gwx:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-gateway") {
    const s = /^aggw:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-api-op") {
    const s = /^agapi:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-query") {
    const s = /^agqs:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-delegate") {
    const s = /^agag:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-agent") {
    const s = /^useag:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-trigger") {
    const s = /^evag:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (n === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-rag") {
    const s = /^agrag:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "rag-source") {
    const s = /^ragsrc:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const s = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: s[2], targetId: s[1] });
    return;
  }
  if (n === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: i });
    return;
  }
  if (n === "node" && o === "rag-content-source") {
    const s = /^ragcs:(.+?):(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: s[1], uri: s[2] });
    return;
  }
  if (n === "node" && o === "external-table") {
    e.clearSelection(), e.command({ kind: "remove-external-table", id: i });
    return;
  }
  if (n === "node" && o === "mcp-server") {
    e.clearSelection(), e.command({ kind: "remove-mcp-server", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "api-wire") {
    const s = /^apiwire:(.+)$/.exec(i), p = s ? e.owningApiOf(s[1]) : null;
    if (!s || !p) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: p.id, id: s[1] });
    return;
  }
  if (n === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: i });
    return;
  }
  if (n === "node" && o === "api-impl") {
    const s = /^apiimpl:(.+)@(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: s[1], boundedContextId: s[2] });
    return;
  }
  if (n === "node" && o === "proxy-api") {
    e.clearSelection(), e.command({ kind: "remove-proxy-api", id: i });
    return;
  }
  if (t === "context-map" && n === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: i });
    return;
  }
  if (n === "node" && o === "api-operation") {
    const s = e.owningApiOf(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: s.id, id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-use") {
    const s = /^use:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-ext") {
    const s = /^extdep:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-dep") {
    const s = /^xdep:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "wf-chain") {
    const s = /^wfchain:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: s[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-api") {
    const s = /^agapi:(.+)->(.+)$/.exec(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: s[1], targetId: s[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "proxy-target") {
    const s = /^pxt:(.+)->(.+)$/.exec(i);
    if (!s || !(e.model.proxyApis ?? []).some((p) => p.id === s[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
    return;
  }
  if (n === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((p) => p.boundedContextId === i)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: i });
    return;
  }
  if (n === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((p) => p.aggregateId === i)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: i });
    return;
  }
  if (n === "node" && o === "domain-event") {
    e.clearSelection(), e.command({ kind: "remove-domain-event", id: i });
    return;
  }
  if (n === "node" && o === "read-model") {
    e.clearSelection(), e.command({ kind: "remove-read-model", id: i });
    return;
  }
  if (n === "node" && o === "domain-service") {
    e.clearSelection(), e.command({ kind: "remove-domain-service", id: i });
    return;
  }
  if (n === "node" && o === "query-service") {
    e.clearSelection(), e.command({ kind: "remove-query-service", id: i });
    return;
  }
  if (n === "node" && o === "use-case") {
    e.clearSelection(), e.command({ kind: "remove-use-case", id: i });
    return;
  }
  if (n === "node" && o === "external-use-case") {
    e.clearSelection(), e.command({ kind: "remove-external-use-case", id: i });
    return;
  }
  if (n === "node" && o === "application-event") {
    e.clearSelection(), e.command({ kind: "remove-application-event", id: i });
    return;
  }
  if (n === "node" && o === "external-system") {
    e.clearSelection(), e.command({ kind: "remove-external-system", id: i });
    return;
  }
  if (n === "node" && o === "actor") {
    e.clearSelection(), e.command({ kind: "remove-actor", id: i });
    return;
  }
  if (n === "node" && o === "ai-agent") {
    e.clearSelection(), e.command({ kind: "remove-ai-agent", id: i });
    return;
  }
  if (n === "node" && o === "flow") {
    e.clearSelection(), e.command({ kind: "remove-flow", id: i.replace(/^flow:/, "") });
    return;
  }
  if (n === "node" && o === "process") {
    e.clearSelection(), e.command({ kind: "remove-process", id: i });
    return;
  }
  if (n === "node" && o === "process-step") {
    const s = e.owningProcessOf(i);
    if (!s) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: s.id, id: i });
  }
}
const ep = [
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
var tp = Object.defineProperty, np = Object.getOwnPropertyDescriptor, Q = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? np(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && tp(t, n, o), o;
};
const _i = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, ip = Object.keys(_i);
function Vt(e, t, n) {
  const i = n.x - n.w / 2, o = n.x + n.w / 2, a = n.y - n.h / 2, r = n.y + n.h / 2;
  let c = 0, s = 1;
  const p = t.x - e.x, y = t.y - e.y;
  for (const [h, m] of [
    [-p, e.x - i],
    [p, o - e.x],
    [-y, e.y - a],
    [y, r - e.y]
  ]) {
    if (h === 0) {
      if (m < 0) return !1;
      continue;
    }
    const f = m / h;
    if (h < 0) {
      if (f > s) return !1;
      f > c && (c = f);
    } else {
      if (f < c) return !1;
      f < s && (s = f);
    }
  }
  return s - c > 0.02;
}
function op(e, t, n = 28) {
  const i = new Map(e.nodes.map((p) => [p.id, p])), o = (p) => {
    var h;
    const y = /* @__PURE__ */ new Set();
    for (let m = p; m; m = (h = i.get(m)) == null ? void 0 : h.parentId) y.add(m);
    return y;
  }, a = e.nodes, r = (p) => p.parentId ? Math.min(n, 6) : n, c = /* @__PURE__ */ new Map(), s = (p, y, h) => {
    const m = r(h), f = { x: h.x, y: h.y, w: h.w + 2 * m, h: h.h + 2 * m }, b = h.w / 2 + m * 1.5, d = h.h / 2 + m * 1.5, l = { x: h.x - b, y: h.y - d }, g = { x: h.x + b, y: h.y - d }, k = { x: h.x - b, y: h.y + d }, x = { x: h.x + b, y: h.y + d }, _ = [];
    for (const R of [l, g, k, x])
      !Vt(p, R, f) && !Vt(R, y, f) && _.push([R]);
    for (const [R, L] of [
      [l, g],
      [g, l],
      [g, x],
      [x, g],
      [x, k],
      [k, x],
      [k, l],
      [l, k]
    ])
      !Vt(p, R, f) && !Vt(L, y, f) && _.push([R, L]);
    return _;
  };
  for (const p of e.edges) {
    if (t[p.id]) continue;
    const y = i.get(p.sourceId), h = i.get(p.targetId);
    if (!y || !h) continue;
    const m = /* @__PURE__ */ new Set([...o(y.id), ...o(h.id)]), f = [
      { x: y.x, y: y.y },
      { x: h.x, y: h.y }
    ];
    for (let b = 0; b < 12; b++) {
      let d = !1;
      e: for (let l = 0; l < f.length - 1; l++)
        for (const g of a) {
          if (m.has(g.id)) continue;
          const k = r(g), x = { x: g.x, y: g.y, w: g.w + 2 * k, h: g.h + 2 * k };
          if (!Vt(f[l], f[l + 1], x)) continue;
          const _ = s(f[l], f[l + 1], g);
          if (!_.length) continue;
          const R = (D) => a.some(
            (q) => q !== g && !m.has(q.id) && Math.abs(D.x - q.x) < q.w / 2 + r(q) / 2 && Math.abs(D.y - q.y) < q.h / 2 + r(q) / 2
          ), L = (D) => {
            let q = 0;
            const v = [f[l], ...D, f[l + 1]];
            for (let E = 0; E < v.length - 1; E++)
              q += Math.hypot(v[E + 1].x - v[E].x, v[E + 1].y - v[E].y);
            return q + (D.some(R) ? 1e4 : 0);
          };
          _.sort((D, q) => L(D) - L(q)), f.splice(l + 1, 0, ..._[0]), d = !0;
          break e;
        }
      if (!d) break;
    }
    f.length > 2 && c.set(
      p.id,
      f.slice(1, -1).map((b) => ({ x: Math.round(b.x), y: Math.round(b.y) }))
    );
  }
  return c;
}
function ap(e, t) {
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
function sp(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((o) => o.id === t));
  return n ? { elementType: "process", id: n.id } : null;
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
      const t = e.composedPath()[0], n = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (n === "input" || n === "textarea" || n === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const i = this.renderRoot.querySelector("modux-canvas"), o = (r) => {
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
          e.preventDefault(), i == null || i.fit(), (a = this.renderRoot.querySelector("modux-explorer")) == null || a.fit();
          break;
        case "+":
        case "=":
          e.preventDefault(), i == null || i.zoomBy(1.25);
          break;
        case "-":
          e.preventDefault(), i == null || i.zoomBy(0.8);
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
      const { id: t, appId: n, beforeId: i, nestRowId: o } = e.detail, a = $e(t);
      if (!(a != null && a.itemId)) return;
      const r = this.menuEntryIn(a.appId, a.itemId);
      if (!r) return;
      const c = (s, p) => (s ?? []).some((y) => y.id === p || c(y.children, p));
      if (o) {
        const s = $e(o);
        if (!(s != null && s.itemId) || s.itemId === a.itemId || a.appId === s.appId && c(r.entry.children, s.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: s.appId,
          itemId: a.itemId,
          parentId: s.itemId
        });
        return;
      }
      if (i) {
        const s = $e(i);
        if (!(s != null && s.itemId) || s.itemId === a.itemId) return;
        const p = this.menuEntryIn(s.appId, s.itemId);
        if (!p || a.appId === s.appId && c(r.entry.children, s.itemId) || a.appId === s.appId && p.parentId === r.parentId && r.beforeId === s.itemId)
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
      n && this.command({ kind: "move-menu-item", appId: a.appId, toAppId: n, itemId: a.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var a;
      const { id: t, beforeId: n } = e.detail, i = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!i) return;
      const o = n ? ((a = /^wizrow:[^:]+:(.+)$/.exec(n)) == null ? void 0 : a[1]) ?? null : null;
      this.moveWizardStep(i[1], i[2], o);
    }, this.onDesignKeydown = (e) => {
      const t = e.target;
      if (!(t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
        if ((e.key === "Delete" || e.key === "Backspace") && this._selectedCmp) {
          const { pageId: n, componentId: i } = this._selectedCmp;
          this._selectedCmp = null, this.command({ kind: "remove-page-component", pageId: n, componentId: i }), e.preventDefault();
          return;
        }
        if ((e.key === "Delete" || e.key === "Backspace") && !this._selectedCmp && this._selectedId && (this.model.pages ?? []).some((n) => n.id === this._selectedId)) {
          const n = this._selectedId;
          this._selectedId = null, this.command({ kind: "delete-ui-page", id: n }), e.preventDefault();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c" && this._selectedCmp) {
          const n = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
          n && (this._cmpClipboard = JSON.parse(JSON.stringify(n.node)), this.emit("modux-notice", { message: `Copiado: ${n.node.kind} y sus hijos — Ctrl+V lo pega bajo la selección` })), e.preventDefault();
          return;
        }
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v" && this._cmpClipboard && (this.pasteComponent(), e.preventDefault());
      }
    }, this.onComponentTransferred = (e) => {
      const { fromPageId: t, toPageId: n, componentId: i, toParentId: o, beforeComponentId: a } = e.detail, r = this.componentIn(t, i);
      if (!r || t === n) return;
      const c = JSON.parse(JSON.stringify(r.node)), { ops: s } = this.rebuildComponentOps(n, c, o ?? void 0, a);
      for (const p of s) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: i }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: n, componentId: i },
        ...this.rebuildComponentOps(t, c, r.parentId ?? void 0, r.beforeId).ops
      ]), this._selectedCmp = { pageId: n, componentId: i };
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
      const n = this.inverseOf(e);
      n && this.pushUndoEntry(n);
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
    return gn(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("model") && this._pendingIds.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && !this._paletteOpenedForBlank && this.model.boundedContexts.length === 0 && this.model.externalSystems.length === 0 && (this._paletteOpen = !0, this._paletteOpenedForBlank = !0), e.has("layout")) {
      const t = gn(this.layout["context-map"]).detail;
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
    const n = this.sceneFor(this._view), i = new Set(n.edges.map((c) => c.id)), o = new Set(n.nodes.map((c) => c.id)), a = t.filter((c) => {
      if (i.has(c)) return !1;
      const s = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(c);
      return !!s && o.has(s[1]) && o.has(s[2]);
    });
    if (!a.length) return;
    const r = { ...e.edges };
    a.forEach((c) => delete r[c]), this.writeViewLayout(this._view, { ...e, edges: r });
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), n = e === "contexts" ? "context-map" : `context-map@${e}`, i = gn(this.layout[n]);
    this._detail = e, this._paletteOpen = !0, !Object.keys(i.nodes).length && !Object.keys(i.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = gn(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), r = this.sceneFor("context-map").nodes.filter((y) => !y.parentId), c = Gn(r), s = [...c.keys()].map((y) => ({
      kind: "move-node",
      view: "context-map",
      id: y,
      pos: a.nodes[y] ?? null
    })), p = { ...a.nodes };
    for (const [y, h] of c) {
      const m = r.find((b) => b.id === y), f = a.nodes[y] ?? { x: m.x, y: m.y };
      p[y] = {
        x: Math.round(f.x + (h.x - m.x)),
        y: Math.round(f.y + (h.y - m.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: p }), s.length && this.pushUndoEntry(s);
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
    var y, h;
    const t = (this.model.journeys ?? []).find((m) => m.id === this._activeJourneyId);
    if (!t || this._view !== "context-map" && this._view !== "integrations") return e;
    const n = new Set(e.nodes.map((m) => m.id)), i = vo(t), o = /* @__PURE__ */ new Set(), a = [];
    for (const m of t.legs ?? [])
      !n.has(m.sourceId) || !n.has(m.targetId) || (o.add(m.sourceId), o.add(m.targetId), a.push({
        id: `journeyleg:${t.id}:${m.id}`,
        sourceId: m.sourceId,
        targetId: m.targetId,
        kind: "journey",
        color: "#d97706",
        arrow: !0,
        label: `${i.get(m.id) ?? ""}${m.label ? ` · ${m.label}` : ""}`,
        tooltip: `Tramo ${i.get(m.id)} de «${t.name}» — Supr lo quita`
      }));
    const r = new Set(o), c = new Map(e.nodes.map((m) => [m.id, m]));
    for (const m of o)
      for (let f = (y = c.get(m)) == null ? void 0 : y.parentId; f; f = (h = c.get(f)) == null ? void 0 : h.parentId) r.add(f);
    const s = new Set(a.map((m) => m.id)), p = wo(t).map((m) => m.map((f) => `journeyleg:${t.id}:${f}`).filter((f) => s.has(f))).filter((m) => m.length > 0).filter((m, f, b) => b.findIndex((d) => d.join("|") === m.join("|")) === f);
    return {
      nodes: e.nodes.map((m) => r.has(m.id) ? m : { ...m, dim: !0 }),
      edges: [...e.edges.map((m) => ({ ...m, dim: !0 })), ...a],
      journeyRuns: p
    };
  }
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const n = op(e, t);
    return n.size ? { ...Object.fromEntries(n), ...t } : t;
  }
  pushUndoEntry(e) {
    this._undoStack = [...this._undoStack.slice(-19), e], this._redoStack = [];
  }
  /** Inverses of an operation list, computed against the current state, in reverse order. */
  inversesOf(e) {
    return [...e].reverse().flatMap((t) => {
      var n;
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
          size: ((n = this.viewLayout(t.view).sizes) == null ? void 0 : n[t.id]) ?? null
        }
      ] : this.inverseOf(t) ?? [];
    });
  }
  applyOps(e) {
    for (const t of e)
      if (t.kind === "move-node") {
        const n = this.viewLayout(t.view), i = { ...n.nodes };
        t.pos ? i[t.id] = t.pos : delete i[t.id], this.writeViewLayout(t.view, { ...n, nodes: i });
      } else if (t.kind === "set-edge-points") {
        const n = this.viewLayout(t.view), i = { ...n.edges };
        t.points ? i[t.id] = t.points : delete i[t.id], this.writeViewLayout(t.view, { ...n, edges: i });
      } else if (t.kind === "resize-node") {
        const n = this.viewLayout(t.view), i = { ...n.sizes ?? {} };
        t.size ? i[t.id] = t.size : delete i[t.id], this.writeViewLayout(t.view, { ...n, sizes: i });
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
    const { id: t, x: n, y: i } = e.detail, o = this._view, a = this.viewLayout(o), r = a.nodes[t] ?? null;
    let c = { x: n, y: i };
    const s = this.sceneFor(o), p = s.nodes.find((h) => h.id === t);
    if (p != null && p.parentId) {
      const h = s.nodes.find((m) => m.id === p.parentId);
      h && (c = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: c } });
    const y = [{ kind: "move-node", view: o, id: t, pos: r }];
    if (o === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const m = this.inverseOf(h);
        m && y.unshift(...m), this.command(h, !1);
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
    const { id: t, targetId: n, x: i, y: o } = e.detail, a = this.model.externalSystems.find((d) => d.id === t);
    if (a) {
      const d = n ? this.model.externalSystems.find((D) => D.id === n) : null;
      if (n && !d) return;
      for (let D = d; D; ) {
        if (D.id === t) return;
        const q = D.parentExternalSystemId;
        D = q ? this.model.externalSystems.find((v) => v.id === q) ?? null : null;
      }
      const l = (d == null ? void 0 : d.id) ?? null;
      if ((a.parentExternalSystemId ?? null) === l) return;
      const g = this._view, k = this.viewLayout(g), x = this.sceneFor(g), _ = l ? x.nodes.find((D) => D.id === l) : void 0, R = _ ? { x: i - _.x, y: o - _.y } : { x: i, y: o }, L = l ? (this.model.externalSystemDependencies ?? []).filter(
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
        { kind: "move-node", view: g, id: t, pos: k.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: l }, !1), this.writeViewLayout(g, { ...k, nodes: { ...k.nodes, [t]: R } });
      return;
    }
    const r = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!r || n && !this.model.externalSystems.some((d) => d.id === n)) return;
    const c = r.publishedByExternalSystemId ?? "", s = n ?? "";
    if (s === c) return;
    const p = this._view, y = this.viewLayout(p), h = this.sceneFor(p), m = s ? h.nodes.find((d) => d.id === s) : void 0, f = m ? { x: i - m.x, y: o - m.y } : { x: i, y: o }, b = [
      { kind: "set-api-publisher", id: t, targetId: c },
      { kind: "move-node", view: p, id: t, pos: y.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: s }, !1), this.writeViewLayout(p, { ...y, nodes: { ...y.nodes, [t]: f } }), this.pushUndoEntry(b);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: n, x: i, y: o } = e.detail, a = (this.model.apis ?? []).find((b) => b.id === t), r = this.model.externalSystems.find((b) => b.id === n);
    if (!a || !r || (this.model.proxyApis ?? []).some(
      (b) => b.targetApiId === t && b.publishedByExternalSystemId === n
    )) return;
    const s = `proxy-${ae(a.name)}-${ae(r.name)}`;
    if ((this.model.proxyApis ?? []).some((b) => b.id === s)) return;
    const p = this._view, y = this.viewLayout(p), m = this.sceneFor(p).nodes.find((b) => b.id === n);
    this.command(
      {
        kind: "add-proxy-api",
        id: s,
        name: `${a.name}@${r.name}`,
        targetId: t,
        boundedContextId: n
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: s }];
    m && (f.push({ kind: "move-node", view: p, id: s, pos: y.nodes[s] ?? null }), this.writeViewLayout(p, {
      ...y,
      nodes: { ...y.nodes, [s]: { x: i - m.x, y: o - m.y } }
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
    var c, s, p;
    const t = e.target, n = (c = t.files) == null ? void 0 : c[0];
    if (t.value = "", !n) return;
    const i = await n.text(), o = this.selectedApiId(), a = o ? null : ((s = this.model.externalSystems.find((y) => y.id === this._selectedId)) == null ? void 0 : s.id) ?? null, r = o || a ? null : ((p = this.model.boundedContexts.find((y) => y.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!o && !a && !r) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: i,
      fileName: n.name,
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
    const { id: t } = e.detail, n = this._view, i = this.viewLayout(n), o = new Set(i.collapsed ?? []);
    o.has(t) ? o.delete(t) : o.add(t), this.writeViewLayout(n, { ...i, collapsed: [...o] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, n = this._view, i = this.viewLayout(n), o = this.sceneFor(n), a = { ...i.nodes }, r = [];
    for (const { id: c, x: s, y: p } of t) {
      r.push({ kind: "move-node", view: n, id: c, pos: i.nodes[c] ?? null });
      let y = { x: s, y: p };
      const h = o.nodes.find((m) => m.id === c);
      if (h != null && h.parentId) {
        const m = o.nodes.find((f) => f.id === h.parentId);
        m && (y = { x: s - m.x, y: p - m.y });
      }
      a[c] = y;
    }
    if (this.writeViewLayout(n, { ...i, nodes: a }), n === "processes")
      for (const { id: c } of t) {
        const s = this.stepReorderCommand(c);
        if (s) {
          const p = this.inverseOf(s);
          p && r.unshift(...p), this.command(s, !1);
        }
      }
    this.pushUndoEntry(r);
  }
  onNodeResized(e) {
    var f;
    const { id: t, x: n, y: i, w: o, h: a } = e.detail, r = this._view, c = this.viewLayout(r), s = this.sceneFor(r), p = s.nodes.find((b) => b.id === t), y = p != null && p.parentId ? s.nodes.find((b) => b.id === p.parentId) : void 0, h = y ? [] : s.nodes.filter((b) => b.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((f = c.sizes) == null ? void 0 : f[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: c.nodes[t] ?? null },
      ...h.map((b) => ({ kind: "move-node", view: r, id: b.id, pos: c.nodes[b.id] ?? null }))
    ]);
    const m = {
      ...c.nodes,
      [t]: y ? { x: n - y.x, y: i - y.y } : { x: n, y: i }
    };
    for (const b of h) m[b.id] = { x: b.x - n, y: b.y - i };
    this.writeViewLayout(r, {
      ...c,
      nodes: m,
      sizes: { ...c.sizes ?? {}, [t]: { w: o, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: n } = e.detail, i = this._view, o = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: t, points: o.edges[t] ?? null }
    ]);
    const a = { ...o.edges };
    a[t] = n, this.writeViewLayout(i, { ...o, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const n = ji(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((r) => [r.id, r.x])), o = [...t.steps].sort(
      (r, c) => (i.get(r.id) ?? 0) - (i.get(c.id) ?? 0)
    );
    if (o.every((r, c) => r.id === t.steps[c].id)) return null;
    const a = o.findIndex((r) => r.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? o[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: n, x: i, y: o, connectKind: a } = e.detail;
    this.applyConnection(t, n, i, o, a);
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
    const n = this.model.relations.find(
      (i) => i.sourceId === t.sourceId && i.targetId === t.targetId
    );
    n && n.type !== e && this.command({ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: e });
  }
  /** Supr with a multi-selection: every selected node goes through the per-kind logic. */
  onDeleteSelectionRequested(e) {
    const { items: t } = e.detail;
    for (const n of t)
      this.onDeleteRequested(
        new CustomEvent("delete-requested", {
          detail: { elementType: "node", id: n.id, kind: n.kind }
        })
      );
    this._multi = [];
  }
  onDeleteRequested(e) {
    const { elementType: t, id: n, kind: i } = e.detail;
    if (this._activeViewId && t === "node") {
      const o = this.memberIdOf(n, i), a = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
      if (o && (a != null && a.memberIds.includes(o))) {
        this._deletePicker = { elementType: t, id: n, kind: i, memberId: o };
        return;
      }
    }
    this.performDelete(t, n, i);
  }
  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  memberIdOf(e, t) {
    var n, i;
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
        return ((n = this.owningProcessOf(e)) == null ? void 0 : n.id) ?? null;
      case "workflow-step":
        return ((i = this.owningWorkflowOf(e)) == null ? void 0 : i.id) ?? null;
      default:
        return null;
    }
  }
  inverseOf(e) {
    return Qc(this.gestureHost(), e);
  }
  applyConnection(e, t, n, i, o) {
    wa(this.gestureHost(), this._view, e, t, n, i, o);
  }
  performDelete(e, t, n) {
    Zc(this.gestureHost(), this._view, e, t, n);
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
      rebuildComponentOps: (e, t, n, i, o, a) => this.rebuildComponentOps(e, t, n, i, o, a),
      openExtDepPicker: (e) => {
        this._extDepPicker = e;
      },
      nodeClientRect: (e) => {
        var n;
        const t = (n = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : n.renderRoot.querySelector(`g[data-node-id="${e}"]`);
        return t == null ? void 0 : t.getBoundingClientRect();
      },
      clearSelection: () => {
        this._selectedId = null;
      }
    };
  }
  owningProcessOf(e) {
    return (this.model.processes ?? []).find((t) => t.steps.some((n) => n.id === e));
  }
  owningUseCaseOf(e) {
    return this.model.boundedContexts.flatMap((t) => t.useCases ?? []).find((t) => (t.steps ?? []).some((n) => n.id === e));
  }
  owningWorkflowOf(e) {
    return (this.model.workflows ?? []).find((t) => t.steps.some((n) => n.id === e));
  }
  owningApiOf(e) {
    return (this.model.apis ?? []).find((t) => t.operations.some((n) => n.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: n, name: i } = e.detail;
    (n === "boundedContext" || n === "aggregate" || n === "entity" || n === "process-step" || n === "workflow" || n === "workflow-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "query-service" || n === "use-case" || n === "external-use-case" || n === "external-table" || n === "mcp-server" || n === "mcp-gateway" || n === "application-event" || n === "external-system" || n === "actor" || n === "ai-agent" || n === "rag" || n === "api" || n === "proxy-api" || n === "api-operation") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((o) => o.id === this._selectedId), n = t ?? this.owningProcessOf(this._selectedId);
    if (!n) return;
    const i = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: n.id,
      id: `step-${ae(e)}`,
      name: e,
      stepType: this._newStepType,
      roleId: this._newStepType === "HUMAN" && this._newStepRole.trim() || void 0,
      deadline: this._newStepType === "HUMAN" && this._newStepDeadline.trim() || void 0,
      afterStepId: i
    }), this._newStepName = "", this._newStepDeadline = "";
  }
  addWorkflowStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.workflows ?? []).find((i) => i.id === this._selectedId), n = t ?? this.owningWorkflowOf(this._selectedId);
    n && (this.command({
      kind: "add-workflow-step",
      workflowId: n.id,
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
    !e || !t || !(this.model.rags ?? []).some((n) => n.id === t) || (this.command({
      kind: "add-rag-content-source",
      sourceId: t,
      type: this._newRagSourceType,
      uri: e
    }), this._newRagSourceUri = "");
  }
  /** Candidates for the add-to-view search: catalog elements not yet in the view. */
  viewMemberCandidates() {
    const e = (this.model.views ?? []).find((n) => n.id === this._activeViewId);
    if (!e) return [];
    const t = new Set(e.memberIds);
    return [
      ...this.model.boundedContexts.map((n) => ({ id: n.id, name: n.name, kind: "contexto" })),
      ...this.model.externalSystems.map((n) => ({ id: n.id, name: n.name, kind: "externo" })),
      ...(this.model.aggregates ?? []).map((n) => ({ id: n.id, name: n.name, kind: "agregado" })),
      ...this.model.flows.map((n) => ({ id: n.id, name: n.name, kind: "flow" })),
      ...(this.model.processes ?? []).map((n) => ({ id: n.id, name: n.name, kind: "proceso" })),
      ...(this.model.workflows ?? []).map((n) => ({ id: n.id, name: n.name, kind: "workflow" })),
      ...(this.model.actors ?? []).map((n) => ({ id: n.id, name: n.name, kind: "actor" })),
      ...(this.model.aiAgents ?? []).map((n) => ({ id: n.id, name: n.name, kind: "agente" })),
      ...(this.model.mcpGateways ?? []).map((n) => ({ id: n.id, name: n.name, kind: "gateway" })),
      ...(this.model.rags ?? []).map((n) => ({ id: n.id, name: n.name, kind: "rag" })),
      ...(this.model.apis ?? []).map((n) => ({ id: n.id, name: n.name, kind: "api" }))
    ].filter((n) => !t.has(n.id));
  }
  /** The active journey, legs numbered, for the surfaces that draw it themselves. */
  activeJourneyForSurface() {
    const e = (this.model.journeys ?? []).find((n) => n.id === this._activeJourneyId);
    if (!e) return null;
    const t = vo(e);
    return {
      name: e.name,
      legs: (e.legs ?? []).map((n) => ({
        id: n.id,
        sourceId: n.sourceId,
        targetId: n.targetId,
        num: t.get(n.id) ?? "",
        label: n.label
      })),
      runs: wo(e)
    };
  }
  createJourneyFromToolbar() {
    const e = this._newJourneyName.trim();
    if (!e) return;
    const t = `tr-${ae(e)}`;
    if ((this.model.journeys ?? []).some((n) => n.id === t)) {
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
      (n) => `${n.name} (${n.id})` === e || n.id === e || n.name === e
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
    const t = new Set(e.memberIds), n = (o, a, r = {}) => A`
      <label
        class="${r.child ? "child" : ""} ${r.implicit && !t.has(o) ? "implicit" : ""}"
        title=${r.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(c) => this.toggleViewMember(o, c.target.checked)}
        />
        ${a}
      </label>
    `, i = (o, a) => a.length ? A`<h4>${o}</h4>${a}` : "";
    return A`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${i(
      "Contextos",
      this.model.boundedContexts.flatMap((o) => [
        n(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((a) => a.boundedContextId === o.id).map((a) => n(a.id, a.name, { child: !0, implicit: t.has(o.id) }))
      ])
    )}
        ${i(
      "Sistemas externos",
      this.model.externalSystems.map((o) => n(o.id, o.name))
    )}
        ${i("APIs", (this.model.apis ?? []).map((o) => n(o.id, o.name)))}
        ${i("Actores", (this.model.actors ?? []).map((o) => n(o.id, o.name)))}
        ${i("Agentes IA", (this.model.aiAgents ?? []).map((o) => n(o.id, o.name)))}
        ${i("Gateways MCP", (this.model.mcpGateways ?? []).map((o) => n(o.id, o.name)))}
        ${i("RAGs", (this.model.rags ?? []).map((o) => n(o.id, o.name)))}
        ${i("Flows", this.model.flows.map((o) => n(o.id, o.name)))}
        ${i("Procesos", (this.model.processes ?? []).map((o) => n(o.id, o.name)))}
        ${i("Workflows", (this.model.workflows ?? []).map((o) => n(o.id, o.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, n;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const i = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((o) => o.id === e.detail.id);
      this._editStepRole = (i == null ? void 0 : i.roleId) ?? "", this._editStepDeadline = (i == null ? void 0 : i.deadline) ?? "", this._editStepComp = (i == null ? void 0 : i.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const i = (n = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : n.steps.find((o) => o.id === e.detail.id);
      this._editStepUseCase = (i == null ? void 0 : i.targetUseCaseId) ?? "", this._editStepEmits = (i == null ? void 0 : i.emittedEventName) ?? "", this._editStepAwaits = (i == null ? void 0 : i.completionEventName) ?? "";
    }
    this.emit("modux-select", { elementType: e.detail.kind, id: e.detail.id });
  }
  onMultiToggled(e) {
    const { id: t } = e.detail;
    this._selectedId = null, this._multi = this._multi.includes(t) ? this._multi.filter((n) => n !== t) : [...this._multi, t];
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
      const n = new Set((this.model.pages ?? []).map((i) => i.id));
      return this.viewSelection().filter((i) => n.has(i));
    }
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const n of this.viewSelection()) {
      const i = e.nodes.find((o) => o.id === n);
      if (i)
        switch (i.kind) {
          case "boundedContext":
          case "external-system":
            t.add(n.replace(/^tgt:/, ""));
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
            t.add(n);
            break;
          case "menu-item":
          case "menu-group": {
            const o = $e(n);
            o && t.add(o.appId);
            break;
          }
          case "flow":
            t.add(n.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const o = this.owningProcessOf(n);
            o && t.add(o.id);
            break;
          }
          case "workflow-step": {
            const o = this.owningWorkflowOf(n);
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
    const n = `view-${ae(e)}`;
    this.command({ kind: "add-view", id: n, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = n;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((f) => f.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), n = this.model.boundedContexts.filter((f) => t.has(f.id)), i = new Set(n.map((f) => f.id)), o = this.model.externalSystems.filter((f) => t.has(f.id)), a = new Set(o.map((f) => f.id)), r = (this.model.aggregates ?? []).filter(
      (f) => t.has(f.id) || i.has(f.boundedContextId)
    ), c = new Set(r.map((f) => f.id)), s = (this.model.uiApps ?? []).filter((f) => t.has(f.id)), p = /* @__PURE__ */ new Set(), y = (f) => {
      for (const b of f ?? [])
        b.pageId && p.add(b.pageId), y(b.children);
    };
    s.forEach((f) => y(f.menuItems));
    const h = (this.model.pages ?? []).filter(
      (f) => t.has(f.id) || p.has(f.id)
    ), m = new Set(s.map((f) => f.id));
    return {
      ...this.model,
      uiApps: s,
      pages: h,
      actorAppUses: (this.model.actorAppUses ?? []).filter((f) => m.has(f.appId)),
      boundedContexts: n,
      externalSystems: o,
      relations: this.model.relations.filter(
        (f) => i.has(f.sourceId) && i.has(f.targetId)
      ),
      flows: this.model.flows.filter(
        (f) => t.has(f.id) || (i.has(f.sourceId) || a.has(f.sourceId)) && (i.has(f.targetId) || a.has(f.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((f) => c.has(f.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (f) => c.has(f.sourceAggregateId) && c.has(f.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (f) => t.has(f.id) || (f.ownerBoundedContextId ? i.has(f.ownerBoundedContextId) : !1)
      ),
      // Workflows have no owner boundedContext (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((f) => t.has(f.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((f) => t.has(f.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((f) => t.has(f.id)),
      rags: (this.model.rags ?? []).filter((f) => t.has(f.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((f) => t.has(f.id)),
      apis: (this.model.apis ?? []).filter(
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? a.has(f.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? a.has(f.publishedByExternalSystemId) : !1)
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
    var n;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const i = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = i ? (this.model.workflowGateways ?? []).find((a) => a.id === i[1]) : null;
      if (i && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const a = ((n = (o.branchConditions ?? []).find((r) => r.targetId === i[2])) == null ? void 0 : n.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: i[2], value: a };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const i = (this.model.workflowGateways ?? []).find((a) => a.id === e.detail.id);
      if (!i) return;
      const o = i.type === "SPLIT" ? i.semantics === "EXCLUSIVE" ? "PARALLEL" : "EXCLUSIVE" : i.semantics === "ANY" ? "ALL" : "ANY";
      this.command({ kind: "set-gateway-semantics", id: i.id, type: o });
      return;
    }
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
    if (e.detail.kind === "invariant") {
      const i = (this.model.aggregates ?? []).find((o) => (o.invariants ?? []).some((a) => a.id === e.detail.id));
      i && this.openInDrawer({ elementType: "aggregate", id: i.id });
      return;
    }
    const t = e.detail.kind === "process-step" ? sp(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : ap(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), n = (a) => {
      for (const r of a ?? [])
        r.id && t.add(r.id), n(r.children);
    };
    (this.model.uiApps ?? []).forEach((a) => n(a.menuItems));
    const i = `mi-${ae(e)}`;
    let o = i;
    for (let a = 2; t.has(o); a++) o = `${i}-${a}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const n = (this.model.pages ?? []).find((a) => a.id === e);
    let i = null;
    const o = (a, r) => {
      var s;
      const c = a ?? [];
      for (let p = 0; p < c.length; p++)
        c[p].id === t && (i = { node: c[p], parentId: r, beforeId: ((s = c[p + 1]) == null ? void 0 : s.id) ?? null }), o(c[p].children, c[p].id);
    };
    return o(n == null ? void 0 : n.content, null), i;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, n, i, o = !1, a) {
    const r = a ?? this.allComponentIds(), c = (h) => {
      if (!o) return h.id;
      const m = `cmp-${ae(h.kind)}`;
      let f = m;
      for (let b = 2; r.has(f) || r.has(`${f}-tab-1`); b++) f = `${m}-${b}`;
      return r.add(f), f;
    }, s = [], p = (h, m) => {
      const f = c(h);
      s.push({ kind: "add-page-component", pageId: e, componentId: f, componentKind: h.kind, parentComponentId: m }), h.kind === "tabLayout" && (s.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-1` }), s.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-2` })), s.push({
        kind: "set-page-component",
        pageId: e,
        componentId: f,
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
      for (const b of h.children ?? []) p(b, f);
      return f;
    }, y = p(t, n);
    return i && s.push({
      kind: "move-page-component",
      pageId: e,
      componentId: y,
      parentComponentId: n ?? null,
      beforeComponentId: i
    }), { ops: s, rootId: y };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (n) => {
      for (const i of n ?? [])
        e.add(i.id), t(i.children);
    };
    return (this.model.pages ?? []).forEach((n) => t(n.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), n = (a) => {
      for (const r of a ?? [])
        t.add(r.id), n(r.children);
    };
    (this.model.pages ?? []).forEach((a) => n(a.content));
    const i = `cmp-${ae(e)}`;
    let o = i;
    for (let a = 2; t.has(o) || t.has(`${o}-tab-1`); a++) o = `${i}-${a}`;
    return o;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, n) {
    var a;
    if (n === t) return;
    const i = (((a = (this.model.pages ?? []).find((r) => r.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((r) => r.id ?? r.pageId), o = i.indexOf(t);
    o >= 0 && (n ? i[o + 1] === n : o === i.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: n });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const n = (this.model.uiApps ?? []).find((a) => a.id === e);
    let i = null;
    const o = (a, r) => {
      var s;
      const c = a ?? [];
      for (let p = 0; p < c.length; p++)
        c[p].id === t && (i = { entry: c[p], parentId: r, beforeId: ((s = c[p + 1]) == null ? void 0 : s.id) ?? null }), o(c[p].children, c[p].id ?? null);
    };
    return o(n == null ? void 0 : n.menuItems, null), i;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var r;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, n, i = null;
    if (this._selectedCmp) {
      const c = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!c) return;
      t = this._selectedCmp.pageId, le.LEAF_KINDS.has(c.node.kind) ? (n = c.parentId ?? void 0, i = c.beforeId) : n = c.node.kind === "tabLayout" && e.kind !== "tab" ? (r = (c.node.children ?? [])[0]) == null ? void 0 : r.id : c.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((c) => c.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: a } = this.rebuildComponentOps(t, e, n, i, !0);
    for (const c of o) this.command(c, !1);
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
      const { id: n, w: i, h: o } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: n, size: ((r = a.sizes) == null ? void 0 : r[n]) ?? null }
      ]), this.writeViewLayout("design", {
        ...a,
        sizes: { ...a.sizes ?? {}, [n]: { w: i, h: o } }
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
      (t) => (t.useCases ?? []).map((n) => ({ id: n.id, name: n.name }))
    )}
      .queryOps=${this.model.boundedContexts.flatMap(
      (t) => (t.queryServices ?? []).flatMap(
        (n) => (n.operations ?? []).map((i) => ({
          id: i.id,
          name: `${i.name} (${n.name})`,
          queryServiceId: n.id
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
      const { pageId: n, componentId: i, ...o } = t.detail;
      this.command({ kind: "set-page-component", pageId: n, componentId: i, ...o });
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
      const { pageId: n, fieldId: i, stereotype: o, colspan: a, label: r } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: n, fieldId: i, stereotype: o, colspan: a, label: r });
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
        items: e.boundedContexts.map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Apps",
        symbol: "component",
        color: "#0ea5e9",
        items: (e.uiApps ?? []).map((i) => ({ id: i.id, name: i.title || i.name }))
      },
      {
        label: "Páginas",
        symbol: "interface",
        color: "#0284c7",
        items: (e.pages ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Modelos",
        symbol: "readmodel",
        color: "#0369a1",
        items: (e.models ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Triggers programados",
        symbol: "clock",
        color: "#d97706",
        items: e.boundedContexts.flatMap(
          (i) => (i.scheduledTriggers ?? []).map((o) => ({ id: o.id, name: o.name }))
        )
      },
      {
        label: "Mapeados",
        symbol: "flow",
        color: "#7c3aed",
        items: (e.modelMappings ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Casos de uso",
        symbol: "usecase",
        color: "#06b6d4",
        items: e.boundedContexts.flatMap((i) => (i.useCases ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.boundedContexts.flatMap((i) => [
          ...(i.domainEvents ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(i.applicationEvents ?? []).map((o) => ({ id: o.id, name: o.name }))
        ])
      },
      {
        label: "Agregados",
        symbol: "aggregate",
        color: "#8b5cf6",
        items: (e.aggregates ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Read models",
        symbol: "readmodel",
        color: "#10b981",
        items: e.boundedContexts.flatMap((i) => (i.readModels ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap(
          (i) => (i.queryServices ?? []).flatMap(
            (o) => (o.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${o.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap((i) => (i.queryServices ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Actores",
        symbol: "person",
        color: "#64748b",
        items: (e.actors ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Sistemas externos",
        symbol: "component",
        color: "#64748b",
        items: e.externalSystems.map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Operaciones y tablas externas",
        symbol: "usecase",
        color: "#64748b",
        items: e.externalSystems.flatMap((i) => [
          ...(i.useCases ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(i.tables ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(i.mcpServers ?? []).map((o) => ({ id: o.id, name: o.name }))
        ])
      },
      {
        label: "APIs",
        symbol: "interface",
        color: "#4f46e5",
        items: (e.apis ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Operaciones de API",
        symbol: "usecase",
        color: "#4f46e5",
        items: (e.apis ?? []).flatMap((i) => i.operations.map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Proxies API",
        symbol: "interface",
        color: "#0e7490",
        items: (e.proxyApis ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Agentes IA",
        symbol: "robot",
        color: "#9333ea",
        items: (e.aiAgents ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Gateways MCP",
        symbol: "plug",
        color: "#7c3aed",
        items: (e.mcpGateways ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "RAGs",
        symbol: "lens",
        color: "#0e7490",
        items: (e.rags ?? []).map((i) => ({ id: i.id, name: i.name }))
      },
      {
        label: "Workflows",
        symbol: "process",
        color: "#6d28d9",
        items: (e.workflows ?? []).map((i) => ({ id: i.id, name: i.name }))
      }
    ], n = this._paletteFilter.trim().toLowerCase();
    return t.map((i) => ({
      ...i,
      items: n ? i.items.filter((o) => o.name.toLowerCase().includes(n)) : i.items
    })).filter((i) => i.items.length > 0);
  }
  onPaletteDragStart(e, t) {
    var n;
    (n = e.dataTransfer) == null || n.setData("application/x-modux-palette", JSON.stringify(t)), e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
  }
  onPaletteDrop(e) {
    var c;
    const t = (c = e.dataTransfer) == null ? void 0 : c.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const n = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!n) return;
    const i = n.sceneFromClient(e.clientX, e.clientY), o = n.nodeIdAtClient(e.clientX, e.clientY), a = this._view === "design" && "dropSlotAtClient" in n ? n.dropSlotAtClient(e.clientX, e.clientY) : null;
    let r;
    try {
      r = JSON.parse(t);
    } catch {
      return;
    }
    r.new ? this.createFromPalette(r.new, i, o, a) : r.existing && this.placeExistingFromPalette(r.existing, i, o, e.clientX, e.clientY, a);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const n = /* @__PURE__ */ new Set([...this._pendingIds, ...this.sceneFor(this._view).nodes.map((o) => o.id)]), i = this.model;
    for (const o of [
      i.boundedContexts.map((a) => a.id),
      i.boundedContexts.flatMap((a) => (a.useCases ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.domainEvents ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.applicationEvents ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.readModels ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.domainServices ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.queryServices ?? []).map((r) => r.id)),
      i.boundedContexts.flatMap((a) => (a.scheduledTriggers ?? []).map((r) => r.id)),
      (i.aggregates ?? []).map((a) => a.id),
      (i.entities ?? []).map((a) => a.id),
      (i.actors ?? []).map((a) => a.id),
      i.externalSystems.map((a) => a.id),
      i.externalSystems.flatMap((a) => (a.useCases ?? []).map((r) => r.id)),
      i.externalSystems.flatMap((a) => (a.tables ?? []).map((r) => r.id)),
      i.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((r) => r.id)),
      (i.apis ?? []).map((a) => a.id),
      (i.apis ?? []).flatMap((a) => (a.operations ?? []).map((r) => r.id)),
      (i.proxyApis ?? []).map((a) => a.id),
      (i.aiAgents ?? []).map((a) => a.id),
      (i.mcpGateways ?? []).map((a) => a.id),
      (i.rags ?? []).map((a) => a.id),
      (i.workflows ?? []).map((a) => a.id),
      (i.workflows ?? []).flatMap((a) => (a.steps ?? []).map((r) => r.id)),
      (i.etlFlows ?? []).map((a) => a.id),
      (i.identityProviders ?? []).map((a) => a.id),
      (i.notifications ?? []).map((a) => a.id),
      (i.documents ?? []).map((a) => a.id),
      (i.uiApps ?? []).map((a) => a.id),
      (i.pages ?? []).map((a) => a.id),
      (i.modules ?? []).map((a) => a.id),
      (i.services ?? []).map((a) => a.id),
      (i.models ?? []).flatMap((a) => (a.fields ?? []).map((r) => r.id)),
      (i.customCodes ?? []).map((a) => a.id),
      (i.buttonGroups ?? []).map((a) => a.id),
      (i.workflowGateways ?? []).map((a) => a.id)
    ])
      o.forEach((a) => n.add(a));
    for (let o = 1; ; o++) {
      const a = o === 1 ? e : `${e} ${o}`, r = `${t}${ae(a)}`;
      if (!n.has(r))
        return this._pendingIds.add(r), { id: r, name: a };
    }
  }
  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  dropChain(e) {
    var i;
    if (!e) return [];
    if (this._yugo) {
      const o = this.renderRoot.querySelector("modux-explorer");
      return (o == null ? void 0 : o.chainOf(e)) ?? [e];
    }
    const t = this.sceneFor(this._view), n = [];
    for (let o = e; o; )
      n.push(o), o = (i = t.nodes.find((a) => a.id === o)) == null ? void 0 : i.parentId;
    return n;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const n = this.dropChain(t);
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
    ].includes(e)) return n.find((r) => this.model.boundedContexts.some((c) => c.id === r)) ?? null;
    if (e === "invariant") {
      const r = n.find((s) => (this.model.aggregates ?? []).some((p) => p.id === s));
      if (r) return r;
      const c = n.find((s) => this.model.boundedContexts.some((p) => p.id === s));
      return ((o = (this.model.aggregates ?? []).find((s) => s.boundedContextId === c)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const r = n.find((s) => (this.model.aggregates ?? []).some((p) => p.id === s));
      if (r) return r;
      const c = n.find((s) => this.model.boundedContexts.some((p) => p.id === s));
      return ((a = (this.model.aggregates ?? []).find((s) => s.boundedContextId === c)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((r) => this.model.externalSystems.some((c) => c.id === r)) ?? null;
    if (e === "model-field")
      return n.find((r) => (this.model.models ?? []).some((c) => c.id === r)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return n.find((r) => (this.model.buttonGroups ?? []).some((c) => c.id === r)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (r) => this.model.boundedContexts.some((c) => (c.useCases ?? []).some((s) => s.id === r))
      ) ?? null;
    if (e === "api-operation") {
      for (const r of n) {
        if ((this.model.apis ?? []).some((p) => p.id === r)) return r;
        const c = /^apiimpl:(.+)@(.+)$/.exec(r);
        if (c && (this.model.apis ?? []).some((p) => p.id === c[1])) return c[1];
        const s = (this.model.proxyApis ?? []).find((p) => p.id === r);
        if (s != null && s.targetApiId) return s.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((r) => this.model.externalSystems.some((c) => c.id === r)) ?? n.find((r) => this.model.boundedContexts.some((c) => c.id === r)) ?? null : null;
  }
  createFromPalette(e, t, n, i = null) {
    var f, b;
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
      const d = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, l = d ? d[1] : n && (this.model.pages ?? []).some((x) => x.id === n) ? n : null;
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: g, name: k } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: g, name: k }, !1), d ? (this.command({ kind: "set-page-component-custom-code", pageId: l, componentId: d[2], targetId: g }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: l, targetId: g }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const d = e.slice(4), l = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, g = l ? l[1] : n && (this.model.pages ?? []).some((L) => L.id === n) ? n : null;
      if (!g) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let k = l ? l[2] : void 0, x = null;
      if (d === "tab") {
        let L = null, D = k ? this.componentIn(g, k) : null;
        for (; D; ) {
          if (D.node.kind === "tabLayout") {
            L = D.node.id;
            break;
          }
          D = D.parentId ? this.componentIn(g, D.parentId) : null;
        }
        if (!L) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const q = this.componentIn(g, L).node, v = this.newComponentId("tab"), E = `Pestaña ${(q.children ?? []).filter((V) => V.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: g, componentId: v, componentKind: "tab", parentComponentId: L }, !1), this.command({ kind: "set-page-component", pageId: g, componentId: v, title: E }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: g, componentId: v }]);
        return;
      }
      if (i != null && i.componentId && i.pos !== "into") {
        const L = this.componentIn(g, i.componentId);
        L && L.node.kind === "tab" ? k = L.node.id : L && (k = L.parentId ?? void 0, x = i.pos === "before" ? i.componentId : L.beforeId);
      } else if (k) {
        const L = ((f = this.componentIn(g, k)) == null ? void 0 : f.node) ?? null;
        (L == null ? void 0 : L.kind) === "tabLayout" && (L.children ?? [])[0] && (k = (L.children ?? [])[0].id);
      }
      const _ = this.newComponentId(d), R = {
        kind: "add-page-component",
        pageId: g,
        componentId: _,
        componentKind: d,
        parentComponentId: k
      };
      if (!x) {
        this.command(R);
        return;
      }
      this.command(R, !1), this.command(
        { kind: "move-page-component", pageId: g, componentId: _, parentComponentId: k ?? null, beforeComponentId: x },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: g, componentId: _ }]);
      return;
    }
    const a = this._view, r = this.sceneFor(a), c = (d, l) => {
      const g = this.viewLayout(a), k = l ? r.nodes.find((_) => _.id === l) : void 0, x = k ? { x: Math.round(t.x - k.x), y: Math.round(t.y - k.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...g, nodes: { ...g.nodes, [d]: x } }), { kind: "move-node", view: a, id: d, pos: null };
    }, s = (d, l, g) => {
      const k = this.inverseOf(d) ?? [];
      this.command(d, !1);
      const x = c(l, g);
      this.pushUndoEntry([...k, x]);
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
      }, { id: l, name: g } = this.uniquePaletteName(o.label, d[e] ?? ""), k = e === "boundedContext" ? { kind: "add-boundedContext", id: l, name: g, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: l, name: g } : e === "external-system" ? { kind: "add-external-system", id: l, name: g } : e === "ai-agent" ? { kind: "add-ai-agent", id: l, name: g } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: l, name: g, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: l, name: g } : e === "rag" ? { kind: "add-rag", id: l, name: g } : e === "api" ? { kind: "add-api", id: l, name: g } : e === "proxy-api" ? { kind: "add-proxy-api", id: l, name: g } : e === "ui-app" ? { kind: "create-ui-app", id: l, name: g } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: l, name: g, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: l, name: g, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: l, name: g, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: l, name: g } : e === "transformation" ? { kind: "add-transformation", id: l, name: g } : e === "custom-code" ? { kind: "add-custom-code", id: l, name: g } : e === "button-group" ? { kind: "add-button-group", id: l, name: g } : e === "identity-provider" ? { kind: "add-identity-provider", id: l, name: g } : e === "service" ? { kind: "add-service", id: l, name: g } : {
        kind: "add-workflow",
        id: l,
        name: g,
        completionEventName: `${g.replace(/\s+/g, "")}Completado`
      };
      if (k.kind === "create-ui-app") {
        const _ = this.dropChain(n).find((R) => this.model.boundedContexts.some((L) => L.id === R));
        if (_) {
          s({ ...k, boundedContextId: _ }, l, _);
          return;
        }
      }
      if (k.kind === "add-external-system") {
        const _ = this.dropChain(n).find((R) => this.model.externalSystems.some((L) => L.id === R));
        if (_) {
          s({ ...k, parentId: _ }, l, _), this.emit("modux-notice", { message: "Subsistema creado dentro del sistema" });
          return;
        }
      }
      s(k, l);
      return;
    }
    if (e === "ui-wizard-step") {
      const l = this.dropChain(n).map((_) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(_)) == null ? void 0 : R[1]) ?? _;
      }).find((_) => (this.model.pages ?? []).some((R) => R.id === _ && R.type === "WIZARD"));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const g = ((b = (this.model.pages ?? []).find((_) => _.id === l)) == null ? void 0 : b.wizardSteps) ?? [], k = new Set(g.map((_) => _.id ?? _.pageId));
      let x = g.length + 1;
      for (; k.has(`wzs-${x}`); ) x++;
      this.command({ kind: "add-page-wizard-step", pageId: l, itemId: `wzs-${x}`, label: `Paso ${x}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const d = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", l = d === "CRUD" ? "CRUD" : d === "WIZARD" ? "Wizard" : "Página", { id: g, name: k } = this.uniquePaletteName(l, "page-"), x = this.dropChain(n), _ = x.find((L) => (this.model.uiApps ?? []).some((D) => D.id === L)), R = x.map((L) => {
        var D;
        return ((D = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : D[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((D) => D.id === L && D.type === "WIZARD"));
      if (R) {
        const L = r.nodes.find((q) => q.id === R);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40), this.command({ kind: "create-ui-page", id: g, name: k, pageType: d }, !1), this.command({ kind: "add-page-wizard-step", pageId: R, targetId: g }, !1);
        const D = c(g);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: g }, D]), this.emit("modux-notice", { message: `${k} creada como paso del wizard` });
        return;
      }
      if (_) {
        const L = r.nodes.find((D) => D.id === _);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40);
      }
      s(
        _ ? { kind: "create-ui-page", id: g, name: k, pageType: d, appId: _, menuLabel: k } : { kind: "create-ui-page", id: g, name: k, pageType: d },
        g
      );
      return;
    }
    if (e === "menu-item") {
      const d = this.dropChain(n), l = d.find((R) => (this.model.uiApps ?? []).some((L) => L.id === R));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const g = /* @__PURE__ */ new Set(), k = (R) => {
        for (const L of R ?? [])
          g.add(L.label), k(L.children);
      };
      (this.model.uiApps ?? []).forEach((R) => k(R.menuItems));
      let x = "Entrada";
      for (let R = 2; g.has(x); R++) x = `Entrada ${R}`;
      const _ = d.map((R) => $e(R)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: l,
        label: x,
        itemId: this.newMenuItemId(x),
        parentId: _ == null ? void 0 : _.itemId,
        parentLabel: _ != null && _.itemId || _ == null ? void 0 : _.label
      });
      return;
    }
    if (e === "etl-transform") {
      const l = this.dropChain(n).map((x) => (this.model.etlFlows ?? []).find((_) => _.id === x)).find(Boolean);
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const g = new Set((l.steps ?? []).map((x) => x.id));
      let k = (l.steps ?? []).length + 1;
      for (; g.has(`ets-${k}`); ) k++;
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
    if (e === "etl-flow" && !this.dropContainerFor(e, n)) {
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
      const l = this.model.workflows ?? [], g = this.dropChain(n), k = g.map((D) => l.find((q) => q.id === D)).find(Boolean), x = g.map((D) => {
        const q = l.find((v) => (v.steps ?? []).some((E) => E.id === D));
        return q ? { owner: q, stepId: D } : null;
      }).find(Boolean);
      let _ = k ?? (x == null ? void 0 : x.owner);
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
      x && (t = { x: t.x + 190, y: t.y }), s(
        {
          kind: "add-workflow-step",
          workflowId: _.id,
          id: R,
          name: L,
          ...x ? { dependsOnStepIds: [x.stepId], afterStepId: x.stepId } : {}
        },
        R
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${_.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const d = this.dropContainerFor("api", n);
      if (!d) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: l, name: g } = this.uniquePaletteName("API", "api-"), k = { kind: "add-api", id: l, name: g }, x = this.inverseOf(k) ?? [];
      this.command(k, !1), this.model.externalSystems.some((D) => D.id === d) ? this.command({ kind: "set-api-publisher", id: l, targetId: d }, !1) : this.command({ kind: "add-api-implementation", apiId: l, boundedContextId: d }, !1);
      const _ = this.viewLayout(this._view), R = this.sceneFor(this._view).nodes.find((D) => D.id === d), L = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ..._, nodes: { ..._.nodes, [l]: L } }), this.pushUndoEntry([...x, { kind: "move-node", view: this._view, id: l, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, n);
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
    }, { id: h, name: m } = this.uniquePaletteName(o.label, y[e] ?? "");
    if (e === "aggregate")
      s({ kind: "add-aggregate", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: p, id: h, name: m }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const d = (this.model.buttonGroups ?? []).find((k) => k.id === p), l = new Set(((d == null ? void 0 : d.buttons) ?? []).map((k) => k.id));
      let g = ((d == null ? void 0 : d.buttons) ?? []).length + 1;
      for (; l.has(`btn-${g}`); ) g++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${g}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: h, name: m });
    else if (e === "module")
      s({ kind: "add-module", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      s(
        { kind: "add-use-case", id: h, name: m, boundedContextId: p, ...e === "policy" ? { policy: !0 } : {} },
        h,
        p
      );
    else if (e === "domain-event")
      s({ kind: "add-domain-event", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "application-event")
      s({ kind: "add-application-event", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "domain-service")
      s({ kind: "add-domain-service", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "query-service")
      s({ kind: "add-query-service", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "scheduled-trigger")
      s({ kind: "add-scheduled-trigger", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      s({ kind: "add-notification", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      s({ kind: "add-document", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      s({ kind: "add-etl-flow", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const d = (this.model.aggregates ?? []).find((l) => l.id === p);
      s({ kind: "add-read-model", id: h, name: m, aggregateId: p }, h, (d == null ? void 0 : d.boundedContextId) ?? p);
    } else if (e === "api-operation") {
      const d = (this.model.apis ?? []).find((_) => _.id === p), l = new Set(((d == null ? void 0 : d.operations) ?? []).map((_) => _.id));
      let g = m, k = `apiop-${p.replace(/^api-/, "")}-${ae(g)}`;
      for (let _ = 2; l.has(k); _++)
        g = `${o.label} ${_}`, k = `apiop-${p.replace(/^api-/, "")}-${ae(g)}`;
      s({ kind: "add-api-operation", apiId: p, id: k, name: g }, k, p), r.nodes.some(
        (_) => _.parentId === p && (_.kind === "api-operation" || _.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(d == null ? void 0 : d.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const d = this.model.boundedContexts.flatMap((x) => x.useCases ?? []).find((x) => x.id === p), l = new Set((d == null ? void 0 : d.stepIds) ?? []);
      let g = m, k = `step-${ae(g)}`;
      for (let x = 2; l.has(k); x++)
        g = `${o.label} ${x}`, k = `step-${ae(g)}`;
      s({ kind: "add-use-case-step", useCaseId: p, id: k, name: g }, k, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(d == null ? void 0 : d.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? s({ kind: "add-external-use-case", id: h, name: m, boundedContextId: p }, h, p) : e === "external-table" ? s({ kind: "add-external-table", id: h, name: m, boundedContextId: p }, h, p) : e === "mcp-server" && s({ kind: "add-mcp-server", id: h, name: m, boundedContextId: p }, h, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, n) {
    var m;
    const i = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (i) {
      const f = (this.model.modelMappings ?? []).find((d) => d.id === e);
      if (f) {
        this.command({
          kind: "set-page-button",
          pageId: i[1],
          useCaseId: i[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${f.name}` });
        return;
      }
      const b = this.model.boundedContexts.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (b) {
        if (e === i[2]) return;
        const d = (this.model.pages ?? []).find((g) => g.id === i[1]), l = ((d == null ? void 0 : d.buttons) ?? []).find((g) => g.useCaseId === i[2]);
        if (!l) return;
        if (((d == null ? void 0 : d.buttons) ?? []).some((g) => g.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: i[1], useCaseId: i[2] }, !1), this.command(
          { kind: "add-page-button", pageId: i[1], useCaseId: e, label: l.label, type: l.bar },
          !1
        ), l.mappingId && this.command(
          { kind: "set-page-button", pageId: i[1], useCaseId: e, label: null, mappingId: l.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: i[1], useCaseId: e },
          { kind: "add-page-button", pageId: i[1], useCaseId: i[2], label: l.label, type: l.bar },
          ...l.mappingId ? [{ kind: "set-page-button", pageId: i[1], useCaseId: i[2], label: null, mappingId: l.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${b.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const f = this.model.boundedContexts.flatMap((d) => d.useCases ?? []).find((d) => d.id === e);
      if (!f) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const b = (this.model.pages ?? []).find((d) => d.id === o[1]);
      if (((b == null ? void 0 : b.buttons) ?? []).some((d) => d.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${f.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, r = a ? a[1] : t && (this.model.pages ?? []).some((f) => f.id === t) ? t : null;
    if (!r) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const c = a ? ((m = this.componentIn(r, a[2])) == null ? void 0 : m.node) ?? null : null, s = this.model.boundedContexts.flatMap((f) => f.useCases ?? []).find((f) => f.id === e);
    if (s) {
      (c == null ? void 0 : c.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: r, componentId: c.id, useCaseId: e, label: c.label ?? s.name }), this.emit("modux-notice", { message: `El botón lanza ${s.name}` })) : (this.command({ kind: "add-page-button", pageId: r, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${s.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((f) => f.id === e);
    if (p) {
      (c == null ? void 0 : c.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: r, componentId: c.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: r, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const y = (this.model.modelMappings ?? []).find((f) => f.id === e);
    if (y && (c == null ? void 0 : c.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: r, componentId: c.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${y.name}` });
      return;
    }
    const h = this.model.boundedContexts.flatMap((f) => (f.queryServices ?? []).flatMap((b) => (b.operations ?? []).map((d) => ({ op: d, qs: b })))).find(({ op: f }) => f.id === e);
    if (h) {
      (c == null ? void 0 : c.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: r,
        componentId: c.id,
        queryOperationId: h.op.id,
        queryServiceId: h.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: r, queryServiceId: h.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${h.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, n, i, o, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, n, a);
      return;
    }
    if (n && n !== e) {
      this.applyConnection(e, n, i, o);
      return;
    }
    const r = this._view, c = this.sceneFor(r), s = c.nodes.find((m) => m.id === e);
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
    const p = this.viewLayout(r), y = s.parentId ? c.nodes.find((m) => m.id === s.parentId) : void 0, h = y ? { x: Math.round(t.x - y.x), y: Math.round(t.y - y.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: r, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(r, { ...p, nodes: { ...p.nodes, [e]: h } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Lo.filter(
      (i) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(i.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(i.type) : this._view === "design" ? i.type === "page" || i.type === "custom-code" || i.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(i.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(i.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(i.type) && !i.type.startsWith("cmp:")) && (!e || i.label.toLowerCase().includes(e))
    ), n = this._view === "workflows" ? "new" : this._paletteTab;
    return A`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(i) => this._paletteFilter = i.target.value}
          />
          ${n === "new" ? A`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${ep.map((i) => {
      const o = t.filter((a) => a.group === i);
      return o.length ? A`
                        <div class="palette-g">${i}</div>
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
      (i) => A`
                    <div class="palette-g">${i.label}</div>
                    ${i.items.map(
        (o) => A`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${i.color}">
                            ${At[i.symbol]}
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
                  ?data-active=${n === "new"}
                  title="Elementos nuevos para arrastrar al lienzo"
                  @click=${() => this._paletteTab = "new"}
                >
                  Nuevos
                </button>
                <button
                  class="palette-vtab"
                  ?data-active=${n === "catalog"}
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
    var t, n, i, o, a, r, c;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const s = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!s) return;
        this.command({ kind: "add-aggregate", id: `agg-${ae(e)}`, name: e, boundedContextId: s });
      } else if (this._view === "flows") {
        const s = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), p = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), y = this._newTriggerEvent.trim();
        if (!s || !p || !y) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ae(e)}`,
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
          id: `proc-${ae(e)}`,
          name: e,
          boundedContextId: s,
          triggerAggregateId: this._newTriggerAggId || ((c = (r = this.model.aggregates) == null ? void 0 : r[0]) == null ? void 0 : c.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), n = this.filteredModel(), i = e === "aggregates" ? os(n, t.nodes) : e === "flows" ? ms(n, t.nodes) : e === "processes" ? ji(n, t.nodes) : e === "workflows" ? _c(n, t.nodes) : e === "ui" ? Mc(n, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? Nc(n, t.nodes) : e === "mappings" ? Pc(n, t.nodes) : e === "eventstorming" ? gc(n, t.nodes) : Ja(
      n,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const o of i.nodes) {
        const a = this.diff[o.id] ?? this.diff[o.id.replace(/^(tgt:|flow:)/, "")];
        a && (o.diffKind = a);
      }
    return i;
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
    const n = t.nodes.filter((p) => !p.parentId), i = new Set(n.map((p) => p.id)), o = {
      nodes: n,
      edges: t.edges.filter((p) => i.has(p.sourceId) && i.has(p.targetId))
    }, r = await Rc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), c = this.viewLayout(e);
    this.pushUndoEntry([
      ...n.map((p) => ({
        kind: "move-node",
        view: e,
        id: p.id,
        pos: c.nodes[p.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(c.edges).map((p) => ({
        kind: "set-edge-points",
        view: e,
        id: p,
        points: c.edges[p]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: c.sizes }), await this.updateComplete, (s = this.renderRoot.querySelector("modux-canvas")) == null || s.fit();
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var o;
    const t = e.target, n = e.type === "change" && t instanceof HTMLSelectElement, i = e.type === "click" && !!t.closest("button");
    !n && !i || (o = this.renderRoot.querySelector("modux-canvas")) == null || o.focus();
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
        var n;
        return A`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((n = this.model.boundedContexts[0]) == null ? void 0 : n.id))}
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
        var n, i;
        return A`<option
                      value=${t.id}
                      ?selected=${t.id === (this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id))}
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
        var n;
        return A`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || ((n = this.model.boundedContexts[0]) == null ? void 0 : n.id))}
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
      var t, n;
      (t = this.renderRoot.querySelector("modux-canvas")) == null || t.fit(), (n = this.renderRoot.querySelector("modux-explorer")) == null || n.fit();
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
      const { sourceId: n, targetId: i, x: o, y: a } = t.detail, r = (c) => this.model.boundedContexts.some((s) => s.id === c);
      if (this._view === "context-map" && !this._activeJourneyId && r(n) && r(i)) {
        const c = this.model.relations.find(
          (s) => s.sourceId === n && s.targetId === i && s.declared
        );
        this._relationPicker = {
          sourceId: n,
          targetId: i,
          mode: c ? "edit" : "create",
          x: o ?? this.clientWidth / 2,
          y: a ?? 120
        };
        return;
      }
      this.applyConnection(n, i, o, a);
    }}
            @explorer-create-view=${(t) => {
      const n = /* @__PURE__ */ new Set([
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
      ]), i = [...new Set(
        t.detail.members.filter((a) => n.has(a.kind)).map((a) => a.id)
      )];
      if (!i.length) {
        this.emit("modux-notice", { message: "Despliega algo antes de crear la vista" });
        return;
      }
      const o = `view-${ae(t.detail.name)}`;
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: i }), this._activeViewId = o, this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${i.length} miembros)`
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
      ([t, n]) => A`
            <div class="help-row"><span class="help-keys">${t}</span><span>${n}</span></div>
          `
    )}
      </div>
    ` : "";
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((n) => n.id === this._activeViewId);
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">¿Eliminar, o solo quitar de la vista?</div>
        <button
          class="picker-item"
          @click=${() => {
      const n = this._deletePicker;
      this._deletePicker = null, this.command({
        kind: "remove-view-member",
        id: this._activeViewId,
        targetId: n.memberId
      });
    }}
        >
          <span class="abbr">👁</span>
          <span class="name">Quitar de la vista «${(t == null ? void 0 : t.name) ?? this._activeViewId}»</span>
        </button>
        <button
          class="picker-item"
          @click=${() => {
      const n = this._deletePicker;
      this._deletePicker = null, this.performDelete(n.elementType, n.id, n.kind);
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
    const n = (this.model.externalSystemDependencies ?? []).find(
      (i) => i.sourceId === t.sourceId && i.targetId === t.targetId
    );
    n && (n.type ?? "DEPENDS") === e || this.command({
      kind: "add-external-dependency",
      sourceId: t.sourceId,
      targetId: t.targetId,
      type: e
    });
  }
  renderExtDepPicker() {
    var i;
    const e = this._extDepPicker;
    if (!e) return "";
    const t = (i = (this.model.externalSystemDependencies ?? []).find(
      (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
    )) == null ? void 0 : i.type, n = [
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
        ${n.map(
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
        const n = `proj-${t.id}`;
        this.command({ kind: "add-project-reference", targetId: t.id, id: n }, !1);
        const i = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...i,
          nodes: { ...i.nodes, [n]: { x: Math.round(e.pos.x), y: Math.round(e.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-external-system", id: n },
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
        const n = e;
        this._wfStepPicker = null;
        const { id: i, name: o } = this.uniquePaletteName(
          n.stepType === "JOIN" ? "Join" : n.stepType === "SPLIT" ? "Split" : "Paso",
          "wfs-"
        );
        this.command(
          {
            kind: "add-workflow-step",
            workflowId: t.id,
            id: i,
            name: o,
            ...n.stepType ? { stepType: n.stepType } : {}
          },
          !1
        );
        const a = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...a,
          nodes: { ...a.nodes, [i]: { x: Math.round(n.pos.x), y: Math.round(n.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-workflow-step", workflowId: t.id, id: i },
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
  renderRelationPicker() {
    var n;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (n = this.model.relations.find(
      (i) => i.sourceId === e.sourceId && i.targetId === e.targetId
    )) == null ? void 0 : n.type : this._relationType;
    return A`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${ip.map(
      (i) => A`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${_i[i].abbr}</span>
              <span class="name">${_i[i].name}</span>
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
var rp = Object.defineProperty, dp = Object.getOwnPropertyDescriptor, ke = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? dp(t, n) : t, a = e.length - 1, r; a >= 0; a--)
    (r = e[a]) && (o = (i ? r(t, n, o) : r(o)) || o);
  return i && o && rp(t, n, o), o;
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
    var n;
    if (!this._model) return;
    if (this._writes > 0 || this._interacting) {
      this._pendingVersion = e;
      return;
    }
    this._workspace || this.loadWorkspace();
    const t = this._lastVersion !== null && e !== this._lastVersion;
    this._lastVersion = e, t && (await this.reload(), await this.refreshDiff(), (n = this.renderRoot.querySelector("modux-editor")) == null || n.clearHistory(), this.showToast(
      "El modelo ha cambiado fuera de este editor: recargado (historial de deshacer reiniciado)",
      "info"
    ));
  }
  async reload() {
    try {
      const [e, t, n] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/layout`),
        fetch(`${this.base}/version`)
      ]);
      if (!e.ok) throw new Error(`GET ${this.base}/model → ${e.status}`);
      this._model = await e.json(), this._layout = t.ok ? await t.json() : {}, n.ok && (this._lastVersion = (await n.json()).version), this._error = null;
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
    var n;
    if (!this._diffListOpen || !this._diff || (n = this._workspace) != null && n.system) return "";
    const e = [
      { kind: "ADDED", title: "Añadidos", mark: "＋", cls: "added" },
      { kind: "MODIFIED", title: "Modificados", mark: "～", cls: "modified" },
      { kind: "REMOVED", title: "Eliminados", mark: "－", cls: "removed" }
    ], t = (i) => ge.TYPE_LABELS[i] ?? i;
    return A`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: i, title: o, mark: a, cls: r }) => {
      const c = this._diff.changes.filter((s) => s.kind === i);
      return c.length ? A`
            <div class="diff-group">${o} (${c.length})</div>
            ${c.map(
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
      const n = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), i = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      n.model = e, i.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(n)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(i));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var o, a, r;
    const n = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var c;
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
        this._workspace = await s.json(), await this.reload(), await this.refreshDiff(), (c = this.renderRoot.querySelector("modux-editor")) == null || c.clearHistory();
      } catch (s) {
        this.showToast(String(s));
      }
    });
    const i = (a = this._workspace) == null ? void 0 : a.current;
    if (i && i !== n) {
      const c = ((r = this._workspace.solutions.find((s) => s.branch === i)) == null ? void 0 : r.name) ?? i.replace(/^solution\//, "");
      this.syncModelContext(
        i,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${c}`
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
      const n = await fetch(`${this.base}/solutions/merge-check`);
      if (!n.ok) {
        this.showToast(`No se pudo comprobar el merge (${n.status})`);
        return;
      }
      const i = await n.json();
      if (!((t = i.conflicts) != null && t.length)) {
        await this.solutionOp(e, { resolutions: {} }), this.showToast(
          e === "merge" ? "Solución mergeada al sistema: ahora es el nuevo as-is" : "Solución actualizada desde el sistema",
          "info"
        );
        return;
      }
      this._mergeFlow = { op: e, conflicts: i.conflicts, resolutions: {} };
    } catch (n) {
      this.showToast(String(n));
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
    const { content: t, fileName: n, apiId: i, homeExternalId: o, homeBoundedContextId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const r = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: n, apiId: i })
        });
        if (!r.ok) {
          let y = `El servidor rechazó el contrato (${r.status})`;
          try {
            const h = await r.json();
            h != null && h.message && (y = h.message);
          } catch {
          }
          this.showToast(y);
          return;
        }
        const { apiId: c } = await r.json(), s = o ? { kind: "set-api-publisher", id: c, targetId: o } : a ? { kind: "add-api-implementation", apiId: c, boundedContextId: a } : null;
        s && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(s)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${c}`, "info");
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
          let i = `El servidor rechazó el comando (${t.status})`;
          try {
            const o = await t.json();
            o != null && o.message && (i = o.message);
          } catch {
          }
          this.showToast(i);
          return;
        }
        const n = await fetch(`${this.base}/model`);
        n.ok && (this._model = await n.json()), await this.refreshDiff();
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
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((n) => n.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : A`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? A`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(n) => this._newTagName = n.target.value}
                      @keydown=${(n) => n.key === "Enter" && void this.createTag()}
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
      const n = (i) => this._diff.changes.filter((o) => o.kind === i).length;
      return A`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${n("ADDED")} ～${n("MODIFIED")} －${n("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? A`
                    <input
                      placeholder="Nombre de la solución…"
                      .value=${this._newSolutionName}
                      @input=${(n) => this._newSolutionName = n.target.value}
                      @keydown=${(n) => n.key === "Enter" && this.createSolution()}
                    />
                    <button @click=${this.createSolution}>Crear</button>
                    <button @click=${() => this._creatingSolution = !1}>Cancelar</button>
                  ` : ""}
              ${!this._workspace.system && !this._creatingSolution ? (() => {
      var i;
      const n = (i = this._workspace.solutions.find(
        (o) => o.branch === this._workspace.current
      )) == null ? void 0 : i.status;
      return A`
                      ${n === "EXPLORING" ? A`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${n === "PROPOSED" ? A`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${n === "APPROVED" ? A`<button
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
      (n) => A`
                  <div class="merge-row">
                    <span class="merge-el">${n.type} · ${n.name ?? n.id}</span>
                    <label title=${n.system ?? "(eliminado en el sistema)"}>
                      <input
                        type="radio"
                        name=${n.key}
                        .checked=${this._mergeFlow.resolutions[n.key] === "system"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [n.key]: "system" }
      }}
                      />
                      Sistema
                    </label>
                    <label title=${n.solution ?? "(eliminado en la solución)"}>
                      <input
                        type="radio"
                        name=${n.key}
                        .checked=${this._mergeFlow.resolutions[n.key] === "solution"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [n.key]: "solution" }
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
      (n) => !this._mergeFlow.resolutions[n.key]
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
      this._diff.changes.filter((n) => n.kind !== "REMOVED").map((n) => [n.id, n.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @modux-import-api=${this.onImportApi}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(n) => this.showToast(n.detail.message, n.detail.kind ?? "info")}
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
  lp as CONTAINER_HEADER,
  cp as CONTAINER_INSET,
  Ie as ModuxCanvas,
  J as ModuxEditor,
  ge as ModuxEditorConnected,
  os as aggregatesScene,
  mt as apiImplNodeId,
  ut as apiOpOccurrenceId,
  Rn as containerFit,
  Fa as containerMinSize,
  Ja as contextMapScene,
  Ga as flowCoherence,
  ms as flowsScene,
  gn as normalizeViewLayout,
  ji as processesScene,
  Ha as relationEdgeId,
  Gn as resolveOverlaps
};
