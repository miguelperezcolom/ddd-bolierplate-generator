const Dc = 34, zc = 10;
function Li(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let n = 0; n < e.length; n++)
      for (let r = n + 1; r < e.length; r++) {
        const c = e[n], p = e[r], g = i.get(c.id), I = i.get(p.id), f = I.x - g.x, h = I.y - g.y, d = (c.w + p.w) / 2 + t - Math.abs(f), u = (c.h + p.h) / 2 + t - Math.abs(h);
        if (!(d <= 0 || u <= 0))
          if (a = !0, d < u) {
            const m = (f >= 0 ? 1 : -1) * d / 2;
            g.x -= m, I.x += m;
          } else {
            const m = (h >= 0 ? 1 : -1) * u / 2;
            g.y -= m, I.y += m;
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
function xn(e, t = { w: 160, h: 90 }) {
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
const kn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, _n = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, $n = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, We = 168, He = 56;
function pt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function ct(e, t) {
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
    id: pt(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const _o = 34, $o = 14, En = 14, xe = 108, we = 32, ms = 12, $i = 10, st = 2, Eo = st * xe + (st - 1) * ms + 2 * $o;
function Sn(e, t) {
  return `rel:${e}->${t}`;
}
function Cn(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function at(e, t) {
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
  const t = Math.max(1, Math.ceil(e / st)), i = t * we + (t - 1) * $i;
  return { w: Eo, h: _o + i + En };
}
function Et(e, t) {
  const i = e % st, s = Math.floor(e / st);
  return {
    x: -t.w / 2 + $o + i * (xe + ms) + xe / 2,
    y: -t.h / 2 + _o + s * (we + $i) + we / 2
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
function An(e, t, i, s, o, a, n = !1) {
  const r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...ko(e, t.id),
    ...So(e, t)
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: We, h: He }];
  if (n) {
    const c = new Map((e.apis ?? []).map((g) => [g.id, g])), p = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && c.has(g.apiId)).map((g) => {
      const I = c.get(g.apiId);
      return {
        id: pt(g.apiId, g.moduleId),
        name: I.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${I.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (I.operations ?? []).map((f) => ({
          id: ct(f.id, t.id),
          name: f.name
        }))
      };
    });
    if (p.length > 0) {
      const g = r.filter((I) => I.kind !== "api-impl");
      return Co(i, s, p, g, o, a);
    }
  }
  return Vt(i, s, r, o, a);
}
function Co(e, t, i, s, o, a, n = /* @__PURE__ */ new Set()) {
  const r = a[t.id] ?? Si(i.length + s.length), c = i.map((h, d) => {
    const u = o[h.id] ?? Et(d, r), m = n.has(h.id) ? [] : h.ops, w = a[h.id] ?? Si(m.length), _ = m.map((O, D) => o[O.id] ?? Et(D, w)), k = _i(
      { x: u.x, y: u.y },
      w,
      _.map((O) => ({ dx: O.x, dy: O.y, w: xe, h: we }))
    );
    return { a: h, off: u, ops: m, opOffs: _, fit: k };
  }), p = s.map(
    (h, d) => o[h.id] ?? Et(i.length + d, r)
  ), g = Li(
    [
      ...c.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, d) => ({
        id: h.id,
        x: p[d].x,
        y: p[d].y,
        w: xe,
        h: we
      }))
    ],
    24
  );
  for (const h of c) {
    const d = g.get(h.a.id);
    d && (h.off = { x: h.off.x + (d.x - h.fit.x), y: h.off.y + (d.y - h.fit.y) }, h.fit = { ...h.fit, x: d.x, y: d.y });
  }
  s.forEach((h, d) => {
    const u = g.get(h.id);
    u && (p[d] = { x: u.x, y: u.y });
  });
  const I = _i(e, r, [
    ...c.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: xe, h: we }))
  ]), f = [
    { ...t, x: I.x, y: I.y, w: I.w, h: I.h, container: !0 }
  ];
  for (const h of c)
    f.push({
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
      f.push({
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
        h: we,
        tooltip: `${Kt[h.a.opKind]}: ${d.name}`
      });
    });
  return s.forEach((h, d) => {
    const u = Ei[h.kind];
    f.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[d].x,
      y: e.y + p[d].y,
      w: xe,
      h: we,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Kt[h.kind]} ${h.name}`
    });
  }), f;
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
], As = 20, Ms = 28, Bt = 10, Lt = Eo + 2 * Bt;
function Pn(e, t, i, s, o, a) {
  const n = So(e, t), r = new Map(n.map((w) => [w.id, w])), c = (e.codeModules ?? []).filter((w) => w.moduleId === t.id), p = new Set(c.flatMap((w) => w.elementIds ?? [])), g = n.filter((w) => !p.has(w.id)), I = a[s.id] ?? Si(c.length + g.length), f = c.map((w, _) => {
    const k = (w.elementIds ?? []).map((L) => r.get(L)).filter((L) => !!L), O = Mn.map((L) => {
      const M = k.filter((W) => L.kinds.includes(W.kind)), x = Math.ceil(M.length / st), U = As + (x ? x * we + (x - 1) * $i + 8 : 8);
      return { layer: L, chips: M, rows: x, h: U };
    }), D = Ms + O.reduce((L, M) => L + M.h, 0) + Bt, N = o[w.id] ?? Et(_, I);
    return { cm: w, bands: O, boxH: D, off: N };
  }), h = g.map(
    (w, _) => o[w.id] ?? Et(f.length + _, I)
  ), d = Li(
    [
      ...f.map((w) => ({ id: w.cm.id, x: w.off.x, y: w.off.y, w: Lt, h: w.boxH })),
      ...g.map((w, _) => ({ id: w.id, x: h[_].x, y: h[_].y, w: xe, h: we }))
    ],
    24
  );
  for (const w of f) {
    const _ = d.get(w.cm.id);
    _ && (w.off = { x: _.x, y: _.y });
  }
  g.forEach((w, _) => {
    const k = d.get(w.id);
    k && (h[_] = { x: k.x, y: k.y });
  });
  const u = _i(i, I, [
    ...f.map((w) => ({ dx: w.off.x, dy: w.off.y, w: Lt, h: w.boxH })),
    ...h.map((w) => ({ dx: w.x, dy: w.y, w: xe, h: we }))
  ]), m = [
    { ...s, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const w of f) {
    const _ = i.x + w.off.x, k = i.y + w.off.y;
    m.push({
      id: w.cm.id,
      label: w.cm.name,
      kind: "code-module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      parentId: s.id,
      x: _,
      y: k,
      w: Lt,
      h: w.boxH,
      tooltip: `${w.cm.name} — módulo: empaqueta elementos del contexto en sus capas; arrastra el asa de un elemento hasta él para asignarlo`
    });
    let O = -w.boxH / 2 + Ms;
    for (const D of w.bands) {
      const N = `hexlayer:${w.cm.id}:${D.layer.key}`;
      m.push({
        id: N,
        label: D.layer.label,
        kind: "hex-layer",
        fill: D.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: w.cm.id,
        x: _,
        y: k + O + D.h / 2,
        w: Lt - 2 * Bt,
        h: D.h,
        tooltip: `Capa de ${D.layer.label} del módulo ${w.cm.name} (derivada del tipo de cada elemento)`
      }), D.chips.forEach((L, M) => {
        const x = M % st, U = Math.floor(M / st), W = L.policy ? is : Ei[L.kind];
        m.push({
          id: L.id,
          label: L.name,
          kind: L.kind,
          x: _ - (Lt - 2 * Bt) / 2 + Bt + x * (xe + ms) + xe / 2,
          y: k + O + As + U * (we + $i) + we / 2,
          w: xe,
          h: we,
          symbol: W.symbol,
          fill: W.fill,
          stroke: W.stroke,
          parentId: N,
          tooltip: `${L.policy ? "Policy" : Kt[L.kind]} ${L.name} — en el módulo ${w.cm.name} (Supr lo saca del módulo)`
        });
      }), O += D.h;
    }
  }
  return g.forEach((w, _) => {
    const k = w.policy ? is : Ei[w.kind];
    m.push({
      id: w.id,
      label: w.name,
      kind: w.kind,
      x: i.x + h[_].x,
      y: i.y + h[_].y,
      w: xe,
      h: we,
      symbol: k.symbol,
      fill: k.fill,
      stroke: k.stroke,
      parentId: s.id,
      tooltip: `${w.policy ? "Policy" : Kt[w.kind]} ${w.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), m;
}
function Vt(e, t, i, s, o) {
  const a = o[t.id] ?? Si(i.length), n = i.map((I, f) => s[I.id] ?? Et(f, a)), r = Li(
    i.map((I, f) => ({ id: I.id, x: n[f].x, y: n[f].y, w: xe, h: we })),
    10
  );
  i.forEach((I, f) => {
    const h = r.get(I.id);
    h && (n[f] = { x: h.x, y: h.y });
  });
  const c = _i(
    e,
    a,
    n.map((I) => ({ dx: I.x, dy: I.y, w: xe, h: we }))
  ), p = {
    ...t,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, g = i.map((I, f) => {
    const h = n[f], d = I.policy ? is : Ei[I.kind];
    return {
      id: I.id,
      label: I.name,
      kind: I.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: xe,
      h: we,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${I.policy ? "Policy" : Kt[I.kind]} ${I.name}`
    };
  });
  return [p, ...g];
}
function Tn(e, t, i = "contexts", s = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", n = o, r = i !== "contexts", c = i === "operations", p = new Set(e.externalSystems.map((l) => l.id)), g = (e.apis ?? []).filter(
    (l) => l.publishedByExternalSystemId && p.has(l.publishedByExternalSystemId)
  ), I = new Set(g.map((l) => l.id)), f = (e.proxyApis ?? []).filter(
    (l) => l.publishedByExternalSystemId && p.has(l.publishedByExternalSystemId)
  ), h = new Set(f.map((l) => l.id)), d = [
    ...e.modules.map((l) => ({ ref: l, external: !1, api: !1, proxy: !1 })),
    ...a ? [] : e.externalSystems.map((l) => ({ ref: l, external: !0, api: !1, proxy: !1 })),
    ...a ? [] : (e.apis ?? []).filter((l) => !I.has(l.id)).map((l) => ({ ref: l, external: !1, api: !0, proxy: !1 })),
    ...a ? [] : (e.proxyApis ?? []).filter((l) => !h.has(l.id)).map((l) => ({ ref: l, external: !1, api: !1, proxy: !0 })),
    ...a ? [] : (e.workflows ?? []).map((l) => ({
      ref: l,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...a ? [] : (e.etlFlows ?? []).filter((l) => !l.ownerModuleId).map((l) => ({
      ref: l,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(e.identityProviders ?? []).map((l) => ({
      ref: l,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], u = d.flatMap((l, T) => {
    const B = t[l.ref.id] ?? at(T, d.length);
    if ("idp" in l && l.idp) {
      const K = l.ref, le = !!K.publishedByExternalSystemId;
      return [{
        id: K.id,
        label: K.name,
        kind: "identity-provider",
        symbol: "key",
        fill: le ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: le,
        badge: K.type ?? "IDP",
        tooltip: `${K.name} — emite las identidades que el sistema confía${le ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: B.x,
        y: B.y,
        w: We,
        h: He
      }];
    }
    if ("etl" in l && l.etl) {
      const K = l.ref;
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
        h: He
      }];
    }
    if ("workflow" in l && l.workflow) {
      const K = l.ref;
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
        h: He
      }];
    }
    if (l.proxy) {
      const K = l.ref, le = {
        id: K.id,
        label: K.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${K.name} — proxy/cache de una API, consumible como ella`
      };
      if (c && K.targetApiId) {
        const Ke = (e.apis ?? []).find((xt) => xt.id === K.targetApiId), Xe = (Ke == null ? void 0 : Ke.operations) ?? [];
        if (Xe.length > 0)
          return Vt(
            B,
            le,
            Xe.map((xt) => ({
              id: ct(xt.id, K.id),
              name: xt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...le, x: B.x, y: B.y, w: We, h: He }];
    }
    if (l.api) {
      const K = l.ref, le = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(K.id) ? !r : r) && K.operations.length > 0 ? Vt(
        B,
        { ...le, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (Xe) => ({ id: Xe.id, name: Xe.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...le,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: B.x,
        y: B.y,
        w: We,
        h: He
      }];
    }
    if (l.external) {
      const K = l.ref, le = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: K.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: K.referencedRepositoryId ? `${K.name} — otro proyecto modux (repositorio ${K.referencedRepositoryId}), referenciado del catálogo` : `${K.name} (sistema externo)`
      }, Ke = g.filter((me) => me.publishedByExternalSystemId === K.id), Xe = f.filter((me) => me.publishedByExternalSystemId === K.id), xt = Xe.map(
        (me) => ({ id: me.id, name: me.name, kind: "proxy-api" })
      ), Fi = [
        ...(K.useCases ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (me) => ({ id: me.id, name: me.name, kind: "mcp-server" })
        )
      ], Bi = Ke.length > 0 || Xe.length > 0, Vi = Bi || Fi.length > 0, { form: di, collapsed: Wi } = Cs(
        o.has(K.id),
        r ? "full" : Bi ? "coarse" : "compact",
        Fi.length > 0 || c && Bi
      ), $s = [
        ...xt,
        ...di === "full" ? Fi : []
      ], Hi = c && di === "full" ? Xe.filter((me) => {
        const Nt = me.targetApiId ? (e.apis ?? []).find((Ee) => Ee.id === me.targetApiId) : void 0;
        return ((Nt == null ? void 0 : Nt.operations) ?? []).length > 0;
      }) : [];
      if (c && di === "full" && (Ke.length > 0 || Hi.length > 0)) {
        const me = [
          ...Ke.map((Ee) => ({
            id: Ee.id,
            name: Ee.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${Ee.name} — API publicada por ${K.name}`,
            opKind: "api-operation",
            ops: (Ee.operations ?? []).map((Rt) => ({ id: Rt.id, name: Rt.name }))
          })),
          ...Hi.map((Ee) => {
            const Rt = (e.apis ?? []).find((li) => li.id === Ee.targetApiId);
            return {
              id: Ee.id,
              name: Ee.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${Ee.name} — proxy/cache de ${Rt.name}`,
              opKind: "api-op-occurrence",
              ops: (Rt.operations ?? []).map((li) => ({
                id: ct(li.id, Ee.id),
                name: li.name
              }))
            };
          })
        ], Nt = new Set(Hi.map((Ee) => Ee.id));
        return Co(
          B,
          { ...le, collapsible: !0, collapsed: Wi },
          me,
          $s.filter((Ee) => !Nt.has(Ee.id)),
          t,
          s,
          n
        );
      }
      const Es = di === "compact" ? [] : [
        ...Ke.map((me) => ({ id: me.id, name: me.name, kind: "api" })),
        ...$s
      ];
      return Es.length > 0 ? Vt(
        B,
        { ...le, collapsible: Vi, collapsed: Wi },
        Es,
        t,
        s
      ) : [{
        ...le,
        collapsible: Vi,
        collapsed: Vi && Wi,
        x: B.x,
        y: B.y,
        w: We,
        h: He
      }];
    }
    const X = l.ref, Y = X.subdomainType ?? "GENERIC", pe = {
      id: X.id,
      label: X.name,
      kind: "module",
      symbol: "component",
      fill: kn[Y],
      stroke: "#94a3b8",
      badge: Y,
      tooltip: `${X.name} — subdominio ${Y}`
    }, De = ko(e, X.id), Tt = (e.aggregates ?? []).some((K) => K.moduleId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerModuleId === X.id) || (e.notifications ?? []).some((K) => K.ownerModuleId === X.id) || (e.documents ?? []).some((K) => K.ownerModuleId === X.id), nt = Tt || De.length > 0, { form: Ot, collapsed: bt } = Cs(
      o.has(X.id),
      r ? "full" : De.length > 0 ? "coarse" : "compact",
      Tt
    );
    return a ? Pn(
      e,
      X,
      B,
      { ...pe, collapsible: !1, collapsed: !1 },
      t,
      s
    ) : Ot === "full" && nt ? An(
      e,
      X,
      B,
      { ...pe, collapsible: !0, collapsed: bt },
      t,
      s,
      c
    ) : Ot === "coarse" && De.length > 0 ? Vt(
      B,
      { ...pe, collapsible: nt, collapsed: bt },
      De,
      t,
      s
    ) : [{
      ...pe,
      collapsible: nt,
      collapsed: nt && bt,
      x: B.x,
      y: B.y,
      w: We,
      h: He
    }];
  }), m = a ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, w = d.length + m.actors.length + m.aiAgents.length + m.rags.length + m.mcpGateways.length;
  m.actors.forEach((l, T) => {
    const B = t[l.id] ?? at(d.length + T, w);
    u.push({
      id: l.id,
      label: l.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${l.name} (actor)`
    });
  }), m.aiAgents.forEach((l, T) => {
    const B = t[l.id] ?? at(d.length + (e.actors ?? []).length + T, w);
    u.push({
      id: l.id,
      label: l.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: l.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!l.external,
      badge: l.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: l.external ? `${l.name} (agente de IA externo — entra por un gateway MCP)` : `${l.name} (agente de IA — consume por MCP)`
    });
  }), m.mcpGateways.forEach((l, T) => {
    const B = t[l.id] ?? at(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      w
    );
    u.push({
      id: l.id,
      label: l.name,
      x: B.x,
      y: B.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${l.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const _ = [];
  if (m.rags.forEach((l, T) => {
    const B = t[l.id] ?? at(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      w
    );
    u.push({
      id: l.id,
      label: l.name,
      x: B.x,
      y: B.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${l.name} (base de conocimiento — retrieval para agentes)`
    }), (l.contentSources ?? []).forEach((X, Y) => {
      const pe = `ragcs:${l.id}:${X.uri}`, De = t[pe] ?? { x: B.x + 170, y: B.y - 30 + Y * 44 };
      u.push({
        id: pe,
        label: X.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: De.x,
        y: De.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: X.type,
        tooltip: `${X.type}: ${X.uri}`
      }), _.push({
        id: `ragcse:${l.id}:${X.uri}`,
        sourceId: pe,
        targetId: l.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), a) {
    const l = e.services ?? [];
    l.forEach((B, X) => {
      const Y = t[B.id] ?? at(d.length + X, d.length + l.length);
      u.push({
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
        h: He
      });
    });
    const T = [];
    [...new Set(l.filter((B) => B.database).map((B) => B.database))].forEach((B) => T.push({
      id: `infra-db:${B}`,
      label: B,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${B} — la usan los servicios que declaran database=${B}`
    })), l.some((B) => B.outboxEnabled) && T.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && T.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && T.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), T.forEach((B, X) => {
      const Y = t[B.id] ?? at(
        d.length + l.length + X,
        d.length + l.length + T.length
      );
      u.push({
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
        h: He
      });
    });
  }
  u.sort((l, T) => (l.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const k = e.relations.map((l) => ({
    id: Sn(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: l.type ? _n[l.type] : "?",
    color: l.declared ? "#475569" : "#94a3b8",
    dashed: !l.declared,
    arrow: !0,
    tooltip: l.type ? `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)${l.reasons ? ` — ${l.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${l.reasons ? ` — ${l.reasons}` : ""}`
  })), O = e.flows.map((l) => {
    var De, Tt, nt, Ot, bt, K;
    const T = Cn(e, l), B = r ? e.modules.find((le) => le.id === l.sourceId) : void 0, X = ((De = B == null ? void 0 : B.domainEvents) == null ? void 0 : De.find((le) => le.name === l.triggerEvent)) ?? ((Tt = B == null ? void 0 : B.applicationEvents) == null ? void 0 : Tt.find((le) => le.name === l.triggerEvent)), Y = r && l.readModelName ? (Ot = (nt = e.modules.find((le) => le.id === l.targetId)) == null ? void 0 : nt.readModels) == null ? void 0 : Ot.find((le) => le.name === l.readModelName) : void 0, pe = r && l.targetUseCaseId ? (K = (bt = e.modules.find((le) => le.id === l.targetId)) == null ? void 0 : bt.useCases) == null ? void 0 : K.find((le) => le.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? l.sourceId,
      targetId: (pe == null ? void 0 : pe.id) ?? (Y == null ? void 0 : Y.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: $n[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${T}`
    };
  }), D = new Map((e.apis ?? []).map((l) => [l.id, l])), N = new Set(e.modules.map((l) => l.id)), L = (e.apiImplementations ?? []).filter(
    (l) => D.has(l.apiId) && N.has(l.moduleId)
  ), M = new Set(u.map((l) => l.id)), x = a ? [
    ...(e.services ?? []).flatMap(
      (l) => (l.codeModuleIds ?? []).filter((T) => M.has(T) && M.has(l.id)).map((T) => ({
        id: `deploy:${l.id}->${T}`,
        sourceId: l.id,
        targetId: T,
        kind: "deploys",
        color: "#334155",
        dashed: !0,
        arrow: !0,
        tooltip: `desplegado en ${l.name} — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((l) => {
      const T = [];
      return l.database && M.has(`infra-db:${l.database}`) && M.has(l.id) && T.push({
        id: `infradb:${l.id}`,
        sourceId: l.id,
        targetId: `infra-db:${l.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name} persiste en ${l.database}`
      }), l.outboxEnabled && M.has("infra-broker") && M.has(l.id) && T.push({
        id: `infrabroker:${l.id}`,
        sourceId: l.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name} publica eventos por el outbox`
      }), T;
    })
  ] : [], U = r ? (e.emissions ?? []).filter((l) => M.has(l.sourceId) && M.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], W = r ? (e.projections ?? []).map((l) => ({
    p: l,
    source: l.sourceAggregateId ?? l.sourceExternalUseCaseId ?? l.sourceExternalTableId
  })).filter(({ p: l, source: T }) => T && l.readModelId).filter(({ p: l, source: T }) => M.has(T) && M.has(l.readModelId)).map(({ p: l, source: T }) => ({
    id: `proj:${l.id}`,
    sourceId: T,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], re = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((T) => {
      const B = r && T.targetUseCaseId && M.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetModuleId && M.has(T.targetModuleId) ? T.targetModuleId : (T.targetUseCaseId && !r, null);
      if (!B) return [];
      const X = r && M.has(T.id) ? T.id : l.id;
      return M.has(X) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: X,
          targetId: B,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${B}`
        }
      ] : [];
    })
  ), te = r ? (e.useCaseCalls ?? []).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => ({
    id: `uccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], y = [
    ...e.modules.filter((l) => l.identityProviderId && M.has(l.id) && M.has(l.identityProviderId)).map((l) => ({
      id: `idptrust:${l.id}`,
      sourceId: l.id,
      targetId: l.identityProviderId,
      kind: "idp-trust",
      color: "#ca8a04",
      label: "valida tokens de",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} valida los tokens emitidos por este IdP — Supr lo desconfía`
    })),
    ...(e.etlFlows ?? []).filter((l) => l.identityProviderId && M.has(l.identityProviderId)).flatMap((l) => {
      const T = M.has(l.id) ? l.id : l.ownerModuleId && M.has(l.ownerModuleId) ? l.ownerModuleId : null;
      return T ? [{
        id: `idpsvc:${l.id}`,
        sourceId: T,
        targetId: l.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((l) => l.publishedByExternalSystemId && M.has(l.id) && M.has(l.publishedByExternalSystemId)).map((l) => ({
      id: `idpfed:${l.id}`,
      sourceId: l.publishedByExternalSystemId,
      targetId: l.id,
      kind: "idp-federation",
      color: "#ca8a04",
      label: "publica",
      dashed: !0,
      arrow: !0,
      tooltip: "IdP federado: lo publica este sistema externo — Supr lo vuelve propio"
    }))
  ], C = r ? e.modules.flatMap((l) => l.scheduledTriggers ?? []).filter((l) => l.useCaseId && M.has(l.id) && M.has(l.useCaseId)).map((l) => ({
    id: `stfire:${l.id}->${l.useCaseId}`,
    sourceId: l.id,
    targetId: l.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: l.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${l.cronExpression ?? "cron"}`
  })) : [], v = r ? (e.aggregateCalls ?? []).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => ({
    id: `aggcall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], b = r ? (e.queryCalls ?? []).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => ({
    id: `qscall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], E = r ? (e.actorUses ?? []).filter((l) => M.has(l.actorId) && M.has(l.targetId)).map((l) => ({
    id: `use:${l.actorId}->${l.targetId}`,
    sourceId: l.actorId,
    targetId: l.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], $ = (e.actorExternalDependencies ?? []).filter((l) => M.has(l.actorId) && M.has(l.externalSystemId)).map((l) => ({
    id: `extdep:${l.actorId}->${l.externalSystemId}`,
    sourceId: l.actorId,
    targetId: l.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), P = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), A = (l) => M.has(l) ? l : P.get(l) ?? l, R = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({
        sourceId: l.sourceId,
        targetId: A(l.targetId),
        cqrs: l.type === "CQRS"
      })).filter(
        (l) => M.has(l.sourceId) && M.has(l.targetId) && l.sourceId !== l.targetId
      ).map((l) => [
        `xdep:${l.sourceId}->${l.targetId}`,
        {
          id: `xdep:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "ext-dep",
          color: l.cqrs ? "#7c3aed" : "#64748b",
          label: l.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: l.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], q = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.useCases ?? []) q.set(T.id, l.id);
    for (const T of l.domainEvents ?? []) q.set(T.id, l.id);
    for (const T of l.applicationEvents ?? []) q.set(T.id, l.id);
    for (const T of l.queryServices ?? []) q.set(T.id, l.id);
  }
  const G = (l) => M.has(l) ? l : q.get(l) ?? l, ne = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.domainEvents ?? []) ne.set(T.name, T.id);
    for (const T of l.applicationEvents ?? []) ne.set(T.name, T.id);
  }
  const ue = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (l) => (l.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: l.id, targetId: G(T.targetUseCaseId) }))
      ).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `wfcall:${l.sourceId}->${l.targetId}`,
        {
          id: `wfcall:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], F = [
    ...new Map(
      (e.workflows ?? []).filter((l) => l.triggerEvent && ne.has(l.triggerEvent)).map((l) => ({
        sourceId: G(ne.get(l.triggerEvent)),
        targetId: l.id,
        label: l.triggerEvent
      })).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `wftrig:${l.sourceId}->${l.targetId}`,
        {
          id: `wftrig:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: l.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], H = /* @__PURE__ */ new Map();
  for (const l of e.externalSystems)
    for (const T of l.tables ?? []) H.set(T.id, l.id);
  const de = (e.notifications ?? []).flatMap((l) => {
    var X;
    const T = M.has(l.id) ? l.id : l.ownerModuleId && M.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!T) return [];
    const B = [];
    if (l.eventId) {
      const Y = M.has(l.eventId) ? l.eventId : q.get(l.eventId);
      Y && M.has(Y) && Y !== T && B.push({
        id: `notif:${l.id}`,
        sourceId: Y,
        targetId: T,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const Y of l.recipientRoleIds ?? [])
      M.has(Y) && B.push({
        id: `notifto:${l.id}:${Y}`,
        sourceId: T,
        targetId: Y,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((X = (l.channels ?? [])[0]) == null ? void 0 : X.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name} avisa a este rol — Supr lo quita`
      });
    return B;
  }), fe = (e.documents ?? []).flatMap((l) => {
    const T = M.has(l.id) ? l.id : l.ownerModuleId && M.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!T || !l.queryServiceId) return [];
    const B = M.has(l.queryServiceId) ? l.queryServiceId : q.get(l.queryServiceId);
    return !B || !M.has(B) || B === T ? [] : [{
      id: `docq:${l.id}`,
      sourceId: B,
      targetId: T,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), ze = (e.etlFlows ?? []).flatMap(
    (l) => (l.steps ?? []).flatMap((T) => {
      const B = M.has(l.id) ? l.id : l.ownerModuleId && M.has(l.ownerModuleId) ? l.ownerModuleId : null;
      if (!B) return [];
      const X = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!X) return [];
      let Y = X;
      if (!M.has(Y) && T.operationId && T.apiId && (Y = T.apiId), !M.has(Y) && T.externalTableId && (Y = H.get(T.externalTableId) ?? Y), M.has(Y) || (Y = A(Y)), M.has(Y) || (Y = q.get(X) ?? Y), !M.has(Y) || Y === B) return [];
      const pe = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${l.id}:${T.id}`,
        sourceId: pe ? Y : B,
        targetId: pe ? B : Y,
        kind: pe ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: pe ? `${l.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${l.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), _e = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: M.has(T) ? T : H.get(T) ?? T,
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `ragtbl:${l.sourceId}->${l.targetId}`,
        {
          id: `ragtbl:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "rag-table",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${l.name} indexa esta tabla`
        }
      ])
    ).values()
  ], V = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceApiIds ?? []).map((T) => ({
          sourceId: A(T),
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `ragapi:${l.sourceId}->${l.targetId}`,
        {
          id: `ragapi:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "rag-api",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${l.name} indexa el contenido de esta API`
        }
      ])
    ).values()
  ], Q = [
    ...new Map(
      (e.rags ?? []).flatMap((l) => [
        ...(l.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name })),
        ...(l.sourceModuleIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name }))
      ]).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `ragcoarse:${l.sourceId}->${l.targetId}`,
        {
          id: `ragcoarse:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "rag-coarse",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${l.name} indexa su contenido`
        }
      ])
    ).values()
  ], $e = [
    ...new Map(
      (e.agentApiUses ?? []).map((l) => ({ sourceId: l.agentId, targetId: A(l.apiId) })).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => [
        `agapi:${l.sourceId}->${l.targetId}`,
        {
          id: `agapi:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "agent-api",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume la API entera como herramienta"
        }
      ])
    ).values()
  ], Me = (l) => l.onCompletionEventName || `${l.name.replace(/\s+/g, "")}Completado`, Le = (e.workflows ?? []).flatMap(
    (l) => l.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== l.id && Me(T) === l.triggerEvent).filter((T) => M.has(T.id) && M.has(l.id)).map((T) => ({
      id: `wfchain:${T.id}->${l.id}`,
      sourceId: T.id,
      targetId: l.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: l.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), Ce = [
    ...new Map(
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: A(l.id), targetId: A(l.targetApiId) })).filter(
        (l) => M.has(l.sourceId) && M.has(l.targetId) && l.sourceId !== l.targetId
      ).map((l) => [
        `pxt:${l.sourceId}->${l.targetId}`,
        {
          id: `pxt:${l.sourceId}->${l.targetId}`,
          sourceId: l.sourceId,
          targetId: l.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], et = L.flatMap((l) => {
    const T = pt(l.apiId, l.moduleId);
    if (!M.has(T)) return [];
    const B = [];
    for (const X of (e.proxyApis ?? []).filter((Y) => Y.targetApiId === l.apiId)) {
      const Y = A(X.id);
      M.has(Y) && Y !== T && B.push({
        id: `pxr:${Y}->${T}`,
        sourceId: Y,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return B;
  }), ai = (e.proxyOperationRoutes ?? []).flatMap((l) => {
    const T = (e.proxyApis ?? []).find((Y) => Y.id === l.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const B = ct(l.operationId, l.proxyId), X = l.targetSiteId === T.targetApiId ? T.targetApiId : pt(T.targetApiId, l.targetSiteId);
    return !M.has(B) || !M.has(X) ? [] : [{
      id: `oproute:${B}->${X}`,
      sourceId: B,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), wt = [
    ...new Map(
      (e.externalOperationUses ?? []).map((l) => {
        if (!M.has(l.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (pe) => pe.operations.some((De) => De.id === l.operationId)
        );
        if (!T) return null;
        const B = l.siteId === T.id, X = B ? l.operationId : ct(l.operationId, l.siteId);
        let Y = M.has(X) ? X : null;
        if (!Y)
          if (B || (e.proxyApis ?? []).some((pe) => pe.id === l.siteId))
            Y = A(l.siteId);
          else {
            const pe = pt(T.id, l.siteId);
            Y = M.has(pe) ? pe : l.siteId;
          }
        return !Y || !M.has(Y) || Y === l.externalSystemId ? null : { u: l, target: Y };
      }).filter((l) => l !== null).map((l) => [
        `extopuse:${l.u.externalSystemId}->${l.u.operationId}@${l.u.siteId}`,
        {
          id: `extopuse:${l.u.externalSystemId}->${l.u.operationId}@${l.u.siteId}`,
          sourceId: l.u.externalSystemId,
          targetId: l.target,
          kind: "ext-op-use",
          color: "#64748b",
          label: "op",
          dashed: !0,
          arrow: !0,
          tooltip: "llama a esta operación"
        }
      ])
    ).values()
  ], ri = r ? (e.apiOperationImplementations ?? []).flatMap((l) => {
    if (!M.has(l.useCaseId)) return [];
    const T = M.has(ct(l.operationId, l.moduleId)) ? ct(l.operationId, l.moduleId) : M.has(pt(l.apiId, l.moduleId)) ? pt(l.apiId, l.moduleId) : M.has(A(l.moduleId)) ? A(l.moduleId) : null;
    return T ? [{
      id: `apiimplwire:${l.operationId}@${l.moduleId}`,
      sourceId: T,
      targetId: l.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], dn = r ? (e.agentUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.useCaseId)).map((l) => ({
    id: `mcp:${l.agentId}->${l.useCaseId}`,
    sourceId: l.agentId,
    targetId: l.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], ln = (e.agentRags ?? []).filter((l) => M.has(l.agentId) && M.has(l.ragId)).map((l) => ({
    id: `agrag:${l.agentId}->${l.ragId}`,
    sourceId: l.agentId,
    targetId: l.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), cn = r ? (e.rags ?? []).filter((l) => M.has(l.id)).flatMap(
    (l) => (l.sourceReadModelIds ?? []).filter((T) => M.has(T)).map((T) => ({
      id: `ragsrc:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} indexa este read model`
    }))
  ) : [], pn = r ? (e.agentExternalUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.externalUseCaseId)).map((l) => ({
    id: `mcpx:${l.agentId}->${l.externalUseCaseId}`,
    sourceId: l.agentId,
    targetId: l.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], un = r ? (e.agentMcpUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.mcpServerId)).map((l) => ({
    id: `mcpsv:${l.agentId}->${l.mcpServerId}`,
    sourceId: l.agentId,
    targetId: l.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], mn = (e.mcpGateways ?? []).flatMap(
    (l) => [
      ...l.mcpServerIds ?? [],
      ...l.apiIds ?? [],
      ...l.apiOperationIds ?? [],
      ...l.useCaseIds ?? [],
      ...l.ragIds ?? []
    ].filter((T) => M.has(l.id) && M.has(T)).map((T) => ({
      id: `gwx:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), hn = (e.agentGatewayUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.gatewayId)).map((l) => ({
    id: `aggw:${l.agentId}->${l.gatewayId}`,
    sourceId: l.agentId,
    targetId: l.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), fn = r ? (e.agentApiOpUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.apiOperationId)).map((l) => ({
    id: `agapi:${l.agentId}->${l.apiOperationId}`,
    sourceId: l.agentId,
    targetId: l.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], gn = r ? (e.agentQueryUses ?? []).filter((l) => M.has(l.agentId) && M.has(l.queryServiceId)).map((l) => ({
    id: `agqs:${l.agentId}->${l.queryServiceId}`,
    sourceId: l.agentId,
    targetId: l.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], In = (e.agentDelegations ?? []).filter((l) => M.has(l.agentId) && M.has(l.delegateAgentId)).map((l) => ({
    id: `agag:${l.agentId}->${l.delegateAgentId}`,
    sourceId: l.agentId,
    targetId: l.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), yn = (e.actorAgentUses ?? []).filter((l) => M.has(l.actorId) && M.has(l.agentId)).map((l) => ({
    id: `useag:${l.actorId}->${l.agentId}`,
    sourceId: l.actorId,
    targetId: l.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), vn = r ? (e.agentTriggers ?? []).filter((l) => M.has(l.eventId) && M.has(l.agentId)).map((l) => ({
    id: `evag:${l.eventId}->${l.agentId}`,
    sourceId: l.eventId,
    targetId: l.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], wn = r ? (e.externalCalls ?? []).filter((l) => M.has(l.externalSystemId) && M.has(l.useCaseId)).map((l) => ({
    id: `extcall:${l.externalSystemId}->${l.useCaseId}`,
    sourceId: l.externalSystemId,
    targetId: l.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], bn = r ? (e.externalUseCaseCalls ?? []).filter((l) => M.has(l.sourceId) && M.has(l.targetId)).map((l) => ({
    id: `extuccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: u,
    edges: [
      ...x,
      ...k,
      ...O,
      ...U,
      ...W,
      ...re,
      ...te,
      ...C,
      ...y,
      ...de,
      ...fe,
      ...ze,
      ...v,
      ...b,
      ...E,
      ...$,
      ...R,
      ...Ce,
      ...et,
      ...ai,
      ...wt,
      ...ri,
      ...ue,
      ...F,
      ...Le,
      ...$e,
      ..._e,
      ...V,
      ...Q,
      ...dn,
      ...pn,
      ...un,
      ...mn,
      ...hn,
      ...fn,
      ...gn,
      ...In,
      ...yn,
      ...vn,
      ...ln,
      ...cn,
      ..._,
      ...wn,
      ...bn
    ]
  };
}
const On = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Nn = 176, Rn = 60, Ln = 140, Dn = 40;
function zn(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((o, a) => {
    const n = 220 + a * 340;
    i.filter((c) => c.moduleId === o.id).forEach((c, p) => {
      const g = s.filter((f) => f.aggregateId === c.id).length, I = 140 + p * (170 + g * 60);
      t[c.id] = { x: n, y: I }, s.filter((f) => f.aggregateId === c.id).forEach((f, h) => {
        t[f.id] = { x: n + 60, y: I + 100 + h * 60 };
      });
    });
  }), i.filter((o) => !e.modules.some((a) => a.id === o.moduleId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function Un(e, t) {
  const i = zn(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, o = new Map(e.modules.map((p) => [p.id, p])), a = (e.aggregates ?? []).map((p) => {
    const g = o.get(p.moduleId), I = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", f = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: f.x,
      y: f.y,
      w: Nn,
      h: Rn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: On[I],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${I})` : ""}`
    };
  }), n = (e.entities ?? []).map((p) => {
    const g = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: Ln,
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
    nodes: [...a, ...n],
    edges: [...r, ...c]
  };
}
const qn = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Fn = 150, Bn = 44, Vn = 190, Wn = 56, Hn = 160, Gn = 48;
function jn(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Yn(e, t) {
  const i = e.flows, s = [], o = [], a = /* @__PURE__ */ new Set(), n = (r) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((g) => g.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return i.forEach((r, c) => {
    const p = 120 + c * 130, g = qn[r.archetype] ?? "#475569", I = r.triggerAggregateId ?? r.sourceId;
    if (!a.has(I)) {
      a.add(I);
      const m = t[I] ?? { x: 160, y: p };
      s.push({
        id: I,
        label: r.triggerAggregateId ? n(r.triggerAggregateId) : I,
        x: m.x,
        y: m.y,
        w: Fn,
        h: Bn,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const f = `flow:${r.id}`, h = t[f] ?? { x: 470, y: p };
    s.push({
      id: f,
      label: r.name,
      x: h.x,
      y: h.y,
      w: Vn,
      h: Wn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const d = jn(e, r), u = `tgt:${d.id}`;
    if (!a.has(u)) {
      a.add(u);
      const m = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: d.label,
        x: m.x,
        y: m.y,
        w: Hn,
        h: Gn,
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
      sourceId: I,
      targetId: f,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${r.id}:out`,
      sourceId: f,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: o };
}
const Kn = 190, Xn = 56, Gi = 170, Qn = 52;
function Ps(e, t) {
  const i = [], s = [], o = (a) => {
    var n;
    return (n = e.modules.find((r) => r.id === a)) == null ? void 0 : n.name;
  };
  return (e.processes ?? []).forEach((a, n) => {
    const r = 140 + n * 240, c = t[a.id] ?? { x: 150, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: c.x,
      y: c.y,
      w: Kn,
      h: Xn,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerModuleId) ? ` — módulo ${o(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let p = a.id;
    if (a.steps.forEach((g, I) => {
      const f = g.type === "HUMAN", h = t[g.id] ?? { x: 150 + (I + 1) * 240, y: r };
      if (i.push({
        id: g.id,
        label: g.name,
        x: h.x,
        y: h.y,
        w: Gi,
        h: Qn,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
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
      const g = `done:${a.id}`, I = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: r };
      i.push({
        id: g,
        label: a.onCompletionEventName,
        x: I.x,
        y: I.y,
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
let Ao = class {
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
const Jn = (e) => new Ao(typeof e == "string" ? e : e + "", void 0, fs), yt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Ao(i, e, fs);
}, Zn = (e, t) => {
  if (hs) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = vi.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Os = hs ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Jn(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ea, defineProperty: ta, getOwnPropertyDescriptor: ia, getOwnPropertyNames: sa, getOwnPropertySymbols: oa, getPrototypeOf: na } = Object, ot = globalThis, Ns = ot.trustedTypes, aa = Ns ? Ns.emptyScript : "", ji = ot.reactiveElementPolyfillSupport, Gt = (e, t) => e, Ci = { toAttribute(e, t) {
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
} }, gs = (e, t) => !ea(e, t), Rs = { attribute: !0, type: String, converter: Ci, reflect: !1, useDefault: !1, hasChanged: gs };
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
      o !== void 0 && ta(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: a } = ia(this.prototype, t) ?? { get() {
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
    const t = na(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Gt("properties"))) {
      const i = this.properties, s = [...sa(i), ...oa(i)];
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
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : Ci;
      this._$Em = o;
      const p = c.fromAttribute(i, r.type);
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
        const { wrapped: r } = n, c = this[a];
        r !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, n, c);
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
const jt = globalThis, Ls = (e) => e, Ai = jt.trustedTypes, Ds = Ai ? Ai.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Mo = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, Po = "?" + it, ra = `<${Po}>`, gt = document, Xt = () => gt.createComment(""), Qt = (e) => e === null || typeof e != "object" && typeof e != "function", Is = Array.isArray, da = (e) => Is(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Yi = `[ 	
\f\r]`, Dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zs = /-->/g, Us = />/g, rt = RegExp(`>|${Yi}(?:([^\\s"'>=/]+)(${Yi}*=${Yi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qs = /'/g, Fs = /"/g, To = /^(?:script|style|textarea|title)$/i, Oo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), S = Oo(1), ee = Oo(2), Ct = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), Bs = /* @__PURE__ */ new WeakMap(), ut = gt.createTreeWalker(gt, 129);
function No(e, t) {
  if (!Is(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ds !== void 0 ? Ds.createHTML(t) : t;
}
const la = (e, t) => {
  const i = e.length - 1, s = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Dt;
  for (let r = 0; r < i; r++) {
    const c = e[r];
    let p, g, I = -1, f = 0;
    for (; f < c.length && (n.lastIndex = f, g = n.exec(c), g !== null); ) f = n.lastIndex, n === Dt ? g[1] === "!--" ? n = zs : g[1] !== void 0 ? n = Us : g[2] !== void 0 ? (To.test(g[2]) && (o = RegExp("</" + g[2], "g")), n = rt) : g[3] !== void 0 && (n = rt) : n === rt ? g[0] === ">" ? (n = o ?? Dt, I = -1) : g[1] === void 0 ? I = -2 : (I = n.lastIndex - g[2].length, p = g[1], n = g[3] === void 0 ? rt : g[3] === '"' ? Fs : qs) : n === Fs || n === qs ? n = rt : n === zs || n === Us ? n = Dt : (n = rt, o = void 0);
    const h = n === rt && e[r + 1].startsWith("/>") ? " " : "";
    a += n === Dt ? c + ra : I >= 0 ? (s.push(p), c.slice(0, I) + Mo + c.slice(I) + it + h) : c + it + (I === -2 ? r : h);
  }
  return [No(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Jt {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const r = t.length - 1, c = this.parts, [p, g] = la(t, i);
    if (this.el = Jt.createElement(p, s), ut.currentNode = this.el.content, i === 2 || i === 3) {
      const I = this.el.content.firstChild;
      I.replaceWith(...I.childNodes);
    }
    for (; (o = ut.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const I of o.getAttributeNames()) if (I.endsWith(Mo)) {
          const f = g[n++], h = o.getAttribute(I).split(it), d = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: a, name: d[2], strings: h, ctor: d[1] === "." ? pa : d[1] === "?" ? ua : d[1] === "@" ? ma : Di }), o.removeAttribute(I);
        } else I.startsWith(it) && (c.push({ type: 6, index: a }), o.removeAttribute(I));
        if (To.test(o.tagName)) {
          const I = o.textContent.split(it), f = I.length - 1;
          if (f > 0) {
            o.textContent = Ai ? Ai.emptyScript : "";
            for (let h = 0; h < f; h++) o.append(I[h], Xt()), ut.nextNode(), c.push({ type: 2, index: ++a });
            o.append(I[f], Xt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Po) c.push({ type: 2, index: a });
      else {
        let I = -1;
        for (; (I = o.data.indexOf(it, I + 1)) !== -1; ) c.push({ type: 7, index: a }), I += it.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const s = gt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function At(e, t, i = e, s) {
  var n, r;
  if (t === Ct) return t;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const a = Qt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (t = At(e, o._$AS(e, t.values), o, s)), t;
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? gt).importNode(i, !0);
    ut.currentNode = o;
    let a = ut.nextNode(), n = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let p;
        c.type === 2 ? p = new si(a, a.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(a, c.name, c.strings, this, t) : c.type === 6 && (p = new ha(a, this, t)), this._$AV.push(p), c = s[++r];
      }
      n !== (c == null ? void 0 : c.index) && (a = ut.nextNode(), n++);
    }
    return ut.currentNode = gt, o;
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
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = At(this, t, i), Qt(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== Ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : da(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && Qt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(gt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Jt.createElement(No(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const n = new ca(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Bs.get(t.strings);
    return i === void 0 && Bs.set(t.strings, i = new Jt(t)), i;
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
      const o = Ls(t).nextSibling;
      Ls(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Di {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, a) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = se;
  }
  _$AI(t, i = this, s, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = At(this, t, i, 0), n = !Qt(t) || t !== this._$AH && t !== Ct, n && (this._$AH = t);
    else {
      const r = t;
      let c, p;
      for (t = a[0], c = 0; c < a.length - 1; c++) p = At(this, r[s + c], i, c), p === Ct && (p = this._$AH[c]), n || (n = !Qt(p) || p !== this._$AH[c]), p === se ? t = se : t !== se && (t += (p ?? "") + a[c + 1]), this._$AH[c] = p;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pa extends Di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class ua extends Di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class ma extends Di {
  constructor(t, i, s, o, a) {
    super(t, i, s, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = At(this, t, i, 0) ?? se) === Ct) return;
    const s = this._$AH, o = t === se && s !== se || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== se && (s === se || o);
    o && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
    At(this, t);
  }
}
const Ki = jt.litHtmlPolyfillSupport;
Ki == null || Ki(Jt, si), (jt.litHtmlVersions ?? (jt.litHtmlVersions = [])).push("3.3.3");
const fa = (e, t, i) => {
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
const ht = globalThis;
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
    return Ct;
  }
}
var xo;
Fe._$litElement$ = !0, Fe.finalized = !0, (xo = ht.litElementHydrateSupport) == null || xo.call(ht, { LitElement: Fe });
const Xi = ht.litElementPolyfillSupport;
Xi == null || Xi({ LitElement: Fe });
(ht.litElementVersions ?? (ht.litElementVersions = [])).push("4.2.2");
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
const ga = { attribute: !0, type: String, converter: Ci, reflect: !1, hasChanged: gs }, Ia = (e = ga, t, i) => {
  const { kind: s, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(r) {
      const c = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(n, c, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(r) {
      const c = this[n];
      t.call(this, r), this.requestUpdate(n, c, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function oe(e) {
  return (t, i) => typeof i == "object" ? Ia(e, t, i) : ((s, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(e) {
  return oe({ ...e, state: !0, attribute: !1 });
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
function ya(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === ss && t.documentElement.namespaceURI === ss ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function va(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ro(e) {
  var t = zi(e);
  return (t.local ? va : ya)(t);
}
function wa() {
}
function ys(e) {
  return e == null ? wa : function() {
    return this.querySelector(e);
  };
}
function ba(e) {
  typeof e != "function" && (e = ys(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = new Array(n), c, p, g = 0; g < n; ++g)
      (c = a[g]) && (p = e.call(c, c.__data__, g, a)) && ("__data__" in c && (p.__data__ = c.__data__), r[g] = p);
  return new Ne(s, this._parents);
}
function xa(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ka() {
  return [];
}
function Lo(e) {
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
  typeof e == "function" ? e = _a(e) : e = Lo(e);
  for (var t = this._groups, i = t.length, s = [], o = [], a = 0; a < i; ++a)
    for (var n = t[a], r = n.length, c, p = 0; p < r; ++p)
      (c = n[p]) && (s.push(e.call(c, c.__data__, p, n)), o.push(c));
  return new Ne(s, o);
}
function Do(e) {
  return function() {
    return this.matches(e);
  };
}
function zo(e) {
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
function Aa(e) {
  return this.select(e == null ? Ca : Sa(typeof e == "function" ? e : zo(e)));
}
var Ma = Array.prototype.filter;
function Pa() {
  return Array.from(this.children);
}
function Ta(e) {
  return function() {
    return Ma.call(this.children, e);
  };
}
function Oa(e) {
  return this.selectAll(e == null ? Pa : Ta(typeof e == "function" ? e : zo(e)));
}
function Na(e) {
  typeof e != "function" && (e = Do(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], c, p = 0; p < n; ++p)
      (c = a[p]) && e.call(c, c.__data__, p, a) && r.push(c);
  return new Ne(s, this._parents);
}
function Uo(e) {
  return new Array(e.length);
}
function Ra() {
  return new Ne(this._enter || this._groups.map(Uo), this._parents);
}
function Mi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Mi.prototype = {
  constructor: Mi,
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
function La(e) {
  return function() {
    return e;
  };
}
function Da(e, t, i, s, o, a) {
  for (var n = 0, r, c = t.length, p = a.length; n < p; ++n)
    (r = t[n]) ? (r.__data__ = a[n], s[n] = r) : i[n] = new Mi(e, a[n]);
  for (; n < c; ++n)
    (r = t[n]) && (o[n] = r);
}
function za(e, t, i, s, o, a, n) {
  var r, c, p = /* @__PURE__ */ new Map(), g = t.length, I = a.length, f = new Array(g), h;
  for (r = 0; r < g; ++r)
    (c = t[r]) && (f[r] = h = n.call(c, c.__data__, r, t) + "", p.has(h) ? o[r] = c : p.set(h, c));
  for (r = 0; r < I; ++r)
    h = n.call(e, a[r], r, a) + "", (c = p.get(h)) ? (s[r] = c, c.__data__ = a[r], p.delete(h)) : i[r] = new Mi(e, a[r]);
  for (r = 0; r < g; ++r)
    (c = t[r]) && p.get(f[r]) === c && (o[r] = c);
}
function Ua(e) {
  return e.__data__;
}
function qa(e, t) {
  if (!arguments.length) return Array.from(this, Ua);
  var i = t ? za : Da, s = this._parents, o = this._groups;
  typeof e != "function" && (e = La(e));
  for (var a = o.length, n = new Array(a), r = new Array(a), c = new Array(a), p = 0; p < a; ++p) {
    var g = s[p], I = o[p], f = I.length, h = Fa(e.call(g, g && g.__data__, p, s)), d = h.length, u = r[p] = new Array(d), m = n[p] = new Array(d), w = c[p] = new Array(f);
    i(g, I, u, m, w, h, t);
    for (var _ = 0, k = 0, O, D; _ < d; ++_)
      if (O = u[_]) {
        for (_ >= k && (k = _ + 1); !(D = m[k]) && ++k < d; ) ;
        O._next = D || null;
      }
  }
  return n = new Ne(n, s), n._enter = r, n._exit = c, n;
}
function Fa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ba() {
  return new Ne(this._exit || this._groups.map(Uo), this._parents);
}
function Va(e, t, i) {
  var s = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), s && o ? s.merge(o).order() : o;
}
function Wa(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, o = i.length, a = s.length, n = Math.min(o, a), r = new Array(o), c = 0; c < n; ++c)
    for (var p = i[c], g = s[c], I = p.length, f = r[c] = new Array(I), h, d = 0; d < I; ++d)
      (h = p[d] || g[d]) && (f[d] = h);
  for (; c < o; ++c)
    r[c] = i[c];
  return new Ne(r, this._parents);
}
function Ha() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], o = s.length - 1, a = s[o], n; --o >= 0; )
      (n = s[o]) && (a && n.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(n, a), a = n);
  return this;
}
function Ga(e) {
  e || (e = ja);
  function t(I, f) {
    return I && f ? e(I.__data__, f.__data__) : !I - !f;
  }
  for (var i = this._groups, s = i.length, o = new Array(s), a = 0; a < s; ++a) {
    for (var n = i[a], r = n.length, c = o[a] = new Array(r), p, g = 0; g < r; ++g)
      (p = n[g]) && (c[g] = p);
    c.sort(t);
  }
  return new Ne(o, this._parents).order();
}
function ja(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ya() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ka() {
  return Array.from(this);
}
function Xa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], o = 0, a = s.length; o < a; ++o) {
      var n = s[o];
      if (n) return n;
    }
  return null;
}
function Qa() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Ja() {
  return !this.node();
}
function Za(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var o = t[i], a = 0, n = o.length, r; a < n; ++a)
      (r = o[a]) && e.call(r, r.__data__, a, o);
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
function or(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function nr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function ar(e, t) {
  var i = zi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? tr : er : typeof t == "function" ? i.local ? nr : or : i.local ? sr : ir)(i, t));
}
function qo(e) {
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
  return arguments.length > 1 ? this.each((t == null ? rr : typeof t == "function" ? lr : dr)(e, t, i ?? "")) : Mt(this.node(), e);
}
function Mt(e, t) {
  return e.style.getPropertyValue(t) || qo(e).getComputedStyle(e, null).getPropertyValue(t);
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
function fr(e) {
  return function() {
    Vo(this, e);
  };
}
function gr(e) {
  return function() {
    Wo(this, e);
  };
}
function Ir(e, t) {
  return function() {
    (t.apply(this, arguments) ? Vo : Wo)(this, e);
  };
}
function yr(e, t) {
  var i = Fo(e + "");
  if (arguments.length < 2) {
    for (var s = vs(this.node()), o = -1, a = i.length; ++o < a; ) if (!s.contains(i[o])) return !1;
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
function Ar() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Mr() {
  return this.each(Ar);
}
function Pr(e) {
  var t = typeof e == "function" ? e : Ro(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Tr() {
  return null;
}
function Or(e, t) {
  var i = typeof e == "function" ? e : Ro(e), s = t == null ? Tr : typeof t == "function" ? t : ys(t);
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
function Lr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Dr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function zr(e) {
  return this.select(e ? Dr : Lr);
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
      for (var i = 0, s = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++s] = a;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Vr(e, t, i) {
  return function() {
    var s = this.__on, o, a = qr(t);
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
function Wr(e, t, i) {
  var s = Fr(e + ""), o, a = s.length, n;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var c = 0, p = r.length, g; c < p; ++c)
        for (o = 0, g = r[c]; o < a; ++o)
          if ((n = s[o]).type === g.type && n.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Vr : Br, o = 0; o < a; ++o) this.each(r(s[o], t, i));
  return this;
}
function Ho(e, t, i) {
  var s = qo(e), o = s.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = s.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function Hr(e, t) {
  return function() {
    return Ho(this, e, t);
  };
}
function Gr(e, t) {
  return function() {
    return Ho(this, e, t.apply(this, arguments));
  };
}
function jr(e, t) {
  return this.each((typeof t == "function" ? Gr : Hr)(e, t));
}
function* Yr() {
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
function Kr() {
  return this;
}
Ne.prototype = oi.prototype = {
  constructor: Ne,
  select: ba,
  selectAll: $a,
  selectChild: Aa,
  selectChildren: Oa,
  filter: Na,
  data: qa,
  enter: Ra,
  exit: Ba,
  join: Va,
  merge: Wa,
  selection: Kr,
  order: Ha,
  sort: Ga,
  call: Ya,
  nodes: Ka,
  node: Xa,
  size: Qa,
  empty: Ja,
  each: Za,
  attr: ar,
  style: cr,
  property: hr,
  classed: yr,
  text: xr,
  html: Er,
  raise: Cr,
  lower: Mr,
  append: Pr,
  insert: Or,
  remove: Rr,
  clone: zr,
  datum: Ur,
  on: Wr,
  dispatch: jr,
  [Symbol.iterator]: Yr
};
function Ue(e) {
  return typeof e == "string" ? new Ne([[document.querySelector(e)]], [document.documentElement]) : new Ne([[e]], Go);
}
function Xr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function dt(e, t) {
  if (e = Xr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Qr = { value: () => {
} };
function ws() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new wi(i);
}
function wi(e) {
  this._ = e;
}
function Jr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", o = i.indexOf(".");
    if (o >= 0 && (s = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
wi.prototype = ws.prototype = {
  constructor: wi,
  on: function(e, t) {
    var i = this._, s = Jr(e + "", i), o, a = -1, n = s.length;
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
    return new wi(e);
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
      e[s] = Qr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const os = { capture: !0, passive: !1 };
function ns(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ed(e) {
  var t = e.document.documentElement, i = Ue(e).on("dragstart.drag", ns, os);
  "onselectstart" in t ? i.on("selectstart.drag", ns, os) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function td(e, t) {
  var i = e.document.documentElement, s = Ue(e).on("dragstart.drag", null);
  t && (s.on("click.drag", ns, os), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function bs(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function jo(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function ni() {
}
var Zt = 0.7, Pi = 1 / Zt, St = "\\s*([+-]?\\d+)\\s*", ei = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", id = /^#([0-9a-f]{3,8})$/, sd = new RegExp(`^rgb\\(${St},${St},${St}\\)$`), od = new RegExp(`^rgb\\(${Ge},${Ge},${Ge}\\)$`), nd = new RegExp(`^rgba\\(${St},${St},${St},${ei}\\)$`), ad = new RegExp(`^rgba\\(${Ge},${Ge},${Ge},${ei}\\)$`), rd = new RegExp(`^hsl\\(${ei},${Ge},${Ge}\\)$`), dd = new RegExp(`^hsla\\(${ei},${Ge},${Ge},${ei}\\)$`), Hs = {
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
bs(ni, ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Gs,
  // Deprecated! Use color.formatHex.
  formatHex: Gs,
  formatHex8: ld,
  formatHsl: cd,
  formatRgb: js,
  toString: js
});
function Gs() {
  return this.rgb().formatHex();
}
function ld() {
  return this.rgb().formatHex8();
}
function cd() {
  return Yo(this).formatHsl();
}
function js() {
  return this.rgb().formatRgb();
}
function ti(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = id.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Ys(t) : i === 3 ? new Te(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? pi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? pi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = sd.exec(e)) ? new Te(t[1], t[2], t[3], 1) : (t = od.exec(e)) ? new Te(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = nd.exec(e)) ? pi(t[1], t[2], t[3], t[4]) : (t = ad.exec(e)) ? pi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = rd.exec(e)) ? Qs(t[1], t[2] / 100, t[3] / 100, 1) : (t = dd.exec(e)) ? Qs(t[1], t[2] / 100, t[3] / 100, t[4]) : Hs.hasOwnProperty(e) ? Ys(Hs[e]) : e === "transparent" ? new Te(NaN, NaN, NaN, 0) : null;
}
function Ys(e) {
  return new Te(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function pi(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new Te(e, t, i, s);
}
function pd(e) {
  return e instanceof ni || (e = ti(e)), e ? (e = e.rgb(), new Te(e.r, e.g, e.b, e.opacity)) : new Te();
}
function as(e, t, i, s) {
  return arguments.length === 1 ? pd(e) : new Te(e, t, i, s ?? 1);
}
function Te(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
bs(Te, as, jo(ni, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Zt : Math.pow(Zt, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Te(ft(this.r), ft(this.g), ft(this.b), Ti(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ks,
  // Deprecated! Use color.formatHex.
  formatHex: Ks,
  formatHex8: ud,
  formatRgb: Xs,
  toString: Xs
}));
function Ks() {
  return `#${mt(this.r)}${mt(this.g)}${mt(this.b)}`;
}
function ud() {
  return `#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Xs() {
  const e = Ti(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ft(this.r)}, ${ft(this.g)}, ${ft(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ti(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ft(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function mt(e) {
  return e = ft(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Qs(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qe(e, t, i, s);
}
function Yo(e) {
  if (e instanceof qe) return new qe(e.h, e.s, e.l, e.opacity);
  if (e instanceof ni || (e = ti(e)), !e) return new qe();
  if (e instanceof qe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, o = Math.min(t, i, s), a = Math.max(t, i, s), n = NaN, r = a - o, c = (a + o) / 2;
  return r ? (t === a ? n = (i - s) / r + (i < s) * 6 : i === a ? n = (s - t) / r + 2 : n = (t - i) / r + 4, r /= c < 0.5 ? a + o : 2 - a - o, n *= 60) : r = c > 0 && c < 1 ? 0 : n, new qe(n, r, c, e.opacity);
}
function md(e, t, i, s) {
  return arguments.length === 1 ? Yo(e) : new qe(e, t, i, s ?? 1);
}
function qe(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
bs(qe, md, jo(ni, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Zt : Math.pow(Zt, e), new qe(this.h, this.s, this.l * e, this.opacity);
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
    return new qe(Js(this.h), ui(this.s), ui(this.l), Ti(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ti(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Js(this.h)}, ${ui(this.s) * 100}%, ${ui(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Js(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ui(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Qi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Ko = (e) => () => e;
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
  return (e = +e) == 1 ? Xo : function(t, i) {
    return i - t ? fd(t, i, e) : Ko(isNaN(t) ? i : t);
  };
}
function Xo(e, t) {
  var i = t - e;
  return i ? hd(e, i) : Ko(isNaN(e) ? t : e);
}
const Zs = (function e(t) {
  var i = gd(t);
  function s(o, a) {
    var n = i((o = as(o)).r, (a = as(a)).r), r = i(o.g, a.g), c = i(o.b, a.b), p = Xo(o.opacity, a.opacity);
    return function(g) {
      return o.r = n(g), o.g = r(g), o.b = c(g), o.opacity = p(g), o + "";
    };
  }
  return s.gamma = e, s;
})(1);
function tt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var rs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ji = new RegExp(rs.source, "g");
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
  var i = rs.lastIndex = Ji.lastIndex = 0, s, o, a, n = -1, r = [], c = [];
  for (e = e + "", t = t + ""; (s = rs.exec(e)) && (o = Ji.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), r[n] ? r[n] += a : r[++n] = a), (s = s[0]) === (o = o[0]) ? r[n] ? r[n] += o : r[++n] = o : (r[++n] = null, c.push({ i: n, x: tt(s, o) })), i = Ji.lastIndex;
  return i < t.length && (a = t.slice(i), r[n] ? r[n] += a : r[++n] = a), r.length < 2 ? c[0] ? yd(c[0].x) : Id(t) : (t = c.length, function(p) {
    for (var g = 0, I; g < t; ++g) r[(I = c[g]).i] = I.x(p);
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
  var n, r, c;
  return (n = Math.sqrt(e * e + t * t)) && (e /= n, t /= n), (c = e * i + t * s) && (i -= e * c, s -= t * c), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, c /= r), e * s < t * i && (e = -e, t = -t, c = -c, n = -n), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * eo,
    skewX: Math.atan(c) * eo,
    scaleX: n,
    scaleY: r
  };
}
var mi;
function wd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ds : Qo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function bd(e) {
  return e == null || (mi || (mi = document.createElementNS("http://www.w3.org/2000/svg", "g")), mi.setAttribute("transform", e), !(e = mi.transform.baseVal.consolidate())) ? ds : (e = e.matrix, Qo(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Jo(e, t, i, s) {
  function o(p) {
    return p.length ? p.pop() + " " : "";
  }
  function a(p, g, I, f, h, d) {
    if (p !== I || g !== f) {
      var u = h.push("translate(", null, t, null, i);
      d.push({ i: u - 4, x: tt(p, I) }, { i: u - 2, x: tt(g, f) });
    } else (I || f) && h.push("translate(" + I + t + f + i);
  }
  function n(p, g, I, f) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), f.push({ i: I.push(o(I) + "rotate(", null, s) - 2, x: tt(p, g) })) : g && I.push(o(I) + "rotate(" + g + s);
  }
  function r(p, g, I, f) {
    p !== g ? f.push({ i: I.push(o(I) + "skewX(", null, s) - 2, x: tt(p, g) }) : g && I.push(o(I) + "skewX(" + g + s);
  }
  function c(p, g, I, f, h, d) {
    if (p !== I || g !== f) {
      var u = h.push(o(h) + "scale(", null, ",", null, ")");
      d.push({ i: u - 4, x: tt(p, I) }, { i: u - 2, x: tt(g, f) });
    } else (I !== 1 || f !== 1) && h.push(o(h) + "scale(" + I + "," + f + ")");
  }
  return function(p, g) {
    var I = [], f = [];
    return p = e(p), g = e(g), a(p.translateX, p.translateY, g.translateX, g.translateY, I, f), n(p.rotate, g.rotate, I, f), r(p.skewX, g.skewX, I, f), c(p.scaleX, p.scaleY, g.scaleX, g.scaleY, I, f), p = g = null, function(h) {
      for (var d = -1, u = f.length, m; ++d < u; ) I[(m = f[d]).i] = m.x(h);
      return I.join("");
    };
  };
}
var xd = Jo(wd, "px, ", "px)", "deg)"), kd = Jo(bd, ", ", ")", ")"), _d = 1e-12;
function to(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function $d(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ed(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Sd = (function e(t, i, s) {
  function o(a, n) {
    var r = a[0], c = a[1], p = a[2], g = n[0], I = n[1], f = n[2], h = g - r, d = I - c, u = h * h + d * d, m, w;
    if (u < _d)
      w = Math.log(f / p) / t, m = function(L) {
        return [
          r + L * h,
          c + L * d,
          p * Math.exp(t * L * w)
        ];
      };
    else {
      var _ = Math.sqrt(u), k = (f * f - p * p + s * u) / (2 * p * i * _), O = (f * f - p * p - s * u) / (2 * f * i * _), D = Math.log(Math.sqrt(k * k + 1) - k), N = Math.log(Math.sqrt(O * O + 1) - O);
      w = (N - D) / t, m = function(L) {
        var M = L * w, x = to(D), U = p / (i * _) * (x * Ed(t * M + D) - $d(D));
        return [
          r + U * h,
          c + U * d,
          p * x / to(t * M + D)
        ];
      };
    }
    return m.duration = w * 1e3 * t / Math.SQRT2, m;
  }
  return o.rho = function(a) {
    var n = Math.max(1e-3, +a), r = n * n, c = r * r;
    return e(n, r, c);
  }, o;
})(Math.SQRT2, 2, 4);
var Pt = 0, Wt = 0, zt = 0, Zo = 1e3, Oi, Ht, Ni = 0, It = 0, Ui = 0, ii = typeof performance == "object" && performance.now ? performance : Date, en = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function xs() {
  return It || (en(Cd), It = ii.now() + Ui);
}
function Cd() {
  It = 0;
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
function Ad() {
  xs(), ++Pt;
  for (var e = Oi, t; e; )
    (t = It - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Pt;
}
function io() {
  It = (Ni = ii.now()) + Ui, Pt = Wt = 0;
  try {
    Ad();
  } finally {
    Pt = 0, Pd(), It = 0;
  }
}
function Md() {
  var e = ii.now(), t = e - Ni;
  t > Zo && (Ui -= t, Ni = e);
}
function Pd() {
  for (var e, t = Oi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Oi = i);
  Ht = e, ls(s);
}
function ls(e) {
  if (!Pt) {
    Wt && (Wt = clearTimeout(Wt));
    var t = e - It;
    t > 24 ? (e < 1 / 0 && (Wt = setTimeout(io, e - ii.now() - Ui)), zt && (zt = clearInterval(zt))) : (zt || (Ni = ii.now(), zt = setInterval(Md, Zo)), Pt = 1, en(io));
  }
}
function so(e, t, i) {
  var s = new Ri();
  return t = t == null ? 0 : +t, s.restart((o) => {
    s.stop(), e(o + t);
  }, t, i), s;
}
var Td = ws("start", "end", "cancel", "interrupt"), Od = [], sn = 0, oo = 1, cs = 2, bi = 3, no = 4, ps = 5, xi = 6;
function qi(e, t, i, s, o, a) {
  var n = e.__transition;
  if (!n) e.__transition = {};
  else if (i in n) return;
  Nd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Td,
    tween: Od,
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
function je(e, t) {
  var i = Be(e, t);
  if (i.state > bi) throw new Error("too late; already running");
  return i;
}
function Be(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Nd(e, t, i) {
  var s = e.__transition, o;
  s[t] = i, i.timer = tn(a, 0, i.time);
  function a(p) {
    i.state = oo, i.timer.restart(n, i.delay, i.time), i.delay <= p && n(p - i.delay);
  }
  function n(p) {
    var g, I, f, h;
    if (i.state !== oo) return c();
    for (g in s)
      if (h = s[g], h.name === i.name) {
        if (h.state === bi) return so(n);
        h.state === no ? (h.state = xi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[g]) : +g < t && (h.state = xi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[g]);
      }
    if (so(function() {
      i.state === bi && (i.state = no, i.timer.restart(r, i.delay, i.time), r(p));
    }), i.state = cs, i.on.call("start", e, e.__data__, i.index, i.group), i.state === cs) {
      for (i.state = bi, o = new Array(f = i.tween.length), g = 0, I = -1; g < f; ++g)
        (h = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (o[++I] = h);
      o.length = I + 1;
    }
  }
  function r(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = ps, 1), I = -1, f = o.length; ++I < f; )
      o[I].call(e, g);
    i.state === ps && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
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
function Rd(e) {
  return this.each(function() {
    ki(this, e);
  });
}
function Ld(e, t) {
  var i, s;
  return function() {
    var o = je(this, e), a = o.tween;
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
    var a = je(this, e), n = a.tween;
    if (n !== s) {
      o = (s = n).slice();
      for (var r = { name: t, value: i }, c = 0, p = o.length; c < p; ++c)
        if (o[c].name === t) {
          o[c] = r;
          break;
        }
      c === p && o.push(r);
    }
    a.tween = o;
  };
}
function zd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Be(this.node(), i).tween, o = 0, a = s.length, n; o < a; ++o)
      if ((n = s[o]).name === e)
        return n.value;
    return null;
  }
  return this.each((t == null ? Ld : Dd)(i, e, t));
}
function _s(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var o = je(this, s);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Be(o, s).value[t];
  };
}
function on(e, t) {
  var i;
  return (typeof t == "number" ? tt : t instanceof ti ? Zs : (i = ti(t)) ? (t = i, Zs) : vd)(e, t);
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
  var s, o = i + "", a;
  return function() {
    var n = this.getAttribute(e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Bd(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = this.getAttributeNS(e.space, e.local);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Vd(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), c;
    return r == null ? void this.removeAttribute(e) : (n = this.getAttribute(e), c = r + "", n === c ? null : n === s && c === o ? a : (o = c, a = t(s = n, r)));
  };
}
function Wd(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), c;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (n = this.getAttributeNS(e.space, e.local), c = r + "", n === c ? null : n === s && c === o ? a : (o = c, a = t(s = n, r)));
  };
}
function Hd(e, t) {
  var i = zi(e), s = i === "transform" ? kd : on;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Wd : Vd)(i, s, _s(this, "attr." + e, t)) : t == null ? (i.local ? qd : Ud)(i) : (i.local ? Bd : Fd)(i, s, t));
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
function Yd(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && jd(e, a)), i;
  }
  return o._value = t, o;
}
function Kd(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && Gd(e, a)), i;
  }
  return o._value = t, o;
}
function Xd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = zi(e);
  return this.tween(i, (s.local ? Yd : Kd)(s, t));
}
function Qd(e, t) {
  return function() {
    ks(this, e).delay = +t.apply(this, arguments);
  };
}
function Jd(e, t) {
  return t = +t, function() {
    ks(this, e).delay = t;
  };
}
function Zd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Qd : Jd)(t, e)) : Be(this.node(), t).delay;
}
function el(e, t) {
  return function() {
    je(this, e).duration = +t.apply(this, arguments);
  };
}
function tl(e, t) {
  return t = +t, function() {
    je(this, e).duration = t;
  };
}
function il(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? el : tl)(t, e)) : Be(this.node(), t).duration;
}
function sl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    je(this, e).ease = t;
  };
}
function ol(e) {
  var t = this._id;
  return arguments.length ? this.each(sl(t, e)) : Be(this.node(), t).ease;
}
function nl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    je(this, e).ease = i;
  };
}
function al(e) {
  if (typeof e != "function") throw new Error();
  return this.each(nl(this._id, e));
}
function rl(e) {
  typeof e != "function" && (e = Do(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], c, p = 0; p < n; ++p)
      (c = a[p]) && e.call(c, c.__data__, p, a) && r.push(c);
  return new Ze(s, this._parents, this._name, this._id);
}
function dl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, o = i.length, a = Math.min(s, o), n = new Array(s), r = 0; r < a; ++r)
    for (var c = t[r], p = i[r], g = c.length, I = n[r] = new Array(g), f, h = 0; h < g; ++h)
      (f = c[h] || p[h]) && (I[h] = f);
  for (; r < s; ++r)
    n[r] = t[r];
  return new Ze(n, this._parents, this._name, this._id);
}
function ll(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function cl(e, t, i) {
  var s, o, a = ll(t) ? ks : je;
  return function() {
    var n = a(this, e), r = n.on;
    r !== s && (o = (s = r).copy()).on(t, i), n.on = o;
  };
}
function pl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Be(this.node(), i).on.on(e) : this.each(cl(i, e, t));
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
  typeof e != "function" && (e = ys(e));
  for (var s = this._groups, o = s.length, a = new Array(o), n = 0; n < o; ++n)
    for (var r = s[n], c = r.length, p = a[n] = new Array(c), g, I, f = 0; f < c; ++f)
      (g = r[f]) && (I = e.call(g, g.__data__, f, r)) && ("__data__" in g && (I.__data__ = g.__data__), p[f] = I, qi(p[f], t, i, f, p, Be(g, i)));
  return new Ze(a, this._parents, t, i);
}
function fl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Lo(e));
  for (var s = this._groups, o = s.length, a = [], n = [], r = 0; r < o; ++r)
    for (var c = s[r], p = c.length, g, I = 0; I < p; ++I)
      if (g = c[I]) {
        for (var f = e.call(g, g.__data__, I, c), h, d = Be(g, i), u = 0, m = f.length; u < m; ++u)
          (h = f[u]) && qi(h, t, i, u, f, d);
        a.push(f), n.push(g);
      }
  return new Ze(a, n, t, i);
}
var gl = oi.prototype.constructor;
function Il() {
  return new gl(this._groups, this._parents);
}
function yl(e, t) {
  var i, s, o;
  return function() {
    var a = Mt(this, e), n = (this.style.removeProperty(e), Mt(this, e));
    return a === n ? null : a === i && n === s ? o : o = t(i = a, s = n);
  };
}
function nn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function vl(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = Mt(this, e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function wl(e, t, i) {
  var s, o, a;
  return function() {
    var n = Mt(this, e), r = i(this), c = r + "";
    return r == null && (c = r = (this.style.removeProperty(e), Mt(this, e))), n === c ? null : n === s && c === o ? a : (o = c, a = t(s = n, r));
  };
}
function bl(e, t) {
  var i, s, o, a = "style." + t, n = "end." + a, r;
  return function() {
    var c = je(this, e), p = c.on, g = c.value[a] == null ? r || (r = nn(t)) : void 0;
    (p !== i || o !== g) && (s = (i = p).copy()).on(n, o = g), c.on = s;
  };
}
function xl(e, t, i) {
  var s = (e += "") == "transform" ? xd : on;
  return t == null ? this.styleTween(e, yl(e, s)).on("end.style." + e, nn(e)) : typeof t == "function" ? this.styleTween(e, wl(e, s, _s(this, "style." + e, t))).each(bl(this._id, e)) : this.styleTween(e, vl(e, s, t), i).on("end.style." + e, null);
}
function kl(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function _l(e, t, i) {
  var s, o;
  function a() {
    var n = t.apply(this, arguments);
    return n !== o && (s = (o = n) && kl(e, n, i)), s;
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
  return this.tween("text", typeof e == "function" ? Sl(_s(this, "text", e)) : El(e == null ? "" : e + ""));
}
function Al(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ml(e) {
  var t, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && Al(o)), t;
  }
  return s._value = e, s;
}
function Pl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ml(e));
}
function Tl() {
  for (var e = this._name, t = this._id, i = an(), s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, c, p = 0; p < r; ++p)
      if (c = n[p]) {
        var g = Be(c, t);
        qi(c, e, i, p, n, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ze(s, this._parents, e, i);
}
function Ol() {
  var e, t, i = this, s = i._id, o = i.size();
  return new Promise(function(a, n) {
    var r = { value: n }, c = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var p = je(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(c)), p.on = t;
    }), o === 0 && a();
  });
}
var Nl = 0;
function Ze(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function an() {
  return ++Nl;
}
var Qe = oi.prototype;
Ze.prototype = {
  constructor: Ze,
  select: hl,
  selectAll: fl,
  selectChild: Qe.selectChild,
  selectChildren: Qe.selectChildren,
  filter: rl,
  merge: dl,
  selection: Il,
  transition: Tl,
  call: Qe.call,
  nodes: Qe.nodes,
  node: Qe.node,
  size: Qe.size,
  empty: Qe.empty,
  each: Qe.each,
  on: pl,
  attr: Hd,
  attrTween: Xd,
  style: xl,
  styleTween: $l,
  text: Cl,
  textTween: Pl,
  remove: ml,
  tween: zd,
  delay: Zd,
  duration: il,
  ease: ol,
  easeVarying: al,
  end: Ol,
  [Symbol.iterator]: Qe[Symbol.iterator]
};
function Rl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Ll = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Rl
};
function Dl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function zl(e) {
  var t, i;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = an(), (i = Ll).time = xs(), e = e == null ? null : e + "");
  for (var s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, c, p = 0; p < r; ++p)
      (c = n[p]) && qi(c, e, t, p, n, i || Dl(c, t));
  return new Ze(s, this._parents, e, t);
}
oi.prototype.interrupt = Rd;
oi.prototype.transition = zl;
const hi = (e) => () => e;
function Ul(e, {
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
function Je(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Je.prototype = {
  constructor: Je,
  scale: function(e) {
    return e === 1 ? this : new Je(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Je(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Yt = new Je(1, 0, 0);
Je.prototype;
function Zi(e) {
  e.stopImmediatePropagation();
}
function Ut(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ql(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Fl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function ao() {
  return this.__zoom || Yt;
}
function Bl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Vl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Wl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], n = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o),
    n > a ? (a + n) / 2 : Math.min(0, a) || Math.max(0, n)
  );
}
function Hl() {
  var e = ql, t = Fl, i = Wl, s = Bl, o = Vl, a = [0, 1 / 0], n = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, c = Sd, p = ws("start", "zoom", "end"), g, I, f, h = 500, d = 150, u = 0, m = 10;
  function w(y) {
    y.property("__zoom", ao).on("wheel.zoom", M, { passive: !1 }).on("mousedown.zoom", x).on("dblclick.zoom", U).filter(o).on("touchstart.zoom", W).on("touchmove.zoom", re).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(y, C, v, b) {
    var E = y.selection ? y.selection() : y;
    E.property("__zoom", ao), y !== E ? D(y, C, v, b) : E.interrupt().each(function() {
      N(this, arguments).event(b).start().zoom(null, typeof C == "function" ? C.apply(this, arguments) : C).end();
    });
  }, w.scaleBy = function(y, C, v, b) {
    w.scaleTo(y, function() {
      var E = this.__zoom.k, $ = typeof C == "function" ? C.apply(this, arguments) : C;
      return E * $;
    }, v, b);
  }, w.scaleTo = function(y, C, v, b) {
    w.transform(y, function() {
      var E = t.apply(this, arguments), $ = this.__zoom, P = v == null ? O(E) : typeof v == "function" ? v.apply(this, arguments) : v, A = $.invert(P), R = typeof C == "function" ? C.apply(this, arguments) : C;
      return i(k(_($, R), P, A), E, n);
    }, v, b);
  }, w.translateBy = function(y, C, v, b) {
    w.transform(y, function() {
      return i(this.__zoom.translate(
        typeof C == "function" ? C.apply(this, arguments) : C,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), n);
    }, null, b);
  }, w.translateTo = function(y, C, v, b, E) {
    w.transform(y, function() {
      var $ = t.apply(this, arguments), P = this.__zoom, A = b == null ? O($) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(Yt.translate(A[0], A[1]).scale(P.k).translate(
        typeof C == "function" ? -C.apply(this, arguments) : -C,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), $, n);
    }, b, E);
  };
  function _(y, C) {
    return C = Math.max(a[0], Math.min(a[1], C)), C === y.k ? y : new Je(C, y.x, y.y);
  }
  function k(y, C, v) {
    var b = C[0] - v[0] * y.k, E = C[1] - v[1] * y.k;
    return b === y.x && E === y.y ? y : new Je(y.k, b, E);
  }
  function O(y) {
    return [(+y[0][0] + +y[1][0]) / 2, (+y[0][1] + +y[1][1]) / 2];
  }
  function D(y, C, v, b) {
    y.on("start.zoom", function() {
      N(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      N(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var E = this, $ = arguments, P = N(E, $).event(b), A = t.apply(E, $), R = v == null ? O(A) : typeof v == "function" ? v.apply(E, $) : v, q = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), G = E.__zoom, ne = typeof C == "function" ? C.apply(E, $) : C, ue = c(G.invert(R).concat(q / G.k), ne.invert(R).concat(q / ne.k));
      return function(F) {
        if (F === 1) F = ne;
        else {
          var H = ue(F), de = q / H[2];
          F = new Je(de, R[0] - H[0] * de, R[1] - H[1] * de);
        }
        P.zoom(null, F);
      };
    });
  }
  function N(y, C, v) {
    return !v && y.__zooming || new L(y, C);
  }
  function L(y, C) {
    this.that = y, this.args = C, this.active = 0, this.sourceEvent = null, this.extent = t.apply(y, C), this.taps = 0;
  }
  L.prototype = {
    event: function(y) {
      return y && (this.sourceEvent = y), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(y, C) {
      return this.mouse && y !== "mouse" && (this.mouse[1] = C.invert(this.mouse[0])), this.touch0 && y !== "touch" && (this.touch0[1] = C.invert(this.touch0[0])), this.touch1 && y !== "touch" && (this.touch1[1] = C.invert(this.touch1[0])), this.that.__zoom = C, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(y) {
      var C = Ue(this.that).datum();
      p.call(
        y,
        this.that,
        new Ul(y, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: p
        }),
        C
      );
    }
  };
  function M(y, ...C) {
    if (!e.apply(this, arguments)) return;
    var v = N(this, C).event(y), b = this.__zoom, E = Math.max(a[0], Math.min(a[1], b.k * Math.pow(2, s.apply(this, arguments)))), $ = dt(y);
    if (v.wheel)
      (v.mouse[0][0] !== $[0] || v.mouse[0][1] !== $[1]) && (v.mouse[1] = b.invert(v.mouse[0] = $)), clearTimeout(v.wheel);
    else {
      if (b.k === E) return;
      v.mouse = [$, b.invert($)], ki(this), v.start();
    }
    Ut(y), v.wheel = setTimeout(P, d), v.zoom("mouse", i(k(_(b, E), v.mouse[0], v.mouse[1]), v.extent, n));
    function P() {
      v.wheel = null, v.end();
    }
  }
  function x(y, ...C) {
    if (f || !e.apply(this, arguments)) return;
    var v = y.currentTarget, b = N(this, C, !0).event(y), E = Ue(y.view).on("mousemove.zoom", R, !0).on("mouseup.zoom", q, !0), $ = dt(y, v), P = y.clientX, A = y.clientY;
    ed(y.view), Zi(y), b.mouse = [$, this.__zoom.invert($)], ki(this), b.start();
    function R(G) {
      if (Ut(G), !b.moved) {
        var ne = G.clientX - P, ue = G.clientY - A;
        b.moved = ne * ne + ue * ue > u;
      }
      b.event(G).zoom("mouse", i(k(b.that.__zoom, b.mouse[0] = dt(G, v), b.mouse[1]), b.extent, n));
    }
    function q(G) {
      E.on("mousemove.zoom mouseup.zoom", null), td(G.view, b.moved), Ut(G), b.event(G).end();
    }
  }
  function U(y, ...C) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, b = dt(y.changedTouches ? y.changedTouches[0] : y, this), E = v.invert(b), $ = v.k * (y.shiftKey ? 0.5 : 2), P = i(k(_(v, $), b, E), t.apply(this, C), n);
      Ut(y), r > 0 ? Ue(this).transition().duration(r).call(D, P, b, y) : Ue(this).call(w.transform, P, b, y);
    }
  }
  function W(y, ...C) {
    if (e.apply(this, arguments)) {
      var v = y.touches, b = v.length, E = N(this, C, y.changedTouches.length === b).event(y), $, P, A, R;
      for (Zi(y), P = 0; P < b; ++P)
        A = v[P], R = dt(A, this), R = [R, this.__zoom.invert(R), A.identifier], E.touch0 ? !E.touch1 && E.touch0[2] !== R[2] && (E.touch1 = R, E.taps = 0) : (E.touch0 = R, $ = !0, E.taps = 1 + !!g);
      g && (g = clearTimeout(g)), $ && (E.taps < 2 && (I = R[0], g = setTimeout(function() {
        g = null;
      }, h)), ki(this), E.start());
    }
  }
  function re(y, ...C) {
    if (this.__zooming) {
      var v = N(this, C).event(y), b = y.changedTouches, E = b.length, $, P, A, R;
      for (Ut(y), $ = 0; $ < E; ++$)
        P = b[$], A = dt(P, this), v.touch0 && v.touch0[2] === P.identifier ? v.touch0[0] = A : v.touch1 && v.touch1[2] === P.identifier && (v.touch1[0] = A);
      if (P = v.that.__zoom, v.touch1) {
        var q = v.touch0[0], G = v.touch0[1], ne = v.touch1[0], ue = v.touch1[1], F = (F = ne[0] - q[0]) * F + (F = ne[1] - q[1]) * F, H = (H = ue[0] - G[0]) * H + (H = ue[1] - G[1]) * H;
        P = _(P, Math.sqrt(F / H)), A = [(q[0] + ne[0]) / 2, (q[1] + ne[1]) / 2], R = [(G[0] + ue[0]) / 2, (G[1] + ue[1]) / 2];
      } else if (v.touch0) A = v.touch0[0], R = v.touch0[1];
      else return;
      v.zoom("touch", i(k(P, A, R), v.extent, n));
    }
  }
  function te(y, ...C) {
    if (this.__zooming) {
      var v = N(this, C).event(y), b = y.changedTouches, E = b.length, $, P;
      for (Zi(y), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, h), $ = 0; $ < E; ++$)
        P = b[$], v.touch0 && v.touch0[2] === P.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === P.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (P = dt(P, this), Math.hypot(I[0] - P[0], I[1] - P[1]) < m)) {
        var A = Ue(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(y) {
    return arguments.length ? (s = typeof y == "function" ? y : hi(+y), w) : s;
  }, w.filter = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : hi(!!y), w) : e;
  }, w.touchable = function(y) {
    return arguments.length ? (o = typeof y == "function" ? y : hi(!!y), w) : o;
  }, w.extent = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : hi([[+y[0][0], +y[0][1]], [+y[1][0], +y[1][1]]]), w) : t;
  }, w.scaleExtent = function(y) {
    return arguments.length ? (a[0] = +y[0], a[1] = +y[1], w) : [a[0], a[1]];
  }, w.translateExtent = function(y) {
    return arguments.length ? (n[0][0] = +y[0][0], n[1][0] = +y[1][0], n[0][1] = +y[0][1], n[1][1] = +y[1][1], w) : [[n[0][0], n[0][1]], [n[1][0], n[1][1]]];
  }, w.constrain = function(y) {
    return arguments.length ? (i = y, w) : i;
  }, w.duration = function(y) {
    return arguments.length ? (r = +y, w) : r;
  }, w.interpolate = function(y) {
    return arguments.length ? (c = y, w) : c;
  }, w.on = function() {
    var y = p.on.apply(p, arguments);
    return y === p ? w : y;
  }, w.clickDistance = function(y) {
    return arguments.length ? (u = (y = +y) * y, w) : Math.sqrt(u);
  }, w.tapDistance = function(y) {
    return arguments.length ? (m = +y, w) : m;
  }, w;
}
var Gl = Object.defineProperty, jl = Object.getOwnPropertyDescriptor, ye = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? jl(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Gl(t, i, o), o;
};
function Yl(e, t, i, s) {
  const o = t.x - e.x, a = t.y - e.y, n = s.x - i.x, r = s.y - i.y, c = o * r - a * n;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * r - (i.y - e.y) * n) / c, g = ((i.x - e.x) * a - (i.y - e.y) * o) / c;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * a, t: p };
}
function Kl(e, t, i) {
  const s = i.x - t.x, o = i.y - t.y, a = s * s + o * o || 1, n = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * o) / a)), r = t.x + n * s, c = t.y + n * o;
  return { dist: Math.hypot(e.x - r, e.y - c), t: n };
}
function Xl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], n = e[o + 1], r = Math.hypot(n.x - a.x, n.y - a.y) || 1, c = (n.x - a.x) / r, p = (n.y - a.y) / r, g = t.map(([f, h]) => Yl(a, n, f, h)).filter((f) => f !== null).filter((f) => f.t * r > i + 2 && (1 - f.t) * r > i + 2).sort((f, h) => f.t - h.t);
    let I = -1 / 0;
    for (const f of g)
      f.t * r - i <= I + 2 || (s += ` L ${f.x - c * i} ${f.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${f.x + c * i} ${f.y + p * i}`, I = f.t * r + i);
    s += ` L ${n.x} ${n.y}`;
  }
  return s;
}
const $t = {
  component: ee`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ee`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: ee`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: ee`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: ee`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: ee`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: ee`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: ee`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: ee`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: ee`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: ee`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: ee`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: ee`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: ee`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: ee`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: ee`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: ee`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
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
    this._zoomBehavior = Hl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, n = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, c = Math.max(80, s.width - o - a), p = Math.max(80, s.height - n - r), g = Math.min(...t.map((m) => m.x - m.w / 2)) - e, I = Math.max(...t.map((m) => m.x + m.w / 2)) + e, f = Math.min(...t.map((m) => m.y - m.h / 2)) - e, h = Math.max(...t.map((m) => m.y + m.h / 2)) + e, d = Math.max(0.15, Math.min(c / (I - g), p / (h - f), 1.25)), u = Yt.translate(
      o + c / 2 - d * (g + I) / 2,
      n + p / 2 - d * (f + h) / 2
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
      const n = this.scene.nodes.find((c) => c.id === a);
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
        const o = this.nodePos(s), a = o.x - s.w / 2 + 10 + e.w / 2, n = o.x + s.w / 2 - 10 - e.w / 2, r = o.y - s.h / 2 + 34 + e.h / 2, c = o.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), n), i = Math.min(Math.max(i, r), c);
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
      (m) => a.has(m.id) && !(m.parentId && a.has(m.parentId))
    ) : null, r = n ? new Map(n.map((m) => [m.id, this.nodePos(m)])) : null, c = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !n, p = n ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, I = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const m = [], w = p === "menu" ? this.scene.nodes.filter((_) => _.kind === "ui-app") : this.scene.nodes.filter((_) => _.id === t.parentId);
      for (const _ of w) {
        const k = this.scene.nodes.filter((L) => L.parentId === _.id && I.includes(L.kind ?? "") && L.id !== t.id).sort((L, M) => L.y - M.y), O = _.x - _.w / 2 + 10, D = _.x + _.w / 2 - 10;
        for (const L of k) m.push({ x1: O, x2: D, y: L.y - L.h / 2 - 3, appId: _.id, beforeId: L.id });
        const N = k[k.length - 1];
        m.push({
          x1: O,
          x2: D,
          y: N ? N.y + N.h / 2 + 3 : _.y - _.h / 2 + 34 + 8,
          appId: _.id,
          beforeId: null
        });
      }
      return m;
    }, h = (m) => {
      const w = this.nodeIdAt(m), _ = w && w !== t.id ? this.scene.nodes.find((k) => k.id === w) : void 0;
      return _ ? _.kind === "external-system" ? _.id : _.parentId ?? null : null;
    }, d = (m) => {
      if ((m.buttons & 1) === 0) {
        u(m);
        return;
      }
      const w = this.toScene(m), _ = w.x - i.x, k = w.y - i.y;
      if (!(!o && Math.hypot(_, k) < 3 / this._t.k))
        if (o = !0, n && r) {
          const O = /* @__PURE__ */ new Map();
          for (const D of n) {
            const N = r.get(D.id), L = this.clampToParent(D, N.x + _, N.y + k);
            O.set(D.id, { x: L.x, y: L.y });
          }
          this._dragGroup = O;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + _, y: s.y + k }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const O = this.scene.nodes.filter(
            (N) => I.includes(N.kind ?? "") && N.id !== t.id && Math.abs(w.x - N.x) <= N.w / 2 + 8
          ), D = p === "menu" ? O.find((N) => Math.abs(w.y - N.y) < N.h * 0.28) : void 0;
          if (D)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: D.id }, this._hoverNodeId = D.id;
          else {
            let N = -1, L = 14;
            this._menuSlots.slots.forEach((M, x) => {
              if (w.x < M.x1 - 24 || w.x > M.x2 + 24) return;
              const U = Math.abs(w.y - M.y);
              U < L && (L = U, N = x);
            }), this._menuSlots = { ...this._menuSlots, active: N >= 0 ? N : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(m) ? (this._dragPos = { id: t.id, x: s.x + _, y: s.y + k }, this._hoverNodeId = h(m)) : (this._dragPos = this.clampToParent(t, s.x + _, s.y + k), this._hoverNodeId = null);
    }, u = (m) => {
      if (window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", u), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([w, _]) => ({ id: w, x: _.x, y: _.y }))
        });
      else if (o && this._dragPos && g) {
        const w = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const _ = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (w != null && w.nestRowId)
          this.emit(_, { id: t.id, nestRowId: w.nestRowId });
        else if (w && w.active !== null) {
          const k = w.slots[w.active];
          this.emit(_, { id: t.id, appId: k.appId, beforeId: k.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (c(m)) {
          const w = h(m);
          if (m.ctrlKey && t.kind === "api") {
            w && w !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: w,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (w !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: w,
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
    const o = 160, a = 90, n = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((u) => u.parentId === t.id), c = Math.min(...r.map((u) => u.x - u.w / 2)), p = Math.max(...r.map((u) => u.x + u.w / 2)), g = Math.min(...r.map((u) => u.y - u.h / 2)), I = Math.max(...r.map((u) => u.y + u.h / 2)), f = xn(
      r.map((u) => ({ dx: u.x - n.x, dy: u.y - n.y, w: u.w, h: u.h })),
      { w: o, h: a }
    ), h = (u) => {
      if ((u.buttons & 1) === 0) {
        d();
        return;
      }
      const m = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: n.x,
          y: n.y,
          w: Math.max(f.w, 2 * Math.abs(m.x - n.x)),
          h: Math.max(f.h, 2 * Math.abs(m.y - n.y))
        };
        return;
      }
      const w = n.x - i * n.w / 2, _ = n.y - s * n.h / 2, k = i > 0 ? Math.max(m.x, w + o, r.length ? p + 10 : -1 / 0) : Math.min(m.x, w - o, r.length ? c - 10 : 1 / 0), O = s > 0 ? Math.max(m.y, _ + a, r.length ? I + 10 : -1 / 0) : Math.min(m.y, _ - a, r.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (w + k) / 2,
        y: (_ + O) / 2,
        w: Math.abs(k - w),
        h: Math.abs(O - _)
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
    const { x: s, y: o } = this.nodePos(e), a = t - s, n = i - o, r = e.w / 2, c = e.h / 2;
    if (a === 0 && n === 0) return { x: s, y: o };
    const p = 1 / Math.max(Math.abs(a) / r, Math.abs(n) / c);
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
    let c = this.borderPoint(t, n.x, n.y), p = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const I = Math.hypot(p.x - c.x, p.y - c.y) || 1, f = -(p.y - c.y) / I * g, h = (p.x - c.x) / I * g;
        c = { x: c.x + f, y: c.y + h }, p = { x: p.x + f, y: p.y + h };
      }
    }
    return [c, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const o = (n) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(n), c = [...this._wpDrag.points];
      c[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: c };
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: o } = Kl(t, e[s], e[s + 1]);
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
    const n = (c) => {
      if ((c.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(c);
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
    return ee`
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
          ${e.tooltip ? ee`<title>${e.tooltip}</title>` : ""}
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
    }, c = t.slice(1, -1);
    return ee`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Xl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? ee`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${o ? c.map((p, g) => {
      var f;
      const I = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === g;
      return ee`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${I ? 6 : 5}
                        fill=${I ? "#2563eb" : "#ffffff"}
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
    var f, h, d, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, n = !!e.parentId, r = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, c = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = r / 2, g = c / 2, I = n && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ee`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerdown=${(m) => this.onNodePointerDown(m, e)}
         @dblclick=${(m) => {
      m.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ee`<rect x=${-p - 4} y=${-g - 4} width=${r + 8} height=${c + 8}
                  rx=${n ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${r} height=${c} rx=${n ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ee`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ee`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ee`<g transform="translate(${p - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(m) => {
      m.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(m) => m.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && $t[e.symbol] && !n ? ee`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${$t[e.symbol]}
              </g>` : ""}
        ${n && e.symbol && $t[e.symbol] ? ee`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${$t[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ee`
              <foreignObject x=${-p + 6} y=${a ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(m) => m.stopPropagation()}
                  @keydown=${(m) => {
      m.stopPropagation(), m.key === "Enter" && this.commitRename(e, m.target.value), m.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(m) => this.commitRename(e, m.target.value)}
                />
              </foreignObject>` : n ? ee`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${I}</text>` : a ? ee`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ee`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? ee`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (n ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([m, w]) => ee`
                <circle data-handle cx=${m} cy=${w} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${n ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (m, w) => ee`
                <g transform="translate(${-p + 24 + w * 20}, ${-g})">
                  <circle data-handle r="7" fill=${m.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(_) => this.onHandlePointerDown(_, e, m.kind)}>
                    <title>${m.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${a && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([m, w]) => ee`
                <rect data-resize x=${m * p - 6.5} y=${w * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${m * w > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(_) => this.onResizePointerDown(_, e, m, w)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return ee``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return ee``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return ee`
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
        const { a: n, b: r } = this._rubber, c = Math.min(n.x, r.x), p = Math.max(n.x, r.x), g = Math.min(n.y, r.y), I = Math.max(n.y, r.y), f = this.scene.nodes.filter((h) => {
          const d = this.nodePos(h);
          return d.x >= c && d.x <= p && d.y >= g && d.y <= I;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return ee``;
    const { a: e, b: t } = this._rubber;
    return ee`
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
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, n = (0 - this._t.y) / this._t.k, r = o.width / this._t.k, c = o.height / this._t.k;
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
      var g, I;
      (I = (g = p.currentTarget).hasPointerCapture) != null && I.call(g, p.pointerId) && this.onMinimapPointer(p, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return ee`<rect
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
            height=${c * s}
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
      (o) => ee`
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
          ${this._menuSlots ? ee`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (o, a) => ee`
                    <line x1=${o.x1} y1=${o.y} x2=${o.x2} y2=${o.y}
                          stroke=${a === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${a === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${a === this._menuSlots.active ? ee`<circle cx=${o.x1} cy=${o.y} r="3.5" fill="#0284c7"></circle>
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
ge.styles = yt`
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
  oe({ attribute: !1 })
], ge.prototype, "scene", 2);
ye([
  oe({ attribute: !1 })
], ge.prototype, "selectedId", 2);
ye([
  oe({ attribute: !1 })
], ge.prototype, "selectedIds", 2);
ye([
  oe({ type: Boolean })
], ge.prototype, "connectable", 2);
ye([
  oe({ attribute: !1 })
], ge.prototype, "edgePoints", 2);
ye([
  z()
], ge.prototype, "_t", 2);
ye([
  z()
], ge.prototype, "_dragPos", 2);
ye([
  z()
], ge.prototype, "_menuSlots", 2);
ye([
  z()
], ge.prototype, "_dragGroup", 2);
ye([
  z()
], ge.prototype, "_pendingLink", 2);
ye([
  z()
], ge.prototype, "_hoverNodeId", 2);
ye([
  z()
], ge.prototype, "_editingId", 2);
ye([
  z()
], ge.prototype, "_spaceDown", 2);
ye([
  z()
], ge.prototype, "_wpDrag", 2);
ye([
  z()
], ge.prototype, "_selectedWaypoint", 2);
ye([
  z()
], ge.prototype, "_resize", 2);
ye([
  z()
], ge.prototype, "_rubber", 2);
ye([
  oe({ attribute: !1 })
], ge.prototype, "fitInsets", 2);
ge = ye([
  vt("modux-canvas")
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
function Ae(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ce(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const kt = (e) => e.trim().toLowerCase();
function Ql(e, t) {
  var x, U, W, re, te;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((y) => [y.id, y.name])), o = e.modules.flatMap(
    (y) => (y.useCases ?? []).map((C) => ({ ...C, moduleId: y.id }))
  ), a = new Set(o.map((y) => y.id)), n = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((y) => (y.domainServices ?? []).map((C) => C.id))
  ), c = e.modules.flatMap(
    (y) => (y.domainEvents ?? []).map((C) => ({ ...C, moduleId: y.id, application: !1 }))
  ), p = e.modules.flatMap(
    (y) => (y.applicationEvents ?? []).map((C) => ({ ...C, moduleId: y.id, application: !0 }))
  ), g = e.modules.flatMap(
    (y) => (y.readModels ?? []).map((C) => ({ ...C, moduleId: y.id }))
  );
  for (const y of o)
    Ae(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: J.command.w,
      h: J.command.h,
      kind: "use-case",
      symbol: y.policy ? "flow" : "gear",
      fill: y.policy ? J.policy.fill : J.command.fill,
      stroke: y.policy ? J.policy.stroke : J.command.stroke,
      badge: y.policy ? "POLICY" : "COMANDO",
      tooltip: y.policy ? `${y.name} — policy de ${s.get(y.moduleId) ?? y.moduleId} (reacción, no caso de negocio)` : `${y.name} — caso de uso de ${s.get(y.moduleId) ?? y.moduleId}`
    });
  for (const y of o)
    (y.steps ?? []).forEach((C, v) => {
      Ae(i, {
        id: C.id,
        label: `${v + 1}. ${C.name || C.type || "paso"}`,
        x: 0,
        y: 0,
        w: J.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!C.customCodeId,
        tooltip: `Paso de ${y.name}${C.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), ce(i, {
        id: `esstep:${v === 0 ? y.id : (y.steps ?? [])[v - 1].id}->${C.id}`,
        sourceId: v === 0 ? y.id : (y.steps ?? [])[v - 1].id,
        targetId: C.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${y.name}`
      });
    });
  for (const y of e.customCodes ?? [])
    Ae(i, {
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
  for (const y of o)
    for (const C of y.steps ?? [])
      C.customCodeId && ce(i, {
        id: `escc:${C.id}`,
        sourceId: C.id,
        targetId: C.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: "El paso delega en código a mano — Supr lo desconecta"
      });
  for (const y of n)
    Ae(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: J.aggregate.w,
      h: J.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: J.aggregate.fill,
      stroke: J.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${y.name} — agregado de ${s.get(y.moduleId) ?? y.moduleId}`
    });
  const I = /* @__PURE__ */ new Map();
  for (const y of [...c, ...p])
    Ae(i, {
      id: y.id,
      label: y.name,
      x: 0,
      y: 0,
      w: J.event.w,
      h: J.event.h,
      kind: y.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: J.event.fill,
      stroke: J.event.stroke,
      badge: y.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${y.name} — evento de ${s.get(y.moduleId) ?? y.moduleId}`
    }), I.set(kt(y.name), y.id);
  const f = (y) => {
    if (!y || !y.trim()) return null;
    const C = I.get(kt(y));
    if (C) return C;
    const v = `evname:${kt(y)}`;
    return Ae(i, {
      id: v,
      label: y,
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
      tooltip: `${y} — referenciado por nombre, sin evento declarado en el catálogo`
    }), v;
  }, h = (y) => {
    const C = g.find((b) => b.id === y.id) ?? g.find((b) => y.name && kt(b.name) === kt(y.name)), v = (C == null ? void 0 : C.id) ?? (y.id || (y.name ? `rm:${kt(y.name)}` : null));
    return v ? (Ae(i, {
      id: v,
      label: (C == null ? void 0 : C.name) ?? y.name ?? v,
      x: 0,
      y: 0,
      w: J.readModel.w,
      h: J.readModel.h,
      kind: C ? "read-model" : "derived-read-model",
      fill: J.readModel.fill,
      stroke: J.readModel.stroke,
      dashed: !C,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const y of e.actorUses ?? []) {
    if (!a.has(y.targetId)) continue;
    const C = (e.actors ?? []).find((v) => v.id === y.actorId);
    C && (Ae(i, {
      id: C.id,
      label: C.name,
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
      id: `es-actor:${C.id}->${y.targetId}`,
      sourceId: C.id,
      targetId: y.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const y of e.aiAgents ?? []) {
    const C = (e.agentUses ?? []).filter((P) => P.agentId === y.id), v = (e.agentExternalUses ?? []).filter((P) => P.agentId === y.id), b = (e.agentRags ?? []).filter((P) => P.agentId === y.id), E = (e.agentMcpUses ?? []).filter((P) => P.agentId === y.id), $ = (e.agentGatewayUses ?? []).some((P) => P.agentId === y.id) || (e.agentApiOpUses ?? []).some((P) => P.agentId === y.id) || (e.agentQueryUses ?? []).some((P) => P.agentId === y.id) || (e.agentDelegations ?? []).some((P) => P.agentId === y.id) || (e.agentTriggers ?? []).some((P) => P.agentId === y.id);
    if (!(!C.length && !v.length && !b.length && !E.length && !$)) {
      Ae(i, {
        id: y.id,
        label: y.name,
        x: 0,
        y: 0,
        w: J.actor.w,
        h: J.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${y.name} — agente de IA (consume por MCP)`
      });
      for (const P of C)
        a.has(P.useCaseId) && ce(i, {
          id: `es-agent:${y.id}->${P.useCaseId}`,
          sourceId: y.id,
          targetId: P.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const P of v) {
        const A = e.externalSystems.find(
          (q) => (q.useCases ?? []).some((G) => G.id === P.externalUseCaseId)
        );
        if (!A) continue;
        const R = (x = (A.useCases ?? []).find((q) => q.id === P.externalUseCaseId)) == null ? void 0 : x.name;
        Ae(i, {
          id: A.id,
          label: A.name,
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
          id: `es-agentx:${y.id}->${P.externalUseCaseId}`,
          sourceId: y.id,
          targetId: A.id,
          kind: "es-agent-external",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Llama a ${R} del sistema externo` : void 0
        });
      }
      for (const P of E) {
        const A = e.externalSystems.find(
          (q) => (q.mcpServers ?? []).some((G) => G.id === P.mcpServerId)
        );
        if (!A) continue;
        const R = (U = (A.mcpServers ?? []).find((q) => q.id === P.mcpServerId)) == null ? void 0 : U.name;
        Ae(i, {
          id: A.id,
          label: A.name,
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
          id: `es-agentmcp:${y.id}->${P.mcpServerId}`,
          sourceId: y.id,
          targetId: A.id,
          kind: "es-agent-mcp",
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Consume las herramientas del servidor MCP ${R}` : void 0
        });
      }
      for (const P of b) {
        const A = (e.rags ?? []).find((R) => R.id === P.ragId);
        if (A) {
          Ae(i, {
            id: A.id,
            label: A.name,
            x: 0,
            y: 0,
            w: J.readModel.w,
            h: J.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${A.name} — base de conocimiento (retrieval)`
          }), ce(i, {
            id: `es-agrag:${y.id}->${A.id}`,
            sourceId: y.id,
            targetId: A.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const R of A.sourceReadModelIds ?? []) {
            const q = h({ id: R });
            q && ce(i, {
              id: `es-ragsrc:${A.id}->${q}`,
              sourceId: q,
              targetId: A.id,
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
    const C = e.externalSystems.find((v) => v.id === y);
    return C ? (Ae(i, {
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
    }), C.id) : null;
  };
  for (const y of e.externalCalls ?? []) {
    const C = d(y.externalSystemId);
    !C || !a.has(y.useCaseId) || ce(i, {
      id: `es-extin:${C}->${y.useCaseId}`,
      sourceId: C,
      targetId: y.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const y of e.externalUseCaseCalls ?? []) {
    if (!a.has(y.sourceId)) continue;
    const C = e.externalSystems.find(
      (E) => (E.useCases ?? []).some(($) => $.id === y.targetId)
    ), v = C ? d(C.id) : null;
    if (!v) continue;
    const b = (W = ((C == null ? void 0 : C.useCases) ?? []).find((E) => E.id === y.targetId)) == null ? void 0 : W.name;
    ce(i, {
      id: `es-extout:${y.sourceId}->${y.targetId}`,
      sourceId: y.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: b,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: b ? `Llama a ${b} del sistema externo` : void 0
    });
  }
  for (const y of e.aggregateCalls ?? [])
    !a.has(y.sourceId) || !i.nodes.has(y.targetId) || ce(i, {
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
    !i.nodes.has(y.domainEventId) || !(i.nodes.has(y.sourceId) && (a.has(y.sourceId) || n.some((v) => v.id === y.sourceId) || r.has(y.sourceId))) || ce(i, {
      id: `es-emit:${y.sourceId}->${y.domainEventId}`,
      sourceId: y.sourceId,
      targetId: y.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const m = (y, C, v, b, E, $) => (Ae(i, {
    id: y,
    label: C,
    x: 0,
    y: 0,
    w: J.policy.w,
    h: J.policy.h,
    kind: v,
    symbol: "flow",
    fill: J.policy.fill,
    stroke: J.policy.stroke,
    badge: b,
    tooltip: E
  }), y), w = (y, C) => {
    const v = f(y);
    v && ce(i, {
      id: `es-trigger:${v}->${C}`,
      sourceId: v,
      targetId: C,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, _ = (y, C) => {
    !C || !a.has(C) || ce(i, {
      id: `es-invoke:${y}->${C}`,
      sourceId: y,
      targetId: C,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const y of e.subscriptions ?? []) {
    const C = m(
      y.id,
      y.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${y.name}${y.eventName ? ` — reacciona a ${y.eventName}` : ""}${y.consumerGroup ? ` · grupo ${y.consumerGroup}` : ""}`
    );
    w(y.eventName, C);
    for (const v of y.actions ?? []) {
      if (v.type === "CallUseCase" && _(C, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const b = `saga:${v.sagaId}`;
        m(b, v.sagaId, "saga", "SAGA"), ce(i, {
          id: `es-saga:${C}->${b}`,
          sourceId: C,
          targetId: b,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const b = (e.projections ?? []).find((E) => E.id === v.projectionId);
        b && ce(i, {
          id: `es-feeds:${C}->${b.id}`,
          sourceId: C,
          targetId: b.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const y of e.projections ?? []) {
    const C = m(
      y.id,
      y.name,
      "projection",
      "PROYECCIÓN",
      `${y.name}${y.readModelName ? ` — materializa ${y.readModelName}` : ""}`
    );
    for (const E of y.handledEventIds) {
      const $ = i.nodes.has(E) ? E : null;
      $ && ce(i, {
        id: `es-trigger:${$}->${C}`,
        sourceId: $,
        targetId: C,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    y.sourceAggregateId && i.nodes.has(y.sourceAggregateId) && ce(i, {
      id: `es-state:${y.id}`,
      sourceId: y.sourceAggregateId,
      targetId: C,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = y.sourceExternalUseCaseId ?? y.sourceExternalTableId;
    if (v) {
      const E = e.externalSystems.find(
        (P) => (P.useCases ?? []).some((A) => A.id === v) || (P.tables ?? []).some((A) => A.id === v)
      ), $ = E ? d(E.id) : null;
      if ($) {
        const P = ((re = (E.useCases ?? []).find((A) => A.id === v)) == null ? void 0 : re.name) ?? ((te = (E.tables ?? []).find((A) => A.id === v)) == null ? void 0 : te.name);
        ce(i, {
          id: `es-poll:${y.id}`,
          sourceId: $,
          targetId: C,
          kind: "es-projects-poll",
          label: P,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: P ? `polling de ${P}` : "polling"
        });
      }
    }
    const b = h({ id: y.readModelId, name: y.readModelName });
    b && ce(i, {
      id: `es-projects:${C}->${b}`,
      sourceId: C,
      targetId: b,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const y of e.flows) {
    if (y.archetype === "MATERIALIZES") {
      const v = f(y.triggerEvent), b = h({ name: y.readModelName ?? `${y.triggerEvent}View` });
      v && b && ce(i, {
        id: `es-mat:${y.id}`,
        sourceId: v,
        targetId: b,
        kind: "es-materializes",
        label: y.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${y.name} [MATERIALIZES]`
      });
      continue;
    }
    const C = m(
      `flow:${y.id}`,
      y.name,
      "flow",
      `POLICY · ${y.archetype}`,
      `Flow ${y.name} [${y.archetype}]`
    );
    if (w(y.triggerEvent, C), _(C, y.targetUseCaseId), !y.targetUseCaseId) {
      const v = d(y.targetId), b = v ?? `tgt:${y.targetId}`;
      !v && s.has(y.targetId) && Ae(i, {
        id: b,
        label: s.get(y.targetId) ?? y.targetId,
        x: 0,
        y: 0,
        w: J.module.w,
        h: J.module.h,
        kind: "module",
        symbol: "component",
        fill: J.module.fill,
        stroke: J.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(b) && ce(i, {
        id: `es-deliver:${y.id}`,
        sourceId: C,
        targetId: b,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const y of e.processes ?? []) {
    const C = m(
      y.id,
      y.name,
      "process",
      `PROCESO${y.sla ? ` · SLA ${y.sla}` : ""}`,
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    w(y.triggerEvent, C);
    for (const b of y.steps) _(C, b.useCaseId);
    const v = f(y.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${y.id}`,
      sourceId: C,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const y of e.workflows ?? []) {
    const C = m(
      y.id,
      y.name,
      "workflow",
      "WORKFLOW",
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    w(y.triggerEvent, C);
    for (const b of y.steps ?? []) {
      _(C, b.targetUseCaseId);
      for (const E of [b.emittedEventName, b.completionEventName]) {
        const $ = f(E);
        $ && ce(i, {
          id: `es-wfemit:${y.id}:${$}`,
          sourceId: C,
          targetId: $,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = f(y.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${y.id}`,
      sourceId: C,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const k = [...i.nodes.values()], O = /* @__PURE__ */ new Map();
  for (const y of i.edges)
    O.has(y.targetId) || O.set(y.targetId, []), O.get(y.targetId).push(y.sourceId);
  const D = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Set(), L = (y) => {
    const C = D.get(y);
    if (C !== void 0) return C;
    if (N.has(y)) return 0;
    N.add(y);
    const v = O.get(y) ?? [], b = v.length ? 1 + Math.max(...v.map(L)) : 0;
    return N.delete(y), D.set(y, b), b;
  }, M = /* @__PURE__ */ new Map();
  for (const y of k) {
    const C = t[y.id];
    if (C) {
      y.x = C.x, y.y = C.y;
      continue;
    }
    const v = L(y.id), b = M.get(v) ?? 0;
    M.set(v, b + 1), y.x = 140 + v * 260, y.y = 110 + b * 110;
  }
  return { nodes: k, edges: i.edges };
}
const Jl = 190, Zl = 56, ro = 180, ec = 56, tc = 150, ic = 44, lo = 250, co = 100;
function sc(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), n = a.length ? 1 + Math.max(...a.map(s)) : 0;
    return i.delete(o.id), n;
  };
  return s(e);
}
function oc(e, t) {
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
function nc(e, t) {
  var c;
  const i = [], s = [], o = /* @__PURE__ */ new Set(), a = (p) => {
    var g;
    return (g = e.modules.flatMap((I) => I.useCases ?? []).find((I) => I.id === p)) == null ? void 0 : g.name;
  };
  let n = 140;
  (e.workflows ?? []).forEach((p) => {
    var _;
    const g = new Map(p.steps.map((k) => [k.id, k])), I = new Map(p.steps.map((k) => [k.id, sc(k, g)])), f = /* @__PURE__ */ new Map();
    for (const k of p.steps) {
      const O = I.get(k.id) ?? 0;
      f.set(O, (f.get(O) ?? 0) + 1);
    }
    const h = Math.max(1, ...f.values()), d = oc(e, p);
    if (d && !o.has(d.id)) {
      o.add(d.id);
      const k = t[d.id] ?? { x: 140, y: n };
      i.push({
        id: d.id,
        label: d.label,
        x: k.x,
        y: k.y,
        w: tc,
        h: ic,
        kind: d.kind,
        symbol: d.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.kind === "aggregate" ? "AGGREGATE" : d.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const u = t[p.id] ?? { x: 420, y: n };
    i.push({
      id: p.id,
      label: p.name,
      x: u.x,
      y: u.y,
      w: Jl,
      h: Zl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}${p.onCompletionEventName ? ` · emite ${p.onCompletionEventName} al completar` : ""}`
    }), d && s.push({
      id: `wft:${p.id}`,
      sourceId: d.id,
      targetId: p.id,
      kind: "workflow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    });
    const m = /* @__PURE__ */ new Map();
    let w = 0;
    for (const k of p.steps) {
      const O = I.get(k.id) ?? 0;
      w = Math.max(w, O);
      const D = m.get(O) ?? 0;
      m.set(O, D + 1);
      const N = t[k.id] ?? {
        x: u.x + (O + 1) * lo,
        y: n + (D - (f.get(O) - 1) / 2) * co
      }, L = a(k.targetUseCaseId);
      i.push({
        id: k.id,
        label: k.name,
        x: N.x,
        y: N.y,
        w: k.type === "JOIN" || k.type === "SPLIT" ? 100 : ro,
        h: k.type === "JOIN" || k.type === "SPLIT" ? 48 : ec,
        kind: "workflow-step",
        symbol: k.type === "JOIN" || k.type === "SPLIT" ? "flow" : k.roleId ? "actor" : "event",
        fill: k.type === "JOIN" || k.type === "SPLIT" ? "#f5f3ff" : k.roleId ? "#fef9c3" : "#ffffff",
        stroke: k.roleId && k.type !== "JOIN" && k.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: k.type === "JOIN" || k.type === "SPLIT",
        badge: k.type === "JOIN" ? "⨝ JOIN" : k.type === "SPLIT" ? "⑃ SPLIT" : k.roleId ? `👤 ${k.roleId}${k.deadline ? ` · ${k.deadline}` : ""}` : L ? `→ ${L}` : "∅ sin use case",
        tooltip: k.type === "JOIN" ? `${k.name} — espera a TODAS sus dependencias antes de seguir` : k.type === "SPLIT" ? `${k.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${k.name}${k.roleId ? ` · tarea HUMANA de ${k.roleId}${k.deadline ? ` (plazo ${k.deadline})` : ""}` : ""}${k.emittedEventName ? ` · emite ${k.emittedEventName}` : ""}${L ? ` · lanza ${L}` : ""}${k.completionEventName ? ` · espera ${k.completionEventName}` : ""}${k.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const M = (k.dependsOnStepIds ?? []).filter((x) => g.has(x));
      M.length === 0 && s.push({
        id: `wfs:${p.id}:${k.id}`,
        sourceId: p.id,
        targetId: k.id,
        kind: "workflow-start",
        label: k.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const x of M)
        s.push({
          id: `wfdep:${x}->${k.id}`,
          sourceId: x,
          targetId: k.id,
          kind: "workflow-dependency",
          label: k.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${k.name} espera a ${((_ = g.get(x)) == null ? void 0 : _.name) ?? x}`
        });
    }
    if (p.onCompletionEventName) {
      const k = `done:${p.id}`, O = t[k] ?? { x: u.x + (w + 2) * lo, y: n };
      i.push({
        id: k,
        label: p.onCompletionEventName,
        x: O.x,
        y: O.y,
        w: ro,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const D = new Set(p.steps.flatMap((L) => L.dependsOnStepIds ?? [])), N = p.steps.filter((L) => !D.has(L.id));
      for (const L of N.length ? N : [])
        s.push({
          id: `wfd:${p.id}:${L.id}`,
          sourceId: L.id,
          targetId: k,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      p.steps.length || s.push({
        id: `wfd:${p.id}`,
        sourceId: p.id,
        targetId: k,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    n += Math.max(2, h + 1) * co + 60;
  });
  const r = new Set(i.map((p) => p.id));
  (e.workflowGateways ?? []).forEach((p, g) => {
    const I = t[p.id] ?? { x: 200 + g % 5 * 220, y: 60 };
    i.push({
      id: p.id,
      label: p.name,
      x: I.x,
      y: I.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: p.type === "SPLIT" ? p.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : p.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: p.type === "SPLIT" ? `${p.name} — split ${p.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${p.name} — join que ${p.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), r.add(p.id);
  });
  for (const p of e.workflowGateways ?? []) {
    for (const I of p.sourceIds ?? [])
      r.has(I) && s.push({
        id: `wflink:${I}->${p.id}`,
        sourceId: I,
        targetId: p.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const g = p.type === "SPLIT" && p.semantics === "EXCLUSIVE";
    for (const I of p.targetIds ?? []) {
      if (!r.has(I)) continue;
      const f = g ? (c = (p.branchConditions ?? []).find((h) => h.targetId === I)) == null ? void 0 : c.expression : void 0;
      s.push({
        id: `wflink:${p.id}->${I}`,
        sourceId: p.id,
        targetId: I,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: g && !f,
        arrow: !0,
        label: f ?? (g ? "¿condición?" : void 0),
        tooltip: g ? `${f ? `Rama si: ${f}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  for (const p of e.workflows ?? [])
    for (const g of p.steps ?? [])
      !g.handoffWorkflowId || !r.has(g.handoffWorkflowId) || !r.has(g.id) || s.push({
        id: `wflink:${g.id}->${g.handoffWorkflowId}`,
        sourceId: g.id,
        targetId: g.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: i, edges: s };
}
const po = 250, Pe = 30, lt = 6, ac = 16, qt = 190, rc = 60, dc = 170, fi = 44;
function lc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ve(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function cc(e) {
  const t = [], i = (s, o, a) => {
    for (const n of s ?? []) {
      const r = [...o, n.label];
      t.push({ entry: n, path: r, depth: a }), i(n.children ?? [], r, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function pc(e, t) {
  var D, N, L, M;
  const i = [], s = [], o = e.uiApps ?? [], a = e.pages ?? [], n = (x) => {
    var U;
    return ((U = e.modules.flatMap((W) => W.useCases ?? []).find((W) => W.id === x)) == null ? void 0 : U.name) ?? x;
  }, r = (x) => {
    var U;
    return ((U = e.modules.flatMap((W) => W.queryServices ?? []).find((W) => W.id === x)) == null ? void 0 : U.name) ?? x;
  }, c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const x of o) {
    const U = cc(x), W = Math.max(
      90,
      54 + U.length * (Pe + lt)
    ), re = t[x.id] ?? { x: 190, y: p + W / 2 };
    p = re.y + W / 2 + 70;
    const te = x.type ?? "APP";
    i.push({
      id: x.id,
      label: x.title || x.name,
      x: re.x,
      y: re.y,
      w: po,
      h: W,
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
      tooltip: te === "ORCHESTRATOR" ? `${x.name} — orquesta y mantiene estado; solo enseña páginas hijas` : te === "MASTER_DETAIL" ? `${x.name} — cabecera + pestañas (ambas son páginas)` : `App: ${x.name}`
    }), x.modelId && (c.set(x.modelId, {
      label: ((D = (e.models ?? []).find((v) => v.id === x.modelId)) == null ? void 0 : D.name) ?? x.modelId,
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
    for (const [v, b, E, $, P] of [
      [x.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [x.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      v && s.push({
        id: `${b === "app-view" ? "appview" : "appedit"}:${x.id}->${v}`,
        sourceId: x.id,
        targetId: v,
        kind: b,
        color: $,
        label: E,
        arrow: !0,
        tooltip: P
      });
    const y = x.homePageId ?? x.homeAppId;
    y && s.push({
      id: `apphome:${x.id}->${y}`,
      sourceId: x.id,
      targetId: y,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: x.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), te === "MASTER_DETAIL" && x.headerPageId && s.push({
      id: `appheader:${x.id}->${x.headerPageId}`,
      sourceId: x.id,
      targetId: x.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let C = re.y - W / 2 + 34 + 10 + Pe / 2;
    for (const { entry: v, path: b, depth: E } of U) {
      const $ = lc(x.id, v, b), P = E * ac;
      if (i.push({
        id: $,
        label: v.label,
        x: re.x + P / 2,
        y: C,
        w: po - 20 - P,
        h: Pe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (N = v.children) != null && N.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (L = v.children) != null && L.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: x.id,
        tooltip: (M = v.children) != null && M.length ? "Agrupador (con submenú): no puede abrir nada" : v.pageId ? `Abre ${v.pageId}` : v.uiAdapterId ? `Abre la app ${v.uiAdapterId}` : v.useCaseId ? `Lanza ${v.useCaseId}` : v.aggregateId ? `CRUD inferido sobre ${v.aggregateId}` : v.queryOperationId ? `Listado con filtros de ${v.queryOperationId}` : "Entrada de menú sin destino"
      }), C += Pe + lt, v.uiAdapterId && o.some((A) => A.id === v.uiAdapterId) && s.push({
        id: `menuapp:${$}->${v.uiAdapterId}`,
        sourceId: $,
        targetId: v.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), v.useCaseId && e.modules.some((R) => (R.useCases ?? []).some((q) => q.id === v.useCaseId)) && (c.set(v.useCaseId, {
        label: n(v.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${$}->${v.useCaseId}`,
        sourceId: $,
        targetId: v.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), v.aggregateId && (e.aggregates ?? []).some((A) => A.id === v.aggregateId)) {
        const A = (e.aggregates ?? []).find((R) => R.id === v.aggregateId);
        c.set(A.id, { label: A.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${$}->${A.id}`,
          sourceId: $,
          targetId: A.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (v.queryOperationId) {
        const A = e.modules.flatMap((q) => q.queryServices ?? []).find((q) => q.id === v.queryServiceId), R = ((A == null ? void 0 : A.operations) ?? []).find((q) => q.id === v.queryOperationId);
        A && R && (c.set(R.id, {
          label: `${R.name} (${A.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${$}->${R.id}`,
          sourceId: $,
          targetId: R.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      v.pageId && a.some((A) => A.id === v.pageId) && s.push({
        id: `menupage:${$}->${v.pageId}`,
        sourceId: $,
        targetId: v.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const I = (x) => {
    var U;
    return ((U = a.find((W) => W.id === x)) == null ? void 0 : U.name) ?? x;
  };
  for (const x of a) {
    const U = t[x.id] ?? { x: 640, y: g }, W = x.type === "WIZARD" ? x.wizardSteps ?? [] : [], re = W.length ? 54 + W.length * (Pe + lt) : rc;
    g = U.y + re + 90, i.push({
      id: x.id,
      label: x.name,
      x: U.x,
      y: U.y,
      w: qt,
      h: re,
      kind: "page",
      symbol: "interface",
      badge: x.customCodeId ? "CODE" : x.type ?? "PAGE",
      container: W.length > 0,
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
    let te = U.y - re / 2 + 34 + 10 + Pe / 2;
    W.forEach((y, C) => {
      const v = y.id ?? y.pageId ?? String(C);
      i.push({
        id: `wizrow:${x.id}:${v}`,
        label: `${C + 1}. ${y.label ?? (y.pageId ? I(y.pageId) : "Paso")}${y.pageId ? "" : " ⌁"}`,
        x: U.x,
        y: te,
        w: qt - 20,
        h: Pe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: y.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: x.id,
        tooltip: y.pageId ? `Paso ${C + 1}: ${I(y.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${C + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), te += Pe + lt;
    });
    for (const [y, C, v, b] of [
      [x.crudDetailPageId ?? x.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [x.crudCreatePageId ?? x.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      y && s.push({
        id: `${C === "crud-detail" ? "cruddetail" : "crudnew"}:${x.id}->${y}`,
        sourceId: x.id,
        targetId: y,
        kind: C,
        color: b,
        label: v,
        dashed: !0,
        arrow: !0,
        tooltip: C === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let y = 0; y < (x.wizardSteps ?? []).length; y++) {
      const C = (x.wizardSteps ?? [])[y];
      if (!C.pageId) continue;
      const v = C.id ?? C.pageId;
      s.push({
        id: `wizstep:${x.id}:${v}`,
        sourceId: `wizrow:${x.id}:${v}`,
        targetId: C.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${y + 1} — Supr desmapea`
      });
    }
    x.modelId && (c.set(x.modelId, {
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
    for (const y of x.buttons ?? [])
      y.useCaseId && (c.set(y.useCaseId, {
        label: n(y.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${x.id}->${y.useCaseId}`,
        sourceId: x.id,
        targetId: y.useCaseId,
        kind: "page-button",
        label: y.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: y.mappingId ? `Botón «${y.label}» — mapping ${y.mappingId}` : `Botón «${y.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    x.listingQueryServiceId && (c.set(x.listingQueryServiceId, {
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
  const f = e.buttonGroups ?? [], h = (x) => {
    var U;
    return ((U = f.find((W) => W.id === x)) == null ? void 0 : U.name) ?? x;
  };
  let d = 520;
  for (const x of f) {
    const U = x.buttons ?? [], W = x.groupIds ?? [], re = U.length + W.length, te = t[x.id] ?? { x: 1e3, y: d }, y = Math.max(70, 54 + re * (Pe + lt));
    d = te.y + y + 80, i.push({
      id: x.id,
      label: x.name,
      x: te.x,
      y: te.y,
      w: qt,
      h: y,
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
      tooltip: `${x.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let C = te.y - y / 2 + 34 + 10 + Pe / 2;
    for (const v of U)
      i.push({
        id: `gbtn:${x.id}:${v.id}`,
        label: v.label ?? v.id,
        x: te.x,
        y: C,
        w: qt - 20,
        h: Pe,
        kind: "group-button",
        symbol: "usecase",
        fill: v.useCaseId || v.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !v.useCaseId && !v.apiOperationId,
        parentId: x.id,
        tooltip: `${v.label ?? v.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), C += Pe + lt;
    for (const v of W)
      i.push({
        id: `gsub:${x.id}:${v}`,
        label: `▸ ${h(v)}`,
        x: te.x,
        y: C,
        w: qt - 20,
        h: Pe,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: x.id,
        tooltip: `Subgrupo ${h(v)} — Supr lo desanida (el grupo sigue existiendo)`
      }), C += Pe + lt;
  }
  for (const x of f)
    for (const U of x.buttons ?? [])
      !U.useCaseId || !e.modules.some((re) => (re.useCases ?? []).some((te) => te.id === U.useCaseId)) || (c.set(U.useCaseId, {
        label: n(U.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${x.id}:${U.id}`,
        sourceId: `gbtn:${x.id}:${U.id}`,
        targetId: U.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${U.label ?? U.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const x of a) {
    const U = [
      ["toolbar", x.toolbarGroupIds ?? []],
      ["botonera", x.bottomBarGroupIds ?? []]
    ];
    for (const [W, re] of U)
      for (const te of re)
        f.some((y) => y.id === te) && s.push({
          id: `bargrp:${x.id}:${W}:${te}`,
          sourceId: te,
          targetId: x.id,
          kind: "bar-group",
          color: W === "toolbar" ? "#0284c7" : "#7c3aed",
          label: W,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${W} de ${x.name} — Supr lo desengancha`
        });
  }
  let u = 160;
  for (const x of e.models ?? [])
    c.has(x.id) || c.set(x.id, { label: x.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [x, U] of c) {
    const W = t[x] ?? { x: 1050, y: u };
    u = W.y + fi + 46, i.push({
      id: x,
      label: U.label,
      x: W.x,
      y: W.y,
      w: dc,
      h: fi,
      kind: U.kind,
      symbol: U.symbol,
      fill: "#ffffff",
      stroke: U.stroke
    });
  }
  let m = 120;
  for (const x of e.identityProviders ?? []) {
    const U = t[x.id] ?? { x: -320, y: m };
    m = U.y + 70 + 40, i.push({
      id: x.id,
      label: x.name,
      x: U.x,
      y: U.y,
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
  for (const x of o)
    x.identityProviderId && (e.identityProviders ?? []).some((U) => U.id === x.identityProviderId) && s.push({
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
  const w = (e.actorAppUses ?? []).filter(
    (x) => o.some((U) => U.id === x.appId) && (e.actors ?? []).some((U) => U.id === x.actorId)
  ), _ = [...new Set(w.map((x) => x.actorId))];
  let k = 160;
  for (const x of _) {
    const U = (e.actors ?? []).find((re) => re.id === x), W = t[x] ?? { x: -60, y: k };
    k = W.y + fi + 46, i.push({
      id: x,
      label: U.name,
      x: W.x,
      y: W.y,
      w: 150,
      h: fi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const x of w)
    s.push({
      id: `actorapp:${x.actorId}->${x.appId}`,
      sourceId: x.actorId,
      targetId: x.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((x, U) => {
    const W = t[x.id] ?? { x: 1200, y: 120 + U * 90 };
    i.push({
      id: x.id,
      label: x.name,
      x: W.x,
      y: W.y,
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
  const O = new Set(i.map((x) => x.id));
  for (const x of a)
    x.customCodeId && O.has(x.customCodeId) && s.push({
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
    for (const U of x.usedElementIds ?? [])
      O.has(U) && s.push({
        id: `ccuse:${x.id}->${U}`,
        sourceId: x.id,
        targetId: U,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${x.name} usa este elemento — Supr lo desconecta`
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
function uc(e, t) {
  const i = [], s = [], o = e.models ?? [], a = e.modelMappings ?? [], n = (f) => {
    var h;
    return ((h = o.find((d) => d.id === f)) == null ? void 0 : h.name) ?? f ?? "?";
  };
  o.forEach((f, h) => {
    const d = t[f.id] ?? { x: 200 + h % 5 * 260, y: 160 + Math.floor(h / 5) * 220 }, u = f.fields ?? [], m = mo + (u.length ? u.length * gi + (u.length - 1) * fo : 10) + ho;
    i.push({
      id: f.id,
      label: f.name,
      x: d.x,
      y: d.y,
      w: uo,
      h: m,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), u.forEach((w, _) => {
      i.push({
        id: Ii(f.id, w.id),
        label: w.name,
        x: d.x,
        y: d.y - m / 2 + mo + _ * (gi + fo) + gi / 2,
        w: uo - 2 * ho,
        h: gi,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: w.type ?? void 0,
        parentId: f.id,
        tooltip: `${w.name}${w.type ? ` (${w.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, h) => {
    const d = t[f.id] ?? { x: 200 + h % 5 * 260, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
      x: d.x,
      y: d.y,
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
    const d = t[f.id] ?? { x: 120 + h % 5 * 220, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
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
      tooltip: `${f.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`
    });
  });
  const r = new Set(i.map((f) => f.id)), c = (f) => f.fieldId ? Ii(f.modelId, f.fieldId) : f.modelId;
  for (const f of e.transformations ?? [])
    f.customCodeId && r.has(f.customCodeId) && r.has(f.id) && s.push({
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
    f.customCodeId && r.has(f.customCodeId) && f.targetModelId && r.has(f.targetModelId) && s.push({
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
      const d = c(h);
      r.has(d) && s.push({
        id: `tfin:${f.id}:${h.modelId}:${h.fieldId ?? ""}`,
        sourceId: d,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && r.has(c(f.output)) && s.push({
      id: `tfout:${f.id}`,
      sourceId: f.id,
      targetId: c(f.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${f.name} — Supr la desconecta`
    });
  }
  for (const f of a)
    if (!(!f.sourceModelId || !f.targetModelId) && !(!r.has(f.sourceModelId) || !r.has(f.targetModelId))) {
      s.push({
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
        const d = Ii(f.sourceModelId, h.sourceFieldId ?? ""), u = Ii(f.targetModelId, h.targetFieldId ?? "");
        !r.has(d) || !r.has(u) || s.push({
          id: `maprule:${f.id}:${h.id}`,
          sourceId: d,
          targetId: u,
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
  ), I = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const h of f.buttons ?? []) {
        if (!h.useCaseId || h.mappingId) continue;
        const d = g.get(h.useCaseId);
        if (!(d != null && d.inputModelId) || d.inputModelId === f.modelId) continue;
        const u = `${f.modelId}->${d.inputModelId}`;
        p.has(u) || I.has(u) || (I.add(u), !(!r.has(f.modelId) || !r.has(d.inputModelId)) && s.push({
          id: `mapgap:${f.id}:${h.useCaseId}`,
          sourceId: f.modelId,
          targetId: d.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${h.label}» (página ${f.name}) llama a ${d.name}: falta mapear ${n(f.modelId)} → ${n(d.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function mc(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((c) => c.e), s = new i(), a = {
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
  }, n = await s.layout(a), r = {};
  for (const c of n.children ?? [])
    r[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return r;
}
var hc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, Ve = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? fc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && hc(t, i, o), o;
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
        const n = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), r = (o = n == null ? void 0 : n.closest) == null ? void 0 : o.call(n, ".n3"), c = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = c !== this._connect.sourceId ? c : null;
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
    const n = new DOMMatrix().translate(s, o).multiply(a).translate(-s, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = n.transformPoint(new DOMPoint(0, 0, 0, 1)), c = n.transformPoint(new DOMPoint(1, 0, 0, 0)), p = n.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, I = t - i.top, f = c.x - g * c.w, h = p.x - g * p.w, d = c.y - I * c.w, u = p.y - I * p.w, m = g * r.w - r.x, w = I * r.w - r.y, _ = f * u - h * d;
    return _ ? { x: (m * u - h * w) / _, y: (f * w - m * d) / _ } : { ...this._center };
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
    const t = this.depths(), i = new Map(e.map((m) => [m.id, m])), s = Math.min(...e.map((m) => m.x - m.w / 2)) - 60, o = Math.max(...e.map((m) => m.x + m.w / 2)) + 60, a = Math.min(...e.map((m) => m.y - m.h / 2)) - 60, n = Math.max(...e.map((m) => m.y + m.h / 2)) + 60, r = (s + o) / 2, c = (a + n) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (o - s), p.height / (n - a), 1) * 0.9 : 0.5, I = this._k * g;
    this._kUsed = I, this._center = { x: r, y: c };
    const f = 30, h = this._liveMove, d = (m) => m.x + ((h == null ? void 0 : h.id) === m.id ? h.dx : 0), u = (m) => m.y + ((h == null ? void 0 : h.id) === m.id ? h.dy : 0);
    return S`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${I}, ${I}, ${I}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-c}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${a}px"
            width=${o - s}
            height=${n - a}
            viewBox="${s} ${a} ${o - s} ${n - a}"
          >
            ${this.scene.edges.map((m) => {
      const w = i.get(m.sourceId), _ = i.get(m.targetId);
      return !w || !_ ? "" : ee`<line
                x1=${d(w)} y1=${u(w)} x2=${d(_)} y2=${u(_)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((m) => {
      const w = i.get(m.sourceId), _ = i.get(m.targetId);
      if (!w || !_) return "";
      const k = (t.get(w.id) ?? 0) * f + 2, O = (t.get(_.id) ?? 0) * f + 2, D = d(_) - d(w), N = u(_) - u(w), L = O - k, M = Math.hypot(D, N), x = Math.hypot(M, L), U = Math.atan2(N, D) * 180 / Math.PI, W = Math.atan2(L, M) * 180 / Math.PI, re = m.color ?? "#64748b", te = m.dashed ? `repeating-linear-gradient(90deg, ${re} 0 6px, transparent 6px 10px)` : re;
      return S`<div
              class="edge3"
              style="
                left: ${d(w)}px; top: ${u(w)}px; width: ${x}px; height: 1.7px;
                transform: translateZ(${k}px) rotateZ(${U}deg) rotateY(${-W}deg);
                background: ${te};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((m) => {
      const w = t.get(m.id) ?? 0, _ = m.container || w === 0, k = this._hoverTargetId === m.id;
      return S`
              <div
                class="n3 ${m.container ? "container3" : ""} ${this.selectedId === m.id ? "selected3" : ""} ${k ? "hover3" : ""}"
                data-node-id=${m.id}
                data-kind=${m.kind}
                title=${m.tooltip ?? m.label}
                style="
                  left: ${d(m) - m.w / 2}px; top: ${u(m) - m.h / 2}px;
                  width: ${m.w}px; height: ${m.h}px;
                  transform: translateZ(${w * f + (k ? 8 : 0)}px)${k ? " scale(1.06)" : ""};
                  background: ${m.container ? "color-mix(in srgb, " + (m.fill ?? "#ffffff") + " 82%, transparent)" : m.fill ?? "#ffffff"};
                  border-color: ${m.stroke ?? "#64748b"};
                  border-style: ${m.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${_ ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${m.badge ? S`<span class="badge3" style="color: ${m.stroke ?? "#94a3b8"}">${m.badge}</span>` : ""}
                <span>${m.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const m = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!m || !gc.has(m.kind)) return "";
      const w = (t.get(m.id) ?? 0) * f + 4;
      return [
        [d(m) + m.w / 2, u(m)],
        [d(m) - m.w / 2, u(m)],
        [d(m), u(m) + m.h / 2],
        [d(m), u(m) - m.h / 2]
      ].map(
        ([k, O]) => S`<div
                class="h3"
                data-source-id=${m.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${k}px; top: ${O}px; transform: translateZ(${w}px)"
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
Re.styles = yt`
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
  oe({ attribute: !1 })
], Re.prototype, "scene", 2);
Ve([
  oe({ attribute: !1 })
], Re.prototype, "selectedId", 2);
Ve([
  oe({ attribute: !1 })
], Re.prototype, "connectable", 2);
Ve([
  z()
], Re.prototype, "_rx", 2);
Ve([
  z()
], Re.prototype, "_rz", 2);
Ve([
  z()
], Re.prototype, "_k", 2);
Ve([
  z()
], Re.prototype, "_pan", 2);
Ve([
  z()
], Re.prototype, "_liveMove", 2);
Ve([
  z()
], Re.prototype, "_connect", 2);
Ve([
  z()
], Re.prototype, "_hoverTargetId", 2);
Re = Ve([
  vt("modux-tilt")
], Re);
var Ic = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, Ie = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? yc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Ic(t, i, o), o;
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
      const n = (e.children ?? []).filter((c) => c.kind === "tab"), r = n.find((c) => c.id === this._activeTabs[e.id]) ?? n[0];
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
      let c;
      try {
        c = JSON.parse(r);
      } catch {
        return;
      }
      if (!c.componentId || !c.pageId || c.pageId === ((n = this.page) == null ? void 0 : n.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: c.pageId, componentId: c.componentId, ...p });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var c, p, g;
    const t = e.children ?? [], i = (I) => I.map((f) => this.renderComponent(f)), s = S`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = S`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const I = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        o = S`<div class="row-lay">
          <div class="col-lay">${I.length ? i(I) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : s}</div>
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
        const I = t.filter((h) => h.kind === "tab"), f = I.find((h) => h.id === this._activeTabs[e.id]) ?? I[0];
        o = S`
          <div class="tabbar">
            ${I.map(
          (h, d) => S`<span
                class=${h === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: h.id }, this.emitEvent("component-selected", { componentId: h.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...h };
          }}
                @dragstart=${(u) => {
            var m, w;
            u.stopPropagation(), this._dragCmpId = h.id, (w = u.dataTransfer) == null || w.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: h.id })
            );
          }}
                @dragover=${(u) => {
            var m;
            ((m = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : m.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var O, D;
            const m = this._dragCmpId;
            if (!m || m === h.id || ((O = this.nodeById(m)) == null ? void 0 : O.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const w = u.currentTarget.getBoundingClientRect(), k = u.clientX - w.left < w.width / 2 ? h.id : ((D = I[d + 1]) == null ? void 0 : D.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, k !== m && this.emitEvent("component-moved", {
              componentId: m,
              toParentId: e.id,
              beforeComponentId: k
            });
          }}
                >${h.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : s}`;
        break;
      }
      case "tab":
        o = S`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        o = S`<div class="col-lay">
          ${t.length ? t.map(
          (I, f) => S`
                  <div class="acc-bar"><span>${I.title ?? I.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(I) : se}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        o = S`<div class="card-box">
          ${e.title ? S`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        o = S`<div class="grid3-lay">
          ${t.length ? t.map((I) => S`<div class="board-col">${this.renderComponent(I)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [I, ...f] = t;
        o = S`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${I ? this.renderComponent(I) : S`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : S`<div class="placeholder">detalle</div>`}</div>
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
        const f = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = f.length ? S`<div class="grid-lay">
              ${f.slice(0, 6).map(
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
        const I = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = S`<table>
            <tr>${I.length ? I.map((f) => S`<th>${f.label ?? f.name}</th>`) : S`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => S`<tr>${(I.length ? I : [1, 2, 3]).map(() => S`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : S`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = S`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const I = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = S`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(I)}`;
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
    const a = ae.LEAF_KINDS.has(e.kind), n = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (I) => {
      var f, h;
      I.stopPropagation(), this._dragCmpId = e.id, (h = I.dataTransfer) == null || h.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), I.dataTransfer && (I.dataTransfer.effectAllowed = "move");
    };
    return S`<div
      class="cmp ${a ? "leafcmp" : ""} ${n ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
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
      var h;
      I.preventDefault(), I.stopPropagation();
      const f = ((h = I.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, I) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(I) => {
      var f, h, d;
      this._foreignOver = !1, !(!this._dragCmpId && !((d = (h = (f = I.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : h.includes) != null && d.call(h, "application/x-modux-cmp"))) && (I.preventDefault(), I.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, I));
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
            </table>` : se}
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
    if (!e) return se;
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
    return S`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${s ? S`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : se}
      ${i === "text" ? S`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : se}
      ${i === "button" || i === "field" ? S`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : se}
      ${i === "button" ? S`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? S`<span class="chip">${((o = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : S`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? S`<span class="chip"
                      >${((a = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : S`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : se}
      ${i === "form" ? S`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? S`<span class="chip"
                      >${((n = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : n.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : S`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : se}
      ${i === "listing" ? S`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? S`<span class="chip"
                      >${((r = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : S`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : se}
      ${i === "field" ? S`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${go.map((c) => S`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : se}
      ${i === "tabLayout" ? S`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), s = i.indexOf(t), o = i.indexOf(e);
    s < 0 || o < 0 || (i.splice(o, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? se : S`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
      const n = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), r = n[a];
      return S`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(c) => {
        c.stopPropagation(), this._dragWizKey = r;
      }}
                      @dragover=${(c) => {
        this._dragWizKey && (c.preventDefault(), c.stopPropagation());
      }}
                      @drop=${(c) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === r) return;
        c.preventDefault(), c.stopPropagation();
        const g = c.currentTarget.getBoundingClientRect(), f = c.clientX - g.left < g.width / 2 ? r : n[a + 1] ?? null;
        f !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : S`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? se : S`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, n, r;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
      return S`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((n = this.useCases.find((c) => c.id === this._btn.useCaseId)) == null ? void 0 : n.name) ?? this._btn.useCaseId}</span>
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
                ${this._btn.mappingId ? S`<span class="chip"
                        >${((r = this.mappings.find((c) => c.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : S`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? S`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
      }}
                    >
                      Quitar
                    </button>` : se}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : se}
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
          </div>` : se}
    `;
  }
};
ae.styles = yt`
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
  oe({ attribute: !1 })
], ae.prototype, "page", 2);
Ie([
  oe({ type: Boolean, reflect: !0 })
], ae.prototype, "framed", 2);
Ie([
  oe({ attribute: !1 })
], ae.prototype, "models", 2);
Ie([
  oe({ attribute: !1 })
], ae.prototype, "mappings", 2);
Ie([
  oe({ attribute: !1 })
], ae.prototype, "useCases", 2);
Ie([
  oe({ attribute: !1 })
], ae.prototype, "queryOps", 2);
Ie([
  oe({ attribute: !1 })
], ae.prototype, "selectedCmpId", 2);
Ie([
  z()
], ae.prototype, "_editing", 2);
Ie([
  z()
], ae.prototype, "_dragId", 2);
Ie([
  z()
], ae.prototype, "_overId", 2);
Ie([
  z()
], ae.prototype, "_rename", 2);
Ie([
  z()
], ae.prototype, "_route", 2);
Ie([
  z()
], ae.prototype, "_btn", 2);
Ie([
  z()
], ae.prototype, "_cmp", 2);
Ie([
  z()
], ae.prototype, "_dragCmpId", 2);
Ie([
  z()
], ae.prototype, "_dragWizKey", 2);
Ie([
  z()
], ae.prototype, "_overCmpId", 2);
Ie([
  z()
], ae.prototype, "_overCmpPos", 2);
Ie([
  z()
], ae.prototype, "_foreignOver", 2);
Ie([
  z()
], ae.prototype, "_activeTabs", 2);
ae = Ie([
  vt("modux-page-designer")
], ae);
var vc = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, Oe = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? wc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && vc(t, i, o), o;
};
const rn = 460, bc = 540, xc = 660;
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
        const n = this.pages.findIndex((c) => c.id === a), r = this.posOf(a, n);
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
    var g, I, f, h, d, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (I = i == null ? void 0 : i.closest) == null ? void 0 : I.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (f = a == null ? void 0 : a.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), r = (h = n == null ? void 0 : n.closest) == null ? void 0 : h.call(n, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${o}:${r.dataset.btnUc}`;
    const c = (d = n == null ? void 0 : n.closest) == null ? void 0 : d.call(n, "[data-bar]");
    if (c != null && c.dataset.bar) return `bar:${o}:${c.dataset.bar}`;
    const p = (u = n == null ? void 0 : n.closest) == null ? void 0 : u.call(n, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, h, d, u;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), s = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (d = a == null ? void 0 : a.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), r = (u = n == null ? void 0 : n.closest) == null ? void 0 : u.call(n, "[data-cmp-id]");
    if (!r) return { pageId: o, componentId: null, pos: "into" };
    const c = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), I = ae.LEAF_KINDS.has(c) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: r.dataset.cmpId, pos: I };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: rn, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * bc, y: Math.floor(t / 3) * xc };
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
Se.styles = yt`
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
  oe({ attribute: !1 })
], Se.prototype, "pages", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "layout", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "sizes", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "selectedId", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "selectedIds", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "models", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "mappings", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "useCases", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "queryOps", 2);
Oe([
  oe({ attribute: !1 })
], Se.prototype, "selectedCmp", 2);
Oe([
  z()
], Se.prototype, "_t", 2);
Oe([
  z()
], Se.prototype, "_live", 2);
Oe([
  z()
], Se.prototype, "_liveSize", 2);
Se = Oe([
  vt("modux-figma")
], Se);
var kc = Object.defineProperty, _c = Object.getOwnPropertyDescriptor, Ye = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? _c(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && kc(t, i, o), o;
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
}, Io = [30, 20, 13, 9.5, 7.5], yo = [0, 180, 118, 80, 58], Sc = 0.055, Cc = 0.86, Ac = 2600, yi = 240, vo = 0.16, wo = 0.015;
let ke = class extends Fe {
  constructor() {
    super(...arguments), this.shifted = !1, this.model = {
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
      sessionStorage.setItem(ke.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(ke.STORE_KEY);
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
    for (const I of e)
      t = Math.min(t, I.x), i = Math.min(i, I.y), s = Math.max(s, I.x), o = Math.max(o, I.y);
    const a = 70, n = this.clientWidth || 800, r = this.clientHeight || 600, c = s - t + a * 2, p = o - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(n / c, r / p)));
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
      color: $c[e] ?? "#64748b",
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
        const a = (t.aggregates ?? []).filter((p) => p.moduleId === e.refId), n = o.useCases ?? [], r = new Set(a.map((p) => p.id)), c = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...a.length ? [s("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...n.length ? [s("group", `use-cases:${e.refId}`, `Casos de uso · ${n.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !c.has(p.id)).map((p) => s("domain-event", p.id, p.name)),
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
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), n = e.refId.slice(o + 1), r = t.modules.find((c) => c.id === n);
        return r ? a === "aggregates" ? (t.aggregates ?? []).filter((c) => c.moduleId === n).map((c) => s("aggregate", c.id, c.name)) : (r.useCases ?? []).map((c) => s(c.policy ? "policy" : "use-case", c.id, c.name)) : [];
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
          for (const c of r ?? [])
            c.pageId && a.add(c.pageId), n(c.children);
        };
        n(o.menuItems);
        for (const r of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          r && a.add(r);
        return [...a].map((r) => (t.pages ?? []).find((c) => c.id === r)).filter((r) => !!r).map((r) => s("page", r.id, r.name));
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
        let c = n.x - n.parent.x, p = n.y - n.parent.y, g = Math.hypot(c, p);
        if (g < 0.01) {
          const d = Math.random() * Math.PI * 2;
          c = Math.cos(d) * 0.1, p = Math.sin(d) * 0.1, g = 0.1;
        }
        const I = Sc * (g - r), f = c / g * I, h = p / g * I;
        n.vx -= f, n.vy -= h, n.parent.vx += f * 0.4, n.parent.vy += h * 0.4;
      } else
        n.vx -= n.x * wo, n.vy -= n.y * wo;
      !this.reducedMotion && this._motion > 0 && (n.vx += Math.sin(t * n.f1 * Math.PI * 2 + n.p1) * vo * this._motion, n.vy += Math.cos(t * n.f2 * Math.PI * 2 + n.p2) * vo * this._motion);
    }
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (let c = n + 1; c < e.length; c++) {
        const p = e[c], g = p.x - r.x, I = p.y - r.y;
        if (Math.abs(g) > yi || Math.abs(I) > yi) continue;
        const f = g * g + I * I;
        if (f > yi * yi || f < 0.01) continue;
        const h = Math.sqrt(f), d = r.depth <= 1 && p.depth <= 1 ? 3 : 1, u = Ac * d / f, m = g / h * u, w = I / h * u;
        r.vx -= m, r.vy -= w, p.vx += m, p.vy += w;
      }
    }
    const i = this._motion, s = Cc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
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
      const c = n === this.hover ? 1.75 : 1;
      n.scale += (c - n.scale) * 0.18;
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
      const c = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, c, 0, Math.PI * 2), t.fillStyle = r.expanded ? r.color + "22" : "#ffffff", t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, c);
      const p = ((a = r.children) == null ? void 0 : a.length) ?? 0;
      if (!r.expanded && p > 0) {
        const I = Math.max(7, c * 0.42), f = r.x + c * 0.75, h = r.y + c * 0.75;
        t.beginPath(), t.arc(f, h, I, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(I * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), f, h + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const I = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${o(12)}` : o(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(I, r.x, r.y + c + 4);
      }
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const r = this.found.node, c = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, c * 1.6), t.strokeStyle = r.color, t.lineWidth = 2.2 / this.cam.k;
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
        const n = (t.x + a.x) / 2, r = (t.y + a.y) / 2, c = a.x - t.x, p = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(n - p * g, r + c * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], s = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const n = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, c = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, s.forEach((p, g) => {
      const I = r - c / 2 + c * (g + 0.5) / s.length, f = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, h = t.x + Math.cos(I) * (n + f), d = t.y + Math.sin(I) * (n + f);
      e.beginPath(), e.arc(h, d, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > s.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + c / 2 + 0.35;
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
    var L, M;
    const o = (t.children ?? []).flatMap(
      (x) => x.kind === "group" ? x.children ?? (x.children = this.childrenOf(x)) : [x]
    ), a = /* @__PURE__ */ new Map();
    for (const x of o) a.set(x.kind, (a.get(x.kind) ?? 0) + 1);
    const n = [];
    for (const [x, U] of a)
      if (n.push(`${U} ${U === 1 ? (ts[x] ?? x).toLowerCase() : Ec[x] ?? x}`), n.length === 4) {
        const W = [...a.keys()].length - 4;
        W > 0 && (n[3] += ` (+${W} tipos más)`);
        break;
      }
    const r = o.slice(0, 6).map((x) => ({ label: x.label.length > 30 ? x.label.slice(0, 29) + "…" : x.label, color: x.color })), c = o.length - r.length, p = t.label, g = ts[t.kind] ?? t.kind, I = ((L = t.children) != null && L.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((M = t.children) != null && M.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const h = Math.max(
      e.measureText(g).width,
      ...n.map((x) => e.measureText(x).width),
      ...r.map((x) => e.measureText(x.label).width + 12),
      e.measureText(I).width
    ), d = Math.min(300, Math.max(f, h) + 24), u = r.length ? 8 + r.length * 15 + (c > 0 ? 15 : 0) : 0, m = 40 + n.length * 15 + u + (I ? 18 : 0), w = this.radiusOf(t) * this.cam.k, _ = this.cam.x + t.x * this.cam.k, k = this.cam.y + t.y * this.cam.k;
    let O = _ + w + 14;
    O + d > i - 8 && (O = _ - w - 14 - d), O = Math.max(8, Math.min(O, i - d - 8));
    const D = Math.max(8, Math.min(k - 10, s - m - 8));
    e.translate(O, D), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, d, m, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", n.forEach((x, U) => e.fillText(x, 12, 41 + U * 15));
    let N = 41 + n.length * 15 + (r.length ? 8 : 0);
    r.forEach((x) => {
      e.fillStyle = x.color, e.beginPath(), e.arc(15, N + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(x.label, 24, N), N += 15;
    }), c > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${c} más`, 24, N)), I && (e.fillStyle = "#94a3b8", e.fillText(I, 12, m - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = ke.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && ke.fold(i.label).includes(t)).slice(0, 8);
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
    const i = this.sceneFromClient(e, t), s = this.nodeAt(i.x, i.y);
    return s && s.kind !== "root" && s.kind !== "group" && s.refId ? s.refId : null;
  }
  /** The refId chain from the element up to the root (grouping nodes skipped). */
  chainOf(e) {
    const t = this.allNodes.find((s) => s.refId === e), i = [];
    for (let s = t; s; s = s.parent)
      s.refId && s.kind !== "group" && s.kind !== "root" && i.push(s.refId);
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
ke.styles = yt`
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
ke.STORE_KEY = "modux-explorer-state";
Ye([
  oe({ type: Boolean, reflect: !0 })
], ke.prototype, "shifted", 2);
Ye([
  oe({ attribute: !1 })
], ke.prototype, "model", 2);
Ye([
  z()
], ke.prototype, "_q", 2);
Ye([
  z()
], ke.prototype, "_sugs", 2);
Ye([
  z()
], ke.prototype, "_active", 2);
Ye([
  z()
], ke.prototype, "_motion", 2);
Ye([
  z()
], ke.prototype, "_threads", 2);
Ye([
  z()
], ke.prototype, "_viewNaming", 2);
Ye([
  z()
], ke.prototype, "_viewName", 2);
ke = Ye([
  vt("modux-explorer")
], ke);
var Mc = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Pc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
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
}, Tc = Object.keys(us);
function Ft(e, t, i) {
  const s = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, n = i.y + i.h / 2;
  let r = 0, c = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [I, f] of [
    [-p, e.x - s],
    [p, o - e.x],
    [-g, e.y - a],
    [g, n - e.y]
  ]) {
    if (I === 0) {
      if (f < 0) return !1;
      continue;
    }
    const h = f / I;
    if (I < 0) {
      if (h > c) return !1;
      h > r && (r = h);
    } else {
      if (h < r) return !1;
      h < c && (c = h);
    }
  }
  return c - r > 0.02;
}
function Oc(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), o = (g) => {
    var f;
    const I = /* @__PURE__ */ new Set();
    for (let h = g; h; h = (f = s.get(h)) == null ? void 0 : f.parentId) I.add(h);
    return I;
  }, a = e.nodes, n = (g) => g.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), c = (g, I, f) => {
    const h = n(f), d = { x: f.x, y: f.y, w: f.w + 2 * h, h: f.h + 2 * h }, u = f.w / 2 + h * 1.5, m = f.h / 2 + h * 1.5, w = { x: f.x - u, y: f.y - m }, _ = { x: f.x + u, y: f.y - m }, k = { x: f.x - u, y: f.y + m }, O = { x: f.x + u, y: f.y + m }, D = [];
    for (const N of [w, _, k, O])
      !Ft(g, N, d) && !Ft(N, I, d) && D.push([N]);
    for (const [N, L] of [
      [w, _],
      [_, w],
      [_, O],
      [O, _],
      [O, k],
      [k, O],
      [k, w],
      [w, k]
    ])
      !Ft(g, N, d) && !Ft(L, I, d) && D.push([N, L]);
    return D;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const I = s.get(g.sourceId), f = s.get(g.targetId);
    if (!I || !f) continue;
    const h = /* @__PURE__ */ new Set([...o(I.id), ...o(f.id)]), d = [
      { x: I.x, y: I.y },
      { x: f.x, y: f.y }
    ];
    for (let u = 0; u < 12; u++) {
      let m = !1;
      e: for (let w = 0; w < d.length - 1; w++)
        for (const _ of a) {
          if (h.has(_.id)) continue;
          const k = n(_), O = { x: _.x, y: _.y, w: _.w + 2 * k, h: _.h + 2 * k };
          if (!Ft(d[w], d[w + 1], O)) continue;
          const D = c(d[w], d[w + 1], _);
          if (!D.length) continue;
          const N = (M) => a.some(
            (x) => x !== _ && !h.has(x.id) && Math.abs(M.x - x.x) < x.w / 2 + n(x) / 2 && Math.abs(M.y - x.y) < x.h / 2 + n(x) / 2
          ), L = (M) => {
            let x = 0;
            const U = [d[w], ...M, d[w + 1]];
            for (let W = 0; W < U.length - 1; W++)
              x += Math.hypot(U[W + 1].x - U[W].x, U[W + 1].y - U[W].y);
            return x + (M.some(N) ? 1e4 : 0);
          };
          D.sort((M, x) => L(M) - L(x)), d.splice(w + 1, 0, ...D[0]), m = !0;
          break e;
        }
      if (!m) break;
    }
    d.length > 2 && r.set(
      g.id,
      d.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return r;
}
const ie = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function bo(e, t) {
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
function Nc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let j = class extends Fe {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "explorer", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._drawer = null, this.repositories = [], this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
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
          ["context-map", "workflows", "ui", "design", "mappings", "explorer"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
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
      const r = (c, p) => (c ?? []).some((g) => g.id === p || r(g.children, p));
      if (o) {
        const c = ve(o);
        if (!(c != null && c.itemId) || c.itemId === a.itemId || a.appId === c.appId && r(n.entry.children, c.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: c.appId,
          itemId: a.itemId,
          parentId: c.itemId
        });
        return;
      }
      if (s) {
        const c = ve(s);
        if (!(c != null && c.itemId) || c.itemId === a.itemId) return;
        const p = this.menuEntryIn(c.appId, c.itemId);
        if (!p || a.appId === c.appId && r(n.entry.children, c.itemId) || a.appId === c.appId && p.parentId === n.parentId && n.beforeId === c.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: c.appId,
          itemId: a.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: c.itemId
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
      const r = JSON.parse(JSON.stringify(n.node)), { ops: c } = this.rebuildComponentOps(i, r, o ?? void 0, a);
      for (const p of c) this.command(p, !1);
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
    this._detail = e, this._paletteOpen = !0, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = ci(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), n = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), r = Li(n), c = [...r.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: a.nodes[g] ?? null
    })), p = { ...a.nodes };
    for (const [g, I] of r) {
      const f = n.find((d) => d.id === g), h = a.nodes[g] ?? { x: f.x, y: f.y };
      p[g] = {
        x: Math.round(h.x + (I.x - f.x)),
        y: Math.round(h.y + (I.y - f.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: p }), c.length && this.pushUndoEntry(c);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Oc(e, t);
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
    var t, i, s, o, a, n, r, c, p, g, I, f, h;
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
      case "add-workflow-gateway":
        return [{ kind: "remove-workflow-gateway", id: e.id }];
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
        const d = (this.model.models ?? []).find((m) => m.id === e.id);
        if (!d) return null;
        const u = [{ kind: "add-model", id: d.id, name: d.name }];
        for (const m of this.model.pages ?? []) {
          m.modelId === e.id && u.push({ kind: "set-page-model", pageId: m.id, modelId: e.id });
          const w = (_) => {
            for (const k of _ ?? [])
              k.modelId === e.id && u.push({ kind: "set-page-component", pageId: m.id, componentId: k.id, modelId: e.id }), w(k.children);
          };
          w(m.content);
        }
        for (const m of this.model.uiApps ?? [])
          m.modelId === e.id && u.push({ kind: "set-app-model", appId: m.id, modelId: e.id });
        return u;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), u = e.kind === "set-crud-detail";
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
        const d = (((i = (this.model.pages ?? []).find((m) => m.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), u = d.indexOf(e.targetId);
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
        const d = (this.model.uiApps ?? []).find((w) => w.id === e.id);
        if (!d) return null;
        const u = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
        d.headerPageId && u.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && u.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && u.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && u.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && u.push({
          kind: "set-app-home-page",
          appId: d.id,
          pageId: d.homePageId ?? null,
          toAppId: d.homeAppId ?? null
        });
        const m = (w, _) => {
          for (const k of w ?? [])
            u.push({
              kind: "add-menu-item",
              appId: d.id,
              label: k.label,
              itemId: k.id,
              parentId: _ == null ? void 0 : _.id,
              parentLabel: _ && !_.id ? _.label : void 0,
              pageId: k.pageId ?? null
            }), k.uiAdapterId && u.push({ kind: "set-menu-app", appId: d.id, toAppId: k.uiAdapterId, itemId: k.id, label: k.label }), k.useCaseId && u.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: k.useCaseId, itemId: k.id, label: k.label }), k.aggregateId && u.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: k.aggregateId, itemId: k.id, label: k.label }), k.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: d.id,
              queryServiceId: k.queryServiceId ?? null,
              queryOperationId: k.queryOperationId,
              itemId: k.id,
              label: k.label
            }), m(k.children, k);
        };
        m(d.menuItems);
        for (const w of this.model.actorAppUses ?? [])
          w.appId === e.id && u.push({ kind: "add-actor-app", actorId: w.actorId, appId: e.id });
        return u;
      }
      case "delete-ui-page": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
        ];
        d.route && u.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && u.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
        for (const m of d.buttons ?? [])
          m.useCaseId && (u.push({ kind: "add-page-button", pageId: d.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && u.push({
            kind: "set-page-button",
            pageId: d.id,
            useCaseId: m.useCaseId,
            label: m.label ?? null,
            mappingId: m.mappingId
          }));
        for (const m of d.viewmodelFields ?? [])
          (m.stereotype || m.colspan || m.label) && u.push({
            kind: "set-page-field-config",
            pageId: d.id,
            fieldId: m.fieldId,
            stereotype: m.stereotype ?? null,
            colspan: m.colspan ?? null,
            label: m.label ?? null
          });
        (d.viewmodelFields ?? []).length && u.push({
          kind: "set-page-field-order",
          pageId: d.id,
          fieldIds: (d.viewmodelFields ?? []).map((m) => m.fieldId)
        });
        for (const m of d.content ?? [])
          u.push(...this.rebuildComponentOps(d.id, m, void 0, null).ops);
        for (const m of d.wizardSteps ?? [])
          u.push({
            kind: "add-page-wizard-step",
            pageId: d.id,
            targetId: m.pageId ?? null,
            label: m.label,
            itemId: m.id
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
        const d = (this.model.uiApps ?? []).find((w) => w.id === e.appId), u = (w) => {
          for (const _ of w ?? []) {
            if (e.itemId ? _.id === e.itemId : _.label === e.label) return _;
            const k = u(_.children);
            if (k) return k;
          }
          return null;
        }, m = e.itemId || e.label ? u(d == null ? void 0 : d.menuItems) : null;
        return m ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: m.label,
          pageId: m.pageId ?? null,
          itemId: m.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: m.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: m.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: m.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: m.queryServiceId ?? null,
          queryOperationId: m.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: m.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
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
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
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
        const d = (this.model.pages ?? []).find((O) => O.id === e.pageId);
        let u = null, m = null, w = null;
        const _ = (O, D) => {
          var L;
          const N = O ?? [];
          for (let M = 0; M < N.length; M++)
            N[M].id === e.componentId && (u = N[M], m = D, w = ((L = N[M + 1]) == null ? void 0 : L.id) ?? null), _(N[M].children, N[M]);
        };
        if (_(d == null ? void 0 : d.content, null), !u) return null;
        const k = u;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: k.title ?? null,
          text: k.text ?? null,
          label: k.label ?? null,
          useCaseId: k.useCaseId ?? null,
          mappingId: k.mappingId ?? null,
          modelId: k.modelId ?? null,
          queryServiceId: k.queryServiceId ?? null,
          queryOperationId: k.queryOperationId ?? null,
          fieldId: k.fieldId ?? null,
          stereotype: k.stereotype ?? null,
          colspan: k.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: m === null ? null : m.id,
          beforeComponentId: w
        }] : this.rebuildComponentOps(
          e.pageId,
          k,
          m === null ? void 0 : m.id,
          w
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
        const d = this.model.modules.find((m) => m.id === e.id);
        if (!d) return null;
        const u = this.model.relations.filter(
          (m) => (m.sourceId === e.id || m.targetId === e.id) && m.type != null
        );
        return [
          { kind: "add-module", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...u.map(
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
          const u = (d.queryServices ?? []).find((m) => m.id === e.id);
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
          const u = (d.useCases ?? []).find((m) => m.id === e.id);
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
          const u = (d.useCases ?? []).find((m) => m.id === e.id);
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
        const d = (this.model.notifications ?? []).find((m) => m.id === e.id);
        if (!(d != null && d.ownerModuleId)) return null;
        const u = [
          { kind: "add-notification", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: (d.channels ?? [])[0] }
        ];
        d.eventId && u.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
        for (const m of d.recipientRoleIds ?? []) u.push({ kind: "add-notification-recipient", id: d.id, roleId: m });
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
        const d = (this.model.documents ?? []).find((m) => m.id === e.id);
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
        const d = (this.model.identityProviders ?? []).find((m) => m.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
        ];
        d.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
        for (const m of this.model.modules)
          m.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        for (const m of this.model.uiApps ?? [])
          m.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        for (const m of this.model.etlFlows ?? [])
          m.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        return u;
      }
      case "set-idp-publisher": {
        const d = (this.model.identityProviders ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-idp-publisher", id: e.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
      }
      case "set-identity-provider": {
        const d = ((n = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : n.identityProviderId) ?? ((r = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : r.identityProviderId) ?? ((c = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : c.identityProviderId) ?? null;
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
          (m) => (m.scheduledTriggers ?? []).some((w) => w.id === e.id)
        ), u = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((m) => m.id === e.id);
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
          const u = (d.mcpServers ?? []).find((m) => m.id === e.id);
          if (u)
            return [
              { kind: "add-mcp-server", id: u.id, name: u.name, moduleId: d.id, uri: u.uri },
              ...(this.model.agentMcpUses ?? []).filter((m) => m.mcpServerId === e.id).map(
                (m) => ({
                  kind: "add-agent-mcp",
                  sourceId: m.agentId,
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
          const u = (d.applicationEvents ?? []).find((m) => m.id === e.id);
          if (u)
            return [{ kind: "add-application-event", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const d of this.model.modules) {
          const u = (d.domainServices ?? []).find((m) => m.id === e.id);
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
          const u = (d.tables ?? []).find((m) => m.id === e.id);
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
        const d = (f = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : f.operations.find((u) => u.id === e.id);
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
          const u = (d.readModels ?? []).find((m) => m.id === e.id);
          if (u != null && u.aggregateId)
            return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const d of this.model.modules) {
          const u = (d.domainEvents ?? []).find((m) => m.id === e.id);
          if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "rename-element": {
        const u = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((m) => m.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((m) => m.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((m) => m.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((m) => m.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((m) => m.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((m) => m.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((m) => m.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((m) => m.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((m) => m.id === e.id);
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
        const d = (this.model.processes ?? []).find((w) => w.id === e.processId), u = (d == null ? void 0 : d.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!d || u < 0) return null;
        const m = d.steps[u];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: m.id,
            name: m.name,
            stepType: m.type,
            roleId: m.roleId,
            deadline: m.deadline,
            useCaseId: m.useCaseId,
            compensationUseCaseId: m.compensationUseCaseId,
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const d = (this.model.processes ?? []).find((m) => m.id === e.processId), u = (d == null ? void 0 : d.steps.findIndex((m) => m.id === e.id)) ?? -1;
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
        const d = (this.model.processes ?? []).find((m) => m.id === e.processId), u = d == null ? void 0 : d.steps.find((m) => m.id === e.id);
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
        const d = (this.model.workflows ?? []).find((w) => w.id === e.workflowId), u = (d == null ? void 0 : d.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!d || u < 0) return null;
        const m = d.steps[u];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: m.id,
            name: m.name,
            emittedEventName: m.emittedEventName,
            targetUseCaseId: m.targetUseCaseId,
            completionEventName: m.completionEventName,
            dependsOnStepIds: m.dependsOnStepIds,
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...d.steps.filter((w) => w.id !== e.id && (w.dependsOnStepIds ?? []).includes(e.id)).map(
            (w) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: w.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const d = (this.model.workflows ?? []).find((m) => m.id === e.workflowId), u = d == null ? void 0 : d.steps.find((m) => m.id === e.id);
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
    const c = this.sceneFor(o), p = c.nodes.find((I) => I.id === t);
    if (p != null && p.parentId) {
      const I = c.nodes.find((f) => f.id === p.parentId);
      I && (r = { x: i - I.x, y: s - I.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: o, id: t, pos: n }];
    if (o === "processes") {
      const I = this.stepReorderCommand(t);
      if (I) {
        const f = this.inverseOf(I);
        f && g.unshift(...f), this.command(I, !1);
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
    const c = this._view, p = this.viewLayout(c), g = this.sceneFor(c), I = r ? g.nodes.find((d) => d.id === r) : void 0, f = I ? { x: s - I.x, y: o - I.y } : { x: s, y: o }, h = [
      { kind: "set-api-publisher", id: t, targetId: n },
      { kind: "move-node", view: c, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(c, { ...p, nodes: { ...p.nodes, [t]: f } }), this.pushUndoEntry(h);
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
    const c = `proxy-${ie(a.name)}-${ie(n.name)}`;
    if ((this.model.proxyApis ?? []).some((d) => d.id === c)) return;
    const p = this._view, g = this.viewLayout(p), f = this.sceneFor(p).nodes.find((d) => d.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: c,
        name: `${a.name}@${n.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const h = [{ kind: "remove-proxy-api", id: c }];
    f && (h.push({ kind: "move-node", view: p, id: c, pos: g.nodes[c] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [c]: { x: s - f.x, y: o - f.y } }
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
    var r, c, p;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), o = this.selectedApiId(), a = o ? null : ((c = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : c.id) ?? null, n = o || a ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
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
    for (const { id: r, x: c, y: p } of t) {
      n.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let g = { x: c, y: p };
      const I = o.nodes.find((f) => f.id === r);
      if (I != null && I.parentId) {
        const f = o.nodes.find((h) => h.id === I.parentId);
        f && (g = { x: c - f.x, y: p - f.y });
      }
      a[r] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: a }), i === "processes")
      for (const { id: r } of t) {
        const c = this.stepReorderCommand(r);
        if (c) {
          const p = this.inverseOf(c);
          p && n.unshift(...p), this.command(c, !1);
        }
      }
    this.pushUndoEntry(n);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: o, h: a } = e.detail, n = this._view, r = this.viewLayout(n), c = this.sceneFor(n).nodes.filter((I) => I.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: n, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: n, id: t, pos: r.nodes[t] ?? null },
      ...c.map((I) => ({ kind: "move-node", view: n, id: I.id, pos: r.nodes[I.id] ?? null }))
    ]);
    const p = { ...r.nodes, [t]: { x: i, y: s } };
    for (const I of c) p[I.id] = { x: I.x - i, y: I.y - s };
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
    var re, te, y, C;
    if (this._view === "context-map" && this._detail === "distribution") {
      const v = this.sceneFor("context-map"), b = this.model.codeModules ?? [], $ = ((P) => {
        var A;
        for (let R = P; R; ) {
          if (b.some((q) => q.id === R)) return R;
          R = (A = v.nodes.find((q) => q.id === R)) == null ? void 0 : A.parentId;
        }
        return null;
      })(t);
      if ($ && $ !== e) {
        if ((this.model.services ?? []).some((A) => A.id === e)) {
          this.command({ kind: "add-service-code-module", serviceId: e, id: $ });
          return;
        }
        if (!b.some((A) => A.id === e) && !this.model.modules.some((A) => A.id === e)) {
          this.command({ kind: "add-code-module-element", id: $, elementId: e });
          return;
        }
      }
    }
    if (this._view === "eventstorming") {
      const v = (E) => (this.model.customCodes ?? []).some(($) => $.id === E), b = v(t) ? { stepId: e, ccId: t } : v(e) ? { stepId: t, ccId: e } : null;
      if (b) {
        const E = this.owningUseCaseOf(b.stepId);
        E && this.command({
          kind: "set-use-case-step-custom-code",
          useCaseId: E.id,
          id: b.stepId,
          targetId: b.ccId
        });
        return;
      }
      return;
    }
    if (this._view === "workflows") {
      const v = this.model.workflowGateways ?? [], b = (A) => v.some((R) => R.id === A);
      if (b(e) || b(t) || (this.model.workflows ?? []).some((A) => A.id === t)) {
        if (e === t) return;
        this.command({ kind: "add-workflow-link", sourceId: e, targetId: t });
        return;
      }
      const E = this.owningWorkflowOf(e), $ = this.owningWorkflowOf(t);
      if (!E || E !== $ || e === t) return;
      const P = E.steps.find((A) => A.id === t);
      if (((P == null ? void 0 : P.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: E.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const v = this.model.pages ?? [], b = this.model.uiApps ?? [], E = (V) => b.some((Q) => Q.id === V), $ = (V) => v.some((Q) => Q.id === V), P = (V) => (this.model.customCodes ?? []).some((Q) => Q.id === V);
      if (P(e) || P(t)) {
        const V = P(e) ? e : t, Q = P(e) ? t : e;
        if (P(Q)) return;
        if ($(Q)) {
          this.command({ kind: "set-page-custom-code", id: Q, targetId: V });
          return;
        }
        this.command({ kind: "add-custom-code-use", id: V, elementId: Q });
        return;
      }
      const A = this.model.buttonGroups ?? [], R = (V) => A.some((Q) => Q.id === V);
      if ((o === "toolbar" || o === "bottom") && R(e) && $(t)) {
        this.command({ kind: "add-page-bar-group", pageId: t, id: e, bar: o });
        return;
      }
      if (R(e) && R(t) && e !== t) {
        this.command({ kind: "add-group-subgroup", id: t, targetId: e });
        return;
      }
      const q = /^gbtn:([^:]+):(.+)$/.exec(e);
      if (q) {
        this.model.modules.some((Q) => (Q.useCases ?? []).some(($e) => $e.id === t)) ? this.command({ kind: "set-group-button-target", id: q[1], itemId: q[2], useCaseId: t }) : this.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
        return;
      }
      if (o === "home" && E(e) && ($(t) || E(t))) {
        if (t === e) return;
        this.command(
          $(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (o === "header" && E(e) && $(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((o === "crud-detail" || o === "crud-create") && $(e) && ($(t) || E(t)) && t !== e) {
        const V = o === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          $(t) ? { kind: V, pageId: e, targetId: t, toAppId: null } : { kind: V, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (o === "viewmodel" && $(e)) {
        (this.model.models ?? []).some((V) => V.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((o === "view" || o === "edit") && E(e) && $(t)) {
        this.command({
          kind: o === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (o) return;
      const G = (V) => /^wizrow:([^:]+):(.+)$/.exec(V), ne = G(e) ?? G(t);
      if (ne) {
        const V = G(e) ? t : e;
        $(V) && V !== ne[1] && this.command({ kind: "set-wizard-step-page", pageId: ne[1], itemId: ne[2], targetId: V });
        return;
      }
      const ue = v.find((V) => V.id === t && V.type === "WIZARD");
      if ($(e) && ue && e !== ue.id) {
        (ue.wizardSteps ?? []).some((V) => V.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: ue.id, targetId: e });
        return;
      }
      if ($(e) && E(t)) {
        const V = v.find(($e) => $e.id === e), Q = b.find(($e) => $e.id === t);
        if (Q.type === "MASTER_DETAIL" && !Q.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${V.name} es la cabecera de ${Q.name} — las siguientes páginas serán pestañas`
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
      const F = this.model.identityProviders ?? [], H = (V) => F.some((Q) => Q.id === V);
      if (H(e) || H(t)) {
        const V = H(e) ? e : t, Q = H(e) ? t : e;
        E(Q) ? this.command({ kind: "set-identity-provider", id: Q, targetId: V }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const de = (V) => (this.model.models ?? []).some((Q) => Q.id === V);
      if (de(e) || de(t)) {
        const V = de(e) ? e : t, Q = de(e) ? t : e;
        if ($(Q)) {
          this.command({ kind: "set-page-model", pageId: Q, modelId: V });
          return;
        }
        if (E(Q)) {
          this.command({ kind: "set-app-model", appId: Q, modelId: V });
          return;
        }
        return;
      }
      const fe = ve(e);
      if (fe != null && fe.itemId && ((re = ve(t)) != null && re.itemId || E(t))) {
        const V = ve(t), Q = this.menuEntryIn(fe.appId, fe.itemId);
        if (!Q) return;
        if (V != null && V.itemId) {
          const $e = this.menuEntryIn(V.appId, V.itemId);
          if (!$e) return;
          const Me = (wt) => (wt ?? []).some((ri) => ri.id === V.itemId || Me(ri.children));
          if (fe.appId === V.appId && (V.itemId === fe.itemId || Me(Q.entry.children)))
            return;
          const Le = (te = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : te.renderRoot.querySelector(`g[data-node-id="${t}"]`), Ce = Le == null ? void 0 : Le.getBoundingClientRect(), et = Ce && s !== void 0 ? (s - Ce.top) / Math.max(1, Ce.height) : 0.5, ai = et < 0.3 ? "before" : et > 0.7 ? "after" : "nest";
          if (ai === "nest")
            this.command({
              kind: "move-menu-item",
              appId: fe.appId,
              toAppId: V.appId,
              itemId: fe.itemId,
              parentId: V.itemId
            });
          else {
            const wt = ai === "before" ? V.itemId : $e.beforeId ?? void 0;
            if (fe.appId === V.appId && $e.parentId === Q.parentId && wt === fe.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: fe.appId,
              toAppId: V.appId,
              itemId: fe.itemId,
              parentId: $e.parentId ?? void 0,
              beforeItemId: wt
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
        const V = ve(e) ? e : t, Q = ve(e) ? t : e;
        if (((y = this.sceneFor("ui").nodes.find((Ce) => Ce.id === V)) == null ? void 0 : y.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const $e = this.model.modules.some(
          (Ce) => (Ce.useCases ?? []).some((et) => et.id === Q)
        ), Me = (this.model.aggregates ?? []).some((Ce) => Ce.id === Q), Le = this.model.modules.flatMap((Ce) => Ce.queryServices ?? []).find((Ce) => (Ce.operations ?? []).some((et) => et.id === Q));
        $(Q) ? this.command({ kind: "set-menu-page", pageId: Q, ...ze }) : E(Q) && Q !== ze.appId ? this.command({ kind: "set-menu-app", toAppId: Q, ...ze }) : $e ? this.command({ kind: "set-menu-use-case", useCaseId: Q, ...ze }) : Me ? this.command({ kind: "set-menu-aggregate", aggregateId: Q, ...ze }) : Le && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Le.id,
          queryOperationId: Q,
          ...ze
        });
        return;
      }
      if ((this.model.actors ?? []).some((V) => V.id === e) && E(t)) {
        (this.model.actorAppUses ?? []).some((V) => V.actorId === e && V.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const _e = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (_e) {
        const V = new Set(
          this.model.modules.flatMap((Me) => (Me.useCases ?? []).map((Le) => Le.id))
        ), Q = new Set(
          this.model.modules.flatMap((Me) => (Me.queryServices ?? []).map((Le) => Le.id))
        ), $e = v.find((Me) => Me.id === _e.pageId);
        V.has(_e.other) ? ($e.buttons ?? []).some((Me) => Me.useCaseId === _e.other) || this.command({ kind: "add-page-button", pageId: _e.pageId, useCaseId: _e.other }) : Q.has(_e.other) && this.command({ kind: "set-page-listing", pageId: _e.pageId, queryServiceId: _e.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [], b = es(e), E = es(t), $ = this.model.transformations ?? [], P = this.model.customCodes ?? [], A = (F) => P.some((H) => H.id === F);
      if (A(e) && $.some((F) => F.id === t)) {
        this.command({ kind: "set-transformation-custom-code", id: t, targetId: e });
        return;
      }
      if (A(t) && $.some((F) => F.id === e)) {
        this.command({ kind: "set-transformation-custom-code", id: e, targetId: t });
        return;
      }
      if (A(e)) {
        const F = (E == null ? void 0 : E.modelId) ?? (v.some((H) => H.id === t) ? t : null);
        if (F) {
          const H = (this.model.modelMappings ?? []).filter(
            (de) => de.sourceModelId === F || de.targetModelId === F
          );
          H.length === 1 ? this.command({ kind: "set-mapping-custom-code", id: H[0].id, targetId: e }) : this.emit("modux-notice", {
            message: H.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
          });
          return;
        }
        return;
      }
      if ($.some((F) => F.id === t)) {
        if (E || $.some((H) => H.id === e)) return;
        const F = b ? { modelId: b.modelId, fieldId: b.fieldId } : v.some((H) => H.id === e) ? { modelId: e } : null;
        F && this.command({ kind: "add-transformation-input", id: t, ...F });
        return;
      }
      if ($.some((F) => F.id === e)) {
        const F = E ? { modelId: E.modelId, fieldId: E.fieldId } : v.some((H) => H.id === t) ? { modelId: t } : null;
        F && this.command({ kind: "set-transformation-output", id: e, ...F });
        return;
      }
      if (b && E) {
        if (b.modelId === E.modelId) {
          this.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
          return;
        }
        let F = (this.model.modelMappings ?? []).find(
          (H) => H.sourceModelId === b.modelId && H.targetModelId === E.modelId
        );
        if (!F) {
          const H = v.find((V) => V.id === b.modelId), de = v.find((V) => V.id === E.modelId);
          if (!H || !de) return;
          const fe = (V) => V.replace(/[^a-zA-Z0-9]/g, ""), ze = new Set((this.model.modelMappings ?? []).map((V) => V.id));
          let _e = `mapping-${ie(H.name)}-${ie(de.name)}`;
          for (let V = 2; ze.has(_e); V++) _e = `mapping-${ie(H.name)}-${ie(de.name)}-${V}`;
          this.command(
            { kind: "add-model-mapping", id: _e, name: `${fe(H.name)}2${fe(de.name)}`, sourceId: H.id, targetId: de.id },
            !1
          ), F = { id: _e, name: "", sourceModelId: H.id, targetModelId: de.id };
        }
        this.command({
          kind: "add-model-mapping-rule",
          id: F.id,
          sourceId: b.fieldId,
          targetId: E.fieldId
        });
        return;
      }
      if (b && v.some((F) => F.id === t) && t !== b.modelId) {
        this.command({ kind: "move-model-field", modelId: b.modelId, fieldId: b.fieldId, targetId: t });
        return;
      }
      if (!v.some((F) => F.id === e) || !v.some((F) => F.id === t) || e === t || (this.model.modelMappings ?? []).some((F) => F.sourceModelId === e && F.targetModelId === t))
        return;
      const R = v.find((F) => F.id === e), q = v.find((F) => F.id === t), G = (F) => F.replace(/[^a-zA-Z0-9]/g, ""), ne = new Set((this.model.modelMappings ?? []).map((F) => F.id));
      let ue = `mapping-${ie(R.name)}-${ie(q.name)}`;
      for (let F = 2; ne.has(ue); F++) ue = `mapping-${ie(R.name)}-${ie(q.name)}-${F}`;
      this.command({
        kind: "add-model-mapping",
        id: ue,
        name: `${G(R.name)}2${G(q.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const a = /^apiop:(.+)@(.+)$/.exec(e);
    if (a) {
      const [, v, b] = a, E = (this.model.proxyApis ?? []).find((q) => q.id === b), $ = (E == null ? void 0 : E.targetApiId) ?? ((C = (this.model.apiImplementations ?? []).find(
        (q) => q.moduleId === b && (this.model.apis ?? []).some(
          (G) => G.id === q.apiId && G.operations.some((ne) => ne.id === v)
        )
      )) == null ? void 0 : C.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((q) => (q.useCases ?? []).map((G) => G.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: $,
          operationId: v,
          moduleId: b,
          targetUseCaseId: t
        });
        return;
      }
      if (!(E != null && E.targetApiId)) return;
      let A = null;
      if (t === E.targetApiId)
        A = E.targetApiId;
      else {
        const q = /^apiimpl:(.+)@(.+)$/.exec(t);
        q && q[1] === E.targetApiId ? A = q[2] : this.model.modules.some((G) => G.id === t) && (this.model.apiImplementations ?? []).some(
          (G) => G.apiId === E.targetApiId && G.moduleId === t
        ) && (A = t);
      }
      if (!A) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (q) => q.proxyId === E.id && q.operationId === v && q.targetSiteId === A
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: E.id,
        operationId: v,
        targetSiteId: A
      });
      return;
    }
    const n = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (n.has(e)) {
      if (new Set(
        this.model.modules.flatMap((A) => (A.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (R) => R.agentId === e && R.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (R) => R.agentId === e && R.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((A) => (A.mcpServers ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (R) => R.agentId === e && R.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((A) => A.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (R) => R.agentId === e && R.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((A) => A.operations.map((R) => R.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (R) => R.agentId === e && R.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((A) => A.id === t) || (this.model.proxyApis ?? []).some((A) => A.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (R) => R.agentId === e && R.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((A) => (A.queryServices ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (R) => R.agentId === e && R.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (n.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (R) => R.agentId === e && R.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((A) => A.id === t) && ((this.model.agentRags ?? []).some(
        (R) => R.agentId === e && R.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find(($) => $.id === e), b = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((P) => P.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((P) => P.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((P) => P.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), E = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      b && !E && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const r = (this.model.rags ?? []).find((v) => v.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.readModels ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.tables ?? []).map(($) => $.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((E) => E.id === t) || (this.model.proxyApis ?? []).some((E) => E.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((E) => E.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find(($) => $.id === e), b = (this.model.workflows ?? []).find(
        ($) => $.id === t && $.id !== e
      );
      if (b) {
        const $ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        b.triggerEvent !== $ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: $ });
        return;
      }
      const E = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (E && !(v.steps ?? []).some((P) => P.targetUseCaseId === t)) {
        const P = `wfs-${ie(E.name)}`;
        let A = P;
        for (let R = 2; (v.steps ?? []).some((q) => q.id === A); R++)
          A = `${P}-${R}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: A,
          name: E.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), b = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), E = v ?? b;
      if (E) {
        const $ = (this.model.emissions ?? []).find((q) => q.domainEventId === e), P = new Set((this.model.aggregates ?? []).map((q) => q.id)), A = new Set(
          this.model.modules.flatMap((q) => (q.domainServices ?? []).map((G) => G.id))
        ), R = new Set(
          this.model.modules.flatMap((q) => (q.useCases ?? []).map((G) => G.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: E.name,
          triggerAggregateId: $ && P.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && A.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && R.has($.sourceId) ? $.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((v) => v.id === e)) {
      const v = (this.model.proxyApis ?? []).find((b) => b.id === e);
      if ((this.model.apis ?? []).some((b) => b.id === t)) {
        v.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((b) => b.id === t)) {
        if (!v.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (E) => E.apiId === v.targetApiId && E.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: v.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((b) => b.id === t) && v.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((v) => v.id === e)) {
      if (this.model.externalSystems.some((v) => v.id === t)) {
        (this.model.apis ?? []).find((b) => b.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((v) => v.id === t) && ((this.model.apiImplementations ?? []).some(
        (b) => b.apiId === e && b.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const c = new Set((this.model.actors ?? []).map((v) => v.id));
    if (n.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((b) => (b.domainEvents ?? []).map((E) => E.id)),
        ...this.model.modules.flatMap((b) => (b.applicationEvents ?? []).map((E) => E.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (E) => E.eventId === e && E.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!c.has(e)) return;
    }
    if (c.has(e)) {
      const v = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map(($) => $.id))
      ), b = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map(($) => $.id))
      );
      if (v.has(t) || b.has(t)) {
        (this.model.actorUses ?? []).some(
          ($) => $.actorId === e && $.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          ($) => $.actorId === e && $.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((E) => E.id === t)) {
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
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((E) => E.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((b) => b.id === t)) {
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
    const g = (v) => (this.model.notifications ?? []).find((b) => b.id === v);
    if (g(e) || g(t)) {
      const v = g(e) ?? g(t), b = g(e) ? t : e;
      if (this.model.modules.some(
        ($) => [...$.domainEvents ?? [], ...$.applicationEvents ?? []].some((P) => P.id === b)
      )) {
        v.eventId !== b && this.command({ kind: "set-notification-event", id: v.id, targetId: b });
        return;
      }
      if ((this.model.actors ?? []).some(($) => $.id === b)) {
        (v.recipientRoleIds ?? []).includes(b) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: b });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const I = (v) => (this.model.documents ?? []).find((b) => b.id === v);
    if (I(e) || I(t)) {
      const v = I(e) ?? I(t), b = I(e) ? t : e;
      if ((this.model.models ?? []).find((A) => A.id === b)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: b });
        return;
      }
      const $ = this.model.modules.flatMap((A) => A.queryServices ?? []).find((A) => A.id === b), P = this.model.modules.flatMap((A) => (A.queryServices ?? []).flatMap((R) => (R.operations ?? []).map((q) => ({ op: q, qs: R })))).find(({ op: A }) => A.id === b);
      if ($ || P) {
        this.command({
          kind: "set-document-query",
          id: v.id,
          queryServiceId: ($ == null ? void 0 : $.id) ?? P.qs.id,
          queryOperationId: (P == null ? void 0 : P.op.id) ?? null
        });
        return;
      }
      this.emit("modux-notice", {
        message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
      });
      return;
    }
    const f = this.model.identityProviders ?? [], h = (v) => f.find((b) => b.id === v);
    if (h(e) || h(t)) {
      const v = h(e) ?? h(t), b = h(e) ? t : e;
      if (h(e) && this.model.externalSystems.some((P) => P.id === b)) {
        v.publishedByExternalSystemId !== b && this.command({ kind: "set-idp-publisher", id: v.id, targetId: b });
        return;
      }
      const E = this.model.modules.some((P) => P.id === b), $ = (this.model.etlFlows ?? []).some((P) => P.id === b);
      if (E || $) {
        this.command({ kind: "set-identity-provider", id: b, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const d = this.model.etlFlows ?? [], u = (v) => d.find((b) => b.id === v);
    if (u(e) || u(t)) {
      const v = u(e) ?? u(t), b = u(e) ? t : e, E = !u(e), $ = new Set(this.model.externalSystems.flatMap((H) => (H.tables ?? []).map((de) => de.id))), P = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((H) => H.id),
        ...(this.model.proxyApis ?? []).map((H) => H.id)
      ]), A = (this.model.apis ?? []).find((H) => H.operations.some((de) => de.id === b)), R = new Set(
        this.model.modules.flatMap((H) => [
          ...(H.domainEvents ?? []).map((de) => de.id),
          ...(H.applicationEvents ?? []).map((de) => de.id)
        ])
      );
      let q = null, G = {};
      if ($.has(b) ? (q = E ? "SOURCE_PULL" : "WRITE_DB", G = { externalTableId: b }) : A ? (q = E ? "SOURCE_PULL" : "WRITE_API", G = { apiId: A.id, operationId: b }) : P.has(b) ? (q = E ? "SOURCE_PULL" : "WRITE_API", G = { apiId: b }) : R.has(b) && (q = E ? "SOURCE_CONSUMER" : "WRITE_EVENT", G = { targetId: b }), !q) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (H) => H.type === q && (H.externalTableId ?? H.operationId ?? H.apiId ?? H.eventId) === (G.externalTableId ?? G.operationId ?? G.apiId ?? G.targetId)
      )) return;
      const ue = new Set((v.steps ?? []).map((H) => H.id));
      let F = (v.steps ?? []).length + 1;
      for (; ue.has(`ets-${F}`); ) F++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${F}`, stepType: q, ...G });
      return;
    }
    const m = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), w = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (m || w) {
      const v = (m ?? w).name, b = m ? { externalUseCaseId: e } : { externalTableId: e }, E = (A) => m ? A.sourceExternalUseCaseId === e : A.sourceExternalTableId === e, $ = this.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (R) => E(R) && R.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ie(v)}-${ie($.name)}`,
          name: `${$.name}Projection`,
          ...b,
          targetId: t
        });
        return;
      }
      const P = this.model.modules.find((A) => A.id === t);
      if (P) {
        (this.model.projections ?? []).some(
          (R) => E(R) && R.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ie(v)}-${ie(P.name)}`,
          name: `${v}ViewProjection`,
          ...b,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const _ = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (_) {
      const v = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ie(_.name)}-${ie(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const b = this.model.modules.find((E) => E.id === t);
      if (b) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ie(_.name)}-${ie(b.name)}`,
          name: `${_.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${_.name}View`
        });
        return;
      }
    }
    const k = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((b) => b.id))
    ), O = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((b) => b.id))
    ]), D = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((b) => b.id))
    ), N = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((b) => b.id))), L = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((b) => b.id))
    );
    if (N.has(e) && L.has(t)) {
      (this.model.queryCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const M = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((b) => b.id))
    );
    if (N.has(e) && M.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (N.has(e) && N.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const x = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (x && N.has(t)) {
      x.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (N.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (O.has(e) && k.has(t) || N.has(e) && D.has(t)) {
      (this.model.emissions ?? []).some(
        (b) => b.sourceId === e && b.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (k.has(e) || D.has(e)) {
      const v = D.has(e), b = this.model.modules.flatMap((F) => (v ? F.applicationEvents : F.domainEvents) ?? []).find((F) => F.id === e), E = this.model.modules.flatMap((F) => (F.useCases ?? []).map((H) => ({ u: H, module: F }))).find(({ u: F }) => F.id === t), $ = this.model.modules.flatMap((F) => (F.readModels ?? []).map((H) => ({ rm: H, module: F }))).find(({ rm: F }) => F.id === t), P = this.model.modules.find((F) => F.id === t) ?? ($ == null ? void 0 : $.module) ?? (E == null ? void 0 : E.module);
      if (!b || !P) return;
      const A = new Set((this.model.aggregates ?? []).map((F) => F.id)), R = new Set(
        this.model.modules.flatMap((F) => (F.domainServices ?? []).map((H) => H.id))
      ), q = (this.model.emissions ?? []).find(
        (F) => F.domainEventId === e && (v ? N.has(F.sourceId) : A.has(F.sourceId) || R.has(F.sourceId))
      );
      if (!q) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const G = !v && A.has(q.sourceId);
      if (E) {
        if (this.model.flows.some(
          (H) => H.archetype === "TRIGGERS" && H.triggerEvent === b.name && H.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ie(b.name)}-${ie(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: G ? q.sourceId : "",
          triggerDomainServiceId: !v && !G ? q.sourceId : void 0,
          triggerUseCaseId: v ? q.sourceId : void 0,
          triggerEvent: b.name,
          targetId: P.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const ne = ($ == null ? void 0 : $.rm.name) ?? `${b.name}View`;
      if (this.model.flows.some(
        (F) => F.archetype === "MATERIALIZES" && F.triggerEvent === b.name && F.targetId === P.id && F.readModelName === ne
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ie(b.name)}-${ie(ne)}`,
        name: ne,
        archetype: "MATERIALIZES",
        triggerAggregateId: G ? q.sourceId : "",
        triggerDomainServiceId: !v && !G ? q.sourceId : void 0,
        triggerUseCaseId: v ? q.sourceId : void 0,
        triggerEvent: b.name,
        targetId: P.id,
        readModelName: ne
      });
      return;
    }
    const U = /* @__PURE__ */ new Set([
      ...O,
      ...N,
      ...L,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((b) => b.id))
    ]);
    if (U.has(e) || U.has(t) || k.has(t) || D.has(t))
      return;
    const W = new Set(this.model.externalSystems.map((v) => v.id));
    if (W.has(e)) {
      if (new Set(
        this.model.modules.flatMap((P) => (P.useCases ?? []).map((A) => A.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (A) => A.externalSystemId === e && A.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (W.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const b = (this.model.apis ?? []).find(
        (P) => P.operations.some((A) => A.id === t)
      ), E = /^apiop:(.+)@(.+)$/.exec(t), $ = b ? { operationId: t, siteId: b.id } : E ? { operationId: E[1], siteId: E[2] } : null;
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
      if ((this.model.apis ?? []).some((P) => P.id === t) || (this.model.proxyApis ?? []).some((P) => P.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (A) => A.sourceId === e && A.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    W.has(t) || c.has(t);
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
    if (this._view === "workflows" && e === "node" && i === "workflow-gateway") {
      this._selectedId = null, this.command({ kind: "remove-workflow-gateway", id: t });
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "wf-link") {
      const n = /^wflink:(.+)->(.+)$/.exec(t);
      n && (this._selectedId = null, this.command({ kind: "remove-workflow-link", sourceId: n[1], targetId: n[2] }));
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
      const [, r, c] = n, p = (s = (this.model.apis ?? []).find(
        (g) => g.operations.some((I) => I.id === r)
      )) == null ? void 0 : s.id;
      if (!p) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, moduleId: c });
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
      const [, r, c, p] = n, g = /^apiimpl:.+@(.+)$/.exec(p), I = g ? g[1] : p;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: c, operationId: r, targetSiteId: I });
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
      for (let r = (o = n.nodes.find((c) => c.id === t)) == null ? void 0 : o.parentId; r; ) {
        if ((this.model.codeModules ?? []).some((c) => c.id === r)) {
          this._selectedId = null, this.command({ kind: "remove-code-module-element", id: r, elementId: t });
          return;
        }
        r = (a = n.nodes.find((c) => c.id === r)) == null ? void 0 : a.parentId;
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
      id: `step-${ie(e)}`,
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
      id: `wfstep-${ie(e)}`,
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
    const i = `view-${ie(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: t }), this._newViewName = "", this._multi = [], this._activeViewId = i;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), s = new Set(i.map((h) => h.id)), o = this.model.externalSystems.filter((h) => t.has(h.id)), a = new Set(o.map((h) => h.id)), n = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || s.has(h.moduleId)
    ), r = new Set(n.map((h) => h.id)), c = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), p = /* @__PURE__ */ new Set(), g = (h) => {
      for (const d of h ?? [])
        d.pageId && p.add(d.pageId), g(d.children);
    };
    c.forEach((h) => g(h.menuItems));
    const I = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || p.has(h.id)
    ), f = new Set(c.map((h) => h.id));
    return {
      ...this.model,
      uiApps: c,
      pages: I,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => f.has(h.appId)),
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
    j.CRUD_ROUTES[e.elementType] ? this._drawer = e : this.emit("modux-activate", e);
  }
  renderDrawer() {
    if (!this._drawer) return null;
    const e = j.CRUD_ROUTES[this._drawer.elementType], t = this._drawer;
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
    var i;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const s = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = s ? (this.model.workflowGateways ?? []).find((a) => a.id === s[1]) : null;
      if (s && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const a = ((i = (o.branchConditions ?? []).find((n) => n.targetId === s[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: s[2], value: a };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const s = (this.model.workflowGateways ?? []).find((a) => a.id === e.detail.id);
      if (!s) return;
      const o = s.type === "SPLIT" ? s.semantics === "EXCLUSIVE" ? "PARALLEL" : "EXCLUSIVE" : s.semantics === "ANY" ? "ALL" : "ANY";
      this.command({ kind: "set-gateway-semantics", id: s.id, type: o });
      return;
    }
    if (this._view === "ui" && e.detail.elementType === "node" && e.detail.kind === "page") {
      this._view = "design", this._selectedId = e.detail.id;
      return;
    }
    if (this._view === "context-map" && e.detail.elementType === "edge" && e.detail.kind === "relation") {
      const s = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      s && (this._relationPicker = {
        sourceId: s[1],
        targetId: s[2],
        mode: "edit",
        x: e.detail.x ?? 0,
        y: e.detail.y ?? 0
      });
      return;
    }
    const t = e.detail.kind === "process-step" ? Nc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const s = this.owningWorkflowOf(e.detail.id);
      return s ? { elementType: "workflow", id: s.id } : null;
    })() : bo(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const n of a ?? [])
        n.id && t.add(n.id), i(n.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const s = `mi-${ie(e)}`;
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
      var c;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { node: r[p], parentId: n, beforeId: ((c = r[p + 1]) == null ? void 0 : c.id) ?? null }), o(r[p].children, r[p].id);
    };
    return o(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, o = !1, a) {
    const n = a ?? this.allComponentIds(), r = (I) => {
      if (!o) return I.id;
      const f = `cmp-${ie(I.kind)}`;
      let h = f;
      for (let d = 2; n.has(h) || n.has(`${h}-tab-1`); d++) h = `${f}-${d}`;
      return n.add(h), h;
    }, c = [], p = (I, f) => {
      const h = r(I);
      c.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: I.kind, parentComponentId: f }), I.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), c.push({
        kind: "set-page-component",
        pageId: e,
        componentId: h,
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
      for (const d of I.children ?? []) p(d, h);
      return h;
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
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const n of a ?? [])
        t.add(n.id), i(n.children);
    };
    (this.model.pages ?? []).forEach((a) => i(a.content));
    const s = `cmp-${ie(e)}`;
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
      var c;
      const r = a ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { entry: r[p], parentId: n, beforeId: ((c = r[p + 1]) == null ? void 0 : c.id) ?? null }), o(r[p].children, r[p].id ?? null);
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
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._view === "explorer" ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
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
      (s.buttonGroups ?? []).map((a) => a.id),
      (s.workflowGateways ?? []).map((a) => a.id)
    ])
      o.forEach((a) => i.add(a));
    for (let o = 1; ; o++) {
      const a = o === 1 ? e : `${e} ${o}`, n = `${t}${ie(a)}`;
      if (!i.has(n)) return { id: n, name: a };
    }
  }
  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  dropChain(e) {
    var s;
    if (!e) return [];
    if (this._view === "explorer") {
      const o = this.renderRoot.querySelector("modux-explorer");
      return (o == null ? void 0 : o.chainOf(e)) ?? [e];
    }
    const t = this.sceneFor(this._view), i = [];
    for (let o = e; o; )
      i.push(o), o = (s = t.nodes.find((a) => a.id === o)) == null ? void 0 : s.parentId;
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
    ].includes(e)) return i.find((a) => this.model.modules.some((n) => n.id === a)) ?? null;
    if (e === "read-model") {
      const a = i.find((r) => (this.model.aggregates ?? []).some((c) => c.id === r));
      if (a) return a;
      const n = i.find((r) => this.model.modules.some((c) => c.id === r));
      return ((o = (this.model.aggregates ?? []).find((r) => r.moduleId === n)) == null ? void 0 : o.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((a) => this.model.externalSystems.some((n) => n.id === a)) ?? null;
    if (e === "model-field")
      return i.find((a) => (this.model.models ?? []).some((n) => n.id === a)) ?? null;
    if (e === "ui-button")
      return i.find((a) => (this.model.buttonGroups ?? []).some((n) => n.id === a)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (a) => this.model.modules.some((n) => (n.useCases ?? []).some((r) => r.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of i) {
        if ((this.model.apis ?? []).some((c) => c.id === a)) return a;
        const n = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (n && (this.model.apis ?? []).some((c) => c.id === n[1])) return n[1];
        const r = (this.model.proxyApis ?? []).find((c) => c.id === a);
        if (r != null && r.targetApiId) return r.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((a) => this.model.externalSystems.some((n) => n.id === a)) ?? i.find((a) => this.model.modules.some((n) => n.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var h, d;
    const o = j.PALETTE_NEW.find((u) => u.type === e);
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
      const u = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, m = u ? u[1] : i && (this.model.pages ?? []).some((k) => k.id === i) ? i : null;
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: w, name: _ } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: w, name: _ }, !1), u ? (this.command({ kind: "set-page-component-custom-code", pageId: m, componentId: u[2], targetId: w }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: m, targetId: w }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const u = e.slice(4), m = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = m ? m[1] : i && (this.model.pages ?? []).some((N) => N.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let _ = m ? m[2] : void 0, k = null;
      if (u === "tab") {
        let N = null, L = _ ? this.componentIn(w, _) : null;
        for (; L; ) {
          if (L.node.kind === "tabLayout") {
            N = L.node.id;
            break;
          }
          L = L.parentId ? this.componentIn(w, L.parentId) : null;
        }
        if (!N) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const M = this.componentIn(w, N).node, x = this.newComponentId("tab"), U = `Pestaña ${(M.children ?? []).filter((W) => W.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: w, componentId: x, componentKind: "tab", parentComponentId: N }, !1), this.command({ kind: "set-page-component", pageId: w, componentId: x, title: U }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: x }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const N = this.componentIn(w, s.componentId);
        N && N.node.kind === "tab" ? _ = N.node.id : N && (_ = N.parentId ?? void 0, k = s.pos === "before" ? s.componentId : N.beforeId);
      } else if (_) {
        const N = ((h = this.componentIn(w, _)) == null ? void 0 : h.node) ?? null;
        (N == null ? void 0 : N.kind) === "tabLayout" && (N.children ?? [])[0] && (_ = (N.children ?? [])[0].id);
      }
      const O = this.newComponentId(u), D = {
        kind: "add-page-component",
        pageId: w,
        componentId: O,
        componentKind: u,
        parentComponentId: _
      };
      if (!k) {
        this.command(D);
        return;
      }
      this.command(D, !1), this.command(
        { kind: "move-page-component", pageId: w, componentId: O, parentComponentId: _ ?? null, beforeComponentId: k },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: O }]);
      return;
    }
    const a = this._view, n = this.sceneFor(a), r = (u, m) => {
      const w = this.viewLayout(a), _ = m ? n.nodes.find((O) => O.id === m) : void 0, k = _ ? { x: Math.round(t.x - _.x), y: Math.round(t.y - _.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...w, nodes: { ...w.nodes, [u]: k } }), { kind: "move-node", view: a, id: u, pos: null };
    }, c = (u, m, w) => {
      const _ = this.inverseOf(u) ?? [];
      this.command(u, !1);
      const k = r(m, w);
      this.pushUndoEntry([..._, k]);
    };
    if (!o.child) {
      const u = {
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
      }, { id: m, name: w } = this.uniquePaletteName(o.label, u[e] ?? ""), _ = e === "module" ? { kind: "add-module", id: m, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: w } : e === "external-system" ? { kind: "add-external-system", id: m, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: w } : e === "rag" ? { kind: "add-rag", id: m, name: w } : e === "api" ? { kind: "add-api", id: m, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: m, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: m, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: m, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: m, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: m, name: w } : e === "transformation" ? { kind: "add-transformation", id: m, name: w } : e === "custom-code" ? { kind: "add-custom-code", id: m, name: w } : e === "button-group" ? { kind: "add-button-group", id: m, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: m, name: w } : {
        kind: "add-workflow",
        id: m,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      if (_.kind === "create-ui-app") {
        const O = this.dropChain(i).find((D) => this.model.modules.some((N) => N.id === D));
        if (O) {
          c({ ..._, moduleId: O }, m, O);
          return;
        }
      }
      c(_, m);
      return;
    }
    if (e === "ui-wizard-step") {
      const m = this.dropChain(i).map((O) => {
        var D;
        return ((D = /^wizrow:([^:]+):/.exec(O)) == null ? void 0 : D[1]) ?? O;
      }).find((O) => (this.model.pages ?? []).some((D) => D.id === O && D.type === "WIZARD"));
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const w = ((d = (this.model.pages ?? []).find((O) => O.id === m)) == null ? void 0 : d.wizardSteps) ?? [], _ = new Set(w.map((O) => O.id ?? O.pageId));
      let k = w.length + 1;
      for (; _.has(`wzs-${k}`); ) k++;
      this.command({ kind: "add-page-wizard-step", pageId: m, itemId: `wzs-${k}`, label: `Paso ${k}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const u = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", m = u === "CRUD" ? "CRUD" : u === "WIZARD" ? "Wizard" : "Página", { id: w, name: _ } = this.uniquePaletteName(m, "page-"), k = this.dropChain(i), O = k.find((N) => (this.model.uiApps ?? []).some((L) => L.id === N)), D = k.map((N) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(N)) == null ? void 0 : L[1]) ?? N;
      }).find((N) => (this.model.pages ?? []).some((L) => L.id === N && L.type === "WIZARD"));
      if (D) {
        const N = n.nodes.find((M) => M.id === D);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: _, pageType: u }, !1), this.command({ kind: "add-page-wizard-step", pageId: D, targetId: w }, !1);
        const L = r(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, L]), this.emit("modux-notice", { message: `${_} creada como paso del wizard` });
        return;
      }
      if (O) {
        const N = n.nodes.find((L) => L.id === O);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40);
      }
      c(
        O ? { kind: "create-ui-page", id: w, name: _, pageType: u, appId: O, menuLabel: _ } : { kind: "create-ui-page", id: w, name: _, pageType: u },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const u = this.dropChain(i), m = u.find((D) => (this.model.uiApps ?? []).some((N) => N.id === D));
      if (!m) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const w = /* @__PURE__ */ new Set(), _ = (D) => {
        for (const N of D ?? [])
          w.add(N.label), _(N.children);
      };
      (this.model.uiApps ?? []).forEach((D) => _(D.menuItems));
      let k = "Entrada";
      for (let D = 2; w.has(k); D++) k = `Entrada ${D}`;
      const O = u.map((D) => ve(D)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: m,
        label: k,
        itemId: this.newMenuItemId(k),
        parentId: O == null ? void 0 : O.itemId,
        parentLabel: O != null && O.itemId || O == null ? void 0 : O.label
      });
      return;
    }
    if (e === "etl-transform") {
      const m = this.dropChain(i).map((k) => (this.model.etlFlows ?? []).find((O) => O.id === k)).find(Boolean);
      if (!m) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const w = new Set((m.steps ?? []).map((k) => k.id));
      let _ = (m.steps ?? []).length + 1;
      for (; w.has(`ets-${_}`); ) _++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: m.id,
        id: `ets-${_}`,
        name: `Transformación ${_}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: u, name: m } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      c({
        kind: "add-workflow-gateway",
        id: u,
        name: m,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, u), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const m = this.model.workflows ?? [], w = this.dropChain(i), _ = w.map((L) => m.find((M) => M.id === L)).find(Boolean), k = w.map((L) => {
        const M = m.find((x) => (x.steps ?? []).some((U) => U.id === L));
        return M ? { owner: M, stepId: L } : null;
      }).find(Boolean);
      let O = _ ?? (k == null ? void 0 : k.owner);
      if (!O && m.length === 1 && (O = m[0]), !O) {
        if (!m.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: D, name: N } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      k && (t = { x: t.x + 190, y: t.y }), c(
        {
          kind: "add-workflow-step",
          workflowId: O.id,
          id: D,
          name: N,
          ...k ? { dependsOnStepIds: [k.stepId], afterStepId: k.stepId } : {}
        },
        D
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${O.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const u = this.dropContainerFor("api", i);
      if (!u) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: m, name: w } = this.uniquePaletteName("API", "api-"), _ = { kind: "add-api", id: m, name: w }, k = this.inverseOf(_) ?? [];
      this.command(_, !1), this.model.externalSystems.some((L) => L.id === u) ? this.command({ kind: "set-api-publisher", id: m, targetId: u }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: u }, !1);
      const O = this.viewLayout(this._view), D = this.sceneFor(this._view).nodes.find((L) => L.id === u), N = D ? { x: Math.round(t.x - D.x), y: Math.round(t.y - D.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...O, nodes: { ...O.nodes, [m]: N } }), this.pushUndoEntry([...k, { kind: "move-node", view: this._view, id: m, pos: null }]);
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
    }, { id: I, name: f } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      c({ kind: "add-aggregate", id: I, name: f, moduleId: p }, I, p);
    else if (e === "ui-button") {
      const u = (this.model.buttonGroups ?? []).find((_) => _.id === p), m = new Set(((u == null ? void 0 : u.buttons) ?? []).map((_) => _.id));
      let w = ((u == null ? void 0 : u.buttons) ?? []).length + 1;
      for (; m.has(`btn-${w}`); ) w++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${w}`, label: f }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: I, name: f });
    else if (e === "code-module")
      c({ kind: "add-code-module", id: I, name: f, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: I, name: f, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        I,
        p
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: I, name: f, moduleId: p }, I, p);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: I, name: f, moduleId: p }, I, p);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: I, name: f, moduleId: p }, I, p);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: I, name: f, moduleId: p }, I, p);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: I, name: f, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      c({ kind: "add-notification", id: I, name: f, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      c({ kind: "add-document", id: I, name: f, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: I, name: f, moduleId: p }, I, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const u = (this.model.aggregates ?? []).find((m) => m.id === p);
      c({ kind: "add-read-model", id: I, name: f, aggregateId: p }, I, (u == null ? void 0 : u.moduleId) ?? p);
    } else if (e === "api-operation") {
      const u = (this.model.apis ?? []).find((O) => O.id === p), m = new Set(((u == null ? void 0 : u.operations) ?? []).map((O) => O.id));
      let w = f, _ = `apiop-${p.replace(/^api-/, "")}-${ie(w)}`;
      for (let O = 2; m.has(_); O++)
        w = `${o.label} ${O}`, _ = `apiop-${p.replace(/^api-/, "")}-${ie(w)}`;
      c({ kind: "add-api-operation", apiId: p, id: _, name: w }, _, p), n.nodes.some(
        (O) => O.parentId === p && (O.kind === "api-operation" || O.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(u == null ? void 0 : u.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const u = this.model.modules.flatMap((k) => k.useCases ?? []).find((k) => k.id === p), m = new Set((u == null ? void 0 : u.stepIds) ?? []);
      let w = f, _ = `step-${ie(w)}`;
      for (let k = 2; m.has(_); k++)
        w = `${o.label} ${k}`, _ = `step-${ie(w)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: _, name: w }, _, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(u == null ? void 0 : u.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: I, name: f, moduleId: p }, I, p) : e === "external-table" ? c({ kind: "add-external-table", id: I, name: f, moduleId: p }, I, p) : e === "mcp-server" && c({ kind: "add-mcp-server", id: I, name: f, moduleId: p }, I, p);
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
        const u = (this.model.pages ?? []).find((w) => w.id === s[1]), m = ((u == null ? void 0 : u.buttons) ?? []).find((w) => w.useCaseId === s[2]);
        if (!m) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((w) => w.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] }, !1), this.command(
          { kind: "add-page-button", pageId: s[1], useCaseId: e, label: m.label, type: m.bar },
          !1
        ), m.mappingId && this.command(
          { kind: "set-page-button", pageId: s[1], useCaseId: e, label: null, mappingId: m.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: s[1], useCaseId: e },
          { kind: "add-page-button", pageId: s[1], useCaseId: s[2], label: m.label, type: m.bar },
          ...m.mappingId ? [{ kind: "set-page-button", pageId: s[1], useCaseId: s[2], label: null, mappingId: m.mappingId }] : []
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
    const r = a ? ((f = this.componentIn(n, a[2])) == null ? void 0 : f.node) ?? null : null, c = this.model.modules.flatMap((h) => h.useCases ?? []).find((h) => h.id === e);
    if (c) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: r.id, useCaseId: e, label: r.label ?? c.name }), this.emit("modux-notice", { message: `El botón lanza ${c.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${c.name} añadido a la página` }));
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
    const I = this.model.modules.flatMap((h) => (h.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((u) => ({ op: u, qs: d })))).find(({ op: h }) => h.id === e);
    if (I) {
      (r == null ? void 0 : r.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: n,
        componentId: r.id,
        queryOperationId: I.op.id,
        queryServiceId: I.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: n, queryServiceId: I.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${I.op.name}` });
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
    const n = this._view, r = this.sceneFor(n), c = r.nodes.find((f) => f.id === e);
    if (!c) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(n);
        this.writeViewLayout(n, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(n), g = c.parentId ? r.nodes.find((f) => f.id === c.parentId) : void 0, I = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: n, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(n, { ...p, nodes: { ...p.nodes, [e]: I } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "explorer"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = j.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type === "custom-code" || s.type.startsWith("cmp:") : this._view === "explorer" ? !s.type.startsWith("cmp:") : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(s.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
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
                ${j.PALETTE_GROUPS.map((s) => {
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
        const c = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ie(e)}`, name: e, moduleId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((o = this.model.modules[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!c || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ie(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const c = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!c) return;
        this.command({
          kind: "add-process",
          id: `proc-${ie(e)}`,
          name: e,
          moduleId: c,
          triggerAggregateId: this._newTriggerAggId || ((r = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Un(i, t.nodes) : e === "flows" ? Yn(i, t.nodes) : e === "processes" ? Ps(i, t.nodes) : e === "workflows" ? nc(i, t.nodes) : e === "ui" ? pc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? uc(i, t.nodes) : e === "eventstorming" ? Ql(i, t.nodes) : Tn(
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
    var c;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), o = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, n = await mc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: n, edges: {}, sizes: r.sizes }), await this.updateComplete, (c = this.renderRoot.querySelector("modux-canvas")) == null || c.fit();
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
          ?hidden=${!["context-map", "workflows", "ui", "design", "mappings", "explorer"].includes(this._view)}
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
        ${this._view === "workflows" && (this.model.processes ?? []).length ? S`<button
              class="tab"
              title="Los procesos se fusionan en workflows: cadena lineal con rol, plazo y compensación en cada paso"
              @click=${() => this.command({ kind: "migrate-processes-to-workflows" })}
            >
              ⇪ Migrar ${(this.model.processes ?? []).length} procesos
            </button>` : ""}
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
      ${this._view === "design" ? S`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? S`${this.renderPalette()}<modux-explorer
            .model=${this.model}
            ?shifted=${this._paletteOpen}
            @dragover=${(t) => t.preventDefault()}
            @drop=${this.onPaletteDrop}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = bo(t.detail.id, i);
      s && this.openInDrawer(s);
    }}
            @explorer-connect=${(t) => {
      const { sourceId: i, targetId: s, x: o, y: a } = t.detail, n = (c) => this.model.modules.some((p) => p.id === c);
      if (n(i) && n(s)) {
        const c = this.model.relations.find(
          (p) => p.sourceId === i && p.targetId === s && p.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: s,
          mode: c ? "edit" : "create",
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
      const o = `view-${ie(t.detail.name)}`;
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
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
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
  /** The condition editor of one EXCLUSIVE-split branch. */
  renderBranchCondEditor() {
    const e = this._branchCondEditor;
    return e ? S`
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
    return e ? S`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => S`
            <button
              class="picker-item"
              @click=${() => {
        const i = e;
        this._wfStepPicker = null;
        const { id: s, name: o } = this.uniquePaletteName(
          i.stepType === "JOIN" ? "Join" : i.stepType === "SPLIT" ? "Split" : "Paso",
          "wfs-"
        );
        this.command(
          {
            kind: "add-workflow-step",
            workflowId: t.id,
            id: s,
            name: o,
            ...i.stepType ? { stepType: i.stepType } : {}
          },
          !1
        );
        const a = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...a,
          nodes: { ...a.nodes, [s]: { x: Math.round(i.pos.x), y: Math.round(i.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-workflow-step", workflowId: t.id, id: s },
          { kind: "move-node", view: this._view, id: s, pos: null }
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
        ${Tc.map(
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
j.styles = yt`
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
j.CRUD_ROUTES = {
  module: "/modelo/organizacion/modules",
  aggregate: "/modelo/domainModel/aggregates",
  entity: "/modelo/domainModel/entities",
  flow: "/modelo/patrones/flows",
  workflow: "/modelo/patrones/workflows",
  "use-case": "/modelo/behaviour/useCases",
  "domain-event": "/modelo/domainModel/domainEvents",
  subscription: "/modelo/inbound/subscriptions",
  projection: "/modelo/behaviour/projections",
  "read-model": "/modelo/patrones/readModels"
};
j.PALETTE_GROUPS = [
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
j.PALETTE_NEW = [
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
Z([
  oe({ attribute: !1 })
], j.prototype, "model", 2);
Z([
  oe({ attribute: !1 })
], j.prototype, "layout", 2);
Z([
  oe({ attribute: !1 })
], j.prototype, "diff", 2);
Z([
  z()
], j.prototype, "_view", 2);
Z([
  z()
], j.prototype, "_detail", 2);
Z([
  z()
], j.prototype, "_relationType", 2);
Z([
  z()
], j.prototype, "_relationPicker", 2);
Z([
  z()
], j.prototype, "_extDepPicker", 2);
Z([
  z()
], j.prototype, "_selectedId", 2);
Z([
  z()
], j.prototype, "_paletteOpen", 2);
Z([
  z()
], j.prototype, "_drawer", 2);
Z([
  oe({ attribute: !1 })
], j.prototype, "repositories", 2);
Z([
  z()
], j.prototype, "_repoPicker", 2);
Z([
  z()
], j.prototype, "_wfStepPicker", 2);
Z([
  z()
], j.prototype, "_branchCondEditor", 2);
Z([
  z()
], j.prototype, "_paletteFilter", 2);
Z([
  z()
], j.prototype, "_paletteTab", 2);
Z([
  z()
], j.prototype, "_selectedCmp", 2);
Z([
  z()
], j.prototype, "_fullscreen", 2);
Z([
  z()
], j.prototype, "_tilt", 2);
Z([
  z()
], j.prototype, "_helpOpen", 2);
Z([
  z()
], j.prototype, "_newName", 2);
Z([
  z()
], j.prototype, "_newModuleId", 2);
Z([
  z()
], j.prototype, "_newArchetype", 2);
Z([
  z()
], j.prototype, "_newTriggerAggId", 2);
Z([
  z()
], j.prototype, "_newTriggerEvent", 2);
Z([
  z()
], j.prototype, "_newTargetId", 2);
Z([
  z()
], j.prototype, "_undoStack", 2);
Z([
  z()
], j.prototype, "_redoStack", 2);
Z([
  z()
], j.prototype, "_newStepName", 2);
Z([
  z()
], j.prototype, "_newStepType", 2);
Z([
  z()
], j.prototype, "_newStepRole", 2);
Z([
  z()
], j.prototype, "_newStepDeadline", 2);
Z([
  z()
], j.prototype, "_editStepRole", 2);
Z([
  z()
], j.prototype, "_editStepDeadline", 2);
Z([
  z()
], j.prototype, "_editStepComp", 2);
Z([
  z()
], j.prototype, "_newStepUseCase", 2);
Z([
  z()
], j.prototype, "_newStepEmits", 2);
Z([
  z()
], j.prototype, "_editStepUseCase", 2);
Z([
  z()
], j.prototype, "_editStepEmits", 2);
Z([
  z()
], j.prototype, "_editStepAwaits", 2);
Z([
  z()
], j.prototype, "_multi", 2);
Z([
  z()
], j.prototype, "_newViewName", 2);
Z([
  z()
], j.prototype, "_activeViewId", 2);
Z([
  z()
], j.prototype, "_newRagSourceType", 2);
Z([
  z()
], j.prototype, "_newRagSourceUri", 2);
Z([
  z()
], j.prototype, "_addMemberKey", 2);
Z([
  z()
], j.prototype, "_treeOpen", 2);
Z([
  z()
], j.prototype, "_deletePicker", 2);
j = Z([
  vt("modux-editor")
], j);
var Rc = Object.defineProperty, Lc = Object.getOwnPropertyDescriptor, be = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Lc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Rc(t, i, o), o;
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
      const r = this._diff.changes.filter((c) => c.kind === s);
      return r.length ? S`
            <div class="diff-group">${o} (${r.length})</div>
            ${r.map(
        (c) => S`
                <div class="diff-row">
                  <span class="diff-mark ${n}">${a}</span>
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
    var o, a, n;
    const i = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var r;
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
        this._workspace = await c.json(), await this.reload(), await this.refreshDiff(), (r = this.renderRoot.querySelector("modux-editor")) == null || r.clearHistory();
      } catch (c) {
        this.showToast(String(c));
      }
    });
    const s = (a = this._workspace) == null ? void 0 : a.current;
    if (s && s !== i) {
      const r = ((n = this._workspace.solutions.find((c) => c.branch === s)) == null ? void 0 : n.name) ?? s.replace(/^solution\//, "");
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
            const I = await n.json();
            I != null && I.message && (g = I.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: r } = await n.json(), c = o ? { kind: "set-api-publisher", id: r, targetId: o } : a ? { kind: "add-api-implementation", apiId: r, moduleId: a } : null;
        c && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(c)
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
he.styles = yt`
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
be([
  oe()
], he.prototype, "base", 2);
be([
  z()
], he.prototype, "_model", 2);
be([
  z()
], he.prototype, "_layout", 2);
be([
  z()
], he.prototype, "_error", 2);
be([
  z()
], he.prototype, "_saving", 2);
be([
  z()
], he.prototype, "_toast", 2);
be([
  z()
], he.prototype, "_workspace", 2);
be([
  z()
], he.prototype, "_creatingSolution", 2);
be([
  z()
], he.prototype, "_newSolutionName", 2);
be([
  z()
], he.prototype, "_taggingVersion", 2);
be([
  z()
], he.prototype, "_newTagName", 2);
be([
  z()
], he.prototype, "_tagsOpen", 2);
be([
  z()
], he.prototype, "_tags", 2);
be([
  z()
], he.prototype, "_repositories", 2);
be([
  z()
], he.prototype, "_diff", 2);
be([
  z()
], he.prototype, "_diffListOpen", 2);
be([
  z()
], he.prototype, "_mergeFlow", 2);
he = be([
  vt("modux-editor-connected")
], he);
export {
  Dc as CONTAINER_HEADER,
  zc as CONTAINER_INSET,
  ge as ModuxCanvas,
  j as ModuxEditor,
  he as ModuxEditorConnected,
  Un as aggregatesScene,
  pt as apiImplNodeId,
  ct as apiOpOccurrenceId,
  _i as containerFit,
  xn as containerMinSize,
  Tn as contextMapScene,
  Cn as flowCoherence,
  Yn as flowsScene,
  ci as normalizeViewLayout,
  Ps as processesScene,
  Sn as relationEdgeId,
  Li as resolveOverlaps
};
