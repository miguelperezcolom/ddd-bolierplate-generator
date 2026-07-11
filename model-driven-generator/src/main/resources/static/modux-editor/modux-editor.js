const Pc = 34, Tc = 10;
function Ai(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], p = e[r], g = i.get(l.id), m = i.get(p.id), y = m.x - g.x, f = m.y - g.y, d = (l.w + p.w) / 2 + t - Math.abs(y), u = (l.h + p.h) / 2 + t - Math.abs(f);
        if (!(d <= 0 || u <= 0))
          if (o = !0, d < u) {
            const h = (y >= 0 ? 1 : -1) * d / 2;
            g.x -= h, m.x += h;
          } else {
            const h = (f >= 0 ? 1 : -1) * u / 2;
            g.y -= h, m.y += h;
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
function fo(e, t = { w: 160, h: 90 }) {
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
function Ii(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const r of i)
    s = Math.max(s, -r.dx + r.w / 2 + 10), n = Math.max(n, r.dx + r.w / 2 + 10), o = Math.max(o, -r.dy + r.h / 2 + 34), a = Math.max(a, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (n - s) / 2,
    y: e.y + (a - o) / 2,
    w: s + n,
    h: o + a
  };
}
function ni(e) {
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
const go = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Io = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, yo = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, He = 168, Ve = 56;
function nt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function st(e, t) {
  return `apiop:${e}@${t}`;
}
const vs = { compact: 0, coarse: 1, full: 2 };
function ws(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: vs[e ? t : s] > vs[n] };
}
function mn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: nt(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const hn = 34, fn = 14, vo = 14, ye = 108, Ie = 32, os = 12, yi = 10, Ze = 2, gn = Ze * ye + (Ze - 1) * os + 2 * fn;
function wo(e, t) {
  return `rel:${e}->${t}`;
}
function bo(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function gt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const ji = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, vi = {
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
}, Bt = {
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
function wi(e) {
  const t = Math.max(1, Math.ceil(e / Ze)), i = t * Ie + (t - 1) * yi;
  return { w: gn, h: hn + i + vo };
}
function wt(e, t) {
  const i = e % Ze, s = Math.floor(e / Ze);
  return {
    x: -t.w / 2 + fn + i * (ye + os) + ye / 2,
    y: -t.h / 2 + hn + s * (Ie + yi) + Ie / 2
  };
}
function In(e, t) {
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
function xo(e, t, i, s, n, o, a = !1) {
  const r = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...mn(e, t.id),
    ...In(e, t)
  ];
  if (!r.length)
    return [{ ...s, x: i.x, y: i.y, w: He, h: Ve }];
  if (a) {
    const l = new Map((e.apis ?? []).map((g) => [g.id, g])), p = (e.apiImplementations ?? []).filter((g) => g.moduleId === t.id && l.has(g.apiId)).map((g) => {
      const m = l.get(g.apiId);
      return {
        id: nt(g.apiId, g.moduleId),
        name: m.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${m.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (m.operations ?? []).map((y) => ({
          id: st(y.id, t.id),
          name: y.name
        }))
      };
    });
    if (p.length > 0) {
      const g = r.filter((m) => m.kind !== "api-impl");
      return yn(i, s, p, g, n, o);
    }
  }
  return Dt(i, s, r, n, o);
}
function yn(e, t, i, s, n, o, a = /* @__PURE__ */ new Set()) {
  const r = o[t.id] ?? wi(i.length + s.length), l = i.map((f, d) => {
    const u = n[f.id] ?? wt(d, r), h = a.has(f.id) ? [] : f.ops, w = o[f.id] ?? wi(h.length), A = h.map((F, k) => n[F.id] ?? wt(k, w)), O = Ii(
      { x: u.x, y: u.y },
      w,
      A.map((F) => ({ dx: F.x, dy: F.y, w: ye, h: Ie }))
    );
    return { a: f, off: u, ops: h, opOffs: A, fit: O };
  }), p = s.map(
    (f, d) => n[f.id] ?? wt(i.length + d, r)
  ), g = Ai(
    [
      ...l.map((f) => ({ id: f.a.id, x: f.fit.x, y: f.fit.y, w: f.fit.w, h: f.fit.h })),
      ...s.map((f, d) => ({
        id: f.id,
        x: p[d].x,
        y: p[d].y,
        w: ye,
        h: Ie
      }))
    ],
    24
  );
  for (const f of l) {
    const d = g.get(f.a.id);
    d && (f.off = { x: f.off.x + (d.x - f.fit.x), y: f.off.y + (d.y - f.fit.y) }, f.fit = { ...f.fit, x: d.x, y: d.y });
  }
  s.forEach((f, d) => {
    const u = g.get(f.id);
    u && (p[d] = { x: u.x, y: u.y });
  });
  const m = Ii(e, r, [
    ...l.map((f) => ({ dx: f.fit.x, dy: f.fit.y, w: f.fit.w, h: f.fit.h })),
    ...p.map((f) => ({ dx: f.x, dy: f.y, w: ye, h: Ie }))
  ]), y = [
    { ...t, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const f of l)
    y.push({
      id: f.a.id,
      label: f.a.name,
      kind: f.a.kind,
      symbol: "interface",
      fill: f.a.fill,
      stroke: f.a.stroke,
      badge: f.a.badge,
      container: !0,
      collapsible: f.a.ops.length > 0 || a.has(f.a.id),
      collapsed: a.has(f.a.id),
      parentId: t.id,
      x: e.x + f.fit.x,
      y: e.y + f.fit.y,
      w: f.fit.w,
      h: f.fit.h,
      tooltip: f.a.tooltip
    }), f.ops.forEach((d, u) => {
      y.push({
        id: d.id,
        label: d.name,
        kind: f.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: f.a.id,
        x: e.x + f.off.x + f.opOffs[u].x,
        y: e.y + f.off.y + f.opOffs[u].y,
        w: ye,
        h: Ie,
        tooltip: `${Bt[f.a.opKind]}: ${d.name}`
      });
    });
  return s.forEach((f, d) => {
    const u = vi[f.kind];
    y.push({
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + p[d].x,
      y: e.y + p[d].y,
      w: ye,
      h: Ie,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Bt[f.kind]} ${f.name}`
    });
  }), y;
}
const ko = [
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
], bs = 20, xs = 28, Nt = 10, Mt = gn + 2 * Nt;
function _o(e, t, i, s, n, o) {
  const a = In(e, t), r = new Map(a.map((w) => [w.id, w])), l = (e.codeModules ?? []).filter((w) => w.moduleId === t.id), p = new Set(l.flatMap((w) => w.elementIds ?? [])), g = a.filter((w) => !p.has(w.id)), m = o[s.id] ?? wi(l.length + g.length), y = l.map((w, A) => {
    const O = (w.elementIds ?? []).map((b) => r.get(b)).filter((b) => !!b), F = ko.map((b) => {
      const z = O.filter((q) => b.kinds.includes(q.kind)), R = Math.ceil(z.length / Ze), D = bs + (R ? R * Ie + (R - 1) * yi + 8 : 8);
      return { layer: b, chips: z, rows: R, h: D };
    }), k = xs + F.reduce((b, z) => b + z.h, 0) + Nt, S = n[w.id] ?? wt(A, m);
    return { cm: w, bands: F, boxH: k, off: S };
  }), f = g.map(
    (w, A) => n[w.id] ?? wt(y.length + A, m)
  ), d = Ai(
    [
      ...y.map((w) => ({ id: w.cm.id, x: w.off.x, y: w.off.y, w: Mt, h: w.boxH })),
      ...g.map((w, A) => ({ id: w.id, x: f[A].x, y: f[A].y, w: ye, h: Ie }))
    ],
    24
  );
  for (const w of y) {
    const A = d.get(w.cm.id);
    A && (w.off = { x: A.x, y: A.y });
  }
  g.forEach((w, A) => {
    const O = d.get(w.id);
    O && (f[A] = { x: O.x, y: O.y });
  });
  const u = Ii(i, m, [
    ...y.map((w) => ({ dx: w.off.x, dy: w.off.y, w: Mt, h: w.boxH })),
    ...f.map((w) => ({ dx: w.x, dy: w.y, w: ye, h: Ie }))
  ]), h = [
    { ...s, x: u.x, y: u.y, w: u.w, h: u.h, container: !0 }
  ];
  for (const w of y) {
    const A = i.x + w.off.x, O = i.y + w.off.y;
    h.push({
      id: w.cm.id,
      label: w.cm.name,
      kind: "code-module",
      symbol: "component",
      fill: "#ffffff",
      stroke: "#334155",
      badge: "MÓDULO",
      container: !0,
      parentId: s.id,
      x: A,
      y: O,
      w: Mt,
      h: w.boxH,
      tooltip: `${w.cm.name} — módulo: empaqueta elementos del contexto en sus capas; arrastra el asa de un elemento hasta él para asignarlo`
    });
    let F = -w.boxH / 2 + xs;
    for (const k of w.bands) {
      const S = `hexlayer:${w.cm.id}:${k.layer.key}`;
      h.push({
        id: S,
        label: k.layer.label,
        kind: "hex-layer",
        fill: k.layer.fill,
        stroke: "#e2e8f0",
        dashed: !0,
        container: !0,
        parentId: w.cm.id,
        x: A,
        y: O + F + k.h / 2,
        w: Mt - 2 * Nt,
        h: k.h,
        tooltip: `Capa de ${k.layer.label} del módulo ${w.cm.name} (derivada del tipo de cada elemento)`
      }), k.chips.forEach((b, z) => {
        const R = z % Ze, D = Math.floor(z / Ze), q = b.policy ? ji : vi[b.kind];
        h.push({
          id: b.id,
          label: b.name,
          kind: b.kind,
          x: A - (Mt - 2 * Nt) / 2 + Nt + R * (ye + os) + ye / 2,
          y: O + F + bs + D * (Ie + yi) + Ie / 2,
          w: ye,
          h: Ie,
          symbol: q.symbol,
          fill: q.fill,
          stroke: q.stroke,
          parentId: S,
          tooltip: `${b.policy ? "Policy" : Bt[b.kind]} ${b.name} — en el módulo ${w.cm.name} (Supr lo saca del módulo)`
        });
      }), F += k.h;
    }
  }
  return g.forEach((w, A) => {
    const O = w.policy ? ji : vi[w.kind];
    h.push({
      id: w.id,
      label: w.name,
      kind: w.kind,
      x: i.x + f[A].x,
      y: i.y + f[A].y,
      w: ye,
      h: Ie,
      symbol: O.symbol,
      fill: O.fill,
      stroke: O.stroke,
      parentId: s.id,
      tooltip: `${w.policy ? "Policy" : Bt[w.kind]} ${w.name} — sin módulo: arrastra su asa hasta un módulo para distribuirlo`
    });
  }), h;
}
function Dt(e, t, i, s, n) {
  const o = n[t.id] ?? wi(i.length), a = i.map((m, y) => s[m.id] ?? wt(y, o)), r = Ai(
    i.map((m, y) => ({ id: m.id, x: a[y].x, y: a[y].y, w: ye, h: Ie })),
    10
  );
  i.forEach((m, y) => {
    const f = r.get(m.id);
    f && (a[y] = { x: f.x, y: f.y });
  });
  const l = Ii(
    e,
    o,
    a.map((m) => ({ dx: m.x, dy: m.y, w: ye, h: Ie }))
  ), p = {
    ...t,
    x: l.x,
    y: l.y,
    w: l.w,
    h: l.h,
    container: !0
  }, g = i.map((m, y) => {
    const f = a[y], d = m.policy ? ji : vi[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + f.x,
      y: e.y + f.y,
      w: ye,
      h: Ie,
      symbol: d.symbol,
      fill: d.fill,
      stroke: d.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Bt[m.kind]} ${m.name}`
    };
  });
  return [p, ...g];
}
function $o(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = i === "distribution", a = n, r = i !== "contexts", l = i === "operations", p = new Set(e.externalSystems.map((c) => c.id)), g = (e.apis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), m = new Set(g.map((c) => c.id)), y = (e.proxyApis ?? []).filter(
    (c) => c.publishedByExternalSystemId && p.has(c.publishedByExternalSystemId)
  ), f = new Set(y.map((c) => c.id)), d = [
    ...e.modules.map((c) => ({ ref: c, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((c) => ({ ref: c, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((c) => !m.has(c.id)).map((c) => ({ ref: c, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((c) => !f.has(c.id)).map((c) => ({ ref: c, external: !1, api: !1, proxy: !0 })),
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
  ], u = d.flatMap((c, T) => {
    const W = t[c.ref.id] ?? gt(T, d.length);
    if ("idp" in c && c.idp) {
      const Y = c.ref, de = !!Y.publishedByExternalSystemId;
      return [{
        id: Y.id,
        label: Y.name,
        kind: "identity-provider",
        symbol: "key",
        fill: de ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: de,
        badge: Y.type ?? "IDP",
        tooltip: `${Y.name} — emite las identidades que el sistema confía${de ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: W.x,
        y: W.y,
        w: He,
        h: Ve
      }];
    }
    if ("etl" in c && c.etl) {
      const Y = c.ref;
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
        x: W.x,
        y: W.y,
        w: He,
        h: Ve
      }];
    }
    if ("workflow" in c && c.workflow) {
      const Y = c.ref;
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
        x: W.x,
        y: W.y,
        w: He,
        h: Ve
      }];
    }
    if (c.proxy) {
      const Y = c.ref, de = {
        id: Y.id,
        label: Y.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${Y.name} — proxy/cache de una API, consumible como ella`
      };
      if (l && Y.targetApiId) {
        const Fe = (e.apis ?? []).find((ft) => ft.id === Y.targetApiId), Be = (Fe == null ? void 0 : Fe.operations) ?? [];
        if (Be.length > 0)
          return Dt(
            W,
            de,
            Be.map((ft) => ({
              id: st(ft.id, Y.id),
              name: ft.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...de, x: W.x, y: W.y, w: He, h: Ve }];
    }
    if (c.api) {
      const Y = c.ref, de = {
        id: Y.id,
        label: Y.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${Y.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(Y.id) ? !r : r) && Y.operations.length > 0 ? Dt(
        W,
        { ...de, collapsible: !0, collapsed: !1 },
        Y.operations.map(
          (Be) => ({ id: Be.id, name: Be.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...de,
        collapsible: Y.operations.length > 0,
        collapsed: Y.operations.length > 0,
        x: W.x,
        y: W.y,
        w: He,
        h: Ve
      }];
    }
    if (c.external) {
      const Y = c.ref, de = {
        id: Y.id,
        label: Y.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${Y.name} (sistema externo)`
      }, Fe = g.filter((pe) => pe.publishedByExternalSystemId === Y.id), Be = y.filter((pe) => pe.publishedByExternalSystemId === Y.id), ft = Be.map(
        (pe) => ({ id: pe.id, name: pe.name, kind: "proxy-api" })
      ), Ri = [
        ...(Y.useCases ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-use-case" })
        ),
        ...(Y.tables ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-table" })
        ),
        ...(Y.mcpServers ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "mcp-server" })
        )
      ], Ni = Fe.length > 0 || Be.length > 0, Di = Ni || Ri.length > 0, { form: ii, collapsed: Li } = ws(
        n.has(Y.id),
        r ? "full" : Ni ? "coarse" : "compact",
        Ri.length > 0 || l && Ni
      ), Is = [
        ...ft,
        ...ii === "full" ? Ri : []
      ], zi = l && ii === "full" ? Be.filter((pe) => {
        const Ct = pe.targetApiId ? (e.apis ?? []).find((we) => we.id === pe.targetApiId) : void 0;
        return ((Ct == null ? void 0 : Ct.operations) ?? []).length > 0;
      }) : [];
      if (l && ii === "full" && (Fe.length > 0 || zi.length > 0)) {
        const pe = [
          ...Fe.map((we) => ({
            id: we.id,
            name: we.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${we.name} — API publicada por ${Y.name}`,
            opKind: "api-operation",
            ops: (we.operations ?? []).map((At) => ({ id: At.id, name: At.name }))
          })),
          ...zi.map((we) => {
            const At = (e.apis ?? []).find((si) => si.id === we.targetApiId);
            return {
              id: we.id,
              name: we.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${we.name} — proxy/cache de ${At.name}`,
              opKind: "api-op-occurrence",
              ops: (At.operations ?? []).map((si) => ({
                id: st(si.id, we.id),
                name: si.name
              }))
            };
          })
        ], Ct = new Set(zi.map((we) => we.id));
        return yn(
          W,
          { ...de, collapsible: !0, collapsed: Li },
          pe,
          Is.filter((we) => !Ct.has(we.id)),
          t,
          s,
          a
        );
      }
      const ys = ii === "compact" ? [] : [
        ...Fe.map((pe) => ({ id: pe.id, name: pe.name, kind: "api" })),
        ...Is
      ];
      return ys.length > 0 ? Dt(
        W,
        { ...de, collapsible: Di, collapsed: Li },
        ys,
        t,
        s
      ) : [{
        ...de,
        collapsible: Di,
        collapsed: Di && Li,
        x: W.x,
        y: W.y,
        w: He,
        h: Ve
      }];
    }
    const J = c.ref, K = J.subdomainType ?? "GENERIC", ce = {
      id: J.id,
      label: J.name,
      kind: "module",
      symbol: "component",
      fill: go[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${J.name} — subdominio ${K}`
    }, Te = mn(e, J.id), Et = (e.aggregates ?? []).some((Y) => Y.moduleId === J.id) || (J.useCases ?? []).length > 0 || (J.domainEvents ?? []).length > 0 || (J.applicationEvents ?? []).length > 0 || (J.readModels ?? []).length > 0 || (J.domainServices ?? []).length > 0 || (J.queryServices ?? []).length > 0 || (J.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((Y) => Y.ownerModuleId === J.id) || (e.notifications ?? []).some((Y) => Y.ownerModuleId === J.id) || (e.documents ?? []).some((Y) => Y.ownerModuleId === J.id), et = Et || Te.length > 0, { form: St, collapsed: ht } = ws(
      n.has(J.id),
      r ? "full" : Te.length > 0 ? "coarse" : "compact",
      Et
    );
    return o ? _o(
      e,
      J,
      W,
      { ...ce, collapsible: !1, collapsed: !1 },
      t,
      s
    ) : St === "full" && et ? xo(
      e,
      J,
      W,
      { ...ce, collapsible: !0, collapsed: ht },
      t,
      s,
      l
    ) : St === "coarse" && Te.length > 0 ? Dt(
      W,
      { ...ce, collapsible: et, collapsed: ht },
      Te,
      t,
      s
    ) : [{
      ...ce,
      collapsible: et,
      collapsed: et && ht,
      x: W.x,
      y: W.y,
      w: He,
      h: Ve
    }];
  }), h = d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((c, T) => {
    const W = t[c.id] ?? gt(d.length + T, h);
    u.push({
      id: c.id,
      label: c.name,
      x: W.x,
      y: W.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${c.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((c, T) => {
    const W = t[c.id] ?? gt(d.length + (e.actors ?? []).length + T, h);
    u.push({
      id: c.id,
      label: c.name,
      x: W.x,
      y: W.y,
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
  }), (e.mcpGateways ?? []).forEach((c, T) => {
    const W = t[c.id] ?? gt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      h
    );
    u.push({
      id: c.id,
      label: c.name,
      x: W.x,
      y: W.y,
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
  const w = [];
  (e.rags ?? []).forEach((c, T) => {
    const W = t[c.id] ?? gt(
      d.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      h
    );
    u.push({
      id: c.id,
      label: c.name,
      x: W.x,
      y: W.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${c.name} (base de conocimiento — retrieval para agentes)`
    }), (c.contentSources ?? []).forEach((J, K) => {
      const ce = `ragcs:${c.id}:${J.uri}`, Te = t[ce] ?? { x: W.x + 170, y: W.y - 30 + K * 44 };
      u.push({
        id: ce,
        label: J.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Te.x,
        y: Te.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: J.type,
        tooltip: `${J.type}: ${J.uri}`
      }), w.push({
        id: `ragcse:${c.id}:${J.uri}`,
        sourceId: ce,
        targetId: c.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), o && (e.services ?? []).forEach((c, T) => {
    const W = t[c.id] ?? gt(d.length + T, d.length + (e.services ?? []).length);
    u.push({
      id: c.id,
      label: c.name,
      kind: "service",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#334155",
      badge: "SERVICIO",
      tooltip: `${c.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
      x: W.x,
      y: W.y,
      w: He,
      h: Ve
    });
  }), u.sort((c, T) => (c.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const A = e.relations.map((c) => ({
    id: wo(c.sourceId, c.targetId),
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "relation",
    label: c.type ? Io[c.type] : "?",
    color: c.declared ? "#475569" : "#94a3b8",
    dashed: !c.declared,
    arrow: !0,
    tooltip: c.type ? `${c.type} (${c.sourceId} upstream → ${c.targetId} downstream)${c.reasons ? ` — ${c.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${c.reasons ? ` — ${c.reasons}` : ""}`
  })), O = e.flows.map((c) => {
    var Te, Et, et, St, ht, Y;
    const T = bo(e, c), W = r ? e.modules.find((de) => de.id === c.sourceId) : void 0, J = ((Te = W == null ? void 0 : W.domainEvents) == null ? void 0 : Te.find((de) => de.name === c.triggerEvent)) ?? ((Et = W == null ? void 0 : W.applicationEvents) == null ? void 0 : Et.find((de) => de.name === c.triggerEvent)), K = r && c.readModelName ? (St = (et = e.modules.find((de) => de.id === c.targetId)) == null ? void 0 : et.readModels) == null ? void 0 : St.find((de) => de.name === c.readModelName) : void 0, ce = r && c.targetUseCaseId ? (Y = (ht = e.modules.find((de) => de.id === c.targetId)) == null ? void 0 : ht.useCases) == null ? void 0 : Y.find((de) => de.id === c.targetUseCaseId) : void 0;
    return {
      id: `flow:${c.id}`,
      sourceId: (J == null ? void 0 : J.id) ?? c.sourceId,
      targetId: (ce == null ? void 0 : ce.id) ?? (K == null ? void 0 : K.id) ?? c.targetId,
      kind: "flow",
      label: c.name,
      color: yo[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${c.name} [${c.archetype}] — ${T}`
    };
  }), F = new Map((e.apis ?? []).map((c) => [c.id, c])), k = new Set(e.modules.map((c) => c.id)), S = (e.apiImplementations ?? []).filter(
    (c) => F.has(c.apiId) && k.has(c.moduleId)
  ), b = new Set(u.map((c) => c.id)), z = o ? (e.services ?? []).flatMap(
    (c) => (c.codeModuleIds ?? []).filter((T) => b.has(T) && b.has(c.id)).map((T) => ({
      id: `deploy:${c.id}->${T}`,
      sourceId: c.id,
      targetId: T,
      kind: "deploys",
      color: "#334155",
      dashed: !0,
      arrow: !0,
      tooltip: `desplegado en ${c.name} — Supr lo desconecta`
    }))
  ) : [], R = r ? (e.emissions ?? []).filter((c) => b.has(c.sourceId) && b.has(c.domainEventId)).map((c) => ({
    id: `emit:${c.sourceId}->${c.domainEventId}`,
    sourceId: c.sourceId,
    targetId: c.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], D = r ? (e.projections ?? []).map((c) => ({
    p: c,
    source: c.sourceAggregateId ?? c.sourceExternalUseCaseId ?? c.sourceExternalTableId
  })).filter(({ p: c, source: T }) => T && c.readModelId).filter(({ p: c, source: T }) => b.has(T) && b.has(c.readModelId)).map(({ p: c, source: T }) => ({
    id: `proj:${c.id}`,
    sourceId: T,
    targetId: c.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: c.sourceAggregateId ? `Proyección ${c.name}: el estado del agregado se materializa en ${c.readModelName ?? c.readModelId}` : `Proyección ${c.name}: polling hacia ${c.readModelName ?? c.readModelId}`
  })) : [], q = (e.apis ?? []).flatMap(
    (c) => c.operations.flatMap((T) => {
      const W = r && T.targetUseCaseId && b.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetModuleId && b.has(T.targetModuleId) ? T.targetModuleId : (T.targetUseCaseId && !r, null);
      if (!W) return [];
      const J = r && b.has(T.id) ? T.id : c.id;
      return b.has(J) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: J,
          targetId: W,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${W}`
        }
      ] : [];
    })
  ), N = r ? (e.useCaseCalls ?? []).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => ({
    id: `uccall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], X = [
    ...e.modules.filter((c) => c.identityProviderId && b.has(c.id) && b.has(c.identityProviderId)).map((c) => ({
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
    ...(e.etlFlows ?? []).filter((c) => c.identityProviderId && b.has(c.identityProviderId)).flatMap((c) => {
      const T = b.has(c.id) ? c.id : c.ownerModuleId && b.has(c.ownerModuleId) ? c.ownerModuleId : null;
      return T ? [{
        id: `idpsvc:${c.id}`,
        sourceId: T,
        targetId: c.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((c) => c.publishedByExternalSystemId && b.has(c.id) && b.has(c.publishedByExternalSystemId)).map((c) => ({
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
  ], I = r ? e.modules.flatMap((c) => c.scheduledTriggers ?? []).filter((c) => c.useCaseId && b.has(c.id) && b.has(c.useCaseId)).map((c) => ({
    id: `stfire:${c.id}->${c.useCaseId}`,
    sourceId: c.id,
    targetId: c.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: c.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${c.cronExpression ?? "cron"}`
  })) : [], C = r ? (e.aggregateCalls ?? []).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => ({
    id: `aggcall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], v = r ? (e.queryCalls ?? []).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => ({
    id: `qscall:${c.sourceId}->${c.targetId}`,
    sourceId: c.sourceId,
    targetId: c.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], x = r ? (e.actorUses ?? []).filter((c) => b.has(c.actorId) && b.has(c.targetId)).map((c) => ({
    id: `use:${c.actorId}->${c.targetId}`,
    sourceId: c.actorId,
    targetId: c.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], $ = (e.actorExternalDependencies ?? []).filter((c) => b.has(c.actorId) && b.has(c.externalSystemId)).map((c) => ({
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
  ]), P = (c) => b.has(c) ? c : _.get(c) ?? c, M = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((c) => ({
        sourceId: c.sourceId,
        targetId: P(c.targetId),
        cqrs: c.type === "CQRS"
      })).filter(
        (c) => b.has(c.sourceId) && b.has(c.targetId) && c.sourceId !== c.targetId
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
  ], L = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const T of c.useCases ?? []) L.set(T.id, c.id);
    for (const T of c.domainEvents ?? []) L.set(T.id, c.id);
    for (const T of c.applicationEvents ?? []) L.set(T.id, c.id);
    for (const T of c.queryServices ?? []) L.set(T.id, c.id);
  }
  const B = (c) => b.has(c) ? c : L.get(c) ?? c, V = /* @__PURE__ */ new Map();
  for (const c of e.modules) {
    for (const T of c.domainEvents ?? []) V.set(T.name, T.id);
    for (const T of c.applicationEvents ?? []) V.set(T.name, T.id);
  }
  const le = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (c) => (c.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: c.id, targetId: B(T.targetUseCaseId) }))
      ).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], ae = [
    ...new Map(
      (e.workflows ?? []).filter((c) => c.triggerEvent && V.has(c.triggerEvent)).map((c) => ({
        sourceId: B(V.get(c.triggerEvent)),
        targetId: c.id,
        label: c.triggerEvent
      })).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], G = /* @__PURE__ */ new Map();
  for (const c of e.externalSystems)
    for (const T of c.tables ?? []) G.set(T.id, c.id);
  const Q = (e.notifications ?? []).flatMap((c) => {
    var J;
    const T = b.has(c.id) ? c.id : c.ownerModuleId && b.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!T) return [];
    const W = [];
    if (c.eventId) {
      const K = b.has(c.eventId) ? c.eventId : L.get(c.eventId);
      K && b.has(K) && K !== T && W.push({
        id: `notif:${c.id}`,
        sourceId: K,
        targetId: T,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const K of c.recipientRoleIds ?? [])
      b.has(K) && W.push({
        id: `notifto:${c.id}:${K}`,
        sourceId: T,
        targetId: K,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((J = (c.channels ?? [])[0]) == null ? void 0 : J.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${c.name} avisa a este rol — Supr lo quita`
      });
    return W;
  }), H = (e.documents ?? []).flatMap((c) => {
    const T = b.has(c.id) ? c.id : c.ownerModuleId && b.has(c.ownerModuleId) ? c.ownerModuleId : null;
    if (!T || !c.queryServiceId) return [];
    const W = b.has(c.queryServiceId) ? c.queryServiceId : L.get(c.queryServiceId);
    return !W || !b.has(W) || W === T ? [] : [{
      id: `docq:${c.id}`,
      sourceId: W,
      targetId: T,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), ie = (e.etlFlows ?? []).flatMap(
    (c) => (c.steps ?? []).flatMap((T) => {
      const W = b.has(c.id) ? c.id : c.ownerModuleId && b.has(c.ownerModuleId) ? c.ownerModuleId : null;
      if (!W) return [];
      const J = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!J) return [];
      let K = J;
      if (!b.has(K) && T.operationId && T.apiId && (K = T.apiId), !b.has(K) && T.externalTableId && (K = G.get(T.externalTableId) ?? K), b.has(K) || (K = P(K)), b.has(K) || (K = L.get(J) ?? K), !b.has(K) || K === W) return [];
      const ce = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${c.id}:${T.id}`,
        sourceId: ce ? K : W,
        targetId: ce ? W : K,
        kind: ce ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ce ? `${c.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${c.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), ke = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: b.has(T) ? T : G.get(T) ?? T,
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], _e = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (c) => (c.sourceApiIds ?? []).map((T) => ({
          sourceId: P(T),
          targetId: c.id,
          name: c.name
        }))
      ).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], Pe = [
    ...new Map(
      (e.rags ?? []).flatMap((c) => [
        ...(c.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: c.id, name: c.name })),
        ...(c.sourceModuleIds ?? []).map((T) => ({ sourceId: T, targetId: c.id, name: c.name }))
      ]).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], xe = [
    ...new Map(
      (e.agentApiUses ?? []).map((c) => ({ sourceId: c.agentId, targetId: P(c.apiId) })).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => [
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
  ], je = (c) => c.onCompletionEventName || `${c.name.replace(/\s+/g, "")}Completado`, ei = (e.workflows ?? []).flatMap(
    (c) => c.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== c.id && je(T) === c.triggerEvent).filter((T) => b.has(T.id) && b.has(c.id)).map((T) => ({
      id: `wfchain:${T.id}->${c.id}`,
      sourceId: T.id,
      targetId: c.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: c.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), mt = [
    ...new Map(
      (e.proxyApis ?? []).filter((c) => c.targetApiId).map((c) => ({ sourceId: P(c.id), targetId: P(c.targetApiId) })).filter(
        (c) => b.has(c.sourceId) && b.has(c.targetId) && c.sourceId !== c.targetId
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
  ], ti = S.flatMap((c) => {
    const T = nt(c.apiId, c.moduleId);
    if (!b.has(T)) return [];
    const W = [];
    for (const J of (e.proxyApis ?? []).filter((K) => K.targetApiId === c.apiId)) {
      const K = P(J.id);
      b.has(K) && K !== T && W.push({
        id: `pxr:${K}->${T}`,
        sourceId: K,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return W;
  }), Qn = (e.proxyOperationRoutes ?? []).flatMap((c) => {
    const T = (e.proxyApis ?? []).find((K) => K.id === c.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const W = st(c.operationId, c.proxyId), J = c.targetSiteId === T.targetApiId ? T.targetApiId : nt(T.targetApiId, c.targetSiteId);
    return !b.has(W) || !b.has(J) ? [] : [{
      id: `oproute:${W}->${J}`,
      sourceId: W,
      targetId: J,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Zn = [
    ...new Map(
      (e.externalOperationUses ?? []).map((c) => {
        if (!b.has(c.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (ce) => ce.operations.some((Te) => Te.id === c.operationId)
        );
        if (!T) return null;
        const W = c.siteId === T.id, J = W ? c.operationId : st(c.operationId, c.siteId);
        let K = b.has(J) ? J : null;
        if (!K)
          if (W || (e.proxyApis ?? []).some((ce) => ce.id === c.siteId))
            K = P(c.siteId);
          else {
            const ce = nt(T.id, c.siteId);
            K = b.has(ce) ? ce : c.siteId;
          }
        return !K || !b.has(K) || K === c.externalSystemId ? null : { u: c, target: K };
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
  ], Jn = r ? (e.apiOperationImplementations ?? []).flatMap((c) => {
    if (!b.has(c.useCaseId)) return [];
    const T = b.has(st(c.operationId, c.moduleId)) ? st(c.operationId, c.moduleId) : b.has(nt(c.apiId, c.moduleId)) ? nt(c.apiId, c.moduleId) : b.has(P(c.moduleId)) ? P(c.moduleId) : null;
    return T ? [{
      id: `apiimplwire:${c.operationId}@${c.moduleId}`,
      sourceId: T,
      targetId: c.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], eo = r ? (e.agentUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.useCaseId)).map((c) => ({
    id: `mcp:${c.agentId}->${c.useCaseId}`,
    sourceId: c.agentId,
    targetId: c.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], to = (e.agentRags ?? []).filter((c) => b.has(c.agentId) && b.has(c.ragId)).map((c) => ({
    id: `agrag:${c.agentId}->${c.ragId}`,
    sourceId: c.agentId,
    targetId: c.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), io = r ? (e.rags ?? []).filter((c) => b.has(c.id)).flatMap(
    (c) => (c.sourceReadModelIds ?? []).filter((T) => b.has(T)).map((T) => ({
      id: `ragsrc:${c.id}->${T}`,
      sourceId: c.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${c.name} indexa este read model`
    }))
  ) : [], so = r ? (e.agentExternalUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.externalUseCaseId)).map((c) => ({
    id: `mcpx:${c.agentId}->${c.externalUseCaseId}`,
    sourceId: c.agentId,
    targetId: c.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], no = r ? (e.agentMcpUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.mcpServerId)).map((c) => ({
    id: `mcpsv:${c.agentId}->${c.mcpServerId}`,
    sourceId: c.agentId,
    targetId: c.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], oo = (e.mcpGateways ?? []).flatMap(
    (c) => [
      ...c.mcpServerIds ?? [],
      ...c.apiIds ?? [],
      ...c.apiOperationIds ?? [],
      ...c.useCaseIds ?? [],
      ...c.ragIds ?? []
    ].filter((T) => b.has(c.id) && b.has(T)).map((T) => ({
      id: `gwx:${c.id}->${T}`,
      sourceId: c.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ao = (e.agentGatewayUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.gatewayId)).map((c) => ({
    id: `aggw:${c.agentId}->${c.gatewayId}`,
    sourceId: c.agentId,
    targetId: c.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ro = r ? (e.agentApiOpUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.apiOperationId)).map((c) => ({
    id: `agapi:${c.agentId}->${c.apiOperationId}`,
    sourceId: c.agentId,
    targetId: c.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], lo = r ? (e.agentQueryUses ?? []).filter((c) => b.has(c.agentId) && b.has(c.queryServiceId)).map((c) => ({
    id: `agqs:${c.agentId}->${c.queryServiceId}`,
    sourceId: c.agentId,
    targetId: c.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], co = (e.agentDelegations ?? []).filter((c) => b.has(c.agentId) && b.has(c.delegateAgentId)).map((c) => ({
    id: `agag:${c.agentId}->${c.delegateAgentId}`,
    sourceId: c.agentId,
    targetId: c.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), po = (e.actorAgentUses ?? []).filter((c) => b.has(c.actorId) && b.has(c.agentId)).map((c) => ({
    id: `useag:${c.actorId}->${c.agentId}`,
    sourceId: c.actorId,
    targetId: c.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), uo = r ? (e.agentTriggers ?? []).filter((c) => b.has(c.eventId) && b.has(c.agentId)).map((c) => ({
    id: `evag:${c.eventId}->${c.agentId}`,
    sourceId: c.eventId,
    targetId: c.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], mo = r ? (e.externalCalls ?? []).filter((c) => b.has(c.externalSystemId) && b.has(c.useCaseId)).map((c) => ({
    id: `extcall:${c.externalSystemId}->${c.useCaseId}`,
    sourceId: c.externalSystemId,
    targetId: c.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], ho = r ? (e.externalUseCaseCalls ?? []).filter((c) => b.has(c.sourceId) && b.has(c.targetId)).map((c) => ({
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
      ...A,
      ...O,
      ...R,
      ...D,
      ...q,
      ...N,
      ...I,
      ...X,
      ...Q,
      ...H,
      ...ie,
      ...C,
      ...v,
      ...x,
      ...$,
      ...M,
      ...mt,
      ...ti,
      ...Qn,
      ...Zn,
      ...Jn,
      ...le,
      ...ae,
      ...ei,
      ...xe,
      ...ke,
      ..._e,
      ...Pe,
      ...eo,
      ...so,
      ...no,
      ...oo,
      ...ao,
      ...ro,
      ...lo,
      ...co,
      ...po,
      ...uo,
      ...to,
      ...io,
      ...w,
      ...mo,
      ...ho
    ]
  };
}
const Eo = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, So = 176, Co = 60, Ao = 140, Mo = 40;
function Po(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((l) => l.moduleId === n.id).forEach((l, p) => {
      const g = s.filter((y) => y.aggregateId === l.id).length, m = 140 + p * (170 + g * 60);
      t[l.id] = { x: a, y: m }, s.filter((y) => y.aggregateId === l.id).forEach((y, f) => {
        t[y.id] = { x: a + 60, y: m + 100 + f * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function To(e, t) {
  const i = Po(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const g = n.get(p.moduleId), m = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", y = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: y.x,
      y: y.y,
      w: So,
      h: Co,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Eo[m],
      stroke: "#64748b",
      badge: g ? `${g.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${g ? ` — módulo ${g.name} (${m})` : ""}`
    };
  }), a = (e.entities ?? []).map((p) => {
    const g = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: Ao,
      h: Mo,
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
    nodes: [...o, ...a],
    edges: [...r, ...l]
  };
}
const Oo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ro = 150, No = 44, Do = 190, Lo = 56, zo = 160, Uo = 48;
function qo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Fo(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (r) => {
    var l, p;
    return ((p = (l = e.aggregates) == null ? void 0 : l.find((g) => g.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const p = 120 + l * 130, g = Oo[r.archetype] ?? "#475569", m = r.triggerAggregateId ?? r.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const h = t[m] ?? { x: 160, y: p };
      s.push({
        id: m,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : m,
        x: h.x,
        y: h.y,
        w: Ro,
        h: No,
        kind: r.triggerAggregateId ? "aggregate" : "module",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const y = `flow:${r.id}`, f = t[y] ?? { x: 470, y: p };
    s.push({
      id: y,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Do,
      h: Lo,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const d = qo(e, r), u = `tgt:${d.id}`;
    if (!o.has(u)) {
      o.add(u);
      const h = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: d.label,
        x: h.x,
        y: h.y,
        w: zo,
        h: Uo,
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
      sourceId: m,
      targetId: y,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${r.id}:out`,
      sourceId: y,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const Bo = 190, Wo = 56, Ui = 170, Ho = 52;
function ks(e, t) {
  const i = [], s = [], n = (o) => {
    var a;
    return (a = e.modules.find((r) => r.id === o)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((o, a) => {
    const r = 140 + a * 240, l = t[o.id] ?? { x: 150, y: r };
    i.push({
      id: o.id,
      label: o.name,
      x: l.x,
      y: l.y,
      w: Bo,
      h: Wo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let p = o.id;
    if (o.steps.forEach((g, m) => {
      const y = g.type === "HUMAN", f = t[g.id] ?? { x: 150 + (m + 1) * 240, y: r };
      if (i.push({
        id: g.id,
        label: g.name,
        x: f.x,
        y: f.y,
        w: Ui,
        h: Ho,
        kind: "process-step",
        symbol: y ? "person" : "gear",
        fill: y ? "#fef3c7" : "#ffffff",
        stroke: y ? "#d97706" : "#64748b",
        badge: y ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${m}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const d = `comp:${g.id}`, u = t[d] ?? { x: f.x, y: f.y + 90 };
        i.push({
          id: d,
          label: g.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Ui,
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
    }), o.onCompletionEventName) {
      const g = `done:${o.id}`, m = t[g] ?? { x: 150 + (o.steps.length + 1) * 240, y: r };
      i.push({
        id: g,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Ui,
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
const ui = globalThis, as = ui.ShadowRoot && (ui.ShadyCSS === void 0 || ui.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rs = Symbol(), _s = /* @__PURE__ */ new WeakMap();
let vn = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== rs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (as && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = _s.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && _s.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vo = (e) => new vn(typeof e == "string" ? e : e + "", void 0, rs), pt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new vn(i, e, rs);
}, Go = (e, t) => {
  if (as) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = ui.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, $s = as ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Vo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Yo, defineProperty: jo, getOwnPropertyDescriptor: Ko, getOwnPropertyNames: Xo, getOwnPropertySymbols: Qo, getPrototypeOf: Zo } = Object, Je = globalThis, Es = Je.trustedTypes, Jo = Es ? Es.emptyScript : "", qi = Je.reactiveElementPolyfillSupport, Ut = (e, t) => e, bi = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Jo : null;
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
} }, ds = (e, t) => !Yo(e, t), Ss = { attribute: !0, type: String, converter: bi, reflect: !1, useDefault: !1, hasChanged: ds };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Je.litPropertyMetadata ?? (Je.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let yt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ss) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && jo(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Ko(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const r = n == null ? void 0 : n.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ss;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ut("elementProperties"))) return;
    const t = Zo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ut("properties"))) {
      const i = this.properties, s = [...Xo(i), ...Qo(i)];
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
      for (const n of s) i.unshift($s(n));
    } else t !== void 0 && i.push($s(t));
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
    return Go(t, this.constructor.elementStyles), t;
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
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : bi).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : bi;
      this._$Em = n;
      const p = l.fromAttribute(i, r.type);
      this[n] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? ds)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, s)))) return;
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
        const { wrapped: r } = a, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
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
yt.elementStyles = [], yt.shadowRootOptions = { mode: "open" }, yt[Ut("elementProperties")] = /* @__PURE__ */ new Map(), yt[Ut("finalized")] = /* @__PURE__ */ new Map(), qi == null || qi({ ReactiveElement: yt }), (Je.reactiveElementVersions ?? (Je.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = globalThis, Cs = (e) => e, xi = qt.trustedTypes, As = xi ? xi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, wn = "$lit$", Qe = `lit$${Math.random().toFixed(9).slice(2)}$`, bn = "?" + Qe, ea = `<${bn}>`, lt = document, Wt = () => lt.createComment(""), Ht = (e) => e === null || typeof e != "object" && typeof e != "function", ls = Array.isArray, ta = (e) => ls(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Fi = `[ 	
\f\r]`, Pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ms = /-->/g, Ps = />/g, tt = RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ts = /'/g, Os = /"/g, xn = /^(?:script|style|textarea|title)$/i, kn = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = kn(1), ee = kn(2), xt = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), Rs = /* @__PURE__ */ new WeakMap(), ot = lt.createTreeWalker(lt, 129);
function _n(e, t) {
  if (!ls(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return As !== void 0 ? As.createHTML(t) : t;
}
const ia = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Pt;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let p, g, m = -1, y = 0;
    for (; y < l.length && (a.lastIndex = y, g = a.exec(l), g !== null); ) y = a.lastIndex, a === Pt ? g[1] === "!--" ? a = Ms : g[1] !== void 0 ? a = Ps : g[2] !== void 0 ? (xn.test(g[2]) && (n = RegExp("</" + g[2], "g")), a = tt) : g[3] !== void 0 && (a = tt) : a === tt ? g[0] === ">" ? (a = n ?? Pt, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? tt : g[3] === '"' ? Os : Ts) : a === Os || a === Ts ? a = tt : a === Ms || a === Ps ? a = Pt : (a = tt, n = void 0);
    const f = a === tt && e[r + 1].startsWith("/>") ? " " : "";
    o += a === Pt ? l + ea : m >= 0 ? (s.push(p), l.slice(0, m) + wn + l.slice(m) + Qe + f) : l + Qe + (m === -2 ? r : f);
  }
  return [_n(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Vt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const r = t.length - 1, l = this.parts, [p, g] = ia(t, i);
    if (this.el = Vt.createElement(p, s), ot.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = ot.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith(wn)) {
          const y = g[a++], f = n.getAttribute(m).split(Qe), d = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: o, name: d[2], strings: f, ctor: d[1] === "." ? na : d[1] === "?" ? oa : d[1] === "@" ? aa : Mi }), n.removeAttribute(m);
        } else m.startsWith(Qe) && (l.push({ type: 6, index: o }), n.removeAttribute(m));
        if (xn.test(n.tagName)) {
          const m = n.textContent.split(Qe), y = m.length - 1;
          if (y > 0) {
            n.textContent = xi ? xi.emptyScript : "";
            for (let f = 0; f < y; f++) n.append(m[f], Wt()), ot.nextNode(), l.push({ type: 2, index: ++o });
            n.append(m[y], Wt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bn) l.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(Qe, m + 1)) !== -1; ) l.push({ type: 7, index: o }), m += Qe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = lt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function kt(e, t, i = e, s) {
  var a, r;
  if (t === xt) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = Ht(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((r = n == null ? void 0 : n._$AO) == null || r.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = kt(e, n._$AS(e, t.values), n, s)), t;
}
class sa {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? lt).importNode(i, !0);
    ot.currentNode = n;
    let o = ot.nextNode(), a = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new Xt(o, o.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (p = new ra(o, this, t)), this._$AV.push(p), l = s[++r];
      }
      a !== (l == null ? void 0 : l.index) && (o = ot.nextNode(), a++);
    }
    return ot.currentNode = lt, n;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class Xt {
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
    t = kt(this, t, i), Ht(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== xt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ta(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && Ht(this._$AH) ? this._$AA.nextSibling.data = t : this.T(lt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Vt.createElement(_n(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new sa(n, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = Rs.get(t.strings);
    return i === void 0 && Rs.set(t.strings, i = new Vt(t)), i;
  }
  k(t) {
    ls(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new Xt(this.O(Wt()), this.O(Wt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = Cs(t).nextSibling;
      Cs(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Mi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = se;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = kt(this, t, i, 0), a = !Ht(t) || t !== this._$AH && t !== xt, a && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = o[0], l = 0; l < o.length - 1; l++) p = kt(this, r[s + l], i, l), p === xt && (p = this._$AH[l]), a || (a = !Ht(p) || p !== this._$AH[l]), p === se ? t = se : t !== se && (t += (p ?? "") + o[l + 1]), this._$AH[l] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class na extends Mi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class oa extends Mi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class aa extends Mi {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = kt(this, t, i, 0) ?? se) === xt) return;
    const s = this._$AH, n = t === se && s !== se || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== se && (s === se || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ra {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    kt(this, t);
  }
}
const Bi = qt.litHtmlPolyfillSupport;
Bi == null || Bi(Vt, Xt), (qt.litHtmlVersions ?? (qt.litHtmlVersions = [])).push("3.3.3");
const da = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Xt(t.insertBefore(Wt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis;
class De extends yt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = da(i, this.renderRoot, this.renderOptions);
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
    return xt;
  }
}
var un;
De._$litElement$ = !0, De.finalized = !0, (un = rt.litElementHydrateSupport) == null || un.call(rt, { LitElement: De });
const Wi = rt.litElementPolyfillSupport;
Wi == null || Wi({ LitElement: De });
(rt.litElementVersions ?? (rt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const la = { attribute: !0, type: String, converter: bi, reflect: !1, hasChanged: ds }, ca = (e = la, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function oe(e) {
  return (t, i) => typeof i == "object" ? ca(e, t, i) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return oe({ ...e, state: !0, attribute: !1 });
}
var Ki = "http://www.w3.org/1999/xhtml";
const Ns = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Pi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Ns.hasOwnProperty(t) ? { space: Ns[t], local: e } : e;
}
function pa(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ki && t.documentElement.namespaceURI === Ki ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function ua(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function $n(e) {
  var t = Pi(e);
  return (t.local ? ua : pa)(t);
}
function ma() {
}
function cs(e) {
  return e == null ? ma : function() {
    return this.querySelector(e);
  };
}
function ha(e) {
  typeof e != "function" && (e = cs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = new Array(a), l, p, g = 0; g < a; ++g)
      (l = o[g]) && (p = e.call(l, l.__data__, g, o)) && ("__data__" in l && (p.__data__ = l.__data__), r[g] = p);
  return new Ce(s, this._parents);
}
function fa(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ga() {
  return [];
}
function En(e) {
  return e == null ? ga : function() {
    return this.querySelectorAll(e);
  };
}
function Ia(e) {
  return function() {
    return fa(e.apply(this, arguments));
  };
}
function ya(e) {
  typeof e == "function" ? e = Ia(e) : e = En(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], r = a.length, l, p = 0; p < r; ++p)
      (l = a[p]) && (s.push(e.call(l, l.__data__, p, a)), n.push(l));
  return new Ce(s, n);
}
function Sn(e) {
  return function() {
    return this.matches(e);
  };
}
function Cn(e) {
  return function(t) {
    return t.matches(e);
  };
}
var va = Array.prototype.find;
function wa(e) {
  return function() {
    return va.call(this.children, e);
  };
}
function ba() {
  return this.firstElementChild;
}
function xa(e) {
  return this.select(e == null ? ba : wa(typeof e == "function" ? e : Cn(e)));
}
var ka = Array.prototype.filter;
function _a() {
  return Array.from(this.children);
}
function $a(e) {
  return function() {
    return ka.call(this.children, e);
  };
}
function Ea(e) {
  return this.selectAll(e == null ? _a : $a(typeof e == "function" ? e : Cn(e)));
}
function Sa(e) {
  typeof e != "function" && (e = Sn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = [], l, p = 0; p < a; ++p)
      (l = o[p]) && e.call(l, l.__data__, p, o) && r.push(l);
  return new Ce(s, this._parents);
}
function An(e) {
  return new Array(e.length);
}
function Ca() {
  return new Ce(this._enter || this._groups.map(An), this._parents);
}
function ki(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ki.prototype = {
  constructor: ki,
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
function Aa(e) {
  return function() {
    return e;
  };
}
function Ma(e, t, i, s, n, o) {
  for (var a = 0, r, l = t.length, p = o.length; a < p; ++a)
    (r = t[a]) ? (r.__data__ = o[a], s[a] = r) : i[a] = new ki(e, o[a]);
  for (; a < l; ++a)
    (r = t[a]) && (n[a] = r);
}
function Pa(e, t, i, s, n, o, a) {
  var r, l, p = /* @__PURE__ */ new Map(), g = t.length, m = o.length, y = new Array(g), f;
  for (r = 0; r < g; ++r)
    (l = t[r]) && (y[r] = f = a.call(l, l.__data__, r, t) + "", p.has(f) ? n[r] = l : p.set(f, l));
  for (r = 0; r < m; ++r)
    f = a.call(e, o[r], r, o) + "", (l = p.get(f)) ? (s[r] = l, l.__data__ = o[r], p.delete(f)) : i[r] = new ki(e, o[r]);
  for (r = 0; r < g; ++r)
    (l = t[r]) && p.get(y[r]) === l && (n[r] = l);
}
function Ta(e) {
  return e.__data__;
}
function Oa(e, t) {
  if (!arguments.length) return Array.from(this, Ta);
  var i = t ? Pa : Ma, s = this._parents, n = this._groups;
  typeof e != "function" && (e = Aa(e));
  for (var o = n.length, a = new Array(o), r = new Array(o), l = new Array(o), p = 0; p < o; ++p) {
    var g = s[p], m = n[p], y = m.length, f = Ra(e.call(g, g && g.__data__, p, s)), d = f.length, u = r[p] = new Array(d), h = a[p] = new Array(d), w = l[p] = new Array(y);
    i(g, m, u, h, w, f, t);
    for (var A = 0, O = 0, F, k; A < d; ++A)
      if (F = u[A]) {
        for (A >= O && (O = A + 1); !(k = h[O]) && ++O < d; ) ;
        F._next = k || null;
      }
  }
  return a = new Ce(a, s), a._enter = r, a._exit = l, a;
}
function Ra(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Na() {
  return new Ce(this._exit || this._groups.map(An), this._parents);
}
function Da(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function La(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), r = new Array(n), l = 0; l < a; ++l)
    for (var p = i[l], g = s[l], m = p.length, y = r[l] = new Array(m), f, d = 0; d < m; ++d)
      (f = p[d] || g[d]) && (y[d] = f);
  for (; l < n; ++l)
    r[l] = i[l];
  return new Ce(r, this._parents);
}
function za() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Ua(e) {
  e || (e = qa);
  function t(m, y) {
    return m && y ? e(m.__data__, y.__data__) : !m - !y;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], r = a.length, l = n[o] = new Array(r), p, g = 0; g < r; ++g)
      (p = a[g]) && (l[g] = p);
    l.sort(t);
  }
  return new Ce(n, this._parents).order();
}
function qa(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Fa() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ba() {
  return Array.from(this);
}
function Wa() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function Ha() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Va() {
  return !this.node();
}
function Ga(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, r; o < a; ++o)
      (r = n[o]) && e.call(r, r.__data__, o, n);
  return this;
}
function Ya(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ja(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ka(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Xa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Qa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Za(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Ja(e, t) {
  var i = Pi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ja : Ya : typeof t == "function" ? i.local ? Za : Qa : i.local ? Xa : Ka)(i, t));
}
function Mn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function er(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function tr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function ir(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function sr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? er : typeof t == "function" ? ir : tr)(e, t, i ?? "")) : _t(this.node(), e);
}
function _t(e, t) {
  return e.style.getPropertyValue(t) || Mn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function nr(e) {
  return function() {
    delete this[e];
  };
}
function or(e, t) {
  return function() {
    this[e] = t;
  };
}
function ar(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function rr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? nr : typeof t == "function" ? ar : or)(e, t)) : this.node()[e];
}
function Pn(e) {
  return e.trim().split(/^|\s+/);
}
function ps(e) {
  return e.classList || new Tn(e);
}
function Tn(e) {
  this._node = e, this._names = Pn(e.getAttribute("class") || "");
}
Tn.prototype = {
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
function On(e, t) {
  for (var i = ps(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Rn(e, t) {
  for (var i = ps(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function dr(e) {
  return function() {
    On(this, e);
  };
}
function lr(e) {
  return function() {
    Rn(this, e);
  };
}
function cr(e, t) {
  return function() {
    (t.apply(this, arguments) ? On : Rn)(this, e);
  };
}
function pr(e, t) {
  var i = Pn(e + "");
  if (arguments.length < 2) {
    for (var s = ps(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? cr : t ? dr : lr)(i, t));
}
function ur() {
  this.textContent = "";
}
function mr(e) {
  return function() {
    this.textContent = e;
  };
}
function hr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function fr(e) {
  return arguments.length ? this.each(e == null ? ur : (typeof e == "function" ? hr : mr)(e)) : this.node().textContent;
}
function gr() {
  this.innerHTML = "";
}
function Ir(e) {
  return function() {
    this.innerHTML = e;
  };
}
function yr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function vr(e) {
  return arguments.length ? this.each(e == null ? gr : (typeof e == "function" ? yr : Ir)(e)) : this.node().innerHTML;
}
function wr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function br() {
  return this.each(wr);
}
function xr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function kr() {
  return this.each(xr);
}
function _r(e) {
  var t = typeof e == "function" ? e : $n(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function $r() {
  return null;
}
function Er(e, t) {
  var i = typeof e == "function" ? e : $n(e), s = t == null ? $r : typeof t == "function" ? t : cs(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Sr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Cr() {
  return this.each(Sr);
}
function Ar() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Mr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Pr(e) {
  return this.select(e ? Mr : Ar);
}
function Tr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Or(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Rr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Nr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Dr(e, t, i) {
  return function() {
    var s = this.__on, n, o = Or(t);
    if (s) {
      for (var a = 0, r = s.length; a < r; ++a)
        if ((n = s[a]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Lr(e, t, i) {
  var s = Rr(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, p = r.length, g; l < p; ++l)
        for (n = 0, g = r[l]; n < o; ++n)
          if ((a = s[n]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Dr : Nr, n = 0; n < o; ++n) this.each(r(s[n], t, i));
  return this;
}
function Nn(e, t, i) {
  var s = Mn(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function zr(e, t) {
  return function() {
    return Nn(this, e, t);
  };
}
function Ur(e, t) {
  return function() {
    return Nn(this, e, t.apply(this, arguments));
  };
}
function qr(e, t) {
  return this.each((typeof t == "function" ? Ur : zr)(e, t));
}
function* Fr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var Dn = [null];
function Ce(e, t) {
  this._groups = e, this._parents = t;
}
function Qt() {
  return new Ce([[document.documentElement]], Dn);
}
function Br() {
  return this;
}
Ce.prototype = Qt.prototype = {
  constructor: Ce,
  select: ha,
  selectAll: ya,
  selectChild: xa,
  selectChildren: Ea,
  filter: Sa,
  data: Oa,
  enter: Ca,
  exit: Na,
  join: Da,
  merge: La,
  selection: Br,
  order: za,
  sort: Ua,
  call: Fa,
  nodes: Ba,
  node: Wa,
  size: Ha,
  empty: Va,
  each: Ga,
  attr: Ja,
  style: sr,
  property: rr,
  classed: pr,
  text: fr,
  html: vr,
  raise: br,
  lower: kr,
  append: _r,
  insert: Er,
  remove: Cr,
  clone: Pr,
  datum: Tr,
  on: Lr,
  dispatch: qr,
  [Symbol.iterator]: Fr
};
function Re(e) {
  return typeof e == "string" ? new Ce([[document.querySelector(e)]], [document.documentElement]) : new Ce([[e]], Dn);
}
function Wr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function it(e, t) {
  if (e = Wr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Hr = { value: () => {
} };
function us() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new mi(i);
}
function mi(e) {
  this._ = e;
}
function Vr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
mi.prototype = us.prototype = {
  constructor: mi,
  on: function(e, t) {
    var i = this._, s = Vr(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = Gr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = Ds(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = Ds(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new mi(e);
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
function Gr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function Ds(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Hr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Xi = { capture: !0, passive: !1 };
function Qi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Yr(e) {
  var t = e.document.documentElement, i = Re(e).on("dragstart.drag", Qi, Xi);
  "onselectstart" in t ? i.on("selectstart.drag", Qi, Xi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function jr(e, t) {
  var i = e.document.documentElement, s = Re(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Qi, Xi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ms(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Ln(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function Zt() {
}
var Gt = 0.7, _i = 1 / Gt, bt = "\\s*([+-]?\\d+)\\s*", Yt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Kr = /^#([0-9a-f]{3,8})$/, Xr = new RegExp(`^rgb\\(${bt},${bt},${bt}\\)$`), Qr = new RegExp(`^rgb\\(${Ue},${Ue},${Ue}\\)$`), Zr = new RegExp(`^rgba\\(${bt},${bt},${bt},${Yt}\\)$`), Jr = new RegExp(`^rgba\\(${Ue},${Ue},${Ue},${Yt}\\)$`), ed = new RegExp(`^hsl\\(${Yt},${Ue},${Ue}\\)$`), td = new RegExp(`^hsla\\(${Yt},${Ue},${Ue},${Yt}\\)$`), Ls = {
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
ms(Zt, jt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zs,
  // Deprecated! Use color.formatHex.
  formatHex: zs,
  formatHex8: id,
  formatHsl: sd,
  formatRgb: Us,
  toString: Us
});
function zs() {
  return this.rgb().formatHex();
}
function id() {
  return this.rgb().formatHex8();
}
function sd() {
  return zn(this).formatHsl();
}
function Us() {
  return this.rgb().formatRgb();
}
function jt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Kr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? qs(t) : i === 3 ? new $e(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? oi(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? oi(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Xr.exec(e)) ? new $e(t[1], t[2], t[3], 1) : (t = Qr.exec(e)) ? new $e(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Zr.exec(e)) ? oi(t[1], t[2], t[3], t[4]) : (t = Jr.exec(e)) ? oi(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ed.exec(e)) ? Ws(t[1], t[2] / 100, t[3] / 100, 1) : (t = td.exec(e)) ? Ws(t[1], t[2] / 100, t[3] / 100, t[4]) : Ls.hasOwnProperty(e) ? qs(Ls[e]) : e === "transparent" ? new $e(NaN, NaN, NaN, 0) : null;
}
function qs(e) {
  return new $e(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function oi(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new $e(e, t, i, s);
}
function nd(e) {
  return e instanceof Zt || (e = jt(e)), e ? (e = e.rgb(), new $e(e.r, e.g, e.b, e.opacity)) : new $e();
}
function Zi(e, t, i, s) {
  return arguments.length === 1 ? nd(e) : new $e(e, t, i, s ?? 1);
}
function $e(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
ms($e, Zi, Ln(Zt, {
  brighter(e) {
    return e = e == null ? _i : Math.pow(_i, e), new $e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Gt : Math.pow(Gt, e), new $e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new $e(dt(this.r), dt(this.g), dt(this.b), $i(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fs,
  // Deprecated! Use color.formatHex.
  formatHex: Fs,
  formatHex8: od,
  formatRgb: Bs,
  toString: Bs
}));
function Fs() {
  return `#${at(this.r)}${at(this.g)}${at(this.b)}`;
}
function od() {
  return `#${at(this.r)}${at(this.g)}${at(this.b)}${at((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Bs() {
  const e = $i(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${dt(this.r)}, ${dt(this.g)}, ${dt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function $i(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function dt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function at(e) {
  return e = dt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ws(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ne(e, t, i, s);
}
function zn(e) {
  if (e instanceof Ne) return new Ne(e.h, e.s, e.l, e.opacity);
  if (e instanceof Zt || (e = jt(e)), !e) return new Ne();
  if (e instanceof Ne) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, r = o - n, l = (o + n) / 2;
  return r ? (t === o ? a = (i - s) / r + (i < s) * 6 : i === o ? a = (s - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? o + n : 2 - o - n, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new Ne(a, r, l, e.opacity);
}
function ad(e, t, i, s) {
  return arguments.length === 1 ? zn(e) : new Ne(e, t, i, s ?? 1);
}
function Ne(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
ms(Ne, ad, Ln(Zt, {
  brighter(e) {
    return e = e == null ? _i : Math.pow(_i, e), new Ne(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Gt : Math.pow(Gt, e), new Ne(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new $e(
      Hi(e >= 240 ? e - 240 : e + 120, n, s),
      Hi(e, n, s),
      Hi(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Ne(Hs(this.h), ai(this.s), ai(this.l), $i(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = $i(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Hs(this.h)}, ${ai(this.s) * 100}%, ${ai(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Hs(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ai(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Hi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Un = (e) => () => e;
function rd(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function dd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function ld(e) {
  return (e = +e) == 1 ? qn : function(t, i) {
    return i - t ? dd(t, i, e) : Un(isNaN(t) ? i : t);
  };
}
function qn(e, t) {
  var i = t - e;
  return i ? rd(e, i) : Un(isNaN(e) ? t : e);
}
const Vs = (function e(t) {
  var i = ld(t);
  function s(n, o) {
    var a = i((n = Zi(n)).r, (o = Zi(o)).r), r = i(n.g, o.g), l = i(n.b, o.b), p = qn(n.opacity, o.opacity);
    return function(g) {
      return n.r = a(g), n.g = r(g), n.b = l(g), n.opacity = p(g), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Xe(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Vi = new RegExp(Ji.source, "g");
function cd(e) {
  return function() {
    return e;
  };
}
function pd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ud(e, t) {
  var i = Ji.lastIndex = Vi.lastIndex = 0, s, n, o, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (s = Ji.exec(e)) && (n = Vi.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), r[a] ? r[a] += o : r[++a] = o), (s = s[0]) === (n = n[0]) ? r[a] ? r[a] += n : r[++a] = n : (r[++a] = null, l.push({ i: a, x: Xe(s, n) })), i = Vi.lastIndex;
  return i < t.length && (o = t.slice(i), r[a] ? r[a] += o : r[++a] = o), r.length < 2 ? l[0] ? pd(l[0].x) : cd(t) : (t = l.length, function(p) {
    for (var g = 0, m; g < t; ++g) r[(m = l[g]).i] = m.x(p);
    return r.join("");
  });
}
var Gs = 180 / Math.PI, es = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fn(e, t, i, s, n, o) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * s) && (i -= e * l, s -= t * l), (r = Math.sqrt(i * i + s * s)) && (i /= r, s /= r, l /= r), e * s < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * Gs,
    skewX: Math.atan(l) * Gs,
    scaleX: a,
    scaleY: r
  };
}
var ri;
function md(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? es : Fn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function hd(e) {
  return e == null || (ri || (ri = document.createElementNS("http://www.w3.org/2000/svg", "g")), ri.setAttribute("transform", e), !(e = ri.transform.baseVal.consolidate())) ? es : (e = e.matrix, Fn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Bn(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, g, m, y, f, d) {
    if (p !== m || g !== y) {
      var u = f.push("translate(", null, t, null, i);
      d.push({ i: u - 4, x: Xe(p, m) }, { i: u - 2, x: Xe(g, y) });
    } else (m || y) && f.push("translate(" + m + t + y + i);
  }
  function a(p, g, m, y) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), y.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Xe(p, g) })) : g && m.push(n(m) + "rotate(" + g + s);
  }
  function r(p, g, m, y) {
    p !== g ? y.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Xe(p, g) }) : g && m.push(n(m) + "skewX(" + g + s);
  }
  function l(p, g, m, y, f, d) {
    if (p !== m || g !== y) {
      var u = f.push(n(f) + "scale(", null, ",", null, ")");
      d.push({ i: u - 4, x: Xe(p, m) }, { i: u - 2, x: Xe(g, y) });
    } else (m !== 1 || y !== 1) && f.push(n(f) + "scale(" + m + "," + y + ")");
  }
  return function(p, g) {
    var m = [], y = [];
    return p = e(p), g = e(g), o(p.translateX, p.translateY, g.translateX, g.translateY, m, y), a(p.rotate, g.rotate, m, y), r(p.skewX, g.skewX, m, y), l(p.scaleX, p.scaleY, g.scaleX, g.scaleY, m, y), p = g = null, function(f) {
      for (var d = -1, u = y.length, h; ++d < u; ) m[(h = y[d]).i] = h.x(f);
      return m.join("");
    };
  };
}
var fd = Bn(md, "px, ", "px)", "deg)"), gd = Bn(hd, ", ", ")", ")"), Id = 1e-12;
function Ys(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function yd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function vd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const wd = (function e(t, i, s) {
  function n(o, a) {
    var r = o[0], l = o[1], p = o[2], g = a[0], m = a[1], y = a[2], f = g - r, d = m - l, u = f * f + d * d, h, w;
    if (u < Id)
      w = Math.log(y / p) / t, h = function(b) {
        return [
          r + b * f,
          l + b * d,
          p * Math.exp(t * b * w)
        ];
      };
    else {
      var A = Math.sqrt(u), O = (y * y - p * p + s * u) / (2 * p * i * A), F = (y * y - p * p - s * u) / (2 * y * i * A), k = Math.log(Math.sqrt(O * O + 1) - O), S = Math.log(Math.sqrt(F * F + 1) - F);
      w = (S - k) / t, h = function(b) {
        var z = b * w, R = Ys(k), D = p / (i * A) * (R * vd(t * z + k) - yd(k));
        return [
          r + D * f,
          l + D * d,
          p * R / Ys(t * z + k)
        ];
      };
    }
    return h.duration = w * 1e3 * t / Math.SQRT2, h;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), r = a * a, l = r * r;
    return e(a, r, l);
  }, n;
})(Math.SQRT2, 2, 4);
var $t = 0, Lt = 0, Tt = 0, Wn = 1e3, Ei, zt, Si = 0, ct = 0, Ti = 0, Kt = typeof performance == "object" && performance.now ? performance : Date, Hn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function hs() {
  return ct || (Hn(bd), ct = Kt.now() + Ti);
}
function bd() {
  ct = 0;
}
function Ci() {
  this._call = this._time = this._next = null;
}
Ci.prototype = Vn.prototype = {
  constructor: Ci,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? hs() : +i) + (t == null ? 0 : +t), !this._next && zt !== this && (zt ? zt._next = this : Ei = this, zt = this), this._call = e, this._time = i, ts();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ts());
  }
};
function Vn(e, t, i) {
  var s = new Ci();
  return s.restart(e, t, i), s;
}
function xd() {
  hs(), ++$t;
  for (var e = Ei, t; e; )
    (t = ct - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --$t;
}
function js() {
  ct = (Si = Kt.now()) + Ti, $t = Lt = 0;
  try {
    xd();
  } finally {
    $t = 0, _d(), ct = 0;
  }
}
function kd() {
  var e = Kt.now(), t = e - Si;
  t > Wn && (Ti -= t, Si = e);
}
function _d() {
  for (var e, t = Ei, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ei = i);
  zt = e, ts(s);
}
function ts(e) {
  if (!$t) {
    Lt && (Lt = clearTimeout(Lt));
    var t = e - ct;
    t > 24 ? (e < 1 / 0 && (Lt = setTimeout(js, e - Kt.now() - Ti)), Tt && (Tt = clearInterval(Tt))) : (Tt || (Si = Kt.now(), Tt = setInterval(kd, Wn)), $t = 1, Hn(js));
  }
}
function Ks(e, t, i) {
  var s = new Ci();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var $d = us("start", "end", "cancel", "interrupt"), Ed = [], Gn = 0, Xs = 1, is = 2, hi = 3, Qs = 4, ss = 5, fi = 6;
function Oi(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  Sd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: $d,
    tween: Ed,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Gn
  });
}
function fs(e, t) {
  var i = Le(e, t);
  if (i.state > Gn) throw new Error("too late; already scheduled");
  return i;
}
function qe(e, t) {
  var i = Le(e, t);
  if (i.state > hi) throw new Error("too late; already running");
  return i;
}
function Le(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function Sd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Vn(o, 0, i.time);
  function o(p) {
    i.state = Xs, i.timer.restart(a, i.delay, i.time), i.delay <= p && a(p - i.delay);
  }
  function a(p) {
    var g, m, y, f;
    if (i.state !== Xs) return l();
    for (g in s)
      if (f = s[g], f.name === i.name) {
        if (f.state === hi) return Ks(a);
        f.state === Qs ? (f.state = fi, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete s[g]) : +g < t && (f.state = fi, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete s[g]);
      }
    if (Ks(function() {
      i.state === hi && (i.state = Qs, i.timer.restart(r, i.delay, i.time), r(p));
    }), i.state = is, i.on.call("start", e, e.__data__, i.index, i.group), i.state === is) {
      for (i.state = hi, n = new Array(y = i.tween.length), g = 0, m = -1; g < y; ++g)
        (f = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = f);
      n.length = m + 1;
    }
  }
  function r(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(l), i.state = ss, 1), m = -1, y = n.length; ++m < y; )
      n[m].call(e, g);
    i.state === ss && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = fi, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function gi(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > is && s.state < ss, s.state = fi, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function Cd(e) {
  return this.each(function() {
    gi(this, e);
  });
}
function Ad(e, t) {
  var i, s;
  return function() {
    var n = qe(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var a = 0, r = s.length; a < r; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function Md(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = qe(this, e), a = o.tween;
    if (a !== s) {
      n = (s = a).slice();
      for (var r = { name: t, value: i }, l = 0, p = n.length; l < p; ++l)
        if (n[l].name === t) {
          n[l] = r;
          break;
        }
      l === p && n.push(r);
    }
    o.tween = n;
  };
}
function Pd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Le(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Ad : Md)(i, e, t));
}
function gs(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = qe(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Le(n, s).value[t];
  };
}
function Yn(e, t) {
  var i;
  return (typeof t == "number" ? Xe : t instanceof jt ? Vs : (i = jt(t)) ? (t = i, Vs) : ud)(e, t);
}
function Td(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Od(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Rd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Nd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Dd(e, t, i) {
  var s, n, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r)));
  };
}
function Ld(e, t, i) {
  var s, n, o;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r)));
  };
}
function zd(e, t) {
  var i = Pi(e), s = i === "transform" ? gd : Yn;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Ld : Dd)(i, s, gs(this, "attr." + e, t)) : t == null ? (i.local ? Od : Td)(i) : (i.local ? Nd : Rd)(i, s, t));
}
function Ud(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function qd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Fd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && qd(e, o)), i;
  }
  return n._value = t, n;
}
function Bd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Ud(e, o)), i;
  }
  return n._value = t, n;
}
function Wd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = Pi(e);
  return this.tween(i, (s.local ? Fd : Bd)(s, t));
}
function Hd(e, t) {
  return function() {
    fs(this, e).delay = +t.apply(this, arguments);
  };
}
function Vd(e, t) {
  return t = +t, function() {
    fs(this, e).delay = t;
  };
}
function Gd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Hd : Vd)(t, e)) : Le(this.node(), t).delay;
}
function Yd(e, t) {
  return function() {
    qe(this, e).duration = +t.apply(this, arguments);
  };
}
function jd(e, t) {
  return t = +t, function() {
    qe(this, e).duration = t;
  };
}
function Kd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Yd : jd)(t, e)) : Le(this.node(), t).duration;
}
function Xd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    qe(this, e).ease = t;
  };
}
function Qd(e) {
  var t = this._id;
  return arguments.length ? this.each(Xd(t, e)) : Le(this.node(), t).ease;
}
function Zd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    qe(this, e).ease = i;
  };
}
function Jd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Zd(this._id, e));
}
function el(e) {
  typeof e != "function" && (e = Sn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, r = s[n] = [], l, p = 0; p < a; ++p)
      (l = o[p]) && e.call(l, l.__data__, p, o) && r.push(l);
  return new Ye(s, this._parents, this._name, this._id);
}
function tl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), r = 0; r < o; ++r)
    for (var l = t[r], p = i[r], g = l.length, m = a[r] = new Array(g), y, f = 0; f < g; ++f)
      (y = l[f] || p[f]) && (m[f] = y);
  for (; r < s; ++r)
    a[r] = t[r];
  return new Ye(a, this._parents, this._name, this._id);
}
function il(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function sl(e, t, i) {
  var s, n, o = il(t) ? fs : qe;
  return function() {
    var a = o(this, e), r = a.on;
    r !== s && (n = (s = r).copy()).on(t, i), a.on = n;
  };
}
function nl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Le(this.node(), i).on.on(e) : this.each(sl(i, e, t));
}
function ol(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function al() {
  return this.on("end.remove", ol(this._id));
}
function rl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = cs(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var r = s[a], l = r.length, p = o[a] = new Array(l), g, m, y = 0; y < l; ++y)
      (g = r[y]) && (m = e.call(g, g.__data__, y, r)) && ("__data__" in g && (m.__data__ = g.__data__), p[y] = m, Oi(p[y], t, i, y, p, Le(g, i)));
  return new Ye(o, this._parents, t, i);
}
function dl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = En(e));
  for (var s = this._groups, n = s.length, o = [], a = [], r = 0; r < n; ++r)
    for (var l = s[r], p = l.length, g, m = 0; m < p; ++m)
      if (g = l[m]) {
        for (var y = e.call(g, g.__data__, m, l), f, d = Le(g, i), u = 0, h = y.length; u < h; ++u)
          (f = y[u]) && Oi(f, t, i, u, y, d);
        o.push(y), a.push(g);
      }
  return new Ye(o, a, t, i);
}
var ll = Qt.prototype.constructor;
function cl() {
  return new ll(this._groups, this._parents);
}
function pl(e, t) {
  var i, s, n;
  return function() {
    var o = _t(this, e), a = (this.style.removeProperty(e), _t(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function jn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ul(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = _t(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function ml(e, t, i) {
  var s, n, o;
  return function() {
    var a = _t(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), _t(this, e))), a === l ? null : a === s && l === n ? o : (n = l, o = t(s = a, r));
  };
}
function hl(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, r;
  return function() {
    var l = qe(this, e), p = l.on, g = l.value[o] == null ? r || (r = jn(t)) : void 0;
    (p !== i || n !== g) && (s = (i = p).copy()).on(a, n = g), l.on = s;
  };
}
function fl(e, t, i) {
  var s = (e += "") == "transform" ? fd : Yn;
  return t == null ? this.styleTween(e, pl(e, s)).on("end.style." + e, jn(e)) : typeof t == "function" ? this.styleTween(e, ml(e, s, gs(this, "style." + e, t))).each(hl(this._id, e)) : this.styleTween(e, ul(e, s, t), i).on("end.style." + e, null);
}
function gl(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Il(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && gl(e, a, i)), s;
  }
  return o._value = t, o;
}
function yl(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Il(e, t, i ?? ""));
}
function vl(e) {
  return function() {
    this.textContent = e;
  };
}
function wl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function bl(e) {
  return this.tween("text", typeof e == "function" ? wl(gs(this, "text", e)) : vl(e == null ? "" : e + ""));
}
function xl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function kl(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && xl(n)), t;
  }
  return s._value = e, s;
}
function _l(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, kl(e));
}
function $l() {
  for (var e = this._name, t = this._id, i = Kn(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], r = a.length, l, p = 0; p < r; ++p)
      if (l = a[p]) {
        var g = Le(l, t);
        Oi(l, e, i, p, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ye(s, this._parents, e, i);
}
function El() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var r = { value: a }, l = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var p = qe(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), p.on = t;
    }), n === 0 && o();
  });
}
var Sl = 0;
function Ye(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Kn() {
  return ++Sl;
}
var We = Qt.prototype;
Ye.prototype = {
  constructor: Ye,
  select: rl,
  selectAll: dl,
  selectChild: We.selectChild,
  selectChildren: We.selectChildren,
  filter: el,
  merge: tl,
  selection: cl,
  transition: $l,
  call: We.call,
  nodes: We.nodes,
  node: We.node,
  size: We.size,
  empty: We.empty,
  each: We.each,
  on: nl,
  attr: zd,
  attrTween: Wd,
  style: fl,
  styleTween: yl,
  text: bl,
  textTween: _l,
  remove: al,
  tween: Pd,
  delay: Gd,
  duration: Kd,
  ease: Qd,
  easeVarying: Jd,
  end: El,
  [Symbol.iterator]: We[Symbol.iterator]
};
function Cl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Al = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Cl
};
function Ml(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Pl(e) {
  var t, i;
  e instanceof Ye ? (t = e._id, e = e._name) : (t = Kn(), (i = Al).time = hs(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], r = a.length, l, p = 0; p < r; ++p)
      (l = a[p]) && Oi(l, e, t, p, a, i || Ml(l, t));
  return new Ye(s, this._parents, e, t);
}
Qt.prototype.interrupt = Cd;
Qt.prototype.transition = Pl;
const di = (e) => () => e;
function Tl(e, {
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
function Ge(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Ge.prototype = {
  constructor: Ge,
  scale: function(e) {
    return e === 1 ? this : new Ge(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Ge(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ft = new Ge(1, 0, 0);
Ge.prototype;
function Gi(e) {
  e.stopImmediatePropagation();
}
function Ot(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ol(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Rl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Zs() {
  return this.__zoom || Ft;
}
function Nl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Dl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ll(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function zl() {
  var e = Ol, t = Rl, i = Ll, s = Nl, n = Dl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = wd, p = us("start", "zoom", "end"), g, m, y, f = 500, d = 150, u = 0, h = 10;
  function w(I) {
    I.property("__zoom", Zs).on("wheel.zoom", z, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", D).filter(n).on("touchstart.zoom", q).on("touchmove.zoom", N).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(I, C, v, x) {
    var $ = I.selection ? I.selection() : I;
    $.property("__zoom", Zs), I !== $ ? k(I, C, v, x) : $.interrupt().each(function() {
      S(this, arguments).event(x).start().zoom(null, typeof C == "function" ? C.apply(this, arguments) : C).end();
    });
  }, w.scaleBy = function(I, C, v, x) {
    w.scaleTo(I, function() {
      var $ = this.__zoom.k, _ = typeof C == "function" ? C.apply(this, arguments) : C;
      return $ * _;
    }, v, x);
  }, w.scaleTo = function(I, C, v, x) {
    w.transform(I, function() {
      var $ = t.apply(this, arguments), _ = this.__zoom, P = v == null ? F($) : typeof v == "function" ? v.apply(this, arguments) : v, M = _.invert(P), L = typeof C == "function" ? C.apply(this, arguments) : C;
      return i(O(A(_, L), P, M), $, a);
    }, v, x);
  }, w.translateBy = function(I, C, v, x) {
    w.transform(I, function() {
      return i(this.__zoom.translate(
        typeof C == "function" ? C.apply(this, arguments) : C,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), a);
    }, null, x);
  }, w.translateTo = function(I, C, v, x, $) {
    w.transform(I, function() {
      var _ = t.apply(this, arguments), P = this.__zoom, M = x == null ? F(_) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Ft.translate(M[0], M[1]).scale(P.k).translate(
        typeof C == "function" ? -C.apply(this, arguments) : -C,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), _, a);
    }, x, $);
  };
  function A(I, C) {
    return C = Math.max(o[0], Math.min(o[1], C)), C === I.k ? I : new Ge(C, I.x, I.y);
  }
  function O(I, C, v) {
    var x = C[0] - v[0] * I.k, $ = C[1] - v[1] * I.k;
    return x === I.x && $ === I.y ? I : new Ge(I.k, x, $);
  }
  function F(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function k(I, C, v, x) {
    I.on("start.zoom", function() {
      S(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      S(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var $ = this, _ = arguments, P = S($, _).event(x), M = t.apply($, _), L = v == null ? F(M) : typeof v == "function" ? v.apply($, _) : v, B = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), V = $.__zoom, le = typeof C == "function" ? C.apply($, _) : C, ae = l(V.invert(L).concat(B / V.k), le.invert(L).concat(B / le.k));
      return function(G) {
        if (G === 1) G = le;
        else {
          var Q = ae(G), H = B / Q[2];
          G = new Ge(H, L[0] - Q[0] * H, L[1] - Q[1] * H);
        }
        P.zoom(null, G);
      };
    });
  }
  function S(I, C, v) {
    return !v && I.__zooming || new b(I, C);
  }
  function b(I, C) {
    this.that = I, this.args = C, this.active = 0, this.sourceEvent = null, this.extent = t.apply(I, C), this.taps = 0;
  }
  b.prototype = {
    event: function(I) {
      return I && (this.sourceEvent = I), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(I, C) {
      return this.mouse && I !== "mouse" && (this.mouse[1] = C.invert(this.mouse[0])), this.touch0 && I !== "touch" && (this.touch0[1] = C.invert(this.touch0[0])), this.touch1 && I !== "touch" && (this.touch1[1] = C.invert(this.touch1[0])), this.that.__zoom = C, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(I) {
      var C = Re(this.that).datum();
      p.call(
        I,
        this.that,
        new Tl(I, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: p
        }),
        C
      );
    }
  };
  function z(I, ...C) {
    if (!e.apply(this, arguments)) return;
    var v = S(this, C).event(I), x = this.__zoom, $ = Math.max(o[0], Math.min(o[1], x.k * Math.pow(2, s.apply(this, arguments)))), _ = it(I);
    if (v.wheel)
      (v.mouse[0][0] !== _[0] || v.mouse[0][1] !== _[1]) && (v.mouse[1] = x.invert(v.mouse[0] = _)), clearTimeout(v.wheel);
    else {
      if (x.k === $) return;
      v.mouse = [_, x.invert(_)], gi(this), v.start();
    }
    Ot(I), v.wheel = setTimeout(P, d), v.zoom("mouse", i(O(A(x, $), v.mouse[0], v.mouse[1]), v.extent, a));
    function P() {
      v.wheel = null, v.end();
    }
  }
  function R(I, ...C) {
    if (y || !e.apply(this, arguments)) return;
    var v = I.currentTarget, x = S(this, C, !0).event(I), $ = Re(I.view).on("mousemove.zoom", L, !0).on("mouseup.zoom", B, !0), _ = it(I, v), P = I.clientX, M = I.clientY;
    Yr(I.view), Gi(I), x.mouse = [_, this.__zoom.invert(_)], gi(this), x.start();
    function L(V) {
      if (Ot(V), !x.moved) {
        var le = V.clientX - P, ae = V.clientY - M;
        x.moved = le * le + ae * ae > u;
      }
      x.event(V).zoom("mouse", i(O(x.that.__zoom, x.mouse[0] = it(V, v), x.mouse[1]), x.extent, a));
    }
    function B(V) {
      $.on("mousemove.zoom mouseup.zoom", null), jr(V.view, x.moved), Ot(V), x.event(V).end();
    }
  }
  function D(I, ...C) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, x = it(I.changedTouches ? I.changedTouches[0] : I, this), $ = v.invert(x), _ = v.k * (I.shiftKey ? 0.5 : 2), P = i(O(A(v, _), x, $), t.apply(this, C), a);
      Ot(I), r > 0 ? Re(this).transition().duration(r).call(k, P, x, I) : Re(this).call(w.transform, P, x, I);
    }
  }
  function q(I, ...C) {
    if (e.apply(this, arguments)) {
      var v = I.touches, x = v.length, $ = S(this, C, I.changedTouches.length === x).event(I), _, P, M, L;
      for (Gi(I), P = 0; P < x; ++P)
        M = v[P], L = it(M, this), L = [L, this.__zoom.invert(L), M.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== L[2] && ($.touch1 = L, $.taps = 0) : ($.touch0 = L, _ = !0, $.taps = 1 + !!g);
      g && (g = clearTimeout(g)), _ && ($.taps < 2 && (m = L[0], g = setTimeout(function() {
        g = null;
      }, f)), gi(this), $.start());
    }
  }
  function N(I, ...C) {
    if (this.__zooming) {
      var v = S(this, C).event(I), x = I.changedTouches, $ = x.length, _, P, M, L;
      for (Ot(I), _ = 0; _ < $; ++_)
        P = x[_], M = it(P, this), v.touch0 && v.touch0[2] === P.identifier ? v.touch0[0] = M : v.touch1 && v.touch1[2] === P.identifier && (v.touch1[0] = M);
      if (P = v.that.__zoom, v.touch1) {
        var B = v.touch0[0], V = v.touch0[1], le = v.touch1[0], ae = v.touch1[1], G = (G = le[0] - B[0]) * G + (G = le[1] - B[1]) * G, Q = (Q = ae[0] - V[0]) * Q + (Q = ae[1] - V[1]) * Q;
        P = A(P, Math.sqrt(G / Q)), M = [(B[0] + le[0]) / 2, (B[1] + le[1]) / 2], L = [(V[0] + ae[0]) / 2, (V[1] + ae[1]) / 2];
      } else if (v.touch0) M = v.touch0[0], L = v.touch0[1];
      else return;
      v.zoom("touch", i(O(P, M, L), v.extent, a));
    }
  }
  function X(I, ...C) {
    if (this.__zooming) {
      var v = S(this, C).event(I), x = I.changedTouches, $ = x.length, _, P;
      for (Gi(I), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, f), _ = 0; _ < $; ++_)
        P = x[_], v.touch0 && v.touch0[2] === P.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === P.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (P = it(P, this), Math.hypot(m[0] - P[0], m[1] - P[1]) < h)) {
        var M = Re(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(I) {
    return arguments.length ? (s = typeof I == "function" ? I : di(+I), w) : s;
  }, w.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : di(!!I), w) : e;
  }, w.touchable = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : di(!!I), w) : n;
  }, w.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : di([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), w) : t;
  }, w.scaleExtent = function(I) {
    return arguments.length ? (o[0] = +I[0], o[1] = +I[1], w) : [o[0], o[1]];
  }, w.translateExtent = function(I) {
    return arguments.length ? (a[0][0] = +I[0][0], a[1][0] = +I[1][0], a[0][1] = +I[0][1], a[1][1] = +I[1][1], w) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, w.constrain = function(I) {
    return arguments.length ? (i = I, w) : i;
  }, w.duration = function(I) {
    return arguments.length ? (r = +I, w) : r;
  }, w.interpolate = function(I) {
    return arguments.length ? (l = I, w) : l;
  }, w.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? w : I;
  }, w.clickDistance = function(I) {
    return arguments.length ? (u = (I = +I) * I, w) : Math.sqrt(u);
  }, w.tapDistance = function(I) {
    return arguments.length ? (h = +I, w) : h;
  }, w;
}
var Ul = Object.defineProperty, ql = Object.getOwnPropertyDescriptor, fe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ql(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ul(t, i, n), n;
};
function Fl(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, r = s.y - i.y, l = n * r - o * a;
  if (Math.abs(l) < 1e-9) return null;
  const p = ((i.x - e.x) * r - (i.y - e.y) * a) / l, g = ((i.x - e.x) * o - (i.y - e.y) * n) / l;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * o, t: p };
}
function Bl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), r = t.x + a * s, l = t.y + a * n;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function Wl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], r = Math.hypot(a.x - o.x, a.y - o.y) || 1, l = (a.x - o.x) / r, p = (a.y - o.y) / r, g = t.map(([y, f]) => Fl(o, a, y, f)).filter((y) => y !== null).filter((y) => y.t * r > i + 2 && (1 - y.t) * r > i + 2).sort((y, f) => y.t - f.t);
    let m = -1 / 0;
    for (const y of g)
      y.t * r - i <= m + 2 || (s += ` L ${y.x - l * i} ${y.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${y.x + l * i} ${y.y + p * i}`, m = y.t * r + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const vt = {
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
let me = class extends De {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ft, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = zl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, l = Math.max(80, s.width - n - o), p = Math.max(80, s.height - a - r), g = Math.min(...t.map((h) => h.x - h.w / 2)) - e, m = Math.max(...t.map((h) => h.x + h.w / 2)) + e, y = Math.min(...t.map((h) => h.y - h.h / 2)) - e, f = Math.max(...t.map((h) => h.y + h.h / 2)) + e, d = Math.max(0.15, Math.min(l / (m - g), p / (f - y), 1.25)), u = Ft.translate(
      n + l / 2 - d * (g + m) / 2,
      a + p / 2 - d * (y + f) / 2
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
    for (let o = e.parentId; o; o = (s = this.scene.nodes.find((a) => a.id === o)) == null ? void 0 : s.parentId) {
      const a = this.scene.nodes.find((l) => l.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const r = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (r)
        return { x: e.x + (r.x - a.x), y: e.y + (r.y - a.y) };
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
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, a = n.x + s.w / 2 - 10 - e.w / 2, r = n.y - s.h / 2 + 34 + e.h / 2, l = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), a), i = Math.min(Math.max(i, r), l);
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
      (h) => o.has(h.id) && !(h.parentId && o.has(h.parentId))
    ) : null, r = a ? new Map(a.map((h) => [h.id, this.nodePos(h)])) : null, l = (h) => (h.shiftKey || h.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, m = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], y = () => {
      const h = [], w = p === "menu" ? this.scene.nodes.filter((A) => A.kind === "ui-app") : this.scene.nodes.filter((A) => A.id === t.parentId);
      for (const A of w) {
        const O = this.scene.nodes.filter((b) => b.parentId === A.id && m.includes(b.kind ?? "") && b.id !== t.id).sort((b, z) => b.y - z.y), F = A.x - A.w / 2 + 10, k = A.x + A.w / 2 - 10;
        for (const b of O) h.push({ x1: F, x2: k, y: b.y - b.h / 2 - 3, appId: A.id, beforeId: b.id });
        const S = O[O.length - 1];
        h.push({
          x1: F,
          x2: k,
          y: S ? S.y + S.h / 2 + 3 : A.y - A.h / 2 + 34 + 8,
          appId: A.id,
          beforeId: null
        });
      }
      return h;
    }, f = (h) => {
      const w = this.nodeIdAt(h), A = w && w !== t.id ? this.scene.nodes.find((O) => O.id === w) : void 0;
      return A ? A.kind === "external-system" ? A.id : A.parentId ?? null : null;
    }, d = (h) => {
      if ((h.buttons & 1) === 0) {
        u(h);
        return;
      }
      const w = this.toScene(h), A = w.x - i.x, O = w.y - i.y;
      if (!(!n && Math.hypot(A, O) < 3 / this._t.k))
        if (n = !0, a && r) {
          const F = /* @__PURE__ */ new Map();
          for (const k of a) {
            const S = r.get(k.id), b = this.clampToParent(k, S.x + A, S.y + O);
            F.set(k.id, { x: b.x, y: b.y });
          }
          this._dragGroup = F;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + A, y: s.y + O }, this._menuSlots || (this._menuSlots = { slots: y(), active: null, nestRowId: null });
          const F = this.scene.nodes.filter(
            (S) => m.includes(S.kind ?? "") && S.id !== t.id && Math.abs(w.x - S.x) <= S.w / 2 + 8
          ), k = p === "menu" ? F.find((S) => Math.abs(w.y - S.y) < S.h * 0.28) : void 0;
          if (k)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: k.id }, this._hoverNodeId = k.id;
          else {
            let S = -1, b = 14;
            this._menuSlots.slots.forEach((z, R) => {
              if (w.x < z.x1 - 24 || w.x > z.x2 + 24) return;
              const D = Math.abs(w.y - z.y);
              D < b && (b = D, S = R);
            }), this._menuSlots = { ...this._menuSlots, active: S >= 0 ? S : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else l(h) ? (this._dragPos = { id: t.id, x: s.x + A, y: s.y + O }, this._hoverNodeId = f(h)) : (this._dragPos = this.clampToParent(t, s.x + A, s.y + O), this._hoverNodeId = null);
    }, u = (h) => {
      if (window.removeEventListener("pointermove", d), window.removeEventListener("pointerup", u), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([w, A]) => ({ id: w, x: A.x, y: A.y }))
        });
      else if (n && this._dragPos && g) {
        const w = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const A = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (w != null && w.nestRowId)
          this.emit(A, { id: t.id, nestRowId: w.nestRowId });
        else if (w && w.active !== null) {
          const O = w.slots[w.active];
          this.emit(A, { id: t.id, appId: O.appId, beforeId: O.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (l(h)) {
          const w = f(h);
          if (h.ctrlKey && t.kind === "api") {
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
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, r = this.scene.nodes.filter((u) => u.parentId === t.id), l = Math.min(...r.map((u) => u.x - u.w / 2)), p = Math.max(...r.map((u) => u.x + u.w / 2)), g = Math.min(...r.map((u) => u.y - u.h / 2)), m = Math.max(...r.map((u) => u.y + u.h / 2)), y = fo(
      r.map((u) => ({ dx: u.x - a.x, dy: u.y - a.y, w: u.w, h: u.h })),
      { w: n, h: o }
    ), f = (u) => {
      if ((u.buttons & 1) === 0) {
        d();
        return;
      }
      const h = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(y.w, 2 * Math.abs(h.x - a.x)),
          h: Math.max(y.h, 2 * Math.abs(h.y - a.y))
        };
        return;
      }
      const w = a.x - i * a.w / 2, A = a.y - s * a.h / 2, O = i > 0 ? Math.max(h.x, w + n, r.length ? p + 10 : -1 / 0) : Math.min(h.x, w - n, r.length ? l - 10 : 1 / 0), F = s > 0 ? Math.max(h.y, A + o, r.length ? m + 10 : -1 / 0) : Math.min(h.y, A - o, r.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (w + O) / 2,
        y: (A + F) / 2,
        w: Math.abs(O - w),
        h: Math.abs(F - A)
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
    const n = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, o = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o);
      const r = this.nodeIdAt(a);
      r && r !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: r,
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
    const { x: s, y: n } = this.nodePos(e), o = t - s, a = i - n, r = e.w / 2, l = e.h / 2;
    if (o === 0 && a === 0) return { x: s, y: n };
    const p = 1 / Math.max(Math.abs(o) / r, Math.abs(a) / l);
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, r = s[s.length - 1] ?? n;
    let l = this.borderPoint(t, a.x, a.y), p = this.borderPoint(i, r.x, r.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const m = Math.hypot(p.x - l.x, p.y - l.y) || 1, y = -(p.y - l.y) / m * g, f = (p.x - l.x) / m * g;
        l = { x: l.x + y, y: l.y + f }, p = { x: p.x + y, y: p.y + f };
      }
    }
    return [l, ...s, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let s = !1;
    const n = (a) => {
      if (!this._wpDrag) return;
      s = !0;
      const r = this.toScene(a), l = [...this._wpDrag.points];
      l[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: l };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = Bl(t, e[s], e[s + 1]);
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
    const a = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(l);
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
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return ee`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Wl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
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
        ${n ? l.map((p, g) => {
      var y;
      const m = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === g;
      return ee`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
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
    var y, f, d, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, r = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.w : e.w, l = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.h : e.h, p = r / 2, g = l / 2, m = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ee`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerdown=${(h) => this.onNodePointerDown(h, e)}
         @dblclick=${(h) => {
      h.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ee`<rect x=${-p - 4} y=${-g - 4} width=${r + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${r} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ee`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ee`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ee`<g transform="translate(${p - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(h) => {
      h.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(h) => h.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && vt[e.symbol] && !a ? ee`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${vt[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && vt[e.symbol] ? ee`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${vt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ee`
              <foreignObject x=${-p + 6} y=${o ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(h) => h.stopPropagation()}
                  @keydown=${(h) => {
      h.stopPropagation(), h.key === "Enter" && this.commitRename(e, h.target.value), h.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(h) => this.commitRename(e, h.target.value)}
                />
              </foreignObject>` : a ? ee`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? ee`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : ee`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? ee`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([h, w]) => ee`
                <circle data-handle cx=${h} cy=${w} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(A) => this.onHandlePointerDown(A, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (h, w) => ee`
                <g transform="translate(${-p + 24 + w * 20}, ${-g})">
                  <circle data-handle r="7" fill=${h.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(A) => this.onHandlePointerDown(A, e, h.kind)}>
                    <title>${h.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([h, w]) => ee`
                <rect data-resize x=${h * p - 6.5} y=${w * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${h * w > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(A) => this.onResizePointerDown(A, e, h, w)}>
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
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), this._rubber = null;
    }, n = (a) => {
      if ((a.buttons & 1) === 0) {
        s();
        return;
      }
      const r = this.toScene(a);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), p = Math.max(a.x, r.x), g = Math.min(a.y, r.y), m = Math.max(a.y, r.y), y = this.scene.nodes.filter((f) => {
          const d = this.nodePos(f);
          return d.x >= l && d.x <= p && d.y >= g && d.y <= m;
        }).map((f) => f.id);
        this.emit("nodes-boxed", { ids: y });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, s = Math.max(...t.map((a) => a.x + a.w / 2)) + e, n = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: n, w: s - i, h: o - n };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const s = this.getBoundingClientRect(), n = this._t.k, o = Ft.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Re(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = n.width / this._t.k, l = n.height / this._t.k;
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
      var g, m;
      (m = (g = p.currentTarget).hasPointerCapture) != null && m.call(g, p.pointerId) && this.onMinimapPointer(p, e, s);
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
            x=${(o - e.minX) * s}
            y=${(a - e.minY) * s}
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
      (n) => ee`
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
          ${this._menuSlots ? ee`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, o) => ee`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? ee`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
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
me.styles = pt`
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
  oe({ attribute: !1 })
], me.prototype, "scene", 2);
fe([
  oe({ attribute: !1 })
], me.prototype, "selectedId", 2);
fe([
  oe({ attribute: !1 })
], me.prototype, "selectedIds", 2);
fe([
  oe({ type: Boolean })
], me.prototype, "connectable", 2);
fe([
  oe({ attribute: !1 })
], me.prototype, "edgePoints", 2);
fe([
  U()
], me.prototype, "_t", 2);
fe([
  U()
], me.prototype, "_dragPos", 2);
fe([
  U()
], me.prototype, "_menuSlots", 2);
fe([
  U()
], me.prototype, "_dragGroup", 2);
fe([
  U()
], me.prototype, "_pendingLink", 2);
fe([
  U()
], me.prototype, "_hoverNodeId", 2);
fe([
  U()
], me.prototype, "_editingId", 2);
fe([
  U()
], me.prototype, "_spaceDown", 2);
fe([
  U()
], me.prototype, "_wpDrag", 2);
fe([
  U()
], me.prototype, "_selectedWaypoint", 2);
fe([
  U()
], me.prototype, "_resize", 2);
fe([
  U()
], me.prototype, "_rubber", 2);
fe([
  oe({ attribute: !1 })
], me.prototype, "fitInsets", 2);
me = fe([
  ut("modux-canvas")
], me);
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
function ue(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const It = (e) => e.trim().toLowerCase();
function Hl(e, t) {
  var R, D, q, N, X;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((I) => [I.id, I.name])), n = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((C) => ({ ...C, moduleId: I.id }))
  ), o = new Set(n.map((I) => I.id)), a = e.aggregates ?? [], r = new Set(
    e.modules.flatMap((I) => (I.domainServices ?? []).map((C) => C.id))
  ), l = e.modules.flatMap(
    (I) => (I.domainEvents ?? []).map((C) => ({ ...C, moduleId: I.id, application: !1 }))
  ), p = e.modules.flatMap(
    (I) => (I.applicationEvents ?? []).map((C) => ({ ...C, moduleId: I.id, application: !0 }))
  ), g = e.modules.flatMap(
    (I) => (I.readModels ?? []).map((C) => ({ ...C, moduleId: I.id }))
  );
  for (const I of n)
    Se(i, {
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
      tooltip: I.policy ? `${I.name} — policy de ${s.get(I.moduleId) ?? I.moduleId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  for (const I of a)
    Se(i, {
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
      tooltip: `${I.name} — agregado de ${s.get(I.moduleId) ?? I.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const I of [...l, ...p])
    Se(i, {
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
      tooltip: `${I.name} — evento de ${s.get(I.moduleId) ?? I.moduleId}`
    }), m.set(It(I.name), I.id);
  const y = (I) => {
    if (!I || !I.trim()) return null;
    const C = m.get(It(I));
    if (C) return C;
    const v = `evname:${It(I)}`;
    return Se(i, {
      id: v,
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
    }), v;
  }, f = (I) => {
    const C = g.find((x) => x.id === I.id) ?? g.find((x) => I.name && It(x.name) === It(I.name)), v = (C == null ? void 0 : C.id) ?? (I.id || (I.name ? `rm:${It(I.name)}` : null));
    return v ? (Se(i, {
      id: v,
      label: (C == null ? void 0 : C.name) ?? I.name ?? v,
      x: 0,
      y: 0,
      w: Z.readModel.w,
      h: Z.readModel.h,
      kind: C ? "read-model" : "derived-read-model",
      fill: Z.readModel.fill,
      stroke: Z.readModel.stroke,
      dashed: !C,
      badge: "READ MODEL"
    }), v) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!o.has(I.targetId)) continue;
    const C = (e.actors ?? []).find((v) => v.id === I.actorId);
    C && (Se(i, {
      id: C.id,
      label: C.name,
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
      id: `es-actor:${C.id}->${I.targetId}`,
      sourceId: C.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const C = (e.agentUses ?? []).filter((P) => P.agentId === I.id), v = (e.agentExternalUses ?? []).filter((P) => P.agentId === I.id), x = (e.agentRags ?? []).filter((P) => P.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((P) => P.agentId === I.id), _ = (e.agentGatewayUses ?? []).some((P) => P.agentId === I.id) || (e.agentApiOpUses ?? []).some((P) => P.agentId === I.id) || (e.agentQueryUses ?? []).some((P) => P.agentId === I.id) || (e.agentDelegations ?? []).some((P) => P.agentId === I.id) || (e.agentTriggers ?? []).some((P) => P.agentId === I.id);
    if (!(!C.length && !v.length && !x.length && !$.length && !_)) {
      Se(i, {
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
      for (const P of C)
        o.has(P.useCaseId) && ue(i, {
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
        const M = e.externalSystems.find(
          (B) => (B.useCases ?? []).some((V) => V.id === P.externalUseCaseId)
        );
        if (!M) continue;
        const L = (R = (M.useCases ?? []).find((B) => B.id === P.externalUseCaseId)) == null ? void 0 : R.name;
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
        }), ue(i, {
          id: `es-agentx:${I.id}->${P.externalUseCaseId}`,
          sourceId: I.id,
          targetId: M.id,
          kind: "es-agent-external",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Llama a ${L} del sistema externo` : void 0
        });
      }
      for (const P of $) {
        const M = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((V) => V.id === P.mcpServerId)
        );
        if (!M) continue;
        const L = (D = (M.mcpServers ?? []).find((B) => B.id === P.mcpServerId)) == null ? void 0 : D.name;
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
        }), ue(i, {
          id: `es-agentmcp:${I.id}->${P.mcpServerId}`,
          sourceId: I.id,
          targetId: M.id,
          kind: "es-agent-mcp",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Consume las herramientas del servidor MCP ${L}` : void 0
        });
      }
      for (const P of x) {
        const M = (e.rags ?? []).find((L) => L.id === P.ragId);
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
          }), ue(i, {
            id: `es-agrag:${I.id}->${M.id}`,
            sourceId: I.id,
            targetId: M.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const L of M.sourceReadModelIds ?? []) {
            const B = f({ id: L });
            B && ue(i, {
              id: `es-ragsrc:${M.id}->${B}`,
              sourceId: B,
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
  const d = (I) => {
    const C = e.externalSystems.find((v) => v.id === I);
    return C ? (Se(i, {
      id: C.id,
      label: C.name,
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
    }), C.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const C = d(I.externalSystemId);
    !C || !o.has(I.useCaseId) || ue(i, {
      id: `es-extin:${C}->${I.useCaseId}`,
      sourceId: C,
      targetId: I.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const I of e.externalUseCaseCalls ?? []) {
    if (!o.has(I.sourceId)) continue;
    const C = e.externalSystems.find(
      ($) => ($.useCases ?? []).some((_) => _.id === I.targetId)
    ), v = C ? d(C.id) : null;
    if (!v) continue;
    const x = (q = ((C == null ? void 0 : C.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : q.name;
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
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (o.has(I.sourceId) || a.some((v) => v.id === I.sourceId) || r.has(I.sourceId))) || ue(i, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const h = (I, C, v, x, $, _) => (Se(i, {
    id: I,
    label: C,
    x: 0,
    y: 0,
    w: Z.policy.w,
    h: Z.policy.h,
    kind: v,
    symbol: "flow",
    fill: Z.policy.fill,
    stroke: Z.policy.stroke,
    badge: x,
    tooltip: $
  }), I), w = (I, C) => {
    const v = y(I);
    v && ue(i, {
      id: `es-trigger:${v}->${C}`,
      sourceId: v,
      targetId: C,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, A = (I, C) => {
    !C || !o.has(C) || ue(i, {
      id: `es-invoke:${I}->${C}`,
      sourceId: I,
      targetId: C,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const C = h(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    w(I.eventName, C);
    for (const v of I.actions ?? []) {
      if (v.type === "CallUseCase" && A(C, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const x = `saga:${v.sagaId}`;
        h(x, v.sagaId, "saga", "SAGA"), ue(i, {
          id: `es-saga:${C}->${x}`,
          sourceId: C,
          targetId: x,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const x = (e.projections ?? []).find(($) => $.id === v.projectionId);
        x && ue(i, {
          id: `es-feeds:${C}->${x.id}`,
          sourceId: C,
          targetId: x.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const I of e.projections ?? []) {
    const C = h(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const $ of I.handledEventIds) {
      const _ = i.nodes.has($) ? $ : null;
      _ && ue(i, {
        id: `es-trigger:${_}->${C}`,
        sourceId: _,
        targetId: C,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && i.nodes.has(I.sourceAggregateId) && ue(i, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: C,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const v = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (v) {
      const $ = e.externalSystems.find(
        (P) => (P.useCases ?? []).some((M) => M.id === v) || (P.tables ?? []).some((M) => M.id === v)
      ), _ = $ ? d($.id) : null;
      if (_) {
        const P = ((N = ($.useCases ?? []).find((M) => M.id === v)) == null ? void 0 : N.name) ?? ((X = ($.tables ?? []).find((M) => M.id === v)) == null ? void 0 : X.name);
        ue(i, {
          id: `es-poll:${I.id}`,
          sourceId: _,
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
    const x = f({ id: I.readModelId, name: I.readModelName });
    x && ue(i, {
      id: `es-projects:${C}->${x}`,
      sourceId: C,
      targetId: x,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const v = y(I.triggerEvent), x = f({ name: I.readModelName ?? `${I.triggerEvent}View` });
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
    const C = h(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (w(I.triggerEvent, C), A(C, I.targetUseCaseId), !I.targetUseCaseId) {
      const v = d(I.targetId), x = v ?? `tgt:${I.targetId}`;
      !v && s.has(I.targetId) && Se(i, {
        id: x,
        label: s.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: Z.module.w,
        h: Z.module.h,
        kind: "module",
        symbol: "component",
        fill: Z.module.fill,
        stroke: Z.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(x) && ue(i, {
        id: `es-deliver:${I.id}`,
        sourceId: C,
        targetId: x,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const I of e.processes ?? []) {
    const C = h(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    w(I.triggerEvent, C);
    for (const x of I.steps) A(C, x.useCaseId);
    const v = y(I.onCompletionEventName);
    v && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: C,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const C = h(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    w(I.triggerEvent, C);
    for (const x of I.steps ?? []) {
      A(C, x.targetUseCaseId);
      for (const $ of [x.emittedEventName, x.completionEventName]) {
        const _ = y($);
        _ && ue(i, {
          id: `es-wfemit:${I.id}:${_}`,
          sourceId: C,
          targetId: _,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const v = y(I.onCompletionEventName);
    v && ue(i, {
      id: `es-done:${I.id}`,
      sourceId: C,
      targetId: v,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const O = [...i.nodes.values()], F = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    F.has(I.targetId) || F.set(I.targetId, []), F.get(I.targetId).push(I.sourceId);
  const k = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Set(), b = (I) => {
    const C = k.get(I);
    if (C !== void 0) return C;
    if (S.has(I)) return 0;
    S.add(I);
    const v = F.get(I) ?? [], x = v.length ? 1 + Math.max(...v.map(b)) : 0;
    return S.delete(I), k.set(I, x), x;
  }, z = /* @__PURE__ */ new Map();
  for (const I of O) {
    const C = t[I.id];
    if (C) {
      I.x = C.x, I.y = C.y;
      continue;
    }
    const v = b(I.id), x = z.get(v) ?? 0;
    z.set(v, x + 1), I.x = 140 + v * 260, I.y = 110 + x * 110;
  }
  return { nodes: O, edges: i.edges };
}
const Vl = 190, Gl = 56, Js = 180, Yl = 56, jl = 150, Kl = 44, en = 250, tn = 100;
function Xl(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Ql(e, t) {
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
function Zl(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (r) => {
    var l;
    return (l = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === r)) == null ? void 0 : l.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((r) => {
    var h;
    const l = new Map(r.steps.map((w) => [w.id, w])), p = new Map(r.steps.map((w) => [w.id, Xl(w, l)])), g = /* @__PURE__ */ new Map();
    for (const w of r.steps) {
      const A = p.get(w.id) ?? 0;
      g.set(A, (g.get(A) ?? 0) + 1);
    }
    const m = Math.max(1, ...g.values()), y = Ql(e, r);
    if (y && !n.has(y.id)) {
      n.add(y.id);
      const w = t[y.id] ?? { x: 140, y: a };
      i.push({
        id: y.id,
        label: y.label,
        x: w.x,
        y: w.y,
        w: jl,
        h: Kl,
        kind: y.kind,
        symbol: y.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: y.kind === "aggregate" ? "AGGREGATE" : y.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const f = t[r.id] ?? { x: 420, y: a };
    i.push({
      id: r.id,
      label: r.name,
      x: f.x,
      y: f.y,
      w: Vl,
      h: Gl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), y && s.push({
      id: `wft:${r.id}`,
      sourceId: y.id,
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
    for (const w of r.steps) {
      const A = p.get(w.id) ?? 0;
      u = Math.max(u, A);
      const O = d.get(A) ?? 0;
      d.set(A, O + 1);
      const F = t[w.id] ?? {
        x: f.x + (A + 1) * en,
        y: a + (O - (g.get(A) - 1) / 2) * tn
      }, k = o(w.targetUseCaseId);
      i.push({
        id: w.id,
        label: w.name,
        x: F.x,
        y: F.y,
        w: Js,
        h: Yl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: k ? `→ ${k}` : "∅ sin use case",
        tooltip: `${w.name}${w.emittedEventName ? ` · emite ${w.emittedEventName}` : ""}${k ? ` · lanza ${k}` : ""}${w.completionEventName ? ` · espera ${w.completionEventName}` : ""}`
      });
      const S = (w.dependsOnStepIds ?? []).filter((b) => l.has(b));
      S.length === 0 && s.push({
        id: `wfs:${r.id}:${w.id}`,
        sourceId: r.id,
        targetId: w.id,
        kind: "workflow-start",
        label: w.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const b of S)
        s.push({
          id: `wfdep:${b}->${w.id}`,
          sourceId: b,
          targetId: w.id,
          kind: "workflow-dependency",
          label: w.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${w.name} espera a ${((h = l.get(b)) == null ? void 0 : h.name) ?? b}`
        });
    }
    if (r.onCompletionEventName) {
      const w = `done:${r.id}`, A = t[w] ?? { x: f.x + (u + 2) * en, y: a };
      i.push({
        id: w,
        label: r.onCompletionEventName,
        x: A.x,
        y: A.y,
        w: Js,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const O = new Set(r.steps.flatMap((k) => k.dependsOnStepIds ?? [])), F = r.steps.filter((k) => !O.has(k.id));
      for (const k of F.length ? F : [])
        s.push({
          id: `wfd:${r.id}:${k.id}`,
          sourceId: k.id,
          targetId: w,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || s.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: w,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, m + 1) * tn + 60;
  }), { nodes: i, edges: s };
}
const sn = 250, Ke = 30, li = 6, Jl = 16, nn = 190, ec = 60, tc = 170, ci = 44;
function ic(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ge(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function sc(e) {
  const t = [], i = (s, n, o) => {
    for (const a of s ?? []) {
      const r = [...n, a.label];
      t.push({ entry: a, path: r, depth: o }), i(a.children ?? [], r, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function nc(e, t) {
  var w, A, O, F;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], a = (k) => {
    var S;
    return ((S = e.modules.flatMap((b) => b.useCases ?? []).find((b) => b.id === k)) == null ? void 0 : S.name) ?? k;
  }, r = (k) => {
    var S;
    return ((S = e.modules.flatMap((b) => b.queryServices ?? []).find((b) => b.id === k)) == null ? void 0 : S.name) ?? k;
  }, l = /* @__PURE__ */ new Map();
  let p = 160;
  for (const k of n) {
    const S = sc(k), b = Math.max(
      90,
      54 + S.length * (Ke + li)
    ), z = t[k.id] ?? { x: 190, y: p + b / 2 };
    p = z.y + b / 2 + 70;
    const R = k.type ?? "APP";
    i.push({
      id: k.id,
      label: k.title || k.name,
      x: z.x,
      y: z.y,
      w: sn,
      h: b,
      kind: "ui-app",
      symbol: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "process" : "component",
      fill: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: R === "ORCHESTRATOR" ? "ORQUESTADOR" : R === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : R === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: R === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : R === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : R === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: R === "ORCHESTRATOR" ? `${k.name} — orquesta y mantiene estado; solo enseña páginas hijas` : R === "MASTER_DETAIL" ? `${k.name} — cabecera + pestañas (ambas son páginas)` : `App: ${k.name}`
    }), k.modelId && (l.set(k.modelId, {
      label: ((w = (e.models ?? []).find((N) => N.id === k.modelId)) == null ? void 0 : w.name) ?? k.modelId,
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
    for (const [N, X, I, C, v] of [
      [k.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [k.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      N && s.push({
        id: `${X === "app-view" ? "appview" : "appedit"}:${k.id}->${N}`,
        sourceId: k.id,
        targetId: N,
        kind: X,
        color: C,
        label: I,
        arrow: !0,
        tooltip: v
      });
    const D = k.homePageId ?? k.homeAppId;
    D && s.push({
      id: `apphome:${k.id}->${D}`,
      sourceId: k.id,
      targetId: D,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: k.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), R === "MASTER_DETAIL" && k.headerPageId && s.push({
      id: `appheader:${k.id}->${k.headerPageId}`,
      sourceId: k.id,
      targetId: k.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let q = z.y - b / 2 + 34 + 10 + Ke / 2;
    for (const { entry: N, path: X, depth: I } of S) {
      const C = ic(k.id, N, X), v = I * Jl;
      if (i.push({
        id: C,
        label: N.label,
        x: z.x + v / 2,
        y: q,
        w: sn - 20 - v,
        h: Ke,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (A = N.children) != null && A.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (O = N.children) != null && O.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: k.id,
        tooltip: (F = N.children) != null && F.length ? "Agrupador (con submenú): no puede abrir nada" : N.pageId ? `Abre ${N.pageId}` : N.uiAdapterId ? `Abre la app ${N.uiAdapterId}` : N.useCaseId ? `Lanza ${N.useCaseId}` : N.aggregateId ? `CRUD inferido sobre ${N.aggregateId}` : N.queryOperationId ? `Listado con filtros de ${N.queryOperationId}` : "Entrada de menú sin destino"
      }), q += Ke + li, N.uiAdapterId && n.some((x) => x.id === N.uiAdapterId) && s.push({
        id: `menuapp:${C}->${N.uiAdapterId}`,
        sourceId: C,
        targetId: N.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), N.useCaseId && e.modules.some(($) => ($.useCases ?? []).some((_) => _.id === N.useCaseId)) && (l.set(N.useCaseId, {
        label: a(N.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${C}->${N.useCaseId}`,
        sourceId: C,
        targetId: N.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), N.aggregateId && (e.aggregates ?? []).some((x) => x.id === N.aggregateId)) {
        const x = (e.aggregates ?? []).find(($) => $.id === N.aggregateId);
        l.set(x.id, { label: x.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${C}->${x.id}`,
          sourceId: C,
          targetId: x.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (N.queryOperationId) {
        const x = e.modules.flatMap((_) => _.queryServices ?? []).find((_) => _.id === N.queryServiceId), $ = ((x == null ? void 0 : x.operations) ?? []).find((_) => _.id === N.queryOperationId);
        x && $ && (l.set($.id, {
          label: `${$.name} (${x.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${C}->${$.id}`,
          sourceId: C,
          targetId: $.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      N.pageId && o.some((x) => x.id === N.pageId) && s.push({
        id: `menupage:${C}->${N.pageId}`,
        sourceId: C,
        targetId: N.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const m = (k) => {
    var S;
    return ((S = o.find((b) => b.id === k)) == null ? void 0 : S.name) ?? k;
  };
  for (const k of o) {
    const S = t[k.id] ?? { x: 640, y: g }, b = k.type === "WIZARD" ? k.wizardSteps ?? [] : [], z = b.length ? 54 + b.length * (Ke + li) : ec;
    g = S.y + z + 90, i.push({
      id: k.id,
      label: k.name,
      x: S.x,
      y: S.y,
      w: nn,
      h: z,
      kind: "page",
      symbol: "interface",
      badge: k.type ?? "PAGE",
      container: b.length > 0,
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
    let R = S.y - z / 2 + 34 + 10 + Ke / 2;
    b.forEach((D, q) => {
      const N = D.id ?? D.pageId ?? String(q);
      i.push({
        id: `wizrow:${k.id}:${N}`,
        label: `${q + 1}. ${D.label ?? (D.pageId ? m(D.pageId) : "Paso")}${D.pageId ? "" : " ⌁"}`,
        x: S.x,
        y: R,
        w: nn - 20,
        h: Ke,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: D.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: k.id,
        tooltip: D.pageId ? `Paso ${q + 1}: ${m(D.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${q + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), R += Ke + li;
    });
    for (const [D, q, N, X] of [
      [k.crudDetailPageId ?? k.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [k.crudCreatePageId ?? k.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      D && s.push({
        id: `${q === "crud-detail" ? "cruddetail" : "crudnew"}:${k.id}->${D}`,
        sourceId: k.id,
        targetId: D,
        kind: q,
        color: X,
        label: N,
        dashed: !0,
        arrow: !0,
        tooltip: q === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let D = 0; D < (k.wizardSteps ?? []).length; D++) {
      const q = (k.wizardSteps ?? [])[D];
      if (!q.pageId) continue;
      const N = q.id ?? q.pageId;
      s.push({
        id: `wizstep:${k.id}:${N}`,
        sourceId: `wizrow:${k.id}:${N}`,
        targetId: q.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${D + 1} — Supr desmapea`
      });
    }
    k.modelId && (l.set(k.modelId, {
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
    for (const D of k.buttons ?? [])
      D.useCaseId && (l.set(D.useCaseId, {
        label: a(D.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${k.id}->${D.useCaseId}`,
        sourceId: k.id,
        targetId: D.useCaseId,
        kind: "page-button",
        label: D.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: D.mappingId ? `Botón «${D.label}» — mapping ${D.mappingId}` : `Botón «${D.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    k.listingQueryServiceId && (l.set(k.listingQueryServiceId, {
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
  let y = 160;
  for (const k of e.models ?? [])
    l.has(k.id) || l.set(k.id, { label: k.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [k, S] of l) {
    const b = t[k] ?? { x: 1050, y };
    y = b.y + ci + 46, i.push({
      id: k,
      label: S.label,
      x: b.x,
      y: b.y,
      w: tc,
      h: ci,
      kind: S.kind,
      symbol: S.symbol,
      fill: "#ffffff",
      stroke: S.stroke
    });
  }
  let f = 120;
  for (const k of e.identityProviders ?? []) {
    const S = t[k.id] ?? { x: -320, y: f };
    f = S.y + 70 + 40, i.push({
      id: k.id,
      label: k.name,
      x: S.x,
      y: S.y,
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
  for (const k of n)
    k.identityProviderId && (e.identityProviders ?? []).some((S) => S.id === k.identityProviderId) && s.push({
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
  const d = (e.actorAppUses ?? []).filter(
    (k) => n.some((S) => S.id === k.appId) && (e.actors ?? []).some((S) => S.id === k.actorId)
  ), u = [...new Set(d.map((k) => k.actorId))];
  let h = 160;
  for (const k of u) {
    const S = (e.actors ?? []).find((z) => z.id === k), b = t[k] ?? { x: -60, y: h };
    h = b.y + ci + 46, i.push({
      id: k,
      label: S.name,
      x: b.x,
      y: b.y,
      w: 150,
      h: ci,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const k of d)
    s.push({
      id: `actorapp:${k.actorId}->${k.appId}`,
      sourceId: k.actorId,
      targetId: k.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: s };
}
const oc = 168, ac = 48;
function rc(e, t) {
  const i = [], s = [], n = e.models ?? [], o = e.modelMappings ?? [], a = (m) => {
    var y;
    return ((y = n.find((f) => f.id === m)) == null ? void 0 : y.name) ?? m ?? "?";
  };
  n.forEach((m, y) => {
    const f = t[m.id] ?? { x: 200 + y % 5 * 260, y: 140 + Math.floor(y / 5) * 150 };
    i.push({
      id: m.id,
      label: m.name,
      x: f.x,
      y: f.y,
      w: oc,
      h: ac,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado`
    });
  });
  const r = new Set(i.map((m) => m.id));
  for (const m of o)
    !m.sourceModelId || !m.targetModelId || !r.has(m.sourceModelId) || !r.has(m.targetModelId) || s.push({
      id: `mapping:${m.id}`,
      sourceId: m.sourceModelId,
      targetId: m.targetModelId,
      kind: "model-mapping",
      color: "#7c3aed",
      label: m.name,
      arrow: !0,
      tooltip: `${m.name} — las reglas campo a campo viven en su ficha; Supr lo elimina`
    });
  const l = new Set(
    o.filter((m) => m.sourceModelId && m.targetModelId).map((m) => `${m.sourceModelId}->${m.targetModelId}`)
  ), p = new Map(
    e.modules.flatMap((m) => (m.useCases ?? []).map((y) => [y.id, y]))
  ), g = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const y of m.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const f = p.get(y.useCaseId);
        if (!(f != null && f.inputModelId) || f.inputModelId === m.modelId) continue;
        const d = `${m.modelId}->${f.inputModelId}`;
        l.has(d) || g.has(d) || (g.add(d), !(!r.has(m.modelId) || !r.has(f.inputModelId)) && s.push({
          id: `mapgap:${m.id}:${y.useCaseId}`,
          sourceId: m.modelId,
          targetId: f.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${m.name}) llama a ${f.name}: falta mapear ${a(m.modelId)} → ${a(f.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function dc(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), s = new i(), o = {
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
  }, a = await s.layout(o), r = {};
  for (const l of a.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, ze = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? cc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && lc(t, i, n), n;
};
const pc = /* @__PURE__ */ new Set([
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
let Ae = class extends De {
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
        const o = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - o.left, y2: e.clientY - o.top };
        const a = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), r = (n = a == null ? void 0 : a.closest) == null ? void 0 : n.call(a, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = l !== this._connect.sourceId ? l : null;
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
    const a = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = a.transformPoint(new DOMPoint(0, 0, 0, 1)), l = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, m = t - i.top, y = l.x - g * l.w, f = p.x - g * p.w, d = l.y - m * l.w, u = p.y - m * p.w, h = g * r.w - r.x, w = m * r.w - r.y, A = y * u - f * d;
    return A ? { x: (h * u - f * w) / A, y: (y * w - h * d) / A } : { ...this._center };
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
    const t = this.depths(), i = new Map(e.map((h) => [h.id, h])), s = Math.min(...e.map((h) => h.x - h.w / 2)) - 60, n = Math.max(...e.map((h) => h.x + h.w / 2)) + 60, o = Math.min(...e.map((h) => h.y - h.h / 2)) - 60, a = Math.max(...e.map((h) => h.y + h.h / 2)) + 60, r = (s + n) / 2, l = (o + a) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (n - s), p.height / (a - o), 1) * 0.9 : 0.5, m = this._k * g;
    this._kUsed = m, this._center = { x: r, y: l };
    const y = 30, f = this._liveMove, d = (h) => h.x + ((f == null ? void 0 : f.id) === h.id ? f.dx : 0), u = (h) => h.y + ((f == null ? void 0 : f.id) === h.id ? f.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${o}px"
            width=${n - s}
            height=${a - o}
            viewBox="${s} ${o} ${n - s} ${a - o}"
          >
            ${this.scene.edges.map((h) => {
      const w = i.get(h.sourceId), A = i.get(h.targetId);
      return !w || !A ? "" : ee`<line
                x1=${d(w)} y1=${u(w)} x2=${d(A)} y2=${u(A)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((h) => {
      const w = i.get(h.sourceId), A = i.get(h.targetId);
      if (!w || !A) return "";
      const O = (t.get(w.id) ?? 0) * y + 2, F = (t.get(A.id) ?? 0) * y + 2, k = d(A) - d(w), S = u(A) - u(w), b = F - O, z = Math.hypot(k, S), R = Math.hypot(z, b), D = Math.atan2(S, k) * 180 / Math.PI, q = Math.atan2(b, z) * 180 / Math.PI, N = h.color ?? "#64748b", X = h.dashed ? `repeating-linear-gradient(90deg, ${N} 0 6px, transparent 6px 10px)` : N;
      return E`<div
              class="edge3"
              style="
                left: ${d(w)}px; top: ${u(w)}px; width: ${R}px; height: 1.7px;
                transform: translateZ(${O}px) rotateZ(${D}deg) rotateY(${-q}deg);
                background: ${X};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((h) => {
      const w = t.get(h.id) ?? 0, A = h.container || w === 0, O = this._hoverTargetId === h.id;
      return E`
              <div
                class="n3 ${h.container ? "container3" : ""} ${this.selectedId === h.id ? "selected3" : ""} ${O ? "hover3" : ""}"
                data-node-id=${h.id}
                data-kind=${h.kind}
                title=${h.tooltip ?? h.label}
                style="
                  left: ${d(h) - h.w / 2}px; top: ${u(h) - h.h / 2}px;
                  width: ${h.w}px; height: ${h.h}px;
                  transform: translateZ(${w * y + (O ? 8 : 0)}px)${O ? " scale(1.06)" : ""};
                  background: ${h.container ? "color-mix(in srgb, " + (h.fill ?? "#ffffff") + " 82%, transparent)" : h.fill ?? "#ffffff"};
                  border-color: ${h.stroke ?? "#64748b"};
                  border-style: ${h.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${A ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${h.badge ? E`<span class="badge3" style="color: ${h.stroke ?? "#94a3b8"}">${h.badge}</span>` : ""}
                <span>${h.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const h = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!h || !pc.has(h.kind)) return "";
      const w = (t.get(h.id) ?? 0) * y + 4;
      return [
        [d(h) + h.w / 2, u(h)],
        [d(h) - h.w / 2, u(h)],
        [d(h), u(h) + h.h / 2],
        [d(h), u(h) - h.h / 2]
      ].map(
        ([O, F]) => E`<div
                class="h3"
                data-source-id=${h.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${O}px; top: ${F}px; transform: translateZ(${w}px)"
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
Ae.styles = pt`
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
ze([
  oe({ attribute: !1 })
], Ae.prototype, "scene", 2);
ze([
  oe({ attribute: !1 })
], Ae.prototype, "selectedId", 2);
ze([
  oe({ attribute: !1 })
], Ae.prototype, "connectable", 2);
ze([
  U()
], Ae.prototype, "_rx", 2);
ze([
  U()
], Ae.prototype, "_rz", 2);
ze([
  U()
], Ae.prototype, "_k", 2);
ze([
  U()
], Ae.prototype, "_pan", 2);
ze([
  U()
], Ae.prototype, "_liveMove", 2);
ze([
  U()
], Ae.prototype, "_connect", 2);
ze([
  U()
], Ae.prototype, "_hoverTargetId", 2);
Ae = ze([
  ut("modux-tilt")
], Ae);
var uc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, he = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? mc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && uc(t, i, n), n;
};
const on = [
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
let re = class extends De {
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
      for (const r of a.children ?? []) s(r);
    }, n = (a) => {
      for (const r of a ?? [])
        r.id === t ? s(r) : n(r.children);
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
    return re.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((l) => l.kind === "tab"), r = a.find((l) => l.id === this._activeTabs[e.id]) ?? a[0];
      r && (e = r);
    }
    if (t === "into" && !re.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var o, a;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const r = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
      if (!r) return;
      let l;
      try {
        l = JSON.parse(r);
      } catch {
        return;
      }
      if (!l.componentId || !l.pageId || l.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
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
    const t = e.children ?? [], i = (m) => m.map((y) => this.renderComponent(y)), s = E`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = E`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), y = t.slice(Math.ceil(t.length / 2));
        n = E`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : s}</div>
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
        const m = t.filter((f) => f.kind === "tab"), y = m.find((f) => f.id === this._activeTabs[e.id]) ?? m[0];
        n = E`
          <div class="tabbar">
            ${m.map(
          (f, d) => E`<span
                class=${f === y ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: f.id }, this.emitEvent("component-selected", { componentId: f.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...f };
          }}
                @dragstart=${(u) => {
            var h, w;
            u.stopPropagation(), this._dragCmpId = f.id, (w = u.dataTransfer) == null || w.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (h = this.page) == null ? void 0 : h.id, componentId: f.id })
            );
          }}
                @dragover=${(u) => {
            var h;
            ((h = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : h.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var F, k;
            const h = this._dragCmpId;
            if (!h || h === f.id || ((F = this.nodeById(h)) == null ? void 0 : F.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const w = u.currentTarget.getBoundingClientRect(), O = u.clientX - w.left < w.width / 2 ? f.id : ((k = m[d + 1]) == null ? void 0 : k.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, O !== h && this.emitEvent("component-moved", {
              componentId: h,
              toParentId: e.id,
              beforeComponentId: O
            });
          }}
                >${f.title ?? "Pestaña"}</span
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
          (m, y) => E`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${y === 0 ? "▾" : "▸"}</span></div>
                  ${y === 0 ? this.renderComponent(m) : se}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = E`<div class="grid3-lay">
          ${t.length ? t.map((m) => E`<div class="board-col">${this.renderComponent(m)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...y] = t;
        n = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : E`<div class="placeholder">maestro</div>`}
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
        const y = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = y.length ? E`<div class="grid-lay">
              ${y.slice(0, 6).map(
          (f) => E`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${f.label ?? f.name}</label>${this.control(f)}</div>`
        )}
            </div>` : E`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const m = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        n = E`<table>
            <tr>${m.length ? m.map((y) => E`<th>${y.label ?? y.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(m.length ? m : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
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
    const o = re.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (m) => {
      var y, f;
      m.stopPropagation(), this._dragCmpId = e.id, (f = m.dataTransfer) == null || f.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (y = this.page) == null ? void 0 : y.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return E`<div
      class="cmp ${o ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(m) => {
      m.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(m) => {
      m.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${r}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(m) => {
      var f;
      m.preventDefault(), m.stopPropagation();
      const y = ((f = m.dataTransfer) == null ? void 0 : f.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...y].includes("application/x-modux-cmp") || [...y].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var y, f, d;
      this._foreignOver = !1, !(!this._dragCmpId && !((d = (f = (y = m.dataTransfer) == null ? void 0 : y.types) == null ? void 0 : f.includes) != null && d.call(f, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
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
            </table>` : se}
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
    var n, o, a, r;
    const e = this._cmp;
    if (!e) return se;
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
            <input .value=${e.title ?? ""} @input=${(l) => t({ title: l.target.value })} />` : se}
      ${i === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(l) => t({ text: l.target.value })} />` : se}
      ${i === "button" || i === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(l) => t({ label: l.target.value })} />` : se}
      ${i === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((n = this.useCases.find((l) => l.id === e.useCaseId)) == null ? void 0 : n.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : E`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? E`<span class="chip"
                      >${((o = this.mappings.find((l) => l.id === e.mappingId)) == null ? void 0 : o.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : se}
      ${i === "form" ? E`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? E`<span class="chip"
                      >${((a = this.models.find((l) => l.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : se}
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
            </span>` : se}
      ${i === "field" ? E`<label>Estereotipo</label>
            <select @change=${(l) => t({ stereotype: l.target.value || void 0 })}>
              ${on.map((l) => E`<option value=${l} ?selected=${l === (e.stereotype ?? "regular")}>${l}</option>`)}
            </select>` : se}
      ${i === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
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
    const i = (this.page.viewmodelFields ?? []).map((o) => o.fieldId), s = i.indexOf(t), n = i.indexOf(e);
    s < 0 || n < 0 || (i.splice(n, 0, ...i.splice(s, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
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
        ([a, r]) => E`<option value=${a} ?selected=${n === a}>${r}</option>`
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
        ${(e.buttons ?? []).some((n) => (n.bar ?? "toolbar") === "toolbar") ? se : E`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
      const a = (e.wizardSteps ?? []).map((l, p) => l.id ?? l.pageId ?? String(p)), r = a[o];
      return E`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${n.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
        const g = l.currentTarget.getBoundingClientRect(), y = l.clientX - g.left < g.width / 2 ? r : a[o + 1] ?? null;
        y !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: y });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${n.label ?? "Paso"}${n.pageId ? "" : " ⌁"}</span
                    >`;
    }) : E`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
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
        ${(e.buttons ?? []).some((n) => n.bar === "bottom") ? se : E`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o, a, r;
      const n = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
      return E`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((a = this.useCases.find((l) => l.id === this._btn.useCaseId)) == null ? void 0 : a.name) ?? this._btn.useCaseId}</span>
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
                    </button>` : se}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : se}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${on.map(
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
          </div>` : se}
    `;
  }
};
re.styles = pt`
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
he([
  oe({ attribute: !1 })
], re.prototype, "page", 2);
he([
  oe({ type: Boolean, reflect: !0 })
], re.prototype, "framed", 2);
he([
  oe({ attribute: !1 })
], re.prototype, "models", 2);
he([
  oe({ attribute: !1 })
], re.prototype, "mappings", 2);
he([
  oe({ attribute: !1 })
], re.prototype, "useCases", 2);
he([
  oe({ attribute: !1 })
], re.prototype, "queryOps", 2);
he([
  oe({ attribute: !1 })
], re.prototype, "selectedCmpId", 2);
he([
  U()
], re.prototype, "_editing", 2);
he([
  U()
], re.prototype, "_dragId", 2);
he([
  U()
], re.prototype, "_overId", 2);
he([
  U()
], re.prototype, "_rename", 2);
he([
  U()
], re.prototype, "_route", 2);
he([
  U()
], re.prototype, "_btn", 2);
he([
  U()
], re.prototype, "_cmp", 2);
he([
  U()
], re.prototype, "_dragCmpId", 2);
he([
  U()
], re.prototype, "_dragWizKey", 2);
he([
  U()
], re.prototype, "_overCmpId", 2);
he([
  U()
], re.prototype, "_overCmpPos", 2);
he([
  U()
], re.prototype, "_foreignOver", 2);
he([
  U()
], re.prototype, "_activeTabs", 2);
re = he([
  ut("modux-page-designer")
], re);
var hc = Object.defineProperty, fc = Object.getOwnPropertyDescriptor, Ee = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? fc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && hc(t, i, n), n;
};
const Xn = 460, gc = 540, Ic = 660;
let be = class extends De {
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
        const a = this.pages.findIndex((l) => l.id === o), r = this.posOf(o, a);
        this.emit("element-selected", { elementType: "node", id: o, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: o, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
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
    var g, m, y, f, d, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (y = o == null ? void 0 : o.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), r = (f = a == null ? void 0 : a.closest) == null ? void 0 : f.call(a, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${n}:${r.dataset.btnUc}`;
    const l = (d = a == null ? void 0 : a.closest) == null ? void 0 : d.call(a, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${n}:${l.dataset.bar}`;
    const p = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    return p ? `cmp:${n}:${p.dataset.cmpId}` : n;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var y, f, d, u;
    const i = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), s = (f = i == null ? void 0 : i.closest) == null ? void 0 : f.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (d = o == null ? void 0 : o.shadowRoot) == null ? void 0 : d.elementFromPoint(e, t), r = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    if (!r) return { pageId: n, componentId: null, pos: "into" };
    const l = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), m = re.LEAF_KINDS.has(l) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: n, componentId: r.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Xn, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * gc, y: Math.floor(t / 3) * Ic };
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
be.styles = pt`
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
      width: ${Xn}px;
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
Ee([
  oe({ attribute: !1 })
], be.prototype, "pages", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "layout", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "sizes", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "selectedId", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "selectedIds", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "models", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "mappings", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "useCases", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "queryOps", 2);
Ee([
  oe({ attribute: !1 })
], be.prototype, "selectedCmp", 2);
Ee([
  U()
], be.prototype, "_t", 2);
Ee([
  U()
], be.prototype, "_live", 2);
Ee([
  U()
], be.prototype, "_liveSize", 2);
be = Ee([
  ut("modux-figma")
], be);
var yc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Jt = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? vc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && yc(t, i, n), n;
};
const wc = {
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
}, Yi = {
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
}, bc = {
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
}, an = [30, 20, 13, 9.5, 7.5], rn = [0, 180, 118, 80, 58], xc = 0.055, dn = 0.86, kc = 2600, pi = 240, ln = 0.16, cn = 0.015;
let Oe = class extends De {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this.frame = 0;
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
      sessionStorage.setItem(Oe.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(Oe.STORE_KEY);
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
    for (const m of e)
      t = Math.min(t, m.x), i = Math.min(i, m.y), s = Math.max(s, m.x), n = Math.max(n, m.y);
    const o = 70, a = this.clientWidth || 800, r = this.clientHeight || 600, l = s - t + o * 2, p = n - i + o * 2, g = Math.min(1.5, Math.max(0.25, Math.min(a / l, r / p)));
    this.cam.k = g, this.cam.x = a / 2 - (t + s) / 2 * g, this.cam.y = r / 2 - (i + n) / 2 * g;
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
    const o = `${(n == null ? void 0 : n.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(o), r = () => (Math.random() - 0.5) * 10;
    return {
      key: o,
      refId: t,
      kind: e,
      label: i,
      color: wc[e] ?? "#64748b",
      depth: s,
      parent: n,
      expanded: (a == null ? void 0 : a.expanded) ?? !1,
      x: (a == null ? void 0 : a.x) ?? (n ? n.x + r() : 0),
      y: (a == null ? void 0 : a.y) ?? (n ? n.y + r() : 0),
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
    const t = this.model, i = e.depth + 1, s = (n, o, a) => this.makeNode(n, o, a, i, e);
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
        const o = (t.aggregates ?? []).filter((p) => p.moduleId === e.refId), a = n.useCases ?? [], r = new Set(o.map((p) => p.id)), l = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...o.length ? [s("group", `aggregates:${e.refId}`, `Agregados · ${o.length}`)] : [],
          ...a.length ? [s("group", `use-cases:${e.refId}`, `Casos de uso · ${a.length}`)] : [],
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
        const n = e.refId.indexOf(":"), o = e.refId.slice(0, n), a = e.refId.slice(n + 1), r = t.modules.find((l) => l.id === a);
        return r ? o === "aggregates" ? (t.aggregates ?? []).filter((l) => l.moduleId === a).map((l) => s("aggregate", l.id, l.name)) : (r.useCases ?? []).map((l) => s(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
      }
      case "aggregate": {
        const n = new Set(
          (t.emissions ?? []).filter((o) => o.sourceId === e.refId).map((o) => o.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((o) => o.aggregateId === e.refId).map((o) => s("entity", o.id, o.name)),
          ...t.modules.flatMap((o) => o.domainEvents ?? []).filter((o) => n.has(o.id)).map((o) => s("domain-event", o.id, o.name))
        ];
      }
      case "external-system": {
        const n = t.externalSystems.find((o) => o.id === e.refId);
        return n ? [
          ...(t.apis ?? []).filter((o) => o.publishedByExternalSystemId === e.refId).map((o) => s("api", o.id, o.name)),
          ...(n.useCases ?? []).map((o) => s("external-use-case", o.id, o.name)),
          ...(n.tables ?? []).map((o) => s("external-table", o.id, o.name)),
          ...(n.mcpServers ?? []).map((o) => s("mcp-server", o.id, o.name))
        ] : [];
      }
      case "api": {
        const n = (t.apis ?? []).find((o) => o.id === e.refId);
        return ((n == null ? void 0 : n.operations) ?? []).map((o) => s("api-operation", o.id, o.name));
      }
      case "ui-app": {
        const n = (t.uiApps ?? []).find((r) => r.id === e.refId);
        if (!n) return [];
        const o = /* @__PURE__ */ new Set(), a = (r) => {
          for (const l of r ?? [])
            l.pageId && o.add(l.pageId), a(l.children);
        };
        a(n.menuItems);
        for (const r of [n.headerPageId, n.homePageId, n.viewPageId, n.editPageId])
          r && o.add(r);
        return [...o].map((r) => (t.pages ?? []).find((l) => l.id === r)).filter((r) => !!r).map((r) => s("page", r.id, r.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (i) => {
      if (e.push(i), i.expanded) for (const s of i.children ?? []) t(s);
    };
    return this.root && t(this.root), e;
  }
  tick() {
    this.t += 1 / 60;
    const e = this.visible();
    this.step(e), this.stepFlight(), this.draw(e), (this.frame = (this.frame + 1) % 60) === 0 && this.saveState(), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var i;
    const t = this.t;
    for (const s of e) {
      if (s.parent) {
        const n = (rn[Math.min(s.depth, rn.length - 1)] ?? 60) + Math.min(60, ((((i = s.parent.children) == null ? void 0 : i.length) ?? 1) - 1) * 2.5);
        let o = s.x - s.parent.x, a = s.y - s.parent.y, r = Math.hypot(o, a);
        if (r < 0.01) {
          const m = Math.random() * Math.PI * 2;
          o = Math.cos(m) * 0.1, a = Math.sin(m) * 0.1, r = 0.1;
        }
        const l = xc * (r - n), p = o / r * l, g = a / r * l;
        s.vx -= p, s.vy -= g, s.parent.vx += p * 0.4, s.parent.vy += g * 0.4;
      } else
        s.vx -= s.x * cn, s.vy -= s.y * cn;
      this.reducedMotion || (s.vx += Math.sin(t * s.f1 * Math.PI * 2 + s.p1) * ln, s.vy += Math.cos(t * s.f2 * Math.PI * 2 + s.p2) * ln);
    }
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      for (let o = s + 1; o < e.length; o++) {
        const a = e[o], r = a.x - n.x, l = a.y - n.y;
        if (Math.abs(r) > pi || Math.abs(l) > pi) continue;
        const p = r * r + l * l;
        if (p > pi * pi || p < 0.01) continue;
        const g = Math.sqrt(p), m = n.depth <= 1 && a.depth <= 1 ? 3 : 1, y = kc * m / p, f = r / g * y, d = l / g * y;
        n.vx -= f, n.vy -= d, a.vx += f, a.vy += d;
      }
    }
    for (const s of e) {
      if (s === this.dragNode) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.vx *= dn, s.vy *= dn;
      const n = Math.hypot(s.vx, s.vy);
      n > 14 && (s.vx = s.vx / n * 14, s.vy = s.vy / n * 14), s.x += s.vx, s.y += s.vy;
      const o = s === this.hover ? 1.75 : 1;
      s.scale += (o - s.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (an[Math.min(e.depth, an.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var o, a;
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
      const p = ((o = r.children) == null ? void 0 : o.length) ?? 0;
      if (!r.expanded && p > 0) {
        const m = Math.max(7, l * 0.42), y = r.x + l * 0.75, f = r.y + l * 0.75;
        t.beginPath(), t.arc(y, f, m, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = n(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), y, f + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const m = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${n(12)}` : n(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(m, r.x, r.y + l + 4);
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
    this.hover && this.drawThreads(t, this.hover, e), this.hover && !this.hover.expanded && ((a = this.hover.children) != null && a.length) && this.drawGhosts(t, this.hover), t.restore(), this.hover && this.drawCard(t, this.hover, i, s);
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
      for (const o of i) {
        if (o === t || !s.has(o.refId) || o === t.parent || o.parent === t) continue;
        const a = (t.x + o.x) / 2, r = (t.y + o.y) / 2, l = o.x - t.x, p = o.y - t.y, g = 0.18;
        e.strokeStyle = o.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(a - p * g, r + l * g, o.x, o.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(o.x, o.y, this.radiusOf(o) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], s = i.slice(0, 14), n = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (n <= 0.02) return;
    const a = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = n, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, s.forEach((p, g) => {
      const m = r - l / 2 + l * (g + 0.5) / s.length, y = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, f = t.x + Math.cos(m) * (a + y), d = t.y + Math.sin(m) * (a + y);
      e.beginPath(), e.arc(f, d, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > s.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + l / 2 + 0.35;
      e.fillText(`+${i.length - s.length}`, t.x + Math.cos(p) * a, t.y + Math.sin(p) * a);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const s = i * 0.42;
    if (s < 3.2) return;
    const { x: n, y: o } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, s * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "group": {
        e.arc(n - s * 0.45, o, s * 0.16, 0, Math.PI * 2), e.moveTo(n + s * 0.16, o), e.arc(n, o, s * 0.16, 0, Math.PI * 2), e.moveTo(n + s * 0.61, o), e.arc(n + s * 0.45, o, s * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(n, o, s, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(n - s * Math.cos(Math.PI * 0.35), o + s * Math.sin(Math.PI * 0.35)), e.arc(n, o, s, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(n, o, s, 0, Math.PI * 2), e.moveTo(n + s * 0.35, o), e.arc(n, o, s * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "module":
        for (const [a, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(n + a * s + s * 0.3, o + r * s), e.arc(n + a * s, o + r * s, s * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(n, o - s), e.lineTo(n + s, o), e.lineTo(n, o + s), e.lineTo(n - s, o), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(n - s, o - s * 0.8, s * 2, s * 1.6), e.moveTo(n - s, o - s * 0.25), e.lineTo(n + s, o - s * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(n - s * 0.6, o - s * 0.85), e.lineTo(n + s * 0.85, o), e.lineTo(n - s * 0.6, o + s * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(n + s * 0.3, o - s), e.lineTo(n - s * 0.5, o + s * 0.15), e.lineTo(n + s * 0.05, o + s * 0.15), e.lineTo(n - s * 0.3, o + s), e.lineTo(n + s * 0.5, o - s * 0.15), e.lineTo(n - s * 0.05, o - s * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(n, o, s * 0.5, 0, Math.PI * 2);
        for (let a = 0; a < 6; a++) {
          const r = a * Math.PI / 3;
          e.moveTo(n + Math.cos(r) * s * 0.55, o + Math.sin(r) * s * 0.55), e.lineTo(n + Math.cos(r) * s, o + Math.sin(r) * s);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(n - s * 0.25, o - s * 0.25, s * 0.6, 0, Math.PI * 2), e.moveTo(n + s * 0.25, o + s * 0.25), e.lineTo(n + s, o + s), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(n, o, s, 0, Math.PI * 2), e.moveTo(n, o - s * 0.55), e.lineTo(n, o), e.lineTo(n + s * 0.45, o + s * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(n - s * 0.85, o + s * 0.45), e.quadraticCurveTo(n - s * 0.85, o - s, n, o - s), e.quadraticCurveTo(n + s * 0.85, o - s, n + s * 0.85, o + s * 0.45), e.closePath(), e.moveTo(n + s * 0.25, o + s * 0.75), e.arc(n, o + s * 0.75, s * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(n - s * 0.7, o - s), e.lineTo(n + s * 0.25, o - s), e.lineTo(n + s * 0.7, o - s * 0.55), e.lineTo(n + s * 0.7, o + s), e.lineTo(n - s * 0.7, o + s), e.closePath(), e.moveTo(n + s * 0.25, o - s), e.lineTo(n + s * 0.25, o - s * 0.55), e.lineTo(n + s * 0.7, o - s * 0.55), e.stroke();
        break;
      case "workflow":
        for (const a of [-0.7, 0.1])
          e.moveTo(n + a * s, o - s * 0.7), e.lineTo(n + (a + 0.6) * s, o), e.lineTo(n + a * s, o + s * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(n - s * 0.45, o - s * 0.45, s * 0.45, 0, Math.PI * 2), e.moveTo(n - s * 0.1, o - s * 0.1), e.lineTo(n + s * 0.9, o + s * 0.9), e.moveTo(n + s * 0.45, o + s * 0.45), e.lineTo(n + s * 0.85, o + s * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(n, o - s * 0.5, s * 0.42, 0, Math.PI * 2), e.moveTo(n - s * 0.8, o + s), e.quadraticCurveTo(n, o - s * 0.1, n + s * 0.8, o + s), e.stroke();
        break;
      case "ai-agent":
        for (let a = 0; a < 4; a++) {
          const r = a * Math.PI / 2 + Math.PI / 4;
          e.moveTo(n, o), e.lineTo(n + Math.cos(r) * s, o + Math.sin(r) * s), e.moveTo(n, o), e.lineTo(n + Math.cos(r + Math.PI / 4) * s * 0.5, o + Math.sin(r + Math.PI / 4) * s * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(n - s * 0.45, o + s * 0.15, s * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(n + s * 0.1, o - s * 0.35, s * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(n + s * 0.55, o + s * 0.2, s * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [a, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(n + a * s, o + r * s, s * 0.85, s * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(n - s, o - s * 0.8, s * 2, s * 1.6), e.moveTo(n - s, o - s * 0.35), e.lineTo(n + s, o - s * 0.35), e.stroke(), e.beginPath(), e.arc(n - s * 0.7, o - s * 0.57, s * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(n - s * 0.25, o - s), e.lineTo(n - s, o), e.lineTo(n - s * 0.25, o + s), e.moveTo(n + s * 0.25, o - s), e.lineTo(n + s, o), e.lineTo(n + s * 0.25, o + s), e.stroke();
        break;
      case "api-operation":
        e.moveTo(n - s, o), e.lineTo(n + s * 0.7, o), e.moveTo(n + s * 0.1, o - s * 0.5), e.lineTo(n + s * 0.8, o), e.lineTo(n + s * 0.1, o + s * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(n, o + s * 0.25, s * 0.6, 0, Math.PI), e.closePath(), e.moveTo(n - s * 0.35, o + s * 0.25), e.lineTo(n - s * 0.35, o - s * 0.7), e.moveTo(n + s * 0.35, o + s * 0.25), e.lineTo(n + s * 0.35, o - s * 0.7), e.stroke();
        break;
      default:
        e.arc(n, o, s * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, s) {
    var b, z;
    const n = (t.children ?? []).flatMap(
      (R) => R.kind === "group" ? R.children ?? (R.children = this.childrenOf(R)) : [R]
    ), o = /* @__PURE__ */ new Map();
    for (const R of n) o.set(R.kind, (o.get(R.kind) ?? 0) + 1);
    const a = [];
    for (const [R, D] of o)
      if (a.push(`${D} ${D === 1 ? (Yi[R] ?? R).toLowerCase() : bc[R] ?? R}`), a.length === 4) {
        const q = [...o.keys()].length - 4;
        q > 0 && (a[3] += ` (+${q} tipos más)`);
        break;
      }
    const r = n.slice(0, 6).map((R) => ({ label: R.label.length > 30 ? R.label.slice(0, 29) + "…" : R.label, color: R.color })), l = n.length - r.length, p = t.label, g = Yi[t.kind] ?? t.kind, m = ((b = t.children) != null && b.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((z = t.children) != null && z.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const y = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const f = Math.max(
      e.measureText(g).width,
      ...a.map((R) => e.measureText(R).width),
      ...r.map((R) => e.measureText(R.label).width + 12),
      e.measureText(m).width
    ), d = Math.min(300, Math.max(y, f) + 24), u = r.length ? 8 + r.length * 15 + (l > 0 ? 15 : 0) : 0, h = 40 + a.length * 15 + u + (m ? 18 : 0), w = this.radiusOf(t) * this.cam.k, A = this.cam.x + t.x * this.cam.k, O = this.cam.y + t.y * this.cam.k;
    let F = A + w + 14;
    F + d > i - 8 && (F = A - w - 14 - d), F = Math.max(8, Math.min(F, i - d - 8));
    const k = Math.max(8, Math.min(O - 10, s - h - 8));
    e.translate(F, k), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, d, h, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", a.forEach((R, D) => e.fillText(R, 12, 41 + D * 15));
    let S = 41 + a.length * 15 + (r.length ? 8 : 0);
    r.forEach((R) => {
      e.fillStyle = R.color, e.beginPath(), e.arc(15, S + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(R.label, 24, S), S += 15;
    }), l > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${l} más`, 24, S)), m && (e.fillStyle = "#94a3b8", e.fillText(m, 12, h - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = Oe.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && Oe.fold(i.label).includes(t)).slice(0, 8);
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
      const n = i[s], o = this.radiusOf(n) + 4 / this.cam.k;
      if ((e - n.x) ** 2 + (t - n.y) ** 2 <= o * o) return n;
    }
  }
  onPointerDown(e) {
    this.flight = void 0;
    const t = this.toWorld(e);
    this.downAt = { x: e.clientX, y: e.clientY }, this.moved = !1;
    const i = this.nodeAt(t.x, t.y);
    i ? this.dragNode = i : this.panning = !0;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
    }
  }
  onPointerMove(e) {
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 4 && (this.moved = !0), this.dragNode) {
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
  onPointerUp() {
    const e = this.dragNode;
    this.dragNode = void 0, this.panning = !1, e && !this.moved && this.toggle(e);
  }
  /** Click: the node explodes — children burst out from it and the springs settle. */
  toggle(e) {
    var t;
    if ((t = e.children) != null && t.length && (e.expanded = !e.expanded, e.expanded)) {
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, s = e.parent ? Math.PI * 1.25 : Math.PI * 2, n = e.children;
      n.forEach((o, a) => {
        this.materialize(o.parent);
        const r = i - s / 2 + s * (a + 0.5) / n.length;
        o.x = e.x + Math.cos(r) * 6, o.y = e.y + Math.sin(r) * 6, o.vx = Math.cos(r) * 7, o.vy = Math.sin(r) * 7, o.children || (o.children = this.childrenOf(o));
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, s = e.clientY - t.top, n = Math.exp(-e.deltaY * 12e-4), o = Math.min(2.5, Math.max(0.25, this.cam.k * n)), a = o / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * a, this.cam.y = s - (s - this.cam.y) * a, this.cam.k = o;
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
                  <span class="path">${this.pathOf(e) || (Yi[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? E`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
      </div>
      <div class="hud">
        click: expandir / plegar · doble click: abrir · hover: ver contenido<br />
        buscar: expande el camino y vuela hasta el nodo<br />
        arrastrar nodo: tirar del subárbol · fondo: mover · rueda: zoom
      </div>
    `;
  }
};
Oe.styles = pt`
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
Oe.STORE_KEY = "modux-explorer-state";
Jt([
  oe({ attribute: !1 })
], Oe.prototype, "model", 2);
Jt([
  U()
], Oe.prototype, "_q", 2);
Jt([
  U()
], Oe.prototype, "_sugs", 2);
Jt([
  U()
], Oe.prototype, "_active", 2);
Oe = Jt([
  ut("modux-explorer")
], Oe);
var _c = Object.defineProperty, $c = Object.getOwnPropertyDescriptor, te = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? $c(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && _c(t, i, n), n;
};
const ns = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Ec = Object.keys(ns);
function Rt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [m, y] of [
    [-p, e.x - s],
    [p, n - e.x],
    [-g, e.y - o],
    [g, a - e.y]
  ]) {
    if (m === 0) {
      if (y < 0) return !1;
      continue;
    }
    const f = y / m;
    if (m < 0) {
      if (f > l) return !1;
      f > r && (r = f);
    } else {
      if (f < r) return !1;
      f < l && (l = f);
    }
  }
  return l - r > 0.02;
}
function Sc(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), n = (g) => {
    var y;
    const m = /* @__PURE__ */ new Set();
    for (let f = g; f; f = (y = s.get(f)) == null ? void 0 : y.parentId) m.add(f);
    return m;
  }, o = e.nodes, a = (g) => g.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (g, m, y) => {
    const f = a(y), d = { x: y.x, y: y.y, w: y.w + 2 * f, h: y.h + 2 * f }, u = y.w / 2 + f * 1.5, h = y.h / 2 + f * 1.5, w = { x: y.x - u, y: y.y - h }, A = { x: y.x + u, y: y.y - h }, O = { x: y.x - u, y: y.y + h }, F = { x: y.x + u, y: y.y + h }, k = [];
    for (const S of [w, A, O, F])
      !Rt(g, S, d) && !Rt(S, m, d) && k.push([S]);
    for (const [S, b] of [
      [w, A],
      [A, w],
      [A, F],
      [F, A],
      [F, O],
      [O, F],
      [O, w],
      [w, O]
    ])
      !Rt(g, S, d) && !Rt(b, m, d) && k.push([S, b]);
    return k;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const m = s.get(g.sourceId), y = s.get(g.targetId);
    if (!m || !y) continue;
    const f = /* @__PURE__ */ new Set([...n(m.id), ...n(y.id)]), d = [
      { x: m.x, y: m.y },
      { x: y.x, y: y.y }
    ];
    for (let u = 0; u < 12; u++) {
      let h = !1;
      e: for (let w = 0; w < d.length - 1; w++)
        for (const A of o) {
          if (f.has(A.id)) continue;
          const O = a(A), F = { x: A.x, y: A.y, w: A.w + 2 * O, h: A.h + 2 * O };
          if (!Rt(d[w], d[w + 1], F)) continue;
          const k = l(d[w], d[w + 1], A);
          if (!k.length) continue;
          const S = (z) => o.some(
            (R) => R !== A && !f.has(R.id) && Math.abs(z.x - R.x) < R.w / 2 + a(R) / 2 && Math.abs(z.y - R.y) < R.h / 2 + a(R) / 2
          ), b = (z) => {
            let R = 0;
            const D = [d[w], ...z, d[w + 1]];
            for (let q = 0; q < D.length - 1; q++)
              R += Math.hypot(D[q + 1].x - D[q].x, D[q + 1].y - D[q].y);
            return R + (z.some(S) ? 1e4 : 0);
          };
          k.sort((z, R) => b(z) - b(R)), d.splice(w + 1, 0, ...k[0]), h = !0;
          break e;
        }
      if (!h) break;
    }
    d.length > 2 && r.set(
      g.id,
      d.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return r;
}
const ne = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function pn(e, t) {
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
function Cc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let j = class extends De {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "explorer", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newModuleId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var o;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const s = this.renderRoot.querySelector("modux-canvas"), n = (a) => {
        e.preventDefault(), this.onDiagramScopeChange(a);
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
          e.preventDefault(), s == null || s.fit(), (o = this.renderRoot.querySelector("modux-explorer")) == null || o.fit();
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
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, o = ge(t);
      if (!(o != null && o.itemId)) return;
      const a = this.menuEntryIn(o.appId, o.itemId);
      if (!a) return;
      const r = (l, p) => (l ?? []).some((g) => g.id === p || r(g.children, p));
      if (n) {
        const l = ge(n);
        if (!(l != null && l.itemId) || l.itemId === o.itemId || o.appId === l.appId && r(a.entry.children, l.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: l.appId,
          itemId: o.itemId,
          parentId: l.itemId
        });
        return;
      }
      if (s) {
        const l = ge(s);
        if (!(l != null && l.itemId) || l.itemId === o.itemId) return;
        const p = this.menuEntryIn(l.appId, l.itemId);
        if (!p || o.appId === l.appId && r(a.entry.children, l.itemId) || o.appId === l.appId && p.parentId === a.parentId && a.beforeId === l.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: l.appId,
          itemId: o.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: l.itemId
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
      const r = JSON.parse(JSON.stringify(a.node)), { ops: l } = this.rebuildComponentOps(i, r, n ?? void 0, o);
      for (const p of l) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, r, a.parentId ?? void 0, a.beforeId).ops
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
    return ni(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = ni(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations" || t === "distribution") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = ni(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = ni(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), r = Ai(a), l = [...r.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: o.nodes[g] ?? null
    })), p = { ...o.nodes };
    for (const [g, m] of r) {
      const y = a.find((d) => d.id === g), f = o.nodes[g] ?? { x: y.x, y: y.y };
      p[g] = {
        x: Math.round(f.x + (m.x - y.x)),
        y: Math.round(f.y + (m.y - y.y))
      };
    }
    this.writeViewLayout("context-map", { ...o, nodes: p }), l.length && this.pushUndoEntry(l);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = Sc(e, t);
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
    var t, i, s, n, o, a, r, l, p, g, m, y, f;
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
        const d = (this.model.models ?? []).find((h) => h.id === e.id);
        if (!d) return null;
        const u = [{ kind: "add-model", id: d.id, name: d.name }];
        for (const h of this.model.pages ?? []) {
          h.modelId === e.id && u.push({ kind: "set-page-model", pageId: h.id, modelId: e.id });
          const w = (A) => {
            for (const O of A ?? [])
              O.modelId === e.id && u.push({ kind: "set-page-component", pageId: h.id, componentId: O.id, modelId: e.id }), w(O.children);
          };
          w(h.content);
        }
        for (const h of this.model.uiApps ?? [])
          h.modelId === e.id && u.push({ kind: "set-app-model", appId: h.id, modelId: e.id });
        return u;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const d = (this.model.pages ?? []).find((h) => h.id === e.pageId), u = e.kind === "set-crud-detail";
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
        const d = (((i = (this.model.pages ?? []).find((h) => h.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((h) => h.id ?? h.pageId), u = d.indexOf(e.targetId);
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
        const h = (w, A) => {
          for (const O of w ?? [])
            u.push({
              kind: "add-menu-item",
              appId: d.id,
              label: O.label,
              itemId: O.id,
              parentId: A == null ? void 0 : A.id,
              parentLabel: A && !A.id ? A.label : void 0,
              pageId: O.pageId ?? null
            }), O.uiAdapterId && u.push({ kind: "set-menu-app", appId: d.id, toAppId: O.uiAdapterId, itemId: O.id, label: O.label }), O.useCaseId && u.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: O.useCaseId, itemId: O.id, label: O.label }), O.aggregateId && u.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: O.aggregateId, itemId: O.id, label: O.label }), O.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: d.id,
              queryServiceId: O.queryServiceId ?? null,
              queryOperationId: O.queryOperationId,
              itemId: O.id,
              label: O.label
            }), h(O.children, O);
        };
        h(d.menuItems);
        for (const w of this.model.actorAppUses ?? [])
          w.appId === e.id && u.push({ kind: "add-actor-app", actorId: w.actorId, appId: e.id });
        return u;
      }
      case "delete-ui-page": {
        const d = (this.model.pages ?? []).find((h) => h.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
        ];
        d.route && u.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && u.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
        for (const h of d.buttons ?? [])
          h.useCaseId && (u.push({ kind: "add-page-button", pageId: d.id, useCaseId: h.useCaseId, label: h.label }), h.mappingId && u.push({
            kind: "set-page-button",
            pageId: d.id,
            useCaseId: h.useCaseId,
            label: h.label ?? null,
            mappingId: h.mappingId
          }));
        for (const h of d.viewmodelFields ?? [])
          (h.stereotype || h.colspan || h.label) && u.push({
            kind: "set-page-field-config",
            pageId: d.id,
            fieldId: h.fieldId,
            stereotype: h.stereotype ?? null,
            colspan: h.colspan ?? null,
            label: h.label ?? null
          });
        (d.viewmodelFields ?? []).length && u.push({
          kind: "set-page-field-order",
          pageId: d.id,
          fieldIds: (d.viewmodelFields ?? []).map((h) => h.fieldId)
        });
        for (const h of d.content ?? [])
          u.push(...this.rebuildComponentOps(d.id, h, void 0, null).ops);
        for (const h of d.wizardSteps ?? [])
          u.push({
            kind: "add-page-wizard-step",
            pageId: d.id,
            targetId: h.pageId ?? null,
            label: h.label,
            itemId: h.id
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
          for (const A of w ?? []) {
            if (e.itemId ? A.id === e.itemId : A.label === e.label) return A;
            const O = u(A.children);
            if (O) return O;
          }
          return null;
        }, h = e.itemId || e.label ? u(d == null ? void 0 : d.menuItems) : null;
        return h ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: h.label,
          pageId: h.pageId ?? null,
          itemId: h.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: h.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: h.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: h.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: h.queryServiceId ?? null,
          queryOperationId: h.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: h.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const d = (this.model.pages ?? []).find((h) => h.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((h) => h.useCaseId === e.useCaseId);
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
        const d = (this.model.pages ?? []).find((h) => h.id === e.pageId), u = ((d == null ? void 0 : d.buttons) ?? []).find((h) => h.useCaseId === e.useCaseId);
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
        const d = (this.model.pages ?? []).find((F) => F.id === e.pageId);
        let u = null, h = null, w = null;
        const A = (F, k) => {
          var b;
          const S = F ?? [];
          for (let z = 0; z < S.length; z++)
            S[z].id === e.componentId && (u = S[z], h = k, w = ((b = S[z + 1]) == null ? void 0 : b.id) ?? null), A(S[z].children, S[z]);
        };
        if (A(d == null ? void 0 : d.content, null), !u) return null;
        const O = u;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: O.title ?? null,
          text: O.text ?? null,
          label: O.label ?? null,
          useCaseId: O.useCaseId ?? null,
          mappingId: O.mappingId ?? null,
          modelId: O.modelId ?? null,
          queryServiceId: O.queryServiceId ?? null,
          queryOperationId: O.queryOperationId ?? null,
          fieldId: O.fieldId ?? null,
          stereotype: O.stereotype ?? null,
          colspan: O.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: h === null ? null : h.id,
          beforeComponentId: w
        }] : this.rebuildComponentOps(
          e.pageId,
          O,
          h === null ? void 0 : h.id,
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
        const d = (((o = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).map((u) => u.fieldId);
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
        const d = this.model.modules.find((h) => h.id === e.id);
        if (!d) return null;
        const u = this.model.relations.filter(
          (h) => (h.sourceId === e.id || h.targetId === e.id) && h.type != null
        );
        return [
          { kind: "add-module", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...u.map(
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
          const u = (d.queryServices ?? []).find((h) => h.id === e.id);
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
          const u = (d.useCases ?? []).find((h) => h.id === e.id);
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
          const u = (d.useCases ?? []).find((h) => h.id === e.id);
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
        const d = (this.model.notifications ?? []).find((h) => h.id === e.id);
        if (!(d != null && d.ownerModuleId)) return null;
        const u = [
          { kind: "add-notification", id: d.id, name: d.name, moduleId: d.ownerModuleId, type: (d.channels ?? [])[0] }
        ];
        d.eventId && u.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
        for (const h of d.recipientRoleIds ?? []) u.push({ kind: "add-notification-recipient", id: d.id, roleId: h });
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
        const d = (this.model.documents ?? []).find((h) => h.id === e.id);
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
        const d = (this.model.identityProviders ?? []).find((h) => h.id === e.id);
        if (!d) return null;
        const u = [
          { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
        ];
        d.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
        for (const h of this.model.modules)
          h.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: h.id, targetId: e.id });
        for (const h of this.model.uiApps ?? [])
          h.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: h.id, targetId: e.id });
        for (const h of this.model.etlFlows ?? [])
          h.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: h.id, targetId: e.id });
        return u;
      }
      case "set-idp-publisher": {
        const d = (this.model.identityProviders ?? []).find((u) => u.id === e.id);
        return [{ kind: "set-idp-publisher", id: e.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
      }
      case "set-identity-provider": {
        const d = ((a = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : a.identityProviderId) ?? ((r = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : r.identityProviderId) ?? ((l = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : l.identityProviderId) ?? null;
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
          (h) => (h.scheduledTriggers ?? []).some((w) => w.id === e.id)
        ), u = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((h) => h.id === e.id);
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
          const u = (d.mcpServers ?? []).find((h) => h.id === e.id);
          if (u)
            return [
              { kind: "add-mcp-server", id: u.id, name: u.name, moduleId: d.id, uri: u.uri },
              ...(this.model.agentMcpUses ?? []).filter((h) => h.mcpServerId === e.id).map(
                (h) => ({
                  kind: "add-agent-mcp",
                  sourceId: h.agentId,
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
          const u = (d.applicationEvents ?? []).find((h) => h.id === e.id);
          if (u)
            return [{ kind: "add-application-event", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const d of this.model.modules) {
          const u = (d.domainServices ?? []).find((h) => h.id === e.id);
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
          const u = (d.tables ?? []).find((h) => h.id === e.id);
          if (u) return [{ kind: "add-external-table", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const d = (m = (g = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : m.find((u) => u.uri === e.uri);
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
        const d = (y = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : y.operations.find((u) => u.id === e.id);
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
        const d = (f = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : f.operations.find((u) => u.id === e.id);
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
          const u = (d.readModels ?? []).find((h) => h.id === e.id);
          if (u != null && u.aggregateId)
            return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const d of this.model.modules) {
          const u = (d.domainEvents ?? []).find((h) => h.id === e.id);
          if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, moduleId: d.id }];
        }
        return null;
      }
      case "rename-element": {
        const u = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((h) => h.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((h) => h.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((h) => h.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((h) => h.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((h) => h.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((h) => h.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((h) => h.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((h) => h.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((h) => h.id === e.id);
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
        const h = d.steps[u];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: h.id,
            name: h.name,
            stepType: h.type,
            roleId: h.roleId,
            deadline: h.deadline,
            useCaseId: h.useCaseId,
            compensationUseCaseId: h.compensationUseCaseId,
            afterStepId: u > 0 ? d.steps[u - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const d = (this.model.processes ?? []).find((h) => h.id === e.processId), u = (d == null ? void 0 : d.steps.findIndex((h) => h.id === e.id)) ?? -1;
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
        const d = (this.model.processes ?? []).find((h) => h.id === e.processId), u = d == null ? void 0 : d.steps.find((h) => h.id === e.id);
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
        const h = d.steps[u];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: h.id,
            name: h.name,
            emittedEventName: h.emittedEventName,
            targetUseCaseId: h.targetUseCaseId,
            completionEventName: h.completionEventName,
            dependsOnStepIds: h.dependsOnStepIds,
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
        const d = (this.model.workflows ?? []).find((h) => h.id === e.workflowId), u = d == null ? void 0 : d.steps.find((h) => h.id === e.id);
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
    const { id: t, x: i, y: s } = e.detail, n = this._view, o = this.viewLayout(n), a = o.nodes[t] ?? null;
    let r = { x: i, y: s };
    const l = this.sceneFor(n), p = l.nodes.find((m) => m.id === t);
    if (p != null && p.parentId) {
      const m = l.nodes.find((y) => y.id === p.parentId);
      m && (r = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: n, id: t, pos: a }];
    if (n === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const y = this.inverseOf(m);
        y && g.unshift(...y), this.command(m, !1);
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((d) => d.id === t) ?? (this.model.proxyApis ?? []).find((d) => d.id === t);
    if (!o || i && !this.model.externalSystems.some((d) => d.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === a) return;
    const l = this._view, p = this.viewLayout(l), g = this.sceneFor(l), m = r ? g.nodes.find((d) => d.id === r) : void 0, y = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, f = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: l, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(l, { ...p, nodes: { ...p.nodes, [t]: y } }), this.pushUndoEntry(f);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((d) => d.id === t), a = this.model.externalSystems.find((d) => d.id === i);
    if (!o || !a || (this.model.proxyApis ?? []).some(
      (d) => d.targetApiId === t && d.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${ne(o.name)}-${ne(a.name)}`;
    if ((this.model.proxyApis ?? []).some((d) => d.id === l)) return;
    const p = this._view, g = this.viewLayout(p), y = this.sceneFor(p).nodes.find((d) => d.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${o.name}@${a.name}`,
        targetId: t,
        moduleId: i
      },
      !1
    );
    const f = [{ kind: "remove-proxy-api", id: l }];
    y && (f.push({ kind: "move-node", view: p, id: l, pos: g.nodes[l] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [l]: { x: s - y.x, y: n - y.y } }
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
    var r, l, p;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((l = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = n || o ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
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
    for (const { id: r, x: l, y: p } of t) {
      a.push({ kind: "move-node", view: i, id: r, pos: s.nodes[r] ?? null });
      let g = { x: l, y: p };
      const m = n.nodes.find((y) => y.id === r);
      if (m != null && m.parentId) {
        const y = n.nodes.find((f) => f.id === m.parentId);
        y && (g = { x: l - y.x, y: p - y.y });
      }
      o[r] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: r } of t) {
        const l = this.stepReorderCommand(r);
        if (l) {
          const p = this.inverseOf(l);
          p && a.unshift(...p), this.command(l, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...l.map((m) => ({ kind: "move-node", view: a, id: m.id, pos: r.nodes[m.id] ?? null }))
    ]);
    const p = { ...r.nodes, [t]: { x: i, y: s } };
    for (const m of l) p[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(a, {
      ...r,
      nodes: p,
      sizes: { ...r.sizes ?? {}, [t]: { w: n, h: o } }
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
    const i = ks(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
      (a, r) => (s.get(a.id) ?? 0) - (s.get(r.id) ?? 0)
    );
    if (n.every((a, r) => a.id === t.steps[r].id)) return null;
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
    var N, X, I, C;
    if (this._view === "context-map" && this._detail === "distribution") {
      const v = this.sceneFor("context-map"), x = this.model.codeModules ?? [], _ = ((P) => {
        var M;
        for (let L = P; L; ) {
          if (x.some((B) => B.id === L)) return L;
          L = (M = v.nodes.find((B) => B.id === L)) == null ? void 0 : M.parentId;
        }
        return null;
      })(t);
      if (_ && _ !== e) {
        if ((this.model.services ?? []).some((M) => M.id === e)) {
          this.command({ kind: "add-service-code-module", serviceId: e, id: _ });
          return;
        }
        if (!x.some((M) => M.id === e) && !this.model.modules.some((M) => M.id === e)) {
          this.command({ kind: "add-code-module-element", id: _, elementId: e });
          return;
        }
      }
    }
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(e), x = this.owningWorkflowOf(t);
      if (!v || v !== x || e === t) return;
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
      const v = this.model.pages ?? [], x = this.model.uiApps ?? [], $ = (H) => x.some((ie) => ie.id === H), _ = (H) => v.some((ie) => ie.id === H);
      if (n === "home" && $(e) && (_(t) || $(t))) {
        if (t === e) return;
        this.command(
          _(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && $(e) && _(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && _(e) && (_(t) || $(t)) && t !== e) {
        const H = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          _(t) ? { kind: H, pageId: e, targetId: t, toAppId: null } : { kind: H, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (n === "viewmodel" && _(e)) {
        (this.model.models ?? []).some((H) => H.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((n === "view" || n === "edit") && $(e) && _(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const P = (H) => /^wizrow:([^:]+):(.+)$/.exec(H), M = P(e) ?? P(t);
      if (M) {
        const H = P(e) ? t : e;
        _(H) && H !== M[1] && this.command({ kind: "set-wizard-step-page", pageId: M[1], itemId: M[2], targetId: H });
        return;
      }
      const L = v.find((H) => H.id === t && H.type === "WIZARD");
      if (_(e) && L && e !== L.id) {
        (L.wizardSteps ?? []).some((H) => H.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: L.id, targetId: e });
        return;
      }
      if (_(e) && $(t)) {
        const H = v.find((ke) => ke.id === e), ie = x.find((ke) => ke.id === t);
        if (ie.type === "MASTER_DETAIL" && !ie.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${H.name} es la cabecera de ${ie.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: H.name,
          pageId: e,
          itemId: this.newMenuItemId(H.name)
        });
        return;
      }
      const B = this.model.identityProviders ?? [], V = (H) => B.some((ie) => ie.id === H);
      if (V(e) || V(t)) {
        const H = V(e) ? e : t, ie = V(e) ? t : e;
        $(ie) ? this.command({ kind: "set-identity-provider", id: ie, targetId: H }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const le = (H) => (this.model.models ?? []).some((ie) => ie.id === H);
      if (le(e) || le(t)) {
        const H = le(e) ? e : t, ie = le(e) ? t : e;
        if (_(ie)) {
          this.command({ kind: "set-page-model", pageId: ie, modelId: H });
          return;
        }
        if ($(ie)) {
          this.command({ kind: "set-app-model", appId: ie, modelId: H });
          return;
        }
        return;
      }
      const ae = ge(e);
      if (ae != null && ae.itemId && ((N = ge(t)) != null && N.itemId || $(t))) {
        const H = ge(t), ie = this.menuEntryIn(ae.appId, ae.itemId);
        if (!ie) return;
        if (H != null && H.itemId) {
          const ke = this.menuEntryIn(H.appId, H.itemId);
          if (!ke) return;
          const _e = (mt) => (mt ?? []).some((ti) => ti.id === H.itemId || _e(ti.children));
          if (ae.appId === H.appId && (H.itemId === ae.itemId || _e(ie.entry.children)))
            return;
          const Pe = (X = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : X.renderRoot.querySelector(`g[data-node-id="${t}"]`), xe = Pe == null ? void 0 : Pe.getBoundingClientRect(), je = xe && s !== void 0 ? (s - xe.top) / Math.max(1, xe.height) : 0.5, ei = je < 0.3 ? "before" : je > 0.7 ? "after" : "nest";
          if (ei === "nest")
            this.command({
              kind: "move-menu-item",
              appId: ae.appId,
              toAppId: H.appId,
              itemId: ae.itemId,
              parentId: H.itemId
            });
          else {
            const mt = ei === "before" ? H.itemId : ke.beforeId ?? void 0;
            if (ae.appId === H.appId && ke.parentId === ie.parentId && mt === ae.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: ae.appId,
              toAppId: H.appId,
              itemId: ae.itemId,
              parentId: ke.parentId ?? void 0,
              beforeItemId: mt
            });
          }
          return;
        }
        if (ae.appId === t && !ie.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: ae.appId,
          toAppId: t,
          itemId: ae.itemId
        });
        return;
      }
      const G = ge(e) ?? ge(t);
      if (G) {
        const H = ge(e) ? e : t, ie = ge(e) ? t : e;
        if (((I = this.sceneFor("ui").nodes.find((xe) => xe.id === H)) == null ? void 0 : I.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const ke = this.model.modules.some(
          (xe) => (xe.useCases ?? []).some((je) => je.id === ie)
        ), _e = (this.model.aggregates ?? []).some((xe) => xe.id === ie), Pe = this.model.modules.flatMap((xe) => xe.queryServices ?? []).find((xe) => (xe.operations ?? []).some((je) => je.id === ie));
        _(ie) ? this.command({ kind: "set-menu-page", pageId: ie, ...G }) : $(ie) && ie !== G.appId ? this.command({ kind: "set-menu-app", toAppId: ie, ...G }) : ke ? this.command({ kind: "set-menu-use-case", useCaseId: ie, ...G }) : _e ? this.command({ kind: "set-menu-aggregate", aggregateId: ie, ...G }) : Pe && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Pe.id,
          queryOperationId: ie,
          ...G
        });
        return;
      }
      if ((this.model.actors ?? []).some((H) => H.id === e) && $(t)) {
        (this.model.actorAppUses ?? []).some((H) => H.actorId === e && H.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const Q = _(e) ? { pageId: e, other: t } : _(t) ? { pageId: t, other: e } : null;
      if (Q) {
        const H = new Set(
          this.model.modules.flatMap((_e) => (_e.useCases ?? []).map((Pe) => Pe.id))
        ), ie = new Set(
          this.model.modules.flatMap((_e) => (_e.queryServices ?? []).map((Pe) => Pe.id))
        ), ke = v.find((_e) => _e.id === Q.pageId);
        H.has(Q.other) ? (ke.buttons ?? []).some((_e) => _e.useCaseId === Q.other) || this.command({ kind: "add-page-button", pageId: Q.pageId, useCaseId: Q.other }) : ie.has(Q.other) && this.command({ kind: "set-page-listing", pageId: Q.pageId, queryServiceId: Q.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [];
      if (!v.some((L) => L.id === e) || !v.some((L) => L.id === t) || e === t || (this.model.modelMappings ?? []).some((L) => L.sourceModelId === e && L.targetModelId === t))
        return;
      const x = v.find((L) => L.id === e), $ = v.find((L) => L.id === t), _ = (L) => L.replace(/[^a-zA-Z0-9]/g, ""), P = new Set((this.model.modelMappings ?? []).map((L) => L.id));
      let M = `mapping-${ne(x.name)}-${ne($.name)}`;
      for (let L = 2; P.has(M); L++) M = `mapping-${ne(x.name)}-${ne($.name)}-${L}`;
      this.command({
        kind: "add-model-mapping",
        id: M,
        name: `${_(x.name)}2${_($.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, v, x] = o, $ = (this.model.proxyApis ?? []).find((B) => B.id === x), _ = ($ == null ? void 0 : $.targetApiId) ?? ((C = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === x && (this.model.apis ?? []).some(
          (V) => V.id === B.apiId && V.operations.some((le) => le.id === v)
        )
      )) == null ? void 0 : C.apiId);
      if (!_) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((V) => V.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: _,
          operationId: v,
          moduleId: x,
          targetUseCaseId: t
        });
        return;
      }
      if (!($ != null && $.targetApiId)) return;
      let M = null;
      if (t === $.targetApiId)
        M = $.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === $.targetApiId ? M = B[2] : this.model.modules.some((V) => V.id === t) && (this.model.apiImplementations ?? []).some(
          (V) => V.apiId === $.targetApiId && V.moduleId === t
        ) && (M = t);
      }
      if (!M) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === $.id && B.operationId === v && B.targetSiteId === M
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: $.id,
        operationId: v,
        targetSiteId: M
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (a.has(e)) {
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
      if (a.has(t) && t !== e) {
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
      const v = (this.model.mcpGateways ?? []).find((_) => _.id === e), x = this.model.externalSystems.some((_) => (_.mcpServers ?? []).some((P) => P.id === t)) || (this.model.apis ?? []).some((_) => _.id === t) || (this.model.apis ?? []).some((_) => _.operations.some((P) => P.id === t)) || this.model.modules.some((_) => (_.useCases ?? []).some((P) => P.id === t)) || (this.model.rags ?? []).some((_) => _.id === t), $ = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      x && !$ && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
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
      const v = (this.model.workflows ?? []).find((_) => _.id === e), x = (this.model.workflows ?? []).find(
        (_) => _.id === t && _.id !== e
      );
      if (x) {
        const _ = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
        x.triggerEvent !== _ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: _ });
        return;
      }
      const $ = this.model.modules.flatMap((_) => _.useCases ?? []).find((_) => _.id === t);
      if ($ && !(v.steps ?? []).some((P) => P.targetUseCaseId === t)) {
        const P = `wfs-${ne($.name)}`;
        let M = P;
        for (let L = 2; (v.steps ?? []).some((B) => B.id === M); L++)
          M = `${P}-${L}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: M,
          name: $.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap((_) => _.domainEvents ?? []).find((_) => _.id === e), x = this.model.modules.flatMap((_) => _.applicationEvents ?? []).find((_) => _.id === e), $ = v ?? x;
      if ($) {
        const _ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), P = new Set((this.model.aggregates ?? []).map((B) => B.id)), M = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((V) => V.id))
        ), L = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((V) => V.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: $.name,
          triggerAggregateId: _ && P.has(_.sourceId) ? _.sourceId : void 0,
          triggerDomainServiceId: _ && M.has(_.sourceId) ? _.sourceId : void 0,
          triggerUseCaseId: _ && L.has(_.sourceId) ? _.sourceId : void 0
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
          ($) => $.apiId === v.targetApiId && $.moduleId === t
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
    const l = new Set((this.model.actors ?? []).map((v) => v.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((x) => (x.domainEvents ?? []).map(($) => $.id)),
        ...this.model.modules.flatMap((x) => (x.applicationEvents ?? []).map(($) => $.id))
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
      ), x = new Set(
        this.model.modules.flatMap(($) => ($.queryServices ?? []).map((_) => _.id))
      );
      if (v.has(t) || x.has(t)) {
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
        this.model.modules.flatMap((x) => (x.useCases ?? []).map(($) => $.id))
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
        (_) => [..._.domainEvents ?? [], ..._.applicationEvents ?? []].some((P) => P.id === x)
      )) {
        v.eventId !== x && this.command({ kind: "set-notification-event", id: v.id, targetId: x });
        return;
      }
      if ((this.model.actors ?? []).some((_) => _.id === x)) {
        (v.recipientRoleIds ?? []).includes(x) || this.command({ kind: "add-notification-recipient", id: v.id, roleId: x });
        return;
      }
      this.emit("modux-notice", {
        message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
      });
      return;
    }
    const m = (v) => (this.model.documents ?? []).find((x) => x.id === v);
    if (m(e) || m(t)) {
      const v = m(e) ?? m(t), x = m(e) ? t : e;
      if ((this.model.models ?? []).find((M) => M.id === x)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: x });
        return;
      }
      const _ = this.model.modules.flatMap((M) => M.queryServices ?? []).find((M) => M.id === x), P = this.model.modules.flatMap((M) => (M.queryServices ?? []).flatMap((L) => (L.operations ?? []).map((B) => ({ op: B, qs: L })))).find(({ op: M }) => M.id === x);
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
    const y = this.model.identityProviders ?? [], f = (v) => y.find((x) => x.id === v);
    if (f(e) || f(t)) {
      const v = f(e) ?? f(t), x = f(e) ? t : e;
      if (f(e) && this.model.externalSystems.some((P) => P.id === x)) {
        v.publishedByExternalSystemId !== x && this.command({ kind: "set-idp-publisher", id: v.id, targetId: x });
        return;
      }
      const $ = this.model.modules.some((P) => P.id === x), _ = (this.model.etlFlows ?? []).some((P) => P.id === x);
      if ($ || _) {
        this.command({ kind: "set-identity-provider", id: x, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const d = this.model.etlFlows ?? [], u = (v) => d.find((x) => x.id === v);
    if (u(e) || u(t)) {
      const v = u(e) ?? u(t), x = u(e) ? t : e, $ = !u(e), _ = new Set(this.model.externalSystems.flatMap((Q) => (Q.tables ?? []).map((H) => H.id))), P = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((Q) => Q.id),
        ...(this.model.proxyApis ?? []).map((Q) => Q.id)
      ]), M = (this.model.apis ?? []).find((Q) => Q.operations.some((H) => H.id === x)), L = new Set(
        this.model.modules.flatMap((Q) => [
          ...(Q.domainEvents ?? []).map((H) => H.id),
          ...(Q.applicationEvents ?? []).map((H) => H.id)
        ])
      );
      let B = null, V = {};
      if (_.has(x) ? (B = $ ? "SOURCE_PULL" : "WRITE_DB", V = { externalTableId: x }) : M ? (B = $ ? "SOURCE_PULL" : "WRITE_API", V = { apiId: M.id, operationId: x }) : P.has(x) ? (B = $ ? "SOURCE_PULL" : "WRITE_API", V = { apiId: x }) : L.has(x) && (B = $ ? "SOURCE_CONSUMER" : "WRITE_EVENT", V = { targetId: x }), !B) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (Q) => Q.type === B && (Q.externalTableId ?? Q.operationId ?? Q.apiId ?? Q.eventId) === (V.externalTableId ?? V.operationId ?? V.apiId ?? V.targetId)
      )) return;
      const ae = new Set((v.steps ?? []).map((Q) => Q.id));
      let G = (v.steps ?? []).length + 1;
      for (; ae.has(`ets-${G}`); ) G++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${G}`, stepType: B, ...V });
      return;
    }
    const h = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), w = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (h || w) {
      const v = (h ?? w).name, x = h ? { externalUseCaseId: e } : { externalTableId: e }, $ = (M) => h ? M.sourceExternalUseCaseId === e : M.sourceExternalTableId === e, _ = this.model.modules.flatMap((M) => M.readModels ?? []).find((M) => M.id === t);
      if (_) {
        (this.model.projections ?? []).some(
          (L) => $(L) && L.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne(_.name)}`,
          name: `${_.name}Projection`,
          ...x,
          targetId: t
        });
        return;
      }
      const P = this.model.modules.find((M) => M.id === t);
      if (P) {
        (this.model.projections ?? []).some(
          (L) => $(L) && L.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne(P.name)}`,
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
      const v = this.model.modules.flatMap(($) => $.readModels ?? []).find(($) => $.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(A.name)}-${ne(v.name)}`,
          name: `${v.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const x = this.model.modules.find(($) => $.id === t);
      if (x) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.moduleId === t
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
    const O = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((x) => x.id))
    ), F = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((x) => x.id))
    ]), k = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((x) => x.id))
    ), S = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((x) => x.id))), b = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((x) => x.id))
    );
    if (S.has(e) && b.has(t)) {
      (this.model.queryCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const z = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((x) => x.id))
    );
    if (S.has(e) && z.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (S.has(e) && S.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const R = this.model.modules.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === e);
    if (R && S.has(t)) {
      R.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (S.has(e) && (this.model.aggregates ?? []).some((v) => v.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (x) => x.sourceId === e && x.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (F.has(e) && O.has(t) || S.has(e) && k.has(t)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === e && x.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (O.has(e) || k.has(e)) {
      const v = k.has(e), x = this.model.modules.flatMap((G) => (v ? G.applicationEvents : G.domainEvents) ?? []).find((G) => G.id === e), $ = this.model.modules.flatMap((G) => (G.useCases ?? []).map((Q) => ({ u: Q, module: G }))).find(({ u: G }) => G.id === t), _ = this.model.modules.flatMap((G) => (G.readModels ?? []).map((Q) => ({ rm: Q, module: G }))).find(({ rm: G }) => G.id === t), P = this.model.modules.find((G) => G.id === t) ?? (_ == null ? void 0 : _.module) ?? ($ == null ? void 0 : $.module);
      if (!x || !P) return;
      const M = new Set((this.model.aggregates ?? []).map((G) => G.id)), L = new Set(
        this.model.modules.flatMap((G) => (G.domainServices ?? []).map((Q) => Q.id))
      ), B = (this.model.emissions ?? []).find(
        (G) => G.domainEventId === e && (v ? S.has(G.sourceId) : M.has(G.sourceId) || L.has(G.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const V = !v && M.has(B.sourceId);
      if ($) {
        if (this.model.flows.some(
          (Q) => Q.archetype === "TRIGGERS" && Q.triggerEvent === x.name && Q.targetUseCaseId === $.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(x.name)}-${ne($.u.name)}`,
          name: $.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: V ? B.sourceId : "",
          triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
          triggerUseCaseId: v ? B.sourceId : void 0,
          triggerEvent: x.name,
          targetId: P.id,
          targetUseCaseId: $.u.id
        });
        return;
      }
      const le = (_ == null ? void 0 : _.rm.name) ?? `${x.name}View`;
      if (this.model.flows.some(
        (G) => G.archetype === "MATERIALIZES" && G.triggerEvent === x.name && G.targetId === P.id && G.readModelName === le
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ne(x.name)}-${ne(le)}`,
        name: le,
        archetype: "MATERIALIZES",
        triggerAggregateId: V ? B.sourceId : "",
        triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: x.name,
        targetId: P.id,
        readModelName: le
      });
      return;
    }
    const D = /* @__PURE__ */ new Set([
      ...F,
      ...S,
      ...b,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((x) => x.id))
    ]);
    if (D.has(e) || D.has(t) || O.has(t) || k.has(t))
      return;
    const q = new Set(this.model.externalSystems.map((v) => v.id));
    if (q.has(e)) {
      if (new Set(
        this.model.modules.flatMap((P) => (P.useCases ?? []).map((M) => M.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (M) => M.externalSystemId === e && M.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (q.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const x = (this.model.apis ?? []).find(
        (P) => P.operations.some((M) => M.id === t)
      ), $ = /^apiop:(.+)@(.+)$/.exec(t), _ = x ? { operationId: t, siteId: x.id } : $ ? { operationId: $[1], siteId: $[2] } : null;
      if (_) {
        (this.model.externalOperationUses ?? []).some(
          (M) => M.externalSystemId === e && M.operationId === _.operationId && M.siteId === _.siteId
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
          (M) => M.sourceId === e && M.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    q.has(t) || l.has(t);
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
    var s, n, o;
    if (this._view === "ui") {
      if (e === "edge") {
        let a;
        if (a = /^idpauth:(.+)$/.exec(t))
          this.command({ kind: "set-identity-provider", id: a[1], targetId: null });
        else if (a = /^appheader:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-header-page", appId: a[1], pageId: null });
        else if (a = /^apphome:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-home-page", appId: a[1], pageId: null });
        else if (a = /^appmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-model", appId: a[1], modelId: null });
        else if (a = /^appview:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-view-page", appId: a[1], pageId: null });
        else if (a = /^appedit:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-edit-page", appId: a[1], pageId: null });
        else if (a = /^cruddetail:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-detail", pageId: a[1], targetId: null, toAppId: null });
        else if (a = /^crudnew:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-create", pageId: a[1], targetId: null, toAppId: null });
        else if (a = /^wizstep:([^:]+):(.+)$/.exec(t))
          this.command({ kind: "set-wizard-step-page", pageId: a[1], itemId: a[2], targetId: null });
        else if (a = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: a[1], useCaseId: a[2] });
        else if (a = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: a[1], queryServiceId: null });
        else if (a = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: a[1], modelId: null });
        else if (a = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: a[1], appId: a[2] });
        else if (a = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const r = ge(a[1]);
          r && this.command({ kind: "set-menu-page", pageId: null, ...r });
        } else if (a = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const r = ge(a[1]);
          r && this.command({ kind: "set-menu-app", toAppId: null, ...r });
        } else if (a = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const r = ge(a[1]);
          r && this.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
        } else if (a = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const r = ge(a[1]);
          r && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
        } else if (a = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const r = ge(a[1]);
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
        const a = ge(t);
        a && this.command({ kind: "remove-menu-item", ...a });
        return;
      }
      if (i === "wizard-step-row") {
        const a = /^wizrow:([^:]+):(.+)$/.exec(t);
        a && this.command({ kind: "remove-page-wizard-step", pageId: a[1], targetId: a[2] });
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
      const a = /^mapping:(.+)$/.exec(t);
      a && (this._selectedId = null, this.command({ kind: "remove-model-mapping", id: a[1] }));
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const a = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!a) return;
      const r = this.owningWorkflowOf(a[2]);
      if (!r) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: r.id,
        id: a[2],
        dependsOnStepId: a[1]
      });
      return;
    }
    if (e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
      return;
    }
    if (e === "node" && i === "workflow-step") {
      const a = this.owningWorkflowOf(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: a.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "api-impl-wire") {
      const a = /^apiimplwire:(.+)@(.+)$/.exec(t);
      if (!a) return;
      const [, r, l] = a, p = (s = (this.model.apis ?? []).find(
        (g) => g.operations.some((m) => m.id === r)
      )) == null ? void 0 : s.id;
      if (!p) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, moduleId: l });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-op-use") {
      const a = /^extopuse:(.+)->(.+)@(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({
        kind: "remove-external-operation-use",
        sourceId: a[1],
        operationId: a[2],
        targetSiteId: a[3]
      });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const a = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!a) return;
      const [, r, l, p] = a, g = /^apiimpl:.+@(.+)$/.exec(p), m = g ? g[1] : p;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: r, targetSiteId: m });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const a = /^rel:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const a = /^emit:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "projection") {
      const a = /^proj:(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: a[1] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "uc-call") {
      const a = /^uccall:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-trigger") {
      const a = /^notif:(.+)$/.exec(t);
      a && (this._selectedId = null, this.command({ kind: "set-notification-event", id: a[1], targetId: null }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-recipient") {
      const a = /^notifto:([^:]+):(.+)$/.exec(t);
      a && (this._selectedId = null, this.command({ kind: "remove-notification-recipient", id: a[1], roleId: a[2] }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "document-query") {
      const a = /^docq:(.+)$/.exec(t);
      a && (this._selectedId = null, this.command({ kind: "set-document-query", id: a[1], queryServiceId: null, queryOperationId: null }));
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
      const a = /^idp(?:trust|svc):(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "set-identity-provider", id: a[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "idp-federation") {
      const a = /^idpfed:(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "set-idp-publisher", id: a[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "identity-provider") {
      this._selectedId = null, this.command({ kind: "remove-identity-provider", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const a = /^etl:([^:]+):(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: a[1], id: a[2] });
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
      const a = /^deploy:(.+)->(.+)$/.exec(t);
      a && (this._selectedId = null, this.command({ kind: "remove-service-code-module", serviceId: a[1], id: a[2] }));
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "code-module") {
      this._selectedId = null, this.command({ kind: "remove-code-module", id: t });
      return;
    }
    if (this._view === "context-map" && this._detail === "distribution" && e === "node") {
      const a = this.sceneFor("context-map");
      for (let r = (n = a.nodes.find((l) => l.id === t)) == null ? void 0 : n.parentId; r; ) {
        if ((this.model.codeModules ?? []).some((l) => l.id === r)) {
          this._selectedId = null, this.command({ kind: "remove-code-module-element", id: r, elementId: t });
          return;
        }
        r = (o = a.nodes.find((l) => l.id === r)) == null ? void 0 : o.parentId;
      }
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "st-fire") {
      const a = /^stfire:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "set-scheduled-trigger-target", id: a[1], targetUseCaseId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "scheduled-trigger") {
      this._selectedId = null, this.command({ kind: "remove-scheduled-trigger", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agg-call") {
      const a = /^aggcall:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate-call", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "qs-call") {
      const a = /^qscall:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "external-call") {
      const a = /^extcall:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-uc-call") {
      const a = /^extuccall:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-use") {
      const a = /^mcp:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-external-use") {
      const a = /^mcpx:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-mcp") {
      const a = /^mcpsv:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-mcp", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "gateway-exposure") {
      const a = /^gwx:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-gateway-exposure", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-gateway") {
      const a = /^aggw:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-gateway", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api-op") {
      const a = /^agapi:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api-operation", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-query") {
      const a = /^agqs:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-query", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-delegate") {
      const a = /^agag:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-delegate", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-agent") {
      const a = /^useag:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-actor-agent", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-trigger") {
      const a = /^evag:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-trigger", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (e === "node" && i === "mcp-gateway") {
      this._selectedId = null, this.command({ kind: "remove-mcp-gateway", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-rag") {
      const a = /^agrag:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "rag-source") {
      const a = /^ragsrc:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api" || i === "rag-coarse")) {
      const a = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: a[2], targetId: a[1] });
      return;
    }
    if (e === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: t });
      return;
    }
    if (e === "node" && i === "rag-content-source") {
      const a = /^ragcs:(.+?):(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-rag-content-source", sourceId: a[1], uri: a[2] });
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
      const a = /^apiwire:(.+)$/.exec(t), r = a ? this.owningApiOf(a[1]) : null;
      if (!a || !r) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: r.id, id: a[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
      return;
    }
    if (e === "node" && i === "api-impl") {
      const a = /^apiimpl:(.+)@(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-api-implementation", apiId: a[1], moduleId: a[2] });
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
      const a = this.owningApiOf(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation", apiId: a.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-use") {
      const a = /^use:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-ext") {
      const a = /^extdep:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-actor-external", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-dep") {
      const a = /^xdep:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-external-dependency", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "wf-chain") {
      const a = /^wfchain:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "set-workflow-trigger", id: a[2], triggerEvent: "" });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api") {
      const a = /^agapi:(.+)->(.+)$/.exec(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api", sourceId: a[1], targetId: a[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const a = /^pxt:(.+)->(.+)$/.exec(t);
      if (!a || !(this.model.proxyApis ?? []).some((r) => r.id === a[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: a[1], targetId: "" });
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
      const a = this.owningProcessOf(t);
      if (!a) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: a.id, id: t });
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
          @change=${(r) => this.toggleViewMember(n, r.target.checked)}
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
    const e = (this.model.views ?? []).find((f) => f.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((f) => t.has(f.id)), s = new Set(i.map((f) => f.id)), n = this.model.externalSystems.filter((f) => t.has(f.id)), o = new Set(n.map((f) => f.id)), a = (this.model.aggregates ?? []).filter(
      (f) => t.has(f.id) || s.has(f.moduleId)
    ), r = new Set(a.map((f) => f.id)), l = (this.model.uiApps ?? []).filter((f) => t.has(f.id)), p = /* @__PURE__ */ new Set(), g = (f) => {
      for (const d of f ?? [])
        d.pageId && p.add(d.pageId), g(d.children);
    };
    l.forEach((f) => g(f.menuItems));
    const m = (this.model.pages ?? []).filter(
      (f) => t.has(f.id) || p.has(f.id)
    ), y = new Set(l.map((f) => f.id));
    return {
      ...this.model,
      uiApps: l,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((f) => y.has(f.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (f) => s.has(f.sourceId) && s.has(f.targetId)
      ),
      flows: this.model.flows.filter(
        (f) => t.has(f.id) || (s.has(f.sourceId) || o.has(f.sourceId)) && (s.has(f.targetId) || o.has(f.targetId))
      ),
      aggregates: a,
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
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? o.has(f.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (f) => t.has(f.id) || (f.publishedByExternalSystemId ? o.has(f.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? Cc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : pn(e.detail.id, e.detail.kind);
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
      var l;
      const r = o ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { node: r[p], parentId: a, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), n(r[p].children, r[p].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, o) {
    const a = o ?? this.allComponentIds(), r = (m) => {
      if (!n) return m.id;
      const y = `cmp-${ne(m.kind)}`;
      let f = y;
      for (let d = 2; a.has(f) || a.has(`${f}-tab-1`); d++) f = `${y}-${d}`;
      return a.add(f), f;
    }, l = [], p = (m, y) => {
      const f = r(m);
      l.push({ kind: "add-page-component", pageId: e, componentId: f, componentKind: m.kind, parentComponentId: y }), m.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${f}-tab-2` })), l.push({
        kind: "set-page-component",
        pageId: e,
        componentId: f,
        title: m.title ?? null,
        text: m.text ?? null,
        label: m.label ?? null,
        useCaseId: m.useCaseId ?? null,
        mappingId: m.mappingId ?? null,
        modelId: m.modelId ?? null,
        queryServiceId: m.queryServiceId ?? null,
        queryOperationId: m.queryOperationId ?? null,
        fieldId: m.fieldId ?? null,
        stereotype: m.stereotype ?? null,
        colspan: m.colspan ?? null
      });
      for (const d of m.children ?? []) p(d, f);
      return f;
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
      var l;
      const r = o ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (s = { entry: r[p], parentId: a, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), n(r[p].children, r[p].id ?? null);
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
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, re.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, s = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (r.node.children ?? [])[0]) == null ? void 0 : a.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: n, rootId: o } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const r of n) this.command(r, !1);
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
    var r;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
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
      (s.pages ?? []).map((o) => o.id),
      (s.codeModules ?? []).map((o) => o.id),
      (s.services ?? []).map((o) => o.id)
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
    for (let r = t; r; )
      s.push(r), r = (o = i.nodes.find((l) => l.id === r)) == null ? void 0 : o.parentId;
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
      return ((a = (this.model.aggregates ?? []).find((p) => p.moduleId === l)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((r) => this.model.externalSystems.some((l) => l.id === r)) ?? null;
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
    var f, d, u, h, w, A, O, F;
    const n = j.PALETTE_NEW.find((k) => k.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const k = e.slice(4), S = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, b = S ? S[1] : i && (this.model.pages ?? []).some((N) => N.id === i) ? i : null;
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let z = S ? S[2] : void 0, R = null;
      if (k === "tab") {
        let N = null, X = z ? this.componentIn(b, z) : null;
        for (; X; ) {
          if (X.node.kind === "tabLayout") {
            N = X.node.id;
            break;
          }
          X = X.parentId ? this.componentIn(b, X.parentId) : null;
        }
        if (!N) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const I = this.componentIn(b, N).node, C = this.newComponentId("tab"), v = `Pestaña ${(I.children ?? []).filter((x) => x.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: b, componentId: C, componentKind: "tab", parentComponentId: N }, !1), this.command({ kind: "set-page-component", pageId: b, componentId: C, title: v }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: b, componentId: C }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const N = this.componentIn(b, s.componentId);
        N && N.node.kind === "tab" ? z = N.node.id : N && (z = N.parentId ?? void 0, R = s.pos === "before" ? s.componentId : N.beforeId);
      } else if (z) {
        const N = ((f = this.componentIn(b, z)) == null ? void 0 : f.node) ?? null;
        (N == null ? void 0 : N.kind) === "tabLayout" && (N.children ?? [])[0] && (z = (N.children ?? [])[0].id);
      }
      const D = this.newComponentId(k), q = {
        kind: "add-page-component",
        pageId: b,
        componentId: D,
        componentKind: k,
        parentComponentId: z
      };
      if (!R) {
        this.command(q);
        return;
      }
      this.command(q, !1), this.command(
        { kind: "move-page-component", pageId: b, componentId: D, parentComponentId: z ?? null, beforeComponentId: R },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: b, componentId: D }]);
      return;
    }
    const o = this._view, a = this.sceneFor(o), r = (k, S) => {
      const b = this.viewLayout(o), z = S ? a.nodes.find((D) => D.id === S) : void 0, R = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...b, nodes: { ...b.nodes, [k]: R } }), { kind: "move-node", view: o, id: k, pos: null };
    }, l = (k, S, b) => {
      const z = this.inverseOf(k) ?? [];
      this.command(k, !1);
      const R = r(S, b);
      this.pushUndoEntry([...z, R]);
    };
    if (!n.child) {
      const k = {
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
      }, { id: S, name: b } = this.uniquePaletteName(n.label, k[e] ?? ""), z = e === "module" ? { kind: "add-module", id: S, name: b, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: S, name: b } : e === "external-system" ? { kind: "add-external-system", id: S, name: b } : e === "ai-agent" ? { kind: "add-ai-agent", id: S, name: b } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: S, name: b, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: S, name: b } : e === "rag" ? { kind: "add-rag", id: S, name: b } : e === "api" ? { kind: "add-api", id: S, name: b } : e === "proxy-api" ? { kind: "add-proxy-api", id: S, name: b } : e === "ui-app" ? { kind: "create-ui-app", id: S, name: b } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: S, name: b, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: S, name: b, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: S, name: b, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: S, name: b } : e === "identity-provider" ? { kind: "add-identity-provider", id: S, name: b } : {
        kind: "add-workflow",
        id: S,
        name: b,
        completionEventName: `${b.replace(/\s+/g, "")}Completado`
      };
      if (z.kind === "create-ui-app") {
        const R = [];
        for (let q = i ?? void 0; q; )
          R.push(q), q = (d = a.nodes.find((N) => N.id === q)) == null ? void 0 : d.parentId;
        const D = R.find((q) => this.model.modules.some((N) => N.id === q));
        if (D) {
          l({ ...z, moduleId: D }, S, D);
          return;
        }
      }
      l(z, S);
      return;
    }
    if (e === "ui-wizard-step") {
      const k = [];
      for (let D = i ?? void 0; D; )
        k.push(D), D = (u = a.nodes.find((q) => q.id === D)) == null ? void 0 : u.parentId;
      const S = k.map((D) => {
        var q;
        return ((q = /^wizrow:([^:]+):/.exec(D)) == null ? void 0 : q[1]) ?? D;
      }).find((D) => (this.model.pages ?? []).some((q) => q.id === D && q.type === "WIZARD"));
      if (!S) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const b = ((h = (this.model.pages ?? []).find((D) => D.id === S)) == null ? void 0 : h.wizardSteps) ?? [], z = new Set(b.map((D) => D.id ?? D.pageId));
      let R = b.length + 1;
      for (; z.has(`wzs-${R}`); ) R++;
      this.command({ kind: "add-page-wizard-step", pageId: S, itemId: `wzs-${R}`, label: `Paso ${R}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const k = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", S = k === "CRUD" ? "CRUD" : k === "WIZARD" ? "Wizard" : "Página", { id: b, name: z } = this.uniquePaletteName(S, "page-"), R = [];
      for (let N = i ?? void 0; N; )
        R.push(N), N = (w = a.nodes.find((X) => X.id === N)) == null ? void 0 : w.parentId;
      const D = R.find((N) => (this.model.uiApps ?? []).some((X) => X.id === N)), q = R.map((N) => {
        var X;
        return ((X = /^wizrow:([^:]+):/.exec(N)) == null ? void 0 : X[1]) ?? N;
      }).find((N) => (this.model.pages ?? []).some((X) => X.id === N && X.type === "WIZARD"));
      if (q) {
        const N = a.nodes.find((I) => I.id === q);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40), this.command({ kind: "create-ui-page", id: b, name: z, pageType: k }, !1), this.command({ kind: "add-page-wizard-step", pageId: q, targetId: b }, !1);
        const X = r(b);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: b }, X]), this.emit("modux-notice", { message: `${z} creada como paso del wizard` });
        return;
      }
      if (D) {
        const N = a.nodes.find((X) => X.id === D);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40);
      }
      l(
        D ? { kind: "create-ui-page", id: b, name: z, pageType: k, appId: D, menuLabel: z } : { kind: "create-ui-page", id: b, name: z, pageType: k },
        b
      );
      return;
    }
    if (e === "menu-item") {
      const k = [];
      for (let q = i ?? void 0; q; )
        k.push(q), q = (A = a.nodes.find((N) => N.id === q)) == null ? void 0 : A.parentId;
      const S = k.find((q) => (this.model.uiApps ?? []).some((N) => N.id === q));
      if (!S) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const b = /* @__PURE__ */ new Set(), z = (q) => {
        for (const N of q ?? [])
          b.add(N.label), z(N.children);
      };
      (this.model.uiApps ?? []).forEach((q) => z(q.menuItems));
      let R = "Entrada";
      for (let q = 2; b.has(R); q++) R = `Entrada ${q}`;
      const D = k.map((q) => ge(q)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: S,
        label: R,
        itemId: this.newMenuItemId(R),
        parentId: D == null ? void 0 : D.itemId,
        parentLabel: D != null && D.itemId || D == null ? void 0 : D.label
      });
      return;
    }
    if (e === "etl-transform") {
      const k = [];
      for (let R = i ?? void 0; R; )
        k.push(R), R = (O = a.nodes.find((D) => D.id === R)) == null ? void 0 : O.parentId;
      const S = k.map((R) => (this.model.etlFlows ?? []).find((D) => D.id === R)).find(Boolean);
      if (!S) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const b = new Set((S.steps ?? []).map((R) => R.id));
      let z = (S.steps ?? []).length + 1;
      for (; b.has(`ets-${z}`); ) z++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: S.id,
        id: `ets-${z}`,
        name: `Transformación ${z}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const k = this.model.workflows ?? [], S = [];
      for (let N = i ?? void 0; N; )
        S.push(N), N = (F = a.nodes.find((X) => X.id === N)) == null ? void 0 : F.parentId;
      const b = S.map((N) => k.find((X) => X.id === N)).find(Boolean), z = S.map((N) => {
        const X = k.find((I) => (I.steps ?? []).some((C) => C.id === N));
        return X ? { owner: X, stepId: N } : null;
      }).find(Boolean), R = b ?? (z == null ? void 0 : z.owner);
      if (!R) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: D, name: q } = this.uniquePaletteName("Paso", "wfs-");
      z && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: R.id,
          id: D,
          name: q,
          ...z ? { dependsOnStepIds: [z.stepId], afterStepId: z.stepId } : {}
        },
        D
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${R.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const k = this.dropContainerFor("api", i);
      if (!k) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: S, name: b } = this.uniquePaletteName("API", "api-"), z = { kind: "add-api", id: S, name: b }, R = this.inverseOf(z) ?? [];
      this.command(z, !1), this.model.externalSystems.some((X) => X.id === k) ? this.command({ kind: "set-api-publisher", id: S, targetId: k }, !1) : this.command({ kind: "add-api-implementation", apiId: S, moduleId: k }, !1);
      const D = this.viewLayout(this._view), q = this.sceneFor(this._view).nodes.find((X) => X.id === k), N = q ? { x: Math.round(t.x - q.x), y: Math.round(t.y - q.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...D, nodes: { ...D.nodes, [S]: N } }), this.pushUndoEntry([...R, { kind: "move-node", view: this._view, id: S, pos: null }]);
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
      "code-module": "cm-"
    }, { id: m, name: y } = this.uniquePaletteName(n.label, g[e] ?? "");
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: m, name: y, moduleId: p }, m, p);
    else if (e === "code-module")
      l({ kind: "add-code-module", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: m, name: y, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        m,
        p
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: m, name: y, moduleId: p }, m, p);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: m, name: y, moduleId: p }, m, p);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: m, name: y, moduleId: p }, m, p);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: m, name: y, moduleId: p }, m, p);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const k = (this.model.aggregates ?? []).find((S) => S.id === p);
      l({ kind: "add-read-model", id: m, name: y, aggregateId: p }, m, (k == null ? void 0 : k.moduleId) ?? p);
    } else if (e === "api-operation") {
      const k = (this.model.apis ?? []).find((D) => D.id === p), S = new Set(((k == null ? void 0 : k.operations) ?? []).map((D) => D.id));
      let b = y, z = `apiop-${p.replace(/^api-/, "")}-${ne(b)}`;
      for (let D = 2; S.has(z); D++)
        b = `${n.label} ${D}`, z = `apiop-${p.replace(/^api-/, "")}-${ne(b)}`;
      l({ kind: "add-api-operation", apiId: p, id: z, name: b }, z, p), a.nodes.some(
        (D) => D.parentId === p && (D.kind === "api-operation" || D.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(k == null ? void 0 : k.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const k = this.model.modules.flatMap((R) => R.useCases ?? []).find((R) => R.id === p), S = new Set((k == null ? void 0 : k.stepIds) ?? []);
      let b = y, z = `step-${ne(b)}`;
      for (let R = 2; S.has(z); R++)
        b = `${n.label} ${R}`, z = `step-${ne(b)}`;
      l({ kind: "add-use-case-step", useCaseId: p, id: z, name: b }, z, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(k == null ? void 0 : k.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: m, name: y, moduleId: p }, m, p) : e === "external-table" ? l({ kind: "add-external-table", id: m, name: y, moduleId: p }, m, p) : e === "mcp-server" && l({ kind: "add-mcp-server", id: m, name: y, moduleId: p }, m, p);
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
      const f = (this.model.modelMappings ?? []).find((u) => u.id === e);
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
      const d = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (d) {
        if (e === s[2]) return;
        const u = (this.model.pages ?? []).find((w) => w.id === s[1]), h = ((u == null ? void 0 : u.buttons) ?? []).find((w) => w.useCaseId === s[2]);
        if (!h) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((w) => w.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] }, !1), this.command(
          { kind: "add-page-button", pageId: s[1], useCaseId: e, label: h.label, type: h.bar },
          !1
        ), h.mappingId && this.command(
          { kind: "set-page-button", pageId: s[1], useCaseId: e, label: null, mappingId: h.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: s[1], useCaseId: e },
          { kind: "add-page-button", pageId: s[1], useCaseId: s[2], label: h.label, type: h.bar },
          ...h.mappingId ? [{ kind: "set-page-button", pageId: s[1], useCaseId: s[2], label: null, mappingId: h.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${d.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const n = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const f = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!f) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const d = (this.model.pages ?? []).find((u) => u.id === n[1]);
      if (((d == null ? void 0 : d.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: n[1], useCaseId: e, type: n[2] }), this.emit("modux-notice", { message: `Botón de ${f.name} en la barra ${n[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const o = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, a = o ? o[1] : t && (this.model.pages ?? []).some((f) => f.id === t) ? t : null;
    if (!a) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = o ? ((y = this.componentIn(a, o[2])) == null ? void 0 : y.node) ?? null : null, l = this.model.modules.flatMap((f) => f.useCases ?? []).find((f) => f.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, useCaseId: e, label: r.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((f) => f.id === e);
    if (p) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((f) => f.id === e);
    if (g && (r == null ? void 0 : r.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: r.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const m = this.model.modules.flatMap((f) => (f.queryServices ?? []).flatMap((d) => (d.operations ?? []).map((u) => ({ op: u, qs: d })))).find(({ op: f }) => f.id === e);
    if (m) {
      (r == null ? void 0 : r.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: r.id,
        queryOperationId: m.op.id,
        queryServiceId: m.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: m.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${m.op.name}` });
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
    const a = this._view, r = this.sceneFor(a), l = r.nodes.find((y) => y.id === e);
    if (!l) {
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
    const p = this.viewLayout(a), g = l.parentId ? r.nodes.find((y) => y.id === l.parentId) : void 0, m = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(a, { ...p, nodes: { ...p.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = j.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
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
                ${j.PALETTE_GROUPS.map((s) => {
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
                                ${vt[o.symbol]}
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
                            ${vt[s.symbol]}
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
    var t, i, s, n, o, a, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${ne(e)}`, name: e, moduleId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), g = this._newTriggerEvent.trim();
        if (!l || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newModuleId || ((o = this.model.modules[0]) == null ? void 0 : o.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${ne(e)}`,
          name: e,
          moduleId: l,
          triggerAggregateId: this._newTriggerAggId || ((r = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? To(i, t.nodes) : e === "flows" ? Fo(i, t.nodes) : e === "processes" ? ks(i, t.nodes) : e === "workflows" ? Zl(i, t.nodes) : e === "ui" ? nc(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? rc(i, t.nodes) : e === "eventstorming" ? Hl(i, t.nodes) : $o(
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
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), s = new Set(i.map((p) => p.id)), n = {
      nodes: i,
      edges: t.edges.filter((p) => s.has(p.sourceId) && s.has(p.targetId))
    }, a = await dc(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: r.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
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
      ${this._view === "design" ? E`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? E`<modux-explorer
            .model=${this.model}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = pn(t.detail.id, i);
      s && this.emit("modux-activate", s);
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
        ${Ec.map(
      (s) => E`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${ns[s].abbr}</span>
              <span class="name">${ns[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
j.styles = pt`
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
j.PALETTE_GROUPS = [
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
j.PALETTE_NEW = [
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
te([
  oe({ attribute: !1 })
], j.prototype, "model", 2);
te([
  oe({ attribute: !1 })
], j.prototype, "layout", 2);
te([
  oe({ attribute: !1 })
], j.prototype, "diff", 2);
te([
  U()
], j.prototype, "_view", 2);
te([
  U()
], j.prototype, "_detail", 2);
te([
  U()
], j.prototype, "_relationType", 2);
te([
  U()
], j.prototype, "_relationPicker", 2);
te([
  U()
], j.prototype, "_extDepPicker", 2);
te([
  U()
], j.prototype, "_selectedId", 2);
te([
  U()
], j.prototype, "_paletteOpen", 2);
te([
  U()
], j.prototype, "_paletteFilter", 2);
te([
  U()
], j.prototype, "_paletteTab", 2);
te([
  U()
], j.prototype, "_selectedCmp", 2);
te([
  U()
], j.prototype, "_fullscreen", 2);
te([
  U()
], j.prototype, "_tilt", 2);
te([
  U()
], j.prototype, "_helpOpen", 2);
te([
  U()
], j.prototype, "_newName", 2);
te([
  U()
], j.prototype, "_newModuleId", 2);
te([
  U()
], j.prototype, "_newArchetype", 2);
te([
  U()
], j.prototype, "_newTriggerAggId", 2);
te([
  U()
], j.prototype, "_newTriggerEvent", 2);
te([
  U()
], j.prototype, "_newTargetId", 2);
te([
  U()
], j.prototype, "_undoStack", 2);
te([
  U()
], j.prototype, "_redoStack", 2);
te([
  U()
], j.prototype, "_newStepName", 2);
te([
  U()
], j.prototype, "_newStepType", 2);
te([
  U()
], j.prototype, "_newStepRole", 2);
te([
  U()
], j.prototype, "_newStepDeadline", 2);
te([
  U()
], j.prototype, "_editStepRole", 2);
te([
  U()
], j.prototype, "_editStepDeadline", 2);
te([
  U()
], j.prototype, "_editStepComp", 2);
te([
  U()
], j.prototype, "_newStepUseCase", 2);
te([
  U()
], j.prototype, "_newStepEmits", 2);
te([
  U()
], j.prototype, "_editStepUseCase", 2);
te([
  U()
], j.prototype, "_editStepEmits", 2);
te([
  U()
], j.prototype, "_editStepAwaits", 2);
te([
  U()
], j.prototype, "_multi", 2);
te([
  U()
], j.prototype, "_newViewName", 2);
te([
  U()
], j.prototype, "_activeViewId", 2);
te([
  U()
], j.prototype, "_newRagSourceType", 2);
te([
  U()
], j.prototype, "_newRagSourceUri", 2);
te([
  U()
], j.prototype, "_addMemberKey", 2);
te([
  U()
], j.prototype, "_treeOpen", 2);
te([
  U()
], j.prototype, "_deletePicker", 2);
j = te([
  ut("modux-editor")
], j);
var Ac = Object.defineProperty, Mc = Object.getOwnPropertyDescriptor, Me = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Mc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ac(t, i, n), n;
};
let ve = class extends De {
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
    ], t = (s) => ve.TYPE_LABELS[s] ?? s;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: o, cls: a }) => {
      const r = this._diff.changes.filter((l) => l.kind === s);
      return r.length ? E`
            <div class="diff-group">${n} (${r.length})</div>
            ${r.map(
        (l) => E`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${o}</span>
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
    var n, o, a;
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
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const r = ((a = this._workspace.solutions.find((l) => l.branch === s)) == null ? void 0 : a.name) ?? s.replace(/^solution\//, "");
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
            const m = await a.json();
            m != null && m.message && (g = m.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: r } = await a.json(), l = n ? { kind: "set-api-publisher", id: r, targetId: n } : o ? { kind: "add-api-implementation", apiId: r, moduleId: o } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
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
ve.styles = pt`
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
ve.TYPE_LABELS = {
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
Me([
  oe()
], ve.prototype, "base", 2);
Me([
  U()
], ve.prototype, "_model", 2);
Me([
  U()
], ve.prototype, "_layout", 2);
Me([
  U()
], ve.prototype, "_error", 2);
Me([
  U()
], ve.prototype, "_saving", 2);
Me([
  U()
], ve.prototype, "_toast", 2);
Me([
  U()
], ve.prototype, "_workspace", 2);
Me([
  U()
], ve.prototype, "_creatingSolution", 2);
Me([
  U()
], ve.prototype, "_newSolutionName", 2);
Me([
  U()
], ve.prototype, "_diff", 2);
Me([
  U()
], ve.prototype, "_diffListOpen", 2);
Me([
  U()
], ve.prototype, "_mergeFlow", 2);
ve = Me([
  ut("modux-editor-connected")
], ve);
export {
  Pc as CONTAINER_HEADER,
  Tc as CONTAINER_INSET,
  me as ModuxCanvas,
  j as ModuxEditor,
  ve as ModuxEditorConnected,
  To as aggregatesScene,
  nt as apiImplNodeId,
  st as apiOpOccurrenceId,
  Ii as containerFit,
  fo as containerMinSize,
  $o as contextMapScene,
  bo as flowCoherence,
  Fo as flowsScene,
  ni as normalizeViewLayout,
  ks as processesScene,
  wo as relationEdgeId,
  Ai as resolveOverlaps
};
