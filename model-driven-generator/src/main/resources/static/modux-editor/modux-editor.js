const Xc = 34, Qc = 10;
function Bi(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let n = 0; n < e.length; n++)
      for (let r = n + 1; r < e.length; r++) {
        const u = e[n], l = e[r], g = i.get(u.id), I = i.get(l.id), h = I.x - g.x, f = I.y - g.y, d = (u.w + l.w) / 2 + t - Math.abs(h), c = (u.h + l.h) / 2 + t - Math.abs(f);
        if (!(d <= 0 || c <= 0))
          if (a = !0, d < c) {
            const m = (h >= 0 ? 1 : -1) * d / 2;
            g.x -= m, I.x += m;
          } else {
            const m = (f >= 0 ? 1 : -1) * c / 2;
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
function On(e, t = { w: 160, h: 90 }) {
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
function Mi(e, t, i) {
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
const Nn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Rs = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Rn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ve = 168, He = 56;
function ut(e, t) {
  return `apiimpl:${e}@${t}`;
}
function pt(e, t) {
  return `apiop:${e}@${t}`;
}
const Ls = { compact: 0, coarse: 1, full: 2 };
function Ds(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", o = e ? s : t;
  return { form: o, collapsed: Ls[e ? t : s] > Ls[o] };
}
function To(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: ut(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Oo = 34, No = 14, Ln = 14, xe = 108, we = 32, bs = 12, Pi = 10, ot = 2, Ro = ot * xe + (ot - 1) * bs + 2 * No;
function Dn(e, t) {
  return `rel:${e}->${t}`;
}
function Un(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function rt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const cs = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Ti = {
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
}, Xt = {
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
  const t = Math.max(1, Math.ceil(e / ot)), i = t * we + (t - 1) * Pi;
  return { w: Ro, h: Oo + i + Ln };
}
function St(e, t) {
  const i = e % ot, s = Math.floor(e / ot);
  return {
    x: -t.w / 2 + No + i * (xe + bs) + xe / 2,
    y: -t.h / 2 + Oo + s * (we + Pi) + we / 2
  };
}
function Lo(e, t) {
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
function zn(e, t, i, s, o, a, n = !1) {
  const r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...To(e, t.id),
    ...Lo(e, t)
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: Ve, h: He }];
  if (n) {
    const u = new Map((e.apis ?? []).map((g) => [g.id, g])), l = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && u.has(g.apiId)).map((g) => {
      const I = u.get(g.apiId);
      return {
        id: ut(g.apiId, g.moduleId),
        name: I.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${I.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (I.operations ?? []).map((h) => ({
          id: pt(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (l.length > 0) {
      const g = r.filter((I) => I.kind !== "api-impl");
      return Do(i, s, l, g, o, a);
    }
  }
  return Vt(i, s, r, o, a);
}
function Do(e, t, i, s, o, a, n = /* @__PURE__ */ new Set()) {
  const r = a[t.id] ?? Oi(i.length + s.length), u = i.map((f, d) => {
    const c = o[f.id] ?? St(d, r), m = n.has(f.id) ? [] : f.ops, w = a[f.id] ?? Oi(m.length), $ = m.map((P, R) => o[P.id] ?? St(R, w)), b = Mi(
      { x: c.x, y: c.y },
      w,
      $.map((P) => ({ dx: P.x, dy: P.y, w: xe, h: we }))
    );
    return { a: f, off: c, ops: m, opOffs: $, fit: b };
  }), l = s.map(
    (f, d) => o[f.id] ?? St(i.length + d, r)
  ), g = Bi(
    [
      ...u.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...s.map((f, d) => ({
        id: f.id,
        x: l[d].x,
        y: l[d].y,
        w: xe,
        h: we
      }))
    ],
    24
  );
  for (const f of u) {
    const d = g.get(f.a.id);
    d && (f.off = { x: f.off.x + (d.x - f.fit.x), y: f.off.y + (d.y - f.fit.y) }, f.fit = { ...f.fit, x: d.x, y: d.y });
  }
  s.forEach((f, d) => {
    const c = g.get(f.id);
    c && (l[d] = { x: c.x, y: c.y });
  });
  const I = Mi(e, r, [
    ...u.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...l.map((f) => ({ dx: f.x, dy: f.y, w: xe, h: we }))
  ]), h = [
    { ...t, x: I.x, y: I.y, w: I.w, h: I.h, container: !0 }
  ];
  for (const f of u)
    h.push({
      id: f.a.id,
      label: f.a.name,
      kind: f.a.kind,
      symbol: "interface",
      fill: f.a.fill,
      stroke: f.a.stroke,
      badge: f.a.badge,
      container: !0,
      collapsible: f.a.ops.length > 0 || n.has(f.a.id),
      collapsed: n.has(f.a.id),
      parentId: t.id,
      x: e.x + f.fit.x,
      y: e.y + f.fit.y,
      w: f.fit.w,
      h: f.fit.h,
      tooltip: f.a.tooltip
    }), f.ops.forEach((d, c) => {
      h.push({
        id: d.id,
        label: d.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[c].x,
        y: e.y + f.off.y + f.opOffs[c].y,
        w: xe,
        h: we,
        tooltip: `${Xt[f.a.opKind]}: ${d.name}`
      });
    });
  return s.forEach((f, d) => {
    const c = Ti[f.kind];
    h.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + l[d].x,
      y: e.y + l[d].y,
      w: xe,
      h: we,
      symbol: c.symbol,
      fill: c.fill,
      stroke: c.stroke,
      parentId: t.id,
      tooltip: `${Xt[f.kind]} ${f.name}`
    });
  }), h;
}
const qn = [
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
], Us = 20, zs = 28, Wt = 10, Dt = Ro + 2 * Wt;
function Fn(e, t, i, s, o, a, n = /* @__PURE__ */ new Set()) {
  const r = Lo(e, t), u = new Map(r.map((b) => [b.id, b])), l = (e.codeModules ?? []).filter((b) => b.moduleId === t.id), g = new Set(l.flatMap((b) => b.elementIds ?? [])), h = l.some((b) => n.has(b.id)) ? r.filter((b) => !g.has(b.id)) : [], f = a[s.id] ?? Oi(l.length + h.length), d = l.map((b, P) => {
    const R = n.has(b.id), N = R ? (b.elementIds ?? []).map((_) => u.get(_)).filter((_) => !!_) : [], D = R ? qn.map((_) => {
      const B = N.filter((y) => _.kinds.includes(y.kind)), ie = Math.ceil(B.length / ot), ee = Us + (ie ? ie * we + (ie - 1) * Pi + 8 : 8);
      return { layer: _, chips: B, rows: ie, h: ee };
    }) : [], V = R ? zs + D.reduce((_, B) => _ + B.h, 0) + Wt : 56, k = o[b.id] ?? St(P, f);
    return { cm: b, expanded: R, bands: D, boxH: V, off: k };
  }), c = h.map(
    (b, P) => o[b.id] ?? St(d.length + P, f)
  ), m = Bi(
    [
      ...d.map((b) => ({ id: b.cm.id, x: b.off.x, y: b.off.y, w: Dt, h: b.boxH })),
      ...h.map((b, P) => ({ id: b.id, x: c[P].x, y: c[P].y, w: xe, h: we }))
    ],
    24
  );
  for (const b of d) {
    const P = m.get(b.cm.id);
    P && (b.off = { x: P.x, y: P.y });
  }
  h.forEach((b, P) => {
    const R = m.get(b.id);
    R && (c[P] = { x: R.x, y: R.y });
  });
  const w = Mi(i, f, [
    ...d.map((b) => ({ dx: b.off.x, dy: b.off.y, w: Dt, h: b.boxH })),
    ...c.map((b) => ({ dx: b.x, dy: b.y, w: xe, h: we }))
  ]), $ = [
    { ...s, x: w.x, y: w.y, w: w.w, h: w.h, container: !0 }
  ];
  for (const b of d) {
    const P = i.x + b.off.x, R = i.y + b.off.y;
    if ($.push({
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
      parentId: s.id,
      x: P,
      y: R,
      w: Dt,
      h: b.boxH,
      tooltip: b.expanded ? `${b.cm.name} — módulo desplegado: arrastra el asa de un elemento suelto hasta él para empaquetarlo; el chevron lo pliega` : `${b.cm.name} — módulo: el chevron lo abre para ver y empaquetar su contenido`
    }), !b.expanded) continue;
    let N = -b.boxH / 2 + zs;
    for (const D of b.bands) {
      const V = `hexlayer:${b.cm.id}:${D.layer.key}`;
      $.push({
        id: V,
        label: D.layer.label,
        kind: "hex-layer",
        fill: D.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: b.cm.id,
        x: P,
        y: R + N + D.h / 2,
        w: Dt - 2 * Wt,
        h: D.h,
        tooltip: `Capa de ${D.layer.label} del módulo ${b.cm.name} (derivada del tipo de cada elemento)`
      }), D.chips.forEach((k, _) => {
        const B = _ % ot, ie = Math.floor(_ / ot), ee = k.policy ? cs : Ti[k.kind];
        $.push({
          id: k.id,
          label: k.name,
          kind: k.kind,
          x: P - (Dt - 2 * Wt) / 2 + Wt + B * (xe + bs) + xe / 2,
          y: R + N + Us + ie * (we + Pi) + we / 2,
          w: xe,
          h: we,
          symbol: ee.symbol,
          fill: ee.fill,
          stroke: ee.stroke,
          parentId: V,
          tooltip: `${k.policy ? "Policy" : Xt[k.kind]} ${k.name} — en el módulo ${b.cm.name} (Supr lo saca del módulo)`
        });
      }), N += D.h;
    }
  }
  return h.forEach((b, P) => {
    const R = b.policy ? cs : Ti[b.kind];
    $.push({
      id: b.id,
      label: b.name,
      kind: b.kind,
      x: i.x + c[P].x,
      y: i.y + c[P].y,
      w: xe,
      h: we,
      symbol: R.symbol,
      fill: R.fill,
      stroke: R.stroke,
      parentId: s.id,
      tooltip: `${b.policy ? "Policy" : Xt[b.kind]} ${b.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), $;
}
function Vt(e, t, i, s, o) {
  const a = o[t.id] ?? Oi(i.length), n = i.map((I, h) => s[I.id] ?? St(h, a)), r = Bi(
    i.map((I, h) => ({ id: I.id, x: n[h].x, y: n[h].y, w: xe, h: we })),
    10
  );
  i.forEach((I, h) => {
    const f = r.get(I.id);
    f && (n[h] = { x: f.x, y: f.y });
  });
  const u = Mi(
    e,
    a,
    n.map((I) => ({ dx: I.x, dy: I.y, w: xe, h: we }))
  ), l = {
    ...t,
    x: u.x,
    y: u.y,
    w: u.w,
    h: u.h,
    container: !0
  }, g = i.map((I, h) => {
    const f = n[h], d = I.policy ? cs : Ti[I.kind];
    return {
      id: I.id,
      label: I.name,
      kind: I.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: xe,
      h: we,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${I.policy ? "Policy" : Xt[I.kind]} ${I.name}`
    };
  });
  return [l, ...g];
}
function Bn(e, t, i = "contexts", s = {}, o = /* @__PURE__ */ new Set()) {
  const a = i === "distribution", n = i === "contexts", r = a || n, u = o, l = i !== "contexts", g = i === "operations", I = new Set(e.externalSystems.map((p) => p.id)), h = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && I.has(p.publishedByExternalSystemId)
  ), f = new Set(h.map((p) => p.id)), d = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && I.has(p.publishedByExternalSystemId)
  ), c = new Set(d.map((p) => p.id)), m = [
    ...e.modules.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
    ...r ? [] : (e.apis ?? []).filter((p) => !f.has(p.id)).map((p) => ({ ref: p, external: !1, api: !0, proxy: !1 })),
    ...r ? [] : (e.proxyApis ?? []).filter((p) => !c.has(p.id)).map((p) => ({ ref: p, external: !1, api: !1, proxy: !0 })),
    ...r ? [] : (e.workflows ?? []).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...r ? [] : (e.etlFlows ?? []).filter((p) => !p.ownerModuleId).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(n ? [] : e.identityProviders ?? []).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ], w = m.flatMap((p, O) => {
    const F = t[p.ref.id] ?? rt(O, m.length);
    if ("idp" in p && p.idp) {
      const K = p.ref, le = !!K.publishedByExternalSystemId;
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
        x: F.x,
        y: F.y,
        w: Ve,
        h: He
      }];
    }
    if ("etl" in p && p.etl) {
      const K = p.ref;
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
        w: Ve,
        h: He
      }];
    }
    if ("workflow" in p && p.workflow) {
      const K = p.ref;
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
        w: Ve,
        h: He
      }];
    }
    if (p.proxy) {
      const K = p.ref, le = {
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
        const Ke = (e.apis ?? []).find((kt) => kt.id === K.targetApiId), Xe = (Ke == null ? void 0 : Ke.operations) ?? [];
        if (Xe.length > 0)
          return Vt(
            F,
            le,
            Xe.map((kt) => ({
              id: pt(kt.id, K.id),
              name: kt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...le, x: F.x, y: F.y, w: Ve, h: He }];
    }
    if (p.api) {
      const K = p.ref, le = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (o.has(K.id) ? !l : l) && K.operations.length > 0 ? Vt(
        F,
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
        x: F.x,
        y: F.y,
        w: Ve,
        h: He
      }];
    }
    if (p.external) {
      const K = p.ref, le = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: K.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: K.referencedRepositoryId ? `${K.name} — otro proyecto modux (repositorio ${K.referencedRepositoryId}), referenciado del catálogo` : `${K.name} (sistema externo)`
      }, Ke = h.filter((he) => he.publishedByExternalSystemId === K.id), Xe = d.filter((he) => he.publishedByExternalSystemId === K.id), kt = Xe.map(
        (he) => ({ id: he.id, name: he.name, kind: "proxy-api" })
      ), ji = [
        ...(K.useCases ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (he) => ({ id: he.id, name: he.name, kind: "mcp-server" })
        )
      ], Yi = Ke.length > 0 || Xe.length > 0, Ki = Yi || ji.length > 0, { form: li, collapsed: Xi } = Ds(
        o.has(K.id),
        // Deployment is topology: external systems join compact, like the modules.
        a ? "compact" : l ? "full" : Yi ? "coarse" : "compact",
        ji.length > 0 || g && Yi
      ), Os = [
        ...kt,
        ...li === "full" ? ji : []
      ], Qi = g && li === "full" ? Xe.filter((he) => {
        const Rt = he.targetApiId ? (e.apis ?? []).find((Ee) => Ee.id === he.targetApiId) : void 0;
        return ((Rt == null ? void 0 : Rt.operations) ?? []).length > 0;
      }) : [];
      if (g && li === "full" && (Ke.length > 0 || Qi.length > 0)) {
        const he = [
          ...Ke.map((Ee) => ({
            id: Ee.id,
            name: Ee.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${Ee.name} — API publicada por ${K.name}`,
            opKind: "api-operation",
            ops: (Ee.operations ?? []).map((Lt) => ({ id: Lt.id, name: Lt.name }))
          })),
          ...Qi.map((Ee) => {
            const Lt = (e.apis ?? []).find((ci) => ci.id === Ee.targetApiId);
            return {
              id: Ee.id,
              name: Ee.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${Ee.name} — proxy/cache de ${Lt.name}`,
              opKind: "api-op-occurrence",
              ops: (Lt.operations ?? []).map((ci) => ({
                id: pt(ci.id, Ee.id),
                name: ci.name
              }))
            };
          })
        ], Rt = new Set(Qi.map((Ee) => Ee.id));
        return Do(
          F,
          { ...le, collapsible: !0, collapsed: Xi },
          he,
          Os.filter((Ee) => !Rt.has(Ee.id)),
          t,
          s,
          u
        );
      }
      const Ns = li === "compact" ? [] : [
        ...Ke.map((he) => ({ id: he.id, name: he.name, kind: "api" })),
        ...Os
      ];
      return Ns.length > 0 ? Vt(
        F,
        { ...le, collapsible: Ki, collapsed: Xi },
        Ns,
        t,
        s
      ) : [{
        ...le,
        collapsible: Ki,
        collapsed: Ki && Xi,
        x: F.x,
        y: F.y,
        w: Ve,
        h: He
      }];
    }
    const X = p.ref, Y = X.subdomainType ?? "GENERIC", ue = {
      id: X.id,
      label: X.name,
      kind: "module",
      symbol: "component",
      fill: Nn[Y],
      stroke: "#94a3b8",
      badge: Y,
      tooltip: `${X.name} — subdominio ${Y}`
    }, De = To(e, X.id), Ot = (e.aggregates ?? []).some((K) => K.moduleId === X.id) || (X.useCases ?? []).length > 0 || (X.domainEvents ?? []).length > 0 || (X.applicationEvents ?? []).length > 0 || (X.readModels ?? []).length > 0 || (X.domainServices ?? []).length > 0 || (X.queryServices ?? []).length > 0 || (X.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerModuleId === X.id) || (e.notifications ?? []).some((K) => K.ownerModuleId === X.id) || (e.documents ?? []).some((K) => K.ownerModuleId === X.id), at = Ot || De.length > 0, { form: Nt, collapsed: xt } = Ds(
      o.has(X.id),
      l ? "full" : De.length > 0 ? "coarse" : "compact",
      Ot
    );
    return a ? Fn(
      e,
      X,
      F,
      { ...ue, collapsible: !1, collapsed: !1 },
      t,
      s,
      o
    ) : Nt === "full" && at ? zn(
      e,
      X,
      F,
      { ...ue, collapsible: !0, collapsed: xt },
      t,
      s,
      g
    ) : Nt === "coarse" && De.length > 0 ? Vt(
      F,
      { ...ue, collapsible: at, collapsed: xt },
      De,
      t,
      s
    ) : [{
      ...ue,
      collapsible: at,
      collapsed: at && xt,
      x: F.x,
      y: F.y,
      w: Ve,
      h: He
    }];
  }), $ = r ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, b = m.length + $.actors.length + $.aiAgents.length + $.rags.length + $.mcpGateways.length;
  $.actors.forEach((p, O) => {
    const F = t[p.id] ?? rt(m.length + O, b);
    w.push({
      id: p.id,
      label: p.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${p.name} (actor)`
    });
  }), $.aiAgents.forEach((p, O) => {
    const F = t[p.id] ?? rt(m.length + (e.actors ?? []).length + O, b);
    w.push({
      id: p.id,
      label: p.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: p.external ? "#ffffff" : "#faf5ff",
      stroke: "#9333ea",
      dashed: !!p.external,
      badge: p.external ? "AGENTE IA EXT." : "AGENTE IA",
      tooltip: p.external ? `${p.name} (agente de IA externo — entra por un gateway MCP)` : `${p.name} (agente de IA — consume por MCP)`
    });
  }), $.mcpGateways.forEach((p, O) => {
    const F = t[p.id] ?? rt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
      b
    );
    w.push({
      id: p.id,
      label: p.name,
      x: F.x,
      y: F.y,
      w: 148,
      h: 48,
      kind: "mcp-gateway",
      symbol: "plug",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: "GATEWAY MCP",
      tooltip: `${p.name} — agrega MCPs y expone APIs, operaciones, casos de uso y RAGs como MCP`
    });
  });
  const P = [];
  if ($.rags.forEach((p, O) => {
    const F = t[p.id] ?? rt(
      m.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
      b
    );
    w.push({
      id: p.id,
      label: p.name,
      x: F.x,
      y: F.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${p.name} (base de conocimiento — retrieval para agentes)`
    }), (p.contentSources ?? []).forEach((X, Y) => {
      const ue = `ragcs:${p.id}:${X.uri}`, De = t[ue] ?? { x: F.x + 170, y: F.y - 30 + Y * 44 };
      w.push({
        id: ue,
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
      }), P.push({
        id: `ragcse:${p.id}:${X.uri}`,
        sourceId: ue,
        targetId: p.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), a) {
    const p = e.services ?? [];
    p.forEach((F, X) => {
      const Y = t[F.id] ?? rt(m.length + X, m.length + p.length);
      w.push({
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
        w: Ve,
        h: He
      });
    });
    const O = [];
    [...new Set(p.filter((F) => F.database).map((F) => F.database))].forEach((F) => O.push({
      id: `infra-db:${F}`,
      label: F,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${F} — la usan los servicios que declaran database=${F}`
    })), p.some((F) => F.outboxEnabled) && O.push({
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
      const Y = t[F.id] ?? rt(
        m.length + p.length + X,
        m.length + p.length + O.length
      );
      w.push({
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
        w: Ve,
        h: He
      });
    });
  }
  w.sort((p, O) => (p.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const R = e.relations.map((p) => ({
    id: Dn(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? Rs[p.type] : p.inferredType ? `≈${Rs[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), N = e.flows.map((p) => {
    var De, Ot, at, Nt, xt, K;
    const O = Un(e, p), F = l ? e.modules.find((le) => le.id === p.sourceId) : void 0, X = ((De = F == null ? void 0 : F.domainEvents) == null ? void 0 : De.find((le) => le.name === p.triggerEvent)) ?? ((Ot = F == null ? void 0 : F.applicationEvents) == null ? void 0 : Ot.find((le) => le.name === p.triggerEvent)), Y = l && p.readModelName ? (Nt = (at = e.modules.find((le) => le.id === p.targetId)) == null ? void 0 : at.readModels) == null ? void 0 : Nt.find((le) => le.name === p.readModelName) : void 0, ue = l && p.targetUseCaseId ? (K = (xt = e.modules.find((le) => le.id === p.targetId)) == null ? void 0 : xt.useCases) == null ? void 0 : K.find((le) => le.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (X == null ? void 0 : X.id) ?? p.sourceId,
      targetId: (ue == null ? void 0 : ue.id) ?? (Y == null ? void 0 : Y.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: Rn[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${O}`
    };
  }), D = new Map((e.apis ?? []).map((p) => [p.id, p])), V = new Set(e.modules.map((p) => p.id)), k = (e.apiImplementations ?? []).filter(
    (p) => D.has(p.apiId) && V.has(p.moduleId)
  ), _ = new Set(w.map((p) => p.id)), B = a ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.codeModuleIds ?? []).filter((O) => _.has(O) && _.has(p.id)).map((O) => ({
        id: `deploy:${p.id}->${O}`,
        sourceId: p.id,
        targetId: O,
        kind: "deploys",
        color: "#334155",
        dashed: !0,
        arrow: !0,
        tooltip: `desplegado en ${p.name} — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((p) => {
      const O = [];
      return p.database && _.has(`infra-db:${p.database}`) && _.has(p.id) && O.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && _.has("infra-broker") && _.has(p.id) && O.push({
        id: `infrabroker:${p.id}`,
        sourceId: p.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} publica eventos por el outbox`
      }), O;
    })
  ] : [], ie = l ? (e.emissions ?? []).filter((p) => _.has(p.sourceId) && _.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], ee = l ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: O }) => O && p.readModelId).filter(({ p, source: O }) => _.has(O) && _.has(p.readModelId)).map(({ p, source: O }) => ({
    id: `proj:${p.id}`,
    sourceId: O,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], y = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((O) => {
      const F = l && O.targetUseCaseId && _.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetModuleId && _.has(O.targetModuleId) ? O.targetModuleId : (O.targetUseCaseId && !l, null);
      if (!F) return [];
      const X = l && _.has(O.id) ? O.id : p.id;
      return _.has(X) ? [
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
  ), A = l ? (e.useCaseCalls ?? []).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], v = [
    ...e.modules.filter((p) => p.identityProviderId && _.has(p.id) && _.has(p.identityProviderId)).map((p) => ({
      id: `idptrust:${p.id}`,
      sourceId: p.id,
      targetId: p.identityProviderId,
      kind: "idp-trust",
      color: "#ca8a04",
      label: "valida tokens de",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} valida los tokens emitidos por este IdP — Supr lo desconfía`
    })),
    ...(e.etlFlows ?? []).filter((p) => p.identityProviderId && _.has(p.identityProviderId)).flatMap((p) => {
      const O = _.has(p.id) ? p.id : p.ownerModuleId && _.has(p.ownerModuleId) ? p.ownerModuleId : null;
      return O ? [{
        id: `idpsvc:${p.id}`,
        sourceId: O,
        targetId: p.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((p) => p.publishedByExternalSystemId && _.has(p.id) && _.has(p.publishedByExternalSystemId)).map((p) => ({
      id: `idpfed:${p.id}`,
      sourceId: p.publishedByExternalSystemId,
      targetId: p.id,
      kind: "idp-federation",
      color: "#ca8a04",
      label: "publica",
      dashed: !0,
      arrow: !0,
      tooltip: "IdP federado: lo publica este sistema externo — Supr lo vuelve propio"
    }))
  ], x = l ? e.modules.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && _.has(p.id) && _.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], S = l ? (e.aggregateCalls ?? []).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], E = l ? (e.queryCalls ?? []).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], T = l ? (e.actorUses ?? []).filter((p) => _.has(p.actorId) && _.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], M = (e.actorExternalDependencies ?? []).filter((p) => _.has(p.actorId) && _.has(p.externalSystemId)).map((p) => ({
    id: `extdep:${p.actorId}->${p.externalSystemId}`,
    sourceId: p.actorId,
    targetId: p.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), L = new Map([
    ...(e.apis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId])
  ]), q = (p) => _.has(p) ? p : L.get(p) ?? p, j = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: q(p.targetId),
        cqrs: p.type === "CQRS"
      })).filter(
        (p) => _.has(p.sourceId) && _.has(p.targetId) && p.sourceId !== p.targetId
      ).map((p) => [
        `xdep:${p.sourceId}->${p.targetId}`,
        {
          id: `xdep:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "ext-dep",
          color: p.cqrs ? "#7c3aed" : "#64748b",
          label: p.cqrs ? "CQRS" : "dep",
          dashed: !0,
          arrow: !0,
          tooltip: p.cqrs ? "CQRS — consulta sobre sus datos" : "depende de"
        }
      ])
    ).values()
  ], ne = /* @__PURE__ */ new Map();
  for (const p of e.modules) {
    for (const O of p.useCases ?? []) ne.set(O.id, p.id);
    for (const O of p.domainEvents ?? []) ne.set(O.id, p.id);
    for (const O of p.applicationEvents ?? []) ne.set(O.id, p.id);
    for (const O of p.queryServices ?? []) ne.set(O.id, p.id);
  }
  const pe = (p) => _.has(p) ? p : ne.get(p) ?? p, z = /* @__PURE__ */ new Map();
  for (const p of e.modules) {
    for (const O of p.domainEvents ?? []) z.set(O.name, O.id);
    for (const O of p.applicationEvents ?? []) z.set(O.name, O.id);
  }
  const H = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: p.id, targetId: pe(O.targetUseCaseId) }))
      ).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `wfcall:${p.sourceId}->${p.targetId}`,
        {
          id: `wfcall:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "wf-call",
          color: "#7c3aed",
          dashed: !0,
          arrow: !0,
          tooltip: "orquesta"
        }
      ])
    ).values()
  ], de = [
    ...new Map(
      (e.workflows ?? []).filter((p) => p.triggerEvent && z.has(p.triggerEvent)).map((p) => ({
        sourceId: pe(z.get(p.triggerEvent)),
        targetId: p.id,
        label: p.triggerEvent
      })).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `wftrig:${p.sourceId}->${p.targetId}`,
        {
          id: `wftrig:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "wf-trigger",
          color: "#f59e0b",
          label: p.label,
          dashed: !0,
          arrow: !0,
          tooltip: "dispara el workflow"
        }
      ])
    ).values()
  ], me = /* @__PURE__ */ new Map();
  for (const p of e.externalSystems)
    for (const O of p.tables ?? []) me.set(O.id, p.id);
  const Ue = (e.notifications ?? []).flatMap((p) => {
    var X;
    const O = _.has(p.id) ? p.id : p.ownerModuleId && _.has(p.ownerModuleId) ? p.ownerModuleId : null;
    if (!O) return [];
    const F = [];
    if (p.eventId) {
      const Y = _.has(p.eventId) ? p.eventId : ne.get(p.eventId);
      Y && _.has(Y) && Y !== O && F.push({
        id: `notif:${p.id}`,
        sourceId: Y,
        targetId: O,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const Y of p.recipientRoleIds ?? [])
      _.has(Y) && F.push({
        id: `notifto:${p.id}:${Y}`,
        sourceId: O,
        targetId: Y,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((X = (p.channels ?? [])[0]) == null ? void 0 : X.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} avisa a este rol — Supr lo quita`
      });
    return F;
  }), _e = (e.documents ?? []).flatMap((p) => {
    const O = _.has(p.id) ? p.id : p.ownerModuleId && _.has(p.ownerModuleId) ? p.ownerModuleId : null;
    if (!O || !p.queryServiceId) return [];
    const F = _.has(p.queryServiceId) ? p.queryServiceId : ne.get(p.queryServiceId);
    return !F || !_.has(F) || F === O ? [] : [{
      id: `docq:${p.id}`,
      sourceId: F,
      targetId: O,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), W = (e.etlFlows ?? []).flatMap(
    (p) => (p.steps ?? []).flatMap((O) => {
      const F = _.has(p.id) ? p.id : p.ownerModuleId && _.has(p.ownerModuleId) ? p.ownerModuleId : null;
      if (!F) return [];
      const X = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!X) return [];
      let Y = X;
      if (!_.has(Y) && O.operationId && O.apiId && (Y = O.apiId), !_.has(Y) && O.externalTableId && (Y = me.get(O.externalTableId) ?? Y), _.has(Y) || (Y = q(Y)), _.has(Y) || (Y = ne.get(X) ?? Y), !_.has(Y) || Y === F) return [];
      const ue = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${O.id}`,
        sourceId: ue ? Y : F,
        targetId: ue ? F : Y,
        kind: ue ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ue ? `${p.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), Q = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: _.has(O) ? O : me.get(O) ?? O,
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `ragtbl:${p.sourceId}->${p.targetId}`,
        {
          id: `ragtbl:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "rag-table",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${p.name} indexa esta tabla`
        }
      ])
    ).values()
  ], $e = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceApiIds ?? []).map((O) => ({
          sourceId: q(O),
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `ragapi:${p.sourceId}->${p.targetId}`,
        {
          id: `ragapi:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "rag-api",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${p.name} indexa el contenido de esta API`
        }
      ])
    ).values()
  ], Me = [
    ...new Map(
      (e.rags ?? []).flatMap((p) => [
        ...(p.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: p.id, name: p.name })),
        ...(p.sourceModuleIds ?? []).map((O) => ({ sourceId: O, targetId: p.id, name: p.name }))
      ]).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `ragcoarse:${p.sourceId}->${p.targetId}`,
        {
          id: `ragcoarse:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "rag-coarse",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: `${p.name} indexa su contenido`
        }
      ])
    ).values()
  ], Le = [
    ...new Map(
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: q(p.apiId) })).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => [
        `agapi:${p.sourceId}->${p.targetId}`,
        {
          id: `agapi:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "agent-api",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume la API entera como herramienta"
        }
      ])
    ).values()
  ], Ce = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, et = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== p.id && Ce(O) === p.triggerEvent).filter((O) => _.has(O.id) && _.has(p.id)).map((O) => ({
      id: `wfchain:${O.id}->${p.id}`,
      sourceId: O.id,
      targetId: p.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: p.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), ri = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: q(p.id), targetId: q(p.targetApiId) })).filter(
        (p) => _.has(p.sourceId) && _.has(p.targetId) && p.sourceId !== p.targetId
      ).map((p) => [
        `pxt:${p.sourceId}->${p.targetId}`,
        {
          id: `pxt:${p.sourceId}->${p.targetId}`,
          sourceId: p.sourceId,
          targetId: p.targetId,
          kind: "proxy-target",
          color: "#0e7490",
          dashed: !0,
          arrow: !0,
          tooltip: "proxy/cache de"
        }
      ])
    ).values()
  ], bt = k.flatMap((p) => {
    const O = ut(p.apiId, p.moduleId);
    if (!_.has(O)) return [];
    const F = [];
    for (const X of (e.proxyApis ?? []).filter((Y) => Y.targetApiId === p.apiId)) {
      const Y = q(X.id);
      _.has(Y) && Y !== O && F.push({
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
  }), di = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const O = (e.proxyApis ?? []).find((Y) => Y.id === p.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const F = pt(p.operationId, p.proxyId), X = p.targetSiteId === O.targetApiId ? O.targetApiId : ut(O.targetApiId, p.targetSiteId);
    return !_.has(F) || !_.has(X) ? [] : [{
      id: `oproute:${F}->${X}`,
      sourceId: F,
      targetId: X,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), In = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!_.has(p.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (ue) => ue.operations.some((De) => De.id === p.operationId)
        );
        if (!O) return null;
        const F = p.siteId === O.id, X = F ? p.operationId : pt(p.operationId, p.siteId);
        let Y = _.has(X) ? X : null;
        if (!Y)
          if (F || (e.proxyApis ?? []).some((ue) => ue.id === p.siteId))
            Y = q(p.siteId);
          else {
            const ue = ut(O.id, p.siteId);
            Y = _.has(ue) ? ue : p.siteId;
          }
        return !Y || !_.has(Y) || Y === p.externalSystemId ? null : { u: p, target: Y };
      }).filter((p) => p !== null).map((p) => [
        `extopuse:${p.u.externalSystemId}->${p.u.operationId}@${p.u.siteId}`,
        {
          id: `extopuse:${p.u.externalSystemId}->${p.u.operationId}@${p.u.siteId}`,
          sourceId: p.u.externalSystemId,
          targetId: p.target,
          kind: "ext-op-use",
          color: "#64748b",
          label: "op",
          dashed: !0,
          arrow: !0,
          tooltip: "llama a esta operación"
        }
      ])
    ).values()
  ], yn = l ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!_.has(p.useCaseId)) return [];
    const O = _.has(pt(p.operationId, p.moduleId)) ? pt(p.operationId, p.moduleId) : _.has(ut(p.apiId, p.moduleId)) ? ut(p.apiId, p.moduleId) : _.has(q(p.moduleId)) ? q(p.moduleId) : null;
    return O ? [{
      id: `apiimplwire:${p.operationId}@${p.moduleId}`,
      sourceId: O,
      targetId: p.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], vn = l ? (e.agentUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], wn = (e.agentRags ?? []).filter((p) => _.has(p.agentId) && _.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), bn = l ? (e.rags ?? []).filter((p) => _.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((O) => _.has(O)).map((O) => ({
      id: `ragsrc:${p.id}->${O}`,
      sourceId: p.id,
      targetId: O,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], xn = l ? (e.agentExternalUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], kn = l ? (e.agentMcpUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], _n = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((O) => _.has(p.id) && _.has(O)).map((O) => ({
      id: `gwx:${p.id}->${O}`,
      sourceId: p.id,
      targetId: O,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), $n = (e.agentGatewayUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), En = l ? (e.agentApiOpUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Sn = l ? (e.agentQueryUses ?? []).filter((p) => _.has(p.agentId) && _.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Cn = (e.agentDelegations ?? []).filter((p) => _.has(p.agentId) && _.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), An = (e.actorAgentUses ?? []).filter((p) => _.has(p.actorId) && _.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Mn = l ? (e.agentTriggers ?? []).filter((p) => _.has(p.eventId) && _.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Pn = l ? (e.externalCalls ?? []).filter((p) => _.has(p.externalSystemId) && _.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Tn = l ? (e.externalUseCaseCalls ?? []).filter((p) => _.has(p.sourceId) && _.has(p.targetId)).map((p) => ({
    id: `extuccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [];
  return {
    nodes: w,
    edges: [
      ...B,
      ...R,
      ...N,
      ...ie,
      ...ee,
      ...y,
      ...A,
      ...x,
      ...v,
      ...Ue,
      ..._e,
      ...W,
      ...S,
      ...E,
      ...T,
      ...M,
      ...j,
      ...ri,
      ...bt,
      ...di,
      ...In,
      ...yn,
      ...H,
      ...de,
      ...et,
      ...Le,
      ...Q,
      ...$e,
      ...Me,
      ...vn,
      ...xn,
      ...kn,
      ..._n,
      ...$n,
      ...En,
      ...Sn,
      ...Cn,
      ...An,
      ...Mn,
      ...wn,
      ...bn,
      ...P,
      ...Pn,
      ...Tn
    ]
  };
}
const Wn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Vn = 176, Hn = 60, Gn = 140, jn = 40;
function Yn(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((o, a) => {
    const n = 220 + a * 340;
    i.filter((u) => u.moduleId === o.id).forEach((u, l) => {
      const g = s.filter((h) => h.aggregateId === u.id).length, I = 140 + l * (170 + g * 60);
      t[u.id] = { x: n, y: I }, s.filter((h) => h.aggregateId === u.id).forEach((h, f) => {
        t[h.id] = { x: n + 60, y: I + 100 + f * 60 };
      });
    });
  }), i.filter((o) => !e.modules.some((a) => a.id === o.moduleId)).forEach((o, a) => {
    t[o.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function Kn(e, t) {
  const i = Yn(e), s = (l) => t[l] ?? i[l] ?? { x: 200, y: 200 }, o = new Map(e.modules.map((l) => [l.id, l])), a = (e.aggregates ?? []).map((l) => {
    const g = o.get(l.moduleId), I = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", h = s(l.id);
    return {
      id: l.id,
      label: l.name,
      x: h.x,
      y: h.y,
      w: Vn,
      h: Hn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Wn[I],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${l.name}${g ? ` — módulo ${g.name} (${I})` : ""}`
    };
  }), n = (e.entities ?? []).map((l) => {
    const g = s(l.id);
    return {
      id: l.id,
      label: l.name,
      x: g.x,
      y: g.y,
      w: Gn,
      h: jn,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${l.name} (dentro del agregado)`
    };
  }), r = (e.entities ?? []).map((l) => ({
    id: `contains:${l.aggregateId}->${l.id}`,
    sourceId: l.aggregateId,
    targetId: l.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), u = (e.aggregateReferences ?? []).map((l, g) => ({
    id: `aggref:${g}:${l.sourceAggregateId}->${l.targetAggregateId}`,
    sourceId: l.sourceAggregateId,
    targetId: l.targetAggregateId,
    kind: "aggregate-reference",
    label: l.label,
    color: "#475569",
    arrow: !0,
    tooltip: l.label ? `Referencia: ${l.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...a, ...n],
    edges: [...r, ...u]
  };
}
const Xn = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Qn = 150, Jn = 44, Zn = 190, ea = 56, ta = 160, ia = 48;
function sa(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function oa(e, t) {
  const i = e.flows, s = [], o = [], a = /* @__PURE__ */ new Set(), n = (r) => {
    var u, l;
    return ((l = (u = e.aggregates) == null ? void 0 : u.find((g) => g.id === r)) == null ? void 0 : l.name) ?? r ?? "?";
  };
  return i.forEach((r, u) => {
    const l = 120 + u * 130, g = Xn[r.archetype] ?? "#475569", I = r.triggerAggregateId ?? r.sourceId;
    if (!a.has(I)) {
      a.add(I);
      const m = t[I] ?? { x: 160, y: l };
      s.push({
        id: I,
        label: r.triggerAggregateId ? n(r.triggerAggregateId) : I,
        x: m.x,
        y: m.y,
        w: Qn,
        h: Jn,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const h = `flow:${r.id}`, f = t[h] ?? { x: 470, y: l };
    s.push({
      id: h,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Zn,
      h: ea,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const d = sa(e, r), c = `tgt:${d.id}`;
    if (!a.has(c)) {
      a.add(c);
      const m = t[c] ?? { x: 790, y: l };
      s.push({
        id: c,
        label: d.label,
        x: m.x,
        y: m.y,
        w: ta,
        h: ia,
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
      targetId: h,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${r.id}:out`,
      sourceId: h,
      targetId: c,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: o };
}
const na = 190, aa = 56, Ji = 170, ra = 52;
function qs(e, t) {
  const i = [], s = [], o = (a) => {
    var n;
    return (n = e.modules.find((r) => r.id === a)) == null ? void 0 : n.name;
  };
  return (e.processes ?? []).forEach((a, n) => {
    const r = 140 + n * 240, u = t[a.id] ?? { x: 150, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: u.x,
      y: u.y,
      w: na,
      h: aa,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerModuleId) ? ` — módulo ${o(a.ownerModuleId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let l = a.id;
    if (a.steps.forEach((g, I) => {
      const h = g.type === "HUMAN", f = t[g.id] ?? { x: 150 + (I + 1) * 240, y: r };
      if (i.push({
        id: g.id,
        label: g.name,
        x: f.x,
        y: f.y,
        w: Ji,
        h: ra,
        kind: "process-step",
        symbol: h ? "person" : "gear",
        fill: h ? "#fef3c7" : "#ffffff",
        stroke: h ? "#d97706" : "#64748b",
        badge: h ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), s.push({
        id: `pe:${a.id}:${I}`,
        sourceId: l,
        targetId: g.id,
        kind: "process-seq",
        label: I === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const d = `comp:${g.id}`, c = t[d] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: d,
          label: g.compensationUseCaseId,
          x: c.x,
          y: c.y,
          w: Ji,
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
      l = g.id;
    }), a.onCompletionEventName) {
      const g = `done:${a.id}`, I = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: r };
      i.push({
        id: g,
        label: a.onCompletionEventName,
        x: I.x,
        y: I.y,
        w: Ji,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${a.id}`,
        sourceId: l,
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
const $i = globalThis, xs = $i.ShadowRoot && ($i.ShadyCSS === void 0 || $i.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ks = Symbol(), Fs = /* @__PURE__ */ new WeakMap();
let Uo = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== ks) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (xs && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = Fs.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Fs.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const da = (e) => new Uo(typeof e == "string" ? e : e + "", void 0, ks), vt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Uo(i, e, ks);
}, la = (e, t) => {
  if (xs) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = $i.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, Bs = xs ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return da(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ca, defineProperty: pa, getOwnPropertyDescriptor: ua, getOwnPropertyNames: ma, getOwnPropertySymbols: ha, getPrototypeOf: fa } = Object, nt = globalThis, Ws = nt.trustedTypes, ga = Ws ? Ws.emptyScript : "", Zi = nt.reactiveElementPolyfillSupport, jt = (e, t) => e, Ni = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ga : null;
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
} }, _s = (e, t) => !ca(e, t), Vs = { attribute: !0, type: String, converter: Ni, reflect: !1, useDefault: !1, hasChanged: _s };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), nt.litPropertyMetadata ?? (nt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $t = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Vs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && pa(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: a } = ua(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Vs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(jt("elementProperties"))) return;
    const t = fa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(jt("properties"))) {
      const i = this.properties, s = [...ma(i), ...ha(i)];
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
      for (const o of s) i.unshift(Bs(o));
    } else t !== void 0 && i.push(Bs(t));
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
    return la(t, this.constructor.elementStyles), t;
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
      const n = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : Ni).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, n;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), u = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((a = r.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? r.converter : Ni;
      this._$Em = o;
      const l = u.fromAttribute(i, r.type);
      this[o] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, a) {
    var n;
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (a = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? _s)(a, i) || s.useDefault && s.reflect && a === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
        const { wrapped: r } = n, u = this[a];
        r !== !0 || this._$AL.has(a) || u === void 0 || this.C(a, void 0, n, u);
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
$t.elementStyles = [], $t.shadowRootOptions = { mode: "open" }, $t[jt("elementProperties")] = /* @__PURE__ */ new Map(), $t[jt("finalized")] = /* @__PURE__ */ new Map(), Zi == null || Zi({ ReactiveElement: $t }), (nt.reactiveElementVersions ?? (nt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, Hs = (e) => e, Ri = Yt.trustedTypes, Gs = Ri ? Ri.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, zo = "$lit$", st = `lit$${Math.random().toFixed(9).slice(2)}$`, qo = "?" + st, Ia = `<${qo}>`, It = document, Qt = () => It.createComment(""), Jt = (e) => e === null || typeof e != "object" && typeof e != "function", $s = Array.isArray, ya = (e) => $s(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", es = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, js = /-->/g, Ys = />/g, dt = RegExp(`>|${es}(?:([^\\s"'>=/]+)(${es}*=${es}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ks = /'/g, Xs = /"/g, Fo = /^(?:script|style|textarea|title)$/i, Bo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), C = Bo(1), te = Bo(2), At = Symbol.for("lit-noChange"), oe = Symbol.for("lit-nothing"), Qs = /* @__PURE__ */ new WeakMap(), mt = It.createTreeWalker(It, 129);
function Wo(e, t) {
  if (!$s(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gs !== void 0 ? Gs.createHTML(t) : t;
}
const va = (e, t) => {
  const i = e.length - 1, s = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Ut;
  for (let r = 0; r < i; r++) {
    const u = e[r];
    let l, g, I = -1, h = 0;
    for (; h < u.length && (n.lastIndex = h, g = n.exec(u), g !== null); ) h = n.lastIndex, n === Ut ? g[1] === "!--" ? n = js : g[1] !== void 0 ? n = Ys : g[2] !== void 0 ? (Fo.test(g[2]) && (o = RegExp("</" + g[2], "g")), n = dt) : g[3] !== void 0 && (n = dt) : n === dt ? g[0] === ">" ? (n = o ?? Ut, I = -1) : g[1] === void 0 ? I = -2 : (I = n.lastIndex - g[2].length, l = g[1], n = g[3] === void 0 ? dt : g[3] === '"' ? Xs : Ks) : n === Xs || n === Ks ? n = dt : n === js || n === Ys ? n = Ut : (n = dt, o = void 0);
    const f = n === dt && e[r + 1].startsWith("/>") ? " " : "";
    a += n === Ut ? u + Ia : I >= 0 ? (s.push(l), u.slice(0, I) + zo + u.slice(I) + st + f) : u + st + (I === -2 ? r : f);
  }
  return [Wo(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Zt {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const r = t.length - 1, u = this.parts, [l, g] = va(t, i);
    if (this.el = Zt.createElement(l, s), mt.currentNode = this.el.content, i === 2 || i === 3) {
      const I = this.el.content.firstChild;
      I.replaceWith(...I.childNodes);
    }
    for (; (o = mt.nextNode()) !== null && u.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const I of o.getAttributeNames()) if (I.endsWith(zo)) {
          const h = g[n++], f = o.getAttribute(I).split(st), d = /([.?@])?(.*)/.exec(h);
          u.push({ type: 1, index: a, name: d[2], strings: f, ctor: d[1] === "." ? ba : d[1] === "?" ? xa : d[1] === "@" ? ka : Wi }), o.removeAttribute(I);
        } else I.startsWith(st) && (u.push({ type: 6, index: a }), o.removeAttribute(I));
        if (Fo.test(o.tagName)) {
          const I = o.textContent.split(st), h = I.length - 1;
          if (h > 0) {
            o.textContent = Ri ? Ri.emptyScript : "";
            for (let f = 0; f < h; f++) o.append(I[f], Qt()), mt.nextNode(), u.push({ type: 2, index: ++a });
            o.append(I[h], Qt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === qo) u.push({ type: 2, index: a });
      else {
        let I = -1;
        for (; (I = o.data.indexOf(st, I + 1)) !== -1; ) u.push({ type: 7, index: a }), I += st.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const s = It.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Mt(e, t, i = e, s) {
  var n, r;
  if (t === At) return t;
  let o = s !== void 0 ? (n = i._$Co) == null ? void 0 : n[s] : i._$Cl;
  const a = Jt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (t = Mt(e, o._$AS(e, t.values), o, s)), t;
}
class wa {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? It).importNode(i, !0);
    mt.currentNode = o;
    let a = mt.nextNode(), n = 0, r = 0, u = s[0];
    for (; u !== void 0; ) {
      if (n === u.index) {
        let l;
        u.type === 2 ? l = new oi(a, a.nextSibling, this, t) : u.type === 1 ? l = new u.ctor(a, u.name, u.strings, this, t) : u.type === 6 && (l = new _a(a, this, t)), this._$AV.push(l), u = s[++r];
      }
      n !== (u == null ? void 0 : u.index) && (a = mt.nextNode(), n++);
    }
    return mt.currentNode = It, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class oi {
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
    t = Mt(this, t, i), Jt(t) ? t === oe || t == null || t === "" ? (this._$AH !== oe && this._$AR(), this._$AH = oe) : t !== this._$AH && t !== At && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ya(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== oe && Jt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(It.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Zt.createElement(Wo(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const n = new wa(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = Qs.get(t.strings);
    return i === void 0 && Qs.set(t.strings, i = new Zt(t)), i;
  }
  k(t) {
    $s(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const a of t) o === i.length ? i.push(s = new oi(this.O(Qt()), this.O(Qt()), this, this.options)) : s = i[o], s._$AI(a), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = Hs(t).nextSibling;
      Hs(t).remove(), t = o;
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
  constructor(t, i, s, o, a) {
    this.type = 1, this._$AH = oe, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = oe;
  }
  _$AI(t, i = this, s, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = Mt(this, t, i, 0), n = !Jt(t) || t !== this._$AH && t !== At, n && (this._$AH = t);
    else {
      const r = t;
      let u, l;
      for (t = a[0], u = 0; u < a.length - 1; u++) l = Mt(this, r[s + u], i, u), l === At && (l = this._$AH[u]), n || (n = !Jt(l) || l !== this._$AH[u]), l === oe ? t = oe : t !== oe && (t += (l ?? "") + a[u + 1]), this._$AH[u] = l;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === oe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ba extends Wi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === oe ? void 0 : t;
  }
}
class xa extends Wi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== oe);
  }
}
class ka extends Wi {
  constructor(t, i, s, o, a) {
    super(t, i, s, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Mt(this, t, i, 0) ?? oe) === At) return;
    const s = this._$AH, o = t === oe && s !== oe || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== oe && (s === oe || o);
    o && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _a {
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
const ts = Yt.litHtmlPolyfillSupport;
ts == null || ts(Zt, oi), (Yt.litHtmlVersions ?? (Yt.litHtmlVersions = [])).push("3.3.3");
const $a = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new oi(t.insertBefore(Qt(), a), a, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
class Fe extends $t {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $a(i, this.renderRoot, this.renderOptions);
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
var Po;
Fe._$litElement$ = !0, Fe.finalized = !0, (Po = ft.litElementHydrateSupport) == null || Po.call(ft, { LitElement: Fe });
const is = ft.litElementPolyfillSupport;
is == null || is({ LitElement: Fe });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
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
const Ea = { attribute: !0, type: String, converter: Ni, reflect: !1, hasChanged: _s }, Sa = (e = Ea, t, i) => {
  const { kind: s, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), s === "accessor") {
    const { name: n } = i;
    return { set(r) {
      const u = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(n, u, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(r) {
      const u = this[n];
      t.call(this, r), this.requestUpdate(n, u, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ae(e) {
  return (t, i) => typeof i == "object" ? Sa(e, t, i) : ((s, o, a) => {
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
  return ae({ ...e, state: !0, attribute: !1 });
}
var ps = "http://www.w3.org/1999/xhtml";
const Js = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ps,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Js.hasOwnProperty(t) ? { space: Js[t], local: e } : e;
}
function Ca(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === ps && t.documentElement.namespaceURI === ps ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Aa(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Vo(e) {
  var t = Vi(e);
  return (t.local ? Aa : Ca)(t);
}
function Ma() {
}
function Es(e) {
  return e == null ? Ma : function() {
    return this.querySelector(e);
  };
}
function Pa(e) {
  typeof e != "function" && (e = Es(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = new Array(n), u, l, g = 0; g < n; ++g)
      (u = a[g]) && (l = e.call(u, u.__data__, g, a)) && ("__data__" in u && (l.__data__ = u.__data__), r[g] = l);
  return new Ne(s, this._parents);
}
function Ta(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Oa() {
  return [];
}
function Ho(e) {
  return e == null ? Oa : function() {
    return this.querySelectorAll(e);
  };
}
function Na(e) {
  return function() {
    return Ta(e.apply(this, arguments));
  };
}
function Ra(e) {
  typeof e == "function" ? e = Na(e) : e = Ho(e);
  for (var t = this._groups, i = t.length, s = [], o = [], a = 0; a < i; ++a)
    for (var n = t[a], r = n.length, u, l = 0; l < r; ++l)
      (u = n[l]) && (s.push(e.call(u, u.__data__, l, n)), o.push(u));
  return new Ne(s, o);
}
function Go(e) {
  return function() {
    return this.matches(e);
  };
}
function jo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var La = Array.prototype.find;
function Da(e) {
  return function() {
    return La.call(this.children, e);
  };
}
function Ua() {
  return this.firstElementChild;
}
function za(e) {
  return this.select(e == null ? Ua : Da(typeof e == "function" ? e : jo(e)));
}
var qa = Array.prototype.filter;
function Fa() {
  return Array.from(this.children);
}
function Ba(e) {
  return function() {
    return qa.call(this.children, e);
  };
}
function Wa(e) {
  return this.selectAll(e == null ? Fa : Ba(typeof e == "function" ? e : jo(e)));
}
function Va(e) {
  typeof e != "function" && (e = Go(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], u, l = 0; l < n; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && r.push(u);
  return new Ne(s, this._parents);
}
function Yo(e) {
  return new Array(e.length);
}
function Ha() {
  return new Ne(this._enter || this._groups.map(Yo), this._parents);
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
function Ga(e) {
  return function() {
    return e;
  };
}
function ja(e, t, i, s, o, a) {
  for (var n = 0, r, u = t.length, l = a.length; n < l; ++n)
    (r = t[n]) ? (r.__data__ = a[n], s[n] = r) : i[n] = new Li(e, a[n]);
  for (; n < u; ++n)
    (r = t[n]) && (o[n] = r);
}
function Ya(e, t, i, s, o, a, n) {
  var r, u, l = /* @__PURE__ */ new Map(), g = t.length, I = a.length, h = new Array(g), f;
  for (r = 0; r < g; ++r)
    (u = t[r]) && (h[r] = f = n.call(u, u.__data__, r, t) + "", l.has(f) ? o[r] = u : l.set(f, u));
  for (r = 0; r < I; ++r)
    f = n.call(e, a[r], r, a) + "", (u = l.get(f)) ? (s[r] = u, u.__data__ = a[r], l.delete(f)) : i[r] = new Li(e, a[r]);
  for (r = 0; r < g; ++r)
    (u = t[r]) && l.get(h[r]) === u && (o[r] = u);
}
function Ka(e) {
  return e.__data__;
}
function Xa(e, t) {
  if (!arguments.length) return Array.from(this, Ka);
  var i = t ? Ya : ja, s = this._parents, o = this._groups;
  typeof e != "function" && (e = Ga(e));
  for (var a = o.length, n = new Array(a), r = new Array(a), u = new Array(a), l = 0; l < a; ++l) {
    var g = s[l], I = o[l], h = I.length, f = Qa(e.call(g, g && g.__data__, l, s)), d = f.length, c = r[l] = new Array(d), m = n[l] = new Array(d), w = u[l] = new Array(h);
    i(g, I, c, m, w, f, t);
    for (var $ = 0, b = 0, P, R; $ < d; ++$)
      if (P = c[$]) {
        for ($ >= b && (b = $ + 1); !(R = m[b]) && ++b < d; ) ;
        P._next = R || null;
      }
  }
  return n = new Ne(n, s), n._enter = r, n._exit = u, n;
}
function Qa(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ja() {
  return new Ne(this._exit || this._groups.map(Yo), this._parents);
}
function Za(e, t, i) {
  var s = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), s && o ? s.merge(o).order() : o;
}
function er(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, o = i.length, a = s.length, n = Math.min(o, a), r = new Array(o), u = 0; u < n; ++u)
    for (var l = i[u], g = s[u], I = l.length, h = r[u] = new Array(I), f, d = 0; d < I; ++d)
      (f = l[d] || g[d]) && (h[d] = f);
  for (; u < o; ++u)
    r[u] = i[u];
  return new Ne(r, this._parents);
}
function tr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], o = s.length - 1, a = s[o], n; --o >= 0; )
      (n = s[o]) && (a && n.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(n, a), a = n);
  return this;
}
function ir(e) {
  e || (e = sr);
  function t(I, h) {
    return I && h ? e(I.__data__, h.__data__) : !I - !h;
  }
  for (var i = this._groups, s = i.length, o = new Array(s), a = 0; a < s; ++a) {
    for (var n = i[a], r = n.length, u = o[a] = new Array(r), l, g = 0; g < r; ++g)
      (l = n[g]) && (u[g] = l);
    u.sort(t);
  }
  return new Ne(o, this._parents).order();
}
function sr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function or() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function nr() {
  return Array.from(this);
}
function ar() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], o = 0, a = s.length; o < a; ++o) {
      var n = s[o];
      if (n) return n;
    }
  return null;
}
function rr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function dr() {
  return !this.node();
}
function lr(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var o = t[i], a = 0, n = o.length, r; a < n; ++a)
      (r = o[a]) && e.call(r, r.__data__, a, o);
  return this;
}
function cr(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ur(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function mr(e, t) {
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
function fr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function gr(e, t) {
  var i = Vi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? pr : cr : typeof t == "function" ? i.local ? fr : hr : i.local ? mr : ur)(i, t));
}
function Ko(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ir(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function yr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function vr(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function wr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ir : typeof t == "function" ? vr : yr)(e, t, i ?? "")) : Pt(this.node(), e);
}
function Pt(e, t) {
  return e.style.getPropertyValue(t) || Ko(e).getComputedStyle(e, null).getPropertyValue(t);
}
function br(e) {
  return function() {
    delete this[e];
  };
}
function xr(e, t) {
  return function() {
    this[e] = t;
  };
}
function kr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function _r(e, t) {
  return arguments.length > 1 ? this.each((t == null ? br : typeof t == "function" ? kr : xr)(e, t)) : this.node()[e];
}
function Xo(e) {
  return e.trim().split(/^|\s+/);
}
function Ss(e) {
  return e.classList || new Qo(e);
}
function Qo(e) {
  this._node = e, this._names = Xo(e.getAttribute("class") || "");
}
Qo.prototype = {
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
function Jo(e, t) {
  for (var i = Ss(e), s = -1, o = t.length; ++s < o; ) i.add(t[s]);
}
function Zo(e, t) {
  for (var i = Ss(e), s = -1, o = t.length; ++s < o; ) i.remove(t[s]);
}
function $r(e) {
  return function() {
    Jo(this, e);
  };
}
function Er(e) {
  return function() {
    Zo(this, e);
  };
}
function Sr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Jo : Zo)(this, e);
  };
}
function Cr(e, t) {
  var i = Xo(e + "");
  if (arguments.length < 2) {
    for (var s = Ss(this.node()), o = -1, a = i.length; ++o < a; ) if (!s.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Sr : t ? $r : Er)(i, t));
}
function Ar() {
  this.textContent = "";
}
function Mr(e) {
  return function() {
    this.textContent = e;
  };
}
function Pr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Tr(e) {
  return arguments.length ? this.each(e == null ? Ar : (typeof e == "function" ? Pr : Mr)(e)) : this.node().textContent;
}
function Or() {
  this.innerHTML = "";
}
function Nr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Rr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Lr(e) {
  return arguments.length ? this.each(e == null ? Or : (typeof e == "function" ? Rr : Nr)(e)) : this.node().innerHTML;
}
function Dr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ur() {
  return this.each(Dr);
}
function zr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function qr() {
  return this.each(zr);
}
function Fr(e) {
  var t = typeof e == "function" ? e : Vo(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Br() {
  return null;
}
function Wr(e, t) {
  var i = typeof e == "function" ? e : Vo(e), s = t == null ? Br : typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Vr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Hr() {
  return this.each(Vr);
}
function Gr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function jr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Yr(e) {
  return this.select(e ? jr : Gr);
}
function Kr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Xr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Qr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Jr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++s] = a;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Zr(e, t, i) {
  return function() {
    var s = this.__on, o, a = Xr(t);
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
function ed(e, t, i) {
  var s = Qr(e + ""), o, a = s.length, n;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var u = 0, l = r.length, g; u < l; ++u)
        for (o = 0, g = r[u]; o < a; ++o)
          if ((n = s[o]).type === g.type && n.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Zr : Jr, o = 0; o < a; ++o) this.each(r(s[o], t, i));
  return this;
}
function en(e, t, i) {
  var s = Ko(e), o = s.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = s.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function td(e, t) {
  return function() {
    return en(this, e, t);
  };
}
function id(e, t) {
  return function() {
    return en(this, e, t.apply(this, arguments));
  };
}
function sd(e, t) {
  return this.each((typeof t == "function" ? id : td)(e, t));
}
function* od() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], o = 0, a = s.length, n; o < a; ++o)
      (n = s[o]) && (yield n);
}
var tn = [null];
function Ne(e, t) {
  this._groups = e, this._parents = t;
}
function ni() {
  return new Ne([[document.documentElement]], tn);
}
function nd() {
  return this;
}
Ne.prototype = ni.prototype = {
  constructor: Ne,
  select: Pa,
  selectAll: Ra,
  selectChild: za,
  selectChildren: Wa,
  filter: Va,
  data: Xa,
  enter: Ha,
  exit: Ja,
  join: Za,
  merge: er,
  selection: nd,
  order: tr,
  sort: ir,
  call: or,
  nodes: nr,
  node: ar,
  size: rr,
  empty: dr,
  each: lr,
  attr: gr,
  style: wr,
  property: _r,
  classed: Cr,
  text: Tr,
  html: Lr,
  raise: Ur,
  lower: qr,
  append: Fr,
  insert: Wr,
  remove: Hr,
  clone: Yr,
  datum: Kr,
  on: ed,
  dispatch: sd,
  [Symbol.iterator]: od
};
function ze(e) {
  return typeof e == "string" ? new Ne([[document.querySelector(e)]], [document.documentElement]) : new Ne([[e]], tn);
}
function ad(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function lt(e, t) {
  if (e = ad(e), t === void 0 && (t = e.currentTarget), t) {
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
var rd = { value: () => {
} };
function Cs() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new Ei(i);
}
function Ei(e) {
  this._ = e;
}
function dd(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", o = i.indexOf(".");
    if (o >= 0 && (s = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
Ei.prototype = Cs.prototype = {
  constructor: Ei,
  on: function(e, t) {
    var i = this._, s = dd(e + "", i), o, a = -1, n = s.length;
    if (arguments.length < 2) {
      for (; ++a < n; ) if ((o = (e = s[a]).type) && (o = ld(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < n; )
      if (o = (e = s[a]).type) i[o] = Zs(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = Zs(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new Ei(e);
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
function ld(e, t) {
  for (var i = 0, s = e.length, o; i < s; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function Zs(e, t, i) {
  for (var s = 0, o = e.length; s < o; ++s)
    if (e[s].name === t) {
      e[s] = rd, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const us = { capture: !0, passive: !1 };
function ms(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function cd(e) {
  var t = e.document.documentElement, i = ze(e).on("dragstart.drag", ms, us);
  "onselectstart" in t ? i.on("selectstart.drag", ms, us) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function pd(e, t) {
  var i = e.document.documentElement, s = ze(e).on("dragstart.drag", null);
  t && (s.on("click.drag", ms, us), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function As(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function sn(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function ai() {
}
var ei = 0.7, Di = 1 / ei, Ct = "\\s*([+-]?\\d+)\\s*", ti = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ud = /^#([0-9a-f]{3,8})$/, md = new RegExp(`^rgb\\(${Ct},${Ct},${Ct}\\)$`), hd = new RegExp(`^rgb\\(${Ge},${Ge},${Ge}\\)$`), fd = new RegExp(`^rgba\\(${Ct},${Ct},${Ct},${ti}\\)$`), gd = new RegExp(`^rgba\\(${Ge},${Ge},${Ge},${ti}\\)$`), Id = new RegExp(`^hsl\\(${ti},${Ge},${Ge}\\)$`), yd = new RegExp(`^hsla\\(${ti},${Ge},${Ge},${ti}\\)$`), eo = {
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
As(ai, ii, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: to,
  // Deprecated! Use color.formatHex.
  formatHex: to,
  formatHex8: vd,
  formatHsl: wd,
  formatRgb: io,
  toString: io
});
function to() {
  return this.rgb().formatHex();
}
function vd() {
  return this.rgb().formatHex8();
}
function wd() {
  return on(this).formatHsl();
}
function io() {
  return this.rgb().formatRgb();
}
function ii(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = ud.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? so(t) : i === 3 ? new Te(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ui(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ui(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = md.exec(e)) ? new Te(t[1], t[2], t[3], 1) : (t = hd.exec(e)) ? new Te(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = fd.exec(e)) ? ui(t[1], t[2], t[3], t[4]) : (t = gd.exec(e)) ? ui(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Id.exec(e)) ? ao(t[1], t[2] / 100, t[3] / 100, 1) : (t = yd.exec(e)) ? ao(t[1], t[2] / 100, t[3] / 100, t[4]) : eo.hasOwnProperty(e) ? so(eo[e]) : e === "transparent" ? new Te(NaN, NaN, NaN, 0) : null;
}
function so(e) {
  return new Te(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ui(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new Te(e, t, i, s);
}
function bd(e) {
  return e instanceof ai || (e = ii(e)), e ? (e = e.rgb(), new Te(e.r, e.g, e.b, e.opacity)) : new Te();
}
function hs(e, t, i, s) {
  return arguments.length === 1 ? bd(e) : new Te(e, t, i, s ?? 1);
}
function Te(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
As(Te, hs, sn(ai, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ei : Math.pow(ei, e), new Te(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Te(gt(this.r), gt(this.g), gt(this.b), Ui(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: oo,
  // Deprecated! Use color.formatHex.
  formatHex: oo,
  formatHex8: xd,
  formatRgb: no,
  toString: no
}));
function oo() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}`;
}
function xd() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}${ht((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function no() {
  const e = Ui(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${gt(this.r)}, ${gt(this.g)}, ${gt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ui(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function gt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ht(e) {
  return e = gt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ao(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qe(e, t, i, s);
}
function on(e) {
  if (e instanceof qe) return new qe(e.h, e.s, e.l, e.opacity);
  if (e instanceof ai || (e = ii(e)), !e) return new qe();
  if (e instanceof qe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, o = Math.min(t, i, s), a = Math.max(t, i, s), n = NaN, r = a - o, u = (a + o) / 2;
  return r ? (t === a ? n = (i - s) / r + (i < s) * 6 : i === a ? n = (s - t) / r + 2 : n = (t - i) / r + 4, r /= u < 0.5 ? a + o : 2 - a - o, n *= 60) : r = u > 0 && u < 1 ? 0 : n, new qe(n, r, u, e.opacity);
}
function kd(e, t, i, s) {
  return arguments.length === 1 ? on(e) : new qe(e, t, i, s ?? 1);
}
function qe(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
As(qe, kd, sn(ai, {
  brighter(e) {
    return e = e == null ? Di : Math.pow(Di, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ei : Math.pow(ei, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - s;
    return new Te(
      ss(e >= 240 ? e - 240 : e + 120, o, s),
      ss(e, o, s),
      ss(e < 120 ? e + 240 : e - 120, o, s),
      this.opacity
    );
  },
  clamp() {
    return new qe(ro(this.h), mi(this.s), mi(this.l), Ui(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ui(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ro(this.h)}, ${mi(this.s) * 100}%, ${mi(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ro(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mi(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ss(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const nn = (e) => () => e;
function _d(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function $d(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Ed(e) {
  return (e = +e) == 1 ? an : function(t, i) {
    return i - t ? $d(t, i, e) : nn(isNaN(t) ? i : t);
  };
}
function an(e, t) {
  var i = t - e;
  return i ? _d(e, i) : nn(isNaN(e) ? t : e);
}
const lo = (function e(t) {
  var i = Ed(t);
  function s(o, a) {
    var n = i((o = hs(o)).r, (a = hs(a)).r), r = i(o.g, a.g), u = i(o.b, a.b), l = an(o.opacity, a.opacity);
    return function(g) {
      return o.r = n(g), o.g = r(g), o.b = u(g), o.opacity = l(g), o + "";
    };
  }
  return s.gamma = e, s;
})(1);
function it(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var fs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, os = new RegExp(fs.source, "g");
function Sd(e) {
  return function() {
    return e;
  };
}
function Cd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ad(e, t) {
  var i = fs.lastIndex = os.lastIndex = 0, s, o, a, n = -1, r = [], u = [];
  for (e = e + "", t = t + ""; (s = fs.exec(e)) && (o = os.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), r[n] ? r[n] += a : r[++n] = a), (s = s[0]) === (o = o[0]) ? r[n] ? r[n] += o : r[++n] = o : (r[++n] = null, u.push({ i: n, x: it(s, o) })), i = os.lastIndex;
  return i < t.length && (a = t.slice(i), r[n] ? r[n] += a : r[++n] = a), r.length < 2 ? u[0] ? Cd(u[0].x) : Sd(t) : (t = u.length, function(l) {
    for (var g = 0, I; g < t; ++g) r[(I = u[g]).i] = I.x(l);
    return r.join("");
  });
}
var co = 180 / Math.PI, gs = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function rn(e, t, i, s, o, a) {
  var n, r, u;
  return (n = Math.sqrt(e * e + t * t)) && (e /= n, t /= n), (u = e * i + t * s) && (i -= e * u, s -= t * u), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, u /= r), e * s < t * i && (e = -e, t = -t, u = -u, n = -n), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * co,
    skewX: Math.atan(u) * co,
    scaleX: n,
    scaleY: r
  };
}
var hi;
function Md(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? gs : rn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Pd(e) {
  return e == null || (hi || (hi = document.createElementNS("http://www.w3.org/2000/svg", "g")), hi.setAttribute("transform", e), !(e = hi.transform.baseVal.consolidate())) ? gs : (e = e.matrix, rn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function dn(e, t, i, s) {
  function o(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, g, I, h, f, d) {
    if (l !== I || g !== h) {
      var c = f.push("translate(", null, t, null, i);
      d.push({ i: c - 4, x: it(l, I) }, { i: c - 2, x: it(g, h) });
    } else (I || h) && f.push("translate(" + I + t + h + i);
  }
  function n(l, g, I, h) {
    l !== g ? (l - g > 180 ? g += 360 : g - l > 180 && (l += 360), h.push({ i: I.push(o(I) + "rotate(", null, s) - 2, x: it(l, g) })) : g && I.push(o(I) + "rotate(" + g + s);
  }
  function r(l, g, I, h) {
    l !== g ? h.push({ i: I.push(o(I) + "skewX(", null, s) - 2, x: it(l, g) }) : g && I.push(o(I) + "skewX(" + g + s);
  }
  function u(l, g, I, h, f, d) {
    if (l !== I || g !== h) {
      var c = f.push(o(f) + "scale(", null, ",", null, ")");
      d.push({ i: c - 4, x: it(l, I) }, { i: c - 2, x: it(g, h) });
    } else (I !== 1 || h !== 1) && f.push(o(f) + "scale(" + I + "," + h + ")");
  }
  return function(l, g) {
    var I = [], h = [];
    return l = e(l), g = e(g), a(l.translateX, l.translateY, g.translateX, g.translateY, I, h), n(l.rotate, g.rotate, I, h), r(l.skewX, g.skewX, I, h), u(l.scaleX, l.scaleY, g.scaleX, g.scaleY, I, h), l = g = null, function(f) {
      for (var d = -1, c = h.length, m; ++d < c; ) I[(m = h[d]).i] = m.x(f);
      return I.join("");
    };
  };
}
var Td = dn(Md, "px, ", "px)", "deg)"), Od = dn(Pd, ", ", ")", ")"), Nd = 1e-12;
function po(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Rd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ld(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Dd = (function e(t, i, s) {
  function o(a, n) {
    var r = a[0], u = a[1], l = a[2], g = n[0], I = n[1], h = n[2], f = g - r, d = I - u, c = f * f + d * d, m, w;
    if (c < Nd)
      w = Math.log(h / l) / t, m = function(D) {
        return [
          r + D * f,
          u + D * d,
          l * Math.exp(t * D * w)
        ];
      };
    else {
      var $ = Math.sqrt(c), b = (h * h - l * l + s * c) / (2 * l * i * $), P = (h * h - l * l - s * c) / (2 * h * i * $), R = Math.log(Math.sqrt(b * b + 1) - b), N = Math.log(Math.sqrt(P * P + 1) - P);
      w = (N - R) / t, m = function(D) {
        var V = D * w, k = po(R), _ = l / (i * $) * (k * Ld(t * V + R) - Rd(R));
        return [
          r + _ * f,
          u + _ * d,
          l * k / po(t * V + R)
        ];
      };
    }
    return m.duration = w * 1e3 * t / Math.SQRT2, m;
  }
  return o.rho = function(a) {
    var n = Math.max(1e-3, +a), r = n * n, u = r * r;
    return e(n, r, u);
  }, o;
})(Math.SQRT2, 2, 4);
var Tt = 0, Ht = 0, zt = 0, ln = 1e3, zi, Gt, qi = 0, yt = 0, Hi = 0, si = typeof performance == "object" && performance.now ? performance : Date, cn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ms() {
  return yt || (cn(Ud), yt = si.now() + Hi);
}
function Ud() {
  yt = 0;
}
function Fi() {
  this._call = this._time = this._next = null;
}
Fi.prototype = pn.prototype = {
  constructor: Fi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Ms() : +i) + (t == null ? 0 : +t), !this._next && Gt !== this && (Gt ? Gt._next = this : zi = this, Gt = this), this._call = e, this._time = i, Is();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Is());
  }
};
function pn(e, t, i) {
  var s = new Fi();
  return s.restart(e, t, i), s;
}
function zd() {
  Ms(), ++Tt;
  for (var e = zi, t; e; )
    (t = yt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Tt;
}
function uo() {
  yt = (qi = si.now()) + Hi, Tt = Ht = 0;
  try {
    zd();
  } finally {
    Tt = 0, Fd(), yt = 0;
  }
}
function qd() {
  var e = si.now(), t = e - qi;
  t > ln && (Hi -= t, qi = e);
}
function Fd() {
  for (var e, t = zi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : zi = i);
  Gt = e, Is(s);
}
function Is(e) {
  if (!Tt) {
    Ht && (Ht = clearTimeout(Ht));
    var t = e - yt;
    t > 24 ? (e < 1 / 0 && (Ht = setTimeout(uo, e - si.now() - Hi)), zt && (zt = clearInterval(zt))) : (zt || (qi = si.now(), zt = setInterval(qd, ln)), Tt = 1, cn(uo));
  }
}
function mo(e, t, i) {
  var s = new Fi();
  return t = t == null ? 0 : +t, s.restart((o) => {
    s.stop(), e(o + t);
  }, t, i), s;
}
var Bd = Cs("start", "end", "cancel", "interrupt"), Wd = [], un = 0, ho = 1, ys = 2, Si = 3, fo = 4, vs = 5, Ci = 6;
function Gi(e, t, i, s, o, a) {
  var n = e.__transition;
  if (!n) e.__transition = {};
  else if (i in n) return;
  Vd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: o,
    // For context during callback.
    on: Bd,
    tween: Wd,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: un
  });
}
function Ps(e, t) {
  var i = Be(e, t);
  if (i.state > un) throw new Error("too late; already scheduled");
  return i;
}
function je(e, t) {
  var i = Be(e, t);
  if (i.state > Si) throw new Error("too late; already running");
  return i;
}
function Be(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Vd(e, t, i) {
  var s = e.__transition, o;
  s[t] = i, i.timer = pn(a, 0, i.time);
  function a(l) {
    i.state = ho, i.timer.restart(n, i.delay, i.time), i.delay <= l && n(l - i.delay);
  }
  function n(l) {
    var g, I, h, f;
    if (i.state !== ho) return u();
    for (g in s)
      if (f = s[g], f.name === i.name) {
        if (f.state === Si) return mo(n);
        f.state === fo ? (f.state = Ci, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[g]) : +g < t && (f.state = Ci, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[g]);
      }
    if (mo(function() {
      i.state === Si && (i.state = fo, i.timer.restart(r, i.delay, i.time), r(l));
    }), i.state = ys, i.on.call("start", e, e.__data__, i.index, i.group), i.state === ys) {
      for (i.state = Si, o = new Array(h = i.tween.length), g = 0, I = -1; g < h; ++g)
        (f = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (o[++I] = f);
      o.length = I + 1;
    }
  }
  function r(l) {
    for (var g = l < i.duration ? i.ease.call(null, l / i.duration) : (i.timer.restart(u), i.state = vs, 1), I = -1, h = o.length; ++I < h; )
      o[I].call(e, g);
    i.state === vs && (i.on.call("end", e, e.__data__, i.index, i.group), u());
  }
  function u() {
    i.state = Ci, i.timer.stop(), delete s[t];
    for (var l in s) return;
    delete e.__transition;
  }
}
function Ai(e, t) {
  var i = e.__transition, s, o, a = !0, n;
  if (i) {
    t = t == null ? null : t + "";
    for (n in i) {
      if ((s = i[n]).name !== t) {
        a = !1;
        continue;
      }
      o = s.state > ys && s.state < vs, s.state = Ci, s.timer.stop(), s.on.call(o ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[n];
    }
    a && delete e.__transition;
  }
}
function Hd(e) {
  return this.each(function() {
    Ai(this, e);
  });
}
function Gd(e, t) {
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
function jd(e, t, i) {
  var s, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = je(this, e), n = a.tween;
    if (n !== s) {
      o = (s = n).slice();
      for (var r = { name: t, value: i }, u = 0, l = o.length; u < l; ++u)
        if (o[u].name === t) {
          o[u] = r;
          break;
        }
      u === l && o.push(r);
    }
    a.tween = o;
  };
}
function Yd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Be(this.node(), i).tween, o = 0, a = s.length, n; o < a; ++o)
      if ((n = s[o]).name === e)
        return n.value;
    return null;
  }
  return this.each((t == null ? Gd : jd)(i, e, t));
}
function Ts(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var o = je(this, s);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Be(o, s).value[t];
  };
}
function mn(e, t) {
  var i;
  return (typeof t == "number" ? it : t instanceof ii ? lo : (i = ii(t)) ? (t = i, lo) : Ad)(e, t);
}
function Kd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Xd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Qd(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = this.getAttribute(e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Jd(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = this.getAttributeNS(e.space, e.local);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Zd(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), u;
    return r == null ? void this.removeAttribute(e) : (n = this.getAttribute(e), u = r + "", n === u ? null : n === s && u === o ? a : (o = u, a = t(s = n, r)));
  };
}
function el(e, t, i) {
  var s, o, a;
  return function() {
    var n, r = i(this), u;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (n = this.getAttributeNS(e.space, e.local), u = r + "", n === u ? null : n === s && u === o ? a : (o = u, a = t(s = n, r)));
  };
}
function tl(e, t) {
  var i = Vi(e), s = i === "transform" ? Od : mn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? el : Zd)(i, s, Ts(this, "attr." + e, t)) : t == null ? (i.local ? Xd : Kd)(i) : (i.local ? Jd : Qd)(i, s, t));
}
function il(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function sl(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ol(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && sl(e, a)), i;
  }
  return o._value = t, o;
}
function nl(e, t) {
  var i, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (i = (s = a) && il(e, a)), i;
  }
  return o._value = t, o;
}
function al(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = Vi(e);
  return this.tween(i, (s.local ? ol : nl)(s, t));
}
function rl(e, t) {
  return function() {
    Ps(this, e).delay = +t.apply(this, arguments);
  };
}
function dl(e, t) {
  return t = +t, function() {
    Ps(this, e).delay = t;
  };
}
function ll(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? rl : dl)(t, e)) : Be(this.node(), t).delay;
}
function cl(e, t) {
  return function() {
    je(this, e).duration = +t.apply(this, arguments);
  };
}
function pl(e, t) {
  return t = +t, function() {
    je(this, e).duration = t;
  };
}
function ul(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? cl : pl)(t, e)) : Be(this.node(), t).duration;
}
function ml(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    je(this, e).ease = t;
  };
}
function hl(e) {
  var t = this._id;
  return arguments.length ? this.each(ml(t, e)) : Be(this.node(), t).ease;
}
function fl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    je(this, e).ease = i;
  };
}
function gl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(fl(this._id, e));
}
function Il(e) {
  typeof e != "function" && (e = Go(e));
  for (var t = this._groups, i = t.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], n = a.length, r = s[o] = [], u, l = 0; l < n; ++l)
      (u = a[l]) && e.call(u, u.__data__, l, a) && r.push(u);
  return new Ze(s, this._parents, this._name, this._id);
}
function yl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, o = i.length, a = Math.min(s, o), n = new Array(s), r = 0; r < a; ++r)
    for (var u = t[r], l = i[r], g = u.length, I = n[r] = new Array(g), h, f = 0; f < g; ++f)
      (h = u[f] || l[f]) && (I[f] = h);
  for (; r < s; ++r)
    n[r] = t[r];
  return new Ze(n, this._parents, this._name, this._id);
}
function vl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wl(e, t, i) {
  var s, o, a = vl(t) ? Ps : je;
  return function() {
    var n = a(this, e), r = n.on;
    r !== s && (o = (s = r).copy()).on(t, i), n.on = o;
  };
}
function bl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Be(this.node(), i).on.on(e) : this.each(wl(i, e, t));
}
function xl(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function kl() {
  return this.on("end.remove", xl(this._id));
}
function _l(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Es(e));
  for (var s = this._groups, o = s.length, a = new Array(o), n = 0; n < o; ++n)
    for (var r = s[n], u = r.length, l = a[n] = new Array(u), g, I, h = 0; h < u; ++h)
      (g = r[h]) && (I = e.call(g, g.__data__, h, r)) && ("__data__" in g && (I.__data__ = g.__data__), l[h] = I, Gi(l[h], t, i, h, l, Be(g, i)));
  return new Ze(a, this._parents, t, i);
}
function $l(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ho(e));
  for (var s = this._groups, o = s.length, a = [], n = [], r = 0; r < o; ++r)
    for (var u = s[r], l = u.length, g, I = 0; I < l; ++I)
      if (g = u[I]) {
        for (var h = e.call(g, g.__data__, I, u), f, d = Be(g, i), c = 0, m = h.length; c < m; ++c)
          (f = h[c]) && Gi(f, t, i, c, h, d);
        a.push(h), n.push(g);
      }
  return new Ze(a, n, t, i);
}
var El = ni.prototype.constructor;
function Sl() {
  return new El(this._groups, this._parents);
}
function Cl(e, t) {
  var i, s, o;
  return function() {
    var a = Pt(this, e), n = (this.style.removeProperty(e), Pt(this, e));
    return a === n ? null : a === i && n === s ? o : o = t(i = a, s = n);
  };
}
function hn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Al(e, t, i) {
  var s, o = i + "", a;
  return function() {
    var n = Pt(this, e);
    return n === o ? null : n === s ? a : a = t(s = n, i);
  };
}
function Ml(e, t, i) {
  var s, o, a;
  return function() {
    var n = Pt(this, e), r = i(this), u = r + "";
    return r == null && (u = r = (this.style.removeProperty(e), Pt(this, e))), n === u ? null : n === s && u === o ? a : (o = u, a = t(s = n, r));
  };
}
function Pl(e, t) {
  var i, s, o, a = "style." + t, n = "end." + a, r;
  return function() {
    var u = je(this, e), l = u.on, g = u.value[a] == null ? r || (r = hn(t)) : void 0;
    (l !== i || o !== g) && (s = (i = l).copy()).on(n, o = g), u.on = s;
  };
}
function Tl(e, t, i) {
  var s = (e += "") == "transform" ? Td : mn;
  return t == null ? this.styleTween(e, Cl(e, s)).on("end.style." + e, hn(e)) : typeof t == "function" ? this.styleTween(e, Ml(e, s, Ts(this, "style." + e, t))).each(Pl(this._id, e)) : this.styleTween(e, Al(e, s, t), i).on("end.style." + e, null);
}
function Ol(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Nl(e, t, i) {
  var s, o;
  function a() {
    var n = t.apply(this, arguments);
    return n !== o && (s = (o = n) && Ol(e, n, i)), s;
  }
  return a._value = t, a;
}
function Rl(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Nl(e, t, i ?? ""));
}
function Ll(e) {
  return function() {
    this.textContent = e;
  };
}
function Dl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ul(e) {
  return this.tween("text", typeof e == "function" ? Dl(Ts(this, "text", e)) : Ll(e == null ? "" : e + ""));
}
function zl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function ql(e) {
  var t, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && zl(o)), t;
  }
  return s._value = e, s;
}
function Fl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, ql(e));
}
function Bl() {
  for (var e = this._name, t = this._id, i = fn(), s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, u, l = 0; l < r; ++l)
      if (u = n[l]) {
        var g = Be(u, t);
        Gi(u, e, i, l, n, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ze(s, this._parents, e, i);
}
function Wl() {
  var e, t, i = this, s = i._id, o = i.size();
  return new Promise(function(a, n) {
    var r = { value: n }, u = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var l = je(this, s), g = l.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(u)), l.on = t;
    }), o === 0 && a();
  });
}
var Vl = 0;
function Ze(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function fn() {
  return ++Vl;
}
var Qe = ni.prototype;
Ze.prototype = {
  constructor: Ze,
  select: _l,
  selectAll: $l,
  selectChild: Qe.selectChild,
  selectChildren: Qe.selectChildren,
  filter: Il,
  merge: yl,
  selection: Sl,
  transition: Bl,
  call: Qe.call,
  nodes: Qe.nodes,
  node: Qe.node,
  size: Qe.size,
  empty: Qe.empty,
  each: Qe.each,
  on: bl,
  attr: tl,
  attrTween: al,
  style: Tl,
  styleTween: Rl,
  text: Ul,
  textTween: Fl,
  remove: kl,
  tween: Yd,
  delay: ll,
  duration: ul,
  ease: hl,
  easeVarying: gl,
  end: Wl,
  [Symbol.iterator]: Qe[Symbol.iterator]
};
function Hl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Gl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Hl
};
function jl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Yl(e) {
  var t, i;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = fn(), (i = Gl).time = Ms(), e = e == null ? null : e + "");
  for (var s = this._groups, o = s.length, a = 0; a < o; ++a)
    for (var n = s[a], r = n.length, u, l = 0; l < r; ++l)
      (u = n[l]) && Gi(u, e, t, l, n, i || jl(u, t));
  return new Ze(s, this._parents, e, t);
}
ni.prototype.interrupt = Hd;
ni.prototype.transition = Yl;
const fi = (e) => () => e;
function Kl(e, {
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
var Kt = new Je(1, 0, 0);
Je.prototype;
function ns(e) {
  e.stopImmediatePropagation();
}
function qt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ql() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function go() {
  return this.__zoom || Kt;
}
function Jl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Zl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ec(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], n = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o),
    n > a ? (a + n) / 2 : Math.min(0, a) || Math.max(0, n)
  );
}
function tc() {
  var e = Xl, t = Ql, i = ec, s = Jl, o = Zl, a = [0, 1 / 0], n = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, u = Dd, l = Cs("start", "zoom", "end"), g, I, h, f = 500, d = 150, c = 0, m = 10;
  function w(y) {
    y.property("__zoom", go).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", k).on("dblclick.zoom", _).filter(o).on("touchstart.zoom", B).on("touchmove.zoom", ie).on("touchend.zoom touchcancel.zoom", ee).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(y, A, v, x) {
    var S = y.selection ? y.selection() : y;
    S.property("__zoom", go), y !== S ? R(y, A, v, x) : S.interrupt().each(function() {
      N(this, arguments).event(x).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, w.scaleBy = function(y, A, v, x) {
    w.scaleTo(y, function() {
      var S = this.__zoom.k, E = typeof A == "function" ? A.apply(this, arguments) : A;
      return S * E;
    }, v, x);
  }, w.scaleTo = function(y, A, v, x) {
    w.transform(y, function() {
      var S = t.apply(this, arguments), E = this.__zoom, T = v == null ? P(S) : typeof v == "function" ? v.apply(this, arguments) : v, M = E.invert(T), L = typeof A == "function" ? A.apply(this, arguments) : A;
      return i(b($(E, L), T, M), S, n);
    }, v, x);
  }, w.translateBy = function(y, A, v, x) {
    w.transform(y, function() {
      return i(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), n);
    }, null, x);
  }, w.translateTo = function(y, A, v, x, S) {
    w.transform(y, function() {
      var E = t.apply(this, arguments), T = this.__zoom, M = x == null ? P(E) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Kt.translate(M[0], M[1]).scale(T.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), E, n);
    }, x, S);
  };
  function $(y, A) {
    return A = Math.max(a[0], Math.min(a[1], A)), A === y.k ? y : new Je(A, y.x, y.y);
  }
  function b(y, A, v) {
    var x = A[0] - v[0] * y.k, S = A[1] - v[1] * y.k;
    return x === y.x && S === y.y ? y : new Je(y.k, x, S);
  }
  function P(y) {
    return [(+y[0][0] + +y[1][0]) / 2, (+y[0][1] + +y[1][1]) / 2];
  }
  function R(y, A, v, x) {
    y.on("start.zoom", function() {
      N(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      N(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var S = this, E = arguments, T = N(S, E).event(x), M = t.apply(S, E), L = v == null ? P(M) : typeof v == "function" ? v.apply(S, E) : v, q = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), j = S.__zoom, ne = typeof A == "function" ? A.apply(S, E) : A, pe = u(j.invert(L).concat(q / j.k), ne.invert(L).concat(q / ne.k));
      return function(z) {
        if (z === 1) z = ne;
        else {
          var H = pe(z), de = q / H[2];
          z = new Je(de, L[0] - H[0] * de, L[1] - H[1] * de);
        }
        T.zoom(null, z);
      };
    });
  }
  function N(y, A, v) {
    return !v && y.__zooming || new D(y, A);
  }
  function D(y, A) {
    this.that = y, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(y, A), this.taps = 0;
  }
  D.prototype = {
    event: function(y) {
      return y && (this.sourceEvent = y), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(y, A) {
      return this.mouse && y !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && y !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && y !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(y) {
      var A = ze(this.that).datum();
      l.call(
        y,
        this.that,
        new Kl(y, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: l
        }),
        A
      );
    }
  };
  function V(y, ...A) {
    if (!e.apply(this, arguments)) return;
    var v = N(this, A).event(y), x = this.__zoom, S = Math.max(a[0], Math.min(a[1], x.k * Math.pow(2, s.apply(this, arguments)))), E = lt(y);
    if (v.wheel)
      (v.mouse[0][0] !== E[0] || v.mouse[0][1] !== E[1]) && (v.mouse[1] = x.invert(v.mouse[0] = E)), clearTimeout(v.wheel);
    else {
      if (x.k === S) return;
      v.mouse = [E, x.invert(E)], Ai(this), v.start();
    }
    qt(y), v.wheel = setTimeout(T, d), v.zoom("mouse", i(b($(x, S), v.mouse[0], v.mouse[1]), v.extent, n));
    function T() {
      v.wheel = null, v.end();
    }
  }
  function k(y, ...A) {
    if (h || !e.apply(this, arguments)) return;
    var v = y.currentTarget, x = N(this, A, !0).event(y), S = ze(y.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", q, !0), E = lt(y, v), T = y.clientX, M = y.clientY;
    cd(y.view), ns(y), x.mouse = [E, this.__zoom.invert(E)], Ai(this), x.start();
    function L(j) {
      if (qt(j), !x.moved) {
        var ne = j.clientX - T, pe = j.clientY - M;
        x.moved = ne * ne + pe * pe > c;
      }
      x.event(j).zoom("mouse", i(b(x.that.__zoom, x.mouse[0] = lt(j, v), x.mouse[1]), x.extent, n));
    }
    function q(j) {
      S.on("mousemove.zoom mouseup.zoom", null), pd(j.view, x.moved), qt(j), x.event(j).end();
    }
  }
  function _(y, ...A) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, x = lt(y.changedTouches ? y.changedTouches[0] : y, this), S = v.invert(x), E = v.k * (y.shiftKey ? 0.5 : 2), T = i(b($(v, E), x, S), t.apply(this, A), n);
      qt(y), r > 0 ? ze(this).transition().duration(r).call(R, T, x, y) : ze(this).call(w.transform, T, x, y);
    }
  }
  function B(y, ...A) {
    if (e.apply(this, arguments)) {
      var v = y.touches, x = v.length, S = N(this, A, y.changedTouches.length === x).event(y), E, T, M, L;
      for (ns(y), T = 0; T < x; ++T)
        M = v[T], L = lt(M, this), L = [L, this.__zoom.invert(L), M.identifier], S.touch0 ? !S.touch1 && S.touch0[2] !== L[2] && (S.touch1 = L, S.taps = 0) : (S.touch0 = L, E = !0, S.taps = 1 + !!g);
      g && (g = clearTimeout(g)), E && (S.taps < 2 && (I = L[0], g = setTimeout(function() {
        g = null;
      }, f)), Ai(this), S.start());
    }
  }
  function ie(y, ...A) {
    if (this.__zooming) {
      var v = N(this, A).event(y), x = y.changedTouches, S = x.length, E, T, M, L;
      for (qt(y), E = 0; E < S; ++E)
        T = x[E], M = lt(T, this), v.touch0 && v.touch0[2] === T.identifier ? v.touch0[0] = M : v.touch1 && v.touch1[2] === T.identifier && (v.touch1[0] = M);
      if (T = v.that.__zoom, v.touch1) {
        var q = v.touch0[0], j = v.touch0[1], ne = v.touch1[0], pe = v.touch1[1], z = (z = ne[0] - q[0]) * z + (z = ne[1] - q[1]) * z, H = (H = pe[0] - j[0]) * H + (H = pe[1] - j[1]) * H;
        T = $(T, Math.sqrt(z / H)), M = [(q[0] + ne[0]) / 2, (q[1] + ne[1]) / 2], L = [(j[0] + pe[0]) / 2, (j[1] + pe[1]) / 2];
      } else if (v.touch0) M = v.touch0[0], L = v.touch0[1];
      else return;
      v.zoom("touch", i(b(T, M, L), v.extent, n));
    }
  }
  function ee(y, ...A) {
    if (this.__zooming) {
      var v = N(this, A).event(y), x = y.changedTouches, S = x.length, E, T;
      for (ns(y), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, f), E = 0; E < S; ++E)
        T = x[E], v.touch0 && v.touch0[2] === T.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === T.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (T = lt(T, this), Math.hypot(I[0] - T[0], I[1] - T[1]) < m)) {
        var M = ze(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(y) {
    return arguments.length ? (s = typeof y == "function" ? y : fi(+y), w) : s;
  }, w.filter = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : fi(!!y), w) : e;
  }, w.touchable = function(y) {
    return arguments.length ? (o = typeof y == "function" ? y : fi(!!y), w) : o;
  }, w.extent = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : fi([[+y[0][0], +y[0][1]], [+y[1][0], +y[1][1]]]), w) : t;
  }, w.scaleExtent = function(y) {
    return arguments.length ? (a[0] = +y[0], a[1] = +y[1], w) : [a[0], a[1]];
  }, w.translateExtent = function(y) {
    return arguments.length ? (n[0][0] = +y[0][0], n[1][0] = +y[1][0], n[0][1] = +y[0][1], n[1][1] = +y[1][1], w) : [[n[0][0], n[0][1]], [n[1][0], n[1][1]]];
  }, w.constrain = function(y) {
    return arguments.length ? (i = y, w) : i;
  }, w.duration = function(y) {
    return arguments.length ? (r = +y, w) : r;
  }, w.interpolate = function(y) {
    return arguments.length ? (u = y, w) : u;
  }, w.on = function() {
    var y = l.on.apply(l, arguments);
    return y === l ? w : y;
  }, w.clickDistance = function(y) {
    return arguments.length ? (c = (y = +y) * y, w) : Math.sqrt(c);
  }, w.tapDistance = function(y) {
    return arguments.length ? (m = +y, w) : m;
  }, w;
}
var ic = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, ye = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? sc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && ic(t, i, o), o;
};
function oc(e, t, i, s) {
  const o = t.x - e.x, a = t.y - e.y, n = s.x - i.x, r = s.y - i.y, u = o * r - a * n;
  if (Math.abs(u) < 1e-9) return null;
  const l = ((i.x - e.x) * r - (i.y - e.y) * n) / u, g = ((i.x - e.x) * a - (i.y - e.y) * o) / u;
  return l <= 0.02 || l >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + l * o, y: e.y + l * a, t: l };
}
function nc(e, t, i) {
  const s = i.x - t.x, o = i.y - t.y, a = s * s + o * o || 1, n = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * o) / a)), r = t.x + n * s, u = t.y + n * o;
  return { dist: Math.hypot(e.x - r, e.y - u), t: n };
}
function ac(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], n = e[o + 1], r = Math.hypot(n.x - a.x, n.y - a.y) || 1, u = (n.x - a.x) / r, l = (n.y - a.y) / r, g = t.map(([h, f]) => oc(a, n, h, f)).filter((h) => h !== null).filter((h) => h.t * r > i + 2 && (1 - h.t) * r > i + 2).sort((h, f) => h.t - f.t);
    let I = -1 / 0;
    for (const h of g)
      h.t * r - i <= I + 2 || (s += ` L ${h.x - u * i} ${h.y - l * i}`, s += ` A ${i} ${i} 0 0 1 ${h.x + u * i} ${h.y + l * i}`, I = h.t * r + i);
    s += ` L ${n.x} ${n.y}`;
  }
  return s;
}
const Et = {
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
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Kt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = tc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ze(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, a = this.fitInsets.right ?? 0, n = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, u = Math.max(80, s.width - o - a), l = Math.max(80, s.height - n - r), g = Math.min(...t.map((m) => m.x - m.w / 2)) - e, I = Math.max(...t.map((m) => m.x + m.w / 2)) + e, h = Math.min(...t.map((m) => m.y - m.h / 2)) - e, f = Math.max(...t.map((m) => m.y + m.h / 2)) + e, d = Math.max(0.15, Math.min(u / (I - g), l / (f - h), 1.25)), c = Kt.translate(
      o + u / 2 - d * (g + I) / 2,
      n + l / 2 - d * (h + f) / 2
    ).scale(d);
    ze(i).call(this._zoomBehavior.transform, c);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(ze(t), e);
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
      const n = this.scene.nodes.find((u) => u.id === a);
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
        const o = this.nodePos(s), a = o.x - s.w / 2 + 10 + e.w / 2, n = o.x + s.w / 2 - 10 - e.w / 2, r = o.y - s.h / 2 + 34 + e.h / 2, u = o.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), n), i = Math.min(Math.max(i, r), u);
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
    ) : null, r = n ? new Map(n.map((m) => [m.id, this.nodePos(m)])) : null, u = (m) => (m.shiftKey || m.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !n, l = n ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = l !== null, I = l === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], h = () => {
      const m = [], w = l === "menu" ? this.scene.nodes.filter(($) => $.kind === "ui-app") : this.scene.nodes.filter(($) => $.id === t.parentId);
      for (const $ of w) {
        const b = this.scene.nodes.filter((D) => D.parentId === $.id && I.includes(D.kind ?? "") && D.id !== t.id).sort((D, V) => D.y - V.y), P = $.x - $.w / 2 + 10, R = $.x + $.w / 2 - 10;
        for (const D of b) m.push({ x1: P, x2: R, y: D.y - D.h / 2 - 3, appId: $.id, beforeId: D.id });
        const N = b[b.length - 1];
        m.push({
          x1: P,
          x2: R,
          y: N ? N.y + N.h / 2 + 3 : $.y - $.h / 2 + 34 + 8,
          appId: $.id,
          beforeId: null
        });
      }
      return m;
    }, f = (m) => {
      const w = this.nodeIdAt(m), $ = w && w !== t.id ? this.scene.nodes.find((b) => b.id === w) : void 0;
      return $ ? $.kind === "external-system" ? $.id : $.parentId ?? null : null;
    }, d = (m) => {
      if ((m.buttons & 1) === 0) {
        c(m);
        return;
      }
      const w = this.toScene(m), $ = w.x - i.x, b = w.y - i.y;
      if (!(!o && Math.hypot($, b) < 3 / this._t.k))
        if (o = !0, n && r) {
          const P = /* @__PURE__ */ new Map();
          for (const R of n) {
            const N = r.get(R.id), D = this.clampToParent(R, N.x + $, N.y + b);
            P.set(R.id, { x: D.x, y: D.y });
          }
          this._dragGroup = P;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + $, y: s.y + b }, this._menuSlots || (this._menuSlots = { slots: h(), active: null, nestRowId: null });
          const P = this.scene.nodes.filter(
            (N) => I.includes(N.kind ?? "") && N.id !== t.id && Math.abs(w.x - N.x) <= N.w / 2 + 8
          ), R = l === "menu" ? P.find((N) => Math.abs(w.y - N.y) < N.h * 0.28) : void 0;
          if (R)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: R.id }, this._hoverNodeId = R.id;
          else {
            let N = -1, D = 14;
            this._menuSlots.slots.forEach((V, k) => {
              if (w.x < V.x1 - 24 || w.x > V.x2 + 24) return;
              const _ = Math.abs(w.y - V.y);
              _ < D && (D = _, N = k);
            }), this._menuSlots = { ...this._menuSlots, active: N >= 0 ? N : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else u(m) ? (this._dragPos = { id: t.id, x: s.x + $, y: s.y + b }, this._hoverNodeId = f(m)) : (this._dragPos = this.clampToParent(t, s.x + $, s.y + b), this._hoverNodeId = null);
    }, c = (m) => {
      if (window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", c), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([w, $]) => ({ id: w, x: $.x, y: $.y }))
        });
      else if (o && this._dragPos && g) {
        const w = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const $ = l === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (w != null && w.nestRowId)
          this.emit($, { id: t.id, nestRowId: w.nestRowId });
        else if (w && w.active !== null) {
          const b = w.slots[w.active];
          this.emit($, { id: t.id, appId: b.appId, beforeId: b.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (u(m)) {
          const w = f(m);
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
    window.addEventListener("pointermove", d), window.addEventListener("pointerup", c);
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
    const o = 160, a = 90, n = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((c) => c.parentId === t.id), u = Math.min(...r.map((c) => c.x - c.w / 2)), l = Math.max(...r.map((c) => c.x + c.w / 2)), g = Math.min(...r.map((c) => c.y - c.h / 2)), I = Math.max(...r.map((c) => c.y + c.h / 2)), h = On(
      r.map((c) => ({ dx: c.x - n.x, dy: c.y - n.y, w: c.w, h: c.h })),
      { w: o, h: a }
    ), f = (c) => {
      if ((c.buttons & 1) === 0) {
        d();
        return;
      }
      const m = this.toScene(c);
      if (c.shiftKey) {
        this._resize = {
          id: t.id,
          x: n.x,
          y: n.y,
          w: Math.max(h.w, 2 * Math.abs(m.x - n.x)),
          h: Math.max(h.h, 2 * Math.abs(m.y - n.y))
        };
        return;
      }
      const w = n.x - i * n.w / 2, $ = n.y - s * n.h / 2, b = i > 0 ? Math.max(m.x, w + o, r.length ? l + 10 : -1 / 0) : Math.min(m.x, w - o, r.length ? u - 10 : 1 / 0), P = s > 0 ? Math.max(m.y, $ + a, r.length ? I + 10 : -1 / 0) : Math.min(m.y, $ - a, r.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (w + b) / 2,
        y: ($ + P) / 2,
        w: Math.abs(b - w),
        h: Math.abs(P - $)
      };
    }, d = () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", f), window.addEventListener("pointerup", d);
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
    const { x: s, y: o } = this.nodePos(e), a = t - s, n = i - o, r = e.w / 2, u = e.h / 2;
    if (a === 0 && n === 0) return { x: s, y: o };
    const l = 1 / Math.max(Math.abs(a) / r, Math.abs(n) / u);
    return { x: s + a * l, y: o + n * l };
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
    let u = this.borderPoint(t, n.x, n.y), l = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const I = Math.hypot(l.x - u.x, l.y - u.y) || 1, h = -(l.y - u.y) / I * g, f = (l.x - u.x) / I * g;
        u = { x: u.x + h, y: u.y + f }, l = { x: l.x + h, y: l.y + f };
      }
    }
    return [u, ...s, l];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const o = (n) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(n), u = [...this._wpDrag.points];
      u[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: u };
    }, a = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: o } = nc(t, e[s], e[s + 1]);
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
    const n = (u) => {
      if ((u.buttons & 1) === 0) {
        r();
        return;
      }
      const l = this.toScene(u);
      if (a) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = l, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(l.x - s.x, l.y - s.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, l), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
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
    }, u = t.slice(1, -1);
    return te`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${ac(t, i)}
              fill="none"
              stroke=${s} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? te`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${o ? u.map((l, g) => {
      var h;
      const I = ((h = this._selectedWaypoint) == null ? void 0 : h.edgeId) === e.id && this._selectedWaypoint.index === g;
      return te`
                <circle data-waypoint cx=${l.x} cy=${l.y} r=${I ? 6 : 5}
                        fill=${I ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(f) => {
        f.button === 0 && (f.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: g }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], g));
      }}
                        @dblclick=${(f) => {
        f.stopPropagation(), this.removeWaypoint(e, g);
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
    var h, f, d, c;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = !!e.container, n = !!e.parentId, r = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.w : e.w, u = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, l = r / 2, g = u / 2, I = n && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return te`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerdown=${(m) => this.onNodePointerDown(m, e)}
         @dblclick=${(m) => {
      m.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? te`<rect x=${-l - 4} y=${-g - 4} width=${r + 8} height=${u + 8}
                  rx=${n ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-l} y=${-g} width=${r} height=${u} rx=${n ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? te`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? te`<text x=${-l} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? te`<g transform="translate(${l - 13}, ${-g + 13})"
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
        ${e.symbol && Et[e.symbol] && !n ? te`<g transform="translate(${l - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Et[e.symbol]}
              </g>` : ""}
        ${n && e.symbol && Et[e.symbol] ? te`<g transform="translate(${-l + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Et[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? te`
              <foreignObject x=${-l + 6} y=${a ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(m) => m.stopPropagation()}
                  @keydown=${(m) => {
      m.stopPropagation(), m.key === "Enter" && this.commitRename(e, m.target.value), m.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(m) => this.commitRename(e, m.target.value)}
                />
              </foreignObject>` : n ? te`<text x=${-l + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${I}</text>` : a ? te`<text x=${-l + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : te`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${a ? te`<line x1=${-l + 8} y1=${-g + 28} x2=${l - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (n ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [l, 0],
      [-l, 0],
      [0, g],
      [0, -g]
    ].map(
      ([m, w]) => te`
                <circle data-handle cx=${m} cy=${w} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${($) => this.onHandlePointerDown($, e)}>
                  <title>${n ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((c = e.extraHandles) != null && c.length) ? e.extraHandles.map(
      (m, w) => te`
                <g transform="translate(${-l + 24 + w * 20}, ${-g})">
                  <circle data-handle r="7" fill=${m.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${($) => this.onHandlePointerDown($, e, m.kind)}>
                    <title>${m.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${a && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([m, w]) => te`
                <rect data-resize x=${m * l - 6.5} y=${w * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${m * w > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${($) => this.onResizePointerDown($, e, m, w)}>
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
        const { a: n, b: r } = this._rubber, u = Math.min(n.x, r.x), l = Math.max(n.x, r.x), g = Math.min(n.y, r.y), I = Math.max(n.y, r.y), h = this.scene.nodes.filter((f) => {
          const d = this.nodePos(f);
          return d.x >= u && d.x <= l && d.y >= g && d.y <= I;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: h });
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
    const s = this.getBoundingClientRect(), o = this._t.k, a = Kt.translate(s.width / 2 - o * e, s.height / 2 - o * t).scale(o);
    ze(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - s.left) / i, a = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return C``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, n = (0 - this._t.y) / this._t.k, r = o.width / this._t.k, u = o.height / this._t.k;
    return C`
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
      var g, I;
      (I = (g = l.currentTarget).hasPointerCapture) != null && I.call(g, l.pointerId) && this.onMinimapPointer(l, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((l) => {
      const g = this.nodePos(l);
      return te`<rect
              x=${(g.x - l.w / 2 - e.minX) * s}
              y=${(g.y - l.h / 2 - e.minY) * s}
              width=${Math.max(2, l.w * s)}
              height=${Math.max(2, l.h * s)}
              rx="1" fill=${l.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * s}
            y=${(n - e.minY) * s}
            width=${r * s}
            height=${u * s}
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
    }), C`
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
ge.styles = vt`
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
  ae({ attribute: !1 })
], ge.prototype, "scene", 2);
ye([
  ae({ attribute: !1 })
], ge.prototype, "selectedId", 2);
ye([
  ae({ attribute: !1 })
], ge.prototype, "selectedIds", 2);
ye([
  ae({ type: Boolean })
], ge.prototype, "connectable", 2);
ye([
  ae({ attribute: !1 })
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
  ae({ attribute: !1 })
], ge.prototype, "fitInsets", 2);
ge = ye([
  wt("modux-canvas")
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
const _t = (e) => e.trim().toLowerCase();
function rc(e, t) {
  var k, _, B, ie, ee;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((y) => [y.id, y.name])), o = e.modules.flatMap(
    (y) => (y.useCases ?? []).map((A) => ({ ...A, moduleId: y.id }))
  ), a = new Set(o.map((y) => y.id)), n = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((y) => (y.domainServices ?? []).map((A) => A.id))
  ), u = e.modules.flatMap(
    (y) => (y.domainEvents ?? []).map((A) => ({ ...A, moduleId: y.id, application: !1 }))
  ), l = e.modules.flatMap(
    (y) => (y.applicationEvents ?? []).map((A) => ({ ...A, moduleId: y.id, application: !0 }))
  ), g = e.modules.flatMap(
    (y) => (y.readModels ?? []).map((A) => ({ ...A, moduleId: y.id }))
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
    (y.steps ?? []).forEach((A, v) => {
      Ae(i, {
        id: A.id,
        label: `${v + 1}. ${A.name || A.type || "paso"}`,
        x: 0,
        y: 0,
        w: J.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!A.customCodeId,
        tooltip: `Paso de ${y.name}${A.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), ce(i, {
        id: `esstep:${v === 0 ? y.id : (y.steps ?? [])[v - 1].id}->${A.id}`,
        sourceId: v === 0 ? y.id : (y.steps ?? [])[v - 1].id,
        targetId: A.id,
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
    for (const A of y.steps ?? [])
      A.customCodeId && ce(i, {
        id: `escc:${A.id}`,
        sourceId: A.id,
        targetId: A.customCodeId,
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
  for (const y of [...u, ...l])
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
    }), I.set(_t(y.name), y.id);
  const h = (y) => {
    if (!y || !y.trim()) return null;
    const A = I.get(_t(y));
    if (A) return A;
    const v = `evname:${_t(y)}`;
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
  }, f = (y) => {
    const A = g.find((x) => x.id === y.id) ?? g.find((x) => y.name && _t(x.name) === _t(y.name)), v = (A == null ? void 0 : A.id) ?? (y.id || (y.name ? `rm:${_t(y.name)}` : null));
    return v ? (Ae(i, {
      id: v,
      label: (A == null ? void 0 : A.name) ?? y.name ?? v,
      x: 0,
      y: 0,
      w: J.readModel.w,
      h: J.readModel.h,
      kind: A ? "read-model" : "derived-read-model",
      fill: J.readModel.fill,
      stroke: J.readModel.stroke,
      dashed: !A,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const y of e.actorUses ?? []) {
    if (!a.has(y.targetId)) continue;
    const A = (e.actors ?? []).find((v) => v.id === y.actorId);
    A && (Ae(i, {
      id: A.id,
      label: A.name,
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
      id: `es-actor:${A.id}->${y.targetId}`,
      sourceId: A.id,
      targetId: y.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const y of e.aiAgents ?? []) {
    const A = (e.agentUses ?? []).filter((T) => T.agentId === y.id), v = (e.agentExternalUses ?? []).filter((T) => T.agentId === y.id), x = (e.agentRags ?? []).filter((T) => T.agentId === y.id), S = (e.agentMcpUses ?? []).filter((T) => T.agentId === y.id), E = (e.agentGatewayUses ?? []).some((T) => T.agentId === y.id) || (e.agentApiOpUses ?? []).some((T) => T.agentId === y.id) || (e.agentQueryUses ?? []).some((T) => T.agentId === y.id) || (e.agentDelegations ?? []).some((T) => T.agentId === y.id) || (e.agentTriggers ?? []).some((T) => T.agentId === y.id);
    if (!(!A.length && !v.length && !x.length && !S.length && !E)) {
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
      for (const T of A)
        a.has(T.useCaseId) && ce(i, {
          id: `es-agent:${y.id}->${T.useCaseId}`,
          sourceId: y.id,
          targetId: T.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const T of v) {
        const M = e.externalSystems.find(
          (q) => (q.useCases ?? []).some((j) => j.id === T.externalUseCaseId)
        );
        if (!M) continue;
        const L = (k = (M.useCases ?? []).find((q) => q.id === T.externalUseCaseId)) == null ? void 0 : k.name;
        Ae(i, {
          id: M.id,
          label: M.name,
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
          id: `es-agentx:${y.id}->${T.externalUseCaseId}`,
          sourceId: y.id,
          targetId: M.id,
          kind: "es-agent-external",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Llama a ${L} del sistema externo` : void 0
        });
      }
      for (const T of S) {
        const M = e.externalSystems.find(
          (q) => (q.mcpServers ?? []).some((j) => j.id === T.mcpServerId)
        );
        if (!M) continue;
        const L = (_ = (M.mcpServers ?? []).find((q) => q.id === T.mcpServerId)) == null ? void 0 : _.name;
        Ae(i, {
          id: M.id,
          label: M.name,
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
          id: `es-agentmcp:${y.id}->${T.mcpServerId}`,
          sourceId: y.id,
          targetId: M.id,
          kind: "es-agent-mcp",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Consume las herramientas del servidor MCP ${L}` : void 0
        });
      }
      for (const T of x) {
        const M = (e.rags ?? []).find((L) => L.id === T.ragId);
        if (M) {
          Ae(i, {
            id: M.id,
            label: M.name,
            x: 0,
            y: 0,
            w: J.readModel.w,
            h: J.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${M.name} — base de conocimiento (retrieval)`
          }), ce(i, {
            id: `es-agrag:${y.id}->${M.id}`,
            sourceId: y.id,
            targetId: M.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const L of M.sourceReadModelIds ?? []) {
            const q = f({ id: L });
            q && ce(i, {
              id: `es-ragsrc:${M.id}->${q}`,
              sourceId: q,
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
    const A = e.externalSystems.find((v) => v.id === y);
    return A ? (Ae(i, {
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
    }), A.id) : null;
  };
  for (const y of e.externalCalls ?? []) {
    const A = d(y.externalSystemId);
    !A || !a.has(y.useCaseId) || ce(i, {
      id: `es-extin:${A}->${y.useCaseId}`,
      sourceId: A,
      targetId: y.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const y of e.externalUseCaseCalls ?? []) {
    if (!a.has(y.sourceId)) continue;
    const A = e.externalSystems.find(
      (S) => (S.useCases ?? []).some((E) => E.id === y.targetId)
    ), v = A ? d(A.id) : null;
    if (!v) continue;
    const x = (B = ((A == null ? void 0 : A.useCases) ?? []).find((S) => S.id === y.targetId)) == null ? void 0 : B.name;
    ce(i, {
      id: `es-extout:${y.sourceId}->${y.targetId}`,
      sourceId: y.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: x,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: x ? `Llama a ${x} del sistema externo` : void 0
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
  const c = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const y of c)
    !i.nodes.has(y.domainEventId) || !(i.nodes.has(y.sourceId) && (a.has(y.sourceId) || n.some((v) => v.id === y.sourceId) || r.has(y.sourceId))) || ce(i, {
      id: `es-emit:${y.sourceId}->${y.domainEventId}`,
      sourceId: y.sourceId,
      targetId: y.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const m = (y, A, v, x, S, E) => (Ae(i, {
    id: y,
    label: A,
    x: 0,
    y: 0,
    w: J.policy.w,
    h: J.policy.h,
    kind: v,
    symbol: "flow",
    fill: J.policy.fill,
    stroke: J.policy.stroke,
    badge: x,
    tooltip: S
  }), y), w = (y, A) => {
    const v = h(y);
    v && ce(i, {
      id: `es-trigger:${v}->${A}`,
      sourceId: v,
      targetId: A,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, $ = (y, A) => {
    !A || !a.has(A) || ce(i, {
      id: `es-invoke:${y}->${A}`,
      sourceId: y,
      targetId: A,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const y of e.subscriptions ?? []) {
    const A = m(
      y.id,
      y.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${y.name}${y.eventName ? ` — reacciona a ${y.eventName}` : ""}${y.consumerGroup ? ` · grupo ${y.consumerGroup}` : ""}`
    );
    w(y.eventName, A);
    for (const v of y.actions ?? []) {
      if (v.type === "CallUseCase" && $(A, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const x = `saga:${v.sagaId}`;
        m(x, v.sagaId, "saga", "SAGA"), ce(i, {
          id: `es-saga:${A}->${x}`,
          sourceId: A,
          targetId: x,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const x = (e.projections ?? []).find((S) => S.id === v.projectionId);
        x && ce(i, {
          id: `es-feeds:${A}->${x.id}`,
          sourceId: A,
          targetId: x.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const y of e.projections ?? []) {
    const A = m(
      y.id,
      y.name,
      "projection",
      "PROYECCIÓN",
      `${y.name}${y.readModelName ? ` — materializa ${y.readModelName}` : ""}`
    );
    for (const S of y.handledEventIds) {
      const E = i.nodes.has(S) ? S : null;
      E && ce(i, {
        id: `es-trigger:${E}->${A}`,
        sourceId: E,
        targetId: A,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    y.sourceAggregateId && i.nodes.has(y.sourceAggregateId) && ce(i, {
      id: `es-state:${y.id}`,
      sourceId: y.sourceAggregateId,
      targetId: A,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = y.sourceExternalUseCaseId ?? y.sourceExternalTableId;
    if (v) {
      const S = e.externalSystems.find(
        (T) => (T.useCases ?? []).some((M) => M.id === v) || (T.tables ?? []).some((M) => M.id === v)
      ), E = S ? d(S.id) : null;
      if (E) {
        const T = ((ie = (S.useCases ?? []).find((M) => M.id === v)) == null ? void 0 : ie.name) ?? ((ee = (S.tables ?? []).find((M) => M.id === v)) == null ? void 0 : ee.name);
        ce(i, {
          id: `es-poll:${y.id}`,
          sourceId: E,
          targetId: A,
          kind: "es-projects-poll",
          label: T,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `polling de ${T}` : "polling"
        });
      }
    }
    const x = f({ id: y.readModelId, name: y.readModelName });
    x && ce(i, {
      id: `es-projects:${A}->${x}`,
      sourceId: A,
      targetId: x,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const y of e.flows) {
    if (y.archetype === "MATERIALIZES") {
      const v = h(y.triggerEvent), x = f({ name: y.readModelName ?? `${y.triggerEvent}View` });
      v && x && ce(i, {
        id: `es-mat:${y.id}`,
        sourceId: v,
        targetId: x,
        kind: "es-materializes",
        label: y.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${y.name} [MATERIALIZES]`
      });
      continue;
    }
    const A = m(
      `flow:${y.id}`,
      y.name,
      "flow",
      `POLICY · ${y.archetype}`,
      `Flow ${y.name} [${y.archetype}]`
    );
    if (w(y.triggerEvent, A), $(A, y.targetUseCaseId), !y.targetUseCaseId) {
      const v = d(y.targetId), x = v ?? `tgt:${y.targetId}`;
      !v && s.has(y.targetId) && Ae(i, {
        id: x,
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
      }), i.nodes.has(x) && ce(i, {
        id: `es-deliver:${y.id}`,
        sourceId: A,
        targetId: x,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const y of e.processes ?? []) {
    const A = m(
      y.id,
      y.name,
      "process",
      `PROCESO${y.sla ? ` · SLA ${y.sla}` : ""}`,
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    w(y.triggerEvent, A);
    for (const x of y.steps) $(A, x.useCaseId);
    const v = h(y.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${y.id}`,
      sourceId: A,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const y of e.workflows ?? []) {
    const A = m(
      y.id,
      y.name,
      "workflow",
      "WORKFLOW",
      `${y.name}${y.triggerEvent ? ` — arranca con ${y.triggerEvent}` : ""}`
    );
    w(y.triggerEvent, A);
    for (const x of y.steps ?? []) {
      $(A, x.targetUseCaseId);
      for (const S of [x.emittedEventName, x.completionEventName]) {
        const E = h(S);
        E && ce(i, {
          id: `es-wfemit:${y.id}:${E}`,
          sourceId: A,
          targetId: E,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = h(y.onCompletionEventName);
    v && ce(i, {
      id: `es-done:${y.id}`,
      sourceId: A,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const b = [...i.nodes.values()], P = /* @__PURE__ */ new Map();
  for (const y of i.edges)
    P.has(y.targetId) || P.set(y.targetId, []), P.get(y.targetId).push(y.sourceId);
  const R = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Set(), D = (y) => {
    const A = R.get(y);
    if (A !== void 0) return A;
    if (N.has(y)) return 0;
    N.add(y);
    const v = P.get(y) ?? [], x = v.length ? 1 + Math.max(...v.map(D)) : 0;
    return N.delete(y), R.set(y, x), x;
  }, V = /* @__PURE__ */ new Map();
  for (const y of b) {
    const A = t[y.id];
    if (A) {
      y.x = A.x, y.y = A.y;
      continue;
    }
    const v = D(y.id), x = V.get(v) ?? 0;
    V.set(v, x + 1), y.x = 140 + v * 260, y.y = 110 + x * 110;
  }
  return { nodes: b, edges: i.edges };
}
const dc = 190, lc = 56, Io = 180, cc = 56, pc = 150, uc = 44, yo = 250, vo = 100;
function mc(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), n = a.length ? 1 + Math.max(...a.map(s)) : 0;
    return i.delete(o.id), n;
  };
  return s(e);
}
function hc(e, t) {
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
function fc(e, t) {
  var u;
  const i = [], s = [], o = /* @__PURE__ */ new Set(), a = (l) => {
    var g;
    return (g = e.modules.flatMap((I) => I.useCases ?? []).find((I) => I.id === l)) == null ? void 0 : g.name;
  };
  let n = 140;
  (e.workflows ?? []).forEach((l) => {
    var $;
    const g = new Map(l.steps.map((b) => [b.id, b])), I = new Map(l.steps.map((b) => [b.id, mc(b, g)])), h = /* @__PURE__ */ new Map();
    for (const b of l.steps) {
      const P = I.get(b.id) ?? 0;
      h.set(P, (h.get(P) ?? 0) + 1);
    }
    const f = Math.max(1, ...h.values()), d = hc(e, l);
    if (d && !o.has(d.id)) {
      o.add(d.id);
      const b = t[d.id] ?? { x: 140, y: n };
      i.push({
        id: d.id,
        label: d.label,
        x: b.x,
        y: b.y,
        w: pc,
        h: uc,
        kind: d.kind,
        symbol: d.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.kind === "aggregate" ? "AGGREGATE" : d.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const c = t[l.id] ?? { x: 420, y: n };
    i.push({
      id: l.id,
      label: l.name,
      x: c.x,
      y: c.y,
      w: dc,
      h: lc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${l.name}${l.triggerEvent ? ` — arranca con ${l.triggerEvent}` : ""}${l.onCompletionEventName ? ` · emite ${l.onCompletionEventName} al completar` : ""}`
    }), d && s.push({
      id: `wft:${l.id}`,
      sourceId: d.id,
      targetId: l.id,
      kind: "workflow-trigger",
      label: l.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: l.triggerEvent ? `Evento: ${l.triggerEvent}` : void 0
    });
    const m = /* @__PURE__ */ new Map();
    let w = 0;
    for (const b of l.steps) {
      const P = I.get(b.id) ?? 0;
      w = Math.max(w, P);
      const R = m.get(P) ?? 0;
      m.set(P, R + 1);
      const N = t[b.id] ?? {
        x: c.x + (P + 1) * yo,
        y: n + (R - (h.get(P) - 1) / 2) * vo
      }, D = a(b.targetUseCaseId);
      i.push({
        id: b.id,
        label: b.name,
        x: N.x,
        y: N.y,
        w: b.type === "JOIN" || b.type === "SPLIT" ? 100 : Io,
        h: b.type === "JOIN" || b.type === "SPLIT" ? 48 : cc,
        kind: "workflow-step",
        symbol: b.type === "JOIN" || b.type === "SPLIT" ? "flow" : b.roleId ? "actor" : "event",
        fill: b.type === "JOIN" || b.type === "SPLIT" ? "#f5f3ff" : b.roleId ? "#fef9c3" : "#ffffff",
        stroke: b.roleId && b.type !== "JOIN" && b.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: b.type === "JOIN" || b.type === "SPLIT",
        badge: b.type === "JOIN" ? "⨝ JOIN" : b.type === "SPLIT" ? "⑃ SPLIT" : b.roleId ? `👤 ${b.roleId}${b.deadline ? ` · ${b.deadline}` : ""}` : D ? `→ ${D}` : "∅ sin use case",
        tooltip: b.type === "JOIN" ? `${b.name} — espera a TODAS sus dependencias antes de seguir` : b.type === "SPLIT" ? `${b.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${b.name}${b.roleId ? ` · tarea HUMANA de ${b.roleId}${b.deadline ? ` (plazo ${b.deadline})` : ""}` : ""}${b.emittedEventName ? ` · emite ${b.emittedEventName}` : ""}${D ? ` · lanza ${D}` : ""}${b.completionEventName ? ` · espera ${b.completionEventName}` : ""}${b.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const V = (b.dependsOnStepIds ?? []).filter((k) => g.has(k));
      V.length === 0 && s.push({
        id: `wfs:${l.id}:${b.id}`,
        sourceId: l.id,
        targetId: b.id,
        kind: "workflow-start",
        label: b.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of V)
        s.push({
          id: `wfdep:${k}->${b.id}`,
          sourceId: k,
          targetId: b.id,
          kind: "workflow-dependency",
          label: b.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${b.name} espera a ${(($ = g.get(k)) == null ? void 0 : $.name) ?? k}`
        });
    }
    if (l.onCompletionEventName) {
      const b = `done:${l.id}`, P = t[b] ?? { x: c.x + (w + 2) * yo, y: n };
      i.push({
        id: b,
        label: l.onCompletionEventName,
        x: P.x,
        y: P.y,
        w: Io,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const R = new Set(l.steps.flatMap((D) => D.dependsOnStepIds ?? [])), N = l.steps.filter((D) => !R.has(D.id));
      for (const D of N.length ? N : [])
        s.push({
          id: `wfd:${l.id}:${D.id}`,
          sourceId: D.id,
          targetId: b,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      l.steps.length || s.push({
        id: `wfd:${l.id}`,
        sourceId: l.id,
        targetId: b,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    n += Math.max(2, f + 1) * vo + 60;
  });
  const r = new Set(i.map((l) => l.id));
  (e.workflowGateways ?? []).forEach((l, g) => {
    const I = t[l.id] ?? { x: 200 + g % 5 * 220, y: 60 };
    i.push({
      id: l.id,
      label: l.name,
      x: I.x,
      y: I.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: l.type === "SPLIT" ? l.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : l.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: l.type === "SPLIT" ? `${l.name} — split ${l.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${l.name} — join que ${l.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), r.add(l.id);
  });
  for (const l of e.workflowGateways ?? []) {
    for (const I of l.sourceIds ?? [])
      r.has(I) && s.push({
        id: `wflink:${I}->${l.id}`,
        sourceId: I,
        targetId: l.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const g = l.type === "SPLIT" && l.semantics === "EXCLUSIVE";
    for (const I of l.targetIds ?? []) {
      if (!r.has(I)) continue;
      const h = g ? (u = (l.branchConditions ?? []).find((f) => f.targetId === I)) == null ? void 0 : u.expression : void 0;
      s.push({
        id: `wflink:${l.id}->${I}`,
        sourceId: l.id,
        targetId: I,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: g && !h,
        arrow: !0,
        label: h ?? (g ? "¿condición?" : void 0),
        tooltip: g ? `${h ? `Rama si: ${h}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  for (const l of e.workflows ?? [])
    for (const g of l.steps ?? [])
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
const wo = 250, Pe = 30, ct = 6, gc = 16, Ft = 190, Ic = 60, yc = 170, gi = 44;
function vc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ve(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function wc(e) {
  const t = [], i = (s, o, a) => {
    for (const n of s ?? []) {
      const r = [...o, n.label];
      t.push({ entry: n, path: r, depth: a }), i(n.children ?? [], r, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function bc(e, t) {
  var R, N, D, V;
  const i = [], s = [], o = e.uiApps ?? [], a = e.pages ?? [], n = (k) => {
    var _;
    return ((_ = e.modules.flatMap((B) => B.useCases ?? []).find((B) => B.id === k)) == null ? void 0 : _.name) ?? k;
  }, r = (k) => {
    var _;
    return ((_ = e.modules.flatMap((B) => B.queryServices ?? []).find((B) => B.id === k)) == null ? void 0 : _.name) ?? k;
  }, u = /* @__PURE__ */ new Map();
  let l = 160;
  for (const k of o) {
    const _ = wc(k), B = Math.max(
      90,
      54 + _.length * (Pe + ct)
    ), ie = t[k.id] ?? { x: 190, y: l + B / 2 };
    l = ie.y + B / 2 + 70;
    const ee = k.type ?? "APP";
    i.push({
      id: k.id,
      label: k.title || k.name,
      x: ie.x,
      y: ie.y,
      w: wo,
      h: B,
      kind: "ui-app",
      symbol: ee === "ORCHESTRATOR" || ee === "VIEW_EDITOR" ? "process" : "component",
      fill: ee === "ORCHESTRATOR" || ee === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: ee === "ORCHESTRATOR" || ee === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: ee === "ORCHESTRATOR" ? "ORQUESTADOR" : ee === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : ee === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: ee === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : ee === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : ee === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: ee === "ORCHESTRATOR" ? `${k.name} — orquesta y mantiene estado; solo enseña páginas hijas` : ee === "MASTER_DETAIL" ? `${k.name} — cabecera + pestañas (ambas son páginas)` : `App: ${k.name}`
    }), k.modelId && (u.set(k.modelId, {
      label: ((R = (e.models ?? []).find((v) => v.id === k.modelId)) == null ? void 0 : R.name) ?? k.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${k.id}->${k.modelId}`,
      sourceId: k.id,
      targetId: k.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [v, x, S, E, T] of [
      [k.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [k.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      v && s.push({
        id: `${x === "app-view" ? "appview" : "appedit"}:${k.id}->${v}`,
        sourceId: k.id,
        targetId: v,
        kind: x,
        color: E,
        label: S,
        arrow: !0,
        tooltip: T
      });
    const y = k.homePageId ?? k.homeAppId;
    y && s.push({
      id: `apphome:${k.id}->${y}`,
      sourceId: k.id,
      targetId: y,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: k.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), ee === "MASTER_DETAIL" && k.headerPageId && s.push({
      id: `appheader:${k.id}->${k.headerPageId}`,
      sourceId: k.id,
      targetId: k.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let A = ie.y - B / 2 + 34 + 10 + Pe / 2;
    for (const { entry: v, path: x, depth: S } of _) {
      const E = vc(k.id, v, x), T = S * gc;
      if (i.push({
        id: E,
        label: v.label,
        x: ie.x + T / 2,
        y: A,
        w: wo - 20 - T,
        h: Pe,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (N = v.children) != null && N.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (D = v.children) != null && D.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: k.id,
        tooltip: (V = v.children) != null && V.length ? "Agrupador (con submenú): no puede abrir nada" : v.pageId ? `Abre ${v.pageId}` : v.uiAdapterId ? `Abre la app ${v.uiAdapterId}` : v.useCaseId ? `Lanza ${v.useCaseId}` : v.aggregateId ? `CRUD inferido sobre ${v.aggregateId}` : v.queryOperationId ? `Listado con filtros de ${v.queryOperationId}` : "Entrada de menú sin destino"
      }), A += Pe + ct, v.uiAdapterId && o.some((M) => M.id === v.uiAdapterId) && s.push({
        id: `menuapp:${E}->${v.uiAdapterId}`,
        sourceId: E,
        targetId: v.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), v.useCaseId && e.modules.some((L) => (L.useCases ?? []).some((q) => q.id === v.useCaseId)) && (u.set(v.useCaseId, {
        label: n(v.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${E}->${v.useCaseId}`,
        sourceId: E,
        targetId: v.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), v.aggregateId && (e.aggregates ?? []).some((M) => M.id === v.aggregateId)) {
        const M = (e.aggregates ?? []).find((L) => L.id === v.aggregateId);
        u.set(M.id, { label: M.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${E}->${M.id}`,
          sourceId: E,
          targetId: M.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (v.queryOperationId) {
        const M = e.modules.flatMap((q) => q.queryServices ?? []).find((q) => q.id === v.queryServiceId), L = ((M == null ? void 0 : M.operations) ?? []).find((q) => q.id === v.queryOperationId);
        M && L && (u.set(L.id, {
          label: `${L.name} (${M.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${E}->${L.id}`,
          sourceId: E,
          targetId: L.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      v.pageId && a.some((M) => M.id === v.pageId) && s.push({
        id: `menupage:${E}->${v.pageId}`,
        sourceId: E,
        targetId: v.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const I = (k) => {
    var _;
    return ((_ = a.find((B) => B.id === k)) == null ? void 0 : _.name) ?? k;
  };
  for (const k of a) {
    const _ = t[k.id] ?? { x: 640, y: g }, B = k.type === "WIZARD" ? k.wizardSteps ?? [] : [], ie = B.length ? 54 + B.length * (Pe + ct) : Ic;
    g = _.y + ie + 90, i.push({
      id: k.id,
      label: k.name,
      x: _.x,
      y: _.y,
      w: Ft,
      h: ie,
      kind: "page",
      symbol: "interface",
      badge: k.customCodeId ? "CODE" : k.type ?? "PAGE",
      container: B.length > 0,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...k.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: k.route ? `${k.type ?? "PAGE"} · ${k.route}` : k.type ?? "PAGE"
    });
    let ee = _.y - ie / 2 + 34 + 10 + Pe / 2;
    B.forEach((y, A) => {
      const v = y.id ?? y.pageId ?? String(A);
      i.push({
        id: `wizrow:${k.id}:${v}`,
        label: `${A + 1}. ${y.label ?? (y.pageId ? I(y.pageId) : "Paso")}${y.pageId ? "" : " ⌁"}`,
        x: _.x,
        y: ee,
        w: Ft - 20,
        h: Pe,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: y.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: k.id,
        tooltip: y.pageId ? `Paso ${A + 1}: ${I(y.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${A + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), ee += Pe + ct;
    });
    for (const [y, A, v, x] of [
      [k.crudDetailPageId ?? k.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [k.crudCreatePageId ?? k.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      y && s.push({
        id: `${A === "crud-detail" ? "cruddetail" : "crudnew"}:${k.id}->${y}`,
        sourceId: k.id,
        targetId: y,
        kind: A,
        color: x,
        label: v,
        dashed: !0,
        arrow: !0,
        tooltip: A === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let y = 0; y < (k.wizardSteps ?? []).length; y++) {
      const A = (k.wizardSteps ?? [])[y];
      if (!A.pageId) continue;
      const v = A.id ?? A.pageId;
      s.push({
        id: `wizstep:${k.id}:${v}`,
        sourceId: `wizrow:${k.id}:${v}`,
        targetId: A.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${y + 1} — Supr desmapea`
      });
    }
    k.modelId && (u.set(k.modelId, {
      label: k.modelName ?? k.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${k.id}->${k.modelId}`,
      sourceId: k.id,
      targetId: k.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const y of k.buttons ?? [])
      y.useCaseId && (u.set(y.useCaseId, {
        label: n(y.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${k.id}->${y.useCaseId}`,
        sourceId: k.id,
        targetId: y.useCaseId,
        kind: "page-button",
        label: y.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: y.mappingId ? `Botón «${y.label}» — mapping ${y.mappingId}` : `Botón «${y.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    k.listingQueryServiceId && (u.set(k.listingQueryServiceId, {
      label: r(k.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${k.id}->${k.listingQueryServiceId}`,
      sourceId: k.id,
      targetId: k.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  const h = e.buttonGroups ?? [], f = (k) => {
    var _;
    return ((_ = h.find((B) => B.id === k)) == null ? void 0 : _.name) ?? k;
  };
  let d = 520;
  for (const k of h) {
    const _ = k.buttons ?? [], B = k.groupIds ?? [], ie = _.length + B.length, ee = t[k.id] ?? { x: 1e3, y: d }, y = Math.max(70, 54 + ie * (Pe + ct));
    d = ee.y + y + 80, i.push({
      id: k.id,
      label: k.name,
      x: ee.x,
      y: ee.y,
      w: Ft,
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
      tooltip: `${k.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let A = ee.y - y / 2 + 34 + 10 + Pe / 2;
    for (const v of _)
      i.push({
        id: `gbtn:${k.id}:${v.id}`,
        label: v.label ?? v.id,
        x: ee.x,
        y: A,
        w: Ft - 20,
        h: Pe,
        kind: "group-button",
        symbol: "usecase",
        fill: v.useCaseId || v.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !v.useCaseId && !v.apiOperationId,
        parentId: k.id,
        tooltip: `${v.label ?? v.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), A += Pe + ct;
    for (const v of B)
      i.push({
        id: `gsub:${k.id}:${v}`,
        label: `▸ ${f(v)}`,
        x: ee.x,
        y: A,
        w: Ft - 20,
        h: Pe,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: k.id,
        tooltip: `Subgrupo ${f(v)} — Supr lo desanida (el grupo sigue existiendo)`
      }), A += Pe + ct;
  }
  for (const k of h)
    for (const _ of k.buttons ?? [])
      !_.useCaseId || !e.modules.some((ie) => (ie.useCases ?? []).some((ee) => ee.id === _.useCaseId)) || (u.set(_.useCaseId, {
        label: n(_.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${k.id}:${_.id}`,
        sourceId: `gbtn:${k.id}:${_.id}`,
        targetId: _.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${_.label ?? _.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const k of a) {
    const _ = [
      ["toolbar", k.toolbarGroupIds ?? []],
      ["botonera", k.bottomBarGroupIds ?? []]
    ];
    for (const [B, ie] of _)
      for (const ee of ie)
        h.some((y) => y.id === ee) && s.push({
          id: `bargrp:${k.id}:${B}:${ee}`,
          sourceId: ee,
          targetId: k.id,
          kind: "bar-group",
          color: B === "toolbar" ? "#0284c7" : "#7c3aed",
          label: B,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${B} de ${k.name} — Supr lo desengancha`
        });
  }
  let c = 160;
  for (const k of e.models ?? [])
    u.has(k.id) || u.set(k.id, { label: k.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [k, _] of u) {
    const B = t[k] ?? { x: 1050, y: c };
    c = B.y + gi + 46, i.push({
      id: k,
      label: _.label,
      x: B.x,
      y: B.y,
      w: yc,
      h: gi,
      kind: _.kind,
      symbol: _.symbol,
      fill: "#ffffff",
      stroke: _.stroke
    });
  }
  let m = 120;
  for (const k of e.identityProviders ?? []) {
    const _ = t[k.id] ?? { x: -320, y: m };
    m = _.y + 70 + 40, i.push({
      id: k.id,
      label: k.name,
      x: _.x,
      y: _.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: k.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!k.publishedByExternalSystemId,
      badge: k.type ?? "IDP",
      tooltip: `${k.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const k of o)
    k.identityProviderId && (e.identityProviders ?? []).some((_) => _.id === k.identityProviderId) && s.push({
      id: `idpauth:${k.id}`,
      sourceId: k.id,
      targetId: k.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const w = (e.actorAppUses ?? []).filter(
    (k) => o.some((_) => _.id === k.appId) && (e.actors ?? []).some((_) => _.id === k.actorId)
  ), $ = [...new Set(w.map((k) => k.actorId))];
  let b = 160;
  for (const k of $) {
    const _ = (e.actors ?? []).find((ie) => ie.id === k), B = t[k] ?? { x: -60, y: b };
    b = B.y + gi + 46, i.push({
      id: k,
      label: _.name,
      x: B.x,
      y: B.y,
      w: 150,
      h: gi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const k of w)
    s.push({
      id: `actorapp:${k.actorId}->${k.appId}`,
      sourceId: k.actorId,
      targetId: k.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((k, _) => {
    const B = t[k.id] ?? { x: 1200, y: 120 + _ * 90 };
    i.push({
      id: k.id,
      label: k.name,
      x: B.x,
      y: B.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${k.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const P = new Set(i.map((k) => k.id));
  for (const k of a)
    k.customCodeId && P.has(k.customCodeId) && s.push({
      id: `ccpage:${k.id}`,
      sourceId: k.customCodeId,
      targetId: k.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${k.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const k of e.customCodes ?? [])
    for (const _ of k.usedElementIds ?? [])
      P.has(_) && s.push({
        id: `ccuse:${k.id}->${_}`,
        sourceId: k.id,
        targetId: _,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${k.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: i, edges: s };
}
const bo = 188, xo = 34, ko = 10, Ii = 24, _o = 6;
function yi(e, t) {
  return `fld:${e}:${t}`;
}
function as(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function xc(e, t) {
  const i = [], s = [], o = e.models ?? [], a = e.modelMappings ?? [], n = (h) => {
    var f;
    return ((f = o.find((d) => d.id === h)) == null ? void 0 : f.name) ?? h ?? "?";
  };
  o.forEach((h, f) => {
    const d = t[h.id] ?? { x: 200 + f % 5 * 260, y: 160 + Math.floor(f / 5) * 220 }, c = h.fields ?? [], m = xo + (c.length ? c.length * Ii + (c.length - 1) * _o : 10) + ko;
    i.push({
      id: h.id,
      label: h.name,
      x: d.x,
      y: d.y,
      w: bo,
      h: m,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${h.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), c.forEach((w, $) => {
      i.push({
        id: yi(h.id, w.id),
        label: w.name,
        x: d.x,
        y: d.y - m / 2 + xo + $ * (Ii + _o) + Ii / 2,
        w: bo - 2 * ko,
        h: Ii,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: w.type ?? void 0,
        parentId: h.id,
        tooltip: `${w.name}${w.type ? ` (${w.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((h, f) => {
    const d = t[h.id] ?? { x: 200 + f % 5 * 260, y: 60 };
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
  }), (e.customCodes ?? []).forEach((h, f) => {
    const d = t[h.id] ?? { x: 120 + f % 5 * 220, y: 60 };
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
  const r = new Set(i.map((h) => h.id)), u = (h) => h.fieldId ? yi(h.modelId, h.fieldId) : h.modelId;
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
    for (const f of h.inputs ?? []) {
      const d = u(f);
      r.has(d) && s.push({
        id: `tfin:${h.id}:${f.modelId}:${f.fieldId ?? ""}`,
        sourceId: d,
        targetId: h.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${h.name} — Supr la desconecta`
      });
    }
    h.output && r.has(u(h.output)) && s.push({
      id: `tfout:${h.id}`,
      sourceId: h.id,
      targetId: u(h.output),
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
      for (const f of h.rules ?? []) {
        const d = yi(h.sourceModelId, f.sourceFieldId ?? ""), c = yi(h.targetModelId, f.targetFieldId ?? "");
        !r.has(d) || !r.has(c) || s.push({
          id: `maprule:${h.id}:${f.id}`,
          sourceId: d,
          targetId: c,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${h.name} — Supr la elimina`
        });
      }
    }
  const l = new Set(
    a.filter((h) => h.sourceModelId && h.targetModelId).map((h) => `${h.sourceModelId}->${h.targetModelId}`)
  ), g = new Map(
    e.modules.flatMap((h) => (h.useCases ?? []).map((f) => [f.id, f]))
  ), I = /* @__PURE__ */ new Set();
  for (const h of e.pages ?? [])
    if (h.modelId)
      for (const f of h.buttons ?? []) {
        if (!f.useCaseId || f.mappingId) continue;
        const d = g.get(f.useCaseId);
        if (!(d != null && d.inputModelId) || d.inputModelId === h.modelId) continue;
        const c = `${h.modelId}->${d.inputModelId}`;
        l.has(c) || I.has(c) || (I.add(c), !(!r.has(h.modelId) || !r.has(d.inputModelId)) && s.push({
          id: `mapgap:${h.id}:${f.useCaseId}`,
          sourceId: h.modelId,
          targetId: d.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${f.label}» (página ${h.name}) llama a ${d.name}: falta mapear ${n(h.modelId)} → ${n(d.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
const rs = 560, vi = 34, wi = 14, ds = 150, bi = 40, xi = 12, ki = 150, tt = 40, kc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, _c = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function $c(e, t) {
  const i = [], s = [], o = e.etlFlows ?? [], a = new Map(e.modules.map((c) => [c.id, c.name])), n = new Map(
    e.modules.flatMap((c) => [
      ...(c.domainEvents ?? []).map((m) => [m.id, m.name]),
      ...(c.applicationEvents ?? []).map((m) => [m.id, m.name])
    ])
  );
  let r = 140;
  for (const c of o) {
    const m = c.steps ?? [], w = [[], [], []];
    m.forEach((R) => w[kc(R.type)].push(R));
    const $ = Math.max(1, ...w.map((R) => R.length)), b = vi + wi + $ * (bi + xi), P = t[c.id] ?? { x: 420, y: r };
    r = P.y + b + 110, i.push({
      id: c.id,
      label: c.name,
      x: P.x,
      y: P.y,
      w: rs,
      h: b,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${c.name} — integrador${c.ownerModuleId ? ` de ${a.get(c.ownerModuleId) ?? c.ownerModuleId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), w.forEach((R, N) => {
      const D = P.x - rs / 2 + wi + ds / 2 + N * (rs - 2 * wi - ds) / 2;
      R.forEach((V, k) => {
        const _ = _c[N];
        if (i.push({
          id: V.id,
          label: V.name ?? V.id,
          x: D,
          y: P.y - b / 2 + vi + bi / 2 + k * (bi + xi),
          w: ds,
          h: bi,
          kind: "etl-step",
          symbol: _.symbol,
          fill: _.fill,
          stroke: _.stroke,
          badge: V.type === "SOURCE_PULL" ? "PULL" : V.type === "SOURCE_CONSUMER" ? "CONSUME" : V.type === "TRANSFORM" ? "TRANSFORM" : V.type === "WRITE_API" ? "→ API" : V.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: c.id,
          tooltip: `${V.name ?? V.id} (${V.type})${V.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), N > 0) {
          const B = w[N - 1], ie = B[Math.min(k, B.length - 1)];
          ie && s.push({
            id: `etlpipe:${c.id}:${ie.id}->${V.id}`,
            sourceId: ie.id,
            targetId: V.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const u = new Set(i.map((c) => c.id)), l = new Set(o.flatMap((c) => (c.steps ?? []).map((m) => m.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((c) => (c.steps ?? []).map((m) => m.apiId)).filter(Boolean)), I = new Set(o.flatMap((c) => (c.steps ?? []).map((m) => m.eventId)).filter(Boolean));
  let h = 120;
  for (const c of e.externalSystems) {
    const m = (c.tables ?? []).filter((b) => l.has(b.id));
    if (!m.length) continue;
    const w = vi + wi + m.length * (tt + xi), $ = t[c.id] ?? { x: -140, y: h };
    h = $.y + w + 90, i.push({
      id: c.id,
      label: c.name,
      x: $.x,
      y: $.y,
      w: ki + 30,
      h: w,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${c.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), u.add(c.id), m.forEach((b, P) => {
      i.push({
        id: b.id,
        label: b.name,
        x: $.x,
        y: $.y - w / 2 + vi + tt / 2 + P * (tt + xi),
        w: ki,
        h: tt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: c.id,
        tooltip: `${b.name} — tabla legacy de ${c.name}`
      }), u.add(b.id);
    });
  }
  let f = 120;
  for (const c of e.apis ?? []) {
    if (!g.has(c.id)) continue;
    const m = t[c.id] ?? { x: 1e3, y: f };
    f = m.y + tt + 70, i.push({
      id: c.id,
      label: c.name,
      x: m.x,
      y: m.y,
      w: ki,
      h: tt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${c.name} — API que un integrador consume o llama`
    }), u.add(c.id);
  }
  let d = 400;
  for (const c of I) {
    const m = c, w = t[m] ?? { x: 1e3, y: d };
    d = w.y + tt + 70, i.push({
      id: m,
      label: n.get(m) ?? m,
      x: w.x,
      y: w.y,
      w: ki,
      h: tt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), u.add(m);
  }
  for (const c of o)
    for (const m of c.steps ?? []) {
      const w = m.externalTableId ?? m.apiId ?? m.eventId;
      if (!w || !u.has(w) || !u.has(m.id)) continue;
      const $ = m.type.startsWith("SOURCE");
      s.push({
        id: `etl:${c.id}:${m.id}`,
        sourceId: $ ? w : m.id,
        targetId: $ ? m.id : w,
        kind: $ ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: m.type === "SOURCE_PULL" ? "pull" : m.type === "SOURCE_CONSUMER" ? "consume" : m.type === "WRITE_API" ? "api" : m.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: $ ? `${c.name} lee de aquí — Supr quita el paso` : `${c.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: s };
}
async function Ec(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((u) => u.e), s = new i(), a = {
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
    children: e.nodes.map((u) => ({ id: u.id, width: u.w, height: u.h })),
    edges: e.edges.map((u) => ({ id: u.id, sources: [u.sourceId], targets: [u.targetId] }))
  }, n = await s.layout(a), r = {};
  for (const u of n.children ?? [])
    r[u.id] = {
      x: (u.x ?? 0) + (u.width ?? 0) / 2,
      y: (u.y ?? 0) + (u.height ?? 0) / 2
    };
  return r;
}
var Sc = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, We = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Cc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Sc(t, i, o), o;
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
        const n = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), r = (o = n == null ? void 0 : n.closest) == null ? void 0 : o.call(n, ".n3"), u = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = u !== this._connect.sourceId ? u : null;
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
    const n = new DOMMatrix().translate(s, o).multiply(a).translate(-s, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = n.transformPoint(new DOMPoint(0, 0, 0, 1)), u = n.transformPoint(new DOMPoint(1, 0, 0, 0)), l = n.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, I = t - i.top, h = u.x - g * u.w, f = l.x - g * l.w, d = u.y - I * u.w, c = l.y - I * l.w, m = g * r.w - r.x, w = I * r.w - r.y, $ = h * c - f * d;
    return $ ? { x: (m * c - f * w) / $, y: (h * w - m * d) / $ } : { ...this._center };
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
      return C`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((m) => [m.id, m])), s = Math.min(...e.map((m) => m.x - m.w / 2)) - 60, o = Math.max(...e.map((m) => m.x + m.w / 2)) + 60, a = Math.min(...e.map((m) => m.y - m.h / 2)) - 60, n = Math.max(...e.map((m) => m.y + m.h / 2)) + 60, r = (s + o) / 2, u = (a + n) / 2, l = this.getBoundingClientRect(), g = l.width ? Math.min(l.width / (o - s), l.height / (n - a), 1) * 0.9 : 0.5, I = this._k * g;
    this._kUsed = I, this._center = { x: r, y: u };
    const h = 30, f = this._liveMove, d = (m) => m.x + ((f == null ? void 0 : f.id) === m.id ? f.dx : 0), c = (m) => m.y + ((f == null ? void 0 : f.id) === m.id ? f.dy : 0);
    return C`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${I}, ${I}, ${I}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-u}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${a}px"
            width=${o - s}
            height=${n - a}
            viewBox="${s} ${a} ${o - s} ${n - a}"
          >
            ${this.scene.edges.map((m) => {
      const w = i.get(m.sourceId), $ = i.get(m.targetId);
      return !w || !$ ? "" : te`<line
                x1=${d(w)} y1=${c(w)} x2=${d($)} y2=${c($)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((m) => {
      const w = i.get(m.sourceId), $ = i.get(m.targetId);
      if (!w || !$) return "";
      const b = (t.get(w.id) ?? 0) * h + 2, P = (t.get($.id) ?? 0) * h + 2, R = d($) - d(w), N = c($) - c(w), D = P - b, V = Math.hypot(R, N), k = Math.hypot(V, D), _ = Math.atan2(N, R) * 180 / Math.PI, B = Math.atan2(D, V) * 180 / Math.PI, ie = m.color ?? "#64748b", ee = m.dashed ? `repeating-linear-gradient(90deg, ${ie} 0 6px, transparent 6px 10px)` : ie;
      return C`<div
              class="edge3"
              style="
                left: ${d(w)}px; top: ${c(w)}px; width: ${k}px; height: 1.7px;
                transform: translateZ(${b}px) rotateZ(${_}deg) rotateY(${-B}deg);
                background: ${ee};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((m) => {
      const w = t.get(m.id) ?? 0, $ = m.container || w === 0, b = this._hoverTargetId === m.id;
      return C`
              <div
                class="n3 ${m.container ? "container3" : ""} ${this.selectedId === m.id ? "selected3" : ""} ${b ? "hover3" : ""}"
                data-node-id=${m.id}
                data-kind=${m.kind}
                title=${m.tooltip ?? m.label}
                style="
                  left: ${d(m) - m.w / 2}px; top: ${c(m) - m.h / 2}px;
                  width: ${m.w}px; height: ${m.h}px;
                  transform: translateZ(${w * h + (b ? 8 : 0)}px)${b ? " scale(1.06)" : ""};
                  background: ${m.container ? "color-mix(in srgb, " + (m.fill ?? "#ffffff") + " 82%, transparent)" : m.fill ?? "#ffffff"};
                  border-color: ${m.stroke ?? "#64748b"};
                  border-style: ${m.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${$ ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${m.badge ? C`<span class="badge3" style="color: ${m.stroke ?? "#94a3b8"}">${m.badge}</span>` : ""}
                <span>${m.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const m = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!m || !Ac.has(m.kind)) return "";
      const w = (t.get(m.id) ?? 0) * h + 4;
      return [
        [d(m) + m.w / 2, c(m)],
        [d(m) - m.w / 2, c(m)],
        [d(m), c(m) + m.h / 2],
        [d(m), c(m) - m.h / 2]
      ].map(
        ([b, P]) => C`<div
                class="h3"
                data-source-id=${m.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${b}px; top: ${P}px; transform: translateZ(${w}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? C`<svg class="rubber">
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
Re.styles = vt`
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
We([
  ae({ attribute: !1 })
], Re.prototype, "scene", 2);
We([
  ae({ attribute: !1 })
], Re.prototype, "selectedId", 2);
We([
  ae({ attribute: !1 })
], Re.prototype, "connectable", 2);
We([
  U()
], Re.prototype, "_rx", 2);
We([
  U()
], Re.prototype, "_rz", 2);
We([
  U()
], Re.prototype, "_k", 2);
We([
  U()
], Re.prototype, "_pan", 2);
We([
  U()
], Re.prototype, "_liveMove", 2);
We([
  U()
], Re.prototype, "_connect", 2);
We([
  U()
], Re.prototype, "_hoverTargetId", 2);
Re = We([
  wt("modux-tilt")
], Re);
var Mc = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, Ie = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Pc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Mc(t, i, o), o;
};
const $o = [
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
let re = class extends Fe {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? C`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? C`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? C`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? C`<div class="control">••••••••</div>` : t === "email" ? C`<div class="control">nombre@dominio.com</div>` : t === "money" ? C`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? C`<div class="control">──────●──</div>` : t === "stars" ? C`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? C`<div class="control area">🖼</div>` : t === "link" ? C`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? C`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? C`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? C`<div class="control" style="justify-content:flex-end">0</div>` : C`<div class="control">Texto…</div>`;
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
    return re.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const n = (e.children ?? []).filter((u) => u.kind === "tab"), r = n.find((u) => u.id === this._activeTabs[e.id]) ?? n[0];
      r && (e = r);
    }
    if (t === "into" && !re.LEAF_KINDS.has(e.kind))
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
      let u;
      try {
        u = JSON.parse(r);
      } catch {
        return;
      }
      if (!u.componentId || !u.pageId || u.pageId === ((n = this.page) == null ? void 0 : n.id)) return;
      const l = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: u.pageId, componentId: u.componentId, ...l });
      return;
    }
    if (s === e.id || this.isWithin(e.id, s)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== s && this.emitEvent("component-moved", { componentId: s, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var u, l, g;
    const t = e.children ?? [], i = (I) => I.map((h) => this.renderComponent(h)), s = C`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = C`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const I = t.slice(0, Math.ceil(t.length / 2)), h = t.slice(Math.ceil(t.length / 2));
        o = C`<div class="row-lay">
          <div class="col-lay">${I.length ? i(I) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${h.length ? i(h) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = C`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = C`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const I = t.filter((f) => f.kind === "tab"), h = I.find((f) => f.id === this._activeTabs[e.id]) ?? I[0];
        o = C`
          <div class="tabbar">
            ${I.map(
          (f, d) => C`<span
                class=${f === h ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(c) => {
            c.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: f.id }, this.emitEvent("component-selected", { componentId: f.id });
          }}
                @dblclick=${(c) => {
            c.stopPropagation(), this._cmp = { ...f };
          }}
                @dragstart=${(c) => {
            var m, w;
            c.stopPropagation(), this._dragCmpId = f.id, (w = c.dataTransfer) == null || w.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: f.id })
            );
          }}
                @dragover=${(c) => {
            var m;
            ((m = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : m.kind) === "tab" && (c.preventDefault(), c.stopPropagation());
          }}
                @drop=${(c) => {
            var P, R;
            const m = this._dragCmpId;
            if (!m || m === f.id || ((P = this.nodeById(m)) == null ? void 0 : P.kind) !== "tab") return;
            c.preventDefault(), c.stopPropagation();
            const w = c.currentTarget.getBoundingClientRect(), b = c.clientX - w.left < w.width / 2 ? f.id : ((R = I[d + 1]) == null ? void 0 : R.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, b !== m && this.emitEvent("component-moved", {
              componentId: m,
              toParentId: e.id,
              beforeComponentId: b
            });
          }}
                >${f.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${h ? this.renderComponent(h) : s}`;
        break;
      }
      case "tab":
        o = C`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        o = C`<div class="col-lay">
          ${t.length ? t.map(
          (I, h) => C`
                  <div class="acc-bar"><span>${I.title ?? I.label ?? "Sección"}</span><span>${h === 0 ? "▾" : "▸"}</span></div>
                  ${h === 0 ? this.renderComponent(I) : oe}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        o = C`<div class="card-box">
          ${e.title ? C`<div class="card-title">${e.title}</div>` : oe}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        o = C`<div class="grid3-lay">
          ${t.length ? t.map((I) => C`<div class="board-col">${this.renderComponent(I)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [I, ...h] = t;
        o = C`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${I ? this.renderComponent(I) : C`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${h.length ? i(h) : C`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = C`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        o = C`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = C`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const h = e.modelId && e.modelId === ((u = this.page) == null ? void 0 : u.modelId) ? ((l = this.page) == null ? void 0 : l.viewmodelFields) ?? [] : [];
        o = h.length ? C`<div class="grid-lay">
              ${h.slice(0, 6).map(
          (f) => C`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`
        )}
            </div>` : C`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const I = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = C`<table>
            <tr>${I.length ? I.map((h) => C`<th>${h.label ?? h.name}</th>`) : C`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => C`<tr>${(I.length ? I : [1, 2, 3]).map(() => C`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? oe : C`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = C`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const I = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = C`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(I)}`;
        break;
      }
      case "text":
        o = C`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = C`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = C`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = C`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const a = re.LEAF_KINDS.has(e.kind), n = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (I) => {
      var h, f;
      I.stopPropagation(), this._dragCmpId = e.id, (f = I.dataTransfer) == null || f.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (h = this.page) == null ? void 0 : h.id, componentId: e.id })
      ), I.dataTransfer && (I.dataTransfer.effectAllowed = "move");
    };
    return C`<div
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
      var f;
      I.preventDefault(), I.stopPropagation();
      const h = ((f = I.dataTransfer) == null ? void 0 : f.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...h].includes("application/x-modux-cmp") || [...h].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, I) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(I) => {
      var h, f, d;
      this._foreignOver = !1, !(!this._dragCmpId && !((d = (f = (h = I.dataTransfer) == null ? void 0 : h.types) == null ? void 0 : f.includes) != null && d.call(f, "application/x-modux-cmp"))) && (I.preventDefault(), I.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, I));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${r}
        >${re.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return C`
        ${i ? C`<table>
              <tr>${t.slice(0, 4).map((s) => C`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => C`<tr>${t.slice(0, 4).map(() => C`<td>···</td>`)}</tr>`)}
            </table>` : oe}
        ${t.length ? C`<div class="grid">
              ${t.map(
      (s) => C`
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
            </div>` : C`<div class="empty">
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
    const t = (u) => this._cmp = { ...this._cmp, ...u }, i = e.kind, s = [
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
    return C`<div class="pop" @click=${(u) => u.stopPropagation()}>
      ${s ? C`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(u) => t({ title: u.target.value })} />` : oe}
      ${i === "text" ? C`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(u) => t({ text: u.target.value })} />` : oe}
      ${i === "button" || i === "field" ? C`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(u) => t({ label: u.target.value })} />` : oe}
      ${i === "button" ? C`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? C`<span class="chip">${((o = this.useCases.find((u) => u.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : C`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? C`<span class="chip"
                      >${((a = this.mappings.find((u) => u.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : C`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : oe}
      ${i === "form" ? C`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? C`<span class="chip"
                      >${((n = this.models.find((u) => u.id === e.modelId)) == null ? void 0 : n.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : C`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : oe}
      ${i === "listing" ? C`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? C`<span class="chip"
                      >${((r = this.queryOps.find((u) => u.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : C`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : oe}
      ${i === "field" ? C`<label>Estereotipo</label>
            <select @change=${(u) => t({ stereotype: u.target.value || void 0 })}>
              ${$o.map((u) => C`<option value=${u} ?selected=${u === (e.stereotype ?? "regular")}>${u}</option>`)}
            </select>` : oe}
      ${i === "tabLayout" ? C`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : oe}
      <div class="actions">
        <button
          @click=${() => {
      const u = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: u });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const u = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: u.id,
        title: u.title ?? null,
        text: u.text ?? null,
        label: u.label ?? null,
        useCaseId: u.useCaseId ?? null,
        mappingId: u.mappingId ?? null,
        modelId: u.modelId ?? null,
        queryServiceId: u.queryServiceId ?? null,
        queryOperationId: u.queryOperationId ?? null,
        fieldId: u.fieldId ?? null,
        stereotype: u.stereotype ?? null,
        colspan: u.colspan ?? null
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
    return C`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? C`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : C`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? C`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : C`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => C`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? oe : C`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? C`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : C`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${s ? C`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const n = (e.wizardSteps ?? []).map((u, l) => u.id ?? u.pageId ?? String(l)), r = n[a];
      return C`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(u) => {
        u.stopPropagation(), this._dragWizKey = r;
      }}
                      @dragover=${(u) => {
        this._dragWizKey && (u.preventDefault(), u.stopPropagation());
      }}
                      @drop=${(u) => {
        const l = this._dragWizKey;
        if (this._dragWizKey = null, !l || l === r) return;
        u.preventDefault(), u.stopPropagation();
        const g = u.currentTarget.getBoundingClientRect(), h = u.clientX - g.left < g.width / 2 ? r : n[a + 1] ?? null;
        h !== l && this.emitEvent("wizard-step-moved", { stepKey: l, beforeStepKey: h });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : C`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : oe}
        ${(e.content ?? []).length ? C`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => C`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? oe : C`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, n, r;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((u) => u.useCaseId === this._btn.useCaseId);
      return C`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((n = this.useCases.find((u) => u.id === this._btn.useCaseId)) == null ? void 0 : n.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(u) => this._btn = { ...this._btn, label: u.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? C`<span class="chip"
                        >${((r = this.mappings.find((u) => u.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : C`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? C`<button
                      @click=${() => {
        const u = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: u });
      }}
                    >
                      Quitar
                    </button>` : oe}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : oe}
      ${this._editing ? C`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${$o.map(
      (o) => C`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
var Tc = Object.defineProperty, Oc = Object.getOwnPropertyDescriptor, Oe = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Oc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Tc(t, i, o), o;
};
const gn = 460, Nc = 540, Rc = 660;
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
        const n = this.pages.findIndex((u) => u.id === a), r = this.posOf(a, n);
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
    var g, I, h, f, d, c;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (I = i == null ? void 0 : i.closest) == null ? void 0 : I.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (h = a == null ? void 0 : a.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), r = (f = n == null ? void 0 : n.closest) == null ? void 0 : f.call(n, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${o}:${r.dataset.btnUc}`;
    const u = (d = n == null ? void 0 : n.closest) == null ? void 0 : d.call(n, "[data-bar]");
    if (u != null && u.dataset.bar) return `bar:${o}:${u.dataset.bar}`;
    const l = (c = n == null ? void 0 : n.closest) == null ? void 0 : c.call(n, "[data-cmp-id]");
    return l ? `cmp:${o}:${l.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var h, f, d, c;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), s = (f = i == null ? void 0 : i.closest) == null ? void 0 : f.call(i, ".frame");
    if (!s) return null;
    const o = s.dataset.pageId, a = s.querySelector("modux-page-designer"), n = (d = a == null ? void 0 : a.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), r = (c = n == null ? void 0 : n.closest) == null ? void 0 : c.call(n, "[data-cmp-id]");
    if (!r) return { pageId: o, componentId: null, pos: "into" };
    const u = r.dataset.cmpKind ?? "", l = r.getBoundingClientRect(), g = (t - l.top) / Math.max(1, l.height), I = re.LEAF_KINDS.has(u) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: r.dataset.cmpId, pos: I };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: gn, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Nc, y: Math.floor(t / 3) * Rc };
  }
  render() {
    return C`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), s = this.sizeOf(e.id);
      return C`
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
      ${this.pages.length ? "" : C`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Se.styles = vt`
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
      width: ${gn}px;
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
  ae({ attribute: !1 })
], Se.prototype, "pages", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "layout", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "sizes", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "selectedId", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "selectedIds", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "models", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "mappings", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "useCases", 2);
Oe([
  ae({ attribute: !1 })
], Se.prototype, "queryOps", 2);
Oe([
  ae({ attribute: !1 })
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
  wt("modux-figma")
], Se);
var Lc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, Ye = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Dc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Lc(t, i, o), o;
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
}, ls = {
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
}, zc = {
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
}, Eo = [30, 20, 13, 9.5, 7.5], So = [0, 180, 118, 80, 58], qc = 0.055, Fc = 0.86, Bc = 2600, _i = 240, Co = 0.16, Ao = 0.015;
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
    const a = 70, n = this.clientWidth || 800, r = this.clientHeight || 600, u = s - t + a * 2, l = o - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(n / u, r / l)));
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
      color: Uc[e] ?? "#64748b",
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
        const o = t.modules.find((l) => l.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((l) => l.moduleId === e.refId), n = o.useCases ?? [], r = new Set(a.map((l) => l.id)), u = new Set(
          (t.emissions ?? []).filter((l) => r.has(l.sourceId)).map((l) => l.domainEventId)
        );
        return [
          ...a.length ? [s("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...n.length ? [s("group", `use-cases:${e.refId}`, `Casos de uso · ${n.length}`)] : [],
          ...(o.domainEvents ?? []).filter((l) => !u.has(l.id)).map((l) => s("domain-event", l.id, l.name)),
          ...(o.applicationEvents ?? []).map((l) => s("application-event", l.id, l.name)),
          ...(o.readModels ?? []).map((l) => s("read-model", l.id, l.name)),
          ...(o.domainServices ?? []).map((l) => s("domain-service", l.id, l.name)),
          ...(o.queryServices ?? []).map((l) => s("query-service", l.id, l.name)),
          ...(o.scheduledTriggers ?? []).map((l) => s("scheduled-trigger", l.id, l.name)),
          ...(t.etlFlows ?? []).filter((l) => l.ownerModuleId === e.refId).map((l) => s("etl-flow", l.id, l.name)),
          ...(t.notifications ?? []).filter((l) => l.ownerModuleId === e.refId).map((l) => s("notification", l.id, l.name)),
          ...(t.documents ?? []).filter((l) => l.ownerModuleId === e.refId).map((l) => s("document", l.id, l.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), n = e.refId.slice(o + 1), r = t.modules.find((u) => u.id === n);
        return r ? a === "aggregates" ? (t.aggregates ?? []).filter((u) => u.moduleId === n).map((u) => s("aggregate", u.id, u.name)) : (r.useCases ?? []).map((u) => s(u.policy ? "policy" : "use-case", u.id, u.name)) : [];
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
          for (const u of r ?? [])
            u.pageId && a.add(u.pageId), n(u.children);
        };
        n(o.menuItems);
        for (const r of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          r && a.add(r);
        return [...a].map((r) => (t.pages ?? []).find((u) => u.id === r)).filter((r) => !!r).map((r) => s("page", r.id, r.name));
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
        const r = (So[Math.min(n.depth, So.length - 1)] ?? 60) + Math.min(60, ((((a = n.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let u = n.x - n.parent.x, l = n.y - n.parent.y, g = Math.hypot(u, l);
        if (g < 0.01) {
          const d = Math.random() * Math.PI * 2;
          u = Math.cos(d) * 0.1, l = Math.sin(d) * 0.1, g = 0.1;
        }
        const I = qc * (g - r), h = u / g * I, f = l / g * I;
        n.vx -= h, n.vy -= f, n.parent.vx += h * 0.4, n.parent.vy += f * 0.4;
      } else
        n.vx -= n.x * Ao, n.vy -= n.y * Ao;
      !this.reducedMotion && this._motion > 0 && (n.vx += Math.sin(t * n.f1 * Math.PI * 2 + n.p1) * Co * this._motion, n.vy += Math.cos(t * n.f2 * Math.PI * 2 + n.p2) * Co * this._motion);
    }
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (let u = n + 1; u < e.length; u++) {
        const l = e[u], g = l.x - r.x, I = l.y - r.y;
        if (Math.abs(g) > _i || Math.abs(I) > _i) continue;
        const h = g * g + I * I;
        if (h > _i * _i || h < 0.01) continue;
        const f = Math.sqrt(h), d = r.depth <= 1 && l.depth <= 1 ? 3 : 1, c = Bc * d / h, m = g / f * c, w = I / f * c;
        r.vx -= m, r.vy -= w, l.vx += m, l.vy += w;
      }
    }
    const i = this._motion, s = Fc * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
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
      const u = n === this.hover ? 1.75 : 1;
      n.scale += (u - n.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Eo[Math.min(e.depth, Eo.length - 1)] ?? 7) * e.scale;
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
      const u = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, u, 0, Math.PI * 2), t.fillStyle = r.expanded ? r.color + "22" : "#ffffff", t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, u);
      const l = ((a = r.children) == null ? void 0 : a.length) ?? 0;
      if (!r.expanded && l > 0) {
        const I = Math.max(7, u * 0.42), h = r.x + u * 0.75, f = r.y + u * 0.75;
        t.beginPath(), t.arc(h, f, I, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(I * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(l), h, f + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const I = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${o(12)}` : o(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(I, r.x, r.y + u + 4);
      }
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const r = this.found.node, u = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, u * 1.6), t.strokeStyle = r.color, t.lineWidth = 2.2 / this.cam.k;
        const l = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 9 + l, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 18 + l * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
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
        const n = (t.x + a.x) / 2, r = (t.y + a.y) / 2, u = a.x - t.x, l = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(n - l * g, r + u * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], s = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const n = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, u = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, s.forEach((l, g) => {
      const I = r - u / 2 + u * (g + 0.5) / s.length, h = this.reducedMotion ? 0 : Math.sin(this.t * l.f1 * Math.PI * 2 + l.p1) * 1.8, f = t.x + Math.cos(I) * (n + h), d = t.y + Math.sin(I) * (n + h);
      e.beginPath(), e.arc(f, d, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = l.color, e.stroke();
    }), i.length > s.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const l = r + u / 2 + 0.35;
      e.fillText(`+${i.length - s.length}`, t.x + Math.cos(l) * n, t.y + Math.sin(l) * n);
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
    var D, V;
    const o = (t.children ?? []).flatMap(
      (k) => k.kind === "group" ? k.children ?? (k.children = this.childrenOf(k)) : [k]
    ), a = /* @__PURE__ */ new Map();
    for (const k of o) a.set(k.kind, (a.get(k.kind) ?? 0) + 1);
    const n = [];
    for (const [k, _] of a)
      if (n.push(`${_} ${_ === 1 ? (ls[k] ?? k).toLowerCase() : zc[k] ?? k}`), n.length === 4) {
        const B = [...a.keys()].length - 4;
        B > 0 && (n[3] += ` (+${B} tipos más)`);
        break;
      }
    const r = o.slice(0, 6).map((k) => ({ label: k.label.length > 30 ? k.label.slice(0, 29) + "…" : k.label, color: k.color })), u = o.length - r.length, l = t.label, g = ls[t.kind] ?? t.kind, I = ((D = t.children) != null && D.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((V = t.children) != null && V.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const h = e.measureText(l).width;
    e.font = "11px system-ui, sans-serif";
    const f = Math.max(
      e.measureText(g).width,
      ...n.map((k) => e.measureText(k).width),
      ...r.map((k) => e.measureText(k.label).width + 12),
      e.measureText(I).width
    ), d = Math.min(300, Math.max(h, f) + 24), c = r.length ? 8 + r.length * 15 + (u > 0 ? 15 : 0) : 0, m = 40 + n.length * 15 + c + (I ? 18 : 0), w = this.radiusOf(t) * this.cam.k, $ = this.cam.x + t.x * this.cam.k, b = this.cam.y + t.y * this.cam.k;
    let P = $ + w + 14;
    P + d > i - 8 && (P = $ - w - 14 - d), P = Math.max(8, Math.min(P, i - d - 8));
    const R = Math.max(8, Math.min(b - 10, s - m - 8));
    e.translate(P, R), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, d, m, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(l, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", n.forEach((k, _) => e.fillText(k, 12, 41 + _ * 15));
    let N = 41 + n.length * 15 + (r.length ? 8 : 0);
    r.forEach((k) => {
      e.fillStyle = k.color, e.beginPath(), e.arc(15, N + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(k.label, 24, N), N += 15;
    }), u > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${u} más`, 24, N)), I && (e.fillStyle = "#94a3b8", e.fillText(I, 12, m - 16)), e.restore();
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
    return C`
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
        ${this._sugs.length ? C`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => C`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (ls[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? C`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        ${this._viewNaming ? C`
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
            ` : C`<button
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
ke.styles = vt`
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
  ae({ type: Boolean, reflect: !0 })
], ke.prototype, "shifted", 2);
Ye([
  ae({ attribute: !1 })
], ke.prototype, "model", 2);
Ye([
  U()
], ke.prototype, "_q", 2);
Ye([
  U()
], ke.prototype, "_sugs", 2);
Ye([
  U()
], ke.prototype, "_active", 2);
Ye([
  U()
], ke.prototype, "_motion", 2);
Ye([
  U()
], ke.prototype, "_threads", 2);
Ye([
  U()
], ke.prototype, "_viewNaming", 2);
Ye([
  U()
], ke.prototype, "_viewName", 2);
ke = Ye([
  wt("modux-explorer")
], ke);
var Wc = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Vc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Wc(t, i, o), o;
};
const ws = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Hc = Object.keys(ws);
function Bt(e, t, i) {
  const s = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, n = i.y + i.h / 2;
  let r = 0, u = 1;
  const l = t.x - e.x, g = t.y - e.y;
  for (const [I, h] of [
    [-l, e.x - s],
    [l, o - e.x],
    [-g, e.y - a],
    [g, n - e.y]
  ]) {
    if (I === 0) {
      if (h < 0) return !1;
      continue;
    }
    const f = h / I;
    if (I < 0) {
      if (f > u) return !1;
      f > r && (r = f);
    } else {
      if (f < r) return !1;
      f < u && (u = f);
    }
  }
  return u - r > 0.02;
}
function Gc(e, t, i = 28) {
  var l;
  const s = new Map(e.nodes.map((g) => [g.id, g])), o = (g) => {
    var h;
    const I = /* @__PURE__ */ new Set();
    for (let f = g; f; f = (h = s.get(f)) == null ? void 0 : h.parentId) I.add(f);
    return I;
  }, a = e.nodes, n = (g) => g.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), u = (g, I, h) => {
    const f = n(h), d = { x: h.x, y: h.y, w: h.w + 2 * f, h: h.h + 2 * f }, c = h.w / 2 + f * 1.5, m = h.h / 2 + f * 1.5, w = { x: h.x - c, y: h.y - m }, $ = { x: h.x + c, y: h.y - m }, b = { x: h.x - c, y: h.y + m }, P = { x: h.x + c, y: h.y + m }, R = [];
    for (const N of [w, $, b, P])
      !Bt(g, N, d) && !Bt(N, I, d) && R.push([N]);
    for (const [N, D] of [
      [w, $],
      [$, w],
      [$, P],
      [P, $],
      [P, b],
      [b, P],
      [b, w],
      [w, b]
    ])
      !Bt(g, N, d) && !Bt(D, I, d) && R.push([N, D]);
    return R;
  };
  for (const g of e.edges) {
    if ((l = t[g.id]) != null && l.length) continue;
    const I = s.get(g.sourceId), h = s.get(g.targetId);
    if (!I || !h) continue;
    const f = /* @__PURE__ */ new Set([...o(I.id), ...o(h.id)]), d = [
      { x: I.x, y: I.y },
      { x: h.x, y: h.y }
    ];
    for (let c = 0; c < 12; c++) {
      let m = !1;
      e: for (let w = 0; w < d.length - 1; w++)
        for (const $ of a) {
          if (f.has($.id)) continue;
          const b = n($), P = { x: $.x, y: $.y, w: $.w + 2 * b, h: $.h + 2 * b };
          if (!Bt(d[w], d[w + 1], P)) continue;
          const R = u(d[w], d[w + 1], $);
          if (!R.length) continue;
          const N = (V) => a.some(
            (k) => k !== $ && !f.has(k.id) && Math.abs(V.x - k.x) < k.w / 2 + n(k) / 2 && Math.abs(V.y - k.y) < k.h / 2 + n(k) / 2
          ), D = (V) => {
            let k = 0;
            const _ = [d[w], ...V, d[w + 1]];
            for (let B = 0; B < _.length - 1; B++)
              k += Math.hypot(_[B + 1].x - _[B].x, _[B + 1].y - _[B].y);
            return k + (V.some(N) ? 1e4 : 0);
          };
          R.sort((V, k) => D(V) - D(k)), d.splice(w + 1, 0, ...R[0]), m = !0;
          break e;
        }
      if (!m) break;
    }
    d.length > 2 && r.set(
      g.id,
      d.slice(1, -1).map((c) => ({ x: Math.round(c.x), y: Math.round(c.y) }))
    );
  }
  return r;
}
const se = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function Mo(e, t) {
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
function jc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let G = class extends Fe {
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
          ["context-map", "workflows", "ui", "design", "mappings", "explorer", "integrations"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
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
      const r = (u, l) => (u ?? []).some((g) => g.id === l || r(g.children, l));
      if (o) {
        const u = ve(o);
        if (!(u != null && u.itemId) || u.itemId === a.itemId || a.appId === u.appId && r(n.entry.children, u.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: u.appId,
          itemId: a.itemId,
          parentId: u.itemId
        });
        return;
      }
      if (s) {
        const u = ve(s);
        if (!(u != null && u.itemId) || u.itemId === a.itemId) return;
        const l = this.menuEntryIn(u.appId, u.itemId);
        if (!l || a.appId === u.appId && r(n.entry.children, u.itemId) || a.appId === u.appId && l.parentId === n.parentId && n.beforeId === u.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: u.appId,
          itemId: a.itemId,
          parentId: l.parentId ?? void 0,
          beforeItemId: u.itemId
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
      const r = JSON.parse(JSON.stringify(n.node)), { ops: u } = this.rebuildComponentOps(i, r, o ?? void 0, a);
      for (const l of u) this.command(l, !1);
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
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = pi(this.layout[i]);
    this._detail = e, this._paletteOpen = !0, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const o = pi(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...o, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const a = this.viewLayout("context-map"), n = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), r = Bi(n), u = [...r.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: a.nodes[g] ?? null
    })), l = { ...a.nodes };
    for (const [g, I] of r) {
      const h = n.find((d) => d.id === g), f = a.nodes[g] ?? { x: h.x, y: h.y };
      l[g] = {
        x: Math.round(f.x + (I.x - h.x)),
        y: Math.round(f.y + (I.y - h.y))
      };
    }
    this.writeViewLayout("context-map", { ...a, nodes: l }), u.length && this.pushUndoEntry(u);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Gc(e, t);
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
    var t, i, s, o, a, n, r, u, l, g, I, h, f;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const d = this.model.relations.find(
          (c) => c.sourceId === e.sourceId && c.targetId === e.targetId
        );
        return d && d.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: d.type }] : null;
      }
      case "set-relation-type": {
        const d = this.model.relations.find(
          (c) => c.sourceId === e.sourceId && c.targetId === e.targetId
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
        const d = (this.model.uiApps ?? []).find((c) => c.id === e.appId);
        return [{ kind: "set-app-header-page", appId: e.appId, pageId: (d == null ? void 0 : d.headerPageId) ?? null }];
      }
      case "set-app-model": {
        const d = (this.model.uiApps ?? []).find((c) => c.id === e.appId);
        return [{ kind: "set-app-model", appId: e.appId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "add-model":
        return [{ kind: "remove-model", id: e.id }];
      case "add-model-mapping":
        return [{ kind: "remove-model-mapping", id: e.id }];
      case "remove-model-mapping": {
        const d = (this.model.modelMappings ?? []).find((c) => c.id === e.id);
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
        const c = [{ kind: "add-model", id: d.id, name: d.name }];
        for (const m of this.model.pages ?? []) {
          m.modelId === e.id && c.push({ kind: "set-page-model", pageId: m.id, modelId: e.id });
          const w = ($) => {
            for (const b of $ ?? [])
              b.modelId === e.id && c.push({ kind: "set-page-component", pageId: m.id, componentId: b.id, modelId: e.id }), w(b.children);
          };
          w(m.content);
        }
        for (const m of this.model.uiApps ?? [])
          m.modelId === e.id && c.push({ kind: "set-app-model", appId: m.id, modelId: e.id });
        return c;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), c = e.kind === "set-crud-detail";
        return [{
          kind: e.kind,
          pageId: e.pageId,
          targetId: (c ? d == null ? void 0 : d.crudDetailPageId : d == null ? void 0 : d.crudCreatePageId) ?? null,
          toAppId: (c ? d == null ? void 0 : d.crudDetailAppId : d == null ? void 0 : d.crudCreateAppId) ?? null
        }];
      }
      case "set-app-view-page": {
        const d = (this.model.uiApps ?? []).find((c) => c.id === e.appId);
        return [{ kind: "set-app-view-page", appId: e.appId, pageId: (d == null ? void 0 : d.viewPageId) ?? null }];
      }
      case "set-app-edit-page": {
        const d = (this.model.uiApps ?? []).find((c) => c.id === e.appId);
        return [{ kind: "set-app-edit-page", appId: e.appId, pageId: (d == null ? void 0 : d.editPageId) ?? null }];
      }
      case "set-app-home-page": {
        const d = (this.model.uiApps ?? []).find((c) => c.id === e.appId);
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
        const d = (((t = (this.model.pages ?? []).find((c) => c.id === e.pageId)) == null ? void 0 : t.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === e.itemId);
        return d ? [{ kind: "set-wizard-step-page", pageId: e.pageId, itemId: e.itemId, targetId: d.pageId ?? null }] : null;
      }
      case "move-page-wizard-step": {
        const d = (((i = (this.model.pages ?? []).find((m) => m.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), c = d.indexOf(e.targetId);
        return c < 0 ? null : [{
          kind: "move-page-wizard-step",
          pageId: e.pageId,
          targetId: e.targetId,
          beforeItemId: d[c + 1] ?? null
        }];
      }
      case "remove-page-wizard-step": {
        const d = (((s = (this.model.pages ?? []).find((c) => c.id === e.pageId)) == null ? void 0 : s.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === e.targetId);
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
        const c = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
        d.headerPageId && c.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && c.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && c.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && c.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && c.push({
          kind: "set-app-home-page",
          appId: d.id,
          pageId: d.homePageId ?? null,
          toAppId: d.homeAppId ?? null
        });
        const m = (w, $) => {
          for (const b of w ?? [])
            c.push({
              kind: "add-menu-item",
              appId: d.id,
              label: b.label,
              itemId: b.id,
              parentId: $ == null ? void 0 : $.id,
              parentLabel: $ && !$.id ? $.label : void 0,
              pageId: b.pageId ?? null
            }), b.uiAdapterId && c.push({ kind: "set-menu-app", appId: d.id, toAppId: b.uiAdapterId, itemId: b.id, label: b.label }), b.useCaseId && c.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: b.useCaseId, itemId: b.id, label: b.label }), b.aggregateId && c.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: b.aggregateId, itemId: b.id, label: b.label }), b.queryOperationId && c.push({
              kind: "set-menu-query-operation",
              appId: d.id,
              queryServiceId: b.queryServiceId ?? null,
              queryOperationId: b.queryOperationId,
              itemId: b.id,
              label: b.label
            }), m(b.children, b);
        };
        m(d.menuItems);
        for (const w of this.model.actorAppUses ?? [])
          w.appId === e.id && c.push({ kind: "add-actor-app", actorId: w.actorId, appId: e.id });
        return c;
      }
      case "delete-ui-page": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.id);
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
          c.push(...this.rebuildComponentOps(d.id, m, void 0, null).ops);
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
        return [{ kind: "remove-menu-item", appId: e.appId, itemId: e.itemId, label: e.label }];
      case "remove-menu-item":
      case "set-menu-page":
      case "set-menu-app":
      case "set-menu-use-case":
      case "set-menu-aggregate":
      case "set-menu-query-operation": {
        const d = (this.model.uiApps ?? []).find((w) => w.id === e.appId), c = (w) => {
          for (const $ of w ?? []) {
            if (e.itemId ? $.id === e.itemId : $.label === e.label) return $;
            const b = c($.children);
            if (b) return b;
          }
          return null;
        }, m = e.itemId || e.label ? c(d == null ? void 0 : d.menuItems) : null;
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
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
        return c ? [{ kind: "add-page-button", pageId: e.pageId, useCaseId: e.useCaseId, label: c.label }] : null;
      }
      case "rename-ui-page": {
        const d = (this.model.pages ?? []).find((c) => c.id === e.pageId);
        return d ? [{ kind: "rename-ui-page", pageId: e.pageId, name: d.name }] : null;
      }
      case "set-page-type": {
        const d = (this.model.pages ?? []).find((c) => c.id === e.pageId);
        return d ? [{ kind: "set-page-type", pageId: e.pageId, pageType: d.type ?? "FORM" }] : null;
      }
      case "set-page-route": {
        const d = (this.model.pages ?? []).find((c) => c.id === e.pageId);
        return d != null && d.route ? [{ kind: "set-page-route", pageId: e.pageId, path: d.route }] : null;
      }
      case "set-page-button": {
        const d = (this.model.pages ?? []).find((m) => m.id === e.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((m) => m.useCaseId === e.useCaseId);
        return c ? [{
          kind: "set-page-button",
          pageId: e.pageId,
          useCaseId: e.useCaseId,
          label: c.label ?? null,
          mappingId: c.mappingId ?? null
        }] : null;
      }
      case "add-page-component":
        return [{ kind: "remove-page-component", pageId: e.pageId, componentId: e.componentId }];
      case "set-page-component":
      case "remove-page-component":
      case "move-page-component": {
        const d = (this.model.pages ?? []).find((P) => P.id === e.pageId);
        let c = null, m = null, w = null;
        const $ = (P, R) => {
          var D;
          const N = P ?? [];
          for (let V = 0; V < N.length; V++)
            N[V].id === e.componentId && (c = N[V], m = R, w = ((D = N[V + 1]) == null ? void 0 : D.id) ?? null), $(N[V].children, N[V]);
        };
        if ($(d == null ? void 0 : d.content, null), !c) return null;
        const b = c;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: b.title ?? null,
          text: b.text ?? null,
          label: b.label ?? null,
          useCaseId: b.useCaseId ?? null,
          mappingId: b.mappingId ?? null,
          modelId: b.modelId ?? null,
          queryServiceId: b.queryServiceId ?? null,
          queryOperationId: b.queryOperationId ?? null,
          fieldId: b.fieldId ?? null,
          stereotype: b.stereotype ?? null,
          colspan: b.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: m === null ? null : m.id,
          beforeComponentId: w
        }] : this.rebuildComponentOps(
          e.pageId,
          b,
          m === null ? void 0 : m.id,
          w
        ).ops;
      }
      case "set-page-listing": {
        const d = (this.model.pages ?? []).find((c) => c.id === e.pageId);
        return [{ kind: "set-page-listing", pageId: e.pageId, queryServiceId: (d == null ? void 0 : d.listingQueryServiceId) ?? null }];
      }
      case "set-page-model": {
        const d = (this.model.pages ?? []).find((c) => c.id === e.pageId);
        return [{ kind: "set-page-model", pageId: e.pageId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "set-page-field-config": {
        const d = (((o = (this.model.pages ?? []).find((c) => c.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).find((c) => c.fieldId === e.fieldId);
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
        const d = (((a = (this.model.pages ?? []).find((c) => c.id === e.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((c) => c.fieldId);
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
        const c = this.model.relations.filter(
          (m) => (m.sourceId === e.id || m.targetId === e.id) && m.type != null
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
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const d = (this.model.aggregates ?? []).find((c) => c.id === e.id);
        return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, moduleId: d.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const d of this.model.modules) {
          const c = (d.queryServices ?? []).find((m) => m.id === e.id);
          if (c) return [{ kind: "add-query-service", id: c.id, name: c.name, moduleId: d.id }];
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
          (c) => c.sourceId === e.sourceId && c.targetId === e.targetId
        );
        return d ? [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: d.type }] : [{ kind: "remove-external-dependency", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "remove-external-dependency": {
        const d = (this.model.externalSystemDependencies ?? []).find(
          (c) => c.sourceId === e.sourceId && c.targetId === e.targetId
        );
        return [{ kind: "add-external-dependency", sourceId: e.sourceId, targetId: e.targetId, type: d == null ? void 0 : d.type }];
      }
      case "add-proxy-api":
        return [{ kind: "remove-proxy-api", id: e.id }];
      case "remove-proxy-api": {
        const d = (this.model.proxyApis ?? []).find((c) => c.id === e.id);
        return d ? [{
          kind: "add-proxy-api",
          id: d.id,
          name: d.name,
          targetId: d.targetApiId,
          moduleId: d.publishedByExternalSystemId
        }] : null;
      }
      case "set-proxy-target": {
        const d = (this.model.proxyApis ?? []).find((c) => c.id === e.id);
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
          (c) => c.apiId === e.apiId && c.operationId === e.operationId && c.moduleId === e.moduleId
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
          (c) => c.apiId === e.apiId && c.operationId === e.operationId && c.moduleId === e.moduleId
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
        const d = (this.model.apis ?? []).find((c) => c.id === e.id) ?? (this.model.proxyApis ?? []).find((c) => c.id === e.id);
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
          const c = (d.useCases ?? []).find((m) => m.id === e.id);
          if (c)
            return [
              { kind: "add-use-case", id: c.id, name: c.name, moduleId: d.id, policy: c.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const d of this.model.externalSystems) {
          const c = (d.useCases ?? []).find((m) => m.id === e.id);
          if (c)
            return [{ kind: "add-external-use-case", id: c.id, name: c.name, moduleId: d.id }];
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
        const c = [
          { kind: "add-notification", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: (d.channels ?? [])[0] }
        ];
        d.eventId && c.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
        for (const m of d.recipientRoleIds ?? []) c.push({ kind: "add-notification-recipient", id: d.id, roleId: m });
        return c;
      }
      case "set-notification-event": {
        const d = (this.model.notifications ?? []).find((c) => c.id === e.id);
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
        const c = [
          { kind: "add-document", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: d.kind }
        ];
        return d.modelId && c.push({ kind: "set-document-model", id: d.id, modelId: d.modelId }), d.queryServiceId && c.push({ kind: "set-document-query", id: d.id, queryServiceId: d.queryServiceId, queryOperationId: d.queryOperationId ?? null }), c;
      }
      case "set-document-model": {
        const d = (this.model.documents ?? []).find((c) => c.id === e.id);
        return [{ kind: "set-document-model", id: e.id, modelId: (d == null ? void 0 : d.modelId) ?? null }];
      }
      case "set-document-query": {
        const d = (this.model.documents ?? []).find((c) => c.id === e.id);
        return [{ kind: "set-document-query", id: e.id, queryServiceId: (d == null ? void 0 : d.queryServiceId) ?? null, queryOperationId: (d == null ? void 0 : d.queryOperationId) ?? null }];
      }
      case "add-identity-provider":
        return [{ kind: "remove-identity-provider", id: e.id }];
      case "remove-identity-provider": {
        const d = (this.model.identityProviders ?? []).find((m) => m.id === e.id);
        if (!d) return null;
        const c = [
          { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
        ];
        d.publishedByExternalSystemId && c.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
        for (const m of this.model.modules)
          m.identityProviderId === e.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        for (const m of this.model.uiApps ?? [])
          m.identityProviderId === e.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        for (const m of this.model.etlFlows ?? [])
          m.identityProviderId === e.id && c.push({ kind: "set-identity-provider", id: m.id, targetId: e.id });
        return c;
      }
      case "set-idp-publisher": {
        const d = (this.model.identityProviders ?? []).find((c) => c.id === e.id);
        return [{ kind: "set-idp-publisher", id: e.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
      }
      case "set-identity-provider": {
        const d = ((n = this.model.modules.find((c) => c.id === e.id)) == null ? void 0 : n.identityProviderId) ?? ((r = (this.model.uiApps ?? []).find((c) => c.id === e.id)) == null ? void 0 : r.identityProviderId) ?? ((u = (this.model.etlFlows ?? []).find((c) => c.id === e.id)) == null ? void 0 : u.identityProviderId) ?? null;
        return [{ kind: "set-identity-provider", id: e.id, targetId: d }];
      }
      case "add-etl-flow":
        return [{ kind: "remove-etl-flow", id: e.id }];
      case "remove-etl-flow": {
        const d = (this.model.etlFlows ?? []).find((c) => c.id === e.id);
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
        return [{ kind: "remove-etl-step", etlFlowId: e.etlFlowId, id: e.id }];
      case "remove-etl-step": {
        const d = (((l = (this.model.etlFlows ?? []).find((c) => c.id === e.etlFlowId)) == null ? void 0 : l.steps) ?? []).find((c) => c.id === e.id);
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
        ), c = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((m) => m.id === e.id);
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
        const d = this.model.modules.flatMap((c) => c.scheduledTriggers ?? []).find((c) => c.id === e.id);
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
        const d = this.model.externalSystems.find((c) => c.id === e.id);
        return d ? [{ kind: "add-external-system", id: d.id, name: d.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const d = (this.model.aiAgents ?? []).find((c) => c.id === e.id);
        return d ? [
          { kind: "add-ai-agent", id: d.id, name: d.name, external: d.external },
          ...(this.model.agentUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-use", sourceId: e.id, targetId: c.useCaseId })),
          ...(this.model.agentExternalUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({
            kind: "add-agent-external-use",
            sourceId: e.id,
            targetId: c.externalUseCaseId
          })),
          ...(this.model.agentMcpUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-mcp", sourceId: e.id, targetId: c.mcpServerId })),
          ...(this.model.agentGatewayUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-gateway", sourceId: e.id, targetId: c.gatewayId })),
          ...(this.model.agentApiOpUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({
            kind: "add-agent-api-operation",
            sourceId: e.id,
            targetId: c.apiOperationId
          })),
          ...(this.model.agentQueryUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-query", sourceId: e.id, targetId: c.queryServiceId })),
          ...(this.model.agentRags ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-rag", sourceId: e.id, targetId: c.ragId })),
          ...(this.model.agentDelegations ?? []).filter((c) => c.agentId === e.id || c.delegateAgentId === e.id).map((c) => ({
            kind: "add-agent-delegate",
            sourceId: c.agentId,
            targetId: c.delegateAgentId
          })),
          ...(this.model.actorAgentUses ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-actor-agent", sourceId: c.actorId, targetId: e.id })),
          ...(this.model.agentTriggers ?? []).filter((c) => c.agentId === e.id).map((c) => ({ kind: "add-agent-trigger", sourceId: c.eventId, targetId: e.id }))
        ] : null;
      }
      case "add-mcp-gateway":
        return [{ kind: "remove-mcp-gateway", id: e.id }];
      case "remove-mcp-gateway": {
        const d = (this.model.mcpGateways ?? []).find((c) => c.id === e.id);
        return d ? [
          { kind: "add-mcp-gateway", id: d.id, name: d.name },
          ...[
            ...d.mcpServerIds ?? [],
            ...d.apiIds ?? [],
            ...d.apiOperationIds ?? [],
            ...d.useCaseIds ?? [],
            ...d.ragIds ?? []
          ].map((c) => ({ kind: "add-gateway-exposure", sourceId: e.id, targetId: c })),
          ...(this.model.agentGatewayUses ?? []).filter((c) => c.gatewayId === e.id).map((c) => ({ kind: "add-agent-gateway", sourceId: c.agentId, targetId: e.id }))
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
          const c = (d.mcpServers ?? []).find((m) => m.id === e.id);
          if (c)
            return [
              { kind: "add-mcp-server", id: c.id, name: c.name, moduleId: d.id, uri: c.uri },
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
        const d = (this.model.rags ?? []).find((c) => c.id === e.id);
        return d ? [
          { kind: "add-rag", id: d.id, name: d.name },
          ...(this.model.agentRags ?? []).filter((c) => c.ragId === e.id).map(
            (c) => ({
              kind: "add-agent-rag",
              sourceId: c.agentId,
              targetId: e.id
            })
          ),
          ...(d.sourceReadModelIds ?? []).map(
            (c) => ({ kind: "add-rag-source", sourceId: e.id, targetId: c })
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
        const d = (this.model.actors ?? []).find((c) => c.id === e.id);
        return d ? [{ kind: "add-actor", id: d.id, name: d.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const d of this.model.modules) {
          const c = (d.applicationEvents ?? []).find((m) => m.id === e.id);
          if (c)
            return [{ kind: "add-application-event", id: c.id, name: c.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const d of this.model.modules) {
          const c = (d.domainServices ?? []).find((m) => m.id === e.id);
          if (c) return [{ kind: "add-domain-service", id: c.id, name: c.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const d = (this.model.projections ?? []).find((c) => c.id === e.id);
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
          const c = (d.tables ?? []).find((m) => m.id === e.id);
          if (c) return [{ kind: "add-external-table", id: c.id, name: c.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const d = (I = (g = (this.model.rags ?? []).find((c) => c.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : I.find((c) => c.uri === e.uri);
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
        const d = (this.model.apis ?? []).find((c) => c.id === e.id);
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
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const d = (h = (this.model.apis ?? []).find((c) => c.id === e.apiId)) == null ? void 0 : h.operations.find((c) => c.id === e.id);
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
        const d = (f = (this.model.apis ?? []).find((c) => c.id === e.apiId)) == null ? void 0 : f.operations.find((c) => c.id === e.id);
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
          const c = (d.readModels ?? []).find((m) => m.id === e.id);
          if (c != null && c.aggregateId)
            return [{ kind: "add-read-model", id: c.id, name: c.name, aggregateId: c.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const d of this.model.modules) {
          const c = (d.domainEvents ?? []).find((m) => m.id === e.id);
          if (c) return [{ kind: "add-domain-event", id: c.id, name: c.name, moduleId: d.id }];
        }
        return null;
      }
      case "rename-element": {
        const c = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((m) => m.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((m) => m.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((m) => m.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((m) => m.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((m) => m.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((m) => m.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((m) => m.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((m) => m.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((m) => m.id === e.id);
        return c ? [{ kind: "rename-element", type: e.type, id: e.id, name: c.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const d = this.model.flows.find((c) => c.id === e.id);
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
        const d = (this.model.views ?? []).find((c) => c.id === e.id);
        return d ? [{ kind: "add-view", id: d.id, name: d.name, memberIds: d.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const d = (this.model.processes ?? []).find((w) => w.id === e.processId), c = (d == null ? void 0 : d.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!d || c < 0) return null;
        const m = d.steps[c];
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
            afterStepId: c > 0 ? d.steps[c - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const d = (this.model.processes ?? []).find((m) => m.id === e.processId), c = (d == null ? void 0 : d.steps.findIndex((m) => m.id === e.id)) ?? -1;
        return !d || c < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: c > 0 ? d.steps[c - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const d = (this.model.processes ?? []).find((m) => m.id === e.processId), c = d == null ? void 0 : d.steps.find((m) => m.id === e.id);
        return c ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: c.roleId,
            deadline: c.deadline,
            compensationUseCaseId: c.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const d = (this.model.processes ?? []).find((c) => c.id === e.id);
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
        const d = (this.model.workflows ?? []).find((c) => c.id === e.id);
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
        const d = (this.model.workflows ?? []).find((w) => w.id === e.workflowId), c = (d == null ? void 0 : d.steps.findIndex((w) => w.id === e.id)) ?? -1;
        if (!d || c < 0) return null;
        const m = d.steps[c];
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
            afterStepId: c > 0 ? d.steps[c - 1].id : void 0
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
        const d = (this.model.workflows ?? []).find((m) => m.id === e.workflowId), c = d == null ? void 0 : d.steps.find((m) => m.id === e.id);
        return c ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: c.emittedEventName,
            targetUseCaseId: c.targetUseCaseId,
            completionEventName: c.completionEventName
          }
        ] : null;
      }
      case "set-workflow-trigger": {
        const d = (this.model.workflows ?? []).find((c) => c.id === e.id);
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
    const u = this.sceneFor(o), l = u.nodes.find((I) => I.id === t);
    if (l != null && l.parentId) {
      const I = u.nodes.find((h) => h.id === l.parentId);
      I && (r = { x: i - I.x, y: s - I.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: o, id: t, pos: n }];
    if (o === "processes") {
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
    const { id: t, targetId: i, x: s, y: o } = e.detail, a = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!a || i && !this.model.externalSystems.some((d) => d.id === i)) return;
    const n = a.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === n) return;
    const u = this._view, l = this.viewLayout(u), g = this.sceneFor(u), I = r ? g.nodes.find((d) => d.id === r) : void 0, h = I ? { x: s - I.x, y: o - I.y } : { x: s, y: o }, f = [
      { kind: "set-api-publisher", id: t, targetId: n },
      { kind: "move-node", view: u, id: t, pos: l.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(u, { ...l, nodes: { ...l.nodes, [t]: h } }), this.pushUndoEntry(f);
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
    const u = `proxy-${se(a.name)}-${se(n.name)}`;
    if ((this.model.proxyApis ?? []).some((d) => d.id === u)) return;
    const l = this._view, g = this.viewLayout(l), h = this.sceneFor(l).nodes.find((d) => d.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: u,
        name: `${a.name}@${n.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: u }];
    h && (f.push({ kind: "move-node", view: l, id: u, pos: g.nodes[u] ?? null }), this.writeViewLayout(l, {
      ...g,
      nodes: { ...g.nodes, [u]: { x: s - h.x, y: o - h.y } }
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
    var r, u, l;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), o = this.selectedApiId(), a = o ? null : ((u = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : u.id) ?? null, n = o || a ? null : ((l = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null;
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
    for (const { id: r, x: u, y: l } of t) {
      n.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let g = { x: u, y: l };
      const I = o.nodes.find((h) => h.id === r);
      if (I != null && I.parentId) {
        const h = o.nodes.find((f) => f.id === I.parentId);
        h && (g = { x: u - h.x, y: l - h.y });
      }
      a[r] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: a }), i === "processes")
      for (const { id: r } of t) {
        const u = this.stepReorderCommand(r);
        if (u) {
          const l = this.inverseOf(u);
          l && n.unshift(...l), this.command(u, !1);
        }
      }
    this.pushUndoEntry(n);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: o, h: a } = e.detail, n = this._view, r = this.viewLayout(n), u = this.sceneFor(n).nodes.filter((I) => I.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: n, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: n, id: t, pos: r.nodes[t] ?? null },
      ...u.map((I) => ({ kind: "move-node", view: n, id: I.id, pos: r.nodes[I.id] ?? null }))
    ]);
    const l = { ...r.nodes, [t]: { x: i, y: s } };
    for (const I of u) l[I.id] = { x: I.x - i, y: I.y - s };
    this.writeViewLayout(n, {
      ...r,
      nodes: l,
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
    const i = qs(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((n) => [n.id, n.x])), o = [...t.steps].sort(
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
    var ie, ee, y, A;
    if (this._view === "context-map" && this._detail === "distribution") {
      const v = this.sceneFor("context-map"), x = this.model.codeModules ?? [], E = ((T) => {
        var M;
        for (let L = T; L; ) {
          if (x.some((q) => q.id === L)) return L;
          L = (M = v.nodes.find((q) => q.id === L)) == null ? void 0 : M.parentId;
        }
        return null;
      })(t);
      if (E && E !== e) {
        if ((this.model.services ?? []).some((M) => M.id === e)) {
          this.command({ kind: "add-service-code-module", serviceId: e, id: E });
          return;
        }
        if (!x.some((M) => M.id === e) && !this.model.modules.some((M) => M.id === e)) {
          this.command({ kind: "add-code-module-element", id: E, elementId: e });
          return;
        }
      }
    }
    if (this._view === "integrations") {
      const v = this._view;
      this._view = "context-map";
      try {
        this.applyConnection(e, t, i, s, o);
      } finally {
        this._view = v;
      }
      return;
    }
    if (this._view === "eventstorming") {
      const v = (S) => (this.model.customCodes ?? []).some((E) => E.id === S), x = v(t) ? { stepId: e, ccId: t } : v(e) ? { stepId: t, ccId: e } : null;
      if (x) {
        const S = this.owningUseCaseOf(x.stepId);
        S && this.command({
          kind: "set-use-case-step-custom-code",
          useCaseId: S.id,
          id: x.stepId,
          targetId: x.ccId
        });
        return;
      }
      return;
    }
    if (this._view === "workflows") {
      const v = this.model.workflowGateways ?? [], x = (M) => v.some((L) => L.id === M);
      if (x(e) || x(t) || (this.model.workflows ?? []).some((M) => M.id === t)) {
        if (e === t) return;
        this.command({ kind: "add-workflow-link", sourceId: e, targetId: t });
        return;
      }
      const S = this.owningWorkflowOf(e), E = this.owningWorkflowOf(t);
      if (!S || S !== E || e === t) return;
      const T = S.steps.find((M) => M.id === t);
      if (((T == null ? void 0 : T.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: S.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const v = this.model.pages ?? [], x = this.model.uiApps ?? [], S = (W) => x.some((Q) => Q.id === W), E = (W) => v.some((Q) => Q.id === W), T = (W) => (this.model.customCodes ?? []).some((Q) => Q.id === W);
      if (T(e) || T(t)) {
        const W = T(e) ? e : t, Q = T(e) ? t : e;
        if (T(Q)) return;
        if (E(Q)) {
          this.command({ kind: "set-page-custom-code", id: Q, targetId: W });
          return;
        }
        this.command({ kind: "add-custom-code-use", id: W, elementId: Q });
        return;
      }
      const M = this.model.buttonGroups ?? [], L = (W) => M.some((Q) => Q.id === W);
      if ((o === "toolbar" || o === "bottom") && L(e) && E(t)) {
        this.command({ kind: "add-page-bar-group", pageId: t, id: e, bar: o });
        return;
      }
      if (L(e) && L(t) && e !== t) {
        this.command({ kind: "add-group-subgroup", id: t, targetId: e });
        return;
      }
      const q = /^gbtn:([^:]+):(.+)$/.exec(e);
      if (q) {
        this.model.modules.some((Q) => (Q.useCases ?? []).some(($e) => $e.id === t)) ? this.command({ kind: "set-group-button-target", id: q[1], itemId: q[2], useCaseId: t }) : this.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
        return;
      }
      if (o === "home" && S(e) && (E(t) || S(t))) {
        if (t === e) return;
        this.command(
          E(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (o === "header" && S(e) && E(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((o === "crud-detail" || o === "crud-create") && E(e) && (E(t) || S(t)) && t !== e) {
        const W = o === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          E(t) ? { kind: W, pageId: e, targetId: t, toAppId: null } : { kind: W, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (o === "viewmodel" && E(e)) {
        (this.model.models ?? []).some((W) => W.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((o === "view" || o === "edit") && S(e) && E(t)) {
        this.command({
          kind: o === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (o) return;
      const j = (W) => /^wizrow:([^:]+):(.+)$/.exec(W), ne = j(e) ?? j(t);
      if (ne) {
        const W = j(e) ? t : e;
        E(W) && W !== ne[1] && this.command({ kind: "set-wizard-step-page", pageId: ne[1], itemId: ne[2], targetId: W });
        return;
      }
      const pe = v.find((W) => W.id === t && W.type === "WIZARD");
      if (E(e) && pe && e !== pe.id) {
        (pe.wizardSteps ?? []).some((W) => W.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: pe.id, targetId: e });
        return;
      }
      if (E(e) && S(t)) {
        const W = v.find(($e) => $e.id === e), Q = x.find(($e) => $e.id === t);
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
      const z = this.model.identityProviders ?? [], H = (W) => z.some((Q) => Q.id === W);
      if (H(e) || H(t)) {
        const W = H(e) ? e : t, Q = H(e) ? t : e;
        S(Q) ? this.command({ kind: "set-identity-provider", id: Q, targetId: W }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const de = (W) => (this.model.models ?? []).some((Q) => Q.id === W);
      if (de(e) || de(t)) {
        const W = de(e) ? e : t, Q = de(e) ? t : e;
        if (E(Q)) {
          this.command({ kind: "set-page-model", pageId: Q, modelId: W });
          return;
        }
        if (S(Q)) {
          this.command({ kind: "set-app-model", appId: Q, modelId: W });
          return;
        }
        return;
      }
      const me = ve(e);
      if (me != null && me.itemId && ((ie = ve(t)) != null && ie.itemId || S(t))) {
        const W = ve(t), Q = this.menuEntryIn(me.appId, me.itemId);
        if (!Q) return;
        if (W != null && W.itemId) {
          const $e = this.menuEntryIn(W.appId, W.itemId);
          if (!$e) return;
          const Me = (bt) => (bt ?? []).some((di) => di.id === W.itemId || Me(di.children));
          if (me.appId === W.appId && (W.itemId === me.itemId || Me(Q.entry.children)))
            return;
          const Le = (ee = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : ee.renderRoot.querySelector(`g[data-node-id="${t}"]`), Ce = Le == null ? void 0 : Le.getBoundingClientRect(), et = Ce && s !== void 0 ? (s - Ce.top) / Math.max(1, Ce.height) : 0.5, ri = et < 0.3 ? "before" : et > 0.7 ? "after" : "nest";
          if (ri === "nest")
            this.command({
              kind: "move-menu-item",
              appId: me.appId,
              toAppId: W.appId,
              itemId: me.itemId,
              parentId: W.itemId
            });
          else {
            const bt = ri === "before" ? W.itemId : $e.beforeId ?? void 0;
            if (me.appId === W.appId && $e.parentId === Q.parentId && bt === me.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: me.appId,
              toAppId: W.appId,
              itemId: me.itemId,
              parentId: $e.parentId ?? void 0,
              beforeItemId: bt
            });
          }
          return;
        }
        if (me.appId === t && !Q.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: me.appId,
          toAppId: t,
          itemId: me.itemId
        });
        return;
      }
      const Ue = ve(e) ?? ve(t);
      if (Ue) {
        const W = ve(e) ? e : t, Q = ve(e) ? t : e;
        if (((y = this.sceneFor("ui").nodes.find((Ce) => Ce.id === W)) == null ? void 0 : y.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const $e = this.model.modules.some(
          (Ce) => (Ce.useCases ?? []).some((et) => et.id === Q)
        ), Me = (this.model.aggregates ?? []).some((Ce) => Ce.id === Q), Le = this.model.modules.flatMap((Ce) => Ce.queryServices ?? []).find((Ce) => (Ce.operations ?? []).some((et) => et.id === Q));
        E(Q) ? this.command({ kind: "set-menu-page", pageId: Q, ...Ue }) : S(Q) && Q !== Ue.appId ? this.command({ kind: "set-menu-app", toAppId: Q, ...Ue }) : $e ? this.command({ kind: "set-menu-use-case", useCaseId: Q, ...Ue }) : Me ? this.command({ kind: "set-menu-aggregate", aggregateId: Q, ...Ue }) : Le && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Le.id,
          queryOperationId: Q,
          ...Ue
        });
        return;
      }
      if ((this.model.actors ?? []).some((W) => W.id === e) && S(t)) {
        (this.model.actorAppUses ?? []).some((W) => W.actorId === e && W.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const _e = E(e) ? { pageId: e, other: t } : E(t) ? { pageId: t, other: e } : null;
      if (_e) {
        const W = new Set(
          this.model.modules.flatMap((Me) => (Me.useCases ?? []).map((Le) => Le.id))
        ), Q = new Set(
          this.model.modules.flatMap((Me) => (Me.queryServices ?? []).map((Le) => Le.id))
        ), $e = v.find((Me) => Me.id === _e.pageId);
        W.has(_e.other) ? ($e.buttons ?? []).some((Me) => Me.useCaseId === _e.other) || this.command({ kind: "add-page-button", pageId: _e.pageId, useCaseId: _e.other }) : Q.has(_e.other) && this.command({ kind: "set-page-listing", pageId: _e.pageId, queryServiceId: _e.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [], x = as(e), S = as(t), E = this.model.transformations ?? [], T = this.model.customCodes ?? [], M = (z) => T.some((H) => H.id === z);
      if (M(e) && E.some((z) => z.id === t)) {
        this.command({ kind: "set-transformation-custom-code", id: t, targetId: e });
        return;
      }
      if (M(t) && E.some((z) => z.id === e)) {
        this.command({ kind: "set-transformation-custom-code", id: e, targetId: t });
        return;
      }
      if (M(e)) {
        const z = (S == null ? void 0 : S.modelId) ?? (v.some((H) => H.id === t) ? t : null);
        if (z) {
          const H = (this.model.modelMappings ?? []).filter(
            (de) => de.sourceModelId === z || de.targetModelId === z
          );
          H.length === 1 ? this.command({ kind: "set-mapping-custom-code", id: H[0].id, targetId: e }) : this.emit("modux-notice", {
            message: H.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
          });
          return;
        }
        return;
      }
      if (E.some((z) => z.id === t)) {
        if (S || E.some((H) => H.id === e)) return;
        const z = x ? { modelId: x.modelId, fieldId: x.fieldId } : v.some((H) => H.id === e) ? { modelId: e } : null;
        z && this.command({ kind: "add-transformation-input", id: t, ...z });
        return;
      }
      if (E.some((z) => z.id === e)) {
        const z = S ? { modelId: S.modelId, fieldId: S.fieldId } : v.some((H) => H.id === t) ? { modelId: t } : null;
        z && this.command({ kind: "set-transformation-output", id: e, ...z });
        return;
      }
      if (x && S) {
        if (x.modelId === S.modelId) {
          this.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
          return;
        }
        let z = (this.model.modelMappings ?? []).find(
          (H) => H.sourceModelId === x.modelId && H.targetModelId === S.modelId
        );
        if (!z) {
          const H = v.find((W) => W.id === x.modelId), de = v.find((W) => W.id === S.modelId);
          if (!H || !de) return;
          const me = (W) => W.replace(/[^a-zA-Z0-9]/g, ""), Ue = new Set((this.model.modelMappings ?? []).map((W) => W.id));
          let _e = `mapping-${se(H.name)}-${se(de.name)}`;
          for (let W = 2; Ue.has(_e); W++) _e = `mapping-${se(H.name)}-${se(de.name)}-${W}`;
          this.command(
            { kind: "add-model-mapping", id: _e, name: `${me(H.name)}2${me(de.name)}`, sourceId: H.id, targetId: de.id },
            !1
          ), z = { id: _e, name: "", sourceModelId: H.id, targetModelId: de.id };
        }
        this.command({
          kind: "add-model-mapping-rule",
          id: z.id,
          sourceId: x.fieldId,
          targetId: S.fieldId
        });
        return;
      }
      if (x && v.some((z) => z.id === t) && t !== x.modelId) {
        this.command({ kind: "move-model-field", modelId: x.modelId, fieldId: x.fieldId, targetId: t });
        return;
      }
      if (!v.some((z) => z.id === e) || !v.some((z) => z.id === t) || e === t || (this.model.modelMappings ?? []).some((z) => z.sourceModelId === e && z.targetModelId === t))
        return;
      const L = v.find((z) => z.id === e), q = v.find((z) => z.id === t), j = (z) => z.replace(/[^a-zA-Z0-9]/g, ""), ne = new Set((this.model.modelMappings ?? []).map((z) => z.id));
      let pe = `mapping-${se(L.name)}-${se(q.name)}`;
      for (let z = 2; ne.has(pe); z++) pe = `mapping-${se(L.name)}-${se(q.name)}-${z}`;
      this.command({
        kind: "add-model-mapping",
        id: pe,
        name: `${j(L.name)}2${j(q.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const a = /^apiop:(.+)@(.+)$/.exec(e);
    if (a) {
      const [, v, x] = a, S = (this.model.proxyApis ?? []).find((q) => q.id === x), E = (S == null ? void 0 : S.targetApiId) ?? ((A = (this.model.apiImplementations ?? []).find(
        (q) => q.moduleId === x && (this.model.apis ?? []).some(
          (j) => j.id === q.apiId && j.operations.some((ne) => ne.id === v)
        )
      )) == null ? void 0 : A.apiId);
      if (!E) return;
      if (new Set(
        this.model.modules.flatMap((q) => (q.useCases ?? []).map((j) => j.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: E,
          operationId: v,
          moduleId: x,
          targetUseCaseId: t
        });
        return;
      }
      if (!(S != null && S.targetApiId)) return;
      let M = null;
      if (t === S.targetApiId)
        M = S.targetApiId;
      else {
        const q = /^apiimpl:(.+)@(.+)$/.exec(t);
        q && q[1] === S.targetApiId ? M = q[2] : this.model.modules.some((j) => j.id === t) && (this.model.apiImplementations ?? []).some(
          (j) => j.apiId === S.targetApiId && j.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (q) => q.proxyId === S.id && q.operationId === v && q.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: S.id,
        operationId: v,
        targetSiteId: M
      });
      return;
    }
    const n = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (n.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((L) => L.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (L) => L.agentId === e && L.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.useCases ?? []).map((L) => L.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (L) => L.agentId === e && L.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((M) => (M.mcpServers ?? []).map((L) => L.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (L) => L.agentId === e && L.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((M) => M.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (L) => L.agentId === e && L.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((M) => M.operations.map((L) => L.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (L) => L.agentId === e && L.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (L) => L.agentId === e && L.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((M) => (M.queryServices ?? []).map((L) => L.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (L) => L.agentId === e && L.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (n.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (L) => L.agentId === e && L.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((M) => M.id === t) && ((this.model.agentRags ?? []).some(
        (L) => L.agentId === e && L.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find((E) => E.id === e), x = this.model.externalSystems.some((E) => (E.mcpServers ?? []).some((T) => T.id === t)) || (this.model.apis ?? []).some((E) => E.id === t) || (this.model.apis ?? []).some((E) => E.operations.some((T) => T.id === t)) || this.model.modules.some((E) => (E.useCases ?? []).some((T) => T.id === t)) || (this.model.rags ?? []).some((E) => E.id === t), S = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      x && !S && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const r = (this.model.rags ?? []).find((v) => v.id === e);
    if (r) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.readModels ?? []).map((E) => E.id))
      ).has(t) && !(r.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.tables ?? []).map((E) => E.id))
      ).has(t) && !(r.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((S) => S.id === t) || (this.model.proxyApis ?? []).some((S) => S.id === t)) && !(r.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((S) => S.id === t) && !(r.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((S) => S.id === t) && !(r.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((v) => v.id === t)) return;
    if ((this.model.workflows ?? []).some((v) => v.id === e)) {
      const v = (this.model.workflows ?? []).find((E) => E.id === e), x = (this.model.workflows ?? []).find(
        (E) => E.id === t && E.id !== e
      );
      if (x) {
        const E = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        x.triggerEvent !== E && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: E });
        return;
      }
      const S = this.model.modules.flatMap((E) => E.useCases ?? []).find((E) => E.id === t);
      if (S && !(v.steps ?? []).some((T) => T.targetUseCaseId === t)) {
        const T = `wfs-${se(S.name)}`;
        let M = T;
        for (let L = 2; (v.steps ?? []).some((q) => q.id === M); L++)
          M = `${T}-${L}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: M,
          name: S.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap((E) => E.domainEvents ?? []).find((E) => E.id === e), x = this.model.modules.flatMap((E) => E.applicationEvents ?? []).find((E) => E.id === e), S = v ?? x;
      if (S) {
        const E = (this.model.emissions ?? []).find((q) => q.domainEventId === e), T = new Set((this.model.aggregates ?? []).map((q) => q.id)), M = new Set(
          this.model.modules.flatMap((q) => (q.domainServices ?? []).map((j) => j.id))
        ), L = new Set(
          this.model.modules.flatMap((q) => (q.useCases ?? []).map((j) => j.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: S.name,
          triggerAggregateId: E && T.has(E.sourceId) ? E.sourceId : void 0,
          triggerDomainServiceId: E && M.has(E.sourceId) ? E.sourceId : void 0,
          triggerUseCaseId: E && L.has(E.sourceId) ? E.sourceId : void 0
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
          (S) => S.apiId === v.targetApiId && S.moduleId === t
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
    const u = new Set((this.model.actors ?? []).map((v) => v.id));
    if (n.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((x) => (x.domainEvents ?? []).map((S) => S.id)),
        ...this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map((S) => S.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (S) => S.eventId === e && S.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!u.has(e)) return;
    }
    if (u.has(e)) {
      const v = new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((E) => E.id))
      ), x = new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((E) => E.id))
      );
      if (v.has(t) || x.has(t)) {
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
    const l = this.owningApiOf(e);
    if (l) {
      if (new Set(
        this.model.modules.flatMap((x) => (x.useCases ?? []).map((S) => S.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: l.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((x) => x.id === t)) {
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
    const g = (v) => (this.model.notifications ?? []).find((x) => x.id === v);
    if (g(e) || g(t)) {
      const v = g(e) ?? g(t), x = g(e) ? t : e;
      if (this.model.modules.some(
        (E) => [...E.domainEvents ?? [], ...E.applicationEvents ?? []].some((T) => T.id === x)
      )) {
        v.eventId !== x && this.command({ kind: "set-notification-event", id: v.id, targetId: x });
        return;
      }
      if ((this.model.actors ?? []).some((E) => E.id === x)) {
        (v.recipientRoleIds ?? []).includes(x) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: x });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const I = (v) => (this.model.documents ?? []).find((x) => x.id === v);
    if (I(e) || I(t)) {
      const v = I(e) ?? I(t), x = I(e) ? t : e;
      if ((this.model.models ?? []).find((M) => M.id === x)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: x });
        return;
      }
      const E = this.model.modules.flatMap((M) => M.queryServices ?? []).find((M) => M.id === x), T = this.model.modules.flatMap((M) => (M.queryServices ?? []).flatMap((L) => (L.operations ?? []).map((q) => ({ op: q, qs: L })))).find(({ op: M }) => M.id === x);
      if (E || T) {
        this.command({
          kind: "set-document-query",
          id: v.id,
          queryServiceId: (E == null ? void 0 : E.id) ?? T.qs.id,
          queryOperationId: (T == null ? void 0 : T.op.id) ?? null
        });
        return;
      }
      this.emit("modux-notice", {
        message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
      });
      return;
    }
    const h = this.model.identityProviders ?? [], f = (v) => h.find((x) => x.id === v);
    if (f(e) || f(t)) {
      const v = f(e) ?? f(t), x = f(e) ? t : e;
      if (f(e) && this.model.externalSystems.some((T) => T.id === x)) {
        v.publishedByExternalSystemId !== x && this.command({ kind: "set-idp-publisher", id: v.id, targetId: x });
        return;
      }
      const S = this.model.modules.some((T) => T.id === x), E = (this.model.etlFlows ?? []).some((T) => T.id === x);
      if (S || E) {
        this.command({ kind: "set-identity-provider", id: x, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const d = this.model.etlFlows ?? [], c = (v) => d.find((x) => x.id === v);
    if (c(e) || c(t)) {
      const v = c(e) ?? c(t), x = c(e) ? t : e, S = !c(e), E = new Set(this.model.externalSystems.flatMap((H) => (H.tables ?? []).map((de) => de.id))), T = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((H) => H.id),
        ...(this.model.proxyApis ?? []).map((H) => H.id)
      ]), M = (this.model.apis ?? []).find((H) => H.operations.some((de) => de.id === x)), L = new Set(
        this.model.modules.flatMap((H) => [
          ...(H.domainEvents ?? []).map((de) => de.id),
          ...(H.applicationEvents ?? []).map((de) => de.id)
        ])
      );
      let q = null, j = {};
      if (E.has(x) ? (q = S ? "SOURCE_PULL" : "WRITE_DB", j = { externalTableId: x }) : M ? (q = S ? "SOURCE_PULL" : "WRITE_API", j = { apiId: M.id, operationId: x }) : T.has(x) ? (q = S ? "SOURCE_PULL" : "WRITE_API", j = { apiId: x }) : L.has(x) && (q = S ? "SOURCE_CONSUMER" : "WRITE_EVENT", j = { targetId: x }), !q) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (H) => H.type === q && (H.externalTableId ?? H.operationId ?? H.apiId ?? H.eventId) === (j.externalTableId ?? j.operationId ?? j.apiId ?? j.targetId)
      )) return;
      const pe = new Set((v.steps ?? []).map((H) => H.id));
      let z = (v.steps ?? []).length + 1;
      for (; pe.has(`ets-${z}`); ) z++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${z}`, stepType: q, ...j });
      return;
    }
    const m = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), w = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (m || w) {
      const v = (m ?? w).name, x = m ? { externalUseCaseId: e } : { externalTableId: e }, S = (M) => m ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, E = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if (E) {
        (this.model.projections ?? []).some(
          (L) => S(L) && L.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se(E.name)}`,
          name: `${E.name}Projection`,
          ...x,
          targetId: t
        });
        return;
      }
      const T = this.model.modules.find((M) => M.id === t);
      if (T) {
        (this.model.projections ?? []).some(
          (L) => S(L) && L.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se(v)}-${se(T.name)}`,
          name: `${v}ViewProjection`,
          ...x,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const $ = (this.model.aggregates ?? []).find((v) => v.id === e);
    if ($) {
      const v = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se($.name)}-${se(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const x = this.model.modules.find((S) => S.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (E) => E.sourceAggregateId === e && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${se($.name)}-${se(x.name)}`,
          name: `${$.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${$.name}View`
        });
        return;
      }
    }
    const b = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((x) => x.id))
    ), P = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((x) => x.id))
    ]), R = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((x) => x.id))
    ), N = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((x) => x.id))), D = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((x) => x.id))
    );
    if (N.has(e) && D.has(t)) {
      (this.model.queryCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const V = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((x) => x.id))
    );
    if (N.has(e) && V.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (N.has(e) && N.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const k = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (k && N.has(t)) {
      k.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (N.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (P.has(e) && b.has(t) || N.has(e) && R.has(t)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === e && x.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (b.has(e) || R.has(e)) {
      const v = R.has(e), x = this.model.modules.flatMap((z) => (v ? z.applicationEvents : z.domainEvents) ?? []).find((z) => z.id === e), S = this.model.modules.flatMap((z) => (z.useCases ?? []).map((H) => ({ u: H, module: z }))).find(({ u: z }) => z.id === t), E = this.model.modules.flatMap((z) => (z.readModels ?? []).map((H) => ({ rm: H, module: z }))).find(({ rm: z }) => z.id === t), T = this.model.modules.find((z) => z.id === t) ?? (E == null ? void 0 : E.module) ?? (S == null ? void 0 : S.module);
      if (!x || !T) return;
      const M = new Set((this.model.aggregates ?? []).map((z) => z.id)), L = new Set(
        this.model.modules.flatMap((z) => (z.domainServices ?? []).map((H) => H.id))
      ), q = (this.model.emissions ?? []).find(
        (z) => z.domainEventId === e && (v ? N.has(z.sourceId) : M.has(z.sourceId) || L.has(z.sourceId))
      );
      if (!q) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const j = !v && M.has(q.sourceId);
      if (S) {
        if (this.model.flows.some(
          (H) => H.archetype === "TRIGGERS" && H.triggerEvent === x.name && H.targetUseCaseId === S.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${se(x.name)}-${se(S.u.name)}`,
          name: S.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: j ? q.sourceId : "",
          triggerDomainServiceId: !v && !j ? q.sourceId : void 0,
          triggerUseCaseId: v ? q.sourceId : void 0,
          triggerEvent: x.name,
          targetId: T.id,
          targetUseCaseId: S.u.id
        });
        return;
      }
      const ne = (E == null ? void 0 : E.rm.name) ?? `${x.name}View`;
      if (this.model.flows.some(
        (z) => z.archetype === "MATERIALIZES" && z.triggerEvent === x.name && z.targetId === T.id && z.readModelName === ne
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${se(x.name)}-${se(ne)}`,
        name: ne,
        archetype: "MATERIALIZES",
        triggerAggregateId: j ? q.sourceId : "",
        triggerDomainServiceId: !v && !j ? q.sourceId : void 0,
        triggerUseCaseId: v ? q.sourceId : void 0,
        triggerEvent: x.name,
        targetId: T.id,
        readModelName: ne
      });
      return;
    }
    const _ = /* @__PURE__ */ new Set([
      ...P,
      ...N,
      ...D,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((x) => x.id))
    ]);
    if (_.has(e) || _.has(t) || b.has(t) || R.has(t))
      return;
    const B = new Set(this.model.externalSystems.map((v) => v.id));
    if (B.has(e)) {
      if (new Set(
        this.model.modules.flatMap((T) => (T.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (B.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const x = (this.model.apis ?? []).find(
        (T) => T.operations.some((M) => M.id === t)
      ), S = /^apiop:(.+)@(.+)$/.exec(t), E = x ? { operationId: t, siteId: x.id } : S ? { operationId: S[1], siteId: S[2] } : null;
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
      if ((this.model.apis ?? []).some((T) => T.id === t) || (this.model.proxyApis ?? []).some((T) => T.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (M) => M.sourceId === e && M.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    B.has(t) || u.has(t);
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
      const n = as(t);
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
      const [, r, u] = n, l = (s = (this.model.apis ?? []).find(
        (g) => g.operations.some((I) => I.id === r)
      )) == null ? void 0 : s.id;
      if (!l) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: l, operationId: r, moduleId: u });
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
      const [, r, u, l] = n, g = /^apiimpl:.+@(.+)$/.exec(l), I = g ? g[1] : l;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: u, operationId: r, targetSiteId: I });
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
    if ((this._view === "context-map" || this._view === "integrations") && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const n = /^etl:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: n[1], id: n[2] });
      return;
    }
    if ((this._view === "context-map" || this._view === "integrations") && e === "node" && i === "etl-flow") {
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
      for (let r = (o = n.nodes.find((u) => u.id === t)) == null ? void 0 : o.parentId; r; ) {
        if ((this.model.codeModules ?? []).some((u) => u.id === r)) {
          this._selectedId = null, this.command({ kind: "remove-code-module-element", id: r, elementId: t });
          return;
        }
        r = (a = n.nodes.find((u) => u.id === r)) == null ? void 0 : a.parentId;
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
    const t = new Set(e.memberIds), i = (o, a, n = {}) => C`
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
    `, s = (o, a) => a.length ? C`<h4>${o}</h4>${a}` : "";
    return C`
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
    const e = (this.model.views ?? []).find((f) => f.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((f) => t.has(f.id)), s = new Set(i.map((f) => f.id)), o = this.model.externalSystems.filter((f) => t.has(f.id)), a = new Set(o.map((f) => f.id)), n = (this.model.aggregates ?? []).filter(
      (f) => t.has(f.id) || s.has(f.moduleId)
    ), r = new Set(n.map((f) => f.id)), u = (this.model.uiApps ?? []).filter((f) => t.has(f.id)), l = /* @__PURE__ */ new Set(), g = (f) => {
      for (const d of f ?? [])
        d.pageId && l.add(d.pageId), g(d.children);
    };
    u.forEach((f) => g(f.menuItems));
    const I = (this.model.pages ?? []).filter(
      (f) => t.has(f.id) || l.has(f.id)
    ), h = new Set(u.map((f) => f.id));
    return {
      ...this.model,
      uiApps: u,
      pages: I,
      actorAppUses: (this.model.actorAppUses ?? []).filter((f) => h.has(f.appId)),
      modules: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (f) => s.has(f.sourceId) && s.has(f.targetId)
      ),
      flows: this.model.flows.filter(
        (f) => t.has(f.id) || (s.has(f.sourceId) || a.has(f.sourceId)) && (s.has(f.targetId) || a.has(f.targetId))
      ),
      aggregates: n,
      entities: (this.model.entities ?? []).filter((f) => r.has(f.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (f) => r.has(f.sourceAggregateId) && r.has(f.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (f) => t.has(f.id) || (f.ownerModuleId ? s.has(f.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
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
  /** Opening an element shows its ficha in the right drawer; unmapped kinds still navigate. */
  openInDrawer(e) {
    G.CRUD_ROUTES[e.elementType] ? this._drawer = e : this.emit("modux-activate", e);
  }
  renderDrawer() {
    if (!this._drawer) return null;
    const e = G.CRUD_ROUTES[this._drawer.elementType], t = this._drawer;
    return C`
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
    const t = e.detail.kind === "process-step" ? jc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const s = this.owningWorkflowOf(e.detail.id);
      return s ? { elementType: "workflow", id: s.id } : null;
    })() : Mo(e.detail.id, e.detail.kind);
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
      var u;
      const r = a ?? [];
      for (let l = 0; l < r.length; l++)
        r[l].id === t && (s = { node: r[l], parentId: n, beforeId: ((u = r[l + 1]) == null ? void 0 : u.id) ?? null }), o(r[l].children, r[l].id);
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
      const h = `cmp-${se(I.kind)}`;
      let f = h;
      for (let d = 2; n.has(f) || n.has(`${f}-tab-1`); d++) f = `${h}-${d}`;
      return n.add(f), f;
    }, u = [], l = (I, h) => {
      const f = r(I);
      u.push({ kind: "add-page-component", pageId: e, componentId: f, componentKind: I.kind, parentComponentId: h }), I.kind === "tabLayout" && (u.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-1` }), u.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-2` })), u.push({
        kind: "set-page-component",
        pageId: e,
        componentId: f,
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
      for (const d of I.children ?? []) l(d, f);
      return f;
    }, g = l(t, i);
    return s && u.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: u, rootId: g };
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
      var u;
      const r = a ?? [];
      for (let l = 0; l < r.length; l++)
        r[l].id === t && (s = { entry: r[l], parentId: n, beforeId: ((u = r[l + 1]) == null ? void 0 : u.id) ?? null }), o(r[l].children, r[l].id ?? null);
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
      t = this._selectedCmp.pageId, re.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, s = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (n = (r.node.children ?? [])[0]) == null ? void 0 : n.id : r.node.id;
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
    return C`<modux-figma
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
      const a = o === 1 ? e : `${e} ${o}`, n = `${t}${se(a)}`;
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
      const a = i.find((r) => (this.model.aggregates ?? []).some((u) => u.id === r));
      if (a) return a;
      const n = i.find((r) => this.model.modules.some((u) => u.id === r));
      return ((o = (this.model.aggregates ?? []).find((r) => r.moduleId === n)) == null ? void 0 : o.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((a) => this.model.externalSystems.some((n) => n.id === a)) ?? null;
    if (e === "model-field")
      return i.find((a) => (this.model.models ?? []).some((n) => n.id === a)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.modules.length === 1)
      return this.model.modules[0].id;
    if (e === "ui-button")
      return i.find((a) => (this.model.buttonGroups ?? []).some((n) => n.id === a)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (a) => this.model.modules.some((n) => (n.useCases ?? []).some((r) => r.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of i) {
        if ((this.model.apis ?? []).some((u) => u.id === a)) return a;
        const n = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (n && (this.model.apis ?? []).some((u) => u.id === n[1])) return n[1];
        const r = (this.model.proxyApis ?? []).find((u) => u.id === a);
        if (r != null && r.targetApiId) return r.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((a) => this.model.externalSystems.some((n) => n.id === a)) ?? i.find((a) => this.model.modules.some((n) => n.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var f, d;
    const o = G.PALETTE_NEW.find((c) => c.type === e);
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
      const c = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, m = c ? c[1] : i && (this.model.pages ?? []).some((b) => b.id === i) ? i : null;
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: w, name: $ } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: w, name: $ }, !1), c ? (this.command({ kind: "set-page-component-custom-code", pageId: m, componentId: c[2], targetId: w }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: m, targetId: w }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const c = e.slice(4), m = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = m ? m[1] : i && (this.model.pages ?? []).some((N) => N.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let $ = m ? m[2] : void 0, b = null;
      if (c === "tab") {
        let N = null, D = $ ? this.componentIn(w, $) : null;
        for (; D; ) {
          if (D.node.kind === "tabLayout") {
            N = D.node.id;
            break;
          }
          D = D.parentId ? this.componentIn(w, D.parentId) : null;
        }
        if (!N) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const V = this.componentIn(w, N).node, k = this.newComponentId("tab"), _ = `Pestaña ${(V.children ?? []).filter((B) => B.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: w, componentId: k, componentKind: "tab", parentComponentId: N }, !1), this.command({ kind: "set-page-component", pageId: w, componentId: k, title: _ }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: k }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const N = this.componentIn(w, s.componentId);
        N && N.node.kind === "tab" ? $ = N.node.id : N && ($ = N.parentId ?? void 0, b = s.pos === "before" ? s.componentId : N.beforeId);
      } else if ($) {
        const N = ((f = this.componentIn(w, $)) == null ? void 0 : f.node) ?? null;
        (N == null ? void 0 : N.kind) === "tabLayout" && (N.children ?? [])[0] && ($ = (N.children ?? [])[0].id);
      }
      const P = this.newComponentId(c), R = {
        kind: "add-page-component",
        pageId: w,
        componentId: P,
        componentKind: c,
        parentComponentId: $
      };
      if (!b) {
        this.command(R);
        return;
      }
      this.command(R, !1), this.command(
        { kind: "move-page-component", pageId: w, componentId: P, parentComponentId: $ ?? null, beforeComponentId: b },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: w, componentId: P }]);
      return;
    }
    const a = this._view, n = this.sceneFor(a), r = (c, m) => {
      const w = this.viewLayout(a), $ = m ? n.nodes.find((P) => P.id === m) : void 0, b = $ ? { x: Math.round(t.x - $.x), y: Math.round(t.y - $.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(a, { ...w, nodes: { ...w.nodes, [c]: b } }), { kind: "move-node", view: a, id: c, pos: null };
    }, u = (c, m, w) => {
      const $ = this.inverseOf(c) ?? [];
      this.command(c, !1);
      const b = r(m, w);
      this.pushUndoEntry([...$, b]);
    };
    if (!o.child) {
      const c = {
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
      }, { id: m, name: w } = this.uniquePaletteName(o.label, c[e] ?? ""), $ = e === "module" ? { kind: "add-module", id: m, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: m, name: w } : e === "external-system" ? { kind: "add-external-system", id: m, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: m, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: m, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: m, name: w } : e === "rag" ? { kind: "add-rag", id: m, name: w } : e === "api" ? { kind: "add-api", id: m, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: m, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: m, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: m, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: m, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: m, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: m, name: w } : e === "transformation" ? { kind: "add-transformation", id: m, name: w } : e === "custom-code" ? { kind: "add-custom-code", id: m, name: w } : e === "button-group" ? { kind: "add-button-group", id: m, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: m, name: w } : {
        kind: "add-workflow",
        id: m,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      if ($.kind === "create-ui-app") {
        const P = this.dropChain(i).find((R) => this.model.modules.some((N) => N.id === R));
        if (P) {
          u({ ...$, moduleId: P }, m, P);
          return;
        }
      }
      u($, m);
      return;
    }
    if (e === "ui-wizard-step") {
      const m = this.dropChain(i).map((P) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(P)) == null ? void 0 : R[1]) ?? P;
      }).find((P) => (this.model.pages ?? []).some((R) => R.id === P && R.type === "WIZARD"));
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const w = ((d = (this.model.pages ?? []).find((P) => P.id === m)) == null ? void 0 : d.wizardSteps) ?? [], $ = new Set(w.map((P) => P.id ?? P.pageId));
      let b = w.length + 1;
      for (; $.has(`wzs-${b}`); ) b++;
      this.command({ kind: "add-page-wizard-step", pageId: m, itemId: `wzs-${b}`, label: `Paso ${b}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const c = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", m = c === "CRUD" ? "CRUD" : c === "WIZARD" ? "Wizard" : "Página", { id: w, name: $ } = this.uniquePaletteName(m, "page-"), b = this.dropChain(i), P = b.find((N) => (this.model.uiApps ?? []).some((D) => D.id === N)), R = b.map((N) => {
        var D;
        return ((D = /^wizrow:([^:]+):/.exec(N)) == null ? void 0 : D[1]) ?? N;
      }).find((N) => (this.model.pages ?? []).some((D) => D.id === N && D.type === "WIZARD"));
      if (R) {
        const N = n.nodes.find((V) => V.id === R);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: $, pageType: c }, !1), this.command({ kind: "add-page-wizard-step", pageId: R, targetId: w }, !1);
        const D = r(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, D]), this.emit("modux-notice", { message: `${$} creada como paso del wizard` });
        return;
      }
      if (P) {
        const N = n.nodes.find((D) => D.id === P);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40);
      }
      u(
        P ? { kind: "create-ui-page", id: w, name: $, pageType: c, appId: P, menuLabel: $ } : { kind: "create-ui-page", id: w, name: $, pageType: c },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const c = this.dropChain(i), m = c.find((R) => (this.model.uiApps ?? []).some((N) => N.id === R));
      if (!m) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const w = /* @__PURE__ */ new Set(), $ = (R) => {
        for (const N of R ?? [])
          w.add(N.label), $(N.children);
      };
      (this.model.uiApps ?? []).forEach((R) => $(R.menuItems));
      let b = "Entrada";
      for (let R = 2; w.has(b); R++) b = `Entrada ${R}`;
      const P = c.map((R) => ve(R)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: m,
        label: b,
        itemId: this.newMenuItemId(b),
        parentId: P == null ? void 0 : P.itemId,
        parentLabel: P != null && P.itemId || P == null ? void 0 : P.label
      });
      return;
    }
    if (e === "etl-transform") {
      const m = this.dropChain(i).map((b) => (this.model.etlFlows ?? []).find((P) => P.id === b)).find(Boolean);
      if (!m) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const w = new Set((m.steps ?? []).map((b) => b.id));
      let $ = (m.steps ?? []).length + 1;
      for (; w.has(`ets-${$}`); ) $++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: m.id,
        id: `ets-${$}`,
        name: `Transformación ${$}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: c, name: m } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      u({
        kind: "add-workflow-gateway",
        id: c,
        name: m,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, c), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const m = this.model.workflows ?? [], w = this.dropChain(i), $ = w.map((D) => m.find((V) => V.id === D)).find(Boolean), b = w.map((D) => {
        const V = m.find((k) => (k.steps ?? []).some((_) => _.id === D));
        return V ? { owner: V, stepId: D } : null;
      }).find(Boolean);
      let P = $ ?? (b == null ? void 0 : b.owner);
      if (!P && m.length === 1 && (P = m[0]), !P) {
        if (!m.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: R, name: N } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      b && (t = { x: t.x + 190, y: t.y }), u(
        {
          kind: "add-workflow-step",
          workflowId: P.id,
          id: R,
          name: N,
          ...b ? { dependsOnStepIds: [b.stepId], afterStepId: b.stepId } : {}
        },
        R
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${P.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const c = this.dropContainerFor("api", i);
      if (!c) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: m, name: w } = this.uniquePaletteName("API", "api-"), $ = { kind: "add-api", id: m, name: w }, b = this.inverseOf($) ?? [];
      this.command($, !1), this.model.externalSystems.some((D) => D.id === c) ? this.command({ kind: "set-api-publisher", id: m, targetId: c }, !1) : this.command({ kind: "add-api-implementation", apiId: m, moduleId: c }, !1);
      const P = this.viewLayout(this._view), R = this.sceneFor(this._view).nodes.find((D) => D.id === c), N = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...P, nodes: { ...P.nodes, [m]: N } }), this.pushUndoEntry([...b, { kind: "move-node", view: this._view, id: m, pos: null }]);
      return;
    }
    const l = this.dropContainerFor(e, i);
    if (!l) {
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
    }, { id: I, name: h } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      u({ kind: "add-aggregate", id: I, name: h, moduleId: l }, I, l);
    else if (e === "ui-button") {
      const c = (this.model.buttonGroups ?? []).find(($) => $.id === l), m = new Set(((c == null ? void 0 : c.buttons) ?? []).map(($) => $.id));
      let w = ((c == null ? void 0 : c.buttons) ?? []).length + 1;
      for (; m.has(`btn-${w}`); ) w++;
      this.command({ kind: "add-group-button", id: l, itemId: `btn-${w}`, label: h }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: l, fieldId: I, name: h });
    else if (e === "code-module")
      u({ kind: "add-code-module", id: I, name: h, moduleId: l }, I, l), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      u(
        { kind: "add-use-case", id: I, name: h, moduleId: l, ...e === "policy" ? { policy: !0 } : {} },
        I,
        l
      );
    else if (e === "domain-event")
      u({ kind: "add-domain-event", id: I, name: h, moduleId: l }, I, l);
    else if (e === "application-event")
      u({ kind: "add-application-event", id: I, name: h, moduleId: l }, I, l);
    else if (e === "domain-service")
      u({ kind: "add-domain-service", id: I, name: h, moduleId: l }, I, l);
    else if (e === "query-service")
      u({ kind: "add-query-service", id: I, name: h, moduleId: l }, I, l);
    else if (e === "scheduled-trigger")
      u({ kind: "add-scheduled-trigger", id: I, name: h, moduleId: l }, I, l), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      u({ kind: "add-notification", id: I, name: h, moduleId: l }, I, l), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      u({ kind: "add-document", id: I, name: h, moduleId: l }, I, l), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      u({ kind: "add-etl-flow", id: I, name: h, moduleId: l }, I, l), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const c = (this.model.aggregates ?? []).find((m) => m.id === l);
      u({ kind: "add-read-model", id: I, name: h, aggregateId: l }, I, (c == null ? void 0 : c.moduleId) ?? l);
    } else if (e === "api-operation") {
      const c = (this.model.apis ?? []).find((P) => P.id === l), m = new Set(((c == null ? void 0 : c.operations) ?? []).map((P) => P.id));
      let w = h, $ = `apiop-${l.replace(/^api-/, "")}-${se(w)}`;
      for (let P = 2; m.has($); P++)
        w = `${o.label} ${P}`, $ = `apiop-${l.replace(/^api-/, "")}-${se(w)}`;
      u({ kind: "add-api-operation", apiId: l, id: $, name: w }, $, l), n.nodes.some(
        (P) => P.parentId === l && (P.kind === "api-operation" || P.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(c == null ? void 0 : c.name) ?? l} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const c = this.model.modules.flatMap((b) => b.useCases ?? []).find((b) => b.id === l), m = new Set((c == null ? void 0 : c.stepIds) ?? []);
      let w = h, $ = `step-${se(w)}`;
      for (let b = 2; m.has($); b++)
        w = `${o.label} ${b}`, $ = `step-${se(w)}`;
      u({ kind: "add-use-case-step", useCaseId: l, id: $, name: w }, $, l), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(c == null ? void 0 : c.name) ?? l} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? u({ kind: "add-external-use-case", id: I, name: h, moduleId: l }, I, l) : e === "external-table" ? u({ kind: "add-external-table", id: I, name: h, moduleId: l }, I, l) : e === "mcp-server" && u({ kind: "add-mcp-server", id: I, name: h, moduleId: l }, I, l);
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
      const f = (this.model.modelMappings ?? []).find((c) => c.id === e);
      if (f) {
        this.command({
          kind: "set-page-button",
          pageId: s[1],
          useCaseId: s[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${f.name}` });
        return;
      }
      const d = this.model.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === e);
      if (d) {
        if (e === s[2]) return;
        const c = (this.model.pages ?? []).find((w) => w.id === s[1]), m = ((c == null ? void 0 : c.buttons) ?? []).find((w) => w.useCaseId === s[2]);
        if (!m) return;
        if (((c == null ? void 0 : c.buttons) ?? []).some((w) => w.useCaseId === e)) {
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
      const f = this.model.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === e);
      if (!f) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const d = (this.model.pages ?? []).find((c) => c.id === o[1]);
      if (((d == null ? void 0 : d.buttons) ?? []).some((c) => c.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${f.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, n = a ? a[1] : t && (this.model.pages ?? []).some((f) => f.id === t) ? t : null;
    if (!n) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = a ? ((h = this.componentIn(n, a[2])) == null ? void 0 : h.node) ?? null : null, u = this.model.modules.flatMap((f) => f.useCases ?? []).find((f) => f.id === e);
    if (u) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: n, componentId: r.id, useCaseId: e, label: r.label ?? u.name }), this.emit("modux-notice", { message: `El botón lanza ${u.name}` })) : (this.command({ kind: "add-page-button", pageId: n, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${u.name} añadido a la página` }));
      return;
    }
    const l = (this.model.models ?? []).find((f) => f.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: n, componentId: r.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${l.name}` })) : (this.command({ kind: "set-page-model", pageId: n, modelId: e }), this.emit("modux-notice", { message: `${l.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((f) => f.id === e);
    if (g && (r == null ? void 0 : r.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: n, componentId: r.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const I = this.model.modules.flatMap((f) => (f.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((c) => ({ op: c, qs: d })))).find(({ op: f }) => f.id === e);
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
    const n = this._view, r = this.sceneFor(n), u = r.nodes.find((h) => h.id === e);
    if (!u) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const h = this.viewLayout(n);
        this.writeViewLayout(n, {
          ...h,
          nodes: { ...h.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const l = this.viewLayout(n), g = u.parentId ? r.nodes.find((h) => h.id === u.parentId) : void 0, I = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: n, id: e, pos: l.nodes[e] ?? null }]), this.writeViewLayout(n, { ...l, nodes: { ...l.nodes, [e]: I } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design", "mappings", "explorer", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = G.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type === "custom-code" || s.type.startsWith("cmp:") : this._view === "explorer" ? !s.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(s.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(s.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return C`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? C`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${G.PALETTE_GROUPS.map((s) => {
      const o = t.filter((a) => a.group === s);
      return o.length ? C`
                        <div class="palette-g">${s}</div>
                        ${o.map(
        (a) => C`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(n) => this.onPaletteDragStart(n, { new: a.type })}
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
              ` : C`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (s) => C`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (o) => C`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${Et[s.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : C`
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
        const u = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!u) return;
        this.command({ kind: "add-aggregate", id: `agg-${se(e)}`, name: e, moduleId: u });
      } else if (this._view === "flows") {
        const u = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), l = this._newTargetId || ((o = this.model.modules[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!u || !l || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${se(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: u,
          triggerEvent: g,
          targetId: l
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const u = this._newModuleId || ((a = this.model.modules[0]) == null ? void 0 : a.id);
        if (!u) return;
        this.command({
          kind: "add-process",
          id: `proc-${se(e)}`,
          name: e,
          moduleId: u,
          triggerAggregateId: this._newTriggerAggId || ((r = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? Kn(i, t.nodes) : e === "flows" ? oa(i, t.nodes) : e === "processes" ? qs(i, t.nodes) : e === "workflows" ? fc(i, t.nodes) : e === "ui" ? bc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? $c(i, t.nodes) : e === "mappings" ? xc(i, t.nodes) : e === "eventstorming" ? rc(i, t.nodes) : Bn(
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
    var u;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId), s = new Set(i.map((l) => l.id)), o = {
      nodes: i,
      edges: t.edges.filter((l) => s.has(l.sourceId) && s.has(l.targetId))
    }, n = await Ec(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((l) => ({
        kind: "move-node",
        view: e,
        id: l.id,
        pos: r.nodes[l.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(r.edges).map((l) => ({
        kind: "set-edge-points",
        view: e,
        id: l,
        points: r.edges[l]
      }))
    ]), this.writeViewLayout(e, { nodes: n, edges: {}, sizes: r.sizes }), await this.updateComplete, (u = this.renderRoot.querySelector("modux-canvas")) == null || u.fit();
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
    return C`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "workflows", "ui", "design", "mappings", "explorer", "integrations"].includes(this._view)}
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
      (t) => C`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? C`
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
      (t) => C`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length ? C`
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
        ${this._view === "aggregates" || this._view === "processes" ? C`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return C`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? C`
              ${this._view === "flows" ? C`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => C`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, s;
        return C`<option
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
              ${this._view === "flows" ? C`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return C`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? C`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => C`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? C`
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
      (t) => C`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? C`<input
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
              ${this.owningProcessOf(this._selectedId) ? C`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? C`
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
      (t) => C`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? C`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
      (t) => C`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? C`<button
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
      ${this._view === "design" ? C`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? C`${this.renderPalette()}<modux-explorer
            .model=${this.model}
            ?shifted=${this._paletteOpen}
            @dragover=${(t) => t.preventDefault()}
            @drop=${this.onPaletteDrop}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = Mo(t.detail.id, i);
      s && this.openInDrawer(s);
    }}
            @explorer-connect=${(t) => {
      const { sourceId: i, targetId: s, x: o, y: a } = t.detail, n = (u) => this.model.modules.some((l) => l.id === u);
      if (n(i) && n(s)) {
        const u = this.model.relations.find(
          (l) => l.sourceId === i && l.targetId === s && l.declared
        );
        this._relationPicker = {
          sourceId: i,
          targetId: s,
          mode: u ? "edit" : "create",
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
          ></modux-explorer>` : this._tilt ? C`
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
          ></modux-tilt>` : C`
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
        ${this._view === "context-map" ? C`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? C`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? C`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : C`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? C`
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
      ([t, i]) => C`
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
    return C`
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
    return C`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => C`
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
    return e ? C`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => C`
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
    return e ? C`
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
    return e ? C`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => C`
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
    return C`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Hc.map(
      (s) => C`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${ws[s].abbr}</span>
              <span class="name">${ws[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
G.styles = vt`
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
G.CRUD_ROUTES = {
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
G.PALETTE_GROUPS = [
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
G.PALETTE_NEW = [
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
  ae({ attribute: !1 })
], G.prototype, "model", 2);
Z([
  ae({ attribute: !1 })
], G.prototype, "layout", 2);
Z([
  ae({ attribute: !1 })
], G.prototype, "diff", 2);
Z([
  U()
], G.prototype, "_view", 2);
Z([
  U()
], G.prototype, "_detail", 2);
Z([
  U()
], G.prototype, "_relationType", 2);
Z([
  U()
], G.prototype, "_relationPicker", 2);
Z([
  U()
], G.prototype, "_extDepPicker", 2);
Z([
  U()
], G.prototype, "_selectedId", 2);
Z([
  U()
], G.prototype, "_paletteOpen", 2);
Z([
  U()
], G.prototype, "_drawer", 2);
Z([
  ae({ attribute: !1 })
], G.prototype, "repositories", 2);
Z([
  U()
], G.prototype, "_repoPicker", 2);
Z([
  U()
], G.prototype, "_wfStepPicker", 2);
Z([
  U()
], G.prototype, "_branchCondEditor", 2);
Z([
  U()
], G.prototype, "_paletteFilter", 2);
Z([
  U()
], G.prototype, "_paletteTab", 2);
Z([
  U()
], G.prototype, "_selectedCmp", 2);
Z([
  U()
], G.prototype, "_fullscreen", 2);
Z([
  U()
], G.prototype, "_tilt", 2);
Z([
  U()
], G.prototype, "_helpOpen", 2);
Z([
  U()
], G.prototype, "_newName", 2);
Z([
  U()
], G.prototype, "_newModuleId", 2);
Z([
  U()
], G.prototype, "_newArchetype", 2);
Z([
  U()
], G.prototype, "_newTriggerAggId", 2);
Z([
  U()
], G.prototype, "_newTriggerEvent", 2);
Z([
  U()
], G.prototype, "_newTargetId", 2);
Z([
  U()
], G.prototype, "_undoStack", 2);
Z([
  U()
], G.prototype, "_redoStack", 2);
Z([
  U()
], G.prototype, "_newStepName", 2);
Z([
  U()
], G.prototype, "_newStepType", 2);
Z([
  U()
], G.prototype, "_newStepRole", 2);
Z([
  U()
], G.prototype, "_newStepDeadline", 2);
Z([
  U()
], G.prototype, "_editStepRole", 2);
Z([
  U()
], G.prototype, "_editStepDeadline", 2);
Z([
  U()
], G.prototype, "_editStepComp", 2);
Z([
  U()
], G.prototype, "_newStepUseCase", 2);
Z([
  U()
], G.prototype, "_newStepEmits", 2);
Z([
  U()
], G.prototype, "_editStepUseCase", 2);
Z([
  U()
], G.prototype, "_editStepEmits", 2);
Z([
  U()
], G.prototype, "_editStepAwaits", 2);
Z([
  U()
], G.prototype, "_multi", 2);
Z([
  U()
], G.prototype, "_newViewName", 2);
Z([
  U()
], G.prototype, "_activeViewId", 2);
Z([
  U()
], G.prototype, "_newRagSourceType", 2);
Z([
  U()
], G.prototype, "_newRagSourceUri", 2);
Z([
  U()
], G.prototype, "_addMemberKey", 2);
Z([
  U()
], G.prototype, "_treeOpen", 2);
Z([
  U()
], G.prototype, "_deletePicker", 2);
G = Z([
  wt("modux-editor")
], G);
var Yc = Object.defineProperty, Kc = Object.getOwnPropertyDescriptor, be = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Kc(t, i) : t, a = e.length - 1, n; a >= 0; a--)
    (n = e[a]) && (o = (s ? n(t, i, o) : n(o)) || o);
  return s && o && Yc(t, i, o), o;
};
let fe = class extends Fe {
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
    ], t = (s) => fe.TYPE_LABELS[s] ?? s;
    return C`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: o, mark: a, cls: n }) => {
      const r = this._diff.changes.filter((u) => u.kind === s);
      return r.length ? C`
            <div class="diff-group">${o} (${r.length})</div>
            ${r.map(
        (u) => C`
                <div class="diff-row">
                  <span class="diff-mark ${n}">${a}</span>
                  <span class="diff-type">${t(u.type)}</span>
                  <span class="diff-name" title=${u.id}>${u.name ?? u.id}</span>
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
        const u = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!u.ok) {
          let l = `El servidor rechazó la operación (${u.status})`;
          try {
            const g = await u.json();
            g != null && g.message && (l = g.message);
          } catch {
          }
          this.showToast(l);
          return;
        }
        this._workspace = await u.json(), await this.reload(), await this.refreshDiff(), (r = this.renderRoot.querySelector("modux-editor")) == null || r.clearHistory();
      } catch (u) {
        this.showToast(String(u));
      }
    });
    const s = (a = this._workspace) == null ? void 0 : a.current;
    if (s && s !== i) {
      const r = ((n = this._workspace.solutions.find((u) => u.branch === s)) == null ? void 0 : n.name) ?? s.replace(/^solution\//, "");
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
    return this._tagsOpen ? C`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => C`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : C`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
        const { apiId: r } = await n.json(), u = o ? { kind: "set-api-publisher", id: r, targetId: o } : a ? { kind: "add-api-implementation", apiId: r, moduleId: a } : null;
        u && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(u)
        });
        const l = await fetch(`${this.base}/model`);
        l.ok && (this._model = await l.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
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
    return this._error ? C`<div class="status error">modux editor: ${this._error}</div>` : this._model ? C`
      ${this._workspace ? C`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : C`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? C`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : C`<button
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
      return C`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? C`
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
      return C`
                      ${i === "EXPLORING" ? C`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? C`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? C`<button
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
      ${this._mergeFlow ? C`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => C`
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
      ${this._toast ? C`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : C`<div class="status">Cargando el modelo…</div>`;
  }
};
fe.styles = vt`
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
fe.TYPE_LABELS = {
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
  ae()
], fe.prototype, "base", 2);
be([
  U()
], fe.prototype, "_model", 2);
be([
  U()
], fe.prototype, "_layout", 2);
be([
  U()
], fe.prototype, "_error", 2);
be([
  U()
], fe.prototype, "_saving", 2);
be([
  U()
], fe.prototype, "_toast", 2);
be([
  U()
], fe.prototype, "_workspace", 2);
be([
  U()
], fe.prototype, "_creatingSolution", 2);
be([
  U()
], fe.prototype, "_newSolutionName", 2);
be([
  U()
], fe.prototype, "_taggingVersion", 2);
be([
  U()
], fe.prototype, "_newTagName", 2);
be([
  U()
], fe.prototype, "_tagsOpen", 2);
be([
  U()
], fe.prototype, "_tags", 2);
be([
  U()
], fe.prototype, "_repositories", 2);
be([
  U()
], fe.prototype, "_diff", 2);
be([
  U()
], fe.prototype, "_diffListOpen", 2);
be([
  U()
], fe.prototype, "_mergeFlow", 2);
fe = be([
  wt("modux-editor-connected")
], fe);
export {
  Xc as CONTAINER_HEADER,
  Qc as CONTAINER_INSET,
  ge as ModuxCanvas,
  G as ModuxEditor,
  fe as ModuxEditorConnected,
  Kn as aggregatesScene,
  ut as apiImplNodeId,
  pt as apiOpOccurrenceId,
  Mi as containerFit,
  On as containerMinSize,
  Bn as contextMapScene,
  Un as flowCoherence,
  oa as flowsScene,
  pi as normalizeViewLayout,
  qs as processesScene,
  Dn as relationEdgeId,
  Bi as resolveOverlaps
};
