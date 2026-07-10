const bc = 34, _c = 10;
function Qi(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let d = a + 1; d < e.length; d++) {
        const c = e[a], p = e[d], g = i.get(c.id), m = i.get(p.id), y = m.x - g.x, h = m.y - g.y, r = (c.w + p.w) / 2 + t - Math.abs(y), u = (c.h + p.h) / 2 + t - Math.abs(h);
        if (!(r <= 0 || u <= 0))
          if (o = !0, r < u) {
            const f = (y >= 0 ? 1 : -1) * r / 2;
            g.x -= f, m.x += f;
          } else {
            const f = (h >= 0 ? 1 : -1) * u / 2;
            g.y -= f, m.y += f;
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
function oo(e, t = { w: 160, h: 90 }) {
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
function zi(e, t, i) {
  let s = t.w / 2, n = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const d of i)
    s = Math.max(s, -d.dx + d.w / 2 + 10), n = Math.max(n, d.dx + d.w / 2 + 10), o = Math.max(o, -d.dy + d.h / 2 + 34), a = Math.max(a, d.dy + d.h / 2 + 10);
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
const ao = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ro = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, lo = {
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
const un = { compact: 0, coarse: 1, full: 2 };
function mn(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: un[e ? t : s] > un[n] };
}
function ss(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: it(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const os = 34, as = 14, co = 14, Pe = 108, Oe = 32, rs = 12, ds = 10, Lt = 2, po = Lt * Pe + (Lt - 1) * rs + 2 * as;
function uo(e, t) {
  return `rel:${e}->${t}`;
}
function mo(e, t) {
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
const ho = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, ls = {
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
}, Ui = {
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
function qi(e) {
  const t = Math.max(1, Math.ceil(e / Lt)), i = t * Oe + (t - 1) * ds;
  return { w: po, h: os + i + co };
}
function ai(e, t) {
  const i = e % Lt, s = Math.floor(e / Lt);
  return {
    x: -t.w / 2 + as + i * (Pe + rs) + Pe / 2,
    y: -t.h / 2 + os + s * (Oe + ds) + Oe / 2
  };
}
function fo(e, t, i, s, n, o, a = !1) {
  const d = (e.aggregates ?? []).filter((p) => p.moduleId === t.id), c = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...ss(e, t.id),
    ...d.map((p) => ({ id: p.id, name: p.name, kind: "aggregate" })),
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
    const p = new Map((e.apis ?? []).map((m) => [m.id, m])), g = (e.apiImplementations ?? []).filter((m) => m.moduleId === t.id && p.has(m.apiId)).map((m) => {
      const y = p.get(m.apiId);
      return {
        id: it(m.apiId, m.moduleId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((h) => ({
          id: tt(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (g.length > 0) {
      const m = c.filter((y) => y.kind !== "api-impl");
      return cs(i, s, g, m, n, o);
    }
  }
  return Pt(i, s, c, n, o);
}
function cs(e, t, i, s, n, o, a = /* @__PURE__ */ new Set()) {
  const d = o[t.id] ?? qi(i.length + s.length), c = i.map((h, r) => {
    const u = n[h.id] ?? ai(r, d), f = a.has(h.id) ? [] : h.ops, _ = o[h.id] ?? qi(f.length), A = f.map((O, b) => n[O.id] ?? ai(b, _)), N = zi(
      { x: u.x, y: u.y },
      _,
      A.map((O) => ({ dx: O.x, dy: O.y, w: Pe, h: Oe }))
    );
    return { a: h, off: u, ops: f, opOffs: A, fit: N };
  }), p = s.map(
    (h, r) => n[h.id] ?? ai(i.length + r, d)
  ), g = Qi(
    [
      ...c.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, r) => ({
        id: h.id,
        x: p[r].x,
        y: p[r].y,
        w: Pe,
        h: Oe
      }))
    ],
    24
  );
  for (const h of c) {
    const r = g.get(h.a.id);
    r && (h.off = { x: h.off.x + (r.x - h.fit.x), y: h.off.y + (r.y - h.fit.y) }, h.fit = { ...h.fit, x: r.x, y: r.y });
  }
  s.forEach((h, r) => {
    const u = g.get(h.id);
    u && (p[r] = { x: u.x, y: u.y });
  });
  const m = zi(e, d, [
    ...c.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: Pe, h: Oe }))
  ]), y = [
    { ...t, x: m.x, y: m.y, w: m.w, h: m.h, container: !0 }
  ];
  for (const h of c)
    y.push({
      id: h.a.id,
      label: h.a.name,
      kind: h.a.kind,
      symbol: "interface",
      fill: h.a.fill,
      stroke: h.a.stroke,
      badge: h.a.badge,
      container: !0,
      collapsible: h.a.ops.length > 0 || a.has(h.a.id),
      collapsed: a.has(h.a.id),
      parentId: t.id,
      x: e.x + h.fit.x,
      y: e.y + h.fit.y,
      w: h.fit.w,
      h: h.fit.h,
      tooltip: h.a.tooltip
    }), h.ops.forEach((r, u) => {
      y.push({
        id: r.id,
        label: r.name,
        kind: h.a.opKind,
        symbol: "usecase",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        parentId: h.a.id,
        x: e.x + h.off.x + h.opOffs[u].x,
        y: e.y + h.off.y + h.opOffs[u].y,
        w: Pe,
        h: Oe,
        tooltip: `${Ui[h.a.opKind]}: ${r.name}`
      });
    });
  return s.forEach((h, r) => {
    const u = ls[h.kind];
    y.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[r].x,
      y: e.y + p[r].y,
      w: Pe,
      h: Oe,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Ui[h.kind]} ${h.name}`
    });
  }), y;
}
function Pt(e, t, i, s, n) {
  const o = n[t.id] ?? qi(i.length), a = i.map((m, y) => s[m.id] ?? ai(y, o)), d = Qi(
    i.map((m, y) => ({ id: m.id, x: a[y].x, y: a[y].y, w: Pe, h: Oe })),
    10
  );
  i.forEach((m, y) => {
    const h = d.get(m.id);
    h && (a[y] = { x: h.x, y: h.y });
  });
  const c = zi(
    e,
    o,
    a.map((m) => ({ dx: m.x, dy: m.y, w: Pe, h: Oe }))
  ), p = {
    ...t,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, g = i.map((m, y) => {
    const h = a[y], r = m.policy ? ho : ls[m.kind];
    return {
      id: m.id,
      label: m.name,
      kind: m.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: Pe,
      h: Oe,
      symbol: r.symbol,
      fill: r.fill,
      stroke: r.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Ui[m.kind]} ${m.name}`
    };
  });
  return [p, ...g];
}
function go(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = n, a = i !== "contexts", d = i === "operations", c = new Set(e.externalSystems.map((l) => l.id)), p = (e.apis ?? []).filter(
    (l) => l.publishedByExternalSystemId && c.has(l.publishedByExternalSystemId)
  ), g = new Set(p.map((l) => l.id)), m = (e.proxyApis ?? []).filter(
    (l) => l.publishedByExternalSystemId && c.has(l.publishedByExternalSystemId)
  ), y = new Set(m.map((l) => l.id)), h = [
    ...e.modules.map((l) => ({ ref: l, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((l) => ({ ref: l, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((l) => !g.has(l.id)).map((l) => ({ ref: l, external: !1, api: !0, proxy: !1 })),
    ...(e.proxyApis ?? []).filter((l) => !y.has(l.id)).map((l) => ({ ref: l, external: !1, api: !1, proxy: !0 })),
    ...(e.workflows ?? []).map((l) => ({
      ref: l,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones nest in their context.
    ...(e.etlFlows ?? []).filter((l) => !l.ownerModuleId).map((l) => ({
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
  ], r = h.flatMap((l, T) => {
    const H = t[l.ref.id] ?? Et(T, h.length);
    if ("idp" in l && l.idp) {
      const j = l.ref, de = !!j.publishedByExternalSystemId;
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
    if ("etl" in l && l.etl) {
      const j = l.ref;
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
    if ("workflow" in l && l.workflow) {
      const j = l.ref;
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
    if (l.proxy) {
      const j = l.ref, de = {
        id: j.id,
        label: j.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${j.name} — proxy/cache de una API, consumible como ella`
      };
      if (d && j.targetApiId) {
        const qe = (e.apis ?? []).find((mt) => mt.id === j.targetApiId), Fe = (qe == null ? void 0 : qe.operations) ?? [];
        if (Fe.length > 0)
          return Pt(
            H,
            de,
            Fe.map((mt) => ({
              id: tt(mt.id, j.id),
              name: mt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...de, x: H.x, y: H.y, w: je, h: Ye }];
    }
    if (l.api) {
      const j = l.ref, de = {
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
    if (l.external) {
      const j = l.ref, de = {
        id: j.id,
        label: j.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${j.name} (sistema externo)`
      }, qe = p.filter((pe) => pe.publishedByExternalSystemId === j.id), Fe = m.filter((pe) => pe.publishedByExternalSystemId === j.id), mt = Fe.map(
        (pe) => ({ id: pe.id, name: pe.name, kind: "proxy-api" })
      ), $i = [
        ...(j.useCases ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-use-case" })
        ),
        ...(j.tables ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "external-table" })
        ),
        ...(j.mcpServers ?? []).map(
          (pe) => ({ id: pe.id, name: pe.name, kind: "mcp-server" })
        )
      ], Ei = qe.length > 0 || Fe.length > 0, Si = Ei || $i.length > 0, { form: Xt, collapsed: Ci } = mn(
        n.has(j.id),
        a ? "full" : Ei ? "coarse" : "compact",
        $i.length > 0 || d && Ei
      ), cn = [
        ...mt,
        ...Xt === "full" ? $i : []
      ], Ai = d && Xt === "full" ? Fe.filter((pe) => {
        const kt = pe.targetApiId ? (e.apis ?? []).find((ye) => ye.id === pe.targetApiId) : void 0;
        return ((kt == null ? void 0 : kt.operations) ?? []).length > 0;
      }) : [];
      if (d && Xt === "full" && (qe.length > 0 || Ai.length > 0)) {
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
          ...Ai.map((ye) => {
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
        ], kt = new Set(Ai.map((ye) => ye.id));
        return cs(
          H,
          { ...de, collapsible: !0, collapsed: Ci },
          pe,
          cn.filter((ye) => !kt.has(ye.id)),
          t,
          s,
          o
        );
      }
      const pn = Xt === "compact" ? [] : [
        ...qe.map((pe) => ({ id: pe.id, name: pe.name, kind: "api" })),
        ...cn
      ];
      return pn.length > 0 ? Pt(
        H,
        { ...de, collapsible: Si, collapsed: Ci },
        pn,
        t,
        s
      ) : [{
        ...de,
        collapsible: Si,
        collapsed: Si && Ci,
        x: H.x,
        y: H.y,
        w: je,
        h: Ye
      }];
    }
    const Z = l.ref, K = Z.subdomainType ?? "GENERIC", ce = {
      id: Z.id,
      label: Z.name,
      kind: "module",
      symbol: "component",
      fill: ao[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${Z.name} — subdominio ${K}`
    }, Me = ss(e, Z.id), bt = (e.aggregates ?? []).some((j) => j.moduleId === Z.id) || (Z.useCases ?? []).length > 0 || (Z.domainEvents ?? []).length > 0 || (Z.applicationEvents ?? []).length > 0 || (Z.readModels ?? []).length > 0 || (Z.domainServices ?? []).length > 0 || (Z.queryServices ?? []).length > 0 || (Z.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((j) => j.ownerModuleId === Z.id) || (e.notifications ?? []).some((j) => j.ownerModuleId === Z.id) || (e.documents ?? []).some((j) => j.ownerModuleId === Z.id), Ze = bt || Me.length > 0, { form: _t, collapsed: ut } = mn(
      n.has(Z.id),
      a ? "full" : Me.length > 0 ? "coarse" : "compact",
      bt
    );
    return _t === "full" && Ze ? fo(
      e,
      Z,
      H,
      { ...ce, collapsible: !0, collapsed: ut },
      t,
      s,
      d
    ) : _t === "coarse" && Me.length > 0 ? Pt(
      H,
      { ...ce, collapsible: Ze, collapsed: ut },
      Me,
      t,
      s
    ) : [{
      ...ce,
      collapsible: Ze,
      collapsed: Ze && ut,
      x: H.x,
      y: H.y,
      w: je,
      h: Ye
    }];
  }), u = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((l, T) => {
    const H = t[l.id] ?? Et(h.length + T, u);
    r.push({
      id: l.id,
      label: l.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${l.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((l, T) => {
    const H = t[l.id] ?? Et(h.length + (e.actors ?? []).length + T, u);
    r.push({
      id: l.id,
      label: l.name,
      x: H.x,
      y: H.y,
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
  }), (e.mcpGateways ?? []).forEach((l, T) => {
    const H = t[l.id] ?? Et(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      u
    );
    r.push({
      id: l.id,
      label: l.name,
      x: H.x,
      y: H.y,
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
  const f = [];
  (e.rags ?? []).forEach((l, T) => {
    const H = t[l.id] ?? Et(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      u
    );
    r.push({
      id: l.id,
      label: l.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${l.name} (base de conocimiento — retrieval para agentes)`
    }), (l.contentSources ?? []).forEach((Z, K) => {
      const ce = `ragcs:${l.id}:${Z.uri}`, Me = t[ce] ?? { x: H.x + 170, y: H.y - 30 + K * 44 };
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
        id: `ragcse:${l.id}:${Z.uri}`,
        sourceId: ce,
        targetId: l.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), r.sort((l, T) => (l.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const _ = e.relations.map((l) => ({
    id: uo(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: l.type ? ro[l.type] : "?",
    color: l.declared ? "#475569" : "#94a3b8",
    dashed: !l.declared,
    arrow: !0,
    tooltip: l.type ? `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)${l.reasons ? ` — ${l.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${l.reasons ? ` — ${l.reasons}` : ""}`
  })), A = e.flows.map((l) => {
    var Me, bt, Ze, _t, ut, j;
    const T = mo(e, l), H = a ? e.modules.find((de) => de.id === l.sourceId) : void 0, Z = ((Me = H == null ? void 0 : H.domainEvents) == null ? void 0 : Me.find((de) => de.name === l.triggerEvent)) ?? ((bt = H == null ? void 0 : H.applicationEvents) == null ? void 0 : bt.find((de) => de.name === l.triggerEvent)), K = a && l.readModelName ? (_t = (Ze = e.modules.find((de) => de.id === l.targetId)) == null ? void 0 : Ze.readModels) == null ? void 0 : _t.find((de) => de.name === l.readModelName) : void 0, ce = a && l.targetUseCaseId ? (j = (ut = e.modules.find((de) => de.id === l.targetId)) == null ? void 0 : ut.useCases) == null ? void 0 : j.find((de) => de.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (Z == null ? void 0 : Z.id) ?? l.sourceId,
      targetId: (ce == null ? void 0 : ce.id) ?? (K == null ? void 0 : K.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: lo[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${T}`
    };
  }), N = new Map((e.apis ?? []).map((l) => [l.id, l])), O = new Set(e.modules.map((l) => l.id)), b = (e.apiImplementations ?? []).filter(
    (l) => N.has(l.apiId) && O.has(l.moduleId)
  ), w = new Set(r.map((l) => l.id)), P = a ? (e.emissions ?? []).filter((l) => w.has(l.sourceId) && w.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], U = a ? (e.projections ?? []).map((l) => ({
    p: l,
    source: l.sourceAggregateId ?? l.sourceExternalUseCaseId ?? l.sourceExternalTableId
  })).filter(({ p: l, source: T }) => T && l.readModelId).filter(({ p: l, source: T }) => w.has(T) && w.has(l.readModelId)).map(({ p: l, source: T }) => ({
    id: `proj:${l.id}`,
    sourceId: T,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((T) => {
      const H = a && T.targetUseCaseId && w.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetModuleId && w.has(T.targetModuleId) ? T.targetModuleId : (T.targetUseCaseId && !a, null);
      if (!H) return [];
      const Z = a && w.has(T.id) ? T.id : l.id;
      return w.has(Z) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: Z,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${H}`
        }
      ] : [];
    })
  ), z = a ? (e.useCaseCalls ?? []).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => ({
    id: `uccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], L = [
    ...e.modules.filter((l) => l.identityProviderId && w.has(l.id) && w.has(l.identityProviderId)).map((l) => ({
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
    ...(e.etlFlows ?? []).filter((l) => l.identityProviderId && w.has(l.identityProviderId)).flatMap((l) => {
      const T = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
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
    ...(e.identityProviders ?? []).filter((l) => l.publishedByExternalSystemId && w.has(l.id) && w.has(l.publishedByExternalSystemId)).map((l) => ({
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
  ], q = a ? e.modules.flatMap((l) => l.scheduledTriggers ?? []).filter((l) => l.useCaseId && w.has(l.id) && w.has(l.useCaseId)).map((l) => ({
    id: `stfire:${l.id}->${l.useCaseId}`,
    sourceId: l.id,
    targetId: l.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: l.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${l.cronExpression ?? "cron"}`
  })) : [], le = a ? (e.aggregateCalls ?? []).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => ({
    id: `aggcall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], I = a ? (e.queryCalls ?? []).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => ({
    id: `qscall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], S = a ? (e.actorUses ?? []).filter((l) => w.has(l.actorId) && w.has(l.targetId)).map((l) => ({
    id: `use:${l.actorId}->${l.targetId}`,
    sourceId: l.actorId,
    targetId: l.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], v = (e.actorExternalDependencies ?? []).filter((l) => w.has(l.actorId) && w.has(l.externalSystemId)).map((l) => ({
    id: `extdep:${l.actorId}->${l.externalSystemId}`,
    sourceId: l.actorId,
    targetId: l.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), x = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), k = (l) => w.has(l) ? l : x.get(l) ?? l, $ = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({
        sourceId: l.sourceId,
        targetId: k(l.targetId),
        cqrs: l.type === "CQRS"
      })).filter(
        (l) => w.has(l.sourceId) && w.has(l.targetId) && l.sourceId !== l.targetId
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
  ], M = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.useCases ?? []) M.set(T.id, l.id);
    for (const T of l.domainEvents ?? []) M.set(T.id, l.id);
    for (const T of l.applicationEvents ?? []) M.set(T.id, l.id);
    for (const T of l.queryServices ?? []) M.set(T.id, l.id);
  }
  const C = (l) => w.has(l) ? l : M.get(l) ?? l, R = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.domainEvents ?? []) R.set(T.name, T.id);
    for (const T of l.applicationEvents ?? []) R.set(T.name, T.id);
  }
  const B = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (l) => (l.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: l.id, targetId: C(T.targetUseCaseId) }))
      ).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], V = [
    ...new Map(
      (e.workflows ?? []).filter((l) => l.triggerEvent && R.has(l.triggerEvent)).map((l) => ({
        sourceId: C(R.get(l.triggerEvent)),
        targetId: l.id,
        label: l.triggerEvent
      })).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], re = /* @__PURE__ */ new Map();
  for (const l of e.externalSystems)
    for (const T of l.tables ?? []) re.set(T.id, l.id);
  const oe = (e.notifications ?? []).flatMap((l) => {
    var Z;
    const T = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!T) return [];
    const H = [];
    if (l.eventId) {
      const K = w.has(l.eventId) ? l.eventId : M.get(l.eventId);
      K && w.has(K) && K !== T && H.push({
        id: `notif:${l.id}`,
        sourceId: K,
        targetId: T,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const K of l.recipientRoleIds ?? [])
      w.has(K) && H.push({
        id: `notifto:${l.id}:${K}`,
        sourceId: T,
        targetId: K,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((Z = (l.channels ?? [])[0]) == null ? void 0 : Z.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${l.name} avisa a este rol — Supr lo quita`
      });
    return H;
  }), G = (e.documents ?? []).flatMap((l) => {
    const T = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!T || !l.queryServiceId) return [];
    const H = w.has(l.queryServiceId) ? l.queryServiceId : M.get(l.queryServiceId);
    return !H || !w.has(H) || H === T ? [] : [{
      id: `docq:${l.id}`,
      sourceId: H,
      targetId: T,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), X = (e.etlFlows ?? []).flatMap(
    (l) => (l.steps ?? []).flatMap((T) => {
      const H = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
      if (!H) return [];
      const Z = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!Z) return [];
      let K = Z;
      if (!w.has(K) && T.operationId && T.apiId && (K = T.apiId), !w.has(K) && T.externalTableId && (K = re.get(T.externalTableId) ?? K), w.has(K) || (K = k(K)), w.has(K) || (K = M.get(Z) ?? K), !w.has(K) || K === H) return [];
      const ce = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${l.id}:${T.id}`,
        sourceId: ce ? K : H,
        targetId: ce ? H : K,
        kind: ce ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ce ? `${l.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${l.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), W = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: w.has(T) ? T : re.get(T) ?? T,
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], te = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceApiIds ?? []).map((T) => ({
          sourceId: k(T),
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], xe = [
    ...new Map(
      (e.rags ?? []).flatMap((l) => [
        ...(l.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name })),
        ...(l.sourceModuleIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name }))
      ]).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], be = [
    ...new Map(
      (e.agentApiUses ?? []).map((l) => ({ sourceId: l.agentId, targetId: k(l.apiId) })).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
  ], Ae = (l) => l.onCompletionEventName || `${l.name.replace(/\s+/g, "")}Completado`, we = (e.workflows ?? []).flatMap(
    (l) => l.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== l.id && Ae(T) === l.triggerEvent).filter((T) => w.has(T.id) && w.has(l.id)).map((T) => ({
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
  ), Ve = [
    ...new Map(
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: k(l.id), targetId: k(l.targetApiId) })).filter(
        (l) => w.has(l.sourceId) && w.has(l.targetId) && l.sourceId !== l.targetId
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
  ], Yt = b.flatMap((l) => {
    const T = it(l.apiId, l.moduleId);
    if (!w.has(T)) return [];
    const H = [];
    for (const Z of (e.proxyApis ?? []).filter((K) => K.targetApiId === l.apiId)) {
      const K = k(Z.id);
      w.has(K) && K !== T && H.push({
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
    return H;
  }), pt = (e.proxyOperationRoutes ?? []).flatMap((l) => {
    const T = (e.proxyApis ?? []).find((K) => K.id === l.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const H = tt(l.operationId, l.proxyId), Z = l.targetSiteId === T.targetApiId ? T.targetApiId : it(T.targetApiId, l.targetSiteId);
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
      (e.externalOperationUses ?? []).map((l) => {
        if (!w.has(l.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (ce) => ce.operations.some((Me) => Me.id === l.operationId)
        );
        if (!T) return null;
        const H = l.siteId === T.id, Z = H ? l.operationId : tt(l.operationId, l.siteId);
        let K = w.has(Z) ? Z : null;
        if (!K)
          if (H || (e.proxyApis ?? []).some((ce) => ce.id === l.siteId))
            K = k(l.siteId);
          else {
            const ce = it(T.id, l.siteId);
            K = w.has(ce) ? ce : l.siteId;
          }
        return !K || !w.has(K) || K === l.externalSystemId ? null : { u: l, target: K };
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
  ], Hs = a ? (e.apiOperationImplementations ?? []).flatMap((l) => {
    if (!w.has(l.useCaseId)) return [];
    const T = w.has(tt(l.operationId, l.moduleId)) ? tt(l.operationId, l.moduleId) : w.has(it(l.apiId, l.moduleId)) ? it(l.apiId, l.moduleId) : w.has(k(l.moduleId)) ? k(l.moduleId) : null;
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
  }) : [], Vs = a ? (e.agentUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.useCaseId)).map((l) => ({
    id: `mcp:${l.agentId}->${l.useCaseId}`,
    sourceId: l.agentId,
    targetId: l.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Gs = (e.agentRags ?? []).filter((l) => w.has(l.agentId) && w.has(l.ragId)).map((l) => ({
    id: `agrag:${l.agentId}->${l.ragId}`,
    sourceId: l.agentId,
    targetId: l.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), js = a ? (e.rags ?? []).filter((l) => w.has(l.id)).flatMap(
    (l) => (l.sourceReadModelIds ?? []).filter((T) => w.has(T)).map((T) => ({
      id: `ragsrc:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} indexa este read model`
    }))
  ) : [], Ys = a ? (e.agentExternalUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.externalUseCaseId)).map((l) => ({
    id: `mcpx:${l.agentId}->${l.externalUseCaseId}`,
    sourceId: l.agentId,
    targetId: l.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ks = a ? (e.agentMcpUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.mcpServerId)).map((l) => ({
    id: `mcpsv:${l.agentId}->${l.mcpServerId}`,
    sourceId: l.agentId,
    targetId: l.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Xs = (e.mcpGateways ?? []).flatMap(
    (l) => [
      ...l.mcpServerIds ?? [],
      ...l.apiIds ?? [],
      ...l.apiOperationIds ?? [],
      ...l.useCaseIds ?? [],
      ...l.ragIds ?? []
    ].filter((T) => w.has(l.id) && w.has(T)).map((T) => ({
      id: `gwx:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Qs = (e.agentGatewayUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.gatewayId)).map((l) => ({
    id: `aggw:${l.agentId}->${l.gatewayId}`,
    sourceId: l.agentId,
    targetId: l.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Zs = a ? (e.agentApiOpUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.apiOperationId)).map((l) => ({
    id: `agapi:${l.agentId}->${l.apiOperationId}`,
    sourceId: l.agentId,
    targetId: l.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Js = a ? (e.agentQueryUses ?? []).filter((l) => w.has(l.agentId) && w.has(l.queryServiceId)).map((l) => ({
    id: `agqs:${l.agentId}->${l.queryServiceId}`,
    sourceId: l.agentId,
    targetId: l.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], eo = (e.agentDelegations ?? []).filter((l) => w.has(l.agentId) && w.has(l.delegateAgentId)).map((l) => ({
    id: `agag:${l.agentId}->${l.delegateAgentId}`,
    sourceId: l.agentId,
    targetId: l.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), to = (e.actorAgentUses ?? []).filter((l) => w.has(l.actorId) && w.has(l.agentId)).map((l) => ({
    id: `useag:${l.actorId}->${l.agentId}`,
    sourceId: l.actorId,
    targetId: l.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), io = a ? (e.agentTriggers ?? []).filter((l) => w.has(l.eventId) && w.has(l.agentId)).map((l) => ({
    id: `evag:${l.eventId}->${l.agentId}`,
    sourceId: l.eventId,
    targetId: l.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], no = a ? (e.externalCalls ?? []).filter((l) => w.has(l.externalSystemId) && w.has(l.useCaseId)).map((l) => ({
    id: `extcall:${l.externalSystemId}->${l.useCaseId}`,
    sourceId: l.externalSystemId,
    targetId: l.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], so = a ? (e.externalUseCaseCalls ?? []).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => ({
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
      ...oe,
      ...G,
      ...X,
      ...le,
      ...I,
      ...S,
      ...v,
      ...$,
      ...Ve,
      ...Yt,
      ...pt,
      ...Kt,
      ...Hs,
      ...B,
      ...V,
      ...we,
      ...be,
      ...W,
      ...te,
      ...xe,
      ...Vs,
      ...Ys,
      ...Ks,
      ...Xs,
      ...Qs,
      ...Zs,
      ...Js,
      ...eo,
      ...to,
      ...io,
      ...Gs,
      ...js,
      ...f,
      ...no,
      ...so
    ]
  };
}
const Io = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, yo = 176, vo = 60, wo = 140, xo = 40;
function bo(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((c) => c.moduleId === n.id).forEach((c, p) => {
      const g = s.filter((y) => y.aggregateId === c.id).length, m = 140 + p * (170 + g * 60);
      t[c.id] = { x: a, y: m }, s.filter((y) => y.aggregateId === c.id).forEach((y, h) => {
        t[y.id] = { x: a + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function _o(e, t) {
  const i = bo(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const g = n.get(p.moduleId), m = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", y = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: y.x,
      y: y.y,
      w: yo,
      h: vo,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Io[m],
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
      w: wo,
      h: xo,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${p.name} (dentro del agregado)`
    };
  }), d = (e.entities ?? []).map((p) => ({
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
    edges: [...d, ...c]
  };
}
const ko = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, $o = 150, Eo = 44, So = 190, Co = 56, Ao = 160, Mo = 48;
function Po(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function Oo(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (d) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((g) => g.id === d)) == null ? void 0 : p.name) ?? d ?? "?";
  };
  return i.forEach((d, c) => {
    const p = 120 + c * 130, g = ko[d.archetype] ?? "#475569", m = d.triggerAggregateId ?? d.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const f = t[m] ?? { x: 160, y: p };
      s.push({
        id: m,
        label: d.triggerAggregateId ? a(d.triggerAggregateId) : m,
        x: f.x,
        y: f.y,
        w: $o,
        h: Eo,
        kind: d.triggerAggregateId ? "aggregate" : "module",
        symbol: d.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const y = `flow:${d.id}`, h = t[y] ?? { x: 470, y: p };
    s.push({
      id: y,
      label: d.name,
      x: h.x,
      y: h.y,
      w: So,
      h: Co,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const r = Po(e, d), u = `tgt:${r.id}`;
    if (!o.has(u)) {
      o.add(u);
      const f = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: r.label,
        x: f.x,
        y: f.y,
        w: Ao,
        h: Mo,
        kind: r.external ? "external-system" : "module",
        symbol: "component",
        fill: r.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: r.external,
        badge: r.external ? "EXTERNAL" : "MODULE"
      });
    }
    n.push({
      id: `fe:${d.id}:in`,
      sourceId: m,
      targetId: y,
      kind: "flow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    }), n.push({
      id: `fe:${d.id}:out`,
      sourceId: y,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const To = 190, No = 56, Mi = 170, Ro = 52;
function hn(e, t) {
  const i = [], s = [], n = (o) => {
    var a;
    return (a = e.modules.find((d) => d.id === o)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((o, a) => {
    const d = 140 + a * 240, c = t[o.id] ?? { x: 150, y: d };
    i.push({
      id: o.id,
      label: o.name,
      x: c.x,
      y: c.y,
      w: To,
      h: No,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let p = o.id;
    if (o.steps.forEach((g, m) => {
      const y = g.type === "HUMAN", h = t[g.id] ?? { x: 150 + (m + 1) * 240, y: d };
      if (i.push({
        id: g.id,
        label: g.name,
        x: h.x,
        y: h.y,
        w: Mi,
        h: Ro,
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
        const r = `comp:${g.id}`, u = t[r] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: r,
          label: g.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Mi,
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
      const g = `done:${o.id}`, m = t[g] ?? { x: 150 + (o.steps.length + 1) * 240, y: d };
      i.push({
        id: g,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Mi,
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
const ri = globalThis, Zi = ri.ShadowRoot && (ri.ShadyCSS === void 0 || ri.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ji = Symbol(), fn = /* @__PURE__ */ new WeakMap();
let ps = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Ji) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Zi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = fn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && fn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Do = (e) => new ps(typeof e == "string" ? e : e + "", void 0, Ji), lt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new ps(i, e, Ji);
}, Lo = (e, t) => {
  if (Zi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = ri.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, gn = Zi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Do(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zo, defineProperty: Uo, getOwnPropertyDescriptor: qo, getOwnPropertyNames: Fo, getOwnPropertySymbols: Bo, getPrototypeOf: Wo } = Object, Qe = globalThis, In = Qe.trustedTypes, Ho = In ? In.emptyScript : "", Pi = Qe.reactiveElementPolyfillSupport, Nt = (e, t) => e, ui = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ho : null;
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
} }, en = (e, t) => !zo(e, t), yn = { attribute: !0, type: String, converter: ui, reflect: !1, useDefault: !1, hasChanged: en };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Qe.litPropertyMetadata ?? (Qe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = yn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && Uo(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = qo(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const d = n == null ? void 0 : n.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, d, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? yn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Nt("elementProperties"))) return;
    const t = Wo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Nt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Nt("properties"))) {
      const i = this.properties, s = [...Fo(i), ...Bo(i)];
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
      for (const n of s) i.unshift(gn(n));
    } else t !== void 0 && i.push(gn(t));
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
    return Lo(t, this.constructor.elementStyles), t;
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
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : ui).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const d = s.getPropertyOptions(n), c = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : ui;
      this._$Em = n;
      const p = c.fromAttribute(i, d.type);
      this[n] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const d = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = d.getPropertyOptions(t)), !((s.hasChanged ?? en)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(d._$Eu(t, s)))) return;
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
        const { wrapped: d } = a, c = this[o];
        d !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
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
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[Nt("elementProperties")] = /* @__PURE__ */ new Map(), ft[Nt("finalized")] = /* @__PURE__ */ new Map(), Pi == null || Pi({ ReactiveElement: ft }), (Qe.reactiveElementVersions ?? (Qe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = globalThis, vn = (e) => e, mi = Rt.trustedTypes, wn = mi ? mi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, us = "$lit$", Xe = `lit$${Math.random().toFixed(9).slice(2)}$`, ms = "?" + Xe, Vo = `<${ms}>`, rt = document, zt = () => rt.createComment(""), Ut = (e) => e === null || typeof e != "object" && typeof e != "function", tn = Array.isArray, Go = (e) => tn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Oi = `[ 	
\f\r]`, St = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xn = /-->/g, bn = />/g, Je = RegExp(`>|${Oi}(?:([^\\s"'>=/]+)(${Oi}*=${Oi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _n = /'/g, kn = /"/g, hs = /^(?:script|style|textarea|title)$/i, fs = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = fs(1), J = fs(2), yt = Symbol.for("lit-noChange"), ie = Symbol.for("lit-nothing"), $n = /* @__PURE__ */ new WeakMap(), nt = rt.createTreeWalker(rt, 129);
function gs(e, t) {
  if (!tn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wn !== void 0 ? wn.createHTML(t) : t;
}
const jo = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = St;
  for (let d = 0; d < i; d++) {
    const c = e[d];
    let p, g, m = -1, y = 0;
    for (; y < c.length && (a.lastIndex = y, g = a.exec(c), g !== null); ) y = a.lastIndex, a === St ? g[1] === "!--" ? a = xn : g[1] !== void 0 ? a = bn : g[2] !== void 0 ? (hs.test(g[2]) && (n = RegExp("</" + g[2], "g")), a = Je) : g[3] !== void 0 && (a = Je) : a === Je ? g[0] === ">" ? (a = n ?? St, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? Je : g[3] === '"' ? kn : _n) : a === kn || a === _n ? a = Je : a === xn || a === bn ? a = St : (a = Je, n = void 0);
    const h = a === Je && e[d + 1].startsWith("/>") ? " " : "";
    o += a === St ? c + Vo : m >= 0 ? (s.push(p), c.slice(0, m) + us + c.slice(m) + Xe + h) : c + Xe + (m === -2 ? d : h);
  }
  return [gs(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class qt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const d = t.length - 1, c = this.parts, [p, g] = jo(t, i);
    if (this.el = qt.createElement(p, s), nt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (n = nt.nextNode()) !== null && c.length < d; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const m of n.getAttributeNames()) if (m.endsWith(us)) {
          const y = g[a++], h = n.getAttribute(m).split(Xe), r = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: o, name: r[2], strings: h, ctor: r[1] === "." ? Ko : r[1] === "?" ? Xo : r[1] === "@" ? Qo : xi }), n.removeAttribute(m);
        } else m.startsWith(Xe) && (c.push({ type: 6, index: o }), n.removeAttribute(m));
        if (hs.test(n.tagName)) {
          const m = n.textContent.split(Xe), y = m.length - 1;
          if (y > 0) {
            n.textContent = mi ? mi.emptyScript : "";
            for (let h = 0; h < y; h++) n.append(m[h], zt()), nt.nextNode(), c.push({ type: 2, index: ++o });
            n.append(m[y], zt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ms) c.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = n.data.indexOf(Xe, m + 1)) !== -1; ) c.push({ type: 7, index: o }), m += Xe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = rt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function vt(e, t, i = e, s) {
  var a, d;
  if (t === yt) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = Ut(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((d = n == null ? void 0 : n._$AO) == null || d.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = vt(e, n._$AS(e, t.values), n, s)), t;
}
class Yo {
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
    let o = nt.nextNode(), a = 0, d = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new Vt(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new Zo(o, this, t)), this._$AV.push(p), c = s[++d];
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
class Vt {
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
    t = vt(this, t, i), Ut(t) ? t === ie || t == null || t === "" ? (this._$AH !== ie && this._$AR(), this._$AH = ie) : t !== this._$AH && t !== yt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Go(t) ? this.k(t) : this._(t);
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
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = qt.createElement(gs(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new Yo(n, this), d = a.u(this.options);
      a.p(i), this.T(d), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = $n.get(t.strings);
    return i === void 0 && $n.set(t.strings, i = new qt(t)), i;
  }
  k(t) {
    tn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new Vt(this.O(zt()), this.O(zt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = vn(t).nextSibling;
      vn(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class xi {
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
    if (o === void 0) t = vt(this, t, i, 0), a = !Ut(t) || t !== this._$AH && t !== yt, a && (this._$AH = t);
    else {
      const d = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = vt(this, d[s + c], i, c), p === yt && (p = this._$AH[c]), a || (a = !Ut(p) || p !== this._$AH[c]), p === ie ? t = ie : t !== ie && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === ie ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ko extends xi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ie ? void 0 : t;
  }
}
class Xo extends xi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ie);
  }
}
class Qo extends xi {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = vt(this, t, i, 0) ?? ie) === yt) return;
    const s = this._$AH, n = t === ie && s !== ie || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== ie && (s === ie || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    vt(this, t);
  }
}
const Ti = Rt.litHtmlPolyfillSupport;
Ti == null || Ti(qt, Vt), (Rt.litHtmlVersions ?? (Rt.litHtmlVersions = [])).push("3.3.3");
const Jo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Vt(t.insertBefore(zt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
class Re extends ft {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jo(i, this.renderRoot, this.renderOptions);
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
    return yt;
  }
}
var ns;
Re._$litElement$ = !0, Re.finalized = !0, (ns = ot.litElementHydrateSupport) == null || ns.call(ot, { LitElement: Re });
const Ni = ot.litElementPolyfillSupport;
Ni == null || Ni({ LitElement: Re });
(ot.litElementVersions ?? (ot.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ea = { attribute: !0, type: String, converter: ui, reflect: !1, hasChanged: en }, ta = (e = ea, t, i) => {
  const { kind: s, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), s === "accessor") {
    const { name: a } = i;
    return { set(d) {
      const c = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(a, c, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, e, d), d;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(d) {
      const c = this[a];
      t.call(this, d), this.requestUpdate(a, c, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function se(e) {
  return (t, i) => typeof i == "object" ? ta(e, t, i) : ((s, n, o) => {
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
  return se({ ...e, state: !0, attribute: !1 });
}
var Fi = "http://www.w3.org/1999/xhtml";
const En = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Fi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function bi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), En.hasOwnProperty(t) ? { space: En[t], local: e } : e;
}
function ia(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Fi && t.documentElement.namespaceURI === Fi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function na(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Is(e) {
  var t = bi(e);
  return (t.local ? na : ia)(t);
}
function sa() {
}
function nn(e) {
  return e == null ? sa : function() {
    return this.querySelector(e);
  };
}
function oa(e) {
  typeof e != "function" && (e = nn(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = new Array(a), c, p, g = 0; g < a; ++g)
      (c = o[g]) && (p = e.call(c, c.__data__, g, o)) && ("__data__" in c && (p.__data__ = c.__data__), d[g] = p);
  return new Ee(s, this._parents);
}
function aa(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ra() {
  return [];
}
function ys(e) {
  return e == null ? ra : function() {
    return this.querySelectorAll(e);
  };
}
function da(e) {
  return function() {
    return aa(e.apply(this, arguments));
  };
}
function la(e) {
  typeof e == "function" ? e = da(e) : e = ys(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && (s.push(e.call(c, c.__data__, p, a)), n.push(c));
  return new Ee(s, n);
}
function vs(e) {
  return function() {
    return this.matches(e);
  };
}
function ws(e) {
  return function(t) {
    return t.matches(e);
  };
}
var ca = Array.prototype.find;
function pa(e) {
  return function() {
    return ca.call(this.children, e);
  };
}
function ua() {
  return this.firstElementChild;
}
function ma(e) {
  return this.select(e == null ? ua : pa(typeof e == "function" ? e : ws(e)));
}
var ha = Array.prototype.filter;
function fa() {
  return Array.from(this.children);
}
function ga(e) {
  return function() {
    return ha.call(this.children, e);
  };
}
function Ia(e) {
  return this.selectAll(e == null ? fa : ga(typeof e == "function" ? e : ws(e)));
}
function ya(e) {
  typeof e != "function" && (e = vs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new Ee(s, this._parents);
}
function xs(e) {
  return new Array(e.length);
}
function va() {
  return new Ee(this._enter || this._groups.map(xs), this._parents);
}
function hi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
hi.prototype = {
  constructor: hi,
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
function wa(e) {
  return function() {
    return e;
  };
}
function xa(e, t, i, s, n, o) {
  for (var a = 0, d, c = t.length, p = o.length; a < p; ++a)
    (d = t[a]) ? (d.__data__ = o[a], s[a] = d) : i[a] = new hi(e, o[a]);
  for (; a < c; ++a)
    (d = t[a]) && (n[a] = d);
}
function ba(e, t, i, s, n, o, a) {
  var d, c, p = /* @__PURE__ */ new Map(), g = t.length, m = o.length, y = new Array(g), h;
  for (d = 0; d < g; ++d)
    (c = t[d]) && (y[d] = h = a.call(c, c.__data__, d, t) + "", p.has(h) ? n[d] = c : p.set(h, c));
  for (d = 0; d < m; ++d)
    h = a.call(e, o[d], d, o) + "", (c = p.get(h)) ? (s[d] = c, c.__data__ = o[d], p.delete(h)) : i[d] = new hi(e, o[d]);
  for (d = 0; d < g; ++d)
    (c = t[d]) && p.get(y[d]) === c && (n[d] = c);
}
function _a(e) {
  return e.__data__;
}
function ka(e, t) {
  if (!arguments.length) return Array.from(this, _a);
  var i = t ? ba : xa, s = this._parents, n = this._groups;
  typeof e != "function" && (e = wa(e));
  for (var o = n.length, a = new Array(o), d = new Array(o), c = new Array(o), p = 0; p < o; ++p) {
    var g = s[p], m = n[p], y = m.length, h = $a(e.call(g, g && g.__data__, p, s)), r = h.length, u = d[p] = new Array(r), f = a[p] = new Array(r), _ = c[p] = new Array(y);
    i(g, m, u, f, _, h, t);
    for (var A = 0, N = 0, O, b; A < r; ++A)
      if (O = u[A]) {
        for (A >= N && (N = A + 1); !(b = f[N]) && ++N < r; ) ;
        O._next = b || null;
      }
  }
  return a = new Ee(a, s), a._enter = d, a._exit = c, a;
}
function $a(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ea() {
  return new Ee(this._exit || this._groups.map(xs), this._parents);
}
function Sa(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function Ca(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), d = new Array(n), c = 0; c < a; ++c)
    for (var p = i[c], g = s[c], m = p.length, y = d[c] = new Array(m), h, r = 0; r < m; ++r)
      (h = p[r] || g[r]) && (y[r] = h);
  for (; c < n; ++c)
    d[c] = i[c];
  return new Ee(d, this._parents);
}
function Aa() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Ma(e) {
  e || (e = Pa);
  function t(m, y) {
    return m && y ? e(m.__data__, y.__data__) : !m - !y;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], d = a.length, c = n[o] = new Array(d), p, g = 0; g < d; ++g)
      (p = a[g]) && (c[g] = p);
    c.sort(t);
  }
  return new Ee(n, this._parents).order();
}
function Pa(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oa() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ta() {
  return Array.from(this);
}
function Na() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function Ra() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Da() {
  return !this.node();
}
function La(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, d; o < a; ++o)
      (d = n[o]) && e.call(d, d.__data__, o, n);
  return this;
}
function za(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ua(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function qa(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Fa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ba(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Wa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Ha(e, t) {
  var i = bi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Ua : za : typeof t == "function" ? i.local ? Wa : Ba : i.local ? Fa : qa)(i, t));
}
function bs(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Va(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ga(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function ja(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function Ya(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Va : typeof t == "function" ? ja : Ga)(e, t, i ?? "")) : wt(this.node(), e);
}
function wt(e, t) {
  return e.style.getPropertyValue(t) || bs(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ka(e) {
  return function() {
    delete this[e];
  };
}
function Xa(e, t) {
  return function() {
    this[e] = t;
  };
}
function Qa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Za(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ka : typeof t == "function" ? Qa : Xa)(e, t)) : this.node()[e];
}
function _s(e) {
  return e.trim().split(/^|\s+/);
}
function sn(e) {
  return e.classList || new ks(e);
}
function ks(e) {
  this._node = e, this._names = _s(e.getAttribute("class") || "");
}
ks.prototype = {
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
function $s(e, t) {
  for (var i = sn(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function Es(e, t) {
  for (var i = sn(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function Ja(e) {
  return function() {
    $s(this, e);
  };
}
function er(e) {
  return function() {
    Es(this, e);
  };
}
function tr(e, t) {
  return function() {
    (t.apply(this, arguments) ? $s : Es)(this, e);
  };
}
function ir(e, t) {
  var i = _s(e + "");
  if (arguments.length < 2) {
    for (var s = sn(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? tr : t ? Ja : er)(i, t));
}
function nr() {
  this.textContent = "";
}
function sr(e) {
  return function() {
    this.textContent = e;
  };
}
function or(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ar(e) {
  return arguments.length ? this.each(e == null ? nr : (typeof e == "function" ? or : sr)(e)) : this.node().textContent;
}
function rr() {
  this.innerHTML = "";
}
function dr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function lr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function cr(e) {
  return arguments.length ? this.each(e == null ? rr : (typeof e == "function" ? lr : dr)(e)) : this.node().innerHTML;
}
function pr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ur() {
  return this.each(pr);
}
function mr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function hr() {
  return this.each(mr);
}
function fr(e) {
  var t = typeof e == "function" ? e : Is(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function gr() {
  return null;
}
function Ir(e, t) {
  var i = typeof e == "function" ? e : Is(e), s = t == null ? gr : typeof t == "function" ? t : nn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function yr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function vr() {
  return this.each(yr);
}
function wr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function xr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function br(e) {
  return this.select(e ? xr : wr);
}
function _r(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function kr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function $r(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function Er(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function Sr(e, t, i) {
  return function() {
    var s = this.__on, n, o = kr(t);
    if (s) {
      for (var a = 0, d = s.length; a < d; ++a)
        if ((n = s[a]).type === e.type && n.name === e.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = i), n.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), n = { type: e.type, name: e.name, value: t, listener: o, options: i }, s ? s.push(n) : this.__on = [n];
  };
}
function Cr(e, t, i) {
  var s = $r(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var c = 0, p = d.length, g; c < p; ++c)
        for (n = 0, g = d[c]; n < o; ++n)
          if ((a = s[n]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = t ? Sr : Er, n = 0; n < o; ++n) this.each(d(s[n], t, i));
  return this;
}
function Ss(e, t, i) {
  var s = bs(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Ar(e, t) {
  return function() {
    return Ss(this, e, t);
  };
}
function Mr(e, t) {
  return function() {
    return Ss(this, e, t.apply(this, arguments));
  };
}
function Pr(e, t) {
  return this.each((typeof t == "function" ? Mr : Ar)(e, t));
}
function* Or() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var Cs = [null];
function Ee(e, t) {
  this._groups = e, this._parents = t;
}
function Gt() {
  return new Ee([[document.documentElement]], Cs);
}
function Tr() {
  return this;
}
Ee.prototype = Gt.prototype = {
  constructor: Ee,
  select: oa,
  selectAll: la,
  selectChild: ma,
  selectChildren: Ia,
  filter: ya,
  data: ka,
  enter: va,
  exit: Ea,
  join: Sa,
  merge: Ca,
  selection: Tr,
  order: Aa,
  sort: Ma,
  call: Oa,
  nodes: Ta,
  node: Na,
  size: Ra,
  empty: Da,
  each: La,
  attr: Ha,
  style: Ya,
  property: Za,
  classed: ir,
  text: ar,
  html: cr,
  raise: ur,
  lower: hr,
  append: fr,
  insert: Ir,
  remove: vr,
  clone: br,
  datum: _r,
  on: Cr,
  dispatch: Pr,
  [Symbol.iterator]: Or
};
function Te(e) {
  return typeof e == "string" ? new Ee([[document.querySelector(e)]], [document.documentElement]) : new Ee([[e]], Cs);
}
function Nr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function et(e, t) {
  if (e = Nr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Rr = { value: () => {
} };
function on() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new di(i);
}
function di(e) {
  this._ = e;
}
function Dr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
di.prototype = on.prototype = {
  constructor: di,
  on: function(e, t) {
    var i = this._, s = Dr(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = Lr(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = Sn(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = Sn(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new di(e);
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
function Lr(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function Sn(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = Rr, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Bi = { capture: !0, passive: !1 };
function Wi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function zr(e) {
  var t = e.document.documentElement, i = Te(e).on("dragstart.drag", Wi, Bi);
  "onselectstart" in t ? i.on("selectstart.drag", Wi, Bi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Ur(e, t) {
  var i = e.document.documentElement, s = Te(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Wi, Bi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function an(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function As(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function jt() {
}
var Ft = 0.7, fi = 1 / Ft, It = "\\s*([+-]?\\d+)\\s*", Bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qr = /^#([0-9a-f]{3,8})$/, Fr = new RegExp(`^rgb\\(${It},${It},${It}\\)$`), Br = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Wr = new RegExp(`^rgba\\(${It},${It},${It},${Bt}\\)$`), Hr = new RegExp(`^rgba\\(${ze},${ze},${ze},${Bt}\\)$`), Vr = new RegExp(`^hsl\\(${Bt},${ze},${ze}\\)$`), Gr = new RegExp(`^hsla\\(${Bt},${ze},${ze},${Bt}\\)$`), Cn = {
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
an(jt, Wt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: An,
  // Deprecated! Use color.formatHex.
  formatHex: An,
  formatHex8: jr,
  formatHsl: Yr,
  formatRgb: Mn,
  toString: Mn
});
function An() {
  return this.rgb().formatHex();
}
function jr() {
  return this.rgb().formatHex8();
}
function Yr() {
  return Ms(this).formatHsl();
}
function Mn() {
  return this.rgb().formatRgb();
}
function Wt(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = qr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Pn(t) : i === 3 ? new _e(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Jt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Jt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Fr.exec(e)) ? new _e(t[1], t[2], t[3], 1) : (t = Br.exec(e)) ? new _e(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Wr.exec(e)) ? Jt(t[1], t[2], t[3], t[4]) : (t = Hr.exec(e)) ? Jt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Vr.exec(e)) ? Nn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Gr.exec(e)) ? Nn(t[1], t[2] / 100, t[3] / 100, t[4]) : Cn.hasOwnProperty(e) ? Pn(Cn[e]) : e === "transparent" ? new _e(NaN, NaN, NaN, 0) : null;
}
function Pn(e) {
  return new _e(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Jt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new _e(e, t, i, s);
}
function Kr(e) {
  return e instanceof jt || (e = Wt(e)), e ? (e = e.rgb(), new _e(e.r, e.g, e.b, e.opacity)) : new _e();
}
function Hi(e, t, i, s) {
  return arguments.length === 1 ? Kr(e) : new _e(e, t, i, s ?? 1);
}
function _e(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
an(_e, Hi, As(jt, {
  brighter(e) {
    return e = e == null ? fi : Math.pow(fi, e), new _e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ft : Math.pow(Ft, e), new _e(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _e(at(this.r), at(this.g), at(this.b), gi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: On,
  // Deprecated! Use color.formatHex.
  formatHex: On,
  formatHex8: Xr,
  formatRgb: Tn,
  toString: Tn
}));
function On() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}`;
}
function Xr() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}${st((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tn() {
  const e = gi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${at(this.r)}, ${at(this.g)}, ${at(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function gi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function at(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function st(e) {
  return e = at(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Nn(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ne(e, t, i, s);
}
function Ms(e) {
  if (e instanceof Ne) return new Ne(e.h, e.s, e.l, e.opacity);
  if (e instanceof jt || (e = Wt(e)), !e) return new Ne();
  if (e instanceof Ne) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, d = o - n, c = (o + n) / 2;
  return d ? (t === o ? a = (i - s) / d + (i < s) * 6 : i === o ? a = (s - t) / d + 2 : a = (t - i) / d + 4, d /= c < 0.5 ? o + n : 2 - o - n, a *= 60) : d = c > 0 && c < 1 ? 0 : a, new Ne(a, d, c, e.opacity);
}
function Qr(e, t, i, s) {
  return arguments.length === 1 ? Ms(e) : new Ne(e, t, i, s ?? 1);
}
function Ne(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
an(Ne, Qr, As(jt, {
  brighter(e) {
    return e = e == null ? fi : Math.pow(fi, e), new Ne(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ft : Math.pow(Ft, e), new Ne(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new _e(
      Ri(e >= 240 ? e - 240 : e + 120, n, s),
      Ri(e, n, s),
      Ri(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Ne(Rn(this.h), ei(this.s), ei(this.l), gi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = gi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Rn(this.h)}, ${ei(this.s) * 100}%, ${ei(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Rn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ei(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ri(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Ps = (e) => () => e;
function Zr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Jr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function ed(e) {
  return (e = +e) == 1 ? Os : function(t, i) {
    return i - t ? Jr(t, i, e) : Ps(isNaN(t) ? i : t);
  };
}
function Os(e, t) {
  var i = t - e;
  return i ? Zr(e, i) : Ps(isNaN(e) ? t : e);
}
const Dn = (function e(t) {
  var i = ed(t);
  function s(n, o) {
    var a = i((n = Hi(n)).r, (o = Hi(o)).r), d = i(n.g, o.g), c = i(n.b, o.b), p = Os(n.opacity, o.opacity);
    return function(g) {
      return n.r = a(g), n.g = d(g), n.b = c(g), n.opacity = p(g), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function Ke(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Vi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Di = new RegExp(Vi.source, "g");
function td(e) {
  return function() {
    return e;
  };
}
function id(e) {
  return function(t) {
    return e(t) + "";
  };
}
function nd(e, t) {
  var i = Vi.lastIndex = Di.lastIndex = 0, s, n, o, a = -1, d = [], c = [];
  for (e = e + "", t = t + ""; (s = Vi.exec(e)) && (n = Di.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), d[a] ? d[a] += o : d[++a] = o), (s = s[0]) === (n = n[0]) ? d[a] ? d[a] += n : d[++a] = n : (d[++a] = null, c.push({ i: a, x: Ke(s, n) })), i = Di.lastIndex;
  return i < t.length && (o = t.slice(i), d[a] ? d[a] += o : d[++a] = o), d.length < 2 ? c[0] ? id(c[0].x) : td(t) : (t = c.length, function(p) {
    for (var g = 0, m; g < t; ++g) d[(m = c[g]).i] = m.x(p);
    return d.join("");
  });
}
var Ln = 180 / Math.PI, Gi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ts(e, t, i, s, n, o) {
  var a, d, c;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (c = e * i + t * s) && (i -= e * c, s -= t * c), (d = Math.sqrt(i * i + s * s)) && (i /= d, s /= d, c /= d), e * s < t * i && (e = -e, t = -t, c = -c, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * Ln,
    skewX: Math.atan(c) * Ln,
    scaleX: a,
    scaleY: d
  };
}
var ti;
function sd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Gi : Ts(t.a, t.b, t.c, t.d, t.e, t.f);
}
function od(e) {
  return e == null || (ti || (ti = document.createElementNS("http://www.w3.org/2000/svg", "g")), ti.setAttribute("transform", e), !(e = ti.transform.baseVal.consolidate())) ? Gi : (e = e.matrix, Ts(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ns(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, g, m, y, h, r) {
    if (p !== m || g !== y) {
      var u = h.push("translate(", null, t, null, i);
      r.push({ i: u - 4, x: Ke(p, m) }, { i: u - 2, x: Ke(g, y) });
    } else (m || y) && h.push("translate(" + m + t + y + i);
  }
  function a(p, g, m, y) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), y.push({ i: m.push(n(m) + "rotate(", null, s) - 2, x: Ke(p, g) })) : g && m.push(n(m) + "rotate(" + g + s);
  }
  function d(p, g, m, y) {
    p !== g ? y.push({ i: m.push(n(m) + "skewX(", null, s) - 2, x: Ke(p, g) }) : g && m.push(n(m) + "skewX(" + g + s);
  }
  function c(p, g, m, y, h, r) {
    if (p !== m || g !== y) {
      var u = h.push(n(h) + "scale(", null, ",", null, ")");
      r.push({ i: u - 4, x: Ke(p, m) }, { i: u - 2, x: Ke(g, y) });
    } else (m !== 1 || y !== 1) && h.push(n(h) + "scale(" + m + "," + y + ")");
  }
  return function(p, g) {
    var m = [], y = [];
    return p = e(p), g = e(g), o(p.translateX, p.translateY, g.translateX, g.translateY, m, y), a(p.rotate, g.rotate, m, y), d(p.skewX, g.skewX, m, y), c(p.scaleX, p.scaleY, g.scaleX, g.scaleY, m, y), p = g = null, function(h) {
      for (var r = -1, u = y.length, f; ++r < u; ) m[(f = y[r]).i] = f.x(h);
      return m.join("");
    };
  };
}
var ad = Ns(sd, "px, ", "px)", "deg)"), rd = Ns(od, ", ", ")", ")"), dd = 1e-12;
function zn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ld(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function cd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const pd = (function e(t, i, s) {
  function n(o, a) {
    var d = o[0], c = o[1], p = o[2], g = a[0], m = a[1], y = a[2], h = g - d, r = m - c, u = h * h + r * r, f, _;
    if (u < dd)
      _ = Math.log(y / p) / t, f = function(P) {
        return [
          d + P * h,
          c + P * r,
          p * Math.exp(t * P * _)
        ];
      };
    else {
      var A = Math.sqrt(u), N = (y * y - p * p + s * u) / (2 * p * i * A), O = (y * y - p * p - s * u) / (2 * y * i * A), b = Math.log(Math.sqrt(N * N + 1) - N), w = Math.log(Math.sqrt(O * O + 1) - O);
      _ = (w - b) / t, f = function(P) {
        var U = P * _, D = zn(b), z = p / (i * A) * (D * cd(t * U + b) - ld(b));
        return [
          d + z * h,
          c + z * r,
          p * D / zn(t * U + b)
        ];
      };
    }
    return f.duration = _ * 1e3 * t / Math.SQRT2, f;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), d = a * a, c = d * d;
    return e(a, d, c);
  }, n;
})(Math.SQRT2, 2, 4);
var xt = 0, Ot = 0, Ct = 0, Rs = 1e3, Ii, Tt, yi = 0, dt = 0, _i = 0, Ht = typeof performance == "object" && performance.now ? performance : Date, Ds = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function rn() {
  return dt || (Ds(ud), dt = Ht.now() + _i);
}
function ud() {
  dt = 0;
}
function vi() {
  this._call = this._time = this._next = null;
}
vi.prototype = Ls.prototype = {
  constructor: vi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? rn() : +i) + (t == null ? 0 : +t), !this._next && Tt !== this && (Tt ? Tt._next = this : Ii = this, Tt = this), this._call = e, this._time = i, ji();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ji());
  }
};
function Ls(e, t, i) {
  var s = new vi();
  return s.restart(e, t, i), s;
}
function md() {
  rn(), ++xt;
  for (var e = Ii, t; e; )
    (t = dt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --xt;
}
function Un() {
  dt = (yi = Ht.now()) + _i, xt = Ot = 0;
  try {
    md();
  } finally {
    xt = 0, fd(), dt = 0;
  }
}
function hd() {
  var e = Ht.now(), t = e - yi;
  t > Rs && (_i -= t, yi = e);
}
function fd() {
  for (var e, t = Ii, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ii = i);
  Tt = e, ji(s);
}
function ji(e) {
  if (!xt) {
    Ot && (Ot = clearTimeout(Ot));
    var t = e - dt;
    t > 24 ? (e < 1 / 0 && (Ot = setTimeout(Un, e - Ht.now() - _i)), Ct && (Ct = clearInterval(Ct))) : (Ct || (yi = Ht.now(), Ct = setInterval(hd, Rs)), xt = 1, Ds(Un));
  }
}
function qn(e, t, i) {
  var s = new vi();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var gd = on("start", "end", "cancel", "interrupt"), Id = [], zs = 0, Fn = 1, Yi = 2, li = 3, Bn = 4, Ki = 5, ci = 6;
function ki(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  yd(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: gd,
    tween: Id,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: zs
  });
}
function dn(e, t) {
  var i = De(e, t);
  if (i.state > zs) throw new Error("too late; already scheduled");
  return i;
}
function Ue(e, t) {
  var i = De(e, t);
  if (i.state > li) throw new Error("too late; already running");
  return i;
}
function De(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function yd(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Ls(o, 0, i.time);
  function o(p) {
    i.state = Fn, i.timer.restart(a, i.delay, i.time), i.delay <= p && a(p - i.delay);
  }
  function a(p) {
    var g, m, y, h;
    if (i.state !== Fn) return c();
    for (g in s)
      if (h = s[g], h.name === i.name) {
        if (h.state === li) return qn(a);
        h.state === Bn ? (h.state = ci, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[g]) : +g < t && (h.state = ci, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[g]);
      }
    if (qn(function() {
      i.state === li && (i.state = Bn, i.timer.restart(d, i.delay, i.time), d(p));
    }), i.state = Yi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Yi) {
      for (i.state = li, n = new Array(y = i.tween.length), g = 0, m = -1; g < y; ++g)
        (h = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (n[++m] = h);
      n.length = m + 1;
    }
  }
  function d(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = Ki, 1), m = -1, y = n.length; ++m < y; )
      n[m].call(e, g);
    i.state === Ki && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
    i.state = ci, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function pi(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > Yi && s.state < Ki, s.state = ci, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function vd(e) {
  return this.each(function() {
    pi(this, e);
  });
}
function wd(e, t) {
  var i, s;
  return function() {
    var n = Ue(this, e), o = n.tween;
    if (o !== i) {
      s = i = o;
      for (var a = 0, d = s.length; a < d; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    n.tween = s;
  };
}
function xd(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ue(this, e), a = o.tween;
    if (a !== s) {
      n = (s = a).slice();
      for (var d = { name: t, value: i }, c = 0, p = n.length; c < p; ++c)
        if (n[c].name === t) {
          n[c] = d;
          break;
        }
      c === p && n.push(d);
    }
    o.tween = n;
  };
}
function bd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = De(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? wd : xd)(i, e, t));
}
function ln(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Ue(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return De(n, s).value[t];
  };
}
function Us(e, t) {
  var i;
  return (typeof t == "number" ? Ke : t instanceof Wt ? Dn : (i = Wt(t)) ? (t = i, Dn) : nd)(e, t);
}
function _d(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function kd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function $d(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Ed(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Sd(e, t, i) {
  var s, n, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), c = d + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d)));
  };
}
function Cd(e, t, i) {
  var s, n, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), c = d + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d)));
  };
}
function Ad(e, t) {
  var i = bi(e), s = i === "transform" ? rd : Us;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Cd : Sd)(i, s, ln(this, "attr." + e, t)) : t == null ? (i.local ? kd : _d)(i) : (i.local ? Ed : $d)(i, s, t));
}
function Md(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function Pd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function Od(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Pd(e, o)), i;
  }
  return n._value = t, n;
}
function Td(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && Md(e, o)), i;
  }
  return n._value = t, n;
}
function Nd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = bi(e);
  return this.tween(i, (s.local ? Od : Td)(s, t));
}
function Rd(e, t) {
  return function() {
    dn(this, e).delay = +t.apply(this, arguments);
  };
}
function Dd(e, t) {
  return t = +t, function() {
    dn(this, e).delay = t;
  };
}
function Ld(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Rd : Dd)(t, e)) : De(this.node(), t).delay;
}
function zd(e, t) {
  return function() {
    Ue(this, e).duration = +t.apply(this, arguments);
  };
}
function Ud(e, t) {
  return t = +t, function() {
    Ue(this, e).duration = t;
  };
}
function qd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? zd : Ud)(t, e)) : De(this.node(), t).duration;
}
function Fd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ue(this, e).ease = t;
  };
}
function Bd(e) {
  var t = this._id;
  return arguments.length ? this.each(Fd(t, e)) : De(this.node(), t).ease;
}
function Wd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ue(this, e).ease = i;
  };
}
function Hd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Wd(this._id, e));
}
function Vd(e) {
  typeof e != "function" && (e = vs(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new He(s, this._parents, this._name, this._id);
}
function Gd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), d = 0; d < o; ++d)
    for (var c = t[d], p = i[d], g = c.length, m = a[d] = new Array(g), y, h = 0; h < g; ++h)
      (y = c[h] || p[h]) && (m[h] = y);
  for (; d < s; ++d)
    a[d] = t[d];
  return new He(a, this._parents, this._name, this._id);
}
function jd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Yd(e, t, i) {
  var s, n, o = jd(t) ? dn : Ue;
  return function() {
    var a = o(this, e), d = a.on;
    d !== s && (n = (s = d).copy()).on(t, i), a.on = n;
  };
}
function Kd(e, t) {
  var i = this._id;
  return arguments.length < 2 ? De(this.node(), i).on.on(e) : this.each(Yd(i, e, t));
}
function Xd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Qd() {
  return this.on("end.remove", Xd(this._id));
}
function Zd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = nn(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var d = s[a], c = d.length, p = o[a] = new Array(c), g, m, y = 0; y < c; ++y)
      (g = d[y]) && (m = e.call(g, g.__data__, y, d)) && ("__data__" in g && (m.__data__ = g.__data__), p[y] = m, ki(p[y], t, i, y, p, De(g, i)));
  return new He(o, this._parents, t, i);
}
function Jd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ys(e));
  for (var s = this._groups, n = s.length, o = [], a = [], d = 0; d < n; ++d)
    for (var c = s[d], p = c.length, g, m = 0; m < p; ++m)
      if (g = c[m]) {
        for (var y = e.call(g, g.__data__, m, c), h, r = De(g, i), u = 0, f = y.length; u < f; ++u)
          (h = y[u]) && ki(h, t, i, u, y, r);
        o.push(y), a.push(g);
      }
  return new He(o, a, t, i);
}
var el = Gt.prototype.constructor;
function tl() {
  return new el(this._groups, this._parents);
}
function il(e, t) {
  var i, s, n;
  return function() {
    var o = wt(this, e), a = (this.style.removeProperty(e), wt(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function qs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function nl(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = wt(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function sl(e, t, i) {
  var s, n, o;
  return function() {
    var a = wt(this, e), d = i(this), c = d + "";
    return d == null && (c = d = (this.style.removeProperty(e), wt(this, e))), a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d));
  };
}
function ol(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, d;
  return function() {
    var c = Ue(this, e), p = c.on, g = c.value[o] == null ? d || (d = qs(t)) : void 0;
    (p !== i || n !== g) && (s = (i = p).copy()).on(a, n = g), c.on = s;
  };
}
function al(e, t, i) {
  var s = (e += "") == "transform" ? ad : Us;
  return t == null ? this.styleTween(e, il(e, s)).on("end.style." + e, qs(e)) : typeof t == "function" ? this.styleTween(e, sl(e, s, ln(this, "style." + e, t))).each(ol(this._id, e)) : this.styleTween(e, nl(e, s, t), i).on("end.style." + e, null);
}
function rl(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function dl(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && rl(e, a, i)), s;
  }
  return o._value = t, o;
}
function ll(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, dl(e, t, i ?? ""));
}
function cl(e) {
  return function() {
    this.textContent = e;
  };
}
function pl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ul(e) {
  return this.tween("text", typeof e == "function" ? pl(ln(this, "text", e)) : cl(e == null ? "" : e + ""));
}
function ml(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function hl(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && ml(n)), t;
  }
  return s._value = e, s;
}
function fl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, hl(e));
}
function gl() {
  for (var e = this._name, t = this._id, i = Fs(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], d = a.length, c, p = 0; p < d; ++p)
      if (c = a[p]) {
        var g = De(c, t);
        ki(c, e, i, p, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new He(s, this._parents, e, i);
}
function Il() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var d = { value: a }, c = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var p = Ue(this, s), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(c)), p.on = t;
    }), n === 0 && o();
  });
}
var yl = 0;
function He(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Fs() {
  return ++yl;
}
var Be = Gt.prototype;
He.prototype = {
  constructor: He,
  select: Zd,
  selectAll: Jd,
  selectChild: Be.selectChild,
  selectChildren: Be.selectChildren,
  filter: Vd,
  merge: Gd,
  selection: tl,
  transition: gl,
  call: Be.call,
  nodes: Be.nodes,
  node: Be.node,
  size: Be.size,
  empty: Be.empty,
  each: Be.each,
  on: Kd,
  attr: Ad,
  attrTween: Nd,
  style: al,
  styleTween: ll,
  text: ul,
  textTween: fl,
  remove: Qd,
  tween: bd,
  delay: Ld,
  duration: qd,
  ease: Bd,
  easeVarying: Hd,
  end: Il,
  [Symbol.iterator]: Be[Symbol.iterator]
};
function vl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var wl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: vl
};
function xl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function bl(e) {
  var t, i;
  e instanceof He ? (t = e._id, e = e._name) : (t = Fs(), (i = wl).time = rn(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && ki(c, e, t, p, a, i || xl(c, t));
  return new He(s, this._parents, e, t);
}
Gt.prototype.interrupt = vd;
Gt.prototype.transition = bl;
const ii = (e) => () => e;
function _l(e, {
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
function We(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
We.prototype = {
  constructor: We,
  scale: function(e) {
    return e === 1 ? this : new We(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new We(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Dt = new We(1, 0, 0);
We.prototype;
function Li(e) {
  e.stopImmediatePropagation();
}
function At(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function kl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function $l() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Wn() {
  return this.__zoom || Dt;
}
function El(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Sl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Cl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Al() {
  var e = kl, t = $l, i = Cl, s = El, n = Sl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, c = pd, p = on("start", "zoom", "end"), g, m, y, h = 500, r = 150, u = 0, f = 10;
  function _(I) {
    I.property("__zoom", Wn).on("wheel.zoom", U, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", z).filter(n).on("touchstart.zoom", L).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", le).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(I, S, v, x) {
    var k = I.selection ? I.selection() : I;
    k.property("__zoom", Wn), I !== k ? b(I, S, v, x) : k.interrupt().each(function() {
      w(this, arguments).event(x).start().zoom(null, typeof S == "function" ? S.apply(this, arguments) : S).end();
    });
  }, _.scaleBy = function(I, S, v, x) {
    _.scaleTo(I, function() {
      var k = this.__zoom.k, $ = typeof S == "function" ? S.apply(this, arguments) : S;
      return k * $;
    }, v, x);
  }, _.scaleTo = function(I, S, v, x) {
    _.transform(I, function() {
      var k = t.apply(this, arguments), $ = this.__zoom, M = v == null ? O(k) : typeof v == "function" ? v.apply(this, arguments) : v, C = $.invert(M), R = typeof S == "function" ? S.apply(this, arguments) : S;
      return i(N(A($, R), M, C), k, a);
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
      var $ = t.apply(this, arguments), M = this.__zoom, C = x == null ? O($) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Dt.translate(C[0], C[1]).scale(M.k).translate(
        typeof S == "function" ? -S.apply(this, arguments) : -S,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), $, a);
    }, x, k);
  };
  function A(I, S) {
    return S = Math.max(o[0], Math.min(o[1], S)), S === I.k ? I : new We(S, I.x, I.y);
  }
  function N(I, S, v) {
    var x = S[0] - v[0] * I.k, k = S[1] - v[1] * I.k;
    return x === I.x && k === I.y ? I : new We(I.k, x, k);
  }
  function O(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function b(I, S, v, x) {
    I.on("start.zoom", function() {
      w(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      w(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var k = this, $ = arguments, M = w(k, $).event(x), C = t.apply(k, $), R = v == null ? O(C) : typeof v == "function" ? v.apply(k, $) : v, B = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), V = k.__zoom, re = typeof S == "function" ? S.apply(k, $) : S, oe = c(V.invert(R).concat(B / V.k), re.invert(R).concat(B / re.k));
      return function(G) {
        if (G === 1) G = re;
        else {
          var X = oe(G), W = B / X[2];
          G = new We(W, R[0] - X[0] * W, R[1] - X[1] * W);
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
        new _l(I, {
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
      v.mouse = [$, x.invert($)], pi(this), v.start();
    }
    At(I), v.wheel = setTimeout(M, r), v.zoom("mouse", i(N(A(x, k), v.mouse[0], v.mouse[1]), v.extent, a));
    function M() {
      v.wheel = null, v.end();
    }
  }
  function D(I, ...S) {
    if (y || !e.apply(this, arguments)) return;
    var v = I.currentTarget, x = w(this, S, !0).event(I), k = Te(I.view).on("mousemove.zoom", R, !0).on("mouseup.zoom", B, !0), $ = et(I, v), M = I.clientX, C = I.clientY;
    zr(I.view), Li(I), x.mouse = [$, this.__zoom.invert($)], pi(this), x.start();
    function R(V) {
      if (At(V), !x.moved) {
        var re = V.clientX - M, oe = V.clientY - C;
        x.moved = re * re + oe * oe > u;
      }
      x.event(V).zoom("mouse", i(N(x.that.__zoom, x.mouse[0] = et(V, v), x.mouse[1]), x.extent, a));
    }
    function B(V) {
      k.on("mousemove.zoom mouseup.zoom", null), Ur(V.view, x.moved), At(V), x.event(V).end();
    }
  }
  function z(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, x = et(I.changedTouches ? I.changedTouches[0] : I, this), k = v.invert(x), $ = v.k * (I.shiftKey ? 0.5 : 2), M = i(N(A(v, $), x, k), t.apply(this, S), a);
      At(I), d > 0 ? Te(this).transition().duration(d).call(b, M, x, I) : Te(this).call(_.transform, M, x, I);
    }
  }
  function L(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = I.touches, x = v.length, k = w(this, S, I.changedTouches.length === x).event(I), $, M, C, R;
      for (Li(I), M = 0; M < x; ++M)
        C = v[M], R = et(C, this), R = [R, this.__zoom.invert(R), C.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== R[2] && (k.touch1 = R, k.taps = 0) : (k.touch0 = R, $ = !0, k.taps = 1 + !!g);
      g && (g = clearTimeout(g)), $ && (k.taps < 2 && (m = R[0], g = setTimeout(function() {
        g = null;
      }, h)), pi(this), k.start());
    }
  }
  function q(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), x = I.changedTouches, k = x.length, $, M, C, R;
      for (At(I), $ = 0; $ < k; ++$)
        M = x[$], C = et(M, this), v.touch0 && v.touch0[2] === M.identifier ? v.touch0[0] = C : v.touch1 && v.touch1[2] === M.identifier && (v.touch1[0] = C);
      if (M = v.that.__zoom, v.touch1) {
        var B = v.touch0[0], V = v.touch0[1], re = v.touch1[0], oe = v.touch1[1], G = (G = re[0] - B[0]) * G + (G = re[1] - B[1]) * G, X = (X = oe[0] - V[0]) * X + (X = oe[1] - V[1]) * X;
        M = A(M, Math.sqrt(G / X)), C = [(B[0] + re[0]) / 2, (B[1] + re[1]) / 2], R = [(V[0] + oe[0]) / 2, (V[1] + oe[1]) / 2];
      } else if (v.touch0) C = v.touch0[0], R = v.touch0[1];
      else return;
      v.zoom("touch", i(N(M, C, R), v.extent, a));
    }
  }
  function le(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), x = I.changedTouches, k = x.length, $, M;
      for (Li(I), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, h), $ = 0; $ < k; ++$)
        M = x[$], v.touch0 && v.touch0[2] === M.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === M.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (M = et(M, this), Math.hypot(m[0] - M[0], m[1] - M[1]) < f)) {
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
    return arguments.length ? (d = +I, _) : d;
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
var Ml = Object.defineProperty, Pl = Object.getOwnPropertyDescriptor, fe = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Pl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ml(t, i, n), n;
};
function Ol(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, d = s.y - i.y, c = n * d - o * a;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * d - (i.y - e.y) * a) / c, g = ((i.x - e.x) * o - (i.y - e.y) * n) / c;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * o, t: p };
}
function Tl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), d = t.x + a * s, c = t.y + a * n;
  return { dist: Math.hypot(e.x - d, e.y - c), t: a };
}
function Nl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], d = Math.hypot(a.x - o.x, a.y - o.y) || 1, c = (a.x - o.x) / d, p = (a.y - o.y) / d, g = t.map(([y, h]) => Ol(o, a, y, h)).filter((y) => y !== null).filter((y) => y.t * d > i + 2 && (1 - y.t) * d > i + 2).sort((y, h) => y.t - h.t);
    let m = -1 / 0;
    for (const y of g)
      y.t * d - i <= m + 2 || (s += ` L ${y.x - c * i} ${y.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${y.x + c * i} ${y.y + p * i}`, m = y.t * d + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const gt = {
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
let me = class extends Re {
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
    this._zoomBehavior = Al().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, d = this.fitInsets.bottom ?? 0, c = Math.max(80, s.width - n - o), p = Math.max(80, s.height - a - d), g = Math.min(...t.map((f) => f.x - f.w / 2)) - e, m = Math.max(...t.map((f) => f.x + f.w / 2)) + e, y = Math.min(...t.map((f) => f.y - f.h / 2)) - e, h = Math.max(...t.map((f) => f.y + f.h / 2)) + e, r = Math.max(0.15, Math.min(c / (m - g), p / (h - y), 1.25)), u = Dt.translate(
      n + c / 2 - r * (g + m) / 2,
      a + p / 2 - r * (y + h) / 2
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
      const d = (n = this._dragGroup) == null ? void 0 : n.get(o);
      if (d)
        return { x: e.x + (d.x - a.x), y: e.y + (d.y - a.y) };
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
        const n = this.nodePos(s), o = n.x - s.w / 2 + 10 + e.w / 2, a = n.x + s.w / 2 - 10 - e.w / 2, d = n.y - s.h / 2 + 34 + e.h / 2, c = n.y + s.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), a), i = Math.min(Math.max(i, d), c);
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
    ) : null, d = a ? new Map(a.map((f) => [f.id, this.nodePos(f)])) : null, c = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, m = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], y = () => {
      const f = [], _ = p === "menu" ? this.scene.nodes.filter((A) => A.kind === "ui-app") : this.scene.nodes.filter((A) => A.id === t.parentId);
      for (const A of _) {
        const N = this.scene.nodes.filter((P) => P.parentId === A.id && m.includes(P.kind ?? "") && P.id !== t.id).sort((P, U) => P.y - U.y), O = A.x - A.w / 2 + 10, b = A.x + A.w / 2 - 10;
        for (const P of N) f.push({ x1: O, x2: b, y: P.y - P.h / 2 - 3, appId: A.id, beforeId: P.id });
        const w = N[N.length - 1];
        f.push({
          x1: O,
          x2: b,
          y: w ? w.y + w.h / 2 + 3 : A.y - A.h / 2 + 34 + 8,
          appId: A.id,
          beforeId: null
        });
      }
      return f;
    }, h = (f) => {
      const _ = this.nodeIdAt(f), A = _ && _ !== t.id ? this.scene.nodes.find((N) => N.id === _) : void 0;
      return A ? A.kind === "external-system" ? A.id : A.parentId ?? null : null;
    }, r = (f) => {
      if ((f.buttons & 1) === 0) {
        u(f);
        return;
      }
      const _ = this.toScene(f), A = _.x - i.x, N = _.y - i.y;
      if (!(!n && Math.hypot(A, N) < 3 / this._t.k))
        if (n = !0, a && d) {
          const O = /* @__PURE__ */ new Map();
          for (const b of a) {
            const w = d.get(b.id), P = this.clampToParent(b, w.x + A, w.y + N);
            O.set(b.id, { x: P.x, y: P.y });
          }
          this._dragGroup = O;
        } else if (g) {
          this._dragPos = { id: t.id, x: s.x + A, y: s.y + N }, this._menuSlots || (this._menuSlots = { slots: y(), active: null, nestRowId: null });
          const O = this.scene.nodes.filter(
            (w) => m.includes(w.kind ?? "") && w.id !== t.id && Math.abs(_.x - w.x) <= w.w / 2 + 8
          ), b = p === "menu" ? O.find((w) => Math.abs(_.y - w.y) < w.h * 0.28) : void 0;
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
        } else c(f) ? (this._dragPos = { id: t.id, x: s.x + A, y: s.y + N }, this._hoverNodeId = h(f)) : (this._dragPos = this.clampToParent(t, s.x + A, s.y + N), this._hoverNodeId = null);
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
          const N = _.slots[_.active];
          this.emit(A, { id: t.id, appId: N.appId, beforeId: N.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (c(f)) {
          const _ = h(f);
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
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, d = this.scene.nodes.filter((u) => u.parentId === t.id), c = Math.min(...d.map((u) => u.x - u.w / 2)), p = Math.max(...d.map((u) => u.x + u.w / 2)), g = Math.min(...d.map((u) => u.y - u.h / 2)), m = Math.max(...d.map((u) => u.y + u.h / 2)), y = oo(
      d.map((u) => ({ dx: u.x - a.x, dy: u.y - a.y, w: u.w, h: u.h })),
      { w: n, h: o }
    ), h = (u) => {
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
      const _ = a.x - i * a.w / 2, A = a.y - s * a.h / 2, N = i > 0 ? Math.max(f.x, _ + n, d.length ? p + 10 : -1 / 0) : Math.min(f.x, _ - n, d.length ? c - 10 : 1 / 0), O = s > 0 ? Math.max(f.y, A + o, d.length ? m + 10 : -1 / 0) : Math.min(f.y, A - o, d.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + N) / 2,
        y: (A + O) / 2,
        w: Math.abs(N - _),
        h: Math.abs(O - A)
      };
    }, r = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", r), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", r);
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
      const d = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, o = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o);
      const d = this.nodeIdAt(a);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
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
    const { x: s, y: n } = this.nodePos(e), o = t - s, a = i - n, d = e.w / 2, c = e.h / 2;
    if (o === 0 && a === 0) return { x: s, y: n };
    const p = 1 / Math.max(Math.abs(o) / d, Math.abs(a) / c);
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
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, d = s[s.length - 1] ?? n;
    let c = this.borderPoint(t, a.x, a.y), p = this.borderPoint(i, d.x, d.y);
    if (!s.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const m = Math.hypot(p.x - c.x, p.y - c.y) || 1, y = -(p.y - c.y) / m * g, h = (p.x - c.x) / m * g;
        c = { x: c.x + y, y: c.y + h }, p = { x: p.x + y, y: p.y + h };
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
      const d = this.toScene(a), c = [...this._wpDrag.points];
      c[this._wpDrag.index] = d, this._wpDrag = { ...this._wpDrag, points: c };
    }, o = () => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this._wpDrag && s && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let s = 0; s < e.length - 1; s++) {
      const { dist: n } = Tl(t, e[s], e[s + 1]);
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
        d();
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
    }, d = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", d), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", d);
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
    const s = e.color ?? "#64748b", n = this.selectedId === e.id, o = n || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), d = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, c = t.slice(1, -1);
    return J`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Nl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? J`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
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
      const m = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === g;
      return J`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
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
    var y, h, r, u;
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.w : e.w, c = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = d / 2, g = c / 2, m = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return J`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (r = this._dragGroup) != null && r.has(e.id) ? "none" : "auto"}
         @pointerdown=${(f) => this.onNodePointerDown(f, e)}
         @dblclick=${(f) => {
      f.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? J`<rect x=${-p - 4} y=${-g - 4} width=${d + 8} height=${c + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${d} height=${c} rx=${a ? 6 : 10}
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
        ${e.symbol && gt[e.symbol] && !a ? J`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${gt[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && gt[e.symbol] ? J`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${gt[e.symbol]}
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
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? J`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
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
      const d = this.toScene(a);
      !i && Math.hypot(d.x - t.x, d.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: d });
    }, o = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", s), i && this._rubber) {
        const { a, b: d } = this._rubber, c = Math.min(a.x, d.x), p = Math.max(a.x, d.x), g = Math.min(a.y, d.y), m = Math.max(a.y, d.y), y = this.scene.nodes.filter((h) => {
          const r = this.nodePos(h);
          return r.x >= c && r.x <= p && r.y >= g && r.y <= m;
        }).map((h) => h.id);
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
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, d = n.width / this._t.k, c = n.height / this._t.k;
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
            width=${d * s}
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
me.styles = lt`
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
  se({ attribute: !1 })
], me.prototype, "scene", 2);
fe([
  se({ attribute: !1 })
], me.prototype, "selectedId", 2);
fe([
  se({ attribute: !1 })
], me.prototype, "selectedIds", 2);
fe([
  se({ type: Boolean })
], me.prototype, "connectable", 2);
fe([
  se({ attribute: !1 })
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
  se({ attribute: !1 })
], me.prototype, "fitInsets", 2);
me = fe([
  ct("modux-canvas")
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
const ht = (e) => e.trim().toLowerCase();
function Rl(e, t) {
  var D, z, L, q, le;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((I) => [I.id, I.name])), n = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((S) => ({ ...S, moduleId: I.id }))
  ), o = new Set(n.map((I) => I.id)), a = e.aggregates ?? [], d = new Set(
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
  const m = /* @__PURE__ */ new Map();
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
    }), m.set(ht(I.name), I.id);
  const y = (I) => {
    if (!I || !I.trim()) return null;
    const S = m.get(ht(I));
    if (S) return S;
    const v = `evname:${ht(I)}`;
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
  }, h = (I) => {
    const S = g.find((x) => x.id === I.id) ?? g.find((x) => I.name && ht(x.name) === ht(I.name)), v = (S == null ? void 0 : S.id) ?? (I.id || (I.name ? `rm:${ht(I.name)}` : null));
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
          (B) => (B.useCases ?? []).some((V) => V.id === M.externalUseCaseId)
        );
        if (!C) continue;
        const R = (D = (C.useCases ?? []).find((B) => B.id === M.externalUseCaseId)) == null ? void 0 : D.name;
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
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Llama a ${R} del sistema externo` : void 0
        });
      }
      for (const M of k) {
        const C = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((V) => V.id === M.mcpServerId)
        );
        if (!C) continue;
        const R = (z = (C.mcpServers ?? []).find((B) => B.id === M.mcpServerId)) == null ? void 0 : z.name;
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
          label: R,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: R ? `Consume las herramientas del servidor MCP ${R}` : void 0
        });
      }
      for (const M of x) {
        const C = (e.rags ?? []).find((R) => R.id === M.ragId);
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
          for (const R of C.sourceReadModelIds ?? []) {
            const B = h({ id: R });
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
    !i.nodes.has(I.domainEventId) || !(i.nodes.has(I.sourceId) && (o.has(I.sourceId) || a.some((v) => v.id === I.sourceId) || d.has(I.sourceId))) || ue(i, {
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
    const x = h({ id: I.readModelId, name: I.readModelName });
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
      const v = y(I.triggerEvent), x = h({ name: I.readModelName ?? `${I.triggerEvent}View` });
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
  const N = [...i.nodes.values()], O = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    O.has(I.targetId) || O.set(I.targetId, []), O.get(I.targetId).push(I.sourceId);
  const b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set(), P = (I) => {
    const S = b.get(I);
    if (S !== void 0) return S;
    if (w.has(I)) return 0;
    w.add(I);
    const v = O.get(I) ?? [], x = v.length ? 1 + Math.max(...v.map(P)) : 0;
    return w.delete(I), b.set(I, x), x;
  }, U = /* @__PURE__ */ new Map();
  for (const I of N) {
    const S = t[I.id];
    if (S) {
      I.x = S.x, I.y = S.y;
      continue;
    }
    const v = P(I.id), x = U.get(v) ?? 0;
    U.set(v, x + 1), I.x = 140 + v * 260, I.y = 110 + x * 110;
  }
  return { nodes: N, edges: i.edges };
}
const Dl = 190, Ll = 56, Hn = 180, zl = 56, Ul = 150, ql = 44, Vn = 250, Gn = 100;
function Fl(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Bl(e, t) {
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
function Wl(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (d) => {
    var c;
    return (c = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === d)) == null ? void 0 : c.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((d) => {
    var f;
    const c = new Map(d.steps.map((_) => [_.id, _])), p = new Map(d.steps.map((_) => [_.id, Fl(_, c)])), g = /* @__PURE__ */ new Map();
    for (const _ of d.steps) {
      const A = p.get(_.id) ?? 0;
      g.set(A, (g.get(A) ?? 0) + 1);
    }
    const m = Math.max(1, ...g.values()), y = Bl(e, d);
    if (y && !n.has(y.id)) {
      n.add(y.id);
      const _ = t[y.id] ?? { x: 140, y: a };
      i.push({
        id: y.id,
        label: y.label,
        x: _.x,
        y: _.y,
        w: Ul,
        h: ql,
        kind: y.kind,
        symbol: y.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: y.kind === "aggregate" ? "AGGREGATE" : y.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const h = t[d.id] ?? { x: 420, y: a };
    i.push({
      id: d.id,
      label: d.name,
      x: h.x,
      y: h.y,
      w: Dl,
      h: Ll,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${d.name}${d.triggerEvent ? ` — arranca con ${d.triggerEvent}` : ""}${d.onCompletionEventName ? ` · emite ${d.onCompletionEventName} al completar` : ""}`
    }), y && s.push({
      id: `wft:${d.id}`,
      sourceId: y.id,
      targetId: d.id,
      kind: "workflow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    });
    const r = /* @__PURE__ */ new Map();
    let u = 0;
    for (const _ of d.steps) {
      const A = p.get(_.id) ?? 0;
      u = Math.max(u, A);
      const N = r.get(A) ?? 0;
      r.set(A, N + 1);
      const O = t[_.id] ?? {
        x: h.x + (A + 1) * Vn,
        y: a + (N - (g.get(A) - 1) / 2) * Gn
      }, b = o(_.targetUseCaseId);
      i.push({
        id: _.id,
        label: _.name,
        x: O.x,
        y: O.y,
        w: Hn,
        h: zl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: b ? `→ ${b}` : "∅ sin use case",
        tooltip: `${_.name}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${b ? ` · lanza ${b}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}`
      });
      const w = (_.dependsOnStepIds ?? []).filter((P) => c.has(P));
      w.length === 0 && s.push({
        id: `wfs:${d.id}:${_.id}`,
        sourceId: d.id,
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
    if (d.onCompletionEventName) {
      const _ = `done:${d.id}`, A = t[_] ?? { x: h.x + (u + 2) * Vn, y: a };
      i.push({
        id: _,
        label: d.onCompletionEventName,
        x: A.x,
        y: A.y,
        w: Hn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const N = new Set(d.steps.flatMap((b) => b.dependsOnStepIds ?? [])), O = d.steps.filter((b) => !N.has(b.id));
      for (const b of O.length ? O : [])
        s.push({
          id: `wfd:${d.id}:${b.id}`,
          sourceId: b.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      d.steps.length || s.push({
        id: `wfd:${d.id}`,
        sourceId: d.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, m + 1) * Gn + 60;
  }), { nodes: i, edges: s };
}
const jn = 250, Ge = 30, ni = 6, Hl = 16, Yn = 190, Vl = 60, Gl = 170, si = 44;
function jl(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ge(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Yl(e) {
  const t = [], i = (s, n, o) => {
    for (const a of s ?? []) {
      const d = [...n, a.label];
      t.push({ entry: a, path: d, depth: o }), i(a.children ?? [], d, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Kl(e, t) {
  var _, A, N, O;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], a = (b) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.useCases ?? []).find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  }, d = (b) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.queryServices ?? []).find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  }, c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const b of n) {
    const w = Yl(b), P = Math.max(
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
      w: jn,
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
      const S = jl(b.id, q, le), v = I * Hl;
      if (i.push({
        id: S,
        label: q.label,
        x: U.x + v / 2,
        y: L,
        w: jn - 20 - v,
        h: Ge,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (A = q.children) != null && A.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (N = q.children) != null && N.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: b.id,
        tooltip: (O = q.children) != null && O.length ? "Agrupador (con submenú): no puede abrir nada" : q.pageId ? `Abre ${q.pageId}` : q.uiAdapterId ? `Abre la app ${q.uiAdapterId}` : q.useCaseId ? `Lanza ${q.useCaseId}` : q.aggregateId ? `CRUD inferido sobre ${q.aggregateId}` : q.queryOperationId ? `Listado con filtros de ${q.queryOperationId}` : "Entrada de menú sin destino"
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
  const m = (b) => {
    var w;
    return ((w = o.find((P) => P.id === b)) == null ? void 0 : w.name) ?? b;
  };
  for (const b of o) {
    const w = t[b.id] ?? { x: 640, y: g }, P = b.type === "WIZARD" ? b.wizardSteps ?? [] : [], U = P.length ? 54 + P.length * (Ge + ni) : Vl;
    g = w.y + U + 90, i.push({
      id: b.id,
      label: b.name,
      x: w.x,
      y: w.y,
      w: Yn,
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
        label: `${L + 1}. ${z.label ?? (z.pageId ? m(z.pageId) : "Paso")}${z.pageId ? "" : " ⌁"}`,
        x: w.x,
        y: D,
        w: Yn - 20,
        h: Ge,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: z.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: b.id,
        tooltip: z.pageId ? `Paso ${L + 1}: ${m(z.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${L + 1}, sin página — arrastra el asa hasta la página que lo implementa`
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
      label: d(b.listingQueryServiceId),
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
      w: Gl,
      h: si,
      kind: w.kind,
      symbol: w.symbol,
      fill: "#ffffff",
      stroke: w.stroke
    });
  }
  let h = 120;
  for (const b of e.identityProviders ?? []) {
    const w = t[b.id] ?? { x: -320, y: h };
    h = w.y + 70 + 40, i.push({
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
const Xl = 168, Ql = 48;
function Zl(e, t) {
  const i = [], s = [], n = e.models ?? [], o = e.modelMappings ?? [], a = (m) => {
    var y;
    return ((y = n.find((h) => h.id === m)) == null ? void 0 : y.name) ?? m ?? "?";
  };
  n.forEach((m, y) => {
    const h = t[m.id] ?? { x: 200 + y % 5 * 260, y: 140 + Math.floor(y / 5) * 150 };
    i.push({
      id: m.id,
      label: m.name,
      x: h.x,
      y: h.y,
      w: Xl,
      h: Ql,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado`
    });
  });
  const d = new Set(i.map((m) => m.id));
  for (const m of o)
    !m.sourceModelId || !m.targetModelId || !d.has(m.sourceModelId) || !d.has(m.targetModelId) || s.push({
      id: `mapping:${m.id}`,
      sourceId: m.sourceModelId,
      targetId: m.targetModelId,
      kind: "model-mapping",
      color: "#7c3aed",
      label: m.name,
      arrow: !0,
      tooltip: `${m.name} — las reglas campo a campo viven en su ficha; Supr lo elimina`
    });
  const c = new Set(
    o.filter((m) => m.sourceModelId && m.targetModelId).map((m) => `${m.sourceModelId}->${m.targetModelId}`)
  ), p = new Map(
    e.modules.flatMap((m) => (m.useCases ?? []).map((y) => [y.id, y]))
  ), g = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const y of m.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const h = p.get(y.useCaseId);
        if (!(h != null && h.inputModelId) || h.inputModelId === m.modelId) continue;
        const r = `${m.modelId}->${h.inputModelId}`;
        c.has(r) || g.has(r) || (g.add(r), !(!d.has(m.modelId) || !d.has(h.inputModelId)) && s.push({
          id: `mapgap:${m.id}:${y.useCaseId}`,
          sourceId: m.modelId,
          targetId: h.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${m.name}) llama a ${h.name}: falta mapear ${a(m.modelId)} → ${a(h.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function Jl(e, t) {
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
  }, a = await s.layout(o), d = {};
  for (const c of a.children ?? [])
    d[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return d;
}
var ec = Object.defineProperty, tc = Object.getOwnPropertyDescriptor, Le = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? tc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && ec(t, i, n), n;
};
const ic = /* @__PURE__ */ new Set([
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
let Se = class extends Re {
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
        const d = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - d.left,
          y1: e.clientY - d.top,
          x2: e.clientX - d.left,
          y2: e.clientY - d.top
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
        const a = (s = this.shadowRoot) == null ? void 0 : s.elementFromPoint(e.clientX, e.clientY), d = (n = a == null ? void 0 : a.closest) == null ? void 0 : n.call(a, ".n3"), c = (d == null ? void 0 : d.dataset.nodeId) ?? null;
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
    const a = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = a.transformPoint(new DOMPoint(0, 0, 0, 1)), c = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, m = t - i.top, y = c.x - g * c.w, h = p.x - g * p.w, r = c.y - m * c.w, u = p.y - m * p.w, f = g * d.w - d.x, _ = m * d.w - d.y, A = y * u - h * r;
    return A ? { x: (f * u - h * _) / A, y: (y * _ - f * r) / A } : { ...this._center };
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
    const t = this.depths(), i = new Map(e.map((f) => [f.id, f])), s = Math.min(...e.map((f) => f.x - f.w / 2)) - 60, n = Math.max(...e.map((f) => f.x + f.w / 2)) + 60, o = Math.min(...e.map((f) => f.y - f.h / 2)) - 60, a = Math.max(...e.map((f) => f.y + f.h / 2)) + 60, d = (s + n) / 2, c = (o + a) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (n - s), p.height / (a - o), 1) * 0.9 : 0.5, m = this._k * g;
    this._kUsed = m, this._center = { x: d, y: c };
    const y = 30, h = this._liveMove, r = (f) => f.x + ((h == null ? void 0 : h.id) === f.id ? h.dx : 0), u = (f) => f.y + ((h == null ? void 0 : h.id) === f.id ? h.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-c}px, 0)"
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
      const N = (t.get(_.id) ?? 0) * y + 2, O = (t.get(A.id) ?? 0) * y + 2, b = r(A) - r(_), w = u(A) - u(_), P = O - N, U = Math.hypot(b, w), D = Math.hypot(U, P), z = Math.atan2(w, b) * 180 / Math.PI, L = Math.atan2(P, U) * 180 / Math.PI, q = f.color ?? "#64748b", le = f.dashed ? `repeating-linear-gradient(90deg, ${q} 0 6px, transparent 6px 10px)` : q;
      return E`<div
              class="edge3"
              style="
                left: ${r(_)}px; top: ${u(_)}px; width: ${D}px; height: 1.7px;
                transform: translateZ(${N}px) rotateZ(${z}deg) rotateY(${-L}deg);
                background: ${le};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((f) => {
      const _ = t.get(f.id) ?? 0, A = f.container || _ === 0, N = this._hoverTargetId === f.id;
      return E`
              <div
                class="n3 ${f.container ? "container3" : ""} ${this.selectedId === f.id ? "selected3" : ""} ${N ? "hover3" : ""}"
                data-node-id=${f.id}
                data-kind=${f.kind}
                title=${f.tooltip ?? f.label}
                style="
                  left: ${r(f) - f.w / 2}px; top: ${u(f) - f.h / 2}px;
                  width: ${f.w}px; height: ${f.h}px;
                  transform: translateZ(${_ * y + (N ? 8 : 0)}px)${N ? " scale(1.06)" : ""};
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
      if (!f || !ic.has(f.kind)) return "";
      const _ = (t.get(f.id) ?? 0) * y + 4;
      return [
        [r(f) + f.w / 2, u(f)],
        [r(f) - f.w / 2, u(f)],
        [r(f), u(f) + f.h / 2],
        [r(f), u(f) - f.h / 2]
      ].map(
        ([N, O]) => E`<div
                class="h3"
                data-source-id=${f.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${N}px; top: ${O}px; transform: translateZ(${_}px)"
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
Se.styles = lt`
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
Le([
  se({ attribute: !1 })
], Se.prototype, "scene", 2);
Le([
  se({ attribute: !1 })
], Se.prototype, "selectedId", 2);
Le([
  se({ attribute: !1 })
], Se.prototype, "connectable", 2);
Le([
  F()
], Se.prototype, "_rx", 2);
Le([
  F()
], Se.prototype, "_rz", 2);
Le([
  F()
], Se.prototype, "_k", 2);
Le([
  F()
], Se.prototype, "_pan", 2);
Le([
  F()
], Se.prototype, "_liveMove", 2);
Le([
  F()
], Se.prototype, "_connect", 2);
Le([
  F()
], Se.prototype, "_hoverTargetId", 2);
Se = Le([
  ct("modux-tilt")
], Se);
var nc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, he = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? sc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && nc(t, i, n), n;
};
const Kn = [
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
let ae = class extends Re {
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
      for (const d of a.children ?? []) s(d);
    }, n = (a) => {
      for (const d of a ?? [])
        d.id === t ? s(d) : n(d.children);
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
    return ae.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var n;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((c) => c.kind === "tab"), d = a.find((c) => c.id === this._activeTabs[e.id]) ?? a[0];
      d && (e = d);
    }
    if (t === "into" && !ae.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), s = t === "after" ? ((n = this.nextSiblingOf(e.id)) == null ? void 0 : n.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: s };
  }
  onCmpDrop(e, t, i) {
    var o, a;
    const s = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !s) {
      const d = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
      if (!d) return;
      let c;
      try {
        c = JSON.parse(d);
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
        const m = t.filter((h) => h.kind === "tab"), y = m.find((h) => h.id === this._activeTabs[e.id]) ?? m[0];
        n = E`
          <div class="tabbar">
            ${m.map(
          (h, r) => E`<span
                class=${h === y ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(u) => {
            u.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: h.id }, this.emitEvent("component-selected", { componentId: h.id });
          }}
                @dblclick=${(u) => {
            u.stopPropagation(), this._cmp = { ...h };
          }}
                @dragstart=${(u) => {
            var f, _;
            u.stopPropagation(), this._dragCmpId = h.id, (_ = u.dataTransfer) == null || _.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: h.id })
            );
          }}
                @dragover=${(u) => {
            var f;
            ((f = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : f.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var O, b;
            const f = this._dragCmpId;
            if (!f || f === h.id || ((O = this.nodeById(f)) == null ? void 0 : O.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const _ = u.currentTarget.getBoundingClientRect(), N = u.clientX - _.left < _.width / 2 ? h.id : ((b = m[r + 1]) == null ? void 0 : b.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, N !== f && this.emitEvent("component-moved", {
              componentId: f,
              toParentId: e.id,
              beforeComponentId: N
            });
          }}
                >${h.title ?? "Pestaña"}</span
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
                  ${y === 0 ? this.renderComponent(m) : ie}
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
        const y = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = y.length ? E`<div class="grid-lay">
              ${y.slice(0, 6).map(
          (h) => E`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${h.label ?? h.name}</label>${this.control(h)}</div>`
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
          ${e.queryOperationId ? ie : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
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
    const o = ae.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), d = (m) => {
      var y, h;
      m.stopPropagation(), this._dragCmpId = e.id, (h = m.dataTransfer) == null || h.setData(
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
      @dragstart=${d}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(m) => {
      var h;
      m.preventDefault(), m.stopPropagation();
      const y = ((h = m.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...y].includes("application/x-modux-cmp") || [...y].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var y, h, r;
      this._foreignOver = !1, !(!this._dragCmpId && !((r = (h = (y = m.dataTransfer) == null ? void 0 : y.types) == null ? void 0 : h.includes) != null && r.call(h, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${d}
        >${ae.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
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
    var n, o, a, d;
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
                      >${((d = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : d.name) ?? e.queryOperationId}
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
              ${Kn.map((c) => E`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
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
        ([a, d]) => E`<option value=${a} ?selected=${n === a}>${d}</option>`
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
      const a = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), d = a[o];
      return E`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${n.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(c) => {
        c.stopPropagation(), this._dragWizKey = d;
      }}
                      @dragover=${(c) => {
        this._dragWizKey && (c.preventDefault(), c.stopPropagation());
      }}
                      @drop=${(c) => {
        const p = this._dragWizKey;
        if (this._dragWizKey = null, !p || p === d) return;
        c.preventDefault(), c.stopPropagation();
        const g = c.currentTarget.getBoundingClientRect(), y = c.clientX - g.left < g.width / 2 ? d : a[o + 1] ?? null;
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
      var o, a, d;
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
                        >${((d = this.mappings.find((c) => c.id === this._btn.mappingId)) == null ? void 0 : d.name) ?? this._btn.mappingId}
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
              ${Kn.map(
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
ae.styles = lt`
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
he([
  se({ attribute: !1 })
], ae.prototype, "page", 2);
he([
  se({ type: Boolean, reflect: !0 })
], ae.prototype, "framed", 2);
he([
  se({ attribute: !1 })
], ae.prototype, "models", 2);
he([
  se({ attribute: !1 })
], ae.prototype, "mappings", 2);
he([
  se({ attribute: !1 })
], ae.prototype, "useCases", 2);
he([
  se({ attribute: !1 })
], ae.prototype, "queryOps", 2);
he([
  se({ attribute: !1 })
], ae.prototype, "selectedCmpId", 2);
he([
  F()
], ae.prototype, "_editing", 2);
he([
  F()
], ae.prototype, "_dragId", 2);
he([
  F()
], ae.prototype, "_overId", 2);
he([
  F()
], ae.prototype, "_rename", 2);
he([
  F()
], ae.prototype, "_route", 2);
he([
  F()
], ae.prototype, "_btn", 2);
he([
  F()
], ae.prototype, "_cmp", 2);
he([
  F()
], ae.prototype, "_dragCmpId", 2);
he([
  F()
], ae.prototype, "_dragWizKey", 2);
he([
  F()
], ae.prototype, "_overCmpId", 2);
he([
  F()
], ae.prototype, "_overCmpPos", 2);
he([
  F()
], ae.prototype, "_foreignOver", 2);
he([
  F()
], ae.prototype, "_activeTabs", 2);
ae = he([
  ct("modux-page-designer")
], ae);
var oc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, ke = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ac(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && oc(t, i, n), n;
};
const Bs = 460, rc = 540, dc = 660;
let ve = class extends Re {
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
        const a = this.pages.findIndex((c) => c.id === o), d = this.posOf(o, a);
        this.emit("element-selected", { elementType: "node", id: o, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: o, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, e.preventDefault();
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
    var g, m, y, h, r, u;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), s = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (y = o == null ? void 0 : o.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), d = (h = a == null ? void 0 : a.closest) == null ? void 0 : h.call(a, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${n}:${d.dataset.btnUc}`;
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
    var y, h, r, u;
    const i = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), s = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!s) return null;
    const n = s.dataset.pageId, o = s.querySelector("modux-page-designer"), a = (r = o == null ? void 0 : o.shadowRoot) == null ? void 0 : r.elementFromPoint(e, t), d = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    if (!d) return { pageId: n, componentId: null, pos: "into" };
    const c = d.dataset.cmpKind ?? "", p = d.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), m = ae.LEAF_KINDS.has(c) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: n, componentId: d.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Bs, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * rc, y: Math.floor(t / 3) * dc };
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
ve.styles = lt`
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
      width: ${Bs}px;
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
  se({ attribute: !1 })
], ve.prototype, "pages", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "layout", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "sizes", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "selectedId", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "selectedIds", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "models", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "mappings", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "useCases", 2);
ke([
  se({ attribute: !1 })
], ve.prototype, "queryOps", 2);
ke([
  se({ attribute: !1 })
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
  ct("modux-figma")
], ve);
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, Ws = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? cc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && lc(t, i, n), n;
};
const pc = {
  root: "#334155",
  module: "#0369a1",
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
}, Xn = {
  root: "Sistema",
  module: "Bounded context",
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
}, uc = {
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
}, Qn = [30, 20, 13, 9.5, 7.5], Zn = [0, 180, 118, 80, 58], mc = 0.055, Jn = 0.86, hc = 2600, oi = 240, es = 0.16, ts = 0.015;
let wi = class extends Re {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map();
  }
  connectedCallback() {
    super.connectedCallback(), this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), cancelAnimationFrame(this.raf), (e = this.ro) == null || e.disconnect();
  }
  firstUpdated() {
    var e;
    this.canvas = this.renderRoot.querySelector("canvas") ?? void 0, this.ctx = ((e = this.canvas) == null ? void 0 : e.getContext("2d")) ?? void 0, this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(this), this.resize(), this.buildTree(), this.raf = requestAnimationFrame(() => this.tick());
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
    this.root && this.rememberSubtree(this.root), this.root = this.makeNode("root", "root", "Sistema", 0, void 0), this.root.x = 0, this.root.y = 0, this.prevByKey.has(this.root.key) || (this.root.expanded = !0), this.materialize(this.root);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, i, s, n) {
    const o = `${(n == null ? void 0 : n.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(o), d = () => (Math.random() - 0.5) * 10;
    return {
      key: o,
      refId: t,
      kind: e,
      label: i,
      color: pc[e] ?? "#64748b",
      depth: s,
      parent: n,
      expanded: (a == null ? void 0 : a.expanded) ?? !1,
      x: (a == null ? void 0 : a.x) ?? (n ? n.x + d() : 0),
      y: (a == null ? void 0 : a.y) ?? (n ? n.y + d() : 0),
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
        const n = t.modules.find((o) => o.id === e.refId);
        return n ? [
          ...(t.aggregates ?? []).filter((o) => o.moduleId === e.refId).map((o) => s("aggregate", o.id, o.name)),
          ...(n.useCases ?? []).map((o) => s(o.policy ? "policy" : "use-case", o.id, o.name)),
          ...(n.domainEvents ?? []).map((o) => s("domain-event", o.id, o.name)),
          ...(n.applicationEvents ?? []).map((o) => s("application-event", o.id, o.name)),
          ...(n.readModels ?? []).map((o) => s("read-model", o.id, o.name)),
          ...(n.domainServices ?? []).map((o) => s("domain-service", o.id, o.name)),
          ...(n.queryServices ?? []).map((o) => s("query-service", o.id, o.name)),
          ...(n.scheduledTriggers ?? []).map((o) => s("scheduled-trigger", o.id, o.name)),
          ...(t.etlFlows ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => s("etl-flow", o.id, o.name)),
          ...(t.notifications ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => s("notification", o.id, o.name)),
          ...(t.documents ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => s("document", o.id, o.name))
        ] : [];
      }
      case "aggregate":
        return (t.entities ?? []).filter((n) => n.aggregateId === e.refId).map((n) => s("entity", n.id, n.name));
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
        const n = (t.uiApps ?? []).find((d) => d.id === e.refId);
        if (!n) return [];
        const o = /* @__PURE__ */ new Set(), a = (d) => {
          for (const c of d ?? [])
            c.pageId && o.add(c.pageId), a(c.children);
        };
        a(n.menuItems);
        for (const d of [n.headerPageId, n.homePageId, n.viewPageId, n.editPageId])
          d && o.add(d);
        return [...o].map((d) => (t.pages ?? []).find((c) => c.id === d)).filter((d) => !!d).map((d) => s("page", d.id, d.name));
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
    this.step(e), this.draw(e), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var i;
    const t = this.t;
    for (const s of e) {
      if (s.parent) {
        const n = (Zn[Math.min(s.depth, Zn.length - 1)] ?? 60) + Math.min(60, ((((i = s.parent.children) == null ? void 0 : i.length) ?? 1) - 1) * 2.5);
        let o = s.x - s.parent.x, a = s.y - s.parent.y, d = Math.hypot(o, a);
        if (d < 0.01) {
          const m = Math.random() * Math.PI * 2;
          o = Math.cos(m) * 0.1, a = Math.sin(m) * 0.1, d = 0.1;
        }
        const c = mc * (d - n), p = o / d * c, g = a / d * c;
        s.vx -= p, s.vy -= g, s.parent.vx += p * 0.4, s.parent.vy += g * 0.4;
      } else
        s.vx -= s.x * ts, s.vy -= s.y * ts;
      this.reducedMotion || (s.vx += Math.sin(t * s.f1 * Math.PI * 2 + s.p1) * es, s.vy += Math.cos(t * s.f2 * Math.PI * 2 + s.p2) * es);
    }
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      for (let o = s + 1; o < e.length; o++) {
        const a = e[o], d = a.x - n.x, c = a.y - n.y;
        if (Math.abs(d) > oi || Math.abs(c) > oi) continue;
        const p = d * d + c * c;
        if (p > oi * oi || p < 0.01) continue;
        const g = Math.sqrt(p), m = n.depth <= 1 && a.depth <= 1 ? 3 : 1, y = hc * m / p, h = d / g * y, r = c / g * y;
        n.vx -= h, n.vy -= r, a.vx += h, a.vy += r;
      }
    }
    for (const s of e) {
      if (s === this.dragNode) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.vx *= Jn, s.vy *= Jn;
      const n = Math.hypot(s.vx, s.vy);
      n > 14 && (s.vx = s.vx / n * 14, s.vy = s.vy / n * 14), s.x += s.vx, s.y += s.vy;
      const o = s === this.hover ? 1.75 : 1;
      s.scale += (o - s.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Qn[Math.min(e.depth, Qn.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var o;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, s = this.clientHeight;
    t.clearRect(0, 0, i, s), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const a of e)
      a.parent && (t.strokeStyle = a.color + "55", t.beginPath(), t.moveTo(a.parent.x, a.parent.y), t.lineTo(a.x, a.y), t.stroke());
    const n = (a) => `${a}px system-ui, sans-serif`;
    for (const a of e) {
      const d = this.radiusOf(a);
      t.beginPath(), t.arc(a.x, a.y, d, 0, Math.PI * 2), t.fillStyle = a.expanded ? a.color + "22" : "#ffffff", t.fill(), t.lineWidth = (a === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = a.color, t.stroke();
      const c = ((o = a.children) == null ? void 0 : o.length) ?? 0;
      if (!a.expanded && c > 0) {
        const g = Math.max(7, d * 0.42), m = a.x + d * 0.75, y = a.y + d * 0.75;
        t.beginPath(), t.arc(m, y, g, 0, Math.PI * 2), t.fillStyle = a.color, t.fill(), t.fillStyle = "#ffffff", t.font = n(g * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(c), m, y + 0.5);
      }
      if (a.depth <= 1 || a === this.hover || this.cam.k > 0.8) {
        const g = a.label.length > 22 ? a.label.slice(0, 21) + "…" : a.label;
        t.font = a === this.hover ? `600 ${n(12)}` : n(a.depth <= 1 ? 12 : 10.5), t.fillStyle = a === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(g, a.x, a.y + d + 4);
      }
    }
    t.restore(), this.hover && this.drawCard(t, this.hover, i, s);
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, s) {
    var A, N;
    const n = /* @__PURE__ */ new Map();
    for (const O of t.children ?? []) n.set(O.kind, (n.get(O.kind) ?? 0) + 1);
    const o = [];
    for (const [O, b] of n)
      if (o.push(`${b} ${b === 1 ? (Xn[O] ?? O).toLowerCase() : uc[O] ?? O}`), o.length === 5) {
        const w = [...n.keys()].length - 5;
        w > 0 && (o[4] += ` (+${w} tipos más)`);
        break;
      }
    const a = t.label, d = Xn[t.kind] ?? t.kind, c = ((A = t.children) != null && A.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((N = t.children) != null && N.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const p = e.measureText(a).width;
    e.font = "11px system-ui, sans-serif";
    const g = Math.max(
      e.measureText(d).width,
      ...o.map((O) => e.measureText(O).width),
      e.measureText(c).width
    ), m = Math.min(280, Math.max(p, g) + 24), y = 40 + o.length * 15 + (c ? 18 : 0), h = this.radiusOf(t) * this.cam.k, r = this.cam.x + t.x * this.cam.k, u = this.cam.y + t.y * this.cam.k;
    let f = r + h + 14;
    f + m > i - 8 && (f = r - h - 14 - m), f = Math.max(8, Math.min(f, i - m - 8));
    const _ = Math.max(8, Math.min(u - 10, s - y - 8));
    e.translate(f, _), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, m, y, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(a, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(d, 12, 25), e.fillStyle = "#475569", o.forEach((O, b) => e.fillText(O, 12, 41 + b * 15)), c && (e.fillStyle = "#94a3b8", e.fillText(c, 12, y - 16)), e.restore();
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
      const i = this.toWorld(e);
      this.dragNode.x = i.x, this.dragNode.y = i.y;
      return;
    }
    if (this.panning && e.buttons & 1) {
      this.cam.x += e.movementX, this.cam.y += e.movementY;
      return;
    }
    const t = this.toWorld(e);
    this.hover = this.nodeAt(t.x, t.y), this.canvas && (this.canvas.style.cursor = this.hover ? "pointer" : "default");
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
        const d = i - s / 2 + s * (a + 0.5) / n.length;
        o.x = e.x + Math.cos(d) * 6, o.y = e.y + Math.sin(d) * 6, o.vx = Math.cos(d) * 7, o.vy = Math.sin(d) * 7, o.children || (o.children = this.childrenOf(o));
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
    e.preventDefault();
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
      <div class="hud">
        click: expandir / plegar · doble click: abrir · hover: ver contenido<br />
        arrastrar nodo: tirar del subárbol · fondo: mover · rueda: zoom
      </div>
    `;
  }
};
wi.styles = lt`
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
  `;
Ws([
  se({ attribute: !1 })
], wi.prototype, "model", 2);
wi = Ws([
  ct("modux-explorer")
], wi);
var fc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, ee = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? gc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && fc(t, i, n), n;
};
const Xi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Ic = Object.keys(Xi);
function Mt(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let d = 0, c = 1;
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
    const h = y / m;
    if (m < 0) {
      if (h > c) return !1;
      h > d && (d = h);
    } else {
      if (h < d) return !1;
      h < c && (c = h);
    }
  }
  return c - d > 0.02;
}
function yc(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((g) => [g.id, g])), n = (g) => {
    var y;
    const m = /* @__PURE__ */ new Set();
    for (let h = g; h; h = (y = s.get(h)) == null ? void 0 : y.parentId) m.add(h);
    return m;
  }, o = e.nodes, a = (g) => g.parentId ? Math.min(i, 6) : i, d = /* @__PURE__ */ new Map(), c = (g, m, y) => {
    const h = a(y), r = { x: y.x, y: y.y, w: y.w + 2 * h, h: y.h + 2 * h }, u = y.w / 2 + h * 1.5, f = y.h / 2 + h * 1.5, _ = { x: y.x - u, y: y.y - f }, A = { x: y.x + u, y: y.y - f }, N = { x: y.x - u, y: y.y + f }, O = { x: y.x + u, y: y.y + f }, b = [];
    for (const w of [_, A, N, O])
      !Mt(g, w, r) && !Mt(w, m, r) && b.push([w]);
    for (const [w, P] of [
      [_, A],
      [A, _],
      [A, O],
      [O, A],
      [O, N],
      [N, O],
      [N, _],
      [_, N]
    ])
      !Mt(g, w, r) && !Mt(P, m, r) && b.push([w, P]);
    return b;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const m = s.get(g.sourceId), y = s.get(g.targetId);
    if (!m || !y) continue;
    const h = /* @__PURE__ */ new Set([...n(m.id), ...n(y.id)]), r = [
      { x: m.x, y: m.y },
      { x: y.x, y: y.y }
    ];
    for (let u = 0; u < 12; u++) {
      let f = !1;
      e: for (let _ = 0; _ < r.length - 1; _++)
        for (const A of o) {
          if (h.has(A.id)) continue;
          const N = a(A), O = { x: A.x, y: A.y, w: A.w + 2 * N, h: A.h + 2 * N };
          if (!Mt(r[_], r[_ + 1], O)) continue;
          const b = c(r[_], r[_ + 1], A);
          if (!b.length) continue;
          const w = (U) => o.some(
            (D) => D !== A && !h.has(D.id) && Math.abs(U.x - D.x) < D.w / 2 + a(D) / 2 && Math.abs(U.y - D.y) < D.h / 2 + a(D) / 2
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
    r.length > 2 && d.set(
      g.id,
      r.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return d;
}
const ne = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function is(e, t) {
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
function vc(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let Y = class extends Re {
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
      const d = (c, p) => (c ?? []).some((g) => g.id === p || d(g.children, p));
      if (n) {
        const c = ge(n);
        if (!(c != null && c.itemId) || c.itemId === o.itemId || o.appId === c.appId && d(a.entry.children, c.itemId)) return;
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
        if (!p || o.appId === c.appId && d(a.entry.children, c.itemId) || o.appId === c.appId && p.parentId === a.parentId && a.beforeId === c.itemId)
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
      const d = JSON.parse(JSON.stringify(a.node)), { ops: c } = this.rebuildComponentOps(i, d, n ?? void 0, o);
      for (const p of c) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: s }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: s },
        ...this.rebuildComponentOps(t, d, a.parentId ?? void 0, a.beforeId).ops
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
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((g) => !g.parentId), d = Qi(a), c = [...d.keys()].map((g) => ({
      kind: "move-node",
      view: "context-map",
      id: g,
      pos: o.nodes[g] ?? null
    })), p = { ...o.nodes };
    for (const [g, m] of d) {
      const y = a.find((r) => r.id === g), h = o.nodes[g] ?? { x: y.x, y: y.y };
      p[g] = {
        x: Math.round(h.x + (m.x - y.x)),
        y: Math.round(h.y + (m.y - y.y))
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
    const i = yc(e, t);
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
    var t, i, s, n, o, a, d, c, p, g, m, y, h;
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
            for (const N of A ?? [])
              N.modelId === e.id && u.push({ kind: "set-page-component", pageId: f.id, componentId: N.id, modelId: e.id }), _(N.children);
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
          for (const N of _ ?? [])
            u.push({
              kind: "add-menu-item",
              appId: r.id,
              label: N.label,
              itemId: N.id,
              parentId: A == null ? void 0 : A.id,
              parentLabel: A && !A.id ? A.label : void 0,
              pageId: N.pageId ?? null
            }), N.uiAdapterId && u.push({ kind: "set-menu-app", appId: r.id, toAppId: N.uiAdapterId, itemId: N.id, label: N.label }), N.useCaseId && u.push({ kind: "set-menu-use-case", appId: r.id, useCaseId: N.useCaseId, itemId: N.id, label: N.label }), N.aggregateId && u.push({ kind: "set-menu-aggregate", appId: r.id, aggregateId: N.aggregateId, itemId: N.id, label: N.label }), N.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: r.id,
              queryServiceId: N.queryServiceId ?? null,
              queryOperationId: N.queryOperationId,
              itemId: N.id,
              label: N.label
            }), f(N.children, N);
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
            const N = u(A.children);
            if (N) return N;
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
        const r = (this.model.pages ?? []).find((O) => O.id === e.pageId);
        let u = null, f = null, _ = null;
        const A = (O, b) => {
          var P;
          const w = O ?? [];
          for (let U = 0; U < w.length; U++)
            w[U].id === e.componentId && (u = w[U], f = b, _ = ((P = w[U + 1]) == null ? void 0 : P.id) ?? null), A(w[U].children, w[U]);
        };
        if (A(r == null ? void 0 : r.content, null), !u) return null;
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
          beforeComponentId: _
        }] : this.rebuildComponentOps(
          e.pageId,
          N,
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
        const r = ((a = this.model.modules.find((u) => u.id === e.id)) == null ? void 0 : a.identityProviderId) ?? ((d = (this.model.uiApps ?? []).find((u) => u.id === e.id)) == null ? void 0 : d.identityProviderId) ?? ((c = (this.model.etlFlows ?? []).find((u) => u.id === e.id)) == null ? void 0 : c.identityProviderId) ?? null;
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
        const r = (m = (g = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : g.contentSources) == null ? void 0 : m.find((u) => u.uri === e.uri);
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
        const r = (h = (this.model.apis ?? []).find((u) => u.id === e.apiId)) == null ? void 0 : h.operations.find((u) => u.id === e.id);
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
    let d = { x: i, y: s };
    const c = this.sceneFor(n), p = c.nodes.find((m) => m.id === t);
    if (p != null && p.parentId) {
      const m = c.nodes.find((y) => y.id === p.parentId);
      m && (d = { x: i - m.x, y: s - m.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: d } });
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
    const { id: t, targetId: i, x: s, y: n } = e.detail, o = (this.model.apis ?? []).find((r) => r.id === t) ?? (this.model.proxyApis ?? []).find((r) => r.id === t);
    if (!o || i && !this.model.externalSystems.some((r) => r.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", d = i ?? "";
    if (d === a) return;
    const c = this._view, p = this.viewLayout(c), g = this.sceneFor(c), m = d ? g.nodes.find((r) => r.id === d) : void 0, y = m ? { x: s - m.x, y: n - m.y } : { x: s, y: n }, h = [
      { kind: "set-api-publisher", id: t, targetId: a },
      { kind: "move-node", view: c, id: t, pos: p.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: d }, !1), this.writeViewLayout(c, { ...p, nodes: { ...p.nodes, [t]: y } }), this.pushUndoEntry(h);
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
    const h = [{ kind: "remove-proxy-api", id: c }];
    y && (h.push({ kind: "move-node", view: p, id: c, pos: g.nodes[c] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [c]: { x: s - y.x, y: n - y.y } }
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
    var d, c, p;
    const t = e.target, i = (d = t.files) == null ? void 0 : d[0];
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
    for (const { id: d, x: c, y: p } of t) {
      a.push({ kind: "move-node", view: i, id: d, pos: s.nodes[d] ?? null });
      let g = { x: c, y: p };
      const m = n.nodes.find((y) => y.id === d);
      if (m != null && m.parentId) {
        const y = n.nodes.find((h) => h.id === m.parentId);
        y && (g = { x: c - y.x, y: p - y.y });
      }
      o[d] = g;
    }
    if (this.writeViewLayout(i, { ...s, nodes: o }), i === "processes")
      for (const { id: d } of t) {
        const c = this.stepReorderCommand(d);
        if (c) {
          const p = this.inverseOf(c);
          p && a.unshift(...p), this.command(c, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, d = this.viewLayout(a), c = this.sceneFor(a).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((g = d.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: d.nodes[t] ?? null },
      ...c.map((m) => ({ kind: "move-node", view: a, id: m.id, pos: d.nodes[m.id] ?? null }))
    ]);
    const p = { ...d.nodes, [t]: { x: i, y: s } };
    for (const m of c) p[m.id] = { x: m.x - i, y: m.y - s };
    this.writeViewLayout(a, {
      ...d,
      nodes: p,
      sizes: { ...d.sizes ?? {}, [t]: { w: n, h: o } }
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
    const i = hn(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
      (a, d) => (s.get(a.id) ?? 0) - (s.get(d.id) ?? 0)
    );
    if (n.every((a, d) => a.id === t.steps[d].id)) return null;
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
      const v = this.model.pages ?? [], x = this.model.uiApps ?? [], k = (W) => x.some((te) => te.id === W), $ = (W) => v.some((te) => te.id === W);
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
        const W = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          $(t) ? { kind: W, pageId: e, targetId: t, toAppId: null } : { kind: W, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (n === "viewmodel" && $(e)) {
        (this.model.models ?? []).some((W) => W.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
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
      const M = (W) => /^wizrow:([^:]+):(.+)$/.exec(W), C = M(e) ?? M(t);
      if (C) {
        const W = M(e) ? t : e;
        $(W) && W !== C[1] && this.command({ kind: "set-wizard-step-page", pageId: C[1], itemId: C[2], targetId: W });
        return;
      }
      const R = v.find((W) => W.id === t && W.type === "WIZARD");
      if ($(e) && R && e !== R.id) {
        (R.wizardSteps ?? []).some((W) => W.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: R.id, targetId: e });
        return;
      }
      if ($(e) && k(t)) {
        const W = v.find((xe) => xe.id === e), te = x.find((xe) => xe.id === t);
        if (te.type === "MASTER_DETAIL" && !te.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${W.name} es la cabecera de ${te.name} — las siguientes páginas serán pestañas`
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
      const B = this.model.identityProviders ?? [], V = (W) => B.some((te) => te.id === W);
      if (V(e) || V(t)) {
        const W = V(e) ? e : t, te = V(e) ? t : e;
        k(te) ? this.command({ kind: "set-identity-provider", id: te, targetId: W }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const re = (W) => (this.model.models ?? []).some((te) => te.id === W);
      if (re(e) || re(t)) {
        const W = re(e) ? e : t, te = re(e) ? t : e;
        if ($(te)) {
          this.command({ kind: "set-page-model", pageId: te, modelId: W });
          return;
        }
        if (k(te)) {
          this.command({ kind: "set-app-model", appId: te, modelId: W });
          return;
        }
        return;
      }
      const oe = ge(e);
      if (oe != null && oe.itemId && ((q = ge(t)) != null && q.itemId || k(t))) {
        const W = ge(t), te = this.menuEntryIn(oe.appId, oe.itemId);
        if (!te) return;
        if (W != null && W.itemId) {
          const xe = this.menuEntryIn(W.appId, W.itemId);
          if (!xe) return;
          const be = (pt) => (pt ?? []).some((Kt) => Kt.id === W.itemId || be(Kt.children));
          if (oe.appId === W.appId && (W.itemId === oe.itemId || be(te.entry.children)))
            return;
          const Ae = (le = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : le.renderRoot.querySelector(`g[data-node-id="${t}"]`), we = Ae == null ? void 0 : Ae.getBoundingClientRect(), Ve = we && s !== void 0 ? (s - we.top) / Math.max(1, we.height) : 0.5, Yt = Ve < 0.3 ? "before" : Ve > 0.7 ? "after" : "nest";
          if (Yt === "nest")
            this.command({
              kind: "move-menu-item",
              appId: oe.appId,
              toAppId: W.appId,
              itemId: oe.itemId,
              parentId: W.itemId
            });
          else {
            const pt = Yt === "before" ? W.itemId : xe.beforeId ?? void 0;
            if (oe.appId === W.appId && xe.parentId === te.parentId && pt === oe.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: oe.appId,
              toAppId: W.appId,
              itemId: oe.itemId,
              parentId: xe.parentId ?? void 0,
              beforeItemId: pt
            });
          }
          return;
        }
        if (oe.appId === t && !te.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: oe.appId,
          toAppId: t,
          itemId: oe.itemId
        });
        return;
      }
      const G = ge(e) ?? ge(t);
      if (G) {
        const W = ge(e) ? e : t, te = ge(e) ? t : e;
        if (((I = this.sceneFor("ui").nodes.find((we) => we.id === W)) == null ? void 0 : I.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const xe = this.model.modules.some(
          (we) => (we.useCases ?? []).some((Ve) => Ve.id === te)
        ), be = (this.model.aggregates ?? []).some((we) => we.id === te), Ae = this.model.modules.flatMap((we) => we.queryServices ?? []).find((we) => (we.operations ?? []).some((Ve) => Ve.id === te));
        $(te) ? this.command({ kind: "set-menu-page", pageId: te, ...G }) : k(te) && te !== G.appId ? this.command({ kind: "set-menu-app", toAppId: te, ...G }) : xe ? this.command({ kind: "set-menu-use-case", useCaseId: te, ...G }) : be ? this.command({ kind: "set-menu-aggregate", aggregateId: te, ...G }) : Ae && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Ae.id,
          queryOperationId: te,
          ...G
        });
        return;
      }
      if ((this.model.actors ?? []).some((W) => W.id === e) && k(t)) {
        (this.model.actorAppUses ?? []).some((W) => W.actorId === e && W.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const X = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (X) {
        const W = new Set(
          this.model.modules.flatMap((be) => (be.useCases ?? []).map((Ae) => Ae.id))
        ), te = new Set(
          this.model.modules.flatMap((be) => (be.queryServices ?? []).map((Ae) => Ae.id))
        ), xe = v.find((be) => be.id === X.pageId);
        W.has(X.other) ? (xe.buttons ?? []).some((be) => be.useCaseId === X.other) || this.command({ kind: "add-page-button", pageId: X.pageId, useCaseId: X.other }) : te.has(X.other) && this.command({ kind: "set-page-listing", pageId: X.pageId, queryServiceId: X.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [];
      if (!v.some((R) => R.id === e) || !v.some((R) => R.id === t) || e === t || (this.model.modelMappings ?? []).some((R) => R.sourceModelId === e && R.targetModelId === t))
        return;
      const x = v.find((R) => R.id === e), k = v.find((R) => R.id === t), $ = (R) => R.replace(/[^a-zA-Z0-9]/g, ""), M = new Set((this.model.modelMappings ?? []).map((R) => R.id));
      let C = `mapping-${ne(x.name)}-${ne(k.name)}`;
      for (let R = 2; M.has(C); R++) C = `mapping-${ne(x.name)}-${ne(k.name)}-${R}`;
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
          (V) => V.id === B.apiId && V.operations.some((re) => re.id === v)
        )
      )) == null ? void 0 : S.apiId);
      if (!$) return;
      if (new Set(
        this.model.modules.flatMap((B) => (B.useCases ?? []).map((V) => V.id))
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
        B && B[1] === k.targetApiId ? C = B[2] : this.model.modules.some((V) => V.id === t) && (this.model.apiImplementations ?? []).some(
          (V) => V.apiId === k.targetApiId && V.moduleId === t
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
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (R) => R.agentId === e && R.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (R) => R.agentId === e && R.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (R) => R.agentId === e && R.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (R) => R.agentId === e && R.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((R) => R.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (R) => R.agentId === e && R.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (R) => R.agentId === e && R.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((R) => R.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (R) => R.agentId === e && R.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (R) => R.agentId === e && R.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (R) => R.agentId === e && R.ragId === t
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
    const d = (this.model.rags ?? []).find((v) => v.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((k) => (k.readModels ?? []).map(($) => $.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((k) => (k.tables ?? []).map(($) => $.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((k) => k.id === t) || (this.model.proxyApis ?? []).some((k) => k.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((k) => k.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((k) => k.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
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
        for (let R = 2; (v.steps ?? []).some((B) => B.id === C); R++)
          C = `${M}-${R}`;
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
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((V) => V.id))
        ), R = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((V) => V.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: k.name,
          triggerAggregateId: $ && M.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && C.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && R.has($.sourceId) ? $.sourceId : void 0
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
    const m = (v) => (this.model.documents ?? []).find((x) => x.id === v);
    if (m(e) || m(t)) {
      const v = m(e) ?? m(t), x = m(e) ? t : e;
      if ((this.model.models ?? []).find((C) => C.id === x)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: x });
        return;
      }
      const $ = this.model.modules.flatMap((C) => C.queryServices ?? []).find((C) => C.id === x), M = this.model.modules.flatMap((C) => (C.queryServices ?? []).flatMap((R) => (R.operations ?? []).map((B) => ({ op: B, qs: R })))).find(({ op: C }) => C.id === x);
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
    const y = this.model.identityProviders ?? [], h = (v) => y.find((x) => x.id === v);
    if (h(e) || h(t)) {
      const v = h(e) ?? h(t), x = h(e) ? t : e;
      if (h(e) && this.model.externalSystems.some((M) => M.id === x)) {
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
      const v = u(e) ?? u(t), x = u(e) ? t : e, k = !u(e), $ = new Set(this.model.externalSystems.flatMap((X) => (X.tables ?? []).map((W) => W.id))), M = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((X) => X.id),
        ...(this.model.proxyApis ?? []).map((X) => X.id)
      ]), C = (this.model.apis ?? []).find((X) => X.operations.some((W) => W.id === x)), R = new Set(
        this.model.modules.flatMap((X) => [
          ...(X.domainEvents ?? []).map((W) => W.id),
          ...(X.applicationEvents ?? []).map((W) => W.id)
        ])
      );
      let B = null, V = {};
      if ($.has(x) ? (B = k ? "SOURCE_PULL" : "WRITE_DB", V = { externalTableId: x }) : C ? (B = k ? "SOURCE_PULL" : "WRITE_API", V = { apiId: C.id, operationId: x }) : M.has(x) ? (B = k ? "SOURCE_PULL" : "WRITE_API", V = { apiId: x }) : R.has(x) && (B = k ? "SOURCE_CONSUMER" : "WRITE_EVENT", V = { targetId: x }), !B) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((v.steps ?? []).some(
        (X) => X.type === B && (X.externalTableId ?? X.operationId ?? X.apiId ?? X.eventId) === (V.externalTableId ?? V.operationId ?? V.apiId ?? V.targetId)
      )) return;
      const oe = new Set((v.steps ?? []).map((X) => X.id));
      let G = (v.steps ?? []).length + 1;
      for (; oe.has(`ets-${G}`); ) G++;
      this.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${G}`, stepType: B, ...V });
      return;
    }
    const f = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), _ = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (f || _) {
      const v = (f ?? _).name, x = f ? { externalUseCaseId: e } : { externalTableId: e }, k = (C) => f ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, $ = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (R) => k(R) && R.readModelId === t
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
          (R) => k(R) && R.moduleId === t
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
    const N = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((x) => x.id))
    ), O = /* @__PURE__ */ new Set([
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
    if (O.has(e) && N.has(t) || w.has(e) && b.has(t)) {
      (this.model.emissions ?? []).some(
        (x) => x.sourceId === e && x.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (N.has(e) || b.has(e)) {
      const v = b.has(e), x = this.model.modules.flatMap((G) => (v ? G.applicationEvents : G.domainEvents) ?? []).find((G) => G.id === e), k = this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => ({ u: X, module: G }))).find(({ u: G }) => G.id === t), $ = this.model.modules.flatMap((G) => (G.readModels ?? []).map((X) => ({ rm: X, module: G }))).find(({ rm: G }) => G.id === t), M = this.model.modules.find((G) => G.id === t) ?? ($ == null ? void 0 : $.module) ?? (k == null ? void 0 : k.module);
      if (!x || !M) return;
      const C = new Set((this.model.aggregates ?? []).map((G) => G.id)), R = new Set(
        this.model.modules.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
      ), B = (this.model.emissions ?? []).find(
        (G) => G.domainEventId === e && (v ? w.has(G.sourceId) : C.has(G.sourceId) || R.has(G.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${x.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${x.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const V = !v && C.has(B.sourceId);
      if (k) {
        if (this.model.flows.some(
          (X) => X.archetype === "TRIGGERS" && X.triggerEvent === x.name && X.targetUseCaseId === k.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(x.name)}-${ne(k.u.name)}`,
          name: k.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: V ? B.sourceId : "",
          triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
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
        triggerAggregateId: V ? B.sourceId : "",
        triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: x.name,
        targetId: M.id,
        readModelName: re
      });
      return;
    }
    const z = /* @__PURE__ */ new Set([
      ...O,
      ...w,
      ...P,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((x) => x.id))
    ]);
    if (z.has(e) || z.has(t) || N.has(t) || b.has(t))
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
      const [, o, a] = n, d = (s = (this.model.apis ?? []).find(
        (c) => c.operations.some((p) => p.id === o)
      )) == null ? void 0 : s.id;
      if (!d) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: d, operationId: o, moduleId: a });
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
      const [, o, a, d] = n, c = /^apiimpl:.+@(.+)$/.exec(d), p = c ? c[1] : d;
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
          @change=${(d) => this.toggleViewMember(n, d.target.checked)}
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
    const e = (this.model.views ?? []).find((h) => h.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), s = new Set(i.map((h) => h.id)), n = this.model.externalSystems.filter((h) => t.has(h.id)), o = new Set(n.map((h) => h.id)), a = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || s.has(h.moduleId)
    ), d = new Set(a.map((h) => h.id)), c = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), p = /* @__PURE__ */ new Set(), g = (h) => {
      for (const r of h ?? [])
        r.pageId && p.add(r.pageId), g(r.children);
    };
    c.forEach((h) => g(h.menuItems));
    const m = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || p.has(h.id)
    ), y = new Set(c.map((h) => h.id));
    return {
      ...this.model,
      uiApps: c,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((h) => y.has(h.appId)),
      modules: i,
      externalSystems: n,
      relations: this.model.relations.filter(
        (h) => s.has(h.sourceId) && s.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (s.has(h.sourceId) || o.has(h.sourceId)) && (s.has(h.targetId) || o.has(h.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((h) => d.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => d.has(h.sourceAggregateId) && d.has(h.targetAggregateId)
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
        (h) => t.has(h.id) || (h.publishedByExternalSystemId ? o.has(h.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (h) => t.has(h.id) || (h.publishedByExternalSystemId ? o.has(h.publishedByExternalSystemId) : !1)
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
    const t = e.detail.kind === "process-step" ? vc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : is(e.detail.id, e.detail.kind);
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
      const d = o ?? [];
      for (let p = 0; p < d.length; p++)
        d[p].id === t && (s = { node: d[p], parentId: a, beforeId: ((c = d[p + 1]) == null ? void 0 : c.id) ?? null }), n(d[p].children, d[p].id);
    };
    return n(i == null ? void 0 : i.content, null), s;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, s, n = !1, o) {
    const a = o ?? this.allComponentIds(), d = (m) => {
      if (!n) return m.id;
      const y = `cmp-${ne(m.kind)}`;
      let h = y;
      for (let r = 2; a.has(h) || a.has(`${h}-tab-1`); r++) h = `${y}-${r}`;
      return a.add(h), h;
    }, c = [], p = (m, y) => {
      const h = d(m);
      c.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: m.kind, parentComponentId: y }), m.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), c.push({
        kind: "set-page-component",
        pageId: e,
        componentId: h,
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
      for (const r of m.children ?? []) p(r, h);
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
      const d = o ?? [];
      for (let p = 0; p < d.length; p++)
        d[p].id === t && (s = { entry: d[p], parentId: a, beforeId: ((c = d[p + 1]) == null ? void 0 : c.id) ?? null }), n(d[p].children, d[p].id ?? null);
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
      const d = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!d) return;
      t = this._selectedCmp.pageId, ae.LEAF_KINDS.has(d.node.kind) ? (i = d.parentId ?? void 0, s = d.beforeId) : i = d.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (d.node.children ?? [])[0]) == null ? void 0 : a.id : d.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((d) => d.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: n, rootId: o } = this.rebuildComponentOps(t, e, i, s, !0);
    for (const d of n) this.command(d, !1);
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
    var d;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
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
    for (let d = t; d; )
      s.push(d), d = (o = i.nodes.find((c) => c.id === d)) == null ? void 0 : o.parentId;
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
    ].includes(e)) return s.find((d) => this.model.modules.some((c) => c.id === d)) ?? null;
    if (e === "read-model") {
      const d = s.find((p) => (this.model.aggregates ?? []).some((g) => g.id === p));
      if (d) return d;
      const c = s.find((p) => this.model.modules.some((g) => g.id === p));
      return ((a = (this.model.aggregates ?? []).find((p) => p.moduleId === c)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return s.find((d) => this.model.externalSystems.some((c) => c.id === d)) ?? null;
    if (e === "use-case-step")
      return s.find(
        (d) => this.model.modules.some((c) => (c.useCases ?? []).some((p) => p.id === d))
      ) ?? null;
    if (e === "api-operation") {
      for (const d of s) {
        if ((this.model.apis ?? []).some((g) => g.id === d)) return d;
        const c = /^apiimpl:(.+)@(.+)$/.exec(d);
        if (c && (this.model.apis ?? []).some((g) => g.id === c[1])) return c[1];
        const p = (this.model.proxyApis ?? []).find((g) => g.id === d);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((d) => this.model.externalSystems.some((c) => c.id === d)) ?? s.find((d) => this.model.modules.some((c) => c.id === d)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var h, r, u, f, _, A, N;
    const n = Y.PALETTE_NEW.find((O) => O.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const O = e.slice(4), b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = b ? b[1] : i && (this.model.pages ?? []).some((L) => L.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let P = b ? b[2] : void 0, U = null;
      if (O === "tab") {
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
        const L = ((h = this.componentIn(w, P)) == null ? void 0 : h.node) ?? null;
        (L == null ? void 0 : L.kind) === "tabLayout" && (L.children ?? [])[0] && (P = (L.children ?? [])[0].id);
      }
      const D = this.newComponentId(O), z = {
        kind: "add-page-component",
        pageId: w,
        componentId: D,
        componentKind: O,
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
    const o = this._view, a = this.sceneFor(o), d = (O, b) => {
      const w = this.viewLayout(o), P = b ? a.nodes.find((D) => D.id === b) : void 0, U = P ? { x: Math.round(t.x - P.x), y: Math.round(t.y - P.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...w, nodes: { ...w.nodes, [O]: U } }), { kind: "move-node", view: o, id: O, pos: null };
    }, c = (O, b, w) => {
      const P = this.inverseOf(O) ?? [];
      this.command(O, !1);
      const U = d(b, w);
      this.pushUndoEntry([...P, U]);
    };
    if (!n.child) {
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
        "identity-provider": "idp-"
      }, { id: b, name: w } = this.uniquePaletteName(n.label, O[e] ?? ""), P = e === "module" ? { kind: "add-module", id: b, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: b, name: w } : e === "external-system" ? { kind: "add-external-system", id: b, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: b, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: b, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: b, name: w } : e === "rag" ? { kind: "add-rag", id: b, name: w } : e === "api" ? { kind: "add-api", id: b, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: b, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: b, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: b, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: b, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: b, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: b, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: b, name: w } : {
        kind: "add-workflow",
        id: b,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      c(P, b);
      return;
    }
    if (e === "ui-wizard-step") {
      const O = [];
      for (let D = i ?? void 0; D; )
        O.push(D), D = (r = a.nodes.find((z) => z.id === D)) == null ? void 0 : r.parentId;
      const b = O.map((D) => {
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
      const O = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", b = O === "CRUD" ? "CRUD" : O === "WIZARD" ? "Wizard" : "Página", { id: w, name: P } = this.uniquePaletteName(b, "page-"), U = [];
      for (let L = i ?? void 0; L; )
        U.push(L), L = (f = a.nodes.find((q) => q.id === L)) == null ? void 0 : f.parentId;
      const D = U.find((L) => (this.model.uiApps ?? []).some((q) => q.id === L)), z = U.map((L) => {
        var q;
        return ((q = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : q[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((q) => q.id === L && q.type === "WIZARD"));
      if (z) {
        const L = a.nodes.find((le) => le.id === z);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: P, pageType: O }, !1), this.command({ kind: "add-page-wizard-step", pageId: z, targetId: w }, !1);
        const q = d(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, q]), this.emit("modux-notice", { message: `${P} creada como paso del wizard` });
        return;
      }
      if (D) {
        const L = a.nodes.find((q) => q.id === D);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40);
      }
      c(
        D ? { kind: "create-ui-page", id: w, name: P, pageType: O, appId: D, menuLabel: P } : { kind: "create-ui-page", id: w, name: P, pageType: O },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const O = [];
      for (let z = i ?? void 0; z; )
        O.push(z), z = (_ = a.nodes.find((L) => L.id === z)) == null ? void 0 : _.parentId;
      const b = O.find((z) => (this.model.uiApps ?? []).some((L) => L.id === z));
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
      const D = O.map((z) => ge(z)).find(Boolean);
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
      const O = [];
      for (let U = i ?? void 0; U; )
        O.push(U), U = (A = a.nodes.find((D) => D.id === U)) == null ? void 0 : A.parentId;
      const b = O.map((U) => (this.model.etlFlows ?? []).find((D) => D.id === U)).find(Boolean);
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
      const O = this.model.workflows ?? [], b = [];
      for (let L = i ?? void 0; L; )
        b.push(L), L = (N = a.nodes.find((q) => q.id === L)) == null ? void 0 : N.parentId;
      const w = b.map((L) => O.find((q) => q.id === L)).find(Boolean), P = b.map((L) => {
        const q = O.find((le) => (le.steps ?? []).some((I) => I.id === L));
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
      const O = this.dropContainerFor("api", i);
      if (!O) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: b, name: w } = this.uniquePaletteName("API", "api-"), P = { kind: "add-api", id: b, name: w }, U = this.inverseOf(P) ?? [];
      this.command(P, !1), this.model.externalSystems.some((q) => q.id === O) ? this.command({ kind: "set-api-publisher", id: b, targetId: O }, !1) : this.command({ kind: "add-api-implementation", apiId: b, moduleId: O }, !1);
      const D = this.viewLayout(this._view), z = this.sceneFor(this._view).nodes.find((q) => q.id === O), L = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
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
    }, { id: m, name: y } = this.uniquePaletteName(n.label, g[e] ?? "");
    if (e === "aggregate")
      c({ kind: "add-aggregate", id: m, name: y, moduleId: p }, m, p);
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: m, name: y, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        m,
        p
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: m, name: y, moduleId: p }, m, p);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: m, name: y, moduleId: p }, m, p);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: m, name: y, moduleId: p }, m, p);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: m, name: y, moduleId: p }, m, p);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      c({ kind: "add-notification", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      c({ kind: "add-document", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: m, name: y, moduleId: p }, m, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const O = (this.model.aggregates ?? []).find((b) => b.id === p);
      c({ kind: "add-read-model", id: m, name: y, aggregateId: p }, m, (O == null ? void 0 : O.moduleId) ?? p);
    } else if (e === "api-operation") {
      const O = (this.model.apis ?? []).find((D) => D.id === p), b = new Set(((O == null ? void 0 : O.operations) ?? []).map((D) => D.id));
      let w = y, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      for (let D = 2; b.has(P); D++)
        w = `${n.label} ${D}`, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      c({ kind: "add-api-operation", apiId: p, id: P, name: w }, P, p), a.nodes.some(
        (D) => D.parentId === p && (D.kind === "api-operation" || D.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(O == null ? void 0 : O.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const O = this.model.modules.flatMap((U) => U.useCases ?? []).find((U) => U.id === p), b = new Set((O == null ? void 0 : O.stepIds) ?? []);
      let w = y, P = `step-${ne(w)}`;
      for (let U = 2; b.has(P); U++)
        w = `${n.label} ${U}`, P = `step-${ne(w)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: P, name: w }, P, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(O == null ? void 0 : O.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: m, name: y, moduleId: p }, m, p) : e === "external-table" ? c({ kind: "add-external-table", id: m, name: y, moduleId: p }, m, p) : e === "mcp-server" && c({ kind: "add-mcp-server", id: m, name: y, moduleId: p }, m, p);
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
      const h = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!h) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const r = (this.model.pages ?? []).find((u) => u.id === n[1]);
      if (((r == null ? void 0 : r.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: n[1], useCaseId: e, type: n[2] }), this.emit("modux-notice", { message: `Botón de ${h.name} en la barra ${n[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const o = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, a = o ? o[1] : t && (this.model.pages ?? []).some((h) => h.id === t) ? t : null;
    if (!a) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const d = o ? ((y = this.componentIn(a, o[2])) == null ? void 0 : y.node) ?? null : null, c = this.model.modules.flatMap((h) => h.useCases ?? []).find((h) => h.id === e);
    if (c) {
      (d == null ? void 0 : d.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: d.id, useCaseId: e, label: d.label ?? c.name }), this.emit("modux-notice", { message: `El botón lanza ${c.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${c.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((h) => h.id === e);
    if (p) {
      (d == null ? void 0 : d.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: d.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((h) => h.id === e);
    if (g && (d == null ? void 0 : d.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: d.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const m = this.model.modules.flatMap((h) => (h.queryServices ?? []).flatMap((r) => (r.operations ?? []).map((u) => ({ op: u, qs: r })))).find(({ op: h }) => h.id === e);
    if (m) {
      (d == null ? void 0 : d.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: d.id,
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
    const a = this._view, d = this.sceneFor(a), c = d.nodes.find((y) => y.id === e);
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
    const p = this.viewLayout(a), g = c.parentId ? d.nodes.find((y) => y.id === c.parentId) : void 0, m = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(a, { ...p, nodes: { ...p.nodes, [e]: m } });
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
                                ${gt[o.symbol]}
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
                            ${gt[s.symbol]}
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
    var t, i, s, n, o, a, d;
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
          triggerAggregateId: this._newTriggerAggId || ((d = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? _o(i, t.nodes) : e === "flows" ? Oo(i, t.nodes) : e === "processes" ? hn(i, t.nodes) : e === "workflows" ? Wl(i, t.nodes) : e === "ui" ? Kl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? Zl(i, t.nodes) : e === "eventstorming" ? Rl(i, t.nodes) : go(
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
    }, a = await Jl(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), d = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((p) => ({
        kind: "move-node",
        view: e,
        id: p.id,
        pos: d.nodes[p.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(d.edges).map((p) => ({
        kind: "set-edge-points",
        view: e,
        id: p,
        points: d.edges[p]
      }))
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: d.sizes }), await this.updateComplete, (c = this.renderRoot.querySelector("modux-canvas")) == null || c.fit();
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
              <option value="view:explorer" ?selected=${this._view === "explorer"}>
                Explorador (beta)
              </option>
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
      ${this._view === "design" ? E`${this.renderPalette()}${this.renderFigma()}` : this._view === "explorer" ? E`<modux-explorer
            .model=${this.model}
            @node-activated=${(t) => {
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, s = is(t.detail.id, i);
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
        ${Ic.map(
      (s) => E`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${Xi[s].abbr}</span>
              <span class="name">${Xi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Y.styles = lt`
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
  se({ attribute: !1 })
], Y.prototype, "model", 2);
ee([
  se({ attribute: !1 })
], Y.prototype, "layout", 2);
ee([
  se({ attribute: !1 })
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
  ct("modux-editor")
], Y);
var wc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, Ce = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? xc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && wc(t, i, n), n;
};
let Ie = class extends Re {
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
      const d = this._diff.changes.filter((c) => c.kind === s);
      return d.length ? E`
            <div class="diff-group">${n} (${d.length})</div>
            ${d.map(
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
      var d;
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
        this._workspace = await c.json(), await this.reload(), await this.refreshDiff(), (d = this.renderRoot.querySelector("modux-editor")) == null || d.clearHistory();
      } catch (c) {
        this.showToast(String(c));
      }
    });
    const s = (o = this._workspace) == null ? void 0 : o.current;
    if (s && s !== i) {
      const d = ((a = this._workspace.solutions.find((c) => c.branch === s)) == null ? void 0 : a.name) ?? s.replace(/^solution\//, "");
      this.syncModelContext(
        s,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${d}`
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
        const { apiId: d } = await a.json(), c = n ? { kind: "set-api-publisher", id: d, targetId: n } : o ? { kind: "add-api-implementation", apiId: d, moduleId: o } : null;
        c && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(c)
        });
        const p = await fetch(`${this.base}/model`);
        p.ok && (this._model = await p.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${d}`, "info");
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
Ie.styles = lt`
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
  se()
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
  ct("modux-editor-connected")
], Ie);
export {
  bc as CONTAINER_HEADER,
  _c as CONTAINER_INSET,
  me as ModuxCanvas,
  Y as ModuxEditor,
  Ie as ModuxEditorConnected,
  _o as aggregatesScene,
  it as apiImplNodeId,
  tt as apiOpOccurrenceId,
  zi as containerFit,
  oo as containerMinSize,
  go as contextMapScene,
  mo as flowCoherence,
  Oo as flowsScene,
  Zt as normalizeViewLayout,
  hn as processesScene,
  uo as relationEdgeId,
  Qi as resolveOverlaps
};
