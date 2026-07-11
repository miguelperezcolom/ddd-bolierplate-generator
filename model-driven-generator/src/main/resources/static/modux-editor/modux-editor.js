const Dc = 34, Lc = 10;
function Ti(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let a = !1;
    for (let o = 0; o < e.length; o++)
      for (let r = o + 1; r < e.length; r++) {
        const l = e[o], p = e[r], g = i.get(l.id), I = i.get(p.id), h = I.x - g.x, m = I.y - g.y, d = (l.w + p.w) / 2 + t - Math.abs(h), u = (l.h + p.h) / 2 + t - Math.abs(m);
        if (!(d <= 0 || u <= 0))
          if (a = !0, d < u) {
            const f = (h >= 0 ? 1 : -1) * d / 2;
            g.x -= f, I.x += f;
          } else {
            const f = (m >= 0 ? 1 : -1) * u / 2;
            g.y -= f, I.y += f;
          }
      }
    if (!a) break;
  }
  const s = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = i.get(n.id);
    (Math.abs(a.x - n.x) > 0.5 || Math.abs(a.y - n.y) > 0.5) && s.set(n.id, a);
  }
  return s;
}
function xo(e, t = { w: 160, h: 90 }) {
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
function wi(e, t, i) {
  let s = t.w / 2, n = t.w / 2, a = t.h / 2, o = t.h / 2;
  for (const r of i)
    s = Math.max(s, -r.dx + r.w / 2 + 10), n = Math.max(n, r.dx + r.w / 2 + 10), a = Math.max(a, -r.dy + r.h / 2 + 34), o = Math.max(o, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (o - a) / 2,
    w: s + n,
    h: a + o
  };
}
function oi(e) {
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
const ko = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, _o = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, $o = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, He = 168, Ge = 56;
function at(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ot(e, t) {
  return `apiop:${e}@${t}`;
}
const ks = { compact: 0, coarse: 1, full: 2 };
function _s(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: ks[e ? t : s] > ks[n] };
}
function bn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: at(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const xn = 34, kn = 14, Eo = 14, xe = 108, be = 32, ls = 12, bi = 10, Je = 2, _n = Je * xe + (Je - 1) * ls + 2 * kn;
function So(e, t) {
  return `rel:${e}->${t}`;
}
function Co(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function yt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Zi = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, xi = {
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
}, Wt = {
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
function ki(e) {
  const t = Math.max(1, Math.ceil(e / Je)), i = t * be + (t - 1) * bi;
  return { w: _n, h: xn + i + Eo };
}
function xt(e, t) {
  const i = e % Je, s = Math.floor(e / Je);
  return {
    x: -t.w / 2 + kn + i * (xe + ls) + xe / 2,
    y: -t.h / 2 + xn + s * (be + bi) + be / 2
  };
}
function $n(e, t) {
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
function Mo(e, t, i, s, n, a, o = !1) {
  const r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...bn(e, t.id),
    ...$n(e, t)
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: He, h: Ge }];
  if (o) {
    const l = new Map((e.apis ?? []).map((g) => [g.id, g])), p = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && l.has(g.apiId)).map((g) => {
      const I = l.get(g.apiId);
      return {
        id: at(g.apiId, g.moduleId),
        name: I.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${I.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (I.operations ?? []).map((h) => ({
          id: ot(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (p.length > 0) {
      const g = r.filter((I) => I.kind !== "api-impl");
      return En(i, s, p, g, n, a);
    }
  }
  return zt(i, s, r, n, a);
}
function En(e, t, i, s, n, a, o = /* @__PURE__ */ new Set()) {
  const r = a[t.id] ?? ki(i.length + s.length), l = i.map((m, d) => {
    const u = n[m.id] ?? xt(d, r), f = o.has(m.id) ? [] : m.ops, b = a[m.id] ?? ki(f.length), C = f.map((W, P) => n[W.id] ?? xt(P, b)), N = wi(
      { x: u.x, y: u.y },
      b,
      C.map((W) => ({ dx: W.x, dy: W.y, w: xe, h: be }))
    );
    return { a: m, off: u, ops: f, opOffs: C, fit: N };
  }), p = s.map(
    (m, d) => n[m.id] ?? xt(i.length + d, r)
  ), g = Ti(
    [
      ...l.map((m) => ({ id: m.a.id, x: m.fit.x, y: m.fit.y, w: m.fit.w, h: m.fit.h })),
      ...s.map((m, d) => ({
        id: m.id,
        x: p[d].x,
        y: p[d].y,
        w: xe,
        h: be
      }))
    ],
    24
  );
  for (const m of l) {
    const d = g.get(m.a.id);
    d && (m.off = { x: m.off.x + (d.x - m.fit.x), y: m.off.y + (d.y - m.fit.y) }, m.fit = { ...m.fit, x: d.x, y: d.y });
  }
  s.forEach((m, d) => {
    const u = g.get(m.id);
    u && (p[d] = { x: u.x, y: u.y });
  });
  const I = wi(e, r, [
    ...l.map((m) => ({ dx: m.fit.x, dy: m.fit.y, w: m.fit.w, h: m.fit.h })),
    ...p.map((m) => ({ dx: m.x, dy: m.y, w: xe, h: be }))
  ]), h = [
    { ...t, x: I.x, y: I.y, w: I.w, h: I.h, container: !0 }
  ];
  for (const m of l)
    h.push({
      id: m.a.id,
      label: m.a.name,
      kind: m.a.kind,
      symbol: "interface",
      fill: m.a.fill,
      stroke: m.a.stroke,
      badge: m.a.badge,
      container: !0,
      collapsible: m.a.ops.length > 0 || o.has(m.a.id),
      collapsed: o.has(m.a.id),
      parentId: t.id,
      x: e.x + m.fit.x,
      y: e.y + m.fit.y,
      w: m.fit.w,
      h: m.fit.h,
      tooltip: m.a.tooltip
    }), m.ops.forEach((d, u) => {
      h.push({
        id: d.id,
        label: d.name,
        kind: m.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: m.a.id,
        x: e.x + m.off.x + m.opOffs[u].x,
        y: e.y + m.off.y + m.opOffs[u].y,
        w: xe,
        h: be,
        tooltip: `${Wt[m.a.opKind]}: ${d.name}`
      });
    });
  return s.forEach((m, d) => {
    const u = xi[m.kind];
    h.push({
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + p[d].x,
      y: e.y + p[d].y,
      w: xe,
      h: be,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Wt[m.kind]} ${m.name}`
    });
  }), h;
}
const Ao = [
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
], $s = 20, Es = 28, Lt = 10, Tt = _n + 2 * Lt;
function Po(e, t, i, s, n, a) {
  const o = $n(e, t), r = new Map(o.map((b) => [b.id, b])), l = (e.codeModules ?? []).filter((b) => b.moduleId === t.id), p = new Set(l.flatMap((b) => b.elementIds ?? [])), g = o.filter((b) => !p.has(b.id)), I = a[s.id] ?? ki(l.length + g.length), h = l.map((b, C) => {
    const N = (b.elementIds ?? []).map((w) => r.get(w)).filter((w) => !!w), W = Ao.map((w) => {
      const T = N.filter((U) => w.kinds.includes(U.kind)), R = Math.ceil(T.length / Je), L = $s + (R ? R * be + (R - 1) * bi + 8 : 8);
      return { layer: w, chips: T, rows: R, h: L };
    }), P = Es + W.reduce((w, T) => w + T.h, 0) + Lt, x = n[b.id] ?? xt(C, I);
    return { cm: b, bands: W, boxH: P, off: x };
  }), m = g.map(
    (b, C) => n[b.id] ?? xt(h.length + C, I)
  ), d = Ti(
    [
      ...h.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: Tt, h: b.boxH })),
      ...g.map((b, C) => ({ id: b.id, x: m[C].x, y: m[C].y, w: xe, h: be }))
    ],
    24
  );
  for (const b of h) {
    const C = d.get(b.cm.id);
    C && (b.off = { x: C.x, y: C.y });
  }
  g.forEach((b, C) => {
    const N = d.get(b.id);
    N && (m[C] = { x: N.x, y: N.y });
  });
  const u = wi(i, I, [
    ...h.map((b) => ({ dx: b.off.x, dy: b.off.y, w: Tt, h: b.boxH })),
    ...m.map((b) => ({ dx: b.x, dy: b.y, w: xe, h: be }))
  ]), f = [
    { ...s, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const b of h) {
    const C = i.x + b.off.x, N = i.y + b.off.y;
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
      x: C,
      y: N,
      w: Tt,
      h: b.boxH,
      tooltip: `${b.cm.name} — módulo: empaqueta elementos del contexto en sus capas; arrastra el asa de un elemento hasta él para asignarlo`
    });
    let W = -b.boxH / 2 + Es;
    for (const P of b.bands) {
      const x = `hexlayer:${b.cm.id}:${P.layer.key}`;
      f.push({
        id: x,
        label: P.layer.label,
        kind: "hex-layer",
        fill: P.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: b.cm.id,
        x: C,
        y: N + W + P.h / 2,
        w: Tt - 2 * Lt,
        h: P.h,
        tooltip: `Capa de ${P.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), P.chips.forEach((w, T) => {
        const R = T % Je, L = Math.floor(T / Je), U = w.policy ? Zi : xi[w.kind];
        f.push({
          id: w.id,
          label: w.name,
          kind: w.kind,
          x: C - (Tt - 2 * Lt) / 2 + Lt + R * (xe + ls) + xe / 2,
          y: N + W + $s + L * (be + bi) + be / 2,
          w: xe,
          h: be,
          symbol: U.symbol,
          fill: U.fill,
          stroke: U.stroke,
          parentId: x,
          tooltip: `${w.policy ? "Policy" : Wt[w.kind]} ${w.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), W += P.h;
    }
  }
  return g.forEach((b, C) => {
    const N = b.policy ? Zi : xi[b.kind];
    f.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + m[C].x,
      y: i.y + m[C].y,
      w: xe,
      h: be,
      symbol: N.symbol,
      fill: N.fill,
      stroke: N.stroke,
      parentId: s.id,
      tooltip: `${b.policy ? "Policy" : Wt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), f;
}
function zt(e, t, i, s, n) {
  const a = n[t.id] ?? ki(i.length), o = i.map((I, h) => s[I.id] ?? xt(h, a)), r = Ti(
    i.map((I, h) => ({ id: I.id, x: o[h].x, y: o[h].y, w: xe, h: be })),
    10
  );
  i.forEach((I, h) => {
    const m = r.get(I.id);
    m && (o[h] = { x: m.x, y: m.y });
  });
  const l = wi(
    e,
    a,
    o.map((I) => ({ dx: I.x, dy: I.y, w: xe, h: be }))
  ), p = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, g = i.map((I, h) => {
    const m = o[h], d = I.policy ? Zi : xi[I.kind];
    return {
      id: I.id,
      label: I.name,
      kind: I.kind,
      x: e.x + m.x,
      y: e.y + m.y,
      w: xe,
      h: be,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${I.policy ? "Policy" : Wt[I.kind]} ${I.name}`
    };
  });
  return [p, ...g];
}
function To(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", o = n, r = i !== "contexts", l = i === "operations", p = new Set(e.externalSystems.map((c) => c.id)), g = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), I = new Set(g.map((c) => c.id)), h = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), m = new Set(h.map((c) => c.id)), d = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !I.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !m.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
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
  ], u = d.flatMap((c, O) => {
    const H = t[c.ref.id] ?? yt(O, d.length);
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
        x: H.x,
        y: H.y,
        w: He,
        h: Ge
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
        x: H.x,
        y: H.y,
        w: He,
        h: Ge
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
        x: H.x,
        y: H.y,
        w: He,
        h: Ge
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
        const Be = (e.apis ?? []).find((It) => It.id === X.targetApiId), Ve = (Be == null ? void 0 : Be.operations) ?? [];
        if (Ve.length > 0)
          return zt(
            H,
            le,
            Ve.map((It) => ({
              id: ot(It.id, X.id),
              name: It.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...le, x: H.x, y: H.y, w: He, h: Ge }];
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
      return (n.has(X.id) ? !r : r) && X.operations.length > 0 ? zt(
        H,
        { ...le, collapsible: !0, collapsed: !1 },
        X.operations.map(
          (Ve) => ({ id: Ve.id, name: Ve.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...le,
        collapsible: X.operations.length > 0,
        collapsed: X.operations.length > 0,
        x: H.x,
        y: H.y,
        w: He,
        h: Ge
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
        badge: "EXTERNAL",
        tooltip: `${X.name} (sistema externo)`
      }, Be = g.filter((he) => he.publishedByExternalSystemId === X.id), Ve = h.filter((he) => he.publishedByExternalSystemId === X.id), It = Ve.map(
        (he) => ({ id: he.id, name: he.name, kind: "proxy-api" })
      ), Li = [
        ...(X.useCases ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "external-use-case" })
        ),
        ...(X.tables ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "external-table" })
        ),
        ...(X.mcpServers ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "mcp-server" })
        )
      ], zi = Be.length > 0 || Ve.length > 0, Ui = zi || Li.length > 0, { form: si, collapsed: qi } = _s(
        n.has(X.id),
        r ? "full" : zi ? "coarse" : "compact",
        Li.length > 0 || l && zi
      ), bs = [
        ...It,
        ...si === "full" ? Li : []
      ], Fi = l && si === "full" ? Ve.filter((he) => {
        const At = he.targetApiId ? (e.apis ?? []).find((_e) => _e.id === he.targetApiId) : void 0;
        return ((At == null ? void 0 : At.operations) ?? []).length > 0;
      }) : [];
      if (l && si === "full" && (Be.length > 0 || Fi.length > 0)) {
        const he = [
          ...Be.map((_e) => ({
            id: _e.id,
            name: _e.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${_e.name} — API publicada por ${X.name}`,
            opKind: "api-operation",
            ops: (_e.operations ?? []).map((Pt) => ({ id: Pt.id, name: Pt.name }))
          })),
          ...Fi.map((_e) => {
            const Pt = (e.apis ?? []).find((ni) => ni.id === _e.targetApiId);
            return {
              id: _e.id,
              name: _e.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${_e.name} — proxy/cache de ${Pt.name}`,
              opKind: "api-op-occurrence",
              ops: (Pt.operations ?? []).map((ni) => ({
                id: ot(ni.id, _e.id),
                name: ni.name
              }))
            };
          })
        ], At = new Set(Fi.map((_e) => _e.id));
        return En(
          H,
          { ...le, collapsible: !0, collapsed: qi },
          he,
          bs.filter((_e) => !At.has(_e.id)),
          t,
          s,
          o
        );
      }
      const xs = si === "compact" ? [] : [
        ...Be.map((he) => ({ id: he.id, name: he.name, kind: "api" })),
        ...bs
      ];
      return xs.length > 0 ? zt(
        H,
        { ...le, collapsible: Ui, collapsed: qi },
        xs,
        t,
        s
      ) : [{
        ...le,
        collapsible: Ui,
        collapsed: Ui && qi,
        x: H.x,
        y: H.y,
        w: He,
        h: Ge
      }];
    }
    const ee = c.ref, Q = ee.subdomainType ?? "GENERIC", ue = {
      id: ee.id,
      label: ee.name,
      kind: "module",
      symbol: "component",
      fill: ko[Q],
      stroke: "#94a3b8",
      badge: Q,
      tooltip: `${ee.name} — subdominio ${Q}`
    }, Ne = bn(e, ee.id), Ct = (e.aggregates ?? []).some((X) => X.moduleId === ee.id) || (ee.useCases ?? []).length > 0 || (ee.domainEvents ?? []).length > 0 || (ee.applicationEvents ?? []).length > 0 || (ee.readModels ?? []).length > 0 || (ee.domainServices ?? []).length > 0 || (ee.queryServices ?? []).length > 0 || (ee.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((X) => X.ownerModuleId === ee.id) || (e.notifications ?? []).some((X) => X.ownerModuleId === ee.id) || (e.documents ?? []).some((X) => X.ownerModuleId === ee.id), it = Ct || Ne.length > 0, { form: Mt, collapsed: gt } = _s(
      n.has(ee.id),
      r ? "full" : Ne.length > 0 ? "coarse" : "compact",
      Ct
    );
    return a ? Po(
      e,
      ee,
      H,
      { ...ue, collapsible: !1, collapsed: !1 },
      t,
      s
    ) : Mt === "full" && it ? Mo(
      e,
      ee,
      H,
      { ...ue, collapsible: !0, collapsed: gt },
      t,
      s,
      l
    ) : Mt === "coarse" && Ne.length > 0 ? zt(
      H,
      { ...ue, collapsible: it, collapsed: gt },
      Ne,
      t,
      s
    ) : [{
      ...ue,
      collapsible: it,
      collapsed: it && gt,
      x: H.x,
      y: H.y,
      w: He,
      h: Ge
    }];
  }), f = d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, O) => {
    const H = t[c.id] ?? yt(d.length + O, f);
    u.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, O) => {
    const H = t[c.id] ?? yt(d.length + (e.actors ?? []).length + O, f);
    u.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
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
  }), (e.mcpGateways ?? []).forEach((c, O) => {
    const H = t[c.id] ?? yt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      f
    );
    u.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
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
  (e.rags ?? []).forEach((c, O) => {
    const H = t[c.id] ?? yt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      f
    );
    u.push({
      id: c.id,
      label: c.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((ee, Q) => {
      const ue = `ragcs:${c.id}:${ee.uri}`, Ne = t[ue] ?? { x: H.x + 170, y: H.y - 30 + Q * 44 };
      u.push({
        id: ue,
        label: ee.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Ne.x,
        y: Ne.y,
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
        sourceId: ue,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), a && (e.services ?? []).forEach((c, O) => {
    const H = t[c.id] ?? yt(d.length + O, d.length + (e.services ?? []).length);
    u.push({
      id: c.id,
      label: c.name,
      kind: "service",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#334155",
      badge: "SERVICIO",
      tooltip: `${c.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
      x: H.x,
      y: H.y,
      w: He,
      h: Ge
    });
  }), u.sort((c, O) => (c.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const C = e.relations.map((c) => ({
    id: So(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? _o[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), N = e.flows.map((c) => {
    var Ne, Ct, it, Mt, gt, X;
    const O = Co(e, c), H = r ? e.modules.find((le) => le.id === c.sourceId) : void 0, ee = ((Ne = H == null ? void 0 : H.domainEvents) == null ? void 0 : Ne.find((le) => le.name === c.triggerEvent)) ?? ((Ct = H == null ? void 0 : H.applicationEvents) == null ? void 0 : Ct.find((le) => le.name === c.triggerEvent)), Q = r && c.readModelName ? (Mt = (it = e.modules.find((le) => le.id === c.targetId)) == null ? void 0 : it.readModels) == null ? void 0 : Mt.find((le) => le.name === c.readModelName) : void 0, ue = r && c.targetUseCaseId ? (X = (gt = e.modules.find((le) => le.id === c.targetId)) == null ? void 0 : gt.useCases) == null ? void 0 : X.find((le) => le.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (ee == null ? void 0 : ee.id) ?? c.sourceId,
      targetId: (ue == null ? void 0 : ue.id) ?? (Q == null ? void 0 : Q.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: $o[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${O}`
    };
  }), W = new Map((e.apis ?? []).map((c) => [c.id, c])), P = new Set(e.modules.map((c) => c.id)), x = (e.apiImplementations ?? []).filter(
    (c) => W.has(c.apiId) && P.has(c.moduleId)
  ), w = new Set(u.map((c) => c.id)), T = a ? (e.services ?? []).flatMap(
    (c) => (c.codeModuleIds ?? []).filter((O) => w.has(O) && w.has(c.id)).map((O) => ({
      id: `deploy:${c.id}->${O}`,
      sourceId: c.id,
      targetId: O,
      kind: "deploys",
      color: "#334155",
      dashed: !0,
      arrow: !0,
      tooltip: `desplegado en ${c.name} — Supr lo desconecta`
    }))
  ) : [], R = r ? (e.emissions ?? []).filter((c) => w.has(c.sourceId) && w.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], L = r ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: O }) => O && c.readModelId).filter(({ p: c, source: O }) => w.has(O) && w.has(c.readModelId)).map(({ p: c, source: O }) => ({
    id: `proj:${c.id}`,
    sourceId: O,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], U = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((O) => {
      const H = r && O.targetUseCaseId && w.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetModuleId && w.has(O.targetModuleId) ? O.targetModuleId : (O.targetUseCaseId && !r, null);
      if (!H) return [];
      const ee = r && w.has(O.id) ? O.id : c.id;
      return w.has(ee) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: ee,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${O.name} la implementa ${H}`
        }
      ] : [];
    })
  ), F = r ? (e.useCaseCalls ?? []).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], B = [
    ...e.modules.filter((c) => c.identityProviderId && w.has(c.id) && w.has(c.identityProviderId)).map((c) => ({
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
    ...(e.etlFlows ?? []).filter((c) => c.identityProviderId && w.has(c.identityProviderId)).flatMap((c) => {
      const O = w.has(c.id) ? c.id : c.ownerModuleId && w.has(c.ownerModuleId) ? c.ownerModuleId : null;
      return O ? [{
        id: `idpsvc:${c.id}`,
        sourceId: O,
        targetId: c.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((c) => c.publishedByExternalSystemId && w.has(c.id) && w.has(c.publishedByExternalSystemId)).map((c) => ({
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
  ], y = r ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && w.has(c.id) && w.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], S = r ? (e.aggregateCalls ?? []).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], v = r ? (e.queryCalls ?? []).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], k = r ? (e.actorUses ?? []).filter((c) => w.has(c.actorId) && w.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], _ = (e.actorExternalDependencies ?? []).filter((c) => w.has(c.actorId) && w.has(c.externalSystemId)).map((c) => ({
    id: `extdep:${c.actorId}->${c.externalSystemId}`,
    sourceId: c.actorId,
    targetId: c.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), $ = new Map([
    ...(e.apis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((c) => c.publishedByExternalSystemId).map((c) => [c.id, c.publishedByExternalSystemId])
  ]), A = (c) => w.has(c) ? c : $.get(c) ?? c, M = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: A(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => w.has(c.sourceId) && w.has(c.targetId) && c.sourceId !== c.targetId
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
    for (const O of c.useCases ?? []) D.set(O.id, c.id);
    for (const O of c.domainEvents ?? []) D.set(O.id, c.id);
    for (const O of c.applicationEvents ?? []) D.set(O.id, c.id);
    for (const O of c.queryServices ?? []) D.set(O.id, c.id);
  }
  const V = (c) => w.has(c) ? c : D.get(c) ?? c, K = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const O of c.domainEvents ?? []) K.set(O.name, O.id);
    for (const O of c.applicationEvents ?? []) K.set(O.name, O.id);
  }
  const de = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: c.id, targetId: V(O.targetUseCaseId) }))
      ).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], me = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && K.has(c.triggerEvent)).map((c) => ({
        sourceId: V(K.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], z = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const O of c.tables ?? []) z.set(O.id, c.id);
  const G = (e.notifications ?? []).flatMap((c) => {
    var ee;
    const O = w.has(c.id) ? c.id : c.ownerModuleId && w.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!O) return [];
    const H = [];
    if (c.eventId) {
      const Q = w.has(c.eventId) ? c.eventId : D.get(c.eventId);
      Q && w.has(Q) && Q !== O && H.push({
        id: `notif:${c.id}`,
        sourceId: Q,
        targetId: O,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const Q of c.recipientRoleIds ?? [])
      w.has(Q) && H.push({
        id: `notifto:${c.id}:${Q}`,
        sourceId: O,
        targetId: Q,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((ee = (c.channels ?? [])[0]) == null ? void 0 : ee.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} avisa a este rol — Supr lo quita`
      });
    return H;
  }), oe = (e.documents ?? []).flatMap((c) => {
    const O = w.has(c.id) ? c.id : c.ownerModuleId && w.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!O || !c.queryServiceId) return [];
    const H = w.has(c.queryServiceId) ? c.queryServiceId : D.get(c.queryServiceId);
    return !H || !w.has(H) || H === O ? [] : [{
      id: `docq:${c.id}`,
      sourceId: H,
      targetId: O,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), j = (e.etlFlows ?? []).flatMap(
    (c) => (c.steps ?? []).flatMap((O) => {
      const H = w.has(c.id) ? c.id : c.ownerModuleId && w.has(c.ownerModuleId) ? c.ownerModuleId : null;
      if (!H) return [];
      const ee = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!ee) return [];
      let Q = ee;
      if (!w.has(Q) && O.operationId && O.apiId && (Q = O.apiId), !w.has(Q) && O.externalTableId && (Q = z.get(O.externalTableId) ?? Q), w.has(Q) || (Q = A(Q)), w.has(Q) || (Q = D.get(ee) ?? Q), !w.has(Q) || Q === H) return [];
      const ue = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${c.id}:${O.id}`,
        sourceId: ue ? Q : H,
        targetId: ue ? H : Q,
        kind: ue ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ue ? `${c.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${c.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), J = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: w.has(O) ? O : z.get(O) ?? O,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], ye = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((O) => ({
          sourceId: A(O),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], ce = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((O) => ({ sourceId: O, targetId: c.id, name: c.name }))
      ]).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], Oe = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: A(c.apiId) })).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => [
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
  ], Ee = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, Ye = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== c.id && Ee(O) === c.triggerEvent).filter((O) => w.has(O.id) && w.has(c.id)).map((O) => ({
      id: `wfchain:${O.id}->${c.id}`,
      sourceId: O.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), ti = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: A(c.id), targetId: A(c.targetApiId) })).filter(
        (c) => w.has(c.sourceId) && w.has(c.targetId) && c.sourceId !== c.targetId
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
  ], ft = x.flatMap((c) => {
    const O = at(c.apiId, c.moduleId);
    if (!w.has(O)) return [];
    const H = [];
    for (const ee of (e.proxyApis ?? []).filter((Q) => Q.targetApiId === c.apiId)) {
      const Q = A(ee.id);
      w.has(Q) && Q !== O && H.push({
        id: `pxr:${Q}->${O}`,
        sourceId: Q,
        targetId: O,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return H;
  }), ii = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const O = (e.proxyApis ?? []).find((Q) => Q.id === c.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const H = ot(c.operationId, c.proxyId), ee = c.targetSiteId === O.targetApiId ? O.targetApiId : at(O.targetApiId, c.targetSiteId);
    return !w.has(H) || !w.has(ee) ? [] : [{
      id: `oproute:${H}->${ee}`,
      sourceId: H,
      targetId: ee,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), oo = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!w.has(c.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (ue) => ue.operations.some((Ne) => Ne.id === c.operationId)
        );
        if (!O) return null;
        const H = c.siteId === O.id, ee = H ? c.operationId : ot(c.operationId, c.siteId);
        let Q = w.has(ee) ? ee : null;
        if (!Q)
          if (H || (e.proxyApis ?? []).some((ue) => ue.id === c.siteId))
            Q = A(c.siteId);
          else {
            const ue = at(O.id, c.siteId);
            Q = w.has(ue) ? ue : c.siteId;
          }
        return !Q || !w.has(Q) || Q === c.externalSystemId ? null : { u: c, target: Q };
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
  ], ao = r ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!w.has(c.useCaseId)) return [];
    const O = w.has(ot(c.operationId, c.moduleId)) ? ot(c.operationId, c.moduleId) : w.has(at(c.apiId, c.moduleId)) ? at(c.apiId, c.moduleId) : w.has(A(c.moduleId)) ? A(c.moduleId) : null;
    return O ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: O,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], ro = r ? (e.agentUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], lo = (e.agentRags ?? []).filter((c) => w.has(c.agentId) && w.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), co = r ? (e.rags ?? []).filter((c) => w.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((O) => w.has(O)).map((O) => ({
      id: `ragsrc:${c.id}->${O}`,
      sourceId: c.id,
      targetId: O,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], po = r ? (e.agentExternalUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], uo = r ? (e.agentMcpUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], mo = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((O) => w.has(c.id) && w.has(O)).map((O) => ({
      id: `gwx:${c.id}->${O}`,
      sourceId: c.id,
      targetId: O,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ho = (e.agentGatewayUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), fo = r ? (e.agentApiOpUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], go = r ? (e.agentQueryUses ?? []).filter((c) => w.has(c.agentId) && w.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Io = (e.agentDelegations ?? []).filter((c) => w.has(c.agentId) && w.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), yo = (e.actorAgentUses ?? []).filter((c) => w.has(c.actorId) && w.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), vo = r ? (e.agentTriggers ?? []).filter((c) => w.has(c.eventId) && w.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], wo = r ? (e.externalCalls ?? []).filter((c) => w.has(c.externalSystemId) && w.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], bo = r ? (e.externalUseCaseCalls ?? []).filter((c) => w.has(c.sourceId) && w.has(c.targetId)).map((c) => ({
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
      ...T,
      ...C,
      ...N,
      ...R,
      ...L,
      ...U,
      ...F,
      ...y,
      ...B,
      ...G,
      ...oe,
      ...j,
      ...S,
      ...v,
      ...k,
      ..._,
      ...M,
      ...ti,
      ...ft,
      ...ii,
      ...oo,
      ...ao,
      ...de,
      ...me,
      ...Ye,
      ...Oe,
      ...J,
      ...ye,
      ...ce,
      ...ro,
      ...po,
      ...uo,
      ...mo,
      ...ho,
      ...fo,
      ...go,
      ...Io,
      ...yo,
      ...vo,
      ...lo,
      ...co,
      ...b,
      ...wo,
      ...bo
    ]
  };
}
const Oo = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, No = 176, Ro = 60, Do = 140, Lo = 40;
function zo(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, a) => {
    const o = 220 + a * 340;
    i.filter((l) => l.moduleId === n.id).forEach((l, p) => {
      const g = s.filter((h) => h.aggregateId === l.id).length, I = 140 + p * (170 + g * 60);
      t[l.id] = { x: o, y: I }, s.filter((h) => h.aggregateId === l.id).forEach((h, m) => {
        t[h.id] = { x: o + 60, y: I + 100 + m * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((a) => a.id === n.moduleId)).forEach((n, a) => {
    t[n.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function Uo(e, t) {
  const i = zo(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), a = (e.aggregates ?? []).map((p) => {
    const g = n.get(p.moduleId), I = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", h = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: h.x,
      y: h.y,
      w: No,
      h: Ro,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Oo[I],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${I})` : ""}`
    };
  }), o = (e.entities ?? []).map((p) => {
    const g = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: Do,
      h: Lo,
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
    nodes: [...a, ...o],
    edges: [...r, ...l]
  };
}
const qo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Fo = 150, Bo = 44, Vo = 190, Wo = 56, Ho = 160, Go = 48;
function jo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Ko(e, t) {
  const i = e.flows, s = [], n = [], a = /* @__PURE__ */ new Set(), o = (r) => {
    var l, p;
    return ((p = (l = e.aggregates) == null ? void 0 : l.find((g) => g.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const p = 120 + l * 130, g = qo[r.archetype] ?? "#475569", I = r.triggerAggregateId ?? r.sourceId;
    if (!a.has(I)) {
      a.add(I);
      const f = t[I] ?? { x: 160, y: p };
      s.push({
        id: I,
        label: r.triggerAggregateId ? o(r.triggerAggregateId) : I,
        x: f.x,
        y: f.y,
        w: Fo,
        h: Bo,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const h = `flow:${r.id}`, m = t[h] ?? { x: 470, y: p };
    s.push({
      id: h,
      label: r.name,
      x: m.x,
      y: m.y,
      w: Vo,
      h: Wo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const d = jo(e, r), u = `tgt:${d.id}`;
    if (!a.has(u)) {
      a.add(u);
      const f = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: d.label,
        x: f.x,
        y: f.y,
        w: Ho,
        h: Go,
        kind: d.external ? "external-system" : "module",
        symbol: "component",
        fill: d.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: d.external,
        badge: d.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${r.id}:in`,
      sourceId: I,
      targetId: h,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${r.id}:out`,
      sourceId: h,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const Yo = 190, Xo = 56, Bi = 170, Qo = 52;
function Ss(e, t) {
  const i = [], s = [], n = (a) => {
    var o;
    return (o = e.modules.find((r) => r.id === a)) == null ? void 0 : o.name;
  };
  return (e.processes ?? []).forEach((a, o) => {
    const r = 140 + o * 240, l = t[a.id] ?? { x: 150, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: l.x,
      y: l.y,
      w: Yo,
      h: Xo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${n(a.ownerModuleId) ? ` — módulo ${n(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((g, I) => {
      const h = g.type === "HUMAN", m = t[g.id] ?? { x: 150 + (I + 1) * 240, y: r };
      if (i.push({
        id: g.id,
        label: g.name,
        x: m.x,
        y: m.y,
        w: Bi,
        h: Qo,
        kind: "process-step",
        symbol: h ? "person" : "gear",
        fill: h ? "#fef3c7" : "#ffffff",
        stroke: h ? "#d97706" : "#64748b",
        badge: h ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), s.push({
        id: `pe:${a.id}:${I}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: I === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const d = `comp:${g.id}`, u = t[d] ?? { x: m.x, y: m.y + 90 };
        i.push({
          id: d,
          label: g.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Bi,
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
      const g = `done:${a.id}`, I = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: r };
      i.push({
        id: g,
        label: a.onCompletionEventName,
        x: I.x,
        y: I.y,
        w: Bi,
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
const fi = globalThis, cs = fi.ShadowRoot && (fi.ShadyCSS === void 0 || fi.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ps = Symbol(), Cs = /* @__PURE__ */ new WeakMap();
let Sn = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== ps) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (cs && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Cs.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Cs.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zo = (e) => new Sn(typeof e == "string" ? e : e + "", void 0, ps), mt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[a + 1], e[0]);
  return new Sn(i, e, ps);
}, Jo = (e, t) => {
  if (cs) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = fi.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, Ms = cs ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Zo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ea, defineProperty: ta, getOwnPropertyDescriptor: ia, getOwnPropertyNames: sa, getOwnPropertySymbols: na, getPrototypeOf: oa } = Object, et = globalThis, As = et.trustedTypes, aa = As ? As.emptyScript : "", Vi = et.reactiveElementPolyfillSupport, Ft = (e, t) => e, _i = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? aa : null;
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
} }, us = (e, t) => !ea(e, t), Ps = { attribute: !0, type: String, converter: _i, reflect: !1, useDefault: !1, hasChanged: us };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), et.litPropertyMetadata ?? (et.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let wt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ps) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && ta(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: a } = ia(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const r = n == null ? void 0 : n.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ps;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ft("elementProperties"))) return;
    const t = oa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ft("properties"))) {
      const i = this.properties, s = [...sa(i), ...na(i)];
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
      for (const n of s) i.unshift(Ms(n));
    } else t !== void 0 && i.push(Ms(t));
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
    return Jo(t, this.constructor.elementStyles), t;
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
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : _i).toAttribute(i, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, o;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : _i;
      this._$Em = n;
      const p = l.fromAttribute(i, r.type);
      this[n] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, a) {
    var o;
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (a = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? us)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: n, wrapped: a }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, o] of n) {
        const { wrapped: r } = o, l = this[a];
        r !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Ft("elementProperties")] = /* @__PURE__ */ new Map(), wt[Ft("finalized")] = /* @__PURE__ */ new Map(), Vi == null || Vi({ ReactiveElement: wt }), (et.reactiveElementVersions ?? (et.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, Ts = (e) => e, $i = Bt.trustedTypes, Os = $i ? $i.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Cn = "$lit$", Ze = `lit$${Math.random().toFixed(9).slice(2)}$`, Mn = "?" + Ze, ra = `<${Mn}>`, pt = document, Ht = () => pt.createComment(""), Gt = (e) => e === null || typeof e != "object" && typeof e != "function", ms = Array.isArray, da = (e) => ms(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Wi = `[ 	
\f\r]`, Ot = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ns = /-->/g, Rs = />/g, st = RegExp(`>|${Wi}(?:([^\\s"'>=/]+)(${Wi}*=${Wi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ds = /'/g, Ls = /"/g, An = /^(?:script|style|textarea|title)$/i, Pn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = Pn(1), te = Pn(2), _t = Symbol.for("lit-noChange"), ne = Symbol.for("lit-nothing"), zs = /* @__PURE__ */ new WeakMap(), rt = pt.createTreeWalker(pt, 129);
function Tn(e, t) {
  if (!ms(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Os !== void 0 ? Os.createHTML(t) : t;
}
const la = (e, t) => {
  const i = e.length - 1, s = [];
  let n, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ot;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let p, g, I = -1, h = 0;
    for (; h < l.length && (o.lastIndex = h, g = o.exec(l), g !== null); ) h = o.lastIndex, o === Ot ? g[1] === "!--" ? o = Ns : g[1] !== void 0 ? o = Rs : g[2] !== void 0 ? (An.test(g[2]) && (n = RegExp("</" + g[2], "g")), o = st) : g[3] !== void 0 && (o = st) : o === st ? g[0] === ">" ? (o = n ?? Ot, I = -1) : g[1] === void 0 ? I = -2 : (I = o.lastIndex - g[2].length, p = g[1], o = g[3] === void 0 ? st : g[3] === '"' ? Ls : Ds) : o === Ls || o === Ds ? o = st : o === Ns || o === Rs ? o = Ot : (o = st, n = void 0);
    const m = o === st && e[r + 1].startsWith("/>") ? " " : "";
    a += o === Ot ? l + ra : I >= 0 ? (s.push(p), l.slice(0, I) + Cn + l.slice(I) + Ze + m) : l + Ze + (I === -2 ? r : m);
  }
  return [Tn(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class jt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const r = t.length - 1, l = this.parts, [p, g] = la(t, i);
    if (this.el = jt.createElement(p, s), rt.currentNode = this.el.content, i === 2 || i === 3) {
      const I = this.el.content.firstChild;
      I.replaceWith(...I.childNodes);
    }
    for (; (n = rt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const I of n.getAttributeNames()) if (I.endsWith(Cn)) {
          const h = g[o++], m = n.getAttribute(I).split(Ze), d = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: a, name: d[2], strings: m, ctor: d[1] === "." ? pa : d[1] === "?" ? ua : d[1] === "@" ? ma : Oi }), n.removeAttribute(I);
        } else I.startsWith(Ze) && (l.push({ type: 6, index: a }), n.removeAttribute(I));
        if (An.test(n.tagName)) {
          const I = n.textContent.split(Ze), h = I.length - 1;
          if (h > 0) {
            n.textContent = $i ? $i.emptyScript : "";
            for (let m = 0; m < h; m++) n.append(I[m], Ht()), rt.nextNode(), l.push({ type: 2, index: ++a });
            n.append(I[h], Ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Mn) l.push({ type: 2, index: a });
      else {
        let I = -1;
        for (; (I = n.data.indexOf(Ze, I + 1)) !== -1; ) l.push({ type: 7, index: a }), I += Ze.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const s = pt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function $t(e, t, i = e, s) {
  var o, r;
  if (t === _t) return t;
  let n = s !== void 0 ? (o = i._$Co) == null ? void 0 : o[s] : i._$Cl;
  const a = Gt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((r = n == null ? void 0 : n._$AO) == null || r.call(n, !1), a === void 0 ? n = void 0 : (n = new a(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = $t(e, n._$AS(e, t.values), n, s)), t;
}
class ca {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? pt).importNode(i, !0);
    rt.currentNode = n;
    let a = rt.nextNode(), o = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new Zt(a, a.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (p = new ha(a, this, t)), this._$AV.push(p), l = s[++r];
      }
      o !== (l == null ? void 0 : l.index) && (a = rt.nextNode(), o++);
    }
    return rt.currentNode = pt, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Zt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, s, n) {
    this.type = 2, this._$AH = ne, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = $t(this, t, i), Gt(t) ? t === ne || t == null || t === "" ? (this._$AH !== ne && this._$AR(), this._$AH = ne) : t !== this._$AH && t !== _t && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : da(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ne && Gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(pt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = jt.createElement(Tn(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(i);
    else {
      const o = new ca(n, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = zs.get(t.strings);
    return i === void 0 && zs.set(t.strings, i = new jt(t)), i;
  }
  k(t) {
    ms(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const a of t) n === i.length ? i.push(s = new Zt(this.O(Ht()), this.O(Ht()), this, this.options)) : s = i[n], s._$AI(a), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = Ts(t).nextSibling;
      Ts(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Oi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, a) {
    this.type = 1, this._$AH = ne, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = ne;
  }
  _$AI(t, i = this, s, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = $t(this, t, i, 0), o = !Gt(t) || t !== this._$AH && t !== _t, o && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = a[0], l = 0; l < a.length - 1; l++) p = $t(this, r[s + l], i, l), p === _t && (p = this._$AH[l]), o || (o = !Gt(p) || p !== this._$AH[l]), p === ne ? t = ne : t !== ne && (t += (p ?? "") + a[l + 1]), this._$AH[l] = p;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === ne ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pa extends Oi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ne ? void 0 : t;
  }
}
class ua extends Oi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ne);
  }
}
class ma extends Oi {
  constructor(t, i, s, n, a) {
    super(t, i, s, n, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = $t(this, t, i, 0) ?? ne) === _t) return;
    const s = this._$AH, n = t === ne && s !== ne || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== ne && (s === ne || n);
    n && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ha {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    $t(this, t);
  }
}
const Hi = Bt.litHtmlPolyfillSupport;
Hi == null || Hi(jt, Zt), (Bt.litHtmlVersions ?? (Bt.litHtmlVersions = [])).push("3.3.3");
const fa = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Zt(t.insertBefore(Ht(), a), a, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis;
class Le extends wt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = fa(i, this.renderRoot, this.renderOptions);
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
    return _t;
  }
}
var wn;
Le._$litElement$ = !0, Le.finalized = !0, (wn = lt.litElementHydrateSupport) == null || wn.call(lt, { LitElement: Le });
const Gi = lt.litElementPolyfillSupport;
Gi == null || Gi({ LitElement: Le });
(lt.litElementVersions ?? (lt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ga = { attribute: !0, type: String, converter: _i, reflect: !1, hasChanged: us }, Ia = (e = ga, t, i) => {
  const { kind: s, metadata: n } = i;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(o, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(r) {
      const l = this[o];
      t.call(this, r), this.requestUpdate(o, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ae(e) {
  return (t, i) => typeof i == "object" ? Ia(e, t, i) : ((s, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(e) {
  return ae({ ...e, state: !0, attribute: !1 });
}
var Ji = "http://www.w3.org/1999/xhtml";
const Us = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ji,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ni(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Us.hasOwnProperty(t) ? { space: Us[t], local: e } : e;
}
function ya(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ji && t.documentElement.namespaceURI === Ji ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function va(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function On(e) {
  var t = Ni(e);
  return (t.local ? va : ya)(t);
}
function wa() {
}
function hs(e) {
  return e == null ? wa : function() {
    return this.querySelector(e);
  };
}
function ba(e) {
  typeof e != "function" && (e = hs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], o = a.length, r = s[n] = new Array(o), l, p, g = 0; g < o; ++g)
      (l = a[g]) && (p = e.call(l, l.__data__, g, a)) && ("__data__" in l && (p.__data__ = l.__data__), r[g] = p);
  return new Pe(s, this._parents);
}
function xa(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ka() {
  return [];
}
function Nn(e) {
  return e == null ? ka : function() {
    return this.querySelectorAll(e);
  };
}
function _a(e) {
  return function() {
    return xa(e.apply(this, arguments));
  };
}
function $a(e) {
  typeof e == "function" ? e = _a(e) : e = Nn(e);
  for (var t = this._groups, i = t.length, s = [], n = [], a = 0; a < i; ++a)
    for (var o = t[a], r = o.length, l, p = 0; p < r; ++p)
      (l = o[p]) && (s.push(e.call(l, l.__data__, p, o)), n.push(l));
  return new Pe(s, n);
}
function Rn(e) {
  return function() {
    return this.matches(e);
  };
}
function Dn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ea = Array.prototype.find;
function Sa(e) {
  return function() {
    return Ea.call(this.children, e);
  };
}
function Ca() {
  return this.firstElementChild;
}
function Ma(e) {
  return this.select(e == null ? Ca : Sa(typeof e == "function" ? e : Dn(e)));
}
var Aa = Array.prototype.filter;
function Pa() {
  return Array.from(this.children);
}
function Ta(e) {
  return function() {
    return Aa.call(this.children, e);
  };
}
function Oa(e) {
  return this.selectAll(e == null ? Pa : Ta(typeof e == "function" ? e : Dn(e)));
}
function Na(e) {
  typeof e != "function" && (e = Rn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], o = a.length, r = s[n] = [], l, p = 0; p < o; ++p)
      (l = a[p]) && e.call(l, l.__data__, p, a) && r.push(l);
  return new Pe(s, this._parents);
}
function Ln(e) {
  return new Array(e.length);
}
function Ra() {
  return new Pe(this._enter || this._groups.map(Ln), this._parents);
}
function Ei(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ei.prototype = {
  constructor: Ei,
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
function Da(e) {
  return function() {
    return e;
  };
}
function La(e, t, i, s, n, a) {
  for (var o = 0, r, l = t.length, p = a.length; o < p; ++o)
    (r = t[o]) ? (r.__data__ = a[o], s[o] = r) : i[o] = new Ei(e, a[o]);
  for (; o < l; ++o)
    (r = t[o]) && (n[o] = r);
}
function za(e, t, i, s, n, a, o) {
  var r, l, p = /* @__PURE__ */ new Map(), g = t.length, I = a.length, h = new Array(g), m;
  for (r = 0; r < g; ++r)
    (l = t[r]) && (h[r] = m = o.call(l, l.__data__, r, t) + "", p.has(m) ? n[r] = l : p.set(m, l));
  for (r = 0; r < I; ++r)
    m = o.call(e, a[r], r, a) + "", (l = p.get(m)) ? (s[r] = l, l.__data__ = a[r], p.delete(m)) : i[r] = new Ei(e, a[r]);
  for (r = 0; r < g; ++r)
    (l = t[r]) && p.get(h[r]) === l && (n[r] = l);
}
function Ua(e) {
  return e.__data__;
}
function qa(e, t) {
  if (!arguments.length) return Array.from(this, Ua);
  var i = t ? za : La, s = this._parents, n = this._groups;
  typeof e != "function" && (e = Da(e));
  for (var a = n.length, o = new Array(a), r = new Array(a), l = new Array(a), p = 0; p < a; ++p) {
    var g = s[p], I = n[p], h = I.length, m = Fa(e.call(g, g && g.__data__, p, s)), d = m.length, u = r[p] = new Array(d), f = o[p] = new Array(d), b = l[p] = new Array(h);
    i(g, I, u, f, b, m, t);
    for (var C = 0, N = 0, W, P; C < d; ++C)
      if (W = u[C]) {
        for (C >= N && (N = C + 1); !(P = f[N]) && ++N < d; ) ;
        W._next = P || null;
      }
  }
  return o = new Pe(o, s), o._enter = r, o._exit = l, o;
}
function Fa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ba() {
  return new Pe(this._exit || this._groups.map(Ln), this._parents);
}
function Va(e, t, i) {
  var s = this.enter(), n = this, a = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? a.remove() : i(a), s && n ? s.merge(n).order() : n;
}
function Wa(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, a = s.length, o = Math.min(n, a), r = new Array(n), l = 0; l < o; ++l)
    for (var p = i[l], g = s[l], I = p.length, h = r[l] = new Array(I), m, d = 0; d < I; ++d)
      (m = p[d] || g[d]) && (h[d] = m);
  for (; l < n; ++l)
    r[l] = i[l];
  return new Pe(r, this._parents);
}
function Ha() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, a = s[n], o; --n >= 0; )
      (o = s[n]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function Ga(e) {
  e || (e = ja);
  function t(I, h) {
    return I && h ? e(I.__data__, h.__data__) : !I - !h;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), a = 0; a < s; ++a) {
    for (var o = i[a], r = o.length, l = n[a] = new Array(r), p, g = 0; g < r; ++g)
      (p = o[g]) && (l[g] = p);
    l.sort(t);
  }
  return new Pe(n, this._parents).order();
}
function ja(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ka() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ya() {
  return Array.from(this);
}
function Xa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, a = s.length; n < a; ++n) {
      var o = s[n];
      if (o) return o;
    }
  return null;
}
function Qa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Za() {
  return !this.node();
}
function Ja(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], a = 0, o = n.length, r; a < o; ++a)
      (r = n[a]) && e.call(r, r.__data__, a, n);
  return this;
}
function er(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function tr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ir(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function sr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function nr(e, t) {
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
function ar(e, t) {
  var i = Ni(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? tr : er : typeof t == "function" ? i.local ? or : nr : i.local ? sr : ir)(i, t));
}
function zn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function rr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function dr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function lr(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function cr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? rr : typeof t == "function" ? lr : dr)(e, t, i ?? "")) : Et(this.node(), e);
}
function Et(e, t) {
  return e.style.getPropertyValue(t) || zn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function pr(e) {
  return function() {
    delete this[e];
  };
}
function ur(e, t) {
  return function() {
    this[e] = t;
  };
}
function mr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function hr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? pr : typeof t == "function" ? mr : ur)(e, t)) : this.node()[e];
}
function Un(e) {
  return e.trim().split(/^|\s+/);
}
function fs(e) {
  return e.classList || new qn(e);
}
function qn(e) {
  this._node = e, this._names = Un(e.getAttribute("class") || "");
}
qn.prototype = {
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
function Fn(e, t) {
  for (var i = fs(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Bn(e, t) {
  for (var i = fs(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function fr(e) {
  return function() {
    Fn(this, e);
  };
}
function gr(e) {
  return function() {
    Bn(this, e);
  };
}
function Ir(e, t) {
  return function() {
    (t.apply(this, arguments) ? Fn : Bn)(this, e);
  };
}
function yr(e, t) {
  var i = Un(e + "");
  if (arguments.length < 2) {
    for (var s = fs(this.node()), n = -1, a = i.length; ++n < a; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ir : t ? fr : gr)(i, t));
}
function vr() {
  this.textContent = "";
}
function wr(e) {
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
function xr(e) {
  return arguments.length ? this.each(e == null ? vr : (typeof e == "function" ? br : wr)(e)) : this.node().textContent;
}
function kr() {
  this.innerHTML = "";
}
function _r(e) {
  return function() {
    this.innerHTML = e;
  };
}
function $r(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Er(e) {
  return arguments.length ? this.each(e == null ? kr : (typeof e == "function" ? $r : _r)(e)) : this.node().innerHTML;
}
function Sr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Cr() {
  return this.each(Sr);
}
function Mr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ar() {
  return this.each(Mr);
}
function Pr(e) {
  var t = typeof e == "function" ? e : On(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Tr() {
  return null;
}
function Or(e, t) {
  var i = typeof e == "function" ? e : On(e), s = t == null ? Tr : typeof t == "function" ? t : hs(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Nr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Rr() {
  return this.each(Nr);
}
function Dr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Lr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function zr(e) {
  return this.select(e ? Lr : Dr);
}
function Ur(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function qr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Fr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Br(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, a; i < n; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++s] = a;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Vr(e, t, i) {
  return function() {
    var s = this.__on, n, a = qr(t);
    if (s) {
      for (var o = 0, r = s.length; o < r; ++o)
        if ((n = s[o]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = a, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), n = { type: e.type, name: e.name, value: t, listener: a, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Wr(e, t, i) {
  var s = Fr(e + ""), n, a = s.length, o;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, p = r.length, g; l < p; ++l)
        for (n = 0, g = r[l]; n < a; ++n)
          if ((o = s[n]).type === g.type && o.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Vr : Br, n = 0; n < a; ++n) this.each(r(s[n], t, i));
  return this;
}
function Vn(e, t, i) {
  var s = zn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Hr(e, t) {
  return function() {
    return Vn(this, e, t);
  };
}
function Gr(e, t) {
  return function() {
    return Vn(this, e, t.apply(this, arguments));
  };
}
function jr(e, t) {
  return this.each((typeof t == "function" ? Gr : Hr)(e, t));
}
function* Kr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, a = s.length, o; n < a; ++n)
      (o = s[n]) && (yield o);
}
var Wn = [null];
function Pe(e, t) {
  this._groups = e, this._parents = t;
}
function Jt() {
  return new Pe([[document.documentElement]], Wn);
}
function Yr() {
  return this;
}
Pe.prototype = Jt.prototype = {
  constructor: Pe,
  select: ba,
  selectAll: $a,
  selectChild: Ma,
  selectChildren: Oa,
  filter: Na,
  data: qa,
  enter: Ra,
  exit: Ba,
  join: Va,
  merge: Wa,
  selection: Yr,
  order: Ha,
  sort: Ga,
  call: Ka,
  nodes: Ya,
  node: Xa,
  size: Qa,
  empty: Za,
  each: Ja,
  attr: ar,
  style: cr,
  property: hr,
  classed: yr,
  text: xr,
  html: Er,
  raise: Cr,
  lower: Ar,
  append: Pr,
  insert: Or,
  remove: Rr,
  clone: zr,
  datum: Ur,
  on: Wr,
  dispatch: jr,
  [Symbol.iterator]: Kr
};
function Re(e) {
  return typeof e == "string" ? new Pe([[document.querySelector(e)]], [document.documentElement]) : new Pe([[e]], Wn);
}
function Xr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function nt(e, t) {
  if (e = Xr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Qr = { value: () => {
} };
function gs() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new gi(i);
}
function gi(e) {
  this._ = e;
}
function Zr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
gi.prototype = gs.prototype = {
  constructor: gi,
  on: function(e, t) {
    var i = this._, s = Zr(e + "", i), n, a = -1, o = s.length;
    if (arguments.length < 2) {
      for (; ++a < o; ) if ((n = (e = s[a]).type) && (n = Jr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < o; )
      if (n = (e = s[a]).type) i[n] = qs(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = qs(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new gi(e);
  },
  call: function(e, t) {
    if ((n = arguments.length - 2) > 0) for (var i = new Array(n), s = 0, n, a; s < n; ++s) i[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], s = 0, n = a.length; s < n; ++s) a[s].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], n = 0, a = s.length; n < a; ++n) s[n].value.apply(t, i);
  }
};
function Jr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function qs(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Qr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const es = { capture: !0, passive: !1 };
function ts(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ed(e) {
  var t = e.document.documentElement, i = Re(e).on("dragstart.drag", ts, es);
  "onselectstart" in t ? i.on("selectstart.drag", ts, es) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function td(e, t) {
  var i = e.document.documentElement, s = Re(e).on("dragstart.drag", null);
  t && (s.on("click.drag", ts, es), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function Is(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Hn(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function ei() {
}
var Kt = 0.7, Si = 1 / Kt, kt = "\\s*([+-]?\\d+)\\s*", Yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", qe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", id = /^#([0-9a-f]{3,8})$/, sd = new RegExp(`^rgb\\(${kt},${kt},${kt}\\)$`), nd = new RegExp(`^rgb\\(${qe},${qe},${qe}\\)$`), od = new RegExp(`^rgba\\(${kt},${kt},${kt},${Yt}\\)$`), ad = new RegExp(`^rgba\\(${qe},${qe},${qe},${Yt}\\)$`), rd = new RegExp(`^hsl\\(${Yt},${qe},${qe}\\)$`), dd = new RegExp(`^hsla\\(${Yt},${qe},${qe},${Yt}\\)$`), Fs = {
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
Is(ei, Xt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Bs,
  // Deprecated! Use color.formatHex.
  formatHex: Bs,
  formatHex8: ld,
  formatHsl: cd,
  formatRgb: Vs,
  toString: Vs
});
function Bs() {
  return this.rgb().formatHex();
}
function ld() {
  return this.rgb().formatHex8();
}
function cd() {
  return Gn(this).formatHsl();
}
function Vs() {
  return this.rgb().formatRgb();
}
function Xt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = id.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Ws(t) : i === 3 ? new Me(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ai(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ai(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = sd.exec(e)) ? new Me(t[1], t[2], t[3], 1) : (t = nd.exec(e)) ? new Me(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = od.exec(e)) ? ai(t[1], t[2], t[3], t[4]) : (t = ad.exec(e)) ? ai(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = rd.exec(e)) ? js(t[1], t[2] / 100, t[3] / 100, 1) : (t = dd.exec(e)) ? js(t[1], t[2] / 100, t[3] / 100, t[4]) : Fs.hasOwnProperty(e) ? Ws(Fs[e]) : e === "transparent" ? new Me(NaN, NaN, NaN, 0) : null;
}
function Ws(e) {
  return new Me(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ai(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new Me(e, t, i, s);
}
function pd(e) {
  return e instanceof ei || (e = Xt(e)), e ? (e = e.rgb(), new Me(e.r, e.g, e.b, e.opacity)) : new Me();
}
function is(e, t, i, s) {
  return arguments.length === 1 ? pd(e) : new Me(e, t, i, s ?? 1);
}
function Me(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
Is(Me, is, Hn(ei, {
  brighter(e) {
    return e = e == null ? Si : Math.pow(Si, e), new Me(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new Me(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Me(ct(this.r), ct(this.g), ct(this.b), Ci(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Hs,
  // Deprecated! Use color.formatHex.
  formatHex: Hs,
  formatHex8: ud,
  formatRgb: Gs,
  toString: Gs
}));
function Hs() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}`;
}
function ud() {
  return `#${dt(this.r)}${dt(this.g)}${dt(this.b)}${dt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gs() {
  const e = Ci(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ct(this.r)}, ${ct(this.g)}, ${ct(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ci(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ct(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function dt(e) {
  return e = ct(e), (e < 16 ? "0" : "") + e.toString(16);
}
function js(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new De(e, t, i, s);
}
function Gn(e) {
  if (e instanceof De) return new De(e.h, e.s, e.l, e.opacity);
  if (e instanceof ei || (e = Xt(e)), !e) return new De();
  if (e instanceof De) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), a = Math.max(t, i, s), o = NaN, r = a - n, l = (a + n) / 2;
  return r ? (t === a ? o = (i - s) / r + (i < s) * 6 : i === a ? o = (s - t) / r + 2 : o = (t - i) / r + 4, r /= l < 0.5 ? a + n : 2 - a - n, o *= 60) : r = l > 0 && l < 1 ? 0 : o, new De(o, r, l, e.opacity);
}
function md(e, t, i, s) {
  return arguments.length === 1 ? Gn(e) : new De(e, t, i, s ?? 1);
}
function De(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
Is(De, md, Hn(ei, {
  brighter(e) {
    return e = e == null ? Si : Math.pow(Si, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Kt : Math.pow(Kt, e), new De(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new Me(
      ji(e >= 240 ? e - 240 : e + 120, n, s),
      ji(e, n, s),
      ji(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new De(Ks(this.h), ri(this.s), ri(this.l), Ci(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ci(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ks(this.h)}, ${ri(this.s) * 100}%, ${ri(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ks(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ri(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ji(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const jn = (e) => () => e;
function hd(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function fd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function gd(e) {
  return (e = +e) == 1 ? Kn : function(t, i) {
    return i - t ? fd(t, i, e) : jn(isNaN(t) ? i : t);
  };
}
function Kn(e, t) {
  var i = t - e;
  return i ? hd(e, i) : jn(isNaN(e) ? t : e);
}
const Ys = (function e(t) {
  var i = gd(t);
  function s(n, a) {
    var o = i((n = is(n)).r, (a = is(a)).r), r = i(n.g, a.g), l = i(n.b, a.b), p = Kn(n.opacity, a.opacity);
    return function(g) {
      return n.r = o(g), n.g = r(g), n.b = l(g), n.opacity = p(g), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Qe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var ss = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ki = new RegExp(ss.source, "g");
function Id(e) {
  return function() {
    return e;
  };
}
function yd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function vd(e, t) {
  var i = ss.lastIndex = Ki.lastIndex = 0, s, n, a, o = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (s = ss.exec(e)) && (n = Ki.exec(t)); )
    (a = n.index) > i && (a = t.slice(i, a), r[o] ? r[o] += a : r[++o] = a), (s = s[0]) === (n = n[0]) ? r[o] ? r[o] += n : r[++o] = n : (r[++o] = null, l.push({ i: o, x: Qe(s, n) })), i = Ki.lastIndex;
  return i < t.length && (a = t.slice(i), r[o] ? r[o] += a : r[++o] = a), r.length < 2 ? l[0] ? yd(l[0].x) : Id(t) : (t = l.length, function(p) {
    for (var g = 0, I; g < t; ++g) r[(I = l[g]).i] = I.x(p);
    return r.join("");
  });
}
var Xs = 180 / Math.PI, ns = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Yn(e, t, i, s, n, a) {
  var o, r, l;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (l = e * i + t * s) && (i -= e * l, s -= t * l), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, l /= r), e * s < t * i && (e = -e, t = -t, l = -l, o = -o), {
    translateX: n,
    translateY: a,
    rotate: Math.atan2(t, e) * Xs,
    skewX: Math.atan(l) * Xs,
    scaleX: o,
    scaleY: r
  };
}
var di;
function wd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ns : Yn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function bd(e) {
  return e == null || (di || (di = document.createElementNS("http://www.w3.org/2000/svg", "g")), di.setAttribute("transform", e), !(e = di.transform.baseVal.consolidate())) ? ns : (e = e.matrix, Yn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Xn(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, g, I, h, m, d) {
    if (p !== I || g !== h) {
      var u = m.push("translate(", null, t, null, i);
      d.push({ i: u - 4, x: Qe(p, I) }, { i: u - 2, x: Qe(g, h) });
    } else (I || h) && m.push("translate(" + I + t + h + i);
  }
  function o(p, g, I, h) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), h.push({ i: I.push(n(I) + "rotate(", null, s) - 2, x: Qe(p, g) })) : g && I.push(n(I) + "rotate(" + g + s);
  }
  function r(p, g, I, h) {
    p !== g ? h.push({ i: I.push(n(I) + "skewX(", null, s) - 2, x: Qe(p, g) }) : g && I.push(n(I) + "skewX(" + g + s);
  }
  function l(p, g, I, h, m, d) {
    if (p !== I || g !== h) {
      var u = m.push(n(m) + "scale(", null, ",", null, ")");
      d.push({ i: u - 4, x: Qe(p, I) }, { i: u - 2, x: Qe(g, h) });
    } else (I !== 1 || h !== 1) && m.push(n(m) + "scale(" + I + "," + h + ")");
  }
  return function(p, g) {
    var I = [], h = [];
    return p = e(p), g = e(g), a(p.translateX, p.translateY, g.translateX, g.translateY, I, h), o(p.rotate, g.rotate, I, h), r(p.skewX, g.skewX, I, h), l(p.scaleX, p.scaleY, g.scaleX, g.scaleY, I, h), p = g = null, function(m) {
      for (var d = -1, u = h.length, f; ++d < u; ) I[(f = h[d]).i] = f.x(m);
      return I.join("");
    };
  };
}
var xd = Xn(wd, "px, ", "px)", "deg)"), kd = Xn(bd, ", ", ")", ")"), _d = 1e-12;
function Qs(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function $d(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ed(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Sd = (function e(t, i, s) {
  function n(a, o) {
    var r = a[0], l = a[1], p = a[2], g = o[0], I = o[1], h = o[2], m = g - r, d = I - l, u = m * m + d * d, f, b;
    if (u < _d)
      b = Math.log(h / p) / t, f = function(w) {
        return [
          r + w * m,
          l + w * d,
          p * Math.exp(t * w * b)
        ];
      };
    else {
      var C = Math.sqrt(u), N = (h * h - p * p + s * u) / (2 * p * i * C), W = (h * h - p * p - s * u) / (2 * h * i * C), P = Math.log(Math.sqrt(N * N + 1) - N), x = Math.log(Math.sqrt(W * W + 1) - W);
      b = (x - P) / t, f = function(w) {
        var T = w * b, R = Qs(P), L = p / (i * C) * (R * Ed(t * T + P) - $d(P));
        return [
          r + L * m,
          l + L * d,
          p * R / Qs(t * T + P)
        ];
      };
    }
    return f.duration = b * 1e3 * t / Math.SQRT2, f;
  }
  return n.rho = function(a) {
    var o = Math.max(1e-3, +a), r = o * o, l = r * r;
    return e(o, r, l);
  }, n;
})(Math.SQRT2, 2, 4);
var St = 0, Ut = 0, Nt = 0, Qn = 1e3, Mi, qt, Ai = 0, ut = 0, Ri = 0, Qt = typeof performance == "object" && performance.now ? performance : Date, Zn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ys() {
  return ut || (Zn(Cd), ut = Qt.now() + Ri);
}
function Cd() {
  ut = 0;
}
function Pi() {
  this._call = this._time = this._next = null;
}
Pi.prototype = Jn.prototype = {
  constructor: Pi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ys() : +i) + (t == null ? 0 : +t), !this._next && qt !== this && (qt ? qt._next = this : Mi = this, qt = this), this._call = e, this._time = i, os();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, os());
  }
};
function Jn(e, t, i) {
  var s = new Pi();
  return s.restart(e, t, i), s;
}
function Md() {
  ys(), ++St;
  for (var e = Mi, t; e; )
    (t = ut - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --St;
}
function Zs() {
  ut = (Ai = Qt.now()) + Ri, St = Ut = 0;
  try {
    Md();
  } finally {
    St = 0, Pd(), ut = 0;
  }
}
function Ad() {
  var e = Qt.now(), t = e - Ai;
  t > Qn && (Ri -= t, Ai = e);
}
function Pd() {
  for (var e, t = Mi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Mi = i);
  qt = e, os(s);
}
function os(e) {
  if (!St) {
    Ut && (Ut = clearTimeout(Ut));
    var t = e - ut;
    t > 24 ? (e < 1 / 0 && (Ut = setTimeout(Zs, e - Qt.now() - Ri)), Nt && (Nt = clearInterval(Nt))) : (Nt || (Ai = Qt.now(), Nt = setInterval(Ad, Qn)), St = 1, Zn(Zs));
  }
}
function Js(e, t, i) {
  var s = new Pi();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var Td = gs("start", "end", "cancel", "interrupt"), Od = [], eo = 0, en = 1, as = 2, Ii = 3, tn = 4, rs = 5, yi = 6;
function Di(e, t, i, s, n, a) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (i in o) return;
  Nd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: Td,
    tween: Od,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: eo
  });
}
function vs(e, t) {
  var i = ze(e, t);
  if (i.state > eo) throw new Error("too late; already scheduled");
  return i;
}
function Fe(e, t) {
  var i = ze(e, t);
  if (i.state > Ii) throw new Error("too late; already running");
  return i;
}
function ze(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Nd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Jn(a, 0, i.time);
  function a(p) {
    i.state = en, i.timer.restart(o, i.delay, i.time), i.delay <= p && o(p - i.delay);
  }
  function o(p) {
    var g, I, h, m;
    if (i.state !== en) return l();
    for (g in s)
      if (m = s[g], m.name === i.name) {
        if (m.state === Ii) return Js(o);
        m.state === tn ? (m.state = yi, m.timer.stop(), m.on.call("interrupt", e, e.__data__, m.index, m.group), delete s[g]) : +g < t && (m.state = yi, m.timer.stop(), m.on.call("cancel", e, e.__data__, m.index, m.group), delete s[g]);
      }
    if (Js(function() {
      i.state === Ii && (i.state = tn, i.timer.restart(r, i.delay, i.time), r(p));
    }), i.state = as, i.on.call("start", e, e.__data__, i.index, i.group), i.state === as) {
      for (i.state = Ii, n = new Array(h = i.tween.length), g = 0, I = -1; g < h; ++g)
        (m = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (n[++I] = m);
      n.length = I + 1;
    }
  }
  function r(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(l), i.state = rs, 1), I = -1, h = n.length; ++I < h; )
      n[I].call(e, g);
    i.state === rs && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = yi, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function vi(e, t) {
  var i = e.__transition, s, n, a = !0, o;
  if (i) {
    t = t == null ? null : t + "";
    for (o in i) {
      if ((s = i[o]).name !== t) {
        a = !1;
        continue;
      }
      n = s.state > as && s.state < rs, s.state = yi, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[o];
    }
    a && delete e.__transition;
  }
}
function Rd(e) {
  return this.each(function() {
    vi(this, e);
  });
}
function Dd(e, t) {
  var i, s;
  return function() {
    var n = Fe(this, e), a = n.tween;
    if (a !== i) {
      s = i = a;
      for (var o = 0, r = s.length; o < r; ++o)
        if (s[o].name === t) {
          s = s.slice(), s.splice(o, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function Ld(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = Fe(this, e), o = a.tween;
    if (o !== s) {
      n = (s = o).slice();
      for (var r = { name: t, value: i }, l = 0, p = n.length; l < p; ++l)
        if (n[l].name === t) {
          n[l] = r;
          break;
        }
      l === p && n.push(r);
    }
    a.tween = n;
  };
}
function zd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = ze(this.node(), i).tween, n = 0, a = s.length, o; n < a; ++n)
      if ((o = s[n]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Dd : Ld)(i, e, t));
}
function ws(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Fe(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return ze(n, s).value[t];
  };
}
function to(e, t) {
  var i;
  return (typeof t == "number" ? Qe : t instanceof Xt ? Ys : (i = Xt(t)) ? (t = i, Ys) : vd)(e, t);
}
function Ud(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function qd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Fd(e, t, i) {
  var s, n = i + "", a;
  return function() {
    var o = this.getAttribute(e);
    return o === n ? null : o === s ? a : a = t(s = o, i);
  };
}
function Bd(e, t, i) {
  var s, n = i + "", a;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === n ? null : o === s ? a : a = t(s = o, i);
  };
}
function Vd(e, t, i) {
  var s, n, a;
  return function() {
    var o, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), l = r + "", o === l ? null : o === s && l === n ? a : (n = l, a = t(s = o, r)));
  };
}
function Wd(e, t, i) {
  var s, n, a;
  return function() {
    var o, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), l = r + "", o === l ? null : o === s && l === n ? a : (n = l, a = t(s = o, r)));
  };
}
function Hd(e, t) {
  var i = Ni(e), s = i === "transform" ? kd : to;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Wd : Vd)(i, s, ws(this, "attr." + e, t)) : t == null ? (i.local ? qd : Ud)(i) : (i.local ? Bd : Fd)(i, s, t));
}
function Gd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function jd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Kd(e, t) {
  var i, s;
  function n() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && jd(e, a)), i;
  }
  return n._value = t, n;
}
function Yd(e, t) {
  var i, s;
  function n() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && Gd(e, a)), i;
  }
  return n._value = t, n;
}
function Xd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = Ni(e);
  return this.tween(i, (s.local ? Kd : Yd)(s, t));
}
function Qd(e, t) {
  return function() {
    vs(this, e).delay = +t.apply(this, arguments);
  };
}
function Zd(e, t) {
  return t = +t, function() {
    vs(this, e).delay = t;
  };
}
function Jd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qd : Zd)(t, e)) : ze(this.node(), t).delay;
}
function el(e, t) {
  return function() {
    Fe(this, e).duration = +t.apply(this, arguments);
  };
}
function tl(e, t) {
  return t = +t, function() {
    Fe(this, e).duration = t;
  };
}
function il(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? el : tl)(t, e)) : ze(this.node(), t).duration;
}
function sl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Fe(this, e).ease = t;
  };
}
function nl(e) {
  var t = this._id;
  return arguments.length ? this.each(sl(t, e)) : ze(this.node(), t).ease;
}
function ol(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Fe(this, e).ease = i;
  };
}
function al(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ol(this._id, e));
}
function rl(e) {
  typeof e != "function" && (e = Rn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var a = t[n], o = a.length, r = s[n] = [], l, p = 0; p < o; ++p)
      (l = a[p]) && e.call(l, l.__data__, p, a) && r.push(l);
  return new Ke(s, this._parents, this._name, this._id);
}
function dl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, a = Math.min(s, n), o = new Array(s), r = 0; r < a; ++r)
    for (var l = t[r], p = i[r], g = l.length, I = o[r] = new Array(g), h, m = 0; m < g; ++m)
      (h = l[m] || p[m]) && (I[m] = h);
  for (; r < s; ++r)
    o[r] = t[r];
  return new Ke(o, this._parents, this._name, this._id);
}
function ll(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function cl(e, t, i) {
  var s, n, a = ll(t) ? vs : Fe;
  return function() {
    var o = a(this, e), r = o.on;
    r !== s && (n = (s = r).copy()).on(t, i), o.on = n;
  };
}
function pl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? ze(this.node(), i).on.on(e) : this.each(cl(i, e, t));
}
function ul(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function ml() {
  return this.on("end.remove", ul(this._id));
}
function hl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = hs(e));
  for (var s = this._groups, n = s.length, a = new Array(n), o = 0; o < n; ++o)
    for (var r = s[o], l = r.length, p = a[o] = new Array(l), g, I, h = 0; h < l; ++h)
      (g = r[h]) && (I = e.call(g, g.__data__, h, r)) && ("__data__" in g && (I.__data__ = g.__data__), p[h] = I, Di(p[h], t, i, h, p, ze(g, i)));
  return new Ke(a, this._parents, t, i);
}
function fl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Nn(e));
  for (var s = this._groups, n = s.length, a = [], o = [], r = 0; r < n; ++r)
    for (var l = s[r], p = l.length, g, I = 0; I < p; ++I)
      if (g = l[I]) {
        for (var h = e.call(g, g.__data__, I, l), m, d = ze(g, i), u = 0, f = h.length; u < f; ++u)
          (m = h[u]) && Di(m, t, i, u, h, d);
        a.push(h), o.push(g);
      }
  return new Ke(a, o, t, i);
}
var gl = Jt.prototype.constructor;
function Il() {
  return new gl(this._groups, this._parents);
}
function yl(e, t) {
  var i, s, n;
  return function() {
    var a = Et(this, e), o = (this.style.removeProperty(e), Et(this, e));
    return a === o ? null : a === i && o === s ? n : n = t(i = a, s = o);
  };
}
function io(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function vl(e, t, i) {
  var s, n = i + "", a;
  return function() {
    var o = Et(this, e);
    return o === n ? null : o === s ? a : a = t(s = o, i);
  };
}
function wl(e, t, i) {
  var s, n, a;
  return function() {
    var o = Et(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), Et(this, e))), o === l ? null : o === s && l === n ? a : (n = l, a = t(s = o, r));
  };
}
function bl(e, t) {
  var i, s, n, a = "style." + t, o = "end." + a, r;
  return function() {
    var l = Fe(this, e), p = l.on, g = l.value[a] == null ? r || (r = io(t)) : void 0;
    (p !== i || n !== g) && (s = (i = p).copy()).on(o, n = g), l.on = s;
  };
}
function xl(e, t, i) {
  var s = (e += "") == "transform" ? xd : to;
  return t == null ? this.styleTween(e, yl(e, s)).on("end.style." + e, io(e)) : typeof t == "function" ? this.styleTween(e, wl(e, s, ws(this, "style." + e, t))).each(bl(this._id, e)) : this.styleTween(e, vl(e, s, t), i).on("end.style." + e, null);
}
function kl(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function _l(e, t, i) {
  var s, n;
  function a() {
    var o = t.apply(this, arguments);
    return o !== n && (s = (n = o) && kl(e, o, i)), s;
  }
  return a._value = t, a;
}
function $l(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, _l(e, t, i ?? ""));
}
function El(e) {
  return function() {
    this.textContent = e;
  };
}
function Sl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Cl(e) {
  return this.tween("text", typeof e == "function" ? Sl(ws(this, "text", e)) : El(e == null ? "" : e + ""));
}
function Ml(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Al(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && Ml(n)), t;
  }
  return s._value = e, s;
}
function Pl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Al(e));
}
function Tl() {
  for (var e = this._name, t = this._id, i = so(), s = this._groups, n = s.length, a = 0; a < n; ++a)
    for (var o = s[a], r = o.length, l, p = 0; p < r; ++p)
      if (l = o[p]) {
        var g = ze(l, t);
        Di(l, e, i, p, o, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ke(s, this._parents, e, i);
}
function Ol() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(a, o) {
    var r = { value: o }, l = { value: function() {
      --n === 0 && a();
    } };
    i.each(function() {
      var p = Fe(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), p.on = t;
    }), n === 0 && a();
  });
}
var Nl = 0;
function Ke(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function so() {
  return ++Nl;
}
var We = Jt.prototype;
Ke.prototype = {
  constructor: Ke,
  select: hl,
  selectAll: fl,
  selectChild: We.selectChild,
  selectChildren: We.selectChildren,
  filter: rl,
  merge: dl,
  selection: Il,
  transition: Tl,
  call: We.call,
  nodes: We.nodes,
  node: We.node,
  size: We.size,
  empty: We.empty,
  each: We.each,
  on: pl,
  attr: Hd,
  attrTween: Xd,
  style: xl,
  styleTween: $l,
  text: Cl,
  textTween: Pl,
  remove: ml,
  tween: zd,
  delay: Jd,
  duration: il,
  ease: nl,
  easeVarying: al,
  end: Ol,
  [Symbol.iterator]: We[Symbol.iterator]
};
function Rl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Dl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rl
};
function Ll(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function zl(e) {
  var t, i;
  e instanceof Ke ? (t = e._id, e = e._name) : (t = so(), (i = Dl).time = ys(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, a = 0; a < n; ++a)
    for (var o = s[a], r = o.length, l, p = 0; p < r; ++p)
      (l = o[p]) && Di(l, e, t, p, o, i || Ll(l, t));
  return new Ke(s, this._parents, e, t);
}
Jt.prototype.interrupt = Rd;
Jt.prototype.transition = zl;
const li = (e) => () => e;
function Ul(e, {
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
function je(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
je.prototype = {
  constructor: je,
  scale: function(e) {
    return e === 1 ? this : new je(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new je(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Vt = new je(1, 0, 0);
je.prototype;
function Yi(e) {
  e.stopImmediatePropagation();
}
function Rt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ql(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Fl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function sn() {
  return this.__zoom || Vt;
}
function Bl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Vl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Wl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], o = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o)
  );
}
function Hl() {
  var e = ql, t = Fl, i = Wl, s = Bl, n = Vl, a = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Sd, p = gs("start", "zoom", "end"), g, I, h, m = 500, d = 150, u = 0, f = 10;
  function b(y) {
    y.property("__zoom", sn).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", L).filter(n).on("touchstart.zoom", U).on("touchmove.zoom", F).on("touchend.zoom touchcancel.zoom", B).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  b.transform = function(y, S, v, k) {
    var _ = y.selection ? y.selection() : y;
    _.property("__zoom", sn), y !== _ ? P(y, S, v, k) : _.interrupt().each(function() {
      x(this, arguments).event(k).start().zoom(null, typeof S == "function" ? S.apply(this, arguments) : S).end();
    });
  }, b.scaleBy = function(y, S, v, k) {
    b.scaleTo(y, function() {
      var _ = this.__zoom.k, $ = typeof S == "function" ? S.apply(this, arguments) : S;
      return _ * $;
    }, v, k);
  }, b.scaleTo = function(y, S, v, k) {
    b.transform(y, function() {
      var _ = t.apply(this, arguments), $ = this.__zoom, A = v == null ? W(_) : typeof v == "function" ? v.apply(this, arguments) : v, M = $.invert(A), D = typeof S == "function" ? S.apply(this, arguments) : S;
      return i(N(C($, D), A, M), _, o);
    }, v, k);
  }, b.translateBy = function(y, S, v, k) {
    b.transform(y, function() {
      return i(this.__zoom.translate(
        typeof S == "function" ? S.apply(this, arguments) : S,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), o);
    }, null, k);
  }, b.translateTo = function(y, S, v, k, _) {
    b.transform(y, function() {
      var $ = t.apply(this, arguments), A = this.__zoom, M = k == null ? W($) : typeof k == "function" ? k.apply(this, arguments) : k;
      return i(Vt.translate(M[0], M[1]).scale(A.k).translate(
        typeof S == "function" ? -S.apply(this, arguments) : -S,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), $, o);
    }, k, _);
  };
  function C(y, S) {
    return S = Math.max(a[0], Math.min(a[1], S)), S === y.k ? y : new je(S, y.x, y.y);
  }
  function N(y, S, v) {
    var k = S[0] - v[0] * y.k, _ = S[1] - v[1] * y.k;
    return k === y.x && _ === y.y ? y : new je(y.k, k, _);
  }
  function W(y) {
    return [(+y[0][0] + +y[1][0]) / 2, (+y[0][1] + +y[1][1]) / 2];
  }
  function P(y, S, v, k) {
    y.on("start.zoom", function() {
      x(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      x(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var _ = this, $ = arguments, A = x(_, $).event(k), M = t.apply(_, $), D = v == null ? W(M) : typeof v == "function" ? v.apply(_, $) : v, V = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), K = _.__zoom, de = typeof S == "function" ? S.apply(_, $) : S, me = l(K.invert(D).concat(V / K.k), de.invert(D).concat(V / de.k));
      return function(z) {
        if (z === 1) z = de;
        else {
          var G = me(z), oe = V / G[2];
          z = new je(oe, D[0] - G[0] * oe, D[1] - G[1] * oe);
        }
        A.zoom(null, z);
      };
    });
  }
  function x(y, S, v) {
    return !v && y.__zooming || new w(y, S);
  }
  function w(y, S) {
    this.that = y, this.args = S, this.active = 0, this.sourceEvent = null, this.extent = t.apply(y, S), this.taps = 0;
  }
  w.prototype = {
    event: function(y) {
      return y && (this.sourceEvent = y), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(y, S) {
      return this.mouse && y !== "mouse" && (this.mouse[1] = S.invert(this.mouse[0])), this.touch0 && y !== "touch" && (this.touch0[1] = S.invert(this.touch0[0])), this.touch1 && y !== "touch" && (this.touch1[1] = S.invert(this.touch1[0])), this.that.__zoom = S, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(y) {
      var S = Re(this.that).datum();
      p.call(
        y,
        this.that,
        new Ul(y, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: p
        }),
        S
      );
    }
  };
  function T(y, ...S) {
    if (!e.apply(this, arguments)) return;
    var v = x(this, S).event(y), k = this.__zoom, _ = Math.max(a[0], Math.min(a[1], k.k * Math.pow(2, s.apply(this, arguments)))), $ = nt(y);
    if (v.wheel)
      (v.mouse[0][0] !== $[0] || v.mouse[0][1] !== $[1]) && (v.mouse[1] = k.invert(v.mouse[0] = $)), clearTimeout(v.wheel);
    else {
      if (k.k === _) return;
      v.mouse = [$, k.invert($)], vi(this), v.start();
    }
    Rt(y), v.wheel = setTimeout(A, d), v.zoom("mouse", i(N(C(k, _), v.mouse[0], v.mouse[1]), v.extent, o));
    function A() {
      v.wheel = null, v.end();
    }
  }
  function R(y, ...S) {
    if (h || !e.apply(this, arguments)) return;
    var v = y.currentTarget, k = x(this, S, !0).event(y), _ = Re(y.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", V, !0), $ = nt(y, v), A = y.clientX, M = y.clientY;
    ed(y.view), Yi(y), k.mouse = [$, this.__zoom.invert($)], vi(this), k.start();
    function D(K) {
      if (Rt(K), !k.moved) {
        var de = K.clientX - A, me = K.clientY - M;
        k.moved = de * de + me * me > u;
      }
      k.event(K).zoom("mouse", i(N(k.that.__zoom, k.mouse[0] = nt(K, v), k.mouse[1]), k.extent, o));
    }
    function V(K) {
      _.on("mousemove.zoom mouseup.zoom", null), td(K.view, k.moved), Rt(K), k.event(K).end();
    }
  }
  function L(y, ...S) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, k = nt(y.changedTouches ? y.changedTouches[0] : y, this), _ = v.invert(k), $ = v.k * (y.shiftKey ? 0.5 : 2), A = i(N(C(v, $), k, _), t.apply(this, S), o);
      Rt(y), r > 0 ? Re(this).transition().duration(r).call(P, A, k, y) : Re(this).call(b.transform, A, k, y);
    }
  }
  function U(y, ...S) {
    if (e.apply(this, arguments)) {
      var v = y.touches, k = v.length, _ = x(this, S, y.changedTouches.length === k).event(y), $, A, M, D;
      for (Yi(y), A = 0; A < k; ++A)
        M = v[A], D = nt(M, this), D = [D, this.__zoom.invert(D), M.identifier], _.touch0 ? !_.touch1 && _.touch0[2] !== D[2] && (_.touch1 = D, _.taps = 0) : (_.touch0 = D, $ = !0, _.taps = 1 + !!g);
      g && (g = clearTimeout(g)), $ && (_.taps < 2 && (I = D[0], g = setTimeout(function() {
        g = null;
      }, m)), vi(this), _.start());
    }
  }
  function F(y, ...S) {
    if (this.__zooming) {
      var v = x(this, S).event(y), k = y.changedTouches, _ = k.length, $, A, M, D;
      for (Rt(y), $ = 0; $ < _; ++$)
        A = k[$], M = nt(A, this), v.touch0 && v.touch0[2] === A.identifier ? v.touch0[0] = M : v.touch1 && v.touch1[2] === A.identifier && (v.touch1[0] = M);
      if (A = v.that.__zoom, v.touch1) {
        var V = v.touch0[0], K = v.touch0[1], de = v.touch1[0], me = v.touch1[1], z = (z = de[0] - V[0]) * z + (z = de[1] - V[1]) * z, G = (G = me[0] - K[0]) * G + (G = me[1] - K[1]) * G;
        A = C(A, Math.sqrt(z / G)), M = [(V[0] + de[0]) / 2, (V[1] + de[1]) / 2], D = [(K[0] + me[0]) / 2, (K[1] + me[1]) / 2];
      } else if (v.touch0) M = v.touch0[0], D = v.touch0[1];
      else return;
      v.zoom("touch", i(N(A, M, D), v.extent, o));
    }
  }
  function B(y, ...S) {
    if (this.__zooming) {
      var v = x(this, S).event(y), k = y.changedTouches, _ = k.length, $, A;
      for (Yi(y), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, m), $ = 0; $ < _; ++$)
        A = k[$], v.touch0 && v.touch0[2] === A.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === A.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (A = nt(A, this), Math.hypot(I[0] - A[0], I[1] - A[1]) < f)) {
        var M = Re(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return b.wheelDelta = function(y) {
    return arguments.length ? (s = typeof y == "function" ? y : li(+y), b) : s;
  }, b.filter = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : li(!!y), b) : e;
  }, b.touchable = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : li(!!y), b) : n;
  }, b.extent = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : li([[+y[0][0], +y[0][1]], [+y[1][0], +y[1][1]]]), b) : t;
  }, b.scaleExtent = function(y) {
    return arguments.length ? (a[0] = +y[0], a[1] = +y[1], b) : [a[0], a[1]];
  }, b.translateExtent = function(y) {
    return arguments.length ? (o[0][0] = +y[0][0], o[1][0] = +y[1][0], o[0][1] = +y[0][1], o[1][1] = +y[1][1], b) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, b.constrain = function(y) {
    return arguments.length ? (i = y, b) : i;
  }, b.duration = function(y) {
    return arguments.length ? (r = +y, b) : r;
  }, b.interpolate = function(y) {
    return arguments.length ? (l = y, b) : l;
  }, b.on = function() {
    var y = p.on.apply(p, arguments);
    return y === p ? b : y;
  }, b.clickDistance = function(y) {
    return arguments.length ? (u = (y = +y) * y, b) : Math.sqrt(u);
  }, b.tapDistance = function(y) {
    return arguments.length ? (f = +y, b) : f;
  }, b;
}
var Gl = Object.defineProperty, jl = Object.getOwnPropertyDescriptor, ve = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? jl(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Gl(t, i, n), n;
};
function Kl(e, t, i, s) {
  const n = t.x - e.x, a = t.y - e.y, o = s.x - i.x, r = s.y - i.y, l = n * r - a * o;
  if (Math.abs(l) < 1e-9) return null;
  const p = ((i.x - e.x) * r - (i.y - e.y) * o) / l, g = ((i.x - e.x) * a - (i.y - e.y) * n) / l;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * a, t: p };
}
function Yl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, a = s * s + n * n || 1, o = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / a)), r = t.x + o * s, l = t.y + o * n;
  return { dist: Math.hypot(e.x - r, e.y - l), t: o };
}
function Xl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const a = e[n], o = e[n + 1], r = Math.hypot(o.x - a.x, o.y - a.y) || 1, l = (o.x - a.x) / r, p = (o.y - a.y) / r, g = t.map(([h, m]) => Kl(a, o, h, m)).filter((h) => h !== null).filter((h) => h.t * r > i + 2 && (1 - h.t) * r > i + 2).sort((h, m) => h.t - m.t);
    let I = -1 / 0;
    for (const h of g)
      h.t * r - i <= I + 2 || (s += ` L ${h.x - l * i} ${h.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${h.x + l * i} ${h.y + p * i}`, I = h.t * r + i);
    s += ` L ${o.x} ${o.y}`;
  }
  return s;
}
const bt = {
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
let fe = class extends Le {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Vt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const n = this.scene.nodes.filter((a) => this.selectedIds.includes(a.id)).map((a) => ({ id: a.id, kind: a.kind }));
            n.length && this.emit("delete-selection-requested", { items: n });
            return;
          }
          if (this._selectedWaypoint) {
            const n = this.scene.edges.find((a) => a.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = Hl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Re(e).call(this._zoomBehavior);
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
    const n = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, o = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, l = Math.max(80, s.width - n - a), p = Math.max(80, s.height - o - r), g = Math.min(...t.map((f) => f.x - f.w / 2)) - e, I = Math.max(...t.map((f) => f.x + f.w / 2)) + e, h = Math.min(...t.map((f) => f.y - f.h / 2)) - e, m = Math.max(...t.map((f) => f.y + f.h / 2)) + e, d = Math.max(0.15, Math.min(l / (I - g), p / (m - h), 1.25)), u = Vt.translate(
      n + l / 2 - d * (g + I) / 2,
      o + p / 2 - d * (h + m) / 2
    ).scale(d);
    Re(i).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Re(t), e);
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
    for (let a = e.parentId; a; a = (s = this.scene.nodes.find((o) => o.id === a)) == null ? void 0 : s.parentId) {
      const o = this.scene.nodes.find((l) => l.id === a);
      if (!o) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - o.x), y: e.y + (this._dragPos.y - o.y) };
      const r = (n = this._dragGroup) == null ? void 0 : n.get(a);
      if (r)
        return { x: e.x + (r.x - o.x), y: e.y + (r.y - o.y) };
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
        const n = this.nodePos(s), a = n.x - s.w / 2 + 10 + e.w / 2, o = n.x + s.w / 2 - 10 - e.w / 2, r = n.y - s.h / 2 + 34 + e.h / 2, l = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), o), i = Math.min(Math.max(i, r), l);
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
    for (const a of i) {
      const o = (n = a.closest) == null ? void 0 : n.call(a, "[data-node-id]");
      if (o) return o.getAttribute("data-node-id");
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
    const a = new Set(this.selectedIds), o = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => a.has(f.id) && !(f.parentId && a.has(f.parentId))
    ) : null, r = o ? new Map(o.map((f) => [f.id, this.nodePos(f)])) : null, l = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !o, p = o ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, I = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], h = () => {
      const f = [], b = p === "menu" ? this.scene.nodes.filter((C) => C.kind === "ui-app") : this.scene.nodes.filter((C) => C.id === t.parentId);
      for (const C of b) {
        const N = this.scene.nodes.filter((w) => w.parentId === C.id && I.includes(w.kind ?? "") && w.id !== t.id).sort((w, T) => w.y - T.y), W = C.x - C.w / 2 + 10, P = C.x + C.w / 2 - 10;
        for (const w of N) f.push({ x1: W, x2: P, y: w.y - w.h / 2 - 3, appId: C.id, beforeId: w.id });
        const x = N[N.length - 1];
        f.push({
          x1: W,
          x2: P,
          y: x ? x.y + x.h / 2 + 3 : C.y - C.h / 2 + 34 + 8,
          appId: C.id,
          beforeId: null
        });
      }
      return f;
    }, m = (f) => {
      const b = this.nodeIdAt(f), C = b && b !== t.id ? this.scene.nodes.find((N) => N.id === b) : void 0;
      return C ? C.kind === "external-system" ? C.id : C.parentId ?? null : null;
    }, d = (f) => {
      if ((f.buttons & 1) === 0) {
        u(f);
        return;
      }
      const b = this.toScene(f), C = b.x - i.x, N = b.y - i.y;
      if (!(!n && Math.hypot(C, N) < 3 / this._t.k))
        if (n = !0, o && r) {
          const W = /* @__PURE__ */ new Map();
          for (const P of o) {
            const x = r.get(P.id), w = this.clampToParent(P, x.x + C, x.y + N);
            W.set(P.id, { x: w.x, y: w.y });
          }
          this._dragGroup = W;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + C, y: s.y + N }, this._menuSlots || (this._menuSlots = { slots: h(), active: null, nestRowId: null });
          const W = this.scene.nodes.filter(
            (x) => I.includes(x.kind ?? "") && x.id !== t.id && Math.abs(b.x - x.x) <= x.w / 2 + 8
          ), P = p === "menu" ? W.find((x) => Math.abs(b.y - x.y) < x.h * 0.28) : void 0;
          if (P)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: P.id }, this._hoverNodeId = P.id;
          else {
            let x = -1, w = 14;
            this._menuSlots.slots.forEach((T, R) => {
              if (b.x < T.x1 - 24 || b.x > T.x2 + 24) return;
              const L = Math.abs(b.y - T.y);
              L < w && (w = L, x = R);
            }), this._menuSlots = { ...this._menuSlots, active: x >= 0 ? x : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else l(f) ? (this._dragPos = { id: t.id, x: s.x + C, y: s.y + N }, this._hoverNodeId = m(f)) : (this._dragPos = this.clampToParent(t, s.x + C, s.y + N), this._hoverNodeId = null);
    }, u = (f) => {
      if (window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", u), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([b, C]) => ({ id: b, x: C.x, y: C.y }))
        });
      else if (n && this._dragPos && g) {
        const b = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const C = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (b != null && b.nestRowId)
          this.emit(C, { id: t.id, nestRowId: b.nestRowId });
        else if (b && b.active !== null) {
          const N = b.slots[b.active];
          this.emit(C, { id: t.id, appId: N.appId, beforeId: N.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (l(f)) {
          const b = m(f);
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
    const n = 160, a = 90, o = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((u) => u.parentId === t.id), l = Math.min(...r.map((u) => u.x - u.w / 2)), p = Math.max(...r.map((u) => u.x + u.w / 2)), g = Math.min(...r.map((u) => u.y - u.h / 2)), I = Math.max(...r.map((u) => u.y + u.h / 2)), h = xo(
      r.map((u) => ({ dx: u.x - o.x, dy: u.y - o.y, w: u.w, h: u.h })),
      { w: n, h: a }
    ), m = (u) => {
      if ((u.buttons & 1) === 0) {
        d();
        return;
      }
      const f = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: o.x,
          y: o.y,
          w: Math.max(h.w, 2 * Math.abs(f.x - o.x)),
          h: Math.max(h.h, 2 * Math.abs(f.y - o.y))
        };
        return;
      }
      const b = o.x - i * o.w / 2, C = o.y - s * o.h / 2, N = i > 0 ? Math.max(f.x, b + n, r.length ? p + 10 : -1 / 0) : Math.min(f.x, b - n, r.length ? l - 10 : 1 / 0), W = s > 0 ? Math.max(f.y, C + a, r.length ? I + 10 : -1 / 0) : Math.min(f.y, C - a, r.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (b + N) / 2,
        y: (C + W) / 2,
        w: Math.abs(N - b),
        h: Math.abs(W - C)
      };
    }, d = () => {
      window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", m), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const s = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: s.x, y: s.y };
    const n = (o) => {
      if ((o.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, a = (o) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a);
      const r = this.nodeIdAt(o);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
        x: o.clientX,
        y: o.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: s, y: n } = this.nodePos(e), a = t - s, o = i - n, r = e.w / 2, l = e.h / 2;
    if (a === 0 && o === 0) return { x: s, y: n };
    const p = 1 / Math.max(Math.abs(a) / r, Math.abs(o) / l);
    return { x: s + a * p, y: n + o * p };
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), a = this.nodePos(i), o = s[0] ?? a, r = s[s.length - 1] ?? n;
    let l = this.borderPoint(t, o.x, o.y), p = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const I = Math.hypot(p.x - l.x, p.y - l.y) || 1, h = -(p.y - l.y) / I * g, m = (p.x - l.x) / I * g;
        l = { x: l.x + h, y: l.y + m }, p = { x: p.x + h, y: p.y + m };
      }
    }
    return [l, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (o) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(o), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: l };
    }, a = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = Yl(t, e[s], e[s + 1]);
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
    let a = !1;
    const o = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(l);
      if (a) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[n] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - s.x, p.y - s.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(n, 0, p), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: g, index: n };
      }
    }, r = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", r), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", r);
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, a = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), o = Math.floor((t.length - 1) / 2), r = {
      x: (t[o].x + t[o + 1].x) / 2,
      y: (t[o].y + t[o + 1].y) / 2
    }, l = t.slice(1, -1);
    return te`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Xl(t, i)}
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
        ${n ? l.map((p, g) => {
      var h;
      const I = ((h = this._selectedWaypoint) == null ? void 0 : h.edgeId) === e.id && this._selectedWaypoint.index === g;
      return te`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${I ? 6 : 5}
                        fill=${I ? "#2563eb" : "#ffffff"}
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
    var h, m, d, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, a = !!e.container, o = !!e.parentId, r = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.w : e.w, l = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.h : e.h, p = r / 2, g = l / 2, I = o && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return te`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerdown=${(f) => this.onNodePointerDown(f, e)}
         @dblclick=${(f) => {
      f.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? te`<rect x=${-p - 4} y=${-g - 4} width=${r + 8} height=${l + 8}
                  rx=${o ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${r} height=${l} rx=${o ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
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
        ${e.symbol && bt[e.symbol] && !o ? te`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${bt[e.symbol]}
              </g>` : ""}
        ${o && e.symbol && bt[e.symbol] ? te`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${bt[e.symbol]}
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
              </foreignObject>` : o ? te`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${I}</text>` : a ? te`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : te`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? te`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (o ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([f, b]) => te`
                <circle data-handle cx=${f} cy=${b} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(C) => this.onHandlePointerDown(C, e)}>
                  <title>${o ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (f, b) => te`
                <g transform="translate(${-p + 24 + b * 20}, ${-g})">
                  <circle data-handle r="7" fill=${f.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(C) => this.onHandlePointerDown(C, e, f.kind)}>
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
                      @pointerdown=${(C) => this.onResizePointerDown(C, e, f, b)}>
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
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (o) => {
      if ((o.buttons & 1) === 0) {
        s();
        return;
      }
      const r = this.toScene(o);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, a = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a: o, b: r } = this._rubber, l = Math.min(o.x, r.x), p = Math.max(o.x, r.x), g = Math.min(o.y, r.y), I = Math.max(o.y, r.y), h = this.scene.nodes.filter((m) => {
          const d = this.nodePos(m);
          return d.x >= l && d.x <= p && d.y >= g && d.y <= I;
        }).map((m) => m.id);
        this.emit("nodes-boxed", { ids: h });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", s);
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
    const i = Math.min(...t.map((o) => o.x - o.w / 2)) - e, s = Math.max(...t.map((o) => o.x + o.w / 2)) + e, n = Math.min(...t.map((o) => o.y - o.h / 2)) - e, a = Math.max(...t.map((o) => o.y + o.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: a - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, a = Vt.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Re(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, a = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, r = n.width / this._t.k, l = n.height / this._t.k;
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
      var g, I;
      (I = (g = p.currentTarget).hasPointerCapture) != null && I.call(g, p.pointerId) && this.onMinimapPointer(p, e, s);
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
            y=${(o - e.minY) * s}
            width=${r * s}
            height=${l * s}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((n) => n.color ?? "#64748b"))], t = [], i = [], s = [];
    return this.scene.edges.forEach((n) => {
      const a = this.edgePolyline(n);
      if (a) {
        i.push(this.renderEdgeHit(n, a)), s.push(this.renderEdgeInk(n, a, [...t]));
        for (let o = 0; o < a.length - 1; o++) t.push([a[o], a[o + 1]]);
      }
    }), E`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(n) => {
      const a = n.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || n.button !== 0 || (n.buttons & 1) !== 0 && this.startRubberBand(n);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (n) => te`
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
          ${this._menuSlots ? te`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, a) => te`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${a === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${a === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${a === this._menuSlots.active ? te`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
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
fe.styles = mt`
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
  ae({ attribute: !1 })
], fe.prototype, "scene", 2);
ve([
  ae({ attribute: !1 })
], fe.prototype, "selectedId", 2);
ve([
  ae({ attribute: !1 })
], fe.prototype, "selectedIds", 2);
ve([
  ae({ type: Boolean })
], fe.prototype, "connectable", 2);
ve([
  ae({ attribute: !1 })
], fe.prototype, "edgePoints", 2);
ve([
  q()
], fe.prototype, "_t", 2);
ve([
  q()
], fe.prototype, "_dragPos", 2);
ve([
  q()
], fe.prototype, "_menuSlots", 2);
ve([
  q()
], fe.prototype, "_dragGroup", 2);
ve([
  q()
], fe.prototype, "_pendingLink", 2);
ve([
  q()
], fe.prototype, "_hoverNodeId", 2);
ve([
  q()
], fe.prototype, "_editingId", 2);
ve([
  q()
], fe.prototype, "_spaceDown", 2);
ve([
  q()
], fe.prototype, "_wpDrag", 2);
ve([
  q()
], fe.prototype, "_selectedWaypoint", 2);
ve([
  q()
], fe.prototype, "_resize", 2);
ve([
  q()
], fe.prototype, "_rubber", 2);
ve([
  ae({ attribute: !1 })
], fe.prototype, "fitInsets", 2);
fe = ve([
  ht("modux-canvas")
], fe);
const Z = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Se(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function pe(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const vt = (e) => e.trim().toLowerCase();
function Ql(e, t) {
  var R, L, U, F, B;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((y) => [y.id, y.name])), n = e.modules.flatMap(
    (y) => (y.useCases ?? []).map((S) => ({ ...S, moduleId: y.id }))
  ), a = new Set(n.map((y) => y.id)), o = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((y) => (y.domainServices ?? []).map((S) => S.id))
  ), l = e.modules.flatMap(
    (y) => (y.domainEvents ?? []).map((S) => ({ ...S, moduleId: y.id, application: !1 }))
  ), p = e.modules.flatMap(
    (y) => (y.applicationEvents ?? []).map((S) => ({ ...S, moduleId: y.id, application: !0 }))
  ), g = e.modules.flatMap(
    (y) => (y.readModels ?? []).map((S) => ({ ...S, moduleId: y.id }))
  );
  for (const y of n)
    Se(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: Z.command.w,
      h: Z.command.h,
      kind: "use-case",
      symbol: y.policy ? "flow" : "gear",
      fill: y.policy ? Z.policy.fill : Z.command.fill,
      stroke: y.policy ? Z.policy.stroke : Z.command.stroke,
      badge: y.policy ? "POLICY" : "COMANDO",
      tooltip: y.policy ? `${y.name} — policy de ${s.get(y.moduleId) ?? y.moduleId} (reacción, no caso de negocio)` : `${y.name} — caso de uso de ${s.get(y.moduleId) ?? y.moduleId}`
    });
  for (const y of n)
    (y.steps ?? []).forEach((S, v) => {
      Se(i, {
        id: S.id,
        label: `${v + 1}. ${S.name || S.type || "paso"}`,
        x: 0,
        y: 0,
        w: Z.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!S.customCodeId,
        tooltip: `Paso de ${y.name}${S.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), pe(i, {
        id: `esstep:${v === 0 ? y.id : (y.steps ?? [])[v - 1].id}->${S.id}`,
        sourceId: v === 0 ? y.id : (y.steps ?? [])[v - 1].id,
        targetId: S.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${y.name}`
      });
    });
  for (const y of e.customCodes ?? [])
    Se(i, {
      id: y.id,
      label: y.name,
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
      tooltip: `${y.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const y of n)
    for (const S of y.steps ?? [])
      S.customCodeId && pe(i, {
        id: `escc:${S.id}`,
        sourceId: S.id,
        targetId: S.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: "El paso delega en código a mano — Supr lo desconecta"
      });
  for (const y of o)
    Se(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: Z.aggregate.w,
      h: Z.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Z.aggregate.fill,
      stroke: Z.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${y.name} — agregado de ${s.get(y.moduleId) ?? y.moduleId}`
    });
  const I = /* @__PURE__ */ new Map();
  for (const y of [...l, ...p])
    Se(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: Z.event.w,
      h: Z.event.h,
      kind: y.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: Z.event.fill,
      stroke: Z.event.stroke,
      badge: y.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${y.name} — evento de ${s.get(y.moduleId) ?? y.moduleId}`
    }), I.set(vt(y.name), y.id);
  const h = (y) => {
    if (!y || !y.trim()) return null;
    const S = I.get(vt(y));
    if (S) return S;
    const v = `evname:${vt(y)}`;
    return Se(i, {
      id: v,
      label: y,
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
      tooltip: `${y} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, m = (y) => {
    const S = g.find((k) => k.id === y.id) ?? g.find((k) => y.name && vt(k.name) === vt(y.name)), v = (S == null ? void 0 : S.id) ?? (y.id || (y.name ? `rm:${vt(y.name)}` : null));
    return v ? (Se(i, {
      id: v,
      label: (S == null ? void 0 : S.name) ?? y.name ?? v,
      x: 0,
      y: 0,
      w: Z.readModel.w,
      h: Z.readModel.h,
      kind: S ? "read-model" : "derived-read-model",
      fill: Z.readModel.fill,
      stroke: Z.readModel.stroke,
      dashed: !S,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const y of e.actorUses ?? []) {
    if (!a.has(y.targetId)) continue;
    const S = (e.actors ?? []).find((v) => v.id === y.actorId);
    S && (Se(i, {
      id: S.id,
      label: S.name,
      x: 0,
      y: 0,
      w: Z.actor.w,
      h: Z.actor.h,
      kind: "actor",
      symbol: "person",
      fill: Z.actor.fill,
      stroke: Z.actor.stroke,
      badge: "ACTOR"
    }), pe(i, {
      id: `es-actor:${S.id}->${y.targetId}`,
      sourceId: S.id,
      targetId: y.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const y of e.aiAgents ?? []) {
    const S = (e.agentUses ?? []).filter((A) => A.agentId === y.id), v = (e.agentExternalUses ?? []).filter((A) => A.agentId === y.id), k = (e.agentRags ?? []).filter((A) => A.agentId === y.id), _ = (e.agentMcpUses ?? []).filter((A) => A.agentId === y.id), $ = (e.agentGatewayUses ?? []).some((A) => A.agentId === y.id) || (e.agentApiOpUses ?? []).some((A) => A.agentId === y.id) || (e.agentQueryUses ?? []).some((A) => A.agentId === y.id) || (e.agentDelegations ?? []).some((A) => A.agentId === y.id) || (e.agentTriggers ?? []).some((A) => A.agentId === y.id);
    if (!(!S.length && !v.length && !k.length && !_.length && !$)) {
      Se(i, {
        id: y.id,
        label: y.name,
        x: 0,
        y: 0,
        w: Z.actor.w,
        h: Z.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${y.name} — agente de IA (consume por MCP)`
      });
      for (const A of S)
        a.has(A.useCaseId) && pe(i, {
          id: `es-agent:${y.id}->${A.useCaseId}`,
          sourceId: y.id,
          targetId: A.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const A of v) {
        const M = e.externalSystems.find(
          (V) => (V.useCases ?? []).some((K) => K.id === A.externalUseCaseId)
        );
        if (!M) continue;
        const D = (R = (M.useCases ?? []).find((V) => V.id === A.externalUseCaseId)) == null ? void 0 : R.name;
        Se(i, {
          id: M.id,
          label: M.name,
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
        }), pe(i, {
          id: `es-agentx:${y.id}->${A.externalUseCaseId}`,
          sourceId: y.id,
          targetId: M.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const A of _) {
        const M = e.externalSystems.find(
          (V) => (V.mcpServers ?? []).some((K) => K.id === A.mcpServerId)
        );
        if (!M) continue;
        const D = (L = (M.mcpServers ?? []).find((V) => V.id === A.mcpServerId)) == null ? void 0 : L.name;
        Se(i, {
          id: M.id,
          label: M.name,
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
        }), pe(i, {
          id: `es-agentmcp:${y.id}->${A.mcpServerId}`,
          sourceId: y.id,
          targetId: M.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const A of k) {
        const M = (e.rags ?? []).find((D) => D.id === A.ragId);
        if (M) {
          Se(i, {
            id: M.id,
            label: M.name,
            x: 0,
            y: 0,
            w: Z.readModel.w,
            h: Z.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${M.name} — base de conocimiento (retrieval)`
          }), pe(i, {
            id: `es-agrag:${y.id}->${M.id}`,
            sourceId: y.id,
            targetId: M.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const D of M.sourceReadModelIds ?? []) {
            const V = m({ id: D });
            V && pe(i, {
              id: `es-ragsrc:${M.id}->${V}`,
              sourceId: V,
              targetId: M.id,
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
  const d = (y) => {
    const S = e.externalSystems.find((v) => v.id === y);
    return S ? (Se(i, {
      id: S.id,
      label: S.name,
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
    }), S.id) : null;
  };
  for (const y of e.externalCalls ?? []) {
    const S = d(y.externalSystemId);
    !S || !a.has(y.useCaseId) || pe(i, {
      id: `es-extin:${S}->${y.useCaseId}`,
      sourceId: S,
      targetId: y.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const y of e.externalUseCaseCalls ?? []) {
    if (!a.has(y.sourceId)) continue;
    const S = e.externalSystems.find(
      (_) => (_.useCases ?? []).some(($) => $.id === y.targetId)
    ), v = S ? d(S.id) : null;
    if (!v) continue;
    const k = (U = ((S == null ? void 0 : S.useCases) ?? []).find((_) => _.id === y.targetId)) == null ? void 0 : U.name;
    pe(i, {
      id: `es-extout:${y.sourceId}->${y.targetId}`,
      sourceId: y.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
    });
  }
  for (const y of e.aggregateCalls ?? [])
    !a.has(y.sourceId) || !i.nodes.has(y.targetId) || pe(i, {
      id: `es-write:${y.sourceId}->${y.targetId}`,
      sourceId: y.sourceId,
      targetId: y.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const u = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const y of u)
    !i.nodes.has(y.domainEventId) || !(i.nodes.has(y.sourceId) && (a.has(y.sourceId) || o.some((v) => v.id === y.sourceId) || r.has(y.sourceId))) || pe(i, {
      id: `es-emit:${y.sourceId}->${y.domainEventId}`,
      sourceId: y.sourceId,
      targetId: y.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const f = (y, S, v, k, _, $) => (Se(i, {
    id: y,
    label: S,
    x: 0,
    y: 0,
    w: Z.policy.w,
    h: Z.policy.h,
    kind: v,
    symbol: "flow",
    fill: Z.policy.fill,
    stroke: Z.policy.stroke,
    badge: k,
    tooltip: _
  }), y), b = (y, S) => {
    const v = h(y);
    v && pe(i, {
      id: `es-trigger:${v}->${S}`,
      sourceId: v,
      targetId: S,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, C = (y, S) => {
    !S || !a.has(S) || pe(i, {
      id: `es-invoke:${y}->${S}`,
      sourceId: y,
      targetId: S,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const y of e.subscriptions ?? []) {
    const S = f(
      y.id,
      y.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${y.name}${y.eventName ? ` — reacciona a ${y.eventName}` : ""}${y.consumerGroup ? ` · grupo ${y.consumerGroup}` : ""}`
    );
    b(y.eventName, S);
    for (const v of y.actions ?? []) {
      if (v.type === "CallUseCase" && C(S, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const k = `saga:${v.sagaId}`;
        f(k, v.sagaId, "saga", "SAGA"), pe(i, {
          id: `es-saga:${S}->${k}`,
          sourceId: S,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const k = (e.projections ?? []).find((_) => _.id === v.projectionId);
        k && pe(i, {
          id: `es-feeds:${S}->${k.id}`,
          sourceId: S,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const y of e.projections ?? []) {
    const S = f(
      y.id,
      y.name,
      "projection",
      "PROYECCIÓN",
      `${y.name}${y.readModelName ? ` — materializa ${y.readModelName}` : ""}`
    );
    for (const _ of y.handledEventIds) {
      const $ = i.nodes.has(_) ? _ : null;
      $ && pe(i, {
        id: `es-trigger:${$}->${S}`,
        sourceId: $,
        targetId: S,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    y.sourceAggregateId && i.nodes.has(y.sourceAggregateId) && pe(i, {
      id: `es-state:${y.id}`,
      sourceId: y.sourceAggregateId,
      targetId: S,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = y.sourceExternalUseCaseId ?? y.sourceExternalTableId;
    if (v) {
      const _ = e.externalSystems.find(
        (A) => (A.useCases ?? []).some((M) => M.id === v) || (A.tables ?? []).some((M) => M.id === v)
      ), $ = _ ? d(_.id) : null;
      if ($) {
        const A = ((F = (_.useCases ?? []).find((M) => M.id === v)) == null ? void 0 : F.name) ?? ((B = (_.tables ?? []).find((M) => M.id === v)) == null ? void 0 : B.name);
        pe(i, {
          id: `es-poll:${y.id}`,
          sourceId: $,
          targetId: S,
          kind: "es-projects-poll",
          label: A,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: A ? `polling de ${A}` : "polling"
        });
      }
    }
    const k = m({ id: y.readModelId, name: y.readModelName });
    k && pe(i, {
      id: `es-projects:${S}->${k}`,
      sourceId: S,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const y of e.flows) {
    if (y.archetype === "MATERIALIZES") {
      const v = h(y.triggerEvent), k = m({ name: y.readModelName ?? `${y.triggerEvent}View` });
      v && k && pe(i, {
        id: `es-mat:${y.id}`,
        sourceId: v,
        targetId: k,
        kind: "es-materializes",
        label: y.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${y.name} [MATERIALIZES]`
      });
      continue;
    }
    const S = f(
      `flow:${y.id}`,
      y.name,
      "flow",
      `POLICY · ${y.archetype}`,
      `Flow ${y.name} [${y.archetype}]`
    );
    if (b(y.triggerEvent, S), C(S, y.targetUseCaseId), !y.targetUseCaseId) {
      const v = d(y.targetId), k = v ?? `tgt:${y.targetId}`;
      !v && s.has(y.targetId) && Se(i, {
        id: k,
        label: s.get(y.targetId) ?? y.targetId,
        x: 0,
        y: 0,
        w: Z.module.w,
        h: Z.module.h,
        kind: "module",
        symbol: "component",
        fill: Z.module.fill,
        stroke: Z.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(k) && pe(i, {
        id: `es-deliver:${y.id}`,
        sourceId: S,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const y of e.processes ?? []) {
    const S = f(
      y.id,
      y.name,
      "process",
      `PROCESO${y.sla ? ` · SLA ${y.sla}` : ""}`,
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    b(y.triggerEvent, S);
    for (const k of y.steps) C(S, k.useCaseId);
    const v = h(y.onCompletionEventName);
    v && pe(i, {
      id: `es-done:${y.id}`,
      sourceId: S,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const y of e.workflows ?? []) {
    const S = f(
      y.id,
      y.name,
      "workflow",
      "WORKFLOW",
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    b(y.triggerEvent, S);
    for (const k of y.steps ?? []) {
      C(S, k.targetUseCaseId);
      for (const _ of [k.emittedEventName, k.completionEventName]) {
        const $ = h(_);
        $ && pe(i, {
          id: `es-wfemit:${y.id}:${$}`,
          sourceId: S,
          targetId: $,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = h(y.onCompletionEventName);
    v && pe(i, {
      id: `es-done:${y.id}`,
      sourceId: S,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const N = [...i.nodes.values()], W = /* @__PURE__ */ new Map();
  for (const y of i.edges)
    W.has(y.targetId) || W.set(y.targetId, []), W.get(y.targetId).push(y.sourceId);
  const P = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set(), w = (y) => {
    const S = P.get(y);
    if (S !== void 0) return S;
    if (x.has(y)) return 0;
    x.add(y);
    const v = W.get(y) ?? [], k = v.length ? 1 + Math.max(...v.map(w)) : 0;
    return x.delete(y), P.set(y, k), k;
  }, T = /* @__PURE__ */ new Map();
  for (const y of N) {
    const S = t[y.id];
    if (S) {
      y.x = S.x, y.y = S.y;
      continue;
    }
    const v = w(y.id), k = T.get(v) ?? 0;
    T.set(v, k + 1), y.x = 140 + v * 260, y.y = 110 + k * 110;
  }
  return { nodes: N, edges: i.edges };
}
const Zl = 190, Jl = 56, nn = 180, ec = 56, tc = 150, ic = 44, on = 250, an = 100;
function sc(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const a = (n.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), o = a.length ? 1 + Math.max(...a.map(s)) : 0;
    return i.delete(n.id), o;
  };
  return s(e);
}
function nc(e, t) {
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
  const i = [], s = [], n = /* @__PURE__ */ new Set(), a = (r) => {
    var l;
    return (l = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === r)) == null ? void 0 : l.name;
  };
  let o = 140;
  return (e.workflows ?? []).forEach((r) => {
    var f;
    const l = new Map(r.steps.map((b) => [b.id, b])), p = new Map(r.steps.map((b) => [b.id, sc(b, l)])), g = /* @__PURE__ */ new Map();
    for (const b of r.steps) {
      const C = p.get(b.id) ?? 0;
      g.set(C, (g.get(C) ?? 0) + 1);
    }
    const I = Math.max(1, ...g.values()), h = nc(e, r);
    if (h && !n.has(h.id)) {
      n.add(h.id);
      const b = t[h.id] ?? { x: 140, y: o };
      i.push({
        id: h.id,
        label: h.label,
        x: b.x,
        y: b.y,
        w: tc,
        h: ic,
        kind: h.kind,
        symbol: h.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: h.kind === "aggregate" ? "AGGREGATE" : h.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const m = t[r.id] ?? { x: 420, y: o };
    i.push({
      id: r.id,
      label: r.name,
      x: m.x,
      y: m.y,
      w: Zl,
      h: Jl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), h && s.push({
      id: `wft:${r.id}`,
      sourceId: h.id,
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
      const C = p.get(b.id) ?? 0;
      u = Math.max(u, C);
      const N = d.get(C) ?? 0;
      d.set(C, N + 1);
      const W = t[b.id] ?? {
        x: m.x + (C + 1) * on,
        y: o + (N - (g.get(C) - 1) / 2) * an
      }, P = a(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: W.x,
        y: W.y,
        w: nn,
        h: ec,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: P ? `→ ${P}` : "∅ sin use case",
        tooltip: `${b.name}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${P ? ` · lanza ${P}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}`
      });
      const x = (b.dependsOnStepIds ?? []).filter((w) => l.has(w));
      x.length === 0 && s.push({
        id: `wfs:${r.id}:${b.id}`,
        sourceId: r.id,
        targetId: b.id,
        kind: "workflow-start",
        label: b.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const w of x)
        s.push({
          id: `wfdep:${w}->${b.id}`,
          sourceId: w,
          targetId: b.id,
          kind: "workflow-dependency",
          label: b.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${b.name} espera a ${((f = l.get(w)) == null ? void 0 : f.name) ?? w}`
        });
    }
    if (r.onCompletionEventName) {
      const b = `done:${r.id}`, C = t[b] ?? { x: m.x + (u + 2) * on, y: o };
      i.push({
        id: b,
        label: r.onCompletionEventName,
        x: C.x,
        y: C.y,
        w: nn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const N = new Set(r.steps.flatMap((P) => P.dependsOnStepIds ?? [])), W = r.steps.filter((P) => !N.has(P.id));
      for (const P of W.length ? W : [])
        s.push({
          id: `wfd:${r.id}:${P.id}`,
          sourceId: P.id,
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
    o += Math.max(2, I + 1) * an + 60;
  }), { nodes: i, edges: s };
}
const rn = 250, Xe = 30, ci = 6, ac = 16, dn = 190, rc = 60, dc = 170, pi = 44;
function lc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function we(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function cc(e) {
  const t = [], i = (s, n, a) => {
    for (const o of s ?? []) {
      const r = [...n, o.label];
      t.push({ entry: o, path: r, depth: a }), i(o.children ?? [], r, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function pc(e, t) {
  var C, N, W, P;
  const i = [], s = [], n = e.uiApps ?? [], a = e.pages ?? [], o = (x) => {
    var w;
    return ((w = e.modules.flatMap((T) => T.useCases ?? []).find((T) => T.id === x)) == null ? void 0 : w.name) ?? x;
  }, r = (x) => {
    var w;
    return ((w = e.modules.flatMap((T) => T.queryServices ?? []).find((T) => T.id === x)) == null ? void 0 : w.name) ?? x;
  }, l = /* @__PURE__ */ new Map();
  let p = 160;
  for (const x of n) {
    const w = cc(x), T = Math.max(
      90,
      54 + w.length * (Xe + ci)
    ), R = t[x.id] ?? { x: 190, y: p + T / 2 };
    p = R.y + T / 2 + 70;
    const L = x.type ?? "APP";
    i.push({
      id: x.id,
      label: x.title || x.name,
      x: R.x,
      y: R.y,
      w: rn,
      h: T,
      kind: "ui-app",
      symbol: L === "ORCHESTRATOR" || L === "VIEW_EDITOR" ? "process" : "component",
      fill: L === "ORCHESTRATOR" || L === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: L === "ORCHESTRATOR" || L === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: L === "ORCHESTRATOR" ? "ORQUESTADOR" : L === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : L === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: L === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : L === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : L === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: L === "ORCHESTRATOR" ? `${x.name} — orquesta y mantiene estado; solo enseña páginas hijas` : L === "MASTER_DETAIL" ? `${x.name} — cabecera + pestañas (ambas son páginas)` : `App: ${x.name}`
    }), x.modelId && (l.set(x.modelId, {
      label: ((C = (e.models ?? []).find((B) => B.id === x.modelId)) == null ? void 0 : C.name) ?? x.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${x.id}->${x.modelId}`,
      sourceId: x.id,
      targetId: x.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [B, y, S, v, k] of [
      [x.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [x.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      B && s.push({
        id: `${y === "app-view" ? "appview" : "appedit"}:${x.id}->${B}`,
        sourceId: x.id,
        targetId: B,
        kind: y,
        color: v,
        label: S,
        arrow: !0,
        tooltip: k
      });
    const U = x.homePageId ?? x.homeAppId;
    U && s.push({
      id: `apphome:${x.id}->${U}`,
      sourceId: x.id,
      targetId: U,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: x.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), L === "MASTER_DETAIL" && x.headerPageId && s.push({
      id: `appheader:${x.id}->${x.headerPageId}`,
      sourceId: x.id,
      targetId: x.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let F = R.y - T / 2 + 34 + 10 + Xe / 2;
    for (const { entry: B, path: y, depth: S } of w) {
      const v = lc(x.id, B, y), k = S * ac;
      if (i.push({
        id: v,
        label: B.label,
        x: R.x + k / 2,
        y: F,
        w: rn - 20 - k,
        h: Xe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (N = B.children) != null && N.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (W = B.children) != null && W.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: x.id,
        tooltip: (P = B.children) != null && P.length ? "Agrupador (con submenú): no puede abrir nada" : B.pageId ? `Abre ${B.pageId}` : B.uiAdapterId ? `Abre la app ${B.uiAdapterId}` : B.useCaseId ? `Lanza ${B.useCaseId}` : B.aggregateId ? `CRUD inferido sobre ${B.aggregateId}` : B.queryOperationId ? `Listado con filtros de ${B.queryOperationId}` : "Entrada de menú sin destino"
      }), F += Xe + ci, B.uiAdapterId && n.some((_) => _.id === B.uiAdapterId) && s.push({
        id: `menuapp:${v}->${B.uiAdapterId}`,
        sourceId: v,
        targetId: B.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), B.useCaseId && e.modules.some(($) => ($.useCases ?? []).some((A) => A.id === B.useCaseId)) && (l.set(B.useCaseId, {
        label: o(B.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${v}->${B.useCaseId}`,
        sourceId: v,
        targetId: B.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), B.aggregateId && (e.aggregates ?? []).some((_) => _.id === B.aggregateId)) {
        const _ = (e.aggregates ?? []).find(($) => $.id === B.aggregateId);
        l.set(_.id, { label: _.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${v}->${_.id}`,
          sourceId: v,
          targetId: _.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (B.queryOperationId) {
        const _ = e.modules.flatMap((A) => A.queryServices ?? []).find((A) => A.id === B.queryServiceId), $ = ((_ == null ? void 0 : _.operations) ?? []).find((A) => A.id === B.queryOperationId);
        _ && $ && (l.set($.id, {
          label: `${$.name} (${_.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${v}->${$.id}`,
          sourceId: v,
          targetId: $.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      B.pageId && a.some((_) => _.id === B.pageId) && s.push({
        id: `menupage:${v}->${B.pageId}`,
        sourceId: v,
        targetId: B.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const I = (x) => {
    var w;
    return ((w = a.find((T) => T.id === x)) == null ? void 0 : w.name) ?? x;
  };
  for (const x of a) {
    const w = t[x.id] ?? { x: 640, y: g }, T = x.type === "WIZARD" ? x.wizardSteps ?? [] : [], R = T.length ? 54 + T.length * (Xe + ci) : rc;
    g = w.y + R + 90, i.push({
      id: x.id,
      label: x.name,
      x: w.x,
      y: w.y,
      w: dn,
      h: R,
      kind: "page",
      symbol: "interface",
      badge: x.customCodeId ? "CODE" : x.type ?? "PAGE",
      container: T.length > 0,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...x.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: x.route ? `${x.type ?? "PAGE"} · ${x.route}` : x.type ?? "PAGE"
    });
    let L = w.y - R / 2 + 34 + 10 + Xe / 2;
    T.forEach((U, F) => {
      const B = U.id ?? U.pageId ?? String(F);
      i.push({
        id: `wizrow:${x.id}:${B}`,
        label: `${F + 1}. ${U.label ?? (U.pageId ? I(U.pageId) : "Paso")}${U.pageId ? "" : " ⌁"}`,
        x: w.x,
        y: L,
        w: dn - 20,
        h: Xe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: U.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: x.id,
        tooltip: U.pageId ? `Paso ${F + 1}: ${I(U.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${F + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), L += Xe + ci;
    });
    for (const [U, F, B, y] of [
      [x.crudDetailPageId ?? x.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [x.crudCreatePageId ?? x.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      U && s.push({
        id: `${F === "crud-detail" ? "cruddetail" : "crudnew"}:${x.id}->${U}`,
        sourceId: x.id,
        targetId: U,
        kind: F,
        color: y,
        label: B,
        dashed: !0,
        arrow: !0,
        tooltip: F === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let U = 0; U < (x.wizardSteps ?? []).length; U++) {
      const F = (x.wizardSteps ?? [])[U];
      if (!F.pageId) continue;
      const B = F.id ?? F.pageId;
      s.push({
        id: `wizstep:${x.id}:${B}`,
        sourceId: `wizrow:${x.id}:${B}`,
        targetId: F.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${U + 1} — Supr desmapea`
      });
    }
    x.modelId && (l.set(x.modelId, {
      label: x.modelName ?? x.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${x.id}->${x.modelId}`,
      sourceId: x.id,
      targetId: x.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const U of x.buttons ?? [])
      U.useCaseId && (l.set(U.useCaseId, {
        label: o(U.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${x.id}->${U.useCaseId}`,
        sourceId: x.id,
        targetId: U.useCaseId,
        kind: "page-button",
        label: U.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: U.mappingId ? `Botón «${U.label}» — mapping ${U.mappingId}` : `Botón «${U.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    x.listingQueryServiceId && (l.set(x.listingQueryServiceId, {
      label: r(x.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${x.id}->${x.listingQueryServiceId}`,
      sourceId: x.id,
      targetId: x.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  let h = 160;
  for (const x of e.models ?? [])
    l.has(x.id) || l.set(x.id, { label: x.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [x, w] of l) {
    const T = t[x] ?? { x: 1050, y: h };
    h = T.y + pi + 46, i.push({
      id: x,
      label: w.label,
      x: T.x,
      y: T.y,
      w: dc,
      h: pi,
      kind: w.kind,
      symbol: w.symbol,
      fill: "#ffffff",
      stroke: w.stroke
    });
  }
  let m = 120;
  for (const x of e.identityProviders ?? []) {
    const w = t[x.id] ?? { x: -320, y: m };
    m = w.y + 70 + 40, i.push({
      id: x.id,
      label: x.name,
      x: w.x,
      y: w.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: x.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!x.publishedByExternalSystemId,
      badge: x.type ?? "IDP",
      tooltip: `${x.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const x of n)
    x.identityProviderId && (e.identityProviders ?? []).some((w) => w.id === x.identityProviderId) && s.push({
      id: `idpauth:${x.id}`,
      sourceId: x.id,
      targetId: x.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const d = (e.actorAppUses ?? []).filter(
    (x) => n.some((w) => w.id === x.appId) && (e.actors ?? []).some((w) => w.id === x.actorId)
  ), u = [...new Set(d.map((x) => x.actorId))];
  let f = 160;
  for (const x of u) {
    const w = (e.actors ?? []).find((R) => R.id === x), T = t[x] ?? { x: -60, y: f };
    f = T.y + pi + 46, i.push({
      id: x,
      label: w.name,
      x: T.x,
      y: T.y,
      w: 150,
      h: pi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const x of d)
    s.push({
      id: `actorapp:${x.actorId}->${x.appId}`,
      sourceId: x.actorId,
      targetId: x.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((x, w) => {
    const T = t[x.id] ?? { x: 1200, y: 120 + w * 90 };
    i.push({
      id: x.id,
      label: x.name,
      x: T.x,
      y: T.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${x.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const b = new Set(i.map((x) => x.id));
  for (const x of a)
    x.customCodeId && b.has(x.customCodeId) && s.push({
      id: `ccpage:${x.id}`,
      sourceId: x.customCodeId,
      targetId: x.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${x.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const x of e.customCodes ?? [])
    for (const w of x.usedElementIds ?? [])
      b.has(w) && s.push({
        id: `ccuse:${x.id}->${w}`,
        sourceId: x.id,
        targetId: w,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${x.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: i, edges: s };
}
const ln = 188, cn = 34, pn = 10, ui = 24, un = 6;
function mi(e, t) {
  return `fld:${e}:${t}`;
}
function Xi(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function uc(e, t) {
  const i = [], s = [], n = e.models ?? [], a = e.modelMappings ?? [], o = (h) => {
    var m;
    return ((m = n.find((d) => d.id === h)) == null ? void 0 : m.name) ?? h ?? "?";
  };
  n.forEach((h, m) => {
    const d = t[h.id] ?? { x: 200 + m % 5 * 260, y: 160 + Math.floor(m / 5) * 220 }, u = h.fields ?? [], f = cn + (u.length ? u.length * ui + (u.length - 1) * un : 10) + pn;
    i.push({
      id: h.id,
      label: h.name,
      x: d.x,
      y: d.y,
      w: ln,
      h: f,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${h.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), u.forEach((b, C) => {
      i.push({
        id: mi(h.id, b.id),
        label: b.name,
        x: d.x,
        y: d.y - f / 2 + cn + C * (ui + un) + ui / 2,
        w: ln - 2 * pn,
        h: ui,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: b.type ?? void 0,
        parentId: h.id,
        tooltip: `${b.name}${b.type ? ` (${b.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((h, m) => {
    const d = t[h.id] ?? { x: 200 + m % 5 * 260, y: 60 };
    i.push({
      id: h.id,
      label: h.name,
      x: d.x,
      y: d.y,
      w: 150,
      h: 44,
      kind: "transformation",
      symbol: "gear",
      fill: "#fff7ed",
      stroke: "#ea580c",
      badge: "TRANSFORM",
      dashed: !h.output,
      tooltip: `${h.name} — transformación: arrastra modelos o campos hasta ella (entradas) y su asa hasta un modelo o campo (salida)${h.output ? "" : " · aún sin salida"}`
    });
  }), (e.customCodes ?? []).forEach((h, m) => {
    const d = t[h.id] ?? { x: 120 + m % 5 * 220, y: 60 };
    i.push({
      id: h.id,
      label: h.name,
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
      tooltip: `${h.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`
    });
  });
  const r = new Set(i.map((h) => h.id)), l = (h) => h.fieldId ? mi(h.modelId, h.fieldId) : h.modelId;
  for (const h of e.transformations ?? [])
    h.customCodeId && r.has(h.customCodeId) && r.has(h.id) && s.push({
      id: `cctf:${h.id}`,
      sourceId: h.customCodeId,
      targetId: h.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${h.name} delega en código a mano — Supr lo desconecta`
    });
  for (const h of a)
    h.customCodeId && r.has(h.customCodeId) && h.targetModelId && r.has(h.targetModelId) && s.push({
      id: `ccmap:${h.id}`,
      sourceId: h.customCodeId,
      targetId: h.targetModelId,
      kind: "custom-of-mapping",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      label: h.name,
      tooltip: `El mapeado ${h.name} delega en código a mano — Supr lo desconecta`
    });
  for (const h of e.transformations ?? []) {
    for (const m of h.inputs ?? []) {
      const d = l(m);
      r.has(d) && s.push({
        id: `tfin:${h.id}:${m.modelId}:${m.fieldId ?? ""}`,
        sourceId: d,
        targetId: h.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${h.name} — Supr la desconecta`
      });
    }
    h.output && r.has(l(h.output)) && s.push({
      id: `tfout:${h.id}`,
      sourceId: h.id,
      targetId: l(h.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${h.name} — Supr la desconecta`
    });
  }
  for (const h of a)
    if (!(!h.sourceModelId || !h.targetModelId) && !(!r.has(h.sourceModelId) || !r.has(h.targetModelId))) {
      s.push({
        id: `mapping:${h.id}`,
        sourceId: h.sourceModelId,
        targetId: h.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: h.name,
        arrow: !0,
        tooltip: `${h.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const m of h.rules ?? []) {
        const d = mi(h.sourceModelId, m.sourceFieldId ?? ""), u = mi(h.targetModelId, m.targetFieldId ?? "");
        !r.has(d) || !r.has(u) || s.push({
          id: `maprule:${h.id}:${m.id}`,
          sourceId: d,
          targetId: u,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${h.name} — Supr la elimina`
        });
      }
    }
  const p = new Set(
    a.filter((h) => h.sourceModelId && h.targetModelId).map((h) => `${h.sourceModelId}->${h.targetModelId}`)
  ), g = new Map(
    e.modules.flatMap((h) => (h.useCases ?? []).map((m) => [m.id, m]))
  ), I = /* @__PURE__ */ new Set();
  for (const h of e.pages ?? [])
    if (h.modelId)
      for (const m of h.buttons ?? []) {
        if (!m.useCaseId || m.mappingId) continue;
        const d = g.get(m.useCaseId);
        if (!(d != null && d.inputModelId) || d.inputModelId === h.modelId) continue;
        const u = `${h.modelId}->${d.inputModelId}`;
        p.has(u) || I.has(u) || (I.add(u), !(!r.has(h.modelId) || !r.has(d.inputModelId)) && s.push({
          id: `mapgap:${h.id}:${m.useCaseId}`,
          sourceId: h.modelId,
          targetId: d.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${m.label}» (página ${h.name}) llama a ${d.name}: falta mapear ${o(h.modelId)} → ${o(d.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function mc(e, t) {
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
  }, o = await s.layout(a), r = {};
  for (const l of o.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var hc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, Ue = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? fc(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && hc(t, i, n), n;
};
const gc = /* @__PURE__ */ new Set([
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
let Te = class extends Le {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, o;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus(), (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      const t = e.composedPath()[0], i = (o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".h3");
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
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const o = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), r = (n = o == null ? void 0 : o.closest) == null ? void 0 : n.call(o, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
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
    var s, n, a;
    const i = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e, t);
    return ((a = (n = i == null ? void 0 : i.closest) == null ? void 0 : n.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), s = i.width * 0.5, n = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const o = new DOMMatrix().translate(s, n).multiply(a).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = o.transformPoint(new DOMPoint(0, 0, 0, 1)), l = o.transformPoint(new DOMPoint(1, 0, 0, 0)), p = o.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, I = t - i.top, h = l.x - g * l.w, m = p.x - g * p.w, d = l.y - I * l.w, u = p.y - I * p.w, f = g * r.w - r.x, b = I * r.w - r.y, C = h * u - m * d;
    return C ? { x: (f * u - m * b) / C, y: (h * b - f * d) / C } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((s) => [s.id, s])), t = /* @__PURE__ */ new Map(), i = (s) => {
      const n = t.get(s.id);
      if (n !== void 0) return n;
      const a = s.parentId ? e.get(s.parentId) : void 0, o = a ? i(a) + 1 : 0;
      return t.set(s.id, o), o;
    };
    for (const s of this.scene.nodes) i(s);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return E`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((f) => [f.id, f])), s = Math.min(...e.map((f) => f.x - f.w / 2)) - 60, n = Math.max(...e.map((f) => f.x + f.w / 2)) + 60, a = Math.min(...e.map((f) => f.y - f.h / 2)) - 60, o = Math.max(...e.map((f) => f.y + f.h / 2)) + 60, r = (s + n) / 2, l = (a + o) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (n - s), p.height / (o - a), 1) * 0.9 : 0.5, I = this._k * g;
    this._kUsed = I, this._center = { x: r, y: l };
    const h = 30, m = this._liveMove, d = (f) => f.x + ((m == null ? void 0 : m.id) === f.id ? m.dx : 0), u = (f) => f.y + ((m == null ? void 0 : m.id) === f.id ? m.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${I}, ${I}, ${I}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${a}px"
            width=${n - s}
            height=${o - a}
            viewBox="${s} ${a} ${n - s} ${o - a}"
          >
            ${this.scene.edges.map((f) => {
      const b = i.get(f.sourceId), C = i.get(f.targetId);
      return !b || !C ? "" : te`<line
                x1=${d(b)} y1=${u(b)} x2=${d(C)} y2=${u(C)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((f) => {
      const b = i.get(f.sourceId), C = i.get(f.targetId);
      if (!b || !C) return "";
      const N = (t.get(b.id) ?? 0) * h + 2, W = (t.get(C.id) ?? 0) * h + 2, P = d(C) - d(b), x = u(C) - u(b), w = W - N, T = Math.hypot(P, x), R = Math.hypot(T, w), L = Math.atan2(x, P) * 180 / Math.PI, U = Math.atan2(w, T) * 180 / Math.PI, F = f.color ?? "#64748b", B = f.dashed ? `repeating-linear-gradient(90deg, ${F} 0 6px, transparent 6px 10px)` : F;
      return E`<div
              class="edge3"
              style="
                left: ${d(b)}px; top: ${u(b)}px; width: ${R}px; height: 1.7px;
                transform: translateZ(${N}px) rotateZ(${L}deg) rotateY(${-U}deg);
                background: ${B};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((f) => {
      const b = t.get(f.id) ?? 0, C = f.container || b === 0, N = this._hoverTargetId === f.id;
      return E`
              <div
                class="n3 ${f.container ? "container3" : ""} ${this.selectedId === f.id ? "selected3" : ""} ${N ? "hover3" : ""}"
                data-node-id=${f.id}
                data-kind=${f.kind}
                title=${f.tooltip ?? f.label}
                style="
                  left: ${d(f) - f.w / 2}px; top: ${u(f) - f.h / 2}px;
                  width: ${f.w}px; height: ${f.h}px;
                  transform: translateZ(${b * h + (N ? 8 : 0)}px)${N ? " scale(1.06)" : ""};
                  background: ${f.container ? "color-mix(in srgb, " + (f.fill ?? "#ffffff") + " 82%, transparent)" : f.fill ?? "#ffffff"};
                  border-color: ${f.stroke ?? "#64748b"};
                  border-style: ${f.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${C ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${f.badge ? E`<span class="badge3" style="color: ${f.stroke ?? "#94a3b8"}">${f.badge}</span>` : ""}
                <span>${f.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const f = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!f || !gc.has(f.kind)) return "";
      const b = (t.get(f.id) ?? 0) * h + 4;
      return [
        [d(f) + f.w / 2, u(f)],
        [d(f) - f.w / 2, u(f)],
        [d(f), u(f) + f.h / 2],
        [d(f), u(f) - f.h / 2]
      ].map(
        ([N, W]) => E`<div
                class="h3"
                data-source-id=${f.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${N}px; top: ${W}px; transform: translateZ(${b}px)"
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
Te.styles = mt`
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
Ue([
  ae({ attribute: !1 })
], Te.prototype, "scene", 2);
Ue([
  ae({ attribute: !1 })
], Te.prototype, "selectedId", 2);
Ue([
  ae({ attribute: !1 })
], Te.prototype, "connectable", 2);
Ue([
  q()
], Te.prototype, "_rx", 2);
Ue([
  q()
], Te.prototype, "_rz", 2);
Ue([
  q()
], Te.prototype, "_k", 2);
Ue([
  q()
], Te.prototype, "_pan", 2);
Ue([
  q()
], Te.prototype, "_liveMove", 2);
Ue([
  q()
], Te.prototype, "_connect", 2);
Ue([
  q()
], Te.prototype, "_hoverTargetId", 2);
Te = Ue([
  ht("modux-tilt")
], Te);
var Ic = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, Ie = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? yc(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Ic(t, i, n), n;
};
const mn = [
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
let re = class extends Le {
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
      for (const a of n ?? [])
        a.id === e && (t = a), i(a.children);
    };
    return i((s = this.page) == null ? void 0 : s.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var s;
    let t = null;
    const i = (n, a) => {
      for (const o of n ?? [])
        o.id === e && (t = a), i(o.children, o);
    };
    return i((s = this.page) == null ? void 0 : s.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const s = (o) => {
      o.id === e && (i = !0);
      for (const r of o.children ?? []) s(r);
    }, n = (o) => {
      for (const r of o ?? [])
        r.id === t ? s(r) : n(r.children);
    };
    return n((a = this.page) == null ? void 0 : a.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var n;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((n = this.page) == null ? void 0 : n.content) ?? [], s = i.findIndex((a) => a.id === e);
    return s >= 0 ? i[s + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), s = (t.clientY - i.top) / Math.max(1, i.height);
    return re.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const o = (e.children ?? []).filter((l) => l.kind === "tab"), r = o.find((l) => l.id === this._activeTabs[e.id]) ?? o[0];
      r && (e = r);
    }
    if (t === "into" && !re.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var a, o;
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
      if (!l.componentId || !l.pageId || l.pageId === ((o = this.page) == null ? void 0 : o.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: l.pageId, componentId: l.componentId, ...p });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const n = this.slotFor(e, t);
    n.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...n });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var l, p, g;
    const t = e.children ?? [], i = (I) => I.map((h) => this.renderComponent(h)), s = E`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = E`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const I = t.slice(0, Math.ceil(t.length / 2)), h = t.slice(Math.ceil(t.length / 2));
        n = E`<div class="row-lay">
          <div class="col-lay">${I.length ? i(I) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${h.length ? i(h) : s}</div>
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
        const I = t.filter((m) => m.kind === "tab"), h = I.find((m) => m.id === this._activeTabs[e.id]) ?? I[0];
        n = E`
          <div class="tabbar">
            ${I.map(
          (m, d) => E`<span
                class=${m === h ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: m.id }, this.emitEvent("component-selected", { componentId: m.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...m };
          }}
                @dragstart=${(u) => {
            var f, b;
            u.stopPropagation(), this._dragCmpId = m.id, (b = u.dataTransfer) == null || b.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: m.id })
            );
          }}
                @dragover=${(u) => {
            var f;
            ((f = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : f.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var W, P;
            const f = this._dragCmpId;
            if (!f || f === m.id || ((W = this.nodeById(f)) == null ? void 0 : W.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const b = u.currentTarget.getBoundingClientRect(), N = u.clientX - b.left < b.width / 2 ? m.id : ((P = I[d + 1]) == null ? void 0 : P.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, N !== f && this.emitEvent("component-moved", {
              componentId: f,
              toParentId: e.id,
              beforeComponentId: N
            });
          }}
                >${m.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${h ? this.renderComponent(h) : s}`;
        break;
      }
      case "tab":
        n = E`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = E`<div class="col-lay">
          ${t.length ? t.map(
          (I, h) => E`
                  <div class="acc-bar"><span>${I.title ?? I.label ?? "Sección"}</span><span>${h === 0 ? "▾" : "▸"}</span></div>
                  ${h === 0 ? this.renderComponent(I) : ne}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : ne}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = E`<div class="grid3-lay">
          ${t.length ? t.map((I) => E`<div class="board-col">${this.renderComponent(I)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [I, ...h] = t;
        n = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${I ? this.renderComponent(I) : E`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${h.length ? i(h) : E`<div class="placeholder">detalle</div>`}</div>
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
        const h = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = h.length ? E`<div class="grid-lay">
              ${h.slice(0, 6).map(
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
        const I = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        n = E`<table>
            <tr>${I.length ? I.map((h) => E`<th>${h.label ?? h.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(I.length ? I : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? ne : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const I = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(I)}`;
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
    const a = re.LEAF_KINDS.has(e.kind), o = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (I) => {
      var h, m;
      I.stopPropagation(), this._dragCmpId = e.id, (m = I.dataTransfer) == null || m.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (h = this.page) == null ? void 0 : h.id, componentId: e.id })
      ), I.dataTransfer && (I.dataTransfer.effectAllowed = "move");
    };
    return E`<div
      class="cmp ${a ? "leafcmp" : ""} ${o ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(I) => {
      I.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(I) => {
      I.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${r}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(I) => {
      var m;
      I.preventDefault(), I.stopPropagation();
      const h = ((m = I.dataTransfer) == null ? void 0 : m.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...h].includes("application/x-modux-cmp") || [...h].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, I) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(I) => {
      var h, m, d;
      this._foreignOver = !1, !(!this._dragCmpId && !((d = (m = (h = I.dataTransfer) == null ? void 0 : h.types) == null ? void 0 : m.includes) != null && d.call(m, "application/x-modux-cmp"))) && (I.preventDefault(), I.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, I));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${r}
        >${re.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
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
            </table>` : ne}
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
    var n, a, o, r;
    const e = this._cmp;
    if (!e) return ne;
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
    return E`<div class="pop" @click=${(l) => l.stopPropagation()}>
      ${s ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(l) => t({ title: l.target.value })} />` : ne}
      ${i === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(l) => t({ text: l.target.value })} />` : ne}
      ${i === "button" || i === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(l) => t({ label: l.target.value })} />` : ne}
      ${i === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((n = this.useCases.find((l) => l.id === e.useCaseId)) == null ? void 0 : n.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : E`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? E`<span class="chip"
                      >${((a = this.mappings.find((l) => l.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : ne}
      ${i === "form" ? E`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? E`<span class="chip"
                      >${((o = this.models.find((l) => l.id === e.modelId)) == null ? void 0 : o.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : ne}
      ${i === "listing" ? E`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? E`<span class="chip"
                      >${((r = this.queryOps.find((l) => l.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : E`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : ne}
      ${i === "field" ? E`<label>Estereotipo</label>
            <select @change=${(l) => t({ stereotype: l.target.value || void 0 })}>
              ${mn.map((l) => E`<option value=${l} ?selected=${l === (e.stereotype ?? "regular")}>${l}</option>`)}
            </select>` : ne}
      ${i === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : ne}
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), s = i.indexOf(t), n = i.indexOf(e);
    s < 0 || n < 0 || (i.splice(n, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return ne;
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
        ${(e.buttons ?? []).some((n) => (n.bar ?? "toolbar") === "toolbar") ? ne : E`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((n, a) => {
      const o = (e.wizardSteps ?? []).map((l, p) => l.id ?? l.pageId ?? String(p)), r = o[a];
      return E`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${n.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
        const g = l.currentTarget.getBoundingClientRect(), h = l.clientX - g.left < g.width / 2 ? r : o[a + 1] ?? null;
        h !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: h });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${n.label ?? "Paso"}${n.pageId ? "" : " ⌁"}</span
                    >`;
    }) : E`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : ne}
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
        ${(e.buttons ?? []).some((n) => n.bar === "bottom") ? ne : E`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, o, r;
      const n = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
      return E`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((o = this.useCases.find((l) => l.id === this._btn.useCaseId)) == null ? void 0 : o.name) ?? this._btn.useCaseId}</span>
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
                ${this._btn.mappingId ? E`<span class="chip"
                        >${((r = this.mappings.find((l) => l.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${n ? E`<button
                      @click=${() => {
        const l = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: l });
      }}
                    >
                      Quitar
                    </button>` : ne}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : ne}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${mn.map(
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
          </div>` : ne}
    `;
  }
};
re.styles = mt`
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
  ae({ attribute: !1 })
], re.prototype, "page", 2);
Ie([
  ae({ type: Boolean, reflect: !0 })
], re.prototype, "framed", 2);
Ie([
  ae({ attribute: !1 })
], re.prototype, "models", 2);
Ie([
  ae({ attribute: !1 })
], re.prototype, "mappings", 2);
Ie([
  ae({ attribute: !1 })
], re.prototype, "useCases", 2);
Ie([
  ae({ attribute: !1 })
], re.prototype, "queryOps", 2);
Ie([
  ae({ attribute: !1 })
], re.prototype, "selectedCmpId", 2);
Ie([
  q()
], re.prototype, "_editing", 2);
Ie([
  q()
], re.prototype, "_dragId", 2);
Ie([
  q()
], re.prototype, "_overId", 2);
Ie([
  q()
], re.prototype, "_rename", 2);
Ie([
  q()
], re.prototype, "_route", 2);
Ie([
  q()
], re.prototype, "_btn", 2);
Ie([
  q()
], re.prototype, "_cmp", 2);
Ie([
  q()
], re.prototype, "_dragCmpId", 2);
Ie([
  q()
], re.prototype, "_dragWizKey", 2);
Ie([
  q()
], re.prototype, "_overCmpId", 2);
Ie([
  q()
], re.prototype, "_overCmpPos", 2);
Ie([
  q()
], re.prototype, "_foreignOver", 2);
Ie([
  q()
], re.prototype, "_activeTabs", 2);
re = Ie([
  ht("modux-page-designer")
], re);
var vc = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, Ae = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? wc(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && vc(t, i, n), n;
};
const no = 460, bc = 540, xc = 660;
let $e = class extends Le {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((n) => {
        var a;
        return (a = n.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId, o = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: o.w, h0: o.h }, e.preventDefault();
        return;
      }
      const s = t.find((n) => {
        var a;
        return (a = n.classList) == null ? void 0 : a.contains("frame-title");
      });
      if (s) {
        const a = s.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: a }), e.preventDefault();
          return;
        }
        const o = this.pages.findIndex((l) => l.id === a), r = this.posOf(a, o);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * n));
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
    var g, I, h, m, d, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (I = i == null ? void 0 : i.closest) == null ? void 0 : I.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, a = s.querySelector("modux-page-designer"), o = (h = a == null ? void 0 : a.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), r = (m = o == null ? void 0 : o.closest) == null ? void 0 : m.call(o, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${n}:${r.dataset.btnUc}`;
    const l = (d = o == null ? void 0 : o.closest) == null ? void 0 : d.call(o, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${n}:${l.dataset.bar}`;
    const p = (u = o == null ? void 0 : o.closest) == null ? void 0 : u.call(o, "[data-cmp-id]");
    return p ? `cmp:${n}:${p.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var h, m, d, u;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), s = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, a = s.querySelector("modux-page-designer"), o = (d = a == null ? void 0 : a.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), r = (u = o == null ? void 0 : o.closest) == null ? void 0 : u.call(o, "[data-cmp-id]");
    if (!r) return { pageId: n, componentId: null, pos: "into" };
    const l = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), I = re.LEAF_KINDS.has(l) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: n, componentId: r.dataset.cmpId, pos: I };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: no, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * bc, y: Math.floor(t / 3) * xc };
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
                <span class="route">${e.route ?? ""}</span>
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
                @component-config-changed=${(a) => {
        a.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...a.detail });
      }}
                @component-removed=${(a) => {
        a.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...a.detail });
      }}
                @component-moved=${(a) => {
        a.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...a.detail });
      }}
                @component-selected=${(a) => {
        a.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...a.detail });
      }}
                @component-transferred=${(a) => {
        a.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...a.detail });
      }}
                @wizard-step-moved=${(a) => {
        a.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...a.detail });
      }}
                @page-renamed=${(a) => {
        a.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...a.detail });
      }}
                @page-type-changed=${(a) => {
        a.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...a.detail });
      }}
                @page-route-changed=${(a) => {
        a.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...a.detail });
      }}
                @page-model-changed=${(a) => {
        a.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...a.detail });
      }}
                @button-added=${(a) => this.emit("page-button-added", { pageId: e.id, ...a.detail })}
                @button-changed=${(a) => this.emit("page-button-changed", { pageId: e.id, ...a.detail })}
                @button-removed=${(a) => this.emit("page-button-removed", { pageId: e.id, ...a.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(a) => this.emit("page-field-config-changed", { pageId: e.id, ...a.detail })}
                @fields-reordered=${(a) => this.emit("page-fields-reordered", { pageId: e.id, ...a.detail })}
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
$e.styles = mt`
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
      width: ${no}px;
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
Ae([
  ae({ attribute: !1 })
], $e.prototype, "pages", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "layout", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "sizes", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "selectedId", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "selectedIds", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "models", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "mappings", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "useCases", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "queryOps", 2);
Ae([
  ae({ attribute: !1 })
], $e.prototype, "selectedCmp", 2);
Ae([
  q()
], $e.prototype, "_t", 2);
Ae([
  q()
], $e.prototype, "_live", 2);
Ae([
  q()
], $e.prototype, "_liveSize", 2);
$e = Ae([
  ht("modux-figma")
], $e);
var kc = Object.defineProperty, _c = Object.getOwnPropertyDescriptor, tt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? _c(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && kc(t, i, n), n;
};
const $c = {
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
}, Qi = {
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
}, Ec = {
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
}, hn = [30, 20, 13, 9.5, 7.5], fn = [0, 180, 118, 80, 58], Sc = 0.055, gn = 0.86, Cc = 2600, hi = 240, In = 0.16, yn = 0.015;
let Ce = class extends Le {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this._motion = !0, this._viewNaming = !1, this._viewName = "", this.frame = 0;
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
      sessionStorage.setItem(Ce.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(Ce.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam);
      for (const [i, s] of Object.entries(t.nodes ?? {})) {
        const n = {
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
        this.prevByKey.has(i) || this.prevByKey.set(i, n);
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
    let t = 1 / 0, i = 1 / 0, s = -1 / 0, n = -1 / 0;
    for (const I of e)
      t = Math.min(t, I.x), i = Math.min(i, I.y), s = Math.max(s, I.x), n = Math.max(n, I.y);
    const a = 70, o = this.clientWidth || 800, r = this.clientHeight || 600, l = s - t + a * 2, p = n - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(o / l, r / p)));
    this.cam.k = g, this.cam.x = o / 2 - (t + s) / 2 * g, this.cam.y = r / 2 - (i + n) / 2 * g;
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
  makeNode(e, t, i, s, n) {
    const a = `${(n == null ? void 0 : n.key) ?? ""}/${e}:${t}`, o = this.prevByKey.get(a), r = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: $c[e] ?? "#64748b",
      depth: s,
      parent: n,
      expanded: (o == null ? void 0 : o.expanded) ?? !1,
      x: (o == null ? void 0 : o.x) ?? (n ? n.x + r() : 0),
      y: (o == null ? void 0 : o.y) ?? (n ? n.y + r() : 0),
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
    const t = this.model, i = e.depth + 1, s = (n, a, o) => this.makeNode(n, a, o, i, e);
    switch (e.kind) {
      case "root":
        return [
          ...t.modules.map((n) => s("module", n.id, n.name)),
          ...t.externalSystems.map((n) => s("external-system", n.id, n.name)),
          ...(t.uiApps ?? []).map((n) => s("ui-app", n.id, n.name)),
          ...(t.actors ?? []).map((n) => s("actor", n.id, n.name)),
          ...(t.aiAgents ?? []).filter((n) => !n.external).map((n) => s("ai-agent", n.id, n.name)),
          ...(t.workflows ?? []).map((n) => s("workflow", n.id, n.name)),
          ...(t.identityProviders ?? []).map((n) => s("identity-provider", n.id, n.name))
        ];
      case "module": {
        const n = t.modules.find((p) => p.id === e.refId);
        if (!n) return [];
        const a = (t.aggregates ?? []).filter((p) => p.moduleId === e.refId), o = n.useCases ?? [], r = new Set(a.map((p) => p.id)), l = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [s("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...o.length ? [s("group", `use-cases:${e.refId}`, `Casos de uso · ${o.length}`)] : [],
          ...(n.domainEvents ?? []).filter((p) => !l.has(p.id)).map((p) => s("domain-event", p.id, p.name)),
          ...(n.applicationEvents ?? []).map((p) => s("application-event", p.id, p.name)),
          ...(n.readModels ?? []).map((p) => s("read-model", p.id, p.name)),
          ...(n.domainServices ?? []).map((p) => s("domain-service", p.id, p.name)),
          ...(n.queryServices ?? []).map((p) => s("query-service", p.id, p.name)),
          ...(n.scheduledTriggers ?? []).map((p) => s("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerModuleId === e.refId).map((p) => s("document", p.id, p.name))
        ];
      }
      case "group": {
        const n = e.refId.indexOf(":"), a = e.refId.slice(0, n), o = e.refId.slice(n + 1), r = t.modules.find((l) => l.id === o);
        return r ? a === "aggregates" ? (t.aggregates ?? []).filter((l) => l.moduleId === o).map((l) => s("aggregate", l.id, l.name)) : (r.useCases ?? []).map((l) => s(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
      }
      case "aggregate": {
        const n = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => s("entity", a.id, a.name)),
          ...t.modules.flatMap((a) => a.domainEvents ?? []).filter((a) => n.has(a.id)).map((a) => s("domain-event", a.id, a.name))
        ];
      }
      case "external-system": {
        const n = t.externalSystems.find((a) => a.id === e.refId);
        return n ? [
          ...(t.apis ?? []).filter((a) => a.publishedByExternalSystemId === e.refId).map((a) => s("api", a.id, a.name)),
          ...(n.useCases ?? []).map((a) => s("external-use-case", a.id, a.name)),
          ...(n.tables ?? []).map((a) => s("external-table", a.id, a.name)),
          ...(n.mcpServers ?? []).map((a) => s("mcp-server", a.id, a.name))
        ] : [];
      }
      case "api": {
        const n = (t.apis ?? []).find((a) => a.id === e.refId);
        return ((n == null ? void 0 : n.operations) ?? []).map((a) => s("api-operation", a.id, a.name));
      }
      case "ui-app": {
        const n = (t.uiApps ?? []).find((r) => r.id === e.refId);
        if (!n) return [];
        const a = /* @__PURE__ */ new Set(), o = (r) => {
          for (const l of r ?? [])
            l.pageId && a.add(l.pageId), o(l.children);
        };
        o(n.menuItems);
        for (const r of [n.headerPageId, n.homePageId, n.viewPageId, n.editPageId])
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
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (let r = o; r; r = r.parent) t.add(r.key);
    }, s = (o) => {
      t.add(o.key);
      for (const r of o.children ?? []) s(r);
    };
    i(e), s(e);
    const n = this.related.get(e.refId);
    if (n)
      for (const o of this.allNodes)
        o.refId && n.has(o.refId) && i(o);
    this.focusKeys = t;
  }
  tick() {
    this.t += 1 / 60;
    const e = this.visible();
    this.step(e), this.stepFlight(), this.draw(e), (this.frame = (this.frame + 1) % 60) === 0 && this.saveState(), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var s;
    const t = this.t;
    for (const n of e) {
      if (n.parent) {
        const a = (fn[Math.min(n.depth, fn.length - 1)] ?? 60) + Math.min(60, ((((s = n.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let o = n.x - n.parent.x, r = n.y - n.parent.y, l = Math.hypot(o, r);
        if (l < 0.01) {
          const h = Math.random() * Math.PI * 2;
          o = Math.cos(h) * 0.1, r = Math.sin(h) * 0.1, l = 0.1;
        }
        const p = Sc * (l - a), g = o / l * p, I = r / l * p;
        n.vx -= g, n.vy -= I, n.parent.vx += g * 0.4, n.parent.vy += I * 0.4;
      } else
        n.vx -= n.x * yn, n.vy -= n.y * yn;
      !this.reducedMotion && this._motion && (n.vx += Math.sin(t * n.f1 * Math.PI * 2 + n.p1) * In, n.vy += Math.cos(t * n.f2 * Math.PI * 2 + n.p2) * In);
    }
    for (let n = 0; n < e.length; n++) {
      const a = e[n];
      for (let o = n + 1; o < e.length; o++) {
        const r = e[o], l = r.x - a.x, p = r.y - a.y;
        if (Math.abs(l) > hi || Math.abs(p) > hi) continue;
        const g = l * l + p * p;
        if (g > hi * hi || g < 0.01) continue;
        const I = Math.sqrt(g), h = a.depth <= 1 && r.depth <= 1 ? 3 : 1, m = Cc * h / g, d = l / I * m, u = p / I * m;
        a.vx -= d, a.vy -= u, r.vx += d, r.vy += u;
      }
    }
    const i = !this._motion;
    for (const n of e) {
      if (n === this.dragNode) {
        n.vx = 0, n.vy = 0;
        continue;
      }
      n.vx *= i ? 0.75 : gn, n.vy *= i ? 0.75 : gn;
      const a = Math.hypot(n.vx, n.vy);
      if (a > 14 && (n.vx = n.vx / a * 14, n.vy = n.vy / a * 14), i && a < 0.35) {
        n.vx = 0, n.vy = 0;
        continue;
      }
      n.x += n.vx, n.y += n.vy;
      const o = n === this.hover ? 1.75 : 1;
      n.scale += (o - n.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (hn[Math.min(e.depth, hn.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, o;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, s = this.clientHeight;
    t.clearRect(0, 0, i, s), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const r of e)
      r.parent && (t.strokeStyle = r.color + "55", t.beginPath(), t.moveTo(r.parent.x, r.parent.y), t.lineTo(r.x, r.y), t.stroke());
    const n = (r) => `${r}px system-ui, sans-serif`;
    for (const r of e) {
      const l = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, l, 0, Math.PI * 2), t.fillStyle = r.expanded ? r.color + "22" : "#ffffff", t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, l);
      const p = ((a = r.children) == null ? void 0 : a.length) ?? 0;
      if (!r.expanded && p > 0) {
        const I = Math.max(7, l * 0.42), h = r.x + l * 0.75, m = r.y + l * 0.75;
        t.beginPath(), t.arc(h, m, I, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = n(I * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), h, m + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const I = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${n(12)}` : n(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(I, r.x, r.y + l + 4);
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
    if (this.hover && this.drawThreads(t, this.hover, e), this.hover && !this.hover.expanded && ((o = this.hover.children) != null && o.length) && this.drawGhosts(t, this.hover), this.linking) {
      const r = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
    } else if (this.hover && this.hover.kind !== "root") {
      const r = this.handleCenter(this.hover), l = 6 / this.cam.k;
      t.save(), t.beginPath(), t.arc(r.x, r.y, l, 0, Math.PI * 2), t.fillStyle = "#ffffff", t.fill(), t.lineWidth = 1.6 / this.cam.k, t.strokeStyle = "#475569", t.stroke(), t.beginPath(), t.moveTo(r.x - l * 0.45, r.y), t.lineTo(r.x + l * 0.45, r.y), t.moveTo(r.x, r.y - l * 0.45), t.lineTo(r.x, r.y + l * 0.45), t.stroke(), t.restore();
    }
    t.restore(), this.hover && !this.linking && this.drawCard(t, this.hover, i, s);
  }
  /** The relation handle sits just outside the node, to its right. */
  handleCenter(e) {
    return { x: e.x + this.radiusOf(e) + 10 / this.cam.k, y: e.y };
  }
  /**
   * Cross-relations as faint threads: hovering a node reveals what it talks
   * to across the tree (calls, events, actor uses, IdP trust…) without
   * cluttering the resting picture. Only threads to visible nodes are drawn.
   */
  drawThreads(e, t, i) {
    const s = this.related.get(t.refId);
    if (!(s != null && s.size)) return;
    const n = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(n <= 0.02)) {
      e.save(), e.globalAlpha = n, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const a of i) {
        if (a === t || !s.has(a.refId) || a === t.parent || a.parent === t) continue;
        const o = (t.x + a.x) / 2, r = (t.y + a.y) / 2, l = a.x - t.x, p = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(o - p * g, r + l * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], s = i.slice(0, 14), n = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (n <= 0.02) return;
    const o = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = n, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, s.forEach((p, g) => {
      const I = r - l / 2 + l * (g + 0.5) / s.length, h = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, m = t.x + Math.cos(I) * (o + h), d = t.y + Math.sin(I) * (o + h);
      e.beginPath(), e.arc(m, d, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > s.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + l / 2 + 0.35;
      e.fillText(`+${i.length - s.length}`, t.x + Math.cos(p) * o, t.y + Math.sin(p) * o);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const s = i * 0.42;
    if (s < 3.2) return;
    const { x: n, y: a } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, s * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "group": {
        e.arc(n - s * 0.45, a, s * 0.16, 0, Math.PI * 2), e.moveTo(n + s * 0.16, a), e.arc(n, a, s * 0.16, 0, Math.PI * 2), e.moveTo(n + s * 0.61, a), e.arc(n + s * 0.45, a, s * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(n, a, s, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(n - s * Math.cos(Math.PI * 0.35), a + s * Math.sin(Math.PI * 0.35)), e.arc(n, a, s, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(n, a, s, 0, Math.PI * 2), e.moveTo(n + s * 0.35, a), e.arc(n, a, s * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "module":
        for (const [o, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(n + o * s + s * 0.3, a + r * s), e.arc(n + o * s, a + r * s, s * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(n, a - s), e.lineTo(n + s, a), e.lineTo(n, a + s), e.lineTo(n - s, a), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(n - s, a - s * 0.8, s * 2, s * 1.6), e.moveTo(n - s, a - s * 0.25), e.lineTo(n + s, a - s * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(n - s * 0.6, a - s * 0.85), e.lineTo(n + s * 0.85, a), e.lineTo(n - s * 0.6, a + s * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(n + s * 0.3, a - s), e.lineTo(n - s * 0.5, a + s * 0.15), e.lineTo(n + s * 0.05, a + s * 0.15), e.lineTo(n - s * 0.3, a + s), e.lineTo(n + s * 0.5, a - s * 0.15), e.lineTo(n - s * 0.05, a - s * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(n, a, s * 0.5, 0, Math.PI * 2);
        for (let o = 0; o < 6; o++) {
          const r = o * Math.PI / 3;
          e.moveTo(n + Math.cos(r) * s * 0.55, a + Math.sin(r) * s * 0.55), e.lineTo(n + Math.cos(r) * s, a + Math.sin(r) * s);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(n - s * 0.25, a - s * 0.25, s * 0.6, 0, Math.PI * 2), e.moveTo(n + s * 0.25, a + s * 0.25), e.lineTo(n + s, a + s), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(n, a, s, 0, Math.PI * 2), e.moveTo(n, a - s * 0.55), e.lineTo(n, a), e.lineTo(n + s * 0.45, a + s * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(n - s * 0.85, a + s * 0.45), e.quadraticCurveTo(n - s * 0.85, a - s, n, a - s), e.quadraticCurveTo(n + s * 0.85, a - s, n + s * 0.85, a + s * 0.45), e.closePath(), e.moveTo(n + s * 0.25, a + s * 0.75), e.arc(n, a + s * 0.75, s * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(n - s * 0.7, a - s), e.lineTo(n + s * 0.25, a - s), e.lineTo(n + s * 0.7, a - s * 0.55), e.lineTo(n + s * 0.7, a + s), e.lineTo(n - s * 0.7, a + s), e.closePath(), e.moveTo(n + s * 0.25, a - s), e.lineTo(n + s * 0.25, a - s * 0.55), e.lineTo(n + s * 0.7, a - s * 0.55), e.stroke();
        break;
      case "workflow":
        for (const o of [-0.7, 0.1])
          e.moveTo(n + o * s, a - s * 0.7), e.lineTo(n + (o + 0.6) * s, a), e.lineTo(n + o * s, a + s * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(n - s * 0.45, a - s * 0.45, s * 0.45, 0, Math.PI * 2), e.moveTo(n - s * 0.1, a - s * 0.1), e.lineTo(n + s * 0.9, a + s * 0.9), e.moveTo(n + s * 0.45, a + s * 0.45), e.lineTo(n + s * 0.85, a + s * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(n, a - s * 0.5, s * 0.42, 0, Math.PI * 2), e.moveTo(n - s * 0.8, a + s), e.quadraticCurveTo(n, a - s * 0.1, n + s * 0.8, a + s), e.stroke();
        break;
      case "ai-agent":
        for (let o = 0; o < 4; o++) {
          const r = o * Math.PI / 2 + Math.PI / 4;
          e.moveTo(n, a), e.lineTo(n + Math.cos(r) * s, a + Math.sin(r) * s), e.moveTo(n, a), e.lineTo(n + Math.cos(r + Math.PI / 4) * s * 0.5, a + Math.sin(r + Math.PI / 4) * s * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(n - s * 0.45, a + s * 0.15, s * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(n + s * 0.1, a - s * 0.35, s * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(n + s * 0.55, a + s * 0.2, s * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [o, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(n + o * s, a + r * s, s * 0.85, s * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(n - s, a - s * 0.8, s * 2, s * 1.6), e.moveTo(n - s, a - s * 0.35), e.lineTo(n + s, a - s * 0.35), e.stroke(), e.beginPath(), e.arc(n - s * 0.7, a - s * 0.57, s * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(n - s * 0.25, a - s), e.lineTo(n - s, a), e.lineTo(n - s * 0.25, a + s), e.moveTo(n + s * 0.25, a - s), e.lineTo(n + s, a), e.lineTo(n + s * 0.25, a + s), e.stroke();
        break;
      case "api-operation":
        e.moveTo(n - s, a), e.lineTo(n + s * 0.7, a), e.moveTo(n + s * 0.1, a - s * 0.5), e.lineTo(n + s * 0.8, a), e.lineTo(n + s * 0.1, a + s * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(n, a + s * 0.25, s * 0.6, 0, Math.PI), e.closePath(), e.moveTo(n - s * 0.35, a + s * 0.25), e.lineTo(n - s * 0.35, a - s * 0.7), e.moveTo(n + s * 0.35, a + s * 0.25), e.lineTo(n + s * 0.35, a - s * 0.7), e.stroke();
        break;
      default:
        e.arc(n, a, s * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, s) {
    var w, T;
    const n = (t.children ?? []).flatMap(
      (R) => R.kind === "group" ? R.children ?? (R.children = this.childrenOf(R)) : [R]
    ), a = /* @__PURE__ */ new Map();
    for (const R of n) a.set(R.kind, (a.get(R.kind) ?? 0) + 1);
    const o = [];
    for (const [R, L] of a)
      if (o.push(`${L} ${L === 1 ? (Qi[R] ?? R).toLowerCase() : Ec[R] ?? R}`), o.length === 4) {
        const U = [...a.keys()].length - 4;
        U > 0 && (o[3] += ` (+${U} tipos más)`);
        break;
      }
    const r = n.slice(0, 6).map((R) => ({ label: R.label.length > 30 ? R.label.slice(0, 29) + "…" : R.label, color: R.color })), l = n.length - r.length, p = t.label, g = Qi[t.kind] ?? t.kind, I = ((w = t.children) != null && w.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((T = t.children) != null && T.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const h = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const m = Math.max(
      e.measureText(g).width,
      ...o.map((R) => e.measureText(R).width),
      ...r.map((R) => e.measureText(R.label).width + 12),
      e.measureText(I).width
    ), d = Math.min(300, Math.max(h, m) + 24), u = r.length ? 8 + r.length * 15 + (l > 0 ? 15 : 0) : 0, f = 40 + o.length * 15 + u + (I ? 18 : 0), b = this.radiusOf(t) * this.cam.k, C = this.cam.x + t.x * this.cam.k, N = this.cam.y + t.y * this.cam.k;
    let W = C + b + 14;
    W + d > i - 8 && (W = C - b - 14 - d), W = Math.max(8, Math.min(W, i - d - 8));
    const P = Math.max(8, Math.min(N - 10, s - f - 8));
    e.translate(W, P), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, d, f, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", o.forEach((R, L) => e.fillText(R, 12, 41 + L * 15));
    let x = 41 + o.length * 15 + (r.length ? 8 : 0);
    r.forEach((R) => {
      e.fillStyle = R.color, e.beginPath(), e.arc(15, x + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(R.label, 24, x), x += 15;
    }), l > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${l} más`, 24, x)), I && (e.fillStyle = "#94a3b8", e.fillText(I, 12, f - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = Ce.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && Ce.fold(i.label).includes(t)).slice(0, 8);
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
      const n = i[s], a = this.radiusOf(n) + 4 / this.cam.k;
      if ((e - n.x) ** 2 + (t - n.y) ** 2 <= a * a) return n;
    }
  }
  onPointerDown(e) {
    this.flight = void 0;
    const t = this.toWorld(e);
    if (this.downAt = { x: e.clientX, y: e.clientY }, this.moved = !1, this.hover && this.hover.kind !== "root") {
      const s = this.handleCenter(this.hover), n = 6 / this.cam.k + 4 / this.cam.k;
      if ((t.x - s.x) ** 2 + (t.y - s.y) ** 2 <= n * n) {
        this.linking = { source: this.hover, x: t.x, y: t.y };
        try {
          e.target.setPointerCapture(e.pointerId);
        } catch {
        }
        return;
      }
    }
    const i = this.nodeAt(t.x, t.y);
    i ? this.dragNode = i : this.panning = !0;
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
    if (this.panning && e.buttons & 1) {
      this.cam.x += e.movementX, this.cam.y += e.movementY;
      return;
    }
    const t = this.toWorld(e), i = this.hover;
    let s = this.nodeAt(t.x, t.y);
    if (!s && i && i.kind !== "root") {
      const n = this.handleCenter(i), a = this.radiusOf(i) + 22 / this.cam.k, o = (t.x - i.x) ** 2 + (t.y - i.y) ** 2 <= a * a, r = (t.x - n.x) ** 2 + (t.y - n.y) ** 2 <= (12 / this.cam.k) ** 2;
      (o || r) && (s = i);
    }
    this.hover = s, this.hover !== i && (this.hoverAt = this.t), this.canvas && (this.canvas.style.cursor = this.hover ? "pointer" : "default");
  }
  onPointerUp(e) {
    if (this.linking) {
      const i = this.toWorld(e), s = this.nodeAt(i.x, i.y), n = this.linking.source;
      this.linking = void 0, s && s !== n && s.kind !== "root" && n.refId && s.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: n.refId, targetId: s.refId, x: e.clientX, y: e.clientY },
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
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, s = e.parent ? Math.PI * 1.25 : Math.PI * 2, n = e.children;
      n.forEach((a, o) => {
        this.materialize(a.parent);
        const r = i - s / 2 + s * (o + 0.5) / n.length;
        a.x = e.x + Math.cos(r) * 6, a.y = e.y + Math.sin(r) * 6, a.vx = Math.cos(r) * 7, a.vy = Math.sin(r) * 7, a.children || (a.children = this.childrenOf(a));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, s = (e.clientY - t.top - this.cam.y) / this.cam.k, n = this.nodeAt(i, s);
    !n || n.kind === "root" || this.dispatchEvent(
      new CustomEvent("node-activated", {
        detail: { id: n.refId, kind: n.kind },
        bubbles: !0,
        composed: !0
      })
    );
  }
  onWheel(e) {
    e.preventDefault(), this.flight = void 0;
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * n)), o = a / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * o, this.cam.y = s - (s - this.cam.y) * o, this.cam.k = a;
  }
  render() {
    return E`
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
        ${this._sugs.length ? E`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => E`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (Qi[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? E`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        <button
          title=${this._motion ? "Parar el movimiento constante" : "Reanudar el movimiento"}
          @click=${() => this._motion = !this._motion}
        >
          ${this._motion ? "⏸ Quieto" : "▶ Movimiento"}
        </button>
        ${this._viewNaming ? E`
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
            ` : E`<button
              title="Crea una vista modux con los elementos desplegados ahora mismo"
              @click=${() => this._viewNaming = !0}
            >
              ⊞ Vista…
            </button>`}
      </div>
      <div class="hud">
        click: expandir / plegar · alt+click: aislar lo relacionado · doble click: abrir<br />
        hover: ver contenido, y su asa dibuja una relación hasta otro nodo<br />
        buscar: expande el camino y vuela hasta el nodo<br />
        arrastrar nodo: tirar del subárbol · fondo: mover · rueda: zoom
      </div>
    `;
  }
};
Ce.styles = mt`
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
Ce.STORE_KEY = "modux-explorer-state";
tt([
  ae({ attribute: !1 })
], Ce.prototype, "model", 2);
tt([
  q()
], Ce.prototype, "_q", 2);
tt([
  q()
], Ce.prototype, "_sugs", 2);
tt([
  q()
], Ce.prototype, "_active", 2);
tt([
  q()
], Ce.prototype, "_motion", 2);
tt([
  q()
], Ce.prototype, "_viewNaming", 2);
tt([
  q()
], Ce.prototype, "_viewName", 2);
Ce = tt([
  ht("modux-explorer")
], Ce);
var Mc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, ie = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Ac(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Mc(t, i, n), n;
};
const ds = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Pc = Object.keys(ds);
function Dt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, a = i.y - i.h / 2, o = i.y + i.h / 2;
  let r = 0, l = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [I, h] of [
    [-p, e.x - s],
    [p, n - e.x],
    [-g, e.y - a],
    [g, o - e.y]
  ]) {
    if (I === 0) {
      if (h < 0) return !1;
      continue;
    }
    const m = h / I;
    if (I < 0) {
      if (m > l) return !1;
      m > r && (r = m);
    } else {
      if (m < r) return !1;
      m < l && (l = m);
    }
  }
  return l - r > 0.02;
}
function Tc(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), n = (g) => {
    var h;
    const I = /* @__PURE__ */ new Set();
    for (let m = g; m; m = (h = s.get(m)) == null ? void 0 : h.parentId) I.add(m);
    return I;
  }, a = e.nodes, o = (g) => g.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (g, I, h) => {
    const m = o(h), d = { x: h.x, y: h.y, w: h.w + 2 * m, h: h.h + 2 * m }, u = h.w / 2 + m * 1.5, f = h.h / 2 + m * 1.5, b = { x: h.x - u, y: h.y - f }, C = { x: h.x + u, y: h.y - f }, N = { x: h.x - u, y: h.y + f }, W = { x: h.x + u, y: h.y + f }, P = [];
    for (const x of [b, C, N, W])
      !Dt(g, x, d) && !Dt(x, I, d) && P.push([x]);
    for (const [x, w] of [
      [b, C],
      [C, b],
      [C, W],
      [W, C],
      [W, N],
      [N, W],
      [N, b],
      [b, N]
    ])
      !Dt(g, x, d) && !Dt(w, I, d) && P.push([x, w]);
    return P;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const I = s.get(g.sourceId), h = s.get(g.targetId);
    if (!I || !h) continue;
    const m = /* @__PURE__ */ new Set([...n(I.id), ...n(h.id)]), d = [
      { x: I.x, y: I.y },
      { x: h.x, y: h.y }
    ];
    for (let u = 0; u < 12; u++) {
      let f = !1;
      e: for (let b = 0; b < d.length - 1; b++)
        for (const C of a) {
          if (m.has(C.id)) continue;
          const N = o(C), W = { x: C.x, y: C.y, w: C.w + 2 * N, h: C.h + 2 * N };
          if (!Dt(d[b], d[b + 1], W)) continue;
          const P = l(d[b], d[b + 1], C);
          if (!P.length) continue;
          const x = (T) => a.some(
            (R) => R !== C && !m.has(R.id) && Math.abs(T.x - R.x) < R.w / 2 + o(R) / 2 && Math.abs(T.y - R.y) < R.h / 2 + o(R) / 2
          ), w = (T) => {
            let R = 0;
            const L = [d[b], ...T, d[b + 1]];
            for (let U = 0; U < L.length - 1; U++)
              R += Math.hypot(L[U + 1].x - L[U].x, L[U + 1].y - L[U].y);
            return R + (T.some(x) ? 1e4 : 0);
          };
          P.sort((T, R) => w(T) - w(R)), d.splice(b + 1, 0, ...P[0]), f = !0;
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
function vn(e, t) {
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
    }, this.layout = {}, this.diff = null, this._view = "explorer", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._drawer = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var a;
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
          n("level:contexts");
          break;
        case "2":
          n("level:detail");
          break;
        case "3":
          n("level:operations");
          break;
        case "4":
          n("level:distribution");
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
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, a = we(t);
      if (!(a != null && a.itemId)) return;
      const o = this.menuEntryIn(a.appId, a.itemId);
      if (!o) return;
      const r = (l, p) => (l ?? []).some((g) => g.id === p || r(g.children, p));
      if (n) {
        const l = we(n);
        if (!(l != null && l.itemId) || l.itemId === a.itemId || a.appId === l.appId && r(o.entry.children, l.itemId)) return;
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
        const l = we(s);
        if (!(l != null && l.itemId) || l.itemId === a.itemId) return;
        const p = this.menuEntryIn(l.appId, l.itemId);
        if (!p || a.appId === l.appId && r(o.entry.children, l.itemId) || a.appId === l.appId && p.parentId === o.parentId && o.beforeId === l.itemId)
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
      const n = i ? ((a = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : a[1]) ?? null : null;
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
      const { fromPageId: t, toPageId: i, componentId: s, toParentId: n, beforeComponentId: a } = e.detail, o = this.componentIn(t, s);
      if (!o || t === i) return;
      const r = JSON.parse(JSON.stringify(o.node)), { ops: l } = this.rebuildComponentOps(i, r, n ?? void 0, a);
      for (const p of l) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, r, o.parentId ?? void 0, o.beforeId).ops
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
    return oi(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = oi(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations" || t === "distribution") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = oi(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = oi(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), o = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), r = Ti(o), l = [...r.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: a.nodes[g] ?? null
    })), p = { ...a.nodes };
    for (const [g, I] of r) {
      const h = o.find((d) => d.id === g), m = a.nodes[g] ?? { x: h.x, y: h.y };
      p[g] = {
        x: Math.round(m.x + (I.x - h.x)),
        y: Math.round(m.y + (I.y - h.y))
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
    var t, i, s, n, a, o, r, l, p, g, I, h, m;
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
          const b = (C) => {
            for (const N of C ?? [])
              N.modelId === e.id && u.push({ kind: "set-page-component", pageId: f.id, componentId: N.id, modelId: e.id }), b(N.children);
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
        const f = (b, C) => {
          for (const N of b ?? [])
            u.push({
              kind: "add-menu-item",
              appId: d.id,
              label: N.label,
              itemId: N.id,
              parentId: C == null ? void 0 : C.id,
              parentLabel: C && !C.id ? C.label : void 0,
              pageId: N.pageId ?? null
            }), N.uiAdapterId && u.push({ kind: "set-menu-app", appId: d.id, toAppId: N.uiAdapterId, itemId: N.id, label: N.label }), N.useCaseId && u.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: N.useCaseId, itemId: N.id, label: N.label }), N.aggregateId && u.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: N.aggregateId, itemId: N.id, label: N.label }), N.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: d.id,
              queryServiceId: N.queryServiceId ?? null,
              queryOperationId: N.queryOperationId,
              itemId: N.id,
              label: N.label
            }), f(N.children, N);
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
          for (const C of b ?? []) {
            if (e.itemId ? C.id === e.itemId : C.label === e.label) return C;
            const N = u(C.children);
            if (N) return N;
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
        const d = (this.model.pages ?? []).find((W) => W.id === e.pageId);
        let u = null, f = null, b = null;
        const C = (W, P) => {
          var w;
          const x = W ?? [];
          for (let T = 0; T < x.length; T++)
            x[T].id === e.componentId && (u = x[T], f = P, b = ((w = x[T + 1]) == null ? void 0 : w.id) ?? null), C(x[T].children, x[T]);
        };
        if (C(d == null ? void 0 : d.content, null), !u) return null;
        const N = u;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: N.title ?? null,
          text: N.text ?? null,
          label: N.label ?? null,
          useCaseId: N.useCaseId ?? null,
          mappingId: N.mappingId ?? null,
          modelId: N.modelId ?? null,
          queryServiceId: N.queryServiceId ?? null,
          queryOperationId: N.queryOperationId ?? null,
          fieldId: N.fieldId ?? null,
          stereotype: N.stereotype ?? null,
          colspan: N.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: f === null ? null : f.id,
          beforeComponentId: b
        }] : this.rebuildComponentOps(
          e.pageId,
          N,
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
        const d = (((n = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : n.viewmodelFields) ?? []).find((u) => u.fieldId === e.fieldId);
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
        const d = ((o = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : o.identityProviderId) ?? ((r = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : r.identityProviderId) ?? ((l = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : l.identityProviderId) ?? null;
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
        const d = (I = (g = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : I.find((u) => u.uri === e.uri);
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
        const d = (h = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : h.operations.find((u) => u.id === e.id);
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
        const d = (m = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : m.operations.find((u) => u.id === e.id);
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, a = this.viewLayout(n), o = a.nodes[t] ?? null;
    let r = { x: i, y: s };
    const l = this.sceneFor(n), p = l.nodes.find((I) => I.id === t);
    if (p != null && p.parentId) {
      const I = l.nodes.find((h) => h.id === p.parentId);
      I && (r = { x: i - I.x, y: s - I.y });
    }
    this.writeViewLayout(n, { ...a, nodes: { ...a.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: n, id: t, pos: o }];
    if (n === "processes") {
      const I = this.stepReorderCommand(t);
      if (I) {
        const h = this.inverseOf(I);
        h && g.unshift(...h), this.command(I, !1);
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, a = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!a || i && !this.model.externalSystems.some((d) => d.id === i)) return;
    const o = a.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === o) return;
    const l = this._view, p = this.viewLayout(l), g = this.sceneFor(l), I = r ? g.nodes.find((d) => d.id === r) : void 0, h = I ? { x: s - I.x, y: n - I.y } : { x: s, y: n }, m = [
      { kind: "set-api-publisher", id: t, targetId: o },
      { kind: "move-node", view: l, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...p, nodes: { ...p.nodes, [t]: h } }), this.pushUndoEntry(m);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, a = (this.model.apis ?? []).find((d) => d.id === t), o = this.model.externalSystems.find((d) => d.id === i);
    if (!a || !o || (this.model.proxyApis ?? []).some(
      (d) => d.targetApiId === t && d.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${se(a.name)}-${se(o.name)}`;
    if ((this.model.proxyApis ?? []).some((d) => d.id === l)) return;
    const p = this._view, g = this.viewLayout(p), h = this.sceneFor(p).nodes.find((d) => d.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${a.name}@${o.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const m = [{ kind: "remove-proxy-api", id: l }];
    h && (m.push({ kind: "move-node", view: p, id: l, pos: g.nodes[l] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [l]: { x: s - h.x, y: n - h.y } }
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
    var r, l, p;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), a = n ? null : ((l = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null, o = n || a ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!n && !a && !o) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: s,
      fileName: i.name,
      apiId: n,
      homeExternalId: a,
      homeModuleId: o
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
    const { moves: t } = e.detail, i = this._view, s = this.viewLayout(i), n = this.sceneFor(i), a = { ...s.nodes }, o = [];
    for (const { id: r, x: l, y: p } of t) {
      o.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let g = { x: l, y: p };
      const I = n.nodes.find((h) => h.id === r);
      if (I != null && I.parentId) {
        const h = n.nodes.find((m) => m.id === I.parentId);
        h && (g = { x: l - h.x, y: p - h.y });
      }
      a[r] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: a }), i === "processes")
      for (const { id: r } of t) {
        const l = this.stepReorderCommand(r);
        if (l) {
          const p = this.inverseOf(l);
          p && o.unshift(...p), this.command(l, !1);
        }
      }
    this.pushUndoEntry(o);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: n, h: a } = e.detail, o = this._view, r = this.viewLayout(o), l = this.sceneFor(o).nodes.filter((I) => I.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: o, id: t, pos: r.nodes[t] ?? null },
      ...l.map((I) => ({ kind: "move-node", view: o, id: I.id, pos: r.nodes[I.id] ?? null }))
    ]);
    const p = { ...r.nodes, [t]: { x: i, y: s } };
    for (const I of l) p[I.id] = { x: I.x - i, y: I.y - s };
    this.writeViewLayout(o, {
      ...r,
      nodes: p,
      sizes: { ...r.sizes ?? {}, [t]: { w: n, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, s = this._view, n = this.viewLayout(s);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: s, id: t, points: n.edges[t] ?? null }
    ]);
    const a = { ...n.edges };
    i.length ? a[t] = i : delete a[t], this.writeViewLayout(s, { ...n, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = Ss(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((o) => [o.id, o.x])), n = [...t.steps].sort(
      (o, r) => (s.get(o.id) ?? 0) - (s.get(r.id) ?? 0)
    );
    if (n.every((o, r) => o.id === t.steps[r].id)) return null;
    const a = n.findIndex((o) => o.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? n[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: s, y: n, connectKind: a } = e.detail;
    this.applyConnection(t, i, s, n, a);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, s, n) {
    var F, B, y, S;
    if (this._view === "context-map" && this._detail === "distribution") {
      const v = this.sceneFor("context-map"), k = this.model.codeModules ?? [], $ = ((A) => {
        var M;
        for (let D = A; D; ) {
          if (k.some((V) => V.id === D)) return D;
          D = (M = v.nodes.find((V) => V.id === D)) == null ? void 0 : M.parentId;
        }
        return null;
      })(t);
      if ($ && $ !== e) {
        if ((this.model.services ?? []).some((M) => M.id === e)) {
          this.command({ kind: "add-service-code-module", serviceId: e, id: $ });
          return;
        }
        if (!k.some((M) => M.id === e) && !this.model.modules.some((M) => M.id === e)) {
          this.command({ kind: "add-code-module-element", id: $, elementId: e });
          return;
        }
      }
    }
    if (this._view === "eventstorming") {
      const v = (_) => (this.model.customCodes ?? []).some(($) => $.id === _), k = v(t) ? { stepId: e, ccId: t } : v(e) ? { stepId: t, ccId: e } : null;
      if (k) {
        const _ = this.owningUseCaseOf(k.stepId);
        _ && this.command({
          kind: "set-use-case-step-custom-code",
          useCaseId: _.id,
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
      const _ = v.steps.find(($) => $.id === t);
      if (((_ == null ? void 0 : _.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: v.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const v = this.model.pages ?? [], k = this.model.uiApps ?? [], _ = (j) => k.some((J) => J.id === j), $ = (j) => v.some((J) => J.id === j), A = (j) => (this.model.customCodes ?? []).some((J) => J.id === j);
      if (A(e) || A(t)) {
        const j = A(e) ? e : t, J = A(e) ? t : e;
        if (A(J)) return;
        if ($(J)) {
          this.command({ kind: "set-page-custom-code", id: J, targetId: j });
          return;
        }
        this.command({ kind: "add-custom-code-use", id: j, elementId: J });
        return;
      }
      if (n === "home" && _(e) && ($(t) || _(t))) {
        if (t === e) return;
        this.command(
          $(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && _(e) && $(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && $(e) && ($(t) || _(t)) && t !== e) {
        const j = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          $(t) ? { kind: j, pageId: e, targetId: t, toAppId: null } : { kind: j, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (n === "viewmodel" && $(e)) {
        (this.model.models ?? []).some((j) => j.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((n === "view" || n === "edit") && _(e) && $(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const M = (j) => /^wizrow:([^:]+):(.+)$/.exec(j), D = M(e) ?? M(t);
      if (D) {
        const j = M(e) ? t : e;
        $(j) && j !== D[1] && this.command({ kind: "set-wizard-step-page", pageId: D[1], itemId: D[2], targetId: j });
        return;
      }
      const V = v.find((j) => j.id === t && j.type === "WIZARD");
      if ($(e) && V && e !== V.id) {
        (V.wizardSteps ?? []).some((j) => j.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: V.id, targetId: e });
        return;
      }
      if ($(e) && _(t)) {
        const j = v.find((ye) => ye.id === e), J = k.find((ye) => ye.id === t);
        if (J.type === "MASTER_DETAIL" && !J.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${j.name} es la cabecera de ${J.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: j.name,
          pageId: e,
          itemId: this.newMenuItemId(j.name)
        });
        return;
      }
      const K = this.model.identityProviders ?? [], de = (j) => K.some((J) => J.id === j);
      if (de(e) || de(t)) {
        const j = de(e) ? e : t, J = de(e) ? t : e;
        _(J) ? this.command({ kind: "set-identity-provider", id: J, targetId: j }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const me = (j) => (this.model.models ?? []).some((J) => J.id === j);
      if (me(e) || me(t)) {
        const j = me(e) ? e : t, J = me(e) ? t : e;
        if ($(J)) {
          this.command({ kind: "set-page-model", pageId: J, modelId: j });
          return;
        }
        if (_(J)) {
          this.command({ kind: "set-app-model", appId: J, modelId: j });
          return;
        }
        return;
      }
      const z = we(e);
      if (z != null && z.itemId && ((F = we(t)) != null && F.itemId || _(t))) {
        const j = we(t), J = this.menuEntryIn(z.appId, z.itemId);
        if (!J) return;
        if (j != null && j.itemId) {
          const ye = this.menuEntryIn(j.appId, j.itemId);
          if (!ye) return;
          const ce = (ft) => (ft ?? []).some((ii) => ii.id === j.itemId || ce(ii.children));
          if (z.appId === j.appId && (j.itemId === z.itemId || ce(J.entry.children)))
            return;
          const Oe = (B = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : B.renderRoot.querySelector(`g[data-node-id="${t}"]`), Ee = Oe == null ? void 0 : Oe.getBoundingClientRect(), Ye = Ee && s !== void 0 ? (s - Ee.top) / Math.max(1, Ee.height) : 0.5, ti = Ye < 0.3 ? "before" : Ye > 0.7 ? "after" : "nest";
          if (ti === "nest")
            this.command({
              kind: "move-menu-item",
              appId: z.appId,
              toAppId: j.appId,
              itemId: z.itemId,
              parentId: j.itemId
            });
          else {
            const ft = ti === "before" ? j.itemId : ye.beforeId ?? void 0;
            if (z.appId === j.appId && ye.parentId === J.parentId && ft === z.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: z.appId,
              toAppId: j.appId,
              itemId: z.itemId,
              parentId: ye.parentId ?? void 0,
              beforeItemId: ft
            });
          }
          return;
        }
        if (z.appId === t && !J.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: z.appId,
          toAppId: t,
          itemId: z.itemId
        });
        return;
      }
      const G = we(e) ?? we(t);
      if (G) {
        const j = we(e) ? e : t, J = we(e) ? t : e;
        if (((y = this.sceneFor("ui").nodes.find((Ee) => Ee.id === j)) == null ? void 0 : y.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const ye = this.model.modules.some(
          (Ee) => (Ee.useCases ?? []).some((Ye) => Ye.id === J)
        ), ce = (this.model.aggregates ?? []).some((Ee) => Ee.id === J), Oe = this.model.modules.flatMap((Ee) => Ee.queryServices ?? []).find((Ee) => (Ee.operations ?? []).some((Ye) => Ye.id === J));
        $(J) ? this.command({ kind: "set-menu-page", pageId: J, ...G }) : _(J) && J !== G.appId ? this.command({ kind: "set-menu-app", toAppId: J, ...G }) : ye ? this.command({ kind: "set-menu-use-case", useCaseId: J, ...G }) : ce ? this.command({ kind: "set-menu-aggregate", aggregateId: J, ...G }) : Oe && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Oe.id,
          queryOperationId: J,
          ...G
        });
        return;
      }
      if ((this.model.actors ?? []).some((j) => j.id === e) && _(t)) {
        (this.model.actorAppUses ?? []).some((j) => j.actorId === e && j.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const oe = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (oe) {
        const j = new Set(
          this.model.modules.flatMap((ce) => (ce.useCases ?? []).map((Oe) => Oe.id))
        ), J = new Set(
          this.model.modules.flatMap((ce) => (ce.queryServices ?? []).map((Oe) => Oe.id))
        ), ye = v.find((ce) => ce.id === oe.pageId);
        j.has(oe.other) ? (ye.buttons ?? []).some((ce) => ce.useCaseId === oe.other) || this.command({ kind: "add-page-button", pageId: oe.pageId, useCaseId: oe.other }) : J.has(oe.other) && this.command({ kind: "set-page-listing", pageId: oe.pageId, queryServiceId: oe.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [], k = Xi(e), _ = Xi(t), $ = this.model.transformations ?? [], A = this.model.customCodes ?? [], M = (z) => A.some((G) => G.id === z);
      if (M(e) && $.some((z) => z.id === t)) {
        this.command({ kind: "set-transformation-custom-code", id: t, targetId: e });
        return;
      }
      if (M(t) && $.some((z) => z.id === e)) {
        this.command({ kind: "set-transformation-custom-code", id: e, targetId: t });
        return;
      }
      if (M(e)) {
        const z = (_ == null ? void 0 : _.modelId) ?? (v.some((G) => G.id === t) ? t : null);
        if (z) {
          const G = (this.model.modelMappings ?? []).filter(
            (oe) => oe.sourceModelId === z || oe.targetModelId === z
          );
          G.length === 1 ? this.command({ kind: "set-mapping-custom-code", id: G[0].id, targetId: e }) : this.emit("modux-notice", {
            message: G.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
          });
          return;
        }
        return;
      }
      if ($.some((z) => z.id === t)) {
        if (_ || $.some((G) => G.id === e)) return;
        const z = k ? { modelId: k.modelId, fieldId: k.fieldId } : v.some((G) => G.id === e) ? { modelId: e } : null;
        z && this.command({ kind: "add-transformation-input", id: t, ...z });
        return;
      }
      if ($.some((z) => z.id === e)) {
        const z = _ ? { modelId: _.modelId, fieldId: _.fieldId } : v.some((G) => G.id === t) ? { modelId: t } : null;
        z && this.command({ kind: "set-transformation-output", id: e, ...z });
        return;
      }
      if (k && _) {
        if (k.modelId === _.modelId) {
          this.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
          return;
        }
        let z = (this.model.modelMappings ?? []).find(
          (G) => G.sourceModelId === k.modelId && G.targetModelId === _.modelId
        );
        if (!z) {
          const G = v.find((ce) => ce.id === k.modelId), oe = v.find((ce) => ce.id === _.modelId);
          if (!G || !oe) return;
          const j = (ce) => ce.replace(/[^a-zA-Z0-9]/g, ""), J = new Set((this.model.modelMappings ?? []).map((ce) => ce.id));
          let ye = `mapping-${se(G.name)}-${se(oe.name)}`;
          for (let ce = 2; J.has(ye); ce++) ye = `mapping-${se(G.name)}-${se(oe.name)}-${ce}`;
          this.command(
            { kind: "add-model-mapping", id: ye, name: `${j(G.name)}2${j(oe.name)}`, sourceId: G.id, targetId: oe.id },
            !1
          ), z = { id: ye, name: "", sourceModelId: G.id, targetModelId: oe.id };
        }
        this.command({
          kind: "add-model-mapping-rule",
          id: z.id,
          sourceId: k.fieldId,
          targetId: _.fieldId
        });
        return;
      }
      if (k && v.some((z) => z.id === t) && t !== k.modelId) {
        this.command({ kind: "move-model-field", modelId: k.modelId, fieldId: k.fieldId, targetId: t });
        return;
      }
      if (!v.some((z) => z.id === e) || !v.some((z) => z.id === t) || e === t || (this.model.modelMappings ?? []).some((z) => z.sourceModelId === e && z.targetModelId === t))
        return;
      const D = v.find((z) => z.id === e), V = v.find((z) => z.id === t), K = (z) => z.replace(/[^a-zA-Z0-9]/g, ""), de = new Set((this.model.modelMappings ?? []).map((z) => z.id));
      let me = `mapping-${se(D.name)}-${se(V.name)}`;
      for (let z = 2; de.has(me); z++) me = `mapping-${se(D.name)}-${se(V.name)}-${z}`;
      this.command({
        kind: "add-model-mapping",
        id: me,
        name: `${K(D.name)}2${K(V.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const a = /^apiop:(.+)@(.+)$/.exec(e);
    if (a) {
      const [, v, k] = a, _ = (this.model.proxyApis ?? []).find((V) => V.id === k), $ = (_ == null ? void 0 : _.targetApiId) ?? ((S = (this.model.apiImplementations ?? []).find(
        (V) => V.moduleId === k && (this.model.apis ?? []).some(
          (K) => K.id === V.apiId && K.operations.some((de) => de.id === v)
        )
      )) == null ? void 0 : S.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((V) => (V.useCases ?? []).map((K) => K.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: v,
          moduleId: k,
          targetUseCaseId: t
        });
        return;
      }
      if (!(_ != null && _.targetApiId)) return;
      let M = null;
      if (t === _.targetApiId)
        M = _.targetApiId;
      else {
        const V = /^apiimpl:(.+)@(.+)$/.exec(t);
        V && V[1] === _.targetApiId ? M = V[2] : this.model.modules.some((K) => K.id === t) && (this.model.apiImplementations ?? []).some(
          (K) => K.apiId === _.targetApiId && K.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (V) => V.proxyId === _.id && V.operationId === v && V.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: _.id,
        operationId: v,
        targetSiteId: M
      });
      return;
    }
    const o = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (o.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (D) => D.agentId === e && D.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.useCases ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (D) => D.agentId === e && D.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.mcpServers ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (D) => D.agentId === e && D.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((M) => M.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (D) => D.agentId === e && D.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((M) => M.operations.map((D) => D.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (D) => D.agentId === e && D.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (D) => D.agentId === e && D.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((M) => (M.queryServices ?? []).map((D) => D.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (D) => D.agentId === e && D.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (o.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (D) => D.agentId === e && D.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((M) => M.id === t) && ((this.model.agentRags ?? []).some(
        (D) => D.agentId === e && D.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find(($) => $.id === e), k = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((A) => A.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((A) => A.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((A) => A.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), _ = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      k && !_ && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const r = (this.model.rags ?? []).find((v) => v.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((_) => (_.readModels ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((_) => (_.tables ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((_) => _.id === t) || (this.model.proxyApis ?? []).some((_) => _.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((_) => _.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((_) => _.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find(($) => $.id === e), k = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (k) {
        const $ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        k.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const _ = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (_ && !(v.steps ?? []).some((A) => A.targetUseCaseId === t)) {
        const A = `wfs-${se(_.name)}`;
        let M = A;
        for (let D = 2; (v.steps ?? []).some((V) => V.id === M); D++)
          M = `${A}-${D}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: M,
          name: _.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), k = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), _ = v ?? k;
      if (_) {
        const $ = (this.model.emissions ?? []).find((V) => V.domainEventId === e), A = new Set((this.model.aggregates ?? []).map((V) => V.id)), M = new Set(
          this.model.modules.flatMap((V) => (V.domainServices ?? []).map((K) => K.id))
        ), D = new Set(
          this.model.modules.flatMap((V) => (V.useCases ?? []).map((K) => K.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: _.name,
          triggerAggregateId: $ && A.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && M.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && D.has($.sourceId) ? $.sourceId : void 0
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
          (_) => _.apiId === v.targetApiId && _.moduleId === t
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
    if (o.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((k) => (k.domainEvents ?? []).map((_) => _.id)),
        ...this.model.modules.flatMap((k) => (k.applicationEvents ?? []).map((_) => _.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (_) => _.eventId === e && _.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!l.has(e)) return;
    }
    if (l.has(e)) {
      const v = new Set(
        this.model.modules.flatMap((_) => (_.useCases ?? []).map(($) => $.id))
      ), k = new Set(
        this.model.modules.flatMap((_) => (_.queryServices ?? []).map(($) => $.id))
      );
      if (v.has(t) || k.has(t)) {
        (this.model.actorUses ?? []).some(
          ($) => $.actorId === e && $.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((_) => _.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((_) => _.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          ($) => $.actorId === e && $.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((_) => _.id === t)) {
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
        this.model.modules.flatMap((k) => (k.useCases ?? []).map((_) => _.id))
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
        ($) => [...$.domainEvents ?? [], ...$.applicationEvents ?? []].some((A) => A.id === k)
      )) {
        v.eventId !== k && this.command({ kind: "set-notification-event", id: v.id, targetId: k });
        return;
      }
      if ((this.model.actors ?? []).some(($) => $.id === k)) {
        (v.recipientRoleIds ?? []).includes(k) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: k });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const I = (v) => (this.model.documents ?? []).find((k) => k.id === v);
    if (I(e) || I(t)) {
      const v = I(e) ?? I(t), k = I(e) ? t : e;
      if ((this.model.models ?? []).find((M) => M.id === k)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: k });
        return;
      }
      const $ = this.model.modules.flatMap((M) => M.queryServices ?? []).find((M) => M.id === k), A = this.model.modules.flatMap((M) => (M.queryServices ?? []).flatMap((D) => (D.operations ?? []).map((V) => ({ op: V, qs: D })))).find(({ op: M }) => M.id === k);
      if ($ || A) {
        this.command({
          kind: "set-document-query",
          id: v.id,
          queryServiceId: ($ == null ? void 0 : $.id) ?? A.qs.id,
          queryOperationId: (A == null ? void 0 : A.op.id) ?? null
        });
        return;
      }
      this.emit("modux-notice", {
        message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
      });
      return;
    }
    const h = this.model.identityProviders ?? [], m = (v) => h.find((k) => k.id === v);
    if (m(e) || m(t)) {
      const v = m(e) ?? m(t), k = m(e) ? t : e;
      if (m(e) && this.model.externalSystems.some((A) => A.id === k)) {
        v.publishedByExternalSystemId !== k && this.command({ kind: "set-idp-publisher", id: v.id, targetId: k });
        return;
      }
      const _ = this.model.modules.some((A) => A.id === k), $ = (this.model.etlFlows ?? []).some((A) => A.id === k);
      if (_ || $) {
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
      const v = u(e) ?? u(t), k = u(e) ? t : e, _ = !u(e), $ = new Set(this.model.externalSystems.flatMap((G) => (G.tables ?? []).map((oe) => oe.id))), A = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((G) => G.id),
        ...(this.model.proxyApis ?? []).map((G) => G.id)
      ]), M = (this.model.apis ?? []).find((G) => G.operations.some((oe) => oe.id === k)), D = new Set(
        this.model.modules.flatMap((G) => [
          ...(G.domainEvents ?? []).map((oe) => oe.id),
          ...(G.applicationEvents ?? []).map((oe) => oe.id)
        ])
      );
      let V = null, K = {};
      if ($.has(k) ? (V = _ ? "SOURCE_PULL" : "WRITE_DB", K = { externalTableId: k }) : M ? (V = _ ? "SOURCE_PULL" : "WRITE_API", K = { apiId: M.id, operationId: k }) : A.has(k) ? (V = _ ? "SOURCE_PULL" : "WRITE_API", K = { apiId: k }) : D.has(k) && (V = _ ? "SOURCE_CONSUMER" : "WRITE_EVENT", K = { targetId: k }), !V) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (G) => G.type === V && (G.externalTableId ?? G.operationId ?? G.apiId ?? G.eventId) === (K.externalTableId ?? K.operationId ?? K.apiId ?? K.targetId)
      )) return;
      const me = new Set((v.steps ?? []).map((G) => G.id));
      let z = (v.steps ?? []).length + 1;
      for (; me.has(`ets-${z}`); ) z++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${z}`, stepType: V, ...K });
      return;
    }
    const f = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), b = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (f || b) {
      const v = (f ?? b).name, k = f ? { externalUseCaseId: e } : { externalTableId: e }, _ = (M) => f ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, $ = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (D) => _(D) && D.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se($.name)}`,
          name: `${$.name}Projection`,
          ...k,
          targetId: t
        });
        return;
      }
      const A = this.model.modules.find((M) => M.id === t);
      if (A) {
        (this.model.projections ?? []).some(
          (D) => _(D) && D.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se(A.name)}`,
          name: `${v}ViewProjection`,
          ...k,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const C = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (C) {
      const v = this.model.modules.flatMap((_) => _.readModels ?? []).find((_) => _.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(C.name)}-${se(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const k = this.model.modules.find((_) => _.id === t);
      if (k) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(C.name)}-${se(k.name)}`,
          name: `${C.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${C.name}View`
        });
        return;
      }
    }
    const N = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((k) => k.id))
    ), W = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((k) => k.id))
    ]), P = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((k) => k.id))
    ), x = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((k) => k.id))), w = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((k) => k.id))
    );
    if (x.has(e) && w.has(t)) {
      (this.model.queryCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const T = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((k) => k.id))
    );
    if (x.has(e) && T.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (x.has(e) && x.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const R = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (R && x.has(t)) {
      R.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (x.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (k) => k.sourceId === e && k.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (W.has(e) && N.has(t) || x.has(e) && P.has(t)) {
      (this.model.emissions ?? []).some(
        (k) => k.sourceId === e && k.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (N.has(e) || P.has(e)) {
      const v = P.has(e), k = this.model.modules.flatMap((z) => (v ? z.applicationEvents : z.domainEvents) ?? []).find((z) => z.id === e), _ = this.model.modules.flatMap((z) => (z.useCases ?? []).map((G) => ({ u: G, module: z }))).find(({ u: z }) => z.id === t), $ = this.model.modules.flatMap((z) => (z.readModels ?? []).map((G) => ({ rm: G, module: z }))).find(({ rm: z }) => z.id === t), A = this.model.modules.find((z) => z.id === t) ?? ($ == null ? void 0 : $.module) ?? (_ == null ? void 0 : _.module);
      if (!k || !A) return;
      const M = new Set((this.model.aggregates ?? []).map((z) => z.id)), D = new Set(
        this.model.modules.flatMap((z) => (z.domainServices ?? []).map((G) => G.id))
      ), V = (this.model.emissions ?? []).find(
        (z) => z.domainEventId === e && (v ? x.has(z.sourceId) : M.has(z.sourceId) || D.has(z.sourceId))
      );
      if (!V) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const K = !v && M.has(V.sourceId);
      if (_) {
        if (this.model.flows.some(
          (G) => G.archetype === "TRIGGERS" && G.triggerEvent === k.name && G.targetUseCaseId === _.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${se(k.name)}-${se(_.u.name)}`,
          name: _.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: K ? V.sourceId : "",
          triggerDomainServiceId: !v && !K ? V.sourceId : void 0,
          triggerUseCaseId: v ? V.sourceId : void 0,
          triggerEvent: k.name,
          targetId: A.id,
          targetUseCaseId: _.u.id
        });
        return;
      }
      const de = ($ == null ? void 0 : $.rm.name) ?? `${k.name}View`;
      if (this.model.flows.some(
        (z) => z.archetype === "MATERIALIZES" && z.triggerEvent === k.name && z.targetId === A.id && z.readModelName === de
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${se(k.name)}-${se(de)}`,
        name: de,
        archetype: "MATERIALIZES",
        triggerAggregateId: K ? V.sourceId : "",
        triggerDomainServiceId: !v && !K ? V.sourceId : void 0,
        triggerUseCaseId: v ? V.sourceId : void 0,
        triggerEvent: k.name,
        targetId: A.id,
        readModelName: de
      });
      return;
    }
    const L = /* @__PURE__ */ new Set([
      ...W,
      ...x,
      ...w,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((k) => k.id))
    ]);
    if (L.has(e) || L.has(t) || N.has(t) || P.has(t))
      return;
    const U = new Set(this.model.externalSystems.map((v) => v.id));
    if (U.has(e)) {
      if (new Set(
        this.model.modules.flatMap((A) => (A.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (U.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const k = (this.model.apis ?? []).find(
        (A) => A.operations.some((M) => M.id === t)
      ), _ = /^apiop:(.+)@(.+)$/.exec(t), $ = k ? { operationId: t, siteId: k.id } : _ ? { operationId: _[1], siteId: _[2] } : null;
      if ($) {
        (this.model.externalOperationUses ?? []).some(
          (M) => M.externalSystemId === e && M.operationId === $.operationId && M.siteId === $.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: $.operationId,
          targetSiteId: $.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((A) => A.id === t) || (this.model.proxyApis ?? []).some((A) => A.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (M) => M.sourceId === e && M.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    U.has(t) || l.has(t);
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
      const n = this.memberIdOf(i, s), a = (this.model.views ?? []).find((o) => o.id === this._activeViewId);
      if (n && (a != null && a.memberIds.includes(n))) {
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
    var s, n, a;
    if (this._view === "eventstorming" && e === "edge" && i === "es-custom") {
      const o = /^escc:(.+)$/.exec(t), r = o ? this.owningUseCaseOf(o[1]) : null;
      o && r && (this._selectedId = null, this.command({ kind: "set-use-case-step-custom-code", useCaseId: r.id, id: o[1], targetId: null }));
      return;
    }
    if (this._view === "eventstorming" && e === "node" && i === "custom-code") {
      this._selectedId = null, this.command({ kind: "remove-custom-code", id: t });
      return;
    }
    if (this._view === "ui") {
      if (e === "edge") {
        let o;
        if (o = /^idpauth:(.+)$/.exec(t))
          this.command({ kind: "set-identity-provider", id: o[1], targetId: null });
        else if (o = /^appheader:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-header-page", appId: o[1], pageId: null });
        else if (o = /^apphome:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-home-page", appId: o[1], pageId: null });
        else if (o = /^appmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-model", appId: o[1], modelId: null });
        else if (o = /^appview:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-view-page", appId: o[1], pageId: null });
        else if (o = /^appedit:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-edit-page", appId: o[1], pageId: null });
        else if (o = /^cruddetail:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-detail", pageId: o[1], targetId: null, toAppId: null });
        else if (o = /^crudnew:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-create", pageId: o[1], targetId: null, toAppId: null });
        else if (o = /^wizstep:([^:]+):(.+)$/.exec(t))
          this.command({ kind: "set-wizard-step-page", pageId: o[1], itemId: o[2], targetId: null });
        else if (o = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: o[1], useCaseId: o[2] });
        else if (o = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: o[1], queryServiceId: null });
        else if (o = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: o[1], modelId: null });
        else if (o = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: o[1], appId: o[2] });
        else if (o = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const r = we(o[1]);
          r && this.command({ kind: "set-menu-page", pageId: null, ...r });
        } else if (o = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const r = we(o[1]);
          r && this.command({ kind: "set-menu-app", toAppId: null, ...r });
        } else if (o = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const r = we(o[1]);
          r && this.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
        } else if (o = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const r = we(o[1]);
          r && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
        } else if (o = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const r = we(o[1]);
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
        const o = we(t);
        o && this.command({ kind: "remove-menu-item", ...o });
        return;
      }
      if (i === "wizard-step-row") {
        const o = /^wizrow:([^:]+):(.+)$/.exec(t);
        o && this.command({ kind: "remove-page-wizard-step", pageId: o[1], targetId: o[2] });
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
      if (e === "edge" && i === "ui-custom-page") {
        const o = /^ccpage:(.+)$/.exec(t);
        o && this.command({ kind: "set-page-custom-code", id: o[1], targetId: null });
        return;
      }
      if (e === "edge" && i === "cc-uses") {
        const o = /^ccuse:(.+)->(.+)$/.exec(t);
        o && this.command({ kind: "remove-custom-code-use", id: o[1], elementId: o[2] });
        return;
      }
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "model-mapping") {
      const o = /^mapping:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "remove-model-mapping", id: o[1] }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "mapping-rule") {
      const o = /^maprule:([^:]+):(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "remove-model-mapping-rule", id: o[1], itemId: o[2] }));
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "model-field") {
      const o = Xi(t);
      o && (this._selectedId = null, this.command({ kind: "remove-model-field", modelId: o.modelId, fieldId: o.fieldId }));
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
      const o = /^cctf:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "set-transformation-custom-code", id: o[1], targetId: null }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "custom-of-mapping") {
      const o = /^ccmap:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "set-mapping-custom-code", id: o[1], targetId: null }));
      return;
    }
    if (this._view === "mappings" && e === "node" && i === "transformation") {
      this._selectedId = null, this.command({ kind: "remove-transformation", id: t });
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "transform-input") {
      const o = /^tfin:([^:]+):([^:]+):(.*)$/.exec(t);
      o && (this._selectedId = null, this.command({
        kind: "remove-transformation-input",
        id: o[1],
        modelId: o[2],
        ...o[3] ? { fieldId: o[3] } : {}
      }));
      return;
    }
    if (this._view === "mappings" && e === "edge" && i === "transform-output") {
      const o = /^tfout:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "set-transformation-output", id: o[1] }));
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const o = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!o) return;
      const r = this.owningWorkflowOf(o[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
        id: o[2],
        dependsOnStepId: o[1]
      });
      return;
    }
    if (e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
      return;
    }
    if (e === "node" && i === "workflow-step") {
      const o = this.owningWorkflowOf(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: o.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "api-impl-wire") {
      const o = /^apiimplwire:(.+)@(.+)$/.exec(t);
      if (!o) return;
      const [, r, l] = o, p = (s = (this.model.apis ?? []).find(
        (g) => g.operations.some((I) => I.id === r)
      )) == null ? void 0 : s.id;
      if (!p) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, moduleId: l });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-op-use") {
      const o = /^extopuse:(.+)->(.+)@(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({
        kind: "remove-external-operation-use",
        sourceId: o[1],
        operationId: o[2],
        targetSiteId: o[3]
      });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const o = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!o) return;
      const [, r, l, p] = o, g = /^apiimpl:.+@(.+)$/.exec(p), I = g ? g[1] : p;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: r, targetSiteId: I });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const o = /^rel:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const o = /^emit:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "projection") {
      const o = /^proj:(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: o[1] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "uc-call") {
      const o = /^uccall:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-trigger") {
      const o = /^notif:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "set-notification-event", id: o[1], targetId: null }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-recipient") {
      const o = /^notifto:([^:]+):(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "remove-notification-recipient", id: o[1], roleId: o[2] }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "document-query") {
      const o = /^docq:(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "set-document-query", id: o[1], queryServiceId: null, queryOperationId: null }));
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
      const o = /^idp(?:trust|svc):(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "set-identity-provider", id: o[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "idp-federation") {
      const o = /^idpfed:(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "set-idp-publisher", id: o[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "identity-provider") {
      this._selectedId = null, this.command({ kind: "remove-identity-provider", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const o = /^etl:([^:]+):(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: o[1], id: o[2] });
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
      const o = /^deploy:(.+)->(.+)$/.exec(t);
      o && (this._selectedId = null, this.command({ kind: "remove-service-code-module", serviceId: o[1], id: o[2] }));
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "code-module") {
      this._selectedId = null, this.command({ kind: "remove-code-module", id: t });
      return;
    }
    if (this._view === "context-map" && this._detail === "distribution" && e === "node") {
      const o = this.sceneFor("context-map");
      for (let r = (n = o.nodes.find((l) => l.id === t)) == null ? void 0 : n.parentId; r; ) {
        if ((this.model.codeModules ?? []).some((l) => l.id === r)) {
          this._selectedId = null, this.command({ kind: "remove-code-module-element", id: r, elementId: t });
          return;
        }
        r = (a = o.nodes.find((l) => l.id === r)) == null ? void 0 : a.parentId;
      }
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "st-fire") {
      const o = /^stfire:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "set-scheduled-trigger-target", id: o[1], targetUseCaseId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "scheduled-trigger") {
      this._selectedId = null, this.command({ kind: "remove-scheduled-trigger", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agg-call") {
      const o = /^aggcall:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate-call", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "qs-call") {
      const o = /^qscall:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "external-call") {
      const o = /^extcall:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-uc-call") {
      const o = /^extuccall:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-use") {
      const o = /^mcp:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-external-use") {
      const o = /^mcpx:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-mcp") {
      const o = /^mcpsv:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-mcp", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "gateway-exposure") {
      const o = /^gwx:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-gateway-exposure", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-gateway") {
      const o = /^aggw:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-gateway", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api-op") {
      const o = /^agapi:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api-operation", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-query") {
      const o = /^agqs:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-query", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-delegate") {
      const o = /^agag:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-delegate", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-agent") {
      const o = /^useag:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-actor-agent", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-trigger") {
      const o = /^evag:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-trigger", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (e === "node" && i === "mcp-gateway") {
      this._selectedId = null, this.command({ kind: "remove-mcp-gateway", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-rag") {
      const o = /^agrag:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "rag-source") {
      const o = /^ragsrc:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api" || i === "rag-coarse")) {
      const o = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: o[2], targetId: o[1] });
      return;
    }
    if (e === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: t });
      return;
    }
    if (e === "node" && i === "rag-content-source") {
      const o = /^ragcs:(.+?):(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-rag-content-source", sourceId: o[1], uri: o[2] });
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
      const o = /^apiwire:(.+)$/.exec(t), r = o ? this.owningApiOf(o[1]) : null;
      if (!o || !r) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: r.id, id: o[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
      return;
    }
    if (e === "node" && i === "api-impl") {
      const o = /^apiimpl:(.+)@(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-implementation", apiId: o[1], moduleId: o[2] });
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
      const o = this.owningApiOf(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation", apiId: o.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-use") {
      const o = /^use:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-ext") {
      const o = /^extdep:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-actor-external", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-dep") {
      const o = /^xdep:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-external-dependency", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "wf-chain") {
      const o = /^wfchain:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "set-workflow-trigger", id: o[2], triggerEvent: "" });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api") {
      const o = /^agapi:(.+)->(.+)$/.exec(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api", sourceId: o[1], targetId: o[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const o = /^pxt:(.+)->(.+)$/.exec(t);
      if (!o || !(this.model.proxyApis ?? []).some((r) => r.id === o[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: o[1], targetId: "" });
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
      const o = this.owningProcessOf(t);
      if (!o) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: o.id, id: t });
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
    const t = (this.model.processes ?? []).find((n) => n.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
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
    const e = (this.model.views ?? []).find((n) => n.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (n, a, o = {}) => E`
      <label
        class="${o.child ? "child" : ""} ${o.implicit && !t.has(n) ? "implicit" : ""}"
        title=${o.implicit && !t.has(n) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(n)}
          @change=${(r) => this.toggleViewMember(n, r.target.checked)}
        />
        ${a}
      </label>
    `, s = (n, a) => a.length ? E`<h4>${n}</h4>${a}` : "";
    return E`
      <aside class="view-tree" @pointerdown=${(n) => n.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${s(
      "Contextos",
      this.model.modules.flatMap((n) => [
        i(n.id, n.name),
        ...(this.model.aggregates ?? []).filter((a) => a.moduleId === n.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(n.id) }))
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
            const n = we(i);
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
    const i = `view-${se(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((m) => m.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((m) => t.has(m.id)), s = new Set(i.map((m) => m.id)), n = this.model.externalSystems.filter((m) => t.has(m.id)), a = new Set(n.map((m) => m.id)), o = (this.model.aggregates ?? []).filter(
      (m) => t.has(m.id) || s.has(m.moduleId)
    ), r = new Set(o.map((m) => m.id)), l = (this.model.uiApps ?? []).filter((m) => t.has(m.id)), p = /* @__PURE__ */ new Set(), g = (m) => {
      for (const d of m ?? [])
        d.pageId && p.add(d.pageId), g(d.children);
    };
    l.forEach((m) => g(m.menuItems));
    const I = (this.model.pages ?? []).filter(
      (m) => t.has(m.id) || p.has(m.id)
    ), h = new Set(l.map((m) => m.id));
    return {
      ...this.model,
      uiApps: l,
      pages: I,
      actorAppUses: (this.model.actorAppUses ?? []).filter((m) => h.has(m.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (m) => s.has(m.sourceId) && s.has(m.targetId)
      ),
      flows: this.model.flows.filter(
        (m) => t.has(m.id) || (s.has(m.sourceId) || a.has(m.sourceId)) && (s.has(m.targetId) || a.has(m.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((m) => r.has(m.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (m) => r.has(m.sourceAggregateId) && r.has(m.targetAggregateId)
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
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? a.has(m.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (m) => t.has(m.id) || (m.publishedByExternalSystemId ? a.has(m.publishedByExternalSystemId) : !1)
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
    Y.CRUD_ROUTES[e.elementType] ? this._drawer = e : this.emit("modux-activate", e);
  }
  renderDrawer() {
    if (!this._drawer) return null;
    const e = Y.CRUD_ROUTES[this._drawer.elementType], t = this._drawer;
    return E`
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
    })() : vn(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const o of a ?? [])
        o.id && t.add(o.id), i(o.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const s = `mi-${se(e)}`;
    let n = s;
    for (let a = 2; t.has(n); a++) n = `${s}-${a}`;
    return n;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((a) => a.id === e);
    let s = null;
    const n = (a, o) => {
      var l;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { node: r[p], parentId: o, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), n(r[p].children, r[p].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, a) {
    const o = a ?? this.allComponentIds(), r = (I) => {
      if (!n) return I.id;
      const h = `cmp-${se(I.kind)}`;
      let m = h;
      for (let d = 2; o.has(m) || o.has(`${m}-tab-1`); d++) m = `${h}-${d}`;
      return o.add(m), m;
    }, l = [], p = (I, h) => {
      const m = r(I);
      l.push({ kind: "add-page-component", pageId: e, componentId: m, componentKind: I.kind, parentComponentId: h }), I.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${m}-tab-2` })), l.push({
        kind: "set-page-component",
        pageId: e,
        componentId: m,
        title: I.title ?? null,
        text: I.text ?? null,
        label: I.label ?? null,
        useCaseId: I.useCaseId ?? null,
        mappingId: I.mappingId ?? null,
        modelId: I.modelId ?? null,
        queryServiceId: I.queryServiceId ?? null,
        queryOperationId: I.queryOperationId ?? null,
        fieldId: I.fieldId ?? null,
        stereotype: I.stereotype ?? null,
        colspan: I.colspan ?? null
      });
      for (const d of I.children ?? []) p(d, m);
      return m;
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
      for (const o of a ?? [])
        t.add(o.id), i(o.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const s = `cmp-${se(e)}`;
    let n = s;
    for (let a = 2; t.has(n) || t.has(`${n}-tab-1`); a++) n = `${s}-${a}`;
    return n;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var a;
    if (i === t) return;
    const s = (((a = (this.model.pages ?? []).find((o) => o.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((o) => o.id ?? o.pageId), n = s.indexOf(t);
    n >= 0 && (i ? s[n + 1] === i : n === s.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let s = null;
    const n = (a, o) => {
      var l;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { entry: r[p], parentId: o, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), n(r[p].children, r[p].id ?? null);
    };
    return n(i == null ? void 0 : i.menuItems, null), s;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var o;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, s = null;
    if (this._selectedCmp) {
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, re.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, s = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (o = (r.node.children ?? [])[0]) == null ? void 0 : o.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: n, rootId: a } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const r of n) this.command(r, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: a }]), this._selectedCmp = { pageId: t, componentId: a };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return E`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var o;
      const { id: i, w: s, h: n } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((o = a.sizes) == null ? void 0 : o[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...a,
        sizes: { ...a.sizes ?? {}, [i]: { w: s, h: n } }
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
      const { pageId: i, fieldId: s, stereotype: n, colspan: a, label: o } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: s, stereotype: n, colspan: a, label: o });
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
            (n) => (n.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${n.name})` }))
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
    var r;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const s = i.sceneFromClient(e.clientX, e.clientY), n = i.nodeIdAtClient(e.clientX, e.clientY), a = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let o;
    try {
      o = JSON.parse(t);
    } catch {
      return;
    }
    o.new ? this.createFromPalette(o.new, s, n, a) : o.existing && this.placeExistingFromPalette(o.existing, s, n, e.clientX, e.clientY, a);
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
      s.modules.map((a) => a.id),
      s.modules.flatMap((a) => (a.useCases ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.domainEvents ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.applicationEvents ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.readModels ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.domainServices ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.queryServices ?? []).map((o) => o.id)),
      s.modules.flatMap((a) => (a.scheduledTriggers ?? []).map((o) => o.id)),
      (s.aggregates ?? []).map((a) => a.id),
      (s.entities ?? []).map((a) => a.id),
      (s.actors ?? []).map((a) => a.id),
      s.externalSystems.map((a) => a.id),
      s.externalSystems.flatMap((a) => (a.useCases ?? []).map((o) => o.id)),
      s.externalSystems.flatMap((a) => (a.tables ?? []).map((o) => o.id)),
      s.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((o) => o.id)),
      (s.apis ?? []).map((a) => a.id),
      (s.apis ?? []).flatMap((a) => (a.operations ?? []).map((o) => o.id)),
      (s.proxyApis ?? []).map((a) => a.id),
      (s.aiAgents ?? []).map((a) => a.id),
      (s.mcpGateways ?? []).map((a) => a.id),
      (s.rags ?? []).map((a) => a.id),
      (s.workflows ?? []).map((a) => a.id),
      (s.workflows ?? []).flatMap((a) => (a.steps ?? []).map((o) => o.id)),
      (s.etlFlows ?? []).map((a) => a.id),
      (s.identityProviders ?? []).map((a) => a.id),
      (s.notifications ?? []).map((a) => a.id),
      (s.documents ?? []).map((a) => a.id),
      (s.uiApps ?? []).map((a) => a.id),
      (s.pages ?? []).map((a) => a.id),
      (s.codeModules ?? []).map((a) => a.id),
      (s.services ?? []).map((a) => a.id),
      (s.models ?? []).flatMap((a) => (a.fields ?? []).map((o) => o.id)),
      (s.customCodes ?? []).map((a) => a.id)
    ])
      n.forEach((a) => i.add(a));
    for (let n = 1; ; n++) {
      const a = n === 1 ? e : `${e} ${n}`, o = `${t}${se(a)}`;
      if (!i.has(o)) return { id: o, name: a };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var a, o;
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
      return ((o = (this.model.aggregates ?? []).find((p) => p.moduleId === l)) == null ? void 0 : o.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null;
    if (e === "model-field")
      return s.find((r) => (this.model.models ?? []).some((l) => l.id === r)) ?? null;
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
    var m, d, u, f, b, C, N, W;
    const n = Y.PALETTE_NEW.find((P) => P.type === e);
    if (!n) return;
    if (e === "custom-code" && this._view === "design") {
      const P = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, x = P ? P[1] : i && (this.model.pages ?? []).some((R) => R.id === i) ? i : null;
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: w, name: T } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: w, name: T }, !1), P ? (this.command({ kind: "set-page-component-custom-code", pageId: x, componentId: P[2], targetId: w }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: x, targetId: w }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const P = e.slice(4), x = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = x ? x[1] : i && (this.model.pages ?? []).some((F) => F.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let T = x ? x[2] : void 0, R = null;
      if (P === "tab") {
        let F = null, B = T ? this.componentIn(w, T) : null;
        for (; B; ) {
          if (B.node.kind === "tabLayout") {
            F = B.node.id;
            break;
          }
          B = B.parentId ? this.componentIn(w, B.parentId) : null;
        }
        if (!F) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const y = this.componentIn(w, F).node, S = this.newComponentId("tab"), v = `Pestaña ${(y.children ?? []).filter((k) => k.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: w, componentId: S, componentKind: "tab", parentComponentId: F }, !1), this.command({ kind: "set-page-component", pageId: w, componentId: S, title: v }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: S }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const F = this.componentIn(w, s.componentId);
        F && F.node.kind === "tab" ? T = F.node.id : F && (T = F.parentId ?? void 0, R = s.pos === "before" ? s.componentId : F.beforeId);
      } else if (T) {
        const F = ((m = this.componentIn(w, T)) == null ? void 0 : m.node) ?? null;
        (F == null ? void 0 : F.kind) === "tabLayout" && (F.children ?? [])[0] && (T = (F.children ?? [])[0].id);
      }
      const L = this.newComponentId(P), U = {
        kind: "add-page-component",
        pageId: w,
        componentId: L,
        componentKind: P,
        parentComponentId: T
      };
      if (!R) {
        this.command(U);
        return;
      }
      this.command(U, !1), this.command(
        { kind: "move-page-component", pageId: w, componentId: L, parentComponentId: T ?? null, beforeComponentId: R },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: L }]);
      return;
    }
    const a = this._view, o = this.sceneFor(a), r = (P, x) => {
      const w = this.viewLayout(a), T = x ? o.nodes.find((L) => L.id === x) : void 0, R = T ? { x: Math.round(t.x - T.x), y: Math.round(t.y - T.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...w, nodes: { ...w.nodes, [P]: R } }), { kind: "move-node", view: a, id: P, pos: null };
    }, l = (P, x, w) => {
      const T = this.inverseOf(P) ?? [];
      this.command(P, !1);
      const R = r(x, w);
      this.pushUndoEntry([...T, R]);
    };
    if (!n.child) {
      const P = {
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
        "custom-code": "cc-"
      }, { id: x, name: w } = this.uniquePaletteName(n.label, P[e] ?? ""), T = e === "module" ? { kind: "add-module", id: x, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: x, name: w } : e === "external-system" ? { kind: "add-external-system", id: x, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: x, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: x, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: x, name: w } : e === "rag" ? { kind: "add-rag", id: x, name: w } : e === "api" ? { kind: "add-api", id: x, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: x, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: x, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: x, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: x, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: x, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: x, name: w } : e === "transformation" ? { kind: "add-transformation", id: x, name: w } : e === "custom-code" ? { kind: "add-custom-code", id: x, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: x, name: w } : {
        kind: "add-workflow",
        id: x,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      if (T.kind === "create-ui-app") {
        const R = [];
        for (let U = i ?? void 0; U; )
          R.push(U), U = (d = o.nodes.find((F) => F.id === U)) == null ? void 0 : d.parentId;
        const L = R.find((U) => this.model.modules.some((F) => F.id === U));
        if (L) {
          l({ ...T, moduleId: L }, x, L);
          return;
        }
      }
      l(T, x);
      return;
    }
    if (e === "ui-wizard-step") {
      const P = [];
      for (let L = i ?? void 0; L; )
        P.push(L), L = (u = o.nodes.find((U) => U.id === L)) == null ? void 0 : u.parentId;
      const x = P.map((L) => {
        var U;
        return ((U = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : U[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((U) => U.id === L && U.type === "WIZARD"));
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const w = ((f = (this.model.pages ?? []).find((L) => L.id === x)) == null ? void 0 : f.wizardSteps) ?? [], T = new Set(w.map((L) => L.id ?? L.pageId));
      let R = w.length + 1;
      for (; T.has(`wzs-${R}`); ) R++;
      this.command({ kind: "add-page-wizard-step", pageId: x, itemId: `wzs-${R}`, label: `Paso ${R}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const P = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", x = P === "CRUD" ? "CRUD" : P === "WIZARD" ? "Wizard" : "Página", { id: w, name: T } = this.uniquePaletteName(x, "page-"), R = [];
      for (let F = i ?? void 0; F; )
        R.push(F), F = (b = o.nodes.find((B) => B.id === F)) == null ? void 0 : b.parentId;
      const L = R.find((F) => (this.model.uiApps ?? []).some((B) => B.id === F)), U = R.map((F) => {
        var B;
        return ((B = /^wizrow:([^:]+):/.exec(F)) == null ? void 0 : B[1]) ?? F;
      }).find((F) => (this.model.pages ?? []).some((B) => B.id === F && B.type === "WIZARD"));
      if (U) {
        const F = o.nodes.find((y) => y.id === U);
        F && (t.x = F.x + F.w / 2 + 160, t.y = F.y - F.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: T, pageType: P }, !1), this.command({ kind: "add-page-wizard-step", pageId: U, targetId: w }, !1);
        const B = r(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, B]), this.emit("modux-notice", { message: `${T} creada como paso del wizard` });
        return;
      }
      if (L) {
        const F = o.nodes.find((B) => B.id === L);
        F && (t.x = F.x + F.w / 2 + 160, t.y = F.y - F.h / 2 + 40);
      }
      l(
        L ? { kind: "create-ui-page", id: w, name: T, pageType: P, appId: L, menuLabel: T } : { kind: "create-ui-page", id: w, name: T, pageType: P },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const P = [];
      for (let U = i ?? void 0; U; )
        P.push(U), U = (C = o.nodes.find((F) => F.id === U)) == null ? void 0 : C.parentId;
      const x = P.find((U) => (this.model.uiApps ?? []).some((F) => F.id === U));
      if (!x) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const w = /* @__PURE__ */ new Set(), T = (U) => {
        for (const F of U ?? [])
          w.add(F.label), T(F.children);
      };
      (this.model.uiApps ?? []).forEach((U) => T(U.menuItems));
      let R = "Entrada";
      for (let U = 2; w.has(R); U++) R = `Entrada ${U}`;
      const L = P.map((U) => we(U)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: x,
        label: R,
        itemId: this.newMenuItemId(R),
        parentId: L == null ? void 0 : L.itemId,
        parentLabel: L != null && L.itemId || L == null ? void 0 : L.label
      });
      return;
    }
    if (e === "etl-transform") {
      const P = [];
      for (let R = i ?? void 0; R; )
        P.push(R), R = (N = o.nodes.find((L) => L.id === R)) == null ? void 0 : N.parentId;
      const x = P.map((R) => (this.model.etlFlows ?? []).find((L) => L.id === R)).find(Boolean);
      if (!x) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const w = new Set((x.steps ?? []).map((R) => R.id));
      let T = (x.steps ?? []).length + 1;
      for (; w.has(`ets-${T}`); ) T++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: x.id,
        id: `ets-${T}`,
        name: `Transformación ${T}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const P = this.model.workflows ?? [], x = [];
      for (let F = i ?? void 0; F; )
        x.push(F), F = (W = o.nodes.find((B) => B.id === F)) == null ? void 0 : W.parentId;
      const w = x.map((F) => P.find((B) => B.id === F)).find(Boolean), T = x.map((F) => {
        const B = P.find((y) => (y.steps ?? []).some((S) => S.id === F));
        return B ? { owner: B, stepId: F } : null;
      }).find(Boolean), R = w ?? (T == null ? void 0 : T.owner);
      if (!R) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: L, name: U } = this.uniquePaletteName("Paso", "wfs-");
      T && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: R.id,
          id: L,
          name: U,
          ...T ? { dependsOnStepIds: [T.stepId], afterStepId: T.stepId } : {}
        },
        L
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${R.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const P = this.dropContainerFor("api", i);
      if (!P) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: x, name: w } = this.uniquePaletteName("API", "api-"), T = { kind: "add-api", id: x, name: w }, R = this.inverseOf(T) ?? [];
      this.command(T, !1), this.model.externalSystems.some((B) => B.id === P) ? this.command({ kind: "set-api-publisher", id: x, targetId: P }, !1) : this.command({ kind: "add-api-implementation", apiId: x, moduleId: P }, !1);
      const L = this.viewLayout(this._view), U = this.sceneFor(this._view).nodes.find((B) => B.id === P), F = U ? { x: Math.round(t.x - U.x), y: Math.round(t.y - U.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...L, nodes: { ...L.nodes, [x]: F } }), this.pushUndoEntry([...R, { kind: "move-node", view: this._view, id: x, pos: null }]);
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
    }, { id: I, name: h } = this.uniquePaletteName(n.label, g[e] ?? "");
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: I, name: h, moduleId: p }, I, p);
    else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: I, name: h });
    else if (e === "code-module")
      l({ kind: "add-code-module", id: I, name: h, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: I, name: h, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        I,
        p
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: I, name: h, moduleId: p }, I, p);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: I, name: h, moduleId: p }, I, p);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: I, name: h, moduleId: p }, I, p);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: I, name: h, moduleId: p }, I, p);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: I, name: h, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: I, name: h, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: I, name: h, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: I, name: h, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const P = (this.model.aggregates ?? []).find((x) => x.id === p);
      l({ kind: "add-read-model", id: I, name: h, aggregateId: p }, I, (P == null ? void 0 : P.moduleId) ?? p);
    } else if (e === "api-operation") {
      const P = (this.model.apis ?? []).find((L) => L.id === p), x = new Set(((P == null ? void 0 : P.operations) ?? []).map((L) => L.id));
      let w = h, T = `apiop-${p.replace(/^api-/, "")}-${se(w)}`;
      for (let L = 2; x.has(T); L++)
        w = `${n.label} ${L}`, T = `apiop-${p.replace(/^api-/, "")}-${se(w)}`;
      l({ kind: "add-api-operation", apiId: p, id: T, name: w }, T, p), o.nodes.some(
        (L) => L.parentId === p && (L.kind === "api-operation" || L.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(P == null ? void 0 : P.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const P = this.model.modules.flatMap((R) => R.useCases ?? []).find((R) => R.id === p), x = new Set((P == null ? void 0 : P.stepIds) ?? []);
      let w = h, T = `step-${se(w)}`;
      for (let R = 2; x.has(T); R++)
        w = `${n.label} ${R}`, T = `step-${se(w)}`;
      l({ kind: "add-use-case-step", useCaseId: p, id: T, name: w }, T, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(P == null ? void 0 : P.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: I, name: h, moduleId: p }, I, p) : e === "external-table" ? l({ kind: "add-external-table", id: I, name: h, moduleId: p }, I, p) : e === "mcp-server" && l({ kind: "add-mcp-server", id: I, name: h, moduleId: p }, I, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var h;
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
    const n = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const m = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!m) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const d = (this.model.pages ?? []).find((u) => u.id === n[1]);
      if (((d == null ? void 0 : d.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: n[1], useCaseId: e, type: n[2] }), this.emit("modux-notice", { message: `Botón de ${m.name} en la barra ${n[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, o = a ? a[1] : t && (this.model.pages ?? []).some((m) => m.id === t) ? t : null;
    if (!o) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = a ? ((h = this.componentIn(o, a[2])) == null ? void 0 : h.node) ?? null : null, l = this.model.modules.flatMap((m) => m.useCases ?? []).find((m) => m.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: o, componentId: r.id, useCaseId: e, label: r.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: o, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((m) => m.id === e);
    if (p) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: o, componentId: r.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: o, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((m) => m.id === e);
    if (g && (r == null ? void 0 : r.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: o, componentId: r.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const I = this.model.modules.flatMap((m) => (m.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((u) => ({ op: u, qs: d })))).find(({ op: m }) => m.id === e);
    if (I) {
      (r == null ? void 0 : r.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: o,
        componentId: r.id,
        queryOperationId: I.op.id,
        queryServiceId: I.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: o, queryServiceId: I.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${I.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, i, s, n, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, a);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, s, n);
      return;
    }
    const o = this._view, r = this.sceneFor(o), l = r.nodes.find((h) => h.id === e);
    if (!l) {
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
    const p = this.viewLayout(o), g = l.parentId ? r.nodes.find((h) => h.id === l.parentId) : void 0, I = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(o, { ...p, nodes: { ...p.nodes, [e]: I } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Y.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type === "custom-code" || s.type.startsWith("cmp:") : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(s.type) : !["page", "menu-item", "model-field", "transformation", "custom-code"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
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
      const n = t.filter((a) => a.group === s);
      return n.length ? E`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (a) => E`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(o) => this.onPaletteDragStart(o, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${bt[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
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
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${bt[s.symbol]}
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
    var t, i, s, n, a, o, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${se(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), g = this._newTriggerEvent.trim();
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
          triggerAggregateId: this._newTriggerAggId || ((r = (o = this.model.aggregates) == null ? void 0 : o[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Uo(i, t.nodes) : e === "flows" ? Ko(i, t.nodes) : e === "processes" ? Ss(i, t.nodes) : e === "workflows" ? oc(i, t.nodes) : e === "ui" ? pc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? uc(i, t.nodes) : e === "eventstorming" ? Ql(i, t.nodes) : To(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const n of s.nodes) {
        const a = this.diff[n.id] ?? this.diff[n.id.replace(/^(tgt:|flow:)/, "")];
        a && (n.diffKind = a);
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
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), n = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, o = await mc(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: o, edges: {}, sizes: r.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
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
      ${this._view === "design" ? E`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? E`<modux-explorer
            .model=${this.model}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = vn(t.detail.id, i);
      s && this.openInDrawer(s);
    }}
            @explorer-connect=${(t) => {
      const { sourceId: i, targetId: s, x: n, y: a } = t.detail, o = (l) => this.model.modules.some((p) => p.id === l);
      if (o(i) && o(s)) {
        const l = this.model.relations.find(
          (p) => p.sourceId === i && p.targetId === s && p.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: s,
          mode: l ? "edit" : "create",
          x: n ?? this.clientWidth / 2,
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
      const n = `view-${se(t.detail.name)}`;
      this.command({ kind: "add-view", id: n, name: t.detail.name, memberIds: s }), this._activeViewId = n, this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${s.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? E`
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
        ${Pc.map(
      (s) => E`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${ds[s].abbr}</span>
              <span class="name">${ds[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Y.styles = mt`
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
Y.CRUD_ROUTES = {
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
Y.PALETTE_GROUPS = [
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
  { type: "code-module", label: "Módulo", child: !0, symbol: "component", color: "#334155", group: "Distribución" },
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
  ae({ attribute: !1 })
], Y.prototype, "model", 2);
ie([
  ae({ attribute: !1 })
], Y.prototype, "layout", 2);
ie([
  ae({ attribute: !1 })
], Y.prototype, "diff", 2);
ie([
  q()
], Y.prototype, "_view", 2);
ie([
  q()
], Y.prototype, "_detail", 2);
ie([
  q()
], Y.prototype, "_relationType", 2);
ie([
  q()
], Y.prototype, "_relationPicker", 2);
ie([
  q()
], Y.prototype, "_extDepPicker", 2);
ie([
  q()
], Y.prototype, "_selectedId", 2);
ie([
  q()
], Y.prototype, "_paletteOpen", 2);
ie([
  q()
], Y.prototype, "_drawer", 2);
ie([
  q()
], Y.prototype, "_paletteFilter", 2);
ie([
  q()
], Y.prototype, "_paletteTab", 2);
ie([
  q()
], Y.prototype, "_selectedCmp", 2);
ie([
  q()
], Y.prototype, "_fullscreen", 2);
ie([
  q()
], Y.prototype, "_tilt", 2);
ie([
  q()
], Y.prototype, "_helpOpen", 2);
ie([
  q()
], Y.prototype, "_newName", 2);
ie([
  q()
], Y.prototype, "_newModuleId", 2);
ie([
  q()
], Y.prototype, "_newArchetype", 2);
ie([
  q()
], Y.prototype, "_newTriggerAggId", 2);
ie([
  q()
], Y.prototype, "_newTriggerEvent", 2);
ie([
  q()
], Y.prototype, "_newTargetId", 2);
ie([
  q()
], Y.prototype, "_undoStack", 2);
ie([
  q()
], Y.prototype, "_redoStack", 2);
ie([
  q()
], Y.prototype, "_newStepName", 2);
ie([
  q()
], Y.prototype, "_newStepType", 2);
ie([
  q()
], Y.prototype, "_newStepRole", 2);
ie([
  q()
], Y.prototype, "_newStepDeadline", 2);
ie([
  q()
], Y.prototype, "_editStepRole", 2);
ie([
  q()
], Y.prototype, "_editStepDeadline", 2);
ie([
  q()
], Y.prototype, "_editStepComp", 2);
ie([
  q()
], Y.prototype, "_newStepUseCase", 2);
ie([
  q()
], Y.prototype, "_newStepEmits", 2);
ie([
  q()
], Y.prototype, "_editStepUseCase", 2);
ie([
  q()
], Y.prototype, "_editStepEmits", 2);
ie([
  q()
], Y.prototype, "_editStepAwaits", 2);
ie([
  q()
], Y.prototype, "_multi", 2);
ie([
  q()
], Y.prototype, "_newViewName", 2);
ie([
  q()
], Y.prototype, "_activeViewId", 2);
ie([
  q()
], Y.prototype, "_newRagSourceType", 2);
ie([
  q()
], Y.prototype, "_newRagSourceUri", 2);
ie([
  q()
], Y.prototype, "_addMemberKey", 2);
ie([
  q()
], Y.prototype, "_treeOpen", 2);
ie([
  q()
], Y.prototype, "_deletePicker", 2);
Y = ie([
  ht("modux-editor")
], Y);
var Nc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, ke = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Rc(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (n = (s ? o(t, i, n) : o(n)) || n);
  return s && n && Nc(t, i, n), n;
};
let ge = class extends Le {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._writes = 0, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._taggingVersion = !1, this._newTagName = "", this._tagsOpen = !1, this._tags = [], this._diff = null, this._diffListOpen = !1, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
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
    ], t = (s) => ge.TYPE_LABELS[s] ?? s;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: a, cls: o }) => {
      const r = this._diff.changes.filter((l) => l.kind === s);
      return r.length ? E`
            <div class="diff-group">${n} (${r.length})</div>
            ${r.map(
        (l) => E`
                <div class="diff-row">
                  <span class="diff-mark ${o}">${a}</span>
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
    var n, a, o;
    const i = (n = this._workspace) == null ? void 0 : n.current;
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
      const r = ((o = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : o.name) ?? s.replace(/^solution\//, "");
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
    return this._tagsOpen ? E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => E`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : E`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: s, homeExternalId: n, homeModuleId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const o = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: s })
        });
        if (!o.ok) {
          let g = `El servidor rechazó el contrato (${o.status})`;
          try {
            const I = await o.json();
            I != null && I.message && (g = I.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: r } = await o.json(), l = n ? { kind: "set-api-publisher", id: r, targetId: n } : a ? { kind: "add-api-implementation", apiId: r, moduleId: a } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
      } catch (o) {
        this.showToast(String(o));
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
              ${this._taggingVersion ? E`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : E`<button
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
      ${this.renderTagsPanel()}
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
ge.styles = mt`
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
ge.TYPE_LABELS = {
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
ke([
  ae()
], ge.prototype, "base", 2);
ke([
  q()
], ge.prototype, "_model", 2);
ke([
  q()
], ge.prototype, "_layout", 2);
ke([
  q()
], ge.prototype, "_error", 2);
ke([
  q()
], ge.prototype, "_saving", 2);
ke([
  q()
], ge.prototype, "_toast", 2);
ke([
  q()
], ge.prototype, "_workspace", 2);
ke([
  q()
], ge.prototype, "_creatingSolution", 2);
ke([
  q()
], ge.prototype, "_newSolutionName", 2);
ke([
  q()
], ge.prototype, "_taggingVersion", 2);
ke([
  q()
], ge.prototype, "_newTagName", 2);
ke([
  q()
], ge.prototype, "_tagsOpen", 2);
ke([
  q()
], ge.prototype, "_tags", 2);
ke([
  q()
], ge.prototype, "_diff", 2);
ke([
  q()
], ge.prototype, "_diffListOpen", 2);
ke([
  q()
], ge.prototype, "_mergeFlow", 2);
ge = ke([
  ht("modux-editor-connected")
], ge);
export {
  Dc as CONTAINER_HEADER,
  Lc as CONTAINER_INSET,
  fe as ModuxCanvas,
  Y as ModuxEditor,
  ge as ModuxEditorConnected,
  Uo as aggregatesScene,
  at as apiImplNodeId,
  ot as apiOpOccurrenceId,
  wi as containerFit,
  xo as containerMinSize,
  To as contextMapScene,
  Co as flowCoherence,
  Ko as flowsScene,
  oi as normalizeViewLayout,
  Ss as processesScene,
  So as relationEdgeId,
  Ti as resolveOverlaps
};
