const Dc = 34, Lc = 10;
function Di(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let n = 0; n < e.length; n++)
      for (let r = n + 1; r < e.length; r++) {
        const l = e[n], p = e[r], g = i.get(l.id), y = i.get(p.id), m = y.x - g.x, h = y.y - g.y, d = (l.w + p.w) / 2 + t - Math.abs(m), u = (l.h + p.h) / 2 + t - Math.abs(h);
        if (!(d <= 0 || u <= 0))
          if (a = !0, d < u) {
            const f = (m >= 0 ? 1 : -1) * d / 2;
            g.x -= f, y.x += f;
          } else {
            const f = (h >= 0 ? 1 : -1) * u / 2;
            g.y -= f, y.y += f;
          }
      }
    if (!a) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = i.get(o.id);
    (Math.abs(a.x - o.x) > 0.5 || Math.abs(a.y - o.y) > 0.5) && s.set(o.id, a);
  }
  return s;
}
function wn(e, t = { w: 160, h: 90 }) {
  let i = t.w, s = t.h;
  for (const o of e)
    i = Math.max(i, 2 * (Math.abs(o.dx) + o.w / 2 + 10)), s = Math.max(
      s,
      2 * (34 + o.h / 2 - o.dy),
      // child's top edge below the header band
      2 * (10 + o.h / 2 + o.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: s };
}
function _i(e, t, i) {
  let s = t.w / 2, o = t.w / 2, a = t.h / 2, n = t.h / 2;
  for (const r of i)
    s = Math.max(s, -r.dx + r.w / 2 + 10), o = Math.max(o, r.dx + r.w / 2 + 10), a = Math.max(a, -r.dy + r.h / 2 + 34), n = Math.max(n, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (o - s) / 2,
    y: e.y + (n - a) / 2,
    w: s + o,
    h: a + n
  };
}
function ci(e) {
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
const xn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, kn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, _n = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ke = 168, Xe = 56;
function ct(e, t) {
  return `apiimpl:${e}@${t}`;
}
function lt(e, t) {
  return `apiop:${e}@${t}`;
}
const Ss = { compact: 0, coarse: 1, full: 2 };
function Cs(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", o = e ? s : t;
  return { form: o, collapsed: Ss[e ? t : s] > Ss[o] };
}
function ko(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: ct(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const _o = 34, $o = 14, $n = 14, xe = 108, be = 32, ms = 12, $i = 10, st = 2, Eo = st * xe + (st - 1) * ms + 2 * $o;
function En(e, t) {
  return `rel:${e}->${t}`;
}
function Sn(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function xt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const is = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Ei = {
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
}, Kt = {
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
function Si(e) {
  const t = Math.max(1, Math.ceil(e / st)), i = t * be + (t - 1) * $i;
  return { w: Eo, h: _o + i + $n };
}
function Et(e, t) {
  const i = e % st, s = Math.floor(e / st);
  return {
    x: -t.w / 2 + $o + i * (xe + ms) + xe / 2,
    y: -t.h / 2 + _o + s * (be + $i) + be / 2
  };
}
function So(e, t) {
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
function Cn(e, t, i, s, o, a, n = !1) {
  const r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...ko(e, t.id),
    ...So(e, t)
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: Ke, h: Xe }];
  if (n) {
    const l = new Map((e.apis ?? []).map((g) => [g.id, g])), p = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && l.has(g.apiId)).map((g) => {
      const y = l.get(g.apiId);
      return {
        id: ct(g.apiId, g.moduleId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((m) => ({
          id: lt(m.id, t.id),
          name: m.name
        }))
      };
    });
    if (p.length > 0) {
      const g = r.filter((y) => y.kind !== "api-impl");
      return Co(i, s, p, g, o, a);
    }
  }
  return Vt(i, s, r, o, a);
}
function Co(e, t, i, s, o, a, n = /* @__PURE__ */ new Set()) {
  const r = a[t.id] ?? Si(i.length + s.length), l = i.map((h, d) => {
    const u = o[h.id] ?? Et(d, r), f = n.has(h.id) ? [] : h.ops, b = a[h.id] ?? Si(f.length), M = f.map((V, O) => o[V.id] ?? Et(O, b)), R = _i(
      { x: u.x, y: u.y },
      b,
      M.map((V) => ({ dx: V.x, dy: V.y, w: xe, h: be }))
    );
    return { a: h, off: u, ops: f, opOffs: M, fit: R };
  }), p = s.map(
    (h, d) => o[h.id] ?? Et(i.length + d, r)
  ), g = Di(
    [
      ...l.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, d) => ({
        id: h.id,
        x: p[d].x,
        y: p[d].y,
        w: xe,
        h: be
      }))
    ],
    24
  );
  for (const h of l) {
    const d = g.get(h.a.id);
    d && (h.off = { x: h.off.x + (d.x - h.fit.x), y: h.off.y + (d.y - h.fit.y) }, h.fit = { ...h.fit, x: d.x, y: d.y });
  }
  s.forEach((h, d) => {
    const u = g.get(h.id);
    u && (p[d] = { x: u.x, y: u.y });
  });
  const y = _i(e, r, [
    ...l.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: xe, h: be }))
  ]), m = [
    { ...t, x: y.x, y: y.y, w: y.w, h: y.h, container: !0 }
  ];
  for (const h of l)
    m.push({
      id: h.a.id,
      label: h.a.name,
      kind: h.a.kind,
      symbol: "interface",
      fill: h.a.fill,
      stroke: h.a.stroke,
      badge: h.a.badge,
      container: !0,
      collapsible: h.a.ops.length > 0 || n.has(h.a.id),
      collapsed: n.has(h.a.id),
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((d, u) => {
      m.push({
        id: d.id,
        label: d.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[u].x,
        y: e.y + h.off.y + h.opOffs[u].y,
        w: xe,
        h: be,
        tooltip: `${Kt[h.a.opKind]}: ${d.name}`
      });
    });
  return s.forEach((h, d) => {
    const u = Ei[h.kind];
    m.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[d].x,
      y: e.y + p[d].y,
      w: xe,
      h: be,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Kt[h.kind]} ${h.name}`
    });
  }), m;
}
const Mn = [
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
], Ms = 20, As = 28, Bt = 10, Dt = Eo + 2 * Bt;
function An(e, t, i, s, o, a) {
  const n = So(e, t), r = new Map(n.map((b) => [b.id, b])), l = (e.codeModules ?? []).filter((b) => b.moduleId === t.id), p = new Set(l.flatMap((b) => b.elementIds ?? [])), g = n.filter((b) => !p.has(b.id)), y = a[s.id] ?? Si(l.length + g.length), m = l.map((b, M) => {
    const R = (b.elementIds ?? []).map((x) => r.get(x)).filter((x) => !!x), V = Mn.map((x) => {
      const z = R.filter((L) => x.kinds.includes(L.kind)), w = Math.ceil(z.length / st), A = Ms + (w ? w * be + (w - 1) * $i + 8 : 8);
      return { layer: x, chips: z, rows: w, h: A };
    }), O = As + V.reduce((x, z) => x + z.h, 0) + Bt, T = o[b.id] ?? Et(M, y);
    return { cm: b, bands: V, boxH: O, off: T };
  }), h = g.map(
    (b, M) => o[b.id] ?? Et(m.length + M, y)
  ), d = Di(
    [
      ...m.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: Dt, h: b.boxH })),
      ...g.map((b, M) => ({ id: b.id, x: h[M].x, y: h[M].y, w: xe, h: be }))
    ],
    24
  );
  for (const b of m) {
    const M = d.get(b.cm.id);
    M && (b.off = { x: M.x, y: M.y });
  }
  g.forEach((b, M) => {
    const R = d.get(b.id);
    R && (h[M] = { x: R.x, y: R.y });
  });
  const u = _i(i, y, [
    ...m.map((b) => ({ dx: b.off.x, dy: b.off.y, w: Dt, h: b.boxH })),
    ...h.map((b) => ({ dx: b.x, dy: b.y, w: xe, h: be }))
  ]), f = [
    { ...s, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const b of m) {
    const M = i.x + b.off.x, R = i.y + b.off.y;
    f.push({
      id: b.cm.id,
      label: b.cm.name,
      kind: "code-module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      parentId: s.id,
      x: M,
      y: R,
      w: Dt,
      h: b.boxH,
      tooltip: `${b.cm.name} — módulo: empaqueta elementos del contexto en sus capas; arrastra el asa de un elemento hasta él para asignarlo`
    });
    let V = -b.boxH / 2 + As;
    for (const O of b.bands) {
      const T = `hexlayer:${b.cm.id}:${O.layer.key}`;
      f.push({
        id: T,
        label: O.layer.label,
        kind: "hex-layer",
        fill: O.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: b.cm.id,
        x: M,
        y: R + V + O.h / 2,
        w: Dt - 2 * Bt,
        h: O.h,
        tooltip: `Capa de ${O.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), O.chips.forEach((x, z) => {
        const w = z % st, A = Math.floor(z / st), L = x.policy ? is : Ei[x.kind];
        f.push({
          id: x.id,
          label: x.name,
          kind: x.kind,
          x: M - (Dt - 2 * Bt) / 2 + Bt + w * (xe + ms) + xe / 2,
          y: R + V + Ms + A * (be + $i) + be / 2,
          w: xe,
          h: be,
          symbol: L.symbol,
          fill: L.fill,
          stroke: L.stroke,
          parentId: T,
          tooltip: `${x.policy ? "Policy" : Kt[x.kind]} ${x.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), V += O.h;
    }
  }
  return g.forEach((b, M) => {
    const R = b.policy ? is : Ei[b.kind];
    f.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + h[M].x,
      y: i.y + h[M].y,
      w: xe,
      h: be,
      symbol: R.symbol,
      fill: R.fill,
      stroke: R.stroke,
      parentId: s.id,
      tooltip: `${b.policy ? "Policy" : Kt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), f;
}
function Vt(e, t, i, s, o) {
  const a = o[t.id] ?? Si(i.length), n = i.map((y, m) => s[y.id] ?? Et(m, a)), r = Di(
    i.map((y, m) => ({ id: y.id, x: n[m].x, y: n[m].y, w: xe, h: be })),
    10
  );
  i.forEach((y, m) => {
    const h = r.get(y.id);
    h && (n[m] = { x: h.x, y: h.y });
  });
  const l = _i(
    e,
    a,
    n.map((y) => ({ dx: y.x, dy: y.y, w: xe, h: be }))
  ), p = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, g = i.map((y, m) => {
    const h = n[m], d = y.policy ? is : Ei[y.kind];
    return {
      id: y.id,
      label: y.name,
      kind: y.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: xe,
      h: be,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${y.policy ? "Policy" : Kt[y.kind]} ${y.name}`
    };
  });
  return [p, ...g];
}
function Pn(e, t, i = "contexts", s = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", n = o, r = i !== "contexts", l = i === "operations", p = new Set(e.externalSystems.map((c) => c.id)), g = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), y = new Set(g.map((c) => c.id)), m = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), h = new Set(m.map((c) => c.id)), d = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !y.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !h.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...(e.etlFlows ?? []).filter((c) => !c.ownerModuleId).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(e.identityProviders ?? []).map((c) => ({
      ref: c,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], u = d.flatMap((c, N) => {
    const G = t[c.ref.id] ?? xt(N, d.length);
    if ("idp" in c && c.idp) {
      const X = c.ref, le = !!X.publishedByExternalSystemId;
      return [{
        id: X.id,
        label: X.name,
        kind: "identity-provider",
        symbol: "key",
        fill: le ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: le,
        badge: X.type ?? "IDP",
        tooltip: `${X.name} — emite las identidades que el sistema confía${le ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: G.x,
        y: G.y,
        w: Ke,
        h: Xe
      }];
    }
    if ("etl" in c && c.etl) {
      const X = c.ref;
      return [{
        id: X.id,
        label: X.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${X.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: G.x,
        y: G.y,
        w: Ke,
        h: Xe
      }];
    }
    if ("workflow" in c && c.workflow) {
      const X = c.ref;
      return [{
        id: X.id,
        label: X.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${X.name} — workflow${X.triggerEvent ? ` · arranca con ${X.triggerEvent}` : ""}`,
        x: G.x,
        y: G.y,
        w: Ke,
        h: Xe
      }];
    }
    if (c.proxy) {
      const X = c.ref, le = {
        id: X.id,
        label: X.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${X.name} — proxy/cache de una API, consumible como ella`
      };
      if (l && X.targetApiId) {
        const Ge = (e.apis ?? []).find((wt) => wt.id === X.targetApiId), je = (Ge == null ? void 0 : Ge.operations) ?? [];
        if (je.length > 0)
          return Vt(
            G,
            le,
            je.map((wt) => ({
              id: lt(wt.id, X.id),
              name: wt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...le, x: G.x, y: G.y, w: Ke, h: Xe }];
    }
    if (c.api) {
      const X = c.ref, le = {
        id: X.id,
        label: X.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${X.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(X.id) ? !r : r) && X.operations.length > 0 ? Vt(
        G,
        { ...le, collapsible: !0, collapsed: !1 },
        X.operations.map(
          (je) => ({ id: je.id, name: je.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...le,
        collapsible: X.operations.length > 0,
        collapsed: X.operations.length > 0,
        x: G.x,
        y: G.y,
        w: Ke,
        h: Xe
      }];
    }
    if (c.external) {
      const X = c.ref, le = {
        id: X.id,
        label: X.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: X.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: X.referencedRepositoryId ? `${X.name} — otro proyecto modux (repositorio ${X.referencedRepositoryId}), referenciado del catálogo` : `${X.name} (sistema externo)`
      }, Ge = g.filter((me) => me.publishedByExternalSystemId === X.id), je = m.filter((me) => me.publishedByExternalSystemId === X.id), wt = je.map(
        (me) => ({ id: me.id, name: me.name, kind: "proxy-api" })
      ), Fi = [
        ...(X.useCases ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "external-use-case" })
        ),
        ...(X.tables ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "external-table" })
        ),
        ...(X.mcpServers ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "mcp-server" })
        )
      ], Bi = Ge.length > 0 || je.length > 0, Vi = Bi || Fi.length > 0, { form: di, collapsed: Wi } = Cs(
        o.has(X.id),
        r ? "full" : Bi ? "coarse" : "compact",
        Fi.length > 0 || l && Bi
      ), $s = [
        ...wt,
        ...di === "full" ? Fi : []
      ], Hi = l && di === "full" ? je.filter((me) => {
        const Nt = me.targetApiId ? (e.apis ?? []).find(($e) => $e.id === me.targetApiId) : void 0;
        return ((Nt == null ? void 0 : Nt.operations) ?? []).length > 0;
      }) : [];
      if (l && di === "full" && (Ge.length > 0 || Hi.length > 0)) {
        const me = [
          ...Ge.map(($e) => ({
            id: $e.id,
            name: $e.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${$e.name} — API publicada por ${X.name}`,
            opKind: "api-operation",
            ops: ($e.operations ?? []).map((Rt) => ({ id: Rt.id, name: Rt.name }))
          })),
          ...Hi.map(($e) => {
            const Rt = (e.apis ?? []).find((li) => li.id === $e.targetApiId);
            return {
              id: $e.id,
              name: $e.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${$e.name} — proxy/cache de ${Rt.name}`,
              opKind: "api-op-occurrence",
              ops: (Rt.operations ?? []).map((li) => ({
                id: lt(li.id, $e.id),
                name: li.name
              }))
            };
          })
        ], Nt = new Set(Hi.map(($e) => $e.id));
        return Co(
          G,
          { ...le, collapsible: !0, collapsed: Wi },
          me,
          $s.filter(($e) => !Nt.has($e.id)),
          t,
          s,
          n
        );
      }
      const Es = di === "compact" ? [] : [
        ...Ge.map((me) => ({ id: me.id, name: me.name, kind: "api" })),
        ...$s
      ];
      return Es.length > 0 ? Vt(
        G,
        { ...le, collapsible: Vi, collapsed: Wi },
        Es,
        t,
        s
      ) : [{
        ...le,
        collapsible: Vi,
        collapsed: Vi && Wi,
        x: G.x,
        y: G.y,
        w: Ke,
        h: Xe
      }];
    }
    const ee = c.ref, Z = ee.subdomainType ?? "GENERIC", pe = {
      id: ee.id,
      label: ee.name,
      kind: "module",
      symbol: "component",
      fill: xn[Z],
      stroke: "#94a3b8",
      badge: Z,
      tooltip: `${ee.name} — subdominio ${Z}`
    }, Le = ko(e, ee.id), Tt = (e.aggregates ?? []).some((X) => X.moduleId === ee.id) || (ee.useCases ?? []).length > 0 || (ee.domainEvents ?? []).length > 0 || (ee.applicationEvents ?? []).length > 0 || (ee.readModels ?? []).length > 0 || (ee.domainServices ?? []).length > 0 || (ee.queryServices ?? []).length > 0 || (ee.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((X) => X.ownerModuleId === ee.id) || (e.notifications ?? []).some((X) => X.ownerModuleId === ee.id) || (e.documents ?? []).some((X) => X.ownerModuleId === ee.id), nt = Tt || Le.length > 0, { form: Ot, collapsed: bt } = Cs(
      o.has(ee.id),
      r ? "full" : Le.length > 0 ? "coarse" : "compact",
      Tt
    );
    return a ? An(
      e,
      ee,
      G,
      { ...pe, collapsible: !1, collapsed: !1 },
      t,
      s
    ) : Ot === "full" && nt ? Cn(
      e,
      ee,
      G,
      { ...pe, collapsible: !0, collapsed: bt },
      t,
      s,
      l
    ) : Ot === "coarse" && Le.length > 0 ? Vt(
      G,
      { ...pe, collapsible: nt, collapsed: bt },
      Le,
      t,
      s
    ) : [{
      ...pe,
      collapsible: nt,
      collapsed: nt && bt,
      x: G.x,
      y: G.y,
      w: Ke,
      h: Xe
    }];
  }), f = d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, N) => {
    const G = t[c.id] ?? xt(d.length + N, f);
    u.push({
      id: c.id,
      label: c.name,
      x: G.x,
      y: G.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, N) => {
    const G = t[c.id] ?? xt(d.length + (e.actors ?? []).length + N, f);
    u.push({
      id: c.id,
      label: c.name,
      x: G.x,
      y: G.y,
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
  }), (e.mcpGateways ?? []).forEach((c, N) => {
    const G = t[c.id] ?? xt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + N,
      f
    );
    u.push({
      id: c.id,
      label: c.name,
      x: G.x,
      y: G.y,
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
  const b = [];
  (e.rags ?? []).forEach((c, N) => {
    const G = t[c.id] ?? xt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + N,
      f
    );
    u.push({
      id: c.id,
      label: c.name,
      x: G.x,
      y: G.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((ee, Z) => {
      const pe = `ragcs:${c.id}:${ee.uri}`, Le = t[pe] ?? { x: G.x + 170, y: G.y - 30 + Z * 44 };
      u.push({
        id: pe,
        label: ee.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Le.x,
        y: Le.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: ee.type,
        tooltip: `${ee.type}: ${ee.uri}`
      }), b.push({
        id: `ragcse:${c.id}:${ee.uri}`,
        sourceId: pe,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), a && (e.services ?? []).forEach((c, N) => {
    const G = t[c.id] ?? xt(d.length + N, d.length + (e.services ?? []).length);
    u.push({
      id: c.id,
      label: c.name,
      kind: "service",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#334155",
      badge: "SERVICIO",
      tooltip: `${c.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
      x: G.x,
      y: G.y,
      w: Ke,
      h: Xe
    });
  }), u.sort((c, N) => (c.parentId ? 1 : 0) - (N.parentId ? 1 : 0));
  const M = e.relations.map((c) => ({
    id: En(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? kn[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), R = e.flows.map((c) => {
    var Le, Tt, nt, Ot, bt, X;
    const N = Sn(e, c), G = r ? e.modules.find((le) => le.id === c.sourceId) : void 0, ee = ((Le = G == null ? void 0 : G.domainEvents) == null ? void 0 : Le.find((le) => le.name === c.triggerEvent)) ?? ((Tt = G == null ? void 0 : G.applicationEvents) == null ? void 0 : Tt.find((le) => le.name === c.triggerEvent)), Z = r && c.readModelName ? (Ot = (nt = e.modules.find((le) => le.id === c.targetId)) == null ? void 0 : nt.readModels) == null ? void 0 : Ot.find((le) => le.name === c.readModelName) : void 0, pe = r && c.targetUseCaseId ? (X = (bt = e.modules.find((le) => le.id === c.targetId)) == null ? void 0 : bt.useCases) == null ? void 0 : X.find((le) => le.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (ee == null ? void 0 : ee.id) ?? c.sourceId,
      targetId: (pe == null ? void 0 : pe.id) ?? (Z == null ? void 0 : Z.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: _n[N],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${N}`
    };
  }), V = new Map((e.apis ?? []).map((c) => [c.id, c])), O = new Set(e.modules.map((c) => c.id)), T = (e.apiImplementations ?? []).filter(
    (c) => V.has(c.apiId) && O.has(c.moduleId)
  ), x = new Set(u.map((c) => c.id)), z = a ? (e.services ?? []).flatMap(
    (c) => (c.codeModuleIds ?? []).filter((N) => x.has(N) && x.has(c.id)).map((N) => ({
      id: `deploy:${c.id}->${N}`,
      sourceId: c.id,
      targetId: N,
      kind: "deploys",
      color: "#334155",
      dashed: !0,
      arrow: !0,
      tooltip: `desplegado en ${c.name} — Supr lo desconecta`
    }))
  ) : [], w = r ? (e.emissions ?? []).filter((c) => x.has(c.sourceId) && x.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], A = r ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: N }) => N && c.readModelId).filter(({ p: c, source: N }) => x.has(N) && x.has(c.readModelId)).map(({ p: c, source: N }) => ({
    id: `proj:${c.id}`,
    sourceId: N,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], L = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((N) => {
      const G = r && N.targetUseCaseId && x.has(N.targetUseCaseId) ? N.targetUseCaseId : N.targetModuleId && x.has(N.targetModuleId) ? N.targetModuleId : (N.targetUseCaseId && !r, null);
      if (!G) return [];
      const ee = r && x.has(N.id) ? N.id : c.id;
      return x.has(ee) ? [
        {
          id: `apiwire:${N.id}`,
          sourceId: ee,
          targetId: G,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${N.name} la implementa ${G}`
        }
      ] : [];
    })
  ), q = r ? (e.useCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], H = [
    ...e.modules.filter((c) => c.identityProviderId && x.has(c.id) && x.has(c.identityProviderId)).map((c) => ({
      id: `idptrust:${c.id}`,
      sourceId: c.id,
      targetId: c.identityProviderId,
      kind: "idp-trust",
      color: "#ca8a04",
      label: "valida tokens de",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} valida los tokens emitidos por este IdP — Supr lo desconfía`
    })),
    ...(e.etlFlows ?? []).filter((c) => c.identityProviderId && x.has(c.identityProviderId)).flatMap((c) => {
      const N = x.has(c.id) ? c.id : c.ownerModuleId && x.has(c.ownerModuleId) ? c.ownerModuleId : null;
      return N ? [{
        id: `idpsvc:${c.id}`,
        sourceId: N,
        targetId: c.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((c) => c.publishedByExternalSystemId && x.has(c.id) && x.has(c.publishedByExternalSystemId)).map((c) => ({
      id: `idpfed:${c.id}`,
      sourceId: c.publishedByExternalSystemId,
      targetId: c.id,
      kind: "idp-federation",
      color: "#ca8a04",
      label: "publica",
      dashed: !0,
      arrow: !0,
      tooltip: "IdP federado: lo publica este sistema externo — Supr lo vuelve propio"
    }))
  ], I = r ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && x.has(c.id) && x.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], E = r ? (e.aggregateCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], v = r ? (e.queryCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], k = r ? (e.actorUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], $ = (e.actorExternalDependencies ?? []).filter((c) => x.has(c.actorId) && x.has(c.externalSystemId)).map((c) => ({
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
  ]), P = (c) => x.has(c) ? c : _.get(c) ?? c, C = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: P(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => x.has(c.sourceId) && x.has(c.targetId) && c.sourceId !== c.targetId
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
  ], D = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const N of c.useCases ?? []) D.set(N.id, c.id);
    for (const N of c.domainEvents ?? []) D.set(N.id, c.id);
    for (const N of c.applicationEvents ?? []) D.set(N.id, c.id);
    for (const N of c.queryServices ?? []) D.set(N.id, c.id);
  }
  const B = (c) => x.has(c) ? c : D.get(c) ?? c, Y = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const N of c.domainEvents ?? []) Y.set(N.name, N.id);
    for (const N of c.applicationEvents ?? []) Y.set(N.name, N.id);
  }
  const re = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((N) => N.targetUseCaseId).map((N) => ({ sourceId: c.id, targetId: B(N.targetUseCaseId) }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], ue = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && Y.has(c.triggerEvent)).map((c) => ({
        sourceId: B(Y.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], F = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const N of c.tables ?? []) F.set(N.id, c.id);
  const j = (e.notifications ?? []).flatMap((c) => {
    var ee;
    const N = x.has(c.id) ? c.id : c.ownerModuleId && x.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!N) return [];
    const G = [];
    if (c.eventId) {
      const Z = x.has(c.eventId) ? c.eventId : D.get(c.eventId);
      Z && x.has(Z) && Z !== N && G.push({
        id: `notif:${c.id}`,
        sourceId: Z,
        targetId: N,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const Z of c.recipientRoleIds ?? [])
      x.has(Z) && G.push({
        id: `notifto:${c.id}:${Z}`,
        sourceId: N,
        targetId: Z,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((ee = (c.channels ?? [])[0]) == null ? void 0 : ee.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} avisa a este rol — Supr lo quita`
      });
    return G;
  }), de = (e.documents ?? []).flatMap((c) => {
    const N = x.has(c.id) ? c.id : c.ownerModuleId && x.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!N || !c.queryServiceId) return [];
    const G = x.has(c.queryServiceId) ? c.queryServiceId : D.get(c.queryServiceId);
    return !G || !x.has(G) || G === N ? [] : [{
      id: `docq:${c.id}`,
      sourceId: G,
      targetId: N,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), fe = (e.etlFlows ?? []).flatMap(
    (c) => (c.steps ?? []).flatMap((N) => {
      const G = x.has(c.id) ? c.id : c.ownerModuleId && x.has(c.ownerModuleId) ? c.ownerModuleId : null;
      if (!G) return [];
      const ee = N.externalTableId ?? N.operationId ?? N.apiId ?? N.eventId;
      if (!ee) return [];
      let Z = ee;
      if (!x.has(Z) && N.operationId && N.apiId && (Z = N.apiId), !x.has(Z) && N.externalTableId && (Z = F.get(N.externalTableId) ?? Z), x.has(Z) || (Z = P(Z)), x.has(Z) || (Z = D.get(ee) ?? Z), !x.has(Z) || Z === G) return [];
      const pe = N.type.startsWith("SOURCE");
      return [{
        id: `etl:${c.id}:${N.id}`,
        sourceId: pe ? Z : G,
        targetId: pe ? G : Z,
        kind: pe ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: N.type === "SOURCE_PULL" ? "pull" : N.type === "SOURCE_CONSUMER" ? "consume" : N.type === "WRITE_API" ? "api" : N.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: pe ? `${c.name} lee de aquí (${N.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${c.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), ze = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((N) => ({
          sourceId: x.has(N) ? N : F.get(N) ?? N,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], ke = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((N) => ({
          sourceId: P(N),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], W = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((N) => ({ sourceId: N, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((N) => ({ sourceId: N, targetId: c.id, name: c.name }))
      ]).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], Q = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: P(c.apiId) })).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => [
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
  ], _e = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, Ae = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((N) => N.id !== c.id && _e(N) === c.triggerEvent).filter((N) => x.has(N.id) && x.has(c.id)).map((N) => ({
      id: `wfchain:${N.id}->${c.id}`,
      sourceId: N.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), De = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: P(c.id), targetId: P(c.targetApiId) })).filter(
        (c) => x.has(c.sourceId) && x.has(c.targetId) && c.sourceId !== c.targetId
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
  ], Ce = T.flatMap((c) => {
    const N = ct(c.apiId, c.moduleId);
    if (!x.has(N)) return [];
    const G = [];
    for (const ee of (e.proxyApis ?? []).filter((Z) => Z.targetApiId === c.apiId)) {
      const Z = P(ee.id);
      x.has(Z) && Z !== N && G.push({
        id: `pxr:${Z}->${N}`,
        sourceId: Z,
        targetId: N,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return G;
  }), et = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const N = (e.proxyApis ?? []).find((Z) => Z.id === c.proxyId);
    if (!(N != null && N.targetApiId)) return [];
    const G = lt(c.operationId, c.proxyId), ee = c.targetSiteId === N.targetApiId ? N.targetApiId : ct(N.targetApiId, c.targetSiteId);
    return !x.has(G) || !x.has(ee) ? [] : [{
      id: `oproute:${G}->${ee}`,
      sourceId: G,
      targetId: ee,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), ai = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!x.has(c.externalSystemId)) return null;
        const N = (e.apis ?? []).find(
          (pe) => pe.operations.some((Le) => Le.id === c.operationId)
        );
        if (!N) return null;
        const G = c.siteId === N.id, ee = G ? c.operationId : lt(c.operationId, c.siteId);
        let Z = x.has(ee) ? ee : null;
        if (!Z)
          if (G || (e.proxyApis ?? []).some((pe) => pe.id === c.siteId))
            Z = P(c.siteId);
          else {
            const pe = ct(N.id, c.siteId);
            Z = x.has(pe) ? pe : c.siteId;
          }
        return !Z || !x.has(Z) || Z === c.externalSystemId ? null : { u: c, target: Z };
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
  ], vt = r ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!x.has(c.useCaseId)) return [];
    const N = x.has(lt(c.operationId, c.moduleId)) ? lt(c.operationId, c.moduleId) : x.has(ct(c.apiId, c.moduleId)) ? ct(c.apiId, c.moduleId) : x.has(P(c.moduleId)) ? P(c.moduleId) : null;
    return N ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: N,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], ri = r ? (e.agentUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], dn = (e.agentRags ?? []).filter((c) => x.has(c.agentId) && x.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), ln = r ? (e.rags ?? []).filter((c) => x.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((N) => x.has(N)).map((N) => ({
      id: `ragsrc:${c.id}->${N}`,
      sourceId: c.id,
      targetId: N,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], cn = r ? (e.agentExternalUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], pn = r ? (e.agentMcpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], un = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((N) => x.has(c.id) && x.has(N)).map((N) => ({
      id: `gwx:${c.id}->${N}`,
      sourceId: c.id,
      targetId: N,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), mn = (e.agentGatewayUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), hn = r ? (e.agentApiOpUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], fn = r ? (e.agentQueryUses ?? []).filter((c) => x.has(c.agentId) && x.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], gn = (e.agentDelegations ?? []).filter((c) => x.has(c.agentId) && x.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), In = (e.actorAgentUses ?? []).filter((c) => x.has(c.actorId) && x.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), yn = r ? (e.agentTriggers ?? []).filter((c) => x.has(c.eventId) && x.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], vn = r ? (e.externalCalls ?? []).filter((c) => x.has(c.externalSystemId) && x.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], bn = r ? (e.externalUseCaseCalls ?? []).filter((c) => x.has(c.sourceId) && x.has(c.targetId)).map((c) => ({
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
    nodes: u,
    edges: [
      ...z,
      ...M,
      ...R,
      ...w,
      ...A,
      ...L,
      ...q,
      ...I,
      ...H,
      ...j,
      ...de,
      ...fe,
      ...E,
      ...v,
      ...k,
      ...$,
      ...C,
      ...De,
      ...Ce,
      ...et,
      ...ai,
      ...vt,
      ...re,
      ...ue,
      ...Ae,
      ...Q,
      ...ze,
      ...ke,
      ...W,
      ...ri,
      ...cn,
      ...pn,
      ...un,
      ...mn,
      ...hn,
      ...fn,
      ...gn,
      ...In,
      ...yn,
      ...dn,
      ...ln,
      ...b,
      ...vn,
      ...bn
    ]
  };
}
const Tn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, On = 176, Nn = 60, Rn = 140, Dn = 40;
function Ln(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((o, a) => {
    const n = 220 + a * 340;
    i.filter((l) => l.moduleId === o.id).forEach((l, p) => {
      const g = s.filter((m) => m.aggregateId === l.id).length, y = 140 + p * (170 + g * 60);
      t[l.id] = { x: n, y }, s.filter((m) => m.aggregateId === l.id).forEach((m, h) => {
        t[m.id] = { x: n + 60, y: y + 100 + h * 60 };
      });
    });
  }), i.filter((o) => !e.modules.some((a) => a.id === o.moduleId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function zn(e, t) {
  const i = Ln(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, o = new Map(e.modules.map((p) => [p.id, p])), a = (e.aggregates ?? []).map((p) => {
    const g = o.get(p.moduleId), y = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", m = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: m.x,
      y: m.y,
      w: On,
      h: Nn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Tn[y],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${y})` : ""}`
    };
  }), n = (e.entities ?? []).map((p) => {
    const g = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: Rn,
      h: Dn,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${p.name} (dentro del agregado)`
    };
  }), r = (e.entities ?? []).map((p) => ({
    id: `contains:${p.aggregateId}->${p.id}`,
    sourceId: p.aggregateId,
    targetId: p.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), l = (e.aggregateReferences ?? []).map((p, g) => ({
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
    nodes: [...a, ...n],
    edges: [...r, ...l]
  };
}
const Un = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, qn = 150, Fn = 44, Bn = 190, Vn = 56, Wn = 160, Hn = 48;
function Gn(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function jn(e, t) {
  const i = e.flows, s = [], o = [], a = /* @__PURE__ */ new Set(), n = (r) => {
    var l, p;
    return ((p = (l = e.aggregates) == null ? void 0 : l.find((g) => g.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const p = 120 + l * 130, g = Un[r.archetype] ?? "#475569", y = r.triggerAggregateId ?? r.sourceId;
    if (!a.has(y)) {
      a.add(y);
      const f = t[y] ?? { x: 160, y: p };
      s.push({
        id: y,
        label: r.triggerAggregateId ? n(r.triggerAggregateId) : y,
        x: f.x,
        y: f.y,
        w: qn,
        h: Fn,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const m = `flow:${r.id}`, h = t[m] ?? { x: 470, y: p };
    s.push({
      id: m,
      label: r.name,
      x: h.x,
      y: h.y,
      w: Bn,
      h: Vn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const d = Gn(e, r), u = `tgt:${d.id}`;
    if (!a.has(u)) {
      a.add(u);
      const f = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: d.label,
        x: f.x,
        y: f.y,
        w: Wn,
        h: Hn,
        kind: d.external ? "external-system" : "module",
        symbol: "component",
        fill: d.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: d.external,
        badge: d.external ? "EXTERNAL" : "MODULE"
      });
    }
    o.push({
      id: `fe:${r.id}:in`,
      sourceId: y,
      targetId: m,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${r.id}:out`,
      sourceId: m,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: o };
}
const Yn = 190, Kn = 56, Gi = 170, Xn = 52;
function Ps(e, t) {
  const i = [], s = [], o = (a) => {
    var n;
    return (n = e.modules.find((r) => r.id === a)) == null ? void 0 : n.name;
  };
  return (e.processes ?? []).forEach((a, n) => {
    const r = 140 + n * 240, l = t[a.id] ?? { x: 150, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: l.x,
      y: l.y,
      w: Yn,
      h: Kn,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerModuleId) ? ` — módulo ${o(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((g, y) => {
      const m = g.type === "HUMAN", h = t[g.id] ?? { x: 150 + (y + 1) * 240, y: r };
      if (i.push({
        id: g.id,
        label: g.name,
        x: h.x,
        y: h.y,
        w: Gi,
        h: Xn,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), s.push({
        id: `pe:${a.id}:${y}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: y === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const d = `comp:${g.id}`, u = t[d] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: d,
          label: g.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Gi,
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
          targetId: d,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = g.id;
    }), a.onCompletionEventName) {
      const g = `done:${a.id}`, y = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: r };
      i.push({
        id: g,
        label: a.onCompletionEventName,
        x: y.x,
        y: y.y,
        w: Gi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${a.id}`,
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
const vi = globalThis, hs = vi.ShadowRoot && (vi.ShadyCSS === void 0 || vi.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fs = Symbol(), Ts = /* @__PURE__ */ new WeakMap();
let Mo = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== fs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (hs && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Ts.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ts.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Qn = (e) => new Mo(typeof e == "string" ? e : e + "", void 0, fs), It = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Mo(i, e, fs);
}, Zn = (e, t) => {
  if (hs) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = vi.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Os = hs ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Qn(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jn, defineProperty: ea, getOwnPropertyDescriptor: ta, getOwnPropertyNames: ia, getOwnPropertySymbols: sa, getPrototypeOf: oa } = Object, ot = globalThis, Ns = ot.trustedTypes, na = Ns ? Ns.emptyScript : "", ji = ot.reactiveElementPolyfillSupport, Gt = (e, t) => e, Ci = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? na : null;
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
} }, gs = (e, t) => !Jn(e, t), Rs = { attribute: !0, type: String, converter: Ci, reflect: !1, useDefault: !1, hasChanged: gs };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _t = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Rs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && ea(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: a } = ta(this.prototype, t) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const r = o == null ? void 0 : o.call(this);
      a == null || a.call(this, n), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Rs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Gt("elementProperties"))) return;
    const t = oa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Gt("properties"))) {
      const i = this.properties, s = [...ia(i), ...sa(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Os(o));
    } else t !== void 0 && i.push(Os(t));
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
    return Zn(t, this.constructor.elementStyles), t;
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
    var a;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : Ci).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, n;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : Ci;
      this._$Em = o;
      const p = l.fromAttribute(i, r.type);
      this[o] = p ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, a) {
    var n;
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (a = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? gs)(a, i) || s.useDefault && s.reflect && a === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: o, wrapped: a }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? i ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, n] of o) {
        const { wrapped: r } = n, l = this[a];
        r !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, n, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((o) => {
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
    (i = this._$EO) == null || i.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
_t.elementStyles = [], _t.shadowRootOptions = { mode: "open" }, _t[Gt("elementProperties")] = /* @__PURE__ */ new Map(), _t[Gt("finalized")] = /* @__PURE__ */ new Map(), ji == null || ji({ ReactiveElement: _t }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = globalThis, Ds = (e) => e, Mi = jt.trustedTypes, Ls = Mi ? Mi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ao = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, Po = "?" + it, aa = `<${Po}>`, ft = document, Xt = () => ft.createComment(""), Qt = (e) => e === null || typeof e != "object" && typeof e != "function", Is = Array.isArray, ra = (e) => Is(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Yi = `[ 	
\f\r]`, Lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zs = /-->/g, Us = />/g, at = RegExp(`>|${Yi}(?:([^\\s"'>=/]+)(${Yi}*=${Yi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qs = /'/g, Fs = /"/g, To = /^(?:script|style|textarea|title)$/i, Oo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), S = Oo(1), te = Oo(2), Ct = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), Bs = /* @__PURE__ */ new WeakMap(), pt = ft.createTreeWalker(ft, 129);
function No(e, t) {
  if (!Is(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ls !== void 0 ? Ls.createHTML(t) : t;
}
const da = (e, t) => {
  const i = e.length - 1, s = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Lt;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let p, g, y = -1, m = 0;
    for (; m < l.length && (n.lastIndex = m, g = n.exec(l), g !== null); ) m = n.lastIndex, n === Lt ? g[1] === "!--" ? n = zs : g[1] !== void 0 ? n = Us : g[2] !== void 0 ? (To.test(g[2]) && (o = RegExp("</" + g[2], "g")), n = at) : g[3] !== void 0 && (n = at) : n === at ? g[0] === ">" ? (n = o ?? Lt, y = -1) : g[1] === void 0 ? y = -2 : (y = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? at : g[3] === '"' ? Fs : qs) : n === Fs || n === qs ? n = at : n === zs || n === Us ? n = Lt : (n = at, o = void 0);
    const h = n === at && e[r + 1].startsWith("/>") ? " " : "";
    a += n === Lt ? l + aa : y >= 0 ? (s.push(p), l.slice(0, y) + Ao + l.slice(y) + it + h) : l + it + (y === -2 ? r : h);
  }
  return [No(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Zt {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const r = t.length - 1, l = this.parts, [p, g] = da(t, i);
    if (this.el = Zt.createElement(p, s), pt.currentNode = this.el.content, i === 2 || i === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (o = pt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const y of o.getAttributeNames()) if (y.endsWith(Ao)) {
          const m = g[n++], h = o.getAttribute(y).split(it), d = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: d[2], strings: h, ctor: d[1] === "." ? ca : d[1] === "?" ? pa : d[1] === "@" ? ua : Li }), o.removeAttribute(y);
        } else y.startsWith(it) && (l.push({ type: 6, index: a }), o.removeAttribute(y));
        if (To.test(o.tagName)) {
          const y = o.textContent.split(it), m = y.length - 1;
          if (m > 0) {
            o.textContent = Mi ? Mi.emptyScript : "";
            for (let h = 0; h < m; h++) o.append(y[h], Xt()), pt.nextNode(), l.push({ type: 2, index: ++a });
            o.append(y[m], Xt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Po) l.push({ type: 2, index: a });
      else {
        let y = -1;
        for (; (y = o.data.indexOf(it, y + 1)) !== -1; ) l.push({ type: 7, index: a }), y += it.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const s = ft.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Mt(e, t, i = e, s) {
  var n, r;
  if (t === Ct) return t;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const a = Qt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (t = Mt(e, o._$AS(e, t.values), o, s)), t;
}
class la {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? ft).importNode(i, !0);
    pt.currentNode = o;
    let a = pt.nextNode(), n = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let p;
        l.type === 2 ? p = new si(a, a.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (p = new ma(a, this, t)), this._$AV.push(p), l = s[++r];
      }
      n !== (l == null ? void 0 : l.index) && (a = pt.nextNode(), n++);
    }
    return pt.currentNode = ft, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class si {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = oe, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = Mt(this, t, i), Qt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== Ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ra(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && Qt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ft.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Zt.createElement(No(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const n = new la(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Bs.get(t.strings);
    return i === void 0 && Bs.set(t.strings, i = new Zt(t)), i;
  }
  k(t) {
    Is(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const a of t) o === i.length ? i.push(s = new si(this.O(Xt()), this.O(Xt()), this, this.options)) : s = i[o], s._$AI(a), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = Ds(t).nextSibling;
      Ds(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Li {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, a) {
    this.type = 1, this._$AH = oe, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = oe;
  }
  _$AI(t, i = this, s, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = Mt(this, t, i, 0), n = !Qt(t) || t !== this._$AH && t !== Ct, n && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = a[0], l = 0; l < a.length - 1; l++) p = Mt(this, r[s + l], i, l), p === Ct && (p = this._$AH[l]), n || (n = !Qt(p) || p !== this._$AH[l]), p === oe ? t = oe : t !== oe && (t += (p ?? "") + a[l + 1]), this._$AH[l] = p;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === oe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ca extends Li {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === oe ? void 0 : t;
  }
}
class pa extends Li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== oe);
  }
}
class ua extends Li {
  constructor(t, i, s, o, a) {
    super(t, i, s, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Mt(this, t, i, 0) ?? oe) === Ct) return;
    const s = this._$AH, o = t === oe && s !== oe || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== oe && (s === oe || o);
    o && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ma {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Mt(this, t);
  }
}
const Ki = jt.litHtmlPolyfillSupport;
Ki == null || Ki(Zt, si), (jt.litHtmlVersions ?? (jt.litHtmlVersions = [])).push("3.3.3");
const ha = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new si(t.insertBefore(Xt(), a), a, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis;
class Fe extends _t {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ha(i, this.renderRoot, this.renderOptions);
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
    return Ct;
  }
}
var xo;
Fe._$litElement$ = !0, Fe.finalized = !0, (xo = mt.litElementHydrateSupport) == null || xo.call(mt, { LitElement: Fe });
const Xi = mt.litElementPolyfillSupport;
Xi == null || Xi({ LitElement: Fe });
(mt.litElementVersions ?? (mt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fa = { attribute: !0, type: String, converter: Ci, reflect: !1, hasChanged: gs }, ga = (e = fa, t, i) => {
  const { kind: s, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(n, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(r) {
      const l = this[n];
      t.call(this, r), this.requestUpdate(n, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ne(e) {
  return (t, i) => typeof i == "object" ? ga(e, t, i) : ((s, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return ne({ ...e, state: !0, attribute: !1 });
}
var ss = "http://www.w3.org/1999/xhtml";
const Vs = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ss,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function zi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Vs.hasOwnProperty(t) ? { space: Vs[t], local: e } : e;
}
function Ia(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === ss && t.documentElement.namespaceURI === ss ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function ya(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ro(e) {
  var t = zi(e);
  return (t.local ? ya : Ia)(t);
}
function va() {
}
function ys(e) {
  return e == null ? va : function() {
    return this.querySelector(e);
  };
}
function ba(e) {
  typeof e != "function" && (e = ys(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = new Array(n), l, p, g = 0; g < n; ++g)
      (l = a[g]) && (p = e.call(l, l.__data__, g, a)) && ("__data__" in l && (p.__data__ = l.__data__), r[g] = p);
  return new Ne(s, this._parents);
}
function wa(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function xa() {
  return [];
}
function Do(e) {
  return e == null ? xa : function() {
    return this.querySelectorAll(e);
  };
}
function ka(e) {
  return function() {
    return wa(e.apply(this, arguments));
  };
}
function _a(e) {
  typeof e == "function" ? e = ka(e) : e = Do(e);
  for (var t = this._groups, i = t.length, s = [], o = [], a = 0; a < i; ++a)
    for (var n = t[a], r = n.length, l, p = 0; p < r; ++p)
      (l = n[p]) && (s.push(e.call(l, l.__data__, p, n)), o.push(l));
  return new Ne(s, o);
}
function Lo(e) {
  return function() {
    return this.matches(e);
  };
}
function zo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var $a = Array.prototype.find;
function Ea(e) {
  return function() {
    return $a.call(this.children, e);
  };
}
function Sa() {
  return this.firstElementChild;
}
function Ca(e) {
  return this.select(e == null ? Sa : Ea(typeof e == "function" ? e : zo(e)));
}
var Ma = Array.prototype.filter;
function Aa() {
  return Array.from(this.children);
}
function Pa(e) {
  return function() {
    return Ma.call(this.children, e);
  };
}
function Ta(e) {
  return this.selectAll(e == null ? Aa : Pa(typeof e == "function" ? e : zo(e)));
}
function Oa(e) {
  typeof e != "function" && (e = Lo(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], l, p = 0; p < n; ++p)
      (l = a[p]) && e.call(l, l.__data__, p, a) && r.push(l);
  return new Ne(s, this._parents);
}
function Uo(e) {
  return new Array(e.length);
}
function Na() {
  return new Ne(this._enter || this._groups.map(Uo), this._parents);
}
function Ai(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ai.prototype = {
  constructor: Ai,
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
function Ra(e) {
  return function() {
    return e;
  };
}
function Da(e, t, i, s, o, a) {
  for (var n = 0, r, l = t.length, p = a.length; n < p; ++n)
    (r = t[n]) ? (r.__data__ = a[n], s[n] = r) : i[n] = new Ai(e, a[n]);
  for (; n < l; ++n)
    (r = t[n]) && (o[n] = r);
}
function La(e, t, i, s, o, a, n) {
  var r, l, p = /* @__PURE__ */ new Map(), g = t.length, y = a.length, m = new Array(g), h;
  for (r = 0; r < g; ++r)
    (l = t[r]) && (m[r] = h = n.call(l, l.__data__, r, t) + "", p.has(h) ? o[r] = l : p.set(h, l));
  for (r = 0; r < y; ++r)
    h = n.call(e, a[r], r, a) + "", (l = p.get(h)) ? (s[r] = l, l.__data__ = a[r], p.delete(h)) : i[r] = new Ai(e, a[r]);
  for (r = 0; r < g; ++r)
    (l = t[r]) && p.get(m[r]) === l && (o[r] = l);
}
function za(e) {
  return e.__data__;
}
function Ua(e, t) {
  if (!arguments.length) return Array.from(this, za);
  var i = t ? La : Da, s = this._parents, o = this._groups;
  typeof e != "function" && (e = Ra(e));
  for (var a = o.length, n = new Array(a), r = new Array(a), l = new Array(a), p = 0; p < a; ++p) {
    var g = s[p], y = o[p], m = y.length, h = qa(e.call(g, g && g.__data__, p, s)), d = h.length, u = r[p] = new Array(d), f = n[p] = new Array(d), b = l[p] = new Array(m);
    i(g, y, u, f, b, h, t);
    for (var M = 0, R = 0, V, O; M < d; ++M)
      if (V = u[M]) {
        for (M >= R && (R = M + 1); !(O = f[R]) && ++R < d; ) ;
        V._next = O || null;
      }
  }
  return n = new Ne(n, s), n._enter = r, n._exit = l, n;
}
function qa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Fa() {
  return new Ne(this._exit || this._groups.map(Uo), this._parents);
}
function Ba(e, t, i) {
  var s = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), s && o ? s.merge(o).order() : o;
}
function Va(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, o = i.length, a = s.length, n = Math.min(o, a), r = new Array(o), l = 0; l < n; ++l)
    for (var p = i[l], g = s[l], y = p.length, m = r[l] = new Array(y), h, d = 0; d < y; ++d)
      (h = p[d] || g[d]) && (m[d] = h);
  for (; l < o; ++l)
    r[l] = i[l];
  return new Ne(r, this._parents);
}
function Wa() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], o = s.length - 1, a = s[o], n; --o >= 0; )
      (n = s[o]) && (a && n.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(n, a), a = n);
  return this;
}
function Ha(e) {
  e || (e = Ga);
  function t(y, m) {
    return y && m ? e(y.__data__, m.__data__) : !y - !m;
  }
  for (var i = this._groups, s = i.length, o = new Array(s), a = 0; a < s; ++a) {
    for (var n = i[a], r = n.length, l = o[a] = new Array(r), p, g = 0; g < r; ++g)
      (p = n[g]) && (l[g] = p);
    l.sort(t);
  }
  return new Ne(o, this._parents).order();
}
function Ga(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ja() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ya() {
  return Array.from(this);
}
function Ka() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], o = 0, a = s.length; o < a; ++o) {
      var n = s[o];
      if (n) return n;
    }
  return null;
}
function Xa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Qa() {
  return !this.node();
}
function Za(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var o = t[i], a = 0, n = o.length, r; a < n; ++a)
      (r = o[a]) && e.call(r, r.__data__, a, o);
  return this;
}
function Ja(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function er(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function tr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ir(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function sr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function or(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function nr(e, t) {
  var i = zi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? er : Ja : typeof t == "function" ? i.local ? or : sr : i.local ? ir : tr)(i, t));
}
function qo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ar(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function dr(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function lr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? ar : typeof t == "function" ? dr : rr)(e, t, i ?? "")) : At(this.node(), e);
}
function At(e, t) {
  return e.style.getPropertyValue(t) || qo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function cr(e) {
  return function() {
    delete this[e];
  };
}
function pr(e, t) {
  return function() {
    this[e] = t;
  };
}
function ur(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function mr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? cr : typeof t == "function" ? ur : pr)(e, t)) : this.node()[e];
}
function Fo(e) {
  return e.trim().split(/^|\s+/);
}
function vs(e) {
  return e.classList || new Bo(e);
}
function Bo(e) {
  this._node = e, this._names = Fo(e.getAttribute("class") || "");
}
Bo.prototype = {
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
function Vo(e, t) {
  for (var i = vs(e), s = -1, o = t.length; ++s < o; ) i.add(t[s]);
}
function Wo(e, t) {
  for (var i = vs(e), s = -1, o = t.length; ++s < o; ) i.remove(t[s]);
}
function hr(e) {
  return function() {
    Vo(this, e);
  };
}
function fr(e) {
  return function() {
    Wo(this, e);
  };
}
function gr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Vo : Wo)(this, e);
  };
}
function Ir(e, t) {
  var i = Fo(e + "");
  if (arguments.length < 2) {
    for (var s = vs(this.node()), o = -1, a = i.length; ++o < a; ) if (!s.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? gr : t ? hr : fr)(i, t));
}
function yr() {
  this.textContent = "";
}
function vr(e) {
  return function() {
    this.textContent = e;
  };
}
function br(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function wr(e) {
  return arguments.length ? this.each(e == null ? yr : (typeof e == "function" ? br : vr)(e)) : this.node().textContent;
}
function xr() {
  this.innerHTML = "";
}
function kr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function _r(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function $r(e) {
  return arguments.length ? this.each(e == null ? xr : (typeof e == "function" ? _r : kr)(e)) : this.node().innerHTML;
}
function Er() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Sr() {
  return this.each(Er);
}
function Cr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mr() {
  return this.each(Cr);
}
function Ar(e) {
  var t = typeof e == "function" ? e : Ro(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Pr() {
  return null;
}
function Tr(e, t) {
  var i = typeof e == "function" ? e : Ro(e), s = t == null ? Pr : typeof t == "function" ? t : ys(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Or() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Nr() {
  return this.each(Or);
}
function Rr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Dr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Lr(e) {
  return this.select(e ? Dr : Rr);
}
function zr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Ur(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function qr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Fr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++s] = a;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Br(e, t, i) {
  return function() {
    var s = this.__on, o, a = Ur(t);
    if (s) {
      for (var n = 0, r = s.length; n < r; ++n)
        if ((o = s[n]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), o = { type: e.type, name: e.name, value: t, listener: a, options: i }, s ? s.push(o) : this.__on = [o];
  };
}
function Vr(e, t, i) {
  var s = qr(e + ""), o, a = s.length, n;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, p = r.length, g; l < p; ++l)
        for (o = 0, g = r[l]; o < a; ++o)
          if ((n = s[o]).type === g.type && n.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Br : Fr, o = 0; o < a; ++o) this.each(r(s[o], t, i));
  return this;
}
function Ho(e, t, i) {
  var s = qo(e), o = s.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = s.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function Wr(e, t) {
  return function() {
    return Ho(this, e, t);
  };
}
function Hr(e, t) {
  return function() {
    return Ho(this, e, t.apply(this, arguments));
  };
}
function Gr(e, t) {
  return this.each((typeof t == "function" ? Hr : Wr)(e, t));
}
function* jr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], o = 0, a = s.length, n; o < a; ++o)
      (n = s[o]) && (yield n);
}
var Go = [null];
function Ne(e, t) {
  this._groups = e, this._parents = t;
}
function oi() {
  return new Ne([[document.documentElement]], Go);
}
function Yr() {
  return this;
}
Ne.prototype = oi.prototype = {
  constructor: Ne,
  select: ba,
  selectAll: _a,
  selectChild: Ca,
  selectChildren: Ta,
  filter: Oa,
  data: Ua,
  enter: Na,
  exit: Fa,
  join: Ba,
  merge: Va,
  selection: Yr,
  order: Wa,
  sort: Ha,
  call: ja,
  nodes: Ya,
  node: Ka,
  size: Xa,
  empty: Qa,
  each: Za,
  attr: nr,
  style: lr,
  property: mr,
  classed: Ir,
  text: wr,
  html: $r,
  raise: Sr,
  lower: Mr,
  append: Ar,
  insert: Tr,
  remove: Nr,
  clone: Lr,
  datum: zr,
  on: Vr,
  dispatch: Gr,
  [Symbol.iterator]: jr
};
function Ue(e) {
  return typeof e == "string" ? new Ne([[document.querySelector(e)]], [document.documentElement]) : new Ne([[e]], Go);
}
function Kr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function rt(e, t) {
  if (e = Kr(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var s = i.createSVGPoint();
      return s.x = e.clientX, s.y = e.clientY, s = s.matrixTransform(t.getScreenCTM().inverse()), [s.x, s.y];
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var Xr = { value: () => {
} };
function bs() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new bi(i);
}
function bi(e) {
  this._ = e;
}
function Qr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", o = i.indexOf(".");
    if (o >= 0 && (s = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
bi.prototype = bs.prototype = {
  constructor: bi,
  on: function(e, t) {
    var i = this._, s = Qr(e + "", i), o, a = -1, n = s.length;
    if (arguments.length < 2) {
      for (; ++a < n; ) if ((o = (e = s[a]).type) && (o = Zr(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < n; )
      if (o = (e = s[a]).type) i[o] = Ws(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = Ws(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new bi(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var i = new Array(o), s = 0, o, a; s < o; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], s = 0, o = a.length; s < o; ++s) a[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], o = 0, a = s.length; o < a; ++o) s[o].value.apply(t, i);
  }
};
function Zr(e, t) {
  for (var i = 0, s = e.length, o; i < s; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function Ws(e, t, i) {
  for (var s = 0, o = e.length; s < o; ++s)
    if (e[s].name === t) {
      e[s] = Xr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const os = { capture: !0, passive: !1 };
function ns(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jr(e) {
  var t = e.document.documentElement, i = Ue(e).on("dragstart.drag", ns, os);
  "onselectstart" in t ? i.on("selectstart.drag", ns, os) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ed(e, t) {
  var i = e.document.documentElement, s = Ue(e).on("dragstart.drag", null);
  t && (s.on("click.drag", ns, os), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ws(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function jo(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function ni() {
}
var Jt = 0.7, Pi = 1 / Jt, St = "\\s*([+-]?\\d+)\\s*", ei = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", We = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", td = /^#([0-9a-f]{3,8})$/, id = new RegExp(`^rgb\\(${St},${St},${St}\\)$`), sd = new RegExp(`^rgb\\(${We},${We},${We}\\)$`), od = new RegExp(`^rgba\\(${St},${St},${St},${ei}\\)$`), nd = new RegExp(`^rgba\\(${We},${We},${We},${ei}\\)$`), ad = new RegExp(`^hsl\\(${ei},${We},${We}\\)$`), rd = new RegExp(`^hsla\\(${ei},${We},${We},${ei}\\)$`), Hs = {
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
ws(ni, ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Gs,
  // Deprecated! Use color.formatHex.
  formatHex: Gs,
  formatHex8: dd,
  formatHsl: ld,
  formatRgb: js,
  toString: js
});
function Gs() {
  return this.rgb().formatHex();
}
function dd() {
  return this.rgb().formatHex8();
}
function ld() {
  return Yo(this).formatHsl();
}
function js() {
  return this.rgb().formatRgb();
}
function ti(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = td.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Ys(t) : i === 3 ? new Te(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? pi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? pi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = id.exec(e)) ? new Te(t[1], t[2], t[3], 1) : (t = sd.exec(e)) ? new Te(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = od.exec(e)) ? pi(t[1], t[2], t[3], t[4]) : (t = nd.exec(e)) ? pi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ad.exec(e)) ? Qs(t[1], t[2] / 100, t[3] / 100, 1) : (t = rd.exec(e)) ? Qs(t[1], t[2] / 100, t[3] / 100, t[4]) : Hs.hasOwnProperty(e) ? Ys(Hs[e]) : e === "transparent" ? new Te(NaN, NaN, NaN, 0) : null;
}
function Ys(e) {
  return new Te(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function pi(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new Te(e, t, i, s);
}
function cd(e) {
  return e instanceof ni || (e = ti(e)), e ? (e = e.rgb(), new Te(e.r, e.g, e.b, e.opacity)) : new Te();
}
function as(e, t, i, s) {
  return arguments.length === 1 ? cd(e) : new Te(e, t, i, s ?? 1);
}
function Te(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
ws(Te, as, jo(ni, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jt : Math.pow(Jt, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Te(ht(this.r), ht(this.g), ht(this.b), Ti(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ks,
  // Deprecated! Use color.formatHex.
  formatHex: Ks,
  formatHex8: pd,
  formatRgb: Xs,
  toString: Xs
}));
function Ks() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}`;
}
function pd() {
  return `#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Xs() {
  const e = Ti(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ht(this.r)}, ${ht(this.g)}, ${ht(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ti(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ht(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ut(e) {
  return e = ht(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Qs(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qe(e, t, i, s);
}
function Yo(e) {
  if (e instanceof qe) return new qe(e.h, e.s, e.l, e.opacity);
  if (e instanceof ni || (e = ti(e)), !e) return new qe();
  if (e instanceof qe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, o = Math.min(t, i, s), a = Math.max(t, i, s), n = NaN, r = a - o, l = (a + o) / 2;
  return r ? (t === a ? n = (i - s) / r + (i < s) * 6 : i === a ? n = (s - t) / r + 2 : n = (t - i) / r + 4, r /= l < 0.5 ? a + o : 2 - a - o, n *= 60) : r = l > 0 && l < 1 ? 0 : n, new qe(n, r, l, e.opacity);
}
function ud(e, t, i, s) {
  return arguments.length === 1 ? Yo(e) : new qe(e, t, i, s ?? 1);
}
function qe(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
ws(qe, ud, jo(ni, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jt : Math.pow(Jt, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - s;
    return new Te(
      Qi(e >= 240 ? e - 240 : e + 120, o, s),
      Qi(e, o, s),
      Qi(e < 120 ? e + 240 : e - 120, o, s),
      this.opacity
    );
  },
  clamp() {
    return new qe(Zs(this.h), ui(this.s), ui(this.l), Ti(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ti(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Zs(this.h)}, ${ui(this.s) * 100}%, ${ui(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Zs(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ui(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Qi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Ko = (e) => () => e;
function md(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function hd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function fd(e) {
  return (e = +e) == 1 ? Xo : function(t, i) {
    return i - t ? hd(t, i, e) : Ko(isNaN(t) ? i : t);
  };
}
function Xo(e, t) {
  var i = t - e;
  return i ? md(e, i) : Ko(isNaN(e) ? t : e);
}
const Js = (function e(t) {
  var i = fd(t);
  function s(o, a) {
    var n = i((o = as(o)).r, (a = as(a)).r), r = i(o.g, a.g), l = i(o.b, a.b), p = Xo(o.opacity, a.opacity);
    return function(g) {
      return o.r = n(g), o.g = r(g), o.b = l(g), o.opacity = p(g), o + "";
    };
  }
  return s.gamma = e, s;
})(1);
function tt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var rs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Zi = new RegExp(rs.source, "g");
function gd(e) {
  return function() {
    return e;
  };
}
function Id(e) {
  return function(t) {
    return e(t) + "";
  };
}
function yd(e, t) {
  var i = rs.lastIndex = Zi.lastIndex = 0, s, o, a, n = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (s = rs.exec(e)) && (o = Zi.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), r[n] ? r[n] += a : r[++n] = a), (s = s[0]) === (o = o[0]) ? r[n] ? r[n] += o : r[++n] = o : (r[++n] = null, l.push({ i: n, x: tt(s, o) })), i = Zi.lastIndex;
  return i < t.length && (a = t.slice(i), r[n] ? r[n] += a : r[++n] = a), r.length < 2 ? l[0] ? Id(l[0].x) : gd(t) : (t = l.length, function(p) {
    for (var g = 0, y; g < t; ++g) r[(y = l[g]).i] = y.x(p);
    return r.join("");
  });
}
var eo = 180 / Math.PI, ds = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Qo(e, t, i, s, o, a) {
  var n, r, l;
  return (n = Math.sqrt(e * e + t * t)) && (e /= n, t /= n), (l = e * i + t * s) && (i -= e * l, s -= t * l), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, l /= r), e * s < t * i && (e = -e, t = -t, l = -l, n = -n), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * eo,
    skewX: Math.atan(l) * eo,
    scaleX: n,
    scaleY: r
  };
}
var mi;
function vd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ds : Qo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function bd(e) {
  return e == null || (mi || (mi = document.createElementNS("http://www.w3.org/2000/svg", "g")), mi.setAttribute("transform", e), !(e = mi.transform.baseVal.consolidate())) ? ds : (e = e.matrix, Qo(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Zo(e, t, i, s) {
  function o(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, g, y, m, h, d) {
    if (p !== y || g !== m) {
      var u = h.push("translate(", null, t, null, i);
      d.push({ i: u - 4, x: tt(p, y) }, { i: u - 2, x: tt(g, m) });
    } else (y || m) && h.push("translate(" + y + t + m + i);
  }
  function n(p, g, y, m) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), m.push({ i: y.push(o(y) + "rotate(", null, s) - 2, x: tt(p, g) })) : g && y.push(o(y) + "rotate(" + g + s);
  }
  function r(p, g, y, m) {
    p !== g ? m.push({ i: y.push(o(y) + "skewX(", null, s) - 2, x: tt(p, g) }) : g && y.push(o(y) + "skewX(" + g + s);
  }
  function l(p, g, y, m, h, d) {
    if (p !== y || g !== m) {
      var u = h.push(o(h) + "scale(", null, ",", null, ")");
      d.push({ i: u - 4, x: tt(p, y) }, { i: u - 2, x: tt(g, m) });
    } else (y !== 1 || m !== 1) && h.push(o(h) + "scale(" + y + "," + m + ")");
  }
  return function(p, g) {
    var y = [], m = [];
    return p = e(p), g = e(g), a(p.translateX, p.translateY, g.translateX, g.translateY, y, m), n(p.rotate, g.rotate, y, m), r(p.skewX, g.skewX, y, m), l(p.scaleX, p.scaleY, g.scaleX, g.scaleY, y, m), p = g = null, function(h) {
      for (var d = -1, u = m.length, f; ++d < u; ) y[(f = m[d]).i] = f.x(h);
      return y.join("");
    };
  };
}
var wd = Zo(vd, "px, ", "px)", "deg)"), xd = Zo(bd, ", ", ")", ")"), kd = 1e-12;
function to(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function _d(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function $d(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ed = (function e(t, i, s) {
  function o(a, n) {
    var r = a[0], l = a[1], p = a[2], g = n[0], y = n[1], m = n[2], h = g - r, d = y - l, u = h * h + d * d, f, b;
    if (u < kd)
      b = Math.log(m / p) / t, f = function(x) {
        return [
          r + x * h,
          l + x * d,
          p * Math.exp(t * x * b)
        ];
      };
    else {
      var M = Math.sqrt(u), R = (m * m - p * p + s * u) / (2 * p * i * M), V = (m * m - p * p - s * u) / (2 * m * i * M), O = Math.log(Math.sqrt(R * R + 1) - R), T = Math.log(Math.sqrt(V * V + 1) - V);
      b = (T - O) / t, f = function(x) {
        var z = x * b, w = to(O), A = p / (i * M) * (w * $d(t * z + O) - _d(O));
        return [
          r + A * h,
          l + A * d,
          p * w / to(t * z + O)
        ];
      };
    }
    return f.duration = b * 1e3 * t / Math.SQRT2, f;
  }
  return o.rho = function(a) {
    var n = Math.max(1e-3, +a), r = n * n, l = r * r;
    return e(n, r, l);
  }, o;
})(Math.SQRT2, 2, 4);
var Pt = 0, Wt = 0, zt = 0, Jo = 1e3, Oi, Ht, Ni = 0, gt = 0, Ui = 0, ii = typeof performance == "object" && performance.now ? performance : Date, en = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function xs() {
  return gt || (en(Sd), gt = ii.now() + Ui);
}
function Sd() {
  gt = 0;
}
function Ri() {
  this._call = this._time = this._next = null;
}
Ri.prototype = tn.prototype = {
  constructor: Ri,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? xs() : +i) + (t == null ? 0 : +t), !this._next && Ht !== this && (Ht ? Ht._next = this : Oi = this, Ht = this), this._call = e, this._time = i, ls();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ls());
  }
};
function tn(e, t, i) {
  var s = new Ri();
  return s.restart(e, t, i), s;
}
function Cd() {
  xs(), ++Pt;
  for (var e = Oi, t; e; )
    (t = gt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Pt;
}
function io() {
  gt = (Ni = ii.now()) + Ui, Pt = Wt = 0;
  try {
    Cd();
  } finally {
    Pt = 0, Ad(), gt = 0;
  }
}
function Md() {
  var e = ii.now(), t = e - Ni;
  t > Jo && (Ui -= t, Ni = e);
}
function Ad() {
  for (var e, t = Oi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Oi = i);
  Ht = e, ls(s);
}
function ls(e) {
  if (!Pt) {
    Wt && (Wt = clearTimeout(Wt));
    var t = e - gt;
    t > 24 ? (e < 1 / 0 && (Wt = setTimeout(io, e - ii.now() - Ui)), zt && (zt = clearInterval(zt))) : (zt || (Ni = ii.now(), zt = setInterval(Md, Jo)), Pt = 1, en(io));
  }
}
function so(e, t, i) {
  var s = new Ri();
  return t = t == null ? 0 : +t, s.restart((o) => {
    s.stop(), e(o + t);
  }, t, i), s;
}
var Pd = bs("start", "end", "cancel", "interrupt"), Td = [], sn = 0, oo = 1, cs = 2, wi = 3, no = 4, ps = 5, xi = 6;
function qi(e, t, i, s, o, a) {
  var n = e.__transition;
  if (!n) e.__transition = {};
  else if (i in n) return;
  Od(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Pd,
    tween: Td,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: sn
  });
}
function ks(e, t) {
  var i = Be(e, t);
  if (i.state > sn) throw new Error("too late; already scheduled");
  return i;
}
function He(e, t) {
  var i = Be(e, t);
  if (i.state > wi) throw new Error("too late; already running");
  return i;
}
function Be(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Od(e, t, i) {
  var s = e.__transition, o;
  s[t] = i, i.timer = tn(a, 0, i.time);
  function a(p) {
    i.state = oo, i.timer.restart(n, i.delay, i.time), i.delay <= p && n(p - i.delay);
  }
  function n(p) {
    var g, y, m, h;
    if (i.state !== oo) return l();
    for (g in s)
      if (h = s[g], h.name === i.name) {
        if (h.state === wi) return so(n);
        h.state === no ? (h.state = xi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[g]) : +g < t && (h.state = xi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[g]);
      }
    if (so(function() {
      i.state === wi && (i.state = no, i.timer.restart(r, i.delay, i.time), r(p));
    }), i.state = cs, i.on.call("start", e, e.__data__, i.index, i.group), i.state === cs) {
      for (i.state = wi, o = new Array(m = i.tween.length), g = 0, y = -1; g < m; ++g)
        (h = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (o[++y] = h);
      o.length = y + 1;
    }
  }
  function r(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(l), i.state = ps, 1), y = -1, m = o.length; ++y < m; )
      o[y].call(e, g);
    i.state === ps && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = xi, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function ki(e, t) {
  var i = e.__transition, s, o, a = !0, n;
  if (i) {
    t = t == null ? null : t + "";
    for (n in i) {
      if ((s = i[n]).name !== t) {
        a = !1;
        continue;
      }
      o = s.state > cs && s.state < ps, s.state = xi, s.timer.stop(), s.on.call(o ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[n];
    }
    a && delete e.__transition;
  }
}
function Nd(e) {
  return this.each(function() {
    ki(this, e);
  });
}
function Rd(e, t) {
  var i, s;
  return function() {
    var o = He(this, e), a = o.tween;
    if (a !== i) {
      s = i = a;
      for (var n = 0, r = s.length; n < r; ++n)
        if (s[n].name === t) {
          s = s.slice(), s.splice(n, 1);
          break;
        }
    }
    o.tween = s;
  };
}
function Dd(e, t, i) {
  var s, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = He(this, e), n = a.tween;
    if (n !== s) {
      o = (s = n).slice();
      for (var r = { name: t, value: i }, l = 0, p = o.length; l < p; ++l)
        if (o[l].name === t) {
          o[l] = r;
          break;
        }
      l === p && o.push(r);
    }
    a.tween = o;
  };
}
function Ld(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Be(this.node(), i).tween, o = 0, a = s.length, n; o < a; ++o)
      if ((n = s[o]).name === e)
        return n.value;
    return null;
  }
  return this.each((t == null ? Rd : Dd)(i, e, t));
}
function _s(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var o = He(this, s);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Be(o, s).value[t];
  };
}
function on(e, t) {
  var i;
  return (typeof t == "number" ? tt : t instanceof ti ? Js : (i = ti(t)) ? (t = i, Js) : yd)(e, t);
}
function zd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ud(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function qd(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = this.getAttribute(e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Fd(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = this.getAttributeNS(e.space, e.local);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Bd(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (n = this.getAttribute(e), l = r + "", n === l ? null : n === s && l === o ? a : (o = l, a = t(s = n, r)));
  };
}
function Vd(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (n = this.getAttributeNS(e.space, e.local), l = r + "", n === l ? null : n === s && l === o ? a : (o = l, a = t(s = n, r)));
  };
}
function Wd(e, t) {
  var i = zi(e), s = i === "transform" ? xd : on;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Vd : Bd)(i, s, _s(this, "attr." + e, t)) : t == null ? (i.local ? Ud : zd)(i) : (i.local ? Fd : qd)(i, s, t));
}
function Hd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function Gd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function jd(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && Gd(e, a)), i;
  }
  return o._value = t, o;
}
function Yd(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && Hd(e, a)), i;
  }
  return o._value = t, o;
}
function Kd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = zi(e);
  return this.tween(i, (s.local ? jd : Yd)(s, t));
}
function Xd(e, t) {
  return function() {
    ks(this, e).delay = +t.apply(this, arguments);
  };
}
function Qd(e, t) {
  return t = +t, function() {
    ks(this, e).delay = t;
  };
}
function Zd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Xd : Qd)(t, e)) : Be(this.node(), t).delay;
}
function Jd(e, t) {
  return function() {
    He(this, e).duration = +t.apply(this, arguments);
  };
}
function el(e, t) {
  return t = +t, function() {
    He(this, e).duration = t;
  };
}
function tl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Jd : el)(t, e)) : Be(this.node(), t).duration;
}
function il(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    He(this, e).ease = t;
  };
}
function sl(e) {
  var t = this._id;
  return arguments.length ? this.each(il(t, e)) : Be(this.node(), t).ease;
}
function ol(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    He(this, e).ease = i;
  };
}
function nl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ol(this._id, e));
}
function al(e) {
  typeof e != "function" && (e = Lo(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], l, p = 0; p < n; ++p)
      (l = a[p]) && e.call(l, l.__data__, p, a) && r.push(l);
  return new Ze(s, this._parents, this._name, this._id);
}
function rl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, o = i.length, a = Math.min(s, o), n = new Array(s), r = 0; r < a; ++r)
    for (var l = t[r], p = i[r], g = l.length, y = n[r] = new Array(g), m, h = 0; h < g; ++h)
      (m = l[h] || p[h]) && (y[h] = m);
  for (; r < s; ++r)
    n[r] = t[r];
  return new Ze(n, this._parents, this._name, this._id);
}
function dl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function ll(e, t, i) {
  var s, o, a = dl(t) ? ks : He;
  return function() {
    var n = a(this, e), r = n.on;
    r !== s && (o = (s = r).copy()).on(t, i), n.on = o;
  };
}
function cl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Be(this.node(), i).on.on(e) : this.each(ll(i, e, t));
}
function pl(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function ul() {
  return this.on("end.remove", pl(this._id));
}
function ml(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ys(e));
  for (var s = this._groups, o = s.length, a = new Array(o), n = 0; n < o; ++n)
    for (var r = s[n], l = r.length, p = a[n] = new Array(l), g, y, m = 0; m < l; ++m)
      (g = r[m]) && (y = e.call(g, g.__data__, m, r)) && ("__data__" in g && (y.__data__ = g.__data__), p[m] = y, qi(p[m], t, i, m, p, Be(g, i)));
  return new Ze(a, this._parents, t, i);
}
function hl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Do(e));
  for (var s = this._groups, o = s.length, a = [], n = [], r = 0; r < o; ++r)
    for (var l = s[r], p = l.length, g, y = 0; y < p; ++y)
      if (g = l[y]) {
        for (var m = e.call(g, g.__data__, y, l), h, d = Be(g, i), u = 0, f = m.length; u < f; ++u)
          (h = m[u]) && qi(h, t, i, u, m, d);
        a.push(m), n.push(g);
      }
  return new Ze(a, n, t, i);
}
var fl = oi.prototype.constructor;
function gl() {
  return new fl(this._groups, this._parents);
}
function Il(e, t) {
  var i, s, o;
  return function() {
    var a = At(this, e), n = (this.style.removeProperty(e), At(this, e));
    return a === n ? null : a === i && n === s ? o : o = t(i = a, s = n);
  };
}
function nn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function yl(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = At(this, e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function vl(e, t, i) {
  var s, o, a;
  return function() {
    var n = At(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), At(this, e))), n === l ? null : n === s && l === o ? a : (o = l, a = t(s = n, r));
  };
}
function bl(e, t) {
  var i, s, o, a = "style." + t, n = "end." + a, r;
  return function() {
    var l = He(this, e), p = l.on, g = l.value[a] == null ? r || (r = nn(t)) : void 0;
    (p !== i || o !== g) && (s = (i = p).copy()).on(n, o = g), l.on = s;
  };
}
function wl(e, t, i) {
  var s = (e += "") == "transform" ? wd : on;
  return t == null ? this.styleTween(e, Il(e, s)).on("end.style." + e, nn(e)) : typeof t == "function" ? this.styleTween(e, vl(e, s, _s(this, "style." + e, t))).each(bl(this._id, e)) : this.styleTween(e, yl(e, s, t), i).on("end.style." + e, null);
}
function xl(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function kl(e, t, i) {
  var s, o;
  function a() {
    var n = t.apply(this, arguments);
    return n !== o && (s = (o = n) && xl(e, n, i)), s;
  }
  return a._value = t, a;
}
function _l(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, kl(e, t, i ?? ""));
}
function $l(e) {
  return function() {
    this.textContent = e;
  };
}
function El(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Sl(e) {
  return this.tween("text", typeof e == "function" ? El(_s(this, "text", e)) : $l(e == null ? "" : e + ""));
}
function Cl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ml(e) {
  var t, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && Cl(o)), t;
  }
  return s._value = e, s;
}
function Al(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ml(e));
}
function Pl() {
  for (var e = this._name, t = this._id, i = an(), s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, l, p = 0; p < r; ++p)
      if (l = n[p]) {
        var g = Be(l, t);
        qi(l, e, i, p, n, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ze(s, this._parents, e, i);
}
function Tl() {
  var e, t, i = this, s = i._id, o = i.size();
  return new Promise(function(a, n) {
    var r = { value: n }, l = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var p = He(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), p.on = t;
    }), o === 0 && a();
  });
}
var Ol = 0;
function Ze(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function an() {
  return ++Ol;
}
var Ye = oi.prototype;
Ze.prototype = {
  constructor: Ze,
  select: ml,
  selectAll: hl,
  selectChild: Ye.selectChild,
  selectChildren: Ye.selectChildren,
  filter: al,
  merge: rl,
  selection: gl,
  transition: Pl,
  call: Ye.call,
  nodes: Ye.nodes,
  node: Ye.node,
  size: Ye.size,
  empty: Ye.empty,
  each: Ye.each,
  on: cl,
  attr: Wd,
  attrTween: Kd,
  style: wl,
  styleTween: _l,
  text: Sl,
  textTween: Al,
  remove: ul,
  tween: Ld,
  delay: Zd,
  duration: tl,
  ease: sl,
  easeVarying: nl,
  end: Tl,
  [Symbol.iterator]: Ye[Symbol.iterator]
};
function Nl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Rl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Nl
};
function Dl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Ll(e) {
  var t, i;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = an(), (i = Rl).time = xs(), e = e == null ? null : e + "");
  for (var s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, l, p = 0; p < r; ++p)
      (l = n[p]) && qi(l, e, t, p, n, i || Dl(l, t));
  return new Ze(s, this._parents, e, t);
}
oi.prototype.interrupt = Nd;
oi.prototype.transition = Ll;
const hi = (e) => () => e;
function zl(e, {
  sourceEvent: t,
  target: i,
  transform: s,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: s, enumerable: !0, configurable: !0 },
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
var Yt = new Qe(1, 0, 0);
Qe.prototype;
function Ji(e) {
  e.stopImmediatePropagation();
}
function Ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ul(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ql() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ao() {
  return this.__zoom || Yt;
}
function Fl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Bl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Vl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], n = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o),
    n > a ? (a + n) / 2 : Math.min(0, a) || Math.max(0, n)
  );
}
function Wl() {
  var e = Ul, t = ql, i = Vl, s = Fl, o = Bl, a = [0, 1 / 0], n = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Ed, p = bs("start", "zoom", "end"), g, y, m, h = 500, d = 150, u = 0, f = 10;
  function b(I) {
    I.property("__zoom", ao).on("wheel.zoom", z, { passive: !1 }).on("mousedown.zoom", w).on("dblclick.zoom", A).filter(o).on("touchstart.zoom", L).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", H).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  b.transform = function(I, E, v, k) {
    var $ = I.selection ? I.selection() : I;
    $.property("__zoom", ao), I !== $ ? O(I, E, v, k) : $.interrupt().each(function() {
      T(this, arguments).event(k).start().zoom(null, typeof E == "function" ? E.apply(this, arguments) : E).end();
    });
  }, b.scaleBy = function(I, E, v, k) {
    b.scaleTo(I, function() {
      var $ = this.__zoom.k, _ = typeof E == "function" ? E.apply(this, arguments) : E;
      return $ * _;
    }, v, k);
  }, b.scaleTo = function(I, E, v, k) {
    b.transform(I, function() {
      var $ = t.apply(this, arguments), _ = this.__zoom, P = v == null ? V($) : typeof v == "function" ? v.apply(this, arguments) : v, C = _.invert(P), D = typeof E == "function" ? E.apply(this, arguments) : E;
      return i(R(M(_, D), P, C), $, n);
    }, v, k);
  }, b.translateBy = function(I, E, v, k) {
    b.transform(I, function() {
      return i(this.__zoom.translate(
        typeof E == "function" ? E.apply(this, arguments) : E,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), n);
    }, null, k);
  }, b.translateTo = function(I, E, v, k, $) {
    b.transform(I, function() {
      var _ = t.apply(this, arguments), P = this.__zoom, C = k == null ? V(_) : typeof k == "function" ? k.apply(this, arguments) : k;
      return i(Yt.translate(C[0], C[1]).scale(P.k).translate(
        typeof E == "function" ? -E.apply(this, arguments) : -E,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), _, n);
    }, k, $);
  };
  function M(I, E) {
    return E = Math.max(a[0], Math.min(a[1], E)), E === I.k ? I : new Qe(E, I.x, I.y);
  }
  function R(I, E, v) {
    var k = E[0] - v[0] * I.k, $ = E[1] - v[1] * I.k;
    return k === I.x && $ === I.y ? I : new Qe(I.k, k, $);
  }
  function V(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function O(I, E, v, k) {
    I.on("start.zoom", function() {
      T(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var $ = this, _ = arguments, P = T($, _).event(k), C = t.apply($, _), D = v == null ? V(C) : typeof v == "function" ? v.apply($, _) : v, B = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), Y = $.__zoom, re = typeof E == "function" ? E.apply($, _) : E, ue = l(Y.invert(D).concat(B / Y.k), re.invert(D).concat(B / re.k));
      return function(F) {
        if (F === 1) F = re;
        else {
          var j = ue(F), de = B / j[2];
          F = new Qe(de, D[0] - j[0] * de, D[1] - j[1] * de);
        }
        P.zoom(null, F);
      };
    });
  }
  function T(I, E, v) {
    return !v && I.__zooming || new x(I, E);
  }
  function x(I, E) {
    this.that = I, this.args = E, this.active = 0, this.sourceEvent = null, this.extent = t.apply(I, E), this.taps = 0;
  }
  x.prototype = {
    event: function(I) {
      return I && (this.sourceEvent = I), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(I, E) {
      return this.mouse && I !== "mouse" && (this.mouse[1] = E.invert(this.mouse[0])), this.touch0 && I !== "touch" && (this.touch0[1] = E.invert(this.touch0[0])), this.touch1 && I !== "touch" && (this.touch1[1] = E.invert(this.touch1[0])), this.that.__zoom = E, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(I) {
      var E = Ue(this.that).datum();
      p.call(
        I,
        this.that,
        new zl(I, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: p
        }),
        E
      );
    }
  };
  function z(I, ...E) {
    if (!e.apply(this, arguments)) return;
    var v = T(this, E).event(I), k = this.__zoom, $ = Math.max(a[0], Math.min(a[1], k.k * Math.pow(2, s.apply(this, arguments)))), _ = rt(I);
    if (v.wheel)
      (v.mouse[0][0] !== _[0] || v.mouse[0][1] !== _[1]) && (v.mouse[1] = k.invert(v.mouse[0] = _)), clearTimeout(v.wheel);
    else {
      if (k.k === $) return;
      v.mouse = [_, k.invert(_)], ki(this), v.start();
    }
    Ut(I), v.wheel = setTimeout(P, d), v.zoom("mouse", i(R(M(k, $), v.mouse[0], v.mouse[1]), v.extent, n));
    function P() {
      v.wheel = null, v.end();
    }
  }
  function w(I, ...E) {
    if (m || !e.apply(this, arguments)) return;
    var v = I.currentTarget, k = T(this, E, !0).event(I), $ = Ue(I.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", B, !0), _ = rt(I, v), P = I.clientX, C = I.clientY;
    Jr(I.view), Ji(I), k.mouse = [_, this.__zoom.invert(_)], ki(this), k.start();
    function D(Y) {
      if (Ut(Y), !k.moved) {
        var re = Y.clientX - P, ue = Y.clientY - C;
        k.moved = re * re + ue * ue > u;
      }
      k.event(Y).zoom("mouse", i(R(k.that.__zoom, k.mouse[0] = rt(Y, v), k.mouse[1]), k.extent, n));
    }
    function B(Y) {
      $.on("mousemove.zoom mouseup.zoom", null), ed(Y.view, k.moved), Ut(Y), k.event(Y).end();
    }
  }
  function A(I, ...E) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, k = rt(I.changedTouches ? I.changedTouches[0] : I, this), $ = v.invert(k), _ = v.k * (I.shiftKey ? 0.5 : 2), P = i(R(M(v, _), k, $), t.apply(this, E), n);
      Ut(I), r > 0 ? Ue(this).transition().duration(r).call(O, P, k, I) : Ue(this).call(b.transform, P, k, I);
    }
  }
  function L(I, ...E) {
    if (e.apply(this, arguments)) {
      var v = I.touches, k = v.length, $ = T(this, E, I.changedTouches.length === k).event(I), _, P, C, D;
      for (Ji(I), P = 0; P < k; ++P)
        C = v[P], D = rt(C, this), D = [D, this.__zoom.invert(D), C.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== D[2] && ($.touch1 = D, $.taps = 0) : ($.touch0 = D, _ = !0, $.taps = 1 + !!g);
      g && (g = clearTimeout(g)), _ && ($.taps < 2 && (y = D[0], g = setTimeout(function() {
        g = null;
      }, h)), ki(this), $.start());
    }
  }
  function q(I, ...E) {
    if (this.__zooming) {
      var v = T(this, E).event(I), k = I.changedTouches, $ = k.length, _, P, C, D;
      for (Ut(I), _ = 0; _ < $; ++_)
        P = k[_], C = rt(P, this), v.touch0 && v.touch0[2] === P.identifier ? v.touch0[0] = C : v.touch1 && v.touch1[2] === P.identifier && (v.touch1[0] = C);
      if (P = v.that.__zoom, v.touch1) {
        var B = v.touch0[0], Y = v.touch0[1], re = v.touch1[0], ue = v.touch1[1], F = (F = re[0] - B[0]) * F + (F = re[1] - B[1]) * F, j = (j = ue[0] - Y[0]) * j + (j = ue[1] - Y[1]) * j;
        P = M(P, Math.sqrt(F / j)), C = [(B[0] + re[0]) / 2, (B[1] + re[1]) / 2], D = [(Y[0] + ue[0]) / 2, (Y[1] + ue[1]) / 2];
      } else if (v.touch0) C = v.touch0[0], D = v.touch0[1];
      else return;
      v.zoom("touch", i(R(P, C, D), v.extent, n));
    }
  }
  function H(I, ...E) {
    if (this.__zooming) {
      var v = T(this, E).event(I), k = I.changedTouches, $ = k.length, _, P;
      for (Ji(I), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, h), _ = 0; _ < $; ++_)
        P = k[_], v.touch0 && v.touch0[2] === P.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === P.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (P = rt(P, this), Math.hypot(y[0] - P[0], y[1] - P[1]) < f)) {
        var C = Ue(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return b.wheelDelta = function(I) {
    return arguments.length ? (s = typeof I == "function" ? I : hi(+I), b) : s;
  }, b.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : hi(!!I), b) : e;
  }, b.touchable = function(I) {
    return arguments.length ? (o = typeof I == "function" ? I : hi(!!I), b) : o;
  }, b.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : hi([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), b) : t;
  }, b.scaleExtent = function(I) {
    return arguments.length ? (a[0] = +I[0], a[1] = +I[1], b) : [a[0], a[1]];
  }, b.translateExtent = function(I) {
    return arguments.length ? (n[0][0] = +I[0][0], n[1][0] = +I[1][0], n[0][1] = +I[0][1], n[1][1] = +I[1][1], b) : [[n[0][0], n[0][1]], [n[1][0], n[1][1]]];
  }, b.constrain = function(I) {
    return arguments.length ? (i = I, b) : i;
  }, b.duration = function(I) {
    return arguments.length ? (r = +I, b) : r;
  }, b.interpolate = function(I) {
    return arguments.length ? (l = I, b) : l;
  }, b.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? b : I;
  }, b.clickDistance = function(I) {
    return arguments.length ? (u = (I = +I) * I, b) : Math.sqrt(u);
  }, b.tapDistance = function(I) {
    return arguments.length ? (f = +I, b) : f;
  }, b;
}
var Hl = Object.defineProperty, Gl = Object.getOwnPropertyDescriptor, ye = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Gl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Hl(t, i, o), o;
};
function jl(e, t, i, s) {
  const o = t.x - e.x, a = t.y - e.y, n = s.x - i.x, r = s.y - i.y, l = o * r - a * n;
  if (Math.abs(l) < 1e-9) return null;
  const p = ((i.x - e.x) * r - (i.y - e.y) * n) / l, g = ((i.x - e.x) * a - (i.y - e.y) * o) / l;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * a, t: p };
}
function Yl(e, t, i) {
  const s = i.x - t.x, o = i.y - t.y, a = s * s + o * o || 1, n = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * o) / a)), r = t.x + n * s, l = t.y + n * o;
  return { dist: Math.hypot(e.x - r, e.y - l), t: n };
}
function Kl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], n = e[o + 1], r = Math.hypot(n.x - a.x, n.y - a.y) || 1, l = (n.x - a.x) / r, p = (n.y - a.y) / r, g = t.map(([m, h]) => jl(a, n, m, h)).filter((m) => m !== null).filter((m) => m.t * r > i + 2 && (1 - m.t) * r > i + 2).sort((m, h) => m.t - h.t);
    let y = -1 / 0;
    for (const m of g)
      m.t * r - i <= y + 2 || (s += ` L ${m.x - l * i} ${m.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${m.x + l * i} ${m.y + p * i}`, y = m.t * r + i);
    s += ` L ${n.x} ${n.y}`;
  }
  return s;
}
const $t = {
  component: te`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: te`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: te`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: te`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: te`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: te`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: te`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: te`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: te`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: te`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: te`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: te`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: te`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: te`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: te`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: te`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: te`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let ge = class extends Fe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Yt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = Wl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Ue(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, n = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, l = Math.max(80, s.width - o - a), p = Math.max(80, s.height - n - r), g = Math.min(...t.map((f) => f.x - f.w / 2)) - e, y = Math.max(...t.map((f) => f.x + f.w / 2)) + e, m = Math.min(...t.map((f) => f.y - f.h / 2)) - e, h = Math.max(...t.map((f) => f.y + f.h / 2)) + e, d = Math.max(0.15, Math.min(l / (y - g), p / (h - m), 1.25)), u = Yt.translate(
      o + l / 2 - d * (g + y) / 2,
      n + p / 2 - d * (m + h) / 2
    ).scale(d);
    Ue(i).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Ue(t), e);
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
    var i, s, o;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let a = e.parentId; a; a = (s = this.scene.nodes.find((n) => n.id === a)) == null ? void 0 : s.parentId) {
      const n = this.scene.nodes.find((l) => l.id === a);
      if (!n) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - n.x), y: e.y + (this._dragPos.y - n.y) };
      const r = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (r)
        return { x: e.x + (r.x - n.x), y: e.y + (r.y - n.y) };
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
      const s = this.scene.nodes.find((o) => o.id === e.parentId);
      if (s) {
        const o = this.nodePos(s), a = o.x - s.w / 2 + 10 + e.w / 2, n = o.x + s.w / 2 - 10 - e.w / 2, r = o.y - s.h / 2 + 34 + e.h / 2, l = o.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), n), i = Math.min(Math.max(i, r), l);
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
    var s, o;
    const i = ((s = this.shadowRoot) == null ? void 0 : s.elementsFromPoint(e, t)) ?? [];
    for (const a of i) {
      const n = (o = a.closest) == null ? void 0 : o.call(a, "[data-node-id]");
      if (n) return n.getAttribute("data-node-id");
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
    let o = !1;
    const a = new Set(this.selectedIds), n = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => a.has(f.id) && !(f.parentId && a.has(f.parentId))
    ) : null, r = n ? new Map(n.map((f) => [f.id, this.nodePos(f)])) : null, l = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !n, p = n ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, y = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const f = [], b = p === "menu" ? this.scene.nodes.filter((M) => M.kind === "ui-app") : this.scene.nodes.filter((M) => M.id === t.parentId);
      for (const M of b) {
        const R = this.scene.nodes.filter((x) => x.parentId === M.id && y.includes(x.kind ?? "") && x.id !== t.id).sort((x, z) => x.y - z.y), V = M.x - M.w / 2 + 10, O = M.x + M.w / 2 - 10;
        for (const x of R) f.push({ x1: V, x2: O, y: x.y - x.h / 2 - 3, appId: M.id, beforeId: x.id });
        const T = R[R.length - 1];
        f.push({
          x1: V,
          x2: O,
          y: T ? T.y + T.h / 2 + 3 : M.y - M.h / 2 + 34 + 8,
          appId: M.id,
          beforeId: null
        });
      }
      return f;
    }, h = (f) => {
      const b = this.nodeIdAt(f), M = b && b !== t.id ? this.scene.nodes.find((R) => R.id === b) : void 0;
      return M ? M.kind === "external-system" ? M.id : M.parentId ?? null : null;
    }, d = (f) => {
      if ((f.buttons & 1) === 0) {
        u(f);
        return;
      }
      const b = this.toScene(f), M = b.x - i.x, R = b.y - i.y;
      if (!(!o && Math.hypot(M, R) < 3 / this._t.k))
        if (o = !0, n && r) {
          const V = /* @__PURE__ */ new Map();
          for (const O of n) {
            const T = r.get(O.id), x = this.clampToParent(O, T.x + M, T.y + R);
            V.set(O.id, { x: x.x, y: x.y });
          }
          this._dragGroup = V;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + M, y: s.y + R }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const V = this.scene.nodes.filter(
            (T) => y.includes(T.kind ?? "") && T.id !== t.id && Math.abs(b.x - T.x) <= T.w / 2 + 8
          ), O = p === "menu" ? V.find((T) => Math.abs(b.y - T.y) < T.h * 0.28) : void 0;
          if (O)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: O.id }, this._hoverNodeId = O.id;
          else {
            let T = -1, x = 14;
            this._menuSlots.slots.forEach((z, w) => {
              if (b.x < z.x1 - 24 || b.x > z.x2 + 24) return;
              const A = Math.abs(b.y - z.y);
              A < x && (x = A, T = w);
            }), this._menuSlots = { ...this._menuSlots, active: T >= 0 ? T : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else l(f) ? (this._dragPos = { id: t.id, x: s.x + M, y: s.y + R }, this._hoverNodeId = h(f)) : (this._dragPos = this.clampToParent(t, s.x + M, s.y + R), this._hoverNodeId = null);
    }, u = (f) => {
      if (window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", u), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([b, M]) => ({ id: b, x: M.x, y: M.y }))
        });
      else if (o && this._dragPos && g) {
        const b = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const M = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (b != null && b.nestRowId)
          this.emit(M, { id: t.id, nestRowId: b.nestRowId });
        else if (b && b.active !== null) {
          const R = b.slots[b.active];
          this.emit(M, { id: t.id, appId: R.appId, beforeId: R.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (l(f)) {
          const b = h(f);
          if (f.ctrlKey && t.kind === "api") {
            b && b !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: b,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (b !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: b,
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
    window.addEventListener("pointermove", d), window.addEventListener("pointerup", u);
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
    const o = 160, a = 90, n = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((u) => u.parentId === t.id), l = Math.min(...r.map((u) => u.x - u.w / 2)), p = Math.max(...r.map((u) => u.x + u.w / 2)), g = Math.min(...r.map((u) => u.y - u.h / 2)), y = Math.max(...r.map((u) => u.y + u.h / 2)), m = wn(
      r.map((u) => ({ dx: u.x - n.x, dy: u.y - n.y, w: u.w, h: u.h })),
      { w: o, h: a }
    ), h = (u) => {
      if ((u.buttons & 1) === 0) {
        d();
        return;
      }
      const f = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: n.x,
          y: n.y,
          w: Math.max(m.w, 2 * Math.abs(f.x - n.x)),
          h: Math.max(m.h, 2 * Math.abs(f.y - n.y))
        };
        return;
      }
      const b = n.x - i * n.w / 2, M = n.y - s * n.h / 2, R = i > 0 ? Math.max(f.x, b + o, r.length ? p + 10 : -1 / 0) : Math.min(f.x, b - o, r.length ? l - 10 : 1 / 0), V = s > 0 ? Math.max(f.y, M + a, r.length ? y + 10 : -1 / 0) : Math.min(f.y, M - a, r.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (b + R) / 2,
        y: (M + V) / 2,
        w: Math.abs(R - b),
        h: Math.abs(V - M)
      };
    }, d = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const s = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: s.x, y: s.y };
    const o = (n) => {
      if ((n.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(n);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(n);
    }, a = (n) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const r = this.nodeIdAt(n);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
        x: n.clientX,
        y: n.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: o } = this.nodePos(e), a = t - s, n = i - o, r = e.w / 2, l = e.h / 2;
    if (a === 0 && n === 0) return { x: s, y: o };
    const p = 1 / Math.max(Math.abs(a) / r, Math.abs(n) / l);
    return { x: s + a * p, y: o + n * p };
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(i), n = s[0] ?? a, r = s[s.length - 1] ?? o;
    let l = this.borderPoint(t, n.x, n.y), p = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const y = Math.hypot(p.x - l.x, p.y - l.y) || 1, m = -(p.y - l.y) / y * g, h = (p.x - l.x) / y * g;
        l = { x: l.x + m, y: l.y + h }, p = { x: p.x + m, y: p.y + h };
      }
    }
    return [l, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const o = (n) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(n), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: l };
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: o } = Yl(t, e[s], e[s + 1]);
      o < i.dist && (i = { seg: s, dist: o });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const s = this.nearestSegment(t, i), o = [...this.edgePoints[e.id] ?? []];
    o.splice(s, 0, i), this._selectedWaypoint = { edgeId: e.id, index: s }, this.emit("edge-points-changed", { id: e.id, points: o });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const s = this.toScene(e), o = this.nearestSegment(i, s);
    let a = !1;
    const n = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(l);
      if (a) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - s.x, p.y - s.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, p), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
      }
    }, r = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", r), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", r);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((s) => `${s.x},${s.y}`).join(" ");
    return te`
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
          ${e.tooltip ? te`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const s = e.color ?? "#64748b", o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), n = Math.floor((t.length - 1) / 2), r = {
      x: (t[n].x + t[n + 1].x) / 2,
      y: (t[n].y + t[n + 1].y) / 2
    }, l = t.slice(1, -1);
    return te`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Kl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? te`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${o ? l.map((p, g) => {
      var m;
      const y = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === g;
      return te`
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
    var m, h, d, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, n = !!e.parentId, r = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = r / 2, g = l / 2, y = n && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return te`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerdown=${(f) => this.onNodePointerDown(f, e)}
         @dblclick=${(f) => {
      f.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? te`<rect x=${-p - 4} y=${-g - 4} width=${r + 8} height=${l + 8}
                  rx=${n ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${r} height=${l} rx=${n ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? te`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? te`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? te`<g transform="translate(${p - 13}, ${-g + 13})"
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
        ${e.symbol && $t[e.symbol] && !n ? te`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${$t[e.symbol]}
              </g>` : ""}
        ${n && e.symbol && $t[e.symbol] ? te`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${$t[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? te`
              <foreignObject x=${-p + 6} y=${a ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(f) => f.stopPropagation()}
                  @keydown=${(f) => {
      f.stopPropagation(), f.key === "Enter" && this.commitRename(e, f.target.value), f.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(f) => this.commitRename(e, f.target.value)}
                />
              </foreignObject>` : n ? te`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${y}</text>` : a ? te`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : te`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? te`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (n ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([f, b]) => te`
                <circle data-handle cx=${f} cy=${b} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(M) => this.onHandlePointerDown(M, e)}>
                  <title>${n ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (f, b) => te`
                <g transform="translate(${-p + 24 + b * 20}, ${-g})">
                  <circle data-handle r="7" fill=${f.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(M) => this.onHandlePointerDown(M, e, f.kind)}>
                    <title>${f.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${a && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([f, b]) => te`
                <rect data-resize x=${f * p - 6.5} y=${b * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${f * b > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(M) => this.onResizePointerDown(M, e, f, b)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return te``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return te``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return te`
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
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, o = (n) => {
      if ((n.buttons & 1) === 0) {
        s();
        return;
      }
      const r = this.toScene(n);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: n, b: r } = this._rubber, l = Math.min(n.x, r.x), p = Math.max(n.x, r.x), g = Math.min(n.y, r.y), y = Math.max(n.y, r.y), m = this.scene.nodes.filter((h) => {
          const d = this.nodePos(h);
          return d.x >= l && d.x <= p && d.y >= g && d.y <= y;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return te``;
    const { a: e, b: t } = this._rubber;
    return te`
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
    const i = Math.min(...t.map((n) => n.x - n.w / 2)) - e, s = Math.max(...t.map((n) => n.x + n.w / 2)) + e, o = Math.min(...t.map((n) => n.y - n.h / 2)) - e, a = Math.max(...t.map((n) => n.y + n.h / 2)) + e;
    return { minX: i, minY: o, w: s - i, h: a - o };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), o = this._t.k, a = Yt.translate(s.width / 2 - o * e, s.height / 2 - o * t).scale(o);
    Ue(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - s.left) / i, a = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return S``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, n = (0 - this._t.y) / this._t.k, r = o.width / this._t.k, l = o.height / this._t.k;
    return S`
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
      var g, y;
      (y = (g = p.currentTarget).hasPointerCapture) != null && y.call(g, p.pointerId) && this.onMinimapPointer(p, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return te`<rect
              x=${(g.x - p.w / 2 - e.minX) * s}
              y=${(g.y - p.h / 2 - e.minY) * s}
              width=${Math.max(2, p.w * s)}
              height=${Math.max(2, p.h * s)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * s}
            y=${(n - e.minY) * s}
            width=${r * s}
            height=${l * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => o.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((o) => {
      const a = this.edgePolyline(o);
      if (a) {
        i.push(this.renderEdgeHit(o, a)), s.push(this.renderEdgeInk(o, a, [...t]));
        for (let n = 0; n < a.length - 1; n++) t.push([a[n], a[n + 1]]);
      }
    }), S`
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
      (o) => te`
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
          ${s}
          ${this._menuSlots ? te`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (o, a) => te`
                    <line x1=${o.x1} y1=${o.y} x2=${o.x2} y2=${o.y}
                          stroke=${a === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${a === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${a === this._menuSlots.active ? te`<circle cx=${o.x1} cy=${o.y} r="3.5" fill="#0284c7"></circle>
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
ge.styles = It`
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
ye([
  ne({ attribute: !1 })
], ge.prototype, "scene", 2);
ye([
  ne({ attribute: !1 })
], ge.prototype, "selectedId", 2);
ye([
  ne({ attribute: !1 })
], ge.prototype, "selectedIds", 2);
ye([
  ne({ type: Boolean })
], ge.prototype, "connectable", 2);
ye([
  ne({ attribute: !1 })
], ge.prototype, "edgePoints", 2);
ye([
  U()
], ge.prototype, "_t", 2);
ye([
  U()
], ge.prototype, "_dragPos", 2);
ye([
  U()
], ge.prototype, "_menuSlots", 2);
ye([
  U()
], ge.prototype, "_dragGroup", 2);
ye([
  U()
], ge.prototype, "_pendingLink", 2);
ye([
  U()
], ge.prototype, "_hoverNodeId", 2);
ye([
  U()
], ge.prototype, "_editingId", 2);
ye([
  U()
], ge.prototype, "_spaceDown", 2);
ye([
  U()
], ge.prototype, "_wpDrag", 2);
ye([
  U()
], ge.prototype, "_selectedWaypoint", 2);
ye([
  U()
], ge.prototype, "_resize", 2);
ye([
  U()
], ge.prototype, "_rubber", 2);
ye([
  ne({ attribute: !1 })
], ge.prototype, "fitInsets", 2);
ge = ye([
  yt("modux-canvas")
], ge);
const J = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Me(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ce(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const kt = (e) => e.trim().toLowerCase();
function Xl(e, t) {
  var w, A, L, q, H;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((I) => [I.id, I.name])), o = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((E) => ({ ...E, moduleId: I.id }))
  ), a = new Set(o.map((I) => I.id)), n = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((I) => (I.domainServices ?? []).map((E) => E.id))
  ), l = e.modules.flatMap(
    (I) => (I.domainEvents ?? []).map((E) => ({ ...E, moduleId: I.id, application: !1 }))
  ), p = e.modules.flatMap(
    (I) => (I.applicationEvents ?? []).map((E) => ({ ...E, moduleId: I.id, application: !0 }))
  ), g = e.modules.flatMap(
    (I) => (I.readModels ?? []).map((E) => ({ ...E, moduleId: I.id }))
  );
  for (const I of o)
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: J.command.w,
      h: J.command.h,
      kind: "use-case",
      symbol: I.policy ? "flow" : "gear",
      fill: I.policy ? J.policy.fill : J.command.fill,
      stroke: I.policy ? J.policy.stroke : J.command.stroke,
      badge: I.policy ? "POLICY" : "COMANDO",
      tooltip: I.policy ? `${I.name} — policy de ${s.get(I.moduleId) ?? I.moduleId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  for (const I of o)
    (I.steps ?? []).forEach((E, v) => {
      Me(i, {
        id: E.id,
        label: `${v + 1}. ${E.name || E.type || "paso"}`,
        x: 0,
        y: 0,
        w: J.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!E.customCodeId,
        tooltip: `Paso de ${I.name}${E.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), ce(i, {
        id: `esstep:${v === 0 ? I.id : (I.steps ?? [])[v - 1].id}->${E.id}`,
        sourceId: v === 0 ? I.id : (I.steps ?? [])[v - 1].id,
        targetId: E.id,
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
    for (const E of I.steps ?? [])
      E.customCodeId && ce(i, {
        id: `escc:${E.id}`,
        sourceId: E.id,
        targetId: E.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: "El paso delega en código a mano — Supr lo desconecta"
      });
  for (const I of n)
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: J.aggregate.w,
      h: J.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: J.aggregate.fill,
      stroke: J.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${I.name} — agregado de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const I of [...l, ...p])
    Me(i, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: J.event.w,
      h: J.event.h,
      kind: I.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: J.event.fill,
      stroke: J.event.stroke,
      badge: I.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${I.name} — evento de ${s.get(I.moduleId) ?? I.moduleId}`
    }), y.set(kt(I.name), I.id);
  const m = (I) => {
    if (!I || !I.trim()) return null;
    const E = y.get(kt(I));
    if (E) return E;
    const v = `evname:${kt(I)}`;
    return Me(i, {
      id: v,
      label: I,
      x: 0,
      y: 0,
      w: J.event.w,
      h: J.event.h,
      kind: "event-name",
      symbol: "event",
      fill: J.event.fill,
      stroke: J.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${I} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, h = (I) => {
    const E = g.find((k) => k.id === I.id) ?? g.find((k) => I.name && kt(k.name) === kt(I.name)), v = (E == null ? void 0 : E.id) ?? (I.id || (I.name ? `rm:${kt(I.name)}` : null));
    return v ? (Me(i, {
      id: v,
      label: (E == null ? void 0 : E.name) ?? I.name ?? v,
      x: 0,
      y: 0,
      w: J.readModel.w,
      h: J.readModel.h,
      kind: E ? "read-model" : "derived-read-model",
      fill: J.readModel.fill,
      stroke: J.readModel.stroke,
      dashed: !E,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!a.has(I.targetId)) continue;
    const E = (e.actors ?? []).find((v) => v.id === I.actorId);
    E && (Me(i, {
      id: E.id,
      label: E.name,
      x: 0,
      y: 0,
      w: J.actor.w,
      h: J.actor.h,
      kind: "actor",
      symbol: "person",
      fill: J.actor.fill,
      stroke: J.actor.stroke,
      badge: "ACTOR"
    }), ce(i, {
      id: `es-actor:${E.id}->${I.targetId}`,
      sourceId: E.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const E = (e.agentUses ?? []).filter((P) => P.agentId === I.id), v = (e.agentExternalUses ?? []).filter((P) => P.agentId === I.id), k = (e.agentRags ?? []).filter((P) => P.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((P) => P.agentId === I.id), _ = (e.agentGatewayUses ?? []).some((P) => P.agentId === I.id) || (e.agentApiOpUses ?? []).some((P) => P.agentId === I.id) || (e.agentQueryUses ?? []).some((P) => P.agentId === I.id) || (e.agentDelegations ?? []).some((P) => P.agentId === I.id) || (e.agentTriggers ?? []).some((P) => P.agentId === I.id);
    if (!(!E.length && !v.length && !k.length && !$.length && !_)) {
      Me(i, {
        id: I.id,
        label: I.name,
        x: 0,
        y: 0,
        w: J.actor.w,
        h: J.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${I.name} — agente de IA (consume por MCP)`
      });
      for (const P of E)
        a.has(P.useCaseId) && ce(i, {
          id: `es-agent:${I.id}->${P.useCaseId}`,
          sourceId: I.id,
          targetId: P.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const P of v) {
        const C = e.externalSystems.find(
          (B) => (B.useCases ?? []).some((Y) => Y.id === P.externalUseCaseId)
        );
        if (!C) continue;
        const D = (w = (C.useCases ?? []).find((B) => B.id === P.externalUseCaseId)) == null ? void 0 : w.name;
        Me(i, {
          id: C.id,
          label: C.name,
          x: 0,
          y: 0,
          w: J.external.w,
          h: J.external.h,
          kind: "external-system",
          symbol: "component",
          fill: J.external.fill,
          stroke: J.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentx:${I.id}->${P.externalUseCaseId}`,
          sourceId: I.id,
          targetId: C.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const P of $) {
        const C = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((Y) => Y.id === P.mcpServerId)
        );
        if (!C) continue;
        const D = (A = (C.mcpServers ?? []).find((B) => B.id === P.mcpServerId)) == null ? void 0 : A.name;
        Me(i, {
          id: C.id,
          label: C.name,
          x: 0,
          y: 0,
          w: J.external.w,
          h: J.external.h,
          kind: "external-system",
          symbol: "component",
          fill: J.external.fill,
          stroke: J.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentmcp:${I.id}->${P.mcpServerId}`,
          sourceId: I.id,
          targetId: C.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const P of k) {
        const C = (e.rags ?? []).find((D) => D.id === P.ragId);
        if (C) {
          Me(i, {
            id: C.id,
            label: C.name,
            x: 0,
            y: 0,
            w: J.readModel.w,
            h: J.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${C.name} — base de conocimiento (retrieval)`
          }), ce(i, {
            id: `es-agrag:${I.id}->${C.id}`,
            sourceId: I.id,
            targetId: C.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const D of C.sourceReadModelIds ?? []) {
            const B = h({ id: D });
            B && ce(i, {
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
  const d = (I) => {
    const E = e.externalSystems.find((v) => v.id === I);
    return E ? (Me(i, {
      id: E.id,
      label: E.name,
      x: 0,
      y: 0,
      w: J.external.w,
      h: J.external.h,
      kind: "external-system",
      symbol: "component",
      fill: J.external.fill,
      stroke: J.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), E.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const E = d(I.externalSystemId);
    !E || !a.has(I.useCaseId) || ce(i, {
      id: `es-extin:${E}->${I.useCaseId}`,
      sourceId: E,
      targetId: I.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const I of e.externalUseCaseCalls ?? []) {
    if (!a.has(I.sourceId)) continue;
    const E = e.externalSystems.find(
      ($) => ($.useCases ?? []).some((_) => _.id === I.targetId)
    ), v = E ? d(E.id) : null;
    if (!v) continue;
    const k = (L = ((E == null ? void 0 : E.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : L.name;
    ce(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !a.has(I.sourceId) || !i.nodes.has(I.targetId) || ce(i, {
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
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (a.has(I.sourceId) || n.some((v) => v.id === I.sourceId) || r.has(I.sourceId))) || ce(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const f = (I, E, v, k, $, _) => (Me(i, {
    id: I,
    label: E,
    x: 0,
    y: 0,
    w: J.policy.w,
    h: J.policy.h,
    kind: v,
    symbol: "flow",
    fill: J.policy.fill,
    stroke: J.policy.stroke,
    badge: k,
    tooltip: $
  }), I), b = (I, E) => {
    const v = m(I);
    v && ce(i, {
      id: `es-trigger:${v}->${E}`,
      sourceId: v,
      targetId: E,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, M = (I, E) => {
    !E || !a.has(E) || ce(i, {
      id: `es-invoke:${I}->${E}`,
      sourceId: I,
      targetId: E,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const E = f(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    b(I.eventName, E);
    for (const v of I.actions ?? []) {
      if (v.type === "CallUseCase" && M(E, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const k = `saga:${v.sagaId}`;
        f(k, v.sagaId, "saga", "SAGA"), ce(i, {
          id: `es-saga:${E}->${k}`,
          sourceId: E,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const k = (e.projections ?? []).find(($) => $.id === v.projectionId);
        k && ce(i, {
          id: `es-feeds:${E}->${k.id}`,
          sourceId: E,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const I of e.projections ?? []) {
    const E = f(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const $ of I.handledEventIds) {
      const _ = i.nodes.has($) ? $ : null;
      _ && ce(i, {
        id: `es-trigger:${_}->${E}`,
        sourceId: _,
        targetId: E,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && i.nodes.has(I.sourceAggregateId) && ce(i, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: E,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (v) {
      const $ = e.externalSystems.find(
        (P) => (P.useCases ?? []).some((C) => C.id === v) || (P.tables ?? []).some((C) => C.id === v)
      ), _ = $ ? d($.id) : null;
      if (_) {
        const P = ((q = ($.useCases ?? []).find((C) => C.id === v)) == null ? void 0 : q.name) ?? ((H = ($.tables ?? []).find((C) => C.id === v)) == null ? void 0 : H.name);
        ce(i, {
          id: `es-poll:${I.id}`,
          sourceId: _,
          targetId: E,
          kind: "es-projects-poll",
          label: P,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: P ? `polling de ${P}` : "polling"
        });
      }
    }
    const k = h({ id: I.readModelId, name: I.readModelName });
    k && ce(i, {
      id: `es-projects:${E}->${k}`,
      sourceId: E,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const v = m(I.triggerEvent), k = h({ name: I.readModelName ?? `${I.triggerEvent}View` });
      v && k && ce(i, {
        id: `es-mat:${I.id}`,
        sourceId: v,
        targetId: k,
        kind: "es-materializes",
        label: I.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${I.name} [MATERIALIZES]`
      });
      continue;
    }
    const E = f(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (b(I.triggerEvent, E), M(E, I.targetUseCaseId), !I.targetUseCaseId) {
      const v = d(I.targetId), k = v ?? `tgt:${I.targetId}`;
      !v && s.has(I.targetId) && Me(i, {
        id: k,
        label: s.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: J.module.w,
        h: J.module.h,
        kind: "module",
        symbol: "component",
        fill: J.module.fill,
        stroke: J.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(k) && ce(i, {
        id: `es-deliver:${I.id}`,
        sourceId: E,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const I of e.processes ?? []) {
    const E = f(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    b(I.triggerEvent, E);
    for (const k of I.steps) M(E, k.useCaseId);
    const v = m(I.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${I.id}`,
      sourceId: E,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const E = f(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    b(I.triggerEvent, E);
    for (const k of I.steps ?? []) {
      M(E, k.targetUseCaseId);
      for (const $ of [k.emittedEventName, k.completionEventName]) {
        const _ = m($);
        _ && ce(i, {
          id: `es-wfemit:${I.id}:${_}`,
          sourceId: E,
          targetId: _,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = m(I.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${I.id}`,
      sourceId: E,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const R = [...i.nodes.values()], V = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    V.has(I.targetId) || V.set(I.targetId, []), V.get(I.targetId).push(I.sourceId);
  const O = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Set(), x = (I) => {
    const E = O.get(I);
    if (E !== void 0) return E;
    if (T.has(I)) return 0;
    T.add(I);
    const v = V.get(I) ?? [], k = v.length ? 1 + Math.max(...v.map(x)) : 0;
    return T.delete(I), O.set(I, k), k;
  }, z = /* @__PURE__ */ new Map();
  for (const I of R) {
    const E = t[I.id];
    if (E) {
      I.x = E.x, I.y = E.y;
      continue;
    }
    const v = x(I.id), k = z.get(v) ?? 0;
    z.set(v, k + 1), I.x = 140 + v * 260, I.y = 110 + k * 110;
  }
  return { nodes: R, edges: i.edges };
}
const Ql = 190, Zl = 56, ro = 180, Jl = 56, ec = 150, tc = 44, lo = 250, co = 100;
function ic(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), n = a.length ? 1 + Math.max(...a.map(s)) : 0;
    return i.delete(o.id), n;
  };
  return s(e);
}
function sc(e, t) {
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
function oc(e, t) {
  const i = [], s = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l;
    return (l = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === r)) == null ? void 0 : l.name;
  };
  let n = 140;
  return (e.workflows ?? []).forEach((r) => {
    var f;
    const l = new Map(r.steps.map((b) => [b.id, b])), p = new Map(r.steps.map((b) => [b.id, ic(b, l)])), g = /* @__PURE__ */ new Map();
    for (const b of r.steps) {
      const M = p.get(b.id) ?? 0;
      g.set(M, (g.get(M) ?? 0) + 1);
    }
    const y = Math.max(1, ...g.values()), m = sc(e, r);
    if (m && !o.has(m.id)) {
      o.add(m.id);
      const b = t[m.id] ?? { x: 140, y: n };
      i.push({
        id: m.id,
        label: m.label,
        x: b.x,
        y: b.y,
        w: ec,
        h: tc,
        kind: m.kind,
        symbol: m.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: m.kind === "aggregate" ? "AGGREGATE" : m.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[r.id] ?? { x: 420, y: n };
    i.push({
      id: r.id,
      label: r.name,
      x: h.x,
      y: h.y,
      w: Ql,
      h: Zl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), m && s.push({
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
    const d = /* @__PURE__ */ new Map();
    let u = 0;
    for (const b of r.steps) {
      const M = p.get(b.id) ?? 0;
      u = Math.max(u, M);
      const R = d.get(M) ?? 0;
      d.set(M, R + 1);
      const V = t[b.id] ?? {
        x: h.x + (M + 1) * lo,
        y: n + (R - (g.get(M) - 1) / 2) * co
      }, O = a(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: V.x,
        y: V.y,
        w: ro,
        h: Jl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: O ? `→ ${O}` : "∅ sin use case",
        tooltip: `${b.name}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${O ? ` · lanza ${O}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}`
      });
      const T = (b.dependsOnStepIds ?? []).filter((x) => l.has(x));
      T.length === 0 && s.push({
        id: `wfs:${r.id}:${b.id}`,
        sourceId: r.id,
        targetId: b.id,
        kind: "workflow-start",
        label: b.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const x of T)
        s.push({
          id: `wfdep:${x}->${b.id}`,
          sourceId: x,
          targetId: b.id,
          kind: "workflow-dependency",
          label: b.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${b.name} espera a ${((f = l.get(x)) == null ? void 0 : f.name) ?? x}`
        });
    }
    if (r.onCompletionEventName) {
      const b = `done:${r.id}`, M = t[b] ?? { x: h.x + (u + 2) * lo, y: n };
      i.push({
        id: b,
        label: r.onCompletionEventName,
        x: M.x,
        y: M.y,
        w: ro,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const R = new Set(r.steps.flatMap((O) => O.dependsOnStepIds ?? [])), V = r.steps.filter((O) => !R.has(O.id));
      for (const O of V.length ? V : [])
        s.push({
          id: `wfd:${r.id}:${O.id}`,
          sourceId: O.id,
          targetId: b,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || s.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: b,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    n += Math.max(2, y + 1) * co + 60;
  }), { nodes: i, edges: s };
}
const po = 250, Pe = 30, dt = 6, nc = 16, qt = 190, ac = 60, rc = 170, fi = 44;
function dc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ve(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function lc(e) {
  const t = [], i = (s, o, a) => {
    for (const n of s ?? []) {
      const r = [...o, n.label];
      t.push({ entry: n, path: r, depth: a }), i(n.children ?? [], r, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function cc(e, t) {
  var O, T, x, z;
  const i = [], s = [], o = e.uiApps ?? [], a = e.pages ?? [], n = (w) => {
    var A;
    return ((A = e.modules.flatMap((L) => L.useCases ?? []).find((L) => L.id === w)) == null ? void 0 : A.name) ?? w;
  }, r = (w) => {
    var A;
    return ((A = e.modules.flatMap((L) => L.queryServices ?? []).find((L) => L.id === w)) == null ? void 0 : A.name) ?? w;
  }, l = /* @__PURE__ */ new Map();
  let p = 160;
  for (const w of o) {
    const A = lc(w), L = Math.max(
      90,
      54 + A.length * (Pe + dt)
    ), q = t[w.id] ?? { x: 190, y: p + L / 2 };
    p = q.y + L / 2 + 70;
    const H = w.type ?? "APP";
    i.push({
      id: w.id,
      label: w.title || w.name,
      x: q.x,
      y: q.y,
      w: po,
      h: L,
      kind: "ui-app",
      symbol: H === "ORCHESTRATOR" || H === "VIEW_EDITOR" ? "process" : "component",
      fill: H === "ORCHESTRATOR" || H === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: H === "ORCHESTRATOR" || H === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: H === "ORCHESTRATOR" ? "ORQUESTADOR" : H === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : H === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: H === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : H === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : H === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: H === "ORCHESTRATOR" ? `${w.name} — orquesta y mantiene estado; solo enseña páginas hijas` : H === "MASTER_DETAIL" ? `${w.name} — cabecera + pestañas (ambas son páginas)` : `App: ${w.name}`
    }), w.modelId && (l.set(w.modelId, {
      label: ((O = (e.models ?? []).find((v) => v.id === w.modelId)) == null ? void 0 : O.name) ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
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
    for (const [v, k, $, _, P] of [
      [w.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [w.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      v && s.push({
        id: `${k === "app-view" ? "appview" : "appedit"}:${w.id}->${v}`,
        sourceId: w.id,
        targetId: v,
        kind: k,
        color: _,
        label: $,
        arrow: !0,
        tooltip: P
      });
    const I = w.homePageId ?? w.homeAppId;
    I && s.push({
      id: `apphome:${w.id}->${I}`,
      sourceId: w.id,
      targetId: I,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: w.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), H === "MASTER_DETAIL" && w.headerPageId && s.push({
      id: `appheader:${w.id}->${w.headerPageId}`,
      sourceId: w.id,
      targetId: w.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let E = q.y - L / 2 + 34 + 10 + Pe / 2;
    for (const { entry: v, path: k, depth: $ } of A) {
      const _ = dc(w.id, v, k), P = $ * nc;
      if (i.push({
        id: _,
        label: v.label,
        x: q.x + P / 2,
        y: E,
        w: po - 20 - P,
        h: Pe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (T = v.children) != null && T.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (x = v.children) != null && x.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: w.id,
        tooltip: (z = v.children) != null && z.length ? "Agrupador (con submenú): no puede abrir nada" : v.pageId ? `Abre ${v.pageId}` : v.uiAdapterId ? `Abre la app ${v.uiAdapterId}` : v.useCaseId ? `Lanza ${v.useCaseId}` : v.aggregateId ? `CRUD inferido sobre ${v.aggregateId}` : v.queryOperationId ? `Listado con filtros de ${v.queryOperationId}` : "Entrada de menú sin destino"
      }), E += Pe + dt, v.uiAdapterId && o.some((C) => C.id === v.uiAdapterId) && s.push({
        id: `menuapp:${_}->${v.uiAdapterId}`,
        sourceId: _,
        targetId: v.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), v.useCaseId && e.modules.some((D) => (D.useCases ?? []).some((B) => B.id === v.useCaseId)) && (l.set(v.useCaseId, {
        label: n(v.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${_}->${v.useCaseId}`,
        sourceId: _,
        targetId: v.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), v.aggregateId && (e.aggregates ?? []).some((C) => C.id === v.aggregateId)) {
        const C = (e.aggregates ?? []).find((D) => D.id === v.aggregateId);
        l.set(C.id, { label: C.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${_}->${C.id}`,
          sourceId: _,
          targetId: C.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (v.queryOperationId) {
        const C = e.modules.flatMap((B) => B.queryServices ?? []).find((B) => B.id === v.queryServiceId), D = ((C == null ? void 0 : C.operations) ?? []).find((B) => B.id === v.queryOperationId);
        C && D && (l.set(D.id, {
          label: `${D.name} (${C.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${_}->${D.id}`,
          sourceId: _,
          targetId: D.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      v.pageId && a.some((C) => C.id === v.pageId) && s.push({
        id: `menupage:${_}->${v.pageId}`,
        sourceId: _,
        targetId: v.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const y = (w) => {
    var A;
    return ((A = a.find((L) => L.id === w)) == null ? void 0 : A.name) ?? w;
  };
  for (const w of a) {
    const A = t[w.id] ?? { x: 640, y: g }, L = w.type === "WIZARD" ? w.wizardSteps ?? [] : [], q = L.length ? 54 + L.length * (Pe + dt) : ac;
    g = A.y + q + 90, i.push({
      id: w.id,
      label: w.name,
      x: A.x,
      y: A.y,
      w: qt,
      h: q,
      kind: "page",
      symbol: "interface",
      badge: w.customCodeId ? "CODE" : w.type ?? "PAGE",
      container: L.length > 0,
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
    let H = A.y - q / 2 + 34 + 10 + Pe / 2;
    L.forEach((I, E) => {
      const v = I.id ?? I.pageId ?? String(E);
      i.push({
        id: `wizrow:${w.id}:${v}`,
        label: `${E + 1}. ${I.label ?? (I.pageId ? y(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: A.x,
        y: H,
        w: qt - 20,
        h: Pe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: w.id,
        tooltip: I.pageId ? `Paso ${E + 1}: ${y(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${E + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), H += Pe + dt;
    });
    for (const [I, E, v, k] of [
      [w.crudDetailPageId ?? w.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [w.crudCreatePageId ?? w.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && s.push({
        id: `${E === "crud-detail" ? "cruddetail" : "crudnew"}:${w.id}->${I}`,
        sourceId: w.id,
        targetId: I,
        kind: E,
        color: k,
        label: v,
        dashed: !0,
        arrow: !0,
        tooltip: E === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let I = 0; I < (w.wizardSteps ?? []).length; I++) {
      const E = (w.wizardSteps ?? [])[I];
      if (!E.pageId) continue;
      const v = E.id ?? E.pageId;
      s.push({
        id: `wizstep:${w.id}:${v}`,
        sourceId: `wizrow:${w.id}:${v}`,
        targetId: E.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${I + 1} — Supr desmapea`
      });
    }
    w.modelId && (l.set(w.modelId, {
      label: w.modelName ?? w.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
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
      I.useCaseId && (l.set(I.useCaseId, {
        label: n(I.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
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
    w.listingQueryServiceId && (l.set(w.listingQueryServiceId, {
      label: r(w.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
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
  const m = e.buttonGroups ?? [], h = (w) => {
    var A;
    return ((A = m.find((L) => L.id === w)) == null ? void 0 : A.name) ?? w;
  };
  let d = 520;
  for (const w of m) {
    const A = w.buttons ?? [], L = w.groupIds ?? [], q = A.length + L.length, H = t[w.id] ?? { x: 1e3, y: d }, I = Math.max(70, 54 + q * (Pe + dt));
    d = H.y + I + 80, i.push({
      id: w.id,
      label: w.name,
      x: H.x,
      y: H.y,
      w: qt,
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
    let E = H.y - I / 2 + 34 + 10 + Pe / 2;
    for (const v of A)
      i.push({
        id: `gbtn:${w.id}:${v.id}`,
        label: v.label ?? v.id,
        x: H.x,
        y: E,
        w: qt - 20,
        h: Pe,
        kind: "group-button",
        symbol: "usecase",
        fill: v.useCaseId || v.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !v.useCaseId && !v.apiOperationId,
        parentId: w.id,
        tooltip: `${v.label ?? v.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), E += Pe + dt;
    for (const v of L)
      i.push({
        id: `gsub:${w.id}:${v}`,
        label: `▸ ${h(v)}`,
        x: H.x,
        y: E,
        w: qt - 20,
        h: Pe,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: w.id,
        tooltip: `Subgrupo ${h(v)} — Supr lo desanida (el grupo sigue existiendo)`
      }), E += Pe + dt;
  }
  for (const w of m)
    for (const A of w.buttons ?? [])
      !A.useCaseId || !e.modules.some((q) => (q.useCases ?? []).some((H) => H.id === A.useCaseId)) || (l.set(A.useCaseId, {
        label: n(A.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${w.id}:${A.id}`,
        sourceId: `gbtn:${w.id}:${A.id}`,
        targetId: A.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${A.label ?? A.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const w of a) {
    const A = [
      ["toolbar", w.toolbarGroupIds ?? []],
      ["botonera", w.bottomBarGroupIds ?? []]
    ];
    for (const [L, q] of A)
      for (const H of q)
        m.some((I) => I.id === H) && s.push({
          id: `bargrp:${w.id}:${L}:${H}`,
          sourceId: H,
          targetId: w.id,
          kind: "bar-group",
          color: L === "toolbar" ? "#0284c7" : "#7c3aed",
          label: L,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${L} de ${w.name} — Supr lo desengancha`
        });
  }
  let u = 160;
  for (const w of e.models ?? [])
    l.has(w.id) || l.set(w.id, { label: w.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [w, A] of l) {
    const L = t[w] ?? { x: 1050, y: u };
    u = L.y + fi + 46, i.push({
      id: w,
      label: A.label,
      x: L.x,
      y: L.y,
      w: rc,
      h: fi,
      kind: A.kind,
      symbol: A.symbol,
      fill: "#ffffff",
      stroke: A.stroke
    });
  }
  let f = 120;
  for (const w of e.identityProviders ?? []) {
    const A = t[w.id] ?? { x: -320, y: f };
    f = A.y + 70 + 40, i.push({
      id: w.id,
      label: w.name,
      x: A.x,
      y: A.y,
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
    w.identityProviderId && (e.identityProviders ?? []).some((A) => A.id === w.identityProviderId) && s.push({
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
  const b = (e.actorAppUses ?? []).filter(
    (w) => o.some((A) => A.id === w.appId) && (e.actors ?? []).some((A) => A.id === w.actorId)
  ), M = [...new Set(b.map((w) => w.actorId))];
  let R = 160;
  for (const w of M) {
    const A = (e.actors ?? []).find((q) => q.id === w), L = t[w] ?? { x: -60, y: R };
    R = L.y + fi + 46, i.push({
      id: w,
      label: A.name,
      x: L.x,
      y: L.y,
      w: 150,
      h: fi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const w of b)
    s.push({
      id: `actorapp:${w.actorId}->${w.appId}`,
      sourceId: w.actorId,
      targetId: w.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((w, A) => {
    const L = t[w.id] ?? { x: 1200, y: 120 + A * 90 };
    i.push({
      id: w.id,
      label: w.name,
      x: L.x,
      y: L.y,
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
  const V = new Set(i.map((w) => w.id));
  for (const w of a)
    w.customCodeId && V.has(w.customCodeId) && s.push({
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
    for (const A of w.usedElementIds ?? [])
      V.has(A) && s.push({
        id: `ccuse:${w.id}->${A}`,
        sourceId: w.id,
        targetId: A,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${w.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: i, edges: s };
}
const uo = 188, mo = 34, ho = 10, gi = 24, fo = 6;
function Ii(e, t) {
  return `fld:${e}:${t}`;
}
function es(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function pc(e, t) {
  const i = [], s = [], o = e.models ?? [], a = e.modelMappings ?? [], n = (m) => {
    var h;
    return ((h = o.find((d) => d.id === m)) == null ? void 0 : h.name) ?? m ?? "?";
  };
  o.forEach((m, h) => {
    const d = t[m.id] ?? { x: 200 + h % 5 * 260, y: 160 + Math.floor(h / 5) * 220 }, u = m.fields ?? [], f = mo + (u.length ? u.length * gi + (u.length - 1) * fo : 10) + ho;
    i.push({
      id: m.id,
      label: m.name,
      x: d.x,
      y: d.y,
      w: uo,
      h: f,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), u.forEach((b, M) => {
      i.push({
        id: Ii(m.id, b.id),
        label: b.name,
        x: d.x,
        y: d.y - f / 2 + mo + M * (gi + fo) + gi / 2,
        w: uo - 2 * ho,
        h: gi,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: b.type ?? void 0,
        parentId: m.id,
        tooltip: `${b.name}${b.type ? ` (${b.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((m, h) => {
    const d = t[m.id] ?? { x: 200 + h % 5 * 260, y: 60 };
    i.push({
      id: m.id,
      label: m.name,
      x: d.x,
      y: d.y,
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
  }), (e.customCodes ?? []).forEach((m, h) => {
    const d = t[m.id] ?? { x: 120 + h % 5 * 220, y: 60 };
    i.push({
      id: m.id,
      label: m.name,
      x: d.x,
      y: d.y,
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
  const r = new Set(i.map((m) => m.id)), l = (m) => m.fieldId ? Ii(m.modelId, m.fieldId) : m.modelId;
  for (const m of e.transformations ?? [])
    m.customCodeId && r.has(m.customCodeId) && r.has(m.id) && s.push({
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
    m.customCodeId && r.has(m.customCodeId) && m.targetModelId && r.has(m.targetModelId) && s.push({
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
    for (const h of m.inputs ?? []) {
      const d = l(h);
      r.has(d) && s.push({
        id: `tfin:${m.id}:${h.modelId}:${h.fieldId ?? ""}`,
        sourceId: d,
        targetId: m.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${m.name} — Supr la desconecta`
      });
    }
    m.output && r.has(l(m.output)) && s.push({
      id: `tfout:${m.id}`,
      sourceId: m.id,
      targetId: l(m.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${m.name} — Supr la desconecta`
    });
  }
  for (const m of a)
    if (!(!m.sourceModelId || !m.targetModelId) && !(!r.has(m.sourceModelId) || !r.has(m.targetModelId))) {
      s.push({
        id: `mapping:${m.id}`,
        sourceId: m.sourceModelId,
        targetId: m.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: m.name,
        arrow: !0,
        tooltip: `${m.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const h of m.rules ?? []) {
        const d = Ii(m.sourceModelId, h.sourceFieldId ?? ""), u = Ii(m.targetModelId, h.targetFieldId ?? "");
        !r.has(d) || !r.has(u) || s.push({
          id: `maprule:${m.id}:${h.id}`,
          sourceId: d,
          targetId: u,
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
  ), g = new Map(
    e.modules.flatMap((m) => (m.useCases ?? []).map((h) => [h.id, h]))
  ), y = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const h of m.buttons ?? []) {
        if (!h.useCaseId || h.mappingId) continue;
        const d = g.get(h.useCaseId);
        if (!(d != null && d.inputModelId) || d.inputModelId === m.modelId) continue;
        const u = `${m.modelId}->${d.inputModelId}`;
        p.has(u) || y.has(u) || (y.add(u), !(!r.has(m.modelId) || !r.has(d.inputModelId)) && s.push({
          id: `mapgap:${m.id}:${h.useCaseId}`,
          sourceId: m.modelId,
          targetId: d.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${h.label}» (página ${m.name}) llama a ${d.name}: falta mapear ${n(m.modelId)} → ${n(d.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function uc(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), s = new i(), a = {
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
  }, n = await s.layout(a), r = {};
  for (const l of n.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var mc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, Ve = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? hc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && mc(t, i, o), o;
};
const fc = /* @__PURE__ */ new Set([
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
let Re = class extends Fe {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, n;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus(), (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (n = t == null ? void 0 : t.closest) == null ? void 0 : n.call(t, ".h3");
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
      const s = e.shiftKey || this._space || e.button === 1, o = s ? null : this.plateAt(e);
      this._drag = {
        mode: o ? "node" : s ? "pan" : "orbit",
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
      var s, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const n = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), r = (o = n == null ? void 0 : n.closest) == null ? void 0 : o.call(n, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = l !== this._connect.sourceId ? l : null;
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
      var s, o;
      const t = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), i = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".n3")) ?? this.plateAt(e);
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
    const i = e / this._kUsed, s = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), o = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(o) + s * Math.sin(o),
      y: -i * Math.sin(o) + s * Math.cos(o)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var s, o, a;
    const i = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e, t);
    return ((a = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), s = i.width * 0.5, o = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const n = new DOMMatrix().translate(s, o).multiply(a).translate(-s, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = n.transformPoint(new DOMPoint(0, 0, 0, 1)), l = n.transformPoint(new DOMPoint(1, 0, 0, 0)), p = n.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, y = t - i.top, m = l.x - g * l.w, h = p.x - g * p.w, d = l.y - y * l.w, u = p.y - y * p.w, f = g * r.w - r.x, b = y * r.w - r.y, M = m * u - h * d;
    return M ? { x: (f * u - h * b) / M, y: (m * b - f * d) / M } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const o = t.get(s.id);
      if (o !== void 0) return o;
      const a = s.parentId ? e.get(s.parentId) : void 0, n = a ? i(a) + 1 : 0;
      return t.set(s.id, n), n;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return S`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((f) => [f.id, f])), s = Math.min(...e.map((f) => f.x - f.w / 2)) - 60, o = Math.max(...e.map((f) => f.x + f.w / 2)) + 60, a = Math.min(...e.map((f) => f.y - f.h / 2)) - 60, n = Math.max(...e.map((f) => f.y + f.h / 2)) + 60, r = (s + o) / 2, l = (a + n) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (o - s), p.height / (n - a), 1) * 0.9 : 0.5, y = this._k * g;
    this._kUsed = y, this._center = { x: r, y: l };
    const m = 30, h = this._liveMove, d = (f) => f.x + ((h == null ? void 0 : h.id) === f.id ? h.dx : 0), u = (f) => f.y + ((h == null ? void 0 : h.id) === f.id ? h.dy : 0);
    return S`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${y}, ${y}, ${y}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${a}px"
            width=${o - s}
            height=${n - a}
            viewBox="${s} ${a} ${o - s} ${n - a}"
          >
            ${this.scene.edges.map((f) => {
      const b = i.get(f.sourceId), M = i.get(f.targetId);
      return !b || !M ? "" : te`<line
                x1=${d(b)} y1=${u(b)} x2=${d(M)} y2=${u(M)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((f) => {
      const b = i.get(f.sourceId), M = i.get(f.targetId);
      if (!b || !M) return "";
      const R = (t.get(b.id) ?? 0) * m + 2, V = (t.get(M.id) ?? 0) * m + 2, O = d(M) - d(b), T = u(M) - u(b), x = V - R, z = Math.hypot(O, T), w = Math.hypot(z, x), A = Math.atan2(T, O) * 180 / Math.PI, L = Math.atan2(x, z) * 180 / Math.PI, q = f.color ?? "#64748b", H = f.dashed ? `repeating-linear-gradient(90deg, ${q} 0 6px, transparent 6px 10px)` : q;
      return S`<div
              class="edge3"
              style="
                left: ${d(b)}px; top: ${u(b)}px; width: ${w}px; height: 1.7px;
                transform: translateZ(${R}px) rotateZ(${A}deg) rotateY(${-L}deg);
                background: ${H};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((f) => {
      const b = t.get(f.id) ?? 0, M = f.container || b === 0, R = this._hoverTargetId === f.id;
      return S`
              <div
                class="n3 ${f.container ? "container3" : ""} ${this.selectedId === f.id ? "selected3" : ""} ${R ? "hover3" : ""}"
                data-node-id=${f.id}
                data-kind=${f.kind}
                title=${f.tooltip ?? f.label}
                style="
                  left: ${d(f) - f.w / 2}px; top: ${u(f) - f.h / 2}px;
                  width: ${f.w}px; height: ${f.h}px;
                  transform: translateZ(${b * m + (R ? 8 : 0)}px)${R ? " scale(1.06)" : ""};
                  background: ${f.container ? "color-mix(in srgb, " + (f.fill ?? "#ffffff") + " 82%, transparent)" : f.fill ?? "#ffffff"};
                  border-color: ${f.stroke ?? "#64748b"};
                  border-style: ${f.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${M ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${f.badge ? S`<span class="badge3" style="color: ${f.stroke ?? "#94a3b8"}">${f.badge}</span>` : ""}
                <span>${f.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const f = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!f || !fc.has(f.kind)) return "";
      const b = (t.get(f.id) ?? 0) * m + 4;
      return [
        [d(f) + f.w / 2, u(f)],
        [d(f) - f.w / 2, u(f)],
        [d(f), u(f) + f.h / 2],
        [d(f), u(f) - f.h / 2]
      ].map(
        ([R, V]) => S`<div
                class="h3"
                data-source-id=${f.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${R}px; top: ${V}px; transform: translateZ(${b}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? S`<svg class="rubber">
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
Re.styles = It`
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
Ve([
  ne({ attribute: !1 })
], Re.prototype, "scene", 2);
Ve([
  ne({ attribute: !1 })
], Re.prototype, "selectedId", 2);
Ve([
  ne({ attribute: !1 })
], Re.prototype, "connectable", 2);
Ve([
  U()
], Re.prototype, "_rx", 2);
Ve([
  U()
], Re.prototype, "_rz", 2);
Ve([
  U()
], Re.prototype, "_k", 2);
Ve([
  U()
], Re.prototype, "_pan", 2);
Ve([
  U()
], Re.prototype, "_liveMove", 2);
Ve([
  U()
], Re.prototype, "_connect", 2);
Ve([
  U()
], Re.prototype, "_hoverTargetId", 2);
Re = Ve([
  yt("modux-tilt")
], Re);
var gc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Ie = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ic(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && gc(t, i, o), o;
};
const go = [
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
let ae = class extends Fe {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? S`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? S`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? S`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? S`<div class="control">••••••••</div>` : t === "email" ? S`<div class="control">nombre@dominio.com</div>` : t === "money" ? S`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? S`<div class="control">──────●──</div>` : t === "stars" ? S`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? S`<div class="control area">🖼</div>` : t === "link" ? S`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? S`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? S`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? S`<div class="control" style="justify-content:flex-end">0</div>` : S`<div class="control">Texto…</div>`;
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
    const i = (o) => {
      for (const a of o ?? [])
        a.id === e && (t = a), i(a.children);
    };
    return i((s = this.page) == null ? void 0 : s.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var s;
    let t = null;
    const i = (o, a) => {
      for (const n of o ?? [])
        n.id === e && (t = a), i(n.children, n);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const s = (n) => {
      n.id === e && (i = !0);
      for (const r of n.children ?? []) s(r);
    }, o = (n) => {
      for (const r of n ?? [])
        r.id === t ? s(r) : o(r.children);
    };
    return o((a = this.page) == null ? void 0 : a.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], s = i.findIndex((a) => a.id === e);
    return s >= 0 ? i[s + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), s = (t.clientY - i.top) / Math.max(1, i.height);
    return ae.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const n = (e.children ?? []).filter((l) => l.kind === "tab"), r = n.find((l) => l.id === this._activeTabs[e.id]) ?? n[0];
      r && (e = r);
    }
    if (t === "into" && !ae.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var a, n;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const r = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!r) return;
      let l;
      try {
        l = JSON.parse(r);
      } catch {
        return;
      }
      if (!l.componentId || !l.pageId || l.pageId === ((n = this.page) == null ? void 0 : n.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: l.pageId, componentId: l.componentId, ...p });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var l, p, g;
    const t = e.children ?? [], i = (y) => y.map((m) => this.renderComponent(m)), s = S`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = S`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const y = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        o = S`<div class="row-lay">
          <div class="col-lay">${y.length ? i(y) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = S`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = S`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const y = t.filter((h) => h.kind === "tab"), m = y.find((h) => h.id === this._activeTabs[e.id]) ?? y[0];
        o = S`
          <div class="tabbar">
            ${y.map(
          (h, d) => S`<span
                class=${h === m ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: h.id }, this.emitEvent("component-selected", { componentId: h.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...h };
          }}
                @dragstart=${(u) => {
            var f, b;
            u.stopPropagation(), this._dragCmpId = h.id, (b = u.dataTransfer) == null || b.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: h.id })
            );
          }}
                @dragover=${(u) => {
            var f;
            ((f = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : f.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var V, O;
            const f = this._dragCmpId;
            if (!f || f === h.id || ((V = this.nodeById(f)) == null ? void 0 : V.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const b = u.currentTarget.getBoundingClientRect(), R = u.clientX - b.left < b.width / 2 ? h.id : ((O = y[d + 1]) == null ? void 0 : O.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, R !== f && this.emitEvent("component-moved", {
              componentId: f,
              toParentId: e.id,
              beforeComponentId: R
            });
          }}
                >${h.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${m ? this.renderComponent(m) : s}`;
        break;
      }
      case "tab":
        o = S`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        o = S`<div class="col-lay">
          ${t.length ? t.map(
          (y, m) => S`
                  <div class="acc-bar"><span>${y.title ?? y.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(y) : oe}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        o = S`<div class="card-box">
          ${e.title ? S`<div class="card-title">${e.title}</div>` : oe}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        o = S`<div class="grid3-lay">
          ${t.length ? t.map((y) => S`<div class="board-col">${this.renderComponent(y)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [y, ...m] = t;
        o = S`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${y ? this.renderComponent(y) : S`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? i(m) : S`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = S`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        o = S`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = S`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const m = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = m.length ? S`<div class="grid-lay">
              ${m.slice(0, 6).map(
          (h) => S`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${h.label ?? h.name}</label>${this.control(h)}</div>`
        )}
            </div>` : S`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const y = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = S`<table>
            <tr>${y.length ? y.map((m) => S`<th>${m.label ?? m.name}</th>`) : S`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => S`<tr>${(y.length ? y : [1, 2, 3]).map(() => S`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? oe : S`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = S`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const y = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = S`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(y)}`;
        break;
      }
      case "text":
        o = S`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = S`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = S`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = S`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const a = ae.LEAF_KINDS.has(e.kind), n = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (y) => {
      var m, h;
      y.stopPropagation(), this._dragCmpId = e.id, (h = y.dataTransfer) == null || h.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), y.dataTransfer && (y.dataTransfer.effectAllowed = "move");
    };
    return S`<div
      class="cmp ${a ? "leafcmp" : ""} ${n ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(y) => {
      y.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(y) => {
      y.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${r}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(y) => {
      var h;
      y.preventDefault(), y.stopPropagation();
      const m = ((h = y.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, y) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(y) => {
      var m, h, d;
      this._foreignOver = !1, !(!this._dragCmpId && !((d = (h = (m = y.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : h.includes) != null && d.call(h, "application/x-modux-cmp"))) && (y.preventDefault(), y.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, y));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${r}
        >${ae.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return S`
        ${i ? S`<table>
              <tr>${t.slice(0, 4).map((s) => S`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => S`<tr>${t.slice(0, 4).map(() => S`<td>···</td>`)}</tr>`)}
            </table>` : oe}
        ${t.length ? S`<div class="grid">
              ${t.map(
      (s) => S`
                  <div
                    class="field ${s.colspan === 2 ? "span2" : ""} ${this._overId === s.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${s.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(s)}
                    @dragstart=${(o) => {
        o.stopPropagation(), this._dragId = s.fieldId;
      }}
                    @dragover=${(o) => {
        o.preventDefault(), this._overId = s.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(o) => {
        o.preventDefault(), o.stopPropagation(), this.onDrop(s.fieldId);
      }}
                  >
                    <label>${s.label ?? s.name}</label>
                    ${this.control(s)}
                  </div>
                `
    )}
            </div>` : S`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, a, n, r;
    const e = this._cmp;
    if (!e) return oe;
    const t = (l) => this._cmp = { ...this._cmp, ...l }, i = e.kind, s = [
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
    return S`<div class="pop" @click=${(l) => l.stopPropagation()}>
      ${s ? S`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(l) => t({ title: l.target.value })} />` : oe}
      ${i === "text" ? S`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(l) => t({ text: l.target.value })} />` : oe}
      ${i === "button" || i === "field" ? S`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(l) => t({ label: l.target.value })} />` : oe}
      ${i === "button" ? S`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? S`<span class="chip">${((o = this.useCases.find((l) => l.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : S`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? S`<span class="chip"
                      >${((a = this.mappings.find((l) => l.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : S`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : oe}
      ${i === "form" ? S`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? S`<span class="chip"
                      >${((n = this.models.find((l) => l.id === e.modelId)) == null ? void 0 : n.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : S`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : oe}
      ${i === "listing" ? S`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? S`<span class="chip"
                      >${((r = this.queryOps.find((l) => l.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : S`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : oe}
      ${i === "field" ? S`<label>Estereotipo</label>
            <select @change=${(l) => t({ stereotype: l.target.value || void 0 })}>
              ${go.map((l) => S`<option value=${l} ?selected=${l === (e.stereotype ?? "regular")}>${l}</option>`)}
            </select>` : oe}
      ${i === "tabLayout" ? S`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : oe}
      <div class="actions">
        <button
          @click=${() => {
      const l = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: l });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const l = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: l.id,
        title: l.title ?? null,
        text: l.text ?? null,
        label: l.label ?? null,
        useCaseId: l.useCaseId ?? null,
        mappingId: l.mappingId ?? null,
        modelId: l.modelId ?? null,
        queryServiceId: l.queryServiceId ?? null,
        queryOperationId: l.queryOperationId ?? null,
        fieldId: l.fieldId ?? null,
        stereotype: l.stereotype ?? null,
        colspan: l.colspan ?? null
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), s = i.indexOf(t), o = i.indexOf(e);
    s < 0 || o < 0 || (i.splice(o, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return oe;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, s = e.type === "WIZARD";
    return S`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? S`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : S`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? S`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : S`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => S`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? oe : S`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? S`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : S`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? S`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const n = (e.wizardSteps ?? []).map((l, p) => l.id ?? l.pageId ?? String(p)), r = n[a];
      return S`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(l) => {
        l.stopPropagation(), this._dragWizKey = r;
      }}
                      @dragover=${(l) => {
        this._dragWizKey && (l.preventDefault(), l.stopPropagation());
      }}
                      @drop=${(l) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === r) return;
        l.preventDefault(), l.stopPropagation();
        const g = l.currentTarget.getBoundingClientRect(), m = l.clientX - g.left < g.width / 2 ? r : n[a + 1] ?? null;
        m !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: m });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : S`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : oe}
        ${(e.content ?? []).length ? S`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => S`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? oe : S`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, n, r;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
      return S`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((n = this.useCases.find((l) => l.id === this._btn.useCaseId)) == null ? void 0 : n.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(l) => this._btn = { ...this._btn, label: l.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? S`<span class="chip"
                        >${((r = this.mappings.find((l) => l.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : S`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? S`<button
                      @click=${() => {
        const l = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: l });
      }}
                    >
                      Quitar
                    </button>` : oe}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : oe}
      ${this._editing ? S`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${go.map(
      (o) => S`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
          </div>` : oe}
    `;
  }
};
ae.styles = It`
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
ae.KIND_LABELS = {
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
ae.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "page", 2);
Ie([
  ne({ type: Boolean, reflect: !0 })
], ae.prototype, "framed", 2);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "models", 2);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "mappings", 2);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "useCases", 2);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "queryOps", 2);
Ie([
  ne({ attribute: !1 })
], ae.prototype, "selectedCmpId", 2);
Ie([
  U()
], ae.prototype, "_editing", 2);
Ie([
  U()
], ae.prototype, "_dragId", 2);
Ie([
  U()
], ae.prototype, "_overId", 2);
Ie([
  U()
], ae.prototype, "_rename", 2);
Ie([
  U()
], ae.prototype, "_route", 2);
Ie([
  U()
], ae.prototype, "_btn", 2);
Ie([
  U()
], ae.prototype, "_cmp", 2);
Ie([
  U()
], ae.prototype, "_dragCmpId", 2);
Ie([
  U()
], ae.prototype, "_dragWizKey", 2);
Ie([
  U()
], ae.prototype, "_overCmpId", 2);
Ie([
  U()
], ae.prototype, "_overCmpPos", 2);
Ie([
  U()
], ae.prototype, "_foreignOver", 2);
Ie([
  U()
], ae.prototype, "_activeTabs", 2);
ae = Ie([
  yt("modux-page-designer")
], ae);
var yc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Oe = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? vc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && yc(t, i, o), o;
};
const rn = 460, bc = 540, wc = 660;
let Se = class extends Fe {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId, n = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: n.w, h0: n.h }, e.preventDefault();
        return;
      }
      const s = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-title");
      });
      if (s) {
        const a = s.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: a }), e.preventDefault();
          return;
        }
        const n = this.pages.findIndex((l) => l.id === a), r = this.posOf(a, n);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * o));
      this._t = {
        k: a,
        x: i - (i - this._t.x) / this._t.k * a,
        y: s - (s - this._t.y) / this._t.k * a
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
    var g, y, m, h, d, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (m = a == null ? void 0 : a.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), r = (h = n == null ? void 0 : n.closest) == null ? void 0 : h.call(n, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${o}:${r.dataset.btnUc}`;
    const l = (d = n == null ? void 0 : n.closest) == null ? void 0 : d.call(n, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${o}:${l.dataset.bar}`;
    const p = (u = n == null ? void 0 : n.closest) == null ? void 0 : u.call(n, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, h, d, u;
    const i = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), s = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (d = a == null ? void 0 : a.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), r = (u = n == null ? void 0 : n.closest) == null ? void 0 : u.call(n, "[data-cmp-id]");
    if (!r) return { pageId: o, componentId: null, pos: "into" };
    const l = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), y = ae.LEAF_KINDS.has(l) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: r.dataset.cmpId, pos: y };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: rn, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * bc, y: Math.floor(t / 3) * wc };
  }
  render() {
    return S`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), s = this.sizeOf(e.id);
      return S`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${s.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${s.h}px; width: ${s.w}px"
                .page=${e}
                .selectedCmpId=${((a = this.selectedCmp) == null ? void 0 : a.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                @component-config-changed=${(n) => {
        n.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...n.detail });
      }}
                @component-removed=${(n) => {
        n.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...n.detail });
      }}
                @component-moved=${(n) => {
        n.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...n.detail });
      }}
                @component-selected=${(n) => {
        n.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...n.detail });
      }}
                @component-transferred=${(n) => {
        n.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...n.detail });
      }}
                @wizard-step-moved=${(n) => {
        n.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...n.detail });
      }}
                @page-renamed=${(n) => {
        n.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...n.detail });
      }}
                @page-type-changed=${(n) => {
        n.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...n.detail });
      }}
                @page-route-changed=${(n) => {
        n.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...n.detail });
      }}
                @page-model-changed=${(n) => {
        n.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...n.detail });
      }}
                @button-added=${(n) => this.emit("page-button-added", { pageId: e.id, ...n.detail })}
                @button-changed=${(n) => this.emit("page-button-changed", { pageId: e.id, ...n.detail })}
                @button-removed=${(n) => this.emit("page-button-removed", { pageId: e.id, ...n.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(n) => this.emit("page-field-config-changed", { pageId: e.id, ...n.detail })}
                @fields-reordered=${(n) => this.emit("page-fields-reordered", { pageId: e.id, ...n.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : S`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Se.styles = It`
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
      width: ${rn}px;
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
Oe([
  ne({ attribute: !1 })
], Se.prototype, "pages", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "layout", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "sizes", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "selectedId", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "selectedIds", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "models", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "mappings", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "useCases", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "queryOps", 2);
Oe([
  ne({ attribute: !1 })
], Se.prototype, "selectedCmp", 2);
Oe([
  U()
], Se.prototype, "_t", 2);
Oe([
  U()
], Se.prototype, "_live", 2);
Oe([
  U()
], Se.prototype, "_liveSize", 2);
Se = Oe([
  yt("modux-figma")
], Se);
var xc = Object.defineProperty, kc = Object.getOwnPropertyDescriptor, Je = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? kc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && xc(t, i, o), o;
};
const _c = {
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
}, ts = {
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
}, $c = {
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
}, Io = [30, 20, 13, 9.5, 7.5], yo = [0, 180, 118, 80, 58], Ec = 0.055, Sc = 0.86, Cc = 2600, yi = 240, vo = 0.16, bo = 0.015;
let Ee = class extends Fe {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this._motion = 1, this._threads = !1, this._viewNaming = !1, this._viewName = "", this.frame = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this.saveState(), cancelAnimationFrame(this.raf), (e = this.ro) == null || e.disconnect();
  }
  saveState() {
    if (!this.root) return;
    const e = {}, t = (i) => {
      e[i.key] = { e: i.expanded ? 1 : 0, x: Math.round(i.x), y: Math.round(i.y) };
      for (const s of i.children ?? []) t(s);
    };
    t(this.root);
    try {
      sessionStorage.setItem(Ee.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(Ee.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam);
      for (const [i, s] of Object.entries(t.nodes ?? {})) {
        const o = {
          key: i,
          refId: "",
          kind: "",
          label: "",
          color: "",
          depth: 0,
          expanded: s.e === 1,
          x: s.x,
          y: s.y,
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
    this.canvas = this.renderRoot.querySelector("canvas") ?? void 0, this.ctx = ((e = this.canvas) == null ? void 0 : e.getContext("2d")) ?? void 0, this.loadState(), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(this), this.resize(), this.buildTree(), this.raf = requestAnimationFrame(() => this.tick());
  }
  /** Centers the visible tree in the viewport (the toolbar's «Ajustar»). */
  fit() {
    const e = this.visible();
    if (!e.length) return;
    let t = 1 / 0, i = 1 / 0, s = -1 / 0, o = -1 / 0;
    for (const y of e)
      t = Math.min(t, y.x), i = Math.min(i, y.y), s = Math.max(s, y.x), o = Math.max(o, y.y);
    const a = 70, n = this.clientWidth || 800, r = this.clientHeight || 600, l = s - t + a * 2, p = o - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(n / l, r / p)));
    this.cam.k = g, this.cam.x = n / 2 - (t + s) / 2 * g, this.cam.y = r / 2 - (i + o) / 2 * g;
  }
  updated(e) {
    e.has("model") && this.buildTree();
  }
  resize() {
    var s;
    if (!this.canvas) return;
    const e = window.devicePixelRatio || 1, t = this.clientWidth || 800, i = this.clientHeight || 600;
    this.canvas.width = t * e, this.canvas.height = i * e, (s = this.ctx) == null || s.setTransform(e, 0, 0, e, 0, 0), this.cam.x === 0 && this.cam.y === 0 && (this.cam.x = t / 2, this.cam.y = i / 2);
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
    const t = (i, s) => {
      !i || !s || i === s || (this.related.has(i) || this.related.set(i, /* @__PURE__ */ new Set()), this.related.has(s) || this.related.set(s, /* @__PURE__ */ new Set()), this.related.get(i).add(s), this.related.get(s).add(i));
    };
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
  makeNode(e, t, i, s, o) {
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, n = this.prevByKey.get(a), r = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: _c[e] ?? "#64748b",
      depth: s,
      parent: o,
      expanded: (n == null ? void 0 : n.expanded) ?? !1,
      x: (n == null ? void 0 : n.x) ?? (o ? o.x + r() : 0),
      y: (n == null ? void 0 : n.y) ?? (o ? o.y + r() : 0),
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
    const t = this.model, i = e.depth + 1, s = (o, a, n) => this.makeNode(o, a, n, i, e);
    switch (e.kind) {
      case "root":
        return [
          ...t.modules.map((o) => s("module", o.id, o.name)),
          ...t.externalSystems.map((o) => s("external-system", o.id, o.name)),
          ...(t.uiApps ?? []).map((o) => s("ui-app", o.id, o.name)),
          ...(t.actors ?? []).map((o) => s("actor", o.id, o.name)),
          ...(t.aiAgents ?? []).filter((o) => !o.external).map((o) => s("ai-agent", o.id, o.name)),
          ...(t.workflows ?? []).map((o) => s("workflow", o.id, o.name)),
          ...(t.identityProviders ?? []).map((o) => s("identity-provider", o.id, o.name))
        ];
      case "module": {
        const o = t.modules.find((p) => p.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((p) => p.moduleId === e.refId), n = o.useCases ?? [], r = new Set(a.map((p) => p.id)), l = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [s("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...n.length ? [s("group", `use-cases:${e.refId}`, `Casos de uso · ${n.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !l.has(p.id)).map((p) => s("domain-event", p.id, p.name)),
          ...(o.applicationEvents ?? []).map((p) => s("application-event", p.id, p.name)),
          ...(o.readModels ?? []).map((p) => s("read-model", p.id, p.name)),
          ...(o.domainServices ?? []).map((p) => s("domain-service", p.id, p.name)),
          ...(o.queryServices ?? []).map((p) => s("query-service", p.id, p.name)),
          ...(o.scheduledTriggers ?? []).map((p) => s("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("document", p.id, p.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), n = e.refId.slice(o + 1), r = t.modules.find((l) => l.id === n);
        return r ? a === "aggregates" ? (t.aggregates ?? []).filter((l) => l.moduleId === n).map((l) => s("aggregate", l.id, l.name)) : (r.useCases ?? []).map((l) => s(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => s("entity", a.id, a.name)),
          ...t.modules.flatMap((a) => a.domainEvents ?? []).filter((a) => o.has(a.id)).map((a) => s("domain-event", a.id, a.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((a) => a.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((a) => a.publishedByExternalSystemId === e.refId).map((a) => s("api", a.id, a.name)),
          ...(o.useCases ?? []).map((a) => s("external-use-case", a.id, a.name)),
          ...(o.tables ?? []).map((a) => s("external-table", a.id, a.name)),
          ...(o.mcpServers ?? []).map((a) => s("mcp-server", a.id, a.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((a) => a.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((a) => s("api-operation", a.id, a.name));
      }
      case "ui-app": {
        const o = (t.uiApps ?? []).find((r) => r.id === e.refId);
        if (!o) return [];
        const a = /* @__PURE__ */ new Set(), n = (r) => {
          for (const l of r ?? [])
            l.pageId && a.add(l.pageId), n(l.children);
        };
        n(o.menuItems);
        for (const r of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          r && a.add(r);
        return [...a].map((r) => (t.pages ?? []).find((l) => l.id === r)).filter((r) => !!r).map((r) => s("page", r.id, r.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (i) => {
      if (!(this.focusKeys && !this.focusKeys.has(i.key)) && (e.push(i), i.expanded))
        for (const s of i.children ?? []) t(s);
    };
    return this.root && t(this.root), e;
  }
  /** Every node expanded down to `levels` (0 = todo plegado); focus clears. */
  applyLevels(e) {
    this.focusKeys = void 0;
    const t = (i) => {
      if (i.children || (i.children = this.childrenOf(i)), i.expanded = i.depth < e && i.children.length > 0, i.expanded) for (const s of i.children) t(s);
    };
    this.root && t(this.root), this.saveState();
  }
  /** A curated view out of the CURRENT picture: whatever is unfolded, as members. */
  createViewFromVisible() {
    const e = this._viewName.trim();
    if (!e) return;
    const t = this.visible().filter((i) => i.kind !== "root" && i.kind !== "group" && i.refId).map((i) => ({ id: i.refId, kind: i.kind }));
    this._viewNaming = !1, this._viewName = "", this.dispatchEvent(
      new CustomEvent("explorer-create-view", {
        detail: { name: e, members: t },
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
    const t = /* @__PURE__ */ new Set(), i = (n) => {
      for (let r = n; r; r = r.parent) t.add(r.key);
    }, s = (n) => {
      t.add(n.key);
      for (const r of n.children ?? []) s(r);
    };
    i(e), s(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const n of this.allNodes)
        n.refId && o.has(n.refId) && i(n);
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
    for (const n of e) {
      if (n.parent) {
        const r = (yo[Math.min(n.depth, yo.length - 1)] ?? 60) + Math.min(60, ((((a = n.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let l = n.x - n.parent.x, p = n.y - n.parent.y, g = Math.hypot(l, p);
        if (g < 0.01) {
          const d = Math.random() * Math.PI * 2;
          l = Math.cos(d) * 0.1, p = Math.sin(d) * 0.1, g = 0.1;
        }
        const y = Ec * (g - r), m = l / g * y, h = p / g * y;
        n.vx -= m, n.vy -= h, n.parent.vx += m * 0.4, n.parent.vy += h * 0.4;
      } else
        n.vx -= n.x * bo, n.vy -= n.y * bo;
      !this.reducedMotion && this._motion > 0 && (n.vx += Math.sin(t * n.f1 * Math.PI * 2 + n.p1) * vo * this._motion, n.vy += Math.cos(t * n.f2 * Math.PI * 2 + n.p2) * vo * this._motion);
    }
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (let l = n + 1; l < e.length; l++) {
        const p = e[l], g = p.x - r.x, y = p.y - r.y;
        if (Math.abs(g) > yi || Math.abs(y) > yi) continue;
        const m = g * g + y * y;
        if (m > yi * yi || m < 0.01) continue;
        const h = Math.sqrt(m), d = r.depth <= 1 && p.depth <= 1 ? 3 : 1, u = Cc * d / m, f = g / h * u, b = y / h * u;
        r.vx -= f, r.vy -= b, p.vx += f, p.vy += b;
      }
    }
    const i = this._motion, s = Sc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const n of e) {
      if (n === this.dragNode) {
        n.vx = 0, n.vy = 0;
        continue;
      }
      n.vx *= s, n.vy *= s;
      const r = Math.hypot(n.vx, n.vy);
      if (r > 14 && (n.vx = n.vx / r * 14, n.vy = n.vy / r * 14), o > 0 && r < o) {
        n.vx = 0, n.vy = 0;
        continue;
      }
      n.x += n.vx, n.y += n.vy;
      const l = n === this.hover ? 1.75 : 1;
      n.scale += (l - n.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Io[Math.min(e.depth, Io.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, n;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, s = this.clientHeight;
    t.clearRect(0, 0, i, s), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const r of e)
      r.parent && (t.strokeStyle = r.color + "55", t.beginPath(), t.moveTo(r.parent.x, r.parent.y), t.lineTo(r.x, r.y), t.stroke());
    const o = (r) => `${r}px system-ui, sans-serif`;
    for (const r of e) {
      const l = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, l, 0, Math.PI * 2), t.fillStyle = r.expanded ? r.color + "22" : "#ffffff", t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, l);
      const p = ((a = r.children) == null ? void 0 : a.length) ?? 0;
      if (!r.expanded && p > 0) {
        const y = Math.max(7, l * 0.42), m = r.x + l * 0.75, h = r.y + l * 0.75;
        t.beginPath(), t.arc(m, h, y, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(y * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), m, h + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const y = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${o(12)}` : o(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(y, r.x, r.y + l + 4);
      }
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const r = this.found.node, l = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, l * 1.6), t.strokeStyle = r.color, t.lineWidth = 2.2 / this.cam.k;
        const p = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 9 + p, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 18 + p * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (this._threads)
      for (const r of e) this.drawThreads(t, r, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((n = this.hover.children) != null && n.length) && this.drawGhosts(t, this.hover), this.linking) {
      const r = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
    }
    t.restore(), this.hover && !this.linking && this.drawCard(t, this.hover, i, s);
  }
  /**
   * Cross-relations as faint threads: hovering a node reveals what it talks
   * to across the tree (calls, events, actor uses, IdP trust…) without
   * cluttering the resting picture. Only threads to visible nodes are drawn.
   */
  drawThreads(e, t, i) {
    const s = this.related.get(t.refId);
    if (!(s != null && s.size)) return;
    const o = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(o <= 0.02)) {
      e.save(), e.globalAlpha = o, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const a of i) {
        if (a === t || !s.has(a.refId) || a === t.parent || a.parent === t) continue;
        const n = (t.x + a.x) / 2, r = (t.y + a.y) / 2, l = a.x - t.x, p = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(n - p * g, r + l * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], s = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const n = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, s.forEach((p, g) => {
      const y = r - l / 2 + l * (g + 0.5) / s.length, m = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, h = t.x + Math.cos(y) * (n + m), d = t.y + Math.sin(y) * (n + m);
      e.beginPath(), e.arc(h, d, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > s.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + l / 2 + 0.35;
      e.fillText(`+${i.length - s.length}`, t.x + Math.cos(p) * n, t.y + Math.sin(p) * n);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const s = i * 0.42;
    if (s < 3.2) return;
    const { x: o, y: a } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, s * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "group": {
        e.arc(o - s * 0.45, a, s * 0.16, 0, Math.PI * 2), e.moveTo(o + s * 0.16, a), e.arc(o, a, s * 0.16, 0, Math.PI * 2), e.moveTo(o + s * 0.61, a), e.arc(o + s * 0.45, a, s * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, a, s, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - s * Math.cos(Math.PI * 0.35), a + s * Math.sin(Math.PI * 0.35)), e.arc(o, a, s, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, a, s, 0, Math.PI * 2), e.moveTo(o + s * 0.35, a), e.arc(o, a, s * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "module":
        for (const [n, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + n * s + s * 0.3, a + r * s), e.arc(o + n * s, a + r * s, s * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, a - s), e.lineTo(o + s, a), e.lineTo(o, a + s), e.lineTo(o - s, a), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - s, a - s * 0.8, s * 2, s * 1.6), e.moveTo(o - s, a - s * 0.25), e.lineTo(o + s, a - s * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - s * 0.6, a - s * 0.85), e.lineTo(o + s * 0.85, a), e.lineTo(o - s * 0.6, a + s * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + s * 0.3, a - s), e.lineTo(o - s * 0.5, a + s * 0.15), e.lineTo(o + s * 0.05, a + s * 0.15), e.lineTo(o - s * 0.3, a + s), e.lineTo(o + s * 0.5, a - s * 0.15), e.lineTo(o - s * 0.05, a - s * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, a, s * 0.5, 0, Math.PI * 2);
        for (let n = 0; n < 6; n++) {
          const r = n * Math.PI / 3;
          e.moveTo(o + Math.cos(r) * s * 0.55, a + Math.sin(r) * s * 0.55), e.lineTo(o + Math.cos(r) * s, a + Math.sin(r) * s);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - s * 0.25, a - s * 0.25, s * 0.6, 0, Math.PI * 2), e.moveTo(o + s * 0.25, a + s * 0.25), e.lineTo(o + s, a + s), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, a, s, 0, Math.PI * 2), e.moveTo(o, a - s * 0.55), e.lineTo(o, a), e.lineTo(o + s * 0.45, a + s * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - s * 0.85, a + s * 0.45), e.quadraticCurveTo(o - s * 0.85, a - s, o, a - s), e.quadraticCurveTo(o + s * 0.85, a - s, o + s * 0.85, a + s * 0.45), e.closePath(), e.moveTo(o + s * 0.25, a + s * 0.75), e.arc(o, a + s * 0.75, s * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - s * 0.7, a - s), e.lineTo(o + s * 0.25, a - s), e.lineTo(o + s * 0.7, a - s * 0.55), e.lineTo(o + s * 0.7, a + s), e.lineTo(o - s * 0.7, a + s), e.closePath(), e.moveTo(o + s * 0.25, a - s), e.lineTo(o + s * 0.25, a - s * 0.55), e.lineTo(o + s * 0.7, a - s * 0.55), e.stroke();
        break;
      case "workflow":
        for (const n of [-0.7, 0.1])
          e.moveTo(o + n * s, a - s * 0.7), e.lineTo(o + (n + 0.6) * s, a), e.lineTo(o + n * s, a + s * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - s * 0.45, a - s * 0.45, s * 0.45, 0, Math.PI * 2), e.moveTo(o - s * 0.1, a - s * 0.1), e.lineTo(o + s * 0.9, a + s * 0.9), e.moveTo(o + s * 0.45, a + s * 0.45), e.lineTo(o + s * 0.85, a + s * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, a - s * 0.5, s * 0.42, 0, Math.PI * 2), e.moveTo(o - s * 0.8, a + s), e.quadraticCurveTo(o, a - s * 0.1, o + s * 0.8, a + s), e.stroke();
        break;
      case "ai-agent":
        for (let n = 0; n < 4; n++) {
          const r = n * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(r) * s, a + Math.sin(r) * s), e.moveTo(o, a), e.lineTo(o + Math.cos(r + Math.PI / 4) * s * 0.5, a + Math.sin(r + Math.PI / 4) * s * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - s * 0.45, a + s * 0.15, s * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + s * 0.1, a - s * 0.35, s * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + s * 0.55, a + s * 0.2, s * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [n, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + n * s, a + r * s, s * 0.85, s * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - s, a - s * 0.8, s * 2, s * 1.6), e.moveTo(o - s, a - s * 0.35), e.lineTo(o + s, a - s * 0.35), e.stroke(), e.beginPath(), e.arc(o - s * 0.7, a - s * 0.57, s * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - s * 0.25, a - s), e.lineTo(o - s, a), e.lineTo(o - s * 0.25, a + s), e.moveTo(o + s * 0.25, a - s), e.lineTo(o + s, a), e.lineTo(o + s * 0.25, a + s), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - s, a), e.lineTo(o + s * 0.7, a), e.moveTo(o + s * 0.1, a - s * 0.5), e.lineTo(o + s * 0.8, a), e.lineTo(o + s * 0.1, a + s * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, a + s * 0.25, s * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - s * 0.35, a + s * 0.25), e.lineTo(o - s * 0.35, a - s * 0.7), e.moveTo(o + s * 0.35, a + s * 0.25), e.lineTo(o + s * 0.35, a - s * 0.7), e.stroke();
        break;
      default:
        e.arc(o, a, s * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, s) {
    var x, z;
    const o = (t.children ?? []).flatMap(
      (w) => w.kind === "group" ? w.children ?? (w.children = this.childrenOf(w)) : [w]
    ), a = /* @__PURE__ */ new Map();
    for (const w of o) a.set(w.kind, (a.get(w.kind) ?? 0) + 1);
    const n = [];
    for (const [w, A] of a)
      if (n.push(`${A} ${A === 1 ? (ts[w] ?? w).toLowerCase() : $c[w] ?? w}`), n.length === 4) {
        const L = [...a.keys()].length - 4;
        L > 0 && (n[3] += ` (+${L} tipos más)`);
        break;
      }
    const r = o.slice(0, 6).map((w) => ({ label: w.label.length > 30 ? w.label.slice(0, 29) + "…" : w.label, color: w.color })), l = o.length - r.length, p = t.label, g = ts[t.kind] ?? t.kind, y = ((x = t.children) != null && x.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((z = t.children) != null && z.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const m = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const h = Math.max(
      e.measureText(g).width,
      ...n.map((w) => e.measureText(w).width),
      ...r.map((w) => e.measureText(w.label).width + 12),
      e.measureText(y).width
    ), d = Math.min(300, Math.max(m, h) + 24), u = r.length ? 8 + r.length * 15 + (l > 0 ? 15 : 0) : 0, f = 40 + n.length * 15 + u + (y ? 18 : 0), b = this.radiusOf(t) * this.cam.k, M = this.cam.x + t.x * this.cam.k, R = this.cam.y + t.y * this.cam.k;
    let V = M + b + 14;
    V + d > i - 8 && (V = M - b - 14 - d), V = Math.max(8, Math.min(V, i - d - 8));
    const O = Math.max(8, Math.min(R - 10, s - f - 8));
    e.translate(V, O), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, d, f, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", n.forEach((w, A) => e.fillText(w, 12, 41 + A * 15));
    let T = 41 + n.length * 15 + (r.length ? 8 : 0);
    r.forEach((w) => {
      e.fillStyle = w.color, e.beginPath(), e.arc(15, T + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(w.label, 24, T), T += 15;
    }), l > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${l} más`, 24, T)), y && (e.fillStyle = "#94a3b8", e.fillText(y, 12, f - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = Ee.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && Ee.fold(i.label).includes(t)).slice(0, 8);
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
    const e = this.flight.node, t = this.clientWidth || 800, i = this.clientHeight || 600, s = Math.max(0.9, Math.min(1.2, this.cam.k));
    this.cam.k += (s - this.cam.k) * 0.08, this.cam.x += (t / 2 - e.x * this.cam.k - this.cam.x) * 0.12, this.cam.y += (i / 2 - e.y * this.cam.k - this.cam.y) * 0.12;
  }
  // ── Interaction ───────────────────────────────────────────────────────
  toWorld(e) {
    const t = this.getBoundingClientRect();
    return {
      x: (e.clientX - t.left - this.cam.x) / this.cam.k,
      y: (e.clientY - t.top - this.cam.y) / this.cam.k
    };
  }
  nodeAt(e, t) {
    const i = this.visible();
    for (let s = i.length - 1; s >= 0; s--) {
      const o = i[s], a = this.radiusOf(o) + 4 / this.cam.k;
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
    i ? this.dragNode = i : this.panning = !0;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  onPointerMove(e) {
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 4 && (this.moved = !0), this.linking) {
      const s = this.toWorld(e);
      this.linking.x = s.x, this.linking.y = s.y, this.hover = this.nodeAt(s.x, s.y);
      return;
    }
    if (this.dragNode) {
      const s = this.toWorld(e);
      this.dragNode.x = s.x, this.dragNode.y = s.y;
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
      const i = this.toWorld(e), s = this.nodeAt(i.x, i.y), o = this.linking.source;
      this.linking = void 0, s && s !== o && s.kind !== "root" && o.refId && s.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: o.refId, targetId: s.refId, x: e.clientX, y: e.clientY },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    const t = this.dragNode;
    this.dragNode = void 0, this.panning = !1, t && !this.moved ? e.altKey ? this.focusOn(t) : this.toggle(t) : !t && !this.moved && this.focusKeys && (this.focusKeys = void 0);
  }
  /** Click: the node explodes — children burst out from it and the springs settle. */
  toggle(e) {
    var t;
    if ((t = e.children) != null && t.length && (e.expanded = !e.expanded, e.expanded)) {
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, s = e.parent ? Math.PI * 1.25 : Math.PI * 2, o = e.children;
      o.forEach((a, n) => {
        this.materialize(a.parent);
        const r = i - s / 2 + s * (n + 0.5) / o.length;
        a.x = e.x + Math.cos(r) * 6, a.y = e.y + Math.sin(r) * 6, a.vx = Math.cos(r) * 7, a.vy = Math.sin(r) * 7, a.children || (a.children = this.childrenOf(a));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, s = (e.clientY - t.top - this.cam.y) / this.cam.k, o = this.nodeAt(i, s);
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * o)), n = a / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * n, this.cam.y = s - (s - this.cam.y) * n, this.cam.k = a;
  }
  render() {
    return S`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      <div class="search" @pointerdown=${(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Buscar en el modelo…"
          .value=${this._q}
          @input=${this.onSearchInput}
          @keydown=${this.onSearchKeydown}
        />
        ${this._sugs.length ? S`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => S`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (ts[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? S`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        ${this._viewNaming ? S`
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
            ` : S`<button
              title="Crea una vista modux con los elementos desplegados ahora mismo"
              @click=${() => this._viewNaming = !0}
            >
              ⊞ Vista…
            </button>`}
      </div>
      <div class="hud">
        click: expandir / plegar · alt+click: aislar lo relacionado · doble click: abrir<br />
        shift+arrastrar desde un nodo: trazar una relación hasta otro<br />
        buscar: expande el camino y vuela hasta el nodo<br />
        arrastrar nodo: tirar del subárbol · fondo: mover · rueda: zoom
      </div>
    `;
  }
};
Ee.styles = It`
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
    .search {
      position: absolute;
      left: 12px;
      top: 10px;
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
Ee.STORE_KEY = "modux-explorer-state";
Je([
  ne({ attribute: !1 })
], Ee.prototype, "model", 2);
Je([
  U()
], Ee.prototype, "_q", 2);
Je([
  U()
], Ee.prototype, "_sugs", 2);
Je([
  U()
], Ee.prototype, "_active", 2);
Je([
  U()
], Ee.prototype, "_motion", 2);
Je([
  U()
], Ee.prototype, "_threads", 2);
Je([
  U()
], Ee.prototype, "_viewNaming", 2);
Je([
  U()
], Ee.prototype, "_viewName", 2);
Ee = Je([
  yt("modux-explorer")
], Ee);
var Mc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, ie = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ac(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Mc(t, i, o), o;
};
const us = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Pc = Object.keys(us);
function Ft(e, t, i) {
  const s = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, n = i.y + i.h / 2;
  let r = 0, l = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [y, m] of [
    [-p, e.x - s],
    [p, o - e.x],
    [-g, e.y - a],
    [g, n - e.y]
  ]) {
    if (y === 0) {
      if (m < 0) return !1;
      continue;
    }
    const h = m / y;
    if (y < 0) {
      if (h > l) return !1;
      h > r && (r = h);
    } else {
      if (h < r) return !1;
      h < l && (l = h);
    }
  }
  return l - r > 0.02;
}
function Tc(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), o = (g) => {
    var m;
    const y = /* @__PURE__ */ new Set();
    for (let h = g; h; h = (m = s.get(h)) == null ? void 0 : m.parentId) y.add(h);
    return y;
  }, a = e.nodes, n = (g) => g.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (g, y, m) => {
    const h = n(m), d = { x: m.x, y: m.y, w: m.w + 2 * h, h: m.h + 2 * h }, u = m.w / 2 + h * 1.5, f = m.h / 2 + h * 1.5, b = { x: m.x - u, y: m.y - f }, M = { x: m.x + u, y: m.y - f }, R = { x: m.x - u, y: m.y + f }, V = { x: m.x + u, y: m.y + f }, O = [];
    for (const T of [b, M, R, V])
      !Ft(g, T, d) && !Ft(T, y, d) && O.push([T]);
    for (const [T, x] of [
      [b, M],
      [M, b],
      [M, V],
      [V, M],
      [V, R],
      [R, V],
      [R, b],
      [b, R]
    ])
      !Ft(g, T, d) && !Ft(x, y, d) && O.push([T, x]);
    return O;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const y = s.get(g.sourceId), m = s.get(g.targetId);
    if (!y || !m) continue;
    const h = /* @__PURE__ */ new Set([...o(y.id), ...o(m.id)]), d = [
      { x: y.x, y: y.y },
      { x: m.x, y: m.y }
    ];
    for (let u = 0; u < 12; u++) {
      let f = !1;
      e: for (let b = 0; b < d.length - 1; b++)
        for (const M of a) {
          if (h.has(M.id)) continue;
          const R = n(M), V = { x: M.x, y: M.y, w: M.w + 2 * R, h: M.h + 2 * R };
          if (!Ft(d[b], d[b + 1], V)) continue;
          const O = l(d[b], d[b + 1], M);
          if (!O.length) continue;
          const T = (z) => a.some(
            (w) => w !== M && !h.has(w.id) && Math.abs(z.x - w.x) < w.w / 2 + n(w) / 2 && Math.abs(z.y - w.y) < w.h / 2 + n(w) / 2
          ), x = (z) => {
            let w = 0;
            const A = [d[b], ...z, d[b + 1]];
            for (let L = 0; L < A.length - 1; L++)
              w += Math.hypot(A[L + 1].x - A[L].x, A[L + 1].y - A[L].y);
            return w + (z.some(T) ? 1e4 : 0);
          };
          O.sort((z, w) => x(z) - x(w)), d.splice(b + 1, 0, ...O[0]), f = !0;
          break e;
        }
      if (!f) break;
    }
    d.length > 2 && r.set(
      g.id,
      d.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return r;
}
const se = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function wo(e, t) {
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
function Oc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let K = class extends Fe {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "explorer", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._drawer = null, this.repositories = [], this._repoPicker = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var a;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const s = this.renderRoot.querySelector("modux-canvas"), o = (n) => {
        e.preventDefault(), this.onDiagramScopeChange(n);
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
          e.preventDefault(), s == null || s.fit(), (a = this.renderRoot.querySelector("modux-explorer")) == null || a.fit();
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
      const { id: t, appId: i, beforeId: s, nestRowId: o } = e.detail, a = ve(t);
      if (!(a != null && a.itemId)) return;
      const n = this.menuEntryIn(a.appId, a.itemId);
      if (!n) return;
      const r = (l, p) => (l ?? []).some((g) => g.id === p || r(g.children, p));
      if (o) {
        const l = ve(o);
        if (!(l != null && l.itemId) || l.itemId === a.itemId || a.appId === l.appId && r(n.entry.children, l.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: l.appId,
          itemId: a.itemId,
          parentId: l.itemId
        });
        return;
      }
      if (s) {
        const l = ve(s);
        if (!(l != null && l.itemId) || l.itemId === a.itemId) return;
        const p = this.menuEntryIn(l.appId, l.itemId);
        if (!p || a.appId === l.appId && r(n.entry.children, l.itemId) || a.appId === l.appId && p.parentId === n.parentId && n.beforeId === l.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: l.appId,
          itemId: a.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: l.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: a.appId, toAppId: i, itemId: a.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var a;
      const { id: t, beforeId: i } = e.detail, s = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!s) return;
      const o = i ? ((a = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : a[1]) ?? null : null;
      this.moveWizardStep(s[1], s[2], o);
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
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: o, beforeComponentId: a } = e.detail, n = this.componentIn(t, s);
      if (!n || t === i) return;
      const r = JSON.parse(JSON.stringify(n.node)), { ops: l } = this.rebuildComponentOps(i, r, o ?? void 0, a);
      for (const p of l) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, r, n.parentId ?? void 0, n.beforeId).ops
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
    return ci(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = ci(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations" || t === "distribution") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = ci(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = ci(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), n = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), r = Di(n), l = [...r.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: a.nodes[g] ?? null
    })), p = { ...a.nodes };
    for (const [g, y] of r) {
      const m = n.find((d) => d.id === g), h = a.nodes[g] ?? { x: m.x, y: m.y };
      p[g] = {
        x: Math.round(h.x + (y.x - m.x)),
        y: Math.round(h.y + (y.y - m.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: p }), l.length && this.pushUndoEntry(l);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Tc(e, t);
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
    var t, i, s, o, a, n, r, l, p, g, y, m, h;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const d = this.model.relations.find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return d && d.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: d.type }] : null;
      }
      case "set-relation-type": {
        const d = this.model.relations.find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return d && d.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: d.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "create-ui-app":
        return [{ kind: "delete-ui-app", id: e.id }];
      case "add-code-module":
        return [{ kind: "remove-code-module", id: e.id }];
      case "add-transformation":
        return [{ kind: "remove-transformation", id: e.id }];
      case "add-custom-code":
        return [{ kind: "remove-custom-code", id: e.id }];
      case "add-button-group":
        return [{ kind: "remove-button-group", id: e.id }];
      case "add-model-field":
        return [{ kind: "remove-model-field", modelId: e.modelId, fieldId: e.fieldId }];
      case "create-ui-page":
        return [{ kind: "delete-ui-page", id: e.id }];
      case "set-app-header-page": {
        const d = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (d == null ? void 0 : d.headerPageId) ?? null }];
      }
      case "set-app-model": {
        const d = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-model", appId: e.appId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "add-model":
        return [{ kind: "remove-model", id: e.id }];
      case "add-model-mapping":
        return [{ kind: "remove-model-mapping", id: e.id }];
      case "remove-model-mapping": {
        const d = (this.model.modelMappings ?? []).find((u) => u.id === e.id);
        return !(d != null && d.sourceModelId) || !d.targetModelId ? null : [{
          kind: "add-model-mapping",
          id: d.id,
          name: d.name,
          sourceId: d.sourceModelId,
          targetId: d.targetModelId
        }];
      }
      case "remove-model": {
        const d = (this.model.models ?? []).find((f) => f.id === e.id);
        if (!d) return null;
        const u = [{ kind: "add-model", id: d.id, name: d.name }];
        for (const f of this.model.pages ?? []) {
          f.modelId === e.id && u.push({ kind: "set-page-model", pageId: f.id, modelId: e.id });
          const b = (M) => {
            for (const R of M ?? [])
              R.modelId === e.id && u.push({ kind: "set-page-component", pageId: f.id, componentId: R.id, modelId: e.id }), b(R.children);
          };
          b(f.content);
        }
        for (const f of this.model.uiApps ?? [])
          f.modelId === e.id && u.push({ kind: "set-app-model", appId: f.id, modelId: e.id });
        return u;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const d = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = e.kind === "set-crud-detail";
        return [{
          kind: e.kind,
          pageId: e.pageId,
          targetId: (u ? d == null ? void 0 : d.crudDetailPageId : d == null ? void 0 : d.crudCreatePageId) ?? null,
          toAppId: (u ? d == null ? void 0 : d.crudDetailAppId : d == null ? void 0 : d.crudCreateAppId) ?? null
        }];
      }
      case "set-app-view-page": {
        const d = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-view-page", appId: e.appId, pageId: (d == null ? void 0 : d.viewPageId) ?? null }];
      }
      case "set-app-edit-page": {
        const d = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{ kind: "set-app-edit-page", appId: e.appId, pageId: (d == null ? void 0 : d.editPageId) ?? null }];
      }
      case "set-app-home-page": {
        const d = (this.model.uiApps ?? []).find((u) => u.id === e.appId);
        return [{
          kind: "set-app-home-page",
          appId: e.appId,
          pageId: (d == null ? void 0 : d.homePageId) ?? null,
          toAppId: (d == null ? void 0 : d.homeAppId) ?? null
        }];
      }
      case "add-page-wizard-step":
        return [{ kind: "remove-page-wizard-step", pageId: e.pageId, targetId: e.itemId ?? e.targetId }];
      case "set-wizard-step-page": {
        const d = (((t = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : t.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === e.itemId);
        return d ? [{ kind: "set-wizard-step-page", pageId: e.pageId, itemId: e.itemId, targetId: d.pageId ?? null }] : null;
      }
      case "move-page-wizard-step": {
        const d = (((i = (this.model.pages ?? []).find((f) => f.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((f) => f.id ?? f.pageId), u = d.indexOf(e.targetId);
        return u < 0 ? null : [{
          kind: "move-page-wizard-step",
          pageId: e.pageId,
          targetId: e.targetId,
          beforeItemId: d[u + 1] ?? null
        }];
      }
      case "remove-page-wizard-step": {
        const d = (((s = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : s.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === e.targetId);
        return d ? [{
          kind: "add-page-wizard-step",
          pageId: e.pageId,
          targetId: d.pageId ?? null,
          label: d.label,
          itemId: d.id
        }] : null;
      }
      case "delete-ui-app": {
        const d = (this.model.uiApps ?? []).find((b) => b.id === e.id);
        if (!d) return null;
        const u = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
        d.headerPageId && u.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && u.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && u.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && u.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && u.push({
          kind: "set-app-home-page",
          appId: d.id,
          pageId: d.homePageId ?? null,
          toAppId: d.homeAppId ?? null
        });
        const f = (b, M) => {
          for (const R of b ?? [])
            u.push({
              kind: "add-menu-item",
              appId: d.id,
              label: R.label,
              itemId: R.id,
              parentId: M == null ? void 0 : M.id,
              parentLabel: M && !M.id ? M.label : void 0,
              pageId: R.pageId ?? null
            }), R.uiAdapterId && u.push({ kind: "set-menu-app", appId: d.id, toAppId: R.uiAdapterId, itemId: R.id, label: R.label }), R.useCaseId && u.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: R.useCaseId, itemId: R.id, label: R.label }), R.aggregateId && u.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: R.aggregateId, itemId: R.id, label: R.label }), R.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: d.id,
              queryServiceId: R.queryServiceId ?? null,
              queryOperationId: R.queryOperationId,
              itemId: R.id,
              label: R.label
            }), f(R.children, R);
        };
        f(d.menuItems);
        for (const b of this.model.actorAppUses ?? [])
          b.appId === e.id && u.push({ kind: "add-actor-app", actorId: b.actorId, appId: e.id });
        return u;
      }
      case "delete-ui-page": {
        const d = (this.model.pages ?? []).find((f) => f.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
        ];
        d.route && u.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && u.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
        for (const f of d.buttons ?? [])
          f.useCaseId && (u.push({ kind: "add-page-button", pageId: d.id, useCaseId: f.useCaseId, label: f.label }), f.mappingId && u.push({
            kind: "set-page-button",
            pageId: d.id,
            useCaseId: f.useCaseId,
            label: f.label ?? null,
            mappingId: f.mappingId
          }));
        for (const f of d.viewmodelFields ?? [])
          (f.stereotype || f.colspan || f.label) && u.push({
            kind: "set-page-field-config",
            pageId: d.id,
            fieldId: f.fieldId,
            stereotype: f.stereotype ?? null,
            colspan: f.colspan ?? null,
            label: f.label ?? null
          });
        (d.viewmodelFields ?? []).length && u.push({
          kind: "set-page-field-order",
          pageId: d.id,
          fieldIds: (d.viewmodelFields ?? []).map((f) => f.fieldId)
        });
        for (const f of d.content ?? [])
          u.push(...this.rebuildComponentOps(d.id, f, void 0, null).ops);
        for (const f of d.wizardSteps ?? [])
          u.push({
            kind: "add-page-wizard-step",
            pageId: d.id,
            targetId: f.pageId ?? null,
            label: f.label,
            itemId: f.id
          });
        return (d.crudDetailPageId || d.crudDetailAppId) && u.push({ kind: "set-crud-detail", pageId: d.id, targetId: d.crudDetailPageId ?? null, toAppId: d.crudDetailAppId ?? null }), (d.crudCreatePageId || d.crudCreateAppId) && u.push({ kind: "set-crud-create", pageId: d.id, targetId: d.crudCreatePageId ?? null, toAppId: d.crudCreateAppId ?? null }), u;
      }
      case "add-menu-item":
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const d = (this.model.uiApps ?? []).find((b) => b.id === e.appId), u = (b) => {
          for (const M of b ?? []) {
            if (e.itemId ? M.id === e.itemId : M.label === e.label) return M;
            const R = u(M.children);
            if (R) return R;
          }
          return null;
        }, f = e.itemId || e.label ? u(d == null ? void 0 : d.menuItems) : null;
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
        const d = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((f) => f.useCaseId === e.useCaseId);
        return u ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: u.label }] : null;
      }
      case "rename-ui-page": {
        const d = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return d ? [{ kind: "rename-ui-page", pageId: e.pageId, name: d.name }] : null;
      }
      case "set-page-type": {
        const d = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return d ? [{ kind: "set-page-type", pageId: e.pageId, pageType: d.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const d = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return d != null && d.route ? [{ kind: "set-page-route", pageId: e.pageId, path: d.route }] : null;
      }
      case "set-page-button": {
        const d = (this.model.pages ?? []).find((f) => f.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((f) => f.useCaseId === e.useCaseId);
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
        const d = (this.model.pages ?? []).find((V) => V.id === e.pageId);
        let u = null, f = null, b = null;
        const M = (V, O) => {
          var x;
          const T = V ?? [];
          for (let z = 0; z < T.length; z++)
            T[z].id === e.componentId && (u = T[z], f = O, b = ((x = T[z + 1]) == null ? void 0 : x.id) ?? null), M(T[z].children, T[z]);
        };
        if (M(d == null ? void 0 : d.content, null), !u) return null;
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
          beforeComponentId: b
        }] : this.rebuildComponentOps(
          e.pageId,
          R,
          f === null ? void 0 : f.id,
          b
        ).ops;
      }
      case "set-page-listing": {
        const d = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (d == null ? void 0 : d.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const d = (this.model.pages ?? []).find((u) => u.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const d = (((o = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).find((u) => u.fieldId === e.fieldId);
        return [{
          kind: "set-page-field-config",
          pageId: e.pageId,
          fieldId: e.fieldId,
          stereotype: (d == null ? void 0 : d.stereotype) ?? null,
          colspan: (d == null ? void 0 : d.colspan) ?? null,
          label: (d == null ? void 0 : d.label) ?? null
        }];
      }
      case "set-page-field-order": {
        const d = (((a = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((u) => u.fieldId);
        return d.length ? [{ kind: "set-page-field-order", pageId: e.pageId, fieldIds: d }] : null;
      }
      case "move-menu-item": {
        const d = e.itemId ? this.menuEntryIn(e.appId, e.itemId) : null;
        return [{
          kind: "move-menu-item",
          appId: e.toAppId,
          toAppId: e.appId,
          itemId: e.itemId,
          label: e.label,
          parentId: (d == null ? void 0 : d.parentId) ?? void 0,
          beforeItemId: (d == null ? void 0 : d.beforeId) ?? void 0
        }];
      }
      case "add-actor-app":
        return [{ kind: "remove-actor-app", actorId: e.actorId, appId: e.appId }];
      case "remove-actor-app":
        return [{ kind: "add-actor-app", actorId: e.actorId, appId: e.appId }];
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const d = this.model.modules.find((f) => f.id === e.id);
        if (!d) return null;
        const u = this.model.relations.filter(
          (f) => (f.sourceId === e.id || f.targetId === e.id) && f.type != null
        );
        return [
          { kind: "add-module", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
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
        const d = (this.model.aggregates ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, moduleId: d.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const d of this.model.modules) {
          const u = (d.queryServices ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-query-service", id: u.id, name: u.name, moduleId: d.id }];
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
        const d = (this.model.externalSystemDependencies ?? []).find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return d ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: d.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const d = (this.model.externalSystemDependencies ?? []).find(
          (u) => u.sourceId === e.sourceId && u.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: d == null ? void 0 : d.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const d = (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return d ? [{
          kind: "add-proxy-api",
          id: d.id,
          name: d.name,
          targetId: d.targetApiId,
          moduleId: d.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const d = (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "set-proxy-target", id: e.id, targetId: d.targetApiId ?? "" }] : null;
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
        const d = (this.model.apiOperationImplementations ?? []).find(
          (u) => u.apiId === e.apiId && u.operationId === e.operationId && u.moduleId === e.moduleId
        );
        return d ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: d.useCaseId
        }] : [{
          kind: "remove-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId
        }];
      }
      case "remove-api-operation-implementation": {
        const d = (this.model.apiOperationImplementations ?? []).find(
          (u) => u.apiId === e.apiId && u.operationId === e.operationId && u.moduleId === e.moduleId
        );
        return d ? [{
          kind: "set-api-operation-implementation",
          apiId: e.apiId,
          operationId: e.operationId,
          moduleId: e.moduleId,
          targetUseCaseId: d.useCaseId
        }] : null;
      }
      case "set-api-publisher": {
        const d = (this.model.apis ?? []).find((u) => u.id === e.id) ?? (this.model.proxyApis ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "set-api-publisher", id: e.id, targetId: d.publishedByExternalSystemId ?? "" }] : null;
      }
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const d of this.model.modules) {
          const u = (d.useCases ?? []).find((f) => f.id === e.id);
          if (u)
            return [
              { kind: "add-use-case", id: u.id, name: u.name, moduleId: d.id, policy: u.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const d of this.model.externalSystems) {
          const u = (d.useCases ?? []).find((f) => f.id === e.id);
          if (u)
            return [{ kind: "add-external-use-case", id: u.id, name: u.name, moduleId: d.id }];
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
        const d = (this.model.notifications ?? []).find((f) => f.id === e.id);
        if (!(d != null && d.ownerModuleId)) return null;
        const u = [
          { kind: "add-notification", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: (d.channels ?? [])[0] }
        ];
        d.eventId && u.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
        for (const f of d.recipientRoleIds ?? []) u.push({ kind: "add-notification-recipient", id: d.id, roleId: f });
        return u;
      }
      case "set-notification-event": {
        const d = (this.model.notifications ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-notification-event", id: e.id, targetId: (d == null ? void 0 : d.eventId) ?? null }];
      }
      case "add-notification-recipient":
        return [{ kind: "remove-notification-recipient", id: e.id, roleId: e.roleId }];
      case "remove-notification-recipient":
        return [{ kind: "add-notification-recipient", id: e.id, roleId: e.roleId }];
      case "add-document":
        return [{ kind: "remove-document", id: e.id }];
      case "remove-document": {
        const d = (this.model.documents ?? []).find((f) => f.id === e.id);
        if (!(d != null && d.ownerModuleId)) return null;
        const u = [
          { kind: "add-document", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: d.kind }
        ];
        return d.modelId && u.push({ kind: "set-document-model", id: d.id, modelId: d.modelId }), d.queryServiceId && u.push({ kind: "set-document-query", id: d.id, queryServiceId: d.queryServiceId, queryOperationId: d.queryOperationId ?? null }), u;
      }
      case "set-document-model": {
        const d = (this.model.documents ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-document-model", id: e.id, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "set-document-query": {
        const d = (this.model.documents ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-document-query", id: e.id, queryServiceId: (d == null ? void 0 : d.queryServiceId) ?? null, queryOperationId: (d == null ? void 0 : d.queryOperationId) ?? null }];
      }
      case "add-identity-provider":
        return [{ kind: "remove-identity-provider", id: e.id }];
      case "remove-identity-provider": {
        const d = (this.model.identityProviders ?? []).find((f) => f.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
        ];
        d.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
        for (const f of this.model.modules)
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        for (const f of this.model.uiApps ?? [])
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        for (const f of this.model.etlFlows ?? [])
          f.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: f.id, targetId: e.id });
        return u;
      }
      case "set-idp-publisher": {
        const d = (this.model.identityProviders ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-idp-publisher", id: e.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
      }
      case "set-identity-provider": {
        const d = ((n = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : n.identityProviderId) ?? ((r = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : r.identityProviderId) ?? ((l = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : l.identityProviderId) ?? null;
        return [{ kind: "set-identity-provider", id: e.id, targetId: d }];
      }
      case "add-etl-flow":
        return [{ kind: "remove-etl-flow", id: e.id }];
      case "remove-etl-flow": {
        const d = (this.model.etlFlows ?? []).find((u) => u.id === e.id);
        return !d || !d.ownerModuleId ? null : [
          { kind: "add-etl-flow", id: d.id, name: d.name, moduleId: d.ownerModuleId },
          ...(d.steps ?? []).map((u) => ({
            kind: "add-etl-step",
            etlFlowId: d.id,
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
        const d = (((p = (this.model.etlFlows ?? []).find((u) => u.id === e.etlFlowId)) == null ? void 0 : p.steps) ?? []).find((u) => u.id === e.id);
        return d ? [{
          kind: "add-etl-step",
          etlFlowId: e.etlFlowId,
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
        return [{ kind: "remove-scheduled-trigger", id: e.id }];
      case "remove-scheduled-trigger": {
        const d = this.model.modules.find(
          (f) => (f.scheduledTriggers ?? []).some((b) => b.id === e.id)
        ), u = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((f) => f.id === e.id);
        return !d || !u ? null : [{
          kind: "add-scheduled-trigger",
          id: u.id,
          name: u.name,
          moduleId: d.id,
          cronExpression: u.cronExpression,
          targetUseCaseId: u.useCaseId
        }];
      }
      case "set-scheduled-trigger-target": {
        const d = this.model.modules.flatMap((u) => u.scheduledTriggers ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "set-scheduled-trigger-target", id: e.id, targetUseCaseId: d.useCaseId ?? null }] : null;
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
        const d = this.model.externalSystems.find((u) => u.id === e.id);
        return d ? [{ kind: "add-external-system", id: d.id, name: d.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const d = (this.model.aiAgents ?? []).find((u) => u.id === e.id);
        return d ? [
          { kind: "add-ai-agent", id: d.id, name: d.name, external: d.external },
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
        const d = (this.model.mcpGateways ?? []).find((u) => u.id === e.id);
        return d ? [
          { kind: "add-mcp-gateway", id: d.id, name: d.name },
          ...[
            ...d.mcpServerIds ?? [],
            ...d.apiIds ?? [],
            ...d.apiOperationIds ?? [],
            ...d.useCaseIds ?? [],
            ...d.ragIds ?? []
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
        for (const d of this.model.externalSystems) {
          const u = (d.mcpServers ?? []).find((f) => f.id === e.id);
          if (u)
            return [
              { kind: "add-mcp-server", id: u.id, name: u.name, moduleId: d.id, uri: u.uri },
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
        const d = (this.model.rags ?? []).find((u) => u.id === e.id);
        return d ? [
          { kind: "add-rag", id: d.id, name: d.name },
          ...(this.model.agentRags ?? []).filter((u) => u.ragId === e.id).map(
            (u) => ({
              kind: "add-agent-rag",
              sourceId: u.agentId,
              targetId: e.id
            })
          ),
          ...(d.sourceReadModelIds ?? []).map(
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
        const d = (this.model.actors ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "add-actor", id: d.id, name: d.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const d of this.model.modules) {
          const u = (d.applicationEvents ?? []).find((f) => f.id === e.id);
          if (u)
            return [{ kind: "add-application-event", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const d of this.model.modules) {
          const u = (d.domainServices ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-domain-service", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const d = (this.model.projections ?? []).find((u) => u.id === e.id);
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
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const d of this.model.externalSystems) {
          const u = (d.tables ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-external-table", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const d = (y = (g = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : y.find((u) => u.uri === e.uri);
        return d ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: d.type,
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
        const d = (this.model.apis ?? []).find((u) => u.id === e.id);
        return d ? [
          { kind: "add-api", id: d.id, name: d.name },
          ...d.operations.map(
            (u) => ({
              kind: "add-api-operation",
              apiId: d.id,
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
        const d = (m = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : m.operations.find((u) => u.id === e.id);
        return d ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
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
        const d = (h = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : h.operations.find((u) => u.id === e.id);
        return d ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: d.targetModuleId,
            targetUseCaseId: d.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const d of this.model.modules) {
          const u = (d.readModels ?? []).find((f) => f.id === e.id);
          if (u != null && u.aggregateId)
            return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const d of this.model.modules) {
          const u = (d.domainEvents ?? []).find((f) => f.id === e.id);
          if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, moduleId: d.id }];
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
        const d = this.model.flows.find((u) => u.id === e.id);
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
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const d = (this.model.views ?? []).find((u) => u.id === e.id);
        return d ? [{ kind: "add-view", id: d.id, name: d.name, memberIds: d.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const d = (this.model.processes ?? []).find((b) => b.id === e.processId), u = (d == null ? void 0 : d.steps.findIndex((b) => b.id === e.id)) ?? -1;
        if (!d || u < 0) return null;
        const f = d.steps[u];
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
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const d = (this.model.processes ?? []).find((f) => f.id === e.processId), u = (d == null ? void 0 : d.steps.findIndex((f) => f.id === e.id)) ?? -1;
        return !d || u < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const d = (this.model.processes ?? []).find((f) => f.id === e.processId), u = d == null ? void 0 : d.steps.find((f) => f.id === e.id);
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
        const d = (this.model.processes ?? []).find((u) => u.id === e.id);
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
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const d = (this.model.workflows ?? []).find((u) => u.id === e.id);
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
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const d = (this.model.workflows ?? []).find((b) => b.id === e.workflowId), u = (d == null ? void 0 : d.steps.findIndex((b) => b.id === e.id)) ?? -1;
        if (!d || u < 0) return null;
        const f = d.steps[u];
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
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...d.steps.filter((b) => b.id !== e.id && (b.dependsOnStepIds ?? []).includes(e.id)).map(
            (b) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: b.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const d = (this.model.workflows ?? []).find((f) => f.id === e.workflowId), u = d == null ? void 0 : d.steps.find((f) => f.id === e.id);
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
        const d = (this.model.workflows ?? []).find((u) => u.id === e.id);
        return d ? [{
          kind: "set-workflow-trigger",
          id: e.id,
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
    const { id: t, x: i, y: s } = e.detail, o = this._view, a = this.viewLayout(o), n = a.nodes[t] ?? null;
    let r = { x: i, y: s };
    const l = this.sceneFor(o), p = l.nodes.find((y) => y.id === t);
    if (p != null && p.parentId) {
      const y = l.nodes.find((m) => m.id === p.parentId);
      y && (r = { x: i - y.x, y: s - y.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: o, id: t, pos: n }];
    if (o === "processes") {
      const y = this.stepReorderCommand(t);
      if (y) {
        const m = this.inverseOf(y);
        m && g.unshift(...m), this.command(y, !1);
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
    const { id: t, targetId: i, x: s, y: o } = e.detail, a = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!a || i && !this.model.externalSystems.some((d) => d.id === i)) return;
    const n = a.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === n) return;
    const l = this._view, p = this.viewLayout(l), g = this.sceneFor(l), y = r ? g.nodes.find((d) => d.id === r) : void 0, m = y ? { x: s - y.x, y: o - y.y } : { x: s, y: o }, h = [
      { kind: "set-api-publisher", id: t, targetId: n },
      { kind: "move-node", view: l, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...p, nodes: { ...p.nodes, [t]: m } }), this.pushUndoEntry(h);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: o } = e.detail, a = (this.model.apis ?? []).find((d) => d.id === t), n = this.model.externalSystems.find((d) => d.id === i);
    if (!a || !n || (this.model.proxyApis ?? []).some(
      (d) => d.targetApiId === t && d.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${se(a.name)}-${se(n.name)}`;
    if ((this.model.proxyApis ?? []).some((d) => d.id === l)) return;
    const p = this._view, g = this.viewLayout(p), m = this.sceneFor(p).nodes.find((d) => d.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${a.name}@${n.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const h = [{ kind: "remove-proxy-api", id: l }];
    m && (h.push({ kind: "move-node", view: p, id: l, pos: g.nodes[l] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [l]: { x: s - m.x, y: o - m.y } }
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
    var r, l, p;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), o = this.selectedApiId(), a = o ? null : ((l = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null, n = o || a ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!o && !a && !n) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: o,
      homeExternalId: a,
      homeModuleId: n
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
    const { id: t } = e.detail, i = this._view, s = this.viewLayout(i), o = new Set(s.collapsed ?? []);
    o.has(t) ? o.delete(t) : o.add(t), this.writeViewLayout(i, { ...s, collapsed: [...o] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), o = this.sceneFor(i), a = { ...s.nodes }, n = [];
    for (const { id: r, x: l, y: p } of t) {
      n.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let g = { x: l, y: p };
      const y = o.nodes.find((m) => m.id === r);
      if (y != null && y.parentId) {
        const m = o.nodes.find((h) => h.id === y.parentId);
        m && (g = { x: l - m.x, y: p - m.y });
      }
      a[r] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: a }), i === "processes")
      for (const { id: r } of t) {
        const l = this.stepReorderCommand(r);
        if (l) {
          const p = this.inverseOf(l);
          p && n.unshift(...p), this.command(l, !1);
        }
      }
    this.pushUndoEntry(n);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: o, h: a } = e.detail, n = this._view, r = this.viewLayout(n), l = this.sceneFor(n).nodes.filter((y) => y.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: n, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: n, id: t, pos: r.nodes[t] ?? null },
      ...l.map((y) => ({ kind: "move-node", view: n, id: y.id, pos: r.nodes[y.id] ?? null }))
    ]);
    const p = { ...r.nodes, [t]: { x: i, y: s } };
    for (const y of l) p[y.id] = { x: y.x - i, y: y.y - s };
    this.writeViewLayout(n, {
      ...r,
      nodes: p,
      sizes: { ...r.sizes ?? {}, [t]: { w: o, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, o = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: o.edges[t] ?? null }
    ]);
    const a = { ...o.edges };
    i.length ? a[t] = i : delete a[t], this.writeViewLayout(s, { ...o, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Ps(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((n) => [n.id, n.x])), o = [...t.steps].sort(
      (n, r) => (s.get(n.id) ?? 0) - (s.get(r.id) ?? 0)
    );
    if (o.every((n, r) => n.id === t.steps[r].id)) return null;
    const a = o.findIndex((n) => n.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? o[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: o, connectKind: a } = e.detail;
    this.applyConnection(t, i, s, o, a);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s, o) {
    var q, H, I, E;
    if (this._view === "context-map" && this._detail === "distribution") {
      const v = this.sceneFor("context-map"), k = this.model.codeModules ?? [], _ = ((P) => {
        var C;
        for (let D = P; D; ) {
          if (k.some((B) => B.id === D)) return D;
          D = (C = v.nodes.find((B) => B.id === D)) == null ? void 0 : C.parentId;
        }
        return null;
      })(t);
      if (_ && _ !== e) {
        if ((this.model.services ?? []).some((C) => C.id === e)) {
          this.command({ kind: "add-service-code-module", serviceId: e, id: _ });
          return;
        }
        if (!k.some((C) => C.id === e) && !this.model.modules.some((C) => C.id === e)) {
          this.command({ kind: "add-code-module-element", id: _, elementId: e });
          return;
        }
      }
    }
    if (this._view === "eventstorming") {
      const v = ($) => (this.model.customCodes ?? []).some((_) => _.id === $), k = v(t) ? { stepId: e, ccId: t } : v(e) ? { stepId: t, ccId: e } : null;
      if (k) {
        const $ = this.owningUseCaseOf(k.stepId);
        $ && this.command({
          kind: "set-use-case-step-custom-code",
          useCaseId: $.id,
          id: k.stepId,
          targetId: k.ccId
        });
        return;
      }
      return;
    }
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(e), k = this.owningWorkflowOf(t);
      if (!v || v !== k || e === t) return;
      const $ = v.steps.find((_) => _.id === t);
      if ((($ == null ? void 0 : $.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const v = this.model.pages ?? [], k = this.model.uiApps ?? [], $ = (W) => k.some((Q) => Q.id === W), _ = (W) => v.some((Q) => Q.id === W), P = (W) => (this.model.customCodes ?? []).some((Q) => Q.id === W);
      if (P(e) || P(t)) {
        const W = P(e) ? e : t, Q = P(e) ? t : e;
        if (P(Q)) return;
        if (_(Q)) {
          this.command({ kind: "set-page-custom-code", id: Q, targetId: W });
          return;
        }
        this.command({ kind: "add-custom-code-use", id: W, elementId: Q });
        return;
      }
      const C = this.model.buttonGroups ?? [], D = (W) => C.some((Q) => Q.id === W);
      if ((o === "toolbar" || o === "bottom") && D(e) && _(t)) {
        this.command({ kind: "add-page-bar-group", pageId: t, id: e, bar: o });
        return;
      }
      if (D(e) && D(t) && e !== t) {
        this.command({ kind: "add-group-subgroup", id: t, targetId: e });
        return;
      }
      const B = /^gbtn:([^:]+):(.+)$/.exec(e);
      if (B) {
        this.model.modules.some((Q) => (Q.useCases ?? []).some((_e) => _e.id === t)) ? this.command({ kind: "set-group-button-target", id: B[1], itemId: B[2], useCaseId: t }) : this.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
        return;
      }
      if (o === "home" && $(e) && (_(t) || $(t))) {
        if (t === e) return;
        this.command(
          _(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (o === "header" && $(e) && _(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((o === "crud-detail" || o === "crud-create") && _(e) && (_(t) || $(t)) && t !== e) {
        const W = o === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          _(t) ? { kind: W, pageId: e, targetId: t, toAppId: null } : { kind: W, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (o === "viewmodel" && _(e)) {
        (this.model.models ?? []).some((W) => W.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((o === "view" || o === "edit") && $(e) && _(t)) {
        this.command({
          kind: o === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (o) return;
      const Y = (W) => /^wizrow:([^:]+):(.+)$/.exec(W), re = Y(e) ?? Y(t);
      if (re) {
        const W = Y(e) ? t : e;
        _(W) && W !== re[1] && this.command({ kind: "set-wizard-step-page", pageId: re[1], itemId: re[2], targetId: W });
        return;
      }
      const ue = v.find((W) => W.id === t && W.type === "WIZARD");
      if (_(e) && ue && e !== ue.id) {
        (ue.wizardSteps ?? []).some((W) => W.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: ue.id, targetId: e });
        return;
      }
      if (_(e) && $(t)) {
        const W = v.find((_e) => _e.id === e), Q = k.find((_e) => _e.id === t);
        if (Q.type === "MASTER_DETAIL" && !Q.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${W.name} es la cabecera de ${Q.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: W.name,
          pageId: e,
          itemId: this.newMenuItemId(W.name)
        });
        return;
      }
      const F = this.model.identityProviders ?? [], j = (W) => F.some((Q) => Q.id === W);
      if (j(e) || j(t)) {
        const W = j(e) ? e : t, Q = j(e) ? t : e;
        $(Q) ? this.command({ kind: "set-identity-provider", id: Q, targetId: W }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const de = (W) => (this.model.models ?? []).some((Q) => Q.id === W);
      if (de(e) || de(t)) {
        const W = de(e) ? e : t, Q = de(e) ? t : e;
        if (_(Q)) {
          this.command({ kind: "set-page-model", pageId: Q, modelId: W });
          return;
        }
        if ($(Q)) {
          this.command({ kind: "set-app-model", appId: Q, modelId: W });
          return;
        }
        return;
      }
      const fe = ve(e);
      if (fe != null && fe.itemId && ((q = ve(t)) != null && q.itemId || $(t))) {
        const W = ve(t), Q = this.menuEntryIn(fe.appId, fe.itemId);
        if (!Q) return;
        if (W != null && W.itemId) {
          const _e = this.menuEntryIn(W.appId, W.itemId);
          if (!_e) return;
          const Ae = (vt) => (vt ?? []).some((ri) => ri.id === W.itemId || Ae(ri.children));
          if (fe.appId === W.appId && (W.itemId === fe.itemId || Ae(Q.entry.children)))
            return;
          const De = (H = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : H.renderRoot.querySelector(`g[data-node-id="${t}"]`), Ce = De == null ? void 0 : De.getBoundingClientRect(), et = Ce && s !== void 0 ? (s - Ce.top) / Math.max(1, Ce.height) : 0.5, ai = et < 0.3 ? "before" : et > 0.7 ? "after" : "nest";
          if (ai === "nest")
            this.command({
              kind: "move-menu-item",
              appId: fe.appId,
              toAppId: W.appId,
              itemId: fe.itemId,
              parentId: W.itemId
            });
          else {
            const vt = ai === "before" ? W.itemId : _e.beforeId ?? void 0;
            if (fe.appId === W.appId && _e.parentId === Q.parentId && vt === fe.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: fe.appId,
              toAppId: W.appId,
              itemId: fe.itemId,
              parentId: _e.parentId ?? void 0,
              beforeItemId: vt
            });
          }
          return;
        }
        if (fe.appId === t && !Q.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: fe.appId,
          toAppId: t,
          itemId: fe.itemId
        });
        return;
      }
      const ze = ve(e) ?? ve(t);
      if (ze) {
        const W = ve(e) ? e : t, Q = ve(e) ? t : e;
        if (((I = this.sceneFor("ui").nodes.find((Ce) => Ce.id === W)) == null ? void 0 : I.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const _e = this.model.modules.some(
          (Ce) => (Ce.useCases ?? []).some((et) => et.id === Q)
        ), Ae = (this.model.aggregates ?? []).some((Ce) => Ce.id === Q), De = this.model.modules.flatMap((Ce) => Ce.queryServices ?? []).find((Ce) => (Ce.operations ?? []).some((et) => et.id === Q));
        _(Q) ? this.command({ kind: "set-menu-page", pageId: Q, ...ze }) : $(Q) && Q !== ze.appId ? this.command({ kind: "set-menu-app", toAppId: Q, ...ze }) : _e ? this.command({ kind: "set-menu-use-case", useCaseId: Q, ...ze }) : Ae ? this.command({ kind: "set-menu-aggregate", aggregateId: Q, ...ze }) : De && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: De.id,
          queryOperationId: Q,
          ...ze
        });
        return;
      }
      if ((this.model.actors ?? []).some((W) => W.id === e) && $(t)) {
        (this.model.actorAppUses ?? []).some((W) => W.actorId === e && W.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const ke = _(e) ? { pageId: e, other: t } : _(t) ? { pageId: t, other: e } : null;
      if (ke) {
        const W = new Set(
          this.model.modules.flatMap((Ae) => (Ae.useCases ?? []).map((De) => De.id))
        ), Q = new Set(
          this.model.modules.flatMap((Ae) => (Ae.queryServices ?? []).map((De) => De.id))
        ), _e = v.find((Ae) => Ae.id === ke.pageId);
        W.has(ke.other) ? (_e.buttons ?? []).some((Ae) => Ae.useCaseId === ke.other) || this.command({ kind: "add-page-button", pageId: ke.pageId, useCaseId: ke.other }) : Q.has(ke.other) && this.command({ kind: "set-page-listing", pageId: ke.pageId, queryServiceId: ke.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [], k = es(e), $ = es(t), _ = this.model.transformations ?? [], P = this.model.customCodes ?? [], C = (F) => P.some((j) => j.id === F);
      if (C(e) && _.some((F) => F.id === t)) {
        this.command({ kind: "set-transformation-custom-code", id: t, targetId: e });
        return;
      }
      if (C(t) && _.some((F) => F.id === e)) {
        this.command({ kind: "set-transformation-custom-code", id: e, targetId: t });
        return;
      }
      if (C(e)) {
        const F = ($ == null ? void 0 : $.modelId) ?? (v.some((j) => j.id === t) ? t : null);
        if (F) {
          const j = (this.model.modelMappings ?? []).filter(
            (de) => de.sourceModelId === F || de.targetModelId === F
          );
          j.length === 1 ? this.command({ kind: "set-mapping-custom-code", id: j[0].id, targetId: e }) : this.emit("modux-notice", {
            message: j.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
          });
          return;
        }
        return;
      }
      if (_.some((F) => F.id === t)) {
        if ($ || _.some((j) => j.id === e)) return;
        const F = k ? { modelId: k.modelId, fieldId: k.fieldId } : v.some((j) => j.id === e) ? { modelId: e } : null;
        F && this.command({ kind: "add-transformation-input", id: t, ...F });
        return;
      }
      if (_.some((F) => F.id === e)) {
        const F = $ ? { modelId: $.modelId, fieldId: $.fieldId } : v.some((j) => j.id === t) ? { modelId: t } : null;
        F && this.command({ kind: "set-transformation-output", id: e, ...F });
        return;
      }
      if (k && $) {
        if (k.modelId === $.modelId) {
          this.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
          return;
        }
        let F = (this.model.modelMappings ?? []).find(
          (j) => j.sourceModelId === k.modelId && j.targetModelId === $.modelId
        );
        if (!F) {
          const j = v.find((W) => W.id === k.modelId), de = v.find((W) => W.id === $.modelId);
          if (!j || !de) return;
          const fe = (W) => W.replace(/[^a-zA-Z0-9]/g, ""), ze = new Set((this.model.modelMappings ?? []).map((W) => W.id));
          let ke = `mapping-${se(j.name)}-${se(de.name)}`;
          for (let W = 2; ze.has(ke); W++) ke = `mapping-${se(j.name)}-${se(de.name)}-${W}`;
          this.command(
            { kind: "add-model-mapping", id: ke, name: `${fe(j.name)}2${fe(de.name)}`, sourceId: j.id, targetId: de.id },
            !1
          ), F = { id: ke, name: "", sourceModelId: j.id, targetModelId: de.id };
        }
        this.command({
          kind: "add-model-mapping-rule",
          id: F.id,
          sourceId: k.fieldId,
          targetId: $.fieldId
        });
        return;
      }
      if (k && v.some((F) => F.id === t) && t !== k.modelId) {
        this.command({ kind: "move-model-field", modelId: k.modelId, fieldId: k.fieldId, targetId: t });
        return;
      }
      if (!v.some((F) => F.id === e) || !v.some((F) => F.id === t) || e === t || (this.model.modelMappings ?? []).some((F) => F.sourceModelId === e && F.targetModelId === t))
        return;
      const D = v.find((F) => F.id === e), B = v.find((F) => F.id === t), Y = (F) => F.replace(/[^a-zA-Z0-9]/g, ""), re = new Set((this.model.modelMappings ?? []).map((F) => F.id));
      let ue = `mapping-${se(D.name)}-${se(B.name)}`;
      for (let F = 2; re.has(ue); F++) ue = `mapping-${se(D.name)}-${se(B.name)}-${F}`;
      this.command({
        kind: "add-model-mapping",
        id: ue,
        name: `${Y(D.name)}2${Y(B.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const a = /^apiop:(.+)@(.+)$/.exec(e);
    if (a) {
      const [, v, k] = a, $ = (this.model.proxyApis ?? []).find((B) => B.id === k), _ = ($ == null ? void 0 : $.targetApiId) ?? ((E = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === k && (this.model.apis ?? []).some(
          (Y) => Y.id === B.apiId && Y.operations.some((re) => re.id === v)
        )
      )) == null ? void 0 : E.apiId);
      if (!_) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: _,
          operationId: v,
          moduleId: k,
          targetUseCaseId: t
        });
        return;
      }
      if (!($ != null && $.targetApiId)) return;
      let C = null;
      if (t === $.targetApiId)
        C = $.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === $.targetApiId ? C = B[2] : this.model.modules.some((Y) => Y.id === t) && (this.model.apiImplementations ?? []).some(
          (Y) => Y.apiId === $.targetApiId && Y.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === $.id && B.operationId === v && B.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: $.id,
        operationId: v,
        targetSiteId: C
      });
      return;
    }
    const n = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (n.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (D) => D.agentId === e && D.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (D) => D.agentId === e && D.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (D) => D.agentId === e && D.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (D) => D.agentId === e && D.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((D) => D.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (D) => D.agentId === e && D.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (D) => D.agentId === e && D.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (D) => D.agentId === e && D.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (n.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (D) => D.agentId === e && D.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (D) => D.agentId === e && D.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find((_) => _.id === e), k = this.model.externalSystems.some((_) => (_.mcpServers ?? []).some((P) => P.id === t)) || (this.model.apis ?? []).some((_) => _.id === t) || (this.model.apis ?? []).some((_) => _.operations.some((P) => P.id === t)) || this.model.modules.some((_) => (_.useCases ?? []).some((P) => P.id === t)) || (this.model.rags ?? []).some((_) => _.id === t), $ = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      k && !$ && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const r = (this.model.rags ?? []).find((v) => v.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.readModels ?? []).map((_) => _.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap(($) => ($.tables ?? []).map((_) => _.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some(($) => $.id === t) || (this.model.proxyApis ?? []).some(($) => $.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some(($) => $.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some(($) => $.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find((_) => _.id === e), k = (this.model.workflows ?? []).find(
        (_) => _.id === t && _.id !== e
      );
      if (k) {
        const _ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        k.triggerEvent !== _ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: _ });
        return;
      }
      const $ = this.model.modules.flatMap((_) => _.useCases ?? []).find((_) => _.id === t);
      if ($ && !(v.steps ?? []).some((P) => P.targetUseCaseId === t)) {
        const P = `wfs-${se($.name)}`;
        let C = P;
        for (let D = 2; (v.steps ?? []).some((B) => B.id === C); D++)
          C = `${P}-${D}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: C,
          name: $.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap((_) => _.domainEvents ?? []).find((_) => _.id === e), k = this.model.modules.flatMap((_) => _.applicationEvents ?? []).find((_) => _.id === e), $ = v ?? k;
      if ($) {
        const _ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), P = new Set((this.model.aggregates ?? []).map((B) => B.id)), C = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((Y) => Y.id))
        ), D = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((Y) => Y.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: $.name,
          triggerAggregateId: _ && P.has(_.sourceId) ? _.sourceId : void 0,
          triggerDomainServiceId: _ && C.has(_.sourceId) ? _.sourceId : void 0,
          triggerUseCaseId: _ && D.has(_.sourceId) ? _.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((v) => v.id === e)) {
      const v = (this.model.proxyApis ?? []).find((k) => k.id === e);
      if ((this.model.apis ?? []).some((k) => k.id === t)) {
        v.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
        if (!v.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          ($) => $.apiId === v.targetApiId && $.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: v.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((k) => k.id === t) && v.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((v) => v.id === e)) {
      if (this.model.externalSystems.some((v) => v.id === t)) {
        (this.model.apis ?? []).find((k) => k.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((v) => v.id === t) && ((this.model.apiImplementations ?? []).some(
        (k) => k.apiId === e && k.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const l = new Set((this.model.actors ?? []).map((v) => v.id));
    if (n.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((k) => (k.domainEvents ?? []).map(($) => $.id)),
        ...this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map(($) => $.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          ($) => $.eventId === e && $.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!l.has(e)) return;
    }
    if (l.has(e)) {
      const v = new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((_) => _.id))
      ), k = new Set(
        this.model.modules.flatMap(($) => ($.queryServices ?? []).map((_) => _.id))
      );
      if (v.has(t) || k.has(t)) {
        (this.model.actorUses ?? []).some(
          (_) => _.actorId === e && _.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some(($) => $.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some(($) => $.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (_) => _.actorId === e && _.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some(($) => $.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (_) => _.actorId === e && _.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const p = this.owningApiOf(e);
    if (p) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.useCases ?? []).map(($) => $.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((k) => k.id === t)) {
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
    const g = (v) => (this.model.notifications ?? []).find((k) => k.id === v);
    if (g(e) || g(t)) {
      const v = g(e) ?? g(t), k = g(e) ? t : e;
      if (this.model.modules.some(
        (_) => [..._.domainEvents ?? [], ..._.applicationEvents ?? []].some((P) => P.id === k)
      )) {
        v.eventId !== k && this.command({ kind: "set-notification-event", id: v.id, targetId: k });
        return;
      }
      if ((this.model.actors ?? []).some((_) => _.id === k)) {
        (v.recipientRoleIds ?? []).includes(k) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: k });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const y = (v) => (this.model.documents ?? []).find((k) => k.id === v);
    if (y(e) || y(t)) {
      const v = y(e) ?? y(t), k = y(e) ? t : e;
      if ((this.model.models ?? []).find((C) => C.id === k)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: k });
        return;
      }
      const _ = this.model.modules.flatMap((C) => C.queryServices ?? []).find((C) => C.id === k), P = this.model.modules.flatMap((C) => (C.queryServices ?? []).flatMap((D) => (D.operations ?? []).map((B) => ({ op: B, qs: D })))).find(({ op: C }) => C.id === k);
      if (_ || P) {
        this.command({
          kind: "set-document-query",
          id: v.id,
          queryServiceId: (_ == null ? void 0 : _.id) ?? P.qs.id,
          queryOperationId: (P == null ? void 0 : P.op.id) ?? null
        });
        return;
      }
      this.emit("modux-notice", {
        message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
      });
      return;
    }
    const m = this.model.identityProviders ?? [], h = (v) => m.find((k) => k.id === v);
    if (h(e) || h(t)) {
      const v = h(e) ?? h(t), k = h(e) ? t : e;
      if (h(e) && this.model.externalSystems.some((P) => P.id === k)) {
        v.publishedByExternalSystemId !== k && this.command({ kind: "set-idp-publisher", id: v.id, targetId: k });
        return;
      }
      const $ = this.model.modules.some((P) => P.id === k), _ = (this.model.etlFlows ?? []).some((P) => P.id === k);
      if ($ || _) {
        this.command({ kind: "set-identity-provider", id: k, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const d = this.model.etlFlows ?? [], u = (v) => d.find((k) => k.id === v);
    if (u(e) || u(t)) {
      const v = u(e) ?? u(t), k = u(e) ? t : e, $ = !u(e), _ = new Set(this.model.externalSystems.flatMap((j) => (j.tables ?? []).map((de) => de.id))), P = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((j) => j.id),
        ...(this.model.proxyApis ?? []).map((j) => j.id)
      ]), C = (this.model.apis ?? []).find((j) => j.operations.some((de) => de.id === k)), D = new Set(
        this.model.modules.flatMap((j) => [
          ...(j.domainEvents ?? []).map((de) => de.id),
          ...(j.applicationEvents ?? []).map((de) => de.id)
        ])
      );
      let B = null, Y = {};
      if (_.has(k) ? (B = $ ? "SOURCE_PULL" : "WRITE_DB", Y = { externalTableId: k }) : C ? (B = $ ? "SOURCE_PULL" : "WRITE_API", Y = { apiId: C.id, operationId: k }) : P.has(k) ? (B = $ ? "SOURCE_PULL" : "WRITE_API", Y = { apiId: k }) : D.has(k) && (B = $ ? "SOURCE_CONSUMER" : "WRITE_EVENT", Y = { targetId: k }), !B) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (j) => j.type === B && (j.externalTableId ?? j.operationId ?? j.apiId ?? j.eventId) === (Y.externalTableId ?? Y.operationId ?? Y.apiId ?? Y.targetId)
      )) return;
      const ue = new Set((v.steps ?? []).map((j) => j.id));
      let F = (v.steps ?? []).length + 1;
      for (; ue.has(`ets-${F}`); ) F++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${F}`, stepType: B, ...Y });
      return;
    }
    const f = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), b = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (f || b) {
      const v = (f ?? b).name, k = f ? { externalUseCaseId: e } : { externalTableId: e }, $ = (C) => f ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, _ = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if (_) {
        (this.model.projections ?? []).some(
          (D) => $(D) && D.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se(_.name)}`,
          name: `${_.name}Projection`,
          ...k,
          targetId: t
        });
        return;
      }
      const P = this.model.modules.find((C) => C.id === t);
      if (P) {
        (this.model.projections ?? []).some(
          (D) => $(D) && D.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se(P.name)}`,
          name: `${v}ViewProjection`,
          ...k,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const M = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (M) {
      const v = this.model.modules.flatMap(($) => $.readModels ?? []).find(($) => $.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(M.name)}-${se(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const k = this.model.modules.find(($) => $.id === t);
      if (k) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(M.name)}-${se(k.name)}`,
          name: `${M.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${M.name}View`
        });
        return;
      }
    }
    const R = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((k) => k.id))
    ), V = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((k) => k.id))
    ]), O = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((k) => k.id))
    ), T = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((k) => k.id))), x = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((k) => k.id))
    );
    if (T.has(e) && x.has(t)) {
      (this.model.queryCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const z = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((k) => k.id))
    );
    if (T.has(e) && z.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (T.has(e) && T.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const w = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (w && T.has(t)) {
      w.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (T.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (V.has(e) && R.has(t) || T.has(e) && O.has(t)) {
      (this.model.emissions ?? []).some(
        (k) => k.sourceId === e && k.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (R.has(e) || O.has(e)) {
      const v = O.has(e), k = this.model.modules.flatMap((F) => (v ? F.applicationEvents : F.domainEvents) ?? []).find((F) => F.id === e), $ = this.model.modules.flatMap((F) => (F.useCases ?? []).map((j) => ({ u: j, module: F }))).find(({ u: F }) => F.id === t), _ = this.model.modules.flatMap((F) => (F.readModels ?? []).map((j) => ({ rm: j, module: F }))).find(({ rm: F }) => F.id === t), P = this.model.modules.find((F) => F.id === t) ?? (_ == null ? void 0 : _.module) ?? ($ == null ? void 0 : $.module);
      if (!k || !P) return;
      const C = new Set((this.model.aggregates ?? []).map((F) => F.id)), D = new Set(
        this.model.modules.flatMap((F) => (F.domainServices ?? []).map((j) => j.id))
      ), B = (this.model.emissions ?? []).find(
        (F) => F.domainEventId === e && (v ? T.has(F.sourceId) : C.has(F.sourceId) || D.has(F.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const Y = !v && C.has(B.sourceId);
      if ($) {
        if (this.model.flows.some(
          (j) => j.archetype === "TRIGGERS" && j.triggerEvent === k.name && j.targetUseCaseId === $.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${se(k.name)}-${se($.u.name)}`,
          name: $.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: Y ? B.sourceId : "",
          triggerDomainServiceId: !v && !Y ? B.sourceId : void 0,
          triggerUseCaseId: v ? B.sourceId : void 0,
          triggerEvent: k.name,
          targetId: P.id,
          targetUseCaseId: $.u.id
        });
        return;
      }
      const re = (_ == null ? void 0 : _.rm.name) ?? `${k.name}View`;
      if (this.model.flows.some(
        (F) => F.archetype === "MATERIALIZES" && F.triggerEvent === k.name && F.targetId === P.id && F.readModelName === re
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${se(k.name)}-${se(re)}`,
        name: re,
        archetype: "MATERIALIZES",
        triggerAggregateId: Y ? B.sourceId : "",
        triggerDomainServiceId: !v && !Y ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: k.name,
        targetId: P.id,
        readModelName: re
      });
      return;
    }
    const A = /* @__PURE__ */ new Set([
      ...V,
      ...T,
      ...x,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((k) => k.id))
    ]);
    if (A.has(e) || A.has(t) || R.has(t) || O.has(t))
      return;
    const L = new Set(this.model.externalSystems.map((v) => v.id));
    if (L.has(e)) {
      if (new Set(
        this.model.modules.flatMap((P) => (P.useCases ?? []).map((C) => C.id))
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
      const k = (this.model.apis ?? []).find(
        (P) => P.operations.some((C) => C.id === t)
      ), $ = /^apiop:(.+)@(.+)$/.exec(t), _ = k ? { operationId: t, siteId: k.id } : $ ? { operationId: $[1], siteId: $[2] } : null;
      if (_) {
        (this.model.externalOperationUses ?? []).some(
          (C) => C.externalSystemId === e && C.operationId === _.operationId && C.siteId === _.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: _.operationId,
          targetSiteId: _.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((P) => P.id === t) || (this.model.proxyApis ?? []).some((P) => P.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (C) => C.sourceId === e && C.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    L.has(t) || l.has(t);
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
      const o = this.memberIdOf(i, s), a = (this.model.views ?? []).find((n) => n.id === this._activeViewId);
      if (o && (a != null && a.memberIds.includes(o))) {
        this._deletePicker = { elementType: t, id: i, kind: s, memberId: o };
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
    var s, o, a;
    if (this._view === "eventstorming" && e === "edge" && i === "es-custom") {
      const n = /^escc:(.+)$/.exec(t), r = n ? this.owningUseCaseOf(n[1]) : null;
      n && r && (this._selectedId = null, this.command({ kind: "set-use-case-step-custom-code", useCaseId: r.id, id: n[1], targetId: null }));
      return;
    }
    if (this._view === "eventstorming" && e === "node" && i === "custom-code") {
      this._selectedId = null, this.command({ kind: "remove-custom-code", id: t });
      return;
    }
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
          const r = ve(n[1]);
          r && this.command({ kind: "set-menu-page", pageId: null, ...r });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const r = ve(n[1]);
          r && this.command({ kind: "set-menu-app", toAppId: null, ...r });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const r = ve(n[1]);
          r && this.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const r = ve(n[1]);
          r && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const r = ve(n[1]);
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
        const n = ve(t);
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
      if (i === "custom-code") {
        this.command({ kind: "remove-custom-code", id: t });
        return;
      }
      if (i === "button-group") {
        this.command({ kind: "remove-button-group", id: t });
        return;
      }
      if (i === "group-button") {
        const n = /^gbtn:([^:]+):(.+)$/.exec(t);
        n && this.command({ kind: "remove-group-button", id: n[1], itemId: n[2] });
        return;
      }
      if (i === "group-subgroup") {
        const n = /^gsub:([^:]+):(.+)$/.exec(t);
        n && this.command({ kind: "remove-group-subgroup", id: n[1], targetId: n[2] });
        return;
      }
      if (e === "edge" && i === "bar-group") {
        const n = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(t);
        n && this.command({ kind: "remove-page-bar-group", pageId: n[1], id: n[2] });
        return;
      }
      if (e === "edge" && i === "gbtn-target") {
        const n = /^gbtnt:([^:]+):(.+)$/.exec(t);
        n && this.command({ kind: "set-group-button-target", id: n[1], itemId: n[2], useCaseId: null });
        return;
      }
      if (e === "edge" && i === "ui-custom-page") {
        const n = /^ccpage:(.+)$/.exec(t);
        n && this.command({ kind: "set-page-custom-code", id: n[1], targetId: null });
        return;
      }
      if (e === "edge" && i === "cc-uses") {
        const n = /^ccuse:(.+)->(.+)$/.exec(t);
        n && this.command({ kind: "remove-custom-code-use", id: n[1], elementId: n[2] });
        return;
      }
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "model-mapping") {
      const n = /^mapping:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-model-mapping", id: n[1] }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "mapping-rule") {
      const n = /^maprule:([^:]+):(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-model-mapping-rule", id: n[1], itemId: n[2] }));
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "model-field") {
      const n = es(t);
      n && (this._selectedId = null, this.command({ kind: "remove-model-field", modelId: n.modelId, fieldId: n.fieldId }));
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "model") {
      this._selectedId = null, this.command({ kind: "remove-model", id: t });
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "custom-code") {
      this._selectedId = null, this.command({ kind: "remove-custom-code", id: t });
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "custom-of-transformation") {
      const n = /^cctf:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "set-transformation-custom-code", id: n[1], targetId: null }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "custom-of-mapping") {
      const n = /^ccmap:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "set-mapping-custom-code", id: n[1], targetId: null }));
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "transformation") {
      this._selectedId = null, this.command({ kind: "remove-transformation", id: t });
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "transform-input") {
      const n = /^tfin:([^:]+):([^:]+):(.*)$/.exec(t);
      n && (this._selectedId = null, this.command({
        kind: "remove-transformation-input",
        id: n[1],
        modelId: n[2],
        ...n[3] ? { fieldId: n[3] } : {}
      }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "transform-output") {
      const n = /^tfout:(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "set-transformation-output", id: n[1] }));
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
      const [, r, l] = n, p = (s = (this.model.apis ?? []).find(
        (g) => g.operations.some((y) => y.id === r)
      )) == null ? void 0 : s.id;
      if (!p) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, moduleId: l });
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
      const [, r, l, p] = n, g = /^apiimpl:.+@(.+)$/.exec(p), y = g ? g[1] : p;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: r, targetSiteId: y });
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
    if (this._view === "context-map" && e === "node" && i === "ui-app") {
      this._selectedId = null, this.command({ kind: "delete-ui-app", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "deploys") {
      const n = /^deploy:(.+)->(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-service-code-module", serviceId: n[1], id: n[2] }));
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "code-module") {
      this._selectedId = null, this.command({ kind: "remove-code-module", id: t });
      return;
    }
    if (this._view === "context-map" && this._detail === "distribution" && e === "node") {
      const n = this.sceneFor("context-map");
      for (let r = (o = n.nodes.find((l) => l.id === t)) == null ? void 0 : o.parentId; r; ) {
        if ((this.model.codeModules ?? []).some((l) => l.id === r)) {
          this._selectedId = null, this.command({ kind: "remove-code-module-element", id: r, elementId: t });
          return;
        }
        r = (a = n.nodes.find((l) => l.id === r)) == null ? void 0 : a.parentId;
      }
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
    const { id: t, kind: i, name: s } = e.detail;
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: s });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((o) => o.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const s = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${se(e)}`,
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
      id: `wfstep-${se(e)}`,
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
    const t = new Set(e.memberIds), i = (o, a, n = {}) => S`
      <label
        class="${n.child ? "child" : ""} ${n.implicit && !t.has(o) ? "implicit" : ""}"
        title=${n.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(r) => this.toggleViewMember(o, r.target.checked)}
        />
        ${a}
      </label>
    `, s = (o, a) => a.length ? S`<h4>${o}</h4>${a}` : "";
    return S`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((o) => [
        i(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((a) => a.moduleId === o.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(o.id) }))
      ])
    )}
        ${s(
      "Sistemas externos",
      this.model.externalSystems.map((o) => i(o.id, o.name))
    )}
        ${s("APIs", (this.model.apis ?? []).map((o) => i(o.id, o.name)))}
        ${s("Actores", (this.model.actors ?? []).map((o) => i(o.id, o.name)))}
        ${s("Agentes IA", (this.model.aiAgents ?? []).map((o) => i(o.id, o.name)))}
        ${s("Gateways MCP", (this.model.mcpGateways ?? []).map((o) => i(o.id, o.name)))}
        ${s("RAGs", (this.model.rags ?? []).map((o) => i(o.id, o.name)))}
        ${s("Flows", this.model.flows.map((o) => i(o.id, o.name)))}
        ${s("Procesos", (this.model.processes ?? []).map((o) => i(o.id, o.name)))}
        ${s("Workflows", (this.model.workflows ?? []).map((o) => i(o.id, o.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const s = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((o) => o.id === e.detail.id);
      this._editStepRole = (s == null ? void 0 : s.roleId) ?? "", this._editStepDeadline = (s == null ? void 0 : s.deadline) ?? "", this._editStepComp = (s == null ? void 0 : s.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const s = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((o) => o.id === e.detail.id);
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
      const s = e.nodes.find((o) => o.id === i);
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
            const o = ve(i);
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
    const i = `view-${se(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), s = new Set(i.map((h) => h.id)), o = this.model.externalSystems.filter((h) => t.has(h.id)), a = new Set(o.map((h) => h.id)), n = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || s.has(h.moduleId)
    ), r = new Set(n.map((h) => h.id)), l = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), p = /* @__PURE__ */ new Set(), g = (h) => {
      for (const d of h ?? [])
        d.pageId && p.add(d.pageId), g(d.children);
    };
    l.forEach((h) => g(h.menuItems));
    const y = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || p.has(h.id)
    ), m = new Set(l.map((h) => h.id));
    return {
      ...this.model,
      uiApps: l,
      pages: y,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => m.has(h.appId)),
      modules: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (h) => s.has(h.sourceId) && s.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (s.has(h.sourceId) || a.has(h.sourceId)) && (s.has(h.targetId) || a.has(h.targetId))
      ),
      aggregates: n,
      entities: (this.model.entities ?? []).filter((h) => r.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => r.has(h.sourceAggregateId) && r.has(h.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (h) => t.has(h.id) || (h.ownerModuleId ? s.has(h.ownerModuleId) : !1)
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
    K.CRUD_ROUTES[e.elementType] ? this._drawer = e : this.emit("modux-activate", e);
  }
  renderDrawer() {
    if (!this._drawer) return null;
    const e = K.CRUD_ROUTES[this._drawer.elementType], t = this._drawer;
    return S`
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
        <iframe src=${`${e}/${t.id}`} title=${t.id}></iframe>
      </aside>
    `;
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
    const t = e.detail.kind === "process-step" ? Oc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : wo(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const n of a ?? [])
        n.id && t.add(n.id), i(n.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const s = `mi-${se(e)}`;
    let o = s;
    for (let a = 2; t.has(o); a++) o = `${s}-${a}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((a) => a.id === e);
    let s = null;
    const o = (a, n) => {
      var l;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { node: r[p], parentId: n, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), o(r[p].children, r[p].id);
    };
    return o(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, o = !1, a) {
    const n = a ?? this.allComponentIds(), r = (y) => {
      if (!o) return y.id;
      const m = `cmp-${se(y.kind)}`;
      let h = m;
      for (let d = 2; n.has(h) || n.has(`${h}-tab-1`); d++) h = `${m}-${d}`;
      return n.add(h), h;
    }, l = [], p = (y, m) => {
      const h = r(y);
      l.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: y.kind, parentComponentId: m }), y.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), l.push({
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
      for (const d of y.children ?? []) p(d, h);
      return h;
    }, g = p(t, i);
    return s && l.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: l, rootId: g };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const s of i ?? [])
        e.add(s.id), t(s.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const n of a ?? [])
        t.add(n.id), i(n.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const s = `cmp-${se(e)}`;
    let o = s;
    for (let a = 2; t.has(o) || t.has(`${o}-tab-1`); a++) o = `${s}-${a}`;
    return o;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var a;
    if (i === t) return;
    const s = (((a = (this.model.pages ?? []).find((n) => n.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((n) => n.id ?? n.pageId), o = s.indexOf(t);
    o >= 0 && (i ? s[o + 1] === i : o === s.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let s = null;
    const o = (a, n) => {
      var l;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { entry: r[p], parentId: n, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), o(r[p].children, r[p].id ?? null);
    };
    return o(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var n;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, ae.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, s = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (n = (r.node.children ?? [])[0]) == null ? void 0 : n.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: a } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const r of o) this.command(r, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: a }]), this._selectedCmp = { pageId: t, componentId: a };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return S`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var n;
      const { id: i, w: s, h: o } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((n = a.sizes) == null ? void 0 : n[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...a,
        sizes: { ...a.sizes ?? {}, [i]: { w: s, h: o } }
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
      const { pageId: i, componentId: s, ...o } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: s, ...o });
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
      const { pageId: i, fieldId: s, stereotype: o, colspan: a, label: n } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: o, colspan: a, label: n });
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
          (s) => (s.scheduledTriggers ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: e.modules.flatMap((s) => (s.useCases ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.modules.flatMap((s) => [
          ...(s.domainEvents ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(s.applicationEvents ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: e.modules.flatMap((s) => (s.readModels ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap(
          (s) => (s.queryServices ?? []).flatMap(
            (o) => (o.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${o.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap((s) => (s.queryServices ?? []).map((o) => ({ id: o.id, name: o.name })))
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
          ...(s.useCases ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(s.tables ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(s.mcpServers ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: (e.apis ?? []).flatMap((s) => s.operations.map((o) => ({ id: o.id, name: o.name })))
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
      items: i ? s.items.filter((o) => o.name.toLowerCase().includes(i)) : s.items
    })).filter((s) => s.items.length > 0);
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
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), o = i.nodeIdAtClient(e.clientX, e.clientY), a = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let n;
    try {
      n = JSON.parse(t);
    } catch {
      return;
    }
    n.new ? this.createFromPalette(n.new, s, o, a) : n.existing && this.placeExistingFromPalette(n.existing, s, o, e.clientX, e.clientY, a);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((o) => o.id)), s = this.model;
    for (const o of [
      s.modules.map((a) => a.id),
      s.modules.flatMap((a) => (a.useCases ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.domainEvents ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.applicationEvents ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.readModels ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.domainServices ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.queryServices ?? []).map((n) => n.id)),
      s.modules.flatMap((a) => (a.scheduledTriggers ?? []).map((n) => n.id)),
      (s.aggregates ?? []).map((a) => a.id),
      (s.entities ?? []).map((a) => a.id),
      (s.actors ?? []).map((a) => a.id),
      s.externalSystems.map((a) => a.id),
      s.externalSystems.flatMap((a) => (a.useCases ?? []).map((n) => n.id)),
      s.externalSystems.flatMap((a) => (a.tables ?? []).map((n) => n.id)),
      s.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((n) => n.id)),
      (s.apis ?? []).map((a) => a.id),
      (s.apis ?? []).flatMap((a) => (a.operations ?? []).map((n) => n.id)),
      (s.proxyApis ?? []).map((a) => a.id),
      (s.aiAgents ?? []).map((a) => a.id),
      (s.mcpGateways ?? []).map((a) => a.id),
      (s.rags ?? []).map((a) => a.id),
      (s.workflows ?? []).map((a) => a.id),
      (s.workflows ?? []).flatMap((a) => (a.steps ?? []).map((n) => n.id)),
      (s.etlFlows ?? []).map((a) => a.id),
      (s.identityProviders ?? []).map((a) => a.id),
      (s.notifications ?? []).map((a) => a.id),
      (s.documents ?? []).map((a) => a.id),
      (s.uiApps ?? []).map((a) => a.id),
      (s.pages ?? []).map((a) => a.id),
      (s.codeModules ?? []).map((a) => a.id),
      (s.services ?? []).map((a) => a.id),
      (s.models ?? []).flatMap((a) => (a.fields ?? []).map((n) => n.id)),
      (s.customCodes ?? []).map((a) => a.id),
      (s.buttonGroups ?? []).map((a) => a.id)
    ])
      o.forEach((a) => i.add(a));
    for (let o = 1; ; o++) {
      const a = o === 1 ? e : `${e} ${o}`, n = `${t}${se(a)}`;
      if (!i.has(n)) return { id: n, name: a };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var a, n;
    if (!t) return null;
    const i = this.sceneFor(this._view), s = [];
    for (let r = t; r; )
      s.push(r), r = (a = i.nodes.find((l) => l.id === r)) == null ? void 0 : a.parentId;
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
    ].includes(e)) return s.find((r) => this.model.modules.some((l) => l.id === r)) ?? null;
    if (e === "read-model") {
      const r = s.find((p) => (this.model.aggregates ?? []).some((g) => g.id === p));
      if (r) return r;
      const l = s.find((p) => this.model.modules.some((g) => g.id === p));
      return ((n = (this.model.aggregates ?? []).find((p) => p.moduleId === l)) == null ? void 0 : n.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null;
    if (e === "model-field")
      return s.find((r) => (this.model.models ?? []).some((l) => l.id === r)) ?? null;
    if (e === "ui-button")
      return s.find((r) => (this.model.buttonGroups ?? []).some((l) => l.id === r)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (r) => this.model.modules.some((l) => (l.useCases ?? []).some((p) => p.id === r))
      ) ?? null;
    if (e === "api-operation") {
      for (const r of s) {
        if ((this.model.apis ?? []).some((g) => g.id === r)) return r;
        const l = /^apiimpl:(.+)@(.+)$/.exec(r);
        if (l && (this.model.apis ?? []).some((g) => g.id === l[1])) return l[1];
        const p = (this.model.proxyApis ?? []).find((g) => g.id === r);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? s.find((r) => this.model.modules.some((l) => l.id === r)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var h, d, u, f, b, M, R, V;
    const o = K.PALETTE_NEW.find((O) => O.type === e);
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
      const O = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, T = O ? O[1] : i && (this.model.pages ?? []).some((w) => w.id === i) ? i : null;
      if (!T) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: x, name: z } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: x, name: z }, !1), O ? (this.command({ kind: "set-page-component-custom-code", pageId: T, componentId: O[2], targetId: x }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: T, targetId: x }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const O = e.slice(4), T = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, x = T ? T[1] : i && (this.model.pages ?? []).some((q) => q.id === i) ? i : null;
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let z = T ? T[2] : void 0, w = null;
      if (O === "tab") {
        let q = null, H = z ? this.componentIn(x, z) : null;
        for (; H; ) {
          if (H.node.kind === "tabLayout") {
            q = H.node.id;
            break;
          }
          H = H.parentId ? this.componentIn(x, H.parentId) : null;
        }
        if (!q) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const I = this.componentIn(x, q).node, E = this.newComponentId("tab"), v = `Pestaña ${(I.children ?? []).filter((k) => k.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: x, componentId: E, componentKind: "tab", parentComponentId: q }, !1), this.command({ kind: "set-page-component", pageId: x, componentId: E, title: v }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: E }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const q = this.componentIn(x, s.componentId);
        q && q.node.kind === "tab" ? z = q.node.id : q && (z = q.parentId ?? void 0, w = s.pos === "before" ? s.componentId : q.beforeId);
      } else if (z) {
        const q = ((h = this.componentIn(x, z)) == null ? void 0 : h.node) ?? null;
        (q == null ? void 0 : q.kind) === "tabLayout" && (q.children ?? [])[0] && (z = (q.children ?? [])[0].id);
      }
      const A = this.newComponentId(O), L = {
        kind: "add-page-component",
        pageId: x,
        componentId: A,
        componentKind: O,
        parentComponentId: z
      };
      if (!w) {
        this.command(L);
        return;
      }
      this.command(L, !1), this.command(
        { kind: "move-page-component", pageId: x, componentId: A, parentComponentId: z ?? null, beforeComponentId: w },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: A }]);
      return;
    }
    const a = this._view, n = this.sceneFor(a), r = (O, T) => {
      const x = this.viewLayout(a), z = T ? n.nodes.find((A) => A.id === T) : void 0, w = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...x, nodes: { ...x.nodes, [O]: w } }), { kind: "move-node", view: a, id: O, pos: null };
    }, l = (O, T, x) => {
      const z = this.inverseOf(O) ?? [];
      this.command(O, !1);
      const w = r(T, x);
      this.pushUndoEntry([...z, w]);
    };
    if (!o.child) {
      const O = {
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
      }, { id: T, name: x } = this.uniquePaletteName(o.label, O[e] ?? ""), z = e === "module" ? { kind: "add-module", id: T, name: x, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: T, name: x } : e === "external-system" ? { kind: "add-external-system", id: T, name: x } : e === "ai-agent" ? { kind: "add-ai-agent", id: T, name: x } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: T, name: x, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: T, name: x } : e === "rag" ? { kind: "add-rag", id: T, name: x } : e === "api" ? { kind: "add-api", id: T, name: x } : e === "proxy-api" ? { kind: "add-proxy-api", id: T, name: x } : e === "ui-app" ? { kind: "create-ui-app", id: T, name: x } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: T, name: x, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: T, name: x, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: T, name: x, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: T, name: x } : e === "transformation" ? { kind: "add-transformation", id: T, name: x } : e === "custom-code" ? { kind: "add-custom-code", id: T, name: x } : e === "button-group" ? { kind: "add-button-group", id: T, name: x } : e === "identity-provider" ? { kind: "add-identity-provider", id: T, name: x } : {
        kind: "add-workflow",
        id: T,
        name: x,
        completionEventName: `${x.replace(/\s+/g, "")}Completado`
      };
      if (z.kind === "create-ui-app") {
        const w = [];
        for (let L = i ?? void 0; L; )
          w.push(L), L = (d = n.nodes.find((q) => q.id === L)) == null ? void 0 : d.parentId;
        const A = w.find((L) => this.model.modules.some((q) => q.id === L));
        if (A) {
          l({ ...z, moduleId: A }, T, A);
          return;
        }
      }
      l(z, T);
      return;
    }
    if (e === "ui-wizard-step") {
      const O = [];
      for (let A = i ?? void 0; A; )
        O.push(A), A = (u = n.nodes.find((L) => L.id === A)) == null ? void 0 : u.parentId;
      const T = O.map((A) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(A)) == null ? void 0 : L[1]) ?? A;
      }).find((A) => (this.model.pages ?? []).some((L) => L.id === A && L.type === "WIZARD"));
      if (!T) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const x = ((f = (this.model.pages ?? []).find((A) => A.id === T)) == null ? void 0 : f.wizardSteps) ?? [], z = new Set(x.map((A) => A.id ?? A.pageId));
      let w = x.length + 1;
      for (; z.has(`wzs-${w}`); ) w++;
      this.command({ kind: "add-page-wizard-step", pageId: T, itemId: `wzs-${w}`, label: `Paso ${w}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const O = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", T = O === "CRUD" ? "CRUD" : O === "WIZARD" ? "Wizard" : "Página", { id: x, name: z } = this.uniquePaletteName(T, "page-"), w = [];
      for (let q = i ?? void 0; q; )
        w.push(q), q = (b = n.nodes.find((H) => H.id === q)) == null ? void 0 : b.parentId;
      const A = w.find((q) => (this.model.uiApps ?? []).some((H) => H.id === q)), L = w.map((q) => {
        var H;
        return ((H = /^wizrow:([^:]+):/.exec(q)) == null ? void 0 : H[1]) ?? q;
      }).find((q) => (this.model.pages ?? []).some((H) => H.id === q && H.type === "WIZARD"));
      if (L) {
        const q = n.nodes.find((I) => I.id === L);
        q && (t.x = q.x + q.w / 2 + 160, t.y = q.y - q.h / 2 + 40), this.command({ kind: "create-ui-page", id: x, name: z, pageType: O }, !1), this.command({ kind: "add-page-wizard-step", pageId: L, targetId: x }, !1);
        const H = r(x);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: x }, H]), this.emit("modux-notice", { message: `${z} creada como paso del wizard` });
        return;
      }
      if (A) {
        const q = n.nodes.find((H) => H.id === A);
        q && (t.x = q.x + q.w / 2 + 160, t.y = q.y - q.h / 2 + 40);
      }
      l(
        A ? { kind: "create-ui-page", id: x, name: z, pageType: O, appId: A, menuLabel: z } : { kind: "create-ui-page", id: x, name: z, pageType: O },
        x
      );
      return;
    }
    if (e === "menu-item") {
      const O = [];
      for (let L = i ?? void 0; L; )
        O.push(L), L = (M = n.nodes.find((q) => q.id === L)) == null ? void 0 : M.parentId;
      const T = O.find((L) => (this.model.uiApps ?? []).some((q) => q.id === L));
      if (!T) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const x = /* @__PURE__ */ new Set(), z = (L) => {
        for (const q of L ?? [])
          x.add(q.label), z(q.children);
      };
      (this.model.uiApps ?? []).forEach((L) => z(L.menuItems));
      let w = "Entrada";
      for (let L = 2; x.has(w); L++) w = `Entrada ${L}`;
      const A = O.map((L) => ve(L)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: T,
        label: w,
        itemId: this.newMenuItemId(w),
        parentId: A == null ? void 0 : A.itemId,
        parentLabel: A != null && A.itemId || A == null ? void 0 : A.label
      });
      return;
    }
    if (e === "etl-transform") {
      const O = [];
      for (let w = i ?? void 0; w; )
        O.push(w), w = (R = n.nodes.find((A) => A.id === w)) == null ? void 0 : R.parentId;
      const T = O.map((w) => (this.model.etlFlows ?? []).find((A) => A.id === w)).find(Boolean);
      if (!T) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const x = new Set((T.steps ?? []).map((w) => w.id));
      let z = (T.steps ?? []).length + 1;
      for (; x.has(`ets-${z}`); ) z++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: T.id,
        id: `ets-${z}`,
        name: `Transformación ${z}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const O = this.model.workflows ?? [], T = [];
      for (let q = i ?? void 0; q; )
        T.push(q), q = (V = n.nodes.find((H) => H.id === q)) == null ? void 0 : V.parentId;
      const x = T.map((q) => O.find((H) => H.id === q)).find(Boolean), z = T.map((q) => {
        const H = O.find((I) => (I.steps ?? []).some((E) => E.id === q));
        return H ? { owner: H, stepId: q } : null;
      }).find(Boolean), w = x ?? (z == null ? void 0 : z.owner);
      if (!w) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: A, name: L } = this.uniquePaletteName("Paso", "wfs-");
      z && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: w.id,
          id: A,
          name: L,
          ...z ? { dependsOnStepIds: [z.stepId], afterStepId: z.stepId } : {}
        },
        A
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${w.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const O = this.dropContainerFor("api", i);
      if (!O) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: T, name: x } = this.uniquePaletteName("API", "api-"), z = { kind: "add-api", id: T, name: x }, w = this.inverseOf(z) ?? [];
      this.command(z, !1), this.model.externalSystems.some((H) => H.id === O) ? this.command({ kind: "set-api-publisher", id: T, targetId: O }, !1) : this.command({ kind: "add-api-implementation", apiId: T, moduleId: O }, !1);
      const A = this.viewLayout(this._view), L = this.sceneFor(this._view).nodes.find((H) => H.id === O), q = L ? { x: Math.round(t.x - L.x), y: Math.round(t.y - L.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...A, nodes: { ...A.nodes, [T]: q } }), this.pushUndoEntry([...w, { kind: "move-node", view: this._view, id: T, pos: null }]);
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
    }, { id: y, name: m } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: y, name: m, moduleId: p }, y, p);
    else if (e === "ui-button") {
      const O = (this.model.buttonGroups ?? []).find((z) => z.id === p), T = new Set(((O == null ? void 0 : O.buttons) ?? []).map((z) => z.id));
      let x = ((O == null ? void 0 : O.buttons) ?? []).length + 1;
      for (; T.has(`btn-${x}`); ) x++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${x}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: y, name: m });
    else if (e === "code-module")
      l({ kind: "add-code-module", id: y, name: m, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: y, name: m, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        y,
        p
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: y, name: m, moduleId: p }, y, p);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: y, name: m, moduleId: p }, y, p);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: y, name: m, moduleId: p }, y, p);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: y, name: m, moduleId: p }, y, p);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: y, name: m, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: y, name: m, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: y, name: m, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: y, name: m, moduleId: p }, y, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const O = (this.model.aggregates ?? []).find((T) => T.id === p);
      l({ kind: "add-read-model", id: y, name: m, aggregateId: p }, y, (O == null ? void 0 : O.moduleId) ?? p);
    } else if (e === "api-operation") {
      const O = (this.model.apis ?? []).find((A) => A.id === p), T = new Set(((O == null ? void 0 : O.operations) ?? []).map((A) => A.id));
      let x = m, z = `apiop-${p.replace(/^api-/, "")}-${se(x)}`;
      for (let A = 2; T.has(z); A++)
        x = `${o.label} ${A}`, z = `apiop-${p.replace(/^api-/, "")}-${se(x)}`;
      l({ kind: "add-api-operation", apiId: p, id: z, name: x }, z, p), n.nodes.some(
        (A) => A.parentId === p && (A.kind === "api-operation" || A.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(O == null ? void 0 : O.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const O = this.model.modules.flatMap((w) => w.useCases ?? []).find((w) => w.id === p), T = new Set((O == null ? void 0 : O.stepIds) ?? []);
      let x = m, z = `step-${se(x)}`;
      for (let w = 2; T.has(z); w++)
        x = `${o.label} ${w}`, z = `step-${se(x)}`;
      l({ kind: "add-use-case-step", useCaseId: p, id: z, name: x }, z, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(O == null ? void 0 : O.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: y, name: m, moduleId: p }, y, p) : e === "external-table" ? l({ kind: "add-external-table", id: y, name: m, moduleId: p }, y, p) : e === "mcp-server" && l({ kind: "add-mcp-server", id: y, name: m, moduleId: p }, y, p);
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
    const s = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (s) {
      const h = (this.model.modelMappings ?? []).find((u) => u.id === e);
      if (h) {
        this.command({
          kind: "set-page-button",
          pageId: s[1],
          useCaseId: s[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${h.name}` });
        return;
      }
      const d = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (d) {
        if (e === s[2]) return;
        const u = (this.model.pages ?? []).find((b) => b.id === s[1]), f = ((u == null ? void 0 : u.buttons) ?? []).find((b) => b.useCaseId === s[2]);
        if (!f) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((b) => b.useCaseId === e)) {
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
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${d.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const h = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!h) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const d = (this.model.pages ?? []).find((u) => u.id === o[1]);
      if (((d == null ? void 0 : d.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${h.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, n = a ? a[1] : t && (this.model.pages ?? []).some((h) => h.id === t) ? t : null;
    if (!n) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = a ? ((m = this.componentIn(n, a[2])) == null ? void 0 : m.node) ?? null : null, l = this.model.modules.flatMap((h) => h.useCases ?? []).find((h) => h.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: r.id, useCaseId: e, label: r.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((h) => h.id === e);
    if (p) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: n, componentId: r.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: n, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((h) => h.id === e);
    if (g && (r == null ? void 0 : r.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: n, componentId: r.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const y = this.model.modules.flatMap((h) => (h.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((u) => ({ op: u, qs: d })))).find(({ op: h }) => h.id === e);
    if (y) {
      (r == null ? void 0 : r.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: n,
        componentId: r.id,
        queryOperationId: y.op.id,
        queryServiceId: y.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: n, queryServiceId: y.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${y.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, i, s, o, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, a);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, s, o);
      return;
    }
    const n = this._view, r = this.sceneFor(n), l = r.nodes.find((m) => m.id === e);
    if (!l) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const m = this.viewLayout(n);
        this.writeViewLayout(n, {
          ...m,
          nodes: { ...m.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(n), g = l.parentId ? r.nodes.find((m) => m.id === l.parentId) : void 0, y = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: n, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(n, { ...p, nodes: { ...p.nodes, [e]: y } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = K.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type === "custom-code" || s.type.startsWith("cmp:") : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(s.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return S`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? S`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${K.PALETTE_GROUPS.map((s) => {
      const o = t.filter((a) => a.group === s);
      return o.length ? S`
                        <div class="palette-g">${s}</div>
                        ${o.map(
        (a) => S`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(n) => this.onPaletteDragStart(n, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${$t[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : S`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => S`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (o) => S`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${$t[s.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : S`
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
    var t, i, s, o, a, n, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${se(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((o = this.model.modules[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!l || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${se(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${se(e)}`,
          name: e,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((r = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? zn(i, t.nodes) : e === "flows" ? jn(i, t.nodes) : e === "processes" ? Ps(i, t.nodes) : e === "workflows" ? oc(i, t.nodes) : e === "ui" ? cc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? pc(i, t.nodes) : e === "eventstorming" ? Xl(i, t.nodes) : Pn(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const o of s.nodes) {
        const a = this.diff[o.id] ?? this.diff[o.id.replace(/^(tgt:|flow:)/, "")];
        a && (o.diffKind = a);
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
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), o = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, n = await uc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((p) => ({
        kind: "move-node",
        view: e,
        id: p.id,
        pos: r.nodes[p.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(r.edges).map((p) => ({
        kind: "set-edge-points",
        view: e,
        id: p,
        points: r.edges[p]
      }))
    ]), this.writeViewLayout(e, { nodes: n, edges: {}, sizes: r.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var o;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, s = e.type === "click" && !!t.closest("button");
    !i && !s || (o = this.renderRoot.querySelector("modux-canvas")) == null || o.focus();
  }
  render() {
    const e = this.sceneFor(this._view);
    return S`
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
            <optgroup label="Explorar">
              <option value="view:explorer" ?selected=${this._view === "explorer"}>
                Explorador del modelo
              </option>
            </optgroup>
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
      (t) => S`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? S`
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
      (t) => S`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? S`
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
        ${this._view === "aggregates" || this._view === "processes" ? S`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return S`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? S`
              ${this._view === "flows" ? S`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => S`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return S`<option
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
              ${this._view === "flows" ? S`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return S`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? S`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => S`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? S`
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
      (t) => S`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? S`<input
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
              ${this.owningProcessOf(this._selectedId) ? S`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? S`
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
      (t) => S`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? S`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => S`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
          ?disabled=${this._view === "explorer"}
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
        <button
          class="tab"
          ?disabled=${this._view === "explorer"}
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
      ${this.renderDrawer()}
      ${this._view === "design" ? S`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? S`<modux-explorer
            .model=${this.model}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = wo(t.detail.id, i);
      s && this.openInDrawer(s);
    }}
            @explorer-connect=${(t) => {
      const { sourceId: i, targetId: s, x: o, y: a } = t.detail, n = (l) => this.model.modules.some((p) => p.id === l);
      if (n(i) && n(s)) {
        const l = this.model.relations.find(
          (p) => p.sourceId === i && p.targetId === s && p.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: s,
          mode: l ? "edit" : "create",
          x: o ?? this.clientWidth / 2,
          y: a ?? 120
        };
        return;
      }
      const r = this._view;
      this._view = "context-map";
      try {
        this.applyConnection(i, s);
      } finally {
        this._view = r;
      }
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
      ]), s = [...new Set(
        t.detail.members.filter((a) => i.has(a.kind)).map((a) => a.id)
      )];
      if (!s.length) {
        this.emit("modux-notice", { message: "Despliega algo antes de crear la vista" });
        return;
      }
      const o = `view-${se(t.detail.name)}`;
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: s }), this._activeViewId = o, this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${s.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? S`
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
          ></modux-tilt>` : S`
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
        ${this._view === "context-map" ? S`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? S`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? S`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : S`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
      ${this.renderHelpPopover()}
    `;
  }
  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  renderHelpPopover() {
    return this._helpOpen ? S`
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
      ([t, i]) => S`
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
    return S`
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
      (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
    )) == null ? void 0 : s.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return S`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => S`
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
    return e ? S`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => S`
            <button
              class="picker-item"
              title=${t.id}
              @click=${() => {
        this._repoPicker = null;
        const i = `proj-${t.id}`;
        this.command({ kind: "add-project-reference", targetId: t.id, id: i }, !1);
        const s = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...s,
          nodes: { ...s.nodes, [i]: { x: Math.round(e.pos.x), y: Math.round(e.pos.y) } }
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
  renderRelationPicker() {
    var i;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (i = this.model.relations.find(
      (s) => s.sourceId === e.sourceId && s.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return S`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Pc.map(
      (s) => S`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${us[s].abbr}</span>
              <span class="name">${us[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
K.styles = It`
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
K.CRUD_ROUTES = {
  module: "/organizacion/modules",
  aggregate: "/domainModel/aggregates",
  entity: "/domainModel/entities",
  flow: "/patrones/flows",
  process: "/patrones/processes",
  workflow: "/patrones/workflows",
  "use-case": "/behaviour/useCases",
  "domain-event": "/domainModel/domainEvents",
  subscription: "/inbound/subscriptions",
  projection: "/behaviour/projections",
  "read-model": "/patrones/readModels"
};
K.PALETTE_GROUPS = [
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
];
K.PALETTE_NEW = [
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
ie([
  ne({ attribute: !1 })
], K.prototype, "model", 2);
ie([
  ne({ attribute: !1 })
], K.prototype, "layout", 2);
ie([
  ne({ attribute: !1 })
], K.prototype, "diff", 2);
ie([
  U()
], K.prototype, "_view", 2);
ie([
  U()
], K.prototype, "_detail", 2);
ie([
  U()
], K.prototype, "_relationType", 2);
ie([
  U()
], K.prototype, "_relationPicker", 2);
ie([
  U()
], K.prototype, "_extDepPicker", 2);
ie([
  U()
], K.prototype, "_selectedId", 2);
ie([
  U()
], K.prototype, "_paletteOpen", 2);
ie([
  U()
], K.prototype, "_drawer", 2);
ie([
  ne({ attribute: !1 })
], K.prototype, "repositories", 2);
ie([
  U()
], K.prototype, "_repoPicker", 2);
ie([
  U()
], K.prototype, "_paletteFilter", 2);
ie([
  U()
], K.prototype, "_paletteTab", 2);
ie([
  U()
], K.prototype, "_selectedCmp", 2);
ie([
  U()
], K.prototype, "_fullscreen", 2);
ie([
  U()
], K.prototype, "_tilt", 2);
ie([
  U()
], K.prototype, "_helpOpen", 2);
ie([
  U()
], K.prototype, "_newName", 2);
ie([
  U()
], K.prototype, "_newModuleId", 2);
ie([
  U()
], K.prototype, "_newArchetype", 2);
ie([
  U()
], K.prototype, "_newTriggerAggId", 2);
ie([
  U()
], K.prototype, "_newTriggerEvent", 2);
ie([
  U()
], K.prototype, "_newTargetId", 2);
ie([
  U()
], K.prototype, "_undoStack", 2);
ie([
  U()
], K.prototype, "_redoStack", 2);
ie([
  U()
], K.prototype, "_newStepName", 2);
ie([
  U()
], K.prototype, "_newStepType", 2);
ie([
  U()
], K.prototype, "_newStepRole", 2);
ie([
  U()
], K.prototype, "_newStepDeadline", 2);
ie([
  U()
], K.prototype, "_editStepRole", 2);
ie([
  U()
], K.prototype, "_editStepDeadline", 2);
ie([
  U()
], K.prototype, "_editStepComp", 2);
ie([
  U()
], K.prototype, "_newStepUseCase", 2);
ie([
  U()
], K.prototype, "_newStepEmits", 2);
ie([
  U()
], K.prototype, "_editStepUseCase", 2);
ie([
  U()
], K.prototype, "_editStepEmits", 2);
ie([
  U()
], K.prototype, "_editStepAwaits", 2);
ie([
  U()
], K.prototype, "_multi", 2);
ie([
  U()
], K.prototype, "_newViewName", 2);
ie([
  U()
], K.prototype, "_activeViewId", 2);
ie([
  U()
], K.prototype, "_newRagSourceType", 2);
ie([
  U()
], K.prototype, "_newRagSourceUri", 2);
ie([
  U()
], K.prototype, "_addMemberKey", 2);
ie([
  U()
], K.prototype, "_treeOpen", 2);
ie([
  U()
], K.prototype, "_deletePicker", 2);
K = ie([
  yt("modux-editor")
], K);
var Nc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, we = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Rc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Nc(t, i, o), o;
};
let he = class extends Fe {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._writes = 0, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._taggingVersion = !1, this._newTagName = "", this._tagsOpen = !1, this._tags = [], this._repositories = [], this._diff = null, this._diffListOpen = !1, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
    ], t = (s) => he.TYPE_LABELS[s] ?? s;
    return S`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: o, mark: a, cls: n }) => {
      const r = this._diff.changes.filter((l) => l.kind === s);
      return r.length ? S`
            <div class="diff-group">${o} (${r.length})</div>
            ${r.map(
        (l) => S`
                <div class="diff-row">
                  <span class="diff-mark ${n}">${a}</span>
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), s = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, s.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(s));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var o, a, n;
    const i = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var r;
      try {
        const l = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!l.ok) {
          let p = `El servidor rechazó la operación (${l.status})`;
          try {
            const g = await l.json();
            g != null && g.message && (p = g.message);
          } catch {
          }
          this.showToast(p);
          return;
        }
        this._workspace = await l.json(), await this.reload(), await this.refreshDiff(), (r = this.renderRoot.querySelector("modux-editor")) == null || r.clearHistory();
      } catch (l) {
        this.showToast(String(l));
      }
    });
    const s = (a = this._workspace) == null ? void 0 : a.current;
    if (s && s !== i) {
      const r = ((n = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : n.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${r}`
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
    return this._tagsOpen ? S`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => S`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : S`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: s, homeExternalId: o, homeModuleId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const n = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!n.ok) {
          let g = `El servidor rechazó el contrato (${n.status})`;
          try {
            const y = await n.json();
            y != null && y.message && (g = y.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: r } = await n.json(), l = o ? { kind: "set-api-publisher", id: r, targetId: o } : a ? { kind: "add-api-implementation", apiId: r, moduleId: a } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
      } catch (n) {
        this.showToast(String(n));
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
            const o = await t.json();
            o != null && o.message && (s = o.message);
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
    return this._error ? S`<div class="status error">modux editor: ${this._error}</div>` : this._model ? S`
      ${this._workspace ? S`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : S`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? S`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : S`<button
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
      const i = (s) => this._diff.changes.filter((o) => o.kind === s).length;
      return S`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? S`
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
        (o) => o.branch === this._workspace.current
      )) == null ? void 0 : s.status;
      return S`
                      ${i === "EXPLORING" ? S`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? S`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? S`<button
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
      ${this._mergeFlow ? S`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => S`
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
      ${this._toast ? S`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : S`<div class="status">Cargando el modelo…</div>`;
  }
};
he.styles = It`
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
  ne()
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
he = we([
  yt("modux-editor-connected")
], he);
export {
  Dc as CONTAINER_HEADER,
  Lc as CONTAINER_INSET,
  ge as ModuxCanvas,
  K as ModuxEditor,
  he as ModuxEditorConnected,
  zn as aggregatesScene,
  ct as apiImplNodeId,
  lt as apiOpOccurrenceId,
  _i as containerFit,
  wn as containerMinSize,
  Pn as contextMapScene,
  Sn as flowCoherence,
  jn as flowsScene,
  ci as normalizeViewLayout,
  Ps as processesScene,
  En as relationEdgeId,
  Di as resolveOverlaps
};
